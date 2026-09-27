# scripts/flashcard_builders/common.py
# -*- coding: utf-8 -*-
"""
Common linguistic algorithms and card builders for 7,700 flashcards:
- Phonics syllable chunker
- IPA phonetic generator
- Semantic visual icon resolver (Dual Coding Theory)
- Collocation engine
- Example sentence & translation engine
- Cognitive memory tip engine
"""

import re

# 1. 視覺圖示詞典 (Visual Concept Icons)
WORD_ICONS = {
    # 人物與家庭
    "family": "👨‍👩‍👧", "father": "👨", "mother": "👩", "parent": "👨‍👩‍👧", "brother": "👦", "sister": "👧",
    "grandfather": "👴", "grandmother": "👵", "uncle": "🧔", "aunt": "👩‍🦰", "cousin": "🧑‍🤝‍🧑", "baby": "👶",
    "friend": "🤝", "boy": "👦", "girl": "👧", "man": "👨", "woman": "👩", "child": "🧒", "children": "🧒",
    "teacher": "👩‍🏫", "student": "🧑‍🎓", "doctor": "🧑‍⚕️", "nurse": "🧑‍⚕️", "police": "👮", "driver": "🚗",
    "cook": "👨‍🍳", "farmer": "🧑‍🌾", "singer": "🎤", "neighbor": "🏘️", "classmate": "🎒", "guest": "🛎️",
    "boss": "💼", "colleague": "👔", "partner": "🤝", "customer": "🛍️", "manager": "📋", "worker": "👷",
    "king": "👑", "queen": "👸", "president": "🏛️", "leader": "🚩", "judge": "⚖️", "lawyer": "💼",
    # 動物與昆蟲
    "cat": "🐱", "dog": "🐶", "bird": "🐦", "fish": "🐟", "elephant": "🐘", "lion": "🦁", "tiger": "🐯",
    "monkey": "🐒", "bear": "🐻", "rabbit": "🐰", "duck": "🦆", "pig": "🐷", "cow": "🐮", "horse": "🐴",
    "sheep": "🐑", "chicken": "🐔", "mouse": "🐭", "frog": "🐸", "snake": "🐍", "bee": "🐝", "ant": "🐜",
    "pet": "🐾", "animal": "🐾", "whale": "🐋", "dolphin": "🐬", "shark": "🦈", "spider": "🕷️", "butterfly": "🦋",
    "eagle": "🦅", "owl": "🦉", "wolf": "🐺", "deer": "🦌", "fox": "🦊", "turtle": "🐢",
    # 自然、地理與宇宙
    "tree": "🌲", "flower": "🌸", "grass": "🌱", "garden": "🏡", "sky": "🌤️", "sun": "☀️", "moon": "🌙",
    "star": "⭐", "rainbow": "🌈", "cloud": "☁️", "rain": "🌧️", "snow": "❄️", "wind": "💨", "sea": "🌊",
    "ocean": "🌊", "beach": "🏖️", "mountain": "⛰️", "river": "🏞️", "lake": "🛶", "earth": "🌍", "forest": "🌲",
    "island": "🏝️", "air": "💨", "water": "💧", "fire": "🔥", "ice": "🧊", "space": "🚀", "planet": "🪐",
    "weather": "🌤️", "storm": "⛈️", "lightning": "⚡", "volcano": "🌋", "desert": "🏜️",
    # 食物與餐飲
    "apple": "🍎", "banana": "🍌", "orange": "🍊", "grape": "🍇", "bread": "🍞", "rice": "🍚", "noodle": "🍜",
    "soup": "🍲", "salad": "🥗", "egg": "🥚", "milk": "🥛", "tea": "🍵", "coffee": "☕", "water": "💧",
    "juice": "🧃", "cake": "🍰", "cookie": "🍪", "candy": "🍬", "ice cream": "🍦", "hamburger": "🍔",
    "sandwich": "🥪", "pizza": "🍕", "breakfast": "🍳", "lunch": "🍱", "dinner": "🍽️", "meal": "🍽️",
    "fruit": "🍎", "vegetable": "🥦", "meat": "🥩", "beef": "🥩", "pork": "🥓", "sugar": "🧂", "salt": "🧂",
    "snack": "🍿", "chocolate": "🍫", "butter": "🧈", "cheese": "🧀", "soup": "🍲", "wine": "🍷",
    # 學校、文具與教育
    "school": "🏫", "class": "🏫", "classroom": "🏫", "book": "📖", "pencil": "✏️", "pen": "🖊️",
    "eraser": "🧹", "ruler": "📏", "desk": "🪑", "chair": "🪑", "bag": "🎒", "box": "📦", "clock": "⏰",
    "watch": "⌚", "lamp": "💡", "sofa": "🛋️", "bed": "🛏️", "door": "🚪", "window": "🪟", "room": "🚪",
    "house": "🏠", "home": "🏡", "computer": "💻", "phone": "📱", "telephone": "☎️", "camera": "📷",
    "homework": "📝", "lesson": "📚", "test": "📑", "grade": "💯", "paper": "📄", "map": "🗺️",
    "library": "📚", "museum": "🏛️", "university": "🎓", "college": "🎓", "lecture": "🗣️",
    # 身體與健康
    "eye": "👀", "ear": "👂", "nose": "👃", "mouth": "👄", "face": "😀", "hand": "✋", "foot": "🦶",
    "leg": "🦵", "arm": "💪", "head": "🗣️", "tooth": "🦷", "hair": "💇", "heart": "❤️", "brain": "🧠",
    "hospital": "🏥", "medicine": "💊", "doctor": "🧑‍⚕️", "nurse": "🧑‍⚕️", "health": "🩺", "fever": "🤒",
    "cough": "😷", "pain": "🩹", "wound": "🩹", "cure": "🧪", "exercise": "🏃",
    # 交通、場所與旅行
    "car": "🚗", "bus": "🚌", "train": "🚆", "airplane": "✈️", "plane": "✈️", "bicycle": "🚲", "bike": "🚲",
    "ship": "🚢", "boat": "⛵", "station": "🚉", "airport": "🛫", "park": "🏞️", "zoo": "🦁", "bank": "🏦",
    "store": "🏪", "shop": "🛍️", "supermarket": "🛒", "restaurant": "🍴", "street": "🛣️", "road": "🛣️",
    "city": "🏙️", "town": "🏘️", "country": "🗺️", "hotel": "🏨", "bridge": "🌉", "ticket": "🎫",
    # 科技、商務與經濟
    "money": "💰", "cash": "💵", "coin": "🪙", "price": "🏷️", "cost": "💳", "market": "📈", "business": "💼",
    "company": "🏢", "contract": "📑", "meeting": "👥", "office": "🏢", "project": "📊", "strategy": "♟️",
    "investment": "📈", "profit": "💵", "revenue": "📊", "tax": "🧾", "trade": "🚢", "economy": "🌐",
    # 哲學、邏輯與心智
    "idea": "💡", "thought": "💭", "mind": "🧠", "truth": "✨", "reason": "⚖️", "logic": "🧩",
    "question": "❓", "answer": "💡", "problem": "⚠️", "solution": "🔑", "goal": "🎯", "success": "🏆",
    "failure": "❌", "dream": "🌟", "hope": "🕊️", "peace": "☮️", "justice": "⚖️", "law": "📜"
}

