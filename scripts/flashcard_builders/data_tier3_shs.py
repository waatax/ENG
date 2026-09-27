# scripts/flashcard_builders/data_tier3_shs.py
# -*- coding: utf-8 -*-
"""
Generates exactly 3,000 Senior High School (SHS) flashcards.
Target: fc-sh-0001 to fc-sh-3000
Sources:
- Existing 54 hand-crafted SHS cards
- CEEC 7,000 Levels 3, 4, 5, and 6 vocabulary
"""

import os
import json
import sys

sys.path.append(os.path.dirname(__file__))
from common import build_card

def format_pos(pos_raw):
    p = str(pos_raw or '').strip().lower()
    if p in ('n', 'noun'):
        return 'n.'
    elif p in ('v', 'verb', 'vi', 'vt'):
        return 'v.'
    elif p in ('adj', 'adjective'):
        return 'adj.'
    elif p in ('adv', 'adverb'):
        return 'adv.'
    elif p in ('prep', 'preposition'):
        return 'prep.'
    elif p in ('conj', 'conjunction'):
        return 'conj.'
    elif p in ('pron', 'pronoun'):
        return 'pron.'
    elif p in ('num', 'number'):
        return 'num.'
    elif p:
        return f"{p}." if not p.endswith('.') else p
    return 'n.'

def categorize_shs(word, pos, zh):
    w = word.lower()
    text = (w + " " + zh).lower()
    
    # Semantic rules for SHS academic themes
    if any(k in text for k in ['環境', '永續', '氣候', '生態', '生物', '地球', '自然', '保育', '物種']):
        return '永續發展與跨領域'
    if any(k in text for k in ['科技', '創新', '數位', '研究', '實驗', '發明', '網路', '人工智慧', '運算']):
        return '科技與創新變革'
    if any(k in text for k in ['社會', '政治', '歷史', '文化', '法律', '哲學', '民主', '公民', '經濟']):
        return '人文與社會科學'
    if any(k in text for k in ['心理', '認知', '大腦', '知覺', '情緒', '動機', '自尊', '意識', '思維']):
        return '心理與認知素養'

    # POS fallbacks
    if pos.startswith('v'):
        return '大考核心動詞'
    elif '片語' in zh or ' ' in word or '-' in word:
        return '大考高頻動詞片語'
    return '大考學術閱讀詞彙'

def get_cards(exclude_words=None):
    cards = []
    seen = set()

    if exclude_words:
        for w in exclude_words:
            seen.add(w.lower().strip())

    # 1. Existing cards (54 cards)
    with open(os.path.join(os.path.dirname(__file__), 'existing_cards.json'), 'r', encoding='utf-8') as f:
        existing = json.load(f).get('shs_3000', {})

    for word_clean, card_data in existing.items():
        w_low = word_clean.lower().strip()
        seen.add(w_low)
        cards.append(card_data)

    cache_dir = os.path.join(os.path.dirname(__file__), 'cache_levels')
    level_files = ['level_3.json', 'level_4.json', 'level_5.json', 'level_6.json']

    for lf in level_files:
        path = os.path.join(cache_dir, lf)
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            items = json.load(f)

        for item in items:
            if len(cards) >= 3000:
                break
            w = item.get('word', '').strip()
            w_low = w.lower()
            if not w or w_low in seen:
                continue

            defs = item.get('definitions', [])
            if not defs:
                continue
            
            raw_pos = defs[0].get('partOfSpeech', 'n')
            pos = format_pos(raw_pos)
            zh = '；'.join(d.get('text', '').strip() for d in defs[:2] if d.get('text'))
            if not zh:
                continue

            seen.add(w_low)
            cat = categorize_shs(w, pos, zh)
            idx = len(cards) + 1
            card = build_card(
                tier='shs_3000',
                id_prefix='sh',
                index=idx,
                word=w,
                pos=pos,
                zh=zh,
                category=cat
            )
            cards.append(card)

    # Renumber sequentially to ensure perfect consistency
    for i, c in enumerate(cards):
        c['id'] = f"fc-sh-{i+1:04d}"

    return cards[:3000]

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    import build_tier1, data_tier2_jhs, data_tier4_toeic, data_tier5_sat, data_tier6_gre, data_tier7_gmat
    t1 = set(c['word'].lower() for c in build_tier1.get_cards())
    t2 = set(c['word'].lower() for c in data_tier2_jhs.get_cards(t1))
    t4 = set(c['word'].lower() for c in data_tier4_toeic.get_cards())
    t5 = set(c['word'].lower() for c in data_tier5_sat.get_cards())
    t6 = set(c['word'].lower() for c in data_tier6_gre.get_cards())
    t7 = set(c['word'].lower() for c in data_tier7_gmat.get_cards())
    exclude = t1 | t2 | t4 | t5 | t6 | t7

    c = get_cards(exclude)
    print(f"Generated Tier 3 (SHS) cards: {len(c)}")
    print(f"First card: {c[0]['id']} {c[0]['word']}")
    print(f"Last card: {c[-1]['id']} {c[-1]['word']}")
