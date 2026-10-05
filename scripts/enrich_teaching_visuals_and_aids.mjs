import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// =========================================================================
// 1. UPDATE dist/lesson_visuals.mjs
// =========================================================================
let visualsPath = path.join(ROOT, 'dist', 'lesson_visuals.mjs');
let visualsContent = fs.readFileSync(visualsPath, 'utf8');

const newVisualFunctions = `
// 21. 疑問句語序與情態助動詞結構圖 (Question & Modals Blueprint)
export function renderQuestionModalsBlueprint() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">❓ 疑問句語序 (5W1H) 與情態助動詞語氣強弱光譜</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">助動詞倒裝金律</span>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:12px">
        <div style="font-size:12px;color:#475569;font-weight:700;margin-bottom:8px">【Wh- 特殊問句黃金語序公式】：疑問詞 + 助動詞 (do/does/did/be) + 主詞 + 原形動詞？</div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:13px">
          <span style="background:#3b82f6;color:#fff;padding:6px 12px;border-radius:6px;font-weight:700">Where (疑問詞)</span>
          <span style="color:#64748b;font-weight:bold">+</span>
          <span style="background:#10b981;color:#fff;padding:6px 12px;border-radius:6px;font-weight:700">does (助動詞)</span>
          <span style="color:#64748b;font-weight:bold">+</span>
          <span style="background:#f59e0b;color:#fff;padding:6px 12px;border-radius:6px;font-weight:700">she (主詞)</span>
          <span style="color:#64748b;font-weight:bold">+</span>
          <span style="background:#8b5cf6;color:#fff;padding:6px 12px;border-radius:6px;font-weight:700">live (原形動詞) ?</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(140px, 1fr));gap:8px;text-align:center;font-size:12px">
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:10px;border-radius:8px">
          <strong style="color:#991b1b;font-size:13px">must (95% 必定)</strong>
          <div style="color:#64748b;margin-top:2px">確鑿推測或強烈義務</div>
        </div>
        <div style="background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px">
          <strong style="color:#92400e;font-size:13px">should (75% 應當)</strong>
          <div style="color:#64748b;margin-top:2px">合理預期或建議</div>
        </div>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:10px;border-radius:8px">
          <strong style="color:#1e40af;font-size:13px">may / can (50% 可能)</strong>
          <div style="color:#64748b;margin-top:2px">一般推測或請求許可</div>
        </div>
        <div style="background:#f3e8ff;border:1px solid #ddd6fe;padding:10px;border-radius:8px">
          <strong style="color:#6d28d9;font-size:13px">might / could (30% 或許)</strong>
          <div style="color:#64748b;margin-top:2px">微弱推測或極委婉禮貌</div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:10px">
        ⚠️ <strong>考場題眼：</strong>遇到 does / do / did 或情態助動詞 (can, will, must)，後方主動詞一律回歸「動詞原形」！
      </div>
    </div>
  \`;
}

// 22. 等立連接詞 (FANBOYS) 與從屬複句結構圖 (Conjunctions & Complex Sentences)
export function renderConjunctionsComplexSentencesDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🪢 等立連接詞 (FANBOYS) vs. 從屬副詞子句結構對照圖</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">複句標點法則</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;margin-bottom:12px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px">
          <div style="font-weight:700;color:#1e40af;font-size:13px;margin-bottom:6px">【等立連接詞 FANBOYS】：連接兩個獨立子句</div>
          <div style="font-size:12px;color:#334155;margin-bottom:8px">
            <strong>For, And, Nor, But, Or, Yet, So</strong>
          </div>
          <div style="background:#fff;padding:8px;border-radius:6px;border:1px dashed #3b82f6;font-size:12px">
            <code>[獨立子句 1] <strong>, but</strong> [獨立子句 2]</code><br>
            例：<em>I was tired, but I finished my homework.</em> (有逗號！)
          </div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px">
          <div style="font-weight:700;color:#166534;font-size:13px;margin-bottom:6px">【從屬連接詞】：引導副詞子句修飾主要句</div>
          <div style="font-size:12px;color:#334155;margin-bottom:8px">
            <strong>Because, Although, If, When, While, Since</strong>
          </div>
          <div style="background:#fff;padding:8px;border-radius:6px;border:1px dashed #10b981;font-size:12px">
            <code><strong>Although</strong> [從屬句] <strong>,</strong> [主句]</code> (句首有逗號)<br>
            <code>[主句] <strong>because</strong> [從屬句]</code> (放句尾通常不加逗號)
          </div>
        </div>
      </div>
      <div style="background:#fef2f2;border:1px solid #fecaca;padding:10px 14px;border-radius:8px;font-size:12px;color:#991b1b">
        🚫 <strong>致命語病警告：</strong>繁中常說「因為…所以…」、「雖然…但是…」，但英文 <code>Because ... so ...</code> 與 <code>Although ... but ...</code> 絕對不可同時存在於同一句中！二選一！
      </div>
    </div>
  \`;
}

// 23. 聽力辨識、連音與語音線索圖 (Listening Acoustic Cues)
export function renderListeningConnectedSpeechDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🎧 英語母語者真實聽力解碼：連音、弱讀與語調起伏全景圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">Acoustic Cues</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;margin-bottom:12px">
        <div style="background:#fff;border:1px solid #bfdbfe;border-radius:8px;padding:12px">
          <div style="color:#1d4ed8;font-weight:700;font-size:13px">1. 連音現象 (Linking) 🔗</div>
          <div style="font-size:12px;color:#475569;margin-top:4px">
            <strong>前字子音 + 後字母音：</strong><br>
            • <code>hold on</code> ➔ /həʊl.dɒn/<br>
            • <code>pick it up</code> ➔ /pɪ.kɪ.tʌp/
          </div>
        </div>
        <div style="background:#fff;border:1px solid #86efac;border-radius:8px;padding:12px">
          <div style="color:#15803d;font-weight:700;font-size:13px">2. 弱讀央母音 (Weak Forms) 📉</div>
          <div style="font-size:12px;color:#475569;margin-top:4px">
            <strong>文法虛詞元音弱化為 /ə/：</strong><br>
            • <code>to</code> /tə/ · <code>for</code> /fə/<br>
            • <code>and</code> /ən/ · <code>of</code> /əv/<br>
            非實詞重音，語流中極輕極快帶過！
          </div>
        </div>
        <div style="background:#fff;border:1px solid #fde68a;border-radius:8px;padding:12px">
          <div style="color:#b45309;font-weight:700;font-size:13px">3. 語調密碼 (Intonation) 📈</div>
          <div style="font-size:12px;color:#475569;margin-top:4px">
            • <strong>升調 ↗：</strong>Yes/No 問句 (Are you ready?)、不確定語氣<br>
            • <strong>降調 ↘：</strong>Wh- 特殊問句、確定直述句與命令
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b">
        💡 <strong>聽力破題思維：</strong>聽力測驗不要試圖聽清每一個虛詞，把耳朵鎖定在「實詞（名詞、主要動詞、形容詞、否定詞）」的重音與語調轉折上！
      </div>
    </div>
  \`;
}

// 24. 大考衝刺極限配速與三層排雷圖 (Exam Pacing & Strategy)
export function renderExamStrategyDiagnosisDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🎯 大考高分決勝：極限配速時間表與三層排雷訂正閉環</strong>
        <span class="pill" style="font-size:11px;background:#fee2e2;color:#991b1b">會考 A++ / 學測 15 級分</span>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:12px">
        <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:6px">⏱️ 學測 100 分鐘 / 會考 60 分鐘 黃金時間分配節奏：</div>
        <div style="display:flex;height:24px;border-radius:6px;overflow:hidden;font-size:11px;font-weight:700;color:#fff;text-align:center;line-height:24px">
          <div style="width:20%;background:#3b82f6" title="單選字彙語法">字彙 10m</div>
          <div style="width:25%;background:#10b981" title="克漏字與文意選填">篇章 25m</div>
          <div style="width:35%;background:#f59e0b" title="長篇閱讀與混合題">閱讀 35m</div>
          <div style="width:20%;background:#8b5cf6" title="非選翻譯作文或檢查">寫作/檢查 30m</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border-left:4px solid #3b82f6">
          <strong style="color:#1d4ed8">第一層：粗心排查</strong>
          <div style="color:#475569;margin-top:2px">題目問 NOT / EXCEPT 沒看清？劃記關鍵字，檢查人稱與單複數。</div>
        </div>
        <div style="background:#ecfdf5;padding:10px;border-radius:8px;border-left:4px solid #10b981">
          <strong style="color:#047857">第二層：概念盲點</strong>
          <div style="color:#475569;margin-top:2px">時態混淆還是分詞主動被動？立刻回到本站對應觀念地圖複習。</div>
        </div>
        <div style="background:#fff7ed;padding:10px;border-radius:8px;border-left:4px solid #f97316">
          <strong style="color:#c2410c">第三層：選項排除</strong>
          <div style="color:#475569;margin-top:2px">排除「範疇過寬 (Too Broad)」、「無中生有 (Not Mentioned)」之干擾項。</div>
        </div>
      </div>
    </div>
  \`;
}

// 25. 長難句五步拆解樹與主幹提取圖 (Long Sentence Parsing)
export function renderLongSentenceParsingDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🧅 高中長難句五步「剝洋蔥」解構樹 (Sentence Parsing Tree)</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">主幹抓取法</span>
      </div>
      <div style="background:#fff;border:1px solid #cbd5e1;border-radius:8px;padding:12px;margin-bottom:12px">
        <div style="font-size:12px;color:#64748b;margin-bottom:6px">示範長句分析：</div>
        <div style="font-size:14px;color:#1e293b;line-height:1.6">
          <em>The ancient scrolls <span style="background:#fef3c7;padding:2px 4px;border-radius:4px">[discovered by archaeologists in the desert]</span> <strong style="color:#2563eb">[which had been hidden for centuries]</strong> <strong style="color:#dc2626">reveal</strong> <span style="background:#ecfdf5;padding:2px 4px;border-radius:4px">[fascinating details about daily life]</span>.</em>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1d4ed8">1. 抓骨架 (S + V)</strong>
          <div style="color:#475569;margin-top:2px">主要主詞：<strong>The scrolls</strong><br>主要動詞：<strong>reveal</strong> (揭示)</div>
        </div>
        <div style="background:#fffbeb;padding:10px;border-radius:8px;border:1px solid #fde68a">
          <strong style="color:#b45309">2. 剝分詞修飾語</strong>
          <div style="color:#475569;margin-top:2px"><code>discovered by ...</code> (被考古學家發現的，過去分詞片語修飾 scrolls)</div>
        </div>
        <div style="background:#f5f3ff;padding:10px;border-radius:8px;border:1px solid #ddd6fe">
          <strong style="color:#6d28d9">3. 剝關係子句</strong>
          <div style="color:#475569;margin-top:2px"><code>which had been hidden ...</code> (關係子句補充說明卷軸曾被隱藏)</div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:10px">
        💡 <strong>拆解心得：</strong>長難句再長，拿掉所有修飾括號後，核心只有「The scrolls reveal details」！
      </div>
    </div>
  \`;
}

// 26. 高中核心搭配詞同心圓網絡圖 (Collocation Network)
export function renderCollocationNetworkDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🌐 高中 7000 單 Collocation 搭配詞同心圓網絡圖</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#b45309">拒絕中式英文</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:12px;margin-bottom:12px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px">
          <strong style="color:#1d4ed8;font-size:13px">🔴 MAKE 家族 (製造/產生/決定)</strong>
          <ul style="margin:6px 0 0 16px;padding:0;font-size:12px;color:#334155;line-height:1.7">
            <li><strong>make an effort</strong> (努力，不可用 do effort)</li>
            <li><strong>make a decision</strong> (做決定)</li>
            <li><strong>make a mistake</strong> (犯錯)</li>
            <li><strong>make ends meet</strong> (收支平衡)</li>
          </ul>
        </div>
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:12px">
          <strong style="color:#047857;font-size:13px">🟢 DO 家族 (執行任務/行為)</strong>
          <ul style="margin:6px 0 0 16px;padding:0;font-size:12px;color:#334155;line-height:1.7">
            <li><strong>do someone a favor</strong> (幫某人一個忙)</li>
            <li><strong>do research / business</strong> (做研究/做生意)</li>
            <li><strong>do more harm than good</strong> (弊大於利)</li>
            <li><strong>do one's best</strong> (盡全力)</li>
          </ul>
        </div>
        <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:12px">
          <strong style="color:#c2410c;font-size:13px">🟠 TAKE / PAY 家族 (採取/付出)</strong>
          <ul style="margin:6px 0 0 16px;padding:0;font-size:12px;color:#334155;line-height:1.7">
            <li><strong>take action / measures</strong> (採取行動/措施)</li>
            <li><strong>take advantage of</strong> (利用/善用)</li>
            <li><strong>pay attention to</strong> (注意，不可用 notice to)</li>
            <li><strong>pay a compliment to</strong> (稱讚某人)</li>
          </ul>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b">
        💡 <strong>學測大考警示：</strong>詞彙題選項常考動詞與介系詞的固定搭配 (如 contribute <strong>to</strong>, rely <strong>on</strong>, consist <strong>of</strong>)，背單字務必成串打包！
      </div>
    </div>
  \`;
}

// 27. 中譯英思維轉譯架構圖 (Translation Cognitive Shift)
export function renderTranslationCognitiveDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🔄 中譯英思維轉譯架構圖：擺脫中式直譯陷阱</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">大考翻譯滿分術</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center;font-size:13px;margin-bottom:12px">
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:12px;border-radius:8px">
          <strong style="color:#991b1b">❌ 中文流水句思維</strong>
          <div style="color:#475569;margin-top:4px">
            「路上有很多車子很塞車大家都遲到。」<br>
            <em>直譯常見病：常丟失主詞、動詞連環疊加無連詞、出現 "There have many cars..."</em>
          </div>
        </div>
        <div style="font-size:24px;color:#2563eb;font-weight:bold">➔</div>
        <div style="background:#f0fdf4;border:1px solid #86efac;padding:12px;border-radius:8px">
          <strong style="color:#166534">✅ 英語嚴謹結構思維</strong>
          <div style="color:#475569;margin-top:4px">
            <strong>主從分明、動詞單一：</strong><br>
            <em>Due to heavy traffic on the road, most commuters arrived late.</em><br>
            (介系詞片語交代原因 + 主詞 commuters + 動詞 arrived)
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:8px;font-size:12px">
        <div style="background:#f8fafc;padding:8px;border-radius:6px;border:1px solid #e2e8f0">
          <strong>1. 找合法主詞：</strong>不可用 There have；可用 There is/are 或抽象名詞
        </div>
        <div style="background:#f8fafc;padding:8px;border-radius:6px;border:1px solid #e2e8f0">
          <strong>2. 修飾語後置：</strong>中文「穿雨衣的男孩」➔ 英文「the boy in a raincoat」
        </div>
        <div style="background:#f8fafc;padding:8px;border-radius:6px;border:1px solid #e2e8f0">
          <strong>3. 核對時態一致：</strong>通篇為過去事件則動詞統一用過去式
        </div>
      </div>
    </div>
  \`;
}

// 28. 技高專業英文讀寫與工程實務圖 (Vocational ESP Technical)
export function renderVocationalESPTechnicalDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">📋 技高專業英文 (ESP) 文獻架構與跨國工程實務圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">統測專二 &amp; 職場實戰</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;margin-bottom:12px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1d4ed8;font-size:13px">1. 技術文獻摘要 (Executive Summary)</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>Objective:</strong> 研發或檢修目的<br>
            • <strong>Methodology:</strong> 實驗或裝配步驟<br>
            • <strong>Key Findings:</strong> 公差數據與良率提升
          </div>
        </div>
        <div style="background:#f0fdf4;padding:10px;border-radius:8px;border:1px solid #a7f3d0">
          <strong style="color:#047857;font-size:13px">2. 工程變更通知 (ECN / RFC)</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>Root Cause:</strong> 零件熱膨脹失真<br>
            • <strong>Corrective Action:</strong> 更換耐熱合金<br>
            • <strong>Verification:</strong> 500 小時連續運轉測試
          </div>
        </div>
        <div style="background:#fffbeb;padding:10px;border-radius:8px;border:1px solid #fde68a">
          <strong style="color:#b45309;font-size:13px">3. 驗收標準 (Acceptance Criteria)</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>Tolerance:</strong> ± 0.02 mm 以內允收<br>
            • <strong>Compliance:</strong> 符合 ISO 9001 / CE 規範<br>
            • <strong>Sign-off:</strong> 首席工程師簽署交付
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569">
        ⚠️ <strong>ESP 語言風格：</strong>講求客觀精準、多用被動語態 (The test was conducted...) 與標準工程術語，避免口語模糊詞彙。
      </div>
    </div>
  \`;
}

// 29. 全民英檢 GEPT 全級別進階階梯圖 (GEPT Ladder)
export function renderGEPTMultiLevelLadderDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🏅 全民英檢 GEPT 全級別進階階梯與四技能雷達圖</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">初試聽讀 ➔ 複試說寫</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px;text-align:center;font-size:12px;margin-bottom:12px">
        <div style="background:#f1f5f9;border:1px solid #cbd5e1;padding:10px;border-radius:8px">
          <strong style="color:#334155;font-size:13px">初級 (Elementary)</strong>
          <div style="color:#64748b;margin-top:2px">CEFR A2 ｜ 國中畢業</div>
          <div style="font-size:11px;color:#475569;margin-top:4px">日常基礎生活會話與簡易讀寫</div>
        </div>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:10px;border-radius:8px">
          <strong style="color:#1d4ed8;font-size:13px">中級 (Intermediate)</strong>
          <div style="color:#1e40af;margin-top:2px">CEFR B1 ｜ 高中畢業</div>
          <div style="font-size:11px;color:#475569;margin-top:4px">旅遊工作溝通、短文摘要與口語討論</div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #86efac;padding:10px;border-radius:8px">
          <strong style="color:#15803d;font-size:13px">中高級 (High-Inter)</strong>
          <div style="color:#166534;margin-top:2px">CEFR B2 ｜ 大學畢業</div>
          <div style="font-size:11px;color:#475569;margin-top:4px">職場商務協商、學術長文與論說作文</div>
        </div>
        <div style="background:#faf5ff;border:1px solid #d8b4fe;padding:10px;border-radius:8px">
          <strong style="color:#7e22ce;font-size:13px">高級 (Advanced)</strong>
          <div style="color:#6b21a8;margin-top:2px">CEFR C1 ｜ 專業國際精英</div>
          <div style="font-size:11px;color:#475569;margin-top:4px">專業領域深度辯論與學術專題寫作</div>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b">
        💡 <strong>通關策略：</strong>初試聽讀通過後有 2 年保留期可報考複試；複試口說切勿沉默停頓，回答時掌握「主張 + 理由 + 實例」三段骨架！
      </div>
    </div>
  \`;
}

// 30. TOEFL iBT 120 滿分四技能整合圖 (TOEFL Blueprint)
export function renderTOEFLIntegratedSkillsDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🗽 TOEFL iBT 120 滿分四技能整合型題型攻略藍圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">學術留學旗艦</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:10px;margin-bottom:12px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1d4ed8;font-size:13px">📖 Reading (35分鐘 20題)</strong>
          <div style="color:#475569;margin-top:4px">
            • 2 篇學術長文 (700字/篇)<br>
            • 核心題型：事實資訊、詞彙推斷、句子插入、篇章總結 (6選3)<br>
            • 配速：1.7 分鐘/題
          </div>
        </div>
        <div style="background:#f0fdf4;padding:10px;border-radius:8px;border:1px solid #86efac">
          <strong style="color:#15803d;font-size:13px">🎧 Listening (36分鐘 28題)</strong>
          <div style="color:#475569;margin-top:4px">
            • 3 篇學術課堂講座 + 2 篇校園對話<br>
            • 記筆記心法：抓轉折詞 (However, Now)、對比、學生提問<br>
            • 題目不可回看修改！
          </div>
        </div>
        <div style="background:#fffbeb;padding:10px;border-radius:8px;border:1px solid #fde68a">
          <strong style="color:#b45309;font-size:13px">🗣️ Speaking (16分鐘 4題)</strong>
          <div style="color:#475569;margin-top:4px">
            • Task 1 獨立題 (15秒準備/45秒作答)<br>
            • Task 2-4 整合題 (讀-聽-說)：提煉教授反駁或補充閱讀的論據<br>
            • 流暢重於複雜詞彙！
          </div>
        </div>
        <div style="background:#fdf2f8;padding:10px;border-radius:8px;border:1px solid #fbcfe8">
          <strong style="color:#9d174d;font-size:13px">✍️ Writing (29分鐘 2題)</strong>
          <div style="color:#475569;margin-top:4px">
            • Task 1 綜合寫作 (20分)：教授觀點 vs 閱讀觀點一對一反駁<br>
            • Task 2 學術討論寫作 (10分)：在在線課堂發表 100+ 字獨立見解
          </div>
        </div>
      </div>
    </div>
  \`;
}

// 31. 時間時鐘指針與作息圖 (Daily Routines & Telling Time)
export function renderDailyRoutinesTimeClockDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">⏰ 英文時間時鐘指針讀法 (Past vs. To) 與作息時間軸</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">國小基礎 Pre-A1~A1</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;font-size:12px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px;text-align:center">
          <strong style="color:#1d4ed8;font-size:14px">👉 右半圈：PAST (幾點過幾分)</strong>
          <div style="color:#334155;margin-top:6px">
            • <code>7:05</code> ➔ five past seven<br>
            • <code>7:15</code> ➔ <strong>a quarter past seven</strong><br>
            • <code>7:30</code> ➔ <strong>half past seven</strong>
          </div>
        </div>
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:12px;border-radius:8px;text-align:center">
          <strong style="color:#991b1b;font-size:14px">👈 左半圈：TO (差幾分到幾點)</strong>
          <div style="color:#334155;margin-top:6px">
            • <code>7:45</code> ➔ <strong>a quarter to eight</strong> (差一刻8點)<br>
            • <code>7:50</code> ➔ ten to eight (差10分8點)<br>
            • <code>8:00</code> ➔ <strong>eight o'clock</strong>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:12px;color:#334155;background:#f8fafc;padding:10px;border-radius:8px">
        <span style="background:#e0e7ff;color:#3730a3;padding:4px 8px;border-radius:4px;font-weight:700">7:00 AM at seven</span> wake up ➔
        <span style="background:#e0e7ff;color:#3730a3;padding:4px 8px;border-radius:4px;font-weight:700">in the morning</span> eat breakfast ➔
        <span style="background:#e0e7ff;color:#3730a3;padding:4px 8px;border-radius:4px;font-weight:700">at noon</span> have lunch ➔
        <span style="background:#e0e7ff;color:#3730a3;padding:4px 8px;border-radius:4px;font-weight:700">at night</span> go to sleep
      </div>
    </div>
  \`;
}

// 32. 健康飲食與症狀關懷圖 (Food, Health & Symptoms)
export function renderFoodHealthPyramidDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🍎 健康飲食金字塔與身體症狀表達圖解</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">生活對話 Healthy Living</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px;font-size:12px">
          <strong style="color:#166534;font-size:13px">🥗 健康飲食 (Healthy Food)</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <strong>Vegetables &amp; Fruits:</strong> carrots, apples, spinach<br>
            • <strong>Whole Grains:</strong> brown rice, oats, bread<br>
            • <strong>Proteins:</strong> fish, chicken, eggs, beans
          </div>
        </div>
        <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px;font-size:12px">
          <strong style="color:#9f1239;font-size:13px">🩺 身體不適症狀 (Symptoms)</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <code>I have a headache / stomachache.</code> (部位+ache)<br>
            • <code>I have a sore throat / a fever.</code> (喉嚨痛/發燒)<br>
            • <code>You should see a doctor and drink water.</code>
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b">
        💡 <strong>文法提醒：</strong>headache, toothache, stomachache 前面通常加不定冠詞 <code>a</code>；建議使用情態助動詞 <code>should</code> 提出關心。
      </div>
    </div>
  \`;
}

// 33. 世界節慶日曆與文化特色圖 (Festivals Calendar)
export function renderFestivalsCulturalCalendarDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🎉 世界重要節慶日曆與文化特色全景圖</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">多元文化素養</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));gap:8px;font-size:12px">
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:10px;border-radius:8px">
          <strong style="color:#991b1b">🧨 農曆新年 (Jan/Feb)</strong>
          <div style="color:#475569;margin-top:4px">Lunar New Year · red envelopes, family reunion, dumplings</div>
        </div>
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:10px;border-radius:8px">
          <strong style="color:#065f46">🐰 復活節 (Mar/Apr)</strong>
          <div style="color:#475569;margin-top:4px">Easter · painted eggs, Easter bunny, rebirth of spring</div>
        </div>
        <div style="background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px">
          <strong style="color:#92400e">🎃 萬聖節 (Oct 31)</strong>
          <div style="color:#475569;margin-top:4px">Halloween · trick or treat, jack-o'-lanterns, costumes</div>
        </div>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:10px;border-radius:8px">
          <strong style="color:#1e40af">🎄 聖誕節 (Dec 25)</strong>
          <div style="color:#475569;margin-top:4px">Christmas · Christmas tree, exchange gifts, feast</div>
        </div>
      </div>
    </div>
  \`;
}

// 34. 頻率副詞百分比與 There is/are 圖 (Frequency Spectrum & Existence)
export function renderFrequencySpectrumExistenceDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">📊 頻率副詞百分比刻度尺與 There is / are 存在句結構</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">七年級核心語法</span>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:12px">
        <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:8px">頻率副詞發生機率刻度尺：</div>
        <div style="display:grid;grid-template-columns:repeat(6, 1fr);gap:4px;text-align:center;font-size:11px">
          <div style="background:#15803d;color:#fff;padding:6px 2px;border-radius:4px"><strong>always</strong><br>100%</div>
          <div style="background:#16a34a;color:#fff;padding:6px 2px;border-radius:4px"><strong>usually</strong><br>80%</div>
          <div style="background:#65a30d;color:#fff;padding:6px 2px;border-radius:4px"><strong>often</strong><br>60%</div>
          <div style="background:#eab308;color:#fff;padding:6px 2px;border-radius:4px"><strong>sometimes</strong><br>40%</div>
          <div style="background:#f97316;color:#fff;padding:6px 2px;border-radius:4px"><strong>seldom</strong><br>20%</div>
          <div style="background:#dc2626;color:#fff;padding:6px 2px;border-radius:4px"><strong>never</strong><br>0%</div>
        </div>
        <div style="font-size:11px;color:#64748b;margin-top:8px">
          💡 <strong>位置口訣：</strong>「be 動詞後、一般動詞前」➔ <em>She <strong>is always</strong> happy.</em> ｜ <em>He <strong>often plays</strong> tennis.</em>
        </div>
      </div>
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px;font-size:12px">
        <strong style="color:#1d4ed8">【There is / There are 存在句】：表示「某處有某物」</strong>
        <div style="color:#334155;margin-top:4px">
          • <strong>There is + 單數可數名詞 / 不可數名詞：</strong><em>There is an apple on the table. There is water in the cup.</em><br>
          • <strong>There are + 複數名詞：</strong><em>There are three birds in the tree.</em><br>
          ⚠️ 避坑：不可與 have / has 混淆！嚴禁寫出 <em>"There have a book"</em> 的錯誤句型！
        </div>
      </div>
    </div>
  \`;
}

// 35. 過去進行式與 When/While 時間交錯軸 (Past Continuous Timeline)
export function renderPastContinuousTimelineDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">⏳ 過去進行式 (was/were V-ing) 與 When / While 時間交錯軸</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">八年級時態交織</span>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:12px;border-radius:8px;margin-bottom:12px">
        <div style="font-size:13px;color:#1e293b;line-height:1.6">
          <em>I <strong>was taking a shower</strong> <span style="background:#fee2e2;color:#991b1b;padding:2px 6px;border-radius:4px;font-weight:700">when</span> the phone <strong>rang</strong>.</em><br>
          <em><span style="background:#dcfce7;color:#166534;padding:2px 6px;border-radius:4px;font-weight:700">While</span> Mom <strong>was cooking</strong>, Dad <strong>was reading</strong>.</em>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1d4ed8">1. 短動作插進長背景 (When)</strong>
          <div style="color:#475569;margin-top:4px">
            背景延續動作（正在洗澡）用 <strong>was V-ing</strong>；突然發生的中斷動作（電話響起）用 <strong>過去簡單式 (rang)</strong>，由 <strong>when</strong> 引導！
          </div>
        </div>
        <div style="background:#f0fdf4;padding:10px;border-radius:8px;border:1px solid #86efac">
          <strong style="color:#166534">2. 兩個動作同時進行 (While)</strong>
          <div style="color:#475569;margin-top:4px">
            過去某一時間段內，兩件事平行同時持續發生，兩個子句皆使用 <strong>過去進行式</strong>，由 <strong>while</strong> 引導！
          </div>
        </div>
      </div>
    </div>
  \`;
}

// 36. 附加問句反轉天平與間接問句直述語序圖 (Tag Questions & Indirect Questions)
export function renderTagAndIndirectQuestionsDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">⚖️ 附加問句反轉天平與間接問句「直述語序」變身圖</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">會考九年級必考</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;margin-bottom:12px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px;font-size:12px">
          <strong style="color:#1d4ed8;font-size:13px">【附加問句天平】：前肯後否，前否後肯</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <em>She is kind, <strong>isn't she?</strong></em> (前面肯定 ➔ 後面否定)<br>
            • <em>They don't like coffee, <strong>do they?</strong></em> (前面否定 ➔ 後面肯定)<br>
            ⚠️ 助動詞時態與人稱代名詞必須與主句完全對齊！
          </div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #86efac;padding:12px;border-radius:8px;font-size:12px">
          <strong style="color:#166534;font-size:13px">【間接問句三大變身】：疑問語序 ➔ 直述語序</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • 直接：<em>Where does he live?</em><br>
            • 間接：<em>Do you know <strong>where he lives</strong>?</em><br>
            ✨ does 消失，主動詞 live 恢復第三人稱單數加 s，改為「主詞 + 動詞」直述語序！
          </div>
        </div>
      </div>
    </div>
  \`;
}

// 37. 分裂句強調聚光燈圖 (Cleft Sentences Spotlight)
export function renderCleftSentenceSpotlightDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🔦 It is ... that 分裂句強光聚光燈強調結構</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">學測進階修辭</span>
      </div>
      <div style="background:#f8fafc;border:2px dashed #6366f1;padding:12px;border-radius:8px;margin-bottom:12px;font-size:13px">
        <div style="color:#4338ca;font-weight:700">【分裂句聚光燈黃金公式】：It is / was + [被強調焦點] + that + [其餘句子]</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1d4ed8">強調主詞</strong><br>
          <em>It was <strong>Tom</strong> that/who found the lost wallet yesterday.</em> (正是湯姆拾金不昧！)
        </div>
        <div style="background:#f0fdf4;padding:10px;border-radius:8px;border:1px solid #86efac">
          <strong style="color:#15803d">強調時間副詞片語</strong><br>
          <em>It was <strong>at midnight</strong> that the thunder woke me up.</em> (正是在半夜打雷聲驚醒了我！)
        </div>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:10px">
        💡 <strong>驗證秘笈：</strong>把 <code>It was ... that</code> 刪除，若剩下的文字能拼成完整句子，即為「分裂句」！
      </div>
    </div>
  \`;
}

// 38. 可數與不可數名詞天平圖 (Countability Balance)
export function renderCountabilityBalanceDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">⚖️ 可數名詞 (Countable) vs. 不可數名詞 (Uncountable) 視覺天平</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">量詞不是逐字翻譯</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;font-size:12px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px">
          <strong style="color:#1d4ed8;font-size:13px">📦 可數名詞 (有明確個體形狀)</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <strong>專屬量詞：</strong>many, a few (少數有一些), few (幾乎沒有)<br>
            • <strong>形態：</strong>a book ➔ two books (可加 a 或 -s)<br>
            • 例：<em>I have many books.</em>
          </div>
        </div>
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:12px;border-radius:8px">
          <strong style="color:#991b1b;font-size:13px">💧 不可數名詞 (液體/氣體/抽象觀念)</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <strong>專屬量詞：</strong>much, a little, little, less<br>
            • <strong>形態：</strong>不可加 a，永不加 -s！當單數看<br>
            • <strong>容器量詞：</strong>a cup of tea, two pieces of advice
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#991b1b;background:#fff1f2;padding:8px 12px;border-radius:6px">
        ⚠️ <strong>常見不可數大坑：</strong>information, advice, furniture, news, homework, luggage 在英文中均為不可數名詞！
      </div>
    </div>
  \`;
}

// 39. 人稱代名詞與 be 動詞積木圖 (Be-Verb Building Blocks)
export function renderBeVerbBuildingBlocksDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🧱 人稱代名詞與 be 動詞黃金連線積木圖</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">零基礎第一個完整句子</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;margin-bottom:12px;font-size:13px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px">
          <div style="font-size:11px;color:#1e40af;font-weight:700">第一人稱單數專屬</div>
          <strong style="font-size:16px;color:#1d4ed8">I ➔ am</strong>
          <div style="font-size:12px;color:#475569;margin-top:4px"><em>I am a student. (I'm)</em></div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #86efac;padding:12px;border-radius:8px">
          <div style="font-size:11px;color:#166534;font-weight:700">第三人稱單數專屬</div>
          <strong style="font-size:16px;color:#15803d">He / She / It ➔ is</strong>
          <div style="font-size:12px;color:#475569;margin-top:4px"><em>She is happy. (She's)</em></div>
        </div>
        <div style="background:#fef3c7;border:1px solid #fde68a;padding:12px;border-radius:8px">
          <div style="font-size:11px;color:#92400e;font-weight:700">第二人稱與所有複數</div>
          <strong style="font-size:16px;color:#b45309">You / We / They ➔ are</strong>
          <div style="font-size:12px;color:#475569;margin-top:4px"><em>They are ready. (They're)</em></div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569">
        💡 <strong>句型結構：</strong>主詞 + be 動詞 + [補語：身分名詞 / 狀態形容詞 / 地點介系詞片語] ＝ 完整有意義的一句話！
      </div>
    </div>
  \`;
}

// 40. 第三人稱單數動詞與 Do/Does 照妖鏡圖 (Present Simple Do/Does)
export function renderPresentQuestionsDoDoesDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🔍 第三人稱單數現在簡單式與 Do / Does 照妖鏡圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">動詞還原律</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;font-size:12px">
        <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:12px;border-radius:8px">
          <strong style="color:#0f172a;font-size:13px">【肯定句】：動詞親自加上 -s / -es</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <em>He <strong>plays</strong> the guitar.</em><br>
            • <em>She <strong>watches</strong> movies.</em><br>
            • <em>My cat <strong>sleeps</strong> all day.</em>
          </div>
        </div>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:12px;border-radius:8px">
          <strong style="color:#1d4ed8;font-size:13px">【否定與疑問句】：does 搶走 -s，動詞還原！</strong>
          <div style="color:#334155;margin-top:6px;line-height:1.6">
            • <em>He <strong>does not play</strong> the guitar.</em> (play 原形！)<br>
            • <em><strong>Does</strong> she <strong>watch</strong> movies?</em> (watch 原形！)<br>
            • <em>Yes, she does. / No, she doesn't.</em>
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#991b1b;background:#fef2f2;padding:8px 12px;border-radius:6px">
        ⚠️ <strong>考場致命失誤：</strong>千萬不要寫出 <em>Does she watches?</em> 或 <em>He doesn't plays</em>！助動詞 does 出現，動詞必須立刻打回原形！
      </div>
    </div>
  \`;
}

// 41. 大學 EMI 全英語授課與學術簡報圖 (EMI Academic Presentation)
export function renderEMIAcademicPresentationDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🎓 大學 EMI 全英語授課課堂筆記與學術簡報五階段架構圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">EMI &amp; Academic Presentation</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;text-align:center;font-size:12px;margin-bottom:12px">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:10px;border-radius:8px">
          <strong style="color:#1d4ed8">1. Hook &amp; Intro</strong>
          <div style="color:#64748b;margin-top:2px">引起興趣與定義問題</div>
        </div>
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:10px;border-radius:8px">
          <strong style="color:#047857">2. Roadmap</strong>
          <div style="color:#64748b;margin-top:2px">綱要導航與研究方法</div>
        </div>
        <div style="background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px">
          <strong style="color:#b45309">3. Key Evidence</strong>
          <div style="color:#64748b;margin-top:2px">數據圖表與主要發現</div>
        </div>
        <div style="background:#fdf2f8;border:1px solid #fbcfe8;padding:10px;border-radius:8px">
          <strong style="color:#9d174d">4. Limitations</strong>
          <div style="color:#64748b;margin-top:2px">學術嚴謹批判與限制</div>
        </div>
        <div style="background:#f3e8ff;border:1px solid #ddd6fe;padding:10px;border-radius:8px">
          <strong style="color:#6d28d9">5. Q&amp;A</strong>
          <div style="color:#64748b;margin-top:2px">總結與流暢問答回應</div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569">
        💡 <strong>康乃爾筆記法 (Cornell Notes)：</strong>左側欄記關鍵詞 (Cues/Keywords)、右側大區記課堂核心論述 (Notes)、底部留 2 行寫一分鐘精華摘要 (Summary)！
      </div>
    </div>
  \`;
}

// 42. 終生英語學習飛輪圖 (Lifelong Learning Flywheel)
export function renderLifelongLearningFlywheelDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🚀 終生自主英語力成長飛輪與輸入輸出閉環模型</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">自主驅動成長</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:10px;font-size:12px">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1d4ed8">1. 可理解輸入 (i+1)</strong>
          <div style="color:#475569;margin-top:2px">接觸稍高於現有水平的真實語料 (Podcasts, BBC, 學術論文)，沉浸語境而非孤立背詞。</div>
        </div>
        <div style="background:#f0fdf4;padding:10px;border-radius:8px;border:1px solid #86efac">
          <strong style="color:#15803d">2. 間隔提取記憶 (SRS)</strong>
          <div style="color:#475569;margin-top:2px">使用閃卡與無提示主動回想，在遺忘臨界點再次提取，鞏固大腦長期記憶突觸。</div>
        </div>
        <div style="background:#fffbeb;padding:10px;border-radius:8px;border:1px solid #fde68a">
          <strong style="color:#b45309">3. 實戰輸出 (Output)</strong>
          <div style="color:#475569;margin-top:2px">寫英文日誌、做簡報、國際工作協作，以輸出倒逼輸入，將被動詞彙轉為主動能力。</div>
        </div>
        <div style="background:#faf5ff;padding:10px;border-radius:8px;border:1px solid #d8b4fe">
          <strong style="color:#7e22ce">4. 反饋反思 (Feedback Loop)</strong>
          <div style="color:#475569;margin-top:2px">透過題庫檢測與同儕回饋找出盲點，動態調整學習策略，達成終生學習飛輪自驅動！</div>
        </div>
      </div>
    </div>
  \`;
}

// 43. 構詞學三段式解構圖 (Word Formation Morphology)
export function renderWordFormationMorphologyDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🧩 英語構詞學三段式解構：字首 ＋ 字根 ＋ 字尾 衍生模型</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">Word Building</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px;justify-content:center;margin:12px 0">
        <div style="background:#eff6ff;border:2px solid #3b82f6;padding:10px 14px;border-radius:8px;text-align:center">
          <div style="font-size:11px;color:#1e40af;font-weight:700">字首 (Prefix)</div>
          <strong style="color:#1d4ed8;font-size:15px">un- / re- / pre-</strong>
          <div style="font-size:10px;color:#64748b">改變方向與語意</div>
        </div>
        <span style="font-size:20px;color:#64748b;font-weight:bold">+</span>
        <div style="background:#f0fdf4;border:2px solid #10b981;padding:10px 14px;border-radius:8px;text-align:center">
          <div style="font-size:11px;color:#166534;font-weight:700">字根/基底詞 (Root/Base)</div>
          <strong style="color:#15803d;font-size:15px">happy / write / view</strong>
          <div style="font-size:10px;color:#64748b">承載核心基本意義</div>
        </div>
        <span style="font-size:20px;color:#64748b;font-weight:bold">+</span>
        <div style="background:#fffbeb;border:2px solid #f59e0b;padding:10px 14px;border-radius:8px;text-align:center">
          <div style="font-size:11px;color:#92400e;font-weight:700">字尾 (Suffix)</div>
          <strong style="color:#b45309;font-size:15px">-ness / -er / -able</strong>
          <div style="font-size:10px;color:#64748b">決定詞性與文法功能</div>
        </div>
        <span style="font-size:20px;color:#64748b;font-weight:bold">➔</span>
        <div style="background:#fdf2f8;border:2px solid #ec4899;padding:10px 14px;border-radius:8px;text-align:center">
          <div style="font-size:11px;color:#9d174d;font-weight:700">全新衍生單字</div>
          <strong style="color:#be185d;font-size:15px">happiness / preview</strong>
          <div style="font-size:10px;color:#64748b">一通百通單字量倍增</div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569">
        ⚠️ <strong>拼寫避雷：</strong>字尾接 -ness 時子音 y 改為 i (happy ➔ happiness)；看到相同字母開頭（如 uncle）不代表為否定字首 un-！
      </div>
    </div>
  \`;
}

// 44. 人稱代名詞五格轉換全景矩陣 (Pronouns Matrix)
export function renderPronounsMatrixDiagram() {
  return \`
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">👤 人稱代名詞格位轉換全景矩陣 (Pronouns Matrix)</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">主格 ➔ 受格 ➔ 所有格</span>
      </div>
      <div class="lesson-table" tabindex="0" role="region" aria-label="人稱代名詞五格對照表">
        <table style="width:100%;font-size:12px;border-collapse:collapse">
          <thead>
            <tr style="background:#f1f5f9">
              <th style="padding:8px;border:1px solid #cbd5e1">人稱</th>
              <th style="padding:8px;border:1px solid #cbd5e1">主格 (當主詞)</th>
              <th style="padding:8px;border:1px solid #cbd5e1">受格 (當受詞)</th>
              <th style="padding:8px;border:1px solid #cbd5e1">所有格形容詞 (+名詞)</th>
              <th style="padding:8px;border:1px solid #cbd5e1">所有格代名詞 (獨立)</th>
              <th style="padding:8px;border:1px solid #cbd5e1">反身代名詞</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">我</td><td><strong>I</strong></td><td>me</td><td>my (car)</td><td>mine</td><td>myself</td></tr>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">你/你們</td><td><strong>You</strong></td><td>you</td><td>your</td><td>yours</td><td>yourself / -selves</td></tr>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">他</td><td><strong>He</strong></td><td>him</td><td>his</td><td>his</td><td>himself</td></tr>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">她</td><td><strong>She</strong></td><td>her</td><td>her</td><td>hers</td><td>herself</td></tr>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">它</td><td><strong>It</strong></td><td>it</td><td>its (無撇號!)</td><td>—</td><td>itself</td></tr>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">我們</td><td><strong>We</strong></td><td>us</td><td>our</td><td>ours</td><td>ourselves</td></tr>
            <tr><td style="padding:6px;border:1px solid #cbd5e1">他們</td><td><strong>They</strong></td><td>them</td><td>their</td><td>theirs</td><td>themselves</td></tr>
          </tbody>
        </table>
      </div>
      <div style="font-size:11px;color:#991b1b;margin-top:8px">
        ⚠️ <strong>大考超高頻陷阱：</strong><code>its</code> (代名詞所有格，它的) vs <code>it's</code> (= it is / it has 的縮寫)，千萬不可寫錯！
      </div>
    </div>
  \`;
}
`;

