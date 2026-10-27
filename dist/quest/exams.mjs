import {questionKey,selectDistinct,learningKeys} from './question_quality.mjs?v=exams20261027';
export const EXAMS=[
 {id:'toeic',title:'TOEIC',subtitle:'Listening & Reading',scope:'聽力與閱讀',range:[10,990],targets:[550,750,900],unit:'L&R',seconds:75,branch:'b-toeic',skills:[['conversation','對話聽辨'],['talk','短篇獨白'],['reading','商務閱讀'],['language','句型與篇章']],official:'https://www.iibc-global.org/english/toeic/test/lr/about/format.html',practice:'https://www.ets.org/toeic/test-takers/listening-reading/prepare.html',gaps:'仍需照片題、單句應答、完整多篇閱讀與官方錄音全卷驗證；本站語音為裝置合成語音。'},
 {id:'sat',title:'SAT',subtitle:'Reading and Writing',scope:'閱讀與寫作分項',range:[200,800],targets:[550,650,750],unit:'R&W',seconds:72,branch:'b-sat',skills:[['information','資訊與證據'],['craft','文意與結構'],['conventions','標準英語規範'],['expression','表達與修辭']],official:'https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing',practice:'https://satsuite.collegeboard.org/practice/practice-tests/bluebook',gaps:'不包含 Math，不換算 400–1600 總分；需用 Bluebook 完整適性模考核對。'},
 {id:'gre',title:'GRE',subtitle:'Verbal Reasoning',scope:'語文推理分項',range:[130,170],targets:[145,155,165],unit:'Verbal',seconds:92,branch:'b-gre',skills:[['completion','語意填空'],['equivalence','句子等義（選二）'],['reading','學術閱讀']],official:'https://www.ets.org/gre/score-users/about/general-test/content-structure.html',practice:'https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html',gaps:'不包含 Quantitative 或 Analytical Writing；多空格與選句型仍須在官方 POWERPREP 中練習。'},
 {id:'gmat',title:'GMAT',subtitle:'Verbal Reasoning',scope:'語文推理分項',range:[60,90],targets:[75,80,85],unit:'Verbal',seconds:118,branch:'b-gmat',skills:[['critical','批判推理'],['reading','商業與學術閱讀']],official:'https://www.mba.com/exams/gmat-exam/about/exam-content',practice:'https://www.mba.com/exams/gmat-exam/prep-for-the-exam',gaps:'不包含 Quantitative 或 Data Insights，不換算 205–805 總分；現行 Verbal 不以舊制句子改錯作評估。'}
];
export const TIERS=[{id:'low',title:'低標 · 穩固基礎',medal:'🥉'},{id:'mid',title:'中標 · 穩定進階',medal:'🥈'},{id:'high',title:'高標 · 精熟挑戰',medal:'🥇'}];
export const scoreStep=id=>id==='toeic'?5:id==='sat'?10:1;
export const examOf=id=>EXAMS.find(e=>e.id===String(id).split(':')[0]);
export const isAssessment=mode=>mode==='placement'||mode==='exam-check';
export function campaign(ref){const [id,tier,skill]=String(ref||'').split(':');const exam=examOf(id),level=TIERS.find(t=>t.id===tier);return exam&&level?{exam,level,skill,key:id+':'+tier,target:exam.targets[TIERS.indexOf(level)]}:null;}
export function examForms(course,state,key){
 const c=campaign(key);if(!c)return [];
 const exposedFamilies=new Set(Object.keys(state.items).filter(id=>state.items[id].s>0).map(id=>course.item(id)?.family).filter(Boolean));
 return ['A','B'].map(form=>{const ids=[...course.items.values()].filter(q=>q.exam===c.exam.id&&q.tier===c.level.id&&q.partition==='check'&&q.form===form).map(q=>q.id);return {form,ids,fresh:ids.length>0&&ids.every(id=>!exposedFamilies.has(course.item(id).family)&&!state.exposures[questionKey(course.item(id))])};});
}
export function validExamSession(s,course){
 if(typeof s.mode!=='string')return false;if(!s.mode.startsWith('exam-'))return true;
 const c=campaign(s.ref),p=s.examPlan;if(!c||!p||p.key!==c.key||!Array.isArray(s.queue)||s.queue.some(id=>!course.item(id)))return false;
 const items=s.queue.map(course.item);
 if(s.mode==='exam-check'){
  if(!p.assessment||!['A','B'].includes(p.form)||typeof p.novel!=='boolean'||!Number.isFinite(p.timeLimit)||p.timeLimit<=0)return false;
  const expected=[...course.items.values()].filter(q=>q.exam===c.exam.id&&q.tier===c.level.id&&q.partition==='check'&&q.form===p.form);
  return s.base===expected.length&&s.queue.length===expected.length&&new Set(s.queue).size===expected.length&&items.every(q=>q.exam===c.exam.id&&q.tier===c.level.id&&q.form===p.form)&&p.timeLimit===expected.length*c.exam.seconds*1000;
 }
 return !p.assessment&&c.exam.skills.some(([id])=>id===c.skill)&&items.every(q=>q.exam===c.exam.id&&q.tier===c.level.id&&q.skill===c.skill&&q.partition==='practice');
}
export function makeExamPlan(course,mode,ref,state,time=Date.now()){
 const c=campaign(ref);if(!c||!course.loaded('exams'))return null;
 const pool=[...course.items.values()].filter(q=>q.exam===c.exam.id&&q.tier===c.level.id);
 if(mode==='exam-practice'){
  if(!c.exam.skills.some(([id])=>id===c.skill))return null;
  const ids=pool.filter(q=>q.skill===c.skill&&q.partition==='practice').map(q=>q.id),scope='exam:'+ref,r=state.rotations[scope]||{round:1,seen:[]};
  let seen=r.seen,round=r.round,cycled=false;
  let queue=selectDistinct(ids,course.item,8,{seen,exposures:state.exposures,seed:ref+state.serial});
  if(!queue.length){seen=[];round++;cycled=true;queue=selectDistinct(ids,course.item,8,{exposures:state.exposures,seed:ref+state.serial});}
  return queue.length?{queue,hearts:null,examPlan:{key:c.key,skill:c.skill,assessment:false},rotation:{scope,round,seen,cycled,questions:queue.length,poolQuestions:ids.length}}:null;
 }
 const history=state.examProgress?.[c.key]?.checks||[];
 const forms=examForms(course,state,c.key),form=forms.find(f=>f.fresh)?.form||'A';
 if(forms.find(f=>f.form===form).fresh&&history.some(h=>h.passed&&h.novel&&h.form!==form&&time-h.at<86400000))return null;
 const ids=pool.filter(q=>q.partition==='check'&&q.form===form).map(q=>q.id);
 if(!ids.length||c.exam.skills.some(([skill])=>!ids.some(id=>course.item(id).skill===skill)))return null;
 const novel=forms.find(f=>f.form===form).fresh;
 return {queue:ids,hearts:null,examPlan:{key:c.key,form,assessment:true,novel,timeLimit:ids.length*c.exam.seconds*1000}};
}
export function finishExam(state,s,course,time){
 const c=campaign(s.ref),plan=s.examPlan,rows=s.results.filter(r=>!r.repair),independent=r=>r.ok&&!r.hint&&!r.unheard;
 const progress=state.examProgress[c.key] ||= {checks:[],skills:{},official:[]};
 const skills=c.exam.skills.map(([id,title])=>{const rs=rows.filter(r=>course.item(r.id).skill===id);return{id,title,n:rs.length,correct:rs.filter(independent).length};});
 if(s.mode==='exam-practice')for(const r of rows){const q=course.item(r.id),skill=progress.skills[q.skill] ||= {};skill[questionKey(q)]={ok:independent(r),at:time};}
 const accuracy=rows.filter(independent).length/Math.max(1,rows.length),seconds=Math.max(0,(time-s.started)/1000);
 const timed=s.mode==='exam-check'&&time-s.started<=plan.timeLimit;
 const passed=s.mode==='exam-check'?plan.novel&&timed&&accuracy>=.8&&skills.every(x=>x.n>=2&&x.correct/x.n>=.75):accuracy>=.8;
 if(s.mode==='exam-check'){progress.checks.push({form:plan.form,novel:plan.novel,timed,passed,accuracy,skills,at:time,total:rows.length,seconds});progress.checks=progress.checks.slice(-30);}
 const mastery=examMastery(state,c.key,time);
 return {passed,examKey:c.key,target:c.target,skills,novel:plan.novel,timed,timeLimit:plan.timeLimit,mastery,review:rows.map(r=>{const q=course.item(r.id);return{id:q.id,prompt:q.prompt,text:q.passage||q.text||q.audio||'',answer:q.answer,why:q.why,ok:independent(r),value:r.value,unheard:r.unheard};})};
}
export function examMastery(state,key,time=Date.now()){
 const c=campaign(key),p=state.examProgress?.[key]||{skills:{},checks:[],official:[]};if(!c)return null;
 const skills=c.exam.skills.map(([id,title])=>{const rs=Object.values(p.skills[id]||{}).filter(r=>time-r.at<=30*86400000);return{id,title,n:rs.length,correct:rs.filter(r=>r.ok).length,ready:rs.length>=4&&rs.filter(r=>r.ok).length/rs.length>=.8};});
 const checks=p.checks.filter(r=>r.passed&&r.novel&&r.timed&&time-r.at<=30*86400000);
 const spaced=checks.some(a=>checks.some(b=>a.form!==b.form&&Math.abs(a.at-b.at)>=86400000));
 const qualified=(p.official||[]).filter(r=>r.score>=c.target&&time-Date.parse(r.date)<=90*86400000&&Date.parse(r.date)<=time&&r.form),dateForms=new Map();
 for(const r of qualified){if(!dateForms.has(r.date))dateForms.set(r.date,new Set());dateForms.get(r.date).add(r.kind+':'+r.form);}
 const assigned=new Map();function assign(date,seen){for(const form of dateForms.get(date)){if(seen.has(form))continue;seen.add(form);if(!assigned.has(form)||assign(assigned.get(form),seen)){assigned.set(form,date);return true;}}return false;}
 for(const date of dateForms.keys())assign(date,new Set());const official=assigned.size;
 return {skills,checks:checks.length,spaced,completed:skills.every(s=>s.ready)&&spaced,official,stage:official>=2?'已自行登錄兩次官方目標成績':skills.every(s=>s.ready)&&spaced?'本站里程碑完成 · 待官方核對':spaced?'補強技能關':checks.length?'等待隔日未見卷複測':'建立技能證據',next:skills.find(s=>!s.ready)?.id||null};
}
export function saveOfficial(state,key,{score,date,kind,form},time=Date.now()){
 const c=campaign(key),n=Number(score),d=Date.parse(date),name=String(form||'').trim();if(!c||!Number.isFinite(n)||!Number.isInteger(n)||n<c.exam.range[0]||n>c.exam.range[1]||(n-c.exam.range[0])%scoreStep(c.exam.id)!==0||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(d)||new Date(d).toISOString().slice(0,10)!==date||d>time||time-d>365*86400000||!['practice','actual'].includes(kind)||name.length<2||name.length>80)return false;
 const p=state.examProgress[key] ||= {checks:[],skills:{},official:[]};p.official ||= [];
 if(p.official.some(r=>r.date===date&&r.kind===kind&&r.score===n))return false;
 p.official.push({score:n,date,kind,form:name,at:time});p.official=p.official.slice(-20);return true;
}
