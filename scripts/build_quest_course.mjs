// Builds the English Quest v2 game course from the site's existing teaching content.
// Output: dist/quest/course/*.json plus docs/redesign/COURSE-BUILD-REPORT.json.
// Deterministic: the same source content always yields the same item IDs and options.
import fs from 'node:fs';
import path from 'node:path';
import { UNIFIED_GRADES } from '../dist/curriculum_unified.mjs';
import { curriculum } from '../dist/curriculum.mjs';
import { grammarTopics } from '../dist/grammar_content.mjs';
import { foundations } from '../dist/knowledge_foundations.mjs';
import { points } from '../dist/knowledge_content.mjs';
import { standardsPoints } from '../dist/knowledge_standards.mjs';
import { ALL_COMMUTE_DIALOGUES } from '../dist/commute_dialogues.mjs';
import { journeyCatalog } from '../dist/learning_journey.mjs';
import { units as pilotUnits, quests as pilotQuests, reviews as pilotReviews } from '../dist/quest/catalog.mjs';

export const COURSE_VERSION = '2026-10-24.v5';
const OUT = 'dist/quest/course';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const diagBank = read('data/questions/diagnostic_bank.json');
const mnemonicCards = read('dist/mnemonics/cards.json');
const knowledge = new Map([...foundations, ...points, ...standardsPoints].map(p => [p.id, p]));
const grammar = new Map(grammarTopics.map(t => [t.id, t]));
const chapters = new Map(curriculum.flatMap(t => t.chapters.map(c => [`${t.id}/${c.id}`, c])));
const microUnits = new Map(UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units)).map(u => [u.id, u]));
const routes = new Set(journeyCatalog.map(c => c.link));

