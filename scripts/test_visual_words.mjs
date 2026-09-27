import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,copyFileSync} from 'node:fs';
import {renderTeachingAid,aidProfile} from '../dist/teaching_aids.mjs';
import {schoolWords,deckWords,schoolCounts} from '../dist/school_word_data.mjs';
import {createWordProgress,WORD_STORE} from '../dist/school_word_progress.mjs';
import {UNIFIED_GRADES} from '../dist/curriculum_unified.mjs';
import {curriculum} from '../dist/curriculum.mjs';
globalThis.localStorage={getItem(){return null;},setItem(){}};
const {points,knowledgePage}=await import('../dist/knowledge.mjs');
const {teachingChapter,microLesson}=await import('../dist/lesson_pages.mjs');
const {meaningChoices,normalizeSpelling,renderSchoolWords}=await import('../dist/school_words.mjs');
test('All 97 primary teaching pages contain readable diagrams and comparison tables',()=>{
 let n=0;for(const t of curriculum)for(const c of t.chapters){const h=teachingChapter(`${t.id}:${c.id}`);assert.ok(h.includes('aid-flow'));assert.ok(h.includes('<caption>'));n++;}
 for(const g of UNIFIED_GRADES)for(const s of g.semesters)for(const u of s.units){const h=microLesson(u.id);assert.ok(h.includes('aid-flow'),u.id);assert.ok(h.includes('<caption>'));n++;}
 for(const p of points){const h=knowledgePage(p.id);assert.ok(h.includes('aid-flow'),p.id);assert.ok(h.includes('<caption>'));n++;}assert.equal(n,97);
});
test('Visual selection never treats incidental English substrings as prepositions',()=>{
 assert.match(aidProfile('Reading strategies')[1],/線索/);assert.match(aidProfile('被動語態')[1],/主角/);assert.equal(aidProfile('unknown topic'),undefined);
 const html=renderTeachingAid('Food & Health',[{title:'healthy',explanation:'healthy food',example:'Eat fresh food.'}]);assert.ok(html.includes('healthy food'));assert.ok(!html.includes('yesterday'));
 assert.ok(renderTeachingAid('<img src=x>').includes('&lt;img'));
});
test('Card collection covers every explicit elementary/junior curriculum word',()=>{
 assert.equal(new Set(schoolWords.map(w=>w.id)).size,schoolWords.length);
 for(const g of UNIFIED_GRADES.filter(g=>['g6','g7','g8','g9'].includes(g.gradeId)))for(const s of g.semesters)for(const u of s.units)for(const v of u.phonicsVocab){assert.ok(schoolWords.some(w=>w.word===v.word&&w.sources.includes(u.id)),`${u.id}:${v.word}`);}
 assert.ok(schoolCounts.elementary>=120);assert.ok(schoolCounts.junior>schoolCounts.elementary);
 for(const c of schoolWords){assert.ok(c.zh&&c.example&&c.sources.length,c.word);const options=meaningChoices(c,deckWords('junior'));assert.equal(new Set(options).size,4);assert.equal(options.filter(o=>o===c.zh).length,1);}
 assert.ok(renderSchoolWords().includes(String(schoolCounts.elementary)));assert.equal(normalizeSpelling('  O’Clock  '),"o'clock");
});
test('Recall schedules survive reload; misses return in ten minutes',()=>{
 let clock=100000;const s={raw:null,getItem(){return this.raw;},setItem(k,v){this.raw=v;}};const id=schoolWords[0].id;
 let p=createWordProgress(schoolWords,s,()=>clock);assert.equal(p.isDue(id),false);p.record(id,false);clock+=600000;assert.equal(p.isDue(id),true);
 p.record(id,true);assert.equal(p.get(id).due,clock+86400000);p=createWordProgress(schoolWords,s,()=>clock);assert.equal(p.get(id).reviews,2);assert.equal(p.isDue(id),false);
 p.record(id,true);assert.equal(p.get(id).due,clock+3*86400000);p.record(id,false);assert.equal(p.get(id).step,0);assert.equal(p.record('missing',true),false);
});
test('Malformed storage and write failure do not lose in-memory practice',()=>{
 const p=createWordProgress(schoolWords,{getItem(){return 'broken';},setItem(){throw Error('quota');}});assert.ok(p.warning);p.record(schoolWords[0].id,true);assert.equal(p.get(schoolWords[0].id).reviews,1);assert.match(p.warning,/未能儲存/);
});
test('Deployment mirrors include all new dependencies',()=>{
 for(const f of ['teaching_aids.mjs','school_word_data.mjs','school_word_progress.mjs','school_words.mjs','app.js','knowledge.mjs','lesson_pages.mjs','lesson_visuals.mjs','learning_layout.css','flashcards.mjs'])assert.equal(readFileSync('dist/'+f,'utf8'),readFileSync('site/dist/'+f,'utf8'),f);
});
