import { questionKey, learningKeys } from './question_quality.mjs?v=quality20261027';
import { ADVANCED_TRACKS, ADVANCED_ITEMS } from './advanced_placement.mjs?v=advanced20261027';
// Curriculum placement heuristic, not a calibrated CEFR/IRT test.
export const PLACEMENT_SIZES = [10, 20, 30];
export const skillLabel = { vocabulary: '字詞', grammar: '句型與文法', reading: '閱讀與情境', listening: '聽辨' };
export const skillOf = it => it.type === 'listen' || (it.type === 'input' && it.audio && !it.text) ? 'listening' : it.passage || it.kind === 'talk' ? 'reading' : it.kind === 'word' ? 'vocabulary' : 'grammar';
const signature = it => JSON.stringify([it.prompt, it.text || '', it.audio || '', it.passage || '', [...(it.options || [])].sort()]);
const hash = str => { let n = 2166136261; for (const c of str) n = Math.imul(n ^ c.charCodeAt(0), 16777619); return n >>> 0; };
function candidates(course, section) {
  const sec = course.track(section);
  return [...new Set(sec.units.flatMap(u => u.nodes.filter(n => n.kind !== 'boss').flatMap(n => course.nodes.get(n.id)?.pool || [])))].map(id => course.item(id)).filter(it => it && ['choice', 'input', 'build', 'listen'].includes(it.type) && it.answer && it.why);
}
function pick(course, section, slots, salt, records) {
  const used = new Set(slots.map(x => signature(course.item(x.id))));
  const targets=new Set(slots.flatMap(x=>learningKeys(course.item(x.id))));
  const skills = Object.keys(skillLabel), target = skills[slots.length % skills.length];
  const options = candidates(course, section).filter(it => !used.has(signature(it))&&!targets.has(questionKey(it))&&!learningKeys(it).some(k=>targets.has(k)));
  options.sort((a,b) => {
    const rank = it => (records[it.id]?.s ? 100 : 0) + (skillOf(it) === target ? 0 : 10);
    return rank(a) - rank(b) || hash(a.id + salt) - hash(b.id + salt);
  });
  const it = options[0];
  return it ? { id: it.id, section, skill: skillOf(it), seen: !!records[it.id]?.s } : null;
}
export function makeLegacyPlacement(course, size = 20, seed = 1, records = {}) {
  if (!PLACEMENT_SIZES.includes(Number(size))) return null;
  size = Number(size);
  const sections = course.index.sections.map(x => x.id), slots = [];
  const anchors = Math.floor(size / sections.length) * sections.length;
  for (let i = 0; i < size; i++) {
    const section = sections[i % sections.length];
    const slot = pick(course, section, slots, String(seed) + ':' + i, records);
    if (!slot) return null;
    slots.push(slot);
  }
  return { version: 1, size, anchors, slots };
}
function legacyReport(plan, results, course) {
  const scored = results.filter(r => !r.repair);
  const rows = course.index.sections.map(s => {
    const rs = scored.filter(r => plan.slots.find(x => x.id === r.id)?.section === s.id);
    return { section:s.id, title:s.title, level:s.level, n:rs.length, correct:rs.filter(r => r.ok && !r.hint).length };
  });
  // Fit a single change point using all sections; one isolated early miss cannot block every higher level.
  const fits = Array.from({length:rows.length + 1},(_,k) => ({ k, score:scored.reduce((total,r) => {
    const slot = plan.slots.find(x => x.id === r.id), ix = rows.findIndex(x => x.section === slot?.section);
    if (ix < 0 || slot.skill==='listening' && (!r.audio || r.transcript)) return total;
    const it = course.item(r.id), guess = it.options?.length ? 1 / it.options.length : .08;
    const p = ix < k ? .85 : guess;
    return total + Math.log(r.ok && !r.hint ? p : 1-p);
  },0) }));
  fits.sort((a,b) => b.score-a.score || a.k-b.k);
  const best = fits[0], plausible = fits.filter(x => x.score >= best.score-2).map(x => Math.min(rows.length-1,x.k));
  let low = Math.min(...plausible), high = Math.max(...plausible);
  if (plan.size === 10) { low = Math.max(0,Math.min(low,Math.min(best.k,rows.length-1)-1)); high = Math.min(rows.length-1,Math.max(high,best.k+1)); }
  const skills = Object.entries(skillLabel).map(([id,label]) => {
    const rs = scored.filter(r => plan.slots.find(x => x.id === r.id)?.skill === id);
    const valid = id==='listening' ? rs.filter(r=>r.audio && !r.transcript) : rs;
    const heard = rs.filter(r => r.audio && !r.transcript).length;
    return {id,label,n:rs.length,correct:valid.filter(r => r.ok && !r.hint).length,heard};
  });
  const listeningLimited = (skills.find(x=>x.id==='listening')?.heard || 0)<2;
  if (listeningLimited) {low=Math.max(0,Math.min(low,Math.min(best.k,rows.length-1)-1));high=Math.min(rows.length-1,Math.max(high,best.k+1));}
  return { listeningLimited, recommended:rows[Math.min(rows.length-1,best.k)].section, range:[rows[low].section,rows[high].section], rows, skills,
    evidence:plan.size===10?'初步定位':plan.size===20?'分層定位':'較完整定位', seen:plan.slots.filter(x=>x.seen).length,
    gaps:rows.filter(x=>x.n && x.correct/x.n<.7).map(x=>x.section), complete:scored.length===plan.size };
}
function refineLegacy(plan, results, course, seed, records = {}) {
  const next = results.length;
  if (next < plan.anchors || next >= plan.size) return;
  const report = legacyReport(plan,results,course), sections = course.index.sections.map(x=>x.id);
  const boundary = sections.indexOf(report.recommended);
  const near = [boundary,Math.max(0,boundary-1),Math.min(sections.length-1,boundary+1)];
  const chosen = [...new Set(near)].map(i=>({i,n:plan.slots.slice(0,next).filter(x=>x.section===sections[i]).length})).sort((a,b)=>a.n-b.n)[0].i;
  const slot = pick(course,sections[chosen],plan.slots.filter((_,i)=>i!==next),String(seed)+':refine:'+next,records);
  if (slot) plan.slots[next]=slot;
}


