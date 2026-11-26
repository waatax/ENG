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

// Pedagogical spelling diagnostics & confusion analysis
function diagnoseSpellingTrap(a, b) {
  if (!a || !b) return '';
  // Vowel digraph rules: ie vs ei
  if ((b.includes('ie') && a.includes('ei')) || (b.includes('ei') && a.includes('ie'))) {
    return '對照這個字裡 i 和 e 的順序。「i before e except after c」對 piece、receive 有幫助，也有例外，例如 their、weird。';
  }
  // Adjacent transposition detection
  if (a.length === b.length) {
    for (let j = 0; j < a.length - 1; j++) {
      if (a[j] === b[j + 1] && a[j + 1] === b[j] && a.slice(0, j) === b.slice(0, j) && a.slice(j + 2) === b.slice(j + 2)) {
        return `相鄰字母順序顛倒：你寫了「${a.slice(j, j + 2)}」，正確應為「${b.slice(j, j + 2)}」。拼讀時依音節自然滑讀。`;
      }
    }
  }
  // Silent letters
  if (b.startsWith('kn') && !a.startsWith('kn')) return 'kn- 開頭的 k 為默音字母（不發音，如 know, knife, knight），發音從 /n/ 開始。';
  if (b.startsWith('wr') && !a.startsWith('wr')) return 'wr- 開頭的 w 為默音字母（不發音，如 write, wrong），發音為 /r/。';
  if (/(?:mb|bt)$/.test(b) && !/(?:mb|bt)$/.test(a)) return '字尾的 b 為默音字母（如 climb, thumb, doubt, debt），不發 /b/ 音。';
  if (/gn/.test(b) && !/gn/.test(a)) return 'gn 中的 g 為默音字母（如 sign, foreign, design），常發 /n/。';
  if (/^(talk|walk|half|calm|could|would|should)$/.test(b) && a === b.replace('l', '')) return '這個字的 l 是默音字母，拼寫時要保留。';
  if (/^(listen|castle|whistle|soften)$/.test(b) && !a.includes('t')) return '這個字的 t 通常是默音字母，拼寫時要保留。';
  if (/^(honest|hour|honor)$/.test(b) && a === b.slice(1)) return '這個字開頭的 h 不發音，拼寫時要保留。';
  if (/(?:receipt|psychology|pneumonia)/.test(b) && !/p/.test(a)) return '單字中的 p 為默音字母（如 receipt, psychology），不發 /p/ 音。';

  // Double consonants trap
  const doubles = ['tomorrow', 'recommend', 'accommodate', 'embarrass', 'necessary', 'separate', 'committee', 'success', 'occurred', 'beginning', 'parallel', 'disappoint', 'business', 'interrupt', 'address', 'possess'];
  for (const d of doubles) {
    if (b !== d) continue;
    for (const repeated of b.matchAll(/([b-df-hj-np-tv-z])\1/g)) {
      const shorter = b.slice(0, repeated.index) + b.slice(repeated.index + 1);
      if (a === shorter) return `「${b}」這裡有連續兩個「${repeated[1]}」，你少寫了一個。`;
    }
  }

  // -able vs -ible suffix trap
  if ((b.endsWith('able') && a.endsWith('ible')) || (b.endsWith('ible') && a.endsWith('able'))) {
    return '字尾 -able 與 -ible 辨析：獨立單詞後常接 -able（如 comfort ➔ comfortable）；詞根不可獨立時常接 -ible（如 visible, flexible, possible）。';
  }

  // -ance vs -ence suffix trap
  if ((b.endsWith('ance') && a.endsWith('ence')) || (b.endsWith('ence') && a.endsWith('ance')) || (b.endsWith('ant') && a.endsWith('ent')) || (b.endsWith('ent') && a.endsWith('ant'))) {
    return '字尾 -ance/-ant 與 -ence/-ent 辨析：源自不同拉丁動詞變化（如 importance vs difference），依詞群固定拼法強化記憶。';
  }

  // Common homophones / confusable pairs
  if ((a === 'there' && b === 'their') || (a === 'their' && b === 'there')) return '同音辨析：their（他們的，含 heir「繼承人」）；there（那裡，表地點）。';
  if ((a === 'its' && b === "it's") || (a === "it's" && b === 'its')) return "文法辨析：its 是所有格「它的」；it's 是「it is」或「it has」的縮寫。";
  if ((a === 'hear' && b === 'here') || (a === 'here' && b === 'hear')) return '同音辨析：hear（聽見，含 ear「耳朵」）；here（這裡，表地點）。';
  if ((a === 'weather' && b === 'whether') || (a === 'whether' && b === 'weather')) return '同音辨析：weather 是「天氣」；whether 是連接詞「是否」。';
  if ((a === 'loose' && b === 'lose') || (a === 'lose' && b === 'loose')) return '拼字辨析：lose（動詞：失去、輸掉）；loose（形容詞：寬鬆的）。';
  if ((a === 'quiet' && b === 'quite') || (a === 'quite' && b === 'quiet')) return '拼字辨析：quiet（形容詞：安靜的，-et）；quite（程度副詞：相當，-te）。';

  // Only name a cause the two spellings actually show.
  const ops = alignLetters(a, b), missing = ops.filter(o => o.kind === 'missing').map(o => o.ch), extra = ops.filter(o => o.kind === 'extra').map(o => o.ch);
  const vowel = /[aeiouy]/;
  if (missing.length === 1 && !extra.length) return `只少了字母「${missing[0]}」。先看少字的位置，再遮住整個單字拼一次。`;
  if (extra.length === 1 && !missing.length) return `多打了字母「${extra[0]}」。對照正確拼字，把多的字母拿掉再唸一次。`;
  if (missing.length === 1 && extra.length === 1 && vowel.test(missing[0]) && vowel.test(extra[0])) return `母音寫成「${extra[0]}」，應該是「${missing[0]}」。輕讀的母音聽起來很像，這類字要連拼法一起記。`;
  return '';
}
// Letter-level alignment (longest common subsequence), so one slip does not mark the rest of the word as wrong.
export function alignLetters(a, b) {
  const t = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) t[i][j] = a[i] === b[j] ? t[i + 1][j + 1] + 1 : Math.max(t[i + 1][j], t[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) { out.push({ kind: 'match', ch: a[i] }); i++; j++; }
    else if (j < b.length && (i >= a.length || t[i][j + 1] >= t[i + 1][j])) out.push({ kind: 'missing', ch: b[j++] });
    else out.push({ kind: 'extra', ch: a[i++] });
  }
  return out;
}

