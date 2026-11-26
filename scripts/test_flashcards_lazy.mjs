// Guards the 2026-11-23 performance change: lesson pages must not download the 9,500-card bundle up front.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

globalThis.localStorage ??= { getItem() { return null; }, setItem() {}, removeItem() {} };

function staticGraph(entry) {
  const seen = new Set();
  const walk = file => {
    const clean = path.normalize(file.split('?')[0]);
    if (seen.has(clean) || !fs.existsSync(clean)) return;
    seen.add(clean);
    const src = fs.readFileSync(clean, 'utf8');
    const re = /(?:^|[;\n}])\s*(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|^\s*import\s*['"]([^'"]+)['"]/gm;
    let m;
    while ((m = re.exec(src))) {
      const spec = m[1] || m[2];
      if (spec.startsWith('.')) walk(path.join(path.dirname(clean), spec));
    }
  };
  walk(entry);
  return [...seen].map(f => path.basename(f));
}

test('app.js reaches flashcards and full word practice only through the lazy entry', () => {
  const graph = staticGraph('dist/app.js');
  assert.ok(graph.includes('flashcards_lazy.mjs'));
  assert.ok(graph.includes('flashcard_tiers.mjs'));
  for (const heavy of ['flashcards.mjs', 'full_word_practice.mjs', 'flashcard_browse.mjs', 'flashcard_recall.mjs']) {
    assert.ok(!graph.includes(heavy), `${heavy} must not be in the static graph of app.js`);
  }
});

test('tier card counts in flashcard_tiers.mjs match the real card data', async () => {
  const { FLASHCARD_TIERS } = await import('../dist/flashcard_tiers.mjs');
  const { FLASHCARD_DATABASE, FLASHCARD_TIERS: reexported } = await import('../dist/flashcards.mjs');
  assert.equal(reexported, FLASHCARD_TIERS, 'flashcards.mjs must re-export the same tier list');
  for (const tier of FLASHCARD_TIERS) {
    assert.equal(tier.cards, FLASHCARD_DATABASE.filter(c => c.tier === tier.id).length, tier.id);
  }
  assert.equal(FLASHCARD_TIERS.reduce((s, t) => s + t.cards, 0), 9500);
});

test('lazy entry shows a loading state, ignores card controls before loading, then renders the real studio', async () => {
  const lazy = await import('../dist/flashcards_lazy.mjs');
  assert.equal(lazy.flashcardsLoaded(), false);
  assert.equal(lazy.handleFlashcardEvents({ dataset: { fcFlip: 'true' } }, () => {}), false);
  assert.equal(lazy.flashcardShortcut(' ', () => {}), false);
  lazy.stopFlashcardAutoPlay();
  assert.match(lazy.renderFlashcardsStudioView(), /fc-lazy-state/);
  assert.match(lazy.renderFlashcardQuickPlay(), /data-fc-quick-play="elem_1000"[\s\S]*1,000 張/);
  const mod = await lazy.loadFlashcards();
  assert.equal(lazy.flashcardsLoaded(), true);
  assert.equal(lazy.renderFlashcardsStudioView(), mod.renderFlashcardsStudioView());
  assert.equal(lazy.startFlashcardQuickPlay('not-a-tier', () => {}), false);
  const wp = await lazy.loadWordPractice();
  assert.equal(lazy.renderFullWordPractice(), wp.renderFullWordPractice());
});

test('app.js redraws the waiting page when the bundle arrives and prefetches on intent', () => {
  const app = fs.readFileSync('dist/app.js', 'utf8');
  assert.match(app, /addEventListener\(FLASHCARDS_READY_EVENT/);
  assert.match(app, /pointerdown[\s\S]{0,120}FLASHCARD_INTENT[\s\S]{0,60}loadFlashcards\(\)/);
  const html = fs.readFileSync('dist/index.html', 'utf8');
  assert.match(html, /"\.\/flashcards\.mjs":"\.\/flashcards\.mjs\?v=practice20261126"/);
});

// 2026-11-24 (user decision): the phrase set holds only multi-word headwords, and levels without any do not offer it.
test('phrase set holds only multi-word cards and is offered only where such cards exist', async () => {
  const { FLASHCARD_TIERS, isPhraseCard, renderFlashcardQuickPlay } = await import('../dist/flashcard_tiers.mjs');
  const fc = await import('../dist/flashcards.mjs');
  for (const tier of FLASHCARD_TIERS) {
    assert.equal(tier.phrases, fc.FLASHCARD_DATABASE.filter(c => c.tier === tier.id && isPhraseCard(c)).length, tier.id + ' phrase count');
  }
  assert.equal(isPhraseCard({ word: 'come up with' }), true);
  assert.equal(isPhraseCard({ word: 'ping-pong' }), false, 'hyphenated single words are not phrases');
  assert.equal(isPhraseCard({ word: 'family', collocation: 'family member' }), false, 'a two-word collocation does not make a phrase card');
  const quick = renderFlashcardQuickPlay();
  assert.deepEqual([...quick.matchAll(/data-fc-phrase-play="([^"]+)"/g)].map(m => m[1]), FLASHCARD_TIERS.filter(t => t.phrases).map(t => t.id));
  const render = () => {};
  fc.handleFlashcardEvents({ dataset: { fcTier: 'shs_3000' } }, render);
  fc.handleFlashcardEvents({ dataset: { fcBatchSize: '0' } }, render);
  fc.handleFlashcardEvents({ dataset: { fcSetType: 'phrases' } }, render);
  let html = fc.renderFlashcardsStudioView();
  assert.match(html, /🔗 多字片語與術語 \(17\)/);
  assert.match(html, /第 1 \/ 17 張/, 'phrase set for 高中 has exactly 17 cards');
  fc.handleFlashcardEvents({ dataset: { fcTier: 'jhs_2000' } }, render);
  html = fc.renderFlashcardsStudioView();
  assert.doesNotMatch(html, /data-fc-set-type="phrases"/, '國中 has no multi-word cards, so no phrase filter');
  assert.match(html, /第 1 \/ 2,?000 張/, 'switching to a level without phrases falls back to all cards');
  fc.handleFlashcardEvents({ dataset: { fcSetType: 'phrases' } }, render);
  assert.match(fc.renderFlashcardsStudioView(), /第 1 \/ 2,?000 張/, 'phrases request is ignored where none exist');
  fc.stopFlashcardAutoPlay();
});