// General course levels and advanced exam skills are separate axes.
export const FOUNDATION_BANDS = [
 {id:'s1',sections:['s1','s2'],title:'基礎溝通與句型',label:'基礎入門 · 第 1–2 段',level:'Pre-A1–A1'},
 {id:'s3',sections:['s3','s4'],title:'生活應用與閱讀',label:'生活應用 · 第 3–4 段',level:'A1–A2'},
 {id:'s5',sections:['s5'],title:'國中起步',label:'國中起步 · 第 5 段',level:'A2'},
 {id:'s6',sections:['s6'],title:'國中精熟',label:'國中精熟 · 第 6 段',level:'A2+'},
 {id:'s7',sections:['s7'],title:'高中核心',label:'高中核心 · 第 7 段',level:'B1'},
 {id:'s8',sections:['s8'],title:'高中進階',label:'高中進階 · 第 8 段',level:'B1+–B2'},
 {id:'s9',sections:['s9'],title:'學術英語與綜合閱讀',label:'學術綜合 · 第 9 段',level:'B2–C1'}
];
function generalSlot(course,band,slots,salt,records,round=0) {
 const b=FOUNDATION_BANDS[band], section=b.sections[(b.sections.length-1+round)%b.sections.length];
 const selected=pick(course,section,slots,salt,records);
 return selected ? {...selected,band} : null;
}
function advancedSlot(course,track,slots,salt,records) {
 const used=new Set(slots.map(x=>x.id));
 const options=ADVANCED_ITEMS.filter(x=>x.exam===track&&!used.has(x.id)).sort((a,b)=>(records[a.id]?.s?1:0)-(records[b.id]?.s?1:0)||hash(a.id+salt)-hash(b.id+salt));
 const item=options[0];
 return item && course.item(item.id) ? {id:item.id,section:track,advanced:true,skill:'reading',seen:!!records[item.id]?.s} : null;
}
export function makePlacement(course,size=20,seed=1,records={}) {
 size=Number(size);if(!PLACEMENT_SIZES.includes(size))return null;
 const generalCount=size*7/10, slots=[];
 for(let i=0;i<generalCount;i++) {
  const slot=generalSlot(course,i%7,slots,`${seed}:${i}`,records,Math.floor(i/7));if(!slot)return null;slots.push(slot);
 }
 for(let i=0;i<size-generalCount;i++) {
  const slot=advancedSlot(course,ADVANCED_TRACKS[i%3].id,slots,`${seed}:advanced:${i}`,records);if(!slot)return null;slots.push(slot);
 }
 return {version:2,size,generalCount,anchors:size===30?14:7,slots};
}
export function placementReport(plan,results,course) {
 if(plan.version===1)return legacyReport(plan,results,course);
 const generalSlots=plan.slots.filter(x=>!x.advanced), generalIds=new Set(generalSlots.map(x=>x.id));
 const generalResults=results.filter(x=>generalIds.has(x.id));
 const proxy={...course,index:{...course.index,sections:FOUNDATION_BANDS}};
 const mapped={...plan,slots:generalSlots.map(x=>({...x,section:FOUNDATION_BANDS[x.band].id}))};
 const report=legacyReport(mapped,generalResults,proxy);
 report.rows=report.rows.map((r,i)=>({...r,label:FOUNDATION_BANDS[i].label}));
 const advancedRows=ADVANCED_TRACKS.map(track=>{
  const ids=new Set(plan.slots.filter(x=>x.section===track.id).map(x=>x.id));
  const rs=results.filter(x=>ids.has(x.id)&&!x.repair);
  return {...track,n:rs.length,correct:rs.filter(x=>x.ok&&!x.hint).length};
 });
 const generalAccuracy=generalResults.filter(x=>x.ok&&!x.hint).length/Math.max(1,generalResults.length);
 const advancedCorrect=advancedRows.reduce((n,r)=>n+r.correct,0),advancedCount=advancedRows.reduce((n,r)=>n+r.n,0);
 return {...report,blueprint:2,advancedRows,generalCount:generalResults.length,generalAccuracy,
  advancedReady:report.recommended==='s9'&&generalAccuracy>=.75&&advancedCorrect>=2&&advancedCorrect/Math.max(1,advancedCount)>=2/3,
  seen:plan.slots.filter(x=>x.seen).length,complete:results.filter(x=>!x.repair).length===plan.size};
}
export function refinePlacement(plan,results,course,seed,records={}) {
 if(plan.version===1)return refineLegacy(plan,results,course,seed,records);
 const next=results.length;
 // The final exam probes are protected: no adaptive change may replace them.
 if(next<plan.anchors||next>=plan.generalCount)return;
 const report=placementReport(plan,results,course),boundary=FOUNDATION_BANDS.findIndex(x=>x.id===report.recommended);
 const near=[boundary,Math.max(0,boundary-1),Math.min(6,boundary+1)];
 const chosen=[...new Set(near)].map(i=>({i,n:plan.slots.slice(0,next).filter(x=>!x.advanced&&x.band===i).length})).sort((a,b)=>a.n-b.n)[0].i;
 const slot=generalSlot(course,chosen,plan.slots.filter((_,i)=>i!==next),`${seed}:refine:${next}`,records,Math.floor(next/7));
 if(slot)plan.slots[next]=slot;
}
export function validPlacementPlan(plan,queue,course) {
 if(!plan||!Array.isArray(plan.slots)||!PLACEMENT_SIZES.includes(plan.size)||plan.size!==queue.length||plan.slots.length!==queue.length)return false;
 if(!plan.slots.every((x,i)=>x&&x.id===queue[i]&&course.item(x.id)))return false;
 if(new Set(queue).size!==queue.length)return false;
 if(plan.version===1)return plan.anchors===Math.floor(plan.size/9)*9&&plan.slots.every(x=>course.index.sections.some(s=>s.id===x.section));
 if(plan.version!==2||plan.generalCount!==plan.size*7/10||plan.anchors!==(plan.size===30?14:7))return false;
 return plan.slots.every((x,i)=>i<plan.generalCount ? !x.advanced&&Number.isInteger(x.band)&&FOUNDATION_BANDS[x.band]?.sections.includes(x.section) : x.advanced===true&&x.section===ADVANCED_TRACKS[(i-plan.generalCount)%3].id&&ADVANCED_ITEMS.some(it=>it.id===x.id&&it.exam===x.section));
}
