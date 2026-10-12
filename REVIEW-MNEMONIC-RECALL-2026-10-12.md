# 1,000 字聯想記憶卡：校正與雙向回想迭代
日期：2026-10-12

## 已完成變更
本輪逐詞改寫 50 張有牽強近音、任意故事或誤導拼字拆法的卡片。完整決定見 data/mnemonic-reselection/iteration-corrections.json；以 data/mnemonic_v6/cards-*.txt 為正式來源。1,000 張歷史 ID 與順序不變，ambulance 保留使用者指定口訣。
新增所有字卡共用的英文→中文與中文→英文兩種回想方向；分開儲存評量／到期日。舊進度作正向進度移轉，JSON 備份保留雙向紀錄。未到期重複自評答對不升級等待間隔；答錯十分鐘後再試。
反向模式把中文釋義內含英文的括號移出正面，修正全量測試實際發現的 skip rope 答案洩漏；下載音訊的無障礙標籤也不洩漏單字。提示音訊仍能主動播放，作學習支援，不自動算為獨立答對。
圖片圖示放在翻卡答案內，避免正向回想先看到中文或圖示線索。
本輪更換整套資源快取標籤 keyword6r2，確保新文字與 MP3 一起更新。兩個部署根同步。

## 內容例子
- father：法則牽強近音 → father / mother 稱呼對比。
- library：來不累哩 → library / librarian 圖書館與館員。
- weather：外的 → weather / whether 同音與拼字區分。
- patient：陪心等 → 病人與有耐心的多義對照。
- porpoise：泡泡 → 鼠海豚短吻形態，區分一般海豚。
- student：說明 study / student 是相關詞，不是 study 直接加 ent。
- scissors：兩片刀刃剪紙，補 a pair of scissors；不靠硬湊嘶喳喳。

## 驗證
- 全量內容檢查：1,000 不重複詞、ID／順序、獨特口訣與場景、繁中、例句與方法欄位、字族連結。
- 全量音訊：1,000 MP3／4,000 段實際解碼，核對英文→提示→意思→英文、文本、雜湊、時長及非靜音。變動口訣已重建；不是逐檔人工聽審。
- 舊版瀏覽器回歸：80 項通過，四尺寸 320／390／768／1280；手機遍歷全部 84 頁，包含翻卡；真實單張播放、暫停、連播、下一張、停止及字族功能；抽樣解碼 40 字卡＋40 字族 MP3。
- 反向回想：320／1280 各遍歷全部 1,000 張，共 2,000 張正面檢查，沒有可見英文答案、整頁溢出，兩方向進度獨立且重載有效。
- 單元測試：雙向紀錄、未到期不提前升級、旧紀錄移轉、匯入損壞欄位處理；連播完整佇列、暫停、競態、錯誤與重試。
- 發布前檢查亦涵蓋原有 500 字族／500 MP3，維持靜態網站總體積限制。

## 品質範圍
本輪是整套學習機制改善、50 張具體內容校正與全部資料／語音的功能核對。沒有將未變動的 950 張宣稱為本輪逐字詞典審訂；沒有實驗證明每個口訣的記憶效果，也不作「絕對無誤」保證。剩餘近音提示可依個人回想表現換用自訂口訣或其他方法。

## 可核對來源
香港中文大學關鍵字法： https://vlearn.fed.cuhk.edu.hk/vocabcollector/mnemonic/mnemonic_keyword/index.html
臺灣國中關鍵字結合提取研究（42 人、21 字）： https://jurnal.uin-palangkaraya.ac.id/index.php/jefl/article/view/6313/0
patient 多義詞典： https://dictionary.cambridge.org/us/dictionary/english/patient
鼠海豚形態 NOAA： https://www.fisheries.noaa.gov/species/harbor-porpoise/science?page=1
其他研究與全量重選規劃見 MNEMONIC-RESELECTION-RESEARCH-2026-10-12.md。
