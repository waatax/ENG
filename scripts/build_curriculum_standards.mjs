// Builds dist/curriculum_standards.mjs from the official 108 English curriculum text in data/curriculum/.
// The JSON files were extracted from the two official PDFs (see each file's `source`); re-run after editing them.
import fs from 'node:fs';

const general = JSON.parse(fs.readFileSync('data/curriculum/108-english-general.json', 'utf8'));
const vocational = JSON.parse(fs.readFileSync('data/curriculum/108-english-vocational.json', 'utf8'));

const pick = (rows, track) => rows.map(r => ({ track, ...r }));
const performances = [...pick(general.performances, 'general'), ...pick(vocational.performances, 'vocational')];
const contents = [...pick(general.contents, 'general'), ...pick(vocational.contents, 'vocational')];
const competencies = [...pick(general.competencies, 'general'), ...pick(vocational.competencies, 'vocational')];

const codes = new Set();
for (const r of [...performances, ...contents, ...competencies]) {
  if (codes.has(r.code)) throw new Error(`Duplicate curriculum code ${r.code}`);
  codes.add(r.code);
}

const out = `// curriculum_standards.mjs — 108 課綱英語文官方條文（自動產生，請改 data/curriculum/*.json 後執行 scripts/build_curriculum_standards.mjs）
// 普通型條文代碼使用羅馬數字 Ⅱ Ⅲ Ⅳ Ⅴ；技術型高中條文依原文使用拉丁字母 V（例如 3-V-11），兩者不混用。
export const STANDARD_SOURCES = ${JSON.stringify({ general: general.source, vocational: vocational.source }, null, 1)};
export const STAGES = {
 'Ⅱ': { label: '第二學習階段', grades: '國小 3–4 年級', short: '國小中年級' },
 'Ⅲ': { label: '第三學習階段', grades: '國小 5–6 年級', short: '國小高年級' },
 'Ⅳ': { label: '第四學習階段', grades: '國中 7–9 年級', short: '國中' },
 'Ⅴ': { label: '第五學習階段', grades: '普通型高中 10–12 年級', short: '高中' },
 'V': { label: '第五學習階段（技術型）', grades: '技術型高中 10–12 年級', short: '高工／技高' }
};
export const PERFORMANCE_CATEGORIES = {
 1: { label: '聽', full: '語言能力（聽）', icon: '🎧' },
 2: { label: '說', full: '語言能力（說）', icon: '🗣️' },
 3: { label: '讀', full: '語言能力（讀）', icon: '📖' },
 4: { label: '寫', full: '語言能力（寫）', icon: '✍️' },
 5: { label: '綜合', full: '聽說讀寫綜合應用能力', icon: '🔄' },
 6: { label: '興趣', full: '學習興趣與態度', icon: '💡' },
 7: { label: '策略', full: '學習方法與策略', icon: '🧭' },
 8: { label: '文化', full: '文化理解', icon: '🌏' },
 9: { label: '思考', full: '邏輯思考、判斷與創造力', icon: '🧠' }
};
export const CONTENT_THEMES = {
 Aa: { label: '字母', full: 'A 語言知識 · a 字母', icon: '🔤' },
 Ab: { label: '語音', full: 'A 語言知識 · b 語音', icon: '🔊' },
 Ac: { label: '字詞', full: 'A 語言知識 · c 字詞', icon: '📚' },
 Ad: { label: '句構', full: 'A 語言知識 · d 句構', icon: '🧱' },
 Ae: { label: '篇章', full: 'A 語言知識 · e 篇章', icon: '📄' },
 B: { label: '溝通功能', full: 'B 溝通功能', icon: '💬' },
 C: { label: '文化與習俗', full: 'C 文化與習俗', icon: '🎎' },
 D: { label: '思考能力', full: 'D 思考能力', icon: '🧩' }
};
export const COMPETENCY_DIMENSIONS = {
 A1: '身心素質與自我精進', A2: '系統思考與解決問題', A3: '規劃執行與創新應變',
 B1: '符號運用與溝通表達', B2: '科技資訊與媒體素養', B3: '藝術涵養與美感素養',
 C1: '道德實踐與公民意識', C2: '人際關係與團隊合作', C3: '多元文化與國際理解'
};
export const PERFORMANCES = ${JSON.stringify(performances)};
export const CONTENTS = ${JSON.stringify(contents)};
export const COMPETENCIES = ${JSON.stringify(competencies)};
const index = new Map([...PERFORMANCES.map(r => [r.code, { kind: 'performance', ...r }]), ...CONTENTS.map(r => [r.code, { kind: 'content', ...r }]), ...COMPETENCIES.map(r => [r.code, { kind: 'competency', ...r }])]);
export function lookupStandard(code) { return index.get(String(code ?? '').trim()) || null; }
export function stageOfCode(code) { const m = String(code).match(/-([ⅡⅢⅣⅤ]|V)-/); return m ? m[1] : null; }
export function marker(entry) { return entry ? (entry.advanced ? '*' : '') + (entry.spiral ? '◎' : '') : ''; }
`;
fs.writeFileSync('dist/curriculum_standards.mjs', out);
console.log(`curriculum_standards.mjs: ${performances.length} performances, ${contents.length} contents, ${competencies.length} competencies`);
