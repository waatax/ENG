import fs from 'node:fs';
import assert from 'node:assert/strict';
import '../data/exams/toeic.mjs';
import '../data/exams/sat.mjs';
import '../data/exams/gre.mjs';
import '../data/exams/gmat.mjs';
import {items as originals} from '../data/exams/authoring.mjs';
import {EXAMS,TIERS} from '../dist/quest/exams.mjs';
import {questionKey} from '../dist/quest/question_quality.mjs';
const items=[...originals],seen=new Set(items.map(questionKey));
for(const exam of EXAMS){
 const source=JSON.parse(fs.readFileSync(`dist/questions/${exam.id}.json`));
 for(const q of source){
  let skill=exam.id==='toeic'?/Part [56]/.test(q.subtopic)?'language':'reading':exam.id==='sat'?/Craft/.test(q.subtopic)?'craft':/Information/.test(q.subtopic)?'information':/Standard/.test(q.subtopic)?'conventions':'expression':exam.id==='gre'?/Sentence Equivalence/.test(q.subtopic)?'equivalence':/Text Completion/.test(q.subtopic)?'completion':'reading':/Critical Reasoning/.test(q.subtopic)?'critical':'reading';
  const multi=q.selectCount===2,correct=multi?q.answer.map(i=>q.options[i]):null,answer=multi?correct.join(' || '):q.options[q.answer];
  if(!answer||!q.explain||!q.options||new Set(q.options).size!==q.options.length)continue;
  const row={id:'exam-import-'+q.id,family:'exam-import-'+q.id,exam:exam.id,tier:exam.id==='toeic'?(q.difficulty<=2?'low':q.difficulty>=4?'high':'mid'):'high',skill,partition:'practice',form:'P',kind:'drill',type:multi?'multi':'choice',prompt:q.prompt,passage:q.passage||'',options:q.options,answer,why:q.explain,...(multi?{correctAnswers:correct,selectCount:2}:{}),level:3,src:'quest/#exams',sourceId:q.id,original:false};
  const key=questionKey(row);if(seen.has(key))continue;seen.add(key);items.push(row);
 }
}
const report={version:'exams20261027',original:originals.length,integrated:items.length-originals.length,total:items.length,campaigns:[]};
for(const exam of EXAMS)for(const tier of TIERS){
 const rows=items.filter(q=>q.exam===exam.id&&q.tier===tier.id);
 const skills=exam.skills.map(([id,title])=>{const q=rows.filter(q=>q.skill===id);return{id,title,practice:q.filter(q=>q.partition==='practice').length,A:q.filter(q=>q.form==='A').length,B:q.filter(q=>q.form==='B').length};});
 assert.ok(skills.every(s=>s.practice>=4&&s.A>=4&&s.B>=4),exam.id+tier.id);
 report.campaigns.push({key:exam.id+':'+tier.id,target:exam.targets[TIERS.indexOf(tier)],skills,total:rows.length});
}
for(const q of items){assert.ok(q.why.length>=7,q.id);assert.ok(q.options.length>=4,q.id);assert.ok(q.options.includes(q.type==='multi'?q.correctAnswers[0]:q.answer),q.id);}
const bank={examBank:{version:report.version,campaigns:report.campaigns},items};
for(const root of ['dist','site/dist']){fs.writeFileSync(root+'/quest/course/exams.json',JSON.stringify(bank)+'\n');}
fs.mkdirSync('docs/redesign/verification/exams20261027',{recursive:true});fs.writeFileSync('docs/redesign/verification/exams20261027/bank-audit.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
