"""
append_g8_g9.py
Appends G8 and G9 to full_curriculum_data.py
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')

g8_g9_code = r'''
def get_g8():
    return {
        "gradeId": "g8",
        "title": "國中八年級 (Grade 8)",
        "stage": "第四學習階段 (國中八年級 108 課綱)",
        "badge": "108 課綱會考進階主幹 · 八年級文法突破",
        "desc": "過去簡單式、未來式、過去進行式、時間連接詞 when/while、數量詞、條件副詞子句 if/unless、比較級與最高級、不定詞與動名詞、連綴動詞與感官動詞。",
        "semesters": [
            {
                "semId": "g8-s1",
                "title": "八年級上學期 (8上)",
                "examFocus": "第一次段考 (過去簡單式與未來式)、第二次段考 (過去進行式與時間連接詞)、第三次段考 (條件子句與數量詞)",
                "units": [
                    {
                        "id": "g8-s1-u1",
                        "unitNo": "JH-Unit 6",
                        "title": "過去式、未來與敘事時間軸 (Past Simple, Future Tense & Narrative)",
                        "indicator": "JH: english-3 / Ac-IV-6",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "jh:english-3",
                        "motivation": "敘述一個事件的起承轉合，需要清楚建立時間軸。過去簡單式與時間副詞 (first, then, afterward, finally) 是說好英語故事的黃金組合。",
                        "concepts": [
                            {
                                "title": "時間順序連接副詞鏈 (Narrative Sequencing)",
                                "formula": "First... Then... Next... After that... Finally...",
                                "explanation": "時間副詞放在句首時，後面通常加逗號，引導下一個發生動作。",
                                "example": "First, we bought the ingredients. Then, we baked the cake together."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "narrative", "ipa": "/ˈnærətɪv/", "pos": "n.", "zh": "敘述；故事", "sentence": "A good narrative keeps listeners engaged from start to finish." }
                        ],
                        "dialogue": [
                            { "speaker": "Leo", "en": "What did you do after finishing your project?", "zh": "完成專案之後你做了什麼？" },
                            { "speaker": "Sam", "en": "First I rested for an hour, and then I went cycling along the riverside.", "zh": "我先休息了一小時，然後去河濱騎腳踏車。" }
                        ],
                        "reading": {
                            "title": "The Rescue of the Stranded Hiker (搜救受困登山客紀實)",
                            "strategy": "時間軸排列：將文章中的搜救步驟標記在時間線上。",
                            "text": "At 3:00 p.m. yesterday, mountain rescue teams received an SOS signal from Mount Snow. First, operators tracked the hiker's smartphone GPS coordinates. Next, at 4:30 p.m., a search helicopter surveyed the ridgeline. Despite dense fog, spotters spotted an orange tent. Finally, by 6:00 p.m., rescuers winched the injured hiker safely into the helicopter cabin.",
                            "questions": [
                                { "q": "What did operators do first after receiving the SOS signal?", "ans": "Tracked the hiker's smartphone GPS coordinates." }
                            ]
                        },
                        "step0Clue": "在閱讀記敘文時，先掃描每一段落的動詞時態，辨認是以過去簡單式為主軸的客觀報導。",
                        "formativeQuiz": [
                            {
                                "q": "First, the chef chopped the onions. ________, he heated the pan.",
                                "options": ["After", "Then", "Before", "While"],
                                "ans": 1,
                                "hint1": "句首有逗號，是獨立副詞連接詞。",
                                "hint2": "First 與 Then 構成最標準的時間順序副詞搭配。",
                                "solution": "First..., Then... 敘述先後順序。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "After I went home, then I took a shower. ❌", "correct": "After I went home, I took a shower. ✔️", "reason": "After 已經是從屬連接詞，不可再跟 then 重複堆疊！" }
                        ],
                        "checklist": [
                            "我能用 First, Then, After that, Finally 條理敘述事件",
                            "我知道 After 子句後不需再加 then"
                        ]
                    },
                    {
                        "id": "g8-s1-u2",
                        "unitNo": "JH-Unit 7",
                        "title": "過去進行式、時間連接詞 when/while 與數量詞 (Past Continuous & Quantifiers)",
                        "indicator": "JH: english-9 / Ac-IV-7",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-9",
                        "motivation": "當電話響起時，我正在洗澡！長動作背景與短動作突發的交織，正是過去進行式與 when/while 的魅力所在。",
                        "concepts": [
                            {
                                "title": "長動作背景 vs 短動作突發 (When vs While)",
                                "formula": "While + 長動作 (was/were + V-ing), 短動作 (過去式) / When + 短動作 (過去式), 長動作 (was/were + V-ing)",
                                "explanation": "while 後面接進行中的長動作；when 後面常接突然發生的瞬間短動作。",
                                "example": "While I was studying in my room, the power suddenly went out."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "simultaneous", "ipa": "/ˌsaɪmlˈteɪniəs/", "pos": "adj.", "zh": "同時發生的", "sentence": "While connects two simultaneous background actions." }
                        ],
                        "dialogue": [
                            { "speaker": "Officer", "en": "What were you doing at 8:00 p.m. last night?", "zh": "昨晚八點整你正在做什麼？" },
                            { "speaker": "Witness", "en": "I was walking my dog in the park when I heard a loud explosion.", "zh": "我正在公園遛狗，這時突然聽到一聲巨響。" }
                        ],
                        "reading": {
                            "title": "The Night the Lights Went Out (停電的那一夜)",
                            "strategy": "長短動作判定：區分正在進行的背景與突然發生的干擾事件。",
                            "text": "Last Friday evening, a sudden storm hit the southern district. While families were having dinner, a lightning bolt struck the main power substation. Instantly, all neighborhood lights flickered and extinguished. People were searching for candles when emergency sirens began to echo through the rain.",
                            "questions": [
                                { "q": "What were families doing when lightning struck?", "ans": "They were having dinner." }
                            ]
                        },
                        "step0Clue": "看連詞是 when 還是 while：while 後面接 was/were + V-ing (長動作)；when 後面常接一般過去式 (短動作)！",
                        "formativeQuiz": [
                            {
                                "q": "Tom was riding his bicycle home ________ it started to pour with rain.",
                                "options": ["while", "when", "during", "since"],
                                "ans": 1,
                                "hint1": "started to pour 是突發的短動作過去式。",
                                "hint2": "突發短動作前面搭配連接詞 when。",
                                "solution": "瞬間短動作引導用 when。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "While it was started to rain... ❌", "correct": "While it was raining... / When it started to rain... ✔️", "reason": "start 是瞬間動詞，不可誤寫成 was started。" }
                        ],
                        "checklist": [
                            "我能分清 when 搭短動作、while 搭長動作",
                            "我能熟練使用 was/were + V-ing 營造過去背景氣氛"
                        ]
                    },
                    {
                        "id": "g8-s1-u3",
                        "unitNo": "JH-Unit 8",
                        "title": "條件副詞子句與情態假設語氣 If / Unless (Conditional Clauses)",
                        "indicator": "JH: english-14 / Ac-IV-8",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "jh:english-14",
                        "motivation": "明天如果下雨，比賽就延期！這句話在英語中隱藏著最重要的大考文法定律：從屬條件子句用現在式代替未來式！",
                        "concepts": [
                            {
                                "title": "條件副詞子句「從現代未」鐵律",
                                "formula": "If + S + 現在簡單式, S + will + 原形動詞 / S + will + 原形動詞 + if + S + 現在簡單式",
                                "explanation": "If 或 Unless 引導的條件子句中，哪怕明天才發生，動詞也「絕對不可加 will」！",
                                "example": "If the weather is fine tomorrow, we will go on a hike."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "conditional", "ipa": "/kənˈdɪʃənl/", "pos": "adj.", "zh": "條件的", "sentence": "Conditional clauses express requirements for future events." }
                        ],
                        "dialogue": [
                            { "speaker": "Coach", "en": "Will we play the baseball match tomorrow if it rains?", "zh": "如果明天下雨，我們明天還會打棒球賽嗎？" },
                            { "speaker": "Captain", "en": "No. If it rains, the umpire will postpone the game to next week.", "zh": "不會。如果下雨，裁判會將比賽延期到下週。" }
                        ],
                        "reading": {
                            "title": "Emergency Preparedness Plan (防災應變準備指南)",
                            "strategy": "條件與結果對應：辨識 'If A happens, do B' 結構。",
                            "text": "Earthquakes occur without warning in Taiwan. If you feel strong shaking, immediately follow the 'Drop, Cover, and Hold On' protocol. Protect your head under a sturdy desk. Unless you are already near an open exit, do not rush downstairs in panic. If you smell gas, turn off the main valve before evacuating.",
                            "questions": [
                                { "q": "What should you do immediately if you feel strong shaking?", "ans": "Follow the 'Drop, Cover, and Hold On' protocol." }
                            ]
                        },
                        "step0Clue": "看到 If 子句，主要子句有 will，If 裡面的空格立刻填「現在簡單式」(三單動詞加 -s)，絕對不要選 will！",
                        "formativeQuiz": [
                            {
                                "q": "If Lisa ________ the train tomorrow morning, she will arrive late for the interview.",
                                "options": ["misses", "will miss", "missed", "missing"],
                                "ans": 0,
                                "hint1": "這是 If 條件子句，主要子句用 will arrive。",
                                "hint2": "條件子句用現在式代替未來式，Lisa 是三單主詞。",
                                "solution": "條件子句從現代未，三單動詞用 misses。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "If it will rain tomorrow, I will stay home. ❌", "correct": "If it rains tomorrow, I will stay home. ✔️", "reason": "If 條件子句禁止使用 will，需用現在式 rains 代替。" }
                        ],
                        "checklist": [
                            "我牢記 If 條件子句絕對不能加 will",
                            "我知道 Unless 等於 If ... not (除非...否則不)"
                        ]
                    }
                ]
            },
            {
                "semId": "g8-s2",
                "title": "八年級下學期 (8下)",
                "examFocus": "第一次段考 (形容詞副詞比較級與最高級)、第二次段考 (不定詞與動名詞)、第三次段考 (連綴動詞與感官動詞)",
                "units": [
                    {
                        "id": "g8-s2-u4",
                        "unitNo": "JH-Unit 9",
                        "title": "比較級、不定詞 to V 與動名詞 V-ing (Comparatives, Infinitives & Gerunds)",
                        "indicator": "JH: english-4 / Ac-IV-9",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-4",
                        "motivation": "enjoy reading 還是 enjoy to read？want to play 還是 want playing？動名詞與不定詞的搭配是會考文法單題的兵家必爭之地！",
                        "concepts": [
                            {
                                "title": "三大必接動名詞巨頭 (Gerund Verbs)",
                                "formula": "enjoy / practice / finish + V-ing",
                                "explanation": "口訣：享受 (enjoy) 練習 (practice) 才能完成 (finish)！這三個動詞後面 100% 只能接 V-ing，絕不能接 to V。",
                                "example": "She finished writing the report and enjoyed listening to music."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "gerund", "ipa": "/ˈdʒerənd/", "pos": "n.", "zh": "動名詞", "sentence": "A gerund functions as a noun in a sentence." }
                        ],
                        "dialogue": [
                            { "speaker": "Teacher", "en": "Do you enjoy playing basketball after school?", "zh": "你喜歡放學後打籃球嗎？" },
                            { "speaker": "Ben", "en": "Yes! I practice shooting hoops every single day.", "zh": "喜歡！我每天都練習投籃。" }
                        ],
                        "reading": {
                            "title": "The Joy of Learning Music (學習音樂的樂趣)",
                            "strategy": "動詞後接結構抓取：標記所有接 V-ing 與接 to V 的動詞搭配。",
                            "text": "Learning an instrument requires dedication and patience. Many students decide to learn guitar because they want to write their own songs. At first, your fingers will hurt, but if you keep practicing every day, you will soon enjoy playing complete melodies.",
                            "questions": [
                                { "q": "Why do many students decide to learn guitar?", "ans": "Because they want to write their own songs." }
                            ]
                        },
                        "step0Clue": "看到 enjoy / practice / finish，眼睛閉著選 V-ing！看到 want / plan / decide，毫不猶豫選 to V！",
                        "formativeQuiz": [
                            {
                                "q": "After three hours of hard work, the team finally finished ________ the bridge model.",
                                "options": ["build", "to build", "building", "built"],
                                "ans": 2,
                                "hint1": "主要動詞是 finished。",
                                "hint2": "finish 後面只能接動名詞 V-ing。",
                                "solution": "finish 後接動名詞 building。故選 C。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He enjoys to play piano. ❌", "correct": "He enjoys playing piano. ✔️", "reason": "enjoy 後方受詞必須接動名詞 playing。" }
                        ],
                        "checklist": [
                            "我牢記 enjoy, practice, finish 後面必接 V-ing",
                            "我分清 want, decide, plan 後面接 to V"
                        ]
                    },
                    {
                        "id": "g8-s2-u5",
                        "unitNo": "JH-Unit 10",
                        "title": "連綴動詞、感官動詞與最高級比較 (Linking & Sensory Verbs, Superlatives)",
                        "indicator": "JH: english-10 / Ac-IV-10",
                        "competency": "B1 符號溝通",
                        "sourceRef": "jh:english-10",
                        "motivation": "這碗湯喝起來好香甜！中文說「香甜地」，英文卻嚴禁使用副詞，必須接形容詞！連綴動詞是台灣學子最容易踩雷的高頻考點。",
                        "concepts": [
                            {
                                "title": "五大感官連綴動詞 + 形容詞 (Linking Verbs)",
                                "formula": "look (看), sound (聽), smell (聞), taste (嚐), feel (摸/感覺) + 形容詞",
                                "explanation": "連綴動詞後方接的是主詞補詞 (SC)，用來補充說明主詞性質，因此一律用「形容詞」，絕對不可用副詞！",
                                "example": "The soup tastes delicious (不是 deliciously ❌)!"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "sensory", "ipa": "/ˈsensəri/", "pos": "adj.", "zh": "感官的", "sentence": "Sensory verbs describe sight, sound, taste, touch, and smell." }
                        ],
                        "dialogue": [
                            { "speaker": "Waiter", "en": "How does your steak taste, sir?", "zh": "先生，您的牛排吃起來如何？" },
                            { "speaker": "Customer", "en": "It tastes wonderful and tender! My compliments to the chef.", "zh": "嚐起來太棒又鮮嫩了！請轉達我對主廚的讚美。" }
                        ],
                        "reading": {
                            "title": "The Art of Food Tasting (品嚐美食的感官藝術)",
                            "strategy": "感官形容詞比對：找出文章中形容視覺、嗅覺、味覺的形容詞。",
                            "text": "Professional food critics evaluate dishes using all five senses. First, the food must look appealing on the plate. Second, it should smell aromatic before entering the mouth. When eaten, textures must feel pleasant, and ingredients must taste harmonious. Perfect food engages the mind and the heart simultaneously.",
                            "questions": [
                                { "q": "What must food critics evaluate first?", "ans": "How appealing the food looks on the plate." }
                            ]
                        },
                        "step0Clue": "看到 look, sound, smell, taste, feel，後面直接接「形容詞」(sweet, delicious, tired)；若加 like 則接「名詞」！",
                        "formativeQuiz": [
                            {
                                "q": "The bakery's fresh bread smells ________ and attracts long lines of customers.",
                                "options": ["sweetly", "sweet", "sweetness", "sweeter than"],
                                "ans": 1,
                                "hint1": "smells 是連綴動詞。",
                                "hint2": "連綴動詞後面當補詞必須使用形容詞。",
                                "solution": "連綴動詞後接形容詞 sweet。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "You look very tiredly. ❌", "correct": "You look very tired. ✔️", "reason": "look 是連綴動詞，補詞應為形容詞 tired。" }
                        ],
                        "checklist": [
                            "我牢記五大連綴動詞後面必接形容詞",
                            "我知道連綴動詞 + like 才能接名詞"
                        ]
                    }
                ]
            }
        ]
    }

def get_g9():
    return {
        "gradeId": "g9",
        "title": "國中九年級 (Grade 9 / 會考衝刺)",
        "stage": "第四學習階段 (國中九年級與教育會考)",
        "badge": "108 課綱會考滿分高分區 · 九年級決戰樞紐",
        "desc": "現在完成式、被動語態、關係代名詞子句、授予動詞、使役動詞、附加問句、名詞子句與間接問句、素養多模態閱讀策略與會考歷屆真題剖析。",
        "semesters": [
            {
                "semId": "g9-s1",
                "title": "九年級上學期 (9上)",
                "examFocus": "第一次段考 (現在完成式與被動語態)、第二次段考 (使役動詞與授予動詞)、第三次段考 (關係代名詞子句與介系詞)",
                "units": [
                    {
                        "id": "g9-s1-u1",
                        "unitNo": "JH-Unit 11",
                        "title": "完成式、被動與關係子句 (Present Perfect, Passive Voice, Rel Clauses)",
                        "indicator": "JH: english-5 / Ac-IV-11",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-5",
                        "motivation": "現在完成式 (have/has + pp) 與被動語態 (be + pp) 是九年級三大高分文法重鎮，佔會考選擇題 35% 考點！",
                        "concepts": [
                            {
                                "title": "現在完成式指標詞：since vs for",
                                "formula": "have/has + p.p. + since + 過去時間點 (since 2020) / have/has + p.p. + for + 一段時間 (for three years)",
                                "explanation": "since 接時間起點 (since yesterday, since he arrived)；for 接一段時間長度 (for 10 years)。",
                                "example": "I have lived in Kaohsiung since 2018. (= for eight years)"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "accomplishment", "ipa": "/əˈkɑːmplɪʃmənt/", "pos": "n.", "zh": "成就；達成", "sentence": "Finishing the marathon is a major accomplishment." }
                        ],
                        "dialogue": [
                            { "speaker": "Leo", "en": "Have you ever visited Taroko Gorge?", "zh": "你曾經去過太魯閣峽谷嗎？" },
                            { "speaker": "Amy", "en": "Yes, I have been there twice! It is breathtaking.", "zh": "有啊，我去過兩次！美得令人屏息。" }
                        ],
                        "reading": {
                            "title": "Thirty Years of Conservation (三十年保育之路)",
                            "strategy": "完成式時間跨度分析：確認行動從過去起點持續到當下。",
                            "text": "For the past thirty years, the Formosan Black Bear Conservation Association has worked tirelessly to protect indigenous wildlife. Since its establishment in the 1990s, the sanctuary has rescued over fifty injured bears. Many habitats have been restored by dedicated volunteers.",
                            "questions": [
                                { "q": "How many bears has the sanctuary rescued since the 1990s?", "ans": "Over fifty injured bears." }
                            ]
                        },
                        "step0Clue": "看到 since 或 for + 一段時間，動詞形式 99% 是現在完成式 have/has + p.p.！",
                        "formativeQuiz": [
                            {
                                "q": "Mr. Lin ________ in this middle school since he moved to Hualien five years ago.",
                                "options": ["taught", "has taught", "is teaching", "teaches"],
                                "ans": 1,
                                "hint1": "看到 since he moved (從他五年前搬來起)。",
                                "hint2": "since 引導過去時間點，主句必用現在完成式 have/has + p.p.。",
                                "solution": "since 引導起點，主要子句用 has taught。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "I have lived here since 5 years. ❌", "correct": "I have lived here for 5 years. ✔️", "reason": "5 years 是時間段，必須搭配 for，不可用 since。" }
                        ],
                        "checklist": [
                            "我能精確分清 since 搭時間點與 for 搭時間段",
                            "我熟記常考動詞過去分詞 p.p. 形式"
                        ]
                    },
                    {
                        "id": "g9-s1-u2",
                        "unitNo": "JH-Unit 12",
                        "title": "授予動詞、使役動詞與完成式進階 (Dative & Causative Verbs)",
                        "indicator": "JH: english-11 / Ac-IV-12",
                        "competency": "B1 符號溝通",
                        "sourceRef": "jh:english-11",
                        "motivation": "make, have, let 後面受詞補詞接原形動詞！使役動詞與授予動詞是會考改錯與選擇題年年必考的黃金指標題。",
                        "concepts": [
                            {
                                "title": "三大使役動詞接原形動詞法則",
                                "formula": "make (強迫) / have (要求) / let (允許) + 受詞 + 原形動詞",
                                "explanation": "使役動詞後方的受詞補詞「絕對不能加 to」，一律接原形動詞！但在被動語態時需還原 to (He was made to clean...)。",
                                "example": "The coach made the players run ten laps around the field."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "causative", "ipa": "/ˈkɔːzətɪv/", "pos": "adj.", "zh": "使役的", "sentence": "Make and let are common causative verbs." }
                        ],
                        "dialogue": [
                            { "speaker": "Mom", "en": "Did you let your little brother use your tablet?", "zh": "你讓你弟弟用你的平板電腦了嗎？" },
                            { "speaker": "Leo", "en": "Yes, I let him watch an educational cartoon for twenty minutes.", "zh": "有的，我讓他看二十分鐘的教育卡通。" }
                        ],
                        "reading": {
                            "title": "A Day in the Space Simulator (太空模擬器的一天)",
                            "strategy": "使役結構抓取：找出指令由誰發出並要求他人執行何種動作。",
                            "text": "During astronaut training, instructors make recruits practice emergency drills repeatedly. They do not let anyone skip safety procedures. The simulator makes gravity vanish, allowing astronauts to float freely in the air.",
                            "questions": [
                                { "q": "What do instructors make recruits do repeatedly?", "ans": "Practice emergency drills." }
                            ]
                        },
                        "step0Clue": "看到 make / have / let 接人，受詞補詞找「原形動詞」！看到 get 接人，後面找「to V」！",
                        "formativeQuiz": [
                            {
                                "q": "The strict teacher made all students ________ their mobile phones during class.",
                                "options": ["to turn off", "turn off", "turning off", "turned off"],
                                "ans": 1,
                                "hint1": "主要動詞是使役動詞 made。",
                                "hint2": "make + 人 + 原形動詞。",
                                "solution": "使役動詞 make 接原形動詞 turn off。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He made me to clean the room. ❌", "correct": "He made me clean the room. ✔️", "reason": "使役動詞 make 後面直接接原形動詞 clean，嚴禁加 to。" }
                        ],
                        "checklist": [
                            "我牢記 make, have, let 後面接原形動詞",
                            "我知道 get 接人時要搭配 to V"
                        ]
                    },
                    {
                        "id": "g9-s1-u3",
                        "unitNo": "JH-Unit 13",
                        "title": "關係代名詞受格省略與介系詞搭配 (Rel Pronoun Omission & Prepositions)",
                        "indicator": "JH: english-15 / Ac-IV-13",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-15",
                        "motivation": "The girl (who) I saw yesterday is my classmate. 關係代名詞什麼時候可以省略？介系詞何時能提前？搞懂這套規則，長句結構一覽無遺。",
                        "concepts": [
                            {
                                "title": "關係代名詞主格 vs 受格省略辨別法",
                                "formula": "關代後接「主詞+動詞」➔ 關代為受格，可直接省略！關代後緊接「動詞」➔ 關代為主格，絕對不可省略！",
                                "explanation": "The book (which) you bought is good. vs The man who lives next door is a doctor.",
                                "example": "The song (that) she sang touched everyone's heart."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "antecedent", "ipa": "/ˌæntɪˈsiːdnt/", "pos": "n.", "zh": "先行詞", "sentence": "The relative pronoun modifies its antecedent." }
                        ],
                        "dialogue": [
                            { "speaker": "Leo", "en": "Is this the novel you recommended to me last week?", "zh": "這就是你上週推薦給我的小說嗎？" },
                            { "speaker": "Amy", "en": "Yes! The novel (which) I recommended is on the bestseller list.", "zh": "對啊！我推薦的那本小說上了暢銷排行榜。" }
                        ],
                        "reading": {
                            "title": "The Mentor Who Changed My Life (改變我一生的導師)",
                            "strategy": "關係子句修飾拆解：找出先行詞與關代子句補充之資訊。",
                            "text": "Everyone remembers a mentor who inspired their curiosity. For me, that person was Mr. Chang, the physics teacher whose passion for the cosmos was infectious. The telescope he lent me opened up a universe of wonders. Today, the dreams he nurtured continue to guide my scientific journey.",
                            "questions": [
                                { "q": "What did Mr. Chang lend to the author?", "ans": "A telescope." }
                            ]
                        },
                        "step0Clue": "判定關代能否省略：看空格後面如果緊跟著另一個主詞與動詞 (S+V)，代表是受格，可以省略！",
                        "formativeQuiz": [
                            {
                                "q": "The scientist ________ discovered the new galaxy won an international award.",
                                "options": ["who", "which", "whose", "what"],
                                "ans": 0,
                                "hint1": "先行詞是 The scientist (人)。",
                                "hint2": "空格後面緊接動詞 discovered，需要主格關係代名詞 who。",
                                "solution": "修飾人且當子句主格，選 who。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "The girl speaks English well is my sister. ❌", "correct": "The girl who speaks English well is my sister. ✔️", "reason": "關代當主格絕對不可省略，否則全句會出現兩個主要動詞。" }
                        ],
                        "checklist": [
                            "我能辨別關代主格與受格的差異",
                            "我知道關代當受格時可以直接省略"
                        ]
                    }
                ]
            },
            {
                "semId": "g9-s2",
                "title": "九年級下學期 (9下 / 會考總衝刺)",
                "examFocus": "第一次段考 (附加問句與名詞子句)、會考模擬考 (109-115 歷屆聽力與閱讀)、非選題作答規範與素養克漏字",
                "units": [
                    {
                        "id": "g9-s2-u4",
                        "unitNo": "JH-Unit 14",
                        "title": "附加問句、名詞子句與間接問句 (Tag Questions & Indirect Questions)",
                        "indicator": "JH: english-12 / Ac-IV-14",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-12",
                        "motivation": "Do you know where the station is? 間接問句與附加問句在日常溝通中代表禮貌與求證，會考每兩年必考一次直述句語序辨析！",
                        "concepts": [
                            {
                                "title": "間接問句直述語序萬能公式",
                                "formula": "疑問詞 + 主詞 + 動詞 (Wh- + S + V)",
                                "explanation": "間接問句嵌入主句後，不再用倒裝問句語序，必須恢復為直述句語序！",
                                "example": "Can you tell me what time the train departs (不是 does the train depart ❌)?"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "indirect", "ipa": "/ˌɪndəˈrekt/", "pos": "adj.", "zh": "間接的", "sentence": "An indirect question sounds polite and respectful." }
                        ],
                        "dialogue": [
                            { "speaker": "Tourist", "en": "Excuse me, do you know when the museum closes?", "zh": "不好意思，您知道博物館幾點閉館嗎？" },
                            { "speaker": "Clerk", "en": "Yes, it closes at 5:00 p.m. today.", "zh": "知道的，今天下午五點整閉館。" }
                        ],
                        "reading": {
                            "title": "Customer Service Etiquette (客服禮儀問答)",
                            "strategy": "禮貌間接句型辨析：識別委婉詢問與直率問句的差異。",
                            "text": "In professional communication, polite language creates trust. Instead of asking bluntly, 'Where is the manager?', professional clients prefer, 'Could you please inform me where the manager is?' Indirect questions show respect and consideration.",
                            "questions": [
                                { "q": "Why do professionals use indirect questions?", "ans": "Because they show respect and consideration." }
                            ]
                        },
                        "step0Clue": "看到 Do you know / Can you tell me，後面的間接問句必是「疑問詞 + 主詞 + 動詞」，立刻把 does/did 去掉！",
                        "formativeQuiz": [
                            {
                                "q": "Nobody knows where ________ last night.",
                                "options": ["did he go", "he went", "does he go", "he goes"],
                                "ans": 1,
                                "hint1": "where 引導間接問句名詞子句。",
                                "hint2": "語序必須是「主詞 + 動詞」，且時間是 last night 過去式。",
                                "solution": "間接問句語序為 where he went。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Do you know where does he live? ❌", "correct": "Do you know where he lives? ✔️", "reason": "間接問句內部必須恢復直述句語序，不可保留助動詞 does。" }
                        ],
                        "checklist": [
                            "我牢記間接問句語序必定為「疑問詞 + 主詞 + 動詞」",
                            "我能熟練寫出前肯後否、前否後肯的附加問句"
                        ]
                    },
                    {
                        "id": "g9-s2-u5",
                        "unitNo": "JH-Unit 15",
                        "title": "閱讀策略、情境溝通與指代推論 (Reading Strategies & Contextual Inference)",
                        "indicator": "JH: english-6 / Ac-IV-15",
                        "competency": "B1 符號溝通、A2 系統思考",
                        "sourceRef": "jh:english-6",
                        "motivation": "會考閱讀長篇化、圖表化！作者在文章中未明說的弦外之音，該如何從蛛絲馬跡中合理推論？",
                        "concepts": [
                            {
                                "title": "代名詞指代與推論三大鐵證",
                                "formula": "指代就近原則 + 文本客觀證據支持 + 排除過度推論",
                                "explanation": "遇到 What does 'it' refer to? 先看前一句話的主詞或受詞，確認性別與單複數。",
                                "example": "The solar panel was broken. Replacing IT took three technicians a full day."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "inference", "ipa": "/ˈɪnfərəns/", "pos": "n.", "zh": "推論；結論", "sentence": "Make a reasonable inference based on textual evidence." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Teacher, the answer isn't directly in the text! How can I solve this?", "zh": "老師，答案文章裡沒有直接寫出來耶！這要怎麼解？" },
                            { "speaker": "Teacher", "en": "Look for clues! What does the author's tone imply?", "zh": "找線索！作者的語氣暗示了什麼？" }
                        ],
                        "reading": {
                            "title": "Notice: Heritage Library Renovation (圖書館整修公告)",
                            "strategy": "公告小字陷阱排除：仔細比對營業時間、條件例外與限制條款。",
                            "text": "Notice: The Heritage Library will undergo acoustic ceiling renovations from March 1st to March 15th. During this period, the third-floor study rooms will be closed. However, the first-floor book borrowing desk and online reservation services will remain fully functional from 9:00 a.m. to 5:00 p.m. daily. Fines for overdue books due during the closure will be waived automatically.",
                            "questions": [
                                { "q": "Which service remains available during renovation?", "ans": "The first-floor book borrowing desk and online reservation." }
                            ]
                        },
                        "step0Clue": "推論題切忌腦補！每一個選項都必須能在原文中圈出至少「一句話」作為直接證據支持！",
                        "formativeQuiz": [
                            {
                                "q": "According to the notice, what will happen to overdue book fines during renovation?",
                                "options": ["They will be doubled.", "They will be waived automatically.", "They must be paid online.", "They will be cancelled permanently."],
                                "ans": 1,
                                "hint1": "在文章末句尋找 fines 關鍵字。",
                                "hint2": "原文末句寫道 will be waived automatically (自動免除)。",
                                "solution": "依原文末句，逾期罰款自動免除。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "憑自己的常識猜測答案，沒有在原文找證據。 ❌", "correct": "每一道題目都在原文圈出對應的證據句。 ✔️", "reason": "會考評量文本依據，未依據文章者必為誘答陷阱。" }
                        ],
                        "checklist": [
                            "我能找到代名詞 it, they, this 在前文的明確指代對象",
                            "做推論題時，我必定在原文圈出至少一句支撐證據"
                        ]
                    },
                    {
                        "id": "g9-s2-u6",
                        "unitNo": "JH-Unit 16",
                        "title": "跨文本圖表閱讀與素養克漏字 (Multimodal Texts & Cloze Mastery)",
                        "indicator": "JH: english-16 / Ac-IV-16",
                        "competency": "A2 系統思考、B1 符號溝通、C3 國際理解",
                        "sourceRef": "jh:english-16",
                        "motivation": "會考壓軸題：一張火車班表 + 一封確認電子郵件 + 一則氣象預報！跨文本互證能力是拿到 A++ 滿分的最關鍵試金石。",
                        "concepts": [
                            {
                                "title": "跨文本多模態資訊交叉比對法",
                                "formula": "文本一 (時間限制) + 文本二 (預算或條件) ➔ 交集出唯一正確選項",
                                "explanation": "克漏字注意篇章轉折詞 (However, Therefore, On the other hand, As a result)。",
                                "example": "The train leaves at 8:15, but ticket prices double after 8:00."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "multimodal", "ipa": "/ˌmʌltiˈmoʊdl/", "pos": "adj.", "zh": "多模態的", "sentence": "Multimodal texts combine graphs, maps, and written passages." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Which train should we take to arrive before the conference starts?", "zh": "我們要搭哪一班火車才能在研討會開始前抵達？" },
                            { "speaker": "Peer", "en": "Check the schedule! Train 105 arrives at 9:10, which fits our plan.", "zh": "看時刻表！105 號列車 9:10 抵達，符合我們的行程。" }
                        ],
                        "reading": {
                            "title": "Intercity High-Speed Ferry Schedule (跨島高速渡輪時刻表)",
                            "strategy": "雙文本交叉驗證：將電子郵件要求與班表時刻交叉比對。",
                            "text": "Email from Captain Lee: 'Passengers traveling to Orchid Island must check in at Harbor Terminal 30 minutes before departure. Due to afternoon squalls, all sailings after 2:00 p.m. are cancelled. Morning sailings depart at 7:30 a.m., 9:30 a.m., and 11:30 a.m.'",
                            "questions": [
                                { "q": "What is the latest ferry departure available?", "ans": "11:30 a.m." }
                            ]
                        },
                        "step0Clue": "做多文本題時，將兩份文本共同出現的「時間、日期、金額、地點」畫線連連看，答案就在交集處！",
                        "formativeQuiz": [
                            {
                                "q": "If a passenger wants to take the 9:30 a.m. ferry, what time MUST they check in by?",
                                "options": ["9:00 a.m.", "9:15 a.m.", "9:30 a.m.", "10:00 a.m."],
                                "ans": 0,
                                "hint1": "規定要求在開航前 30 分鐘報到。",
                                "hint2": "9:30 往前推算 30 分鐘為 9:00。",
                                "solution": "9:30 扣除 30 分鐘為 9:00 a.m.。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "只看第一篇文本就急著下定論選答案。 ❌", "correct": "同時檢查第二篇文本是否有取消、特價或時間變更限制。 ✔️", "reason": "會考多文本題目常在第二篇文本中設置限制或取消條款。" }
                        ],
                        "checklist": [
                            "我能同時整合時刻表、地圖與電子郵件資訊",
                            "我能精確解讀 However, Therefore, As a result 的篇章轉折"
                        ]
                    }
                ]
            }
        ]
    }
'''

with open("scripts/full_curriculum_data.py", "a", encoding="utf-8") as f:
    f.write(g8_g9_code)

print("Appended G8 and G9 successfully.")
