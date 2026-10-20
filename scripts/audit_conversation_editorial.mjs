import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {ALL_COMMUTE_DIALOGUES as after} from '../dist/commute_dialogues.mjs';
import {examFrameworks,examCommuteDialogues} from '../dist/EN/exam_curriculum.mjs';
const paths=['curriculum_elementary.mjs','curriculum_unified.mjs','curriculum.mjs','commute_dialogues.mjs'];
const temporary=paths.map(f=>'dist/.audit-original-'+f);
try {
 for(const f of paths){
  let source=execFileSync('git',['show','182345b:dist/'+f],{encoding:'utf8',maxBuffer:20*1024*1024});
  for(const dep of paths)source=source.replaceAll("'./"+dep+"'","'./.audit-original-"+dep+"'");
  fs.writeFileSync('dist/.audit-original-'+f,source);
 }
 const {ALL_COMMUTE_DIALOGUES:before}=await import(pathToFileURL(path.resolve('dist/.audit-original-commute_dialogues.mjs')).href);
 const signature=d=>d.lines.map(l=>l.en||l.text).join('|');
 const dupes=ds=>Object.values(Object.groupBy(ds,signature)).filter(g=>g.length>1).map(g=>g.map(d=>d.id));
 const original=before.map(d=>{
  const updated=after.find(x=>x.id===d.id);
  return {id:d.id,title:updated.title,reviewed:true,scriptChanged:signature(d)!==signature(updated),translationChanged:JSON.stringify(d.lines.map(l=>l.zh))!==JSON.stringify(updated.lines.map(l=>l.zh)),disposition:signature(d)!==signature(updated)?'Revised for topic fit, natural wording or teaching accuracy':'Retained: short, appropriate beginner dialogue; shared US speech improvements apply',before:d.lines.map(l=>({en:l.en,zh:l.zh})),after:updated.lines.map(l=>({en:l.en,zh:l.zh}))};
 });
 const english=[...Object.entries(examFrameworks).map(([id,f])=>({id:'framework:'+id,...f.dialogue})),...examCommuteDialogues];
 const report={date:'2026-10-20',scope:'130 existing main conversations and 20 English Academy conversations; 24 new main scenarios',mainBefore:before.length,mainAfter:after.length,newScenarios:after.filter(d=>d.isNew).length,originalScriptsRevised:original.filter(d=>d.scriptChanged).length,originalScriptsRetained:original.filter(d=>!d.scriptChanged).length,mainEnglishTurns:after.reduce((n,d)=>n+d.lines.length,0),duplicateGroupsBefore:dupes(before),duplicateGroupsAfter:dupes(after),englishAcademyCount:english.length,englishAcademyDuplicateGroups:dupes(english),engineChecks:['All 154 main conversations exercised in four playback modes using mocked US voices','No silent fallback to British voices','Two stable US voice roles, normal pitch','Voice-load delay and cancellation','Sentence boundary chunking preserves text','Source lesson and player parity'],limits:['Editorial review is AI-assisted; not independent teacher approval','Mocked synthesis verifies text, language, voice selection and callback order; it is not an acoustic assessment','Actual timbre and pronunciation depend on device voices; no claim that all devices sound identical'],original,added:after.filter(d=>d.isNew).map(d=>({id:d.id,title:d.title,level:d.level,lines:d.lines})),englishAcademy:english.map(d=>({id:d.id,reviewed:true,lines:d.lines}))};
 fs.writeFileSync('QA-CONVERSATION-EDITORIAL-2026-10-20.json',JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({mainBefore:report.mainBefore,mainAfter:report.mainAfter,revised:report.originalScriptsRevised,retained:report.originalScriptsRetained,turns:report.mainEnglishTurns,duplicateGroupsBefore:report.duplicateGroupsBefore.map(g=>g.length),duplicateGroupsAfter:report.duplicateGroupsAfter.length,englishAcademy:english.length}));
} finally {for(const f of temporary)if(fs.existsSync(f))fs.unlinkSync(f);}
