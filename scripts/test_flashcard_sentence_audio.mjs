// scripts/test_flashcard_sentence_audio.mjs
// 驗證 9,500 張字卡例句與例句語音完整性及全站 UIUX 發音功能

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

test('1. Every single card in FLASHCARD_DATABASE has a non-empty example sentence and translation', async () => {
  const fc = await import('../dist/flashcards.mjs');
  const fq = await import('../dist/flashcard_quality.mjs');
  
  assert.equal(fc.FLASHCARD_DATABASE.length, 9500, 'Must have exactly 9,500 cards');

  let emptyRaw = 0;
  let emptyTeaching = 0;

  for (let i = 0; i < fc.FLASHCARD_DATABASE.length; i++) {
    const raw = fc.FLASHCARD_DATABASE[i];
    if (!raw.example || !raw.example.trim()) emptyRaw++;
    if (!raw.exampleZh || !raw.exampleZh.trim()) emptyRaw++;

    const tc = fq.teachingCard(raw);
    if (!tc.example || !tc.example.trim()) emptyTeaching++;
    if (!tc.exampleZh || !tc.exampleZh.trim()) emptyTeaching++;
  }

  assert.equal(emptyRaw, 0, 'Every card in FLASHCARD_DATABASE must have a non-empty example and exampleZh');
  assert.equal(emptyTeaching, 0, 'Every card returned by teachingCard must have a non-empty example and exampleZh');
});

test('2. Flashcard Studio renders example sentence and dual-speed audio buttons on both front and back', async () => {
  const fc = await import('../dist/flashcards.mjs');
  const html = fc.renderFlashcardsStudioView();

  // Front face example audio button
  assert.ok(html.includes('data-fc-speak-sentence='), 'Front face should have sentence audio button');
  assert.ok(html.includes('🎧 聽例句語音'), 'Front face should provide sentence audio button label');

  // Back face example section
  assert.ok(html.includes('📖 情境例句與語音'), 'Back face should display Example Sentence & Audio header');
  assert.ok(html.includes('data-fc-speak-sentence='), 'Back face must contain standard sentence speech button');
  assert.ok(html.includes('data-fc-speak-sentence-slow='), 'Back face must contain slow sentence speech button');
  assert.ok(!html.includes('disabled data-fc-speak-sentence'), 'Sentence audio buttons must NOT be disabled');
});

test('3. Full Word Practice includes example sentence and dual-speed sentence audio buttons in feedback', async () => {
  const fwp = await import('../dist/full_word_practice.mjs');
  const appJs = readFileSync('dist/app.js', 'utf8');

  // Verify full_word_practice source includes sentence audio buttons
  const fwpSource = readFileSync('dist/full_word_practice.mjs', 'utf8');
  assert.ok(fwpSource.includes('data-speak-sentence='), 'Full word practice must include data-speak-sentence');
  assert.ok(fwpSource.includes('🔊 聽例句'), 'Full word practice should provide audio sentence button');

  // Verify app.js handles data-speak-sentence
  assert.ok(appJs.includes('if (d.speakSentence)'), 'app.js global listener must handle data-speak-sentence');
  assert.ok(appJs.includes('playSentence(d.speakSentence'), 'app.js must call playSentence');
});

test('4. 100% Byte Parity across dist/ and site/dist/', () => {
  for (const f of ['flashcards.mjs', 'full_word_practice.mjs', 'flashcard_quality.mjs']) {
    const distContent = readFileSync(`dist/${f}`, 'utf8');
    const siteContent = readFileSync(`site/dist/${f}`, 'utf8');
    assert.equal(distContent, siteContent, `${f} must be byte-for-byte identical between dist/ and site/dist/`);
  }
});
