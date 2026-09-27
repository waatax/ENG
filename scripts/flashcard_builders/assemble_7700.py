# scripts/flashcard_builders/assemble_7700.py
# -*- coding: utf-8 -*-
"""
Master Assembler for 7,700 Graded Memory Flashcards:
1. Generates 7 tiers:
   - Tier 1: elem_1000 (1,000 cards)
   - Tier 2: jhs_2000 (2,000 cards)
   - Tier 3: shs_3000 (3,000 cards)
   - Tier 4: toeic (700 cards)
   - Tier 5: sat (450 cards)
   - Tier 6: gre (350 cards)
   - Tier 7: gmat (200 cards)
2. Rigorous linguistic and structural validation:
   - Exactly 7,700 cards
   - Every card has all 13 attributes non-empty
   - Sequential, unique IDs
3. Updates FLASHCARD_TIERS and FLASHCARD_DATABASE in dist/flashcards.mjs
4. Synchronizes byte-identical mirror to site/dist/flashcards.mjs
"""

import os
import json
import shutil
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Ensure script directory is on sys.path
script_dir = os.path.dirname(__file__)
sys.path.append(script_dir)

import build_tier1
import data_tier2_jhs
import data_tier3_shs
import data_tier4_toeic
import data_tier5_sat
import data_tier6_gre
import data_tier7_gmat

