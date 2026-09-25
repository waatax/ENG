// app.js - 全方位 108 課綱英語教育旗艦平台
// 深度整合：國小 (Sixth 專案)、國中 (JH 專案)、高中/技高 (Arch 專案)
// 融入均一教育平台 (Junyi Academy) 鷹架微課、步驟0破題思維、致命陷阱診斷、A4 講義列印與原生語音館

import { tracks, exams } from './content.mjs';
import { curriculum, examStudy } from './curriculum.mjs';
import { initialSources } from './sources.mjs';
import { questionDB, CATEGORY_META } from './question_db.mjs';
import { initialState, createAttempt, recordResponse, finishAttempt, resultOf, remainingSeconds } from './core.mjs';
import { speak, playWord, playSentence, playSequence, stopAudio, isAudioActive } from './audio.mjs';

import { UNIFIED_GRADES } from './curriculum_unified.mjs';
import { sixthLessons, sixthNotes, sixthQuestions, sixthAudioData } from './sixth_assets.mjs';
import { jhUnits, jhCases, jhHandouts, jhCapAnalysis } from './jh_assets.mjs';
import { 
  archTenseModules, archTenseTraps, archTenseQuiz,
  archSentencePillars, archSentenceTraps, archSentenceQuiz,
  archPartsOfSpeech, archSuffixRules, archPosQuiz,
  archPhoneticItems, archStressRules, archDictCodes, archPhoneticsQuiz,
  archVocabCategories, archVocabQuiz
} from './arch_prerequisites.mjs';
import { archSemesters, englishS1Review, englishS2Review, englishS3Review, englishS4Review } from './arch_semesters.mjs';
import { junyi, MASTERY_LEVELS, JUNYI_BADGES, FATAL_TRAPS } from './junyi_engine.mjs';

const KEY = 'english-quest-v4';
let state = initialState(), storageFailed = false;
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (saved?.schema === 1 && Array.isArray(saved.attempts) && saved.review) {
    state = saved;
  }
} catch {
  storageFailed = true;
}

// 導覽頁面狀態
let page = 'curriculum108'; // 預設首頁為 108 課綱學年地圖
let selected = null;
let resultId = null;
let sourceRows = Array.isArray(initialSources) ? [...initialSources] : [];
let sourceError = false;
let sourceFilter = 'all';
let openChapterId = 'jhs:j1';
let audioStudioFilter = 'all';
let audioStudioSearch = '';
let activePlayingDialogueIndex = -1;

// 108 課綱導覽狀態
let activeGradeId = 'g6';
let activeSemId = 'g6-s1';
let activeUnitId = 'g6-s1-u1';

// 均一微課狀態
let revealedHints = {}; // { [unitId]: [1, 2] }
let activeTrapGrade = 'all';

// Arch 先修館狀態
let activeArchModule = 'basic-tenses-passive';
let archQuizAnswers = {}; // { [qIdx]: selectedOptionIdx }
let vocab1200Category = 'all';
let vocab1200Search = '';

// Sixth 六年級小升初狀態
let activeSixthUnit = 'eng-u1';
let sixthQuizAnswers = {}; // { [qId]: selectedIdx }
let sixthQuizSubmitted = false;

// JH 國中會考館狀態
let activeJhUnit = 'english-1';
let activeJhTab = 'units'; // 'units' | 'cases' | 'cap' | 'handouts'

// A4 考前講義列印狀態
let activePrintTerm = 'g6-s1';

// 題庫隨選測驗狀態
let quizCategory = 'jhs';
let quizCount = 20;

const root = document.querySelector('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const track = () => tracks.find(t => t.id === state.track) || tracks[0];
const allQuestions = tracks.flatMap(t => t.questions);
const questionById = id => questionDB.getQuestion(id) || allQuestions.find(q => q.id === id);

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    storageFailed = true;
  }
}

function due() {
  return Object.keys(state.review).filter(id => state.review[id].dueAt <= Date.now() && questionById(id));
}

