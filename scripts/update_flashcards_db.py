# scripts/update_flashcards_db.py
# -*- coding: utf-8 -*-
"""
將豐富的國小與國中字彙同步至 dist/flashcards.mjs 與 site/dist/flashcards.mjs
"""

import json
import re
from add_vocab_tier2 import ELEM_BASE, ELEM_MORE, ELEM_TIER2, JUNIOR_BASE, JUNIOR_MORE, JUNIOR_TIER2

ELEM_DATA = ELEM_BASE + ELEM_MORE + ELEM_TIER2
JUNIOR_DATA = JUNIOR_BASE + JUNIOR_MORE + JUNIOR_TIER2

def main():
    with open('dist/flashcards.mjs', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start of SHS cards
    shs_marker = "// 3. 高中學測 3,000"
    if shs_marker not in content:
        print("Error: SHS marker not found")
        return

    prefix_end = content.find("export const FLASHCARD_DATABASE = [")
    if prefix_end == -1:
        print("Error: FLASHCARD_DATABASE start not found")
        return
    prefix = content[:prefix_end] + "export const FLASHCARD_DATABASE = [\n"

    suffix_start = content.find(shs_marker)
    suffix = "  " + content[suffix_start:]

    # Build new elementary flashcards
    elem_cards = []
    for i, w in enumerate(ELEM_DATA):
        card = {
            "id": f"fc-el-{i+1:03d}",
            "tier": "elem_1000",
            "category": w[5],
            "word": w[0],
            "chunk": w[1],
            "ipa": w[2],
            "pos": w[3],
            "zh": w[4],
            "collocation": w[6],
            "example": w[7],
            "exampleZh": w[8],
            "memoryTip": w[9]
        }
        elem_cards.append(card)

    # Build new junior high flashcards
    junior_cards = []
    for i, w in enumerate(JUNIOR_DATA):
        card = {
            "id": f"fc-jh-{i+1:03d}",
            "tier": "jhs_2000",
            "category": w[5],
            "word": w[0],
            "chunk": w[1],
            "ipa": w[2],
            "pos": w[3],
            "zh": w[4],
            "collocation": w[6],
            "example": w[7],
            "exampleZh": w[8],
            "memoryTip": w[9]
        }
        junior_cards.append(card)

    def format_card(c):
        return f"""  {{
    id: {json.dumps(c['id'])}, tier: {json.dumps(c['tier'])}, category: {json.dumps(c['category'], ensure_ascii=False)},
    word: {json.dumps(c['word'])}, chunk: {json.dumps(c['chunk'])}, ipa: {json.dumps(c['ipa'])}, pos: {json.dumps(c['pos'])}, zh: {json.dumps(c['zh'], ensure_ascii=False)},
    collocation: {json.dumps(c['collocation'], ensure_ascii=False)},
    example: {json.dumps(c['example'])}, exampleZh: {json.dumps(c['exampleZh'], ensure_ascii=False)},
    memoryTip: {json.dumps(c['memoryTip'], ensure_ascii=False)}
  }}"""

    elem_text = "  // 1. 國小基礎 1,000 (Elementary 1,000)\n" + ",\n".join(format_card(c) for c in elem_cards) + ",\n\n"
    junior_text = "  // 2. 國中會考 2,000 (JHS 2,000)\n" + ",\n".join(format_card(c) for c in junior_cards) + ",\n\n"

    new_content = prefix + elem_text + junior_text + suffix

    with open('dist/flashcards.mjs', 'w', encoding='utf-8') as f:
        f.write(new_content)
    with open('site/dist/flashcards.mjs', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Updated flashcards.mjs with {len(elem_cards)} Elementary cards and {len(junior_cards)} Junior cards.")

if __name__ == '__main__':
    main()
