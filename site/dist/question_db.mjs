// question_db.mjs - 6,000 題全考制題庫資料庫引擎（支援 IndexedDB 本地持久化、動態分包載入與 Fisher-Yates 隨機抽題）

const DB_NAME = 'EnglishQuestDB';
const DB_VERSION = 1;
const STORE_NAME = 'questions';

export const CATEGORY_META = {
  all: { id: 'all', name: '全部考科綜合隨機', total: 12000, color: 'blue' },
  gaokao: { id: 'gaokao', name: '歷年高考真題庫 (6,000 題)', total: 6000, color: 'emerald' },
  jhs: { id: 'jhs', name: '國中教育會考英語', total: 1000, color: 'green' },
  shs: { id: 'shs', name: '高中大學學測英文', total: 1000, color: 'purple' },
  toeic: { id: 'toeic', name: 'TOEIC 多益商務英語', total: 1000, color: 'amber' },
  sat: { id: 'sat', name: 'Digital SAT 數位測驗', total: 1000, color: 'indigo' },
  gre: { id: 'gre', name: 'GRE 研究所 Verbal', total: 1000, color: 'rose' },
  gmat: { id: 'gmat', name: 'GMAT Focus 批判推理', total: 1000, color: 'cyan' }
};

export class QuestionBankDB {
  constructor() {
    this.cache = new Map(); // id -> Question
    this.pools = {
      gaokao: [],
      jhs: [],
      shs: [],
      toeic: [],
      sat: [],
      gre: [],
      gmat: []
    };
    this.loadedCategories = new Set();
    this.db = null;
    this.initPromise = this.initDB();
  }

  // 初始化 IndexedDB
  async initDB() {
    if (typeof indexedDB === 'undefined') return null;
    return new Promise((resolve) => {
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            store.createIndex('category', 'category', { unique: false });
          }
        };
        req.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(this.db);
        };
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }

  // 儲存題目至 IndexedDB (背景非同步批次寫入)
  async persistToIndexedDB(items) {
    if (!this.db || !items.length) return;
    try {
      const tx = this.db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      for (const item of items) {
        store.put(item);
      }
    } catch {
      // 容錯忽略寫入失敗
    }
  }

  // 載入指定分類題目 (優選 Memory -> IndexedDB -> Network Fetch)
  async loadCategory(cat) {
    if (cat === 'all') {
      const allCats = ['gaokao', 'jhs', 'shs', 'toeic', 'sat', 'gre', 'gmat'];
      await Promise.all(allCats.map(c => this.loadCategory(c)));
      return this.getAllQuestions();
    }

    if (this.loadedCategories.has(cat) && this.pools[cat]?.length) {
      return this.pools[cat];
    }

    // 嘗試從 Network 載入 JSON
    try {
      const res = await fetch(`questions/${cat}.json`);
      if (res.ok) {
        const items = await res.json();
        if (Array.isArray(items) && items.length) {
          this.pools[cat] = items;
          this.loadedCategories.add(cat);
          items.forEach(q => this.cache.set(q.id, q));
          this.persistToIndexedDB(items);
          return items;
        }
      }
    } catch (err) {
      console.warn(`[QuestionBankDB] Network fetch for ${cat} failed, falling back...`, err);
    }

    // 若網路獲取失敗，嘗試從 IndexedDB 讀取
    if (this.db) {
      try {
        const items = await new Promise((resolve) => {
          const tx = this.db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const index = store.index('category');
          const req = index.getAll(cat);
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (items.length) {
          this.pools[cat] = items;
          this.loadedCategories.add(cat);
          items.forEach(q => this.cache.set(q.id, q));
          return items;
        }
      } catch (err) {
        console.warn(`[QuestionBankDB] IndexedDB load failed for ${cat}`, err);
      }
    }

    return this.pools[cat] || [];
  }

  // 取得目前所有已載入之題目
  getAllQuestions() {
    const res = [];
    for (const cat of ['gaokao', 'jhs', 'shs', 'toeic', 'sat', 'gre', 'gmat']) {
      if (this.pools[cat]) res.push(...this.pools[cat]);
    }
    return res;
  }

  // 取得特定題目 (O(1) 緩存查表)
  getQuestion(id) {
    return this.cache.get(id) || null;
  }

  // Fisher-Yates 現代洗牌隨機抽題演算法
  async sampleQuestions(category = 'all', count = 20) {
    await this.initPromise;
    await this.loadCategory(category);

    let candidates = [];
    if (category === 'all') {
      candidates = this.getAllQuestions();
    } else {
      candidates = this.pools[category] || [];
    }

    if (!candidates.length) {
      // 容錯備援
      return [];
    }

    // 複製陣列進行 Fisher-Yates 洗牌
    const pool = [...candidates];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const n = Math.min(Math.max(1, count), pool.length);
    return pool.slice(0, n);
  }

  // 取得題庫統計資訊
  getStats() {
    let totalLoaded = 0;
    const catStats = {};
    for (const [cat, items] of Object.entries(this.pools)) {
      catStats[cat] = items.length;
      totalLoaded += items.length;
    }
    return {
      totalQuestions: 12000,
      totalLoaded,
      categories: catStats
    };
  }
}

export const questionDB = new QuestionBankDB();
