// A finite queue of original card MP3s, independent of search and pagination.
export function createMnemonicPlaylist({audio,getCards,onState=()=>{},stopOther=()=>{},baseUrl}){
 let queue=[],index=-1,status='idle',epoch=0,error='';
 const state=()=>({status,index,total:queue.length,current:queue[index]||null,error});
 const emit=()=>onState(state());
 function finish(){epoch++;status='complete';error='';audio.pause();emit();}
 async function playIndex(next){
  if(next>=queue.length){finish();return;}
  const token=++epoch;index=next;status='loading';error='';emit();
  audio.pause();stopOther();audio.src=new URL('audio-trio/'+encodeURIComponent(queue[index].word)+'.mp3',baseUrl).href;
  try{await audio.play();if(token!==epoch)return;status='playing';emit();}
  catch(e){if(token!==epoch)return;status='error';error='這張音檔暫時無法播放。可重試或跳到下一張。';emit();}
 }
 function start(){const available=getCards();if(!available.length)return;queue=available.slice();return playIndex(0);}
 function stop(){epoch++;status='idle';index=-1;queue=[];error='';audio.pause();emit();}
 async function toggle(){
  if(status==='playing'){epoch++;status='paused';audio.pause();emit();return;}
  if(status==='error')return playIndex(index);
  if(status!=='paused')return;
  const token=++epoch;status='loading';emit();
  try{await audio.play();if(token!==epoch)return;status='playing';emit();}
  catch(e){if(token!==epoch)return;status='error';error='無法接續播放，請重試。';emit();}
 }
 function next(){if(!['playing','paused','error'].includes(status))return;return playIndex(index+1);}
 audio.addEventListener('ended',()=>{if(status==='playing'&&audio.ended)void playIndex(index+1);});
 audio.addEventListener('error',()=>{if(!queue[index]||!audio.error||!['loading','playing','paused'].includes(status))return;epoch++;status='error';error='這張音檔載入失敗。可重試或跳到下一張。';emit();});
 audio.addEventListener('pause',()=>{if(status==='playing'&&audio.paused&&!audio.ended){epoch++;status='paused';emit();}});
 return {start,stop,toggle,next,getState:state,refresh:emit};
}
