import test from 'node:test';
import assert from 'node:assert/strict';
const stored=new Map(),spoken=[],timers=new Map();let serial=0;
globalThis.localStorage={getItem:k=>stored.get(k)||null,setItem:(k,v)=>stored.set(k,v)};
globalThis.document={querySelector:()=>null,querySelectorAll:()=>[]};
globalThis.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
globalThis.window={speechSynthesis:{getVoices:()=>[{name:'US',lang:'en-US'},{name:'TW',lang:'zh-TW'}],speak:u=>spoken.push(u),cancel(){}}};
globalThis.setTimeout=(fn,ms)=>{timers.set(++serial,{fn,ms});return serial;};globalThis.clearTimeout=id=>timers.delete(id);
const c=await import('../dist/commute_dialogues.mjs');
const p=await import('../dist/conversation_practice.mjs');
const h=await import('../dist/conversation_home.mjs');
test('Every retrieval line gives Chinese before English and enough time to answer',()=>{
 for(const d of c.ALL_COMMUTE_DIALOGUES){
  spoken.length=0;timers.clear();c.playHomeConversation(d.id,'retrieval',false,()=>{});
  for(const line of d.lines){
   assert.equal(spoken.at(-1).text,'請用英文表達：'+line.zh);
   spoken.at(-1).onend();let [id,t]=[...timers][0];assert.ok(t.ms>=3000);assert.match(c.getCommuteDialogueState().activePhaseLabel,/輪你開口/);timers.delete(id);t.fn();
   assert.equal(spoken.at(-1).text,line.en);spoken.at(-1).onend();[id,t]=[...timers][0];timers.delete(id);t.fn();
  }
  assert.equal(spoken.at(-1).text,d.recallPrompt);c.stopCommuteDialogue();
 }
});
test('Stopping during recall cancels the answer; resume repeats the prompt',()=>{
 const d=c.ALL_COMMUTE_DIALOGUES[0];spoken.length=0;c.playHomeConversation(d.id,'retrieval',false,()=>{});spoken.at(-1).onend();
 const stale=[...timers.values()][0];c.stopCommuteDialogue();stale.fn();assert.equal(spoken.length,1);
 c.playHomeConversation(d.id,'retrieval',true,()=>{});assert.equal(spoken.at(-1).text,'請用英文表達：'+d.lines[0].zh);c.stopCommuteDialogue();
});
test('Longer and slower sentences receive longer bounded speaking time',()=>{
 assert.ok(c.speakingGapMs('a '.repeat(20))>c.speakingGapMs('Hi'));
 assert.ok(c.speakingGapMs('a '.repeat(20),3,.7)>c.speakingGapMs('a '.repeat(20),3,1));
 assert.equal(c.speakingGapMs('a '.repeat(200)),30000);
});
test('Self assessment schedules separate per-lesson reviews without marking listened completion',()=>{
 const before=[...c.getCommuteDialogueState().completedIds];
 assert.equal(p.savePractice('one','again',1000),true);p.savePractice('two','independent',1000);
 assert.equal(p.readPractice().one.reviewAt,86401000);assert.equal(p.readPractice().two.reviewAt,604801000);
 assert.equal(p.duePractice(p.readPractice().one,86400999),false);assert.equal(p.duePractice(p.readPractice().one,86401000),true);
 assert.deepEqual(c.getCommuteDialogueState().completedIds,before);assert.equal(p.savePractice('one','bad'),false);
});
test('Corrupt or unavailable storage remains usable and reports save failure',()=>{
 stored.set('eq-conversation-practice-v1','broken');assert.deepEqual(p.readPractice(),{});
 const original=localStorage.setItem;localStorage.setItem=()=>{throw Error('blocked');};assert.equal(p.savePractice('x','again'),false);localStorage.setItem=original;
});
test('Home stage actions expose teaching and retrieval and due filter isolates scheduled lessons',()=>{
 const d=c.ALL_COMMUTE_DIALOGUES[0];h.handleHomeConversationClick({dataset:{homeStage:'teaching',homeId:d.id}},()=>{});assert.equal(c.getCommuteDialogueState().playMode,'teaching');c.stopCommuteDialogue();
 p.savePractice(d.id,'again',0);let html='';document.getElementById=()=>({set innerHTML(v){html=v;}});
 h.handleHomeConversationInput({id:'home-conversation-progress',value:'到期複習'});assert.match(html,/找到 1 篇/);
 assert.match(h.homeConversations(),/data-home-stage="retrieval"/);
});
