"""common.py - Common utilities and schemas for diagnostic placement question builders.
"""

def make_question(q_id, tier, tier_label, exam, cefr, dim, subtopic, diff,
                  prompt, correct, distractors, translation_prompt,
                  trans_choices, concept, analysis, vocabs, trap_detail, hook, passage=None):
    """Generates a standardized 5-star pedagogical diagnostic question item."""
    ans_idx = (q_id - 1) % 4
    options = []
    d_idx = 0
    for i in range(4):
        if i == ans_idx:
            options.append(correct)
        else:
            options.append(distractors[d_idx])
            d_idx += 1

    opt_letters = ["A", "B", "C", "D"]
    ans_letter = opt_letters[ans_idx]

    formatted_trans = f"【題幹精譯】{translation_prompt}\n【選項解析】" + "  ".join([
        f"{opt_letters[i]}. {options[i]}" + (f" ({trans_choices[options[i]]})" if options[i] in trans_choices else "")
        for i in range(4)
    ])

    trap = f"【選項剖析】正確答案為 ({ans_letter})「{correct}」。{trap_detail}"

    return {
        "id": f"diag-{q_id:04d}",
        "tier": tier,
        "tierLabel": tier_label,
        "targetExam": exam,
        "cefr": cefr,
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": diff,
        "passage": passage,
        "prompt": prompt,
        "options": options,
        "answer": ans_idx,
        "translation": formatted_trans,
        "coreConcept": concept,
        "sentenceAnalysis": analysis,
        "vocabulary": vocabs,
        "trapExplanation": trap,
        "courseHook": hook
    }
