// Content audit for editorial v6 cards and the 500 word families. Structural/editorial checks only:
// it does not measure whether any mnemonic improves recall.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Converter} from 'opencc-js';
const cards=JSON.parse(fs.readFileSync('dist/mnemonics/cards.json','utf8'));
const baseline=JSON.parse(fs.readFileSync('data/mnemonic-baseline.json','utf8'));
const families=JSON.parse(fs.readFileSync('dist/roots/groups.json','utf8'));
const convert=Converter({from:'cn',to:'tw'});
// Each pair is valid Taiwan usage (the converter cannot choose by meaning): 游泳／遊覽、划船／計劃、日進斗金、
// 宣布、遠征、紀念、了解、傢伙、車厘子 (transliteration)、挨家挨戶的「里」、橋樑／橋梁、拐杖／柺杖、發霉、髒污、回音、講台／臺。
const VALID=new Set(['台臺','游遊','划劃','伙夥','厘釐','回迴','拐柺','樑梁','台檯','里裡','霉黴','斗鬥','污汙','布佈','了瞭','念唸','征徵','只隻','裏裡','著着','扣釦']);
function traditional(text,where){const t=String(text),u=convert(t);if(t===u)return;assert.equal(t.length,u.length,where);
 for(let i=0;i<t.length;i++)if(t[i]!==u[i])assert.ok(VALID.has(t[i]+u[i]),'Simplified or non-Taiwan character in '+where+': '+t[i]+'→'+u[i]+' in '+t);}
const METHODS=['諧音聯想','外來語借音','英文同音','構詞拆字','對比聯想','情境圖像'];
const report={date:'2026-10-12',editorialVersion:6,cards:{},families:{},notes:'Editorial and structural checks; not a learning-effect measurement or external teacher review.'};

assert.equal(cards.length,1000);
assert.deepEqual(cards.map(c=>[c.id,c.word]),baseline.map(c=>[c.id,c.word]),'Card ids and order must stay stable');
for(const key of ['cue','scene'])assert.equal(new Set(cards.map(c=>c[key])).size,1000,'Unique '+key);
const hooks=new Map();
for(const c of cards){
 assert.equal(c.editorialVersion,6,c.word);assert.ok(METHODS.includes(c.method),c.word);assert.equal(c.kind,c.method);
 for(const key of ['zh','cue','scene','spell','example','exampleZh'])assert.ok(String(c[key]||'').trim(),c.word+' '+key);
 for(const key of ['zh','hook','cue','scene','spell','exampleZh'])traditional(c[key]||'',c.word+'.'+key);
 if(['諧音聯想','外來語借音'].includes(c.method)){assert.ok(c.hook,c.word);assert.ok(c.cue.includes(c.hook),'Hook must be spoken in the cue: '+c.word);hooks.set(c.hook,[...(hooks.get(c.hook)||[]),c.word]);}
 if(c.method==='英文同音')assert.ok(c.spell.includes('↔'),c.word);
 assert.ok(/[.!?]$/.test(c.example)&&/[。！？]$/.test(c.exampleZh),c.word+' example punctuation');
 assert.ok(new RegExp('\\b'+(c.displayWord||c.word).split(' ')[0].slice(0,3),'i').test(c.example),c.word+' example shows word');
 assert.ok(c.soundBridge?.note&&c.soundBridge.scope,c.word);assert.ok(c.pronunciation?.syllables>=1,c.word);
 assert.ok(c.cue.length<=28,'Cue should stay short enough to hear in one breath: '+c.word);
}
const familyIds=new Set(families.groups.map(g=>g.id));
for(const c of cards)for(const f of c.families||[])assert.ok(familyIds.has(f.id),c.word+' links unknown family '+f.id);
const repeatedHooks=[...hooks].filter(([,words])=>words.length>1);
report.cards={total:1000,methods:Object.fromEntries(METHODS.map(m=>[m,cards.filter(c=>c.method===m).length])),uniqueCues:1000,uniqueScenes:1000,
 linkedToFamilies:cards.filter(c=>c.families?.length).length,repeatedHooks:Object.fromEntries(repeatedHooks),traditionalChinese:true,stableIdsAndOrder:true};

const groups=families.groups;assert.equal(groups.length,500);
assert.deepEqual(families.counts,{'複合詞字族':150,'字首':70,'字尾':60,'字根':220});
assert.deepEqual(groups.map(g=>g.id),Array.from({length:500},(_,i)=>'wf-'+String(i+1).padStart(3,'0')));
const cardWords=new Set(cards.map(c=>c.word));let members=0;
for(const g of groups){
 assert.ok(g.members.length>=3&&g.members.length<=7,g.id);members+=g.members.length;
 for(const key of ['meaning','tip'])traditional(g[key],g.id+'.'+key);
 for(const m of g.members){traditional(m.zh,g.id+' '+m.word);traditional(m.parts,g.id+' '+m.word+' parts');
  const low=m.word.toLowerCase();
  if(g.type==='p')assert.ok(g.variants.some(v=>low.startsWith(v)),g.id+' '+m.word);
  else if(g.type==='s')assert.ok(g.variants.some(v=>low.endsWith(v)),g.id+' '+m.word);
  else assert.ok(g.variants.some(v=>low.includes(v)),g.id+' '+m.word);}
 for(const link of g.cards)assert.ok(cardWords.has(link.word),g.id);
}
assert.equal(members,families.members);
report.families={total:500,counts:families.counts,members,uniqueWords:families.uniqueWords,linkedCardWords:new Set(groups.flatMap(g=>g.cards.map(c=>c.word))).size,
 spellingRulesChecked:true,traditionalChinese:true};
fs.writeFileSync('CONTENT-MNEMONICS-V6-2026-10-12.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({cards:report.cards.methods,linked:report.cards.linkedToFamilies,repeatedHooks:repeatedHooks.length,families:report.families.counts,members}));
