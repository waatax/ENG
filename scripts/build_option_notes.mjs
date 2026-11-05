// Gives each wrong option its own explanation (item.wrong) and replaces hollow explanations with real card content.
// Only facts already in the data are used: a dictionary lookup or an existing bilingual sentence. If neither exists, nothing is written.
// Usage: node scripts/build_option_notes.mjs [--dry] [--export=<dir>]
import fs from 'node:fs';
import path from 'node:path';
import { diagnose, makeGlossary } from '../dist/quest/coach.mjs';
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
const { FLASHCARD_DATABASE: cards } = await import('../dist/flashcards.mjs');
const DIR = 'dist/quest/course/', dry = process.argv.includes('--dry');
const exportDir = (process.argv.find(a => a.startsWith('--export=')) || '').split('=')[1];
const index = JSON.parse(fs.readFileSync(DIR + 'index.json', 'utf8'));
const tracks = [...index.sections, ...index.branches].map(t => t.id);
const files = new Map(tracks.map(id => [id, JSON.parse(fs.readFileSync(DIR + id + '.json', 'utf8'))]));
const hasZh = s => /[㐀-鿿]/.test(String(s ?? ''));
const clean = s => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' -]/g, ' ').replace(/\s+/g, ' ').trim();
const shown = c => c.gloss || c.zh;
const byWord = new Map(), byZh = new Map(), byId = new Map(cards.map(c => [c.id, c]));
for (const c of cards) {
  const w = clean(c.word);
  if (!byWord.has(w)) byWord.set(w, c);
  for (const m of [c.zh, c.gloss, ...String(shown(c)).split(/[；;、,，]/)]) { const k = String(m ?? '').trim(); if (k && !byZh.has(k)) byZh.set(k, c.word); }
}
function lookup(word) {
  const w = clean(word);
  if (byWord.has(w)) return byWord.get(w);
  for (const [re, to] of [[/ies$/, 'y'], [/ied$/, 'y'], [/ier$/, 'y'], [/iest$/, 'y'], [/ily$/, 'y'], [/es$/, ''], [/s$/, ''], [/ed$/, ''], [/ed$/, 'e'], [/d$/, ''], [/ing$/, ''], [/ing$/, 'e'], [/ly$/, ''], [/er$/, ''], [/est$/, '']]) {
    if (!re.test(w)) continue;
    const c = byWord.get(w.replace(re, to)) || byWord.get(w.replace(re, to).replace(/(.)\1$/, '$1'));
    if (c) return c;
  }
  return null;
}
// Bilingual sentence pairs that already exist in the course.
const zhToEn = new Map(), enToZh = new Map();
const allItems = [...files.values()].flatMap(f => Object.values(f.items || {}));
for (const q of allItems) {
  if (q.type === 'listen' && q.audio && !hasZh(q.audio) && hasZh(q.answer)) { if (!zhToEn.has(q.answer)) zhToEn.set(q.answer, q.audio); if (!enToZh.has(clean(q.audio))) enToZh.set(clean(q.audio), q.answer); }
  const m = /^([^｜]*[A-Za-z][^｜]*)｜([^｜。]+)/.exec(String(q.why ?? ''));
  if (m && !hasZh(m[1]) && hasZh(m[2])) { if (!zhToEn.has(m[2].trim())) zhToEn.set(m[2].trim(), m[1].trim()); if (!enToZh.has(clean(m[1]))) enToZh.set(clean(m[1]), m[2].trim()); }
}
function noteFor(q, option) {
  const answer = String(q.answer ?? '');
  if (hasZh(option)) {
    const en = zhToEn.get(option) || byZh.get(option);
    const source = q.audio || q.text || '';
    if (!en) return '';
    if (source && !hasZh(source)) return `你選的「${option}」，英文是「${en}」；題目的英文是「${source}」，意思是「${answer}」。`;
    return `你選的「${option}」，英文是「${en}」，和題目要的「${answer}」不同。`;
  }
  const mine = lookup(option), target = lookup(answer);
  const zhOpt = enToZh.get(clean(option)), zhAns = enToZh.get(clean(answer));
  if (zhOpt) return `你選的「${option}」意思是「${zhOpt}」${zhAns ? `；正確答案「${answer}」意思是「${zhAns}」` : ''}。對照題目要的情境，看哪一句才答得上。`;
  if (clean(option).split(' ').length > 5) return '';
  if (mine) return `「${option}」的意思是「${shown(mine)}」${target ? `；這裡要的是「${answer}」（${shown(target)}）` : `，放進這裡不符合句意或用法；正確答案是「${answer}」`}。`;
  return '';
}
const gloss = makeGlossary(allItems);
const HOLLOW = /先確認詞義，再配合本單元情境練習。?/, META = /(原創閱讀練習|原創)[^。]*(不聲稱|官方)[^。]*。?/;
const authoredNotes = {};
if (fs.existsSync('data/option_notes/out')) for (const f of fs.readdirSync('data/option_notes/out').filter(x => x.endsWith('.json'))) Object.assign(authoredNotes, JSON.parse(fs.readFileSync('data/option_notes/out/' + f, 'utf8')));
const stats = { options: 0, ruleCovered: 0, authored: 0, added: 0, remaining: 0, whyFixed: 0, metaFixed: 0 };
const remaining = {};
for (const [track, file] of files) {
  for (const q of Object.values(file.items || {})) {
    const catalog = byId.get(q.contentSource?.catalogId);
    if (catalog && q.kind === 'word' && (HOLLOW.test(q.why ?? '') || q.whyFromCard)) {
      q.why = `${catalog.word}${catalog.ipa ? ` ${catalog.ipa}` : ''}：${shown(catalog)}。搭配：${catalog.collocation}。例：${catalog.example}（${catalog.exampleZh}）`;
      q.whyFromCard = true; stats.whyFixed++;
    }
    if (META.test(q.why ?? '')) { q.why = q.why.replace(META, '').trim() || '先回到文本找出支持答案的句子，再判斷各選項。'; stats.metaFixed++; }
    if (!q.options || !['choice', 'listen'].includes(q.type)) continue;
    const authored = authoredNotes[q.id] || {};
    const notes = {};
    for (const o of q.options) {
      if (String(o) === String(q.answer)) continue;
      stats.options++;
      if (authored[o]) { notes[o] = authored[o]; stats.authored++; continue; }
      const probe = { ...q }; delete probe.wrong;
      if (diagnose(probe, o, { gloss })) { stats.ruleCovered++; continue; }
      const note = noteFor(q, String(o));
      if (note) { notes[o] = note; stats.added++; }
      else { stats.remaining++; (remaining[track] ||= new Map()).set(q.id, q); }
    }
    if (Object.keys(notes).length) q.wrong = notes; else delete q.wrong;
  }
  if (!dry) fs.writeFileSync(DIR + track + '.json', JSON.stringify(file));
}
stats.coverage = +((stats.options - stats.remaining) / stats.options * 100).toFixed(1);
console.log(JSON.stringify(stats));
console.log(Object.entries(remaining).map(([t, m]) => `${t}:${m.size}`).join(' '));
if (exportDir) {
  fs.mkdirSync(exportDir, { recursive: true });
  const rows = Object.values(remaining).flatMap(m => [...m.values()]).map(q => ({ id: q.id, prompt: q.prompt, text: q.text, passage: q.passage ? String(q.passage).slice(0, 1000) : undefined, audio: q.audio, answer: q.answer, options: q.options, why: q.why }));
  const seen = new Set(), unique = rows.filter(r => !seen.has(r.id) && seen.add(r.id));
  for (let i = 0, n = 1; i < unique.length; i += 150, n++) fs.writeFileSync(path.join(exportDir, 'n' + String(n).padStart(2, '0') + '.json'), JSON.stringify(unique.slice(i, i + 150), null, 0));
  console.log('items', unique.length, 'files', Math.ceil(unique.length / 150));
}
