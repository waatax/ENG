// Use recorded speech boundaries, never an estimated fraction of MP3 duration.
export function speechPhase(parts,time){
 let index=0;for(let i=0;i<parts.length;i++)if(time>=parts[i].start)index=i;
 return {index,back:index===1||index===2};
}
export function installCardPlayer({single,all,getCard,getSingle,getPlaylist,escape:esc,onStop,onToggle}){
 const host=document.createElement('aside');host.id='listening-card';host.hidden=true;host.setAttribute('aria-label','隨聲音翻面字卡');document.body.append(host);
 let timings={},current=null,source=null,lastPhase=-1,manual=false,back=false;
 fetch(new URL('card-timings.json?v=flip1',import.meta.url)).then(r=>{if(!r.ok)throw Error();return r.json();}).then(data=>{timings=data;sync();}).catch(()=>{host.dataset.timingError='true';sync();});
 function draw(){if(!current)return;
 host.innerHTML=`<div class="listen-heading"><strong>隨聲字卡</strong><button data-close aria-label="關閉字卡並停止播放">✕</button></div><p class="listen-phase" role="status">${host.dataset.timingError?'時間資料未載入，請手動翻面':manual?'手動翻面中': ['① 聽英文・看圖','② 聽聯想・想畫面','③ 核對中文意思','④ 回到英文・跟讀'][Math.max(0,lastPhase)]}</p><button class="listen-face ${back?'back':''}" data-flip aria-label="${esc(back?current.zh:(current.displayWord||current.word))} · 翻面：${back?'看英文與插圖':'看中文與記憶方式'}">${back?`<strong>${esc(current.zh)}</strong><span class="listen-hook">${esc(current.cue)}</span><small>${esc(current.scene)}</small>`:`<span class="picture-symbol" aria-hidden="true">${esc(current.icon)}</span><strong lang="en">${esc(current.displayWord||current.word)}</strong><small>點字卡翻面</small>`}</button><div class="listen-actions"><button data-pause>${source?.paused?'▶ 繼續':'Ⅱ 暫停'}</button><button data-auto ${manual?'':'disabled'}>恢復自動翻面</button></div><p class="listen-note">圖像符號幫助聯想；諧音不是英文發音。${host.dataset.timingError?'':'以 MP3 原始口訣同步。'}</p>`;
 }
 function sync(){const state=getPlaylist();const id=getSingle()||(['loading','playing','paused','error'].includes(state.status)?state.current?.id:null);
 if(!id){host.hidden=true;current=null;return;}
 const c=getCard(id);if(!c)return;
 const nextSource=getSingle()?single:all;if(source!==nextSource){current=null;}source=nextSource;
 if(current?.id!==id||host.hidden){current=c;manual=false;lastPhase=-1;host.hidden=false;}
 const phase=speechPhase(timings[id]||[],source.currentTime||0);
 if(phase.index!==lastPhase){lastPhase=phase.index;if(!manual)back=phase.back;draw();}
 }
 for(const audio of [single,all])for(const event of ['timeupdate','seeked','playing','pause','ended','error','loadedmetadata'])audio.addEventListener(event,()=>{sync();if(event!=='timeupdate')draw();});
 host.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.hasAttribute('data-close')){onStop();host.hidden=true;return;}
 if(b.hasAttribute('data-flip')){manual=true;back=!back;draw();}
 if(b.hasAttribute('data-auto')){manual=false;back=speechPhase(timings[current.id]||[],source.currentTime).back;draw();}
 if(b.hasAttribute('data-pause')){onToggle();}
 });
 return {sync};
}
