// standards_map.mjs — 108 課綱學習重點地圖：各學習階段 × 類別的覆蓋熱度圖、條文清單與對應教材連結。
import { PERFORMANCES, CONTENTS, STAGES, PERFORMANCE_CATEGORIES, CONTENT_THEMES, STANDARD_SOURCES, marker } from './curriculum_standards.mjs';
import { ALIGNMENT, TOOL_PAGES } from './curriculum_alignment.mjs';
import { standardsProgress } from './standards_view.mjs';
import { curriculum } from './curriculum.mjs';
import { grammarTopics } from './grammar_content.mjs';
import { UNIFIED_GRADES } from './curriculum_unified.mjs';
import { points as corePoints } from './knowledge_content.mjs';
import { foundations } from './knowledge_foundations.mjs';
import { standardsPoints } from './knowledge_standards.mjs';

const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STAGE_ORDER = ['Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'V'];
let stage = 'Ⅳ', view = 'performance', onlyGaps = false;

function pageIndex() {
  const pages = {};
  for (const p of [...foundations, ...corePoints, ...standardsPoints]) pages['knowledge:' + p.id] = { title: p.title, link: '#knowledge/' + p.id, kind: '知識點' };
  for (const t of curriculum) for (const c of t.chapters) pages[`chapter:${t.id}:${c.id}`] = { title: c.title, link: `#chapter/${t.id}/${c.id}`, kind: '章節' };
  for (const g of grammarTopics) pages['grammar:' + g.id] = { title: g.title, link: '#grammar/' + g.id, kind: '文法' };
  for (const g of UNIFIED_GRADES) for (const s of g.semesters) for (const u of s.units) pages['unit:' + u.id] = { title: u.title.replace(/\s*\([^)]*\)\s*$/, ''), link: '#unit/' + u.id, kind: g.title.replace(/\s*\(.*\)/, '') };
  for (const [k, [title, link]] of Object.entries(TOOL_PAGES)) pages[k] = { title, link, kind: '練習工具' };
  return pages;
}
function codeIndex() {
  const pages = pageIndex(), byCode = {};
  for (const [key, a] of Object.entries(ALIGNMENT)) {
    const page = pages[key]; if (!page) continue;
    for (const code of [...a.perf, ...a.content]) (byCode[code] ||= []).push(page);
  }
  return byCode;
}

