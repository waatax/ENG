import { domains, learningCatalog, filterCatalog } from './learning_catalog.mjs';
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
let query = '', stage = '全部', domain = '全部';
const catalog = learningCatalog(points);
const stages = ['全部','國小','國中','高中','高工','國際考試'];
const stageFor = {jhs:'國中',sh:'高中',voc:'高工',intl:'國際考試'};
const savedMessage = () => progress.warning || '已儲存在這個瀏覽器；不會自動同步到其他裝置。';
function statusLabel(id) {
  const s = progress.summary(id);
  return s.answered ? `首次作答 ${s.firstCorrect}/${s.total} 題正確${s.needsReview ? ' · 需再練習' : ' · 可換情境應用'}` : s.hasDraft ? '已保存應用草稿' : '尚未作答';
}
export function knowledgeResults(search = query, selectedStage = stage, selectedDomain = domain) {
 const found=filterCatalog(catalog,search,selectedStage,selectedDomain);
 return `<p role="status" aria-live="polite">${found.length} 個教學頁面</p><div class="knowledge-grid">${found.map((c,i)=>`${i===18?'<details class="catalog-more"><summary>展開其餘 '+(found.length-18)+' 個頁面</summary><div class="knowledge-grid">':''}<a class="knowledge-card" href="${c.link}"><div class="catalog-meta"><span class="pill">${e(c.stage)}</span><small>${e(c.kind)}</small></div><h2>${e(c.title)}</h2><p>${e(c.description)}</p><small>${points.some(p=>p.id===c.id)?e(statusLabel(c.id)):e(domains.find(d=>d[0]===c.domain)[1])}</small><span>開始學習 →</span></a>`).join('')}${found.length>18?'</div></details>':''}</div>${!found.length?'<p>沒有相符內容。請改選「全部」，或試試「時態」、「閱讀」。</p>':''}`;
}
export function knowledgeHome() {
 const last=points.find(p=>p.id===progress.lastVisited);
 const review=points.filter(p=>progress.summary(p.id).needsReview);
 const attempted=points.filter(p=>progress.summary(p.id).answered).length;
 return `<section class="knowledge-home">
 <header class="learning-hero"><p class="pill">English Quest · 每次弄懂一個觀念</p><h1>把英文學懂，<br>從今天的一小步開始。</h1><p>選一個目標，看懂例句，再用自己的話練一次。按自己的步調，讓每次學習都有下一步。</p><div class="learning-actions"><a class="btn primary" href="${last?'#knowledge/'+last.id:'#knowledge/be-sentences'}">${last?'接續上次學習':'從第一句英文開始'} →</a><a class="btn" href="#diagnostic">用練習找補強方向</a><a class="btn" href="#wordaudio">單字 MP3 跟讀</a></div><p class="small">不確定程度也沒關係，先從熟悉的情境開始。</p></header>
 <div class="learning-dashboard"><section class="card"><h2>今天的學習任務</h2><p>看一個觀念 → 比較例句 → 不看答案做檢核。</p><a href="${review.length?'#knowledge/'+review[0].id:last?'#knowledge/'+last.id:'#knowledge/be-sentences'}">${review.length?'先訂正：'+e(review[0].title):last?'繼續：'+e(last.title):'起步：人稱與 be 動詞'} →</a></section><section class="card"><h2>你的學習足跡</h2><p>${attempted} / ${points.length} 個核心知識點已開始作答 · ${review.length} 個待訂正</p><p class="small">紀錄只保存在這個瀏覽器。閱讀與作答不等同精熟認證。</p>${review.length?`<details><summary>查看待訂正清單</summary><ul>${review.map(p=>`<li><a href="#knowledge/${p.id}">${e(p.title)}</a></li>`).join('')}</ul></details>`:''}</section></div>
 <section aria-labelledby="catalog-title"><h2 id="catalog-title">依能力找知識，也能依學段篩選</h2><p>核心知識點、圖解文法、綜合章節與學年微課，一起搜尋。</p><div class="knowledge-filters"><div><label for="knowledge-search">搜尋主題或英文關鍵字</label><input type="search" id="knowledge-search" value="${e(query)}" placeholder="例如：被動、閱讀、完成式"></div><div><label for="knowledge-stage">選擇學習階段</label><select id="knowledge-stage">${stages.map(s=>`<option ${stage===s?'selected':''}>${s}</option>`).join('')}</select></div><div><label for="knowledge-domain">選擇學習能力</label><select id="knowledge-domain">${domains.map(([id,label])=>`<option value="${id}" ${domain===id?'selected':''}>${label}</option>`).join('')}</select></div></div><div class="domain-guide">${domains.slice(1).map(([id,label,description])=>`<div><strong>${label}</strong><small>${description}</small></div>`).join('')}</div><div id="knowledge-results">${knowledgeResults()}</div></section>
 <details class="learning-options"><summary>更多學習工具與建議順序</summary><div class="learning-options-body"><p>入門：人稱與 be 動詞 → 日常動作 → 時間表達 → 句子連接 → 閱讀證據。學段標籤是學習建議，可隨時回頭補基礎。</p><div class="learning-actions"><a class="btn" href="#grammar">圖解文法</a><a class="btn" href="#listening">通勤聽課</a><a class="btn" href="#wordaudio">單字 MP3 播放練習</a><a class="btn" href="#flashcards">單字練習</a><a class="btn" href="#matrix">學年課程地圖</a></div><p>隔天先不看教材說出規則、重做一題，再決定要複習或往下學。</p></div></details></section>`;
}
export function searchKnowledge(target) {
  if (target.id === 'knowledge-search' || target.id === 'knowledge-stage' || target.id === 'knowledge-domain') {
    if (target.id === 'knowledge-search') query = target.value;
    else if (target.id === 'knowledge-stage') stage = stages.includes(target.value) ? target.value : '全部';
    else domain = domains.some(d=>d[0]===target.value)?target.value:'全部';
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
  const currentDomain = catalog.find(c=>c.id===p.id).domain;
  const related = points.filter(x=>x.id!==p.id && catalog.find(c=>c.id===x.id).domain===currentDomain);
  const next = related.find(x=>!progress.summary(x.id).answered) || related[0];
  return `<article class="lesson-page knowledge-detail"><a href="#knowledge">← 回知識點教室</a><header><p class="pill">${e(p.stage)} · 原創教學</p><h1>${e(p.title)}</h1><p>${e(p.goal)}</p><p class="small">先備知識：${e(p.prior)}</p></header>
    <details class="lesson-audio-disclosure"><summary>聆聽本課 · 語音與跟讀設定</summary>${renderLessonAudio('knowledge:'+p.id)}</details>
    <nav class="lesson-links" aria-label="本頁段落">${[['concept','觀念'],['examples','例句'],['steps','判斷與自查'],['practice','練習'],['output','應用']].map(([id,label])=>`<button class="btn quiet" data-scroll-to="#kp-${id}">${label}</button>`).join('')}</nav>
    <section class="card" id="kp-concept"><h2>1. 理解核心觀念</h2><p>${e(p.rule)}</p></section>
    ${renderTeachingAid(p.title, [], p.pairs.map(pair=>pair[0]))}<section class="card" id="kp-examples"><h2>2. 對照例句與錯誤</h2>${p.pairs.map(([en,zh])=>`<blockquote><p lang="en">${e(en)}</p><button class="btn quiet small" data-speak-sentence="${e(en)}" aria-label="朗讀例句：${e(en)}">朗讀例句</button><p>${e(zh)}</p></blockquote>`).join('')}<p class="small">朗讀使用裝置合成語音。</p><aside class="lesson-tip">${e(p.trap)}</aside></section>
    <section class="card solving-steps-card" id="kp-steps"><h2>如何判斷與自查</h2><ol>${p.steps.map(s=>`<li>${e(s)}</li>`).join('')}</ol></section>
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
