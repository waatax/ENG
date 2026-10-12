// Release gate for GitHub Pages (no third-party dependencies, runs in CI before upload):
// 1,000 v6 cards + 4-part MP3s, 500 word families + MP3s, matching text/order/hashes, and the 1 GB site budget.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const cards=read('dist/mnemonics/cards.json'),baseline=read('data/mnemonic-baseline.json'),audio=read('dist/mnemonics/audio-manifest.json');
const families=read('dist/roots/groups.json'),familyAudio=read('dist/roots/audio-manifest.json');
const spokenMeaning=t=>t.replace(/\([^)]*\)|（[^）]*）/g,'').replace(/[、；;]/g,'，').replace(/^[ ，]+|[ ，]+$/g,'');

assert.equal(cards.length,1000);assert.deepEqual(cards.map(c=>[c.id,c.word]),baseline.map(c=>[c.id,c.word]));
assert.equal(new Set(cards.map(c=>c.cue)).size,1000);
assert.equal(audio.version,4);assert.deepEqual(audio.order,['english','cue','meaning','english-repeat']);assert.equal(audio.records.length,1000);
for(const [i,c] of cards.entries()){
 assert.equal(c.editorialVersion,6,c.word);assert.ok(c.example&&c.exampleZh&&c.spell&&c.soundBridge?.note,c.word);
 if(['諧音聯想','外來語借音'].includes(c.method))assert.ok(c.hook&&c.cue.includes(c.hook),c.word);
 const r=audio.records[i],en=c.displayWord||c.word;assert.equal(r.id,c.id);assert.equal(r.word,c.word);
 assert.deepEqual(r.parts.map(p=>p.text),[en,c.cue,spokenMeaning(c.zh),en],c.word);
 const mp3=fs.readFileSync(path.join('dist/mnemonics',r.file));assert.equal(mp3.length,r.bytes,c.word);assert.equal(sha(mp3),r.sha256,c.word);
}

const groups=families.groups;assert.equal(groups.length,500);assert.equal(familyAudio.records.length,500);
assert.deepEqual(families.counts,{'複合詞字族':150,'字首':70,'字尾':60,'字根':220});
const label={c:'字族',p:'字首',s:'字尾',r:'字根'};
const header=g=>g.type==='c'?g.variants[0]:g.variants[0].toUpperCase().split('').join(' ');
const meaning=g=>label[g.type]+'，'+g.meaning.replace(/（[^）]*）|\([^)]*\)/g,'').replace(/[、；;]/g,'，').replaceAll('⋯','某某').replace(/^，+|，+$/g,'');
const member=t=>t.replace(/（[^）]*）|\([^)]*\)/g,'').replace(/[、；;／/]/g,'，').replaceAll('⋯','某某').replace(/^[ ，]+|[ ，]+$/g,'');
const cardIds=new Set(cards.map(c=>c.id));
for(const [i,g] of groups.entries()){
 assert.equal(g.id,'wf-'+String(i+1).padStart(3,'0'));assert.ok(g.members.length>=3&&g.members.length<=7,g.id);
 for(const link of g.cards)assert.ok(cardIds.has(link.id),g.id);
 const r=familyAudio.records[i];assert.equal(r.id,g.id);
 const expected=[header(g),meaning(g),...g.members.flatMap(m=>[m.word,member(m.zh)])];
 assert.deepEqual(r.parts.map(p=>p.text),expected,g.id);
 const mp3=fs.readFileSync(path.join('dist/roots',r.file));assert.equal(mp3.length,r.bytes,g.id);assert.equal(sha(mp3),r.sha256,g.id);
}
for(const c of cards)for(const f of c.families||[])assert.ok(groups.some(g=>g.id===f.id),c.word);

for(const file of ['dist/mnemonics/index.html','dist/mnemonics/app.mjs','dist/roots/index.html','dist/roots/app.mjs'])assert.ok(fs.readFileSync(file,'utf8').includes('keyword6r2'),file+' cache tag');
assert.ok(fs.readFileSync('dist/mnemonics/mnemonic_playlist.mjs','utf8').includes("AUDIO_VERSION='keyword6r2'"));
function bytesIn(folder){return fs.readdirSync(folder,{withFileTypes:true}).reduce((sum,e)=>sum+(e.isDirectory()?bytesIn(path.join(folder,e.name)):fs.statSync(path.join(folder,e.name)).size),0);}
const totalBytes=bytesIn('dist');assert.ok(totalBytes<1_000_000_000,'Static site exceeds conservative 1 GB hosting budget');
console.log(JSON.stringify({cards:1000,cardMp3s:1000,cardParts:4000,families:500,familyMp3s:500,familyParts:familyAudio.records.reduce((n,r)=>n+r.parts.length,0),hashes:true,matchingText:true,totalBytes}));
