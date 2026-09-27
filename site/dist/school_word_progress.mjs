export const WORD_STORE='english-quest-school-words-v1';
export function createWordProgress(cards,storage=globalThis.localStorage,now=()=>Date.now()) {
 const ids=new Set(cards.map(c=>c.id));let records={},warning='';
 try{const raw=JSON.parse(storage?.getItem(WORD_STORE)||'{}');for(const [id,r] of Object.entries(raw||{}))if(ids.has(id)&&r&&Number.isInteger(r.step)&&r.step>=0&&r.step<=5&&Number.isFinite(r.due)&&Number.isInteger(r.reviews)&&r.reviews>=0){records[id]={step:r.step,due:r.due,reviews:r.reviews,correct:Number.isInteger(r.correct)&&r.correct>=0?r.correct:0,misses:Number.isInteger(r.misses)&&r.misses>=0?r.misses:0};}}catch{warning='無法讀取紀錄；本次可繼續練習。';}
 function persist(){try{if(!storage)throw Error();storage.setItem(WORD_STORE,JSON.stringify(records));warning='';}catch{warning='紀錄未能儲存；離開後可能遺失本次進度。';}}
 return {
  get warning(){return warning;},
  get(id){return records[id]?{...records[id]}:null;},
  isDue(id){return Boolean(records[id]&&records[id].due<=now());},
  record(id,right){if(!ids.has(id)||typeof right!=='boolean')return false;const time=now();const previous=records[id];const r=previous||{step:0,reviews:0,correct:0,misses:0};const advance=!previous||r.due<=time;const step=right?(advance?Math.min(5,r.step+1):r.step):0;const days=[0,1,3,7,14,30];records[id]={step,reviews:r.reviews+1,correct:r.correct+(right?1:0),misses:r.misses+(right?0:1),due:right?(advance?time+days[step]*86400000:r.due):time+600000};persist();return true;}
 };
}
