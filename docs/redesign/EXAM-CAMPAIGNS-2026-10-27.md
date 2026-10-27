# 考試遠征：目標、遊戲化、題庫與成績證據

## 本次交付

新增 `quest/#exams` 考試遠征，四考試各有低、中、高三個自訂備考目標，共 12 條路線、39 個技能入口、24 份未見題挑戰卷。原本的課程主線及考試教材支線保留，相關支線另提供新遠征入口。

| 考試與本站涵蓋範圍 | 低標目標 | 中標目標 | 高標目標 | 本次專區題數 | 其中新增原創 |
|---|---:|---:|---:|---:|---:|
| TOEIC Listening & Reading | 550 | 750 | 900 | 211 | 144 |
| SAT Reading and Writing | 550 | 650 | 750 | 160 | 144 |
| GRE Verbal Reasoning | 145 | 155 | 165 | 121 | 108 |
| GMAT Verbal Reasoning | 75 | 80 | 85 | 82 | 72 |
| 合計 | | | | **574** | **468** |

低／中／高是本站規劃的目標，不是官方通過線、百分位或經等化驗證的題目難度。SAT、GRE、GMAT 分別使用英文分項；不把英語練習換算成包含數學等分項的總分。

## 研究後修正的設計

以官方架構界定技能範圍，不把四種考試排成一條共同等級階梯：

