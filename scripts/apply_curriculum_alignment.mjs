// Rewrites the legacy 課綱 code fields in dist/curriculum.mjs (chapters) and dist/curriculum_unified.mjs (units)
// so they match dist/curriculum_alignment.mjs and quote the official 學習內容 wording.
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dist = p => pathToFileURL(path.resolve('dist', p)).href;
const { ALIGNMENT } = await import(dist('curriculum_alignment.mjs'));
const { lookupStandard } = await import(dist('curriculum_standards.mjs'));
const { curriculum } = await import(dist('curriculum.mjs'));
const { UNIFIED_GRADES } = await import(dist('curriculum_unified.mjs'));

const codes = a => [...a.perf, ...a.content].join(' / ');
const contentText = a => a.content.map(c => `${c} ${lookupStandard(c).text}`).join('；');

// Chapters: fields appear once per chapter, in array order.
let src = fs.readFileSync('dist/curriculum.mjs', 'utf8');
const chapters = curriculum.flatMap(t => t.chapters.map(c => `chapter:${t.id}:${c.id}`));
let i = 0;
src = src.replace(/curriculumCode: '[^']*'/g, () => `curriculumCode: '${codes(ALIGNMENT[chapters[i++]])}'`);
if (i !== chapters.length) throw new Error(`curriculumCode fields ${i} ≠ chapters ${chapters.length}`);
i = 0;
src = src.replace(/learningContent: '[^']*'/g, () => `learningContent: '${contentText(ALIGNMENT[chapters[i++]])}'`);
if (i !== chapters.length) throw new Error(`learningContent fields ${i} ≠ chapters ${chapters.length}`);
fs.writeFileSync('dist/curriculum.mjs', src);

// Units: "indicator" follows each unit's "id".
let uni = fs.readFileSync('dist/curriculum_unified.mjs', 'utf8');
let n = 0;
for (const g of UNIFIED_GRADES) for (const s of g.semesters) for (const u of s.units) {
  const a = ALIGNMENT['unit:' + u.id];
  if (!a) throw new Error('No alignment for ' + u.id);
  const at = uni.indexOf(`"id": "${u.id}"`);
  if (at < 0) continue; // units defined outside this file (added by other modules) carry their own indicator
  const re = /"indicator": "[^"]*"/g;
  re.lastIndex = at;
  const m = re.exec(uni);
  if (!m) throw new Error('No indicator after ' + u.id);
  uni = uni.slice(0, m.index) + `"indicator": "${codes(a)}"` + uni.slice(m.index + m[0].length);
  n++;
}
fs.writeFileSync('dist/curriculum_unified.mjs', uni);
console.log(`Updated ${chapters.length} chapters and ${n} units.`);
