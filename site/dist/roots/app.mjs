import {shuffledWords} from '../word_queue.mjs';
import {showVocabularyCard,hideVocabularyCard} from '../vocabulary_card.mjs';
import {createMnemonicPlaylist,AUDIO_VERSION} from '../mnemonics/mnemonic_playlist.mjs?v=keyword6r2';
const $=s=>document.querySelector(s),KEY='eq-word-families-v1',SIZE=12,esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TYPES=['複合詞字族','字首','字尾','字根'];
let groups=[],timing=new Map(),progress={},page=0,order=null,cardWords=new Set();
try{const saved=JSON.parse(localStorage.getItem(KEY)||'{}');if(saved&&typeof saved==='object'&&saved.progress)progress=saved.progress;}catch{$('#notice').textContent='無法讀取舊進度，仍可使用字族。';}
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:1,progress}));}catch{$('#notice').textContent='無法儲存到此瀏覽器；請匯出備份。';}}
const fileFor=g=>'audio/'+g.id+'.mp3';const url=g=>new URL(fileFor(g)+'?v='+AUDIO_VERSION,import.meta.url).href;
// Single-group and single-word player: one Audio element; a word clip stops at its Chinese part's end.
const player=new Audio();player.preload='none';let active=null,clipEnd=null;
function clearMarks(){document.querySelectorAll('.member.speaking').forEach(el=>el.classList.remove('speaking'));}
function stop(){player.pause();active=null;queueMicrotask(()=>{if(!playlist.getState().current)hideVocabularyCard();});clipEnd=null;clearMarks();document.querySelectorAll('[data-play]').forEach(b=>{b.textContent='▶ 整組 MP3';b.setAttribute('aria-pressed','false');});}
function mark(id,time){const parts=timing.get(id);if(!parts)return;const part=parts.filter(p=>time>=p.start).at(-1)||parts[0];const group=groups.find(g=>g.id===id);if(group&&part){const member=group.members[part.member];const audio=active?player:allAudio;showVocabularyCard(member?{id:group.id+'-'+part.member,word:member.word,zh:member.zh,tip:member.parts}:{id:group.id,word:group.display,zh:group.meaning,tip:group.tip},{back:part.role==='chinese',paused:audio.paused,label:group.typeLabel+' · '+group.display,toggle:()=>{if(active){if(player.paused)player.play().catch(()=>{});else player.pause();}else void playlist.toggle();},stop:()=>{stop();playlist.stop();hideVocabularyCard();}});}document.querySelectorAll(`[data-group="${id}"].member`).forEach(el=>el.classList.toggle('speaking',!!part&&Number(el.dataset.member)===part.member));}
player.addEventListener('timeupdate',()=>{if(!active)return;if(clipEnd!==null&&player.currentTime>=clipEnd){stop();return;}mark(active,player.currentTime);});
player.addEventListener('ended',stop);player.addEventListener('error',()=>{if(!active)return;stop();$('#notice').textContent='MP3 無法載入，請重試或下載音檔。';});
const allAudio=new Audio();allAudio.preload='none';
allAudio.addEventListener('timeupdate',()=>{const s=playlist.getState();if(s.current)mark(s.current.id,allAudio.currentTime);});
function updateAll(state){
 const busy=['loading','playing','paused','error'].includes(state.status);
 $('#play-all').disabled=!groups.length||busy;$('#all-stop').disabled=!busy;$('#all-next').disabled=!['playing','paused','error'].includes(state.status);
 const pause=$('#all-pause');pause.disabled=!['playing','paused','error'].includes(state.status);pause.textContent=state.status==='paused'?'▶ 繼續播放':state.status==='error'?'▶ 重試這組':'Ⅱ 暫停';pause.setAttribute('aria-pressed',String(state.status==='paused'));
 const c=state.current,prefix=state.status==='loading'?'載入中':state.status==='paused'?'已暫停':state.status==='error'?'播放中斷':'正在播放';
 $('#all-status').textContent=state.status==='complete'?`本次連播已結束（共 ${state.total} 組）。`:c?`${prefix} · 第 ${state.index+1} / ${state.total} 組 · ${c.typeLabel} ${c.display}：${c.meaning}${state.error?'。'+state.error:''}`:`目前清單 ${list().length} 組，按「依序播放字族」開始。`;
 $('#all-progress').max=state.total||list().length||500;$('#all-progress').value=state.status==='complete'?state.total:busy?state.index+1:0;
 document.querySelectorAll('.family').forEach(el=>el.classList.toggle('is-playing',busy&&el.dataset.id===c?.id));if(!busy){clearMarks();if(!active)hideVocabularyCard();}else if(c)mark(c.id,allAudio.currentTime);
}
for(const a of [player,allAudio])for(const event of ['playing','pause','seeked'])a.addEventListener(event,()=>{const id=active||playlist.getState().current?.id;if(id)mark(id,a.currentTime);});
let playbackSelection=null;
const playlist=createMnemonicPlaylist({audio:allAudio,getCards:()=>playbackSelection||list(),stopOther:stop,onState:updateAll,baseUrl:import.meta.url,fileFor});
$('#play-all').addEventListener('click',()=>{playbackSelection=null;void playlist.start();});$('#all-pause').addEventListener('click',()=>{void playlist.toggle();});
$('#all-next').addEventListener('click',()=>{void playlist.next();});$('#all-stop').addEventListener('click',()=>playlist.stop());
const haystack=g=>[g.key,g.display,g.meaning,g.tip,g.typeLabel,...g.members.flatMap(m=>[m.word,m.zh,m.parts])].join(' ').toLowerCase();
function list(){const q=$('#search').value.trim().toLowerCase(),type=$('#type').value,mode=$('#review').value,now=Date.now();
 let result=groups.filter(g=>(!q||haystack(g).includes(q))&&(!type||g.typeLabel===type)&&(mode==='all'||(mode==='new'?!progress[g.id]:mode==='known'?Number(progress[g.id]?.step)>=1:Number(progress[g.id]?.due)<=now)));
 if(order){const rank=new Map(order.map((id,i)=>[id,i]));result.sort((a,b)=>rank.get(a.id)-rank.get(b.id));}return result;}
