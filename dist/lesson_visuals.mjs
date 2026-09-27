// lesson_visuals.mjs - 英語知識點教學視覺化圖表與自然拼讀/閃卡鷹架模組
// 依據教育部 108 課綱與國際 ESL 教學標準，提供豐富的 SVG 語法時態時間軸、主被動結構圖、五大句型柱、條件句決策樹、高工工程規格圖與邏輯論證地圖

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
        <path d="M 370,80 Q 400,65 430,80" fill="none" stroke="#059669" stroke-width="3" />
        <text x="400" y="60" text-anchor="middle" font-size="10" font-weight="600" fill="#059669">be + V-ing (正在發生)</text>

        <path d="M 210,90 C 260,35 340,35 390,90" fill="none" stroke="#7c3aed" stroke-width="3" />
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
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px">
          <div style="font-size:12px;color:#1e40af;font-weight:700;margin-bottom:6px">【主動句 Active Voice】：主詞親自執行動作</div>
          <div style="display:flex;gap:10px;align-items:center;font-size:15px;flex-wrap:wrap">
            <span style="background:#3b82f6;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">The chef (主詞 S)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#10b981;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">prepares (及物動詞 V)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#f59e0b;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">the dinner (受詞 O)</span>
          </div>
        </div>
        <div style="text-align:center;font-size:18px;color:#2563eb;font-weight:bold">
          ⬇ 動作承受者受詞移至句首 · 動詞變身為 [be + 過去分詞 p.p.] ⬇
        </div>
        <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:8px;padding:12px 16px">
          <div style="font-size:12px;color:#166534;font-weight:700;margin-bottom:6px">【被動句 Passive Voice】：受詞變新主詞，主詞退居 by 之後</div>
          <div style="display:flex;gap:10px;align-items:center;font-size:15px;flex-wrap:wrap">
            <span style="background:#f59e0b;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">The dinner (新主詞)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#059669;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">is prepared (be + p.p.)</span>
            <span style="font-weight:bold;color:#475569">+</span>
            <span style="background:#64748b;color:#fff;padding:4px 10px;border-radius:6px;font-weight:700">by the chef (動作發出者)</span>
          </div>
        </div>
      </div>
      <div style="font-size:12px;color:#475569;margin-top:10px">
        ⚠️ <strong>避坑指南：</strong>be 動詞的時態必須與原句動詞時態一致，單複數必須配合「新主詞」！不及物動詞（happen, occur, die）沒有被動語態！
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
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:12px">
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#f1f5f9;color:#334155;margin-bottom:6px">Type 0: 科學真理</div>
          <div style="font-weight:700;color:#0f172a;font-size:13px">If + 現在式, 現在式</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If you heat ice, it melts.</em> (加熱冰塊必融化)</div>
        </div>
        <div style="background:#fff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#eff6ff;color:#1e40af;margin-bottom:6px">Type 1: 未來可能真實</div>
          <div style="font-weight:700;color:#1e40af;font-size:13px">If + 現在式 (表未來), will + V</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If it rains tomorrow, we will stay home.</em></div>
        </div>
        <div style="background:#fff;border:1px solid #ddd6fe;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#f5f3ff;color:#6d28d9;margin-bottom:6px">Type 2: 與現在事實相反</div>
          <div style="font-weight:700;color:#6d28d9;font-size:13px">If + 過去式 (were), would + V</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If I were a bird, I would fly to you.</em></div>
        </div>
        <div style="background:#fff;border:1px solid #fecaca;border-radius:8px;padding:10px 12px">
          <div class="pill" style="font-size:11px;background:#fef2f2;color:#991b1b;margin-bottom:6px">Type 3: 與過去事實相反 (後悔)</div>
          <div style="font-weight:700;color:#991b1b;font-size:13px">If + had p.p., would have p.p.</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px"><em>If you had studied, you would have passed.</em></div>
        </div>
      </div>
      <div style="font-size:12px;color:#92400e;margin-top:10px">
        💡 <strong>黃金口訣：</strong>「若與現在相反，動詞倒退成過去式；若與過去相反，動詞倒退成過去完成式 (had p.p.)」！
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

