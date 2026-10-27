import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {createCourse,isScored} from '../dist/quest/engine.mjs';
import {uniqueQuestions,selectDistinct,learningKeys} from '../dist/quest/question_quality.mjs';
const baseline=process.argv.includes('--baseline');
const read=p=>JSON.parse(baseline?execFileSync('git',['show','6f27c3a:'+p],{encoding:'utf8',maxBuffer:10000000}):fs.readFileSync(p));
const index=read('dist/quest/course/index.json'),c=createCourse(index);
for(const track of [...index.sections,...index.branches])c.register(read(`dist/quest/course/${track.id}.json`));
const nodes=[];
for(const n of c.nodes.values()){
 const pool=n.pool.filter(id=>isScored(c.item(id))),targets=uniqueQuestions(pool,c.item,{targets:true}).length,minimum=n.kind==='boss'?12:10;
 if(!baseline){assert.ok(targets>=minimum,`${n.id}: only ${targets} distinct targets`);
 for(let seed=0;seed<10;seed++)assert.equal(selectDistinct(pool,c.item,minimum,{seed:String(seed)}).length,minimum,n.id);}
 nodes.push({id:n.id,kind:n.kind,track:n.track,unit:n.unit,targets,words:new Set(pool.flatMap(id=>learningKeys(c.item(id))).filter(k=>k.startsWith('word:'))).size});
}
const units=[...c.units.keys()].map(id=>({id,targets:uniqueQuestions([...new Set(nodes.filter(n=>n.unit===id).flatMap(n=>c.nodes.get(n.id).pool))].filter(id=>isScored(c.item(id))),c.item,{targets:true}).length}));
const report={version:index.version,baselineCommit:baseline?'6f27c3a':undefined,units:units.length,nodes:nodes.length,thinNodes:nodes.filter(n=>n.targets<(n.kind==='boss'?12:10)).length,sampledFreshLessons:baseline?0:nodes.length*10,minimumNodeTargets:Math.min(...nodes.map(n=>n.targets)),minimumUnitTargets:Math.min(...units.map(u=>u.targets)),sectionNineFirst:nodes.find(n=>n.id==='g12-s1-u1:word'),tracks:[...new Set(nodes.map(n=>n.track))].map(id=>({id,nodes:nodes.filter(n=>n.track===id).length,minTargets:Math.min(...nodes.filter(n=>n.track===id).map(n=>n.targets))})),nodeCapacities:nodes,unitCapacities:units};
fs.mkdirSync('docs/redesign/verification/question-quality',{recursive:true});fs.writeFileSync('docs/redesign/verification/question-quality/'+(baseline?'before':'audit')+'.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,nodeCapacities:undefined,unitCapacities:undefined},null,2));
