import { SEMESTERS, semesterOf } from './school.mjs?v=school20261027';
import { schoolHome, schoolGuide, semesterIntro, semesterProject } from './school_view.mjs?v=school20261027';
import { createCourse, createGame, isScored, shuffle, GOALS, XP, FREEZE_COST, MAX_FREEZES, BADGES, HEARTS } from './engine.mjs?v=school20261027';
import * as sound from './sound.mjs?v=coach20261026';
import { answerText, correctionTip } from './coach.mjs?v=coach20261026';

const V = '20261024v6';
import { ADVANCED_TRACKS } from './advanced_placement.mjs?v=advanced20261027';
import { courseAtlas, LEVEL_GOALS } from './atlas.mjs?v=advanced20261027';
import {nextAdventure,sessionTrail} from './adventure.mjs?v=school20261027';
const root = document.querySelector('#game');
let storage; try { storage = globalThis.localStorage; } catch {}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const TABS = [['learn', '🏠', '學習'], ['school','🎒','學期'], ['practice', '💪', '練習'], ['stories', '📖', '故事'], ['library', '📚', '教材'], ['profile', '🙂', '我的']];
const GOAL_INFO = { casual: ['輕鬆', '約 5 分鐘'], regular: ['一般', '約 10 分鐘'], serious: ['認真', '約 15 分鐘'], intense: ['衝刺', '約 20 分鐘'] };
const WHY_INFO = { life: ['🧳', '生活與旅遊', '點餐、問路、交朋友'], school: ['🏫', '學校與大考', '會考、學測、統測'], work: ['💼', '工作與職場', '技高、職場溝通、多益'], exam: ['📜', '檢定與留學', '英檢、托福、SAT、GRE、GMAT'] };
const WHY_BRANCH = { life: [], school: ['b-cap', 'b-gsat'], work: ['b-voc', 'b-toeic'], exam: ['b-cert', 'b-toeic', 'b-sat'] };
const PRAISE = ['太棒了！', '答對了！', '很好！', '完全正確！', '漂亮！', '你做到了！'];
const KIND_TEXT = { word: '字詞', talk: '會話', grammar: '觀念', drill: '精熟', boss: '單元挑戰', lesson: '課程' };

let course, game;
const ui = { tab: 'learn', track: null, pop: null, guide: null, modal: null, paused: false, toast: [], step: 0, why: 'life', goal: 'regular', a: null, shownFor: '', played: '', streakShown: false, vocabCat: '', busy: '', schoolGroup:'junior' };
const freshAnswer = () => ({ value: '', tokens: [], text: '', left: null, done: [], wrong: 0, flash: null, transcript: false, hint: false, zh: false });
ui.a = freshAnswer();

async function getJson(path) { const r = await fetch(`${path}?v=${V}`); if (!r.ok) throw Error(path); return r.json(); }
async function ensure(ids) {
  const need = [...new Set(ids)].filter(id => id && !course.loaded(id)); if (!need.length) return true;
  ui.busy = '載入中…'; render();
  try { for (const f of await Promise.all(need.map(id => getJson(`course/${id}.json`)))) course.register(f); ui.busy = ''; return true; }
  catch { ui.busy = ''; toast('⚠️ 內容載入失敗，請檢查網路後再試一次。'); return false; }
}
function toast(text) { ui.toast.push({ text, id: Math.random() }); setTimeout(() => { ui.toast.shift(); paintToasts(); }, 3200); paintToasts(); }
function paintToasts() { const el = document.querySelector('#toasts'); if (el) el.innerHTML = ui.toast.map(t => `<div class="toast">${esc(t.text)}</div>`).join(''); }
const profile = () => game.state.profile || {};

// ---------- mascot ----------
function mascot(mood = 'happy', size = 96) {
  const mouth = { happy: '<path d="M40 62 Q50 72 60 62" stroke="#1b4332" stroke-width="4" fill="none" stroke-linecap="round"/>', sad: '<path d="M40 68 Q50 60 60 68" stroke="#1b4332" stroke-width="4" fill="none" stroke-linecap="round"/>', wow: '<ellipse cx="50" cy="66" rx="6" ry="7" fill="#1b4332"/>', cheer: '<path d="M38 60 Q50 76 62 60 Z" fill="#1b4332"/>' }[mood] || '';
  return `<svg class="mascot ${mood}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true"><path d="M50 26 C40 6 18 8 16 22 C30 26 40 26 50 30Z" fill="#7fd36b"/><path d="M50 26 C60 4 84 8 86 22 C72 26 60 26 50 30Z" fill="#5fbf4f"/><rect x="47" y="22" width="6" height="12" rx="3" fill="#4a9a3e"/><ellipse cx="50" cy="62" rx="34" ry="32" fill="#8ee07a"/><ellipse cx="50" cy="66" rx="26" ry="22" fill="#b6f0a6"/><circle cx="38" cy="54" r="6" fill="#fff"/><circle cx="62" cy="54" r="6" fill="#fff"/><circle cx="39" cy="55" r="3.4" fill="#1b4332"/><circle cx="63" cy="55" r="3.4" fill="#1b4332"/><circle cx="29" cy="64" r="4" fill="#ff9fb2" opacity=".7"/><circle cx="71" cy="64" r="4" fill="#ff9fb2" opacity=".7"/>${mouth}</svg>`;
}

// ---------- shell ----------
function stats() {
  const st = game.state, streak = game.streak(), today = game.todayXp(), goal = game.goalXp();
  return `<div class="stats" role="group" aria-label="今日狀態"><span class="stat streak ${st.days.includes(game.today()) ? 'lit' : ''}" title="連續學習天數">🔥 <b>${streak}</b></span><span class="stat gems" title="寶石">💎 <b>${st.gems}</b></span><span class="stat xp" title="今日 XP／每日目標">⚡ <b>${today}</b><small>/${goal}</small></span></div>`;
}
function rail() {
  const st = game.state, today = game.todayXp(), goal = game.goalXp(), pct = Math.min(100, Math.round(100 * today / goal));
  const due = game.dueUnits(), mist = game.mistakeCount();
  return `<aside class="rail" aria-label="今日進度">
  <section class="card goal-card"><div class="ring" style="--p:${pct}"><span>${today}<small>/${goal} XP</small></span></div><div><h3>每日目標</h3><p>${today >= goal ? '今天的目標達成了！🎉' : `再 ${goal - today} XP 就達標`}</p></div></section>
  <section class="card"><h3>🔥 連續 ${game.streak()} 天</h3><p class="muted">${st.days.includes(game.today()) ? '今天已經學習，習慣又多一天。' : '完成任一課程，今天就算數。'}</p><p class="freeze-line">🧊 凍結卡 ${st.freezes}/${MAX_FREEZES}<button class="link" data-act="shop">取得</button></p></section>
  <section class="card"><h3>每日任務</h3>${questList()}</section>
  ${due.length || mist ? `<section class="card"><h3>需要回顧</h3>${due.length ? `<p>↻ ${due.length} 個單元到期複習</p>` : ''}${mist ? `<p>📕 錯題本 ${mist} 題</p>` : ''}<a class="btn small" href="#practice">前往練習</a></section>` : ''}
  </aside>`;
}
function questList() {
  const q = game.state.quests; if (!q) return '';
  return `<ul class="quests">${q.list.map(x => `<li class="${x.done ? 'done' : ''}"><span>${x.done ? '✅' : '🎯'} ${esc(game.questLabel(x))}</span><div class="bar"><span style="width:${Math.round(100 * x.n / x.target)}%"></span></div><small>${x.n}/${x.target}</small></li>`).join('')}</ul><p class="muted small">每項 +10 💎，三項全完成再開寶箱 +20 💎</p>`;
}
function layout(body, { wide = false } = {}) {
  return `<div class="shell">
  <nav class="side" aria-label="主要導覽"><a class="brand" href="#learn">${mascot('happy', 40)}<span>English Quest<small>每天一小關</small></span></a>${TABS.map(([id, ic, t]) => `<a href="#${id}" class="${ui.tab === id ? 'on' : ''}" ${ui.tab === id ? 'aria-current="page"' : ''}><i aria-hidden="true">${ic}</i>${t}</a>`).join('')}<a class="side-out" href="../#words">Aa 學單字與聽讀</a><a class="side-out" href="../#home">← 學習首頁</a></nav>
  <header class="top"><div class="top-actions"><button class="btn placement-entry" data-act="placement">🧭 檢測程度</button>${trackChip()}</div>${stats()}</header>
  <main id="main" class="main ${wide ? 'wide' : ''}">${game.warning ? `<div class="warn" role="status">${esc(game.warning)}</div>` : ''}${ui.busy ? `<div class="busy" role="status">${esc(ui.busy)}</div>` : ''}${body}</main>
  ${wide ? '' : rail()}
  <nav class="bottom" aria-label="主要導覽">${TABS.map(([id, ic, t]) => `<a href="#${id}" class="${ui.tab === id ? 'on' : ''}" ${ui.tab === id ? 'aria-current="page"' : ''}><i aria-hidden="true">${ic}</i><span>${t}</span></a>`).join('')}</nav>
  </div>${modalView()}<div id="toasts" class="toasts" aria-live="polite"></div>`;
}
function trackChip() { const t = course.track(ui.track); return `<button class="track-chip ${t?.color || ''}" data-act="tracks" aria-label="切換段落">${t?.kind !== 'section' ? t.icon : `第 ${t?.no} 段`} <b>${esc(t?.title || '')}</b> ▾</button>`; }

