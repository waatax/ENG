// junyi_engine.mjs - 均一教育平台 (Junyi Academy) 風格學習引擎
// 包含技能精熟追蹤、鷹架提示 (Scaffolding Hints)、步驟 0 破題思維、致命陷阱 X 光機與 XP 徽章系統

const STORAGE_KEY = 'junyi-mastery-v1';

// 精熟等級定義
export const MASTERY_LEVELS = {
  UNSTARTED: { code: 'unstarted', label: '未開始', icon: '⚪', xp: 0, color: '#94a3b8' },
  PRACTICING: { code: 'practicing', label: '練習中', icon: '🟡', xp: 50, color: '#f59e0b' },
  FAMILIAR: { code: 'familiar', label: '熟悉', icon: '🟢', xp: 120, color: '#10b981' },
  MASTERED: { code: 'mastered', label: '精熟', icon: '⭐', xp: 200, color: '#6366f1' }
};

// 均一素養徽章
export const JUNYI_BADGES = [
  { id: 'badge-phonics', title: '拼讀領航員', desc: '掌握自然拼讀與長短母音規則', icon: '🔤', reqXp: 100 },
  { id: 'badge-grammar-scout', title: '語法偵探', desc: '熟練時態標記與主動被動轉換', icon: '🔍', reqXp: 300 },
  { id: 'badge-clause-architect', title: '句型建築師', desc: '掌握複合句、連接詞與關係代名詞子句', icon: '🏛️', reqXp: 600 },
  { id: 'badge-reading-ace', title: '跨文本閱讀王', desc: '能快速解讀時刻表、地圖與長篇多模態文本', icon: '📜', reqXp: 1000 },
  { id: 'badge-cap-grandmaster', title: '會考全勝神將', desc: '完成 109–115 國中會考歷屆考點診斷', icon: '👑', reqXp: 1500 }
];

// 均一致命陷阱避雷清單 (台灣學生最常犯失分點)
export const FATAL_TRAPS = [
  {
    id: 'trap-1',
    gradeBand: '國小/國中初階',
    topic: '現在進行式漏掉 be 動詞',
    wrong: 'He playing basketball now. ❌',
    correct: 'He is playing basketball now. ✔️',
    explanation: '進行式的核心公式是「be動詞＋V-ing」，兩者缺一不可。只寫 V-ing 只是分詞，不能獨立充當句子主要動詞。',
    step0Clue: '看到時間副詞 now / right now 或感嘆詞 Look! / Listen!，先確定動詞是否有 be 動詞 (am/is/are) 再加 -ing。'
  },
  {
    id: 'trap-2',
    gradeBand: '國小/國中初階',
    topic: '頻率副詞位置搞混',
    wrong: 'He goes always to school by bus. ❌',
    correct: 'He always goes to school by bus. ✔️',
    explanation: '頻率副詞口訣：「Be後動前」——在 be 動詞與助動詞之後，一般動詞之前。',
    step0Clue: '先圈出句子中的動詞：如果是一般動詞 (go, eat, study)，副詞放前面；如果是 be 動詞 (is, am, are)，副詞放後面。'
  },
  {
    id: 'trap-3',
    gradeBand: '國中中階',
    topic: '連接詞雙重使用 (Although... but / Because... so)',
    wrong: 'Although it rained hard, but we still played soccer. ❌',
    correct: 'Although it rained hard, we still played soccer. ✔️',
    explanation: '英文一個句子只能有一個連接詞連接兩個子句。Although 和 but 都是連接詞，不能同時出現；Because 和 so 亦同。',
    step0Clue: '數句子裡的動詞數量：如果有兩個主要動詞，只能有一個連接詞；出現兩個連接詞必定語法錯誤。'
  },
  {
    id: 'trap-4',
    gradeBand: '國中高階/高中',
    topic: '關係代名詞 that 前加逗號或介系詞',
    wrong: 'Taipei 101, that is located in Xinyi, is famous. ❌',
    correct: 'Taipei 101, which is located in Xinyi, is famous. ✔️',
    explanation: 'that 作為關係代名詞時，有兩大絕對禁忌：1. 前面不可有逗號（非限定子句不可用 that）；2. 前面不可有介系詞（如 in that ❌，需用 in which）。',
    step0Clue: '看到關係子句空格前有「,」或介系詞 (in, on, at, with)，立刻排除選項 that。'
  },
  {
    id: 'trap-5',
    gradeBand: '高中/統測學測',
    topic: '不及物動詞誤用被動態',
    wrong: 'The traffic accident was happened yesterday. ❌',
    correct: 'The traffic accident happened yesterday. ✔️',
    explanation: 'happen, occur, take place, exist, disappear 等均為完全不及物動詞，沒有受詞，因此「絕對沒有被動語態」。',
    step0Clue: '看到 happen / occur 等發生類動詞，看到選項中有 was happened / is occurred 直接劃掉！'
  }
];

export class JunyiEngine {
  constructor() {
    this.data = this.loadState();
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // ignore
    }
    return {
      xp: 0,
      streak: 1,
      lastActive: new Date().toISOString().slice(0, 10),
      mastery: {}, // unitId: 'unstarted' | 'practicing' | 'familiar' | 'mastered'
      unitScores: {}, // unitId: { correct: 0, total: 0 }
      earnedBadges: []
    };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // ignore
    }
  }

  getUnitMastery(unitId) {
    return this.data.mastery[unitId] || 'unstarted';
  }

  recordUnitAttempt(unitId, isCorrect) {
    if (!this.data.unitScores[unitId]) {
      this.data.unitScores[unitId] = { correct: 0, total: 0 };
    }
    this.data.unitScores[unitId].total += 1;
    if (isCorrect) {
      this.data.unitScores[unitId].correct += 1;
      this.addXp(15);
    } else {
      this.addXp(3);
    }

    const { correct, total } = this.data.unitScores[unitId];
    const rate = correct / total;
    if (total >= 4 && rate >= 0.85) {
      this.setUnitMastery(unitId, 'mastered');
    } else if (total >= 2 && rate >= 0.6) {
      this.setUnitMastery(unitId, 'familiar');
    } else if (total >= 1) {
      this.setUnitMastery(unitId, 'practicing');
    }
    this.saveState();
  }

  setUnitMastery(unitId, level) {
    const prev = this.data.mastery[unitId];
    this.data.mastery[unitId] = level;
    if (level === 'mastered' && prev !== 'mastered') {
      this.addXp(100);
    }
    this.saveState();
  }

  addXp(amount) {
    this.data.xp += amount;
    this.checkBadges();
    this.saveState();
  }

  checkBadges() {
    for (const b of JUNYI_BADGES) {
      if (!this.data.earnedBadges.includes(b.id) && this.data.xp >= b.reqXp) {
        this.data.earnedBadges.push(b.id);
      }
    }
  }

  getSummary() {
    const masteredCount = Object.values(this.data.mastery).filter(m => m === 'mastered').length;
    const practicingCount = Object.values(this.data.mastery).filter(m => m === 'practicing' || m === 'familiar').length;
    return {
      xp: this.data.xp,
      masteredCount,
      practicingCount,
      badges: this.data.earnedBadges,
      streak: this.data.streak
    };
  }
}

export const junyi = new JunyiEngine();
