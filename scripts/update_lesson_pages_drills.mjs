import fs from 'node:fs';

const filePath = 'dist/lesson_pages.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update imports
const oldImport = "import { ANCHOR_DRILL_QUESTIONS, GRE_DRILL_TYPES, GMAT_DRILL_TYPES } from './exam_drill_data.mjs';";
const newImport = "import { ANCHOR_DRILL_QUESTIONS, TOEIC_DRILL_TYPES, SAT_DRILL_TYPES, GRE_DRILL_TYPES, GMAT_DRILL_TYPES } from './exam_drill_data.mjs';";
if (!content.includes(oldImport)) {
  throw new Error('Could not find oldImport in dist/lesson_pages.mjs');
}
content = content.replace(oldImport, newImport);

// 2. Replace examDrillState and helper functions up to renderExamDrillSuite
const oldDrillStateBlock = `export const examDrillState = {
  gre: { activeType: 'all', currentQ: null, userAnswer: null, pendingMulti: [], showHint: false, showExplain: false, totalAttempted: 0, totalCorrect: 0 },
  gmat: { activeType: 'all', currentQ: null, userAnswer: null, pendingMulti: [], showHint: false, showExplain: false, totalAttempted: 0, totalCorrect: 0 }
};

const DRILL_STORE = 'english-quest-exam-drills-v1';
try {
  const savedDrills = JSON.parse(localStorage.getItem(DRILL_STORE) || 'null');
  if (savedDrills && savedDrills.gre && savedDrills.gmat) {
    if (savedDrills.gre.totalAttempted !== undefined) {
      examDrillState.gre.totalAttempted = savedDrills.gre.totalAttempted;
      examDrillState.gre.totalCorrect = savedDrills.gre.totalCorrect;
    }
    if (savedDrills.gmat.totalAttempted !== undefined) {
      examDrillState.gmat.totalAttempted = savedDrills.gmat.totalAttempted;
      examDrillState.gmat.totalCorrect = savedDrills.gmat.totalCorrect;
    }
  }
} catch {}

function persistDrills() {
  try {
    localStorage.setItem(DRILL_STORE, JSON.stringify({
      gre: { totalAttempted: examDrillState.gre.totalAttempted, totalCorrect: examDrillState.gre.totalCorrect },
      gmat: { totalAttempted: examDrillState.gmat.totalAttempted, totalCorrect: examDrillState.gmat.totalCorrect }
    }));
  } catch {}
}

export function ensureDrillQuestion(cid) {
  const st = examDrillState[cid];
  if (!st) return null;
  if (!st.currentQ) {
    const types = cid === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
    const curType = types.find(t => t.id === st.activeType) || types[0];
    const pool = ANCHOR_DRILL_QUESTIONS.filter(q => q.category === cid);
    const matched = curType.filter ? pool.find(q => q.subtopic && q.subtopic.includes(curType.filter)) : pool[0];
    st.currentQ = matched || pool[0];
  }
  return st.currentQ;
}`;

const newDrillStateBlock = `export const examDrillState = {
  toeic: { activeType: 'all', currentQ: null, userAnswer: null, pendingMulti: [], showHint: false, showExplain: false, totalAttempted: 0, totalCorrect: 0 },
  sat: { activeType: 'all', currentQ: null, userAnswer: null, pendingMulti: [], showHint: false, showExplain: false, totalAttempted: 0, totalCorrect: 0 },
  gre: { activeType: 'all', currentQ: null, userAnswer: null, pendingMulti: [], showHint: false, showExplain: false, totalAttempted: 0, totalCorrect: 0 },
  gmat: { activeType: 'all', currentQ: null, userAnswer: null, pendingMulti: [], showHint: false, showExplain: false, totalAttempted: 0, totalCorrect: 0 }
};

const DRILL_STORE = 'english-quest-exam-drills-v1';
try {
  const savedDrills = JSON.parse(localStorage.getItem(DRILL_STORE) || 'null');
  if (savedDrills) {
    for (const k of ['toeic', 'sat', 'gre', 'gmat']) {
      if (savedDrills[k] && savedDrills[k].totalAttempted !== undefined) {
        examDrillState[k].totalAttempted = savedDrills[k].totalAttempted;
        examDrillState[k].totalCorrect = savedDrills[k].totalCorrect;
      }
    }
  }
} catch {}

function persistDrills() {
  try {
    const payload = {};
    for (const k of ['toeic', 'sat', 'gre', 'gmat']) {
      payload[k] = { totalAttempted: examDrillState[k].totalAttempted, totalCorrect: examDrillState[k].totalCorrect };
    }
    localStorage.setItem(DRILL_STORE, JSON.stringify(payload));
  } catch {}
}

export function getExamDrillMeta(cid) {
  switch (cid) {
    case 'toeic':
      return {
        types: TOEIC_DRILL_TYPES,
        themeColor: '#d97706',
        themeLight: '#fef3c7',
        title: '🏢 TOEIC 多益商務核心題型實戰演練專區',
        badge: 'Part 5–7 題庫 3,000 題動態抽測'
      };
    case 'sat':
      return {
        types: SAT_DRILL_TYPES,
        themeColor: '#6366f1',
        themeLight: '#e0e7ff',
        title: '🎓 Digital SAT 學術核心題型實戰演練專區',
        badge: 'Craft / Evidence / Conventions 題庫 3,000 題'
      };
    case 'gre':
      return {
        types: GRE_DRILL_TYPES,
        themeColor: '#e11d48',
        themeLight: '#fff1f2',
        title: '🏛️ GRE Verbal 核心題型實戰演練專區',
        badge: 'TC / SE / RC 題庫 3,000 題動態抽測'
      };
    case 'gmat':
      return {
        types: GMAT_DRILL_TYPES,
        themeColor: '#0891b2',
        themeLight: '#ecfeff',
        title: '⚖️ GMAT Focus 批判推理實戰演練專區',
        badge: 'CR / Data Insights 題庫 3,000 題動態抽測'
      };
    default:
      return null;
  }
}

export function ensureDrillQuestion(cid) {
  const st = examDrillState[cid];
  if (!st) return null;
  if (!st.currentQ) {
    const meta = getExamDrillMeta(cid);
    const types = meta ? meta.types : [];
    const curType = types.find(t => t.id === st.activeType) || types[0] || { filter: '' };
    const pool = ANCHOR_DRILL_QUESTIONS.filter(q => q.category === cid);
    const matched = curType.filter ? pool.find(q => q.subtopic && q.subtopic.includes(curType.filter)) : pool[0];
    st.currentQ = matched || pool[0];
  }
  return st.currentQ;
}`;

