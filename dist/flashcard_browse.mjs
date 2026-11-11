// Accessible single-card studio view with physical deck depth, scientific memory breakdown, and instant 4-option diagnostic check.
const meaning = c => c ? (c.gloss || c.zh) : '';

function buildInstantQuizOptions(card, pool) {
  if (!card || !Array.isArray(pool) || pool.length < 4) return [];
  const targetMeaning = meaning(card);
  const samePos = pool.filter(c => c.id !== card.id && c.pos === card.pos && meaning(c) !== targetMeaning);
  const candidatePool = samePos.length >= 3 ? samePos : pool.filter(c => c.id !== card.id && meaning(c) !== targetMeaning);
  if (candidatePool.length < 3) return [];
  let hash = 0;
  for (let i = 0; i < card.id.length; i++) hash = ((hash << 5) - hash + card.id.charCodeAt(i)) | 0;
  const absHash = Math.abs(hash);
  const distractors = [];
  const usedMeanings = new Set([targetMeaning]);
  for (let step = 0; step < candidatePool.length && distractors.length < 3; step++) {
    const idx = (absHash + step * 37) % candidatePool.length;
    const cand = candidatePool[idx];
    const m = meaning(cand);
    if (!usedMeanings.has(m)) {
      usedMeanings.add(m);
      distractors.push(cand);
    }
  }
  const options = [card, ...distractors];
  const insertPos = absHash % options.length;
  const first = options[0];
  options[0] = options[insertPos];
  options[insertPos] = first;
  return options;
}

