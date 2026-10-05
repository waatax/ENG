// test_gre_gmat_deep_mastery.mjs - 深度 GRE & GMAT 教學模組與題型實戰演練套件完整審計

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// 模擬瀏覽器環境
globalThis.localStorage = {
  data: new Map(),
  getItem(k) { return this.data.get(k) || null; },
  setItem(k, v) { this.data.set(k, String(v)); },
  removeItem(k) { this.data.delete(k); },
  clear() { this.data.clear(); }
};
globalThis.window = {
  scrollY: 0,
  scrollTo() {},
  junyi: {
    addXp(n) { this.xp = (this.xp || 0) + n; }
  }
};
globalThis.document = { querySelector() { return null; } };

test('1. Curriculum GRE & GMAT Deep Concepts & Pedagogical Rigor Audit', async () => {
  const { curriculum } = await import('../dist/curriculum.mjs');
  const examTrack = curriculum.find(t => t.id === 'intl');
  assert.ok(examTrack, 'Exam track intl must exist in curriculum');

  // GRE Chapter Audit
  const greChapter = examTrack.chapters.find(c => c.id === 'gre');
  assert.ok(greChapter, 'GRE chapter must exist');
  assert.equal(greChapter.concepts.length, 4, 'GRE must feature 4 deep pedagogical concepts');
  const greHeadings = greChapter.concepts.map(c => c.heading);
  assert.ok(greHeadings.some(h => h.includes('邏輯密碼')));
  assert.ok(greHeadings.some(h => h.includes('語境配對')));
  assert.ok(greHeadings.some(h => h.includes('翻案文')));
  assert.ok(greHeadings.some(h => h.includes('30 分鐘五步立論法')));

  // GMAT Chapter Audit
  const gmatChapter = examTrack.chapters.find(c => c.id === 'gmat');
  assert.ok(gmatChapter, 'GMAT chapter must exist');
  assert.equal(gmatChapter.concepts.length, 5, 'GMAT must feature 5 deep pedagogical concepts');
  const gmatHeadings = gmatChapter.concepts.map(c => c.heading);
  assert.ok(gmatHeadings.some(h => h.includes('五大題型模型')));
  assert.ok(gmatHeadings.some(h => h.includes('三大致命漏洞')));
  assert.ok(gmatHeadings.some(h => h.includes('否定測試法')));
  assert.ok(gmatHeadings.some(h => h.includes('黑體字角色題')));
  assert.ok(gmatHeadings.some(h => h.includes('Data Insights')));
});

test('2. Lesson Visual Diagrams GRE & GMAT Dedicated Routing Audit', async () => {
  const { renderTopicVisualChart, renderGRESemanticPolarityChart, renderGMATCriticalReasoningTree } = await import('../dist/lesson_visuals.mjs');
  
  // GRE Visual
  const greVisual = renderTopicVisualChart('GRE General Exam 語意與論證');
  assert.ok(greVisual.includes('GRE Verbal 填空雙空三空語意極性矩陣'), 'Must route to GRE Semantic Polarity Chart');
  assert.ok(greVisual.includes('Positive Directionality'), 'Must explain positive directionality');
  assert.ok(greVisual.includes('Contrast & Concession'), 'Must explain contrast signals');
  assert.ok(greVisual.includes('Twin Synonyms'), 'Must explain Sentence Equivalence twin synonyms');

  // GMAT Visual
  const gmatVisual = renderTopicVisualChart('GMAT 批判推理與商業長文');
  assert.ok(gmatVisual.includes('GMAT Focus Edition 批判推理因果鏈與否定測試決策樹'), 'Must route to GMAT Critical Reasoning Tree');
  assert.ok(gmatVisual.includes('Premise (客觀事實)'), 'Must map premise');
  assert.ok(gmatVisual.includes('Assumption (隱含假設)'), 'Must map assumption gap');
  assert.ok(gmatVisual.includes('Conclusion (主觀主張)'), 'Must map conclusion');
  assert.ok(gmatVisual.includes('另有他因 (Alt Cause)'), 'Must list alternative causes flaw');
  assert.ok(gmatVisual.includes('否定測試法 (Negation Technique)'), 'Must teach negation technique');
});

test('3. Exam Drill Data Structure & Subtopic Mappings Audit', async () => {
  const { GRE_DRILL_TYPES, GMAT_DRILL_TYPES, ANCHOR_DRILL_QUESTIONS } = await import('../dist/exam_drill_data.mjs');
  
  assert.equal(GRE_DRILL_TYPES.length, 6, 'GRE drill types must have 6 categories');
  assert.equal(GMAT_DRILL_TYPES.length, 8, 'GMAT drill types must have 8 categories');
  assert.ok(ANCHOR_DRILL_QUESTIONS.length >= 12, 'Anchor questions must contain at least 12 questions');

  // GRE SE Anchor Verification
  const seQ = ANCHOR_DRILL_QUESTIONS.find(q => q.subtopic && q.subtopic.includes('Sentence Equivalence'));
  assert.ok(seQ, 'Sentence equivalence anchor must exist');
  assert.equal(seQ.selectCount, 2, 'SE must require 2 selections');
  assert.ok(Array.isArray(seQ.answer) && seQ.answer.length === 2, 'SE answer must be array of 2 indices');

  // GMAT Assumption Anchor Verification
  const assQ = ANCHOR_DRILL_QUESTIONS.find(q => q.subtopic && q.subtopic.includes('Find the Assumption'));
  assert.ok(assQ, 'Assumption anchor must exist');
  assert.ok(assQ.explain.includes('否定') || assQ.explain.includes('Negation'), 'Assumption explain must mention negation test');
});

