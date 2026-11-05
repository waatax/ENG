import {ADVANCED_UNITS,advancedUnit} from './advanced_content.mjs?v=advanced20261103';
import {scheduleRecall} from './recall.mjs?v=truth20261105';
export const ADVANCED_KEY='eq_advanced_course_v1';
const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
const text=v=>typeof v==='string'?v.slice(0,12000):'';
const ratings=v=>Array.from({length:4},(_,i)=>Number.isInteger(v?.[i])&&v[i]>=0&&v[i]<=4?v[i]:0);
const storeDefault=()=>{try{return globalThis.localStorage;}catch{return null;}};
const sameText=(a,b)=>a.replace(/\s+/g,' ').trim()===b.replace(/\s+/g,' ').trim();
function attempt(v){
 if(!object(v)||!['practice','transfer'].includes(v.form)||typeof v.id!=='string'||!Array.isArray(v.answers)||v.answers.length>3||!v.answers.every(a=>Number.isInteger(a)&&a>=-1&&a<=2))return null;
 const orders=Array.isArray(v.orders)&&v.orders.length===3&&v.orders.every(o=>Array.isArray(o)&&[...o].sort().join(',')==='0,1,2')?v.orders:[[0,1,2],[0,1,2],[0,1,2]];
 return {id:v.id.slice(0,100),form:v.form,answers:v.answers,orders,heard:v.heard===true,transcript:v.transcript===true,at:Number.isFinite(v.at)?v.at:0};
}
function cleanUnit(v){
 if(!object(v))return {};
 const out={read:v.read===true,attempts:Array.isArray(v.attempts)?v.attempts.map(attempt).filter(a=>a&&a.answers.length===3).slice(-8):[]};
 const active=attempt(v.active);if(active&&active.answers.length<3)out.active=active;
 for(const kind of ['initial','revision'])if(object(v[kind])&&text(v[kind].text).trim())out[kind]={text:text(v[kind].text),note:text(v[kind].note),ratings:ratings(v[kind].ratings),at:Number.isFinite(v[kind].at)?v[kind].at:0};
 if(out.revision&&(!out.initial||sameText(out.revision.text,out.initial.text)||out.revision.note.trim().length<6||out.revision.ratings.some(v=>v===0)))delete out.revision;
 if(object(v.scratch))out.scratch={text:text(v.scratch.text),note:text(v.scratch.note),ratings:ratings(v.scratch.ratings)};
 if(Array.isArray(v.history))out.history=v.history.filter(x=>object(x)&&text(x.text)).slice(-3).map(x=>({text:text(x.text),note:text(x.note),ratings:ratings(x.ratings),at:Number.isFinite(x.at)?x.at:0}));
 if(object(v.review)&&Number.isFinite(v.review.due)&&Number.isFinite(v.review.reviewed)&&Number.isInteger(v.review.step)&&v.review.step>=0&&v.review.step<=4&&[1,3,7,14,30].includes(v.review.days))out.review={...v.review};
 return out;
}
export function readAdvanced(store=storeDefault()){
 try{const raw=JSON.parse(store?.getItem(ADVANCED_KEY)||'{}'),units={};if(object(raw?.units))for(const u of ADVANCED_UNITS)if(object(raw.units[u.id]))units[u.id]=cleanUnit(raw.units[u.id]);return {version:1,units};}catch{return {version:1,units:{}};}
}
export function patchAdvanced(id,patch,store=storeDefault()){
 if(!ADVANCED_UNITS.some(u=>u.id===id)||!object(patch))return false;
 try{store.getItem(ADVANCED_KEY);const data=readAdvanced(store);data.units[id]=cleanUnit({...data.units[id],...patch});store.setItem(ADVANCED_KEY,JSON.stringify(data));return true;}catch{return false;}
}
export function optionOrders(random=Math.random){return Array.from({length:3},()=>{const a=[0,1,2];for(let i=2;i>0;i--){const j=Math.min(i,Math.max(0,Math.floor(random()*(i+1))));[a[i],a[j]]=[a[j],a[i]];}return a;});}
export function startAdvancedAttempt(id,form,store=storeDefault(),audio={},now=Date.now()){
 if(!ADVANCED_UNITS.some(u=>u.id===id)||!['practice','transfer'].includes(form))return null;
 const old=readAdvanced(store).units[id]||{};
 if(old.active)return old.active.form===form?old.active:null;
 const next={id:`${now}-${Math.random().toString(36).slice(2,9)}`,form,answers:[],orders:optionOrders(),heard:audio.heard===true,transcript:audio.transcript===true,at:now};
 return patchAdvanced(id,{active:next},store)?next:null;
}
export function recordAdvancedAnswer(id,runId,index,value,store=storeDefault()){
 if(!Number.isInteger(value)||value< -1||value>2)return null;
 const old=readAdvanced(store).units[id]||{},active=old.active;
 if(!active||active.id!==runId||active.answers.length>=3||index!==active.answers.length)return null;
 const next={...active,answers:[...active.answers,value]};
 const patch=next.answers.length===3?{active:null,attempts:[...(old.attempts||[]),next].slice(-8)}:{active:next};
 return patchAdvanced(id,patch,store)?next:null;
}
export function annotateAdvancedAudio(id,runId,patch,store=storeDefault()){
 const old=readAdvanced(store).units[id]?.active;if(!old||old.id!==runId)return false;
 return patchAdvanced(id,{active:{...old,heard:old.heard||patch.heard===true,transcript:old.transcript||patch.transcript===true}},store);
}
export function attemptScore(id,a){const bank=advancedUnit(id)[a?.form==='transfer'?'transfer':'checks'];return Array.isArray(a?.answers)?a.answers.filter((v,i)=>v===bank[i]?.answer).length:0;}
export function saveAdvancedDraft(id,value,kind,note='',rubric=[],store=storeDefault(),now=Date.now()){
 if(!ADVANCED_UNITS.some(u=>u.id===id)||!['initial','revision'].includes(kind)||typeof value!=='string'||value.trim().length<20||value.length>12000)return {ok:false,message:'請先寫下至少 20 個字元的作品。'};
 const old=readAdvanced(store).units[id]||{},r=ratings(rubric),draft={text:value,note:text(note),ratings:r,at:now};
 if(kind==='initial'&&old.initial)return {ok:false,message:'初稿已保留，請將新內容另存為修訂稿。'};
 if(kind==='revision'&&(!old.initial||sameText(value,old.initial.text)||note.trim().length<6||r.some(v=>v===0)))return {ok:false,message:'先保存初稿；修訂需有不同內容、至少 6 字修改理由與四項自評。'};
 const patch={[kind]:draft,scratch:{text:value,note:text(note),ratings:r}};
 if(kind==='revision'&&old.revision)patch.history=[...(old.history||[]),old.revision].slice(-3);
 return patchAdvanced(id,patch,store)?{ok:true,message:kind==='initial'?'✓ 初稿已保留。現在可以修改，再另存修訂稿。':'✓ 修訂稿與理由已儲存；這是作品紀錄，不是自動程度評分。'}:{ok:false,message:'儲存失敗，請先複製文字或下載作品，確認瀏覽器空間後重試。'};
}
export function scheduleAdvancedReview(id,rating,store=storeDefault(),now=Date.now()){
 const old=readAdvanced(store).units[id]||{},transfer=old.attempts?.filter(a=>a.form==='transfer').at(-1);
 if(rating!=='again'&&(!old.revision||!transfer||attemptScore(id,transfer)<2))return null;
 const next=scheduleRecall(old.review,rating,now);return next&&patchAdvanced(id,{review:next},store)?next:null;
}
export function advancedSummary(store=storeDefault(),now=Date.now()){
 const state=readAdvanced(store),rows=ADVANCED_UNITS.map(u=>{const r=state.units[u.id]||{},practice=r.attempts?.some(a=>a.form==='practice'),revised=!!r.initial&&!!r.revision;return {id:u.id,read:!!r.read,practice:!!practice,revised,loop:!!r.read&&!!practice&&revised,due:!!r.review&&r.review.due<=now};});
 return {rows,read:rows.filter(r=>r.read).length,checks:rows.filter(r=>r.practice).length,revised:rows.filter(r=>r.revised).length,loops:rows.filter(r=>r.loop).length,due:rows.filter(r=>r.due).length,next:rows.find(r=>r.due)?.id||rows.find(r=>!r.loop)?.id||ADVANCED_UNITS[0].id};
}
