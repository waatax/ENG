export const STORAGE_KEY = 'english-quest-knowledge-v1';

// Validated, versioned state: bad browser data must not break teaching pages.
export function createKnowledgeProgress(points, storage = globalThis.localStorage) {
  const lessons = new Map(points.map(p => [p.id, p]));
  let state = { version: 1, answers: {}, drafts: {}, lastVisited: '' };
  let warning = '';
  const validChoice = (q, n) => Number.isInteger(n) && n >= 0 && n < q[1].length;
  try {
    const raw = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null');
    if (raw?.version === 1) {
      for (const p of points) {
        if (typeof raw.drafts?.[p.id] === 'string') state.drafts[p.id] = raw.drafts[p.id].slice(0, 10000);
        p.questions.forEach((q, i) => {
          const key = `${p.id}:${i}`, a = raw.answers?.[key];
          if (a && validChoice(q, a.first) && (a.latest === null || validChoice(q, a.latest)) && Number.isInteger(a.attempts) && a.attempts > 0) {
            state.answers[key] = { first: a.first, latest: a.latest, attempts: a.attempts };
          }
        });
      }
      if (lessons.has(raw.lastVisited)) state.lastVisited = raw.lastVisited;
    }
  } catch { warning = '無法讀取本機紀錄；目前仍可學習，請先備份重要草稿。'; }
  function save() {
    try { if (!storage) throw new Error('unavailable'); storage.setItem(STORAGE_KEY, JSON.stringify(state)); warning = ''; }
    catch { warning = '儲存失敗；請複製草稿，離開或重新整理後可能遺失紀錄。'; }
  }
  return {
    get warning() { return warning; },
    get lastVisited() { return state.lastVisited; },
    draft(id) { return state.drafts[id] || ''; },
    answer(id, i) { const a = state.answers[`${id}:${i}`]; return a ? { ...a } : null; },
    visit(id) { if (lessons.has(id)) { state.lastVisited = id; save(); } },
    write(id, value) { if (lessons.has(id)) { state.drafts[id] = String(value).slice(0,10000); save(); } },
    choose(id, i, choice) {
      const q = lessons.get(id)?.questions[i];
      if (!q || !Number.isInteger(i) || !validChoice(q, choice)) return false;
      const key = `${id}:${i}`, a = state.answers[key];
      if (a && a.latest !== null) return false;
      state.answers[key] = { first: a?.first ?? choice, latest: choice, attempts: (a?.attempts || 0) + 1 };
      save(); return true;
    },
    retry(id, i) { const a = state.answers[`${id}:${i}`]; if (a && a.latest !== null) { a.latest = null; save(); return true; } return false; },
    summary(id) {
      const p = lessons.get(id); if (!p) return null;
      let answered = 0, firstCorrect = 0, needsReview = 0;
      p.questions.forEach((q, i) => { const a = state.answers[`${id}:${i}`]; if (a) { answered++; if (a.first === q[2]) firstCorrect++; if (a.latest !== q[2]) needsReview++; } });
      return { answered, firstCorrect, needsReview, total: p.questions.length, hasDraft: Boolean(state.drafts[id]?.trim()) };
    }
  };
}
