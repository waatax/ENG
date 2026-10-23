# English Quest 遊戲化改版｜文件入口

最後更新：2026-10-24（Asia/Taipei）

最新 v5：[七輪實作與驗證紀錄](SEVEN-ROUNDS-2026-10-24.md)。正式發布狀態以 `verification/release-v5.json` 為準。

闖關版位於 `dist/quest/`，上線後的網址是 `/quest/`。主站首頁最上方有入口。

1. [v2 全站大改版計畫](GAME-REDESIGN-V2.md)：研究摘要、9 段主線與 8 條目標分支、節點與題型、遊戲機制、工程架構與品質閘門。
2. [RPDCA 執行紀錄](RPDCA-LOG.md)：R0 研究、試點補記，以及 v2 的 R1–R5。每一輪都寫明實際做了什麼、檢查了什麼、發現與修正的問題，以及尚未驗證的事。
3. 逐題校審：`data/quest-review/` 中記錄每題的排除與修改及其原因，目前完成第 1–4 段（2026-10-24，AI 校審加主工作階段核對，不是教師審定）。
4. [課程建置報告](COURSE-BUILD-REPORT.json)：各段題數、題型分布、被排除的題目與原因、檔案大小。
5. [瀏覽器驗證](verification/browser-v2.json) 與 `verification/v2-*.png` 截圖。
6. 歷史文件：[R0 整體規劃](GAME-REDESIGN-RPDCA.md)、[第一批 12 關規格](PILOT-QUESTS.md)、[內容盤點](CONTENT-BASELINE-2026-10-23.json)。

## 重建與檢查

```bash
node scripts/build_quest_course.mjs
```

```bash
node --test scripts/test_quest_game.mjs
```

```bash
node scripts/qa_quest_game.cjs
```

第一行從現有教材重新產生課程。只要教材有更新就要重跑；題目 ID 由來源順序決定，來源不變時 ID 也不會變。第二行是課程資料與引擎規則的測試。第三行是無頭瀏覽器流程驗證，需要本機的 Playwright。

本機預覽：執行 `node scripts/preview_listening.cjs`，再開啟 `http://localhost:8080/quest/`。

題目由站內教材自動轉換，並經程式檢核與抽樣閱讀，尚未逐題經教師審定；XP 與段落不能換算為正式程度或考試成績。
