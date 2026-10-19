// PDCA check for 108 課綱 alignment and teaching-page quality.
// Usage: node scripts/audit_curriculum_alignment.mjs [cycle-label] [--write]
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dist = p => pathToFileURL(path.resolve('dist', p)).href;
const { PERFORMANCES, CONTENTS, COMPETENCIES, lookupStandard, stageOfCode } = await import(dist('curriculum_standards.mjs'));
const { ALIGNMENT } = await import(dist('curriculum_alignment.mjs'));
const { points } = await import(dist('knowledge_content.mjs'));
const { foundations } = await import(dist('knowledge_foundations.mjs'));
const extra = fs.existsSync('dist/knowledge_standards.mjs') ? (await import(dist('knowledge_standards.mjs'))).standardsPoints : [];
const { curriculum } = await import(dist('curriculum.mjs'));
const { grammarTopics } = await import(dist('grammar_content.mjs'));
const { UNIFIED_GRADES } = await import(dist('curriculum_unified.mjs'));
const { renderTopicVisualChart } = await import(dist('lesson_visuals.mjs'));
const { workshops } = await import(dist('lesson_workshops.mjs'));
const { learningCatalog } = await import(dist('learning_catalog.mjs'));
const { CHAPTER_EXTRA, GRAMMAR_EXTRA } = await import(dist('practice_extra.mjs'));

const label = process.argv[2] || 'adhoc';
const stageOfLabel = s => /國小/.test(s) ? ['Ⅱ', 'Ⅲ'] : /國中/.test(s) ? ['Ⅳ'] : /高工/.test(s) && !/高中/.test(s) ? ['V'] : /高中／高工/.test(s) ? ['Ⅴ', 'V'] : ['Ⅴ', 'V'];
const pages = [];
for (const p of [...foundations, ...points, ...extra]) pages.push({ key: 'knowledge:' + p.id, title: p.title, stages: stageOfLabel(p.stage), questions: p.questions.length, kind: 'knowledge' });
for (const t of curriculum) for (const c of t.chapters) pages.push({ key: `chapter:${t.id}:${c.id}`, title: c.title, stages: t.id === 'jhs' ? ['Ⅳ'] : t.id === 'voc' ? ['V'] : ['Ⅴ'], questions: 1 + (CHAPTER_EXTRA[c.id]?.length || 0), kind: 'chapter' });
for (const g of grammarTopics) pages.push({ key: 'grammar:' + g.id, title: g.title, stages: stageOfLabel(g.stage), questions: 1 + (GRAMMAR_EXTRA[g.id]?.length || 0), kind: 'grammar' });
const gradeStage = id => { const n = Number(id.replace('g', '')); return n <= 4 ? ['Ⅱ'] : n <= 6 ? ['Ⅲ'] : n <= 9 ? ['Ⅳ'] : ['Ⅴ', 'V']; };
const unitGrades = {};
for (const g of UNIFIED_GRADES) for (const s of g.semesters) for (const u of s.units) {
  unitGrades[g.gradeId] = (unitGrades[g.gradeId] || 0) + 1;
  pages.push({ key: 'unit:' + u.id, title: u.title, stages: gradeStage(g.gradeId), questions: (u.formativeQuiz || []).length + (u.concepts || []).filter(c => c.examExample).length, kind: 'unit', unit: u });
}

const invalid = [], stageMismatch = [], missing = [];
const used = new Set();
for (const p of pages) {
  const a = ALIGNMENT[p.key];
  if (!a) { missing.push(p.key); continue; }
  for (const code of [...a.perf, ...a.content, ...a.comp]) {
    const s = lookupStandard(code);
    if (!s) { invalid.push(`${p.key} → ${code}`); continue; }
    used.add(code);
    const st = stageOfCode(code);
    if (st && !p.stages.includes(st) && !a.review) stageMismatch.push(`${p.key} (${p.stages.join('/')}) → ${code}`);
    if (!st && s.kind === 'competency') {
      const lvl = s.level, ok = { 'E': ['Ⅱ', 'Ⅲ'], 'J': ['Ⅳ'], 'S-U': ['Ⅴ'], 'V-U': ['V'] }[lvl] || [];
      if (!ok.some(x => p.stages.includes(x)) && !a.review) stageMismatch.push(`${p.key} (${p.stages.join('/')}) → ${code}`);
    }
  }
  if (!a.perf.length || !a.content.length || !a.comp.length) missing.push(p.key + ' (incomplete)');
}

