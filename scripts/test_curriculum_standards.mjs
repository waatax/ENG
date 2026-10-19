// Locks in the 108 課綱 alignment release: official standards data, page alignment, new content and coverage map.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

globalThis.localStorage = { data: new Map(), getItem(k) { return this.data.get(k) ?? null; }, setItem(k, v) { this.data.set(k, String(v)); } };
globalThis.window = { scrollY: 0, scrollTo() {} };

const { PERFORMANCES, CONTENTS, COMPETENCIES, lookupStandard, stageOfCode } = await import('../dist/curriculum_standards.mjs');
const { ALIGNMENT, TOOL_PAGES } = await import('../dist/curriculum_alignment.mjs');
const { UNIFIED_GRADES } = await import('../dist/curriculum_unified.mjs');
const { curriculum } = await import('../dist/curriculum.mjs');
const { grammarTopics } = await import('../dist/grammar_content.mjs');
const { points, knowledgePage } = await import('../dist/knowledge.mjs');
const { standardsPoints } = await import('../dist/knowledge_standards.mjs');
const { teachingChapter, microLesson } = await import('../dist/lesson_pages.mjs');
const grammar = await import('../dist/grammar.mjs');
const { CHAPTER_EXTRA, GRAMMAR_EXTRA } = await import('../dist/practice_extra.mjs');
const { standardsMapPage } = await import('../dist/standards_map.mjs');
const { learningCatalog } = await import('../dist/learning_catalog.mjs');

const units = UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units.map(u => ({ ...u, gradeId: g.gradeId }))));
const pageKeys = [
  ...points.map(p => 'knowledge:' + p.id),
  ...curriculum.flatMap(t => t.chapters.map(c => `chapter:${t.id}:${c.id}`)),
  ...grammarTopics.map(t => 'grammar:' + t.id),
  ...units.map(u => 'unit:' + u.id)
];

test('Official 108 curriculum text is complete for both the general and vocational documents', () => {
  const count = (rows, track) => rows.filter(r => r.track === track).length;
  assert.equal(count(PERFORMANCES, 'general'), 282);
  assert.equal(count(CONTENTS, 'general'), 119);
  assert.equal(count(COMPETENCIES, 'general'), 22);
  assert.equal(count(PERFORMANCES, 'vocational'), 75);
  assert.equal(count(CONTENTS, 'vocational'), 45);
  assert.equal(count(COMPETENCIES, 'vocational'), 9);
  assert.equal(lookupStandard('Ad-Ⅳ-1').text, '國中階段所學的文法句型。');
  assert.equal(lookupStandard('Ac-Ⅳ-1').text, '簡易的英文標示。');
  assert.equal(lookupStandard('3-V-11').text, '能看懂職場上常用之圖表與使用手冊。');
  for (const r of [...PERFORMANCES, ...CONTENTS]) assert.ok(r.text.length >= 4 && /[。）]$/.test(r.text), `${r.code}: ${r.text}`);
});

test('Every one of the 154 teaching pages has valid, stage-consistent curriculum codes', () => {
  assert.equal(pageKeys.length, 154);
  const gradeStage = id => { const n = Number(id.slice(1)); return n <= 4 ? ['Ⅱ'] : n <= 6 ? ['Ⅲ'] : n <= 9 ? ['Ⅳ'] : ['Ⅴ', 'V']; };
  for (const key of pageKeys) {
    const a = ALIGNMENT[key];
    assert.ok(a && a.perf.length && a.content.length && a.comp.length, `${key} must list performances, contents and competencies`);
    for (const code of [...a.perf, ...a.content, ...a.comp]) assert.ok(lookupStandard(code), `${key}: unknown code ${code}`);
    if (key.startsWith('unit:') && !a.review) {
      const allowed = gradeStage(units.find(u => 'unit:' + u.id === key).gradeId);
      for (const code of [...a.perf, ...a.content]) assert.ok(allowed.includes(stageOfCode(code)), `${key}: ${code} outside its learning stage`);
    }
  }
  for (const key of Object.keys(TOOL_PAGES)) for (const code of [...ALIGNMENT[key].perf, ...ALIGNMENT[key].content]) assert.ok(lookupStandard(code), `${key}: ${code}`);
});

