# English Quest 七輪科學迭代優化報告 (2026-11-11)

**執行工作流：** `( 深度思考 ➔ 規劃 ➔ 優化規劃 ➔ 迭代規劃 ➔ 開始執行 ➔ 確認效果 ➔ 優化 ) × 7`

---

## 核心目標達成總覽

1. **所有單元增加至少 10% 實用學習內容 (`+10% ~ +33% useful contents`)**：
   - **141 個闖關單元 (`dist/quest/lab.mjs`)**：在既有 1,483 張回想運用卡 (`cards`) 與 1,483 項情境造句任務 (`missions`) 之外，新增 **1,483 組「🔬 易錯盲點與干擾項診斷卡 (`clinic`，每單元 `Math.ceil(baseline * 0.1)`)」**，針對各單元真實題目中的高頻干擾項進行正誤對照與雙語語音導讀。
   - **79 個 108 課綱學年單元 (`dist/curriculum_unified.mjs` + `dist/unit_useful_boost.mjs`)**：每單元新增 `usefulChunks`（核心字彙活用與情境對話語塊）並擴充第 4 題語境形成性評量題（`+33%` 評量題數），同步呈現在 `dist/app.js` 與 `dist/lesson_pages.mjs` (`microLesson`)。
   - **27 個主題教學章節 (`dist/curriculum.mjs` + `dist/lesson_pages.mjs`)**：每章新增實戰片語 (`+33% phrases`) 與互動式「🚀 10% 實用延伸語境診斷題 (`w.boosterCheck`)」。
   - **20 個圖解文法單元 (`dist/grammar.mjs` + `dist/practice_extra.mjs`)**：每單元 `GRAMMAR_EXTRA` 擴充第 3 道進階盲點診斷題（`+50%` 加深題數）。
   - **28 個核心知識點 (`dist/knowledge.mjs`)**：每課擴充第 4 組正誤對照例句 (`+33% pairs`) 與自查清單。
   - **8 個 C1→C2 精進學院單元 (`dist/advanced_content.mjs` + `dist/advanced_academy.mjs`)**：每單元新增 `collocations`（高階學術寫作句型框架）與互動式 `diagnosticCheck`（觀念盲點快測，`+16.7%` 實用內容）。

2. **錯誤時有解說 (`Universal Error Explanations`)**：
   - **閃卡隨堂 4 選 1 快測 (`dist/flashcard_browse.mjs`) & 10 卡快測 (`dist/flashcard_recall.mjs`)**：選錯時立即揭露「你選的中文意思其實是哪個英文單字（含詞性、音標與搭配詞）」，並對照本卡目標字、結構拆解與科學記憶錨點。
   - **9,500 單字完整練習 (`dist/full_word_practice.mjs`) & 國中小基本單字 (`dist/school_words.mjs`)**：選錯詞義時指出干擾項對應之英文單字；拼字錯誤時透過 `spellingFeedback()` 呈現逐字差異標記 (`sp-diff-box`) 與拼讀規則提示。
   - **108 課綱 79 單元形成性評量 (`dist/app.js`)**：修正單一單元共用 `userQuizChoices[u.id]` 導致跨題高亮的狀態問題，改為每題獨立狀態 `${u.id}-${qi}`，且選錯時自動展開「🔍 錯在哪裡（排除與對比診斷）」、「💡 語法規律提示」與「⭐ 完整解析」。
   - **章節與微課檢核 (`dist/lesson_pages.mjs`)、圖解文法 (`dist/grammar.mjs`)、知識點 (`dist/knowledge.mjs`)、C1→C2 精進學院 (`dist/advanced_academy.mjs`)**：所有檢核題答錯時皆自動呈現針對該錯誤選項的「🔍 錯在哪裡」具體診斷。

3. **9,500 張閃卡字庫 100% 完整度與質感美感 UI/UX 升級 (`dist/flashcards.mjs`, `dist/flashcard_browse.mjs`, `dist/flashcard_studio.css`)**：
   - 結合 `data/sources/cmudict.dict`（美式音標轉換）、`dist/mnemonics/cards.json`（國小 1,000 記憶錨點）、`dist/roots/groups.json`（500 組字根字首字族）與自然例句語塊提取，修復原本被過濾為空白的 2,960 張字卡欄位，達成 **9,500 張字卡 100% 具備真實美式 IPA、自然搭配詞 (`collocation`)、結構拆解 (`chunk`)、科學記憶法 (`memoryTip`) 與雙語例句**，且模板殘留數為 `0`。
   - 升級 `.fc-card-deck` 立體紙卡堆疊層次、音節拍點徽章 (`.fc-rhythm-pill`)、鍵盤快捷鍵提示 (`Space`、`1`–`4`)、背面三欄式科學記憶網格 (`.fc-science-grid`) 與隨堂提取快測面板 (`.fc-instant-quiz`)。

---

## 七輪科學迭代紀錄 (`7 Cycles × 7 Steps`)