const { TOOL_PAGES } = await import(dist('curriculum_alignment.mjs'));
const usedTeaching = new Set(used);
for (const key of Object.keys(TOOL_PAGES || {})) { const a = ALIGNMENT[key]; for (const code of [...a.perf, ...a.content, ...a.comp]) { if (!lookupStandard(code)) invalid.push(`${key} → ${code}`); else used.add(code); } }
const coverage = {};
for (const st of ['Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'V']) {
  const perf = PERFORMANCES.filter(x => x.stage === st), cont = CONTENTS.filter(x => x.stage === st);
  coverage[st] = {
    performance: `${perf.filter(x => used.has(x.code)).length}/${perf.length}`,
    performanceTeachingPagesOnly: `${perf.filter(x => usedTeaching.has(x.code)).length}/${perf.length}`,
    content: `${cont.filter(x => used.has(x.code)).length}/${cont.length}`,
    uncoveredCorePerformance: perf.filter(x => !used.has(x.code) && !x.advanced).map(x => x.code),
    uncoveredContent: cont.filter(x => !used.has(x.code)).map(x => x.code)
  };
}

// Legacy code strings in data that are not real curriculum codes or disagree with the alignment.
const codeRe = /(?:\d|A[a-e]|[BCD])-(?:[ⅡⅢⅣⅤ]|I{2,3}|IV|V)-\d+/g;
const legacy = [];
for (const t of curriculum) for (const c of t.chapters) {
  for (const field of ['curriculumCode', 'learningContent']) for (const code of String(c[field] || '').match(codeRe) || []) {
    const a = ALIGNMENT[`chapter:${t.id}:${c.id}`];
    if (!lookupStandard(code) || !a || ![...a.perf, ...a.content].includes(code)) legacy.push(`chapter:${t.id}:${c.id}.${field} ${code}`);
  }
}
for (const p of pages.filter(p => p.kind === 'unit')) for (const code of String(p.unit.indicator || '').match(codeRe) || []) {
  const a = ALIGNMENT[p.key];
  if (!lookupStandard(code) || !a || ![...a.perf, ...a.content].includes(code)) legacy.push(`${p.key}.indicator ${code}`);
}

const templated = [];
for (const p of pages.filter(p => p.kind === 'unit')) for (const c of p.unit.concepts || []) {
  const x = c.examExample; if (!x) continue;
  if (/core linguistic principle|\[[^\]]+\]/.test(x.stem) || x.options.some(o => /The findings was concluded|hypothesis were abruptly/.test(o))) templated.push(`${p.key} :: ${c.title}`);
}

const catalog = learningCatalog([...foundations, ...points, ...extra]);
const catalogStageErrors = [];
for (const g of UNIFIED_GRADES) for (const s of g.semesters) for (const u of s.units) {
  const c = catalog.find(x => x.id === u.id); const n = Number(g.gradeId.replace('g', ''));
  const want = n <= 6 ? '國小' : n <= 9 ? '國中' : '高中';
  if (c && c.stage !== want) catalogStageErrors.push(`${u.id}: ${c.stage} ≠ ${want}`);
}

const genericVisual = pages.filter(p => !renderTopicVisualChart(p.title)).map(p => p.key);
const thinPractice = pages.filter(p => p.questions < 2).map(p => p.key);
globalThis.localStorage ??= { getItem() { return null; }, setItem() {} };
globalThis.window ??= { scrollY: 0, scrollTo() {} };
const { microLesson } = await import(dist('lesson_pages.mjs'));
const hiddenUnitContent = pages.filter(p => p.kind === 'unit').filter(p => {
  const html = microLesson(p.unit.id);
  const word = (p.unit.phonicsVocab || [])[0]?.word, reading = p.unit.reading?.title;
  return (word && !html.includes(word)) || (reading && !html.includes(reading.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))));
}).map(p => p.key);
const keyPointPages = pages.filter(p => p.kind === 'unit' ? microLesson(p.unit.id).includes('kp-summary') : true).length;

const report = {
  cycle: label, date: new Date().toISOString().slice(0, 10),
  pages: pages.length, byKind: pages.reduce((m, p) => (m[p.kind] = (m[p.kind] || 0) + 1, m), {}),
  unitGrades,
  alignment: { pagesAligned: pages.length - missing.length, missing: missing.length, invalidCodes: invalid.length, stageMismatch: stageMismatch.length, distinctCodesUsed: used.size },
  coverage,
  quality: { legacyWrongCodes: legacy.length, templatedQuestions: templated.length, catalogStageErrors: catalogStageErrors.length, pagesWithoutTopicChart: genericVisual.length, pagesWithUnder2Questions: thinPractice.length, unitsWithHiddenVocabOrReading: hiddenUnitContent.length, unitPagesWithKeyPoints: keyPointPages - pages.filter(p => p.kind !== 'unit').length },
  details: { hiddenUnitContent, missing, invalid, stageMismatch, legacy: legacy.slice(0, 200), templated, catalogStageErrors: catalogStageErrors.slice(0, 20), genericVisual, thinPractice }
};
console.log(JSON.stringify({ cycle: report.cycle, pages: report.pages, byKind: report.byKind, unitGrades, alignment: report.alignment, quality: report.quality, coverage: Object.fromEntries(Object.entries(coverage).map(([k, v]) => [k, { performance: v.performance, content: v.content }])) }, null, 1));
if (process.argv.includes('--write')) {
  const file = 'CURRICULUM-PDCA-2026-10-19.json';
  const log = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { title: '108 課綱對齊與教學頁 PDCA 檢核紀錄', cycles: [] };
  log.cycles = log.cycles.filter(c => c.cycle !== label).concat([report]);
  fs.writeFileSync(file, JSON.stringify(log, null, 1));
}
