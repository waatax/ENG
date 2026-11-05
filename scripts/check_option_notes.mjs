// Usage: node scripts/check_option_notes.mjs nNN
import fs from 'node:fs';
const n = process.argv[2], items = JSON.parse(fs.readFileSync(`data/option_notes/in/${n}.json`, 'utf8'));
const file = `data/option_notes/out/${n}.json`;
if (!fs.existsSync(file)) { console.log('missing ' + file); process.exit(1); }
const out = JSON.parse(fs.readFileSync(file, 'utf8')), bad = [];
for (const q of items) {
  const notes = out[q.id];
  if (!notes) { bad.push(`${q.id}: missing`); continue; }
  for (const o of q.options) {
    if (String(o) === String(q.answer)) continue;
    const t = notes[o];
    if (!t) bad.push(`${q.id}: no note for "${o}"`);
    else if (!/[㐀-鿿]/.test(t) || t.length < 10) bad.push(`${q.id}: weak note for "${o}"`);
    else if (/這個選項不對|請再看一次|不正確。?$/.test(t)) bad.push(`${q.id}: generic note`);
  }
}
if (bad.length) { console.log(bad.slice(0, 40).join('\n')); console.log(`problems ${bad.length}`); process.exitCode = 1; }
else console.log(`OK ${n} ${items.length}`);