function groupHtml(g){const saved=progress[g.id];
 return `<article class="family type-${TYPES.indexOf(g.typeLabel)}" id="${g.id}" data-id="${g.id}"><div class="topline"><span class="type">${esc(g.typeLabel)}</span><span>${g.id.replace('wf-','#')}</span></div>
<h2 lang="en">${esc(g.display)}</h2><p class="meaning">${esc(g.meaning)}</p><p class="tip">${esc(g.tip)}</p>
<div class="actions"><button class="play" data-play="${g.id}" aria-pressed="false" aria-label="播放 ${esc(g.display)} 整組 MP3">▶ 整組 MP3</button><a class="download" href="${fileFor(g)}?v=${AUDIO_VERSION}" download="${g.id}-${esc(g.variants[0])}.mp3" aria-label="下載 ${esc(g.display)} MP3">↓ MP3</a></div>
<ol class="members">${g.members.map((m,i)=>`<li><button class="member" type="button" data-group="${g.id}" data-member="${i}" aria-label="播放 ${esc(m.word)}"><span class="w" lang="en">${esc(m.word)}</span><span class="zh">${esc(m.zh)}</span></button><span class="parts">${esc(m.parts)}</span>${cardWords.has(m.word.toLowerCase())?`<a class="card-link" href="../mnemonics/index.html?q=${encodeURIComponent(m.word.toLowerCase())}#cards">聯想卡</a>`:''}</li>`).join('')}</ol>
<div class="grade"><button data-grade="${g.id}" data-correct="false">還不熟</button><button data-grade="${g.id}" data-correct="true">記住了</button></div>
<p class="status">${saved?`已練習 ${Number(saved.reviews)||0} 次 · 下次 ${new Date(saved.due).toLocaleDateString('zh-TW')}`:'尚未練習'}</p></article>`;}
function render(){stop();const filtered=list(),pages=Math.max(1,Math.ceil(filtered.length/SIZE));page=Math.max(0,Math.min(page,pages-1));
 $('#count').textContent=`${filtered.length} / 500 組 · 已練習 ${groups.filter(g=>progress[g.id]).length} 組`;
 $('#families').innerHTML=filtered.slice(page*SIZE,(page+1)*SIZE).map(groupHtml).join('')||'<p>沒有符合條件的字族。可清除搜尋或切換篩選。</p>';
 $('#families').classList.toggle('quiz',$('#quiz').checked);playlist.refresh();
 $('#prev').disabled=page===0;$('#next').disabled=(page+1)*SIZE>=filtered.length;$('#page').textContent=`${filtered.length?page+1:0} / ${Math.ceil(filtered.length/SIZE)} 頁`;}
async function start(button,g,from=0,until=null){playlist.stop();if(active!==g.id){stop();active=g.id;player.src=url(g);}clipEnd=until;
 const seek=()=>{player.currentTime=from;};if(player.readyState>=1)seek();else player.addEventListener('loadedmetadata',seek,{once:true});
 try{await player.play();if(button){button.textContent='Ⅱ 暫停';button.setAttribute('aria-pressed','true');}}catch{if(active!==g.id)return;stop();$('#notice').textContent='無法開始播放，請重試或使用 MP3 下載。';}}