// ---------- helpers ----------
const CJK = /[㐀-鿿＀-￯]/;
const hash = s => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
function pick(list, n, seed) { // deterministic sample without replacement
  const arr = [...list]; let x = hash(seed) || 1;
  for (let i = arr.length - 1; i > 0; i--) { x = (Math.imul(x, 1103515245) + 12345) >>> 0; const j = x % (i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; }
  return arr.slice(0, n);
}
export const normalize = s => String(s ?? '').normalize('NFKC').replace(/[’‘`]/g, "'").replace(/[“”]/g, '"').toLowerCase().replace(/[.,!?;:"()\[\]…—–-]/g, ' ').replace(/\s+/g, ' ').trim();
const clean = s => String(s ?? '').replace(/\s*(❌|✔️|✔|✓|✗|×)\s*/g, ' ').replace(/\s+/g, ' ').trim();
// word-bank tokens: lower-case sentence-initial words so a capital letter does not give away the first word;
// keep I / I'm, acronyms and names that appear capitalised mid-sentence somewhere in the content
const NAMES = new Set();
const SENTENCE_END = /[.!?]["')]?$/;
function bankTokens(en) {
  const raw = String(en).normalize('NFKC').replace(/[’‘]/g, "'").split(/\s+/);
  return raw.map((r, i) => {
    const t = r.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '');
    const initial = i === 0 || SENTENCE_END.test(raw[i - 1]);
    return initial && !/^I('|$)/.test(t) && !/^[A-Z]{2,}/.test(t) && !NAMES.has(t) ? t.toLowerCase() : t;
  }).filter(Boolean);
}
function learnNames(en) {
  const raw = String(en).normalize('NFKC').replace(/[’‘]/g, "'").split(/\s+/);
  raw.forEach((r, i) => { const t = r.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, ''); if (i > 0 && !SENTENCE_END.test(raw[i - 1]) && /^[A-Z][a-z]+$/.test(t)) NAMES.add(t); });
}
const isQuestion = s => /\?["')]?$/.test(String(s).trim());
const GENERIC_REPLY = /^(yes|no|sure|ok|okay|thanks?|thank you|of course|great|sounds|right|really|me too|good|nice)\b/i;
const tokens = en => String(en).normalize('NFKC').replace(/[’‘]/g, "'").split(/\s+/).map(t => t.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9']+$/g, '')).filter(Boolean);
const isWordToken = t => /^[A-Za-z][A-Za-z']*$/.test(t);
const englishSentence = s => !CJK.test(s) && (s.match(/[A-Za-z]+/g) || []).length >= 2;
const splitTitle = t => { const m = String(t).match(/^(.*?)\s*\(([^()]*)\)\s*$/); return m ? { zh: m[1].trim(), en: m[2].trim() } : { zh: String(t).trim(), en: '' }; };
const short = (s, n = 160) => { s = String(s ?? '').replace(/\s+/g, ' ').trim(); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const wordInSentence = (word, sentence) => { const w = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); const m = new RegExp(`(^|[^A-Za-z'])(${w})(?=[^A-Za-z']|$)`, 'i').exec(sentence); return m ? { index: m.index + m[1].length, text: m[2] } : null; };
const fileExists = p => { try { return fs.statSync(p).isFile(); } catch { return false; } };

const excluded = [];
function reject(id, reason) { excluded.push({ id, reason }); return null; }
function validChoice(it) {
  if (!Array.isArray(it.options) || it.options.length < 2) return reject(it.id, 'fewer than 2 options');
  // case and punctuation can be the point of a question (Amy / amy), so compare options almost verbatim
  const norm = it.options.map(o => String(o).normalize('NFKC').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim());
  if (new Set(norm).size !== norm.length) return reject(it.id, 'duplicate options');
  if (!it.options.includes(it.answer)) return reject(it.id, 'answer not in options');
  if (it.options.some(o => !String(o).trim())) return reject(it.id, 'blank option');
  if (!String(it.prompt || it.text || '').trim()) return reject(it.id, 'blank prompt');
  return it;
}

// distractors: other values from candidate pools, unique by normalized form and not overlapping the answer
function distractors(answer, pools, n, seed, related = (a, b) => false) {
  const out = []; const seen = new Set([normalize(answer)]);
  for (const pool of pools) {
    for (const v of pick(pool, pool.length, seed + '|' + out.length)) {
      const k = normalize(v); if (!k || seen.has(k) || related(answer, v)) continue;
      seen.add(k); out.push(v); if (out.length >= n) return out;
    }
  }
  return out;
}
const zhRelated = (a, b) => { const A = String(a).replace(/[；;，,、（）()\s]/g, ''), B = String(b).replace(/[；;，,、（）()\s]/g, ''); return !A || !B || A.includes(B) || B.includes(A); };
const enRelated = (a, b) => { const A = normalize(a), B = normalize(b); return A === B || ((A.startsWith(B) || B.startsWith(A)) && Math.abs(A.length - B.length) <= 3); };

// ---------- mapping tables (hand-curated; see GAME-REDESIGN-V2.md §3) ----------
const SECTIONS = [
  { id: 's1', title: '開口說第一句', level: 'Pre-A1', color: 'green', units: ['u1', 'g3-s1-u1', 'g3-s1-u2', 'g3-s1-u3', 'g3-s2-u4', 'g3-s2-u5', 'g3-s2-u6'] },
  { id: 's2', title: '生活小日常', level: 'A1', color: 'sky', units: ['u2', 'g4-s1-u1', 'g4-s1-u2', 'g4-s1-u3', 'u3', 'g4-s2-u4', 'g4-s2-u5', 'g4-s2-u6'] },
  { id: 's3', title: '我的世界', level: 'A1', color: 'violet', units: ['g5-s1-u1', 'g5-s1-u2', 'g5-s1-u3', 'g5-s2-u4', 'g5-s2-u5', 'g5-s2-u6'] },
  { id: 's4', title: '走進城市', level: 'A1–A2', color: 'orange', units: ['g6-s1-u1', 'g6-s1-u2', 'g6-s1-u3', 'g6-s1-u4', 'g6-s2-u5', 'g6-s2-u6', 'g6-s2-u7', 'g6-s2-u8'] },
  { id: 's5', title: '國中起步', level: 'A2', color: 'teal', units: ['g7-s1-u1', 'g7-s1-u2', 'g7-s1-u3', 'g7-s2-u4', 'g7-s2-u5', 'g7-s2-u6', 'g8-s1-u1', 'g8-s1-u2', 'g8-s1-u3', 'g8-s2-u4', 'g8-s2-u5'] },
  { id: 's6', title: '國中精熟', level: 'A2+', color: 'pink', units: ['g9-s1-u1', 'g9-s1-u2', 'g9-s1-u3', 'g9-s2-u4', 'g9-s2-u5', 'g9-s2-u6'] },
  { id: 's7', title: '高中核心', level: 'B1', color: 'blue', units: ['g10-s1-u1', 'g10-s1-u2', 'g10-s1-u3', 'g10-s1-u4', 'g10-s1-u5', 'g10-s1-u6', 'g10-s2-u7', 'g10-s2-u8', 'g10-s2-u9', 'g10-s2-u10', 'g10-s2-u11', 'g10-s2-u12'] },
  { id: 's8', title: '高中進階', level: 'B1+–B2', color: 'indigo', units: ['g11-s1-u1', 'g11-s1-u2', 'g11-s1-u3', 'g11-s1-u4', 'g11-s1-u5', 'g11-s1-u6', 'g11-s2-u7', 'g11-s2-u8', 'g11-s2-u9', 'g11-s2-u10', 'g11-s2-u11', 'g11-s2-u12'] },
  { id: 's9', title: '大考與國際', level: 'B2–C1', color: 'gold', units: ['g12-s1-u1', 'g12-s1-u2', 'g12-s1-u3', 'g12-s1-u4', 'g12-s1-u5', 'g12-s1-u6', 'g12-s2-u7', 'g12-s2-u8', 'g12-s2-u9', 'g12-s2-u10', 'g12-s2-u11', 'g12-s2-u12'] }
];
const BRANCHES = [
  { id: 'b-cap', title: '會考衝刺', icon: '🎯', level: '建議完成第 5 段', color: 'teal', chapters: ['jhs/j1', 'jhs/j2', 'jhs/j3', 'jhs/j4', 'jhs/j5', 'jhs/j6', 'jhs/j7'] },
  { id: 'b-gsat', title: '學測統測衝刺', icon: '🏫', level: '建議完成第 7 段', color: 'blue', chapters: ['sh/s1', 'sh/s2', 'sh/s3', 'sh/s4', 'sh/s5', 'sh/s6', 'sh/s7'] },
  { id: 'b-voc', title: '技高職場英語', icon: '🛠️', level: '建議完成第 6 段', color: 'orange', chapters: ['voc/v1', 'voc/v2', 'voc/v3', 'voc/v4', 'voc/v5', 'voc/v6', 'voc/v7'] },
  { id: 'b-cert', title: '英檢與托福', icon: '📜', level: '建議完成第 7 段', color: 'violet', chapters: ['intl/gept', 'intl/toefl'] },
  { id: 'b-toeic', title: 'TOEIC 多益', icon: '💼', level: '建議 B1 以上', color: 'sky', chapters: ['intl/toeic'], tier: 5 },
  { id: 'b-sat', title: 'Digital SAT', icon: '🎓', level: '建議 B2 以上', color: 'pink', chapters: ['intl/sat'], tier: 6 },
  { id: 'b-gre', title: 'GRE Verbal', icon: '🧠', level: '建議 C1 以上', color: 'indigo', chapters: ['intl/gre'], tier: 7 },
  { id: 'b-gmat', title: 'GMAT 批判推理', icon: '📈', level: '建議 C1 以上', color: 'gold', chapters: ['intl/gmat'], tier: 8 }
];
// diagnostic subtopics (tiers 1–4) → main-path unit, by subtopic order within the tier
const DIAG_TO_UNIT = {
  1: ['u2', 'u2', 'g5-s1-u2', 'g3-s2-u5', 'g5-s1-u3', 'g4-s2-u6', 'g3-s1-u3', 'u3', 'u3', 'g6-s1-u1', 'g5-s2-u4', 'g4-s1-u2', 'g4-s1-u3', 'g6-s1-u3', 'g5-s2-u4', 'g4-s1-u2', 'g6-s1-u2', 'g6-s1-u2', 'g6-s2-u8', 'g4-s2-u4', 'g4-s2-u5', 'g6-s1-u1', 'g4-s1-u3', 'g3-s2-u6', 'g6-s2-u7'],
  2: ['g8-s1-u2', 'g8-s1-u1', 'g7-s2-u5', 'g8-s2-u4', 'g8-s2-u5', 'g8-s2-u5', 'g7-s2-u5', 'g8-s2-u4', 'g8-s2-u4', 'g8-s2-u4', 'g8-s1-u3', 'g8-s1-u3', 'g8-s1-u3', 'g8-s1-u2', 'g8-s2-u5', 'g7-s1-u2', 'g7-s1-u2', 'g9-s2-u4', 'g7-s2-u6', 'g6-s1-u4', 'g8-s1-u2', 'g7-s2-u6', 'g7-s1-u1', 'g8-s1-u1', 'g6-s2-u5'],
  3: ['g9-s1-u1', 'g9-s1-u2', 'g9-s1-u1', 'g9-s1-u1', 'g9-s1-u1', 'g9-s1-u3', 'g9-s1-u3', 'g9-s1-u2', 'g8-s2-u5', 'g9-s2-u4', 'g9-s2-u4', 'g9-s2-u4', 'g9-s2-u6', 'g9-s2-u6', 'g9-s1-u2', 'g9-s2-u6', 'g9-s2-u6', 'g9-s1-u2', 'g9-s1-u3', 'g8-s2-u5', 'g9-s2-u5', 'g8-s1-u3', 'g9-s2-u6', 'g9-s2-u6', 'g9-s2-u5'],
  4: ['g11-s1-u1', 'g11-s1-u2', 'g11-s1-u3', 'g11-s1-u3', 'g11-s1-u4', 'g11-s1-u5', 'g11-s1-u5', 'g11-s1-u3', 'g11-s1-u4', 'g10-s1-u5', 'g10-s2-u7', 'g10-s2-u8', 'g12-s1-u1', 'g11-s2-u10', 'g11-s1-u6', 'g11-s1-u6', 'g10-s2-u9', 'g12-s1-u1', 'g10-s1-u3', 'g10-s1-u4', 'g10-s1-u3', 'g12-s1-u1', 'g12-s1-u1', 'g12-s1-u2', 'g11-s2-u11']
};
const KNOWLEDGE_TO_UNIT = {
  'be-sentences': 'u2', 'present-questions': 'u3', 'stress-rhythm': 'g7-s1-u3', 'classroom-life-english': 'g3-s1-u3', 'english-around-me': 'g5-s2-u4',
  'past-perfect': 'g9-s1-u1', countability: 'g7-s1-u2', 'festivals-culture': 'g6-s2-u5', 'clarify-politely': 'g6-s1-u3', 'listen-take-notes': 'g9-s2-u5',
  'forms-and-format': 'g5-s2-u5', 'songs-rhymes-gist': 'g5-s2-u6', 'guided-discussion': 'g9-s2-u4', 'relative-clauses': 'g10-s1-u5', 'paragraph-cohesion': 'g10-s2-u9',
  'culture-etiquette-hs': 'g10-s2-u12', 'stories-poems-drama': 'g11-s2-u11', 'notes-letters-forms-hs': 'g12-s1-u4', 'accents-media-listening': 'g12-s2-u9', 'project-planning-hs': 'g12-s2-u12',
  'passive-instructions': 'voc/v1', 'voc-workplace-listening': 'voc/v5', 'voc-intro-picture': 'voc/v5', 'voc-reading-thinking': 'voc/v4', 'voc-global-learning': 'voc/v7',
  'voc-songs-stories-media': 'voc/v7', 'reading-evidence': 'intl/sat', 'argument-assumptions': 'intl/gmat'
};
const GRAMMAR_TO_UNIT = {
  sentence: 'g7-s1-u1', 'be-do': 'u2', nouns: 'g7-s1-u2', pronouns: 'g5-s1-u2', prepositions: 'g7-s2-u6', adjectives: 'g8-s2-u4', 'present-past': 'g6-s1-u2',
  progressive: 'g5-s1-u3', perfect: 'g9-s1-u1', future: 'g6-s2-u7', modals: 'g10-s2-u11', passive: 'g10-s1-u3', infinitives: 'g10-s1-u2', relative: 'g10-s1-u5',
  'noun-clauses': 'g10-s1-u4', connectors: 'g10-s1-u6', conditionals: 'g11-s1-u3', participles: 'g11-s1-u1', agreement: 'g11-s1-u5', technical: 'voc/v3'
};
// themed mnemonic vocabulary (with recorded MP3) for the elementary units
const MNEMONIC_CATEGORIES = {
  'g3-s1-u3': ['學校與教室', '數字與順序'], 'g3-s2-u4': ['顏色與外觀', '學校與文具'], 'g3-s2-u5': ['家庭與身分'], 'g3-s2-u6': ['動物與生態', '動物與寵物'],
  'g4-s1-u2': ['數字與順序', '色彩與數字'], 'g4-s1-u3': ['飲食與餐點', '食物與飲品'], 'g4-s2-u4': ['自然與天氣', '時間與季節'], 'g4-s2-u5': ['時間與曆法', '時間與季節'],
  'g4-s2-u6': ['身體與健康'], 'g5-s2-u4': ['交通與場所', '地方與交通'], 'g6-s1-u1': ['日常動作與作息'], 'g6-s1-u2': ['會考不規則動詞'], 'g6-s1-u3': ['交通與場所'],
  'g6-s1-u4': ['身體與健康'], 'g6-s2-u8': ['常見形容詞'], 'g3-s2-u6x': []
};
const ICONS = [[/字母|Letter/i, '🔤'], [/數字|Number/i, '🔢'], [/顏色|Color/i, '🎨'], [/家人|Family/i, '👪'], [/動物|Animal/i, '🐾'], [/食物|Food/i, '🍎'], [/天氣|Weather/i, '⛅'],
  [/節慶|Festival/i, '🎉'], [/身體|Body/i, '💪'], [/母音|Vowel|拼讀|Phonics|音標/i, '🔊'], [/介紹|Introduc/i, '🙋'], [/進行式|Continuous/i, '🏃'], [/標示|Signs|方位|Direction|地圖/i, '🧭'],
  [/大寫|標點|Punctuation/i, '✍️'], [/故事|Story|繪本/i, '📚'], [/作息|Routine|時間/i, '⏰'], [/過去|Past/i, '📜'], [/城市|Places/i, '🏙️'], [/健康|Health/i, '🩺'],
  [/閱讀|Reading|篇章|Discourse/i, '📖'], [/未來|Future/i, '🚀'], [/比較|Compar/i, '⚖️'], [/句型|句子|Sentence/i, '🧱'], [/名詞|Noun/i, '📦'], [/被動|Passive/i, '🔄'],
  [/關係|Relative|子句|Clause/i, '🔗'], [/假設|Conditional|Subjunctive/i, '💭'], [/倒裝|Inversion/i, '🔃'], [/寫作|Essay|作文/i, '📝'], [/考|Exam|TOEIC|GEPT|模擬/i, '🏆'],
  [/ESP|科技|AI/i, '🤖'], [/永續|Sustainab/i, '🌱'], [/教室|Classroom/i, '🏫'], [/分詞|Participle/i, '🧩'], [/助動詞|Modal/i, '🔑']];
const iconFor = title => (ICONS.find(([re]) => re.test(title)) || [0, '⭐'])[1];
const COLORS = ['green', 'sky', 'violet', 'orange', 'pink', 'teal', 'blue', 'gold', 'indigo'];

// ---------- item factories ----------
function vocabItems(uid, list, ctx) {
  const items = [];
  const zhPool = list.map(v => v.zh), enPool = list.map(v => v.word);
  list.forEach((v, i) => {
    const base = `${uid}.w${i + 1}`, mp3 = v.mp3 || null;
    const zhOpts = distractors(v.zh, [zhPool, ctx.sectionZh], 2, base + 'z', zhRelated);
    const enOpts = distractors(v.word, [enPool, ctx.sectionEn], 2, base + 'e', enRelated);
    if (zhOpts.length === 2) items.push(validChoice({ id: base + 'm', kind: 'word', type: 'choice', prompt: '選出這個字的意思', text: v.word, audio: v.word, mp3, answer: v.zh, options: [v.zh, ...zhOpts], why: `${v.word}${v.ipa ? ' ' + v.ipa : ''}：${v.zh}${v.sentence ? `。例：${v.sentence}` : ''}`, level: 1 }));
    if (enOpts.length === 2) {
      items.push(validChoice({ id: base + 'e', kind: 'word', type: 'choice', prompt: `「${v.zh}」的英文是？`, answer: v.word, options: [v.word, ...enOpts], audioAfter: v.word, why: `${v.zh} → ${v.word}${v.ipa ? ' ' + v.ipa : ''}`, level: 1 }));
      items.push(validChoice({ id: base + 'l', kind: 'word', type: 'listen', prompt: '聽到的是哪個字？', audio: v.word, mp3, answer: v.word, options: [v.word, ...enOpts], why: `你聽到的是 ${v.word}（${v.zh}）。`, level: 2 }));
    }
    const hit = v.sentence && englishSentence(v.sentence) && wordInSentence(v.word, v.sentence);
    if (hit && /^[A-Za-z][A-Za-z' -]*$/.test(v.word)) {
      const blanked = v.sentence.slice(0, hit.index) + '_____' + v.sentence.slice(hit.index + hit.text.length);
      items.push({ id: base + 'c', kind: 'word', type: 'input', prompt: `填入缺少的字（提示：${v.zh}）`, text: blanked, answer: hit.text, alternatives: [v.word], audioAfter: v.sentence, why: `完整句子：${v.sentence}`, level: 3 });
    }
    if (ctx.spell && /^[A-Za-z]{2,12}$/.test(v.word)) items.push({ id: base + 's', kind: 'word', type: 'input', prompt: `聽寫：聽到的英文單字（意思：${v.zh}）`, audio: v.word, mp3, answer: v.word, why: `${v.word} 的拼法：${v.word.split('').join(' ')}`, level: 3, listen: true });
  });
  for (let k = 0; k + 3 < list.length; k += 4) {
    const group = list.slice(k, k + 4);
    if (new Set(group.map(v => normalize(v.zh))).size === 4 && new Set(group.map(v => normalize(v.word))).size === 4)
      items.push({ id: `${uid}.match${k / 4 + 1}`, kind: 'word', type: 'match', prompt: '配對英文與中文', pairs: group.map(v => [v.word, v.zh]), answer: 'match', why: group.map(v => `${v.word}＝${v.zh}`).join('；'), level: 1 });
  }
  return items.filter(Boolean);
}

// where to cut a long line for a partly given build: prefer a sentence end, then a comma,
// nearest to leaving about half (and at most 10 words) for the learner
function splitPoint(en, count) {
  const raw = String(en).normalize('NFKC').split(/\s+/).filter(r => /[A-Za-z0-9]/.test(r));
  const ok = k => k >= 2 && count - k >= 3 && count - k <= 10;
  const target = count - Math.min(10, Math.ceil(count / 2));
  const near = ks => ks.filter(ok).sort((a, b) => Math.abs(a - target) - Math.abs(b - target))[0];
  const after = re => raw.map((r, i) => (re.test(r) ? i + 1 : -1)).filter(k => k > 0 && k < count);
  // without punctuation, cut before a joining word so a phrase like "two blocks" stays whole
  const before = re => raw.map((r, i) => (i > 0 && re.test(r) ? i : -1)).filter(k => k > 0);
  return near(after(/[.!?]["')]?$/)) ?? near(after(/[,;:]["')]?$/)) ?? near(before(/^(and|but|or|so|because|when|if|then|to|at|in|on|for|with|after|before)$/i))
    ?? Math.max(2, count - Math.min(9, Math.ceil(count / 2) + 1));
}
function dialogueItems(uid, lines, ctx) {
  const items = [];
  const usable = lines.filter(l => l.en && l.zh && !CJK.test(l.en) && englishSentence(l.en));
  const zhPool = usable.map(l => l.zh);
  usable.forEach((l, j) => {
    const base = `${uid}.t${j + 1}`;
    const zhOpts = distractors(l.zh, [zhPool, ctx.sectionLineZh], 2, base + 'z', zhRelated);
    if (zhOpts.length === 2) items.push(validChoice({ id: base + 'l', kind: 'talk', type: 'listen', prompt: '聽一聽，這句話是什麼意思？', audio: l.en, answer: l.zh, options: [l.zh, ...zhOpts], why: `${l.speaker ? l.speaker + '：' : ''}${l.en}`, level: 2 }));
    const tk = bankTokens(l.en);
    if (tk.length >= 3 && tk.length <= 10 && tk.every(isWordToken)) {
      const answerSet = new Set(tk.map(t => t.toLowerCase()));
      const extra = distractors('', [ctx.sectionTokens], 3, base + 'b', (a, b) => answerSet.has(String(b).toLowerCase())).filter(isWordToken);
      if (extra.length >= 2) items.push({ id: base + 'b', kind: 'talk', type: 'build', prompt: `用英文說：「${l.zh}」`, answer: tk.join(' '), words: [...tk, ...extra], audioAfter: l.en, why: `${l.en}${l.note ? '｜' + short(l.note, 80) : ''}`, level: 3 });
    } else if (tk.length > 10 && tk.length <= 20 && tk.every(isWordToken)) {
      // long line: the first part is given, the learner arranges the rest (3–10 words)
      const k = splitPoint(l.en, tk.length);
      const rest = tk.slice(k), restSet = new Set(rest.map(t => t.toLowerCase()));
      const extra = distractors('', [ctx.sectionTokens], 3, base + 'B', (a, b) => restSet.has(String(b).toLowerCase())).filter(isWordToken);
      // the given part is shown, not chosen, so it keeps its original capitals and punctuation
      if (k >= 2 && rest.length >= 3 && rest.length <= 10 && extra.length >= 2) items.push({ id: base + 'B', kind: 'talk', type: 'build', prompt: `用英文說：「${l.zh}」`, given: String(l.en).normalize('NFKC').replace(/[’‘]/g, "'").split(/\s+/).filter(r => /[A-Za-z0-9]/.test(r)).slice(0, k).join(' '), answer: rest.join(' '), words: [...rest, ...extra], audioAfter: l.en, why: `${l.en}${l.note ? '｜' + short(l.note, 80) : ''}`, level: 3 });
    }
    // only a reply to a question has one clearly natural next line; distractors are statements of similar length
    if (j > 0 && isQuestion(usable[j - 1].en) && !isQuestion(l.en)) {
      const prev = usable[j - 1], len = tokens(l.en).length;
      const others = distractors(l.en, [ctx.sectionLines.filter(x => !usable.some(u => u.en === x))], 2, base + 'n',
        (a, b) => tokens(b).length < 4 || isQuestion(b) || Math.abs(tokens(b).length - len) > Math.max(4, len) || GENERIC_REPLY.test(b) || normalize(b).split(' ')[0] === normalize(l.en).split(' ')[0]);
      if (others.length === 2) items.push(validChoice({ id: base + 'n', kind: 'talk', type: 'choice', prompt: '接下來最自然的回應是？', text: `${prev.speaker ? prev.speaker + '：' : ''}${prev.en}`, textZh: prev.zh, audio: prev.en, answer: l.en, options: [l.en, ...others], why: `${l.speaker ? l.speaker + '：' : ''}${l.en}（${l.zh}）`, level: 2 }));
    }
  });
  return items.filter(Boolean);
}

function phraseItems(uid, phrases, ctx) {
  const items = [];
  const list = (phrases || []).filter(p => p.phrase && p.def && !CJK.test(p.phrase));
  list.forEach((p, i) => {
    const base = `${uid}.p${i + 1}`;
    const opts = distractors(p.phrase, [list.map(x => x.phrase), ctx.sectionPhrases], 2, base, enRelated);
    if (opts.length === 2) items.push(validChoice({ id: base + 'e', kind: 'talk', type: 'choice', prompt: `「${p.def}」的英文說法是？`, answer: p.phrase, options: [p.phrase, ...opts], audioAfter: p.example, why: `${p.phrase}：${p.def}。例：${p.example}`, level: 2 }));
    const hit = p.example && !/[\/+]|\.\.\.|…|\b(sb|sth|V|N)\b/.test(p.phrase) && wordInSentence(p.phrase, p.example);
    if (hit) items.push({ id: base + 'c', kind: 'talk', type: 'input', prompt: `填入片語（提示：${p.def}）`, text: p.example.slice(0, hit.index) + '_____' + p.example.slice(hit.index + hit.text.length), answer: hit.text, alternatives: [p.phrase], audioAfter: p.example, why: `完整句子：${p.example}`, level: 3 });
  });
  return items.filter(Boolean);
}

function grammarItems(uid, u) {
  const items = [];
  (u.concepts || []).forEach((c, i) => {
    if (c.title && (c.formula || c.explanation)) items.push({ id: `${uid}.tip${i + 1}`, kind: 'grammar', type: 'info', title: c.title, formula: c.formula || '', body: short(c.explanation, 260), example: c.example || '' });
    const x = c.examExample;
    if (x?.options && Number.isInteger(x.answer)) items.push(validChoice({ id: `${uid}.x${i + 1}`, kind: 'grammar', type: 'choice', prompt: x.stem, answer: x.options[x.answer], options: x.options, hint: c.formula ? short(c.formula, 120) : '', why: x.analysis, level: 2 }));
  });
  (u.formativeQuiz || []).forEach((q, i) => {
    if (q?.options && Number.isInteger(q.ans)) items.push(validChoice({ id: `${uid}.q${i + 1}`, kind: 'grammar', type: 'choice', prompt: q.q, answer: q.options[q.ans], options: q.options, hint: [q.hint1, q.hint2].filter(Boolean).join(' '), why: q.solution, level: 3 }));
  });
  (u.traps || []).forEach((t, i) => {
    const right = clean(t.correct), wrong = clean(t.wrong), id = `${uid}.trap${i + 1}`;
    if (!englishSentence(right) || !englishSentence(wrong) || normalize(right) === normalize(wrong)) { reject(id, 'trap is not a pair of English sentences'); return; }
    items.push(validChoice({ id, kind: 'grammar', type: 'choice', prompt: '哪一句是正確的？', answer: right, options: [right, wrong], why: t.reason, level: 2 }));
  });
  return items.filter(Boolean);
}

function knowledgeItems(id) {
  const p = knowledge.get(id); if (!p) return [];
  const items = [{ id: `k.${id}.tip`, kind: 'grammar', type: 'info', title: p.title, formula: p.goal, body: short(p.rule, 260), example: (p.pairs || []).slice(0, 2).map(x => x[0]).join(' / '), src: `#knowledge/${id}` }];
  (p.questions || []).forEach(([stem, options, ans, why], i) => items.push(validChoice({ id: `k.${id}.${i + 1}`, kind: 'grammar', type: 'choice', prompt: stem, options, answer: options[ans], why, hint: short(p.rule, 100), level: 3, src: `#knowledge/${id}` })));
  return items.filter(Boolean);
}
function grammarTopicItems(id) {
  const t = grammar.get(id); if (!t) return [];
  return [validChoice({ id: `gr.${id}`, kind: 'grammar', type: 'choice', prompt: t.question, options: t.options, answer: t.options[t.answer], why: t.explanation, hint: short(t.rule, 100), level: 3, src: `#grammar/${id}` })].filter(Boolean);
}
function readingItems(uid, reading, ctx) {
  if (!reading?.text || !englishSentence(reading.text)) return [];
  return (reading.questions || []).map((q, i) => {
    if (!q.q || !q.ans) return null;
    const own = reading.questions.filter(x => x !== q).map(x => x.ans);
    const opts = distractors(q.ans, [own, ctx.sectionReadAnswers], 2, `${uid}.r${i + 1}`, enRelated);
    if (opts.length < 2) return reject(`${uid}.r${i + 1}`, 'not enough reading distractors');
    return validChoice({ id: `${uid}.r${i + 1}`, kind: 'drill', type: 'choice', passage: reading.text, passageTitle: reading.title, prompt: q.q, answer: q.ans, options: [q.ans, ...opts], hint: reading.strategy, why: `文章依據：${q.ans}`, level: 3 });
  }).filter(Boolean);
}
for (const u of microUnits.values()) for (const l of u.dialogue || []) learnNames(l.en || '');
for (const c of chapters.values()) for (const l of c.dialogue || []) learnNames(l.text || '');
for (const d of ALL_COMMUTE_DIALOGUES) for (const l of d.lines) learnNames(l.en || '');
const diagSubtopics = {};
for (const q of diagBank) ((diagSubtopics[q.tier] ||= {})[q.subtopic] ||= []).push(q);
function diagItem(q) {
  const opts = q.options;
  const why = [q.coreConcept, String(q.trapExplanation || '').replace(/^【[^】]*】/, '')].filter(Boolean).join(' ');
  const zh = String(q.translation || '').split('\n')[0].replace(/^【[^】]*】/, '').trim();
  return validChoice({ id: `d.${q.id}`, kind: 'drill', type: 'choice', passage: q.passage || '', prompt: q.prompt, options: opts, answer: opts[q.answer], hint: q.tier <= 4 && zh && q.dimension !== '單字語意' ? `題意：${zh}` : `這題考：${q.subtopic.replace(/\s*[（(][^)）]*[)）]/g, '')}`, why: short(why, 420), level: Math.min(5, Math.max(1, q.difficulty || 2)), topic: q.subtopic });
}

// ---------- assemble units ----------
const items = {}; const report = { sections: [], branches: [], stories: 0, items: 0, byType: {}, excluded };
// editorial decisions (data/quest-review/*.json) are applied here, so a rebuild never loses them:
// excluded items are dropped, patched fields are merged and the item must still pass the checks
const review = { exclude: {}, patch: {}, reviewed: {} };
for (const f of fs.existsSync('data/quest-review') ? fs.readdirSync('data/quest-review').filter(f => f.endsWith('.json')).sort() : []) {
  const r = read('data/quest-review/' + f);
  Object.assign(review.exclude, r.exclude || {}); Object.assign(review.patch, r.patch || {}); Object.assign(review.reviewed, r.reviewed || {});
}
const reviewUsed = new Set();
function applyReview(it) {
  if (review.exclude[it.id]) { reviewUsed.add(it.id); excluded.push({ id: it.id, reason: 'editorial: ' + review.exclude[it.id] }); return null; }
  const p = review.patch[it.id]; if (!p) return it;
  reviewUsed.add(it.id);
  const out = cleanItem({ ...it, ...p.set });
  if ((out.type === 'choice' || out.type === 'listen') && !validChoice(out)) throw new Error('editorial patch breaks ' + it.id);
  if (out.type === 'build') { const bank = out.words.map(w => normalize(w)); for (const t of normalize(out.answer).split(' ')) if (!bank.includes(t)) throw new Error(`editorial patch: build ${it.id} lacks token ${t}`); }
  return out;
}
// explanations: options are shuffled and shown without letters, so "正確答案為 (B)" / "故選 B" would point at the wrong
// option; some source notes are production notes about speech synthesis that learners should not see
const PRODUCTION_NOTE = /合成語音|斜線音標|字典音標|一般文字朗讀|孤立音素|用數位重述/;
export function cleanText(s) {
  if (!s) return s;
  return String(s).split('｜').map(part => part.split(/(?<=[。；])/).filter(seg => !PRODUCTION_NOTE.test(seg)).join('')).filter(p => p.trim()).join('｜')
    .replace(/正確答案為\s*[（(][A-D][)）]\s*/g, '正確答案為')
    .replace(/\s*[，,]?\s*故選\s*[（(]?[A-D][)）]?\s*[。.]?/g, '。')
    .replace(/選\s*[（(][A-D][)）]/g, '選')
    .replace(/選項\s*[（(][A-D][)）]\s*/g, '選項 ')
    .replace(/\s*[（(][A-D][)）](?=\s*[。.，,]|$)/g, '')
    .replace(/[。.]\s*。/g, '。').trim();
}
const cleanItem = it => ({ ...it, ...(it.why ? { why: cleanText(it.why) } : {}), ...(it.hint ? { hint: cleanText(it.hint) } : {}) });
function addItems(list, src) {
  const ids = [];
  for (const raw of list) { if (!raw) continue; const it = applyReview(cleanItem(raw)); if (!it) continue; it.src ||= src; if (items[it.id]) throw new Error('duplicate item id ' + it.id); items[it.id] = it; ids.push(it.id); }
  return ids;
}

function sectionContext(unitIds) {
  const ctx = { sectionZh: [], sectionEn: [], sectionLineZh: [], sectionLines: [], sectionTokens: [], sectionPhrases: [], sectionReadAnswers: [] };
  for (const id of unitIds) {
    const u = microUnits.get(id) || chapters.get(id);
    if (!u) continue;
    for (const v of [...(u.phonicsVocab || []), ...(u.vocab || [])]) { ctx.sectionZh.push(v.zh || v.def); ctx.sectionEn.push(v.word); }
    for (const l of u.dialogue || []) { const en = l.en || l.text; if (!en || CJK.test(en)) continue; ctx.sectionLines.push(en); ctx.sectionLineZh.push(l.zh); ctx.sectionTokens.push(...tokens(en).filter(isWordToken)); }
    for (const p of u.phrases || []) ctx.sectionPhrases.push(p.phrase);
    for (const q of u.reading?.questions || []) ctx.sectionReadAnswers.push(q.ans);
  }
  const cap = t => t[0].toUpperCase() + t.slice(1);
  ctx.sectionTokens = [...new Set(ctx.sectionTokens.map(t => t.toLowerCase()))].filter(t => t.length > 2)
    .map(t => /^i'/.test(t) ? 'I' + t.slice(1) : NAMES.has(cap(t)) ? cap(t) : t);
  return ctx;
}
// game-only gloss corrections for the mnemonic card data (the cards themselves are edited in their own workflow)
const GLOSS_FIX = { meal: '一餐；餐點' };
function mnemonicVocab(uid, existing) {
  const cats = MNEMONIC_CATEGORIES[uid]; if (!cats) return [];
  const have = new Set(existing.map(v => v.word.toLowerCase()));
  return mnemonicCards.filter(c => cats.includes(c.category) && c.tier === 'elem_1000' && /^[A-Za-z]+$/.test(c.word) && !have.has(c.word.toLowerCase()) && fileExists(`dist/mnemonics/audio/${c.word}.mp3`))
    .slice(0, 6).map(c => ({ word: c.word, zh: GLOSS_FIX[c.word] || c.zh, sentence: c.example, mp3: `../mnemonics/audio/${encodeURIComponent(c.word)}.mp3`, icon: c.icon }));
}

function buildNodes(uid, pools, minSize = 4) {
  // merge thin pools forward so every node has enough scorable steps
  const order = [['word', '字詞', '🔤'], ['talk', '會話', '💬'], ['grammar', '觀念', '📐'], ['drill', '精熟', '🎯']];
  const scorable = ids => ids.filter(id => items[id].type !== 'info').length;
  const nodes = []; let carry = [];
  order.forEach(([kind, title, icon], i) => {
    const ids = [...carry, ...(pools[kind] || [])]; carry = [];
    if (scorable(ids) >= minSize || (i === order.length - 1 && scorable(ids) > 0 && !nodes.length)) nodes.push({ id: `${uid}:${kind}`, kind, title, icon, pool: ids });
    else if (i === order.length - 1 && nodes.length) nodes.at(-1).pool.push(...ids);
    else carry = ids;
  });
  const all = nodes.flatMap(n => n.pool).filter(id => items[id].type !== 'info');
  if (all.length >= 6) nodes.push({ id: `${uid}:boss`, kind: 'boss', title: '單元挑戰', icon: '🏆', pool: all });
  return nodes;
}

function microUnit(uid, ctx, spell) {
  const u = microUnits.get(uid); const title = splitTitle(u.title); const src = `#unit/${uid}`;
  const vocab = [...(u.phonicsVocab || []).map(v => ({ word: String(v.word).trim(), zh: v.zh, ipa: v.ipa, sentence: v.sentence })), ...mnemonicVocab(uid, u.phonicsVocab || [])].filter(v => v.word && v.zh && !CJK.test(v.word));
  const pools = { word: addItems(vocabItems(uid, vocab, { ...ctx, spell }), src), talk: addItems(dialogueItems(uid, u.dialogue || [], ctx), src), grammar: addItems(grammarItems(uid, u), src), drill: addItems(readingItems(uid, u.reading, ctx), src) };
  const guide = { goal: u.guideline, motivation: u.motivation, tips: (u.concepts || []).map(c => ({ title: c.title, formula: c.formula, body: c.explanation, example: c.example })), traps: (u.traps || []).map(t => ({ wrong: clean(t.wrong), correct: clean(t.correct), reason: t.reason })), words: vocab.map(v => ({ word: v.word, zh: v.zh, ipa: v.ipa || '', mp3: v.mp3 || '' })), dialogue: (u.dialogue || []).map(l => ({ speaker: l.speaker, en: l.en, zh: l.zh })), checklist: u.checklist || [], level: u.cefr, extra: [] };
  return { id: uid, title: title.zh, en: title.en, icon: iconFor(u.title), src, pools, guide };
}
function chapterUnit(key, ctx) {
  const c = chapters.get(key); const uid = 'c-' + key.replace('/', '-'); const src = `#chapter/${key}`;
  const vocab = (c.vocab || []).map(v => ({ word: String(v.word).trim(), zh: v.def, ipa: v.ipa, sentence: v.example })).filter(v => v.word && v.zh && !CJK.test(v.word));
  const lines = (c.dialogue || []).map(l => ({ speaker: l.speaker, en: l.text, zh: l.zh, note: l.note }));
  const tips = (c.concepts || []).map((x, i) => ({ id: `${uid}.tip${i + 1}`, kind: 'grammar', type: 'info', title: x.heading, formula: '', body: short(x.body, 300), example: short(x.tip, 160) }));
  const pools = { word: addItems(vocabItems(uid, vocab, ctx), src), talk: addItems([...phraseItems(uid, c.phrases, ctx), ...dialogueItems(uid, lines, ctx)], src), grammar: addItems(tips, src), drill: [] };
  const guide = { goal: c.learningPerformance || c.subtitle, motivation: c.guideline, tips: (c.concepts || []).map(x => ({ title: x.heading, formula: '', body: x.body, example: x.tip })), traps: [], words: vocab.map(v => ({ word: v.word, zh: v.zh, ipa: v.ipa || '' })), phrases: (c.phrases || []).map(p => ({ phrase: p.phrase, def: p.def, example: p.example })), dialogue: lines.map(l => ({ speaker: l.speaker, en: l.en, zh: l.zh })), checklist: [], level: c.cefr, extra: [] };
  return { id: uid, title: c.title, en: c.subtitle || '', icon: iconFor(c.title + ' ' + (c.subtitle || '')), src, pools, guide, chapterKey: key };
}
function pilotUnit(pu) {
  const qs = pilotQuests.filter(q => q.unitId === pu.id);
  const conv = it => ({ ...it, kind: it.type === 'build' ? 'talk' : it.type === 'listen' ? 'talk' : 'grammar', why: it.why, words: it.words ? [...it.words] : undefined, alternatives: it.alternatives?.length ? it.alternatives : undefined, level: it.type === 'choice' ? 1 : 2, audioAfter: it.type === 'build' ? it.answer : undefined });
  const nodes = qs.map((q, i) => {
    const ids = addItems(q.items.map(conv), pu.source);
    return { id: `${pu.id}:q${i + 1}`, kind: q.challenge ? 'boss' : 'lesson', title: q.title, icon: q.challenge ? '🏆' : ['🌱', '👂', '🗣️'][i] || '⭐', goal: q.goal, pool: ids };
  });
  const reviewIds = addItems(pilotReviews[pu.id].map(conv), pu.source);
  nodes.at(-1).pool.push(...reviewIds);
  // the hand-written units also get their mapped question-bank drills, as a mastery node before the challenge
  if (drillByUnit[pu.id]?.length) {
    const ids = addItems(drillByUnit[pu.id], pu.source);
    nodes.splice(nodes.length - 1, 0, { id: `${pu.id}:drill`, kind: 'drill', title: '精熟練習', icon: '🎯', goal: '用分層題庫再練一次本單元的句型。', pool: ids });
    nodes.at(-1).pool.push(...ids);
  }
  const guide = { goal: pu.goal, motivation: '', tips: [{ title: '本單元重點', formula: pu.example, body: pu.tip, example: pu.transfer }], traps: [], words: [], dialogue: [], checklist: [], level: pu.stage, extra: [] };
  return { id: pu.id, title: pu.title, en: '', icon: { u1: '👋', u2: '🙋', u3: '📅' }[pu.id], src: pu.source, nodesOverride: nodes, guide };
}

function attachExtras(unit) {
  const key = unit.chapterKey || unit.id;
  for (const [kid, target] of Object.entries(KNOWLEDGE_TO_UNIT)) if (target === key) {
    const ids = addItems(knowledgeItems(kid), `#knowledge/${kid}`); (unit.pools ? unit.pools.grammar : unit.nodesOverride.at(-2).pool).push(...ids);
    const p = knowledge.get(kid); unit.guide.extra.push({ title: p.title, src: `#knowledge/${kid}`, rule: p.rule, pairs: p.pairs, trap: p.trap, model: p.model });
  }
  for (const [gid, target] of Object.entries(GRAMMAR_TO_UNIT)) if (target === key) {
    const ids = addItems(grammarTopicItems(gid), `#grammar/${gid}`); (unit.pools ? unit.pools.grammar : unit.nodesOverride.at(-2).pool).push(...ids);
    const t = grammar.get(gid); unit.guide.extra.push({ title: t.title, src: `#grammar/${gid}`, rule: t.rule, flow: t.flow, table: { headers: t.headers, rows: t.rows }, trap: t.trap });
  }
}

// diagnostic drills for main-path units (tiers 1–4)
const drillByUnit = {};
for (const tier of [1, 2, 3, 4]) {
  const names = Object.keys(diagSubtopics[tier]);
  if (names.length !== DIAG_TO_UNIT[tier].length) throw new Error(`tier ${tier} has ${names.length} subtopics, mapping has ${DIAG_TO_UNIT[tier].length}`);
  names.forEach((name, i) => (drillByUnit[DIAG_TO_UNIT[tier][i]] ||= []).push(...diagSubtopics[tier][name].map(diagItem).filter(Boolean)));
}

// ---------- stories ----------
const PRE_A1_STORIES = [
  {
    id: 'story-prea1-01',
    stage: 'featured',
    topicTag: '👋 認識新朋友',
    level: 'Pre-A1 (起步)',
    title: '學校走廊遇見新朋友：打招呼與說名字',
    scenario: '在學校走廊遇見新同學，彼此親切打招呼、說出自己的名字並表達高興認識對方。',
    keyPatterns: [
      'What is your name?（你叫什麼名字？）',
      'Nice to meet you, too.（我也很高興認識你。）'
    ],
    lines: [
      { speaker: 'Amy', en: 'Hello! I am Amy. What is your name?', zh: '哈囉！我是 Amy。你叫什麼名字？', note: '打招呼用 Hello 或 Hi；問名字用 What is your name?' },
      { speaker: 'Ben', en: 'Hi, Amy! My name is Ben.', zh: '嗨，Amy！我的名字是 Ben。', note: '回答名字可用 My name is... 或 I am...' },
      { speaker: 'Amy', en: 'Nice to meet you, Ben.', zh: '很高興認識你，Ben。', note: '初次見面說 Nice to meet you。' },
      { speaker: 'Ben', en: 'Nice to meet you, too!', zh: '我也很高興認識你！', note: '回應加上 too 表示「也」。' }
    ]
  },
  {
    id: 'story-prea1-02',
    stage: 'featured',
    topicTag: '🏫 教室早晨',
    level: 'Pre-A1 (起步)',
    title: '早晨的第一堂英文課：聽懂指令與數一數',
    scenario: '英文課開始了，老師引導大家坐好，並請同學數一數書桌上有幾本書。',
    keyPatterns: [
      'Good morning, class! Sit down, please.（同學早安！請坐下。）',
      'How many books do you have?（你有幾本書？）'
    ],
    lines: [
      { speaker: 'Teacher', en: 'Good morning, class. Sit down, please.', zh: '同學早安。請坐下。', note: 'Sit down, please 是有禮貌的請坐下。' },
      { speaker: 'Class', en: 'Good morning, Mr. Chen. Thank you!', zh: '陳老師早安。謝謝您！', note: '見面道早安用 Good morning。' },
      { speaker: 'Teacher', en: 'How many books do you have, Leo?', zh: 'Leo，你有幾本書？', note: '問數量用 How many + 複數名詞。' },
      { speaker: 'Leo', en: 'I have two books on my desk.', zh: '我的桌上有兩本書。', note: '數量大於一，book 要加 s。' }
    ]
  },
  {
    id: 'story-prea1-03',
    stage: 'featured',
    topicTag: '🎨 彩色鉛筆盒',
    level: 'Pre-A1 (起步)',
    title: '鉛筆盒裡的驚喜：問顏色與分享文具',
    scenario: '畫畫課上，兩位同學互相借看漂亮的文具，用英文問出顏色並稱讚彼此。',
    keyPatterns: [
      'What color is it?（它是什麼顏色？）',
      'It is orange. I also have a blue pen.（它是橘色的。我還有一支藍色筆。）'
    ],
    lines: [
      { speaker: 'Ken', en: 'What is this in your hand?', zh: '你手裡的這個是什麼？', note: 'What is this 問這是什麼。' },
      { speaker: 'Lily', en: 'It is a new crayon.', zh: '是一支新蠟筆。', note: 'It is a/an 介紹物品。' },
      { speaker: 'Ken', en: 'What color is it?', zh: '它是什麼顏色？', note: '問顏色用 What color is it?' },
      { speaker: 'Lily', en: 'It is orange. I also have a blue pen!', zh: '它是橘色的。我還有一支藍色的筆！', note: '顏色放名詞前：a blue pen。' }
    ]
  }
];
for (const d of PRE_A1_STORIES) for (const l of d.lines) learnNames(l.en || '');

const LEVEL_RANK = { 'Pre-A1': 0, A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 5 };
const featured = [...PRE_A1_STORIES, ...ALL_COMMUTE_DIALOGUES.filter(d => d.stage === 'featured')];
const storyLevel = d => (d.level.match(/Pre-A1|A1|A2|B1|B2|C1|C2/) || ['B1'])[0];
const STORY_SECTIONS = { 'Pre-A1': ['s1'], A1: ['s2', 's3'], A2: ['s4', 's5'], B1: ['s6', 's7'], B2: ['s8'], C1: ['s9'], C2: ['s9'] };
const stories = {}; const storyBySection = {};
const allStoryLines = featured.flatMap(d => d.lines.map(l => l.en));
for (const d of [...featured].sort((a, b) => LEVEL_RANK[storyLevel(a)] - LEVEL_RANK[storyLevel(b)] || a.id.localeCompare(b.id))) {
  const lv = storyLevel(d); const secs = STORY_SECTIONS[lv];
  const sec = secs.reduce((best, s) => ((storyBySection[s]?.length || 0) < (storyBySection[best]?.length || 0) ? s : best), secs[0]);
  (storyBySection[sec] ||= []).push(d.id);
  const lines = d.lines.filter(l => l.en && l.zh && !CJK.test(l.en)).map(l => ({ ...l, note: cleanText(l.note) }));
  const steps = []; const zhPool = lines.map(l => l.zh);
  lines.forEach((l, j) => {
    const base = `st.${d.id}.${j + 1}`;
    if (j >= 1 && isQuestion(lines[j - 1].en) && !isQuestion(l.en)) { // predict the reply before it is revealed
      const sameLevel = featured.filter(x => x.id !== d.id && storyLevel(x) === lv).flatMap(x => x.lines.map(y => y.en)), len = tokens(l.en).length;
      const minTokens = lv === 'Pre-A1' ? 2 : 4;
      const others = distractors(l.en, [sameLevel, allStoryLines], 2, base + 'n', (a, b) => tokens(b).length < minTokens || isQuestion(b) || Math.abs(tokens(b).length - len) > Math.max(minTokens, len) || GENERIC_REPLY.test(b));
      if (others.length === 2) steps.push(validChoice({ id: base + 'n', kind: 'story', type: 'choice', prompt: `${l.speaker} 接下來最可能說什麼？`, answer: l.en, options: [l.en, ...others], why: `${l.en}（${l.zh}）`, level: 3 }));
    }
    steps.push({ id: base, kind: 'story', type: 'line', speaker: l.speaker, en: l.en, zh: l.zh, note: short(l.note, 120) });
    if (j === 0 || j % 2 === 1) {
      const opts = distractors(l.zh, [zhPool], 2, base + 'm', zhRelated);
      if (opts.length === 2) steps.push(validChoice({ id: base + 'm', kind: 'story', type: 'choice', prompt: '剛剛這句是什麼意思？', text: l.en, answer: l.zh, options: [l.zh, ...opts], why: l.note ? short(l.note, 160) : `${l.en} → ${l.zh}`, level: 2 }));
    }
  });
  const pattern = lines.map(l => l.en).find(en => { const t = bankTokens(en); return t.length >= 4 && t.length <= 10 && t.every(isWordToken); });
  if (pattern) {
    const tk = bankTokens(pattern); const set = new Set(tk.map(t => t.toLowerCase()));
    // distractor words come from stories of the same level first, then neighbouring levels, so beginners do not meet words like "salaries"
    const wordsAt = keep => [...new Set(featured.filter(x => x.id !== d.id && keep(LEVEL_RANK[storyLevel(x)])).flatMap(x => x.lines.flatMap(y => tokens(y.en))).filter(isWordToken).map(t => t.toLowerCase()))];
    const rank = LEVEL_RANK[lv];
    const extra = distractors('', [wordsAt(r => r === rank), wordsAt(r => Math.abs(r - rank) === 1)], 3, d.id + 'b', (a, b) => set.has(b) || b.length < 3);
    steps.push({ id: `st.${d.id}.build`, kind: 'story', type: 'build', prompt: `重組故事中的關鍵句：「${lines.find(l => l.en === pattern).zh}」`, answer: tk.join(' '), words: [...tk, ...extra], audioAfter: pattern, why: pattern, level: 3 });
  }
  stories[d.id] = { id: d.id, title: d.title.replace(/：.*$/, ''), full: d.title, scenario: d.scenario, level: d.level, cefr: lv, topic: d.topicTag, section: sec, steps: steps.filter(Boolean), patterns: d.keyPatterns || [] };
}

// ---------- sections & branches ----------
const sectionFiles = {}; const index = { version: COURSE_VERSION, sections: [], branches: [], stories: [] };
function finalizeUnit(unit, sectionId, colorIndex) {
  attachExtras(unit);
  if (unit.pools && drillByUnit[unit.id]) unit.pools.drill.push(...addItems(drillByUnit[unit.id], unit.src));
  const nodes = unit.nodesOverride || buildNodes(unit.id, unit.pools);
  const meta = { id: unit.id, title: unit.title, en: unit.en, icon: unit.icon, color: COLORS[colorIndex % COLORS.length], src: unit.src, level: unit.guide.level, nodes: nodes.map(n => ({ id: n.id, kind: n.kind, title: n.title, icon: n.icon, size: Math.min(n.kind === 'boss' ? 12 : 10, n.pool.filter(id => items[id].type !== 'info').length) })) };
  return { meta, data: { guide: unit.guide, nodes: Object.fromEntries(nodes.map(n => [n.id, n.pool])) } };
}

for (const [si, sec] of SECTIONS.entries()) {
  const ctx = sectionContext(sec.units);
  const file = { id: sec.id, version: COURSE_VERSION, units: {}, items: {} };
  const before = new Set(Object.keys(items));
  const metas = sec.units.map((uid, ui) => {
    const pu = pilotUnits.find(p => p.id === uid);
    const unit = pu ? pilotUnit(pu) : microUnit(uid, ctx, si < 4);
    if (!routes.has(unit.src)) throw new Error('unknown source route ' + unit.src);
    const { meta, data } = finalizeUnit(unit, sec.id, si * 3 + ui);
    file.units[uid] = data; return meta;
  });
  const storyIds = storyBySection[sec.id] || [];
  metas.forEach((m, i) => { if (i % 2 === 1 && storyIds[(i - 1) / 2]) m.story = storyIds[(i - 1) / 2]; });
  for (const id of Object.keys(items)) if (!before.has(id)) file.items[id] = items[id];
  sectionFiles[sec.id] = file;
  index.sections.push({ id: sec.id, no: si + 1, title: sec.title, level: sec.level, color: sec.color, units: metas, extraStories: storyIds.slice(Math.floor(metas.length / 2)) });
  report.sections.push({ id: sec.id, units: metas.length, nodes: metas.reduce((n, m) => n + m.nodes.length, 0), items: Object.keys(file.items).length, stories: storyIds.length });
}

for (const br of BRANCHES) {
  const ctx = sectionContext(br.chapters);
  const file = { id: br.id, version: COURSE_VERSION, units: {}, items: {} };
  const before = new Set(Object.keys(items));
  const metas = br.chapters.map((key, i) => { const unit = chapterUnit(key, ctx); if (!routes.has(unit.src)) throw new Error('unknown route ' + unit.src); const { meta, data } = finalizeUnit(unit, br.id, i); file.units[unit.id] = data; return meta; });
  if (br.tier) {
    const names = Object.keys(diagSubtopics[br.tier]);
    for (let g = 0; g < names.length; g += 5) {
      const uid = `${br.id}-u${g / 5 + 1}`; const group = names.slice(g, g + 5);
      const nodes = group.map((name, k) => ({ id: `${uid}:d${k + 1}`, kind: 'drill', title: short(name.replace(/\s*\(.*\)$/, ''), 28), icon: '🎯', pool: addItems(diagSubtopics[br.tier][name].map(diagItem), `#chapter/${br.chapters[0]}`) }));
      nodes.push({ id: `${uid}:boss`, kind: 'boss', title: '單元挑戰', icon: '🏆', pool: nodes.flatMap(n => n.pool) });
      file.units[uid] = { guide: { goal: `${br.title}：${group.map(n => n.replace(/\s*\(.*\)$/, '')).join('、')}`, motivation: '題目為站內原創練習，不是官方試題；分數不能換算正式成績。', tips: [], traps: [], words: [], dialogue: [], checklist: [], level: br.level, extra: [] }, nodes: Object.fromEntries(nodes.map(n => [n.id, n.pool])) };
      metas.push({ id: uid, title: `${br.title} 題型 ${g / 5 + 1}`, en: group[0], icon: br.icon, color: COLORS[(metas.length) % COLORS.length], src: `#chapter/${br.chapters[0]}`, level: br.level, nodes: nodes.map(n => ({ id: n.id, kind: n.kind, title: n.title, icon: n.icon, size: Math.min(n.kind === 'boss' ? 12 : 10, n.pool.length) })) });
    }
  }
  for (const id of Object.keys(items)) if (!before.has(id)) file.items[id] = items[id];
  sectionFiles[br.id] = file;
  index.branches.push({ id: br.id, title: br.title, icon: br.icon, level: br.level, color: br.color, units: metas });
  report.branches.push({ id: br.id, units: metas.length, items: Object.keys(file.items).length });
}
index.stories = Object.values(stories).map(s => ({ id: s.id, title: s.title, level: s.level, cefr: s.cefr, topic: s.topic, section: s.section, steps: s.steps.length }));

// ---------- vocabulary drills (practice hub) ----------
const vocabSets = [];
const byCat = {};
for (const c of mnemonicCards) if (/^[A-Za-z][A-Za-z' -]*$/.test(c.word) && c.zh && fileExists(`dist/mnemonics/audio/${c.word}.mp3`)) (byCat[c.category] ||= []).push(c);
for (const [cat, cards] of Object.entries(byCat)) {
  if (cards.length < 4) continue;
  for (let k = 0; k < cards.length; k += 8) {
    let group = cards.slice(k, k + 8); if (group.length < 4) group = cards.slice(-Math.min(8, cards.length));
    const sid = `v.${hash(cat).toString(36)}.${k / 8 + 1}`;
    // the practice hub builds exercises from these words at runtime, which keeps this file small
    vocabSets.push({ id: sid, title: `${cat} ${k / 8 + 1}`, category: cat, icon: group[0].icon || '🔤', words: group.map(c => ({ w: c.word, zh: GLOSS_FIX[c.word] || c.zh, ex: c.example, exZh: c.exampleZh, ic: c.icon })) });
  }
}

// ---------- placement: items drawn from section pools, ordered by section ----------
const placement = ['s1', 's2', 's4', 's5', 's7', 's9'].map(sid => {
  const f = sectionFiles[sid];
  const ids = Object.values(f.items).filter(it => it.type === 'choice' && (it.kind === 'grammar' || it.kind === 'drill') && !it.passage).map(i => i.id);
  return { section: sid, items: pick(ids, 3, 'placement-' + sid) };
});
index.placement = placement;
index.reviewed = review.reviewed;
index.vocabSets = vocabSets.map(s => ({ id: s.id, title: s.title, category: s.category, icon: s.icon, size: s.words.length }));

// ---------- write ----------
// overwrite in place and remove only stale files: deleting the whole folder fails while OneDrive is syncing it
fs.mkdirSync(OUT, { recursive: true });
const written = new Set();
const pause = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function write(name, data) { // OneDrive briefly locks files it is uploading; retry for a few seconds
  for (let attempt = 0; ; attempt++) {
    try { fs.writeFileSync(path.join(OUT, name), JSON.stringify(data)); written.add(name); return; }
    catch (e) { if (!['EBUSY', 'EPERM'].includes(e.code) || attempt >= 20) throw e; pause(500); }
  }
}
for (const [id, f] of Object.entries(sectionFiles)) write(`${id}.json`, f);
write('stories.json', { version: COURSE_VERSION, stories });
write('vocab.json', { version: COURSE_VERSION, sets: vocabSets });
write('index.json', index);
// only after every file is written: drop course files that this build no longer produces
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.json') && !written.has(f)) fs.unlinkSync(path.join(OUT, f));
report.stories = Object.keys(stories).length;
report.storySections = Object.fromEntries(Object.entries(storyBySection).map(([k, v]) => [k, v.length]));
report.vocabSets = vocabSets.length;
report.vocabWords = vocabSets.reduce((n, s) => n + s.words.length, 0);
report.items = Object.keys(items).length;
for (const it of [...Object.values(items), ...Object.values(stories).flatMap(s => s.steps)]) report.byType[`${it.kind}/${it.type}`] = (report.byType[`${it.kind}/${it.type}`] || 0) + 1;
report.excludedCount = excluded.length;
report.review = { reviewed: review.reviewed, excluded: Object.keys(review.exclude).length, patched: Object.keys(review.patch).length, unused: [...Object.keys(review.exclude), ...Object.keys(review.patch)].filter(id => !reviewUsed.has(id)) };
if (report.review.unused.length) console.warn('editorial entries that match no item:', report.review.unused.join(', '));
report.excludedByReason = excluded.reduce((m, e) => (m[e.reason] = (m[e.reason] || 0) + 1, m), {});
report.version = COURSE_VERSION;
report.files = Object.fromEntries(fs.readdirSync(OUT).map(f => [f, fs.statSync(path.join(OUT, f)).size]));
fs.writeFileSync('docs/redesign/COURSE-BUILD-REPORT.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ ...report, excluded: undefined }, null, 2));
