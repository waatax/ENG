import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCourse,createGame,isScored,KEY} from '../dist/quest/engine.mjs';
import {questionKey,learningKeys,selectDistinct,uniqueQuestions} from '../dist/quest/question_quality.mjs';
const ix=JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
export function fullCourse(){const c=createCourse(ix);for(const t of [...ix.sections,...ix.branches])c.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));c.register(JSON.parse(fs.readFileSync('dist/quest/course/vocab.json')));return c;}
const memory=()=>{const m=new Map();return{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
function distinct(ids,c){const seen=new Set();for(const id of ids){const q=c.item(id);if(!isScored(q))continue;for(const key of new Set([questionKey(q),...learningKeys(q)])){assert.ok(!seen.has(key),`duplicate ${id}: ${key}`);seen.add(key);}}}
function play(g){let guard=100;while(g.state.session&&guard--){const q=g.currentItem();if(isScored(q)&&!g.state.session.feedback){g.heard();g.submit(q.type==='match'?'matched':q.answer);}g.next();}assert.ok(guard>0);}
test('identity ignores IDs, option order and superficial punctuation; word variants share a target',()=>{
 const a={id:'a',kind:'word',type:'choice',prompt:'Choose.',text:'Evidence',answer:'證據',options:['證據','主張']},b={...a,id:'b',options:[...a.options].reverse(),text:'evidence!'};
 assert.equal(questionKey(a),questionKey(b));assert.deepEqual(learningKeys(a),learningKeys({...a,type:'listen',text:undefined,audio:'evidence',answer:'evidence'}));
 const map=new Map([['a',a],['b',b]]);assert.equal(selectDistinct(['a','b'],id=>map.get(id),10).length,1);
});
test('all 626 nodes have enough genuinely distinct content for a complete fresh lesson',()=>{
 const c=fullCourse();assert.equal(c.nodes.size,626);for(const n of c.nodes.values()){
 const pool=n.pool.filter(id=>isScored(c.item(id))),minimum=n.kind==='boss'?12:10;
 assert.ok(uniqueQuestions(pool,c.item,{targets:true}).length>=minimum,n.id);
 for(let seed=0;seed<3;seed++){const picked=selectDistinct(pool,c.item,minimum,{seed:n.id+seed});assert.equal(picked.length,minimum,n.id);distinct(picked,c);}
 }
});
test('section nine first lesson rotates 32 words before starting an explicitly labelled new round',()=>{
 const c=fullCourse(),storage=memory();let g=createGame({course:c,storage});g.setup({start:'s9',goal:'regular'});g.acceptPlacement('s9');const seen=new Set(),id='g12-s1-u1:word';
 for(let round=0;round<4;round++){assert.equal(g.start('lesson',id),true);const s=g.state.session;assert.equal(s.rotation.round,1);distinct(s.queue,c);assert.equal(s.queue.filter(x=>isScored(c.item(x))).length,round===3?2:10);
 for(const qid of s.queue.filter(x=>isScored(c.item(x))))for(const k of learningKeys(c.item(qid))){assert.ok(!seen.has(k));seen.add(k);}
 g=createGame({course:c,storage});assert.equal(g.validSession(),true);play(g);}
 assert.equal(seen.size,32);assert.equal(g.start('lesson',id),true);assert.equal(g.state.session.rotation.cycled,true);assert.equal(g.state.session.rotation.round,2);distinct(g.state.session.queue,c);
 const backup=g.export();assert.equal(createGame({course:c,storage:memory()}).restore(backup),true);
});
test('wrong answers append only deliberate repair repetitions after the unique base queue',()=>{
 const c=fullCourse(),g=createGame({course:c,storage:memory()});g.acceptPlacement('s9');g.start('lesson','g12-s1-u1:word');const base=g.state.session.base;distinct(g.state.session.queue,c);g.heard();g.submit('wrong');assert.equal(g.state.session.queue.length,base+1);assert.equal(g.state.session.queue.at(-1),g.state.session.queue[0]);play(g);assert.ok(g.result);
});
test('vocabulary sets select distinct words rather than padding with alternative question forms',()=>{
 const c=fullCourse();for(const set of c.vocab.values()){const g=createGame({course:c,storage:memory()});assert.equal(g.start('vocab',set.id),true);distinct(g.state.session.queue,c);assert.ok(g.state.session.queue.length>=Math.min(8,set.words.length));}
});
test('legacy saved queues remove unseen duplicate variants without deleting completed answers',()=>{
 const c=fullCourse(),storage=memory(),g=createGame({course:c,storage});g.start('lesson','u1:q1');const s=g.state.session;delete s.qualityVersion;s.queue=[s.queue[0],s.queue[0]];s.base=2;s.index=0;s.results=[];s.feedback=null;storage.setItem(KEY,JSON.stringify(g.state));const restored=createGame({course:c,storage});assert.equal(restored.validSession(),true);assert.equal(restored.state.session.queue.length,1);
});
test('review, mistakes, mixed practice, listening and jump tests use the same content safeguards',()=>{
 const c=fullCourse(),g=createGame({course:c,storage:memory()});g.acceptPlacement('s9');g.start('lesson','g12-s1-u1:word');play(g);
 for(const id of c.nodes.get('g12-s1-u1:word').pool.filter(id=>isScored(c.item(id))))g.state.items[id]={s:1,c:0,w:1,last:0,at:1,m:true,fix:0,ws:1,f:'s9'};
 for(const [mode,id]of [['review','g12-s1-u1'],['mistakes',null],['practice',null],['listen',null],['jump','s9']]){assert.equal(g.start(mode,id),true,mode);distinct(g.state.session.queue,c);assert.ok(g.state.session.queue.length>=6,mode);g.state.session=null;}
});
test('legacy completed answer and feedback survive duplicate-tail cleanup and can finish normally',()=>{
 const c=fullCourse(),storage=memory(),g=createGame({course:c,storage});g.start('lesson','u1:q1');const q=g.currentItem();g.submit(q.answer);const s=g.state.session;delete s.qualityVersion;s.queue=[q.id,q.id];s.base=2;s.index=0;storage.setItem(KEY,JSON.stringify(g.state));
 const restored=createGame({course:c,storage});assert.equal(restored.validSession(),true);assert.equal(restored.state.session.results.length,1);assert.equal(restored.state.session.feedback.ok,true);assert.equal(restored.state.session.queue.length,1);play(restored);assert.ok(restored.result);
});
