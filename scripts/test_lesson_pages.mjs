import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { curriculum } from '../dist/curriculum.mjs';
import { workshops } from '../dist/lesson_workshops.mjs';
import { UNIFIED_GRADES } from '../dist/curriculum_unified.mjs';
globalThis.localStorage={data:new Map(),getItem(k){return this.data.get(k)||null;},setItem(k,v){this.data.set(k,v);}};
globalThis.window={scrollY:0,scrollTo(){}};
globalThis.document={querySelector(){return null;}};
const pages=await import('../dist/lesson_pages.mjs');
test('Every chapter displays its own knowledge, vocabulary, dialogue and usable practice',()=>{
 const prompts=new Set();
 for(const track of curriculum)for(const chapter of track.chapters){
  const w=workshops[chapter.id];assert.ok(w,chapter.id);assert.ok(w.steps.length>=3);assert.equal(w.question.options.length,3);assert.ok(w.question.answer>=0&&w.question.answer<3);assert.ok(!prompts.has(w.question.prompt));prompts.add(w.question.prompt);
  const html=pages.teachingChapter(`${track.id}:${chapter.id}`);
  for(const text of [chapter.title,w.rule,w.example,w.question.prompt,w.task,...chapter.vocab.map(v=>v.word),...chapter.dialogue.map(d=>d.text)])assert.ok(html.includes(pages.escapeText(text)),`${chapter.id}: ${text}`);
  assert.ok(html.includes('data-lesson-draft'));assert.ok(!html.includes('undefined'));
 }assert.equal(prompts.size,27);
});
test('All 61 academic units resolve their own material, no shared football question',()=>{
 const units=UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units));assert.equal(units.length,61);
 for(const u of units){const html=pages.microLesson(u.id);assert.ok(html.includes(pages.escapeText(u.title)));assert.ok(!html.includes('Look! The children ________ soccer'));assert.ok(!html.includes('undefined'));if(!u.id.includes('exam-suite'))assert.ok(!html.includes('這是考試資料入口'),u.id);}
 const sixth=pages.microLesson('g6-s1-u1');assert.ok(sixth.includes('quarter'));assert.ok(sixth.includes('<table>'));assert.ok(sixth.includes('micro-en1-1'));
 assert.ok(pages.microLesson('g8-s1-u3').includes('unless'));
});
test('First answer cannot be overwritten by repeated clicks and survives reload',async()=>{
 const q=workshops.j1.question;let renders=0;
 pages.handleLessonClick({dataset:{lessonQuestion:q.id,lessonChoice:'0'}},()=>renders++);
 pages.handleLessonClick({dataset:{lessonQuestion:q.id,lessonChoice:String(q.answer)}},()=>renders++);
 const stored=JSON.parse(localStorage.getItem('english-quest-lesson-evidence-v1'));assert.equal(stored.answers[q.id].choice,0);
 const reloaded=await import('../dist/lesson_pages.mjs?reload-test');assert.match(reloaded.teachingChapter('jhs:j1'),/需要訂正/);
 const before=JSON.stringify(stored);
 pages.handleLessonClick({dataset:{lessonQuestion:q.id,lessonChoice:'999'}},()=>{});
 assert.equal(localStorage.getItem('english-quest-lesson-evidence-v1'),before);
});
test('Learner drafts persist and are escaped instead of becoming HTML',()=>{
 pages.handleLessonInput({dataset:{lessonDraft:'j1'},value:'<img src=x onerror=alert(1)>'});
 const html=pages.teachingChapter('jhs:j1');assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img src=x'));
 assert.equal(JSON.parse(localStorage.getItem('english-quest-lesson-evidence-v1')).drafts.j1,'<img src=x onerror=alert(1)>');
});
test('Both deployed copies stay identical and shared fake lesson has been removed',()=>{
 for(const f of ['app.js','curriculum.mjs','lesson_pages.mjs','lesson_workshops.mjs','styles.css'])assert.equal(readFileSync(`dist/${f}`,'utf8'),readFileSync(`site/dist/${f}`,'utf8'),f);
 const app=readFileSync('dist/app.js','utf8');assert.ok(!app.includes('Look! The children ________ soccer'));assert.ok(app.includes('return teachingChapter(openChapterId)'));assert.ok(app.includes('return microLesson(activeUnitId)'));
});
