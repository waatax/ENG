import { renderTeachingAid } from './teaching_aids.mjs';
import { curriculum } from './curriculum.mjs';
import { workshops } from './lesson_workshops.mjs';
import { UNIFIED_GRADES } from './curriculum_unified.mjs';
import { sixthLessons, sixthQuestions } from './sixth_assets.mjs';
import { jhUnits, jhCases } from './jh_assets.mjs';
import { archSemesters } from './arch_semesters.mjs';
import { archTenseModules, archSentencePillars, archPartsOfSpeech, archPhoneticItems, archDictCodes } from './arch_prerequisites.mjs';
import { renderDuolingoHeroBanner, renderDuolingoGameView, duolingoState, handleDuolingoClick, isDuolingoEligible } from './duolingo_game.mjs';
import { getSmartVisualDiagram, renderPhonicsTipBox, renderFlashcardBridgeBox } from './lesson_visuals.mjs';
import { ANCHOR_DRILL_QUESTIONS, GRE_DRILL_TYPES, GMAT_DRILL_TYPES } from './exam_drill_data.mjs';

export const escapeText=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const e=escapeText;
const STORE='english-quest-lesson-evidence-v1';
let progress={answers:{},drafts:{},revealed:{}};
let storageWarning='';
try{const p=JSON.parse(localStorage.getItem(STORE)||'null');if(p&&p.answers&&p.drafts&&p.revealed)progress=p;}catch{storageWarning='本機儲存不可用；離開後作答可能不會保留。';}
function persist(){try{localStorage.setItem(STORE,JSON.stringify(progress));}catch{storageWarning='儲存失敗，請先複製你的作答。';}}

export const examDrillState = {
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
}