CATEGORY_ICONS = {
    "家庭與身分": "👨‍👩‍👧", "自然與地理": "🌿", "居家與生活": "🏡", "常見形容詞": "✨",
    "常見動詞": "⚡", "食物與飲品": "🥗", "動物與寵物": "🐾", "學校與文具": "🎒",
    "交通與場所": "🚌", "時間與季節": "⏰", "身體與健康": "🩺", "服飾與配件": "👕",
    "色彩與數字": "🎨", "運動與娛樂": "⚽", "會考不規則動詞": "🔄", "天氣與自然災害": "🌪️",
    "情緒與人際": "🤝", "科技與現代生活": "💻", "環境與社會議題": "🌍", "日常社交與禮貌": "💬",
    "生活習慣與日常": "🗓️", "大考核心動詞": "🔍", "大考高頻動詞片語": "🧩", "永續發展與跨領域": "🌱",
    "大考學術閱讀詞彙": "📚", "人文與社會科學": "🏛️", "心理與認知素養": "🧠", "科技與創新變革": "💡",
    "商務合約與談判": "📑", "公司運營與行程": "🏢", "財務與採購": "💰", "策略與政策執行": "⚙️",
    "客戶接待與設施": "🏨", "人力資源與招募": "👥", "物流與製造管理": "📦", "市場營銷與品牌": "📢",
    "語境詞義辨析": "📖", "學術修辭與邏輯": "⚖️", "論據與實證支持": "🧪", "學術哲學與決策": "🛠️",
    "文本證據與推論": "📜", "觀點對比與張力": "🔀", "歷史與社會政治": "🏛️", "自然科學與演化": "🧬",
    "句子等價孿生詞對": "👯", "GRE 核心同義詞群": "🎭", "希臘拉丁哲學字根": "🗝️", "學術態度與評價": "⚖️",
    "批判邏輯與前提": "🎯", "批判推理削弱題型": "🔨", "批判推理加強題型": "🛡️", "評估與因果關係鏈": "⛓️",
    "矛盾解釋與推論": "🔄", "商業決策與可行性": "💼",
    "托福學術演講與校園": "🗣️", "地質天體與自然環境": "🪐", "生物演化與生態系統": "🌿",
    "心理認知與社會人類": "🧠", "藝術歷史與建築文明": "🏛️", "科學實驗與研究方法": "🔬"
}

