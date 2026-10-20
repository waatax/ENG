import test from 'node:test';
import assert from 'node:assert/strict';
const saved=new Map(),spoken=[],timers=new Map();let timer=0;
globalThis.localStorage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)};
globalThis.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
globalThis.window={speechSynthesis:{getVoices:()=>[],speak:u=>spoken.push(u),cancel(){}}};
globalThis.setTimeout=fn=>{timers.set(++timer,fn);return timer;};globalThis.clearTimeout=id=>timers.delete(id);
const audio=await import('../dist/audio.mjs');
const home=await import('../dist/conversation_home.mjs');
const commute=await import('../dist/commute_dialogues.mjs');
test('Natural US voice outranks named British voices and legacy US voices',()=>{
 const uk={name:'Microsoft Jenny Online Natural',lang:'en-GB'}, legacy={name:'Microsoft Zira',lang:'en-US'}, us={name:'Microsoft Ava Online Natural',lang:'en-US'};
 assert.equal(audio.selectAmericanVoice([uk,legacy,us]),us);assert.equal(audio.selectAmericanVoice([uk]),null);
});
test('Every conversation is reachable in a populated difficulty group',()=>{
 const counts={};for(const d of commute.ALL_COMMUTE_DIALOGUES){const g=home.conversationGroup(d);counts[g]=(counts[g]||0)+1;assert.ok(d.lines.length);}
 assert.equal(Object.keys(counts).length,5);
 const html=home.homeConversations();assert.equal((html.match(/data-home-play=/g)||[]).length,commute.ALL_COMMUTE_DIALOGUES.length);
 assert.match(html,/裝置預設英文/);
});
test('Difficulty, English keyword and completion filters combine with empty results',()=>{
 home.handleHomeConversationClick({dataset:{homeLevel:'入門'}},()=>{});
 let result='';globalThis.document={getElementById:()=>({set innerHTML(v){result=v;}}),querySelector:()=>null,querySelectorAll:()=>[]};
 home.handleHomeConversationInput({id:'home-conversation-query',value:'zzzz-no-match'});assert.match(result,/找到 0 篇/);
 home.handleHomeConversationInput({id:'home-conversation-query',value:''});assert.doesNotMatch(result,/找到 0 篇/);
 home.handleHomeConversationInput({id:'home-conversation-progress',value:'已聽完'});assert.match(result,/找到 0 篇/);
});
test('Home stop retains sentence, resume starts there, late speech cannot advance',()=>{
 const d=commute.ALL_COMMUTE_DIALOGUES[0];commute.playHomeConversation(d.id,'blind_en',false,()=>{});
 assert.equal(spoken.at(-1).text,d.lines[0].en);
 spoken.at(-1).onend();const next=[...timers.values()][0];timers.clear();next();
 assert.equal(commute.getCommuteDialogueState().resumeLine,1);
 const old=spoken.at(-1);commute.stopCommuteDialogue(true);old.onend();assert.equal(timers.size,0);
 commute.playHomeConversation(d.id,'blind_en',true,()=>{});assert.equal(spoken.at(-1).text,d.lines[1].en);
 assert.equal(commute.getCommuteDialogueState().autoAdvance,false);
 const record=JSON.parse(saved.get('eq-commute-dialogue-studio-v1'));assert.equal(record.resumeLine,1);commute.stopCommuteDialogue();
});