export function renderExamDrillSuite(cid) {
  const st = examDrillState[cid];
  if (!st) return '';
  const q = ensureDrillQuestion(cid);
  if (!q) return '';
  const types = cid === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
  const isMulti = q.selectCount === 2 || (Array.isArray(q.answer) && q.answer.length === 2);
  const themeColor = cid === 'gre' ? '#e11d48' : '#0891b2';
  const themeLight = cid === 'gre' ? '#fff1f2' : '#ecfeff';
  const isAnswered = st.userAnswer !== null;

  let isCorrect = false;
  if (isAnswered) {
    if (isMulti) {
      const u = Array.isArray(st.userAnswer) ? [...st.userAnswer].sort((a,b)=>a-b) : [];
      const a = Array.isArray(q.answer) ? [...q.answer].sort((a,b)=>a-b) : [q.answer];
      isCorrect = u.length === a.length && u.every((v, i) => v === a[i]);
    } else {
      isCorrect = st.userAnswer === q.answer;
    }
  }

  const correctLabel = Array.isArray(q.answer)
    ? q.answer.map(i => `${String.fromCharCode(65 + i)}. ${q.options[i]}`).join(' 與 ')
    : `${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`;

  const accPercent = st.totalAttempted ? Math.round((st.totalCorrect / st.totalAttempted) * 100) : 0;

  return `
    <section class="card lesson-drill-suite" style="margin-top:24px;border:2px solid ${themeColor};border-radius:12px;padding:20px;background:#ffffff;box-shadow:0 4px 14px rgba(0,0,0,0.05)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div>
          <div style="display:flex;align-items:center;gap:8px">
            <h3 style="margin:0;font-size:18px;color:#0f172a">
              ${cid === 'gre' ? '🏛️ GRE Verbal' : '⚖️ GMAT Focus'} 核心題型實戰演練專區
            </h3>
            <span class="pill" style="font-size:11px;background:${themeLight};color:${themeColor};font-weight:700">
              題庫 3,000 題動態抽測
            </span>
          </div>
          <p style="margin:4px 0 0;font-size:13px;color:#64748b">
            精選題型演練，即時核對作答、揭示提示與詳解，點擊按鈕即可隨機抽取題庫新題！
          </p>
        </div>
        <div style="font-size:12px;color:#334155;background:#f8fafc;padding:6px 14px;border-radius:8px;border:1px solid #e2e8f0">
          📊 實戰累積：已練習 <strong>${st.totalAttempted}</strong> 題 · 正確率 <strong>${accPercent}%</strong> (${st.totalCorrect}/${st.totalAttempted})
        </div>
      </div>

      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px" aria-label="題型篩選">
        ${types.map(t => `
          <button type="button" class="btn ${st.activeType === t.id ? 'primary' : 'quiet'}" data-drill-type="${t.id}" data-drill-exam="${cid}" style="font-size:12px;padding:5px 12px;border-radius:20px;border:${st.activeType === t.id ? 'none' : '1px solid #cbd5e1'}">
            ${e(t.label)}
          </button>
        `).join('')}
      </div>

      <div class="drill-question-card" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px">
          <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3;font-weight:700">
            ${e(q.subtopic || (cid === 'gre' ? 'GRE Verbal Reasoning' : 'GMAT Critical Reasoning'))}
          </span>
          <span style="font-size:11px;color:#94a3b8">真題編號：#${e(q.id)}</span>
        </div>

        ${q.passage ? `
          <div class="drill-passage" style="background:#ffffff;border-left:4px solid #3b82f6;padding:12px 16px;border-radius:6px;margin-bottom:12px;font-size:13.5px;line-height:1.65;color:#1e293b;white-space:pre-wrap">
            ${e(q.passage)}
          </div>
        ` : ''}

        <div style="font-size:15px;font-weight:600;color:#0f172a;line-height:1.6;margin-bottom:14px">
          ${isMulti ? '【六選二·雙選等價題】' : ''}${e(q.prompt)}
        </div>

        <div style="display:grid;grid-template-columns:1fr;gap:8px">
          ${q.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            if (isMulti) {
              const isSelected = (st.pendingMulti || []).includes(i);
              const inFinal = Array.isArray(st.userAnswer) && st.userAnswer.includes(i);
              const isCorrectOpt = Array.isArray(q.answer) && q.answer.includes(i);
              let btnBg = '#ffffff', btnBorder = '#cbd5e1', btnColor = '#0f172a';
              if (isAnswered) {
                if (isCorrectOpt) { btnBg = '#ecfdf5'; btnBorder = '#10b981'; btnColor = '#047857'; }
                else if (inFinal) { btnBg = '#fef2f2'; btnBorder = '#ef4444'; btnColor = '#b91c1c'; }
              } else if (isSelected) {
                btnBg = '#e0e7ff'; btnBorder = '#6366f1'; btnColor = '#3730a3';
              }
              return `
                <button type="button" class="btn quiet" data-drill-toggle-multi="${i}" data-drill-exam="${cid}" ${isAnswered ? 'disabled' : ''} style="text-align:left;padding:10px 14px;background:${btnBg};border:2px solid ${btnBorder};color:${btnColor};border-radius:8px;font-size:14px;display:flex;align-items:center;gap:10px">
                  <span style="font-weight:700;min-width:24px">${isSelected ? '☑' : '☐'} ${letter}.</span>
                  <span>${e(opt)}</span>
                </button>
              `;
            } else {
              const isSelected = st.userAnswer === i;
              const isCorrectOpt = q.answer === i;
              let btnBg = '#ffffff', btnBorder = '#cbd5e1', btnColor = '#0f172a';
              if (isAnswered) {
                if (isCorrectOpt) { btnBg = '#ecfdf5'; btnBorder = '#10b981'; btnColor = '#047857'; }
                else if (isSelected) { btnBg = '#fef2f2'; btnBorder = '#ef4444'; btnColor = '#b91c1c'; }
              }
              return `
                <button type="button" class="btn quiet" data-drill-choice="${i}" data-drill-exam="${cid}" ${isAnswered ? 'disabled' : ''} style="text-align:left;padding:10px 14px;background:${btnBg};border:2px solid ${btnBorder};color:${btnColor};border-radius:8px;font-size:14px;display:flex;align-items:center;gap:10px">
                  <span style="font-weight:700;min-width:24px">${letter}.</span>
                  <span>${e(opt)}</span>
                </button>
              `;
            }
          }).join('')}
        </div>

        ${isMulti ? `
          <div style="margin-top:12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <button type="button" class="btn primary small" data-drill-submit-multi="true" data-drill-exam="${cid}" ${isAnswered || (st.pendingMulti || []).length !== 2 ? 'disabled' : ''} style="padding:8px 16px">
              提交雙選答案 (已選 ${(st.pendingMulti || []).length}/2)
            </button>
            <span style="font-size:12px;color:#64748b">請恰好勾選 2 個符合題意且填入後語意完全等價之選項。</span>
          </div>
        ` : ''}
      </div>

      ${isAnswered ? `
        <div style="background:${isCorrect ? '#ecfdf5' : '#fef2f2'};border:1px solid ${isCorrect ? '#86efac' : '#fecaca'};border-radius:8px;padding:12px 16px;margin-bottom:14px">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:20px">${isCorrect ? '🎉' : '⚠️'}</span>
            <strong style="color:${isCorrect ? '#15803d' : '#b91c1c'};font-size:14px">
              ${isCorrect ? '答對了！恭喜精準掌握此題型之邏輯結構！(+15 XP)' : '答案需要修正，請參閱下方深入解析。'}
            </strong>
          </div>
          <div style="font-size:13px;color:#334155;margin-top:6px">
            正解：<strong>${e(correctLabel)}</strong>
          </div>
        </div>
      ` : ''}

      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <button type="button" class="btn small quiet" data-drill-action="hint" data-drill-exam="${cid}">
          💡 ${st.showHint ? '隱藏提示' : '查看解題提示'}
        </button>
        <button type="button" class="btn small quiet" data-drill-action="explain" data-drill-exam="${cid}">
          📖 ${st.showExplain ? '隱藏深度解析' : '查看深度破題思維'}
        </button>
        <button type="button" class="btn small secondary" data-drill-action="next" data-drill-exam="${cid}" style="margin-left:auto">
          🔄 隨機抽取新題練習 ➔
        </button>
      </div>

      ${st.showHint && q.hint ? `
        <div class="drill-hint-box" style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin-top:12px;font-size:13px;color:#92400e;line-height:1.5">
          <strong>💡 破題思考指引：</strong>${e(q.hint)}
        </div>
      ` : ''}

      ${st.showExplain && q.explain ? `
        <div class="drill-explain-box" style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:14px 18px;margin-top:12px;font-size:13px;color:#1e40af;line-height:1.65;white-space:pre-wrap">
          <strong>📖 深度破題思維與邏輯解析：</strong>\n${e(q.explain)}
        </div>
      ` : ''}
    </section>
  `;
}

