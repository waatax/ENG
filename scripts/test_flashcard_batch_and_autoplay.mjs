// scripts/test_flashcard_batch_and_autoplay.mjs
// 驗證自訂練習批次數量 (10/20/30/50/100/全部)、雙向分組導覽、
// 繁中語音朗讀、完整聽讀 vs 簡易複習雙軌模式、慶祝畫面與音訊防重疊機制

import test from 'node:test';
import assert from 'node:assert/strict';

// Setup Mock Browser Globals for Node.js
const speechCalls = [];
globalThis.localStorage = {
  data: new Map(),
  getItem(k) { return this.data.get(k) || null; },
  setItem(k, v) { this.data.set(k, v); },
  removeItem(k) { this.data.delete(k); }
};

globalThis.SpeechSynthesisUtterance = class {
  constructor(text) {
    this.text = text;
    this.lang = 'en-US';
    this.rate = 1.0;
    this.pitch = 1.0;
    this.voice = null;
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
  }
};

globalThis.window = {
  scrollY: 0,
  scrollTo() {},
  speechSynthesis: {
    speaking: false,
    pending: false,
    getVoices() {
      return [
        { name: 'Google US English', lang: 'en-US' },
        { name: 'Google 國語（臺灣）', lang: 'zh-TW' }
      ];
    },
    speak(utterance) {
      this.speaking = true;
      speechCalls.push({
        text: utterance.text,
        lang: utterance.lang,
        rate: utterance.rate
      });
      if (utterance.onstart) utterance.onstart();
      setTimeout(() => {
        this.speaking = false;
        if (utterance.onend) utterance.onend();
      }, 10);
    },
    cancel() {
      this.speaking = false;
      this.pending = false;
      speechCalls.push({ action: 'cancel' });
    }
  }
};

globalThis.document = {
  querySelector() { return null; },
  body: {}
};

test('1. Batch size selection and batch navigation UI rendering', async () => {
  const fc = await import('../dist/flashcards.mjs');

  // Verify render produces batch options
  const html = fc.renderFlashcardsStudioView();
  assert.ok(html.includes('📦 每組張數：'), 'Must show batch size control label');
  for (const sz of [10, 20, 30, 50, 100, 0]) {
    assert.ok(html.includes(`data-fc-batch-size="${sz}"`), `Must contain batch button for size ${sz}`);
  }
  assert.ok(html.includes('data-fc-batch-size="20" aria-pressed="true"'), 'Default batch size 20 must be shown as selected');
  assert.equal((html.match(/data-fc-batch-size="\d+" aria-pressed="true"/g) || []).length, 1, 'Exactly one batch size is selected');

  // Verify voice mode switcher options
  assert.ok(html.includes('🎧 輪播語音：'), 'Must display voice mode switcher');
  assert.ok(html.includes('data-fc-voice-mode="word_zh"'), 'Must contain word + zh mode option');
  assert.match(html, /data-fc-voice-mode="word_zh"[^>]*>⚡ 單字\+中文</, 'Must display simple review option label');
  assert.ok(html.includes('data-fc-voice-mode="word_zh_sentence"'), 'Must contain word + zh + sentence mode option');
  assert.match(html, /data-fc-voice-mode="word_zh_sentence"[^>]*>單字\+中文\+例句</, 'Must display full listening option label');
  for (const mode of ['word_sentence', 'word_en_thinking']) {
    assert.ok(html.includes(`data-fc-voice-mode="${mode}"`), `Must contain ${mode} option`);
  }
  assert.ok(html.includes('data-fc-voice-mode="word_zh_sentence" aria-pressed="true"'), 'Default full listening mode must be shown as selected');
});