// 6. 五大基本句型成分拆解結構表 (Five Basic Sentence Patterns)
export function renderFiveSentencePatternsDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🧱 英語五大基本句型骨架全解圖 (Five Sentence Pillars)</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">文法積木組裝法</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr;gap:10px">
        <div style="background:#fff;border-left:5px solid #3b82f6;padding:10px 14px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
          <strong>1. S + Vi (主詞 + 完全不及物動詞)</strong>
          <div style="color:#475569;font-size:13px;margin-top:2px"><em>The sun rises in the east.</em> (不需受詞，意思即完整)</div>
        </div>
        <div style="background:#fff;border-left:5px solid #10b981;padding:10px 14px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
          <strong>2. S + LV + SC (主詞 + 連綴動詞 + 主詞補語)</strong>
          <div style="color:#475569;font-size:13px;margin-top:2px"><em>She looks happy today.</em> (補語形容主詞狀態，不可用副詞修飾！)</div>
        </div>
        <div style="background:#fff;border-left:5px solid #f59e0b;padding:10px 14px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
          <strong>3. S + Vt + O (主詞 + 完全及物動詞 + 受詞)</strong>
          <div style="color:#475569;font-size:13px;margin-top:2px"><em>Students study English every day.</em> (動作直接施加於受詞)</div>
        </div>
        <div style="background:#fff;border-left:5px solid #8b5cf6;padding:10px 14px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
          <strong>4. S + Vt + IO + DO (主詞 + 授與動詞 + 人 + 物)</strong>
          <div style="color:#475569;font-size:13px;margin-top:2px"><em>Dad bought me a bicycle. = Dad bought a bicycle for me.</em></div>
        </div>
        <div style="background:#fff;border-left:5px solid #ec4899;padding:10px 14px;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05)">
          <strong>5. S + Vt + O + OC (主詞 + 及物動詞 + 受詞 + 受詞補語)</strong>
          <div style="color:#475569;font-size:13px;margin-top:2px"><em>The good news made everyone excited.</em> (補語補充說明受詞)</div>
        </div>
      </div>
    </div>
  `;
}

// 7. 分詞構句化簡三步流程圖 (Participle Clause Reduction)
export function renderParticipleClauseFlowchart() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">✂️ 分詞構句長難句化簡「黃金三步法」</strong>
        <span class="pill" style="font-size:11px;background:#fce7f3;color:#9d174d">大考必考化簡術</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;text-align:center">
        <div style="background:#eff6ff;padding:12px;border-radius:8px;border:1px solid #bfdbfe">
          <div style="font-weight:700;color:#1e40af">步驟 1：檢查主詞</div>
          <div style="font-size:12px;color:#475569;margin-top:4px">前後兩子句主詞相同？相同則省略從屬句主詞；不同則保留 (獨立分詞)</div>
        </div>
        <div style="background:#ecfdf5;padding:12px;border-radius:8px;border:1px solid #a7f3d0">
          <div style="font-weight:700;color:#065f46">步驟 2：去除連接詞</div>
          <div style="font-size:12px;color:#475569;margin-top:4px">刪除 When, Because, After (若欲強調時間邏輯亦可保留)</div>
        </div>
        <div style="background:#fffbeb;padding:12px;border-radius:8px;border:1px solid #fde68a">
          <div style="font-weight:700;color:#92400e">步驟 3：動詞化簡</div>
          <div style="font-size:12px;color:#475569;margin-top:4px">主動動作變 V-ing，被動動作變 p.p.，否定前置加 Not</div>
        </div>
      </div>
      <div style="margin-top:12px;background:#fef2f2;border:1px solid #fca5a5;padding:10px 14px;border-radius:8px;font-size:12px;color:#991b1b">
        ⚠️ <strong>避坑警報：</strong>絕對不可出現「懸垂分詞 (Dangling Participle)」！例如：<em>Walking home, the rain began. (錯！雨不會走路！)</em>
      </div>
    </div>
  `;
}

