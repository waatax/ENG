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
  return `<section class="knowledge-home"><header><p class="pill">理解 → 看例子 → 自己做 → 複習</p><h1>今天想弄懂哪個知識點？</h1><p>初學者從「國小」開始；已學過的主題，先做檢核，再針對錯誤回看例句。</p></header>
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
    <div class="kp-feedback" role="status" tabindex="-1">${answered?`<p><strong>${a.latest===q[2]?'答對':'需要訂正'}</strong> · 你的答案：${e(q[1][a.latest])}<br>正解：${e(q[1][q[2]])}</p><p>${e(q[3])}</p><p class="small">首次答案：${e(q[1][a.first])} · 已作答 ${a.attempts} 次。重做不會覆蓋首次紀錄。</p><button class="btn quiet" data-kp-retry="${p.id}:${i}">再練一次</button>`:''}</div></fieldset>`;
}
export function knowledgePage(id) {
  const p = points.find(x=>x.id===id);
  if (!p) return '<h1>找不到這個知識點</h1><a href="#knowledge">回知識點教室</a>';
  progress.visit(id);
  const index = points.indexOf(p), next = points[index+1];
  return `<article class="lesson-page knowledge-detail"><a href="#knowledge">← 回知識點教室</a><header><p class="pill">${e(p.stage)} · 原創教學</p><h1>${e(p.title)}</h1><p>${e(p.goal)}</p><p class="small">先備知識：${e(p.prior)}</p></header>
    <nav class="lesson-links" aria-label="本頁段落">${[['concept','觀念'],['examples','例句'],['practice','練習'],['output','應用']].map(([id,label])=>`<button class="btn quiet" data-scroll-to="#kp-${id}">${label}</button>`).join('')}</nav>
    <section class="card" id="kp-concept"><h2>1. 理解核心觀念</h2><p>${e(p.rule)}</p><ol>${p.steps.map(s=>`<li>${e(s)}</li>`).join('')}</ol></section>
    <section class="card" id="kp-examples"><h2>2. 對照例句與錯誤</h2>${p.pairs.map(([en,zh])=>`<blockquote><p lang="en">${e(en)}</p><button class="btn quiet small" data-speak-sentence="${e(en)}" aria-label="朗讀例句：${e(en)}">朗讀例句</button><p>${e(zh)}</p></blockquote>`).join('')}<p class="small">朗讀使用裝置合成語音。</p><aside class="lesson-tip">${e(p.trap)}</aside></section>
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
