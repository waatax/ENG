import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('1. Curriculum 4 Flagship Exams (TOEIC, SAT, GRE, GMAT) Question-Type Pedagogy Audit', async () => {
  const { curriculum } = await import('../dist/curriculum.mjs');
  const examTrack = curriculum.find(t => t.id === 'intl');
  assert.ok(examTrack, 'International exam track intl must exist');

  const targets = [
    {
      id: 'toeic',
      minQTypes: 3,
      expectedKeywords: ['Part 5', 'Part 6', 'Part 7', '詞性秒殺', '句子插入', '跨文本']
    },
    {
      id: 'sat',
      minQTypes: 3,
      expectedKeywords: ['Words in Context', 'Command of Evidence', 'Standard English', '語境詞彙', '論據', '標點']
    },
    {
      id: 'gre',
      minQTypes: 3,
      expectedKeywords: ['Text Completion', 'Sentence Equivalence', '翻案文', '邏輯密碼', '語境配對']
    },
    {
      id: 'gmat',
      minQTypes: 3,
      expectedKeywords: ['Weaken', 'Assumption', 'Boldface', '否定測試法', '致命漏洞']
    }
  ];

  for (const t of targets) {
    const chapter = examTrack.chapters.find(c => c.id === t.id);
    assert.ok(chapter, `Chapter ${t.id} must exist in curriculum`);
    assert.ok(chapter.concepts.length >= 4, `Chapter ${t.id} must have at least 4 concepts`);

    let step0Count = 0;
    let trapsCount = 0;
    let masterDemoCount = 0;

    for (const c of chapter.concepts) {
      if (c.body.includes('步驟 0') || c.body.includes('步驟0')) step0Count++;
      if (c.body.includes('致命陷阱') || c.body.includes('陷阱')) trapsCount++;
      if (c.body.includes('大師經典示範') || c.body.includes('大師解剖') || c.body.includes('示範題')) masterDemoCount++;
    }

    assert.ok(step0Count >= t.minQTypes, `${t.id} must have >= ${t.minQTypes} Step 0 Mindset sections (found: ${step0Count})`);
    assert.ok(trapsCount >= t.minQTypes, `${t.id} must have >= ${t.minQTypes} Traps Diagnosis sections (found: ${trapsCount})`);
    assert.ok(masterDemoCount >= t.minQTypes, `${t.id} must have >= ${t.minQTypes} Master Demo sections (found: ${masterDemoCount})`);

    const allText = chapter.concepts.map(c => c.heading + ' ' + c.body).join(' ');
    for (const kw of t.expectedKeywords) {
      assert.ok(allText.includes(kw), `${t.id} curriculum must mention "${kw}"`);
    }
  }
});

test('2. Lesson Visual Charts & Strategy Maps for All 4 Exams Routing Audit', async () => {
  const { renderTopicVisualChart } = await import('../dist/lesson_visuals.mjs');

  const toeicChart = renderTopicVisualChart('TOEIC 多益國際商務測驗');
  assert.ok(toeicChart.includes('TOEIC 多益 Part 5–7 核心題型破題心智地圖'), 'TOEIC chart must match strategy map');
  assert.ok(toeicChart.includes('Part 5 單句填空') && toeicChart.includes('Part 6 段落填空') && toeicChart.includes('Part 7 閱讀理解'), 'TOEIC chart must display 3 parts');

  const satChart = renderTopicVisualChart('Digital SAT Reading and Writing');
  assert.ok(satChart.includes('Digital SAT 雙模組學術三大領域解題架構藍圖'), 'SAT chart must match blueprint');
  assert.ok(satChart.includes('Words in Context') && satChart.includes('Command of Evidence') && satChart.includes('Standard English'), 'SAT chart must display 3 domains');

  const greChart = renderTopicVisualChart('GRE General Exam 語意與論證');
  assert.ok(greChart.includes('GRE Verbal 填空雙空三空語意極性矩陣'), 'GRE chart must match polarity matrix');

  const gmatChart = renderTopicVisualChart('GMAT 批判推理與商業長文');
  assert.ok(gmatChart.includes('GMAT Focus Edition 批判推理因果鏈'), 'GMAT chart must match critical reasoning tree');
});

