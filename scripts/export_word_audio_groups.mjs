import fs from 'node:fs';
globalThis.localStorage={getItem(){return null},setItem(){}};
const {FLASHCARD_DATABASE}=await import('../dist/flashcards.mjs');
const tiers=[['elem_1000','國小','elementary'],['jhs_2000','國中','junior'],['shs_3000','高中','senior'],['toeic','TOEIC','toeic'],['toefl','TOEFL','toefl'],['sat','SAT','sat'],['gre','GRE','gre'],['gmat','GMAT','gmat']];
const groups=[];
for(const [tier,label,key] of tiers){const cards=FLASHCARD_DATABASE.filter(c=>c.tier===tier);for(let i=0;i<cards.length;i+=50){const words=cards.slice(i,i+50).map(c=>({id:c.id,en:c.word.trim(),zh:c.zh.trim()}));groups.push({id:`${key}-${String(i/50+1).padStart(3,'0')}`,tier,label,start:i+1,end:i+words.length,words});}}
if(groups.flatMap(g=>g.words).some(w=>!w.en||!w.zh))throw Error('Missing bilingual vocabulary');
fs.writeFileSync('data/word_audio/groups.json',JSON.stringify(groups,null,2)+'\n');
console.log(JSON.stringify({groups:groups.length,words:groups.reduce((s,g)=>s+g.words.length,0),sample:groups[0].words.slice(0,3)}));
