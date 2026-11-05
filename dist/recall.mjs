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
    return '記憶口訣：「i before e except after c」（在 c 後寫 ei，如 receive、ceiling；其餘多拼 ie，如 believe、piece）。';
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
  if (/(?:talk|walk|half|calm|could|would|should)/.test(b) && !/l/.test(a)) return '單字中的 l 為默音字母，發長母音而不發 /l/ 音。';
  // Double consonants trap
  const doubles = ['tomorrow', 'recommend', 'accommodate', 'embarrass', 'necessary', 'separate', 'committee', 'success', 'occurred', 'beginning', 'parallel'];
  for (const d of doubles) {
    if (b.includes(d)) return `注意雙重子音：「${d}」含有特別的雙字母拼寫規則，依音節分段記憶更不易出錯。`;
  }
  // Common vowel schwa / weak syllables
  if (b.length >= 5 && a.length >= 4) {
    return '非重音節的弱讀母音（/ə/）常是拼寫易錯點，可拆分音節並大聲唸出標準拼音。';
  }
  return '';
}

export function spellingFeedback(value, answer) {
  const a = normalizeRecall(value), b = normalizeRecall(answer);
  if (a === b) return {ok:true, text:'拼字正確！再用例句確認這個意思。', tip:'自然發音與拼字完美對齊！建議出聲跟讀一次，鞏固大腦發音記憶。'};
  if (!a) return {ok:false, text:'還想不起來也沒關係。先聽示範、看搭配，再遮住答案重說。', tip:'啟動主動提取：先聽發音拆解音節，再遮住重說一次。'};
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const baseText = i === a.length ? `前 ${i} 個字元相同，後面還少了「${b.slice(i)}」。對照完整拼字再試一次。` : i === b.length ? `正確拼字已經完整，後面多了「${a.slice(i)}」。` : `從第 ${i + 1} 個字元開始不同：你寫「${a[i]}」，示範是「${b[i]}」。也請核對整個字是否符合這個詞義。`;
  const tip = diagnoseSpellingTrap(a, b);
  // Structured visual diff
  let diffHtml = '';
  if (i === a.length) {
    diffHtml = `<span class="sp-match">${escapeHTML(a)}</span><span class="sp-missing">…缺少「${escapeHTML(b.slice(i))}」</span>`;
  } else if (i === b.length) {
    diffHtml = `<span class="sp-match">${escapeHTML(b)}</span><span class="sp-mismatch">…多出「${escapeHTML(a.slice(i))}」</span>`;
  } else {
    diffHtml = `<span class="sp-match">${escapeHTML(a.slice(0, i))}</span><span class="sp-mismatch">${escapeHTML(a[i])}</span>${escapeHTML(a.slice(i + 1))} <span class="sp-sep">➔ 正確為：</span><span class="sp-match">${escapeHTML(b.slice(0, i))}</span><span class="sp-target">${escapeHTML(b[i])}</span>${escapeHTML(b.slice(i + 1))}`;
  }
  return {ok:false, text:baseText, tip, diffHtml};
}
