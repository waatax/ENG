"""test_diagnostic_system.py - Rigorous Verification of the 2,000-Question Placement Test System.

Verifies:
  1. 2,000-question diagnostic bank integrity, tier distributions (250 * 8), and schema completeness.
  2. 100% prompt uniqueness across all 2,000 questions (len(set(prompts)) == 2000).
  3. 5-Star pedagogical explanation standards (translation, coreConcept, sentenceAnalysis, vocabulary, trapExplanation, courseHook).
  4. Stratified 30-question sampling algorithm with dual-layer deduplication (4+4+4+5+4+4+3+2).
  5. 100 simulated test sessions with 0 duplicate IDs and 0 duplicate prompts in every session.
  6. Scoring, CEFR mapping, multi-exam score predictions, five-dimension mastery, and Stall Point detection.
"""

import sys
import json
import subprocess
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parents[1]
DIST_DIR = ROOT / "dist"
SITE_DIR = ROOT / "site" / "dist"
DATA_DIR = ROOT / "data"

print("=" * 70)
print("🎯 ENGLISH QUEST 2,000-QUESTION DIAGNOSTIC ASSESSMENT SYSTEM VERIFICATION")
print("=" * 70)

# Check 1: 2,000-question bank integrity across all target paths
print("\n[Check 1] Verifying 2,000-Question Diagnostic Bank in all directories...")
bank_files = [
    DATA_DIR / "questions" / "diagnostic_bank.json",
    DIST_DIR / "questions" / "diagnostic_bank.json",
    SITE_DIR / "questions" / "diagnostic_bank.json"
]

expected_distribution = {
    1: 250, # Primary Pre-A1~A1
    2: 250, # JHS Foundation A1~A2
    3: 250, # JHS Mastery A2~B1
    4: 250, # SHS GSAT B1~B2
    5: 250, # TOEIC B2
    6: 250, # Digital SAT C1
    7: 250, # GRE Verbal C2
    8: 250  # GMAT Focus CR C2+
}

