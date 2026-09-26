import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Mock browser globals for Node.js
globalThis.localStorage = {
  data: new Map(),
  getItem(k) { return this.data.get(k) || null; },
  setItem(k, v) { this.data.set(k, v); },
  removeItem(k) { this.data.delete(k); }
};
globalThis.window = {
  scrollY: 0,
  scrollTo() {},
  speechSynthesis: {
    getVoices() { return []; },
    speak() {},
    cancel() {}
  }
};
globalThis.document = {
  querySelector() { return null; },
  body: {}
};

test('1. Phonics & Pronunciation Mastery Module Audit', async () => {
  const phonics = await import('../dist/phonics_mastery.mjs');
  assert.ok(phonics.PHONICS_MODULES.length >= 8, 'Should have at least 8 phonics modules');

  const moduleIds = phonics.PHONICS_MODULES.map(m => m.id);
  assert.ok(moduleIds.includes('letters'), 'Must include 26 letter sounds');
  assert.ok(moduleIds.includes('short_vowels'), 'Must include short vowels');
  assert.ok(moduleIds.includes('magic_e'), 'Must include Magic E');
  assert.ok(moduleIds.includes('vowel_teams'), 'Must include vowel teams');
  assert.ok(moduleIds.includes('digraphs_blends'), 'Must include consonant digraphs & blends');
  assert.ok(moduleIds.includes('bossy_r'), 'Must include Bossy R');
  assert.ok(moduleIds.includes('soft_hard_cg'), 'Must include soft/hard c & g');
  assert.ok(moduleIds.includes('syllables'), 'Must include syllable chunking');

  // Test Phonics Decoder
  const decoded = phonics.decodeWordPhonics('fantastic');
  assert.ok(decoded, 'Decoding fantastic must succeed');
  assert.equal(decoded.chunks.join(''), 'fantastic');
  assert.ok(decoded.chunks.length >= 2, 'Should divide multisyllabic word');

  // Test HTML View
  const viewHtml = phonics.renderPhonicsMasteryView();
  assert.ok(viewHtml.includes('自然拼讀'), 'View should render title');
  assert.ok(viewHtml.includes('Articulatory Anatomy'), 'View should render mouth anatomy diagram');
  assert.ok(viewHtml.includes('phonics-decoder'), 'View should render interactive decoder');
});

test('2. Graded Memory Flashcards Studio Audit', async () => {
  const fc = await import('../dist/flashcards.mjs');
  assert.ok(fc.FLASHCARD_TIERS.length >= 7, 'Should have at least 7 tiers');

  const tierIds = fc.FLASHCARD_TIERS.map(t => t.id);
  assert.ok(tierIds.includes('elem_1000'), 'Must include elementary 1000');
  assert.ok(tierIds.includes('jhs_2000'), 'Must include JHS 2000');
  assert.ok(tierIds.includes('shs_3000'), 'Must include SHS 3000');
  assert.ok(tierIds.includes('toeic'), 'Must include TOEIC');
  assert.ok(tierIds.includes('sat'), 'Must include SAT');
  assert.ok(tierIds.includes('gre'), 'Must include GRE');
  assert.ok(tierIds.includes('gmat'), 'Must include GMAT');

  // Verify flashcard items
  for (const card of fc.FLASHCARD_DATABASE) {
    assert.ok(card.id, 'Card must have id');
    assert.ok(card.word, 'Card must have word');
    assert.ok(card.chunk, `Card ${card.word} must have phonics chunking`);
    assert.ok(card.ipa, `Card ${card.word} must have ipa`);
    assert.ok(card.zh, `Card ${card.word} must have zh definition`);
    assert.ok(card.example, `Card ${card.word} must have example`);
    assert.ok(card.exampleZh, `Card ${card.word} must have example translation`);
  }

  // Test HTML View
  const fcHtml = fc.renderFlashcardsStudioView();
  assert.ok(fcHtml.includes('全階記憶閃卡館'), 'View should render title');
  assert.ok(fcHtml.includes('fc-card-stage'), 'View should render 3D flip card stage');
  assert.ok(fcHtml.includes('fc-card-face'), 'View should render card faces');
  assert.ok(fcHtml.includes('data-fc-flip="true"'), 'View should support flipping');
});

test('3. Lesson Visual Diagrams & Interactive Bridges Audit', async () => {
  const visuals = await import('../dist/lesson_visuals.mjs');
  const tChart = visuals.renderTenseTimelineChart();
  assert.ok(tChart.includes('Tenses Timeline Map'), 'Should render tense timeline SVG');
  assert.ok(tChart.includes('line'), 'Should render SVG elements');

  const pDiagram = visuals.renderPassiveVoiceDiagram();
  assert.ok(pDiagram.includes('主被動語態'), 'Should render passive voice diagram');

  const cTree = visuals.renderConditionalDecisionTree();
  assert.ok(cTree.includes('條件句與假設語氣'), 'Should render conditional tree');

  const rDiag = visuals.renderRelativeClauseDiagram();
  assert.ok(rDiag.includes('關係代名詞'), 'Should render relative clause diagram');

  const prepPyramid = visuals.renderPrepositionsPyramid();
  assert.ok(prepPyramid.includes('金字塔法則'), 'Should render preposition pyramid');

  const pBridge = visuals.renderPhonicsTipBox('Unit 1');
  assert.ok(pBridge.includes('自然拼讀與見字直讀重點提示'), 'Should render phonics tip box');

  const fcBridge = visuals.renderFlashcardBridgeBox('elem_1000', '小學必備1,000字');
  assert.ok(fcBridge.includes('單字與片語 3D 記憶閃卡直通車'), 'Should render flashcard bridge box');
});

test('4. Teaching Chapter and Micro-Lesson Integration Audit', async () => {
  const pages = await import('../dist/lesson_pages.mjs');
  const chapterHtml = pages.teachingChapter('jhs:j1');
  assert.ok(chapterHtml.includes('lesson-visual-diagram'), 'Chapter should include visual diagram');
  assert.ok(chapterHtml.includes('lesson-phonics-bridge'), 'Chapter should include phonics tip bridge');
  assert.ok(chapterHtml.includes('lesson-flashcard-bridge'), 'Chapter should include flashcard bridge');

  const unitHtml = pages.microLesson('g6-s1-u1');
  assert.ok(unitHtml.includes('lesson-visual-diagram'), 'MicroLesson should include visual diagram');
  assert.ok(unitHtml.includes('lesson-phonics-bridge'), 'MicroLesson should include phonics tip bridge');
  assert.ok(unitHtml.includes('lesson-flashcard-bridge'), 'MicroLesson should include flashcard bridge');
});

test('5. 100% Byte-for-Byte Deployment Parity Audit', () => {
  const files = [
    'phonics_mastery.mjs',
    'flashcards.mjs',
    'lesson_visuals.mjs',
    'lesson_pages.mjs',
    'audio.mjs',
    'app.js',
    'styles.css'
  ];

  for (const f of files) {
    const distContent = readFileSync(`dist/${f}`, 'utf8');
    const siteContent = readFileSync(`site/dist/${f}`, 'utf8');
    assert.equal(distContent, siteContent, `dist/${f} must match site/dist/${f}`);
  }
});
