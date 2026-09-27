# scripts/diag_builders/generate_tier6_file.py
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(ROOT))

from scripts.diag_builders.tier6_part1_data import subtopics_1_to_13
from scripts.diag_builders.tier6_part2_data import subtopics_14_to_25
from scripts.diag_builders.tier6_additions import (
    sub16_more, sub17_more, sub18_more, sub19_more,
    sub20_more, sub21_more, sub24_more, sub25_more
)

# Note: In subtopics_1_to_13, subtopic 5 had 2 lists in drafting, let's normalize it:
normalized_all = []

# Process part 1
for item in subtopics_1_to_13:
    if len(item) == 4:
        sub_title, dim, hook, q_list = item
        normalized_all.append((sub_title, dim, hook, q_list))
    elif len(item) == 5: # if subtopic 5 had 2 batches
        sub_title, dim, hook, q_list1, q_list2 = item
        normalized_all.append((sub_title, dim, hook, q_list1 + q_list2))

# Map of additional items for part 2
more_map = {
    "Central Ideas & Thematic Claims": sub16_more,
    "Textual Evidence: Hypotheses Support/Weaken": sub17_more,
    "Quantitative Literacy: Data Trends": sub18_more,
    "Cross-Textual Connections: Scholarly Debate": sub19_more,
    "Rhetorical Function: Sentence Purpose": sub20_more,
    "Authorial Tone & Academic Stance": sub21_more,
    "Sentence Placement & Cohesive Flow": sub24_more,
    "Pragmatic Inference & Implicit Assumptions": sub25_more
}

# Process part 2
for item in subtopics_14_to_25:
    sub_title, dim, hook, q_list = item
    if sub_title in more_map:
        q_list = q_list + more_map[sub_title]
    normalized_all.append((sub_title, dim, hook, q_list))

print(f"Total subtopics in Tier 6: {len(normalized_all)}")
for i, s in enumerate(normalized_all):
    print(f"  Subtopic {i+1}: {s[0]} ({len(s[3])} items)")

total_qs = sum(len(s[3]) for s in normalized_all)
print(f"Total questions in Tier 6: {total_qs}")
assert len(normalized_all) == 25, f"Expected 25 subtopics, got {len(normalized_all)}"
assert total_qs == 250, f"Expected 250 questions, got {total_qs}"

output_path = Path(__file__).resolve().parent / "tier6_sat.py"

header = '''"""tier6_sat.py - Tier 6: Digital SAT 學術思維 (SAT B2~C1) 250 Questions Generator.
IDs: diag-1251 to diag-1500.
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
        "module": hook.split("-")[0].lower() if isinstance(hook, str) and "-" in hook else "sat",
        "unitId": hook if isinstance(hook, str) else (hook.get("unitId", "sat-u1") if isinstance(hook, dict) else "sat-u1"),
        "unitTitle": f"{subtopic} 核心微課" if isinstance(hook, str) else (hook.get("unitTitle", subtopic) if isinstance(hook, dict) else subtopic)
    }

    return {
        "id": f"diag-{q_id:04d}",
        "tier": 6,
        "tierLabel": "Level 6: Digital SAT 學術思維 (SAT B2~C1)",
        "targetExam": "數位 SAT (Digital SAT)",
        "cefr": "C1",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 4,
        "passage": None,
        "prompt": prompt,
        "options": options,
        "answer": ans_idx,
        "translation": formatted_trans,
        "coreConcept": concept,
        "sentenceAnalysis": "SAT 典型高階學術思維句型：強調嚴密修辭邊界、上下文語意連貫度與深層實證邏輯支持。",
        "vocabulary": [
            {"word": w1, "phonetic": p1, "meaning": m1},
            {"word": w2, "phonetic": p2, "meaning": m2}
        ],
        "trapExplanation": full_trap,
        "courseHook": hook_obj
    }

def build_tier6():
    items = []
    q_counter = 1251
    
    subtopics_data = '''

import pprint

with open(output_path, "w", encoding="utf-8") as f:
    f.write(header)
    f.write(pprint.pformat(normalized_all, width=120, compact=False))
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

print("tier6_sat.py written successfully!")
