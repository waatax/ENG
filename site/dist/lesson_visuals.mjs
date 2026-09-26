// lesson_visuals.mjs - 英語知識點教學視覺化圖表與自然拼讀/閃卡鷹架模組
// 依據教育部 108 課綱與國際 ESL 教學標準，提供豐富的 SVG 語法時態時間軸、主被動結構圖、條件句決策樹與發音視覺輔助

import { playWord, playSentence } from './audio.mjs';

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

// 1. 時態時間軸視覺圖 (Timeline Chart)
export function renderTenseTimelineChart() {
  return `
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <strong style="color:#0f172a;font-size:15px">📊 英語核心 12 時態全景時間軸圖 (Tenses Timeline Map)</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">視覺化時空座標</span>
      </div>
      <svg viewBox="0 0 760 170" style="width:100%;height:auto;display:block">
        <!-- 主時間軸軸線 -->
        <line x1="40" y1="95" x2="720" y2="95" stroke="#475569" stroke-width="4" stroke-linecap="round" />
        <polygon points="720,90 735,95 720,100" fill="#475569" />

        <!-- 過去、現在、未來三大座標節點 -->
        <!-- 過去 (Past) -->
        <circle cx="200" cy="95" r="9" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3" />
        <text x="200" y="70" text-anchor="middle" font-size="14" font-weight="700" fill="#1e40af">過去 (PAST)</text>
        <rect x="120" y="115" width="160" height="42" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="200" y="132" text-anchor="middle" font-size="11" font-weight="600" fill="#1e40af">過去簡單式 / V-ed</text>
        <text x="200" y="148" text-anchor="middle" font-size="10" fill="#64748b">Yesterday, Last night</text>

        <!-- 現在 (Present / NOW) -->
        <circle cx="400" cy="95" r="11" fill="#10b981" stroke="#047857" stroke-width="4" />
        <line x1="400" y1="25" x2="400" y2="95" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" />
        <text x="400" y="20" text-anchor="middle" font-size="15" font-weight="800" fill="#047857">現在 (NOW)</text>
        <rect x="320" y="115" width="160" height="42" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
        <text x="400" y="132" text-anchor="middle" font-size="11" font-weight="600" fill="#065f46">現在簡單式 / V-(e)s</text>
        <text x="400" y="148" text-anchor="middle" font-size="10" fill="#64748b">Always, Usually, Every day</text>

        <!-- 未來 (Future) -->
        <circle cx="600" cy="95" r="9" fill="#f59e0b" stroke="#b45309" stroke-width="3" />
        <text x="600" y="70" text-anchor="middle" font-size="14" font-weight="700" fill="#b45309">未來 (FUTURE)</text>
        <rect x="520" y="115" width="160" height="42" rx="6" fill="#fffbeb" stroke="#fde68a" />
        <text x="600" y="132" text-anchor="middle" font-size="11" font-weight="600" fill="#92400e">未來式 / will + V</text>
        <text x="600" y="148" text-anchor="middle" font-size="10" fill="#64748b">Tomorrow, Next week</text>

        <!-- 進行式與完成式跨度弧線 -->
        <!-- 現在進行式 (正在進行波浪) -->
        <path d="M 370,80 Q 400,65 430,80" fill="none" stroke="#059669" stroke-width="3" />
        <text x="400" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="#059669">be + V-ing (正在發生)</text>

        <!-- 現在完成式 (由過去連結至現在之橋樑) -->
        <path d="M 210,90 C 260,35 340,35 390,90" fill="none" stroke="#7c3aed" stroke-width="3" marker-end="url(#arrow)" />
        <text x="300" y="42" text-anchor="middle" font-size="11" font-weight="700" fill="#6d28d9">現在完成式 have/has + p.p. (自過去持續至現在)</text>
      </svg>
      <div style="font-size:12px;color:#64748b;margin-top:6px;line-height:1.5">
        💡 <strong>解題思考法：</strong>判斷時態時，先在時間軸上找出「基準點（NOW）」在哪裡，再尋找時間副詞提示，瞬間鎖定正確動詞形式！
      </div>
    </div>
  `;
}