export function spellingFeedback(value, answer) {
  const a = normalizeRecall(value), b = normalizeRecall(answer);
  if (a === b) return {ok:true, text:'拼字正確！再用例句確認這個意思。', tip:'有空可出聲跟讀，再試著用這個字說一句話。'};
  if (!a) return {ok:false, text:'還想不起來也沒關係。先聽示範、看搭配，再遮住答案重說。', tip:'啟動主動提取：先聽發音拆解音節，再遮住重說一次。'};
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const baseText = i === a.length ? `前 ${i} 個字元相同，後面還少了「${b.slice(i)}」。對照完整拼字再試一次。` : i === b.length ? `正確拼字已經完整，後面多了「${a.slice(i)}」。` : `從第 ${i + 1} 個字元開始不同：你寫「${a[i]}」，示範是「${b[i]}」。也請核對整個字是否符合這個詞義。`;
  const tip = diagnoseSpellingTrap(a, b);
  // One row of letters: green kept, red struck out as extra, amber dashed where a letter is missing.
  const cls = { match: 'sp-match', extra: 'sp-mismatch', missing: 'sp-missing' };
  const diffHtml = `<span class="sp-row" aria-label="拼字比對：正確是 ${escapeHTML(b)}">${alignLetters(a, b).map(o => `<span class="${cls[o.kind]}">${escapeHTML(o.ch === ' ' ? ' ' : o.ch)}</span>`).join('')}</span><span class="sp-sep">➔ 正確為：</span><span class="sp-target">${escapeHTML(b)}</span>`;
  return {ok:false, text:baseText, tip, diffHtml};
}
