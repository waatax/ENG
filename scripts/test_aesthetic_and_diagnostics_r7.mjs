import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spellingFeedback, normalizeRecall } from '../dist/recall.mjs';
import { createCourse } from '../dist/quest/engine.mjs';
import { unitLab } from '../dist/quest/lab.mjs';
import { unitMissions, renderUnitMissions } from '../dist/quest/missions.mjs';
import { diagnose, errorFeedbackSpeechText, feedbackText, answerText } from '../dist/quest/coach.mjs';
import { wordStructure, renderWordStructure } from '../dist/word_structure.mjs';
import { sfx } from '../dist/quest/sound.mjs';

const memory = () => {
  const map = new Map();
  return { getItem: k => map.get(k) || null, setItem: (k, v) => map.set(k, v) };
};

test('Loop 1: UI/UX design tokens and tactile styling in learning_joy.css', () => {
  const css = fs.readFileSync('dist/learning_joy.css', 'utf8');
  assert.ok(css.includes('--joy-paper'), 'defines paper background token');
  assert.ok(css.includes('--joy-accent'), 'defines forest green accent token');
  assert.ok(css.includes('--joy-shadow'), 'defines card elevation shadow token');
  assert.ok(css.includes('.sp-match'), 'defines spelling match highlight');
  assert.ok(css.includes('.sp-mismatch'), 'defines spelling mismatch highlight');
  assert.ok(css.includes('.sp-missing'), 'defines spelling missing characters highlight');
  assert.ok(css.includes('.recall-tip'), 'defines diagnostic tip box styling');
  assert.ok(css.includes('@media(max-width:600px)'), 'contains mobile responsive rules');
  assert.ok(css.includes('@media(prefers-color-scheme:dark)'), 'contains dark mode styling');
});

test('Loop 2: Flashcard vocabulary learning & intelligent spelling error diagnostics', () => {
  // Transposition detection
  const transposed = spellingFeedback('teh', 'the');
  assert.ok(!transposed.ok);
  assert.match(transposed.text, /第 2 個字元/);
  assert.match(transposed.tip, /相鄰字母順序顛倒/);
  assert.ok(transposed.diffHtml.includes('sp-mismatch'));

  // Silent k
  const silentK = spellingFeedback('now', 'know');
  assert.ok(!silentK.ok);
  assert.match(silentK.tip, /默音字母/);

  // Silent b
  const silentB = spellingFeedback('dout', 'doubt');
  assert.ok(!silentB.ok);
  assert.match(silentB.tip, /默音字母/);

  // ie vs ei rule
  const receiveErr = spellingFeedback('recieve', 'receive');
  assert.ok(!receiveErr.ok);
  assert.match(receiveErr.tip, /i before e except after c/);

  // Double consonant
  const tomorrowErr = spellingFeedback('tomorow', 'tomorrow');
  assert.ok(!tomorrowErr.ok);
  assert.match(tomorrowErr.tip, /雙重子音/);

  // Silent p (receipt)
  const receiptErr = spellingFeedback('receit', 'receipt');
  assert.ok(!receiptErr.ok);
  assert.match(receiptErr.tip, /默音字母/);

  // Silent t (listen)
  const listenErr = spellingFeedback('lisen', 'listen');
  assert.ok(!listenErr.ok);
  assert.match(listenErr.tip, /默音字母/);

  // -able vs -ible suffix
  const possibleErr = spellingFeedback('possable', 'possible');
  assert.ok(!possibleErr.ok);
  assert.match(possibleErr.tip, /-able 與 -ible/);

  // Homophone: their vs there
  const homophoneErr = spellingFeedback('there', 'their');
  assert.ok(!homophoneErr.ok);
  assert.match(homophoneErr.tip, /同音辨析/);

  // Exact match
  const exact = spellingFeedback('beautiful', 'beautiful');
  assert.ok(exact.ok);
  assert.ok(exact.tip.includes('出聲跟讀'));
});

test('Loop 3: All 141 units provide at least 10% useful content with explanations', () => {
  const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
  const course = createCourse(index);
  for (const t of [...index.sections, ...index.branches]) {
    course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
  }

  assert.equal(course.units.size, 141, 'all 141 course and semester units present');
  let totalMissions = 0, totalPhrases = 0, totalCards = 0;

  for (const u of course.units.values()) {
    const lab = unitLab(course, u.id);
    assert.ok(lab.baseline > 0, `${u.id} has questions`);
    const tenPercent = Math.ceil(lab.baseline * 0.1);
    assert.ok(lab.cards.length >= tenPercent, `${u.id} has >= 10% retrieval cards`);
    assert.ok(lab.phrases.length >= tenPercent, `${u.id} has >= 10% practical expressions`);
    assert.ok(lab.missions.length >= tenPercent, `${u.id} has >= 10% transfer missions`);

    // Verify mission content completeness
    for (const m of lab.missions) {
      assert.ok(m.title, 'mission has title');
      assert.ok(m.task, 'mission has task');
      assert.ok(m.check, 'mission has check criteria');
      assert.ok(m.answer, 'mission has answer');
      assert.ok(m.why, 'mission has pedagogical explanation');
    }

    totalMissions += lab.missions.length;
    totalPhrases += lab.phrases.length;
    totalCards += lab.cards.length;
  }

  assert.ok(totalMissions >= 1480, `total missions ${totalMissions} >= 1480`);
  assert.ok(totalPhrases >= 1480, `total phrases ${totalPhrases} >= 1480`);
  assert.ok(totalCards >= 1480, `total cards ${totalCards} >= 1480`);
});

