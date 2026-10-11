import test from 'node:test';
import assert from 'node:assert/strict';
import {createJourney,journeyCatalog,relatedLessons,learningPaths} from '../dist/learning_journey.mjs';
import {filterCatalog} from '../dist/learning_catalog.mjs';
import {skillFramework} from '../dist/learning_framework.mjs';
test('All catalog pages have valid distinct recommendations and path targets',()=>{
  assert.equal(journeyCatalog.length,117);
  for(const c of journeyCatalog){assert.ok(c.skills.includes(c.domain));assert.ok(relatedLessons(c).every(r=>r.link!==c.link && r.domain===c.domain));const f=skillFramework[c.domain];assert.ok(f.prior&&f.goal&&f.recall&&f.transfer);assert.ok(journeyCatalog.some(r=>r.link===f.repair)||f.repair==='#phonics');}
  for(const [,route] of learningPaths().matchAll(/href="(#[^"]+)"/g)) assert.ok(journeyCatalog.some(c=>c.link===route)||['#wordaudio','#affixes','#schoolwords','#phonics'].includes(route),route);
  assert.ok(filterCatalog(journeyCatalog,'passive').some(c=>c.link==='#grammar/passive'));
  for(const [route,domain] of [['#knowledge/countability','sentences'],['#knowledge/argument-assumptions','reading'],['#grammar/present-past','sentences']])assert.equal(journeyCatalog.find(c=>c.link===route).domain,domain);
});
test('Saved lessons, visits and spaced recall survive reload without premature promotion',()=>{
  let time=100000, data='{}';const storage={getItem:()=>data,setItem:(k,v)=>{data=v;}};
  let j=createJourney(storage,()=>time);const route=journeyCatalog[0].link;
  assert.equal(j.visit('#unknown'),false);j.visit(route);j.toggle(route);
  j.recall(route,true);assert.equal(j.records[route].due,time+86400000);
  j.recall(route,true);assert.equal(j.records[route].step,0);
  j=createJourney(storage,()=>time);assert.equal(j.list('saved')[0].link,route);assert.equal(j.list('recent')[0].link,route);
  time+=86400000;assert.equal(j.list('due').length,1);
  j.recall(route,true);assert.equal(j.records[route].due,time+3*86400000);
  time+=3*86400000;j.recall(route,true);assert.equal(j.records[route].due,time+7*86400000);
  j.recall(route,false);assert.equal(j.records[route].step,0);assert.equal(j.records[route].due,time+86400000);
  j.toggle(route);assert.equal(j.list('saved').length,0);
});
test('Corrupt or blocked storage preserves usable interactions and explicit warning',()=>{
  const j=createJourney({getItem:()=>'{',setItem(){throw Error('blocked');}});
  assert.ok(j.warning);j.toggle(journeyCatalog[0].link);assert.equal(j.list('saved').length,1);assert.ok(j.warning);
  const bad=createJourney({getItem:()=>JSON.stringify({'#unknown':{saved:true},[journeyCatalog[0].link]:{saved:true,step:999,due:'bad'}}),setItem(){}});
  assert.equal(bad.list('saved').length,1);assert.equal(bad.list('due').length,0);assert.equal(bad.records[journeyCatalog[0].link].step,3);
});
