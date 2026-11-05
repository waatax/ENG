// Splits every flashcard that fails the content gate into small TSV work batches for authors.
// Usage: node scripts/export_card_batches.mjs <outDir> [--size=200]
import fs from 'node:fs';
import path from 'node:path';
import { cardFlags } from './card_quality_rules.mjs';
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
const { FLASHCARD_DATABASE: db } = await import('../dist/flashcards.mjs');
const outDir = process.argv[2] || 'data/card_rewrite/batches';
const size = Number((process.argv.find(a => a.startsWith('--size=')) || '').split('=')[1]) || 200;
fs.mkdirSync(outDir, { recursive: true });
const flags = new Map(cardFlags(db).map(f => [f.id, f]));
const full = [], light = [];
for (const c of db) {
  const f = flags.get(c.id);
  if (f.exampleTemplate) full.push(c);
  else if (f.collocationTemplate || f.tipTemplate || f.ipaProblem || f.zhRun) light.push(c);
}
const clean = s => String(s ?? '').replace(/[\t\n\r]+/g, ' ').trim();
const write = (kind, list, step) => {
  const byTier = {};
  for (const c of list) (byTier[c.tier] ||= []).push(c);
  let n = 0;
  const index = [];
  for (const [tier, cards] of Object.entries(byTier)) for (let i = 0; i < cards.length; i += step) {
    n++;
    const name = `${kind}-${tier}-${String(n).padStart(3, '0')}`;
    const header = kind === 'full' ? 'id\tword\tpos\tzh\tcategory' : 'id\tword\tpos\tzh\tcategory\texample';
    const lines = cards.slice(i, i + step).map(c => [c.id, c.word, c.pos, c.zh, c.category, ...(kind === 'light' ? [c.example] : [])].map(clean).join('\t'));
    fs.writeFileSync(path.join(outDir, name + '.tsv'), [header, ...lines].join('\n') + '\n');
    index.push({ name, tier, count: lines.length });
  }
  return index;
};
const index = [...write('full', full, size), ...write('light', light, size * 2)];
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 1));
const summary = {};
for (const b of index) { const k = b.name.split('-')[0] + ':' + b.tier; summary[k] = (summary[k] || 0) + b.count; }
console.log(JSON.stringify({ full: full.length, light: light.length, untouched: db.length - full.length - light.length, batches: index.length, summary }, null, 1));