test('4. QuestionBankDB Subtopic Filtering & Sampling Audit', async () => {
  const { questionDB } = await import('../dist/question_db.mjs');
  
  // Test offline pools with anchor questions
  const greQs = JSON.parse(readFileSync('dist/questions/gre.json', 'utf8'));
  const gmatQs = JSON.parse(readFileSync('dist/questions/gmat.json', 'utf8'));
  questionDB.pools.gre = greQs;
  questionDB.pools.gmat = gmatQs;
  questionDB.loadedCategories.add('gre');
  questionDB.loadedCategories.add('gmat');

  // Subtopics count
  const greSubs = await questionDB.getSubtopics('gre');
  assert.equal(greSubs.length, 13, 'GRE must have exactly 13 subtopics');
  
  const gmatSubs = await questionDB.getSubtopics('gmat');
  assert.equal(gmatSubs.length, 10, 'GMAT must have exactly 10 subtopics');

  // Sample with subtopic filter
  const seSample = await questionDB.sampleQuestions('gre', 10, 'Sentence Equivalence');
  assert.equal(seSample.length, 10);
  assert.ok(seSample.every(q => q.subtopic.includes('Sentence Equivalence')), 'All sampled questions must match SE subtopic');

  const weakenSample = await questionDB.sampleQuestions('gmat', 5, 'Weaken the Argument');
  assert.equal(weakenSample.length, 4, 'Only four distinct items exist; do not pad with duplicates');
  assert.equal(new Set(weakenSample.map(q=>JSON.stringify([q.passage,q.prompt,q.options]))).size, weakenSample.length);
  assert.ok(weakenSample.every(q => q.subtopic.includes('Weaken')), 'All sampled questions must match Weaken subtopic');
});

test('5. Lesson Pages Teaching Chapter GRE & GMAT Drill Suite Integration Audit', async () => {
  const pages = await import('../dist/lesson_pages.mjs');

  // Render GRE Teaching Chapter
  const greHtml = pages.teachingChapter('intl:gre');
  assert.ok(greHtml.includes('GRE Verbal 核心題型實戰演練專區'), 'Must render GRE drill suite header');
  assert.ok(greHtml.includes('TC 單空題'), 'Must render TC single blank pill');
  assert.ok(greHtml.includes('SE 雙選等價'), 'Must render SE pill');
  assert.ok(greHtml.includes('data-drill-exam="gre"'), 'Must have drill exam dataset');
  assert.ok(!greHtml.includes('undefined'), 'No undefined in GRE teaching chapter');

  // Render GMAT Teaching Chapter
  const gmatHtml = pages.teachingChapter('intl:gmat');
  assert.ok(gmatHtml.includes('GMAT Focus 核心題型實戰演練專區'), 'Must render GMAT drill suite header');
  assert.ok(gmatHtml.includes('CR 削弱題'), 'Must render CR weaken pill');
  assert.ok(gmatHtml.includes('CR 假設題'), 'Must render CR assumption pill');
  assert.ok(gmatHtml.includes('data-drill-exam="gmat"'), 'Must have drill exam dataset');
  assert.ok(!gmatHtml.includes('undefined'), 'No undefined in GMAT teaching chapter');

  // Test Interactive Actions: Choice click
  let renders = 0;
  const currentGmatQ = pages.examDrillState.gmat.currentQ;
  pages.handleLessonClick({ dataset: { drillExam: 'gmat', drillChoice: String(currentGmatQ.answer) } }, () => renders++);
  assert.ok(renders > 0, 'Rerender must be triggered upon drill choice');
  assert.equal(pages.examDrillState.gmat.userAnswer, currentGmatQ.answer);
  assert.equal(pages.examDrillState.gmat.totalCorrect, 1);

  // Test Toggle Hint
  pages.handleLessonClick({ dataset: { drillExam: 'gmat', drillAction: 'hint' } }, () => renders++);
  assert.equal(pages.examDrillState.gmat.showHint, true);

  // Test Toggle Explain
  pages.handleLessonClick({ dataset: { drillExam: 'gmat', drillAction: 'explain' } }, () => renders++);
  assert.equal(pages.examDrillState.gmat.showExplain, true);

  // Test Next Question
  pages.handleLessonClick({ dataset: { drillExam: 'gmat', drillAction: 'next' } }, () => renders++);
  assert.equal(pages.examDrillState.gmat.userAnswer, null, 'User answer must reset upon next question');
});

test('6. 100% Byte-for-Byte Deployment Parity Across dist/ and site/dist/', () => {
  const syncFiles = [
    'curriculum.mjs',
    'lesson_visuals.mjs',
    'exam_drill_data.mjs',
    'question_db.mjs',
    'lesson_pages.mjs',
    'app.js'
  ];

  for (const f of syncFiles) {
    const distContent = readFileSync(`dist/${f}`, 'utf8');
    const siteContent = readFileSync(`site/dist/${f}`, 'utf8');
    assert.equal(distContent, siteContent, `dist/${f} must be byte-identical to site/dist/${f}`);
  }
});