test('Legacy mislabelled codes are gone from chapter and unit data', () => {
  const codeRe = /(?:\d|A[a-e]|[BCD])-(?:[ⅡⅢⅣⅤ]|I{2,3}|IV|V)-\d+/g;
  for (const t of curriculum) for (const c of t.chapters) for (const code of `${c.curriculumCode} ${c.learningContent}`.match(codeRe)) assert.ok(lookupStandard(code), `chapter ${c.id}: ${code}`);
  for (const u of units) for (const code of u.indicator.match(codeRe)) assert.ok(lookupStandard(code), `unit ${u.id}: ${code}`);
});

test('Pages render the 課綱 card, key points and real (non-templated) practice', () => {
  for (const u of units) {
    const html = microLesson(u.id);
    for (const part of ['std-card', 'kp-summary', 'unit-vocab', 'unit-reading', 'ev-figure|lesson-visual-diagram']) assert.match(html, new RegExp(part), `${u.id} missing ${part}`);
    for (const c of u.concepts || []) if (c.examExample) {
      assert.doesNotMatch(c.examExample.stem, /core linguistic principle|\[[^\]]+\]/, `${u.id}: templated stem`);
      assert.ok(c.examExample.options.every(o => !/The findings was concluded|hypothesis were abruptly/.test(o)), `${u.id}: filler distractor`);
    }
  }
  for (const t of curriculum) for (const c of t.chapters) {
    const html = teachingChapter(`${t.id}:${c.id}`);
    assert.ok(html.includes('std-card') && html.includes('kp-summary'), c.id);
    assert.equal(CHAPTER_EXTRA[c.id].length, 2, c.id);
    for (const q of CHAPTER_EXTRA[c.id]) assert.ok(html.includes(`data-lesson-question="${q.id}"`), q.id);
  }
  for (const t of grammarTopics) {
    grammar.setGrammarTopic(t.id);
    const html = grammar.grammarPage();
    assert.ok(html.includes('std-card') && html.includes('kp-summary'), t.id);
    assert.equal((html.match(/data-grammar-extra="/g) || []).length, GRAMMAR_EXTRA[t.id].reduce((n, x) => n + x.options.length, 0), t.id);
  }
});

test('Grades 3–5 and the curriculum-gap knowledge points are complete lessons', () => {
  const elementary = units.filter(u => ['g3', 'g4', 'g5'].includes(u.gradeId));
  assert.equal(elementary.length, 18);
  for (const u of elementary) {
    assert.ok(u.concepts.length >= 2 && u.concepts.every(c => c.examExample && c.examExample.analysis.length > 20), u.id);
    assert.ok(u.formativeQuiz.length >= 3 && u.formativeQuiz.every(q => q.options[q.ans] && new Set(q.options).size === q.options.length), u.id);
    assert.ok(u.phonicsVocab.length >= 4 && u.dialogue.length >= 4 && u.reading.questions.length >= 2 && u.traps.length >= 2 && u.checklist.length >= 3, u.id);
  }
  assert.equal(standardsPoints.length, 19);
  for (const p of standardsPoints) {
    assert.equal(p.pairs.length >= 3 && p.steps.length === 3, true, p.id);
    for (const [q, options, answer, why] of p.questions) assert.ok(q && options[answer] && why.length > 10 && new Set(options).size === options.length, p.id);
    const html = knowledgePage(p.id);
    assert.ok(html.includes('std-card') && html.includes(p.title), p.id);
  }
});

test('Catalog labels every grade unit with its own school stage', () => {
  const catalog = learningCatalog(points);
  for (const u of units) {
    const want = /^g[3-6]$/.test(u.gradeId) ? '國小' : /^g[7-9]$/.test(u.gradeId) ? '國中' : '高中';
    assert.equal(catalog.find(c => c.id === u.id).stage, want, u.id);
  }
});

test('Coverage map reports every stage and links codes to pages', () => {
  const html = standardsMapPage();
  assert.ok(html.includes('108 課綱學習重點地圖'));
  assert.equal((html.match(/class="sm-heat"/g) || []).length, 80);
  assert.ok(html.includes('#knowledge/festivals-culture'));
  const log = JSON.parse(readFileSync('CURRICULUM-PDCA-2026-10-19.json', 'utf8'));
  assert.ok(log.cycles.length >= 7, 'seven PDCA cycles are logged');
  assert.equal(log.cycles.at(-1).alignment.invalidCodes, 0);
});
