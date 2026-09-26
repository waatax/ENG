import test from 'node:test';
import assert from 'node:assert/strict';
import {createKnowledgeProgress, STORAGE_KEY} from '../dist/knowledge_progress.mjs';
import {foundations} from '../dist/knowledge_foundations.mjs';
const memory = () => ({data:new Map(),getItem(k){return this.data.get(k)||null;},setItem(k,v){this.data.set(k,v);}});
test('First attempt, corrections, drafts and resume survive reload',()=>{
 const storage=memory(), p=createKnowledgeProgress(foundations,storage), id=foundations[0].id;
 assert.ok(p.choose(id,0,0)); assert.equal(p.choose(id,0,1),false);
 assert.equal(p.summary(id).needsReview,1); assert.ok(p.retry(id,0)); assert.ok(p.choose(id,0,1));
 p.write(id,'My friends are kind.');p.visit(id);
 const reloaded=createKnowledgeProgress(foundations,storage);
 assert.deepEqual(reloaded.answer(id,0),{first:0,latest:1,attempts:2});
 assert.equal(reloaded.summary(id).firstCorrect,0);assert.equal(reloaded.summary(id).needsReview,0);
 assert.equal(reloaded.lastVisited,id);assert.equal(reloaded.draft(id),'My friends are kind.');
});
test('Corrupt or invalid stored data cannot fabricate answers or crash a page',()=>{
 const storage=memory();storage.setItem(STORAGE_KEY,'broken json');
 assert.ok(createKnowledgeProgress(foundations,storage).warning);
 storage.setItem(STORAGE_KEY,JSON.stringify({version:1,answers:{'be-sentences:0':{first:999,latest:0,attempts:1}},drafts:{'be-sentences':42},lastVisited:'missing'}));
 const p=createKnowledgeProgress(foundations,storage);assert.equal(p.answer('be-sentences',0),null);assert.equal(p.draft('be-sentences'),'');assert.equal(p.lastVisited,'');
 assert.equal(p.choose('be-sentences',0,NaN),false);assert.equal(p.choose('be-sentences',0,9),false);assert.equal(p.choose('unknown',0,1),false);
});
test('Quota/storage failure preserves in-memory work and warns honestly',()=>{
 const p=createKnowledgeProgress(foundations,{getItem(){return null;},setItem(){throw Error('quota');}});
 p.write('be-sentences','I am ready.');assert.equal(p.draft('be-sentences'),'I am ready.');assert.match(p.warning,/儲存失敗/);
 assert.ok(p.choose('be-sentences',0,1));assert.equal(p.answer('be-sentences',0).latest,1);
});
test('Pending retry remains available on reload; returned records cannot mutate first answer',()=>{
 const s=memory(),p=createKnowledgeProgress(foundations,s);p.choose('be-sentences',0,0);p.answer('be-sentences',0).first=1;p.retry('be-sentences',0);
 const r=createKnowledgeProgress(foundations,s);assert.equal(r.answer('be-sentences',0).latest,null);assert.ok(r.choose('be-sentences',0,1));assert.equal(r.answer('be-sentences',0).first,0);
});
