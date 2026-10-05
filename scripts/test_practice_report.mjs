import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
globalThis.localStorage={getItem(){return null;},setItem(){}};
globalThis.window={scrollTo(){}};
globalThis.document={querySelector(){return null;}};
globalThis.alert=()=>{throw Error('Unexpected blocking alert');};
globalThis.confirm=()=>{throw Error('Unexpected blocking confirm');};
const {questionDB}=await import('../dist/question_db.mjs');
const {diagnosticPage,handleDiagnosticClick}=await import('../dist/diagnostic.mjs');
test('Unanswered submission can be cancelled, then confirmed without blocking dialogs',async()=>{
 const bank=JSON.parse(readFileSync('dist/questions/diagnostic_bank.json','utf8'));
 questionDB.sampleDiagnostic30=async()=>bank.slice(0,30);
 const click=dataset=>handleDiagnosticClick({dataset},()=>{},()=>{});
 click({startDiag:'true'});await new Promise(resolve=>setImmediate(resolve));
 try {
  click({diagSubmit:'true'});assert.match(diagnosticPage(),/data-diag-confirm-submit/);
  click({diagCancelSubmit:'true'});assert.ok(!diagnosticPage().includes('data-diag-confirm-submit'));
  click({diagSubmit:'true'});click({diagConfirmSubmit:'true'});
  const report=diagnosticPage();assert.match(report,/本次答對 0 \/ 30 題/);assert.match(report,/尚不足以整理跨主題表現/);assert.ok(!report.includes('認證段位'));assert.ok(!report.includes('undefined'));
 } finally { click({diagConfirmSubmit:'true'}); }
});
test('Completed diagnostic displays scoped practice feedback',async()=>{
 const bank=JSON.parse(readFileSync('dist/questions/diagnostic_bank.json','utf8'));
 const selected=Array.from({length:30},(_,i)=>bank.find(q=>q.tier===i%8+1&&Number.isInteger(q.answer)));
 assert.ok(selected.every(Boolean));
 const questions=selected.map((q,i)=>({...q,id:`fixture-${i}`}));
 questionDB.sampleDiagnostic30=async()=>questions;
 const click=dataset=>handleDiagnosticClick({dataset},()=>{},()=>{});
 click({startDiag:'true'});await new Promise(resolve=>setImmediate(resolve));
 for(let i=0;i<questions.length;i++){click({diagJump:String(i)});click({diagChoice:String(questions[i].answer)});}
 click({diagSubmit:'true'});
 const report=diagnosticPage();assert.match(report,/本站練習回饋/);assert.match(report,/不能換算 CEFR/);assert.doesNotMatch(report,/考試參考落點/);assert.ok(!report.includes('尚不足以整理跨主題表現'));
});
