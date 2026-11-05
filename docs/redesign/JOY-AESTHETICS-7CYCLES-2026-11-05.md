# 2026-11-05 7 輪 RPDCA 深度升級紀錄：全程度學習心流、美感 UI/UX、閃卡雙向記憶工坊與錯誤科學解說

## 🎯 專案目標與願景
讓任何程度的學習者（Pre-A1 啟蒙至 C2 國際檢定與學術殿堂）都能夠用**科學、有用、有趣**的方法，快樂學好英語。

---

## 🔄 7 輪 RPDCA 深度迭代執行紀錄

### 🔁 Loop 1: 視覺質感與美感 UI/UX 頂級精進 (Elegance & Tactile UI/UX Design System)
*   **深度思考 (Deep Thinking)**：原介面具備功能完整度，但學習者需要更高質感、溫潤如紙本工藝且具備現代數位美感的視覺體驗。
*   **規劃 (Planning)**：導入森林綠暖白美學設計語彙（`--joy-paper: #fffdf7`、`--joy-ink: #243b32`、`--joy-accent: #236748`、`--joy-shadow`）。
*   **優化規劃 (Optimize Plan)**：確保深色模式（Dark Mode）溫潤低眩光（`#1c2924`），按鈕觸控區間皆符合手機 thumb-zone（>= 44px），支援無障礙 `prefers-reduced-motion`。
*   **迭代執行 (Execution)**：更新 `dist/learning_joy.css`、`site/dist/learning_joy.css`。
*   **確認效果 (Verification)**：色彩對比度通過 WCAG AAA/AA 規範，手機直式視窗邊距自適應。
*   **優化 (Refinement)**：加入輕微 spring 微互動，提升回饋感。

---

### 🔁 Loop 2: 閃卡學單字全方位 UI/UX 與雙向記憶工坊重鑄 (Flashcards Mastery & Tactile Experience)
*   **深度思考 (Deep Thinking)**：閃卡不僅是正反翻面，更要喚醒學習者的主動提取（Active Retrieval），並在輸入拼字或核對時給予溫暖且精準的解說。
*   **規劃 (Planning)**：升級「每日單字小遠征（Daily Word Quest）」，整合雙向回想（中➔英 / 英➔中）、音節拆解、KK音標、主題視覺圖示與構詞分析。
*   **優化規劃 (Optimize Plan)**：升級 `spellingFeedback` 引擎，提供字母級差異視覺高亮（`.sp-match`、`.sp-mismatch`、`.sp-missing`）以及常見語音／拼字混淆陷阱解說（默音字母、ie/ei口訣、相鄰顛倒字、雙子音）。
*   **迭代執行 (Execution)**：實作於 `dist/recall.mjs`、`dist/flashcard_recall.mjs` 與 `dist/flashcards.mjs`。
*   **確認效果 (Verification)**：`test_joy_learning.mjs` 與 `test_aesthetic_and_diagnostics_r7.mjs` 測試 100% 通過。
*   **優化 (Refinement)**：保持評分按鈕防呆機制，未揭曉或拼錯時安全引導重試。

---

### 🔁 Loop 3: 全單元至少 10% useful contents 實用內容擴充 (10% Useful Content Expansion)
*   **深度思考 (Deep Thinking)**：學習者背完單字與文法後，必須有生活真實溝通的「遷移任務」與「情境表達」。
*   **規劃 (Planning)**：141 個單元（涵蓋 1-9 段、課綱六學期、四大檢定、進階學院）全面提供三組 10% 延伸內容：
    1. 10% 檢索與運用卡（`lab.cards`）
    2. 10% 本單元實用表達（`lab.phrases`，共 1,483 句）
    3. 10% 遷移小任務（`lab.missions`，共 1,483 個）
*   **優化規劃 (Optimize Plan)**：所有內容嚴格源自單元真實題目與短文，絕無無中生有之機械模板；附帶自我檢驗規準與完整語音導讀。
*   **迭代執行 (Execution)**：優化 `dist/quest/lab.mjs`、`dist/quest/missions.mjs`。
*   **確認效果 (Verification)**：141 單元全部通過 `test_joy_learning.mjs` 與 `test_learning_lab.mjs` 的 10% 檢查。
*   **優化 (Refinement)**：加入任務實踐要領與母語負遷移預防提示。

---

