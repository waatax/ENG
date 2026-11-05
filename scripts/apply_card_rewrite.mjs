// Merges validated authored rows into dist/flashcards.mjs. Invalid or unfinished rows are skipped and counted, never forced in.
// `zh` stays untouched because recorded MP3s speak it; cleaned meanings go to the display-only `gloss` field.
import fs from 'node:fs';
import path from 'node:path';
import { rowProblems } from './card_quality_rules.mjs';
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
const FILE = 'dist/flashcards.mjs', OUT = 'data/card_rewrite/out';
const { FLASHCARD_DATABASE: db } = await import('../' + FILE);
const byId = new Map(db.map(c => [c.id, c]));
const stats = { full: 0, light: 0, skipped: 0 }, skipped = [];
for (const part of fs.readdirSync(OUT).filter(f => f.endsWith('.tsv')).sort()) {
  const kind = part.startsWith('full') ? 'full' : 'light';
  for (const raw of fs.readFileSync(path.join(OUT, part), 'utf8').split('\n')) {
    if (!raw.trim()) continue;
    const f = raw.replace(/\r$/, '').split('\t');
    const row = kind === 'full' ? { id: f[0], example: f[1], exampleZh: f[2], collocation: f[3], tip: f[4], ipa: f[5], chunk: f[6], gloss: f[7] || '' } : { id: f[0], collocation: f[1], tip: f[2], ipa: f[3], chunk: f[4], gloss: f[5] || '' };
    const card = byId.get(row.id);
    const problems = card ? rowProblems(row, card, { requireExample: kind === 'full' }) : ['unknown id'];
    if (problems.length) { stats.skipped++; skipped.push(`${row.id}: ${problems.join('; ')}`); continue; }
    if (kind === 'full') { card.example = row.example.trim(); card.exampleZh = row.exampleZh.trim(); }
    card.collocation = row.collocation.trim();
    card.memoryTip = row.tip.trim();
    card.ipa = row.ipa.trim();
    if (row.chunk.trim()) card.chunk = row.chunk.trim();
    if (row.gloss.trim() && /^[一-鿿]{8,}$/.test(card.zh)) card.gloss = row.gloss.trim();
    stats[kind]++;
  }
}
// Meanings that were simply wrong in the source. zh stays because the MP3 speaks it; the screen shows the corrected gloss.
for (const [id, gloss] of Object.entries(JSON.parse(fs.readFileSync('data/card_rewrite/gloss_overrides.json', 'utf8')))) if (byId.has(id)) byId.get(id).gloss = gloss;
const src = fs.readFileSync(FILE, 'utf8');
const startMark = 'export const FLASHCARD_DATABASE = [';
const a = src.indexOf(startMark);
const b = src.indexOf('\n];', a);
if (a < 0 || b < 0) throw Error('database markers not found');
fs.writeFileSync(FILE, src.slice(0, a) + startMark + '\n' + db.map(c => JSON.stringify(c)).join(',\n') + src.slice(b));
console.log(JSON.stringify(stats));
if (skipped.length) console.log(skipped.slice(0, 20).join('\n'));