// ---------- learn: the path ----------
const OFFSETS = [0, 1, 1.6, 1, 0, -1, -1.6, -1];
function nodeLabel(status) { return { locked: '尚未開啟', available: '可以開始', done: '已完成，可重練', tested: '已測過', crowned: '已獲得金冠' }[status] || ''; }
function learnPage() {
  const t = course.track(ui.track); if (!t) return '';
  const unlocked = game.trackUnlocked(t.id), currentId = game.current(t.id);
  const s = game.state.session;
  const resume = s && ui.paused ? `<div class="resume card"><div>${mascot('wow', 48)}</div><div><b>還有一個未完成的${s.mode === 'story' ? '故事' : '練習'}</b><p class="muted">剛剛的作答都保存了，從原來的地方繼續。</p></div><div class="row"><button class="btn primary" data-act="resume">接續</button><button class="btn ghost" data-act="discard">放棄</button></div></div>` : '';
  const header = t.kind === 'semester' ? semesterIntro(semesterOf(t.id),course,game) : t.kind === 'section'
    ? `<section class="track-head ${t.color}"><div><p class="eyebrow">第 ${t.no} 段 · ${esc(t.level)}</p><h1>${esc(t.title)}</h1><p>${t.units.length} 個單元 · ${t.units.reduce((n, u) => n + u.nodes.length, 0)} 個關卡</p></div>${unlocked ? (t.no<9 ? `<div class="jump"><p>第 1–8 段自由選關；已經熟悉？也能測驗跳級。</p><button class="btn gold" data-act="jump" data-id="${course.index.sections[t.no].id}">⏩ 挑戰下一段</button></div>` : '') : `<div class="jump"><p>已經會了？通過跳級測驗就能直接從這裡開始。</p><button class="btn gold" data-act="jump" data-id="${t.id}">⏩ 跳到這裡</button></div>`}</section>`
    : `<section class="track-head ${t.color}"><div><p class="eyebrow">目標分支 · ${esc(t.level)}</p><h1>${t.icon} ${esc(t.title)}</h1><p>${t.units.length} 個單元 · 隨時可以開始，不是必經的升級順序</p></div></section>`;
  const units = t.units.map((u, ui2) => unitBlock(t, u, ui2, currentId)).join('');
  const nextSec = t.kind === 'section' ? course.index.sections[t.no] : null;
  const tail = nextSec ? `<section class="next-sec card"><p class="eyebrow">下一段</p><h2>第 ${nextSec.no} 段 · ${esc(nextSec.title)}</h2><p class="muted">${esc(nextSec.level)} · ${nextSec.units.length} 個單元</p><button class="btn" data-act="track" data-id="${nextSec.id}">看看第 ${nextSec.no} 段 →</button></section>` : '';
  const mission=nextAdventure(game,course,t.id);
  const launch=unlocked&&!s?`<section class="adventure"><span aria-hidden="true">🧭</span><div><h2>${mission.title}</h2><p>${esc(mission.text)}</p></div><button class="btn primary" data-act="start" data-mode="${mission.mode}" data-id="${mission.id}">${mission.label} →</button></section>`:'';
  // the path comes first; branch suggestions wait below it so the first lesson is visible without scrolling
  return `${resume}${todayMobile()}${header}${launch}${t.kind==='semester'?'':`<a class="school-entry card" href="#school"><b>🎒 國中／高中六學期課程</b><small>依 108 課綱展開 12 個學期單元、闖關與作品 →</small></a>`}${t.kind==='semester'?'':courseAtlas(course,game)}<p class="path-goals">🎯 ${esc((LEVEL_GOALS[t.id] || [t.title]).join(' · '))}</p><div class="path">${units}</div>${t.kind==='semester'?semesterProject(semesterOf(t.id),game):''}${suggestBranches()}${tail}`;
}
// narrow screens have no side rail, so today's goal and quests fold into the top of the path
function todayMobile() {
  const q = game.state.quests, done = q ? q.list.filter(x => x.done).length : 0;
  return `<details class="card today-mobile"><summary><span>⚡ 今日 ${game.todayXp()}/${game.goalXp()} XP</span><span>🎯 任務 ${done}/${q?.list.length || 3} ▾</span></summary>${questList()}<p class="freeze-line">🧊 凍結卡 ${game.state.freezes}/${MAX_FREEZES}<button class="link" data-act="shop">取得</button></p></details>`;
}
function suggestBranches() {
  const ids = WHY_BRANCH[profile().why] || []; const t = course.track(ui.track);
  if (!ids.length || t.kind !== 'section' || t.no > 2) return '';
  return `<div class="suggest">推薦你的目標分支：${ids.map(id => { const b = course.track(id); return `<button class="chip" data-act="track" data-id="${id}">${b.icon} ${esc(b.title)}</button>`; }).join('')}</div>`;
}
function unitBlock(t, u, index, currentId) {
  const nodes = u.nodes.map((n, i) => {
    const status = game.nodeStatus(n.id), isCur = n.id === currentId;
    const off = OFFSETS[(index * 3 + i) % OFFSETS.length];
    const icon = status === 'locked' ? (n.kind === 'boss' ? '🏆' : '🔒') : status === 'crowned' ? '👑' : status === 'done' && n.kind !== 'boss' ? '✓' : n.icon;
    return `<div class="node-row" style="--x:${off}">${isCur ? `<div class="start-bubble" aria-hidden="true">開始</div>` : ''}<button class="node ${n.kind} ${status} ${isCur ? 'current' : ''} c-${u.color}" data-act="pop" data-id="${n.id}" aria-label="${esc(n.title)}（${KIND_TEXT[n.kind] || ''}）：${nodeLabel(status)}" aria-expanded="${ui.pop === n.id}"><span>${icon}</span></button><span class="node-label">${esc(n.title)}</span>${isCur ? `<div class="mascot-side" aria-hidden="true">${mascot('happy', 64)}</div>` : ''}</div>${ui.pop === n.id ? popover(n, status, u) : ''}`;
  }).join('');
  const story = u.story ? (() => { const st = game.unitStoryStatus(u.id), meta = course.stories.get(u.story); return `<div class="node-row" style="--x:0"><button class="node story ${st}" data-act="story" data-id="${u.story}" aria-label="故事：${esc(meta?.title)}（${st === 'done' ? '已讀' : st === 'available' ? '可以閱讀' : '完成本單元後開啟'}）"><span>${st === 'done' ? '✓' : '📖'}</span></button><div class="story-label">${esc(meta?.title || '')}</div></div>`; })() : '';
  const done = u.nodes.filter(n => ['done', 'tested', 'crowned'].includes(game.nodeStatus(n.id))).length;
  return `<section class="unit" aria-labelledby="u-${u.id}"><header class="unit-banner c-${u.color}"><div><p class="eyebrow">${t.kind === 'section' ? `第 ${t.no} 段，第 ${index + 1} 單元` : `單元 ${index + 1}`} · ${done}/${u.nodes.length}${game.state.crowns[u.id] ? ' · 👑' : ''}</p><h2 id="u-${u.id}">${u.icon} ${esc(u.title)}</h2>${u.en ? `<p class="en">${esc(u.en)}</p>` : ''}</div><button class="guide-btn" data-act="guide" data-id="${u.id}" aria-label="${esc(u.title)} 的單元指南">📘<span>指南</span></button></header><div class="nodes">${nodes}${story}</div></section>`;
}
function popover(n, status, u) {
  const nodeIndex = u.nodes.indexOf(u.nodes.find(x => x.id === n.id)) + 1;
  const firstXp = n.kind === 'boss' ? XP.boss : XP.lesson, replay = n.kind === 'boss' ? XP.boss : XP.replay;
  let body;
  if (status === 'locked') body = n.kind === 'boss' ? `<p>先完成本單元的課程，就能挑戰金冠。</p>` : game.trackUnlocked(n.track) ? `<p>先完成前面的關卡，這一關就會打開。</p>` : `<p>這一段還沒開啟。完成上一段，或通過跳級測驗。</p><button class="btn gold" data-act="jump" data-id="${n.track}">⏩ 跳級測驗</button>`;
  else if (n.kind === 'boss') body = `<p>從整個單元混合出題，共 ${n.size} 題，有 ${HEARTS} 顆 ❤️，錯 ${HEARTS} 題就結束；通過還需至少 80% 獨立答對，可以馬上再挑戰。通過可以得到金冠 👑 和寶箱 💎。</p><button class="btn gold" data-act="start" data-mode="boss" data-id="${n.id}">${status === 'crowned' ? '再挑戰一次' : '開始挑戰'} +${firstXp} XP</button>`;
  else body = `<p>${KIND_TEXT[n.kind] || '課程'} · 約 ${n.size} 題${status === 'tested' ? ' · 已測過，也可以練習' : ''}</p><button class="btn primary" data-act="start" data-mode="lesson" data-id="${n.id}">${status === 'done' ? `重練 +${replay}` : `開始 +${firstXp}`} XP</button>`;
  return `<div class="pop c-${u.color}" role="dialog" aria-label="${esc(n.title)}"><p class="eyebrow">${esc(u.title)} · 第 ${nodeIndex} 關</p><h3>${n.icon} ${esc(n.title)}</h3>${body}</div>`;
}

