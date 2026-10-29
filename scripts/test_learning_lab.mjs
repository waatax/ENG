import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCourse} from '../dist/quest/engine.mjs';
import {unitLab,labView} from '../dist/quest/lab.mjs';
import {answerText,feedbackText} from '../dist/quest/coach.mjs';
import * as sound from '../dist/quest/sound.mjs';
const index=JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const course=createCourse(index);
for(const t of [...index.sections,...index.branches])course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
test('every course and semester unit gets at least 10% grounded, distinct additional activities',()=>{
  const report=[];
  for(const u of course.units.values()){
    const lab=unitLab(course,u.id);
    assert.ok(lab.baseline>0,u.id);
    assert.equal(lab.cards.length,Math.ceil(lab.baseline*.1),u.id);
    assert.equal(new Set(lab.cards.map(c=>c.source)).size,lab.cards.length);
    for(const c of lab.cards){assert.ok(course.item(c.source));assert.ok(c.answer&&c.why&&c.transfer&&c.check,c.source);assert.ok(!/undefined|\[object Object\]/.test(c.answer),c.source);}
    assert.match(labView(course,u.id),/非新增計分題/);
    report.push({id:u.id,title:u.title,baseline:lab.baseline,added:lab.cards.length,sources:lab.cards.map(c=>c.source)});
  }
  fs.mkdirSync('docs/redesign/verification/learn20261029',{recursive:true});
  fs.writeFileSync('docs/redesign/verification/learn20261029/content.json',JSON.stringify({units:report.length,added:report.reduce((n,u)=>n+u.added,0),definition:'Additional self-explanation/retrieval/transfer activities; not new scored questions or new vocabulary.',report},null,2));
});
test('audio answer retains original English for translated listening and handles multiple answers',()=>{
  assert.equal(answerText({type:'listen',audio:'Where is the station?',answer:'車站在哪裡？'}),'Where is the station?。車站在哪裡？');
  assert.equal(answerText({type:'multi',correctAnswers:['A','B'],answer:'A || B'}),'A；B');
  assert.match(feedbackText({type:'choice',answer:'is',why:'單數主詞搭配 is。'},'are'),/are.*is.*單數/);
});
test('stopping speech settles its promise even when the device never emits a cancellation event',async()=>{
  globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  globalThis.speechSynthesis={getVoices:()=>[{lang:'en-US',name:'English'}],cancel(){},speak(){}};
  try {const p=sound.narrate('Hello.');sound.stop();assert.equal(await p,'stopped');}
  finally{delete globalThis.SpeechSynthesisUtterance;delete globalThis.speechSynthesis;}
});
test('stopping recorded audio settles its promise; stale errors do not start speech',async()=>{
  let audio;
  globalThis.Audio=class{constructor(){audio=this;}play(){return Promise.resolve();}pause(){}};
  try {const p=sound.play({text:'Hello',mp3:'example.mp3'});sound.stop();assert.equal(await p,'stopped');audio.onerror();}
  finally{delete globalThis.Audio;}
});
