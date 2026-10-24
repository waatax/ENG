import {showVocabularyCard,hideVocabularyCard} from './vocabulary_card.mjs';
// audio.mjs - 雙擎語音播放引擎（Web Speech Synthesis + Web Audio API Fallback）

let voices = [];
const activeUtterances = new Set();
let currentUtterance = null;
let sequencePlaying = false;
let sequenceQueue = [];
let sequenceIndex = 0;
let sequenceStepCallback = null;
let sequenceFinishCallback = null;

function loadVoices() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof window.speechSynthesis?.getVoices !== 'function') return;
  voices = window.speechSynthesis.getVoices() || [];
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.speechSynthesis?.getVoices === 'function') {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

// Locale is checked before name; a preferred name cannot override en-US.
const VOICE_KEY='eq-american-conversation-voices-v1';
let voicePreferences=[];
try { const saved=JSON.parse(globalThis.localStorage?.getItem(VOICE_KEY)||'[]');if(Array.isArray(saved))voicePreferences=saved.slice(0,2); } catch {}
function voiceScore(v) {
 return /Natural|Neural|Premium|Enhanced/i.test(v.name)?100:/Google US English/i.test(v.name)?80:/Samantha|Alex/i.test(v.name)?60:10;
}
export function americanVoices(available) {
 if(!available){loadVoices();available=voices;}
 return available.filter(v=>/^en[-_]US$/i.test(v.lang)).slice().sort((a,b)=>voiceScore(b)-voiceScore(a));
}
export function selectAmericanVoice(available,role=0) {
 const us=americanVoices(available), slot=role===1?1:0;
 const bestTier=us.filter(v=>voiceScore(v)===voiceScore(us[0]||{name:''}));
 return us.find(v=>v.name===voicePreferences[slot]) || bestTier[slot] || us[0] || null;
}
export function getBestEnglishVoice(role=0) {loadVoices();return selectAmericanVoice(voices,role);}
export function setAmericanVoice(role,name) {
 const slot=role===1?1:0;
 if(name && !americanVoices().some(v=>v.name===name))return false;
 voicePreferences[slot]=name||'';
 try{globalThis.localStorage?.setItem(VOICE_KEY,JSON.stringify(voicePreferences));}catch{}
 return true;
}
export function englishVoiceDescription() {
 const a=getBestEnglishVoice(0),b=getBestEnglishVoice(1);
 return a ? `A: ${a.name} · B: ${b.name} · en-US${a===b?'（兩角色共用此音色）':''}` : '尚未找到美式英文聲音。請在系統安裝 English (United States) 語音，重新整理後再播放。';
}
const escapeVoice=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function voiceOptions(role) {
 return `<option value="">自動選擇美式聲音</option>`+americanVoices().map(v=>`<option value="${escapeVoice(v.name)}" ${voicePreferences[role]===v.name?'selected':''}>${escapeVoice(v.name)}</option>`).join('');
}
export function renderAmericanVoiceSettings() {
 return `<details class="american-voice-settings"><summary>美式聲音設定與試聽方式</summary><p>所有會話角色使用 en-US 聲音，優先選擇裝置提供的自然聲音。可選 A／B 音色，再播放任一會話試聽；使用正常音高，並保留完整句子的節奏。</p><div class="conversation-filters">${[0,1].map(role=>`<label>角色 ${role?'B':'A'} 聲音<select data-american-voice="${role}" aria-label="角色 ${role?'B':'A'} 美式聲音">${voiceOptions(role)}</select></label>`).join('')}</div><p data-american-voice-status>${escapeVoice(englishVoiceDescription())}</p><p>找不到美式聲音時會停止並保留句子位置；可安裝系統美式語音後重試。若只有一種，兩個角色會共用。名稱標示自然的聲音仍需依你的裝置實際試聽。</p></details>`;
}
if(typeof window!=='undefined')window.speechSynthesis?.addEventListener?.('voiceschanged',()=>{
 if(typeof document==='undefined')return;
 document.querySelectorAll('[data-american-voice]').forEach(el=>{el.innerHTML=voiceOptions(Number(el.dataset.americanVoice));});
 document.querySelectorAll('[data-american-voice-status],[data-home-voice]').forEach(el=>{el.textContent=englishVoiceDescription();});
});

// 優先挑選自然繁體中文或流暢普通話發音
export function getBestChineseVoice() {
  if (!voices.length) loadVoices();
  const preferred = [
    'Google 國語（臺灣）',
    'Microsoft Hanhan',
    'Microsoft HsiaoChen',
    'Microsoft Yating',
    'Microsoft Zhiwei',
    'Mei-Jia',
    'Ting-Ting',
    'Sin-Ji'
  ];
  for (const name of preferred) {
    const v = voices.find(x => x.name.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith('zh-TW')) ||
         voices.find(v => v.lang.startsWith('zh-HK')) ||
         voices.find(v => v.lang.startsWith('zh')) || null;
}

// Completion-driven chunks preserve the entire text without a timer cutting speech short.
let speechGeneration = 0;
let voiceWaitTimer=null,voiceWaitHandler=null;
function clearVoiceWait(){
 if(voiceWaitTimer!==null){clearTimeout(voiceWaitTimer);voiceWaitTimer=null;}
 if(voiceWaitHandler){globalThis.window?.speechSynthesis?.removeEventListener?.('voiceschanged',voiceWaitHandler);voiceWaitHandler=null;}
}
export function speechChunks(text, limit = 110) {
  const clean = String(text || '').replace(/\*\*|\*|__/g, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const result = [];let remaining=clean;
  while (remaining.length>limit) {
    let cut=remaining.lastIndexOf(' ',limit);
    const boundaries=[...remaining.slice(0,limit+1).matchAll(/[.!?]["”']?(?:\s|$)|[;,:]\s/g)];
    const boundary=boundaries.at(-1);
    if(boundary && boundary.index>=limit*.45)cut=boundary.index+boundary[0].trimEnd().length;
    if(cut<=0){cut=remaining.indexOf(' ',limit);if(cut<0)break;}
    result.push(remaining.slice(0,cut));remaining=remaining.slice(cut).trimStart();
  }
  if(remaining)result.push(remaining);
  return result;
}
export function speak(text, {rate=1, pitch=1, lang='en-US', voiceRole=0, requireAmerican=false, chunkLimit=110, onStart, onEnd, onError}={}) {
  const generation=++speechGeneration;
  clearVoiceWait();
  const chunks=speechChunks(text,chunkLimit);
  if(typeof window==='undefined'||!window.speechSynthesis){onError?.(new Error('SpeechSynthesis not supported'));return;}
  const synth=window.speechSynthesis;
  if(synth.speaking||synth.pending){try{synth.cancel();}catch{}}
  activeUtterances.clear();currentUtterance=null;
  if(!chunks.length){onEnd?.();return;}
  let index=0,started=false,finished=false;
  const valid=()=>generation===speechGeneration&&!finished;
  const fail=e=>{if(!valid())return;finished=true;activeUtterances.clear();currentUtterance=null;onError?.(e);};
  function next(){
    if(!valid())return;
    if(index===chunks.length){finished=true;onEnd?.();return;}
    const utterance=new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang=lang;utterance.rate=Math.max(.5,Math.min(2,rate));utterance.pitch=Math.max(.5,Math.min(1.5,pitch));
    const voice=lang.startsWith('zh')?getBestChineseVoice():getBestEnglishVoice(voiceRole);
    if(requireAmerican && /^en/i.test(lang) && !voice){fail(new Error('找不到美式英文聲音。請安裝 English (United States) 語音後重試，已保留本句位置。'));return;}
    if(voice)utterance.voice=voice;
    let ended=false;
    activeUtterances.add(utterance);currentUtterance=utterance;
    utterance.onstart=()=>{if(valid()&&!started){started=true;onStart?.();}};
    utterance.onend=()=>{
      if(ended||!valid())return;ended=true;activeUtterances.delete(utterance);currentUtterance=null;
      index++;next();
    };
    utterance.onerror=e=>{if(ended)return;ended=true;fail(e);};
    try{synth.speak(utterance);}catch(e){fail(e);}
  }
  if(requireAmerican && /^en/i.test(lang) && !getBestEnglishVoice(voiceRole) && synth.addEventListener) {
    voiceWaitHandler=()=>{if(valid()&&getBestEnglishVoice(voiceRole)){clearVoiceWait();next();}};
    synth.addEventListener('voiceschanged',voiceWaitHandler);
    voiceWaitTimer=setTimeout(()=>{clearVoiceWait();if(valid())next();},1800);
  } else next();
}

// 快速播放單字（支援慢速 0.75x）
export function playWord(word, slow = false, callbacks = {}) {
  if(typeof document!=='undefined'&&!document.querySelector('.fc-card-stage'))showVocabularyCard({word},{label:'單字發音',stop:()=>stopAudio()});
  speak(word, { rate: slow ? 0.72 : 0.95, lang: 'en-US', ...callbacks });
}

// 快速播放片語與例句
export function playSentence(sentence, slow = false, callbacks = {}) {
  speak(sentence, { rate: slow ? 0.75 : 0.95, lang: 'en-US', ...callbacks });
}

// 快速播放繁體中文（釋義或教學提示）
export function playChinese(text, callbacks = {}) {
  speak(text, { lang: 'zh-TW', rate: 0.95, ...callbacks });
}

let sequenceToken=0,sequenceTimer=null;
export function playSequence(items,onStep,onFinish){
 stopAudio();const token=++sequenceToken;
 sequenceQueue=items||[];sequenceIndex=0;sequencePlaying=true;
 sequenceStepCallback=onStep;sequenceFinishCallback=onFinish;
 function next(){
  if(!sequencePlaying||token!==sequenceToken)return;
  if(sequenceIndex>=sequenceQueue.length){const done=sequenceFinishCallback;stopSequence();done?.();return;}
  const item=sequenceQueue[sequenceIndex];onStep?.(sequenceIndex,item);
  speak(typeof item==='string'?item:item.text,{
   lang:item.lang||'en-US',rate:item.slow?.75:(item.rate||.95),requireAmerican:item.requireAmerican||false,voiceRole:item.voiceRole||0,chunkLimit:item.chunkLimit||110,
   onEnd:()=>{if(!sequencePlaying||token!==sequenceToken)return;sequenceIndex++;sequenceTimer=setTimeout(next,400);},
   onError:e=>{if(token!==sequenceToken)return;const done=sequenceFinishCallback;stopSequence();done?.(e);}
  });
 }
 next();
}
export function stopSequence(){
 sequenceToken++;if(sequenceTimer!==null){clearTimeout(sequenceTimer);sequenceTimer=null;}
 sequencePlaying=false;sequenceQueue=[];sequenceIndex=0;
 const step=sequenceStepCallback;sequenceStepCallback=null;sequenceFinishCallback=null;step?.(-1,null);
}

export function stopAudio() {
  speechGeneration++;
  clearVoiceWait();
  stopSequence();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  activeUtterances.clear();
  currentUtterance = null;
}

export function isAudioActive() {
  return sequencePlaying || (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking);
}

// Web Audio API 提示音合成備援
function fallbackBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}