function heatmap(rows, list, keyOf, byCode, label) {
  const cell = (rowKey, st) => {
    const items = list.filter(x => keyOf(x) === rowKey && x.stage === st);
    if (!items.length) return '<td class="sm-na" aria-label="此階段無條文">—</td>';
    const hit = items.filter(x => byCode[x.code]).length, pct = Math.round(hit / items.length * 100);
    return `<td class="sm-heat" style="--pct:${pct}"><button type="button" data-std-map-stage="${st}" aria-label="${e(label)}：${e(STAGES[st].label)} 已對應 ${hit}／${items.length}"><b>${hit}/${items.length}</b><small>${pct}%</small></button></td>`;
  };
  return `<div class="lesson-table sm-heatmap" tabindex="0" role="region" aria-label="${e(label)}覆蓋熱度圖"><table><caption>${e(label)}：已有教材或練習工具對應的條文數／條文總數（點格子切換到該階段清單）</caption><thead><tr><th scope="col">類別</th>${STAGE_ORDER.map(s => `<th scope="col">${e(STAGES[s].short)}<br><small>${s === 'V' ? '技高' : s}</small></th>`).join('')}</tr></thead><tbody>${rows.map(([k, r]) => `<tr><th scope="row"><span aria-hidden="true">${r.icon}</span> ${e(r.label)}</th>${STAGE_ORDER.map(s => cell(k, s)).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function stageBars(byCode) {
  return `<figure class="sm-bars"><figcaption>各學習階段覆蓋率（學習表現／學習內容）</figcaption>${STAGE_ORDER.map(st => {
    const p = PERFORMANCES.filter(x => x.stage === st), c = CONTENTS.filter(x => x.stage === st);
    const ph = p.filter(x => byCode[x.code]).length, ch = c.filter(x => byCode[x.code]).length;
    const bar = (n, t, cls) => `<span class="sm-track"><span class="sm-fill ${cls}" style="width:${Math.round(n / t * 100)}%"></span></span><b>${n}/${t}</b>`;
    return `<div class="sm-bar-row"><span class="sm-bar-label">${e(STAGES[st].label)}<small>${e(STAGES[st].grades)}</small></span><span class="sm-bar-pair"><span>🎯 表現</span>${bar(ph, p.length, 'perf')}</span><span class="sm-bar-pair"><span>📚 內容</span>${bar(ch, c.length, 'cont')}</span></div>`;
  }).join('')}</figure>`;
}

function codeList(byCode) {
  const list = (view === 'performance' ? PERFORMANCES : CONTENTS).filter(x => x.stage === stage).filter(x => !onlyGaps || !byCode[x.code]);
  const checks = standardsProgress();
  const checked = new Set(Object.values(checks).flatMap(o => Object.keys(o)));
  if (!list.length) return '<p>這個篩選條件下沒有條文。</p>';
  return `<ul class="sm-codes">${list.map(x => {
    const meta = view === 'performance' ? PERFORMANCE_CATEGORIES[x.cat] : CONTENT_THEMES[x.theme];
    const pages = byCode[x.code] || [];
    return `<li class="${pages.length ? '' : 'gap'}"><div class="sm-code-head"><span aria-hidden="true">${meta.icon}</span><code>${e(marker(x))}${e(x.code)}</code><span>${e(x.text)}</span>${checked.has(x.code) ? '<span class="sm-done" title="你已在某頁自評勾選">✓ 已自評</span>' : ''}</div>${pages.length ? `<div class="sm-pages">${pages.slice(0, 8).map(p => `<a href="${e(p.link)}"><small>${e(p.kind)}</small>${e(p.title)}</a>`).join('')}${pages.length > 8 ? `<span class="small">另有 ${pages.length - 8} 頁</span>` : ''}</div>` : '<p class="sm-gap-note">尚未有對應教材（多為 * 較高階條文，列入後續擴充）。</p>'}</li>`;
  }).join('')}</ul>`;
}

export function standardsMapPage() {
  const byCode = codeIndex();
  const total = PERFORMANCES.length + CONTENTS.length, hit = [...PERFORMANCES, ...CONTENTS].filter(x => byCode[x.code]).length;
  const selfChecked = new Set(Object.values(standardsProgress()).flatMap(o => Object.keys(o))).size;
  return `<article class="lesson-page standards-map"><header class="header-block"><div class="pill">📜 108 課綱 · 英語文</div><h1>108 課綱學習重點地圖</h1><p>把官方「學習表現」與「學習內容」逐條對到本站的知識點、章節、文法、單元與練習工具。先看熱度圖找出弱項，再點條文旁的連結直接去學。</p><p class="small">共 ${total} 條（普通型 ${PERFORMANCES.filter(x => x.track === 'general').length + CONTENTS.filter(x => x.track === 'general').length} 條、技術型 ${PERFORMANCES.filter(x => x.track === 'vocational').length + CONTENTS.filter(x => x.track === 'vocational').length} 條），已對應 ${hit} 條。你在各頁自評勾選了 ${selfChecked} 項學習表現。</p></header>
  <section class="card">${stageBars(byCode)}</section>
  <section class="card"><h2><span aria-hidden="true">🎯</span> 學習表現熱度圖</h2>${heatmap(Object.entries(PERFORMANCE_CATEGORIES).map(([k, v]) => [Number(k), v]), PERFORMANCES, x => x.cat, byCode, '學習表現')}</section>
  <section class="card"><h2><span aria-hidden="true">📚</span> 學習內容熱度圖</h2>${heatmap(Object.entries(CONTENT_THEMES), CONTENTS, x => x.theme, byCode, '學習內容')}</section>
  <section class="card" id="std-map-list"><h2><span aria-hidden="true">🔎</span> 條文清單與對應教材</h2><div class="knowledge-filters"><div><label for="std-map-stage">學習階段</label><select id="std-map-stage">${STAGE_ORDER.map(s => `<option value="${s}" ${s === stage ? 'selected' : ''}>${e(STAGES[s].label)}（${e(STAGES[s].grades)}）</option>`).join('')}</select></div><div><label for="std-map-view">條文類型</label><select id="std-map-view"><option value="performance" ${view === 'performance' ? 'selected' : ''}>學習表現</option><option value="content" ${view === 'content' ? 'selected' : ''}>學習內容</option></select></div><div><label class="std-check"><input type="checkbox" id="std-map-gaps" ${onlyGaps ? 'checked' : ''}> 只看尚未對應</label></div></div><div id="std-map-codes">${codeList(byCode)}</div></section>
  <p class="std-foot">條文引自<a href="${e(STANDARD_SOURCES.general.url)}" target="_blank" rel="noopener">${e(STANDARD_SOURCES.general.title)}</a>與<a href="${e(STANDARD_SOURCES.vocational.url)}" target="_blank" rel="noopener">${e(STANDARD_SOURCES.vocational.title)}</a>（擷取日期 ${e(STANDARD_SOURCES.general.retrieved)}）。對應由本站依教材內容編排，非教育部或國家教育研究院審定；國際檢定頁只作能力延伸對照。</p></article>`;
}

export function handleStandardsMap(target) {
  if (!target) return false;
  if (target.id === 'std-map-stage' && STAGE_ORDER.includes(target.value)) stage = target.value;
  else if (target.id === 'std-map-view' && ['performance', 'content'].includes(target.value)) view = target.value;
  else if (target.id === 'std-map-gaps') onlyGaps = target.checked;
  else if (target.dataset?.stdMapStage && STAGE_ORDER.includes(target.dataset.stdMapStage)) {
    stage = target.dataset.stdMapStage;
    const sel = document.getElementById('std-map-stage'); if (sel) sel.value = stage;
  } else return false;
  const box = document.getElementById('std-map-codes');
  if (box) box.innerHTML = codeList(codeIndex());
  if (target.dataset?.stdMapStage) document.getElementById('std-map-list')?.scrollIntoView({ block: 'start' });
  return true;
}

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function' && !globalThis.__eqStandardsMapBound) {
  globalThis.__eqStandardsMapBound = true;
  document.addEventListener('change', ev => handleStandardsMap(ev.target));
  document.addEventListener('click', ev => { const b = ev.target.closest?.('[data-std-map-stage]'); if (b) handleStandardsMap(b); });
}
