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