// 8. 動名詞 vs. 不定詞決策矩陣 (Gerund vs. Infinitive Matrix)
export function renderGerundInfinitiveMatrixDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🧩 動名詞 (V-ing) vs. 不定詞 (to V) 搭配決策矩陣</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">動詞搭配分水嶺</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px">
        <div style="background:#eff6ff;padding:12px;border-radius:8px;border:1px solid #bfdbfe">
          <strong style="color:#1e40af">🎯 僅接動名詞 (V-ing)</strong>
          <div style="font-size:12px;color:#334155;margin-top:4px">
            enjoy, finish, practice, avoid, mind, consider, keep
            <div style="color:#64748b;margin-top:4px">例：<em>She enjoys reading novels.</em></div>
          </div>
        </div>
        <div style="background:#ecfdf5;padding:12px;border-radius:8px;border:1px solid #a7f3d0">
          <strong style="color:#065f46">🎯 僅接不定詞 (to V)</strong>
          <div style="font-size:12px;color:#334155;margin-top:4px">
            decide, hope, plan, refuse, promise, agree, afford
            <div style="color:#64748b;margin-top:4px">例：<em>They decided to study abroad.</em></div>
          </div>
        </div>
        <div style="background:#fff7ed;padding:12px;border-radius:8px;border:1px solid #ffedd5">
          <strong style="color:#9a3412">⚠️ 兩者皆可但語意不同</strong>
          <div style="font-size:12px;color:#334155;margin-top:4px">
            • stop to V (停下去做) vs. stop V-ing (停止做)<br>
            • remember to V (記得要做) vs. remember V-ing (記得曾做過)
          </div>
        </div>
      </div>
    </div>
  `;
}

// 9. 倒裝句法結構圖 (Inversion Sentence Architecture)
export function renderInversionStructureDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">↔️ 倒裝句型結構還原對照圖</strong>
        <span class="pill" style="font-size:11px;background:#f3e8ff;color:#6b21a8">否定副詞前移</span>
      </div>
      <div style="background:#fff;border:2px dashed #9333ea;padding:14px;border-radius:8px;margin-bottom:10px">
        <div style="font-size:13px;color:#6b21a8;font-weight:700">【黃金倒裝公式】：否定副詞 + 助動詞 (do/does/did/have/will) + 主詞 + 原形動詞</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px">
        <div style="background:#f1f5f9;padding:10px;border-radius:6px">
          <strong>原句直述語序：</strong><br>
          <em>I have never seen such a stunning view.</em>
        </div>
        <div style="background:#faf5ff;padding:10px;border-radius:6px;border:1px solid #d8b4fe">
          <strong>否定副詞倒裝：</strong><br>
          <strong style="color:#7e22ce">Never have I seen</strong> such a stunning view.
        </div>
      </div>
    </div>
  `;
}