// ---------- guide ----------
function guideView(unitId) {
  const u = course.units.get(unitId), g = course.guides.get(unitId);
  if(u?.semester)return schoolGuide(semesterOf(u.semester),course);
  if (!g) return `<p>指南載入中…</p>`;
  const say = (text, label = '播放') => `<button class="say" data-act="say" data-text="${esc(text)}" aria-label="${label}：${esc(text)}">🔊</button>`;
  return `<p class="eyebrow">單元指南</p><h2>${u.icon} ${esc(u.title)}</h2>${g.goal ? `<p class="goal">🎯 ${esc(g.goal)}</p>` : ''}${g.motivation ? `<p class="muted">${esc(g.motivation)}</p>` : ''}
  ${(g.tips || []).map(t => `<section class="tip"><h3>${esc(t.title)}</h3>${t.formula ? `<p class="formula">${esc(t.formula)}</p>` : ''}${t.body ? `<p>${esc(t.body)}</p>` : ''}${t.example ? `<p class="example">${esc(t.example)}</p>` : ''}</section>`).join('')}
  ${g.words?.length ? `<section><h3>重點字詞</h3><ul class="wordlist">${g.words.map(w => `<li>${say(w.word)}<b lang="en">${esc(w.word)}</b><span class="muted">${esc(w.ipa || '')}</span><span>${esc(w.zh)}</span></li>`).join('')}</ul></section>` : ''}
  ${g.phrases?.length ? `<section><h3>常用片語</h3><ul class="wordlist">${g.phrases.map(p => `<li>${say(p.example || p.phrase)}<b lang="en">${esc(p.phrase)}</b><span>${esc(p.def)}</span></li>`).join('')}</ul></section>` : ''}
  ${g.dialogue?.length ? `<section><h3>示範會話</h3><div class="dialogue">${g.dialogue.map(l => `<p>${say(l.en)}<b>${esc(l.speaker || '')}</b> <span lang="en">${esc(l.en)}</span><br><small>${esc(l.zh)}</small></p>`).join('')}</div></section>` : ''}
  ${g.traps?.length ? `<section><h3>常見錯誤</h3>${g.traps.map(t => `<div class="trap"><p class="bad">✗ ${esc(t.wrong)}</p><p class="good">✓ ${esc(t.correct)}</p><small>${esc(t.reason)}</small></div>`).join('')}</section>` : ''}
  ${(g.extra || []).map(x => `<section class="tip"><h3>${esc(x.title)}</h3><p>${esc(x.rule)}</p>${x.table ? `<div class="table-wrap"><table><thead><tr>${x.table.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${x.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${(x.pairs || []).map(p => `<p class="example">${esc(p[0])}<br><small>${esc(p[1])}</small></p>`).join('')}${x.trap ? `<p class="muted">⚠️ ${esc(x.trap)}</p>` : ''}<a href="../${x.src}">看完整說明 ↗</a></section>`).join('')}
  ${g.checklist?.length ? `<section><h3>學完後我能……</h3><ul>${g.checklist.map(c => `<li>${esc(c)}</li>`).join('')}</ul></section>` : ''}
  <p><a class="btn" href="../${u.src}">打開完整教材 ↗</a></p>`;
}

// ---------- modal ----------
function modalView() {
  if (!ui.modal) return '';
  let inner = '';
  if (ui.modal === 'placement') inner = `<h2>先選擇檢測題數</h2><p class="muted">減少基礎重複取樣，最後保留 SAT／GRE／GMAT 三方向進階推理題。不限時，可以暫停接續；完成後統一看正解，避免影響後面的判斷。</p><div class="placement-options">${[[10,'快速定位','7 題一般英語＋3 題進階挑戰'],[20,'標準檢測','14 題一般英語＋6 題進階挑戰'],[30,'深入確認','21 題一般英語＋9 題進階挑戰']].map(([n,title,desc])=>`<button class="placement-size" data-act="placement-start" data-size="${n}"><b>${n}<small> 題</small></b><span>${title}${n===20?' · 建議':''}<small>${desc}</small></span><span aria-hidden="true">→</span></button>`).join('')}</div><p class="muted small">只評估本次字詞、句型、閱讀與聽辨取樣，未測口說與寫作。結果用來推薦課程起點，不能換算正式 CEFR 或考試成績。</p>`;
  else if (ui.modal === 'guide') inner = guideView(ui.guide);
  else if (ui.modal === 'tracks') inner = `<h2>選擇段落</h2><div class="track-list">${course.index.sections.map(s => `<button class="track-opt ${s.color} ${ui.track === s.id ? 'on' : ''}" data-act="track" data-id="${s.id}"><b>${game.trackUnlocked(s.id) ? '' : '🔒 '}第 ${s.no} 段 · ${esc(s.title)}</b><small>${esc(s.level)} · ${s.units.length} 單元${game.sectionDone(s.id) ? ' · ✓ 完成' : ''}</small></button>`).join('')}</div><h3>目標分支</h3><div class="track-list">${course.index.branches.map(b => `<button class="track-opt ${b.color} ${ui.track === b.id ? 'on' : ''}" data-act="track" data-id="${b.id}"><b>${b.icon} ${esc(b.title)}</b><small>${esc(b.level)} · ${b.units.length} 單元</small></button>`).join('')}</div>`;
  else if (ui.modal === 'exit') inner = `<div class="center">${mascot('sad', 88)}<h2>要先休息一下嗎？</h2><p>剛剛的作答已經保存，回來可以接著做。</p><div class="row center"><button class="btn primary" data-act="close">繼續學習</button><button class="btn ghost" data-act="pause">先離開</button></div></div>`;
  else if (ui.modal === 'shop') { const st = game.state; inner = `<h2>🧊 凍結卡</h2><p>漏掉一天時會自動使用一張，連續天數不會中斷（那天不加一）。最多持有 ${MAX_FREEZES} 張。</p><p>你有 💎 ${st.gems}，凍結卡 ${st.freezes}/${MAX_FREEZES}。</p><button class="btn primary" data-act="buy" ${st.gems < FREEZE_COST || st.freezes >= MAX_FREEZES ? 'disabled' : ''}>用 💎 ${FREEZE_COST} 兌換</button><p class="muted small">寶石來自每日任務、單元寶箱與成就，不能購買。</p>`; }
  else if (ui.modal === 'reset') inner = `<h2>清除闖關紀錄？</h2><p>會刪除這個瀏覽器中的闖關進度（XP、連續天數、關卡）。建議先下載備份。舊版教材的筆記與進度不受影響。</p><div class="row"><button class="btn danger" data-act="reset-yes">確定清除</button><button class="btn ghost" data-act="close">取消</button></div>`;
  return `<div class="modal-bg" data-act="close"></div><div class="modal ${ui.modal}" role="dialog" aria-modal="true" aria-label="${ui.modal === 'guide' ? '單元指南' : '對話框'}"><button class="x" data-act="close" aria-label="關閉">✕</button>${inner}</div>`;
}

// ---------- lesson ----------
function sessionTitle(s) {
  if (s.mode === 'lesson' || s.mode === 'boss') { const n = course.nodes.get(s.ref), u = course.units.get(n.unit); return s.mode === 'boss' ? `🏆 ${u.title}・單元挑戰` : `${n.icon} ${u.title}・${n.title}`; }
  if (s.mode === 'story') return `📖 ${course.stories.get(s.ref)?.title || '故事'}`;
  if (s.mode === 'review') return `↻ 複習・${course.units.get(s.ref)?.title || ''}`;
  if (s.mode === 'vocab') return `🔤 ${course.vocab.get(s.ref)?.title || '單字特訓'}`;
  if (s.mode === 'placement' && s.placement?.version===2) { const slot=s.placement.slots[s.index],track=ADVANCED_TRACKS.find(x=>x.id===slot.section); return track ? `程度檢測 · ${track.title}（進階）` : '程度檢測 · 一般英語'; }
  if (s.mode === 'jump') return `⏩ 跳級測驗・第 ${course.track(s.ref)?.no} 段`;
  return { mistakes: '📕 錯題本', practice: '💪 個人化練習', listen: '🎧 聽力特訓', placement: '🧭 程度測驗' }[s.mode] || '練習';
}
function lessonView() {
  const s = game.state.session, it = game.currentItem(), fb = s.feedback;
  const assessment = s.mode === 'placement';
  const trail=sessionTrail(s);
  const pct = Math.round(100 * (s.index + (fb || !isScored(it) ? 1 : 0)) / s.queue.length);
  const hearts = s.hearts !== null ? `<span class="hearts" aria-label="剩下 ${s.hearts} 顆心">${'❤️'.repeat(s.hearts)}${'🤍'.repeat(HEARTS - s.hearts)}</span>` : '';
  const combo = s.combo >= 3 ? `<span class="combo ${s.combo % 5 === 0 ? 'pop' : ''}">🔥 ${s.combo} 連對</span>` : '';
  return `<div class="lesson-screen ${fb && !assessment ? (fb.ok ? 'is-ok' : 'is-bad') : ''}"><header class="lesson-top"><button class="x" data-act="exit" aria-label="暫停並離開">✕</button><div class="progress" role="progressbar" aria-label="進度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>${combo}${hearts}</header>
  <main id="main" class="lesson-body"><p class="eyebrow">${esc(sessionTitle(s))}${s.index >= s.base ? ' · 再試一次' : ''}</p><div class="mission-strip"><span>${assessment ? '程度檢測：獨立作答，完成後看解析' : trail.label}</span><small>${assessment ? `已作答 ${s.results.length} / ${s.queue.length} 題 · 不計速度` : `本次獨立答對 ${trail.independent} / ${trail.attempts}`}${s.hearts!==null?' · 挑戰需至少 80% 且保有愛心':''}</small></div>${itemView(it, s)}</main>
  ${lessonFooter(it, s)}</div>${modalView()}<div id="toasts" class="toasts" aria-live="polite"></div>`;
}
function sayBtn(text, mp3 = '', big = false, label = '播放英文') { return `<button class="say ${big ? 'big' : ''}" data-act="say" data-text="${esc(text)}" data-mp3="${esc(mp3 || '')}" aria-label="${label}">🔊</button>`; }
function itemView(it, s) {
  const a = ui.a, locked = !!s.feedback;
  if (it.type === 'info') return `<section class="info-card"><p class="tag">📐 新觀念</p><h1>${esc(it.title)}</h1>${it.formula ? `<p class="formula">${esc(it.formula)}</p>` : ''}${it.body ? `<p>${esc(it.body)}</p>` : ''}${it.example ? `<p class="example">${sayBtn(it.example)} <span lang="en">${esc(it.example)}</span></p>` : ''}</section>`;
  if (it.type === 'line') return `<section class="story-line">${mascot('happy', 56)}<div class="bubble"><b>${esc(it.speaker || '')}</b><p lang="en">${sayBtn(it.en)} ${esc(it.en)}</p>${a.zh ? `<p class="zh">${esc(it.zh)}</p>` : `<button class="link" data-act="zh">顯示中文</button>`}${a.zh && it.note ? `<p class="muted small">${esc(it.note)}</p>` : ''}</div></section>`;
  const head = `<h1 class="prompt">${esc(it.prompt)} <button class="say" data-act="prompt-say" data-text="${esc(it.prompt)}" aria-label="朗讀題目">🔊</button></h1>`;
  const passage = it.passage ? `<details class="passage" open><summary>${esc(it.passageTitle || '閱讀短文')}</summary><p lang="en">${esc(it.passage)}</p></details>` : '';
  const stim = it.text ? `<div class="stimulus">${it.type !== 'listen' ? (it.audio ? sayBtn(it.audio, it.mp3) : `<button class="say" data-act="prompt-say" data-text="${esc(it.text)}" aria-label="朗讀題幹">🔊</button>`) : ''}<p lang="en">${esc(it.text)}</p>${it.textZh && ((locked && s.mode !== 'placement') || a.hint) ? `<small>${esc(it.textZh)}</small>` : ''}</div>` : '';
  const listenBox = (it.type === 'listen' || (it.type === 'input' && it.audio && !it.text)) ? `<div class="listen-box">${a.transcript ? `<p class="transcript" lang="en">${esc(it.audio)}</p><small class="muted">已改用文字，這題不算聽力。</small>` : `${sayBtn(it.audio, it.mp3, true, '播放聲音')}<button class="say slow" data-act="say" data-slow="1" data-text="${esc(it.audio)}" aria-label="慢速播放">🐢</button><button class="link" data-act="transcript" ${locked ? 'disabled' : ''}>不方便聽？改看文字</button>`}</div>` : '';
  const hint = (a.hint || s.hint) && !locked ? `<div class="hint">💡 ${esc(hintText(it))}</div>` : '';
  let body = '';
  if (it.type === 'choice' || it.type === 'listen') {
    const opts = shuffle(it.options, it.id + s.id);
    body = `<div class="options ${opts.some(o => o.length > 40) ? 'long' : ''}" role="group" aria-label="選項">${opts.map((o, i) => { const cls = locked ? (s.mode === 'placement' ? (o === fb(s) ? 'sel' : '') : o === it.answer ? 'right' : o === fb(s) ? 'wrong' : '') : (a.value === o ? 'sel' : ''); return `<button class="opt ${cls}" data-act="choose" data-v="${esc(o)}" aria-pressed="${a.value === o}" ${locked ? 'disabled' : ''}><kbd>${i + 1}</kbd><span ${/[a-z]/i.test(o) && !/[㐀-鿿]/.test(o) ? 'lang="en"' : ''}>${esc(o)}</span></button>`; }).join('')}</div>`;
  } else if (it.type === 'build') {
    const bank = shuffle(it.words.map((w, i) => ({ w, i })), it.id + s.id);
    const given = it.given ? it.given.split(' ').map(w => `<span class="tok given" lang="en">${esc(w)}</span>`).join('') : '';
    body = `<div class="answer-line" aria-label="你的句子">${given}${a.tokens.length ? a.tokens.map(i => `<button class="tok" data-act="untok" data-i="${i}" ${locked ? 'disabled' : ''} lang="en">${esc(it.words[i])}</button>`).join('') : '<span class="muted">點下面的字，排出句子</span>'}</div><div class="bank" lang="en">${bank.map(({ w, i }, k) => `<button class="tok ${a.tokens.includes(i) ? 'used' : ''}" data-act="tok" data-i="${i}" ${a.tokens.includes(i) || locked ? 'disabled' : ''} aria-label="${esc(w)}（${k + 1}）">${esc(w)}</button>`).join('')}</div>`;
  } else if (it.type === 'input') {
    body = `<form class="type-form" data-form="answer"><label class="offscreen" for="answer">輸入英文答案</label><input id="answer" class="type-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="en" value="${esc(locked ? fb(s) : a.text)}" ${locked ? 'disabled' : ''} placeholder="輸入英文"></form>`;
  } else if (it.type === 'match') {
    const left = shuffle(it.pairs.map((p, i) => i), it.id + 'L' + s.id), right = shuffle(it.pairs.map((p, i) => i), it.id + 'R' + s.id);
    const cell = (side, i, text) => { const done = a.done.includes(i), sel = side === 'L' && a.left === i, flash = a.flash && a.flash[side] === i; return `<button class="mcell ${done ? 'done' : ''} ${sel ? 'sel' : ''} ${flash ? 'flash' : ''}" data-act="m${side}" data-i="${i}" ${done || locked ? 'disabled' : ''} ${side === 'L' ? 'lang="en"' : ''}>${esc(text)}</button>`; };
    body = `<div class="match"><div>${left.map(i => cell('L', i, it.pairs[i][0])).join('')}</div><div>${right.map(i => cell('R', i, it.pairs[i][1])).join('')}</div></div><p class="muted small">先點英文，再點對應的中文。${a.wrong ? `配錯 ${a.wrong} 次` : ''}</p>`;
  }
  return `${head}${passage}${stim}${listenBox}${body}${hint}`;
}
const fb = s => s.feedback?.value;
function hintText(it) {
  if (it.hint) return it.hint;
  const g = course.guides.get(course.nodes.get(game.state.session?.ref)?.unit);
  if (it.type === 'build') return `${it.given ? '前半句已經排好，接下來' : ''}第一個字是「${it.answer.split(' ')[0]}」。`;
  if (it.type === 'input') return `開頭是「${it.answer[0]}」，共 ${it.answer.length} 個字母。`;
  return g?.tips?.[0]?.formula || '先找出題目的關鍵字，再刪去明顯不合的選項。';
}
function lessonFooter(it, s) {
  const f = s.feedback;
  if (!isScored(it)) return `<footer class="check"><div class="check-in"><span></span><button class="btn primary big" data-act="next" id="go">${it.type === 'info' ? '了解了' : '繼續'}</button></div></footer>`;
  if (f && s.mode === 'placement') return `<footer class="check assessment-recorded" role="status"><div class="check-in"><p>✓ 已記錄答案，完成後一起看分析。</p><button class="btn primary big" data-act="next" id="go">${s.index+1===s.queue.length?'查看檢測結果':'下一題'}</button></div></footer>`;
  if (f) {
    const praise = PRAISE[(s.index + s.id) % PRAISE.length];
    const answer = it.type === 'match' ? it.why : it.given ? `${it.given} ${it.answer}` : it.answer;
    return `<footer class="check ${f.ok ? 'ok' : 'bad'}" role="status"><div class="check-in"><div class="verdict">${f.ok ? `<h2>✔ ${praise}</h2>${it.type !== 'match' && normalize2(f.value) !== normalize2(it.answer) && it.type !== 'choice' && it.type !== 'listen' ? `<p>標準答案：<b lang="en">${esc(it.answer)}</b></p>` : ''}` : `<h2>✘ 正確答案</h2><p><b ${/[a-z]/i.test(answer) ? 'lang="en"' : ''}>${esc(answer)}</b></p>`}${it.why ? `<p class="why"><b>為什麼？</b> ${esc(it.why)}</p>` : ''}${!f.ok ? `<p class="correction-tip">💡 ${esc(correctionTip(it, f.value))}</p>` : ''}<p class="spoken-answer"><b>跟讀：</b><span>${esc(answerText(it))}</span></p>${s.results.at(-1)?.unheard ? '<p class="small">這題未取得完整聽辨證據，不列為獨立答對。</p>' : ''}<div class="coach-controls"><button class="btn small" data-act="answer-say">🔊 聽正確答案</button><button class="btn small" data-act="answer-say" data-slow="1">🐢 慢速跟讀</button>${it.why ? '<button class="btn small" data-act="explain-say">💬 聽解說</button>' : ''}<button class="link" data-act="stop-say">停止朗讀</button></div><button class="link flag" data-act="flag" data-id="${it.id}">${game.state.flags[it.id] ? '🚩 已回報' : '🚩 這題有問題'}</button></div><button class="btn ${f.ok ? 'primary' : 'danger'} big" data-act="next" id="go">繼續</button></div></footer>`;
  }
  const ready = it.type === 'build' ? ui.a.tokens.length > 0 : it.type === 'input' ? !!ui.a.text.trim() : it.type === 'match' ? false : !!ui.a.value;
  const canHint = !['boss', 'jump', 'placement'].includes(s.mode);
  return `<footer class="check"><div class="check-in">${canHint ? `<button class="btn ghost" data-act="hint" ${ui.a.hint ? 'disabled' : ''}>💡 提示</button>` : `<span class="muted small">${s.mode === 'placement' ? '程度測驗不提供提示' : '挑戰模式不提供提示'}</span>`}${it.type === 'match' ? '<span class="muted small">全部配對完成就會自動檢查</span>' : `<button class="btn primary big" data-act="check" id="go" ${ready ? '' : 'disabled'}>檢查</button>`}</div></footer>`;
}
const normalize2 = s => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();

