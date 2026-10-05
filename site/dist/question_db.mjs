// question_db.mjs - 題庫資料載入與抽題。CATEGORY_META.total 表示資料筆數，並非不同題面數。

const DB_NAME = 'EnglishQuestDB';
const DB_VERSION = 1;
const STORE_NAME = 'questions';

export const CATEGORY_META = {
  all: { id: 'all', name: '全部考科綜合練習', total: 20000, uniqueStems: 482, color: 'blue' },
  gaokao: { id: 'gaokao', name: '高考方向原創練習', total: 6000, uniqueStems: 60, color: 'emerald' },
  jhs: { id: 'jhs', name: '國中教育會考英語', total: 1000, uniqueStems: 183, color: 'green' },
  shs: { id: 'shs', name: '高中大學學測英文', total: 1000, uniqueStems: 8, color: 'purple' },
  toeic: { id: 'toeic', name: 'TOEIC 多益商務英語', total: 3000, uniqueStems: 148, color: 'amber' },
  sat: { id: 'sat', name: 'Digital SAT 數位測驗', total: 3000, uniqueStems: 16, color: 'indigo' },
  gre: { id: 'gre', name: 'GRE 研究所 Verbal', total: 3000, uniqueStems: 47, color: 'rose' },
  gmat: { id: 'gmat', name: 'GMAT Focus 批判推理', total: 3000, uniqueStems: 20, color: 'cyan' }
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
    this.diagnosticPool = [];
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

  // Fisher-Yates 現代洗牌隨機抽題演算法 (支援 subtopic 題型過濾)
  async sampleQuestions(category = 'all', count = 20, subtopic = 'all') {
    await this.initPromise;
    await this.loadCategory(category);

    let candidates = [];
    if (category === 'all') {
      candidates = this.getAllQuestions();
    } else {
      candidates = this.pools[category] || [];
    }

    if (subtopic && subtopic !== 'all') {
      const s = String(subtopic).toLowerCase().trim();
      const filtered = candidates.filter(q => q.subtopic && q.subtopic.toLowerCase().includes(s));
      candidates = filtered;
    }

    if (!candidates.length) return [];

    // 複製陣列進行 Fisher-Yates 洗牌
    // IDs may differ while passage, question and options are identical.
    const unique = new Map();
    for (const q of candidates) {
      const key = JSON.stringify([q.passage ?? null, q.prompt, q.options]);
      if (!unique.has(key)) unique.set(key, q);
    }
    const pool = [...unique.values()];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const n = Math.min(Math.max(1, count), pool.length);
    return pool.slice(0, n);
  }

  // 取得指定考科之所有題型子分類 (Subtopics)
  async getSubtopics(category) {
    if (!category || category === 'all') return [];
    await this.initPromise;
    await this.loadCategory(category);
    const pool = this.pools[category] || [];
    const subs = new Set();
    for (const q of pool) {
      if (q.subtopic) subs.add(q.subtopic);
    }
    return Array.from(subs);
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
      totalQuestions: 20000, // legacy field: row count, not distinct question stems
      uniqueQuestionStems: 482,
      totalLoaded,
      categories: catStats,
      diagnosticTotal: 2000,
      diagnosticLoaded: this.diagnosticPool.length
    };
  }

  // 載入 2,000 題全階能力診斷題庫 (國小至GRE/GMAT)
  async loadDiagnosticBank() {
    if (this.diagnosticPool.length >= 2000) {
      return this.diagnosticPool;
    }

    try {
      const res = await fetch('questions/diagnostic_bank.json');
      if (res.ok) {
        const items = await res.json();
        if (Array.isArray(items) && items.length) {
          this.diagnosticPool = items;
          items.forEach(q => this.cache.set(q.id, q));
          this.persistToIndexedDB(items);
          return items;
        }
      }
    } catch (err) {
      console.warn('[QuestionBankDB] Network fetch for diagnostic_bank.json failed, falling back...', err);
    }

    // 容錯備援從 IndexedDB 查尋 diag- 前綴
    if (this.db) {
      try {
        const items = await new Promise((resolve) => {
          const tx = this.db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.getAll();
          req.onsuccess = () => {
            const diags = (req.result || []).filter(item => item.id && item.id.startsWith('diag-'));
            resolve(diags);
          };
          req.onerror = () => resolve([]);
        });
        if (items.length >= 1000) {
          this.diagnosticPool = items;
          items.forEach(q => this.cache.set(q.id, q));
          return items;
        }
      } catch (err) {
        console.warn('[QuestionBankDB] IndexedDB load failed for diagnostic_bank', err);
      }
    }

    return this.diagnosticPool;
  }

  // 分層階梯自適應抽題演算法 (支援 10 題極速、20 題快速、30 題標準、40 題精準深度)
  // 保證：
  // 1. 本次測驗中 100% 題號 (ID) 與題幹 (Prompt) 零重複 (seenIds, seenPrompts 雙層查驗)
  // 2. 跨測驗輪換記憶：讀取 localStorage 最近考過的題目 (最多記錄 300 題)，抽題時優先選取未曾出現之新題，避免短期重測遇到相同題目
  async sampleDiagnostic(count = 30, tier = null) {
    if (tier !== null && (!Number.isInteger(tier) || tier < 1 || tier > 8)) throw new Error("無效的程度");
    if (tier !== null) count = count === 10 ? 10 : 20;
    await this.initPromise;
    const pool = await this.loadDiagnosticBank();
    if (!pool || !pool.length) return [];

    let tierQuotas;
    if (count === 10) {
      tierQuotas = { 1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 1, 7: 1, 8: 1 }; // 合計 10 題
    } else if (count === 20) {
      tierQuotas = { 1: 2, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 2, 8: 1 }; // 合計 20 題
    } else if (count === 40) {
      tierQuotas = { 1: 5, 2: 5, 3: 5, 4: 6, 5: 5, 6: 5, 7: 5, 8: 4 }; // 合計 40 題
    } else {
      tierQuotas = { 1: 4, 2: 4, 3: 4, 4: 5, 5: 4, 6: 4, 7: 3, 8: 2 }; // 合計 30 題
    }

    if (tier !== null) tierQuotas = { [tier]: count };

    // 讀取跨測驗歷史最近看過的題號，實現跨次測驗輪換不重複
    let recentIds = new Set();
    try {
      const rawRecent = typeof localStorage !== 'undefined' ? localStorage.getItem('eq_diag_recent_qids') : null;
      if (rawRecent) {
        const parsed = JSON.parse(rawRecent);
        if (Array.isArray(parsed)) {
          recentIds = new Set(parsed);
        }
      }
    } catch (e) {
      // 忽視 storage 錯誤
    }

    const sampledQuestions = [];
    const seenIds = new Set();
    const seenPrompts = new Set();
    const normalizePrompt = (p) => (p || '').trim().toLowerCase().replace(/\s+/g, ' ');

    for (let t = 1; t <= 8; t++) {
      const quota = tierQuotas[t] || 0;
      if (!quota) continue;
      const tierCandidates = pool.filter(q => q.tier === t);
      if (!tierCandidates.length) continue;

      // 分為「近期未出現」與「近期已出現」兩群組，優先抽取近期未出現者
      const freshCandidates = tierCandidates.filter(q => !recentIds.has(q.id));
      const backupCandidates = tierCandidates.filter(q => recentIds.has(q.id));

      const shuffle = (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const prioritizedList = [...shuffle(freshCandidates), ...shuffle(backupCandidates)];
      let tierPicked = 0;

      for (const cand of prioritizedList) {
        if (tierPicked >= quota) break;
        const norm = normalizePrompt(cand.prompt);
        if (seenIds.has(cand.id) || seenPrompts.has(norm)) {
          continue; // 嚴格排除任何 ID 或 題幹 衝突
        }
        seenIds.add(cand.id);
        seenPrompts.add(norm);
        sampledQuestions.push(cand);
        tierPicked++;
      }
    }

    if (sampledQuestions.length !== count) throw new Error("題庫不足，無法產生完整試卷");

    // 更新最近題號記憶 (最多保留最近 300 題)
    try {
      if (typeof localStorage !== 'undefined') {
        const newRecentList = [...seenIds, ...Array.from(recentIds)].slice(0, 300);
        localStorage.setItem('eq_diag_recent_qids', JSON.stringify(newRecentList));
      }
    } catch (e) {}

    return sampledQuestions;
  }

  // 10 題極速快測呼叫別名
  async sampleDiagnostic10() {
    return this.sampleDiagnostic(10);
  }

  // 向下相容 30 題呼叫別名
  async sampleDiagnostic30() {
    return this.sampleDiagnostic(30);
  }

  // 本次作答與主題回顧；不進行正式分數預測
  evaluateDiagnostic(userAnswers, questions) {
    const weights = { 1: 1.0, 2: 1.5, 3: 2.0, 4: 2.5, 5: 3.0, 6: 3.5, 7: 4.0, 8: 4.5 };
    const maxPossibleWeighted = questions.reduce((sum, q) => sum + (weights[q.tier] || 1.0), 0) || 77.5;

    let rawCorrect = 0;
    let userWeightedScore = 0;

    const tierBreakdown = {
      1: { name: 'Tier 1: 國小基礎生活英語', exam: '國小英語 (Pre-A1~A1)', total: 0, correct: 0 },
      2: { name: 'Tier 2: 國中會考基礎實踐', exam: '國中會考 B級 (A1~A2)', total: 0, correct: 0 },
      3: { name: 'Tier 3: 國中會考精熟躍升', exam: '會考 A/A++ (A2~B1)', total: 0, correct: 0 },
      4: { name: 'Tier 4: 高中學測核心素養', exam: '學測前頂標 (B1~B2)', total: 0, correct: 0 },
      5: { name: 'Tier 5: TOEIC 國際商務實戰', exam: 'TOEIC 785+ (B2)', total: 0, correct: 0 },
      6: { name: 'Tier 6: Digital SAT 學術思維', exam: 'SAT/TOEFL (B2~C1)', total: 0, correct: 0 },
      7: { name: 'Tier 7: GRE Verbal 語意邏輯', exam: 'GRE 155+ (C1~C2)', total: 0, correct: 0 },
      8: { name: 'Tier 8: GMAT Focus 批判推理', exam: 'GMAT CR (C2/C2+)', total: 0, correct: 0 }
    };

    const dimensionBreakdown = {
      '單字語意': { total: 0, correct: 0 },
      '文法句構': { total: 0, correct: 0 },
      '篇章語境': { total: 0, correct: 0 },
      '學術思辨': { total: 0, correct: 0 },
      '批判推理': { total: 0, correct: 0 }
    };

    const remedialHooks = [];

    questions.forEach((q) => {
      const userChoice = userAnswers[q.id];
      const isCorrect = Array.isArray(q.answer)
        ? (Array.isArray(userChoice) && userChoice.length === q.answer.length && userChoice.every(v => q.answer.includes(v)))
        : userChoice === q.answer;

      if (isCorrect) {
        rawCorrect++;
        userWeightedScore += (weights[q.tier] || 1.0);
      } else {
        if (q.courseHook && !remedialHooks.some(h => h.unitId === q.courseHook.unitId)) {
          remedialHooks.push(q.courseHook);
        }
      }

      if (tierBreakdown[q.tier]) {
        tierBreakdown[q.tier].total++;
        if (isCorrect) tierBreakdown[q.tier].correct++;
      }

      const dim = q.dimension || '文法句構';
      if (!dimensionBreakdown[dim]) dimensionBreakdown[dim] = { total: 0, correct: 0 };
      dimensionBreakdown[dim].total++;
      if (isCorrect) dimensionBreakdown[dim].correct++;
    });

    const scaledScore = Math.min(100, Math.round((userWeightedScore / maxPossibleWeighted) * 100));

    // 計算能力失速臨界點 (Stall Point)
    let stallTier = 8;
    for (let t = 1; t <= 8; t++) {
      const stat = tierBreakdown[t];
      if (stat && stat.total > 0) {
        const acc = stat.correct / stat.total;
        if (acc < 0.5) {
          stallTier = t;
          break;
        }
      }
    }

    return {
      rawCorrect,
      totalQuestions: questions.length,
      userWeightedScore: Math.round(userWeightedScore * 10) / 10,
      scaledScore,
      stallTier,
      stallTierLabel: tierBreakdown[stallTier]?.name || '本次各層級均有作答',
      tierBreakdown,
      dimensionBreakdown,
      remedialHooks: remedialHooks.slice(0, 6)
    };
  }
}

export const questionDB = new QuestionBankDB();

