// scripts/test_top_diagnostic.mjs
// 驗證首頁置頂「🎯 英文程度測試」、導覽列第 1 順位與全站頂部引導橫幅

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

test('1. knowledgeHome renders English Level Test Hero card at the very top', async () => {
  const { knowledgeHome } = await import('../dist/knowledge.mjs');
  const html = knowledgeHome();
  assert.ok(html.includes('level-test-hero-card'), 'Should include level-test-hero-card class');
  assert.ok(html.includes('🎯 英文程度測試'), 'Should include 🎯 英文程度測試 title');
  assert.ok(html.includes('data-nav="diagnostic"'), 'Should provide one-click diagnostic entry button');
  assert.ok(html.includes('Pre-A1'), 'Should show ladder starting at Pre-A1');
  assert.ok(html.includes('GRE / GMAT'), 'Should show ladder culminating at GRE / GMAT');
  
  // Verify it appears before the knowledge search and categories
  const heroIdx = html.indexOf('level-test-hero-card');
  const searchIdx = html.indexOf('knowledge-search');
  assert.ok(heroIdx !== -1 && searchIdx !== -1 && heroIdx < searchIdx, 'Hero must be positioned before knowledge search');
});

test('2. Navigation sidebar puts English Level Test at index 0 (topmost)', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.match(appJs, /\['diagnostic',\s*'00',\s*'🎯 英文程度測試'\]/, 'nav should have diagnostic as item 00 with 🎯 英文程度測試');
  const navIdx = appJs.indexOf("['diagnostic', '00', '🎯 英文程度測試']");
  const knowledgeIdx = appJs.indexOf("['knowledge', '01', '知識點教室']");
  assert.ok(navIdx !== -1 && knowledgeIdx !== -1 && navIdx < knowledgeIdx, 'diagnostic must precede knowledge in nav');
});

test('3. Top banner renders across pages and routes to #diagnostic', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.ok(appJs.includes('renderEnglishLevelTestTopBanner'), 'app.js should define renderEnglishLevelTestTopBanner');
  assert.ok(appJs.includes('${renderEnglishLevelTestTopBanner(page)}'), 'main-wrapper should render the banner');
  assert.ok(appJs.includes("else if (parts[0] === 'diagnostic') { navigate('diagnostic'); }"), 'hash route should support diagnostic');
});

test('4. Diagnostic page intro view displays prominent 🎯 英文程度測試 header', async () => {
  const { diagnosticPage } = await import('../dist/diagnostic.mjs');
  const html = diagnosticPage();
  assert.ok(html.includes('🎯 英文程度測試'), 'Diagnostic intro should display 🎯 英文程度測試');
  assert.ok(html.includes('data-start-diag="true"'), 'Diagnostic intro should have start diagnostic button');
});

test('5. 100% Byte parity across dist/ and site/dist/', () => {
  for (const f of ['app.js', 'knowledge.mjs', 'diagnostic.mjs']) {
    const distContent = readFileSync(`dist/${f}`, 'utf8');
    const siteContent = readFileSync(`site/dist/${f}`, 'utf8');
    assert.equal(distContent, siteContent, `${f} must be byte-for-byte identical in dist/ and site/dist/`);
  }
});
