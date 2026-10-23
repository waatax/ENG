import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCourse, createGame, accepts, normalize, localDay, streakOf, vocabExercises, isScored, KEY, V1_KEY, DAY, XP, HEARTS, FREEZE_COST, GOALS } from '../dist/quest/engine.mjs';
import { journeyCatalog } from '../dist/learning_journey.mjs';

const dir = 'dist/quest/course/';
const read = f => JSON.parse(fs.readFileSync(dir + f, 'utf8'));
const index = read('index.json');
const trackFiles = [...index.sections, ...index.branches].map(t => read(t.id + '.json'));
const storiesFile = read('stories.json'), vocabFile = read('vocab.json');
function loadCourse() { const c = createCourse(index); for (const f of trackFiles) c.register(f); c.register(storiesFile); c.register(vocabFile); return c; }
const memory = (init = {}) => { const data = new Map(Object.entries(init)); return { getItem: k => data.get(k) ?? null, setItem: (k, v) => data.set(k, v), data }; };
const right = it => it.type === 'match' ? 'matched' : it.answer;
const wrong = it => it.options ? it.options.find(o => o !== it.answer) : it.type === 'match' ? 'mismatched' : 'zzz wrong';
function play(g, answer = right, guard = 200) {
  while (g.state.session && guard--) {
    const it = g.currentItem();
    if (isScored(it) && !g.state.session.feedback) assert.ok(g.submit(answer(it, g)), 'submit ' + it.id);
    g.next();
  }
  assert.ok(guard > 0, 'session did not end');
  return g.result;
}
const lessonPath = (c, track) => c.path(track).filter(id => c.nodes.get(id).kind !== 'boss');

test('course: 9 leveled sections, 8 goal branches, every unit has playable nodes', () => {
  assert.equal(index.sections.length, 9);
  assert.equal(index.branches.length, 8);
  const units = index.sections.flatMap(s => s.units);
  assert.equal(units.length, 82);
  assert.ok(units.some(u => u.id === 'u1') && units.some(u => u.id === 'g12-s2-u12'));
  const nodeIds = [...index.sections, ...index.branches].flatMap(t => t.units.flatMap(u => u.nodes.map(n => n.id)));
  assert.equal(new Set(nodeIds).size, nodeIds.length);
  const c = loadCourse();
  for (const id of nodeIds) {
    const n = c.nodes.get(id); assert.ok(n.pool, 'pool for ' + id);
    const scored = n.pool.filter(x => isScored(c.item(x)));
    assert.ok(scored.length >= (n.kind === 'boss' ? 6 : 4), `${id} has ${scored.length} scored items`);
  }
});

test('course: every exercise is answerable and keeps a traceable source', () => {
  const routes = new Set(journeyCatalog.map(c => c.link));
  const items = Object.assign({}, ...trackFiles.map(f => f.items));
  let n = 0;
  for (const it of Object.values(items)) {
    n++;
    assert.ok(routes.has(it.src), `${it.id} source ${it.src}`);
    if (it.type === 'choice' || it.type === 'listen') {
      assert.ok(it.options.includes(it.answer), it.id);
      assert.equal(new Set(it.options).size, it.options.length, it.id);
      assert.ok(it.options.length >= 2 && it.why, it.id);
    } else if (it.type === 'build') {
      const tokens = normalize(it.answer).split(' ');
      const bank = it.words.map(w => normalize(w));
      for (const t of tokens) assert.ok(bank.includes(t), `${it.id} missing token ${t}`);
      assert.ok(accepts(it, it.answer), it.id);
      assert.ok(!/[㐀-鿿]/.test(it.words.join(' ')), it.id);
    } else if (it.type === 'input') assert.ok(String(it.answer).trim() && String(it.prompt).trim(), it.id);
    else if (it.type === 'match') { assert.equal(it.pairs.length, 4, it.id); assert.equal(new Set(it.pairs.map(p => p[1])).size, 4, it.id); }
    else assert.equal(it.type, 'info', it.id);
  }
  assert.ok(n > 5000, `only ${n} items`);
});

test('course: stories, placement and vocabulary sets are complete', () => {
  assert.equal(Object.keys(storiesFile.stories).length, 48);
  for (const s of Object.values(storiesFile.stories)) {
    assert.ok(s.steps.some(x => x.type === 'line') && s.steps.some(x => isScored(x)), s.id);
    assert.ok(index.sections.some(sec => sec.id === s.section));
  }
  for (const u of index.sections.flatMap(s => s.units)) if (u.story) assert.ok(storiesFile.stories[u.story], u.story);
  const c = loadCourse();
  assert.ok(index.placement.flatMap(b => b.items).every(id => c.item(id)));
  assert.ok(vocabFile.sets.length > 100);
  const ex = vocabExercises(vocabFile.sets[0]);
  assert.ok(ex.length >= 10 && ex.every(it => !it.options || it.options.includes(it.answer)));
});

