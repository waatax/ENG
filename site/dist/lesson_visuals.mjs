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

// 19. GRE Verbal 填空雙空三空語意極性矩陣與等價詞簇圖 (GRE Semantic Polarity Matrix & Twin Synonyms)
export function renderGRESemanticPolarityChart() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🔠 GRE Verbal 填空雙空三空語意極性矩陣與等價詞簇 (Directionality & Twin Synonyms)</strong>
        <span class="pill" style="font-size:11px;background:#ffe4e6;color:#be123c;font-weight:700">Verbal 160+ 破題核心</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;margin-bottom:14px">
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#166534;font-size:13px">
            <span>➕</span> 語意同向信號 (Positive Directionality)
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>標記：</strong><code>and, therefore, consequently, moreover, similarly, colon (:)</code>
          </div>
          <div style="font-size:11px;color:#475569;line-height:1.5">
            <strong>法則：</strong>前後命題極性相同 (P1 ➔ P2)，空格必為修飾線索之同向延伸或進一步因果推進。
          </div>
        </div>
        <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#9f1239;font-size:13px">
            <span>🔄</span> 語意反轉信號 (Contrast & Concession)
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>標記：</strong><code>although, however, paradoxically, despite, belie, far from</code>
          </div>
          <div style="font-size:11px;color:#475569;line-height:1.5">
            <strong>法則：</strong>前後命題極性相反 (P1 ≠ P2)。注意隱形反差動詞（如 <code>belie, mask, obscure, contradict</code>）。
          </div>
        </div>
      </div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:12px">
        <div style="font-weight:700;font-size:13px;color:#0f172a;margin-bottom:6px">
          🎯 Sentence Equivalence (SE) 雙生同義詞六選二「雙重鎖定」決策流程：
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:12px;color:#334155">
          <span style="background:#e0e7ff;color:#3730a3;padding:4px 8px;border-radius:4px;font-weight:700">1. 抓取題幹 Pivot</span> ➔
          <span style="background:#f1f5f9;padding:4px 8px;border-radius:4px">2. 預測空格正負向極性</span> ➔
          <span style="background:#ecfdf5;color:#065f46;padding:4px 8px;border-radius:4px;font-weight:700">3. 六選中分組雙生詞 (Twin Pairs)</span> ➔
          <span style="background:#fef3c7;color:#92400e;padding:4px 8px;border-radius:4px;font-weight:700">4. 帶回全句驗證語意一致性</span>
        </div>
        <div style="font-size:11px;color:#64748b;margin-top:6px">
          ⚠️ 避坑：切勿只看選項中哪兩個是同義詞！若該組同義詞無法回應題幹精確線索，即為典型雙重陷阱！
        </div>
      </div>
      <div style="font-size:12px;color:#475569;background:#f1f5f9;padding:8px 12px;border-radius:6px">
        💡 <strong>三空題策略：</strong>「不依序做、找錨點破題」——先解線索最充足無歧義的空格（Anchor Blank），以其結果作為推導其餘兩空的堅實前提！
      </div>
    </div>
  `;
}

// 20. GMAT Focus 批判推理因果鏈與否定測試決策樹 (GMAT CR Causal Chain & Negation Tree)
export function renderGMATCriticalReasoningTree() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">⚖️ GMAT Focus Edition 批判推理因果鏈與否定測試決策樹 (CR Causal Chain & Negation Tree)</strong>
        <span class="pill" style="font-size:11px;background:#cffafe;color:#0e7490;font-weight:700">商學院邏輯靈魂</span>
      </div>
      <!-- 核心論證鏈架構圖 -->
      <div style="display:grid;grid-template-columns:1fr auto 1.2fr auto 1fr;gap:8px;align-items:center;font-size:12px;text-align:center;margin-bottom:14px">
        <div style="background:#eff6ff;border:1px solid #93c5fd;padding:10px;border-radius:8px">
          <strong style="color:#1e40af">Premise (客觀事實)</strong>
          <div style="font-size:11px;color:#64748b;margin-top:2px">不可質疑的實證數據</div>
        </div>
        <div style="font-size:16px;color:#64748b">➔</div>
        <div style="background:#fef3c7;border:2px dashed #f59e0b;padding:10px;border-radius:8px">
          <strong style="color:#b45309">Assumption (隱含假設)</strong>
          <div style="font-size:11px;color:#78350f;margin-top:2px">作者未言明之必要橋樑 (脆弱點)</div>
        </div>
        <div style="font-size:16px;color:#64748b">➔</div>
        <div style="background:#ecfdf5;border:1px solid #86efac;padding:10px;border-radius:8px">
          <strong style="color:#065f46">Conclusion (主觀主張)</strong>
          <div style="font-size:11px;color:#64748b;margin-top:2px">作者欲證明的推論結論</div>
        </div>
      </div>
      <!-- 五大核心攻防矩陣 -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:10px;margin-bottom:12px;font-size:12px">
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:10px;border-radius:8px">
          <strong style="color:#b91c1c">1. 削弱題 (Weaken) ⬇️</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>另有他因 (Alt Cause)</strong><br>
            • <strong>因果倒置 (Reverse Causality)</strong><br>
            • <strong>樣本偏差 (Selection Bias)</strong>
          </div>
        </div>
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:10px;border-radius:8px">
          <strong style="color:#15803d">2. 加強題 (Strengthen) ⬆️</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>排除混淆變量 (Confounder)</strong><br>
            • <strong>證實無因則無果 (No Cause No Effect)</strong><br>
            • <strong>平行操作實證 (Analogous Proof)</strong>
          </div>
        </div>
        <div style="background:#fffbeb;border:1px solid #fde68a;padding:10px;border-radius:8px">
          <strong style="color:#b45309">3. 假設題 (Assumption) 🎯</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>否定測試法 (Negation Technique)</strong><br>
            • <strong>將選項取非 (Add NOT)</strong><br>
            • <strong>若結論立即瓦解即為正解！</strong>
          </div>
        </div>
        <div style="background:#f5f3ff;border:1px solid #ddd6fe;padding:10px;border-radius:8px">
          <strong style="color:#6d28d9">4. 評價與黑體字 ⚖️</strong>
          <div style="color:#475569;margin-top:4px">
            • <strong>Evaluate:</strong> 雙向變數測試 (Variance)<br>
            • <strong>Boldface:</strong> 辨析證據 (Evidence) vs 中間結論 vs 主張 (Claim)
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:#64748b;line-height:1.5">
        💡 <strong>商學思維警告：</strong>題目涉及利潤 (Profit) 時，注意 Profit = Revenue - Cost，切勿將「銷售額增加」直接推導為「利潤增加」！
      </div>
    </div>
  `;
}

