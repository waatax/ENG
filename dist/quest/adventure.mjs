// Guidance is derived from actual progress, never a fabricated opponent or score.
export function nextAdventure(game,course,trackId){
 const due=game.dueUnits()[0];
 if(due)return {mode:'review',id:due,title:'記憶補給站',text:`${course.units.get(due).title} 到了回想時間。用自己的答案，把它留得更久。`,label:'出發複習'};
 const id=game.current(trackId);
 if(id)return {mode:'lesson',id,title:'今天的小遠征',text:`下一站：${course.nodes.get(id).title}。看懂線索，再自己試一次。`,label:'前往下一關'};
 return {mode:'practice',id:'',title:'換個情境再挑戰',text:'這一段已經走過。回到學過的內容，找找還能更熟悉的地方。',label:'個人化練習'};
}
export function sessionTrail(session){
 const attempts=session.results.filter(r=>!r.repair),independent=attempts.filter(r=>r.ok&&!r.hint).length;
 return {independent,attempts:attempts.length,phase:session.index>=session.base?'repair':attempts.length?'practice':'start',label:session.index>=session.base?'修復站：把剛剛的線索想起來':session.mode==='story'?'故事任務：跟著角色找線索':'本關任務：先想答案，再看解析'};
}
export function takeaways(session,course){
 const ordered=[...session.results.filter(r=>!r.ok),...session.results.filter(r=>r.ok&&!r.hint)];
 return [...new Set(ordered.map(r=>r.id))].slice(0,3).map(id=>{const q=course.item(id);return {id,prompt:q.prompt,answer:q.type==='match'?q.why:q.given?`${q.given} ${q.answer}`:q.answer,why:q.why,repair:session.results.some(r=>r.id===id&&!r.ok)};});
}
