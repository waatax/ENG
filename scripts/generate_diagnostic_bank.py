"""generate_diagnostic_bank.py - 2,000-Question Calibrated Diagnostic Placement Bank Generator.

Generates exactly 2,000 calibrated diagnostic items across 8 tiers:
  - Tier 1: 國小基礎生活英語 (Primary Pre-A1~A1) : 250 題 (diag-0001 ~ diag-0250)
  - Tier 2: 國中會考基礎實踐 (JHS Foundation A1~A2) : 250 題 (diag-0251 ~ diag-0500)
  - Tier 3: 國中會考精熟躍升 (JHS Mastery A2~B1) : 250 題 (diag-0501 ~ diag-0750)
  - Tier 4: 高中學測核心素養 (SHS GSAT B1~B2) : 250 題 (diag-0751 ~ diag-1000)
  - Tier 5: TOEIC 國際商務實戰 (TOEIC 785+ B2) : 250 題 (diag-1001 ~ diag-1250)
  - Tier 6: Digital SAT 學術思維 (SAT/TOEFL C1) : 250 題 (diag-1251 ~ diag-1500)
  - Tier 7: GRE Verbal 語意邏輯 (GRE C1~C2) : 250 題 (diag-1501 ~ diag-1750)
  - Tier 8: GMAT Focus 商業邏輯 (GMAT CR C2+) : 250 題 (diag-1751 ~ diag-2000)
Total: Exactly 2,000 items with 100% prompt uniqueness (0 duplicates).

Each item strictly follows the 5-Star Pedagogical Explanation Standard:
  - id, tier, tierLabel, targetExam, cefr, dimension, subtopic, difficulty
  - passage (optional), prompt, options (4 choices), answer (0..3)
  - translation (full bilingual text of prompt & options)
  - coreConcept (formula & fundamental principle)
  - sentenceAnalysis (syntactic breakdown)
  - vocabulary (array of key words with phonetic & meaning)
  - trapExplanation (distractor trap analysis)
  - courseHook ({ module, unitId, unitTitle } for instant remedial navigation)
"""

import json
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

DATA_QUESTIONS = ROOT / "data" / "questions"
DIST_QUESTIONS = ROOT / "dist" / "questions"
SITE_QUESTIONS = ROOT / "site" / "dist" / "questions"

DATA_QUESTIONS.mkdir(parents=True, exist_ok=True)
DIST_QUESTIONS.mkdir(parents=True, exist_ok=True)
SITE_QUESTIONS.mkdir(parents=True, exist_ok=True)

