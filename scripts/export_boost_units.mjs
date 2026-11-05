// Writes one author brief per group of units for 單元加油站. Usage: node scripts/export_boost_units.mjs <outDir>
import fs from 'node:fs';
import path from 'node:path';
import { createCourse } from '../dist/quest/engine.mjs';
import { unitLab } from '../dist/quest/lab.mjs';
import { boostTarget } from './boost_rules.mjs';
const out = process.argv[2] || 'data/boost/briefs';
fs.mkdirSync(out, { recursive: true });
const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const course = createCourse(index);
for (const t of [...index.sections, ...index.branches]) course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
const units = [];
for (const u of course.units.values()) {
  const lab = unitLab(course, u.id), seen = new Set(), q = [];
  for (const n of u.nodes || []) for (const id of course.nodes.get(n.id)?.pool || []) { const it = course.item(id); if (it?.prompt && !seen.has(it.prompt + it.answer)) { seen.add(it.prompt + it.answer); q.push(it); } }
  const step = Math.max(1, Math.floor(q.length / 18));
  const track = course.track(u.track);
  units.push({ unit: u.id, title: u.title, en: u.en || '', level: u.level || track?.level || '', track: track?.title || u.track, target: boostTarget(lab), samples: q.filter((_, i) => i % step === 0).slice(0, 18).map(x => `${String(x.prompt).slice(0, 70)} → ${String(x.answer).slice(0, 40)}`) });
}
// Roughly 150 new items per author, keeping neighbouring units together.
let group = [], n = 0, file = 0, total = 0;
const flush = () => { if (!group.length) return; file++; fs.writeFileSync(path.join(out, `g${String(file).padStart(2, '0')}.json`), JSON.stringify(group, null, 1)); group = []; n = 0; };
for (const u of units) { if (n + u.target > 150) flush(); group.push(u); n += u.target; total += u.target; }
flush();
console.log(JSON.stringify({ units: units.length, totalItems: total, groups: file, min: Math.min(...units.map(u => u.target)), max: Math.max(...units.map(u => u.target)) }));