// TOEIC 多益核心題型破題心智地圖
export function renderTOEICQuestionTypeStrategyMap() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🏢 TOEIC 多益 Part 5–7 核心題型破題心智地圖 (TOEIC Master Strategy Blueprint)</strong>
        <span class="pill" style="font-size:11px;background:#fef3c7;color:#b45309;font-weight:700">L&amp;R 990 滿分實戰策略</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;margin-bottom:14px">
        <!-- Part 5 -->
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#92400e;font-size:13px">
            <span>⚡</span> Part 5 單句填空 (詞性秒殺 &amp; 高頻語法)
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>極速定位：</strong>20 秒/題 · 視線先看四個選項字根是否相同
          </div>
          <div style="font-size:11px;color:#475569;background:#ffffff;padding:8px;border-radius:6px;border:1px dashed #d97706">
            • <strong>同字根詞性題：</strong>直接看空格前後 2–3 個單字，判定主詞、受詞或修飾語位置<br>
            • <strong>常考句構：</strong><code>Adv + Adj + N</code>、<code>be + p.p. + Prep</code>、<code>Prep + V-ing + N</code><br>
            • <strong>致命陷阱：</strong>動名詞後接受詞 (approving the budget) vs 動作名詞不可直接承受詞 (approval of the budget)
          </div>
        </div>

        <!-- Part 6 -->
        <div style="background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#0f766e;font-size:13px">
            <span>🧩</span> Part 6 段落填空 (語意錨點 &amp; 句子插入)
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>篇章連貫：</strong>8–10 分鐘完成 4 篇 16 題 · 抓取前後邏輯鉤子
          </div>
          <div style="font-size:11px;color:#475569;background:#ffffff;padding:8px;border-radius:6px;border:1px dashed #0d9488">
            • <strong>句子插入題：</strong>先讀該空格前一句與後一句的代名詞 (this/these/such) 與因果轉折<br>
            • <strong>轉折副詞：</strong>However (反差)、Furthermore (遞進)、Consequently (因果)<br>
            • <strong>致命陷阱：</strong>跳段硬套選項造成時態突變 (例如主篇章為過去經驗卻硬選 will be)
          </div>
        </div>

        <!-- Part 7 -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#1d4ed8;font-size:13px">
            <span>📑</span> Part 7 閱讀理解 (跨文本交叉比對矩陣)
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>雙篇/三篇：</strong>50–55 分鐘極限配速 · 跨篇交叉綜合 (Synthesis)
          </div>
          <div style="font-size:11px;color:#475569;background:#ffffff;padding:8px;border-radius:6px;border:1px dashed #2563eb">
            • <strong>跨篇定位公式：</strong>文本 A (採購發票/行程) + 文本 B (客服投訴/變更通知) ➔ 答案在交集差額<br>
            • <strong>意圖推論題：</strong>What does the author imply? 嚴防主觀腦補，必找同義改寫 (Paraphrase)<br>
            • <strong>致命陷阱：</strong>文本 A 提及但文本 B 已經更新更正的「過期舊資訊干擾項」
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:#64748b;line-height:1.5">
        💡 <strong>多益黃金配速律：</strong>聽力完畢立即無縫接軌 Part 5 (10–12分) ➔ Part 6 (8–10分) ➔ Part 7 (50–55分)，確保最後 5 題三篇閱讀有充裕 7 分鐘作答！
      </div>
    </div>
  `;
}

// Digital SAT 雙模組三大領域解題架構藍圖
export function renderSATConstructBlueprint() {
  return `
    <div class="lesson-visual-diagram card" style="background:#fff;border:1px solid #cbd5e1;padding:18px;margin:16px 0;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🎓 Digital SAT 雙模組學術三大領域解題架構藍圖 (Digital SAT Blueprint)</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3;font-weight:700">Reading &amp; Writing 800 滿分構念</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:12px;margin-bottom:14px">
        <!-- Craft & Structure -->
        <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#5b21b6;font-size:13px">
            <span>🔍</span> Words in Context 語境詞彙 &amp; 修辭目的
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>雙向語意指針：</strong>題幹必有 100% 絕對客觀之同義線索或反義對照
          </div>
          <div style="font-size:11px;color:#475569;background:#ffffff;padding:8px;border-radius:6px;border:1px dashed #7c3aed">
            • <strong>反差線索：</strong>However, far from, rather than ➔ 空格填入對比項之精確反義詞<br>
            • <strong>同向線索：</strong>Furthermore, indeed, colon (:) ➔ 空格填入前述主張之精確同義詞<br>
            • <strong>致命陷阱：</strong>代入中文憑「感覺通順」硬猜；忽略學術語境中的高階衍生義 (如 corroborate, delineate)
          </div>
        </div>

        <!-- Information & Ideas -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#1d4ed8;font-size:13px">
            <span>📊</span> Command of Evidence &amp; Inferences 論據推論
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>假說因果驗證：</strong>將研究假說提煉成「變量 A 影響變量 B」的邏輯關係
          </div>
          <div style="font-size:11px;color:#475569;background:#ffffff;padding:8px;border-radius:6px;border:1px dashed #2563eb">
            • <strong>支持題 (Support)：</strong>實驗組數據顯著超越控制組，或排除關鍵潛在混淆變量<br>
            • <strong>削弱題 (Weaken)：</strong>指出反常數據 (Anomalous data) 或發現變量 C 才是主因<br>
            • <strong>致命陷阱：</strong>範疇漂移 (Scope Shift)——選項提及普遍真理但與本研究之具體因果假設無關
          </div>
        </div>

        <!-- Standard English Conventions -->
        <div style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:8px;padding:12px">
          <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#9d174d;font-size:13px">
            <span>📐</span> Standard English 句子邊界、標點與修飾語
          </div>
          <div style="font-size:12px;color:#1e293b;margin:6px 0">
            <strong>句界三大鐵律：</strong>抓全句主要主詞與主動詞，切分獨立子句 (IC) 與從屬 (DC)
          </div>
          <div style="font-size:11px;color:#475569;background:#ffffff;padding:8px;border-radius:6px;border:1px dashed #db2777">
            • <strong>分號 (;)：</strong>等同句號，兩側必須為完整獨立子句 (IC; IC)<br>
            • <strong>冒號 (:)：</strong>前方必為完整獨立子句，後方引導同位解釋、列表或結果<br>
            • <strong>懸垂分詞：</strong>句首分詞片語 <code>Walking home, ...</code>，主句主詞必須是執行動作的邏輯主體！
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:#64748b;line-height:1.5">
        💡 <strong>Digital SAT 適性測驗決勝法：</strong>Module 1 前 15 題絕不可失誤，方能穩健躍入 Hard Module 2 爭取 750–800 分滿分梯隊！
      </div>
    </div>
  `;
}


// 21. 疑問句語序與情態助動詞結構圖 (Question & Modals Blueprint)
export function renderQuestionModalsBlueprint() {
  return `
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
  `;
}

// 22. 等立連接詞 (FANBOYS) 與從屬複句結構圖 (Conjunctions & Complex Sentences)
export function renderConjunctionsComplexSentencesDiagram() {
  return `
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
  `;
}

// 23. 聽力辨識、連音與語音線索圖 (Listening Acoustic Cues)
export function renderListeningConnectedSpeechDiagram() {
  return `
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
  `;
}

// 24. 大考衝刺極限配速與三層排雷圖 (Exam Pacing & Strategy)
export function renderExamStrategyDiagnosisDiagram() {
  return `
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
  `;
}

// 25. 長難句五步拆解樹與主幹提取圖 (Long Sentence Parsing)
export function renderLongSentenceParsingDiagram() {
  return `
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
  `;
}

// 26. 高中核心搭配詞同心圓網絡圖 (Collocation Network)
export function renderCollocationNetworkDiagram() {
  return `
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
  `;
}

// 27. 中譯英思維轉譯架構圖 (Translation Cognitive Shift)
export function renderTranslationCognitiveDiagram() {
  return `
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
  `;
}

// 28. 技高專業英文讀寫與工程實務圖 (Vocational ESP Technical)
export function renderVocationalESPTechnicalDiagram() {
  return `
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
  `;
}

// 29. 全民英檢 GEPT 全級別進階階梯圖 (GEPT Ladder)
export function renderGEPTMultiLevelLadderDiagram() {
  return `
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
  `;
}

// 30. TOEFL iBT 120 滿分四技能整合圖 (TOEFL Blueprint)
export function renderTOEFLIntegratedSkillsDiagram() {
  return `
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
  `;
}

// 31. 時間時鐘指針與作息圖 (Daily Routines & Telling Time)
export function renderDailyRoutinesTimeClockDiagram() {
  return `
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
  `;
}

// 32. 健康飲食與症狀關懷圖 (Food, Health & Symptoms)
export function renderFoodHealthPyramidDiagram() {
  return `
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
  `;
}

// 33. 世界節慶日曆與文化特色圖 (Festivals Calendar)
export function renderFestivalsCulturalCalendarDiagram() {
  return `
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
  `;
}

// 34. 頻率副詞百分比與 There is/are 圖 (Frequency Spectrum & Existence)
export function renderFrequencySpectrumExistenceDiagram() {
  return `
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
  `;
}

// 35. 過去進行式與 When/While 時間交錯軸 (Past Continuous Timeline)
export function renderPastContinuousTimelineDiagram() {
  return `
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
  `;
}

// 36. 附加問句反轉天平與間接問句直述語序圖 (Tag Questions & Indirect Questions)
export function renderTagAndIndirectQuestionsDiagram() {
  return `
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
  `;
}

// 37. 分裂句強調聚光燈圖 (Cleft Sentences Spotlight)
export function renderCleftSentenceSpotlightDiagram() {
  return `
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
  `;
}

// 38. 可數與不可數名詞天平圖 (Countability Balance)
export function renderCountabilityBalanceDiagram() {
  return `
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
  `;
}

// 39. 人稱代名詞與 be 動詞積木圖 (Be-Verb Building Blocks)
export function renderBeVerbBuildingBlocksDiagram() {
  return `
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
  `;
}

// 40. 第三人稱單數動詞與 Do/Does 照妖鏡圖 (Present Simple Do/Does)
export function renderPresentQuestionsDoDoesDiagram() {
  return `
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
  `;
}

// 41. 大學 EMI 全英語授課與學術簡報圖 (EMI Academic Presentation)
export function renderEMIAcademicPresentationDiagram() {
  return `
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
  `;
}

// 42. 終生英語學習飛輪圖 (Lifelong Learning Flywheel)
export function renderLifelongLearningFlywheelDiagram() {
  return `
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
  `;
}

// 43. 構詞學三段式解構圖 (Word Formation Morphology)
export function renderWordFormationMorphologyDiagram() {
  return `
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
  `;
}

// 44. 人稱代名詞五格轉換全景矩陣 (Pronouns Matrix)
export function renderPronounsMatrixDiagram() {
  return `
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
  `;
}

// 智能匹配主題最佳視覺圖表
export function renderTopicVisualChart(title = '') {
  const t = String(title ?? '');
  if (/toeic\b|多益|商務測驗/i.test(t)) return renderTOEICQuestionTypeStrategyMap();
  if (/sat\b|digital sat|學術英語/i.test(t)) return renderSATConstructBlueprint();
  if (/gre\b|gre general|語意與論證/i.test(t)) return renderGRESemanticPolarityChart();
  if (/gmat\b|gmat focus|批判推理/i.test(t)) return renderGMATCriticalReasoningTree();
  if (/toefl|托福/i.test(t)) return renderTOEFLIntegratedSkillsDiagram();
  if (/gept|全民英檢/i.test(t)) return renderGEPTMultiLevelLadderDiagram();
  if (/被動|passive/i.test(t)) return renderPassiveVoiceDiagram();
  if (/五大句型|句子骨架|sentence pattern|基本句型|動詞分類/i.test(t)) return renderFiveSentencePatternsDiagram();
  if (/長難句|句法.*拆解|complex sentence/i.test(t)) return renderLongSentenceParsingDiagram();
  if (/中譯英|翻譯|句子產出/i.test(t)) return renderTranslationCognitiveDiagram();
  if (/整卷衝刺|大考衝刺|學測.*統測|會考.*整合|訂正策略|會考.*a\+\+|cap a\+\+|頂標衝刺|素養總結|終極模擬|culminating|diagnostic trial|全真突破/i.test(t)) return renderExamStrategyDiagnosisDiagram();
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
  if (/健康飲食|身體部位|醫療照護/i.test(t)) return renderFoodHealthPyramidDiagram();
  if (/世界節慶|多元文化|festivals.*culture/i.test(t)) return renderFestivalsCulturalCalendarDiagram();
  if (/頻率副詞|there is|存在句|frequency/i.test(t)) return renderFrequencySpectrumExistenceDiagram();
  if (/過去進行|when.*while|過去式.*故事|過去式.*未來/i.test(t)) return renderPastContinuousTimelineDiagram();
  if (/附加問句|名詞子句|間接問句|tag question/i.test(t)) return renderTagAndIndirectQuestionsDiagram();
  if (/可數|不可數|量詞|countab|quantifier|名詞、冠詞與數量/i.test(t)) return renderCountabilityBalanceDiagram();
  if (/第一個完整句子|be 動詞.*句子|be-sentences|人稱代名詞/i.test(t)) return renderBeVerbBuildingBlocksDiagram();
  if (/日常動作.*第三人稱|三單|do \/ does|be 動詞、一般動詞/i.test(t)) return renderPresentQuestionsDoDoesDiagram();
  if (/大學.*emi|全英語授課|口頭簡報|academic.*presentation|科技英語|ai 論文|綠色能源/i.test(t)) return renderEMIAcademicPresentationDiagram();
  if (/終生.*學習|英語力全景|自主學習|lifelong/i.test(t)) return renderLifelongLearningFlywheelDiagram();
  if (/字首字尾|構詞|word building|affix|morphology/i.test(t)) return renderWordFormationMorphologyDiagram();
  if (/發音|音標|拼讀|phonics|vowel/i.test(t)) return renderPhonicsVowelSpectrumDiagram();
  if (/代名詞|所有格|pronoun/i.test(t)) return renderPronounsMatrixDiagram();
  if (/(?:時態|完成式|完成時|進行式|簡單式|未來|\btenses?\b|\bpast tense|\bfuture\b)/i.test(t) && !/food|health/i.test(t)) return renderTenseTimelineChart();
  if (/圖表|chart|multimodal/i.test(t)) return renderMultimodalDataChart();
  if (/論證|批判|假設|argument|critical/i.test(t)) return renderCriticalReasoningLogicDiagram();
  if (/作文|寫作|writing/i.test(t)) return renderBusinessEmailFlowDiagram();
  if (/篇章|段落|閱讀|reading/i.test(t)) return renderDiscourseTransitionsMap();
  return '';
}

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