const updatedRouter = `// 智能匹配主題最佳視覺圖表
export function renderTopicVisualChart(title = '') {
  const t = String(title ?? '');
  if (/toeic\\b|多益|商務測驗/i.test(t)) return renderTOEICQuestionTypeStrategyMap();
  if (/sat\\b|digital sat|學術英語/i.test(t)) return renderSATConstructBlueprint();
  if (/gre\\b|gre general|語意與論證/i.test(t)) return renderGRESemanticPolarityChart();
  if (/gmat\\b|gmat focus|批判推理/i.test(t)) return renderGMATCriticalReasoningTree();
  if (/toefl|托福/i.test(t)) return renderTOEFLIntegratedSkillsDiagram();
  if (/gept|全民英檢/i.test(t)) return renderGEPTMultiLevelLadderDiagram();
  if (/被動|passive/i.test(t)) return renderPassiveVoiceDiagram();
  if (/五大句型|句子骨架|sentence pattern|基本句型|動詞分類/i.test(t)) return renderFiveSentencePatternsDiagram();
  if (/長難句|句法.*拆解|complex sentence/i.test(t)) return renderLongSentenceParsingDiagram();
  if (/中譯英|翻譯|句子產出/i.test(t)) return renderTranslationCognitiveDiagram();
  if (/整卷衝刺|大考衝刺|學測.*統測|會考.*整合|訂正策略|會考.*a\\+\\+|cap a\\+\\+|頂標衝刺|素養總結|終極模擬|culminating|diagnostic trial|全真突破/i.test(t)) return renderExamStrategyDiagnosisDiagram();
  if (/核心詞彙|搭配詞|collocation|字彙網絡/i.test(t)) return renderCollocationNetworkDiagram();
  if (/篇章結構|四空五選|文意選填|discourse|cohesion/i.test(t)) return renderDiscourseTransitionsMap();
  if (/疑問句|情態|助動詞|問句|生活溝通/i.test(t)) return renderQuestionModalsBlueprint();
  if (/連接詞|複句|conjunction|副詞子句|因果轉折/i.test(t)) return renderConjunctionsComplexSentencesDiagram();
  if (/聽力|語音|連音|弱讀|listening|connected speech/i.test(t)) return renderListeningConnectedSpeechDiagram();
  if (/工場|安全|指令|safety|ppe/i.test(t)) return renderWorkshopSafetyPPEDiagram();
  if (/尺寸|工具|規格|材料|公差|tolerance|dimension/i.test(t)) return renderEngineeringToleranceSpecsDiagram();
  if (/流程|故障|troubleshoot/i.test(t)) return renderTroubleshootingFlowchartDiagram();
  if (/商務|email|郵件/i.test(t)) return renderBusinessEmailFlowDiagram();
  if (/專業科目|跨國技術|現場實務|tve vocational|esp domain/i.test(t)) return renderVocationalESPTechnicalDiagram();
  if (/條件|假設|unless|conditional|subjunctive/i.test(t)) return renderConditionalDecisionTree();
  if (/關係|代名詞.*受格|relative|形容詞子句|先行詞/i.test(t)) return renderRelativeClauseDiagram();
  if (/介系詞|問路|方位|directions|preposition/i.test(t)) return renderPrepositionsPyramid();
  if (/倒裝|inversion/i.test(t)) return renderInversionStructureDiagram();
  if (/分裂句|焦點強調|cleft/i.test(t)) return renderCleftSentenceSpotlightDiagram();
  if (/分詞|participle/i.test(t)) return renderParticipleClauseFlowchart();
  if (/動名詞|不定詞|gerund|infinitive/i.test(t)) return renderGerundInfinitiveMatrixDiagram();
  if (/比較|最高級|comparison|comparative/i.test(t)) return renderComparativesScaleDiagram();
  if (/日常生活作息|時間表達|daily routine|telling time|動態時間/i.test(t)) return renderDailyRoutinesTimeClockDiagram();
  if (/健康飲食|身體部位|醫療照護|food.*health/i.test(t)) return renderFoodHealthPyramidDiagram();
  if (/世界節慶|多元文化|festivals.*culture/i.test(t)) return renderFestivalsCulturalCalendarDiagram();
  if (/頻率副詞|there is|存在句|frequency/i.test(t)) return renderFrequencySpectrumExistenceDiagram();
  if (/過去進行|when.*while|過去式.*故事|過去式.*未來/i.test(t)) return renderPastContinuousTimelineDiagram();
  if (/附加問句|名詞子句|間接問句|tag question/i.test(t)) return renderTagAndIndirectQuestionsDiagram();
  if (/可數|不可數|量詞|countab|quantifier|名詞、冠詞與數量/i.test(t)) return renderCountabilityBalanceDiagram();
  if (/第一個完整句子|be 動詞.*句子|be-sentences|人稱代名詞/i.test(t)) return renderBeVerbBuildingBlocksDiagram();
  if (/日常動作.*第三人稱|三單|do \\/ does|be 動詞、一般動詞/i.test(t)) return renderPresentQuestionsDoDoesDiagram();
  if (/大學.*emi|全英語授課|口頭簡報|academic.*presentation|科技英語|ai 論文|綠色能源/i.test(t)) return renderEMIAcademicPresentationDiagram();
  if (/終生.*學習|英語力全景|自主學習|lifelong/i.test(t)) return renderLifelongLearningFlywheelDiagram();
  if (/字首字尾|構詞|word building|affix|morphology/i.test(t)) return renderWordFormationMorphologyDiagram();
  if (/發音|音標|拼讀|phonics|vowel/i.test(t)) return renderPhonicsVowelSpectrumDiagram();
  if (/代名詞|所有格|pronoun/i.test(t)) return renderPronounsMatrixDiagram();
  if (/(?:時態|完成式|完成時|進行式|簡單式|未來|\\btenses?\\b|\\bpast tense|\\bfuture\\b)/i.test(t) && !/food|health/i.test(t)) return renderTenseTimelineChart();
  if (/圖表|chart|multimodal/i.test(t)) return renderMultimodalDataChart();
  if (/論證|批判|假設|argument|critical/i.test(t)) return renderCriticalReasoningLogicDiagram();
  if (/作文|寫作|writing/i.test(t)) return renderBusinessEmailFlowDiagram();
  if (/篇章|段落|閱讀|reading/i.test(t)) return renderDiscourseTransitionsMap();
  return '';
}`;

