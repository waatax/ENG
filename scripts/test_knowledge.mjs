import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
globalThis.localStorage={getItem(){return null;},setItem(){}};
const {points,knowledgePage,knowledgeResults,answerKnowledge}=await import('../dist/knowledge.mjs');
test('Nine lessons render complete content and eighteen valid questions',()=>{
 assert.equal(points.length,9);assert.equal(new Set(points.map(p=>p.id )).size,9);
 for(const p of points){const html=knowledgePage(p.id);assert.ok(html.includes(p.title));assert.ok(html.includes(p.rule));assert.ok(html.includes(p.model));assert.equal(p.questions.length,2);for(const q of p.questions){assert.ok(Number.isInteger(q[2])&&q[2]>=0&&q[2]<q[1].length);assert.ok(q[3].trim().length>0);}}
 assert.match(knowledgePage('missing'),/找不到/);
});
test('Search filters concepts, handles no results, and does not reflect markup',()=>{
 assert.match(knowledgeResults(''),/36 個教學頁面/);assert.match(knowledgeResults('被動'),/passive-instructions/);assert.match(knowledgeResults('not-a-real-concept'),/沒有相符/);assert.ok(!knowledgeResults('<img src=x>').includes('<img'));
});
test('Stage filtering gives elementary learners a real starting point',()=>{
 const html=knowledgeResults('', '國小');assert.match(html,/2 個教學頁面/);assert.ok(html.includes('be-sentences'));assert.ok(!html.includes('argument-assumptions'));
});
test('Practice reports omit unsupported credentials and official score conversions',()=>{
 const d=readFileSync('dist/diagnostic.mjs','utf8');
 for(const claim of ['信度 α','IRT 項目反應理論轉換','${ev.predicted.','${esc(ev.cefr)}','聯合研發背書'])assert.ok(!d.includes(claim),claim);
 assert.ok(d.includes('不能換算會考'));
});
test('Published and preview assets match',()=>{for(const f of ['knowledge.mjs','learning_layout.css','app.js','index.html','lesson_pages.mjs'])assert.equal(readFileSync('dist/'+f,'utf8'),readFileSync('site/dist/'+f,'utf8'),f);});

