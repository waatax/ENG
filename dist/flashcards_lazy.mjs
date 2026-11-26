// Lazy entry for the flashcard studio and the full word practice.
// flashcards.mjs carries all 9,500 cards (about 4.4 MB, 1.4 MB gzipped). app.js imports this file instead,
// so lesson, grammar and knowledge pages open without downloading the card data first.
// The tier list and quick-play strip come from flashcard_tiers.mjs, which has no card data.
export { FLASHCARD_TIERS, renderFlashcardQuickPlay } from './flashcard_tiers.mjs';
import { FLASHCARD_TIERS } from './flashcard_tiers.mjs';

export const FLASHCARDS_READY_EVENT = 'eq-flashcards-ready';
let fc = null, wp = null, fcLoading = null, wpLoading = null, failed = false;

function announce() {
  globalThis.document?.dispatchEvent(new Event(FLASHCARDS_READY_EVENT));
}
function track(promise, keep) {
  return promise.then(mod => { keep(mod); failed = false; announce(); return mod; }, err => { failed = true; announce(); throw err; });
}
export function loadFlashcards() {
  fcLoading ||= track(import('./flashcards.mjs?v=practice20261126'), mod => { fc = mod; });
  fcLoading.catch(() => { fcLoading = null; });
  return fcLoading;
}
export function loadWordPractice() {
  wpLoading ||= track(import('./full_word_practice.mjs'), mod => { wp = mod; });
  wpLoading.catch(() => { wpLoading = null; });
  return wpLoading;
}
export const flashcardsLoaded = () => Boolean(fc);
export const wordPracticeLoaded = () => Boolean(wp);

function waiting(title, load) {
  if (failed) {
    return `<section class="card fc-lazy-state" role="alert"><h1>${title}暫時無法載入</h1><p>可能是網路不穩。請確認連線後按下方按鈕重試。</p><button class="btn primary" data-fc-lazy-retry="true">重新載入</button></section>`;
  }
  load().catch(() => {});
  return `<section class="card fc-lazy-state" role="status" aria-live="polite"><h1>${title}載入中…</h1><p>第一次開啟要下載 9,500 張字卡資料（約 1.4 MB），之後會快很多。</p></section>`;
}

export function renderFlashcardsStudioView() {
  return fc ? fc.renderFlashcardsStudioView() : waiting('單字閃卡', loadFlashcards);
}
export function renderFullWordPractice() {
  return wp ? wp.renderFullWordPractice() : waiting('全字庫練習', loadWordPractice);
}

// Quick play is started from lesson pages before the cards exist, so it waits for the bundle and then starts.
export function startFlashcardQuickPlay(tier, render, phraseOnly = false) {
  if (!FLASHCARD_TIERS.some(t => t.id === tier)) return false;
  if (fc) return fc.startFlashcardQuickPlay(tier, render, phraseOnly);
  loadFlashcards().then(mod => mod.startFlashcardQuickPlay(tier, render, phraseOnly)).catch(() => render?.());
  return true;
}

// Every data-fc-* / data-wp-* control is rendered by the loaded modules, so before loading there is nothing to handle.
export function handleFlashcardEvents(target, render) {
  if (target?.dataset?.fcLazyRetry) { globalThis.location?.reload(); return true; }
  return fc ? fc.handleFlashcardEvents(target, render) : false;
}
export const handleFlashcardInput = (target, render) => (fc ? fc.handleFlashcardInput(target, render) : false);
export const flashcardShortcut = (key, render) => (fc ? fc.flashcardShortcut(key, render) : false);
export function stopFlashcardAutoPlay() {
  fc?.stopFlashcardAutoPlay();
}
export const handleFullWordClick = (button, render) => (wp ? wp.handleFullWordClick(button, render) : false);
export const handleFullWordChange = (target, render) => (wp ? wp.handleFullWordChange(target, render) : false);
export const handleFullWordSubmit = (form, render) => (wp ? wp.handleFullWordSubmit(form, render) : false);