// Insert new diagrams before export function renderTopicVisualChart
const targetChartMatch = '// 智能匹配主題最佳視覺圖表';
const endOfTargetChart = 'export function getSmartVisualDiagram';

const idxStart = visualsContent.indexOf(targetChartMatch);
const idxEnd = visualsContent.indexOf(endOfTargetChart);

if (idxStart === -1 || idxEnd === -1) {
  throw new Error('Could not find renderTopicVisualChart boundaries in lesson_visuals.mjs');
}

const before = visualsContent.slice(0, idxStart);
const after = visualsContent.slice(idxEnd);

visualsContent = before + newVisualFunctions + '\n' + updatedRouter + '\n\n' + after;
fs.writeFileSync(visualsPath, visualsContent, 'utf8');
console.log('✓ Updated dist/lesson_visuals.mjs');

// =========================================================================
// 2. UPDATE dist/teaching_aids.mjs
// =========================================================================
let aidsPath = path.join(ROOT, 'dist', 'teaching_aids.mjs');

const newAidsContent = `import { renderTopicVisualChart } from './lesson_visuals.mjs';

const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const profiles=[
 [/被動|passive/i,'動作如何換主角？','🔄',['執行者：The chef','動作：cooks','接受者：the meal'],[['主動','The chef cooks the meal.','主詞執行動作'],['被動','The meal is cooked by the chef.','主詞接受動作；be + 過去分詞'],['必要要求','The meal must be cooked.','情態動詞 + be + 過去分詞']]],
 [/完成式|完成時|perfect/i,'過去事件與現在的連結','⏳',['過去起點：2022','持續：has lived','現在：仍住這裡'],[['已結束的過去','She lived here in 2022.','已結束時間搭過去式'],['延續至今','She has lived here since 2022.','since + 起點'],['時間長度','She has lived here for four years.','for + 長度；是否持續仍看時態']]],
 [/關係|代名詞.*受格|relative|形容詞子句|先行詞/i,'關係子句的缺口','🔗',['先行詞：the book','子句：I bought ___','合併：the book that I bought'],[['缺主詞','The girl who won is Amy.','who 不可省略'],['缺受詞','The book (that) I bought is new.','限定子句中可省略受詞關係代名詞'],['補充說明','My bike, which is red, is outside.','有逗號；不能用 that']]],
 [/條件|假設|unless|conditional|subjunctive/i,'先看條件，再看結果','🔀',['條件：If it rains','條件成立？','結果：we will stay home'],[['可能的未來','If it rains, we will stay home.','條件子句用現在式'],['現在的假設','If I had time, I would help.','過去式表與現在事實有距離'],['過去的假設','If I had known, I would have helped.','had + p.p.／would have + p.p.']]],
 [/比較|最高級|comparison|comparative|superlative/i,'比較對象要對齊','⚖️',['A 的同一特質','比較：-er / more','B 的同一特質'],[['兩者比較','Amy is taller than Ben.','形容詞比較級 + than'],['群體中最高','Amy is the tallest in her class.','the + 最高級 + 範圍'],['同等比較','Amy is as tall as Ben.','as + 原級 + as']]],
 [/可數|不可數|數量|名詞單複|countab|quantifier|名詞、冠詞與數量/i,'先看名詞，再選量詞','🧺',['可數？ a book / books','不可數？ water','依語意選 many / much / some'],[['可數複數','many books / a few books','可一個個計數'],['不可數','much water / a little water','整體或材料'],['借助單位','two pieces of advice','advice 不直接加 s']]],
 [/附加問句|間接問句|名詞子句|tag question|indirect|noun clause/i,'大句裡的小句','💬',['主句：Do you know','疑問詞：where','直述語序：she lives'],[['直接問句','Where does she live?','疑問語序'],['間接問句','Do you know where she lives?','子句改為主詞 + 動詞'],['附加問句','She lives here, doesn’t she?','檢查時態、主詞與肯否']]],
 [/倒裝|inversion|inverted/i,'先還原，再倒裝','↔️',['原句：I have never seen it','前移：Never','倒裝：have I seen it'],[['原句','I have never seen it.','先看助動詞與主詞'],['否定副詞前移','Never have I seen it.','助動詞移到主詞前'],['無原有助動詞','Rarely does she complain.','加 does，主動詞還原']]],
 [/分裂句|焦點強調|cleft/i,'It is ... that 強光聚光燈','🔦',['鎖定強調焦點 (主詞/受詞/副詞)','套入 It is/was [焦點] that','刪除測試：還原為完整原句'],[['強調主詞','It was Tom that won the prize.','Tom 是執行動作的主體'],['強調受詞','It was this book that I read.','this book 是被閱讀的客體'],['強調時間副詞','It was at midnight that rain began.','at midnight 交代關鍵時刻']]],
 [/分詞|participle|participial|absolute/i,'化簡前先比對主詞','✂️',['原子句：Because she was tired','主詞同為 she','化簡：Being tired, she rested.'],[['主動關係','Walking home, Amy saw Ben.','Amy 是走路的人'],['被動關係','Written in English, the letter was clear.','letter 是被寫的物件'],['避免懸垂','Walking home, the rain started. → 改明主詞','不要讓雨成為走路的人']]],
 [/動名詞|不定詞|gerund|infinitive/i,'動詞後面接哪種形式？','🧩',['找前面的動詞','查搭配與語意','選 to V 或 V-ing'],[['習慣搭配','enjoy reading / decide to read','搭配需連詞組記憶'],['停止原動作','stop talking','停止說話'],['停下來做另一件事','stop to talk','停下手邊的事去說話']]],
 [/介系詞|問路|方位|directions|preposition/i,'空間與時間的定位','📍',['at：某個點','on：表面／某天','in：空間／較長時段'],[['時間點','at seven','鐘點'],['特定日期','on Monday / on June 1','星期或日期'],['範圍內','in the room / in July','空間或月份；不是所有用法都可直譯']]],
 [/過去進行|when.*while/i,'時間交錯：背景長動作 vs 切入短動作','⏳',['長動作進行中 (was V-ing)','短動作切入 (V-ed)','由 when / while 錨定時序'],[['背景長動作','I was showering when phone rang.','進行中被突然中斷'],['短動作切入','The phone rang while I was showering.','when 引導短動作，while 引導進行'],['雙動作平行','Mom was cooking while Dad was reading.','過去某一時間段平行發生']]],
 [/現在進行|進行式|continuous|progressive/i,'正在發生的動作','▶️',['主詞：They','be：are','V-ing：reading now'],[['現在進行','They are reading now.','be 隨主詞變化'],['過去進行','They were reading at eight.','過去某時正在進行'],['不同於習慣','They read every day.','習慣通常用現在簡單式']]],
 [/過去|未來|時態|tense|future|narrative|簡單式/i,'把事件放上時間軸','🕒',['過去：yesterday','現在：now / every day','未來：tomorrow'],[['已結束事件','I visited her yesterday.','過去式'],['現在習慣','I visit her every Sunday.','現在簡單式'],['未來計畫','I am going to visit her tomorrow.','be going to + 原形']]],
 [/五大句型|基本句型|句子骨架|動詞分類|sentence pattern|第一個完整句子|be 動詞.*句子|be-sentences|人稱/i,'句子由哪些積木組成？','🧱',['誰／什麼：She','動詞：is / reads','補充：happy / a book'],[['身分、狀態','She is happy.','主詞 + be + 補語'],['動作與受詞','She reads a book.','主詞 + 動詞 + 受詞'],['主詞一致','They are happy.','主詞改複數，be 也改變']]],
 [/do \\/ does|第三人稱|三單|現在簡單|頻率|present simple/i,'把第三人稱變化交給 does','🔧',['肯定：She plays','疑問：Does she play?','否定：She doesn’t play.'],[['第三人稱肯定','He watches TV.','watch → watches'],['疑問句','Does he watch TV?','does 後用原形'],['頻率副詞','He often watches TV.','通常在一般動詞前、be 後']]],
 [/疑問句|情態|助動詞|生活溝通/i,'疑問詞語序與情態語氣分級','❓',['找疑問詞 (5W1H)','看主詞與動詞','助動詞調前，動詞還原'],[['Wh- 特殊問句','Where does she live?','疑問詞 + 助動詞 + 主詞 + 原形'],['Yes/No 一般問句','Can you swim?','情態/助動詞移至主詞前'],['情態推測','She must be tired.','must (95% 必定) > may (50% 可能)'],['禮貌請求','Could you help me?','could / would 語氣比 can / will 客氣']]],
 [/連接詞|複句|conjunction|副詞子句|因果轉折/i,'等立 vs 從屬連接詞兩大陣營','🪢',['判斷句子關係 (因果/轉折/時間)','選對連接詞類別','檢查標點逗號與主從子句'],[['等立連接 (FANBOYS)','I was tired, but I finished.','連接同等獨立子句；前有逗號'],['從屬原因 (because)','Because it rained, we stayed.','從屬句在句首加逗號；不可 because 與 so 連用'],['從屬讓步 (although)','Although it rained, we went.','不可 although 與 but 連用'],['時間從屬 (when/while)','While I was cooking, phone rang.','while 接進行式背景動作']]],
 [/聽力|語音|連音|弱讀|listening|connected speech/i,'母語者真實語音四大解碼線索','🎧',['抓取句子重音與實詞','辨識連音與省音現象','由語調起伏推測說話者意圖'],[['連音 (Linking)','pick up → /pɪˈkʌp/','前字子音尾連後字母音起首'],['弱讀 (Weak Form)','bread and butter → bread /ən/ butter','虛詞 (and, of, to) 元音弱化為 /ə/'],['升調 (Rising)','Are you ready? ↗','Yes/No 問句或不確定確認語氣'],['降調 (Falling)','Where are you going? ↘','Wh- 特殊問句與確定陳述句']]],
 [/長難句|句法.*拆解|complex sentence/i,'長難句五步剝洋蔥解構術','🧅',['抓主幹 (主要主詞與主要動詞)','括號括起介系詞片語','標記關係子句與分詞修飾語','重組主句核心邏輯'],[['主幹提取','The scientist [who discovered X] won the prize.','主詞 The scientist ... 動詞 won the prize'],['介系詞層層修飾','The book [on the desk] [in my room] is mine.','向後修飾前方名詞，不影響主動詞單複數'],['同位語補充','Dr. Smith, [a renowned surgeon], spoke.','逗號間同位語可暫時跳過不讀'],['多重從屬','He said [that if it rained, he would stay].','釐清名詞子句與條件子句的包容層級']]],
 [/核心詞彙|搭配詞|collocation|字彙網絡/i,'高中核心搭配詞同心圓網絡','🌐',['背單字背「動詞 + 名詞」','注意專屬介系詞搭配','分辨近義詞語境色彩'],[['強烈搭配 (Strong)','make an effort / pay attention to','不可隨意替換為 do effort / give attention'],['介系詞綁定','depend on / contribute to / result in','動詞與介系詞打包成單一記憶單位'],['語境色彩 (Register)','childish (幼稚負面) vs youthful (青春正面)','依作者褒貶態度精準選詞'],['同字異義 (Polysemy)','address (地址 / 演說 / 著手處理問題)','學測高頻考動詞衍生義']]],
 [/中譯英|翻譯|句子產出|translation/i,'中英思維轉譯與無主句破解術','🔄',['中翻英先給句子找合法主詞','主動詞緊鄰，修飾語後置','時態依照客觀事實或時間點確定'],[['中文流水無主句','這家餐廳生意很好 → The restaurant is doing well.','不可直譯 "This restaurant business is very good"'],['存在句 vs 擁有句','教室裡有許多學生 → There are many students in the classroom.','不可寫成 "The classroom has many students" 或 "Have many students"'],['修飾語後置','穿紅衣服的女孩 → the girl in red','英文長修飾語放被修飾詞之後'],['被動思維轉譯','問題被解決了 → The problem has been resolved.','使用適當完成式與被動語態']]],
 [/整卷衝刺|大考衝刺|學測.*統測|會考.*整合|訂正策略|會考.*a\\+\\+|cap a\\+\\+|頂標衝刺|素養總結|終極模擬|culminating|diagnostic trial|全真突破/i,'大考高分決勝與三層排雷藍圖','🎯',['單題秒殺不超 40 秒','題組先看題目定位線索','標記不確定題回頭二次檢驗'],[['單選語法 (1-15題)','先圈時間副詞與主詞單複數','排除時態混淆與人稱陷阱'],['克漏字題組','先讀空格前後各一句連貫邏輯','注意轉折詞 However/Therefore'],['長篇閱讀題組','先讀題幹關鍵字 (Keyword)，再回文定位','嚴防「常識腦補」非文本訊息選項'],['錯題訂正本','記錄：考點、做錯原因、防呆心訣','同類型錯誤不犯第二次']]],
 [/專業科目|跨國技術|現場實務|tve vocational|esp domain/i,'技高專二專業英文讀寫精準對標','📋',['掌握商務與工程專業術語','抓取圖表與說明書技術細節','撰寫標準商務書信與摘要'],[['技術文獻閱讀','讀取規格表、數據手冊與測試報告','注意數值單位與極限條件'],['商務書信架構','Opening (目的) ➔ Body (細節) ➔ Closing (行動要求)','語氣保持專業禮貌 (professional & courteous)'],['圖表描述詞彙','fluctuate (波動), plateau (持平), skyrocket (暴增)','客觀陳述數據趨勢'],['摘要寫作 (Summary)','提煉作者核心主張，不加入個人主觀意見','用自己詞彙重組 (Paraphrase)']]],
 [/日常生活作息|時間表達|daily routine|telling time|動態時間/i,'時鐘讀法與一日生活作息流程','⏰',['看長針短針確認整點與半點','分辨 past (過幾分) 與 to (差幾分)','搭配一日作息動詞與時間介系詞'],[['整點表達','It is seven o\\'clock.','o\\'clock 僅用於整點'],['過幾分 (Past)','It is a quarter past seven. (7:15)','past 表經過的分鐘數 (1-30分)'],['差幾分 (To)','It is ten to eight. (7:50)','to 表距離下個整點差幾分 (31-59分)'],['一日時間介系詞','in the morning, at noon, at night','常態時間搭配固態介系詞']]],
 [/健康飲食|身體部位|醫療照護|food.*health/i,'健康金字塔與身體症狀關懷表達','🍎',['辨識常見健康食物與不健康食物','表達身體哪裡不舒服 (have a ...)','給予同理心關懷與健康建議 (should/must)'],[['症狀表達','I have a headache / stomachache.','have a + 部位ache (疼痛)'],['喉嚨痛發燒','I have a sore throat / a fever.','sore 表紅腫發炎'],['生活建議','You should drink warm water and rest.','should + 原形動詞給予良性建議'],['飲食分類','fresh vegetables vs sugary drinks','健康均衡飲食觀念']]],
 [/世界節慶|多元文化|festivals.*culture/i,'東西方節慶日曆與文化特色對照','🎉',['了解節慶由來與慶祝月份','學會節慶專屬活動與問候語','欣賞與尊重不同文化習俗'],[['農曆新年','Lunar New Year: red envelopes, family reunion','華人文化最重要團聚節慶'],['萬聖節','Halloween: trick or treat, pumpkin lanterns','10月31日盛裝打扮與要糖果'],['感恩節','Thanksgiving: roast turkey, giving thanks','11月第四個星期四表達感恩'],['聖誕節','Christmas: exchange gifts, decorate trees','12月25日溫馨分享與祝福']]],
 [/頻率副詞|there is|存在句|frequency/i,'頻率副詞百分比與 There is/are 存在句','📊',['確認事情發生的次數比率','套入主謂前後合法位置律','掌握存在句單複數就近原則'],[['頻率刻度 100%','always (總是) / usually (通常 80%)','頻率副詞在 be 後、一般動詞前'],['頻率刻度 0%','never (從不 0%) / seldom (很少 20%)','內含否定語意'],['存在句單數','There is a book on the desk.','單數名詞或不可數名詞用 is'],['存在句複數','There are three dogs in the park.','複數名詞用 are；不可用 have']]],
 [/大學.*emi|全英語授課|口頭簡報|academic.*presentation|科技英語|ai 論文|綠色能源/i,'大學 EMI 課堂筆記與學術簡報 5 段論','🎓',['學術課堂聽講採用 Cornell 筆記系統','簡報開場破題 (Hook & Roadmap)','以圖表論據支撐發現，流暢引導 Q&A'],[['簡報開場','Today, I will walk you through our findings on X.','明確勾勒主題與大綱地圖'],['數據轉折','As shown in Figure 2, the trend shifts dramatically.','指引聽眾視線聚焦圖表核心'],['學術限制','A notable limitation of this study is sample size.','展現客觀嚴謹學術反思能力'],['總結與提問','To conclude, X leads to Y. Thank you, questions are welcome.','乾脆俐落收尾並開放問答']]],
 [/終生.*學習|英語力全景|自主學習|lifelong/i,'終生英語學習飛輪與輸入輸出閉環','🚀',['可理解性輸入 (i+1)：廣讀與聽力沉浸','間隔提取系統 (SRS)：抗遺忘記憶鞏固','實戰場域輸出：以教促學、跨國工作與寫作表達'],[['輸入沉浸 (Input)','挑選理解度 85-90% 的原汁原味材料 (Podcasts/News)','享受語言樂趣而非死背中文'],['記憶鞏固 (Spaced)','當天學 ➔ 隔天回想 ➔ 3天後做題 ➔ 1週後應用','以主動提取取代反覆重讀'],['實戰輸出 (Output)','撰寫英文日記、參與國際社群討論、做英語報告','讓語言成為解決現實問題的工具'],['元認知反思 (Metacognition)','定期透過題庫與自測診斷盲點並動態調整','成為終生自我驅動的語言大師']]],
 [/字首字尾|構詞|word building|affix|morphology/i,'構詞學三段式解構：字首＋字根＋字尾','🧩',['拆分單字三要素 (前綴、詞根、後綴)','判斷詞性功能與方向變化','串連同根詞族成倍擴充詞彙量'],[['否定前綴 un-/in-','unhappy, incorrect, invisible','反轉原本語意或表示否定'],['動作名詞後綴 -ment/-tion','development, education, decision','動詞轉化為抽象名詞'],['形容詞後綴 -ful/-less','careful (小心) vs careless (粗心)','表示充滿某特質或缺乏某特質'],['動詞後綴 -ize/-en','modernize (現代化), sharpen (削尖)','使具有某種狀態或動作']]],
 [/發音|音標|拼讀|phonics|phonetic|字典|vowel/i,'聲音與字形分開核對','🔊',['看字形與字母組合','查音標／聽發音','遮字聽寫，再核對'],[['短母音示例','cap /kæp/','注意 /æ/'],['長母音示例','cape /keɪp/','常見字尾 e 規則；仍有例外'],['不發音字母','listen /ˈlɪsən/','t 不發音；不能逐字母硬讀']]],
 [/安全|工場|指令|safety|ppe/i,'安全指令要保留強度和順序','🛡️',['辨識危險與物件','讀 must / must not','核對 before / after'],[['必要','Wear eye protection.','祈使句：動詞原形起首'],['禁止','Do not touch the switch.','Do not + 原形'],['先後','Disconnect power before cleaning.','先斷電再清潔；操作以設備手冊為準']]],
 [/尺寸|工具|規格|材料|technical|公差|tolerance|dimension/i,'讀規格時把數字和單位綁在一起','📐',['物件／欄位名稱','數值 + 單位','條件／允差'],[['長度','The pipe is 50 mm long.','50 與 mm 必須一起讀'],['上下限','between 48 and 52 mm','確認下限與上限'],['比較','This model uses less energy.','less energy 不等於所有性能都更好']]],
 [/流程|故障|troubleshoot|process/i,'流程與故障排除','🛠️',['觀察症狀','核對條件與證據','選擇下一步／回報'],[['步驟','First, check the indicator.','first 表第一步'],['條件','If the light is off, check the connection.','不要忽略 if 的前提'],['報告','The device stopped after the update.','先後關係不等於已證明原因']]],
 [/圖表|圖面|跨文本|chart|multimodal|規範/i,'圖表不是只看最大的數字','📊',['讀標題與單位','比相同時間／群體','用數據支持有限結論'],[['數值比較','A: 20 → 30; B: 40 → 45','A 增 10，B 增 5'],['變化比例','A: +50%; B: +12.5%','除以各自原值，不能只比較差額'],['結論範圍','A grew faster in this period.','限定在這段期間，不擴成永遠']]],
 [/論證|假設|批判|gmat|gre|argument|critical/i,'證據到結論中間缺什麼？','🔎',['證據：公車很擠','假設：新增班次能承接需求','結論：增班會減少擁擠'],[['必要假設','新增班次能服務原本擁擠的乘客','否定此連結，理由就難支持結論'],['削弱','只在離峰時段增班','無法回應尖峰擁擠'],['無關資訊','公車是藍色的','與承接需求沒有直接關聯']]],
 [/作文|寫作|email|郵件|簡報|writing/i,'寫作先規劃，再檢查','✍️',['目的與讀者','主張／重點 + 支持','核對意思、句法與語氣'],[['主張','The library should open later.','明確說出建議'],['支持','Students need a quiet place after class.','理由連結讀者需要'],['檢查','補證據、處理限制、避免絕對化','有理由不等於已有實證']]],
 [/篇章|段落|閱讀|推論|reading|cohesion|sat|toeic|gept|toefl/i,'由線索到答案','📖',['找題目要問的事','定位原文證據','核對範圍與邏輯'],[['對比','However, the plan is costly.','前後通常有反向訊息'],['結果','Therefore, we changed the plan.','後句是前因產生的結果'],['指涉','Students revised essays. This process took time.','this process 指修改文章，不是學生本人']]]
];
export function aidProfile(title) { return profiles.find(p=>p[0].test(title)); }
function dataChart(title) {
 if(!/圖表|chart|multimodal/i.test(title))return '';
 return '<figure class="aid-chart"><figcaption>示範數據：兩組在同一期間的變化（非真實研究）</figcaption>'+[['A 原值',20],['A 新值',30],['B 原值',40],['B 新值',45]].map(([label,n])=>'<div class="aid-bar-row"><span>'+label+'</span><span class="aid-bar-track"><span class="aid-bar" style="width:'+(n*2)+'%"></span></span><strong>'+n+'</strong></div>').join('')+'<p>共用 0–50 刻度。A 增加 10（50%），B 增加 5（12.5%）；數量差和成長率是兩個不同問題。</p></figure>';
}
export function renderTeachingAid(title, concepts=[], examples=[]) {
 const p=aidProfile(title);
 const rows=concepts.map(c=>[c.heading||c.title||'核心觀念',c.formula||c.explanation||c.body||c.content||'',c.example||c.tip||'回到本頁例句，說明如何使用。']).filter(r=>r[1]);
 const flow=p?p[3]:['先看本頁主題','對照具體情境','用自己的例子檢查'];
 const table=p?p[4]:rows.slice(0,6);
 if(!table.length)table.push(['學習目標',title,'先用自己的話解釋，再做本頁練習。']);
 const visualChart = renderTopicVisualChart(title) || dataChart(title);
 return \`<section class="card teaching-aid lesson-visual-diagram" aria-label="\${e(title)}的圖解與對照"><h2><span aria-hidden="true">\${p?p[2]:'🗺️'}</span> \${e(p?p[1]:'本頁觀念地圖')}</h2><ol class="aid-flow">\${flow.map((s,i)=>\`<li><span class="aid-number">\${i+1}</span>\${e(s)}</li>\`).join('')}</ol>\${visualChart}<div class="lesson-table" tabindex="0" role="region" aria-label="可橫向捲動的比較表"><table><caption>\${e(title)} · \${p?'示範比較':'觀念整理'}</caption><thead><tr><th scope="col">判斷重點</th><th scope="col">示例／規則</th><th scope="col">如何理解</th></tr></thead><tbody>\${table.map(r=>\`<tr>\${r.map(s=>\`<td>\${e(s)}</td>\`).join('')}</tr>\`).join('')}</tbody></table></div>\${examples.length?\`<details><summary>把圖解用在本頁例句</summary><ul>\${examples.slice(0,3).map(s=>\`<li>\${e(s)}</li>\`).join('')}</ul><p>依序找出圖中的線索，說明這個例句如何符合規則；若不符合，指出例外。</p></details>\`:''}</section>\`;
}
`;