// 10. 高工工場安全指令與 PPE 圖 (Workshop Safety & PPE)
export function renderWorkshopSafetyPPEDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🛡️ 高工工場安全規程與 PPE 防護裝備圖解</strong>
        <span class="pill" style="font-size:11px;background:#fee2e2;color:#991b1b">安全第一零災害</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:10px;text-align:center">
        <div style="background:#eff6ff;padding:10px;border-radius:8px;border:1px solid #bfdbfe">
          <div style="font-size:24px">🥽</div>
          <strong style="font-size:12px;color:#1e40af">Eye Protection</strong>
          <div style="font-size:11px;color:#64748b">護目鏡 (防飛屑)</div>
        </div>
        <div style="background:#fef3c7;padding:10px;border-radius:8px;border:1px solid #fde68a">
          <div style="font-size:24px">⛑️</div>
          <strong style="font-size:12px;color:#92400e">Hard Hat</strong>
          <div style="font-size:11px;color:#64748b">安全帽 (防墜物)</div>
        </div>
        <div style="background:#ecfdf5;padding:10px;border-radius:8px;border:1px solid #a7f3d0">
          <div style="font-size:24px">🧤</div>
          <strong style="font-size:12px;color:#065f46">Safety Gloves</strong>
          <div style="font-size:11px;color:#64748b">防割絕緣手套</div>
        </div>
        <div style="background:#f5f3ff;padding:10px;border-radius:8px;border:1px solid #ddd6fe">
          <div style="font-size:24px">🥾</div>
          <strong style="font-size:12px;color:#6d28d9">Steel-Toe Boots</strong>
          <div style="font-size:11px;color:#64748b">鋼頭安全鞋</div>
        </div>
      </div>
      <div style="margin-top:10px;font-size:12px;color:#475569">
        ⚠️ <strong>指令句型：</strong>祈使句 <em>"Always disconnect main power before maintenance."</em>
      </div>
    </div>
  `;
}

// 11. 高工工程尺寸與公差規格圖 (Engineering Tolerance & Specs)
export function renderEngineeringToleranceSpecsDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">📐 工程尺寸標註、公差與規格判讀圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">50 ± 0.05 mm 規格解析</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr;gap:10px">
        <div style="background:#fff;border:1px solid #94a3b8;padding:12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap">
          <div>
            <div style="font-size:12px;color:#64748b">基本尺寸 (Nominal Dimension)</div>
            <strong style="font-size:20px;color:#0f172a">50.00 mm</strong>
          </div>
          <div>
            <div style="font-size:12px;color:#dc2626">上限 (Upper Limit)</div>
            <strong style="font-size:16px;color:#dc2626">50.05 mm (+0.05)</strong>
          </div>
          <div>
            <div style="font-size:12px;color:#2563eb">下限 (Lower Limit)</div>
            <strong style="font-size:16px;color:#2563eb">49.95 mm (-0.05)</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 12. 設備故障排除決策樹 (Troubleshooting Decision Flowchart)
export function renderTroubleshootingFlowchartDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🛠️ 設備故障排除 (Troubleshooting) SOP 五步驟</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">標準維修演算法</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px">
        <span style="background:#eff6ff;padding:6px 12px;border-radius:6px;border:1px solid #bfdbfe">1. 症狀確認</span> ➔
        <span style="background:#eff6ff;padding:6px 12px;border-radius:6px;border:1px solid #bfdbfe">2. 電源訊號檢測</span> ➔
        <span style="background:#ecfdf5;padding:6px 12px;border-radius:6px;border:1px solid #a7f3d0">3. 故障模組隔離</span> ➔
        <span style="background:#fffbeb;padding:6px 12px;border-radius:6px;border:1px solid #fde68a">4. 零件更換校準</span> ➔
        <span style="background:#fdf2f8;padding:6px 12px;border-radius:6px;border:1px solid #fbcfe8">5. 試運轉驗證</span>
      </div>
    </div>
  `;
}

// 13. 商務多益電郵與交易流程圖 (Business Email & Cycle)
export function renderBusinessEmailFlowDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">💼 TOEIC 國際商務採購與通信生命週期圖</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">商務閉環流程</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:12px">
        <span style="background:#f1f5f9;padding:6px 10px;border-radius:6px">Inquiry (詢價)</span> ➔
        <span style="background:#eff6ff;padding:6px 10px;border-radius:6px">Quotation (報價)</span> ➔
        <span style="background:#ecfdf5;padding:6px 10px;border-radius:6px">PO (採購訂單)</span> ➔
        <span style="background:#fff7ed;padding:6px 10px;border-radius:6px">Shipment (出貨通知)</span> ➔
        <span style="background:#fdf4ff;padding:6px 10px;border-radius:6px">Invoice & Payment (款項核銷)</span>
      </div>
    </div>
  `;
}

// 14. 留學考批判邏輯架構圖 (Critical Reasoning Framework)
export function renderCriticalReasoningLogicDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🏛️ GMAT / GRE 批判邏輯推理三要素架構圖</strong>
        <span class="pill" style="font-size:11px;background:#fee2e2;color:#991b1b">論證解構與否定測試</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:8px;align-items:center;font-size:13px;text-align:center">
        <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:10px;border-radius:8px">
          <strong>Premise (前提事實)</strong>
          <div style="font-size:11px;color:#64748b">客觀不可爭辯之證據</div>
        </div>
        <div>➕</div>
        <div style="background:#fef3c7;border:1px solid #fde68a;padding:10px;border-radius:8px">
          <strong>Assumption (未明言假設)</strong>
          <div style="font-size:11px;color:#92400e">隱形邏輯橋樑 (攻擊點)</div>
        </div>
        <div>➔</div>
        <div style="background:#ecfdf5;border:1px solid #a7f3d0;padding:10px;border-radius:8px">
          <strong>Conclusion (主觀結論)</strong>
          <div style="font-size:11px;color:#065f46">作者最終欲證明之主張</div>
        </div>
      </div>
    </div>
  `;
}

