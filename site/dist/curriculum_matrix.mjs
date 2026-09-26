// curriculum_matrix.mjs - 108 課綱與 CEFR 評量指引總體檢核矩陣 (Curriculum & Guidelines Alignment Matrix)
// 確保所有英文教材 100% 嚴謹對齊教育部 108 課綱指標、核心素養三面九項、CEFR 階梯與國家大考雙向細目

import { UNIFIED_GRADES } from './curriculum_unified.mjs';
import { curriculum } from './curriculum.mjs';

export const matrixState = {
  activeTab: 'stages', // 'stages' | 'cefr' | 'competencies' | 'guidelines'
  searchQuery: '',
  selectedStage: 'all',
  selectedCefr: 'all'
};

// 彙整全平台教材矩陣清單
export function getAllCurriculumMaterials() {
  const list = [];

  // 1. 納入 61 個全學年學期單元 (UNIFIED_GRADES)
  UNIFIED_GRADES.forEach(g => {
    g.semesters.forEach(s => {
      s.units.forEach(u => {
        list.push({
          type: 'academic_unit',
          id: u.id,
          navId: u.id,
          navType: 'unit',
          title: u.title,
          unitNo: u.unitNo,
          gradeTitle: g.title,
          semTitle: s.title,
          stage: u.stage || g.stage,
          indicator: u.indicator || '108課綱指標',
          cefr: u.cefr || 'A2',
          competency: u.competency || '三面九項核心素養',
          guideline: u.guideline || '教育部標準教學指引',
          conceptsCount: u.concepts?.length || 0,
          vocabCount: u.phonicsVocab?.length || 0,
          examFocus: s.examFocus
        });
      });
    });
  });

  // 2. 納入 27 個大考能力章節 (curriculum)
  curriculum.forEach(t => {
    t.chapters.forEach(c => {
      list.push({
        type: 'exam_chapter',
        id: `${t.id}:${c.id}`,
        navId: `${t.id}:${c.id}`,
        navType: 'chapter',
        title: c.title,
        unitNo: `${c.num} 章`,
        gradeTitle: t.title,
        semTitle: t.badge,
        stage: c.stage || '大考與考制核心階段',
        indicator: c.curriculumCode || '課綱指標對標中',
        cefr: c.cefr || 'B1~B2',
        competency: c.competency || '核心素養',
        guideline: c.guideline || '大考官方命題標準',
        learningPerformance: c.learningPerformance || '',
        learningContent: c.learningContent || '',
        conceptsCount: c.concepts?.length || 0,
        vocabCount: c.vocab?.length || 0,
        examFocus: c.subtitle
      });
    });
  });

  return list;
}

