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

// 優先挑選自然的美式或英式英語發音
export function getBestEnglishVoice() {
  if (!voices.length) loadVoices();
  const preferred = [
    'Google US English',
    'Microsoft Jenny Online (Natural) - English (United States)',
    'Microsoft Guy Online (Natural) - English (United States)',
    'Microsoft Zira - English (United States)',
    'Microsoft David - English (United States)',
    'Samantha',
    'Alex',
    'Victoria',
    'Daniel'
  ];
  for (const name of preferred) {
    const v = voices.find(x => x.name.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith('en-US')) ||
         voices.find(v => v.lang.startsWith('en')) || null;
}

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
export function speechChunks(text, limit = 110) {
  const clean = String(text || '').replace(/\*\*|\*|__/g, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
  const result = [];let remaining=clean;
  while (remaining.length>limit) {
    let cut=remaining.lastIndexOf(' ',limit);
    if(cut<=0){cut=remaining.indexOf(' ',limit);if(cut<0)break;}
    result.push(remaining.slice(0,cut));remaining=remaining.slice(cut).trimStart();
  }
  if(remaining)result.push(remaining);
  return result;
}
export function speak(text, {rate=1, pitch=1, lang='en-US', onStart, onEnd, onError}={}) {
  const generation=++speechGeneration;
  const chunks=speechChunks(text);
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
    const voice=lang.startsWith('zh')?getBestChineseVoice():getBestEnglishVoice();
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
  next();
}

// 快速播放單字（支援慢速 0.75x）
export function playWord(word, slow = false, callbacks = {}) {
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
   lang:item.lang||'en-US',rate:item.slow?.75:.95,
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
