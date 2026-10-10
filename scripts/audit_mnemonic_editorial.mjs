import fs from 'node:fs';
import assert from 'node:assert/strict';
import {Converter} from 'opencc-js';
const cards=JSON.parse(fs.readFileSync('dist/mnemonics/cards.json','utf8'));
const rows=fs.readFileSync('data/mnemonic_editorial.tsv','utf8').trim().split(/\r?\n/).map(line=>line.split('\t'));
const convert=Converter({from:'cn',to:'twp'});
assert.equal(cards.length,1000);assert.equal(rows.length,933);assert.equal(new Set(rows.map(r=>r[0])).size,933);
const byWord=new Map(cards.map(c=>[c.word,c]));
for(const [word,cue,scene]of rows){const c=byWord.get(word);assert.ok(c,word);assert.equal(c.origin,'本次補齊');assert.equal(c.cue,cue);assert.equal(c.scene,scene);assert.ok(scene.length>=12&&scene.length<=90,word);assert.equal(cue,convert(cue),word+' cue traditional');assert.equal(scene,convert(scene),word+' scene traditional');}
for(const c of cards){assert.equal(c.kind,'正式聯想');assert.equal(c.editorialVersion,2);assert.ok(c.zh&&c.icon&&c.cue&&c.scene);assert.ok(!/草稿|待補|TODO|招牌上寫著|會動的招牌/.test(c.scene+c.cue),c.word);}
assert.equal(new Set(cards.map(c=>c.scene)).size,1000);
const baseline=JSON.parse(fs.readFileSync('site/dist/mnemonics/cards.json','utf8'));
assert.deepEqual(cards.map(c=>[c.id,c.word]),baseline.map(c=>[c.id,c.word]),'Existing progress IDs must stay stable');
const report={date:'2026-10-11',completed:1000,newlyWritten:933,drafts:0,uniqueWords:1000,uniqueScenes:1000,editorialRowsMatch:true,traditionalText:true,stableProgressIds:true,notes:'Checks verify content structure and editorial coverage. Sound cues are approximate mnemonics; this is not external teacher certification.'};
fs.writeFileSync('CONTENT-MNEMONICS-2026-10-11.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
