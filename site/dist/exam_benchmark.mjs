// 考試對標羅盤：選考試 → 看官方格式與得分地圖 → 6 題快篩（附把握度）→ 錯題間隔回收 → 週計畫 → 考前心態。
// 依據：提取練習、間隔、交錯、先測效應、高信心錯誤修正、自我決定論與執行意圖。不換算正式分數。
import {
  BENCH_EXAMS, BENCH_ITEMS, CEFR_LEVELS, EVIDENCE_KINDS, GEPT_ROW, GUIDED_HOURS, GUIDED_HOURS_SOURCE,
  SKILL_LABELS, CHECKED_AT, EXAM_PACE, MIXED_PRACTICE, FORM_PLAN, itemsFor, examById
} from './exam_benchmark_data.mjs?v=benchcd20261128';
import {scheduleRecall} from './recall.mjs';
import {speak, stopAudio} from './audio.mjs';

export const BENCH_KEY = 'eq_exam_benchmark_v1';
export const RETEST_GAP_HOURS = FORM_PLAN[1].gapHours;
export const CONFIDENCE = [['sure', '很確定'], ['mostly', '有點把握'], ['guess', '用猜的']];
export const WEEKLY_MINUTES = [60, 90, 120, 180, 240, 300, 420];
const CONF_IDS = CONFIDENCE.map(([id]) => id);
const FORMS = FORM_PLAN.map(f => f.id);
const FORM_GAP = Object.fromEntries(FORM_PLAN.map(f => [f.id, f.gapHours]));
const DAY = 86_400_000;
const HOUR = 3_600_000;
const ITEMS = new Map(BENCH_ITEMS.map(item => [item.id, item]));

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const multiline = value => esc(value).replace(/\n/g, '<br>');
function browserStorage() { try { return globalThis.localStorage; } catch { return null; } }
const gapLabel = hours => hours >= 48 ? `${Math.round(hours / 24)} 天` : `${hours} 小時`;

// ───────── 狀態 ─────────
export function emptyBench() {
  return {exam: 'cap', plans: {}, forms: {}, review: {}, exposure: {}, wins: {}};
}

export function validPick(item, pick) {
  const n = item?.options?.length || 0;
  const ok = v => Number.isInteger(v) && v >= 0 && v < n;
  if (!item) return false;
  if (item.select === 2) return Array.isArray(pick) && pick.length === 2 && pick[0] !== pick[1] && pick.every(ok);
  return ok(pick);
}

export function isCorrect(item, pick) {
  if (!validPick(item, pick)) return false;
  if (item.select === 2) return pick.every(v => item.answer.includes(v));
  return pick === item.answer;
}

function cleanPlan(exam, p) {
  return {
    target: exam.targets.some(t => t.id === p?.target) ? p.target : exam.targets[0].id,
    date: /^\d{4}-\d{2}-\d{2}$/.test(p?.date || '') && Number.isFinite(Date.parse(p.date)) ? p.date : '',
    minutes: WEEKLY_MINUTES.includes(Number(p?.minutes)) ? Number(p.minutes) : 120,
    level: CEFR_LEVELS.includes(p?.level) ? p.level : '',
    intent: typeof p?.intent === 'string' ? p.intent.trim().slice(0, 120) : ''
  };
}

export function planFor(state, examId) {
  const exam = examById(examId);
  return cleanPlan(exam, state.plans[examId]);
}

export function readBench(storage) {
  let saved;
  try { saved = JSON.parse(storage?.getItem(BENCH_KEY) || '{}'); } catch { saved = {}; }
  if (!saved || typeof saved !== 'object') saved = {};
  const state = emptyBench();
  if (examById(saved.exam)) state.exam = saved.exam;
  for (const [id, plan] of Object.entries(saved.plans || {})) {
    const exam = examById(id);
    if (exam && plan && typeof plan === 'object') state.plans[id] = cleanPlan(exam, plan);
  }
  for (const [key, form] of Object.entries(saved.forms || {})) {
    const [examId, formId] = key.split(':');
    if (!examById(examId) || !FORMS.includes(formId) || !form || typeof form !== 'object') continue;
    const items = itemsFor(examId, formId);
    const answers = {};
    for (const item of items) {
      const a = form.answers?.[item.id];
      if (!a || !validPick(item, a.pick) || !CONF_IDS.includes(a.conf) || !Number.isFinite(a.at)) continue;
      answers[item.id] = {pick: a.pick, conf: a.conf, at: a.at, correct: isCorrect(item, a.pick), assisted: a.assisted === true};
    }
    const times = Object.values(answers).map(a => a.at);
    if (!times.length) continue;
    const startedAt = Number.isFinite(form.startedAt) ? Math.min(form.startedAt, ...times) : Math.min(...times);
    state.forms[key] = {startedAt, answers, finishedAt: times.length === items.length ? Math.max(...times) : null};
  }
  for (const [id, r] of Object.entries(saved.review || {})) {
    if (!ITEMS.has(id) || !Number.isFinite(r?.due) || !Number.isFinite(r?.reviewed) || !Number.isInteger(r?.step)) continue;
    state.review[id] = {step: Math.max(0, Math.min(4, r.step)), days: Number(r.days) || 1, due: r.due, reviewed: r.reviewed, rating: r.rating === 'good' ? 'good' : 'again'};
  }
  for (const [id, n] of Object.entries(saved.wins || {})) {
    if (examById(id) && Number.isInteger(n) && n > 0) state.wins[id] = Math.min(n, 9999);
  }
  for (const [id, steps] of Object.entries(saved.exposure || {})) {
    if (examById(id) && Array.isArray(steps)) state.exposure[id] = [...new Set(steps.filter(n => Number.isInteger(n) && n >= 0 && n < 4))];
  }
  return state;
}

export function saveBench(storage, state) {
  if (typeof storage?.setItem !== 'function') return false;
  try { storage.setItem(BENCH_KEY, JSON.stringify(state)); return true; } catch { return false; }
}

// ───────── 快篩作答 ─────────
const formKey = (examId, form) => `${examId}:${form}`;

export function bucketOf(correct, conf) {
  if (correct) return conf === 'guess' ? 'lucky' : 'solid';
  return conf === 'sure' ? 'hyper' : 'fresh';
}

// 只記第一次作答。答錯或用猜的答對，排入隔天回收。
export function recordFormAnswer(state, itemId, pick, conf, now = Date.now(), {assisted = false} = {}) {
  const item = ITEMS.get(itemId);
  if (!item || !validPick(item, pick) || !CONF_IDS.includes(conf)) return null;
  const key = formKey(item.exam, item.form);
  const form = state.forms[key] || {startedAt: now, answers: {}, finishedAt: null};
  if (form.answers[itemId]) return null;
  const correct = isCorrect(item, pick);
  form.answers[itemId] = {pick, conf, at: now, correct, assisted: assisted === true};
  if (Object.keys(form.answers).length === itemsFor(item.exam, item.form).length) form.finishedAt = now;
  state.forms[key] = form;
  const bucket = bucketOf(correct, conf);
  if (bucket !== 'solid') state.review[itemId] = scheduleRecall(state.review[itemId] || null, 'again', now);
  return {item, correct, bucket};
}

