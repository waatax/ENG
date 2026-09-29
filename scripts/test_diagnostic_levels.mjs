import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const storage = new Map();
globalThis.localStorage = { getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,v) };
globalThis.window = { scrollTo() {} };
globalThis.document = { querySelector() { return null; } };
globalThis.alert = () => { throw Error('Unexpected alert'); };
const { questionDB } = await import('../dist/question_db.mjs');
const { diagnosticPage, handleDiagnosticClick, DIAGNOSTIC_LEVELS } = await import('../dist/diagnostic.mjs');
const bank = JSON.parse(readFileSync('dist/questions/diagnostic_bank.json','utf8'));
questionDB.loadDiagnosticBank = async () => bank;
const click = dataset => handleDiagnosticClick({dataset}, () => {}, () => {});

test('Every level produces exactly 20 unique in-level questions and rotates recent questions', async () => {
  for (const {id} of DIAGNOSTIC_LEVELS) {
    const first = await questionDB.sampleDiagnostic(20,id);
    const second = await questionDB.sampleDiagnostic(20,id);
    assert.equal(first.length,20);
    assert.ok(first.every(q => q.tier === id));
    assert.equal(new Set(first.map(q=>q.id)).size,20);
    assert.equal(new Set(first.map(q=>q.prompt.trim().toLowerCase())).size,20);
    assert.ok(second.every(q=> !first.some(prev=>prev.id===q.id)));
  }
  await assert.rejects(questionDB.sampleDiagnostic(20,9));
  for (const count of [10,20,30,40]) assert.equal((await questionDB.sampleDiagnostic(count)).length,count);
  assert.equal((await questionDB.sampleDiagnostic10()).length, 10);
  const t1_10 = await questionDB.sampleDiagnostic(10, 1);
  assert.equal(t1_10.length, 10);
  assert.ok(t1_10.every(q => q.tier === 1));
  questionDB.loadDiagnosticBank = async () => bank.slice(0,5);
  await assert.rejects(questionDB.sampleDiagnostic(20,1));
  questionDB.loadDiagnosticBank = async () => bank;
});

test('Targeted test covers selection, answers, 100-point scoring, explanations, retry and mixed mode', async () => {
  const sample = questionDB.sampleDiagnostic.bind(questionDB);
  let questions;
  questionDB.sampleDiagnostic = async (...args) => questions = await sample(...args);
  for (const level of DIAGNOSTIC_LEVELS) {
    click({diagTier:String(level.id)});
    assert.ok(diagnosticPage().includes('開始「'+level.name+'」20 題測驗'));
    click({startDiag:'40'});
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(questions.length,20);
    for (let i=0;i<20;i++) {
      click({diagJump:String(i)});
      click({diagChoice:String(questions[i].answer)});
    }
    click({diagSubmit:'true'});
    const report=diagnosticPage();
    assert.match(report,/本次答對 20 \/ 20 題/);
    assert.match(report,/100 分／100 分/);
    assert.match(report,/不推估整體 CEFR/);
    assert.ok(!report.includes('英文程度預測'));
    assert.ok(!report.includes('undefined'));
    click({diagFilter:'wrong'});
    click({restartDiag:'true'});
  }
  click({diagTier:'all'});
  assert.match(diagnosticPage(),/data-diag-select-count="10"/);
  assert.match(diagnosticPage(),/data-diag-select-count="30"/);
  click({diagSelectCount:'10'});
  click({startDiag:'10'});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(questions.length, 10);
});
