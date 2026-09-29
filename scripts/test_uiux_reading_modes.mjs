// scripts/test_uiux_reading_modes.mjs
// 驗證 UI/UX 快適閱讀色調系統、字體與行距調節、手機直式與電腦雙端最適化呈現

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Mock DOM & window
const storage = new Map();
globalThis.localStorage = {
  data: storage,
  getItem(k) { return this.data.get(k) || null; },
  setItem(k, v) { this.data.set(k, v); }
};

const domAttrs = new Map();
const domStyles = new Map();
globalThis.document = {
  documentElement: {
    setAttribute(k, v) { domAttrs.set(k, v); },
    getAttribute(k) { return domAttrs.get(k) || null; },
    style: {
      setProperty(k, v) { domStyles.set(k, v); },
      getProperty(k) { return domStyles.get(k) || null; }
    }
  },
  body: {
    setAttribute(k, v) { domAttrs.set('body:' + k, v); },
    classList: {
      add(cls) { domAttrs.set('class:' + cls, true); },
      remove(cls) { domAttrs.delete('class:' + cls); }
    }
  },
  querySelectorAll() { return []; },
  querySelector() { return null; }
};

globalThis.window = {
  scrollTo() {},
  matchMedia() { return { matches: false }; },
  addEventListener() {}
};

test('1. THEMES and LINE_HEIGHTS presets exist and meet eye-care pedagogical standards', async () => {
  const { THEMES, LINE_HEIGHTS, SCALE_PRESETS } = await import('../dist/display_settings.mjs');
  
  assert.equal(THEMES.length, 4, 'Must offer exactly 4 eye-care reading themes');
  const themeIds = THEMES.map(t => t.id);
  assert.deepEqual(themeIds, ['light', 'warm', 'dark', 'sage']);

  // Check warm theme (sepia paper reading mode)
  const warm = THEMES.find(t => t.id === 'warm');
  assert.ok(warm.name.includes('羊皮暖陽'));
  assert.ok(warm.desc.includes('護眼'));

  // Check dark theme
  const dark = THEMES.find(t => t.id === 'dark');
  assert.ok(dark.name.includes('墨夜星空'));

  // Check sage theme
  const sage = THEMES.find(t => t.id === 'sage');
  assert.ok(sage.name.includes('青木沉思'));

  assert.equal(LINE_HEIGHTS.length, 3, 'Must offer standard, relaxed, spacious line heights');
  assert.ok(SCALE_PRESETS.length >= 5, 'Must provide multiple zoom scaling presets');
});

test('2. applyTheme and applyLineHeight persist settings and set root attributes', async () => {
  const { applyTheme, applyLineHeight, applyReadingWidth } = await import('../dist/display_settings.mjs');

  applyTheme('warm', true);
  assert.equal(domAttrs.get('data-theme'), 'warm');
  assert.equal(storage.get('eq_reading_theme'), 'warm');

  applyTheme('dark', true);
  assert.equal(domAttrs.get('data-theme'), 'dark');
  assert.equal(storage.get('eq_reading_theme'), 'dark');

  applyLineHeight('relaxed', true);
  assert.equal(domStyles.get('--reading-line-height'), '1.85');
  assert.equal(storage.get('eq_reading_line_height'), 'relaxed');

  applyReadingWidth('wide');
  assert.equal(storage.get('eq_reading_width'), 'wide');
  assert.ok(domAttrs.get('class:reading-wide-mode'));

  applyReadingWidth('standard');
  assert.equal(storage.get('eq_reading_width'), 'standard');
  assert.ok(!domAttrs.get('class:reading-wide-mode'));
});

