// duolingo_game.mjs - 深度參考 Duolingo, Quizlet, Memrise 之遊戲化學習引擎
// 嚴格規範：僅限於第一章（jhs:j1 句子骨架與基本時態）示範使用，落實認知減負與精準學習

import { junyi } from './junyi_engine.mjs';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Web Audio API & Speech Synthesis 音效語音引擎
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playDuolingoSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'correct') {
      // Duolingo 經典雙音正解和弦 (C5 -> E5)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc2.frequency.setValueAtTime(659.25, now); // E5
      osc2.frequency.setValueAtTime(783.99, now + 0.1); // G5

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    } else if (type === 'wrong') {
      // Duolingo 低音答錯音效
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(146.83, now + 0.35); // A3 -> D3

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'click') {
      // 單字積木點擊音效
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'match') {
      // Quizlet / Duolingo 連連看配對水晶聲 (A5 -> D6)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'victory') {
      // 闖關大滿貫勝利號角 (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.4);
      });
    }
  } catch (e) {
    console.warn('Audio play failed:', e);
  }
}

export function speakSentence(text, rate = 1.0) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.warn('Speech synthesis failed:', e);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. 嚴格章節邊界保護 (Strict Chapter Guard)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function isDuolingoEligible(chapterKey) {
  const norm = String(chapterKey || '').trim().toLowerCase();
  return norm === 'jhs:j1' || norm === 'j1';
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. 遊戲狀態管理 (Game State)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const duolingoState = {
  isOpen: false,
  hearts: 5,
  maxHearts: 5,
  streak: 1,
  xpEarned: 0,
  combo: 0,
  stageIndex: 0,
  totalStages: 5,
  completed: false,
  drawer: null, // { isCorrect, title, message }
  
  // Stage 1: Word Bank
  s1Pool: ['Actions', 'speak', 'louder', 'than', 'words.', 'speaks', 'loud', 'is'],
  s1Selected: [],

  // Stage 2: Match Pairs
  s2Pairs: [
    { en: 'sentence', zh: '句子；判決' },
    { en: 'action', zh: '動作；行動' },
    { en: 'habit', zh: '習慣' },
    { en: 'future', zh: '未來；未來的' },
    { en: 'yesterday', zh: '昨天' },
    { en: 'tomorrow', zh: '明天' }
  ],
  s2Tiles: [],
  s2SelectedCard: null,
  s2MatchedPairs: [],

  // Stage 3: Listen & Build
  s3Target: ['The', 'teacher', 'told', 'us', 'that', 'water', 'boils', 'at', '100°C.'],
  s3Pool: ['The', 'teacher', 'told', 'us', 'that', 'water', 'boils', 'at', '100°C.', 'boiled', 'will', 'boil'],
  s3Selected: [],

  // Stage 4: Rapid Trap Buster
  s4Answer: null, // user selected index

  // Stage 5: Dialogue Roleplay
  s5Answer: null
};

// 初始化連連看洗牌
function initMatchTiles() {
  const tiles = [];
  duolingoState.s2Pairs.forEach((pair, idx) => {
    tiles.push({ id: `en-${idx}`, pairId: idx, text: pair.en, type: 'en' });
    tiles.push({ id: `zh-${idx}`, pairId: idx, text: pair.zh, type: 'zh' });
  });
  // Fisher-Yates shuffle
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  duolingoState.s2Tiles = tiles;
  duolingoState.s2SelectedCard = null;
  duolingoState.s2MatchedPairs = [];
}

export function resetDuolingoGame() {
  duolingoState.hearts = 5;
  duolingoState.stageIndex = 0;
  duolingoState.xpEarned = 0;
  duolingoState.combo = 0;
  duolingoState.completed = false;
  duolingoState.drawer = null;
  duolingoState.s1Selected = [];
  duolingoState.s1Pool = ['Actions', 'speak', 'louder', 'than', 'words.', 'speaks', 'loud', 'is'];
  initMatchTiles();
  duolingoState.s3Selected = [];
  duolingoState.s3Pool = ['The', 'teacher', 'told', 'us', 'that', 'water', 'boils', 'at', '100°C.', 'boiled', 'will', 'boil'];
  duolingoState.s4Answer = null;
  duolingoState.s5Answer = null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. UI 渲染：Hero Banner (章節頂部入口橫幅)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function renderDuolingoHeroBanner(chapterKey) {
  if (!isDuolingoEligible(chapterKey)) return '';

  return `
    <div class="duo-hero-banner" style="margin-bottom:24px;background:linear-gradient(135deg, #10b981 0%, #059669 100%);color:#fff;border-radius:16px;padding:20px 24px;box-shadow:0 10px 25px -5px rgba(16,185,129,0.35);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px">
      <div style="max-width:680px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span style="font-size:24px">🦉</span>
          <span class="pill" style="background:#ecfdf5;color:#047857;font-weight:700;font-size:12px">DUOLINGO 互動遊戲學習旗艦體驗</span>
          <span class="chip" style="background:rgba(255,255,255,0.2);color:#fff;font-weight:600;font-size:11px">★ 僅限第一章示範</span>
        </div>
        <h2 style="margin:6px 0 8px;font-size:20px;color:#fff">第 01 章 專屬：多鄰國闖關模式 (Duolingo Quest Mode)</h2>
        <p style="margin:0;color:#d1fae5;font-size:13.5px;line-height:1.55">
          依據學習科學認知減負規範，本站<strong>僅在第一章（句子骨架與基本時態）深度實裝遊戲化引擎</strong>！
          融合 Duolingo 5 顆愛心體力、單字積木排詞、Quizlet 連連看配對、盲聽拼句、考場避雷急速射擊與對話接龍，讓基礎文法時態徹底在闖關中精熟！
        </p>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
        <button class="btn duo-launch-btn" data-duo-action="open" style="background:#ffffff;color:#065f46;font-weight:800;font-size:15px;padding:12px 26px;border-radius:30px;box-shadow:0 4px 14px rgba(0,0,0,0.15);border:none;display:flex;align-items:center;gap:8px">
          <span>🎮</span> 啟動 Duolingo 闖關 (+50 XP)
        </button>
        <span style="font-size:11px;color:#d1fae5">❤️❤️❤️❤️❤️ 5條命 · 關閉解析獨立挑戰</span>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. UI 渲染：遊戲主體介面 (Duolingo Game Modal / Container)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function renderDuolingoGameView() {
  if (!duolingoState.isOpen) return '';

  const progressPct = Math.round((duolingoState.stageIndex / duolingoState.totalStages) * 100);
  const heartsHtml = Array.from({ length: duolingoState.maxHearts }).map((_, i) => 
    i < duolingoState.hearts ? '<span class="duo-heart active">❤️</span>' : '<span class="duo-heart lost">🖤</span>'
  ).join('');

  // 關卡主體
  let stageHtml = '';

  if (duolingoState.completed) {
    stageHtml = renderVictoryScreen();
  } else if (duolingoState.hearts <= 0) {
    stageHtml = renderOutOfHeartsScreen();
  } else {
    switch (duolingoState.stageIndex) {
      case 0:
        stageHtml = renderStage1WordBank();
        break;
      case 1:
        stageHtml = renderStage2MatchPairs();
        break;
      case 2:
        stageHtml = renderStage3ListenAssemble();
        break;
      case 3:
        stageHtml = renderStage4TrapBuster();
        break;
      case 4:
        stageHtml = renderStage5DialogueStories();
        break;
    }
  }

  // 底部回饋抽屜 (Duolingo Sliding Drawer)
  const drawerHtml = duolingoState.drawer ? `
    <div class="duo-drawer ${duolingoState.drawer.isCorrect ? 'duo-drawer-correct' : 'duo-drawer-wrong'}">
      <div class="duo-drawer-inner">
        <div class="duo-drawer-info">
          <div class="duo-drawer-icon">${duolingoState.drawer.isCorrect ? '🎉' : '❌'}</div>
          <div>
            <strong class="duo-drawer-title">${duolingoState.drawer.title}</strong>
            <div class="duo-drawer-msg">${duolingoState.drawer.message}</div>
          </div>
        </div>
        <button class="btn duo-drawer-btn" data-duo-action="next-stage">
          ${duolingoState.drawer.isCorrect ? '繼續 ➔' : '知道了 ➔'}
        </button>
      </div>
    </div>
  ` : '';

  return `
    <section class="card duo-game-container" style="border:2px solid #10b981;padding:0;overflow:hidden;border-radius:18px;background:#f8fafc;margin-bottom:28px">
      <!-- 頂部 Duolingo 導覽列 -->
      <div class="duo-topbar" style="background:#ffffff;padding:14px 20px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;gap:16px">
        <button class="btn quiet small duo-close-btn" data-duo-action="close" title="退出遊戲模式">✕ 結束遊戲</button>
        
        <!-- 進度條 -->
        <div class="duo-progress-track" style="flex:1;max-width:480px;height:14px;background:#e2e8f0;border-radius:8px;overflow:hidden;position:relative">
          <div class="duo-progress-fill" style="width:${progressPct}%;height:100%;background:#10b981;border-radius:8px;transition:width 0.4s ease"></div>
        </div>

        <!-- 狀態數值：Combo、XP 與 愛心 -->
        <div style="display:flex;align-items:center;gap:14px">
          ${duolingoState.combo > 1 ? `<span class="duo-combo-badge">🔥 ${duolingoState.combo}x COMBO</span>` : ''}
          <span style="font-weight:700;color:#2563eb;font-size:13px">💎 +${duolingoState.xpEarned} XP</span>
          <div class="duo-hearts-box" style="display:flex;gap:3px;font-size:16px">${heartsHtml}</div>
        </div>
      </div>

      <!-- 關卡主要互動區域 -->
      <div class="duo-stage-body" style="padding:28px 24px;min-height:380px;display:flex;flex-direction:column;justify-content:center">
        ${stageHtml}
      </div>

      <!-- 底部抽屜通知 -->
      ${drawerHtml}
    </section>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 關卡 1: 單字積木組裝 (Word Bank Sentence Assembly)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderStage1WordBank() {
  return `
    <div style="max-width:680px;margin:0 auto;width:100%">
      <div class="duo-quest-header" style="text-align:center;margin-bottom:20px">
        <span class="pill" style="background:#e0e7ff;color:#3730a3">關卡 1 / 5 · 單字積木拼句 (Duolingo Word Bank)</span>
        <h3 style="margin:8px 0 4px;font-size:18px;color:#0f172a">重組五大基本句型 (S + V + O)：拼出經典格言</h3>
        <p style="color:#64748b;font-size:14px;margin:0">
          點擊下方積木，拼出：「<strong>行動勝於空談 (習慣格言)</strong>」
        </p>
      </div>

      <!-- 已放置的積木放置槽 (Sentence Slot) -->
      <div class="duo-sentence-slot" style="min-height:56px;background:#ffffff;border:2px dashed #94a3b8;border-radius:12px;padding:10px 14px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:24px">
        ${duolingoState.s1Selected.length === 0 ? '<span style="color:#94a3b8;font-size:14px">點擊下方單字積木移至此處...</span>' : ''}
        ${duolingoState.s1Selected.map((word, idx) => `
          <button class="duo-chip duo-chip-placed" data-duo-action="s1-remove" data-index="${idx}">
            ${word}
          </button>
        `).join('')}
      </div>

      <!-- 候選積木庫 (Word Pool) -->
      <div class="duo-chips-pool" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:28px">
        ${duolingoState.s1Pool.map((word, idx) => `
          <button class="duo-chip duo-chip-pool" data-duo-action="s1-select" data-index="${idx}">
            ${word}
          </button>
        `).join('')}
      </div>

      <!-- 檢查按鈕 -->
      <div style="text-align:center">
        <button class="btn duo-check-btn" data-duo-action="s1-check" ${duolingoState.s1Selected.length === 0 ? 'disabled' : ''} style="background:#10b981;color:#fff;font-weight:700;padding:10px 32px;border-radius:24px;border:none">
          檢查答案 (Check) ➔
        </button>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 關卡 2: 連連看急速消除 (Quizlet & Duolingo Speed Match Pairs)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderStage2MatchPairs() {
  return `
    <div style="max-width:720px;margin:0 auto;width:100%">
      <div class="duo-quest-header" style="text-align:center;margin-bottom:18px">
        <span class="pill" style="background:#fef3c7;color:#92400e">關卡 2 / 5 · 連連看急速配對 (Quizlet & Duolingo Match)</span>
        <h3 style="margin:8px 0 4px;font-size:18px;color:#0f172a">第 01 章 核心字彙形音義配對消除</h3>
        <p style="color:#64748b;font-size:14px;margin:0">
          點選英文單字與對應中文釋義，完成 6 組配對消除（已消除：${duolingoState.s2MatchedPairs.length} / 6）：
        </p>
      </div>

      <!-- 12 塊打亂卡片網格 -->
      <div class="duo-match-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:20px">
        ${duolingoState.s2Tiles.map(tile => {
          const isMatched = duolingoState.s2MatchedPairs.includes(tile.pairId);
          const isSelected = duolingoState.s2SelectedCard?.id === tile.id;
          return `
            <button class="duo-match-tile ${isMatched ? 'is-matched' : ''} ${isSelected ? 'is-selected' : ''}" 
                    data-duo-action="s2-card" data-tile-id="${tile.id}" ${isMatched ? 'disabled' : ''}
                    style="padding:14px 10px;border-radius:10px;font-size:14px;font-weight:600;text-align:center;transition:all 0.2s">
              ${isMatched ? `✔️ ${tile.text}` : tile.text}
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 關卡 3: 盲聽組裝拼句 (Duolingo Listen & Tap)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderStage3ListenAssemble() {
  return `
    <div style="max-width:680px;margin:0 auto;width:100%">
      <div class="duo-quest-header" style="text-align:center;margin-bottom:20px">
        <span class="pill" style="background:#ecfdf5;color:#047857">關卡 3 / 5 · 聽音拼句挑戰 (Duolingo Listen & Tap)</span>
        <h3 style="margin:8px 0 4px;font-size:18px;color:#0f172a">聆聽美語語音，注意科學真理現在式陷阱！</h3>
        <p style="color:#64748b;font-size:14px;margin:0">點擊播放語音，依序排好你聽到的句子：</p>
      </div>

      <!-- 雙速語音播放器 -->
      <div style="display:flex;justify-content:center;align-items:center;gap:14px;margin-bottom:22px">
        <button class="btn duo-audio-btn normal" data-duo-action="s3-audio-normal" title="正常速度朗讀">
          🔊 正常速度 (1.0x)
        </button>
        <button class="btn duo-audio-btn slow" data-duo-action="s3-audio-slow" title="烏龜慢速朗讀">
          🐢 烏龜慢速 (0.6x)
        </button>
      </div>

      <!-- 句子插槽 -->
      <div class="duo-sentence-slot" style="min-height:56px;background:#ffffff;border:2px dashed #94a3b8;border-radius:12px;padding:10px 14px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:22px">
        ${duolingoState.s3Selected.length === 0 ? '<span style="color:#94a3b8;font-size:14px">點擊下方積木排入聽到的句子...</span>' : ''}
        ${duolingoState.s3Selected.map((word, idx) => `
          <button class="duo-chip duo-chip-placed" data-duo-action="s3-remove" data-index="${idx}">
            ${word}
          </button>
        `).join('')}
      </div>

      <!-- 候選池 (含干擾項) -->
      <div class="duo-chips-pool" style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-bottom:26px">
        ${duolingoState.s3Pool.map((word, idx) => `
          <button class="duo-chip duo-chip-pool" data-duo-action="s3-select" data-index="${idx}">
            ${word}
          </button>
        `).join('')}
      </div>

      <div style="text-align:center">
        <button class="btn duo-check-btn" data-duo-action="s3-check" ${duolingoState.s3Selected.length === 0 ? 'disabled' : ''} style="background:#10b981;color:#fff;font-weight:700;padding:10px 32px;border-radius:24px;border:none">
          檢查聽力組裝 (Check) ➔
        </button>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 關卡 4: 考場地雷急速快射 (Grammar Trap Rapid Buster)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderStage4TrapBuster() {
  const options = [
    { text: 'melts', isCorrect: true, reason: '【正解】科學真理與自然物理法則，無論主句為過去式 told，名詞子句永遠維持現在簡單式 melts！' },
    { text: 'melted', isCorrect: false, reason: '【陷阱】誤受主句過去式 told 影響而時態一致。' },
    { text: 'was melting', isCorrect: false, reason: '【陷阱】誤受 Look 影響而選進行式。' },
    { text: 'will melt', isCorrect: false, reason: '【陷阱】客觀真理無需使用未來式。' }
  ];

  return `
    <div style="max-width:680px;margin:0 auto;width:100%">
      <div class="duo-quest-header" style="text-align:center;margin-bottom:18px">
        <span class="pill" style="background:#fee2e2;color:#991b1b">關卡 4 / 5 · 考場避雷急速射擊 (Rapid Trap Buster)</span>
        <h3 style="margin:8px 0 4px;font-size:18px;color:#0f172a">真理現在式例外：一秒識破會考誘答陷阱</h3>
      </div>

      <div class="card" style="background:#ffffff;border:1px solid #cbd5e1;border-radius:12px;padding:18px;margin-bottom:20px;font-size:16px;color:#0f172a;line-height:1.6">
        "Look at the chemistry experiment! The science teacher told us yesterday that ice ________ into water above 0°C."
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        ${options.map((opt, idx) => `
          <button class="btn duo-option-btn" data-duo-action="s4-answer" data-index="${idx}" style="padding:14px;border-radius:10px;text-align:left;font-size:15px;font-weight:600">
            ${String.fromCharCode(65 + idx)}. ${opt.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 關卡 5: 對話接龍角色扮演 (Duolingo Stories Dialogue Roleplay)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderStage5DialogueStories() {
  const choices = [
    { text: 'I am finishing my English homework about verb tenses. Did you finish yours yesterday?', isCorrect: true, reason: '【正解】現在進行式精確回應 "what are you doing right now"，過去式 finish yours yesterday 提問符合邏輯。' },
    { text: 'I finish my homework tomorrow afternoon with my friend.', isCorrect: false, reason: '【時態矛盾】現在簡單式無法搭配明天下午 (tomorrow afternoon) 未來副詞。' },
    { text: 'I was finishing my English homework right now.', isCorrect: false, reason: '【時態矛盾】過去進行式 was finishing 不可搭配 right now。' }
  ];

  return `
    <div style="max-width:680px;margin:0 auto;width:100%">
      <div class="duo-quest-header" style="text-align:center;margin-bottom:18px">
        <span class="pill" style="background:#dbeafe;color:#1e40af">關卡 5 / 5 · 情境對話接龍 (Duolingo Stories Roleplay)</span>
        <h3 style="margin:8px 0 4px;font-size:18px;color:#0f172a">第 01 章 情境角色扮演：與 Alex 展開真實對話</h3>
      </div>

      <!-- Alex 的對話氣泡 -->
      <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:20px">
        <div style="font-size:28px">👦</div>
        <div style="background:#e2e8f0;padding:12px 18px;border-radius:14px 14px 14px 2px;max-width:480px">
          <strong>Alex:</strong>
          <div style="font-size:15px;margin-top:2px">"Hey Beth, what are you doing right now?"</div>
          <button class="btn small quiet" data-duo-action="s5-speak" style="margin-top:6px;padding:2px 8px;font-size:12px">🔊 聽 Alex 說話</button>
        </div>
      </div>

      <!-- 提示 -->
      <div style="font-size:14px;color:#475569;margin-bottom:12px;font-weight:600">
        💬 輪到你了！請扮演 Beth，選擇文法最正確且情境呼應的回答：
      </div>

      <!-- 候選回答氣泡 -->
      <div style="display:grid;gap:10px">
        ${choices.map((c, idx) => `
          <button class="btn duo-story-choice" data-duo-action="s5-answer" data-index="${idx}" style="text-align:left;padding:12px 16px;border-radius:10px;font-size:14px;background:#ffffff;border:1px solid #cbd5e1">
            <strong>${String.fromCharCode(65 + idx)}.</strong> ${c.text}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 結算畫面 (Victory & Out of Hearts)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderVictoryScreen() {
  return `
    <div style="text-align:center;padding:20px 0;max-width:560px;margin:0 auto">
      <div style="font-size:56px;margin-bottom:8px">🎉</div>
      <span class="pill" style="background:#ecfdf5;color:#047857;font-weight:700">🏆 闖關大滿貫！LESSON COMPLETE</span>
      <h2 style="margin:12px 0 6px;color:#0f172a;font-size:24px">恭喜通過第 01 章 Duolingo 遊戲化學習！</h2>
      <p style="color:#64748b;font-size:15px;margin:0 0 20px">
        你已完全掌握五大基本句型、四大核心時態、客觀真理現在式例外與情境對話！
      </p>

      <!-- 成就統計卡片 -->
      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:24px">
        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:12px;border-radius:12px">
          <div style="font-size:12px;color:#64748b">獲得經驗值</div>
          <strong style="font-size:20px;color:#10b981">+${duolingoState.xpEarned} XP</strong>
        </div>
        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:12px;border-radius:12px">
          <div style="font-size:12px;color:#64748b">剩餘體力</div>
          <strong style="font-size:20px;color:#e11d48">${duolingoState.hearts} / 5 ❤️</strong>
        </div>
        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:12px;border-radius:12px">
          <div style="font-size:12px;color:#64748b">最高連擊</div>
          <strong style="font-size:20px;color:#f59e0b">${duolingoState.combo} 連對 🔥</strong>
        </div>
      </div>

      <div style="display:flex;justify-content:center;gap:12px">
        <button class="btn primary" data-duo-action="replay" style="background:#10b981;font-weight:700;padding:12px 24px;border-radius:24px">
          🔁 再挑戰一次 (+20 XP)
        </button>
        <button class="btn quiet" data-duo-action="close" style="padding:12px 24px;border-radius:24px">
          📖 返回第 01 章深度講義
        </button>
      </div>
    </div>
  `;
}

function renderOutOfHeartsScreen() {
  return `
    <div style="text-align:center;padding:30px 0;max-width:500px;margin:0 auto">
      <div style="font-size:52px;margin-bottom:8px">💔</div>
      <h2 style="margin:8px 0;color:#e11d48">體力耗盡！愛心歸零</h2>
      <p style="color:#64748b;font-size:14.5px;margin:0 0 20px">
        做題稍有小失誤，不用灰心！點擊下方按鈕免費補滿 5 顆愛心，重新挑戰本章五大關卡！
      </p>
      <button class="btn primary" data-duo-action="refill" style="background:#e11d48;font-weight:700;padding:12px 28px;border-radius:24px">
        💖 補滿 5 顆愛心並重新開始
      </button>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. 點擊事件委派處理 (Event Delegation Handler)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function handleDuolingoClick(button, rerender) {
  const action = button.dataset.duoAction;
  if (!action) return false;

  playDuolingoSound('click');

  // 開啟遊戲
  if (action === 'open') {
    resetDuolingoGame();
    duolingoState.isOpen = true;
    rerender();
    return true;
  }

  // 關閉遊戲
  if (action === 'close') {
    duolingoState.isOpen = false;
    rerender();
    return true;
  }

  // 體力補滿重開
  if (action === 'refill' || action === 'replay') {
    resetDuolingoGame();
    duolingoState.isOpen = true;
    rerender();
    return true;
  }

  // 下一關卡 (抽屜點擊)
  if (action === 'next-stage') {
    duolingoState.drawer = null;
    duolingoState.stageIndex++;
    if (duolingoState.stageIndex >= duolingoState.totalStages) {
      duolingoState.completed = true;
      duolingoState.xpEarned += 20;
      junyi.addXp(20);
      playDuolingoSound('victory');
    }
    rerender();
    return true;
  }

  // Stage 1: Word Bank
  if (action === 's1-select') {
    const idx = Number(button.dataset.index);
    const word = duolingoState.s1Pool[idx];
    if (word) {
      duolingoState.s1Pool.splice(idx, 1);
      duolingoState.s1Selected.push(word);
      rerender();
    }
    return true;
  }

  if (action === 's1-remove') {
    const idx = Number(button.dataset.index);
    const word = duolingoState.s1Selected[idx];
    if (word) {
      duolingoState.s1Selected.splice(idx, 1);
      duolingoState.s1Pool.push(word);
      rerender();
    }
    return true;
  }

  if (action === 's1-check') {
    const userStr = duolingoState.s1Selected.join(' ');
    const targetStr = 'Actions speak louder than words.';
    if (userStr === targetStr) {
      playDuolingoSound('correct');
      duolingoState.combo++;
      duolingoState.xpEarned += 10;
      junyi.addXp(10);
      duolingoState.drawer = {
        isCorrect: true,
        title: '太棒了！答對了！',
        message: 'Actions（複數名詞）搭配動詞原形 speak；名言諺語描述客觀規律，一律維持現在簡單式！'
      };
    } else {
      playDuolingoSound('wrong');
      duolingoState.hearts--;
      duolingoState.combo = 0;
      duolingoState.drawer = {
        isCorrect: false,
        title: '需要注意喔！',
        message: `正確組裝為："${targetStr}"。Actions 是複數主詞，不可加 -s！`
      };
    }
    rerender();
    return true;
  }

  // Stage 2: Match Pairs
  if (action === 's2-card') {
    const tileId = button.dataset.tileId;
    const tile = duolingoState.s2Tiles.find(t => t.id === tileId);
    if (!tile || duolingoState.s2MatchedPairs.includes(tile.pairId)) return true;

    if (!duolingoState.s2SelectedCard) {
      duolingoState.s2SelectedCard = tile;
    } else {
      if (duolingoState.s2SelectedCard.id === tile.id) {
        duolingoState.s2SelectedCard = null;
      } else {
        // 判定配對
        if (duolingoState.s2SelectedCard.pairId === tile.pairId && duolingoState.s2SelectedCard.type !== tile.type) {
          playDuolingoSound('match');
          duolingoState.s2MatchedPairs.push(tile.pairId);
          duolingoState.s2SelectedCard = null;
          duolingoState.combo++;
          if (duolingoState.s2MatchedPairs.length === duolingoState.s2Pairs.length) {
            playDuolingoSound('correct');
            duolingoState.xpEarned += 15;
            junyi.addXp(15);
            duolingoState.drawer = {
              isCorrect: true,
              title: '連連看全數配對成功！',
              message: '第 01 章 6 個高頻單字（sentence, action, habit, future, yesterday, tomorrow）已精準掌握！'
            };
          }
        } else {
          playDuolingoSound('wrong');
          duolingoState.hearts--;
          duolingoState.combo = 0;
          duolingoState.s2SelectedCard = null;
        }
      }
    }
    rerender();
    return true;
  }

  // Stage 3: Listen & Assemble
  if (action === 's3-audio-normal') {
    speakSentence("The teacher told us that water boils at 100 degrees Celsius.", 1.0);
    return true;
  }

  if (action === 's3-audio-slow') {
    speakSentence("The teacher told us that water boils at 100 degrees Celsius.", 0.6);
    return true;
  }

  if (action === 's3-select') {
    const idx = Number(button.dataset.index);
    const word = duolingoState.s3Pool[idx];
    if (word) {
      duolingoState.s3Pool.splice(idx, 1);
      duolingoState.s3Selected.push(word);
      rerender();
    }
    return true;
  }

  if (action === 's3-remove') {
    const idx = Number(button.dataset.index);
    const word = duolingoState.s3Selected[idx];
    if (word) {
      duolingoState.s3Selected.splice(idx, 1);
      duolingoState.s3Pool.push(word);
      rerender();
    }
    return true;
  }

  if (action === 's3-check') {
    const userStr = duolingoState.s3Selected.join(' ');
    const targetStr = duolingoState.s3Target.join(' ');
    if (userStr === targetStr) {
      playDuolingoSound('correct');
      duolingoState.combo++;
      duolingoState.xpEarned += 15;
      junyi.addXp(15);
      duolingoState.drawer = {
        isCorrect: true,
        title: '聽力排詞完全正確！',
        message: '即便主句是過去式 told，名詞子句表示「水在 100°C 沸騰」是科學客觀真理，永遠維持現在簡單式 boils！'
      };
    } else {
      playDuolingoSound('wrong');
      duolingoState.hearts--;
      duolingoState.combo = 0;
      duolingoState.drawer = {
        isCorrect: false,
        title: '聽力有疏漏喔！',
        message: `正確句子為："${targetStr}"。注意水是第三人稱不可數單數，且為客觀真理，動詞必須用 boils！`
      };
    }
    rerender();
    return true;
  }

  // Stage 4: Trap Buster
  if (action === 's4-answer') {
    const idx = Number(button.dataset.index);
    duolingoState.s4Answer = idx;
    if (idx === 0) {
      // melts 正解
      playDuolingoSound('correct');
      duolingoState.combo++;
      duolingoState.xpEarned += 10;
      junyi.addXp(10);
      duolingoState.drawer = {
        isCorrect: true,
        title: '漂亮避雷！會考滿分判斷！',
        message: '冰在 0°C 以上融化為物理自然法則，不受主句過去式 told 牽制，名詞子句百分之百維持現在簡單式 melts！'
      };
    } else {
      playDuolingoSound('wrong');
      duolingoState.hearts--;
      duolingoState.combo = 0;
      duolingoState.drawer = {
        isCorrect: false,
        title: '踩到陷阱啦！',
        message: '常考誘答陷阱：看到前面 told 就選過去式 melted。請牢記：科學真理與自然物理現象永遠維持現在式 melts！'
      };
    }
    rerender();
    return true;
  }

  // Stage 5: Dialogue Roleplay
  if (action === 's5-speak') {
    speakSentence("Hey Beth, what are you doing right now?", 1.0);
    return true;
  }

  if (action === 's5-answer') {
    const idx = Number(button.dataset.index);
    duolingoState.s5Answer = idx;
    if (idx === 0) {
      playDuolingoSound('correct');
      duolingoState.combo++;
      duolingoState.xpEarned += 15;
      junyi.addXp(15);
      duolingoState.drawer = {
        isCorrect: true,
        title: '對話接龍大成功！',
        message: '現在進行式 "I am finishing..." 精準呼應 "what are you doing right now"，過去式 finish yours yesterday 提問無懈可擊！'
      };
    } else {
      playDuolingoSound('wrong');
      duolingoState.hearts--;
      duolingoState.combo = 0;
      duolingoState.drawer = {
        isCorrect: false,
        title: '時態搭配不和諧！',
        message: '選項 (B) 現在簡單式配 tomorrow 矛盾；選項 (C) was finishing 與 right now 衝突。唯一正解為 (A)！'
      };
    }
    rerender();
    return true;
  }

  return false;
}
