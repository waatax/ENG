import fs from 'node:fs';

const filePath = 'dist/lesson_visuals.mjs';
let content = fs.readFileSync(filePath, 'utf8');

const toeicVisual = `// TOEIC 多益核心題型破題心智地圖
export function renderTOEICQuestionTypeStrategyMap() {
  return \`
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
  \`;
}

// Digital SAT 雙模組三大領域解題架構藍圖
export function renderSATConstructBlueprint() {
  return \`
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
  \`;
}
`;

// Insert before renderTopicVisualChart
const insertIdx = content.indexOf('// 智能匹配主題最佳視覺圖表');
if (insertIdx === -1) {
  throw new Error('Could not find renderTopicVisualChart anchor');
}

content = content.slice(0, insertIdx) + toeicVisual + '\n' + content.slice(insertIdx);

// Update renderTopicVisualChart routing
const oldRoute = `export function renderTopicVisualChart(title = '') {
  const t = String(title ?? '');
  if (/gre\\b|gre general|語意與論證/i.test(t)) return renderGRESemanticPolarityChart();
  if (/gmat\\b|gmat focus|批判推理/i.test(t)) return renderGMATCriticalReasoningTree();`;

const newRoute = `export function renderTopicVisualChart(title = '') {
  const t = String(title ?? '');
  if (/toeic\\b|多益|商務測驗/i.test(t)) return renderTOEICQuestionTypeStrategyMap();
  if (/sat\\b|digital sat|學術英語/i.test(t)) return renderSATConstructBlueprint();
  if (/gre\\b|gre general|語意與論證/i.test(t)) return renderGRESemanticPolarityChart();
  if (/gmat\\b|gmat focus|批判推理/i.test(t)) return renderGMATCriticalReasoningTree();`;

if (!content.includes(oldRoute)) {
  throw new Error('Could not find oldRoute in content');
}

content = content.replace(oldRoute, newRoute);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated dist/lesson_visuals.mjs!');
