// Curriculum placement heuristic, not a calibrated CEFR/IRT test.
export const PLACEMENT_SIZES = [10, 20, 30];
export const skillLabel = { vocabulary: '字詞', grammar: '句型與文法', reading: '閱讀與情境', listening: '聽辨' };
export const skillOf = it => it.type === 'listen' || (it.type === 'input' && it.audio && !it.text) ? 'listening' : it.passage || it.kind === 'talk' ? 'reading' : it.kind === 'word' ? 'vocabulary' : 'grammar';
const signature = it => JSON.stringify([it.prompt, it.text || '', it.audio || '', it.passage || '', [...(it.options || [])].sort()]);
const hash = str => { let n = 2166136261; for (const c of str) n = Math.imul(n ^ c.charCodeAt(0), 16777619); return n >>> 0; };
function candidates(course, section) {
  const sec = course.track(section);
  return [...new Set(sec.units.flatMap(u => u.nodes.filter(n => n.kind !== 'boss').flatMap(n => course.nodes.get(n.id)?.pool || [])))].map(id => course.item(id)).filter(it => it && ['choice', 'input', 'build', 'listen'].includes(it.type) && it.answer && it.why);
}
function pick(course, section, slots, salt, records) {
  const used = new Set(slots.map(x => signature(course.item(x.id))));
  const skills = Object.keys(skillLabel), target = skills[slots.length % skills.length];
  const options = candidates(course, section).filter(it => !used.has(signature(it)));
  options.sort((a,b) => {
    const rank = it => (records[it.id]?.s ? 100 : 0) + (skillOf(it) === target ? 0 : 10);
    return rank(a) - rank(b) || hash(a.id + salt) - hash(b.id + salt);
  });
  const it = options[0];
  return it ? { id: it.id, section, skill: skillOf(it), seen: !!records[it.id]?.s } : null;
}
export function makePlacement(course, size = 20, seed = 1, records = {}) {
  if (!PLACEMENT_SIZES.includes(Number(size))) return null;
  size = Number(size);
  const sections = course.index.sections.map(x => x.id), slots = [];
  const anchors = Math.floor(size / sections.length) * sections.length;
  for (let i = 0; i < size; i++) {
    const section = sections[i % sections.length];
    const slot = pick(course, section, slots, String(seed) + ':' + i, records);
    if (!slot) return null;
    slots.push(slot);
  }
  return { version: 1, size, anchors, slots };
}
export function placementReport(plan, results, course) {
  const scored = results.filter(r => !r.repair);
  const rows = course.index.sections.map(s => {
    const rs = scored.filter(r => plan.slots.find(x => x.id === r.id)?.section === s.id);
    return { section:s.id, title:s.title, level:s.level, n:rs.length, correct:rs.filter(r => r.ok && !r.hint).length };
  });
  // Fit a single change point using all sections; one isolated early miss cannot block every higher level.
  const fits = Array.from({length:rows.length + 1},(_,k) => ({ k, score:scored.reduce((total,r) => {
    const slot = plan.slots.find(x => x.id === r.id), ix = rows.findIndex(x => x.section === slot?.section);
    if (ix < 0 || slot.skill==='listening' && (!r.audio || r.transcript)) return total;
    const it = course.item(r.id), guess = it.options?.length ? 1 / it.options.length : .08;
    const p = ix < k ? .85 : guess;
    return total + Math.log(r.ok && !r.hint ? p : 1-p);
  },0) }));
  fits.sort((a,b) => b.score-a.score || a.k-b.k);
  const best = fits[0], plausible = fits.filter(x => x.score >= best.score-2).map(x => Math.min(rows.length-1,x.k));
  let low = Math.min(...plausible), high = Math.max(...plausible);
  if (plan.size === 10) { low = Math.max(0,Math.min(low,Math.min(best.k,rows.length-1)-1)); high = Math.min(rows.length-1,Math.max(high,best.k+1)); }
  const skills = Object.entries(skillLabel).map(([id,label]) => {
    const rs = scored.filter(r => plan.slots.find(x => x.id === r.id)?.skill === id);
    const valid = id==='listening' ? rs.filter(r=>r.audio && !r.transcript) : rs;
    const heard = rs.filter(r => r.audio && !r.transcript).length;
    return {id,label,n:rs.length,correct:valid.filter(r => r.ok && !r.hint).length,heard};
  });
  const listeningLimited = (skills.find(x=>x.id==='listening')?.heard || 0)<2;
  if (listeningLimited) {low=Math.max(0,Math.min(low,Math.min(best.k,rows.length-1)-1));high=Math.min(rows.length-1,Math.max(high,best.k+1));}
  return { listeningLimited, recommended:rows[Math.min(rows.length-1,best.k)].section, range:[rows[low].section,rows[high].section], rows, skills,
    evidence:plan.size===10?'初步定位':plan.size===20?'分層定位':'較完整定位', seen:plan.slots.filter(x=>x.seen).length,
    gaps:rows.filter(x=>x.n && x.correct/x.n<.7).map(x=>x.section), complete:scored.length===plan.size };
}
export function refinePlacement(plan, results, course, seed, records = {}) {
  const next = results.length;
  if (next < plan.anchors || next >= plan.size) return;
  const report = placementReport(plan,results,course), sections = course.index.sections.map(x=>x.id);
  const boundary = sections.indexOf(report.recommended);
  const near = [boundary,Math.max(0,boundary-1),Math.min(sections.length-1,boundary+1)];
  const chosen = [...new Set(near)].map(i=>({i,n:plan.slots.slice(0,next).filter(x=>x.section===sections[i]).length})).sort((a,b)=>a.n-b.n)[0].i;
  const slot = pick(course,sections[chosen],plan.slots.filter((_,i)=>i!==next),String(seed)+':refine:'+next,records);
  if (slot) plan.slots[next]=slot;
}