- TOEIC：對話、短篇獨白、商務閱讀、句型與篇章。正式 L&R 涵蓋更多題型及完整錄音條件；參考 [IIBC 官方格式](https://www.iibc-global.org/english/toeic/test/lr/about/format.html)、[ETS 備考工具](https://www.ets.org/toeic/test-takers/prepare.html)。
- SAT：資訊與證據、文意與結構、標準英語規範、表達與修辭。參考 [College Board 四領域](https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing)、[分項分數範圍](https://satsuite.collegeboard.org/scores/what-scores-mean)、[Bluebook](https://satsuite.collegeboard.org/practice/practice-tests/bluebook)。
- GRE：語意填空、六選二句子等義、學術閱讀。六選二必須選兩個不同正確答案，順序無關，單選或多選均不計分。參考 [ETS 結構](https://www.ets.org/gre/score-users/about/general-test/content-structure.html)、[計分](https://www.ets.org/content/ets-org/ca/en/gre/score-users/about/general-test/scoring.html)、[POWERPREP](https://www.ets.org/gre/test-takers/general-test/prepare/powerprep.html)。
- GMAT：閱讀與批判推理；新增題使用五選一，既有四選一內容僅作概念練習，不放入未見卷。沒有把舊制 Sentence Correction 當作現行 Verbal 核心。參考 [GMAC 現行內容](https://www.mba.com/exams/gmat-exam/about/exam-content)、[分項計分](https://www.mba.com/exams/gmat-exam/scores?closePopup=true)、[官方模考](https://www.mba.com/exams/gmat-exam/prep-for-the-exam)。

以上官方資料只用來研究考試架構，468 道題為本站新編，不搬運官方試題。既有內容依實際題面去重後整合 106 題，沒有把原始數千筆重複紀錄當成新增題數。

## 題庫與證據隔離

每個目標的每項技能至少有 4 個訓練內容、4 個 A 卷內容、4 個 B 卷內容。新題以不同情境及論證編寫，附具體中文解析；並包含成本分母、選擇偏誤、反事實、指標誘因、代表性、跨文本與推論界限等考點。

原創題識別碼由內容穩定產生，新增其他單元不會整批更換舊識別碼。同一篇章的題目共用 family，整篇只屬於訓練、A 卷或 B 卷其中之一。抽題繼續使用上輪的內容去重及曝光紀錄；換題號、重新整理或放棄後再開，不會把已看過的卷重新標成未見。

挑戰卷不是官方全長或官方適性模考。TOEIC／SAT 各 16 題、GRE 12 題、GMAT 8 題；時間為本站小型技能挑戰目標，暫停及重新整理不重設計時。閱讀技能練習可用同篇多問，不能據此宣稱完全複製 Digital SAT 的呈現或計分。

## 遊戲化：學習證據與 XP 分開

參考使用者指定的 Game 知識庫，實際閱讀了：

- `Game/GAMIFICATION_CORE_THEORY.md`：自主選擇、勝任感、具體回饋，避免只堆點數徽章。
- `Game/knowledge_base/09_gamification_kpi_and_metrics_framework.md`：區分參與量與真正成效，不把點擊、出席或 XP 當成能力。
- `Game/templates/GamificationEngine.ts`：參考狀態／獎勵／語音回饋的分工，保留本站既有引擎及每日獎勵上限。

落地規則：

1. 所有考試與目標自由選擇。技能印記顯示實際練習數、獨立答對數及題池容量；每項至少 4 個不同內容、近 30 天獨立正確率至少 80%。這只是技能練習印記。
2. 本站目標里程碑另需兩份不同未見卷：限時、全卷至少 80%、每技能至少 75%，兩次相隔至少 24 小時。學習不被等待時間阻擋，等待只用來避免把當日熟悉度當作延後保留證據。
3. 挑戰作答時統一顯示「已記錄」，不顯示正誤色彩、連對提示、答案跟讀或即時解析；完成後才提供逐題回顧。訓練仍即時解說、朗讀及訂正。
4. 語音未完整播放或改看文字，不計獨立聽辨。重做已見卷可以練習，但不能補成新的能力證據。兩份卷耗盡後明確引導官方新模考，不假造無限新卷。
5. 里程碑與 XP 分開；原有單活動每日三次 XP 限制保留。自填成績不發 XP、不偽裝成官方認證。

## 如何負責任地處理「能取得對應成績」

目前**沒有真人配對的本站表現／官方成績資料**，因此未啟用任何正確率轉正式分數公式，也不能保證通過本站就能考到目標分數。

新增官方證據登錄：記錄分項分數、日期、官方卷號／實考場次與來源。檢查合法範圍及分數步進、拒絕未來或不存在日期；兩個不同日期、不同試卷達標才計兩份證據。同卷換天重做不會增加獨立證據數。所有紀錄均明示「自行登錄、來源未驗證」，保存在本機並隨既有備份匯出。

若未來要提供分數預測，需另做實證校準：在知情同意下取得可驗證的配對成績；預先規劃各程度樣本量與可接受誤差；控制重複曝光與同篇多題相關；使用獨立留出樣本評估誤差、區間涵蓋率、分層偏差及跨時間穩定性。達標前維持「備考目標＋直接官方成績證據」，不以通關動畫替代驗證。

仍需官方工具補足的範圍直接顯示在產品：TOEIC 照片／單句應答與完整多篇及原生錄音；GRE 多空格、選句及完整適性條件；SAT Math；GRE Quantitative／Analytical Writing；GMAT Quantitative／Data Insights。本站不宣稱已完成這些完整考試分項。

## 驗證、校正與發布

- 247 項自動測試通過；涵蓋全部 12 路線、正確多選、跨日複測、曝光、超時、聽力、舊進度、備份、日期及分數輸入規則。
- 新考試專區 10 項瀏覽器流程檢查通過；四考試均檢查 320／390／768／1280 寬度。校正直接進入及重新整理時的載入／接續問題。
- 原闖關 22 項、國高中學期 19 項瀏覽器回歸另有紀錄；原 626 關的 6,260 次容量抽題檢查仍通過。
- 題庫重建掛入既有建置程序，避免原本清理衍生 JSON 時刪掉考試題庫。發布流程納入專區測試。
- 發布後比對 39 個線上程式與題庫檔案，確認 Pages 與提交版本一致。

證據位於 `verification/exams20261027/`；主要測試紀錄為根目錄 `QA-EXAMS-2026-10-27.txt`。
