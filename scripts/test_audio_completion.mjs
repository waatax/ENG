import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const scheduled=new Map();let timer=0;const spoken=[];
globalThis.setTimeout=fn=>{scheduled.set(++timer,fn);return timer;};
globalThis.clearTimeout=id=>scheduled.delete(id);
globalThis.localStorage={getItem(){return null;},setItem(){}};
globalThis.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
globalThis.window={speechSynthesis:{speaking:false,pending:false,getVoices(){return [];},speak(u){spoken.push(u);},cancel(){}}};
const audio=await import('../dist/audio.mjs');
const fc=await import('../dist/flashcards.mjs');
const flush=()=>{const pending=[...scheduled.values()];scheduled.clear();for(const fn of pending)fn();};
const reset=()=>{fc.stopFlashcardAutoPlay();spoken.length=0;scheduled.clear();};
const render=()=>{};
test('Every card sends the target word as part of its complete example text',()=>{
 for(const c of fc.FLASHCARD_DATABASE){const text=audio.speechChunks(c.example).join(' ');assert.equal(text,c.example.replace(/\*\*|\*|__/g,'').replace(/_/g,' ').replace(/\s+/g,' ').trim(),c.id);assert.ok(text.toLowerCase().includes(c.word.toLowerCase().trim()),c.id);}
});
test('Long sentences preserve every word and emit completion only after the final spoken chunk',()=>{
 reset();const sentence='The students use the word family in a complete sentence and explain how each family member helps at home. '.repeat(4).trim();let ended=0;
 audio.playSentence(sentence,false,{onEnd:()=>ended++});assert.equal(spoken.length,1);
 flush();assert.equal(spoken.length,1,'time alone cannot advance speech');
 for(let i=0;i<spoken.length;i++){assert.equal(ended,0);spoken[i].onend();}
 assert.equal(ended,1);assert.equal(spoken.map(u=>u.text).join(' '),sentence);assert.ok(spoken.every(u=>u.lang==='en-US'));
 spoken.at(-1).onend();assert.equal(ended,1);
});
test('Stopping or replacing speech invalidates late callbacks from the previous utterance',()=>{
 reset();let oldEnds=0;audio.playWord('family',false,{onEnd:()=>oldEnds++});const old=spoken[0];audio.stopAudio();old.onend();assert.equal(oldEnds,0);
 audio.playWord('book');const replaced=spoken.at(-1);audio.playSentence('This is a book.');const n=spoken.length;replaced.onend();assert.equal(spoken.length,n);
 audio.stopAudio();
});
test('Full and simple modes finish exactly ten cards in the required language/text order',()=>{
 for(const mode of ['word_zh_sentence','word_zh']){
  reset();fc.handleFlashcardEvents({dataset:{fcTier:'elem_1000'}},render);fc.handleFlashcardEvents({dataset:{fcBatchSize:'10'}},render);fc.handleFlashcardEvents({dataset:{fcVoiceMode:mode}},render);
  fc.startFlashcardAutoPlay(render);
  let completed=0,safety=0;
  while((completed<spoken.length||scheduled.size)&&safety++<2000){if(completed<spoken.length)spoken[completed++].onend();else flush();}
  assert.ok(safety<2000);const expected=[];
  for(const c of fc.FLASHCARD_DATABASE.filter(c=>c.tier==='elem_1000').slice(0,10)){
   for(const [text,lang] of [[c.word,'en-US'],[c.zh,'zh-TW'],...(mode==='word_zh'?[]:[[c.example,'en-US']])])for(const chunk of audio.speechChunks(text))expected.push({text:chunk,lang});
  }
  assert.deepEqual(spoken.map(u=>({text:u.text,lang:u.lang})),expected);
  assert.match(fc.renderFlashcardsStudioView(),/本組 10 個單字已完成/);
 }
 reset();
});
test('Speech errors stop the batch without skipping, and mode changes cancel pending callbacks',()=>{
 reset();fc.handleFlashcardEvents({dataset:{fcReplayBatch:true}},render);spoken[0].onerror({error:'network'});flush();assert.equal(spoken.length,1);assert.match(fc.renderFlashcardsStudioView(),/語音未完整播放/);
 fc.startFlashcardAutoPlay(render);const old=spoken.at(-1);old.onend();assert.ok(scheduled.size);
 fc.handleFlashcardEvents({dataset:{fcVoiceMode:'word_zh_sentence'}},render);flush();const count=spoken.length;old.onend();flush();assert.equal(spoken.length,count);reset();
});
test('All requested batch sizes exist and navigation stops the autoplay owner',()=>{
 for(const size of [10,20,30,50,100,0]){
  fc.handleFlashcardEvents({dataset:{fcBatchSize:String(size)}},render);
  const html=fc.renderFlashcardsStudioView();assert.ok(html.includes(`data-fc-batch-size="${size}"`));assert.ok(html.includes(`卡片 1 / ${size||1000}`));
 }
 assert.match(readFileSync('dist/app.js','utf8'),/function navigate\(p\) \{\s*stopFlashcardAutoPlay\(\)/);
 for(const f of ['audio.mjs','app.js','flashcards.mjs'])assert.equal(readFileSync('dist/'+f,'utf8'),readFileSync('site/dist/'+f,'utf8'));
 reset();
});
