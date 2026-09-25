export const SCHEMA=1;
export function initialState(){return {schema:SCHEMA,track:'foundation',attempts:[],active:null,review:{}};}
export function remainingSeconds(deadline,now=Date.now()){return deadline?Math.max(0,Math.ceil((deadline-now)/1000)):null;}
export function createAttempt(track,mode,questions,history,now=Date.now()){
 const seen=new Set(history.flatMap(a=>a.responses.map(r=>r.itemId)));
 return {id:globalThis.crypto.randomUUID(),track,mode,startedAt:now,deadline:mode==='timed'?now+300000:null,index:0,questionIds:questions.map(q=>q.id),responses:[],seenIds:[...seen],hintIds:[],status:'active'};
}
export function recordResponse(attempt,item,choice,now=Date.now()){
 if(attempt.status!=='active'||attempt.responses.some(r=>r.itemId===item.id))return attempt;
 if(choice!==null&&(!Number.isInteger(choice)||choice<0||choice>=item.options.length))throw new Error('Invalid answer');
 const assisted=attempt.hintIds.includes(item.id),seen=attempt.seenIds.includes(item.id);
 return {...attempt,responses:[...attempt.responses,{itemId:item.id,choice,correct:choice===item.answer,assisted,firstSeen:!seen,transfer:!!item.transfer,answeredAt:now}]};
}
export function resultOf(attempt){const rs=attempt.responses;const first=rs.filter(r=>r.firstSeen&&!r.assisted&&r.choice!==null);return {correct:rs.filter(r=>r.correct).length,total:attempt.questionIds.length,unanswered:attempt.questionIds.length-rs.filter(r=>r.choice!==null).length,independent:first.length,independentCorrect:first.filter(r=>r.correct).length,assisted:rs.filter(r=>r.assisted).length,transfer:rs.filter(r=>r.transfer&&!r.assisted&&r.firstSeen).length};}
export function finishAttempt(state,attempt,now=Date.now()){
 if(state.attempts.some(a=>a.id===attempt.id))return {...state,active:null};
 const done={...attempt,status:'complete',finishedAt:now};const review={...state.review};
 for(const r of done.responses){const old=review[r.itemId];const eligible=!old||now>=old.dueAt;const streak=r.correct&&!r.assisted?(eligible?(old?.streak||0)+1:old.streak):0;const days=[1,3,7,21][Math.min(streak,3)];review[r.itemId]={streak,dueAt:eligible||!r.correct?now+days*86400000:old.dueAt,lastAt:now};}
 return {...state,active:null,attempts:[...state.attempts,done],review};
}