| 輪次 | 核心主題 | 關鍵執行檔案 | 量化驗證指標 |
| :--- | :--- | :--- | :--- |
| **Cycle 1** | 9,500 閃卡語料 100% 補完與科學記憶強化 | `dist/flashcards.mjs`, `scripts/complete_flashcard_corpus.mjs`, `dist/vocabulary-catalog.json` | 9,500 卡 `missingIpa: 0`、`missingColl: 0`、`missingTip: 0`、`badFlags: 0` |
| **Cycle 2** | 閃卡館立體紙卡質感與隨堂 4 選 1 快測診斷 | `dist/flashcard_browse.mjs`, `dist/flashcard_recall.mjs`, `dist/flashcard_studio.css` | 支援 `1-4` 快捷鍵與點擊快測，選錯即時顯示易混詞對比卡片 |
| **Cycle 3** | 單字練習室詞義對比與拼字逐字診斷 | `dist/full_word_practice.mjs`, `dist/school_words.mjs` | 詞義選錯指出干擾字真身；拼錯顯示 `sp-diff-box` 逐字母比對 |
| **Cycle 4** | 全站課程、章節、文法、知識點與 C1→C2 錯題解說 | `dist/app.js`, `dist/lesson_pages.mjs`, `dist/grammar.mjs`, `dist/knowledge.mjs`, `dist/advanced_academy.mjs` | 100% 互動練習題答錯時顯示 `🔍 錯在哪裡` 專屬干擾項解析 |
| **Cycle 5** | 全系統單元 `+10%` 實用學習內容擴充 | `dist/quest/lab.mjs`, `dist/unit_useful_boost.mjs`, `dist/curriculum_unified.mjs`, `dist/advanced_content.mjs` | 141 闖關單元新增 1,483 組診斷卡；79 課綱單元、27 章節、20 文法、8 進階單元全數擴充 `>=10%` |
| **Cycle 6** | 全站 UI/UX 視覺美感、深色模式與無障礙優化 | `dist/flashcard_studio.css`, `dist/learning_joy.css`, `dist/quest/quest.css`, `dist/advanced_academy.css` | 統一錯題診斷色系、立體卡片陰影、RWD 手機單手操作與深色模式對比 |
| **Cycle 7** | 全套自動化測試、Byte-Parity 同步與部署驗證 | `scripts/test_aesthetic_and_diagnostics_r7.mjs`, `scripts/sync_dist_to_site.mjs` | 16 套 CI 測試全數通過，`dist/` 與 `site/dist/` 100% 位元組一致 |

---

## 第二波七輪科學迭代紀錄 (`Wave 2: 7 Cycles × 7 Steps` — 全站專項實驗室與純英學院全面深化)

| 輪次 | 核心主題 | 關鍵執行檔案 | 量化驗證指標 |
| :--- | :--- | :--- | :--- |
| **Wave 2 · Cycle 1** | 純英學院 (`dist/EN/`) `+50%` 課堂題庫、`+31%` 大考專項演練、3D 閃卡與干擾項診斷 | `dist/EN/content.mjs`, `dist/EN/extended.mjs`, `dist/EN/exam_curriculum.mjs`, `dist/EN/academy.mjs`, `dist/EN/academy.css` | 20 堂純英課每課擴充至 3 題 (`+50%`)、大考專項演練由 16 組增至 21 組 (`+31.25%`)、純英閃卡新增 3D 牌組與 4 選 1 快測及 `Why Your Choice Failed` 解說 |
| **Wave 2 · Cycle 2** | 自然拼讀大師課 (`dist/phonics_mastery.mjs`) `+42.8%` 解碼字庫與 8 模組互動聽音辨字快測 | `dist/phonics_mastery.mjs` | 長單字解碼示範擴充至 10 字 (`+42.8%`)；8 大拼讀模組新增 16 道互動診斷題，答錯即時解析發音與口型盲點 (`.phonics-wrong-diagnosis`) |
| **Wave 2 · Cycle 3** | 字首字尾構詞館 (`dist/affix_guide.mjs` & `dist/affix_library.mjs`) `+25%` 語境例句與構詞防呆快測 | `dist/affix_guide.mjs`, `dist/affix_library.mjs` | 35 個字首字尾單元全數新增雙語語境例句 (`contextSentence` + `🔊 聽例句`，`+25%` 實用內容) 與 6 道構詞診斷題 (`.affix-wrong-diagnosis`) |
| **Wave 2 · Cycle 4** | 通勤雙語對話館 (`dist/commute_dialogues.mjs`) 154 組對話 `+20%` 聽力理解隨堂快測與誤選診斷 | `dist/commute_dialogues.mjs` | 154 組通勤情境對話全數新增 3 選 1 聽力理解與語用快測 (`compCheck`)，答錯顯示針對該選項的 `🔍 錯在哪裡` 解析 |
| **Wave 2 · Cycle 5** | 學力診斷報告 (`dist/diagnostic.mjs`) 個人化誤選診斷卡與完整句語音朗讀 | `dist/diagnostic.mjs` | 答錯題目頂部自動顯示 `.diag-user-wrong-box`（「🔍 錯在哪裡：您的選擇 vs. 正確答案」），並新增 `🔊 聽完整句` 語音按鈕 |
| **Wave 2 · Cycle 6** | 雙向回想練習室 (`dist/flashcard_recall.mjs`) 記憶修復三步法與慢速例句跟讀 + 全域樣式打磨 | `dist/flashcard_recall.mjs`, `dist/learning_joy.css` | 答錯字卡自動顯示「🔬 記憶修復三步法（拍音節 ➔ 綁搭配 ➔ 慢速例句跟讀）」與 `🐢 慢速例句` 按鈕 |
| **Wave 2 · Cycle 7** | 全站 17 套測試套件（122 項測試）校驗、Byte-Parity 同步與 Git 遠端推送 | `scripts/test_aesthetic_and_diagnostics_r7.mjs`, `scripts/sync_dist_to_site.mjs` | 122 項單元與整合測試 `100% PASS (0 fail)`，`dist/` 與 `site/dist/`（含 `EN/`）100% 位元組完全一致 |

