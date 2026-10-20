# 首頁會話學習入口與美式語音迭代 · 2026-10-20

## 檢視與計畫
原首頁將會話藏在聽力頁。現有會話實際共 130 篇，部分介紹仍寫 112；學段與 CEFR 範圍混用，不足以逐篇證明正式程度。目標是縮短找到教材、播放、停止與再次接續的步驟。

## 研究依據
- Council of Europe CEFR global scale：https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale 。程度描述涵蓋理解與表達能力，不能單靠就讀年級或教材標籤判定能力。本輪使用入門、基礎、進階導覽，職場及學術另列用途；未聲稱正式 CEFR 分級。
- MDN getVoices：https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices 。可用聲音由裝置提供；lang 設定無法保證跨裝置音色一致。
- MDN voiceschanged：https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event 。聲音列表可能非同步載入，首頁在列表更新時更新實際聲音標籤。

## 三輪迭代
1. 首頁重排：主視覺後立即呈現全部會話、上次位置、程度與用途、主題搜尋、完成篩選；原有進度、路徑與教材搜尋保留，新增快速捲動入口。
2. 播放與持續學習：純英文、雙語與留白跟讀共用既有引擎及完成紀錄；逐句保存位置，停止、離開及重新載入後可重播該句。首頁播放不自動跳到不相關難度。字幕、回想與完整教材連結集中於播放器。完成播放不代表精熟。
3. 語音及修正：先篩 en-US，再依自然聲音、Google US、裝置聲音排序，移除英式 Daniel 的名稱優先；顯示實際聲音及缺少美式聲音的提示。快速導航使用捲動按鈕，避免干擾主站 hash 路由。同步 dist 與 site/dist 後重跑檢查。

## 驗證與界線
- 21 項針對性回歸通過，涵蓋美式語系優先、所有會話入口、篩選空結果、逐句停止接續、過期回呼、語音完成及原有學習紀錄。
- 發布前 1000 張聯想字卡、500 組字族與 MP3 一致性檢查通過。
- 完整回歸輸出見 QA-HOME-CONVERSATIONS-2026-10-20.txt。
- 本機 HTTP / 瀏覽器預覽受環境通訊限制，未完成視覺及真人聽感驗收。響應式 CSS 已實作，但不宣稱已完成手機實機驗收。
- 本輪沒有製作新的固定神經語音 MP3。自然度仍受裝置聲音限制；未安裝 en-US 時使用裝置預設英文並顯示提示。
- 本輪沿用現有會話，沒有聲稱已逐篇完成教師審定、聲學校正或學習效度研究。
- 本機既有未完成插圖及 mnemonic_revision.txt 異動不包含於本次提交。

## 發布
目標：https://waatax.github.io/ENG/ 。以 main 推送觸發既有 GitHub Pages workflow；只有線上工作流程成功後才能視為部署完成。

## 線上驗證補充
64153f8 的 Pages 工作流程成功，正式首頁 HTTP 200 且包含新資產；線上 coffee 搜尋返回 2 篇對應會話。檢視後將原有快選區改為預設收合，避免擠壓首頁主入口。完整回歸共 164 項通過。真人聽感與手機實機驗收仍未完成。