export function nextFormItem(state, examId, form) {
  const answers = state.forms[formKey(examId, form)]?.answers || {};
  return itemsFor(examId, form).find(item => !answers[item.id]) || null;
}

export function formStatus(state, examId, form, now = Date.now()) {
  const items = itemsFor(examId, form);
  const record = state.forms[formKey(examId, form)];
  const answered = Object.keys(record?.answers || {}).length;
  const right = Object.values(record?.answers || {}).filter(a => a.correct).length;
  const status = {total: items.length, answered, right, done: !!record?.finishedAt, startedAt: record?.startedAt || null, finishedAt: record?.finishedAt || null};
  const i = FORMS.indexOf(form);
  if (i > 0) {
    const prev = state.forms[formKey(examId, FORMS[i - 1])];
    status.after = FORMS[i - 1];
    status.waitHours = prev?.finishedAt ? Math.max(0, Math.ceil((prev.finishedAt + FORM_GAP[form] * HOUR - now) / HOUR)) : null;
  }
  return status;
}

export function summarizeForm(state, examId, form) {
  const items = itemsFor(examId, form);
  const record = state.forms[formKey(examId, form)];
  const skills = {};
  const buckets = {solid: [], lucky: [], hyper: [], fresh: []};
  let right = 0, answered = 0, assisted = 0;
  for (const item of items) {
    skills[item.skill] ||= {skill: item.skill, right: 0, total: 0};
    const a = record?.answers?.[item.id];
    if (!a) continue;
    answered++;
    skills[item.skill].total++;
    if (a.correct) { right++; skills[item.skill].right++; }
    if (a.assisted) assisted++;
    buckets[bucketOf(a.correct, a.conf)].push(item);
  }
  return {examId, form, total: items.length, answered, right, assisted, done: !!record?.finishedAt, skills: Object.values(skills), buckets};
}

// 延後保留：每一卷要在前一卷完成後隔夠久才開始（B 20 小時、C 7 天、D 14 天），那一步才算進步比較。
// 跳過中間某卷時，需要的間隔是中間各步相加。
export function requiredGapHours(fromForm, toForm) {
  const from = FORMS.indexOf(fromForm);
  const to = FORMS.indexOf(toForm);
  if (from < 0 || to <= from) return null;
  return FORMS.slice(from + 1, to + 1).reduce((sum, id) => sum + FORM_GAP[id], 0);
}

export function compareForms(state, examId) {
  const done = FORMS.filter(form => state.forms[formKey(examId, form)]?.finishedAt);
  if (done.length < 2) return null;
  const forms = done.map(form => summarizeForm(state, examId, form));
  const steps = done.slice(1).map((to, i) => {
    const from = done[i];
    const gapHours = requiredGapHours(from, to);
    const elapsed = state.forms[formKey(examId, to)].startedAt - state.forms[formKey(examId, from)].finishedAt;
    return {from, to, gapHours, valid: elapsed >= gapHours * HOUR};
  });
  const skills = forms[0].skills.map(s => ({
    skill: s.skill,
    cells: forms.map(f => {
      const k = f.skills.find(x => x.skill === s.skill) || {right: 0, total: 0};
      return {form: f.form, right: k.right, total: k.total};
    })
  }));
  return {forms, steps, skills};
}

// ───────── 錯題回收（1→3→7→14→30 天）─────────
export function dueReviews(state, now = Date.now(), examId = null) {
  return Object.entries(state.review)
    .filter(([id, r]) => r.due <= now && (!examId || ITEMS.get(id)?.exam === examId))
    .sort((x, y) => x[1].due - y[1].due)
    .map(([id]) => ITEMS.get(id));
}

export function upcomingReviews(state, examId = null) {
  return Object.entries(state.review).filter(([id]) => !examId || ITEMS.get(id)?.exam === examId).length;
}

export function recordReview(state, itemId, pick, now = Date.now()) {
  const item = ITEMS.get(itemId);
  const previous = state.review[itemId];
  if (!item || !previous || !validPick(item, pick)) return null;
  const correct = isCorrect(item, pick);
  if (correct) state.wins[item.exam] = (state.wins[item.exam] || 0) + 1;
  if (correct && previous.step >= 4 && now - previous.reviewed >= DAY) {
    delete state.review[itemId];
    return {item, correct, graduated: true};
  }
  state.review[itemId] = scheduleRecall(previous, correct ? 'good' : 'again', now);
  return {item, correct, graduated: false, next: state.review[itemId]};
}

// ───────── 週計畫 ─────────
export function daysUntil(date, now = Date.now()) {
  if (!date) return null;
  const t = Date.parse(`${date}T00:00:00`);
  if (!Number.isFinite(t)) return null;
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  return Math.round((t - today.getTime()) / DAY);
}

export const PHASES = {
  open: {label: '尚未設定考期', advice: '先設定考試日期，計畫會依剩餘時間調整比例。', mix: {weak: 35, mixed: 20, review: 15, vocab: 20, timed: 10}},
  base: {label: '打底期（12 週以上）', advice: '語言能力與單字是長期投資，限時練習每週一次就好。', mix: {weak: 35, mixed: 20, review: 15, vocab: 20, timed: 10}},
  build: {label: '強化期（4–12 週）', advice: '弱項練習與交錯題型並重，開始固定做限時小節。', mix: {weak: 30, mixed: 25, review: 15, vocab: 15, timed: 15}},
  sprint: {label: '衝刺期（4 週內）', advice: '每週一回完整限時，錯題回收比新題更重要。', mix: {weak: 20, mixed: 20, review: 20, vocab: 10, timed: 30}},
  eve: {label: '考前三天', advice: '不學新東西：回收錯題、看自己的破題線索、照考試時段作息、睡飽。', mix: {weak: 0, mixed: 30, review: 50, vocab: 20, timed: 0}},
  past: {label: '考期已過', advice: '把正式成績記下來，再設定下一次考試日期。', mix: {weak: 35, mixed: 20, review: 15, vocab: 20, timed: 10}}
};

export function phaseFor(days) {
  if (days === null) return 'open';
  if (days < 0) return 'past';
  if (days <= 3) return 'eve';
  if (days <= 28) return 'sprint';
  if (days <= 84) return 'build';
  return 'base';
}

export function weakestSkill(state, examId) {
  const exam = examById(examId);
  const share = skill => exam.pointMap.find(p => p.skill === skill)?.share ?? 0;
  const latest = [...FORMS].reverse().map(f => summarizeForm(state, examId, f)).find(s => s.answered > 0);
  if (!latest) {
    const top = [...exam.pointMap].sort((x, y) => (y.share ?? 0) - (x.share ?? 0))[0];
    return {skill: top.skill, fromData: false};
  }
  const ranked = latest.skills.filter(s => s.total > 0)
    .sort((x, y) => (x.right / x.total) - (y.right / y.total) || share(y.skill) - share(x.skill));
  return {skill: ranked[0].skill, fromData: true, rate: ranked[0].right / ranked[0].total};
}

