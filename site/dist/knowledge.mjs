import { renderLessonAudio } from './lesson_audio.mjs';
import './listening.mjs';
import { renderTeachingAid } from './teaching_aids.mjs';
import { curriculum } from './curriculum.mjs';
import { escapeText as e } from './lesson_pages.mjs';
import { points as originalPoints } from './knowledge_content.mjs';
import { foundations } from './knowledge_foundations.mjs';
import { createKnowledgeProgress } from './knowledge_progress.mjs';
export const points = [...foundations.slice(0,2), ...originalPoints, foundations[2]];
const progress = createKnowledgeProgress(points);
let query = '', stage = '全部';
const stages = ['全部','國小','國中','高中','高工','國際考試'];
const stageFor = {jhs:'國中',sh:'高中',voc:'高工',intl:'國際考試'};
const savedMessage = () => progress.warning || '已儲存在這個瀏覽器；不會自動同步到其他裝置。';
function statusLabel(id) {
  const s = progress.summary(id);
  return s.answered ? `首次作答 ${s.firstCorrect}/${s.total} 題正確${s.needsReview ? ' · 需再練習' : ' · 可換情境應用'}` : s.hasDraft ? '已保存應用草稿' : '尚未作答';
}
export function knowledgeResults(search = query, selectedStage = stage) {
  const term = search.trim().toLowerCase();
  const cards = points.map(p => ({title:p.title,stage:p.stage,description:p.goal,link:`#knowledge/${p.id}`,search:p.rule,status:statusLabel(p.id)}))
    .concat(curriculum.flatMap(t => t.chapters.map(c => ({title:c.title,stage:stageFor[t.id]||t.title,description:c.concepts.map(x=>x.heading).join(' · '),link:`#chapter/${t.id}/${c.id}`,search:c.concepts.map(x=>x.body).join(' '),status:'綜合教學章節'}))));
  const found = cards.filter(c => (selectedStage === '全部' || c.stage === selectedStage) && `${c.title} ${c.stage} ${c.description} ${c.search}`.toLowerCase().includes(term));
  return `<p role="status">${found.length} 個教學頁面</p><div class="knowledge-grid">${found.map(c=>`<a class="knowledge-card" href="${c.link}"><span class="pill">${e(c.stage)}</span><h2>${e(c.title)}</h2><p>${e(c.description)}</p><small>${e(c.status)}</small><span>開始學習 →</span></a>`).join('')}</div>${!found.length?'<p>沒有相符內容。請改選「全部」，或試試「時態」、「閱讀」。</p>':''}`;
}
export function knowledgeHome() {
  const last = points.find(p => p.id === progress.lastVisited);
  const review = points.filter(p => progress.summary(p.id).needsReview);
  return `<section class="knowledge-home">
    <div class="level-test-hero-card" style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 60%,#0f2e59 100%);color:#f8fafc;border:2px solid #38bdf8;border-radius:14px;padding:22px 24px;margin-bottom:24px;box-shadow:0 8px 24px -4px rgba(56,189,248,0.22)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px">
        <div style="flex:1;min-width:280px">
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(56,189,248,0.18);color:#38bdf8;border:1px solid rgba(56,189,248,0.4);border-radius:20px;padding:3px 12px;font-size:12px;font-weight:700;margin-bottom:10px">
            <span>🎯 學習前必測 · 個人化落點診斷</span>
          </div>
          <h2 style="font-size:23px;font-weight:800;color:#ffffff;margin:0 0 8px 0;letter-spacing:-0.01em">
            🎯 英文程度測試 (English Level Test & Diagnostic)
          </h2>
          <p style="font-size:14px;color:#cbd5e1;margin:0 0 12px 0;line-height:1.6">
            開始自學前，可選<strong>指定程度 20 題測驗</strong>，或進行全階綜合練習。完成後查看解析，找出需要補強的語法、句型與詞彙。
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;font-size:11px;color:#94a3b8;margin-bottom:14px">
            <span style="background:rgba(255,255,255,0.08);padding:3px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.12)">🎒 國小 Pre-A1</span>
            <span style="color:#64748b">➔</span>
            <span style="background:rgba(255,255,255,0.08);padding:3px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.12)">🏫 國中會考 A1-A2</span>
            <span style="color:#64748b">➔</span>
            <span style="background:rgba(255,255,255,0.08);padding:3px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.12)">🎓 高中學測 B1-B2</span>
            <span style="color:#64748b">➔</span>
            <span style="background:rgba(255,255,255,0.08);padding:3px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.12)">💼 TOEIC / SAT B2+</span>
            <span style="color:#64748b">➔</span>
            <span style="background:rgba(255,255,255,0.08);padding:3px 8px;border-radius:5px;border:1px solid rgba(255,255,255,0.12)">🏛️ GRE / GMAT C1-C2</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:8px">
          <button class="btn" data-nav="diagnostic" style="background:#38bdf8;color:#0f172a;font-size:15px;font-weight:700;padding:12px 24px;border-radius:8px;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(56,189,248,0.35);display:inline-flex;align-items:center;gap:6px">
            <span>🚀 選擇程度並開始測驗</span>
            <span style="font-size:17px">→</span>
          </button>
          <span style="font-size:11px;color:#94a3b8;text-align:center;width:100%">分層自適應抽題 · 附完整詳解與落點分析</span>
        </div>
      </div>
    </div>
    <!-- 🌟 初學者自學起跑線與四階學習公路 -->
    <div class="beginner-highway" id="beginner-highway">
      <div class="beginner-highway-head">
        <h2><span>🧭 初學者自學導航</span> · 四階學習公路</h2>
        <span class="pill" style="background:#dcfce7;color:#166534;font-weight:700">循序漸進 · 零基礎通關</span>
      </div>
      <p style="font-size:13.5px;color:var(--text-primary);margin:0 0 16px;line-height:1.6">
        英文弱底或不熟悉的同學，請勿盲目刷題！請依下方四階階梯循序漸進：<strong>先掌握發音與句型骨架，再攻時態與從屬子句，最後融會貫通大考解題</strong>。
      </p>
      <div class="highway-grid">
        <a class="highway-card stage-1" href="#knowledge/be-sentences">
          <span class="highway-stage-badge">第一階 · 國小奠基 (Pre-A1)</span>
          <h3>人稱與 be 動詞句型</h3>
          <p>學會第一個完整英文句子，弄懂 I am、you are、she is 與一般動詞三單變化。</p>
          <span class="highway-action">從第一句開始 ➔</span>
        </a>
        <a class="highway-card stage-2" href="#knowledge/past-perfect">
          <span class="highway-stage-badge">第二階 · 國中會考 (A1-B1)</span>
          <h3>過去式 vs 現在完成式</h3>
          <p>看懂時間軸是「已結束」還是「連到現在」，掌握五大句型與會考關鍵題眼。</p>
          <span class="highway-action">突破核心時態 ➔</span>
        </a>
        <a class="highway-card stage-3" href="#knowledge/relative-clauses">
          <span class="highway-stage-badge">第三階 · 高中學測 (B1-B2)</span>
          <h3>關係子句與篇章邏輯</h3>
          <p>學會「先找缺口，再選代名詞」，破解長句修飾語、分詞構句與段落轉折詞。</p>
          <span class="highway-action">精進長句分析 ➔</span>
        </a>
        <a class="highway-card stage-4" href="#knowledge/reading-evidence">
          <span class="highway-stage-badge">第四階 · 國際檢定 (B2-C2)</span>
          <h3>閱讀證據與批判推理</h3>
          <p>區分文本直接資訊與無端猜測，掌握 SAT / GRE / GMAT 論證假設與題型思維。</p>
          <span class="highway-action">鍛鍊批判邏輯 ➔</span>
        </a>
      </div>
    </div>
    <section class="card learning-new-tools"><h2>🎧 用聽的學單元，用圖表懂文法</h2><p>國小、國中、高中與高工：中文解說、英文例句、停頓回想。</p><div class="audio-controls"><a class="btn primary" href="#listening">通勤聽課教室</a><a class="btn" href="#grammar">圖解文法專區</a></div></section>
    <header><p class="pill">理解 → 看例子 → 自己做 → 複習</p><h1>今天想弄懂哪個知識點？</h1><p>初學者從「國小」開始；已學過的主題，先做檢核，再針對錯誤回看例句。</p></header>
    ${last?`<aside class="resume-card"><strong>接續上次學習</strong><a href="#knowledge/${last.id}">${e(last.title)} →</a><small>${e(statusLabel(last.id))}</small></aside>`:''}
    ${review.length?`<details class="card"><summary>待訂正的知識點（${review.length}）</summary><ul>${review.map(p=>`<li><a href="#knowledge/${p.id}">${e(p.title)}</a></li>`).join('')}</ul><p>先解釋錯誤，再按「再練一次」。首次紀錄會保留。</p></details>`:''}
    <div class="knowledge-filters"><div><label for="knowledge-search">搜尋主題或英文關鍵字</label><input type="search" id="knowledge-search" value="${e(query)}" placeholder="例如：被動、閱讀、完成式"></div><div><label for="knowledge-stage">選擇學習階段</label><select id="knowledge-stage">${stages.map(s=>`<option ${stage===s?'selected':''}>${s}</option>`).join('')}</select></div></div>
    <p class="small">學段標籤是本站學習建議。現有教材仍在補齊，並不代表已完整涵蓋課綱或考試。</p><div id="knowledge-results">${knowledgeResults()}</div></section>`;
}
export function searchKnowledge(target) {
  if (target.id === 'knowledge-search' || target.id === 'knowledge-stage') {
    if (target.id === 'knowledge-search') query = target.value;
    else stage = stages.includes(target.value) ? target.value : '全部';
    const results = document.querySelector('#knowledge-results');
    if (results) results.innerHTML = knowledgeResults();
  }
  if (target.dataset?.kpDraft) {
    progress.write(target.dataset.kpDraft, target.value);
    const status = document.querySelector('#kp-save-status');
    if (status) status.textContent = savedMessage();
  }
}
function checkHtml(p, i) {
  const q = p.questions[i], a = progress.answer(p.id,i), answered = a && a.latest !== null;
  return `<fieldset class="lesson-check" id="kp-check-${i}"><legend>${i+1}. ${e(q[0])}</legend>${q[1].map((o,j)=>`<button class="btn quiet lesson-option" data-kp-answer="${p.id}:${i}:${j}" ${answered?'disabled':''}>${String.fromCharCode(65+j)}. ${e(o)}</button>`).join('')}
    <div class="kp-feedback" role="status" tabindex="-1">${answered?`<p><strong>${a.latest===q[2]?'答對':'需要訂正'}</strong> · 你的答案：${e(q[1][a.latest])}<br>正解：${e(q[1][q[2]])}</p><div class="clue-box"><strong>💡 題眼分析與破題思維：</strong><br>${e(q[3])}</div><p class="small">首次答案：${e(q[1][a.first])} · 已作答 ${a.attempts} 次。重做不會覆蓋首次紀錄。</p><button class="btn quiet" data-kp-retry="${p.id}:${i}">再練一次</button>`:''}</div></fieldset>`;
}
export function knowledgePage(id) {
  const p = points.find(x=>x.id===id);
  if (!p) return '<h1>找不到這個知識點</h1><a href="#knowledge">回知識點教室</a>';
  progress.visit(id);
  const index = points.indexOf(p), next = points[index+1];
  return `<article class="lesson-page knowledge-detail"><a href="#knowledge">← 回知識點教室</a><header><p class="pill">${e(p.stage)} · 原創教學</p><h1>${e(p.title)}</h1><p>${e(p.goal)}</p><p class="small">先備知識：${e(p.prior)}</p></header>
    ${renderLessonAudio('knowledge:'+p.id)}
    <nav class="lesson-links" aria-label="本頁段落">${[['concept','觀念'],['examples','例句'],['steps','解題三步法'],['practice','練習'],['output','應用']].map(([id,label])=>`<button class="btn quiet" data-scroll-to="#kp-${id}">${label}</button>`).join('')}</nav>
    <section class="card" id="kp-concept"><h2>1. 理解核心觀念</h2><p>${e(p.rule)}</p><ol>${p.steps.map(s=>`<li>${e(s)}</li>`).join('')}</ol></section>
    ${renderTeachingAid(p.title, [], p.pairs.map(pair=>pair[0]))}<section class="card" id="kp-examples"><h2>2. 對照例句與錯誤</h2>${p.pairs.map(([en,zh])=>`<blockquote><p lang="en">${e(en)}</p><button class="btn quiet small" data-speak-sentence="${e(en)}" aria-label="朗讀例句：${e(en)}">朗讀例句</button><p>${e(zh)}</p></blockquote>`).join('')}<p class="small">朗讀使用裝置合成語音。</p><aside class="lesson-tip">${e(p.trap)}</aside></section>
    <section class="card solving-steps-card" id="kp-steps"><h3>🎯 大考解題三步法 · 考場實戰本能</h3><p style="font-size:13px;color:var(--text-muted);margin:0 0 14px">面對題目不再靠感覺盲猜！依照以下三步驟，有條理破解考題：</p><ul class="solving-steps-list"><li class="solving-step-item"><span class="step-num-badge">步驟 1</span><strong>🔍 圈題眼 (Locate Clue)</strong><p>先看空格前後詞、時間副詞或句法連詞，找出命題關鍵訊號。</p></li><li class="solving-step-item"><span class="step-num-badge">步驟 2</span><strong>📐 想規則 (Apply Rule)</strong><p>根據題眼啟動本課核心語法公式，鎖定正確的句型結構。</p></li><li class="solving-step-item"><span class="step-num-badge">步驟 3</span><strong>🚫 排陷阱 (Eliminate Traps)</strong><p>逐一檢驗選項，排除主謂不一致、時態混淆等干擾項。</p></li></ul></section>
    <section class="card" id="kp-practice"><h2>3. 先作答，再看解析</h2><p>答錯後先回看規則，再重做。此處記錄練習表現，不換算正式考試分數。</p>${p.questions.map((_,i)=>checkHtml(p,i)).join('')}</section>
    <section class="card" id="kp-output"><h2>4. 換個情境使用</h2><label for="kp-draft">${e(p.task)}</label><textarea id="kp-draft" data-kp-draft="${p.id}" rows="5" maxlength="10000" placeholder="請先寫下自己的答案，再展開範例。">${e(progress.draft(p.id))}</textarea><p class="small" id="kp-save-status" role="status">${e(savedMessage())}</p><details><summary>參考答案與自查</summary><p>${e(p.model)}</p><p>先核對意思，再核對句型。寫作練習沒有自動評分；不同答案也可能正確。</p></details><h3>明天再回想</h3><p>不看本文說出規則，重新造一個句子，再檢查本頁的常見錯誤。</p></section>
    <nav class="lesson-links" aria-label="接續學習"><a href="#knowledge">回知識點教室</a>${next?`<a href="#knowledge/${next.id}">下一頁：${e(next.title)} →</a>`:''}</nav></article>`;
}
export function answerKnowledge(button) {
  const action = button.dataset.kpAnswer || button.dataset.kpRetry;
  if (!action) return false;
  const [id, qi, ai] = action.split(':'), i = Number(qi), p = points.find(p=>p.id===id);
  if (!p || !Number.isInteger(i) || !p.questions[i]) return true;
  const changed = button.dataset.kpRetry ? progress.retry(id,i) : progress.choose(id,i,Number(ai));
  if (!changed) return true;
  button.closest('fieldset').outerHTML = checkHtml(p,i);
  const replacement = document.querySelector(`#kp-check-${i}`);
  replacement?.querySelector(button.dataset.kpRetry ? 'button' : '.kp-feedback')?.focus();
  const status = document.querySelector('#kp-save-status');
  if (status) status.textContent = savedMessage();
  return true;
}
