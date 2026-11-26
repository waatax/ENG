import {blankExample, extraCount} from '../extra_practice.mjs?v=practice20261126';
import {answerText, diagnose, evidenceFor} from './coach.mjs?v=practice20261126';

const zh = /[㐀-鿿]/;
const short = text => text.length > 76 ? text.slice(0, 75).trimEnd() + '…' : text;

function draftPractice(q) {
  if (!q.why || !q.prompt) return null;
  if (q.type === 'choice' && q.kind === 'word' && q.text && zh.test(q.answer)) {
    const example = q.why.split('例：').at(1)?.trim();
    const sentence = example?.split(/[（(]/)[0].replace(/^["“]|["”]$/g, '').trim();
    const context = blankExample(sentence, q.text);
    if (context && !zh.test(context)) {
      const translation = example?.match(/（([㐀-鿿][^）]*)）$/)?.[1];
      return {
        kind: 'word', key: q.text.toLowerCase(),
        title: `從例句找字 · ${short(context)}`,
        prompt: '說出空格裡的英文，再讀一遍完整例句。',
        context, cue: translation || `提示：開頭是 ${q.text[0]}，原字詞有 ${q.text.replace(/\s/g, '').length} 個非空白字元。`,
        lang: 'en', answerLang: true, answer: sentence,
        why: `空格填「${q.text}」。讀出空格前後的字，再用相同的搭配換一句話。`
      };
    }
  }
  if (['choice', 'listen'].includes(q.type)) {
    const alternatives = (q.options || []).filter(text => text !== q.answer);
    if (!alternatives.length) return null;
    const notes = alternatives.map(text => ({text, reason: diagnose(q, text)}));
    const rejected = notes.find(option => option.reason) || notes[0];
    const listening = q.type === 'listen' && q.audio;
    const context = listening ? '' : [q.passage || q.text, q.prompt].filter(Boolean).join('\n\n');
    const evidence = q.passage ? evidenceFor(q) : '';
    return {
      kind: listening ? 'listen' : q.passage ? 'read' : 'reason',
      key: [context, q.audio, q.answer].join('|'),
      title: listening ? `聽音找線索 · ${short(rejected.text)}？` : `檢查一個答案 · ${short(q.prompt)}`,
      prompt: listening ? '聽完後，找出能推翻下方猜測的一個字或一段聲音。' :
        '有人用了下方的答案。請說出你會怎麼改，並指出一個支持你改法的線索。',
      context: context || q.prompt, cue: `待檢查的答案「${rejected.text}」`, audio: listening || '',
      answer: answerText(q),
      why: [rejected.reason, q.why, evidence && `可回看原文這句話「${evidence}」`].filter(Boolean).join(' ')
    };
  }
  if (q.type === 'match' && q.pairs?.length) {
    const [word, meaning] = q.pairs[0];
    return {
      kind: 'word', key: word.toLowerCase(),
      title: `不看選項想英文 · ${meaning}`,
      prompt: '想出符合這個意思的英文，再指出生活中哪裡可能聽到它。',
      context: meaning, answer: word, answerLang: 'en',
      why: `「${word}」在本組配對中表示「${meaning}」。先說英文，再換成你遇過的情境。`
    };
  }
  return null;
}

export function questExtraPractice(questions, usedSources, unitId) {
  const count = extraCount(questions.length);
  // Local questions take priority over shared diagnostic items, then unused legacy sources.
  const priority = q => (q.id.startsWith(unitId + '.') || q.id.startsWith(unitId + '-') ? 0 : 2) +
    Number(usedSources.has(q.id));
  const buckets = new Map(), seen = new Set();
  for (const q of [...questions].sort((a, b) => priority(a) - priority(b))) {
    const card = draftPractice(q);
    const key = q.kind === 'word' && (q.targetWord || q.audio || q.text || q.answer);
    const target = typeof key === 'string' && /^[a-z][a-z' -]*$/i.test(key) ? key.toLowerCase() : card?.key;
    if (!card || seen.has(target)) continue;
    seen.add(target);
    if (!buckets.has(card.kind)) buckets.set(card.kind, []);
    buckets.get(card.kind).push({...card, source: q.id});
  }
  const cards = [];
  for (let index = 0; cards.length < count; index++) {
    const row = [...buckets.values()].map(bucket => bucket[index]).filter(Boolean);
    if (!row.length) break;
    cards.push(...row.slice(0, count - cards.length));
  }
  return cards;
}
