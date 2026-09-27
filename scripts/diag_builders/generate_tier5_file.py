# scripts/diag_builders/generate_tier5_file.py
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from scripts.diag_builders.create_tier5 import subtopics as sub1
from scripts.diag_builders.tier5_part2_data import subtopics_16_to_25 as sub2

all_subtopics = sub1 + sub2
assert len(all_subtopics) == 25, f"Expected 25 subtopics, got {len(all_subtopics)}"
total_qs = sum(len(s[3]) for s in all_subtopics)
assert total_qs == 250, f"Expected 250 questions, got {total_qs}"

output_path = Path(__file__).resolve().parent / "tier5_toeic.py"

header = '''"""tier5_toeic.py - Tier 5: TOEIC 國際商務實戰 (TOEIC B2) 250 Questions Generator.
IDs: diag-1001 to diag-1250.
"""

def make_q(q_id, subtopic, dim, hook, prompt, corr, d1, d2, d3, trans, concept, trap, w1, p1, m1, w2, p2, m2):
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

    formatted_trans = f"【題幹精譯】{trans}\\n【選項列表】" + "  ".join([
        f"{opt_letters[i]}. {options[i]}" for i in range(4)
    ])
    full_trap = f"【選項剖析】正確答案為 ({ans_letter})「{corr}」。{trap}"

    hook_obj = {
        "module": hook.split("-")[0].lower() if isinstance(hook, str) and "-" in hook else "toeic",
        "unitId": hook if isinstance(hook, str) else (hook.get("unitId", "toeic-u1") if isinstance(hook, dict) else "toeic-u1"),
        "unitTitle": f"{subtopic} 核心微課" if isinstance(hook, str) else (hook.get("unitTitle", subtopic) if isinstance(hook, dict) else subtopic)
    }

    return {
        "id": f"diag-{q_id:04d}",
        "tier": 5,
        "tierLabel": "Level 5: TOEIC 國際商務實戰 (TOEIC B2)",
        "targetExam": "多益高分 (TOEIC)",
        "cefr": "B2",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 4,
        "passage": None,
        "prompt": prompt,
        "options": options,
        "answer": ans_idx,
        "translation": formatted_trans,
        "coreConcept": concept,
        "sentenceAnalysis": "標準國際商務專業英文結構：主從架構完整，邏輯語意與專業商務搭配精準明確。",
        "vocabulary": [
            {"word": w1, "phonetic": p1, "meaning": m1},
            {"word": w2, "phonetic": p2, "meaning": m2}
        ],
        "trapExplanation": full_trap,
        "courseHook": hook_obj
    }

def build_tier5():
    items = []
    q_counter = 1001
    
    subtopics_data = '''

import pprint

with open(output_path, "w", encoding="utf-8") as f:
    f.write(header)
    f.write(pprint.pformat(all_subtopics, width=120, compact=False))
    f.write('''

    for sub_title, dim, hook, q_list in subtopics_data:
        for q_tuple in q_list:
            prompt, corr, d1, d2, d3, trans, concept, trap, w1, p1, m1, w2, p2, m2 = q_tuple
            items.append(make_q(
                q_counter, sub_title, dim, hook, prompt, corr, d1, d2, d3, trans, concept, trap, w1, p1, m1, w2, p2, m2
            ))
            q_counter += 1

    return items
''')

print("tier5_toeic.py written successfully!")
