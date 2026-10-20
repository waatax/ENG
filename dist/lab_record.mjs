export function createLabRecord(storage,route){
 const key='english-quest-lab-v1:'+route;let record={answers:{},hints:{},cause:'',rewrite:'',next:''},warning='';
 try{const raw=JSON.parse(storage.getItem(key)||'null');if(raw&&typeof raw==='object'){
  for(const field of ['cause','rewrite','next'])if(typeof raw[field]==='string')record[field]=raw[field].slice(0,2000);
  for(const [id,value] of Object.entries(raw.hints||{}))if(/^\d+$/.test(id)&&value===true)record.hints[id]=true;
  for(const [id,r] of Object.entries(raw.answers||{}))if(/^\d+$/.test(id)&&r&&Number.isInteger(r.first)&&Number.isInteger(r.last)&&r.first>=0&&r.last>=0&&r.first<20&&r.last<20&&Number.isInteger(r.attempts)&&r.attempts>0)record.answers[id]={first:r.first,last:r.last,attempts:Math.min(r.attempts,100000),assisted:r.assisted===true};
 }}catch{warning='無法讀取舊紀錄；仍可練習並下載訂正。';}
 function persist(){try{storage.setItem(key,JSON.stringify(record));warning='';}catch{warning='無法儲存，請下載訂正紀錄。';}}
 return {get data(){return record;},get warning(){return warning;},answer(id,choice,assisted=false){const old=record.answers[id];record.answers[id]={first:old?.first??choice,last:choice,attempts:(old?.attempts||0)+1,assisted:!!(old?.assisted||record.hints[id]||assisted)};persist();},hint(id){record.hints[id]=true;const old=record.answers[id];if(old)old.assisted=true;persist();},write(field,value){if(['cause','rewrite','next'].includes(field)){record[field]=String(value).slice(0,2000);persist();}}};
}
