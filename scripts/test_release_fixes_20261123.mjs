// Regression checks for two bugs found while auditing the 2026-11-23 release.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('#sixth renders the notes and audio shapes that sixth_assets.mjs really has', async () => {
  const { sixthNotes, sixthAudioData } = await import('../dist/sixth_assets.mjs');
  const app = fs.readFileSync('dist/app.js', 'utf8');
  // The page used to call notes.keyPoints.map(), which does not exist in the data, and crashed on open.
  assert.doesNotMatch(app, /\$\{notes\.keyPoints\.map/);
  assert.match(app, /function sixthNotePoints\(notes\)/);
  assert.match(app, /function sixthAudioLines\(audio\)/);
  for (const [id, notes] of Object.entries(sixthNotes)) {
    assert.ok(Array.isArray(notes.keyPoints) || notes.coreConcepts?.length, `${id} needs keyPoints or coreConcepts`);
  }
  for (const [id, audio] of Object.entries(sixthAudioData)) {
    assert.ok(Array.isArray(audio.dialogue) || audio.readAloudPassage?.paragraphs?.length, `${id} needs dialogue or readAloudPassage`);
  }
  const { cleanText } = await import('../dist/lesson_pages.mjs');
  assert.equal(cleanText('#e91e63half past'), 'half past');
  assert.equal(cleanText('$\\textcolor{#06b6d4}{\\textbf{1-III-2}}$'), '1-III-2');
  assert.equal(cleanText('![圖解說明](./images/x.svg)'), '');
});

test('diagnostic history save does not depend on the removed honoraryBadge field', async () => {
  const src = fs.readFileSync('dist/diagnostic.mjs', 'utf8');
  assert.doesNotMatch(src, /honoraryBadge\.title/, 'must read honoraryBadge optionally');
  const { questionDB } = await import('../dist/question_db.mjs');
  const bank = JSON.parse(fs.readFileSync('dist/questions/diagnostic_bank.json', 'utf8'));
  const qs = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2].map((tier, i) => bank.filter(q => q.tier === tier)[i]);
  assert.equal(qs.length, 10);
  const ev = questionDB.evaluateDiagnostic(Object.fromEntries(qs.map(q => [q.id, 0])), qs);
  // These are the fields the saved history record and the "最近一次測驗紀錄" card read.
  assert.equal(typeof ev.scaledScore, 'number');
  assert.equal(typeof ev.rawCorrect, 'number');
  assert.equal(typeof ev.stallTierLabel, 'string');
});

// 2026-11-24 content audit of the Wave 3 additions (c57080d).
test('dictation feedback names the real mistake and accepts correctly ordered words', async () => {
  const { scoreDictation } = await import('../dist/quest/speaking_dictation.mjs');
  const a = scoreDictation('My brother takes the bus to school every day.', 'My brother take bus to school every day.');
  assert.equal(a.errorNotes.length, 2);
  assert.match(a.errorNotes[0], /字尾詞形漏聽.*takes/);
  assert.match(a.errorNotes[1], /漏聽弱讀虛詞「the」/);
  assert.ok(!a.errorNotes.some(n => /你輸入了「take」/.test(n)), 'take must not be paired with the');
  // An extra word shifts later words; they are still in the right order and must count as correct.
  assert.deepEqual(scoreDictation('I think the cat sat on the mat.', 'I think that the cat sat on the mat.').errorNotes, []);
  assert.deepEqual(scoreDictation('We went to the old museum.', 'we went to the old museum.').errorNotes, []);
  // Unstressed function words get the weak-form note, not "listen for the stress".
  assert.match(scoreDictation('Does your sister like music?', 'your sister like music?').errorNotes[0], /漏聽弱讀虛詞「Does」/);
});

test('writing checks flag real learner errors and leave correct English alone', async () => {
  const { WRITING_PROMPTS, evaluateWritingDraft } = await import('../dist/quest/reading_writing.mjs');
  const flagged = t => evaluateWritingDraft(WRITING_PROMPTS[0], t).grammarNotes.some(n => n.startsWith('⚠️'));
  for (const ok of ["I'm very like my mom.", 'She is not very like her sister.', "She's very like her sister.", 'He is married with two children.',
    'We discussed about ten ideas.', 'There are more larger rooms upstairs.', 'I look forward to seeing you.', 'This is better than that.',
    'I need some advice.', 'It is more beautiful.']) assert.equal(flagged(ok), false, ok);
  for (const bad of ['I very like music.', 'She married with him.', 'We discussed about the plan.', 'He is more taller than me.',
    'This bag is more heavier.', 'I look forward to watch the game.', 'I have many informations.']) assert.equal(flagged(bad), true, bad);
});

test('audited explanations and quiz layout stay corrected', async () => {
  const { FATAL_TRAPS } = await import('../dist/junyi_engine.mjs');
  assert.ok(FATAL_TRAPS.some(t => /prior to 改用 before/.test(t.explanation || '')), 'prior to + clause → before, not although');
  const duo = fs.readFileSync('dist/duolingo_game.mjs', 'utf8');
  assert.doesNotMatch(duo, /個人計畫要用 will \/ be going to/);
  const { MINIMAL_PAIRS } = await import('../dist/quest/speaking_dictation.mjs');
  for (const set of MINIMAL_PAIRS) for (const [w1, , w2, , sentence] of set.pairs) {
    for (const w of [w1, w2]) assert.match(sentence.toLowerCase(), new RegExp(`\\b${w}`), `${set.id}: "${sentence}" must contain ${w}`);
  }
  const mp3 = fs.readFileSync('dist/word_mp3.mjs', 'utf8');
  assert.match(mp3, /const shift=\(targetIdx\+qNo\+\[\.\.\.groupId\]/, 'answer slot must vary by group');
  assert.doesNotMatch(mp3, /聽音抽測/, 'the word is printed, so it is a meaning check, not a listening check');
  const rw = fs.readFileSync('dist/quest/reading_writing.mjs', 'utf8');
  assert.match(rw, /const readerQuizNote = /);
});