// 15. 篇章結構轉折訊號地圖 (Discourse Transitions Map)
export function renderDiscourseTransitionsMap() {
  return `
    <div class="lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🗺️ 篇章連貫與路標轉折詞全景地圖</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">閱讀解題路標</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;font-size:12px">
        <div style="background:#fff;border-left:4px solid #10b981;padding:8px 12px;border-radius:6px">
          <strong style="color:#065f46">同向補充 (Addition)</strong><br>
          Furthermore, Moreover, In addition
        </div>
        <div style="background:#fff;border-left:4px solid #ef4444;padding:8px 12px;border-radius:6px">
          <strong style="color:#991b1b">逆向轉折 (Contrast)</strong><br>
          However, Nevertheless, In contrast
        </div>
        <div style="background:#fff;border-left:4px solid #3b82f6;padding:8px 12px;border-radius:6px">
          <strong style="color:#1e40af">因果推論 (Cause-Effect)</strong><br>
          Therefore, Consequently, As a result
        </div>
      </div>
    </div>
  `;
}

// 16. 比較級與最高級刻度尺 (Comparatives Scale)
export function renderComparativesScaleDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">⚖️ 形容詞與副詞：原級 ➔ 比較級 ➔ 最高級 刻度尺</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">程度遞增刻度</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;justify-content:space-around;font-size:13px;flex-wrap:wrap">
        <div style="text-align:center;padding:10px;background:#eff6ff;border-radius:8px;min-width:140px">
          <strong>原級 (as... as)</strong>
          <div style="font-size:11px;color:#64748b">as tall as Ben</div>
        </div>
        <div style="font-size:20px;color:#2563eb">➔</div>
        <div style="text-align:center;padding:10px;background:#ecfdf5;border-radius:8px;min-width:140px">
          <strong>比較級 (-er / more than)</strong>
          <div style="font-size:11px;color:#065f46">taller than Ben</div>
        </div>
        <div style="font-size:20px;color:#10b981">➔</div>
        <div style="text-align:center;padding:10px;background:#fdf2f8;border-radius:8px;min-width:140px">
          <strong>最高級 (the -est / most)</strong>
          <div style="font-size:11px;color:#9d174d">the tallest in the class</div>
        </div>
      </div>
    </div>
  `;
}

// 17. 自然拼讀母音光譜圖 (Phonics Vowel Spectrum)
export function renderPhonicsVowelSpectrumDiagram() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <strong style="color:#0f172a;font-size:15px">🔊 自然拼讀母音光譜與 Magic E 規則</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">見字即讀密鑰</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px">
        <div style="background:#eff6ff;padding:12px;border-radius:8px">
          <strong style="color:#1e40af">短母音 (CVC 閉音節)</strong>
          <div style="font-size:12px;color:#334155;margin-top:4px">
            a /æ/ cat · e /ɛ/ bed · i /ɪ/ sit · o /ɑː/ hot · u /ʌ/ cup
          </div>
        </div>
        <div style="background:#ecfdf5;padding:12px;border-radius:8px">
          <strong style="color:#065f46">長母音 (Magic E 開音節)</strong>
          <div style="font-size:12px;color:#334155;margin-top:4px">
            a_e /eɪ/ cake · i_e /aɪ/ bike · o_e /oʊ/ home · u_e /juː/ cute
          </div>
        </div>
      </div>
    </div>
  `;
}

// 18. 多模態圖表 (Multimodal Data Chart)
export function renderMultimodalDataChart() {
  return `
    <figure class="aid-chart lesson-visual-diagram card" style="background:#f8fafc;border:1px solid #cbd5e1;padding:16px;border-radius:12px;margin:16px 0">
      <figcaption style="font-weight:700;margin-bottom:10px">📊 示範多模態圖表數據判讀（成長率 vs. 絕對數量）</figcaption>
      ${[['A 組 原值', 20], ['A 組 新值', 30], ['B 組 原值', 40], ['B 組 新值', 45]].map(([label, n]) => `
        <div class="aid-bar-row">
          <span>${esc(label)}</span>
          <span class="aid-bar-track"><span class="aid-bar" style="width:${n * 2}%"></span></span>
          <strong>${n}</strong>
        </div>
      `).join('')}
      <p style="font-size:12px;color:#64748b;margin-top:8px">共用 0–50 刻度。A 組增加 10 (+50%)，B 組增加 5 (+12.5%)。解題時注意差額與成長率之本質差異！</p>
    </figure>
  `;
}