fs.writeFileSync(aidsPath, newAidsContent, 'utf8');
console.log('✓ Updated dist/teaching_aids.mjs');

// =========================================================================
// 3. UPDATE dist/grammar.mjs
// =========================================================================
let grammarPath = path.join(ROOT, 'dist', 'grammar.mjs');
let grammarContent = fs.readFileSync(grammarPath, 'utf8');

if (!grammarContent.includes("import { renderTopicVisualChart }")) {
  grammarContent = "import { renderTopicVisualChart } from './lesson_visuals.mjs';\n" + grammarContent;
  // In grammarPage():
  grammarContent = grammarContent.replace(
    "${['present-past','progressive','perfect','future'].includes(t.id)?timeline:''}",
    "${renderTopicVisualChart(t.title) || (['present-past','progressive','perfect','future'].includes(t.id)?timeline:'')}"
  );
  fs.writeFileSync(grammarPath, grammarContent, 'utf8');
  console.log('✓ Updated dist/grammar.mjs');
}

// =========================================================================
// 4. UPDATE dist/affix_guide.mjs
// =========================================================================
let affixPath = path.join(ROOT, 'dist', 'affix_guide.mjs');
let affixContent = fs.readFileSync(affixPath, 'utf8');

if (!affixContent.includes("import { renderWordFormationMorphologyDiagram }")) {
  affixContent = "import { renderWordFormationMorphologyDiagram } from './lesson_visuals.mjs';\n" + affixContent;
  affixContent = affixContent.replace(
    '<section class="card"><h2>一個詞族，分四步記</h2>',
    '${renderWordFormationMorphologyDiagram()}<section class="card"><h2>一個詞族，分四步記</h2>'
  );
  fs.writeFileSync(affixPath, affixContent, 'utf8');
  console.log('✓ Updated dist/affix_guide.mjs');
}

