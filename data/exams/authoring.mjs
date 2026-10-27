export const items=[];
const hash=s=>{let a=2166136261,b=2246822519;for(const c of s.normalize('NFKC')){a=Math.imul(a^c.charCodeAt(0),16777619);b=Math.imul(b^c.charCodeAt(0),3266489917);}return (a>>>0).toString(16)+(b>>>0).toString(16);};
export function card(exam,tier,skill,form,passage,rows,{listen=false}={}){
 const family=`exam-original-${exam}-${tier}-${skill}-${form}-${hash(passage||rows.map(r=>r.split('|')[0]).join('\n'))}`;
 for(const [i,row]of rows.entries()){
  const [prompt,answer,...rest]=row.split('|'),why=rest.pop(),options=[answer,...rest];
  items.push({id:family+'-'+hash(prompt),family,exam,tier,skill,partition:form==='P'?'practice':'check',form,kind:'drill',type:listen?'listen':'choice',prompt,...(listen?{audio:passage}:{passage}),answer,options,why,original:true,level:{low:1,mid:2,high:3}[tier],src:'quest/#exams'});
 }
}
export function single(exam,tier,skill,form,rows){for(const row of rows)card(exam,tier,skill,form,'',[row]);}
export function equivalence(tier,form,rows){
 for(const [stem,a,b,c,d,e,f,why]of rows){const family=`exam-original-gre-${tier}-equivalence-${form}-${hash(stem)}`;items.push({id:family,family,exam:'gre',tier,skill:'equivalence',partition:form==='P'?'practice':'check',form,kind:'drill',type:'multi',prompt:'Select TWO choices that complete the sentence with equivalent meanings.',text:stem,options:[a,b,c,d,e,f],correctAnswers:[a,b],selectCount:2,answer:[a,b].join(' || '),why,original:true,level:{low:1,mid:2,high:3}[tier],src:'quest/#exams'});}
}
