// audio.mjs - 雙擎語音播放引擎（Web Speech Synthesis + Web Audio API Fallback）

let voices = [];
const activeUtterances = new Set();
let speechWatchdog = null;
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

function startWatchdog() {
  if (speechWatchdog || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  speechWatchdog = setInterval(() => {
    try {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    } catch (e) {}
  }, 10000);
}

function stopWatchdog() {
  if (speechWatchdog) {
    clearInterval(speechWatchdog);
    speechWatchdog = null;
  }
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

// 核心播放單一文字
export function speak(text, { rate = 1.0, pitch = 1.0, lang = 'en-US', onStart, onEnd, onError } = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    fallbackBeep();
    if (onError) onError(new Error('SpeechSynthesis not supported'));
    return;
  }

  // 整理朗讀文本，消除 Markdown 語法標記或多餘空白，確保完整發音
  const cleanText = String(text || '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/__|_/g, ' ').replace(/\s+/g, ' ').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  // 若當前正有其他語音在播放，先取消避免重疊；若為靜止狀態則不呼叫 cancel 以免觸發 Chromium IPC 競爭取消新佇列
  if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang || 'en-US';
  utterance.rate = Math.max(0.5, Math.min(2.0, rate));
  utterance.pitch = Math.max(0.5, Math.min(1.5, pitch));

  const voice = (lang && lang.startsWith('zh')) ? getBestChineseVoice() : getBestEnglishVoice();
  if (voice) utterance.voice = voice;

  // V8 GC 保護：將 utterance 加入 Set 防止長時間朗讀或例句較長時被垃圾回收中斷
  activeUtterances.add(utterance);
  currentUtterance = utterance;
  startWatchdog();

  let hasEnded = false;
  const finish = (callback, arg) => {
    if (hasEnded) return;
    hasEnded = true;
    activeUtterances.delete(utterance);
    if (currentUtterance === utterance) currentUtterance = null;
    if (activeUtterances.size === 0) stopWatchdog();
    if (callback) callback(arg);
  };

  utterance.onstart = () => {
    currentUtterance = utterance;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    finish(onEnd);
  };

  utterance.onerror = (e) => {
    finish(onError, e);
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    finish(onError, err);
  }
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
  let clean = String(text || '').replace(/\(.*?\)|（.*?）/g, '').trim();
  if (!clean) clean = String(text || '').replace(/[()（）]/g, '').trim();
  clean = clean.replace(/[a-zA-Z0-9_.\/\\#@$%^&*~+=|]/g, ' ').replace(/\s+/g, ' ').trim();
  speak(clean || text, { lang: 'zh-TW', rate: 0.95, ...callbacks });
}

// 連續對話或單字隊列播放
export function playSequence(items, onStep, onFinish) {
  stopAudio();
  if (!items || !items.length) {
    if (onFinish) onFinish();
    return;
  }

  sequenceQueue = items;
  sequenceIndex = 0;
  sequencePlaying = true;
  sequenceStepCallback = onStep;
  sequenceFinishCallback = onFinish;

  playNextInSequence();
}

function playNextInSequence() {
  if (!sequencePlaying || sequenceIndex >= sequenceQueue.length) {
    stopSequence();
    if (sequenceFinishCallback) sequenceFinishCallback();
    return;
  }

  const currentItem = sequenceQueue[sequenceIndex];
  const text = typeof currentItem === 'string' ? currentItem : currentItem.text;
  const slow = currentItem.slow || false;

  if (sequenceStepCallback) {
    sequenceStepCallback(sequenceIndex, currentItem);
  }

  speak(text, {
    rate: slow ? 0.75 : 0.95,
    onEnd: () => {
      if (!sequencePlaying) return;
      sequenceIndex++;
      setTimeout(playNextInSequence, 400); // 句間間歇 400ms 自然停頓
    },
    onError: () => {
      if (!sequencePlaying) return;
      sequenceIndex++;
      setTimeout(playNextInSequence, 400);
    }
  });
}

export function stopSequence() {
  sequencePlaying = false;
  sequenceQueue = [];
  sequenceIndex = 0;
  if (sequenceStepCallback) sequenceStepCallback(-1, null);
}

export function stopAudio() {
  stopSequence();
  stopWatchdog();
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