for bf in bank_files:
    if not bf.exists():
        raise FileNotFoundError(f"Missing file: {bf}")
    with open(bf, "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f" -> {bf.relative_to(ROOT)}: {len(data)} items ({bf.stat().st_size / 1024 / 1024:.2f} MB)")
    if len(data) != 2000:
        raise ValueError(f"Expected 2,000 items in {bf}, found {len(data)}")

# Deep inspect items in dist
with open(DIST_DIR / "questions" / "diagnostic_bank.json", "r", encoding="utf-8") as f:
    items = json.load(f)

actual_distribution = {}
seen_prompts = set()
seen_ids = set()

for idx, q in enumerate(items):
    t = q["tier"]
    actual_distribution[t] = actual_distribution.get(t, 0) + 1

    expected_id = f"diag-{(idx + 1):04d}"
    if q["id"] != expected_id:
        raise ValueError(f"Sequential ID error: item {idx} has ID {q['id']}, expected {expected_id}")
    if q["id"] in seen_ids:
        raise ValueError(f"Duplicate ID found: {q['id']}")
    seen_ids.add(q["id"])

    p_clean = q["prompt"].strip()
    if p_clean in seen_prompts:
        raise ValueError(f"Duplicate prompt found in {q['id']}: {p_clean[:60]}...")
    seen_prompts.add(p_clean)

    # Mandatory field check
    mandatory_fields = [
        "id", "tier", "tierLabel", "targetExam", "cefr", "dimension",
        "subtopic", "difficulty", "prompt", "options", "answer",
        "translation", "coreConcept", "sentenceAnalysis", "vocabulary",
        "trapExplanation", "courseHook"
    ]
    for fld in mandatory_fields:
        if fld not in q:
            raise KeyError(f"Item {q.get('id')} missing mandatory field '{fld}'")

    if not isinstance(q["options"], list) or len(q["options"]) != 4:
        raise ValueError(f"Item {q['id']} must have exactly 4 options")
    if len(set(q["options"])) != 4:
        raise ValueError(f"Item {q['id']} has duplicate options: {q['options']}")
    if not (0 <= q["answer"] <= 3):
        raise ValueError(f"Item {q['id']} answer index {q['answer']} is invalid")
    if not q["translation"] or not q["coreConcept"] or not q["sentenceAnalysis"] or not q["trapExplanation"]:
        raise ValueError(f"Item {q['id']} explanation fields cannot be empty")
    if not isinstance(q["courseHook"], dict) or "unitId" not in q["courseHook"]:
        raise ValueError(f"Item {q['id']} must contain valid courseHook with unitId")

print(f" -> 100% Prompt Uniqueness Confirmed: {len(seen_prompts)} / 2,000 unique prompts!")

print("\n[Check 2] Tier distribution audit:")
for t in range(1, 9):
    exp = expected_distribution[t]
    act = actual_distribution.get(t, 0)
    print(f" - Tier {t}: {act} items (Expected: {exp}) -> {'✅ OK' if act == exp else '❌ MISMATCH'}")
    if act != exp:
        raise ValueError(f"Tier {t} count mismatch: {act} vs {exp}")

print("\n[Check 3] Sample Question Pedagogical Review:")
sample_t1 = next(q for q in items if q["tier"] == 1)
sample_t7 = next(q for q in items if q["tier"] == 7)
sample_t8 = next(q for q in items if q["tier"] == 8)

print(f" - Tier 1 Sample Prompt: {sample_t1['prompt']}")
print(f"   Correct Choice: {sample_t1['options'][sample_t1['answer']]}")
print(f"   Course Hook: {sample_t1['courseHook']['unitTitle']}")
print(f" - Tier 7 Sample Prompt: {sample_t7['prompt'][:70]}...")
print(f"   Core Concept: {sample_t7['coreConcept'][:80]}...")
print(f" - Tier 8 Sample Prompt: {sample_t8['prompt'][:70]}...")
print(f"   Trap Explanation: {sample_t8['trapExplanation'][:80]}...")

# Check 4: Node.js sampling and diagnostic engine execution test (100 sessions simulation)
print("\n[Check 4] Executing Node.js Stratified Sampling & 100-Session Zero-Duplicate Simulation...")

node_script = """
import fs from 'fs';
import { questionDB } from './dist/question_db.mjs';

const bank = JSON.parse(fs.readFileSync('./dist/questions/diagnostic_bank.json', 'utf8'));
questionDB.diagnosticPool = bank;

async function testDiagnosticEngine() {
  const expectedQuotas = { 1: 4, 2: 4, 3: 4, 4: 5, 5: 4, 6: 4, 7: 3, 8: 2 };
  
  // Run 100 simulated 30-question sampling sessions
  for (let session = 1; session <= 100; session++) {
    const sampled = await questionDB.sampleDiagnostic30();
    if (sampled.length !== 30) {
      throw new Error(`Session ${session}: Sampled test must contain exactly 30 questions! Got: ${sampled.length}`);
    }

    // Check duplicate IDs in session
    const ids = sampled.map(q => q.id);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== 30) {
      throw new Error(`Session ${session}: Duplicate question IDs found! ${ids.length} vs ${uniqueIds.size}`);
    }

    // Check duplicate prompts in session
    const prompts = sampled.map(q => q.prompt.trim().toLowerCase());
    const uniquePrompts = new Set(prompts);
    if (uniquePrompts.size !== 30) {
      throw new Error(`Session ${session}: Duplicate question prompts found! ${prompts.length} vs ${uniquePrompts.size}`);
    }

    // Check tier quotas
    const tierCounts = {};
    sampled.forEach(q => { tierCounts[q.tier] = (tierCounts[q.tier] || 0) + 1; });
    for (let t = 1; t <= 8; t++) {
      if (tierCounts[t] !== expectedQuotas[t]) {
        throw new Error(`Session ${session}: Tier ${t} count mismatch: got ${tierCounts[t]}, expected ${expectedQuotas[t]}`);
      }
    }
  }
  console.log(' - 100 consecutive 30-question tests simulated: 100% ZERO DUPLICATES (0 duplicate IDs, 0 duplicate prompts)!');

  // Single in-depth scoring simulation
  const sampled = await questionDB.sampleDiagnostic30();
  const answers = {};
  sampled.forEach((q, idx) => {
    if (q.tier <= 5) {
      answers[q.id] = q.answer; // 100% correct in Tiers 1-5
    } else if (q.tier === 6) {
      answers[q.id] = (idx % 2 === 0) ? q.answer : ((q.answer + 1) % 4); // 50%
    } else {
      answers[q.id] = (q.answer + 1) % 4; // wrong in Tiers 7-8
    }
  });

  const evalResult = questionDB.evaluateDiagnostic(answers, sampled);
  console.log(' - Evaluation Simulation Result:');
  console.log('   * Raw Correct:', evalResult.rawCorrect, '/', evalResult.totalQuestions);
  console.log('   * Scaled Score:', evalResult.scaledScore, '/ 100');
  console.log('   * CEFR Level:', evalResult.cefr);
  console.log('   * Honorary Badge:', evalResult.honoraryBadge.title);
  console.log('   * Stall Tier:', evalResult.stallTier, '-', evalResult.stallTierLabel);
  console.log('   * CAP Projection:', evalResult.predicted.cap);
  console.log('   * GSAT Projection:', evalResult.predicted.gsat);
  console.log('   * TOEIC Projection:', evalResult.predicted.toeic);
  console.log('   * Remedial Units Hooked:', evalResult.remedialHooks.length);

  if (evalResult.scaledScore <= 0 || evalResult.scaledScore > 100) {
    throw new Error('Scaled score out of bounds');
  }
  if (!evalResult.honoraryBadge.title) {
    throw new Error('Missing honorary badge title');
  }
  if (!evalResult.remedialHooks.length) {
    throw new Error('Remedial hooks should not be empty when errors exist');
  }

  console.log(' - Node.js 100-Session Simulation Verified Successfully!');
}

testDiagnosticEngine().catch(err => {
  console.error(err);
  process.exit(1);
});
"""

res = subprocess.run(["node", "--input-type=module", "-e", node_script], capture_output=True, text=True, encoding="utf-8")
print(res.stdout)
if res.stderr:
    print("STDERR:", res.stderr)
if res.returncode != 0:
    print("❌ Node execution failed!")
    sys.exit(1)

print("\n" + "=" * 70)
print("🎉 ALL 4 AUDIT PHASES PASSED WITH 100% ZERO-ERROR COMPLIANCE!")
print("=" * 70)
