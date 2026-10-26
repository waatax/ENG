import test from 'node:test';
import assert from 'node:assert/strict';
import { answerText, correctionTip } from '../dist/quest/coach.mjs';
import * as sound from '../dist/quest/sound.mjs';

test('answer narration reconstructs sentences and handles matching and given words', () => {
  assert.equal(answerText({ text: 'She ___ here.', answer: 'works' }), 'She works here.');
  assert.equal(answerText({ prompt: 'Birds use ___ to fly.', answer: 'wings' }), 'Birds use wings to fly.');
  assert.equal(answerText({ given: 'I am', answer: 'a student.' }), 'I am a student.');
  assert.equal(answerText({ answer: '你好', audioAfter: 'Hello.' }), 'Hello.');
  assert.equal(answerText({ type: 'match', pairs: [['cat', '貓'], ['dog', '狗']] }), 'cat，貓。dog，狗');
  assert.match(correctionTip({ type: 'input' }, 'wrok'), /wrok/);
});

test('bilingual narration selects language, slows down, cancels remaining segments and reports unavailable voices', async () => {
  const spoken = [];
  globalThis.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  globalThis.speechSynthesis = {
    getVoices: () => [{ lang: 'en-US', name: 'English' }, { lang: 'zh-TW', name: 'Chinese' }],
    cancel() {},
    speak(u) { spoken.push(u); queueMicrotask(() => u.onend()); },
  };
  try {
    assert.equal(await sound.narrate('答案 Hello. 再說一次', { slow: true }), 'ok');
    assert.deepEqual(spoken.map(u => u.lang), ['zh-TW', 'en-US', 'zh-TW']);
    assert.ok(spoken.every(u => u.rate < 0.85));
    spoken.length = 0;
    globalThis.speechSynthesis.speak = u => { spoken.push(u); queueMicrotask(() => { sound.stop(); u.onend(); }); };
    assert.equal(await sound.narrate('答案 Hello.'), 'stopped');
    assert.equal(spoken.length, 1);
    globalThis.speechSynthesis.getVoices = () => [];
    assert.equal(await sound.narrate('Hello.'), 'unavailable');
  } finally {
    delete globalThis.speechSynthesis;
    delete globalThis.SpeechSynthesisUtterance;
  }
});
