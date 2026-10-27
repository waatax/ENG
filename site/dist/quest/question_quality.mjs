// Identity follows the learning content, never the item ID or shuffled option order.
export const canonical=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[^\p{L}\p{N}' ]/gu,' ').replace(/\s+/g,' ').trim();
export function wordTarget(q){
 if(q.targetWord)return canonical(q.targetWord);
 const short=s=>s&&/^[a-z][a-z' -]*$/i.test(s)&&s.trim().split(/\s+/).length<=5;
 if(q.kind==='word'&&q.type!=='match')return canonical(short(q.text)?q.text:short(q.audio)?q.audio:short(q.answer)?q.answer:q.audioAfter||q.answer);
 return null;
}
const digest=s=>{let a=2166136261,b=2246822519;for(const c of s){a=Math.imul(a^c.charCodeAt(0),16777619);b=Math.imul(b^c.charCodeAt(0),3266489917);}return(a>>>0).toString(16).padStart(8,'0')+(b>>>0).toString(16).padStart(8,'0');};
export function questionKey(q){
 if(!q)return '';
 if(q.type==='match')return 'match:'+q.pairs.map(p=>p.map(canonical).join('=')).sort().join('|');
 const audio=q.type==='listen'||q.listen?q.audio:'';
 const generic=!q.text&&!q.passage&&!audio&&!q.given&&/正確|correct|grammatical|complete sentence|^Choose\b|Which sentence|Which version/i.test(q.prompt||'');
 return 'q:'+digest(JSON.stringify([canonical(q.prompt),canonical(q.text),canonical(q.passage),canonical(audio),canonical(q.given),generic?(q.options||[]).map(canonical).sort():[]]));
}
export function learningKeys(q){
 if(q.kind==='word'&&q.type==='match')return q.pairs.map(p=>'word:'+canonical(p[0]));
 const w=wordTarget(q);if(w)return ['word:'+w];
 if(q.kind==='talk'){const line=canonical(q.audioAfter||q.audio||(q.type==='build'?`${q.given||''} ${q.answer}`:q.type==='choice'&&/[a-z]/i.test(q.answer)&&!/[\u3400-\u9fff]/.test(q.answer)?q.answer:''));return [line?'line:'+line:questionKey(q)];}
 return [questionKey(q)];
}
export function uniqueQuestions(ids,item,{targets=false}={}){
 const seen=new Set(),out=[];
 for(const id of [...new Set(ids)]){const q=item(id);if(!q)continue;const keys=targets?learningKeys(q):[questionKey(q)];if(keys.some(k=>seen.has(k)))continue;keys.forEach(k=>seen.add(k));out.push(id);}
 return out;
}

const seedHash=s=>{let n=2166136261;for(const c of String(s))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;};
export function selectDistinct(ids,item,count,{seen=[],exposures={},seed='',prefer=()=>0}={}){
 if(count<=0)return [];
 const blocked=new Set(seen),options=uniqueQuestions(ids,item).filter(id=>!learningKeys(item(id)).some(k=>blocked.has(k)));
 const ranks=new Map(options.map(id=>{const keys=learningKeys(item(id));return [id,{used:keys.reduce((n,k)=>n+(exposures[k]?.n||0),0),priority:prefer(id),last:Math.max(0,...keys.map(k=>exposures[k]?.last||0)),hash:seedHash(seed+'|'+id)}];}));
 options.sort((a,b)=>{const x=ranks.get(a),y=ranks.get(b);return y.priority-x.priority||(x.used?1:0)-(y.used?1:0)||x.used-y.used||x.last-y.last||x.hash-y.hash;});
 const used=new Set(),out=[];
 for(const id of options){const q=item(id),keys=[questionKey(q),...learningKeys(q)];if(keys.some(k=>used.has(k)))continue;out.push(id);keys.forEach(k=>used.add(k));if(out.length>=count)break;}
 return out;
}
