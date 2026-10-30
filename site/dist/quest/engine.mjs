import {makeExamPlan,finishExam,saveOfficial,validExamSession,EXAMS,TIERS,isAssessment} from './exams.mjs?v=exams20261027';
import { questionKey, learningKeys, uniqueQuestions, selectDistinct } from './question_quality.mjs?v=exams20261027';
import { SCHOOL_ITEMS, SEMESTERS, schoolTracks, schoolFiles, refreshSchoolPools } from './school.mjs?v=school20261027';
// English Quest game engine. Pure logic: no DOM. Time and storage are injected so every rule is testable.
import {takeaways} from './adventure.mjs?v=school20261027';
import { makePlacement, placementReport, refinePlacement, validPlacementPlan } from './placement.mjs?v=exams20261027';
import { ADVANCED_ITEMS } from './advanced_placement.mjs?v=advanced20261027';
import { fastAnswerEligible, jumpSuggestion } from './acceleration.mjs';
export const KEY = 'english-quest-game-v2';
export const V1_KEY = 'english-quest-game-v1';
export const DAY = 86400000;
export const GOALS = { casual: 10, regular: 20, serious: 30, intense: 50 };
export const XP = { lesson: 10, replay: 5, perfect: 5, boss: 20, bossTry: 5, story: 10, storyReplay: 5, review: 10, practice: 5, jump: 30 };
export const REVIEW_DAYS = [1, 3, 7, 14, 30];
export const FREEZE_COST = 100, MAX_FREEZES = 2, QUEST_GEMS = 10, QUEST_BONUS = 20, CROWN_GEMS = 15, BADGE_GEMS = 20;
export const LESSON_SIZE = 10, BOSS_SIZE = 12, HEARTS = 3;
const SCORED = new Set(['choice', 'listen', 'build', 'input', 'match', 'multi']);
export const isScored = it => SCORED.has(it?.type);