export function hoursNeeded(level, targetCefr) {
  if (!level || !targetCefr || !GUIDED_HOURS[level] || !GUIDED_HOURS[targetCefr]) return null;
  if (CEFR_LEVELS.indexOf(level) >= CEFR_LEVELS.indexOf(targetCefr)) return [0, 0];
  const [curLow, curHigh] = GUIDED_HOURS[level];
  const [tgtLow, tgtHigh] = GUIDED_HOURS[targetCefr];
  return [Math.max(0, tgtLow - curHigh), Math.max(0, tgtHigh - curLow)];
}

export function buildPlan(state, examId, now = Date.now()) {
  const exam = examById(examId);
  const plan = planFor(state, examId);
  const target = exam.targets.find(t => t.id === plan.target);
  const days = daysUntil(plan.date, now);
  const phaseId = phaseFor(days);
  const phase = PHASES[phaseId];
  const weak = weakestSkill(state, examId);
  const practice = exam.practice;
  const weakLink = practice[weak.skill] || MIXED_PRACTICE[examId];
  const minutesOf = pct => Math.round(plan.minutes * pct / 100 / 5) * 5;
  const blocks = [
    {id: 'weak', label: `弱項提取：${SKILL_LABELS[weak.skill] || weak.skill}`, why: '先回想再看解析（提取練習），難度以答對約七到八成為宜。', link: weakLink},
    {id: 'mixed', label: '交錯混合題', why: '不同題型混在一起練，練的是「判斷這題考什麼」。', link: MIXED_PRACTICE[examId]},
    {id: 'review', label: '錯題回收', why: '隔 1、3、7、14、30 天再做一次，比當天重做更能留住。', link: {label: '本頁到期錯題', href: '#benchmark', tab: 'check'}},
    {id: 'vocab', label: '單字與語塊', why: '每次 10–15 張，中英雙向回想，答錯的隔天再見。', link: practice.vocab || {label: '9,500 張字卡學習', href: '#wordpractice'}},
    {id: 'timed', label: '限時暴露', why: '照官方時間做一個小節，讓考場節奏變成熟悉的事；離考試越近，越常改用官方歷屆試題或官方模考。', link: practice.timed, official: exam.official?.[0] || null}
  ].map(block => ({...block, minutes: minutesOf(phase.mix[block.id])})).filter(block => block.minutes > 0);
  const weeks = days === null || days < 0 ? null : Math.max(0, days / 7);
  const available = weeks === null ? null : Math.round(weeks * plan.minutes / 60);
  const need = hoursNeeded(plan.level, target?.cefr || exam.suggest);
  return {exam, plan, target, days, phaseId, phase, weak, blocks, available, need};
}

export function milestones(state, examId, now = Date.now()) {
  const a = formStatus(state, examId, 'A', now);
  const steps = compareForms(state, examId)?.steps || [];
  const validTo = form => steps.some(step => step.to === form && step.valid);
  return [
    {label: '完成 A 卷快篩，讀完每個錯因', done: a.done},
    {label: '回收錯題時答對一題（隔天以上更好）', done: (state.wins[examId] || 0) > 0},
    {label: '隔 20 小時以上完成 B 卷，比較同技能', done: validTo('B')},
    {label: '再隔一週完成 C 卷，看一週後還記得多少', done: validTo('C')},
    {label: '用官方歷屆試題或官方模考，照官方時間做完一個分節', done: (state.exposure[examId] || []).includes(2)}
  ];
}

export function exposureSteps(exam) {
  const first = exam.sections.find(s => s.minutes) || null;
  const section = first ? `${first.name} ${first.minutes} 分鐘` : exam.time;
  return [
    '不計時做一個題型小節，邊做邊說出選擇理由。',
    '同一題型限時，時間先給官方的 1.2 倍，再縮到 1 倍。',
    `用官方歷屆試題或官方模考，照官方時間完成一個完整分節（${section}）。`,
    '在和正式考試相同的時段做一回完整模考，記錄結果與狀態。'
  ];
}

// ───────── 介面 ─────────
let ui = {tab: 'map', quiz: null, reviewMode: false, message: ''};
export function resetBenchUi() { stopAudio(); ui = {tab: 'map', quiz: null, reviewMode: false, message: ''}; }

const TABS = [['map', '對標地圖'], ['check', '快篩與回收'], ['plan', '週計畫'], ['mind', '考前心態']];
const BUCKETS = {
  solid: ['穩固', '答對且有把握'],
  lucky: ['僥倖', '答對但用猜的・明天回收'],
  hyper: ['高信心錯誤', '很確定卻答錯・最值得訂正'],
  fresh: ['新學到', '不確定且答錯・已排入回收']
};

function linkHtml(link, cls = 'btn quiet small') {
  if (!link) return '';
  if (link.tab) return `<button type="button" class="${cls}" data-bench-tab="${esc(link.tab)}">${esc(link.label)}</button>`;
  return `<a class="${cls}" href="${esc(link.href)}">${esc(link.label)}</a>`;
}

function examPicker(state) {
  return `<div class="bench-picker" role="radiogroup" aria-label="選擇要對標的考試">${BENCH_EXAMS.map(exam => {
    const on = exam.id === state.exam;
    return `<button type="button" role="radio" aria-checked="${on}" class="bench-exam${on ? ' is-on' : ''}" data-bench-exam="${exam.id}" style="--bench-exam:${exam.accent}">
      <span class="bench-exam-icon" aria-hidden="true">${exam.icon}</span><strong>${esc(exam.short)}</strong><small>${esc(exam.who)}</small></button>`;
  }).join('')}</div>`;
}

function todayStrip(state, now) {
  const exam = examById(state.exam);
  const due = dueReviews(state, now, exam.id);
  const pending = FORM_PLAN.map(plan => ({plan, ...formStatus(state, exam.id, plan.id, now)})).find(st => !st.done);
  const planButton = '<button type="button" class="btn secondary small" data-bench-tab="plan">看週計畫</button>';
  let next;
  if (ui.quiz) next = {text: ui.quiz.mode === 'review' ? '回收進行中：每題答完都會重新排下次出現的時間。' : `${ui.quiz.form} 卷作答中：選答案後再選把握度，做完會看到校準結果。`, action: ''};
  else if (due.length) next = {text: `有 ${due.length} 道錯題到了回收時間，先做這個（約 ${Math.max(1, due.length)} 分鐘）。`, action: `<button type="button" class="btn primary small" data-bench-review="start">開始回收</button>`};
  else if (!pending) next = {text: 'A、B、C、D 四卷都完成了。照週計畫練，錯題到期時這裡會提醒你；考前用官方題本做一次完整模考。', action: planButton};
  else if (pending.plan.id === 'A') next = {text: pending.answered ? `A 卷做到第 ${pending.answered + 1} 題，接著完成就好。` : '先做 6 題 A 卷快篩：答錯也是在幫大腦預熱。', action: `<button type="button" class="btn primary small" data-bench-start="A">${pending.answered ? '繼續 A 卷' : '開始 A 卷快篩'}</button>`};
  else if (pending.waitHours > 0 && !pending.answered) next = {text: `${pending.after} 卷完成了。${pending.plan.id} 卷（${pending.plan.when}）約 ${gapLabel(pending.waitHours)}後開放比較；現在先照週計畫練弱項。`, action: planButton};
  else next = {text: pending.answered ? `${pending.plan.id} 卷做到第 ${pending.answered + 1} 題，接著完成就好。` : `${pending.plan.id} 卷可以做了（${pending.plan.when}）：同樣的技能、全新的題目，看看還記得多少。`, action: `<button type="button" class="btn primary small" data-bench-start="${pending.plan.id}">${pending.answered ? '繼續' : '開始'} ${pending.plan.id} 卷</button>`};
  return `<section class="bench-today" aria-label="今天這一輪"><div><span class="bench-kicker">今天這一輪・${esc(exam.short)}</span><p>${esc(next.text)}</p></div>${next.action}</section>`;
}

