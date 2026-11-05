// Validates an authored flashcard batch. Usage: node scripts/check_card_batch.mjs <batch> | --all
import fs from 'node:fs';
import path from 'node:path';
import { rowProblems } from './card_quality_rules.mjs';
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
const { FLASHCARD_DATABASE: db } = await import('../dist/flashcards.mjs');
const byId = new Map(db.map(c => [c.id, c]));
const IN = 'data/card_rewrite/batches', OUT = 'data/card_rewrite/out';
export const parseRow = (kind, line) => {
  const f = line.split('\t');
  return kind === 'full'
    ? { id: f[0], example: f[1], exampleZh: f[2], collocation: f[3], tip: f[4], ipa: f[5], chunk: f[6], gloss: f[7] ?? '', columns: f.length }
    : { id: f[0], collocation: f[1], tip: f[2], ipa: f[3], chunk: f[4], gloss: f[5] ?? '', columns: f.length };
};
function check(batch) {
  const kind = batch.startsWith('full') ? 'full' : 'light';
  const wanted = fs.readFileSync(path.join(IN, batch + '.tsv'), 'utf8').trim().split('\n').slice(1).map(l => l.split('\t')[0]);
  const parts = fs.existsSync(OUT) ? fs.readdirSync(OUT).filter(f => f.startsWith(batch + '.p') && f.endsWith('.tsv')).sort() : [];
  const seen = new Map(), problems = [];
  for (const part of parts) for (const line of fs.readFileSync(path.join(OUT, part), 'utf8').split('\n')) {
    if (!line.trim()) continue;
    const row = parseRow(kind, line.replace(/\r$/, ''));
    const card = byId.get(row.id);
    if (!card) { problems.push(`${part}: unknown id ${row.id}`); continue; }
    if (seen.has(row.id)) problems.push(`${part}: duplicate ${row.id}`);
    seen.set(row.id, row);
    const min = kind === 'full' ? 7 : 5;
    if (row.columns < min) { problems.push(`${part} ${row.id}: only ${row.columns} columns`); continue; }
    for (const p of rowProblems(row, card, { requireExample: kind === 'full' })) problems.push(`${part} ${row.id} (${card.word}): ${p}`);
  }
  for (const id of wanted) if (!seen.has(id)) problems.push(`missing ${id}`);
  // Repeated sentence frames inside one batch are the failure this work exists to remove.
  if (kind === 'full') {
    const open = new Map();
    for (const [id, row] of seen) {
      const key = String(row.example).toLowerCase().split(/\s+/).slice(0, 3).join(' ');
      open.set(key, (open.get(key) || 0) + 1);
    }
    for (const [key, n] of open) if (n > Math.max(4, wanted.length * 0.03)) problems.push(`opening "${key}" used ${n} times; vary sentence structure`);
  }
  return { batch, wanted: wanted.length, done: seen.size, problems, rows: seen, kind };
}
const arg = process.argv[2];
if (arg === '--all') {
  const index = JSON.parse(fs.readFileSync(path.join(IN, 'index.json'), 'utf8'));
  let done = 0, wanted = 0, bad = 0;
  for (const b of index) { const r = check(b.name); wanted += r.wanted; done += r.done; bad += r.problems.length; console.log(b.name, `${r.done}/${r.wanted}`, r.problems.length ? `problems:${r.problems.length}` : 'OK'); }
  console.log(JSON.stringify({ wanted, done, problems: bad }));
} else if (arg) {
  const r = check(arg);
  if (r.problems.length) { console.log(r.problems.slice(0, 60).join('\n')); if (r.problems.length > 60) console.log(`… ${r.problems.length - 60} more`); process.exitCode = 1; }
  else console.log(`OK ${r.batch} ${r.done}/${r.wanted}`);
}
