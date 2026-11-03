import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ALL_LEVEL_BANDS, STORAGE_KEYS, computeMasteryPassport, exportFullSiteBackup, restoreFullSiteBackup, renderMasteryPassportSection } from '../dist/mastery_passport.mjs';
import { MINIMAL_PAIRS, DICTATION_ITEMS, scoreDictation, evaluateSpokenMatch, renderShadowingWidget, renderSpeakingDictationStudio } from '../dist/quest/speaking_dictation.mjs';
import { WRITING_PROMPTS, evaluateWritingDraft, lookupWordGloss, renderWritingStudio } from '../dist/quest/reading_writing.mjs';

function makeMockStorage(initial = {}) {
  const map = new Map(Object.entries(initial).map(([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)]));
  return {
    getItem: k => map.get(k) ?? null,
    setItem: (k, v) => map.set(k, String(v))
  };
}

test('1. Mastery Passport aggregates all 6 skills and round-trips full-site backup/restore', () => {
  assert.equal(ALL_LEVEL_BANDS.length, 4);
  assert.ok(STORAGE_KEYS.length >= 10);

  const store = makeMockStorage({
    'english-quest-game-v2': {
      schema: 2,
      xp: { total: 180 },
      days: ['2026-11-01', '2026-11-02'],
      nodes: { 'u1:q1': { n: 2 }, 'u1:q2': { n: 1 } },
      crowns: { u1: 1 },
      stories: { 'story-prea1-01': 1 },
      items: { i1: { c: 3, m: 1 } },
      stats: { fixed: 4, listen: 6 }
    },
    'eq-mnemonics-v1': { progress: { 'fc-el-0001': 1, 'fc-el-0002': 1 } },
    'english-quest-studio-v1': {
      minimalPairsDone: 3,
      dictationDone: 2,
      spokenChecks: 5,
      readStories: { 'story-a1-01': 1 },
      writingDrafts: { 'w-b1': { text: 'Daily exercise is great.' } }
    }
  });

  const passport = computeMasteryPassport(store);
  assert.equal(passport.questXp, 180);
  assert.equal(passport.questNodes, 2);
  assert.equal(passport.storiesRead, 2);
  assert.equal(passport.skills.length, 6);
  assert.ok(passport.hasAnyProgress);
  assert.match(passport.nextAction.title, /錯題本有 1 題/);

  const backupJson = exportFullSiteBackup(store);
  const freshStore = makeMockStorage();
  const res = restoreFullSiteBackup(backupJson, freshStore);
  assert.equal(res.ok, true);
  assert.equal(res.restored, 3);
  assert.equal(computeMasteryPassport(freshStore).questXp, 180);

  const html = renderMasteryPassportSection('intermediate', freshStore);
  assert.match(html, /B1–B2/);
  assert.match(html, /全站學習護照/);
});

test('2. Minimal Pairs (12 contrasts), 3-Speed Dictation, and Speaking Coach evaluate accurately', () => {
  assert.equal(MINIMAL_PAIRS.length, 12);
  assert.equal(DICTATION_ITEMS.length, 12);

  const exact = scoreDictation('Good morning, nice to meet you.', 'good morning nice to meet you');
  assert.equal(exact.accuracy, 100);
  assert.equal(exact.isExact, true);

  const partial = scoreDictation('My brother takes the bus to school every day.', 'My brother take the bus to school every day');
  assert.equal(partial.matchedCount, 8);
  assert.equal(partial.totalCount, 9);

  const spoken = evaluateSpokenMatch('Can I have a cup of water, please?', 'can I have a cup of water');
  assert.equal(spoken.matchedWords, 7);
  assert.equal(spoken.totalWords, 8);
  assert.equal(spoken.status, 'great');

  const widget = renderShadowingWidget('Hello, nice to meet you.', 'test-1');
  assert.match(widget, /開口跟讀教練/);
  const studioHtml = renderSpeakingDictationStudio({}, makeMockStorage());
  assert.match(studioHtml, /最小對立音聽辨/);
  assert.match(studioHtml, /三速連音與弱讀聽寫/);
});

test('3. CEFR Guided Writing Studio & Graded Reader gloss lookup verify grammar traps and rubric', () => {
  assert.equal(WRITING_PROMPTS.length, 6);
  const b1 = WRITING_PROMPTS.find(p => p.cefr === 'B1');
  const goodEval = evaluateWritingDraft(b1, b1.model);
  assert.equal(goodEval.passedCount, 5);
  assert.equal(goodEval.grammarNotes.length, 0);

  const trapEval = evaluateWritingDraft(b1, 'because i was tired so the the team stopped.');
  assert.ok(trapEval.grammarNotes.some(n => n.includes('because ... so')));
  assert.ok(trapEval.grammarNotes.some(n => n.includes('第一人稱單數「I」')));
  assert.ok(trapEval.grammarNotes.some(n => n.includes('連續重複')));

  const glossHit = lookupWordGloss('meetings', { en: new Map([['meeting', '會議']]) });
  assert.equal(glossHit.base, 'meeting');
  assert.equal(glossHit.zh, '會議');

  const wHtml = renderWritingStudio({ writingId: 'w-c1' }, makeMockStorage());
  assert.match(wHtml, /C1/);
});

test('4. All 9,500 vocabulary catalog entries include non-empty examples and PWA files exist', () => {
  const catalog = JSON.parse(fs.readFileSync('dist/vocabulary-catalog.json', 'utf8'));
  assert.equal(catalog.length, 9500);
  assert.ok(catalog.every(c => c.example && c.example.trim().length > 5 && c.exampleZh && c.exampleZh.trim().length > 2));
  assert.ok(fs.existsSync('dist/manifest.webmanifest'));
  assert.ok(fs.existsSync('dist/sw.js'));
});
