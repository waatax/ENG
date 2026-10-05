import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import { curriculum } from '../dist/curriculum.mjs';
import { UNIFIED_GRADES } from '../dist/curriculum_unified.mjs';
import { points, knowledgePage } from '../dist/knowledge.mjs';
import { teachingChapter, microLesson } from '../dist/lesson_pages.mjs';
import { grammarTopics } from '../dist/grammar_content.mjs';
import * as grammar from '../dist/grammar.mjs';
import { renderAffixGuide } from '../dist/affix_guide.mjs';
import { listeningPage } from '../dist/listening.mjs';
import { aidProfile } from '../dist/teaching_aids.mjs';
import { renderTopicVisualChart } from '../dist/lesson_visuals.mjs';

test('1. All 27 Curriculum Exam Chapters have dedicated visual diagrams and comparison tables', () => {
  let count = 0;
  for (const t of curriculum) {
    for (const c of t.chapters) {
      count++;
      const html = teachingChapter(`${t.id}:${c.id}`);
      assert.ok(html.includes('lesson-visual-diagram'), `Chapter missing diagram: ${t.id}:${c.id}`);
      assert.ok(html.includes('aid-flow'), `Chapter missing aid-flow: ${t.id}:${c.id}`);
      assert.ok(html.includes('<caption>'), `Chapter missing table caption: ${t.id}:${c.id}`);
      const ap = aidProfile(c.title);
      assert.ok(ap, `Chapter title missing aidProfile: ${c.title}`);
      const vc = renderTopicVisualChart(c.title);
      assert.ok(vc && vc.length > 50, `Chapter missing visual chart: ${c.title}`);
    }
  }
  assert.equal(count, 27);
});

test('2. All 61 Unified Grade Units have dedicated visual diagrams and comparison tables', () => {
  let count = 0;
  for (const g of UNIFIED_GRADES) {
    for (const s of g.semesters) {
      for (const u of s.units) {
        count++;
        const html = microLesson(u.id);
        assert.ok(html.includes('lesson-visual-diagram'), `Unit missing diagram: ${u.id}`);
        assert.ok(html.includes('aid-flow'), `Unit missing aid-flow: ${u.id}`);
        assert.ok(html.includes('<caption>'), `Unit missing table caption: ${u.id}`);
        const ap = aidProfile(u.title);
        assert.ok(ap, `Unit title missing aidProfile: ${u.title}`);
        const vc = renderTopicVisualChart(u.title);
        assert.ok(vc && vc.length > 50, `Unit missing visual chart: ${u.title}`);
      }
    }
  }
  assert.equal(count, 61);
});

test('3. All 9 Core Knowledge Points have dedicated visual diagrams and comparison tables', () => {
  let count = 0;
  for (const p of points) {
    count++;
    const html = knowledgePage(p.id);
    assert.ok(html.includes('lesson-visual-diagram'), `Point missing diagram: ${p.id}`);
    assert.ok(html.includes('aid-flow'), `Point missing aid-flow: ${p.id}`);
    assert.ok(html.includes('<caption>'), `Point missing table caption: ${p.id}`);
    const ap = aidProfile(p.title);
    assert.ok(ap, `Point title missing aidProfile: ${p.title}`);
    const vc = renderTopicVisualChart(p.title);
    assert.ok(vc && vc.length > 50, `Point missing visual chart: ${p.title}`);
  }
  assert.equal(count, 9);
});

test('4. All 20 Grammar Topics have dedicated visual diagrams, flows and tables', () => {
  assert.equal(grammarTopics.length, 20);
  for (const t of grammarTopics) {
    grammar.setGrammarTopic(t.id);
    const html = grammar.grammarPage();
    assert.ok(html.includes('lesson-visual-diagram') || html.includes('grammar-timeline'), `Grammar missing diagram: ${t.id}`);
    assert.ok(html.includes('grammar-flow'), `Grammar missing flow: ${t.id}`);
    assert.ok(html.includes('<caption>'), `Grammar missing table: ${t.id}`);
    assert.ok(html.includes('scope="col"'), `Grammar missing table scope: ${t.id}`);
  }
});

