# 全站更新優化與 GitHub Pages 重新上線（2026-11-23，RPDCA）

最後更新：2026-11-23（Asia/Taipei）

## R｜研究：現況盤點（動手前實測）

| 項目 | 實測結果 | 影響 |
| :--- | :--- | :--- |
| GitHub Pages 部署 | 11/10 `3bd98f1`、11/11 `bc116fa`、11/11 `7039c72` 三次部署 **全部失敗**（後兩次卡在「Verify flashcard content…」測試步驟，第一次卡在 Deploy 步驟）。 | 線上網站停在 **11/5 的 `ac97ac2`**；11/10 之後的所有內容（含 Wave 2）學習者都看不到。 |
| 測試 | 本機 `node --test scripts/test_*.mjs`：HEAD 為 343 項中 **7 項失敗**；加上今天未提交的 Wave 3 修改後為 344 項中 **8 項失敗**。 | 先前文件寫的「122 項 100% PASS、已推送至 GitHub Pages」與實際不符（CI 只跑部分測試檔，且確實失敗）。 |
| 未提交的工作 | 今天上午另一個工具留下 Wave 3 修改（dist/ 與 site/dist/ 各 19 個檔、測試與文件），未提交、未部署。 | 需要先驗證再決定是否上線。 |
| `#sixth`（國小銜接教材） | 開啟即拋出 `TypeError: Cannot read properties of undefined (reading 'map')`，頁面停在上一頁內容。 | 側欄「國小銜接教材」入口實際無法使用（自 9 月匯入後即如此）。 |
| 程度檢定紀錄 | `diagnostic.mjs` 讀取已不存在的 `honoraryBadge.title`，例外被 `try/catch` 吞掉。 | 自 10/5 起，「最近一次測驗紀錄」卡片從未出現，檢定歷史從未存檔。 |
| 載入量 | 首頁很輕（約 60 KB gzip）；但點進任何教材頁，`app.js` 會靜態載入 82 個模組 **9.38 MB（gzip 2.55 MB）**，其中 9,500 張字卡 `flashcards.mjs` 單檔 4.4 MB（gzip 1.4 MB，佔 56%）。 | 手機行動網路開教材頁很慢，即使學習者根本沒有要用字卡。 |

## P｜計畫

1. 修正讓部署失敗的測試問題：逐條判斷是「介面文字改了」（更新測試、保持一樣嚴格）還是「功能真的壞了」（修程式）。
2. 驗證 Wave 3 內容：答案是否正確、錯因說明是否講對、最小對立音是否真的只差一個音、寫作偵測是否誤判正確句子；並修好 `reader-quick-check` 沒有出現的問題。
3. 修好 `#sixth` 當機與原始標記外露（`#e91e63`、LaTeX、`![圖解]()`）。
4. 字卡改為「用到才載入」，教材頁不再先下載 9,500 張字卡。
5. CI 改為部署前跑 **全部** 測試檔，避免再出現「文件說全過、實際部署失敗」。
6. 以瀏覽器（手機 390px／桌面 1280px）逐頁巡檢 console 錯誤、水平溢出、標記外露。
7. 同步 `site/dist/`、提交、推送，確認 Actions 綠燈與線上版本。

## D｜執行

- `dist/app.js`：`#sixth` 改用匯入資料原本的欄位（`coreConcepts`、`keyFormulas`、`examPitfalls`、`selfChecklist`、`readAloudPassage`），並以既有的 `cleanText()`／`textBlocks()` 清掉色碼、LaTeX 與失效圖片語法。
- `dist/diagnostic.mjs`：不存在的 `honoraryBadge` 改為安全讀取，檢定歷史恢復存檔。
- 字卡延遲載入：
  - 新增 `dist/flashcard_tiers.mjs`：只有 8 個級別、各級張數與快選列（不含字卡資料）。
  - 新增 `dist/flashcards_lazy.mjs`：`app.js` 改從這裡引入；第一次打開字卡或全字庫練習時才 `import()` 字卡模組，載入中顯示狀態訊息，失敗顯示重試。
  - 學習者按下快選、打開快選面板或點字卡連結時就先開始下載，按下後通常已載完。
  - `index.html` 的 importmap 版本改為 `?v=lazy20261123`；`sw.js` 快取名稱改為 `v20261123-lazy1`。
- `.github/workflows/pages.yml`：新增「Run the complete automated test suite」步驟（`node --test scripts/test_*.mjs`）。
- 新增 `scripts/test_flashcards_lazy.mjs`：保證 `app.js` 的靜態依賴不含字卡模組、各級張數與實際資料一致、延遲載入前後畫面一致。

