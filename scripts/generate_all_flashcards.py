# scripts/generate_all_flashcards.py
# -*- coding: utf-8 -*-
"""
生成涵蓋 7 大程度（國小、國中、高中、TOEIC、SAT、GRE、GMAT）之全階單字記憶閃卡資料庫。
每一張卡片皆包含：
- id, tier, category, word, chunk (自然拼讀音節拆解), ipa (KK音標), pos (詞性)
- icon (專屬視覺概念圖示/心像錨點)
- zh (精確繁體中文釋義)
- collocation (高頻必考搭配詞)
- example (情境雙語例句), exampleZh (例句中譯)
- memoryTip (深度認知記憶策略：拼讀規則、字根字首字尾、GRE孿生詞對、GMAT批判邏輯)
"""

import sys
import os
import json
import re

sys.path.append(os.path.dirname(__file__))

from add_vocab_tier2 import ELEM_BASE, ELEM_MORE, ELEM_TIER2, JUNIOR_BASE, JUNIOR_MORE, JUNIOR_TIER2

ELEM_RAW = ELEM_BASE + ELEM_MORE + ELEM_TIER2
JUNIOR_RAW = JUNIOR_BASE + JUNIOR_MORE + JUNIOR_TIER2

# 語意專屬視覺圖示精準對照字典
WORD_ICONS = {
    # 家庭與人物
    "family": "👨‍👩‍👧", "father": "👨", "mother": "👩", "parent": "👨‍👩‍👧", "brother": "👦", "sister": "👧",
    "grandfather": "👴", "grandmother": "👵", "uncle": "🧔", "aunt": "👩‍🦰", "cousin": "🧑‍🤝‍🧑", "baby": "👶",
    "friend": "🤝", "boy": "👦", "girl": "👧", "man": "👨", "woman": "👩", "child": "🧒", "children": "🧒",
    "teacher": "👩‍🏫", "student": "🧑‍🎓", "doctor": "🧑‍⚕️", "nurse": "🧑‍⚕️", "police": "👮", "driver": "🚗",
    "cook": "👨‍🍳", "farmer": "🧑‍🌾", "singer": "🎤", "neighbor": "🏘️", "classmate": "🎒",
    # 動物與寵物
    "cat": "🐱", "dog": "🐶", "bird": "🐦", "fish": "🐟", "elephant": "🐘", "lion": "🦁", "tiger": "🐯",
    "monkey": "🐒", "bear": "🐻", "rabbit": "🐰", "duck": "🦆", "pig": "🐷", "cow": "🐮", "horse": "🐴",
    "sheep": "🐑", "chicken": "🐔", "mouse": "🐭", "frog": "🐸", "snake": "🐍", "bee": "🐝", "ant": "🐜",
    "pet": "🐾", "animal": "🐾", "whale": "🐋", "dolphin": "🐬", "shark": "🦈",
    # 自然與地理
    "tree": "🌲", "flower": "🌸", "grass": "🌱", "garden": "🏡", "sky": "🌤️", "sun": "☀️", "moon": "🌙",
    "star": "⭐", "rainbow": "🌈", "cloud": "☁️", "rain": "🌧️", "snow": "❄️", "wind": "💨", "sea": "🌊",
    "ocean": "🌊", "beach": "🏖️", "mountain": "⛰️", "river": "🏞️", "lake": "🛶", "earth": "🌍", "forest": "🌲",
    "island": "🏝️", "air": "💨", "water": "💧", "fire": "🔥",
    # 食物與飲品
    "apple": "🍎", "banana": "🍌", "orange": "🍊", "grape": "🍇", "bread": "🍞", "rice": "🍚", "noodle": "🍜",
    "soup": "🍲", "salad": "🥗", "egg": "🥚", "milk": "🥛", "tea": "🍵", "coffee": "☕",
    "juice": "🧃", "cake": "🍰", "cookie": "🍪", "candy": "🍬", "ice cream": "🍦", "hamburger": "🍔",
    "sandwich": "🥪", "pizza": "🍕", "breakfast": "🍳", "lunch": "🍱", "dinner": "🍽️", "meal": "🍽️",
    "fruit": "🍎", "vegetable": "🥦", "meat": "🥩", "beef": "🥩", "pork": "🥓", "sugar": "🧂", "salt": "🧂",
    # 學校與文具
    "school": "🏫", "class": "🏫", "classroom": "🏫", "book": "📖", "pencil": "✏️", "pen": "🖊️",
    "eraser": "🧹", "ruler": "📏", "desk": "🪑", "chair": "🪑", "bag": "🎒", "box": "📦", "clock": "⏰",
    "watch": "⌚", "lamp": "💡", "sofa": "🛋️", "bed": "🛏️", "door": "🚪", "window": "🪟", "room": "🚪",
    "house": "🏠", "home": "🏡", "computer": "💻", "phone": "📱", "telephone": "☎️", "camera": "📷",
    "cup": "☕", "glass": "🥛", "bottle": "🍾", "plate": "🍽️", "fork": "🍴", "knife": "🔪", "spoon": "🥄",
    "homework": "📝", "lesson": "📚", "test": "📑", "grade": "💯", "paper": "📄", "map": "🗺️",
    # 身體與服飾
    "eye": "👀", "ear": "👂", "nose": "👃", "mouth": "👄", "face": "😀", "hand": "✋", "foot": "🦶",
    "leg": "🦵", "arm": "💪", "head": "🗣️", "tooth": "🦷", "hair": "💇", "heart": "❤️",
    "shirt": "👕", "t-shirt": "👕", "pants": "👖", "dress": "👗", "skirt": "👗", "jacket": "🧥",
    "coat": "🧥", "hat": "🧢", "cap": "🧢", "shoes": "👟", "socks": "🧦",
    # 交通與場所
    "car": "🚗", "bus": "🚌", "train": "🚆", "airplane": "✈️", "plane": "✈️", "bicycle": "🚲", "bike": "🚲",
    "ship": "🚢", "boat": "⛵", "station": "🚉", "airport": "🛫", "park": "🏞️", "zoo": "🦁", "hospital": "🏥",
    "bank": "🏦", "store": "🏪", "shop": "🛍️", "supermarket": "🛒", "restaurant": "🍴", "street": "🛣️", "road": "🛣️",
    "city": "🏙️", "town": "🏘️", "country": "🗺️", "library": "📚", "museum": "🏛️", "hotel": "🏨",
    # 顏色與數字
    "red": "🔴", "blue": "🔵", "yellow": "🟡", "green": "🟢", "white": "⚪", "black": "⚫", "pink": "🌸",
    "purple": "🟣", "orange": "🟠", "brown": "🟤", "one": "1️⃣", "two": "2️⃣", "three": "3️⃣", "four": "4️⃣",
    "five": "5️⃣", "six": "6️⃣", "seven": "7️⃣", "eight": "8️⃣", "nine": "9️⃣", "ten": "🔟",
    # 時間與季節
    "time": "⏰", "year": "📅", "month": "📆", "week": "🗓️", "day": "☀️", "night": "🌙", "morning": "🌅",
    "afternoon": "☀️", "evening": "🌆", "today": "📅", "yesterday": "⏮️", "tomorrow": "⏭️", "spring": "🌸",
    "summer": "☀️", "autumn": "🍂", "fall": "🍂", "winter": "❄️",
    # 動作動詞
    "read": "📖", "write": "✍️", "listen": "👂", "speak": "🗣️", "talk": "💬", "say": "💬", "tell": "🗣️",
    "see": "👀", "look": "👀", "watch": "📺", "eat": "🍽️", "drink": "🥤", "sleep": "💤", "wake": "⏰",
    "run": "🏃", "walk": "🚶", "jump": "🦘", "swim": "🏊", "play": "🎮", "sing": "🎤", "dance": "💃",
    "buy": "🛍️", "sell": "🏷️", "help": "🤝", "love": "❤️", "like": "👍", "want": "🙋", "need": "❗",
    "think": "🧠", "know": "💡", "learn": "📚", "study": "📖", "teach": "👩‍🏫", "work": "💼", "live": "🏡",
    "cost": "💰", "cut": "✂️", "hurt": "🩹", "let": "🚪", "put": "📥", "shut": "🚪",
    "bring": "🎁", "build": "🏗️", "catch": "🧤", "fight": "🥊", "find": "🔍", "forget": "💭",
    "hear": "👂", "hold": "🤝", "keep": "🔒", "leave": "🚪", "lose": "📉", "make": "🛠️",
    "meet": "🤝", "pay": "💵", "send": "✉️", "spend": "💳", "win": "🏆",
    "become": "🌱", "begin": "🏁", "break": "🔨", "choose": "👉", "do": "⚡", "draw": "🎨",
    "drive": "🚗", "fall": "🍂", "fly": "✈️", "give": "🎁", "grow": "🌿",
    "hide": "🙈", "ride": "🚲", "ring": "🔔", "rise": "🌅",
    "show": "📽️", "steal": "🕵️", "take": "🤲",
    "throw": "⚾", "wear": "👕",
    # 形容詞
    "happy": "😊", "sad": "😢", "angry": "😡", "tired": "😴", "hungry": "🤤", "thirsty": "🥤", "afraid": "😨",
    "good": "👍", "bad": "👎", "big": "🐘", "small": "🐭", "tall": "🦒", "short": "🩳", "long": "📏",
    "fast": "⚡", "slow": "🐢", "hot": "🔥", "cold": "🧊", "warm": "☀️", "cool": "😎", "new": "✨",
    "old": "📜", "young": "🌱", "busy": "🐝", "easy": "👌", "hard": "🧗", "sweet": "🍬", "clean": "✨",
    "dirty": "🧽", "quiet": "🤫", "loud": "📢", "beautiful": "🌺", "bright": "💡", "dark": "🌑",
    "famous": "🌟", "important": "⭐", "popular": "🔥", "special": "💎", "wonderful": "🎉"
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
    "矛盾解釋與推論": "🔄", "商業決策與可行性": "💼"
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
    tier_fallbacks = {
        "elem_1000": "🎒", "jhs_2000": "🏫", "shs_3000": "🎓",
        "toeic": "💼", "sat": "🏛️", "gre": "🎭", "gmat": "📊"
    }
    return tier_fallbacks.get(tier, "📌")

# ==============================================================================
# 3. 高中學測 / 分科測驗 3,000 (SHS 3,000 Academic Core) - 55 核心字彙
# ==============================================================================
SHS_CARDS = [
    {
        "word": "distinguish", "chunk": "dis - tin - guish", "ipa": "/dɪˈstɪŋ.ɡwɪʃ/", "pos": "v.", "icon": "🔍",
        "zh": "區分、辨別、使有別於", "category": "大考核心動詞 / Critical Thinking",
        "collocation": "distinguish between A and B (區分 A 與 B)",
        "example": "Critical readers can readily distinguish between objective facts and personal opinions.",
        "exampleZh": "具備批判思維的讀者能夠輕易區分客觀事實與個人主觀意見。",
        "memoryTip": "dis- (分開) + tinct/tinguish (刺/做記號) ➔ 刺上不同記號以分開 ➔ 區分辨別"
    },
    {
        "word": "sustainable", "chunk": "sus - tain - a - ble", "ipa": "/səˈsteɪ.nə.bəl/", "pos": "adj.", "icon": "🌱",
        "zh": "永續的、可持續發展的", "category": "永續發展與跨領域 / Sustainability",
        "collocation": "sustainable development (永續發展目標)",
        "example": "Solar and wind energy are crucial components of a sustainable green economy.",
        "exampleZh": "太陽能與風能是永續綠色經濟至關重要的基石。",
        "memoryTip": "sus- (在下方) + tain (握住/支撐) + -able ➔ 能在底層長久支撐的 ➔ 永續的"
    },
    {
        "word": "phenomenon", "chunk": "phe - nom - e - non", "ipa": "/fəˈnɑː.mə.nɑːn/", "pos": "n.", "icon": "🌌",
        "zh": "現象、非凡奇蹟 (複數 phenomena)", "category": "大考學術閱讀詞彙 / Academic",
        "collocation": "natural phenomenon (自然現象)",
        "example": "The northern lights are a breathtaking natural phenomenon visible in polar regions.",
        "exampleZh": "極光是北極地區令人嘆為觀止的自然現象。",
        "memoryTip": "希臘字根 phain- (顯現/光芒)。注意複數為 phenomena！"
    },
    {
        "word": "innovative", "chunk": "in - no - va - tive", "ipa": "/ˈɪn.ə.veɪ.t̬ɪv/", "pos": "adj.", "icon": "💡",
        "zh": "創新的、革新的", "category": "科技與創新變革 / Innovation",
        "collocation": "innovative approach / design (創新的途徑/設計)",
        "example": "The biotech startup proposed an innovative method for rapid vaccine synthesis.",
        "exampleZh": "該生技新創提出了一種快速合成疫苗的創新方法。",
        "memoryTip": "in- (進入) + nov (新，如 novel) + -ative ➔ 注入嶄新思維 ➔ 創新的"
    },
    {
        "word": "conservation", "chunk": "con - ser - va - tion", "ipa": "/ˌkɑːn.sɚˈveɪ.ʃən/", "pos": "n.", "icon": "🛡️",
        "zh": "保育、保護、節約", "category": "永續發展與跨領域 / Environment",
        "collocation": "wildlife conservation (野生動物保育)",
        "example": "Marine conservation programs protect vulnerable coral reefs from ocean warming.",
        "exampleZh": "海洋保育計畫保護脆弱的珊瑚礁免於海洋暖化的威脅。",
        "memoryTip": "con- (共同) + serv (保護/保持，如 preserve) + -ation ➔ 共同守護 ➔ 保育"
    },
    {
        "word": "diversity", "chunk": "di - ver - si - ty", "ipa": "/dɪˈvɝː.sə.t̬i/", "pos": "n.", "icon": "🌈",
        "zh": "多樣性、多元化", "category": "人文與社會科學 / Society",
        "collocation": "biological / cultural diversity (生物/文化多樣性)",
        "example": "Tropical rainforests boast the richest biological diversity on our planet.",
        "exampleZh": "熱帶雨林擁有地球上最豐富的生物多樣性。",
        "memoryTip": "di- (分開) + vers/vert (轉向，如 convert) + -ity ➔ 轉向不同方向 ➔ 多樣性"
    },
    {
        "word": "resilience", "chunk": "re - sil - ience", "ipa": "/rɪˈzɪl.jəns/", "pos": "n.", "icon": "🎋",
        "zh": "韌性、復原力、彈性", "category": "心理與認知素養 / Psychology",
        "collocation": "mental / psychological resilience (心理韌性)",
        "example": "Children who overcome early adversity often develop remarkable emotional resilience.",
        "exampleZh": "克服早期逆境的孩子往往能培養出非凡的情感韌性。",
        "memoryTip": "re- (回) + sili (跳，如 salient) + -ence ➔ 被打擊後能回跳彈起 ➔ 復原力/韌性"
    },
    {
        "word": "comprehensive", "chunk": "com - pre - hen - sive", "ipa": "/ˌkɑːm.prɪˈhen.sɪv/", "pos": "adj.", "icon": "📚",
        "zh": "全面的、綜合性的、廣泛的", "category": "大考學術閱讀詞彙 / Academic",
        "collocation": "comprehensive review / survey (全面性的審查/調查)",
        "example": "The medical textbook provides a comprehensive overview of human anatomy.",
        "exampleZh": "該醫學教科書提供了人體解剖學的全面性綜述。",
        "memoryTip": "com- (完全) + prehens (抓住，如 comprehend) + -ive ➔ 全面囊括抓住 ➔ 廣泛全面的"
    },
    {
        "word": "contribute", "chunk": "con - trib - ute", "ipa": "/kənˈtrɪb.juːt/", "pos": "v.", "icon": "🤝",
        "zh": "貢獻、促成、導致", "category": "大考核心動詞 / Causality",
        "collocation": "contribute to + V-ing/N (促成某事/導致某結果)",
        "example": "Excessive intake of processed sugar significantly contributes to obesity and heart disease.",
        "exampleZh": "過量攝取精緻糖是導致肥胖與心臟疾病的重大因素。",
        "memoryTip": "con- (共同) + tribute (給予/貢獻，如 tribute) ➔ 一起給予 ➔ 貢獻/促成"
    },
    {
        "word": "perspective", "chunk": "per - spec - tive", "ipa": "/pɚˈspek.tɪv/", "pos": "n.", "icon": "👁️",
        "zh": "視角、觀點、遠景", "category": "人文與社會科學 / Cognition",
        "collocation": "from a global perspective (從全球視角來看)",
        "example": "Studying abroad allows students to examine domestic issues from an objective perspective.",
        "exampleZh": "出國留學能讓學生從客觀的視角來審視國內議題。",
        "memoryTip": "per- (穿透) + spect (看，如 inspect) + -ive ➔ 穿透看清全局 ➔ 視角觀點"
    },
    {
        "word": "consequence", "chunk": "con - se - quence", "ipa": "/ˈkɑːn.sə.kwəns/", "pos": "n.", "icon": "📉",
        "zh": "後果、結果 (常指負面影響)", "category": "大考學術閱讀詞彙 / Causality",
        "collocation": "face the consequences (承擔後果)",
        "example": "Rising sea levels are a direct consequence of relentless global greenhouse emissions.",
        "exampleZh": "海平面上升是持續不斷的全球溫室氣體排放所導致的直接後果。",
        "memoryTip": "con- (跟隨) + sequ (跟隨，如 sequence) + -ence ➔ 跟在後面發生的事 ➔ 後果"
    },
    {
        "word": "fundamental", "chunk": "fun - da - men - tal", "ipa": "/ˌfʌn.dəˈmen.t̬əl/", "pos": "adj.", "icon": "🧱",
        "zh": "基礎的、根本的、不可或缺的", "category": "大考學術閱讀詞彙 / Academic",
        "collocation": "fundamental human rights (基本人權)",
        "example": "Freedom of speech is recognized as a fundamental principle in modern democracies.",
        "exampleZh": "言論自由在現代民主體制中被公認為一項根本原則。",
        "memoryTip": "foundation (地基) ➔ 位於地基底層的 ➔ 基礎根本的"
    },
    {
        "word": "inevitable", "chunk": "in - ev - i - ta - ble", "ipa": "/ˌɪnˈev.ə.t̬ə.bəl/", "pos": "adj.", "icon": "⏳",
        "zh": "不可避免的、必然發生的", "category": "大考學術閱讀詞彙 / Philosophy",
        "collocation": "inevitable trend / outcome (不可避免的趨勢/結果)",
        "example": "As technology advances, structural changes in the job market are entirely inevitable.",
        "exampleZh": "隨著科技進步，就業市場的結構性變革是完全不可避免的。",
        "memoryTip": "in- (不) + evit (避開) + -able ➔ 無法避開的 ➔ 不可避免的"
    },
    {
        "word": "participate", "chunk": "par - tic - i - pate", "ipa": "/pɑːrˈtɪs.ə.peɪt/", "pos": "v.", "icon": "🙋",
        "zh": "參加、參與 (常搭配 in)", "category": "大考核心動詞 / Social",
        "collocation": "participate in public affairs (參與公共事務)",
        "example": "Citizens are strongly encouraged to participate in community volunteer projects.",
        "exampleZh": "政府強烈鼓勵公民參與社區志工服務方案。",
        "memoryTip": "part (部分) + cip (拿取) + -ate ➔ 拿取一份份額 ➔ 參與"
    },
    {
        "word": "eliminate", "chunk": "e - lim - i - nate", "ipa": "/iˈlɪm.ə.neɪt/", "pos": "v.", "icon": "❌",
        "zh": "消除、淘汰、排除", "category": "大考核心動詞 / Problem Solving",
        "collocation": "eliminate poverty / discrimination (消除貧困/歧視)",
        "example": "Strict hygiene regulations helped eliminate the spread of bacterial infections in hospitals.",
        "exampleZh": "嚴格的衛生規範協助醫院消除了細菌感染的擴散。",
        "memoryTip": "e- (出) + limin (門檻，如 limit) + -ate ➔ 推到門檻之外 ➔ 淘汰消除"
    },
    {
        "word": "substitute", "chunk": "sub - sti - tute", "ipa": "/ˈsʌb.stə.tuːt/", "pos": "v. / n.", "icon": "🔄",
        "zh": "代替、替代；替代品", "category": "大考核心動詞 / Function",
        "collocation": "substitute A for B (用 A 取代 B)",
        "example": "Chefs frequently substitute honey for refined sugar in healthy baking recipes.",
        "exampleZh": "主廚在健康烘焙食譜中經常以蜂蜜代替精緻糖。",
        "memoryTip": "sub- (在下方) + stit/stat (站立) ➔ 站在底下遞補 ➔ 替代"
    },
    {
        "word": "advocate", "chunk": "ad - vo - cate", "ipa": "/ˈæd.və.keɪt/", "pos": "v. / n.", "icon": "📢",
        "zh": "提倡、主張；擁護者", "category": "人文與社會科學 / Politics",
        "collocation": "advocate for environmental reform (提倡環境改革)",
        "example": "Prominent activists actively advocate for educational equality in underprivileged regions.",
        "exampleZh": "知名社運人士積極為弱勢地區的教育平等倡導發聲。",
        "memoryTip": "ad- (朝向) + voc (聲音，如 voice) + -ate ➔ 為某事發聲 ➔ 提倡擁護"
    },
    {
        "word": "compromise", "chunk": "com - pro - mise", "ipa": "/ˈkɑːm.prə.maɪz/", "pos": "n. / v.", "icon": "🤝",
        "zh": "妥協、折衷；危及 (安全/名譽)", "category": "社會與人際溝通 / Negotiation",
        "collocation": "reach a compromise (達成妥協)",
        "example": "After intense deliberation, both political parties finally reached a mutual compromise.",
        "exampleZh": "在經過激烈審議後，兩黨終於達成了相互妥協。",
        "memoryTip": "com- (共同) + promise (承諾) ➔ 彼此共同做出讓步承諾 ➔ 妥協"
    },
    {
        "word": "indispensable", "chunk": "in - dis - pen - sa - ble", "ipa": "/ˌɪn.dɪˈspen.sə.bəl/", "pos": "adj.", "icon": "💎",
        "zh": "不可或缺的、絕對必要的", "category": "大考學術閱讀詞彙 / Academic",
        "collocation": "an indispensable tool / resource (不可或缺的工具/資源)",
        "example": "Smartphones have become an indispensable part of daily communication and logistics.",
        "exampleZh": "智慧型手機已成為現代日常通訊與物流中不可或缺的一部分。",
        "memoryTip": "in- (不) + dispense (分發/省去) + -able ➔ 無法省去的 ➔ 不可或缺的"
    },
    {
        "word": "stimulate", "chunk": "stim - u - late", "ipa": "/ˈstɪm.jə.leɪt/", "pos": "v.", "icon": "⚡",
        "zh": "刺激、促進、激勵", "category": "大考核心動詞 / Economy & Mind",
        "collocation": "stimulate economic growth (促進經濟成長)",
        "example": "Lowering interest rates is designed to stimulate investment and job creation.",
        "exampleZh": "降低利率旨在刺激企業投資並創造就業機會。",
        "memoryTip": "stimulus (刺針/刺激物) ➔ 像針刺激動 ➔ 促進激發"
    },
    {
        "word": "deteriorate", "chunk": "de - te - ri - o - rate", "ipa": "/dɪˈtɪr.i.ə.reɪt/", "pos": "v.", "icon": "📉",
        "zh": "惡化、退化、變壞", "category": "大考核心動詞 / Change",
        "collocation": "relations deteriorate rapidly (關係急劇惡化)",
        "example": "Air quality continues to deteriorate due to heavy industrial emissions and wildfire smoke.",
        "exampleZh": "由於大量工業排放與野火濃煙，空氣品質持續惡化。",
        "memoryTip": "de- (向下) + terior (更壞) + -ate ➔ 每況愈下 ➔ 惡化"
    },
    {
        "word": "transform", "chunk": "trans - form", "ipa": "/trænˈsfɔːrm/", "pos": "v.", "icon": "🦋",
        "zh": "轉變、改造、改觀", "category": "科技與創新變革 / Change",
        "collocation": "transform into a digital hub (轉型為數位樞紐)",
        "example": "Artificial intelligence is set to transform the healthcare diagnostics industry.",
        "exampleZh": "人工智慧將全面改造醫療診斷產業的運作樣貌。",
        "memoryTip": "trans- (跨越/轉移) + form (形狀) ➔ 改變形貌 ➔ 改造轉型"
    },
    {
        "word": "abundant", "chunk": "a - bun - dant", "ipa": "/əˈbʌn.dənt/", "pos": "adj.", "icon": "🌾",
        "zh": "豐富的、充沛的、大量的", "category": "自然與地理 / Environment",
        "collocation": "abundant natural resources (豐沛的天然資源)",
        "example": "The island is blessed with abundant sunshine and geothermal energy reserves.",
        "exampleZh": "該島嶼得天獨厚，擁有豐富的陽光與地熱能源儲備。",
        "memoryTip": "ab- (溢出) + und (波浪，如 wave/surround) + -ant ➔ 像波浪滿溢 ➔ 豐富充裕的"
    },
    {
        "word": "coincide", "chunk": "co - in - cide", "ipa": "/ˌkoʊ.ɪnˈsaɪd/", "pos": "v.", "icon": "⏱️",
        "zh": "巧合、同時發生；一致 (搭配 with)", "category": "大考學術閱讀詞彙 / Time",
        "collocation": "coincide with the annual festival (巧合與年度節慶同時發生)",
        "example": "The scientific conference was scheduled to coincide with the solar eclipse.",
        "exampleZh": "該科學研討會特意安排與日全食天文奇景同時間舉行。",
        "memoryTip": "co- (共同) + in- (在內) + cid/cad (掉落，如 accident) ➔ 一起掉落發生 ➔ 同時發生"
    },
    {
        "word": "reluctant", "chunk": "re - luc - tant", "ipa": "/rɪˈlʌk.tənt/", "pos": "adj.", "icon": "😣",
        "zh": "不情願的、勉強的", "category": "心理與認知素養 / Psychology",
        "collocation": "be reluctant to admit error (不情願承認錯誤)",
        "example": "The witness was initially reluctant to testify in court due to safety concerns.",
        "exampleZh": "該證人出於安全考量，起初十分不情願在法庭上出庭作證。",
        "memoryTip": "re- (抵抗) + luct (摔角/掙扎) + -ant ➔ 內心仍在掙扎抵抗 ➔ 不情願的"
    },
    {
        "word": "accumulate", "chunk": "ac - cu - mu - late", "ipa": "/əˈkjuː.mjə.leɪt/", "pos": "v.", "icon": "📦",
        "zh": "積累、積聚、漸增", "category": "大考核心動詞 / Process",
        "collocation": "accumulate valuable experience (積累寶貴經驗)",
        "example": "Toxic microplastics accumulate along the food chain, threatening marine organisms.",
        "exampleZh": "有毒的塑膠微粒在食物鏈中不斷積聚，對海洋生物構成威脅。",
        "memoryTip": "ac- (增加) + cumul (堆疊，如 cumulative) + -ate ➔ 向上堆高 ➔ 積累"
    },
    {
        "word": "tackle", "chunk": "tack - le", "ipa": "/ˈtæk.əl/", "pos": "v.", "icon": "🤼",
        "zh": "著手應對、解決 (難題)", "category": "大考核心動詞 / Action",
        "collocation": "tackle the housing crisis (著手解決住房危機)",
        "example": "The newly elected municipal council pledged to tackle traffic congestion immediately.",
        "exampleZh": "新當選的市議會承諾立即著手解決嚴重的交通壅塞問題。",
        "memoryTip": "源自美式足球擒抱 (tackle) ➔ 迎頭攔截解決問題 ➔ 著手處理"
    },
    {
        "word": "flourish", "chunk": "flour - ish", "ipa": "/ˈflɝː.ɪʃ/", "pos": "v.", "icon": "🌸",
        "zh": "繁榮、興盛、茁壯成長", "category": "社會與人文 / Development",
        "collocation": "arts and commerce flourish (藝術與商務蓬勃繁榮)",
        "example": "Independent bookstores flourish in neighborhoods with active reading communities.",
        "exampleZh": "獨立書店在擁有活躍閱讀社群的街區中蓬勃發展。",
        "memoryTip": "flour/flor (花朵，如 flora) + -ish ➔ 繁花盛開 ➔ 繁榮興盛"
    },
    {
        "word": "perseverance", "chunk": "per - se - ver - ance", "ipa": "/ˌpɝː.səˈvɪr.əns/", "pos": "n.", "icon": "🧗",
        "zh": "堅持不懈、毅力", "category": "心理與認知素養 / Virtue",
        "collocation": "show great perseverance (展現無比毅力)",
        "example": "Through sheer perseverance and hard study, she passed the rigorous bar exam.",
        "exampleZh": "憑藉堅忍不拔的毅力與苦讀，她順利通過了嚴格的律師考試。",
        "memoryTip": "per- (始終) + severe (嚴格) + -ance ➔ 始終嚴以律己堅持到底 ➔ 堅忍不拔"
    },
    {
        "word": "vulnerable", "chunk": "vul - ner - a - ble", "ipa": "/ˈvʌl.nɚ.ə.bəl/", "pos": "adj.", "icon": "🛡️",
        "zh": "脆弱的、易受傷害的", "category": "社會與環境 / Condition",
        "collocation": "vulnerable to cyberattacks (易遭受網路攻擊的)",
        "example": "Elderly populations and infants are particularly vulnerable during intense heatwaves.",
        "exampleZh": "年長者與嬰幼兒在強烈熱浪侵襲期間特別脆弱易受危害。",
        "memoryTip": "vulner (傷口) + -able ➔ 容易受傷的 ➔ 脆弱的"
    },
    {
        "word": "obstacle", "chunk": "ob - sta - cle", "ipa": "/ˈɑːb.stə.kəl/", "pos": "n.", "icon": "🚧",
        "zh": "障礙、阻礙", "category": "大考核心名詞 / Challenge",
        "collocation": "overcome every obstacle (克服重重障礙)",
        "example": "Language barriers proved to be a major obstacle during the initial relief mission.",
        "exampleZh": "語言隔閡在初期的救災任務中被證實是一大主要障礙。",
        "memoryTip": "ob- (反對/阻擋) + sta (站立) + -cle ➔ 站立在面前阻擋的物體 ➔ 障礙"
    },
    {
        "word": "profound", "chunk": "pro - found", "ipa": "/prəˈfaʊnd/", "pos": "adj.", "icon": "🌊",
        "zh": "深遠的、深刻的、深奧的", "category": "大考學術閱讀詞彙 / Academic",
        "collocation": "have a profound impact on (對...產生深遠影響)",
        "example": "The invention of the printing press had a profound influence on European literacy.",
        "exampleZh": "活字印刷術的發明對歐洲人的識字率產生了深遠的影響。",
        "memoryTip": "pro- (向前) + fund (底部，如 foundation) ➔ 直探最底部 ➔ 深沉深遠的"
    },
    {
        "word": "spontaneous", "chunk": "spon - ta - ne - ous", "ipa": "/spɑːnˈteɪ.ni.əs/", "pos": "adj.", "icon": "⚡",
        "zh": "自發的、自然產生的、隨興的", "category": "心理與行為 / Nature",
        "collocation": "spontaneous applause (自發的熱烈掌聲)",
        "example": "The audience erupted into spontaneous applause at the end of the virtuoso's solo.",
        "exampleZh": "音樂大師獨奏結束時，觀眾席爆發出熱烈而自發的掌聲。",
        "memoryTip": "sponte (出於自願) + -ous ➔ 自主產生無人強迫的 ➔ 自發的"
    },
    {
        "word": "prejudice", "chunk": "prej - u - dice", "ipa": "/ˈpredʒ.ə.dɪs/", "pos": "n. / v.", "icon": "⚖️",
        "zh": "偏見、歧視；使產生偏見", "category": "人文與社會科學 / Society",
        "collocation": "racial / gender prejudice (種族/性別偏見)",
        "example": "Education serves as an effective weapon to eradicate irrational social prejudices.",
        "exampleZh": "教育是根除社會中不合理偏見與歧見的有力武器。",
        "memoryTip": "pre- (預先) + judice (審判/判決，如 judge) ➔ 尚未看清事實就先入為主預先下判決 ➔ 偏見"
    },
    {
        "word": "drastic", "chunk": "dras - tic", "ipa": "/ˈdræs.tɪk/", "pos": "adj.", "icon": "💥",
        "zh": "嚴厲的、劇烈的、猛烈的", "category": "大考學術閱讀詞彙 / Intensity",
        "collocation": "drastic measures / changes (嚴厲措施/劇烈變動)",
        "example": "The government took drastic measures to curb soaring inflation and housing prices.",
        "exampleZh": "政府採取嚴厲手段以抑制飆升的通貨膨脹與房價。",
        "memoryTip": "dras- (行動/去做，如 drama) + -tic ➔ 動作猛烈的 ➔ 劇烈的/嚴厲的"
    },
    {
        "word": "fluctuate", "chunk": "fluc - tu - ate", "ipa": "/ˈflʌk.tʃu.eɪt/", "pos": "v.", "icon": "📈",
        "zh": "波動、起伏不定", "category": "大考學術閱讀詞彙 / Trends",
        "collocation": "prices fluctuate widely (價格劇烈波動)",
        "example": "Exchange rates often fluctuate in response to international geopolitical instability.",
        "exampleZh": "匯率往往會因應國際地緣政治的不穩定而大幅波動。",
        "memoryTip": "fluct (流動/水波，如 fluent/fluid) + -ate ➔ 像水波浪潮般起伏 ➔ 波動"
    },
    {
        "word": "simultaneous", "chunk": "si - mul - ta - ne - ous", "ipa": "/ˌsaɪ.məlˈteɪ.ni.əs/", "pos": "adj.", "icon": "⏱️",
        "zh": "同時發生的、同步的", "category": "大考學術閱讀詞彙 / Time",
        "collocation": "simultaneous translation / interpretation (同步口譯)",
        "example": "The summit features simultaneous interpretation into six official languages.",
        "exampleZh": "該高峰會提供六種官方語言的同步口譯服務。",
        "memoryTip": "simul (相同，如 similar) + -ous ➔ 處在同一時間 ➔ 同時的/同步的"
    },
    # 片語動詞大考必考
    {
        "word": "come up with", "chunk": "come up with", "ipa": "/kʌm ʌp wɪð/", "pos": "phr.", "icon": "💡",
        "zh": "想出 (點子、解方)、提出", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "come up with a creative solution (想出創意解方)",
        "example": "The engineer came up with an ingenious design that halved production costs.",
        "exampleZh": "該工程師想出了一項精巧設計，使生產成本降低了一半。",
        "memoryTip": "come up (浮上腦海) + with ➔ 靈光一現提出想法"
    },
    {
        "word": "bring about", "chunk": "bring a - bout", "ipa": "/brɪŋ əˈbaʊt/", "pos": "phr.", "icon": "🌀",
        "zh": "引起、促成、導致 (= cause / lead to)", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "bring about profound social reform (促成深刻社會改革)",
        "example": "The industrial revolution brought about massive urbanization across Europe.",
        "exampleZh": "工業革命促成了全歐洲範圍的大規模都市化。",
        "memoryTip": "bring (帶來) + about (周遭) ➔ 讓周遭產生變革 ➔ 引起促成"
    },
    {
        "word": "cope with", "chunk": "cope with", "ipa": "/koʊp wɪð/", "pos": "phr.", "icon": "🧘",
        "zh": "應對、處理、克服 (壓力困難)", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "cope with extreme stress (應對巨大壓力)",
        "example": "Mindfulness meditation helps healthcare professionals cope with daily emotional burnout.",
        "exampleZh": "正念冥想有助於醫護專業人員應對日常的情緒倦怠。",
        "memoryTip": "cope (抗衡) + with ➔ 與困難並肩作戰並克服之 ➔ 應對"
    },
    {
        "word": "result in", "chunk": "re - sult in", "ipa": "/rɪˈzʌlt ɪn/", "pos": "phr.", "icon": "🎯",
        "zh": "導致、造成 (= lead to / cause)", "category": "大考高頻動詞片語 / Causality",
        "collocation": "result in heavy casualties (造成重大傷亡)",
        "example": "Careless driving and icy highway surfaces often result in catastrophic pileups.",
        "exampleZh": "粗心駕駛加上結冰的高速公路路面往往導致災難性的連環車禍。",
        "memoryTip": "注意：A result in B (A 導致 B)；A result from B (A 起因於 B)！"
    },
    {
        "word": "put up with", "chunk": "put up with", "ipa": "/pʊt ʌp wɪð/", "pos": "phr.", "icon": "😣",
        "zh": "忍受、容忍 (= tolerate / endure)", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "put up with constant noise (忍受持續噪音)",
        "example": "She refused to put up with toxic workplace harassment and notified HR immediately.",
        "exampleZh": "她拒絕容忍職場有毒騷擾行為，並立即通報了人力資源部。",
        "memoryTip": "put up (架起心靈圍牆) + with ➔ 勉強隱忍支撐"
    },
    {
        "word": "take for granted", "chunk": "take for gran - ted", "ipa": "/teɪk fɔːr ˈɡræn.tɪd/", "pos": "phr.", "icon": "🤲",
        "zh": "視為理所當然", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "take sth for granted (將某事視為理所當然)",
        "example": "We must never take our democratic freedoms and clean drinking water for granted.",
        "exampleZh": "我們絕不可將民主自由與純淨飲用水視為理所當然。",
        "memoryTip": "grant (天賜/核准) ➔ 自認理應享受 ➔ 視為理所當然"
    },
    {
        "word": "look forward to", "chunk": "look for - ward to", "ipa": "/lʊk ˈfɔːr.wɚd tuː/", "pos": "phr.", "icon": "🌅",
        "zh": "引頸期盼、期待 (to 為介系詞後接 V-ing/N)", "category": "大考高頻動詞片語 / Grammar",
        "collocation": "look forward to hearing from you (期待收到您的來信)",
        "example": "Graduating seniors eagerly look forward to starting their college journeys.",
        "exampleZh": "高三畢業生滿懷熱忱，期待著展開他們的大學生涯。",
        "memoryTip": "大考文法陷阱：此處 to 是介系詞！後方必須接動名詞 (V-ing) 或名詞！"
    },
    {
        "word": "carry out", "chunk": "car - ry out", "ipa": "/ˈkær.i aʊt/", "pos": "phr.", "icon": "📋",
        "zh": "貫徹、執行 (計畫、實驗、命令)", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "carry out scientific experiments (執行科學實驗)",
        "example": "The laboratory carried out rigorous clinical trials to ensure medication safety.",
        "exampleZh": "該實驗室執行了嚴謹的臨床試驗以確保藥物安全性。",
        "memoryTip": "carry (搬運) + out (出來) ➔ 將紙上計畫搬出來實行 ➔ 貫徹執行"
    },
    {
        "word": "give rise to", "chunk": "give rise to", "ipa": "/ɡɪv raɪz tuː/", "pos": "phr.", "icon": "⚡",
        "zh": "引起、招致、導致", "category": "大考高頻動詞片語 / Causality",
        "collocation": "give rise to intense debate (引發激烈論戰)",
        "example": "The controversial new zoning policy gave rise to heated protests in city hall.",
        "exampleZh": "引發爭議的新土地分區政策在市議會激起了激烈的抗議。",
        "memoryTip": "give (給予) + rise (上升機會) ➔ 讓爭端冒出頭 ➔ 引起促成"
    },
    {
        "word": "stand for", "chunk": "stand for", "ipa": "/stænd fɔːr/", "pos": "phr.", "icon": "🏛️",
        "zh": "代表、象徵；支持 (理念)", "category": "大考高頻動詞片語 / Meaning",
        "collocation": "stand for justice and equity (代表並捍衛正義與公平)",
        "example": "The acronym UNESCO stands for United Nations Educational, Scientific and Cultural Organization.",
        "exampleZh": "縮寫 UNESCO 代表聯合國教科文組織。",
        "memoryTip": "stand (站立) + for (為了) ➔ 為某理念挺身而立 ➔ 代表/支持"
    },
    {
        "word": "take advantage of", "chunk": "take ad - van - tage of", "ipa": "/teɪk ədˈvæn.t̬ɪdʒ ʌv/", "pos": "phr.", "icon": "🎯",
        "zh": "利用 (機會)；占...便宜", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "take full advantage of the opportunity (充分利用這次良機)",
        "example": "Ambitious students take advantage of library databases to broaden their academic research.",
        "exampleZh": "有抱負的學生善用圖書館資料庫來拓展他們的學術研究。",
        "memoryTip": "advantage (優勢) ➔ 抓住優勢 ➔ 充分利用"
    },
    {
        "word": "turn down", "chunk": "turn down", "ipa": "/tɝːn daʊn/", "pos": "phr.", "icon": "🙅",
        "zh": "拒絕 (提議/邀請)；調低 (音量)", "category": "大考高頻動詞片語 / Phrasal Verbs",
        "collocation": "turn down the job offer (婉拒工作錄取)",
        "example": "He had to turn down the prestigious fellowship because of family obligations.",
        "exampleZh": "由於家庭責任，他不得不婉拒那項享負盛名的研究學者職位。",
        "memoryTip": "turn (轉) + down (向下) ➔ 把大拇指朝下 ➔ 拒絕"
    },
    {
        "word": "make sense", "chunk": "make sense", "ipa": "/meɪk sens/", "pos": "phr.", "icon": "🧠",
        "zh": "有道理、合乎邏輯、講得通", "category": "大考高頻動詞片語 / Logic",
        "collocation": "make good sense (十分有道理)",
        "example": "After re-evaluating the financial forecast, the CEO's austerity plan makes complete sense.",
        "exampleZh": "在重新評估財務預測後，執行長的緊縮開支計畫完全說得通。",
        "memoryTip": "sense (感覺/道理) ➔ 製造出道理 ➔ 合乎邏輯"
    },
    {
        "word": "in terms of", "chunk": "in terms of", "ipa": "/ɪn tɝːmz ʌv/", "pos": "phr.", "icon": "📐",
        "zh": "就...而言、從...角度來看", "category": "大考高頻動詞片語 / Connection",
        "collocation": "in terms of cost efficiency (就成本效益而言)",
        "example": "In terms of academic reputation and research output, the university ranks in the top five.",
        "exampleZh": "就學術聲望與研究產出而言，該大學穩居全國前五名。",
        "memoryTip": "terms (條件/字眼) ➔ 在該範疇字眼之內 ➔ 就...而言"
    },
    {
        "word": "on behalf of", "chunk": "on be - half of", "ipa": "/ɑːn bɪˈhæf ʌv/", "pos": "phr.", "icon": "👥",
        "zh": "代表、代為", "category": "大考高頻動詞片語 / Representation",
        "collocation": "on behalf of the entire committee (代表全體委員會)",
        "example": "The principal delivered an inspiring speech on behalf of the faculty and staff.",
        "exampleZh": "校長代表全體教職員工發表了一場振奮人心的演說。",
        "memoryTip": "behalf (利益/方面) ➔ 站在對方的立場說話 ➔ 代表某人"
    },
    {
        "word": "in spite of", "chunk": "in spite of", "ipa": "/ɪn spaɪt ʌv/", "pos": "phr.", "icon": "⛈️",
        "zh": "儘管、不管 (= despite，介系詞後接名詞/V-ing)", "category": "大考高頻動詞片語 / Contrast",
        "collocation": "in spite of bad weather (儘管天氣惡劣)",
        "example": "In spite of torrential downpours, the marathon runners pushed on toward the finish line.",
        "exampleZh": "儘管傾盆大雨，馬拉松跑者依然奮勇奔向終點線。",
        "memoryTip": "spite (惡意/藐視) ➔ 藐視困難前進 ➔ 儘管 (= despite)"
    },
    {
        "word": "as long as", "chunk": "as long as", "ipa": "/æz lɑːŋ æz/", "pos": "phr.", "icon": "⛓️",
        "zh": "只要 (引導條件子句)", "category": "大考高頻動詞片語 / Condition",
        "collocation": "as long as you keep trying (只要你持續努力)",
        "example": "You are welcome to borrow the laboratory equipment as long as you return it intact.",
        "exampleZh": "只要你完好無損地歸還，非常歡迎你借用實驗室設備。",
        "memoryTip": "表條件「只要」；表時間則為「長達...之久」"
    }
]

# ==============================================================================
# 4. TOEIC 多益國際商務 1,500 (TOEIC Business Core) - 52 核心字彙
# ==============================================================================
TOEIC_CARDS = [
    {
        "word": "negotiation", "chunk": "ne - go - ti - a - tion", "ipa": "/nɪˌɡoʊ.ʃiˈeɪ.ʃən/", "pos": "n.", "icon": "🤝",
        "zh": "談判、協商、交涉", "category": "商務合約與談判 / Contracts",
        "collocation": "contract negotiations (合約談判)",
        "example": "After weeks of intensive negotiations, both multinational corporations signed the merger agreement.",
        "exampleZh": "經過數週的密集協商，兩家跨國企業終於簽署了合併協議。",
        "memoryTip": "ti 在母音前發軟音 /ʃi/，tion 發 /ʃən/。TOEIC 聽力 Part 3/4 極高頻！"
    },
    {
        "word": "itinerary", "chunk": "i - tin - er - ar - y", "ipa": "/aɪˈtɪn.ə.rɛr.i/", "pos": "n.", "icon": "✈️",
        "zh": "行程表、差旅行程規劃", "category": "公司運營與行程 / Operations",
        "collocation": "travel / flight itinerary (差旅/航班行程表)",
        "example": "The executive administrative assistant emailed the comprehensive business itinerary to the sales director.",
        "exampleZh": "執行行政助理已將詳細的商務行程表以電子郵件寄給業務總監。",
        "memoryTip": "itin- (走動/旅行，同 exit) + -ary (名詞，相關物品) ➔ 旅程表"
    },
    {
        "word": "reimburse", "chunk": "re - im - burse", "ipa": "/ˌriː.ɪmˈbɜːrs/", "pos": "v.", "icon": "💳",
        "zh": "核銷、報銷、補償 (款項)", "category": "財務與採購 / Finance",
        "collocation": "reimburse travel expenses (報銷出差費用)",
        "example": "Employees must submit original itemized receipts within thirty days to be reimbursed for meal expenses.",
        "exampleZh": "員工必須在三十天內提交原始明細收據，以利核銷差旅餐飲費用。",
        "memoryTip": "re- (回) + im- (入) + purse (錢包) ➔ 把墊付的錢放回錢包 ➔ 報銷"
    },
    {
        "word": "implement", "chunk": "im - ple - ment", "ipa": "/ˈɪm.plə.mənt/", "pos": "v. / n.", "icon": "⚙️",
        "zh": "貫徹執行、實施；工具", "category": "策略與政策執行 / Execution",
        "collocation": "implement a strict quality control policy (實施嚴格品管政策)",
        "example": "Management decided to implement an automated inventory tracking software across all regional warehouses.",
        "exampleZh": "管理層決定在所有區域倉庫全面實施自動化庫存追蹤軟體。",
        "memoryTip": "im- (進入) + ple (填滿，同 complete) ➔ 將方案填滿落實 ➔ 貫徹執行"
    },
    {
        "word": "accommodate", "chunk": "ac - com - mo - date", "ipa": "/əˈkɑː.mə.deɪt/", "pos": "v.", "icon": "🏨",
        "zh": "容納；迎合、配合 (特殊需求)", "category": "客戶接待與設施 / Hospitality",
        "collocation": "accommodate dietary restrictions (迎合特殊飲食限制)",
        "example": "The conference venue can comfortably accommodate up to eight hundred international symposium attendees.",
        "exampleZh": "會議場地能舒適容納多達八百位國際研討會與會者。",
        "memoryTip": "雙寫 c 與雙寫 m！date 有 Magic E 發長音 /eɪt/。TOEIC 飯店與會議情境必考！"
    },
    {
        "word": "procurement", "chunk": "pro - cure - ment", "ipa": "/prəˈkjʊr.mənt/", "pos": "n.", "icon": "📦",
        "zh": "政府/企業採購、調度", "category": "財務與採購 / Procurement",
        "collocation": "procurement department (採購部門)",
        "example": "The procurement manager negotiated bulk purchasing discounts with three certified vendors.",
        "exampleZh": "採購經理與三家合格供應商洽談了大宗採購的折扣優惠。",
        "memoryTip": "pro- (向前) + cure (照顧/設法弄到) + -ment ➔ 設法為公司取得物資 ➔ 採購"
    },
    {
        "word": "specifications", "chunk": "spec - i - fi - ca - tions", "ipa": "/ˌspes.ə.fɪˈkeɪ.ʃənz/", "pos": "n.", "icon": "📐",
        "zh": "產品規格、技術明細 (常複數)", "category": "物流與製造管理 / Production",
        "collocation": "meet technical specifications (符合技術規格標準)",
        "example": "The manufactured microchips must strictly comply with international semiconductor specifications.",
        "exampleZh": "製造出的晶片必須嚴格符合國際半導體規格標準。",
        "memoryTip": "specific (明確具體的) ➔ 規格明細書"
    },
    {
        "word": "agenda", "chunk": "a - gen - da", "ipa": "/əˈdʒen.də/", "pos": "n.", "icon": "📋",
        "zh": "會議議程、代辦事項", "category": "公司運營與行程 / Meetings",
        "collocation": "items on the agenda (議程上的討論事項)",
        "example": "The board chairperson distributed the revised quarterly agenda before opening the annual meeting.",
        "exampleZh": "董事會主席在年度大會開幕前發送了修訂後的季度議程。",
        "memoryTip": "ag- (做/行動，如 agent) ➔ 要付諸行動的事項清單 ➔ 議程"
    },
    {
        "word": "revenue", "chunk": "rev - e - nue", "ipa": "/ˈrev.ə.nuː/", "pos": "n.", "icon": "💰",
        "zh": "營收、收入 (指公司營業額)", "category": "財務與採購 / Finance",
        "collocation": "annual revenue growth (年度營收增長)",
        "example": "Quarterly earnings reports showed a twelve percent surge in overseas subscription revenue.",
        "exampleZh": "季度財報顯示海外訂閱營收大幅攀升了百分之十二。",
        "memoryTip": "re- (回) + ven (來，如 venue) ➔ 資金回流 ➔ 營收"
    },
    {
        "word": "warranty", "chunk": "war - ran - ty", "ipa": "/ˈwɔːr.ən.t̬i/", "pos": "n.", "icon": "🛡️",
        "zh": "產品保固、維修保證書", "category": "商務合約與談判 / Customer Service",
        "collocation": "under warranty (在保固期內)",
        "example": "All purchased electronic appliances come with a two-year limited manufacturer warranty.",
        "exampleZh": "所有購買的電子家電均附有製造商提供的兩年有限保固。",
        "memoryTip": "warrant (保證/授權) + -y ➔ 保固書"
    },
    {
        "word": "delegate", "chunk": "del - e - gate", "ipa": "/ˈdel.ə.ɡət/ (n.) , /-ɡeɪt/ (v.)", "pos": "n. / v.", "icon": "👥",
        "zh": "會議代表；委派、授權 (工作責任)", "category": "人力資源與招募 / Leadership",
        "collocation": "delegate tasks to subordinates (委派任務給下屬)",
        "example": "Effective executives learn how to delegate operational responsibilities to experienced team leaders.",
        "exampleZh": "高效的企業主管懂得如何將日常營運職責授權委派給資深的團隊組長。",
        "memoryTip": "名詞發短母音 /-ɡət/ 代表；動詞發長母音 /-ɡeɪt/ 授權委派"
    },
    {
        "word": "logistics", "chunk": "lo - gis - tics", "ipa": "/ləˈdʒɪs.tɪks/", "pos": "n.", "icon": "🚚",
        "zh": "物流、後勤配送規劃", "category": "物流與製造管理 / Supply Chain",
        "collocation": "global supply chain and logistics (全球供應鏈與物流)",
        "example": "The e-commerce conglomerate upgraded its regional logistics centers to ensure next-day delivery.",
        "exampleZh": "該電商巨頭升級了區域物流中心以確保隔日送達服務。",
        "memoryTip": "源自軍隊後勤調配，商務中指倉儲運輸與貨運供應鏈"
    },
    {
        "word": "inventory", "chunk": "in - ven - to - ry", "ipa": "/ˈɪn.vən.tɔːr.i/", "pos": "n.", "icon": "📑",
        "zh": "庫存盤點、存貨清單", "category": "物流與製造管理 / Inventory",
        "collocation": "take inventory (進行庫存盤點)",
        "example": "The retail warehouse closes for half a day each quarter to conduct a complete physical inventory.",
        "exampleZh": "該零售倉庫每季暫停營業半天以進行全面性的實體庫存盤點。",
        "memoryTip": "in- (入) + vent (來到) ➔ 盤點進貨來到倉庫的所有商品 ➔ 庫存"
    },
    {
        "word": "confidential", "chunk": "con - fi - den - tial", "ipa": "/ˌkɑːn.fəˈden.ʃəl/", "pos": "adj.", "icon": "🔒",
        "zh": "機密的、保密的", "category": "商務合約與談判 / Legal",
        "collocation": "strictly confidential information (高度機密資訊)",
        "example": "All patent blueprints and financial records must be stored in strictly confidential digital vaults.",
        "exampleZh": "所有專利藍圖與財務紀錄都必須儲存在高度機密的數位保險庫中。",
        "memoryTip": "con- (加強) + fid (信任，同 confidence) + -tial ➔ 僅能告知受信任之人的 ➔ 機密的"
    },
    {
        "word": "compliance", "chunk": "com - pli - ance", "ipa": "/kəmˈplaɪ.əns/", "pos": "n.", "icon": "⚖️",
        "zh": "法規遵從、合規性 (搭配 with)", "category": "商務合約與談判 / Regulatory",
        "collocation": "in compliance with safety regulations (符合安全法規)",
        "example": "The pharmaceutical manufacturing facility operates in strict compliance with federal FDA standards.",
        "exampleZh": "該製藥生產廠房的營運嚴格遵從聯邦 FDA 的規範標準。",
        "memoryTip": "comply with (遵守) ➔ 名詞 compliance"
    },
    {
        "word": "merger", "chunk": "merg - er", "ipa": "/ˈmɝː.dʒɚ/", "pos": "n.", "icon": "🏢",
        "zh": "企業合併、兼併", "category": "策略與政策執行 / M&A",
        "collocation": "merger and acquisition (M&A，企業併購)",
        "example": "The proposed merger between the two airline corporations awaits antitrust regulatory approval.",
        "exampleZh": "兩家航空公司擬議中的合併案正在等待反托拉斯監管機構的審查批准。",
        "memoryTip": "merge (融入/結合) + -er ➔ 結合成為一家公司 ➔ 合併"
    },
    {
        "word": "invoice", "chunk": "in - voice", "ipa": "/ˈɪn.vɔɪs/", "pos": "n. / v.", "icon": "🧾",
        "zh": "發票、出貨請款單；開立發票", "category": "財務與採購 / Accounting",
        "collocation": "issue an invoice (開立請款發票)",
        "example": "Payment will be remitted within thirty days upon receipt of the official contractor invoice.",
        "exampleZh": "收到承包商的正式請款發票後，款項將在三十天內匯出。",
        "memoryTip": "envoi (法語：寄出送出) ➔ 隨貨物寄出的付款明細清單 ➔ 請款單"
    },
    {
        "word": "compensation", "chunk": "com - pen - sa - tion", "ipa": "/ˌkɑːm.penˈseɪ.ʃən/", "pos": "n.", "icon": "💼",
        "zh": "薪資待遇、報酬；補償金", "category": "人力資源與招募 / Compensation",
        "collocation": "compensation package (整體薪酬福利方案)",
        "example": "The enterprise offers a highly competitive compensation package including comprehensive health insurance.",
        "exampleZh": "該企業提供極具競爭力的薪資福利方案，包含全額健保與績效獎金。",
        "memoryTip": "compensate (補償/酬謝) ➔ 勞動付出的報酬 ➔ 薪酬"
    },
    {
        "word": "turnover", "chunk": "turn - o - ver", "ipa": "/ˈtɝːnˌoʊ.vɚ/", "pos": "n.", "icon": "🔄",
        "zh": "員工離職流動率；商品營業額", "category": "人力資源與招募 / Metrics",
        "collocation": "high employee turnover rate (偏高的員工流動率)",
        "example": "Implementing flexible telecommuting policies successfully reduced staff turnover by twenty percent.",
        "exampleZh": "實施彈性遠端辦公政策成功使員工離職流動率降低了百分之二十。",
        "memoryTip": "turn (轉) + over (翻過去) ➔ 人員頻繁更替流動"
    },
    {
        "word": "feasibility", "chunk": "fea - si - bil - i - ty", "ipa": "/ˌfiː.zəˈbɪl.ə.t̬i/", "pos": "n.", "icon": "🔍",
        "zh": "可行性、切實可行", "category": "策略與政策執行 / Planning",
        "collocation": "conduct a feasibility study (執行可行性研究)",
        "example": "The urban planning board commissioned a comprehensive feasibility study for the light rail transit.",
        "exampleZh": "都市計畫委員會委託針對輕軌捷運系統進行了全面的可行性研究。",
        "memoryTip": "feasible (可行的，同 able to do) + -ity ➔ 可行性"
    },
    {
        "word": "appraisal", "chunk": "ap - prais - al", "ipa": "/əˈpreɪ.zəl/", "pos": "n.", "icon": "📝",
        "zh": "員工績效考核；資產估價", "category": "人力資源與招募 / HR",
        "collocation": "annual performance appraisal (年度績效考核評估)",
        "example": "Promotions and salary increases are determined during the formal year-end performance appraisal.",
        "exampleZh": "升遷與加薪幅度是在正式的年終績效考核期間決定的。",
        "memoryTip": "praise (稱讚/評鑑價值) ➔ 評估價值與表現 ➔ 考核估價"
    },
    {
        "word": "deficit", "chunk": "def - i - cit", "ipa": "/ˈdef.ə.sɪt/", "pos": "n.", "icon": "📉",
        "zh": "財政赤字、虧損額 (反義詞 surplus)", "category": "財務與採購 / Finance",
        "collocation": "budget deficit (預算赤字)",
        "example": "The finance director warned that unexpected supply chain disruptions could widen the quarterly deficit.",
        "exampleZh": "財務長警告，非預期的供應鏈中斷可能會擴大本季度的財政赤字。",
        "memoryTip": "de- (欠缺) + fic (做) ➔ 入不敷出 ➔ 赤字"
    },
    {
        "word": "surplus", "chunk": "sur - plus", "ipa": "/ˈsɝː.pləs/", "pos": "n. / adj.", "icon": "📈",
        "zh": "盈餘、過剩；剩餘的 (反義詞 deficit)", "category": "財務與採購 / Finance",
        "collocation": "trade surplus (貿易順差盈餘)",
        "example": "A strong export performance in semiconductors yielded a record trade surplus this quarter.",
        "exampleZh": "半導體強勁的出口表現為本季度帶來了創紀錄的貿易順差盈餘。",
        "memoryTip": "sur- (超過) + plus (加上) ➔ 超過所需留下來的 ➔ 盈餘"
    },
    {
        "word": "vendor", "chunk": "ven - dor", "ipa": "/ˈven.dɚ/", "pos": "n.", "icon": "🏪",
        "zh": "供應商、售貨廠商、攤販", "category": "財務與採購 / Supply Chain",
        "collocation": "approved vendor list (合格供應商名錄)",
        "example": "The corporate procurement team only contracts with vendors who guarantee green manufacturing practices.",
        "exampleZh": "企業採購團隊僅與保證符合綠色製造規範的供應商簽訂合約。",
        "memoryTip": "vend (販賣，如 vending machine 自動販賣機) + -or (人/機構) ➔ 供應商"
    },
    {
        "word": "contingency", "chunk": "con - tin - gen - cy", "ipa": "/kənˈtɪn.dʒən.si/", "pos": "n.", "icon": "🚨",
        "zh": "緊急應變方案、意外事故預備", "category": "策略與政策執行 / Risk",
        "collocation": "contingency plan (應變方案/備案)",
        "example": "The risk management committee formulated a contingency plan in case of power grid failures.",
        "exampleZh": "風險管理委員會擬定了一份緊急應變備案，以防電網發生故障。",
        "memoryTip": "con- (共同) + ting/tang (接觸/發生) ➔ 萬一意外降臨時的應對方案 ➔ 備案"
    },
    {
        "word": "terminate", "chunk": "ter - mi - nate", "ipa": "/ˈtɝː.mə.neɪt/", "pos": "v.", "icon": "🛑",
        "zh": "終止、解除 (合約)、結束", "category": "商務合約與談判 / Legal",
        "collocation": "terminate a contractual agreement (解除合約協議)",
        "example": "Either party reserves the legal right to terminate the contract upon thirty days written notice.",
        "exampleZh": "任何一方均保留在提前三十天提出書面通知後終止合約的法定權利。",
        "memoryTip": "term (界限/終點，如 terminal 航廈/終點站) + -ate ➔ 到達終點 ➔ 終止合約"
    },
    {
        "word": "lucrative", "chunk": "lu - cra - tive", "ipa": "/ˈluː.krə.t̬ɪv/", "pos": "adj.", "icon": "💎",
        "zh": "獲利豐厚的、賺錢的", "category": "市場營銷與品牌 / Business",
        "collocation": "lucrative contract / market (獲利豐厚的合約/利潤可觀的市場)",
        "example": "Securing the government cloud infrastructure tender proved to be a highly lucrative venture.",
        "exampleZh": "贏得政府雲端基礎建設的標案被證實是一項獲利極為豐厚的商業投資。",
        "memoryTip": "lucre (錢財利潤) + -ative ➔ 利潤滾滾的 ➔ 獲利豐厚的"
    },
    {
        "word": "unanimous", "chunk": "u - nan - i - mous", "ipa": "/juːˈnæn.ə.məs/", "pos": "adj.", "icon": "🙋‍♂️",
        "zh": "全體一致的、毫無異議的", "category": "公司運營與行程 / Governance",
        "collocation": "unanimous approval (全體一致批准)",
        "example": "The board of directors gave unanimous approval to the appointment of the new chief operating officer.",
        "exampleZh": "董事會全體一致通過了新任營運長的人事任命案。",
        "memoryTip": "un- (單一，如 unite) + anim (心智，如 animal) + -ous ➔ 眾人一條心 ➔ 全體一致的"
    },
    {
        "word": "affiliate", "chunk": "af - fil - i - ate", "ipa": "/əˈfɪl.i.eɪt/", "pos": "n. / v.", "icon": "🌐",
        "zh": "附屬機構、分公司；使隸屬", "category": "策略與政策執行 / Organization",
        "collocation": "regional corporate affiliate (區域分公司/關係企業)",
        "example": "The media conglomerate distributes streaming content through its overseas European affiliates.",
        "exampleZh": "該媒體巨頭透過其海外歐洲分公司與關係機構發行串流影音內容。",
        "memoryTip": "af- (朝向) + fili (兒子，如 filial 孝順的) + -ate ➔ 收為子機構 ➔ 附屬機構/分會"
    },
    {
        "word": "dividend", "chunk": "div - i - dend", "ipa": "/ˈdɪv.ə.dend/", "pos": "n.", "icon": "💵",
        "zh": "股利、紅利 (上市公司配發予股東)", "category": "財務與採購 / Stocks",
        "collocation": "pay quarterly dividends (配發季度股利)",
        "example": "Shareholders rejoiced after the tech corporation declared a substantial cash dividend increase.",
        "exampleZh": "在該科技企業宣布大幅調高現金股利後，廣大股東皆歡欣鼓舞。",
        "memoryTip": "divide (分開) + -end ➔ 分發利潤給股東 ➔ 股利紅利"
    },
    {
        "word": "consortium", "chunk": "con - sor - ti - um", "ipa": "/kənˈsɔːr.ti.əm/", "pos": "n.", "icon": "🏛️",
        "zh": "企業聯盟、跨國財團、合夥聯合體", "category": "策略與政策執行 / Corporate",
        "collocation": "international banking consortium (國際銀行聯合團)",
        "example": "A consortium of engineering firms submitted a joint bid to construct the high-speed rail line.",
        "exampleZh": "由多家工程公司組成的聯合財團提交了建造高鐵路線的共同投標書。",
        "memoryTip": "con- (共同) + sort (命運/同類) + -ium ➔ 命運相連的聯合組織 ➔ 財團/聯合體"
    },
    {
        "word": "deadline", "chunk": "dead - line", "ipa": "/ˈded.laɪn/", "pos": "n.", "icon": "⏰",
        "zh": "最後截止期限", "category": "公司運營與行程 / Time",
        "collocation": "meet / miss the strict deadline (趕上/錯過嚴格的截止期限)",
        "example": "The engineering team worked overtime to ensure the software release met the launch deadline.",
        "exampleZh": "工程團隊全力加班以確保軟體發表能如期趕上發布截止日。",
        "memoryTip": "dead (死) + line (線) ➔ 超過這條線就出局 ➔ 截止死線"
    },
    # 更多 TOEIC 高頻職場詞彙
    {
        "word": "audit", "chunk": "au - dit", "ipa": "/ˈɑː.dɪt/", "pos": "n. / v.", "icon": "🔍",
        "zh": "查帳、審計、稽核", "category": "財務與採購 / Accounting",
        "collocation": "annual financial audit (年度財務審計)",
        "example": "An external accounting firm conducted an independent audit of the firm's balance sheets.",
        "exampleZh": "一家外部獨立會計師事務所對該公司的資產負債表進行了查帳審計。",
        "memoryTip": "aud- (聽，同 audio) ➔ 早期官員透過當面聽取口頭陳述查帳 ➔ 審計稽核"
    },
    {
        "word": "liability", "chunk": "li - a - bil - i - ty", "ipa": "/ˌlaɪ.əˈbɪl.ə.t̬i/", "pos": "n.", "icon": "⚖️",
        "zh": "法律責任、賠償責任；債務負債", "category": "商務合約與談判 / Legal",
        "collocation": "limited liability company (有限責任公司)",
        "example": "The insurance contract clearly outlines the company's liability in cases of equipment failure.",
        "exampleZh": "保險合約清楚明列了公司在設備故障時所應承擔的賠償責任。",
        "memoryTip": "liable (有責任的) + -ity ➔ 法律賠償責任；複數 liabilities 表負債"
    },
    {
        "word": "subsidiary", "chunk": "sub - sid - i - ar - y", "ipa": "/səbˈsɪd.i.er.i/", "pos": "n. / adj.", "icon": "🏢",
        "zh": "子公司；次要的、附屬的", "category": "策略與政策執行 / Organization",
        "collocation": "wholly owned subsidiary (百分之百持股子公司)",
        "example": "The conglomerate operates fifty subsidiaries in over twenty countries worldwide.",
        "exampleZh": "該企業集團在全球二十多個國家經營著五十家子公司。",
        "memoryTip": "sub- (在下方) + sid (坐著，同 reside) ➔ 坐在母公司底下 ➔ 子公司"
    },
    {
        "word": "franchise", "chunk": "fran - chise", "ipa": "/ˈfræn.tʃaɪz/", "pos": "n. / v.", "icon": "🏪",
        "zh": "特許加盟權、經銷權；給予加盟權", "category": "市場營銷與品牌 / Retail",
        "collocation": "franchise agreement (加盟合約協議)",
        "example": "The fast food chain expanded rapidly across Asia by offering attractive franchise opportunities.",
        "exampleZh": "該速食連鎖店透過提供吸引人的特許加盟機會，在亞洲市場迅速擴張。",
        "memoryTip": "franc (自由/免稅) ➔ 給予經營特定品牌生意的特權自由 ➔ 加盟權"
    },
    {
        "word": "incentive", "chunk": "in - cen - tive", "ipa": "/ɪnˈsen.tɪv/", "pos": "n.", "icon": "🎁",
        "zh": "激勵措施、獎勵誘因、獎金", "category": "人力資源與招募 / Compensation",
        "collocation": "financial / sales incentive (財務激勵/業務銷售獎金)",
        "example": "The corporation offers performance incentives to top sales representatives every quarter.",
        "exampleZh": "該企業每季為頂尖業務代表提供豐厚的績效獎勵獎金。",
        "memoryTip": "in- (進入) + cant/cent (唱歌/歌詠，同 chant) ➔ 唱起號角鼓舞士氣 ➔ 誘因激勵"
    },
    {
        "word": "portfolio", "chunk": "port - fo - li - o", "ipa": "/pɔːrtˈfoʊ.li.oʊ/", "pos": "n.", "icon": "📁",
        "zh": "投資組合；作品集、產品系列", "category": "財務與採購 / Investment",
        "collocation": "diversified investment portfolio (多元化的投資組合)",
        "example": "Financial advisors recommend building a diversified portfolio to hedge against market volatility.",
        "exampleZh": "財務顧問建議建立多元化的投資組合，以規避市場劇烈波動的風險。",
        "memoryTip": "port (攜帶) + folio (活頁紙夾) ➔ 隨身攜帶的證券紙夾或作品集 ➔ 投資組合"
    },
    {
        "word": "merchandise", "chunk": "mer - chan - dise", "ipa": "/ˈmɝː.tʃən.daɪs/", "pos": "n. / v.", "icon": "🛍️",
        "zh": "商品、貨物 (不可數名詞)；推銷商品", "category": "物流與製造管理 / Retail",
        "collocation": "defective merchandise (有瑕疵的商品貨物)",
        "example": "Customers can exchange purchased merchandise within fourteen days with an original receipt.",
        "exampleZh": "顧客持原始收據可在十四天內更換所購買的商品。",
        "memoryTip": "merchant (商人) ➔ 商人買賣的東西 ➔ 商品 (不可數！)"
    },
    {
        "word": "defect", "chunk": "de - fect", "ipa": "/ˈdiː.fekt/ (n.) , /dɪˈfekt/ (v.)", "pos": "n. / v.", "icon": "⚠️",
        "zh": "產品缺陷、瑕疵；背叛叛逃", "category": "物流與製造管理 / Quality",
        "collocation": "manufacturing defect (製造瑕疵缺損)",
        "example": "All returned smartphones are inspected by quality engineers for microscopic screen defects.",
        "exampleZh": "所有退貨的智慧型手機均由品管工程師檢驗微觀的螢幕瑕疵。",
        "memoryTip": "de- (欠缺) + fect (做，同 factor/perfect) ➔ 沒做好的地方 ➔ 瑕疵"
    },
    {
        "word": "fluctuation", "chunk": "fluc - tu - a - tion", "ipa": "/ˌflʌk.tʃuˈeɪ.ʃən/", "pos": "n.", "icon": "📉",
        "zh": "價格/匯率波動、上下起伏", "category": "財務與採購 / Finance",
        "collocation": "currency exchange fluctuation (外幣匯率波動)",
        "example": "Export businesses must hedge against unexpected fluctuations in crude oil prices.",
        "exampleZh": "出口貿易企業必須針對原油價格的意外波動進行避險操作。",
        "memoryTip": "fluct (流水/水波) + -ation ➔ 潮起潮落 ➔ 波動"
    },
    {
        "word": "negotiable", "chunk": "ne - go - tia - ble", "ipa": "/nəˈɡoʊ.ʃi.ə.bəl/", "pos": "adj.", "icon": "🏷️",
        "zh": "可協商的、價格可議的", "category": "商務合約與談判 / Negotiation",
        "collocation": "salary is negotiable (薪資待遇面議可協商)",
        "example": "The wholesale price per carton is negotiable depending on the volume of the purchase order.",
        "exampleZh": "每箱批發價格可依據採購訂單數量多寡予以協商議定。",
        "memoryTip": "negotiate (談判) + -able ➔ 可以再談的 ➔ 可協商的"
    },
    {
        "word": "leverage", "chunk": "lev - er - age", "ipa": "/ˈlev.ɚ.ɪdʒ/", "pos": "v. / n.", "icon": "🏗️",
        "zh": "善加利用 (資源/優勢)；槓桿操作", "category": "策略與政策執行 / Strategy",
        "collocation": "leverage market leadership (善加發揮市場領先優勢)",
        "example": "The brand plans to leverage social media influencers to reach younger consumer demographics.",
        "exampleZh": "該品牌計畫善用社群媒體意見領袖的影響力，以觸及年輕消費客群。",
        "memoryTip": "lever (槓桿) ➔ 用槓桿以小博大、充分利用"
    },
    {
        "word": "bankruptcy", "chunk": "bank - rupt - cy", "ipa": "/ˈbæŋ.krəpt.si/", "pos": "n.", "icon": "💥",
        "zh": "破產、倒閉清算", "category": "財務與採購 / Legal",
        "collocation": "file for bankruptcy protection (申請破產保護)",
        "example": "Faced with crushing debt liabilities, the legacy retailer was forced to declare bankruptcy.",
        "exampleZh": "面臨沉重龐大的債務負擔，這家老牌零售商被迫宣告破產倒閉。",
        "memoryTip": "bank (銀行長凳) + rupt (斷裂破碎，同 interrupt) ➔ 錢莊櫃台被砸碎 ➔ 破產"
    },
    {
        "word": "entrepreneur", "chunk": "en - tre - pre - neur", "ipa": "/ˌɑːn.trə.prəˈnɝː/", "pos": "n.", "icon": "🚀",
        "zh": "創業者、企業家", "category": "策略與政策執行 / Business",
        "collocation": "aspiring tech entrepreneur (有抱負的科技創業者)",
        "example": "Venture capital firms invest heavily in promising tech entrepreneurs with disruptive visions.",
        "exampleZh": "創投基金大手筆投資於擁有顛覆性遠見的潛力科技創業者。",
        "memoryTip": "法語借詞 entre (在...之間) + preneur (抓取者) ➔ 勇於承擔商業風險開拓新局之人 ➔ 企業家"
    },
    {
        "word": "endorsement", "chunk": "en - dorse - ment", "ipa": "/ɪnˈdɔːrs.mənt/", "pos": "n.", "icon": "🌟",
        "zh": "名人代言；背書、公開支持", "category": "市場營銷與品牌 / Marketing",
        "collocation": "celebrity product endorsement (名人產品代言)",
        "example": "Securing an athletic superstar's endorsement boosted sneaker sales by thirty-five percent.",
        "exampleZh": "贏得體壇巨星的產品代言使該款運動鞋銷量激增了百分之三十五。",
        "memoryTip": "dors (背面，同 dorsal fin 背鰭) ➔ 在支票背後簽名背書支持 ➔ 代言背書"
    },
    {
        "word": "headquarters", "chunk": "head - quar - ters", "ipa": "/ˈhedˌkwɔːr.t̬ɚz/", "pos": "n.", "icon": "🏢",
        "zh": "總公司、企業總部 (單複數同形，常縮寫為 HQ)", "category": "公司運營與行程 / Facilities",
        "collocation": "corporate headquarters (企業營運總部)",
        "example": "The tech corporation recently relocated its global headquarters to a modern tech park in Silicon Valley.",
        "exampleZh": "該科技公司最近將其全球營運總部遷至矽谷的一座現代化科技園區。",
        "memoryTip": "head (首腦) + quarters (駐地營區) ➔ 司令總部/總公司"
    },
    {
        "word": "recession", "chunk": "re - ces - sion", "ipa": "/rɪˈseʃ.ən/", "pos": "n.", "icon": "📉",
        "zh": "經濟衰退、景氣蕭條", "category": "財務與採購 / Economy",
        "collocation": "deep economic recession (嚴重的經濟衰退蕭條)",
        "example": "Economists predict a mild recession as consumer interest rates and fuel prices stabilize.",
        "exampleZh": "經濟學家預測，隨著消費者利率與燃料價格趨於穩定，將出現溫和的經濟衰退。",
        "memoryTip": "re- (向後) + cess (行走，同 process) + -ion ➔ 經濟往後倒退 ➔ 衰退"
    }
]

# ==============================================================================
# 5. Digital SAT 語境學術詞 1,200 (SAT Contextual Vocabulary) - 48 核心字彙
# ==============================================================================
SAT_CARDS = [
    {
        "word": "corroborate", "chunk": "cor - rob - o - rate", "ipa": "/kəˈrɑː.bə.reɪt/", "pos": "v.", "icon": "🔍",
        "zh": "證實、確證、提供客觀證據支持", "category": "論據與實證支持 / Empirical",
        "collocation": "corroborate the scientific hypothesis (證實該科學假說)",
        "example": "Subsequent radiometric dating corroborated the archaeological timeline uncovered at the excavation site.",
        "exampleZh": "隨後的放射性碳定年法證實了發掘現場出土文物的考古年代時序。",
        "memoryTip": "cor- (加強) + robor (強壯/穩固，同 robust) + -ate ➔ 使論據更穩固 ➔ 證實"
    },
    {
        "word": "anomalous", "chunk": "a - nom - a - lous", "ipa": "/əˈnɑː.mə.ləs/", "pos": "adj.", "icon": "⚠️",
        "zh": "異常的、不規則的、反常規的", "category": "學術修辭與邏輯 / Scientific",
        "collocation": "anomalous experimental readings (反常的實驗讀數)",
        "example": "Astrophysicists were puzzled by anomalous gravitational fluctuations detected near the dwarf galaxy.",
        "exampleZh": "天文物理學家對在矮星系周圍偵測到的異常重力波動感到十分困惑。",
        "memoryTip": "a- (否定/無) + nomos (規則/常規) + -ous ➔ 不合乎常規的 ➔ 異常的"
    },
    {
        "word": "substantiate", "chunk": "sub - stan - ti - ate", "ipa": "/səbˈstæn.ʃi.eɪt/", "pos": "v.", "icon": "📜",
        "zh": "以事實證明、證實、使實體化", "category": "論據與實證支持 / Textual Evidence",
        "collocation": "substantiate claims with empirical data (以經驗數據佐證主張)",
        "example": "Without verifiable documentary records, the historian could not substantiate the oral legend.",
        "exampleZh": "缺乏可查證的文獻檔案記錄，歷史學家無法證實那則口述傳說的真實性。",
        "memoryTip": "substance (實質實體) ➔ 為論點提供實質骨肉 ➔ 證實 (= corroborate)"
    },
    {
        "word": "pragmatic", "chunk": "prag - mat - ic", "ipa": "/præɡˈmæt̬.ɪk/", "pos": "adj.", "icon": "🛠️",
        "zh": "務實的、注重實效的 (反義詞 idealistic / dogmatic)", "category": "學術哲學與決策 / Pragmatism",
        "collocation": "a pragmatic policy solution (務實的政策解決方案)",
        "example": "Rather than adhering to rigid ideological dogma, the diplomat proposed a pragmatic compromise.",
        "exampleZh": "該外交官並未墨守僵化的意識形態教條，而是提出了一項務實的折衷方案。",
        "memoryTip": "prag- (行動/實踐，同 practice) + -ic ➔ 重視實踐結果 ➔ 務實的"
    },
    {
        "word": "ambivalent", "chunk": "am - biv - a - lent", "ipa": "/æmˈbɪv.ə.lənt/", "pos": "adj.", "icon": "⚖️",
        "zh": "心存矛盾的、悲喜交集的、猶豫不決的", "category": "觀點對比與張力 / Psychology",
        "collocation": "feel ambivalent about the promotion (對這次升遷心情矛盾)",
        "example": "Critics remained ambivalent toward the experimental novel, praising its prose while lamenting its pacing.",
        "exampleZh": "評論家對這部實驗小說態度矛盾，既讚賞其優美散文，又對其情節節奏感到遺憾。",
        "memoryTip": "ambi- (兩側，如 amphibian 兩棲) + val (力量/價值) ➔ 兩種力量拉扯 ➔ 矛盾猶豫的"
    },
    {
        "word": "disparage", "chunk": "dis - par - age", "ipa": "/dɪˈspær.ɪdʒ/", "pos": "v.", "icon": "👎",
        "zh": "貶損、輕蔑、貶低價值", "category": "學術修辭與邏輯 / Rhetoric",
        "collocation": "disparage rivals' achievements (貶低競爭對手的成就)",
        "example": "Scholars should debate theoretical arguments constructively rather than disparage opposing viewpoints.",
        "exampleZh": "學者應建設性地探討理論觀點，而非惡意貶低對立方的學術主張。",
        "memoryTip": "dis- (否定) + par (同等，同 peer/pair) ➔ 視為不如自己平起平坐 ➔ 貶損輕視"
    },
    {
        "word": "underscore", "chunk": "un - der - score", "ipa": "/ˌʌn.dɚˈskɔːr/", "pos": "v.", "icon": "✍️",
        "zh": "強調、突顯、在底下劃線 (= emphasize)", "category": "學術修辭與邏輯 / Emphasis",
        "collocation": "underscore the urgent need for reform (突顯改革的迫切需求)",
        "example": "The recent seismic event underscores the necessity of reinforcing municipal bridge structures.",
        "exampleZh": "最近發生的地震事件突顯了加固市區橋樑結構的迫切必要性。",
        "memoryTip": "under (在...底下) + score (劃線記號) ➔ 在重點底下劃重點線 ➔ 強調突顯"
    },
    {
        "word": "unprecedented", "chunk": "un - prec - e - den - ted", "ipa": "/ʌnˈpres.ə.den.t̬ɪd/", "pos": "adj.", "icon": "🚀",
        "zh": "史無前例的、空前的", "category": "歷史與社會政治 / History",
        "collocation": "unprecedented technological growth (空前的科技爆發成長)",
        "example": "The rapid rollout of the global vaccination campaign occurred at an unprecedented speed.",
        "exampleZh": "全球疫苗接種行動的迅速鋪開，是以史上空前未有的速度進行的。",
        "memoryTip": "un- (無) + precedent (先例) + -ed ➔ 沒有前例可循的 ➔ 史無前例的"
    },
    {
        "word": "contentious", "chunk": "con - ten - tious", "ipa": "/kənˈten.ʃəs/", "pos": "adj.", "icon": "🗣️",
        "zh": "有爭議的、引發激烈爭論的", "category": "歷史與社會政治 / Debate",
        "collocation": "a contentious constitutional issue (具重大爭議的憲法議題)",
        "example": "Allocating municipal tax revenues to private sports stadiums proved to be a highly contentious issue.",
        "exampleZh": "將市政稅收提撥補助私人體育場館，被證實是一個極具爭議的議題。",
        "memoryTip": "contend (爭奪/奮戰) + -ious ➔ 容易引發爭奪爭論的 ➔ 有爭議的"
    },
    {
        "word": "empirical", "chunk": "em - pir - i - cal", "ipa": "/emˈpɪr.ɪ.kəl/", "pos": "adj.", "icon": "🧪",
        "zh": "以經驗/實驗為依據的、實證的", "category": "論據與實證支持 / Methodology",
        "collocation": "empirical evidence / research (實證證據/經驗研究)",
        "example": "Theoretical quantum models require empirical validation through particle accelerator collisions.",
        "exampleZh": "量子力學的理論模型必須透過粒子加速器碰撞實驗的實證檢驗。",
        "memoryTip": "em- (在內) + pir (嘗試/試驗，同 experiment) ➔ 靠實際試驗得來的 ➔ 實證的"
    },
    {
        "word": "esoteric", "chunk": "es - o - ter - ic", "ipa": "/ˌes.əˈter.ɪk/", "pos": "adj.", "icon": "🔮",
        "zh": "深奧難懂的、秘傳的 (僅少數圈內人知曉)", "category": "學術哲學與決策 / Knowledge",
        "collocation": "esoteric philosophical doctrines (深奧玄妙的哲學學說)",
        "example": "Medieval alchemy texts were intentionally written in esoteric symbols to conceal chemical formulas.",
        "exampleZh": "中世紀煉金術文獻刻意使用深奧難懂的符號撰寫，以隱匿化學配方。",
        "memoryTip": "eso- (內在的/圈內的) + -teric ➔ 只有小圈子密友懂得 ➔ 深奧秘傳的"
    },
    {
        "word": "aesthetic", "chunk": "aes - thet - ic", "ipa": "/esˈθet̬.ɪk/", "pos": "adj. / n.", "icon": "🎨",
        "zh": "美學的、審美的；審美標準", "category": "人文與社會科學 / Art",
        "collocation": "aesthetic appeal / sensibilities (美學吸引力/審美品味)",
        "example": "Modern architecture often prioritizes functional simplicity over ornate aesthetic decoration.",
        "exampleZh": "現代建築設計往往將功能性簡潔置於華麗的美學裝飾之上。",
        "memoryTip": "希臘字根 aisthet- (知覺/感知) ➔ 感知美的事物 ➔ 美學審美的"
    },
    {
        "word": "ubiquitous", "chunk": "u - biq - ui - tous", "ipa": "/juːˈbɪk.wə.t̬əs/", "pos": "adj.", "icon": "🌐",
        "zh": "無所不在的、普及的 (= omnipresent)", "category": "科技與創新變革 / Ubiquity",
        "collocation": "ubiquitous mobile connectivity (無所不在的行動連線)",
        "example": "Touchscreen payment terminals have become ubiquitous in metropolitan cafes and retail shops.",
        "exampleZh": "觸控式感應支付終端機在大都市的咖啡館與零售門市已變得無所不在。",
        "memoryTip": "ubi (在哪裡，同 where) + -quitous ➔ 走到哪裡都有 ➔ 無所不在的"
    },
    {
        "word": "bolster", "chunk": "bol - ster", "ipa": "/ˈboʊl.stɚ/", "pos": "v. / n.", "icon": "🧱",
        "zh": "支撐、加固、支持 (論點或信心)", "category": "論據與實證支持 / Argumentation",
        "collocation": "bolster the central thesis (支持/鞏固核心論點)",
        "example": "The sociologist cited longitudinal demographic statistics to bolster her conclusions.",
        "exampleZh": "該社會學家引用了長期的縱貫人口統計數據來鞏固加強她的結論。",
        "memoryTip": "原意為厚長的墊枕 (bolster) ➔ 在背後墊高支撐 ➔ 支持加強"
    },
    {
        "word": "plausible", "chunk": "plau - si - ble", "ipa": "/ˈplɑː.zə.bəl/", "pos": "adj.", "icon": "💡",
        "zh": "貌似合理的、合乎情理的", "category": "文本證據與推論 / Logic",
        "collocation": "a plausible explanation (看似合理的解釋)",
        "example": "Paleontologists offered a plausible explanation for the sudden extinction of the apex predators.",
        "exampleZh": "古生物學家對頂級掠食者的驟然滅絕提出了貌似合理的解釋。",
        "memoryTip": "plaus/plaud (拍手喝采，同 applaud) + -ible ➔ 令人拍手贊同的 ➔ 貌似合理的"
    },
    {
        "word": "scrutinize", "chunk": "scru - ti - nize", "ipa": "/ˈskruː.t̬ən.aɪz/", "pos": "v.", "icon": "🧐",
        "zh": "仔細審視、嚴密檢驗、端詳", "category": "論據與實證支持 / Critical Analysis",
        "collocation": "scrutinize the financial audit (嚴格審查財務審計報告)",
        "example": "Regulatory watchdogs rigorously scrutinize the drug trials before approving retail sales.",
        "exampleZh": "監管機構在批准藥品上市銷售前，會嚴格審視其臨床試驗數據。",
        "memoryTip": "scruta (碎片/破爛) ➔ 翻找每個碎片仔細檢查 ➔ 嚴格審視"
    },
    # 更多 Digital SAT 語境高頻詞彙
    {
        "word": "lucid", "chunk": "lu - cid", "ipa": "/ˈluː.sɪd/", "pos": "adj.", "icon": "💡",
        "zh": "清晰易懂的、頭腦清醒明晰的", "category": "語境詞義辨析 / Clarity",
        "collocation": "lucid explanation / prose (清晰明白的解釋/散文)",
        "example": "Despite the intricacy of neurochemistry, the lecturer offered a remarkably lucid explanation.",
        "exampleZh": "儘管神經化學錯綜複雜，該講師依然給出了極其清晰明白的解說。",
        "memoryTip": "luc (光亮，同 translucent) ➔ 透著光亮的 ➔ 清晰透徹的"
    },
    {
        "word": "elucidate", "chunk": "e - lu - ci - date", "ipa": "/iˈluː.sə.deɪt/", "pos": "v.", "icon": "🔦",
        "zh": "闡明、解釋清楚", "category": "學術修辭與邏輯 / Rhetoric",
        "collocation": "elucidate the complex theory (闡明複雜理論)",
        "example": "The diagrams were specifically designed to elucidate the intricate mechanisms of DNA replication.",
        "exampleZh": "這些圖解專門設計用以闡明 DNA 複製複製過程中的繁複機制。",
        "memoryTip": "e- (出) + luc (光) + -idate ➔ 將光照耀出來 ➔ 闡明解釋"
    },
    {
        "word": "superfluous", "chunk": "su - per - flu - ous", "ipa": "/suːˈpɝː.flu.əs/", "pos": "adj.", "icon": "🌊",
        "zh": "多餘的、過剩累贅的", "category": "學術修辭與邏輯 / Style",
        "collocation": "superfluous details / spending (多餘多贅的細節/過剩支出)",
        "example": "The editor eliminated several superfluous paragraphs to improve the rhythm and pacing of the novel.",
        "exampleZh": "編輯刪除了若干多餘累贅的段落，以提升小說的節奏與明快度。",
        "memoryTip": "super- (超過) + flu (流動) + -ous ➔ 水滿溢位來 ➔ 多餘過剩的"
    },
    {
        "word": "paradoxical", "chunk": "par - a - dox - i - cal", "ipa": "/ˌper.əˈdɑːk.sɪ.kəl/", "pos": "adj.", "icon": "🔄",
        "zh": "自相矛盾的、似非而是的", "category": "觀點對比與張力 / Contrast",
        "collocation": "a paradoxical outcome (自相矛盾的結果)",
        "example": "It is paradoxical that increased automation has sometimes resulted in longer working hours.",
        "exampleZh": "自動化程度提高有時反而導致工時變長，這是一項看似矛盾的現象。",
        "memoryTip": "para- (超越/相悖) + dox (觀點信條，同 orthodox) ➔ 與常理觀點相悖 ➔ 矛盾似有理的"
    },
    {
        "word": "tentative", "chunk": "ten - ta - tive", "ipa": "/ˈten.t̬ə.t̬ɪv/", "pos": "adj.", "icon": "🧪",
        "zh": "試驗性的、暫定未決的、猶豫的", "category": "文本證據與推論 / Tone",
        "collocation": "tentative agreement / conclusion (暫定協議/初步試驗結論)",
        "example": "The researchers reached a tentative conclusion pending further genomic sequencing confirmation.",
        "exampleZh": "研究人員得出一項初步暫定結論，正等待進一步基因組定序的證實。",
        "memoryTip": "tent- (摸索/嘗試，同 attempt) + -ative ➔ 摸石過河嘗試中的 ➔ 暫定的"
    },
    {
        "word": "coherent", "chunk": "co - her - ent", "ipa": "/koʊˈhɪr.ənt/", "pos": "adj.", "icon": "🧩",
        "zh": "條理連貫的、前後一致的", "category": "學術修辭與邏輯 / Structure",
        "collocation": "a coherent narrative / argument (條理清晰的敘事/論述)",
        "example": "The essay lacks a coherent structure, jumping erratically between unrelated historical epochs.",
        "exampleZh": "該散文缺乏連貫條理的結構，在不相關的歷史時代之間跳躍不定。",
        "memoryTip": "co- (共同) + her/hes (黏著，同 adhesive) ➔ 緊密黏合不散漫 ➔ 條理連貫的"
    },
    {
        "word": "discredit", "chunk": "dis - cred - it", "ipa": "/dɪˈskred.ɪt/", "pos": "v. / n.", "icon": "❌",
        "zh": "使喪失信譽、懷疑其真實性", "category": "文本證據與推論 / Critique",
        "collocation": "discredit the false rumor (破除不實謠言使其不可信)",
        "example": "Rigorous investigative journalism completely discredited the company's misleading environmental claims.",
        "exampleZh": "嚴謹的調查報導徹底推翻了該公司具誤導性的環保宣言，使其名譽掃地。",
        "memoryTip": "dis- (去除) + credit (信用) ➔ 剝奪其信用 ➔ 使不可信"
    },
    {
        "word": "augment", "chunk": "aug - ment", "ipa": "/ɑːɡˈment/", "pos": "v.", "icon": "📈",
        "zh": "增加、擴充、強化", "category": "科技與創新變革 / Change",
        "collocation": "augment memory / capacity (擴充記憶體/增強產能)",
        "example": "Surgeons use augmented reality headsets to guide delicate microsurgical incisions.",
        "exampleZh": "外科醫師使用擴增實境頭戴裝置來引導精細的顯微手術切口。",
        "memoryTip": "aug- (增加，同 auction 拍賣/august 尊貴) ➔ 擴充強化"
    },
    {
        "word": "polarize", "chunk": "po - lar - ize", "ipa": "/ˈpoʊ.lə.raɪz/", "pos": "v.", "icon": "🧲",
        "zh": "使兩極分化、使截然對立", "category": "歷史與社會政治 / Society",
        "collocation": "polarize public sentiment (使公眾輿論走向兩極對立)",
        "example": "Economic inequality and sensationalized media tend to polarize national political discourse.",
        "exampleZh": "經濟不平等與煽情化媒體往往導致國家政治論述走向極端兩極化。",
        "memoryTip": "polar (極地的/兩極的) + -ize ➔ 走向南北極端 ➔ 使兩極分化"
    },
    {
        "word": "synthesize", "chunk": "syn - the - size", "ipa": "/ˈsɪn.θə.saɪz/", "pos": "v.", "icon": "🧬",
        "zh": "綜合、合成、統整各方觀點", "category": "論據與實證支持 / Research",
        "collocation": "synthesize diverse perspectives (統整多元視角觀點)",
        "example": "The concluding chapter synthesizes findings from forty separate international field trials.",
        "exampleZh": "結論章節綜合統整了來自四十項獨立國際田野試驗的研究成果。",
        "memoryTip": "syn- (共同) + the (放置) + -ize ➔ 放到一起融會貫通 ➔ 綜合合成"
    },
    {
        "word": "equivocal", "chunk": "e - quiv - o - cal", "ipa": "/ɪˈkwɪv.ə.kəl/", "pos": "adj.", "icon": "🌫️",
        "zh": "模稜兩可的、含糊其辭的", "category": "語境詞義辨析 / Ambiguity",
        "collocation": "an equivocal answer (模稜兩可含糊的回答)",
        "example": "His equivocal response left both journalists unsure whether he intended to run for office.",
        "exampleZh": "他含糊其辭的回答讓在場記者皆無法確定他是否打算競選公職。",
        "memoryTip": "equi (平等) + voc (聲音) ➔ 兩種聲音平分秋色說不清楚 ➔ 模稜兩可的"
    },
    {
        "word": "preclude", "chunk": "pre - clude", "ipa": "/prəˈkluːd/", "pos": "v.", "icon": "🚫",
        "zh": "預先排除、防堵、使不可能發生", "category": "學術哲學與決策 / Action",
        "collocation": "preclude the possibility of error (杜絕發生錯誤的可能性)",
        "example": "A severe wrist injury precluded the tennis prodigy from competing in the national tournament.",
        "exampleZh": "嚴重的手腕傷勢使這位網球神童無法參加全國錦標賽。",
        "memoryTip": "pre- (預先) + clud (關閉，同 exclude) ➔ 預先關上大門 ➔ 排除阻止"
    },
    {
        "word": "candid", "chunk": "can - did", "ipa": "/ˈkæn.dɪd/", "pos": "adj.", "icon": "🪞",
        "zh": "坦率直言的、公正誠實的", "category": "學術修辭與邏輯 / Tone",
        "collocation": "candid interview / remarks (坦誠的專訪/直率言論)",
        "example": "In a candid retrospective, the retired diplomat recounted the missteps of foreign policy.",
        "exampleZh": "在一篇坦誠直言的回憶錄中，這位退役外交官回顧了外交政策的種種失誤。",
        "memoryTip": "cand (白色/純潔，同 candidate 穿白袍的候選人) ➔ 赤誠坦白 ➔ 坦率的"
    },
    {
        "word": "exacerbate", "chunk": "ex - ac - er - bate", "ipa": "/ɪɡˈzæs.ɚ.beɪt/", "pos": "v.", "icon": "🔥",
        "zh": "使惡化、加劇、雪上加霜 (反義詞 ameliorate / mitigate)", "category": "學術哲學與決策 / Intensity",
        "collocation": "exacerbate existing shortages (加劇既有物資短缺危機)",
        "example": "Prolonged agricultural drought exacerbated food scarcity across the developing nation.",
        "exampleZh": "長期的農業乾旱加劇了整個開發中國家的糧食短缺危機。",
        "memoryTip": "ex- (加強) + acerb (酸苦辛辣，同 acerbic) + -ate ➔ 使酸苦惡化 ➔ 加劇惡化"
    }
]

# ==============================================================================
# 6. GRE Verbal 核心等價孿生詞對 1,500 (GRE Twin Synonyms) - 48 核心字彙
# ==============================================================================
GRE_CARDS = [
    {
        "word": "capricious", "chunk": "ca - pri - cious", "ipa": "/kəˈprɪʃ.əs/", "pos": "adj.", "icon": "🎭",
        "zh": "反覆無常的、善變任性的", "category": "句子等價孿生詞對 / Volatility",
        "collocation": "capricious decisions (反覆無常的決定)",
        "example": "Throughout his turbulent tenure, the autocratic monarch was infamous for his capricious governance.",
        "exampleZh": "在動盪的統治任期內，該專制君主以其反覆無常的治理風格而聲名狼藉。",
        "memoryTip": "【GRE 孿生同義詞】：capricious = fickle = mercurial！在 Sentence Equivalence 六選二中並列正解！"
    },
    {
        "word": "fickle", "chunk": "fick - le", "ipa": "/ˈfɪk.əl/", "pos": "adj.", "icon": "🌪️",
        "zh": "易變無常的、搖擺不定的", "category": "句子等價孿生詞對 / Volatility",
        "collocation": "fickle public opinion (浮動易變的民意)",
        "example": "Politicians often discover that public adulation is utterly fickle and rapidly evaporates.",
        "exampleZh": "政治人物常發現公眾的崇拜完全是變幻無常的，很快便煙消雲散。",
        "memoryTip": "【GRE 孿生同義詞】：fickle = capricious！修飾命運、人心與天候。"
    },
    {
        "word": "onerous", "chunk": "on - er - ous", "ipa": "/ˈɑː.nɚ.əs/", "pos": "adj.", "icon": "🏋️",
        "zh": "繁重艱鉅的、沉重的、費力的", "category": "句子等價孿生詞對 / Burden",
        "collocation": "an onerous assignment (繁重艱辛的任務)",
        "example": "Translating ancient cuneiform clay tablets proved to be an extraordinarily onerous undertaking.",
        "exampleZh": "翻譯殘破的古代楔形文字泥板被證明是一項極其繁重艱鉅的事業。",
        "memoryTip": "【GRE 孿生同義詞】：onerous = burdensome。拉丁語 onus (沉重負擔)。"
    },
    {
        "word": "burdensome", "chunk": "bur - den - some", "ipa": "/ˈbɝː.dən.səm/", "pos": "adj.", "icon": "🎒",
        "zh": "沉重繁難的、累贅的", "category": "句子等價孿生詞對 / Burden",
        "collocation": "burdensome regulatory compliance (繁複沉重的法規遵循負擔)",
        "example": "Small business entrepreneurs often lament the burdensome paperwork required by state agencies.",
        "exampleZh": "小型企業創業者經常抱怨政府機構所要求的繁複沉重的文書作業。",
        "memoryTip": "【GRE 孿生同義詞】：burdensome = onerous。burden (負擔) + -some (充滿)。"
    },
    {
        "word": "pellucid", "chunk": "pel - lu - cid", "ipa": "/pəˈluː.sɪd/", "pos": "adj.", "icon": "💎",
        "zh": "清澈透亮的、清晰明瞭的", "category": "句子等價孿生詞對 / Clarity",
        "collocation": "pellucid prose (清新明徹的文筆)",
        "example": "The theoretical physicist was renowned for her pellucid exposition of complex gravitational theory.",
        "exampleZh": "該理論物理學家因其對複雜重力理論清晰透徹的闡述而享譽學界。",
        "memoryTip": "【GRE 孿生同義詞】：pellucid = limpid。pel- (透徹) + luc (光亮/清晰)。"
    },
    {
        "word": "limpid", "chunk": "lim - pid", "ipa": "/ˈlɪm.pɪd/", "pos": "adj.", "icon": "💧",
        "zh": "清澈透明的、明白通暢的", "category": "句子等價孿生詞對 / Clarity",
        "collocation": "limpid stream / style (清澈的溪流/明白暢達的文風)",
        "example": "The mountain lake was so limpid that pebbles on the bedrock twelve meters below were visible.",
        "exampleZh": "高山湖泊是如此清澈見底，以至於水下十二公尺岩床上的鵝卵石都清晰可辨。",
        "memoryTip": "【GRE 孿生同義詞】：limpid = pellucid。修飾文風「清澈無晦澀」。"
    },
    {
        "word": "mitigate", "chunk": "mit - i - gate", "ipa": "/ˈmɪt̬.ə.ɡeɪt/", "pos": "v.", "icon": "🌿",
        "zh": "緩和、減輕、緩解", "category": "句子等價孿生詞對 / Mitigation",
        "collocation": "mitigate economic fallout (緩解經濟衝擊)",
        "example": "Massive coastal mangrove reforestation projects are designed to mitigate hurricane storm surges.",
        "exampleZh": "大規模的沿海紅樹林造林計畫旨在緩解颶風引發的風暴潮。",
        "memoryTip": "【GRE 孿生四姐妹】：mitigate = abate = attenuate = alleviate (減輕緩和)。等價題極高頻！"
    },
    {
        "word": "alleviate", "chunk": "al - le - vi - ate", "ipa": "/əˈliː.vi.eɪt/", "pos": "v.", "icon": "🍃",
        "zh": "減輕、緩和 (痛苦或負擔)", "category": "句子等價孿生詞對 / Mitigation",
        "collocation": "alleviate poverty and chronic pain (緩解貧困與慢性疼痛)",
        "example": "The humanitarian NGO provided emergency rations to alleviate acute famine in the drought sector.",
        "exampleZh": "人道救援非政府組織提供了緊急口糧以緩解乾旱災區嚴重的饑荒。",
        "memoryTip": "【GRE 孿生同義詞】：alleviate = mitigate = abate。lev (輕，同 elevate) ➔ 使變輕。"
    },
    {
        "word": "ephemeral", "chunk": "e - phem - er - al", "ipa": "/ɪˈfem.ɚ.əl/", "pos": "adj.", "icon": "⏳",
        "zh": "短暫的、轉瞬即逝的、朝生暮死的", "category": "句子等價孿生詞對 / Transience",
        "collocation": "ephemeral celebrity (轉瞬即逝的名氣)",
        "example": "Viral internet fame frequently proves to be ephemeral, vanishing as swiftly as it appeared.",
        "exampleZh": "網路爆紅的知名度往往被證明是轉瞬即逝的，消逝得如同當初竄紅時那般迅速。",
        "memoryTip": "【GRE 孿生三胞胎】：ephemeral = transient = evanescent (短暫的)。"
    },
    {
        "word": "transient", "chunk": "tran - sient", "ipa": "/ˈtræn.zi.ənt/", "pos": "adj.", "icon": "🍂",
        "zh": "短暫的、瞬息即逝的、過客的", "category": "句子等價孿生詞對 / Transience",
        "collocation": "transient sensation (轉瞬即逝的感覺)",
        "example": "The psychologist observed that material wealth generates only a transient surge in happiness.",
        "exampleZh": "心理學家觀察到，物質財富帶來的幸福感往往只是轉瞬即逝的短暫提升。",
        "memoryTip": "【GRE 孿生同義詞】：transient = ephemeral。trans- (通過) + i (走) ➔ 走過即逝。"
    },
    {
        "word": "laconic", "chunk": "la - con - ic", "ipa": "/ləˈkɑː.nɪk/", "pos": "adj.", "icon": "🤐",
        "zh": "簡潔的、說話言簡意賅的、寡言的", "category": "GRE 核心同義詞群 / Rhetoric",
        "collocation": "a laconic reply (言簡意賅的答覆)",
        "example": "Famous for his laconic temperament, the general responded to the enemy ultimatum with one word: 'Never.'",
        "exampleZh": "將軍以其言簡意賅的寡言脾性聞名，他對敵軍的最後通牒只回敬了一個字：「休想。」",
        "memoryTip": "【GRE 孿生同義詞】：laconic = terse = curt。源自斯巴達拉哥尼亞 (Laconia) 人說話極簡之典故。"
    },
    {
        "word": "terse", "chunk": "terse", "ipa": "/tɝːs/", "pos": "adj.", "icon": "✂️",
        "zh": "簡短生硬的、扼要的", "category": "GRE 核心同義詞群 / Rhetoric",
        "collocation": "a terse statement (簡短扼要的聲明)",
        "example": "The CEO issued a terse statement denying all allegations of insider stock trading.",
        "exampleZh": "執行長發表了一份措辭簡短生硬的聲明，全盤否認內線交易指控。",
        "memoryTip": "【GRE 孿生同義詞】：terse = laconic。ters- (擦乾淨/去除多餘) ➔ 去除贅字。"
    },
    {
        "word": "specious", "chunk": "spe - cious", "ipa": "/ˈspiː.ʃəs/", "pos": "adj.", "icon": "🎭",
        "zh": "似是而非的、華而不實的、虛假的", "category": "學術態度與評價 / Falsehood",
        "collocation": "specious reasoning / argument (似是而非的論點)",
        "example": "Under rigorous scrutiny, the lobbyist's plausible rhetoric was unmasked as entirely specious.",
        "exampleZh": "在嚴格審視之下，說客看似合理的修辭被揭穿完全是似是而非的詭辯。",
        "memoryTip": "【GRE 孿生同義詞】：specious = spurious = fallacious。spec (看) ➔ 僅表面好看而已！"
    },
    {
        "word": "spurious", "chunk": "spu - ri - ous", "ipa": "/ˈspjʊr.i.əs/", "pos": "adj.", "icon": "🪙",
        "zh": "偽造的、虛假的、站不住腳的", "category": "學術態度與評價 / Falsehood",
        "collocation": "spurious statistical correlation (虛假的統計相關性)",
        "example": "The scientific journal retracted the published paper after uncovering spurious experimental data.",
        "exampleZh": "在揭發出偽造虛假的實驗數據後，該科學期刊撤回了已發表的論文。",
        "memoryTip": "【GRE 孿生同義詞】：spurious = specious = counterfeit (偽造虛假的)。"
    },
    {
        "word": "fastidious", "chunk": "fas - tid - i - ous", "ipa": "/fæsˈtɪd.i.əs/", "pos": "adj.", "icon": "🔬",
        "zh": "一絲不苟的、過分挑剔講究的", "category": "GRE 核心同義詞群 / Character",
        "collocation": "fastidious attention to detail (對細節一絲不苟的講究)",
        "example": "The master watchmaker was famously fastidious, examining each microscopic gear under high magnification.",
        "exampleZh": "鐘錶大師以極度一絲不苟聞名，在高倍放大鏡下一一檢視每顆微型齒輪。",
        "memoryTip": "【GRE 孿生同義詞】：fastidious = meticulous = punctilious (嚴謹挑剔)。"
    },
    {
        "word": "meticulous", "chunk": "me - tic - u - lous", "ipa": "/məˈtɪk.jə.ləs/", "pos": "adj.", "icon": "📐",
        "zh": "極其嚴謹細緻的、一絲不苟的", "category": "GRE 核心同義詞群 / Character",
        "collocation": "meticulous scientific documentation (細緻嚴謹的科學記錄)",
        "example": "The conservator restored the Renaissance fresco with meticulous precision and immense patience.",
        "exampleZh": "古蹟修復專家以無比細緻嚴謹的精準度與無窮耐心，修復了文藝復興時期的濕壁畫。",
        "memoryTip": "【GRE 孿生同義詞】：meticulous = fastidious。正向表「一絲不苟」，負向表「過分挑剔」。"
    },
    # 更多 GRE 孿生詞對
    {
        "word": "reticent", "chunk": "ret - i - cent", "ipa": "/ˈret̬.ə.sənt/", "pos": "adj.", "icon": "🤫",
        "zh": "沉默寡言的、不願吐露的", "category": "句子等價孿生詞對 / Demeanor",
        "collocation": "reticent about personal matters (對個人私事守口如瓶寡言)",
        "example": "The witness remained reticent, answering the prosecutor's inquiries only with brief nods.",
        "exampleZh": "證人始終保持沉默寡言，僅以微弱的點頭回應檢察官的訊問。",
        "memoryTip": "【GRE 孿生同義詞】：reticent = taciturn。tacit (心照不宣/安靜)。"
    },
    {
        "word": "taciturn", "chunk": "tac - i - turn", "ipa": "/ˈtæs.ə.tɝːn/", "pos": "adj.", "icon": "😶",
        "zh": "不苟言笑的、生性孤僻寡言的", "category": "句子等價孿生詞對 / Demeanor",
        "collocation": "a taciturn loner (寡言孤僻之人)",
        "example": "Growing up on a solitary mountain homestead made the woodsman notoriously taciturn.",
        "exampleZh": "在偏僻孤絕的高山農莊長大，讓這位伐木工人變得極其寡言孤僻。",
        "memoryTip": "【GRE 孿生同義詞】：taciturn = reticent。修飾性格習慣性不講話。"
    },
    {
        "word": "apathy", "chunk": "ap - a - thy", "ipa": "/ˈæp.ə.θi/", "pos": "n.", "icon": "🧊",
        "zh": "漠然、冷淡、無動於衷", "category": "句子等價孿生詞對 / Emotion",
        "collocation": "voter apathy (選民冷漠不投票)",
        "example": "Widespread civic apathy poses a grave danger to the vitality of democratic self-governance.",
        "exampleZh": "普遍的公民冷漠對民主自治的蓬勃生機構成了嚴重威脅。",
        "memoryTip": "【GRE 孿生同義詞】：apathy = indifference。a- (無) + pathy (情感) ➔ 毫無感情。"
    },
    {
        "word": "indifference", "chunk": "in - dif - fer - ence", "ipa": "/ɪnˈdɪf.ɚ.əns/", "pos": "n.", "icon": "😐",
        "zh": "漠不關心、冷淡對待", "category": "句子等價孿生詞對 / Emotion",
        "collocation": "treat with utter indifference (以徹底的漠不關心對待)",
        "example": "The monarch met the peasant petitions with callous indifference and increased levies.",
        "exampleZh": "君主對農民的請願書表現出冷酷的漠不關心，反而加重了賦稅徵收。",
        "memoryTip": "【GRE 孿生同義詞】：indifference = apathy。in- (無) + difference (差別) ➔ 覺得都無所謂。"
    },
    {
        "word": "veneration", "chunk": "ven - er - a - tion", "ipa": "/ˌven.əˈreɪ.ʃən/", "pos": "n.", "icon": "🙇",
        "zh": "崇敬、景仰、頂禮膜拜", "category": "句子等價孿生詞對 / Reverence",
        "collocation": "held in great veneration (備受尊崇景仰)",
        "example": "The indigenous community preserves deep veneration for the sacred cedar grove.",
        "exampleZh": "該原住民族社群對這片神聖的雪松林懷抱著無比深沉的崇敬與景仰。",
        "memoryTip": "【GRE 孿生同義詞】：veneration = reverence = deification。Venus (愛與美之神) ➔ 崇拜膜拜。"
    },
    {
        "word": "reverence", "chunk": "rev - er - ence", "ipa": "/ˈrev.ɚ.əns/", "pos": "n.", "icon": "🕯️",
        "zh": "敬畏、虔敬崇拜", "category": "句子等價孿生詞對 / Reverence",
        "collocation": "profound reverence for nature (對大自然深沉的敬畏與崇拜)",
        "example": "The pilgrims entered the sanctuary in hushed reverence, lighting ceremonial candles.",
        "exampleZh": "朝聖者滿懷虔敬的敬畏之情踏入聖所，點燃儀式專用的蠟燭。",
        "memoryTip": "【GRE 孿生同義詞】：reverence = veneration。revere (敬畏) ➔ 名詞 reverence。"
    },
    {
        "word": "bellicose", "chunk": "bel - li - cose", "ipa": "/ˈbel.ə.koʊs/", "pos": "adj.", "icon": "⚔️",
        "zh": "好戰的、窮兵黷武的", "category": "句子等價孿生詞對 / Aggression",
        "collocation": "bellicose rhetoric (好戰的叫囂言論)",
        "example": "The dictator delivered a bellicose speech threatening military invasion across the border.",
        "exampleZh": "該獨裁者發表了一場好戰的演說，揚言將對邊境彼端發動軍事入侵。",
        "memoryTip": "【GRE 孿生同義詞】：bellicose = pugnacious = truculent。bell (戰爭，如 rebel 反叛)。"
    },
    {
        "word": "pugnacious", "chunk": "pug - na - cious", "ipa": "/pʌɡˈneɪ.ʃəs/", "pos": "adj.", "icon": "🥊",
        "zh": "好鬥好吵架的、尋釁滋事的", "category": "句子等價孿生詞對 / Aggression",
        "collocation": "a pugnacious politician (咄咄逼人好鬥的政客)",
        "example": "Known for his pugnacious posture during committee debates, he rarely conceded a point.",
        "exampleZh": "因在委員會辯論中咄咄逼人、好鬥善辯聞名，他幾乎從不向對手做出讓步。",
        "memoryTip": "【GRE 孿生同義詞】：pugnacious = bellicose。pugn (拳頭，同 pugilist 拳擊手)。"
    },
    {
        "word": "innocuous", "chunk": "in - noc - u - ous", "ipa": "/ɪˈnɑː.kju.əs/", "pos": "adj.", "icon": "🕊️",
        "zh": "無害的、良性的、無傷大雅的", "category": "句子等價孿生詞對 / Harmlessness",
        "collocation": "an innocuous remark (無傷大雅的隨興評論)",
        "example": "What seemed like an innocuous question provoked unexpected outrage from the witness.",
        "exampleZh": "一句看似無傷大雅的隨興提問，卻引發了證人出乎意料的強烈憤怒。",
        "memoryTip": "【GRE 孿生同義詞】：innocuous = benign = inoffensive。in- (無) + noc (傷害，同 noxious 有毒)。"
    },
    {
        "word": "benign", "chunk": "be - nign", "ipa": "/bɪˈnaɪn/", "pos": "adj.", "icon": "🌸",
        "zh": "溫和善良的、良性無害的 (反義詞 malignant 惡性的)", "category": "句子等價孿生詞對 / Harmlessness",
        "collocation": "a benign tumor / climate (良性腫瘤/溫和宜人的氣候)",
        "example": "The biopsy confirmed that the detected tissue lump was completely benign.",
        "exampleZh": "組織切片檢查證實偵測到的組織腫塊完全是良性的。",
        "memoryTip": "【GRE 孿生同義詞】：benign = innocuous。bene- (好/善，同 benefit)。"
    },
    {
        "word": "obviate", "chunk": "ob - vi - ate", "ipa": "/ˈɑːb.vi.eɪt/", "pos": "v.", "icon": "🛡️",
        "zh": "排除、消除、使不再需要", "category": "句子等價孿生詞對 / Prevention",
        "collocation": "obviate the need for surgery (免除動手術的需要)",
        "example": "Early diagnostic detection often obviates the need for invasive chemotherapy treatments.",
        "exampleZh": "早期診斷發現往往能免除病患進行侵入性化學治療的需要。",
        "memoryTip": "【GRE 孿生同義詞】：obviate = preclude。ob- (反對) + via (道路) ➔ 阻擋在半路免去麻煩。"
    },
    {
        "word": "loquacious", "chunk": "lo - qua - cious", "ipa": "/loʊˈkweɪ.ʃəs/", "pos": "adj.", "icon": "🗣️",
        "zh": "話多的、滔滔不絕的、喋喋不休的", "category": "GRE 核心同義詞群 / Speech",
        "collocation": "a loquacious dinner companion (話多健談的宴席同伴)",
        "example": "A few glasses of vintage wine turned the normally reserved scholar into a loquacious conversationalist.",
        "exampleZh": "幾杯陳年佳釀讓原本矜持沉靜的學者頓時化身為滔滔不絕的健談者。",
        "memoryTip": "【GRE 孿生同義詞】：loquacious = garrulous。loqu (說話，同 eloquent 雄辯的)。"
    },
    {
        "word": "garrulous", "chunk": "gar - ru - lous", "ipa": "/ˈɡær.ə.ləs/", "pos": "adj.", "icon": "📢",
        "zh": "嘮叨絮聒的、多嘴多舌的", "category": "GRE 核心同義詞群 / Speech",
        "collocation": "a garrulous neighbor (愛嘮叨多話的鄰居)",
        "example": "The driver proved so garrulous that passengers could scarcely read their newspapers in quiet.",
        "exampleZh": "司機是如此喋喋不休、熱衷嘮叨，乘客幾乎無法在安靜中閱讀報紙。",
        "memoryTip": "【GRE 孿生同義詞】：garrulous = loquacious。garr- (喉嚨發聲，同 gargle 漱口)。"
    },
    {
        "word": "prosaic", "chunk": "pro - sa - ic", "ipa": "/proʊˈzeɪ.ɪk/", "pos": "adj.", "icon": "🪵",
        "zh": "平淡無奇的、乏味的、散文般的", "category": "句子等價孿生詞對 / Dullness",
        "collocation": "prosaic day-to-day existence (平淡乏味的日常生活)",
        "example": "Beyond the dazzling glamour of cinema lies the prosaic labor of logistical scheduling.",
        "exampleZh": "在電影耀眼炫目的光環背後，其實充斥著調度後勤排程等平淡乏味繁瑣的勞動。",
        "memoryTip": "【GRE 孿生同義詞】：prosaic = pedestrian = mundane。prose (散文) ➔ 毫無詩意 ➔ 平淡無奇。"
    },
    {
        "word": "pedestrian", "chunk": "pe - des - tri - an", "ipa": "/pəˈdes.tri.ən/", "pos": "adj. / n.", "icon": "🚶",
        "zh": "平淡沉悶的、乏味的；行人", "category": "句子等價孿生詞對 / Dullness",
        "collocation": "a pedestrian plotline (陳腐沉悶的情節架構)",
        "example": "Critics condemned the television series for its pedestrian dialogue and cliché characters.",
        "exampleZh": "影評人斥責該電視影集對白平淡沉悶、角色設定落入俗套陳腐。",
        "memoryTip": "【GRE 孿生同義詞】：pedestrian = prosaic。ped (腳步) ➔ 像走路般尋常平庸 ➔ 乏味的。"
    },
    {
        "word": "panacea", "chunk": "pan - a - ce - a", "ipa": "/ˌpæn.əˈsiː.ə/", "pos": "n.", "icon": "🧪",
        "zh": "萬靈丹、百病良藥、萬全之策", "category": "句子等價孿生詞對 / Remedy",
        "collocation": "no universal panacea (並非萬靈妙藥)",
        "example": "Technological innovation is beneficial, but it is not a panacea for deep structural poverty.",
        "exampleZh": "科技創新大有裨益，但絕非根除深層結構性貧困問題的萬靈妙藥。",
        "memoryTip": "【GRE 孿生同義詞】：panacea = cure-all。pan- (全/所有) + akos (治療) ➔ 包治百病之神藥。"
    }
]

# ==============================================================================
# 7. GMAT Focus 批判推理 1,000 (GMAT Critical Reasoning) - 38 核心字彙
# ==============================================================================
GMAT_CARDS = [
    {
        "word": "assumption", "chunk": "as - sump - tion", "ipa": "/əˈsʌmp.ʃən/", "pos": "n.", "icon": "🎯",
        "zh": "未言明的前提假設 (若否定之，結論必崩潰)", "category": "批判邏輯與前提 / Logic",
        "collocation": "underlying assumption (未言明的根本假設)",
        "example": "The marketing argument relies on the implicit assumption that consumer disposable income will not fall.",
        "exampleZh": "該行銷論證仰賴於一個潛在未言明的前提假設：消費者的可支配所得不會下滑。",
        "memoryTip": "【GMAT 命題密鑰】：否定測試法 (Negation Test)——若將該選項否定後，題幹結論直接崩解，則此選項必為 Necessary Assumption！"
    },
    {
        "word": "weaken", "chunk": "weak - en", "ipa": "/ˈwiː.kən/", "pos": "v.", "icon": "🔨",
        "zh": "削弱 (論證說服力、打破因果鏈)", "category": "批判推理削弱題型 / Weaken",
        "collocation": "seriously weaken the argument (嚴重削弱該論證)",
        "example": "Which of the following findings, if true, most seriously weakens the mayor's municipal economic claim?",
        "exampleZh": "下列何項調查發現若為真，最嚴重削弱了市長對市政經濟前景的主張？",
        "memoryTip": "【GMAT 削弱三大途徑】：1. 引入他因 (Alternative Cause)；2. 因果倒置 (Reverse Causality)；3. 割裂論據與結論之必然關聯。"
    },
    {
        "word": "strengthen", "chunk": "strength - en", "ipa": "/ˈstreŋ.kθən/", "pos": "v.", "icon": "🛡️",
        "zh": "加強、支持 (結論成立的機率)", "category": "批判推理加強題型 / Strengthen",
        "collocation": "strengthen the executive conclusion (加強經營團隊的結論)",
        "example": "The economic consultant presented competitor cost data to strengthen the viability of the joint venture.",
        "exampleZh": "經濟顧問出示了競爭對手的成本數據，以加強該合資計畫的可行性。",
        "memoryTip": "【GMAT 加強三大途徑】：1. 排除反因/干擾變數；2. 證明無因則無果；3. 證實數據樣本具代表性。"
    },
    {
        "word": "evaluate", "chunk": "e - val - u - ate", "ipa": "/ɪˈvæl.ju.eɪt/", "pos": "v.", "icon": "⚖️",
        "zh": "評估 (論證有效性之關鍵資訊)", "category": "評估與因果關係鏈 / Evaluation",
        "collocation": "evaluate the validity of the argument (評估論證的有效性)",
        "example": "Determining whether regional rivals can replicate the patented technology is critical to evaluate the proposal.",
        "exampleZh": "查明區域競爭對手是否能複製這項專利技術，對於評估該提案而言至關重要。",
        "memoryTip": "【GMAT 評估密鑰】：變異測試法 (Variance Test)——對選項回答 Yes 能加強結論，回答 No 則能削弱結論，即為正確 Evaluate 答案！"
    },
    {
        "word": "refute", "chunk": "re - fute", "ipa": "/rɪˈfjuːt/", "pos": "v.", "icon": "💥",
        "zh": "駁斥、反駁 (論點或假說)", "category": "批判邏輯與前提 / Argumentation",
        "collocation": "refute the analyst's forecast (駁斥分析師的預測)",
        "example": "The corporate treasurer presented audited financial statements to refute claims of imminent bankruptcy.",
        "exampleZh": "財務長出示經獨立審計的財務報表，駁斥了公司瀕臨破產的傳言。",
        "memoryTip": "re- (反向) + fut (倒/擊碎，同 futile) ➔ 擊碎對方論點 ➔ 駁斥"
    },
    {
        "word": "premise", "chunk": "prem - ise", "ipa": "/ˈprem.ɪs/", "pos": "n.", "icon": "🏛️",
        "zh": "論據、前提 (題幹中明確陳述為事實的事實依據)", "category": "批判邏輯與前提 / Argument Structure",
        "collocation": "underlying premise (基本論據前提)",
        "example": "The entire strategic plan is constructed upon the questionable premise that raw material prices will remain flat.",
        "exampleZh": "整個策略計畫皆建立在一個令人質疑的論據前提之上：原料價格將保持平穩不變。",
        "memoryTip": "【GMAT CR 結構分析】：Premise (已知客觀事實) + Assumption (隱含未言明前提) ➔ Conclusion (主觀推導結論)。"
    },
    {
        "word": "fallacy", "chunk": "fal - la - cy", "ipa": "/ˈfæl.ə.si/", "pos": "n.", "icon": "🌀",
        "zh": "邏輯謬誤、謬論", "category": "批判邏輯與前提 / Flaw",
        "collocation": "commit a causal fallacy (犯下因果關係倒置或混淆的謬誤)",
        "example": "Confusing correlation with causation is a classic logical fallacy often tested in GMAT reasoning.",
        "exampleZh": "將相關性誤認為因果關係，是 GMAT 邏輯批判推理中經常考查的經典邏輯謬誤。",
        "memoryTip": "fall (欺騙/錯誤，同 false) + -acy ➔ 看似有理實則荒謬 ➔ 邏輯謬誤"
    },
    {
        "word": "causal", "chunk": "cau - sal", "ipa": "/ˈkɑː.zəl/", "pos": "adj.", "icon": "⛓️",
        "zh": "因果關係的 (非純粹相關)", "category": "評估與因果關係鏈 / Causality",
        "collocation": "establish a direct causal link (確立直接的因果鏈結)",
        "example": "Epidemiologists must establish a rigorous causal mechanism before asserting that chemical exposure triggers illness.",
        "exampleZh": "流行病學家在斷定化學物質暴露會引發疾病之前，必須先確立嚴謹的因果機制。",
        "memoryTip": "【GMAT 因果論證核心】：Correlation (相關) ≠ Causation (因果)！常考「倒果為因」或「第三外在因素干擾 (Confounding)」。"
    },
    {
        "word": "paradox", "chunk": "par - a - dox", "ipa": "/ˈpær.ə.dɑːks/", "pos": "n.", "icon": "🔄",
        "zh": "看似矛盾的現象、悖論 (題幹要求解釋矛盾)", "category": "矛盾解釋與推論 / Resolve the Paradox",
        "collocation": "resolve the apparent paradox (解釋/化解看似矛盾之處)",
        "example": "The report presented a paradox: although average incomes rose, overall consumer discretionary spending fell.",
        "exampleZh": "該報告揭示了一項看似矛盾的現象：儘管平均所得提升，但整體消費者的非必要支出卻下滑了。",
        "memoryTip": "【GMAT 解題密鑰】：Explain/Resolve the Paradox 題型——尋求一個「新資訊」，能同時合理解釋 Fact A 與 Fact B 兩者何以同時並存！"
    },
    {
        "word": "extrapolate", "chunk": "ex - trap - o - late", "ipa": "/ɪkˈstræp.ə.leɪt/", "pos": "v.", "icon": "📈",
        "zh": "外推、推斷 (根據已知趨勢預測未知領域)", "category": "批判邏輯與前提 / Flaw in Reasoning",
        "collocation": "extrapolate future trends from past data (由歷史數據外推未來趨勢)",
        "example": "The executive warned that one cannot blindly extrapolate regional trial success to nationwide commercial viability.",
        "exampleZh": "執行長警告，絕不能盲目地將單一區域試辦的成功，直接外推為在全國商業推廣的可行性。",
        "memoryTip": "extra- (向外) + pol (樞紐/軸心) + -ate ➔ 向外延伸推測 ➔ 外推推斷 (GMAT 常作為過度概括之錯誤邏輯選項)。"
    },
    {
        "word": "concomitant", "chunk": "con - com - i - tant", "ipa": "/kənˈkɑː.mə.t̬ənt/", "pos": "adj. / n.", "icon": "🔗",
        "zh": "伴隨發生的、相伴而生的 (非因果之伴生現象)", "category": "評估與因果關係鏈 / Causality",
        "collocation": "concomitant economic expansion (伴隨發生的經濟擴張現象)",
        "example": "The reduction in operational expenses was a concomitant benefit, not the primary driver of the software overhaul.",
        "exampleZh": "營運支出的減少只是一項伴隨而來的附帶好處，並非該軟體系統大改版的主要推動動機。",
        "memoryTip": "con- (共同) + comit (伴侶/隨行) + -ant ➔ 只是結伴同行，並非起因！"
    },
    {
        "word": "boldface", "chunk": "bold - face", "ipa": "/ˈboʊld.feɪs/", "pos": "n. / adj.", "icon": "🔲",
        "zh": "黑體字 (GMAT 句子角色劃分題型)", "category": "批判邏輯與前提 / Boldface",
        "collocation": "the role of the boldface portion (黑體字部分在論證中所扮演的角色)",
        "example": "The first boldface statement introduces evidence supporting the conclusion that the second boldface statement refutes.",
        "exampleZh": "第一段黑體字陳述引入了支持某結論的證據，而第二段黑體字陳述則旨在駁斥該結論。",
        "memoryTip": "【GMAT CR 黑體字經典解法】：判斷每一段黑體字是「Premise (客觀論據)」還是「Conclusion (主觀推論)」？立場是站在作者方還是反對作者？"
    },
    # 更多 GMAT CR 邏輯推理核心概念
    {
        "word": "intermediate conclusion", "chunk": "in - ter - me - di - ate con - clu - sion", "ipa": "/ˌɪn.t̬ɚˈmiː.di.ət kənˈkluː.ʒən/", "pos": "n.", "icon": "🪜",
        "zh": "中間次要結論 (既是上一層推論的結果，又是終極結論的前提)", "category": "批判邏輯與前提 / Boldface",
        "collocation": "serves as an intermediate conclusion (作為過渡的中間結論)",
        "example": "The analyst inferred that revenue would drop, which served as an intermediate conclusion supporting the budget cut.",
        "exampleZh": "分析師推斷營收將會下滑，這項中間結論進一步支持了最終削減預算的決策。",
        "memoryTip": "【GMAT CR 經典角色】：Sub-conclusion / Intermediate Conclusion——銜接基礎論據與主結論之樞紐！"
    },
    {
        "word": "counterargument", "chunk": "coun - ter - ar - gu - ment", "ipa": "/ˈkaʊn.t̬ɚˌɑːrɡ.jə.mənt/", "pos": "n.", "icon": "🥊",
        "zh": "對立反駁論點、反面主張", "category": "批判邏輯與前提 / Argumentation",
        "collocation": "address potential counterarguments (回應潛在的反對主張)",
        "example": "The proposal anticipated industry counterarguments by providing verified safety audit certifications.",
        "exampleZh": "該提案透過提供經認證的安全審計證明，預先回應了業界可能提出的反駁主張。",
        "memoryTip": "counter (反對) + argument (論點) ➔ 對立方的論點"
    },
    {
        "word": "unwarranted", "chunk": "un - war - ran - ted", "ipa": "/ʌnˈwɔːr.ən.t̬ɪd/", "pos": "adj.", "icon": "❌",
        "zh": "毫無根據的、缺乏正當理由的", "category": "批判邏輯與前提 / Flaw",
        "collocation": "an unwarranted leap in logic (邏輯上毫無根據的跳躍)",
        "example": "Critics pointed out that assuming all users would upgrade immediately was an unwarranted inference.",
        "exampleZh": "評論家指出，逕自假設所有使用者都會立即升級，是一項毫無客觀根據的推論。",
        "memoryTip": "un- (無) + warrant (正當授權/保證) + -ed ➔ 缺乏保證的 ➔ 毫無根據的"
    },
    {
        "word": "confound", "chunk": "con - found", "ipa": "/kənˈfaʊnd/", "pos": "v.", "icon": "🌀",
        "zh": "混淆、使混亂；干擾混入因果變數", "category": "評估與因果關係鏈 / Causality",
        "collocation": "confound the experimental findings (干擾混淆實驗研究結果)",
        "example": "Uncontrolled socioeconomic disparities confound the correlation between diet and cardiac health.",
        "exampleZh": "未受控制的社會經濟差距干擾混淆了飲食與心臟健康之間的相關性判定。",
        "memoryTip": "con- (共同) + found (倒/融化) ➔ 倒在一起分不清 ➔ 混淆干擾變數"
    },
    {
        "word": "marginal", "chunk": "mar - gin - al", "ipa": "/ˈmɑːr.dʒɪ.nəl/", "pos": "adj.", "icon": "📉",
        "zh": "邊際的、微不足道的、極微小的", "category": "商業決策與可行性 / Economics",
        "collocation": "marginal cost / benefit (邊際成本/邊際效益)",
        "example": "The marketing upgrade produced only marginal sales improvements despite enormous capital expenditure.",
        "exampleZh": "儘管耗費了龐大的資本支出，該行銷升級僅帶來了微不足道的業績提升。",
        "memoryTip": "margin (頁邊空白) ➔ 處在最邊緣的 ➔ 微小的/邊際的"
    },
    {
        "word": "imperative", "chunk": "im - per - a - tive", "ipa": "/ɪmˈper.ə.t̬ɪv/", "pos": "adj. / n.", "icon": "🚨",
        "zh": "迫切緊急的、勢在必行的；當務之急", "category": "商業決策與可行性 / Decision",
        "collocation": "a strategic imperative (策略上的當務之急)",
        "example": "Diversifying the semiconductor supplier network has become a national strategic imperative.",
        "exampleZh": "半導體供應商網絡的多元化分散已成為國家層級勢在必行的策略當務之急。",
        "memoryTip": "imper (統治/命令，同 empire 帝國) ➔ 如帝王軍令般十萬火急 ➔ 勢在必行的"
    },
    {
        "word": "deter", "chunk": "de - ter", "ipa": "/dɪˈtɝː/", "pos": "v.", "icon": "🛑",
        "zh": "威懾阻止、使打消念頭 (搭配 from)", "category": "商業決策與可行性 / Strategy",
        "collocation": "deter hostile takeovers (威懾阻止惡意併購)",
        "example": "Stiff regulatory financial penalties are instituted to deter corporations from dumping industrial pollutants.",
        "exampleZh": "制定高額監管罰款旨在威懾阻止企業傾倒工業廢棄物。",
        "memoryTip": "de- (離開) + ter (恐懼，同 terror) ➔ 因恐懼代價而退縮 ➔ 威懾阻止"
    },
    {
        "word": "trade-off", "chunk": "trade - off", "ipa": "/ˈtreɪd.ɑːf/", "pos": "n.", "icon": "⚖️",
        "zh": "權衡取捨、妥協折衷 (兩難之間的選擇)", "category": "商業決策與可行性 / Economics",
        "collocation": "a trade-off between speed and accuracy (速度與精確度之間的權衡取捨)",
        "example": "Engineers face an inevitable trade-off between lighter battery weight and extended driving range.",
        "exampleZh": "工程師面臨著電池輕量化與更長續航里程之間不可避免的權衡取捨。",
        "memoryTip": "trade (交換) + off ➔ 放棄 A 以換取 B ➔ 權衡取捨"
    },
    {
        "word": "prohibitive", "chunk": "pro - hib - i - tive", "ipa": "/proʊˈhɪb.ə.t̬ɪv/", "pos": "adj.", "icon": "💸",
        "zh": "(價格或費用) 高昂得令人望而卻步的", "category": "商業決策與可行性 / Pricing",
        "collocation": "prohibitive installation costs (高昂令人卻步的安裝成本)",
        "example": "The cost of licensing the patented manufacturing process proved entirely prohibitive for the small startup.",
        "exampleZh": "這項專利製造製程的授權費用過於高昂，這家小型新創公司完全負擔不起。",
        "memoryTip": "prohibit (禁止) + -ive ➔ 價格高到形同禁止購買 ➔ 昂貴得令人卻步的"
    },
    {
        "word": "discrepancy", "chunk": "dis - crep - an - cy", "ipa": "/dɪˈskrep.ən.si/", "pos": "n.", "icon": "⚡",
        "zh": "差異、不符、矛盾之處", "category": "矛盾解釋與推論 / Resolve the Paradox",
        "collocation": "unexplained discrepancy in inventory figures (庫存數據中無法解釋的不符之處)",
        "example": "Auditors noticed a significant discrepancy between logged warehouse shipments and ledger receipts.",
        "exampleZh": "審計員察覺到了倉庫出貨登記紀錄與總帳收據之間存在重大不符與矛盾之處。",
        "memoryTip": "dis- (分開) + crep (劈啪聲/裂痕) ➔ 數據出現裂痕對不上 ➔ 矛盾不一致"
    }
]

def format_flashcard(c):
    return f"""  {{
    id: {json.dumps(c['id'])}, tier: {json.dumps(c['tier'])}, category: {json.dumps(c['category'], ensure_ascii=False)},
    word: {json.dumps(c['word'])}, chunk: {json.dumps(c['chunk'])}, ipa: {json.dumps(c['ipa'])}, pos: {json.dumps(c['pos'])},
    icon: {json.dumps(c['icon'], ensure_ascii=False)}, zh: {json.dumps(c['zh'], ensure_ascii=False)},
    collocation: {json.dumps(c['collocation'], ensure_ascii=False)},
    example: {json.dumps(c['example'])}, exampleZh: {json.dumps(c['exampleZh'], ensure_ascii=False)},
    memoryTip: {json.dumps(c['memoryTip'], ensure_ascii=False)}
  }}"""

def main():
    print("Building 7-tier Flashcard Database...")

    # 1. Elementary cards (216)
    elem_cards = []
    for i, w in enumerate(ELEM_RAW):
        card = {
            "id": f"fc-el-{i+1:03d}",
            "tier": "elem_1000",
            "category": w[5],
            "word": w[0],
            "chunk": w[1],
            "ipa": w[2],
            "pos": w[3],
            "icon": resolve_icon(w[0], w[5], w[4], "elem_1000"),
            "zh": w[4],
            "collocation": w[6],
            "example": w[7],
            "exampleZh": w[8],
            "memoryTip": w[9]
        }
        elem_cards.append(card)

    # 2. Junior High cards (158)
    junior_cards = []
    for i, w in enumerate(JUNIOR_RAW):
        card = {
            "id": f"fc-jh-{i+1:03d}",
            "tier": "jhs_2000",
            "category": w[5],
            "word": w[0],
            "chunk": w[1],
            "ipa": w[2],
            "pos": w[3],
            "icon": resolve_icon(w[0], w[5], w[4], "jhs_2000"),
            "zh": w[4],
            "collocation": w[6],
            "example": w[7],
            "exampleZh": w[8],
            "memoryTip": w[9]
        }
        junior_cards.append(card)

    # 3. Senior High cards
    shs_cards = []
    for i, c in enumerate(SHS_CARDS):
        card = {
            "id": f"fc-sh-{i+1:03d}",
            "tier": "shs_3000",
            "category": c["category"],
            "word": c["word"],
            "chunk": c["chunk"],
            "ipa": c["ipa"],
            "pos": c["pos"],
            "icon": c.get("icon") or resolve_icon(c["word"], c["category"], c["zh"], "shs_3000"),
            "zh": c["zh"],
            "collocation": c["collocation"],
            "example": c["example"],
            "exampleZh": c["exampleZh"],
            "memoryTip": c["memoryTip"]
        }
        shs_cards.append(card)

    # 4. TOEIC cards
    toeic_cards = []
    for i, c in enumerate(TOEIC_CARDS):
        card = {
            "id": f"fc-to-{i+1:03d}",
            "tier": "toeic",
            "category": c["category"],
            "word": c["word"],
            "chunk": c["chunk"],
            "ipa": c["ipa"],
            "pos": c["pos"],
            "icon": c.get("icon") or resolve_icon(c["word"], c["category"], c["zh"], "toeic"),
            "zh": c["zh"],
            "collocation": c["collocation"],
            "example": c["example"],
            "exampleZh": c["exampleZh"],
            "memoryTip": c["memoryTip"]
        }
        toeic_cards.append(card)

    # 5. SAT cards
    sat_cards = []
    for i, c in enumerate(SAT_CARDS):
        card = {
            "id": f"fc-sat-{i+1:03d}",
            "tier": "sat",
            "category": c["category"],
            "word": c["word"],
            "chunk": c["chunk"],
            "ipa": c["ipa"],
            "pos": c["pos"],
            "icon": c.get("icon") or resolve_icon(c["word"], c["category"], c["zh"], "sat"),
            "zh": c["zh"],
            "collocation": c["collocation"],
            "example": c["example"],
            "exampleZh": c["exampleZh"],
            "memoryTip": c["memoryTip"]
        }
        sat_cards.append(card)

    # 6. GRE cards
    gre_cards = []
    for i, c in enumerate(GRE_CARDS):
        card = {
            "id": f"fc-gre-{i+1:03d}",
            "tier": "gre",
            "category": c["category"],
            "word": c["word"],
            "chunk": c["chunk"],
            "ipa": c["ipa"],
            "pos": c["pos"],
            "icon": c.get("icon") or resolve_icon(c["word"], c["category"], c["zh"], "gre"),
            "zh": c["zh"],
            "collocation": c["collocation"],
            "example": c["example"],
            "exampleZh": c["exampleZh"],
            "memoryTip": c["memoryTip"]
        }
        gre_cards.append(card)

    # 7. GMAT cards
    gmat_cards = []
    for i, c in enumerate(GMAT_CARDS):
        card = {
            "id": f"fc-gm-{i+1:03d}",
            "tier": "gmat",
            "category": c["category"],
            "word": c["word"],
            "chunk": c["chunk"],
            "ipa": c["ipa"],
            "pos": c["pos"],
            "icon": c.get("icon") or resolve_icon(c["word"], c["category"], c["zh"], "gmat"),
            "zh": c["zh"],
            "collocation": c["collocation"],
            "example": c["example"],
            "exampleZh": c["exampleZh"],
            "memoryTip": c["memoryTip"]
        }
        gmat_cards.append(card)

    all_cards = elem_cards + junior_cards + shs_cards + toeic_cards + sat_cards + gre_cards + gmat_cards

    print(f"Total cards: {len(all_cards)}")
    print(f"  Elementary (elem_1000): {len(elem_cards)}")
    print(f"  Junior High (jhs_2000): {len(junior_cards)}")
    print(f"  Senior High (shs_3000): {len(shs_cards)}")
    print(f"  TOEIC (toeic): {len(toeic_cards)}")
    print(f"  SAT (sat): {len(sat_cards)}")
    print(f"  GRE (gre): {len(gre_cards)}")
    print(f"  GMAT (gmat): {len(gmat_cards)}")

    # Format JS file
    db_text = "export const FLASHCARD_DATABASE = [\n"
    db_text += "  // 1. 國小基礎 1,000 (Elementary 1,000)\n" + ",\n".join(format_flashcard(c) for c in elem_cards) + ",\n\n"
    db_text += "  // 2. 國中會考 2,000 (JHS 2,000)\n" + ",\n".join(format_flashcard(c) for c in junior_cards) + ",\n\n"
    db_text += "  // 3. 高中大考 3,000 (SHS 3,000)\n" + ",\n".join(format_flashcard(c) for c in shs_cards) + ",\n\n"
    db_text += "  // 4. TOEIC 多益國際商務 1,500 (TOEIC Business)\n" + ",\n".join(format_flashcard(c) for c in toeic_cards) + ",\n\n"
    db_text += "  // 5. Digital SAT 語境學術詞 1,200 (SAT Contextual)\n" + ",\n".join(format_flashcard(c) for c in sat_cards) + ",\n\n"
    db_text += "  // 6. GRE Verbal 孿生詞群 1,500 (GRE Twin Synonyms)\n" + ",\n".join(format_flashcard(c) for c in gre_cards) + ",\n\n"
    db_text += "  // 7. GMAT Focus 批判推理 1,000 (GMAT Critical Reasoning)\n" + ",\n".join(format_flashcard(c) for c in gmat_cards) + "\n];\n"

    # Assemble flashcards.mjs
    header = """// flashcards.mjs - 全階程度單字與片語記憶閃卡館 (Graded Memory Flashcards Studio)
// 完整依照程度編排：小學1,000字、國中2,000字、高中3,000字與核心片語、TOEIC、Digital SAT、GRE、GMAT
// 配備：3D卡片翻轉動畫、自然拼讀音節拆解、KK音標、雙語例句、即時真人語音 (Web Speech API)、掌握度標記與自動輪播聽讀

import { playWord, playSentence, stopAudio } from './audio.mjs';

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

// 閃卡分級定義
export const FLASHCARD_TIERS = [
  { id: 'elem_1000', name: '🎒 國小示範卡', cefr: 'Pre-A1~A1', count: '1,000 字', color: '#16a34a', desc: '日常生活、家庭學校、基礎動詞、顏色數字動物時間' },
  { id: 'jhs_2000', name: '🏫 國中示範卡', cefr: 'A1~B1', count: '2,000 字', color: '#0284c7', desc: '教育部常用 2,000 參考字彙、會考情境句、詞性與KK音標' },
  { id: 'shs_3000', name: '🎓 高中詞彙示範卡', cefr: 'B1~B2', count: '3,000 字+片語', color: '#7c3aed', desc: '大考 4,500/7,000 核心詞、關鍵動詞片語與學術搭配詞' },
  { id: 'toeic', name: '💼 TOEIC 國際商務實戰', cefr: 'B2', count: '商務核心 1,500 字', color: '#d97706', desc: '商務會議、合約談判、採購預算、辦公通訊高頻詞' },
  { id: 'sat', name: '🏛️ Digital SAT 語境學術詞', cefr: 'B2~C1', count: '學術核心 1,200 字', color: '#4f46e5', desc: 'Words in Context、學術對比詞、歷史社會科學閱讀必背' },
  { id: 'gre', name: '🏛️ GRE Verbal 孿生詞群', cefr: 'C1~C2', count: '核心等價 1,500 詞', color: '#e11d48', desc: '句子等價題孿生詞對 (capricious/fickle 等)、哲學社科精微詞' },
  { id: 'gmat', name: '📊 GMAT 批判邏輯推理詞', cefr: 'C2', count: '邏輯分析 1,000 詞', color: '#0891b2', desc: 'Assumption, Weaken, Strengthen, Corroborate 等商業決策詞' }
];

"""

    ui_code = """
// 閃卡互動內部狀態
let currentTier = 'elem_1000';
let currentCardIndex = 0;
let isFlipped = false;
let autoPlayInterval = null;
let isAutoPlaying = false;
let cardFilterStatus = 'all'; // 'all' | 'need_review' | 'mastered'
let cardSearchKeyword = '';

// 本機學習進度 (cardId -> 'mastered' | 'need_review')
const STORAGE_KEY = 'eq_flashcards_mastery_v1';
let masteryState = {};
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) masteryState = JSON.parse(saved);
} catch (e) {
  masteryState = {};
}

function saveMastery() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(masteryState));
  } catch (e) {}
}

// 取得當前篩選後的卡片清單
function getFilteredCards() {
  let list = FLASHCARD_DATABASE.filter(c => c.tier === currentTier);

  if (cardSearchKeyword) {
    const kw = cardSearchKeyword.toLowerCase();
    list = list.filter(c => c.word.toLowerCase().includes(kw) || c.zh.includes(kw) || c.category.toLowerCase().includes(kw));
  }

  if (cardFilterStatus === 'mastered') {
    list = list.filter(c => masteryState[c.id] === 'mastered');
  } else if (cardFilterStatus === 'need_review') {
    list = list.filter(c => masteryState[c.id] === 'need_review');
  }

  return list;
}

// 閃卡館主頁渲染函數
export function renderFlashcardsStudioView() {
  const tierInfo = FLASHCARD_TIERS.find(t => t.id === currentTier) || FLASHCARD_TIERS[0];
  const allTierCards = FLASHCARD_DATABASE.filter(c => c.tier === currentTier);
  const filteredCards = getFilteredCards();

  if (currentCardIndex >= filteredCards.length) {
    currentCardIndex = Math.max(0, filteredCards.length - 1);
  }

  const currentCard = filteredCards[currentCardIndex] || null;
  const isMastered = currentCard ? masteryState[currentCard.id] === 'mastered' : false;
  const isNeedReview = currentCard ? masteryState[currentCard.id] === 'need_review' : false;

  const totalTierMastered = allTierCards.filter(c => masteryState[c.id] === 'mastered').length;
  const masteryPercentage = allTierCards.length ? Math.round((totalTierMastered / allTierCards.length) * 100) : 0;

  return `
    <section class="card"><h2>國小・國中單字記憶、複習與練習</h2><p>教材卡庫、字義檢核、拼字練習與到期排程。</p><button class="btn primary" data-nav="schoolwords">開啟國小・國中單字複習</button></section>
    <div class="header-block">
      <div class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700">🗂️ 全階記憶閃卡館 · 雙重編碼與檢索練習</div>
      <h1 style="margin:8px 0;font-size:28px">多階層英語單字與核心片語記憶閃卡 (一面英文·一面中文與圖示)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px;line-height:1.6">
        依據第二語言習得 (SLA) 之「雙重編碼理論 (Dual-Coding Theory)」與「檢索練習 (Retrieval Practice)」深層設計：
        <strong>正面純英文</strong>（音節拆解、KK音標、詞性與發音），激發大腦主動提取；<strong>背面繁中與主題圖示</strong>（圖示錨點、核心釋義、高頻搭配、情境例句與記憶秘訣）。
      </p>
    </div>

    <!-- 程度級別切換標籤條 (Tiers Tabs) -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:18px;scrollbar-width:thin">
      ${FLASHCARD_TIERS.map(t => {
        const isCur = t.id === currentTier;
        const countNum = FLASHCARD_DATABASE.filter(c => c.tier === t.id).length;
        return `
          <button class="btn ${isCur ? 'primary' : 'quiet'}" data-fc-tier="${t.id}"
            style="white-space:nowrap;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:${isCur ? '700' : '500'};border:${isCur ? '2px solid #047857' : '1px solid #cbd5e1'}">
            ${t.name} (${countNum})
          </button>
        `;
      }).join('')}
    </div>

    <!-- 程度進度狀態欄 -->
    <div class="card" style="margin-bottom:20px;background:#f8fafc;border-left:5px solid ${tierInfo.color};padding:16px 20px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px">
        <div>
          <strong style="font-size:17px;color:#0f172a">${tierInfo.name}</strong>
          <span class="pill" style="font-size:12px;margin-left:8px;background:#fff;border:1px solid #cbd5e1;color:#475569">CEFR: ${tierInfo.cefr}</span>
          <div style="font-size:13px;color:#64748b;margin-top:2px">${tierInfo.desc}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:13px;color:#475569">
            已精熟：<strong style="color:#047857;font-size:16px">${totalTierMastered}</strong> / ${allTierCards.length} 張 (${masteryPercentage}%)
          </div>
        </div>
      </div>

      <!-- 進度條 -->
      <div style="width:100%;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden">
        <div style="width:${masteryPercentage}%;height:100%;background:linear-gradient(90deg, #10b981 0%, #34d399 100%);transition:width 0.3s ease"></div>
      </div>
    </div>

    <!-- 篩選與搜尋工具列 -->
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn ${cardFilterStatus === 'all' ? 'primary' : 'quiet'}" data-fc-filter="all" style="font-size:13px;padding:6px 12px">
          全部卡片 (${allTierCards.length})
        </button>
        <button class="btn ${cardFilterStatus === 'need_review' ? 'primary' : 'quiet'}" data-fc-filter="need_review" style="font-size:13px;padding:6px 12px">
          🌱 需複習 (${allTierCards.filter(c => masteryState[c.id] === 'need_review').length})
        </button>
        <button class="btn ${cardFilterStatus === 'mastered' ? 'primary' : 'quiet'}" data-fc-filter="mastered" style="font-size:13px;padding:6px 12px">
          ✅ 已精熟 (${totalTierMastered})
        </button>
      </div>

      <div style="display:flex;gap:8px;align-items:center">
        <input type="text" id="fc-search-input" placeholder="🔍 搜尋單字或中文..." value="${esc(cardSearchKeyword)}"
          style="padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;width:180px" />
        <button class="btn quiet" data-fc-shuffle="true" style="font-size:13px;padding:8px 12px" title="隨機洗牌重排順序">
          🔀 洗牌
        </button>
        <button class="btn ${isAutoPlaying ? 'primary' : 'quiet'}" data-fc-toggle-autoplay="true" style="font-size:13px;padding:8px 14px">
          ${isAutoPlaying ? '⏸ 停止輪播' : '▶ 自動輪播聽讀'}
        </button>
      </div>
    </div>

    <!-- 🎴 3D 記憶閃卡主舞台 -->
    ${currentCard ? `
      <div style="perspective:1000px;max-width:720px;margin:0 auto 24px">
        <div class="fc-card-stage" data-fc-flip="true"
          style="min-height:380px;position:relative;transform-style:preserve-3d;transition:transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;border-radius:18px;box-shadow:0 12px 30px -5px rgba(0,0,0,0.12);transform:${isFlipped ? 'rotateY(180deg)' : 'none'}">

          <!-- 卡片正面 (FRONT) - 嚴格純英文環境，促進檢索提取 (Retrieval Practice) -->
          <div class="fc-card-face fc-front"
            style="position:absolute;inset:0;background:#ffffff;border:2px solid ${isMastered ? '#10b981' : (isNeedReview ? '#f59e0b' : '#e2e8f0')};border-radius:18px;padding:26px 28px;display:flex;flex-direction:column;justify-content:space-between;backface-visibility:hidden;-webkit-backface-visibility:hidden">
            <div>
              <!-- 頂部級別與分類標籤 -->
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <div style="display:flex;align-items:center;gap:6px">
                  <span class="pill" style="background:${tierInfo.color}15;color:${tierInfo.color};font-size:12px;font-weight:700;border:1px solid ${tierInfo.color}35">
                    ${tierInfo.name.split(' ')[0]} ${tierInfo.cefr}
                  </span>
                  <span class="pill" style="background:#f1f5f9;color:#475569;font-size:12px;font-weight:600">${currentCard.category}</span>
                </div>
                <span style="font-size:13px;color:#64748b;font-weight:500">卡片 ${currentCardIndex + 1} / ${filteredCards.length}</span>
              </div>

              <!-- 單字與音節拆解 (正面絕無中文釋義，以利檢索回想) -->
              <div style="text-align:center;padding:24px 0 16px">
                <div style="font-size:42px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin-bottom:8px;line-height:1.2">
                  ${currentCard.word}
                </div>
                <div style="font-size:20px;font-weight:700;color:#2563eb;letter-spacing:1.5px;margin-bottom:10px">
                  ${currentCard.chunk}
                </div>
                <div style="display:inline-flex;align-items:center;gap:8px;background:#f8fafc;padding:6px 14px;border-radius:20px;border:1px solid #e2e8f0">
                  <span class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700;font-size:12px;padding:2px 8px">${currentCard.pos}</span>
                  <span style="font-size:15px;color:#334155;font-family:'Segoe UI',monospace;font-weight:500">${currentCard.ipa}</span>
                </div>
              </div>
            </div>

            <!-- 正面底部：雙速發音控制與翻面提示 -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:14px;flex-wrap:wrap;gap:10px">
              <div style="display:flex;gap:8px">
                <button class="btn primary" data-fc-speak-word="${esc(currentCard.word)}" style="padding:8px 16px;font-size:13px;font-weight:700;border-radius:8px">
                  🔊 標準發音 1.0x
                </button>
                <button class="btn quiet" data-fc-speak-word-slow="${esc(currentCard.word)}" style="padding:8px 14px;font-size:13px;font-weight:600;border-radius:8px;border:1px solid #cbd5e1">
                  🐢 慢速拼讀 0.65x
                </button>
              </div>
              <div style="font-size:13px;color:#64748b;display:flex;align-items:center;gap:4px;font-weight:500">
                <span>🔄 點擊卡片翻轉查看中文與圖示</span>
              </div>
            </div>
          </div>

          <!-- 卡片背面 (BACK) - 繁體中文釋義、專屬主題視覺圖示與雙重編碼記憶 -->
          <div class="fc-card-face fc-back"
            style="position:absolute;inset:0;background:linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);border:2px solid #3b82f6;border-radius:18px;padding:22px 26px;display:flex;flex-direction:column;justify-content:space-between;transform:rotateY(180deg);backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow-y:auto">
            <div>
              <!-- 背面頂部：核心概念圖示、詞性單字與中文釋義 -->
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;background:#ffffff;padding:10px 14px;border-radius:14px;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.03)">
                <!-- 醒目主題圖示徽章 (Visual Anchor Icon) -->
                <div style="font-size:38px;line-height:1;width:56px;height:56px;border-radius:14px;background:${tierInfo.color}15;border:2px solid ${tierInfo.color}35;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:inset 0 2px 4px rgba(0,0,0,0.04)">
                  ${currentCard.icon || '📌'}
                </div>
                <div style="flex-grow:1;min-width:0">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
                    <div style="display:flex;align-items:center;gap:6px">
                      <span class="pill" style="font-size:11px;font-weight:700;background:#ecfdf5;color:#047857">${currentCard.pos} ${currentCard.word}</span>
                      <span style="font-size:12px;font-weight:600;color:#64748b">${currentCard.category}</span>
                    </div>
                    <span style="font-size:12px;color:#94a3b8">卡片 ${currentCardIndex + 1} / ${filteredCards.length}</span>
                  </div>
                  <!-- 中文核心釋義 -->
                  <h2 style="margin:0;font-size:22px;color:#0f172a;font-weight:800;letter-spacing:-0.3px">
                    ${currentCard.zh}
                  </h2>
                </div>
              </div>

              <!-- 搭配詞提示 -->
              ${currentCard.collocation ? `
                <div style="margin-bottom:10px;font-size:13px;color:#92400e;background:#fef3c7;border:1px solid #fde68a;padding:5px 12px;border-radius:8px;font-weight:600;display:inline-block">
                  💡 必考搭配：${currentCard.collocation}
                </div>
              ` : ''}

              <!-- 雙語情境例句 -->
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:10px 14px;margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                  <div style="font-size:14px;color:#1e293b;line-height:1.5;font-weight:500" lang="en">
                    "${currentCard.example}"
                  </div>
                  <div style="display:flex;gap:4px;flex-shrink:0">
                    <button class="btn small primary" data-fc-speak-sentence="${esc(currentCard.example)}" style="padding:3px 8px;font-size:11px;white-space:nowrap">
                      🔊 朗讀
                    </button>
                    <button class="btn small quiet" data-fc-speak-sentence-slow="${esc(currentCard.example)}" style="padding:3px 6px;font-size:11px;white-space:nowrap;border:1px solid #cbd5e1">
                      🐢 慢速
                    </button>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;margin-top:4px">
                  ${currentCard.exampleZh}
                </div>
              </div>

              <!-- 認知記憶、字根字首、孿生詞對或題型口訣 -->
              ${currentCard.memoryTip ? `
                <div style="font-size:12px;color:#334155;background:#f8fafc;padding:8px 12px;border-radius:8px;border-left:3px solid #10b981;border:1px solid #e2e8f0;border-left-width:3px">
                  🧠 <strong>深層記憶要點：</strong>${currentCard.memoryTip}
                </div>
              ` : ''}
            </div>

            <!-- 背面底部：翻回正面按鈕 -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2e8f0;padding-top:10px;margin-top:6px">
              <span style="font-size:12px;color:#94a3b8">🔄 點擊卡片翻回正面</span>
              <button class="btn quiet small" data-fc-flip="true" style="padding:4px 10px;font-size:12px;border-radius:6px">
                返回英文單字面
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 控制工具列：上一張、掌握標記、下一張 -->
      <div style="max-width:720px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <button class="btn" data-fc-prev="true" ${currentCardIndex === 0 ? 'disabled' : ''} style="padding:10px 20px;font-weight:700">
          ⬅ 上一張
        </button>

        <!-- 掌握狀態標記按鈕組 -->
        <div style="display:flex;gap:10px">
          <button class="btn ${isNeedReview ? 'secondary' : 'quiet'}" data-fc-mark="need_review"
            style="padding:10px 18px;font-size:14px;border:1px solid #f59e0b;color:${isNeedReview ? '#b45309' : '#d97706'};font-weight:700;background:${isNeedReview ? '#fef3c7' : '#fff'}">
            ${isNeedReview ? '🌱 標記為需加強 (已標記)' : '🌱 仍需複習'}
          </button>
          <button class="btn ${isMastered ? 'primary' : 'quiet'}" data-fc-mark="mastered"
            style="padding:10px 20px;font-size:14px;border:1px solid #10b981;color:${isMastered ? '#fff' : '#047857'};font-weight:700;background:${isMastered ? '#10b981' : '#fff'}">
            ${isMastered ? '✅ 已精熟掌握 (已標記)' : '✅ 標記已精熟'}
          </button>
        </div>

        <button class="btn primary" data-fc-next="true" ${currentCardIndex === filteredCards.length - 1 ? 'disabled' : ''} style="padding:10px 20px;font-weight:700">
          下一張 ➡
        </button>
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:50px 20px;max-width:600px;margin:0 auto">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <h3 style="margin:0 0 8px">該篩選條件下無符合卡片！</h3>
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:16px">
          您可能已完成本分類下的所有卡片複習，或目前的搜尋條件無符合項目。
        </p>
        <button class="btn primary" data-fc-filter="all">重設篩選條件 (查看全部卡片)</button>
      </div>
    `}
  `;
}

// 閃卡事件處理
export function handleFlashcardEvents(target, renderCallback) {
  const d = target.dataset;

  // 切換級別
  if (d.fcTier) {
    currentTier = d.fcTier;
    currentCardIndex = 0;
    isFlipped = false;
    stopFlashcardAutoPlay();
    renderCallback();
    return true;
  }

  // 翻轉卡片
  if (d.fcFlip) {
    isFlipped = !isFlipped;
    renderCallback();
    return true;
  }

  // 發音單字 (標準 1.0x)
  if (d.fcSpeakWord) {
    playWord(d.fcSpeakWord, false);
    return true;
  }

  // 慢速發音單字 (0.65x)
  if (d.fcSpeakWordSlow) {
    playWord(d.fcSpeakWordSlow, true);
    return true;
  }

  // 發音例句 (標準)
  if (d.fcSpeakSentence) {
    playSentence(d.fcSpeakSentence, false);
    return true;
  }

  // 慢速發音例句 (0.75x)
  if (d.fcSpeakSentenceSlow) {
    playSentence(d.fcSpeakSentenceSlow, true);
    return true;
  }

  // 上一張卡片
  if (d.fcPrev) {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      isFlipped = false;
      renderCallback();
    }
    return true;
  }

  // 下一張卡片
  if (d.fcNext) {
    const list = getFilteredCards();
    if (currentCardIndex < list.length - 1) {
      currentCardIndex++;
      isFlipped = false;
      renderCallback();
    }
    return true;
  }

  // 標記掌握狀態
  if (d.fcMark) {
    const list = getFilteredCards();
    const card = list[currentCardIndex];
    if (card) {
      if (masteryState[card.id] === d.fcMark) {
        delete masteryState[card.id];
      } else {
        masteryState[card.id] = d.fcMark;
      }
      saveMastery();
      renderCallback();
    }
    return true;
  }

  // 切換卡片篩選 (all, need_review, mastered)
  if (d.fcFilter) {
    cardFilterStatus = d.fcFilter;
    currentCardIndex = 0;
    isFlipped = false;
    renderCallback();
    return true;
  }

  // 洗牌隨機重排
  if (d.fcShuffle) {
    const list = getFilteredCards();
    if (list.length > 1) {
      currentCardIndex = Math.floor(Math.random() * list.length);
      isFlipped = false;
      renderCallback();
    }
    return true;
  }

  // 切換自動輪播
  if (d.fcToggleAutoplay) {
    if (isAutoPlaying) {
      stopFlashcardAutoPlay();
    } else {
      startFlashcardAutoPlay(renderCallback);
    }
    renderCallback();
    return true;
  }

  return false;
}

// 自動輪播聽讀定時器
function startFlashcardAutoPlay(renderCallback) {
  stopFlashcardAutoPlay();
  isAutoPlaying = true;

  autoPlayInterval = setInterval(() => {
    const list = getFilteredCards();
    if (!list.length) return;

    const card = list[currentCardIndex];
    if (!card) return;

    if (!isFlipped) {
      // 朗讀單字，隨後翻面
      playWord(card.word, false, {
        onEnd: () => {
          setTimeout(() => {
            isFlipped = true;
            renderCallback();
            // 朗讀例句
            playSentence(card.example);
          }, 800);
        }
      });
    } else {
      // 已經在背面，翻回正面並切換下一張
      isFlipped = false;
      if (currentCardIndex < list.length - 1) {
        currentCardIndex++;
      } else {
        currentCardIndex = 0;
      }
      renderCallback();
      const nextCard = list[currentCardIndex];
      if (nextCard) {
        playWord(nextCard.word);
      }
    }
  }, 4800);
}

function stopFlashcardAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
  isAutoPlaying = false;
  stopAudio();
}

export function handleFlashcardInput(target, renderCallback) {
  if (target && target.id === 'fc-search-input') {
    cardSearchKeyword = target.value;
    currentCardIndex = 0;
    renderCallback();
    return true;
  }
  return false;
}
"""

    full_content = header + db_text + ui_code

    with open('dist/flashcards.mjs', 'w', encoding='utf-8') as f:
        f.write(full_content)
    with open('site/dist/flashcards.mjs', 'w', encoding='utf-8') as f:
        f.write(full_content)

    print("Successfully generated dist/flashcards.mjs and site/dist/flashcards.mjs!")

if __name__ == '__main__':
    main()
