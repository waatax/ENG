import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const stored=new Map(),spoken=[],timers=new Map();let nextTimer=0,panelId='test';
globalThis.localStorage={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)};
globalThis.document={querySelector:()=>({dataset:{lessonAudioPanel:panelId},querySelector:()=>null,querySelectorAll:()=>[]})};
globalThis.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
globalThis.window={scrollTo(){},speechSynthesis:{getVoices:()=>[],speak:u=>spoken.push(u),cancel(){}}};
globalThis.setTimeout=(fn,ms)=>{timers.set(++nextTimer,{fn,ms});return nextTimer;};
globalThis.clearTimeout=id=>timers.delete(id);
const player=await import('../dist/lesson_audio.mjs');
const catalog=await import('../dist/listening.mjs');
const grammar=await import('../dist/grammar.mjs');
const {grammarTopics}=await import('../dist/grammar_content.mjs');
const {UNIFIED_GRADES}=await import('../dist/curriculum_unified.mjs');
const {curriculum}=await import('../dist/curriculum.mjs');
const {knowledgePage,points}=await import('../dist/knowledge.mjs');
const {microLesson,teachingChapter}=await import('../dist/lesson_pages.mjs');
const click=(la,extra={})=>player.handleLessonAudioClick({dataset:{la,...extra},closest:()=>({dataset:{lessonAudioPanel:panelId}})});
const flush=()=>{const work=[...timers.values()];timers.clear();work.forEach(t=>t.fn());};

test('All school units, chapters and knowledge points offer their own playable lesson',()=>{
 for(const g of UNIFIED_GRADES)for(const s of g.semesters)for(const u of s.units)assert.ok(microLesson(u.id).includes('data-lesson-audio-panel="unit:'+u.id+'"'),u.id);
 for(const t of curriculum)for(const c of t.chapters)assert.ok(teachingChapter(t.id+':'+c.id).includes('data-lesson-audio-panel="chapter:'+t.id+':'+c.id+'"'));
 for(const p of points)assert.ok(knowledgePage(p.id).includes('data-lesson-audio-panel="knowledge:'+p.id+'"'));
 for(const stage of ['國小','國中','高中','高工'])assert.ok(catalog.listeningLessons.some(l=>l.stage===stage));
 assert.equal(new Set(catalog.listeningLessons.map(l=>l.id)).size,catalog.listeningLessons.length);
});
test('Grammar routes contain accessible diagrams, tables, listening and correctable questions',()=>{
 assert.equal(grammarTopics.length,20);
 for(const t of grammarTopics){
  assert.equal(new Set(t.options).size,t.options.length);assert.ok(t.options[t.answer]);assert.ok(t.rows.length>=3);
  grammar.setGrammarTopic(t.id);let html=grammar.grammarPage();assert.ok(html.includes('<caption>'));assert.ok(html.includes('scope="col"'));assert.ok(html.includes('grammar-flow'));assert.ok(html.includes('data-lesson-audio-panel'));assert.ok(!html.includes('undefined'));
  grammar.handleGrammarClick({dataset:{grammarAnswer:t.id,grammarChoice:String(t.answer)}},()=>{});assert.ok(grammar.grammarPage().includes('✓ 答對了'));
  grammar.handleGrammarClick({dataset:{grammarRetry:t.id}},()=>{});assert.ok(!grammar.grammarPage().includes('✓ 答對了'));
 }
 grammar.setGrammarTopic();assert.ok(grammar.grammarPage().includes('will have been working'));
});
test('Bilingual speech preserves English examples and chooses language separately',()=>{
 const parts=player.speechSegments('先聽例句。The cable was replaced yesterday. 中文解釋。');
 assert.ok(parts.some(p=>p.text==='The cable was replaced yesterday.'&&p.lang==='en-US'));
 assert.ok(parts.some(p=>p.text==='中文解釋。'&&p.lang==='zh-TW'));
 assert.ok(!player.spokenText('**重點** <b>說明</b>').includes('<b>'));
});
test('Playback advances only on completion, pauses safely, resumes and rejects late callbacks',()=>{
 panelId='test';player.registerAudioLesson('test','Test',[{title:'教學',text:'中文。Hello world.'}]);
 click('play');const old=spoken.at(-1);assert.equal(player.getLessonAudioState().index,0);
 flush();assert.equal(player.getLessonAudioState().index,0);
 click('pause');old.onend();flush();assert.equal(player.getLessonAudioState().playing,false);assert.equal(player.getLessonAudioState().index,0);
 click('play');spoken.at(-1).onend();assert.equal(player.getLessonAudioState().index,1);flush();assert.equal(spoken.at(-1).text,'中文。');
 click('next');assert.equal(spoken.at(-1).text,'Hello world.');assert.equal(spoken.at(-1).lang,'en-US');
 click('pause');assert.equal(JSON.parse(stored.get('eq-lesson-listening-v1')).test,2);
 panelId='other';player.syncLessonAudio();assert.equal(player.getLessonAudioState().playing,false);
 panelId='test';click('play');spoken.at(-1).onerror({error:'interrupted'});assert.equal(player.getLessonAudioState().playing,false);assert.equal(player.getLessonAudioState().index,2);
 click('restart');assert.equal(player.getLessonAudioState().index,0);click('pause');
});
test('Recall pauses after the question and sleep timer stops the next utterance',()=>{
 panelId='recall';player.registerAudioLesson('recall','Recall',[{title:'回想',text:'What is the rule?',recall:true},{title:'答案',text:'Use the past tense.'}]);
 click('play');spoken.at(-1).onend();flush();spoken.at(-1).onend();assert.ok([...timers.values()].some(t=>t.ms>=6000));click('pause');
 const originalNow=Date.now;let now=1000;Date.now=()=>now;
 try{player.handleLessonAudioChange({dataset:{laSetting:'sleep'},value:'10',closest:()=>({dataset:{lessonAudioPanel:panelId}})});now+=600001;click('play');assert.equal(player.getLessonAudioState().playing,false);}finally{Date.now=originalNow;}
});
test('Source and Pages mirror remain byte-identical',()=>{for(const f of ['lesson_audio.mjs','listening.mjs','grammar.mjs','grammar_content.mjs','app.js','knowledge.mjs','lesson_pages.mjs','styles.css'])assert.deepEqual(readFileSync('dist/'+f),readFileSync('site/dist/'+f),f);});

test('A mixed-language sentence stays on one track until every language segment completes',()=>{
 panelId='mixed';player.registerAudioLesson('mixed','Mixed',[{title:'規則',text:'使用 be 動詞。'}]);
 click('play');spoken.at(-1).onend();flush();
 assert.equal(player.getLessonAudioState().index,1);
 assert.equal(spoken.at(-1).lang,'zh-TW');spoken.at(-1).onend();
 assert.equal(spoken.at(-1).text,'be');assert.equal(spoken.at(-1).lang,'en-US');assert.equal(player.getLessonAudioState().index,1);
 spoken.at(-1).onend();assert.equal(spoken.at(-1).lang,'zh-TW');assert.equal(player.getLessonAudioState().index,1);
 spoken.at(-1).onend();flush();assert.equal(player.getLessonAudioState().playing,false);assert.equal(player.getLessonAudioState().index,2);
});
