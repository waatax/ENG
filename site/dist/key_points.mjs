// key_points.mjs — 每個教學頁頂端的「重點速覽」：用圖示把目標、規則、例句、易錯與自查濃縮成五格。
const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clean = s => String(s ?? '').replace(/\*\*|`|\\textbf\{|\\text\{|\}/g, '').replace(/\s+/g, ' ').trim();
// 取第一句，避免把整段長文塞進速覽格。
export function firstSentence(text, max = 110) {
  const s = clean(text);
  // 中文句以全形句號斷句，避免把句中的英文問句（What’s your name?）當成句尾。
  const m = /[一-鿿]/.test(s) ? s.match(/^.+?[。！？](?=.)/) : s.match(/^.+?[.!?](?=\s|$)/);
  const out = m && m[0].length >= 12 ? m[0] : s;
  return out.length > max ? out.slice(0, max - 1) + '…' : out;
}
const TILES = [
  ['goal', '🎯', '學習目標'], ['rule', '📐', '核心規則'], ['example', '💬', '關鍵例句'], ['trap', '⚠️', '最常見錯誤'], ['check', '✅', '自我檢核']
];
export function renderKeyPoints(points, label = '重點速覽') {
  const tiles = TILES.filter(([k]) => points[k]).map(([k, icon, name]) => `<li class="kp-tile kp-${k}"><span class="kp-icon" aria-hidden="true">${icon}</span><div><b>${name}</b><p${k === 'example' ? ' lang="en"' : ''}>${e(points[k])}</p></div></li>`).join('');
  if (!tiles) return '';
  return `<section class="card kp-summary" aria-label="${e(label)}"><h2><span aria-hidden="true">🧭</span> ${e(label)} · 一眼看懂這一課</h2><ul class="kp-tiles">${tiles}</ul></section>`;
}
export const keyPointsForKnowledge = p => ({ goal: firstSentence(p.goal), rule: firstSentence(p.rule), example: p.pairs?.[0]?.[0], trap: firstSentence(p.trap), check: p.questions?.[0] ? `能不看解析答對：${clean(p.questions[0][0])}` : '' });
export const keyPointsForChapter = w => ({ goal: firstSentence(w.goal), rule: firstSentence(w.rule), example: firstSentence(w.example, 140), trap: firstSentence(w.trap), check: w.question ? `能不看解析答對：${firstSentence(w.question.prompt, 120)}` : '' });
export const keyPointsForGrammar = t => ({ goal: (t.flow || []).join(' → '), rule: firstSentence(t.rule), example: t.rows?.[0]?.[1], trap: firstSentence(t.trap), check: `能不看表格回答：${clean(t.question)}` });
export function keyPointsForUnit(u) {
  const c0 = (u.concepts || [])[0] || {};
  const trap = (u.traps || [])[0];
  return {
    goal: u.guideline && !/^教育部|^心測|^大考|^國家|^技專|^財團|^ETS|^College|^GMAC|^LTTC|^語言訓練/.test(u.guideline) ? firstSentence(u.guideline, 140) : '學會：' + (u.concepts || []).map(c => clean(c.title).replace(/\s*\([^)]*\)\s*$/, '')).join(' · '),
    rule: firstSentence(c0.formula || c0.explanation, 140),
    example: firstSentence(c0.example, 140),
    trap: trap ? `${clean(trap.wrong)} → ${clean(trap.correct)}` : '',
    check: firstSentence((u.checklist || [])[0] || u.step0Clue)
  };
}