export function handleExamDrillClick(button, rerender) {
  const d = button.dataset;
  const examId = d.drillExam;
  if (!examId || !examDrillState[examId]) return false;
  const st = examDrillState[examId];

  if (d.drillType) {
    st.activeType = d.drillType;
    st.userAnswer = null;
    st.pendingMulti = [];
    st.showHint = false;
    st.showExplain = false;

    const types = examId === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
    const curType = types.find(t => t.id === st.activeType) || types[0];
    const filter = curType.filter || '';

    if (typeof window !== 'undefined' && window.questionDB) {
      window.questionDB.sampleQuestions(examId, 1, filter).then(qs => {
        if (qs && qs.length) {
          st.currentQ = qs[0];
          rerender();
        }
      }).catch(() => {});
    }

    const pool = ANCHOR_DRILL_QUESTIONS.filter(q => q.category === examId);
    const matched = filter ? pool.find(q => q.subtopic && q.subtopic.includes(filter)) : pool[0];
    st.currentQ = matched || pool[0];

    rerender();
    return true;
  }

  if (d.drillChoice !== undefined) {
    if (st.userAnswer === null && st.currentQ) {
      const choice = Number(d.drillChoice);
      st.userAnswer = choice;
      st.totalAttempted++;
      if (choice === st.currentQ.answer) {
        st.totalCorrect++;
        if (typeof window !== 'undefined' && window.junyi) {
          window.junyi.addXp(15);
        }
      }
      persistDrills();
      rerender();
    }
    return true;
  }

  if (d.drillToggleMulti !== undefined) {
    if (st.userAnswer === null) {
      const idx = Number(d.drillToggleMulti);
      if (!st.pendingMulti) st.pendingMulti = [];
      const pos = st.pendingMulti.indexOf(idx);
      if (pos >= 0) {
        st.pendingMulti.splice(pos, 1);
      } else {
        if (st.pendingMulti.length < 2) {
          st.pendingMulti.push(idx);
        } else {
          st.pendingMulti[1] = idx;
        }
      }
      rerender();
    }
    return true;
  }

  if (d.drillSubmitMulti) {
    if (st.userAnswer === null && st.currentQ && (st.pendingMulti || []).length === 2) {
      const sorted = [...st.pendingMulti].sort((a,b)=>a-b);
      st.userAnswer = sorted;
      st.totalAttempted++;
      const correctAns = Array.isArray(st.currentQ.answer) ? [...st.currentQ.answer].sort((a,b)=>a-b) : [st.currentQ.answer];
      const isCor = sorted.length === correctAns.length && sorted.every((v,i) => v === correctAns[i]);
      if (isCor) {
        st.totalCorrect++;
        if (typeof window !== 'undefined' && window.junyi) {
          window.junyi.addXp(25);
        }
      }
      persistDrills();
      rerender();
    }
    return true;
  }

  if (d.drillAction) {
    if (d.drillAction === 'hint') {
      st.showHint = !st.showHint;
      rerender();
      return true;
    }
    if (d.drillAction === 'explain') {
      st.showExplain = !st.showExplain;
      rerender();
      return true;
    }
    if (d.drillAction === 'next') {
      st.userAnswer = null;
      st.pendingMulti = [];
      st.showHint = false;
      st.showExplain = false;

      const types = examId === 'gre' ? GRE_DRILL_TYPES : GMAT_DRILL_TYPES;
      const curType = types.find(t => t.id === st.activeType) || types[0];
      const filter = curType.filter || '';

      if (typeof window !== 'undefined' && window.questionDB) {
        window.questionDB.sampleQuestions(examId, 1, filter).then(qs => {
          if (qs && qs.length) {
            st.currentQ = qs[0];
            rerender();
          }
        }).catch(() => {});
      } else {
        const pool = ANCHOR_DRILL_QUESTIONS.filter(q => q.category === examId);
        const filtered = filter ? pool.filter(q => q.subtopic && q.subtopic.includes(filter)) : pool;
        const candidates = filtered.length ? filtered : pool;
        const nextQ = candidates[Math.floor(Math.random() * candidates.length)];
        st.currentQ = nextQ;
      }
      rerender();
      return true;
    }
  }

  return false;
}
export function cleanText(text){let s=String(text??'');for(let i=0;i<5;i++)s=s.replace(/\\textcolor\{#[\da-fA-F]{6}\}\{([^{}]*)\}/g,'$1').replace(/\\(?:textbf|text|mathrm)\{([^{}]*)\}/g,'$1');return s.replace(/#[\da-fA-F]{6}(?=[\u3400-\u9fff\dA-Za-z])/g,'').replace(/\\%/g,'%').replace(/\$\$?/g,'').replace(/!\[[^\]]*\]\([^)]*\)/g,'').replace(/\\(?:quad|qquad)/g,' ');}
const inline=s=>e(cleanText(s)).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
export function textBlocks(text){const lines=cleanText(text).split('\n');let html='',table=[],code=[],inCode=false;function flush(){if(!table.length)return;const cells=table.filter(l=>!/^\|?\s*:?-{2,}/.test(l)).map(l=>l.trim().replace(/^\||\|$/g,'').split('|'));html+=`<div class="lesson-table"><table>${cells.map((r,i)=>`<tr>${r.map(c=>`<${i?'td':'th'}>${inline(c)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</table></div>`;table=[];}
for(const line of lines){if(line.startsWith('```')){flush();if(inCode){html+=`<pre>${e(code.join('\n'))}</pre>`;code=[];}inCode=!inCode;continue;}if(inCode){code.push(line);continue;}if(line.trim().startsWith('|')){table.push(line);continue;}flush();if(/^#{1,6} /.test(line))html+=`<h3>${inline(line.replace(/^#+ /,''))}</h3>`;else if(line.trim()&&!/^---+$/.test(line))html+=`<p>${inline(line.replace(/^>\s?/,''))}</p>`;}flush();if(code.length)html+=`<pre>${e(code.join('\n'))}</pre>`;return html;}
const speech=text=>`<button class="btn small quiet" data-speak-sentence="${e(text)}" aria-label="朗讀：${e(text)}">朗讀</button>`;
function checkBlock(q){const a=progress.answers[q.id];return `<fieldset class="lesson-check"><legend>${e(q.prompt)}</legend>${q.options.map((o,i)=>`<button type="button" class="btn quiet lesson-option" data-lesson-question="${e(q.id)}" data-lesson-choice="${i}" ${a?'disabled':''}>${String.fromCharCode(65+i)}. ${e(o)}</button>`).join('')}<div id="feedback-${e(q.id)}" aria-live="polite">${a?`<p><strong>${a.choice===q.answer?'答對':'需要訂正'}：</strong>你的答案 ${e(q.options[a.choice])}。正解：${e(q.options[q.answer])}。</p><p>${e(q.explanation)}</p><p class="small">這是本題第一次作答紀錄；不因查看解析改寫原答案。</p>`:''}</div></fieldset>`;}
function structured(value){if(value==null)return '';if(typeof value==='string')return textBlocks(value);if(typeof value==='number')return '';if(Array.isArray(value))return value.map(structured).join('');return Object.entries(value).filter(([k])=>!['id','slug','color','icon','examFrequency','latex','unit','sourceUrl'].includes(k)).map(([k,v])=>['heading','title','name'].includes(k)?`<h3>${e(v)}</h3>`:structured(v)).join('');}
export function lessonCatalog(){return `<div class="lesson-index">${curriculum.map(t=>`<section><h3>${e(t.title)}</h3><div class="lesson-links">${t.chapters.map(c=>`<button class="btn quiet" data-open-chapter="${t.id}:${c.id}">${e(c.num)} ${e(c.title)}</button>`).join('')}</div></section>`).join('')}</div>`;}
export function teachingChapter(key){const [tid,cid]=key.split(':');const t=curriculum.find(t=>t.id===tid)||curriculum[0],c=t.chapters.find(c=>c.id===cid)||t.chapters[0],w=workshops[c.id];const next=t.chapters[t.chapters.indexOf(c)+1];const isJ1=isDuolingoEligible(c.id);
const alignmentBox=`<div class="card lesson-alignment-box" style="margin:14px 0 18px;background:#f8fafc;border-left:4px solid #2563eb;padding:14px 18px;border-radius:10px"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px"><span class="chip" style="background:#e0e7ff;color:#3730a3;font-weight:700">課綱: ${e(c.curriculumCode||'108課綱對標')}</span><span class="chip" style="background:#eff6ff;color:#1e40af;font-weight:700">CEFR: ${e(c.cefr||'A2-B2')}</span><span class="chip" style="background:#ecfdf5;color:#047857">素養: ${e(c.competency||'核心素養')}</span><span style="font-size:12px;color:#64748b">${e(c.stage||'國家考制與標準課程階段')}</span></div>${c.learningPerformance?`<div style="font-size:13px;color:#1e293b;margin-top:4px"><strong>🎯 學習表現指標：</strong>${e(c.learningPerformance)}</div>`:''}${c.learningContent?`<div style="font-size:12px;color:#475569;margin-top:3px"><strong>📖 學習內容細目：</strong>${e(c.learningContent)}</div>`:''}${c.guideline?`<div style="font-size:12px;color:#475569;margin-top:4px;line-height:1.5"><strong>📜 評量指引與雙向細目：</strong>${e(c.guideline)}</div>`:''}</div>`;
let duoContent='';if(isJ1){duoContent=duolingoState.isOpen?renderDuolingoGameView():renderDuolingoHeroBanner(c.id);}
const visualsBlock = `${renderPhonicsTipBox(c.title)}${renderFlashcardBridgeBox(t.id, t.title)}`;
return `<article class="lesson-page"><header class="header-block"><div class="pill">${e(t.title)} · 原創示範與練習</div><h1>${e(c.title)}</h1><p>${e(w.goal)}</p></header><details class="card"><summary>課程對應資訊</summary>${alignmentBox}</details><details class="card"><summary>全部教學章節 · 國中、高中、高工與國際考試</summary>${lessonCatalog()}</details><nav class="lesson-links" aria-label="本章目錄"><button class="btn quiet" data-scroll-to="#lesson-explain">概念</button><button class="btn quiet" data-scroll-to="#lesson-example">例題拆解</button><button class="btn quiet" data-scroll-to="#lesson-vocab">字詞與對話</button><button class="btn quiet" data-scroll-to="#lesson-practice">檢核</button><button class="btn quiet" data-scroll-to="#lesson-output">自己寫</button></nav><section class="card" id="lesson-explain"><h2>1. 把觀念弄清楚</h2><p>${e(w.rule)}</p>${c.concepts.map(x=>`<h3>${e(x.heading)}</h3>${textBlocks(x.body)}${x.tip?`<aside class="lesson-tip">${e(x.tip)}</aside>`:''}`).join('')}</section><section class="card" id="lesson-example"><h2>2. 一步步看懂例子</h2>${renderTeachingAid(c.title, c.concepts, [w.example])}<blockquote>${e(w.example)}</blockquote><ol>${w.steps.map(x=>`<li>${e(x)}</li>`).join('')}</ol><h3>常見錯誤與修正</h3><p>${e(w.trap)}</p></section><section class="card" id="lesson-vocab"><h2>3. 在句子裡學單字與片語</h2><div class="lesson-table"><table><thead><tr><th>字詞／發音</th><th>意義</th><th>例句</th></tr></thead><tbody>${c.vocab.map(v=>`<tr><td lang="en">${e(v.word)}<br>${e(v.ipa)} ${speech(v.word)}</td><td>${e(v.pos)} ${e(v.def)}</td><td lang="en">${e(v.example)} ${speech(v.example)}</td></tr>`).join('')}</tbody></table></div>${c.phrases.map(p=>`<p><strong lang="en">${e(p.phrase)}</strong>：${e(p.def)}<br><span lang="en">${e(p.example)}</span> ${speech(p.example)}</p>`).join('')}<h3>放進情境對話</h3>${c.dialogue.map(d=>`<p><strong>${e(d.speaker)}：</strong><span lang="en">${e(d.text)}</span> ${speech(d.text)}</p>`).join('')}<p class="small">朗讀使用裝置合成語音。看著文字理解，不等同完成聽力評量。</p></section><section class="card" id="lesson-practice"><h2>4. 關起解析，自己判斷</h2>${duoContent}${checkBlock(w.question)}${(cid==='gre'||cid==='gmat')?renderExamDrillSuite(cid):''}</section><section class="card" id="lesson-output"><h2>5. 換個情境，自己使用</h2><label for="lesson-draft">${e(w.task)}</label><textarea id="lesson-draft" data-lesson-draft="${c.id}" rows="5" placeholder="在這裡寫下你的答案…">${e(progress.drafts[c.id]||'')}</textarea><p class="small" id="lesson-save-status" role="status">${e(storageWarning||'草稿只儲存在這個瀏覽器。')}</p><button class="btn quiet" data-lesson-model="${c.id}">查看參考答案／檢核規準</button><div aria-live="polite">${progress.revealed[c.id]?`<p>${e(w.model)}</p><p class="small">比較訊息、句法和搭配；你的答案可以與範例不同。這一題未自動評分。</p>`:''}</div><details><summary>延伸工具：圖解、發音與閃卡</summary>${visualsBlock}</details><h3>明天再確認一次</h3><p>先不看例句，用自己的話說出「${e(w.goal)}」，再換人物或情境重寫。若需回看，回到上方例題拆解。</p>${next?`<button class="btn primary" data-open-chapter="${t.id}:${next.id}">下一章：${e(next.title)}</button>`:''}</section></article>`;}
export function microLesson(unitId){const units=UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units));const u=units.find(u=>u.id===unitId)||units[0];const [kind,key]=u.sourceRef.split(':');let content='',questions=[];
if(kind==='sixth'){const l=sixthLessons[key];content=l?textBlocks(l.rawMarkdown||l.fullContent||l.rawContent||l.markdown||l.concepts.map(c=>`### ${c.title}\n${c.content}`).join('\n')):'';questions=(sixthQuestions[key]||sixthQuestions[`u${l?.unit}`]||[]).map(q=>({id:`micro-${q.id}`,prompt:q.question,options:q.options,answer:q.answerIndex,explanation:q.explanation}));}
else if(kind==='jh'&&jhCases[key]){const parts=jhCases[key].split('|');content=`<h2>理解觀念</h2>${textBlocks(parts[0])}<h2>動手試試</h2>${textBlocks(parts[1])}<details><summary>查看逐步解說</summary>${textBlocks((parts[2]||'').split('~').join('\n'))}</details><h2>換個情境</h2>${textBlocks(parts[3]||'')}`;}
else if(kind==='arch'){const sem=archSemesters.find(s=>s.id===key);if(sem)content=sem.chapters.map(c=>`<section><h2>${e(c.title)}</h2>${structured(c.coreConcepts)}${(c.tables||[]).map(t=>`<h3>${e(t.title)}</h3><div class="lesson-table"><table><tr>${t.headers.map(h=>`<th>${e(h)}</th>`).join('')}</tr>${t.rows.map(r=>`<tr>${r.map(x=>`<td>${e(x)}</td>`).join('')}</tr>`).join('')}</table></div>`).join('')}${structured(c.formulaCard?.cautions)}<h3>學完自查</h3>${structured(c.mustMasterChecklist)}</section>`).join('');else content=structured(({'basic-tenses-passive':archTenseModules,'complex-sentences':archSentencePillars,'parts-of-speech':archPartsOfSpeech,'phonetics-dictionary':[...archPhoneticItems,...archDictCodes]})[key]||[]);}
if(!content&&u.concepts&&u.concepts.length){content=`<h2>核心觀念矩陣與語法公式</h2>${u.concepts.map(c=>`<h3>${e(c.title)}</h3>${c.formula?`<p><strong>📐 語法公式：</strong><code>${e(c.formula)}</code></p>`:''}<p>${e(c.explanation||'')}</p>${c.example?`<p><em>💬 例句：${e(c.example)}</em></p>`:''}${c.examExample?`<div class="exam-example-box"><div class="exam-example-badge">🎯 知識點題型範例</div><p class="exam-example-stem">${e(c.examExample.stem)}</p><div class="exam-example-options">${c.examExample.options.map((opt,oi)=>`<span class="exam-example-option ${oi===c.examExample.answer?'is-correct':''}">${String.fromCharCode(65+oi)}. ${e(opt)}</span>`).join('')}</div><div class="exam-example-analysis"><strong>💡 考點解析與解構：</strong>${e(c.examExample.analysis)}</div></div>`:''}`).join('')}${u.step0Clue?`<aside class="lesson-tip"><strong>⚡ 步驟 0 破題思維：</strong>${e(u.step0Clue)}</aside>`:''}`;}
if(u.formativeQuiz&&u.formativeQuiz.length){questions=questions.concat(u.formativeQuiz.map((fq,fi)=>({id:`micro-${u.id}-${fi}`,prompt:fq.q,options:fq.options,answer:fq.ans,explanation:`${fq.hint1?`[提示1: ${fq.hint1}] `:''}${fq.hint2?`[提示2: ${fq.hint2}] `:''}${fq.solution}`})));}
if(!content)content='<p>這是考試資料入口。請選擇下方考試教學章節學習，再使用官方原卷資源。</p>'+lessonCatalog();
const topicList=u.topics||(u.concepts||[]).map(c=>`${c.title}: ${c.explanation||''}`);
const microVisuals = `${renderTeachingAid(u.title,u.concepts||[])}${renderPhonicsTipBox(u.title)}${renderFlashcardBridgeBox(u.id, u.title)}`;
microQuestions=questions;return `<article class="lesson-page"><header><div class="pill">單元教學</div><h1>${e(u.title)}</h1><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:8px 0 12px"><span class="chip" style="background:#e0e7ff;color:#3730a3;font-weight:700">課綱: ${e(u.indicator)}</span><span class="chip" style="background:#eff6ff;color:#1e40af;font-weight:700">CEFR: ${e(u.cefr||'A2')}</span><span class="chip" style="background:#ecfdf5;color:#047857">素養: ${e(u.competency||'三面九項素養')}</span>${u.guideline?`<span style="font-size:12px;color:#64748b">(${e(u.guideline)})</span>`:''}</div><label for="junyi-unit-select">切換單元</label><select id="junyi-unit-select">${units.map(x=>`<option value="${x.id}" ${x.id===u.id?'selected':''}>${e(x.title)}</option>`).join('')}</select></header>${microVisuals}<section class="card"><h2>本單元要會什麼</h2><ul>${topicList.map(t=>`<li>${e(t)}</li>`).join('')}</ul><p class="small">學期安排為本站教學編排；各校教材順序可能不同。</p></section><section class="card">${content}</section>${u.dialogue&&u.dialogue.length?`<section class="card"><h2>常用生活情境會話</h2>${u.dialogue.map(d=>`<p><strong>${e(d.speaker)}：</strong><span lang="en">${e(d.en||d.text)}</span> ${speech(d.en||d.text)}<br><span class="small" style="color:#64748b">${e(d.zh||'')}</span></p>`).join('')}</section>`:''}${questions.length?`<section class="card"><h2>本單元練習（${questions.length} 題）</h2>${questions.map(checkBlock).join('')}</section>`:''}<section class="card"><h2>錯誤對照</h2>${(u.traps||[]).map(t=>`<p>${e(t.wrong)}<br><strong>${e(t.correct)}</strong><br>${e(t.reason)}</p>`).join('')}<p>閱讀完成後，先離開例句自己造句；閱讀或點擊不自動等於精熟。</p></section></article>`;}
let microQuestions=[];
export function handleLessonClick(button,rerender){if(handleDuolingoClick(button,rerender))return true;if(handleExamDrillClick(button,rerender))return true;const d=button.dataset;if(d.lessonQuestion){const q=Object.values(workshops).map(w=>w.question).concat(microQuestions).find(q=>q.id===d.lessonQuestion),choice=Number(d.lessonChoice);if(!q||!Number.isInteger(choice)||choice<0||choice>=q.options.length)return true;if(!progress.answers[q.id]){progress.answers[q.id]={choice,at:new Date().toISOString()};persist();}const y=window.scrollY;rerender();window.scrollTo(0,y);return true;}if(d.lessonModel&&workshops[d.lessonModel]){progress.revealed[d.lessonModel]=true;persist();const y=window.scrollY;rerender();window.scrollTo(0,y);return true;}return false;}
export function handleLessonInput(target){const id=target.dataset.lessonDraft;if(id&&workshops[id]){progress.drafts[id]=target.value;persist();const status=document.querySelector('#lesson-save-status');if(status)status.textContent=storageWarning||'草稿已儲存在這個瀏覽器。';}}
