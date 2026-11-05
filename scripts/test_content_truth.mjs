// Content gate for the 2026-11-05 round: fails if generated filler returns, a unit falls under +10%, or a wrong answer goes unexplained.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { BANNED_COLLOCATION, BANNED_TIP, cardFlags, containsWord, templateFrames } from './card_quality_rules.mjs';
import { boostItemProblems, boostTarget } from './boost_rules.mjs';
import { createCourse } from '../dist/quest/engine.mjs';
import { teachingCard } from '../dist/flashcard_quality.mjs';
import { unitLab } from '../dist/quest/lab.mjs';
import { diagnose, makeGlossary } from '../dist/quest/coach.mjs';
import { findTarget, maskTarget } from '../dist/word_mask.mjs';
import { alignLetters, spellingFeedback } from '../dist/recall.mjs';
import { applyPick, pickRound, shuffled } from '../dist/quest/boost.mjs';
globalThis.localStorage = { getItem() { return null; }, setItem() {} };
const { FLASHCARD_DATABASE: db } = await import('../dist/flashcards.mjs');
const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const course = createCourse(index);
for (const t of [...index.sections, ...index.branches]) course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));

test('no learner sees a generated sentence frame, collocation, memory tip, or guessed IPA', () => {
  const frames = templateFrames(db);
  assert.equal(frames.length, 0, `template frames: ${frames.slice(0, 3).map(f => f[0]).join(' | ')}`);
  const shown = db.map(teachingCard);
  const flags = cardFlags(shown);
  assert.deepEqual(flags.filter(f => f.collocationTemplate && shown.find(c => c.id === f.id).collocation).map(f => f.id).slice(0, 5), []);
  assert.deepEqual(flags.filter(f => f.tipTemplate && shown.find(c => c.id === f.id).memoryTip).map(f => f.id).slice(0, 5), []);
  assert.deepEqual(flags.filter(f => f.ipaProblem === 'guess').map(f => f.id).slice(0, 5), []);
});
test('every example sentence contains its word, with no filler anywhere', () => {
  const miss = db.filter(c => !containsWord(c.example, c.word) && !findTarget(c.example, c.word));
  assert.ok(miss.length <= 20, `missing target: ${miss.slice(0, 5).map(c => c.word).join(', ')} (${miss.length})`);
  assert.equal(db.map(teachingCard).filter(c => BANNED_TIP.test(c.memoryTip || '') || BANNED_COLLOCATION.test(c.collocation || '')).length, 0);
});
test('recorded zh that the MP3s speak is unchanged', () => {
  const manifest = JSON.parse(fs.readFileSync('dist/audio/words/senior-001.json'));
  const byId = new Map(db.map(c => [c.id, c]));
  for (const w of manifest.words) assert.equal(byId.get(w.id).zh, w.zh);
});
test('every unit gains at least 10% new booster items, each explaining every wrong option', () => {
  const units = [...course.units.values()];
  assert.equal(units.length, 141);
  let total = 0;
  for (const u of units) {
    const items = JSON.parse(fs.readFileSync(`dist/quest/boost/${u.id}.json`));
    assert.ok(items.length >= boostTarget(unitLab(course, u.id)), `${u.id}: ${items.length}`);
    for (const it of items) assert.deepEqual(boostItemProblems(it), [], it.id);
    total += items.length;
  }
  assert.ok(total >= 1900, String(total));
});
test('at least 95% of wrong options get their own explanation; hollow text is gone', () => {
  const all = [...course.items.values()].filter(q => q.f && !['semester-items', 'placement-advanced', 'exams', 'vocab'].includes(q.f));
  const gloss = makeGlossary(all);
  let options = 0, covered = 0;
  for (const q of all) {
    if (!q.options || !['choice', 'listen'].includes(q.type)) continue;
    for (const o of q.options) { if (String(o) === String(q.answer)) continue; options++; if (diagnose(q, o, { gloss })) covered++; }
  }
  const pct = covered / options * 100;
  assert.ok(pct >= 95, `${pct.toFixed(1)}%`);
  assert.equal(all.filter(q => /先確認詞義，再配合本單元情境練習|不聲稱是官方/.test(q.why || '')).length, 0);
});
test('word masking handles inflections without touching longer words', () => {
  assert.equal(maskTarget('Heavy snow hampered rescue teams.', 'hamper').token, 'hampered');
  assert.equal(maskTarget('She studied hard.', 'study').token, 'studied');
  assert.equal(maskTarget('He stopped the car.', 'stop').token, 'stopped');
  assert.equal(findTarget('Her career grew.', 'car'), null);
  assert.equal(maskTarget('The traffic light turned red.', 'traffic light').token, 'traffic light');
});
test('spelling feedback marks only the letter that differs and names a visible cause', () => {
  assert.deepEqual(alignLetters('famly', 'family').filter(o => o.kind !== 'match'), [{ kind: 'missing', ch: 'i' }]);
  const f = spellingFeedback('famly', 'family');
  assert.match(f.tip, /少了字母「i」/);
  assert.doesNotMatch(spellingFeedback('xyzzy', 'family').tip, /弱讀/);
});
test('booster retries a missed item and shuffles deterministically', () => {
  const it = { id: 'a', answer: 'x', options: ['x', 'y', 'z'] };
  const run = { queue: [it], index: 0, picked: null, firstRight: 0, missed: 0 };
  assert.equal(applyPick(run, 'y'), false);
  assert.equal(run.queue.length, 2);
  assert.equal(run.queue[1]._retry, true);
  assert.deepEqual(shuffled(it.options, 's'), shuffled(it.options, 's'));
  assert.equal(pickRound([{ id: 'a' }, { id: 'b' }], ['a'], 5)[0].id, 'b');
});