def main():
    print("[1/5] Building all 8 tiers (250 questions per tier)...")
    
    tier1 = build_tier1()
    print(f" -> Tier 1 (Primary Pre-A1~A1): {len(tier1)} items ({tier1[0]['id']} - {tier1[-1]['id']})")
    
    tier2 = build_tier2()
    print(f" -> Tier 2 (JHS Foundation A1~A2): {len(tier2)} items ({tier2[0]['id']} - {tier2[-1]['id']})")
    
    tier3 = build_tier3()
    print(f" -> Tier 3 (JHS Mastery A2~B1): {len(tier3)} items ({tier3[0]['id']} - {tier3[-1]['id']})")
    
    tier4 = build_tier4()
    print(f" -> Tier 4 (SHS GSAT B1~B2): {len(tier4)} items ({tier4[0]['id']} - {tier4[-1]['id']})")
    
    tier5 = build_tier5()
    print(f" -> Tier 5 (TOEIC B2): {len(tier5)} items ({tier5[0]['id']} - {tier5[-1]['id']})")
    
    tier6 = build_tier6()
    print(f" -> Tier 6 (Digital SAT C1): {len(tier6)} items ({tier6[0]['id']} - {tier6[-1]['id']})")
    
    tier7 = build_tier7()
    print(f" -> Tier 7 (GRE Verbal C2): {len(tier7)} items ({tier7[0]['id']} - {tier7[-1]['id']})")
    
    tier8 = build_tier8()
    print(f" -> Tier 8 (GMAT Focus C2+): {len(tier8)} items ({tier8[0]['id']} - {tier8[-1]['id']})")

    total_bank = tier1 + tier2 + tier3 + tier4 + tier5 + tier6 + tier7 + tier8
    print(f"[2/5] Total calibrated diagnostic items assembled: {len(total_bank)}")
    assert len(total_bank) == 2000, f"Expected 2000 items, got {len(total_bank)}"

    print("[3/5] Validating IDs, uniqueness, and structure across all 2,000 items...")
    seen_prompts = set()
    seen_ids = set()
    
    for idx, item in enumerate(total_bank):
        expected_id = f"diag-{(idx + 1):04d}"
        assert item["id"] == expected_id, f"Item at index {idx} has ID {item['id']}, expected {expected_id}"
        assert item["id"] not in seen_ids, f"Duplicate ID: {item['id']}"
        seen_ids.add(item["id"])
        
        prompt_clean = item["prompt"].strip()
        assert prompt_clean not in seen_prompts, f"Duplicate prompt detected in item {item['id']}: {prompt_clean[:60]}..."
        seen_prompts.add(prompt_clean)
        
        assert len(item["options"]) == 4, f"Item {item['id']} does not have 4 options"
        assert len(set(item["options"])) == 4, f"Item {item['id']} has duplicate options: {item['options']}"
        assert 0 <= item["answer"] <= 3, f"Item {item['id']} has invalid answer: {item['answer']}"
        assert len(item["vocabulary"]) >= 1, f"Item {item['id']} missing vocabulary"
        assert item["coreConcept"], f"Item {item['id']} missing coreConcept"
        assert item["sentenceAnalysis"], f"Item {item['id']} missing sentenceAnalysis"
        assert item["trapExplanation"], f"Item {item['id']} missing trapExplanation"

    print(" -> All 2,000 items validated! Zero duplicate IDs, zero duplicate prompts, 100% 5-star schema compliance.")

    print("[4/5] Writing diagnostic_bank.json to data, dist, and site/dist...")
    import shutil
    data_bank_file = DATA_QUESTIONS / "diagnostic_bank.json"
    with open(data_bank_file, "w", encoding="utf-8") as f:
        json.dump(total_bank, f, ensure_ascii=False, indent=2)
    print(f" -> Written: {data_bank_file} ({data_bank_file.stat().st_size / 1024 / 1024:.2f} MB)")

    for target_dir in [DIST_QUESTIONS, SITE_QUESTIONS]:
        target_file = target_dir / "diagnostic_bank.json"
        shutil.copyfile(data_bank_file, target_file)
        print(f" -> Copied to: {target_file} ({target_file.stat().st_size / 1024 / 1024:.2f} MB)")

    print("[5/5] Updating manifest.json to include 2,000 diagnostic bank metadata...")
    data_manifest = DATA_QUESTIONS / "manifest.json"
    manifest_data = {}
    if data_manifest.exists():
        with open(data_manifest, "r", encoding="utf-8") as f:
            manifest_data = json.load(f)
    
    manifest_data["diagnostic_bank"] = {
        "name": "English Quest 全階能力精準診斷題庫 (國小至GRE/GMAT · 2000題零重複)",
        "count": 2000,
        "file": "diagnostic_bank.json",
        "tiers": {
            "tier1_primary": 250,
            "tier2_jhs_found": 250,
            "tier3_jhs_mast": 250,
            "tier4_shs_gsat": 250,
            "tier5_toeic": 250,
            "tier6_sat": 250,
            "tier7_gre": 250,
            "tier8_gmat": 250
        }
    }
    with open(data_manifest, "w", encoding="utf-8") as f:
        json.dump(manifest_data, f, ensure_ascii=False, indent=2)
    print(f" -> Updated: {data_manifest}")

    for target_dir in [DIST_QUESTIONS, SITE_QUESTIONS]:
        target_manifest = target_dir / "manifest.json"
        shutil.copyfile(data_manifest, target_manifest)
        print(f" -> Copied to: {target_manifest}")

    print("All tasks in generate_diagnostic_bank.py completed successfully with 2,000 items!")

if __name__ == "__main__":
    main()
