# scripts/flashcard_builders/data_tier2_jhs.py
# -*- coding: utf-8 -*-
"""
Generates exactly 2,000 Junior High School (JHS) flashcards.
Target: fc-jh-0001 to fc-jh-2000
Sources:
- Existing 158 hand-crafted JHS cards
- MOE / CEEC Level 1 & Level 2 vocabulary
- MOE / CEEC Level 3 foundation vocabulary
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

def categorize_jhs(word, pos, zh):
    w = word.lower()
    text = (w + " " + zh).lower()
    
    # Semantic rules
    if any(k in text for k in ['生氣', '難過', '高興', '害怕', '朋友', '情感', '情緒', '哭', '笑', '愛', '恨', '親切', '心靈']):
        return '情緒與人際'
    if any(k in text for k in ['電話', '電腦', '網路', '網站', '科技', '手機', '電信', '螢幕', '相機']):
        return '科技與現代生活'
    if any(k in text for k in ['環境', '污染', '地球', '垃圾', '回收', '社會', '氣候', '天災', '地震', '颱風']):
        return '環境與社會議題'
    if any(k in text for k in ['禮貌', '謝謝', '對不起', '請', '介紹', '談話', '拜訪', '邀請', '問候']):
        return '日常社交與禮貌'
    if any(k in text for k in ['習慣', '刷牙', '洗臉', '睡覺', '起床', '日常', '每天', '家事']):
        return '生活習慣與日常'
    if any(k in text for k in ['學校', '教室', '作業', '考試', '老師', '學生', '課堂', '科目']):
        return '學校與文具'
    if any(k in text for k in ['食物', '吃', '喝', '餐', '菜', '肉', '水果', '蔬菜', '煮']):
        return '食物與飲品'
    if any(k in text for k in ['車', '船', '飛機', '站', '路', '街', '旅行', '機場']):
        return '交通與場所'
    if any(k in text for k in ['生病', '痛', '藥', '醫生', '醫院', '健康', '身體', '手', '腳']):
        return '身體與健康'

    # POS fallbacks
    if pos.startswith('v'):
        return '會考核心動詞'
    elif pos.startswith('adj'):
        return '常見形容詞'
    elif pos.startswith('adv'):
        return '常見形容詞'
    return '生活情境詞彙'

def get_cards(tier1_word_set=None):
    cards = []
    seen = set()

    # If tier1 words provided, prevent overlapping with Tier 1
    if tier1_word_set:
        for w in tier1_word_set:
            seen.add(w.lower().strip())

    # 1. Existing cards (158 cards)
    with open(os.path.join(os.path.dirname(__file__), 'existing_cards.json'), 'r', encoding='utf-8') as f:
        existing = json.load(f).get('jhs_2000', {})

    for word_clean, card_data in existing.items():
        w_low = word_clean.lower().strip()
        seen.add(w_low)
        cards.append(card_data)

    cache_dir = os.path.join(os.path.dirname(__file__), 'cache_levels')
    level_files = ['level_2.json', 'level_1.json', 'level_3.json']

    for lf in level_files:
        path = os.path.join(cache_dir, lf)
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            items = json.load(f)

        for item in items:
            if len(cards) >= 2000:
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
            cat = categorize_jhs(w, pos, zh)
            idx = len(cards) + 1
            card = build_card(
                tier='jhs_2000',
                id_prefix='jh',
                index=idx,
                word=w,
                pos=pos,
                zh=zh,
                category=cat
            )
            cards.append(card)

    # Renumber sequentially to ensure perfect consistency
    for i, c in enumerate(cards):
        c['id'] = f"fc-jh-{i+1:04d}"

    return cards[:2000]

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    import build_tier1
    t1_cards = build_tier1.get_cards()
    t1_set = set(c['word'].lower() for c in t1_cards)

    c = get_cards(t1_set)
    print(f"Generated Tier 2 (JHS) cards: {len(c)}")
    print(f"First card: {c[0]['id']} {c[0]['word']}")
    print(f"Last card: {c[-1]['id']} {c[-1]['word']}")