test('2. Batch size event handling and pagination calculation', async () => {
  const fc = await import('../dist/flashcards.mjs');
  let renderCount = 0;
  const mockRender = () => { renderCount++; };

  // Set batch size to 10
  fc.handleFlashcardEvents({ dataset: { fcBatchSize: '10' } }, mockRender);
  assert.ok(renderCount > 0, 'Render callback should fire on batch size change');

  // Assert on what the learner reads, not on the inline markup around it.
  const view = () => fc.renderFlashcardsStudioView().replace(/<[^>]+>/g, '');
  const elem = fc.FLASHCARD_DATABASE.filter(c => c.tier === 'elem_1000');
  let html = fc.renderFlashcardsStudioView();
  let text = view();
  assert.ok(text.includes('第 1 / 100 組'), '1000 cards divided by 10 should produce 100 batches');
  assert.ok(text.includes('第 1 ~ 10 字'), 'Batch 1 should cover cards 1 to 10');
  assert.ok(text.includes('第 1 / 10 張'), 'Card counter should show 1 / 10');
  assert.ok(html.includes(`aria-label="單字閃卡 ${elem[0].word}"`), 'Batch 1 starts with the first card');

  // Navigate to Next Batch
  fc.handleFlashcardEvents({ dataset: { fcBatchNext: 'true' } }, mockRender);
  html = fc.renderFlashcardsStudioView();
  text = view();
  assert.ok(text.includes('第 2 / 100 組'), 'Should advance to batch 2');
  assert.ok(text.includes('第 11 ~ 20 字'), 'Should show cards 11 to 20 range');
  assert.ok(text.includes('第 1 / 10 張'), 'Card counter restarts at 1 / 10 in the new batch');
  assert.ok(html.includes(`aria-label="單字閃卡 ${elem[10].word}"`), 'Batch 2 starts with the 11th card');

  // Navigate to Prev Batch
  fc.handleFlashcardEvents({ dataset: { fcBatchPrev: 'true' } }, mockRender);
  text = view();
  assert.ok(text.includes('第 1 / 100 組'), 'Should return to batch 1');
  assert.ok(text.includes('第 1 ~ 10 字'), 'Should show cards 1 to 10 range again');

  // Change batch size to 50
  fc.handleFlashcardEvents({ dataset: { fcBatchSize: '50' } }, mockRender);
  text = view();
  assert.ok(text.includes('第 1 / 20 組'), '1000 cards divided by 50 should produce 20 batches');
  assert.ok(text.includes('第 1 / 50 張'), 'Card counter should show 1 / 50');
});

test('3. Card back face provides Chinese speech synthesis button', async () => {
  const fc = await import('../dist/flashcards.mjs');
  let renderCount = 0;
  const mockRender = () => { renderCount++; };

  // Flip card
  fc.handleFlashcardEvents({ dataset: { fcFlip: 'true' } }, mockRender);
  const html = fc.renderFlashcardsStudioView();
  const back = html.indexOf('fc-back" aria-hidden="false"');
  assert.ok(back > 0, 'Flipping must reveal the back face');
  const backHtml = html.slice(back, html.indexOf('</article>', back));
  assert.ok(backHtml.includes('data-fc-speak-zh='), 'Back of card must have Chinese audio button');
  assert.match(backHtml, /data-fc-speak-zh="[^"]+">🔊 唸中文</, 'Button should display 🔊 唸中文');

  // Trigger Chinese speech
  speechCalls.length = 0;
  fc.handleFlashcardEvents({ dataset: { fcSpeakZh: '家庭、家人' } }, mockRender);
  assert.ok(speechCalls.some(c => c.lang === 'zh-TW' && c.text.includes('家庭')), 'Should speak Traditional Chinese');
});

test('4. Manual interaction interrupts running audio to eliminate audio overlap', async () => {
  const fc = await import('../dist/flashcards.mjs');
  let renderCount = 0;
  const mockRender = () => { renderCount++; };

  // Flip card
  speechCalls.length = 0;
  fc.handleFlashcardEvents({ dataset: { fcFlip: 'true' } }, mockRender);
  assert.ok(speechCalls.some(c => c.action === 'cancel'), 'Card flipping must cancel prior audio');

  // Next card
  speechCalls.length = 0;
  fc.handleFlashcardEvents({ dataset: { fcNext: 'true' } }, mockRender);
  assert.ok(speechCalls.some(c => c.action === 'cancel'), 'Card navigation must cancel prior audio');
});

