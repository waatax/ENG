import {escapeHTML as esc} from './recall.mjs';

export const extraCount = baseline => Math.ceil(baseline / 20);

// Require an exact, standalone target. Inflected variants can change the learning objective.
export function blankExample(example, target) {
  if (!example || !target || !/[a-z]/i.test(target)) return '';
  const literal = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = Array.from(example.matchAll(new RegExp(`(?<![a-z0-9'’-])${literal}(?![a-z0-9'’-])`, 'gi')));
  if (matches.length !== 1) return '';
  const {index} = matches[0];
  return example.slice(0, index) + '_____' + example.slice(index + target.length);
}

export function vocabularyPractice(words, count, language = 'zh') {
  const seen = new Set(), cards = [];
  for (const {word, meaning, example} of words) {
    if (cards.length >= count) break;
    const key = word.toLowerCase();
    const context = blankExample(example, word);
    if (!context || !meaning || seen.has(key)) continue;
    seen.add(key);
    const english = language === 'en';
    cards.push({
      title: english ? `Find the word · ${meaning}` : `從句子想字詞 · ${meaning}`,
      prompt: english ? 'Use the definition to recall the missing word or phrase.' : '用意思提示想出能填進句子的英文。',
      context,
      cue: meaning,
      answer: example,
      why: english ? `The missing term is “${word}”. Read it with the surrounding words, then use it in a sentence of your own.` :
        `空格填「${word}」。對照完整句，留意這個字和前後字詞怎麼搭配，再用它說一句自己的話。`,
      lang: 'en',
      answerLang: true
    });
  }
  return cards;
}

export function renderExtraPractice(cards, heading = '情境加練', level = 3, language = 'zh') {
  if (!cards.length) return '';
  const tag = level === 4 ? 'h4' : 'h3';
  const english = language === 'en';
  const total = english ? `${cards.length} ${cards.length === 1 ? 'activity' : 'activities'}` : `${cards.length} 張練習`;
  const instructions = english ? 'Try answering aloud or to yourself, then check the model. If you need help, read the model and close it before trying again.' :
    '挑一張，先在心裡答或開口說，再看示範。也可以直接看解說，學會後把它合起來重試。';
  return `<section class="extra-practice" aria-label="${esc(heading)}">
    <header class="extra-practice-head"><${tag}>${esc(heading)}</${tag}><span>${total}</span></header>
    <p>${instructions}</p>
    <div class="extra-practice-list">${cards.map(card => `<details class="extra-practice-card">
      <summary>${esc(card.title)}</summary>
      <div class="extra-practice-body">
        <p>${esc(card.prompt)}</p>
        ${card.context ? `<p class="extra-practice-context"${card.lang ? ' lang="en"' : ''}>${esc(card.context)}</p>` : ''}
        ${card.cue ? `<p class="extra-practice-cue">${esc(card.cue)}</p>` : ''}
        ${card.audio ? `<button type="button" class="btn small" data-act="prompt-say" data-text="${esc(card.audio)}">播放題目音訊</button>
          <details><summary>需要文字支援？看逐字稿</summary><p lang="en">${esc(card.audio)}</p></details>` : ''}
        <details class="extra-practice-answer">
          <summary>${english ? 'Check the model and explanation' : '核對示範與解說'}</summary>
          <div><p${card.answerLang ? ' lang="en"' : ''}><strong>${esc(card.answer)}</strong></p><p>${esc(card.why)}</p></div>
        </details>
      </div>
    </details>`).join('')}</div>
  </section>`;
}
