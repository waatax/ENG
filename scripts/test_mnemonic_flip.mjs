import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {speechPhase} from '../dist/mnemonics/card_player.mjs';
test('Every card follows its actual MP3 boundaries, including pauses and seeking backwards',()=>{
 const manifest=JSON.parse(fs.readFileSync('dist/mnemonics/audio-manifest.json'));
 const timing=JSON.parse(fs.readFileSync('dist/mnemonics/card-timings.json'));
 assert.equal(Object.keys(timing).length,1000);
 for(const record of manifest.records){const parts=timing[record.id];assert.deepEqual(parts,record.parts.map(({start,end})=>({start,end})));
 for(const index of [0,1,2,3,2,0]){assert.deepEqual(speechPhase(parts,parts[index].start),{index,back:index===1||index===2});}
 assert.equal(speechPhase(parts,parts[1].start-.001).back,false);assert.equal(speechPhase(parts,parts[3].start-.001).back,true);
 }
});
