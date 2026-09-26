import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
globalThis.localStorage={getItem(){return null;}};
const {points,knowledgePage,knowledgeResults,answerKnowledge}=await import('../dist/knowledge.mjs');
test('Six original lessons render complete content and twelve valid questions',()=>{
 assert.equal(points.length,6);assert.equal(new Set(points.map(p=>p.id)).size,6);
 for(const p of points){const html=knowledgePage(p.id);assert.ok(html.includes(p.title));assert.ok(html.includes(p.rule));assert.ok(html.includes(p.model));assert.equal(p.questions.length,2);for(const q of p.questions){assert.ok(Number.isInteger(q[2])&&q[2]>=0&&q[2]<q[1].length);assert.ok(q[3].trim().length>0);}}
 assert.match(knowledgePage('missing'),/找不到/);
});
test('Search filters concepts, handles no results, and does not reflect markup',()=>{
 assert.match(knowledgeResults(''),/33 個教學頁面/);assert.match(knowledgeResults('被動'),/passive-instructions/);assert.match(knowledgeResults('not-a-real-concept'),/找不到相符/);assert.ok(!knowledgeResults('<img src=x>').includes('<img'));
});
test('Answer feedback explains errors and disables the answered group',()=>{
 const feedback={};const choices=[{},{},{}];const field={querySelector(){return feedback;},querySelectorAll(){return choices;}};
 assert.equal(answerKnowledge({dataset:{kpAnswer:'passive-instructions:0:0'},closest(){return field;}}),true);
 assert.match(feedback.textContent,/需要訂正.*be replaced/);assert.ok(choices.every(c=>c.disabled));
});
test('Published and preview assets match',()=>{for(const f of ['knowledge.mjs','learning_layout.css','app.js','index.html','lesson_pages.mjs'])assert.equal(readFileSync('dist/'+f,'utf8'),readFileSync('site/dist/'+f,'utf8'),f);});