function ladder(state) {
  const rows = [...BENCH_EXAMS, GEPT_ROW];
  const col = level => CEFR_LEVELS.indexOf(level) + 2;
  return `<section class="bench-card bench-ladder-card" aria-labelledby="bench-ladder-title">
    <div class="bench-card-head"><h2 id="bench-ladder-title">CEFR 對標階梯</h2><p>同一把尺看不同考試。實線是官方對照，虛線是本站估計，點線是開始題型訓練前建議的閱讀程度。</p></div>
    <div class="bench-ladder" role="list" aria-label="各考試與 CEFR 等級對照">
      <div class="bench-ladder-row bench-ladder-head" aria-hidden="true"><span>考試</span>${CEFR_LEVELS.map(l => `<span>${l}</span>`).join('')}</div>
      ${rows.map(row => {
        const on = row.id === state.exam;
        const note = row.cefr.map(seg => /[ABC][12]/.test(seg.label) ? seg.label : `${seg.from === seg.to ? seg.from : `${seg.from}–${seg.to}`}：${seg.label}`).join('・');
        const kinds = [...new Set(row.cefr.map(seg => seg.kind))].map(k => EVIDENCE_KINDS[k].label).join('、');
        return `<div class="bench-ladder-row${on ? ' is-on' : ''}" role="listitem" style="--bench-exam:${row.accent}">
          <span class="bench-ladder-name">${row.icon} ${esc(row.short)}${on ? '<span class="sr-only">（目前選擇）</span>' : ''}</span>
          ${row.cefr.map(seg => `<span class="bench-seg kind-${seg.kind}" aria-hidden="true" style="grid-column:${col(seg.from)} / ${col(seg.to) + 1}" title="${esc(`${row.name}：${seg.label}（${EVIDENCE_KINDS[seg.kind].label}）`)}"><b>${esc(seg.label)}</b></span>`).join('')}
          <p class="bench-ladder-note">${esc(note)}<small>（${esc(kinds)}）</small></p>
        </div>`;
      }).join('')}
    </div>
    <ul class="bench-legend">${Object.entries(EVIDENCE_KINDS).map(([k, v]) => `<li><i class="kind-${k}" aria-hidden="true"></i><strong>${v.label}</strong>：${v.note}</li>`).join('')}</ul>
    <p class="bench-fine">TOEIC 依 ETS 對照研究（聽力、閱讀各有最低分，總分為相加）；GEPT 依 LTTC 公布的級數對照。會考、統測、學測、SAT、GRE、GMAT 沒有官方 CEFR 對照，本站不換算。<a href="${GUIDED_HOURS_SOURCE.url}" target="_blank" rel="noopener">升一級約需多少時數 ↗</a></p>
  </section>`;
}

function examProfile(exam) {
  const bars = exam.pointMap.some(p => p.share !== null);
  return `<section class="bench-card bench-profile" style="--bench-exam:${exam.accent}" aria-labelledby="bench-profile-title">
    <div class="bench-card-head"><h2 id="bench-profile-title">${exam.icon} ${esc(exam.name)}</h2><p>${esc(exam.who)}・${esc(exam.time)}</p></div>
    <div class="bench-profile-grid">
      <div>
        <h3>考試結構</h3>
        <ul class="bench-sections">${exam.sections.map(s => `<li><strong>${esc(s.name)}</strong><span>${esc(s.detail)}${s.minutes ? `・${s.minutes} 分鐘` : ''}</span></li>`).join('')}</ul>
        <h3>成績怎麼呈現</h3><p>${esc(exam.report)}</p>
        ${exam.cefrNote ? `<p class="bench-fine">${esc(exam.cefrNote)}</p>` : ''}
      </div>
      <div>
        <h3>${bars ? '得分地圖：分數從哪裡來' : '題型地圖'}</h3>
        <ul class="bench-points">${exam.pointMap.map(p => `<li>
          <div class="bench-point-top"><span>${esc(p.label)}</span>${p.share !== null ? `<b>${p.share}%</b>` : ''}</div>
          ${p.share !== null ? `<div class="bench-bar" aria-hidden="true"><i style="width:${Math.min(100, p.share * 2.5)}%"></i></div>` : ''}
          <small>${esc(p.detail)}</small></li>`).join('')}</ul>
        <p class="bench-fine">${esc(exam.scoreNote)}</p>
      </div>
    </div>
    <p class="bench-pace"><strong>時間配置建議：</strong>${esc(EXAM_PACE[exam.id])}</p>
    <p class="bench-sources">官方資料（${CHECKED_AT} 查核）：${exam.sources.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</p>
    ${officialHtml(exam)}
  </section>`;
}

function officialHtml(exam) {
  if (!exam.official?.length) return '';
  return `<div class="bench-official"><h3>官方歷屆試題與模考</h3>
    <p>本站快篩每卷只有 6 題，是用來找弱項的取樣。弱項練過之後，用官方題本照官方時間做一次，才是真正的考場預演。</p>
    <ul>${exam.official.map(o => `<li><a href="${esc(o.url)}" target="_blank" rel="noopener">${esc(o.label)} ↗</a><small>${esc(o.note)}</small></li>`).join('')}</ul></div>`;
}

function officialLink(exam, cls = 'btn quiet small') {
  const o = exam.official?.[0];
  return o ? `<a class="${cls}" href="${esc(o.url)}" target="_blank" rel="noopener">${esc(o.label)} ↗</a>` : '';
}

function optionButtons(item, quiz) {
  const answered = quiz.result;
  const pending = quiz.pending ?? (item.select === 2 ? [] : null);
  const locked = item.listen && !quiz.heard && !quiz.transcript;
  return `<div class="bench-options" role="group" aria-label="選項"${locked ? ' data-locked' : ''}>${item.options.map((opt, i) => {
    let cls = '';
    let mark = '';
    if (answered) {
      const isAnswer = item.select === 2 ? item.answer.includes(i) : item.answer === i;
      const picked = item.select === 2 ? quiz.pick.includes(i) : quiz.pick === i;
      if (isAnswer) { cls = 'is-right'; mark = '正解'; }
      else if (picked) { cls = 'is-wrong'; mark = '你的選擇'; }
      else cls = 'is-dim';
    } else if (item.select === 2 ? pending.includes(i) : pending === i) cls = 'is-picked';
    const pressed = !answered && (item.select === 2 ? pending.includes(i) : pending === i);
    return `<button type="button" class="bench-option ${cls}" data-bench-option="${i}" aria-pressed="${pressed}" ${answered || locked ? 'disabled' : ''}>
      <span class="bench-key">${String.fromCharCode(65 + i)}</span><span lang="en">${esc(opt)}</span>${mark ? `<em>${mark}</em>` : ''}</button>`;
  }).join('')}</div>`;
}

