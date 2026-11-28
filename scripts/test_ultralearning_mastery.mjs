import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  UL_STORAGE_KEY,
  LEARNING_PILLARS,
  STAGE_EXAM_BLUEPRINTS,
  readUltralearningState,
  recordUltralearningAnswer,
  toggleExposureStep,
  setUltralearningStage,
  resetUltralearningStage,
  evaluateSweetSpot,
  computeStageReadiness,
  renderUltralearningMasteryHub,
  renderAllStagesReadinessOverview
} from '../dist/ultralearning_engine.mjs';
import { STORAGE_KEYS } from '../dist/mastery_passport.mjs';

function makeStore() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k)
  };
}

test('Ultralearning + Get Better at Anything covers 3 pillars and all 5 English exam stages with complete distractor feedback', () => {
  assert.deepEqual(LEARNING_PILLARS.map((p) => p.id), ['see', 'do', 'feedback']);
  assert.deepEqual(STAGE_EXAM_BLUEPRINTS.map((b) => b.id), ['elementary', 'junior', 'senior', 'career', 'academic']);

  for (const bp of STAGE_EXAM_BLUEPRINTS) {
    assert.ok(bp.metalearning.concepts.length >= 3, `${bp.id} needs >= 3 concepts`);
    assert.ok(bp.metalearning.facts.length >= 2, `${bp.id} needs >= 2 facts`);
    assert.ok(bp.metalearning.procedures.length >= 2, `${bp.id} needs >= 2 procedures`);
    assert.ok(bp.seeWorkedExample.steps.length >= 3, `${bp.id} needs 3-step Cognitive Task Analysis`);
    assert.ok(bp.seeWorkedExample.feynman.length >= 15, `${bp.id} needs Feynman intuition`);
    assert.equal(bp.unlearnTraps.length, 3, `${bp.id} needs 3 Unlearning traps`);
    assert.equal(bp.exposureLadder.length, 3, `${bp.id} needs 3 Exposure ladder steps`);
    assert.equal(bp.drills.length, 3, `${bp.id} needs 3 Interleaved Retrieval drills`);

    for (const d of bp.drills) {
      assert.equal(d.options.length, 4, `${d.id} needs 4 options`);
      for (let i = 0; i < d.options.length; i++) {
        if (i !== d.answer) {
          assert.ok(d.wrong?.[String(i)]?.length >= 10, `${d.id} option ${i} missing corrective feedback`);
        }
      }
    }
  }
});

test('Sweet Spot evaluator and 85% Mastery Gate accurately track readiness, feedback and reset', () => {
  assert.equal(evaluateSweetSpot(0, 0).zone, 'unstarted');
  assert.equal(evaluateSweetSpot(1, 3).zone, 'overload');
  assert.equal(evaluateSweetSpot(8, 10).zone, 'sweet-spot');
  assert.equal(evaluateSweetSpot(3, 3).zone, 'too-easy');

  const store = makeStore();
  setUltralearningStage('junior', store);
  const jh = STAGE_EXAM_BLUEPRINTS.find((b) => b.id === 'junior');

  // Answer 1 wrong -> corrective feedback rendered
  const wrongIdx = (jh.drills[0].answer + 1) % 4;
  recordUltralearningAnswer(jh.drills[0].id, wrongIdx, store);
  let state = readUltralearningState(store);
  const htmlWrong = renderUltralearningMasteryHub({ forceStage: 'junior', state });
  assert.match(htmlWrong, /錯在哪裡（Corrective）/);
  assert.match(htmlWrong, /data-ul-reset-stage="junior"/);

  // Answer all 3 right + all 3 exposure steps -> 100% readiness and passedGate === true
  for (const d of jh.drills) recordUltralearningAnswer(d.id, d.answer, store);
  for (let i = 0; i < 3; i++) toggleExposureStep('junior', i, store);
  state = readUltralearningState(store);
  const metrics = computeStageReadiness('junior', state);
  assert.equal(metrics.readiness, 100);
  assert.equal(metrics.passedGate, true);

  // Reset stage drills clears answers cleanly
  resetUltralearningStage('junior', store);
  const afterReset = computeStageReadiness('junior', readUltralearningState(store));
  assert.equal(afterReset.attempted, 0);
  assert.equal(afterReset.exposureDone, 3);
});

test('Ultralearning engine is wired into JH, Exams, Progress, School, Home, HTML and Full-Site Backup', () => {
  assert.ok(STORAGE_KEYS.includes(UL_STORAGE_KEY), 'Full-site backup must include eq_ultralearning_v1');

  const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
  const questHtml = fs.readFileSync('dist/quest/index.html', 'utf8');
  const appJs = fs.readFileSync('dist/app.js', 'utf8');
  const schoolView = fs.readFileSync('dist/quest/school_view.mjs', 'utf8');
  const homeJs = fs.readFileSync('dist/home_experience.mjs', 'utf8');

  assert.match(indexHtml, /ultralearning_mastery\.css/);
  assert.match(questHtml, /ultralearning_mastery\.css/);
  assert.match(appJs, /renderUltralearningMasteryHub/);
  assert.match(appJs, /renderAllStagesReadinessOverview/);
  assert.match(appJs, /\['ultralearning','學習方法與示範'\]/);
  assert.match(appJs, /renderUltralearningMasteryHub\(\{ forceStage: 'junior' \}\)/);
  assert.match(appJs, /jh-retrieval-box/);
  assert.match(schoolView, /school-sdf-banner/);
  assert.match(homeJs, /SEE · DO · FEEDBACK · RETAIN/);

  const overview = renderAllStagesReadinessOverview();
  assert.match(overview, /五階段示範練習總覽/);
  assert.doesNotMatch(overview, /就緒/, 'Three demo items must not be presented as exam readiness');
  assert.match(overview, /href="#benchmark"/);
});
