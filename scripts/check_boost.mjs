// Validates 單元加油站 files. Usage: node scripts/check_boost.mjs <group|unitId|--all>
import fs from 'node:fs';
import { createCourse } from '../dist/quest/engine.mjs';
import { boostItemProblems, normalizePrompt } from './boost_rules.mjs';
const arg = process.argv[2];
const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const course = createCourse(index);
for (const t of [...index.sections, ...index.branches]) course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
const groups = fs.readdirSync('data/boost/briefs').filter(f => /^g\d+\.json$/.test(f));
const all = groups.flatMap(g => JSON.parse(fs.readFileSync(`data/boost/briefs/${g}`)).map(u => ({ ...u, group: g.replace('.json', '') })));
const chosen = arg === '--all' ? all : all.filter(u => u.group === arg || u.unit === arg);
let problems = [], done = 0, wanted = 0;
for (const u of chosen) {
  wanted += u.target;
  const file = `dist/quest/boost/${u.unit}.json`;
  if (!fs.existsSync(file)) { problems.push(`${u.unit}: file missing (need ${u.target})`); continue; }
  let items;
  try { items = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { problems.push(`${u.unit}: invalid JSON ${e.message}`); continue; }
  done += items.length;
  if (items.length < u.target) problems.push(`${u.unit}: ${items.length}/${u.target} items`);
  const old = new Set();
  for (const n of course.units.get(u.unit)?.nodes || []) for (const id of course.nodes.get(n.id)?.pool || []) old.add(normalizePrompt(course.item(id)?.prompt) + '|' + normalizePrompt(course.item(id)?.answer));
  const ids = new Set(), own = new Set();
  for (const it of items) {
    for (const p of boostItemProblems(it)) problems.push(`${u.unit} ${it.id}: ${p}`);
    if (ids.has(it.id)) problems.push(`${u.unit} ${it.id}: duplicate id`);
    ids.add(it.id);
    const key = normalizePrompt(it.prompt) + normalizePrompt(it.text) + normalizePrompt(it.answer);
    if (own.has(key)) problems.push(`${u.unit} ${it.id}: duplicate prompt`);
    own.add(key);
    if (old.has(normalizePrompt(it.prompt) + '|' + normalizePrompt(it.answer))) problems.push(`${u.unit} ${it.id}: copies an existing unit question`);
  }
}
if (problems.length) { console.log(problems.slice(0, 50).join('\n')); console.log(`problems: ${problems.length}; items ${done}/${wanted}`); process.exitCode = 1; }
else console.log(`OK ${arg} items ${done}/${wanted}`);
