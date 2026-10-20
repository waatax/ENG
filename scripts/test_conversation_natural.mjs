import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const stored=new Map(),spoken=[],timers=new Map(),events=new Map();let timer=0;
const usA={name:'US A Natural',lang:'en-US'},usB={name:'US B Natural',lang:'en-US'},uk={name:'UK Natural',lang:'en-GB'};
let available=[uk,usA,usB,{name:'Chinese',lang:'zh-TW'}];
globalThis.localStorage={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)};
globalThis.document={querySelector:()=>null,querySelectorAll:()=>[]};
globalThis.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
globalThis.window={speechSynthesis:{getVoices:()=>available,speak:u=>spoken.push(u),cancel(){},addEventListener:(n,fn)=>{if(!events.has(n))events.set(n,new Set());events.get(n).add(fn);},removeEventListener:(n,fn)=>events.get(n)?.delete(fn)}};
globalThis.setTimeout=(fn,ms)=>{timers.set(++timer,{fn,ms});return timer;};globalThis.clearTimeout=id=>timers.delete(id);
const audio=await import('../dist/audio.mjs');
const commute=await import('../dist/commute_dialogues.mjs');
const {UNIT_DIALOGUE_REVISIONS,CHAPTER_DIALOGUE_REVISIONS}=await import('../dist/dialogue_editorial.mjs');
const {UNIFIED_GRADES}=await import('../dist/curriculum_unified.mjs');
const {curriculum}=await import('../dist/curriculum.mjs');
const {examFrameworks,examCommuteDialogues}=await import('../dist/EN/exam_curriculum.mjs');
function drain(){let index=0,safety=0;while(safety++<1000){if(index<spoken.length){spoken[index++].onend();}else if(timers.size){const [id,t]=timers.entries().next().value;timers.delete(id);t.fn();}else return;}throw new Error('Playback failed to finish');}
function reset(){commute.stopCommuteDialogue();spoken.length=0;timers.clear();}
const signatures=ds=>ds.map(d=>d.lines.map(l=>l.en||l.text).join('|'));
test('All 154 main conversations have unique complete bilingual scripts and clean spoken English',()=>{
 const ds=commute.ALL_COMMUTE_DIALOGUES;assert.equal(ds.length,154);assert.equal(ds.filter(d=>d.isNew).length,24);
 assert.equal(new Set(ds.map(d=>d.id)).size,ds.length);assert.equal(new Set(signatures(ds)).size,ds.length);
 for(const d of ds){assert.ok(d.lines.length>=4,d.id);for(const l of d.lines){assert.ok(l.speaker&&l.en&&l.zh&&l.note,d.id);assert.doesNotMatch(l.en,/[\u3400-\u9fff]|_{2,}|\/[a-zæɪʊəɑɛɔˈː]+\//u,d.id);}}
});
test('Rewritten source lessons and all players share the same corrected lines',()=>{
 assert.equal(Object.keys(UNIT_DIALOGUE_REVISIONS).length,61);assert.equal(Object.keys(CHAPTER_DIALOGUE_REVISIONS).length,27);
 for(const g of UNIFIED_GRADES)for(const s of g.semesters)for(const u of s.units){const d=commute.ALL_COMMUTE_DIALOGUES.find(d=>d.id==='unit:'+u.id);assert.deepEqual(d.lines.map(l=>[l.en,l.zh]),u.dialogue.map(l=>[l.en,l.zh]),u.id);}
 for(const t of curriculum)for(const c of t.chapters){const d=commute.ALL_COMMUTE_DIALOGUES.find(d=>d.id===`chapter:${t.id}:${c.id}`);assert.deepEqual(d.lines.map(l=>[l.en,l.zh]),c.dialogue.map(l=>[l.text,l.zh]),c.id);}
});
test('A British-only voice list never plays or marks a conversation complete',()=>{
 reset();available=[uk];const d=commute.ALL_COMMUTE_DIALOGUES.at(-1), before=commute.getCommuteDialogueState().completedIds.length;
 commute.playHomeConversation(d.id,'blind_en',false,()=>{});assert.equal(spoken.length,0);drain();assert.equal(spoken.length,0);
 assert.equal(commute.getCommuteDialogueState().isPlaying,false);assert.match(commute.getCommuteDialogueState().activePhaseLabel,/美式英文聲音/);assert.equal(commute.getCommuteDialogueState().completedIds.length,before);
 available=[uk,usA,usB,{name:'Chinese',lang:'zh-TW'}];
});
test('Delayed voice loading starts exactly once; cancellation prevents late voice events',()=>{
 reset();available=[];audio.speak('Hello there.',{requireAmerican:true});assert.equal(spoken.length,0);
 available=[usA,usB];for(const fn of [...events.get('voiceschanged')])fn();assert.equal(spoken.length,1);assert.equal(timers.size,0);
 audio.stopAudio();spoken.length=0;available=[];audio.speak('Canceled.',{requireAmerican:true});audio.stopAudio();available=[usA,usB];for(const fn of [...events.get('voiceschanged')])fn();assert.equal(spoken.length,0);assert.equal(timers.size,0);
});
test('All 154 conversations complete in all four modes with US voices, stable roles and intact text',()=>{
 available=[uk,usA,usB,{name:'Chinese',lang:'zh-TW'}];
 commute.playHomeConversation(commute.ALL_COMMUTE_DIALOGUES[0].id,'blind_en',false,()=>{});reset();
 for(const mode of ['blind_en','bilingual','shadowing','teaching']){
  commute.handleCommuteDialogueClick({dataset:{cdMode:mode}},()=>{});
  for(const d of commute.ALL_COMMUTE_DIALOGUES){
   reset();commute.startCommuteDialogue(d.id,0,false,()=>{});drain();
   assert.equal(commute.getCommuteDialogueState().isPlaying,false,`${mode} ${d.id}`);
   const english=spoken.filter(u=>u.lang==='en-US');assert.ok(english.length,d.id);
   for(const u of english){assert.ok(u.voice===usA||u.voice===usB,d.id);assert.equal(u.pitch,1);assert.doesNotMatch(u.text,/[\u3400-\u9fff]/u,d.id);}
   if(mode==='blind_en'){
    const speakers=[...new Set(d.lines.map(l=>l.speaker))],expected=d.lines.flatMap(l=>audio.speechChunks(l.en,240).map(text=>({text,voice:speakers.indexOf(l.speaker)%2?usB:usA})));
    assert.deepEqual(english.map(u=>({text:u.text,voice:u.voice})),expected,d.id);assert.equal(spoken.length,english.length);
   }
   assert.ok(commute.getCommuteDialogueState().completedIds.includes(d.id),d.id);
  }
 }
 reset();
});
test('English Academy has 20 unique scripts and uses the shared US engine without spoken speaker labels',()=>{
 const ds=[...Object.values(examFrameworks).map(f=>f.dialogue),...examCommuteDialogues];assert.equal(ds.length,20);assert.equal(new Set(signatures(ds)).size,20);
 for(const d of ds)for(const l of d.lines){assert.ok(l.text&&l.focusNote);assert.doesNotMatch(l.text,/_{2,}|[\u3400-\u9fff]/u);}
 const source=readFileSync('dist/EN/academy.mjs','utf8');assert.match(source,/speak as speakAmerican/);assert.match(source,/requireAmerican:true/);assert.doesNotMatch(source,/new SpeechSynthesisUtterance|speaker\} says:/);
});
test('Voice preferences reject non-US voices and survive selection; a single US voice supports both roles',()=>{
 available=[uk,usA,usB];assert.equal(audio.setAmericanVoice(0,uk.name),false);assert.equal(audio.setAmericanVoice(1,usA.name),true);assert.equal(audio.getBestEnglishVoice(1),usA);assert.match(stored.get('eq-american-conversation-voices-v1'),/US A Natural/);
 audio.setAmericanVoice(1,'');available=[usA,{name:'Legacy US',lang:'en-US'}];assert.equal(audio.getBestEnglishVoice(1),usA,'natural voice is preferred over a second legacy voice');available=[usA];assert.equal(audio.getBestEnglishVoice(1),usA);assert.match(audio.englishVoiceDescription(),/共用此音色/);
});
test('Natural phrase chunking preserves the entire text while preferring sentence boundaries',()=>{
 const text='Could you check our reservation before we leave? I would like to confirm the arrival time and the room number before I call the driver.';
 const chunks=audio.speechChunks(text,90);assert.equal(chunks[0],'Could you check our reservation before we leave?');assert.equal(chunks.join(' '),text);
});
