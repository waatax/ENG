// scripts/update_flashcards_autoplay.mjs
// 更新 flashcards.mjs 中之自動輪播核心邏輯與複習模式 UI

import fs from 'node:fs';

const filePath = 'dist/flashcards.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// 1. 替換語音輪播按鈕 UI
const oldVoiceButtons = `          <button class="btn \${autoPlayVoiceMode === 'word_zh_sentence' ? 'primary' : 'quiet'}" data-fc-voice-mode="word_zh_sentence"
            style="font-size:12px;padding:6px 14px;border-radius:8px;font-weight:\${autoPlayVoiceMode === 'word_zh_sentence' ? '700' : '500'};border:\${autoPlayVoiceMode === 'word_zh_sentence' ? '2px solid #047857' : '1px solid #cbd5e1'}"
            title="依序朗讀：英文單字 ➔ 翻面 ➔ 繁中核心釋義 ➔ 完整英文例句">
            🌟 英文單字 ➔ 中文 ➔ 完整例句（標準聽讀）
          </button>
          <button class="btn \${autoPlayVoiceMode === 'word_zh' ? 'primary' : 'quiet'}" data-fc-voice-mode="word_zh"
            style="font-size:12px;padding:6px 14px;border-radius:8px;font-weight:\${autoPlayVoiceMode === 'word_zh' ? '700' : '500'};border:\${autoPlayVoiceMode === 'word_zh' ? '2px solid #047857' : '1px solid #cbd5e1'}"
            title="依序朗讀：英文單字 ➔ 翻面 ➔ 繁中核心釋義">
            🔤 英文單字 ➔ 中文釋義（快速記憶）
          </button>
          <button class="btn \${autoPlayVoiceMode === 'word_sentence' ? 'primary' : 'quiet'}" data-fc-voice-mode="word_sentence"
            style="font-size:12px;padding:6px 14px;border-radius:8px;font-weight:\${autoPlayVoiceMode === 'word_sentence' ? '700' : '500'};border:\${autoPlayVoiceMode === 'word_sentence' ? '2px solid #047857' : '1px solid #cbd5e1'}"
            title="依序朗讀：英文單字 ➔ 翻面 ➔ 完整英文例句">
            🌐 英文單字 ➔ 完整例句（純英沉浸）
          </button>`;

const newVoiceButtons = `          <button class="btn \${autoPlayVoiceMode === 'word_zh_sentence' ? 'primary' : 'quiet'}" data-fc-voice-mode="word_zh_sentence"
            style="font-size:13px;padding:7px 16px;border-radius:8px;font-weight:\${autoPlayVoiceMode === 'word_zh_sentence' ? '700' : '500'};border:\${autoPlayVoiceMode === 'word_zh_sentence' ? '2px solid #047857' : '1px solid #cbd5e1'}"
            title="依序完整朗讀：英文單字（語音） ➔ 翻面 ➔ 中文釋義（語音） ➔ 完整英文例句（語音）">
            🌟 完整聽讀：英文 ➔ 中文 ➔ 完整例句
          </button>
          <button class="btn \${autoPlayVoiceMode === 'word_zh' ? 'primary' : 'quiet'}" data-fc-voice-mode="word_zh"
            style="font-size:13px;padding:7px 16px;border-radius:8px;font-weight:\${autoPlayVoiceMode === 'word_zh' ? '700' : '500'};border:\${autoPlayVoiceMode === 'word_zh' ? '2px solid #047857' : '1px solid #cbd5e1'}"
            title="簡易高頻複習：英文單字（語音） ➔ 翻面 ➔ 中文釋義（語音檔就好，快速高效複習）">
            ⚡ 簡易複習：英文 ➔ 中文（語音檔）
          </button>
          <button class="btn \${autoPlayVoiceMode === 'word_sentence' ? 'primary' : 'quiet'}" data-fc-voice-mode="word_sentence"
            style="font-size:13px;padding:7px 16px;border-radius:8px;font-weight:\${autoPlayVoiceMode === 'word_sentence' ? '700' : '500'};border:\${autoPlayVoiceMode === 'word_sentence' ? '2px solid #047857' : '1px solid #cbd5e1'}"
            title="純英語境沉浸：英文單字（語音） ➔ 翻面 ➔ 完整英文例句（語音）">
            🎧 純英沉浸：英文 ➔ 完整例句
          </button>`;

// Normalize CRLF for matching
content = content.replace(/\r\n/g, '\n');

if (!content.includes(oldVoiceButtons)) {
  console.error('oldVoiceButtons not found');
  process.exit(1);
}
content = content.replace(oldVoiceButtons, newVoiceButtons);

// 2. 替換完成慶祝面板的語音模式提示
const oldBannerVoice = `語音模式：\${autoPlayVoiceMode === 'word_zh_sentence' ? '英文 + 中文 + 英文例句' : '英文 + 中文'} · 雙重編碼記憶已深化`;
const newBannerVoice = `語音模式：\${autoPlayVoiceMode === 'word_zh_sentence' ? '🌟 完整聽讀（英文 ➔ 中文 ➔ 完整例句）' : (autoPlayVoiceMode === 'word_zh' ? '⚡ 簡易複習（英文 ➔ 中文語音檔）' : '🎧 純英沉浸（英文 ➔ 完整例句）')} · 雙重編碼記憶已深化`;

