import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCourse} from '../dist/quest/engine.mjs';
import {unitLab} from '../dist/quest/lab.mjs';
import {renderUnitMissions} from '../dist/quest/missions.mjs';
import {readRecall, recordRecall, recallQueue, scheduleRecall, spellingFeedback, RECALL_KEY} from '../dist/recall.mjs';
import {exportFullSiteBackup,restoreFullSiteBackup} from '../dist/mastery_passport.mjs';
const memory=()=>{const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};};
test('every unit gains another 10% missions from different source items, each with an answer and explanation',()=>{
  const index=JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
  const course=createCourse(index);
  for(const t of [...index.sections,...index.branches])course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
  const units=[];
  for(const u of course.units.values()){
    const lab=unitLab(course,u.id), old=new Set(lab.cards.map(c=>c.source));
    assert.equal(lab.missions.length,Math.ceil(lab.baseline*.1),u.id);
    assert.equal(new Set(lab.missions.map(m=>m.source)).size,lab.missions.length,u.id);
    const pool=new Set(u.nodes.flatMap(n=>course.nodes.get(n.id)?.pool||[]));
    for(const m of lab.missions){assert.ok(pool.has(m.source));assert.ok(!old.has(m.source));assert.ok(m.answer&&m.why&&m.task&&m.check,m.id);assert.ok(!/undefined|\[object Object\]/.test(m.answer+m.why));}
    units.push({id:u.id,title:u.title,baseline:lab.baseline,previousActivities:lab.cards.length,newMissions:lab.missions.length,sources:lab.missions.map(m=>m.source)});
  }
  assert.equal(units.length,141);
  const total=units.reduce((n,u)=>n+u.newMissions,0);assert.equal(total,1483);
  fs.mkdirSync('docs/redesign/verification/joy20261103',{recursive:true});
  fs.writeFileSync('docs/redesign/verification/joy20261103/content.json',JSON.stringify({units:units.length,newMissions:total,definition:'Additional grounded self-explanation and transfer activities; not new scored questions or original vocabulary.',report:units},null,2));
});
test('spaced reviews reset after difficulty and progress through bounded intervals',()=>{
  let previous;let now=123456789;
  for(const days of [1,3,7,14,30,30]){previous=scheduleRecall(previous,'good',now);assert.equal(previous.days,days);assert.equal(previous.due,now+days*86400000);now=previous.due;}
  assert.equal(scheduleRecall(previous,'again',now).days,1);
  assert.equal(scheduleRecall(null,'easy',now).days,3);
  assert.equal(scheduleRecall(null,'invalid',now),null);
  assert.equal(scheduleRecall({step:-100},'good',now).days,3);
  const first=scheduleRecall(null,'good',now);
  assert.equal(scheduleRecall(first,'easy',now+1000).days,1,'same-day repetitions cannot inflate the interval');
});
test('only due and unseen cards enter the queue; oldest due precedes unseen and directions stay independent',()=>{
  const cards=[{id:'new'},{id:'later'},{id:'due'},{id:'earlier'}],now=1000;
  const state={'word:produce:later':{due:2000},'word:produce:due':{due:900},'word:produce:earlier':{due:800}};
  assert.deepEqual(recallQueue(cards,state,'produce',10,now).map(c=>c.id),['earlier','due','new']);
  assert.equal(recallQueue(cards,state,'understand',10,now).length,4);
  const store=memory();recordRecall(store,'word:produce:new','good',now);
  assert.equal(readRecall(store)['word:understand:new'],undefined);
  assert.equal(store.getItem('eq_flashcards_mastery_v1'),null);
});
test('invalid storage recovers, blocked storage reports failure, and spelling feedback identifies real differences',()=>{
  for(const value of ['null','[]','not json','123'])assert.deepEqual(readRecall({getItem:()=>value}),{});
  assert.equal(recordRecall({getItem:()=>null,setItem(){throw Error('blocked');}},'test','good'),null);
  assert.equal(recordRecall(null,'test','good'),null);
  assert.ok(spellingFeedback('  FAMILY ','family').ok);
  assert.ok(spellingFeedback('It’s time',"it's time").ok);
  assert.match(spellingFeedback('famly','family').text,/第 4 個字元/);
  assert.match(spellingFeedback('famil','family').text,/還少了/);
  assert.match(spellingFeedback('familys','family').text,/多了/);
  assert.ok(!spellingFeedback('','family').ok);
});
test('mission rendering escapes source content and records a self-assessment rather than an exam score',()=>{
  const html=renderUnitMissions([{id:'x',title:'<script>',prompt:'<img>',answer:'A&B',why:'because',task:'try',check:'check'}],10,memory());
  assert.ok(!html.includes('<script>')&&!html.includes('<img>'));
  assert.match(html,/A&amp;B/);assert.match(html,/自評/);assert.match(html,/非新增計分題/);
});
test('full-site backup restores both word directions and unit mission schedules',()=>{
  const store=memory(),restored=memory();
  recordRecall(store,'word:produce:family','good');recordRecall(store,'word:understand:family','again');recordRecall(store,'mission:s1:example','easy');
  const result=restoreFullSiteBackup(exportFullSiteBackup(store),restored);
  assert.ok(result.ok);assert.deepEqual(readRecall(restored),readRecall(store));
});
test('recall session cannot be graded before reveal or mark a miss as remembered',async()=>{
  const store=memory();globalThis.localStorage=store;
  globalThis.document={querySelector:s=>s==='#fc-recall-answer'?{value:'famly'}:null};
  try{
    const {renderRecallStudio,handleRecallAction}=await import('../dist/flashcard_recall.mjs');
    const cards=[{id:'test',tier:'elem_1000',word:'family',zh:'家庭',pos:'n.',example:'My family is here.',exampleZh:'我的家人在這裡。'}];
    handleRecallAction('produce',cards,()=>{});handleRecallAction('start',cards,()=>{});
    handleRecallAction('good',cards,()=>{});assert.equal(store.getItem(RECALL_KEY),null);
    let html=renderRecallStudio(cards);assert.ok(!html.includes('My family is here.'));
    handleRecallAction('check',cards,()=>{});html=renderRecallStudio(cards);assert.match(html,/第 4 個字元/);assert.match(html,/data-fc-recall="good" disabled/);
    handleRecallAction('easy',cards,()=>{});assert.equal(store.getItem(RECALL_KEY),null);
    handleRecallAction('again',cards,()=>{});assert.equal(readRecall(store)['word:produce:test'].days,1);
    assert.match(renderRecallStudio(cards),/完成 1 張/);
  }finally{delete globalThis.localStorage;delete globalThis.document;}
});
