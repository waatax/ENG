import test from 'node:test';
import assert from 'node:assert/strict';
import {tracks} from '../dist/EN/content.mjs';
import {examFrameworks, examWordAndPhraseSets, examSubtopicDrills} from '../dist/EN/exam_curriculum.mjs';
import {readFileSync} from 'node:fs';

test('Five English courses have complete original lesson cycles and precise answer keys',()=>{
 assert.deepEqual(tracks.map(t=>t.id),['toefl','toeic','sat','gmat','gre']);
 assert.equal(tracks.flatMap(t=>t.lessons).length,20);
 for(const t of tracks)for(const l of t.lessons){for(const k of ['title','goal','rule','example','task'])assert.ok(l[k].length>10);assert.equal(l.words.length,6);for(const w of l.words){assert.equal(w.length,3);assert.ok(w.every(x=>x.length>3));}for(const q of l.questions){assert.equal(q[1].length,3);assert.equal(q[1].filter(x=>x===q[2]).length,1);assert.ok(q[3].length>20);}}
 assert.ok(!/[\u3400-\u9fff]/u.test(JSON.stringify(tracks)));
});

test('Pure-English examFrameworks cover TOEFL, TOEIC, SAT, GMAT and GRE with full teaching blueprints, Step-0 protocols, traps, worked demos and dialogues',()=>{
 const ids=['toefl','toeic','sat','gmat','gre'];
 assert.deepEqual(Object.keys(examFrameworks),ids);
 for(const id of ids){
   const fw=examFrameworks[id];
   assert.ok(fw.fullName.length>10);
   assert.ok(fw.constructEssence.length>40);
   assert.equal(fw.stepZeroProtocol.length,4);
   assert.equal(fw.blueprintTable.length,4);
   assert.equal(fw.chapters.length,3);
   assert.equal(fw.fatalTraps.length,4);
   assert.equal(fw.masterDemonstrations.length,2);
   assert.ok(fw.dialogue.lines.length>=4);
 }
 assert.ok(!/[\u3400-\u9fff]/u.test(JSON.stringify(examFrameworks)),'examFrameworks must contain zero CJK characters');
});

test('Pure-English Word & Phrase Audio sets and Interactive Exam Drills are complete and 100% English',()=>{
 assert.equal(examWordAndPhraseSets.length,10,'Must include both phrase sets and core vocab sets for all 5 exams');
 for(const tid of ['toefl','toeic','sat','gmat','gre']){
   assert.ok(examWordAndPhraseSets.some(s=>s.track===tid&&s.kind==='phrase'),`Missing phrase set for ${tid}`);
   assert.ok(examWordAndPhraseSets.some(s=>s.track===tid&&s.kind==='vocab'),`Missing vocab set for ${tid}`);
 }
 for(const set of examWordAndPhraseSets){
   assert.ok(set.items.length>=6);
   for(const [term,ipa,pos,def,clue,example] of set.items){
     assert.ok(term.length>=3);
     assert.ok(ipa.startsWith('/'));
     assert.ok(pos.length>=2);
     assert.ok(def.length>=15);
     assert.ok(clue.length>=15);
     assert.ok(example.length>=20);
   }
 }
 assert.ok(examSubtopicDrills.length>=15);
 const greMulti=examSubtopicDrills.filter(d=>d.track==='gre'&&d.type==='multi2');
 assert.ok(greMulti.length>=2,'Must include GRE 6-Choose-2 Sentence Equivalence drills');
 for(const d of greMulti){
   assert.equal(d.options.length,6);
   assert.equal(d.answer.length,2);
 }
 assert.ok(!/[\u3400-\u9fff]/u.test(JSON.stringify(examWordAndPhraseSets)));
 assert.ok(!/[\u3400-\u9fff]/u.test(JSON.stringify(examSubtopicDrills)));
});

test('English edition assets contain zero CJK characters and match deployment mirror byte-for-byte',()=>{
 for(const f of ['index.html','academy.css','academy.mjs','content.mjs','extended.mjs','exam_curriculum.mjs']){
   const distBuf=readFileSync('dist/EN/'+f);
   const siteBuf=readFileSync('site/dist/EN/'+f);
   assert.equal(distBuf.compare(siteBuf),0,`${f} must match site/dist/EN/${f}`);
   assert.ok(!/[\u3400-\u9fff]/u.test(distBuf.toString('utf8')),`${f} must not contain any CJK characters`);
 }
});