// 2. 主動轉被動語態結構圖 (Active to Passive Cross Transformation)
export function renderPassiveVoiceDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🔄 主被動語態「交叉變身」黃金結構圖</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">S + V + O ➔ O + be p.p. + by S</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr;gap:12px">
        <!-- 主動句 -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px">
          <div style="font-size:12px;color:#1e40af;font-weight:700;margin-bottom:6px">【主動句 Active Voice】：主詞親自執行動作</div>
          <div style="display:flex;gap:10px;align-items:center;font-size:16px;flex-wrap:wrap">
            <span style="background:#3b82f6;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">The chef (主詞 S)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#10b981;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">prepares (及物動詞 V)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#f59e0b;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">the dinner (受詞 O)</span>
          </div>
        </div>

        <!-- 轉換交叉指示 -->
        <div style="text-align:center;font-size:20px;color:#2563eb;font-weight:bold">
          ⬇ 動作承受者受詞移至句首 · 動詞變身為 [be + 過去分詞 p.p.] ⬇
        </div>

        <!-- 被動句 -->
        <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:8px;padding:12px 16px">
          <div style="font-size:12px;color:#166534;font-weight:700;margin-bottom:6px">【被動句 Passive Voice】：受詞變新主詞，主詞退居 by 之後</div>
          <div style="display:flex;gap:10px;align-items:center;font-size:16px;flex-wrap:wrap">
            <span style="background:#f59e0b;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">The dinner (新主詞)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#059669;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">is prepared (be + p.p.)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#64748b;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">by the chef (動作發出者)</span>
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:10px">
        ⚠️ <strong>避坑指南：</strong>be 動詞的時態必須與原句動詞時態一致，單複數必須配合「新主詞」！
      </div>
    </div>
  `;
}

// 3. 條件句與假設語氣分歧決策樹 (Conditional Decision Tree)
export function renderConditionalDecisionTree() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fffbeb;border:1px solid #fde68a;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#92400e;font-size:15px">🌳 條件句與假設語氣「真實 vs. 與事實相反」決策分流樹</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#b45309">時態倒退一步法則</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px">
        <!-- 零條件句 / 事實 -->
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#f1f5f9;color:#334155;margin-bottom:6px">Type 0: 科學真理</div>
          <div style="font-weight:700;color:#0f172a;font-size:13px">If + 現在式, 現在式</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If you heat ice, it melts.</em> (加熱冰塊必融化)</div>
        </div>

        <!-- 第一條件句 / 未來可能 -->
        <div style="background:#fff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#eff6ff;color:#1e40af;margin-bottom:6px">Type 1: 未來可能真實</div>
          <div style="font-weight:700;color:#1e40af;font-size:13px">If + 現在式 (表未來), will + V</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If it rains tomorrow, we will stay home.</em></div>
        </div>

        <!-- 第二條件句 / 與現在相反 -->
        <div style="background:#fff;border:1px solid #ddd6fe;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#f5f3ff;color:#6d28d9;margin-bottom:6px">Type 2: 與現在事實相反</div>
          <div style="font-weight:700;color:#6d28d9;font-size:13px">If + 過去式 (were), would + V</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If I were a bird, I would fly to you.</em></div>
        </div>

        <!-- 第三條件句 / 與過去相反 -->
        <div style="background:#fff;border:1px solid #fecaca;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#fef2f2;color:#991b1b;margin-bottom:6px">Type 3: 與過去事實相反 (後悔)</div>
          <div style="font-weight:700;color:#991b1b;font-size:13px">If + had p.p., would have p.p.</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If you had studied, you would have passed.</em></div>
        </div>
      </div>
      <div style="font-size:12px;color:#92400e;margin-top:10px">
        💡 <strong>黃金口訣：</strong>「若與現在相反，動詞倒退成過去；若與過去相反，動詞倒退成過去完成 (had p.p.)」！
      </div>
    </div>
  `;
}

