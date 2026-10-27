export const VERSION='simulation20261027';
export const STORAGE_KEY='english-quest-simulation-v1';
export const ASSET_VERSION='simulation20261027r2';
export const SKILL_NAMES={vocabulary:'詞彙',cloze:'綜合測驗',discourse:'文意選填',structure:'篇章結構',reading:'閱讀理解',mixed:'混合題',translation:'中譯英',essay:'英文作文',picture:'圖片辨義',response:'問答應答',conversation:'對話聽辨',talk:'短篇談話',language:'句型與用法','text-completion':'篇章填空',craft:'文意與結構',information:'資訊與證據',conventions:'標準英語規範',expression:'表達與修辭',completion:'語意填空',equivalence:'句子等義',critical:'批判推理'};
const section=(title,count,minutes,extra={})=>({title,count,seconds:minutes*60,...extra});
export const PROFILES=[
 {id:'gsat',title:'學測英文',scope:'115 學年度起題型 · 100 分鐘',sections:[section('英文考科',52,100)],types:'詞彙、綜合測驗、文意選填、篇章結構、閱讀、混合題、中譯英、作文',source:'https://www.ceec.edu.tw/xmdoc/cont?sid=0O211573150658099894&xsmsid=0J018586101460336585',note:'52 個作答項目是本站配置，非官方固定題數。文意選填採共用十選項；篇章結構採四空五選項。混合短答、翻譯與作文留待人工評閱。'},
 {id:'gept',title:'全民英檢中級',scope:'聽讀 · 約 30＋45 分鐘',sections:[section('聽力',35,30,{listening:true}),section('閱讀',35,45)],types:'看圖辨義、問答、簡短對話、簡短談話、詞彙、段落填空、閱讀',source:'https://www.gept.org.tw/Exam_Intro/t02_introduction.asp',note:'目前提供中級聽讀及獨立寫作卷；初級、中高級與口說尚未提供。聽力採裝置合成語音與示意圖，音軌節奏為本站設計。'},
 {id:'gept-writing',title:'全民英檢中級寫作',scope:'中譯英＋作文 · 40 分鐘',sections:[section('寫作',2,40)],types:'一段中譯英、約 120 字英文作文（8–12 句）',source:'https://www.gept.org.tw/Exam_Intro/t02_introduction.asp',note:'中譯英 40%、作文 60% 為官方配比。本卷保存文字並提供評閱要點，無自動寫作分數。'},
 {id:'toeic',title:'TOEIC Listening & Reading',scope:'聽力 45＋閱讀 75 分鐘 · 200 題',sections:[section('Listening · Parts 1–4',100,45,{listening:true}),section('Reading · Parts 5–7',100,75)],types:'圖片 6、應答 25、對話 39、獨白 30、句子填空 30、篇章填空 16、閱讀 54',source:'https://www.iibc-global.org/english/toeic/test/lr/about/format.html',note:'圖片使用原創線條示意圖；合成語音、篇章長度與多篇閱讀配置尚未達官方錄音與完整試卷等值。'},
 {id:'sat',title:'SAT Reading and Writing',scope:'兩模組各 32 分鐘 · 54 題',sections:[section('Module 1',27,32),section('Module 2',27,32)],types:'Craft and Structure、Information and Ideas、Standard English Conventions、Expression of Ideas',source:'https://satsuite.collegeboard.org/sat/whats-on-the-test/structure',note:'本站固定卷，不重現官方第二模組適性選路、未計分試題或量尺計分。英文兩模組之間沒有休息；不含 Math。'},
 {id:'gre',title:'GRE Verbal Reasoning',scope:'12 題／18 分鐘＋15 題／23 分鐘',sections:[section('Verbal Section 1',12,18),section('Verbal Section 2',15,23)],types:'單空與多空 Text Completion、六選二 Sentence Equivalence、閱讀單選／複選／選句',source:'https://www.ets.org/gre/score-users/about/general-test/content-structure.html',note:'本站固定卷，不重現官方分節適性計分。不含 Analytical Writing 或 Quantitative；單選填空為五選一。'},
 {id:'gmat',title:'GMAT Verbal Reasoning',scope:'23 題 · 45 分鐘',sections:[section('Verbal Reasoning',23,45)],types:'Critical Reasoning、Reading Comprehension（五選一）',source:'https://www.mba.com/exams/gmat-exam/about/exam-structure',note:'逐題作答後前進；全部作答後才開放檢視，最多改答三次。本卷非官方逐題適性演算法，不含 Quantitative 或 Data Insights。'}
];
export const profileOf=id=>PROFILES.find(p=>p.id===id);
export function sectionQuestions(run){let start=0;for(let i=0;i<run.section;i++)start+=profileOf(run.profile).sections[i].count;return run.questions.slice(start,start+profileOf(run.profile).sections[run.section].count);}
export function createRun(profile,questions,now=Date.now()){
 const p=profileOf(profile);if(!p||questions.length!==p.sections.reduce((n,s)=>n+s.count,0))throw Error('試卷題數與考試架構不符');
 return {version:VERSION,id:globalThis.crypto?.randomUUID?.()||String(now),profile,questions:structuredClone(questions),startedAt:now,section:0,index:0,deadline:now+p.sections[0].seconds*1000,answers:{},flags:{},spent:{},sectionResults:[],frontier:0,review:false,edits:0,audio:{},hiddenCount:0,status:'active',confirm:false};
}
export const remaining=(r,now=Date.now())=>r.status==='active'?Math.max(0,Math.ceil((r.deadline-now)/1000)):0;
export function advance(run,now=Date.now(),automatic=false){
 if(run.status!=='active')return false;
 if(!automatic&&now>=run.deadline)return sync(run,now);
 const p=profileOf(run.profile),end=automatic?run.deadline:now;
 run.sectionResults.push({section:run.section,endedAt:end,automatic});
 if(run.section+1===p.sections.length){run.status='finished';run.endedAt=end;run.confirm=false;return true;}
 run.section++;run.index=0;run.frontier=0;run.review=false;run.confirm=false;run.deadline=end+p.sections[run.section].seconds*1000;return true;
}
export function sync(run,now=Date.now()){let changed=false;while(run.status==='active'&&now>=run.deadline){advance(run,now,true);changed=true;}return changed;}
export function terminate(run,now=Date.now()){sync(run,now);if(run.status!=='active')return false;run.sectionResults.push({section:run.section,endedAt:now,automatic:false,terminated:true});run.status='finished';run.endedAt=now;run.terminated=true;return true;}
export function setAnswer(run,id,value,now=Date.now()){
 // A background-tab delay must never allow a late answer into the expired section.
 if(sync(run,now)||run.status!=='active')return false;
 const qs=sectionQuestions(run),q=qs[run.index];if(q?.id!==id)return false;
 if(!validAnswer(q,value))return false;
 if(run.profile==='gmat'&&!run.review&&run.index!==run.frontier)return false;
 const before=run.answers[id];if(JSON.stringify(before)===JSON.stringify(value))return true;
 if(run.profile==='gmat'&&run.review){if(run.edits>=3)return false;run.edits++;}
 run.answers[id]=value;return true;
}
export function navigate(run,index,now=Date.now()){
 if(sync(run,now)||run.status!=='active')return false;
 const qs=sectionQuestions(run),s=profileOf(run.profile).sections[run.section];
 if(!Number.isInteger(index)||index<0||index>=qs.length)return false;
 if(s.listening&&qs[index].group!==qs[run.index].group)return false;
 if(run.profile==='gmat'&&!run.review&&index!==run.frontier)return false;
 run.index=index;return true;
}
export function nextGmat(run,now=Date.now()){
 if(sync(run,now)||run.status!=='active'||run.profile!=='gmat'||run.review)return false;
 const qs=sectionQuestions(run);if(run.answers[qs[run.index].id]===undefined)return false;
 if(run.frontier===qs.length-1){run.review=true;return true;}run.frontier++;run.index=run.frontier;return true;
}
export function isCorrect(q,value){
 if(q.type==='writing')return null;
 if(value===undefined||value===''||(Array.isArray(value)&&!value.length))return false;
 if(q.type==='text')return String(value).trim().toLowerCase()===String(q.answer).toLowerCase();
 if(Array.isArray(q.answer)){if(!Array.isArray(value))return false;const a=q.type==='blanks'?q.answer:[...q.answer].sort(),b=q.type==='blanks'?value:[...value].sort();return JSON.stringify(a)===JSON.stringify(b);}
 return value===q.answer;
}
export function validAnswer(q,value){
 if(q.type==='writing'||q.type==='text')return typeof value==='string'&&value.length<=100000;
 if(q.type==='blanks')return Array.isArray(value)&&value.length===q.blanks.length&&value.every((v,i)=>v===''||q.blanks[i].includes(v));
 if(q.type==='multi')return Array.isArray(value)&&new Set(value).size===value.length&&value.length<=(q.selectCount||q.options.length)&&value.every(v=>Number.isInteger(v)&&v>=0&&v<q.options.length);
 return Number.isInteger(value)&&value>=0&&value<q.options.length;
}
export function answerState(q,value){
 if(value===undefined||value===null||typeof value==='string'&&!value.trim()||Array.isArray(value)&&value.every(v=>v===''))return 'empty';
 if(!validAnswer(q,value))return 'partial';
 if(q.type==='blanks'&&value.some(v=>v==='')||q.type==='multi'&&q.selectCount&&value.length!==q.selectCount)return 'partial';
 return 'complete';
}
export function listeningGroups(run){
 const s=profileOf(run.profile).sections[run.section];if(!s.listening)return [];
 const groups=[];for(const q of sectionQuestions(run)){let g=groups.at(-1);if(!g||g.id!==q.group){g={id:q.group,qs:[],words:((q.audio||'')+' '+(q.spokenOptions||[]).join(' ')).trim().split(/\s+/).length};groups.push(g);}g.qs.push(q);}
 const weights=groups.map(g=>g.words/2.2+g.qs.length*13+4),total=weights.reduce((a,b)=>a+b,0);let start=run.deadline-s.seconds*1000;
 return groups.map((g,i)=>{const end=i===groups.length-1?run.deadline:start+s.seconds*1000*weights[i]/total,result={...g,start,end};start=end;return result;});
}
// Validate shape and timing before a local record can reach the rendering path.
// The fixed bank is authoritative; corrupt question payloads cannot replace it.
export function restoreRun(value,bank){
 if(value===null||value===undefined)return null;
 try{
 const r=structuredClone(value),p=profileOf(r.profile),qs=bank.forms[r.profile],record=v=>v&&typeof v==='object'&&!Array.isArray(v),integer=v=>Number.isInteger(v)&&v>=0;
 if(r.version!==VERSION||!p||!Array.isArray(qs)||!['active','finished'].includes(r.status)||!Number.isFinite(r.startedAt)||r.startedAt<0||!integer(r.section)||r.section>=p.sections.length||!Array.isArray(r.questions)||r.questions.length!==qs.length)return null;
 if(r.questions.some((q,i)=>JSON.stringify(q)!==JSON.stringify(qs[i])))return null;
 if(!integer(r.index)||r.index>=p.sections[r.section].count||!integer(r.frontier)||r.frontier>=p.sections[r.section].count||!integer(r.edits)||r.edits>3||typeof r.review!=='boolean'||!integer(r.hiddenCount))return null;
 for(const field of ['answers','flags','audio','spent'])if(!record(r[field]))return null;
 const byId=new Map(qs.map(q=>[q.id,q])),groups=new Set(qs.map(q=>q.group));
 if(Object.entries(r.answers).some(([id,v])=>!byId.has(id)||!validAnswer(byId.get(id),v))||Object.entries(r.flags).some(([id,v])=>!byId.has(id)||typeof v!=='boolean')||Object.entries(r.spent).some(([id,v])=>!byId.has(id)||!Number.isFinite(v)||v<0)||Object.entries(r.audio).some(([id,v])=>!groups.has(id)||!['started','complete','error'].includes(v)))return null;
 if(!Array.isArray(r.sectionResults)||r.sectionResults.length!==(r.status==='active'?r.section:r.section+1))return null;
 let start=r.startedAt;for(const [i,x] of r.sectionResults.entries()){const max=start+p.sections[i].seconds*1000;if(x.section!==i||typeof x.automatic!=='boolean'||!Number.isFinite(x.endedAt)||x.endedAt<start||x.endedAt>max||x.automatic&&x.endedAt!==max)return null;start=x.endedAt;}
 const sectionStart=r.section?r.sectionResults[r.section-1].endedAt:r.startedAt;
 if(r.deadline!==sectionStart+p.sections[r.section].seconds*1000)return null;
 if(r.status==='finished'&&(r.endedAt!==r.sectionResults.at(-1).endedAt||r.section!==p.sections.length-1&&!r.terminated))return null;
 if(r.profile==='gmat'&&(r.review&&r.frontier!==p.sections[0].count-1||!r.review&&r.index!==r.frontier))return null;
 return r;
 }catch{return null;}
}
export function report(run){const rows=run.questions.map(q=>({id:q.id,skill:q.skill,state:answerState(q,run.answers[q.id]),correct:isCorrect(q,run.answers[q.id])})),groups=[...new Set(run.questions.filter(q=>q.audio).map(q=>q.group))];return {total:rows.length,objective:rows.filter(x=>x.correct!==null).length,correct:rows.filter(x=>x.correct===true).length,unanswered:rows.filter(x=>x.state!=='complete').length,partial:rows.filter(x=>x.state==='partial').length,manual:rows.filter(x=>x.correct===null).length,listening:{total:groups.length,complete:groups.filter(id=>run.audio[id]==='complete').length,interrupted:groups.filter(id=>['error','started'].includes(run.audio[id])).length,missed:groups.filter(id=>!run.audio[id]).length},skills:[...new Set(rows.map(x=>x.skill))].map(skill=>({skill,total:rows.filter(x=>x.skill===skill&&x.correct!==null).length,correct:rows.filter(x=>x.skill===skill&&x.correct===true).length})).filter(x=>x.total)};}
