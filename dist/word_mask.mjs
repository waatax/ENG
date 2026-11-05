// Finds the target word inside a sentence, including regular inflections, so it can be highlighted or blanked.
const ESC = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const INFLECTION = "(?:s|es|d|ed|ing|er|ers|est|ly|n|en|ies|ied|ier|iest|'s|’s)?";
function pattern(word) {
  const w = word.toLowerCase();
  const stem = w.length > 3 ? w.replace(/(e|y)$/, '') : w;
  const last = stem.slice(-1);
  const dropped = w.slice(stem.length);
  return `${ESC(stem)}(?:${dropped ? `${ESC(dropped)}|` : ''}${ESC(last)})?${INFLECTION}`;
}
export function findTarget(sentence, word) {
  const s = String(sentence ?? ''), w = String(word ?? '').trim();
  if (!s || !w) return null;
  const hit = re => { const m = re.exec(s); return m ? { start: m.index, end: m.index + m[0].length, token: m[0] } : null; };
  const exact = hit(new RegExp(`(?<![A-Za-z])${ESC(w)}(?![A-Za-z])`, 'i'));
  if (exact) return exact;
  const parts = w.split(/[\s-]+/).filter(Boolean);
  const body = parts.length === 1 ? pattern(parts[0]) : parts.map(p => pattern(p)).join('[\\s,-]+(?:and\\s+)?');
  return hit(new RegExp(`(?<![A-Za-z])${body}(?![A-Za-z])`, 'i'));
}
export function maskTarget(sentence, word, blank = '_____') {
  const t = findTarget(sentence, word);
  if (!t) return null;
  const s = String(sentence);
  return { masked: s.slice(0, t.start) + blank + s.slice(t.end), token: t.token };
}