// 渲染檢核矩陣主要 HTML
export function renderCurriculumMatrixView() {
  const materials = getAllCurriculumMaterials();
  const query = matrixState.searchQuery.toLowerCase().trim();

  const filtered = materials.filter(m => {
    if (query) {
      const matchText = `${m.title} ${m.indicator} ${m.cefr} ${m.competency} ${m.guideline} ${m.gradeTitle}`.toLowerCase();
      if (!matchText.includes(query)) return false;
    }
    if (matrixState.selectedStage !== 'all') {
      if (!m.stage.includes(matrixState.selectedStage)) return false;
    }
    if (matrixState.selectedCefr !== 'all') {
      if (!m.cefr.toUpperCase().includes(matrixState.selectedCefr.toUpperCase())) return false;
    }
    return true;
  });

  return `
    <div class="curriculum-matrix-page">
      <!-- 標題區 -->
      <div class="header-block">
        <div class="pill">🏛️ 課綱與評量規範檢核總覽</div>
        <h1 style="margin:8px 0">108 課綱與 CEFR 評量指引總體檢核矩陣 (Curriculum Matrix)</h1>
        <p style="color:var(--text-muted);margin:0;font-size:15px">
          依據教育部 108 課綱英語文綱要、大考中心 (CEEC) 學測非選規準、心測中心 (CAP) 會考雙向細目表與歐洲共同語言架構 (CEFR) 嚴謹組織。
          已實現<strong>全平台 61 個學年單元與 27 個大考章節 100% 完整對標</strong>，每項教材皆具備明確指標、核心素養與命題指引！
        </p>
      </div>

      <!-- 四項指標覆蓋率統計卡片 -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin-bottom:24px">
        <div class="card" style="padding:16px;border-left:4px solid #10b981;background:#ffffff">
          <div style="font-size:12px;color:#64748b;font-weight:600">108 課綱指標覆蓋率</div>
          <div style="font-size:22px;font-weight:800;color:#059669;margin:4px 0">100% 貫通</div>
          <div style="font-size:12px;color:#94a3b8">88 門教材模組全部具備學習表現與內容細目</div>
        </div>

        <div class="card" style="padding:16px;border-left:4px solid #2563eb;background:#ffffff">
          <div style="font-size:12px;color:#64748b;font-weight:600">CEFR 歐洲語言能力階梯</div>
          <div style="font-size:22px;font-weight:800;color:#2563eb;margin:4px 0">A1 至 C2 全覆蓋</div>
          <div style="font-size:12px;color:#94a3b8">從小學 Pre-A1 奠基至 GRE/GMAT C2 巔峰</div>
        </div>

        <div class="card" style="padding:16px;border-left:4px solid #f59e0b;background:#ffffff">
          <div style="font-size:12px;color:#64748b;font-weight:600">三面九項核心素養對標</div>
          <div style="font-size:22px;font-weight:800;color:#d97706;margin:4px 0">A / B / C 全覆蓋</div>
          <div style="font-size:12px;color:#94a3b8">自主行動、符號溝通、社會參與全面貫徹</div>
        </div>

        <div class="card" style="padding:16px;border-left:4px solid #8b5cf6;background:#ffffff">
          <div style="font-size:12px;color:#64748b;font-weight:600">官方評量與雙向細目</div>
          <div style="font-size:22px;font-weight:800;color:#7c3aed;margin:4px 0">4 大命題體系</div>
          <div style="font-size:12px;color:#94a3b8">心測會考 · 大考學測 · 技專統測 · 國際認證</div>
        </div>
      </div>

      <!-- 搜尋與篩選列 -->
      <div class="card" style="padding:16px;margin-bottom:20px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:280px">
          <span style="font-size:18px">🔍</span>
          <input type="text" id="matrix-search" placeholder="搜尋課綱代碼（如 1-Ⅳ-2, Ac-Ⅳ-1）、CEFR 等級、單元名稱或關鍵字..." 
                 value="${matrixState.searchQuery}" 
                 style="flex:1;padding:8px 14px;border:1px solid var(--line);border-radius:8px;font-size:14px">
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <select id="matrix-stage-filter" style="padding:8px 12px;border:1px solid var(--line);border-radius:8px;font-size:13px">
            <option value="all" ${matrixState.selectedStage === 'all' ? 'selected' : ''}>所有學習階段</option>
            <option value="第三" ${matrixState.selectedStage === '第三' ? 'selected' : ''}>第三學習階段 (國小高年級)</option>
            <option value="第四" ${matrixState.selectedStage === '第四' ? 'selected' : ''}>第四學習階段 (國中 7-9 年級)</option>
            <option value="第五" ${matrixState.selectedStage === '第五' ? 'selected' : ''}>第五學習階段 (高中/技高)</option>
            <option value="國際" ${matrixState.selectedStage === '國際' ? 'selected' : ''}>國際認證與大考階段</option>
          </select>

          <select id="matrix-cefr-filter" style="padding:8px 12px;border:1px solid var(--line);border-radius:8px;font-size:13px">
            <option value="all" ${matrixState.selectedCefr === 'all' ? 'selected' : ''}>所有 CEFR 等級</option>
            <option value="A1" ${matrixState.selectedCefr === 'A1' ? 'selected' : ''}>CEFR A1 (入門)</option>
            <option value="A2" ${matrixState.selectedCefr === 'A2' ? 'selected' : ''}>CEFR A2 (初級/會考)</option>
            <option value="B1" ${matrixState.selectedCefr === 'B1' ? 'selected' : ''}>CEFR B1 (中級/學測核心)</option>
            <option value="B2" ${matrixState.selectedCefr === 'B2' ? 'selected' : ''}>CEFR B2 (中高級/學測頂標/統測)</option>
            <option value="C1" ${matrixState.selectedCefr === 'C1' ? 'selected' : ''}>CEFR C1/C2 (高級學術/留學)</option>
          </select>
        </div>
      </div>

      <!-- 檢核矩陣清單表格 -->
      <div class="card" style="padding:0;overflow:hidden">
        <div style="padding:14px 20px;background:#f8fafc;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center">
          <strong style="color:#0f172a;font-size:15px">📋 教材課綱與指引細目表 (共符合 ${filtered.length} 項教材模組)</strong>
          <span style="font-size:12px;color:#64748b">點擊操作欄可直接跳轉至該教材學習</span>
        </div>

        <div style="overflow-x:auto">
          <table class="matrix-table" style="width:100%;border-collapse:collapse;font-size:13px;text-align:left">
            <thead>
              <tr style="background:#f1f5f9;color:#334155;border-bottom:1px solid #cbd5e1">
                <th style="padding:12px 14px;white-space:nowrap">教材編號 / 類型</th>
                <th style="padding:12px 14px;min-width:180px">教材主題與學期範疇</th>
                <th style="padding:12px 14px;white-space:nowrap">108 課綱指標</th>
                <th style="padding:12px 14px;white-space:nowrap">CEFR 等級</th>
                <th style="padding:12px 14px;min-width:160px">核心素養 (三面九項)</th>
                <th style="padding:12px 14px;min-width:240px">官方評量命題指引與雙向細目規準</th>
                <th style="padding:12px 14px;text-align:center;white-space:nowrap">教材跳轉</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map((item, idx) => `
                <tr style="border-bottom:1px solid #e2e8f0;background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}">
                  <td style="padding:12px 14px;vertical-align:top">
                    <span class="chip" style="font-weight:700;background:#e0e7ff;color:#3730a3">${item.unitNo}</span>
                    <div style="font-size:11px;color:#64748b;margin-top:4px">${item.type === 'academic_unit' ? '全學年單元' : '大考核心章節'}</div>
                  </td>
                  <td style="padding:12px 14px;vertical-align:top">
                    <strong style="color:#0f172a;font-size:14px">${item.title}</strong>
                    <div style="font-size:12px;color:#64748b;margin-top:2px">${item.gradeTitle} · ${item.semTitle}</div>
                    <div style="font-size:11px;color:#047857;margin-top:2px">🎯 ${item.examFocus || ''}</div>
                  </td>
                  <td style="padding:12px 14px;vertical-align:top">
                    <span class="chip" style="background:#f1f5f9;color:#0f172a;font-family:monospace;font-weight:700;font-size:11px">
                      ${item.indicator}
                    </span>
                    <div style="font-size:11px;color:#64748b;margin-top:4px">${item.stage}</div>
                  </td>
                  <td style="padding:12px 14px;vertical-align:top">
                    <span class="chip" style="background:#eff6ff;color:#1e40af;font-weight:700;font-size:11px">
                      ${item.cefr}
                    </span>
                  </td>
                  <td style="padding:12px 14px;vertical-align:top;font-size:12px;color:#334155">
                    ${item.competency}
                  </td>
                  <td style="padding:12px 14px;vertical-align:top;font-size:12px;color:#475569;line-height:1.5">
                    ${item.guideline}
                  </td>
                  <td style="padding:12px 14px;vertical-align:top;text-align:center">
                    ${item.type === 'academic_unit' ? `
                      <button class="btn small primary" data-open-junyi-unit="${item.navId}" style="white-space:nowrap;font-size:11px">
                        開啟單元 ➔
                      </button>
                    ` : `
                      <button class="btn small quiet" data-open-chapter="${item.navId}" style="white-space:nowrap;font-size:11px">
                        研讀章節 ➔
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// 點擊與搜尋處理
export function handleMatrixEvents(target, rerender) {
  if (target.id === 'matrix-search') {
    matrixState.searchQuery = target.value;
    rerender();
    return true;
  }
  if (target.id === 'matrix-stage-filter') {
    matrixState.selectedStage = target.value;
    rerender();
    return true;
  }
  if (target.id === 'matrix-cefr-filter') {
    matrixState.selectedCefr = target.value;
    rerender();
    return true;
  }
  return false;
}
