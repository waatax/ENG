// Record all editorial changes against the fixed previous release commit.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const old=JSON.parse(execFileSync('git',['show','877d759:dist/mnemonics/cards.json'],{encoding:'utf8',maxBuffer:8*1024*1024}));
const current=JSON.parse(fs.readFileSync('dist/mnemonics/cards.json','utf8'));
assert.deepEqual(old.map(c=>[c.id,c.word]),current.map(c=>[c.id,c.word]));
const changes=current.map((c,i)=>({word:c.word,id:c.id,previousCue:old[i].cue,cue:c.cue,scene:c.scene,method:c.method,link:c.link,previousMeaning:old[i].zh,meaning:c.zh,previousIcon:old[i].icon,icon:c.icon,cueChanged:old[i].cue!==c.cue}));
assert.equal(changes.filter(c=>c.cueChanged).length,1000);
fs.writeFileSync('data/mnemonic-revision-review.json',JSON.stringify({version:3,date:'2026-10-11',baselineCommit:'877d759',criteria:['自然國語，避免虛構音譯人名','聲音、形態或語義連結必須明示','聯想必須對應本卡詞義','畫面可想像且有動作、位置或對比','近音與非近音方法分開標示'],limits:'由 AI 逐詞編寫與校正；此檔是編輯變更紀錄，不是外部教師認證或學習效果評分。',changes},null,2));
console.log(JSON.stringify({revised:changes.length,changedCues:1000,meaningCorrections:changes.filter(c=>c.meaning!==c.previousMeaning).length}));