test('engine: new learner starts at the first node; later sections are locked, branches are open', () => {
  const c = loadCourse(), g = createGame({ storage: memory(), course: c });
  assert.equal(g.nodeStatus('u1:q1'), 'available');
  assert.equal(g.nodeStatus('u1:q2'), 'locked');
  assert.equal(g.trackUnlocked('s2'), false);
  assert.equal(g.trackUnlocked('b-toeic'), true);
  assert.equal(g.start('lesson', 'u1:q2'), false);
  assert.equal(g.current('s1'), 'u1:q1');
});

test('engine: a lesson awards XP once, marks the day and opens the next node; replays earn less', () => {
  let t = new Date(2026, 9, 23, 9).getTime();
  const c = loadCourse(), storage = memory(), g = createGame({ storage, now: () => t, course: c });
  g.setup({ goal: 'regular', start: 's1' });
  assert.ok(g.start('lesson', 'u1:q1'));
  const r = play(g);
  assert.equal(r.xp, XP.lesson + XP.perfect);
  assert.equal(r.perfect, true);
  assert.equal(g.nodeStatus('u1:q2'), 'available');
  assert.deepEqual(g.state.days, ['2026-10-23']);
  assert.equal(g.streak(), 1);
  g.start('lesson', 'u1:q1'); const again = play(g);
  assert.equal(again.xp, XP.replay + XP.perfect);
  assert.equal(g.todayXp(), XP.lesson + XP.replay + 2 * XP.perfect);
});

test('engine: submit is idempotent and a reload resumes the same step with its feedback', () => {
  const c = loadCourse(), storage = memory();
  let g = createGame({ storage, course: c });
  g.start('lesson', 'u1:q1');
  const it = g.currentItem();
  assert.ok(g.submit(right(it)));
  assert.equal(g.submit(right(it)), false);
  assert.equal(g.state.items[it.id].s, 1);
  g = createGame({ storage, course: loadCourse() });
  assert.ok(g.validSession());
  assert.equal(g.currentItem().id, it.id);
  assert.equal(g.state.session.feedback.ok, true);
  const r = play(g);
  assert.equal(r.xp, XP.lesson + XP.perfect);
  assert.equal(Object.keys(g.state.awards).length, 1);
});

test('engine: a miss is retried once at the end, enters the mistake bank, and leaves after two later successes', () => {
  const c = loadCourse(), g = createGame({ storage: memory(), course: c });
  g.start('lesson', 'u1:q1');
  const first = g.currentItem();
  g.submit(wrong(first)); g.next();
  const r = play(g);
  assert.equal(r.repairs, 1);
  assert.equal(r.firstTry, r.total - 1);
  assert.equal(r.perfect, false);
  assert.equal(g.state.items[first.id].m, true);
  assert.equal(g.mistakeCount(), 1);
  g.start('mistakes'); play(g);
  assert.equal(g.state.items[first.id].m, true, 'one later success is not enough');
  g.start('mistakes'); play(g);
  assert.equal(g.state.items[first.id].m, false);
  assert.equal(g.state.stats.fixed, 1);
});

test('engine: two misses in a row insert a hint card and an easier item', () => {
  const c = loadCourse(), g = createGame({ storage: memory(), course: c });
  g.acceptPlacement('s3');
  const node = 'g5-s1-u1:grammar';
  for (const id of ['g5-s1-u1:word', 'g5-s1-u1:talk']) { g.start('lesson', id); play(g); }
  assert.equal(g.nodeStatus(node), 'available');
  g.start('lesson', node);
  let s = g.state.session; while (!isScored(g.currentItem())) g.next();
  const before = s.queue.length;
  g.submit(wrong(g.currentItem())); g.next();
  while (!isScored(g.currentItem())) g.next();
  g.submit(wrong(g.currentItem()));
  s = g.state.session;
  assert.equal(s.support, 1);
  assert.ok(s.queue.length >= before + 3, 'two repairs plus support items');
  const inserted = s.queue.slice(s.index + 1, s.index + 3).map(id => c.item(id));
  assert.ok(inserted.some(x => x.type === 'info' || x.level === 1));
});

