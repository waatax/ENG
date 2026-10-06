// scripts/test_mastery_pipeline.mjs
// 驗證「零基礎初學者融會貫通與大考解題」全面優化管線

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Mock localStorage and window
const storage = new Map();
globalThis.localStorage = {
  data: storage,
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

test('1. Landing offers a beginner route, resume, review and capability filters', async () => {
 const {knowledgeHome}=await import('../dist/knowledge.mjs');const html=knowledgeHome();
 for(const value of ['#knowledge/be-sentences','knowledge-domain','knowledge-stage','今天的學習任務','你的學習足跡'])assert.ok(html.includes(value),value);
});
test('2. Every focused lesson offers its own judgment steps and common mistake',async()=>{
 const {knowledgePage,points}=await import('../dist/knowledge.mjs');
 for(const p of points){const html=knowledgePage(p.id);assert.ok(html.includes('如何判斷與自查'));for(const step of p.steps)assert.ok(html.includes(step));assert.ok(html.includes(p.trap));}
});

test('3. grammarPage renders 3-second exam clue and solving scaffolding hint', async () => {
  const grammar = await import('../dist/grammar.mjs');
  const { grammarTopics } = await import('../dist/grammar_content.mjs');
  for (const t of grammarTopics) {
    grammar.setGrammarTopic(t.id);
    const html = grammar.grammarPage();
    assert.ok(html.includes('考場 3 秒題眼'), `${t.id} must feature 3-second exam clue`);
    assert.ok(html.includes('點擊展開解題思路提示'), `${t.id} must feature scaffolding hint`);
  }
  grammar.setGrammarTopic();
});

test('4. Navigation sidebar organizes 22 items into intuitive categorized groups', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.ok(appJs.includes('nav-group-header'), 'app.js should render nav-group-header elements');
  assert.ok(appJs.includes('🌟 程度檢定與引導'), 'Must include 🌟 程度檢定與引導');
  assert.ok(appJs.includes('🧩 觀念圖解與知識點'), 'Must include 🧩 觀念圖解與知識點');
  assert.ok(appJs.includes('🎒 課綱學年與發音微課'), 'Must include 🎒 課綱學年與發音微課');
  assert.ok(appJs.includes('🏫 升學會考與先修講義'), 'Must include 🏫 升學會考與先修講義');
  assert.ok(appJs.includes('🗂️ 核心單字與構詞閃卡'), 'Must include 🗂️ 核心單字與構詞閃卡');
  assert.ok(appJs.includes('🎯 題庫實戰與學習紀錄'), 'Must include 🎯 題庫實戰與學習紀錄');
});

test('5. Diagnostic report questions integrate clue radar and 3-step solving breakdown', async () => {
  const diagJs = readFileSync('dist/diagnostic.mjs', 'utf8');
  assert.ok(diagJs.includes('clue-tag'), 'diagnostic.mjs must render clue-tag for exam questions');
  assert.ok(diagJs.includes('⚡ 考點題眼：'), 'diagnostic.mjs must label ⚡ 考點題眼：');
  assert.ok(diagJs.includes('🎯 解題思維三部曲：'), 'diagnostic.mjs must provide 🎯 解題思維三部曲：');
});

test('6. Diagnostic report renders mistake re-test button when errors exist', () => {
  const diagJs = readFileSync('dist/diagnostic.mjs', 'utf8');
  assert.ok(diagJs.includes('data-retry-wrong-diag="true"'), 'diagnostic.mjs must render retry-wrong button');
  assert.ok(diagJs.includes('d.retryWrongDiag'), 'diagnostic.mjs must handle retry-wrong action');
});

test('7. Global keyboard shortcuts enhance flashcard and quiz response workflow', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.ok(appJs.includes("window.addEventListener('keydown'"), 'app.js must register keydown listener');
  assert.ok(appJs.includes('data-fc-flip="true"'), 'Keyboard navigation must support flashcard flipping');
  assert.ok(appJs.includes('data-diag-choice'), 'Keyboard navigation must support diagnostic choices');
});

test('8. 100% Byte-for-Byte Deployment Parity Across dist/ and site/dist/', () => {
  const files = ['learning_layout.css', 'app.js', 'knowledge.mjs', 'grammar.mjs', 'diagnostic.mjs'];
  for (const f of files) {
    const distContent = readFileSync(`dist/${f}`);
    const siteContent = readFileSync(`site/dist/${f}`);
    assert.equal(distContent.compare(siteContent), 0, `${f} must be 100% byte-identical`);
  }
});