test('3. Exam Drill Data Structure & Anchor Questions Across 4 Exams Audit', async () => {
  const {
    TOEIC_DRILL_TYPES,
    SAT_DRILL_TYPES,
    GRE_DRILL_TYPES,
    GMAT_DRILL_TYPES,
    ANCHOR_DRILL_QUESTIONS
  } = await import('../dist/exam_drill_data.mjs');

  assert.ok(TOEIC_DRILL_TYPES.length >= 6, 'TOEIC drill types must have >= 6 categories');
  assert.ok(SAT_DRILL_TYPES.length >= 6, 'SAT drill types must have >= 6 categories');
  assert.ok(GRE_DRILL_TYPES.length >= 6, 'GRE drill types must have >= 6 categories');
  assert.ok(GMAT_DRILL_TYPES.length >= 6, 'GMAT drill types must have >= 6 categories');

  for (const examId of ['toeic', 'sat', 'gre', 'gmat']) {
    const qList = ANCHOR_DRILL_QUESTIONS.filter(q => q.category === examId);
    assert.ok(qList.length >= 2, `Anchor questions must contain at least 2 questions for ${examId} (found: ${qList.length})`);
    for (const q of qList) {
      assert.ok(q.prompt, `${examId} question must have prompt`);
      assert.ok(Array.isArray(q.options) && q.options.length >= 4, `${examId} question must have >= 4 options`);
      assert.ok(q.hint, `${examId} question must have hint`);
      assert.ok(q.explain, `${examId} question must have explanation`);
    }
  }
});

test('4. Lesson Pages Teaching Chapter & Interactive Drill Suite Audit for All 4 Exams', async () => {
  const pages = await import('../dist/lesson_pages.mjs');

  for (const examId of ['toeic', 'sat', 'gre', 'gmat']) {
    const chapterHtml = pages.teachingChapter(`intl:${examId}`);
    assert.ok(chapterHtml.includes('lesson-drill-suite'), `Chapter intl:${examId} must include lesson-drill-suite`);
    assert.ok(chapterHtml.includes(`data-drill-exam="${examId}"`), `Chapter intl:${examId} must have data-drill-exam attribute`);
    assert.ok(!chapterHtml.includes('undefined'), `Chapter intl:${examId} must not contain "undefined"`);
  }

  // Interactive Single-choice Simulation on TOEIC
  const currentToeicQ = pages.ensureDrillQuestion('toeic');
  assert.ok(currentToeicQ, 'TOEIC current question must exist');
  let renders = 0;
  pages.handleLessonClick(
    { dataset: { drillExam: 'toeic', drillChoice: String(currentToeicQ.answer) } },
    () => renders++
  );
  assert.ok(renders > 0, 'Rerender must trigger upon TOEIC choice click');
  assert.equal(pages.examDrillState.toeic.userAnswer, currentToeicQ.answer);
  assert.ok(pages.examDrillState.toeic.totalAttempted >= 1);
  assert.ok(pages.examDrillState.toeic.totalCorrect >= 1);
});

test('5. 100% Byte-for-Byte Deployment Parity Across dist/ and site/dist/', async () => {
  const files = [
    'exam_drill_data.mjs',
    'lesson_visuals.mjs',
    'curriculum.mjs',
    'lesson_pages.mjs'
  ];

  for (const file of files) {
    const distPath = path.join('dist', file);
    const sitePath = path.join('site', 'dist', file);

    const distBuf = fs.readFileSync(distPath);
    const siteBuf = fs.readFileSync(sitePath);

    assert.equal(
      distBuf.compare(siteBuf),
      0,
      `${distPath} must be byte-identical to ${sitePath}`
    );
  }
});