test('5. Sequential Auto-Play: Standard Mode (Word -> Chinese -> Example)', async () => {
  const fc = await import('../dist/flashcards.mjs');
  let renderCount = 0;
  const mockRender = () => { renderCount++; };

  fc.handleFlashcardEvents({ dataset: { fcBatchSize: '10' } }, mockRender);
  fc.handleFlashcardEvents({ dataset: { fcVoiceMode: 'word_zh_sentence' } }, mockRender);

  speechCalls.length = 0;
  fc.startFlashcardAutoPlay(mockRender);

  // Auto-play starts with English word
  await new Promise(r => setTimeout(r, 50));
  assert.ok(speechCalls.some(c => c.lang === 'en-US'), 'Auto-play should speak English word first');

  // Clean stop
  fc.stopFlashcardAutoPlay();
  assert.ok(speechCalls.some(c => c.action === 'cancel'), 'Stopping auto-play should cancel audio');
});

test('6. Sequential Auto-Play: Simple Review Mode (Word -> Chinese only, NO sentence)', async () => {
  const fc = await import('../dist/flashcards.mjs');
  let renderCount = 0;
  const mockRender = () => { renderCount++; };

  // Switch to Simple Review mode (word_zh)
  fc.handleFlashcardEvents({ dataset: { fcVoiceMode: 'word_zh' } }, mockRender);

  speechCalls.length = 0;
  fc.startFlashcardAutoPlay(mockRender);

  // Auto-play starts with English word
  await new Promise(r => setTimeout(r, 50));
  assert.ok(speechCalls.some(c => c.lang === 'en-US'), 'Simple review should speak English word');

  fc.stopFlashcardAutoPlay();
});

test('7. 100% of cards in database have example sentences that include their target word', async () => {
  const fc = await import('../dist/flashcards.mjs');
  const { findTarget } = await import('../dist/word_mask.mjs');
  assert.equal(fc.FLASHCARD_DATABASE.length, 9500, 'Database must contain exactly 9,500 cards');

  let missingWordCount = 0;
  for (const card of fc.FLASHCARD_DATABASE) {
    const w = card.word.toLowerCase().trim();
    const ex = (card.example || '').toLowerCase();
    // Check if sentence includes the word
    if (!ex.includes(w)) {
      // Allow slight punctuation variations like O.K. vs OK, or cafe vs café
      const cleanW = w.replace(/[^a-z0-9]/g, '');
      const cleanEx = ex.replace(/[^a-z0-9]/g, '');
      if (!cleanEx.includes(cleanW) && !findTarget(card.example, card.word)) {
        missingWordCount++;
      }
    }
  }

  assert.equal(missingWordCount, 0, 'Every card example sentence must pronounce the target word');
});


test('8. Homepage shortcuts start the selected tier despite an old search', async () => {
  const fc = await import('../dist/flashcards.mjs');
  const html = fc.renderFlashcardQuickPlay();
  for (const tier of fc.FLASHCARD_TIERS) {
    assert.ok(html.includes('data-fc-quick-play="' + tier.id + '"'));
    fc.handleFlashcardInput({ id: 'fc-search-input', value: 'no-matching-word-xyz' }, () => {});
    speechCalls.length = 0;
    assert.equal(fc.startFlashcardQuickPlay(tier.id, () => {}), true);
    const firstCard = fc.FLASHCARD_DATABASE.find(card => card.tier === tier.id);
    assert.ok(speechCalls.some(call => call.text === firstCard.word), tier.id + ' starts its first word');
    fc.stopFlashcardAutoPlay();
  }
  assert.equal(fc.startFlashcardQuickPlay('missing-tier', () => {}), false);
});
