import test from 'node:test';
import assert from 'node:assert/strict';
import {directionRecord,recordRecall,cleanRecord} from '../dist/mnemonics/mnemonic_recall.mjs';
test('Reverse-only practice does not claim forward practice; repeated early success cannot skip spacing',()=>{
 const now=1000000;let r=recordRecall(null,true,'reverse',now);
 assert.equal(directionRecord(r,'forward'),null);assert.equal(r.step,1);
 r=recordRecall(r,true,'reverse',now+100);assert.equal(r.step,1);
 r=recordRecall(r,true,'reverse',r.due);assert.equal(r.step,2);
 const due=r.directions.reverse.due;r=recordRecall(r,false,'forward',now);
 assert.equal(r.directions.forward.step,0);assert.equal(r.directions.reverse.due,due);
});
test('Legacy progress migrates to forward; export/import preserves both valid directions',()=>{
 const old={step:2,reviews:3,due:1000000};let r=recordRecall(old,true,'reverse',900000);
 assert.deepEqual(r.directions.forward,old);assert.equal(r.directions.reverse.step,1);
 assert.deepEqual(cleanRecord(JSON.parse(JSON.stringify(r))),r);
 r.directions.reverse.due='bad';assert.equal(cleanRecord(r).directions.reverse,undefined);
 assert.equal(cleanRecord({step:99,reviews:1,due:0}),null);
});
