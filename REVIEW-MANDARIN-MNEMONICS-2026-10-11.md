# 1,000 字國語聯想卡逐詞校正

使用者指出「上、生、兒子」等原有口訣無法自然聯想到意思。前版雖通過筆數、繁體、唯一性及音檔檢查，卻大量使用任意音譯人名及硬湊故事；這些結構檢查不能證明口訣品質。本次改寫全部 1,000 張，不只把前版改成正式標籤。

## Plan：研究與編輯原則

- [Bird 與 Jacobs，1999，中文母語者關鍵字法研究](https://www.cuhk.edu.hk/ajelt/vol9/art5.htm)：49 名中文母語英語學習者的兩個課堂組別，即時測驗未見顯著組間差異，七天後關鍵字組較佳。作者同時指出中英語音橋難以尋找。這不支持為每個單字硬造國語諧音。
- [Wei，2015，構詞法與關鍵字法比較](https://eric.ed.gov/?id=EJ1048554)：121 名中國大一學生分成三種學習條件；在翻譯測驗中，關鍵字法不及構詞法及自主策略，詞形辨認未見各組顯著差異。不同學習目標不宜假設同一記憶方法都最好。
- [Qu、Liu 與 Qiao，2024，關鍵字與回想練習](https://pmc.ncbi.nlm.nih.gov/articles/PMC10839596/)：110 名中國大學生，在回想次數受限的條件下，結合策略優於重讀。方法需要把詞形線索與詞義連在互動意象中。本網站沿用遮答案回想，沒有把被動連播當成等效的回想練習。

以上是研究摘要與本站設計推論；研究沒有驗證本站這 1,000 張卡，也沒有證明 AI 編寫等於教師審定。

逐詞規則：國語能自然理解；聲音、形態或語義連結明確；對應本卡詞義；場景可想像；避免陌生人名、無關音節、虛假拆詞及錯誤字源。沒有自然近音時，優先實際構詞、可辨別的對照，最後採動作或用途情境。純情境仍需聽讀才能建立英文形式與意義的連結。

## Do：全部重寫並同步語音

|方法|張數|使用方式|
|---|---:|---|
|國語近音|8|近音和詞義直接互動，如 knee「泥沾膝蓋」；保留使用者指定 ambulance 例子並明示近似|
|同音連結|12|熟悉英文同音詞搭橋，如 son ↔ sun；顯示兩個拼字，避免混義|
|熟悉借音|27|利用已有國語名稱，如巴士、夾克、起司；不憑空發明音譯人名|
|構詞連結|198|顯示實際英文成分或詞家族，如 wheel + chair；不將所有固定名稱照字面解釋|
|對比聯想|458|同一畫面區分親屬、單複數、反義、身體位置或相似物件|
|情境聯想|297|動作、外形、位置、用途的具體中文畫面，明示並非近音|

1,000 筆來源在 `data/mnemonic_revision.txt`，210 筆可見英文橋在 `data/mnemonic_links.txt`。逐詞新舊口訣、意思、場景及方法在 `data/mnemonic-revision-review.json`；100% 口訣不同於前版。此紀錄是編輯決策，不是自動生成的「成效分數」。

詞義亦修正 10 筆：llama 美洲駝、hyena 鬣狗、squid 魷魚／槍烏賊、squash 瓜類、highway 公路／幹道、freeway 出入口受限高速公路、fishery 漁業／漁場、skip 蹦跳／跳過／跳繩搭配、steam 蒸／蒸汽、panther 豹類常用稱呼。部分名稱及常見外形線索明示不是嚴格生物分類或絕對規則。

詞典核對例：[Cambridge llama](https://dictionary.cambridge.org/us/dictionary/english-chinese-simplified/llama)、[Cambridge squid](https://dictionary.cambridge.org/dictionary/english-chinese-traditional/squid)、[Cambridge highway](https://dictionary.cambridge.org/us/dictionary/english-chinese-traditional/highway)、[Cambridge freeway](https://dictionary.cambridge.org/dictionary/english-chinese-traditional/freeway)、[PONS hyena](https://en.pons.com/translate/english-chinese/hyena)。每卡提供 Cambridge 查詞連結；此入口不代表本站逐字引用或逐一人工核對整份詞典。

全部 1,000 個三段 MP3 重新合成，臺灣國語聲線、速度 -10%；沿用已核對的英文音段。中文第二段改讀完整而簡短的新聯想，第三段讀中文意思，省略括號註記。總量約 51.04 MB，每個約 6.64–11.47 秒。單字及連播網址加版本參數，避免剛更新時讀到舊音檔。

頁面明示各種方法，篩選從「原有／本次補齊」改成六種聯想方法；搜尋亦包含英文橋。另修正 785 張舊圖示，避免 son 顯示書本、weather 顯示餐盤、turtle 顯示書包等不相關配圖；來源在 `data/mnemonic_icons.txt`。Emoji 組合是概念示意，不是精確物種或解剖插圖。既有編號、localStorage key、複習進度與個人口訣保留。自訂口訣不會改寫固定 MP3，畫面會提示音檔讀本站原始版本。

## Check：內容、聲音、瀏覽器

- `scripts/audit_mnemonic_editorial.mjs`：1,000 筆來源逐一與產物相符，口訣與場景各 1,000 個不重複，繁體文字、210 個英文橋、詞義與範例回歸、原有編號穩定。它不測量記憶效果。
- `scripts/validate_mnemonic_trio_audio.py`：解碼全部 1,000 MP3，核對 3,000 段文字、順序、時間、檔案大小及 SHA256；每段非靜音。此檢查不是人類逐一聽音或辨認語音的證明。
- `scripts/qa_mnemonics.cjs`：Edge 真實播放、暫停接續、下載、搜尋翻卡、方法篩選、自訂口訣逃逸與備份；320／390／768／1280 寬度；全部 84 頁的 1,000 張展開字卡在 320 寬度無橫向溢出；瀏覽器解碼全部音檔。
- `scripts/test_mnemonic_playlist.mjs`：5 個案例，含全部 1,000 筆只播一次及結尾停止。
- `scripts/qa_mnemonic_playlist.cjs`：Edge 真實自然接播、暫停接續、搜尋翻頁不打斷、單字與連播互斥、404 停住並重試。
- `scripts/qa_mnemonic_revision.cjs`：12 個代表詞的聯想、中文意思、方法與英文橋，全部六種方法篩選，son／knee／wheelchair 新語音網址與實際播放。

## Act：正式產物及後續校正

發布前執行 `node scripts/sync_dist_to_site.mjs`，核對鏡像；提交並推送 main，由 GitHub Pages 工作流程部署，再核對公開頁面與 MP3。使用者仍可用自己的口訣並回想測試；新的具體回饋應回到逐詞來源修訂，再重建對應音檔，不能只改卡片文字。

重建順序：`python scripts/build_mnemonics.py` → `python scripts/build_mnemonic_trio_audio.py` → 內容、音訊與瀏覽器檢查 → 鏡像同步。語音工具按文字簽章只重建改變的檔案。歷史補齊紀錄不能用來宣稱本版全都是諧音或已有實證效果。
