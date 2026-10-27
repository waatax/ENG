import fs from 'node:fs';
import {createCourse} from '../dist/quest/engine.mjs';
import {makePlacement,placementReport,refinePlacement,FOUNDATION_BANDS} from '../dist/quest/placement.mjs';
const index=JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const c=createCourse(index);for(const s of index.sections)c.register(JSON.parse(fs.readFileSync(`dist/quest/course/${s.id}.json`)));
function random(seed){let n=seed;return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};}
const rows=[];
for(const masteryChance of [.85,.75]) for(const size of [10,20,30]){
 let distance=0,near=0,count=0;
 for(let seed=1;seed<=15;seed++){
  const blueprint=makePlacement(c,size,seed);
  for(let mastered=0;mastered<=7;mastered++){
   const plan=structuredClone(blueprint),rng=random(seed*931+mastered*71),results=[];
   for(let i=0;i<plan.size;i++){
    const slot=plan.slots[i];
    const q=c.item(slot.id),p=slot.advanced ? .4 : slot.band<mastered?masteryChance:q.options?.length?1/q.options.length:.08;
    results.push({id:slot.id,ok:rng()<p,hint:false,repair:false,audio:true});
    refinePlacement(plan,results,c,seed);
   }
   const report=placementReport(plan,results,c),expected=Math.min(6,mastered),delta=Math.abs(FOUNDATION_BANDS.findIndex(x=>x.id===report.recommended)-expected);
   distance+=delta;near+=delta<=1?1:0;count++;
  }
 }
 rows.push({masteryChance,size,syntheticProfiles:count,meanGeneralBandDistance:Number((distance/count).toFixed(3)),withinOneGeneralBand:Number((near/count).toFixed(3))});
}
const report={date:'2026-10-27',purpose:'Seven merged general bands; advanced probe correctness is independently simulated at 0.4 and does not determine the general frontier. Algorithm sensitivity checks only. Synthetic independent responses use assumed probabilities, not real learners, calibrated items, formal CEFR accuracy or educational effectiveness.',rows};
fs.mkdirSync('docs/redesign/verification/advanced20261027',{recursive:true});fs.writeFileSync('docs/redesign/verification/advanced20261027/placement-sensitivity.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
