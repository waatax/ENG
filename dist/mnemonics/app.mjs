import {directionRecord,recordRecall,cleanRecord} from './mnemonic_recall.mjs?v=keyword6r2';
import {createMnemonicPlaylist,AUDIO_VERSION} from './mnemonic_playlist.mjs?v=keyword6r2';
const $=s=>document.querySelector(s),KEY='eq-mnemonics-v1',esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const METHODS=['諧音聯想','外來語借音','英文同音','構詞拆字','對比聯想','情境圖像'];
let cards=[],progress={},custom={},page=0,order=null;const SIZE=12;const revealed=new Set();
try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');if(saved&&typeof saved==='object'){progress=saved.progress||{};custom=saved.custom||{};}}catch{$('#notice').textContent='無法讀取舊進度，仍可使用字卡。';}
const player=new Audio();player.preload='none';let active=null;
const recallMeaning=c=>c.zh.replace(/（[^）]*[a-zA-Z][^）]*）|\([^)]*[a-zA-Z][^)]*\)/g,'').trim();
const direction=()=>$('#direction').value;
const recallRecord=c=>directionRecord(progress[c.id],direction());
const trioUrl=c=>'audio-trio/'+encodeURIComponent(c.word)+'.mp3';
function stop(){player.pause();active=null;document.querySelectorAll('[data-play]').forEach(b=>{b.textContent='▶ 四段聯想 MP3';b.setAttribute('aria-pressed','false');});}
player.addEventListener('ended',stop);player.addEventListener('error',()=>{if(!active)return;stop();$('#notice').textContent='MP3 無法載入，請重試或下載音檔。';});
const allAudio=new Audio();allAudio.preload='none';
function updateAll(state){
 const busy=['loading','playing','paused','error'].includes(state.status);
 $('#play-all').disabled=!cards.length||busy;
 $('#all-stop').disabled=!busy;$('#all-next').disabled=!['playing','paused','error'].includes(state.status);
 const pause=$('#all-pause');pause.disabled=!['playing','paused','error'].includes(state.status);pause.textContent=state.status==='paused'?'▶ 繼續播放':state.status==='error'?'▶ 重試這張':'Ⅱ 暫停';pause.setAttribute('aria-pressed',String(state.status==='paused'));
 const current=state.current;const prefix=state.status==='loading'?'載入中':state.status==='paused'?'已暫停':state.status==='error'?'播放中斷':'正在播放';
 $('#all-status').textContent=state.status==='complete'?`本次連播已結束（共 ${state.total.toLocaleString()} 張）。`:current?`${prefix} · 第 ${state.index+1} / ${state.total.toLocaleString()} 張 · ${current.displayWord||current.word} → ${current.cue} → ${current.zh}${state.error?'。'+state.error:''}`:`共 ${cards.length.toLocaleString()} 張，按「一次全部播放（聯想）」開始。`;
 $('#all-progress').max=state.total||cards.length||1000;$('#all-progress').value=state.status==='complete'?state.total:busy?state.index+1:0;
 document.querySelectorAll('.word-card').forEach(el=>el.classList.toggle('is-playing',busy&&el.dataset.id===current?.id));
}
const playlist=createMnemonicPlaylist({audio:allAudio,getCards:()=>cards,stopOther:stop,onState:updateAll,baseUrl:import.meta.url,fileFor:trioUrl});
$('#play-all').addEventListener('click',()=>{void playlist.start();});
$('#all-pause').addEventListener('click',()=>{void playlist.toggle();});
$('#all-next').addEventListener('click',()=>{void playlist.next();});
$('#all-stop').addEventListener('click',()=>playlist.stop());
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,progress,custom}));}catch{$('#notice').textContent='無法儲存到此瀏覽器；請匯出備份。';}}
function haystack(c){return [c.word,c.displayWord,c.zh,c.hook,c.cue,custom[c.id],c.scene,c.spell,c.example,c.exampleZh,c.method,...(c.families||[]).map(f=>f.key+' '+f.meaning)].join(' ').toLowerCase();}
function list(){const query=$('#search').value.trim().toLowerCase(),category=$('#category').value,kind=$('#kind').value,mode=$('#review').value;let result=cards.filter(c=>(!query||haystack(c).includes(query))&&(!category||c.category===category)&&(!kind||c.method===kind)&&(mode==='all'||(mode==='new'?!recallRecord(c):!!recallRecord(c)&&Number(recallRecord(c).due)<=Date.now())));if(order){const rank=new Map(order.map((id,i)=>[id,i]));result.sort((a,b)=>rank.get(a.id)-rank.get(b.id));}return result;}
function cueHtml(c){const cue=custom[c.id]||c.cue;if(custom[c.id]||!c.hook||!cue.includes(c.hook))return esc(cue);const i=cue.indexOf(c.hook);return esc(cue.slice(0,i))+'<mark class="hook">'+esc(c.hook)+'</mark>'+esc(cue.slice(i+c.hook.length));}
function stressText(p){return p?`${p.syllables} 音節 · ${p.syllables===1?'單音節':'第 '+p.primaryStress+' 音節重讀'}`:'';}
function familyLinks(c){return c.families?.length?`<p class="families">字族：${c.families.map(f=>`<a href="../roots/index.html#${esc(f.id)}">${esc(f.type)} ${esc(f.key)}（${esc(f.meaning)}）</a>`).join('')}</p>`:'';}
function cardHtml(c){const open=revealed.has(c.id),saved=recallRecord(c),reverse=direction()==='reverse',word=c.displayWord||c.word;
return `<article class="word-card" data-id="${esc(c.id)}"><div class="topline"><span>${esc(c.category)}</span><span class="method method-${METHODS.indexOf(c.method)}">${esc(c.method)}</span></div>
<p class="recall-prompt">${reverse?"看中文，先說英文並拼字":"看英文，先說中文意思"}</p><h2 lang="${reverse?"zh-Hant":"en"}">${esc(reverse?recallMeaning(c):word)}</h2>${reverse?"":`<p class="phonetic" lang="en">音素：${esc(c.sounds)}</p><p class="pronunciation">${esc(stressText(c.pronunciation))}</p>`}
<div class="actions"><button class="play" data-play="${esc(c.id)}" aria-label="${reverse?"聽答案提示":"播放 "+esc(word)} 的四段聯想 MP3" aria-pressed="false">▶ 四段聯想 MP3</button><a class="download" href="${trioUrl(c)}?v=${AUDIO_VERSION}" download="${esc(c.word)}-聯想.mp3" aria-label="${reverse?"下載答案音訊":"下載 "+esc(word)+" MP3"}">↓ MP3</a></div>
<p class="audio-order">英文 → ${c.method==='諧音聯想'?'近音口訣':'聯想提示'} → 中文意思 → 英文</p>
<button data-reveal="${esc(c.id)}" aria-expanded="${open}" aria-controls="answer-${esc(c.id)}">${open?'遮住答案，再回想':'翻卡：看意思與聯想'}</button>
<div class="answer" id="answer-${esc(c.id)}" ${open?'':'hidden'}>${reverse?`<h3 lang="en">${esc(word)}</h3><p class="pronunciation">${esc(stressText(c.pronunciation))}</p>`:""}<div class="icon" aria-hidden="true">${esc(c.icon)}</div><p class="meaning">${esc(c.zh)}</p>${c.hook&&!custom[c.id]?`<p class="hook-badge"><span>${c.method==='外來語借音'?'借音':'諧音'}</span>「${esc(c.hook)}」</p>`:''}<p class="cue">${cueHtml(c)}</p>${custom[c.id]?`<p class="status">MP3 朗讀本站原始口訣「${esc(c.cue)}」；自訂口訣只儲存在此瀏覽器。</p>`:''}<p class="scene">${esc(custom[c.id]?'用自己的口訣連結這個字的意思，再跟著 MP3 念一次。':c.scene)}</p>
<p class="spell"><strong>拼字鉤子</strong>${esc(c.spell)}</p><div class="example"><p lang="en">${esc(c.example)}</p><p>${esc(c.exampleZh)}</p></div>
${c.soundBridge?`<div class="sound-bridge"><strong>${esc(c.soundBridge.scope)}</strong><p>${esc(c.soundBridge.note)}</p></div>`:''}${c.soundNote?`<p class="sound-note">辨音：${esc(c.soundNote)}</p>`:''}${familyLinks(c)}
<p class="dictionary"><a href="${esc(c.dictionaryUrl)}" target="_blank" rel="noopener noreferrer">查詞典：發音與用法 ↗</a></p><div class="grade"><button data-grade="${esc(c.id)}" data-correct="false">還沒記住</button><button data-grade="${esc(c.id)}" data-correct="true">回想答對了</button></div>
<details class="custom"><summary>寫我的聯想口訣</summary><label for="custom-${esc(c.id)}">口訣（最多 200 字）</label><textarea id="custom-${esc(c.id)}" maxlength="200">${esc(custom[c.id]||'')}</textarea><button data-save="${esc(c.id)}">儲存口訣</button><button data-reset="${esc(c.id)}">恢復原口訣</button></details></div>
<p class="status">${saved?`已練習 ${Number(saved.reviews)||0} 次 · 下次 ${new Date(saved.due).toLocaleString('zh-TW')}`:'尚未練習'}</p></article>`;}
function render(){stop();const filtered=list();page=Math.max(0,Math.min(page,Math.ceil(filtered.length/SIZE)-1));$('#count').textContent=`${filtered.length.toLocaleString()} / 1,000 字 · 已練習 ${cards.filter(c=>recallRecord(c)).length} 字`;
$('#cards').innerHTML=filtered.slice(page*SIZE,(page+1)*SIZE).map(cardHtml).join('')||'<p>沒有符合條件的字卡。可清除搜尋或切換篩選。</p>';
playlist.refresh();$('#prev').disabled=page===0;$('#next').disabled=(page+1)*SIZE>=filtered.length;$('#page').textContent=`${filtered.length?page+1:0} / ${Math.ceil(filtered.length/SIZE)} 頁`;
}
$('#cards').addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset,id=d.play||d.reveal||d.grade||d.save||d.reset,c=cards.find(c=>c.id===id);if(!c)return;
if(d.play){playlist.stop();if(active===id&&!player.paused){player.pause();b.textContent='▶ 繼續播放';b.setAttribute('aria-pressed','false');return;}if(active!==id){stop();active=id;player.src=new URL(trioUrl(c)+'?v='+AUDIO_VERSION,import.meta.url).href;}try{await player.play();if(active===id){b.textContent='Ⅱ 暫停';b.setAttribute('aria-pressed','true');}}catch{if(active!==id)return;stop();$('#notice').textContent='無法開始播放，請重試或使用 MP3 下載。';}return;}
if(d.reveal){revealed.has(id)?revealed.delete(id):revealed.add(id);const answer=$('#answer-'+id);answer.hidden=!revealed.has(id);b.setAttribute('aria-expanded',String(!answer.hidden));b.textContent=answer.hidden?'翻卡：看意思與聯想':'遮住答案，再回想';return;}
if(d.grade){const ok=d.correct==='true',old=progress[id];progress[id]=recordRecall(old,ok,direction());save();revealed.delete(id);render();$('#notice').textContent=`${c.displayWord||c.word} 已記錄；${ok?'依此方向的回想進度安排下次複習。':'十分鐘後再試一次。'}`;}
if(d.save){const value=$('#custom-'+id).value.trim();if(value)custom[id]=value.slice(0,200);else delete custom[id];save();render();$('#notice').textContent='口訣已儲存。';}
if(d.reset){delete custom[id];save();render();$('#notice').textContent='已恢復原口訣。';}
});
for(const id of ['search','category','kind','review','direction'])$('#'+id).addEventListener(id==='search'?'input':'change',()=>{page=0;revealed.clear();if(id==='direction')playlist.stop();render();});
for(const [id,delta]of [['prev',-1],['next',1]])$('#'+id).addEventListener('click',()=>{page+=delta;render();$('#cards').scrollIntoView({block:'start'});$('#cards h2')?.setAttribute('tabindex','-1');$('#cards h2')?.focus({preventScroll:true});});
$('#shuffle').addEventListener('click',()=>{order=cards.map(c=>c.id);for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}page=0;render();});
$('#export').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({version:1,progress,custom},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='english-quest-mnemonics-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$('#import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2000000)throw Error();const data=JSON.parse(await file.text());if(data.version!==1||!data.progress||!data.custom)throw Error();const ids=new Set(cards.map(c=>c.id));for(const [id,value]of Object.entries(data.custom)){if(ids.has(id)&&typeof value==='string')custom[id]=value.slice(0,200);}for(const [id,value]of Object.entries(data.progress)){if(ids.has(id)){const safe=cleanRecord(value);if(safe)progress[id]=safe;}}save();render();$('#notice').textContent='已合併匯入備份。';}catch{$('#notice').textContent='無法匯入；請選擇本頁匯出的 JSON 備份。';}e.target.value='';});
window.addEventListener('pagehide',()=>{stop();playlist.stop();});
try{const r=await fetch(new URL('cards.json?v='+AUDIO_VERSION,import.meta.url));if(!r.ok)throw Error();cards=await r.json();if(!Array.isArray(cards)||cards.length!==1000)throw Error();
 $('#category').innerHTML='<option value="">全部主題</option>'+[...new Set(cards.map(c=>c.category))].map(c=>`<option>${esc(c)}</option>`).join('');
 const used=METHODS.filter(m=>cards.some(c=>c.method===m)),count=m=>cards.filter(c=>c.method===m).length;
 $('#kind').innerHTML='<option value="">全部聯想方法</option>'+used.map(m=>`<option value="${esc(m)}">${esc(m)}（${count(m)}）</option>`).join('');
 $('#hero-stats').textContent='1,000 個不同單字 · '+used.map(m=>`${m} ${count(m)} 張`).join(' · ')+' · 每張都有拼字鉤子與例句';
 $('#editorial').textContent='本版 1,000 張逐詞重寫：'+used.map(m=>m+' '+count(m)+' 張').join('、')+`；${cards.filter(c=>c.families?.length).length} 張可直接連到字根字族。全部 MP3 的英文、口訣、意思與重複英文都依本版文字校驗。`;
 const q=new URLSearchParams(location.search).get('q');if(q){$('#search').value=q.slice(0,60);}
 render();}catch{$('#count').textContent='字卡載入失敗，請重新整理再試。';}
