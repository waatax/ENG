// scripts/test_top_diagnostic.mjs
// 驗證練習檢核入口、導覽列第 1 順位與頁面頂部引導橫幅

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Mock localStorage and window
globalThis.localStorage = {
  data: new Map(),
  getItem(k) { return this.data.get(k) || null; },
  setItem(k, v) { this.data.set(k, v); }
};
globalThis.window = {
  scrollTo() {},
  matchMedia() { return { matches: false }; }
};
globalThis.document = {
  querySelector() { return null; },
  addEventListener() {}
};

test('1. knowledgeHome prioritizes search and retains optional diagnostic entry', async () => {
  const { knowledgeHome } = await import('../dist/knowledge.mjs');
  const html = knowledgeHome();
  assert.ok(html.includes('learning-options'), 'Learning options are collapsible');
  assert.ok(html.includes('用練習找補強方向'));
  assert.ok(html.includes('href="#diagnostic"'), 'Should provide one-click diagnostic entry');
  assert.ok(html.includes('從第一句英文開始'));
  
  // Verify it appears before the knowledge search and categories
  const heroIdx = html.indexOf('learning-options');
  const searchIdx = html.indexOf('knowledge-search');
  assert.ok(heroIdx !== -1 && searchIdx !== -1 && searchIdx < heroIdx, 'Search must precede optional diagnostic content');
});

test('2. Navigation sidebar puts practice check at index 0 (topmost)', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.match(appJs, /\['diagnostic',\s*'00',\s*'🎯 英語練習檢核'\]/);
  const navIdx = appJs.indexOf("['diagnostic', '00', '🎯 英語練習檢核']");
  const knowledgeIdx = appJs.indexOf("['knowledge', '01', '知識點教室']");
  assert.ok(navIdx !== -1 && knowledgeIdx !== -1 && navIdx < knowledgeIdx, 'diagnostic must precede knowledge in nav');
});

test('3. Top banner renders across pages and routes to #diagnostic', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.ok(appJs.includes('renderEnglishLevelTestTopBanner'), 'app.js should define renderEnglishLevelTestTopBanner');
  assert.ok(appJs.includes("page === 'knowledge' || page === 'knowledgePoint' || page === 'chapter' ? '' : renderEnglishLevelTestTopBanner(page)"), 'main-wrapper should render the banner');
  assert.ok(appJs.includes("else if (parts[0] === 'diagnostic') { navigate('diagnostic'); }"), 'hash route should support diagnostic');
});

test('4. Diagnostic page intro identifies practice rather than certification', async () => {
  const { diagnosticPage } = await import('../dist/diagnostic.mjs');
  const html = diagnosticPage();
  assert.ok(html.includes('🎯 英語練習檢核'));
  assert.ok(html.includes('不能換算 CEFR'));
  assert.ok(html.includes('data-start-diag="true"'), 'Diagnostic intro should have start diagnostic button');
});

test('5. 100% Byte parity across dist/ and site/dist/', () => {
  for (const f of ['app.js', 'knowledge.mjs', 'diagnostic.mjs']) {
    const distContent = readFileSync(`dist/${f}`, 'utf8');
    const siteContent = readFileSync(`site/dist/${f}`, 'utf8');
    assert.equal(distContent, siteContent, `${f} must be byte-for-byte identical in dist/ and site/dist/`);
  }
});
