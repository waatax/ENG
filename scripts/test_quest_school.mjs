import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCourse, createGame, isScored, accepts, KEY } from '../dist/quest/engine.mjs';
import { SEMESTERS, SCHOOL_ITEMS, schoolFiles, SCHOOL_SKILLS } from '../dist/quest/school.mjs';
import { PERFORMANCES, CONTENTS } from '../dist/curriculum_standards.mjs';
const index=JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const memory=()=>{const m=new Map();return{getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
function course(files=index.sections.map(s=>s.id)) {const c=createCourse(index);for(const id of files)c.register(JSON.parse(fs.readFileSync(`dist/quest/course/${id}.json`)));return c;}
function play(g,wrong=false) {let guard=80;while(g.state.session&&guard--){const q=g.currentItem();if(isScored(q)&&!g.state.session.feedback){if(q.type==='listen'||q.type==='input'&&q.audio&&!q.text)g.heard();g.submit(wrong?'wrong-answer':q.type==='match'?'matched':q.answer);}g.next();}assert.ok(guard>0);return g.result;}

test('school route has exactly six semesters per stage and preserves source module ownership',()=>{
 const c=course();assert.equal(SEMESTERS.length,12);assert.equal(SEMESTERS.filter(s=>s.group==='junior').length,6);assert.equal(SEMESTERS.filter(s=>s.group==='senior').length,6);
 assert.equal(new Set(SEMESTERS.map(s=>s.id)).size,12);
 for(const s of SEMESTERS){assert.equal(s.goals.length,4);assert.equal(s.rubric.length,4);assert.ok(s.prerequisite&&s.project&&s.model);assert.ok(s.modules.length>=2);for(const uid of s.modules){assert.ok(c.units.has(uid),uid);assert.equal(c.units.get(uid).track.startsWith('s'),true);}}
 const seniorFinal=SEMESTERS.filter(s=>s.id.startsWith('h3'));
 assert.ok(seniorFinal.every(s=>!s.modules.includes('g12-s1-u6')&&!s.modules.includes('g12-s1-u5')&&!s.modules.includes('g12-s2-u8')));
});
test('every semester maps real 108 performance and content codes from the correct learning stage',()=>{
 for(const s of SEMESTERS){const stage=s.group==='junior'?'Ⅳ':'Ⅴ';for(const code of s.codes){const item=PERFORMANCES.find(x=>x.track==='general'&&x.code===code);assert.ok(item,code);assert.equal(item.stage,stage);}for(const code of s.contentCodes){const item=CONTENTS.find(x=>x.track==='general'&&x.code===code);assert.ok(item,code);assert.equal(item.stage,stage);}for(const cat of [1,2,3,4,5,6])assert.ok(s.codes.some(x=>x.startsWith(cat+'-')),s.id+' skill '+cat);}
});
test('72 original scored items and 12 mentor cards are usable, explained and distinct',()=>{
 const scored=SCHOOL_ITEMS.filter(isScored);assert.equal(scored.length,72);assert.equal(SCHOOL_ITEMS.length,84);assert.equal(new Set(SCHOOL_ITEMS.map(x=>x.id)).size,84);
 for(const s of SEMESTERS){const own=scored.filter(x=>x.school===s.id);assert.equal(own.length,6);assert.deepEqual([...new Set(own.map(x=>x.domain))].sort(),['listen','read','use','word']);}
 for(const q of scored){assert.ok(q.why.length>15,q.id);assert.equal(accepts(q,q.answer),true);if(q.options){assert.ok(q.options.includes(q.answer));assert.equal(new Set(q.options).size,q.options.length);}if(q.type==='build')for(const word of q.answer.toLowerCase().split(/\s+/))assert.ok(q.words.map(x=>x.toLowerCase()).includes(word),q.id);}
});
test('every semester has five playable nodes, includes its new anchors, and can load only its own dependencies',()=>{
 for(const s of SEMESTERS){const c=course(schoolFiles(s.id,index)),g=createGame({course:c,storage:memory()});assert.equal(g.trackUnlocked('sem-'+s.id),true);
  for(const [skill] of SCHOOL_SKILLS){const id=`sem-${s.id}:${skill}`,node=c.nodes.get(id);assert.equal(g.nodeStatus(id),'available');assert.deepEqual(g.filesFor(skill==='boss'?'boss':'lesson',id),schoolFiles(s.id,index));assert.ok(node.pool.length>=10);assert.equal(g.start(skill==='boss'?'boss':'lesson',id),true);assert.ok(g.state.session.queue.some(id=>c.item(id).school===s.id&&c.item(id).domain===skill)||skill==='boss');const r=play(g);assert.equal(r.passed,true);assert.ok(g.state.nodes[id].n>0);}
  assert.ok(g.state.crowns[`sem-${s.id}-unit`]);assert.ok(g.state.review[`sem-${s.id}-unit`]);
 }
});
test('failed semester challenges award no crown; fresh challenge can pass without completing old main-path nodes',()=>{
 const c=course(),g=createGame({course:c,storage:memory()});g.start('boss','sem-h3b:boss');assert.equal(play(g,true).passed,false);assert.equal(g.state.crowns['sem-h3b-unit'],undefined);
 assert.equal(g.nodeStatus('sem-h3b:word'),'available');g.start('boss','sem-h3b:boss');assert.equal(play(g).passed,true);assert.equal(g.state.nodes['g12-s2-u9:word'],undefined);
});
test('semester progress resumes, review and mixed practice use real source files',()=>{
 const c=course(),storage=memory();let g=createGame({course:c,storage});g.setup({goal:'regular',start:'sem-j2b'});g.start('lesson','sem-j2b:read');g.submit(g.currentItem().answer);
 g=createGame({course:course(schoolFiles('j2b',index)),storage});assert.equal(g.validSession(),true);assert.equal(g.state.profile.start,'sem-j2b');play(g);
 assert.deepEqual(g.filesFor('practice'),schoolFiles('j2b',index));assert.deepEqual(g.filesFor('review','sem-j2b-unit'),schoolFiles('j2b',index));assert.equal(g.start('practice'),true);play(g);
});
test('portfolio drafts and evidence checks round-trip without awarding XP or asserting proficiency',()=>{
 const storage=memory(),c=course();let g=createGame({course:c,storage});assert.equal(g.saveSchoolWork('unknown','x',[]),false);assert.equal(g.saveSchoolWork('h3b','<script>draft</script>',[true,false,true,true]),true);
 assert.equal(g.state.xp.total,0);assert.equal(Object.keys(g.state.crowns).length,0);assert.equal(g.state.days.length,0);
 const backup=g.export();g=createGame({course:c,storage});assert.equal(g.state.schoolWork.h3b.text,'<script>draft</script>');assert.equal(g.restore(backup),true);assert.deepEqual(g.state.schoolWork.h3b.checks,[true,false,true,true]);
 g.saveSchoolWork('j1a','x'.repeat(7000),[true,true,true,true,true]);assert.equal(g.state.schoolWork.j1a.text.length,6000);assert.equal(g.state.schoolWork.j1a.checks.length,4);
 const old=JSON.parse(g.export());delete old.schoolWork;storage.setItem(KEY,JSON.stringify(old));g=createGame({course:c,storage});assert.deepEqual(g.state.schoolWork,{});
});


test('unheard or transcript-only semester listening cannot earn a perfect score or semester crown',()=>{
 for(const textMode of [false,true]) {
 const c=course(),g=createGame({course:c,storage:memory()});g.start('boss','sem-h3b:boss');
 while(g.state.session){const q=g.currentItem();if(isScored(q)&&!g.state.session.feedback){if(textMode&&(q.type==='listen'||q.type==='input'&&q.audio&&!q.text))g.transcript();g.submit(q.type==='match'?'matched':q.answer);}g.next();}
 assert.equal(g.result.passed,false);assert.equal(g.result.perfect,false);assert.equal(g.result.audioPending,true);assert.equal(g.state.crowns['sem-h3b-unit'],undefined);
 g.start('boss','sem-h3b:boss');assert.equal(play(g).passed,true);
 }
});


test('a semester cannot silently shrink to only its anchor questions when source content is missing',()=>{
 const c=course([]),g=createGame({course:c,storage:memory()});assert.equal(g.start('lesson','sem-j1a:word'),false);assert.equal(g.start('boss','sem-j1a:boss'),false);
 for(const id of schoolFiles('j1a',index))c.register(JSON.parse(fs.readFileSync(`dist/quest/course/${id}.json`)));
 assert.equal(g.start('boss','sem-j1a:boss'),true);assert.equal(g.state.session.queue.length,12);
});
