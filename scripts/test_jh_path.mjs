import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JH_TARGETS,JH_TERMS,JH_PATH_KEY,readJhPath,jhPhase,recommendJhTarget,submitJhAnswer,recordJhExam,renderJhPath} from '../dist/jh_path.mjs';
import {exportFullSiteBackup,restoreFullSiteBackup} from '../dist/mastery_passport.mjs';
import {createCourse} from '../dist/quest/engine.mjs';
import {requestedLearningTrack} from '../dist/quest/quickstart.mjs';

const base = Date.UTC(2026,10,26,0), day = 86_400_000;
const memory = () => {
  const data = new Map();
  return {getItem:key => data.get(key) ?? null,setItem:(key,value) => data.set(key,value)};
};

test('six terms cover all sixteen JH themes with distinct, explained variants and outputs', () => {
  assert.equal(JH_TERMS.length,6);
  assert.equal(JH_TARGETS.length,16);
  assert.equal(new Set(JH_TARGETS.map(target => target.id)).size,16);
  const contexts = new Set();
  for (const term of JH_TERMS) assert.ok(JH_TARGETS.some(target => target.term === term.id),term.id);
  for (const target of JH_TARGETS) {
    assert.ok(target.focus && target.rule && target.output && target.example,target.id);
    assert.equal(target.practice.listening,target.transfer.listening);
    for (const task of [target.practice,target.transfer]) {
      assert.ok(!contexts.has(task.text),task.text);
      contexts.add(task.text);
      assert.equal(new Set(task.options.map(([answer]) => answer)).size,3);
      assert.ok(task.options.every(([answer,why]) => answer && why.length > 5),target.id);
    }
  }
  assert.equal(contexts.size,32);
});

test('correction leads to an alternate item after a day, with duplicate or early transfer rejected', () => {
  const store = memory(), key = 'english-1';
  assert.equal(submitJhAnswer(store,key,'transfer',0,false,base),null);
  const wrong = submitJhAnswer(store,key,'practice',1,false,base);
  assert.equal(wrong.correct,false);
  assert.equal(jhPhase(wrong.record,base),'practice');
  assert.equal(recommendJhTarget(readJhPath(store),'j1a',base).id,key);
  const repaired = submitJhAnswer(store,key,'practice',0,false,base);
  assert.equal(repaired.record.readyAt,base+day);
  assert.equal(jhPhase(repaired.record,base),'wait');
  assert.equal(submitJhAnswer(store,key,'transfer',0,false,base+day-1),null);
  assert.doesNotMatch(renderJhPath(store,base),/Our school bus/);
  assert.match(renderJhPath(store,base+day),/Our school bus/);
  const transfer = submitJhAnswer(store,key,'transfer',0,false,base+day);
  assert.equal(transfer.record.first,'correct');
  assert.equal(submitJhAnswer(store,key,'transfer',0,false,base+day),null);
  assert.equal(jhPhase(readJhPath(store).units[key],base+day),'wait');
});

test('a later correct answer never rewrites a first assisted or incorrect transfer', () => {
  for (const [pick,assisted,first] of [[0,true,'assisted'],[1,false,'incorrect']]) {
    const store = memory(), key = 'english-2';
    submitJhAnswer(store,key,'practice',0,false,base);
    const initial = submitJhAnswer(store,key,'transfer',pick,assisted,base+day);
    assert.equal(initial.record.first,first);
    const review = submitJhAnswer(store,key,'transfer',0,false,base+2*day);
    assert.equal(review.record.first,first);
    assert.equal(review.record.last,0);
    assert.equal(review.record.review.days,3);
  }
});

test('exam practice totals are validated, separated by goal, escaped, and backed up with skill evidence', () => {
  const store = memory(), entry = {goal:'cap',label:'<strong>Practice</strong>',listen:10,listenTotal:21,read:30,readTotal:43,at:base};
  assert.equal(recordJhExam(store,{...entry,listen:22}),false);
  assert.equal(recordJhExam(store,{...entry,goal:'school'}),false);
  const initial = readJhPath(store);
  store.setItem(JH_PATH_KEY,JSON.stringify({...initial,goal:'cap'}));
  assert.equal(recordJhExam(store,entry),true);
  assert.equal(recordJhExam(store,{...entry,label:'GEPT sample',goal:'gept'}),true);
  submitJhAnswer(store,'english-1','practice',0,false,base);
  const html = renderJhPath(store,base);
  assert.match(html,/&lt;strong&gt;Practice&lt;\/strong&gt;/);
  assert.match(html,/聽力 10\/21/);
  assert.doesNotMatch(html,/GEPT sample|A\+\+/);
  const restored = memory();
  assert.equal(restoreFullSiteBackup(exportFullSiteBackup(store),restored).ok,true);
  assert.deepEqual(readJhPath(restored),readJhPath(store));
  const blocked = {getItem:() => 'null',setItem() {throw new Error('blocked');}};
  assert.equal(submitJhAnswer(blocked,'english-1','practice',0,false,base).saved,false);
});

test('direct Quest links select every school term and reject unrelated branch links', () => {
  const course = createCourse(JSON.parse(readFileSync('dist/quest/course/index.json','utf8')));
  for (const term of JH_TERMS) assert.equal(requestedLearningTrack(`#learn/sem-${term.id}`,course),`sem-${term.id}`);
  assert.equal(requestedLearningTrack('#learn/s1',course),'s1');
  assert.equal(requestedLearningTrack('#learn/b-cap',course),null);
  assert.equal(requestedLearningTrack('#school/sem-j1a',course),null);
});