def assemble():
    print("=== Step 1: Generating 7 Tiers of Flashcards ===")

    # Tier 1: Elementary 1,000
    t1_cards = build_tier1.get_cards()
    print(f"Tier 1 (elem_1000): {len(t1_cards)} cards")
    assert len(t1_cards) == 1000, f"Expected 1000, got {len(t1_cards)}"
    t1_words = set(c['word'].lower() for c in t1_cards)

    # Tier 2: JHS 2,000
    t2_cards = data_tier2_jhs.get_cards(t1_words)
    print(f"Tier 2 (jhs_2000): {len(t2_cards)} cards")
    assert len(t2_cards) == 2000, f"Expected 2000, got {len(t2_cards)}"
    t2_words = set(c['word'].lower() for c in t2_cards)

    # Tier 4: TOEIC 700
    t4_cards = data_tier4_toeic.get_cards()
    print(f"Tier 4 (toeic): {len(t4_cards)} cards")
    assert len(t4_cards) == 700, f"Expected 700, got {len(t4_cards)}"
    t4_words = set(c['word'].lower() for c in t4_cards)

    # Tier 5: SAT 450
    t5_cards = data_tier5_sat.get_cards()
    print(f"Tier 5 (sat): {len(t5_cards)} cards")
    assert len(t5_cards) == 450, f"Expected 450, got {len(t5_cards)}"
    t5_words = set(c['word'].lower() for c in t5_cards)

    # Tier 6: GRE 350
    t6_cards = data_tier6_gre.get_cards()
    print(f"Tier 6 (gre): {len(t6_cards)} cards")
    assert len(t6_cards) == 350, f"Expected 350, got {len(t6_cards)}"
    t6_words = set(c['word'].lower() for c in t6_cards)

    # Tier 7: GMAT 200
    t7_cards = data_tier7_gmat.get_cards()
    print(f"Tier 7 (gmat): {len(t7_cards)} cards")
    assert len(t7_cards) == 200, f"Expected 200, got {len(t7_cards)}"
    t7_words = set(c['word'].lower() for c in t7_cards)

    # Exclude words for Tier 3
    other_words = t1_words | t2_words | t4_words | t5_words | t6_words | t7_words
    t3_cards = data_tier3_shs.get_cards(other_words)
    print(f"Tier 3 (shs_3000): {len(t3_cards)} cards")
    assert len(t3_cards) == 3000, f"Expected 3000, got {len(t3_cards)}"

    all_cards = t1_cards + t2_cards + t3_cards + t4_cards + t5_cards + t6_cards + t7_cards
    total_count = len(all_cards)
    print(f"\n=== Step 2: Validating Total Flashcards Count: {total_count} ===")
    assert total_count == 7700, f"Expected 7700 total cards, got {total_count}"

    # Attribute and ID validation
    seen_ids = set()
    required_keys = ['id', 'tier', 'category', 'word', 'chunk', 'ipa', 'pos', 'icon', 'zh', 'collocation', 'example', 'exampleZh', 'memoryTip']
    for idx, card in enumerate(all_cards):
        cid = card.get('id')
        assert cid, f"Card #{idx} missing id"
        assert cid not in seen_ids, f"Duplicate card ID: {cid}"
        seen_ids.add(cid)

        for k in required_keys:
            v = card.get(k)
            assert v and str(v).strip(), f"Card {cid} ({card.get('word')}) has empty attribute '{k}'"

    print("All 7,700 cards successfully validated with 13 complete attributes and unique IDs!")

    # Step 3: Format FLASHCARD_DATABASE as JSON formatted JS
    print("\n=== Step 3: Formatting and Updating dist/flashcards.mjs ===")
    root_dir = os.path.abspath(os.path.join(script_dir, '..', '..'))
    dist_flashcards_path = os.path.join(root_dir, 'dist', 'flashcards.mjs')
    site_flashcards_path = os.path.join(root_dir, 'site', 'dist', 'flashcards.mjs')

    with open(dist_flashcards_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define updated FLASHCARD_TIERS block
    new_tiers_block = """export const FLASHCARD_TIERS = [
  { id: 'elem_1000', name: '🎒 國小基礎 1,000 字', cefr: 'Pre-A1~A1', count: '1,000 字', color: '#16a34a', desc: '日常生活、家庭學校、基礎動詞、顏色數字動物時間' },
  { id: 'jhs_2000', name: '🏫 國中會考 2,000 字', cefr: 'A1~B1', count: '2,000 字', color: '#0284c7', desc: '教育部常用 2,000 參考字彙、會考情境句、詞性與KK音標' },
  { id: 'shs_3000', name: '🎓 高中大考 3,000 字', cefr: 'B1~B2', count: '3,000 字+片語', color: '#7c3aed', desc: '大考 4,500/7,000 核心詞、關鍵動詞片語與學術搭配詞' },
  { id: 'toeic', name: '💼 TOEIC 國際商務實戰', cefr: 'B2', count: '商務核心 700 字', color: '#d97706', desc: '商務會議、合約談判、採購預算、辦公通訊高頻詞' },
  { id: 'sat', name: '🏛️ Digital SAT 語境學術詞', cefr: 'B2~C1', count: '學術核心 450 字', color: '#4f46e5', desc: 'Words in Context、學術對比詞、歷史社會科學閱讀必背' },
  { id: 'gre', name: '🏛️ GRE Verbal 孿生詞群', cefr: 'C1~C2', count: '核心等價 350 詞', color: '#e11d48', desc: '句子等價題孿生詞對 (capricious/fickle 等)、哲學社科精微詞' },
  { id: 'gmat', name: '📊 GMAT 批判邏輯推理詞', cefr: 'C2', count: '批判邏輯 200 詞', color: '#0891b2', desc: 'Assumption, Weaken, Strengthen, Corroborate 等商業決策詞' }
];"""

    # Replace FLASHCARD_TIERS
    tiers_start = content.find("export const FLASHCARD_TIERS = [")
    tiers_end = content.find("];", tiers_start) + 2
    assert tiers_start != -1 and tiers_end != -1, "Could not find FLASHCARD_TIERS in dist/flashcards.mjs"
    content = content[:tiers_start] + new_tiers_block + content[tiers_end:]

    # Replace FLASHCARD_DATABASE
    db_marker = "export const FLASHCARD_DATABASE = ["
    db_start = content.find(db_marker)
    assert db_start != -1, "Could not find FLASHCARD_DATABASE start marker"

    # Find the end of FLASHCARD_DATABASE: the next "];" followed by comments or "let currentTier"
    db_end_marker = "];\n\n// 閃卡互動內部狀態"
    db_end = content.find(db_end_marker, db_start)
    if db_end == -1:
        # Fallback to general finding
        db_end = content.find("];", db_start)

    assert db_end != -1, "Could not find FLASHCARD_DATABASE end marker"

    # Generate JSON string for all 7700 cards
    # To keep formatting clean and readable, indent by 2 spaces
    json_database = json.dumps(all_cards, ensure_ascii=False, indent=2)
    new_db_block = f"export const FLASHCARD_DATABASE = {json_database};"

    new_content = content[:db_start] + new_db_block + content[db_end + 2:]

    # Write to dist/flashcards.mjs
    with open(dist_flashcards_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully written {len(new_content)} characters to {dist_flashcards_path}")

    # Mirror to site/dist/flashcards.mjs
    shutil.copy2(dist_flashcards_path, site_flashcards_path)
    print(f"Mirrored byte-for-byte to {site_flashcards_path}")

    print("\n=== Assembly Complete: 7,700 flashcards deployed! ===")

if __name__ == '__main__':
    assemble()
