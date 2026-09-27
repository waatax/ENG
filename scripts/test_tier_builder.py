import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scripts.diag_builders.tier1_primary import build_tier1
from scripts.diag_builders.tier2_jhs_foundation import build_tier2
from scripts.diag_builders.tier3_jhs_mastery import build_tier3
from scripts.diag_builders.tier4_shs_gsat import build_tier4
from scripts.diag_builders.tier5_toeic import build_tier5
from scripts.diag_builders.tier6_sat import build_tier6
from scripts.diag_builders.tier7_gre import build_tier7
from scripts.diag_builders.tier8_gmat import build_tier8

t1 = build_tier1()
t2 = build_tier2()
t3 = build_tier3()
t4 = build_tier4()
t5 = build_tier5()
t6 = build_tier6()
t7 = build_tier7()
t8 = build_tier8()

print(f"Tier 1: {len(t1)}, Tier 2: {len(t2)}, Tier 3: {len(t3)}, Tier 4: {len(t4)}, Tier 5: {len(t5)}, Tier 6: {len(t6)}, Tier 7: {len(t7)}, Tier 8: {len(t8)}")
combined = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8
print(f"Combined T1-T8: {len(combined)}, Unique prompts: {len(set(q['prompt'] for q in combined))}")

# Check IDs
ids = [q['id'] for q in combined]
print(f"First ID: {ids[0]}, Last ID: {ids[-1]}, Unique IDs: {len(set(ids))}")
assert len(ids) == 2000
assert len(set(ids)) == 2000
assert ids[0] == "diag-0001"
assert ids[-1] == "diag-2000"

# Check prompt uniqueness
assert len(combined) == 2000
assert len(set(q['prompt'] for q in combined)) == 2000, f"Duplicate prompts found: {len(combined) - len(set(q['prompt'] for q in combined))}"

# Check options uniqueness within each question
for q in combined:
    assert len(q['options']) == 4, f"Question {q['id']} does not have 4 options"
    assert len(set(q['options'])) == 4, f"Question {q['id']} has duplicate options: {q['options']}"
    assert 0 <= q['answer'] <= 3, f"Question {q['id']} has invalid answer index {q['answer']}"

print("ALL 8 TIERS (2000 questions) PERFECTLY VERIFIED WITH 100% UNIQUE PROMPTS AND VALID STRUCTURE!")
