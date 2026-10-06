import fs from 'node:fs';
import {curriculum} from '../dist/curriculum.mjs';
import {UNIFIED_GRADES} from '../dist/curriculum_unified.mjs';
import {points} from '../dist/knowledge_content.mjs';
import {foundations} from '../dist/knowledge_foundations.mjs';
import {grammarTopics} from '../dist/grammar_content.mjs';
import {workshops} from '../dist/lesson_workshops.mjs';

// Structural audit only. Valid answer indices do not prove semantic correctness.
const errors = [], warnings = [], counts = {questions:0};
function walk(value, path) {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value.options) && 'answer' in value) {
    counts.questions++;
    const answers = Array.isArray(value.answer) ? value.answer : [value.answer];
    if (!answers.length || answers.some(i=>!Number.isInteger(i)||i<0||i>=value.options.length)) errors.push(`${path}: invalid answer`);
    if (new Set(value.options.map(x=>JSON.stringify(x))).size!==value.options.length) errors.push(`${path}: duplicate options`);
    if (!(value.explain || value.explanation || value.analysis || value.reason || value.trapExplanation)) warnings.push(`${path}: no standard explanation field`);
  }
  for (const [key, child] of Object.entries(value)) {
    if (typeof child === 'string' && /[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffd]/.test(child)) errors.push(`${path}.${key}: broken character`);
    else if (child && typeof child === 'object') walk(child,`${path}.${key}`);
  }
}
const chapters=curriculum.flatMap(t=>t.chapters);
const units=UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units));
const focused=[...foundations,...points];
for(const p of focused) {
  for(const key of ['goal','prior','rule','trap','task','model']) if(!p[key]?.trim()) errors.push(`${p.id}: missing ${key}`);
  for(const [i,q] of p.questions.entries()) walk({options:q[1],answer:q[2],explanation:q[3]},`${p.id}.questions.${i}`);
}
for(const [name,data] of Object.entries({chapters,units,grammarTopics,workshops,focused})) walk(data,name);
counts.chapters=chapters.length; counts.chapterConcepts=chapters.reduce((n,c)=>n+c.concepts.length,0);
counts.schoolUnits=units.length;counts.schoolConcepts=units.reduce((n,u)=>n+u.concepts.length,0);
counts.focusedLessons=focused.length;counts.grammarTopics=grammarTopics.length;
const banks=[];
for(const name of fs.readdirSync('data/questions').filter(n=>n.endsWith('.json')&&n!=='manifest.json')) {
  const data=JSON.parse(fs.readFileSync(`data/questions/${name}`,'utf8'));
  walk(data,`bank.${name}`);
  if(Array.isArray(data)) {
    const ids=data.map(q=>q.id);
    if(new Set(ids).size!==ids.length)errors.push(`${name}: duplicate IDs`);
    const stems=data.map(q=>JSON.stringify([q.passage,q.prompt,q.options]));
    banks.push({file:name,questions:data.length,duplicateItems:stems.length-new Set(stems).size});
  }
}
const result={scope:'All listed data structurally scanned; not a full semantic certification.',counts,banks,errors,warnings};
fs.writeFileSync(process.argv[2] || 'CONTENT-AUDIT-2026-10-04.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({counts,banks,errors,warnings:warnings.length},null,2));
if(errors.length)process.exitCode=1;