// =========================================================================
// 5. UPDATE dist/listening.mjs
// =========================================================================
let listeningPath = path.join(ROOT, 'dist', 'listening.mjs');
let listeningContent = fs.readFileSync(listeningPath, 'utf8');

if (!listeningContent.includes("import { renderListeningConnectedSpeechDiagram }")) {
  listeningContent = "import { renderListeningConnectedSpeechDiagram } from './lesson_visuals.mjs';\n" + listeningContent;
  listeningContent = listeningContent.replace(
    '${lesson?`${renderLessonAudio(lesson.id)}',
    '${renderListeningConnectedSpeechDiagram()}${lesson?`${renderLessonAudio(lesson.id)}'
  );
  fs.writeFileSync(listeningPath, listeningContent, 'utf8');
  console.log('✓ Updated dist/listening.mjs');
}

// =========================================================================
// 6. SYNC ALL CHANGED FILES TO site/dist/
// =========================================================================
const filesToSync = [
  'lesson_visuals.mjs',
  'teaching_aids.mjs',
  'grammar.mjs',
  'affix_guide.mjs',
  'listening.mjs'
];

for (const file of filesToSync) {
  const src = path.join(ROOT, 'dist', file);
  const dest = path.join(ROOT, 'site', 'dist', file);
  const buf = fs.readFileSync(src);
  fs.writeFileSync(dest, buf);
  console.log('✓ Synced ' + file + ' to site/dist/');
}

console.log('All updates and sync completed successfully!');
