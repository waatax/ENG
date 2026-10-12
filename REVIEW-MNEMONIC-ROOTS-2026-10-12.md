# 1,000 字諧音聯想強化版＋500 組字根字族（2026-10-12）

使用者要求：徹底更新 1,000 個單字的聯想記憶（以「ambulance → 俺不能死 → 救護車」這類諧音聯想為主），先深度研究網路上的相關記憶法再加入；完整更新語音；另新增 500 組系統字根記憶（例如 board → blackboard、whiteboard、scoreboard；communicate → communication、communion）；經規劃、執行、檢核、修正、迭代後上傳 GitHub Pages。期間 Codex 先完成一輪複核更新，本版在其基礎上整合。

## Plan：研究結論與設計

| 研究 | 重點 | 本站採用方式 |
|---|---|---|
| [Atkinson & Raugh 1974／1975](https://apps.dtic.mil/sti/pdfs/AD0787843.pdf) | 關鍵字法兩段連結：外語聲音 → 母語近音關鍵字（聲音鏈），關鍵字與詞義放進同一互動畫面（意象鏈） | 口訣一律以諧音詞開頭，再接直接帶出詞義的短句：「俺不能死，快叫救護車」 |
| [香港中文大學 Vocabulary Collector](https://vlearn.fed.cuhk.edu.hk/vocabcollector/mnemonic/mnemonic_keyword/index.html) | 中文關鍵字範例：ambulance 俺不能死、pest 拍死它、ambition 俺必勝、strong 死壯 | 保留使用者範例並收錄自然的經典例（strong 死壯、tuxedo 踢死兔） |
| [Qu 等，2024，Heliyon](https://pmc.ncbi.nlm.nih.gov/articles/PMC10839596/) | 110 名中國大學生：「關鍵字＋提取練習」最後測驗優於重讀或單純測驗 | 每張卡先聽、再遮住答案回想，按 1／3／7／14 天複習 |
| 關鍵字法延遲效果研究（系統性回顧與 Wang 等） | 即時效果常見，延遲測驗結果不一，有時遺忘更快；提供圖像可改善 | 不只靠諧音：每張卡加「拼字鉤子」與真實例句，MP3 最後再念一次英文 |
| [Bird & Jacobs 1999](https://www.cuhk.edu.hk/ajelt/vol9/art5.htm)、Chiu & Hawkins 2023（Codex 整理） | 中文母語者七天後關鍵字組較佳，但中英近音不易找 | 找不到自然諧音就改用構詞、英文同音、借音或畫面，不硬湊 |
| [Goodwin & Ahn 2010](https://researchgate.net/profile/Amanda-Goodwin-2/publication/46010226_A_meta-analysis_of_morphological_interventions_Effects_on_literacy_achievement_of_children_with_literacy_difficulties/links/02e7e53208c8340c90000000/A-meta-analysis-of-morphological-interventions-Effects-on-literacy-achievement-of-children-with-literacy-difficulties.pdf) | 17 項研究、79 個效果量：構詞教學對字彙約 d＝0.40，英語學習者約 d＝0.62 | 新增 500 組字根字族頁，並讓 1,000 張卡直接連到相關字族 |
| White, Sowell & Yanagihara 1989（[二手表格](https://www.p2pga.org/wp-content/uploads/2025/04/vocabulary_teaching_word_parts-prefixes.pdf)） | un-、re-、in-／im-／il-／ir-、dis- 約佔有字首單字的一半以上 | 字首組先排高頻字首 |

以上是研究摘要與設計推論，研究並未驗證本站這套口訣；本版沒有做學習成效實驗。

## Do：內容

### 1,000 張聯想卡（editorialVersion 6）
- 來源：`data/mnemonic_v6/cards-01.txt … cards-10.txt`，每行 `word|method|hook|cue|scene|spell|example|exampleZh`，逐詞撰寫；歷史 ID、順序、localStorage 進度鍵完全不變。
- 方法分布（以 `CONTENT-MNEMONICS-V6-2026-10-12.json` 為準）：諧音聯想、外來語借音（沙發、披薩、香波、賽先生）、英文同音（son ↔ sun、eight ↔ ate）、構詞拆字（black + board）、對比、情境。
- 每張卡新增：諧音鉤子（卡面以標籤與螢光標示）、拼字鉤子（如 F-A-M-I-L-Y＝Father And Mother, I Love You、ch + air）、英文例句與翻譯、音節數與重音位置、可跳轉的字族連結。
- 每個口訣都必須把鉤子原字念出來；1,000 個口訣、1,000 個畫面皆不重複；諧音鉤子不重複使用（避免 ten／term、cola／collar 回想時互相干擾）。

### 500 組字根字族
- 來源：`data/word_families/families-01.txt … 09.txt`；150 組複合詞字族、70 組字首、60 組字尾、220 組拉丁希臘字根，共 2,581 個成員字。
- 每組含意思、記憶提示、成員字的中文與拆解（in 往內 + spect 看 → inspect 檢查）；拼字規則以程式檢查（字首組成員必須以字首開頭等），非 CMU 字典字需由英文零件拼出。
- 同拼不同源（pancake 的 pan、computer 的 put）在提示中註明；拆解是記憶工具，不一定等於完整字源。

### 語音
- 卡片 MP3 改為四段：**英文 → 諧音口訣 → 中文意思 → 再念英文**（en-US-AriaNeural／zh-TW-HsiaoChenNeural，-10%）；修剪合成停頓，1,000 檔約 33.7 MB。
- 字族 MP3：先念字族（字首字尾與字根逐字母拼出）與中文意思，再依序念每個成員字的英文與中文；500 檔、6,162 段、152.5 分鐘、36.9 MB。頁面依時間碼高亮正在念的字，點任一字只播那一段。
- 會因詞義改變讀音的成員（close、refuse 等）改為讀音不歧義的詞形，或在中文同時列出兩種意思。

### 頁面
- `/mnemonics/`：新版卡面、五種方法說明、研究與限制、`?q=` 搜尋參數。
- `/roots/`（新）：搜尋、類型與複習篩選、整組播放、單字播放、遮住中文自我測驗、記住／不熟的間隔複習、匯出匯入、`#wf-123` 深連結、成員字連回聯想卡、依篩選結果連播。
- 主站選單新增「500 組字根字族」入口。

## Check：檢核

- `scripts/audit_mnemonic_v6.mjs` → `CONTENT-MNEMONICS-V6-2026-10-12.json`：ID／順序穩定、口訣與畫面唯一、鉤子在口訣中、臺灣繁體（OpenCC，僅豁免划船、游泳、宣布、遠征等合法用字）、例句含目標字、字族拼字規則與互相連結。
- `scripts/validate_mnemonic_trio_audio.py`：解碼 1,000 個 MP3、4,000 段文字順序、雜湊與非靜音。
- `scripts/validate_word_family_audio.py` → `QA-WORD-FAMILY-AUDIO-2026-10-12.json`：500 檔、6,162 段。
- `scripts/validate_mnemonic_release.mjs`：GitHub Actions 部署前閘門（卡片、字族、全部 MP3 雜湊與文字、網站小於 1 GB）。舊版要求 1,000 張水彩插畫的閘門已改為本版內容。
- `scripts/qa_mnemonic_v6.cjs` → `QA-MNEMONIC-ROOTS-BROWSER-2026-10-12.json`：Edge 實機 320／390／768／1280 寬度、播放、跳轉、測驗模式與瀏覽器解碼。
- `node --test scripts/test*.mjs`：全站回歸測試。
- 語音服務中斷與處理：2026-10-12 中午起，edge-tts 原主機對所有連線回 403（本機與 GitHub Actions 雲端皆同，屬全球性變更，見 [edge-tts #490](https://github.com/rany2/edge-tts/issues/490)）。改以 `scripts/tts_endpoint.py` 連到微軟現行的 `api.msedgeservices.com`（同樣的 HsiaoChen／Aria 神經語音與 24 kHz 單聲道 MP3），並把重試退避延長以應付 429 限速；`scripts/rebuild_stale_audio.py` 只重建文字已變更的 105 張卡片與 56 組字族 MP3。

## Act：與 Codex 的整合及迭代修正

1. Codex 依其研究規格（中文自然、聲音可指出相似部分、畫面直接帶出詞義）先修正 cousin、child、mother、grandfather、grandmother，並修正生成器把「情境圖像」如實標示；本版全部保留。
2. 依 Codex 試點清單再修：umbrella 俺不熱啦 → 俺不淋啦、people 皮包 → 批批、student 死讀等 → 是讀的、father 法則 → 發達、goose 姑 → 咕嘶、children 吃得人 → 去兒童、vegetable 改畫面＋拼字記法、family 加 FAMILY 首字母口訣。
3. 自行第二輪掃描 725 張諧音卡，再修 frog 浮過、river 力划、vinegar 味難過、counselor 看心了、rule 律、heel 嘿喲、roof 魯夫、wall 圍、floor 扶樓、hold 好的；並消除重複鉤子（collar 卡了、ten 天）。
4. 多代理複核：四個獨立審稿代理逐張檢查 1,000 張卡與 500 組字族（例句、翻譯、拼字說明、字源真偽、讀音歧義、兒童適宜性），一個代理以 Edge 實測頁面；修正結果見下方「多代理複核結果」。

## 多代理複核結果（全部已處理）

| 代理 | 範圍 | 發現 | 處理 |
|---|---|---|---|
| 瀏覽器 QA | 兩頁 × 320／390／768／1280 寬度；84 頁卡片、42 頁字族逐頁溢出檢查；播放、跳轉、測驗、評分、連播；瀏覽器解碼 80 個 MP3 | 80 項檢查；1 個真實 bug：開啟「遮住中文」時，先前聽過的字仍顯示中文 | 已修正（切換測驗模式時清除已揭示狀態），重測 80／80 通過 |
| 字族複核 A | 150 組複合詞、70 組字首、60 組字尾 | 39 項：27 錯誤、5 讀音歧義、7 冷僻 | 全部採納，例如 grand 改為「隔一代」、shoplifter 改為「商店竊賊」、hypersonic 為「高超音速」，advance／surround／perform 的錯誤字源換成真正的 ad-／sur-／per- 字（adopt、surrender、persuade） |
| 字族複核 B | 220 組字根 | 51 項：27 錯誤、12 讀音歧義、12 警告 | 全部採納，例如 ferry、flush、string、test 並非該拉丁字根（改 suffer、affluent、restriction、attest），port「港口」與「搬運」是兩個拉丁字，sonar 是縮寫；改用臺灣用語（曳引機、暖氣機、護理長） |
| 聯想卡複核 A | 第 1–500 張 | 48 項：32 錯誤、16 偏弱 | 全部採納：移除「罵死」與以身材取笑的「胖子」等不適合兒童的鉤子；shoulder 的 l 要發音；獵豹是「陸地上」最快；cookie、vinegar、history、reindeer、oatmeal、chestnut 的字源說法改為正確或標為拼字記法；考拉、車厘子、啫喱、華夫改為臺灣說法 |
| 聯想卡複核 B | 第 501–1000 張 | 55 項：17 錯誤、38 偏弱 | 採納 54 項：移除「踢死兔」「撣死他」「殺破」「靠呢」等暴力或易誤會的鉤子；comb、iron、vacuum、mop 改為名詞例句；heart、spread、button 的例句與詞義一致；lick 的建議鉤子會與 leek 重複，改用情境法 |

另將 pill、square、shower、year 的北方兒化鉤子改成臺灣自然說法，zucchini 中文改為「櫛瓜」。最終方法分布：諧音聯想 710、外來語借音 37、英文同音 12、構詞拆字 218、對比聯想 4、情境圖像 19；字族成員 2,581 個。Codex 的逐字工作表 `data/mnemonic-reselection/review-1000.csv` 已補上每字現行方法、鉤子、口訣與本輪是否改寫（105 字改寫）。

## 限制

- 諧音只是記憶鉤子：中英文音節、母音、重音與字尾子音不同，正確發音以英文 MP3 與詞典為準。
- 內容由 AI 撰寫並經程式與 AI 審稿代理檢核，未經外部教師審定，也沒有做立即、隔天、隔週的雙向回想實驗；不宣稱提升特定記憶百分比。
- 語音以程式核對文字與非靜音，不是逐字真人聆聽。
- 先前草稿中的 482 張水彩插畫依 v5 口訣繪製，口訣全面更新後已不對應，保留在本機未發布；本版卡面使用 Emoji 圖示。
