import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
const groups=JSON.parse(readFileSync('data/word_audio/groups.json','utf8'));
test('All 9500 existing flashcards appear exactly once in 190 50-word groups',()=>{
 assert.equal(groups.length,190);assert.equal(groups.flatMap(g=>g.words).length,9500);
 assert.equal(new Set(groups.flatMap(g=>g.words.map(w=>w.id))).size,9500);
 for(const [tier,count] of [['elem_1000',20],['jhs_2000',40],['shs_3000',60],['toeic',14],['toefl',14],['sat',14],['gre',14],['gmat',14]]){const list=groups.filter(g=>g.tier===tier);assert.equal(list.length,count);for(const [i,g] of list.entries()){assert.equal(g.start,i*50+1);assert.equal(g.end,(i+1)*50);assert.equal(g.words.length,50);}}
});
test('Every final MP3 has all bilingual words and three ordered English-Chinese rounds',()=>{
 const manifest=JSON.parse(readFileSync('dist/audio/words/manifest.json','utf8'));assert.equal(manifest.totalGroups,190);assert.equal(manifest.totalWords,9500);assert.equal(manifest.repeat,3);
 for(const expected of groups){const g=JSON.parse(readFileSync('dist/audio/words/'+expected.id+'.json','utf8'));assert.equal(g.wordCount,50);assert.equal(g.words.length,50);let end=0;for(const [i,w] of g.words.entries()){assert.equal(w.id,expected.words[i].id);assert.equal(w.en,expected.words[i].en);assert.equal(w.zh,expected.words[i].zh);assert.ok(w.start>=end-.001);assert.equal(w.repetitions.length,3);let previous=w.start-.001;for(const [j,r] of w.repetitions.entries()){assert.equal(r.round,j+1);assert.ok(r.en>=previous);assert.ok(r.zh>r.en);previous=r.zh;}assert.ok(w.end>previous);end=w.end;}assert.ok(Math.abs(end-g.duration)<.15);assert.equal(statSync('dist/audio/words/'+g.file).size,g.bytes);assert.ok(g.bytes>100000);assert.equal(readFileSync('dist/audio/words/'+g.file).compare(readFileSync('site/dist/audio/words/'+g.file)),0);}
});
test('MP3 route, duration labels and unsafe route handling are predictable',async()=>{
 globalThis.localStorage={getItem(){return null},setItem(){}};
 const mod=await import('../dist/word_mp3.mjs');assert.equal(mod.formatDuration(744), '12:24');assert.equal(mod.formatDuration(65),'1:05');mod.setWordAudioGroup('senior-060');assert.equal(mod.wordAudioRoute(),'#wordaudio/senior-060');mod.setWordAudioGroup('../../other');assert.equal(mod.wordAudioRoute(),'#wordaudio/senior-060');
});