function navigate(p) {
  stopAudio();
  activePlayingDialogueIndex = -1;
  page = p;
  selected = null;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shell(body) {
  const nav = [
    ['curriculum108', '01', '108課綱學年地圖'],
    ['junyi', '02', '均一微課與鷹架館'],
    ['sixth', '03', 'Sixth 六年級小升初'],
    ['jh', '04', 'JH 國中會考衝刺館'],
    ['arch', '05', 'Arch 高中先修專題'],
    ['handouts', '06', 'A4考前筆記列印庫'],
    ['chapter', '07', '考制核心課綱教學'],
    ['studio', '08', '單字會話語音館'],
    ['exams', '09', '全考制模考題庫'],
    ['today', '10', '每日精熟練習'],
    ['progress', '11', '學習進度與徽章']
  ];

  const summary = junyi.getSummary();

  return `
    <div class="shell">
      <aside class="side">
        <div class="brand">English<span> Quest.</span></div>
        <div class="edition">108課綱全學年教育旗艦平台</div>
        
        <div class="user-xp-pill" style="background:rgba(255,255,255,0.08);padding:10px 14px;border-radius:10px;margin-bottom:18px;border:1px solid rgba(255,255,255,0.12)">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#94a3b8;margin-bottom:4px">
            <span>✨ 均一精熟經驗值</span>
            <strong style="color:var(--mint);font-size:14px">${summary.xp} XP</strong>
          </div>
          <div style="display:flex;gap:12px;font-size:11px;color:#cbd5e1">
            <span>⭐ 精熟: ${summary.masteredCount} 單元</span>
            <span>🔥 連續: ${summary.streak} 天</span>
          </div>
        </div>

        <nav class="nav" aria-label="主要導覽">
          ${nav.map(([id, num, label]) => `
            <button data-nav="${id}" class="${page === id ? 'active' : ''}">
              <small>${num}</small>${label}
            </button>
          `).join('')}
        </nav>
        <div class="side-foot">
          <strong>108課綱・全學年上下學期深耕</strong><br>
          國小 (Sixth) · 國中 (JH) · 高中先修 (Arch)<br>
          均一教育平台鷹架機制深度融合
        </div>
      </aside>
      <main class="main">
        <div class="top print-hide">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="font-weight:700;color:var(--brand-dark)">全方位 108 課綱英語教育體系</span>
            <span class="chip" style="background:#ecfdf5;color:#047857">國小 ➔ 國中 ➔ 高中 銜接</span>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn small" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe" data-nav="handouts">🖨️ A4 考前講義列印</button>
            <span class="chip">🔊 全單字・會話語音點讀</span>
          </div>
        </div>
        ${storageFailed ? '<div class="notice" role="alert">瀏覽器無法寫入本機儲存，請檢查無痕模式或容量設定。</div>' : ''}
        ${body}
        <div class="footer print-hide">
          English Quest 英語能力遠征 · 深度整合 Arch、Sixth、JH 專案與均一教育平台教學理念 · 迭代優化七十個七次
        </div>
      </main>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. 108 課綱學年與學期地圖 (Curriculum 108 Navigator)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function curriculum108Page() {
  const currentGrade = UNIFIED_GRADES.find(g => g.gradeId === activeGradeId) || UNIFIED_GRADES[0];
  const currentSem = currentGrade.semesters.find(s => s.semId === activeSemId) || currentGrade.semesters[0];

  return `
    <div class="header-block">
      <div class="pill">🏫 108 課綱學年與學期導覽</div>
      <h1 style="margin:8px 0">教育部 108 課綱英語文全學年課程地圖</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        完整橫跨國小第三階段 (六年級)、國中第四階段 (七至九年級)、高中第五階段 (十至十二年級與國際大考)。依照學年、上下學期與課綱指標系統化編排。
      </p>
    </div>

    <!-- 年級切換 Pills -->
    <div class="grade-tabs" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin:20px 0;border-bottom:1px solid var(--line)">
      ${UNIFIED_GRADES.map(g => `
        <button class="btn ${g.gradeId === activeGradeId ? 'primary' : 'quiet'}" data-select-grade="${g.gradeId}" style="white-space:nowrap;padding:10px 18px;border-radius:24px;font-size:14px">
          ${g.title}
        </button>
      `).join('')}
    </div>

    <!-- 當前年級卡片 -->
    <div class="card" style="margin-bottom:24px;background:linear-gradient(135deg, #091e32 0%, #1e3a8a 100%);color:#fff">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
        <div>
          <span style="background:rgba(255,255,255,0.2);padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600">${currentGrade.stage}</span>
          <h2 style="margin:10px 0 6px;color:#fff">${currentGrade.title}</h2>
          <p style="margin:0;color:#cbd5e1;font-size:14px;max-width:700px">${currentGrade.desc}</p>
        </div>
        <div style="background:rgba(255,255,255,0.1);padding:12px 18px;border-radius:12px;text-align:right">
          <div style="font-size:12px;color:#93c5fd">${currentGrade.badge}</div>
          <div style="font-size:18px;font-weight:700;color:#34d399;margin-top:4px">${currentGrade.semesters.length} 個學期學程</div>
        </div>
      </div>
    </div>

    <!-- 上下學期切換 Tabs -->
    <div style="display:flex;gap:12px;margin-bottom:20px">
      ${currentGrade.semesters.map(s => `
        <button class="btn ${s.semId === activeSemId ? 'primary' : 'quiet'}" data-select-sem="${s.semId}" style="flex:1;padding:14px;text-align:center;border-radius:12px;border:1px solid var(--line)">
          <div style="font-weight:700;font-size:16px">${s.title}</div>
          <div style="font-size:12px;color:${s.semId === activeSemId ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)'};margin-top:4px">${s.units.length} 個單元模組</div>
        </button>
      `).join('')}
    </div>

    <!-- 學期段考重點橫幅 -->
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:14px 18px;margin-bottom:24px;display:flex;align-items:center;gap:12px">
      <span style="font-size:24px">🎯</span>
      <div>
        <strong style="color:#1e40af">段考與大考重點考核範疇：</strong>
        <span style="color:#1e3a8a;font-size:14px">${currentSem.examFocus}</span>
      </div>
    </div>

    <!-- 單元列表 Cards -->
    <div style="display:grid;gap:18px">
      ${currentSem.units.map(u => {
        const mastery = junyi.getUnitMastery(u.id);
        const masteryInfo = MASTERY_LEVELS[mastery.toUpperCase()] || MASTERY_LEVELS.UNSTARTED;
        return `
          <div class="card" style="border-left:5px solid ${masteryInfo.color};transition:all 0.2s">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <span class="chip" style="background:#f1f5f9;color:#334155;font-weight:700">${u.unitNo}</span>
                  <span class="chip" style="background:#e0e7ff;color:#3730a3">課綱指標: ${u.indicator}</span>
                  <span class="chip" style="background:${masteryInfo.color}15;color:${masteryInfo.color};font-weight:700">
                    ${masteryInfo.icon} ${masteryInfo.label}
                  </span>
                </div>
                <h3 style="margin:6px 0;font-size:18px">${u.title}</h3>
              </div>
              <div style="display:flex;gap:8px">
                <button class="btn small primary" data-open-junyi-unit="${u.id}">💡 均一微課學習</button>
                ${u.sourceRef.startsWith('sixth:') ? `<button class="btn small quiet" data-open-sixth-unit="${u.sourceRef.split(':')[1]}">🎒 6年級原講義</button>` : ''}
                ${u.sourceRef.startsWith('jh:') ? `<button class="btn small quiet" data-open-jh-unit="${u.sourceRef.split(':')[1]}">🎓 國中會考單元</button>` : ''}
                ${u.sourceRef.startsWith('arch:') ? `<button class="btn small quiet" data-open-arch-module="${u.sourceRef.split(':')[1]}">🏛️ Arch專題</button>` : ''}
              </div>
            </div>

            <!-- 核心概念點 -->
            <div style="margin:14px 0 10px;padding:12px;background:#f8fafc;border-radius:8px">
              <strong style="color:var(--text-primary);font-size:13px">📌 核心學習重點：</strong>
              <ul style="margin:6px 0 0 18px;padding:0;font-size:14px;color:#475569">
                ${u.topics.map(t => `<li style="margin-bottom:4px">${t}</li>`).join('')}
              </ul>
            </div>

            <!-- 步驟 0 破題思維 -->
            <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:10px 14px;margin-bottom:10px;font-size:13px;color:#065f46">
              <strong>💡 均一步驟 0 破題思維：</strong> ${u.step0Clue}
            </div>

            <!-- 學生常犯陷阱診斷 -->
            ${u.traps && u.traps.length > 0 ? `
              <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:10px 14px;font-size:13px;color:#9f1239">
                <strong>⚠️ 考場致命陷阱避雷：</strong>
                <span style="text-decoration:line-through;margin-left:6px">${u.traps[0].wrong}</span> ➔ 
                <strong style="color:#047857">${u.traps[0].correct}</strong>
                <div style="font-size:12px;color:#881337;margin-top:2px">${u.traps[0].reason}</div>
              </div>
            ` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. 均一微課與鷹架學習館 (Junyi Micro-Lessons)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function junyiPage() {
  const allUnits = UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units));
  const activeUnit = allUnits.find(u => u.id === activeUnitId) || allUnits[0];
  const unitMastery = junyi.getUnitMastery(activeUnit.id);
  const masteryInfo = MASTERY_LEVELS[unitMastery.toUpperCase()] || MASTERY_LEVELS.UNSTARTED;
  const hints = revealedHints[activeUnit.id] || [];

  return `
    <div class="header-block">
      <div class="pill">💡 均一教育平台 (Junyi Academy) 風格微課程</div>
      <h1 style="margin:8px 0">技能精熟・鷹架引導・思維破題微課堂</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        將 108 課綱龐雜語法拆解為可階梯吸收的微技能節點。點擊「步驟 0」掌握秒解題眼，點擊「鷹架提示」逐步推導，消除學習盲區。
      </p>
    </div>

    <!-- 單元下拉選擇器 -->
    <div class="filter-row" style="margin:20px 0;display:flex;gap:12px;align-items:center;background:#fff;padding:12px 18px;border-radius:12px;border:1px solid var(--line)">
      <span style="font-weight:700;white-space:nowrap">📖 切換均一學習單元：</span>
      <select id="junyi-unit-select" style="flex:1;padding:8px 12px;border-radius:8px;border:1px solid var(--line)">
        ${UNIFIED_GRADES.map(g => `
          <optgroup label="${g.title}">
            ${g.semesters.flatMap(s => s.units.map(u => `
              <option value="${u.id}" ${u.id === activeUnit.id ? 'selected' : ''}>[${u.unitNo}] ${u.title} (${u.indicator})</option>
            `)).join('')}
          </optgroup>
        `).join('')}
      </select>
      <span class="chip" style="background:${masteryInfo.color}20;color:${masteryInfo.color};font-weight:700;white-space:nowrap">
        ${masteryInfo.icon} ${masteryInfo.label}
      </span>
    </div>

    <!-- 微課主要內容版面 -->
    <div class="layout" style="display:grid;grid-template-columns:2fr 1fr;gap:24px">
      <div>
        <!-- 單元標題與課綱素養指標 -->
        <div class="card" style="margin-bottom:20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span class="chip" style="background:#e0e7ff;color:#3730a3;font-weight:700">${activeUnit.unitNo}</span>
            <span class="chip" style="background:#ecfdf5;color:#047857">108課綱對應: ${activeUnit.indicator}</span>
          </div>
          <h2 style="margin:4px 0 12px">${activeUnit.title}</h2>
          
          <!-- 核心觀念要點卡 -->
          <div style="background:#f8fafc;padding:14px;border-radius:10px;margin-bottom:16px">
            <strong style="color:var(--text-primary);font-size:14px">🔑 概念結構矩陣：</strong>
            <ul style="margin:8px 0 0 18px;padding:0;line-height:1.7;color:#334155">
              ${activeUnit.topics.map(t => `<li><strong>${t.split('：')[0]}</strong>${t.includes('：') ? '：' + t.split('：')[1] : ''}</li>`).join('')}
            </ul>
          </div>

          <!-- 均一步驟 0 破題思維卡 -->
          <div style="background:linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);border:1px solid #6ee7b7;padding:16px;border-radius:12px;margin-bottom:18px">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
              <span style="font-size:20px">⚡</span>
              <strong style="color:#065f46;font-size:15px">均一步驟 0 破題思維（第一眼判斷法）：</strong>
            </div>
            <p style="margin:0;color:#047857;font-size:14px;line-height:1.6">
              ${activeUnit.step0Clue}
            </p>
          </div>

          <!-- 鷹架式引導答題與即時提示 -->
          <div style="border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:18px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <strong style="font-size:15px;color:var(--brand-dark)">🪜 鷹架漸進式思考題：</strong>
              <div style="display:flex;gap:6px">
                <button class="btn small quiet" data-reveal-hint="1">提示 1 (語法規律)</button>
                <button class="btn small quiet" data-reveal-hint="2">提示 2 (排除陷阱)</button>
                <button class="btn small primary" data-reveal-hint="all">查看精熟解析</button>
              </div>
            </div>

            <div style="background:#f1f5f9;padding:12px;border-radius:8px;font-size:14px;margin-bottom:10px">
              <strong>題目實例：</strong> Look! The children ________ soccer on the playground happily.
              <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:6px">
                <button class="btn small quiet" data-answer-check="wrong" style="text-align:left">A) plays</button>
                <button class="btn small quiet" data-answer-check="correct" style="text-align:left">B) are playing</button>
                <button class="btn small quiet" data-answer-check="wrong" style="text-align:left">C) played</button>
                <button class="btn small quiet" data-answer-check="wrong" style="text-align:left">D) playing</button>
              </div>
            </div>

            <!-- 動態展開提示 -->
            ${hints.includes(1) || hints.includes('all') ? `
              <div style="background:#fef3c7;border:1px solid #fde68a;padding:10px 14px;border-radius:8px;font-size:13px;color:#92400e;margin-top:8px">
                <strong>💡 提示 1 (語法指標)：</strong> 句首看到 "Look!" 感嘆詞，代表說話者正在提示對方注意「眼前此刻正在發生的動作」，時態必須使用「現在進行式」。
              </div>
            ` : ''}

            ${hints.includes(2) || hints.includes('all') ? `
              <div style="background:#fef3c7;border:1px solid #fde68a;padding:10px 14px;border-radius:8px;font-size:13px;color:#92400e;margin-top:8px">
                <strong>💡 提示 2 (主詞單複數排除)：</strong> 主詞是 "The children" (複數名詞，單數是 child)，be 動詞必須用 are，不可用 is。選項 D 只有 V-ing 缺 be 動詞，不能當主動詞。
              </div>
            ` : ''}

            ${hints.includes('all') ? `
              <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:12px 14px;border-radius:8px;font-size:13px;color:#065f46;margin-top:8px">
                <strong>⭐ 精熟詳解：</strong> 正確答案為 <strong>B) are playing</strong>。<br>
                公式：主詞 (The children) + be 動詞 (are) + 動詞-ing (playing)。全句意為「看！孩子們正在操場上開心地踢足球。」
              </div>
            ` : ''}
          </div>

          <!-- 精熟標記按鈕 -->
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:14px">
            <span style="font-size:13px;color:var(--text-muted)">自評學習進度，獲得經驗值徽章：</span>
            <div style="display:flex;gap:8px">
              <button class="btn small quiet" data-set-mastery="${activeUnit.id}" data-level="practicing">🟡 標記練習中 (+50 XP)</button>
              <button class="btn small primary" data-set-mastery="${activeUnit.id}" data-level="mastered">⭐ 標記為已精熟 (+100 XP)</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側：致命陷阱雷達與徽章庫 -->
      <div>
        <div class="card" style="margin-bottom:20px;border-top:4px solid #ef4444">
          <h3 style="margin:0 0 12px;display:flex;align-items:center;gap:6px">
            <span>🚨</span> 致命陷阱 X 光機
          </h3>
          <p style="font-size:12px;color:var(--text-muted);margin:0 0 12px">
            台灣學生考場最常見失分盲點快速掃描：
          </p>

          <div style="display:grid;gap:12px">
            ${FATAL_TRAPS.map(trap => `
              <div style="background:#fff1f2;border:1px solid #fecdd3;padding:10px 12px;border-radius:8px;font-size:12px">
                <div style="font-weight:700;color:#9f1239;margin-bottom:2px">${trap.topic}</div>
                <div style="text-decoration:line-through;color:#e11d48">${trap.wrong}</div>
                <div style="color:#047857;font-weight:600">${trap.correct}</div>
                <div style="color:#475569;margin-top:4px;font-size:11px">${trap.explanation}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <h3 style="margin:0 0 12px;display:flex;align-items:center;gap:6px">
            <span>🏅</span> 均一技能徽章館
          </h3>
          <div style="display:grid;gap:10px">
            ${JUNYI_BADGES.map(b => {
              const unlocked = junyi.data.earnedBadges.includes(b.id);
              return `
                <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;background:${unlocked ? '#ecfdf5' : '#f8fafc'};border:1px solid ${unlocked ? '#a7f3d0' : '#e2e8f0'};opacity:${unlocked ? 1 : 0.65}">
                  <span style="font-size:24px">${b.icon}</span>
                  <div style="flex:1">
                    <div style="font-weight:700;font-size:13px;color:${unlocked ? '#047857' : '#475569'}">${b.title}</div>
                    <div style="font-size:11px;color:#64748b">${b.desc}</div>
                  </div>
                  <span class="chip" style="font-size:10px">${unlocked ? '已獲得 ✔️' : b.reqXp + ' XP'}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Sixth 六年級小升初館 (Sixth Project Port)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function sixthPage() {
  const lesson = sixthLessons[activeSixthUnit] || sixthLessons['eng-u1'];
  const audio = sixthAudioData[activeSixthUnit];
  const notes = sixthNotes[activeSixthUnit];
  const questions = sixthQuestions[activeSixthUnit] || [];

  return `
    <div class="header-block">
      <div class="pill">🎒 Sixth 專案完整移植</div>
      <h1 style="margin:8px 0">國小六年級 108 課綱英語旗艦庫 (6上 · 6下)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        完整移植自 Sixth 專案！包含 8 大單元高解析 Markdown 教材、64 大考前筆記速記心訣、情境朗讀語音庫與 128 題精選段考會考前哨戰測驗。
      </p>
    </div>

    <!-- 8 單元橫向切換列 -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin:20px 0;border-bottom:1px solid var(--line)">
      ${Object.keys(sixthLessons).map(key => {
        const u = sixthLessons[key];
        return `
          <button class="btn ${key === activeSixthUnit ? 'primary' : 'quiet'}" data-select-sixth="${key}" style="white-space:nowrap;padding:8px 14px;border-radius:20px;font-size:13px">
            [${u.semester}] U${u.unit}: ${u.title.split('(')[0].replace('Unit ' + u.unit + ':', '').trim()}
          </button>
        `;
      }).join('')}
    </div>

    <div class="layout" style="display:grid;grid-template-columns:2fr 1fr;gap:24px">
      <div>
        <!-- 單元講義卡片 -->
        <div class="card" style="margin-bottom:20px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <span class="chip" style="background:#e0e7ff;color:#3730a3;font-weight:700">${lesson.semesterZh}</span>
              <span class="chip" style="background:#ecfdf5;color:#047857">${lesson.indicator}</span>
              <h2 style="margin:8px 0">${lesson.title}</h2>
            </div>
            <button class="btn small" style="background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe" data-print-handout="${lesson.semester === '6A' ? 'g6-s1' : 'g6-s2'}">
              🖨️ A4講義列印
            </button>
          </div>

          <!-- 學習目標清單 -->
          <div style="background:#f8fafc;padding:14px;border-radius:10px;margin:16px 0">
            <strong style="color:var(--text-primary);font-size:14px">🎯 本單元四大精熟目標：</strong>
            <ol style="margin:8px 0 0 20px;padding:0;color:#334155;font-size:14px;line-height:1.7">
              ${lesson.objectives.map(o => `<li>${o.replace(/^\d+\.\s*/, '')}</li>`).join('')}
            </ol>
          </div>

          <!-- 學習導引情境故事 -->
          ${lesson.contextStory ? `
            <div style="background:#fffbeb;border:1px solid #fef3c7;padding:14px;border-radius:10px;margin-bottom:20px">
              <strong style="color:#b45309">📖 生活情境導引：為什麼要學這個？</strong>
              <p style="margin:6px 0 0;font-size:14px;color:#78350f;line-height:1.6">${lesson.contextStory}</p>
            </div>
          ` : ''}

          <!-- 核心觀念解析 -->
          <div style="display:grid;gap:18px;margin-top:20px">
            ${lesson.concepts.map((c, i) => `
              <div style="border:1px solid var(--line);border-radius:12px;padding:16px">
                <h3 style="margin:0 0 10px;color:var(--brand-dark);font-size:16px">
                  🔑 核心觀念 ${i + 1}：${c.title}
                </h3>
                <div style="font-size:14px;line-height:1.7;color:#334155;white-space:pre-line">
                  ${c.content}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- 避雷指南 -->
          ${lesson.traps && lesson.traps.length > 0 ? `
            <div style="margin-top:20px;background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:16px">
              <h3 style="margin:0 0 10px;color:#9f1239;font-size:16px">⚠️ 學生常犯三大迷思概念與避雷指南</h3>
              <div style="display:grid;gap:10px">
                ${lesson.traps.map(t => `
                  <div style="background:#fff;padding:10px 14px;border-radius:8px;border:1px solid #ffe4e6;font-size:13px;line-height:1.6;white-space:pre-line">
                    ${t}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- 右側：發音語音朗讀與單元題庫 -->
      <div>
        <!-- 語音朗讀台 -->
        ${audio ? `
          <div class="card" style="margin-bottom:20px;background:#091e32;color:#fff">
            <h3 style="margin:0 0 10px;color:#34d399;display:flex;align-items:center;gap:6px">
              <span>🔊</span> 單元朗讀語音台
            </h3>
            <p style="font-size:12px;color:#94a3b8;margin:0 0 14px">點擊句子直接播放標準真人美語發音：</p>

            ${audio.readAloudPassage ? `
              <div style="display:grid;gap:10px">
                ${audio.readAloudPassage.paragraphs.map(p => `
                  <div style="background:rgba(255,255,255,0.06);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.1)">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                      <div style="font-size:13px;color:#f8fafc;line-height:1.5">${p.text}</div>
                      <button class="btn small" style="background:#34d399;color:#091e32;padding:4px 8px;font-size:11px;font-weight:700" data-speak-sentence="${esc(p.text)}">▶ 播</button>
                    </div>
                    <div style="font-size:12px;color:#94a3b8;margin-top:4px">${p.zh}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        ` : ''}

        <!-- 考前筆記速記心訣 -->
        ${notes ? `
          <div class="card" style="margin-bottom:20px">
            <h3 style="margin:0 0 10px;color:#b45309">💡 名師考前速記精華</h3>
            <div style="font-size:13px;color:#475569;margin-bottom:8px"><strong>教材範圍：</strong>${notes.textbookCoverage}</div>
            <div style="display:grid;gap:8px">
              ${notes.coreConcepts.map(c => `
                <div style="background:#fef3c7;border:1px solid #fde68a;padding:8px 12px;border-radius:8px;font-size:12px;color:#78350f;white-space:pre-line">
                  ${c}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 單元測驗題庫 (16 題實戰) -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <h3 style="margin:0;font-size:16px">📝 單元實戰測驗 (${questions.length} 題)</h3>
            <span class="chip" style="background:#e0e7ff;color:#3730a3">課綱代表題</span>
          </div>

          <div style="display:grid;gap:14px">
            ${questions.slice(0, 4).map((q, idx) => {
              const selectedIdx = sixthQuizAnswers[q.id];
              const isSubmitted = sixthQuizSubmitted;
              const isCorrect = selectedIdx === q.answerIndex;
              return `
                <div style="border:1px solid var(--line);border-radius:10px;padding:12px;background:#fff">
                  <div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text-primary)">
                    ${idx + 1}. ${q.question}
                  </div>
                  <div style="display:grid;gap:4px">
                    ${q.options.map((opt, optIdx) => `
                      <button class="btn small" style="text-align:left;font-size:12px;padding:6px 10px;border-radius:6px;background:${selectedIdx === optIdx ? '#eff6ff' : '#f8fafc'};border:1px solid ${selectedIdx === optIdx ? '#2563eb' : 'var(--line)'}" data-sixth-answer="${q.id}" data-opt-idx="${optIdx}">
                        ${['A', 'B', 'C', 'D'][optIdx]}) ${opt}
                      </button>
                    `).join('')}
                  </div>
                  ${isSubmitted ? `
                    <div style="margin-top:8px;padding:8px 10px;border-radius:6px;font-size:12px;background:${isCorrect ? '#ecfdf5' : '#fff1f2'};color:${isCorrect ? '#047857' : '#9f1239'}">
                      <strong>${isCorrect ? '✔️ 回答正確！' : '❌ 答案有誤！正確為 ' + ['A','B','C','D'][q.answerIndex]}</strong><br>
                      ${q.explanation}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top:14px;text-align:center">
            <button class="btn primary" style="width:100%" data-submit-sixth-quiz="true">
              ${sixthQuizSubmitted ? '🔄 重新作答' : '🚀 提交答案並結算精熟度'}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. JH 國中會考衝刺館 (JH Project Port)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function jhPage() {
  return `
    <div class="header-block">
      <div class="pill">🎓 JH 專案完整移植</div>
      <h1 style="margin:8px 0">國中 7–9 年級 108 課綱英語教育與會考題庫</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        完整移植自 JH 國中教育專案！涵蓋 16 大課綱核心單元、16 個語言生活溝通案例、109–115 歷屆會考英聽與閱讀大數據考點解析與 16 份主題大會考手冊。
      </p>
    </div>

    <!-- JH 分類切換 -->
    <div style="display:flex;gap:10px;margin:20px 0;border-bottom:1px solid var(--line);padding-bottom:12px">
      <button class="btn ${activeJhTab === 'units' ? 'primary' : 'quiet'}" data-select-jh-tab="units">📖 16大課綱單元綱要</button>
      <button class="btn ${activeJhTab === 'cases' ? 'primary' : 'quiet'}" data-select-jh-tab="cases">🗣️ 16大語言生活情境案例</button>
      <button class="btn ${activeJhTab === 'cap' ? 'primary' : 'quiet'}" data-select-jh-tab="cap">👑 109-115 會考考點大數據</button>
      <button class="btn ${activeJhTab === 'handouts' ? 'primary' : 'quiet'}" data-select-jh-tab="handouts">📑 16份主題會考手冊</button>
    </div>

    ${activeJhTab === 'units' ? `
      <!-- 16 單元網格 -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:16px">
        ${jhUnits.map(u => `
          <div class="card" style="display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <span class="chip" style="background:#e0e7ff;color:#3730a3;font-weight:700">${u.termCode} (${u.termEn})</span>
                <span style="font-size:12px;color:var(--text-muted)">${u.unitId}</span>
              </div>
              <h3 style="margin:0 0 8px;font-size:17px">${u.title}</h3>
              <p style="font-size:14px;color:#475569;margin:0 0 12px;line-height:1.6">${u.summary}</p>
            </div>
            <div>
              <div style="background:#f8fafc;padding:8px 12px;border-radius:6px;font-size:12px;color:#1e293b;margin-bottom:10px">
                <strong>例句範例：</strong> ${u.exampleSentence}
              </div>
              <button class="btn small primary" style="width:100%" data-speak-sentence="${esc(u.exampleSentence)}">🔊 朗讀示範例句</button>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${activeJhTab === 'cases' ? `
      <!-- 語言生活案例 -->
      <div style="display:grid;gap:14px">
        ${Object.keys(jhCases).map(k => `
          <div class="card" style="border-left:4px solid #3b82f6">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <strong style="color:#1d4ed8;font-size:15px">情境案例：${k}</strong>
              <button class="btn small quiet" data-speak-sentence="${esc(jhCases[k])}">🔊 語音朗讀</button>
            </div>
            <p style="margin:0;font-size:14px;color:#334155;line-height:1.6">${jhCases[k]}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${activeJhTab === 'cap' ? `
      <!-- 109-115 會考大數據分析 -->
      <div class="card" style="margin-bottom:20px;background:#f8fafc">
        <h3 style="margin:0 0 10px">📊 國中教育會考英語科命題雙向細目分析</h3>
        <p style="font-size:14px;color:#64748b;margin:0">
          根據心理與教育測驗研究發展中心 (CAP) 統計，英語科閱讀題平均 40-43 題，聽力題 21 題。近年素養題型（圖表、時刻表、多文本對照）佔比已超過 45%。
        </p>
      </div>

      <div style="display:grid;gap:16px">
        ${jhCapAnalysis.map(c => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <div>
                <span class="chip" style="background:#ecfdf5;color:#047857;font-weight:700">${c.year}年 會考英語真題試卷</span>
                <span class="chip" style="background:#eff6ff;color:#1e40af">${c.pages} 頁完整分析報告</span>
              </div>
              <a href="${c.sourceUrl}" target="_blank" class="btn small primary">📄 線上閱覽官方 PDF</a>
            </div>
            <div style="font-size:13px;color:#475569">
              <strong>檔案名稱：</strong> ${c.label} (${(c.bytes / 1024 / 1024).toFixed(2)} MB)
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${activeJhTab === 'handouts' ? `
      <!-- 16 份主題會考手冊 -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:16px">
        ${jhHandouts.map(h => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span class="chip" style="background:#e0e7ff;color:#3730a3">${h.grade}年級第${h.term}學期</span>
              <span style="font-size:12px;color:#64748b">${h.pages} 頁 A4</span>
            </div>
            <h4 style="margin:6px 0 10px">${h.title}</h4>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:12px">單元代碼: ${h.unitId}</div>
            <button class="btn small primary" style="width:100%" data-print-handout="jh-${h.term}">🖨️ 列印考前重點手冊</button>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Arch 高中先修專題館 (Arch Project Port)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function archPage() {
  const modules = [
    { id: 'basic-tenses-passive', title: '1. 基本時態與被動語態 (Tenses & Passive)' },
    { id: 'complex-sentences', title: '2. 複合句與連接詞核心 (Complex Sentences)' },
    { id: 'parts-of-speech', title: '3. 八大詞性與詞綴轉換 (Parts of Speech)' },
    { id: 'phonetics-dictionary', title: '4. KK音標與查字典指南 (Phonetics & Dictionary)' },
    { id: 'vocab-1200', title: '5. 核心 1200 單字互動庫 (Vocab 1200 Core Explorer)' },
    { id: 'semesters', title: '6. 高中/技高 4 個學期深度講義 (High School Semesters)' }
  ];

  return `
    <div class="header-block">
      <div class="pill">🏛️ Arch 專案完整移植</div>
      <h1 style="margin:8px 0">高中/技術型高中先修與學期深度講義館</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        完整移植自 Arch 建築與工程大考專案！涵蓋 5 大核心英語先修主題、4 個學期 (高一上至高二下) 深度複習講義，專為銜接高中學測、統測與技職英檢打造。
      </p>
    </div>

    <!-- 專題切換 Pills -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin:20px 0;border-bottom:1px solid var(--line)">
      ${modules.map(m => `
        <button class="btn ${m.id === activeArchModule ? 'primary' : 'quiet'}" data-select-arch-module="${m.id}" style="white-space:nowrap;padding:8px 16px;border-radius:20px;font-size:13px">
          ${m.title}
        </button>
      `).join('')}
    </div>

    ${activeArchModule === 'basic-tenses-passive' ? `
      <!-- 時態與被動語態 -->
      <div class="card" style="margin-bottom:20px">
        <h2 style="margin:0 0 12px">五大核心時態與被動語態矩陣</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:16px">
          ${(archTenseModules || []).map(m => `
            <div style="border:1px solid var(--line);border-radius:12px;padding:14px;background:#f8fafc">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <strong style="font-size:16px;color:#1e3a8a">${m.nameZh} (${m.nameEn})</strong>
                <span class="chip" style="font-size:11px">${m.badge}</span>
              </div>
              <div style="background:#fff;padding:8px 10px;border-radius:6px;border:1px solid #e2e8f0;font-family:monospace;font-weight:700;color:#2563eb;margin-bottom:8px">
                公式：${m.formula}
              </div>
              <p style="font-size:13px;color:#475569;margin:0 0 10px">${m.description}</p>
              <div style="display:grid;gap:4px">
                ${(m.rules || []).slice(0, 2).map(r => `
                  <div style="font-size:12px;color:#334155;background:#f1f5f9;padding:6px 8px;border-radius:4px">
                    • <strong>${r.title}</strong>: ${r.content}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'complex-sentences' ? `
      <!-- 複合句與連接詞 -->
      <div class="card" style="margin-bottom:20px">
        <h2 style="margin:0 0 12px">複合句三大核心支柱 (Complex Sentences Pillars)</h2>
        <div style="display:grid;gap:16px">
          ${(archSentencePillars || []).map(p => `
            <div style="border:1px solid var(--line);border-radius:12px;padding:16px;background:#f8fafc">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                <h3 style="margin:0;color:#1e40af;font-size:17px">${p.title} (${p.titleEn})</h3>
                <span class="chip" style="background:#e0e7ff;color:#3730a3">${p.badge}</span>
              </div>
              <p style="font-size:14px;color:#334155;margin:0 0 10px">${p.description}</p>
              <div style="background:#fff;padding:10px 14px;border-radius:8px;border:1px solid #cbd5e1;font-family:monospace;margin-bottom:10px">
                <strong>結構公式：</strong> ${p.formula}
              </div>
              <div style="font-size:13px;color:#475569">
                <strong>例句示範：</strong> ${p.example}
                <button class="btn small quiet" style="margin-left:8px" data-speak-sentence="${esc(p.example)}">🔊 朗讀</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'parts-of-speech' ? `
      <!-- 八大詞性 -->
      <div class="card" style="margin-bottom:20px">
        <h2 style="margin:0 0 12px">英文八大詞性與詞綴轉換全覽</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px">
          ${(archPartsOfSpeech || []).map(pos => `
            <div style="border:1px solid var(--line);border-radius:10px;padding:12px;background:#f8fafc">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <strong style="color:#0f172a;font-size:15px">${pos.nameZh} (${pos.nameEn})</strong>
                <span class="chip" style="background:#eff6ff;color:#1d4ed8;font-weight:700">${pos.abbr}</span>
              </div>
              <p style="font-size:13px;color:#475569;margin:0 0 8px">${pos.role}</p>
              <div style="font-size:12px;color:#1e293b;background:#fff;padding:6px 8px;border-radius:6px;border:1px solid #e2e8f0">
                <strong>例句：</strong> ${pos.example}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'phonetics-dictionary' ? `
      <!-- KK音標與查字典指南 -->
      <div class="card" style="margin-bottom:20px">
        <h2 style="margin:0 0 12px">國際音標 (IPA/KK) 與英語字典查詢心法</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px;margin-bottom:20px">
          ${(archPhoneticItems || []).slice(0, 12).map(item => `
            <div style="border:1px solid var(--line);border-radius:8px;padding:10px;background:#fff;display:flex;align-items:center;justify-content:space-between">
              <div>
                <span style="font-size:18px;font-weight:700;color:#2563eb;font-family:monospace">${item.symbol}</span>
                <span style="font-size:12px;color:#64748b;margin-left:6px">${item.name}</span>
                <div style="font-size:13px;color:#1e293b;margin-top:2px">如: <strong>${item.example}</strong></div>
              </div>
              <button class="btn small" style="background:#eff6ff;color:#2563eb" data-speak-word="${item.example}">🔊</button>
            </div>
          `).join('')}
        </div>

        <h3 style="margin:20px 0 10px">英英字典常見詞性縮寫檢索代碼</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px">
          ${(archDictCodes || []).map(dc => `
            <div style="background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid var(--line);font-size:13px">
              <strong style="color:#0f172a;font-family:monospace">${dc.code}</strong>: ${dc.meaning}
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'vocab-1200' ? `
      <!-- 1200 核心單字互動庫 -->
      <div class="card" style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
          <div>
            <h2 style="margin:0 0 4px">108 課綱核心 1200 單字互動字卡庫</h2>
            <p style="margin:0;font-size:13px;color:var(--text-muted)">全單字附 IPA 音標、詞性與真人發音，點擊即時發音：</p>
          </div>
          <div style="display:flex;gap:8px">
            <input type="text" id="vocab-search" placeholder="搜尋英文單字或中文..." value="${vocab1200Search}" style="padding:8px 14px;border:1px solid var(--line);border-radius:8px;font-size:13px">
          </div>
        </div>

        <!-- 類別切換 Pills -->
        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:16px">
          <button class="btn small ${vocab1200Category === 'all' ? 'primary' : 'quiet'}" data-vocab-cat="all">全部類別</button>
          ${(archVocabCategories || []).map(cat => `
            <button class="btn small ${vocab1200Category === cat.id ? 'primary' : 'quiet'}" data-vocab-cat="${cat.id}">
              ${cat.name} (${cat.words ? cat.words.length : 0})
            </button>
          `).join('')}
        </div>

        <!-- 單字卡網格 -->
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(240px, 1fr));gap:12px">
          ${(archVocabCategories || [])
            .filter(cat => vocab1200Category === 'all' || cat.id === vocab1200Category)
            .flatMap(cat => (cat.words || []).map(w => ({ ...w, categoryName: cat.name })))
            .filter(w => !vocab1200Search || w.en.toLowerCase().includes(vocab1200Search.toLowerCase()) || w.zh.includes(vocab1200Search))
            .slice(0, 60)
            .map(w => `
              <div style="border:1px solid var(--line);border-radius:10px;padding:12px;background:#fff;display:flex;flex-direction:column;justify-content:space-between">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:flex-start">
                    <strong style="font-size:16px;color:#1e3a8a">${w.en}</strong>
                    <span class="chip" style="font-size:10px">${w.pos}</span>
                  </div>
                  <div style="font-size:12px;color:#64748b;font-family:monospace;margin:2px 0 6px">${w.ipa || ''}</div>
                  <div style="font-size:13px;color:#334155;font-weight:500">${w.zh}</div>
                </div>
                <div style="margin-top:10px;display:flex;gap:6px">
                  <button class="btn small quiet" style="flex:1;font-size:11px" data-speak-word="${w.en}">🔊 正常速</button>
                  <button class="btn small quiet" style="flex:1;font-size:11px" data-speak-word="${w.en}" data-slow="true">🐢 慢速</button>
                </div>
              </div>
            `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'semesters' ? `
      <!-- 高中/技高 4 個學期講義 -->
      <div style="display:grid;gap:20px">
        ${archSemesters.map(sem => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
              <div>
                <span class="chip" style="background:#e0e7ff;color:#3730a3;font-weight:700">${sem.semesterTitle}</span>
                <h3 style="margin:6px 0">${sem.subtitle}</h3>
                <p style="margin:0;font-size:13px;color:var(--text-muted)">${sem.curriculumScope}</p>
              </div>
              <button class="btn small primary" data-print-handout="${sem.semesterCode}">🖨️ 列印 A4 講義</button>
            </div>

            <!-- 大考核心主題 -->
            <div style="background:#f8fafc;padding:12px;border-radius:8px;margin-bottom:14px">
              <strong style="color:#1e3a8a;font-size:13px">大考命題權重：${sem.examAnalysis ? sem.examAnalysis.examWeight : '核心考點'}</strong>
              <ul style="margin:6px 0 0 18px;padding:0;font-size:13px;color:#475569">
                ${(sem.examAnalysis?.coreExamThemes || []).map(th => `<li>${th}</li>`).join('')}
              </ul>
            </div>

            <!-- 章節內容 -->
            <div style="display:grid;gap:12px">
              ${(sem.chapters || []).map(ch => `
                <div style="border:1px solid var(--line);border-radius:8px;padding:12px">
                  <div style="font-weight:700;font-size:14px;color:var(--brand-dark);margin-bottom:6px">
                    第 ${ch.chapterNo} 章：${ch.title}
                  </div>
                  <div style="display:grid;gap:6px">
                    ${(ch.coreConcepts || []).map(cc => `
                      <div style="font-size:12px;color:#334155;background:#f1f5f9;padding:6px 10px;border-radius:6px">
                        <strong>${cc.heading}：</strong> ${cc.explanation}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. A4 考前講義列印庫 (Printable A4 Handouts)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function handoutsPage() {
  const terms = [
    { id: 'g6-s1', title: '國小 6年級上學期 (6上) 段考大複習講義' },
    { id: 'g6-s2', title: '國小 6年級下學期 (6下) 畢業考與小升初銜接講義' },
    { id: 'g7-s1', title: '國中 7年級上學期 (7上) 基礎語法考前精粹' },
    { id: 'g7-s2', title: '國中 7年級下學期 (7下) 進行式與方位考前精粹' },
    { id: 'g8-s1', title: '國中 8年級上學期 (8上) 過去式與條件句精粹' },
    { id: 'g8-s2', title: '國中 8年級下學期 (8下) 比較級動名詞考前精粹' },
    { id: 'g9-s1', title: '國中 9年級上學期 (9上) 完成式與被動語態精粹' },
    { id: 'g9-s2', title: '國中 9年級下學期 (9下) 會考滿分衝刺總複習' },
    { id: 's1', title: '高中 10年級上學期 (高一上) 統測學測字彙時態' },
    { id: 's2', title: '高中 10年級下學期 (高一下) 複合句與連接詞' },
    { id: 's3', title: '高中 11年級上學期 (高二上) 關係子句與分詞構句' },
    { id: 's4', title: '高中 11年級下學期 (高二下) 假設語氣與職場英語' }
  ];

  return `
    <div class="header-block print-hide">
      <div class="pill">🖨️ A4 官方講義下載與列印中心</div>
      <h1 style="margin:8px 0">108 課綱各學期考前 10 分鐘精華複習講義</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        針對段考、教育會考、統測與學測量身打造。包含官方講義標頭、名師速記公式、考前 10 分鐘必備檢核清單與避雷指南，符合標準 A4 輸出規範。
      </p>
    </div>

    <!-- 學期切換列 -->
    <div class="print-hide" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin:20px 0;border-bottom:1px solid var(--line)">
      ${terms.map(t => `
        <button class="btn ${t.id === activePrintTerm ? 'primary' : 'quiet'}" data-select-print-term="${t.id}" style="white-space:nowrap;padding:8px 14px;border-radius:18px;font-size:13px">
          ${t.title.split(' ')[1]}
        </button>
      `).join('')}
      <button class="btn primary" onclick="window.print()" style="margin-left:auto;white-space:nowrap;background:#059669">
        🖨️ 列印當前講義 (Ctrl + P)
      </button>
    </div>

    <!-- A4 講義預覽區域 (Print Sheet) -->
    <div class="print-sheet" style="background:#fff;border:1px solid #cbd5e1;padding:32px 36px;border-radius:12px;box-shadow:var(--shadow-md);max-width:900px;margin:0 auto">
      <!-- 官方講義專屬抬頭 -->
      <div style="border-bottom:2px solid #091e32;padding-bottom:14px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-end">
        <div>
          <div style="font-size:12px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase">108 課綱英語文官方素養複習手冊 · 均一教育平台深度對標</div>
          <h2 style="margin:6px 0 0;font-size:22px;color:#091e32">${terms.find(t => t.id === activePrintTerm)?.title || '考前複習講義'}</h2>
        </div>
        <div style="text-align:right;font-size:12px;color:#475569">
          班級：________ 座號：____ 姓名：____________
        </div>
      </div>

      <!-- 考前 10 分鐘必備檢核清單 (Checklist) -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin-bottom:20px">
        <strong style="color:#0f172a;font-size:14px">✅ 考前 10 分鐘必備核心檢核清單 (Checklist)：</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;font-size:13px">
          <div><input type="checkbox"> 1. 看到時間副詞 (yesterday/now/tomorrow) 先圈出並判定時態</div>
          <div><input type="checkbox"> 2. 主詞是 He/She/It 時，現在式一般動詞記得加 s/es</div>
          <div><input type="checkbox"> 3. 助動詞 (do, does, did, can, will, should) 後面必接原形動詞</div>
          <div><input type="checkbox"> 4. 進行式公式必定是「be 動詞 + V-ing」，不可漏掉 be</div>
          <div><input type="checkbox"> 5. 比較級看到 than 前面必加 -er 或 more，不可雙重比較</div>
          <div><input type="checkbox"> 6. 介系詞在特定日子用 on，長月份年份用 in，時刻點用 at</div>
          <div><input type="checkbox"> 7. Although 與 but、Because 與 so 絕不同時出現在同一句</div>
          <div><input type="checkbox"> 8. 間接問句語序必定恢復為「疑問詞 + 主詞 + 動詞」</div>
        </div>
      </div>

      <!-- 名師核心公式速記表 -->
      <div style="margin-bottom:20px">
        <h3 style="margin:0 0 10px;font-size:16px;color:#1e3a8a;border-left:4px solid #2563eb;padding-left:8px">📐 名師考前速記公式大公開</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr style="background:#eff6ff;color:#1e40af;text-align:left">
              <th style="padding:8px 12px;border:1px solid #bfdbfe">考點類別</th>
              <th style="padding:8px 12px;border:1px solid #bfdbfe">精華公式 / 口訣</th>
              <th style="padding:8px 12px;border:1px solid #bfdbfe">經典實例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">頻率副詞位置</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#047857;font-weight:700">「Be後動前」</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0">He is always late. / He always eats breakfast.</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">動名詞必搭巨頭</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#047857;font-weight:700">enjoy / practice / finish + V-ing</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0">She practices playing the violin every day.</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">被動語態公式</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#047857;font-weight:700">S + be動詞 + 過去分詞 (p.p.)</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0">The novel was written by J.K. Rowling.</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">條件子句時態</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#047857;font-weight:700">從屬現在式代替未來式，主句用 will</td>
              <td style="padding:8px 12px;border:1px solid #e2e8f0">If it rains tomorrow, we will stay at home.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 避雷指南 -->
      <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px 16px">
        <strong style="color:#9f1239;font-size:13px">🚨 考前易錯盲點避雷：</strong>
        <div style="font-size:12px;color:#881337;margin-top:4px;line-height:1.6">
          • 看到 Look! 或 Listen! 立刻選現在進行式 (be + V-ing)，切勿只選原形動詞！<br>
          • 看到 there have 絕對錯誤，英文只有 There is / There are！<br>
          • 感官動詞 (see, hear) 與使役動詞 (make, have, let) 後面受詞補詞接原形動詞！
        </div>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 舊有分頁保留 (Chapter, Studio, Exams, Today, Progress)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function chapterPage() {
  const parts = openChapterId.split(':');
  const trackId = parts[0] || 'jhs';
  const chapId = parts[1] || 'j1';
  const curTrack = curriculum.find(c => c.id === trackId) || curriculum[0];
  const curChap = curTrack.chapters.find(ch => ch.id === chapId) || curTrack.chapters[0];

  return `
    <div class="header-block">
      <div class="pill">📖 核心課綱章節教學與語音精讀</div>
      <h1 style="margin:8px 0">${curChap.num}. ${curChap.title}</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">${curChap.subtitle} · ${curTrack.badge}</p>
    </div>

    <!-- 章節切換 Tabs -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin:20px 0;border-bottom:1px solid var(--line)">
      ${curTrack.chapters.map(ch => `
        <button class="btn ${ch.id === curChap.id ? 'primary' : 'quiet'}" data-open-chapter="${curTrack.id}:${ch.id}" style="white-space:nowrap;padding:8px 14px;border-radius:18px;font-size:13px">
          ${ch.num}. ${ch.title}
        </button>
      `).join('')}
    </div>

    <div style="display:grid;gap:20px">
      ${curChap.concepts.map(cc => `
        <div class="card">
          <h3 style="margin:0 0 10px;color:var(--brand-dark)">${cc.heading}</h3>
          <p style="font-size:14px;color:#334155;line-height:1.7;white-space:pre-line">${cc.body}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function studioPage() {
  return `
    <div class="header-block">
      <div class="pill">🎧 單字會話語音館</div>
      <h1 style="margin:8px 0">美語語音發音與對話點讀工作室</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        支援標準真人發音 (en-US)、0.8x 慢速精聽、單字 IPA 音標比對與對話角色朗讀。
      </p>
    </div>

    <div class="card" style="margin-top:20px">
      <p style="color:#64748b">請由「108課綱學年地圖」或「Sixth 六年級小升初」點擊單字或例句以啟動精聽發音播放系統。</p>
      <button class="btn primary" data-speak-sentence="Welcome to English Quest! Practice makes perfect.">🔊 試聽示範語音</button>
    </div>
  `;
}

function examPage() {
  return `
    <div class="header-block">
      <div class="pill">📝 全考制模考題庫</div>
      <h1 style="margin:8px 0">國中會考 · 高中學測 · 統測 · 國際檢定自由隨選測驗</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        收錄 6,000+ 題真題題庫，即時檢驗作答實力並記錄答錯題點。
      </p>
    </div>

    <div class="card" style="margin-top:20px">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:16px">
        <label><strong>考制題庫選擇：</strong></label>
        <select id="exam-cat-select" style="padding:8px 12px;border-radius:8px;border:1px solid var(--line)">
          <option value="jhs" ${quizCategory === 'jhs' ? 'selected' : ''}>國中會考 (CAP JHS)</option>
          <option value="shs" ${quizCategory === 'shs' ? 'selected' : ''}>高中學測 (GSAT SHS)</option>
          <option value="toeic" ${quizCategory === 'toeic' ? 'selected' : ''}>多益檢定 (TOEIC)</option>
          <option value="sat" ${quizCategory === 'sat' ? 'selected' : ''}>SAT 國際留學</option>
          <option value="gre" ${quizCategory === 'gre' ? 'selected' : ''}>GRE 研究所檢定</option>
          <option value="gmat" ${quizCategory === 'gmat' ? 'selected' : ''}>GMAT 商學院入學</option>
        </select>
        <button class="btn primary" data-start-quiz="true">🚀 開始 20 題隨選模考</button>
      </div>
      <p style="font-size:13px;color:#64748b">系統將自適應抽選 20 道具代表性的考題進行測驗，並自動計算得分率。</p>
    </div>
  `;
}

function today() {
  return curriculum108Page();
}

function progress() {
  const summary = junyi.getSummary();
  return `
    <div class="header-block">
      <div class="pill">📊 我的學習進度與徽章成就</div>
      <h1 style="margin:8px 0">均一教育學習軌跡與能力雷達</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        即時檢視各年級單元精熟狀態、累計經驗值與已獲得的素養勳章。
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;margin:20px 0">
      <div class="card" style="text-align:center">
        <div style="font-size:32px;font-weight:800;color:var(--green-core)">${summary.xp}</div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:4px">✨ 累計經驗值 (XP)</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:32px;font-weight:800;color:#2563eb">${summary.masteredCount}</div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:4px">⭐ 已精熟單元</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:32px;font-weight:800;color:#f59e0b">${summary.streak} 天</div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:4px">🔥 連續學習天數</div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin:0 0 14px">🏅 解鎖徽章一覽</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px">
        ${JUNYI_BADGES.map(b => {
          const unlocked = junyi.data.earnedBadges.includes(b.id);
          return `
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;background:${unlocked ? '#ecfdf5' : '#f8fafc'};border:1px solid ${unlocked ? '#a7f3d0' : '#e2e8f0'}">
              <span style="font-size:28px">${b.icon}</span>
              <div>
                <strong style="color:${unlocked ? '#047857' : '#64748b'}">${b.title}</strong>
                <div style="font-size:12px;color:#94a3b8;margin-top:2px">${b.desc}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function session() {
  return today();
}

function results() {
  return today();
}

function studyPage() {
  return chapterPage();
}

function map() {
  return curriculum108Page();
}

function render() {
  const pages = {
    curriculum108: curriculum108Page,
    junyi: junyiPage,
    sixth: sixthPage,
    jh: jhPage,
    arch: archPage,
    handouts: handoutsPage,
    chapter: chapterPage,
    studio: studioPage,
    exams: examPage,
    today,
    progress
  };
  root.innerHTML = shell((pages[page] || curriculum108Page)());
  bindEvents();
}

function bindEvents() {
  // 監聽下拉選擇
  const junyiSelect = document.querySelector('#junyi-unit-select');
  if (junyiSelect) {
    junyiSelect.addEventListener('change', e => {
      activeUnitId = e.target.value;
      render();
    });
  }

  const vocabSearch = document.querySelector('#vocab-search');
  if (vocabSearch) {
    vocabSearch.addEventListener('input', e => {
      vocab1200Search = e.target.value;
      render();
    });
  }
}

// 監聽全局點擊事件
root.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const d = b.dataset;

  // 導覽列切換
  if (d.nav) {
    navigate(d.nav);
    return;
  }

  // 108 課綱年級切換
  if (d.selectGrade) {
    activeGradeId = d.selectGrade;
    const g = UNIFIED_GRADES.find(item => item.gradeId === activeGradeId);
    if (g && g.semesters.length > 0) {
      activeSemId = g.semesters[0].semId;
    }
    render();
    return;
  }

  // 108 課綱學期切換
  if (d.selectSem) {
    activeSemId = d.selectSem;
    render();
    return;
  }

  // 開啟均一微課單元
  if (d.openJunyiUnit) {
    activeUnitId = d.openJunyiUnit;
    navigate('junyi');
    return;
  }

  // 均一展開提示
  if (d.revealHint) {
    if (!revealedHints[activeUnitId]) {
      revealedHints[activeUnitId] = [];
    }
    if (d.revealHint === 'all') {
      revealedHints[activeUnitId] = [1, 2, 'all'];
    } else {
      revealedHints[activeUnitId].push(Number(d.revealHint));
    }
    render();
    return;
  }

  // 均一標記精熟度
  if (d.setMastery) {
    junyi.setUnitMastery(d.setMastery, d.level);
    render();
    return;
  }

  // 均一答題檢測
  if (d.answerCheck) {
    if (d.answerCheck === 'correct') {
      alert('🎉 恭喜回答正確！獲得 +15 經驗值 (XP)！');
      junyi.recordUnitAttempt(activeUnitId, true);
    } else {
      alert('💡 答案不對喔！請點擊提示 1 或提示 2 查看解題線索！');
      junyi.recordUnitAttempt(activeUnitId, false);
    }
    render();
    return;
  }

  // Sixth 切換單元
  if (d.selectSixth || d.openSixthUnit) {
    activeSixthUnit = d.selectSixth || d.openSixthUnit;
    sixthQuizSubmitted = false;
    navigate('sixth');
    return;
  }

  // Sixth 測驗選答案
  if (d.sixthAnswer) {
    sixthQuizAnswers[d.sixthAnswer] = Number(d.optIdx);
    render();
    return;
  }

  // Sixth 提交測驗
  if (d.submitSixthQuiz) {
    sixthQuizSubmitted = !sixthQuizSubmitted;
    if (sixthQuizSubmitted) {
      junyi.addXp(40);
    }
    render();
    return;
  }

  // JH 切換 Tab
  if (d.selectJhTab) {
    activeJhTab = d.selectJhTab;
    render();
    return;
  }

  // JH 開啟單元
  if (d.openJhUnit) {
    activeJhUnit = d.openJhUnit;
    activeJhTab = 'units';
    navigate('jh');
    return;
  }

  // Arch 切換專題模組
  if (d.selectArchModule || d.openArchModule) {
    activeArchModule = d.selectArchModule || d.openArchModule;
    navigate('arch');
    return;
  }

  // Arch 詞彙類別切換
  if (d.vocabCat) {
    vocab1200Category = d.vocabCat;
    render();
    return;
  }

  // 前往 A4 講義列印
  if (d.printHandout) {
    activePrintTerm = d.printHandout;
    navigate('handouts');
    return;
  }

  if (d.selectPrintTerm) {
    activePrintTerm = d.selectPrintTerm;
    render();
    return;
  }

  // 開啟指定舊章節
  if (d.openChapter) {
    openChapterId = d.openChapter;
    navigate('chapter');
    return;
  }

  // 播放單字發音
  if (d.speakWord) {
    const slow = d.slow === 'true';
    playWord(d.speakWord, slow, {
      onStart: () => b.classList.add('active'),
      onEnd: () => b.classList.remove('active'),
      onError: () => b.classList.remove('active')
    });
    return;
  }

  // 播放句子發音
  if (d.speakSentence) {
    playSentence(d.speakSentence, false, {
      onStart: () => b.classList.add('active'),
      onEnd: () => b.classList.remove('active'),
      onError: () => b.classList.remove('active')
    });
    return;
  }
});

// 初始化啟動渲染
render();