// 智能匹配主題最佳視覺圖表
export function renderTopicVisualChart(title = '') {
  const t = String(title ?? '');
  if (/被動|passive/i.test(t)) return renderPassiveVoiceDiagram();
  if (/五大句型|句子骨架|sentence pattern|基本句型/i.test(t)) return renderFiveSentencePatternsDiagram();
  if (/條件|假設|unless|conditional|subjunctive/i.test(t)) return renderConditionalDecisionTree();
  if (/關係|代名詞|relative|形容詞子句|先行詞/i.test(t)) return renderRelativeClauseDiagram();
  if (/(?:介系詞|問路|方位|directions|preposition)\b/i.test(t)) return renderPrepositionsPyramid();
  if (/倒裝|inversion/i.test(t)) return renderInversionStructureDiagram();
  if (/分詞|participle/i.test(t)) return renderParticipleClauseFlowchart();
  if (/動名詞|不定詞|gerund|infinitive/i.test(t)) return renderGerundInfinitiveMatrixDiagram();
  if (/比較|最高級|comparison|comparative/i.test(t)) return renderComparativesScaleDiagram();
  if (/安全|工場|指令|safety|ppe/i.test(t)) return renderWorkshopSafetyPPEDiagram();
  if (/尺寸|工具|規格|材料|公差|tolerance|dimension/i.test(t)) return renderEngineeringToleranceSpecsDiagram();
  if (/流程|故障|troubleshoot/i.test(t)) return renderTroubleshootingFlowchartDiagram();
  if (/商務|email|郵件|toeic/i.test(t)) return renderBusinessEmailFlowDiagram();
  if (/論證|批判|假設|gmat|gre|argument/i.test(t)) return renderCriticalReasoningLogicDiagram();
  if (/篇章|段落|閱讀|cohesion|reading|transitions/i.test(t)) return renderDiscourseTransitionsMap();
  if (/發音|音標|拼讀|phonics|vowel/i.test(t)) return renderPhonicsVowelSpectrumDiagram();
  if (/(?:時態|完成式|完成時|\btenses?\b|\bpast tense|\bfuture\b)/i.test(t) && !/food|health/i.test(t)) return renderTenseTimelineChart();
  if (/圖表|chart|multimodal/i.test(t)) return renderMultimodalDataChart();
  return '';
}

// 依據單元或章節主題智能匹配最合適的視覺化圖表
export function getSmartVisualDiagram(unitTitle) {
  return renderTopicVisualChart(unitTitle);
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
          遇到符合規則的字，可透過「CVC 短母音」、「Magic E 長母音」或「音節拆解」直讀，搭配例句與間隔回想練習記憶！
        </div>
      </div>
      <button class="btn" data-nav="phonics" style="background:#d97706;color:#fff;font-weight:700;font-size:13px;padding:8px 16px;border:none;border-radius:8px;box-shadow:0 2px 6px rgba(217,119,6,0.25)">
        🔤 開啟自然拼讀全景大師課 ➔
      </button>
    </div>
  `;
}

// 記憶閃卡推薦橋樑方塊 (Flashcard Bridge Box)
export function renderFlashcardBridgeBox(tierId = 'elem_1000', tierName = '國小基礎字詞') {
  return `
    <div class="lesson-flashcard-bridge" style="background:linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);border:1px solid #bfdbfe;border-radius:10px;padding:14px 18px;margin:16px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
      <div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:18px">🗂️</span>
          <strong style="color:#1e40af;font-size:14px">單字與片語 3D 記憶閃卡直通車 (Flashcards Studio)</strong>
        </div>
        <div style="font-size:13px;color:#1e3a8a;margin-top:4px">
          用翻卡先回想意思，再練習拼字；國小、國中卡庫可安排到期複習。朗讀使用裝置合成語音。
        </div>
      </div>
      <button class="btn" data-nav="${/^(g[6-9]|jhs|elem)/.test(tierId) ? 'schoolwords' : 'flashcards'}" style="background:#2563eb;color:#fff;font-weight:700;font-size:13px;padding:8px 16px;border:none;border-radius:8px;box-shadow:0 2px 6px rgba(37,99,235,0.25)">
        🗂️ 進入記憶閃卡館開始背誦 ➔
      </button>
    </div>
  `;
}
