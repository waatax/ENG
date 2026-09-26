// app.js - 全方位 108 課綱英語教育旗艦平台 (專家團隊 7 次深度大改造版)
// 7 位跨領域專家委員會指導：課綱總體諮詢、第二語言習得 (SLA)、均一微課自學、大考測驗心理計量、語音聲學、技高ESP與全齡UX
// 深度整合：國小 (Sixth 專案 6上/6下)、國中 (JH 專案 7-9年級 16單元)、高中/技高 (Arch 專案 10-12年級大考先修與學期複習)
// 包含：概念公式、音標單字、雙語會話、多模態跨領域閱讀、步驟0破題思維、雙階鷹架提示檢測、42項致命陷阱避雷雷達、12枚核心素養徽章與 A4 官方講義列印

import { tracks, exams } from './content.mjs';
import { curriculum, examStudy } from './curriculum.mjs';
import { initialSources } from './sources.mjs';
import { questionDB, CATEGORY_META } from './question_db.mjs';
import { initialState, createAttempt, recordResponse, finishAttempt, resultOf, remainingSeconds } from './core.mjs';
import { speak, playWord, playSentence, playSequence, stopAudio, isAudioActive } from './audio.mjs';

import { UNIFIED_GRADES, EXPERT_COUNCIL } from './curriculum_unified.mjs';
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
import { teachingChapter, microLesson, handleLessonClick, handleLessonInput } from './lesson_pages.mjs';

const KEY = 'english-quest-v5';
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

// 108 課綱狀態
let activeGradeId = 'g6';
let activeSemId = 'g6-s1';
let activeUnitId = 'g6-s1-u1';
let showExpertDetails = false;

// 專案移植狀態
let activeSixthUnit = 'eng-u1';
let sixthQuizAnswers = {};
let sixthQuizSubmitted = false;

let activeJhTab = 'units';
let activeJhUnit = 'u1';

let activeArchModule = 'basic-tenses-passive';
let vocab1200Category = 'all';
let vocab1200Search = '';

let activePrintTerm = 'g6-s1';
let revealedHints = {}; // unitId: [1, 2, 'all']
let revealedSolutions = {}; // unitId: boolean
let userQuizChoices = {}; // unitId: selectedOptIndex

let quizCategory = 'all';
let currentQuizQuestions = [];
let currentQuizIdx = 0;
let userQuizAnswers = {};
let quizSubmitted = false;
let quizRevealedHints = {};
let quizRevealedExplains = {};
let quizLoading = false;