TIER_FALLBACK_ICONS = {
    "elem_1000": "🎒", "jhs_2000": "🏫", "shs_3000": "🎓",
    "toeic": "💼", "sat": "🏛️", "gre": "🎭", "gmat": "📊", "toefl": "🌐"
}

def resolve_icon(word, category, zh, tier):
    w_clean = word.lower().strip()
    if w_clean in WORD_ICONS:
        return WORD_ICONS[w_clean]
    for k, v in WORD_ICONS.items():
        if k in w_clean or w_clean in k:
            return v
    for cat_k, v in CATEGORY_ICONS.items():
        if cat_k in category:
            return v
    return TIER_FALLBACK_ICONS.get(tier, "📌")

# 2. 自然拼讀音節拆解引擎 (Phonics Syllable Chunker)
PREFIXES = [
    'inter', 'trans', 'under', 'over', 'super', 'anti', 'auto', 'semi',
    'counter', 'extra', 'intra', 'hyper', 'micro', 'macro', 'multi',
    'sub', 'pre', 'pro', 'con', 'com', 'dis', 'mis', 'non', 'out',
    're', 'un', 'in', 'im', 'de', 'ex', 'en', 'em', 'ab', 'ad'
]

SUFFIXES = [
    'tional', 'sion', 'tion', 'ment', 'able', 'ible', 'ness', 'less',
    'fully', 'ful', 'ward', 'wise', 'hood', 'ship', 'ance', 'ence',
    'ism', 'ist', 'ity', 'ive', 'ous', 'ize', 'ise', 'ate', 'ing',
    'ed', 'er', 'or', 'ly', 'al', 'ic', 'ty'
]

VOWELS = 'aeiouy'

def chunk_word(w):
    w = w.lower().strip()
    if '-' in w or ' ' in w:
        return w
    if len(w) <= 3:
        return w
    
    prefix_part = ""
    rest = w
    for p in sorted(PREFIXES, key=len, reverse=True):
        if rest.startswith(p) and len(rest) > len(p) + 2:
            if any(c in VOWELS for c in rest[len(p):]):
                prefix_part = p
                rest = rest[len(p):]
                break

    suffix_part = ""
    for s in sorted(SUFFIXES, key=len, reverse=True):
        if rest.endswith(s) and len(rest) > len(s) + 2:
            if any(c in VOWELS for c in rest[:-len(s)]):
                suffix_part = s
                rest = rest[:-len(s)]
                break

    chunks = []
    i = 0
    curr = ""
    while i < len(rest):
        curr += rest[i]
        if any(c in VOWELS for c in curr):
            rem = rest[i+1:]
            if rem and any(c in VOWELS for c in rem):
                cons_len = 0
                for c in rem:
                    if c in VOWELS:
                        break
                    cons_len += 1
                
                if cons_len >= 2:
                    curr += rem[:1]
                    chunks.append(curr)
                    curr = ""
                    i += 1
                elif cons_len == 1 and len(curr) >= 2:
                    chunks.append(curr)
                    curr = ""
            elif not rem:
                chunks.append(curr)
                curr = ""
        i += 1
    if curr:
        if chunks:
            chunks[-1] += curr
        else:
            chunks.append(curr)

    result = []
    if prefix_part:
        result.append(prefix_part)
    result.extend(chunks)
    if suffix_part:
        result.append(suffix_part)

    cleaned = []
    for c in result:
        if not cleaned:
            cleaned.append(c)
        elif not any(char in VOWELS for char in c) and len(c) <= 2:
            cleaned[-1] += c
        elif not any(char in VOWELS for char in cleaned[-1]) and len(cleaned[-1]) <= 2:
            cleaned[-1] += c
        else:
            cleaned.append(c)

    return " - ".join(cleaned) if len(cleaned) > 1 else w

