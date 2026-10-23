// English speech (recorded MP3 when available, otherwise the device's en-US voice) and short UI sound effects.
let rate = 0.85, effects = true, generation = 0, current = null, ctx = null;
export function configure(opts = {}) { if (opts.rate) rate = opts.rate; if (typeof opts.sound === 'boolean') effects = opts.sound; }
const synth = () => globalThis.speechSynthesis;
export function voice() {
  const vs = synth()?.getVoices?.() || [];
  return vs.find(v => /^en[-_]US/i.test(v.lang) && /natural|neural|google|aria|jenny|guy|samantha|ava|allison/i.test(v.name))
    || vs.find(v => /^en[-_]US/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null;
}
export function canSpeak() { return !!(synth() && globalThis.SpeechSynthesisUtterance); }
export function stop() { generation++; try { synth()?.cancel(); } catch {} if (current) { current.pause(); current = null; } }
// resolves to 'ok' | 'error' | 'unavailable' | 'stopped'
export function speak(text, { slow = false } = {}) {
  stop(); const g = generation;
  return new Promise(resolve => {
    if (!text || !canSpeak()) return resolve('unavailable');
    const v = voice(); if (!v) return resolve('unavailable');
    const u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang; u.rate = slow ? Math.max(0.5, rate - 0.3) : rate;
    u.onend = () => resolve(g === generation ? 'ok' : 'stopped');
    u.onerror = () => resolve(g === generation ? 'error' : 'stopped');
    try { synth().speak(u); } catch { resolve('error'); }
  });
}
export function play({ text, mp3, slow = false }) {
  if (!mp3 || slow) return speak(text, { slow });
  stop(); const g = generation;
  return new Promise(resolve => {
    const a = new Audio(mp3); current = a; a.playbackRate = 1;
    a.onended = () => resolve(g === generation ? 'ok' : 'stopped');
    a.onerror = () => { if (g === generation) speak(text).then(resolve); else resolve('stopped'); };
    a.play().catch(() => { if (g === generation) speak(text).then(resolve); else resolve('stopped'); });
  });
}
// tiny synthesized cues; no audio files, silent when effects are off or WebAudio is missing
export function sfx(kind) {
  if (!effects) return;
  try {
    ctx ||= new (globalThis.AudioContext || globalThis.webkitAudioContext)();
    const notes = { correct: [[660, 0], [880, 0.09]], wrong: [[220, 0], [180, 0.12]], done: [[523, 0], [659, 0.1], [784, 0.2], [1046, 0.3]], tap: [[440, 0]], combo: [[784, 0], [988, 0.07], [1175, 0.14]] }[kind] || [];
    const t0 = ctx.currentTime;
    for (const [f, at] of notes) {
      const o = ctx.createOscillator(), gain = ctx.createGain();
      o.type = kind === 'wrong' ? 'triangle' : 'sine'; o.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, t0 + at); gain.gain.exponentialRampToValueAtTime(kind === 'tap' ? 0.04 : 0.12, t0 + at + 0.02); gain.gain.exponentialRampToValueAtTime(0.0001, t0 + at + 0.18);
      o.connect(gain).connect(ctx.destination); o.start(t0 + at); o.stop(t0 + at + 0.2);
    }
  } catch {}
}
