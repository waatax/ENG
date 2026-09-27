# scripts/diag_builders/generate_tier8_file.py
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from scripts.diag_builders.tier8_part1_data import subtopics_1_to_12
from scripts.diag_builders.tier8_part2a_data import subtopics_13_to_18
from scripts.diag_builders.tier8_part2b_data import subtopics_19_to_25

all_subtopics = subtopics_1_to_12 + subtopics_13_to_18 + subtopics_19_to_25
assert len(all_subtopics) == 25, f"Expected 25 subtopics, got {len(all_subtopics)}"
total_qs = sum(len(s[3]) for s in all_subtopics)
assert total_qs == 250, f"Expected 250 questions, got {total_qs}"

output_path = Path(__file__).resolve().parent / "tier8_gmat.py"

header = '''"""tier8_gmat.py - Tier 8: GMAT Focus 商業邏輯 (GMAT C2+) 250 Questions Generator.
IDs: diag-1751 to diag-2000.
"""

def make_q(q_id, subtopic, dim, hook, prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2):
    ans_idx = (q_id - 1) % 4
    d_list = [d1, d2, d3]
    options = []
    d_ptr = 0
    for i in range(4):
        if i == ans_idx:
            options.append(corr)
        else:
            options.append(d_list[d_ptr])
            d_ptr += 1

    opt_letters = ["A", "B", "C", "D"]
    ans_letter = opt_letters[ans_idx]

    formatted_trans = f"【題幹精譯與邏輯分析】{trans}\\n【選項列表】" + "  ".join([
        f"{opt_letters[i]}. {options[i]}" for i in range(4)
    ])
    full_trap = f"【選項剖析】正確答案為 ({ans_letter})「{corr}」。{concept} 此項精準鎖定核心邏輯因果關係，其餘干擾選項若非偏離討論範疇 (Out of Scope)，即為混淆充分與必要條件、或反向削弱/支持。"

    hook_obj = {
        "module": hook.split("-")[0].lower() if isinstance(hook, str) and "-" in hook else "gmat",
        "unitId": hook if isinstance(hook, str) else (hook.get("unitId", "gmat-u1") if isinstance(hook, dict) else "gmat-u1"),
        "unitTitle": f"{subtopic} 核心微課" if isinstance(hook, str) else (hook.get("unitTitle", subtopic) if isinstance(hook, dict) else subtopic)
    }

    return {
        "id": f"diag-{q_id:04d}",
        "tier": 8,
        "tierLabel": "Level 8: GMAT Focus 商業邏輯 (GMAT C2+)",
        "targetExam": "GMAT 批判推理 (GMAT CR)",
        "cefr": "C2+",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 5,
        "passage": None,
        "prompt": prompt,
        "options": options,
        "answer": ans_idx,
        "translation": formatted_trans,
        "coreConcept": concept,
        "sentenceAnalysis": "GMAT Focus 批判推理高階商業思維模型：要求嚴密辨識論點隱含前提 (Suppressed Premises)、因果混雜變數與量價/經濟學權衡機制。",
        "vocabulary": [
            {"word": w1, "phonetic": p1, "meaning": m1},
            {"word": w2, "phonetic": p2, "meaning": m2}
        ],
        "trapExplanation": full_trap,
        "courseHook": hook_obj
    }

def build_tier8():
    items = []
    q_counter = 1751
    
    subtopics_data = '''

import pprint

with open(output_path, "w", encoding="utf-8") as f:
    f.write(header)
    f.write(pprint.pformat(all_subtopics, width=120, compact=False))
    f.write('''

    for sub_title, dim, hook, q_list in subtopics_data:
        for q_tuple in q_list:
            prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2 = q_tuple
            items.append(make_q(
                q_counter, sub_title, dim, hook, prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2
            ))
            q_counter += 1

    return items
''')

print("tier8_gmat.py written successfully!")
