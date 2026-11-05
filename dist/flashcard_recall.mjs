import {readRecall, recordRecall, recallQueue, spellingFeedback, escapeHTML as esc} from './recall.mjs?v=joy20261103';
import {teachingCard} from './flashcard_quality.mjs';
let direction = 'produce', session = null, notice = '';
export function recallActive(tier) {return !!(session && session.tier===tier && session.cards[session.index]);}
const local = () => {try {return globalThis.localStorage;} catch {return null;}};
function focusPanel() { globalThis.document?.querySelector('#recall-focus')?.focus({preventScroll:true}); }
export function renderRecallStudio(cards, tiers=[]) {
  const queue = recallQueue(cards, readRecall(local()), direction);
  const active = session && session.tier === cards[0]?.tier && session.direction === direction;
  const c = active && session.cards[session.index] ? teachingCard(session.cards[session.index]) : null;
  const mode = `<div class="recall-modes" role="group" aria-label="回想方向"><button class="btn ${direction==='produce'?'primary':'quiet'}" data-fc-recall="produce" aria-pressed="${direction==='produce'}">中文 → 說英文</button><button class="btn ${direction==='understand'?'primary':'quiet'}" data-fc-recall="understand" aria-pressed="${direction==='understand'}">英文 → 想意思</button></div>`;
  let body;
  if (active && !c) body = `<div class="recall-finish"><span aria-hidden="true">🌿</span><h3 id="recall-focus" tabindex="-1">今天又多留住一點英文</h3><p>完成 ${session.index} 張雙向回想中的「${direction==='produce'?'中文說英文':'英文想意思'}」。${session.repaired} 張選擇再練。${notice}</p><p>明天換個時間再想一次，比一直翻看更能檢查記憶。</p><button class="btn primary" data-fc-recall="start">再練一小組</button></div>`;
  else if (!c) body = `<div class="recall-intro"><div><h3>把「看過」，變成「想得起來」</h3><p>一次最多 10 張，優先到期的字。先回想、聽示範、核對用法，再安排下次複習。</p><small>${queue.length ? `這次可練 ${queue.length} 張 · 無倒數，照自己的步調` : '目前沒有到期或未練字卡，可以使用下方閃卡自由探索。'}</small></div><button class="btn primary" data-fc-recall="start" ${queue.length?'':'disabled'}>開始回想 →</button></div>`;
  else {
    const revealed = session.revealed;
    const prompt = direction==='produce' ? c.zh : c.word;
    body = `<div class="recall-progress"><span>回想 ${session.index+1} / ${session.cards.length}</span><span>先想，再揭曉</span></div><progress max="${session.cards.length}" value="${session.index}" aria-label="本次回想進度"></progress><div class="recall-question"><p class="recall-label">${direction==='produce'?'看意思，試著說出英文與拼字':'看英文，試著說出意思和使用場合'}</p><h3 id="recall-focus" tabindex="-1" ${direction==='understand'?'lang="en"':''}>${esc(prompt)}</h3><button class="btn quiet small" data-fc-${direction==='produce'?'speak-zh':'speak-word'}="${esc(prompt)}" aria-label="朗讀回想題目">🔊 聽題目</button>${!revealed && direction==='produce' ? `<label for="fc-recall-answer">試著拼寫（也可以先在心裡想）</label><input id="fc-recall-answer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="在這裡輸入英文…" maxlength="160"><button class="btn primary" data-fc-recall="check">核對我的拼字</button>`:''}${!revealed?`<button class="btn quiet" data-fc-recall="reveal">我想過了，看示範${direction==='produce'?'／還想不起來':''}</button>`:''}</div>${revealed ? `<div class="recall-answer" role="status"><p class="recall-label">示範與用法</p><h3 lang="en">${c.icon ? `<span class="recall-card-ic">${c.icon}</span> ` : ''}${esc(c.word)} <button class="btn quiet small" data-fc-speak-word="${esc(c.word)}" aria-label="聽英文答案">🔊</button><button class="btn quiet small" data-fc-speak-word-slow="${esc(c.word)}" aria-label="慢速聽英文答案">🐢</button></h3>${c.chunk || c.ipa ? `<div class="recall-phonics" style="margin:4px 0 8px;font-size:14px;color:#2563eb;font-weight:600"><span>${esc(c.chunk || '')}</span> <span style="color:#64748b;margin-left:6px;font-family:monospace">${esc(c.ipa || '')}</span></div>` : ''}<p><b>${esc(c.pos)}</b> · ${esc(c.zh)} <button class="btn quiet small" data-fc-speak-zh="${esc(c.zh)}" aria-label="聽中文意思">🔊</button></p>${session.typed!==null?`<div class="recall-diagnosis ${session.feedback?.ok?'good':'retry'}">${session.feedback?.diffHtml?`<div class="sp-diff-box" style="margin-bottom:6px">${session.feedback.diffHtml}</div>`:''}<p class="sp-msg" style="margin:4px 0">${esc(session.feedback?.text)}</p>${session.typed?`<p class="sp-typed-line" style="margin:4px 0;font-size:13px;color:#64748b">你的拼字：<span lang="en" class="recall-typed">${esc(session.typed)}</span></p>`:''}${session.feedback?.tip?`<div class="recall-tip" style="margin-top:6px;font-size:12px;background:#eff6ff;padding:6px 10px;border-radius:6px;border-left:3px solid #3b82f6;color:#1e3a8a">💡 <b>記憶與發音解析：</b>${esc(session.feedback.tip)}</div>`:''}</div>`:''}${c.collocation?`<p class="recall-collocation"><b>一起記的搭配</b><br>${esc(c.collocation)}</p>`:''}${c.example?`<p lang="en">${esc(c.example)} <button class="btn quiet small" data-fc-speak-sentence="${esc(c.example)}" aria-label="聽例句">🔊</button></p><p class="muted">${esc(c.exampleZh)}</p>`:''}${c.memoryTip?`<div class="recall-memory-tip" style="margin:8px 0;font-size:13px;background:#f8fafc;padding:8px 12px;border-radius:8px;border-left:3px solid #10b981;color:#1e293b">🧠 <b>深層記憶要點：</b>${esc(c.memoryTip)}</div>`:''}<p class="small">換你說：把這個字放進與自己有關的一句話。拼對只代表這次拼寫核對成功。</p><p class="recall-label">遮住示範，這次自己想得起來嗎？</p><div class="recall-ratings"><button class="btn quiet" data-fc-recall="again">🌱 還要練<span>明天再想</span></button><button class="btn primary" data-fc-recall="good" ${session.feedback?.ok===false?'disabled':''}>✓ 想起來了<span>依進度間隔複習</span></button><button class="btn quiet" data-fc-recall="easy" ${session.feedback?.ok===false?'disabled':''}>✦ 很熟悉<span>拉長複習間隔</span></button></div></div>`:''}<button class="btn quiet small" data-fc-recall="end">結束這小組</button>`;
  }
  const tierChoice=tiers.length?`<div class="recall-tiers" role="group" aria-label="回想字集">${tiers.map(t=>`<button class="btn ${t.id===cards[0]?.tier?'primary':'quiet'} small" data-fc-tier="${t.id}" aria-pressed="${t.id===cards[0]?.tier}">${esc(t.name.replace(/^[^\p{L}\p{N}]+/u,''))}</button>`).join('')}</div>`:'';
  return `<section class="recall-studio" aria-label="雙向回想練習"><header><div><span class="recall-eyebrow">DAILY WORD QUEST</span><h1>每日單字小遠征 <span aria-hidden="true">✦</span></h1></div><span class="recall-badge">回想 · 用法 · 間隔</span></header>${tierChoice}${mode}${body}<button class="btn quiet small" data-fc-recall="stop">停止朗讀</button>${notice?`<p role="status">${esc(notice)}</p>`:''}<p class="recall-note">複習安排依自評，兩個方向分開記錄；不影響原有掌握標記與闖關 XP。紀錄保存在此瀏覽器。</p></section>`;
}
export function handleRecallAction(action, cards, render) {
  if(action==='stop')return;
  notice = '';
  if (['produce','understand'].includes(action)) {direction=action;session=null;}
  else if (action==='end') session=null;
  else if (action==='start') {const picked=recallQueue(cards,readRecall(local()),direction);session={tier:cards[0]?.tier,direction,cards:picked,index:0,revealed:false,typed:null,repaired:0};}
  else {
    const c = session?.cards[session.index]; if(!c || session.tier!==cards[0]?.tier || session.direction!==direction)return;
    if (action==='reveal' || action==='check') {
      if(session.revealed)return;
      session.revealed=true;
      session.typed = action==='check' ? (globalThis.document?.querySelector('#fc-recall-answer')?.value || '').slice(0,160) : null;
      session.feedback = session.typed!==null ? spellingFeedback(session.typed,c.word) : null;
    } else if (['again','good','easy'].includes(action) && session.revealed) {
      if(session.feedback?.ok===false && action!=='again')return;
      const saved=recordRecall(local(),`word:${direction}:${c.id}`,action);
      if(!saved) notice='本機儲存不可用，這次複習安排未能保存。';
      if(action==='again')session.repaired++;
      session.index++;session.revealed=false;session.typed=null;session.feedback=null;
    } else return;
  }
  render();focusPanel();
}
