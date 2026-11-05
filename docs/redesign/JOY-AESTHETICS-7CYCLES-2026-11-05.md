# 2026-11-05 7 輪 RPDCA 深度升級紀錄：全程度學習心流、美感 UI/UX、閃卡雙向記憶工坊與錯誤科學解說

## 🎯 專案目標與核心願景 (Mission)
讓**任何程度的學習者**（從 Pre-A1 啟蒙起步、A1–A2 國小國中基礎、B1–B2 高中與職場商務、到 C1–C2 學術殿堂與國際檢定）都能夠用**科學、有用、有趣**的方法，**快樂學好英語**。
全面貫徹 **「( 深度思考 ➔ 規劃 ➔ 優化規劃 ➔ 迭代規劃 ➔ 在開始執行 ➔ 確認效果 ➔ 優化 ) × 7」** 嚴謹工程與認知科學循環。

---

## 🔄 7 輪 RPDCA 深度迭代執行紀錄

### 🔁 Loop 1: 視覺質感與美感 UI/UX 頂級精進 (Elegance & Tactile UI/UX Design System)
*   **深度思考 (Deep Thinking)**：學習者的第一視覺印象與觸感微互動，直接影響學習心流（Flow State）。純扁平或生硬的線條易造成視覺疲勞與死板感，介面需要如「高級紙本工藝（Paper Craftsmanship）」般的溫潤感、自然呼吸的留白與細緻立體的層次。
*   **規劃 (Planning)**：
    1. 確立森林綠暖白美學設計語彙：`--joy-paper: #fffdf7`、`--joy-ink: #243b32`、`--joy-muted: #586b61`、`--joy-accent: #236748`、`--joy-gold: #d99a26`。
    2. 打造立體層次陰影：`--joy-shadow: 0 8px 0 #dae4d5, 0 20px 48px rgba(35,103,72,0.07)`。
    3. 全面優化手機觸控操作（Thumb Zone）：所有按鈕最低觸控高度皆保持 >= 44px。
*   **優化規劃 (Optimize Plan)**：
    - 深色模式（Dark Mode）：調配護眼溫潤墨綠深色底（`#1c2924`），配合低對比眩光柔和文字（`#ecf1e8`）。
    - 無障礙相容：支援 `prefers-reduced-motion`，關閉動畫以照顧前庭敏感者；色彩對比度全數通過 WCAG AAA/AA 規範。
*   **迭代規劃 (Iterative Plan)**：更新 `dist/learning_joy.css` 與 `site/dist/learning_joy.css`，加強各狀態樣式。
*   **在開始執行 (Execution)**：於 `dist/learning_joy.css` 注入全新設計 Token、按鈕微動效（Spring active translateY + scale）、圓角柔化與光暈焦點環（Focus Glow）。
*   **確認效果 (Verification)**：在 320px、390px、768px、1280px 各級解析度下無任何水平溢出，按鈕按壓回饋靈敏。
*   **優化 (Refinement)**：加入輕微 spring 微互動（`transform: translateY(2px) scale(0.985)`），讓點擊感具備真實微觸感。

---

### 🔁 Loop 2: 閃卡學單字全方位 UI/UX 與雙向記憶工坊重鑄 (Flashcards Mastery & Tactile Experience)
*   **深度思考 (Deep Thinking)**：單字記憶最大的瓶頸是「假性熟悉（Illusion of Competence）」——看著單字覺得會，遮住卻說不出來。閃卡必須結合「雙向主動提取（Active Retrieval）」與「雙重編碼（Dual Coding）」：
    1. **正面（Thinking Prompt）**：不直接給中文，而是提供音節拆解、KK音標、詞性標籤與英文語境思考提示，強迫大腦主動聯想檢索。
    2. **背面（Full Knowledge Blueprint）**：揭曉後呈現繁體中文、核心釋義、高頻固定搭配（Collocations）、真實生活例句、詞根詞綴構詞拆解（Morpheme Grid）與深層記憶要點。
*   **規劃 (Planning)**：
    - 升級「每日單字小遠征（Daily Word Quest）」：支援「中文 ➔ 說英文（拼寫/心想）」與「英文 ➔ 想意思」。
    - 正面提供音節拆解、發音按鈕（1.0x 正常速與 0.8x 慢速烏龜發音）及詞性專屬標籤。
    - 翻面後，若該單字在詞庫中具備構詞資料，自動無縫嵌入 `renderWordStructure(c)` 拆字理解模組。