test('engine: unit challenge has 3 hearts, ends at zero, and does not block the next unit', () => {
  const c = loadCourse(), g = createGame({ storage: memory(), course: c });
  for (const id of ['u1:q1', 'u1:q2', 'u1:q3']) { g.start('lesson', id); play(g); }
  assert.equal(g.nodeStatus('g3-s1-u1:word'), 'available', 'next unit opens without the challenge');
  assert.equal(g.nodeStatus('u1:q4'), 'available');
  g.start('boss', 'u1:q4');
  assert.equal(g.state.session.hearts, HEARTS);
  assert.equal(g.hint(), false, 'no hints in a challenge');
  const failed = play(g, wrong);
  assert.equal(failed.passed, false);
  assert.equal(failed.total, HEARTS);
  assert.equal(failed.xp, XP.bossTry);
  assert.equal(g.state.crowns.u1, undefined);
  g.start('boss', 'u1:q4');
  const ok = play(g);
  assert.equal(ok.passed, true);
  assert.ok(g.state.crowns.u1);
  assert.equal(g.nodeStatus('u1:q4'), 'crowned');
  assert.ok(g.state.gems >= 15);
});

test('engine: finishing a unit schedules review; only a due review moves the interval forward', () => {
  let t = new Date(2026, 9, 23, 20).getTime();
  const c = loadCourse(), g = createGame({ storage: memory(), now: () => t, course: c });
  for (const id of ['u1:q1', 'u1:q2', 'u1:q3']) { g.start('lesson', id); play(g); }
  const due = g.state.review.u1.due;
  assert.equal(due, t + DAY);
  g.start('review', 'u1'); const early = play(g);
  assert.equal(g.state.review.u1.due, due, 'early practice keeps the schedule');
  assert.equal(early.xp, XP.practice + XP.perfect);
  t += DAY;
  assert.deepEqual(g.dueUnits(), ['u1']);
  g.start('review', 'u1'); play(g);
  assert.equal(g.state.review.u1.step, 1);
  assert.equal(g.state.review.u1.due, t + 3 * DAY);
});

test('engine: jump test unlocks a section and marks earlier lessons as tested, not completed', () => {
  const c = loadCourse(), g = createGame({ storage: memory(), course: c });
  assert.equal(g.trackUnlocked('s3'), false);
  assert.ok(g.start('jump', 's3'));
  assert.equal(g.state.session.hearts, HEARTS);
  const r = play(g);
  assert.equal(r.passed, true);
  assert.equal(r.xp, XP.jump);
  assert.equal(g.trackUnlocked('s3'), true);
  assert.equal(g.nodeStatus('g5-s1-u1:word'), 'available');
  assert.equal(g.nodeStatus('u1:q1'), 'tested');
  assert.equal(g.sectionCompleted('s1'), false);
  assert.equal(g.state.achievements.section1, undefined);
  const g2 = createGame({ storage: memory(), course: c });
  g2.start('jump', 's3'); const failed = play(g2, wrong);
  assert.equal(failed.passed, false);
  assert.equal(g2.trackUnlocked('s3'), false);
});

test('engine: placement recommends a start without XP; accepting it tests out earlier sections', () => {
  const c = loadCourse(), g = createGame({ storage: memory(), course: c });
  g.start('placement'); const all = play(g);
  assert.equal(all.recommended, 's9');
  assert.equal(all.xp, 0);
  assert.equal(g.state.days.length, 0);
  g.start('placement'); let k = 0;
  const r = play(g, it => (k++ < 6 ? right(it) : wrong(it)));
  assert.equal(r.recommended, 's3', 'passed s1 and s2 blocks, failed s4');
  g.acceptPlacement('s3');
  assert.equal(g.trackUnlocked('s3'), true);
  assert.equal(g.nodeStatus('g4-s2-u6:word'), 'tested');
});

