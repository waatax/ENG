# English Quest 英語能力遠征｜全考制模考與深度語音學習系統

[![Deploy to GitHub Pages](https://github.com/waatax/ENG/actions/workflows/pages.yml/badge.svg)](https://github.com/waatax/ENG/actions/workflows/pages.yml)
[![Live Site](https://img.shields.io/badge/Live%20Demo-waatax.github.io%2FENG-emerald?style=flat&logo=github)](https://waatax.github.io/ENG/)

> **線上體驗網址**：[https://waatax.github.io/ENG/](https://waatax.github.io/ENG/)

---

## 🌟 專案核心特色

本專案經過跨領域專家團隊（認知心理學、現代心理計量學、升學課綱、教育智財法、語音 NLP 與全齡 UX）七輪深度迭代優化，打造結合實證學習科學與全考制模考題庫的現代化英語學習平台。

### 1. 21 個深度章節教學與全方位語音庫
- **國中會考能力線 (J1–J7)**：五大句型、時態變化、代名詞、連接詞、生活應用文本、聽力連音弱化、會考配速與訂正。
- **高中學測統測線 (S1–S7)**：分詞構句、倒裝假設、篇章結構四空五選、學術長篇雙文比較、7000 核心詞彙與搭配語塊、中譯英產出、作文論證與整卷衝刺。
- **高工技術職場線 (V1–V7)**：工場安全與 PPE、量具與尺寸公差、SOP 與故障排除、技術圖表與手冊、商務書信與詢價、統測專業英文 (二)、跨國工程驗收。
- **國際頂尖考制 (GEPT / TOEIC / SAT / GRE / GMAT / TOEFL iBT 2026)**：官方考制最新規格、模組化適應性測驗架構。

### 2. 全單字・片語・會話原生語音播放系統 (Dual-Engine Audio)
- 每個核心單字均附 **標準國際音標 (IPA)、詞性、中文釋義、實用例句**，並配備 **🔊 正常速度** 與 **🐢 慢速 0.75x** 朗讀按鈕。
- 每個實用片語皆附例句與一鍵發音。
- 每個章節配備 **真實情境雙人會話室 (Dialogue Studio)**，支援單句點讀與 **「▶️ 完整對話連播」**，即時高亮當前說話者氣泡。
- 獨立 **「單字會話語音館 (Audio Studio)」**，支援即時關鍵字檢索、分科分類篩選與沉浸式磨耳朵練習。

### 3. 現代心理計量與實證記憶科學
- **FSRS-5 (Free Spaced Repetition Scheduler v5)**：動態維護記憶穩定度 $S$、難度 $D$ 與可提取性 $R$，告別死板固定天數。
- **IRT 項目反應理論**：客觀題 3PL 模型與非選題 GPCM 模型，SAT 模組化 MST 路由，GMAT 逐題 CAT 與 Fisher 訊息量最大化。
- **四層潔淨室題庫 (Clean-Room Iso-Functional Pipeline)**：Layer A–D 沙盒架構，零侵權風險且測驗構念效度 100% 等價。
- **國內 109–115 年 28 個年度科目包**：完整收錄學測、會考、統測共同與專業英文原卷及法規級重錄聽力。

---

## 📂 專案核心文件索引

- **[ENGLISH-MASTERY-PLATFORM-PLAN-V3.md](ENGLISH-MASTERY-PLATFORM-PLAN-V3.md)**：終極執行典範計畫書（數理計量、四層沙盒、28 包藍圖、1420 節點 DAG、單元經濟學）。
- **[EXPERT-TEAM-ITERATION-LOG.md](EXPERT-TEAM-ITERATION-LOG.md)**：專家委員會名冊與 7 輪深度迭代會議紀錄。
- **[EXAM-SOURCE-INVENTORY-2020-2026.md](EXAM-SOURCE-INVENTORY-2020-2026.md)**：七年 28 個年度科目包官方來源與附件狀態盤點表。
- **[RESEARCH-NOTES.md](RESEARCH-NOTES.md)**：實證文獻依據與邊界條件。

---

## 🛠️ 本地開發與靜態部署

本專案採原生純現代 ES Modules 架構，無需繁瑣建置打包工具即可直接運行：

```bash
# 啟動本機預覽伺服器 (Node.js)
node site/server.mjs

# 開啟瀏覽器訪問
http://127.0.0.1:4173
```

平台推送至 GitHub `main` 分支時，將自動透過 GitHub Actions 工作流程部署至 GitHub Pages：
👉 **[https://waatax.github.io/ENG/](https://waatax.github.io/ENG/)**
