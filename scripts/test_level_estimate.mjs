import test from 'node:test';
import assert from 'node:assert/strict';
import {estimateLevel,renderLevelEstimate} from '../dist/level_estimate.mjs';
const qs=Array.from({length:30},(_,i)=>({id:`q${i}`,tier:i%8+1,options:['a','b','c','d'],answer:1}));
const answers=choice=>Object.fromEntries(qs.map(q=>[q.id,choice]));
test('Empty and incomplete responses do not receive fake low-level estimates',()=>{
 assert.equal(estimateLevel({},qs).sufficient,false);assert.equal(estimateLevel({},[]).score,0);
 const a=answers(1);for(let i=0;i<7;i++)delete a[`q${i}`];assert.equal(estimateLevel(a,qs).band,null);
 assert.match(renderLevelEstimate({},qs),/尚不足/);
});
test('Full responses produce monotonic local practice feedback without exam score conversion',()=>{
 assert.equal(estimateLevel(answers(1),qs).score,100);assert.equal(estimateLevel(answers(0),qs).score,0);
 const html=renderLevelEstimate(answers(1),qs);
 for(const text of ['本次答對 30 / 30 題','本站練習回饋','不能換算 CEFR'])assert.ok(html.includes(text));
 assert.doesNotMatch(html,/考試參考落點|預估區間/);
 let last=0;for(let n=0;n<=30;n++){const a=answers(0);for(let i=0;i<n;i++)a[`q${i}`]=1;const r=estimateLevel(a,qs);assert.ok(r.score>=last);last=r.score;}
});
test('Coverage and multi-answer validation prevent misleading estimates',()=>{
 assert.equal(estimateLevel(answers(1),qs.map(q=>({...q,tier:1}))).sufficient,false);
 const multi=qs.map(q=>({...q,answer:[0,1]}));const a=Object.fromEntries(qs.map(q=>[q.id,[0,0]]));
 assert.equal(estimateLevel(a,multi).answered,0);for(const q of qs)a[q.id]=[1,0];assert.equal(estimateLevel(a,multi).score,100);
});
