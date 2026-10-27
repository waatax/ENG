import fs from 'node:fs';
import assert from 'node:assert/strict';
import {listening} from '../data/exams/simulation-listening.mjs';
import {multiReading} from '../data/exams/simulation-multireading.mjs';
import {items,clozeGroups,readingGroups,structure,mixed,writing,geptVocab,responseQuestions,extraConversation,greSpecial} from '../data/exams/simulation-originals.mjs';
const existing=JSON.parse(fs.readFileSync('dist/quest/course/exams.json')).items;
const normalize=q=>{const options=q.options||[];return {...q,passage:q.passage||q.text||'',type:q.type||'choice',answer:typeof q.answer==='number'||Array.isArray(q.answer)?q.answer:q.type==='multi'?q.correctAnswers.map(a=>options.indexOf(a)):options.length?options.indexOf(q.answer):q.answer,group:q.group||q.family||q.id};};
const fresh=[...items,...listening,...multiReading].map(normalize),old=existing.map(normalize);
const pick=(exam,skill,n,offset=0)=>{const pool=old.filter(q=>q.exam===exam&&q.skill===skill);assert.ok(pool.length>=n+offset,`${exam} ${skill}`);return pool.slice(offset,n+offset);};
// Fixed-form practice, with real section lengths. Question order is stable for reproducibility.
const pictures=[];
const scenes=[
['M40 130h160v12H40z M60 70h70v50H60z M70 50h50v20H70z M155 85h35v35h-35z','Boxes are stacked on a table.','Someone is opening a window.','A vehicle is being repaired.','The shelves are empty.'],
['M35 135h170v5H35z M60 65h12v60H60z M100 65h12v60h-12z M140 65h12v60h-12z M55 50h105v12H55z','Several books are standing on a shelf.','A man is sweeping the floor.','The door is being painted.','The books are lying on the ground.'],
['M45 100h140v8H45z M55 108h8v40h-8z M165 108h8v40h-8z M80 65h55v30H80z M100 95h15v5h-15z','A computer is sitting on a desk.','A worker is carrying a ladder.','A screen is hanging from the ceiling.','The desk is being moved.'],
['M50 120h150v8H50z M60 65h70v55H60z M140 90h40v30h-40z M70 55h50v10H70z','A suitcase is next to a smaller bag.','Someone is watering plants.','A traveler is boarding a train.','A bag is hanging on a wall.'],
['M100 60h30v60h-30z M75 120h80v20H75z M75 35h80v25H75z M105 140h20v15h-20z','A lamp is standing on a base.','Several chairs are being folded.','A man is changing a light bulb.','The lamps are packed in boxes.'],
['M40 130h170v8H40z M65 70h60v60H65z M60 60h70v10H60z M80 35h12v25H80z M100 25h12v35h-12z M155 90h25v40h-25z','A plant pot is beside a cup.','A tree is being cut down.','Someone is drinking from a bottle.','A cup is under the table.']
];
scenes.forEach(([path,...statements],i)=>pictures.push(normalize({id:'sim-picture-'+i,skill:'picture',type:'listen',prompt:'Look at the illustration. Choose the statement that best describes it.',options:['A','B','C','D'],answer:0,audio:statements.map((s,j)=>String.fromCharCode(65+j)+'. '+s).join(' '),why:statements[0]+' 圖片為本站原創示意圖，非官方照片。',illustration:path,group:'sim-picture-'+i})));
const byIds=qs=>qs.map(q=>fresh.find(x=>x.id===q.id));
const gsat=[...fresh.filter(q=>q.skill==='vocabulary'&&!q.id.includes('gept')),...clozeGroups.flatMap(byIds),...byIds(structure),...readingGroups.flatMap(byIds),...byIds(mixed),...byIds(writing)];
const discourse=gsat.filter(q=>q.skill==='discourse'),wordBank=discourse.map(q=>q.options[q.answer]);
const discoursePassage='A coastal school organized a community research project that combined environmental observation with local history. First, students [1] the movements of birds near the harbor. Their findings [2] that changes in lighting may influence the routes birds take. Because weather conditions also varied, the students adopted a [3] approach and avoided claiming that lighting was the only cause. Residents reported unusual sightings [4] the study. The value of these reports would [5] on how carefully the observations were recorded.\n\nThe students also interviewed older residents about changes along the coast. Before recording an interview, they obtained the speaker’s [6]. They discovered that personal memories did not always [7] with dated photographs. Comparing several accounts [8] the limits of each individual source. In their final exhibition, the students distinguished a historical event from a resident’s [9] of it. Maps, photographs, and interview quotations were displayed together so that visitors could examine the [10] and reach their own conclusions.';
for(const [i,q] of discourse.entries()){q.answer=wordBank.indexOf(q.options[q.answer]);q.options=wordBank;q.passage=discoursePassage;q.group='sim-discourse';q.prompt=`Choose ONE word from the shared ten-word bank for [${i+1}].`;}
function threePerGroup(skill){const groups=new Map();for(const q of pick('toeic',skill,36)){const g=groups.get(q.group)||[];if(g.length<3)g.push(q);groups.set(q.group,g);}return [...groups.values()].flat();}
const conv=[...threePerGroup('conversation'),...byIds(extraConversation),...fresh.filter(q=>q.id.startsWith('sim-listening')&&q.skill==='conversation')];
const talks=[...threePerGroup('talk'),...fresh.filter(q=>q.id.startsWith('sim-listening')&&q.skill==='talk')];
const textCompletion=clozeGroups.flatMap(qs=>qs.slice(0,4).map(normalize).map(q=>({...q,id:'toeic-'+q.id,skill:'text-completion',passage:q.passage.replace('[5]',qs[4].options[qs[4].answer])})));
const singleReading=[...pick('toeic','reading',28),old.find(q=>q.exam==='toeic'&&q.skill==='reading'&&q.original===false)];
assert.ok(singleReading.at(-1),'single-document reading question');
const toeic=[...pictures,...byIds(responseQuestions),...conv,...talks,...pick('toeic','language',30),...textCompletion,...singleReading,...fresh.filter(q=>q.id.startsWith('sim-multireading'))];
const gept=[...pictures.slice(0,5).map(q=>({...q,id:'gept-'+q.id})),...byIds(responseQuestions).slice(0,10),...conv.slice(0,10),...talks.slice(0,10),...byIds(geptVocab),...clozeGroups.slice(0,2).flatMap(byIds),...readingGroups.flatMap(byIds),...pick('toeic','reading',3,48)];
const sat=[];
for(let module=0;module<2;module++)for(const [skill,n] of [['craft',7],['information',7],['conventions',7],['expression',6]])sat.push(...pick('sat',skill,n,module*n));
const gre=[...pick('gre','completion',3),...byIds(greSpecial).slice(0,1),...pick('gre','equivalence',3),...pick('gre','reading',4),...byIds(greSpecial).slice(2,3),...pick('gre','completion',3,15),...byIds(greSpecial).slice(1,2),...pick('gre','equivalence',4,15),...pick('gre','reading',6,15),...byIds(greSpecial).slice(3,4)];
const gmat=[...pick('gmat','critical',13),...pick('gmat','reading',10)];
// Expand imported four-choice GRE items with item-specific distractors.
const extraCompletion=['cumbersome','originality','definitive','invincible','inquisitive','charged'];
gre.filter(q=>q.skill==='completion'&&q.options.length===4).forEach((q,i)=>q.options=[...q.options,extraCompletion[i]]);
const extraReading=['Tree planting is unnecessary whenever roads are narrow.','The average height of buildings','Compare only residents’ favorite streets.','Confident that road width alone explains every temperature difference','An increase in petitions in an unrelated century','Specialists can thrive only when competition is absent.','Local resource fluctuations cannot ever be measured.','Generalists decline whenever local resources change.','Replaces observations with a purely historical account','All surviving letters were written to publishers.'];
gre.filter(q=>q.skill==='reading'&&q.options.length===4).forEach((q,i)=>q.options=[...q.options,extraReading[i]]);
const geptWriting=[{...byIds(writing)[0],id:'sim-gept-translation',prompt:'Translate into English: 我們社區最近開了一間工具圖書館。居民可以借用不常使用的工具，而不必購買。如果工具損壞，請立刻通知志工。',answer:'A tool library recently opened in our community. Residents can borrow tools they do not use often instead of buying them. If a tool is damaged, please inform a volunteer immediately.',rubric:'中譯英 40%：內容完整、前後連貫、句構、文法、用字與拼字。'}, {...byIds(writing)[2],id:'sim-gept-composition',prompt:'Write about 120 words (8–12 sentences). Describe a time when someone helped you learn a new skill. Explain what was difficult, what the person did, and how you felt afterward.',rubric:'作文 60%：回應任務、組織連貫、句構文法、用字拼字。'}];
const bank={version:'simulation20261027',forms:{gsat,gept,toeic,sat,gre,gmat,'gept-writing':geptWriting}};
// Deterministic option permutations remove answer-position cues. Shared GSAT banks
// retain the same order across their associated gaps.
function order(n,key){let h=2166136261;for(const c of key)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;const p=Array.from({length:n},(_,i)=>i);for(let i=n-1;i>0;i--){h=(Math.imul(h,1664525)+1013904223)>>>0;const j=h%(i+1);[p[i],p[j]]=[p[j],p[i]];}return p;}
for(const [id,rows] of Object.entries(bank.forms))bank.forms[id]=rows.map(q=>{
 if(q.illustration){const statements=q.audio.split(/ [BCD]\. /);statements[0]=statements[0].replace(/^A\. /,'');const p=order(4,q.id);return {...q,answer:p.indexOf(0),audio:p.map((i,j)=>String.fromCharCode(65+j)+'. '+statements[i]).join(' ')};}
 if(!q.options.length||q.type==='sentence')return structuredClone(q);
 if(id==='gept'&&q.skill==='response'){const extra=['The cardboard can be recycled.','Invoices are printed in black.','The training room has windows.','The paper is made from recycled material.','The shipment contains office supplies.','The equipment weighs twenty kilograms.','The appointment card is white.','The contract has six pages.','The park has many trees.','The album has twelve songs.'];q={...q,options:[...q.options,extra[Number(q.id.split('-').at(-1))]]};}
 const key=q.skill==='discourse'?'shared-discourse':q.skill==='structure'?'shared-structure':q.id,p=order(q.options.length,key);
 const a=Array.isArray(q.answer)?q.answer.map(i=>p.indexOf(i)):p.indexOf(q.answer);
 const result={...q,options:p.map(i=>q.options[i]),answer:a};
 // Photographic answers are spoken only; here the letters must retain audio order.
 if(q.skill==='response'&&id==='toeic')return {...result,spokenOptions:result.options,options:['A','B','C']};
 return result;
});
const counts={gsat:52,gept:70,toeic:200,sat:54,gre:27,gmat:23,'gept-writing':2};
for(const [id,qs] of Object.entries(bank.forms)){
 assert.equal(qs.length,counts[id],id);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length,id+' duplicate IDs');
 const fingerprints=qs.map(q=>JSON.stringify([q.passage,q.prompt,q.audio,q.options]));assert.equal(new Set(fingerprints).size,qs.length,id+' repeated questions');
 for(const q of qs){assert.ok(q.why&&q.prompt,q.id);if(q.options.length&&typeof q.answer==='number')assert.ok(q.answer>=0&&q.answer<q.options.length,q.id);}
}
for(const root of ['dist','site/dist'])fs.writeFileSync(root+'/quest/course/simulation.json',JSON.stringify(bank)+'\n');
console.log(JSON.stringify({version:bank.version,forms:counts,total:Object.values(counts).reduce((a,b)=>a+b,0),newOriginals:items.length+listening.length+multiReading.length+6},null,2));
