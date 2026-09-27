// scripts/test_7700_flashcards.mjs
import test from 'node:test';
import assert from 'node:assert/strict';

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

test('7,700 Flashcards Comprehensive Database Audit', async () => {
  const fc = await import('../dist/flashcards.mjs');
  
  // 1. Total Count Verification
  assert.equal(fc.FLASHCARD_DATABASE.length, 7700, 'Database must contain exactly 7,700 cards');

  // 2. Exact Tier Breakdown Verification
  const tierCounts = {};
  for (const c of fc.FLASHCARD_DATABASE) {
    tierCounts[c.tier] = (tierCounts[c.tier] || 0) + 1;
  }

  assert.equal(tierCounts['elem_1000'], 1000, 'elem_1000 must have exactly 1,000 cards');
  assert.equal(tierCounts['jhs_2000'], 2000, 'jhs_2000 must have exactly 2,000 cards');
  assert.equal(tierCounts['shs_3000'], 3000, 'shs_3000 must have exactly 3,000 cards');
  assert.equal(tierCounts['toeic'], 700, 'toeic must have exactly 700 cards');
  assert.equal(tierCounts['sat'], 450, 'sat must have exactly 450 cards');
  assert.equal(tierCounts['gre'], 350, 'gre must have exactly 350 cards');
  assert.equal(tierCounts['gmat'], 200, 'gmat must have exactly 200 cards');

  // 3. Attribute Completeness & ID Sequence
  const seenIds = new Set();
  const requiredKeys = ['id', 'tier', 'category', 'word', 'chunk', 'ipa', 'pos', 'icon', 'zh', 'collocation', 'example', 'exampleZh', 'memoryTip'];

  const expectedPrefixes = {
    elem_1000: 'fc-el-',
    jhs_2000: 'fc-jh-',
    shs_3000: 'fc-sh-',
    toeic: 'fc-to-',
    sat: 'fc-sa-',
    gre: 'fc-gr-',
    gmat: 'fc-gm-'
  };

  for (let i = 0; i < fc.FLASHCARD_DATABASE.length; i++) {
    const card = fc.FLASHCARD_DATABASE[i];
    assert.ok(card.id, `Card #${i} must have an ID`);
    assert.ok(!seenIds.has(card.id), `Card ID ${card.id} must be unique`);
    seenIds.add(card.id);

    const prefix = expectedPrefixes[card.tier];
    assert.ok(card.id.startsWith(prefix), `Card ID ${card.id} must start with expected tier prefix ${prefix}`);

    for (const k of requiredKeys) {
      assert.ok(card[k] !== undefined && card[k] !== null && String(card[k]).trim().length > 0,
        `Card ${card.id} (${card.word}) missing required attribute ${k}`);
    }
  }

  // 4. Studio UI Rendering Check
  const html = fc.renderFlashcardsStudioView();
  assert.ok(html.includes('全階記憶閃卡館'), 'Studio view must render title');
  assert.ok(html.includes('(1000)'), 'Studio view must show 1000 in tabs');
  assert.ok(html.includes('(2000)'), 'Studio view must show 2000 in tabs');
  assert.ok(html.includes('(3000)'), 'Studio view must show 3000 in tabs');
  assert.ok(html.includes('(700)'), 'Studio view must show 700 in tabs');
  assert.ok(html.includes('(450)'), 'Studio view must show 450 in tabs');
  assert.ok(html.includes('(350)'), 'Studio view must show 350 in tabs');
  assert.ok(html.includes('(200)'), 'Studio view must show 200 in tabs');
});