// ---------- text & dates ----------
export const normalize = s => String(s ?? '').normalize('NFKC').replace(/[’‘`]/g, "'").replace(/[“”]/g, '"').toLowerCase().replace(/[.,!?;:"()\[\]…—–-]/g, ' ').replace(/\s+/g, ' ').trim();
export function accepts(item, value) {
  if (!item) return false;
  if(item.type==='multi'){const picked=String(value).split(' || ');return picked.length===item.selectCount&&new Set(picked).size===picked.length&&picked.every(x=>item.correctAnswers.includes(x));}
  if (item.type === 'match') return value === 'matched';
  if (item.type === 'choice' || item.type === 'listen') return value === item.answer;
  return [item.answer, ...(item.alternatives || [])].some(a => normalize(a) === normalize(value));
}
export function localDay(time = Date.now()) { const d = new Date(time); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
const dayNum = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d) / DAY; };
const dayStr = n => { const d = new Date(n * DAY); return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`; };
export function streakOf(days, frozen, now) {
  const active = new Set(days), cover = new Set(frozen); let n = dayNum(localDay(now)), count = 0;
  if (!active.has(dayStr(n))) n--; // today is still open
  while (active.has(dayStr(n)) || cover.has(dayStr(n))) { if (active.has(dayStr(n))) count++; n--; }
  return count;
}
const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
export function shuffle(list, seed) { const arr = [...list]; let x = hash(seed) || 1; for (let i = arr.length - 1; i > 0; i--) { x = (Math.imul(x, 1103515245) + 12345) >>> 0; const j = x % (i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

// ---------- course registry ----------
export function createCourse(index) {
  const units = new Map(), nodes = new Map(), items = new Map(), files = new Set(), guides = new Map(), stories = new Map(), vocab = new Map();
  const tracks = [...index.sections.map(s => ({ ...s, kind: 'section' })), ...index.branches.map(b => ({ ...b, kind: 'branch' })), ...schoolTracks(index)];
  for (const t of tracks) t.units.forEach((u, ui) => {
    units.set(u.id, { ...u, track: t.id, trackKind: t.kind, order: ui });
    u.nodes.forEach((n, ni) => nodes.set(n.id, { ...n, unit: u.id, track: t.id, order: ni, pool: null }));
  });
  for (const s of index.stories || []) stories.set(s.id, { ...s, steps: null });
  for (const it of ADVANCED_ITEMS) items.set(it.id,{...it,f:'placement-advanced'});
  for (const it of SCHOOL_ITEMS) items.set(it.id,{...it,f:'semester-items'});
  files.add('semester-items');
  const course = {
    index, tracks, units, nodes, items, guides, stories, vocab,
    track: id => tracks.find(t => t.id === id),
    loaded: id => files.has(id),
    item: id => items.get(id),
    register(file) {
      if(file.examBank){for(const q of file.items)items.set(q.id,{...q,f:'exams'});course.examBank=file.examBank;files.add('exams');return;}
      if (file.stories) { for (const s of Object.values(file.stories)) { stories.set(s.id, { ...stories.get(s.id), ...s, steps: s.steps.map(x => x.id) }); for (const x of s.steps) items.set(x.id, { ...x, f: 'stories', story: s.id }); } files.add('stories'); return; }
      if (file.sets) { for (const set of file.sets) { vocab.set(set.id, set); for (const it of vocabExercises(set)) items.set(it.id, { ...it, f: 'vocab', set: set.id }); } files.add('vocab'); return; }
      for (const [id, it] of Object.entries(file.items)) items.set(id, { ...it, f: file.id });
      for (const [uid, u] of Object.entries(file.units)) { guides.set(uid, u.guide); for (const [nid, pool] of Object.entries(u.nodes)) if (nodes.has(nid)) nodes.get(nid).pool = pool; }
      files.add(file.id); refreshSchoolPools(course);
    },
    // path order inside a track: every node of every unit, with the optional story after its unit
    path(trackId) { return course.track(trackId).units.flatMap(u => u.nodes.map(n => n.id)); },
    unitOfNode: id => nodes.get(id)?.unit
  };
  refreshSchoolPools(course);
  return course;
}

// practice-hub vocabulary sets carry only words; exercises are made here so the data file stays small
export function vocabExercises(set) {
  const words = set.words, out = [];
  const mp3 = w => `../mnemonics/audio/${encodeURIComponent(w)}.mp3`;
  words.forEach((v, i) => {
    const others = words.filter(x => x !== v);
    const zh = shuffle(others.filter(x => x.zh !== v.zh), set.id + v.w + 'z').slice(0, 2).map(x => x.zh);
    const en = shuffle(others.filter(x => x.w.toLowerCase() !== v.w.toLowerCase()), set.id + v.w + 'e').slice(0, 2).map(x => x.w);
    const base = `${set.id}.${i + 1}`;
    if (zh.length === 2) out.push({ id: base + 'm', kind: 'word', type: 'listen', prompt: '聽一聽，選出意思', audio: v.w, mp3: mp3(v.w), answer: v.zh, options: [v.zh, ...zh], why: `${v.w}：${v.zh}${v.ex ? `。例：${v.ex}` : ''}`, level: 1 });
    if (en.length === 2) out.push({ id: base + 'e', kind: 'word', type: 'choice', prompt: `「${v.zh}」的英文是？`, answer: v.w, options: [v.w, ...en], audioAfter: v.w, mp3: mp3(v.w), why: `${v.zh} → ${v.w}`, level: 1 });
    if (/^[A-Za-z]{2,14}$/.test(v.w)) out.push({ id: base + 's', kind: 'word', type: 'input', prompt: `聽寫：聽到的英文單字（意思：${v.zh}）`, audio: v.w, mp3: mp3(v.w), answer: v.w, why: `${v.w} 的拼法：${v.w.split('').join(' ')}`, level: 3, listen: true });
  });
  for (let k = 0; k + 3 < words.length; k += 4) { const g = words.slice(k, k + 4); if (new Set(g.map(x => x.zh)).size === 4) out.push({ id: `${set.id}.match${k / 4 + 1}`, kind: 'word', type: 'match', prompt: '配對英文與中文', pairs: g.map(x => [x.w, x.zh]), answer: 'match', why: g.map(x => `${x.w}＝${x.zh}`).join('；'), level: 1 }); }
  return out;
}

// ---------- state ----------
const WHY = ['life', 'school', 'work', 'exam'];
const makeProfile = p => ({ goal: GOALS[p.goal] ? p.goal : 'regular', start: /^(s[1-9]|sem-[jh][123][ab])$/.test(p.start) ? p.start : 's1', why: WHY.includes(p.why) ? p.why : 'life', sound: p.sound !== false, autoplay: p.autoplay !== false, motion: p.motion !== false, rate: [0.7, 0.85, 1].includes(p.rate) ? p.rate : 0.85 });
const fresh = now => ({ schema: 2, created: now, profile: null, nodes: {}, crowns: {}, review: {}, jumped: {}, items: {}, xp: { total: 0, days: {} }, awards: {}, days: [], frozen: [], freezes: 0, gems: 0, quests: null, achievements: {}, stories: {}, flags: {}, stats: { lessons: 0, perfect: 0, combo: 0, listen: 0, fixed: 0, stories: 0, crowns: 0 }, session: null, serial: 0, legacy: null, schoolWork:{}, examProgress:{}, exposures:{}, rotations:{} });
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
const num = (v, d = 0) => Number.isFinite(v) && v >= 0 ? v : d;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
function sanitize(raw, now) {
  if (!isObj(raw) || raw.schema !== 2) throw Error('unsupported');
  const s = fresh(num(raw.created, now));
  if (isObj(raw.profile)) s.profile = makeProfile(raw.profile);
  for (const [k, v] of Object.entries(raw.nodes || {})) if (isObj(v)) s.nodes[k] = { n: num(v.n), at: num(v.at), best: Math.min(1, num(v.best)), tested: v.tested === true };
  for (const k of ['crowns', 'jumped', 'achievements', 'stories', 'flags']) for (const [id, at] of Object.entries(raw[k] || {})) if (Number.isFinite(at)) s[k][id] = at;
  for (const [k, v] of Object.entries(raw.review || {})) if (isObj(v) && Number.isFinite(v.due) && Number.isInteger(v.step) && v.step >= 0 && v.step < REVIEW_DAYS.length) s.review[k] = { due: v.due, step: v.step };
  for (const [k, v] of Object.entries(raw.items || {})) if (isObj(v)) s.items[k] = { s: num(v.s), c: num(v.c), w: num(v.w), last: v.last === 1 ? 1 : 0, at: num(v.at), m: v.m === true, fix: num(v.fix), ws: num(v.ws), f: String(v.f || '') };
  s.xp.total = num(raw.xp?.total); for (const [d, v] of Object.entries(raw.xp?.days || {})) if (DAY_RE.test(d)) s.xp.days[d] = num(v);
  for (const [k, v] of Object.entries(raw.awards || {})) if (Number.isFinite(v)) s.awards[k] = v;
  s.rewardRuns = {}; for (const [k,v] of Object.entries(raw.rewardRuns || {})) if (Number.isInteger(v) && v >= 0 && v <= 3) s.rewardRuns[k] = v;
  s.days = [...new Set((raw.days || []).filter(d => DAY_RE.test(d)))].sort();
  s.frozen = [...new Set((raw.frozen || []).filter(d => DAY_RE.test(d)))].sort();
  s.freezes = Math.min(MAX_FREEZES, num(raw.freezes)); s.gems = num(raw.gems); s.serial = num(raw.serial);
  if (isObj(raw.quests) && DAY_RE.test(raw.quests.day) && Array.isArray(raw.quests.list)) s.quests = { day: raw.quests.day, bonus: raw.quests.bonus === true, list: raw.quests.list.filter(isObj).map(q => ({ id: String(q.id), target: num(q.target, 1), n: num(q.n), done: q.done === true })) };
  for (const k of Object.keys(s.stats)) s.stats[k] = num(raw.stats?.[k]);
  if (isObj(raw.session) && Array.isArray(raw.session.queue) && Number.isInteger(raw.session.index)) s.session = raw.session; // validated against the course on resume
  for (const [id,v] of Object.entries(raw.schoolWork || {})) if (SEMESTERS.some(s=>s.id===id) && isObj(v)) s.schoolWork[id]={text:String(v.text || '').slice(0,6000),checks:Array.from({length:4},(_,i)=>v.checks?.[i]===true),at:num(v.at)};
  for(const [k,v]of Object.entries(raw.exposures||{}).slice(-12000))if(isObj(v)&&Number.isFinite(v.n)&&Number.isFinite(v.last))s.exposures[k]={n:num(v.n),last:num(v.last)};
  for(const [k,v]of Object.entries(raw.rotations||{}))if(isObj(v)&&Array.isArray(v.seen))s.rotations[k]={round:Math.max(1,Math.floor(num(v.round,1))),seen:[...new Set(v.seen.filter(x=>typeof x==='string'))].slice(-1500)};
  for(const exam of EXAMS)for(const tier of TIERS){const key=exam.id+':'+tier.id,p=raw.examProgress?.[key];if(!isObj(p))continue;
    s.examProgress[key]={checks:(Array.isArray(p.checks)?p.checks:[]).filter(r=>isObj(r)&&['A','B'].includes(r.form)&&Number.isFinite(r.at)&&Number.isFinite(r.accuracy)&&Array.isArray(r.skills)).slice(-30),skills:{},official:(Array.isArray(p.official)?p.official:[]).filter(r=>isObj(r)&&Number.isFinite(r.score)&&r.score>=exam.range[0]&&r.score<=exam.range[1]&&/^\d{4}-\d{2}-\d{2}$/.test(r.date)&&['practice','actual'].includes(r.kind)).slice(-20)};
    for(const [id]of exam.skills){const skill={};for(const [k,r]of Object.entries(p.skills?.[id]||{}).slice(-1000))if(isObj(r)&&Number.isFinite(r.at))skill[k]={ok:r.ok===true,at:r.at};s.examProgress[key].skills[id]=skill;}
  }
  if (isObj(raw.legacy)) s.legacy = raw.legacy;
  return s;
}
// v1 pilot progress (3 units, 12 quests) is carried over; the v1 key itself is never modified
function migrateV1(raw, now) {
  const s = fresh(now); if (!isObj(raw) || raw.schema !== 1) return null;
  for (const [id, r] of Object.entries(raw.completed || {})) { const m = /^(u[123])-q([1-4])$/.exec(id); if (m && Number.isFinite(r?.at)) { s.nodes[`${m[1]}:q${m[2]}`] = { n: 1, at: r.at, best: r.passed ? 1 : 0.5, tested: false }; if (m[2] === '4' && r.passed) s.crowns[m[1]] = r.at; } }
  const xp = Object.values(raw.awards || {}).filter(Number.isFinite).reduce((a, b) => a + b, 0);
  s.xp.total = xp; s.legacy = { from: 'v1', xp, at: now };
  s.days = [...new Set((raw.days || []).filter(d => DAY_RE.test(d)))].sort();
  for (const [u, r] of Object.entries(raw.schedule || {})) if (/^u[123]$/.test(u) && Number.isFinite(r?.due)) s.review[u] = { due: r.due, step: Math.min(REVIEW_DAYS.length - 1, num(r.step)) };
  if (raw.profile) s.profile = makeProfile({ goal: { 5: 'casual', 10: 'regular', 15: 'serious' }[raw.profile.minutes], start: raw.profile.start === 'u1' ? 's1' : 's2' });
  return s;
}

// ---------- quests & badges ----------
const QUEST_POOL = [
  { id: 'xp', label: g => `今天獲得 ${g + 10} XP`, target: g => g + 10 },
  { id: 'lessons', label: () => '完成 2 個課程或練習', target: () => 2 },
  { id: 'perfect', label: () => '完成 1 次全對課程', target: () => 1 },
  { id: 'combo', label: () => '一次課程中連續答對 8 題', target: () => 8 },
  { id: 'listen', label: () => '答對 5 題聽力題', target: () => 5 },
  { id: 'fix', label: () => '把 3 題錯題改對', target: () => 3 },
  { id: 'story', label: () => '讀完 1 篇故事', target: () => 1 }
];
export const questLabel = (q, goalXp) => QUEST_POOL.find(p => p.id === q.id)?.label(goalXp) || q.id;
export const BADGES = [
  { id: 'first', icon: '🌱', title: '第一步', desc: '完成第一個課程', test: s => s.stats.lessons >= 1 },
  { id: 'streak3', icon: '🔥', title: '三天習慣', desc: '連續學習 3 天', test: (s, x) => x.streak >= 3 },
  { id: 'streak7', icon: '🔥', title: '一週不間斷', desc: '連續學習 7 天', test: (s, x) => x.streak >= 7 },
  { id: 'streak30', icon: '🏅', title: '一個月習慣', desc: '連續學習 30 天', test: (s, x) => x.streak >= 30 },
  { id: 'crown1', icon: '👑', title: '第一頂金冠', desc: '通過一次單元挑戰', test: s => s.stats.crowns >= 1 },
  { id: 'section1', icon: '🗺️', title: '走完第一段', desc: '完成第 1 段的所有課程', test: (s, x) => x.sectionDone('s1') },
  { id: 'story5', icon: '📖', title: '故事迷', desc: '讀完 5 篇故事', test: s => s.stats.stories >= 5 },
  { id: 'perfect10', icon: '💯', title: '零失誤', desc: '10 次全對課程', test: s => s.stats.perfect >= 10 },
  { id: 'fix20', icon: '🛠️', title: '訂正達人', desc: '把 20 題錯題改對', test: s => s.stats.fixed >= 20 },
  { id: 'xp500', icon: '⚡', title: '500 XP', desc: '累積 500 XP', test: s => s.xp.total >= 500 },
  { id: 'xp2000', icon: '🌟', title: '2000 XP', desc: '累積 2000 XP', test: s => s.xp.total >= 2000 }
];

// ---------- game ----------
export function createGame({ storage, now = () => Date.now(), course }) {
  let state = fresh(now()), warning = '', result = null;
  try {
    const raw = storage?.getItem(KEY);
    if (raw) state = sanitize(JSON.parse(raw), now());
    else { const v1 = storage?.getItem(V1_KEY); if (v1) { const m = migrateV1(JSON.parse(v1), now()); if (m) state = m; } }
  } catch { warning = '無法讀取闖關紀錄，已開啟新的旅程；舊教材的紀錄不受影響。'; }
  function save() { try { if (!storage) throw Error(); storage.setItem(KEY, JSON.stringify(state)); if (warning.startsWith('無法儲存')) warning = ''; } catch { warning = '無法儲存：進度只保留在這個分頁，請到「我的」下載備份。'; } }

  const today = () => localDay(now());
  const goalXp = () => GOALS[state.profile?.goal] || GOALS.regular;
  // missed days are covered by freezes in date order; without enough freezes the streak simply ends
  function applyFreezes() {
    const last = state.days.at(-1); if (!last) return false;
    let changed = false; const yesterday = dayNum(today()) - 1;
    for (let n = dayNum(last) + 1; n <= yesterday; n++) {
      const d = dayStr(n); if (state.frozen.includes(d)) continue;
      if (state.freezes > 0) { state.freezes--; state.frozen.push(d); changed = true; } else break;
    }
    if (changed) state.frozen.sort();
    return changed;
  }
  function ensureQuests() {
    const day = today(); if (state.quests?.day === day) return;
    const picks = shuffle(QUEST_POOL, 'quests' + day).filter(q => q.id !== 'xp').slice(0, 2);
    state.quests = { day, bonus: false, list: [QUEST_POOL[0], ...picks].map(q => ({ id: q.id, target: q.target(goalXp()), n: 0, done: false })) };
  }
  // changing the daily goal also moves today's XP quest, unless it is already finished
  function retargetXpQuest() { ensureQuests(); const q = state.quests.list.find(x => x.id === 'xp'); if (q && !q.done) q.target = QUEST_POOL[0].target(goalXp()); }
  function bumpQuest(id, by = 1, set = false) {
    ensureQuests(); const q = state.quests.list.find(x => x.id === id); if (!q || q.done) return;
    q.n = set ? Math.max(q.n, by) : q.n + by;
    if (q.n >= q.target) { q.n = q.target; q.done = true; state.gems += QUEST_GEMS; pending.push({ type: 'quest', id }); }
    if (!state.quests.bonus && state.quests.list.every(x => x.done)) { state.quests.bonus = true; state.gems += QUEST_BONUS; pending.push({ type: 'chest' }); }
  }
  let pending = [];
  const streak = () => streakOf(state.days, state.frozen, now());
  const nodeDone = id => !!(state.nodes[id]?.n || state.nodes[id]?.tested);
  const lessonNodes = trackId => (course.track(trackId)?.units || []).flatMap(u => u.nodes.filter(n => n.kind !== 'boss'));
  // done = learned or tested out (unlocks the next section); completed = every lesson actually played
  function sectionDone(trackId) { const ns = lessonNodes(trackId); return ns.length > 0 && ns.every(n => nodeDone(n.id)); }
  function sectionCompleted(trackId) { const ns = lessonNodes(trackId); return ns.length > 0 && ns.every(n => state.nodes[n.id]?.n > 0); }
  function checkBadges() {
    const ctx = { streak: streak(), sectionDone: sectionCompleted };
    for (const b of BADGES) if (!state.achievements[b.id] && b.test(state, ctx)) { state.achievements[b.id] = now(); state.gems += BADGE_GEMS; pending.push({ type: 'badge', id: b.id }); }
  }
  applyFreezes(); ensureQuests();

  // ----- unlocking -----
  function trackUnlocked(trackId) {
    const t = course.track(trackId); if (!t) return false; if (t.kind === 'branch' || t.kind === 'semester') return true;
    const i = course.index.sections.findIndex(s => s.id === trackId);
    if (i <= 7 || state.jumped[trackId]) return true;
    return sectionDone(course.index.sections[i - 1].id);
  }
  // a node opens when the previous lesson node in its track is done; challenges and stories never block the path
  function nodeStatus(nodeId) {
    const n = course.nodes.get(nodeId); if (!n) return 'locked';
    const done = state.nodes[nodeId];
    if (n.kind === 'boss') { if (state.crowns[n.unit]) return 'crowned'; if(n.semester)return 'available'; if (course.track(n.track)?.kind === 'section' && course.track(n.track).no <= 8) return 'available'; const unit = course.units.get(n.unit); return unit.nodes.filter(x => x.kind !== 'boss').every(x => nodeDone(x.id)) ? 'available' : (done?.n ? 'done' : 'locked'); }
    if (done?.n) return 'done'; if (done?.tested) return 'tested';
    if (!trackUnlocked(n.track)) return 'locked';
    if(n.semester)return 'available';
    if (course.track(n.track)?.kind === 'section' && course.track(n.track).no <= 8) return 'available';
    const lessons = course.path(n.track).filter(id => course.nodes.get(id).kind !== 'boss');
    const i = lessons.indexOf(nodeId);
    return i <= 0 || nodeDone(lessons[i - 1]) ? 'available' : 'locked';
  }
  function current(trackId) { return course.path(trackId).find(id => course.nodes.get(id).kind !== 'boss' && nodeStatus(id) === 'available') || null; }
  function unitStoryStatus(unitId) { const u = course.units.get(unitId); if (!u?.story) return null; if (state.stories[u.story]) return 'done'; if (course.track(u.track)?.kind === 'section' && course.track(u.track).no <= 8) return 'available'; return u.nodes.filter(n => n.kind !== 'boss').every(n => nodeDone(n.id)) ? 'available' : 'locked'; }

  // ----- composing sessions -----
  const rec = id => state.items[id];
  const scorable = ids => ids.filter(id => isScored(course.item(id)));
  function syncExposures(){for(const [id,r]of Object.entries(state.items)){const q=course.item(id);if(!q||!r.s)continue;for(const k of [questionKey(q),...learningKeys(q)])if(!state.exposures[k])state.exposures[k]={n:r.s,last:0};}}
  function choose(ids, n, seed, prefer) {
    syncExposures();
    return selectDistinct(ids,course.item,n,{exposures:state.exposures,seed,prefer});
  }

  const byLevel = ids => ids.map((id, i) => ({ id, l: course.item(id).level || 2, i })).sort((a, b) => a.l - b.l || a.i - b.i).map(x => x.id);
  function interleaveKinds(ids) { const groups = {}; for (const id of ids) (groups[course.item(id).kind] ||= []).push(id); const out = []; const g = Object.values(groups); while (g.some(x => x.length)) for (const x of g) if (x.length) out.push(x.shift()); return out; }
  function composeNode(nodeId, serial) {
    const n = course.nodes.get(nodeId); if (!n?.pool) return null;
    if(n.semester && schoolFiles(n.semester,course.index).some(file=>!course.loaded(file)))return null;
    syncExposures();
    const pool = uniqueQuestions(scorable(n.pool),course.item); if(!pool.length)return null;
    const count=n.kind==='boss'?BOSS_SIZE:LESSON_SIZE,scope='node:'+nodeId;
    const previous=state.rotations[scope]||{round:1,seen:[]};
    const prefer=id=>(n.kind==='word'&&course.item(id).type==='match'?1:0)+(n.semester&&course.item(id).school===n.semester&&n.kind!=='boss'?10:0)+(rec(id)?.m?2:0);
    let round=previous.round,seen=previous.seen;
    let picked=selectDistinct(pool,course.item,count,{seen,exposures:state.exposures,seed:nodeId+serial,prefer});
    let cycled=false;
    if(!picked.length){seen=[];round++;cycled=true;picked=selectDistinct(pool,course.item,count,{exposures:state.exposures,seed:nodeId+serial,prefer});}
    const tips=n.kind==='boss'?[]:n.pool.filter(id=>course.item(id)?.type==='info').slice(0,!state.nodes[nodeId]?.n?2:0);
    return {queue:[...tips,...(n.kind==='boss'?interleaveKinds(picked):byLevel(picked))],hearts:n.kind==='boss'?HEARTS:null,rotation:{scope,round,cycled,seen,questions:picked.length,poolQuestions:pool.length}};
  }

  function weakFirst(ids, n, seed) { // p(correct) ≈ 0.7 is the sweet spot; mistakes and never-tried items come first
    return choose(ids, n, seed, id => { const r = rec(id); if (r?.m) return 3; if (!r?.s) return 1; const p = (r.c + 1) / (r.s + 2); return 2 - Math.abs(p - 0.7) * 2; });
  }
  function learnedItems(filter = () => true) {
    const ids = [];
    for (const [nid, st] of Object.entries(state.nodes)) { if (!st.n) continue; const n = course.nodes.get(nid); if (n?.pool) ids.push(...scorable(n.pool).filter(id => filter(course.item(id)))); }
    return [...new Set(ids)];
  }
  function compose(mode, id, serial) {
    switch (mode) {
      case 'exam-practice': case 'exam-check': return makeExamPlan(course,mode,id,state,now());
      case 'lesson': case 'boss': return composeNode(id, serial);
      case 'story': { const s = course.stories.get(id); const seen=new Set();const queue=s?.steps?.filter(id=>{const q=course.item(id);if(!isScored(q))return true;const key=questionKey(q);if(seen.has(key))return false;seen.add(key);return true;});return queue ? { queue, hearts: null } : null; }
      case 'review': { const u = course.units.get(id); if (!u) return null; const ids = scorable(u.nodes.filter(x => x.kind !== 'boss').flatMap(x => course.nodes.get(x.id).pool || [])); return ids.length ? { queue: interleaveKinds(weakFirst(ids, LESSON_SIZE, id + serial)), hearts: null } : null; }
      case 'mistakes': { const ids = Object.entries(state.items).filter(([k, r]) => r.m && isScored(course.item(k))).map(([k]) => k); return ids.length ? { queue: choose(ids,LESSON_SIZE,'m'+serial,()=>0), hearts: null } : null; }
      case 'practice': { const ids = learnedItems(); return ids.length ? { queue: interleaveKinds(weakFirst(ids, LESSON_SIZE, 'p' + serial)), hearts: null } : null; }
      case 'listen': { const ids = learnedItems(it => it.type === 'listen' || it.listen); return ids.length ? { queue: weakFirst(ids, LESSON_SIZE, 'l' + serial), hearts: null } : null; }
      case 'vocab': { const set = course.vocab.get(id); if (!set) return null; const ids = [...course.items.values()].filter(it => it.set === id && it.type!=='match').map(it => it.id); return { queue: byLevel(choose(ids,12,id+serial,()=>0)), hearts: null }; }
      case 'jump': { // test out of every section before this one
        const i = course.index.sections.findIndex(s => s.id === id); if (i <= 0) return null;
        const prior = course.index.sections.slice(0, i), recent = prior.at(-1);
        const take = (sec, k, salt) => shuffle(sec.units.flatMap(u => u.nodes.filter(n => n.kind !== 'boss').flatMap(n => scorable(course.nodes.get(n.id).pool || []))).filter(x => ['grammar', 'drill', 'talk'].includes(course.item(x).kind) && course.item(x).type !== 'match'), salt).slice(0, k);
        const queue = [...new Set([...take(recent, 8, id + serial), ...prior.slice(0, -1).flatMap((s, k) => take(s, 1, s.id + serial + k))])].slice(0, BOSS_SIZE);
        const distinct=choose(queue,BOSS_SIZE,'j'+serial,()=>0);
        return distinct.length >= 6 ? { queue: distinct, hearts: HEARTS } : null;
      }
      case 'placement': { const placement = makePlacement(course, id ?? 20, serial, state.items); return placement ? { queue: placement.slots.map(x=>x.id), hearts:null, placement } : null; }
    }
    return null;
  }
  // files a session needs before it can start or resume
  function filesFor(mode, id) {
    if(mode==='exam-practice'||mode==='exam-check')return ['exams'];
    if (mode === 'story') return ['stories'];
    if (mode === 'vocab') return ['vocab'];
    if (mode === 'lesson' || mode === 'boss') {const n=course.nodes.get(id);return n?.semester?schoolFiles(n.semester,course.index):[n?.track].filter(Boolean);}
    if (mode === 'review') {const u=course.units.get(id);return u?.semester?schoolFiles(u.semester,course.index):[u?.track].filter(Boolean);}
    if (mode === 'jump') { const i = course.index.sections.findIndex(s => s.id === id); return course.index.sections.slice(0, Math.max(0, i)).map(s => s.id); }
    if (mode === 'placement') return course.index.sections.map(s=>s.id);
    if (mode === 'mistakes') return [...new Set(Object.values(state.items).filter(r => r.m).map(r => r.f).filter(Boolean))];
    if (mode === 'practice' || mode === 'listen') return [...new Set(Object.keys(state.nodes).filter(k=>state.nodes[k].n).flatMap(k=>{const n=course.nodes.get(k);return n?.semester?schoolFiles(n.semester,course.index):[n?.track];}).filter(Boolean))];
    return [];
  }

  function start(mode, id = null) {
    if (state.session) return false;
    if ((mode === 'lesson') && !['available', 'done', 'tested'].includes(nodeStatus(id))) return false;
    if (mode === 'boss' && !['available', 'crowned', 'done'].includes(nodeStatus(id))) return false;
    const serial = state.serial + 1, c = compose(mode, id, serial); if (!c?.queue.length) return false;
    state.serial = serial; result = null;
    state.session = { id: serial, mode, ref: id, queue: c.queue, index: 0, results: [], feedback: null, hint: false, audio: false, combo: 0, maxCombo: 0, hearts: c.hearts, repairs: 0, support: 0, wrongRun: 0, started: now(), itemStarted: now(), fastRun:0, fastBest:0, placement:c.placement || null, examPlan:c.examPlan||null, qualityVersion:2, rotation:c.rotation||null, exposedThrough:-1, base: c.queue.length };
    if(c.rotation)state.rotations[c.rotation.scope]={round:c.rotation.round,seen:[...c.rotation.seen]};
    noteExposure();save(); return true;
  }
  const currentItem = () => state.session ? course.item(state.session.queue[state.session.index]) : null;
  function noteExposure(){
    const s=state.session,it=currentItem();if(!s||!isScored(it)||s.index>=s.base||s.exposedThrough===s.index)return;
    s.exposedThrough=s.index;const keys=[...new Set([questionKey(it),...learningKeys(it)])];
    for(const key of keys){const r=state.exposures[key]||{n:0,last:0};state.exposures[key]={n:r.n+1,last:s.id};}
    if(Object.keys(state.exposures).length>12000){const drop=Object.keys(state.exposures).sort((a,b)=>state.exposures[a].last-state.exposures[b].last).slice(0,1000);for(const key of drop)delete state.exposures[key];}
    if(s.rotation){const r=state.rotations[s.rotation.scope]||{round:s.rotation.round,seen:[]};r.seen=[...new Set([...r.seen,...learningKeys(it)])];state.rotations[s.rotation.scope]=r;}
  }
  // a saved session is only resumed if all of its items still exist in the loaded course data
  function validSession() {
    const s = state.session; if (!s) return false;
    const modes=['lesson','boss','story','review','mistakes','practice','listen','vocab','jump','placement','exam-practice','exam-check'];
    const basic=Array.isArray(s.queue)&&s.queue.length>0&&s.queue.length<=512&&s.queue.every(id=>typeof id==='string'&&course.item(id))&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.queue.length&&Array.isArray(s.results)&&modes.includes(s.mode)&&Number.isSafeInteger(s.id)&&s.id>0&&Number.isInteger(s.base)&&s.base>0&&s.base<=s.queue.length&&Number.isFinite(s.started)&&(s.hearts===null||Number.isInteger(s.hearts)&&s.hearts>=0&&s.hearts<=HEARTS)&&(!s.feedback||typeof s.feedback.ok==='boolean');
    const processed=basic?s.queue.slice(0,s.index+(s.feedback?1:0)).filter(id=>isScored(course.item(id))):[];
    const examOk=validExamSession(s,course);
    const planOk = examOk && (!s.placement || (s.mode==='placement' && validPlacementPlan(s.placement,s.queue,course)));
    const ok=basic&&planOk&&processed.length===s.results.length&&s.results.every((r,i)=>r&&r.id===processed[i]&&typeof r.ok==='boolean'&&typeof r.hint==='boolean'&&typeof r.repair==='boolean');
    if (!ok) { state.session = null; save(); }
    else if(s.qualityVersion!==2&&!['placement','story'].includes(s.mode)){
      const end=s.index+(s.feedback?1:0),prefix=s.queue.slice(0,end),used=new Set(prefix.filter(id=>isScored(course.item(id))).flatMap(id=>learningKeys(course.item(id))));
      const tail=s.queue.slice(end,s.base).filter(id=>{const q=course.item(id);if(!isScored(q))return true;const keys=learningKeys(q);if(keys.some(k=>used.has(k)))return false;keys.forEach(k=>used.add(k));return true;});
      const repairs=s.queue.slice(s.base);s.queue=[...prefix,...tail,...repairs];s.base=prefix.length+tail.length;if(s.index>=s.queue.length){s.index=Math.max(0,prefix.length-1);const r=s.results.at(-1);s.feedback=isScored(course.item(s.queue[s.index]))&&r?{ok:r.ok,value:r.value||''}:null;}s.qualityVersion=2;save();
    }
    return ok;
  }
  function advance() {
    const s = state.session; if (!s) return false;
    const it = currentItem();
    if (isScored(it) && !s.feedback) return false;
    if (s.index + 1 >= s.queue.length || (s.hearts !== null && s.hearts <= 0)) return finish();
    if (s.mode === 'placement' && s.placement) { refinePlacement(s.placement,s.results,course,s.id,state.items); s.queue = s.placement.slots.map(x=>x.id); }
    s.index++; s.itemStarted = now(); s.feedback = null; s.hint = false; s.audio = false; s.transcript = false; noteExposure();save(); return true;
  }
  function submit(value) {
    const s = state.session, it = currentItem();
    if (!s || !isScored(it) || s.feedback || value === undefined || value === null || String(value).trim() === '') return false;
    const ok = accepts(it, value), repair = s.index >= s.base, t = now();
    const r = { id: it.id, value:String(value), ok, hint: s.hint, repair, audio: s.audio, transcript: !!s.transcript, unheard: (!!course.nodes.get(s.ref)?.semester||s.mode.startsWith('exam-')) && (it.type==='listen'||it.type==='input'&&it.audio&&!it.text) && (!s.audio||!!s.transcript), elapsed: Number.isFinite(s.itemStarted) ? Math.max(0,t-s.itemStarted) : null };
    const seen = (state.items[it.id]?.s || 0)>0;
    s.fastRun = fastAnswerEligible(it,r,seen) ? (s.fastRun || 0)+1 : 0; s.fastBest = Math.max(s.fastBest || 0,s.fastRun);
    s.results.push(r); s.feedback = { ok, value: String(value) };
    const record = state.items[it.id] ||= { s: 0, c: 0, w: 0, last: 0, at: 0, m: false, fix: 0, ws: 0, f: it.f || '' };
    record.s++; record.at = t; record.last = ok ? 1 : 0; record.f = it.f || record.f;
    const counts = !isAssessment(s.mode);
    if (ok) {
      record.c++; s.combo = s.hint || repair || r.unheard ? 0 : s.combo + 1; s.maxCombo = Math.max(s.maxCombo, s.combo); s.wrongRun = 0;
      if (record.m && record.ws !== s.id && counts && !s.hint && !repair && !r.unheard && record.fixedSession !== s.id) { record.fixedSession = s.id; record.fix++; bumpQuest('fix'); if (record.fix >= 2) { record.m = false; state.stats.fixed++; } }
      if (counts && (it.type === 'listen' || it.listen) && s.audio && !s.transcript && !s.hint && !repair) bumpQuest('listen');
      if (counts && !s.hint && !repair && !r.unheard) bumpQuest('combo', s.combo, true);
    } else {
      record.w++; s.combo = 0; s.wrongRun++;
      if (counts) { record.m = true; record.fix = 0; record.ws = s.id; }
      if (s.hearts !== null) s.hearts = Math.max(0, s.hearts - 1);
      else if (!repair && ['lesson', 'review', 'mistakes', 'practice', 'listen', 'vocab', 'exam-practice'].includes(s.mode)) { s.queue.push(it.id); s.repairs++; }
      // two misses in a row: add one easier item from the same unit (at most twice per session)
      if (s.wrongRun >= 2 && s.support < 2 && s.mode === 'lesson') {
        const n = course.nodes.get(s.ref), unit = course.units.get(n.unit);
        const easy = unit.nodes.flatMap(x => course.nodes.get(x.id).pool || []).find(id => { const x = course.item(id); return isScored(x) && x.level === 1 && !s.queue.some(qid=>learningKeys(course.item(qid)).some(k=>learningKeys(x).includes(k))); });
        const tip = n.pool.find(id => course.item(id)?.type === 'info' && !s.queue.includes(id));
        const extra = [tip, easy].filter(Boolean);
        if (extra.length) { s.queue.splice(s.index + 1, 0, ...extra); s.base += extra.length; s.support++; s.wrongRun = 0; }
      }
    }
    save(); return true;
  }

  function addXp(key, xp) {
    if (Object.hasOwn(state.awards, key) || xp <= 0) return 0;
    const s = state.session, scope = `${today()}:${s.mode}:${s.ref || 'mixed'}`;
    state.rewardRuns ||= {};
    if ((state.rewardRuns[scope] || 0) >= 3) return 0;
    state.rewardRuns[scope] = (state.rewardRuns[scope] || 0) + 1;
    for (const old of Object.keys(state.rewardRuns)) if (old.slice(0, 10) < dayStr(dayNum(today()) - 30)) delete state.rewardRuns[old];
    state.awards[key] = xp; state.xp.total += xp; const d = today(); state.xp.days[d] = (state.xp.days[d] || 0) + xp;
    const keys = Object.keys(state.awards); if (keys.length > 400) for (const k of keys.slice(0, keys.length - 400)) delete state.awards[k];
    bumpQuest('xp', state.xp.days[d], true); return xp;
  }
  function markActive() { const d = today(); if (!state.days.includes(d)) { state.days.push(d); state.days.sort(); return true; } return false; }

  function finish() {
    const s = state.session; if (!s) return null;
    if (!(s.hearts !== null && s.hearts <= 0) && (s.index < s.queue.length - 1 || (isScored(currentItem()) && !s.feedback))) return null;
    pending = [];
    const scored = s.results.filter(r => !r.repair), firstTry = scored.filter(r => r.ok && !r.hint && !r.unheard).length;
    const accuracy = scored.length ? firstTry / scored.length : 1, perfect = scored.length > 0 && scored.every(r => r.ok && !r.hint && !r.unheard);
    const t = now(), key = 'session:' + s.id; let xp = 0, passed = true, newDay = false, extra = {};
    const streakBefore = streak();
    if(s.mode.startsWith('exam-')){extra=finishExam(state,s,course,t);passed=extra.passed;xp=addXp(key,s.mode==='exam-practice'?XP.practice:(passed?XP.boss:XP.bossTry));newDay=markActive();if(xp)bumpQuest('lessons');state.stats.lessons++;
    } else if (s.mode === 'placement') {
      if (s.placement) {
        extra = placementReport(s.placement,s.results,course);
        extra.review = s.results.map((r,idx)=>{const it=course.item(r.id)||{};return{id:r.id,num:idx+1,ok:r.ok,value:r.value||'',type:it.type||'choice',prompt:it.prompt||'',text:it.text||it.audio||'',audio:it.audio||'',passage:it.passage||'',passageTitle:it.passageTitle||'',options:it.options?[...it.options]:(it.words?[...it.words]:[]),correctAnswers:it.correctAnswers?[...it.correctAnswers]:[],answer:it.given?`${it.given} ${it.answer}`:(it.answer||''),why:it.why||'',level:it.level||1,exam:it.exam||'',difficulty:it.difficulty||'',skill:it.skill||''};});
      } else {
      const blocks = course.index.placement || []; let reached = 0, i = 0;
      for (const [bi, b] of blocks.entries()) { const rs = s.results.slice(i, i + b.items.length); i += b.items.length; if (rs.length && rs.filter(r => !r.ok).length <= 1) reached = bi + 1; else break; }
      const order = course.index.sections.map(x => x.id);
      const lastPassed = reached ? order.indexOf(blocks[reached - 1].section) : -1;
      const recommended = order[Math.min(order.length - 1, lastPassed + 1)];
      extra = { recommended, reached, blocks: blocks.length };
      }
    } else {
      if (s.mode === 'lesson') {
        const node = state.nodes[s.ref] ||= { n: 0, at: 0, best: 0, tested: false }; const first = !node.n;
        node.n++; node.at = t; node.best = Math.max(node.best, accuracy);
        xp = addXp(key, (first ? XP.lesson : XP.replay) + (perfect ? XP.perfect : 0));
        const unit = course.units.get(course.unitOfNode(s.ref));
        if (first && unit.nodes.filter(n => n.kind !== 'boss').every(n => nodeDone(n.id)) && !state.review[unit.id]) state.review[unit.id] = { due: t + DAY, step: 0 };
        state.stats.lessons++;
      } else if (s.mode === 'boss') {
        passed = s.hearts > 0 && accuracy >= 0.8;
        if(course.nodes.get(s.ref)?.semester && scored.some(r=>r.unheard)){passed=false;extra.audioPending=true;}
        const unitId = course.unitOfNode(s.ref);
        const node = state.nodes[s.ref] ||= { n: 0, at: 0, best: 0, tested: false }; node.n++; node.at = t; node.best = Math.max(node.best, accuracy);
        if (passed && !state.crowns[unitId]) { state.crowns[unitId] = t; state.gems += CROWN_GEMS; state.stats.crowns++; extra.chest = CROWN_GEMS; }
        xp = addXp(key, passed ? XP.boss + (perfect ? XP.perfect : 0) : XP.bossTry); state.stats.lessons++;
      } else if (s.mode === 'story') {
        const first = !state.stories[s.ref]; state.stories[s.ref] = t; if (first) state.stats.stories++;
        xp = addXp(key, first ? XP.story : XP.storyReplay); if (xp) bumpQuest('story');
      } else if (s.mode === 'review') {
        const r = state.review[s.ref], due = r && t >= r.due;
        if (due) { const step = accuracy >= 0.8 ? Math.min(r.step + 1, REVIEW_DAYS.length - 1) : 0; state.review[s.ref] = { due: t + REVIEW_DAYS[step] * DAY, step }; extra.nextReview = state.review[s.ref].due; }
        xp = addXp(key, (due ? XP.review : XP.practice) + (perfect ? XP.perfect : 0)); state.stats.lessons++;
      } else if (s.mode === 'jump') {
        passed = s.hearts > 0 && accuracy >= 0.8;
        if (passed) { const i = course.index.sections.findIndex(x => x.id === s.ref); for (const sec of course.index.sections.slice(0, i)) for (const u of sec.units) for (const n of u.nodes) if (n.kind !== 'boss' && !state.nodes[n.id]?.n) state.nodes[n.id] = { n: 0, at: t, best: 0, tested: true }; state.jumped[s.ref] = t; }
        xp = addXp(key, passed ? XP.jump : 0);
      } else {
        xp = addXp(key, XP.practice + (perfect ? XP.perfect : 0)); state.stats.lessons++;
      }
      if (perfect && s.mode !== 'jump' && xp) { state.stats.perfect++; bumpQuest('perfect'); }
      if (s.mode !== 'jump' || passed) { newDay = markActive(); if (xp) bumpQuest('lessons'); }
      state.stats.combo = Math.max(state.stats.combo, s.maxCombo);
    }
    checkBadges();
    result = { mode: s.mode, ref: s.ref, xp, accuracy, perfect, firstTry, total: scored.length, repairs: s.results.filter(r => r.repair).length, passed, hearts: s.hearts, maxCombo: s.maxCombo, seconds: Math.max(1, Math.round((t - s.started) / 1000)), newDay, streak: streak(), streakBefore, events: pending, ...extra };
    result.takeaways = takeaways(s, course);
    result.suggestedJump = jumpSuggestion(s,course);
    pending = []; state.session = null; save(); return result;
  }

  return {
    get state() { return state; }, get warning() { return warning; }, get result() { return result; }, course,
    save, today, goalXp, streak, nodeStatus, current, trackUnlocked, sectionDone, sectionCompleted, unitStoryStatus, filesFor, start, submit, finish, validSession,
    currentItem, next: advance,
    setup(profile) { state.profile = makeProfile(profile); retargetXpQuest(); save(); },
    update(patch) { if (!state.profile) return; state.profile = makeProfile({ ...state.profile, ...patch }); retargetXpQuest(); save(); },
    saveExamEvidence(key,evidence){const ok=saveOfficial(state,key,evidence,now());if(ok)save();return ok;},
    saveSchoolWork(id,text,checks=[]) {if(!SEMESTERS.some(s=>s.id===id))return false;state.schoolWork[id]={text:String(text || '').slice(0,6000),checks:Array.from({length:4},(_,i)=>checks[i]===true),at:now()};save();return true;},
    flag(id) { if (!course.item(id)) return false; if (state.flags[id]) delete state.flags[id]; else state.flags[id] = now(); save(); return !!state.flags[id]; },
    acceptPlacement(sectionId) { const order = course.index.sections.map(s=>s.id), i=order.indexOf(sectionId); if (i<0) return false; if (i>0) state.jumped[sectionId]=now(); if(state.profile) state.profile.start=sectionId; save(); return true; },
    hint() { const s = state.session; if (s && !s.feedback && !['boss', 'jump', 'placement','exam-check'].includes(s.mode)) { s.hint = true; save(); return true; } return false; },
    heard() { const s = state.session; if (s && !s.feedback && !s.transcript) { s.audio = true; save(); } },
    transcript() { const s = state.session; if (s && !s.feedback) { s.transcript = true; s.audio = false; save(); } },
    abandon() { state.session = null; result = null; save(); },
    clearResult() { result = null; },
    buyFreeze() { if (state.gems < FREEZE_COST || state.freezes >= MAX_FREEZES) return false; state.gems -= FREEZE_COST; state.freezes++; save(); return true; },
    refreshDay() { const a = applyFreezes(); const before = state.quests?.day; ensureQuests(); if (a || before !== state.quests.day) save(); },
    dueUnits() { return Object.entries(state.review).filter(([, r]) => r.due <= now()).map(([u]) => u).filter(u => course.units.has(u)); },
    mistakeCount() { return Object.values(state.items).filter(r => r.m).length; },
    todayXp() { return state.xp.days[today()] || 0; },
    weekXp() { const out = []; const n = dayNum(today()); for (let k = 6; k >= 0; k--) { const d = dayStr(n - k); out.push({ day: d, xp: state.xp.days[d] || 0 }); } return out; },
    questLabel: q => questLabel(q, goalXp()),
    export() { return JSON.stringify({ ...state, exported: localDay(now()) }, null, 2); },
    restore(text) { try { const s = sanitize(JSON.parse(text), now()); state = s; result = null; save(); return true; } catch { warning = '備份格式不正確，現有紀錄沒有變更。'; return false; } },
    reset() { state = fresh(now()); result = null; ensureQuests(); save(); }
  };
}