function stemHtml(item) {
  let html = multiline(item.stem);
  if (item.mark) html = html.replace(esc(item.mark), `<u>${esc(item.mark)}</u>`);
  return html;
}

function feedbackHtml(item, quiz, mode, lastInForm = false) {
  const r = quiz.result;
  const picked = item.select === 2 ? quiz.pick : [quiz.pick];
  const answerText = item.select === 2 ? item.answer.map(i => item.options[i]).join('／') : item.options[item.answer];
  const wrongNotes = picked.filter(i => item.wrong[i] !== undefined)
    .map(i => `<p><strong>你選的「<span lang="en">${esc(item.options[i])}</span>」：</strong>${esc(item.wrong[i])}</p>`).join('');
  const extra = mode === 'review'
    ? (r.graduated ? '<p class="bench-win">這題已經隔了一個月還答對，畢業了！</p>' : r.correct ? `<p class="bench-win">記住了。下次回收：${r.next.days} 天後。</p>` : '<p>沒關係，明天會再出現一次，這正是間隔練習的用意。</p>')
    : r.bucket === 'hyper' ? '<p class="bench-hyper">🔥 很確定卻答錯：研究發現這類錯誤訂正後特別容易記住，已排入明天回收。</p>'
      : r.bucket === 'lucky' ? '<p>答對了，但你是用猜的：明天再回收一次，確認真的會。</p>'
        : r.bucket === 'fresh' ? '<p>不確定的題目答錯很正常，先讀懂原因，明天再試一次。</p>' : '';
  const transcript = item.listen ? `<details class="bench-transcript"${quiz.transcript ? ' open' : ''}><summary>文字稿</summary><p lang="en">${multiline(item.listen)}</p></details>` : '';
  const last = mode === 'review' ? quiz.index >= quiz.queue.length - 1 : false;
  return `<div class="bench-feedback ${r.correct ? 'is-good' : 'is-bad'}" role="status" tabindex="-1">
    <p class="bench-verdict">${r.correct ? '✓ 答對了' : '還差一點'}${quiz.assisted ? '<small>（看了文字稿，不算獨立聽力）</small>' : ''}</p>
    ${extra}${r.correct ? '' : wrongNotes}
    <p><strong>正解「<span lang="en">${esc(answerText)}</span>」：</strong>${esc(item.why)}</p>
    <p class="bench-cue"><strong>破題線索：</strong>${esc(item.cue)}</p>
    ${transcript}
    <button type="button" class="btn primary" data-bench-next>${mode === 'review' ? (last ? '完成回收' : '下一題 →') : lastInForm ? '看結果' : '下一題 →'}</button>
  </div>`;
}

function questionHtml(item, quiz, mode, position, lastInForm = false) {
  const exam = examById(item.exam);
  const needConf = mode === 'form' && !quiz.result && (item.select === 2 ? (quiz.pending || []).length === 2 : quiz.pending !== null && quiz.pending !== undefined);
  return `<article class="bench-question" aria-labelledby="bench-q-title">
    <div class="bench-q-meta"><span>${esc(position)}</span><span>${esc(exam.short)}・${esc(item.type)}</span><span>${esc(SKILL_LABELS[item.skill] || item.skill)}</span></div>
    ${item.listen ? `<div class="bench-listen"><button type="button" class="btn secondary" data-bench-play>▶ ${quiz.heard ? '再聽一次' : '播放音檔'}</button>
      ${quiz.result || quiz.transcript ? '' : '<button type="button" class="btn quiet small" data-bench-transcript>看文字稿（不算獨立聽力）</button>'}
      <p class="bench-fine" role="status">${esc(quiz.audioStatus || (quiz.heard ? '已播放完畢，請作答。' : '使用裝置朗讀。播完後才開放選項。'))}</p>
      ${quiz.transcript && !quiz.result ? `<p class="bench-passage" lang="en">${multiline(item.listen)}</p>` : ''}</div>` : ''}
    ${item.passage ? `<div class="bench-passage" lang="en">${multiline(item.passage)}</div>` : ''}
    <h3 id="bench-q-title" class="bench-stem" lang="en">${stemHtml(item)}</h3>
    ${item.select === 2 ? '<p class="bench-fine">選出兩個放進空格後句意相同的字，兩個都對才算對。</p>' : ''}
    ${optionButtons(item, quiz)}
    ${needConf ? `<div class="bench-confidence" role="group" aria-label="你有多少把握？"><span>你有多少把握？</span>${CONFIDENCE.map(([id, label]) => `<button type="button" class="btn ${id === 'sure' ? 'primary' : 'secondary'} small" data-bench-conf="${id}">${label}</button>`).join('')}</div>` : ''}
    ${mode === 'review' && !quiz.result && (item.select === 2 ? (quiz.pending || []).length === 2 : quiz.pending !== null && quiz.pending !== undefined) ? '<div class="bench-confidence"><button type="button" class="btn primary small" data-bench-submit>送出</button></div>' : ''}
    ${quiz.result ? feedbackHtml(item, quiz, mode, lastInForm) : ''}
    <button type="button" class="btn quiet small bench-exit" data-bench-exit>暫停，回到快篩總覽</button>
  </article>`;
}

