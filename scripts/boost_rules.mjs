// Shared rules for 單元加油站 items. Used by the author checker and by the release test.
const hasZh = s => /[㐀-鿿]/.test(String(s ?? ''));
export const normalizePrompt = s => String(s ?? '').toLowerCase().replace(/[^a-z0-9㐀-鿿]+/g, '');
export function boostItemProblems(item) {
  const out = [], opts = item.options;
  if (!item.id) out.push('no id');
  if (!['fix', 'situation', 'cloze', 'meaning'].includes(item.type)) out.push('bad type');
  if (!String(item.prompt ?? '').trim()) out.push('no prompt');
  if (!Array.isArray(opts) || opts.length < 3 || opts.length > 4) out.push('needs 3-4 options');
  else {
    if (new Set(opts.map(normalizePrompt)).size !== opts.length) out.push('duplicate options');
    if (!opts.includes(item.answer)) out.push('answer not in options');
    for (const o of opts) {
      if (o === item.answer) continue;
      const note = item.wrong?.[o];
      if (!note) out.push(`no note for "${o}"`);
      else if (!hasZh(note) || note.length < 10) out.push(`weak note for "${o}"`);
    }
    if (item.wrong && Object.keys(item.wrong).some(k => !opts.includes(k) || k === item.answer)) out.push('note for a non-wrong option');
  }
  if (!hasZh(item.why) || String(item.why).length < 10) out.push('why missing');
  if (!hasZh(item.tip) || String(item.tip).length < 6 || String(item.tip).length > 60) out.push('tip must be 6-60 chars');
  if (/先確認詞義|原創|不聲稱|本單元情境/.test(`${item.why}${item.tip}`)) out.push('filler text');
  if (item.type === 'cloze' && !/_{3,}/.test(`${item.prompt} ${item.text ?? ''}`)) out.push('cloze needs ___');
  if (item.say && hasZh(item.say)) out.push('say must be English');
  return out;
}
export function boostTarget(lab) {
  return Math.ceil((lab.baseline + lab.cards.length + lab.phrases.length + lab.missions.length) * 0.1);
}