test('engine: streak crosses local midnight, a freeze covers one missed day, without it the streak ends', () => {
  const day = (d, h = 23, m = 50) => new Date(2026, 9, d, h, m).getTime();
  let t = day(20);
  const c = loadCourse(), storage = memory(), g = createGame({ storage, now: () => t, course: c });
  g.start('lesson', 'u1:q1'); play(g);
  t = day(21, 0, 5); g.start('lesson', 'u1:q1'); play(g);
  assert.equal(g.streak(), 2);
  g.state.gems = FREEZE_COST * 3;
  assert.ok(g.buyFreeze()); assert.ok(g.buyFreeze()); assert.equal(g.buyFreeze(), false, 'at most 2');
  t = day(23, 9, 0); // the 22nd was missed
  const g2 = createGame({ storage, now: () => t, course: loadCourse() });
  assert.deepEqual(g2.state.frozen, ['2026-10-22']);
  assert.equal(g2.state.freezes, 1);
  assert.equal(g2.streak(), 2, 'kept, not increased');
  g2.start('lesson', 'u1:q1'); play(g2);
  assert.equal(g2.streak(), 3);
  assert.equal(streakOf(['2026-10-20'], [], day(23)), 0);
  assert.equal(localDay(day(23, 0, 1)), '2026-10-23');
});

test('engine: daily quests are fixed per date, reset next day and pay the bonus chest once', () => {
  let t = new Date(2026, 9, 23, 10).getTime();
  const c = loadCourse(), g = createGame({ storage: memory(), now: () => t, course: c });
  g.setup({ goal: 'casual' });
  const ids = g.state.quests.list.map(q => q.id);
  assert.equal(ids[0], 'xp'); assert.equal(ids.length, 3); assert.equal(g.state.quests.list[0].target, GOALS.casual + 10);
  assert.deepEqual(createGame({ storage: memory(), now: () => t, course: c }).state.quests.list.map(q => q.id), ids);
  g.state.quests.list[1].done = true; g.state.quests.list[2].done = true;
  const events = [];
  for (let k = 0; k < 3; k++) { g.start('lesson', 'u1:q1'); events.push(...play(g).events); }
  assert.equal(g.state.quests.list[0].done, true);
  assert.equal(events.filter(e => e.type === 'quest' && e.id === 'xp').length, 1);
  assert.equal(events.filter(e => e.type === 'chest').length, 1);
  t += DAY; g.refreshDay();
  assert.equal(g.state.quests.day, '2026-10-24');
  assert.ok(g.state.quests.list.every(x => x.n === 0 && !x.done) && !g.state.quests.bonus);
});

test('engine: blocked or corrupt storage stays usable; bad backups change nothing; backups round-trip', () => {
  const c = loadCourse();
  const g = createGame({ storage: { getItem: () => '{', setItem() { throw Error('blocked'); } }, course: c });
  assert.ok(g.warning);
  g.start('lesson', 'u1:q1'); play(g);
  assert.ok(g.warning.includes('無法儲存'));
  const before = g.export();
  assert.equal(g.restore('not json'), false);
  assert.equal(g.export(), before);
  const g2 = createGame({ storage: memory(), course: c });
  assert.ok(g2.restore(before));
  assert.equal(g2.state.xp.total, g.state.xp.total);
  assert.equal(g2.nodeStatus('u1:q2'), 'available');
});

test('engine: pilot v1 progress migrates without touching the v1 record', () => {
  const v1 = JSON.stringify({ schema: 1, profile: { start: 'u1', minutes: 15 }, completed: { 'u1-q1': { at: 1, passed: true }, 'u1-q4': { at: 2, passed: true } }, awards: { 'quest:u1-q1': 10, 'quest:u1-q4': 15 }, days: ['2026-10-22'], schedule: { u1: { due: 5, step: 1 } } });
  const storage = memory({ [V1_KEY]: v1 });
  const g = createGame({ storage, course: loadCourse() });
  assert.equal(g.state.nodes['u1:q1'].n, 1);
  assert.ok(g.state.crowns.u1);
  assert.equal(g.state.xp.total, 25);
  assert.equal(g.state.profile.goal, 'serious');
  assert.equal(g.nodeStatus('u1:q2'), 'available');
  g.save();
  assert.equal(storage.data.get(V1_KEY), v1);
  assert.ok(storage.data.get(KEY));
  assert.ok(GOALS.serious === 30);
});

test('engine: answers accept contractions, case and punctuation but not different grammar', () => {
  assert.ok(accepts({ type: 'input', answer: "I'm Amy." }, '  i’m   amy! '));
  assert.ok(accepts({ type: 'build', answer: 'she is ready' }, 'She is ready.'));
  assert.equal(accepts({ type: 'input', answer: 'She is ready.' }, 'She are ready'), false);
  assert.ok(accepts({ type: 'choice', answer: 'Amy', options: ['amy', 'Amy'] }, 'Amy'));
  assert.equal(accepts({ type: 'choice', answer: 'Amy', options: ['amy', 'Amy'] }, 'amy'), false, 'choice compares the exact option');
});
