import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {UNIFIED_GRADES} from '../dist/curriculum_unified.mjs';
import {QuestionBankDB} from '../dist/question_db.mjs';

test('All 107 school concepts have unambiguous examples', () => {
  const concepts=UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units.flatMap(u=>u.concepts)));
  assert.equal(concepts.length,107);
  for(const c of concepts){
    const q=c.examExample;
    assert.ok(q,`${c.title}: missing example`);
    assert.equal(new Set(q.options).size,q.options.length,`${c.title}: repeated choices`);
    assert.ok(q.options[q.answer],`${c.title}: invalid key`);
    assert.ok(q.analysis.length>20,`${c.title}: missing reasoning`);
  }
});

test('Question sampling never pads a category with duplicates or silently changes filters', async () => {
  const db=new QuestionBankDB();
  db.loadedCategories.add('sat');
  db.pools.sat=[
    {id:'one',subtopic:'Vocabulary',prompt:'A?',options:['x','y'],answer:0},
    {id:'two',subtopic:'Vocabulary',prompt:'A?',options:['x','y'],answer:0},
    {id:'three',subtopic:'Vocabulary',prompt:'B?',options:['x','y'],answer:1}
  ];
  assert.equal((await db.sampleQuestions('sat',10,'Vocabulary')).length,2);
  assert.deepEqual(await db.sampleQuestions('sat',10,'Missing topic'),[]);
});

test('Practice bank does not present unverified official source labels', () => {
  const items=JSON.parse(fs.readFileSync('data/questions/gaokao.json','utf8'));
  assert.equal(items.length,6000);
  assert.ok(items.every(q=>!q.source&&!q.exam_year&&q.categoryLabel==='高考方向原創練習'));
  const app=fs.readFileSync('dist/app.js','utf8');
  assert.ok(app.includes('482 道不同題面'));
  assert.ok(app.includes('此分類只有 ${qs.length} 道不同題面'));
});

test('Preview and site assets are identical for edited learning routes', () => {
  for(const name of ['app.js','knowledge.mjs','lesson_pages.mjs','curriculum_unified.mjs','question_db.mjs','learning_layout.css','questions/gaokao.json','questions/manifest.json']) {
    assert.equal(fs.readFileSync('dist/'+name).compare(fs.readFileSync('site/dist/'+name)),0,name);
  }
});
