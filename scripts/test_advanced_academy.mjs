import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {ADVANCED_UNITS,RUBRIC} from '../dist/advanced_content.mjs';
import {ADVANCED_KEY,readAdvanced,patchAdvanced,optionOrders,startAdvancedAttempt,recordAdvancedAnswer,annotateAdvancedAudio,attemptScore,saveAdvancedDraft,scheduleAdvancedReview,advancedSummary} from '../dist/advanced_progress.mjs';
import {renderAdvancedCourse} from '../dist/advanced_academy.mjs';
import {MASTERCLASS_KEY} from '../dist/masterclass.mjs';
import {STORAGE_KEYS,exportFullSiteBackup,restoreFullSiteBackup,computeMasteryPassport} from '../dist/mastery_passport.mjs';
const memory=()=>{const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),data};};
function complete(store,u,form='practice',answers=u[form==='transfer'?'transfer':'checks'].map(q=>q.answer),audio={},now=1){
 const run=startAdvancedAttempt(u.id,form,store,audio,now);assert.ok(run);let result;
 for(let i=0;i<3;i++)result=recordAdvancedAnswer(u.id,run.id,i,answers[i],store);
 assert.ok(result);return result;
}
function writeBoth(store,id){assert.ok(saveAdvancedDraft(id,'This first draft states a limited claim.','initial','',[],store,100).ok);assert.ok(saveAdvancedDraft(id,'This revised draft states a limited claim and explains the evidence.','revision','補充證據限制並重組段落。',[3,3,2,3],store,200).ok);}
test('8 coherent units contain 48 distinct original questions, grounded teaching and all four rubric dimensions',()=>{
 assert.equal(ADVANCED_UNITS.length,8);assert.equal(RUBRIC.length,4);const keys=new Set();
 for(const u of ADVANCED_UNITS){assert.equal(u.lesson.length,2);assert.equal(u.diagram.length,3);assert.equal(u.table.length,3);assert.equal(u.criteria.length,4);assert.equal(u.sources.length,2);assert.ok(u.canDo&&u.target&&u.model&&u.focus&&u.steps.length===3);
  for(const form of ['checks','transfer']){assert.equal(u[form].length,3);for(const q of u[form]){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert.ok(q.options[q.answer]);assert.ok(q.why.length>20);keys.add(q.prompt+q.options.join('|'));}}
 }
 assert.equal(keys.size,48);assert.ok(ADVANCED_UNITS.find(u=>u.listening).transferSources.length===2);for(const d of RUBRIC)assert.equal(d.levels.length,4);
});
test('shuffling changes order but preserves every answer index',()=>{for(const random of [()=>0,()=>.99,Math.random])for(const order of optionOrders(random))assert.deepEqual([...order].sort(),[0,1,2]);});
test('partial attempts resume exactly; stale clicks cannot answer the next item or replace an active form',()=>{
 const store=memory(),u=ADVANCED_UNITS[0],run=startAdvancedAttempt(u.id,'practice',store,{},1);
 assert.ok(recordAdvancedAnswer(u.id,run.id,0,u.checks[0].answer,store));assert.equal(recordAdvancedAnswer(u.id,run.id,0,0,store),null);
 assert.equal(recordAdvancedAnswer(u.id,'stale',1,0,store),null);assert.equal(startAdvancedAttempt(u.id,'transfer',store),null);
 assert.deepEqual(startAdvancedAttempt(u.id,'practice',store),readAdvanced(store).units[u.id].active);
 assert.equal(advancedSummary(store).checks,0);
});
test('all forms score original option indices; skips are wrong and repetition never creates quest XP',()=>{
 const store=memory();for(const u of ADVANCED_UNITS){for(const form of ['practice','transfer']){const a=complete(store,u,form);assert.equal(attemptScore(u.id,a),3);}const skipped=complete(store,u,'practice',[-1,-1,-1]);assert.equal(attemptScore(u.id,skipped),0);}
 assert.equal(store.getItem('english-quest-game-v2'),null);assert.equal(advancedSummary(store).checks,8);assert.equal(advancedSummary(store).loops,0);
});
test('audio completion and opening transcript are recorded independently and cannot be erased by hiding text',()=>{
 const store=memory(),id='listening',run=startAdvancedAttempt(id,'practice',store);
 assert.ok(annotateAdvancedAudio(id,run.id,{heard:true},store));assert.ok(annotateAdvancedAudio(id,run.id,{transcript:true},store));assert.ok(annotateAdvancedAudio(id,run.id,{transcript:false,heard:false},store));
 const active=readAdvanced(store).units[id].active;assert.ok(active.heard&&active.transcript);assert.equal(annotateAdvancedAudio(id,'stale',{heard:true},store),false);
});
test('initial draft is immutable, revision requires real changes and reason plus four self-ratings',()=>{
 const store=memory(),id='synthesis',first='This first draft uses carefully limited evidence.';
 assert.equal(saveAdvancedDraft(id,'','initial','',[],store).ok,false);assert.ok(saveAdvancedDraft(id,first,'initial','',[],store).ok);
 assert.equal(saveAdvancedDraft(id,'A different draft is not allowed to replace the original.','initial','',[],store).ok,false);
 for(const [text,note,rs] of [[first,'理由應夠長且清楚',[3,3,3,3]],[first+' More.','short',[3,3,3,3]],[first+' More.','補充來源限制並修正語氣',[0,3,3,3]]])assert.equal(saveAdvancedDraft(id,text,'revision',note,rs,store).ok,false);
 assert.ok(saveAdvancedDraft(id,first+' More evidence is explained.','revision','補充來源限制並修正語氣',[3,3,3,3],store).ok);assert.equal(readAdvanced(store).units[id].initial.text,first);
 for(let i=0;i<6;i++)assert.ok(saveAdvancedDraft(id,first+` Revision number ${i}.`,'revision','調整論證順序並補充限制',[3,3,3,3],store).ok);
 assert.equal(readAdvanced(store).units[id].history.length,3);
});
test('learning-loop badges require reading, completed checks and a revised portfolio rather than clicks alone',()=>{
 const store=memory();for(const u of ADVANCED_UNITS){patchAdvanced(u.id,{read:true},store);writeBoth(store,u.id);}assert.equal(advancedSummary(store).loops,0);
 for(const u of ADVANCED_UNITS)complete(store,u);assert.equal(advancedSummary(store).loops,8);assert.equal(advancedSummary(store).revised,8);
});
test('review cannot advance without recent transfer evidence and a revision; same-day clicks cannot inflate spacing',()=>{
 const store=memory(),u=ADVANCED_UNITS[0],now=1_000_000;
 assert.equal(scheduleAdvancedReview(u.id,'good',store,now),null);assert.equal(scheduleAdvancedReview(u.id,'again',store,now).days,1);
 writeBoth(store,u.id);complete(store,u,'transfer');assert.equal(scheduleAdvancedReview(u.id,'good',store,now+100).days,1);
 const later=scheduleAdvancedReview(u.id,'good',store,now+86400000+100);assert.equal(later.days,3);
 complete(store,u,'transfer',[-1,-1,-1]);assert.equal(scheduleAdvancedReview(u.id,'easy',store,now+2*86400000),null);assert.equal(scheduleAdvancedReview(u.id,'again',store,now+2*86400000).days,1);
 assert.equal(advancedSummary(store,now+4*86400000).due,1);
});
test('old and new portfolio evidence deduplicates by project and round-trips through the existing backup',()=>{
 const store=memory();store.setItem(MASTERCLASS_KEY,JSON.stringify({synthesis:{text:'Original legacy draft.'}}));writeBoth(store,'synthesis');writeBoth(store,'mediation');
 const passport=computeMasteryPassport(store);assert.equal(passport.writingCount,2);assert.equal(passport.skills.find(s=>s.id==='write').href,'#advanced');assert.ok(STORAGE_KEYS.includes(ADVANCED_KEY));
 const next=memory();assert.ok(restoreFullSiteBackup(exportFullSiteBackup(store),next).ok);assert.deepEqual(readAdvanced(next),readAdvanced(store));assert.equal(next.getItem(MASTERCLASS_KEY),store.getItem(MASTERCLASS_KEY));
});
test('corrupt state and blocked storage do not fabricate completion or overwrite unreadable stores',()=>{
 const store=memory();for(const value of ['broken','null','[]','{"units":{"__proto__":{"read":true},"synthesis":{"revision":{"text":"forged"},"attempts":[{"answers":[9,9,9]}]}}}']){store.setItem(ADVANCED_KEY,value);assert.equal(advancedSummary(store).loops,0);assert.equal(advancedSummary(store).checks,0);}
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('quota');}};assert.equal(patchAdvanced('synthesis',{read:true},blocked),false);assert.equal(startAdvancedAttempt('synthesis','practice',blocked),null);
 assert.equal(patchAdvanced('__proto__',{read:true},store),false);assert.equal(startAdvancedAttempt('synthesis','unknown',store),null);
});
test('attempt history stays bounded and has no invented success when storage fails',()=>{
 const store=memory(),u=ADVANCED_UNITS[0];for(let i=0;i<12;i++)complete(store,u,'practice',undefined,{},i);assert.equal(readAdvanced(store).units[u.id].attempts.length,8);
 const fail={getItem:k=>store.getItem(k),setItem(){throw Error('quota');}};assert.equal(startAdvancedAttempt(u.id,'practice',fail),null);
});
test('course screens render all units, semantic tables, hidden listening scripts and safe imported drafts',()=>{
 const store=memory();store.setItem(MASTERCLASS_KEY,JSON.stringify({synthesis:{text:'</textarea><img src=x onerror=alert(1)>'}}));globalThis.localStorage=store;
 try{
  const dashboard=renderAdvancedCourse('#advanced');assert.match(dashboard,/48/);assert.match(dashboard,/<meter/);assert.match(dashboard,/不是完整 C2 認證課程/);
  for(const u of ADVANCED_UNITS){for(const stage of ['learn','practice','write','review']){const html=renderAdvancedCourse(`#advanced/${u.id}/${stage}`);assert.ok(!/undefined|\[object Object\]/.test(html));assert.match(html,/aria-label="本單元四步學習"/);}assert.match(renderAdvancedCourse(`#advanced/${u.id}/learn`),/<caption>/);}
  const listening=renderAdvancedCourse('#advanced/listening/practice');assert.ok(!listening.includes('The remote-work pilot reduced commuting time'));assert.match(listening,/逐字稿已隱藏/);
  const editor=renderAdvancedCourse('#advanced/synthesis/write');assert.ok(editor.includes('&lt;/textarea&gt;'));assert.ok(!editor.includes('<img src=x'));
  const run=startAdvancedAttempt('synthesis','practice',store);const raw=JSON.parse(store.getItem(ADVANCED_KEY));raw.units.synthesis.active.id='x" onmouseover="bad';store.setItem(ADVANCED_KEY,JSON.stringify(raw));assert.ok(!renderAdvancedCourse('#advanced/synthesis/practice').includes('data-run="x" onmouseover='));
 }finally{delete globalThis.localStorage;}
 const start=fs.readFileSync('dist/start.mjs','utf8');assert.match(start,/page==='advanced'/);assert.match(start,/import\('\.\/advanced_academy/);assert.match(fs.readFileSync('dist/index.html','utf8'),/advanced_academy.css/);
});
