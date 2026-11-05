// Shared rules for the flashcard content gate. A field is rejected for what it fails to teach, not for its origin.
export const BANNED_TIP = /核心意義指向|音節分解|音節拆解|會考焦點|自然拼讀：|注意搭配詞用法|留意字母拼讀節奏|常見於|掌握搭配詞|高頻詞|【[^】]*】/;
export const BANNED_COLLOCATION = /^(an? important |an? useful )|effectively\s*\/\s*carefully|condition\s*\/\s*outcome|\bdemonstrated\b\s*\(/i;
const ESC = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Inflected forms count as the target word: prefer → preferred, study → studied, mouse → mice is the only kind this misses.
export function stems(word) {
  const w = word.toLowerCase().trim();
  const parts = w.split(/[\s-]+/).filter(p => p.length > 2 && !['the', 'and', 'for', 'with', 'from', 'into'].includes(p));
  return (parts.length ? parts : [w]).map(p => {
    if (p.length <= 4) return p.replace(/(e|y)$/, '');
    return p.replace(/(ies|ied|ing|ed|es|s|e|y)$/, '');
  });
}
export function containsWord(sentence, word) {
  const s = String(sentence ?? '').toLowerCase();
  return stems(word).every(stem => new RegExp(`(^|[^a-z])${ESC(stem)}`).test(s));
}
export const maskWord = (sentence, word) => String(sentence ?? '').toLowerCase().replace(new RegExp(ESC(word.toLowerCase()), 'g'), '_').replace(/\s+/g, ' ').trim();

const WORD_LIMIT = { elem_1000: 12, jhs_2000: 15, shs_3000: 20, toeic: 22, toefl: 24, sat: 24, gre: 24, gmat: 24 };
const IPA_OK = /^\/[a-zɑɒæɐʌəɚɝɛɜɪʊɔθðʃʒŋɡɹɾʔˈˌː.̩̬̃ ()-]+\/$/;
// Letters that never appear in the English IPA used here, or a final silent -e left over from a spelling-to-sound guess.
const IPA_GUESS = /[cqxy]|[bcdfgklmnprstvz]e\/$/;

export function ipaProblem(ipa) {
  const v = String(ipa ?? '').trim();
  if (!v) return 'empty';
  if (!IPA_OK.test(v)) return 'chars';
  if (IPA_GUESS.test(v.replace(/[ˈˌː.]/g, ''))) return 'guess';
  return '';
}

export function rowProblems(row, card, { requireExample = true } = {}) {
  const out = [];
  if (requireExample) {
    const ex = String(row.example ?? '').trim();
    const n = ex.split(/\s+/).length, limit = WORD_LIMIT[card.tier] ?? 22;
    if (!ex) out.push('example empty');
    else {
      if (!containsWord(ex, card.word)) out.push('example misses target word');
      if (n < 4) out.push('example too short');
      if (n > limit + 2) out.push(`example too long (${n}>${limit})`);
      if (!/[.!?"”]$/.test(ex)) out.push('example needs end punctuation');
      if (/[㐀-鿿]/.test(ex)) out.push('example has Chinese');
    }
    const zh = String(row.exampleZh ?? '').trim();
    if (!/[㐀-鿿]/.test(zh) || zh.length < 4) out.push('exampleZh missing');
    if (/[a-z]{6,}/i.test(zh.replace(/[A-Z][a-z]+/g, '')) && !/[a-z]{2,}/i.test(card.word)) out.push('exampleZh has English');
  }
  const col = String(row.collocation ?? '').trim();
  if (!col) out.push('collocation empty');
  else {
    if (BANNED_COLLOCATION.test(col)) out.push('collocation template');
    if (!containsWord(col, card.word)) out.push('collocation misses word');
    if (col.length > 70) out.push('collocation too long');
  }
  const tip = String(row.tip ?? '').trim();
  if (!tip) out.push('tip empty');
  else {
    if (BANNED_TIP.test(tip)) out.push('tip template');
    if (tip.length > 70) out.push('tip too long');
    if (tip.length < 6) out.push('tip too short');
  }
  if (row.ipa !== undefined) { const p = ipaProblem(row.ipa); if (p) out.push('ipa ' + p); }
  if (row.chunk !== undefined && row.chunk.trim()) {
    const joined = row.chunk.toLowerCase().replace(/[^a-z]/g, ''), target = card.word.toLowerCase().replace(/[^a-z]/g, '');
    if (joined !== target) out.push('chunk does not spell the word');
  }
  return out;
}

// A sentence frame shared by several different target words is a generated template, whichever script wrote it.
export function templateFrames(cards, min = 3) {
  const frames = new Map();
  for (const c of cards) {
    const f = maskWord(c.example, c.word);
    if (!frames.has(f)) frames.set(f, []);
    frames.get(f).push(c);
  }
  // Very short sentences ("The soup is hot.") repeat naturally; the generated frames were long.
  return [...frames.entries()].filter(([f, list]) => f.split(' ').length >= 6 && new Set(list.map(c => c.word.toLowerCase())).size >= min);
}
const isZhRun = zh => /^[一-鿿]{8,}$/.test(zh);
export function cardFlags(cards) {
  const bad = new Set(templateFrames(cards).flatMap(([, list]) => list.map(c => c.id)));
  return cards.map(c => ({
    id: c.id, tier: c.tier,
    exampleTemplate: bad.has(c.id),
    collocationTemplate: !c.collocation || BANNED_COLLOCATION.test(c.collocation),
    tipTemplate: !c.memoryTip || BANNED_TIP.test(c.memoryTip),
    ipaProblem: ipaProblem(c.ipa),
    zhRun: isZhRun(c.zh) && !c.gloss
  }));
}
