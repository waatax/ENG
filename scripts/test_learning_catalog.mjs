import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {learningCatalog,filterCatalog,domainOf,domains} from '../dist/learning_catalog.mjs';
import {curriculum} from '../dist/curriculum.mjs';
import {grammarTopics} from '../dist/grammar_content.mjs';
import {UNIFIED_GRADES} from '../dist/curriculum_unified.mjs';
globalThis.localStorage={getItem(){return null},setItem(){}};
const {points}=await import('../dist/knowledge.mjs');
const catalog=learningCatalog(points);
test('Every teaching format is discoverable and has a resolvable, unique route',()=>{
 assert.equal(catalog.length,points.length+grammarTopics.length+curriculum.flatMap(t=>t.chapters).length+UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units)).length);
 assert.equal(new Set(catalog.map(c=>c.link)).size,catalog.length);
 for(const c of catalog){assert.ok(c.title&&c.description);assert.ok(domains.some(d=>d[0]===c.domain));const [route,...ids]=c.link.slice(1).split('/');
 if(route==='knowledge')assert.ok(points.some(p=>p.id===ids[0]));
 else if(route==='chapter')assert.ok(curriculum.find(t=>t.id===ids[0])?.chapters.some(p=>p.id===ids[1]));
 else if(route==='grammar')assert.ok(grammarTopics.some(p=>p.id===ids[0]));
 else {assert.equal(route,'unit');assert.ok(UNIFIED_GRADES.some(g=>g.semesters.some(s=>s.units.some(u=>u.id===ids[0]))));}}
});
test('Classification avoids English substrings and prioritizes specific grammar skills',()=>{
 assert.equal(domainOf('授予動詞、使役動詞與完成式進階 (Dative & Causative Verbs)'),'sentences');
 assert.equal(domainOf('關係代名詞受格省略與介系詞搭配'),'sentences');
 assert.equal(domainOf('第一個完整句子：I am、you are、she is'),'sentences');
 assert.equal(domainOf('GRE General Exam 語意與論證'),'reading');
 assert.equal(domainOf('工場安全與指令'),'application');
});
test('Combined filters preserve all query terms, stage and domain constraints',()=>{
 const results=filterCatalog(catalog,'被動 操作','高工','sentences');assert.ok(results.length);
 assert.ok(results.every(c=>c.domain==='sentences'&&['高工','高中／高工'].includes(c.stage)));
 assert.equal(filterCatalog(catalog,'impossible-search', '國小','sounds').length,0);
 assert.equal(filterCatalog(catalog,'   ').length,catalog.length);
});
test('All shared learning assets are included in both deployment roots',()=>{
 for(const f of ['learning_catalog.mjs','learning_navigation.mjs','learning_experience.css'])assert.equal(readFileSync('dist/'+f,'utf8'),readFileSync('site/dist/'+f,'utf8'));
});
