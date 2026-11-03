import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {WARMUP_BANDS,WARMUP_ITEMS,HOME_REVIEW_KEY,readWarmups,saveWarmup,localDay,renderHomeHero,renderHomeDiscovery,renderConceptPanel} from '../dist/home_experience.mjs';
import {STORAGE_KEYS,exportFullSiteBackup,restoreFullSiteBackup,computeMasteryPassport} from '../dist/mastery_passport.mjs';
import {createGame,createCourse,KEY,isScored} from '../dist/quest/engine.mjs';
import {startQuickLesson,requestedLearningTrack} from '../dist/quest/quickstart.mjs';
import {MASTERCLASS_KEY,MASTERCLASS_TASKS,saveMasterclass,readMasterclass,countEnglishWords,renderMasterclass} from '../dist/masterclass.mjs';
const memory=()=>{const map=new Map();return {getItem:k=>map.get(k)??null,setItem:(k,v)=>map.set(k,v),map};};
function fixture(){
 const course=createCourse(JSON.parse(fs.readFileSync('dist/quest/course/index.json')));
 const store=memory(),game=createGame({storage:store,course});
 const ensure=async files=>{for(const id of files)if(!course.loaded(id))course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${id}.json`)));return true;};
 return {course,game,store,ensure};
}
test('all four warm-up bands have three uniquely keyed questions, balanced answers, explanations and transfer prompts',()=>{
 assert.equal(WARMUP_BANDS.length,4);
 for(const b of WARMUP_BANDS){const items=WARMUP_ITEMS[b.id];assert.equal(items.length,3);assert.deepEqual(items.map(x=>x.answer).sort(),[0,1,2]);for(const it of items){assert.equal(new Set(it.options).size,3);assert.ok(it.why.length>25);assert.ok(it.example&&it.zh&&it.tip&&it.skill);}}
});
test('skips earn no stars, repeat attempts replace the same day and never write game XP',()=>{
 const store=memory(),now=new Date(2026,10,3,23,59);
 assert.equal(saveWarmup('starter',[-1,-1,-1],store,now).correct,0);
 assert.equal(saveWarmup('starter',[0,1,2],store,now).correct,3);
 assert.equal(readWarmups(store).length,1);
 assert.equal(store.getItem(KEY),null);
 saveWarmup('starter',[0,-1,-1],store,now);assert.equal(readWarmups(store)[0].correct,1,'stores latest evidence rather than a manufactured best score');
 saveWarmup('foundation',[1,2,0],store,now);assert.equal(readWarmups(store).length,2);
 assert.equal(localDay(now),'2026-11-03');
 saveWarmup('starter',[0,1,2],store,new Date(2026,10,4,0,1));assert.equal(readWarmups(store).length,3);
});
test('invalid answers, unknown bands, corrupt stores and unavailable storage fail without fabricated success',()=>{
 const store=memory();
 for(const band of ['unknown','__proto__','constructor'])assert.equal(saveWarmup(band,[0,1,2],store),null);
 for(const answers of [[0],[0,1,9],[0,1,1.5],['0',1,2],null])assert.equal(saveWarmup('starter',answers,store),null);
 for(const raw of ['null','[]','{}','broken','{"records":[null,{"band":"unknown"}]}']){store.setItem(HOME_REVIEW_KEY,raw);assert.deepEqual(readWarmups(store),[]);}
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
 assert.equal(saveWarmup('starter',[0,1,2],blocked),null);
 assert.deepEqual(readWarmups(blocked),[]);
});
test('warm-up history is bounded and included in the actual full-site backup',()=>{
 const store=memory();for(let i=1;i<=35;i++)saveWarmup('starter',[0,1,2],store,new Date(2026,9,i));
 assert.equal(readWarmups(store).length,28);assert.ok(STORAGE_KEYS.includes(HOME_REVIEW_KEY));
 const copy=memory();assert.ok(restoreFullSiteBackup(exportFullSiteBackup(store),copy).ok);assert.deepEqual(readWarmups(copy),readWarmups(store));
});
test('homepage offers immediate placement and game, four accessible diagrams and a useful answer reveal',()=>{
 const hero=renderHomeHero();assert.match(hero,/href="quest\/#placement"/);assert.match(hero,/href="quest\/#quickstart"/);assert.match(hero,/id="home-warmup-body"/);assert.match(hero,/暖身不判定程度/);
 const discovery=renderHomeDiscovery();for(const id of ['be','time','sentence','argument']){assert.ok(discovery.includes(`data-home-concept="${id}"`));const panel=renderConceptPanel(id);assert.match(panel,/<caption>/);assert.match(panel,/scope="col"/);assert.match(panel,/scope="row"/);assert.match(panel,/<figcaption>/);assert.match(panel,/<details/);assert.ok(!/undefined|\[object Object\]/.test(panel));}
 const html=fs.readFileSync('dist/index.html','utf8');assert.match(html,/home_experience.css\?v=launch20261103/);assert.match(html,/start.mjs\?v=advanced20261103/);
});
test('one-click entry starts a real scored lesson and awards no XP before completing it',async()=>{
 const {course,game,ensure}=fixture();const result=await startQuickLesson(game,course,ensure);
 assert.equal(result.status,'started');assert.equal(game.state.profile.start,'s1');assert.equal(game.state.session.mode,'lesson');assert.ok(course.item(game.state.session.queue[0]));assert.equal(game.state.xp.total,0);
});
test('one-click entry resumes exact pending answer and preserves profile, XP and settings',async()=>{
 const {course,game,ensure}=fixture();game.setup({goal:'serious',why:'work',start:'s7',autoplay:false});
 await startQuickLesson(game,course,ensure);let guard=20;while(!isScored(game.currentItem())&&guard--)game.next();assert.ok(guard>0);
 game.submit(game.currentItem().answer);const session=JSON.stringify(game.state.session),profile=JSON.stringify(game.state.profile),xp=game.state.xp.total;
 const result=await startQuickLesson(game,course,ensure);assert.equal(result.status,'resumed');assert.equal(JSON.stringify(game.state.session),session);assert.equal(JSON.stringify(game.state.profile),profile);assert.equal(game.state.xp.total,xp);
});
test('failed course loading does not create a phantom session or reward',async()=>{
 const {course,game}=fixture();const result=await startQuickLesson(game,course,async()=>false);assert.equal(result.status,'unavailable');assert.equal(game.state.session,null);assert.equal(game.state.xp.total,0);
});
test('explicit beginner and foundation cards resolve to their selected track without rewriting existing profile',()=>{
 const {course,game}=fixture();game.setup({start:'s7',goal:'serious',why:'work'});
 assert.equal(WARMUP_BANDS.find(b=>b.id==='starter').href,'quest/#learn/s1');assert.equal(WARMUP_BANDS.find(b=>b.id==='foundation').href,'quest/#learn/s3');
 assert.equal(requestedLearningTrack('#learn/s3',course),'s3');assert.equal(requestedLearningTrack('#learn/s1',course),'s1');
 for(const hash of ['#learn/__proto__','#learn/unknown','#exams/s3','#quickstart'])assert.equal(requestedLearningTrack(hash,course),null);
 assert.equal(game.state.profile.start,'s7');
});
test('four advanced production tasks preserve drafts, self-assessment and full-site backup without assigning a CEFR score',()=>{
 assert.equal(MASTERCLASS_TASKS.length,4);for(const task of MASTERCLASS_TASKS){assert.equal(task.criteria.length,4);assert.equal(task.sources.length,2);assert.ok(task.model&&task.focus&&task.target);}
 const store=memory();assert.ok(saveMasterclass('synthesis','My first draft.',[true,false,true],store));
 assert.equal(computeMasteryPassport(store).writingCount,1);assert.equal(computeMasteryPassport(store).skills.find(s=>s.id==='write').href,'#masterclass');
 assert.deepEqual(readMasterclass(store).synthesis.checks,[true,false,true,false]);assert.equal(readMasterclass(store).synthesis.text,'My first draft.');assert.equal(countEnglishWords("It's a well-supported idea. 2026"),4);
 assert.equal(saveMasterclass('__proto__','bad',[],store),false);assert.equal(saveMasterclass('synthesis',null,[],store),false);
 assert.ok(STORAGE_KEYS.includes(MASTERCLASS_KEY));const restored=memory();assert.ok(restoreFullSiteBackup(exportFullSiteBackup(store),restored).ok);assert.deepEqual(readMasterclass(restored),readMasterclass(store));
 assert.equal(store.getItem(KEY),null);assert.equal(saveMasterclass('synthesis','x',[],{setItem(){throw Error('quota');}}),false);
});
test('advanced draft HTML is escaped and the evaluation boundary is visible',()=>{
 const store=memory();saveMasterclass('synthesis','</textarea><img src=x onerror=alert(1)>',[true],store);globalThis.localStorage=store;
 try{const html=renderMasterclass();assert.ok(!html.includes('<img src=x'));assert.match(html,/&lt;\/textarea&gt;/);assert.match(html,/非完整 C2 課程或認證測驗/);assert.match(html,/自評/);assert.match(html,/data-masterclass-save/);}finally{delete globalThis.localStorage;}
 const entry=fs.readFileSync('dist/app.js','utf8');assert.match(entry,/parts\[0\] === 'masterclass'/);assert.match(entry,/masterclass:renderMasterclass/);assert.match(entry,/bindMasterclass\(root\)/);
});
