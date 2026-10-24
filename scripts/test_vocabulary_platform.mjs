import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {wordAtTime} from '../dist/vocabulary_card.mjs';
const catalog=JSON.parse(fs.readFileSync('dist/vocabulary-catalog.json'));
test('All 9500 stable card IDs resolve to the exact MP3 group, word, translation and starting position',()=>{
 assert.equal(catalog.length,9500);assert.equal(new Set(catalog.map(c=>c.id)).size,9500);
 const manifest=JSON.parse(fs.readFileSync('dist/audio/words/manifest.json'));let count=0;
 for(const group of manifest.groups){const data=JSON.parse(fs.readFileSync('dist/audio/words/'+group.id+'.json'));for(const w of data.words){const c=catalog.find(c=>c.id===w.id);assert.ok(c);assert.equal(c.group,group.id);assert.equal(c.word.trim(),w.en.trim());assert.equal(c.zh.trim(),w.zh.trim());assert.equal(c.start,w.start);assert.ok(c.icon);count++;}}
 assert.equal(count,9500);assert.equal(new Set(catalog.map(c=>c.tier)).size,8);
});
test('All 28500 MP3 repetitions flip at their recorded English and Chinese boundaries',()=>{
 const manifest=JSON.parse(fs.readFileSync('dist/audio/words/manifest.json'));let count=0;
 for(const group of manifest.groups){const {words}=JSON.parse(fs.readFileSync('dist/audio/words/'+group.id+'.json'));for(const w of words){for(const r of w.repetitions){const en=wordAtTime(words,r.en),zh=wordAtTime(words,r.zh);assert.equal(en.word.id,w.id);assert.equal(en.back,false);assert.equal(zh.word.id,w.id);assert.equal(zh.back,true);assert.equal(zh.round,r.round);count++;}}}
 assert.equal(count,28500);
});