function resultsHtml(state, examId, form, nested = false) {
  const s = summarizeForm(state, examId, form);
  if (!s.done) return '';
  const exam = examById(examId);
  const weak = weakestSkill(state, examId);
  return `<section class="${nested ? '' : 'bench-card '}bench-results" aria-labelledby="bench-result-${form}">
    <div class="bench-card-head"><h3 id="bench-result-${form}">${form} 卷結果：${s.right} / ${s.total}</h3><p>6 題是技能取樣，用來決定先練什麼，不代表正式分數。${s.assisted ? `其中 ${s.assisted} 題看了文字稿。` : ''}</p></div>
    <ul class="bench-skillbars">${s.skills.map(k => `<li><span>${esc(SKILL_LABELS[k.skill] || k.skill)}</span><div class="bench-bar" aria-hidden="true"><i style="width:${k.total ? Math.round(100 * k.right / k.total) : 0}%"></i></div><b>${k.right}/${k.total}</b></li>`).join('')}</ul>
    <div class="bench-calibration" aria-label="把握度校準">${Object.entries(BUCKETS).map(([id, [title, note]]) => `<div class="bench-bucket b-${id}"><strong>${title}<b>${s.buckets[id].length}</b></strong><small>${note}</small>${s.buckets[id].length ? `<ul>${s.buckets[id].map(item => `<li lang="en">${esc(item.stem.split('\n')[0].slice(0, 70))}${item.stem.length > 70 ? '…' : ''}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
    <p class="bench-next"><strong>建議先練：</strong>${esc(SKILL_LABELS[weak.skill] || weak.skill)} ${linkHtml(exam.practice[weak.skill] || MIXED_PRACTICE[examId], 'btn secondary small')}</p>
  </section>`;
}

function compareHtml(state, examId) {
  const c = compareForms(state, examId);
  if (!c) return '';
  return `<section class="bench-card bench-compare" aria-labelledby="bench-compare-title">
    <div class="bench-card-head"><h3 id="bench-compare-title">${c.forms.map(f => f.form).join(' → ')}：同技能、不同題目</h3>
    <p>每一卷都要在前一卷完成後隔夠久再開始（B 20 小時、C 7 天、D 14 天），那一步才當作「還記得」的進步參考。</p></div>
    <ul class="bench-steps">${c.steps.map(step => `<li class="${step.valid ? 'is-valid' : 'is-practice'}"><b>${step.from} → ${step.to}</b><span>${step.valid ? `間隔滿 ${gapLabel(step.gapHours)}，算延後保留` : `間隔未滿 ${gapLabel(step.gapHours)}，先當練習`}</span></li>`).join('')}</ul>
    <div class="bench-trend-wrap"><table class="bench-trend">
      <caption class="sr-only">各卷同技能答對題數</caption>
      <thead><tr><th scope="col">技能</th>${c.forms.map(f => `<th scope="col">${f.form} 卷</th>`).join('')}</tr></thead>
      <tbody>${c.skills.map(s => `<tr><th scope="row">${esc(SKILL_LABELS[s.skill] || s.skill)}</th>${s.cells.map(x => `<td>${x.right}/${x.total}</td>`).join('')}</tr>`).join('')}
        <tr class="bench-trend-total"><th scope="row">合計</th>${c.forms.map(f => `<td>${f.right}/${f.total}</td>`).join('')}</tr></tbody>
    </table></div>
    <p class="bench-fine">每卷每個技能只有 1–2 題，一題的差異就會改變結果；看整體方向，再搭配官方題本與正式成績判斷。</p>
  </section>`;
}

function checkTab(state, now) {
  const exam = examById(state.exam);
  if (ui.quiz) {
    const q = ui.quiz;
    const item = q.mode === 'review' ? q.queue[q.index] : ITEMS.get(q.itemId);
    if (item) {
      const position = q.mode === 'review' ? `回收 ${q.index + 1} / ${q.queue.length}` : `${q.form} 卷・第 ${itemsFor(item.exam, item.form).findIndex(i => i.id === item.id) + 1} / ${itemsFor(item.exam, item.form).length} 題`;
      return questionHtml(item, q, q.mode, position, q.mode === 'form' && !nextFormItem(state, item.exam, item.form));
    }
  }
  const due = dueReviews(state, now, exam.id);
  const waiting = upcomingReviews(state, exam.id);
  const nextForm = FORMS.find(form => !formStatus(state, exam.id, form, now).done);
  const forms = FORM_PLAN.map(plan => {
    const form = plan.id;
    const st = formStatus(state, exam.id, form, now);
    const label = st.done ? `完成・${st.right}/${st.total}` : st.answered ? `進行中・${st.answered}/${st.total}` : '尚未開始';
    const early = !st.done && st.waitHours > 0;
    const note = early ? `${plan.note}還差約 ${gapLabel(st.waitHours)}；現在做可以當練習，但不算延後比較。` : plan.note;
    const primary = form === nextForm && !early;
    return `<div class="bench-form${form === nextForm ? ' is-next' : ''}"><div><strong>${form} 卷</strong><span class="bench-when">${esc(plan.when)}</span><span class="bench-pill">${label}</span></div><p>${esc(note)}</p>
      ${st.done ? '' : `<button type="button" class="btn ${primary ? 'primary' : 'secondary'} small" data-bench-start="${form}">${st.answered ? '繼續' : '開始'} ${form} 卷（6 題）</button>`}</div>`;
  }).join('');
  const finished = [...FORMS].reverse().filter(form => formStatus(state, exam.id, form, now).done);
  const results = finished.map((form, i) => {
    if (i === 0) return resultsHtml(state, exam.id, form);
    const s = summarizeForm(state, exam.id, form);
    return `<details class="bench-card bench-older"><summary>看 ${form} 卷結果（${s.right}/${s.total}）</summary>${resultsHtml(state, exam.id, form, true)}</details>`;
  });
  return `<section class="bench-card" aria-labelledby="bench-check-title">
      <div class="bench-card-head"><h2 id="bench-check-title">${esc(exam.short)} 對標快篩</h2><p>四卷各 6 題，技能組成相同、題目不同，間隔逐步拉長（隔天、一週、再兩週）。選完答案再選把握度：把握度能找出「以為會、其實不會」的地方。</p></div>
      <div class="bench-forms">${forms}</div>
      <div class="bench-review-box"><strong>錯題回收</strong><p>${due.length ? `${due.length} 道到期。` : '目前沒有到期的錯題。'}排程中共 ${waiting} 道，依 1→3→7→14→30 天出現。</p>
      ${due.length ? '<button type="button" class="btn primary small" data-bench-review="start">開始回收</button>' : ''}</div>
      ${ui.message ? `<p class="bench-message" role="status">${esc(ui.message)}</p>` : ''}
    </section>
    ${results[0] || ''}${compareHtml(state, exam.id)}${results.slice(1).join('')}`;
}

function planTab(state, now) {
  const p = buildPlan(state, state.exam, now);
  const exam = p.exam;
  const levels = CEFR_LEVELS.slice(1);
  const ms = milestones(state, exam.id, now);
  const timeLine = p.days === null ? '設定考試日期後，這裡會算出剩下幾週。'
    : p.days < 0 ? '這個日期已經過了。'
      : `距離考試 ${p.days} 天，約 ${Math.max(1, Math.round(p.days / 7))} 週；每週 ${p.plan.minutes} 分鐘，可用時間約 ${p.available} 小時。`;
  const needLine = p.need
    ? (p.need[1] === 0 ? '依你選的目前程度，語言程度已達目標建議，重點放在題型熟練與限時節奏。'
      : `Cambridge 估計從 ${p.plan.level} 到 ${p.target?.cefr || exam.suggest} 約需 ${p.need[0]}–${p.need[1]} 小時引導學習（含課堂與作業）。${p.available !== null && p.available < p.need[0] ? '可用時間少於估計，可以拉長準備期、提高每週時間，或先設定較近的目標。' : ''}`)
    : `選擇目前程度後，會依 Cambridge 的引導學習時數粗估差距。不確定程度？<a href="#diagnostic">先做英文程度檢定</a>。`;
  return `<section class="bench-card" aria-labelledby="bench-plan-title">
    <div class="bench-card-head"><h2 id="bench-plan-title">${esc(exam.short)} 週計畫</h2><p>目標、日期和時間都由你決定；計畫依剩餘時間調整練習比例。</p></div>
    <form class="bench-plan-form" data-bench-plan>
      <label>目標<select name="target">${exam.targets.map(t => `<option value="${t.id}"${t.id === p.plan.target ? ' selected' : ''}>${esc(t.label)}</option>`).join('')}</select></label>
      <label>考試日期<input type="date" name="date" value="${esc(p.plan.date)}"></label>
      <label>每週可用時間<select name="minutes">${WEEKLY_MINUTES.map(m => `<option value="${m}"${m === p.plan.minutes ? ' selected' : ''}>${m >= 60 ? `${m / 60} 小時` : `${m} 分鐘`}${m === 120 ? '（建議起點）' : ''}</option>`).join('')}</select></label>
      <label>目前程度（自評或檢定結果）<select name="level"><option value="">不確定</option>${levels.map(l => `<option value="${l}"${l === p.plan.level ? ' selected' : ''}>${l}</option>`).join('')}</select></label>
      <label class="bench-intent">我的讀書時機：如果＿＿，我就做 15 分鐘對標任務<input name="intent" maxlength="120" placeholder="例如：如果吃完晚餐收好碗盤" value="${esc(p.plan.intent)}"></label>
    </form>
    <p class="bench-fine" role="status" data-bench-plan-status>變更會自動儲存在這台裝置。</p>
    <div class="bench-phase"><span class="bench-pill">${esc(p.phase.label)}</span><p>${esc(p.phase.advice)}</p><p>${esc(timeLine)}</p><p>${needLine}</p>
      <p class="bench-fine">時數為 <a href="${GUIDED_HOURS_SOURCE.url}" target="_blank" rel="noopener">${esc(GUIDED_HOURS_SOURCE.label)} ↗</a> 的平均估計，個人差異很大，只用來安排時間。</p></div>
    <h3>每週配置（共 ${p.blocks.reduce((n, b) => n + b.minutes, 0)} 分鐘）</h3>
    <ol class="bench-blocks">${p.blocks.map(b => `<li><div><strong>${esc(b.label)}</strong><b>${b.minutes} 分鐘</b></div><p>${esc(b.why)}</p>${linkHtml(b.link)}${b.official ? ` <a class="btn quiet small" href="${esc(b.official.url)}" target="_blank" rel="noopener">${esc(b.official.label)} ↗</a>` : ''}</li>`).join('')}</ol>
    ${p.weak.fromData ? '' : '<p class="bench-fine">還沒有快篩資料，弱項先以配分最高的題型代替。完成 A 卷後會改用你的結果。</p>'}
    ${p.plan.intent ? `<p class="bench-intent-card">📌 如果 ${esc(p.plan.intent)}，我就做 15 分鐘對標任務。</p>` : ''}
    <h3>小成功</h3>
    <ul class="bench-milestones">${ms.map(m => `<li class="${m.done ? 'is-done' : ''}"><span aria-hidden="true">${m.done ? '✓' : '○'}</span>${esc(m.label)}${m.done ? '<span class="sr-only">（已完成）</span>' : ''}</li>`).join('')}</ul>
  </section>`;
}

function mindTab(state) {
  const exam = examById(state.exam);
  const done = state.exposure[exam.id] || [];
  return `<section class="bench-card" aria-labelledby="bench-mind-title">
    <div class="bench-card-head"><h2 id="bench-mind-title">考前心態與分級暴露</h2><p>緊張很正常。這三個工具都有研究依據，花不到 10 分鐘。</p></div>
    <div class="bench-mind-grid">
      <article><h3>1. 把擔心寫下來</h3><p>考前 10 分鐘，把最擔心的事寫出來。研究發現，這能減少擔憂占用的注意力（Ramirez &amp; Beilock, 2011）。</p>
        <label class="sr-only" for="bench-worry">寫下擔心的事</label><textarea id="bench-worry" rows="4" placeholder="寫下來就好，這裡的文字不會儲存。"></textarea>
        <button type="button" class="btn quiet small" data-bench-clear-worry>寫完了，清空</button></article>
      <article><h3>2. 把緊張說成「準備好了」</h3><p>心跳加快、手心出汗，是身體在幫你準備。對自己說：「這是我準備好的感覺。」把緊張重新解讀為有幫助的狀態，有研究發現考試表現較好（Jamieson et al., 2010）。</p></article>
      <article><h3>3. 時間配置</h3><p>${esc(EXAM_PACE[exam.id])}</p><p class="bench-fine">卡住超過平均時間就先標記，跳下一題。</p></article>
    </div>
    <h3>${esc(exam.short)} 分級暴露階梯</h3>
    <p class="bench-fine">從不計時到正式條件，一步一步讓考場變熟悉。完成一步勾一步。</p>
    <ol class="bench-exposure">${exposureSteps(exam).map((step, i) => `<li><label><input type="checkbox" data-bench-exposure="${i}"${done.includes(i) ? ' checked' : ''}> <span>${esc(step)}</span></label></li>`).join('')}</ol>
    <p class="bench-actions">${linkHtml(exam.practice.timed, 'btn secondary small')} ${officialLink(exam)}</p>
  </section>`;
}

function body(state, now = Date.now()) {
  const exam = examById(state.exam);
  const panel = ui.tab === 'check' ? checkTab(state, now)
    : ui.tab === 'plan' ? planTab(state, now)
      : ui.tab === 'mind' ? mindTab(state)
        : examProfile(exam) + ladder(state);
  return `<header class="bench-hero">
      <div><p class="bench-eyebrow">考試對標羅盤</p><h1>先看懂考什麼，再決定怎麼練</h1>
      <p>選一個考試，看官方格式與分數從哪裡來；用 6 題快篩找出弱項，錯題隔天回收，再照週計畫練。題目全部原創，不換算正式分數。</p></div>
      <ul class="bench-facts"><li>官方格式 ${CHECKED_AT} 查核</li><li>A→D 四卷・隔天／一週／再兩週</li><li>錯題 1→3→7→14→30 天回收</li></ul>
    </header>
    ${examPicker(state)}
    ${todayStrip(state, now)}
    <div class="bench-tabs" role="tablist" aria-label="考試對標內容">${TABS.map(([id, label]) => `<button type="button" role="tab" id="bench-tab-${id}" aria-selected="${ui.tab === id}" aria-controls="bench-panel" data-bench-tab="${id}">${label}</button>`).join('')}</div>
    <div id="bench-panel" role="tabpanel" aria-labelledby="bench-tab-${ui.tab}" class="bench-panel">${panel}</div>
    <p class="bench-fine bench-foot">同一考試另有：${linkHtml(MIXED_PRACTICE[exam.id], 'bench-inline')}・<a class="bench-inline" href="quest/simulation.html">擬真模考</a>・<a class="bench-inline" href="#exams">分科題庫快測</a>。快篩紀錄只存在這台裝置，並納入全站備份。</p>`;
}

export function renderExamBenchmark(storage = browserStorage(), now = Date.now(), tab = null) {
  if (tab && TABS.some(([id]) => id === tab)) { ui.tab = tab; ui.quiz = null; }
  const state = readBench(storage);
  return `<section class="bench" data-bench aria-label="考試對標羅盤">${body(state, now)}</section>`;
}

// ───────── 互動 ─────────
function speakTurns(text, onDone, onFail) {
  const turns = String(text).split(/(?=\b(?:Woman|Man|Girl|Boy|Clerk|Customer)\s*:)/).map(t => t.trim()).filter(Boolean);
  const speakers = [];
  let i = 0;
  const next = () => {
    if (i >= turns.length) { onDone(); return; }
    const turn = turns[i++];
    const who = (turn.match(/^(\w+)\s*:/) || [])[1] || '';
    if (who && !speakers.includes(who)) speakers.push(who);
    const role = who ? speakers.indexOf(who) % 2 : 0;
    speak(turn.replace(/^\w+\s*:\s*/, ''), {lang: 'en-US', rate: 0.95, voiceRole: role, onEnd: next, onError: onFail});
  };
  next();
}

export function bindExamBenchmark(root, storage = browserStorage()) {
  const el = root.querySelector('[data-bench]');
  if (!el) return;
  let state = readBench(storage);
  let generation = 0;
  const persist = () => {
    if (!saveBench(storage, state)) ui.message = '這個瀏覽器目前無法儲存，作答在重新整理後會消失。';
  };
  const repaint = (focus = '') => {
    el.innerHTML = body(state);
    const target = focus && el.querySelector(focus);
    if (target) { target.focus({preventScroll: true}); target.scrollIntoView({block: 'nearest'}); }
  };
  const startForm = form => {
    if (!FORMS.includes(form)) return;
    const item = nextFormItem(state, state.exam, form);
    if (!item) { ui.quiz = null; ui.tab = 'check'; repaint('#bench-tab-check'); return; }
    stopAudio(); generation++;
    ui = {...ui, tab: 'check', message: '', quiz: {mode: 'form', form, itemId: item.id, pending: item.select === 2 ? [] : null, result: null, heard: false, transcript: false, audioStatus: ''}};
    repaint('#bench-q-title');
  };
  const startReview = () => {
    const queue = dueReviews(state, Date.now(), state.exam);
    if (!queue.length) { ui.message = '目前沒有到期的錯題。'; repaint(); return; }
    stopAudio(); generation++;
    ui = {...ui, tab: 'check', message: '', quiz: {mode: 'review', queue, index: 0, pending: queue[0].select === 2 ? [] : null, result: null, heard: false, transcript: false, audioStatus: ''}};
    repaint('#bench-q-title');
  };
  const currentItem = () => ui.quiz && (ui.quiz.mode === 'review' ? ui.quiz.queue[ui.quiz.index] : ITEMS.get(ui.quiz.itemId));

  el.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b || b.disabled || !el.contains(b)) return;
    const d = b.dataset;
    if (d.benchExam && examById(d.benchExam)) {
      stopAudio(); generation++;
      state.exam = d.benchExam; ui.quiz = null; ui.message = '';
      persist(); repaint(`[data-bench-exam="${d.benchExam}"]`); return;
    }
    if (d.benchTab) {
      if (ui.quiz && d.benchTab !== 'check') { stopAudio(); generation++; ui.quiz = null; }
      ui.tab = d.benchTab; ui.message = '';
      repaint(`#bench-tab-${d.benchTab}`); return;
    }
    if (d.benchStart) { startForm(d.benchStart); return; }
    if (d.benchReview) { startReview(); return; }
    if ('benchExit' in d) { stopAudio(); generation++; ui.quiz = null; repaint('#bench-tab-check'); return; }
    if ('benchClearWorry' in d) { const t = el.querySelector('#bench-worry'); if (t) t.value = ''; return; }
    const item = currentItem();
    if (!item) return;
    const q = ui.quiz;
    if ('benchPlay' in d) {
      const mine = ++generation;
      q.audioStatus = '播放中…'; repaint('[data-bench-play]');
      speakTurns(item.listen,
        () => { if (mine !== generation) return; q.heard = true; q.audioStatus = '已播放完畢，請作答。'; repaint('.bench-option'); },
        () => { if (mine !== generation) return; q.audioStatus = '這台裝置無法朗讀，可以改看文字稿作答（不算獨立聽力）。'; repaint('[data-bench-transcript]'); });
      return;
    }
    if ('benchTranscript' in d) { q.transcript = true; repaint('.bench-passage'); return; }
    if (d.benchOption !== undefined && !q.result) {
      const i = Number(d.benchOption);
      if (item.select === 2) {
        const set = q.pending || [];
        q.pending = set.includes(i) ? set.filter(v => v !== i) : set.length < 2 ? [...set, i] : set;
      } else q.pending = i;
      const ready = item.select === 2 ? q.pending.length === 2 : true;
      repaint(ready ? (q.mode === 'form' ? '[data-bench-conf="sure"]' : '[data-bench-submit]') : `[data-bench-option="${i}"]`);
      return;
    }
    if ((d.benchConf || 'benchSubmit' in d) && !q.result) {
      const pick = item.select === 2 ? [...(q.pending || [])].sort((x, y) => x - y) : q.pending;
      if (!validPick(item, pick)) return;
      const assisted = !!item.listen && q.transcript;
      const result = q.mode === 'form'
        ? recordFormAnswer(state, item.id, pick, d.benchConf, Date.now(), {assisted})
        : recordReview(state, item.id, pick, Date.now());
      if (!result) return;
      q.pick = pick; q.result = result; q.assisted = assisted;
      persist(); repaint('.bench-feedback'); return;
    }
    if ('benchNext' in d && q.result) {
      stopAudio(); generation++;
      if (q.mode === 'review') {
        if (q.index >= q.queue.length - 1) { ui.quiz = null; ui.message = `回收完成！${q.queue.length} 道題已重新排程。`; repaint('.bench-message'); return; }
        q.index++;
        Object.assign(q, {pending: q.queue[q.index].select === 2 ? [] : null, result: null, pick: null, heard: false, transcript: false, audioStatus: '', assisted: false});
        repaint('#bench-q-title'); return;
      }
      const nextItem = nextFormItem(state, state.exam, q.form);
      if (!nextItem) { ui.quiz = null; ui.message = `${q.form} 卷完成！看看下面的結果與把握度校準。`; repaint('.bench-message'); return; }
      Object.assign(q, {itemId: nextItem.id, pending: nextItem.select === 2 ? [] : null, result: null, pick: null, heard: false, transcript: false, audioStatus: '', assisted: false});
      repaint('#bench-q-title');
    }
  });

  el.addEventListener('change', event => {
    const t = event.target;
    if (t.matches('[data-bench-exposure]')) {
      const i = Number(t.dataset.benchExposure);
      const steps = new Set(state.exposure[state.exam] || []);
      if (t.checked) steps.add(i); else steps.delete(i);
      state.exposure[state.exam] = [...steps].sort();
      persist(); return;
    }
    const form = t.closest('[data-bench-plan]');
    if (!form) return;
    const data = new FormData(form);
    state.plans[state.exam] = cleanPlan(examById(state.exam), Object.fromEntries(data.entries()));
    persist();
    const name = t.name;
    if (name !== 'intent') repaint(`[data-bench-plan] [name="${name}"]`);
    const status = el.querySelector('[data-bench-plan-status]');
    if (status) status.textContent = name === 'intent' ? '已儲存你的讀書時機。' : '已儲存，計畫已更新。';
  });

  el.addEventListener('keydown', event => {
    const q = ui.quiz;
    if (!q || q.result || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.matches('input, textarea, select')) return;
    const n = Number(event.key);
    if (Number.isInteger(n) && n >= 1 && n <= 6) {
      const btn = el.querySelector(`[data-bench-option="${n - 1}"]`);
      if (btn && !btn.disabled) { event.preventDefault(); btn.click(); }
    }
  });
}
