# 通勤聽課與圖解文法：研究、設計及檢查紀錄

日期：2026-09-28

## 研究依據

- IES / What Works Clearinghouse, Organizing Instruction and Study to Improve Student Learning：https://ies.ed.gov/ncee/wwc/PracticeGuide/1
  - 本次採用圖文對照、例題與主動回想的設計原則。聽完不等於精熟；保留到站後作答與隔日回想。
- British Council, English Grammar Reference：https://learnenglish.britishcouncil.org/grammar/english-grammar-reference
- British Council, Passives：https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives
- British Council, Talking about the past：https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/talking-about-past
- British Council, Conditionals：https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second
  - 文法原則交叉核對；頁面內容、中文解說、表格與例句為本次原創編排，並非複製教材。
- MDN SpeechSynthesis：https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/resume
- MDN Screen Wake Lock：https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
  - 喚醒只在支援的可見頁面生效，系統可因省電或切換背景釋放，無法承諾鎖屏持續播放。

## 實作範圍

- 61 個學期單元、27 個核心章節及現有知識點均接入單元專屬聽課稿。
- 通勤教室提供國小、國中、高中、高工分類和單元選單。
- 中文解說、英文例句分別使用對應語音；切換頁面或改用其他朗讀時取消前一播放工作。
- 播放、暫停、續播、上一句、下一句、從頭播放、段落跳播、逐字稿、語速、跟讀停頓、睡眠定時與螢幕喚醒。
- 進度只保存在目前瀏覽器，不視為完成學習或測驗成績。
- 20 個文法主題，提供整體地圖、句子角色圖、時態矩陣、判斷流程、對照表、易錯點與即時理解檢核；每課也可聽。

## 迭代

1. 建立內容導向的分段播放，不朗讀頁面按鈕、選單或隱藏作答結果。
2. 檢查中英夾雜段落後，取消語言切換處的長停頓，只在句尾跟讀停頓；回想段落保留至少六秒。
3. 加入可聽見的段落名稱、段落跳播、錯誤停留及本機進度。回呼以播放代號隔離，避免停止後的延遲回呼重新播放。
4. 文法表格使用表頭、標題、橫向捲動；圖示旁有文字，避免只靠顏色傳達。
5. 手機 390 × 844 檢查選單、控制項與段落；將通勤與文法頁面的測驗橫幅移除，讓主功能更靠上。
6. 原有閃卡、知識點與教學頁面回歸測試，新增完整覆蓋與播放器狀態測試。

## 驗證與限制

- 自動測試涵蓋教材覆蓋、文法題目與解析、中英分流、播放完成才推進、暫停與過期回呼、錯誤停留、回想停頓、定時停止，以及 dist / site/dist 一致性。
- 實際瀏覽器驗證文法路由、播放狀態推進、暫停、作答解析、學段切換和手機排版。
- 語音音色與可用性由裝置提供；未在所有 iOS / Android 裝置或鎖屏狀態實測。不提供可下載離線音檔。
- 核心文法專區是學習路線，不宣稱涵蓋所有英文文法例外；既有單元全文沿用現有教材，未宣稱每一筆舊題已由外部專家審核。