### 🔁 Loop 4: 錯誤時深度科學解說升級 (Smart Coach v3 & Error Breakdown)
*   **深度思考 (Deep Thinking)**：答錯是記憶最深刻的黃金時刻。傳統紅叉只帶來挫折，Smart Coach 必須解釋「你選的為什麼不對、正確答案依據何在、背後文法規則為何」。
*   **規劃 (Planning)**：大幅擴充 `dist/quest/coach.mjs` 的規則診斷庫：
    - 易混淆字：affect/effect、borrow/lend、rise/raise、lie/lay、sensible/sensitive、hard/hardly、late/lately、high/highly、near/nearly、advice/advise、lose/loose、quiet/quite。
    - 情緒分詞：interested/interesting、excited/exciting、bored/boring、tired/tiring、surprised/surprising。
    - 不定代名詞主動一致性：everyone/someone 等單數名詞規則。
    - 因果／轉折／條件連接詞子句結構。
*   **優化規劃 (Optimize Plan)**：在作答回饋呈現清楚的層次：
    1. ❌ 你的答案 vs ✔ 正確答案
    2. 🔍 錯在哪裡（精準錯因診斷）
    3. 💡 為什麼？（底層規則與語境解析）
    4. 📖 原文線索（閱讀題直接標示原文支持句）
    5. 🧠 記憶口訣與舉一反三心法
    6. 🔊 聽正確答案 / 🐢 慢速跟讀 / 💬 聽完整解說
*   **迭代執行 (Execution)**：更新 `dist/quest/coach.mjs` 與 `dist/quest/view.mjs`。
*   **確認效果 (Verification)**：全題庫錯誤選項特定診斷覆蓋率達標，不硬湊無依據解說。
*   **優化 (Refinement)**：確保語音朗讀清除表情符號與重複標點。

---

### 🔁 Loop 5: 全程度科學學習路徑分級鷹架深化 (Pre-A1 to C2 Scaffolded Guidance)
*   **深度思考 (Deep Thinking)**：每位學習者起點不同，平台必須提供清晰的定位與陪伴：
    - **Pre-A1（啟蒙起步）**：自然拼讀、圖解單字、超慢速 0.65x 拼讀、零壓力成就。
    - **A1–A2（基礎會話）**：國小國中 1,000–2,000 字、五大句型、生活常用問答。
    - **B1–B2（進階應用）**：高中 3,000–7,000 字、TOEIC/GEPT 職場商務、長難句拆解。
    - **C1–C2（學術國際檢定）**：托福/雅思/SAT/GRE/GMAT、跨文論證、語域轉換、構詞分析。
*   **規劃 (Planning)**：擴充 `dist/word_structure.mjs` 詞根詞首詞尾庫（im-, in-, en-, anti-, inter-, sub-, -ion, -ous, -ive 及複合詞），提供構詞鷹架。
*   **優化規劃 (Optimize Plan)**：讓每張卡片在翻面後均能看到詞幹結構拆解，減少死記硬背。
*   **迭代執行 (Execution)**：更新 `dist/word_structure.mjs`。
*   **確認效果 (Verification)**：`test_affix_learning.mjs` 測試 100% 通過。
*   **優化 (Refinement)**：複合詞結合日常生活具體事物（如 sunflower、earthquake）。

---

### 🔁 Loop 6: 遊戲化心流、聲音反饋與快樂學英語微互動 (Gamification Flow & Joy Feedback)
*   **深度思考 (Deep Thinking)**：枯燥是語言學習最大的敵人。藉由即時的正向回饋、微音效與成就進度條，營造心流。
*   **規劃 (Planning)**：擴充 Web Audio API 即時程序化音效，答對清脆和弦、訂正溫潤木音、翻卡微聲（`flip`）、連續天數里程碑慶祝（`streak`）。
*   **優化規劃 (Optimize Plan)**：絕不使用刺耳警報聲；答錯時以柔和提示聲鼓勵重試，保護愛心。
*   **迭代執行 (Execution)**：更新 `dist/quest/sound.mjs`。
*   **確認效果 (Verification)**：音效無外部 MP3 依賴，無音效卡頓。
*   **優化 (Refinement)**：靜音與自動播放設定完整同步。

---

### 🔁 Loop 7: 深度確效、全站 100% Byte Parity 同步與正式發布 (Full Verification & Git Sync)
*   **深度思考 (Deep Thinking)**：確保生產端（`dist/`）與部署端（`site/dist/`）完全一致，測試 100% 通過後安全提交發布。
*   **規劃 (Planning)**：執行整合測試腳本，執行 `sync_dist_to_site.mjs`，確認 Git 變更。
*   **優化規劃 (Optimize Plan)**：核對 byte parity，撰寫清晰 Git Commit 紀錄。
*   **迭代執行 (Execution)**：執行測試、同步檔案、Git Commit 與 Git Push。
*   **確認效果 (Verification)**：所有 50+ 項測試通過，Git Push 成功更新至 GitHub Pages。