# 3. IPA 音標生成規則 (IPA Generator)
COMMON_IPA = {
    "a": "/ə/", "the": "/ðə/", "to": "/tuː/", "of": "/ʌv/", "in": "/ɪn/", "is": "/ɪz/",
    "it": "/ɪt/", "you": "/juː/", "that": "/ðæt/", "he": "/hiː/", "was": "/wɑːz/",
    "for": "/fɔːr/", "on": "/ɑːn/", "are": "/ɑːr/", "as": "/æz/", "with": "/wɪð/",
    "his": "/hɪz/", "they": "/ðeɪ/", "at": "/æt/", "be": "/biː/", "this": "/ðɪs/",
    "have": "/hæv/", "from": "/frɑːm/", "or": "/ɔːr/", "one": "/wʌn/", "had": "/hæd/",
    "by": "/baɪ/", "word": "/wɝːd/", "but": "/bʌt/", "not": "/nɑːt/", "what": "/wɑːt/"
}

def generate_ipa(w, pos):
    w_clean = w.lower().strip()
    if w_clean in COMMON_IPA:
        return COMMON_IPA[w_clean]
    
    # 簡易語音字素對應
    ipa = w_clean
    # 處理常見字尾
    ipa = re.sub(r'tion$', 'ʃən', ipa)
    ipa = re.sub(r'sion$', 'ʒən', ipa)
    ipa = re.sub(r'ture$', 'tʃɚ', ipa)
    ipa = re.sub(r'ing$', 'ɪŋ', ipa)
    ipa = re.sub(r'able$', 'əbəl', ipa)
    ipa = re.sub(r'ible$', 'əbəl', ipa)
    ipa = re.sub(r'ment$', 'mənt', ipa)
    ipa = re.sub(r'ness$', 'nəs', ipa)
    ipa = re.sub(r'ous$', 'əs', ipa)
    ipa = re.sub(r'ity$', 'əti', ipa)
    ipa = re.sub(r'er$', 'ɚ', ipa)
    ipa = re.sub(r'or$', 'ɚ', ipa)
    
    # 字母組合
    ipa = re.sub(r'sh', 'ʃ', ipa)
    ipa = re.sub(r'ch', 'tʃ', ipa)
    ipa = re.sub(r'th', 'θ', ipa)
    ipa = re.sub(r'ph', 'f', ipa)
    ipa = re.sub(r'ee', 'iː', ipa)
    ipa = re.sub(r'oo', 'uː', ipa)
    ipa = re.sub(r'ai', 'eɪ', ipa)
    ipa = re.sub(r'ay', 'eɪ', ipa)
    ipa = re.sub(r'ea', 'iː', ipa)
    ipa = re.sub(r'oa', 'oʊ', ipa)
    ipa = re.sub(r'ck', 'k', ipa)
    ipa = re.sub(r'ng', 'ŋ', ipa)
    ipa = re.sub(r'qu', 'kw', ipa)
    
    # 短母音與長母音
    ipa = re.sub(r'a(?=[bcdfghjklmnpqrstvwxyz]{2})', 'æ', ipa)
    ipa = re.sub(r'e(?=[bcdfghjklmnpqrstvwxyz]{2})', 'ɛ', ipa)
    ipa = re.sub(r'i(?=[bcdfghjklmnpqrstvwxyz]{2})', 'ɪ', ipa)
    ipa = re.sub(r'o(?=[bcdfghjklmnpqrstvwxyz]{2})', 'ɑː', ipa)
    ipa = re.sub(r'u(?=[bcdfghjklmnpqrstvwxyz]{2})', 'ʌ', ipa)

    return f"/ˈ{ipa}/"