const root = document.querySelector('#app') || document.body;

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
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
    ['curriculum108', '01', '108課綱學年地圖 (7年級全貫通)'],
    ['junyi', '02', '均一微課與鷹架館 (42陷阱雷達)'],
    ['sixth', '03', 'Sixth 六年級小升初 (8單元講義)'],
    ['jh', '04', 'JH 國中會考衝刺館 (16主題全案)'],
    ['arch', '05', 'Arch 高中先修專題 (5大核心矩陣)'],
    ['handouts', '06', 'A4 考前講義列印庫 (14學期全收)'],
    ['chapter', '07', '考制核心課綱教學'],
    ['studio', '08', '單字會話語音點讀館'],
    ['exams', '09', '全考制模考題庫'],
    ['today', '10', '每日精熟練習'],
    ['progress', '11', '學習進度與徽章成就']
  ];

  const summary = junyi.getSummary();

  return `
    <div class="shell">
      <aside class="side">
        <div class="brand">English<span> Quest.</span></div>
        <div class="edition">108課綱英語旗艦平台 · 專家重構版</div>
        
        <div class="user-xp-pill" style="background:rgba(255,255,255,0.08);padding:10px 14px;border-radius:10px;margin-bottom:18px;border:1px solid rgba(255,255,255,0.12)">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#94a3b8;margin-bottom:4px">
            <span>✨ 均一經驗值 (XP)</span>
            <strong style="color:var(--mint);font-size:15px">${summary.xp} XP</strong>
          </div>
          <div style="display:flex;gap:12px;font-size:11px;color:#cbd5e1">
            <span>⭐ 精熟: ${summary.masteredCount} / ${summary.totalUnitsCount} 單元</span>
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
          <strong>108課綱・專家委員會7次迭代</strong><br>
          國小國中高中 61 單元 · 內容倍增 100%+<br>
          <span style="font-size:11px;color:#94a3b8">Junyi Academy × SLA Cognitive Engine</span>
        </div>
      </aside>

      <main class="main" id="main-content">
        ${body}
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
      <div class="pill">🏫 108 課綱學年與學期導覽 · 專家委員會 7 次大改造</div>
      <h1 style="margin:8px 0">教育部 108 課綱英語文全學年課程地圖 (雙倍優質內容版)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        完整橫跨國小第三階段 (6上/6下)、國中第四階段 (7上至9下會考)、高中第五階段 (10上至12下學測/統測/國際認證)。
        由 7 位跨領域專家團隊指導，每個單元均配備：概念公式、音標單字、情境雙語會話、多模態跨領域閱讀、步驟0破題思維、雙階鷹架提示檢測、42項致命陷阱避雷雷達與考前自主檢核清單！
      </p>
    </div>

    <!-- 7 位專家委員會諮詢橫幅 -->
    <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg, #091e32 0%, #1e293b 100%);color:#fff;border-left:6px solid #34d399">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:22px">🏛️</span>
            <strong style="font-size:16px;color:#34d399">7 位跨領域專家諮詢委員會指導</strong>
            <span class="chip" style="background:rgba(52,211,153,0.2);color:#34d399;font-weight:700">7 次深度迭代改造完成</span>
          </div>
          <p style="margin:6px 0 0;font-size:13px;color:#cbd5e1;line-height:1.5">
            課綱總體諮詢、第二語言習得 (SLA)、均一微課自學、大考測驗心理計量、語音聲學、技高專業英語 (ESP) 與全端 UX 共同打造。
          </p>
        </div>
        <button class="btn small" style="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.25)" data-toggle-expert="true">
          ${showExpertDetails ? '收合專家陣容 ▲' : '查看 7 位專家陣容與改造成果 ▼'}
        </button>
      </div>

      ${showExpertDetails ? `
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:12px">
          ${EXPERT_COUNCIL.map(m => `
            <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:12px;border-radius:8px">
              <div style="font-size:11px;color:#34d399;font-weight:700;margin-bottom:2px">[${m.role}]</div>
              <strong style="font-size:14px;color:#fff">${m.name}</strong>
              <div style="font-size:12px;color:#94a3b8;margin:2px 0 4px">${m.title}</div>
              <div style="font-size:11px;color:#cbd5e1;line-height:1.4">🎯 指導要旨：${m.specialty}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
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
          <div style="font-size:18px;font-weight:700;color:#34d399;margin-top:4px">${currentGrade.semesters.length} 個學期學程 · ${currentGrade.semesters.reduce((acc, s) => acc + s.units.length, 0)} 個核心單元</div>
        </div>
      </div>
    </div>

    <!-- 上下學期切換 Tabs -->
    <div style="display:flex;gap:12px;margin-bottom:20px">
      ${currentGrade.semesters.map(s => `
        <button class="btn ${s.semId === activeSemId ? 'primary' : 'quiet'}" data-select-sem="${s.semId}" style="flex:1;padding:14px;text-align:center;border-radius:12px;border:1px solid var(--line)">
          <div style="font-weight:700;font-size:16px">${s.title}</div>
          <div style="font-size:12px;color:${s.semId === activeSemId ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)'};margin-top:4px">${s.units.length} 個單元模組 (雙倍內容)</div>
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

    <!-- 單元列表 Cards (含倍增優質教學內容) -->
    <div style="display:grid;gap:24px">
      ${currentSem.units.map(u => {
        const mastery = junyi.getUnitMastery(u.id);
        const masteryCode = typeof mastery === 'string' ? mastery : (mastery?.code || 'unstarted');
        const masteryInfo = MASTERY_LEVELS[masteryCode.toUpperCase()] || MASTERY_LEVELS.UNSTARTED;
        const hints = revealedHints[u.id] || [];
        const isSolutionOpen = !!revealedSolutions[u.id];
        const userChoice = userQuizChoices[u.id];

        return `
          <div class="card" style="border-left:6px solid ${masteryInfo.color};box-shadow:var(--shadow-sm);transition:all 0.2s">
            <!-- 單元頭部 -->
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;border-bottom:1px solid var(--line);padding-bottom:12px">
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <span class="chip" style="background:#f1f5f9;color:#334155;font-weight:700">${u.unitNo}</span>
                  <span class="chip" style="background:#e0e7ff;color:#3730a3">課綱: ${u.indicator}</span>
                  <span class="chip" style="background:#ecfdf5;color:#047857">素養: ${u.competency || '三面九項核心素養'}</span>
                  <span class="chip" style="background:${masteryInfo.color}18;color:${masteryInfo.color};font-weight:700">
                    ${masteryInfo.icon} ${masteryInfo.label}
                  </span>
                </div>
                <h2 style="margin:6px 0;font-size:20px;color:#0f172a">${u.title}</h2>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button class="btn small primary" data-open-junyi-unit="${u.id}">💡 均一微課深度模式</button>
                <button class="btn small quiet" data-print-handout="${currentSem.semId}">🖨️ A4講義列印</button>
                ${u.sourceRef?.startsWith('sixth:') ? `<button class="btn small quiet" data-open-sixth-unit="${u.sourceRef.split(':')[1]}">🎒 6年級講義</button>` : ''}
                ${u.sourceRef?.startsWith('jh:') ? `<button class="btn small quiet" data-open-jh-unit="${u.sourceRef.split(':')[1]}">🎓 國中會考</button>` : ''}
                ${u.sourceRef?.startsWith('arch:') ? `<button class="btn small quiet" data-open-arch-module="${u.sourceRef.split(':')[1]}">🏛️ Arch專題</button>` : ''}
              </div>
            </div>

            <!-- 1. 學習動機與生活情境 -->
            ${u.motivation ? `
              <div style="margin:14px 0 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px 16px;font-size:14px;color:#166534">
                <strong>💡 學習動機與情境脈絡：</strong> ${u.motivation}
              </div>
            ` : ''}

            <!-- 2. 核心觀念矩陣 (Concepts & Formulas) -->
            ${u.concepts && u.concepts.length > 0 ? `
              <div style="margin-bottom:18px">
                <h3 style="margin:0 0 10px;font-size:15px;color:#1e3a8a;display:flex;align-items:center;gap:6px">
                  <span>🔑</span> 核心觀念結構矩陣與語法公式 (${u.concepts.length} 大核心觀念)
                </h3>
                <div style="display:grid;gap:12px">
                  ${u.concepts.map(c => `
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px">
                      <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:6px">📌 ${c.title}</div>
                      ${c.formula ? `
                        <div style="background:#fff;border:1px solid #cbd5e1;padding:8px 12px;border-radius:6px;font-family:monospace;font-weight:700;color:#2563eb;margin-bottom:8px;font-size:13px">
                          📐 語法公式：${c.formula}
                        </div>
                      ` : ''}
                      <p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.6">${c.explanation}</p>
                      ${c.example ? `
                        <div style="background:#eff6ff;padding:6px 10px;border-radius:6px;font-size:13px;color:#1e40af;margin-bottom:8px">
                          <strong>💬 經典範例：</strong> <span lang="en">${c.example}</span>
                        </div>
                      ` : ''}
                      ${c.examExample ? `
                        <div class="exam-example-box">
                          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                            <span class="exam-example-badge">🎯 知識點典型題型範例</span>
                            <span style="font-size:11px;color:#64748b">108 課綱與大考對標題型</span>
                          </div>
                          <div class="exam-example-stem" lang="en">
                            ${c.examExample.stem}
                          </div>
                          <div class="exam-example-options">
                            ${c.examExample.options.map((opt, oi) => `
                              <div class="exam-example-option ${oi === c.examExample.answer ? 'is-correct' : ''}">
                                ${String.fromCharCode(65 + oi)}) <span lang="en">${opt}</span> ${oi === c.examExample.answer ? '✔️' : ''}
                              </div>
                            `).join('')}
                          </div>
                          <div class="exam-example-analysis">
                            <strong>💡 考點解析與解構：</strong>${c.examExample.analysis}
                          </div>
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 3. 自然拼讀與核心單字卡 (Phonics & Lexical Vocabulary) -->
            ${u.phonicsVocab && u.phonicsVocab.length > 0 ? `
              <div style="margin-bottom:18px">
                <h3 style="margin:0 0 10px;font-size:15px;color:#0f766e;display:flex;align-items:center;gap:6px">
                  <span>🔤</span> 語音聲學與核心字彙卡 (點讀發音與 IPA 標音)
                </h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:10px">
                  ${u.phonicsVocab.map(v => `
                    <div style="background:#f0fdfa;border:1px solid #ccfbf1;padding:12px;border-radius:10px;display:flex;flex-direction:column;justify-content:space-between">
                      <div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                          <strong style="font-size:17px;color:#115e59" lang="en">${v.word}</strong>
                          <div style="display:flex;gap:4px">
                            <button class="btn small quiet" style="padding:2px 8px;font-size:12px" data-speak-word="${esc(v.word)}">🔊 正常</button>
                            <button class="btn small quiet" style="padding:2px 8px;font-size:12px" data-speak-word="${esc(v.word)}" data-slow="true">🐢 慢速</button>
                          </div>
                        </div>
                        <div style="font-size:13px;color:#0f766e;margin-bottom:4px">
                          <span style="font-family:monospace;background:#fff;padding:1px 6px;border-radius:4px;border:1px solid #99f6e4">${v.ipa}</span>
                          <span class="chip" style="font-size:11px;padding:1px 6px">${v.pos}</span>
                          <strong>${v.zh}</strong>
                        </div>
                      </div>
                      ${v.sentence ? `
                        <div style="background:#fff;padding:6px 8px;border-radius:6px;border:1px solid #e6fffa;font-size:12px;color:#334155;margin-top:6px" lang="en">
                          "${v.sentence}"
                        </div>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- 4. 情境雙語實戰會話 (Dual Dialogues with Full Audio) -->
            ${u.dialogue && u.dialogue.length > 0 ? `
              <div style="margin-bottom:18px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
                  <h3 style="margin:0;font-size:15px;color:#4338ca;display:flex;align-items:center;gap:6px">
                    <span>💬</span> 常用生活情境雙語會話 (${u.dialogue.length} 輪生活母語語料)
                  </h3>
                  <div style="display:flex;gap:6px;align-items:center">
                    <button class="btn small primary" data-play-dialogue="${u.id}" style="font-size:12px;padding:3px 10px">
                      ▶️ 全對話自動連播
                    </button>
                    <button class="btn small quiet" data-stop-audio="true" style="font-size:12px;padding:3px 10px">
                      ⏹️ 停止播放
                    </button>
                  </div>
                </div>
                <div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;padding:14px;display:grid;gap:8px">
                  ${u.dialogue.map((d, dIdx) => `
                    <div class="dialogue-turn ${activePlayingDialogueIndex === dIdx ? 'playing-bubble' : ''}">
                      <div style="flex:1">
                        <div style="display:flex;align-items:center;gap:6px">
                          <strong style="color:#3730a3;font-size:13px">${d.speaker}</strong>
                          ${activePlayingDialogueIndex === dIdx ? `
                            <span class="soundwave-indicator">
                              <span class="soundwave-bar"></span>
                              <span class="soundwave-bar"></span>
                              <span class="soundwave-bar"></span>
                              <span class="soundwave-bar"></span>
                            </span>
                          ` : ''}
                        </div>
                        <div style="font-size:14px;color:#1e1b4b;margin-top:2px" lang="en">${d.en}</div>
                        <div style="font-size:12px;color:#6b7280;margin-top:2px">${d.zh}</div>
                      </div>
                      <div style="display:flex;gap:4px;margin-left:8px;align-items:center">
                        <button class="btn small quiet" style="padding:2px 8px;font-size:12px" data-speak-sentence="${esc(d.en)}">🔊 正常速</button>
                        <button class="btn small quiet" style="padding:2px 8px;font-size:12px" data-speak-sentence="${esc(d.en)}" data-slow="true">🐢 慢速</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}


            <!-- 5. 跨領域多模態閱讀文本 (Multimodal Reading) -->
            ${u.reading ? `
              <div style="margin-bottom:18px">
                <h3 style="margin:0 0 10px;font-size:15px;color:#92400e;display:flex;align-items:center;gap:6px">
                  <span>📖</span> 跨學科多模態素養閱讀：${u.reading.title}
                </h3>
                <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:14px">
                  ${u.reading.strategy ? `
                    <div style="background:#fef3c7;display:inline-block;padding:3px 10px;border-radius:6px;font-size:12px;color:#b45309;font-weight:700;margin-bottom:8px">
                      🎯 閱讀策略：${u.reading.strategy}
                    </div>
                  ` : ''}
                  <p style="margin:0 0 12px;font-size:14px;color:#78350f;line-height:1.7;white-space:pre-line" lang="en">
                    ${u.reading.text}
                  </p>
                  ${u.reading.questions && u.reading.questions.length > 0 ? `
                    <div style="border-top:1px solid #fef08a;padding-top:10px;display:grid;gap:6px">
                      <strong style="font-size:13px;color:#854d0e">素養檢核問題：</strong>
                      ${u.reading.questions.map((rq, ri) => `
                        <div style="font-size:13px;color:#713f12;background:#fff;padding:8px 12px;border-radius:6px;border:1px solid #fef08a">
                          <div><strong>Q${ri + 1}:</strong> ${rq.q}</div>
                          <div style="color:#059669;margin-top:2px"><strong>A:</strong> ${rq.ans}</div>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            <!-- 6. 均一步驟 0 破題思維 -->
            <div style="background:linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%);border:1px solid #6ee7b7;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:14px;color:#065f46">
              <strong style="font-size:15px">⚡ 均一步驟 0 破題思維（第一眼題眼）：</strong>
              <div style="margin-top:4px;line-height:1.6">${u.step0Clue}</div>
            </div>

            <!-- 7. 鷹架式形成性檢測題 (Scaffolding Formative Quiz) -->
            ${u.formativeQuiz && u.formativeQuiz.length > 0 ? `
              <div style="border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:16px;background:#f8fafc">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
                  <strong style="font-size:15px;color:#0f172a">🪜 鷹架式形成性評量檢測：</strong>
                  <div style="display:flex;gap:6px">
                    <button class="btn small quiet" data-reveal-hint-unit="${u.id}" data-hint-tier="1">💡 提示 1 (語法)</button>
                    <button class="btn small quiet" data-reveal-hint-unit="${u.id}" data-hint-tier="2">🔍 提示 2 (排除)</button>
                    <button class="btn small primary" data-toggle-solution-unit="${u.id}">
                      ${isSolutionOpen ? '收起詳解 ▲' : '✅ 完整詳解剖析 ▼'}
                    </button>
                  </div>
                </div>

                ${u.formativeQuiz.map((q, qi) => `
                  <div style="background:#fff;border:1px solid #cbd5e1;padding:12px 14px;border-radius:8px;margin-bottom:8px">
                    <div style="font-size:14px;font-weight:600;color:#1e293b;margin-bottom:8px">
                      ${qi + 1}. <span lang="en">${q.q}</span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">
                      ${q.options.map((opt, oi) => {
                        const isChosen = userChoice === oi;
                        const isCorrect = oi === q.ans;
                        let btnStyle = 'background:#f8fafc;border:1px solid #e2e8f0;text-align:left;padding:8px 12px';
                        if (isChosen) {
                          btnStyle = isCorrect ? 'background:#ecfdf5;border:2px solid #10b981;color:#047857;font-weight:700' : 'background:#fff1f2;border:2px solid #f43f5e;color:#be123c;font-weight:700';
                        }
                        return `
                          <button class="btn small" style="${btnStyle}" data-quiz-unit="${u.id}" data-quiz-choice="${oi}" data-quiz-ans="${q.ans}">
                            ${String.fromCharCode(65 + oi)}) <span lang="en">${opt}</span>
                          </button>
                        `;
                      }).join('')}
                    </div>

                    <!-- 鷹架提示 1 (語法線索) -->
                    ${hints.includes(1) || hints.includes('all') ? `
                      <div style="background:#fef3c7;border:1px solid #fde68a;padding:8px 12px;border-radius:6px;font-size:13px;color:#92400e;margin-top:6px">
                        <strong>💡 鷹架提示 1 (語法規律)：</strong> ${q.hint1}
                      </div>
                    ` : ''}

                    <!-- 鷹架提示 2 (排除法則) -->
                    ${hints.includes(2) || hints.includes('all') ? `
                      <div style="background:#fef3c7;border:1px solid #fde68a;padding:8px 12px;border-radius:6px;font-size:13px;color:#92400e;margin-top:6px">
                        <strong>🔍 鷹架提示 2 (排除法則)：</strong> ${q.hint2}
                      </div>
                    ` : ''}

                    <!-- 完整詳解剖析 -->
                    ${isSolutionOpen || hints.includes('all') ? `
                      <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:10px 14px;border-radius:6px;font-size:13px;color:#065f46;margin-top:6px">
                        <strong>⭐ 均一精熟解析：</strong> ${q.solution}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- 8. 考場致命陷阱避雷指南 (Fatal Traps Radar) -->
            ${u.traps && u.traps.length > 0 ? `
              <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:10px;padding:12px 16px;font-size:13px;color:#9f1239;margin-bottom:14px">
                <strong style="font-size:14px">⚠️ 考場致命陷阱避雷指南：</strong>
                <div style="margin-top:6px;line-height:1.6">
                  <span style="text-decoration:line-through;margin-right:8px">${u.traps[0].wrong}</span> ➔ 
                  <strong style="color:#047857;margin-left:8px">${u.traps[0].correct}</strong>
                  <div style="font-size:12px;color:#881337;margin-top:4px">
                    📌 <strong>失分診斷：</strong> ${u.traps[0].reason}
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- 9. 考前自主檢核清單 (Self-Regulated Mastery Checklist) -->
            ${u.checklist && u.checklist.length > 0 ? `
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:10px 14px;font-size:13px">
                <strong style="color:#0f172a">📋 考前自主檢核清單：</strong>
                <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:6px;margin-top:6px">
                  ${u.checklist.map(chk => `
                    <label style="display:flex;align-items:center;gap:6px;color:#334155;cursor:pointer">
                      <input type="checkbox"> <span>${chk}</span>
                    </label>
                  `).join('')}
                </div>
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
  return microLesson(activeUnitId);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Sixth 專案完整移植 (6上 · 6下)
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
        完整移植自 Sixth 專案！包含 8 大單元高解析教材、64 大考前筆記速記心訣、情境朗讀語音庫與 128 題精選段考會考前哨戰測驗。
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

        <!-- 單元測驗評量 -->
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="margin:0">📝 課堂精熟測驗（共 ${questions.length} 題）</h3>
            <button class="btn small primary" data-submit-sixth-quiz="true">
              ${sixthQuizSubmitted ? '🔄 重新測驗' : '✅ 提交評分'}
            </button>
          </div>

          <div style="display:grid;gap:16px">
            ${questions.map((q, idx) => {
              const userAns = sixthQuizAnswers[q.id];
              const isCorrect = userAns === q.answerIndex;
              return `
                <div style="padding:14px;border:1px solid ${sixthQuizSubmitted ? (isCorrect ? '#10b981' : '#f43f5e') : 'var(--line)'};border-radius:10px;background:${sixthQuizSubmitted ? (isCorrect ? '#ecfdf5' : '#fff1f2') : '#fff'}">
                  <div style="font-weight:600;margin-bottom:8px">
                    ${idx + 1}. <span lang="en">${q.question}</span>
                  </div>
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
                    ${q.options.map((opt, optIdx) => `
                      <button class="btn small ${userAns === optIdx ? 'primary' : 'quiet'}" data-sixth-answer="${q.id}" data-opt-idx="${optIdx}" style="text-align:left;padding:8px 12px">
                        ${String.fromCharCode(65 + optIdx)}) <span lang="en">${opt}</span>
                      </button>
                    `).join('')}
                  </div>
                  ${sixthQuizSubmitted ? `
                    <div style="margin-top:10px;font-size:13px;padding:8px 12px;background:rgba(255,255,255,0.8);border-radius:6px">
                      <strong>${isCorrect ? '✅ 答對了！' : '❌ 答錯了！'}</strong>
                      正解是：<strong style="color:#047857">${String.fromCharCode(65 + q.answerIndex)}) ${q.options[q.answerIndex]}</strong><br>
                      ${q.explanation}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- 右側：速記筆記與語音朗讀 -->
      <div>
        <!-- 考前 10 分鐘速記筆記卡 -->
        <div class="card" style="margin-bottom:20px;background:#f8fafc">
          <h3 style="margin:0 0 12px;color:var(--brand-dark)">📌 考前 10 分鐘速記筆記</h3>
          ${notes ? `
            <div style="display:grid;gap:12px">
              ${notes.keyPoints.map(p => `
                <div style="background:#fff;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;font-size:13px">
                  <strong style="color:#1d4ed8;display:block;margin-bottom:4px">${p.title}</strong>
                  <div style="color:#334155;white-space:pre-line">${p.summary}</div>
                </div>
              `).join('')}
            </div>
          ` : '<p style="color:var(--text-muted)">暫無筆記</p>'}
        </div>

        <!-- 語音情境朗讀庫 -->
        <div class="card">
          <h3 style="margin:0 0 12px;color:var(--brand-dark)">🔊 單元情境對話朗讀</h3>
          ${audio && audio.dialogue ? `
            <div style="display:grid;gap:8px">
              ${audio.dialogue.map((d, di) => `
                <div style="padding:10px;border-radius:8px;background:#f1f5f9;font-size:13px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                    <strong style="color:#475569">${d.speaker}:</strong>
                    <button class="btn small quiet" data-speak-sentence="${esc(d.en)}">🔊 朗讀</button>
                  </div>
                  <div style="color:#1e293b;font-weight:500" lang="en">${d.en}</div>
                  <div style="color:#64748b;font-size:12px;margin-top:2px">${d.zh}</div>
                </div>
              `).join('')}
            </div>
          ` : '<p style="color:var(--text-muted)">暫無語音對話</p>'}
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
                <strong>關鍵引導詞：</strong> ${(p.signals || []).join(', ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'parts-of-speech' ? `
      <div class="card" style="margin-bottom:20px">
        <h2 style="margin:0 0 12px">八大詞性與字尾衍生構詞法</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px">
          ${(archPartsOfSpeech || []).map(pos => `
            <div style="border:1px solid var(--line);border-radius:10px;padding:12px;background:#fff">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <strong style="color:#0f172a;font-size:15px">${pos.nameZh} (${pos.code})</strong>
                <span class="chip" style="background:#e0e7ff;color:#3730a3">${pos.nameEn}</span>
              </div>
              <p style="font-size:13px;color:#475569;margin:0 0 8px">${pos.definition}</p>
              <div style="font-size:12px;color:#2563eb">
                <strong>句中主要功能：</strong> ${(pos.functions || []).join(', ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'phonetics-dictionary' ? `
      <div class="card" style="margin-bottom:20px">
        <h2 style="margin:0 0 12px">KK 音標發音符號體系與查字典核心代碼</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:12px">
          ${(archPhoneticItems || []).slice(0, 12).map(ph => `
            <div style="border:1px solid var(--line);border-radius:10px;padding:12px;background:#f8fafc">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
                <span style="font-size:20px;font-family:monospace;font-weight:700;color:#2563eb">${ph.ipa}</span>
                <span class="chip" style="font-size:11px">${ph.type}</span>
              </div>
              <div style="font-size:12px;color:#475569;margin-bottom:6px">${ph.desc}</div>
              <div style="background:#fff;padding:4px 8px;border-radius:4px;font-size:12px;color:#334155">
                例字：<strong lang="en">${ph.examples.join(', ')}</strong>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'vocab-1200' ? `
      <div class="card" style="margin-bottom:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <h2 style="margin:0">教育部核心 1200 基礎必備單字庫</h2>
          <input type="text" id="vocab-search" placeholder="🔍 搜尋單字或中文..." value="${vocab1200Search}" style="padding:6px 12px;border-radius:8px;border:1px solid var(--line)">
        </div>

        <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:10px;margin-bottom:14px">
          ${['all', 'travel', 'food', 'family', 'academic', 'technology'].map(cat => `
            <button class="btn small ${vocab1200Category === cat ? 'primary' : 'quiet'}" data-vocab-cat="${cat}">
              ${cat === 'all' ? '全部類別' : cat}
            </button>
          `).join('')}
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px">
          ${(archVocabCategories || []).flatMap(c => c.words).slice(0, 36).map(w => `
            <div style="border:1px solid var(--line);border-radius:8px;padding:10px;background:#fff;display:flex;justify-content:space-between;align-items:center">
              <div>
                <strong style="color:#0f172a" lang="en">${w.word}</strong>
                <span style="font-size:11px;color:#64748b;margin-left:4px">${w.pos}</span>
                <div style="font-size:12px;color:#475569">${w.zh}</div>
              </div>
              <button class="btn small quiet" data-speak-word="${esc(w.word)}">🔊</button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${activeArchModule === 'semesters' ? `
      <div style="display:grid;gap:20px">
        ${archSemesters.map(sem => `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
              <h3 style="margin:0;color:#1e3a8a">${sem.title} (${sem.titleEn})</h3>
              <button class="btn small primary" data-print-handout="${sem.id}">🖨️ 列印學期複習手冊</button>
            </div>
            <p style="font-size:14px;color:#334155;margin:0 0 12px">${sem.description}</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:12px">
              ${sem.chapters.map(c => `
                <div style="background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e2e8f0">
                  <strong style="font-size:14px;color:#0f172a">${c.title}</strong>
                  <div style="font-size:12px;color:#475569;margin-top:4px">${c.titleEn}</div>
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
// 6. A4 講義列印庫 (A4 Printable Handouts) - 支援全 14 學期
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function handoutsPage() {
  const terms = [
    { id: 'g6-s1', title: '國小 6年級上學期 (6上) 段考大複習講義', gradeId: 'g6', semId: 'g6-s1' },
    { id: 'g6-s2', title: '國小 6年級下學期 (6下) 畢業考與小升初銜接講義', gradeId: 'g6', semId: 'g6-s2' },
    { id: 'g7-s1', title: '國中 7年級上學期 (7上) 基礎語法與動詞考前精粹', gradeId: 'g7', semId: 'g7-s1' },
    { id: 'g7-s2', title: '國中 7年級下學期 (7下) 進行式與方位介系詞考前精粹', gradeId: 'g7', semId: 'g7-s2' },
    { id: 'g8-s1', title: '國中 8年級上學期 (8上) 過去式與條件句考前精粹', gradeId: 'g8', semId: 'g8-s1' },
    { id: 'g8-s2', title: '國中 8年級下學期 (8下) 比較級動名詞考前精粹', gradeId: 'g8', semId: 'g8-s2' },
    { id: 'g9-s1', title: '國中 9年級上學期 (9上) 完成式與被動語態考前精粹', gradeId: 'g9', semId: 'g9-s1' },
    { id: 'g9-s2', title: '國中 9年級下學期 (9下) 會考滿分衝刺總複習', gradeId: 'g9', semId: 'g9-s2' },
    { id: 'g10-s1', title: '高中 10年級上學期 (10上) 五大句型與從屬子句精粹', gradeId: 'g10', semId: 'g10-s1' },
    { id: 'g10-s2', title: '高中 10年級下學期 (10下) 篇章標記與多文本圖表精粹', gradeId: 'g10', semId: 'g10-s2' },
    { id: 'g11-s1', title: '高中 11年級上學期 (11上) 分詞構句與假設語氣巔峰', gradeId: 'g11', semId: 'g11-s1' },
    { id: 'g11-s2', title: '高中 11年級下學期 (11下) 倒裝句與科技永續專業英語', gradeId: 'g11', semId: 'g11-s2' },
    { id: 'g12-s1', title: '高三 12年級上學期 (12上) 學測統測大考實戰奪冠攻略', gradeId: 'g12', semId: 'g12-s1' },
    { id: 'g12-s2', title: '高三 12年級下學期 (12下) 國際認證與終生英語力躍升', gradeId: 'g12', semId: 'g12-s2' }
  ];

  const currentTermObj = terms.find(t => t.id === activePrintTerm) || terms[0];
  const targetGrade = UNIFIED_GRADES.find(g => g.gradeId === currentTermObj.gradeId) || UNIFIED_GRADES[0];
  const targetSem = targetGrade.semesters.find(s => s.semId === currentTermObj.semId) || targetGrade.semesters[0];

  return `
    <div class="header-block print-hide">
      <div class="pill">🖨️ A4 官方講義下載與列印中心</div>
      <h1 style="margin:8px 0">108 課綱各學期考前 10 分鐘精華複習講義 (全 14 學期)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        針對段考、教育會考、統測與學測量身打造。包含官方講義標頭、名師速記公式、考前 10 分鐘必備檢核清單與避雷指南，符合標準 A4 輸出規範。
      </p>
    </div>

    <!-- 學期切換列 -->
    <div class="print-hide" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin:20px 0;border-bottom:1px solid var(--line)">
      ${terms.map(t => `
        <button class="btn ${t.id === activePrintTerm ? 'primary' : 'quiet'}" data-select-print-term="${t.id}" style="white-space:nowrap;padding:8px 14px;border-radius:18px;font-size:13px">
          ${t.title.split(' ')[0]} ${t.title.split(' ')[1]}
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
          <h2 style="margin:6px 0 0;font-size:22px;color:#091e32">${currentTermObj.title}</h2>
        </div>
        <div style="text-align:right;font-size:12px;color:#475569">
          班級：________ 座號：____ 姓名：____________
        </div>
      </div>

      <!-- 段考重點考核範疇 -->
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 14px;margin-bottom:16px;font-size:13px;color:#1e40af">
        <strong>🎯 本學期段考/大考考核主軸：</strong> ${targetSem.examFocus}
      </div>

      <!-- 考前 10 分鐘必備檢核清單 (Checklist) -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 18px;margin-bottom:20px">
        <strong style="color:#0f172a;font-size:14px">✅ 考前 10 分鐘必備核心檢核清單 (Checklist)：</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px;font-size:13px">
          ${targetSem.units.flatMap(u => u.checklist || []).slice(0, 8).map((chk, ci) => `
            <div><input type="checkbox"> ${ci + 1}. ${chk}</div>
          `).join('')}
        </div>
      </div>

      <!-- 名師核心公式速記表 -->
      <div style="margin-bottom:20px">
        <h3 style="margin:0 0 10px;font-size:16px;color:#1e3a8a;border-left:4px solid #2563eb;padding-left:8px">📐 本學期核心語法公式大公開</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <thead>
            <tr style="background:#eff6ff;color:#1e40af;text-align:left">
              <th style="padding:8px 12px;border:1px solid #bfdbfe;width:25%">單元模組</th>
              <th style="padding:8px 12px;border:1px solid #bfdbfe;width:40%">核心公式 / 語法規則</th>
              <th style="padding:8px 12px;border:1px solid #bfdbfe;width:35%">經典例句</th>
            </tr>
          </thead>
          <tbody>
            ${targetSem.units.flatMap(u => (u.concepts || []).map(c => `
              <tr>
                <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600">${u.unitNo}: ${c.title}</td>
                <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#047857;font-weight:700;font-family:monospace">${c.formula || '依規範結構展開'}</td>
                <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#334155" lang="en">${c.example || ''}</td>
              </tr>
            `)).slice(0, 10).join('')}
          </tbody>
        </table>
      </div>

      <!-- 核心語音字彙表 (帶音標) -->
      <div style="margin-bottom:20px">
        <h3 style="margin:0 0 10px;font-size:16px;color:#0f766e;border-left:4px solid #0d9488;padding-left:8px">🔤 必背核心字彙與音標</h3>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;font-size:12px">
          ${targetSem.units.flatMap(u => u.phonicsVocab || []).slice(0, 15).map(v => `
            <div style="background:#f0fdfa;border:1px solid #ccfbf1;padding:6px 10px;border-radius:6px">
              <strong lang="en">${v.word}</strong> <span style="font-family:monospace;color:#0f766e">${v.ipa}</span>
              <div style="color:#475569">${v.pos} ${v.zh}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 考場致命陷阱避雷指南 -->
      <div>
        <h3 style="margin:0 0 10px;font-size:16px;color:#9f1239;border-left:4px solid #e11d48;padding-left:8px">⚠️ 考場致命陷阱避雷清單</h3>
        <div style="display:grid;gap:8px">
          ${targetSem.units.flatMap(u => u.traps || []).slice(0, 4).map(t => `
            <div style="background:#fff1f2;border:1px solid #fecdd3;padding:10px 14px;border-radius:8px;font-size:12px">
              <span style="text-decoration:line-through;color:#e11d48">${t.wrong}</span> ➔ 
              <strong style="color:#047857">${t.correct}</strong>
              <div style="color:#881337;margin-top:2px">${t.reason}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. 考制核心課綱教學與單元教學
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function chapterPage() {
  return teachingChapter(openChapterId);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. 單字會話語音點讀館
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function studioPage() {
  const allVocab = UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units.flatMap(u => u.phonicsVocab || [])));
  const allDialogues = UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units.flatMap(u => u.dialogue || [])));

  return `
    <div class="header-block">
      <div class="pill">🎙️ 單字會話語音館</div>
      <h1 style="margin:8px 0">全情境音標單字點讀與會話語音互動館</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        收錄全 7 年級 150+ 核心單字標準 IPA 音標與對話語料，支援點讀發音、慢速播放與循序對話朗讀。
      </p>
    </div>

    <div class="card" style="margin-bottom:20px">
      <h3 style="margin:0 0 12px">🔤 核心單字點讀卡庫 (${allVocab.length} 個字詞)</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:10px">
        ${allVocab.slice(0, 48).map(v => `
          <div style="border:1px solid var(--line);border-radius:8px;padding:10px;background:#f8fafc;display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong style="color:#0f172a" lang="en">${v.word}</strong>
              <span style="font-family:monospace;font-size:11px;color:#2563eb;margin-left:4px">${v.ipa}</span>
              <div style="font-size:12px;color:#64748b">${v.pos} ${v.zh}</div>
            </div>
            <button class="btn small quiet" data-speak-word="${esc(v.word)}">🔊</button>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <h3 style="margin:0 0 12px">💬 情境雙語對話語料庫</h3>
      <div style="display:grid;gap:8px">
        ${allDialogues.slice(0, 20).map(d => `
          <div style="padding:10px 14px;border-radius:8px;background:#f1f5f9;display:flex;justify-content:space-between;align-items:center">
            <div>
              <strong style="color:#3730a3">${d.speaker}:</strong> <span lang="en">${d.en}</span>
              <div style="font-size:12px;color:#64748b;margin-top:2px">${d.zh}</div>
            </div>
            <button class="btn small quiet" data-speak-sentence="${esc(d.en)}">🔊 朗讀</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. 全考制模考題庫 (20,000 題旗艦題庫系統)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function examPage() {
  if (quizLoading) {
    return `
      <div class="header-block">
        <div class="pill">📑 國際檢定與國家大考全真模擬題庫</div>
        <h1 style="margin:8px 0">20,000 題全考制題庫測驗中心</h1>
      </div>
      <div class="card" style="text-align:center;padding:60px 24px;margin-top:20px">
        <div style="font-size:42px;animation:spin 1s linear infinite">⏳</div>
        <h2 style="margin:16px 0 8px">正在從 20,000 題題庫載入試題...</h2>
        <p style="color:var(--text-muted)">正在執行 Fisher-Yates 現代洗牌演算法與心理計量難度抽題校驗...</p>
      </div>
    `;
  }

  if (currentQuizQuestions.length > 0) {
    const q = currentQuizQuestions[currentQuizIdx];
    const totalQ = currentQuizQuestions.length;
    const answeredCount = Object.keys(userQuizAnswers).length;
    const userChoice = userQuizAnswers[q.id];
    const isAnswered = userChoice !== undefined;
    const isCorrect = isAnswered && userChoice === q.answer;
    const showHint = !!quizRevealedHints[q.id];
    const showExplain = !!quizRevealedExplains[q.id] || isAnswered;

    return `
      <div class="header-block" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <div class="pill">📑 模擬實戰測驗 (${CATEGORY_META[quizCategory]?.name || '綜合題庫'})</div>
          <h2 style="margin:6px 0">第 ${currentQuizIdx + 1} / ${totalQ} 題</h2>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:14px;color:var(--text-muted)">已作答: ${answeredCount}/${totalQ}</span>
          <button class="btn" data-exit-quiz="true" style="padding:6px 14px">✕ 結束並返回題庫</button>
        </div>
      </div>

      <div style="width:100%;height:6px;background:var(--line);border-radius:3px;margin:16px 0;overflow:hidden">
        <div style="width:${((currentQuizIdx + 1) / totalQ) * 100}%;height:100%;background:var(--green-core);transition:width 0.3s ease"></div>
      </div>

      <div class="card" style="margin-top:16px">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap">
          <span class="pill" style="font-size:12px">${esc(q.categoryLabel || q.category.toUpperCase())}</span>
          <span style="font-size:12px;color:var(--text-muted);background:var(--bg);padding:3px 8px;border-radius:6px;border:1px solid var(--line)">
            🎯 ${esc(q.subtopic || '綜合考點')}
          </span>
          <span style="font-size:12px;color:#d97706;background:#fef3c7;padding:3px 8px;border-radius:6px">
            IRT 難度: ⭐ ${q.difficulty}/5
          </span>
        </div>

        ${q.passage ? `
          <div style="background:#f8fafc;border-left:4px solid #3b82f6;padding:14px 16px;border-radius:0 8px 8px 0;margin-bottom:16px;font-size:14px;line-height:1.6;white-space:pre-line">
            ${esc(q.passage)}
          </div>
        ` : ''}

        <div style="font-size:17px;font-weight:600;line-height:1.6;margin-bottom:20px;color:var(--text)">
          ${esc(q.prompt)}
        </div>

        <div style="display:grid;gap:10px;margin-bottom:20px">
          ${q.options.map((opt, oIdx) => {
            const optLetter = String.fromCharCode(65 + oIdx);
            let optStyle = 'background:var(--bg);border:1px solid var(--line);color:var(--text);';
            let icon = '';

            if (isAnswered) {
              if (oIdx === q.answer) {
                optStyle = 'background:#ecfdf5;border:2px solid #10b981;color:#065f46;font-weight:600;';
                icon = ' ✅ 正確答案';
              } else if (oIdx === userChoice) {
                optStyle = 'background:#fef2f2;border:2px solid #ef4444;color:#991b1b;';
                icon = ' ❌ 您的選擇';
              } else {
                optStyle = 'opacity:0.6;border:1px solid var(--line);';
              }
            }

            return `
              <button class="btn" data-quiz-answer="${oIdx}" ${isAnswered ? 'disabled' : ''}
                style="text-align:left;padding:12px 16px;border-radius:10px;display:flex;align-items:center;justify-content:space-between;cursor:${isAnswered ? 'default' : 'pointer'};font-size:15px;line-height:1.4;${optStyle}">
                <div>
                  <strong style="margin-right:10px">${optLetter}.</strong>
                  <span>${esc(opt)}</span>
                </div>
                <span>${icon}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
          <button class="btn secondary" data-toggle-quiz-hint="${esc(q.id)}" style="font-size:13px;padding:6px 12px">
            💡 ${showHint ? '隱藏破題線索' : '查看思考引導提示'}
          </button>
          <button class="btn secondary" data-toggle-quiz-explain="${esc(q.id)}" style="font-size:13px;padding:6px 12px">
            📖 ${showExplain ? '隱藏完整考點剖析' : '展開專家教學詳解'}
          </button>
        </div>

        ${showHint ? `
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin-bottom:14px;font-size:14px;color:#92400e">
            <strong>💡 解題關鍵引導：</strong>${esc(q.hint)}
          </div>
        ` : ''}

        ${showExplain ? `
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px 16px;margin-bottom:14px;font-size:14px;color:#166534;line-height:1.6">
            <strong style="display:block;margin-bottom:4px">📖 專家考點精析與陷阱排除：</strong>
            ${esc(q.explain)}
          </div>
        ` : ''}

        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;border-top:1px solid var(--line);padding-top:16px">
          <button class="btn" data-prev-quiz-q="true" ${currentQuizIdx === 0 ? 'disabled' : ''}>
            ⬅ 上一題
          </button>
          <span style="font-size:13px;color:var(--text-muted)">
            第 ${currentQuizIdx + 1} 題 / 共 ${totalQ} 題
          </span>
          <button class="btn ${currentQuizIdx === totalQ - 1 ? 'secondary' : 'primary'}" data-next-quiz-q="true" ${currentQuizIdx === totalQ - 1 ? 'disabled' : ''}>
            下一題 ➡
          </button>
        </div>
      </div>
    `;
  }

  const tracksList = [
    { id: 'all', title: '全部考科綜合模擬', count: '20,000 題', icon: '🌐', desc: '跨會考、學測、統測、多益、SAT、GRE、GMAT、高考隨機抽題實戰。', color: '#2563eb' },
    { id: 'toeic', title: 'TOEIC 多益國際商務英語', count: '3,000 題', icon: '💼', desc: 'Part 5 詞性填空、Part 6 段落填空、Part 7 雙篇商務閱讀與行程信函。', color: '#d97706' },
    { id: 'sat', title: 'Digital SAT 數位學術測驗', count: '3,000 題', icon: '🎓', desc: 'Craft & Structure, Information & Ideas, Standard English, Rhetorical Synthesis。', color: '#4f46e5' },
    { id: 'gre', title: 'GRE 研究所入學考試 Verbal', count: '3,000 題', icon: '🏛️', desc: 'Text Completion 單雙三空、Sentence Equivalence 雙生同義詞、學術主旨閱讀。', color: '#e11d48' },
    { id: 'gmat', title: 'GMAT Focus 批判推理與商業邏輯', count: '3,000 題', icon: '📊', desc: 'Weaken/Strengthen, Assumption 否定測試, Evaluate, Boldface, 商業經濟閱讀。', color: '#0891b2' },
    { id: 'gaokao', title: '歷年高考與大考真題庫', count: '6,000 題', icon: '📜', desc: '歷年新高考I/II卷、全國甲/乙卷、北京、上海、浙江卷及台灣學測指考真題。', color: '#059669' },
    { id: 'shs', title: '高中大學學測與統測英文', count: '1,000 題', icon: '🏫', desc: '高中 7,000 必背字彙、克漏字篇章結構、閱讀理解與歷屆學測考題。', color: '#9333ea' },
    { id: 'jhs', title: '國中教育會考英語能力線', count: '1,000 題', icon: '🎒', desc: '1,200 基礎文法時態、生活情境對話、資訊圖表與會考衝刺精選題。', color: '#16a34a' }
  ];

  return `
    <div class="header-block">
      <div class="pill">📑 國際檢定與國家大考模擬測驗庫</div>
      <h1 style="margin:8px 0">20,000 題全考制題庫測驗中心</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        已整合 TOEIC (3,000題)、Digital SAT (3,000題)、GRE (3,000題)、GMAT (3,000題)、歷年高考真題 (6,000題)、高中學測與國中會考！
      </p>
    </div>

    <div class="card" style="margin-top:20px">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:20px;flex-wrap:wrap">
        <label><strong>選擇考制進行抽題測驗：</strong></label>
        <select id="exam-cat-select" style="padding:10px 14px;border-radius:8px;border:1px solid var(--line);font-size:15px;background:var(--bg)">
          ${tracksList.map(t => `
            <option value="${t.id}" ${quizCategory === t.id ? 'selected' : ''}>${t.icon} ${t.title} (${t.count})</option>
          `).join('')}
        </select>
        <button class="btn primary" data-start-quiz="true" style="padding:10px 22px;font-size:15px">🚀 開始 20 題隨選模考</button>
      </div>
      <p style="font-size:13px;color:var(--text-muted);margin:0">
        💡 支援 IndexedDB 本地極速快取、Fisher-Yates 現代隨機抽題與答題即時加分 (+15 XP) 機制。
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-top:20px">
      ${tracksList.map(t => `
        <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid ${t.color}">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:28px">${t.icon}</span>
              <span class="pill" style="font-size:12px;font-weight:700;color:${t.color}">${t.count}</span>
            </div>
            <h3 style="margin:4px 0 8px;font-size:16px">${t.title}</h3>
            <p style="font-size:13px;color:var(--text-muted);line-height:1.5;margin:0 0 16px">${t.desc}</p>
          </div>
          <button class="btn secondary" data-start-quiz="true" data-quiz-cat="${t.id}" style="width:100%;font-size:14px;padding:8px">
            🎯 抽取 20 題練習
          </button>
        </div>
      `).join('')}
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
        <div style="font-size:13px;color:var(--text-muted);margin-top:4px">⭐ 已精熟單元 (共 61 單元)</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:32px;font-weight:800;color:#f59e0b">${summary.streak} 天</div>
        <div style="font-size:13px;color:var(--text-muted);margin-top:4px">🔥 連續學習天數</div>
      </div>
    </div>

    <div class="card">
      <h3 style="margin:0 0 14px">🏅 12 枚核心素養徽章解鎖狀態</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));gap:12px">
        ${JUNYI_BADGES.map(b => {
          const unlocked = junyi.data.earnedBadges.includes(b.id);
          return `
            <div style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;background:${unlocked ? '#ecfdf5' : '#f8fafc'};border:1px solid ${unlocked ? '#a7f3d0' : '#e2e8f0'}">
              <span style="font-size:28px">${b.icon}</span>
              <div>
                <strong style="color:${unlocked ? '#047857' : '#64748b'}">${b.title}</strong>
                <div style="font-size:12px;color:#94a3b8;margin-top:2px">${b.desc}</div>
                <div style="font-size:11px;color:${unlocked ? '#10b981' : '#cbd5e1'};margin-top:2px">
                  ${unlocked ? '✨ 已解鎖' : `需達到 ${b.reqXp} XP`}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
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

  const examCatSelect = document.querySelector('#exam-cat-select');
  if (examCatSelect) {
    examCatSelect.addEventListener('change', e => {
      quizCategory = e.target.value;
    });
  }
}

// 監聽全局點擊事件
root.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const d = b.dataset;
  if (handleLessonClick(b, render)) return;

  // 專家資訊收合開關
  if (d.toggleExpert) {
    showExpertDetails = !showExpertDetails;
    render();
    return;
  }

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
      if (g.semesters[0].units.length > 0) {
        activeUnitId = g.semesters[0].units[0].id;
      }
    }
    render();
    return;
  }

  // 108 課綱學期切換
  if (d.selectSem) {
    activeSemId = d.selectSem;
    const g = UNIFIED_GRADES.find(item => item.gradeId === activeGradeId);
    if (g) {
      const s = g.semesters.find(item => item.semId === activeSemId);
      if (s && s.units.length > 0) {
        activeUnitId = s.units[0].id;
      }
    }
    render();
    return;
  }

  // 開啟均一微課單元
  if (d.openJunyiUnit) {
    activeUnitId = d.openJunyiUnit;
    navigate('junyi');
    return;
  }

  // 形成性測驗作答
  if (d.quizUnit && d.quizChoice !== undefined) {
    const unitId = d.quizUnit;
    const choice = Number(d.quizChoice);
    const ans = Number(d.quizAns);
    userQuizChoices[unitId] = choice;
    const isCorrect = choice === ans;
    if (isCorrect) {
      junyi.recordUnitAttempt(unitId, true);
    } else {
      junyi.recordUnitAttempt(unitId, false);
    }
    render();
    return;
  }

  // 展開提示
  if (d.revealHintUnit) {
    const unitId = d.revealHintUnit;
    const tier = d.hintTier;
    if (!revealedHints[unitId]) revealedHints[unitId] = [];
    if (tier === 'all') {
      revealedHints[unitId] = [1, 2, 'all'];
    } else {
      const numTier = Number(tier);
      if (!revealedHints[unitId].includes(numTier)) {
        revealedHints[unitId].push(numTier);
      }
    }
    render();
    return;
  }

  // 收合/展開詳解
  if (d.toggleSolutionUnit) {
    const unitId = d.toggleSolutionUnit;
    revealedSolutions[unitId] = !revealedSolutions[unitId];
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
      alert('🎉 恭喜回答正確！獲得 +30 經驗值 (XP)！');
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

  // 20,000 題旗艦模考題庫測驗互動
  if (d.startQuiz) {
    if (d.quizCat) quizCategory = d.quizCat;
    quizLoading = true;
    render();
    questionDB.sampleQuestions(quizCategory, 20).then(qs => {
      currentQuizQuestions = qs;
      currentQuizIdx = 0;
      userQuizAnswers = {};
      quizRevealedHints = {};
      quizRevealedExplains = {};
      quizSubmitted = false;
      quizLoading = false;
      render();
    }).catch(err => {
      console.error(err);
      quizLoading = false;
      alert('載入題庫失敗，請確認網路連線');
      render();
    });
    return;
  }

  if (d.quizAnswer !== undefined) {
    const q = currentQuizQuestions[currentQuizIdx];
    if (q && userQuizAnswers[q.id] === undefined) {
      const choice = Number(d.quizAnswer);
      userQuizAnswers[q.id] = choice;
      if (choice === q.answer) {
        junyi.addXp(15);
      }
      render();
    }
    return;
  }

  if (d.toggleQuizHint) {
    const qid = d.toggleQuizHint;
    quizRevealedHints[qid] = !quizRevealedHints[qid];
    render();
    return;
  }

  if (d.toggleQuizExplain) {
    const qid = d.toggleQuizExplain;
    quizRevealedExplains[qid] = !quizRevealedExplains[qid];
    render();
    return;
  }

  if (d.nextQuizQ) {
    if (currentQuizIdx < currentQuizQuestions.length - 1) {
      currentQuizIdx++;
      render();
    }
    return;
  }

  if (d.prevQuizQ) {
    if (currentQuizIdx > 0) {
      currentQuizIdx--;
      render();
    }
    return;
  }

  if (d.exitQuiz) {
    currentQuizQuestions = [];
    userQuizAnswers = {};
    render();
    return;
  }

  // 連續播放整組情境生活會話
  if (d.playDialogue) {
    const unitId = d.playDialogue;
    let targetUnit = null;
    for (const g of UNIFIED_GRADES) {
      for (const s of g.semesters) {
        for (const u of s.units) {
          if (u.id === unitId) {
            targetUnit = u;
            break;
          }
        }
        if (targetUnit) break;
      }
      if (targetUnit) break;
    }

    if (targetUnit && targetUnit.dialogue && targetUnit.dialogue.length > 0) {
      const items = targetUnit.dialogue.map(d => ({ text: d.en, slow: false }));
      playSequence(items, (idx) => {
        activePlayingDialogueIndex = idx;
        render();
      }, () => {
        activePlayingDialogueIndex = -1;
        render();
      });
    }
    return;
  }

  // 停止所有音訊播放
  if (d.stopAudio) {
    stopAudio();
    activePlayingDialogueIndex = -1;
    render();
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
    const slow = d.slow === 'true';
    playSentence(d.speakSentence, slow, {
      onStart: () => b.classList.add('active'),
      onEnd: () => b.classList.remove('active'),
      onError: () => b.classList.remove('active')
    });
    return;
  }
});

root.addEventListener('input', e => handleLessonInput(e.target));

// 初始化啟動渲染
render();
