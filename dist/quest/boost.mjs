// 單元加油站: new practice for each unit. Five items at a time; a missed item returns once at the end of the round.
import { sfx } from './sound.mjs';
const KEY = 'eq_boost_v1', ROUND = 5, cache = new Map(), runs = new Map();
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const read = () => { try { return JSON.parse(globalThis.localStorage?.getItem(KEY) || '{}') || {}; } catch { return {}; } };
function markDone(unit, id) {
  const all = read(), done = new Set(all[unit] || []);
  done.add(id); all[unit] = [...done];
  try { globalThis.localStorage?.setItem(KEY, JSON.stringify(all)); } catch {}
}
// Same order for the same item within a round, but the answer is not always in the position it was written.
export function shuffled(options, seed) {
  let h = 2166136261;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.codePointAt(0), 16777619);
  const out = [...options];
  for (let i = out.length - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 13), 1274126177); const j = (h >>> 0) % (i + 1); [out[i], out[j]] = [out[j], out[i]]; }
  return out;
}
export function pickRound(items, doneIds, size = ROUND) {
  const done = new Set(doneIds), fresh = items.filter(x => !done.has(x.id));
  return (fresh.length ? fresh : items).slice(0, size);
}
const hasZh = s => /[㐀-鿿]/.test(String(s ?? ''));
const langOf = s => hasZh(s) ? '' : ' lang="en"';
export function boostIntro(unitId, items, doneCount) {
  const pct = items.length ? Math.round(doneCount / items.length * 100) : 0;
  return `<div class="boost-head"><div><p class="eyebrow">單元加油站 · 新題</p><h4>🚀 換個句子，再用一次</h4><p class="small muted">${items.length} 題本單元沒有出現過的新練習。每次 ${ROUND} 題，答錯會說明你選的為什麼不對，並在這輪最後再試一次。不扣愛心。</p></div><div class="boost-meter"><b>${doneCount}</b> / ${items.length}<div class="progress"><i style="width:${pct}%"></i></div></div></div><button class="btn primary" data-boost="start">${doneCount >= items.length ? '再挑戰一次' : doneCount ? '繼續練 →' : '開始練 →'}</button>`;
}
export function boostQuestion(run) {
  const it = run.queue[run.index], order = shuffled(it.options, `${it.id}:${run.index}`), picked = run.picked;
  const options = order.map(o => {
    const state = picked === null ? '' : o === it.answer ? 'right' : o === picked ? 'wrong' : 'dim';
    return `<button class="boost-opt ${state}" data-boost="pick" data-value="${esc(o)}"${langOf(o)} ${picked !== null ? 'disabled' : ''}>${esc(o)}</button>`;
  }).join('');
  let feedback = '';
  if (picked !== null) {
    const ok = picked === it.answer;
    feedback = `<div class="boost-feedback ${ok ? 'ok' : 'bad'}" role="status"><h5>${ok ? '✔ 答對了！' : '↻ 差一點，看看差在哪'}</h5>${ok ? '' : `<p class="boost-note"><b>你選的：</b><span${langOf(picked)}>${esc(picked)}</span><br>${esc(it.wrong?.[picked] || '')}</p><p><b>正確答案：</b><span${langOf(it.answer)}>${esc(it.answer)}</span></p>`}<p><b>為什麼：</b>${esc(it.why)}</p><p class="boost-tip">🧠 ${esc(it.tip)}</p>${it.say ? `<button class="btn small" data-act="prompt-say" data-text="${esc(it.say)}">🔊 聽正確句子</button> <button class="btn small" data-act="prompt-say" data-slow="1" data-text="${esc(it.say)}">🐢 慢速</button>` : ''}<button class="btn primary boost-next" data-boost="next">${run.index + 1 < run.queue.length ? '下一題 →' : '看這輪結果'}</button></div>`;
  }
  return `<div class="boost-top"><span>第 ${run.index + 1} / ${run.queue.length} 題${it._retry ? ' · 再試一次' : ''}</span><button class="link" data-boost="close">先收起來</button></div><div class="progress" aria-hidden="true"><i style="width:${Math.round(run.index / run.queue.length * 100)}%"></i></div><p class="boost-prompt">${esc(it.prompt)}</p>${it.text ? `<p class="boost-text"${langOf(it.text)}>${esc(it.text)}</p>` : ''}<div class="boost-options" role="group" aria-label="選項">${options}</div>${feedback}`;
}
export function boostSummary(run, items, doneCount) {
  const heading = run.missed === 0 ? '這輪全部一次答對！🎉' : '錯過的都再試過了，這就是進步 🌱';
  return `<div class="boost-summary"><h4>${heading}</h4><p>一次答對 ${run.firstRight} 題，再試後答對 ${run.missed} 題。累積完成 ${doneCount} / ${items.length} 題。</p><button class="btn primary" data-boost="start">${doneCount >= items.length ? '全部重新挑戰' : '再來 5 題 →'}</button> <button class="link" data-boost="close">先收起來</button></div>`;
}
export function applyPick(run, value) {
  const it = run.queue[run.index];
  if (run.picked !== null) return false;
  run.picked = value;
  const ok = value === it.answer;
  if (ok && !it._retry) run.firstRight++;
  if (!ok && !it._retry) { run.missed++; run.queue.push({ ...it, _retry: true }); }
  if (!ok && it._retry) run.queue.push({ ...it });
  return ok;
}
function paint(box) {
  const unit = box.dataset.boostUnit, items = cache.get(unit) || [], run = runs.get(unit);
  const done = (read()[unit] || []).length;
  if (!items.length) { box.hidden = true; return; }
  box.hidden = false;
  box.innerHTML = !run ? boostIntro(unit, items, Math.min(done, items.length)) : run.index >= run.queue.length ? boostSummary(run, items, Math.min(done, items.length)) : boostQuestion(run);
}
export async function mountBoosts(root = globalThis.document, version = '') {
  for (const box of root?.querySelectorAll?.('[data-boost-unit]') || []) {
    const unit = box.dataset.boostUnit;
    if (!box.dataset.boostBound) {
      box.dataset.boostBound = '1';
      box.addEventListener('click', event => {
        const b = event.target.closest('[data-boost]'); if (!b) return;
        const action = b.dataset.boost, items = cache.get(unit) || [], run = runs.get(unit);
        if (action === 'start') {
          const allDone = (read()[unit] || []).length >= items.length;
          runs.set(unit, { queue: pickRound(items, allDone ? [] : read()[unit] || []), index: 0, picked: null, firstRight: 0, missed: 0 });
        } else if (action === 'close') runs.delete(unit);
        else if (action === 'pick' && run) {
          const ok = applyPick(run, b.dataset.value);
          sfx(ok ? 'correct' : 'wrong');
          if (ok) markDone(unit, run.queue[run.index].id);
        } else if (action === 'next' && run) { run.index++; run.picked = null; }
        paint(box);
        box.querySelector('.boost-next,.boost-opt,[data-boost="start"]')?.focus?.({ preventScroll: action !== 'start' });
      });
    }
    if (!cache.has(unit)) {
      try { const r = await fetch(`boost/${encodeURIComponent(unit)}.json?v=${version}`); cache.set(unit, r.ok ? await r.json() : []); }
      catch { cache.set(unit, []); }
    }
    paint(box);
  }
}