test('3. renderDisplayToolbar outputs theme pills, scale controls and reading width toggle', async () => {
  const { renderDisplayToolbar } = await import('../dist/display_settings.mjs');
  const html = renderDisplayToolbar('測試頁面');

  assert.ok(html.includes('theme-pills'), 'Must render theme-pills');
  assert.ok(html.includes('data-set-theme="warm"'), 'Must have warm theme button');
  assert.ok(html.includes('data-set-theme="dark"'), 'Must have dark theme button');
  assert.ok(html.includes('data-set-theme="sage"'), 'Must have sage theme button');
  assert.ok(html.includes('data-scale-step="-1"'), 'Must have A- button');
  assert.ok(html.includes('data-scale-step="1"'), 'Must have A+ button');
  assert.ok(html.includes('line-height-pills'), 'Must have line-height-pills');
  assert.ok(html.includes('data-toggle-width="true"'), 'Must have reading width toggle');
});

test('4. renderReadingDrawer provides mobile bottom sheet with full customization', async () => {
  const { renderReadingDrawer } = await import('../dist/display_settings.mjs');
  const html = renderReadingDrawer();

  assert.ok(html.includes('reading-drawer-overlay'), 'Must include drawer overlay');
  assert.ok(html.includes('reading-drawer-sheet'), 'Must include drawer sheet');
  assert.ok(html.includes('drawer-theme-grid'), 'Must include drawer theme cards');
  assert.ok(html.includes('drawer-scale-row'), 'Must include drawer scale stepper');
  assert.ok(html.includes('drawer-lh-row'), 'Must include drawer line height selector');
  assert.ok(html.includes('data-close-reading-drawer="true"'), 'Must have close button');
});

test('5. app.js renders mobile bottom navigation with 5 primary thumb-zone tabs', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');

  assert.ok(appJs.includes('renderMobileBottomNav'), 'app.js must define renderMobileBottomNav');
  assert.ok(appJs.includes('mobile-bottom-nav'), 'app.js must render mobile-bottom-nav');
  assert.ok(appJs.includes('data-nav="curriculum108"'), 'Must have direct course navigation');
  assert.ok(appJs.includes('data-nav="knowledge"'), 'Must have knowledge navigation');
  assert.ok(appJs.includes('data-nav="diagnostic"'), 'Must have diagnostic test navigation');
  assert.ok(appJs.includes('data-nav="wordpractice"'), 'Must have word practice navigation');
  assert.ok(appJs.includes('data-toggle-reading-drawer="true"'), 'Must have reading settings drawer trigger');
  assert.ok(appJs.includes('renderReadingDrawer'), 'app.js must render reading drawer');
});

test('6. styles.css and learning_layout.css define all 4 theme color schemes and mobile layout', () => {
  const stylesCss = readFileSync('dist/styles.css', 'utf8');
  const layoutCss = readFileSync('dist/learning_layout.css', 'utf8');

  assert.ok(stylesCss.includes('[data-theme="warm"]'), 'styles.css must define warm theme');
  assert.ok(stylesCss.includes('[data-theme="dark"]'), 'styles.css must define dark theme');
  assert.ok(stylesCss.includes('[data-theme="sage"]'), 'styles.css must define sage theme');
  assert.ok(stylesCss.includes('.mobile-bottom-nav'), 'styles.css must style mobile-bottom-nav');
  assert.ok(stylesCss.includes('.reading-drawer-sheet'), 'styles.css must style reading-drawer-sheet');
  assert.ok(stylesCss.includes('--reading-line-height'), 'styles.css must support reading line height variable');

  assert.ok(layoutCss.includes('var(--card-bg'), 'learning_layout.css must use card-bg variable');
  assert.ok(layoutCss.includes('var(--text-primary'), 'learning_layout.css must use text-primary variable');
  assert.ok(layoutCss.includes('var(--line'), 'learning_layout.css must use line variable');
});

test('7. 100% Byte-for-Byte Deployment Parity across dist/ and site/dist/', () => {
  const files = [
    'display_settings.mjs',
    'styles.css',
    'learning_layout.css',
    'app.js',
    'knowledge_foundations.mjs',
    'knowledge_content.mjs'
  ];

  for (const f of files) {
    const distBuf = readFileSync(`dist/${f}`);
    const siteBuf = readFileSync(`site/dist/${f}`);
    assert.equal(distBuf.compare(siteBuf), 0, `${f} must be 100% byte-identical`);
  }
});
