const KEY='eq-conversation-practice-v1';
const valid=new Set(['again','supported','independent']);
export function readPractice() {
  try { const data=JSON.parse(globalThis.localStorage?.getItem(KEY)||'{}'); return data && typeof data==='object' && !Array.isArray(data)?data:{}; } catch { return {}; }
}
export function savePractice(id,rating,now=Date.now()) {
  if(!valid.has(rating))return false;
  const data=readPractice(), days={again:1,supported:3,independent:7}[rating];
  data[id]={rating,reviewAt:now+days*86400000,updatedAt:now};
  try {globalThis.localStorage.setItem(KEY,JSON.stringify(data));return true;} catch {return false;}
}
export function duePractice(record,now=Date.now()) {return Number.isFinite(record?.reviewAt)&&record.reviewAt<=now;}
export function practiceLabel(record) {return {again:'需要再練',supported:'有提示能說',independent:'能獨立改說'}[record?.rating]||'尚未自評';}
