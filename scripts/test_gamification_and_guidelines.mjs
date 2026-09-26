// test_gamification_and_guidelines.mjs
// 深度驗證 Duolingo 遊戲學習引擎 (限定第一章) 與 108 課綱/CEFR 評量指引總體檢核矩陣

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Setup browser mock environment for Node.js
globalThis.localStorage = {
  data: new Map(),
  getItem(k) { return this.data.get(k) || null; },
  setItem(k, v) { this.data.set(k, v); }
};
globalThis.window = {
  scrollY: 0,
  scrollTo() {},
  AudioContext: class {
    constructor() { this.currentTime = 0; this.state = 'running'; }
    resume() {}
    createOscillator() {
      return {
        type: 'sine',
        frequency: { setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {},
        start() {},
        stop() {}
      };
    }
    createGain() {
      return {
        gain: { setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {}
      };
    }
  },
  speechSynthesis: {
    speak() {},
    cancel() {}
  }
};
globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
globalThis.document = { querySelector() { return null; } };

const { curriculum } = await import('../dist/curriculum.mjs');
const { UNIFIED_GRADES } = await import('../dist/curriculum_unified.mjs');
const { 
  isDuolingoEligible, 
  renderDuolingoHeroBanner, 
  renderDuolingoGameView, 
  duolingoState, 
  resetDuolingoGame, 
  handleDuolingoClick,
  playDuolingoSound,
  speakSentence
} = await import('../dist/duolingo_game.mjs');
const { getAllCurriculumMaterials, renderCurriculumMatrixView } = await import('../dist/curriculum_matrix.mjs');
const { teachingChapter, microLesson } = await import('../dist/lesson_pages.mjs');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 測試群組 1：Duolingo 遊戲學習嚴格限定第一章 (Scope Guard)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
test('Duolingo Gamified Quest Mode is strictly restricted to Chapter J1', () => {
  // J1 必須符合
  assert.equal(isDuolingoEligible('jhs:j1'), true);
  assert.equal(isDuolingoEligible('j1'), true);

  // 所有其他 26 個章節皆不可啟用遊戲模式
  const allOtherChapters = curriculum.flatMap(t => t.chapters).filter(c => c.id !== 'j1');
  assert.equal(allOtherChapters.length, 26);

  for (const c of allOtherChapters) {
    assert.equal(isDuolingoEligible(c.id), false, `Chapter ${c.id} should NOT be eligible for Duolingo!`);
    const banner = renderDuolingoHeroBanner(c.id);
    assert.equal(banner, '', `Chapter ${c.id} should have empty banner!`);
  }
});

test('Chapter J1 teaching page renders Duolingo Game banner & alignment box, while other chapters stay pure', () => {
  const htmlJ1 = teachingChapter('jhs:j1');
  assert.ok(htmlJ1.includes('DUOLINGO 互動遊戲學習旗艦體驗'), 'J1 must include Duolingo banner');
  assert.ok(htmlJ1.includes('多鄰國闖關模式'), 'J1 must include Duolingo quest mode');
  assert.ok(htmlJ1.includes('lesson-alignment-box'), 'J1 must include alignment box');
  assert.ok(htmlJ1.includes('1-Ⅳ-4 / 2-Ⅳ-2 / 3-Ⅳ-2 / 4-Ⅳ-1 / Ac-Ⅳ-1'), 'J1 must show 108 curriculum code');
  assert.ok(htmlJ1.includes('A2 (初級精熟 · 國中會考滿分基礎)'), 'J1 must show CEFR level');

  // 測試 J2 至其他章節，確認絕無 Duolingo 遊戲橫幅干擾
  const htmlJ2 = teachingChapter('jhs:j2');
  assert.ok(!htmlJ2.includes('DUOLINGO 互動遊戲學習旗艦體驗'), 'J2 must NOT include Duolingo');
  assert.ok(!htmlJ2.includes('多鄰國闖關模式'), 'J2 must NOT include Duolingo');
  assert.ok(htmlJ2.includes('lesson-alignment-box'), 'J2 must still include official alignment box');
  assert.ok(htmlJ2.includes('3-Ⅳ-2 / 4-Ⅳ-1 / Ac-Ⅳ-2'), 'J2 must show 108 curriculum code');

  const htmlS1 = teachingChapter('sh:s1');
  assert.ok(!htmlS1.includes('DUOLINGO 互動遊戲學習旗艦體驗'), 'S1 must NOT include Duolingo');
  assert.ok(htmlS1.includes('3-Ⅴ-2 / 4-Ⅴ-1 / Ac-Ⅴ-1'), 'S1 must show 108 curriculum code');
  assert.ok(htmlS1.includes('B1+ (高中學測前標)'), 'S1 must show CEFR level');
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 測試群組 2：Duolingo 核心遊戲循環與關卡互動 (Game Mechanics)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
test('Duolingo Game State & Mechanics: Audio, Hearts, Word Bank, Match, Listen, Trap & Stories', () => {
  resetDuolingoGame();
  assert.equal(duolingoState.hearts, 5);
  assert.equal(duolingoState.stageIndex, 0);
  assert.equal(duolingoState.totalStages, 5);
  assert.equal(duolingoState.completed, false);

  // 音效與語音呼叫不崩潰
  assert.doesNotThrow(() => playDuolingoSound('correct'));
  assert.doesNotThrow(() => playDuolingoSound('wrong'));
  assert.doesNotThrow(() => playDuolingoSound('match'));
  assert.doesNotThrow(() => playDuolingoSound('victory'));
  assert.doesNotThrow(() => speakSentence('Actions speak louder than words.', 1.0));

  // 模擬開啟遊戲
  duolingoState.isOpen = true;
  let view = renderDuolingoGameView();
  assert.ok(view.includes('關卡 1 / 5 · 單字積木拼句'));
  assert.ok(view.includes('行動勝於空談'));

  // 模擬 Stage 1 組裝錯誤 (少詞)
  duolingoState.s1Selected = ['Actions', 'speak'];
  let rerenders = 0;
  handleDuolingoClick({ dataset: { duoAction: 's1-check' } }, () => rerenders++);
  assert.equal(duolingoState.hearts, 4, 'Hearts should decrease on wrong answer');
  assert.equal(duolingoState.drawer.isCorrect, false);

  // 模擬 Stage 1 組裝正確
  duolingoState.s1Selected = ['Actions', 'speak', 'louder', 'than', 'words.'];
  handleDuolingoClick({ dataset: { duoAction: 's1-check' } }, () => rerenders++);
  assert.equal(duolingoState.drawer.isCorrect, true);
  assert.ok(duolingoState.xpEarned >= 10);

  // 前進到 Stage 2: 連連看
  handleDuolingoClick({ dataset: { duoAction: 'next-stage' } }, () => rerenders++);
  assert.equal(duolingoState.stageIndex, 1);
  view = renderDuolingoGameView();
  assert.ok(view.includes('關卡 2 / 5 · 連連看急速配對'));
  assert.equal(duolingoState.s2Tiles.length, 12);

  // 前進到 Stage 3: 盲聽組裝
  duolingoState.stageIndex = 2;
  view = renderDuolingoGameView();
  assert.ok(view.includes('關卡 3 / 5 · 聽音拼句挑戰'));
  assert.ok(view.includes('正常速度 (1.0x)'));
  assert.ok(view.includes('烏龜慢速 (0.6x)'));

  // 前進到 Stage 4: 考場地雷急速射擊
  duolingoState.stageIndex = 3;
  view = renderDuolingoGameView();
  assert.ok(view.includes('關卡 4 / 5 · 考場避雷急速射擊'));
  assert.ok(view.includes('ice ________ into water above 0°C'));

  // 答對 melts
  handleDuolingoClick({ dataset: { duoAction: 's4-answer', index: '0' } }, () => rerenders++);
  assert.equal(duolingoState.drawer.isCorrect, true);
  assert.ok(duolingoState.drawer.message.includes('現在簡單式 melts'));

  // 前進到 Stage 5: 對話接龍
  duolingoState.stageIndex = 4;
  view = renderDuolingoGameView();
  assert.ok(view.includes('關卡 5 / 5 · 情境對話接龍'));
  assert.ok(view.includes('Alex:'));

  // 答對選項 0
  handleDuolingoClick({ dataset: { duoAction: 's5-answer', index: '0' } }, () => rerenders++);
  assert.equal(duolingoState.drawer.isCorrect, true);

  // 通關抽屜結算
  handleDuolingoClick({ dataset: { duoAction: 'next-stage' } }, () => rerenders++);
  assert.equal(duolingoState.completed, true);
  view = renderDuolingoGameView();
  assert.ok(view.includes('闖關大滿貫！LESSON COMPLETE'));
  assert.ok(view.includes('獲得經驗值'));
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 測試群組 3：教材課綱指標與 CEFR 指引完整性 (Curriculum Guidelines)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
test('All 61 units across G6 to G12 have valid 108 indicators, stage, CEFR and guidelines', () => {
  const allUnits = UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units));
  assert.equal(allUnits.length, 61);

  for (const u of allUnits) {
    assert.ok(u.id, `Unit missing id: ${JSON.stringify(u)}`);
    assert.ok(u.title, `Unit ${u.id} missing title`);
    assert.ok(u.indicator, `Unit ${u.id} missing indicator`);
    assert.ok(u.stage, `Unit ${u.id} missing stage`);
    assert.ok(u.cefr, `Unit ${u.id} missing cefr`);
    assert.ok(u.competency, `Unit ${u.id} missing competency`);
    assert.ok(u.guideline, `Unit ${u.id} missing guideline`);

    // microLesson 渲染檢查
    const html = microLesson(u.id);
    assert.ok(html.includes(`課綱: ${u.indicator}`), `microLesson ${u.id} must display indicator`);
    assert.ok(html.includes(`CEFR: ${u.cefr}`), `microLesson ${u.id} must display CEFR`);
  }
});

test('All 27 exam chapters have valid 108 curriculum codes, stage, CEFR and guidelines', () => {
  const allChapters = curriculum.flatMap(t => t.chapters);
  assert.equal(allChapters.length, 27);

  for (const c of allChapters) {
    assert.ok(c.id, `Chapter missing id`);
    assert.ok(c.title, `Chapter ${c.id} missing title`);
    assert.ok(c.curriculumCode, `Chapter ${c.id} missing curriculumCode`);
    assert.ok(c.stage, `Chapter ${c.id} missing stage`);
    assert.ok(c.cefr, `Chapter ${c.id} missing cefr`);
    assert.ok(c.competency, `Chapter ${c.id} missing competency`);
    assert.ok(c.learningPerformance, `Chapter ${c.id} missing learningPerformance`);
    assert.ok(c.learningContent, `Chapter ${c.id} missing learningContent`);
    assert.ok(c.guideline, `Chapter ${c.id} missing guideline`);
  }
});

test('Curriculum Matrix aggregates exactly 88 materials with 100% coverage', () => {
  const materials = getAllCurriculumMaterials();
  assert.equal(materials.length, 88); // 61 units + 27 chapters

  const unitsCount = materials.filter(m => m.type === 'academic_unit').length;
  const chaptersCount = materials.filter(m => m.type === 'exam_chapter').length;
  assert.equal(unitsCount, 61);
  assert.equal(chaptersCount, 27);

  // 驗證沒有任何未定義欄位
  for (const m of materials) {
    assert.ok(m.title, 'title required');
    assert.ok(m.indicator, 'indicator required');
    assert.ok(m.cefr, 'cefr required');
    assert.ok(m.competency, 'competency required');
    assert.ok(m.guideline, 'guideline required');
  }

  // 驗證 HTML 矩陣視圖渲染
  const matrixHtml = renderCurriculumMatrixView();
  assert.ok(matrixHtml.includes('108 課綱與 CEFR 評量指引總體檢核矩陣'));
  assert.ok(matrixHtml.includes('100% 貫通'));
  assert.ok(matrixHtml.includes('A1 至 C2 全覆蓋'));
  assert.ok(matrixHtml.includes('共符合 88 項教材模組'));
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 測試群組 4：雙部署副本完全一致性 (Deployment Synchronization)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
test('All deployed copies in dist/ and site/dist/ remain 100% byte-identical', () => {
  const files = [
    'app.js',
    'curriculum.mjs',
    'curriculum_unified.mjs',
    'duolingo_game.mjs',
    'curriculum_matrix.mjs',
    'lesson_pages.mjs',
    'styles.css'
  ];

  for (const f of files) {
    const distContent = readFileSync(`dist/${f}`, 'utf8');
    const siteContent = readFileSync(`site/dist/${f}`, 'utf8');
    assert.equal(distContent, siteContent, `File mismatch in site/dist/${f}`);
  }
});
