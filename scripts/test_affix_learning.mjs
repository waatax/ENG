import test from 'node:test';
import assert from 'node:assert/strict';
import {AFFIX_LESSONS,renderAffixGuide} from '../dist/affix_guide.mjs';
import {wordStructure,renderWordStructure} from '../dist/word_structure.mjs';
import {createFullWordPractice} from '../dist/full_word_practice.mjs';
test('Guide has concrete examples, accessible audio labels and false-split warnings',()=>{
 assert.equal(AFFIX_LESSONS.length,35);
 assert.equal(AFFIX_LESSONS.flatMap(l=>l.examples).length,140);
 for(const lesson of AFFIX_LESSONS) for(const x of lesson.examples) assert.ok(x.word&&x.split&&x.zh);
 const html=renderAffixGuide();assert.match(html,/family/);assert.match(html,/aria-label="朗讀 unhappy"/);
});
test('Morphology uses explicit headwords; familiar substrings are not false roots',()=>{
 for(const word of ['family','uncle','brother','understand','real'])assert.equal(wordStructure(word),null);
 assert.deepEqual(wordStructure('unhappy').parts.map(p=>p.text),['un','happy']);
 assert.deepEqual(wordStructure('teacher').parts.map(p=>p.text),['teach','er']);
 assert.match(wordStructure('happiness').note,/拼字變化/);
 assert.match(renderWordStructure({word:'family'}),/整字/);
 assert.match(renderWordStructure({word:'teacher'}),/基底詞/);
});
test('Both next controls are gated, preserve scoring, and finish the final card',()=>{
 const cards=[{id:'a',word:'teacher',zh:'教師',pos:'n.',tier:'elem_1000',category:'人物',example:''},{id:'b',word:'unhappy',zh:'不快樂',pos:'adj.',tier:'elem_1000',category:'感受',example:''}];
 const storage={getItem(){return null;},setItem(){}};
 const p=createFullWordPractice(cards,storage,()=>10000,()=>0.3);
 p.action({wpStart:'true'});assert.equal((p.render().match(/data-wp-next/g)||[]).length,0);
 assert.equal(p.action({wpNext:'true'}),false);
 const first=p.current().id;p.answer(p.choices().findIndex(x=>x.right));
 assert.equal((p.render().match(/data-wp-next/g)||[]).length,2);
 assert.equal(p.answer(0),false);
 p.action({wpNext:'true'});assert.notEqual(p.current().id,first);
 assert.equal((p.render().match(/data-wp-next/g)||[]).length,0);
 p.answer(p.choices().findIndex(x=>x.right));assert.match(p.render(),/查看本組成果/);
 p.action({wpNext:'true'});assert.match(p.render(),/這一組完成了/);assert.match(p.render(),/2 \/ 2/);
});
test('Recall does not allow next until self-rating, and spelling exposes structure only after answer',()=>{
 const cards=[{id:'a',word:'teacher',zh:'教師',pos:'n.',tier:'elem_1000',category:'人物',example:''}];
 const p=createFullWordPractice(cards,{getItem(){return null;},setItem(){}});
 p.setting('mode','recall');p.action({wpStart:'true'});p.action({wpReveal:'true'});
 assert.equal((p.render().match(/data-wp-next/g)||[]).length,0);
 p.action({wpRate:'yes'});assert.equal((p.render().match(/data-wp-next/g)||[]).length,2);
 p.setting('mode','spell');p.action({wpStart:'true'});assert.ok(!p.render().includes('morpheme-grid'));
 p.answer('teacher');assert.match(p.render(),/morpheme-grid/);
});
