import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { journeyCatalog } from '../dist/learning_journey.mjs';
import { curriculum } from '../dist/curriculum.mjs';
import { UNIFIED_GRADES } from '../dist/curriculum_unified.mjs';
import { grammarTopics } from '../dist/grammar_content.mjs';
import { foundations } from '../dist/knowledge_foundations.mjs';
import { points } from '../dist/knowledge_content.mjs';
import { standardsPoints } from '../dist/knowledge_standards.mjs';
import { FLASHCARD_DATABASE } from '../dist/flashcards.mjs';
import { qualityCounts } from '../dist/flashcard_quality.mjs';
import { ALL_COMMUTE_DIALOGUES } from '../dist/commute_dialogues.mjs';
import { tracks } from '../dist/EN/content.mjs';

const tally = (items, key) => items.reduce((out, item) => {
  const value = item[key] ?? 'unknown'; out[value] = (out[value] || 0) + 1; return out;
}, {});
const read = path => JSON.parse(fs.readFileSync(path, 'utf8'));
const normalize = value => String(value ?? '').normalize('NFKC').replace(/\s+/g, ' ').trim();
const fingerprint = q => JSON.stringify([normalize(q.passage), normalize(q.prompt), (q.options || []).map(normalize)]);
const bankReports = fs.readdirSync('data/questions').filter(f => f.endsWith('.json') && f !== 'manifest.json').map(file => {
  const rows = read('data/questions/' + file);
  if (!Array.isArray(rows)) throw new Error('Unexpected bank shape: ' + file);
  const unique = new Set(rows.map(fingerprint)).size;
  return { file, records: rows.length, distinctSurfaces: unique, duplicateRecords: rows.length - unique,
    missingPrompt: rows.filter(q => !q.prompt).length,
    invalidAnswers: rows.filter(q => !Array.isArray(q.options) || !(Array.isArray(q.answer) ? q.answer : [q.answer]).every(a => Number.isInteger(a) && a >= 0 && a < q.options.length)).length,
    tiers: tally(rows, 'tier') };
});
const sourceByRoute = new Map();
for (const p of [...foundations, ...points, ...standardsPoints]) sourceByRoute.set('#knowledge/' + p.id, p);
for (const t of curriculum) for (const c of t.chapters) sourceByRoute.set(`#chapter/${t.id}/${c.id}`, c);
for (const g of UNIFIED_GRADES) for (const s of g.semesters) for (const u of s.units) sourceByRoute.set('#unit/' + u.id, u);
for (const t of grammarTopics) sourceByRoute.set('#grammar/' + t.id, t);
const catalog = journeyCatalog.map(c => {
  const source = sourceByRoute.get(c.link);
  if (!source) throw new Error('Unresolved route: ' + c.link);
  return { route: c.link, title: c.title, stage: c.stage, domain: c.domain, kind: c.kind,
    fields: Object.keys(source), contentHash: createHash('sha256').update(JSON.stringify(source)).digest('hex'),
    readiness: 'needs-editorial-and-game-adaptation' };
});
const cards = read('dist/mnemonics/cards.json');
const families = read('dist/roots/groups.json');
const result = {
  date: '2026-10-23', scope: 'Full structural inventory of imported teaching collections; selected semantic reading only. No learning efficacy or formal level validation.',
  catalog: { total: catalog.length, byKind: tally(catalog, 'kind'), byStage: tally(catalog, 'stage'), byDomain: tally(catalog, 'domain'), entries: catalog },
  grades: UNIFIED_GRADES.map(g => ({ id: g.gradeId, title: g.title, units: g.semesters.flatMap(s => s.units).length })),
  flashcards: { ...qualityCounts(FLASHCARD_DATABASE), byTier: tally(FLASHCARD_DATABASE, 'tier'), note: 'Known-template detector only; unflagged does not mean editorially approved.' },
  conversations: { total: ALL_COMMUTE_DIALOGUES.length, sample: ALL_COMMUTE_DIALOGUES.slice(0, 3).map(d => ({ id: d.id, title: d.title, fields: Object.keys(d) })) },
  academy: { tracks: tracks.length, lessons: tracks.reduce((n, t) => n + t.lessons.length, 0) },
  mnemonics: { count: Array.isArray(cards) ? cards.length : null, shape: Array.isArray(cards) ? 'array' : Object.keys(cards) },
  families: { count: Array.isArray(families) ? families.length : families.groups.length, members: families.members, shape: Array.isArray(families) ? 'array' : Object.keys(families) },
  banks: bankReports,
  fingerprintMethod: 'NFKC and whitespace-normalized passage + prompt + ordered options. Not semantic deduplication; different option orders remain distinct.',
  limitations: ['Not every item has been read or fact-checked by a teacher.', 'No audio quality listening audit in this cycle.', 'Existing labels are not calibrated learner levels.', 'No learner testing or production deployment in this cycle.']
};
fs.mkdirSync('docs/redesign', { recursive: true });
fs.writeFileSync('docs/redesign/CONTENT-BASELINE-2026-10-23.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ ...result, catalog: { ...result.catalog, entries: undefined } }, null, 2));
