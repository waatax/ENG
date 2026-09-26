// question_db.mjs - 20,000 題全考制題庫資料庫引擎（支援 IndexedDB 本地持久化、動態分包載入與 Fisher-Yates 隨機抽題）

const DB_NAME = 'EnglishQuestDB';
const DB_VERSION = 1;
const STORE_NAME = 'questions';

export const CATEGORY_META = {
  all: { id: 'all', name: '全部考科綜合隨機 (20,000 題)', total: 20000, color: 'blue' },
  gaokao: { id: 'gaokao', name: '歷年高考真題庫 (6,000 題)', total: 6000, color: 'emerald' },
  jhs: { id: 'jhs', name: '國中教育會考英語 (1,000 題)', total: 1000, color: 'green' },
  shs: { id: 'shs', name: '高中大學學測英文 (1,000 題)', total: 1000, color: 'purple' },
  toeic: { id: 'toeic', name: 'TOEIC 多益商務英語 (3,000 題)', total: 3000, color: 'amber' },
  sat: { id: 'sat', name: 'Digital SAT 數位測驗 (3,000 題)', total: 3000, color: 'indigo' },
  gre: { id: 'gre', name: 'GRE 研究所 Verbal (3,000 題)', total: 3000, color: 'rose' },
  gmat: { id: 'gmat', name: 'GMAT Focus 批判推理 (3,000 題)', total: 3000, color: 'cyan' }
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
      totalQuestions: 20000,
      totalLoaded,
      categories: catStats,
      diagnosticTotal: 1000,
      diagnosticLoaded: this.diagnosticPool.length
    };
  }

  // 載入 1,000 題全階能力診斷題庫 (國小至GRE/GMAT)
  async loadDiagnosticBank() {
    if (this.diagnosticPool.length >= 1000) {
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
        if (items.length >= 500) {
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

  // 30 題分層階梯自適應抽題演算法 (Tier-balanced Stratified Sampling)
  // 配比：Tier 1 (4) + Tier 2 (4) + Tier 3 (4) + Tier 4 (5) + Tier 5 (4) + Tier 6 (4) + Tier 7 (3) + Tier 8 (2) = 30 題
  async sampleDiagnostic30() {
    await this.initPromise;
    const pool = await this.loadDiagnosticBank();
    if (!pool || !pool.length) return [];

    const tierQuotas = {
      1: 4, // 國小基礎 (Pre-A1~A1)
      2: 4, // 國中基礎 (A1~A2)
      3: 4, // 國中精熟 (A2~B1)
      4: 5, // 高中學測 (B1~B2)
      5: 4, // TOEIC商務 (B2)
      6: 4, // Digital SAT (B2~C1)
      7: 3, // GRE Verbal (C1~C2)
      8: 2  // GMAT CR (C2/C2+)
    };

    const sampledQuestions = [];

    for (let t = 1; t <= 8; t++) {
      const quota = tierQuotas[t] || 4;
      const candidates = pool.filter(q => q.tier === t);
      if (!candidates.length) continue;

      // Fisher-Yates 洗牌
      const shuffled = [...candidates];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      sampledQuestions.push(...shuffled.slice(0, quota));
    }

    return sampledQuestions;
  }

  // 診斷測驗專家級多維度成績與能力評估引擎
  evaluateDiagnostic(userAnswers, questions) {
    const weights = { 1: 1.0, 2: 1.5, 3: 2.0, 4: 2.5, 5: 3.0, 6: 3.5, 7: 4.0, 8: 4.5 };
    const maxPossibleWeighted = (4*1.0) + (4*1.5) + (4*2.0) + (5*2.5) + (4*3.0) + (4*3.5) + (3*4.0) + (2*4.5); // 77.5

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
      const isCorrect = userChoice === q.answer;

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

    // CEFR 等級與榮譽段位
    let cefr = 'Pre-A1';
    let honoraryBadge = { title: '🌱 語言啟蒙拓荒者', desc: '英語學習起步階段，正快速建立基礎語感與核心詞彙。' };
    let predicted = {
      cap: 'C (待加強)',
      gsat: '1~4 級分 (底標)',
      toeic: '220 ~ 380 分',
      sat: '400 ~ 480 分',
      gre: '130 ~ 140 分',
      gmat: '400 ~ 485 分'
    };

    if (scaledScore >= 92) {
      cefr = 'C2 (大師巨擘級)';
      honoraryBadge = { title: '👑 英語頂尖巨擘 (Grandmaster of English)', desc: '具備國際頂尖學者與商業決策層級的深奧語意辨析與批判推理能力！' };
      predicted = { cap: 'A++ (精熟滿級)', gsat: '15 級分 (頂標頂峰)', toeic: '960 ~ 990 分 (金色證書)', sat: '750 ~ 800 分', gre: '165 ~ 170 分', gmat: '715 ~ 805 分' };
    } else if (scaledScore >= 80) {
      cefr = 'C1 (進階學術精熟)';
      honoraryBadge = { title: '🏛️ 語意邏輯思辨家 (Verbal Strategist)', desc: '精熟學術長難句、反向邏輯修辭，能勝任海外名校研究生與高端職場要求。' };
      predicted = { cap: 'A++ (精熟)', gsat: '14 ~ 15 級分 (頂標)', toeic: '900 ~ 955 分 (金色證書)', sat: '690 ~ 740 分', gre: '158 ~ 164 分', gmat: '655 ~ 705 分' };
    } else if (scaledScore >= 68) {
      cefr = 'B2 (高階流暢溝通)';
      honoraryBadge = { title: '💼 國際商務實戰家 (Global Communicator)', desc: '具備優秀跨文化溝通與高中學測頂尖水準，能自如處理複雜商務文件與論述。' };
      predicted = { cap: 'A+ (精熟)', gsat: '12 ~ 13 級分 (前標)', toeic: '785 ~ 895 分 (藍金雙證)', sat: '620 ~ 680 分', gre: '150 ~ 157 分', gmat: '595 ~ 645 分' };
    } else if (scaledScore >= 52) {
      cefr = 'B1 (中級獨立運用)';
      honoraryBadge = { title: '🏹 高中學測精銳士 (GSAT Vanguard)', desc: '扎實掌握國中會考核心時態、被動與子句結構，正大步邁入高中學術篇章領域。' };
      predicted = { cap: 'A (精熟基礎)', gsat: '9 ~ 11 級分 (均標/前標)', toeic: '600 ~ 780 分 (綠藍證書)', sat: '530 ~ 610 分', gre: '144 ~ 149 分', gmat: '515 ~ 585 分' };
    } else if (scaledScore >= 36) {
      cefr = 'A2 (基礎生活自理)';
      honoraryBadge = { title: '⚔️ 國中會考領航員 (JHS Navigator)', desc: '熟悉日常問答、過去簡單式與頻率副詞，正處於會考衝刺 A 級關鍵躍升期。' };
      predicted = { cap: 'B+ ~ B++ (基礎良好)', gsat: '6 ~ 8 級分 (後標)', toeic: '450 ~ 595 分', sat: '470 ~ 520 分', gre: '138 ~ 143 分', gmat: '465 ~ 505 分' };
    } else if (scaledScore >= 20) {
      cefr = 'A1 (基礎語法奠基)';
      honoraryBadge = { title: '🌿 基礎語法奠基者 (Grammar Builder)', desc: '已掌握字母拼讀、名詞單複數與基本 be 動詞，持續透過微課鞏固文法框架。' };
      predicted = { cap: 'B (基礎入門)', gsat: '4 ~ 5 級分', toeic: '320 ~ 445 分', sat: '420 ~ 460 分', gre: '132 ~ 137 分', gmat: '425 ~ 455 分' };
    }

    return {
      rawCorrect,
      totalQuestions: questions.length,
      userWeightedScore: Math.round(userWeightedScore * 10) / 10,
      scaledScore,
      stallTier,
      stallTierLabel: tierBreakdown[stallTier]?.name || '未達失速點 (已達頂峰)',
      cefr,
      honoraryBadge,
      predicted,
      tierBreakdown,
      dimensionBreakdown,
      remedialHooks: remedialHooks.slice(0, 6)
    };
  }
}

export const questionDB = new QuestionBankDB();