# 4. 搭配詞生成器 (Collocation Generator)
def generate_collocation(word, pos, zh):
    w = word.strip()
    zh_first = zh.split('、')[0].split('；')[0].split('（')[0].strip()
    if pos.startswith('v'):
        return f"{w} effectively / carefully ({w} 方式)"
    elif pos.startswith('adj'):
        return f"a {w} condition / outcome ({zh_first}狀態)"
    elif pos.startswith('adv'):
        return f"{w} demonstrated ({zh_first}表現)"
    else:
        return f"an important {w} ({zh_first})"

# 5. 情境例句生成器 (Contextual Example Generator)
def generate_example(word, pos, zh, category=""):
    w = word.strip()
    zh_first = zh.split('、')[0].split('；')[0].split('（')[0].strip()
    if pos.startswith('v'):
        en = f"Professionals should {w} all relevant data before making a decision."
        zh_s = f"專業人士在做出決策前應當妥善{zh_first}所有相關數據。"
    elif pos.startswith('adj'):
        en = f"The team presented a {w} strategy that addressed key challenges."
        zh_s = f"該團隊提出了一項應對關鍵挑戰的{zh_first}策略。"
    elif pos.startswith('adv'):
        en = f"The experimental results {w} confirmed the primary scientific hypothesis."
        zh_s = f"實驗結果{zh_first}證實了最初的科學假說。"
    else:
        en = f"Understanding the concept of {w} is essential for continuous progress."
        zh_s = f"理解「{zh_first}」的概念對於持續進步至關重要。"
    return en, zh_s

# 6. 認知記憶技巧生成器 (Cognitive Memory Tip Generator)
def generate_memory_tip(word, pos, chunk, tier, zh):
    w = word.strip()
    zh_first = zh.split('、')[0].split('；')[0].split('（')[0].strip()
    if tier == 'elem_1000':
        return f"自然拼讀：{chunk}。留意字母拼讀節奏與生活發音。"
    elif tier == 'jhs_2000':
        return f"會考焦點：{chunk}。注意搭配詞用法與情境對話應用。"
    elif tier == 'shs_3000':
        return f"【大考字根】音節分解 {chunk}。核心意義指向「{zh_first}」，常出現在篇章閱讀與學術論述中。"
    elif tier == 'toeic':
        return f"【多益商務】音節拆解 {chunk}。職場會議與書信常見高頻詞，掌握搭配詞可大幅提升閱讀解題速度。"
    elif tier == 'sat':
        return f"【SAT 語境】音節 {chunk}。常見於學術對比長難句與修辭證據題，注意上下文極性線索。"
    elif tier == 'gre':
        return f"【GRE 等價】音節 {chunk}。精微語意偏向「{zh_first}」，填空題常作為成對等價同義詞選項。"
    elif tier == 'gmat':
        return f"【GMAT 批判】音節 {chunk}。常見於商業決策與因果推理題目，考查假設前提與邏輯嚴密性。"
    elif tier == 'toefl':
        return f"【托福學術】音節 {chunk}。常見於學術演講聽力與自然社科篇章，掌握核心字義「{zh_first}」能快速理解講者論述。"
    return f"【記憶要點】音節拆解 {chunk}，結合例句加深語境印象。"

# 7. 卡片物件建立函數
def build_card(tier, id_prefix, index, word, pos, zh, category,
               chunk=None, ipa=None, icon=None, collocation=None, example=None, exampleZh=None, memoryTip=None):
    w_clean = word.strip()
    c_chunk = chunk or chunk_word(w_clean)
    c_ipa = ipa or generate_ipa(w_clean, pos)
    c_icon = icon or resolve_icon(w_clean, category, zh, tier)
    c_colloc = collocation or generate_collocation(w_clean, pos, zh)
    if example and exampleZh:
        c_ex, c_ex_zh = example, exampleZh
    else:
        c_ex, c_ex_zh = generate_example(w_clean, pos, zh, category)
    c_tip = memoryTip or generate_memory_tip(w_clean, pos, c_chunk, tier, zh)
    
    card_id = f"fc-{id_prefix}-{index:04d}"
    return {
        "id": card_id,
        "tier": tier,
        "category": category,
        "word": w_clean,
        "chunk": c_chunk,
        "ipa": c_ipa,
        "pos": pos,
        "icon": c_icon,
        "zh": zh,
        "collocation": c_colloc,
        "example": c_ex,
        "exampleZh": c_ex_zh,
        "memoryTip": c_tip
    }
