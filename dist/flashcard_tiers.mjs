// Small, data-free part of the flashcard studio: tier list and the quick-play strip shown on lesson pages.
// Kept apart from flashcards.mjs (9,500 cards, ~4.4 MB) so pages can show these buttons without downloading the card data.
import { renderCommuteQuickPlayStrip } from './commute_dialogues.mjs';

// 閃卡分級定義
export const FLASHCARD_TIERS = [
  { id: 'elem_1000', cards: 1000, name: '🎒 國小基礎 1,000 字', cefr: 'Pre-A1~A1', count: '1,000 字', color: '#16a34a', desc: '日常生活、家庭學校、基礎動詞、顏色數字動物時間' },
  { id: 'jhs_2000', cards: 2000, name: '🏫 國中會考 2,000 字', cefr: 'A1~B1', count: '2,000 字', color: '#0284c7', desc: '教育部常用 2,000 參考字彙、會考情境句、詞性與KK音標' },
  { id: 'shs_3000', cards: 3000, name: '🎓 高中大考 3,000 字', cefr: 'B1~B2', count: '3,000 字+片語', color: '#7c3aed', desc: '大考 4,500/7,000 核心詞、關鍵動詞片語與學術搭配詞' },
  { id: 'toeic', cards: 700, name: '💼 TOEIC 國際商務實戰', cefr: 'B2', count: '商務核心 700 字', color: '#d97706', desc: '商務會議、合約談判、採購預算、辦公通訊高頻詞' },
  { id: 'toefl', cards: 700, name: '🌐 TOEFL 托福學術精熟', cefr: 'B2~C1', count: '學術核心 700 字', color: '#059669', desc: '北美學術演講、校園生活、地質天文、生態演化與人文科學' },
  { id: 'sat', cards: 700, name: '🏛️ Digital SAT 語境學術詞', cefr: 'B2~C1', count: '學術核心 700 字', color: '#4f46e5', desc: 'Words in Context、學術對比詞、歷史社會科學閱讀必背' },
  { id: 'gre', cards: 700, name: '🎭 GRE Verbal 孿生詞群', cefr: 'C1~C2', count: '核心等價 700 詞', color: '#e11d48', desc: '句子等價題孿生詞對 (capricious/fickle 等)、哲學社科精微詞' },
  { id: 'gmat', cards: 700, name: '📊 GMAT 批判邏輯推理詞', cefr: 'C2', count: '批判邏輯 700 詞', color: '#0891b2', desc: 'Assumption, Weaken, Strengthen, Corroborate 等商業決策詞' }
];

export const quickTierLabels = { elem_1000: '國小', jhs_2000: '國中', shs_3000: '高中', toeic: 'TOEIC 多益', toefl: 'TOEFL 托福', sat: 'SAT', gre: 'GRE', gmat: 'GMAT' };

export function renderFlashcardQuickPlay() {
  return `<section class="card flashcard-quick-play" aria-labelledby="flashcard-quick-title">
    <div class="pill">📱 手機直式單手快選 · 單字集 / 片語集一鍵即播</div>
    <h2 id="flashcard-quick-title">9,500 張閃卡與片語集，點選就開始聽讀</h2>
    <p>針對手機直式單手操作優化：點選下方任一<strong>分級單字集</strong>或<strong>高頻片語搭配集</strong>，立即啟動語音連播（每組 20 張，支援思考式純英與雙語模式）。</p>
    <div class="flashcard-quick-grid">${FLASHCARD_TIERS.map(t => `<button class="btn" data-fc-quick-play="${t.id}" aria-label="自動播放${quickTierLabels[t.id]}閃卡"><strong>▶ ${quickTierLabels[t.id]}</strong><span>${t.cards.toLocaleString('en-US')} 張</span></button>`).join('')}</div>
    <div class="quick-phrase-sets" role="group" aria-label="高頻片語與英英思考語音集快選">
      <span class="quick-phrase-label">🔗 片語與搭配詞集即點即播：</span>
      <button class="btn quiet small" data-fc-phrase-play="shs_3000">▶ 高中核心動詞片語集</button>
      <button class="btn quiet small" data-fc-phrase-play="toeic">▶ TOEIC 商務片語搭配集</button>
      <button class="btn quiet small" data-fc-phrase-play="toefl">▶ TOEFL 學術轉折片語集</button>
      <button class="btn quiet small" data-fc-phrase-play="sat">▶ SAT 語境邏輯搭配集</button>
      <button class="btn quiet small" data-fc-phrase-play="gre">▶ GRE 雙選等價片語集</button>
      <button class="btn quiet small" data-fc-phrase-play="gmat">▶ GMAT 商業論證搭配集</button>
    </div>
    ${renderCommuteQuickPlayStrip()}
    <div class="learning-actions" style="margin-top:12px;margin-bottom:0">
      <button class="btn quiet" data-nav="flashcards">搜尋字卡與自訂複習</button>
      <a class="btn quiet" href="#listening">🎧 112 組通勤教學會話電台</a>
      <a class="btn quiet" href="#wordaudio/elementary-001">🎵 190 組 MP3 離線音檔</a>
      <a class="btn primary" href="EN/">🇬🇧 EN 純英檢定教學與英英語音 (TOEFL/TOEIC/SAT/GMAT/GRE) ↗</a>
    </div>
  </section>`;
}
