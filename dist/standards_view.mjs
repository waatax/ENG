// standards_view.mjs — 在每個教學頁顯示 108 課綱對應：學習表現（附能力圖示與配比圖）、學習內容、核心素養與自評勾選。
import { lookupStandard, stageOfCode, marker, STAGES, PERFORMANCE_CATEGORIES, CONTENT_THEMES, COMPETENCY_DIMENSIONS, STANDARD_SOURCES } from './curriculum_standards.mjs';
import { alignmentFor } from './curriculum_alignment.mjs';

const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STORE = 'english-quest-standards-selfcheck-v1';
function readChecks() { try { return JSON.parse(localStorage.getItem(STORE) || '{}') || {}; } catch { return {}; } }
function writeChecks(v) { try { localStorage.setItem(STORE, JSON.stringify(v)); return true; } catch { return false; } }

export function skillMix(perfCodes) {
  const counts = {};
  for (const code of perfCodes) { const s = lookupStandard(code); if (s && s.kind === 'performance') counts[s.cat] = (counts[s.cat] || 0) + 1; }
  return Object.entries(counts).map(([cat, n]) => ({ cat: Number(cat), n, ...PERFORMANCE_CATEGORIES[cat] })).sort((a, b) => a.cat - b.cat);
}

function skillBar(perfCodes) {
  const mix = skillMix(perfCodes), total = mix.reduce((n, x) => n + x.n, 0) || 1;
  const label = mix.map(x => `${x.label} ${x.n} 項`).join('、');
  return `<figure class="std-mix"><figcaption>本頁練到的能力（依學習表現條文數）</figcaption><div class="std-mix-bar" role="img" aria-label="本頁學習表現：${e(label)}">${mix.map(x => `<span class="std-seg std-cat-${x.cat}" style="flex:${x.n}" title="${e(x.full)} ${x.n} 項"><span aria-hidden="true">${x.icon}</span> ${e(x.label)}</span>`).join('')}</div><ul class="std-mix-legend">${mix.map(x => `<li><span class="std-dot std-cat-${x.cat}" aria-hidden="true"></span>${x.icon} ${e(x.full)} · ${x.n}／${total}</li>`).join('')}</ul></figure>`;
}

function stageOf(a) {
  const st = [...a.perf, ...a.content].map(stageOfCode).filter(Boolean);
  return [...new Set(st)];
}

export function renderStandardsCard(key, options = {}) {
  const a = alignmentFor(key);
  if (!a) return '';
  const checks = readChecks()[key] || {};
  const stages = stageOf(a);
  const perf = a.perf.map(lookupStandard).filter(Boolean);
  const content = a.content.map(lookupStandard).filter(Boolean);
  const comp = a.comp.map(lookupStandard).filter(Boolean);
  const done = perf.filter(p => checks[p.code]).length;
  const vocational = stages.includes('V');
  const src = vocational && !stages.some(s => s !== 'V') ? [STANDARD_SOURCES.vocational] : vocational ? [STANDARD_SOURCES.general, STANDARD_SOURCES.vocational] : [STANDARD_SOURCES.general];
  const id = 'std-' + key.replace(/[^a-z0-9]+/gi, '-');
  const open = options.open !== false;
  return `<details class="card std-card" id="${id}" ${open ? 'open' : ''}><summary><span class="std-title"><span aria-hidden="true">📜</span> 108 課綱對應</span><span class="std-stages">${stages.map(s => `<span class="std-stage">${e(STAGES[s].label)} · ${e(STAGES[s].grades)}</span>`).join('')}${a.extension ? '<span class="std-flag">國際檢定延伸</span>' : ''}${a.review ? '<span class="std-flag">跨階段複習</span>' : ''}</span><span class="std-progress" data-std-progress="${e(key)}">自評 ${done}/${perf.length}</span></summary>
  ${a.extension ? '<p class="std-note">國際檢定不在課綱規範內；下列條文是能力相近的高中條文，用來連結校內學習。</p>' : ''}
  ${skillBar(a.perf)}
  <div class="std-grid">
   <section aria-label="學習表現"><h3><span aria-hidden="true">🎯</span> 學習表現 · 學完你能…</h3><ul class="std-list">${perf.map(p => { const c = PERFORMANCE_CATEGORIES[p.cat]; return `<li><label class="std-check"><input type="checkbox" data-std-check="${e(key)}|${e(p.code)}" ${checks[p.code] ? 'checked' : ''}><span class="std-ico std-cat-${p.cat}" aria-hidden="true">${c.icon}</span><span><code>${e(marker(p))}${e(p.code)}</code> ${e(p.text)}<small>${e(c.full)}${p.track === 'vocational' ? ' · 技術型高中' : ''}</small></span></label></li>`; }).join('')}</ul></section>
   <section aria-label="學習內容"><h3><span aria-hidden="true">📚</span> 學習內容 · 本頁用到的知識</h3><ul class="std-list">${content.map(c => { const t = CONTENT_THEMES[c.theme]; return `<li><span class="std-ico" aria-hidden="true">${t.icon}</span><span><code>${e(marker(c))}${e(c.code)}</code> ${e(c.text)}<small>${e(t.full)}${c.track === 'vocational' ? ' · 技術型高中' : ''}</small></span></li>`; }).join('')}</ul>
   <h3><span aria-hidden="true">🌱</span> 核心素養</h3><ul class="std-list std-comp">${comp.map(c => `<li><span class="std-ico" aria-hidden="true">${c.dim[0] === 'A' ? '🧭' : c.dim[0] === 'B' ? '💬' : '🤝'}</span><span><code>${e(c.code)}</code> ${e(COMPETENCY_DIMENSIONS[c.dim])}<small>${e(c.text)}</small></span></li>`).join('')}</ul></section>
  </div>
  <p class="std-foot">勾選只存在這個瀏覽器，用來提醒自己哪一項還要再練；不等於正式評量。條文引自<a href="${e(src[0].url)}" target="_blank" rel="noopener">${e(src[0].title)}</a>${src[1] ? `與<a href="${e(src[1].url)}" target="_blank" rel="noopener">${e(src[1].title)}</a>` : ''}；本頁對應由本站依內容編排，非官方審定。代碼前 * 表較高階、◎ 表跨階段螺旋重複。</p></details>`;
}

export function handleStandardsChange(target) {
  const v = target?.dataset?.stdCheck;
  if (!v) return false;
  const [key, code] = v.split('|');
  const all = readChecks();
  const page = all[key] || {};
  if (target.checked) page[code] = true; else delete page[code];
  all[key] = page;
  writeChecks(all);
  const a = alignmentFor(key);
  const badge = [...document.querySelectorAll('[data-std-progress]')].find(el => el.dataset.stdProgress === key);
  if (badge && a) badge.textContent = `自評 ${a.perf.filter(c => page[c]).length}/${a.perf.length}`;
  return true;
}

export function standardsProgress() { return readChecks(); }

if (typeof document !== 'undefined' && typeof document.addEventListener === 'function' && !globalThis.__eqStandardsBound) {
  globalThis.__eqStandardsBound = true;
  document.addEventListener('change', ev => handleStandardsChange(ev.target));
}
