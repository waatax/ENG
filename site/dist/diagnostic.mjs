import { renderLevelEstimate } from './level_estimate.mjs';
// diagnostic.mjs - 30 題全階英語能力程度練習檢核系統 (小學至GRE/GMAT)
// 由 7 位跨領域專家共同研發，嚴格對標 CEFR Pre-A1 至 進階題型
// 配備：自適應階梯抽樣、五維雷達圖、失速臨界點 (Stall Point) 判定、每一題名師黃金五維詳解與微課轉化直通車

import { questionDB } from './question_db.mjs';

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

// 診斷系統內部狀態
let diagMode = 'intro'; // 'intro' | 'testing' | 'report'
export const DIAGNOSTIC_LEVELS = [
  { id: 1, name: '國小基礎', cefr: 'Pre-A1–A1' },
  { id: 2, name: '國中基礎', cefr: 'A1–A2' },
  { id: 3, name: '國中進階／會考', cefr: 'A2–B1' },
  { id: 4, name: '高中／學測', cefr: 'B1–B2' },
  { id: 5, name: 'TOEIC 多益', cefr: 'B2' },
  { id: 6, name: 'Digital SAT', cefr: 'C1' },
  { id: 7, name: 'GRE', cefr: 'C2' },
  { id: 8, name: 'GMAT', cefr: '進階挑戰' }
];
let diagSelectedTier = null;
let diagSessionTier = null;
const levelName = tier => DIAGNOSTIC_LEVELS.find(level => level.id === tier)?.name || '全階綜合';
function renderLevelSelector() {
  return `<section class="card"><h2>選擇測驗程度</h2><p>指定程度：可選 10 題極速 (8分) 或 20 題標準 (15分)。若想了解跨程度表現，可選全階綜合。</p>
    <div class="diag-level-grid" role="group" aria-label="測驗程度">
      ${[{id: null, name: '全階綜合', cefr: '10／20／30／40 題'}, ...DIAGNOSTIC_LEVELS].map(level => `<button class="btn ${diagSelectedTier === level.id ? 'primary' : 'quiet'}" data-diag-tier="${level.id ?? 'all'}" aria-pressed="${diagSelectedTier === level.id}"><strong>${level.name}</strong><span>${level.cefr}</span></button>`).join('')}
    </div></section>`;
}
let diagQuestionCount = 30; // 10 | 20 | 30 | 40
let diagQuestions = [];
let diagCurrentIdx = 0;
let diagUserAnswers = {}; // q.id -> optionIndex (0..3)
let diagTimerSeconds = 25 * 60; // 預設 25 分鐘
let diagTimerInterval = null;
let diagTimerPaused = false;
let diagEvaluation = null;
let diagFilterView = 'all'; // 'all' | 'wrong' | 'correct'
let diagLoading = false;
let diagConfirmSubmit = false;
let diagExpandedExplains = {}; // q.id -> boolean

// 讀取歷史報告
let diagHistory = [];
try {
  diagHistory = JSON.parse(localStorage.getItem('eq_diag_history') || '[]');
} catch {
  diagHistory = [];
}

// 計時器管理
function startTimer(renderCallback) {
  if (diagTimerInterval) clearInterval(diagTimerInterval);
  diagTimerInterval = setInterval(() => {
    if (!diagTimerPaused && diagTimerSeconds > 0) {
      diagTimerSeconds--;
      const el = document.querySelector('#diag-timer-display');
      if (el) {
        const m = Math.floor(diagTimerSeconds / 60);
        const s = diagTimerSeconds % 60;
        el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        if (diagTimerSeconds <= 180) {
          el.style.color = '#ef4444';
          el.style.fontWeight = 'bold';
        }
      }
      if (diagTimerSeconds === 0) {
        clearInterval(diagTimerInterval);
        diagTimerInterval = null;
        alert('⏱️ 作答時間結束！系統將立即為您計算全維度程度診斷報告！');
        finishDiagnostic(renderCallback);
      }
    }
  }, 1000);
  if (diagTimerInterval && typeof diagTimerInterval.unref === 'function') {
    diagTimerInterval.unref();
  }
}

function stopTimer() {
  if (diagTimerInterval) {
    clearInterval(diagTimerInterval);
    diagTimerInterval = null;
  }
}