test('Loop 4: Deep error explanations & smart pedagogical diagnostics for errors', () => {
  // Emotion adjectives: -ed vs -ing
  const q1 = { type: 'choice', answer: 'interested', options: ['interested', 'interesting'], why: '人感到有興趣用 interested in。' };
  const d1 = diagnose(q1, 'interesting');
  assert.match(d1, /情緒分詞辨析/);

  // Confusable pair: affect vs effect
  const q2 = { type: 'choice', answer: 'affect', options: ['affect', 'effect'], why: '空格需填動詞。' };
  const d2 = diagnose(q2, 'effect');
  assert.match(d2, /affect.*effect/);

  // Confusable pair: borrow vs lend
  const q3 = { type: 'choice', answer: 'borrow', options: ['borrow', 'lend'], why: '跟別人借入。' };
  const d3 = diagnose(q3, 'lend');
  assert.match(d3, /借入.*借出/);

  // Confusable pair: sensible vs sensitive
  const q4 = { type: 'choice', answer: 'sensible', options: ['sensible', 'sensitive'], why: '指明智的決定。' };
  const d4 = diagnose(q4, 'sensitive');
  assert.match(d4, /明智.*敏感/);

  // Confusable pair: accept vs except
  const q6 = { type: 'choice', answer: 'accept', options: ['accept', 'except'], why: '動詞接受。' };
  const d6 = diagnose(q6, 'except');
  assert.match(d6, /接受.*除/);

  // Confusable pair: breath vs breathe
  const q7 = { type: 'choice', answer: 'breathe', options: ['breath', 'breathe'], why: '動詞呼吸。' };
  const d7 = diagnose(q7, 'breath');
  assert.match(d7, /呼吸/);

  // Confusable pair: desert vs dessert
  const q8 = { type: 'choice', answer: 'dessert', options: ['desert', 'dessert'], why: '餐後甜點。' };
  const d8 = diagnose(q8, 'desert');
  assert.match(d8, /甜點/);

  // Indefinite pronouns agreement
  const q5 = { type: 'choice', answer: 'everyone', options: ['everyone', 'all'], why: '後接單數動詞 is。' };
  const d5 = diagnose(q5, 'all');
  assert.match(d5, /限定詞看語氣與數量/);

  // Error feedback speech text includes contrast and why
  const speech = errorFeedbackSpeechText(q1, 'interesting', { diagnosis: d1 });
  assert.match(speech, /你剛才回答「interesting」/);
  assert.match(speech, /正確答案是「interested」/);
  assert.match(speech, /錯在哪裡？/);
  assert.match(speech, /為什麼？/);
});

test('Loop 5: Any level progression & word morphology support', () => {
  // Compound words
  assert.ok(wordStructure('sunflower') !== null);
  assert.ok(wordStructure('earthquake') !== null);
  assert.ok(wordStructure('waterfall') !== null);
  assert.ok(wordStructure('playground') !== null);
  assert.ok(wordStructure('skyscraper') !== null);
  assert.ok(wordStructure('masterpiece') !== null);

  // Prefixes & Suffixes
  assert.ok(wordStructure('impossible') !== null);
  assert.ok(wordStructure('invisible') !== null);
  assert.ok(wordStructure('encourage') !== null);
  assert.ok(wordStructure('export') !== null);
  assert.ok(wordStructure('spectator') !== null);
  assert.ok(wordStructure('bicycle') !== null);
  assert.ok(wordStructure('triangle') !== null);

  // Word structure rendering
  const html = renderWordStructure({ word: 'sunflower' });
  assert.ok(html.includes('morpheme-grid'));
  assert.ok(html.includes('太陽'));
  assert.ok(html.includes('花'));
});

test('Loop 6: Gamification audio synthesis without crashes', () => {
  // sfx runs safely in Node environment without Throwing
  assert.doesNotThrow(() => {
    sfx('correct');
    sfx('wrong');
    sfx('done');
    sfx('tap');
    sfx('combo');
    sfx('flip');
    sfx('streak');
  });
});