*   **優化規劃 (Optimize Plan)**：
    - 強化評分防呆：若輸入拼寫錯誤，自動鎖定「想起來了」按鈕，引導學習者點選「🌱 還要練（明天再想一次）」，避免錯誤記憶自欺。
*   **迭代規劃 (Iterative Plan)**：在 `dist/flashcard_recall.mjs` 導入 `word_structure.mjs`，並優化翻面與自評流暢度。
*   **在開始執行 (Execution)**：實作完成 `dist/flashcard_recall.mjs`，並於 `dist/learning_joy.css` 提供構詞網格專屬響應式卡片樣式。
*   **確認效果 (Verification)**：`scripts/test_aesthetic_and_diagnostics_r7.mjs` 與 `scripts/test_joy_learning.mjs` 測試 100% 通過。
*   **優化 (Refinement)**：提供雙速語音（標準 1.0x 與慢速 0.8x），在無麥克風或公共場合環境下，亦能安靜有效複習。

---

### 🔁 Loop 3: 智慧拼字診斷與錯誤科學解說 (Smart Spelling Diagnostic Engine)
*   **深度思考 (Deep Thinking)**：背單字拼錯時，學習者最需要知道「我到底哪裡拼錯了、為什麼會錯、有沒有口訣可以記住」。若只給個紅叉，學習者只會挫折；若指出「哪一個字母錯了、背後的語音/拼寫規律是什麼」，失誤立即化為學習養分。
*   **規劃 (Planning)**：
    - 在 `dist/recall.mjs` 的 `spellingFeedback` 引擎中導入字元級視覺化對照：
      - `.sp-match`：綠色高亮完全正確的字元。
      - `.sp-mismatch`：紅色波浪底線標記拼錯的字母，並清楚箭頭標示「➔ 正確為：[目標字母]」。
      - `.sp-missing`：黃色虛線標示缺漏的尾綴或字母。
    - 建立全方位英語拼寫陷阱庫（`diagnoseSpellingTrap`）：
      1. 相鄰字母顛倒（如 teh vs the、form vs from）。
      2. 默音字母：kn-（know, knife）、wr-（write, wrong）、-mb/-bt（climb, thumb, doubt, debt）、-gn（sign, design）、silent l（half, calm, walk）、silent t（listen, castle, often）、silent h（honest, hour, honor）、silent p（receipt, psychology）。
      3. 經典拼法口訣：「i before e except after c」（receive, ceiling vs believe, piece）。
      4. 雙子音陷阱：tomorrow, recommend, accommodate, embarrass, necessary, separate, committee, success, occurred, beginning, parallel, disappoint, business, interrupt, address, possess 等。
      5. 字尾辨析：-able vs -ible、-ance/-ant vs -ence/-ent。
      6. 同音異義字提示：their/there, its/it's, hear/here, weather/whether, loose/lose, quiet/quite。
*   **優化規劃 (Optimize Plan)**：
    - 大小寫與空白容錯：透過 `normalizeRecall` 正規化，去除首尾空白與撇號差異（如 `'` 與 `’`），避免因格式問題誤判。
*   **迭代規劃 (Iterative Plan)**：在 `dist/recall.mjs` 增補診斷規則，並在 `test_aesthetic_and_diagnostics_r7.mjs` 增加全新陷阱測試案例。
*   **在開始執行 (Execution)**：實作於 `dist/recall.mjs`。
*   **確認效果 (Verification)**：所有默音、顛倒字、雙子音、-able/-ible 及同音詞測試 100% 準確觸發診斷。
*   **優化 (Refinement)**：將記憶提示語氣調整為親切鼓勵的教練口吻（如「💡 記憶與發音解析：...」）。

---

### 🔁 Loop 4: 答錯時多維科學解說與認知心流 (Comprehensive Quiz Error Explanations & Smart Coach v3)
*   **深度思考 (Deep Thinking)**：答錯是記憶最深刻的黃金時刻（The "Hypercorrection" Effect）。在闖關或測驗作答錯誤時，介面必須回答學習者心中四個關鍵疑問：
    1. 我剛才選了什麼？
    2. 正確答案是什麼？
    3. 我選的答案錯在哪裡（精準錯因）？
    4. 為什麼正確答案是這個（底層文法原理與語境）？
