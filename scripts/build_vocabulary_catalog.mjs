import fs from 'node:fs';
globalThis.localStorage={getItem(){return null;},setItem(){}};
const {FLASHCARD_DATABASE}=await import('../dist/flashcards.mjs');
const {teachingCard}=await import('../dist/flashcard_quality.mjs');
const mnemonic=new Map(JSON.parse(fs.readFileSync('dist/mnemonics/cards.json')).map(c=>[c.id,c]));
const manifest=JSON.parse(fs.readFileSync('dist/audio/words/manifest.json'));
const positions=new Map();
for(const g of manifest.groups){const data=JSON.parse(fs.readFileSync('dist/audio/words/'+g.id+'.json'));for(const w of data.words)positions.set(w.id,{group:g.id,start:w.start});}
const records=FLASHCARD_DATABASE.map(c=>{const m=mnemonic.get(c.id),tc=teachingCard(c);return {id:c.id,word:c.word,zh:c.zh,tier:c.tier,icon:m?.icon||c.icon||'📖',tip:m?.cue||tc.memoryTip||c.memoryTip||'',example:m?.example||tc.example||c.example||'',exampleZh:m?.exampleZh||tc.exampleZh||c.exampleZh||'',...positions.get(c.id)};});
if(records.length!==9500||records.some(c=>!c.group||!c.word||!c.zh||!c.example||!c.exampleZh))throw Error('Incomplete vocabulary catalog');
fs.writeFileSync('dist/vocabulary-catalog.json',JSON.stringify(records));
console.log(JSON.stringify({cards:records.length,mp3Groups:manifest.groups.length,bytes:fs.statSync('dist/vocabulary-catalog.json').size}));