// 完成測驗交卷評估
function finishDiagnostic(renderCallback) {
  stopTimer();
  diagEvaluation = questionDB.evaluateDiagnostic(diagUserAnswers, diagQuestions);
  diagMode = 'report';
  
  // 保存歷史紀錄
  try {
    const summaryRecord = {
      date: new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      mode: diagSessionTier === null ? 'all' : 'targeted',
      tier: diagSessionTier,
      total: diagQuestions.length,
      scaledScore: diagSessionTier === null ? diagEvaluation.scaledScore : Math.round(diagEvaluation.rawCorrect / diagQuestions.length * 100),
      rawCorrect: diagEvaluation.rawCorrect,
      cefr: diagSessionTier === null ? diagEvaluation.cefr : levelName(diagSessionTier),
      badge: diagSessionTier === null ? diagEvaluation.honoraryBadge.title : '指定程度練習',
      stallTier: diagSessionTier === null ? diagEvaluation.stallTierLabel : levelName(diagSessionTier)
    };
    diagHistory.unshift(summaryRecord);
    if (diagHistory.length > 10) diagHistory.pop();
    localStorage.setItem('eq_diag_history', JSON.stringify(diagHistory));
  } catch (err) {
    console.warn('Failed to save diag history', err);
  }

  if (typeof renderCallback === 'function') {
    renderCallback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 主渲染函數
export function diagnosticPage() {
  if (diagLoading) {
    return `
      <div class="header-block">
        <div class="pill">🎯 全階英語能力練習檢核系統</div>
        <h1 style="margin:8px 0">正在為您抽取專屬分層階梯試卷...</h1>
      </div>
      <div class="card" style="text-align:center;padding:70px 24px;margin-top:20px">
        <div style="font-size:48px;animation:spin 1s linear infinite">⏳</div>
        <h2 style="margin:16px 0 8px">正在從本站練習題庫進行分層抽題...</h2>
        <p style="color:var(--text-muted);max-width:550px;margin:0 auto">
          ${diagSessionTier === null ? '按 8 大階梯分層' : '只從「' + levelName(diagSessionTier) + '」程度'}隨機抽取 ${diagQuestionCount || 30} 題，供自學練習使用…
        </p>
      </div>
    `;
  }

  if (diagMode === 'testing') {
    return renderTestingView();
  } else if (diagMode === 'report') {
    return renderReportView();
  }
  return renderIntroView();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. 引導前導頁 (Intro View)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderIntroView() {
  if (diagSelectedTier !== null) return `
    <div class="header-block"><h1>指定程度 · ${diagQuestionCount === 10 ? '10' : '20'} 題測驗</h1><p>選好程度再開始，完成後可查看成績、錯題與逐題解析。</p></div>
    ${renderLevelSelector()}
    <section class="card"><h2>本次測驗：${levelName(diagSelectedTier)}</h2><p>${diagQuestionCount === 10 ? '10 題選擇題 · 8 分鐘 · 每題 10 分' : '20 題選擇題 · 15 分鐘 · 每題 5 分'} · 未作答以錯題計算</p><p>可跳題、修改答案與暫停計時；交卷後提供解析。同程度重測會優先抽取近期未作答的題目。</p>
    <div style="display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <button class="btn ${diagQuestionCount === 10 ? 'primary' : 'quiet'}" data-diag-select-count="10">⚡ 10 題極速快測 (8分)</button>
      <button class="btn ${diagQuestionCount === 20 ? 'primary' : 'quiet'}" data-diag-select-count="20">🎯 20 題標準測驗 (15分)</button>
    </div>
    <button class="btn primary" data-start-diag="${diagQuestionCount}">開始「${levelName(diagSelectedTier)}」${diagQuestionCount} 題測驗</button></section>`;
  const latestHistory = diagHistory[0];
  const tierQuotasDisplay = diagQuestionCount === 10
    ? { 1: 1, 2: 1, 3: 1, 4: 2, 5: 2, 6: 1, 7: 1, 8: 1 }
    : diagQuestionCount === 20
    ? { 1: 2, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 2, 8: 1 }
    : diagQuestionCount === 40
    ? { 1: 5, 2: 5, 3: 5, 4: 6, 5: 5, 6: 5, 7: 5, 8: 4 }
    : { 1: 4, 2: 4, 3: 4, 4: 5, 5: 4, 6: 4, 7: 3, 8: 2 };

  const durationMin = diagQuestionCount === 10 ? 8 : diagQuestionCount === 20 ? 15 : diagQuestionCount === 40 ? 35 : 25;

  return `
    <div class="header-block">
      <div class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700">🎯 英文程度測試 · 跨考制全階能力錨定 · 專家委員會 7 次迭代升級</div>
      <h1 style="margin:8px 0;font-size:28px">🎯 英文程度檢定</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px;line-height:1.6">
        提供 10 題極速快測、20 題快速檢定、30 題標準檢定與 40 題深度精準檢定。完成後檢查每題答案與解析，定位失速臨界點並獲取專屬補強微課。
      </p>
    </div>

    <aside class="card"><h2>預測英文程度，找到學習起點</h2><p>完成作答後，查看閱讀／文法程度、CEFR 參考區間與各考試參考落點，再按弱項選擇教材。預測使用本站規則，尚未經正式成績配對校準。</p></aside>

    ${renderLevelSelector()}
    <!-- 檢定題數選項 (10 題極速 / 20 題快速 / 30 題標準 / 40 題深度精準) -->
    <div class="card" style="margin-bottom:24px;border:2px solid var(--blue-border);background:var(--card-bg)">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
        <div>
          <h2 style="margin:0;font-size:18px;color:var(--text-primary);display:flex;align-items:center;gap:8px">
            <span>⚙️ 選擇檢定題數與測驗長度 (Question Count & Test Mode)</span>
          </h2>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px">
            支援 10 題極速、20 題快速、30 題標準與 40 題深度精準檢定，自由切換滿足不同衝刺與診斷需求：
          </div>
        </div>
        <div class="pill" style="background:#4338ca;color:#fff;font-weight:700">目前選擇：${diagQuestionCount} 題 (${durationMin} 分鐘)</div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px">
        <!-- 10 題 -->
        <button class="btn ${diagQuestionCount === 10 ? 'primary' : 'quiet'}" data-diag-select-count="10"
          style="text-align:left;padding:16px 18px;border-radius:12px;border:${diagQuestionCount === 10 ? '2px solid var(--green-core)' : '1px solid var(--line)'};background:${diagQuestionCount === 10 ? 'var(--mint-light)' : 'var(--card-bg)'};box-shadow:${diagQuestionCount === 10 ? '0 4px 12px rgba(4,120,87,0.15)' : 'none'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <strong style="font-size:16px;color:var(--text-primary)">⚡ 10 題 · 極速快測</strong>
            <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e;font-weight:700">新登場 · 約 8 分鐘</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.5">
            零碎時間首選！每階 1~2 題迅速摸底，超高效率掃描個人實力分布。
          </div>
        </button>

        <!-- 20 題 -->
        <button class="btn ${diagQuestionCount === 20 ? 'primary' : 'quiet'}" data-diag-select-count="20"
          style="text-align:left;padding:16px 18px;border-radius:12px;border:${diagQuestionCount === 20 ? '2px solid var(--green-core)' : '1px solid var(--line)'};background:${diagQuestionCount === 20 ? 'var(--mint-light)' : 'var(--card-bg)'};box-shadow:${diagQuestionCount === 20 ? '0 4px 12px rgba(4,120,87,0.15)' : 'none'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <strong style="font-size:16px;color:var(--text-primary)">⚡ 20 題 · 快速檢定</strong>
            <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">約 15 分鐘</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.5">
            適合通勤、課間或考前快速自測，快速掌握全階能力輪廓與當前落點區間。
          </div>
        </button>

        <!-- 30 題 (標準) -->
        <button class="btn ${diagQuestionCount === 30 ? 'primary' : 'quiet'}" data-diag-select-count="30"
          style="text-align:left;padding:16px 18px;border-radius:12px;border:${diagQuestionCount === 30 ? '2px solid var(--green-core)' : '1px solid var(--line)'};background:${diagQuestionCount === 30 ? 'var(--mint-light)' : 'var(--card-bg)'};box-shadow:${diagQuestionCount === 30 ? '0 4px 12px rgba(4,120,87,0.15)' : 'none'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <strong style="font-size:16px;color:var(--text-primary)">🎯 30 題 · 標準檢定</strong>
            <span class="pill" style="font-size:11px;background:#10b981;color:#fff;font-weight:700">推薦 · 約 25 分鐘</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.5">
            經典 8 階梯天梯平衡抽樣，精確鎖定失速臨界點 (Stall Point) 與 CEFR 等級錨定。
          </div>
        </button>

        <!-- 40 題 -->
        <button class="btn ${diagQuestionCount === 40 ? 'primary' : 'quiet'}" data-diag-select-count="40"
          style="text-align:left;padding:16px 18px;border-radius:12px;border:${diagQuestionCount === 40 ? '2px solid var(--green-core)' : '1px solid var(--line)'};background:${diagQuestionCount === 40 ? 'var(--mint-light)' : 'var(--card-bg)'};box-shadow:${diagQuestionCount === 40 ? '0 4px 12px rgba(4,120,87,0.15)' : 'none'}">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <strong style="font-size:16px;color:var(--text-primary)">🔬 40 題 · 深度精準檢定</strong>
            <span class="pill" style="font-size:11px;background:#fae8ff;color:#86198f">約 35 分鐘</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.5">
            全維度最大樣本抽樣，深入探查 GRE 邏輯語意、GMAT 批判推理與學術篇章精細盲點。
          </div>
        </button>
      </div>
    </div>

    <!-- 上次作答快速回顧 (若有) -->
    ${latestHistory ? `
      <div class="card" style="border:2px solid #a7f3d0;background:#f0fdf4;margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
          <div>
            <span class="pill" style="background:#10b981;color:#fff;font-size:12px">📋 最近一次測驗紀錄</span>
            <div style="font-size:16px;font-weight:700;color:#065f46;margin-top:6px">
              上次作答紀錄
            </div>
            <div style="font-size:13px;color:#047857;margin-top:2px">
              本站加權練習分數：<strong>${latestHistory.scaledScore} / 100 分</strong> (答對 ${latestHistory.rawCorrect} 題) · 測驗時間：${latestHistory.date} · 建議回顧：${esc(latestHistory.stallTier)}
            </div>
          </div>
          <div style="display:flex;gap:10px">
            <button class="btn secondary" data-view-last-report="true" style="font-size:14px;padding:8px 16px">
              📄 查看完整診斷報告
            </button>
            <button class="btn primary" data-start-diag="true" data-diag-count="${diagQuestionCount}" style="font-size:14px;padding:8px 18px">
              🔄 抽取全新 ${diagQuestionCount} 題再次挑戰
            </button>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- 8 大難度階梯與考制對標天梯 -->
    <div class="card" style="margin-bottom:24px">
      <h3 style="margin:0 0 16px;display:flex;align-items:center;gap:8px">
        <span>🪜 ${diagQuestionCount} 題全階難度天梯與題數配比 (8-Tier Ladder Architecture)</span>
      </h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px">
        <div style="border:1px solid var(--line);border-left:4px solid #10b981;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#047857">Tier 1: 國小基礎生活英語</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[1]} 題 (Pre-A1~A1)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">be動詞、名詞單複數、自然發音、日常時間與生活對話</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #059669;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#059669">Tier 2: 國中會考基礎實踐</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[2]} 題 (A1~A2)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">過去簡單式、未來式、頻率副詞、比較級、情境會話</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #0284c7;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#0284c7">Tier 3: 國中會考精熟躍升</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[3]} 題 (A2~B1)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">現在完成式、被動語態、感官使役動詞、關係代名詞</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #6366f1;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#4f46e5">Tier 4: 高中學測核心素養</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[4]} 題 (B1~B2)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">分詞構句、倒裝句、複合關係代名詞、篇章結構與高級詞彙</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #d97706;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#d97706">Tier 5: TOEIC 國際商務實戰</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[5]} 題 (B2)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Part 5 詞性辨析、商務書信、行程合約、職場語法一致性</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #8b5cf6;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#7c3aed">Tier 6: Digital SAT 學術思維</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[6]} 題 (B2~C1)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Words in Context 語境詞義、學術長難句、論點支撐與修辭</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #e11d48;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#e11d48">Tier 7: GRE Verbal 語意邏輯</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[7]} 題 (C1~C2)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">語意極性、反向對稱、雙重填空、哲學社科精微論述</div>
        </div>
        <div style="border:1px solid var(--line);border-left:4px solid #0891b2;padding:12px 14px;border-radius:8px;background:var(--paper)">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <strong style="color:#0891b2">Tier 8: GMAT Focus 批判推理</strong>
            <span class="pill" style="font-size:11px">${tierQuotasDisplay[8]} 題 (C2/進階題型)</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:4px">Assumption 否定測試法、Weaken/Strengthen 商業決策論證</div>
        </div>
      </div>
      <div style="text-align:right;margin-top:10px;font-size:12px;color:var(--text-muted)">
        合計：${tierQuotasDisplay[1]} + ${tierQuotasDisplay[2]} + ${tierQuotasDisplay[3]} + ${tierQuotasDisplay[4]} + ${tierQuotasDisplay[5]} + ${tierQuotasDisplay[6]} + ${tierQuotasDisplay[7]} + ${tierQuotasDisplay[8]} = <strong>預計抽取 ${diagQuestionCount} 題</strong>
      </div>
    </div>

    <!-- 測驗四大核心保證 -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:16px;margin-bottom:28px">
      <div class="card" style="text-align:center">
        <div style="font-size:32px">⚡</div>
        <h4 style="margin:8px 0 4px">預留約 ${durationMin} 分鐘</h4>
        <p style="font-size:13px;color:var(--text-muted);margin:0">練習不同主題的題目，找出需要回顧的觀念。</p>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:32px">🎯</div>
        <h4 style="margin:8px 0 4px">選擇複習主題</h4>
        <p style="font-size:13px;color:var(--text-muted);margin:0">找出這次需要回顧的題型。</p>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:32px">📖</div>
        <h4 style="margin:8px 0 4px">逐題解析與訂正</h4>
        <p style="font-size:13px;color:var(--text-muted);margin:0">公布成績後，每題均附雙語精譯、考點公式、生詞與致命陷阱剖析。</p>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:32px">🚀</div>
        <h4 style="margin:8px 0 4px">一鍵直達補強微課</h4>
        <p style="font-size:13px;color:var(--text-muted);margin:0">依據答錯考點，直接鏈接 English Quest 對應課綱單元精讀。</p>
      </div>
    </div>

    <!-- 開始測驗按鈕 -->
    <div class="card" style="text-align:center;padding:36px 20px;background:linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);border:2px dashed #94a3b8">
      <h2 style="margin:0 0 10px;font-size:22px">準備開始這次檢定了嗎？</h2>
      <p style="color:var(--text-muted);max-width:540px;margin:0 auto 20px;font-size:14px">
        點擊下方按鈕將從 本站練習題庫隨機抽取 ${diagQuestionCount} 道題目，計時 ${durationMin} 分鐘。答題過程可隨時跳題、修改選擇。
      </p>
      <button class="btn primary" data-start-diag="true" data-diag-count="${diagQuestionCount}" style="padding:14px 42px;font-size:17px;font-weight:700;border-radius:12px;box-shadow:0 6px 18px rgba(4,120,87,0.3)">
        🚀 立即開始 ${diagQuestionCount} 題分層檢定
      </button>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:16px">
        <span style="font-size:13px;color:#64748b;align-self:center">或直接選擇題數開始：</span>
        <button class="btn ${diagQuestionCount === 10 ? 'secondary' : 'quiet'}" data-start-diag="10" style="font-size:13px;padding:6px 14px">⚡ 10 題極速 (8分)</button>
        <button class="btn ${diagQuestionCount === 20 ? 'secondary' : 'quiet'}" data-start-diag="20" style="font-size:13px;padding:6px 14px">⚡ 20 題快速 (15分)</button>
        <button class="btn ${diagQuestionCount === 30 ? 'secondary' : 'quiet'}" data-start-diag="30" style="font-size:13px;padding:6px 14px">🎯 30 題標準 (25分)</button>
        <button class="btn ${diagQuestionCount === 40 ? 'secondary' : 'quiet'}" data-start-diag="40" style="font-size:13px;padding:6px 14px">🔬 40 題深度 (35分)</button>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. 測驗進行中介面 (Testing View)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderTestingView() {
  if (!diagQuestions || !diagQuestions.length) {
    return `<div class="card">載入題目中...</div>`;
  }

  const q = diagQuestions[diagCurrentIdx];
  const totalQ = diagQuestions.length; // 30
  const answeredCount = Object.keys(diagUserAnswers).length;
  const userChoice = diagUserAnswers[q.id];
  const isAnswered = userChoice !== undefined;

  const m = Math.floor(diagTimerSeconds / 60);
  const s = diagTimerSeconds % 60;
  const timeStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  return `
    <div class="header-block" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:4px">
          <span class="pill" style="font-weight:700;background:#091e32;color:#34d399">🎯 ${levelName(diagSessionTier)} · ${totalQ} 題</span>
          <span class="pill" style="background:#e0e7ff;color:#3730a3;font-size:12px">${esc(q.tierLabel)}</span>
          <span style="font-size:12px;color:var(--text-muted);background:var(--paper);padding:3px 8px;border-radius:6px;border:1px solid var(--line)">
            維度：${esc(q.dimension)}
          </span>
        </div>
        <h2 style="margin:2px 0">第 ${diagCurrentIdx + 1} / ${totalQ} 題 · ${esc(q.subtopic)}</h2>
      </div>

      <div style="display:flex;gap:12px;align-items:center">
        <div style="background:#fef3c7;border:1px solid #fde68a;padding:6px 14px;border-radius:8px;display:flex;align-items:center;gap:6px">
          <span>⏱️</span>
          <strong id="diag-timer-display" style="font-size:16px;color:#92400e;font-family:monospace">${timeStr}</strong>
          <button class="btn secondary" data-toggle-diag-timer="true" style="padding:2px 6px;font-size:11px;margin-left:4px">
            ${diagTimerPaused ? '▶ 繼續' : '⏸ 暫停'}
          </button>
        </div>
        <button class="btn secondary" data-exit-diag="true" style="padding:6px 12px;font-size:13px">
          ✕ 暫存離開
        </button>
      </div>
    </div>

    <!-- 進度條 -->
    <div style="width:100%;height:8px;background:var(--line);border-radius:4px;margin:14px 0;overflow:hidden">
      <div style="width:${((diagCurrentIdx + 1) / totalQ) * 100}%;height:100%;background:linear-gradient(90deg, #10b981 0%, #34d399 100%);transition:width 0.3s ease"></div>
    </div>

    <!-- 題目主卡片 -->
    <div class="card" style="margin-top:16px;border-top:4px solid #10b981">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <span style="font-size:13px;color:var(--text-muted)">
          目標考科：<strong>${esc(q.targetExam)}</strong> · CEFR 級距：<strong>${esc(q.cefr)}</strong> · 難度：⭐ ${q.difficulty}/5
        </span>
        <span style="font-size:13px;color:${isAnswered ? '#059669' : '#d97706'}">
          ${isAnswered ? '● 本題已選擇' : '○ 尚未作答'}
        </span>
      </div>

      ${q.passage ? `
        <div style="background:#f8fafc;border-left:5px solid #3b82f6;padding:18px 22px;border-radius:0 10px 10px 0;margin-bottom:20px;font-size:15px;line-height:1.8;white-space:pre-line;color:#1e293b">
          ${esc(q.passage)}
        </div>
      ` : ''}

      <div style="font-size:21px;font-weight:700;line-height:1.6;margin-bottom:26px;color:#0f172a;letter-spacing:-0.2px">
        ${esc(q.prompt)}
      </div>

      <!-- 四個選項卡片 (4K/高解析度優化超大觸控與清晰點選區) -->
      <div style="display:grid;gap:14px;margin-bottom:26px">
        ${q.options.map((opt, oIdx) => {
          const optLetter = String.fromCharCode(65 + oIdx);
          const isSelected = userChoice === oIdx;
          const optStyle = isSelected
            ? 'background:#ecfdf5;border:2px solid #10b981;color:#065f46;font-weight:700;box-shadow:0 3px 12px rgba(16,185,129,0.2);transform:scale(1.005);'
            : 'background:var(--paper);border:1px solid var(--line);color:var(--text-primary);';

          return `
            <button class="btn diag-option-btn" data-diag-choice="${oIdx}"
              style="text-align:left;padding:16px 22px;border-radius:12px;display:flex;align-items:center;justify-content:space-between;font-size:16px;line-height:1.5;transition:all 0.18s ease;${optStyle}">
              <div>
                <strong style="margin-right:14px;display:inline-block;width:24px;font-size:17px;color:${isSelected ? '#047857' : '#64748b'}">${optLetter}.</strong>
                <span>${esc(opt)}</span>
              </div>
              <span style="font-weight:700;color:#047857">${isSelected ? '✔ 已選擇' : ''}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- 上下題控制工具列 -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;border-top:1px solid var(--line);padding-top:16px;flex-wrap:wrap;gap:10px">
        <button class="btn" data-diag-prev="true" ${diagCurrentIdx === 0 ? 'disabled' : ''}>
          ⬅ 上一題
        </button>
        <span style="font-size:14px;color:var(--text-muted)">
          已作答: <strong>${answeredCount}</strong> / ${totalQ} 題
        </span>
        <button class="btn ${diagCurrentIdx === totalQ - 1 ? 'secondary' : 'primary'}" data-diag-next="true">
          ${diagCurrentIdx === totalQ - 1 ? '檢視填答卡 ➔' : '下一題 ➡'}
        </button>
      </div>
    </div>

    <!-- 30 題即時題號矩陣卡 -->
    <div class="card" style="margin-top:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h4 style="margin:0;font-size:14px;color:var(--text-muted)">📝 ${diagQuestions.length} 題作答導航卡 (點選可直接跳題)</h4>
        <div style="font-size:12px;display:flex;gap:12px">
          <span><span style="display:inline-block;width:10px;height:10px;background:#10b981;border-radius:2px"></span> 已答</span>
          <span><span style="display:inline-block;width:10px;height:10px;background:#e2e8f0;border-radius:2px"></span> 未答</span>
          <span><span style="display:inline-block;width:10px;height:10px;border:2px solid #2563eb;border-radius:2px"></span> 當前題</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(46px, 1fr));gap:8px">
        ${diagQuestions.map((ques, idx) => {
          const ans = diagUserAnswers[ques.id];
          const answered = ans !== undefined;
          const isCur = idx === diagCurrentIdx;
          let bg = answered ? '#10b981' : '#f1f5f9';
          let color = answered ? '#fff' : '#334155';
          let border = isCur ? '2.5px solid #2563eb' : '1px solid #cbd5e1';
          return `
            <button class="btn" data-diag-jump="${idx}"
              style="padding:10px 0;font-size:15px;font-weight:${isCur ? '800' : '600'};border-radius:8px;background:${bg};color:${color};border:${border};text-align:center;transition:all 0.15s ease">
              ${idx + 1}
            </button>
          `;
        }).join('')}
      </div>

      <div style="text-align:center;margin-top:24px">
        ${diagConfirmSubmit ? '<div role="alert"><p>仍有未作答題目。交卷後，未作答題會列入需要回顧的題目。</p><button class="btn primary" data-diag-confirm-submit="true">仍要交卷</button><button class="btn quiet" data-diag-cancel-submit="true">返回作答</button></div>' : ''}
        <button class="btn primary" data-diag-submit="true" style="padding:14px 40px;font-size:17px;font-weight:700;border-radius:12px;box-shadow:0 6px 18px rgba(4,120,87,0.35)">
          🏆 完成作答，查看練習報告
        </button>
      </div>
    </div>
  `;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. 成績診斷與每題極致專業解析頁面 (Report View)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderReportView() {
  if (!diagEvaluation) {
    return `<div class="card">正在生成評估報告...</div>`;
  }

  const ev = diagEvaluation;
  const filteredQuestions = diagQuestions.filter(q => {
    const isCor = Array.isArray(q.answer)
      ? (Array.isArray(diagUserAnswers[q.id]) && diagUserAnswers[q.id].length === q.answer.length && diagUserAnswers[q.id].every(v => q.answer.includes(v)))
      : diagUserAnswers[q.id] === q.answer;
    if (diagFilterView === 'wrong') return !isCor;
    if (diagFilterView === 'correct') return isCor;
    return true;
  });

  return `
    <div class="header-block">
      <div class="pill" style="background:#ecfdf5;color:#065f46;font-weight:700">🏆 ${diagQuestions.length} 題${levelName(diagSessionTier)}練習檢核 · 深度能力診斷報告</div>
      <h1 style="margin:8px 0;font-size:28px">${diagSessionTier === null ? '英語能力全面體檢成就報告與微課學習地圖' : levelName(diagSessionTier) + ' · 測驗結果與解析'}</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px">
        以下依本站規則整理本次作答，協助選擇複習主題；不是標準化能力評定。
      </p>
    </div>

    <section class="card"><h2>本次答對 ${ev.rawCorrect} / ${diagQuestions.length} 題</h2><p>未作答也包含在總題數內。請在下方逐題檢查，找出需要訂正的觀念。</p></section>
    <!-- 雙欄架構：大考落點預估 vs 五大能力維度雷達 -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(min(100%, 320px), 1fr));gap:20px;margin-bottom:24px">
      ${diagSessionTier === null ? renderLevelEstimate(diagUserAnswers, diagQuestions) : `<section class="card"><h2>${Math.round(ev.rawCorrect / diagQuestions.length * 100)} 分／100 分</h2><p>答對率 ${Math.round(ev.rawCorrect / diagQuestions.length * 100)}% · 未作答 ${diagQuestions.length - Object.keys(diagUserAnswers).length} 題</p><p>本次只測「${levelName(diagSessionTier)}」，不推估整體 CEFR 或其他考試分數。先訂正錯題，再挑戰同程度的新題。</p></section>`}
      <!-- 欄 2: 五大核心維度掌握率分析 -->
      <div class="card">
        <h3 style="margin:0 0 14px;font-size:17px;display:flex;align-items:center;gap:8px">
          <span>📊 五維核心英語能力量化指標 (Five Dimensions)</span>
        </h3>
        <p style="font-size:13px;color:var(--text-muted);margin:0 0 16px">
          細緻評估您在單字、句法、篇章與批判思維的個別成熟度：
        </p>
        <div style="display:grid;gap:14px">
          ${Object.entries(ev.dimensionBreakdown).filter(([, stat]) => stat.total > 0).map(([dim, stat]) => {
            const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
            let barColor = '#10b981';
            let labelBadge = '🌟 卓越精熟';
            if (pct < 50) {
              barColor = '#ef4444';
              labelBadge = '⚠️ 迫切加強';
            } else if (pct < 75) {
              barColor = '#f59e0b';
              labelBadge = '🌿 穩健上升';
            }

            return `
              <div>
                <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
                  <span><strong>${esc(dim)}</strong> (${stat.correct}/${stat.total} 題)</span>
                  <span style="font-weight:700;color:${barColor}">${pct}% · ${labelBadge}</span>
                </div>
                <div style="width:100%;height:8px;background:var(--line);border-radius:4px;overflow:hidden">
                  <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.5s ease"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- 專家諮詢評語：能力失速臨界點 (Stall Point) 剖析 -->
    <div class="card" style="border-left:6px solid #e11d48;margin-bottom:24px;background:#fff1f2">
      <div style="display:flex;gap:12px;align-items:flex-start">
        <span style="font-size:32px">💡</span>
        <div>
          <h3 style="margin:0 0 6px;color:#9f1239;font-size:17px">
            本次答題回顧與練習建議
          </h3>
          <p style="margin:0;font-size:14px;color:#881337;line-height:1.6">
            根據本次作答，建議回顧 <strong>${esc(diagSessionTier === null ? ev.stallTierLabel : levelName(diagSessionTier))}</strong> 的相關題型。
            先回看相關例句，解釋自己為何選錯，再用不同情境練習。
          </p>
        </div>
      </div>
    </div>

    <!-- 推薦微課學習地圖 (English Quest Remedial Curriculum Hooks) -->
    ${ev.remedialHooks && ev.remedialHooks.length ? `
      <div class="card" style="margin-bottom:24px;border-top:4px solid #3b82f6">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px">
          <div>
            <h3 style="margin:0;font-size:17px;color:#1e3a8a">🎯 專屬客製化升級微課推薦 (English Quest 直通車)</h3>
            <div style="font-size:13px;color:var(--text-muted);margin-top:2px">
              依據您本次測驗失速考點，系統自動對標 English Quest 最迫切需要強化的微課講義：
            </div>
          </div>
          <span class="pill" style="background:#dbeafe;color:#1e40af;font-size:12px">${ev.remedialHooks.length} 個複習單元</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px">
          ${ev.remedialHooks.map(h => `
            <div style="border:1px solid #bfdbfe;background:#eff6ff;padding:14px;border-radius:10px;display:flex;flex-direction:column;justify-content:space-between">
              <div>
                <span class="pill" style="font-size:11px;background:#3b82f6;color:#fff;margin-bottom:6px">建議攻讀模組</span>
                <h4 style="margin:6px 0;font-size:15px;color:#1e40af">${esc(h.unitTitle)}</h4>
              </div>
              <button class="btn primary" data-open-remedial-module="${esc(h.module)}" data-open-remedial-unit="${esc(h.unitId)}"
                style="margin-top:12px;font-size:13px;padding:6px 12px;text-align:center;width:100%">
                📖 立即前往微課學習
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- 全卷逐題專業詳解 (Pedagogical Review) -->
    <div class="card" style="margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px">
        <div>
          <h3 style="margin:0;font-size:18px">📖 ${diagQuestions.length} 題名師五星級專業考點解析 (全卷公布)</h3>
          <div style="font-size:13px;color:var(--text-muted);margin-top:4px">
            每一題皆配備「雙語精譯、核心考點、句構拆解、高頻單字、致命陷阱剖析」五大教學維度。
          </div>
        </div>

        <!-- 檢視篩選標籤 -->
        <div style="display:flex;gap:6px">
          <button class="btn ${diagFilterView === 'all' ? 'primary' : 'secondary'}" data-diag-filter="all" style="font-size:13px;padding:6px 12px">
            全部 ${diagQuestions.length} 題 (${diagQuestions.length})
          </button>
          <button class="btn ${diagFilterView === 'wrong' ? 'primary' : 'secondary'}" data-diag-filter="wrong" style="font-size:13px;padding:6px 12px">
            ❌ 僅看錯題 (${diagQuestions.length - ev.rawCorrect})
          </button>
          <button class="btn ${diagFilterView === 'correct' ? 'primary' : 'secondary'}" data-diag-filter="correct" style="font-size:13px;padding:6px 12px">
            ✅ 僅看答對 (${ev.rawCorrect})
          </button>
        </div>
      </div>

      <!-- 題目詳解列表 -->
      <div style="display:grid;gap:18px">
        ${filteredQuestions.map((q, filteredIdx) => {
          const userChoice = diagUserAnswers[q.id];
          const isCorrect = Array.isArray(q.answer)
            ? (Array.isArray(userChoice) && userChoice.length === q.answer.length && userChoice.every(v => q.answer.includes(v)))
            : userChoice === q.answer;
          const origIdx = diagQuestions.findIndex(x => x.id === q.id);
          const showExp = diagExpandedExplains[q.id] !== false; // 預設展開

          return `
            <div style="border:1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'};border-radius:12px;padding:18px;background:${isCorrect ? '#f0fdf4' : '#fff5f5'}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:10px">
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                  <span class="pill" style="font-weight:700;background:${isCorrect ? '#10b981' : '#ef4444'};color:#fff">
                    第 ${origIdx + 1} 題 · ${isCorrect ? '✅ 答對' : '❌ 答錯'}
                  </span>
                  <span class="pill" style="background:#e0e7ff;color:#3730a3;font-size:11px">${esc(q.tierLabel)}</span>
                  <span style="font-size:12px;color:var(--text-muted);background:#fff;padding:2px 6px;border-radius:4px;border:1px solid var(--line)">
                    🎯 ${esc(q.subtopic)}
                  </span>
                </div>
                <button class="btn secondary" data-toggle-explain-item="${esc(q.id)}" style="font-size:12px;padding:4px 8px">
                  ${showExp ? '收合詳解' : '展開詳解 📖'}
                </button>
              </div>

              ${q.passage ? `
                <div style="background:#fff;border-left:3px solid #3b82f6;padding:12px 14px;border-radius:0 6px 6px 0;margin-bottom:12px;font-size:13px;line-height:1.6;white-space:pre-line">
                  ${esc(q.passage)}
                </div>
              ` : ''}

              <div class="clue-tag" style="margin-bottom:8px">⚡ 考點題眼：${esc(q.subtopic)}</div>
              <div style="font-size:16px;font-weight:600;line-height:1.5;margin-bottom:12px;color:var(--text-primary)">
                ${esc(q.prompt)}
              </div>

              <!-- 選項對照 -->
              <div style="display:grid;gap:6px;margin-bottom:14px">
                ${q.options.map((opt, oIdx) => {
                  const optLetter = String.fromCharCode(65 + oIdx);
                  const isAns = Array.isArray(q.answer) ? q.answer.includes(oIdx) : oIdx === q.answer;
                  const isUser = Array.isArray(userChoice) ? userChoice.includes(oIdx) : oIdx === userChoice;
                  let borderStyle = 'border:1px solid #e2e8f0;background:#fff;';
                  let tag = '';

                  if (isAns) {
                    borderStyle = 'border:2px solid #10b981;background:#ecfdf5;font-weight:700;color:#065f46;';
                    tag = ' <span style="color:#10b981;font-weight:700">✅ 正確答案</span>';
                  } else if (isUser && !isAns) {
                    borderStyle = 'border:2px solid #ef4444;background:#fef2f2;color:#991b1b;';
                    tag = ' <span style="color:#ef4444;font-weight:700">❌ 您的選擇</span>';
                  }

                  return `
                    <div style="padding:8px 12px;border-radius:6px;font-size:14px;display:flex;justify-content:space-between;align-items:center;${borderStyle}">
                      <div><strong>${optLetter}.</strong> ${esc(opt)}</div>
                      <div>${tag}</div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- 展開的名師黃金五維詳解區塊 -->
              ${showExp ? `
                <div style="background:#fff;border:1px solid #cbd5e1;border-radius:10px;padding:16px;margin-top:14px;display:grid;gap:12px;font-size:14px;line-height:1.65">
                  <div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;padding:10px 14px;color:#0369a1;font-size:13px;line-height:1.5">
                    <strong>🎯 解題思維三部曲：</strong>
                    <span>1. 圈題眼【${esc(q.subtopic)}】 ➔ 2. 套語法【${esc(q.coreConcept)}】 ➔ 3. 排除干擾【${esc(q.trapExplanation.replace(/^【[^】]+】/,'').slice(0, 45))}...】</span>
                  </div>

                  <div style="color:#0f766e">
                    <strong style="color:#047857">🎯 【核心考點剖析】</strong><br>
                    ${esc(q.coreConcept)}
                  </div>

                  <div style="color:#1e3a8a">
                    <strong style="color:#1d4ed8">📐 【句子語法結構拆解】</strong><br>
                    ${esc(q.sentenceAnalysis)}
                  </div>

                  <div style="color:#334155;background:#f8fafc;padding:10px 12px;border-radius:6px;white-space:pre-line">
                    <strong style="color:#475569">🌐 【題目與選項雙語對照精譯】</strong><br>
                    ${esc(q.translation)}
                  </div>

                  ${q.vocabulary && q.vocabulary.length ? `
                    <div style="color:#7c2d12;background:#fffbeb;padding:10px 12px;border-radius:6px">
                      <strong style="color:#b45309">📚 【重點考點字彙與搭配詞速查】</strong><br>
                      ${q.vocabulary.map(v => `
                        <div style="margin-top:4px">
                          • <strong>${esc(v.word)}</strong> <span style="color:#92400e;font-size:12px">${esc(v.phonetic)}</span> — ${esc(v.meaning)}
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  <div style="color:#991b1b;background:#fef2f2;padding:10px 12px;border-radius:6px">
                    <strong style="color:#b91c1c">⚠️ 【致命陷阱與干擾項排除剖析】</strong><br>
                    ${esc(q.trapExplanation)}
                  </div>

                  ${q.courseHook ? `
                    <div style="display:flex;justify-content:space-between;align-items:center;background:#eff6ff;padding:8px 12px;border-radius:6px;margin-top:4px;flex-wrap:wrap;gap:8px">
                      <span style="font-size:13px;color:#1e40af">
                        🔗 平台對應微課：<strong>${esc(q.courseHook.unitTitle)}</strong>
                      </span>
                      <button class="btn secondary" data-open-remedial-module="${esc(q.courseHook.module)}" data-open-remedial-unit="${esc(q.courseHook.unitId)}" style="font-size:12px;padding:4px 10px">
                        前往該單元精讀 ➔
                      </button>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- 底部操作按鈕 -->
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn secondary" data-restart-diag="true" style="padding:10px 20px;font-size:15px">
          🔄 抽取全新 ${diagQuestions.length || 30} 題再次挑戰
        </button>
        ${diagQuestions.length - ev.rawCorrect > 0 ? `
          <button class="btn primary" data-retry-wrong-diag="true" style="padding:10px 20px;font-size:15px;background:#dc2626;border-color:#dc2626">
            🎯 僅重測本次 ${diagQuestions.length - ev.rawCorrect} 題錯題 (靶向精練)
          </button>
        ` : ''}
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn secondary" data-print-diag="true" style="padding:10px 20px;font-size:15px">
          🖨️ 列印/儲存診斷報告 (PDF)
        </button>
        <button class="btn primary" data-nav="curriculum108" style="padding:10px 24px;font-size:15px">
          🏫 前往 108 課綱學年地圖開始精讀
        </button>
      </div>
    </div>
  `;
}

// 失速點評語產生器
function getStallPointAdvice(tier) {
  switch (Number(tier)) {
    case 1:
      return '您的英語基礎正在起步！建議從國小 6 年級單元 1~4 的 be 動詞、名詞單複數與日常對話開始建立語感，奠定自信的文法骨幹。';
    case 2:
      return '您已掌握基本生活問候，但在遇到過去簡單式、未來式及形容詞比較級時容易混淆。建議加強國中 7 年級時態矩陣與生活常用動詞變化。';
    case 3:
      return '您的基礎語法紮實，但在面對「現在完成式 (have+p.p.)」與「被動語態」等抽象時間線與關係子句時出現失誤。建議攻讀國中會考衝刺館的 Unit 3 與 Unit 5 專題。';
    case 4:
      return '您具備優異的國中文法底子，但在高中「分詞構句、倒裝句型與 4500-7000 學術詞彙」的長句中容易迷失主幹。建議精讀 Arch 高中先修專題二與五大句型矩陣。';
    case 5:
      return '您在高中學測程度表現亮眼，但進入商務書信與職場高頻詞性辨析 (Part 5) 時，對搭配詞與語域精準度仍需磨練。建議加強 TOEIC 國際商務專題。';
    case 6:
      return '您的商務英語流暢，但遇到 Digital SAT 的長篇學術語境詞義辨析 (Words in Context) 與修辭論點支撐時，深度思辨稍顯吃力。建議精讀 SAT 學術篇章閱讀。';
    case 7:
      return '您已達海外留學前段班水準！在面對 GRE 的雙重反向對稱邏輯與哲學極端詞彙時遇到天花板。建議鎖定 GRE Verbal 語意極性專案衝刺。';
    case 8:
    default:
      return '恭喜您已攀登至最高峰！GMAT Focus 的批判性推理要求極嚴密的假設檢驗 (Negation Test) 與因果鏈排除，建議持續挑戰 GMAT 商業決策邏輯題庫。';
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. 事件委派處理 (Event Handler)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function handleDiagnosticClick(btn, renderCallback, navigateCallback) {
  const d = btn.dataset;

  if (d.diagTier !== undefined) {
    if (diagLoading || diagMode !== 'intro') return true;
    const tier = d.diagTier === 'all' ? null : Number(d.diagTier);
    if (tier === null || DIAGNOSTIC_LEVELS.some(level => level.id === tier)) {
      diagSelectedTier = tier;
      if (tier !== null) diagQuestionCount = 20;
      renderCallback();
    }
    return true;
  }
  // 選擇題數 (10 / 20 / 30 / 40)
  if (d.diagSelectCount) {
    const count = parseInt(d.diagSelectCount, 10);
    if ([10, 20, 30, 40].includes(count)) {
      diagQuestionCount = count;
      renderCallback();
    }
    return true;
  }

  // 開始測驗
  if (d.startDiag) {
    if (diagLoading) return true;
    stopTimer();
    diagSessionTier = diagSelectedTier;
    const parsedCount = parseInt(d.startDiag, 10) || parseInt(d.diagCount, 10);
    if ([10, 20, 30, 40].includes(parsedCount)) {
      diagQuestionCount = parsedCount;
    }
    if (diagSessionTier !== null) diagQuestionCount = diagQuestionCount === 10 ? 10 : 20;
    const count = diagQuestionCount || 30;
    const durationMin = count === 10 ? 8 : count === 20 ? 15 : count === 40 ? 35 : 25;
    diagLoading = true;
    const fetchFn = diagSessionTier !== null ? questionDB.sampleDiagnostic(count, diagSessionTier) : (count === 10 && typeof questionDB.sampleDiagnostic10 === 'function')
      ? questionDB.sampleDiagnostic10()
      : (count === 30 && typeof questionDB.sampleDiagnostic30 === 'function')
      ? questionDB.sampleDiagnostic30()
      : questionDB.sampleDiagnostic(count);
    renderCallback();
    fetchFn.then(questions => {
      if (questions.length !== count) throw new Error('題庫不足');
      diagFilterView = 'all';
      diagExpandedExplains = {};
      diagQuestions = questions;
      diagCurrentIdx = 0;
      diagUserAnswers = {};
      diagConfirmSubmit = false;
      diagTimerSeconds = durationMin * 60;
      diagTimerPaused = false;
      diagMode = 'testing';
      diagLoading = false;
      startTimer(renderCallback);
      renderCallback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch(err => {
      console.error(err);
      diagLoading = false;
      alert('無法取得完整試卷，請確認網路連線後重試。');
      renderCallback();
    });
    return true;
  }

  // 選項選取
  if (d.diagChoice !== undefined) {
    const q = diagQuestions[diagCurrentIdx];
    if (q) {
      diagUserAnswers[q.id] = Number(d.diagChoice);
      renderCallback();
    }
    return true;
  }

  // 上一題
  if (d.diagPrev) {
    if (diagCurrentIdx > 0) {
      diagCurrentIdx--;
      renderCallback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return true;
  }

  // 下一題
  if (d.diagNext) {
    if (diagCurrentIdx < diagQuestions.length - 1) {
      diagCurrentIdx++;
      renderCallback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // 最後一題滾動到底部
      const submitBtn = document.querySelector('[data-diag-submit="true"]');
      if (submitBtn) submitBtn.scrollIntoView({ behavior: 'smooth' });
    }
    return true;
  }

  // 跳題
  if (d.diagJump !== undefined) {
    const targetIdx = Number(d.diagJump);
    if (targetIdx >= 0 && targetIdx < diagQuestions.length) {
      diagCurrentIdx = targetIdx;
      renderCallback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return true;
  }

  // 交卷
  if (d.diagCancelSubmit) { diagConfirmSubmit = false; renderCallback(); return true; }
  if (d.diagConfirmSubmit && diagConfirmSubmit) { diagConfirmSubmit = false; finishDiagnostic(renderCallback); return true; }
  if (d.diagSubmit) {
    const answeredCount = Object.keys(diagUserAnswers).length;
    const totalQ = diagQuestions.length;
    if (answeredCount < totalQ) {
      diagConfirmSubmit = true; renderCallback(); return true;
    }
    finishDiagnostic(renderCallback);
    return true;
  }

  // 暫存或離開
  if (d.exitDiag) {
    const confirmExit = confirm('測驗進行中，確定要暫存進度並返回測驗導覽頁嗎？');
    if (confirmExit) {
      stopTimer();
      diagMode = 'intro';
      renderCallback();
    }
    return true;
  }

  // 計時器暫停/繼續
  if (d.toggleDiagTimer) {
    diagTimerPaused = !diagTimerPaused;
    renderCallback();
    return true;
  }

  // 查看上次診斷報告
  if (d.viewLastReport) {
    if (diagEvaluation) {
      diagMode = 'report';
      renderCallback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert('請先進行一次測驗以生成完整報告。');
    }
    return true;
  }

  // 詳解篩選標籤
  if (d.diagFilter) {
    diagFilterView = d.diagFilter;
    renderCallback();
    return true;
  }

  // 收合/展開單題詳解
  if (d.toggleExplainItem) {
    const qid = d.toggleExplainItem;
    diagExpandedExplains[qid] = !diagExpandedExplains[qid];
    renderCallback();
    return true;
  }

  // 重新抽題測驗
  if (d.restartDiag) {
    diagMode = 'intro';
    diagQuestions = [];
    diagUserAnswers = {};
    renderCallback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return true;
  }

  // 重測本次錯題 (靶向精練)
  if (d.retryWrongDiag) {
    const wrongQs = diagQuestions.filter(q => {
      const u = diagUserAnswers[q.id];
      return Array.isArray(q.answer)
        ? (!Array.isArray(u) || u.length !== q.answer.length || !u.every(v => q.answer.includes(v)))
        : u !== q.answer;
    });
    if (wrongQs.length) {
      diagQuestions = wrongQs;
      diagUserAnswers = {};
      diagCurrentIdx = 0;
      diagExpandedExplains = {};
      diagTimerSeconds = wrongQs.length * 60;
      diagMode = 'testing';
      startTimer(renderCallback);
      renderCallback();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return true;
  }

  // 列印診斷報告
  if (d.printDiag) {
    window.print();
    return true;
  }

  // 點擊微課推薦按鈕導航
  if (d.openRemedialModule) {
    const mod = d.openRemedialModule;
    if (typeof navigateCallback === 'function') {
      navigateCallback(mod);
    }
    return true;
  }

  return false;
}