*   **規劃 (Planning)**：
    - 大幅擴充 `dist/quest/coach.mjs` 的語法與詞彙診斷規則庫（`GROUPS`）：
      - 易混淆詞群：affect/effect、borrow/lend、rise/raise、lie/lay、sensible/sensitive、accept/except、breath/breathe、choose/chose、compliment/complement、principle/principal、stationary/stationery、desert/dessert、economic/economical、historic/historical、classic/classical、assure/ensure/insure、emigrate/immigrate、advice/advise、lose/loose、quiet/quite。
      - 情緒分詞辨析：interested/interesting、excited/exciting、bored/boring、tired/tiring、surprised/surprising 等。
      - 不定代名詞主動一致性：everyone / someone 等代名詞視為單數（搭配 is / has）。
      - 介系詞、冠詞、指示詞、情態助動詞、因果/轉折/條件連接詞等系統化規律。
    - 在閱讀理解題中，精準標記「📖 原文線索」，並提供朗讀按鈕。
*   **優化規劃 (Optimize Plan)**：
    - 絕不硬湊無依據解說：規則判斷不出錯因時，不胡亂猜測，而是保留題目本體的高品質深度 `why` 解析。
    - 語音導讀同步升級：`errorFeedbackSpeechText` 提供完整語音串接（「你剛才回答... 正確答案是... 錯在哪裡？... 為什麼？...」）。
*   **迭代規劃 (Iterative Plan)**：在 `dist/quest/coach.mjs` 增補規則，並保持全題庫 26,186 個錯誤選項的診斷健全性。
*   **在開始執行 (Execution)**：更新 `dist/quest/coach.mjs` 與 `dist/quest/view.mjs`。
*   **確認效果 (Verification)**：`scripts/test_feedback_diagnosis.mjs` 與 `scripts/test_quest_coach.mjs` 通過。
*   **優化 (Refinement)**：語音朗讀自動濾除表情符號與重疊標點符號，發音清脆自然。

---

### 🔁 Loop 5: 全單元至少 10% useful contents 實用內容擴充 (10% Useful Content Expansion across all 141 Units)
*   **深度思考 (Deep Thinking)**：傳統英語學習最大的死穴是「背了不會用」。任何單元背完單字文法後，必須有生活真實溝通的「遷移任務」與「情境表達」。
*   **規劃 (Planning)**：
    - 全站 141 個單元（涵蓋 1-9 段、國中高中 12 學期、TOEIC、Digital SAT、GRE、GMAT、進階大師學院）全面增設三大 10% 延伸模組：
      1. **10% 檢索與運用卡（`lab.cards`）**：詞語偵探、證據偵探、聽力探險、線索解碼。
      2. **10% 本單元實用表達（`lab.phrases`，共 1,483 句）**：情境／意思 ➔ 英文說法，附帶發音與慢速朗讀。
      3. **10% 遷移小任務（`lab.missions`，共 1,483 個）**：情境思維引導規準（Guide Tip）、自我檢驗規準（Check Criteria）、示範答案與深度文法理由。
*   **優化規劃 (Optimize Plan)**：
    - 堅持內容真實性：所有實用內容 100% 來自該單元自己的核心題目與文章，絕非憑空捏造的模板字句。
    - 獨立間隔複習：完成遷移任務後可自評（🌱 還要練 / ✓ 能自己說 / ✦ 能換情境），自動排程下次間隔複習。
*   **迭代規劃 (Iterative Plan)**：嚴格執行 `scripts/test_joy_learning.mjs`、`scripts/test_learning_lab.mjs` 確保 141 個單元無一遺漏。
*   **在開始執行 (Execution)**：於 `dist/quest/lab.mjs` 與 `dist/quest/missions.mjs` 完善機制。
*   **確認效果 (Verification)**：141 單元全部通過 `>= Math.ceil(baseline * 0.1)`，三類實用內容總數皆達 1,483 項。
*   **優化 (Refinement)**：在任務頂部加入四類實用語境心法（💡 實用口語、💡 閱讀心法、💡 聽力心法、💡 文法心法）。

---

