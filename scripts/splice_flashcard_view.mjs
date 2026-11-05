// One-off: replaces the inline-styled studio template in dist/flashcards.mjs with the card-first view module.
import fs from 'node:fs';
const file = 'dist/flashcards.mjs';
let src = fs.readFileSync(file, 'utf8');
const startMark = 'export function renderFlashcardsStudioView() {', endMark = '// 閃卡事件處理';
const a = src.indexOf(startMark), b = src.indexOf(endMark);
if (a < 0 || b < 0) throw Error('markers not found');
const view = `export function renderFlashcardsStudioView() {
  const tierInfo = FLASHCARD_TIERS.find(t => t.id === currentTier) || FLASHCARD_TIERS[0];
  const allTierCards = FLASHCARD_DATABASE.filter(c => c.tier === currentTier);
  const filteredCards = getFilteredCards();
  const totalBatches = getTotalBatches();
  const batchCards = getBatchCards();
  if (currentCardIndex >= batchCards.length) currentCardIndex = Math.max(0, batchCards.length - 1);
  const card = batchCards[currentCardIndex] ? teachingCard(batchCards[currentCardIndex]) : null;
  const mastered = allTierCards.filter(c => masteryState[c.id] === 'mastered').length;
  const justFlippedNow = justFlipped;
  justFlipped = false;
  return \`<div class="flashcard-studio fcx">\${renderRecallStudio(allTierCards, FLASHCARD_TIERS)}<div \${recallActive(currentTier) ? 'hidden' : ''}>\${renderBrowse({
    esc, tierInfo, allTierCards, filteredCards, totalBatches, batchCards, card,
    isMastered: card ? masteryState[card.id] === 'mastered' : false,
    isNeedReview: card ? masteryState[card.id] === 'need_review' : false,
    mastered, percent: allTierCards.length ? Math.round(mastered / allTierCards.length * 100) : 0,
    clue: buildEnglishThinkingClue(card), cardIndex: currentCardIndex, batchIndex: currentBatchIndex, batchSize: practiceBatchSize,
    flipped: isFlipped, justFlipped: justFlippedNow, autoPlaying: isAutoPlaying, voiceMode: autoPlayVoiceMode, audioFailure, batchCompleted,
    filterStatus: cardFilterStatus, setType: cardSetType, keyword: cardSearchKeyword,
    audit: \`\${contentAudit.total} 張字卡；例句與搭配詞由 AI 撰寫並經規則校驗，尚未經人類教師審核。發現錯誤歡迎回報。\`,
    phraseCount: allTierCards.filter(isPhraseOrCollocationCard).length,
    reviewCount: allTierCards.filter(c => masteryState[c.id] === 'need_review').length,
    mp3Group: quickMp3GroupIds[currentTier] || 'elementary-001'
  })}</div></div>\`;
}

`;
src = src.slice(0, a) + view + src.slice(b);
// Imports, and a mask that also catches inflected forms in the rewritten examples.
src = src.replace("import {renderRecallStudio, handleRecallAction, recallActive} from './flashcard_recall.mjs?v=joy20261103';", "import {renderRecallStudio, handleRecallAction, recallActive, recallShortcut} from './flashcard_recall.mjs?v=joy20261103';\nimport {renderBrowse} from './flashcard_browse.mjs';\nimport {maskTarget} from './word_mask.mjs';");
src = src.replace("let isFlipped = false;", "let isFlipped = false;\nlet justFlipped = false;");
src = src.replace(/  if \(example && word\) \{\n    const escaped[\s\S]*?if \(masked !== example\) return masked;\n  \}/, "  const hit = example && word ? maskTarget(example, word, '[ _____ ]') : null;\n  if (hit) return hit.masked;");
src = src.replace(/(  if \(d\.fcFlip\) \{\n)/, '$1    justFlipped = !isFlipped;\n');
src = src.replace("export function renderFlashcardQuickPlay() {", "export function flashcardShortcut(key, render) {\n  return recallShortcut(key, FLASHCARD_DATABASE.filter(c => c.tier === currentTier), render);\n}\nexport function renderFlashcardQuickPlay() {");
fs.writeFileSync(file, src);
console.log('spliced');
