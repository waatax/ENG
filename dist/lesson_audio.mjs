import { speak, stopAudio } from './audio.mjs';
export const escapeAudio = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e = escapeAudio;
const lessons = new Map();
let current = null, index = 0, playing = false, rate = .95, gap = 2, token = 0, timer = null, sleepAt = 0, sleepMinutes = 0, wake = null;
let message = '準備好後，按播放開始。';
const KEY = 'eq-lesson-listening-v1';
let saved = {};
let wakeRequest = 0;
try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch {}
if (!saved || typeof saved !== 'object' || Array.isArray(saved)) saved = {};
const savedIndex = lesson => Math.max(0,Math.min(Number.isInteger(saved[lesson.id]) ? saved[lesson.id] : 0,lesson.tracks.length-1));
export function spokenText(value) {
  return String(value ?? '').replace(/\\textcolor\{[^}]*\}\{([^}]*)\}/g,'$1').replace(/\\(?:textbf|text|mathrm)\{([^}]*)\}/g,'$1').replace(/<[^>]*>/g,' ').replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[#*`|]/g,' ').replace(/(?:→|➔|➡)/g,'，接著，').replace(/\s+/g,' ').trim();
}
export function speechSegments(text) {
  return (spokenText(text).match(/[A-Za-z][A-Za-z0-9\s.,!?;:'’()/%+−=–—-]*|[^A-Za-z]+/g) || []).flatMap(part => {
    const lang = /[\u3400-\u9fff]/.test(part) ? 'zh-TW' : 'en-US';
    return (part.match(/[^。！？；.!?;]+[。！？；.!?;]?/g) || []).map(text => ({text:text.trim(),lang})).filter(x=>/[\p{L}\p{N}]/u.test(x.text));
  });
}
export function registerAudioLesson(id, title, sections) {
  const tracks = sections.filter(s=>s.text).flatMap(s=>{
    const sentences=spokenText(s.title+'。'+s.text).match(/[^。！？.!?]+[。！？.!?]?/g)||[];
    return sentences.filter(text=>/[\p{L}\p{N}]/u.test(text)).map((text,i)=>({text:text.trim(),parts:speechSegments(text),section:s.title,recall:!!s.recall && i===sentences.length-1}));
  });
  lessons.set(id,{id,title,tracks});
  return id;
}
function persist() {
  if (!current) return;
  saved[current.id] = index;
  try { localStorage.setItem(KEY,JSON.stringify(saved)); } catch {}
}
function cancelPending() { token++; clearTimeout(timer); timer=null; stopAudio(); }
export function pauseLessonAudio() {
  if (!current) return;
  playing=false; wakeRequest++; cancelPending(); persist(); message='已暫停；繼續時從目前句首播放。';
  if(wake) { wake.release().catch(()=>{}); wake=null; }
  refresh();
}
function refresh() {
  const panel = typeof document !== 'undefined' && document.querySelector('[data-lesson-audio-panel]');
  if(!panel || !current || panel.dataset.lessonAudioPanel !== current.id) return;
  const status=panel.querySelector('[data-audio-status]');
  if(status) status.textContent=message;
  const transcript=panel.querySelector('[data-audio-transcript]');
  if(transcript) transcript.textContent=current.tracks[index]?.text || '本單元播放完成，試著用自己的話說出重點。';
  const progress=panel.querySelector('[data-audio-progress]');
  if(progress) progress.textContent=`${Math.min(index+1,current.tracks.length)} / ${current.tracks.length} · ${current.tracks[index]?.section || '完成'}`;
  panel.querySelectorAll('[data-la="play"]').forEach(b=>{b.textContent=playing?'播放中':'▶ 播放／繼續';b.disabled=playing;});
}
function run() {
  if(!playing || !current) return;
  if(sleepAt && Date.now() >= sleepAt) { sleepAt=0;sleepMinutes=0;pauseLessonAudio();message='定時停止時間已到。';refresh();return; }
  if(index >= current.tracks.length) { playing=false;persist();message='已完成本單元，請回想規則並自己造句。';if(wake){wake.release().catch(()=>{});wake=null;}refresh();return; }
  const item=current.tracks[index], generation=++token;
  message='正在播放：'+item.section;persist();refresh();
  let partIndex=0;
  function nextPart(){
    if(generation!==token || !playing) return;
    if(partIndex>=item.parts.length){
      index++;persist();timer=setTimeout(run,(item.recall?Math.max(6,gap):gap)*1000);return;
    }
    const part=item.parts[partIndex];
    speak(part.text,{lang:part.lang,rate,onEnd:()=>{if(generation!==token || !playing)return;partIndex++;nextPart();},onError:()=>{
      if(generation!==token)return;
      pauseLessonAudio();message='語音中斷或裝置不支援，已保留目前句子。請檢查英文／中文語音後重試。';refresh();
    }});
  }
  nextPart();
}
export function renderLessonAudio(id) {
  const lesson=lessons.get(id);if(!lesson || !lesson.tracks.length) return '';
  const position=current?.id===id?index:savedIndex(lesson);
  return `<section class="card lesson-audio" data-lesson-audio-panel="${e(id)}" aria-label="單元語音教學">
  <div class="pill">🎧 通勤聽課 · 中文解說 × 英文例句</div><h2>聽懂：${e(lesson.title)}</h2>
  <p>重點 → 例句 → 回想。暫停後從目前句首續播；進度保存在本機。聽過不會自動標記為精熟。</p>
  <div class="audio-controls"><button class="btn primary" data-la="play">▶ 播放／繼續</button><button class="btn" data-la="pause">⏸ 暫停</button><button class="btn" data-la="previous">⏮ 上一句</button><button class="btn" data-la="next">⏭ 下一句</button><button class="btn quiet" data-la="restart">↺ 從頭播放</button></div>
  <div class="audio-settings"><label>語速 <select data-la-setting="rate">${[.75,.95,1.1,1.25].map(v=>`<option value="${v}" ${rate===v?'selected':''}>${v} 倍</option>`).join('')}</select></label><label>跟讀停頓 <select data-la-setting="gap">${[0,2,4].map(v=>`<option value="${v}" ${gap===v?'selected':''}>${v} 秒</option>`).join('')}</select></label><label>定時停止 <select data-la-setting="sleep">${[0,10,20,30].map(v=>`<option value="${v}" ${(current?.id===id?sleepMinutes:0)===v?'selected':''}>${v?v+' 分鐘':'不設定'}</option>`).join('')}</select></label><button class="btn quiet" data-la="awake">☀ 開啟／關閉螢幕喚醒</button></div>
  <p data-audio-progress>${position+1} / ${lesson.tracks.length}</p><p data-audio-status role="status">${e(current?.id===id?message:'準備好後，按播放開始。')}</p><blockquote data-audio-transcript>${e(lesson.tracks[position]?.text)}</blockquote>
  <details><summary>段落目錄與聽課逐字稿</summary><div class="audio-controls">${lesson.tracks.flatMap((track,i)=>i===0||track.section!==lesson.tracks[i-1].section?[`<button class="btn quiet" data-la="jump" data-la-index="${i}">${e(track.section)}</button>`]:[]).join('')}</div><ol class="audio-track-list">${lesson.tracks.map((track,i)=>`<li><button class="btn quiet" data-la="jump" data-la-index="${i}">${i+1}. ${e(track.section)}：${e(track.text)}</button></li>`).join('')}</ol></details>
  <p class="small">使用裝置合成語音。鎖屏或切換 App 可能中斷；可回本頁續播。喚醒功能依瀏覽器支援，請於出發前設定。</p></section>`;
}
function selectPanel(target) {
  const id=target.closest('[data-lesson-audio-panel]')?.dataset.lessonAudioPanel;
  if(!lessons.has(id)) return false;
  if(current?.id!==id) { pauseLessonAudio();current=lessons.get(id);index=savedIndex(current);sleepAt=0;sleepMinutes=0; }
  return true;
}
export function handleLessonAudioClick(button) {
  const action=button.dataset.la;if(!action)return false;
  if(!selectPanel(button))return true;
  if(action==='pause'){pauseLessonAudio();return true;}
  if(action==='awake'){
    if(wake){wakeRequest++;wake.release().catch(()=>{});wake=null;message='已關閉保持喚醒。';refresh();return true;}
    if(typeof navigator==='undefined'||!navigator.wakeLock){message='此瀏覽器不支援保持喚醒；請調整裝置螢幕設定。';refresh();return true;}
    const owner=current.id, request=++wakeRequest;
    navigator.wakeLock.request('screen').then(lock=>{if(current?.id!==owner||request!==wakeRequest){lock.release();return;}wake=lock;lock.addEventListener?.('release',()=>{if(wake===lock){wake=null;message='螢幕喚醒已釋放，需要時可重新開啟。';refresh();}});message='已要求保持螢幕喚醒；切到背景後可能自動釋放。';refresh();}).catch(()=>{message='無法保持喚醒，請檢查省電模式或瀏覽器設定。';refresh();});return true;
  }
  cancelPending();
  if(action==='restart')index=0;
  if(action==='previous')index=Math.max(0,index-1);
  if(action==='next')index=Math.min(current.tracks.length,index+1);
  if(action==='jump')index=Math.max(0,Math.min(current.tracks.length-1,Number(button.dataset.laIndex)||0));
  if(action==='play' && index>=current.tracks.length)index=0;
  playing=true;run();return true;
}
export function handleLessonAudioChange(target) {
  const setting=target.dataset.laSetting;if(!setting||!selectPanel(target))return false;
  const value=Number(target.value);
  if(setting==='rate'&&[.75,.95,1.1,1.25].includes(value))rate=value;
  if(setting==='gap'&&[0,2,4].includes(value))gap=value;
  if(setting==='sleep'&&[0,10,20,30].includes(value)){sleepMinutes=value;sleepAt=value?Date.now()+value*60000:0;}
  if(playing){cancelPending();run();}return true;
}
export function syncLessonAudio() {
  const panel=document.querySelector('[data-lesson-audio-panel]');
  if(current && panel?.dataset.lessonAudioPanel!==current.id)pauseLessonAudio();
  refresh();
}
export function getLessonAudioState(){return {id:current?.id,index,playing,rate,gap,tracks:current?.tracks.length||0};}
