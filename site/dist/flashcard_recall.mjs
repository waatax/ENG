// Daily word session: one decision on screen at a time, harder retrieval as a word gets stronger.
import {readRecall, recordRecall, recallQueue, scheduleRecall, spellingFeedback, normalizeRecall, escapeHTML as esc} from './recall.mjs?v=practice20261126';
import {teachingCard} from './flashcard_quality.mjs';
import {wordStructure, renderWordStructure} from './word_structure.mjs';
import {findTarget, maskTarget} from './word_mask.mjs';

export const DAILY_KEY = 'eq_recall_daily_v1', DAILY_GOAL = 10;
let direction = 'smart', session = null, notice = '', lastRender = null, lastCards = null;

export function recallActive(tier) {return !!(session && session.tier===tier && session.cards[session.index]);}
const local = () => {try {return globalThis.localStorage;} catch {return null;}};
function focusPanel() {
  const doc = globalThis.document;
  const input = doc?.querySelector?.(session?.retrying ? '#fc-recall-retry' : '#fc-recall-answer');
  if (input) {input.focus?.({preventScroll:true});return;}
  doc?.querySelector?.('#recall-focus')?.focus?.({preventScroll:true});
}
const dayKey = (now = Date.now()) => new Date(now).toLocaleDateString('en-CA');
export function readDaily(storage, now = Date.now()) {
  let saved = {};
  try {saved = JSON.parse(storage?.getItem(DAILY_KEY) || '{}') || {};} catch {saved = {};}
  const today = dayKey(now), yesterday = dayKey(now - 86400000);
  const streak = saved.last === today || saved.last === yesterday ? Number(saved.streak) || 0 : 0;
  return {done: saved.last === today ? Number(saved.done) || 0 : 0, streak, last: saved.last || ''};
}
export function bumpDaily(storage, now = Date.now()) {
  const current = readDaily(storage, now), today = dayKey(now);
  const next = {done: current.done + 1, streak: current.last === today ? current.streak : current.streak + 1, last: today};
  try {storage?.setItem(DAILY_KEY, JSON.stringify(next));} catch {}
  return next;
}
// A word starts as recognition, then moves to spelling, a new sentence, and finally the sound alone.
function questionType(card, state) {
  if (direction === 'understand') return 'recognize';
  if (direction === 'produce') return 'produce';
  const rec = state[`word:smart:${card.id}`];
  const step = Number.isInteger(rec?.step) ? rec.step : -1;
  if (step < 0) return 'recognize';
  if (step === 0) return 'produce';
  if (step === 1) return maskTarget(teachingCard(card).example, card.word) ? 'cloze' : 'produce';
  return 'listen';
}
const answerOf = (type, c) => type === 'cloze' ? (maskTarget(c.example, c.word)?.token || c.word) : c.word;
const shownZh = c => c.gloss || c.zh;
const dayLabel = days => days <= 1 ? '明天再想' : `${days} 天後`;
function hintText(word, level) {
  const letters = [...String(word)];
  return letters.map((ch, i) => /[a-z]/i.test(ch) ? (i < level ? ch : '＿') : ch).join(' ');
}
function highlighted(example, word) {
  const t = findTarget(example, word);
  if (!t) return esc(example);
  return `${esc(example.slice(0, t.start))}<mark>${esc(example.slice(t.start, t.end))}</mark>${esc(example.slice(t.end))}`;
}
function typingBlock(c, type, label) {
  const target = answerOf(type, c);
  const hint = session.hint ? `<p class="fcx-hint" lang="en" aria-label="提示">${esc(hintText(target, session.hint))}</p>` : '';
  return `${hint}<label class="fcx-input-label" for="fc-recall-answer">${label}</label><input id="fc-recall-answer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" placeholder="在這裡輸入英文…" maxlength="160" lang="en" value="${esc(session.draft || '')}" aria-describedby="fc-recall-input-note"><p id="fc-recall-input-note" class="fcx-input-note" role="status">${session.needsInput?'先輸入英文，或直接翻面看答案。':''}</p><div class="fcx-q-actions"><button class="btn primary" data-fc-recall="check">核對我的拼字</button><button class="btn quiet" data-fc-recall="hint" ${session.hint>=target.length-1?'disabled':''}>給我提示</button></div><button class="btn quiet fcx-link" data-fc-recall="reveal">想過了，直接看答案</button>`;
}
function questionFace(c, type) {
  const speak = (attr, text, label) => `<button class="btn quiet small" data-fc-${attr}="${esc(text)}">${label}</button>`;
  if (type === 'recognize') return `<p class="recall-label">看英文，想意思和使用場合</p><h3 id="recall-focus" tabindex="-1" lang="en">${esc(c.word)}</h3>${c.chunk||c.ipa?`<p class="fcx-phon" lang="en">${c.chunk?`<span>${esc(c.chunk)}</span>`:''}${c.ipa?`<span class="fcx-ipa">${esc(c.ipa)}</span>`:''}</p>`:''}<div class="fcx-q-audio">${speak('speak-word',c.word,'🔊 聽發音')}${speak('speak-word-slow',c.word,'🐢 慢速')}</div><button class="btn primary fcx-reveal" data-fc-recall="reveal">想好了，翻面核對</button>`;
  if (type === 'cloze') {
    const m = maskTarget(c.example, c.word);
    return `<p class="recall-label">這句話缺哪個字？</p><h3 id="recall-focus" tabindex="-1" class="fcx-cloze" lang="en">${esc(m.masked)}</h3><p class="fcx-q-zh">${esc(c.exampleZh)}</p>${typingBlock(c, type, '輸入句子裡的那個字')}`;
  }
  if (type === 'listen') return `<p class="recall-label" id="recall-focus" tabindex="-1">聽發音，拼出這個字</p><div class="fcx-q-audio big">${speak('speak-word',c.word,'🔊 播放')}${speak('speak-word-slow',c.word,'🐢 慢速')}</div>${typingBlock(c, type, '聽到什麼，就拼什麼')}`;
  return `<p class="recall-label">看意思，說出並拼出英文</p>${c.pos?`<span class="recall-pos-pill">${esc(c.pos)}</span>`:''}<h3 id="recall-focus" tabindex="-1">${esc(shownZh(c))}</h3><div class="fcx-q-audio">${speak('speak-zh',shownZh(c),'🔊 聽中文')}</div>${typingBlock(c, type, '試著拼寫（也可以先在心裡想）')}`;
}
function answerFace(c, type) {
  const f = session.feedback, missed = f?.ok === false;
  const previous = readRecall(local())[`word:${direction}:${c.id}`];
  const preview = rating => dayLabel(scheduleRecall(previous, rating)?.days ?? 1);
  const diagnosis = session.typed === null ? '' : `<div class="recall-diagnosis ${f?.ok?'good':'retry'}">${f?.diffHtml?`<div class="sp-diff-box">${f.diffHtml}</div>`:''}<p class="sp-msg">${esc(f?.text)}</p>${session.typed?`<p class="sp-typed-line">你的拼字：<span lang="en" class="recall-typed">${esc(session.typed)}</span></p>`:''}${f?.tip?`<div class="recall-tip">💡 <b>為什麼會錯、怎麼記：</b>${esc(f.tip)}</div>`:''}${missed?`<div class="recall-repair-steps">🔬 <b>記憶修復三步法：</b>① 先拍音節 <code lang="en">${esc(c.chunk || c.word)}</code> ➔ ② 綁定搭配 <code lang="en">${esc(c.collocation || c.word)}</code> ➔ ③ 點下方「🐢 慢速例句」跟讀一次</div>`:''}${missed?retryBlock():''}</div>`;
  const structure = wordStructure(c.word) ? `<details class="fcx-more"><summary>拆字理解</summary>${renderWordStructure(c)}</details>` : '';
  return `<div class="recall-answer ${session.justRevealed?'is-flipping':''}" role="status"><p class="recall-label">答案與用法</p><h3 id="recall-focus" tabindex="-1" lang="en">${c.icon?`<span class="recall-card-ic" aria-hidden="true">${c.icon}</span> `:''}${esc(c.word)}</h3><div class="fcx-q-audio"><button class="btn quiet small" data-fc-speak-word="${esc(c.word)}" aria-label="聽英文答案">🔊 發音</button><button class="btn quiet small" data-fc-speak-word-slow="${esc(c.word)}" aria-label="慢速聽英文答案">🐢 慢速</button></div>${c.chunk||c.ipa?`<p class="fcx-phon" lang="en">${c.chunk?`<span>${esc(c.chunk)}</span>`:''}${c.ipa?`<span class="fcx-ipa">${esc(c.ipa)}</span>`:''}</p>`:''}<p class="fcx-meaning"><b>${esc(c.pos)}</b> ${esc(shownZh(c))} <button class="btn quiet small" data-fc-speak-zh="${esc(shownZh(c))}" aria-label="聽中文意思">🔊</button></p>${diagnosis}${type==='cloze'&&normalizeRecall(answerOf(type,c))!==normalizeRecall(c.word)?`<p class="fcx-form-note">句中拼法 <strong lang="en">${esc(answerOf(type,c))}</strong> · 字卡原形 <span lang="en">${esc(c.word)}</span></p>`:''}${c.example?`<div class="fcx-example"><p lang="en">${highlighted(c.example,c.word)} <button class="btn quiet small" data-fc-speak-sentence="${esc(c.example)}" aria-label="聽例句">🔊</button> <button class="btn quiet small" data-fc-speak-sentence-slow="${esc(c.example)}" aria-label="慢速聽例句">🐢 慢速例句</button></p><p class="muted">${esc(c.exampleZh)}</p></div>`:''}${c.collocation?`<p class="recall-collocation"><b>一起記的搭配</b><span lang="en">${esc(c.collocation)}</span></p>`:''}${c.memoryTip?`<div class="recall-memory-tip">🧠 <b>記憶鉤子：</b>${esc(c.memoryTip)}</div>`:''}${structure}<p class="small fcx-transfer">換你說：把這個字放進一句跟自己有關的話。</p></div><div class="fcx-rate-bar"><p class="recall-label">遮住答案，你剛才想得起來嗎？${missed?'（還要練的字會在下次排程出現）':''}</p><div class="recall-ratings"><button class="btn quiet" data-fc-recall="again"><kbd>1</kbd>🌱 還要練<span>${preview('again')}</span></button><button class="btn primary" data-fc-recall="good" ${missed?'disabled':''}><kbd>2</kbd>✓ 想起來了<span>${preview('good')}</span></button><button class="btn quiet" data-fc-recall="easy" ${missed||session.hint?'disabled':''}><kbd>3</kbd>✦ 很熟悉<span>${preview('easy')}</span></button></div></div>`;
}
function retryBlock() {
  if (session.retryOk) return '<p class="fcx-retry-ok">這次拼對了。明天再想一次，確認是否還記得。</p>';
  return '<button class="btn quiet" data-fc-recall="retry-start">遮住答案，再拼一次</button>';
}
function retryFace(c, type) {
  const masked = type === 'cloze' ? maskTarget(c.example,c.word)?.masked : '';
  return `<div class="recall-question fcx-card-q fcx-retry-card">
    <p class="recall-label">拼字訂正</p>
    <h3 id="recall-focus" tabindex="-1">回想剛剛核對的拼法</h3>
    ${masked?`<p class="fcx-retry-cue" lang="en">${esc(masked)}</p>`:type==='listen'?'<p>在心裡重播剛剛聽見的字。</p>':`<p class="fcx-retry-cue">${esc(shownZh(c))}</p>`}
    <label class="fcx-input-label" for="fc-recall-retry">重新輸入英文</label>
    <input id="fc-recall-retry" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" maxlength="160" lang="en" value="${esc(session.retryDraft || '')}" aria-describedby="fc-recall-retry-note">
    <p id="fc-recall-retry-note" class="fcx-input-note" role="status">${esc(session.retryNote)}</p>
    <div class="fcx-q-actions"><button class="btn primary" data-fc-recall="retry">核對訂正</button><button class="btn quiet" data-fc-recall="retry-back">再看一次解說</button></div>
  </div>`;
}
function summaryView() {
  const results = session.results, misses = results.filter(r => r.rating === 'again');
  const first = results.filter(r => r.rating !== 'again').length;
  const daily = readDaily(local());
  const heading = misses.length === 0 ? '這組全部想起來了！' : misses.length <= results.length / 2 ? '今天又多留住一點英文' : '願意想，就已經在變強';
  return `<div class="recall-finish"><span aria-hidden="true">${misses.length?'🌿':'🎉'}</span><h3 id="recall-focus" tabindex="-1">${heading}</h3><p>完成 ${results.length} 張${direction==='produce'?'「中文說英文」':direction==='understand'?'「英文想意思」':'智慧回想'}：想起來 ${first} 張，${session.repaired} 張選擇再練。${esc(notice)}</p><ul class="fcx-summary-stats"><li><b>${daily.done}</b><span>今天已練</span></li><li><b>${daily.streak}</b><span>連續天數</span></li><li><b>${first}</b><span>這組想起</span></li></ul>${misses.length?`<div class="fcx-miss-list"><p class="recall-label">還要練的字</p><ul>${misses.map(r=>`<li><button class="btn quiet small" data-fc-speak-word="${esc(r.word)}" aria-label="聽 ${esc(r.word)}">🔊</button><b lang="en">${esc(r.word)}</b><span>${esc(r.zh)}</span></li>`).join('')}</ul></div>`:''}<div class="fcx-finish-actions">${misses.length?`<button class="btn primary" data-fc-recall="repair">現在再練這 ${misses.length} 張</button><button class="btn quiet" data-fc-recall="start">換下一組</button>`:`<button class="btn primary" data-fc-recall="start">再練一小組</button>`}</div><p class="small muted">明天換個時間再想一次，比一直翻看更能檢查記憶。</p></div>`;
}
function introView(cards, queue) {
  const state = readRecall(local()), now = Date.now(), key = c => `word:${direction}:${c.id}`;
  const due = queue.filter(c => Number.isFinite(state[key(c)]?.due)).length, fresh = queue.length - due;
  const learned = cards.filter(c => state[key(c)]).length;
  const daily = readDaily(local(), now), pct = Math.min(100, Math.round(daily.done / DAILY_GOAL * 100));
  const plan = queue.length ? `這次 ${queue.length} 張${due?`：到期複習 ${due} 張`:''}${fresh?`${due?'、':'：'}新字 ${fresh} 張`:''}。無倒數，照自己的步調。` : '這一級目前沒有到期或未練的字卡，可以到下方自由瀏覽。';
  return `<div class="recall-intro"><div class="fcx-ring" style="--p:${pct}" role="img" aria-label="今日小目標 ${daily.done} / ${DAILY_GOAL} 張"><b>${daily.done}</b><span>/ ${DAILY_GOAL}</span></div><div class="fcx-intro-copy"><h3>把「看過」，變成「想得起來」</h3><p>${plan}</p><ul class="fcx-chips"><li>🔥 連續 ${daily.streak} 天</li><li>🌱 這一級已練 ${learned.toLocaleString('en-US')} / ${cards.length.toLocaleString('en-US')}</li></ul></div><button class="btn primary fcx-start" data-fc-recall="start" ${queue.length?'':'disabled'}>開始回想</button></div><details class="fcx-why"><summary>為什麼這樣練？</summary><ul><li><b>先想再看：</b>自己想過一次，比反覆看更能測出是否真的記得。</li><li><b>由易到難：</b>新字先認意思，熟了之後改成拼字、換句子、只聽聲音。</li><li><b>隔天再來：</b>依你的自評安排間隔；還要練的字明天優先出現。</li></ul><p class="small muted">電腦可用鍵盤：空白鍵翻面；1、2、3 評分。手機翻面後可左右滑動：左滑還要練，右滑想起來了。</p></details>`;
}
export function renderRecallStudio(cards, tiers=[]) {
  const queue = recallQueue(cards, readRecall(local()), direction);
  const active = session && session.tier === cards[0]?.tier && session.direction === direction;
  const current = active && session.cards[session.index] ? teachingCard(session.cards[session.index]) : null;
  const mode = `<div class="recall-modes" role="group" aria-label="回想方式">${[['smart','✨ 智慧混合'],['produce','中文 → 說英文'],['understand','英文 → 想意思']].map(([id,label])=>`<button class="btn ${direction===id?'primary':'quiet'}" data-fc-recall="${id}" aria-pressed="${direction===id}">${label}</button>`).join('')}</div>`;
  let body;
  if (active && !current) body = summaryView();
  else if (!current) body = introView(cards, queue);
  else {
    const type = session.type || (session.type = questionType(current, readRecall(local())));
    const total = session.cards.length, doneShare = session.index;
    const face = session.retrying ? retryFace(current, type) : session.revealed ? answerFace(current, type) :
      `<div class="recall-question fcx-card-q">${questionFace(current, type)}</div>`;
    body = `<div class="recall-progress"><span>${session.round>1?'再練一輪 · ':''}第 ${session.index+1} / ${total} 張</span><button class="fcx-exit" data-fc-recall="end" aria-label="結束這小組">✕</button></div><progress max="${total}" value="${doneShare}" aria-label="本次回想進度"></progress>${face}`;
    session.justRevealed = false;
  }
  const tierChoice = tiers.length && !current ? `<div class="recall-tiers" role="group" aria-label="選擇字集">${tiers.map(t=>`<button class="btn ${t.id===cards[0]?.tier?'primary':'quiet'} small" data-fc-tier="${t.id}" aria-pressed="${t.id===cards[0]?.tier}">${esc(t.name.replace(/^[^\p{L}\p{N}]+/u,''))}</button>`).join('')}</div>` : '';
  const head = current ? '' : `<header><div><span class="recall-eyebrow">主動回想 · 間隔複習</span><h1>每日單字小遠征</h1></div></header>`;
  return `<section class="recall-studio ${current?'is-session':''}" aria-label="雙向回想練習">${head}${tierChoice}${current?'':mode}${body}${notice&&!(active&&!current)?`<p role="status">${esc(notice)}</p>`:''}${current?'':`<p class="recall-note">複習安排依自評，各回想方式分開記錄；不影響闖關 XP。紀錄只保存在這個瀏覽器。</p>`}</section>`;
}
function advance() {
  session.index++;
  Object.assign(session, {revealed:false,typed:null,feedback:null,hint:0,type:null,draft:'',needsInput:false,
    retrying:false,retryOk:false,retryDraft:'',retryNote:''});
}
export function handleRecallAction(action, cards, render) {
  lastCards = cards; lastRender = render;
  if(action==='stop')return;
  notice = '';
  if (['produce','understand','smart'].includes(action)) {direction=action;session=null;}
  else if (action==='end') session=null;
  else if (action==='start') {const picked=recallQueue(cards,readRecall(local()),direction);session={tier:cards[0]?.tier,direction,cards:picked,index:0,revealed:false,typed:null,feedback:null,repaired:0,hint:0,type:null,results:[],round:1};}
  else if (action==='repair') {
    if(!session)return;
    const ids=new Set(session.results.filter(r=>r.rating==='again').map(r=>r.id));
    session={tier:session.tier,direction,cards:session.cards.filter(c=>ids.has(c.id)),index:0,revealed:false,typed:null,feedback:null,repaired:0,hint:0,type:null,results:[],round:(session.round||1)+1};
  }
  else {
    const c = session?.cards[session.index]; if(!c || session.tier!==cards[0]?.tier || session.direction!==direction)return;
    const shown = teachingCard(c);
    if (action==='hint') {
      if(session.revealed)return;
      session.draft = globalThis.document?.querySelector('#fc-recall-answer')?.value || '';
      session.needsInput = false;
      session.hint=Math.min(session.hint+1,answerOf(session.type,shown).length-1);
    } else if (action==='reveal' || action==='check') {
      if(session.revealed)return;
      const value = action==='check' ? (globalThis.document?.querySelector('#fc-recall-answer')?.value || '').slice(0,160) : null;
      if (action==='check' && !normalizeRecall(value)) {
        session.draft = value;
        session.needsInput = true;
      } else {
        session.revealed = true;
        session.justRevealed = true;
        session.typed = value;
        session.feedback = value===null ? null : spellingFeedback(value,answerOf(session.type,shown));
      }
    } else if (action==='retry-start') {
      if (!session.revealed || session.feedback?.ok!==false || session.retrying) return;
      Object.assign(session, {retrying:true,retryDraft:'',retryNote:''});
    } else if (action==='retry-back') {
      if (!session.retrying) return;
      session.retrying = false;
    } else if (action==='retry') {
      if (!session.retrying) return;
      const value = globalThis.document?.querySelector('#fc-recall-retry')?.value || '';
      const typed = normalizeRecall(value), expected = normalizeRecall(answerOf(session.type,shown));
      session.retryDraft = value;
      session.retryOk = typed === expected;
      session.retrying = !session.retryOk;
      if (!typed) session.retryNote = '先試著拼一次，再按核對。';
      else if (!session.retryOk) {
        let first = 0;
        while (first < expected.length && typed[first] === expected[first]) first++;
        session.retryNote = first === expected.length ? '正確的拼法已經完整，尾端多了字元。' :
          `從第 ${first + 1} 個字元開始有差異。你可以再試，或回去核對拼法。`;
      }
    } else if (['again','good','easy'].includes(action) && session.revealed && !session.retrying) {
      if(session.feedback?.ok===false && action!=='again')return;
      if(session.hint && action==='easy')return;
      const saved=recordRecall(local(),`word:${direction}:${c.id}`,action);
      if(!saved) notice='本機儲存不可用，這次複習安排未能保存。';
      if(action==='again')session.repaired++;
      session.results.push({id:c.id,word:shown.word,zh:shownZh(shown),rating:action});
      if(session.round===1)bumpDaily(local());
      advance();
    } else return;
  }
  render();
  if (action === 'retry-start') {
    globalThis.document?.querySelector('.recall-studio.is-session')?.scrollIntoView({block:'start'});
  }
  focusPanel();
}
// Keyboard and swipe reach the same actions as the buttons, so neither is the only way to do anything.
export function recallShortcut(key, cards, render) {
  if(!session||!session.cards[session.index]||session.tier!==cards[0]?.tier)return false;
  if (session.retrying) return false;
  const map=session.revealed?{'1':'again','2':'good','3':'easy'}:{' ':'reveal',enter:'reveal'};
  const action=map[key];if(!action)return false;
  const button=globalThis.document?.querySelector?.(`[data-fc-recall="${action}"]`);
  if(button?.disabled)return false;
  handleRecallAction(action,cards,render);return true;
}
if(typeof globalThis.document?.addEventListener==='function'){
  let start=null;
  globalThis.document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.defaultPrevented && !e.isComposing && e.keyCode !== 229) {
      const active = globalThis.document.activeElement;
      if (active?.id === 'fc-recall-answer' && !session?.revealed) {
        e.preventDefault();
        const btn = globalThis.document.querySelector('[data-fc-recall="check"]');
        if (btn && !btn.disabled) btn.click();
      } else if (active?.id === 'fc-recall-retry' && session?.revealed) {
        e.preventDefault();
        const btn = globalThis.document.querySelector('[data-fc-recall="retry"]');
        if (btn && !btn.disabled) btn.click();
      }
    }
  });
  globalThis.document.addEventListener('touchstart',e=>{const t=e.target?.closest?.('.recall-answer');start=t&&session?.revealed&&!e.target.closest('input,details,button')?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
  globalThis.document.addEventListener('touchend',e=>{
    if(!start||!lastCards||!lastRender)return;
    const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;
    if(Math.abs(dx)<80||Math.abs(dy)>Math.abs(dx)*.6)return;
    const action=dx<0?'again':'good',button=globalThis.document.querySelector(`[data-fc-recall="${action}"]`);
    if(!button||button.disabled)return;
    handleRecallAction(action,lastCards,lastRender);
  },{passive:true});
}