$('#families').addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset,id=d.play||d.group||d.grade,g=groups.find(g=>g.id===id);if(!g)return;
 if(d.play){if(active===id&&!player.paused&&clipEnd===null){player.pause();b.textContent='▶ 繼續播放';b.setAttribute('aria-pressed','false');return;}if(active===id&&player.paused&&clipEnd===null&&player.currentTime>0){await start(b,g,player.currentTime);return;}stop();await start(b,g,0);return;}
 if(d.member!==undefined){b.classList.add('revealed');const parts=(timing.get(id)||[]).filter(p=>p.member===Number(d.member));if(!parts.length){$('#notice').textContent='這組音檔的時間資料尚未載入。';return;}stop();await start(null,g,Math.max(0,parts[0].start-.05),parts[parts.length-1].end+.15);return;}
 if(d.grade){const ok=d.correct==='true',old=progress[id],step=ok?Math.min((Number(old?.step)||0)+1,4):0;progress[id]={step,reviews:(Number(old?.reviews)||0)+1,due:Date.now()+(ok?[0,1,3,7,14][step]*86400000:600000)};save();render();$('#notice').textContent=`${g.display} 已記錄；${ok?'依進度安排下次複習。':'十分鐘後再練一次。'}`;}
});
for(const id of ['search','type','review'])$('#'+id).addEventListener(id==='search'?'input':'change',()=>{page=0;order=null;render();});
$('#quiz').addEventListener('change',()=>{document.querySelectorAll('.member.revealed').forEach(el=>el.classList.remove('revealed'));$('#families').classList.toggle('quiz',$('#quiz').checked);});
for(const [id,delta]of [['prev',-1],['next',1]])$('#'+id).addEventListener('click',()=>{page+=delta;render();$('#families').scrollIntoView({block:'start'});$('#families h2')?.setAttribute('tabindex','-1');$('#families h2')?.focus({preventScroll:true});});
$('#shuffle').addEventListener('click',()=>{order=groups.map(g=>g.id);for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}page=0;render();});
$('#export').addEventListener('click',()=>{const href=URL.createObjectURL(new Blob([JSON.stringify({version:1,progress},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=href;a.download='english-quest-word-families-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(href),1000);});
$('#import').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>1000000)throw Error();const data=JSON.parse(await file.text());if(data.version!==1||!data.progress)throw Error();const ids=new Set(groups.map(g=>g.id));for(const [id,v]of Object.entries(data.progress)){if(ids.has(id)&&Number.isFinite(v?.due)&&Number.isInteger(v.reviews)&&v.reviews>=0&&Number.isInteger(v.step)&&v.step>=0&&v.step<=4)progress[id]={due:v.due,reviews:v.reviews,step:v.step};}save();render();$('#notice').textContent='已合併匯入備份。';}catch{$('#notice').textContent='無法匯入；請選擇本頁匯出的 JSON 備份。';}e.target.value='';});
function openHash(){const id=location.hash.slice(1);if(!/^wf-\d{3}$/.test(id))return;const g=groups.find(g=>g.id===id);if(!g)return;$('#search').value='';$('#type').value='';$('#review').value='all';order=null;page=Math.floor(groups.indexOf(g)/SIZE);render();const el=document.getElementById(id);if(el){el.classList.add('target');el.scrollIntoView({block:'center'});el.querySelector('h2')?.setAttribute('tabindex','-1');el.querySelector('h2')?.focus({preventScroll:true});}}
window.addEventListener('hashchange',openHash);window.addEventListener('pagehide',()=>{stop();playlist.stop();});
try{const [g,a,c]=await Promise.all(['groups.json','audio-manifest.json','../mnemonics/cards.json'].map(f=>fetch(new URL(f+'?v='+AUDIO_VERSION,import.meta.url)).then(r=>{if(!r.ok)throw Error(f);return r.json();})));
 groups=g.groups;if(groups.length!==500)throw Error('groups');for(const r of a.records)timing.set(r.id,r.parts);cardWords=new Set(c.map(x=>x.word));
 $('#type').innerHTML='<option value="">全部類型</option>'+TYPES.map(t=>`<option value="${t}">${t}（${groups.filter(x=>x.typeLabel===t).length}）</option>`).join('');
 $('#hero-stats').textContent=`500 組字族 · ${TYPES.map(t=>`${t} ${groups.filter(x=>x.typeLabel===t).length} 組`).join(' · ')} · ${g.members.toLocaleString()} 個成員字`;
 render();openHash();}catch{$('#count').textContent='字族載入失敗，請重新整理再試。';}

for(const mode of ['random','wrong'])$('#play-'+mode).addEventListener('click',()=>{const selected=mode==='random'?shuffledWords(list()):list().filter(g=>progress[g.id]?.reviews>0&&progress[g.id]?.step===0);if(!selected.length){$('#notice').textContent='目前篩選範圍沒有需要播放的錯題。';return;}playbackSelection=selected;void playlist.start();});