export function renderBrowse(s) {
  const { esc, tierInfo, allTierCards, filteredCards, totalBatches, batchCards, card, isMastered, isNeedReview, mastered, percent,
    clue, cardIndex, batchIndex, batchSize, flipped, justFlipped, autoPlaying, voiceMode, audioFailure, batchCompleted,
    filterStatus, setType, keyword, audit, phraseCount, reviewCount, mp3Group, quizChoice } = s;
  const frontFace = flipped ? 'inert aria-hidden="true"' : 'aria-hidden="false"';
  const backFace = flipped ? 'aria-hidden="false"' : 'inert aria-hidden="true"';

  const quizOpts = card ? buildInstantQuizOptions(card, allTierCards) : [];
  const activeQuizPick = quizChoice && card && quizChoice.cardId === card.id ? quizChoice.pickIndex : null;
  const pickedCard = (activeQuizPick !== null && quizOpts[activeQuizPick]) ? quizOpts[activeQuizPick] : null;
  const quizOk = pickedCard && card ? pickedCard.id === card.id : false;

  const syllableCount = card?.chunk ? card.chunk.split(/[·\-]+/).filter(Boolean).length : 1;

  return `
    <div class="fc-header">
      <div>
        <div class="fc-studio-eyebrow">✨ 科學雙面記憶 × 語境檢索 × 錯題即時診斷</div>
        <h2 class="fc-title">🗂️ 9,500 單字與片語閃卡館</h2>
        <p class="fc-subtitle">先看英文與音節回想詞義，再翻卡對照語塊與科學記憶法；下方支援<strong>隨堂 4 選 1 混淆快測</strong>，選錯立即解析干擾項真身。</p>
      </div>
      <div class="fc-stats-badge">
        <span>本級進度 (${esc((tierInfo.name || tierInfo.label || '').split(' ')[0])})</span>
        <strong>${mastered} / ${allTierCards.length} 已熟記 (${percent}%)</strong>
        <a class="btn quiet small" href="#wordaudio/${mp3Group}">🎵 下載本級 MP3</a>
      </div>
    </div>
    <p class="fc-audit-note" role="note">📋 內容狀態：${esc(audit)}</p>
    ${audioFailure ? `<div class="fc-audio-alert" role="alert"><strong>⚠️ 語音播放中斷：</strong>${esc(audioFailure)}</div>` : ''}
    <div class="fc-tiers">${s.tiers ? '' : ''}${tierButtons(s)}</div>
    <div class="fc-toolbar">
      <div class="fc-search-box">
        <input type="search" id="fc-search-input" aria-label="搜尋單字、中文意思、搭配詞或主題分類" placeholder="🔍 搜尋單字、中文意思、搭配詞或主題分類..." value="${esc(keyword)}">
      </div>
      <div class="fc-filter-group" role="group" aria-label="閃卡內容類型">
        <button class="fc-filter-btn ${setType === 'all' ? 'active' : ''}" data-fc-set-type="all">📚 全部詞彙 (${allTierCards.length})</button>
        <button class="fc-filter-btn ${setType === 'phrases' ? 'active' : ''}" data-fc-set-type="phrases">🔗 片語與搭配詞集 (${phraseCount})</button>
      </div>
      <div class="fc-filter-group" role="group" aria-label="熟練度篩選">
        <button class="fc-filter-btn ${filterStatus === 'all' ? 'active' : ''}" data-fc-filter="all">全部 (${allTierCards.length})</button>
        <button class="fc-filter-btn ${filterStatus === 'need_review' ? 'active' : ''}" data-fc-filter="need_review">📌 待複習 (${reviewCount})</button>
        <button class="fc-filter-btn ${filterStatus === 'mastered' ? 'active' : ''}" data-fc-filter="mastered">✅ 已熟記 (${mastered})</button>
      </div>
      <div class="fc-action-group">
        <button class="btn primary small" data-fc-recall="start">⚡ 10 卡快測</button>
        <button class="btn quiet small" data-fc-shuffle="true" title="隨機抽卡">🔀 隨機抽卡</button>
        <button class="btn ${autoPlaying ? 'primary' : 'quiet'} small" data-fc-toggle-autoplay="true">${autoPlaying ? '⏸ 停止輪播' : '▶ 自動輪播聽讀'}</button>
      </div>
    </div>
    <div class="fc-batch-bar">
      <div class="fc-batch-group"><span>📦 每組張數：</span>${[10, 20, 30, 50, 100, 0].map(n => `<button class="fc-chip-btn ${batchSize === n ? 'active' : ''}" data-fc-batch-size="${n}">${n === 0 ? '全部' : n + '張'}</button>`).join('')}</div>
      <div class="fc-batch-group"><span>🎧 輪播語音：</span>
        <button class="fc-chip-btn ${voiceMode === 'word_zh_sentence' ? 'active' : ''}" data-fc-voice-mode="word_zh_sentence">單字+中文+例句</button>
        <button class="fc-chip-btn ${voiceMode === 'word_en_thinking' ? 'active' : ''}" data-fc-voice-mode="word_en_thinking">🧠 思考式純英</button>
        <button class="fc-chip-btn ${voiceMode === 'word_zh' ? 'active' : ''}" data-fc-voice-mode="word_zh">⚡ 單字+中文</button>
        <button class="fc-chip-btn ${voiceMode === 'word_sentence' ? 'active' : ''}" data-fc-voice-mode="word_sentence">🇬🇧 純英單字+例句</button>
      </div>
      ${batchSize > 0 && filteredCards.length > 0 ? `<div class="fc-batch-Pager"><button class="btn quiet small" data-fc-batch-prev="true" ${batchIndex === 0 ? 'disabled' : ''}>◀ 上一組</button><span class="fc-batch-indicator">第 <strong>${batchIndex + 1}</strong> / ${totalBatches} 組 (${batchCards.length} 張)</span><button class="btn quiet small" data-fc-batch-next="true" ${batchIndex >= totalBatches - 1 ? 'disabled' : ''}>下一組 ▶</button></div>` : ''}
    </div>
    ${batchCompleted && batchCards.length > 0 ? `<div class="fc-batch-complete-banner"><div><strong>🎉 太棒了！已完成第 ${batchIndex + 1} 組（共 ${batchCards.length} 張）閃卡輪播學習！</strong></div><div class="fc-batch-complete-actions"><button class="btn quiet small" data-fc-replay-batch="true">🔄 重播本組</button>${batchIndex < totalBatches - 1 ? `<button class="btn primary small" data-fc-batch-next="true">▶ 進入下一組</button>` : `<button class="btn primary small" data-fc-restart-first-batch="true">🏁 回到第 1 組</button>`}</div></div>` : ''}
    ${!card ? `<div class="fc-empty"><p>找不到符合條件的閃卡。請嘗試切換篩選條件或清除搜尋關鍵字。</p></div>` : `
      <div class="fc-progress-line"><div class="fc-progress-fill" style="width:${((cardIndex + 1) / batchCards.length) * 100}%"></div></div>
      <div class="fc-stage">
        <button class="fc-nav-arrow" data-fc-prev="true" aria-label="上一張字卡" ${cardIndex === 0 ? 'disabled' : ''}>❮</button>
        <div class="fc-card-wrapper">
          <div class="fc-card-deck">
            <article class="fc-card ${flipped ? 'is-flipped' : ''} ${justFlipped ? 'just-flipped' : ''}" aria-label="單字閃卡 ${esc(card.word)}">
              <section class="fc-face fc-front" ${frontFace}>
                <div class="fc-card-top">
                  <span class="fc-cat-tag">${esc(card.category)}</span>
                  <div class="fc-top-badges">
                    <span class="fc-rhythm-pill" title="音節拍數">🎵 ${syllableCount} 音節</span>
                    <span class="fc-pos-tag">${esc(card.pos)}</span>
                  </div>
                </div>
                <div class="fc-card-center">
                  <div class="fc-word-hero">${esc(card.word)}</div>
                  ${card.chunk ? `<div class="fc-chunk-line">🧩 結構拆解：<span>${esc(card.chunk)}</span></div>` : ''}
                  ${card.ipa ? `<div class="fc-ipa-line">${esc(card.ipa)}</div>` : ''}
                  <div class="fc-thinking-prompt">💭 先在腦中回想中文意思與常見搭配，再翻卡驗證</div>
                  ${clue ? `<div class="fc-en-clue-box"><span class="fc-en-clue-tag">🇬🇧 語境線索</span><p>${esc(clue)}</p></div>` : ''}
                  <div class="fc-audio-row">
                    <button class="btn primary small" data-fc-speak-word="${esc(card.word)}">🔊 正常發音</button>
                    <button class="btn quiet small" data-fc-speak-word-slow="${esc(card.word)}">🐢 慢速跟讀</button>
                    ${card.example ? `<button class="btn quiet small" data-fc-speak-sentence="${esc(card.example)}">🎧 聽例句語音</button>` : ''}
                  </div>
                </div>
                <div class="fc-card-bottom">
                  <span>第 ${cardIndex + 1} / ${batchCards.length} 張 ${isMastered ? '· ✅ 已熟記' : isNeedReview ? '· 📌 待複習' : ''}</span>
                  <button class="btn primary" data-fc-flip="true">翻卡看答案 <kbd class="fc-kbd">Space</kbd></button>
                </div>
              </section>
              <section class="fc-face fc-back" ${backFace}>
                <div class="fc-card-top">
                  <span class="fc-cat-tag">${esc(card.category)} · ${esc(card.word)} ${card.ipa ? esc(card.ipa) : ''}</span>
                  <button class="btn quiet small" data-fc-speak-zh="${esc(meaning(card))}">🔊 唸中文</button>
                </div>
                <div class="fc-back-body">
                  <div class="fc-zh-hero">${esc(meaning(card))}</div>
                  <div class="fc-science-grid">
                    ${card.collocation ? `<div class="fc-info-block fc-info-collocation"><strong>🔗 高頻搭配語塊</strong><p>${esc(card.collocation)}</p></div>` : ''}
                    ${card.chunk ? `<div class="fc-info-block fc-info-chunk"><strong>🔬 音節與字構</strong><p>${esc(card.chunk)} ${card.ipa ? `<span class="fc-inline-ipa">${esc(card.ipa)}</span>` : ''}</p></div>` : ''}
                    ${card.memoryTip ? `<div class="fc-info-block fc-info-tip"><strong>💡 科學記憶錨點</strong><p>${esc(card.memoryTip)}</p></div>` : ''}
                  </div>
                  ${card.example ? `<div class="fc-info-block fc-example-block">
                    <div class="fc-example-head"><strong>📖 情境例句與語音</strong>
                      <div class="fc-example-audio-btns">
                        <button class="btn primary small" data-fc-speak-sentence="${esc(card.example)}">🔊 聽例句</button>
                        <button class="btn quiet small" data-fc-speak-sentence-slow="${esc(card.example)}">🐢 慢速例句</button>
                      </div>
                    </div>
                    <p class="fc-ex-en">${esc(card.example)}</p>
                    <p class="fc-ex-zh">${esc(card.exampleZh)}</p>
                  </div>` : ''}
                </div>
                <div class="fc-card-bottom">
                  <span>自己想出來了嗎？選擇下方熟練度或挑戰隨堂快測</span>
                  <button class="btn quiet small" data-fc-flip="true">翻回正面 <kbd class="fc-kbd">Space</kbd></button>
                </div>
              </section>
            </article>
          </div>
        </div>
        <button class="fc-nav-arrow" data-fc-next="true" aria-label="下一張字卡" ${cardIndex >= batchCards.length - 1 ? 'disabled' : ''}>❯</button>
      </div>
      <div class="fc-srs-bar" role="group" aria-label="記憶熟練度評分">
        <button class="btn ${isNeedReview ? 'primary' : 'quiet'} fc-srs-again" data-fc-rate="again">🔁 還不熟（加入待複習）</button>
        <button class="btn quiet fc-srs-good" data-fc-rate="good">👍 想起來了（下一張）</button>
        <button class="btn ${isMastered ? 'primary' : 'quiet'} fc-srs-easy" data-fc-rate="easy">⚡ 秒懂（標為已熟記）</button>
      </div>
      ${quizOpts.length === 4 ? `
      <section class="fc-instant-quiz" aria-label="本卡隨堂 4 選 1 快測">
        <div class="fc-instant-quiz-head">
          <div>
            <span class="fc-instant-badge">⚡ 隨堂提取快測</span>
            <strong>不看背面，選出「${esc(card.word)}」(${esc(card.pos)}) 的正確意思：</strong>
          </div>
          ${activeQuizPick !== null ? `<button class="btn quiet small" data-fc-quiz-reset="true">🔄 重測本卡</button>` : `<span class="fc-instant-hint">點擊選項或按數字鍵 <kbd class="fc-kbd">1</kbd>-<kbd class="fc-kbd">4</kbd> 作答</span>`}
        </div>
        <div class="fc-instant-options">
          ${quizOpts.map((opt, idx) => {
            const isPicked = activeQuizPick === idx;
            const isRightOpt = opt.id === card.id;
            const stateClass = activeQuizPick === null
              ? ''
              : isRightOpt
                ? 'is-correct'
                : isPicked
                  ? 'is-wrong'
                  : 'is-dim';
            return `<button type="button" class="fc-instant-opt ${stateClass}" data-fc-quiz-pick="${idx}">
              <span class="fc-opt-num">${idx + 1}</span>
              <span class="fc-opt-text">${esc(meaning(opt))}</span>
              ${activeQuizPick !== null && isRightOpt ? '<span class="fc-opt-tag ok">✓ 正解</span>' : ''}
              ${activeQuizPick !== null && isPicked && !isRightOpt ? `<span class="fc-opt-tag bad">✗ 這是 ${esc(opt.word)}</span>` : ''}
            </button>`;
          }).join('')}
        </div>
        ${pickedCard ? (quizOk ? `
          <div class="fc-instant-feedback is-ok" role="status">
            <div class="fc-fb-title">✅ 精準提取！「<strong>${esc(card.word)}</strong>」就是「${esc(meaning(card))}」</div>
            <p class="fc-fb-detail">🔗 <strong>高頻搭配：</strong>${esc(card.collocation || card.word)} ｜ 💡 <strong>記憶錨點：</strong>${esc(card.memoryTip || '')}</p>
            <div class="fc-fb-actions">
              <button class="btn primary small" data-fc-rate="easy">⚡ 標為已熟記並下一張 →</button>
              <button class="btn quiet small" data-fc-speak-word="${esc(card.word)}">🔊 再聽一次發音</button>
            </div>
          </div>
        ` : `
          <div class="fc-instant-feedback is-wrong" role="alert">
            <div class="fc-fb-title">❌ 答錯了！🔍 錯在哪裡 — 易混詞對比診斷</div>
            <div class="fc-fb-contrast">
              <div class="fc-fb-contrast-row bad">
                <strong>✗ 你選的選項：</strong>「${esc(meaning(pickedCard))}」其實是英文單字 <code>${esc(pickedCard.word)}</code> ${pickedCard.ipa ? `<span class="fc-inline-ipa">${esc(pickedCard.ipa)}</span>` : ''} (${esc(pickedCard.pos || '')}) 的意思${pickedCard.collocation ? `，常見搭配為「${esc(pickedCard.collocation)}」` : ''}。
              </div>
              <div class="fc-fb-contrast-row good">
                <strong>✓ 本卡目標字：</strong><code>${esc(card.word)}</code> ${card.ipa ? `<span class="fc-inline-ipa">${esc(card.ipa)}</span>` : ''} (${esc(card.pos || '')}) 的真正意思是「<strong>${esc(meaning(card))}</strong>」。
              </div>
            </div>
            <div class="fc-fb-repair">
              <p>🧩 <strong>結構拆解與語塊：</strong>${esc(card.chunk || card.word)} ｜ ${esc(card.collocation || '')}</p>
              ${card.memoryTip ? `<p>💡 <strong>科學記憶法：</strong>${esc(card.memoryTip)}</p>` : ''}
              ${card.example ? `<p>📖 <strong>語境例句：</strong>${esc(card.example)}（${esc(card.exampleZh)}）</p>` : ''}
            </div>
            <div class="fc-fb-actions">
              <button class="btn quiet small" data-fc-speak-word="${esc(card.word)}">🔊 聽 ${esc(card.word)} 發音</button>
              <button class="btn quiet small" data-fc-quiz-reset="true">🔄 重新作答本題</button>
              <button class="btn primary small" data-fc-flip="true">📖 翻面看完整字卡</button>
            </div>
          </div>
        `) : ''}
      </section>
      ` : ''}
    `}`;
}

function tierButtons(s) {
  return (s.tierList || []).map(t => `<button class="fc-tier-btn ${s.tierInfo.id === t.id ? 'active' : ''}" data-fc-tier="${t.id}"><span class="fc-tier-label">${s.esc(t.name || t.label || '')}</span><span class="fc-tier-badge">${s.esc(t.count || t.badge || '')}</span></button>`).join('');
}
export function applyRate(rate, card, masteryState) {
  if (!card) return false;
  if (rate === 'again') masteryState[card.id] = 'need_review';
  if (rate === 'easy') masteryState[card.id] = 'mastered';
  return rate === 'good' || rate === 'easy';
}
