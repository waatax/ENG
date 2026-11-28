import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  BENCH_EXAMS, BENCH_ITEMS, CEFR_LEVELS, EVIDENCE_KINDS, GEPT_ROW, GUIDED_HOURS, SKILL_LABELS, EXAM_PACE, MIXED_PRACTICE, FORM_PLAN, itemsFor
} from '../dist/exam_benchmark_data.mjs';
import {
  BENCH_KEY, RETEST_GAP_HOURS, readBench, saveBench, recordFormAnswer, recordReview, dueReviews, formStatus, summarizeForm,
  compareForms, nextFormItem, buildPlan, phaseFor, daysUntil, hoursNeeded, weakestSkill, milestones, isCorrect, validPick,
  bucketOf, renderExamBenchmark, exposureSteps, requiredGapHours
} from '../dist/exam_benchmark.mjs';
import {STORAGE_KEYS} from '../dist/mastery_passport.mjs';
import {requestedLearningTrack} from '../dist/quest/quickstart.mjs';
import {createCourse} from '../dist/quest/engine.mjs';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const store = () => {
  const m = new Map();
  return {getItem: k => m.has(k) ? m.get(k) : null, setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k)};
};
const wrongPick = item => item.select === 2
  ? item.options.map((_, i) => i).filter(i => !item.answer.includes(i)).slice(0, 2)
  : (item.answer + 1) % item.options.length;