// 4. 關係代名詞指涉路徑圖 (Relative Pronoun Anchor Diagram)
export function renderRelativeClauseDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🔗 關係代名詞先行詞錨定與子句橋樑圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">形容詞子句本質</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:15px;margin-bottom:12px">
        <div style="background:#fff;border:2px solid #2563eb;padding:10px 14px;border-radius:8px;text-align:center">
          <div style="font-size:11px;color:#2563eb;font-weight:700">先行詞 (人或物)</div>
          <strong style="font-size:16px;color:#0f172a">The teacher</strong>
        </div>
        <div style="font-size:24px;color:#2563eb;font-weight:bold">➔</div>
        <div style="background:#ecfdf5;border:2px solid #10b981;padding:10px 14px;border-radius:8px;text-align:center">
          <div style="font-size:11px;color:#047857;font-weight:700">關係代名詞 (替換先行詞)</div>
          <strong style="font-size:16px;color:#047857">who / that</strong>
        </div>
        <div style="font-size:24px;color:#10b981;font-weight:bold">➔</div>
        <div style="background:#fff;border:1px solid #cbd5e1;padding:10px 14px;border-radius:8px;flex:1;min-width:200px">
          <div style="font-size:11px;color:#64748b;font-weight:700">形容詞子句 (修飾先行詞)</div>
          <span style="color:#1e293b;font-style:italic">teaches us English is very kind.</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:8px;font-size:12px">
        <div style="background:#fff;padding:8px;border-radius:6px;border:1px solid #e2e8f0">
          👤 <strong>先行詞為人：</strong>主格用 who/that，受格用 whom/who/that，所有格用 whose
        </div>
        <div style="background:#fff;padding:8px;border-radius:6px;border:1px solid #e2e8f0">
          📦 <strong>先行詞為物：</strong>主格與受格用 which/that，所有格用 whose / of which
        </div>
      </div>
    </div>
  `;
}

// 5. 介系詞空間概念金字塔圖 (In-On-At Pyramid)
export function renderPrepositionsPyramid() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🔺 時間與空間介系詞 In ➔ On ➔ At 金字塔法則</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">由大範圍到特定點</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr;gap:8px">
        <div style="background:#eff6ff;border:1px solid #93c5fd;border-radius:8px;padding:12px;text-align:center">
          <strong style="color:#1e40af;font-size:16px">IN (最大範疇 / 包裹在內)</strong>
          <div style="font-size:12px;color:#475569;margin-top:2px">
            時間：年、月、世紀、季節 (in 2026, in summer, in May) ｜ 空間：國家、城市、封閉空間 (in Taiwan, in the room)
          </div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px;text-align:center;width:85%;margin:0 auto">
          <strong style="color:#166534;font-size:16px">ON (特定日期 / 表面接觸)</strong>
          <div style="font-size:12px;color:#475569;margin-top:2px">
            時間：具體日期、星期 (on Monday, on October 10th) ｜ 空間：平面、大眾交通工具 (on the table, on the bus)
          </div>
        </div>
        <div style="background:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:12px;text-align:center;width:65%;margin:0 auto">
          <strong style="color:#991b1b;font-size:16px">AT (精準時刻 / 精確定位點)</strong>
          <div style="font-size:12px;color:#475569;margin-top:2px">
            時間：精準鐘點 (at 8:30 PM, at noon) ｜ 空間：特定地點與門牌 (at the station, at 101 Main Street)
          </div>
        </div>
      </div>
    </div>
  `;
}

// 依據單元或章節主題智能匹配最合適的視覺化圖表
export function getSmartVisualDiagram(titleOrId) {
  const str = String(titleOrId || '').toLowerCase();

  if (/時態|tense|present|past|future|perfect|continuous|6上|6下|7上|7下/.test(str)) {
    return renderTenseTimelineChart();
  }
  if (/被動|passive|voice|p\.p\.|使役|感官/.test(str)) {
    return renderPassiveVoiceDiagram();
  }
  if (/條件|假設|conditional|if|wish|would/.test(str)) {
    return renderConditionalDecisionTree();
  }
  if (/關係|代名詞|relative|who|which|that|子句|clause/.test(str)) {
    return renderRelativeClauseDiagram();
  }
  if (/介系詞|preposition|in|on|at|方位|空間/.test(str)) {
    return renderPrepositionsPyramid();
  }

  // 預設時態圖
  return renderTenseTimelineChart();
}

// 自然拼讀與發音提示方塊 (Phonics Bridge Box)
export function renderPhonicsTipBox(unitTitle, sampleWords = []) {
  return `
    <div class="lesson-phonics-bridge" style="background:linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin:16px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:18px">🔤</span>
          <strong style="color:#92400e;font-size:14px">自然拼讀與見字直讀重點提示 (Phonics & Pronunciation Tips)</strong>
        </div>
        <div style="font-size:13px;color:#78350f;margin-top:4px">
          本單元核心詞彙可透過「CVC 短母音」、「Magic E 長母音」或「音節拆解」直讀，學會發音規則即可秒背單字！
        </div>
      </div>
      <button class="btn" data-nav="phonics" style="background:#d97706;color:#fff;font-weight:700;font-size:13px;padding:8px 16px;border:none;border-radius:8px;box-shadow:0 2px 6px rgba(217,119,6,0.25)">
        🔤 開啟自然拼讀全景大師課 ➔
      </button>
    </div>
  `;
}

// 記憶閃卡推薦橋樑方塊 (Flashcard Bridge Box)
export function renderFlashcardBridgeBox(tierId = 'elem_1000', tierName = '小學必備1,000字') {
  return `
    <div class="lesson-flashcard-bridge" style="background:linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;margin:16px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:18px">🗂️</span>
          <strong style="color:#1e40af;font-size:14px">單字與片語 3D 記憶閃卡直通車 (Flashcards Studio)</strong>
        </div>
        <div style="font-size:13px;color:#1e3a8a;margin-top:4px">
          已為本單元對標對應階段之記憶閃卡，支援 3D 翻轉卡片、KK音標拆解與真人語音輪播聽讀！
        </div>
      </div>
      <button class="btn" data-nav="flashcards" style="background:#2563eb;color:#fff;font-weight:700;font-size:13px;padding:8px 16px;border:none;border-radius:8px;box-shadow:0 2px 6px rgba(37,99,235,0.25)">
        🗂️ 進入記憶閃卡館開始背誦 ➔
      </button>
    </div>
  `;
}
