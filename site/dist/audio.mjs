// audio.mjs - 雙擎語音播放引擎（Web Speech Synthesis + Web Audio API Fallback）

let voices = [];
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

// 核心播放單一文字
export function speak(text, { rate = 1.0, pitch = 1.0, onStart, onEnd, onError } = {}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    fallbackBeep();
    if (onError) onError(new Error('SpeechSynthesis not supported'));
    return;
  }

  stopAudio();

  const cleanText = String(text || '').trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = Math.max(0.5, Math.min(2.0, rate));
  utterance.pitch = Math.max(0.5, Math.min(1.5, pitch));

  const voice = getBestEnglishVoice();
  if (voice) utterance.voice = voice;

  utterance.onstart = () => {
    currentUtterance = utterance;
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (onError) onError(e);
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    if (onError) onError(err);
  }
}

// 快速播放單字（支援慢速 0.75x）
export function playWord(word, slow = false, callbacks = {}) {
  speak(word, { rate: slow ? 0.72 : 0.95, ...callbacks });
}

// 快速播放片語與例句
export function playSentence(sentence, slow = false, callbacks = {}) {
  speak(sentence, { rate: slow ? 0.75 : 0.95, ...callbacks });
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
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
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
