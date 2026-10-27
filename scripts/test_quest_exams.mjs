import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCourse,createGame,isScored,accepts,DAY,KEY} from '../dist/quest/engine.mjs';
import {EXAMS,TIERS,examMastery,examForms} from '../dist/quest/exams.mjs';
import {questionKey,learningKeys} from '../dist/quest/question_quality.mjs';
const bank=JSON.parse(fs.readFileSync('dist/quest/course/exams.json')),ix=JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const memory=()=>{const m=new Map();return{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
function setup(){const c=createCourse(ix);c.register(bank);let time=Date.UTC(2026,9,27,8);const storage=memory(),g=createGame({course:c,storage,now:()=>time});return{c,g,storage,setTime:t=>time=t,tick:d=>time+=d,now:()=>time};}
function play(g,{wrong=false,audio=true,hint=false}={}){let guard=120;while(g.state.session&&guard--){const q=g.currentItem();if(isScored(q)&&!g.state.session.feedback){if(audio)g.heard();if(hint)g.hint();assert.ok(g.submit(wrong?q.type==='multi'?q.options.slice(-2).join(' || '):q.options.find(x=>x!==q.answer):q.answer));}g.next();}assert.ok(guard>0);return g.result;}
test('all twelve exam campaigns have balanced practice and two isolated unseen forms',()=>{
 assert.equal(bank.items.filter(q=>q.original).length,468);assert.ok(bank.items.length>=570);const ids=new Set(),keys=new Set(),families=new Map();
 for(const q of bank.items){assert.ok(!ids.has(q.id));ids.add(q.id);assert.ok(!keys.has(questionKey(q)),q.id);keys.add(questionKey(q));assert.ok(accepts(q,q.answer),q.id);assert.ok(q.why.length>=7);assert.equal(new Set(q.options).size,q.options.length);if(families.has(q.family))assert.equal(families.get(q.family),q.partition+q.form);families.set(q.family,q.partition+q.form);if(q.exam==='gmat'&&q.original)assert.equal(q.options.length,5,q.id);}
 for(const e of EXAMS)for(const t of TIERS)for(const [skill]of e.skills)for(const form of ['P','A','B'])assert.ok(bank.items.filter(q=>q.exam===e.id&&q.tier===t.id&&q.skill===skill&&q.form===form).length>=4,e.id+t.id+skill+form);
});
test('every low/mid/high route earns a milestone only after skill evidence and a different next-day unseen form',()=>{
 for(const e of EXAMS)for(const t of TIERS){const {g,tick,now}=setup(),key=e.id+':'+t.id;
 for(const [skill]of e.skills){assert.equal(g.start('exam-practice',key+':'+skill),true);play(g);assert.equal(examMastery(g.state,key,now()).skills.find(s=>s.id===skill).ready,true);}
 assert.equal(examMastery(g.state,key,now()).completed,false);assert.equal(g.start('exam-check',key),true);assert.equal(g.state.session.examPlan.form,'A');assert.equal(g.hint(),false);assert.equal(play(g).passed,true);assert.equal(examMastery(g.state,key,now()).completed,false);
 assert.equal(g.start('exam-check',key),false);tick(DAY+1000);assert.equal(g.start('exam-check',key),true);assert.equal(g.state.session.examPlan.form,'B');const r=play(g);assert.equal(r.mastery.completed,true);assert.equal(r.mastery.official,0);assert.equal('predictedScore' in r,false);
 }
});
test('unheard TOEIC answers, hints, wrong answers and timeout do not produce independent readiness',()=>{
 for(const options of [{audio:false},{wrong:true}]){const {g}=setup();g.start('exam-check','toeic:low');assert.equal(play(g,options).passed,false);}
 const {g,tick}=setup();g.start('exam-check','sat:high');tick(g.state.session.examPlan.timeLimit+1);const r=play(g);assert.equal(r.timed,false);assert.equal(r.passed,false);
 const h=setup().g;h.start('exam-practice','gre:low:equivalence');play(h,{hint:true});assert.equal(examMastery(h.state,'gre:low').skills.find(s=>s.id==='equivalence').ready,false);
});
test('two-choice grading requires two different correct options, independent of click order',()=>{
 for(const q of bank.items.filter(q=>q.type==='multi')){assert.equal(q.options.length,6);assert.equal(accepts(q,q.correctAnswers.slice().reverse().join(' || ')),true);assert.equal(accepts(q,q.correctAnswers[0]),false);assert.equal(accepts(q,[q.correctAnswers[0],q.correctAnswers[0]].join(' || ')),false);assert.equal(accepts(q,q.options.slice(0,3).join(' || ')),false);}
});
test('abandoned or reloaded exposure cannot be repackaged as an unseen form',()=>{
 const {c,g,storage,now}=setup();g.start('exam-check','gmat:mid');g.abandon();assert.equal(examForms(c,g.state,'gmat:mid').find(x=>x.form==='A').fresh,false);g.start('exam-check','gmat:mid');assert.equal(g.state.session.examPlan.form,'B');
 g.submit(g.currentItem().answer);const resumed=createGame({course:c,storage,now});assert.equal(resumed.validSession(),true);assert.equal(play(resumed).novel,true);
 assert.equal(resumed.start('exam-check','gmat:mid'),true);assert.equal(resumed.state.session.examPlan.novel,false);assert.equal(play(resumed).passed,false);
});
test('exam evidence round-trips, counts distinct dates and never invents a score conversion',()=>{
 const {g,c,storage,now,tick}=setup();assert.equal(g.saveExamEvidence('sat:low',{score:1600,date:'2026-10-27',kind:'actual',form:'Actual-1'}),false);assert.equal(g.saveExamEvidence('gmat:low',{score:75,date:'2026-10-28',kind:'actual',form:'Actual-1'}),false);
 assert.equal(g.saveExamEvidence('gre:mid',{score:156,date:'2026-10-26',kind:'practice',form:'Practice-1'}),true);assert.equal(g.saveExamEvidence('gre:mid',{score:157,date:'2026-10-26',kind:'actual',form:'Actual-1'}),true);assert.equal(examMastery(g.state,'gre:mid',now()).official,1);
 assert.equal(g.saveExamEvidence('gre:mid',{score:158,date:'2026-10-27',kind:'practice',form:'Practice-2'}),true);assert.equal(examMastery(g.state,'gre:mid',now()).official,2);const restored=createGame({course:c,storage,now});assert.equal(restored.state.examProgress['gre:mid'].official.length,3);assert.equal(restored.restore(g.export()),true);tick(91*DAY);assert.equal(examMastery(g.state,'gre:mid',now()).official,0);
});
test('official score evidence rejects invalid increments, impossible dates and repeated forms as new evidence',()=>{
 const {g,now}=setup();for(const [key,score,date]of [['sat:low',551,'2026-10-25'],['toeic:low',563,'2026-10-25'],['gre:low',150,'2026-02-31']])assert.equal(g.saveExamEvidence(key,{score,date,kind:'practice',form:'Test 1'}),false);
 g.saveExamEvidence('sat:low',{score:600,date:'2026-10-25',kind:'practice',form:'Test 1'});g.saveExamEvidence('sat:low',{score:620,date:'2026-10-26',kind:'practice',form:'Test 1'});assert.equal(examMastery(g.state,'sat:low',now()).official,1);
 g.saveExamEvidence('sat:low',{score:610,date:'2026-10-25',kind:'practice',form:'Test 2'});assert.equal(examMastery(g.state,'sat:low',now()).official,2);
});
test('corrupt exam resume cannot shorten the full form or expand its time allowance',()=>{
 for(const mutate of [s=>s.queue.pop(),s=>s.examPlan.timeLimit*=2,s=>s.mode=null]){const {g,c,storage,now}=setup();g.start('exam-check','sat:mid');const raw=JSON.parse(g.export());mutate(raw.session);storage.setItem(KEY,JSON.stringify(raw));const resumed=createGame({course:c,storage,now});assert.equal(resumed.validSession(),false);assert.equal(resumed.state.session,null);}
});
