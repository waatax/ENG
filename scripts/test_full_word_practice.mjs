import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {FLASHCARD_DATABASE as cards} from '../dist/flashcards.mjs';
import {createFullWordPractice,wordChoices,normalizeWord,FULL_WORD_STORE} from '../dist/full_word_practice.mjs';
import {WORD_STORE} from '../dist/school_word_progress.mjs';
const storage=()=>({data:new Map(),getItem(k){return this.data.get(k)||null;},setItem(k,v){this.data.set(k,v);}});
test('Every one of 7,700 cards has a reachable four-choice meaning exercise',()=>{
 assert.equal(cards.length,7700);assert.equal(new Set(cards.map(c=>c.id)).size,7700);
 const pools=Object.groupBy(cards,c=>c.tier);
 for(const c of cards){const choices=wordChoices(c,pools[c.tier],()=>0.37);assert.equal(choices.length,4,c.id);assert.equal(new Set(choices.map(o=>o.text)).size,4,c.id);assert.equal(choices.filter(o=>o.right).length,1,c.id);assert.equal(choices.find(o=>o.right).text,c.zh);assert.ok(normalizeWord(c.word));}
});
test('Every tier starts a session and unseen cards are prioritized across sessions',()=>{
 const db=cards.slice(0,45),p=createFullWordPractice(db,storage(),()=>100000,()=>0.5),seen=new Set();
 for(let batch=0;batch<3;batch++){
  p.setting('filter','new');p.action({wpStart:true});
  while(p.current()){
   assert.ok(!seen.has(p.current().id));seen.add(p.current().id);
   assert.equal(p.answer(p.choices().findIndex(o=>o.right)),true);
   assert.equal(p.answer(0),false,'double submit cannot count twice');p.action({wpNext:true});
  }
 }
 assert.equal(seen.size,45);assert.match(p.render(),/這一組完成了/);
 for(const tier of new Set(cards.map(c=>c.tier))){const full=createFullWordPractice(cards,storage());full.setting('tier',tier);full.action({wpStart:true});assert.equal(full.current().tier,tier);}
});
test('Spelling answers remain hidden until checked, survive reload, and use isolated storage',()=>{
 const s=storage();s.setItem(WORD_STORE,'{"existing":"school"}');let clock=100000;
 let p=createFullWordPractice(cards.slice(0,2),s,()=>clock,()=>0.5);
 p.setting('mode','spell');p.action({wpStart:true});const word=p.current();
 assert.ok(!p.render().includes(`lang="en">${word.word}</span>`));
 assert.equal(p.answer('   '),false);assert.equal(p.answer('incorrect'),true);assert.equal(p.progress.get(word.id).due,clock+600000);
 assert.ok(p.render().includes(`lang="en">${word.word}</span>`));assert.equal(s.getItem(WORD_STORE),'{"existing":"school"}');assert.ok(s.getItem(FULL_WORD_STORE));
 p=createFullWordPractice(cards.slice(0,2),s,()=>clock);assert.equal(p.progress.get(word.id).misses,1);clock+=600000;
 p.setting('filter','due');p.setting('mode','spell');p.action({wpStart:true});assert.equal(p.current().id,word.id);p.answer(' '+word.word.toUpperCase()+' ');assert.equal(p.progress.get(word.id).step,1);
 assert.equal(normalizeWord('  O’CLOCK  '),"o'clock");
});
test('Flipping does not count as success; self-rating requires revealed answer',()=>{
 const p=createFullWordPractice(cards.slice(0,2),storage());p.setting('mode','recall');p.action({wpStart:true});const id=p.current().id;
 assert.equal(p.action({wpRate:'yes'}),false);p.action({wpReveal:true});assert.equal(p.progress.get(id),null);p.action({wpRate:'yes'});assert.equal(p.progress.get(id).reviews,1);assert.equal(p.action({wpRate:'yes'}),false);
});
test('New module is deployed with working direct routes and storage failures are visible',()=>{
 for(const file of ['full_word_practice.mjs','app.js','flashcards.mjs','school_word_progress.mjs','learning_layout.css'])assert.equal(readFileSync('dist/'+file,'utf8'),readFileSync('site/dist/'+file,'utf8'),file);
 const app=readFileSync('dist/app.js','utf8');assert.ok(app.includes("['wordpractice','flashcards'].includes(parts[0])"));
 const p=createFullWordPractice(cards.slice(0,2),{getItem(){return null;},setItem(){throw Error('quota');}});p.action({wpStart:true});p.answer(0);assert.match(p.render(),/紀錄未能儲存/);
});
