// Speed only suggests a separate test. It never completes lessons or grants a crown.
export function fastAnswerLimit(it) {
  const words = String([it.prompt,it.text,it.passage].filter(Boolean).join(' ')).split(/\s+/).length;
  return Math.min(45000,Math.max(12000,words*600));
}
export function fastAnswerEligible(it, r, seen) {
  return r.ok && !r.hint && !r.repair && !r.transcript && !seen && it.type !== 'match' && Number.isFinite(r.elapsed) && r.elapsed >= 700 && r.elapsed <= fastAnswerLimit(it) && (!(it.type === 'listen' || (it.audio && !it.text)) || !!r.audio);
}
export function jumpSuggestion(session, course) {
  if (session.mode !== 'lesson' || !Number.isInteger(session.fastBest) || session.fastBest < 5) return null;
  const scored = session.results.filter(r=>!r.repair);
  if (scored.length<5 || scored.filter(r=>r.ok && !r.hint).length/scored.length<.9) return null;
  const node = course.nodes.get(session.ref), ix = course.index.sections.findIndex(s=>s.id===node?.track);
  return ix>=0 ? course.index.sections[ix+1]?.id || null : null;
}
