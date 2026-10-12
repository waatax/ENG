export function validRecord(r){return r&&Number.isFinite(r.due)&&Number.isInteger(r.reviews)&&r.reviews>=0&&Number.isInteger(r.step)&&r.step>=0&&r.step<=4;}
export function directionRecord(record,direction='forward'){
 const selected=record?.directions?.[direction];
 return validRecord(selected)?selected:!record?.directions&&direction==='forward'&&validRecord(record)?record:null;
}
export function recordRecall(record,correct,direction='forward',now=Date.now()){
 const previous=directionRecord(record,direction);
 const step=correct?(previous?.reviews?(now>=previous.due?Math.min(previous.step+1,4):Math.max(1,previous.step)):1):0;
 const next={step,reviews:(previous?.reviews||0)+1,due:now+(correct?[0,1,3,7,14][step]*86400000:600000)};
 const directions={};for(const mode of ['forward','reverse']){const r=directionRecord(record,mode);if(r)directions[mode]={due:r.due,reviews:r.reviews,step:r.step};}
 return {...next,directions:{...directions,[direction]:next}};
}
export function cleanRecord(record){
 if(!validRecord(record))return null;
 const cleaned={due:record.due,reviews:record.reviews,step:record.step};
 if(record.directions){cleaned.directions={};for(const mode of ['forward','reverse']){const r=record.directions[mode];if(validRecord(r))cleaned.directions[mode]={due:r.due,reviews:r.reviews,step:r.step};}}
 return cleaned;
}