## C｜檢查（只寫實際跑過的）

- 字卡延遲載入（本機瀏覽器）：`#knowledge` 載入後資源清單中沒有 `flashcards.mjs`；切到 `#flashcards` 才載入並正常顯示；冷啟動從課程頁按「國中」快選 → 自動跳到字卡頁、載入、開始朗讀第一張；`#wordpractice` 冷啟動可開始 20 題測驗。
- 教材頁靜態載入量：**9.38 MB → 4.77 MB（gzip 2.55 MB → 1.07 MB，約 −58%）**。
- `#sixth`：不再當機；速記筆記顯示「Magic e 口訣／核心觀念／考試陷阱／自我檢核」，朗讀區顯示段落；內文已無 LaTeX 與圖片語法殘留。
- 完整自動化測試（`node --test scripts/test_*.mjs`）：**350 / 350 項全數通過（0 失敗、0 略過）**，涵蓋 Wave 3 全部 7 輪升級（12 學期單元、Duolingo 第 1 章、對立音與三速聽寫、CEFR 寫作工坊、51 篇故事點字共讀快測、首頁 4 級暖身與圖解、1,000 諧音卡與 500 字族卡快測與深色模式、9,500 閃卡背面構詞拆解與延遲載入、190 組單字 MP3 隨堂快測、擬真模考與考試遠征錯題診斷、48 項避雷雷達）。
- `dist/` 與 `site/dist/` 同步驗證：經 `node scripts/sync_dist_to_site.mjs` 達成 100% 位元組一致（含新增 `flashcard_tiers.mjs` 與 `flashcards_lazy.mjs`）。

## A｜仍未驗證／限制

- 內容（含 Wave 3）由 AI 撰寫並經程式與 AI 抽查，**尚未經教師審定**。
- 語音朗讀使用裝置的合成語音；iOS Safari 在延遲載入後第一次自動朗讀，可能需要再點一次播放（瀏覽器限制，未在實機測試）。
- 本機所在的 HiNet 線路會擋 GitHub Pages 部分 IP（見記憶紀錄），線上檢查改用未被擋的 185.199.111.153。

---

## 第二段（2026-11-24）：部署結果、內容稽核與續修

### 部署（實際 GitHub Actions 紀錄）

| commit | 內容 | 結果 |
| :--- | :--- | :--- |
| `c57080d`（11/23 14:13，另一個工具代為提交） | 本文第一段的修正 + Wave 3 | build 全部測試通過；**Deploy 步驟失敗**（舊版 Pages actions） |
| `68998a6` | CI 拆成 build／deploy 兩段，Pages actions 升級 | 成功，線上更新 |
| `7a415dd` | 另一個工具新增 Ultralearning（See·Do·Feedback）練習 | 成功；build 含「完整測試」步驟全綠 |

### 內容稽核（逐項，不是抽樣）

測試只檢查功能「有沒有出現」，不檢查答案與說明「對不對」，所以 11/23 的「350/350 通過」不代表內容正確。11/24 逐項檢查 Wave 3 新增內容（學期快測 12、暖身 12、Duolingo 錯因 11、故事快測 51、諧音卡快測 1,000、字族卡快測 500、MP3 快測 950、最小對立音 60、寫作偵測 113 句、聽寫 46 組輸入、避雷 6 條），找到並修正 14 項：

- 聽寫評分：①「take bus」被配對成「the」，回饋講錯字；現在正確指出「takes 字尾漏聽」與「the 弱讀漏聽」。② 多寫或漏寫一個字後，後面順序正確的字全被判錯（17%、0%）；現在判對。③ does、me、your 等弱讀功能詞漏聽時，回饋誤說「留意重音」。
- 寫作偵測：④「I'm very like my mom.」等正確句被誤判；⑤「She married with him.」漏抓；⑥「discussed about ten ideas」（about＝大約）被誤判；⑦「more taller / more heavier」漏抓；⑧「look forward to watch」漏抓。修正後 17 個正誤句全部判斷正確。
- 說明文字：⑨ trap-43 把「prior to + 子句」也說成改用 although（應改 before）；⑩ Duolingo 說個人安排「要用 will / be going to」（現在進行式也是正確用法）；⑪⑫ hop、bet 的中文釋義與例句不符；⑬ 故事讀後快測的「解析」常顯示與題目無關的場景提示，現改為先列出原句與意思。
- 題目設計：⑭ 190 組 MP3 快測第 N 題的正解永遠在同一個位置（#1 永遠 A…），現依組別打散；標題原寫「聽音」，但畫面直接印出英文字，改稱「字義快測」。
- 順帶修正舊內容：dic-b1-2「before Friday meeting」→「Friday's」；mp-05 例句沒有 breed；mp-12 標題補上 fl/fr。

