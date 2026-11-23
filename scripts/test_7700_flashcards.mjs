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

test('9,500 Flashcards Comprehensive Database Audit', async () => {
  const fc = await import('../dist/flashcards.mjs');
  
  // 1. Total Count Verification
  assert.equal(fc.FLASHCARD_DATABASE.length, 9500, 'Database must contain exactly 9,500 cards');

  // 2. Exact Tier Breakdown Verification
  const tierCounts = {};
  for (const c of fc.FLASHCARD_DATABASE) {
    tierCounts[c.tier] = (tierCounts[c.tier] || 0) + 1;
  }

  assert.equal(tierCounts['elem_1000'], 1000, 'elem_1000 must have exactly 1,000 cards');
  assert.equal(tierCounts['jhs_2000'], 2000, 'jhs_2000 must have exactly 2,000 cards');
  assert.equal(tierCounts['shs_3000'], 3000, 'shs_3000 must have exactly 3,000 cards');
  assert.equal(tierCounts['toeic'], 700, 'toeic must have exactly 700 cards');
  assert.equal(tierCounts['toefl'], 700, 'toefl must have exactly 700 cards');
  assert.equal(tierCounts['sat'], 700, 'sat must have exactly 700 cards');
  assert.equal(tierCounts['gre'], 700, 'gre must have exactly 700 cards');
  assert.equal(tierCounts['gmat'], 700, 'gmat must have exactly 700 cards');

  // 3. Attribute Completeness & ID Sequence
  const seenIds = new Set();
  const requiredKeys = ['id', 'tier', 'category', 'word', 'chunk', 'ipa', 'pos', 'icon', 'zh', 'collocation', 'example', 'exampleZh', 'memoryTip'];

  const expectedPrefixes = {
    elem_1000: 'fc-el-',
    jhs_2000: 'fc-jh-',
    shs_3000: 'fc-sh-',
    toeic: 'fc-to-',
    toefl: 'fc-tf-',
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
      // A memory tip may be empty: a forced or unsafe hook is removed rather than replaced with filler.
      if (k === 'memoryTip') { assert.equal(typeof card[k], 'string', card.id); continue; }
      assert.ok(card[k] !== undefined && card[k] !== null && String(card[k]).trim().length > 0,
        `Card ${card.id} (${card.word}) missing required attribute ${k}`);
    }
  }

  // 4. Studio UI Rendering Check
  const html = fc.renderFlashcardsStudioView();
  assert.match(html, /<h2 class="fc-title"[^>]*>🗂️ 9,500 單字與片語閃卡館<\/h2>/, 'Studio view must render title with the 9,500 total');
  assert.ok(html.includes(`內容狀態：${fc.FLASHCARD_DATABASE.length} 張字卡`), 'Studio view must show the computed 9,500 total cards note');
  // Every tier tab must state the size that the database really holds (1,000 / 2,000 / 3,000 / 700).
  for (const [tier, count] of Object.entries(tierCounts)) {
    const tab = html.match(new RegExp(`<button[^>]*class="[^"]*fc-tier-btn[^"]*"[^>]*data-fc-tier="${tier}"[^>]*>([\\s\\S]*?)</button>`));
    assert.ok(tab, `Studio view must render a tier tab for ${tier}`);
    assert.ok(tab[1].replace(/<[^>]+>/g, '').includes(count.toLocaleString('en-US')), `Tier tab ${tier} must show ${count}`);
  }
  assert.ok(html.includes('data-fc-tier="elem_1000" aria-pressed="true"'), 'Current tier tab must be shown as selected');
});
