import fs from 'node:fs';
import {Converter} from 'opencc-js';
import {FLASHCARD_DATABASE as cards} from '../dist/flashcards.mjs';
const convert=Converter({from:'cn',to:'twp'});
const baseline='data/proofreading/flashcards-before.json';
if(!fs.existsSync(baseline))fs.writeFileSync(baseline,JSON.stringify(cards,null,2));
const rows=fs.readFileSync('data/proofreading/tatoeba/cmn.txt','utf8').trim().split('\n').map(l=>l.trim().split('\t')).map(([en,zh,attribution])=>({en,zh:convert(zh),attribution}));
const index=new Map();
for(const r of rows){
 if(r.en.length<15||r.en.length>180||r.zh.length<5||r.zh.length>100)continue;
 for(const w of new Set(r.en.toLowerCase().match(/[a-z]+(?:[-'][a-z]+)*/g)||[])){if(!index.has(w))index.set(w,[]);index.get(w).push(r);}
}
const old=Object.values(JSON.parse(fs.readFileSync('scripts/flashcard_builders/existing_cards.json'))).flatMap(x=>Object.values(x));
const original=new Map(old.map(c=>[c.word.toLowerCase()+'|'+c.zh,c]));
const fixes={axe:{zh:'斧頭',pos:'n.'},ax:{zh:'斧頭',pos:'n.'}};
const audit=[];
for(const c of cards){
 const word=c.word.toLowerCase(),fixed=fixes[word]||{},zh=fixed.zh||c.zh;
 const existing=original.get(word+'|'+zh);
 const senses=zh.split(/[、，,；;／/()（）]/).map(s=>s.replace(/[的地]$/,'').trim()).filter(s=>s.length>=2&&s.length<=8&&/^[\u3400-\u9fff]+$/.test(s));
 const candidates=(index.get(word)||[]).filter(r=>senses.some(s=>r.zh.includes(s))).sort((a,b)=>Math.abs(a.en.length-60)-Math.abs(b.en.length-60));
 audit.push({id:c.id,word:c.word,tier:c.tier,zh,pos:fixed.pos||c.pos,original:existing?{example:existing.example,exampleZh:existing.exampleZh,ipa:existing.ipa,chunk:existing.chunk,collocation:existing.collocation,memoryTip:existing.memoryTip}:null,candidate:candidates[0]||null,status:existing?'original-review':candidates.length?'corpus-review':'needs-authoring'});
}
fs.writeFileSync('data/proofreading/corpus-review.json',JSON.stringify(audit,null,2));
const count=k=>audit.filter(x=>x.status===k).length;
console.log({total:audit.length,original:count('original-review'),corpus:count('corpus-review'),needsAuthoring:count('needs-authoring')});