### 其他修正

- `#sixth` 手機版：ASCII 圖解（`<pre>`）原本右半被裁掉，現在在自己的框內左右捲動；`.layout` 在 ≤1024px 改為 `minmax(0, 1fr)`，表格不再把整欄撐寬。
- `#jh` 的「⚡ 會考直練」切到題庫時沒有更新網址，重新整理或上一頁會回錯地方；現在會寫入 `#exams`。

### 檢查

- `node --test scripts/test_*.mjs`：**356 / 356 通過**；`scripts/test_release_fixes_20261123.mjs` 新增 3 項，鎖住上述聽寫、寫作偵測與說明修正（含「每組最小對立音例句必須同時包含兩個字」）。
- `#sixth` 375px（headless Edge）：主欄無水平溢出，4 個圖解各自可捲動，console 無錯誤。

### 仍未處理

- mp-06「lead」單獨朗讀時，合成語音可能讀成 /lɛd/（鉛）；未實機確認。
- 「片語與搭配詞集」篩選把每張卡都算成片語（每張卡都有兩字以上搭配詞），等於沒有篩選；若改嚴格定義，國中級只剩 7 張、SAT/GRE 為 0，需要內容決策。
- Ultralearning 新功能未做逐項內容稽核。

---

## 第三段（2026-11-24）：全站瀏覽器巡檢後的修正

以 headless 瀏覽器在 390px 與 1280px 巡檢 36 條路由（72 次載入）＋實際操作（字卡回想、全字庫練習、闖關作答、程度檢定），找到 8 項，修正 7 項：

- `#arch`（高中先修講義館）：6 個分頁全部讀錯資料欄位，畫面出現 72 處「undefined」，KK 音標分頁點了會拋錯而打不開。改讀資料實際欄位（`desc`、`nameZh/nameEn`、`role/types`、`sym/word/kk`、`en/kk/ex`、`semesterTitle/subtitle/curriculumScope`）；KK 音標由 12 個補齊為 38 個並附查字典代碼；基礎詞彙的類別按鈕原本寫死成不存在的 travel/food…、搜尋框也沒有作用，現在改用資料的 12 個類別並可搜尋（輸入時保留游標，注音輸入法組字中不重繪）。
- 側欄「單元微課」(`#junyi`)、「核心教學章節」(`#chapter`)：點了網址會變但頁面不動，現在會開啟最近的單元／章節。
- 手機版裁切：`#exams` 題庫下拉選單、`#curriculum108` 高中分頁卡片、`#handouts` 三欄單字表；`app.js` 內 14 處 `minmax(NNNpx, 1fr)` 改為 `minmax(min(100%, NNNpx), 1fr)`（寬螢幕不變）。
- Ultralearning「DO」卡片標題在手機上被擠成一個字寬（`flex: 1` 零基準）；改為 `flex: 1 1 14rem`。
- `mnemonics/`、`roots/`、`EN/`、`quest/simulation.html` 缺圖示連結，瀏覽器去抓 `favicon.ico` 得到 404；補上與首頁相同的內嵌圖示。
- 7 張字卡的「中文意思」其實是英文（axe＝"ax"、km＝"kilometer"、email＝"electronicmail"、vigor＝"vigor"…），其中 3 張畫面直接顯示英文，且 7 組單字 MP3 用中文語音念英文字。改為中文（斧頭、公里、電子郵件、活力；精力…），並重錄這 7 組 MP3。

未改：`#today`（側欄寫「每日練習」）實際顯示學年課程地圖——是要改名稱還是做真正的每日練習，需要產品決定。

### 檢查

- headless Edge 390px：`#arch` 6 個分頁「undefined」0 處、無水平溢出；詞彙類別篩選與搜尋正確且游標保留；`#junyi`→單元頁、`#chapter`→章節頁；`#exams`、`#curriculum108`、`#handouts`、`#jh` 無溢出；Ultralearning 標題寬 250px；console 無錯誤。
- `scripts/test_release_fixes_20261123.mjs` 再加 3 項（`#arch` 欄位、側欄路由與手機格線、字卡中文意思與 MP3 一致）。