// Normalize line breaks for matching
const normContent = content.replace(/\r\n/g, '\n');
const normOldBlock = oldDrillStateBlock.replace(/\r\n/g, '\n');
if (!normContent.includes(normOldBlock)) {
  throw new Error('Could not find oldDrillStateBlock');
}
content = normContent.replace(normOldBlock, newDrillStateBlock.replace(/\r\n/g, '\n'));

// 3. Update renderExamDrillSuite header & colors
const oldSuiteHeader = `export function renderExamDrillSuite(cid) {
  const st = examDrillState[cid];
  if (!st) return '';
  const q = ensureDrillQuestion(cid);
  if (!q) return '';
  const types = cid === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
  const isMulti = q.selectCount === 2 || (Array.isArray(q.answer) && q.answer.length === 2);
  const themeColor = cid === 'gre' ? '#e11d48' : '#0891b2';
  const themeLight = cid === 'gre' ? '#fff1f2' : '#ecfeff';`;

const newSuiteHeader = `export function renderExamDrillSuite(cid) {
  const st = examDrillState[cid];
  if (!st) return '';
  const meta = getExamDrillMeta(cid);
  if (!meta) return '';
  const q = ensureDrillQuestion(cid);
  if (!q) return '';
  const types = meta.types;
  const isMulti = q.selectCount === 2 || (Array.isArray(q.answer) && q.answer.length === 2);
  const themeColor = meta.themeColor;
  const themeLight = meta.themeLight;`;

content = content.replace(oldSuiteHeader.replace(/\r\n/g, '\n'), newSuiteHeader.replace(/\r\n/g, '\n'));

// Update title in renderExamDrillSuite
const oldSuiteTitle = `<h3 style="margin:0;font-size:18px;color:#0f172a">
              \${cid === 'gre' ? '🏛️ GRE Verbal' : '⚖️ GMAT Focus'} 核心題型實戰演練專區
            </h3>
            <span class="pill" style="font-size:11px;background:\${themeLight};color:\${themeColor};font-weight:700">
              題庫 3,000 題動態抽測
            </span>`;

const newSuiteTitle = `<h3 style="margin:0;font-size:18px;color:#0f172a">
              \${e(meta.title)}
            </h3>
            <span class="pill" style="font-size:11px;background:\${themeLight};color:\${themeColor};font-weight:700">
              \${e(meta.badge)}
            </span>`;

content = content.replace(oldSuiteTitle.replace(/\r\n/g, '\n'), newSuiteTitle.replace(/\r\n/g, '\n'));

// Update handleExamDrillClick drillType handler
const oldClickHandler1 = `const types = examId === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
    const curType = types.find(t => t.id === st.activeType) || types[0];
    const filter = curType.filter || '';`;

const newClickHandler1 = `const meta = getExamDrillMeta(examId);
    const types = meta ? meta.types : [];
    const curType = types.find(t => t.id === st.activeType) || types[0] || { filter: '' };
    const filter = curType.filter || '';`;

content = content.replace(oldClickHandler1.replace(/\r\n/g, '\n'), newClickHandler1.replace(/\r\n/g, '\n'));

// Update handleExamDrillClick next handler
const oldClickHandler2 = `const types = examId === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
      const curType = types.find(t => t.id === st.activeType) || types[0];
      const filter = curType.filter || '';`;

const newClickHandler2 = `const meta = getExamDrillMeta(examId);
      const types = meta ? meta.types : [];
      const curType = types.find(t => t.id === st.activeType) || types[0] || { filter: '' };
      const filter = curType.filter || '';`;

content = content.replace(oldClickHandler2.replace(/\r\n/g, '\n'), newClickHandler2.replace(/\r\n/g, '\n'));

// Update teachingChapter to include all 4 exams
const oldCall = "${(cid==='gre'||cid==='gmat')?renderExamDrillSuite(cid):''}";
const newCall = "${['toeic', 'sat', 'gre', 'gmat'].includes(cid)?renderExamDrillSuite(cid):''}";
if (!content.includes(oldCall)) {
  throw new Error('Could not find oldCall in teachingChapter');
}
content = content.replace(oldCall, newCall);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated dist/lesson_pages.mjs!');