test('5. Specialized Pages (Affix Guide & Listening) render dedicated visual diagrams and comparison tables', () => {
  const affixHtml = renderAffixGuide();
  assert.ok(affixHtml.includes('lesson-visual-diagram'));
  assert.ok(affixHtml.includes('構詞學三段式解構'));
  assert.ok(affixHtml.includes('大考高頻核心字首字尾構詞黃金矩陣表'));
  assert.ok(affixHtml.includes('否定與反向前綴'));

  const listenHtml = listeningPage();
  assert.ok(listenHtml.includes('lesson-visual-diagram'));
  assert.ok(listenHtml.includes('英語母語者真實聽力解碼'));
  assert.ok(listenHtml.includes('英語母語者六大連讀、弱化與語調起伏解碼速查表'));
  assert.ok(listenHtml.includes('閃音／彈舌 (Flap T)'));
});

test('6. knowledgeHome renders 4-Stage Learning Highway SVG Diagram and Comparison Table', async () => {
  const { knowledgeHome } = await import('../dist/knowledge.mjs');
  const html = knowledgeHome();
  assert.ok(html.includes('四階英語學習公路進階導航圖'));
  assert.ok(html.includes('四階學習核心素養、語法結構與考場避雷總覽表'));
  assert.ok(html.includes('建立完整句子概念 (Pre-A1)'));
  assert.ok(html.includes('學術批判與邏輯推理 (B2~C2)'));
});

test('7. Curriculum Matrix renders 108 Curriculum 3 Dimensions 9 Items & CEFR Standards Table', async () => {
  const { renderCoreCompetenciesTable, renderCurriculumMatrixView } = await import('../dist/curriculum_matrix.mjs');
  const tableHtml = renderCoreCompetenciesTable();
  assert.ok(tableHtml.includes('教育部 108 課綱英語文三面九項核心素養與 CEFR 評量階梯總體對照表'));
  assert.ok(tableHtml.includes('A1 身心素質與自我精進'));
  assert.ok(tableHtml.includes('C3 多元文化與國際理解'));

  const matrixHtml = renderCurriculumMatrixView();
  assert.ok(matrixHtml.includes('教育部 108 課綱英語文三面九項核心素養與 CEFR 評量階梯總體對照表'));
});

test('8. app.js contains dedicated visual diagrams and comparison tables for Curriculum, Sixth, JH, Arch, and Exams', () => {
  const appJs = readFileSync('dist/app.js', 'utf8');
  assert.ok(appJs.includes('render108ProgressionDiagram'), 'Missing render108ProgressionDiagram in app.js');
  assert.ok(appJs.includes('render108GradesTable'), 'Missing render108GradesTable in app.js');
  assert.ok(appJs.includes('renderSixthBridgeTable'), 'Missing renderSixthBridgeTable in app.js');
  assert.ok(appJs.includes('renderJhCapMasteryTable'), 'Missing renderJhCapMasteryTable in app.js');
  assert.ok(appJs.includes('renderArchPrerequisiteTable'), 'Missing renderArchPrerequisiteTable in app.js');
  assert.ok(appJs.includes('renderExamSolvingFlowchartDiagram'), 'Missing renderExamSolvingFlowchartDiagram in app.js');
  assert.ok(appJs.includes('renderExamTracksComparisonTable'), 'Missing renderExamTracksComparisonTable in app.js');

  // Verify invocations
  assert.ok(appJs.includes('${render108ProgressionDiagram()}'));
  assert.ok(appJs.includes('${render108GradesTable()}'));
  assert.ok(appJs.includes('${renderSixthBridgeTable()}'));
  assert.ok(appJs.includes('${renderJhCapMasteryTable()}'));
  assert.ok(appJs.includes('${renderArchPrerequisiteTable()}'));
  assert.ok(appJs.includes('${renderExamSolvingFlowchartDiagram()}'));
  assert.ok(appJs.includes('${renderExamTracksComparisonTable()}'));
});

test('9. 100% Byte-for-Byte Deployment Parity across dist/ and site/dist/', () => {
  const distFiles = readdirSync('dist').filter(f => statSync(path.join('dist', f)).isFile());
  for (const f of distFiles) {
    const p1 = path.join('dist', f);
    const p2 = path.join('site', 'dist', f);
    assert.ok(statSync(p2).isFile(), `Missing file in site/dist: ${f}`);
    const b1 = readFileSync(p1);
    const b2 = readFileSync(p2);
    assert.equal(b1.compare(b2), 0, `Byte parity mismatch for ${f}`);
  }
});