// ---------- results ----------
function resultView() {
  const r = game.result;
  if (r.mode === 'placement') {
    const sec = course.track(r.recommended);
    return `<div class="result placement-result">${mascot('cheer', 92)}<p class="eyebrow">${esc(r.evidence || '程度測驗完成')} · ${r.total} 題</p><h1>${r.advancedReady ? '建議展開進階學術挑戰' : `建議從第 ${sec.no} 段開始`}</h1><p class="lead">一般英語起點：「${esc(sec.title)}」· ${esc(sec.level)}</p><p class="muted">首次答對 ${r.firstTry}/${r.total} 題。${r.range ? (r.range[0]===r.range[1] ? `本次證據較支持第 ${course.track(r.range[0]).no} 段，仍可用單元挑戰確認。` : `待確認起點：第 ${course.track(r.range[0]).no}–${course.track(r.range[1]).no} 段。`) : ''}這是課程起點建議，未評估口說與寫作。</p><p class="placement-note">${r.total===10?'10 題只作初步定位，建議用 20 或 30 題再確認。':'依各級答題模式推估，答題速度不影響分級。'}${r.listeningLimited ? ' 聽力證據不足，建議完成聽辨後再確認。' : ''}${r.seen ? ` 本次有 ${r.seen} 題曾作答，熟悉度可能影響結果。` : ''}</p>
    ${r.advancedRows ? `<section class="advanced-evidence"><h2>進階挑戰 · SAT／GRE／GMAT</h2><p class="muted small">三者代表不同學術與推理方向，不是同一條難度或分數階梯。</p><div class="advanced-grid">${r.advancedRows.map(x=>`<article><h3>${esc(x.title)}</h3><b class="advanced-score">${x.correct}/${x.n}</b><p class="small">${x.n<2 ? (x.correct?'單題命中，值得進一步挑戰':'單題未命中，可先補強') : x.correct/x.n>=2/3?'本次進階表現順利':'建議練習後再確認'}</p><p class="muted small">${esc(x.focus)}</p><button class="btn small" data-act="advanced-track" data-id="${x.id}">展開 ${x.id.slice(2).toUpperCase()} 課程 →</button></article>`).join('')}</div><p class="muted small">原創進階取樣，未換算正式考試成績；10 題版各方向一題，建議用 20／30 題增加證據。</p></section>` : ''}
    ${r.rows ? `<div class="level-evidence"><h2>${r.blueprint===2?'一般英語 · 合併分層取樣':'各級取樣表現'}</h2>${r.rows.map((x,i)=>`<div><span>${esc(x.label || `第 ${i+1} 段 · ${x.title}`)}</span><b>${x.correct}/${x.n}</b><small>${!x.n?'未取樣':x.n<2?(x.correct?'已找到一項線索':'建議補強這項線索'):x.correct/x.n>=.75?'本次表現順利':'建議補強'}</small></div>`).join('')}</div><div class="skill-evidence">${r.skills.map(x=>`<section><b>${esc(x.label)}</b><p>${x.id==='listening' ? (x.heard ? `${x.correct}/${x.heard} 題有效聽辨` : '未取得有效聽力證據') : x.n?`${x.correct}/${x.n} 題`:'本次未取樣'}</p>${x.id==='listening'?`<small>${x.heard}/${x.n} 題完整聽完；改文字不當作聽力證據</small>`:''}</section>`).join('')}</div>` : ''}
    <div class="row center"><button class="btn primary big" data-act="accept" data-id="${sec.id}">從第 ${sec.no} 段開始</button><button class="btn ghost" data-act="accept" data-id="s1">從頭開始</button><button class="btn" data-act="placement">換題數重新確認</button></div>
    ${r.review ? `<details class="placement-review"><summary>展開 ${r.review.length} 題答案與解說</summary>${r.review.map(x=>`<details><summary>${x.ok?'✓':'↻'} ${esc(x.prompt)}</summary>${x.passage ? `<p class="review-stimulus" lang="en">${esc(x.passage)}</p>` : ''}${x.text ? `<p class="review-stimulus">${esc(x.text)}</p>` : ''}${!x.ok && x.value ? `<p class="muted">你的答案：${esc(x.value)}</p>` : ''}<p><b>正解：${esc(x.answer)}</b></p><p>${esc(x.why)}</p><button class="btn small" data-act="prompt-say" data-text="${esc(x.answer)}">🔊 聽正解</button><button class="btn small" data-act="prompt-say" data-text="${esc(x.why)}">💬 聽解說</button></details>`).join('')}</details>`:''}</div>`;
  }
  if (r.newDay && !ui.streakShown) {
    const week = game.weekXp();
    return `<div class="result streak-screen">${mascot('cheer', 120)}<div class="flame">🔥</div><h1>連續 ${r.streak} 天！</h1><p class="lead">${r.streak <= 1 ? '好的開始！明天再回來，就能累積成習慣。' : '習慣正在形成，明天也來一小關吧。'}</p><div class="week">${week.map(d => `<span class="${d.xp ? 'on' : ''}" title="${d.day}">${'日一二三四五六'[new Date(d.day + 'T12:00').getDay()]}</span>`).join('')}</div><button class="btn primary big" data-act="streak-ok">繼續</button></div>`;
  }
  const failed = !r.passed;
  const title = failed ? (r.mode === 'jump' ? '這次還沒過關' : '差一點點！') : r.mode === 'boss' ? '挑戰成功！獲得金冠 👑' : r.mode === 'jump' ? '跳級成功！' : r.mode === 'story' ? '故事讀完了！' : r.perfect ? '全對！太厲害了' : '課程完成！';
  const sub = r.audioPending ? '聽辨題尚未完整播放，這次不授予學期金冠。可以重聽挑戰，或先以文字練習。' : failed ? (r.mode === 'jump' ? '沒關係，這表示前面的段落值得好好學。從頭學也會很快。' : '錯題已經加進錯題本。看一下指南，再試一次就會更熟。') : r.perfect ? '本次獨立答對，隔日再回想，確認是否留得住。' : '答錯的題目已加入錯題本，之後會再出現。';
  const ev = (r.events || []).map(e => e.type === 'quest' ? `<li>✅ 每日任務完成 +10 💎</li>` : e.type === 'chest' ? `<li>🎁 三項任務全完成，寶箱 +20 💎</li>` : e.type === 'badge' ? (() => { const b = BADGES.find(x => x.id === e.id); return `<li>${b.icon} 新成就：${esc(b.title)} +20 💎</li>`; })() : '').join('');
  const goalHit = game.todayXp() >= game.goalXp() && game.todayXp() - r.xp < game.goalXp();
  return `<div class="result ${failed ? 'failed' : 'passed'}">${!failed && profile().motion !== false ? confetti() : ''}${mascot(failed ? 'sad' : 'cheer', 120)}<h1>${title}</h1><p class="lead">${sub}</p>
  <div class="tiles"><div class="tile xp"><small>獲得 XP</small><b>⚡ ${r.xp}</b></div><div class="tile acc"><small>本次首次答對</small><b>🎯 ${Math.round(r.accuracy * 100)}%</b></div><div class="tile time"><small>用時</small><b>⏱ ${fmtTime(r.seconds)}</b></div>${r.maxCombo >= 3 ? `<div class="tile combo"><small>最高連對</small><b>🔥 ${r.maxCombo}</b></div>` : ''}</div>
  ${r.chest ? `<p class="chest">🎁 單元寶箱：+${r.chest} 💎</p>` : ''}${goalHit ? '<p class="chest">🎉 今天的每日目標達成！</p>' : ''}${ev ? `<ul class="events">${ev}</ul>` : ''}
  ${r.nextReview ? `<p class="muted">下次複習：${new Date(r.nextReview).toLocaleDateString('zh-TW')}</p>` : ''}${r.xp === 0 && r.mode !== 'jump' ? '<p class="muted">這個活動今天已領取三次獎勵。仍可自由練習，也可以探索新內容。</p>' : ''}
  <section class="recall-pack"><h2>🎒 這次帶走的線索</h2><p>先遮住答案，在心裡想一次，再展開核對。這是自我回想，不另計分。</p>${(r.takeaways||[]).map(q=>`<details><summary>${q.repair?'↻ 訂正回想：':'✦ 回想：'}${esc(q.prompt)}</summary><p lang="en"><b>${esc(q.answer)}</b></p><p>${esc(q.why)}</p></details>`).join('')}</section>
  <div class="row center">${r.suggestedJump ? `<section class="jump-offer card"><h2>⚡ 連續快速答對，試試更高一段？</h2><p>你已有至少 5 題新的題目連續獨立快速答對。可挑戰第 ${course.track(r.suggestedJump).no} 段跳級測驗；通過需 80% 正確率，仍可自由回頭補強。</p><button class="btn gold" data-act="result-jump" data-id="${r.suggestedJump}">開始跳級測驗 →</button></section>` : ''}${failed && r.mode === 'boss' ? `<button class="btn ghost" data-act="guide" data-id="${course.nodes.get(r.ref).unit}">看指南</button><button class="btn gold big" data-act="start" data-mode="boss" data-id="${r.ref}">再挑戰</button>` : ''}<button class="btn primary big" data-act="done">繼續</button></div></div>`;
}
const fmtTime = s => s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : `${s} 秒`;
function confetti() { return `<div class="confetti" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="--i:${i};--h:${(i * 47) % 360}"></i>`).join('')}</div>`; }

// ---------- practice / stories / library / profile ----------
function practicePage() {
  const due = game.dueUnits(), mist = game.mistakeCount(), learned = Object.values(game.state.nodes).some(n => n.n);
  const cats = {}; for (const s of course.index.vocabSets) (cats[s.category] ||= []).push(s);
  const cat = ui.vocabCat && cats[ui.vocabCat] ? ui.vocabCat : Object.keys(cats)[0];
  return `<section class="page-head">${mascot('wow', 72)}<div><p class="eyebrow">練習</p><h1>回想一次，記得更久</h1><p class="muted">練習 +${XP.practice} XP，全對再 +${XP.perfect}。到期複習 +${XP.review}。</p></div></section>
  <div class="grid">
   <section class="card practice red"><h2>📕 錯題本</h2><p>${mist ? `${mist} 題等你改正。之後在別的場次連續答對 2 次才會移出。` : '目前沒有錯題。答錯的題目會自動收進來。'}</p><button class="btn primary" data-act="practice" data-mode="mistakes" ${mist ? '' : 'disabled'}>練習錯題</button></section>
   <section class="card practice blue"><h2>↻ 到期複習</h2>${due.length ? `<ul class="due">${due.map(u => `<li><span>${course.units.get(u).icon} ${esc(course.units.get(u).title)}</span><button class="btn small" data-act="practice" data-mode="review" data-id="${u}">複習</button></li>`).join('')}</ul>` : '<p>沒有到期的單元。完成單元後，會依 1→3→7→14→30 天安排複習。</p>'}</section>
   <section class="card practice green"><h2>💪 個人化練習</h2><p>從學過的題目中，優先挑出錯題與答對率接近 70% 的題目。</p><button class="btn primary" data-act="practice" data-mode="practice" ${learned ? '' : 'disabled'}>開始練習</button></section>
   <section class="card practice violet"><h2>🎧 聽力特訓</h2><p>只練聽音選字、聽句選意思與聽寫。</p><button class="btn primary" data-act="practice" data-mode="listen" ${learned ? '' : 'disabled'}>開始聽力</button></section>
  </div>
  <section class="card"><h2>🔤 單字特訓</h2><p class="muted">1,000 張校對過的國小與國中聯想字卡，搭配既有的單字音檔作答；無音檔時使用裝置語音。</p><div class="chips">${Object.keys(cats).map(c => `<button class="chip ${c === cat ? 'on' : ''}" data-act="vcat" data-id="${esc(c)}">${esc(c)} <small>${cats[c].reduce((n, s) => n + s.size, 0)}</small></button>`).join('')}</div><div class="sets">${(cats[cat] || []).map(s => `<button class="set" data-act="practice" data-mode="vocab" data-id="${s.id}"><span>${s.icon}</span><b>${esc(s.title)}</b><small>${s.size} 字</small></button>`).join('')}</div></section>
  ${learned ? '' : '<p class="muted">先在「學習」完成一個課程，個人化練習和聽力特訓就會打開。</p>'}`;
}
function storiesPage() {
  const by = {}; for (const s of course.index.stories) (by[s.section] ||= []).push(s);
  return `<section class="page-head">${mascot('happy', 72)}<div><p class="eyebrow">故事</p><h1>邊聽邊讀，跟著情境走</h1><p class="muted">一句一句播放，途中回答理解題。讀完 +${XP.story} XP，重讀 +${XP.storyReplay}。</p></div></section>
  ${course.index.sections.filter(s => by[s.id]).map(sec => `<section class="story-sec"><h2>第 ${sec.no} 段 · ${esc(sec.title)} <small class="muted">${esc(sec.level)}</small></h2><div class="story-grid">${by[sec.id].map(st => { const done = game.state.stories[st.id]; return `<button class="story-card ${done ? 'done' : ''}" data-act="story" data-id="${st.id}"><span class="cover">${esc((st.topic || '📖').split(' ')[0])}</span><b>${esc(st.title)}</b><small>${esc(st.cefr)} · ${st.steps} 步${done ? ' · ✓ 已讀' : ''}</small></button>`; }).join('')}</div></section>`).join('')}`;
}
function libraryPage() {
  const t = course.track(ui.track);
  const links = [['../#knowledge', '📚', '完整教材首頁', '154 個知識點、圖解文法、學年微課與綜合章節'], ['../mnemonics/', '🧠', '國語聯想字卡', '1,000 字諧音與畫面聯想，附 MP3'], ['../roots/', '🌳', '字根字族', '500 組字族與構詞'], ['../#listening', '🎧', '通勤會話快播', '154 篇會話、跟讀與自行表達'], ['../#wordaudio', '🎵', '單字 MP3', '9,500 字分組連播'], ['../EN/', '🇺🇸', 'English Academy', '全英文 TOEFL／TOEIC／SAT／GRE／GMAT'], ['../#diagnostic', '🧪', '分層診斷練習', '2,000 題分 8 級']];
  return `<section class="page-head">${mascot('happy', 72)}<div><p class="eyebrow">教材</p><h1>想看懂，就翻開手冊</h1><p class="muted">每個單元都連回原本的完整教材。闖關負責練習，手冊負責說清楚。</p></div></section>
  <section class="card"><h2>${t.kind === 'branch' ? t.icon : `第 ${t.no} 段`} ${esc(t.title)} 的單元手冊</h2><ul class="lib">${t.units.map(u => `<li><span>${u.icon} ${esc(u.title)}</span><span class="row"><button class="btn small" data-act="guide" data-id="${u.id}">📘 指南</button><a class="btn small ghost" href="../${u.src}">完整教材 ↗</a></span></li>`).join('')}</ul></section>
  <div class="grid">${links.map(([href, ic, title, desc]) => `<a class="card link-card" href="${href}"><span class="big-ic">${ic}</span><b>${title}</b><small>${desc}</small></a>`).join('')}</div>`;
}
function profilePage() {
  const st = game.state, p = profile(), week = game.weekXp(), max = Math.max(game.goalXp(), ...week.map(d => d.xp));
  const crowns = Object.keys(st.crowns).length, flags = Object.keys(st.flags).length;
  return `<section class="page-head">${mascot('cheer', 72)}<div><p class="eyebrow">我的</p><h1>每一步都算數</h1><p class="muted">XP 代表投入的練習量，不是程度分數，也不能換算 CEFR 或考試成績。</p></div></section>
  <div class="tiles wide"><div class="tile"><small>總 XP</small><b>⚡ ${st.xp.total}</b></div><div class="tile"><small>連續天數</small><b>🔥 ${game.streak()}</b></div><div class="tile"><small>完成課程</small><b>✅ ${st.stats.lessons}</b></div><div class="tile"><small>金冠</small><b>👑 ${crowns}</b></div><div class="tile"><small>讀完故事</small><b>📖 ${st.stats.stories}</b></div><div class="tile"><small>改正錯題</small><b>🛠️ ${st.stats.fixed}</b></div></div>
  <section class="card"><h2>本週 XP</h2><div class="chart" role="img" aria-label="最近 7 天 XP：${week.map(d => d.xp).join('、')}">${week.map(d => `<div class="col"><span class="v">${d.xp || ''}</span><span class="bar" style="height:${Math.round(100 * d.xp / max)}%"></span><small>${'日一二三四五六'[new Date(d.day + 'T12:00').getDay()]}</small></div>`).join('')}<div class="goal-line" style="bottom:calc(${Math.round(100 * game.goalXp() / max)}% * .78 + 22px)"><span>目標 ${game.goalXp()}</span></div></div></section>
  <section class="card"><h2>成就</h2><div class="badges">${BADGES.map(b => `<div class="badge ${st.achievements[b.id] ? 'on' : ''}"><span>${b.icon}</span><b>${b.title}</b><small>${b.desc}</small></div>`).join('')}</div></section>
  <section class="card settings"><h2>設定</h2>
   <label>每日目標<select data-set="goal">${Object.entries(GOALS).map(([k, v]) => `<option value="${k}" ${p.goal === k ? 'selected' : ''}>${GOAL_INFO[k][0]}：${v} XP（${GOAL_INFO[k][1]}）</option>`).join('')}</select></label>
   <label>學習目的<select data-set="why">${Object.entries(WHY_INFO).map(([k, v]) => `<option value="${k}" ${p.why === k ? 'selected' : ''}>${v[0]} ${v[1]}</option>`).join('')}</select></label>
   <label>英文語速<select data-set="rate">${[[0.7, '慢'], [0.85, '一般'], [1, '自然']].map(([v, t]) => `<option value="${v}" ${p.rate === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
   <label class="toggle"><input type="checkbox" data-set="sound" ${p.sound !== false ? 'checked' : ''}> 答題音效</label>
   <label class="toggle"><input type="checkbox" data-set="autoplay" ${p.autoplay !== false ? 'checked' : ''}> 自動播放英文與作答後正解</label>
   <label class="toggle"><input type="checkbox" data-set="motion" ${p.motion !== false ? 'checked' : ''}> 動畫與彩帶</label>
   <p class="muted small">英文語音：${sound.voice() ? esc(sound.voice().name) : '這個裝置沒有英文語音，聽力題可改看文字'}<button class="link" data-act="say" data-text="Welcome to English Quest. Let's learn a little every day.">試聽</button></p>
   <button class="btn" data-act="placement">重新做程度測驗</button>
  </section>
  <section class="card"><h2>商店</h2><p>🧊 凍結卡 ${st.freezes}/${MAX_FREEZES} · 你有 💎 ${st.gems}</p><button class="btn" data-act="buy" ${st.gems < FREEZE_COST || st.freezes >= MAX_FREEZES ? 'disabled' : ''}>用 💎 ${FREEZE_COST} 兌換凍結卡</button></section>
  <section class="card"><h2>備份與資料</h2><p class="muted">紀錄存在這個瀏覽器，不會自動跨裝置同步，也不會上傳。換裝置前請先下載備份。</p><div class="row"><button class="btn" data-act="export">下載備份</button><label class="btn" for="import">匯入備份</label><input class="offscreen" id="import" type="file" accept="application/json,.json"><button class="btn ghost danger-text" data-act="reset">清除紀錄</button></div>${flags ? `<p>🚩 你回報了 ${flags} 題可能有問題的題目，下載備份時會一起附上（欄位 flags），方便回報給編輯。</p>` : ''}</section>
  <p class="muted small">課程版本 ${esc(course.index.version)} · 題目由站內教材自動轉換並經程式檢核，尚未逐題經教師審定。</p>`;
}

// ---------- onboarding ----------
function onboarding() {
  const step = ui.step;
  const dots = `<div class="dots">${[0, 1, 2, 3].map(i => `<span class="${i <= step ? 'on' : ''}"></span>`).join('')}</div>`;
  let body;
  if (step === 0) body = `<div class="center">${mascot('cheer', 140)}<h1>嗨！我是阿芽 🌱</h1><p class="lead">每天幾分鐘，一關一關把英文變成你的習慣。</p><p class="muted">9 段程度、82 個單元、51 篇互動故事，從第一句招呼到大考與國際檢定。</p><button class="btn primary big" data-act="ob-next">開始</button><p><label class="link" for="import">已經有備份？匯入</label><input class="offscreen" id="import" type="file" accept="application/json,.json"></p></div>`;
  else if (step === 1) body = `<h1>你學英文主要是為了？</h1><div class="pick">${Object.entries(WHY_INFO).map(([k, v]) => `<button class="pick-card ${ui.why === k ? 'on' : ''}" data-act="ob-why" data-id="${k}" aria-pressed="${ui.why === k}"><span class="big-ic">${v[0]}</span><b>${v[1]}</b><small>${v[2]}</small></button>`).join('')}</div><button class="btn primary big" data-act="ob-next">下一步</button>`;
  else if (step === 2) body = `<h1>每天想練多少？</h1><div class="pick list">${Object.entries(GOALS).map(([k, v]) => `<button class="pick-card row-card ${ui.goal === k ? 'on' : ''}" data-act="ob-goal" data-id="${k}" aria-pressed="${ui.goal === k}"><b>${GOAL_INFO[k][0]}</b><span>${v} XP / 天</span><small>${GOAL_INFO[k][1]}</small></button>`).join('')}</div><p class="muted">之後可以在「我的」隨時調整。</p><button class="btn primary big" data-act="ob-next">下一步</button>`;
  else body = `<h1>從哪裡開始？</h1><div class="pick">${`<button class="pick-card" data-act="ob-start" data-id="s1"><span class="big-ic">🌱</span><b>從零開始</b><small>第 1 段：打招呼、字母、數字</small></button><button class="pick-card" data-act="placement"><span class="big-ic">🧭</span><b>先測程度</b><small>10／20／30 題，選擇檢測深度</small></button>`}</div><p class="muted">程度測驗只用來建議起點，不是正式分級。各段落都能用「跳到這裡」測驗快速前進。</p>`;
  return `<div class="onboard"><div class="onboard-placement"><button class="btn placement-entry" data-act="placement">🧭 檢測程度・找出學習起點</button></div>${dots}${step > 0 ? '<button class="link back" data-act="ob-back">← 上一步</button>' : ''}${body}</div>${modalView()}<div id="toasts" class="toasts" aria-live="polite"></div>`;
}

// ---------- render ----------
function render(focus = false) {
  if (!game) return;
  sound.configure({ rate: profile().rate || 0.85, sound: profile().sound !== false });
  document.body.classList.toggle('reduce', profile().motion === false);
  const s = game.state.session;
  let html, newItem = false;
  if (s && !ui.paused) {
    const key = `${s.id}:${s.index}`;
    if (ui.shownFor !== key) { ui.shownFor = key; ui.a = {...freshAnswer(),transcript:!!s.transcript,hint:!!s.hint}; newItem = true; }
    html = lessonView();
  }
  else if (game.result) html = `<div class="result-wrap">${resultView()}</div>${modalView()}<div id="toasts" class="toasts" aria-live="polite"></div>`;
  else if (!game.state.profile) html = onboarding();
  else html = layout({ learn: learnPage, school:()=>schoolHome(course,game,ui.schoolGroup), practice: practicePage, stories: storiesPage, library: libraryPage, profile: profilePage }[ui.tab]?.() || learnPage(), { wide: ui.tab === 'profile' });
  document.body.classList.toggle('in-lesson', !!(s && !ui.paused) || !!game.result || !game.state.profile);
  root.innerHTML = html; paintToasts();
  if (newItem) afterNewItem();
  else if (focus && !(s && !ui.paused)) { const h = document.querySelector('.modal h2, .result h1, main h1'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
  if (ui.modal) document.querySelector('.modal .x')?.focus();
}
// a new step: autoplay its English (when enabled) and move focus to where the learner acts next
function afterNewItem() {
  const it = game.currentItem();
  if (game.state.session.mode !== 'placement' && profile().autoplay !== false && (it.type === 'listen' || it.type === 'line' || (it.type === 'input' && it.audio && !it.text) || (it.type === 'choice' && it.audio && it.text && it.kind === 'word'))) playItem(it.type === 'line' ? it.en : it.audio, it.mp3, false, true);
  const input = document.querySelector('#answer');
  if (input) input.focus();
  else { const h = document.querySelector('.lesson-body h1') || document.querySelector('#go'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
}
function playItem(text, mp3, slow = false, isAuto = false) {
  if (!text) return;
  const session=game.state.session,token=session?`${session.id}:${session.index}`:null;
  sound.play({ text, mp3: mp3 || '', slow }).then(r => {
    const s=game.state.session;if(token && (!s||token!==`${s.id}:${s.index}`))return;
    if (r === 'ok') { if (s && !s.feedback && !ui.a.transcript && text===game.currentItem()?.audio) game.heard(); }
    else if (['unavailable','error'].includes(r) && !isAuto) toast('英文播放未完成，可以重試或改看文字作答。');
  });
}
function narrate(text, slow = false, isAuto = false) {
  return sound.narrate(text, { slow }).then(r => {
    if (['error', 'unavailable'].includes(r) && !isAuto) toast('此裝置無法完成朗讀，請確認已安裝中英文語音，或閱讀畫面文字。');
  });
}
function lessonSubmit(value) {
  const s = game.state.session; if (!s || s.feedback) return;
  if (!game.submit(value)) return;
  const f = game.state.session.feedback, it = game.currentItem();
  sound.sfx(s.mode==='placement' ? 'tap' : f.ok ? (game.state.session.combo > 0 && game.state.session.combo % 5 === 0 ? 'combo' : 'correct') : 'wrong');
  root.innerHTML = lessonView();
  sound.stop();
  if (s.mode !== 'placement' && profile().autoplay !== false) narrate(answerText(it), false, true);
  document.querySelector('#go')?.focus({ preventScroll: true });
}
function lessonNext() {
  sound.stop();
  const r = game.next();
  if (game.result) { sound.sfx(game.result.passed ? 'done' : 'wrong'); ui.streakShown = false; render(true); return; }
  if (r) render();
}
async function begin(mode, id) {
  if (game.state.session) { if (ui.paused) { toast('先完成或放棄目前未完成的練習。'); ui.pop = null; render(); } return; }
  if (!await ensure(game.filesFor(mode, id))) return;
  if (!game.start(mode, id)) { toast(mode === 'practice' || mode === 'listen' ? '先完成一些課程，才有題目可以練習。' : '這一關目前無法開始。'); render(); return; }
  ui.paused = false; ui.pop = null; ui.modal = null; ui.shownFor = ''; render();
}

// ---------- events ----------
root.addEventListener('click', async e => {
  const el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
  const act = el.dataset.act, id = el.dataset.id;
  if (el.tagName === 'A') return;
  e.preventDefault();
  const s = game?.state.session, it = game?.currentItem();
  switch (act) {
    case 'ob-next': ui.step++; render(true); break;
    case 'ob-back': ui.step = Math.max(0, ui.step - 1); render(true); break;
    case 'ob-why': ui.why = id; render(); break;
    case 'ob-goal': ui.goal = id; render(); break;
    case 'ob-start': game.setup({ goal: ui.goal, why: ui.why, start: id }); ui.track = id; await ensure([id]); render(true); break;
    case 'placement': if (s) { toast('目前的練習已保留，請先接續完成，或回學習頁放棄後再開始檢測。'); break; } ui.modal = 'placement'; render(); break;
    case 'placement-start': if (!game.state.profile) game.setup({goal:ui.goal,why:ui.why,start:'s1'}); await begin('placement',Number(el.dataset.size)); break;
    case 'result-jump': game.clearResult(); await begin('jump',id); break;
    case 'accept': game.acceptPlacement(id); ui.track = id; game.clearResult(); ui.tab = 'learn'; location.hash = '#learn'; await ensure([id]); render(true); break;
    case 'school-group': ui.schoolGroup=id; render(true); break;
    case 'tracks': ui.modal = 'tracks'; render(); break;
    case 'advanced-track': game.clearResult();
    case 'unit-select':
    case 'track': ui.track = id; if(semesterOf(id))ui.schoolGroup=semesterOf(id).group; game.update({start:id}); ui.modal = null; ui.pop = null; ui.tab = 'learn'; if (location.hash !== '#learn') location.hash = '#learn'; render(true); if (el.dataset.unit) document.getElementById('u-'+el.dataset.unit)?.scrollIntoView({block:'start',behavior:profile().motion===false?'instant':'smooth'}); else window.scrollTo(0, 0); break;
    case 'pop': ui.pop = ui.pop === id ? null : id; sound.sfx('tap'); render(); document.querySelector('.pop .btn')?.focus({ preventScroll: true }); break;
    case 'start': game.clearResult(); await begin(el.dataset.mode, id); break;
    case 'story': { const st = game.unitStoryStatus([...course.units.values()].find(u => u.story === id)?.id); if (st === 'locked' && ui.tab === 'learn') { toast('先完成這個單元的課程，故事就會打開。'); break; } await begin('story', id); break; }
    case 'jump': ui.modal = null; await begin('jump', id); break;
    case 'practice': await begin(el.dataset.mode, id); break;
    case 'vcat': ui.vocabCat = id; render(); break;
    case 'guide': ui.guide = id; ui.modal = 'guide'; if (await ensure(game.filesFor('lesson',course.units.get(id)?.nodes[0]?.id))) render(); break;
    case 'close': ui.modal = null; render(); break;
    case 'shop': ui.modal = 'shop'; render(); break;
    case 'buy': if (game.buyFreeze()) { toast('🧊 已兌換一張凍結卡'); } render(); break;
    case 'reset': ui.modal = 'reset'; render(); break;
    case 'reset-yes': game.reset(); ui.modal = null; ui.step = 0; ui.track = 's1'; render(true); break;
    case 'export': { const blob = new Blob([game.export()], { type: 'application/json' }), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = `english-quest-${game.today()}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); break; }
    case 'prompt-say': narrate(el.dataset.text); break;
    case 'answer-say': if (s?.feedback) narrate(answerText(it), el.dataset.slow === '1'); break;
    case 'explain-say': if (s?.feedback) narrate(it.why); break;
    case 'stop-say': sound.stop(); break;
    case 'say': playItem(el.dataset.text, el.dataset.mp3, el.dataset.slow === '1'); break;
    case 'resume': if (await ensure(game.filesFor(s.mode, s.ref)) && game.validSession()) { ui.paused = false; ui.shownFor = ''; render(); } else { toast('這個練習的內容已更新，已重新開始。'); render(); } break;
    case 'discard': game.abandon(); ui.paused = false; render(); break;
    case 'exit': ui.modal = 'exit'; render(); break;
    case 'pause': sound.stop(); ui.modal = null; ui.paused = true; ui.tab = 'learn'; render(true); break;
    // lesson
    case 'choose': if (!s.feedback) { ui.a.value = el.dataset.v; sound.sfx('tap'); root.innerHTML = lessonView(); document.querySelector('.opt.sel')?.focus({ preventScroll: true }); } break;
    case 'tok': if (!s.feedback) { ui.a.tokens.push(Number(el.dataset.i)); root.innerHTML = lessonView(); (document.querySelector('.bank .tok:not(:disabled)') || document.querySelector('#go'))?.focus({ preventScroll: true }); } break;
    case 'untok': if (!s.feedback) { ui.a.tokens = ui.a.tokens.filter(i => i !== Number(el.dataset.i)); root.innerHTML = lessonView(); } break;
    case 'mL': if (!s.feedback) { ui.a.left = Number(el.dataset.i); ui.a.flash = null; root.innerHTML = lessonView(); } break;
    case 'mR': if (!s.feedback && ui.a.left !== null) {
      const r = Number(el.dataset.i);
      if (r === ui.a.left) { ui.a.done.push(r); ui.a.left = null; sound.sfx('tap'); } else { ui.a.wrong++; ui.a.flash = { L: ui.a.left, R: r }; ui.a.left = null; sound.sfx('wrong'); }
      if (ui.a.done.length === it.pairs.length) { lessonSubmit(ui.a.wrong ? 'mismatched' : 'matched'); break; }
      root.innerHTML = lessonView(); break;
    } else if (!s.feedback) toast('先點左邊的英文'); break;
    case 'hint': if (game.hint()) { ui.a.hint = true; root.innerHTML = lessonView(); } break;
    case 'transcript': game.transcript(); ui.a.transcript = true; sound.stop(); root.innerHTML = lessonView(); break;
    case 'zh': ui.a.zh = true; root.innerHTML = lessonView(); break;
    case 'check': lessonSubmit(it.type === 'build' ? ui.a.tokens.map(i => it.words[i]).join(' ') : it.type === 'input' ? ui.a.text : ui.a.value); break;
    case 'next': lessonNext(); break;
    case 'flag': { const on = game.flag(el.dataset.id); toast(on ? '🚩 已記下，下載備份時會附上。謝謝！' : '已取消回報'); root.innerHTML = lessonView(); break; }
    case 'streak-ok': ui.streakShown = true; render(true); break;
    case 'done': { const r = game.result; game.clearResult(); ui.streakShown = false; if (r?.mode === 'jump' && r.passed) { ui.track = r.ref; game.update({start:r.ref}); } render(true); break; }
  }
});
root.addEventListener('input', e => {
  if (e.target.id === 'school-draft') saveSchoolDraft();
  if (e.target.id === 'answer') { ui.a.text = e.target.value; const go = document.querySelector('#go'); if (go) go.disabled = !ui.a.text.trim(); }
});
let composing=false;
root.addEventListener('compositionstart',()=>{composing=true;});
root.addEventListener('compositionend',()=>{composing=false;});
root.addEventListener('submit', e => { e.preventDefault(); if (!composing && e.target.dataset.form === 'answer' && ui.a.text.trim()) lessonSubmit(ui.a.text); });
root.addEventListener('change', async e => {
  const set = e.target.dataset.set;
  if (set) { const v = e.target.type === 'checkbox' ? e.target.checked : set === 'rate' ? Number(e.target.value) : e.target.value; game.update({ [set]: v }); toast('設定已儲存'); render(); return; }
  if (e.target.id === 'import' && e.target.files?.[0]) {
    const f = e.target.files[0]; if (f.size > 5e6) { toast('備份檔超過 5 MB，請確認檔案。'); return; }
    if (game.restore(await f.text())) { toast('備份已匯入'); ui.track = game.state.profile?.start || 's1'; ui.paused = !!game.state.session; await ensure([ui.track]); } else toast(game.warning || '無法讀取備份');
    render(true);
  }
});
document.addEventListener('keydown', e => {
  if(e.isComposing||composing||e.keyCode===229)return;
  if (!game) return;
  if (e.key === 'Escape' && ui.modal) { ui.modal = null; render(); return; }
  const s = game.state.session; if (!s || ui.paused || ui.modal) return;
  const it = game.currentItem(), inField = e.target.matches?.('input, textarea, select');
  if (e.key === 'Enter' && !inField) { const go = document.querySelector('#go'); if (go && !go.disabled && document.activeElement !== go) { e.preventDefault(); go.click(); } return; }
  if (inField || s.feedback || e.ctrlKey || e.metaKey || e.altKey) return;
  const n = Number(e.key);
  if (n >= 1 && n <= 9) {
    if (it.type === 'choice' || it.type === 'listen') document.querySelectorAll('.opt')[n - 1]?.click();
    else if (it.type === 'build') document.querySelectorAll('.bank .tok')[n - 1]?.click();
  } else if (e.key === 'Backspace' && it.type === 'build' && ui.a.tokens.length) { e.preventDefault(); ui.a.tokens.pop(); root.innerHTML = lessonView(); }
  else if (e.key === ' ' && (it.type === 'listen' || it.audio)) { e.preventDefault(); playItem(it.audio, it.mp3); }
});
window.addEventListener('hashchange', () => {
  const tab = location.hash.slice(1).split('/')[0];
  if (tab === 'placement' && game) { if (game.state.session) { ui.paused=true; ui.tab='learn'; } else ui.modal='placement'; render(true); return; }
  if (TABS.some(([id]) => id === tab)) { if(tab==='school'&&!game.state.profile)game.setup({goal:'regular',why:'school',start:'s1'}); ui.tab = tab; ui.pop = null; if (game?.state.session && !ui.paused) ui.paused = true; game?.clearResult(); render(true); window.scrollTo(0, 0); }
});
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && game) { game.refreshDay(); if (!game.state.session || ui.paused) render(); } });
window.addEventListener('pagehide', () => sound.stop());
globalThis.speechSynthesis?.addEventListener?.('voiceschanged', () => { if (ui.tab === 'profile' && !game?.state.session) render(); });

async function boot() {
  root.innerHTML = `<div class="boot">${mascot('happy', 96)}<p>載入課程中…</p></div>`;
  try { course = createCourse(await getJson('course/index.json')); }
  catch { root.innerHTML = `<div class="boot">${mascot('sad', 96)}<p>課程資料載入失敗。請確認網路後重新整理，或先使用<a href="../">完整教材網</a>。</p></div>`; return; }
  game = createGame({ storage, course });
  const tab = location.hash.slice(1).split('/')[0]; if (TABS.some(([id]) => id === tab)) ui.tab = tab;
  if(tab==='school'&&!game.state.profile)game.setup({goal:'regular',why:'school',start:'s1'});
  ui.track = game.state.profile?.start || 's1';
  if(semesterOf(ui.track))ui.schoolGroup=semesterOf(ui.track).group;
  const firstOpen = course.index.sections.find(sec => game.trackUnlocked(sec.id) && game.current(sec.id));
  if (game.state.profile && firstOpen && !game.trackUnlocked(ui.track)) ui.track = firstOpen.id;
  const s = game.state.session;
  if (s) { ui.paused = true; await ensure(game.filesFor(s.mode, s.ref)); game.validSession(); }
  render();
  if (location.hash === '#placement' && !s) {
    ui.modal = 'placement'; render();
  }
}
boot();

function saveSchoolDraft(){
 const panel=document.querySelector('.semester-project');if(!panel)return;
 const text=panel.querySelector('#school-draft')?.value || '', checks=[...panel.querySelectorAll('.school-check')].map(el=>el.checked);
 if(game.saveSchoolWork(panel.dataset.semester,text,checks)){const status=panel.querySelector('#school-save-status');if(status)status.textContent=game.warning || '已儲存於此瀏覽器';}
}
root.addEventListener('change',e=>{if(e.target.matches('.school-check'))saveSchoolDraft();});
