// Card-first browsing view: the card comes first, and rarely changed settings fold away below it.
import {renderWordStructure, wordStructure} from './word_structure.mjs';
import {findTarget} from './word_mask.mjs';

const VOICE = [
  ['word_zh_sentence', '🌟 完整聽讀：英文 ➔ 中文 ➔ 完整例句', '依序朗讀英文單字、中文釋義與完整英文例句'],
  ['word_zh', '⚡ 簡易複習：英文 ➔ 中文（語音）', '朗讀英文單字與中文釋義，適合快速複習'],
  ['word_sentence', '🎧 純英沉浸：英文 ➔ 完整例句', '只聽英文單字與完整例句'],
  ['word_en_thinking', '🧠 思考式純英：單字 ➔ 思考 ➔ 搭配與例句', '先聽單字，停頓思考，再聽搭配與例句']
];
export function renderBrowse(ctx) {
  const {esc, tierInfo, allTierCards, filteredCards, totalBatches, batchCards, card, isMastered, isNeedReview, mastered, percent, clue, cardIndex, batchIndex, batchSize, flipped, justFlipped, autoPlaying, voiceMode, audioFailure, batchCompleted, filterStatus, setType, keyword, audit, phraseCount, reviewCount, mp3Group} = ctx;
  const count = `卡片 ${cardIndex + 1} / ${batchCards.length}${batchSize > 0 ? ` (第 ${batchIndex + 1}/${totalBatches} 組)` : ''}`;
  const zh = card ? (card.gloss || card.zh) : '';
  const example = () => {
    const t = findTarget(card.example, card.word);
    if (!card.example) return esc(card.qualityNote || '');
    return t ? `${esc(card.example.slice(0, t.start))}<mark>${esc(card.example.slice(t.start, t.end))}</mark>${esc(card.example.slice(t.end))}` : esc(card.example);
  };
  const front = card ? `<div class="fc-card-face fc-front" ${flipped ? 'inert aria-hidden="true"' : ''}>
    <div class="fcx-card-top"><span class="fcx-tag">${esc(tierInfo.name.split(' ')[0])} ${esc(tierInfo.cefr)}</span><span class="fcx-tag soft">${esc(card.category)}</span><span class="fcx-count">${count}</span></div>
    <div class="fcx-front-body">
      <div class="fc-front-picture" aria-hidden="true">${card.icon || '📖'}</div>
      <div class="fcx-word" lang="en">${esc(card.word)}</div>
      ${card.chunk ? `<div class="fcx-chunk" lang="en">${esc(card.chunk)}</div>` : ''}
      <div class="fcx-phon-pill"><span class="fcx-pos">${esc(card.pos)}</span>${card.ipa ? `<span class="fcx-ipa">${esc(card.ipa)}</span>` : ''}</div>
      ${clue ? `<div class="fc-thinking-clue" lang="en"><strong>🧠 Context Thinking Clue:</strong> ${esc(clue)}</div>` : ''}
    </div>
    <div class="fcx-face-actions">
      <button class="btn primary" data-fc-speak-word="${esc(card.word)}">🔊 單字發音 1.0x</button>
      <button class="btn quiet" data-fc-speak-word-slow="${esc(card.word)}">🐢 慢速拼讀 0.65x</button>
      <button class="btn quiet" ${!card.example ? 'disabled' : ''} data-fc-speak-sentence="${esc(card.example)}" title="聽例句朗讀語音">🎧 聽例句語音</button>
      <button class="btn quiet fcx-flip" data-fc-flip="true">翻卡：查看中文與例句</button>
    </div>
  </div>` : '';
  const next = cardIndex < batchCards.length - 1 ? `<div class="answer-toolbar"><span>核對意思與用法</span><button class="btn primary" data-fc-next="true">下一張 →</button></div>` : batchIndex < totalBatches - 1 ? `<div class="answer-toolbar"><span>本組最後一張</span><button class="btn primary" data-fc-batch-next="true">下一組 →</button></div>` : `<p role="status">已到清單最後一張</p>`;
  const back = card ? `<div class="fc-card-face fc-back${justFlipped ? ' is-flipping' : ''}" ${!flipped ? 'inert aria-hidden="true"' : ''}>
    <div class="fcx-back-head"><div class="fcx-back-icon" aria-hidden="true">${card.icon || '📌'}</div><div><div class="fcx-back-meta"><span class="fcx-tag">${esc(card.pos)} ${esc(card.word)}</span><span class="fcx-count">${count}</span></div><div class="fcx-back-zh"><h2>${esc(zh)}</h2><button class="btn quiet small" data-fc-speak-zh="${esc(zh)}" title="聽繁體中文釋義朗讀">🔊 聽中文</button></div></div></div>
    <div class="fcx-example"><p class="fcx-label">📖 情境例句與語音 (Example Sentence &amp; Audio)</p><p class="fcx-example-en" lang="en">${example()}</p><p class="fcx-example-zh">${esc(card.exampleZh)}</p><div class="fcx-inline-actions"><button class="btn small primary" ${!card.example ? 'disabled' : ''} data-fc-speak-sentence="${esc(card.example)}">🔊 朗讀</button><button class="btn small quiet" ${!card.example ? 'disabled' : ''} data-fc-speak-sentence-slow="${esc(card.example)}">🐢 慢速</button></div></div>
    ${card.collocation ? `<p class="fcx-colloc"><b>💡 搭配用法</b><span lang="en">${esc(card.collocation)}</span></p>` : ''}
    ${card.memoryTip ? `<p class="fcx-tip">🧠 <b>記憶鉤子：</b>${esc(card.memoryTip)}</p>` : ''}
    ${wordStructure(card.word) ? renderWordStructure(card) : ''}
    ${next}
    <div class="fcx-back-foot"><span>回想一次，再決定是否需要複習</span><button class="btn quiet small" data-fc-flip="true">返回英文單字面</button></div>
  </div>` : '';
  const stage = card ? `<div class="fcx-stage-wrap"><div class="fc-card-stage ${isMastered ? 'is-mastered' : isNeedReview ? 'is-review' : ''}">${front}${back}</div></div>
    <div class="fcx-card-controls">
      <button class="btn quiet" data-fc-prev="true" ${cardIndex === 0 ? 'disabled' : ''}>⬅ 上一張</button>
      <button class="btn quiet fcx-mark-review ${isNeedReview ? 'is-on' : ''}" data-fc-mark="need_review" aria-pressed="${isNeedReview}">${isNeedReview ? '🌱 標記為需加強 (已標記)' : '🌱 仍需複習'}</button>
      <button class="btn quiet fcx-mark-known ${isMastered ? 'is-on' : ''}" data-fc-mark="mastered" aria-pressed="${isMastered}">${isMastered ? '✅ 自評已記住 (已標記)' : '✅ 標記自評已記住'}</button>
      ${cardIndex < batchCards.length - 1 ? `<button class="btn primary" data-fc-next="true">下一張 ➡</button>` : batchIndex < totalBatches - 1 ? `<button class="btn primary" data-fc-batch-next="true">下一組 (${batchSize} 字) ⏭</button>` : `<button class="btn primary" disabled>下一張 ➡</button>`}
    </div>` : `<div class="card fcx-empty"><div aria-hidden="true">🎉</div><h3>該篩選條件下無符合卡片！</h3><p>可能已完成本分類的卡片，或搜尋條件沒有符合項目。</p><button class="btn primary" data-fc-filter="all">重設篩選條件 (查看全部卡片)</button></div>`;
  const finished = batchCompleted ? `<div class="card fcx-batch-done"><div aria-hidden="true">🎉</div><strong>本組 ${batchCards.length} 個單字已完成自動輪播聽讀練習！</strong><p>聽過之後，試著不看卡片回想，才知道真正記住多少。</p><div class="fcx-inline-actions"><button class="btn primary" data-fc-replay-batch="true">🔄 重新輪播本組</button>${batchIndex < totalBatches - 1 ? `<button class="btn primary" data-fc-batch-next="true">➡ 進行下一組 (${batchSize} 字)</button>` : `<button class="btn quiet" data-fc-restart-first-batch="true">⏮ 從第 1 組重新開始</button>`}</div></div>` : '';
  const pick = (on, attr, label, extra = '') => `<button class="btn ${on ? 'primary' : 'quiet'}" ${attr} aria-pressed="${on}" ${extra}>${label}</button>`;
  const settings = `<details class="fcx-settings" ${autoPlaying ? 'open' : ''}><summary>⚙️ 分組、輪播與語音設定</summary>
    <div class="fcx-setting"><span class="fcx-label">🎯 一次練習字數：</span><div class="fcx-pills">${[10, 20, 30, 50, 100, 0].map(sz => pick(batchSize === sz, `data-fc-batch-size="${sz}"`, sz === 0 ? `全部 (${filteredCards.length}字)` : `${sz} 個字`)).join('')}</div></div>
    <div class="fcx-setting"><span class="fcx-label">🎙️ 語音輪播順序：</span><div class="fcx-pills">${VOICE.map(([id, label, title]) => pick(voiceMode === id, `data-fc-voice-mode="${id}"`, label, `title="${title}"`)).join('')}</div></div>
    ${batchSize > 0 && totalBatches > 1 ? `<div class="fcx-setting fcx-batch-nav"><span>📑 當前分組：<strong>第 ${batchIndex + 1} / ${totalBatches} 組</strong>（第 ${batchIndex * batchSize + 1} ~ ${Math.min((batchIndex + 1) * batchSize, filteredCards.length)} 字 · 本組共 ${batchCards.length} 字 / 該類別共 ${filteredCards.length} 字）</span><div class="fcx-inline-actions"><button class="btn quiet small" data-fc-batch-prev="true" ${batchIndex === 0 ? 'disabled' : ''}>⏮ 上一組</button><button class="btn quiet small" data-fc-batch-next="true" ${batchIndex >= totalBatches - 1 ? 'disabled' : ''}>下一組 ⏭</button></div></div>` : ''}
    <div class="fcx-setting"><span class="fcx-label">更多</span><div class="fcx-pills"><button class="btn quiet" data-fc-quick-play="${tierInfo.id}">▶ 一鍵連播本集 (20張)</button><button class="btn quiet" data-nav="wordpractice">開始 9,500 張字卡學習</button><button class="btn quiet" data-nav="schoolwords">國小・國中課本字彙複習</button><a class="btn quiet" href="#wordaudio/${mp3Group}">🎵 本級別 MP3 連播</a><a class="btn quiet" href="#affixes">探索字首・字尾 →</a></div></div>
    <p class="small muted">字庫分布：國小 (1000)、國中 (2000)、高中 (3000)、TOEIC／TOEFL／SAT／GRE／GMAT 各 (700)。內容校訂：${esc(audit)}</p>
  </details>`;
  return `<section class="fcx-browse" aria-labelledby="fcx-browse-title">
    <header class="fcx-browse-head"><div><span class="fcx-tag soft">🗂️ 全階記憶閃卡館 · 完整 9,500 張字卡</span><h2 id="fcx-browse-title">單字與片語記憶工作室</h2><p>自由翻看字卡：先看英文想意思，再翻面核對。</p></div><div class="fcx-mastery"><span>自評已記住 <strong>${mastered}</strong> / ${allTierCards.length} 張 (${percent}%)</span><progress max="100" value="${percent}" aria-label="${esc(tierInfo.name)} 自評進度"></progress></div></header>
    <div class="fcx-toolbar">
      <div class="fcx-pills" role="group" aria-label="篩選字卡">${pick(setType === 'all', 'data-fc-set-type="all"', `📚 全部單字與片語 (${allTierCards.length})`)}${pick(setType === 'phrases', 'data-fc-set-type="phrases"', `🔗 精選片語與高頻搭配集 (${phraseCount})`)}${pick(filterStatus === 'all', 'data-fc-filter="all"', `全部卡片 (${allTierCards.length})`)}${pick(filterStatus === 'need_review', 'data-fc-filter="need_review"', `🌱 需複習 (${reviewCount})`)}${pick(filterStatus === 'mastered', 'data-fc-filter="mastered"', `✅ 自評已記住 (${mastered})`)}</div>
      <div class="fcx-tools"><input type="text" id="fc-search-input" aria-label="搜尋英文、中文或主題" placeholder="🔍 搜尋單字、片語或中文..." value="${esc(keyword)}"><button class="btn quiet" data-fc-shuffle="true" title="隨機洗牌重排順序">🔀 洗牌</button><button class="btn ${autoPlaying ? 'primary' : 'quiet'}" data-fc-toggle-autoplay="true">${autoPlaying ? '⏸ 停止輪播' : `▶ 自動輪播聽讀 (${batchSize > 0 ? `${batchCards.length}字 / 第${batchIndex + 1}組` : `全量 ${batchCards.length}字`})`}</button></div>
    </div>
    ${audioFailure ? `<p role="alert" class="card">${esc(audioFailure)}</p>` : ''}
    ${finished}${stage}${settings}
  </section>`;
}
