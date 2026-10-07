import test from 'node:test';
import assert from 'node:assert/strict';
import {tracks} from '../dist/EN/content.mjs';
import {readFileSync} from 'node:fs';
test('Five English courses have complete original lesson cycles and precise answer keys',()=>{
 assert.deepEqual(tracks.map(t=>t.id),['toefl','toeic','sat','gmat','gre']);
 assert.equal(tracks.flatMap(t=>t.lessons).length,20);
 for(const t of tracks)for(const l of t.lessons){for(const k of ['title','goal','rule','example','task'])assert.ok(l[k].length>10);assert.equal(l.words.length,6);for(const w of l.words){assert.equal(w.length,3);assert.ok(w.every(x=>x.length>3));}for(const q of l.questions){assert.equal(q[1].length,3);assert.equal(q[1].filter(x=>x===q[2]).length,1);assert.ok(q[3].length>20);}}
 assert.ok(!/[\u3400-\u9fff]/u.test(JSON.stringify(tracks)));
});
test('English edition assets match deployment mirror',()=>{for(const f of ['index.html','academy.css','academy.mjs','content.mjs','extended.mjs'])assert.equal(readFileSync('dist/EN/'+f).compare(readFileSync('site/dist/EN/'+f)),0);});
