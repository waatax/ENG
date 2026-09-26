"""
append_g10_g11_g12.py
Appends G10, G11, G12 and get_unified_grades() to full_curriculum_data.py
Fully compliant with 108 Curriculum, 7-Member Expert Council framework, and doubled content.
"""

import sys
sys.stdout.reconfigure(encoding='utf-8')

g10_g11_g12_code = r'''
def get_g10():
    return {
        "gradeId": "g10",
        "title": "高中一年級 (Grade 10)",
        "stage": "第五學習階段 (高中一年級 108 課綱普通高中 / 技術型高中核心)",
        "badge": "108 課綱高中核心 · 五大句型與從屬子句全通",
        "desc": "高一關鍵轉折：由國中基礎過渡到高中 4500 核心字彙。徹底通透五大基本句型、動名詞/不定詞語義差異、名詞子句/間接問句、形容詞子句/關係代名詞、副詞子句與邏輯銜接、情態助動詞推論、學測多文本與圖表混合題題型解析。",
        "semesters": [
            {
                "semId": "g10-s1",
                "title": "高一上學期 (10上)",
                "examFocus": "第一次段考 (五大句型、動名詞不定詞)、第二次段考 (被動語態進階、名詞子句)、第三次段考 (形容詞子句、副詞子句)",
                "units": [
                    {
                        "id": "g10-s1-u1",
                        "unitNo": "SH-Unit 1",
                        "title": "五大基本句型與動詞分類 (Five Basic Sentence Patterns & Verb Classification)",
                        "indicator": "SH: Ac-V-1 基本句構與擴展句型",
                        "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
                        "sourceRef": "arch:sentence_pillars",
                        "motivation": "所有複雜的高中長難句，本質上都是五大句型的延伸與擴充。掌握動詞的及物 (transitive) 與不及物 (intransitive) 特性，就能一眼看穿長句的主幹核心。",
                        "concepts": [
                            {
                                "title": "五大句型結構矩陣 (The Five Sentence Structures)",
                                "formula": "S+Vi | S+V+SC | S+Vt+O | S+Vt+IO+DO | S+Vt+O+OC",
                                "explanation": "1. 完全不及物 (S+V): Birds fly. 2. 不完全不及物 (S+V+SC): She looks happy. 3. 完全及物 (S+V+O): We love music. 4. 授與動詞 (S+V+IO+DO): He gave me a pen. 5. 不完全及物 (S+V+O+OC): They made him captain.",
                                "example": "The committee found the proposed technological solution highly viable."
                            },
                            {
                                "title": "補語 (Complement) 的本質：形容詞 vs. 副詞",
                                "formula": "S + make/find/keep + O + Adj (OC) [不可用副詞]",
                                "explanation": "受詞補語用來補充說明受詞的性質或狀態，必須是形容詞或名詞，絕不可受中文翻譯影響而誤用副詞。",
                                "example": "The warm tea kept the weary hikers awake (not: *wearily awake)."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "complement", "ipa": "/ˈkɑːmplɪmənt/", "pos": "n.", "zh": "補語；補充物", "sentence": "In this sentence, the adjective acts as an object complement." },
                            { "word": "transitive", "ipa": "/ˈtrænsətɪv/", "pos": "adj.", "zh": "及物的", "sentence": "Transitive verbs must take a direct object to complete their meaning." },
                            { "word": "viable", "ipa": "/ˈvaɪəbl/", "pos": "adj.", "zh": "切實可行的", "sentence": "Scientists consider solar-powered desalination a viable alternative." }
                        ],
                        "dialogue": [
                            { "speaker": "Tutor", "en": "Look at this sentence: 'The news made everyone sad.' What role does 'sad' play?", "zh": "看這句話：'The news made everyone sad.' 'sad' 扮演什麼角色？" },
                            { "speaker": "Student", "en": "It describes the state of 'everyone', so it is an object complement!", "zh": "它描述受詞 'everyone' 的狀態，所以是受詞補語！" }
                        ],
                        "reading": {
                            "title": "Deciphering Complex Sentences in Academic Texts (學術英文長難句拆解法)",
                            "strategy": "骨架還原法：先圈出主動詞，劃掉介系詞片語與修飾語，還原五大基本句型。",
                            "text": "In contemporary neuroscience, researchers, despite numerous methodological obstacles, consider the human brain an extraordinary computational mechanism. Although sensory inputs constantly flood the cortex, specialized neural circuits keep consciousness remarkably stable. Understanding these fundamental mechanisms enables cognitive scientists to develop revolutionary therapeutic interventions.",
                            "questions": [
                                { "q": "What is the sentence pattern of 'researchers consider the human brain an extraordinary mechanism'?", "ans": "S + V + O + OC (Pattern 5)" }
                            ]
                        },
                        "step0Clue": "分析長難句第一步：先找動詞！若動詞後面有受詞且該形容詞描述受詞狀態，則是 S+V+O+OC 句型！",
                        "formativeQuiz": [
                            {
                                "q": "The committee considers the newly formulated environmental policy ________ for urban resilience.",
                                "options": ["essential", "essentially", "essentialness", "to essentially"],
                                "ans": 0,
                                "hint1": "consider + O + OC，受詞補語需要形容詞。",
                                "hint2": "中文常翻成『認為...是必要的』，但英語補語不可填副詞 essentially。",
                                "solution": "consider + O + Adj.，形容詞 essential 作受詞補語。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "The teacher made the classroom quietly. ❌", "correct": "The teacher made the classroom quiet. ✔️", "reason": "make + O + Adj.，classroom 的狀態是安靜的，補語應用形容詞 quiet，而非副詞 quietly。" }
                        ],
                        "checklist": [
                            "我能準確辨識五大基本句型的核心動詞與成分",
                            "我能在 S+V+O+OC 句型中正確使用形容詞受詞補語"
                        ]
                    },
                    {
                        "id": "g10-s1-u2",
                        "unitNo": "SH-Unit 2",
                        "title": "動名詞與不定詞深度語義對決 (Gerunds vs. Infinitives: Semantic Nuances)",
                        "indicator": "SH: Ac-V-2 非限定動詞之形式與功能",
                        "competency": "A1 身心素質與自我精進、B1 符號運用與溝通表達",
                        "sourceRef": "arch:s1_review",
                        "motivation": "非限定動詞 (Verbals) 是高中大考綜合測驗必考核心。動名詞 (V-ing) 帶有「已發生、習慣、回憶、經驗」之色彩；不定詞 (to V) 則指向「未發生、目標、企圖、未來」，掌握兩者時間箭頭方向即可秒殺試題。",
                        "concepts": [
                            {
                                "title": "雙向動詞的時間箭頭 (Temporal Distinction of Dual Verbs)",
                                "formula": "V + to V (指向未來未做) vs. V + V-ing (指向過去已做/正在做)",
                                "explanation": "remember / forget / regret + to V = 記得/忘記/遺憾去執行 (尚未發生)；remember / forget / regret + V-ing = 記得/忘記/後悔做過某事 (已發生)。",
                                "example": "Remember to lock the laboratory door tonight. vs. I distinctly remember locking it before leaving."
                            },
                            {
                                "title": "特殊介系詞 to 後接動名詞 (Prepositional 'to' + V-ing)",
                                "formula": "look forward to / be used to / devote oneself to / object to + V-ing",
                                "explanation": "此處的 to 為介系詞而非不定詞標記，後方必須接動名詞或名詞。",
                                "example": "The scientist devoted his entire life to finding a cure for leukemia."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "devote", "ipa": "/dɪˈvoʊt/", "pos": "v.", "zh": "奉獻；致力於", "sentence": "She decided to devote her career to marine conservation." },
                            { "word": "regret", "ipa": "/rɪˈɡret/", "pos": "v./n.", "zh": "遺憾；後悔", "sentence": "He regretted not taking the advanced mathematics course." },
                            { "word": "nuance", "ipa": "/ˈnuːɑːns/", "pos": "n.", "zh": "細微差別", "sentence": "Advanced learners must grasp the subtle nuances between near-synonyms." }
                        ],
                        "dialogue": [
                            { "speaker": "Alex", "en": "Did you remember to email the experiment report to Professor Chen?", "zh": "你有記得寄實驗報告給陳教授嗎？" },
                            { "speaker": "Brenda", "en": "Yes, I remember sending it at 8:00 a.m. sharp.", "zh": "有的，我清楚記得今天早上準時八點寄出的。" }
                        ],
                        "reading": {
                            "title": "The Psychology of Habit Formation (習慣建立的心理學機制)",
                            "strategy": "非限定動詞辨識：圈出文章中的 to V 與 V-ing，判斷是表目的還是表既定習慣。",
                            "text": "Psychologists distinguish between striving to achieve goals and maintaining daily routines. When people attempt to establish a new habit, they often struggle with procrastination. Experts suggest breaking monumental challenges into micro-tasks. Instead of planning to run ten miles every weekend, committed individuals begin by walking fifteen minutes daily. After becoming accustomed to exercising regularly, the subconscious mind effortlessly perpetuates the cycle without cognitive strain.",
                            "questions": [
                                { "q": "Why does 'accustomed to' take 'exercising' instead of 'exercise'?", "ans": "Because 'to' in 'be accustomed to' is a preposition requiring a gerund." }
                            ]
                        },
                        "step0Clue": "看到 to 時先問自己：這個 to 是介系詞 (表對象、方向、致志) 還是不定詞？be used to / look forward to 的 to 是介系詞，後面必須放 V-ing！",
                        "formativeQuiz": [
                            {
                                "q": "All the members of the expedition are looking forward to ________ the summit at sunrise.",
                                "options": ["reach", "reaching", "reached", "have reached"],
                                "ans": 1,
                                "hint1": "look forward to 中的 to 是介系詞。",
                                "hint2": "介系詞後面接名詞或動名詞 V-ing。",
                                "solution": "look forward to + V-ing 為固定介系詞搭配，表示期待。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "I look forward to hear from you soon. ❌", "correct": "I look forward to hearing from you soon. ✔️", "reason": "look forward to 的 to 是介系詞，後面動詞必須使用動名詞 hearing。" }
                        ],
                        "checklist": [
                            "我能清楚區分 remember/forget/regret 接 to V 與 V-ing 的時間與語義差異",
                            "我能熟練列舉 5 個接動名詞的介系詞 to 片語 (如 look forward to, object to 等)"
                        ]
                    },
                    {
                        "id": "g10-s1-u3",
                        "unitNo": "SH-Unit 3",
                        "title": "被動語態進階矩陣與無靈主詞 (Advanced Passives & Impersonal 'It')",
                        "indicator": "SH: Ac-V-3 語態之時態變化與客觀論述",
                        "competency": "A2 系統思考、B1 符號溝通、C2 人際關係與團隊合作",
                        "sourceRef": "arch:s1_review",
                        "motivation": "高中學術英語與科普閱讀中，超過 35% 的動詞使用被動語態以營造客觀、科學的論述風格。本單元掌握無靈主詞與客觀報導被動句型 (It is believed that...)。",
                        "concepts": [
                            {
                                "title": "客觀報導句型雙重轉換 (Double Conversion of Impersonal Passives)",
                                "formula": "It is said/believed/reported that S + V  <=>  S + is said/believed/reported + to V / to have p.p.",
                                "explanation": "當報導動作與原動作同時代，後接 to V；若原動作先於報導時間，後接 to have p.p. (完成不定詞)。",
                                "example": "It is believed that the pyramids were built over two decades. <=> The pyramids are believed to have been built over two decades."
                            },
                            {
                                "title": "無靈主詞 (Inanimate Subject) 的主動結構",
                                "formula": "Inanimate Noun + drive / reveal / force / enable + O + to V",
                                "explanation": "英文偏好以無生命的抽象名詞 (如 research, urgency, technology) 當主詞，中文常需轉譯為條件或原因。",
                                "example": "A lack of sleep impairs cognitive function. (睡眠不足會損害認知功能)"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "impersonal", "ipa": "/ɪmˈpɜːrsənl/", "pos": "adj.", "zh": "客觀的；非指名個人的", "sentence": "Scientific papers are typically written in an impersonal style." },
                            { "word": "inanimate", "ipa": "/ɪnˈænɪmət/", "pos": "adj.", "zh": "無生命的", "sentence": "English frequently employs inanimate subjects in formal discourse." },
                            { "word": "impair", "ipa": "/ɪmˈper/", "pos": "v.", "zh": "損害；削弱", "sentence": "Chronic stress significantly impairs the immune response." }
                        ],
                        "dialogue": [
                            { "speaker": "Journalist", "en": "How should we report the newly uncovered archaeological findings?", "zh": "我們該如何報導新出土的考古發現？" },
                            { "speaker": "Editor", "en": "Write: 'The ancient artifact is believed to date back to the bronze age.'", "zh": "寫成：'這件古代文物被認為可追溯至青銅時代。'" }
                        ],
                        "reading": {
                            "title": "The Rediscovery of Forgotten Civilizations (失落文明的重新發掘)",
                            "strategy": "論述句型轉換：將主觀句子轉換為客觀報導被動句。",
                            "text": "For centuries, the ruined temple deep in the jungle remained shrouded in myth. Recently, LiDAR technology was deployed by archaeologists to scan beneath the canopy. Thousands of previously unknown structures were detected. The metropolis is now believed to have supported more than one hundred thousand inhabitants during its zenith, completely transforming our historical understanding of pre-Columbian urbanism.",
                            "questions": [
                                { "q": "Rewrite: 'It is now believed that the metropolis supported...' using 'The metropolis' as the subject.", "ans": "The metropolis is now believed to have supported more than one hundred thousand inhabitants." }
                            ]
                        },
                        "step0Clue": "在做句型轉換時，若被報導的事件比 is believed 發生得更早，不定詞必須使用完成式 to have p.p.！",
                        "formativeQuiz": [
                            {
                                "q": "The manuscript, discovered in the monastery archives, is believed ________ by a fourteenth-century monk.",
                                "options": ["to write", "to be written", "to have written", "to have been written"],
                                "ans": 3,
                                "hint1": "manuscript (手稿) 是被書寫的，需要被動語態。",
                                "hint2": "書寫動作發生在十四世紀，比現今的被認為 (is believed) 更早，需用完成被動不定詞 to have been p.p.。",
                                "solution": "手稿在過去被寫成，故選用完成被動不定詞 to have been written。故選 D。"
                            }
                        ],
                        "traps": [
                            { "wrong": "The ancient fortress is believed to build in the third century. ❌", "correct": "The ancient fortress is believed to have been built in the third century. ✔️", "reason": "堡壘是被建造的 (被動)，且發生在過去 (先發生)，需使用完成被動不定詞 to have been built。" }
                        ],
                        "checklist": [
                            "我能熟練進行 It is reported that 與 S + is reported to V 雙向句型互換",
                            "我能準確運用 to have been p.p. 表達先於主句時態的被動狀態"
                        ]
                    },
                    {
                        "id": "g10-s1-u4",
                        "unitNo": "SH-Unit 4",
                        "title": "名詞子句與間接問句 (Noun Clauses & Indirect Questions)",
                        "indicator": "SH: Ac-V-4 名詞子句與祈使假定法",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s2_review",
                        "motivation": "名詞子句在句子中可作主詞、受詞、補語、同位語。學測與大考作文中，高分文章經常運用 that 名詞子句引導深刻論點，以及間接問句展示得體禮貌的提問技巧。",
                        "concepts": [
                            {
                                "title": "間接問句平鋪直敘語序 (Declarative Word Order of Indirect Questions)",
                                "formula": "Wh- / Whether / If + Subject + Verb [不可倒裝，無助動詞 do/does/did]",
                                "explanation": "間接問句作為名詞子句嵌入主句時，語序必須恢復為「疑問詞 + 主詞 + 動詞」，不可保留直接問句的倒裝結構。",
                                "example": "Direct: Where did they go? -> Indirect: I wonder where they went."
                            },
                            {
                                "title": "堅決建意命要動詞後 that 子句 (Subjunctive with Verbs of Demand/Suggestion)",
                                "formula": "S + demand/insist/suggest/order/require + that + S + (should) + V-原形",
                                "explanation": "表示「命令、建議、要求、堅持」的動詞後面引導的 that 名詞子句，助動詞 should 常省略，動詞一律回歸原形動詞！",
                                "example": "The physician insisted that the patient (should) quit smoking immediately."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "clause", "ipa": "/klɔːz/", "pos": "n.", "zh": "子句", "sentence": "A noun clause functions identically to a noun in a sentence." },
                            { "word": "insist", "ipa": "/ɪnˈsɪst/", "pos": "v.", "zh": "堅持", "sentence": "The committee insisted that safety standards be strictly observed." },
                            { "word": "whether", "ipa": "/ˈweðər/", "pos": "conj.", "zh": "是否", "sentence": "Whether we succeed depends largely on team collaboration." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Excuse me, could you tell me what time does the library close?", "zh": "不好意思，您可以告訴我圖書館幾點關門嗎？" },
                            { "speaker": "Librarian", "en": "Remember the word order: 'Could you tell me what time the library closes?' We close at nine.", "zh": "記得語序：'Could you tell me what time the library closes?' 我們九點關門。" }
                        ],
                        "reading": {
                            "title": "Bioethical Dilemmas in Artificial Intelligence (人工智慧的生物倫理困境)",
                            "strategy": "子句功能識別：找出文中 that 引導的子句，判斷是受詞子句、同位語子句還是關係子句。",
                            "text": "Medical researchers strongly recommend that AI diagnostic algorithms be subjected to rigorous clinical validation. The fact that neural networks operate as black boxes raises ethical questions about accountability. Healthcare administrators must evaluate whether automated diagnosis truly improves patient outcomes or merely accelerates administrative procedures.",
                            "questions": [
                                { "q": "Why is the verb in 'AI diagnostic algorithms be subjected' in base form?", "ans": "Because 'recommend that' requires the subjunctive mood (should + base form)." }
                            ]
                        },
                        "step0Clue": "看到 suggest / recommend / demand / insist + that 子句時，立刻檢查動詞是否為原形動詞 (原形 be 或原形 V)！",
                        "formativeQuiz": [
                            {
                                "q": "The laboratory safety inspector demanded that all hazardous chemicals ________ in fireproof cabinets immediately.",
                                "options": ["stored", "are stored", "be stored", "must store"],
                                "ans": 2,
                                "hint1": "demand that 後方引導要求建議語氣。",
                                "hint2": "公式為 that + S + (should) + V-原形，化學品是被存放，因此為 (should) be stored。",
                                "solution": "demand that + S + (should) + 原形動詞，化學物品需被存放，故省略 should 後保留原形 be stored。故選 C。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He asked me where did I buy the textbook. ❌", "correct": "He asked me where I bought the textbook. ✔️", "reason": "間接問句為名詞子句，語序必須是「疑問詞 + 主詞 + 動詞」，不可保留助動詞 did 倒裝。" }
                        ],
                        "checklist": [
                            "我能在間接問句中正確使用平鋪直敘語序 (Wh- + S + V)",
                            "我能辨識並運用 6 個堅決建意命要動詞後 that 子句省略 should 的原形動詞考點"
                        ]
                    },
                    {
                        "id": "g10-s1-u5",
                        "unitNo": "SH-Unit 5",
                        "title": "形容詞子句與關係代名詞基礎 (Adjective Clauses & Relative Pronouns)",
                        "indicator": "SH: Ac-V-5 關係子句之修飾與省略",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s2_review",
                        "motivation": "形容詞子句是英語提升資訊密度的核心引擎。學測閱讀與克漏字中，掌握先行詞 (antecedent) 與關係代名詞 (who, whom, which, that, whose) 的對應，以及「介系詞 + 關係代名詞」結構是衝刺頂標的基石。",
                        "concepts": [
                            {
                                "title": "關係代名詞格位判定原則 (Case Selection for Relative Pronouns)",
                                "formula": "先行詞(人) + who(主格) / whom(受格) / whose(所有格) ; 先行詞(物) + which(主/受格) / whose(所有格)",
                                "explanation": "先行詞在子句中作主詞用 who/which；作動詞或介系詞之受詞用 whom/which/that；作名詞所有格用 whose (+ 無冠詞名詞)。",
                                "example": "The researcher whose paper was cited over a thousand times received the Nobel Prize."
                            },
                            {
                                "title": "介系詞提前與關係代名詞 (Preposition + Relative Pronoun)",
                                "formula": "Prep + whom / Prep + which [絕不可用 that 或 who！]",
                                "explanation": "當關係子句中動詞搭配的介系詞移至關係代名詞前方時，先行詞為人用 whom，先行詞為物用 which。介系詞後方絕對禁用 that！",
                                "example": "This is the ecological sanctuary in which hundreds of migratory birds nest (not: *in that)."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "antecedent", "ipa": "/ˌæntɪˈsiːdnt/", "pos": "n.", "zh": "先行詞；前情", "sentence": "Identify the antecedent before choosing the appropriate relative pronoun." },
                            { "word": "sanctuary", "ipa": "/ˈsæŋktʃueri/", "pos": "n.", "zh": "庇護所；自然保護區", "sentence": "The wetland serves as a sanctuary for endangered waterfowl." },
                            { "word": "invariable", "ipa": "/ɪnˈveriəbl/", "pos": "adj.", "zh": "不變的；恆定的", "sentence": "The speed of light in a vacuum is an invariable constant." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Can I say 'the university in that I study'?", "zh": "我可以說 'the university in that I study' 嗎？" },
                            { "speaker": "Teacher", "en": "Never put 'that' right after a preposition! You must say 'the university in which I study' or 'where I study'.", "zh": "絕對不能把 'that' 放在介系詞正後方！你必須說 'in which I study' 或 'where I study'。" }
                        ],
                        "reading": {
                            "title": "Jane Goodall and the Chimpanzees of Gombe (珍古德與岡貝黑猩猩研究)",
                            "strategy": "關係子句定位：畫出先行詞與關係子句，辨識修飾關係與介系詞來源。",
                            "text": "In 1960, Jane Goodall arrived at Gombe Stream National Park in Tanzania, an environment about which the scientific world knew very little. She observed primates whose intricate social hierarchies amazed ethologists. The breakthrough discovery that chimpanzees make and use tools, an ability with which humans previously credited only themselves, fundamentally revolutionized anthropology.",
                            "questions": [
                                { "q": "Why is 'which' used in 'an environment about which' instead of 'that'?", "ans": "Because 'that' cannot follow a preposition directly in a relative clause." }
                            ]
                        },
                        "step0Clue": "看到介系詞後面空一格填關係代名詞時，先排除 that 和 who！先行詞是人選 whom，先行詞是物選 which！",
                        "formativeQuiz": [
                            {
                                "q": "The symposium provided an inspiring platform on ________ leading climatologists discussed renewable strategies.",
                                "options": ["that", "which", "what", "where"],
                                "ans": 1,
                                "hint1": "空格前有介系詞 on。",
                                "hint2": "介系詞後面不可放 that，platform 為物，應用 which。",
                                "solution": "介系詞 on 後接指稱物的關係代名詞 which (on which = where)。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "The platform on that we met was crowded. ❌", "correct": "The platform on which we met was crowded. ✔️", "reason": "介系詞後絕不可使用關係代名詞 that，指物時必須用 which。" }
                        ],
                        "checklist": [
                            "我能準確判斷關係代名詞主格、受格、所有格 (whose)",
                            "我能熟練掌握「介系詞 + whom / which」之大考必考規則"
                        ]
                    },
                    {
                        "id": "g10-s1-u6",
                        "unitNo": "SH-Unit 6",
                        "title": "副詞子句與邏輯因果轉折 (Adverb Clauses: Cause, Condition, Concession)",
                        "indicator": "SH: Ac-V-6 副詞子句與篇章銜接詞",
                        "competency": "A2 系統思考、B1 符號溝通、C3 多元文化與國際理解",
                        "sourceRef": "arch:s2_review",
                        "motivation": "副詞子句如同文章的導航路標。掌握表時間 (as soon as, while)、因果 (since, because)、條件 (as long as, provided that)、讓步 (although, even though) 的連接詞，是寫作時避免串句 (run-on sentences) 的關鍵。",
                        "concepts": [
                            {
                                "title": "條件與時間副詞子句時態陷阱 (Present Tense for Future in Adverbial Clauses)",
                                "formula": "If / When / As soon as / Unless + S + V-現在式, S + will + V-原形",
                                "explanation": "在表「時間」與「條件」的副詞子句中，一律使用「現在簡單式代替未來式」，主句則維持未來式 will + V。",
                                "example": "As soon as the experiment yields definitive results tomorrow, the team will submit the paper."
                            },
                            {
                                "title": "連接詞 (Conjunction) vs. 介系詞 (Preposition) vs. 轉折副詞 (Transition)",
                                "formula": "Although + S + V (從屬連接詞) vs. Despite + N/V-ing (介系詞) vs. However, S + V (轉折副詞)",
                                "explanation": "三者語意相近但句構截然不同：Although 接完整子句；Despite 接名詞片語；However 是副詞，後面須加逗號且不可連接兩子句。",
                                "example": "Although it rained heavily, they went hiking. <=> Despite the heavy rain, they went hiking. <=> It rained heavily; however, they went hiking."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "concession", "ipa": "/kənˈseʃn/", "pos": "n.", "zh": "讓步；妥協", "sentence": "In grammar, a clause of concession expresses an unexpected contrast." },
                            { "word": "provided", "ipa": "/prəˈvaɪdɪd/", "pos": "conj.", "zh": "只要；在...條件下", "sentence": "You may enter the laboratory provided that you wear protective goggles." },
                            { "word": "resilience", "ipa": "/rɪˈzɪliəns/", "pos": "n.", "zh": "韌性；適應力", "sentence": "Ecological resilience allows ecosystems to recover from natural disturbances." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Can I write 'Although he was exhausted, but he kept running'?", "zh": "我可以寫 'Although he was exhausted, but he kept running' 嗎？" },
                            { "speaker": "Teacher", "en": "No! In English, never use 'although' and 'but' together in one sentence. Choose only one.", "zh": "不行！英文中絕不能在同一句中同時使用 although 和 but。二擇一！" }
                        ],
                        "reading": {
                            "title": "Global Climate Adaptation Strategies (全球氣候調適策略論壇)",
                            "strategy": "邏輯連接詞圖解：圈出文章中的條件與讓步連接詞，理清各段論述關係。",
                            "text": "Although developing nations produce a relatively small fraction of historical greenhouse emissions, they frequently bear the brunt of extreme weather events. Provided that international climate funds fulfill their capital pledges, vulnerable coastal communities will implement mangrove restoration projects. Unless immediate decarbonization occurs, sea levels will rise significantly faster than projected.",
                            "questions": [
                                { "q": "What condition must be met for coastal communities to implement mangrove projects?", "ans": "International climate funds must fulfill their capital pledges." }
                            ]
                        },
                        "step0Clue": "在做文法改錯或克漏字時，看到空格後接的是名詞片語還是完整子句？完整子句選 Although/Because；名詞片語選 Despite/Because of！",
                        "formativeQuiz": [
                            {
                                "q": "________ experiencing severe turbulent weather during the transatlantic flight, the aircraft landed smoothly on schedule.",
                                "options": ["Although", "Despite", "Because", "Even though"],
                                "ans": 1,
                                "hint1": "空格後是 experiencing severe turbulent weather (動名詞片語，無獨立主詞與限定動詞)。",
                                "hint2": "Despite 是介系詞，後接名詞或動名詞片語；Although/Even though 後接完整子句。",
                                "solution": "後方為動名詞片語，且前後語意為讓步轉折，故選介系詞 Despite。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Although the budget was limited, but the team succeeded. ❌", "correct": "Although the budget was limited, the team succeeded. ✔️", "reason": "英文中 Although (從屬連接詞) 與 but (對等連接詞) 不可同時出現在同一個句子中。" }
                        ],
                        "checklist": [
                            "我能熟練區分 Although (連接詞)、Despite (介系詞) 與 However (副詞) 的語法結構",
                            "我能在時間與條件副詞子句中正確使用「現在式代替未來式」"
                        ]
                    }
                ]
            },
            {
                "semId": "g10-s2",
                "title": "高一下學期 (10下)",
                "examFocus": "第一次段考 (非限定關係子句、複合關係代名詞)、第二次段考 (篇章標記、學測圖表混合題)、第三次段考 (情態助動詞推論、高一全冊素養總結)",
                "units": [
                    {
                        "id": "g10-s2-u7",
                        "unitNo": "SH-Unit 7",
                        "title": "限定與非限定關係子句對比 (Restrictive vs. Non-Restrictive Relatives)",
                        "indicator": "SH: Ac-V-5 關係子句之修飾與非限定用法",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s2_review",
                        "motivation": "逗號在英文關係子句中具有生死攸關的語義區隔。限定用法縮小範圍；非限定用法 (加逗號) 提供額外補充說明。非限定關係子句絕對不能使用 that！",
                        "concepts": [
                            {
                                "title": "非限定子句修飾整句或先行詞 (Comma + which / who)",
                                "formula": "S + V + O, which + V (which 代替前面整個句子或先行詞)",
                                "explanation": "逗號後的 which 不僅可指代前面的名詞，更常指代前面整個句子所陳述的事實，此時動詞一律視為單數！",
                                "example": "The factory reduced greenhouse emissions by 40%, which surprised regulatory authorities."
                            },
                            {
                                "title": "限定 vs. 非限定的語意對比 (Semantic Distinction)",
                                "formula": "He has two sons who are doctors (可能有其他兒子) vs. He has two sons, who are doctors (總共只有兩個兒子)",
                                "explanation": "無逗號為限定修飾 (眾多中的一部分)；有逗號為補充說明 (等於全部)。",
                                "example": "Paris, which is the capital of France, attracts millions of tourists annually."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "restrictive", "ipa": "/rɪˈstrɪktɪv/", "pos": "adj.", "zh": "限定的；限制性的", "sentence": "Restrictive clauses define which specific item is being discussed." },
                            { "word": "regulatory", "ipa": "/ˈreɡjələtɔːri/", "pos": "adj.", "zh": "監管的；管理的", "sentence": "The drug must pass regulatory evaluation before clinical release." },
                            { "word": "zenith", "ipa": "/ˈziːnɪθ/", "pos": "n.", "zh": "頂點；鼎盛時期", "sentence": "The Roman Empire reached its political zenith in the second century." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Why can't I write 'My mother, that loves gardening, baked a pie'?", "zh": "為什麼我不能寫 'My mother, that loves gardening, baked a pie'？" },
                            { "speaker": "Teacher", "en": "In non-restrictive clauses with commas, you can never use 'that'! You must use 'who' for people.", "zh": "在有逗號的非限定子句中，絕不能用 'that'！指人必須用 'who'。" }
                        ],
                        "reading": {
                            "title": "The Miracle of Penicillin: Fleming's Serendipity (青黴素的奇蹟發現)",
                            "strategy": "逗號 which 功能辨析：判斷 which 是修飾前一名詞還是修飾前述整件事實。",
                            "text": "In 1928, Alexander Fleming left a petri dish uncovered before leaving for vacation. Upon returning, he noticed that mold had dissolved surrounding staphylococcus colonies, which astonished the Scottish bacteriologist. Fleming identified the mold as Penicillium notatum, which eventually saved millions of lives during World War II.",
                            "questions": [
                                { "q": "What does the first 'which' refer to in the passage?", "ans": "The entire preceding fact that mold had dissolved surrounding staphylococcus colonies." }
                            ]
                        },
                        "step0Clue": "看到先行詞後面有逗號 (,) 時，關係代名詞第一時間刪除 that！指人選 who/whom，指物或指前面整件事選 which！",
                        "formativeQuiz": [
                            {
                                "q": "The solar flare disrupted global satellite communications for two days, ________ caused widespread navigation errors.",
                                "options": ["that", "which", "what", "it"],
                                "ans": 1,
                                "hint1": "空格前有逗號 (,)。",
                                "hint2": "逗號後面引導子句補充說明整件事實，且不可使用 that。",
                                "solution": "逗號後引導非限定關係子句修飾整件事情，應用 which。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He won the gold medal, that made his parents proud. ❌", "correct": "He won the gold medal, which made his parents proud. ✔️", "reason": "逗號後的非限定關係子句代指前面整件事實，必須使用 which，絕對不可使用 that。" }
                        ],
                        "checklist": [
                            "我能清楚分辨有無逗號對關係子句語意的決定性影響",
                            "我能熟練運用「, which」代指前面整個事件並接單數動詞"
                        ]
                    },
                    {
                        "id": "g10-s2-u8",
                        "unitNo": "SH-Unit 8",
                        "title": "複合關係代名詞與準關係代名詞 (Compound & Quasi-Relatives)",
                        "indicator": "SH: Ac-V-5 進階關係詞與複合語法",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s2_review",
                        "motivation": "學測指考常考的高階關係代名詞：what (= the thing which)、whoever (= anyone who)、whichever，以及準關係代名詞 as, than, but。掌握本單元是長篇閱讀突破 80 分的關鍵鑰匙。",
                        "concepts": [
                            {
                                "title": "複合關係代名詞 what 的本質 (The Anatomy of 'What')",
                                "formula": "what + 缺主詞或受詞之不完整子句 = the thing(s) which / that",
                                "explanation": "what 本身兼具「先行詞 + 關係代名詞」雙重身分，因此前面絕對不可再有先行詞！",
                                "example": "What surprised everyone was her calm demeanor under pressure."
                            },
                            {
                                "title": "準關係代名詞 as 的常規句型 (Quasi-Relative 'As')",
                                "formula": "as is known to all / as was expected / such ... as ...",
                                "explanation": "as 可作準關係代名詞引導子句，常置於句首代指後面的整句話，意為「正如...所...」。",
                                "example": "As is widely acknowledged, physical exercise enhances mental health."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "demeanor", "ipa": "/dɪˈmiːnər/", "pos": "n.", "zh": "舉止；風度", "sentence": "Her professional demeanor inspired confidence among the investors." },
                            { "word": "acknowledge", "ipa": "/əkˈnɑːlɪdʒ/", "pos": "v.", "zh": "承認；公認", "sentence": "Scholars universally acknowledge the profound impact of the printing press." },
                            { "word": "indispensable", "ipa": "/ˌɪndɪˈspensəbl/", "pos": "adj.", "zh": "不可或缺的", "sentence": "Critical thinking is an indispensable skill in the era of disinformation." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Is it correct to say 'The thing what you need is patience'?", "zh": "說 'The thing what you need is patience' 正確嗎？" },
                            { "speaker": "Teacher", "en": "Incorrect! 'What' already contains 'the thing'. Say either 'What you need is patience' or 'The thing that you need is patience'.", "zh": "錯的！'What' 本身就包含 'the thing'。你只能說 'What you need is patience' 或 'The thing that you need is patience'。" }
                        ],
                        "reading": {
                            "title": "The Architecture of Trust in Online Transactions (網路交易的信任架構)",
                            "strategy": "複合關係詞拆解：將 what 還原為 the thing which，檢驗主受格完整性。",
                            "text": "What distinguishes secure cryptographic protocols from traditional authentication is mathematical verifiability. Whoever attempts to manipulate ledger entries encounters immediate cryptographic rejection. As has been proven in multiple security audits, decentralized consensus guarantees integrity without reliance on a single central entity.",
                            "questions": [
                                { "q": "What is the subject of the main clause in the first sentence?", "ans": "The noun clause 'What distinguishes secure cryptographic protocols from traditional authentication'." }
                            ]
                        },
                        "step0Clue": "看到空格後句子缺主詞或受詞，且空格前「完全沒有先行詞」時，優先考慮複合關係代名詞 what！",
                        "formativeQuiz": [
                            {
                                "q": "________ is needed right now is a comprehensive contingency plan to deal with supply chain disruptions.",
                                "options": ["That", "What", "Which", "It"],
                                "ans": 1,
                                "hint1": "空格引導整個主詞子句，且空格後缺主詞 is needed。",
                                "hint2": "空格前無先行詞，等於 The thing which is needed。",
                                "solution": "複合關係代名詞 What 引導名詞子句作主詞，自身代表 the thing which。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "I cannot understand the reason what made her quit. ❌", "correct": "I cannot understand the reason why/that made her quit. ✔️", "reason": "what 前面不可有先行詞 the reason；此處先行詞已存在，應用 why 或 which/that。" }
                        ],
                        "checklist": [
                            "我能準確區分 what (自帶先行詞) 與 that / which (前有先行詞) 的語法條件",
                            "我能掌握 as is expected 等準關係代名詞片語之用法"
                        ]
                    },
                    {
                        "id": "g10-s2-u9",
                        "unitNo": "SH-Unit 9",
                        "title": "現代論說文核心篇章標記 (Discourse Markers in Expository Essays)",
                        "indicator": "SH: Ac-V-7 篇章連貫與邏輯標記",
                        "competency": "B1 符號運用、B2 科技資訊與媒體素養、C1 道德實踐與公民意識",
                        "sourceRef": "arch:s2_review",
                        "motivation": "學測綜合測驗與篇章結構題型的核心考點就是篇章標記 (Discourse Markers)。掌握因果 (consequently, therefore)、轉折 (on the other hand, in contrast)、遞進 (moreover, furthermore)、舉例 (for instance, to illustrate) 的轉折副詞，是打通高二長文脈絡的命脈。",
                        "concepts": [
                            {
                                "title": "篇章轉折副詞標點規範 (Punctuation of Transition Adverbs)",
                                "formula": "Sentence 1; therefore, Sentence 2.  OR  Sentence 1. In addition, Sentence 2.",
                                "explanation": "轉折副詞不是連接詞，不能用單一逗號連接兩個完整句子！前面必須是句號或分號，其後緊隨逗號。",
                                "example": "The cost of lithium batteries has plummeted; consequently, electric vehicle adoption has surged."
                            },
                            {
                                "title": "四大核心邏輯語義家族 (Four Major Logical Families)",
                                "formula": "Contrast (轉折) | Additive (遞進) | Causal (因果) | Exemplification (舉例)",
                                "explanation": "1. 轉折: nevertheless, however, conversely 2. 遞進: furthermore, moreover, additionally 3. 因果: thus, hence, accordingly 4. 舉例: specifically, notably.",
                                "example": "Renewable energy produces minimal emissions. Furthermore, operational costs decline over time."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "consequently", "ipa": "/ˈkɑːnsəkwentli/", "pos": "adv.", "zh": "結果；因此", "sentence": "Deforestation escalated; consequently, soil erosion worsened dramatically." },
                            { "word": "furthermore", "ipa": "/ˈfɜːrðərmɔːr/", "pos": "adv.", "zh": "此外；而且", "sentence": "Furthermore, urban rooftop gardens lower ambient city temperatures." },
                            { "word": "conversely", "ipa": "/kənˈvɜːrsli/", "pos": "adv.", "zh": "相反地", "sentence": "Some thrive under competitive pressure; conversely, others become paralyzed with anxiety." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Is this correct: 'I studied hard, however I failed the test'?", "zh": "這樣寫對嗎：'I studied hard, however I failed the test'？" },
                            { "speaker": "Teacher", "en": "No! That's a comma splice error. Change the comma to a semicolon: 'I studied hard; however, I failed the test.'", "zh": "不對！那是逗號串句錯誤。把逗號改成半形分號：'I studied hard; however, I failed the test.'" }
                        ],
                        "reading": {
                            "title": "The Double-Edged Sword of Social Media (社群媒體的雙面刃效應)",
                            "strategy": "篇章邏輯鏈建構：依據轉折副詞將各段論點標記為正向 (+) 或負向 (-)。",
                            "text": "Digital social networks democratize information dissemination by giving a voice to grassroots communities. Furthermore, they facilitate rapid crowd-sourced disaster relief. However, algorithmic content feeds tend to incentivize sensationalism over factual accuracy. Consequently, echo chambers solidify, and polarization intensifies. Nevertheless, proactive media literacy initiatives offer a viable defense against synthetic propaganda.",
                            "questions": [
                                { "q": "What is the logical function of 'Consequently' in the paragraph?", "ans": "To introduce the adverse result of algorithmic feeds prioritizing sensationalism." }
                            ]
                        },
                        "step0Clue": "解篇章結構題時，先圈出每題選項中的 However, Furthermore, Consequently，並看前一句與後一句是順向因果還是反向對比！",
                        "formativeQuiz": [
                            {
                                "q": "The archaeological expedition faced unrelenting blizzards and equipment malfunctions; ________, the researchers persisted until the tomb was unearthed.",
                                "options": ["therefore", "nevertheless", "furthermore", "similarly"],
                                "ans": 1,
                                "hint1": "前句提到遭遇暴風雪與設備故障 (困難障礙)。",
                                "hint2": "後句提到研究人員堅持不懈直到墓穴出土 (反向轉折)。",
                                "solution": "前後語意為困難與堅毅的反向轉折，應用 nevertheless (然而/儘管如此)。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He missed the train, therefore he arrived late. ❌", "correct": "He missed the train; therefore, he arrived late. ✔️", "reason": "therefore 是副詞而非連接詞，不可只用一個逗號連接兩句，前面必須用分號或句號。" }
                        ],
                        "checklist": [
                            "我能避免轉折副詞造成的逗號串句 (Comma Splice) 錯誤",
                            "我能在學測綜合測驗與篇章題中精準配對因果、轉折與遞進標記"
                        ]
                    },
                    {
                        "id": "g10-s2-u10",
                        "unitNo": "SH-Unit 10",
                        "title": "學測圖表與多文本綜合剖析 (GSAT Multimodal Data & Chart Interpretation)",
                        "indicator": "SH: Ac-V-8 多模態文本解讀與圖表分析",
                        "competency": "B2 科技資訊與媒體素養、A2 系統思考與解決問題",
                        "sourceRef": "arch:s2_review",
                        "motivation": "108 課綱學測全新命題亮點：混合題型 (Hybrid Questions) 與圖表多文本題。結合柱狀圖、圓餅圖、趨勢線與專題報導，要求考生具備跨文本檢索、對照、歸納與簡答書寫的能力。",
                        "concepts": [
                            {
                                "title": "圖表數據描述的核心動詞與趨勢用語 (Vocabulary for Data Description)",
                                "formula": "surge / skyrocket (急升) | plunge / plummet (急跌) | fluctuate (波動) | plateau (持平)",
                                "explanation": "描述數據變化時，善用精準動詞與副詞：grow steadily, decline marginally, peak at, drop to an all-time low.",
                                "example": "Renewable generation peaked in July, whereas coal dependency declined precipitously."
                            },
                            {
                                "title": "雙文本觀點比對法則 (Cross-Text Comparative Protocol)",
                                "formula": "Text A (客觀數據/圖表) + Text B (個人投書/社論) -> 尋找矛盾點與支持證據",
                                "explanation": "混合題常要求考生從文章中挑選一個字詞填空，或以簡答句說明 Text A 數據如何支持或反駁 Text B 的觀點。",
                                "example": "According to Figure 1, the data directly contradicts the author's claim in paragraph 2."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "precipitously", "ipa": "/prɪˈsɪpɪtəsli/", "pos": "adv.", "zh": "急遽地；險峻地", "sentence": "Electric battery production costs have declined precipitously over the past decade." },
                            { "word": "fluctuate", "ipa": "/ˈflʌktʃueɪt/", "pos": "v.", "zh": "波動；上下起伏", "sentence": "Global crude oil prices fluctuated widely due to geopolitical friction." },
                            { "word": "plateau", "ipa": "/plæˈtoʊ/", "pos": "v./n.", "zh": "進入平穩期；高原", "sentence": "After three months of exponential growth, subscriber numbers began to plateau." }
                        ],
                        "dialogue": [
                            { "speaker": "Examiner", "en": "How do you answer a GSAT hybrid question requiring an exact word from the passage?", "zh": "你如何回答學測混合題中要求從文章摘錄單字填空的題目？" },
                            { "speaker": "Student", "en": "I locate the exact semantic match and copy the word verbatim without changing its part of speech!", "zh": "我定位文章中的語意對應處，一字不改複製原詞，不改變詞性！" }
                        ],
                        "reading": {
                            "title": "Global Plastic Waste Management and Recycling Realities (全球塑膠廢棄物現況分析)",
                            "strategy": "圖表與文本綜合對照：比對內文敘述百分比與統計圖數據是否一致。",
                            "text": "A municipal report published yesterday presents paradoxical findings regarding consumer behavior. While 84% of surveyed households expressed intense concern over microplastic contamination, actual sorted recycling participation plateaued at only 28%. The accompanying bar chart reveals that single-use plastic consumption among young adults rose by 14% this year, largely driven by online delivery services. Environmental advocates argue that consumer awareness campaigns are insufficient without legislative bans.",
                            "questions": [
                                { "q": "According to the passage, what specific service caused the 14% increase in single-use plastics?", "ans": "Online delivery services." }
                            ]
                        },
                        "step0Clue": "做大考圖表題時，先看圖表「標題、X軸單位、Y軸單位、圖例」，再對照文章中的關鍵數字與百分比！",
                        "formativeQuiz": [
                            {
                                "q": "Based on the text, which verb best describes the condition of sorted recycling participation?",
                                "options": ["surged", "plummeted", "plateaued", "fluctuated wildly"],
                                "ans": 2,
                                "hint1": "文中提到 actual sorted recycling participation ________ at only 28%。",
                                "hint2": "作者用這個字表示停留在某一數值不再上升或平穩維持。",
                                "solution": "文章原文為 'participation plateaued at only 28%'，故選 plateaued。故選 C。"
                            }
                        ],
                        "traps": [
                            { "wrong": "填空題自己任意把文章中的名詞改寫成動詞形式。 ❌", "correct": "嚴格遵守題目指示，若註明 'from the passage' 必須原形/原詞摘錄。 ✔️", "reason": "學測混合題有嚴格評分規準，規定自文章摘錄者任意改寫將不予給分。" }
                        ],
                        "checklist": [
                            "我能讀懂圖表 X 軸、Y 軸、百分比並與英文文本資訊整合",
                            "我能正確回答學測混合題的文意定位與摘詞填空題目"
                        ]
                    },
                    {
                        "id": "g10-s2-u11",
                        "unitNo": "SH-Unit 11",
                        "title": "情態助動詞的推測與批判思考 (Modal Auxiliaries of Deduction)",
                        "indicator": "SH: Ac-V-9 情態助動詞與推論語氣",
                        "competency": "A2 系統思考與解決問題、B1 符號溝通",
                        "sourceRef": "arch:s2_review",
                        "motivation": "學測長篇與英檢中高級寫作極度著重批判思考的謹慎度 (Hedging)。情態助動詞對現在與過去的推測 (must have, can't have, should have) 是高中階段最具鑑別度的語法之一。",
                        "concepts": [
                            {
                                "title": "對過去事件的推測矩陣 (Modal Deduction about Past Events)",
                                "formula": "must have p.p. (必定做過) | can't/couldn't have p.p. (不可能做過) | may/might have p.p. (可能做過)",
                                "explanation": "情態助動詞後加 have + p.p. 表示對「過去事實」的推測或判斷。",
                                "example": "The streets are soaking wet; it must have rained cats and dogs last night."
                            },
                            {
                                "title": "should have p.p. 的遺憾與責備 (Counterfactual Regret)",
                                "formula": "should have p.p. (本來應該做卻沒做) vs. shouldn't have p.p. (本來不該做卻做了)",
                                "explanation": "表達與過去事實相反的批評或懊悔，為假設語氣的縮影。",
                                "example": "You should have double-checked the flight departure gate before sitting down."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "deduction", "ipa": "/dɪˈdʌkʃn/", "pos": "n.", "zh": "推論；扣除", "sentence": "Sherlock Holmes relied on deductive reasoning to solve intricate mysteries." },
                            { "word": "counterfactual", "ipa": "/ˌkaʊntərˈfæktʃuəl/", "pos": "adj.", "zh": "與事實相反的", "sentence": "A counterfactual statement ponders what might have transpired." },
                            { "word": "scrutiny", "ipa": "/ˈskruːtəni/", "pos": "n.", "zh": "審查；仔細檢驗", "sentence": "The candidate's experimental methodology did not withstand rigorous peer scrutiny." }
                        ],
                        "dialogue": [
                            { "speaker": "Investigator", "en": "The vault was opened from the inside with a master key.", "zh": "金庫是由內部使用萬能鑰匙打開的。" },
                            { "speaker": "Detective", "en": "Then the thief couldn't have been a stranger; an insider must have assisted them!", "zh": "那麼竊賊絕不可能是陌生人；必定是有內鬼協助他們！" }
                        ],
                        "reading": {
                            "title": "The Disappearance of the Mary Celeste (瑪麗·苔絲特號失蹤之謎)",
                            "strategy": "推論層次解析：將文章中關於過去的推測語氣標記為必然 (must)、可能 (might) 或不可能 (couldn't)。",
                            "text": "In December 1872, the British brigantine Dei Gratia discovered the merchant vessel Mary Celeste adrift in choppy seas. The cargo of industrial alcohol was intact, and warm meals remained on the galley table, yet not a single soul was aboard. Naval historians agree the crew couldn't have abandoned ship due to piracy, for personal valuables were undisturbed. An unexpected vapor explosion might have terrified the captain, prompting a hasty evacuation.",
                            "questions": [
                                { "q": "Why do historians believe piracy couldn't have been the cause?", "ans": "Because the cargo and personal valuables were left undisturbed." }
                            ]
                        },
                        "step0Clue": "判斷推測時間點：若是推測「過去發生的事」，一定要選 have + p.p.！若是表示「本來應該做卻沒做」，選 should have p.p.！",
                        "formativeQuiz": [
                            {
                                "q": "I can't find my passport anywhere in the hotel room. I ________ it at the embassy this morning.",
                                "options": ["must leave", "must have left", "should leave", "should have left"],
                                "ans": 1,
                                "hint1": "找遍飯店房間都找不到 (肯定推測)。",
                                "hint2": "遺留在使館發生在今天早上 (過去的事實推測)，需用 have p.p.。",
                                "solution": "對過去事件的高度肯定推測，使用 must have + p.p.。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He didn't study, so he must fail the exam yesterday. ❌", "correct": "He didn't study, so he must have failed the exam yesterday. ✔️", "reason": "yesterday 是過去時間，對過去事情的推測必須使用 must have + p.p.，而非 must + 原形。" }
                        ],
                        "checklist": [
                            "我能精確區分 must have p.p. (必定做過) 與 should have p.p. (本該做卻沒做)",
                            "我能在批判性閱讀中敏銳識別作者推測語氣的強弱程度"
                        ]
                    },
                    {
                        "id": "g10-s2-u12",
                        "unitNo": "SH-Unit 12",
                        "title": "高一全冊素養總結與混合題實戰 (G10 Culminating Exam & Cross-Textual Synthesis)",
                        "indicator": "SH: 總綱素養評量指標綜合應用",
                        "competency": "A1 身心素質、A2 系統思考、B1 符號溝通、C2 團隊合作",
                        "sourceRef": "arch:s2_review",
                        "motivation": "高一學習的集大成驗收。將五大句型、非限定動詞、被動語態、各類從屬子句、篇章標記與多文本整合，透過標準大考全真混合題架構進行實戰檢驗，為高二分詞與假設語氣打下磐石基礎。",
                        "concepts": [
                            {
                                "title": "長篇混合題五步解題心法 (GSAT 5-Step Hybrid Mastery)",
                                "formula": "1. 審視題幹關鍵詞 -> 2. 略讀文章抓主旨 -> 3. 掃讀定位精準句 -> 4. 檢驗句構文法格位 -> 5. 謄寫抄錄無失誤",
                                "explanation": "面對大考長達 400-500 字的高難度文本，不可從頭死記。先看問題要求找人名、地名、年份或名詞，直擊原文段落。",
                                "example": "Step 1 marks the question keyword 'thermal insulation'; Step 3 locates paragraph 4 line 3."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "synthesis", "ipa": "/ˈsɪnθəsɪs/", "pos": "n.", "zh": "綜合；合成", "sentence": "The final paper required a synthesis of three separate research articles." },
                            { "word": "culminating", "ipa": "/ˈkʌlmɪneɪtɪŋ/", "pos": "adj.", "zh": "終結的；登峰造極的", "sentence": "The culminating project demonstrated students' academic growth throughout the year." },
                            { "word": "methodology", "ipa": "/ˌmeθəˈdɑːlədʒi/", "pos": "n.", "zh": "方法論；研究方法", "sentence": "The validity of scientific results depends entirely upon robust methodology." }
                        ],
                        "dialogue": [
                            { "speaker": "Senior", "en": "What was the most important lesson you learned in 10th-grade English?", "zh": "你在高一英文學到的最重要一課是什麼？" },
                            { "speaker": "Sophomore", "en": "Realizing that grammar is not a set of dead rules, but an architecture for precise thinking!", "zh": "領悟到文法不是死板的規則，而是精密思考的建築架構！" }
                        ],
                        "reading": {
                            "title": "The Dawn of Quantum Computing (量子運算的破曉時刻)",
                            "strategy": "跨概念綜合統整：結合被動語態、關係子句與轉折語詞，理清技術發展脈絡。",
                            "text": "Quantum computing, which operates on the principles of quantum superposition and entanglement, represents an unprecedented leap in computational prowess. While classical supercomputers process binary bits sequentially, quantum processors manipulate qubits simultaneously, which allows them to perform complex calculations in minutes that would otherwise require millennia. Consequently, cybersecurity architectures must be completely reimagined to resist quantum decryption.",
                            "questions": [
                                { "q": "Why does quantum computing compute exponentially faster than classical computers?", "ans": "Because it manipulates qubits simultaneously using superposition and entanglement." }
                            ]
                        },
                        "step0Clue": "在做高一總結評量時，遇到長難句先找主詞與主動詞，刮號所有修飾性關係子句與介系詞片語！",
                        "formativeQuiz": [
                            {
                                "q": "Quantum processors manipulate qubits simultaneously, ________ enables calculations previously considered impossible.",
                                "options": ["that", "which", "what", "where"],
                                "ans": 1,
                                "hint1": "前有逗號，修飾前面整句事實。",
                                "hint2": "逗號後引導非限定關係子句，不可用 that。",
                                "solution": "逗號後引導非限定子句修飾整件事情，應用 which。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "長難句讀到後面就忘記前面主詞是單數還是複數。 ❌", "correct": "用鉛筆圈出核心主詞，排除所有夾在主詞與動詞間的修飾語。 ✔️", "reason": "大考最常見的陷阱就是主詞與動詞之間插入長達三行的關係子句，考生常誤將子句受詞當成主詞選錯動詞單複數。" }
                        ],
                        "checklist": [
                            "我能融會貫通高一全冊五大句型、子句與篇章結構",
                            "我具備自信挑戰學測全真混合題與圖表綜合分析能力"
                        ]
                    }
                ]
            }
        ]
    }

def get_g11():
    return {
        "gradeId": "g11",
        "title": "高中二年級 (Grade 11)",
        "stage": "第五學習階段 (高中二年級 108 課綱深化與加深加廣選修)",
        "badge": "108 課綱頂標巔峰 · 分詞構句與假設語氣大成",
        "desc": "高二為高中英文語法最精微高深的精華殿堂。全面攻克分詞構句、獨立分詞構句、與過去/未來相反之假設語氣全貌、省略 if 倒裝、否定與地方副詞倒裝、分裂句、ESP 科技/ESG 人文跨域專業英文，打通學測指考滿級分的核心動脈。",
        "semesters": [
            {
                "semId": "g11-s1",
                "title": "高二上學期 (11上)",
                "examFocus": "第一次段考 (現在/過去分詞構句、分詞形容詞)、第二次段考 (獨立分詞、假設語氣全貌)、第三次段考 (倒裝句型大成、平衡對稱句構)",
                "units": [
                    {
                        "id": "g11-s1-u1",
                        "unitNo": "SH-Unit 13",
                        "title": "分詞構句與分詞形容詞全解 (Participle Constructions & Participial Adjectives)",
                        "indicator": "SH: Ac-V-10 分詞構句之簡化與修飾",
                        "competency": "A2 系統思考、B1 符號溝通、B3 藝術涵養與美感素養",
                        "sourceRef": "arch:s3_review",
                        "motivation": "分詞構句是英文追求「簡潔、節奏與優雅」的極致體現。在不引發歧義的前提下，將冗長的副詞子句精煉為分詞片語，是英美主流期刊與學術寫作的標誌性特徵。",
                        "concepts": [
                            {
                                "title": "副詞子句化為分詞構句三步驟 (Three Steps to Participle Clauses)",
                                "formula": "1. 省略連接詞 (若意思明確) -> 2. 省略相同主詞 -> 3. 主動化為 V-ing，被動化為 V-p.p. (省略 being)",
                                "explanation": "主動進行用現在分詞 V-ing；被動或完成狀態用過去分詞 V-p.p.；否定詞 not 置於分詞最前面。",
                                "example": "Because he felt exhausted, he fell asleep. => Feeling exhausted, he fell asleep. / Because it was damaged by hail, the roof leaked. => Damaged by hail, the roof leaked."
                            },
                            {
                                "title": "分詞形容詞情緒動詞對比 (Emotive Participial Adjectives)",
                                "formula": "V-ing (令人感到...的，指事物本質) vs. V-p.p. (某人感到...的，指內心狀態)",
                                "explanation": "令人興奮的比賽是 exciting match；感到興奮的觀眾是 excited spectators。指物通常用 V-ing，指人心情通常用 V-p.p.。",
                                "example": "The confusing explanation left all the confused students even more perplexed."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "participle", "ipa": "/ˈpɑːrtɪsɪpl/", "pos": "n.", "zh": "分詞", "sentence": "A participle functions as an adjective or forms part of a compound tense." },
                            { "word": "perplexed", "ipa": "/pərˈplekst/", "pos": "adj.", "zh": "困惑的；不知所措的", "sentence": "The contradictory laboratory findings left the scientists completely perplexed." },
                            { "word": "conciseness", "ipa": "/kənˈsaɪsnəs/", "pos": "n.", "zh": "簡潔；精簡", "sentence": "Participle constructions contribute significantly to syntactic conciseness." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Can I say 'Walking down the street, the trees were beautiful'?", "zh": "我可以說 'Walking down the street, the trees were beautiful' 嗎？" },
                            { "speaker": "Teacher", "en": "No! That's a dangling participle! The trees weren't walking down the street. The subject of the main clause must perform the action of walking!", "zh": "不行！那是懸垂分詞錯誤！樹木不會在街上走。主要子句的主詞必須是走路動作的執行者！" }
                        ],
                        "reading": {
                            "title": "Vincent van Gogh's Starry Night: Agony and Transcendence (梵谷《星夜》：痛苦與昇華)",
                            "strategy": "分詞主幹追蹤：找出句首分詞片語，確認其修飾的主詞是誰。",
                            "text": "Confined to the Saint-Paul asylum in Saint-Rémy, Vincent van Gogh painted with feverish intensity. Gazing out his barred eastern window before dawn, he perceived an immense morning star pulsating with cosmic energy. Transcending his earthly torment, the Dutch post-impressionist applied swirling strokes of cobalt blue and blazing chrome yellow, creating an immortal masterpiece that still mesmerizes audiences worldwide.",
                            "questions": [
                                { "q": "Who was 'Gazing out his barred eastern window'?", "ans": "Vincent van Gogh." }
                            ]
                        },
                        "step0Clue": "做分詞構句題目時，第一件事：看主要子句的主詞是誰！然後問自己：這個主詞跟分詞動作的關係是「主動做」還是「被做」？主動選 V-ing，被動選 V-p.p.！",
                        "formativeQuiz": [
                            {
                                "q": "________ by the overwhelming applause of the audience, the soprano bowed deeply on stage.",
                                "options": ["Encouraging", "Encouraged", "Having encouraged", "To encourage"],
                                "ans": 1,
                                "hint1": "主要子句主詞是 the soprano (女高音)。",
                                "hint2": "女高音是「受到觀眾掌聲鼓勵 (被動)」，故需使用過去分詞。",
                                "solution": "女高音受到鼓舞，兩者為被動關係，故選過去分詞 Encouraged。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Seen from the space station, the Earth looks like a blue marble. ❌ (若主要子句主詞是 astronauts 則錯誤)", "correct": "Seen from the space station, the Earth looks like a blue marble. ✔️ (因為是地球被看見)", "reason": "分詞片語的主詞必須與主句主詞保持嚴格一致，否則會形成懸垂分詞 (Dangling Participle)。" }
                        ],
                        "checklist": [
                            "我能將副詞子句正確簡化為主動 V-ing 與被動 V-p.p. 分詞片語",
                            "我能徹底避免懸垂分詞 (Dangling Participle) 寫作錯誤"
                        ]
                    },
                    {
                        "id": "g11-s1-u2",
                        "unitNo": "SH-Unit 14",
                        "title": "獨立分詞構句與慣用懸置分詞 (Absolute Constructions & Idiomatic Participles)",
                        "indicator": "SH: Ac-V-10 獨立分詞與慣用懸置用法",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s3_review",
                        "motivation": "當副詞子句與主要子句主詞「不同」時，子句主詞必須保留，形成「獨立分詞構句 (Nominative Absolute)」。此外，還有不受主詞限制的慣用評估分詞 (Generally speaking, judging from)，為大考綜合測驗必考核心。",
                        "concepts": [
                            {
                                "title": "獨立分詞構句公式 (The Nominative Absolute Construction)",
                                "formula": "Subject 1 + V-ing / V-p.p., Subject 2 + Verb...",
                                "explanation": "前後主詞不同時，省略連接詞但保留子句主詞。常出現在表天氣、時間、伴隨狀況之語境。",
                                "example": "Weather permitting, we will set sail at dawn. (若天氣允許，我們將在破曉啟航)"
                            },
                            {
                                "title": "with + 受詞 + 受詞補語之伴隨態 (Absolute 'with' Structure)",
                                "formula": "with + O + V-ing (主動進行) / V-p.p. (被動完成) / Adj / Prep Phrase",
                                "explanation": "用 with 引導名詞與受詞補語，表達伴隨發生的動作或身體狀態。",
                                "example": "He listened intently with his arms folded across his chest."
                            },
                            {
                                "title": "慣用懸置分詞 (Idiomatic Dangling Participles)",
                                "formula": "Generally speaking (一般而言) | Judging from (從...來判斷) | Frankly speaking (坦白說)",
                                "explanation": "這些慣用片語已演變為獨立副詞功能，不受主句主詞一致性規則的限制。",
                                "example": "Judging from his accent, he must be a native of Scotland."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "absolute", "ipa": "/ˈæbsəluːt/", "pos": "adj.", "zh": "獨立的；絕對的", "sentence": "An absolute participle construction retains its own independent subject." },
                            { "word": "idiomatic", "ipa": "/ˌɪdiəˈmætɪk/", "pos": "adj.", "zh": "慣用的；地道的", "sentence": "Using idiomatic participle expressions makes English writing far more authentic." },
                            { "word": "intently", "ipa": "/ɪnˈtentli/", "pos": "adv.", "zh": "專注地；熱切地", "sentence": "The chess grandmaster stared intently at the board before making his move." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Why can we say 'Weather permitting, we'll go'? Isn't that two subjects?", "zh": "為什麼可以說 'Weather permitting, we'll go'？這不是有兩個主詞嗎？" },
                            { "speaker": "Teacher", "en": "Exactly! It's called an absolute construction. Because 'weather' is different from 'we', 'weather' must be kept before the participle!", "zh": "沒錯！這稱為獨立分詞構句。因為 'weather' 跟 'we' 不同主詞，'weather' 必須保留在分詞前！" }
                        ],
                        "reading": {
                            "title": "The Historic Launch of the James Webb Space Telescope (韋伯太空望遠鏡發射盛典)",
                            "strategy": "伴隨狀態與獨立分詞識別：圈出 with + O + OC 與保留主詞之分詞句。",
                            "text": "On Christmas morning in 2021, an Ariane 5 rocket stood ready on the launch pad in French Guiana. All safety checks completed, mission control initiated the final ignition countdown. With millions of viewers watching anxiously via global livestreams, the thrusters fired with deafening thunder. The telescope ascended smoothly into the stratosphere, its golden hexagonal mirrors destined to peer back 13.5 billion years into the cosmic dawn.",
                            "questions": [
                                { "q": "Rewrite 'All safety checks completed' into a full subordinate clause.", "ans": "After all safety checks had been completed." }
                            ]
                        },
                        "step0Clue": "看到 with 後面跟著一個名詞 (受詞)，再填後面補語時：若名詞自己做動作選 V-ing；名詞被動接受或處於某狀態選 V-p.p. (例如 with eyes closed, with arms crossed)！",
                        "formativeQuiz": [
                            {
                                "q": "The young philosopher sat silently by the fireplace, with his fingers ________ together in deep contemplation.",
                                "options": ["intertwining", "intertwined", "to intertwine", "intertwines"],
                                "ans": 1,
                                "hint1": "句型為 with + O + OC。",
                                "hint2": "十指是「被交叉纏繞在一起 (被動狀態)」。",
                                "solution": "手指被交叉緊扣，為被動完成狀態，受詞補語使用過去分詞 intertwined。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Judging from his grades, the teacher praised him. ❌ (意思變成老師從成績看，而非習慣語)", "correct": "Judging from his grades, he is an exceptional student. ✔️", "reason": "Judging from 習慣引導客觀事實或對該主詞的評價推論，後面主句主詞通常是所評價之對象。" }
                        ],
                        "checklist": [
                            "我能正確建構前後主詞不同的獨立分詞構句 (Nominative Absolute)",
                            "我能熟練運用 with + O + V-ing / V-p.p. 描寫人物生動動作與神態"
                        ]
                    },
                    {
                        "id": "g11-s1-u3",
                        "unitNo": "SH-Unit 15",
                        "title": "假設語氣與條件句全景 (Subjunctive Mood: Unreal Present, Past & Future)",
                        "indicator": "SH: Ac-V-11 假設語氣與非真實條件句",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s3_review",
                        "motivation": "假設語氣是高中英語文法的最高巔峰。它並非單純描述事實，而是表達「與事實相反的願望、假想、推測或遺憾」。掌握「時態往過去倒退一格」的宇宙法則，即可縱橫所有大考題型。",
                        "concepts": [
                            {
                                "title": "與現在相反之假設 (Subjunctive Unreal Present)",
                                "formula": "If + S + were / V-ed, S + would/could/should/might + V-原形",
                                "explanation": "與現在事實相反，子句動詞用過去式 (be 動詞一律用 were)；主要子句用助動詞過去式 + 原形動詞。",
                                "example": "If I were a billionaire, I would fund marine plastic cleanup operations globally."
                            },
                            {
                                "title": "與過去相反之假設 (Subjunctive Unreal Past)",
                                "formula": "If + S + had + p.p., S + would/could/should/might + have + p.p.",
                                "explanation": "與過去事實相反，子句動詞用過去完成式 had p.p.；主要子句用 would/could/should/might + have + p.p.。",
                                "example": "If we had left ten minutes earlier, we would not have missed the high-speed rail."
                            },
                            {
                                "title": "與未來相反之純假想 (Subjunctive Unreal Future)",
                                "formula": "If + S + were to / should + V-原形, S + would/could + V-原形",
                                "explanation": "were to 表「絕不可能發生的未來假想 (如太陽打西邊出來)」；should 表「萬一發生 (機率極低)」。",
                                "example": "If the sun were to rise in the west, I would still honor my promise."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "subjunctive", "ipa": "/səbˈdʒʌŋktɪv/", "pos": "n./adj.", "zh": "假設語氣；虛擬語氣", "sentence": "The subjunctive mood expresses hypothetical conditions contrary to fact." },
                            { "word": "hypothetical", "ipa": "/ˌhaɪpəˈθetɪkl/", "pos": "adj.", "zh": "假設的；假定的", "sentence": "Economists tested the algorithm against various hypothetical market crises." },
                            { "word": "unprecedented", "ipa": "/ʌnˈpresɪdentɪd/", "pos": "adj.", "zh": "史無前例的", "sentence": "The region suffered an unprecedented drought due to climate destabilization." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Why do people say 'If I were you' instead of 'If I was you'?", "zh": "為什麼大家都說 'If I were you' 而不是 'If I was you'？" },
                            { "speaker": "Teacher", "en": "In traditional subjunctive grammar, 'were' is used for all persons to mark that it is counter to reality!", "zh": "在傳統假設語氣中，所有代名詞一律使用 'were'，以此標記這與現實相反！" }
                        ],
                        "reading": {
                            "title": "Counterfactual History: What If the Library of Alexandria Had Survived? (假想歷史：若亞歷山大圖書館未曾燒毀？)",
                            "strategy": "虛擬條件句時態定位：區分作者是在假想過去、現在還是未來的相反狀況。",
                            "text": "Historians frequently contemplate what the world would look like today if the Great Library of Alexandria had not been destroyed by fire. If those hundreds of thousands of ancient parchment scrolls had been preserved, centuries of scientific stagnation during the Dark Ages might have been averted. Technological advances that took humanity two millennia to achieve could have unfolded within a fraction of that time.",
                            "questions": [
                                { "q": "What tense is used in 'if the Great Library... had not been destroyed'?", "ans": "Past perfect subjunctive (unreal past)." }
                            ]
                        },
                        "step0Clue": "解假設語氣口訣：看時間提示！現在相反用過去式 (were/V-ed)；過去相反用過去完成式 (had p.p.)！",
                        "formativeQuiz": [
                            {
                                "q": "If the engineers ________ the thermal sensors beforehand, the catastrophic reactor meltdown could have been prevented.",
                                "options": ["inspected", "were inspecting", "had inspected", "would inspect"],
                                "ans": 2,
                                "hint1": "主要子句動詞為 could have been prevented (與過去事實相反)。",
                                "hint2": "if 條件子句與過去事實相反時，動詞必須使用過去完成式 had + p.p.。",
                                "solution": "與過去事實相反的假設，if 子句需使用 had inspected。故選 C。"
                            }
                        ],
                        "traps": [
                            { "wrong": "If I would have known, I would have told you. ❌", "correct": "If I had known, I would have told you. ✔️", "reason": "if 條件子句中絕不能出現 would have p.p.，只能用 had p.p.；would have p.p. 只能放在主要子句中！" }
                        ],
                        "checklist": [
                            "我能精確默寫與現在、過去、未來相反假設語氣的子句與主句動詞公式",
                            "我能在 if 條件子句中絕不誤用 would have p.p."
                        ]
                    },
                    {
                        "id": "g11-s1-u4",
                        "unitNo": "SH-Unit 16",
                        "title": "混合假設語氣與省略 if 倒裝 (Mixed Conditionals & Inverted Conditionals)",
                        "indicator": "SH: Ac-V-11 混合假設與省略 if 倒裝結構",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s3_review",
                        "motivation": "學測指考最高難度文法雙璧：1. 過去因影響現在果的「混合假設語氣」；2. 為了行文典雅與節奏而「省略 if 的倒裝句型」。掌握這兩項，各大名校模擬考無往不利。",
                        "concepts": [
                            {
                                "title": "混合假設語氣 (Mixed Conditionals: Past Cause -> Present Effect)",
                                "formula": "If + S + had + p.p. (過去), S + would/could + V-原形 + now / today (現在)",
                                "explanation": "條件子句是過去發生的事 (had p.p.)，但主要子句描述的是對「現在 (now)」造成的影響，主句使用 would + V-原形！",
                                "example": "If she had taken the vaccine last winter, she would not be sick in bed right now."
                            },
                            {
                                "title": "省略 If 之倒裝三部曲 (Inversion by Omitting 'If')",
                                "formula": "Were + S... | Had + S + p.p... | Should + S + V-原形...",
                                "explanation": "將 if 省略時，子句必須將助動詞或 be 動詞 (Were, Had, Should) 倒裝提至主詞之前！若有 not，not 留在主詞後方。",
                                "example": "If I had known => Had I known. / If you should see him => Should you see him. / If it were not for => Were it not for."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "inversion", "ipa": "/ɪnˈvɜːrʒn/", "pos": "n.", "zh": "倒裝；反轉", "sentence": "Inversion emphasizes the condition and lends literary gravitas to the prose." },
                            { "word": "gravitas", "ipa": "/ˈɡrævətɑːs/", "pos": "n.", "zh": "莊重；嚴肅", "sentence": "The statesman spoke with remarkable moral gravitas during the summit." },
                            { "word": "avert", "ipa": "/əˈvɜːrt/", "pos": "v.", "zh": "避免；防止", "sentence": "Prompt diplomatic intervention successfully averted an international crisis." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "What does 'Had we arrived earlier, we would have seen him' mean?", "zh": "'Had we arrived earlier, we would have seen him' 是什麼意思？" },
                            { "speaker": "Teacher", "en": "It means: 'If we had arrived earlier...' It's an inverted conditional where 'if' was omitted!", "zh": "它意思是：'If we had arrived earlier...' 這是省略 'if' 的倒裝假設句！" }
                        ],
                        "reading": {
                            "title": "Crisis Management in High-Stakes Aviation (高空飛行危機管理)",
                            "strategy": "倒裝結構還原：在閱讀中看到 Had / Were / Should 置於句首且句末是句號時，立即還原為 If 條件句。",
                            "text": "Had Captain Sullivan hesitated for even five seconds during the dual-engine failure over the Hudson River, the passenger aircraft would undoubtedly have crashed into Manhattan skyscrapers. Were modern flight simulators not equipped with realistic turbulence algorithms, pilots would be ill-prepared for catastrophic emergencies. Should any anomalies occur in flight telemetry today, autonomous safety systems immediately initiate corrective maneuvers.",
                            "questions": [
                                { "q": "Rewrite 'Had Captain Sullivan hesitated' with 'If'.", "ans": "If Captain Sullivan had hesitated." }
                            ]
                        },
                        "step0Clue": "看到句首出現 Had / Were / Should + 主詞，句末不是問號而是逗號 + 主要子句時，百分之百是「省略 if 的倒裝假設句」！",
                        "formativeQuiz": [
                            {
                                "q": "________ the government implemented stringent quarantine protocols sooner, the outbreak would not have spread so rapidly across the province.",
                                "options": ["If had", "Had", "Should", "Were"],
                                "ans": 1,
                                "hint1": "後方主要子句為 would not have spread (與過去相反)。",
                                "hint2": "子句主詞為 the government，動詞為 implemented (p.p.)，這是省略 If 的倒裝句。",
                                "solution": "If the government had implemented... 省略 If 後倒裝為 Had the government implemented...。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Had not he arrived in time, we would have failed. ❌", "correct": "Had he not arrived in time, we would have failed. ✔️", "reason": "省略 if 倒裝時，否定詞 not 不可與 Had 縮寫或一起提到句首，必須留在主詞之後。" }
                        ],
                        "checklist": [
                            "我能識別混合假設語氣中「過去因 (had p.p.)」與「現在果 (would V)」的時態落差",
                            "我能熟練進行 Had / Were / Should 省略 if 倒裝句型的雙向轉換"
                        ]
                    },
                    {
                        "id": "g11-s1-u5",
                        "unitNo": "SH-Unit 17",
                        "title": "否定副詞倒裝與地方副詞倒裝 (Inversion: Negative Adverbials & Locatives)",
                        "indicator": "SH: Ac-V-12 強調語氣與副詞倒裝全系列",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s3_review",
                        "motivation": "倒裝 (Inversion) 是英語營造修辭戲劇張力 (rhetorical drama) 與焦點突出的強大武器。掌握否定副詞 (Never, Seldom, Rarely, Little, Not only) 置於句首的不完全倒裝，以及地方副詞 (Here, There, On the hill) 置首的完全倒裝。",
                        "concepts": [
                            {
                                "title": "否定副詞置首不完全倒裝 (Negative Adverbial Inversion - Auxiliary First)",
                                "formula": "Negative Word (Never / Seldom / Rarely / Little / Not only / Hardly) + Auxiliary / Be + Subject + Main Verb...",
                                "explanation": "否定副詞提至句首時，語序如同一般疑問句：助動詞 (do/does/did/have/can/will) 或 be 動詞必須倒裝提到主詞前方！",
                                "example": "Never in human history have so many individuals possessed instantaneous access to global knowledge."
                            },
                            {
                                "title": "地方副詞置首完全倒裝 (Locative Inversion - Verb Before Subject)",
                                "formula": "Prep Phrase / Adverb of Place (On the hill / Under the tree / Here) + Verb + Noun Subject",
                                "explanation": "地方副詞提至句首時，若主詞為普通名詞，整顆動詞直接搬到主詞前方 (完全倒裝)；但若主詞為代名詞 (he, they)，則不倒裝！",
                                "example": "At the foot of the mountain stood an ancient pagoda. vs. Here comes the bus! / Here it comes!"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "rhetorical", "ipa": "/rɪˈtɔːrɪkl/", "pos": "adj.", "zh": "修辭的；詞藻華麗的", "sentence": "Inversion is a classical rhetorical device used to captivate the listener." },
                            { "word": "locative", "ipa": "/ˈloʊkətɪv/", "pos": "adj.", "zh": "表示方位的；地方的", "sentence": "Locative inversion moves the prepositional phrase to the head of the sentence." },
                            { "word": "scarcely", "ipa": "/ˈskersli/", "pos": "adv.", "zh": "幾乎不；剛...就...", "sentence": "Scarcely had the keynote begun when the power grid collapsed." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Why do people say 'Here comes the train' but 'Here it comes'?", "zh": "為什麼大家說 'Here comes the train' 卻說 'Here it comes'？" },
                            { "speaker": "Teacher", "en": "Brilliant observation! In locative inversion, if the subject is a pronoun like 'it' or 'he', we do NOT invert the verb!", "zh": "敏銳的觀察！在地方副詞倒裝中，如果主詞是代名詞 (it, he)，動詞絕不倒裝！" }
                        ],
                        "reading": {
                            "title": "The Majesty of the Northern Lights (極光之美與地磁風暴)",
                            "strategy": "倒裝句語氣體驗：圈出文中所有否定置首與方位置首的倒裝句，體會文學張力。",
                            "text": "Seldom do travelers witness a spectacle as transcendent as the aurora borealis dancing across the Arctic canopy. Across the frozen tundra swept biting polar winds, yet beneath the shimmering curtains of emerald light stood hundreds of spellbound spectators. Not only does this celestial phenomenon illuminate the polar night, but it also reveals the turbulent magnetic interactions shielding our planet from deadly solar radiation.",
                            "questions": [
                                { "q": "Rewrite 'Seldom do travelers witness...' in standard non-inverted word order.", "ans": "Travelers seldom witness a spectacle as transcendent..." }
                            ]
                        },
                        "step0Clue": "看到句首第一字是 Never / Seldom / Rarely / Little / Hardly / Scarcely / Not only 時，後面立刻檢查是否有「助動詞 + 主詞」倒裝！",
                        "formativeQuiz": [
                            {
                                "q": "Little ________ that the anonymous donor who funded the research laboratory was actually their former mentor.",
                                "options": ["the scientists suspected", "did the scientists suspect", "the scientists did suspect", "suspected the scientists"],
                                "ans": 1,
                                "hint1": "句首為否定副詞 Little (幾乎不/完全沒)。",
                                "hint2": "否定副詞置首需採不完全倒裝，過去式動詞需借用助動詞 did + S + 原形動詞。",
                                "solution": "Little 置於句首，語序需倒裝為助動詞 + 主詞 + 原形動詞 (did the scientists suspect)。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Under the bridge a strange man stood. (可接受但未倒裝) vs. Under the bridge did stand a strange man. ❌", "correct": "Under the bridge stood a strange man. ✔️", "reason": "地方副詞置首是「完全倒裝」，整顆不及物動詞直接搬到主詞前，不需要也不可以借用助動詞 did！" }
                        ],
                        "checklist": [
                            "我能熟練寫出 Never / Seldom / Little 置首的不完全倒裝句",
                            "我能分辨地方副詞完全倒裝中「普通名詞倒裝、代名詞不倒裝」的關鍵鐵律"
                        ]
                    },
                    {
                        "id": "g11-s1-u6",
                        "unitNo": "SH-Unit 18",
                        "title": "So / Such / Nor / Neither 倒裝與平衡句型 (Balance & Parallel Inversion)",
                        "indicator": "SH: Ac-V-12 對稱平衡與關聯倒裝句型",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s3_review",
                        "motivation": "英文追求句型的「平行對稱 (Parallelism)」與「頭輕腳重」的流暢韻律。掌握 So + Adj / Such + Be 置首的結果倒裝句，以及 Not only... but also...、Neither... nor... 的平衡結構，是大學指考/學測英文寫作邁向 16 分以上的必備功力。",
                        "concepts": [
                            {
                                "title": "So... that... 與 Such... that... 倒裝 (Inversion of So/Such Result Clauses)",
                                "formula": "So + Adj/Adv + Be/Auxiliary + Subject + that... | Such + Be + Subject + that...",
                                "explanation": "將「如此...以致於...」的 So + 形容詞提至句首加強語氣時，前半句倒裝，that 後面子句維持正常語序。",
                                "example": "So intense was the summer heatwave that asphalt roads began to soften."
                            },
                            {
                                "title": "Neither / Nor 的附和倒裝 (Negative Agreement Inversion)",
                                "formula": "S + negative verb...; neither / nor + Be/Auxiliary + Subject",
                                "explanation": "表達「某人/某物也不...」時，neither / nor 後面必須將 be 動詞或助動詞提至主詞之前。",
                                "example": "The pilot could not see through the dense fog, nor could the radar detect the mountain ridge."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "parallelism", "ipa": "/ˈpærəlelɪzəm/", "pos": "n.", "zh": "平行對稱結構", "sentence": "Rhetorical parallelism establishes pleasing cognitive symmetry in argumentative writing." },
                            { "word": "symmetry", "ipa": "/ˈsɪmətri/", "pos": "n.", "zh": "對稱；勻稱", "sentence": "Classical Greek architecture exemplifies architectural symmetry and proportion." },
                            { "word": "eloquent", "ipa": "/ˈeləkwənt/", "pos": "adj.", "zh": "雄辯的；口才流利的", "sentence": "The defense attorney delivered an eloquent and compelling summation." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Can I say 'So severe the storm was that trees fell'?", "zh": "我可以說 'So severe the storm was that trees fell' 嗎？" },
                            { "speaker": "Teacher", "en": "No! When you move 'So severe' to the front, you must invert: 'So severe was the storm that trees fell.'", "zh": "不行！當你把 'So severe' 移到句首時，必須倒裝：'So severe was the storm that trees fell。'" }
                        ],
                        "reading": {
                            "title": "Winston Churchill's Wartime Rhetoric: Defiance Against Tyranny (邱吉爾戰時演說修辭剖析)",
                            "strategy": "修辭對稱性標記：找出演說文獻中 So... that 與 Not only 的對稱倒裝句型。",
                            "text": "During the darkest hours of the Blitz in 1940, Winston Churchill galvanized a beleaguered nation. So profound was his mastery of language that his speeches mobilized the English language and sent it into battle. Not only did his steadfast resolve inspire Londoners enduring nightly bombardments, but it also forged an indomitable transatlantic alliance that ultimately vanquished fascism.",
                            "questions": [
                                { "q": "What happened to the word order after 'So profound'?", "ans": "The auxiliary/be verb was placed before the subject (was his mastery)." }
                            ]
                        },
                        "step0Clue": "看到 So + 形容詞/副詞放在一整句話的最開頭時，主詞動詞一定要倒裝！that 後面則維持正常主動賓語序！",
                        "formativeQuiz": [
                            {
                                "q": "So captivating ________ that the entire auditorium remained spellbound for over two hours.",
                                "options": ["the performance was", "was the performance", "the performance did be", "did the performance"],
                                "ans": 1,
                                "hint1": "句首為 So + 形容詞 captivating (如此引人入勝)。",
                                "hint2": "So + Adj 置首時，be 動詞必須倒裝提到主詞 the performance 前方。",
                                "solution": "So + Adj. 置首倒裝，be 動詞 was 倒裝至主詞 the performance 前。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "He doesn't like spicy food, and I don't too. ❌", "correct": "He doesn't like spicy food, and neither do I. (or: I don't either.) ✔️", "reason": "否定附和句不能用 too，只能用 either (放句尾) 或 neither + 助動詞 + 主詞 (倒裝)。" }
                        ],
                        "checklist": [
                            "我能寫出符合語法標準的 So + Adj / Such + Be 倒裝結構",
                            "我能在否定附和句中靈活運用 neither / nor 倒裝"
                        ]
                    }
                ]
            },
            {
                "semId": "g11-s2",
                "title": "高二下學期 (11下)",
                "examFocus": "第一次段考 (分裂句焦點結構、讓步子句倒裝)、第二次段考 (ESP 科技論文閱讀、全球永續 ESG 論述)、第三次段考 (篇章結構銜接、高二全冊頂標模擬)",
                "units": [
                    {
                        "id": "g11-s2-u7",
                        "unitNo": "SH-Unit 19",
                        "title": "分裂句與焦點強調結構 (Cleft Sentences: It is ... that ...)",
                        "indicator": "SH: Ac-V-13 分裂句與強調句型",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s4_review",
                        "motivation": "分裂句 (Cleft Sentence) 是母語人士調整句子資訊焦點 (Focus) 的終極工具。將要強調的主詞、受詞或副詞片語夾在 'It is/was... that...' 之間，能使特定訊息產生強烈聚焦光環。",
                        "concepts": [
                            {
                                "title": "分裂句標準公式與還原檢驗法 (Cleft Sentence Formula & Test)",
                                "formula": "It is / was + [強調焦點 (S / O / Adv Phrase)] + that / who + [剩餘句子成分]",
                                "explanation": "檢驗方法：若把 'It is/was' 和 'that' 同時拿掉，剩下的單字能重新還原拼成一句完整的正常句子，就是分裂強調句！",
                                "example": "Columbus reached the Americas in 1492. => It was in 1492 that Columbus reached the Americas."
                            },
                            {
                                "title": "Wh- 分裂句 (Pseudo-cleft Sentences)",
                                "formula": "What + S + V + is / was + [強調焦點]",
                                "explanation": "以 what 子句作為主詞，將整個句子的核心焦點推移至 be 動詞之後。",
                                "example": "What the biosphere urgently requires is substantive decarbonization, not hollow pledges."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "cleft", "ipa": "/kleft/", "pos": "adj./n.", "zh": "分裂的；裂隙", "sentence": "A cleft sentence splits a single clause into two sections to highlight a focus." },
                            { "word": "substantive", "ipa": "/ˈsʌbstəntɪv/", "pos": "adj.", "zh": "實質性的；有實體的", "sentence": "Policymakers must enact substantive environmental legislation immediately." },
                            { "word": "demarcate", "ipa": "/dɪˈmɑːrkeɪt/", "pos": "v.", "zh": "劃分；標明界線", "sentence": "Clear definitions demarcate the boundaries between scientific disciplines." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "How can I tell if 'It is... that...' is an empty subject or a cleft sentence?", "zh": "我該如何分辨 'It is... that...' 是虛主詞還是分裂強調句？" },
                            { "speaker": "Teacher", "en": "Remove 'It is' and 'that'! If the words can form a grammatically complete sentence on their own, it's a cleft sentence!", "zh": "拿掉 'It is' 和 'that'！如果剩下的字自己能拼成一句文法完整的句子，它就是分裂強調句！" }
                        ],
                        "reading": {
                            "title": "Rosalind Franklin and the Double Helix (羅莎琳·富蘭克林與雙螺旋光環)",
                            "strategy": "焦點句型提煉：辨識文章中透過 It was... that 強調的科學家實質貢獻。",
                            "text": "For decades after Watson and Crick unveiled the molecular structure of DNA, historical textbooks minimized the contribution of Rosalind Franklin. However, historical reexamination confirms that it was Franklin's Photo 51 that provided the definitive experimental proof of the double helix. It was through her painstaking X-ray diffraction techniques that the geometric dimensions of the genetic code were first elucidated.",
                            "questions": [
                                { "q": "What specific proof did Photo 51 provide according to the passage?", "ans": "The definitive experimental proof of the double helix." }
                            ]
                        },
                        "step0Clue": "做強調句題目時，把 It was 和 that 遮住，若剩下的句子能順暢讀通，空格處百分之百填 that (強調人時偶可用 who)！",
                        "formativeQuiz": [
                            {
                                "q": "It was precisely because the thermal insulation was defective ________ the spacecraft sustained severe heat damage during reentry.",
                                "options": ["which", "that", "why", "what"],
                                "ans": 1,
                                "hint1": "句首為 It was，中間強調原因副詞子句 because the thermal insulation was defective。",
                                "hint2": "分裂強調句夾入副詞子句時，後方引導詞一律使用 that。",
                                "solution": "It was... that... 強調句型，此處強調原因副詞子句，後方連接詞必須用 that。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "It was in Taipei where we first met. (口語可見但學測大考視為非標準文法) ❌", "correct": "It was in Taipei that we first met. ✔️", "reason": "學測指考等正式學術英語規範中，分裂句強調地方副詞片語時，規範引導詞一律使用 that，不可任意代換為 where。" }
                        ],
                        "checklist": [
                            "我能運用「遮去檢驗法」精準判斷分裂強調句與虛主詞 It 之差異",
                            "我能在正式寫作中熟練運用 It was... that... 強調主詞、受詞與時間/地點副詞片語"
                        ]
                    },
                    {
                        "id": "g11-s2-u8",
                        "unitNo": "SH-Unit 20",
                        "title": "讓步子句倒裝與高級連接詞 (Concession Inversion & Complex Conjunctions)",
                        "indicator": "SH: Ac-V-14 高級讓步倒裝與文言轉折",
                        "competency": "A2 系統思考、B1 符號溝通、C3 多元文化",
                        "sourceRef": "arch:s4_review",
                        "motivation": "學測 14-15 級分頂標選手與一般考生的分水嶺！讓步倒裝 (Adj / Adv / N / V + as / though + S + V) 在大考閱讀測驗中頻繁出現，掌握此句型能瞬間看透篇章深層語義。",
                        "concepts": [
                            {
                                "title": "As / Though 讓步倒裝公式 (Concession Inversion with As/Though)",
                                "formula": "Adj / Adv / V / N (無冠詞) + as / though + S + V, S + V...",
                                "explanation": "意為「雖然...、儘管...」。將形容詞、副詞、原形動詞或名詞 (不可加冠詞 a/an) 提至 as/though 前方！注意：although 絕不可用於此倒裝結構！",
                                "example": "Rich as he is, he remains humble. / Child as she was, she displayed astonishing courage. / Hard as they tried, they failed."
                            },
                            {
                                "title": "高級讓步與假設片語 (Advanced Idiomatic Concessions)",
                                "formula": "Be it A or B (無論是A還是B) | Come what may (無論發生什麼) | Be that as it may (儘管如此)",
                                "explanation": "源自古英語虛擬式原形倒裝，廣泛保留於現代新聞評論、法學與大考長文中。",
                                "example": "Every participant must register, be they students or renowned scholars."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "concession", "ipa": "/kənˈseʃn/", "pos": "n.", "zh": "讓步；妥協", "sentence": "Concession inversion lends a sophisticated, literary cadence to essays." },
                            { "word": "cadence", "ipa": "/ˈkeɪdns/", "pos": "n.", "zh": "節奏；韻律", "sentence": "The rhythmic cadence of the poet's speech captivated the entire hall." },
                            { "word": "formidable", "ipa": "/ˈfɔːrmɪdəbl/", "pos": "adj.", "zh": "令人敬畏的；強大艱難的", "sentence": "The mountaineers conquered a formidable Himalayan peak in sub-zero conditions." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Can I write 'A child as he was, he solved the riddle'?", "zh": "我可以寫 'A child as he was, he solved the riddle' 嗎？" },
                            { "speaker": "Teacher", "en": "Careful! When a singular countable noun is inverted before 'as', the indefinite article 'a/an' must be omitted! Write 'Child as he was'.", "zh": "小心！當單數可數名詞倒裝到 'as' 前方時，不定冠詞 'a/an' 必須省略！要寫成 'Child as he was'。" }
                        ],
                        "reading": {
                            "title": "The Stoic Philosophy of Marcus Aurelius (馬可·奧理略的斯多葛冥思)",
                            "strategy": "讓步倒裝語義重組：將句首 Adj + as 還原為 Although 句子，理清邏輯轉折。",
                            "text": "Emperor of the Roman world as Marcus Aurelius was, he sought peace not in imperial conquest, but within the citadel of his own mind. Powerful though he seemed to his contemporaries, he reminded himself daily of mortality and the ephemeral nature of fame. Difficult as his military campaigns along the frozen Danube were, he composed his Meditations by lantern light, bequeathing timeless reflections on civic virtue to humanity.",
                            "questions": [
                                { "q": "Rewrite 'Difficult as his military campaigns... were' using 'Although'.", "ans": "Although his military campaigns along the frozen Danube were difficult." }
                            ]
                        },
                        "step0Clue": "看到形容詞、副詞或無冠詞名詞直接擺在句首，緊接著 as / though + 主詞 + 動詞時，這是「雖然...儘管...」的讓步倒裝！",
                        "formativeQuiz": [
                            {
                                "q": "________ as he was, the apprentice managed to repair the intricate clockwork mechanism.",
                                "options": ["A novice", "Novice", "Novices", "The novice"],
                                "ans": 1,
                                "hint1": "本句為名詞提至句首的讓步倒裝結構 (as he was)。",
                                "hint2": "單數可數名詞提至 as 前方時，冠詞 a/an 必須省略。",
                                "solution": "名詞提至 as/though 前倒裝表讓步時，名詞前不加冠詞。故選 Novice (B)。"
                            }
                        ],
                        "traps": [
                            { "wrong": "Brave although he was, he could not defeat the beast. ❌", "correct": "Brave though/as he was, he could not defeat the beast. ✔️", "reason": "although 絕不能用於倒裝讓步結構，倒裝時只能用 as 或 though！" }
                        ],
                        "checklist": [
                            "我能熟練掌握 Adj/Adv/N + as/though + S + V 讓步倒裝",
                            "我能牢記名詞倒裝於 as 前時必須省略冠詞 a/an 的高階考點"
                        ]
                    },
                    {
                        "id": "g11-s2-u9",
                        "unitNo": "SH-Unit 21",
                        "title": "ESP 科技英語與 AI 論文閱讀 (ESP: Artificial Intelligence & Academic Research)",
                        "indicator": "SH: 技術型高中專業英文 (ESP) 與普通高中跨學科素養",
                        "competency": "B2 科技資訊與媒體素養、A2 系統思考與問題解決",
                        "sourceRef": "arch:s4_review",
                        "motivation": "ESP (English for Specific Purposes) 專業英文已是大考與技高外語群主軸。人工智慧、演算法、自然語言處理、大型語言模型 (LLM) 的學術文獻高頻出現在跨學科閱讀題中，掌握專業詞彙與論證邏輯是未來雙語人才的基石。",
                        "concepts": [
                            {
                                "title": "學術科技英文摘要四大結構 (Four Pillars of Academic Abstracts)",
                                "formula": "Objective (研究目的) -> Methodology (研究方法) -> Findings (實驗結果) -> Implications (實務意涵)",
                                "explanation": "科技論文摘要依循嚴密脈絡。善用定位詞快速抓取核心貢獻。",
                                "example": "This paper proposes a novel Transformer architecture capable of mitigating hallucinations in LLMs."
                            },
                            {
                                "title": "科技詞彙構詞法：字根與字首拆解 (Affixation in Technical ESP)",
                                "formula": "neuro- (神經) | bio- (生物) | auto- (自動) | trans- (轉變/跨越) | -ification (名詞化)",
                                "explanation": "掌握常見希臘拉丁字根字首，面對陌生學術專業詞彙可瞬間推敲出 80% 以上語義。",
                                "example": "Autonomous neuromuscular synchronization allows bionic prosthetics to emulate natural limb movements."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "algorithm", "ipa": "/ˈælɡərɪðəm/", "pos": "n.", "zh": "演算法", "sentence": "Recommendation algorithms optimize user engagement by predicting content preferences." },
                            { "word": "hallucination", "ipa": "/həˌluːsɪˈneɪʃn/", "pos": "n.", "zh": "幻覺；(AI) 捏造事實", "sentence": "Mitigating factual hallucination remains a paramount hurdle in generative AI." },
                            { "word": "neural", "ipa": "/ˈnʊrəl/", "pos": "adj.", "zh": "神經的；神經網路的", "sentence": "Deep artificial neural networks loosely mirror biological synaptic pathways." }
                        ],
                        "dialogue": [
                            { "speaker": "Professor", "en": "What is the primary challenge when deploying large language models in healthcare?", "zh": "將大型語言模型部署於醫療體系的主要挑戰是什麼？" },
                            { "speaker": "Researcher", "en": "Ensuring factual precision and eliminating algorithmic hallucinations in clinical advice.", "zh": "確保事實精確度，並消除臨床建議中的演算法幻覺。" }
                        ],
                        "reading": {
                            "title": "Reinforcement Learning from Human Feedback (人類反饋強化學習在 AI 之應用)",
                            "strategy": "學術專有名詞脈絡推敲：依據上下文同位語定義理解新興科技術語。",
                            "text": "Generative pre-trained models demonstrate remarkable fluency across diverse tasks. However, unsupervised training on uncurated internet datasets frequently leads models to generate toxic biases or fabricated references. To align machine behavior with human values, engineers employ Reinforcement Learning from Human Feedback (RLHF). By rewarding ethical outputs and penalizing deceptive answers, RLHF steers AI toward helpfulness, honesty, and harmlessness.",
                            "questions": [
                                { "q": "What are the three core human values targeted by RLHF?", "ans": "Helpfulness, honesty, and harmlessness." }
                            ]
                        },
                        "step0Clue": "閱讀科技論文型文本時，不要被專有名詞嚇倒！專有名詞後方通常緊接著同位語 (comma), or which is called...，那裡就是最白話的中文解釋！",
                        "formativeQuiz": [
                            {
                                "q": "In the passage, what problem arises from training AI on uncurated internet corpora?",
                                "options": ["System hardware overheating", "Generating toxic biases and fabricated references", "Faster computation degradation", "Inability to parse syntax"],
                                "ans": 1,
                                "hint1": "定位原文中的 uncurated internet datasets。",
                                "hint2": "原文後方直接指出 leads models to generate...",
                                "solution": "原文明確提到會產生有害偏見與捏造引證 (toxic biases or fabricated references)。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "一看到長篇學術縮寫 (如 RLHF, LLM) 就放棄不讀。 ❌", "correct": "在文中找到第一次出現該縮寫的地方，前方或括號內必定有全名與簡要定義。 ✔️", "reason": "學術英語規範規定所有專用縮寫在文章首次出現時必須提供完整全稱拼寫。" }
                        ],
                        "checklist": [
                            "我能讀懂標準科技英文論文的摘要架構 (Objective, Method, Result, Implication)",
                            "我能運用希臘拉丁字根字首推斷新興科技術語之詞義"
                        ]
                    },
                    {
                        "id": "g11-s2-u10",
                        "unitNo": "SH-Unit 22",
                        "title": "ESP 全球永續與綠色能源跨域論證 (ESP: Global Sustainability & ESG Discourses)",
                        "indicator": "SH: 永續發展目標 (SDGs) 與全球公民素養融入英文教學",
                        "competency": "C1 道德實踐與公民意識、C3 多元文化與國際理解、B2 科技資訊與媒體素養",
                        "sourceRef": "arch:s4_review",
                        "motivation": "聯合國永續發展目標 (SDGs 1-17) 與企業 ESG (環境、社會、公司治理) 是現今大考閱讀與英文寫作的最熱門題庫。本單元建立碳足跡、循環經濟、再生能源與氣候正義的高階論辯詞彙庫。",
                        "concepts": [
                            {
                                "title": "永續發展論證高頻架構 (Argumentation in Environmental Discourse)",
                                "formula": "Current Crisis (生態現況) -> Root Cause (人為成因) -> Proposed Solution (制度/科技方案) -> Call to Action (呼籲行動)",
                                "explanation": "英文永續倡議文本通常遵循此四段論式結構。考生在寫作時亦可套用此模板以達結構嚴謹度。",
                                "example": "Transitioning from fossil fuels to offshore wind requires substantial grid modernization."
                            },
                            {
                                "title": "綠色經濟高頻搭配詞 (High-Frequency Collocations in Green Economy)",
                                "formula": "carbon neutral (碳中和) | circular economy (循環經濟) | ecological footprint (生態足跡) | sustainable agriculture (永續農業)",
                                "explanation": "大考克漏字與寫作評分特別偏好道地的專業搭配詞組，能大幅提升論述的專業說服力。",
                                "example": "The conglomerate pledged to achieve net-zero carbon neutrality across all operations by 2040."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "sustainability", "ipa": "/səˌsteɪnəˈbɪləti/", "pos": "n.", "zh": "永續性；持續發展", "sentence": "Corporate sustainability reports now receive the same regulatory audit as financial filings." },
                            { "word": "decarbonization", "ipa": "/diːˌkɑːrbənaɪˈzeɪʃn/", "pos": "n.", "zh": "去碳化；減碳", "sentence": "Deep industrial decarbonization requires revolutionary hydrogen metallurgy." },
                            { "word": "biodiversity", "ipa": "/ˌbaɪoʊdaɪˈvɜːrsəti/", "pos": "n.", "zh": "生物多樣性", "sentence": "Wetland preservation is indispensable for protecting regional biodiversity." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "What is the difference between 'carbon neutral' and 'net zero'?", "zh": "'carbon neutral' (碳中和) 和 'net zero' (淨零) 有什麼區別？" },
                            { "speaker": "Teacher", "en": "'Carbon neutral' balances carbon emissions through offsets, while 'net zero' mandates reducing greenhouse gases across all scopes to the absolute minimum before offsetting!", "zh": "'碳中和'可透過碳權抵換平衡排放，而'淨零'要求將全範疇溫室氣體減至絕對極限後才允許少數抵換！" }
                        ],
                        "reading": {
                            "title": "The Global Circular Economy: Reimagining Resource Lifecycles (全球循環經濟：重塑資源生命週期)",
                            "strategy": "因果與對比策略：比對線性經濟 (Take-Make-Waste) 與循環經濟 (Reduce-Reuse-Recycle) 的差異。",
                            "text": "For over a century, global industrial capitalism has operated under a linear model characterized by extracting, manufacturing, and discarding. This 'take-make-waste' approach has generated catastrophic plastic accumulation in oceans and unprecedented resource depletion. In contrast, the circular economy conceives production loops where waste becomes input. By designing durable modular products and recovering critical minerals from obsolete electronics, nations can decouple economic prosperity from environmental destruction.",
                            "questions": [
                                { "q": "What is the core philosophy of a circular economy according to the passage?", "ans": "To conceive production loops where waste becomes input, decoupling economic growth from environmental harm." }
                            ]
                        },
                        "step0Clue": "在做永續議題閱讀題時，注意作者對商業承諾的評價：是持樂觀肯定 (optimistic)，還是質疑漂綠 (skeptical of greenwashing)！",
                        "formativeQuiz": [
                            {
                                "q": "According to the passage, what does the circular economy aim to 'decouple'?",
                                "options": ["Recycling from municipal subsidies", "Economic prosperity from environmental destruction", "Plastic packaging from consumer goods", "Fossil fuels from international logistics"],
                                "ans": 1,
                                "hint1": "定位文章最後一句中的 decouple (使脫鉤)。",
                                "hint2": "原文為 'decouple economic prosperity from environmental destruction'。",
                                "solution": "文章末句明確指出脫鉤經濟繁榮與環境破壞。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "把 sustainable 當成 sustain (支撐) 翻譯為「可維持支撐的」。 ❌", "correct": "在環境永續語境下，sustainable 專指「環境可持續發展、不耗竭地球資源的」。 ✔️", "reason": "大考常以一字多義出題，考生必須依據主題領域 (Domain) 選擇合宜語義。" }
                        ],
                        "checklist": [
                            "我能熟練運用 SDGs 與 ESG 領域的核心英語專用詞彙",
                            "我能在英文作文中針對氣候變遷提出具備系統思考的論點與具體解方"
                        ]
                    },
                    {
                        "id": "g11-s2-u11",
                        "unitNo": "SH-Unit 23",
                        "title": "篇章結構與段落填空破題密碼 (Discourse Cohesion & Textual Flow Mastery)",
                        "indicator": "SH: 學測篇章結構題型與語篇連貫分析",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s4_review",
                        "motivation": "學測篇章結構 (Discourse Structure) 是鑑別頂標 (13-15級分) 的核心關卡。透過代名詞定錨、主題詞同義代換、時間順序鏈、因果關聯推導四大破解密碼，徹底掌握五題全對的秘訣。",
                        "concepts": [
                            {
                                "title": "篇章連貫四大定錨法則 (Four Anchoring Principles of Discourse Cohesion)",
                                "formula": "1. 代名詞定錨 (they, this, such) -> 2. 定冠詞特定指稱 (the + N) -> 3. 轉折語流 (However, Thus) -> 4. 語意回響 (Lexical Reiteration)",
                                "explanation": "每個空格的答案，必定與其前一句和後一句有至少兩處「語意或文法黏著點」。找到代名詞先行詞是秒殺題目的最高法門。",
                                "example": "Sentence A mentions 'Dr. Evans launched a project.' Option C begins with 'This ambitious endeavor...'"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "cohesion", "ipa": "/koʊˈhiːʒn/", "pos": "n.", "zh": "篇章凝聚力；結合", "sentence": "Grammatical cohesion ties independent sentences into an unbroken narrative tapestry." },
                            { "word": "reiteration", "ipa": "/riːˌɪtəˈreɪʃn/", "pos": "n.", "zh": "重申；反覆出現", "sentence": "Lexical reiteration reinforces key conceptual themes across paragraphs." },
                            { "word": "tapestry", "ipa": "/ˈtæpəstri/", "pos": "n.", "zh": "織錦；錯綜複雜的結構", "sentence": "The novel weaves a magnificent linguistic tapestry of Victorian London." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "What is the single most common mistake in GSAT discourse structure questions?", "zh": "學測篇章結構題最常犯的錯誤是什麼？" },
                            { "speaker": "Teacher", "en": "Looking only at the sentence before the blank, while ignoring the sentence immediately following the blank!", "zh": "只看空格前面那句，卻忽略了空格緊接著的後面那句！兩頭都要看！" }
                        ],
                        "reading": {
                            "title": "The Decipherment of the Rosetta Stone (羅塞塔石碑破譯全紀錄)",
                            "strategy": "語篇代名詞定錨練習：追蹤文中代名詞與特定名詞之呼應關係。",
                            "text": "In 1799, French soldiers in Egypt unearthed a slab of granodiorite inscribed with three distinct scripts: Ancient Egyptian hieroglyphs, Demotic script, and Ancient Greek. Because scholars could readily read the Greek inscriptions, they possessed a linguistic key. Jean-François Champollion hypothesized that the hieroglyphic characters represented phonetic sounds rather than merely symbolic pictograms. By meticulously cross-referencing royal cartouches such as 'Ptolemy' and 'Cleopatra', he unlocked the forgotten language of the Pharaohs.",
                            "questions": [
                                { "q": "What did the Ancient Greek script provide for the researchers?", "ans": "A linguistic key to compare and decipher the hieroglyphs." }
                            ]
                        },
                        "step0Clue": "做篇章結構時，先用螢光筆將五個選項句首的代名詞 (Such, These, They, He) 與轉折詞 (In addition, Nevertheless) 圈出，回文章找它們的家！",
                        "formativeQuiz": [
                            {
                                "q": "The archaeological team discovered an intricate subterranean canal system beneath the ancient citadel. ________. This astonishing engineering feat ensured reliable fresh water even during multi-year sieges.",
                                "options": [
                                    "It was used primarily to store olive oil and vintage wine.",
                                    "These underground conduits channeled mountain runoff directly into central cisterns.",
                                    "However, the inhabitants frequently suffered from severe water shortages.",
                                    "Archaeologists consequently abandoned the excavation site due to flooding."
                                ],
                                "ans": 1,
                                "hint1": "前句提到 an intricate subterranean canal system (複雜的地下運河系統)。",
                                "hint2": "後句提到 This astonishing engineering feat (這項令人驚嘆的工程奇蹟確保水源)。",
                                "solution": "選項 B 中的 'These underground conduits' 精準呼應前句的 subterranean canal system，且內容說明運水機制，順暢連接後句。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "看到選項裡有跟文章一樣的單字就急著選進去。 ❌", "correct": "檢查該選項放進空格後，是否能同時跟「前句」和「後句」在邏輯與代名詞上雙向通順。 ✔️", "reason": "大考出題者最喜歡在干擾選項中故意放入文章原字，引誘只看單字不看整段邏輯的考生入坑。" }
                        ],
                        "checklist": [
                            "我能熟練運用代名詞定錨法則秒殺篇章結構選項",
                            "我做篇章結構題時能堅持「前看一句、後看一句」的雙向驗證步驟"
                        ]
                    },
                    {
                        "id": "g11-s2-u12",
                        "unitNo": "SH-Unit 24",
                        "title": "高二全冊融會貫通與頂標衝刺模擬 (G11 Culminating Synthesis & Diagnostic Trial)",
                        "indicator": "SH: 108 課綱高中第二階段加深加廣全維度總結",
                        "competency": "A1 自我精進、A2 系統思考、B1 符號溝通、B2 科技素養、C2 團隊領導",
                        "sourceRef": "arch:s4_review",
                        "motivation": "高二全冊終極封頂驗收。結合分詞構句、獨立分詞、假設語氣全系列、倒裝句、分裂句、讓步倒裝、ESP 科技與永續長文，打造具備大考頂標水準的綜合試煉場，引領學子邁入高三大考決勝舞台。",
                        "concepts": [
                            {
                                "title": "高難度長篇閱讀三階速讀心法 (Three-Stage Velocity Reading for GSAT)",
                                "formula": "Stage 1: Topic Sentence Skim (每段首尾句 45 秒抓大意) -> Stage 2: Question Keyword Scan (題幹定位 30 秒) -> Stage 3: Deep Syntactic Parsing (長難句精準拆解)",
                                "explanation": "面對大考長達 1200 字的多篇閱讀題組，切莫一字一字死讀。首段抓議題、各段首句抓論點、末段抓結論，再帶題檢索精確定位。",
                                "example": "Skim paragraph 1 for the main thesis; scan for capitalized proper nouns mentioned in Question 38."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "culminating", "ipa": "/ˈkʌlmɪneɪtɪŋ/", "pos": "adj.", "zh": "達到頂點的；終極的", "sentence": "This trial represents the culminating diagnostic benchmark of secondary education." },
                            { "word": "velocity", "ipa": "/vəˈlɑːsəti/", "pos": "n.", "zh": "速度；迅速", "sentence": "Reading velocity combined with syntactic comprehension ensures success in high-stakes testing." },
                            { "word": "paramount", "ipa": "/ˈpærəmaʊnt/", "pos": "adj.", "zh": "至高無上的；首要的", "sentence": "Preserving intellectual rigor remains paramount in educational platform design." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "I've mastered all the complex inversions and subjunctives. What's next?", "zh": "我已經掌握了所有複雜倒裝和假設語氣。下一步是什麼？" },
                            { "speaker": "Mentor", "en": "Now synthesize them seamlessly into your own authentic writing and critical thought!", "zh": "現在，將它們渾然天成地融入你自己的真實寫作與批判思維中！" }
                        ],
                        "reading": {
                            "title": "The Quantum Leap in Human Intelligence (人類智能的量子躍遷)",
                            "strategy": "全維度綜合統整：將長文中出現的分裂句、倒裝句與分詞構句標註並分析其篇章功能。",
                            "text": "Never before has humanity stood at such an epochal threshold. Had early computer scientists not persisted through computational winters, the neural network revolution transforming modern society would never have materialized. Transcending mere tool-making, artificial intelligence now challenges our definitions of creativity and consciousness. It is our collective ethical wisdom, rather than raw computational firepower, that will dictate whether this technological leap elevates civilization or precipitates irreversible alienation.",
                            "questions": [
                                { "q": "What will ultimately dictate the future of this technological leap according to the author?", "ans": "Our collective ethical wisdom." }
                            ]
                        },
                        "step0Clue": "在挑戰頂標試卷時，遇到任何看似可怕的長長句子，先找逗號與連接詞拆成小模組，再一眼看透核心結構！",
                        "formativeQuiz": [
                            {
                                "q": "Had the researchers not recalibrated the quantum sensors with extreme precision, the minute gravitational wave ________ undetected.",
                                "options": ["would remain", "would have remained", "remained", "had remained"],
                                "ans": 1,
                                "hint1": "句首為 Had the researchers not recalibrated... (與過去相反之省略 if 倒裝句)。",
                                "hint2": "主要子句與過去相反，必須使用 would/could/should/might + have + p.p.。",
                                "solution": "省略 if 的與過去事實相反假設，主要子句需用 would have remained。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "在大考閱讀測驗中，因為緊張而將全文從頭到尾每個字讀三遍導致寫不完。 ❌", "correct": "嚴格執行「題幹關鍵字定位法」，直奔答案段落精讀三行即可作答。 ✔️", "reason": "大考閱讀測驗比拼的是「閱讀策略與資訊檢索效率」，而非逐字默背全文。" }
                        ],
                        "checklist": [
                            "我能在大考模擬題中 100% 辨識分詞、倒裝、分裂句與假設語氣各類變形",
                            "我已具備從容迎戰學測 15 級分與指考頂標的完整實力"
                        ]
                    }
                ]
            }
        ]
    }

def get_g12():
    return {
        "gradeId": "g12",
        "title": "高三與大考巔峰戰力 (Grade 12 & Examination Mastery)",
        "stage": "第五學習階段巔峰 (學測、統測、分科測驗、會考滿分奪冠、GEPT/TOEIC 雙語認證)",
        "badge": "終極素養實戰 · 國家大考雙語頂標特訓",
        "desc": "高三大考衝刺與終身自主學習總樞紐。深度涵蓋：1. 學測英文詞彙/綜合測驗/文意選填/篇章結構/閱讀混合題全真題型破題心法；2. 學測英文寫作 (看圖寫作、雙面論證、圖表評論) 評分規準滿分模板；3. 技高統測外語群全真演練；4. 國中教育會考 A++ 決勝題型徹底破解；5. 全民英檢中級/中高級與多益 900+ 金色證書核心考點；6. 大學 EMI 全英語授課銜接與終生英語力躍升。",
        "semesters": [
            {
                "semId": "g12-s1",
                "title": "高三上學期 (12上 - 國家大考滿級分攻略)",
                "examFocus": "第一次模考 (學測詞彙與綜合測驗極速破解)、第二次模考 (文意選填與篇章結構無懈可擊)、第三次模考 (閱讀測驗混合題與大考英文作文滿分攻略)",
                "units": [
                    {
                        "id": "g12-s1-u1",
                        "unitNo": "EX-Unit 1",
                        "title": "學測英文詞彙與綜合測驗極速破題 (GSAT Cloze & Lexical Precision)",
                        "indicator": "SH/Exam: 大考中心學測英文第一、二大題高頻命題常模",
                        "competency": "A1 自我精進、A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s1_review",
                        "motivation": "學測英文第 1-10 題 (詞彙題) 與第 11-20 題 (綜合測驗/克漏字) 是大考 15 級分的起跑線。掌握動詞搭配詞、慣用介系詞、轉折連接詞與上下文語境線索，能在 15 分鐘內拿下 30 分滿分。",
                        "concepts": [
                            {
                                "title": "詞彙題語境三步定位法 (Three-Step Lexical Context Method)",
                                "formula": "1. 詞性判定 (判斷空格需要 N, V, Adj, Adv) -> 2. 正負向情感色彩 (+ / -) -> 3. 搭配詞精準鎖定 (Collocation)",
                                "explanation": "大考詞彙題從不考冷僻罕用字，而是考驗考生是否能依據前後文的形容詞修飾或受詞搭配，選出唯一道地的動詞或名詞。",
                                "example": "The scientist's pioneering research made a significant contribution to marine preservation."
                            },
                            {
                                "title": "綜合測驗四大必考題型 (Four Core Cloze Question Types)",
                                "formula": "Grammar (動詞時態/被動/分詞) | Vocabulary (語境名動形副) | Transitions (轉折副詞) | Prepositions (慣用片語介系詞)",
                                "explanation": "每篇綜合測驗固定配置一題轉折詞、一題動詞文法形式、一至兩題搭配詞與語境單字。",
                                "example": "He devoted his life to improving literacy; moreover, he established hundreds of rural mobile libraries."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "pioneering", "ipa": "/ˌpaɪəˈnɪrɪŋ/", "pos": "adj.", "zh": "開創性的；先驅的", "sentence": "Her pioneering investigations laid the foundations for quantum telecommunication." },
                            { "word": "collocation", "ipa": "/ˌkɑːləˈkeɪʃn/", "pos": "n.", "zh": "詞語搭配；慣用連用", "sentence": "Native fluency relies heavily on automatic retrieval of natural collocations." },
                            { "word": "indispensable", "ipa": "/ˌɪndɪˈspensəbl/", "pos": "adj.", "zh": "不可或缺的", "sentence": "A robust vocabulary is indispensable for achieving top percentiles in standardized tests." }
                        ],
                        "dialogue": [
                            { "speaker": "Candidate", "en": "How can I avoid getting stuck between two very similar vocabulary options?", "zh": "我該如何避免卡在兩個非常相似的單字選項中？" },
                            { "speaker": "Coach", "en": "Look immediately at the preposition or noun following the blank! Native collocations will instantly eliminate the incorrect choice.", "zh": "立即看空格後面的介系詞或名詞！道地的慣用搭配會瞬間排除錯誤選項。" }
                        ],
                        "reading": {
                            "title": "The Resurgence of Urban Agroecology (都會生態農業的復興浪潮)",
                            "strategy": "克漏字上下文脈絡分析：由後文結果推導前文動詞與轉折副詞。",
                            "text": "Urban rooftop farming has transformed vacant concrete expanses into flourishing agricultural hubs. By deploying soil-free hydroponic technologies, urban farmers dramatically reduce water consumption. Furthermore, hyper-local food production eliminates long-distance transportation emissions. Consequently, municipal governments are now offering tax rebates to stimulate citizen participation in building climate-resilient cities.",
                            "questions": [
                                { "q": "What two benefits of urban farming are highlighted?", "ans": "Reduced water consumption and elimination of transportation emissions." }
                            ]
                        },
                        "step0Clue": "做克漏字時，空格前有動詞先看受詞是誰，空格後有介系詞先看誰能搭配！如 attribute A to B, contribute to, dedicate oneself to！",
                        "formativeQuiz": [
                            {
                                "q": "The international committee decided to ________ the distinguished scientist with its highest honor for her cancer research.",
                                "options": ["reward", "present", "distribute", "attribute"],
                                "ans": 1,
                                "hint1": "空格後方句型為 ________ somebody WITH an award/honor。",
                                "hint2": "present somebody with something 為授與某人榮譽的標準搭配 (reward somebody for doing something)。",
                                "solution": "present sb with an honor 為大考高頻搭配詞，意為「頒發榮譽給某人」。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "看到 contribute 就選 with (受中文「用...貢獻」影響)。 ❌", "correct": "contribute 永遠搭配 to (+ V-ing / N)！ ✔️", "reason": "介系詞搭配不能用中文直譯思考，必須死記英文原生搭配 contribute to / lead to / devote to。" }
                        ],
                        "checklist": [
                            "我能在 15 分鐘內高效率且零失誤完成學測詞彙與綜合測驗題型",
                            "我熟練掌握大考中心最愛考的 30 組高頻動詞介系詞搭配片語"
                        ]
                    },
                    {
                        "id": "g12-s1-u2",
                        "unitNo": "EX-Unit 2",
                        "title": "學測文意選填與篇章結構無懈可擊 (GSAT Blanks Filling & Discourse Logic)",
                        "indicator": "SH/Exam: 大考中心學測英文第三大題 (文意選填) 與第四大題 (篇章結構)",
                        "competency": "A2 系統思考、B1 符號溝通",
                        "sourceRef": "arch:s2_review",
                        "motivation": "文意選填 (10選10) 與篇章結構是學測決定「頂標 (Top)」與「前標」的最關鍵陣地。利用「詞性分類代號法」將文意選填降維打擊；利用「代名詞與主旨定錨法」將篇章結構五題全數拿下！",
                        "concepts": [
                            {
                                "title": "文意選填標註詞性四色法 (The Four-Color POS Tagging Method)",
                                "formula": "Step 1: 先花 40 秒在選項 A-J 標註詞性 (V, Adj, N, Adv, Prep) -> Step 2: 掃描空格判斷所需詞性 -> Step 3: 語意過濾即選即劃",
                                "explanation": "標註詞性後，每個空格只需要在 2-3 個同詞性選項中做選擇，錯誤率直接下降 75% 以上！",
                                "example": "Blank 21 needs an adjective before noun 'consequence'; only options (B) catastrophic and (F) negligible qualify."
                            },
                            {
                                "title": "篇章結構上下夾攻原則 (Double-Flank Verification in Discourse Structure)",
                                "formula": "Sentence (N-1) <== [Blank Target Sentence] ==> Sentence (N+1)",
                                "explanation": "正確選項必須同時滿足前句的因果承接，以及後句的主詞代名詞呼應，缺一不可。",
                                "example": "If Sentence N+1 starts with 'These rigorous precautions', the blank MUST mention safety measures."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "tagging", "ipa": "/ˈtæɡɪŋ/", "pos": "n.", "zh": "標註；標籤", "sentence": "Parts-of-speech tagging streamlines multiple-choice reading efficiency." },
                            { "word": "precaution", "ipa": "/prɪˈkɔːʃn/", "pos": "n.", "zh": "預防措施；防備", "sentence": "Stringent laboratory precautions prevent hazardous bio-contaminant leakage." },
                            { "word": "negligible", "ipa": "/ˈneɡlɪdʒəbl/", "pos": "adj.", "zh": "微不足道的；可忽略的", "sentence": "The algorithmic margin of error was negligible in the quantum simulation." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "What if an option can be both a noun and a verb, like 'increase' or 'challenge'?", "zh": "如果一個選項既是名詞又是動詞，例如 'increase' 或 'challenge' 怎麼辦？" },
                            { "speaker": "Teacher", "en": "Tag it as [N / V]! When analyzing a blank, test both functions according to the syntax of that sentence.", "zh": "標註為 [N / V]！在分析空格時，根據該句子的句法結構同時檢驗兩種詞性。" }
                        ],
                        "reading": {
                            "title": "The Evolutionary Marvel of Cephalopod Camouflage (頭足類生物偽裝的演化奇蹟)",
                            "strategy": "詞性代碼實戰演練：在空白處填入最適詞性之詞彙。",
                            "text": "Octopuses and cuttlefish exhibit dynamic camouflage unmatched in the animal kingdom. Specialized skin cells called chromatophores expand and contract instantaneously under neural control, altering pigment reflection within milliseconds. Additionally, dermal papillae physically alter skin texture, transforming smooth skin into jagged ridges that mimic coral reefs. This multifaceted disguise affords cephalopods absolute invisibility from predatory sharks.",
                            "questions": [
                                { "q": "What controls the expansion and contraction of chromatophores?", "ans": "Direct neural control." }
                            ]
                        },
                        "step0Clue": "做文意選填第一件事：絕對不要先讀文章！先看 A-J 選項，在每個單字旁邊寫上 [N] [V] [Adj] [Adv]，做完才能開始看文章！",
                        "formativeQuiz": [
                            {
                                "q": "The newly discovered deep-sea trench possesses ________ geothermal pressures that crush conventional research submersibles.",
                                "options": ["immense", "immensely", "immensity", "to immense"],
                                "ans": 0,
                                "hint1": "空格位於名詞 geothermal pressures 之前。",
                                "hint2": "修飾名詞需要形容詞。",
                                "solution": "修飾名詞片語需要形容詞，選項中只有 immense (巨大的) 為形容詞。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "文意選填選完一題不劃掉，十個選項從頭看到尾看十遍。 ❌", "correct": "確定填入後，立刻用鉛筆在選項列表上輕輕劃掉該字母，縮小後續思考空間。 ✔️", "reason": "即選即消能成倍提升做題速度，避免大腦工作記憶過載。" }
                        ],
                        "checklist": [
                            "我能徹底貫徹文意選填 40 秒詞性標註法並穩定拿下全對",
                            "我能在篇章結構題中嚴格執行「上下夾攻」雙向檢驗"
                        ]
                    },
                    {
                        "id": "g12-s1-u3",
                        "unitNo": "EX-Unit 3",
                        "title": "學測閱讀測驗長篇與混合題滿分策略 (GSAT Extended Reading & Hybrid Response)",
                        "indicator": "SH/Exam: 大考中心學測英文第五大題 (長篇閱讀) 與第六大題 (混合題)",
                        "competency": "A2 系統思考、B1 符號溝通、B2 科技素養",
                        "sourceRef": "arch:s3_review",
                        "motivation": "學測長篇閱讀篇幅每篇高達 400-500 字，主題涵蓋人類學、天文學、海洋生態與心理學。第六大題混合題更包含簡答、選字填空、圖表對照、是非打勾。本單元傳授「大考閱讀三大極速定位術」，確保考生準確填寫不扣分。",
                        "concepts": [
                            {
                                "title": "長篇閱讀四大多層次題型破解法 (Four Types of GSAT Reading Questions)",
                                "formula": "1. 主旨題 (首段末段+各段首句) | 2. 細節題 (專有名詞關鍵字定位) | 3. 推論題 (嚴禁超譯過度推測) | 4. 詞義題 (上下文代入驗證)",
                                "explanation": "主旨題不可選過於狹隘的單一段落細節；細節題以原文精確字詞為準；推論題從原文事實進行最小邏輯步長推導。",
                                "example": "Question asks for 'primary purpose'; look at opening and concluding paragraphs for thesis statement."
                            },
                            {
                                "title": "混合題非選擇題作答三鐵律 (Three Golden Rules for Hybrid Non-MCQ)",
                                "formula": "Rule 1: 原文摘錄不可改變原詞拼字 | Rule 2: 填表格注意詞性一致性 | Rule 3: 簡答題寫出完整合乎文法主謂結構",
                                "explanation": "若題幹要求 'Find a word in paragraph 2'，考生自行更換單字詞性將直接被判零分！務必原詞摘錄。",
                                "example": "If text says 'substantive', do NOT write 'substance' when instructed to quote directly."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "hybrid", "ipa": "/ˈhaɪbrɪd/", "pos": "adj./n.", "zh": "混合的；雜交種", "sentence": "GSAT hybrid questions evaluate both receptive and productive literacy competencies." },
                            { "word": "verbatim", "ipa": "/vɜːrˈbeɪtɪm/", "pos": "adv./adj.", "zh": "逐字地；一字不差地", "sentence": "Quoting text verbatim guarantees accuracy when responding to extraction prompts." },
                            { "word": "extrapolation", "ipa": "/ɪkˌstræpəˈleɪʃn/", "pos": "n.", "zh": "推斷；外推法", "sentence": "Avoid wild extrapolation when answering GSAT inference questions." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "If a hybrid question asks: 'What caused the decline? (Answer in complete sentence)', how should I write?", "zh": "如果混合題問：'What caused the decline? (Answer in complete sentence)'，我該怎麼寫？" },
                            { "speaker": "Teacher", "en": "Write: 'Habitat destruction and water pollution caused the decline.' Always include a subject, verb, and proper capitalization!", "zh": "寫成：'Habitat destruction and water pollution caused the decline.' 必須包含完整主詞、動詞，並注意大小寫與句點！" }
                        ],
                        "reading": {
                            "title": "The Decoupling of GDP and Carbon Emissions in Scandinavia (北歐經濟成長與碳排放脫鉤實證)",
                            "strategy": "混合題雙文本提取：從文本提煉關鍵字填入綜合分析圖表。",
                            "text": "Over the past three decades, Sweden and Denmark have demonstrated that aggressive climate policy does not impede economic vitality. While national real GDP expanded by over 75% between 1990 and 2020, domestic greenhouse gas emissions declined by 38%. This decoupling was catalyzed by early carbon taxation, extensive nuclear integration, and sweeping district heating modernization. Economists cite this empirical achievement as proof that sustainable industrial transitions are entirely achievable without compromising societal prosperity.",
                            "questions": [
                                { "q": "According to the passage, what specific policy instrument initiated early in Sweden and Denmark catalyzed the decoupling?", "ans": "Early carbon taxation." }
                            ]
                        },
                        "step0Clue": "做混合題簡答或摘字填空時：眼睛先看清題目規定「幾個字以內 (e.g., No more than THREE words)」以及是否「from the passage」！",
                        "formativeQuiz": [
                            {
                                "q": "Based on the text, which three factors catalyzed the Nordic decoupling of GDP and emissions?",
                                "options": [
                                    "Carbon taxation, nuclear integration, and district heating modernization",
                                    "Solar subsidies, coal expansion, and international carbon credits",
                                    "Population decrease, industrial relocation, and agricultural decline",
                                    "Hydroelectric dams, foreign loans, and gasoline bans"
                                ],
                                "ans": 0,
                                "hint1": "定位原文中的 'This decoupling was catalyzed by...'。",
                                "hint2": "原文後方列舉了三個並列名詞片語。",
                                "solution": "文章原文明確列出：early carbon taxation, extensive nuclear integration, and sweeping district heating modernization。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "簡答題字體潦草，大小寫不分，句末忘記加句點。 ❌", "correct": "字體工整清晰，句首大寫，句末加上明確句點，文法時態與提問嚴格一致。 ✔️", "reason": "大考中心閱卷標準中，非選擇題若有句法結構殘缺或拼寫模糊將會被酌予扣分。" }
                        ],
                        "checklist": [
                            "我能精確掌握學測長篇閱讀的四大題型定位心法",
                            "我能在混合題手寫非選部分做到字數合規、原文精準摘錄且標點零失誤"
                        ]
                    },
                    {
                        "id": "g12-s1-u4",
                        "unitNo": "EX-Unit 4",
                        "title": "學測英文作文：看圖寫作與雙面論證 (GSAT Essay Writing: Image Prompt & Argumentation)",
                        "indicator": "SH/Exam: 大考中心學測非選擇題英文作文 (滿分 20 分評分規準)",
                        "competency": "A1 自我精進、B1 符號溝通、C1 道德公民、C3 國際理解",
                        "sourceRef": "arch:s4_review",
                        "motivation": "學測英文非選擇題作文 (20 分) 是決定 14 級分與 15 級分頂標狀元的最高聖杯。大考中心評分四大面向：內容 (5分)、組織 (5分)、文法句構 (4分)、字彙拼字 (4分) + 體例標點 (2分)。本單元解析看圖敘事與雙面論證的滿分骨架與高階表達句庫。",
                        "concepts": [
                            {
                                "title": "學測英文作文經典雙段式黃金架構 (Two-Paragraph Gold Standard)",
                                "formula": "Paragraph 1: Situation Description / Objective Prompt Analysis (約 60-70 字) | Paragraph 2: In-Depth Personal Reflection / Dual Perspective Argumentation (約 70-80 字)",
                                "explanation": "第一段精準描述圖表情境或現象本質；第二段提出個人深刻論述、批判反思與具體解方。總字數控制在 130-160 字為最理想區間。",
                                "example": "P1 depicts the scenario; P2 introduces a personal encounter and draws a moral lesson."
                            },
                            {
                                "title": "提升作文文法檔次的三大高階句型 (Three Elite Sentence Patterns for 18+ Scores)",
                                "formula": "1. 分詞構句 (Feeling..., she...) | 2. 假設語氣倒裝 (Had I known...) | 3. 分裂強調句 (It is ... that ...)",
                                "explanation": "在第二段反思中自然穿插 1-2 個高階句型，能向大考閱卷教授展示卓越的語法驾馭能力，直接躍升至 16-19 分級距！",
                                "example": "It was this profound epiphany that fundamentally reshaped my perspective on failure."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "epiphany", "ipa": "/ɪˈpɪfəni/", "pos": "n.", "zh": "頓悟；神聖啟示", "sentence": "Experiencing that failure triggered an unexpected psychological epiphany." },
                            { "word": "persuasive", "ipa": "/pərˈsweɪsɪv/", "pos": "adj.", "zh": "有說服力的；勸導性的", "sentence": "A persuasive essay combines emotional resonance with logical coherence." },
                            { "word": "exemplary", "ipa": "/ɪɡˈzempləri/", "pos": "adj.", "zh": "模範的；典範的", "sentence": "The essay was hailed as exemplary by the admissions evaluation panel." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Should I memorize pre-written templates for the GSAT essay?", "zh": "我應該為了學測英文作文死背預先寫好的模板嗎？" },
                            { "speaker": "Instructor", "en": "Never memorize rigid templates! Memorize structural transitions, high-level vocabulary, and rhetorical frameworks, then apply them flexibly to the prompt!", "zh": "絕不要死背死板模板！要熟記結構轉折詞、高階詞彙與修辭架構，然後靈活套用於當前題目！" }
                        ],
                        "reading": {
                            "title": "Model Essay: Embracing Solitude in a Hyper-Connected World (範文鑑賞：在高度連結的世界擁抱孤獨)",
                            "strategy": "評分規準對照：分析範文中高階轉折詞、句型多樣性與論點深化技巧。",
                            "text": "In contemporary society, constant digital notifications tether individuals to an incessant stream of online chatter. While smartphones provide instantaneous connection, they paradoxically deprive us of tranquil introspection. It is during deliberate solitude that authentic creativity flourishes, allowing our minds to consolidate memories and synthesize original thoughts. Had I not learned to unplug from virtual networks regularly, my intellectual autonomy would have been subsumed by algorithmic conformity.",
                            "questions": [
                                { "q": "Identify the inverted conditional in the model essay.", "ans": "'Had I not learned to unplug from virtual networks regularly, my intellectual autonomy would have been subsumed...'" }
                            ]
                        },
                        "step0Clue": "寫大考作文動筆前，務必先花 3-5 分鐘列大綱：第一段寫什麼主題句？第二段用什麼個人經驗與高階句型 (分詞/分裂句/假設語氣)！",
                        "formativeQuiz": [
                            {
                                "q": "Which transitional phrase best introduces a profound personal counter-argument in an essay?",
                                "options": [
                                    "And also, I want to say that...",
                                    "Be that as it may, a deeper examination reveals...",
                                    "Because of this, so I think...",
                                    "First of all, I am very happy because..."
                                ],
                                "ans": 1,
                                "hint1": "選項中哪一個展現了學術級的高階讓步轉折修辭？",
                                "hint2": "'Be that as it may' 為典雅高階的讓步轉折片語 (儘管如此)。",
                                "solution": "'Be that as it may, a deeper examination reveals...' 為高階英文論述極具典雅說服力之過渡句。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "用中文思考逐字翻譯，寫出 'People more and more use phones' 這種中式英文。 ❌", "correct": "寫出 'An increasing number of individuals rely heavily on smartphones' 的地道句構。 ✔️", "reason": "中式直譯 (Chinglish) 是大考作文無法突破 12 分的主要元兇。" }
                        ],
                        "checklist": [
                            "我能在大考 100 分鐘考試中合理分配 30-35 分鐘給英文作文並達成 140+ 字",
                            "我的作文中能自然融入至少一個分詞構句與一個假設/強調高階句型"
                        ]
                    },
                    {
                        "id": "g12-s1-u5",
                        "unitNo": "EX-Unit 5",
                        "title": "統測共同科目與專業科目(一)(二)全真突破 (TVE Vocational Joint Exam & ESP Domain English)",
                        "indicator": "TVE: 技專校院入學測驗中心統一入學測驗 (統測英文與外語群群帶)",
                        "competency": "A2 系統思考、B1 符號溝通、B2 科技素養",
                        "sourceRef": "arch:s1_review",
                        "motivation": "針對全國技術型高中 (高職) 百萬學子！徹底破譯統測英文共同科目、外語群英語類專業科目(一)英文閱讀與寫作、專業科目(二)英語聽力與商務對話。掌握技高核心專業英語，奪取國立科大第一志願！",
                        "concepts": [
                            {
                                "title": "統測共同科目四大版塊破題速率 (TVE Common English Speed Strategy)",
                                "formula": "字彙測驗 (8題 5分鐘) -> 對話測驗 (5題 3分鐘) -> 綜合測驗 (7題 7分鐘) -> 閱讀測驗 (10題 15分鐘)",
                                "explanation": "統測英文共同科目著重生活與職場實務溝通。掌握商務、旅遊、科技、飲食與服務業高頻情境用語。",
                                "example": "In business correspondence: 'Enclosed please find the invoice for your perusal.'"
                            },
                            {
                                "title": "外語群專業科目寫作四大評分標準 (TVE ESP Writing Rubric)",
                                "formula": "Sentence Combining (句子合併與改寫) | Guided Writing (引導寫作與應用文書信信件格式)",
                                "explanation": "專業科目包含中譯英、句子改寫 (利用關係詞、分詞構句、倒裝) 以及書信應用文 (Dear Sir/Madam, Yours sincerely)。",
                                "example": "Combine using a relative clause: The technician fixed the machine. It operates flawlessly now."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "vocational", "ipa": "/voʊˈkeɪʃənl/", "pos": "adj.", "zh": "職業的；技術的", "sentence": "Vocational English education blends core language proficiency with specialized industry nomenclature." },
                            { "word": "itinerary", "ipa": "/aɪˈtɪnəreri/", "pos": "n.", "zh": "旅行日程；行程表", "sentence": "The travel agency emailed a detailed conference itinerary to all delegates." },
                            { "word": "perusal", "ipa": "/pəˈruːzl/", "pos": "n.", "zh": "細閱；仔細閱讀", "sentence": "The contracts are attached below for your careful perusal." }
                        ],
                        "dialogue": [
                            { "speaker": "Hotel Desk", "en": "Front desk, how may I assist you this evening, Mr. Johnson?", "zh": "櫃檯您好，約翰遜先生，今晚有什麼我可以協助您的？" },
                            { "speaker": "Guest", "en": "The air conditioning in room 402 is malfunctioning; could you dispatch a technician?", "zh": "402 號房的空調故障了；您可以派一位技師過來嗎？" }
                        ],
                        "reading": {
                            "title": "Smart Logistics and Warehouse Automation (智慧物流與倉儲自動化)",
                            "strategy": "技高職場專業閱讀：抓取物流自動化流程中的專有名詞與效率數據。",
                            "text": "Modern supply chain fulfillment centers rely on Automated Guided Vehicles (AGVs) coordinated by artificial intelligence. Upon receiving an online order, algorithms route robotic carts to retrieve designated storage bins, reducing order processing latency by 65%. Barcode scanners and RFID tracking tags verify cargo accuracy in real time, virtually eliminating sorting human errors during peak shopping holidays.",
                            "questions": [
                                { "q": "By how much did AGVs reduce order processing latency?", "ans": "By 65%." }
                            ]
                        },
                        "step0Clue": "做統測對話測驗時，注意說話者的身份與禮貌等級：如果是顧客與服務生/店員對話，優先選禮貌客氣的委婉句型！",
                        "formativeQuiz": [
                            {
                                "q": "Customer: 'Could you give me a full refund for this defective blender?' Clerk: '________, but company policy only allows exchanges within seven days.'",
                                "options": [
                                    "Never mind",
                                    "I am terribly sorry",
                                    "Don't mention it",
                                    "It's my pleasure"
                                ],
                                "ans": 1,
                                "hint1": "店員表達無法全額退款，只能在七天內換貨。",
                                "hint2": "表示婉拒與歉意，需用委婉抱歉語句。",
                                "solution": "店員婉拒顧客退款要求，禮貌上需先表達遺憾抱歉 'I am terribly sorry'。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "商務書信信末隨意寫 'Bye bye' 或 'See you'。 ❌", "correct": "正式書信信末署名使用 'Sincerely yours,' 或 'Best regards,'。 ✔️", "reason": "統測外語群書信應用文要求嚴謹的正式體例格式，不可使用口語簡訊縮寫。" }
                        ],
                        "checklist": [
                            "我能掌握統測英文共同科目的職場高頻詞彙與情境對話",
                            "我能正確書寫統測外語群英文書信應用文之完整格式規範"
                        ]
                    },
                    {
                        "id": "g12-s1-u6",
                        "unitNo": "EX-Unit 6",
                        "title": "國中教育會考 A++ 決勝題型徹底破解 (CAP A++ Fatal Challenge & Reading Velocity)",
                        "indicator": "JH/CAP: 國中教育會考英語科精熟級 (A++) 頂標滿分題型全解",
                        "competency": "A2 系統思考、B1 符號溝通、B2 科技資訊",
                        "sourceRef": "jh:cap_analysis",
                        "motivation": "國中會考英文要拿 A++ (容錯率僅 1-2 題)，關鍵在於攻克「克漏字時態長篇對照題」與「閱讀素養圖表多文本題」。本單元總結會考 109-115 歷屆最致命魔王陷阱，為國九衝刺與高中銜接建立百分之百制霸信心。",
                        "concepts": [
                            {
                                "title": "會考克漏字三維時間軸判定法 (Three-Dimensional Timeline in CAP Cloze)",
                                "formula": "Past Fact (過去簡單式) <== [Prior Event (過去完成式 had p.p.)] <== Habitual (現在簡單式) ==> Prediction (未來式)",
                                "explanation": "會考克漏字最常考敘事故事中，主角「回憶過去更早發生的事」或「講述不變的哲理真理」，時態跳躍需由前後句動詞精確校準。",
                                "example": "When he arrived at the station, the train had already left."
                            },
                            {
                                "title": "會考多文本圖表長難題交叉審查原則 (CAP Cross-Checking Protocol)",
                                "formula": "Chart Data (時刻/價格/年齡) + Email Text (特殊條件/優惠券) -> 交集處即唯一正解",
                                "explanation": "近年會考每份試卷必定包含 2-3 組長達兩頁的跨領域題組 (小說節錄、時刻表、地圖導航、廣告公告)，不可通篇逐字死讀，需善用檢索關鍵字。",
                                "example": "Map shows ferry terminal; note warns about high tide cancellation after 4 p.m."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "fatal", "ipa": "/ˈfeɪtl/", "pos": "adj.", "zh": "致命的；決定命運的", "sentence": "Avoiding fatal grammar misconceptions guarantees an A++ standing in CAP." },
                            { "word": "cross-reference", "ipa": "/ˌkrɔːs ˈrefrəns/", "pos": "v.", "zh": "交叉參照；相互對照", "sentence": "Cross-reference the flight schedule with the promotional coupon terms." },
                            { "word": "benchmark", "ipa": "/ˈbentʃmɑːrk/", "pos": "n.", "zh": "基準；標竿", "sentence": "CAP score standards serve as an indispensable learning benchmark nationwide." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Why do so many students drop from A+ to A in the last two reading sets?", "zh": "為什麼這麼多學生在最後兩篇閱讀題組從 A+ 掉到 A？" },
                            { "speaker": "Tutor", "en": "Mental fatigue! They lose patience and miss small conditional footnotes at the bottom of posters.", "zh": "大腦疲勞！他們失去耐心，漏看了海報最下方附註的小字條件！" }
                        ],
                        "reading": {
                            "title": "Notice: Heritage Railway Special Autumn Excursion (歷史鐵道秋季專列公告)",
                            "strategy": "多重限制條款比對：比對車票票價、兒童年齡優惠與行李托運限制。",
                            "text": "Mountain Scenic Railway is operating heritage steam locomotives every Saturday throughout October. Standard round-trip tickets cost NT$600. Children aged 6 to 12 receive a 50% discount, while children under 6 ride free when accompanied by a paying adult. Note: Bicycles and oversized luggage exceeding 20 kg are strictly prohibited aboard vintage carriages due to narrow corridors.",
                            "questions": [
                                { "q": "How much does a round-trip ticket cost for an 8-year-old child?", "ans": "NT$300 (50% discount of NT$600)." }
                            ]
                        },
                        "step0Clue": "做會考題組看到海報、門票或時刻表時，第一眼先看最底下的星號 (*) 與 Note:，魔王考題 80% 都出在星號附註的小字裡！",
                        "formativeQuiz": [
                            {
                                "q": "A father travels with his 10-year-old daughter and 4-year-old son on the steam excursion. What is their total ticket cost?",
                                "options": ["NT$600", "NT$900", "NT$1,200", "NT$1,500"],
                                "ans": 1,
                                "hint1": "父親付全票 NT$600。",
                                "hint2": "10 歲女兒半價 (NT$300)，4 歲兒子免票 (NT$0)。",
                                "solution": "父親 600 + 10歲女兒 300 + 4歲兒子 0 = NT$900。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "沒看清楚題目問的是 'one-way' (單程) 還是 'round-trip' (來回)。 ❌", "correct": "在題幹中圈出單程或來回關鍵字，確認計算基數。 ✔️", "reason": "會考數學性英文題目最喜歡在單程與來回票價上設置陷阱。" }
                        ],
                        "checklist": [
                            "我能在會考 60 分鐘內完成聽力與閱讀並保留 10 分鐘檢查劃卡",
                            "我能敏銳揪出多文本閱讀中星號與附註隱藏的所有限制條件"
                        ]
                    }
                ]
            },
            {
                "semId": "g12-s2",
                "title": "高三下學期 (12下 - 國際認證與終生英語力躍升)",
                "examFocus": "第一次模考 (GEPT 中級/中高級高分全策)、第二次模考 (TOEIC 多益 900+ 金色證書核心)、第三次模考 (大學 EMI 全英語授課銜接與終生自主學習全圖景)",
                "units": [
                    {
                        "id": "g12-s2-u7",
                        "unitNo": "EX-Unit 7",
                        "title": "GEPT 全民英檢中級/中高級高分全策 (GEPT Intermediate/High-Intermediate Blueprint)",
                        "indicator": "International/GEPT: LTTC 全民英檢中級與中高級聽說讀寫四大面向評量",
                        "competency": "B1 符號溝通、A1 身心自我精進、C3 國際理解",
                        "sourceRef": "arch:s2_review",
                        "motivation": "全民英檢 (GEPT) 是台灣大專院校畢業門檻、公教人員升遷與雙語高中審查最廣泛採計之國家級英語認證。本單元剖析初試 (聽力、閱讀) 極速破題與複試 (寫作、口說) 的流暢度與文法精確度評分規準。",
                        "concepts": [
                            {
                                "title": "英檢中高級寫作二合一破題架構 (GEPT High-Intermediate Writing Structure)",
                                "formula": "Part 1: Translation (兩題精準中譯英，考倒裝/分詞/子句) | Part 2: Guided Argumentative Essay (150-180 字論說文)",
                                "explanation": "中譯英必須力求文法時態與原中文情感語氣嚴格吻合，不可隨意漏譯修飾語；論說文要求明確立場句 (Thesis) 與對比論述。",
                                "example": "Translate: '儘管面臨經濟不景氣，該科技公司仍持續投資於綠色研發。'"
                            },
                            {
                                "title": "英檢口說回答黃金時長與流暢節奏 (GEPT Speaking Rhythm Mastery)",
                                "formula": "Part 1: Answer Directly (5秒) -> Part 2: Elaborate with Two Concrete Details (15秒) -> Part 3: Personal Example (15秒)",
                                "explanation": "切忌停頓沉默 (Dead air) 超過 3 秒。善用填補詞 (Well, to be frank, in my personal experience) 爭取思考時間。",
                                "example": "Q: Do you prefer studying alone or in a group? A: Without hesitation, I find solitary study far more productive..."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "blueprint", "ipa": "/ˈbluːprɪnt/", "pos": "n.", "zh": "藍圖；詳細計劃", "sentence": "This comprehensive syllabus provides a clear blueprint for mastering the GEPT." },
                            { "word": "spontaneous", "ipa": "/spɑːnˈteɪniəs/", "pos": "adj.", "zh": "自發的；自然的", "sentence": "Fluency evaluates a candidate's ability to produce spontaneous, unscripted discourse." },
                            { "word": "proficient", "ipa": "/prəˈfɪʃnt/", "pos": "adj.", "zh": "精通的；熟練的", "sentence": "High-intermediate certification verifies that a speaker is proficient in academic contexts." }
                        ],
                        "dialogue": [
                            { "speaker": "Interviewer", "en": "What do you think is the best way to handle academic stress?", "zh": "你認為處理學業壓力的最佳方法是什麼？" },
                            { "speaker": "Candidate", "en": "In my experience, maintaining a disciplined sleep schedule combined with regular aerobic exercise acts as the ultimate antidote to cognitive burnout.", "zh": "依我的經驗，維持規律的作息時間並結合規律的有氧運動，是消除大腦疲勞過載的終極解方。" }
                        ],
                        "reading": {
                            "title": "The Evolutionary Function of Storytelling in Human Tribes (人類部落敘事的演化功能)",
                            "strategy": "英檢中高級學術閱讀：分析部落神話與社會凝聚力的因果機制。",
                            "text": "Anthropological research suggests that oral storytelling served as an indispensable survival mechanism for ancestral hominid tribes. Rather than existing merely for entertainment, narratives transmitted survival wisdom regarding dangerous flora, predatory wildlife, and territorial boundaries. Furthermore, collective mythologies fostered inter-tribal empathy and shared normative values, allowing human bands to cooperate at scales unmatched by any other primate species.",
                            "questions": [
                                { "q": "What two critical categories of wisdom were transmitted through ancestral narratives?", "ans": "Survival wisdom about dangers, and collective normative values fostering social cooperation." }
                            ]
                        },
                        "step0Clue": "在英檢中譯英題型中，動筆前先做三件事：1. 圈出中文主詞與動詞；2. 判定時態；3. 挑選最地道的英文句型 (倒裝、分裂句或名詞子句)！",
                        "formativeQuiz": [
                            {
                                "q": "Translate the concept: '儘管天氣惡劣，搜救隊伍仍拒絕放棄希望。'",
                                "options": [
                                    "Although bad weather, the rescue team gave up hope.",
                                    "Despite the adverse weather, the rescue team refused to abandon hope.",
                                    "Because of bad weather, but the rescue team continued.",
                                    "In spite of the weather was bad, the rescue team refused to abandon hope."
                                ],
                                "ans": 1,
                                "hint1": "儘管接名詞片語應用介系詞 Despite 或 In spite of。",
                                "hint2": "In spite of 後不可直接接完整子句 (除非加 the fact that)。",
                                "solution": "Despite the adverse weather (介系詞片語) + 主句 refused to abandon hope。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "英檢口說第一部分自顧自背誦長篇大論，被考官打斷。 ❌", "correct": "依據題目時間鈴聲精確控制回答長度，直接回答提問核心。 ✔️", "reason": "英檢口說重視聽懂問題並切題直接作答，背誦無關範文會被扣分。" }
                        ],
                        "checklist": [
                            "我能熟練掌握英檢中級/中高級初試聽力與長篇閱讀破題心法",
                            "我能在複試中譯英與論說寫作中展現零文法瑕疵的高階英語實力"
                        ]
                    },
                    {
                        "id": "g12-s2-u8",
                        "unitNo": "EX-Unit 8",
                        "title": "TOEIC 多益 900+ 金色證書核心考點 (TOEIC Listening & Reading Gold Level Tactics)",
                        "indicator": "International/TOEIC: ETS 多益聽力與閱讀測驗金色證書 (860-990分) 實戰技法",
                        "competency": "B1 符號溝通、A2 系統思考、B2 科技素養",
                        "sourceRef": "arch:s3_review",
                        "motivation": "多益 (TOEIC) 是全球外商企業、科技巨頭 (TSMC, Google) 與金融機構徵才的最通用門檻。要在 120 分鐘內寫完 200 道高強度商業題並衝破 900 分，掌握 Part 5 (單句填空) 秒殺法與 Part 7 (三篇多文本閱讀) 交叉檢索術是核心關鍵。",
                        "concepts": [
                            {
                                "title": "Part 5 單句填空 15 秒秒殺法則 (TOEIC Part 5 15-Second Blitz)",
                                "formula": "Grammar Question (前後單字定詞性，不看句意 5 秒選出) vs. Vocabulary Question (看動詞搭配詞 15 秒選出)",
                                "explanation": "Part 5 共 30 題，必須在 10 分鐘內全部作答完畢，為 Part 7 留下至少 55 分鐘！",
                                "example": "Ms. Lin reviewed the financial spreadsheet ________ (thorough / thoroughly) before the board meeting. -> Adv modifies reviewed."
                            },
                            {
                                "title": "Part 7 三文本交叉檢索題 (Triple Passage Cross-Referencing in Part 7)",
                                "formula": "Text 1 (網頁公告/產品型錄) + Text 2 (客戶訂購單/客訴電郵) + Text 3 (客服主管回覆) -> 尋找時間、型號與差價交叉點",
                                "explanation": "三文本題的第 3 題與第 5 題，答案必定需要同時整合兩份甚至三份文本的資訊。",
                                "example": "Text 1 lists Model X400 at $200; Text 2 is an invoice for Model X400; Text 3 offers 10% discount on order."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "lucrative", "ipa": "/ˈluːkrətɪv/", "pos": "adj.", "zh": "獲利豐厚的；有利可圖的", "sentence": "The software conglomerate secured a lucrative multi-year defense contract." },
                            { "word": "compliance", "ipa": "/kəmˈplaɪəns/", "pos": "n.", "zh": "法規遵從；合規", "sentence": "Financial institutions must ensure strict compliance with anti-money laundering regulations." },
                            { "word": "reimburse", "ipa": "/ˌriːɪmˈbɜːrs/", "pos": "v.", "zh": "核銷；償還；報銷", "sentence": "The accounting department will reimburse all approved travel expenditures within two weeks." }
                        ],
                        "dialogue": [
                            { "speaker": "Manager", "en": "Have the revised non-disclosure agreements been reviewed by external legal counsel?", "zh": "修訂後的保密協議已經由外部法律顧問審核過了嗎？" },
                            { "speaker": "Assistant", "en": "Yes, our attorney examined them thoroughly and confirmed full compliance with European data privacy mandates.", "zh": "是的，我們的律師已經仔細檢查過，並確認完全符合歐洲資料隱私規範。" }
                        ],
                        "reading": {
                            "title": "Corporate Memo: Transition to Hybrid Workspace Architecture (企業內部備忘錄：轉型混合辦公架構)",
                            "strategy": "多益職場閱讀：快速定位政策生效日期、員工適用對象與申請程序。",
                            "text": "Effective November 1st, Apex Global Logistics will implement a flexible hybrid work model. Full-time personnel who have completed their probationary tenure may telecommute up to two days per working week, subject to departmental managerial approval. To facilitate seamless synchronization, the IT infrastructure division will distribute encrypted laptops and provide monthly broadband stipends of $75.",
                            "questions": [
                                { "q": "What is the maximum number of telecommuting days permitted weekly?", "ans": "Two days per working week." }
                            ]
                        },
                        "step0Clue": "做多益 Part 5 時，先看四個選項：若是同一個單字的不同詞性變化 (e.g., decide, decision, decisive, decisively)，千萬不要讀全文！看空格前後詞性秒殺！",
                        "formativeQuiz": [
                            {
                                "q": "Due to a clerical oversight in the procurement department, the delivery of the industrial microchips was ________ delayed.",
                                "options": ["temporarily", "temporary", "temporariness", "temporal"],
                                "ans": 0,
                                "hint1": "空格位於 was (be動詞) 與 delayed (過去分詞) 之間。",
                                "hint2": "修飾過去分詞動詞 delayed 需要副詞。",
                                "solution": "修飾動詞 delayed 需要副詞，故選 temporarily。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "多益閱讀從 Part 7 單篇開始慢慢推敲，導致最後三篇雙文本與三文本完全沒時間寫只能猜 C。 ❌", "correct": "嚴格控管配速：Part 5 & 6 在 18 分鐘內解決，為 Part 7 預留完整的 55 分鐘！ ✔️", "reason": "多益是一場「資訊檢索耐力賽」，做題配速紀律決定最終成績能否跨越 900 分。" }
                        ],
                        "checklist": [
                            "我能掌握多益 Part 5 詞性填空題 5 秒秒殺技巧",
                            "我能在多益 Part 7 三篇閱讀中精準進行多文件交叉比對"
                        ]
                    },
                    {
                        "id": "g12-s2-u9",
                        "unitNo": "EX-Unit 9",
                        "title": "大學 EMI 全英語授課銜接與口頭簡報 (EMI Academic Listening & Oral Presentation)",
                        "indicator": "Bilingual 2030: 大學全英語授課 (English as a Medium of Instruction) 與學術口頭報告",
                        "competency": "B1 符號溝通、C2 團隊領導與合作、C3 國際理解與跨文化溝通",
                        "sourceRef": "arch:s4_review",
                        "motivation": "因應 2030 雙語政策與頂尖大學 (台大、清大、交大、成大) 全面推動 EMI 全英語授課。本單元培訓高中畢業生無縫銜接大學專業英語課堂：學術聽講速記法 (Cornell Note-Taking)、研討會提問禮儀與專業投影片英文口頭簡報架構。",
                        "concepts": [
                            {
                                "title": "大學講堂康乃爾筆記速記心法 (Cornell Academic Note-Taking System)",
                                "formula": "Right Column (課堂筆記：主論點、縮寫、箭頭) -> Left Column (課後提煉關鍵字與可能考題) -> Bottom (50字核心摘要)",
                                "explanation": "面對外籍教授每分鐘 160 字的高速全英授課，切忌逐字聽抄。善用符號與縮寫 (w/o = without, b/c = because, -> leads to, = equals) 記錄概念鏈。",
                                "example": "Prof explains photosynthesis: Light -> Thylakoid -> ATP + NADPH -> Calvin Cycle (Stroma) -> Glucose."
                            },
                            {
                                "title": "學術口頭簡報標準開場與轉折三部曲 (Three-Stage Presentation Architecture)",
                                "formula": "Hook & Roadmap (吸引注意並交代報告大綱) -> Signposting (清晰章節轉折語) -> Takeaway & Q&A (總結結論並開放提問)",
                                "explanation": "使用標準簡報標記語 (signposts)：'Now let us turn our attention to...', 'This brings me to my next point...', 'To summarize our primary findings...'",
                                "example": "Good morning esteemed colleagues. Today, our research team explores the geopolitical ramifications of semiconductor supply chains."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "ramification", "ipa": "/ˌræmɪfɪˈkeɪʃn/", "pos": "n.", "zh": "後果；衍生影響", "sentence": "Geopolitical friction carries profound ramifications for global microchip production." },
                            { "word": "signposting", "ipa": "/ˈsaɪnpoʊstɪŋ/", "pos": "n.", "zh": "路標語言；指示語", "sentence": "Effective linguistic signposting guides listeners effortlessly through complex seminar arguments." },
                            { "word": "articulate", "ipa": "/ɑːrˈtɪkjuleɪt/", "pos": "v./adj.", "zh": "清楚表達；善於辭令的", "sentence": "Scholars must articulate novel theories with clarity and empirical evidence." }
                        ],
                        "dialogue": [
                            { "speaker": "Student Presenter", "en": "To conclude, decentralized grids mitigate blackouts. I would now be delighted to open the floor to any questions.", "zh": "總結而言，去中心化電網能緩解大停電。我現在非常榮幸開放現場提問。" },
                            { "speaker": "Professor", "en": "Thank you for that lucid overview. Could you elaborate on the capital cost disparities in slide 14?", "zh": "感謝你清晰透徹的概述。你能進一步闡述第 14 頁投影片中的資本成本差異嗎？" }
                        ],
                        "reading": {
                            "title": "Syllabus Excerpt: Advanced Microeconomic Theory (高等個體經濟學全英語授課大綱節錄)",
                            "strategy": "EMI 課程大綱解讀：確認評分權重、期中期末考規範與學術誠信守則。",
                            "text": "Course Code: ECON-301. Lecture Delivery: 100% English. Assessment Weighting: Class Seminar Participation (15%), Bi-weekly Problem Sets (25%), Midterm Examination (30%), and Culminating Research Presentation (30%). Academic Integrity: Plagiarism, including unauthorized deployment of generative AI without explicit citation, constitutes severe scholastic misconduct subject to automatic disciplinary expulsion.",
                            "questions": [
                                { "q": "What is the assessment weighting for the culminating research presentation?", "ans": "30%." }
                            ]
                        },
                        "step0Clue": "在大學 EMI 課堂或簡報提問時，最得體的發問開頭是：'Thank you for your inspiring presentation. I was wondering if you could clarify...'",
                        "formativeQuiz": [
                            {
                                "q": "Which phrase is the most professional signpost to transition to a new topic in an academic presentation?",
                                "options": [
                                    "Okay, now I want to talk about another thing.",
                                    "This brings us directly to our next crucial dimension, which is...",
                                    "Forget what I just said, look at this next slide.",
                                    "Anyway, moving on because time is running out."
                                ],
                                "ans": 1,
                                "hint1": "哪一個選項展現了標準學術簡報的路標銜接語言 (signposting)？",
                                "hint2": "'This brings us directly to our next crucial dimension' 為專業學術過渡標準句式。",
                                "solution": "專業簡報中使用 'This brings us directly to our next crucial dimension...' 能優雅指引聽眾注意力。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "簡報時把演講稿全文密密麻麻貼在投影片上，背對觀眾低頭念稿。 ❌", "correct": "投影片只放核心關鍵字與圖表，眼神堅定注視台下觀眾，手勢自然自信流暢表達。 ✔️", "reason": "投影片是視覺輔助，演講者的眼神交流 (eye contact) 與台風才是簡報成功的核心靈魂。" }
                        ],
                        "checklist": [
                            "我能掌握大學全英語授課之康乃爾速記筆記法",
                            "我能熟練運用標準學術路標語言 (Signposting) 進行 5 分鐘專業全英口頭簡報"
                        ]
                    },
                    {
                        "id": "g12-s2-u10",
                        "unitNo": "EX-Unit 10",
                        "title": "批判性思維與學術思辨寫作 (Critical Thinking, Fallacies & Academic Essay Architecture)",
                        "indicator": "SH/Higher Ed: 批判性思考、邏輯謬誤辨析與學術思辨寫作",
                        "competency": "A2 系統思考與問題解決、B1 符號運用、C1 道德公民實踐",
                        "sourceRef": "arch:s4_review",
                        "motivation": "英語不僅是溝通工具，更是「嚴密理性思辨」的作業系統。本單元剖析常見七大邏輯謬誤 (如滑坡謬誤、稻草人謬誤、以偏概全)，並傳授大學程度學術論文引言 (Introduction)、正反反駁 (Counter-argument & Rebuttal) 與結論 (Conclusion) 的精密架構。",
                        "concepts": [
                            {
                                "title": "三大常見學術邏輯謬誤辨識 (Three Core Logical Fallacies in Academic Writing)",
                                "formula": "Straw Man (稻草人謬誤：曲解對方論點) | Slippery Slope (滑坡謬誤：極端連鎖假想) | Ad Hominem (人身攻擊：針對個人非論點)",
                                "explanation": "批判性思維的核心就是檢驗論證的前提是否扎實、推導鏈是否有效，避免被情緒煽動或虛假相關性所誤導。",
                                "example": "Claiming 'If we allow this minor amendment, total tyranny will inevitably result tomorrow' is a classic slippery slope."
                            },
                            {
                                "title": "駁論結構三部曲 (The Anatomy of Counter-Argument and Rebuttal)",
                                "formula": "Acknowledge (承認反方觀點之合理性) -> Pivot (以 While / Although / Admittedly 轉折) -> Refute with Empirical Evidence (提出更有力之反駁證據)",
                                "explanation": "最高分的學術作文絕不對反對意見視而不見，而是主動提出反對論點並透過實證數據徹底予以反駁，展現客觀宏大的思辨器度。",
                                "example": "Admittedly, solar installations entail initial capital costs. However, life-cycle operational savings far surpass conventional alternatives."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "fallacy", "ipa": "/ˈfæləsi/", "pos": "n.", "zh": "謬誤；謬論", "sentence": "Critical thinking exposes hidden logical fallacies in political propaganda." },
                            { "word": "rebuttal", "ipa": "/rɪˈbʌtl/", "pos": "n.", "zh": "反駁；抗辯", "sentence": "Her cogent rebuttal dismantled the opposition's empirical methodology." },
                            { "word": "cogent", "ipa": "/ˈkoʊdʒənt/", "pos": "adj.", "zh": "令人信服的；強有力的", "sentence": "The defense presented a cogent argument substantiated by genetic evidence." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Why should I include counter-arguments in my own persuasive essay? Won't that weaken my position?", "zh": "為什麼我要在自己的說服性文章中包含反對論點？這不會削弱我的立場嗎？" },
                            { "speaker": "Professor", "en": "On the contrary! Addressing opposing viewpoints demonstrates intellectual honesty and makes your ultimate rebuttal infinitely more persuasive!", "zh": "恰恰相反！正視反對觀點展現了學術誠實，並使你最終的反駁更具無可辯駁的說服力！" }
                        ],
                        "reading": {
                            "title": "The Dangers of Confirmation Bias in Algorithmic Societies (演算法社會中確認偏誤的危機)",
                            "strategy": "邏輯論證結構解構：標註文章中的前題、論點、反方意見與作者最終反駁。",
                            "text": "Confirmation bias—the human cognitive inclination to embrace information confirming pre-existing beliefs while ignoring disconfirming data—has been dramatically amplified by algorithmic content feeds. Critics argue that users bear individual responsibility for curating diverse perspectives. Admittedly, personal media literacy is indispensable. However, when recommendation engines are mathematically optimized for engagement over veracity, individual willpower alone cannot withstand systemic behavioral engineering.",
                            "questions": [
                                { "q": "What counter-argument does the author acknowledge before presenting their rebuttal?", "ans": "The argument that users bear individual responsibility for curating diverse perspectives." }
                            ]
                        },
                        "step0Clue": "在撰寫思辨性作文時，想要拿到滿分，一定要寫一句：'Admittedly, proponents of X argue that... However, this overlooks the fact that...'！",
                        "formativeQuiz": [
                            {
                                "q": "What logical fallacy occurs when someone distorts an opponent's argument to make it easier to attack?",
                                "options": ["Ad Hominem", "Straw Man Fallacy", "Circular Reasoning", "Slippery Slope"],
                                "ans": 1,
                                "hint1": "將對手的論點故意曲解或誇大成一個脆弱的假目標。",
                                "hint2": "就像在田中立一個稻草人來痛打一樣。",
                                "solution": "曲解或誇大他人論點以便攻擊，稱為「稻草人謬誤 (Straw Man Fallacy)」。故選 B。"
                            }
                        ],
                        "traps": [
                            { "wrong": "在作文中宣稱「所有人都知道這一定是對的」或「只有傻瓜才會反對」。 ❌", "correct": "使用嚴謹學術限定詞「Empirical evidence indicates that...」或「Scholars suggest...」。 ✔️", "reason": "學術思辨最忌諱情緒化斷言與人身攻擊，必須以客觀證據為論證依歸。" }
                        ],
                        "checklist": [
                            "我能識別並破解日常與學術論辯中常見的邏輯謬誤",
                            "我能在英文論文中熟練構建「承認反方 -> 轉折 -> 實證反駁」的頂級思辨段落"
                        ]
                    },
                    {
                        "id": "g12-s2-u11",
                        "unitNo": "EX-Unit 11",
                        "title": "全真跨域綜合大考終極模擬 (Comprehensive Cross-Discipline Diagnostic Exam)",
                        "indicator": "SH/Unified: 108 課綱各考科跨領域核心素養終極整合檢定",
                        "competency": "全人核心素養九大面向全景融合應用",
                        "sourceRef": "arch:s4_review",
                        "motivation": "集結高中三年、國中會考與國際認證的最高綜合驗收。涵蓋文學、科技、倫理、跨文化與全球治理，在多文本長難句與圖表矩陣中鍛造頂標直覺，為所有面臨大考與人生的學子注入無堅不摧的實力。",
                        "concepts": [
                            {
                                "title": "大考倒數全景心智調適矩陣 (Final Examination Psychological Protocol)",
                                "formula": "Syntactic Confidence (文法自信) + Rapid Scanning (檢索速度) + Emotional Composure (臨場沉著)",
                                "explanation": "臨場大考比拼的不僅是記憶力，更是心理素質。面對沒看過的新穎生字與長文，保持深呼吸，利用詞根與上下文脈絡化繁為簡。",
                                "example": "Maintain steady breathing; parse complex sentences by finding the main predicate verb first."
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "composure", "ipa": "/kəmˈpoʊʒər/", "pos": "n.", "zh": "鎮靜；沉著", "sentence": "Emotional composure during high-stakes testing unlocks optimal cognitive recall." },
                            { "word": "diagnostic", "ipa": "/ˌdaɪəɡˈnɑːstɪk/", "pos": "adj.", "zh": "診斷的；分析評估的", "sentence": "Diagnostic mock examinations expose subtle conceptual blind spots before official testing." },
                            { "word": "culmination", "ipa": "/ˌkʌlmɪˈneɪʃn/", "pos": "n.", "zh": "頂點；集大成", "sentence": "This exam represents the glorious culmination of twelve years of secondary scholarship." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "I'm ready. How should I approach the final exam tomorrow?", "zh": "我準備好了。明天上考場我該抱持什麼心態？" },
                            { "speaker": "Master Teacher", "en": "Trust your preparation. Treat every question as an intellectual puzzle to solve with curiosity and precision!", "zh": "相信你的萬全準備。把每一道題目當作一場智力謎題，帶著好奇心與精確度從容破解！" }
                        ],
                        "reading": {
                            "title": "The Symphony of Human Civilization: A Retrospective on Progress (人類文明的交響樂章：歷史進程之回顧)",
                            "strategy": "終極綜合跨域閱讀：整合分詞構句、倒裝句、虛擬語氣與篇章邏輯脈絡。",
                            "text": "Standing upon the shoulders of countless generations, modern civilization possesses unprecedented technological capabilities. Had our ancestors not dared to venture across uncharted oceans and question scholastic dogmas, the Enlightenment that emancipated human reason would never have ignited. Yet, with immense power comes existential responsibility. As we stand on the threshold of the interplanetary and synthetic intelligence eras, it is our moral empathy and universal solidarity that must guide our collective trajectory.",
                            "questions": [
                                { "q": "According to the author, what must guide our collective trajectory in the new era?", "ans": "Our moral empathy and universal solidarity." }
                            ]
                        },
                        "step0Clue": "在終極考場上，相信自己做過的所有努力： Step 0 先定心，圈動詞，找主幹，答案自現！",
                        "formativeQuiz": [
                            {
                                "q": "Had our ancestors not dared to question dogmas, the Enlightenment ________.",
                                "options": [
                                    "would never have ignited",
                                    "will never ignite",
                                    "would never ignite",
                                    "had never ignited"
                                ],
                                "ans": 0,
                                "hint1": "前句為 Had our ancestors not dared... (與過去相反之省略 if 倒裝句)。",
                                "hint2": "主要子句表達與過去事實相反之結果，公式為 would have + p.p.。",
                                "solution": "與過去相反之假設語氣，主要子句需用 would have + p.p. (would never have ignited)。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "考試結束鐘響前 3 分鐘還在猶豫改答案，把原本正確的直覺改錯。 ❌", "correct": "除非在原文中找到 100% 確鑿的相反反證，否則相信自己的第一直覺不輕易改答案。 ✔️", "reason": "統計學研究顯示，考生在最後一刻因焦慮而更改的答案，超過 60% 是將原本正確的選項改為錯誤選項。" }
                        ],
                        "checklist": [
                            "我能從容面對長達五頁的高強度跨學科大考題組",
                            "我已掌握應考心態調適與時間分配的最高準則"
                        ]
                    },
                    {
                        "id": "g12-s2-u12",
                        "unitNo": "EX-Unit 12",
                        "title": "終生自主學習與英語力全景指南 (Lifelong Autonomous English Mastery Roadmap)",
                        "indicator": "Lifelong: 108 課綱終身學習者自主精進全景藍圖",
                        "competency": "自主行動、溝通互動、社會參與三大面向終身實踐",
                        "sourceRef": "arch:s4_review",
                        "motivation": "高中畢業不是英語學習的終點，而是以英語探索宇宙真理的起點！本單元為所有學習者打造「終身自主英語力進化系統」：如何利用國際播客 (Podcasts)、學術開放式課程 (Coursera, edX)、原文書籍精讀、以及 AI 語言模型成為永不懈怠的個人英文教練。",
                        "concepts": [
                            {
                                "title": "終身自主英語學習飛輪效應 (The Lifelong Autonomous Flywheel)",
                                "formula": "High-Quality Input (優質英文原版輸入) -> Cognitive Synthesis (筆記與知識內化) -> Authentic Output (部落格/演講/交流輸出) -> Continuous Feedback (反思精進)",
                                "explanation": "將英語從「考試學科」轉化為「日常生活思維語言」。每天沉浸 30 分鐘優質英語內容，十年間累積的複利效應將徹底重塑人生軌跡。",
                                "example": "Listen to BBC Radio 4 or NPR daily; engage in international seminars and academic exchange."
                            },
                            {
                                "title": "AI 時代人機協作英文精進術 (Human-AI Synergistic Language Mastery)",
                                "formula": "Prompt Engineering for Language Acquisition (設計情境對話、寫作評分規準檢驗、口音糾正)",
                                "explanation": "善用生成式 AI 扮演蘇格拉底式導師，主動要求 AI 指出自己文法盲點與用詞不自然處，達成 24 小時個人化刻意練習。",
                                "example": "Prompt: 'Act as an academic editor. Critique my essay for discourse flow and suggest three natural collocations.'"
                            }
                        ],
                        "phonicsVocab": [
                            { "word": "autonomous", "ipa": "/ɔːˈtɑːnəməs/", "pos": "adj.", "zh": "自主的；自治的", "sentence": "Autonomous learners take proactive responsibility for diagnosing their own developmental frontiers." },
                            { "word": "flywheel", "ipa": "/ˈflaɪwiːl/", "pos": "n.", "zh": "飛輪效應；慣性輪", "sentence": "Consistent daily habit formation creates an unstoppable language acquisition flywheel." },
                            { "word": "indomitable", "ipa": "/ɪnˈdɑːmɪtəbl/", "pos": "adj.", "zh": "不屈不撓的；堅毅的", "sentence": "An indomitable spirit transforms linguistic challenges into stepping stones toward global mastery." }
                        ],
                        "dialogue": [
                            { "speaker": "Student", "en": "Now that our high school curriculum is complete, how do I keep improving my English every day?", "zh": "現在我們的高中課程全部完成了，我該如何每天繼續精進英文？" },
                            { "speaker": "Lifelong Mentor", "en": "Read widely, listen curiously, write reflectively, and speak fearlessly. English is not a test to pass, but a window through which to love the world!", "zh": "廣泛閱讀、好奇聆聽、深思寫作、無畏表達。英文不是用來通過的考試，而是一扇讓你熱愛這個世界的窗戶！" }
                        ],
                        "reading": {
                            "title": "A Window to the World: The Lifelong Odyssey of Language (世界的窗戶：語言的終生奧德賽之旅)",
                            "strategy": "全篇哲理反思：感悟英語作為跨越文化邊界與心靈交融之媒介價值。",
                            "text": "To master a language is to acquire a second soul. Throughout this educational odyssey, we have explored the delicate architecture of phonemes, the rigorous logic of clauses, and the transcendent majesty of discourse. Beyond every examination, certificate, and academic milestone lies the true power of language: the capacity to comprehend diverse human hearts, to dismantle barriers of prejudice, and to articulate profound truths across oceans and epochs.",
                            "questions": [
                                { "q": "According to the passage, what is the true power of language beyond examinations?", "ans": "The capacity to comprehend diverse human hearts, dismantle barriers of prejudice, and articulate profound truths." }
                            ]
                        },
                        "step0Clue": "在終身學習的旅程上，永遠記住 Step 0：好奇心 (Curiosity) 是最好的老師，堅持 (Consistency) 是最快的捷徑！",
                        "formativeQuiz": [
                            {
                                "q": "According to the passage, mastering a second language allows an individual to ________.",
                                "options": [
                                    "acquire a second soul and comprehend diverse human hearts",
                                    "eliminate all historical misunderstandings immediately",
                                    "guarantee immediate material wealth across industries",
                                    "replace their native cultural identity entirely"
                                ],
                                "ans": 0,
                                "hint1": "閱讀短文的第一句與最後一句。",
                                "hint2": "原文提到 'To master a language is to acquire a second soul' 並能理解不同的心靈。",
                                "solution": "文章開宗明義指出掌握一門語言等於獲得第二個靈魂，並能理解多元的人類心靈。故選 A。"
                            }
                        ],
                        "traps": [
                            { "wrong": "考完大考就把所有英文書本丟掉，半年不讀不看導致字彙迅速退化。 ❌", "correct": "將手機系統設為英文，每天閱讀外媒一篇或聽英文 Podcast，保持終生語感。 ✔️", "reason": "語言習得如同肌肉鍛鍊，唯有將其融入日常生活的終生實踐，才能永保巔峰。" }
                        ],
                        "checklist": [
                            "我建立了終身自主學習英語的個人資源庫 (Podcast, AI 工具, 閱讀清單)",
                            "我深信語言是我連結世界、實現抱負與造福社會的強大之翼"
                        ]
                    }
                ]
            }
        ]
    }

def get_unified_grades():
    from full_curriculum_data import get_g6, get_g7, get_g8, get_g9
    return [
        get_g6(),
        get_g7(),
        get_g8(),
        get_g9(),
        get_g10(),
        get_g11(),
        get_g12()
    ]
'''

with open("scripts/full_curriculum_data.py", "a", encoding="utf-8") as f:
    f.write(g10_g11_g12_code)

print("Appended G10, G11, G12 and get_unified_grades() successfully.")
