import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCourse, createGame, isScored, KEY } from '../dist/quest/engine.mjs';
import { makePlacement, placementReport, refinePlacement } from '../dist/quest/placement.mjs';
import { fastAnswerEligible, jumpSuggestion } from '../dist/quest/acceleration.mjs';
const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
function course() {
  const c = createCourse(index);
  for (const s of index.sections) c.register(JSON.parse(fs.readFileSync(`dist/quest/course/${s.id}.json`)));
  c.register(JSON.parse(fs.readFileSync('dist/quest/course/stories.json')));
  return c;
}
const memory = () => { const m = new Map(); return { getItem:k=>m.get(k) || null,setItem:(k,v)=>m.set(k,v) }; };
function play(g, decide = () => true, tick = () => {}) {
  while (g.state.session) {
    const it = g.currentItem(); tick();
    if (isScored(it) && !g.state.session.feedback) g.submit(decide(it,g) ? (it.type==='match'?'matched':it.answer) : 'wrong-answer');
    g.next();
  }
  return g.result;
}
test('10/20/30 plans have exact unique questions, all nine stages and multiple skills', () => {
  const c = course();
  for (const size of [10,20,30]) for (const seed of [1,7,91]) {
    const p = makePlacement(c,size,seed);
    assert.equal(p.slots.length,size);
    assert.equal(new Set(p.slots.map(x=>x.id)).size,size);
    assert.equal(new Set(p.slots.map(x=>x.section)).size,9);
    assert.ok(new Set(p.slots.map(x=>x.skill)).size>=3);
    assert.ok(p.slots.every(x=>c.item(x.id).why));
  }
  assert.equal(makePlacement(c,15),null);
});
test('all ideal mastery frontiers stay monotonic across the three test lengths; early slip does not cap advanced learners', () => {
  const c=course();
  for (const size of [10,20,30]) for(let mastered=0;mastered<=9;mastered++) {
    const p=makePlacement(c,size,2), rs=[];
    for(let i=0;i<size;i++){const x=p.slots[i];rs.push({id:x.id,ok:Number(x.section.slice(1))<=mastered,hint:false,repair:false,audio:true});refinePlacement(p,rs,c,2);}
    assert.equal(new Set(p.slots.map(x=>x.id)).size,size);
    const r=placementReport(p,rs,c);
    assert.equal(r.recommended,'s'+Math.min(9,mastered+1),`size ${size}, frontier ${mastered}`);
    assert.equal(r.complete,true);
  }
  const p=makePlacement(c,30,5), rs=p.slots.map((x,i)=>({id:x.id,ok:i!==0,hint:false,repair:false}));
  assert.equal(placementReport(p,rs,c).recommended,'s9');
});
test('placement boundary refinement, interruption and full review retain exact length with no XP or automatic completion', () => {
  const c=course(),storage=memory(); let g=createGame({course:c,storage});
  g.start('placement',30);
  for (let i=0;i<28;i++) { const it=g.currentItem(),slot=g.state.session.placement.slots[i]; g.submit(Number(slot.section.slice(1))<=5?it.answer:'wrong-answer');g.next(); }
  const before=structuredClone(g.state.session);
  g=createGame({course:c,storage});assert.equal(g.validSession(),true);
  assert.deepEqual(g.state.session.placement,before.placement);
  const r=play(g,(it,g)=>Number(g.state.session.placement.slots.find(x=>x.id===it.id).section.slice(1))<=5);
  assert.equal(r.total,30);assert.equal(r.review.length,30);assert.equal(r.recommended,'s6');
  assert.equal(r.xp,0);assert.equal(g.state.xp.total,0);assert.equal(g.state.days.length,0);
  assert.equal(Object.keys(g.state.nodes).length,0);
  g.acceptPlacement(r.recommended);assert.equal(Object.keys(g.state.nodes).length,0);
  assert.equal(new Set(before.queue).size,30);
  assert.equal(g.start('placement',15),false);
});
test('corrupt placement metadata is rejected without losing prior progress', () => {
  const c=course(),storage=memory();let g=createGame({course:c,storage});g.start('lesson','u1:q1');play(g);
  g.start('placement',10);const raw=JSON.parse(g.export());raw.session.placement.slots.pop();storage.setItem(KEY,JSON.stringify(raw));
  g=createGame({course:c,storage});assert.equal(g.validSession(),false);assert.equal(g.state.nodes['u1:q1'].n,1);
});
test('school stages include every lesson, boss and story without granting completion, crowns or advanced access', () => {
  const c=course(),g=createGame({course:c,storage:memory()});
  for(const s of index.sections.slice(0,8)) {
    assert.equal(g.trackUnlocked(s.id),true);
    for(const u of s.units) {
      for(const n of u.nodes) assert.equal(g.nodeStatus(n.id),'available');
      if(u.story) assert.equal(g.unitStoryStatus(u.id),'available');
    }
    assert.equal(g.sectionDone(s.id),false);
  }
  assert.equal(g.trackUnlocked('s9'),false);assert.deepEqual(g.state.crowns,{});
});
test('five independent fast unseen answers suggest a separate jump test; hints, repeats, instant clicks and poor accuracy cannot', () => {
  const c=course(),storage=memory();let time=100000;
  const g=createGame({course:c,storage,now:()=>time});
  g.start('lesson','u1:q1');const r=play(g,()=>true,()=>{time+=2000;});
  assert.equal(r.suggestedJump,'s2');assert.equal(g.state.jumped.s2,undefined);
  g.start('lesson','u1:q1');assert.equal(play(g,()=>true,()=>{time+=2000;}).suggestedJump,null);
  const it={type:'choice',prompt:'Hello'},r0={ok:true,hint:false,repair:false,transcript:false,elapsed:2000};
  for(const patch of [{hint:true},{repair:true},{transcript:true},{elapsed:100},{ok:false},{elapsed:100000}]) assert.equal(fastAnswerEligible(it,{...r0,...patch},false),false);
  assert.equal(fastAnswerEligible(it,r0,true),false);
  assert.equal(fastAnswerEligible({type:'listen'},r0,false),false);
  assert.equal(jumpSuggestion({mode:'lesson',ref:'u1:q1',results:[]},c),null);
  assert.equal(jumpSuggestion({mode:'lesson',ref:'u1:q1',fastBest:5,results:[...Array(5)].map(()=>({ok:true})).concat([{ok:false}])},c),null);
});


test('text fallback or unplayed audio is not scored as listening evidence and widens an apparently exact result',()=>{
 const c=course(),p=makePlacement(c,20,3);
 const rs=p.slots.map(x=>({id:x.id,ok:true,hint:false,repair:false,audio:true,transcript:x.skill==='listening'}));
 const r=placementReport(p,rs,c),listening=r.skills.find(x=>x.id==='listening');
 assert.equal(listening.correct,0);assert.equal(listening.heard,0);assert.equal(r.listeningLimited,true);
 assert.notEqual(r.range[0],r.range[1]);
});