if (!content.includes(oldBannerVoice)) {
  console.error('oldBannerVoice not found');
  process.exit(1);
}
content = content.replace(oldBannerVoice, newBannerVoice);

// 3. 替換 startFlashcardAutoPlay 完整函數
const startAutoPlayMarker = 'export function startFlashcardAutoPlay(renderCallback) {';
const startIdx = content.indexOf(startAutoPlayMarker);
if (startIdx === -1) {
  console.error('startFlashcardAutoPlay not found');
  process.exit(1);
}

const endAutoPlayMarker = 'export function handleFlashcardInput(target, renderCallback) {';
const endIdx = content.indexOf(endAutoPlayMarker, startIdx);
if (endIdx === -1) {
  console.error('endAutoPlayMarker not found');
  process.exit(1);
}

const newAutoPlayFn = `export function startFlashcardAutoPlay(renderCallback) {
  stopFlashcardAutoPlay();
  isAutoPlaying = true;
  batchCompleted = false;
  const currentToken = ++autoPlayToken;

  function runCurrentCard() {
    if (!isAutoPlaying || autoPlayToken !== currentToken) return;

    const batchCards = getBatchCards();
    if (!batchCards.length || currentCardIndex >= batchCards.length) {
      stopFlashcardAutoPlay();
      renderCallback();
      return;
    }

    const card = teachingCard(batchCards[currentCardIndex]);

    // 階段 1：卡片顯示正面純英文，完整朗讀英文單字
    isFlipped = false;
    renderCallback();

    playWord(card.word, false, {
      onEnd: () => {
        if (!isAutoPlaying || autoPlayToken !== currentToken) return;

        // 英文單字結束後停頓 600ms（提供大腦回想檢索的黃金時間）
        autoPlayStepTimer = setTimeout(() => {
          if (!isAutoPlaying || autoPlayToken !== currentToken) return;

          // 階段 2：翻至背面顯示繁中核心釋義與主題圖示
          isFlipped = true;
          renderCallback();

          if (autoPlayVoiceMode === 'word_sentence') {
            // 純英例句模式：不朗讀中文，直接朗讀完整英文例句
            playSentenceStep();
          } else if (autoPlayVoiceMode === 'word_zh') {
            // 簡易快速複習模式：僅朗讀英文單字 + 繁中釋義（無例句，快速高效複習）
            playChinese(card.zh, {
              onEnd: () => {
                if (!isAutoPlaying || autoPlayToken !== currentToken) return;
                proceedToNextCard(800);
              },
              onError: (e) => {
                if (!isAutoPlaying || autoPlayToken !== currentToken) return;
                if (e?.error === 'interrupted' || e?.error === 'canceled') return;
                proceedToNextCard(600);
              }
            });
          } else {
            // 完整聽讀標準模式 (word_zh_sentence)：英文單字 ➔ 中文釋義 ➔ 完整例句英文語音
            playChinese(card.zh, {
              onEnd: () => {
                if (!isAutoPlaying || autoPlayToken !== currentToken) return;
                playSentenceStep();
              },
              onError: (e) => {
                if (!isAutoPlaying || autoPlayToken !== currentToken) return;
                if (e?.error === 'interrupted' || e?.error === 'canceled') return;
                // 中文若因系統缺少繁中語音而報錯，仍繼續播放完整英文例句，不中斷學習流程
                playSentenceStep();
              }
            });
          }

          function playSentenceStep() {
            const example = card.example;
            if (example) {
              autoPlayStepTimer = setTimeout(() => {
                if (!isAutoPlaying || autoPlayToken !== currentToken) return;

                playSentence(example, false, {
                  onEnd: () => {
                    if (!isAutoPlaying || autoPlayToken !== currentToken) return;
                    proceedToNextCard(1000);
                  },
                  onError: (e) => {
                    if (!isAutoPlaying || autoPlayToken !== currentToken) return;
                    if (e?.error === 'interrupted' || e?.error === 'canceled') return;
                    proceedToNextCard(800);
                  }
                });
              }, 500);
            } else {
              proceedToNextCard(800);
            }
          }
        }, 600);
      },
      onError: (e) => {
        if (!isAutoPlaying || autoPlayToken !== currentToken) return;
        if (e?.error === 'interrupted' || e?.error === 'canceled') return;
        proceedToNextCard(800);
      }
    });
  }

  function proceedToNextCard(delay = 1000) {
    if (!isAutoPlaying || autoPlayToken !== currentToken) return;
    const batchCards = getBatchCards();

    // 依模式保留停頓時間，進行深度記憶沉澱
    autoPlayStepTimer = setTimeout(() => {
      if (!isAutoPlaying || autoPlayToken !== currentToken) return;

      if (currentCardIndex < batchCards.length - 1) {
        currentCardIndex++;
        runCurrentCard();
      } else {
        // 完成當前組練習！
        batchCompleted = true;
        isAutoPlaying = false;
        renderCallback();
      }
    }, delay);
  }

  runCurrentCard();
}

`;

content = content.slice(0, startIdx) + newAutoPlayFn + content.slice(endIdx);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated flashcards.mjs with enhanced auto-play logic and UI.');
