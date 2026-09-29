import fs from 'node:fs';
import {FLASHCARD_DATABASE as cards} from '../dist/flashcards.mjs';
const words=new Map(cards.filter(c=>/^[a-z]+$/.test(c.word)).map(c=>[c.word,c]));
const candidates=[];
const prefixes=['un','dis','non','re','mis','pre','post','over','under','inter','trans','sub','super','anti','co','multi','bi','tri','de','in','im','il','ir','en','em','out'];
const suffixes=['ness','less','ful','ment','ly','er','or','ist','ism','ship','hood','dom','able','ible','ous','al','ic','ical','ity','tion','sion','ation','ive','ize','ise','ify','en','y','ing','ed'];
for(const [word,c] of words){
 for(const a of prefixes)if(word.startsWith(a)&&words.has(word.slice(a.length))&&word.length>a.length+2)candidates.push({word,affix:a+'-',base:word.slice(a.length),kind:'prefix',zh:c.zh,pos:c.pos});
 for(const a of suffixes)if(word.endsWith(a)){
  const stem=word.slice(0,-a.length);
  const options=[stem,stem+'e',stem.endsWith('i')?stem.slice(0,-1)+'y':'',/(.)\1$/.test(stem)?stem.slice(0,-1):''];
  const base=options.find(b=>b.length>2&&b!==word&&words.has(b));
  if(base)candidates.push({word,affix:'-'+a,base,kind:'suffix',zh:c.zh,pos:c.pos});
 }
}
fs.mkdirSync('data/proofreading',{recursive:true});
fs.writeFileSync('data/proofreading/morphology-candidates.json',JSON.stringify(candidates,null,2));
console.log({candidates:candidates.length,words:new Set(candidates.map(c=>c.word)).size});
for(const kind of ['prefix','suffix'])console.log(kind,candidates.filter(c=>c.kind===kind).map(c=>`${c.word}=${c.affix}/${c.base}`).join(' '));
