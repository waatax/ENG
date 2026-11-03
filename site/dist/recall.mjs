// Browser-local self-assessment schedule; deliberately separate from XP and exam scores.
export const RECALL_KEY = 'eq_recall_v1';
const DAY = 86400000;
export function readRecall(storage) {
  try {
    const value = JSON.parse(storage?.getItem(RECALL_KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch { return {}; }
}
export function scheduleRecall(previous, rating, now = Date.now()) {
  if (!['again', 'good', 'easy'].includes(rating)) return null;
  const old = Number.isInteger(previous?.step) ? Math.max(0, Math.min(4, previous.step)) : -1;
  const sameDay = Number.isFinite(previous?.reviewed) && now - previous.reviewed < DAY && now >= previous.reviewed;
  const step = rating === 'again' ? 0 : sameDay ? Math.max(0, old) : Math.min(4, old + (rating === 'easy' ? 2 : 1));
  const days = [1, 3, 7, 14, 30][step];
  return {step, days, due: now + days * DAY, reviewed: now, rating};
}
export function recordRecall(storage, id, rating, now = Date.now()) {
  if (typeof storage?.setItem !== 'function') return null;
  const state = readRecall(storage);
  const next = scheduleRecall(state[id], rating, now);
  if (!next || !id) return null;
  state[id] = next;
  try { storage?.setItem(RECALL_KEY, JSON.stringify(state)); return next; }
  catch { return null; }
}
export function recallQueue(cards, state, direction, limit = 10, now = Date.now()) {
  const key = c => `word:${direction}:${c.id}`;
  const usable = state && typeof state === 'object' ? state : {};
  return cards.filter(c => !Number.isFinite(usable[key(c)]?.due) || usable[key(c)].due <= now)
    .sort((a, b) => {
      const x = usable[key(a)], y = usable[key(b)];
      return (Number.isFinite(x?.due) ? x.due : Infinity) - (Number.isFinite(y?.due) ? y.due : Infinity);
    }).slice(0, limit);
}
export const escapeHTML = text => String(text ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const normalizeRecall = text => String(text ?? '').normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
export function spellingFeedback(value, answer) {
  const a = normalizeRecall(value), b = normalizeRecall(answer);
  if (a === b) return {ok:true, text:'拼字正確！再用例句確認這個意思。'};
  if (!a) return {ok:false, text:'還想不起來也沒關係。先聽示範、看搭配，再遮住答案重說。'};
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return {ok:false, text: i === a.length ? `前 ${i} 個字元相同，後面還少了「${b.slice(i)}」。對照完整拼字再試一次。` : i === b.length ? `正確拼字已經完整，後面多了「${a.slice(i)}」。` : `從第 ${i + 1} 個字元開始不同：你寫「${a[i]}」，示範是「${b[i]}」。也請核對整個字是否符合這個詞義。`};
}
