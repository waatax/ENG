"""
append_grades.py
Builds G7, G8, G9, G10, G11, G12 and the get_unified_grades() function in full_curriculum_data.py.
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')

g7_code = r'''
def get_g7():
    return {
        "gradeId": "g7",
        "title": "國中七年級 (Grade 7)",
        "stage": "第四學習階段 (國中七年級 108 課綱)",
        "badge": "108 課綱會考核心基石 · 七年級文法主幹",
        "desc": "從句子骨架、be 動詞與現在式展開，深入名詞可數不可數、指示代名詞、祈使句、現在進行式、頻率副詞、情態助動詞 can 與精確時空方位介系詞。",
        "semesters": [
            {
                "semId": "g7-s1",
                "title": "七年級上學期 (7上)",
                "examFocus": "第一次段考 (be動詞/指示詞)、第二次段考 (現在簡單式/名詞單複數)、第三次段考 (祈使句/時間前置詞)",
                "units": [
                    {
                        "id": "g7-s1-u1",
                        "unitNo": "JH-Unit 1",
                        "title": "句子骨架、be 動詞與現在簡單式 (Sentence Patterns & Present Simple)",
                        "indicator": "1-IV-1 / 2-IV-2 / Ac-IV-1",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "jh:english-1",
                        "motivation": "英文是有嚴謹「主謂結構」的形合語言。中文常說「這裡很漂亮」，但英文句子若沒有動詞就是語病！學會句子骨架，掌握現在簡單式真理與習慣，是國中會考英文得分的第一步。",
                        "concepts": [
                            {
                                "title": "五大基本句型核心骨架 (Basic Sentence Patterns)",
                                "formula": "1. S+V 2. S+V+SC 3. S+V+O 4. S+V+IO+DO 5. S+V+O+OC",
                                "explanation": "主詞是主角，動詞是靈魂。及物動詞後面一定要接受詞；不完全不及物動詞 (be動詞、連綴動詞) 後面需要主詞補詞 (SC)。",
                                "example": "Birds fly (S+V). / She is smart (S+V+SC). / Leo loves reading (S+V+O)."
                            },
                            {
                                "title": "現在簡單式第三人稱單數動詞加 -s/-es 終極規則",
                                "formula": "一般加 -s; 字尾 s, sh, ch, x, o 加 -es; 子音+y 去y改 -ies",
                                "explanation": "主詞是 He, She, It 或單數名詞時，肯定句動詞必須做三單現變化。此規則在會考改錯與選擇題命中率極高！",
                                "example": "He watches TV every night. / She studies hard."
                            },
                            {
                                "title": "be 動詞與助動詞 do/does 的絕對分界",
                                "formula": "be 動詞句型 (Am/Is/Are) 表身分、狀態；一般動詞疑問否定叫 do/does 出來幫忙",
                                "explanation": "絕對不可將 be 動詞與一般動詞原形黏在一起（如 He is like dogs ❌ ➔ He likes dogs ✔️）。",
                                "example": "Does your sister play badminton? No, she doesn't."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "identify", "ipa": "/aɪˈdentɪfaɪ/", "pos": "v.", "zh": "辨認；確認", "sentence": "First, identify the subject and verb in the sentence." },
                            { "word": "predicate", "ipa": "/ˈpredɪkət/", "pos": "n.", "zh": "述詞；謂語", "sentence": "The predicate tells what the subject does." },
                            { "word": "singular", "ipa": "/ˈsɪŋɡjələr/", "pos": "adj.", "zh": "單數的", "sentence": "A singular subject requires a singular verb." },
                            { "word": "plural", "ipa": "/ˈplʊrəl/", "pos": "adj.", "zh": "複數的", "sentence": "These nouns take irregular plural forms." }
                        ],
                        "dialogue": [
                            { "speaker": "Teacher", "en": "Leo, can you tell me what is wrong with 'She have two cats'?", "zh": "Leo，你能告訴我 'She have two cats' 哪裡錯了嗎？" },
                            { "speaker": "Leo", "en": "The subject 'She' is third-person singular, so the verb should be 'has'!", "zh": "主詞 'She' 是第三人稱單數，動詞應該改成 'has'！" },
                            { "speaker": "Teacher", "en": "Spot on! And how about the negative sentence?", "zh": "答得太棒了！那否定句該怎麼改呢？" },
                            { "speaker": "Leo", "en": "She doesn't have two cats. The verb returns to base form!", "zh": "改成 She doesn't have two cats，動詞要打回原形！" }
                        ],
                        "reading": {
                            "title": "Daily Life in a Green School (綠色校園的一天)",
                            "strategy": "確認主詞與動詞單複數一致性 (Subject-Verb Agreement)。",
                            "text": "Green Junior High School operates entirely on renewable energy. Every morning, solar panels on the rooftop generate clean electricity for classrooms. Mr. Wu, the science teacher, leads students in composting cafeteria leftovers. The school garden produces fresh organic herbs and tomatoes. A student representative records daily electricity usage on an interactive screen in the main hallway. Through these consistent environmental actions, the whole school practices sustainable living every day.",
                            "questions": [
                                { "q": "What generates electricity for the classrooms?", "ans": "Solar panels on the rooftop." },
                                { "q": "Who leads the composting project?", "ans": "Mr. Wu, the science teacher." }
                            ]
                        },
                        "step0Clue": "看到句子主詞，先問自己三句話：1. 主詞是單數還是複數？ 2. 動詞是一般動作還是 be 動詞狀態？ 3. 是否有時間副詞指示現在習慣？若是三單且為現在式，立刻確認動詞加 -s/-es！",
                        "formativeQuiz": [
                            {
                                "q": "Leo's brother ________ English novels in the library every afternoon.",
                                "options": ["read", "reads", "is reading", "reading"],
                                "ans": 1,
                                "hint1": "主詞是 Leo's brother (單數，可代換為 He)。",
                                "hint2": "時間副詞是 every afternoon，表示平日生活習慣，使用現在簡單式。",
                                "solution": "第三人稱單數主詞搭配現在簡單式，動詞加 -s (reads)。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Does Leo likes playing soccer? ❌", "correct": "Does Leo like playing soccer? ✔️", "reason": "問句中已經有 does 體現第三人稱單數，後方主要動詞必須恢復原形 like。" },
                            { "wrong": "He is speak English very well. ❌", "correct": "He speaks English very well. ✔️", "reason": "be 動詞不可與一般動詞原形連用，此為嚴重語病。" }
                        ],
                        "checklist": [
                            "我能快速找出一句話中的主詞、動詞、受詞與補詞",
                            "我能正確寫出三單現動詞字尾的 -s, -es, -ies 規則",
                            "我知道有 does 或 doesn't 時，主要動詞必定回歸原形"
                        ]
                    },
                    {
                        "id": "g7-s1-u2",
                        "unitNo": "JH-Unit 2",
                        "title": "名詞單複數、指示代名詞與祈使句 (Nouns, Demonstratives & Imperatives)",
                        "indicator": "1-IV-2 / 2-IV-1 / Ac-IV-2",
                        "competency": "B1 符號運用、C1 公民道德",
                        "sourceRef": "jh:english-7",
                        "motivation": "在圖書館看到 'Silence, please!'，在捷運看到 'Mind the gap!'，這些都是日常生活中最常見的「祈使句」。掌握名詞單複數與祈使句，讓你的英文指示精準有力。",
                        "concepts": [
                            {
                                "title": "可數名詞不規則複數變化大匯整",
                                "formula": "man-men, woman-women, child-children, tooth-teeth, foot-feet, mouse-mice, person-people, sheep-sheep, fish-fish",
                                "explanation": "單複數同形的名詞 (sheep, fish, deer) 在會考閱讀中是常考陷阱，須根據動詞單複數判定其含義。",
                                "example": "These sheep are grazing peacefully on the hill."
                            },
                            {
                                "title": "祈使句核心公式與禮貌修飾語",
                                "formula": "肯定：(Please) + 原形動詞... / 否定：(Please) Don't + 原形動詞... / Be + 形容詞",
                                "explanation": "祈使句省略了主詞 you。切記否定一律用 Don't，絕對不可用 Not 或 No 接動詞原形。",
                                "example": "Please take off your shoes. / Don't touch the exhibits."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "imperative", "ipa": "/ɪmˈperətɪv/", "pos": "adj./n.", "zh": "祈使的；必要指令", "sentence": "An imperative sentence begins with a base verb." },
                            { "word": "demonstrative", "ipa": "/dɪˈmɑːnstrətɪv/", "pos": "adj.", "zh": "指示的", "sentence": "This, that, these, and those are demonstrative pronouns." }
                        ],
                        "dialogue": [
                            { "speaker": "Librarian", "en": "Excuse me, young man. Please lower your voice. Other students are studying.", "zh": "不好意思，同學。請放低音量，其他同學正在讀書。" },
                            { "speaker": "Kevin", "en": "I am so sorry, ma'am. I will be quiet.", "zh": "非常抱歉，女士。我會保持安靜。" }
                        ],
                        "reading": {
                            "title": "Metro Safety Guidelines (捷運公共安全指引告示)",
                            "strategy": "公告文本閱讀：快速抓取粗體警語、符號與禁止條款。",
                            "text": "Welcome to Taipei Rapid Transit System. For the safety and comfort of all passengers, please observe the following regulations: 1. Stand behind the yellow warning line while waiting on platforms. 2. Mind the gap between the train and the platform edge. 3. Eating, drinking, smoking, and chewing gum are strictly prohibited past the fare gates. In case of emergency, press the alarm button near the doors immediately.",
                            "questions": [
                                { "q": "What is prohibited past the fare gates?", "ans": "Eating, drinking, smoking, and chewing gum." }
                            ]
                        },
                        "step0Clue": "看到句首沒有主詞，直接放動詞，這就是「祈使句」！動詞務必選「原形動詞」；否定一律用「Don't + 原形動詞」！",
                        "formativeQuiz": [
                            {
                                "q": "________ late for the meeting, or Mr. Wu will be upset.",
                                "options": ["Not be", "Don't be", "Aren't", "No be"],
                                "ans": 1,
                                "hint1": "本句是祈使句的否定形式。",
                                "hint2": "祈使句否定一律使用 Don't + 原形動詞，be 動詞的原形就是 be。",
                                "solution": "祈使句否定公式為 Don't + 原形動詞 (Don't be)。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "No run in the hallway! ❌", "correct": "Don't run in the hallway! / No running! ✔️", "reason": "祈使句否定用 Don't + 原形動詞；若用 No 只能接動名詞 (No running)。" }
                        ],
                        "checklist": [
                            "我能背出 8 組最常考的不規則複數名詞",
                            "我牢記祈使句開頭必須用「原形動詞」"
                        ]
                    },
                    {
                        "id": "g7-s1-u3",
                        "unitNo": "Arch-Phonetics",
                        "title": "國際音標 (IPA/KK) 與字典查閱全指南 (Phonetics & Dictionary Guide)",
                        "indicator": "Arch: phonetics-dictionary",
                        "competency": "B1 符號運用、A1 自主行動",
                        "sourceRef": "arch:phonetics-dictionary",
                        "motivation": "看懂音標，就能獨立自學任何新單字！國際音標 (IPA) 與 KK 音標是打通聽力與口語發音的靈魂鑰匙。",
                        "concepts": [
                            {
                                "title": "母音與子音音標對照表 (KK音標 vs IPA)",
                                "formula": "長母音 /iː/, /uː/, /ɔː/, /ɑː/, /ɜː/ vs 短母音 /ɪ/, /ʊ/, /ɒ/, /æ/, /ʌ/, /ə/",
                                "explanation": "雙母音如 /aɪ/, /aʊ/, /eɪ/, /oʊ/, /ɔɪ/ 是由前一個音滑向後一個音，滑動過程要飽滿。",
                                "example": "beat /biːt/ vs bit /bɪt/; pool /puːl/ vs pull /pʊl/"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "syllable", "ipa": "/ˈsɪləbl/", "pos": "n.", "zh": "音節", "sentence": "Every syllable contains a vowel sound." },
                            { "word": "accent", "ipa": "/ˈæksent/", "pos": "n.", "zh": "重音；口音", "sentence": "The primary accent falls on the first syllable." }
                        ],
                        "dialogue": [
                            { "speaker": "Teacher", "en": "Listen closely to 'sheep' and 'ship'. Can you hear the vowel length difference?", "zh": "仔細聽 'sheep' 和 'ship'，能聽出母音長短的差異嗎？" },
                            { "speaker": "Student", "en": "Yes! 'sheep' has a long /iː/, while 'ship' has a short /ɪ/!", "zh": "聽得出來！'sheep' 是長音 /iː/，而 'ship' 是短音 /ɪ/！" }
                        ],
                        "reading": {
                            "title": "Mastering the Dictionary (掌握字典查閱技巧)",
                            "strategy": "工具書使用策略：辨識詞性標記 (n., v., adj., adv.) 與例句。",
                            "text": "An English dictionary is not merely a translation tool; it is a treasure trove of language patterns. When you encounter a word with multiple meanings, read all the example sentences. Pay special attention to whether a verb is transitive [T] or intransitive [I]. Checking the pronunciation guide helps you speak with natural rhythm and confidence.",
                            "questions": [
                                { "q": "What does [T] stand for in a dictionary entry?", "ans": "Transitive verb." }
                            ]
                        },
                        "step0Clue": "看音標時，注意重音符號 [ ˈ ] 在哪個音節前面，該音節要念得最響亮、最高昂、最清晰！",
                        "formativeQuiz": [
                            {
                                "q": "Which word contains the long vowel sound /iː/?",
                                "options": ["sit", "seat", "set", "sat"],
                                "ans": 1,
                                "hint1": "eat, seat, meet, sleep 發長母音 /iː/。",
                                "hint2": "sit 發短母音 /ɪ/。",
                                "solution": "seat 發音為 /siːt/，包含長母音 /iː/。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "把名詞和動詞同形的單字都念一樣的重音。 ❌", "correct": "名詞前重、動詞後重 (REcord 名詞 vs reCORD 動詞)。 ✔️", "reason": "英文雙音節名詞重音多在第一音節，動詞重音多在第二音節。" }
                        ],
                        "checklist": [
                            "我能分清長母音 /iː/ 與短母音 /ɪ/ 的發音差別",
                            "我知道重音符號 [ ˈ ] 所在位置的發音要領"
                        ]
                    }
                ]
            },
            {
                "semId": "g7-s2",
                "title": "七年級下學期 (7下)",
                "examFocus": "第一次段考 (現在進行式)、第二次段考 (頻率副詞/助動詞)、第三次段考 (存在句/方位介系詞)",
                "units": [
                    {
                        "id": "g7-s2-u4",
                        "unitNo": "JH-Unit 3",
                        "title": "現在進行式與動態時間表達 (Present Continuous & Dynamic Time)",
                        "indicator": "JH: english-2 / Ac-IV-3",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-2",
                        "motivation": "Look! The train is coming! 描述眼前正在發生的動態事件，現在進行式是不可或缺的語法結構。",
                        "concepts": [
                            {
                                "title": "現在進行式完整公式",
                                "formula": "S + am/is/are + V-ing",
                                "explanation": "不可漏掉 be 動詞，也不可把原形動詞直接接在 be 後面。靜態動詞 (know, have擁有, like) 不用於進行式。",
                                "example": "The children are playing soccer on the field right now."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "continuous", "ipa": "/kənˈtɪnjuəs/", "pos": "adj.", "zh": "持續的；連續的", "sentence": "The rain has been continuous throughout the afternoon." }
                        ],
                        "dialogue": [
                            { "speaker": "Mom", "en": "What are you doing in the kitchen, Sam?", "zh": "Sam，你在廚房裡做什麼呢？" },
                            { "speaker": "Sam", "en": "I am making a fruit salad for our dinner!", "zh": "我正在為我們的晚餐做水果沙拉！" }
                        ],
                        "reading": {
                            "title": "A Busy Sunday Afternoon (繁忙的週日下午)",
                            "strategy": "動態動作抓取：找出每個家庭成員正在進行的動作。",
                            "text": "It is Sunday afternoon at the Lin household. Mr. Lin is repairing a broken bicycle in the backyard. Mrs. Lin is watering the potted flowers on the balcony. In the living room, their daughter Amy is practicing the violin, while her brother is reading a book. Outside the window, birds are singing merrily in the tall oak tree.",
                            "questions": [
                                { "q": "What is Mrs. Lin doing?", "ans": "She is watering the potted flowers." }
                            ]
                        },
                        "step0Clue": "看到 Look! / Listen! / now / right now，動詞時態立刻鎖定「be 動詞 + V-ing」！",
                        "formativeQuiz": [
                            {
                                "q": "Listen! The baby ________ in the next room.",
                                "options": ["cries", "is crying", "crying", "cried"],
                                "ans": 1,
                                "hint1": "Listen! 提醒聽者注意當下正在發生的聲音。",
                                "hint2": "單數主詞 The baby 搭配 is + V-ing。",
                                "solution": "聽當下聲音用現在進行式 is crying。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He playing tennis now. ❌", "correct": "He is playing tennis now. ✔️", "reason": "進行式公式是 be + V-ing，兩者缺一不可。" }
                        ],
                        "checklist": [
                            "我牢記進行式公式必須有 be 動詞",
                            "我知道 know, like, have(擁有) 不用進行式"
                        ]
                    },
                    {
                        "id": "g7-s2-u5",
                        "unitNo": "JH-Unit 4",
                        "title": "頻率副詞、情態助動詞 can 與存在句 (Adverbs of Frequency & There is/are)",
                        "indicator": "JH: english-8 / Ac-IV-4",
                        "competency": "B1 符號溝通",
                        "sourceRef": "jh:english-8",
                        "motivation": "日常生活中描述作息頻率與空間物品擺設，需要頻率副詞與存在句 There is / There are。",
                        "concepts": [
                            {
                                "title": "存在句 There is / There are 核心定律",
                                "formula": "There is + 單數/不可數名詞 + 地點 / There are + 複數名詞 + 地點",
                                "explanation": "中文說「那裡有一張桌子」，容易受中文影響寫成 There have ❌，英文必定用 There is / There are ✔️！",
                                "example": "There are forty students in our classroom."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "existential", "ipa": "/ˌeɡzɪˈstenʃl/", "pos": "adj.", "zh": "存在的", "sentence": "There is/are creates an existential sentence." }
                        ],
                        "dialogue": [
                            { "speaker": "Alex", "en": "Are there any convenience stores near our hotel?", "zh": "我們飯店附近有便利商店嗎？" },
                            { "speaker": "Guide", "en": "Yes, there is one right across the street!", "zh": "有的，正對面就有一家！" }
                        ],
                        "reading": {
                            "title": "The Community Park (社區公園一覽)",
                            "strategy": "空間物品定位：辨認園區內各項設施與數量。",
                            "text": "Our community park is a vibrant gathering place. There is a large pond in the center where ducks swim freely. There are three wooden pavilions surrounded by blooming azaleas. Beside the basketball court, there is a drinking fountain for athletes. Every morning, there are many senior citizens practicing tai chi on the lawn.",
                            "questions": [
                                { "q": "What is in the center of the park?", "ans": "A large pond where ducks swim freely." }
                            ]
                        },
                        "step0Clue": "看到 There ________，先看空格後面的名詞是單數還是複數；若是複數選 are，單數或不可數選 is！",
                        "formativeQuiz": [
                            {
                                "q": "There ________ a lot of fresh milk in the refrigerator.",
                                "options": ["is", "are", "have", "has"],
                                "ans": 0,
                                "hint1": "milk 是不可數名詞。",
                                "hint2": "不可數名詞搭配單數 be 動詞 is。",
                                "solution": "milk 為不可數名詞，存在句用 There is。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "There have many books on the desk. ❌", "correct": "There are many books on the desk. ✔️", reason: "英文表示某處有某物一律用 There is / There are，切勿受中文影響寫成 There have。" }
                        ],
                        "checklist": [
                            "我分清可數複數用 There are、不可數用 There is",
                            "我絕不寫出 There have 的錯誤句子"
                        ]
                    },
                    {
                        "id": "g7-s2-u6",
                        "unitNo": "JH-Unit 5",
                        "title": "時空方位介系詞與地圖導航指南 (Prepositions of Space & Directions)",
                        "indicator": "JH: english-13 / Ac-IV-5",
                        "competency": "B1 符號溝通、C1 公民行動",
                        "sourceRef": "jh:english-13",
                        "motivation": "大考常考地圖與指路，掌握方位介系詞 (along, across, through, into) 能讓你在閱讀中精確構建空間心智模型。",
                        "concepts": [
                            {
                                "title": "空間介系詞之穿透與跨越 (through vs across)",
                                "formula": "through = 穿過立體內部 (tunnel, forest) / across = 橫越平面表面 (street, river)",
                                "explanation": "walk through the park (在公園林間穿過) vs walk across the street (過馬路)。",
                                "example": "The train passed through the long tunnel and arrived in Taitung."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "navigate", "ipa": "/ˈnævɪɡeɪt/", "pos": "v.", "zh": "導航；航行", "sentence": "Use GPS to navigate through the complex city streets." }
                        ],
                        "dialogue": [
                            { "speaker": "Driver", "en": "Do we go across the bridge or through the tunnel?", "zh": "我們要過橋還是穿過隧道？" },
                            { "speaker": "Navigator", "en": "Go across the bridge first, then turn right into River Road.", "zh": "先過橋，然後右轉進入河濱路。" }
                        ],
                        "reading": {
                            "title": "Touring the Historic District (歷史城區導覽)",
                            "strategy": "路線追蹤：跟隨介系詞畫出參訪動線。",
                            "text": "To tour the historic district, start at the City Gate. Walk along the ancient stone wall until you reach the central plaza. Walk across the marble courtyard to visit the memorial hall. Afterward, stroll through the tranquil botanical garden behind the temple. You will discover picturesque cafes tucked into the cobblestone alleys.",
                            "questions": [
                                { "q": "Where should you walk after reaching the central plaza?", "ans": "Across the marble courtyard to the memorial hall." }
                            ]
                        },
                        "step0Clue": "立體空間 (森林、隧道) 穿過用 through；平面 (馬路、河流) 橫越用 across！",
                        "formativeQuiz": [
                            {
                                "q": "The hikers walked ________ the dense forest for three hours before finding the campsite.",
                                "options": ["across", "through", "on", "at"],
                                "ans": 1,
                                "hint1": "forest 是立體三維的森林空間。",
                                "hint2": "穿越立體空間介系詞用 through。",
                                "solution": "穿過森林用 through。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He walked through the road. ❌", "correct": "He walked across the road. ✔️", reason: "馬路是平面，橫越應用 across。" }
                        ],
                        "checklist": [
                            "我能分清 through (立體穿過) 與 across (平面橫越)",
                            "我能讀懂地圖指路的多步驟介系詞說明"
                        ]
                    }
                ]
            }
        ]
    }
'''

with open("scripts/full_curriculum_data.py", "a", encoding="utf-8") as f:
    f.write(g7_code)

print("Appended G7 successfully.")
