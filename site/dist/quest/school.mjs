import { SEMESTERS } from './semesters.mjs?v=school20261027';
export { SEMESTERS };
export const SCHOOL_SKILLS = [['word','🧩','字詞與句型'],['listen','🎧','聽辨與回應'],['read','📖','閱讀與推論'],['use','✍️','表達與整合'],['boss','🏆','學期精熟挑戰']];
const choice=(id,s,domain,q,extra={})=>({id,school:s.id,domain,kind:'drill',type:'choice',prompt:q[0],answer:q[1],options:[q[1],...q[2]],why:q[3],level:s.group==='junior'?3:4,src:'#unit/'+s.modules[0],...extra});
export const SCHOOL_ITEMS=SEMESTERS.flatMap(s=>[
 {id:`school.${s.id}.info`,school:s.id,domain:'word',kind:'lesson',type:'info',title:s.label+' · '+s.title,body:s.rule,example:s.example,src:'#unit/'+s.modules[0]},
 ...s.grammarQuestions.map((q,i)=>choice(`school.${s.id}.word${i+1}`,s,'word',q)),
 choice(`school.${s.id}.listen`,s,'listen',[s.listen.prompt,s.listen.answer,s.listen.others,s.listen.why],{type:'listen',audio:s.audio}),
 ...s.reading.map((q,i)=>choice(`school.${s.id}.read${i+1}`,s,'read',q,{passage:s.passage})),
 {id:`school.${s.id}.use`,school:s.id,domain:'use',kind:'talk',type:'build',prompt:'依本學期情境排出完整句子。',answer:s.build,words:s.build.replace(/[.,!?]/g,'').split(/\s+/).map(w=>w==='I'?'I':w.toLowerCase()),audioAfter:s.build,why:s.buildWhy,level:s.group==='junior'?3:4,src:'#unit/'+s.modules[0]}
]);
export const semesterOf=id=>SEMESTERS.find(s=>`sem-${s.id}`===id||s.id===id);
export function schoolTracks(index) {
 return SEMESTERS.map(s=>({id:`sem-${s.id}`,kind:'semester',semester:s.id,title:s.label+'｜'+s.title,icon:s.group==='junior'?'🎒':'🎓',level:s.group==='junior'?'第四學習階段 · 國中':'第五學習階段 · 普通型高中',color:s.group==='junior'?'teal':'indigo',units:[{id:`sem-${s.id}-unit`,semester:s.id,title:s.title,icon:'🗺️',color:s.group==='junior'?'teal':'indigo',src:'#unit/'+s.modules[0],nodes:SCHOOL_SKILLS.map(([skill,icon,title])=>({id:`sem-${s.id}:${skill}`,semester:s.id,skill,kind:skill==='boss'?'boss':'lesson',title,icon,size:skill==='boss'?12:10}))}]}));
}
export function schoolFiles(semester,index) {
 const s=semesterOf(semester);return s ? index.sections.filter(t=>t.units.some(u=>s.modules.includes(u.id))).map(t=>t.id) : [];
}
export function refreshSchoolPools(course) {
 for(const s of SEMESTERS) {
  const ids=[...new Set(s.modules.flatMap(uid=>course.units.get(uid)?.nodes.filter(n=>n.kind!=='boss').flatMap(n=>course.nodes.get(n.id)?.pool || []) || []))];
  const original=ids.filter(id=>['choice','listen','build','input','match'].includes(course.item(id)?.type));
  for(const [skill] of SCHOOL_SKILLS) {
   const node=course.nodes.get(`sem-${s.id}:${skill}`);
   const own=SCHOOL_ITEMS.filter(it=>it.school===s.id&&(skill==='boss'?it.type!=='info':it.domain===skill)).map(it=>it.id);
   const relevant=original.filter(id=>{const it=course.item(id);return skill==='boss'||skill==='word'&&['word','grammar'].includes(it.kind)||skill==='listen'&&(it.type==='listen'||it.type==='input'&&it.audio&&!it.text)||skill==='read'&&it.type==='choice'&&(it.passage||['drill','talk'].includes(it.kind))||skill==='use'&&['input','build'].includes(it.type);});
   node.pool=[...new Set([...own,...relevant])];
  }
 }
}
