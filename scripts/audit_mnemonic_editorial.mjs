import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Converter} from 'opencc-js';
const cards=JSON.parse(fs.readFileSync('dist/mnemonics/cards.json','utf8'));
const rows=fs.readFileSync('data/mnemonic_revision.txt','utf8').trim().split(/\r?\n/).map(line=>line.split('|'));
const labels={s:'國語近音',h:'同音連結',c:'構詞連結',b:'熟悉借音',d:'對比聯想',i:'情境聯想'};
const convert=Converter({from:'cn',to:'tw'}),byWord=new Map(cards.map(c=>[c.word,c]));
assert.equal(cards.length,1000);assert.equal(rows.length,1000);assert.equal(new Set(rows.map(r=>r[0])).size,1000);
for(const [word,code,cue,scene] of rows){
 const c=byWord.get(word);assert.ok(c,word);assert.equal(c.cue,cue);assert.equal(c.scene,scene);assert.equal(c.method,labels[code]);
 assert.ok(cue.length>=4&&cue.length<=40,word+' cue length');assert.ok(scene.length>=8&&scene.length<=100,word+' scene length');
 for(const k of ['cue','scene','link'])assert.equal(c[k],convert(c[k]),word+' '+k+' traditional');
 assert.equal(c.editorialVersion,3);assert.equal(c.kind,c.method);assert.ok(c.icon&&c.zh);
 assert.ok(!/草稿|待補|TODO|先生|同學把名字牌|招牌上寫著|會動的招牌|米爾克|戴斯克|絲絲特|思立普/.test(c.cue+c.scene),word);
 if(['構詞連結','同音連結'].includes(c.method))assert.ok(c.link,word+' must show actual English link');
 assert.equal(c.dictionaryUrl,'https://dictionary.cambridge.org/dictionary/english-chinese-traditional/'+word);
}
assert.equal(new Set(cards.map(c=>c.scene)).size,1000);
assert.equal(new Set(cards.map(c=>c.cue)).size,1000);
const baseline=JSON.parse(fs.readFileSync('data/mnemonic-baseline.json','utf8'));
assert.deepEqual(cards.map(c=>[c.id,c.word]),baseline.map(c=>[c.id,c.word]),'Existing progress IDs stay stable');
// Regression examples encode the editorial decisions behind this correction.
for(const [word,term]of Object.entries({son:'兒子曬太陽',classroom:'上課的房間',teacher:'教的人',wheelchair:'輪子加椅子',knee:'泥沾膝蓋',gloves:'五指分開',mittens:'四指同住'}))assert.ok(byWord.get(word).cue.includes(term),word);
for(const [word,zh]of Object.entries({llama:'美洲駝',hyena:'鬣狗',squid:'魷魚、槍烏賊',highway:'公路、城鎮間的幹道'}))assert.equal(byWord.get(word).zh,zh);
for(const [word,icon]of Object.entries({son:'👦☀️',sun:'☀️👦',knee:'🦵🟤',wheelchair:'♿',gloves:'🧤🖐️',mittens:'🧤✊'}))assert.equal(byWord.get(word).icon,icon);
const counts=Object.fromEntries(Object.values(labels).map(m=>[m,cards.filter(c=>c.method===m).length]));
const report={date:'2026-10-11',version:3,cards:1000,individuallyAuthoredRows:1000,methods:counts,visibleEnglishLinks:cards.filter(c=>c.link).length,uniqueScenes:1000,uniqueCues:1000,traditionalText:true,stableProgressIds:true,regressionExamples:true,limits:'Structural and selected regression checks; they do not rate mnemonic quality or demonstrate learning effectiveness. The editorial source contains the actual per-word decisions.'};
fs.writeFileSync('CONTENT-MNEMONICS-2026-10-11.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