test('seven exams carry checked official formats, sources, targets and practice links', () => {
  assert.deepEqual(BENCH_EXAMS.map(e => e.id), ['cap', 'tve', 'gsat', 'toeic', 'sat', 'gre', 'gmat']);
  for (const exam of BENCH_EXAMS) {
    assert.ok(exam.sections.length >= 1, `${exam.id} sections`);
    assert.ok(exam.sources.length >= 1 && exam.sources.every(s => /^https:\/\//.test(s.url)), `${exam.id} needs https sources`);
    assert.ok(exam.targets.length >= 3 && exam.targets.every(t => CEFR_LEVELS.includes(t.cefr)), `${exam.id} targets map to CEFR`);
    assert.ok(CEFR_LEVELS.includes(exam.suggest));
    assert.ok(exam.cefr.every(seg => EVIDENCE_KINDS[seg.kind] && CEFR_LEVELS.includes(seg.from) && CEFR_LEVELS.includes(seg.to)));
    assert.ok(EXAM_PACE[exam.id] && MIXED_PRACTICE[exam.id]?.href, `${exam.id} pace and mixed practice`);
    assert.ok(exam.practice.timed?.href, `${exam.id} timed practice link`);
    assert.ok(exam.official?.length >= 1 && exam.official.every(o => /^https:\/\//.test(o.url) && o.label && o.note.length > 8), `${exam.id} needs official past papers or practice tests`);
    const shares = exam.pointMap.map(p => p.share);
    if (shares.every(v => v !== null)) assert.equal(Math.round(shares.reduce((a, b) => a + b, 0)), 100, `${exam.id} point map sums to 100`);
    else assert.ok(shares.every(v => v === null), `${exam.id} must not mix known and unknown shares`);
    for (const point of exam.pointMap) assert.ok(SKILL_LABELS[point.skill], `${exam.id} skill label ${point.skill}`);
  }
});

test('official facts that were wrong before are now stated exactly', () => {
  const byId = Object.fromEntries(BENCH_EXAMS.map(e => [e.id, e]));
  assert.match(byId.cap.sections[0].detail, /40–45 題/);
  assert.match(byId.cap.sections[1].detail, /3 選 1・20–30 題/);
  assert.match(byId.cap.report, /聽力：基礎／待加強/);
  // 心測中心計分方式說明：加權分數＝聽力答對率×20＋閱讀答對率×80；切分逐年公告。
  assert.match(byId.cap.report, /聽力答對率×20＋閱讀答對率×80/);
  assert.match(byId.cap.report, /112 年：基礎 38\.43、精熟 90\.70/);
  assert.match(byId.cap.scoreNote, /閱讀 80%、聽力 20%/);
  assert.ok(byId.cap.sources.some(s => s.url.endsWith('.pdf')), 'cap cites the scoring PDF');
  assert.match(byId.tve.sections[0].detail, /42 題・每題 2 分・共 84 分/);
  assert.match(byId.tve.sections[1].detail, /填充 4 分＋句子重組 6 分＋中譯英 6 分/);
  assert.match(byId.gsat.sections[0].detail, /46 題・62%/);
  // TOEIC CEFR totals equal ETS listening + reading minimum scores.
  const toeic = byId.toeic.cefr.map(s => Number.parseInt(s.label, 10));
  assert.deepEqual(toeic, [60 + 60, 110 + 115, 275 + 275, 400 + 385, 490 + 455]);
  assert.ok(byId.toeic.cefr.every(s => s.kind === 'official'));
  for (const id of ['cap', 'tve', 'gsat']) assert.ok(byId[id].cefr.every(s => s.kind === 'estimate'), `${id} is an estimate, not official`);
  for (const id of ['sat', 'gre', 'gmat']) assert.ok(byId[id].cefr.every(s => s.kind === 'none'), `${id} has no CEFR mapping`);
  assert.deepEqual(GEPT_ROW.cefr.map(s => s.from), ['A2', 'B1', 'B2', 'C1', 'C2']);
  assert.ok(GUIDED_HOURS.B2[0] > GUIDED_HOURS.B1[1]);
});

test('every exam has four symmetric forms with a reason for every wrong option', () => {
  assert.deepEqual(FORM_PLAN.map(f => f.id), ['A', 'B', 'C', 'D']);
  const ids = new Set();
  for (const exam of BENCH_EXAMS) {
    const forms = FORM_PLAN.map(f => itemsFor(exam.id, f.id));
    const skillsOf = items => items.map(i => i.skill + (i.listen ? ':listen' : '') + (i.select === 2 ? ':two' : '')).sort();
    for (const [i, items] of forms.entries()) {
      assert.equal(items.length, 6, `${exam.id} ${FORM_PLAN[i].id}`);
      assert.deepEqual(skillsOf(items), skillsOf(forms[0]), `${exam.id} ${FORM_PLAN[i].id} tests the same skills as A`);
    }
    for (const item of forms.flat()) {
      assert.ok(!ids.has(item.id), `duplicate ${item.id}`); ids.add(item.id);
      assert.ok(SKILL_LABELS[item.skill], `${item.id} skill`);
      assert.ok(item.stem.length > 10 && item.why.length > 8 && item.cue.length > 8, `${item.id} text`);
      assert.equal(new Set(item.options).size, item.options.length, `${item.id} options are distinct`);
      // 會考聽力與 TOEIC Part 2 三選一；TOEIC Part 3 四選一；GRE 填空五選一、選二題六個選項；GMAT 五選一。
      const expectedCount = item.exam === 'cap' && item.listen ? 3 : item.skill === 'response' ? 3 : exam.id === 'gre' ? (item.select === 2 ? 6 : 5) : exam.id === 'gmat' ? 5 : 4;
      assert.equal(item.options.length, expectedCount, `${item.id} option count matches the exam format`);
      const answers = item.select === 2 ? item.answer : [item.answer];
      assert.equal(answers.length, item.select);
      assert.ok(answers.every(i => Number.isInteger(i) && i >= 0 && i < item.options.length), `${item.id} answer index`);
      for (let i = 0; i < item.options.length; i++) {
        if (answers.includes(i)) assert.equal(item.wrong[i], undefined, `${item.id} correct option has no wrong-note`);
        else assert.ok(item.wrong[i]?.length >= 6, `${item.id} option ${i} needs a reason`);
      }
      assert.ok(isCorrect(item, item.answer), `${item.id} answer scores as correct`);
      assert.ok(!isCorrect(item, wrongPick(item)), `${item.id} wrong pick scores as wrong`);
      if (item.mark) assert.ok(item.stem.includes(item.mark), `${item.id} marked word appears in stem`);
    }
  }
  assert.equal(ids.size, 168);
  assert.equal(BENCH_ITEMS.length, 168);
  const listening = BENCH_ITEMS.filter(i => i.listen);
  assert.equal(listening.length, 12);
  assert.ok(listening.every(i => ['cap', 'toeic'].includes(i.exam)));
  const se = BENCH_ITEMS.filter(i => i.select === 2);
  assert.equal(se.length, 8);
  // New forms are new questions: no passage+stem or listening script is reused (generic RC stems and shared passages are fine).
  const seen = new Map();
  for (const item of BENCH_ITEMS) {
    const key = (item.listen || '') + '|' + (item.passage || '') + '|' + item.stem;
    assert.ok(!seen.has(key), `${item.id} repeats ${seen.get(key)}`);
    seen.set(key, item.id);
  }
  assert.ok(se.every(i => i.exam === 'gre'));
  // Correct answers are not parked in one position.
  const positions = new Set(BENCH_ITEMS.filter(i => i.select === 1).map(i => i.answer));
  assert.ok(positions.size >= 4);
});

test('pick validation rejects malformed and duplicate select-two answers', () => {
  const se = BENCH_ITEMS.find(i => i.select === 2);
  const single = BENCH_ITEMS.find(i => i.select === 1);
  assert.equal(validPick(se, [1, 1]), false);
  assert.equal(validPick(se, [0]), false);
  assert.equal(validPick(se, [0, 99]), false);
  assert.equal(validPick(single, 1.5), false);
  assert.equal(validPick(single, -1), false);
  assert.equal(isCorrect(se, [...se.answer].reverse()), true, 'order does not matter');
  assert.equal(isCorrect(se, [se.answer[0], wrongPick(se)[0]]), false, 'one of two is not enough');
});

test('confidence buckets, first-answer-only recording, and spaced review of errors and guesses', () => {
  assert.equal(bucketOf(true, 'sure'), 'solid');
  assert.equal(bucketOf(true, 'guess'), 'lucky');
  assert.equal(bucketOf(false, 'sure'), 'hyper');
  assert.equal(bucketOf(false, 'mostly'), 'fresh');
  const s = store();
  const state = readBench(s);
  const t0 = Date.UTC(2026, 10, 1, 2);
  const items = itemsFor('cap', 'A');
  const r0 = recordFormAnswer(state, items[0].id, wrongPick(items[0]), 'sure', t0);
  assert.equal(r0.bucket, 'hyper');
  assert.equal(recordFormAnswer(state, items[0].id, items[0].answer, 'sure', t0 + 1), null, 'only the first answer counts');
  recordFormAnswer(state, items[1].id, items[1].answer, 'guess', t0 + 2);
  recordFormAnswer(state, items[2].id, items[2].answer, 'sure', t0 + 3);
  assert.ok(state.review[items[0].id] && state.review[items[1].id], 'errors and guesses go to review');
  assert.equal(state.review[items[2].id], undefined, 'confident correct answers do not');
  assert.equal(nextFormItem(state, 'cap', 'A').id, items[3].id);
  assert.equal(formStatus(state, 'cap', 'A', t0).done, false);
  for (const item of items.slice(3)) recordFormAnswer(state, item.id, item.answer, 'mostly', t0 + 10);
  const status = formStatus(state, 'cap', 'A', t0 + 20);
  assert.equal(status.done, true);
  assert.equal(status.right, 5);
  assert.equal(formStatus(state, 'cap', 'B', t0 + 20).waitHours, RETEST_GAP_HOURS);
  assert.equal(formStatus(state, 'cap', 'C', t0 + 20).waitHours, null, 'C waits for B, which is not done');
  const summary = summarizeForm(state, 'cap', 'A');
  assert.equal(summary.buckets.hyper.length, 1);
  assert.equal(summary.buckets.lucky.length, 1);
  assert.equal(summary.skills.reduce((n, k) => n + k.total, 0), 6);
  assert.ok(saveBench(s, state));

  // Reload from storage: answers re-scored from picks, review kept.
  const reloaded = readBench(s);
  assert.equal(formStatus(reloaded, 'cap', 'A', t0 + 20).right, 5);
  assert.equal(dueReviews(reloaded, t0 + 1000).length, 0, 'not due the same day');
  const due = dueReviews(reloaded, t0 + DAY + 100, 'cap');
  assert.equal(due.length, 2);
  const first = due[0];
  const ok = recordReview(reloaded, first.id, first.answer, t0 + DAY + 200);
  assert.equal(ok.correct, true);
  assert.equal(ok.next.days, 3, 'correct review moves to the 3-day step');
  assert.equal(reloaded.wins.cap, 1);
  const again = recordReview(reloaded, first.id, wrongPick(first), t0 + 5 * DAY);
  assert.equal(again.next.days, 1, 'a miss resets to 1 day');
  assert.equal(recordReview(reloaded, 'cap-a1-unknown', 0, t0), null);
});

test('a review answered correctly at the 30-day step graduates', () => {
  const state = readBench(store());
  const item = itemsFor('toeic', 'A')[0];
  const t = Date.UTC(2026, 0, 1);
  state.review[item.id] = {step: 4, days: 30, due: t, reviewed: t - 30 * DAY, rating: 'good'};
  const r = recordReview(state, item.id, item.answer, t + 1);
  assert.equal(r.graduated, true);
  assert.equal(state.review[item.id], undefined);
});

test('each later form counts as delayed-retention evidence only after its gap (B 20 h, C 7 d, D 14 d)', () => {
  assert.deepEqual(FORM_PLAN.map(f => f.gapHours), [0, 20, 168, 336]);
  assert.equal(requiredGapHours('A', 'B'), 20);
  assert.equal(requiredGapHours('B', 'C'), 168);
  assert.equal(requiredGapHours('A', 'C'), 188, 'skipping B adds both gaps');
  assert.equal(requiredGapHours('C', 'A'), null);
  const t0 = Date.UTC(2026, 10, 1, 2);
  const finish = (state, form, start, pick = 'right') => itemsFor('gre', form)
    .forEach((item, i) => recordFormAnswer(state, item.id, pick === 'right' ? item.answer : wrongPick(item), 'sure', start + i));
  const run = gapHours => {
    const state = readBench(store());
    finish(state, 'A', t0, 'wrong');
    finish(state, 'B', t0 + gapHours * HOUR);
    return compareForms(state, 'gre');
  };
  assert.equal(run(2).steps[0].valid, false);
  const later = run(21);
  assert.deepEqual(later.steps.map(s => [s.from, s.to, s.valid]), [['A', 'B', true]]);
  assert.equal(later.forms[0].right, 0);
  assert.equal(later.forms[1].right, 6);
  assert.deepEqual(later.skills.map(s => s.cells.map(c => c.form)), later.skills.map(() => ['A', 'B']));
  assert.equal(compareForms(readBench(store()), 'gre'), null);

  // Full sequence: C three days after B is practice; D fifteen days after C counts.
  const state = readBench(store());
  finish(state, 'A', t0, 'wrong');
  finish(state, 'B', t0 + DAY);
  const bDone = t0 + DAY + 5;
  assert.equal(formStatus(state, 'gre', 'C', bDone + DAY).waitHours, 6 * 24);
  finish(state, 'C', bDone + 3 * DAY);
  const cDone = bDone + 3 * DAY + 5;
  assert.equal(formStatus(state, 'gre', 'D', cDone).waitHours, 14 * 24);
  finish(state, 'D', cDone + 15 * DAY);
  const all = compareForms(state, 'gre');
  assert.deepEqual(all.steps.map(s => `${s.from}${s.to}:${s.valid}`), ['AB:true', 'BC:false', 'CD:true']);
  const ms = milestones(state, 'gre', cDone + 16 * DAY);
  assert.equal(ms[2].done, true, 'B milestone');
  assert.equal(ms[3].done, false, 'C was taken too early to count');
  assert.equal(weakestSkill(state, 'gre').fromData, true);

  // Skipping B: A → C needs 20 h + 7 d.
  const skip = readBench(store());
  finish(skip, 'A', t0);
  finish(skip, 'C', t0 + 8 * DAY);
  assert.deepEqual(compareForms(skip, 'gre').steps.map(s => [s.from, s.to, s.gapHours, s.valid]), [['A', 'C', 188, true]]);
});

test('saved progress from the two-form version still loads, and C/D answers persist', () => {
  const s = store();
  const t0 = Date.UTC(2026, 10, 1, 2);
  const a = itemsFor('cap', 'A');
  const c = itemsFor('cap', 'C');
  s.setItem(BENCH_KEY, JSON.stringify({
    exam: 'cap', plans: {}, review: {}, exposure: {}, wins: {},
    forms: {
      'cap:A': {startedAt: t0, answers: Object.fromEntries(a.map((item, i) => [item.id, {pick: item.answer, conf: 'sure', at: t0 + i}]))},
      'cap:C': {startedAt: t0 + 9 * DAY, answers: {[c[0].id]: {pick: c[0].answer, conf: 'mostly', at: t0 + 9 * DAY}}},
      'cap:E': {answers: {[a[0].id]: {pick: 0, conf: 'sure', at: t0}}}
    }
  }));
  const state = readBench(s);
  assert.deepEqual(Object.keys(state.forms).sort(), ['cap:A', 'cap:C']);
  assert.equal(formStatus(state, 'cap', 'A', t0 + DAY).done, true);
  assert.equal(formStatus(state, 'cap', 'C', t0 + 9 * DAY).answered, 1);
  assert.equal(nextFormItem(state, 'cap', 'C').id, c[1].id);
  assert.equal(nextFormItem(state, 'cap', 'E'), null);
  const d = itemsFor('cap', 'D');
  assert.equal(recordFormAnswer(state, d[0].id, wrongPick(d[0]), 'sure', t0 + 30 * DAY).bucket, 'hyper');
  assert.ok(state.review[d[0].id], 'D errors go to spaced review too');
  saveBench(s, state);
  assert.equal(formStatus(readBench(s), 'cap', 'D', t0 + 30 * DAY).answered, 1);
});

test('corrupt or foreign storage is cleaned on read', () => {
  const s = store();
  s.setItem(BENCH_KEY, JSON.stringify({
    exam: '__proto__', plans: {cap: {target: 'x', date: 'soon', minutes: 9999, level: 'Z9', intent: 5}, nope: {}},
    forms: {'cap:A': {answers: {'cap-a1': {pick: 99, conf: 'sure', at: 1}, 'cap-a2': {pick: 0, conf: 'maybe', at: 1}}}, 'zzz:A': {}},
    review: {'cap-a1': {step: 'x'}, ghost: {step: 1, due: 1, reviewed: 1}}, exposure: {cap: [0, 9, 'a', 0]}, wins: {cap: -3}
  }));
  const state = readBench(s);
  assert.equal(state.exam, 'cap');
  assert.deepEqual(Object.keys(state.forms), []);
  assert.deepEqual(state.review, {});
  assert.deepEqual(state.exposure.cap, [0]);
  assert.deepEqual(state.wins, {});
  assert.deepEqual(Object.keys(state.plans), ['cap']);
  assert.deepEqual(state.plans.cap, {target: 'basic', date: '', minutes: 120, level: '', intent: ''});
  s.setItem(BENCH_KEY, '{not json');
  assert.equal(readBench(s).exam, 'cap');
  assert.equal(saveBench({setItem() { throw new Error('full'); }}, state), false);
});

test('weekly plan follows the exam date, weakest skill and guided-hour gap', () => {
  const now = Date.parse('2026-11-28T10:00:00');
  assert.equal(phaseFor(null), 'open');
  assert.equal(phaseFor(-1), 'past');
  assert.equal(phaseFor(2), 'eve');
  assert.equal(phaseFor(20), 'sprint');
  assert.equal(phaseFor(60), 'build');
  assert.equal(phaseFor(200), 'base');
  assert.equal(daysUntil('2026-12-05', now), 7);
  assert.deepEqual(hoursNeeded('B1', 'B2'), [100, 250]);
  assert.deepEqual(hoursNeeded('C1', 'B2'), [0, 0]);
  assert.deepEqual(hoursNeeded('A2', 'A2'), [0, 0], 'same level counts as reached');
  assert.deepEqual(hoursNeeded('A1', 'A2'), [80, 110]);
  assert.equal(hoursNeeded('', 'B2'), null);

  const state = readBench(store());
  assert.equal(weakestSkill(state, 'tve').skill, 'reading', 'no data: highest point share first');
  const items = itemsFor('tve', 'A');
  for (const item of items) recordFormAnswer(state, item.id, item.skill === 'dialogue' ? wrongPick(item) : item.answer, 'sure', now - DAY);
  assert.equal(weakestSkill(state, 'tve').skill, 'dialogue');
  state.plans.tve = {target: 't70', date: '2027-04-24', minutes: 180, level: 'A2', intent: '如果放學回家'};
  const plan = buildPlan(state, 'tve', now);
  assert.equal(plan.phaseId, 'base');
  assert.equal(plan.weak.skill, 'dialogue');
  assert.ok(plan.blocks[0].label.includes('對話'));
  assert.equal(plan.blocks.reduce((n, b) => n + b.minutes, 0), 180);
  assert.deepEqual(plan.need, [150, 220]);
  assert.ok(plan.available > 0);
  const sprint = buildPlan({...state, plans: {tve: {...state.plans.tve, date: '2026-12-10'}}}, 'tve', now);
  assert.equal(sprint.phaseId, 'sprint');
  assert.ok(sprint.blocks.find(b => b.id === 'timed').minutes > plan.blocks.find(b => b.id === 'timed').minutes, 'more timed practice near the exam');
  const eve = buildPlan({...state, plans: {tve: {...state.plans.tve, date: '2026-11-30'}}}, 'tve', now);
  assert.equal(eve.blocks.some(b => b.id === 'weak' || b.id === 'timed'), false, 'no new weak-skill work or timed sets in the last three days');
  const ms = milestones(state, 'tve', now);
  assert.equal(ms[0].done, true);
  assert.equal(ms.length, 5);
  for (const exam of BENCH_EXAMS) assert.equal(exposureSteps(exam).length, 4);
});

test('page renders every exam, tab and an honest scope note', () => {
  const s = store();
  const html = renderExamBenchmark(s, Date.parse('2026-11-28T10:00:00'));
  for (const exam of BENCH_EXAMS) assert.ok(html.includes(`data-bench-exam="${exam.id}"`));
  for (const tab of ['map', 'check', 'plan', 'mind']) assert.ok(html.includes(`data-bench-tab="${tab}"`));
  assert.match(html, /CEFR 對標階梯/);
  assert.match(html, /不換算正式分數/);
  assert.match(html, /2026-11-28 查核/);
  assert.match(html, /A→D 四卷/);
  assert.match(html, /官方歷屆試題與模考/);
  assert.match(html, /cap\.rcpet\.edu\.tw\/examination\.html/);
  assert.doesNotMatch(html, /undefined|NaN|\[object Object\]/);
  const state = readBench(s);
  for (const exam of BENCH_EXAMS) {
    state.exam = exam.id;
    saveBench(s, state);
    const page = renderExamBenchmark(s, Date.parse('2026-11-28T10:00:00'));
    assert.ok(page.includes(exam.name.replace(/&/g, '&amp;')), `${exam.id} profile`);
    assert.ok(page.includes(exam.official[0].url.replace(/&/g, '&amp;')), `${exam.id} official link on the map tab`);
    assert.doesNotMatch(page, /undefined|NaN|\[object Object\]/);
  }
  // Check tab: four form cards, next form highlighted, trend table once two forms are done.
  state.exam = 'toeic';
  const t0 = Date.parse('2026-11-01T10:00:00');
  for (const form of ['A', 'B']) itemsFor('toeic', form).forEach((item, i) => recordFormAnswer(state, item.id, item.answer, 'sure', t0 + (form === 'B' ? 2 * DAY : 0) + i));
  saveBench(s, state);
  const check = renderExamBenchmark(s, t0 + 3 * DAY, 'check');
  for (const form of ['A', 'B', 'C', 'D']) assert.match(check, new RegExp(`<strong>${form} 卷</strong>`));
  assert.match(check, /bench-form is-next"><div><strong>C 卷/);
  assert.match(check, /還差約 6 天/);
  assert.match(check, /A → B：同技能、不同題目/);
  assert.match(check, /<table class="bench-trend">/);
  assert.match(check, /間隔滿 20 小時，算延後保留/);
  assert.match(check, /看 A 卷結果（6\/6）/);
  assert.doesNotMatch(check, /undefined|NaN|\[object Object\]/);
  const plan = renderExamBenchmark(s, t0 + 3 * DAY, 'plan');
  assert.ok(plan.includes('https://www.ets.org/toeic/test-takers/prepare.html'), 'timed block links official sample tests');
  const mind = renderExamBenchmark(s, t0 + 3 * DAY, 'mind');
  assert.match(mind, /用官方歷屆試題或官方模考/);
  renderExamBenchmark(s, t0, 'map');
});

test('route, navigation, backup key, stylesheet, branch deep links and cache keys are wired', () => {
  const app = fs.readFileSync('dist/app.js', 'utf8');
  const index = fs.readFileSync('dist/index.html', 'utf8');
  const start = fs.readFileSync('dist/start.mjs', 'utf8');
  assert.match(app, /import \{renderExamBenchmark, bindExamBenchmark\} from '\.\/exam_benchmark\.mjs\?v=benchcd20261128'/);
  assert.match(app, /benchmark: renderExamBenchmark/);
  assert.match(app, /bindExamBenchmark\(root\)/);
  assert.match(app, /\['benchmark', '14', '🧭 考試對標羅盤'\]/);
  assert.match(app, /'studio','benchmark','exams'/);
  assert.match(app, /href="#benchmark"/);
  assert.doesNotMatch(app, /命中率提升 40%/);
  assert.doesNotMatch(app, /單選語法 \(15題\)/);
  assert.match(index, /exam_benchmark\.css\?v=benchcd20261128/);
  assert.match(start, /href="#benchmark"/);
  assert.match(start, /app\.js\?v=benchcd20261128/);
  assert.ok(STORAGE_KEYS.includes(BENCH_KEY));
  const ul = fs.readFileSync('dist/ultralearning_engine.mjs', 'utf8');
  assert.doesNotMatch(ul, /穩拿 85%|總分衝刺 860|考試就緒度/);
  const index2 = JSON.parse(fs.readFileSync('dist/quest/course/index.json', 'utf8'));
  const course = createCourse(index2);
  for (const id of ['b-cap', 'b-gsat', 'b-voc', 'b-toeic']) assert.equal(requestedLearningTrack(`#learn/${id}`, course), id);
  // Every in-site link used by the plan points to a real quest branch or app route.
  const branches = new Set(index2.branches.map(b => b.id));
  for (const exam of BENCH_EXAMS) {
    for (const link of [...Object.values(exam.practice), MIXED_PRACTICE[exam.id]]) {
      const m = /^quest\/#learn\/(.+)$/.exec(link.href);
      if (m) assert.ok(branches.has(m[1]), `${exam.id} links to missing branch ${m[1]}`);
      else assert.match(link.href, /^(#[a-z]+(\/path)?|quest\/#(exams\/(toeic|sat|gre|gmat)|practice)|quest\/simulation\.html)$/, `${exam.id} link ${link.href}`);
    }
  }
});