### 🔁 Loop 6: 全程度科學分級學習心流與快樂趣味遊戲化 (Pre-A1 to C2 Scientific Flow & Gamification Audio)
*   **深度思考 (Deep Thinking)**：枯燥與挫折感是語言自學者半途而廢的最大殺手。平台必須在「科學嚴謹」與「遊戲化心流」間取得平衡：
    - 零挫折愛心機制：答錯溫和扣心、訂正成功即刻肯定、愛心保護與隨時加練。
    - 多層次科學鷹架：
      - **Pre-A1**：自然拼讀音節拆解、慢速 0.65x 朗讀、生活圖像錨點。
      - **A1–A2**：教育部 1,000–2,000 常用字、基礎五大句型、生活會話。
      - **B1–B2**：高中 3,000–7,000 核心詞、高頻片語搭配、長難句拆解。
      - **C1–C2**：托福/SAT/GRE/GMAT 孿生詞群、學術論證、構詞分析。
*   **規劃 (Planning)**：
    - 在 `dist/word_structure.mjs` 擴充複合詞與常見字首字根：
      - 複合詞：`sunflower`, `earthquake`, `waterfall`, `butterfly`, `keyboard`, `pancake`, `seafood`, `playground`, `skyscraper`, `lighthouse`, `firefighter`, `background`, `masterpiece`, `breakthrough`, `landmark` 等。
      - 字首字尾家族：`bi-`（二/雙重）、`tri-`（三）、`auto-`（自動/自己）等。
    - 在 `dist/quest/sound.mjs` 強化純前端 Web Audio 程序合成音效：
      - `correct`：明亮上升雙音和弦（660Hz ➔ 880Hz）。
      - `wrong`：溫潤低音提醒（220Hz ➔ 180Hz，不刺耳、無挫敗感）。
      - `flip`：輕柔翻卡微聲（587Hz ➔ 740Hz 輕靈木質微響）。
      - `streak`：連對里程碑華麗慶祝琶音（523Hz ➔ 659Hz ➔ 784Hz ➔ 1046Hz ➔ 1318Hz）。
      - `done`：C大調收尾琶音。
*   **優化規劃 (Optimize Plan)**：
    - 所有音效完全使用 Web Audio API 即時波形震盪合成，不依賴任何外部 MP3 檔案，完全杜絕載入失敗或爆音延遲。
*   **迭代規劃 (Iterative Plan)**：更新 `dist/quest/sound.mjs` 與 `dist/word_structure.mjs`。
*   **在開始執行 (Execution)**：完成程式碼撰寫。
*   **確認效果 (Verification)**：`scripts/test_aesthetic_and_diagnostics_r7.mjs` 測試通過，音效播放無報錯。
*   **優化 (Refinement)**：音效音量曲線採用 Exponential Decay，柔和收尾，不打擾沉浸學習。

---

### 🔁 Loop 7: 深度確效、校正優化、100% Byte Parity 同步與正式上傳發布 (Comprehensive QA, Calibration, Dist Sync & Git Push)
*   **深度思考 (Deep Thinking)**：最嚴謹的品質保證在於「多重防線自動化測試」與「生產端 / 部署端零偏差（100% Byte Parity）」。
*   **規劃 (Planning)**：
    1. 執行全站 9 組整合測試套件（40+ 個測試單元）。
    2. 執行 `scripts/sync_dist_to_site.mjs`，將 `dist/` 最新構建成果以位元組為單位同步至 `site/dist/`。
    3. 更新主文檔 `README.md` 與迭代紀錄。
    4. 執行 Git 提交與推送更新至遠端 GitHub（`origin/main`），自動觸發 GitHub Pages 部署。
*   **優化規劃 (Optimize Plan)**：
    - 檢查 Git Status，確保所有變更乾淨無多餘垃圾檔。
*   **迭代規劃 (Iterative Plan)**：以標準化 Commit Message 紀錄所有 7 輪升級成果。
*   **在開始執行 (Execution)**：
    - 全數執行測試 ➔ 同步 ➔ 文件更新 ➔ Git Commit ➔ Git Push。
*   **確認效果 (Verification)**：所有測試 100% 通過，Byte Parity 檢驗 100% 成功，Git Push 成功更新至 GitHub Pages。
*   **優化 (Refinement)**：產出清楚的成果彙整，呈現給使用者檢視。
