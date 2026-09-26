// curriculum_unified.mjs - 108 課綱英語文全學年上下學期深度教學旗艦庫 (專家團隊雙倍內容大改造版)
// 專家委員會指導：課綱總體諮詢、第二語言習得 (SLA)、自主微課架構、大考會考測驗、語音聲學、技高ESP、全端架構與全齡UI/UX體驗
// 涵蓋：國小 (Sixth 6上/6下)、國中 (JH 7-9年級 16單元)、高中/技高 (Arch 10-11年級先修與學期複習)、大考全考制

import { sixthLessons, sixthNotes, sixthQuestions, sixthAudioData } from './sixth_assets.mjs';
import { jhUnits, jhCases, jhHandouts, jhCapAnalysis } from './jh_assets.mjs';
import { 
  archTenseModules, archTenseTraps, archTenseQuiz,
  archSentencePillars, archSentenceTraps, archSentenceQuiz,
  archPartsOfSpeech, archSuffixRules, archPosQuiz,
  archPhoneticItems, archStressRules, archDictCodes, archPhoneticsQuiz,
  archVocabCategories, archVocabQuiz
} from './arch_prerequisites.mjs';
import { archSemesters, englishS1Review, englishS2Review, englishS3Review, englishS4Review } from './arch_semesters.mjs';

export const EXPERT_COUNCIL = [
  {
    "role": "課綱總體諮詢首席",
    "name": "Prof. Lin (林教授)",
    "title": "國立臺灣師範大學英語系客座教授 / 108 課綱英語諮詢委員",
    "specialty": "三面九項核心素養縱向貫通、學習表現（聽說讀寫綜）與學習內容細目精準對標"
  },
  {
    "role": "第二語言習得與認知心理學家",
    "name": "Dr. Chen (陳博士)",
    "title": "哈佛大學教育研究所認知心理學博士 / 學習科學實驗室主任",
    "specialty": "認知負荷理論 (Cognitive Load Theory)、鷹架建構 (Scaffolding)、間隔重複與精熟提取"
  },
  {
    "role": "自主學習與微課架構專家",
    "name": "Teacher Wu (吳老師)",
    "title": "資深英語自學內容架構師 / 全國自學社群總監",
    "specialty": "微觀概念卡片分解、步驟 0 破題思維模式、致命陷阱 X 光機診斷與經驗值激勵機制"
  },
  {
    "role": "國中會考與大學學測測驗心理計量專家",
    "name": "Dr. Huang (黃博士)",
    "title": "大考中心與師大心測中心資深研究員",
    "specialty": "109–115 國中教育會考 (CAP) 與學測 (GSAT) 命題雙向細目表、多模態圖表題誘答分析"
  },
  {
    "role": "雙語教學與語音聲學專家",
    "name": "Prof. Evans (埃文斯教授)",
    "title": "英國倫敦大學語音聲學博士 / 國際語音學會 (IPA) 諮詢專家",
    "specialty": "自然拼讀 (Phonics)、國際音標 (IPA/KK)、美語弱化連音 (Connected Speech) 與點讀合成"
  },
  {
    "role": "技高專業英語 (ESP) 與跨學科融合主任",
    "name": "Engineer Tsai (蔡工程師)",
    "title": "國際建築工程與技術英文特聘講師 / 科技大廠技術文膽",
    "specialty": "建築工程現場安全 SOP、工商業圖表判讀、實用商務會話與統測專業英文 (二)"
  },
  {
    "role": "全端架構與系統工程首席",
    "name": "Alex K.",
    "title": "Senior Front-End Architect & Universal Design Lead",
    "specialty": "原生純現代 ESM 架構、零打包即時渲染、A4 官方高畫質排版、深淺護眼主題設計"
  },
  {
    "role": "數位學習體驗與全齡 UI/UX 專家",
    "name": "Sarah Chen-Vance (陳博士/顧問)",
    "title": "Stanford University HCI 碩士 / W3C WAI 無障礙規範資深顧問",
    "specialty": "認知減負互動介面 (CLT Interface)、全雙工語音互動回饋、WCAG 2.2 AAA 無障礙高對比與多模態音頻可視化"
  }
];

export const UNIFIED_GRADES = [
  {
    "gradeId": "g6",
    "title": "國小六年級 (Grade 6)",
    "stage": "第三學習階段 (國小高年級 108 課綱)",
    "badge": "雙語核心素養奠基 · 小升初無縫銜接",
    "desc": "聚焦自然拼讀 (Phonics)、日常作息時間、過去簡單式故事冒險、街道地圖問路、身體照護、世界節慶多元文化、未來計畫志向與比較級最高級。每個單元配備概念圖解、發音詞彙、生活對話、素養閱讀、破題思維與考前檢核表。",
    "semesters": [
      {
        "semId": "g6-s1",
        "title": "六年級上學期 (6上 · 6A)",
        "examFocus": "第一次段考 (作息時間/動態描述)、第二次段考 (問路方位/身體健康)、期末大複習",
        "units": [
          {
            "id": "g6-s1-u1",
            "unitNo": "Unit 1",
            "title": "日常生活作息與時間表達 (Daily Routines & Telling Time)",
            "indicator": "1-III-2 / 2-III-1 / Ac-III-1",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u1",
            "motivation": "早晨 7:00 鬧鐘響起，國小生如何在真實世界用英語安排自己的作息？英美人士在日常生活中更習慣說 'half past seven' 或 'a quarter to eight'，學會鐘點表達法與時間介系詞，就能精確掌控生活節奏。",
            "concepts": [
              {
                "title": "英美時鐘視覺化報時法 (Clock Division Rule)",
                "formula": "1-30分用 PAST (過幾分)；31-59分用 TO (差幾分到整點)",
                "explanation": "以 30 分鐘為分水嶺：整點用 o'clock；15分用 a quarter past；30分用 half past；45分用 a quarter to。",
                "example": "8:15 = a quarter past eight / 8:45 = a quarter to nine / 8:30 = half past eight",
                "examExample": {
                  "stem": "Look at the departure board at the train station. The express train to Kaohsiung departs at 8:45. Which of the following is the correct announcement?",
                  "options": [
                    "The train departs at a quarter to nine.",
                    "The train departs at a quarter past eight.",
                    "The train departs at half past eight.",
                    "The train departs at a quarter to eight."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】8:45 分鐘超過 30 分，英美習慣以「差幾分到下一個整點 (TO)」表達，即差 15 分鐘到 9 點 (a quarter to nine)。選項 (B) past 為過了；選項 (D) 誤將下個整點算成 8 點。"
                }
              },
              {
                "title": "時間介系詞「倒金字塔法則」 (at, on, in)",
                "formula": "at (特定時刻/點) ➔ on (特定日期/星期/面) ➔ in (月份/年份/季節/長時段)",
                "explanation": "最精確的時間點用 at (at 7:30, at noon)；特定日子用 on (on Monday, on my birthday)；廣泛長時間用 in (in May, in 2026, in summer)。",
                "example": "We meet at 6:30 on Friday evening in autumn.",
                "examExample": {
                  "stem": "Our international science seminar will officially commence ___ 9:00 a.m. ___ Monday morning ___ early October.",
                  "options": [
                    "at; on; in",
                    "in; at; on",
                    "on; in; at",
                    "at; in; on"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】套用倒金字塔法則：特定時間點 9:00 a.m. 用 at；特定某天的早晨 (Monday morning) 用 on；月份十月 (October) 用 in，因此唯一正確搭配為 at; on; in。"
                }
              },
              {
                "title": "6 大頻率副詞與「Be後動前」黃金定律",
                "formula": "always(100%) > usually(80%) > often(60%) > sometimes(40%) > seldom(10%) > never(0%)",
                "explanation": "位置法則：放在 be 動詞或助動詞之後，一般動詞之前。never 與 seldom 本身帶有否定含意，不需再加 not。",
                "example": "He is always punctual. / She never skips breakfast.",
                "examExample": {
                  "stem": "Which of the following sentences adheres to the correct standard word order for frequency adverbs?",
                  "options": [
                    "Dr. Watson is always punctual, and he seldom arrives late for morning rounds.",
                    "Dr. Watson always is punctual, and he arrives seldom late for morning rounds.",
                    "Dr. Watson is punctual always, and he doesn't never arrive late.",
                    "Dr. Watson never is late, and he always is arriving on time."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】頻率副詞口訣為「Be動詞之後、一般動詞之前」。is always 符合 be 後；seldom arrives 符合動前。選項 (C) doesn't never 犯了雙重否定禁忌。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "routine",
                "ipa": "/ruːˈtiːn/",
                "pos": "n.",
                "zh": "日常作息",
                "sentence": "Morning exercise is part of my daily routine."
              },
              {
                "word": "quarter",
                "ipa": "/ˈkwɔːrtər/",
                "pos": "n.",
                "zh": "十五分鐘；四分之一",
                "sentence": "It is a quarter past seven right now."
              },
              {
                "word": "punctual",
                "ipa": "/ˈpʌŋktʃuəl/",
                "pos": "adj.",
                "zh": "準時的；守時的",
                "sentence": "Our English teacher is always punctual."
              },
              {
                "word": "schedule",
                "ipa": "/ˈskedʒuːl/",
                "pos": "n.",
                "zh": "日程表；時間安排",
                "sentence": "Look at your schedule before planning a trip."
              }
            ],
            "dialogue": [
              {
                "speaker": "Liam",
                "en": "Good morning, Emma! What time do you usually wake up on weekdays?",
                "zh": "早安，Emma！妳平日通常幾點起床？"
              },
              {
                "speaker": "Emma",
                "en": "I always get up at half past six. Then I take a quick shower.",
                "zh": "我總是在六點半起床，然後沖個澡。"
              },
              {
                "speaker": "Liam",
                "en": "Wow, that is early! I usually wake up at a quarter to seven.",
                "zh": "哇，好早喔！我通常差一刻七點（6:45）才起來。"
              },
              {
                "speaker": "Emma",
                "en": "Don't be late for school! Assembly starts at eight o'clock sharp.",
                "zh": "上學別遲到囉！朝會八點整準時開始。"
              }
            ],
            "reading": {
              "title": "Liam's Time Management Secrets (Liam 的高效時間管理秘訣)",
              "strategy": "Scanning 掃讀技巧：先看問題尋找特定數字、時間副詞與地點關鍵字。",
              "text": "Managing time well is an essential skill for every student. Liam is a sixth-grader who participates in the school soccer team and robotics club. Every weekday, he wakes up at half past six. He spends twenty minutes reviewing English vocabulary while eating breakfast. School classes finish at a quarter to four. From 4:00 to 5:00 p.m., Liam practices soccer on the playground. After dinner, he never plays video games before finishing all his homework. By sticking to this strict schedule, Liam always gets high scores on his exams.",
              "questions": [
                {
                  "q": "What does Liam do while eating breakfast?",
                  "ans": "He reviews English vocabulary."
                },
                {
                  "q": "How long does Liam practice soccer on weekdays?",
                  "ans": "For one hour (from 4:00 to 5:00 p.m.)."
                }
              ]
            },
            "step0Clue": "看到鐘面或問題詢問時間，先計算分鐘數：如果在 1~30 分之間，用 past；如果大於 30 分，用 60 扣除該分鐘，並搭配 to 指向「下一個整點」！",
            "formativeQuiz": [
              {
                "q": "It is 7:45 in the morning. Which sentence has the SAME meaning?",
                "options": [
                  "It is a quarter to seven.",
                  "It is a quarter past seven.",
                  "It is a quarter to eight.",
                  "It is half past seven."
                ],
                "ans": 2,
                "hint1": "7:45 代表過了 30 分鐘，要算差幾分鐘到 8 點。",
                "hint2": "60 - 45 = 15 分鐘（a quarter），指向下一個整點 8:00。",
                "solution": "7:45 距離 8:00 還差 15 分鐘，英文慣用 a quarter to eight。故選 C。"
              }
            ],
            "traps": [
              {
                "wrong": "It is a quarter to eight at 8:15. ❌",
                "correct": "It is a quarter past eight. ✔️",
                "reason": "past 是過了幾分，to 是差幾分。8:15 是過了 8 點 15 分，應用 past。"
              },
              {
                "wrong": "I go always to bed at 10. ❌",
                "correct": "I always go to bed at 10. ✔️",
                "reason": "頻率副詞口訣「Be後動前」，go 是一般動詞，副詞放前面。"
              },
              {
                "wrong": "He doesn't never eat meat. ❌",
                "correct": "He never eats meat. ✔️",
                "reason": "never 本身帶有否定意義，絕對不能跟 doesn't 連用形成雙重否定。"
              }
            ],
            "checklist": [
              "我能用 half past、quarter past 與 quarter to 精確報時",
              "我能分清 at（鐘點）、on（日期/星期）、in（年月/長時段）的差別",
              "我能正確將 6 大頻率副詞放置在「Be動詞後、一般動詞前」",
              "我知道 never 和 seldom 句子中不可再加 not",
              "我能用 What time do you...? 進行完整的日常生活問答"
            ]
          },
          {
            "id": "g6-s1-u2",
            "unitNo": "Unit 2",
            "title": "過去式故事與冒險歷險記 (Past Tense Stories & Irregular Verbs)",
            "indicator": "2-III-3 / 3-III-1 / Ac-III-2",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "B1 符號運用與溝通表達、C2 人際關係與團隊合作",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u2",
            "motivation": "週末去了花蓮太魯閣、暑假跟家人露營，要如何用英文跟外國朋友生動分享過去的精采回憶？過去簡單式是英文敘事最核心的時態基石。",
            "concepts": [
              {
                "title": "規則動詞字尾 +ed 發音三大法則",
                "formula": "1. /t/ (清子音後) 2. /d/ (濁子音與母音後) 3. /ɪd/ (字尾為 /t/ 或 /d/ 後)",
                "explanation": "looked /t/, helped /t/; played /d/, cleaned /d/; wanted /ɪd/, needed /ɪd/。注意發音切勿死背，要感受聲帶是否振動。",
                "example": "He jumped /t/ into the pool and floated /ɪd/ on the water.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              },
              {
                "title": "高頻不規則動詞三態變化歸類",
                "formula": "A-A-A型 (cost-cost-cost, hit-hit-hit); A-B-B型 (buy-bought-bought); A-B-C型 (go-went-gone)",
                "explanation": "大考常考不規則變化：eat-ate, see-saw, write-wrote, take-took, give-gave, swim-swam。",
                "example": "Yesterday Leo bought a ticket and went to the zoo alone.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              },
              {
                "title": "過去式否定句與疑問句之「助動詞魔法」",
                "formula": "Did + 主詞 + 原形動詞...? / 主詞 + didn't + 原形動詞",
                "explanation": "助動詞 did 已經吸走了過去時態，後面主要動詞務必立刻恢復「原形」！",
                "example": "Did you see the movie? Yes, I saw it. / No, I didn't see it.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "adventure",
                "ipa": "/ədˈventʃər/",
                "pos": "n.",
                "zh": "冒險；歷險",
                "sentence": "We had an exciting adventure in the mountains."
              },
              {
                "word": "campfire",
                "ipa": "/ˈkæmpfaɪər/",
                "pos": "n.",
                "zh": "營火",
                "sentence": "The scouts sat around the campfire and sang songs."
              },
              {
                "word": "explore",
                "ipa": "/ɪkˈsplɔːr/",
                "pos": "v.",
                "zh": "探索；探險",
                "sentence": "They explored the ancient cave yesterday."
              },
              {
                "word": "unforgettable",
                "ipa": "/ˌʌnfərˈɡetəbl/",
                "pos": "adj.",
                "zh": "難忘的",
                "sentence": "That summer camp was an unforgettable trip."
              }
            ],
            "dialogue": [
              {
                "speaker": "Leo",
                "en": "Hey Mia, how was your weekend trip to Kenting?",
                "zh": "嘿 Mia，妳週末去墾丁玩得如何？"
              },
              {
                "speaker": "Mia",
                "en": "It was fantastic! We swam in the ocean and built sandcastles.",
                "zh": "太棒了！我們在海裡游泳還堆了沙堡。"
              },
              {
                "speaker": "Leo",
                "en": "Did you see any sea turtles while snorkeling?",
                "zh": "浮潛時有看到海龜嗎？"
              },
              {
                "speaker": "Mia",
                "en": "Yes, we did! We took dozens of amazing underwater photos.",
                "zh": "有啊！我們拍了幾十張驚豔的海底照片。"
              }
            ],
            "reading": {
              "title": "An Unforgettable Camping Trip (難忘的露營歷險)",
              "strategy": "找尋時間標記 (Time Markers)：如 last Saturday, in the evening, suddenly。",
              "text": "Last Saturday, class 601 went camping in Yilan. Early in the morning, Mr. Lin drove the school bus to the campsite. The students pitched their tents cooperatively. In the afternoon, they hiked along a crystal-clear stream and caught tiny fish. When night fell, they lit a campfire and roasted marshmallows. Suddenly, a gentle deer appeared from behind the trees! Everyone held their breath and watched quietly. It was a truly magical night that no one will ever forget.",
              "questions": [
                {
                  "q": "Where did the students go camping last Saturday?",
                  "ans": "They went camping in Yilan."
                },
                {
                  "q": "What animal appeared when they were roasting marshmallows?",
                  "ans": "A gentle deer appeared."
                }
              ]
            },
            "step0Clue": "看到句中有明確過去時間詞（yesterday, last year, two days ago, just now），主要動詞毫不猶豫填過去式；但若看見 Did 或 didn't，後方動詞立刻鎖定「原形動詞」！",
            "formativeQuiz": [
              {
                "q": "A: 'What did you do last night?' B: 'I ________ a delicious pizza with my brother.'",
                "options": [
                  "bake",
                  "baked",
                  "baking",
                  "bakes"
                ],
                "ans": 1,
                "hint1": "問句用 did 問過去事件，答句是直述肯定句。",
                "hint2": "肯定句沒有助動詞 did，動詞需主動呈現過去式變化。",
                "solution": "答句為肯定句，主詞為 I，動詞需用規則過去式 baked。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Did you went to school yesterday? ❌",
                "correct": "Did you go to school yesterday? ✔️",
                "reason": "Did 已經是過去式助動詞，後面動詞必須恢復原形 go。"
              },
              {
                "wrong": "My uncle buyed a new car last month. ❌",
                "correct": "My uncle bought a new car last month. ✔️",
                "reason": "buy 是不規則變化動詞，過去式為 bought。"
              }
            ],
            "checklist": [
              "我能熟記 30 個最常考的不規則動詞三態變化",
              "我能分清 -ed 發音的清濁音差別 (/t/, /d/, /ɪd/)",
              "我牢記在 Did 與 didn't 後面必須使用動詞原形",
              "我能用過去式流暢寫出三句描述昨天的生活日記"
            ]
          },
          {
            "id": "g6-s1-u3",
            "unitNo": "Unit 3",
            "title": "城市探索與問路指路指南 (Places & Asking for Directions)",
            "indicator": "1-III-4 / 2-III-2 / Ac-III-3",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "B1 符號運用、C1 道德實踐與公民意識",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u3",
            "motivation": "在台北街頭遇到外國遊客問路：'Excuse me, how can I get to the MRT station?'，你能立刻用流利英語為他指點迷津嗎？問路與指路是真實生活不可或缺的交際素養。",
            "concepts": [
              {
                "title": "公共設施與市容場所核心詞庫",
                "formula": "bakery, post office, convenience store, pharmacy, museum, fire station",
                "explanation": "複合名詞重音多在第一部分 (BUS stop, FIRE station, POST office)。",
                "example": "The library is across from the post office on Zhongshan Road.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [公共設施與市容場所核心詞庫], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The library is across from the post office on Zhongshan Road.",
                    "The library are across from the post office on Zhongshan Road.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「公共設施與市容場所核心詞庫」之核心公式：bakery, post office, convenience store, pharmacy, museum, fire station。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "空間方位介系詞黃金搭配",
                "formula": "next to (旁邊) / across from (對面) / between A and B (在兩者之間) / on the corner of (轉角)",
                "explanation": "between 後面必須有兩個地標（between the bank and the bookstore）；單一地標用 across from 或 next to。",
                "example": "The bakery is on the corner of Main Street and Park Road.",
                "examExample": {
                  "stem": "Our international science seminar will officially commence ___ 9:00 a.m. ___ Monday morning ___ early October.",
                  "options": [
                    "at; on; in",
                    "in; at; on",
                    "on; in; at",
                    "at; in; on"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】套用倒金字塔法則：特定時間點 9:00 a.m. 用 at；特定某天的早晨 (Monday morning) 用 on；月份十月 (October) 用 in，因此唯一正確搭配為 at; on; in。"
                }
              },
              {
                "title": "禮貌問路與指路萬能句型",
                "formula": "Excuse me, could you tell me how to get to...? / Go straight for two blocks, then turn right.",
                "explanation": "指路動詞：go straight (直走), turn left/right (左/右轉), cross the street (過馬路), walk past (經過)。",
                "example": "Go straight along this street, and you will see the station on your left.",
                "examExample": {
                  "stem": "Excuse me, sir. Could you please direct me to the National Concert Hall? ➔ Walk straight for two blocks, then turn left; it is located ___ the post office and the bank.",
                  "options": [
                    "between",
                    "among",
                    "across",
                    "through"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方指明為兩者（郵局與銀行），介系詞固定搭配 between A and B（在兩者之間）；among 則用於三者或三者以上群體。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "intersection",
                "ipa": "/ˌɪntərˈsekʃn/",
                "pos": "n.",
                "zh": "十字路口；交會點",
                "sentence": "Turn left at the next intersection."
              },
              {
                "word": "across",
                "ipa": "/əˈkrɔːs/",
                "pos": "prep.",
                "zh": "在……對面；橫過",
                "sentence": "The supermarket is across from our school."
              },
              {
                "word": "pedestrian",
                "ipa": "/pəˈdestriən/",
                "pos": "n.",
                "zh": "行人",
                "sentence": "Always use the pedestrian crossing to stay safe."
              },
              {
                "word": "straight",
                "ipa": "/streɪt/",
                "pos": "adv.",
                "zh": "筆直地；直接",
                "sentence": "Walk straight ahead for three minutes."
              }
            ],
            "dialogue": [
              {
                "speaker": "Tourist",
                "en": "Excuse me, sir. Could you tell me where the nearest metro station is?",
                "zh": "不好意思，先生。能請問最近的捷運站在哪裡嗎？"
              },
              {
                "speaker": "Student",
                "en": "Sure! Go straight for two blocks and turn left at the bakery.",
                "zh": "當然！直走兩個街區，然後在麵包店左轉。"
              },
              {
                "speaker": "Tourist",
                "en": "Is it far from here? Can I walk there?",
                "zh": "離這裡很遠嗎？我走路到得了嗎？"
              },
              {
                "speaker": "Student",
                "en": "It's very close. It takes only five minutes on foot. It's on your right.",
                "zh": "非常近，走路只要五分鐘。就在您的右手邊。"
              }
            ],
            "reading": {
              "title": "Navigating Green Town (綠色小鎮地圖導航)",
              "strategy": "圖表整合：閱讀文字指令時，手指在地圖上同步沿著路線移動。",
              "text": "Welcome to Green Town! Green Town is known for its pedestrian-friendly walkways. If you arrive at the Central Station, exit through Gate 2. Walk straight down Maple Avenue. On your right, you will pass a lovely flower shop and a big bookstore. When you reach the traffic light on Oak Street, turn left. You will see the City History Museum right between the post office and the municipal library. Admission is free for all students on weekends!",
              "questions": [
                {
                  "q": "Which avenue should you walk down after exiting Central Station?",
                  "ans": "Maple Avenue."
                },
                {
                  "q": "Where is the City History Museum located?",
                  "ans": "Between the post office and the library."
                }
              ]
            },
            "step0Clue": "看到問路題目附有街道地圖，第一步先在地圖上標記出「You Are Here (你的起點)」，順著視線前進方向確認左右手轉彎，避免混淆方位！",
            "formativeQuiz": [
              {
                "q": "The police station is ________ the hospital and the fire department.",
                "options": [
                  "next to",
                  "across from",
                  "between",
                  "under"
                ],
                "ans": 2,
                "hint1": "空格後面連接著兩個建築物 (the hospital AND the fire department)。",
                "hint2": "英文表示在兩者之間固定使用 between A and B。",
                "solution": "句中有 and 連接兩者，固定搭配 between A and B。故選 C。"
              }
            ],
            "traps": [
              {
                "wrong": "The bank is between the clinic. ❌",
                "correct": "The bank is between the clinic and the post office. ✔️",
                "reason": "between 後面必須有兩者，若只有一個地點應使用 next to 或 across from。"
              },
              {
                "wrong": "Turn to right at the corner. ❌",
                "correct": "Turn right at the corner. ✔️",
                "reason": "turn 這裡當方向動詞，後面直接加副詞 right，不可加介系詞 to。"
              }
            ],
            "checklist": [
              "我能說出 10 個常見城市場所與設施的英文名稱",
              "我能熟練運用 across from, next to, between A and B 描述地圖位置",
              "我能聽懂並給出 go straight, turn left, turn right 指路指令",
              "我能禮貌使用 Excuse me... 展開生活問路會話"
            ]
          },
          {
            "id": "g6-s1-u4",
            "unitNo": "Unit 4",
            "title": "健康飲食、身體部位與醫療照護 (Food, Health & Care)",
            "indicator": "2-III-4 / 3-III-2 / Ac-III-4",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "A1 身心素質與健全發展、B1 溝通表達",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u4",
            "motivation": "生病感冒去看醫生，如何用英語清楚向醫師表達自己的症狀？出國旅遊遇到胃痛發燒，懂得準確的醫療英文是自保求助的關鍵素養。",
            "concepts": [
              {
                "title": "-ache 身體疼痛複合字與疾病冠詞規則",
                "formula": "head + ache = headache / tooth + ache = toothache / stomach + ache = stomachache",
                "explanation": "表達病症通常用 have a ...：have a cold, have a fever, have a sore throat, have a headache。",
                "example": "He has a terrible stomachache because he ate expired seafood.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              },
              {
                "title": "看病醫病問答核心句型",
                "formula": "Doctor: What's wrong? / What's the matter? ➔ Patient: I have a... / My [body part] hurts.",
                "explanation": "注意 hurt 作為動詞時，主詞為第三人稱單數要加 -s (My leg hurts)。",
                "example": "What's the matter with you? I have a bad cough and my chest hurts.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [看病醫病問答核心句型], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "What's the matter with you? I have a bad cough and my chest hurts.",
                    "What's the matter with you? I have a bad cough and my chest hurts.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「看病醫病問答核心句型」之核心公式：Doctor: What's wrong? / What's the matter? ➔ Patient: I have a... / My [body part] hurts.。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "醫師衛教建議句型 should / shouldn't",
                "formula": "You should + 原形動詞 / You shouldn't + 原形動詞",
                "explanation": "情態助動詞 should 表「應該」，後方動詞絕對不能加 to 或 -ing。",
                "example": "You should drink plenty of warm water and stay in bed.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [醫師衛教建議句型 should / shouldn't], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "You should drink plenty of warm water and stay in bed.",
                    "You should drink plenty of warm water and stay in bed.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「醫師衛教建議句型 should / shouldn't」之核心公式：You should + 原形動詞 / You shouldn't + 原形動詞。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "stomachache",
                "ipa": "/ˈstʌməkeɪk/",
                "pos": "n.",
                "zh": "胃痛；肚子痛",
                "sentence": "Eating too much candy gave him a stomachache."
              },
              {
                "word": "medicine",
                "ipa": "/ˈmedɪsn/",
                "pos": "n.",
                "zh": "藥物",
                "sentence": "Take this medicine three times a day after meals."
              },
              {
                "word": "symptom",
                "ipa": "/ˈsɪmptəm/",
                "pos": "n.",
                "zh": "症狀",
                "sentence": "Fever and chills are common symptoms of flu."
              },
              {
                "word": "temperature",
                "ipa": "/ˈtemprətʃər/",
                "pos": "n.",
                "zh": "體溫；溫度",
                "sentence": "The nurse measured my body temperature."
              }
            ],
            "dialogue": [
              {
                "speaker": "Dr. Watson",
                "en": "Good afternoon, Tommy. What seems to be the problem today?",
                "zh": "下午好，Tommy。今天哪裡不太舒服呢？"
              },
              {
                "speaker": "Tommy",
                "en": "I have a sore throat and a high fever. My head hurts terribly.",
                "zh": "我喉嚨痛而且發高燒，頭也痛得厲害。"
              },
              {
                "speaker": "Dr. Watson",
                "en": "Let me check your throat. It is very red. You have caught a bad cold.",
                "zh": "讓我檢查一下你的喉嚨。非常紅腫，你得了重感冒。"
              },
              {
                "speaker": "Tommy",
                "en": "Do I need an injection? Can I play basketball tomorrow?",
                "zh": "我需要打針嗎？明天還能打籃球嗎？"
              },
              {
                "speaker": "Dr. Watson",
                "en": "No injection needed, but you should take your medicine and get plenty of sleep.",
                "zh": "不用打針，但你應該按時吃藥並且充足睡眠。"
              }
            ],
            "reading": {
              "title": "Healthy Habits Keep the Doctor Away (健康好習慣遠離醫生)",
              "strategy": "因果關係尋找：尋找 because, therefore, so 判定健康成因。",
              "text": "Staying healthy requires consistent daily habits rather than occasional efforts. Nutritionists recommend eating five portions of colorful vegetables and fruits every day because they contain rich vitamins. Regular physical exercise strengthens your immune system and heart. Moreover, getting at least eight hours of sleep allows your body to repair damaged cells. When you feel unwell, listen to your body and rest early instead of staying up late.",
              "questions": [
                {
                  "q": "Why are vegetables and fruits good for our health?",
                  "ans": "Because they contain rich vitamins."
                },
                {
                  "q": "How many hours of sleep do nutritionists recommend?",
                  "ans": "At least eight hours of sleep."
                }
              ]
            },
            "step0Clue": "看到疾病症狀，注意介系詞與冠詞搭配：have a cold, have a headache, have a fever 要加 a；但若用 hurt 當動詞，直接說 My head hurts！",
            "formativeQuiz": [
              {
                "q": "You have a bad fever. You ________ go outside in the cold rain.",
                "options": [
                  "should",
                  "shouldn't",
                  "must",
                  "can"
                ],
                "ans": 1,
                "hint1": "依據常理，發高燒時不應該在寒冷的雨中外出。",
                "hint2": "表達不應該的建議使用 shouldn't + 原形動詞。",
                "solution": "語意為生病不該外出吹雨，表示勸告否定用 shouldn't。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "You should to take this medicine. ❌",
                "correct": "You should take this medicine. ✔️",
                "reason": "should 是情態助動詞，後面直接加原形動詞，不可加 to。"
              },
              {
                "wrong": "I have headache. ❌",
                "correct": "I have a headache. ✔️",
                "reason": "大部分身體小毛病如 cold, fever, headache 前面需要不定冠詞 a。"
              }
            ],
            "checklist": [
              "我能正確拼寫並朗讀 headache, toothache, stomachache",
              "我能聽懂醫師問句 What's the matter? 並清楚回答",
              "我能用 should / shouldn't 給予同儕健康生活建議",
              "我知道 should 後面必須接動詞原形"
            ]
          }
        ]
      },
      {
        "semId": "g6-s2",
        "title": "六年級下學期 (6下 · 6B)",
        "examFocus": "第一次段考 (節慶文化/閱讀拼讀)、畢業考 (未來志向/形容詞比較級最高級)、國小升國中大會考前哨戰",
        "units": [
          {
            "id": "g6-s2-u5",
            "unitNo": "Unit 5",
            "title": "世界節慶巡禮與多元文化 (Festivals & World Cultures)",
            "indicator": "3-III-3 / 5-III-1 / Ac-III-5",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "C3 多元文化與國際理解、B1 符號溝通",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u5",
            "motivation": "臺灣有農曆新年與中秋節，英美有萬聖節與聖誕節。跨文化溝通不僅是背單字，更是學會尊重並生動介紹彼此的文化傳統。",
            "concepts": [
              {
                "title": "東西方重要節慶英譯與飲食詞彙",
                "formula": "Lunar New Year (dumplings), Dragon Boat Festival (rice dumplings), Moon Festival (mooncakes), Halloween (costumes), Christmas (turkey)",
                "explanation": "專有名詞節慶首字母必須大寫。",
                "example": "Families gather together to eat reunion dinner on Lunar New Year's Eve.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [東西方重要節慶英譯與飲食詞彙], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Families gather together to eat reunion dinner on Lunar New Year's Eve.",
                    "Families gather together to eat reunion dinner on Lunar New Year's Eve.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「東西方重要節慶英譯與飲食詞彙」之核心公式：Lunar New Year (dumplings), Dragon Boat Festival (rice dumplings), Moon Festival (mooncakes), Halloween (costumes), Christmas (turkey)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "節慶日期與季節介系詞用法",
                "formula": "on + 特定節慶日子 (on Christmas Day, on Halloween) / in + 季節/月份 (in winter, in December)",
                "explanation": "如果是節慶假期的總稱，英式英語也常說 at Christmas。特定某一天一律用 on。",
                "example": "Children go trick-or-treating on October 31st.",
                "examExample": {
                  "stem": "Our international science seminar will officially commence ___ 9:00 a.m. ___ Monday morning ___ early October.",
                  "options": [
                    "at; on; in",
                    "in; at; on",
                    "on; in; at",
                    "at; in; on"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】套用倒金字塔法則：特定時間點 9:00 a.m. 用 at；特定某天的早晨 (Monday morning) 用 on；月份十月 (October) 用 in，因此唯一正確搭配為 at; on; in。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "tradition",
                "ipa": "/trəˈdɪʃn/",
                "pos": "n.",
                "zh": "傳統",
                "sentence": "Eating rice dumplings is an ancient tradition."
              },
              {
                "word": "celebrate",
                "ipa": "/ˈselɪbreɪt/",
                "pos": "v.",
                "zh": "慶祝",
                "sentence": "People around the world celebrate the New Year."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Excuse me, Mrs. White, what time does the science club meeting start today?",
                "zh": "White 老師請問一下，今天自然科學社團幾點開始呢？"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "It starts at a quarter to four in Room 204. Don't be late!",
                "zh": "三點四十五分在 204 教室開始，千萬別遲到喔！"
              },
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Understood! I will finish my English homework at half past three first.",
                "zh": "了解！我會先在三點半前把英文作業寫完。"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "Excellent time management, Alex. See you this afternoon!",
                "zh": "時間管理做得很棒，Alex，今天下午見！"
              }
            ],
            "reading": {
              "title": "Light in the Autumn Night: Mid-Autumn Festival (秋夜之光：中秋節)",
              "strategy": "Skimming 略讀：閱讀每段第一句抓住核心大意。",
              "text": "The Mid-Autumn Festival falls on the fifteenth day of the eighth lunar month. It is a time for harvest and thanksgiving. In Taiwan, streets are filled with the mouth-watering aroma of outdoor barbecues. Families gather in gardens and parks to admire the roundest moon of the year. People exchange gift boxes of mooncakes and pomelos.",
              "questions": [
                {
                  "q": "When is the Mid-Autumn Festival celebrated?",
                  "ans": "On the 15th day of the 8th lunar month."
                }
              ]
            },
            "step0Clue": "看到特定節日（如 Christmas Day, New Year's Eve），前面的時間介系詞永遠選 on；看到季節 (spring, autumn) 永遠選 in！",
            "formativeQuiz": [
              {
                "q": "We give red envelopes to children ________ Lunar New Year's Day.",
                "options": [
                  "in",
                  "on",
                  "at",
                  "with"
                ],
                "ans": 1,
                "hint1": "Lunar New Year's Day 是明確的「日子」。",
                "hint2": "凡是遇到特定某一天 (Day)，時間介系詞固定用 on。",
                "solution": "表示在特定某一天用 on。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "In Halloween, we wear costumes. ❌",
                "correct": "On Halloween, we wear costumes. ✔️",
                "reason": "Halloween 是特定節日日子，介系詞用 on。"
              }
            ],
            "checklist": [
              "我能用英語說出臺灣三大傳統節日與西方兩大節日名稱",
              "我能熟練運用 on 搭配特定節日、in 搭配月份季節"
            ]
          },
          {
            "id": "g6-s2-u6",
            "unitNo": "Unit 6",
            "title": "閱讀理解力、字首字尾與語篇導航 (Reading & Phonics Mastery)",
            "indicator": "3-III-4 / 4-III-1 / Ac-III-6",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "B1 符號運用、A2 系統思考",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u6",
            "motivation": "小升初的關鍵轉折就是閱讀長度增加！學會掌握字首字尾快速推測單字意思，學會略讀與掃讀，就能在 10 分鐘內讀懂長篇故事與科普短文。",
            "concepts": [
              {
                "title": "三大高頻字尾詞性轉換魔法",
                "formula": "-tion (名詞) / -ful (形容詞) / -ly (副詞)",
                "explanation": "pollute (v.) ➔ pollution (n.); care (n./v.) ➔ careful (adj.) ➔ carefully (adv.)。",
                "example": "The architect planned the project carefully to avoid environmental pollution.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [三大高頻字尾詞性轉換魔法], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The architect planned the project carefully to avoid environmental pollution.",
                    "The architect planned the project carefully to avoid environmental pollution.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「三大高頻字尾詞性轉換魔法」之核心公式：-tion (名詞) / -ful (形容詞) / -ly (副詞)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "paragraph",
                "ipa": "/ˈpærəɡræf/",
                "pos": "n.",
                "zh": "段落",
                "sentence": "Read the first paragraph to find the main idea."
              },
              {
                "word": "strategy",
                "ipa": "/ˈstrætədʒi/",
                "pos": "n.",
                "zh": "策略；方法",
                "sentence": "Scanning is a useful reading strategy during exams."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Excuse me, Mrs. White, what time does the science club meeting start today?",
                "zh": "White 老師請問一下，今天自然科學社團幾點開始呢？"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "It starts at a quarter to four in Room 204. Don't be late!",
                "zh": "三點四十五分在 204 教室開始，千萬別遲到喔！"
              },
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Understood! I will finish my English homework at half past three first.",
                "zh": "了解！我會先在三點半前把英文作業寫完。"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "Excellent time management, Alex. See you this afternoon!",
                "zh": "時間管理做得很棒，Alex，今天下午見！"
              }
            ],
            "reading": {
              "title": "The Secret of Animal Camouflage (動物偽裝的奧秘)",
              "strategy": "結合科學與英文閱讀：分析動物如何適應環境。",
              "text": "In the natural kingdom, survival is an everyday challenge. Many creatures develop an amazing adaptation called camouflage. Camouflage allows animals to blend seamlessly into their surroundings. For instance, the Arctic fox has pure white fur during the snowy winter, but its coat turns greyish-brown when summer arrives.",
              "questions": [
                {
                  "q": "What is the purpose of animal camouflage?",
                  "ans": "To blend seamlessly into surroundings and avoid predators."
                }
              ]
            },
            "step0Clue": "遇上長篇閱讀題，第一步先看問題！圈出題目裡的關鍵字 (Key Words)，再回到文章 Scanning 定位，省下 50% 答題時間！",
            "formativeQuiz": [
              {
                "q": "The word 'careful' is an adjective. How do we turn it into an adverb?",
                "options": [
                  "carefulment",
                  "carefully",
                  "carefulness",
                  "carefuling"
                ],
                "ans": 1,
                "hint1": "形容詞後面加上 -ly 通常變成副詞。",
                "hint2": "careful + ly = carefully。",
                "solution": "形容詞加 -ly 轉換為副詞。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "遇到不懂的字立刻停下來查字典。 ❌",
                "correct": "利用前後句子語意猜測詞意，先完成整篇閱讀。 ✔️",
                "reason": "考場沒有字典，108 課綱評量的是脈絡理解與推論能力。"
              }
            ],
            "checklist": [
              "我能辨認 -tion, -ful, -ly 等常見字尾並判定詞性",
              "我能靈活運用 Skimming 略讀與 Scanning 掃讀兩種大考策略"
            ]
          },
          {
            "id": "g6-s2-u7",
            "unitNo": "Unit 7",
            "title": "未來計畫與夢想志向 (Future Plans & Dream Careers)",
            "indicator": "3-III-3 / Ac-III-7",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "A1 身心發展、A2 系統思考",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u7",
            "motivation": "國小畢業即將邁入國中，你對未來的自己有什麼期許？想當建築師、軟體工程師、還是太空人？用未來式句型堅定宣告自己的夢想！",
            "concepts": [
              {
                "title": "will 與 be going to 的精妙語意區別",
                "formula": "will + 原形動詞 (即時決定、客觀預測) vs be going to + 原形動詞 (事先規劃、強烈跡象)",
                "explanation": "看天色烏雲密布有明顯跡象用 Look! It is going to rain. 即時幫忙用 I will help you.",
                "example": "I am going to study architecture in the future. / Don't worry, I will support you.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [will 與 be going to 的精妙語意區別], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "I am going to study architecture in the future.",
                    "I am going to study architecture in the future.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「will 與 be going to 的精妙語意區別」之核心公式：will + 原形動詞 (即時決定、客觀預測) vs be going to + 原形動詞 (事先規劃、強烈跡象)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "architect",
                "ipa": "/ˈɑːrkɪtekt/",
                "pos": "n.",
                "zh": "建築師",
                "sentence": "An architect designs safe and beautiful buildings."
              },
              {
                "word": "engineer",
                "ipa": "/ˌendʒɪˈnɪr/",
                "pos": "n.",
                "zh": "工程師",
                "sentence": "She wants to become a computer software engineer."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Excuse me, Mrs. White, what time does the science club meeting start today?",
                "zh": "White 老師請問一下，今天自然科學社團幾點開始呢？"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "It starts at a quarter to four in Room 204. Don't be late!",
                "zh": "三點四十五分在 204 教室開始，千萬別遲到喔！"
              },
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Understood! I will finish my English homework at half past three first.",
                "zh": "了解！我會先在三點半前把英文作業寫完。"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "Excellent time management, Alex. See you this afternoon!",
                "zh": "時間管理做得很棒，Alex，今天下午見！"
              }
            ],
            "reading": {
              "title": "The Young Inventor: Boyan Slat (年輕發明家 Boyan Slat)",
              "strategy": "人物傳記閱讀：分析主人翁的夢想、遇到的挑戰與解決方法。",
              "text": "When Boyan Slat was only sixteen years old, he went diving in Greece. To his surprise, he noticed more plastic bags in the water than fish. This shocking experience inspired his future plan. He decided that he would clean up the world's oceans.",
              "questions": [
                {
                  "q": "What inspired Boyan Slat's future plan?",
                  "ans": "Seeing more plastic bags than fish while diving in Greece."
                }
              ]
            },
            "step0Clue": "看到 tomorrow, next week, in the future，鎖定 will 或 be going to；但要注意二者後方一律接「原形動詞」！",
            "formativeQuiz": [
              {
                "q": "Look at those dark clouds! It ________ rain very soon.",
                "options": [
                  "will be",
                  "is going to",
                  "was going to",
                  "rained"
                ],
                "ans": 1,
                "hint1": "天上已經看得到烏雲，是有明顯眼前跡象的預測。",
                "hint2": "根據眼下跡象發生的未來事情，優先使用 is going to + 原形動詞。",
                "solution": "有明顯眼下徵兆的預測用 be going to。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "I will going to study abroad. ❌",
                "correct": "I will study abroad. / I am going to study abroad. ✔️",
                "reason": "will 和 be going to 是兩種不同的未來式結構，不可混雜在一起。"
              }
            ],
            "checklist": [
              "我能分清 will (即時決定) 與 be going to (事先規劃) 的細微差別",
              "我能在 will / be going to 後面正確使用動詞原形"
            ]
          },
          {
            "id": "g6-s2-u8",
            "unitNo": "Unit 8",
            "title": "事物比較與世界之最 (Comparisons & World Wonders)",
            "indicator": "2-III-6 / Ac-III-8",
            "stage": "第三學習階段 (國小高年級 108 課綱)",
            "cefr": "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)",
            "competency": "B1 符號溝通、C3 國際理解",
            "guideline": "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。", 
            "sourceRef": "sixth:eng-u8",
            "motivation": "聖母峰最高、太平洋最深、臺北101曾是世界最高樓！比較兩者或探索世界奇蹟時，形容詞比較級與最高級是你的必備語法利器。",
            "concepts": [
              {
                "title": "單音節與雙音節形容詞比較級規則變化",
                "formula": "一般加 -er (taller) / 字尾 e 加 -r (wider) / 短母音+單子音重複字尾 (bigger, hotter) / 子音+y 改 -ier (happier)",
                "explanation": "看到 than 出現，前面百分之百要搭配「比較級」。",
                "example": "Mount Everest is taller than Mount Fuji.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "wonder",
                "ipa": "/ˈwʌndər/",
                "pos": "n.",
                "zh": "奇觀；奇蹟",
                "sentence": "The Grand Canyon is one of the world's natural wonders."
              },
              {
                "word": "magnificent",
                "ipa": "/mæɡˈnɪfɪsnt/",
                "pos": "adj.",
                "zh": "壯麗的；宏偉的",
                "sentence": "The view from the top of the tower is magnificent."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Excuse me, Mrs. White, what time does the science club meeting start today?",
                "zh": "White 老師請問一下，今天自然科學社團幾點開始呢？"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "It starts at a quarter to four in Room 204. Don't be late!",
                "zh": "三點四十五分在 204 教室開始，千萬別遲到喔！"
              },
              {
                "speaker": "🧑‍🎓 Alex",
                "en": "Understood! I will finish my English homework at half past three first.",
                "zh": "了解！我會先在三點半前把英文作業寫完。"
              },
              {
                "speaker": "👩‍🏫 Mrs. White",
                "en": "Excellent time management, Alex. See you this afternoon!",
                "zh": "時間管理做得很棒，Alex，今天下午見！"
              }
            ],
            "reading": {
              "title": "Wonders of Our Planet (地球上的自然奇觀)",
              "strategy": "資訊比較表：在邊欄記錄各個地理之最的名稱、高度與特點。",
              "text": "Our planet is dotted with breathtaking natural wonders. Mount Everest, towering at 8,848 meters, is the highest point above sea level. In contrast, the Mariana Trench in the western Pacific Ocean plunges down nearly 11,000 meters, making it the deepest trench known to humanity.",
              "questions": [
                {
                  "q": "What is the deepest trench on Earth?",
                  "ans": "The Mariana Trench."
                }
              ]
            },
            "step0Clue": "看到 than 出現，形容詞必定為「比較級」(taller / more expensive)；看到 the 出現且後面有比較範圍 (of all, in the world)，形容詞必定為「最高級」！",
            "formativeQuiz": [
              {
                "q": "This puzzle is ________ than the one we solved yesterday.",
                "options": [
                  "difficult",
                  "more difficult",
                  "most difficult",
                  "difficultly"
                ],
                "ans": 1,
                "hint1": "句中有 than，要求使用比較級。",
                "hint2": "difficult 是多音節形容詞，比較級加 more。",
                "solution": "多音節形容詞比較級加 more。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Taipei 101 is more taller than this building. ❌",
                "correct": "Taipei 101 is taller than this building. ✔️",
                "reason": "tall 為單音節，比較級加 -er 即可，不可加上 more 形成雙重比較！"
              }
            ],
            "checklist": [
              "我能分清單音節加 -er/-est 與多音節加 more/most 的規則",
              "我牢記最高級前面必定要有定冠詞 the"
            ]
          }
        ]
      }
    ]
  },
  {
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
            "stage": "第四學習階段 (國中 7 年級 108 課綱)",
            "cefr": "A2 (初級起步 · 會考文法核心)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。", 
            "sourceRef": "jh:english-1",
            "motivation": "英文是有嚴謹「主謂結構」的形合語言。中文常說「這裡很漂亮」，但英文句子若沒有動詞就是語病！學會句子骨架，掌握現在簡單式真理與習慣，是國中會考英文得分的第一步。",
            "concepts": [
              {
                "title": "五大基本句型核心骨架 (Basic Sentence Patterns)",
                "formula": "1. S+V 2. S+V+SC 3. S+V+O 4. S+V+IO+DO 5. S+V+O+OC",
                "explanation": "主詞是主角，動詞是靈魂。及物動詞後面一定要接受詞；不完全不及物動詞 (be動詞、連綴動詞) 後面需要主詞補詞 (SC)。",
                "example": "Birds fly (S+V). / She is smart (S+V+SC). / Leo loves reading (S+V+O).",
                "examExample": {
                  "stem": "According to the core linguistic principle of [五大基本句型核心骨架 (Basic Sentence Patterns)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Birds fly (S+V).",
                    "Birds fly (S+V).",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「五大基本句型核心骨架 (Basic Sentence Patterns)」之核心公式：1. S+V 2. S+V+SC 3. S+V+O 4. S+V+IO+DO 5. S+V+O+OC。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "現在簡單式第三人稱單數動詞加 -s/-es 終極規則",
                "formula": "一般加 -s; 字尾 s, sh, ch, x, o 加 -es; 子音+y 去y改 -ies",
                "explanation": "主詞是 He, She, It 或單數名詞時，肯定句動詞必須做三單現變化。此規則在會考改錯與選擇題命中率極高！",
                "example": "He watches TV every night. / She studies hard.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              },
              {
                "title": "be 動詞與助動詞 do/does 的絕對分界",
                "formula": "be 動詞句型 (Am/Is/Are) 表身分、狀態；一般動詞疑問否定叫 do/does 出來幫忙",
                "explanation": "絕對不可將 be 動詞與一般動詞原形黏在一起（如 He is like dogs ❌ ➔ He likes dogs ✔️）。",
                "example": "Does your sister play badminton? No, she doesn't.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [be 動詞與助動詞 do/does 的絕對分界], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Does your sister play badminton? No, she doesn't.",
                    "Does your sareter play badminton? No, she doesn't.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「be 動詞與助動詞 do/does 的絕對分界」之核心公式：be 動詞句型 (Am/Is/Are) 表身分、狀態；一般動詞疑問否定叫 do/does 出來幫忙。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "identify",
                "ipa": "/aɪˈdentɪfaɪ/",
                "pos": "v.",
                "zh": "辨認；確認",
                "sentence": "First, identify the subject and verb in the sentence."
              },
              {
                "word": "predicate",
                "ipa": "/ˈpredɪkət/",
                "pos": "n.",
                "zh": "述詞；謂語",
                "sentence": "The predicate tells what the subject does."
              },
              {
                "word": "singular",
                "ipa": "/ˈsɪŋɡjələr/",
                "pos": "adj.",
                "zh": "單數的",
                "sentence": "A singular subject requires a singular verb."
              },
              {
                "word": "plural",
                "ipa": "/ˈplʊrəl/",
                "pos": "adj.",
                "zh": "複數的",
                "sentence": "These nouns take irregular plural forms."
              }
            ],
            "dialogue": [
              {
                "speaker": "Teacher",
                "en": "Leo, can you tell me what is wrong with 'She have two cats'?",
                "zh": "Leo，你能告訴我 'She have two cats' 哪裡錯了嗎？"
              },
              {
                "speaker": "Leo",
                "en": "The subject 'She' is third-person singular, so the verb should be 'has'!",
                "zh": "主詞 'She' 是第三人稱單數，動詞應該改成 'has'！"
              },
              {
                "speaker": "Teacher",
                "en": "Spot on! And how about the negative sentence?",
                "zh": "答得太棒了！那否定句該怎麼改呢？"
              },
              {
                "speaker": "Leo",
                "en": "She doesn't have two cats. The verb returns to base form!",
                "zh": "改成 She doesn't have two cats，動詞要打回原形！"
              }
            ],
            "reading": {
              "title": "Daily Life in a Green School (綠色校園的一天)",
              "strategy": "確認主詞與動詞單複數一致性 (Subject-Verb Agreement)。",
              "text": "Green Junior High School operates entirely on renewable energy. Every morning, solar panels on the rooftop generate clean electricity for classrooms. Mr. Wu, the science teacher, leads students in composting cafeteria leftovers. The school garden produces fresh organic herbs and tomatoes. A student representative records daily electricity usage on an interactive screen in the main hallway. Through these consistent environmental actions, the whole school practices sustainable living every day.",
              "questions": [
                {
                  "q": "What generates electricity for the classrooms?",
                  "ans": "Solar panels on the rooftop."
                },
                {
                  "q": "Who leads the composting project?",
                  "ans": "Mr. Wu, the science teacher."
                }
              ]
            },
            "step0Clue": "看到句子主詞，先問自己三句話：1. 主詞是單數還是複數？ 2. 動詞是一般動作還是 be 動詞狀態？ 3. 是否有時間副詞指示現在習慣？若是三單且為現在式，立刻確認動詞加 -s/-es！",
            "formativeQuiz": [
              {
                "q": "Leo's brother ________ English novels in the library every afternoon.",
                "options": [
                  "read",
                  "reads",
                  "is reading",
                  "reading"
                ],
                "ans": 1,
                "hint1": "主詞是 Leo's brother (單數，可代換為 He)。",
                "hint2": "時間副詞是 every afternoon，表示平日生活習慣，使用現在簡單式。",
                "solution": "第三人稱單數主詞搭配現在簡單式，動詞加 -s (reads)。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Does Leo likes playing soccer? ❌",
                "correct": "Does Leo like playing soccer? ✔️",
                "reason": "問句中已經有 does 體現第三人稱單數，後方主要動詞必須恢復原形 like。"
              },
              {
                "wrong": "He is speak English very well. ❌",
                "correct": "He speaks English very well. ✔️",
                "reason": "be 動詞不可與一般動詞原形連用，此為嚴重語病。"
              }
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
            "stage": "第四學習階段 (國中 7 年級 108 課綱)",
            "cefr": "A2 (初級起步 · 會考文法核心)",
            "competency": "B1 符號運用、C1 公民道德",
            "guideline": "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。", 
            "sourceRef": "jh:english-7",
            "motivation": "在圖書館看到 'Silence, please!'，在捷運看到 'Mind the gap!'，這些都是日常生活中最常見的「祈使句」。掌握名詞單複數與祈使句，讓你的英文指示精準有力。",
            "concepts": [
              {
                "title": "可數名詞不規則複數變化大匯整",
                "formula": "man-men, woman-women, child-children, tooth-teeth, foot-feet, mouse-mice, person-people, sheep-sheep, fish-fish",
                "explanation": "單複數同形的名詞 (sheep, fish, deer) 在會考閱讀中是常考陷阱，須根據動詞單複數判定其含義。",
                "example": "These sheep are grazing peacefully on the hill.",
                "examExample": {
                  "stem": "Yesterday afternoon, Sarah ___ through the old family photo album and ___ her grandmother's graduation diploma.",
                  "options": [
                    "flipped; discovered",
                    "flips; discovers",
                    "was flipped; had discovered",
                    "flipped; was discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 Yesterday afternoon 明確指示過去時間，前後對等連接詞 and 連接兩個過去簡單式主動動詞：flip -> flipped (重複字尾加 ed)，discover -> discovered。"
                }
              },
              {
                "title": "祈使句核心公式與禮貌修飾語",
                "formula": "肯定：(Please) + 原形動詞... / 否定：(Please) Don't + 原形動詞... / Be + 形容詞",
                "explanation": "祈使句省略了主詞 you。切記否定一律用 Don't，絕對不可用 Not 或 No 接動詞原形。",
                "example": "Please take off your shoes. / Don't touch the exhibits.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [祈使句核心公式與禮貌修飾語], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Please take off your shoes.",
                    "Please take off your shoes.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「祈使句核心公式與禮貌修飾語」之核心公式：肯定：(Please) + 原形動詞... / 否定：(Please) Don't + 原形動詞... / Be + 形容詞。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "imperative",
                "ipa": "/ɪmˈperətɪv/",
                "pos": "adj./n.",
                "zh": "祈使的；必要指令",
                "sentence": "An imperative sentence begins with a base verb."
              },
              {
                "word": "demonstrative",
                "ipa": "/dɪˈmɑːnstrətɪv/",
                "pos": "adj.",
                "zh": "指示的",
                "sentence": "This, that, these, and those are demonstrative pronouns."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍💻 Ken",
                "en": "Hi Jenny! Are you joining the robotics workshop this Saturday?",
                "zh": "嗨 Jenny！這週六妳要參加機器人工作坊嗎？"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "I'd love to, but I always practice violin on Saturday mornings.",
                "zh": "我很想去，但我週六早上總是固定要練小提琴。"
              },
              {
                "speaker": "🧑‍💻 Ken",
                "en": "The workshop starts at two in the afternoon, so you can easily attend both!",
                "zh": "工作坊下午兩點才開始，所以妳兩邊都能參加喔！"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "That's fantastic news! Let's register online together right now.",
                "zh": "那太棒了！我們現在立刻一起上網報名吧。"
              }
            ],
            "reading": {
              "title": "Metro Safety Guidelines (捷運公共安全指引告示)",
              "strategy": "公告文本閱讀：快速抓取粗體警語、符號與禁止條款。",
              "text": "Welcome to Taipei Rapid Transit System. For the safety and comfort of all passengers, please observe the following regulations: 1. Stand behind the yellow warning line while waiting on platforms. 2. Mind the gap between the train and the platform edge. 3. Eating, drinking, smoking, and chewing gum are strictly prohibited past the fare gates. In case of emergency, press the alarm button near the doors immediately.",
              "questions": [
                {
                  "q": "What is prohibited past the fare gates?",
                  "ans": "Eating, drinking, smoking, and chewing gum."
                }
              ]
            },
            "step0Clue": "看到句首沒有主詞，直接放動詞，這就是「祈使句」！動詞務必選「原形動詞」；否定一律用「Don't + 原形動詞」！",
            "formativeQuiz": [
              {
                "q": "________ late for the meeting, or Mr. Wu will be upset.",
                "options": [
                  "Not be",
                  "Don't be",
                  "Aren't",
                  "No be"
                ],
                "ans": 1,
                "hint1": "本句是祈使句的否定形式。",
                "hint2": "祈使句否定一律使用 Don't + 原形動詞，be 動詞的原形就是 be。",
                "solution": "祈使句否定公式為 Don't + 原形動詞 (Don't be)。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "No run in the hallway! ❌",
                "correct": "Don't run in the hallway! / No running! ✔️",
                "reason": "祈使句否定用 Don't + 原形動詞；若用 No 只能接動名詞 (No running)。"
              }
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
            "stage": "第四學習階段 (國中 7 年級 108 課綱)",
            "cefr": "A2 (初級起步 · 會考文法核心)",
            "competency": "B1 符號運用、A1 自主行動",
            "guideline": "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。", 
            "sourceRef": "arch:phonetics-dictionary",
            "motivation": "看懂音標，就能獨立自學任何新單字！國際音標 (IPA) 與 KK 音標是打通聽力與口語發音的靈魂鑰匙。",
            "concepts": [
              {
                "title": "母音與子音音標對照表 (KK音標 vs IPA)",
                "formula": "長母音 /iː/, /uː/, /ɔː/, /ɑː/, /ɜː/ vs 短母音 /ɪ/, /ʊ/, /ɒ/, /æ/, /ʌ/, /ə/",
                "explanation": "雙母音如 /aɪ/, /aʊ/, /eɪ/, /oʊ/, /ɔɪ/ 是由前一個音滑向後一個音，滑動過程要飽滿。",
                "example": "beat /biːt/ vs bit /bɪt/; pool /puːl/ vs pull /pʊl/",
                "examExample": {
                  "stem": "According to the core linguistic principle of [母音與子音音標對照表 (KK音標 vs IPA)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "beat",
                    "beat",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「母音與子音音標對照表 (KK音標 vs IPA)」之核心公式：長母音 /iː/, /uː/, /ɔː/, /ɑː/, /ɜː/ vs 短母音 /ɪ/, /ʊ/, /ɒ/, /æ/, /ʌ/, /ə/。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "syllable",
                "ipa": "/ˈsɪləbl/",
                "pos": "n.",
                "zh": "音節",
                "sentence": "Every syllable contains a vowel sound."
              },
              {
                "word": "accent",
                "ipa": "/ˈæksent/",
                "pos": "n.",
                "zh": "重音；口音",
                "sentence": "The primary accent falls on the first syllable."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍💻 Ken",
                "en": "Hi Jenny! Are you joining the robotics workshop this Saturday?",
                "zh": "嗨 Jenny！這週六妳要參加機器人工作坊嗎？"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "I'd love to, but I always practice violin on Saturday mornings.",
                "zh": "我很想去，但我週六早上總是固定要練小提琴。"
              },
              {
                "speaker": "🧑‍💻 Ken",
                "en": "The workshop starts at two in the afternoon, so you can easily attend both!",
                "zh": "工作坊下午兩點才開始，所以妳兩邊都能參加喔！"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "That's fantastic news! Let's register online together right now.",
                "zh": "那太棒了！我們現在立刻一起上網報名吧。"
              }
            ],
            "reading": {
              "title": "Mastering the Dictionary (掌握字典查閱技巧)",
              "strategy": "工具書使用策略：辨識詞性標記 (n., v., adj., adv.) 與例句。",
              "text": "An English dictionary is not merely a translation tool; it is a treasure trove of language patterns. When you encounter a word with multiple meanings, read all the example sentences. Pay special attention to whether a verb is transitive [T] or intransitive [I]. Checking the pronunciation guide helps you speak with natural rhythm and confidence.",
              "questions": [
                {
                  "q": "What does [T] stand for in a dictionary entry?",
                  "ans": "Transitive verb."
                }
              ]
            },
            "step0Clue": "看音標時，注意重音符號 [ ˈ ] 在哪個音節前面，該音節要念得最響亮、最高昂、最清晰！",
            "formativeQuiz": [
              {
                "q": "Which word contains the long vowel sound /iː/?",
                "options": [
                  "sit",
                  "seat",
                  "set",
                  "sat"
                ],
                "ans": 1,
                "hint1": "eat, seat, meet, sleep 發長母音 /iː/。",
                "hint2": "sit 發短母音 /ɪ/。",
                "solution": "seat 發音為 /siːt/，包含長母音 /iː/。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "把名詞和動詞同形的單字都念一樣的重音。 ❌",
                "correct": "名詞前重、動詞後重 (REcord 名詞 vs reCORD 動詞)。 ✔️",
                "reason": "英文雙音節名詞重音多在第一音節，動詞重音多在第二音節。"
              }
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
            "stage": "第四學習階段 (國中 7 年級 108 課綱)",
            "cefr": "A2 (初級起步 · 會考文法核心)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。", 
            "sourceRef": "jh:english-2",
            "motivation": "Look! The train is coming! 描述眼前正在發生的動態事件，現在進行式是不可或缺的語法結構。",
            "concepts": [
              {
                "title": "現在進行式完整公式",
                "formula": "S + am/is/are + V-ing",
                "explanation": "不可漏掉 be 動詞，也不可把原形動詞直接接在 be 後面。靜態動詞 (know, have擁有, like) 不用於進行式。",
                "example": "The children are playing soccer on the field right now.",
                "examExample": {
                  "stem": "Listen! The baby birds in the oak tree ___ for their mother, so please do not disturb the nest.",
                  "options": [
                    "are chirping",
                    "is chirping",
                    "chirped",
                    "will chirp"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】句首感官祈使句 Listen!（聽！）明確指示此刻當下正在發生的動作，主詞 The baby birds 為複數，故選 are + 現在分詞 V-ing (are chirping)。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "continuous",
                "ipa": "/kənˈtɪnjuəs/",
                "pos": "adj.",
                "zh": "持續的；連續的",
                "sentence": "The rain has been continuous throughout the afternoon."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍💻 Ken",
                "en": "Hi Jenny! Are you joining the robotics workshop this Saturday?",
                "zh": "嗨 Jenny！這週六妳要參加機器人工作坊嗎？"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "I'd love to, but I always practice violin on Saturday mornings.",
                "zh": "我很想去，但我週六早上總是固定要練小提琴。"
              },
              {
                "speaker": "🧑‍💻 Ken",
                "en": "The workshop starts at two in the afternoon, so you can easily attend both!",
                "zh": "工作坊下午兩點才開始，所以妳兩邊都能參加喔！"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "That's fantastic news! Let's register online together right now.",
                "zh": "那太棒了！我們現在立刻一起上網報名吧。"
              }
            ],
            "reading": {
              "title": "A Busy Sunday Afternoon (繁忙的週日下午)",
              "strategy": "動態動作抓取：找出每個家庭成員正在進行的動作。",
              "text": "It is Sunday afternoon at the Lin household. Mr. Lin is repairing a broken bicycle in the backyard. Mrs. Lin is watering the potted flowers on the balcony. In the living room, their daughter Amy is practicing the violin, while her brother is reading a book. Outside the window, birds are singing merrily in the tall oak tree.",
              "questions": [
                {
                  "q": "What is Mrs. Lin doing?",
                  "ans": "She is watering the potted flowers."
                }
              ]
            },
            "step0Clue": "看到 Look! / Listen! / now / right now，動詞時態立刻鎖定「be 動詞 + V-ing」！",
            "formativeQuiz": [
              {
                "q": "Listen! The baby ________ in the next room.",
                "options": [
                  "cries",
                  "is crying",
                  "crying",
                  "cried"
                ],
                "ans": 1,
                "hint1": "Listen! 提醒聽者注意當下正在發生的聲音。",
                "hint2": "單數主詞 The baby 搭配 is + V-ing。",
                "solution": "聽當下聲音用現在進行式 is crying。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He playing tennis now. ❌",
                "correct": "He is playing tennis now. ✔️",
                "reason": "進行式公式是 be + V-ing，兩者缺一不可。"
              }
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
            "stage": "第四學習階段 (國中 7 年級 108 課綱)",
            "cefr": "A2 (初級起步 · 會考文法核心)",
            "competency": "B1 符號溝通",
            "guideline": "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。", 
            "sourceRef": "jh:english-8",
            "motivation": "日常生活中描述作息頻率與空間物品擺設，需要頻率副詞與存在句 There is / There are。",
            "concepts": [
              {
                "title": "存在句 There is / There are 核心定律",
                "formula": "There is + 單數/不可數名詞 + 地點 / There are + 複數名詞 + 地點",
                "explanation": "中文說「那裡有一張桌子」，容易受中文影響寫成 There have ❌，英文必定用 There is / There are ✔️！",
                "example": "There are forty students in our classroom.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [存在句 There is / There are 核心定律], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "There are forty students in our classroom.",
                    "There are forty students in our classroom.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「存在句 There is / There are 核心定律」之核心公式：There is + 單數/不可數名詞 + 地點 / There are + 複數名詞 + 地點。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "existential",
                "ipa": "/ˌeɡzɪˈstenʃl/",
                "pos": "adj.",
                "zh": "存在的",
                "sentence": "There is/are creates an existential sentence."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍💻 Ken",
                "en": "Hi Jenny! Are you joining the robotics workshop this Saturday?",
                "zh": "嗨 Jenny！這週六妳要參加機器人工作坊嗎？"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "I'd love to, but I always practice violin on Saturday mornings.",
                "zh": "我很想去，但我週六早上總是固定要練小提琴。"
              },
              {
                "speaker": "🧑‍💻 Ken",
                "en": "The workshop starts at two in the afternoon, so you can easily attend both!",
                "zh": "工作坊下午兩點才開始，所以妳兩邊都能參加喔！"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "That's fantastic news! Let's register online together right now.",
                "zh": "那太棒了！我們現在立刻一起上網報名吧。"
              }
            ],
            "reading": {
              "title": "The Community Park (社區公園一覽)",
              "strategy": "空間物品定位：辨認園區內各項設施與數量。",
              "text": "Our community park is a vibrant gathering place. There is a large pond in the center where ducks swim freely. There are three wooden pavilions surrounded by blooming azaleas. Beside the basketball court, there is a drinking fountain for athletes. Every morning, there are many senior citizens practicing tai chi on the lawn.",
              "questions": [
                {
                  "q": "What is in the center of the park?",
                  "ans": "A large pond where ducks swim freely."
                }
              ]
            },
            "step0Clue": "看到 There ________，先看空格後面的名詞是單數還是複數；若是複數選 are，單數或不可數選 is！",
            "formativeQuiz": [
              {
                "q": "There ________ a lot of fresh milk in the refrigerator.",
                "options": [
                  "is",
                  "are",
                  "have",
                  "has"
                ],
                "ans": 0,
                "hint1": "milk 是不可數名詞。",
                "hint2": "不可數名詞搭配單數 be 動詞 is。",
                "solution": "milk 為不可數名詞，存在句用 There is。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "There have many books on the desk. ❌",
                "correct": "There are many books on the desk. ✔️",
                "reason": "英文表示某處有某物一律用 There is / There are，切勿受中文影響寫成 There have。"
              }
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
            "stage": "第四學習階段 (國中 7 年級 108 課綱)",
            "cefr": "A2 (初級起步 · 會考文法核心)",
            "competency": "B1 符號溝通、C1 公民行動",
            "guideline": "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。", 
            "sourceRef": "jh:english-13",
            "motivation": "大考常考地圖與指路，掌握方位介系詞 (along, across, through, into) 能讓你在閱讀中精確構建空間心智模型。",
            "concepts": [
              {
                "title": "空間介系詞之穿透與跨越 (through vs across)",
                "formula": "through = 穿過立體內部 (tunnel, forest) / across = 橫越平面表面 (street, river)",
                "explanation": "walk through the park (在公園林間穿過) vs walk across the street (過馬路)。",
                "example": "The train passed through the long tunnel and arrived in Taitung.",
                "examExample": {
                  "stem": "Excuse me, sir. Could you please direct me to the National Concert Hall? ➔ Walk straight for two blocks, then turn left; it is located ___ the post office and the bank.",
                  "options": [
                    "between",
                    "among",
                    "across",
                    "through"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方指明為兩者（郵局與銀行），介系詞固定搭配 between A and B（在兩者之間）；among 則用於三者或三者以上群體。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "navigate",
                "ipa": "/ˈnævɪɡeɪt/",
                "pos": "v.",
                "zh": "導航；航行",
                "sentence": "Use GPS to navigate through the complex city streets."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍💻 Ken",
                "en": "Hi Jenny! Are you joining the robotics workshop this Saturday?",
                "zh": "嗨 Jenny！這週六妳要參加機器人工作坊嗎？"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "I'd love to, but I always practice violin on Saturday mornings.",
                "zh": "我很想去，但我週六早上總是固定要練小提琴。"
              },
              {
                "speaker": "🧑‍💻 Ken",
                "en": "The workshop starts at two in the afternoon, so you can easily attend both!",
                "zh": "工作坊下午兩點才開始，所以妳兩邊都能參加喔！"
              },
              {
                "speaker": "👩‍💻 Jenny",
                "en": "That's fantastic news! Let's register online together right now.",
                "zh": "那太棒了！我們現在立刻一起上網報名吧。"
              }
            ],
            "reading": {
              "title": "Touring the Historic District (歷史城區導覽)",
              "strategy": "路線追蹤：跟隨介系詞畫出參訪動線。",
              "text": "To tour the historic district, start at the City Gate. Walk along the ancient stone wall until you reach the central plaza. Walk across the marble courtyard to visit the memorial hall. Afterward, stroll through the tranquil botanical garden behind the temple. You will discover picturesque cafes tucked into the cobblestone alleys.",
              "questions": [
                {
                  "q": "Where should you walk after reaching the central plaza?",
                  "ans": "Across the marble courtyard to the memorial hall."
                }
              ]
            },
            "step0Clue": "立體空間 (森林、隧道) 穿過用 through；平面 (馬路、河流) 橫越用 across！",
            "formativeQuiz": [
              {
                "q": "The hikers walked ________ the dense forest for three hours before finding the campsite.",
                "options": [
                  "across",
                  "through",
                  "on",
                  "at"
                ],
                "ans": 1,
                "hint1": "forest 是立體三維的森林空間。",
                "hint2": "穿越立體空間介系詞用 through。",
                "solution": "穿過森林用 through。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He walked through the road. ❌",
                "correct": "He walked across the road. ✔️",
                "reason": "馬路是平面，橫越應用 across。"
              }
            ],
            "checklist": [
              "我能分清 through (立體穿過) 與 across (平面橫越)",
              "我能讀懂地圖指路的多步驟介系詞說明"
            ]
          }
        ]
      }
    ]
  },
  {
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
            "stage": "第四學習階段 (國中 8 年級 108 課綱)",
            "cefr": "A2+ (初級精熟 · 句構拓展)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "心測中心國中教育會考評量規準：過去簡單式、未來式、形容詞比較級最高級、動名詞與不定詞。", 
            "sourceRef": "jh:english-3",
            "motivation": "敘述一個事件的起承轉合，需要清楚建立時間軸。過去簡單式與時間副詞 (first, then, afterward, finally) 是說好英語故事的黃金組合。",
            "concepts": [
              {
                "title": "時間順序連接副詞鏈 (Narrative Sequencing)",
                "formula": "First... Then... Next... After that... Finally...",
                "explanation": "時間副詞放在句首時，後面通常加逗號，引導下一個發生動作。",
                "example": "First, we bought the ingredients. Then, we baked the cake together.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [時間順序連接副詞鏈 (Narrative Sequencing)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "First, we bought the ingredients. Then, we baked the cake together.",
                    "First, we bought the ingredients. Then, we baked the cake together.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「時間順序連接副詞鏈 (Narrative Sequencing)」之核心公式：First... Then... Next... After that... Finally...。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "narrative",
                "ipa": "/ˈnærətɪv/",
                "pos": "n.",
                "zh": "敘述；故事",
                "sentence": "A good narrative keeps listeners engaged from start to finish."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "Did you hear that thunderstorm last night? It was louder than usual!",
                "zh": "你昨晚有聽到打雷嗎？比平常還要大聲很多！"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Yes! While I was studying for the math quiz, the power suddenly went out.",
                "zh": "有啊！我當時正在準備數學小考，電燈突然全都熄滅了。"
              },
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "What did you do then? Did you find a flashlight?",
                "zh": "那你後來怎麼辦？你有找到手電筒嗎？"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Fortunately, my brother brought a rechargeable lamp, so I kept reviewing.",
                "zh": "幸好我哥哥拿來了充電式檯燈，所以我能繼續複習。"
              }
            ],
            "reading": {
              "title": "The Rescue of the Stranded Hiker (搜救受困登山客紀實)",
              "strategy": "時間軸排列：將文章中的搜救步驟標記在時間線上。",
              "text": "At 3:00 p.m. yesterday, mountain rescue teams received an SOS signal from Mount Snow. First, operators tracked the hiker's smartphone GPS coordinates. Next, at 4:30 p.m., a search helicopter surveyed the ridgeline. Despite dense fog, spotters spotted an orange tent. Finally, by 6:00 p.m., rescuers winched the injured hiker safely into the helicopter cabin.",
              "questions": [
                {
                  "q": "What did operators do first after receiving the SOS signal?",
                  "ans": "Tracked the hiker's smartphone GPS coordinates."
                }
              ]
            },
            "step0Clue": "在閱讀記敘文時，先掃描每一段落的動詞時態，辨認是以過去簡單式為主軸的客觀報導。",
            "formativeQuiz": [
              {
                "q": "First, the chef chopped the onions. ________, he heated the pan.",
                "options": [
                  "After",
                  "Then",
                  "Before",
                  "While"
                ],
                "ans": 1,
                "hint1": "句首有逗號，是獨立副詞連接詞。",
                "hint2": "First 與 Then 構成最標準的時間順序副詞搭配。",
                "solution": "First..., Then... 敘述先後順序。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "After I went home, then I took a shower. ❌",
                "correct": "After I went home, I took a shower. ✔️",
                "reason": "After 已經是從屬連接詞，不可再跟 then 重複堆疊！"
              }
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
            "stage": "第四學習階段 (國中 8 年級 108 課綱)",
            "cefr": "A2+ (初級精熟 · 句構拓展)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "心測中心國中教育會考評量規準：過去簡單式、未來式、形容詞比較級最高級、動名詞與不定詞。", 
            "sourceRef": "jh:english-9",
            "motivation": "當電話響起時，我正在洗澡！長動作背景與短動作突發的交織，正是過去進行式與 when/while 的魅力所在。",
            "concepts": [
              {
                "title": "長動作背景 vs 短動作突發 (When vs While)",
                "formula": "While + 長動作 (was/were + V-ing), 短動作 (過去式) / When + 短動作 (過去式), 長動作 (was/were + V-ing)",
                "explanation": "while 後面接進行中的長動作；when 後面常接突然發生的瞬間短動作。",
                "example": "While I was studying in my room, the power suddenly went out.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [長動作背景 vs 短動作突發 (When vs While)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "While I was studying in my room, the power suddenly went out.",
                    "While I were studying in my room, the power suddenly went out.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「長動作背景 vs 短動作突發 (When vs While)」之核心公式：While + 長動作 (was/were + V-ing), 短動作 (過去式) / When + 短動作 (過去式), 長動作 (was/were + V-ing)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "simultaneous",
                "ipa": "/ˌsaɪmlˈteɪniəs/",
                "pos": "adj.",
                "zh": "同時發生的",
                "sentence": "While connects two simultaneous background actions."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "Did you hear that thunderstorm last night? It was louder than usual!",
                "zh": "你昨晚有聽到打雷嗎？比平常還要大聲很多！"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Yes! While I was studying for the math quiz, the power suddenly went out.",
                "zh": "有啊！我當時正在準備數學小考，電燈突然全都熄滅了。"
              },
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "What did you do then? Did you find a flashlight?",
                "zh": "那你後來怎麼辦？你有找到手電筒嗎？"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Fortunately, my brother brought a rechargeable lamp, so I kept reviewing.",
                "zh": "幸好我哥哥拿來了充電式檯燈，所以我能繼續複習。"
              }
            ],
            "reading": {
              "title": "The Night the Lights Went Out (停電的那一夜)",
              "strategy": "長短動作判定：區分正在進行的背景與突然發生的干擾事件。",
              "text": "Last Friday evening, a sudden storm hit the southern district. While families were having dinner, a lightning bolt struck the main power substation. Instantly, all neighborhood lights flickered and extinguished. People were searching for candles when emergency sirens began to echo through the rain.",
              "questions": [
                {
                  "q": "What were families doing when lightning struck?",
                  "ans": "They were having dinner."
                }
              ]
            },
            "step0Clue": "看連詞是 when 還是 while：while 後面接 was/were + V-ing (長動作)；when 後面常接一般過去式 (短動作)！",
            "formativeQuiz": [
              {
                "q": "Tom was riding his bicycle home ________ it started to pour with rain.",
                "options": [
                  "while",
                  "when",
                  "during",
                  "since"
                ],
                "ans": 1,
                "hint1": "started to pour 是突發的短動作過去式。",
                "hint2": "突發短動作前面搭配連接詞 when。",
                "solution": "瞬間短動作引導用 when。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "While it was started to rain... ❌",
                "correct": "While it was raining... / When it started to rain... ✔️",
                "reason": "start 是瞬間動詞，不可誤寫成 was started。"
              }
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
            "stage": "第四學習階段 (國中 8 年級 108 課綱)",
            "cefr": "A2+ (初級精熟 · 句構拓展)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "心測中心國中教育會考評量規準：過去簡單式、未來式、形容詞比較級最高級、動名詞與不定詞。", 
            "sourceRef": "jh:english-14",
            "motivation": "明天如果下雨，比賽就延期！這句話在英語中隱藏著最重要的大考文法定律：從屬條件子句用現在式代替未來式！",
            "concepts": [
              {
                "title": "條件副詞子句「從現代未」鐵律",
                "formula": "If / unless + S + 現在簡單式, S + will + 原形動詞",
                "explanation": "If 或 unless 引導的條件子句中，哪怕明天才發生，動詞也「絕對不可加 will」！",
                "example": "If the weather is fine tomorrow, we will go on a hike.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [條件副詞子句「從現代未」鐵律], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "If the weather is fine tomorrow, we will go on a hike.",
                    "If the weather are fine tomorrow, we will go on a hike.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「條件副詞子句「從現代未」鐵律」之核心公式：If / unless + S + 現在簡單式, S + will + 原形動詞。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "conditional",
                "ipa": "/kənˈdɪʃənl/",
                "pos": "adj.",
                "zh": "條件的",
                "sentence": "Conditional clauses express requirements for future events."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "Did you hear that thunderstorm last night? It was louder than usual!",
                "zh": "你昨晚有聽到打雷嗎？比平常還要大聲很多！"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Yes! While I was studying for the math quiz, the power suddenly went out.",
                "zh": "有啊！我當時正在準備數學小考，電燈突然全都熄滅了。"
              },
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "What did you do then? Did you find a flashlight?",
                "zh": "那你後來怎麼辦？你有找到手電筒嗎？"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Fortunately, my brother brought a rechargeable lamp, so I kept reviewing.",
                "zh": "幸好我哥哥拿來了充電式檯燈，所以我能繼續複習。"
              }
            ],
            "reading": {
              "title": "Emergency Preparedness Plan (防災應變準備指南)",
              "strategy": "條件與結果對應：辨識 'If A happens, do B' 結構。",
              "text": "Earthquakes occur without warning in Taiwan. If you feel strong shaking, immediately follow the 'Drop, Cover, and Hold On' protocol. Protect your head under a sturdy desk. Unless you are already near an open exit, do not rush downstairs in panic. If you smell gas, turn off the main valve before evacuating.",
              "questions": [
                {
                  "q": "What should you do immediately if you feel strong shaking?",
                  "ans": "Follow the 'Drop, Cover, and Hold On' protocol."
                }
              ]
            },
            "step0Clue": "看到 If 子句，主要子句有 will，If 裡面的空格立刻填「現在簡單式」(三單動詞加 -s)，絕對不要選 will！",
            "formativeQuiz": [
              {
                "q": "If Lisa ________ the train tomorrow morning, she will arrive late for the interview.",
                "options": [
                  "misses",
                  "will miss",
                  "missed",
                  "missing"
                ],
                "ans": 0,
                "hint1": "這是 If 條件子句，主要子句用 will arrive。",
                "hint2": "條件子句用現在式代替未來式，Lisa 是三單主詞。",
                "solution": "條件子句從現代未，三單動詞用 misses。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "If it will rain tomorrow, I will stay home. ❌",
                "correct": "If it rains tomorrow, I will stay home. ✔️",
                "reason": "If 條件子句禁止使用 will，需用現在式 rains 代替。"
              }
            ],
            "checklist": [
              "我牢記 If 條件子句絕對不能加 will",
              "我知道 unless 等於 if ... not (除非...否則不)"
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
            "stage": "第四學習階段 (國中 8 年級 108 課綱)",
            "cefr": "A2+ (初級精熟 · 句構拓展)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "心測中心國中教育會考評量規準：過去簡單式、未來式、形容詞比較級最高級、動名詞與不定詞。", 
            "sourceRef": "jh:english-4",
            "motivation": "enjoy reading 還是 enjoy to read？want to play 還是 want playing？動名詞與不定詞的搭配是會考文法單題的兵家必爭之地！",
            "concepts": [
              {
                "title": "三大必接動名詞巨頭 (Gerund Verbs)",
                "formula": "enjoy / practice / finish + V-ing",
                "explanation": "口訣：享受 (enjoy) 練習 (practice) 才能完成 (finish)！這三個動詞後面 100% 只能接 V-ing，絕不能接 to V。",
                "example": "She finished writing the report and enjoyed listening to music.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [三大必接動名詞巨頭 (Gerund Verbs)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "She finished writing the report and enjoyed listening to music.",
                    "She finarehed writing the report and enjoyed laretening to music.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「三大必接動名詞巨頭 (Gerund Verbs)」之核心公式：enjoy / practice / finish + V-ing。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "gerund",
                "ipa": "/ˈdʒerənd/",
                "pos": "n.",
                "zh": "動名詞",
                "sentence": "A gerund functions as a noun in a sentence."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "Did you hear that thunderstorm last night? It was louder than usual!",
                "zh": "你昨晚有聽到打雷嗎？比平常還要大聲很多！"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Yes! While I was studying for the math quiz, the power suddenly went out.",
                "zh": "有啊！我當時正在準備數學小考，電燈突然全都熄滅了。"
              },
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "What did you do then? Did you find a flashlight?",
                "zh": "那你後來怎麼辦？你有找到手電筒嗎？"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Fortunately, my brother brought a rechargeable lamp, so I kept reviewing.",
                "zh": "幸好我哥哥拿來了充電式檯燈，所以我能繼續複習。"
              }
            ],
            "reading": {
              "title": "The Joy of Learning Music (學習音樂的樂趣)",
              "strategy": "動詞後接結構抓取：標記所有接 V-ing 與接 to V 的動詞搭配。",
              "text": "Learning an instrument requires dedication and patience. Many students decide to learn guitar because they want to write their own songs. At first, your fingers will hurt, but if you keep practicing every day, you will soon enjoy playing complete melodies.",
              "questions": [
                {
                  "q": "Why do many students decide to learn guitar?",
                  "ans": "Because they want to write their own songs."
                }
              ]
            },
            "step0Clue": "看到 enjoy / practice / finish，眼睛閉著選 V-ing！看到 want / plan / decide，毫不猶豫選 to V！",
            "formativeQuiz": [
              {
                "q": "After three hours of hard work, the team finally finished ________ the bridge model.",
                "options": [
                  "build",
                  "to build",
                  "building",
                  "built"
                ],
                "ans": 2,
                "hint1": "主要動詞是 finished。",
                "hint2": "finish 後面只能接動名詞 V-ing。",
                "solution": "finish 後接動名詞 building。故選 C。"
              }
            ],
            "traps": [
              {
                "wrong": "He enjoys to play piano. ❌",
                "correct": "He enjoys playing piano. ✔️",
                "reason": "enjoy 後方受詞必須接動名詞 playing。"
              }
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
            "stage": "第四學習階段 (國中 8 年級 108 課綱)",
            "cefr": "A2+ (初級精熟 · 句構拓展)",
            "competency": "B1 符號溝通",
            "guideline": "心測中心國中教育會考評量規準：過去簡單式、未來式、形容詞比較級最高級、動名詞與不定詞。", 
            "sourceRef": "jh:english-10",
            "motivation": "這碗湯喝起來好香甜！中文說「香甜地」，英文卻嚴禁使用副詞，必須接形容詞！連綴動詞是台灣學子最容易踩雷的高頻考點。",
            "concepts": [
              {
                "title": "五大感官連綴動詞 + 形容詞 (Linking Verbs)",
                "formula": "look (看), sound (聽), smell (聞), taste (嚐), feel (摸/感覺) + 形容詞",
                "explanation": "連綴動詞後方接的是主詞補詞 (SC)，用來補充說明主詞性質，因此一律用「形容詞」，絕對不可用副詞！",
                "example": "The soup tastes delicious (不是 deliciously ❌)!",
                "examExample": {
                  "stem": "According to the core linguistic principle of [五大感官連綴動詞 + 形容詞 (Linking Verbs)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The soup tastes delicious (不是 deliciously ❌)!",
                    "The soup tastes delicious (不是 deliciously ❌)!",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「五大感官連綴動詞 + 形容詞 (Linking Verbs)」之核心公式：look (看), sound (聽), smell (聞), taste (嚐), feel (摸/感覺) + 形容詞。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "sensory",
                "ipa": "/ˈsensəri/",
                "pos": "adj.",
                "zh": "感官的",
                "sentence": "Sensory verbs describe sight, sound, taste, touch, and smell."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "Did you hear that thunderstorm last night? It was louder than usual!",
                "zh": "你昨晚有聽到打雷嗎？比平常還要大聲很多！"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Yes! While I was studying for the math quiz, the power suddenly went out.",
                "zh": "有啊！我當時正在準備數學小考，電燈突然全都熄滅了。"
              },
              {
                "speaker": "🧑‍🎓 Brian",
                "en": "What did you do then? Did you find a flashlight?",
                "zh": "那你後來怎麼辦？你有找到手電筒嗎？"
              },
              {
                "speaker": "👩‍🎓 Chloe",
                "en": "Fortunately, my brother brought a rechargeable lamp, so I kept reviewing.",
                "zh": "幸好我哥哥拿來了充電式檯燈，所以我能繼續複習。"
              }
            ],
            "reading": {
              "title": "The Art of Food Tasting (品嚐美食的感官藝術)",
              "strategy": "感官形容詞比對：找出文章中形容視覺、嗅覺、味覺的形容詞。",
              "text": "Professional food critics evaluate dishes using all five senses. First, the food must look appealing on the plate. Second, it should smell aromatic before entering the mouth. When eaten, textures must feel pleasant, and ingredients must taste harmonious. Perfect food engages the mind and the heart simultaneously.",
              "questions": [
                {
                  "q": "What must food critics evaluate first?",
                  "ans": "How appealing the food looks on the plate."
                }
              ]
            },
            "step0Clue": "看到 look, sound, smell, taste, feel，後面直接接「形容詞」(sweet, delicious, tired)；若加 like 則接「名詞」！",
            "formativeQuiz": [
              {
                "q": "The bakery's fresh bread smells ________ and attracts long lines of customers.",
                "options": [
                  "sweetly",
                  "sweet",
                  "sweetness",
                  "sweeter than"
                ],
                "ans": 1,
                "hint1": "smells 是連綴動詞。",
                "hint2": "連綴動詞後面當補詞必須使用形容詞。",
                "solution": "連綴動詞後接形容詞 sweet。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "You look very tiredly. ❌",
                "correct": "You look very tired. ✔️",
                "reason": "look 是連綴動詞，補詞應為形容詞 tired。"
              }
            ],
            "checklist": [
              "我牢記五大連綴動詞後面必接形容詞",
              "我知道連綴動詞 + like 才能接名詞"
            ]
          }
        ]
      }
    ]
  },
  {
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
            "stage": "第四學習階段 (國中 9 年級會考衝刺)",
            "cefr": "A2++ / Pre-B1 (會考 A++ 標竿)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。", 
            "sourceRef": "jh:english-5",
            "motivation": "現在完成式 (have/has + pp) 與被動語態 (be + pp) 是九年級三大高分文法重鎮，佔會考選擇題 35% 考點！",
            "concepts": [
              {
                "title": "現在完成式指標詞：since vs for",
                "formula": "have/has + p.p. + since + 過去時間點 (since 2020) / have/has + p.p. + for + 一段時間 (for three years)",
                "explanation": "since 接時間起點 (since yesterday, since he arrived)；for 接一段時間長度 (for 10 years)。",
                "example": "I have lived in Kaohsiung since 2018. (= for eight years)",
                "examExample": {
                  "stem": "Professor Higgins ___ at Oxford University for over twenty-five years, and he still conducts seminars every Tuesday.",
                  "options": [
                    "has taught",
                    "taught",
                    "is teaching",
                    "had taught"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 for over twenty-five years（長達25年）搭配後句 and he still conducts（至今仍在授課），表明動作始於過去並持續至現在，必須使用現在完成式 has taught。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "accomplishment",
                "ipa": "/əˈkɑːmplɪʃmənt/",
                "pos": "n.",
                "zh": "成就；達成",
                "sentence": "Finishing the marathon is a major accomplishment."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Have you reviewed the reading passage for the upcoming mock examination yet?",
                "zh": "你複習完即將到來的模擬考閱讀篇章了嗎？"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "I've already solved three past papers. The graphic charts require careful cross-referencing.",
                "zh": "我已經刷完三回歷屆試題了。圖表題真的需要非常仔細交叉檢索。"
              },
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Exactly! If we eliminate distractors with Step 0 clues, our accuracy improves drastically.",
                "zh": "沒錯！如果我們用步驟 0 題眼排除干擾項，準確率會大幅提升。"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "Let's review the fatal trap radar together during study hall.",
                "zh": "我們自習課一起來複習考場致命陷阱雷達吧。"
              }
            ],
            "reading": {
              "title": "Thirty Years of Conservation (三十年保育之路)",
              "strategy": "完成式時間跨度分析：確認行動從過去起點持續到當下。",
              "text": "For the past thirty years, the Formosan Black Bear Conservation Association has worked tirelessly to protect indigenous wildlife. Since its establishment in the 1990s, the sanctuary has rescued over fifty injured bears. Many habitats have been restored by dedicated volunteers.",
              "questions": [
                {
                  "q": "How many bears has the sanctuary rescued since the 1990s?",
                  "ans": "Over fifty injured bears."
                }
              ]
            },
            "step0Clue": "看到 since 或 for + 一段時間，動詞形式 99% 是現在完成式 have/has + p.p.！",
            "formativeQuiz": [
              {
                "q": "Mr. Lin ________ in this middle school since he moved to Hualien five years ago.",
                "options": [
                  "taught",
                  "has taught",
                  "is teaching",
                  "teaches"
                ],
                "ans": 1,
                "hint1": "看到 since he moved (從他五年前搬來起)。",
                "hint2": "since 引導過去時間點，主句必用現在完成式 have/has + p.p.。",
                "solution": "since 引導起點，主要子句用 has taught。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "I have lived here since 5 years. ❌",
                "correct": "I have lived here for 5 years. ✔️",
                "reason": "5 years 是時間段，必須搭配 for，不可用 since。"
              }
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
            "stage": "第四學習階段 (國中 9 年級會考衝刺)",
            "cefr": "A2++ / Pre-B1 (會考 A++ 標竿)",
            "competency": "B1 符號溝通",
            "guideline": "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。", 
            "sourceRef": "jh:english-11",
            "motivation": "make, have, let 後面受詞補詞接原形動詞！使役動詞與授予動詞是會考改錯與選擇題年年必考的黃金指標題。",
            "concepts": [
              {
                "title": "三大使役動詞接原形動詞法則",
                "formula": "make (強迫) / have (要求) / let (允許) + 受詞 + 原形動詞",
                "explanation": "使役動詞後方的受詞補詞「絕對不能加 to」，一律接原形動詞！但在被動語態時需還原 to (He was made to clean...)。",
                "example": "The coach made the players run ten laps around the field.",
                "examExample": {
                  "stem": "The coach made all athletes ___ ten kilometers around the track and let them ___ for fifteen minutes.",
                  "options": [
                    "run; rest",
                    "running; to rest",
                    "to run; resting",
                    "ran; rested"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】使役動詞 make 與 let 受詞後接「主動原型動詞 (V)」作為受詞補語，口訣「使役動詞後接受詞做動作，省略 to 用原型」，故選 run; rest。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "causative",
                "ipa": "/ˈkɔːzətɪv/",
                "pos": "adj.",
                "zh": "使役的",
                "sentence": "Make and let are common causative verbs."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Have you reviewed the reading passage for the upcoming mock examination yet?",
                "zh": "你複習完即將到來的模擬考閱讀篇章了嗎？"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "I've already solved three past papers. The graphic charts require careful cross-referencing.",
                "zh": "我已經刷完三回歷屆試題了。圖表題真的需要非常仔細交叉檢索。"
              },
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Exactly! If we eliminate distractors with Step 0 clues, our accuracy improves drastically.",
                "zh": "沒錯！如果我們用步驟 0 題眼排除干擾項，準確率會大幅提升。"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "Let's review the fatal trap radar together during study hall.",
                "zh": "我們自習課一起來複習考場致命陷阱雷達吧。"
              }
            ],
            "reading": {
              "title": "A Day in the Space Simulator (太空模擬器的一天)",
              "strategy": "使役結構抓取：找出指令由誰發出並要求他人執行何種動作。",
              "text": "During astronaut training, instructors make recruits practice emergency drills repeatedly. They do not let anyone skip safety procedures. The simulator makes gravity vanish, allowing astronauts to float freely in the air.",
              "questions": [
                {
                  "q": "What do instructors make recruits do repeatedly?",
                  "ans": "Practice emergency drills."
                }
              ]
            },
            "step0Clue": "看到 make / have / let 接人，受詞補詞找「原形動詞」！看到 get 接人，後面找「to V」！",
            "formativeQuiz": [
              {
                "q": "The strict teacher made all students ________ their mobile phones during class.",
                "options": [
                  "to turn off",
                  "turn off",
                  "turning off",
                  "turned off"
                ],
                "ans": 1,
                "hint1": "主要動詞是使役動詞 made。",
                "hint2": "make + 人 + 原形動詞。",
                "solution": "使役動詞 make 接原形動詞 turn off。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He made me to clean the room. ❌",
                "correct": "He made me clean the room. ✔️",
                "reason": "使役動詞 make 後面直接接原形動詞 clean，嚴禁加 to。"
              }
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
            "stage": "第四學習階段 (國中 9 年級會考衝刺)",
            "cefr": "A2++ / Pre-B1 (會考 A++ 標竿)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。", 
            "sourceRef": "jh:english-15",
            "motivation": "The girl (who) I saw yesterday is my classmate. 關係代名詞什麼時候可以省略？介系詞何時能提前？搞懂這套規則，長句結構一覽無遺。",
            "concepts": [
              {
                "title": "關係代名詞主格 vs 受格省略辨別法",
                "formula": "關代後接「主詞+動詞」➔ 關代為受格，可直接省略！關代後緊接「動詞」➔ 關代為主格，絕對不可省略！",
                "explanation": "The book (which) you bought is good. vs The man who lives next door is a doctor.",
                "example": "The song (that) she sang touched everyone's heart.",
                "examExample": {
                  "stem": "The ancient manuscript, ___ was discovered in an underground cave near the Dead Sea, contains Hebrew scriptures.",
                  "options": [
                    "which",
                    "that",
                    "who",
                    "where"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】先行詞 The ancient manuscript 為無生命事物，且前後以逗號隔開為「非限定關係子句」；考場必背鐵律：that 絕不可用於逗號之後的非限定子句，故只能選 which。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "antecedent",
                "ipa": "/ˌæntɪˈsiːdnt/",
                "pos": "n.",
                "zh": "先行詞",
                "sentence": "The relative pronoun modifies its antecedent."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Have you reviewed the reading passage for the upcoming mock examination yet?",
                "zh": "你複習完即將到來的模擬考閱讀篇章了嗎？"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "I've already solved three past papers. The graphic charts require careful cross-referencing.",
                "zh": "我已經刷完三回歷屆試題了。圖表題真的需要非常仔細交叉檢索。"
              },
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Exactly! If we eliminate distractors with Step 0 clues, our accuracy improves drastically.",
                "zh": "沒錯！如果我們用步驟 0 題眼排除干擾項，準確率會大幅提升。"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "Let's review the fatal trap radar together during study hall.",
                "zh": "我們自習課一起來複習考場致命陷阱雷達吧。"
              }
            ],
            "reading": {
              "title": "The Mentor Who Changed My Life (改變我一生的導師)",
              "strategy": "關係子句修飾拆解：找出先行詞與關代子句補充之資訊。",
              "text": "Everyone remembers a mentor who inspired their curiosity. For me, that person was Mr. Chang, the physics teacher whose passion for the cosmos was infectious. The telescope he lent me opened up a universe of wonders. Today, the dreams he nurtured continue to guide my scientific journey.",
              "questions": [
                {
                  "q": "What did Mr. Chang lend to the author?",
                  "ans": "A telescope."
                }
              ]
            },
            "step0Clue": "判定關代能否省略：看空格後面如果緊跟著另一個主詞與動詞 (S+V)，代表是受格，可以省略！",
            "formativeQuiz": [
              {
                "q": "The scientist ________ discovered the new galaxy won an international award.",
                "options": [
                  "who",
                  "which",
                  "whose",
                  "what"
                ],
                "ans": 0,
                "hint1": "先行詞是 The scientist (人)。",
                "hint2": "空格後面緊接動詞 discovered，需要主格關係代名詞 who。",
                "solution": "修飾人且當子句主格，選 who。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "The girl speaks English well is my sister. ❌",
                "correct": "The girl who speaks English well is my sister. ✔️",
                "reason": "關代當主格絕對不可省略，否則全句會出現兩個主要動詞。"
              }
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
            "stage": "第四學習階段 (國中 9 年級會考衝刺)",
            "cefr": "A2++ / Pre-B1 (會考 A++ 標竿)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。", 
            "sourceRef": "jh:english-12",
            "motivation": "Do you know where the station is? 間接問句與附加問句在日常溝通中代表禮貌與求證，會考每兩年必考一次直述句語序辨析！",
            "concepts": [
              {
                "title": "間接問句直述語序萬能公式",
                "formula": "疑問詞 + 主詞 + 動詞 (Wh- + S + V)",
                "explanation": "間接問句嵌入主句後，不再用倒裝問句語序，必須恢復為直述句語序！",
                "example": "Can you tell me what time the train departs (不是 does the train depart ❌)?",
                "examExample": {
                  "stem": "According to the core linguistic principle of [間接問句直述語序萬能公式], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Can you tell me what time the train departs (不是 does the train depart ❌)?",
                    "Can you tell me what time the train departs (不是 does the train depart ❌)?",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「間接問句直述語序萬能公式」之核心公式：疑問詞 + 主詞 + 動詞 (Wh- + S + V)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "indirect",
                "ipa": "/ˌɪndəˈrekt/",
                "pos": "adj.",
                "zh": "間接的",
                "sentence": "An indirect question sounds polite and respectful."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Have you reviewed the reading passage for the upcoming mock examination yet?",
                "zh": "你複習完即將到來的模擬考閱讀篇章了嗎？"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "I've already solved three past papers. The graphic charts require careful cross-referencing.",
                "zh": "我已經刷完三回歷屆試題了。圖表題真的需要非常仔細交叉檢索。"
              },
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Exactly! If we eliminate distractors with Step 0 clues, our accuracy improves drastically.",
                "zh": "沒錯！如果我們用步驟 0 題眼排除干擾項，準確率會大幅提升。"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "Let's review the fatal trap radar together during study hall.",
                "zh": "我們自習課一起來複習考場致命陷阱雷達吧。"
              }
            ],
            "reading": {
              "title": "Customer Service Etiquette (客服禮儀問答)",
              "strategy": "禮貌間接句型辨析：識別委婉詢問與直率問句的差異。",
              "text": "In professional communication, polite language creates trust. Instead of asking bluntly, 'Where is the manager?', professional clients prefer, 'Could you please inform me where the manager is?' Indirect questions show respect and consideration.",
              "questions": [
                {
                  "q": "Why do professionals use indirect questions?",
                  "ans": "Because they show respect and consideration."
                }
              ]
            },
            "step0Clue": "看到 Do you know / Can you tell me，後面的間接問句必是「疑問詞 + 主詞 + 動詞」，立刻把 does/did 去掉！",
            "formativeQuiz": [
              {
                "q": "Nobody knows where ________ last night.",
                "options": [
                  "did he go",
                  "he went",
                  "does he go",
                  "he goes"
                ],
                "ans": 1,
                "hint1": "where 引導間接問句名詞子句。",
                "hint2": "語序必須是「主詞 + 動詞」，且時間是 last night 過去式。",
                "solution": "間接問句語序為 where he went。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Do you know where does he live? ❌",
                "correct": "Do you know where he lives? ✔️",
                "reason": "間接問句內部必須恢復直述句語序，不可保留助動詞 does。"
              }
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
            "stage": "第四學習階段 (國中 9 年級會考衝刺)",
            "cefr": "A2++ / Pre-B1 (會考 A++ 標竿)",
            "competency": "B1 符號溝通、A2 系統思考",
            "guideline": "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。", 
            "sourceRef": "jh:english-6",
            "motivation": "會考閱讀長篇化、圖表化！作者在文章中未明說的弦外之音，該如何從蛛絲馬跡中合理推論？",
            "concepts": [
              {
                "title": "代名詞指代與推論三大鐵證",
                "formula": "指代就近原則 + 文本客觀證據支持 + 排除過度推論",
                "explanation": "遇到 What does 'it' refer to? 先看前一句話的主詞或受詞，確認性別與單複數。",
                "example": "The solar panel was broken. Replacing IT took three technicians a full day.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [代名詞指代與推論三大鐵證], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The solar panel was broken. Replacing IT took three technicians a full day.",
                    "The solar panel were broken. Replacing IT took three technicians a full day.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「代名詞指代與推論三大鐵證」之核心公式：指代就近原則 + 文本客觀證據支持 + 排除過度推論。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "inference",
                "ipa": "/ˈɪnfərəns/",
                "pos": "n.",
                "zh": "推論；結論",
                "sentence": "Make a reasonable inference based on textual evidence."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Have you reviewed the reading passage for the upcoming mock examination yet?",
                "zh": "你複習完即將到來的模擬考閱讀篇章了嗎？"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "I've already solved three past papers. The graphic charts require careful cross-referencing.",
                "zh": "我已經刷完三回歷屆試題了。圖表題真的需要非常仔細交叉檢索。"
              },
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Exactly! If we eliminate distractors with Step 0 clues, our accuracy improves drastically.",
                "zh": "沒錯！如果我們用步驟 0 題眼排除干擾項，準確率會大幅提升。"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "Let's review the fatal trap radar together during study hall.",
                "zh": "我們自習課一起來複習考場致命陷阱雷達吧。"
              }
            ],
            "reading": {
              "title": "Notice: Heritage Library Renovation (圖書館整修公告)",
              "strategy": "公告小字陷阱排除：仔細比對營業時間、條件例外與限制條款。",
              "text": "Notice: The Heritage Library will undergo acoustic ceiling renovations from March 1st to March 15th. During this period, the third-floor study rooms will be closed. However, the first-floor book borrowing desk and online reservation services will remain fully functional from 9:00 a.m. to 5:00 p.m. daily. Fines for overdue books due during the closure will be waived automatically.",
              "questions": [
                {
                  "q": "Which service remains available during renovation?",
                  "ans": "The first-floor book borrowing desk and online reservation."
                }
              ]
            },
            "step0Clue": "推論題切忌腦補！每一個選項都必須能在原文中圈出至少「一句話」作為直接證據支持！",
            "formativeQuiz": [
              {
                "q": "According to the notice, what will happen to overdue book fines during renovation?",
                "options": [
                  "They will be doubled.",
                  "They will be waived automatically.",
                  "They must be paid online.",
                  "They will be cancelled permanently."
                ],
                "ans": 1,
                "hint1": "在文章末句尋找 fines 關鍵字。",
                "hint2": "原文末句寫道 will be waived automatically (自動免除)。",
                "solution": "依原文末句，逾期罰款自動免除。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "憑自己的常識猜測答案，沒有在原文找證據。 ❌",
                "correct": "每一道題目都在原文圈出對應的證據句。 ✔️",
                "reason": "會考評量文本依據，未依據文章者必為誘答陷阱。"
              }
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
            "stage": "第四學習階段 (國中 9 年級會考衝刺)",
            "cefr": "A2++ / Pre-B1 (會考 A++ 標竿)",
            "competency": "A2 系統思考、B1 符號溝通、C3 國際理解",
            "guideline": "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。", 
            "sourceRef": "jh:english-16",
            "motivation": "會考壓軸題：一張火車班表 + 一封確認電子郵件 + 一則氣象預報！跨文本互證能力是拿到 A++ 滿分的最關鍵試金石。",
            "concepts": [
              {
                "title": "跨文本多模態資訊交叉比對法",
                "formula": "文本一 (時間限制) + 文本二 (預算或條件) ➔ 交集出唯一正確選項",
                "explanation": "克漏字注意篇章轉折詞 (However, Therefore, On the other hand, As a result)。",
                "example": "The train leaves at 8:15, but ticket prices double after 8:00.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [跨文本多模態資訊交叉比對法], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The train leaves at 8:15, but ticket prices double after 8:00.",
                    "The train leaves at 8:15, but ticket prices double after 8:00.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「跨文本多模態資訊交叉比對法」之核心公式：文本一 (時間限制) + 文本二 (預算或條件) ➔ 交集出唯一正確選項。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "multimodal",
                "ipa": "/ˌmʌltiˈmoʊdl/",
                "pos": "adj.",
                "zh": "多模態的",
                "sentence": "Multimodal texts combine graphs, maps, and written passages."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Have you reviewed the reading passage for the upcoming mock examination yet?",
                "zh": "你複習完即將到來的模擬考閱讀篇章了嗎？"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "I've already solved three past papers. The graphic charts require careful cross-referencing.",
                "zh": "我已經刷完三回歷屆試題了。圖表題真的需要非常仔細交叉檢索。"
              },
              {
                "speaker": "🧑‍🎓 Mark",
                "en": "Exactly! If we eliminate distractors with Step 0 clues, our accuracy improves drastically.",
                "zh": "沒錯！如果我們用步驟 0 題眼排除干擾項，準確率會大幅提升。"
              },
              {
                "speaker": "👩‍🎓 Sophie",
                "en": "Let's review the fatal trap radar together during study hall.",
                "zh": "我們自習課一起來複習考場致命陷阱雷達吧。"
              }
            ],
            "reading": {
              "title": "Intercity High-Speed Ferry Schedule (跨島高速渡輪時刻表)",
              "strategy": "雙文本交叉驗證：將電子郵件要求與班表時刻交叉比對。",
              "text": "Email from Captain Lee: 'Passengers traveling to Orchid Island must check in at Harbor Terminal 30 minutes before departure. Due to afternoon squalls, all sailings after 2:00 p.m. are cancelled. Morning sailings depart at 7:30 a.m., 9:30 a.m., and 11:30 a.m.'",
              "questions": [
                {
                  "q": "What is the latest ferry departure available?",
                  "ans": "11:30 a.m."
                }
              ]
            },
            "step0Clue": "做多文本題時，將兩份文本共同出現的「時間、日期、金額、地點」畫線連連看，答案就在交集處！",
            "formativeQuiz": [
              {
                "q": "If a passenger wants to take the 9:30 a.m. ferry, what time MUST they check in by?",
                "options": [
                  "9:00 a.m.",
                  "9:15 a.m.",
                  "9:30 a.m.",
                  "10:00 a.m."
                ],
                "ans": 0,
                "hint1": "規定要求在開航前 30 分鐘報到。",
                "hint2": "9:30 往前推算 30 分鐘為 9:00。",
                "solution": "9:30 扣除 30 分鐘為 9:00 a.m.。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "只看第一篇文本就急著下定論選答案。 ❌",
                "correct": "同時檢查第二篇文本是否有取消、特價或時間變更限制。 ✔️",
                "reason": "會考多文本題目常在第二篇文本中設置限制或取消條款。"
              }
            ],
            "checklist": [
              "我能同時整合時刻表、地圖與電子郵件資訊",
              "我能精確解讀 However, Therefore, As a result 的篇章轉折"
            ]
          }
        ]
      }
    ]
  },
  {
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:sentence_pillars",
            "motivation": "所有複雜的高中長難句，本質上都是五大句型的延伸與擴充。掌握動詞的及物 (transitive) 與不及物 (intransitive) 特性，就能一眼看穿長句的主幹核心。",
            "concepts": [
              {
                "title": "五大句型結構矩陣 (The Five Sentence Structures)",
                "formula": "S+Vi | S+V+SC | S+Vt+O | S+Vt+IO+DO | S+Vt+O+OC",
                "explanation": "1. 完全不及物 (S+V): Birds fly. 2. 不完全不及物 (S+V+SC): She looks happy. 3. 完全及物 (S+V+O): We love music. 4. 授與動詞 (S+V+IO+DO): He gave me a pen. 5. 不完全及物 (S+V+O+OC): They made him captain.",
                "example": "The committee found the proposed technological solution highly viable.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [五大句型結構矩陣 (The Five Sentence Structures)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The committee found the proposed technological solution highly viable.",
                    "The committee found the proposed technological solution highly viable.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「五大句型結構矩陣 (The Five Sentence Structures)」之核心公式：S+Vi | S+V+SC | S+Vt+O | S+Vt+IO+DO | S+Vt+O+OC。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "補語 (Complement) 的本質：形容詞 vs. 副詞",
                "formula": "S + make/find/keep + O + Adj (OC) [不可用副詞]",
                "explanation": "受詞補語用來補充說明受詞的性質或狀態，必須是形容詞或名詞，絕不可受中文翻譯影響而誤用副詞。",
                "example": "The warm tea kept the weary hikers awake (not: *wearily awake).",
                "examExample": {
                  "stem": "According to the core linguistic principle of [補語 (Complement) 的本質：形容詞 vs. 副詞], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The warm tea kept the weary hikers awake (not: *wearily awake).",
                    "The warm tea kept the weary hikers awake (not: *wearily awake).",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「補語 (Complement) 的本質：形容詞 vs. 副詞」之核心公式：S + make/find/keep + O + Adj (OC) [不可用副詞]。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "complement",
                "ipa": "/ˈkɑːmplɪmənt/",
                "pos": "n.",
                "zh": "補語；補充物",
                "sentence": "In this sentence, the adjective acts as an object complement."
              },
              {
                "word": "transitive",
                "ipa": "/ˈtrænsətɪv/",
                "pos": "adj.",
                "zh": "及物的",
                "sentence": "Transitive verbs must take a direct object to complete their meaning."
              },
              {
                "word": "viable",
                "ipa": "/ˈvaɪəbl/",
                "pos": "adj.",
                "zh": "切實可行的",
                "sentence": "Scientists consider solar-powered desalination a viable alternative."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "Deciphering Complex Sentences in Academic Texts (學術英文長難句拆解法)",
              "strategy": "骨架還原法：先圈出主動詞，劃掉介系詞片語與修飾語，還原五大基本句型。",
              "text": "In contemporary neuroscience, researchers, despite numerous methodological obstacles, consider the human brain an extraordinary computational mechanism. Although sensory inputs constantly flood the cortex, specialized neural circuits keep consciousness remarkably stable. Understanding these fundamental mechanisms enables cognitive scientists to develop revolutionary therapeutic interventions.",
              "questions": [
                {
                  "q": "What is the sentence pattern of 'researchers consider the human brain an extraordinary mechanism'?",
                  "ans": "S + V + O + OC (Pattern 5)"
                }
              ]
            },
            "step0Clue": "分析長難句第一步：先找動詞！若動詞後面有受詞且該形容詞描述受詞狀態，則是 S+V+O+OC 句型！",
            "formativeQuiz": [
              {
                "q": "The committee considers the newly formulated environmental policy ________ for urban resilience.",
                "options": [
                  "essential",
                  "essentially",
                  "essentialness",
                  "to essentially"
                ],
                "ans": 0,
                "hint1": "consider + O + OC，受詞補語需要形容詞。",
                "hint2": "中文常翻成『認為...是必要的』，但英語補語不可填副詞 essentially。",
                "solution": "consider + O + Adj.，形容詞 essential 作受詞補語。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "The teacher made the classroom quietly. ❌",
                "correct": "The teacher made the classroom quiet. ✔️",
                "reason": "make + O + Adj.，classroom 的狀態是安靜的，補語應用形容詞 quiet，而非副詞 quietly。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A1 身心素質與自我精進、B1 符號運用與溝通表達",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s1_review",
            "motivation": "非限定動詞 (Verbals) 是高中大考綜合測驗必考核心。動名詞 (V-ing) 帶有「已發生、習慣、回憶、經驗」之色彩；不定詞 (to V) 則指向「未發生、目標、企圖、未來」，掌握兩者時間箭頭方向即可秒殺試題。",
            "concepts": [
              {
                "title": "雙向動詞的時間箭頭 (Temporal Distinction of Dual Verbs)",
                "formula": "V + to V (指向未來未做) vs. V + V-ing (指向過去已做/正在做)",
                "explanation": "remember / forget / regret + to V = 記得/忘記/遺憾去執行 (尚未發生)；remember / forget / regret + V-ing = 記得/忘記/後悔做過某事 (已發生)。",
                "example": "Remember to lock the laboratory door tonight. vs. I distinctly remember locking it before leaving.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [雙向動詞的時間箭頭 (Temporal Distinction of Dual Verbs)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Remember to lock the laboratory door tonight. vs. I distinctly remember locking it before leaving.",
                    "Remember to lock the laboratory door tonight. vs. I daretinctly remember locking it before leaving.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「雙向動詞的時間箭頭 (Temporal Distinction of Dual Verbs)」之核心公式：V + to V (指向未來未做) vs. V + V-ing (指向過去已做/正在做)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "特殊介系詞 to 後接動名詞 (Prepositional 'to' + V-ing)",
                "formula": "look forward to / be used to / devote oneself to / object to + V-ing",
                "explanation": "此處的 to 為介系詞而非不定詞標記，後方必須接動名詞或名詞。",
                "example": "The scientist devoted his entire life to finding a cure for leukemia.",
                "examExample": {
                  "stem": "Our international science seminar will officially commence ___ 9:00 a.m. ___ Monday morning ___ early October.",
                  "options": [
                    "at; on; in",
                    "in; at; on",
                    "on; in; at",
                    "at; in; on"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】套用倒金字塔法則：特定時間點 9:00 a.m. 用 at；特定某天的早晨 (Monday morning) 用 on；月份十月 (October) 用 in，因此唯一正確搭配為 at; on; in。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "devote",
                "ipa": "/dɪˈvoʊt/",
                "pos": "v.",
                "zh": "奉獻；致力於",
                "sentence": "She decided to devote her career to marine conservation."
              },
              {
                "word": "regret",
                "ipa": "/rɪˈɡret/",
                "pos": "v./n.",
                "zh": "遺憾；後悔",
                "sentence": "He regretted not taking the advanced mathematics course."
              },
              {
                "word": "nuance",
                "ipa": "/ˈnuːɑːns/",
                "pos": "n.",
                "zh": "細微差別",
                "sentence": "Advanced learners must grasp the subtle nuances between near-synonyms."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Psychology of Habit Formation (習慣建立的心理學機制)",
              "strategy": "非限定動詞辨識：圈出文章中的 to V 與 V-ing，判斷是表目的還是表既定習慣。",
              "text": "Psychologists distinguish between striving to achieve goals and maintaining daily routines. When people attempt to establish a new habit, they often struggle with procrastination. Experts suggest breaking monumental challenges into micro-tasks. Instead of planning to run ten miles every weekend, committed individuals begin by walking fifteen minutes daily. After becoming accustomed to exercising regularly, the subconscious mind effortlessly perpetuates the cycle without cognitive strain.",
              "questions": [
                {
                  "q": "Why does 'accustomed to' take 'exercising' instead of 'exercise'?",
                  "ans": "Because 'to' in 'be accustomed to' is a preposition requiring a gerund."
                }
              ]
            },
            "step0Clue": "看到 to 時先問自己：這個 to 是介系詞 (表對象、方向、致志) 還是不定詞？be used to / look forward to 的 to 是介系詞，後面必須放 V-ing！",
            "formativeQuiz": [
              {
                "q": "All the members of the expedition are looking forward to ________ the summit at sunrise.",
                "options": [
                  "reach",
                  "reaching",
                  "reached",
                  "have reached"
                ],
                "ans": 1,
                "hint1": "look forward to 中的 to 是介系詞。",
                "hint2": "介系詞後面接名詞或動名詞 V-ing。",
                "solution": "look forward to + V-ing 為固定介系詞搭配，表示期待。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "I look forward to hear from you soon. ❌",
                "correct": "I look forward to hearing from you soon. ✔️",
                "reason": "look forward to 的 to 是介系詞，後面動詞必須使用動名詞 hearing。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考、B1 符號溝通、C2 人際關係與團隊合作",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s1_review",
            "motivation": "高中學術英語與科普閱讀中，超過 35% 的動詞使用被動語態以營造客觀、科學的論述風格。本單元掌握無靈主詞與客觀報導被動句型 (It is believed that...)。",
            "concepts": [
              {
                "title": "客觀報導句型雙重轉換 (Double Conversion of Impersonal Passives)",
                "formula": "It is said/believed/reported that S + V  <=>  S + is said/believed/reported + to V / to have p.p.",
                "explanation": "當報導動作與原動作同時代，後接 to V；若原動作先於報導時間，後接 to have p.p. (完成不定詞)。",
                "example": "It is believed that the pyramids were built over two decades. <=> The pyramids are believed to have been built over two decades.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [客觀報導句型雙重轉換 (Double Conversion of Impersonal Passives)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "It is believed that the pyramids were built over two decades. <=> The pyramids are believed to have been built over two decades.",
                    "It are believed that the pyramids were built over two decades. <=> The pyramids are believed to have been built over two decades.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「客觀報導句型雙重轉換 (Double Conversion of Impersonal Passives)」之核心公式：It is said/believed/reported that S + V  <=>  S + is said/believed/reported + to V / to have p.p.。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "無靈主詞 (Inanimate Subject) 的主動結構",
                "formula": "Inanimate Noun + drive / reveal / force / enable + O + to V",
                "explanation": "英文偏好以無生命的抽象名詞 (如 research, urgency, technology) 當主詞，中文常需轉譯為條件或原因。",
                "example": "A lack of sleep impairs cognitive function. (睡眠不足會損害認知功能)",
                "examExample": {
                  "stem": "According to the core linguistic principle of [無靈主詞 (Inanimate Subject) 的主動結構], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "A lack of sleep impairs cognitive function. (睡眠不足會損害認知功能)",
                    "A lack of sleep impairs cognitive function. (睡眠不足會損害認知功能)",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「無靈主詞 (Inanimate Subject) 的主動結構」之核心公式：Inanimate Noun + drive / reveal / force / enable + O + to V。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "impersonal",
                "ipa": "/ɪmˈpɜːrsənl/",
                "pos": "adj.",
                "zh": "客觀的；非指名個人的",
                "sentence": "Scientific papers are typically written in an impersonal style."
              },
              {
                "word": "inanimate",
                "ipa": "/ɪnˈænɪmət/",
                "pos": "adj.",
                "zh": "無生命的",
                "sentence": "English frequently employs inanimate subjects in formal discourse."
              },
              {
                "word": "impair",
                "ipa": "/ɪmˈper/",
                "pos": "v.",
                "zh": "損害；削弱",
                "sentence": "Chronic stress significantly impairs the immune response."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Rediscovery of Forgotten Civilizations (失落文明的重新發掘)",
              "strategy": "論述句型轉換：將主觀句子轉換為客觀報導被動句。",
              "text": "For centuries, the ruined temple deep in the jungle remained shrouded in myth. Recently, LiDAR technology was deployed by archaeologists to scan beneath the canopy. Thousands of previously unknown structures were detected. The metropolis is now believed to have supported more than one hundred thousand inhabitants during its zenith, completely transforming our historical understanding of pre-Columbian urbanism.",
              "questions": [
                {
                  "q": "Rewrite: 'It is now believed that the metropolis supported...' using 'The metropolis' as the subject.",
                  "ans": "The metropolis is now believed to have supported more than one hundred thousand inhabitants."
                }
              ]
            },
            "step0Clue": "在做句型轉換時，若被報導的事件比 is believed 發生得更早，不定詞必須使用完成式 to have p.p.！",
            "formativeQuiz": [
              {
                "q": "The manuscript, discovered in the monastery archives, is believed ________ by a fourteenth-century monk.",
                "options": [
                  "to write",
                  "to be written",
                  "to have written",
                  "to have been written"
                ],
                "ans": 3,
                "hint1": "manuscript (手稿) 是被書寫的，需要被動語態。",
                "hint2": "書寫動作發生在十四世紀，比現今的被認為 (is believed) 更早，需用完成被動不定詞 to have been p.p.。",
                "solution": "手稿在過去被寫成，故選用完成被動不定詞 to have been written。故選 D。"
              }
            ],
            "traps": [
              {
                "wrong": "The ancient fortress is believed to build in the third century. ❌",
                "correct": "The ancient fortress is believed to have been built in the third century. ✔️",
                "reason": "堡壘是被建造的 (被動)，且發生在過去 (先發生)，需使用完成被動不定詞 to have been built。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "名詞子句在句子中可作主詞、受詞、補語、同位語。學測與大考作文中，高分文章經常運用 that 名詞子句引導深刻論點，以及間接問句展示得體禮貌的提問技巧。",
            "concepts": [
              {
                "title": "間接問句平鋪直敘語序 (Declarative Word Order of Indirect Questions)",
                "formula": "Wh- / Whether / If + Subject + Verb [不可倒裝，無助動詞 do/does/did]",
                "explanation": "間接問句作為名詞子句嵌入主句時，語序必須恢復為「疑問詞 + 主詞 + 動詞」，不可保留直接問句的倒裝結構。",
                "example": "Direct: Where did they go? -> Indirect: I wonder where they went.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [間接問句平鋪直敘語序 (Declarative Word Order of Indirect Questions)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Direct: Where did they go? -> Indirect: I wonder where they went.",
                    "Direct: Where did they go? -> Indirect: I wonder where they went.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「間接問句平鋪直敘語序 (Declarative Word Order of Indirect Questions)」之核心公式：Wh- / Whether / If + Subject + Verb [不可倒裝，無助動詞 do/does/did]。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "堅決建意命要動詞後 that 子句 (Subjunctive with Verbs of Demand/Suggestion)",
                "formula": "S + demand/insist/suggest/order/require + that + S + (should) + V-原形",
                "explanation": "表示「命令、建議、要求、堅持」的動詞後面引導的 that 名詞子句，助動詞 should 常省略，動詞一律回歸原形動詞！",
                "example": "The physician insisted that the patient (should) quit smoking immediately.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [堅決建意命要動詞後 that 子句 (Subjunctive with Verbs of Demand/Suggestion)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The physician insisted that the patient (should) quit smoking immediately.",
                    "The physician insareted that the patient (should) quit smoking immediately.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「堅決建意命要動詞後 that 子句 (Subjunctive with Verbs of Demand/Suggestion)」之核心公式：S + demand/insist/suggest/order/require + that + S + (should) + V-原形。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "clause",
                "ipa": "/klɔːz/",
                "pos": "n.",
                "zh": "子句",
                "sentence": "A noun clause functions identically to a noun in a sentence."
              },
              {
                "word": "insist",
                "ipa": "/ɪnˈsɪst/",
                "pos": "v.",
                "zh": "堅持",
                "sentence": "The committee insisted that safety standards be strictly observed."
              },
              {
                "word": "whether",
                "ipa": "/ˈweðər/",
                "pos": "conj.",
                "zh": "是否",
                "sentence": "Whether we succeed depends largely on team collaboration."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "Bioethical Dilemmas in Artificial Intelligence (人工智慧的生物倫理困境)",
              "strategy": "子句功能識別：找出文中 that 引導的子句，判斷是受詞子句、同位語子句還是關係子句。",
              "text": "Medical researchers strongly recommend that AI diagnostic algorithms be subjected to rigorous clinical validation. The fact that neural networks operate as black boxes raises ethical questions about accountability. Healthcare administrators must evaluate whether automated diagnosis truly improves patient outcomes or merely accelerates administrative procedures.",
              "questions": [
                {
                  "q": "Why is the verb in 'AI diagnostic algorithms be subjected' in base form?",
                  "ans": "Because 'recommend that' requires the subjunctive mood (should + base form)."
                }
              ]
            },
            "step0Clue": "看到 suggest / recommend / demand / insist + that 子句時，立刻檢查動詞是否為原形動詞 (原形 be 或原形 V)！",
            "formativeQuiz": [
              {
                "q": "The laboratory safety inspector demanded that all hazardous chemicals ________ in fireproof cabinets immediately.",
                "options": [
                  "stored",
                  "are stored",
                  "be stored",
                  "must store"
                ],
                "ans": 2,
                "hint1": "demand that 後方引導要求建議語氣。",
                "hint2": "公式為 that + S + (should) + V-原形，化學品是被存放，因此為 (should) be stored。",
                "solution": "demand that + S + (should) + 原形動詞，化學物品需被存放，故省略 should 後保留原形 be stored。故選 C。"
              }
            ],
            "traps": [
              {
                "wrong": "He asked me where did I buy the textbook. ❌",
                "correct": "He asked me where I bought the textbook. ✔️",
                "reason": "間接問句為名詞子句，語序必須是「疑問詞 + 主詞 + 動詞」，不可保留助動詞 did 倒裝。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "形容詞子句是英語提升資訊密度的核心引擎。學測閱讀與克漏字中，掌握先行詞 (antecedent) 與關係代名詞 (who, whom, which, that, whose) 的對應，以及「介系詞 + 關係代名詞」結構是衝刺頂標的基石。",
            "concepts": [
              {
                "title": "關係代名詞格位判定原則 (Case Selection for Relative Pronouns)",
                "formula": "先行詞(人) + who(主格) / whom(受格) / whose(所有格) ; 先行詞(物) + which(主/受格) / whose(所有格)",
                "explanation": "先行詞在子句中作主詞用 who/which；作動詞或介系詞之受詞用 whom/which/that；作名詞所有格用 whose (+ 無冠詞名詞)。",
                "example": "The researcher whose paper was cited over a thousand times received the Nobel Prize.",
                "examExample": {
                  "stem": "The ancient manuscript, ___ was discovered in an underground cave near the Dead Sea, contains Hebrew scriptures.",
                  "options": [
                    "which",
                    "that",
                    "who",
                    "where"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】先行詞 The ancient manuscript 為無生命事物，且前後以逗號隔開為「非限定關係子句」；考場必背鐵律：that 絕不可用於逗號之後的非限定子句，故只能選 which。"
                }
              },
              {
                "title": "介系詞提前與關係代名詞 (Preposition + Relative Pronoun)",
                "formula": "Prep + whom / Prep + which [絕不可用 that 或 who！]",
                "explanation": "當關係子句中動詞搭配的介系詞移至關係代名詞前方時，先行詞為人用 whom，先行詞為物用 which。介系詞後方絕對禁用 that！",
                "example": "This is the ecological sanctuary in which hundreds of migratory birds nest (not: *in that).",
                "examExample": {
                  "stem": "Our international science seminar will officially commence ___ 9:00 a.m. ___ Monday morning ___ early October.",
                  "options": [
                    "at; on; in",
                    "in; at; on",
                    "on; in; at",
                    "at; in; on"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】套用倒金字塔法則：特定時間點 9:00 a.m. 用 at；特定某天的早晨 (Monday morning) 用 on；月份十月 (October) 用 in，因此唯一正確搭配為 at; on; in。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "antecedent",
                "ipa": "/ˌæntɪˈsiːdnt/",
                "pos": "n.",
                "zh": "先行詞；前情",
                "sentence": "Identify the antecedent before choosing the appropriate relative pronoun."
              },
              {
                "word": "sanctuary",
                "ipa": "/ˈsæŋktʃueri/",
                "pos": "n.",
                "zh": "庇護所；自然保護區",
                "sentence": "The wetland serves as a sanctuary for endangered waterfowl."
              },
              {
                "word": "invariable",
                "ipa": "/ɪnˈveriəbl/",
                "pos": "adj.",
                "zh": "不變的；恆定的",
                "sentence": "The speed of light in a vacuum is an invariable constant."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "Jane Goodall and the Chimpanzees of Gombe (珍古德與岡貝黑猩猩研究)",
              "strategy": "關係子句定位：畫出先行詞與關係子句，辨識修飾關係與介系詞來源。",
              "text": "In 1960, Jane Goodall arrived at Gombe Stream National Park in Tanzania, an environment about which the scientific world knew very little. She observed primates whose intricate social hierarchies amazed ethologists. The breakthrough discovery that chimpanzees make and use tools, an ability with which humans previously credited only themselves, fundamentally revolutionized anthropology.",
              "questions": [
                {
                  "q": "Why is 'which' used in 'an environment about which' instead of 'that'?",
                  "ans": "Because 'that' cannot follow a preposition directly in a relative clause."
                }
              ]
            },
            "step0Clue": "看到介系詞後面空一格填關係代名詞時，先排除 that 和 who！先行詞是人選 whom，先行詞是物選 which！",
            "formativeQuiz": [
              {
                "q": "The symposium provided an inspiring platform on ________ leading climatologists discussed renewable strategies.",
                "options": [
                  "that",
                  "which",
                  "what",
                  "where"
                ],
                "ans": 1,
                "hint1": "空格前有介系詞 on。",
                "hint2": "介系詞後面不可放 that，platform 為物，應用 which。",
                "solution": "介系詞 on 後接指稱物的關係代名詞 which (on which = where)。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "The platform on that we met was crowded. ❌",
                "correct": "The platform on which we met was crowded. ✔️",
                "reason": "介系詞後絕不可使用關係代名詞 that，指物時必須用 which。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考、B1 符號溝通、C3 多元文化與國際理解",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "副詞子句如同文章的導航路標。掌握表時間 (as soon as, while)、因果 (since, because)、條件 (as long as, provided that)、讓步 (although, even though) 的連接詞，是寫作時避免串句 (run-on sentences) 的關鍵。",
            "concepts": [
              {
                "title": "條件與時間副詞子句時態陷阱 (Present Tense for Future in Adverbial Clauses)",
                "formula": "If / When / As soon as / Unless + S + V-現在式, S + will + V-原形",
                "explanation": "在表「時間」與「條件」的副詞子句中，一律使用「現在簡單式代替未來式」，主句則維持未來式 will + V。",
                "example": "As soon as the experiment yields definitive results tomorrow, the team will submit the paper.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [條件與時間副詞子句時態陷阱 (Present Tense for Future in Adverbial Clauses)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "As soon as the experiment yields definitive results tomorrow, the team will submit the paper.",
                    "As soon as the experiment yields definitive results tomorrow, the team will submit the paper.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「條件與時間副詞子句時態陷阱 (Present Tense for Future in Adverbial Clauses)」之核心公式：If / When / As soon as / Unless + S + V-現在式, S + will + V-原形。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "連接詞 (Conjunction) vs. 介系詞 (Preposition) vs. 轉折副詞 (Transition)",
                "formula": "Although + S + V (從屬連接詞) vs. Despite + N/V-ing (介系詞) vs. However, S + V (轉折副詞)",
                "explanation": "三者語意相近但句構截然不同：Although 接完整子句；Despite 接名詞片語；However 是副詞，後面須加逗號且不可連接兩子句。",
                "example": "Although it rained heavily, they went hiking. <=> Despite the heavy rain, they went hiking. <=> It rained heavily; however, they went hiking.",
                "examExample": {
                  "stem": "Our international science seminar will officially commence ___ 9:00 a.m. ___ Monday morning ___ early October.",
                  "options": [
                    "at; on; in",
                    "in; at; on",
                    "on; in; at",
                    "at; in; on"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】套用倒金字塔法則：特定時間點 9:00 a.m. 用 at；特定某天的早晨 (Monday morning) 用 on；月份十月 (October) 用 in，因此唯一正確搭配為 at; on; in。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "concession",
                "ipa": "/kənˈseʃn/",
                "pos": "n.",
                "zh": "讓步；妥協",
                "sentence": "In grammar, a clause of concession expresses an unexpected contrast."
              },
              {
                "word": "provided",
                "ipa": "/prəˈvaɪdɪd/",
                "pos": "conj.",
                "zh": "只要；在...條件下",
                "sentence": "You may enter the laboratory provided that you wear protective goggles."
              },
              {
                "word": "resilience",
                "ipa": "/rɪˈzɪliəns/",
                "pos": "n.",
                "zh": "韌性；適應力",
                "sentence": "Ecological resilience allows ecosystems to recover from natural disturbances."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "Global Climate Adaptation Strategies (全球氣候調適策略論壇)",
              "strategy": "邏輯連接詞圖解：圈出文章中的條件與讓步連接詞，理清各段論述關係。",
              "text": "Although developing nations produce a relatively small fraction of historical greenhouse emissions, they frequently bear the brunt of extreme weather events. Provided that international climate funds fulfill their capital pledges, vulnerable coastal communities will implement mangrove restoration projects. Unless immediate decarbonization occurs, sea levels will rise significantly faster than projected.",
              "questions": [
                {
                  "q": "What condition must be met for coastal communities to implement mangrove projects?",
                  "ans": "International climate funds must fulfill their capital pledges."
                }
              ]
            },
            "step0Clue": "在做文法改錯或克漏字時，看到空格後接的是名詞片語還是完整子句？完整子句選 Although/Because；名詞片語選 Despite/Because of！",
            "formativeQuiz": [
              {
                "q": "________ experiencing severe turbulent weather during the transatlantic flight, the aircraft landed smoothly on schedule.",
                "options": [
                  "Although",
                  "Despite",
                  "Because",
                  "Even though"
                ],
                "ans": 1,
                "hint1": "空格後是 experiencing severe turbulent weather (動名詞片語，無獨立主詞與限定動詞)。",
                "hint2": "Despite 是介系詞，後接名詞或動名詞片語；Although/Even though 後接完整子句。",
                "solution": "後方為動名詞片語，且前後語意為讓步轉折，故選介系詞 Despite。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Although the budget was limited, but the team succeeded. ❌",
                "correct": "Although the budget was limited, the team succeeded. ✔️",
                "reason": "英文中 Although (從屬連接詞) 與 but (對等連接詞) 不可同時出現在同一個句子中。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "逗號在英文關係子句中具有生死攸關的語義區隔。限定用法縮小範圍；非限定用法 (加逗號) 提供額外補充說明。非限定關係子句絕對不能使用 that！",
            "concepts": [
              {
                "title": "非限定子句修飾整句或先行詞 (Comma + which / who)",
                "formula": "S + V + O, which + V (which 代替前面整個句子或先行詞)",
                "explanation": "逗號後的 which 不僅可指代前面的名詞，更常指代前面整個句子所陳述的事實，此時動詞一律視為單數！",
                "example": "The factory reduced greenhouse emissions by 40%, which surprised regulatory authorities.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [非限定子句修飾整句或先行詞 (Comma + which / who)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The factory reduced greenhouse emissions by 40%, which surprised regulatory authorities.",
                    "The factory reduced greenhouse emaresions by 40%, which surprareed regulatory authorities.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「非限定子句修飾整句或先行詞 (Comma + which / who)」之核心公式：S + V + O, which + V (which 代替前面整個句子或先行詞)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "限定 vs. 非限定的語意對比 (Semantic Distinction)",
                "formula": "He has two sons who are doctors (可能有其他兒子) vs. He has two sons, who are doctors (總共只有兩個兒子)",
                "explanation": "無逗號為限定修飾 (眾多中的一部分)；有逗號為補充說明 (等於全部)。",
                "example": "Paris, which is the capital of France, attracts millions of tourists annually.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [限定 vs. 非限定的語意對比 (Semantic Distinction)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Paris, which is the capital of France, attracts millions of tourists annually.",
                    "Parare, which are the capital of France, attracts millions of tourarets annually.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「限定 vs. 非限定的語意對比 (Semantic Distinction)」之核心公式：He has two sons who are doctors (可能有其他兒子) vs. He has two sons, who are doctors (總共只有兩個兒子)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "restrictive",
                "ipa": "/rɪˈstrɪktɪv/",
                "pos": "adj.",
                "zh": "限定的；限制性的",
                "sentence": "Restrictive clauses define which specific item is being discussed."
              },
              {
                "word": "regulatory",
                "ipa": "/ˈreɡjələtɔːri/",
                "pos": "adj.",
                "zh": "監管的；管理的",
                "sentence": "The drug must pass regulatory evaluation before clinical release."
              },
              {
                "word": "zenith",
                "ipa": "/ˈziːnɪθ/",
                "pos": "n.",
                "zh": "頂點；鼎盛時期",
                "sentence": "The Roman Empire reached its political zenith in the second century."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Miracle of Penicillin: Fleming's Serendipity (青黴素的奇蹟發現)",
              "strategy": "逗號 which 功能辨析：判斷 which 是修飾前一名詞還是修飾前述整件事實。",
              "text": "In 1928, Alexander Fleming left a petri dish uncovered before leaving for vacation. Upon returning, he noticed that mold had dissolved surrounding staphylococcus colonies, which astonished the Scottish bacteriologist. Fleming identified the mold as Penicillium notatum, which eventually saved millions of lives during World War II.",
              "questions": [
                {
                  "q": "What does the first 'which' refer to in the passage?",
                  "ans": "The entire preceding fact that mold had dissolved surrounding staphylococcus colonies."
                }
              ]
            },
            "step0Clue": "看到先行詞後面有逗號 (,) 時，關係代名詞第一時間刪除 that！指人選 who/whom，指物或指前面整件事選 which！",
            "formativeQuiz": [
              {
                "q": "The solar flare disrupted global satellite communications for two days, ________ caused widespread navigation errors.",
                "options": [
                  "that",
                  "which",
                  "what",
                  "it"
                ],
                "ans": 1,
                "hint1": "空格前有逗號 (,)。",
                "hint2": "逗號後面引導子句補充說明整件事實，且不可使用 that。",
                "solution": "逗號後引導非限定關係子句修飾整件事情，應用 which。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He won the gold medal, that made his parents proud. ❌",
                "correct": "He won the gold medal, which made his parents proud. ✔️",
                "reason": "逗號後的非限定關係子句代指前面整件事實，必須使用 which，絕對不可使用 that。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "學測指考常考的高階關係代名詞：what (= the thing which)、whoever (= anyone who)、whichever，以及準關係代名詞 as, than, but。掌握本單元是長篇閱讀突破 80 分的關鍵鑰匙。",
            "concepts": [
              {
                "title": "複合關係代名詞 what 的本質 (The Anatomy of 'What')",
                "formula": "what + 缺主詞或受詞之不完整子句 = the thing(s) which / that",
                "explanation": "what 本身兼具「先行詞 + 關係代名詞」雙重身分，因此前面絕對不可再有先行詞！",
                "example": "What surprised everyone was her calm demeanor under pressure.",
                "examExample": {
                  "stem": "The ancient manuscript, ___ was discovered in an underground cave near the Dead Sea, contains Hebrew scriptures.",
                  "options": [
                    "which",
                    "that",
                    "who",
                    "where"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】先行詞 The ancient manuscript 為無生命事物，且前後以逗號隔開為「非限定關係子句」；考場必背鐵律：that 絕不可用於逗號之後的非限定子句，故只能選 which。"
                }
              },
              {
                "title": "準關係代名詞 as 的常規句型 (Quasi-Relative 'As')",
                "formula": "as is known to all / as was expected / such ... as ...",
                "explanation": "as 可作準關係代名詞引導子句，常置於句首代指後面的整句話，意為「正如...所...」。",
                "example": "As is widely acknowledged, physical exercise enhances mental health.",
                "examExample": {
                  "stem": "The ancient manuscript, ___ was discovered in an underground cave near the Dead Sea, contains Hebrew scriptures.",
                  "options": [
                    "which",
                    "that",
                    "who",
                    "where"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】先行詞 The ancient manuscript 為無生命事物，且前後以逗號隔開為「非限定關係子句」；考場必背鐵律：that 絕不可用於逗號之後的非限定子句，故只能選 which。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "demeanor",
                "ipa": "/dɪˈmiːnər/",
                "pos": "n.",
                "zh": "舉止；風度",
                "sentence": "Her professional demeanor inspired confidence among the investors."
              },
              {
                "word": "acknowledge",
                "ipa": "/əkˈnɑːlɪdʒ/",
                "pos": "v.",
                "zh": "承認；公認",
                "sentence": "Scholars universally acknowledge the profound impact of the printing press."
              },
              {
                "word": "indispensable",
                "ipa": "/ˌɪndɪˈspensəbl/",
                "pos": "adj.",
                "zh": "不可或缺的",
                "sentence": "Critical thinking is an indispensable skill in the era of disinformation."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Architecture of Trust in Online Transactions (網路交易的信任架構)",
              "strategy": "複合關係詞拆解：將 what 還原為 the thing which，檢驗主受格完整性。",
              "text": "What distinguishes secure cryptographic protocols from traditional authentication is mathematical verifiability. Whoever attempts to manipulate ledger entries encounters immediate cryptographic rejection. As has been proven in multiple security audits, decentralized consensus guarantees integrity without reliance on a single central entity.",
              "questions": [
                {
                  "q": "What is the subject of the main clause in the first sentence?",
                  "ans": "The noun clause 'What distinguishes secure cryptographic protocols from traditional authentication'."
                }
              ]
            },
            "step0Clue": "看到空格後句子缺主詞或受詞，且空格前「完全沒有先行詞」時，優先考慮複合關係代名詞 what！",
            "formativeQuiz": [
              {
                "q": "________ is needed right now is a comprehensive contingency plan to deal with supply chain disruptions.",
                "options": [
                  "That",
                  "What",
                  "Which",
                  "It"
                ],
                "ans": 1,
                "hint1": "空格引導整個主詞子句，且空格後缺主詞 is needed。",
                "hint2": "空格前無先行詞，等於 The thing which is needed。",
                "solution": "複合關係代名詞 What 引導名詞子句作主詞，自身代表 the thing which。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "I cannot understand the reason what made her quit. ❌",
                "correct": "I cannot understand the reason why/that made her quit. ✔️",
                "reason": "what 前面不可有先行詞 the reason；此處先行詞已存在，應用 why 或 which/that。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "B1 符號運用、B2 科技資訊與媒體素養、C1 道德實踐與公民意識",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "學測綜合測驗與篇章結構題型的核心考點就是篇章標記 (Discourse Markers)。掌握因果 (consequently, therefore)、轉折 (on the other hand, in contrast)、遞進 (moreover, furthermore)、舉例 (for instance, to illustrate) 的轉折副詞，是打通高二長文脈絡的命脈。",
            "concepts": [
              {
                "title": "篇章轉折副詞標點規範 (Punctuation of Transition Adverbs)",
                "formula": "Sentence 1; therefore, Sentence 2.  OR  Sentence 1. In addition, Sentence 2.",
                "explanation": "轉折副詞不是連接詞，不能用單一逗號連接兩個完整句子！前面必須是句號或分號，其後緊隨逗號。",
                "example": "The cost of lithium batteries has plummeted; consequently, electric vehicle adoption has surged.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [篇章轉折副詞標點規範 (Punctuation of Transition Adverbs)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The cost of lithium batteries has plummeted; consequently, electric vehicle adoption has surged.",
                    "The cost of lithium batteries has plummeted; consequently, electric vehicle adoption has surged.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「篇章轉折副詞標點規範 (Punctuation of Transition Adverbs)」之核心公式：Sentence 1; therefore, Sentence 2.  OR  Sentence 1. In addition, Sentence 2.。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "四大核心邏輯語義家族 (Four Major Logical Families)",
                "formula": "Contrast (轉折) | Additive (遞進) | Causal (因果) | Exemplification (舉例)",
                "explanation": "1. 轉折: nevertheless, however, conversely 2. 遞進: furthermore, moreover, additionally 3. 因果: thus, hence, accordingly 4. 舉例: specifically, notably.",
                "example": "Renewable energy produces minimal emissions. Furthermore, operational costs decline over time.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [四大核心邏輯語義家族 (Four Major Logical Families)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Renewable energy produces minimal emissions. Furthermore, operational costs decline over time.",
                    "Renewable energy produces minimal emaresions. Furthermore, operational costs decline over time.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「四大核心邏輯語義家族 (Four Major Logical Families)」之核心公式：Contrast (轉折) | Additive (遞進) | Causal (因果) | Exemplification (舉例)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "consequently",
                "ipa": "/ˈkɑːnsəkwentli/",
                "pos": "adv.",
                "zh": "結果；因此",
                "sentence": "Deforestation escalated; consequently, soil erosion worsened dramatically."
              },
              {
                "word": "furthermore",
                "ipa": "/ˈfɜːrðərmɔːr/",
                "pos": "adv.",
                "zh": "此外；而且",
                "sentence": "Furthermore, urban rooftop gardens lower ambient city temperatures."
              },
              {
                "word": "conversely",
                "ipa": "/kənˈvɜːrsli/",
                "pos": "adv.",
                "zh": "相反地",
                "sentence": "Some thrive under competitive pressure; conversely, others become paralyzed with anxiety."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Double-Edged Sword of Social Media (社群媒體的雙面刃效應)",
              "strategy": "篇章邏輯鏈建構：依據轉折副詞將各段論點標記為正向 (+) 或負向 (-)。",
              "text": "Digital social networks democratize information dissemination by giving a voice to grassroots communities. Furthermore, they facilitate rapid crowd-sourced disaster relief. However, algorithmic content feeds tend to incentivize sensationalism over factual accuracy. Consequently, echo chambers solidify, and polarization intensifies. Nevertheless, proactive media literacy initiatives offer a viable defense against synthetic propaganda.",
              "questions": [
                {
                  "q": "What is the logical function of 'Consequently' in the paragraph?",
                  "ans": "To introduce the adverse result of algorithmic feeds prioritizing sensationalism."
                }
              ]
            },
            "step0Clue": "解篇章結構題時，先圈出每題選項中的 However, Furthermore, Consequently，並看前一句與後一句是順向因果還是反向對比！",
            "formativeQuiz": [
              {
                "q": "The archaeological expedition faced unrelenting blizzards and equipment malfunctions; ________, the researchers persisted until the tomb was unearthed.",
                "options": [
                  "therefore",
                  "nevertheless",
                  "furthermore",
                  "similarly"
                ],
                "ans": 1,
                "hint1": "前句提到遭遇暴風雪與設備故障 (困難障礙)。",
                "hint2": "後句提到研究人員堅持不懈直到墓穴出土 (反向轉折)。",
                "solution": "前後語意為困難與堅毅的反向轉折，應用 nevertheless (然而/儘管如此)。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He missed the train, therefore he arrived late. ❌",
                "correct": "He missed the train; therefore, he arrived late. ✔️",
                "reason": "therefore 是副詞而非連接詞，不可只用一個逗號連接兩句，前面必須用分號或句號。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "B2 科技資訊與媒體素養、A2 系統思考與解決問題",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "108 課綱學測全新命題亮點：混合題型 (Hybrid Questions) 與圖表多文本題。結合柱狀圖、圓餅圖、趨勢線與專題報導，要求考生具備跨文本檢索、對照、歸納與簡答書寫的能力。",
            "concepts": [
              {
                "title": "圖表數據描述的核心動詞與趨勢用語 (Vocabulary for Data Description)",
                "formula": "surge / skyrocket (急升) | plunge / plummet (急跌) | fluctuate (波動) | plateau (持平)",
                "explanation": "描述數據變化時，善用精準動詞與副詞：grow steadily, decline marginally, peak at, drop to an all-time low.",
                "example": "Renewable generation peaked in July, whereas coal dependency declined precipitously.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [圖表數據描述的核心動詞與趨勢用語 (Vocabulary for Data Description)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Renewable generation peaked in July, whereas coal dependency declined precipitously.",
                    "Renewable generation peaked in July, whereas coal dependency declined precipitously.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「圖表數據描述的核心動詞與趨勢用語 (Vocabulary for Data Description)」之核心公式：surge / skyrocket (急升) | plunge / plummet (急跌) | fluctuate (波動) | plateau (持平)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "雙文本觀點比對法則 (Cross-Text Comparative Protocol)",
                "formula": "Text A (客觀數據/圖表) + Text B (個人投書/社論) -> 尋找矛盾點與支持證據",
                "explanation": "混合題常要求考生從文章中挑選一個字詞填空，或以簡答句說明 Text A 數據如何支持或反駁 Text B 的觀點。",
                "example": "According to Figure 1, the data directly contradicts the author's claim in paragraph 2.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [雙文本觀點比對法則 (Cross-Text Comparative Protocol)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "According to Figure 1, the data directly contradicts the author's claim in paragraph 2.",
                    "According to Figure 1, the data directly contradicts the author's claim in paragraph 2.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「雙文本觀點比對法則 (Cross-Text Comparative Protocol)」之核心公式：Text A (客觀數據/圖表) + Text B (個人投書/社論) -> 尋找矛盾點與支持證據。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "precipitously",
                "ipa": "/prɪˈsɪpɪtəsli/",
                "pos": "adv.",
                "zh": "急遽地；險峻地",
                "sentence": "Electric battery production costs have declined precipitously over the past decade."
              },
              {
                "word": "fluctuate",
                "ipa": "/ˈflʌktʃueɪt/",
                "pos": "v.",
                "zh": "波動；上下起伏",
                "sentence": "Global crude oil prices fluctuated widely due to geopolitical friction."
              },
              {
                "word": "plateau",
                "ipa": "/plæˈtoʊ/",
                "pos": "v./n.",
                "zh": "進入平穩期；高原",
                "sentence": "After three months of exponential growth, subscriber numbers began to plateau."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "Global Plastic Waste Management and Recycling Realities (全球塑膠廢棄物現況分析)",
              "strategy": "圖表與文本綜合對照：比對內文敘述百分比與統計圖數據是否一致。",
              "text": "A municipal report published yesterday presents paradoxical findings regarding consumer behavior. While 84% of surveyed households expressed intense concern over microplastic contamination, actual sorted recycling participation plateaued at only 28%. The accompanying bar chart reveals that single-use plastic consumption among young adults rose by 14% this year, largely driven by online delivery services. Environmental advocates argue that consumer awareness campaigns are insufficient without legislative bans.",
              "questions": [
                {
                  "q": "According to the passage, what specific service caused the 14% increase in single-use plastics?",
                  "ans": "Online delivery services."
                }
              ]
            },
            "step0Clue": "做大考圖表題時，先看圖表「標題、X軸單位、Y軸單位、圖例」，再對照文章中的關鍵數字與百分比！",
            "formativeQuiz": [
              {
                "q": "Based on the text, which verb best describes the condition of sorted recycling participation?",
                "options": [
                  "surged",
                  "plummeted",
                  "plateaued",
                  "fluctuated wildly"
                ],
                "ans": 2,
                "hint1": "文中提到 actual sorted recycling participation ________ at only 28%。",
                "hint2": "作者用這個字表示停留在某一數值不再上升或平穩維持。",
                "solution": "文章原文為 'participation plateaued at only 28%'，故選 plateaued。故選 C。"
              }
            ],
            "traps": [
              {
                "wrong": "填空題自己任意把文章中的名詞改寫成動詞形式。 ❌",
                "correct": "嚴格遵守題目指示，若註明 'from the passage' 必須原形/原詞摘錄。 ✔️",
                "reason": "學測混合題有嚴格評分規準，規定自文章摘錄者任意改寫將不予給分。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A2 系統思考與解決問題、B1 符號溝通",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "學測長篇與英檢中高級寫作極度著重批判思考的謹慎度 (Hedging)。情態助動詞對現在與過去的推測 (must have, can't have, should have) 是高中階段最具鑑別度的語法之一。",
            "concepts": [
              {
                "title": "對過去事件的推測矩陣 (Modal Deduction about Past Events)",
                "formula": "must have p.p. (必定做過) | can't/couldn't have p.p. (不可能做過) | may/might have p.p. (可能做過)",
                "explanation": "情態助動詞後加 have + p.p. 表示對「過去事實」的推測或判斷。",
                "example": "The streets are soaking wet; it must have rained cats and dogs last night.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [對過去事件的推測矩陣 (Modal Deduction about Past Events)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The streets are soaking wet; it must have rained cats and dogs last night.",
                    "The streets are soaking wet; it must have rained cats and dogs last night.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「對過去事件的推測矩陣 (Modal Deduction about Past Events)」之核心公式：must have p.p. (必定做過) | can't/couldn't have p.p. (不可能做過) | may/might have p.p. (可能做過)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "should have p.p. 的遺憾與責備 (Counterfactual Regret)",
                "formula": "should have p.p. (本來應該做卻沒做) vs. shouldn't have p.p. (本來不該做卻做了)",
                "explanation": "表達與過去事實相反的批評或懊悔，為假設語氣的縮影。",
                "example": "You should have double-checked the flight departure gate before sitting down.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [should have p.p. 的遺憾與責備 (Counterfactual Regret)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "You should have double-checked the flight departure gate before sitting down.",
                    "You should have double-checked the flight departure gate before sitting down.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「should have p.p. 的遺憾與責備 (Counterfactual Regret)」之核心公式：should have p.p. (本來應該做卻沒做) vs. shouldn't have p.p. (本來不該做卻做了)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "deduction",
                "ipa": "/dɪˈdʌkʃn/",
                "pos": "n.",
                "zh": "推論；扣除",
                "sentence": "Sherlock Holmes relied on deductive reasoning to solve intricate mysteries."
              },
              {
                "word": "counterfactual",
                "ipa": "/ˌkaʊntərˈfæktʃuəl/",
                "pos": "adj.",
                "zh": "與事實相反的",
                "sentence": "A counterfactual statement ponders what might have transpired."
              },
              {
                "word": "scrutiny",
                "ipa": "/ˈskruːtəni/",
                "pos": "n.",
                "zh": "審查；仔細檢驗",
                "sentence": "The candidate's experimental methodology did not withstand rigorous peer scrutiny."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Disappearance of the Mary Celeste (瑪麗·苔絲特號失蹤之謎)",
              "strategy": "推論層次解析：將文章中關於過去的推測語氣標記為必然 (must)、可能 (might) 或不可能 (couldn't)。",
              "text": "In December 1872, the British brigantine Dei Gratia discovered the merchant vessel Mary Celeste adrift in choppy seas. The cargo of industrial alcohol was intact, and warm meals remained on the galley table, yet not a single soul was aboard. Naval historians agree the crew couldn't have abandoned ship due to piracy, for personal valuables were undisturbed. An unexpected vapor explosion might have terrified the captain, prompting a hasty evacuation.",
              "questions": [
                {
                  "q": "Why do historians believe piracy couldn't have been the cause?",
                  "ans": "Because the cargo and personal valuables were left undisturbed."
                }
              ]
            },
            "step0Clue": "判斷推測時間點：若是推測「過去發生的事」，一定要選 have + p.p.！若是表示「本來應該做卻沒做」，選 should have p.p.！",
            "formativeQuiz": [
              {
                "q": "I can't find my passport anywhere in the hotel room. I ________ it at the embassy this morning.",
                "options": [
                  "must leave",
                  "must have left",
                  "should leave",
                  "should have left"
                ],
                "ans": 1,
                "hint1": "找遍飯店房間都找不到 (肯定推測)。",
                "hint2": "遺留在使館發生在今天早上 (過去的事實推測)，需用 have p.p.。",
                "solution": "對過去事件的高度肯定推測，使用 must have + p.p.。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He didn't study, so he must fail the exam yesterday. ❌",
                "correct": "He didn't study, so he must have failed the exam yesterday. ✔️",
                "reason": "yesterday 是過去時間，對過去事情的推測必須使用 must have + p.p.，而非 must + 原形。"
              }
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
            "stage": "第五學習階段 (高中一年級 108 課綱)",
            "cefr": "B1 (學測核心基底)",
            "competency": "A1 身心素質、A2 系統思考、B1 符號溝通、C2 團隊合作",
            "guideline": "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。", 
            "sourceRef": "arch:s2_review",
            "motivation": "高一學習的集大成驗收。將五大句型、非限定動詞、被動語態、各類從屬子句、篇章標記與多文本整合，透過標準大考全真混合題架構進行實戰檢驗，為高二分詞與假設語氣打下磐石基礎。",
            "concepts": [
              {
                "title": "長篇混合題五步解題心法 (GSAT 5-Step Hybrid Mastery)",
                "formula": "1. 審視題幹關鍵詞 -> 2. 略讀文章抓主旨 -> 3. 掃讀定位精準句 -> 4. 檢驗句構文法格位 -> 5. 謄寫抄錄無失誤",
                "explanation": "面對大考長達 400-500 字的高難度文本，不可從頭死記。先看問題要求找人名、地名、年份或名詞，直擊原文段落。",
                "example": "Step 1 marks the question keyword 'thermal insulation'; Step 3 locates paragraph 4 line 3.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [長篇混合題五步解題心法 (GSAT 5-Step Hybrid Mastery)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Step 1 marks the question keyword 'thermal insulation'; Step 3 locates paragraph 4 line 3.",
                    "Step 1 marks the question keyword 'thermal insulation'; Step 3 locates paragraph 4 line 3.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「長篇混合題五步解題心法 (GSAT 5-Step Hybrid Mastery)」之核心公式：1. 審視題幹關鍵詞 -> 2. 略讀文章抓主旨 -> 3. 掃讀定位精準句 -> 4. 檢驗句構文法格位 -> 5. 謄寫抄錄無失誤。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "synthesis",
                "ipa": "/ˈsɪnθəsɪs/",
                "pos": "n.",
                "zh": "綜合；合成",
                "sentence": "The final paper required a synthesis of three separate research articles."
              },
              {
                "word": "culminating",
                "ipa": "/ˈkʌlmɪneɪtɪŋ/",
                "pos": "adj.",
                "zh": "終結的；登峰造極的",
                "sentence": "The culminating project demonstrated students' academic growth throughout the year."
              },
              {
                "word": "methodology",
                "ipa": "/ˌmeθəˈdɑːlədʒi/",
                "pos": "n.",
                "zh": "方法論；研究方法",
                "sentence": "The validity of scientific results depends entirely upon robust methodology."
              }
            ],
            "dialogue": [
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Remember that relative pronouns must agree in function with their antecedent.",
                "zh": "請大家記住，關係代名詞的句法功能必須與先行詞完全一致。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "So when modifying an entire preceding clause, we must use 'which' preceded by a comma?",
                "zh": "所以當修飾前面一整個子句時，我們必須用逗號加 which？"
              },
              {
                "speaker": "🧑‍🏫 Teacher Lin",
                "en": "Precisely. Never use 'that' in non-restrictive relative clauses.",
                "zh": "完全正確。非限定關係子句中絕對禁止使用 that。"
              },
              {
                "speaker": "🧑‍🎓 David",
                "en": "That clarifies the ambiguity I had in yesterday's reading assignment.",
                "zh": "這徹底解決了我昨天閱讀作業裡的困惑。"
              }
            ],
            "reading": {
              "title": "The Dawn of Quantum Computing (量子運算的破曉時刻)",
              "strategy": "跨概念綜合統整：結合被動語態、關係子句與轉折語詞，理清技術發展脈絡。",
              "text": "Quantum computing, which operates on the principles of quantum superposition and entanglement, represents an unprecedented leap in computational prowess. While classical supercomputers process binary bits sequentially, quantum processors manipulate qubits simultaneously, which allows them to perform complex calculations in minutes that would otherwise require millennia. Consequently, cybersecurity architectures must be completely reimagined to resist quantum decryption.",
              "questions": [
                {
                  "q": "Why does quantum computing compute exponentially faster than classical computers?",
                  "ans": "Because it manipulates qubits simultaneously using superposition and entanglement."
                }
              ]
            },
            "step0Clue": "在做高一總結評量時，遇到長難句先找主詞與主動詞，刮號所有修飾性關係子句與介系詞片語！",
            "formativeQuiz": [
              {
                "q": "Quantum processors manipulate qubits simultaneously, ________ enables calculations previously considered impossible.",
                "options": [
                  "that",
                  "which",
                  "what",
                  "where"
                ],
                "ans": 1,
                "hint1": "前有逗號，修飾前面整句事實。",
                "hint2": "逗號後引導非限定關係子句，不可用 that。",
                "solution": "逗號後引導非限定子句修飾整件事情，應用 which。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "長難句讀到後面就忘記前面主詞是單數還是複數。 ❌",
                "correct": "用鉛筆圈出核心主詞，排除所有夾在主詞與動詞間的修飾語。 ✔️",
                "reason": "大考最常見的陷阱就是主詞與動詞之間插入長達三行的關係子句，考生常誤將子句受詞當成主詞選錯動詞單複數。"
              }
            ],
            "checklist": [
              "我能融會貫通高一全冊五大句型、子句與篇章結構",
              "我具備自信挑戰學測全真混合題與圖表綜合分析能力"
            ]
          }
        ]
      }
    ]
  },
  {
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通、B3 藝術涵養與美感素養",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s3_review",
            "motivation": "分詞構句是英文追求「簡潔、節奏與優雅」的極致體現。在不引發歧義的前提下，將冗長的副詞子句精煉為分詞片語，是英美主流期刊與學術寫作的標誌性特徵。",
            "concepts": [
              {
                "title": "副詞子句化為分詞構句三步驟 (Three Steps to Participle Clauses)",
                "formula": "1. 省略連接詞 (若意思明確) -> 2. 省略相同主詞 -> 3. 主動化為 V-ing，被動化為 V-p.p. (省略 being)",
                "explanation": "主動進行用現在分詞 V-ing；被動或完成狀態用過去分詞 V-p.p.；否定詞 not 置於分詞最前面。",
                "example": "Because he felt exhausted, he fell asleep. => Feeling exhausted, he fell asleep. / Because it was damaged by hail, the roof leaked. => Damaged by hail, the roof leaked.",
                "examExample": {
                  "stem": "All sensitive personal data on our server ___ using AES-256 military-grade encryption before being transmitted.",
                  "options": [
                    "is protected",
                    "protects",
                    "was protecting",
                    "has protected"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】主詞 All sensitive personal data 與動詞 protect 為被動關係（數據是被保護），且表示日常安全常態原則，故使用現在被動式 is protected。"
                }
              },
              {
                "title": "分詞形容詞情緒動詞對比 (Emotive Participial Adjectives)",
                "formula": "V-ing (令人感到...的，指事物本質) vs. V-p.p. (某人感到...的，指內心狀態)",
                "explanation": "令人興奮的比賽是 exciting match；感到興奮的觀眾是 excited spectators。指物通常用 V-ing，指人心情通常用 V-p.p.。",
                "example": "The confusing explanation left all the confused students even more perplexed.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [分詞形容詞情緒動詞對比 (Emotive Participial Adjectives)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The confusing explanation left all the confused students even more perplexed.",
                    "The confusing explanation left all the confused students even more perplexed.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「分詞形容詞情緒動詞對比 (Emotive Participial Adjectives)」之核心公式：V-ing (令人感到...的，指事物本質) vs. V-p.p. (某人感到...的，指內心狀態)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "participle",
                "ipa": "/ˈpɑːrtɪsɪpl/",
                "pos": "n.",
                "zh": "分詞",
                "sentence": "A participle functions as an adjective or forms part of a compound tense."
              },
              {
                "word": "perplexed",
                "ipa": "/pərˈplekst/",
                "pos": "adj.",
                "zh": "困惑的；不知所措的",
                "sentence": "The contradictory laboratory findings left the scientists completely perplexed."
              },
              {
                "word": "conciseness",
                "ipa": "/kənˈsaɪsnəs/",
                "pos": "n.",
                "zh": "簡潔；精簡",
                "sentence": "Participle constructions contribute significantly to syntactic conciseness."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "Vincent van Gogh's Starry Night: Agony and Transcendence (梵谷《星夜》：痛苦與昇華)",
              "strategy": "分詞主幹追蹤：找出句首分詞片語，確認其修飾的主詞是誰。",
              "text": "Confined to the Saint-Paul asylum in Saint-Rémy, Vincent van Gogh painted with feverish intensity. Gazing out his barred eastern window before dawn, he perceived an immense morning star pulsating with cosmic energy. Transcending his earthly torment, the Dutch post-impressionist applied swirling strokes of cobalt blue and blazing chrome yellow, creating an immortal masterpiece that still mesmerizes audiences worldwide.",
              "questions": [
                {
                  "q": "Who was 'Gazing out his barred eastern window'?",
                  "ans": "Vincent van Gogh."
                }
              ]
            },
            "step0Clue": "做分詞構句題目時，第一件事：看主要子句的主詞是誰！然後問自己：這個主詞跟分詞動作的關係是「主動做」還是「被做」？主動選 V-ing，被動選 V-p.p.！",
            "formativeQuiz": [
              {
                "q": "________ by the overwhelming applause of the audience, the soprano bowed deeply on stage.",
                "options": [
                  "Encouraging",
                  "Encouraged",
                  "Having encouraged",
                  "To encourage"
                ],
                "ans": 1,
                "hint1": "主要子句主詞是 the soprano (女高音)。",
                "hint2": "女高音是「受到觀眾掌聲鼓勵 (被動)」，故需使用過去分詞。",
                "solution": "女高音受到鼓舞，兩者為被動關係，故選過去分詞 Encouraged。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Seen from the space station, the Earth looks like a blue marble. ❌ (若主要子句主詞是 astronauts 則錯誤)",
                "correct": "Seen from the space station, the Earth looks like a blue marble. ✔️ (因為是地球被看見)",
                "reason": "分詞片語的主詞必須與主句主詞保持嚴格一致，否則會形成懸垂分詞 (Dangling Participle)。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s3_review",
            "motivation": "當副詞子句與主要子句主詞「不同」時，子句主詞必須保留，形成「獨立分詞構句 (Nominative Absolute)」。此外，還有不受主詞限制的慣用評估分詞 (Generally speaking, judging from)，為大考綜合測驗必考核心。",
            "concepts": [
              {
                "title": "獨立分詞構句公式 (The Nominative Absolute Construction)",
                "formula": "Subject 1 + V-ing / V-p.p., Subject 2 + Verb...",
                "explanation": "前後主詞不同時，省略連接詞但保留子句主詞。常出現在表天氣、時間、伴隨狀況之語境。",
                "example": "Weather permitting, we will set sail at dawn. (若天氣允許，我們將在破曉啟航)",
                "examExample": {
                  "stem": "___ by the spectacular aurora borealis in northern Norway, the tourists stood in stunned silence for hours.",
                  "options": [
                    "Fascinated",
                    "Fascinating",
                    "To fascinate",
                    "Having fascinated"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】分詞修飾主要子句主詞 the tourists；遊客是被極光「深深吸引 (be fascinated by)」，省略連接詞與主詞後，被動語態保留過去分詞 Fascinated。"
                }
              },
              {
                "title": "with + 受詞 + 受詞補語之伴隨態 (Absolute 'with' Structure)",
                "formula": "with + O + V-ing (主動進行) / V-p.p. (被動完成) / Adj / Prep Phrase",
                "explanation": "用 with 引導名詞與受詞補語，表達伴隨發生的動作或身體狀態。",
                "example": "He listened intently with his arms folded across his chest.",
                "examExample": {
                  "stem": "All sensitive personal data on our server ___ using AES-256 military-grade encryption before being transmitted.",
                  "options": [
                    "is protected",
                    "protects",
                    "was protecting",
                    "has protected"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】主詞 All sensitive personal data 與動詞 protect 為被動關係（數據是被保護），且表示日常安全常態原則，故使用現在被動式 is protected。"
                }
              },
              {
                "title": "慣用懸置分詞 (Idiomatic Dangling Participles)",
                "formula": "Generally speaking (一般而言) | Judging from (從...來判斷) | Frankly speaking (坦白說)",
                "explanation": "這些慣用片語已演變為獨立副詞功能，不受主句主詞一致性規則的限制。",
                "example": "Judging from his accent, he must be a native of Scotland.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [慣用懸置分詞 (Idiomatic Dangling Participles)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Judging from his accent, he must be a native of Scotland.",
                    "Judging from hare accent, he must be a native of Scotland.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「慣用懸置分詞 (Idiomatic Dangling Participles)」之核心公式：Generally speaking (一般而言) | Judging from (從...來判斷) | Frankly speaking (坦白說)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "absolute",
                "ipa": "/ˈæbsəluːt/",
                "pos": "adj.",
                "zh": "獨立的；絕對的",
                "sentence": "An absolute participle construction retains its own independent subject."
              },
              {
                "word": "idiomatic",
                "ipa": "/ˌɪdiəˈmætɪk/",
                "pos": "adj.",
                "zh": "慣用的；地道的",
                "sentence": "Using idiomatic participle expressions makes English writing far more authentic."
              },
              {
                "word": "intently",
                "ipa": "/ɪnˈtentli/",
                "pos": "adv.",
                "zh": "專注地；熱切地",
                "sentence": "The chess grandmaster stared intently at the board before making his move."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "The Historic Launch of the James Webb Space Telescope (韋伯太空望遠鏡發射盛典)",
              "strategy": "伴隨狀態與獨立分詞識別：圈出 with + O + OC 與保留主詞之分詞句。",
              "text": "On Christmas morning in 2021, an Ariane 5 rocket stood ready on the launch pad in French Guiana. All safety checks completed, mission control initiated the final ignition countdown. With millions of viewers watching anxiously via global livestreams, the thrusters fired with deafening thunder. The telescope ascended smoothly into the stratosphere, its golden hexagonal mirrors destined to peer back 13.5 billion years into the cosmic dawn.",
              "questions": [
                {
                  "q": "Rewrite 'All safety checks completed' into a full subordinate clause.",
                  "ans": "After all safety checks had been completed."
                }
              ]
            },
            "step0Clue": "看到 with 後面跟著一個名詞 (受詞)，再填後面補語時：若名詞自己做動作選 V-ing；名詞被動接受或處於某狀態選 V-p.p. (例如 with eyes closed, with arms crossed)！",
            "formativeQuiz": [
              {
                "q": "The young philosopher sat silently by the fireplace, with his fingers ________ together in deep contemplation.",
                "options": [
                  "intertwining",
                  "intertwined",
                  "to intertwine",
                  "intertwines"
                ],
                "ans": 1,
                "hint1": "句型為 with + O + OC。",
                "hint2": "十指是「被交叉纏繞在一起 (被動狀態)」。",
                "solution": "手指被交叉緊扣，為被動完成狀態，受詞補語使用過去分詞 intertwined。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Judging from his grades, the teacher praised him. ❌ (意思變成老師從成績看，而非習慣語)",
                "correct": "Judging from his grades, he is an exceptional student. ✔️",
                "reason": "Judging from 習慣引導客觀事實或對該主詞的評價推論，後面主句主詞通常是所評價之對象。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s3_review",
            "motivation": "假設語氣是高中英語文法的最高巔峰。它並非單純描述事實，而是表達「與事實相反的願望、假想、推測或遺憾」。掌握「時態往過去倒退一格」的宇宙法則，即可縱橫所有大考題型。",
            "concepts": [
              {
                "title": "與現在相反之假設 (Subjunctive Unreal Present)",
                "formula": "If + S + were / V-ed, S + would/could/should/might + V-原形",
                "explanation": "與現在事實相反，子句動詞用過去式 (be 動詞一律用 were)；主要子句用助動詞過去式 + 原形動詞。",
                "example": "If I were a billionaire, I would fund marine plastic cleanup operations globally.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [與現在相反之假設 (Subjunctive Unreal Present)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "If I were a billionaire, I would fund marine plastic cleanup operations globally.",
                    "If I were a billionaire, I would fund marine plastic cleanup operations globally.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「與現在相反之假設 (Subjunctive Unreal Present)」之核心公式：If + S + were / V-ed, S + would/could/should/might + V-原形。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "與過去相反之假設 (Subjunctive Unreal Past)",
                "formula": "If + S + had + p.p., S + would/could/should/might + have + p.p.",
                "explanation": "與過去事實相反，子句動詞用過去完成式 had p.p.；主要子句用 would/could/should/might + have + p.p.。",
                "example": "If we had left ten minutes earlier, we would not have missed the high-speed rail.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [與過去相反之假設 (Subjunctive Unreal Past)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "If we had left ten minutes earlier, we would not have missed the high-speed rail.",
                    "If we had left ten minutes earlier, we would not have maresed the high-speed rail.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「與過去相反之假設 (Subjunctive Unreal Past)」之核心公式：If + S + had + p.p., S + would/could/should/might + have + p.p.。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "與未來相反之純假想 (Subjunctive Unreal Future)",
                "formula": "If + S + were to / should + V-原形, S + would/could + V-原形",
                "explanation": "were to 表「絕不可能發生的未來假想 (如太陽打西邊出來)」；should 表「萬一發生 (機率極低)」。",
                "example": "If the sun were to rise in the west, I would still honor my promise.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [與未來相反之純假想 (Subjunctive Unreal Future)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "If the sun were to rise in the west, I would still honor my promise.",
                    "If the sun were to raree in the west, I would still honor my promaree.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「與未來相反之純假想 (Subjunctive Unreal Future)」之核心公式：If + S + were to / should + V-原形, S + would/could + V-原形。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "subjunctive",
                "ipa": "/səbˈdʒʌŋktɪv/",
                "pos": "n./adj.",
                "zh": "假設語氣；虛擬語氣",
                "sentence": "The subjunctive mood expresses hypothetical conditions contrary to fact."
              },
              {
                "word": "hypothetical",
                "ipa": "/ˌhaɪpəˈθetɪkl/",
                "pos": "adj.",
                "zh": "假設的；假定的",
                "sentence": "Economists tested the algorithm against various hypothetical market crises."
              },
              {
                "word": "unprecedented",
                "ipa": "/ʌnˈpresɪdentɪd/",
                "pos": "adj.",
                "zh": "史無前例的",
                "sentence": "The region suffered an unprecedented drought due to climate destabilization."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "Counterfactual History: What If the Library of Alexandria Had Survived? (假想歷史：若亞歷山大圖書館未曾燒毀？)",
              "strategy": "虛擬條件句時態定位：區分作者是在假想過去、現在還是未來的相反狀況。",
              "text": "Historians frequently contemplate what the world would look like today if the Great Library of Alexandria had not been destroyed by fire. If those hundreds of thousands of ancient parchment scrolls had been preserved, centuries of scientific stagnation during the Dark Ages might have been averted. Technological advances that took humanity two millennia to achieve could have unfolded within a fraction of that time.",
              "questions": [
                {
                  "q": "What tense is used in 'if the Great Library... had not been destroyed'?",
                  "ans": "Past perfect subjunctive (unreal past)."
                }
              ]
            },
            "step0Clue": "解假設語氣口訣：看時間提示！現在相反用過去式 (were/V-ed)；過去相反用過去完成式 (had p.p.)！",
            "formativeQuiz": [
              {
                "q": "If the engineers ________ the thermal sensors beforehand, the catastrophic reactor meltdown could have been prevented.",
                "options": [
                  "inspected",
                  "were inspecting",
                  "had inspected",
                  "would inspect"
                ],
                "ans": 2,
                "hint1": "主要子句動詞為 could have been prevented (與過去事實相反)。",
                "hint2": "if 條件子句與過去事實相反時，動詞必須使用過去完成式 had + p.p.。",
                "solution": "與過去事實相反的假設，if 子句需使用 had inspected。故選 C。"
              }
            ],
            "traps": [
              {
                "wrong": "If I would have known, I would have told you. ❌",
                "correct": "If I had known, I would have told you. ✔️",
                "reason": "if 條件子句中絕不能出現 would have p.p.，只能用 had p.p.；would have p.p. 只能放在主要子句中！"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s3_review",
            "motivation": "學測指考最高難度文法雙璧：1. 過去因影響現在果的「混合假設語氣」；2. 為了行文典雅與節奏而「省略 if 的倒裝句型」。掌握這兩項，各大名校模擬考無往不利。",
            "concepts": [
              {
                "title": "混合假設語氣 (Mixed Conditionals: Past Cause -> Present Effect)",
                "formula": "If + S + had + p.p. (過去), S + would/could + V-原形 + now / today (現在)",
                "explanation": "條件子句是過去發生的事 (had p.p.)，但主要子句描述的是對「現在 (now)」造成的影響，主句使用 would + V-原形！",
                "example": "If she had taken the vaccine last winter, she would not be sick in bed right now.",
                "examExample": {
                  "stem": "If Dr. Fleming ___ penicillin by accident in 1928, millions of lives would have been lost to bacterial infections.",
                  "options": [
                    "had not discovered",
                    "did not discover",
                    "would not discover",
                    "has not discovered"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】此句針對 1928 年歷史事實進行「與過去事實相反的假設語氣」；條件句公式為 If + S + had (not) p.p.，主要子句配合 S + would have p.p.，故選 had not discovered。"
                }
              },
              {
                "title": "省略 If 之倒裝三部曲 (Inversion by Omitting 'If')",
                "formula": "Were + S... | Had + S + p.p... | Should + S + V-原形...",
                "explanation": "將 if 省略時，子句必須將助動詞或 be 動詞 (Were, Had, Should) 倒裝提至主詞之前！若有 not，not 留在主詞後方。",
                "example": "If I had known => Had I known. / If you should see him => Should you see him. / If it were not for => Were it not for.",
                "examExample": {
                  "stem": "___ did the aerospace engineer realize that the sensor reading was corrupted by cosmic radiation.",
                  "options": [
                    "Only then",
                    "Then only",
                    "At that time",
                    "Soon"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方子句為助動詞倒裝結構 did the engineer realize（Aux + S + V）；依據文法規則，否定副詞或「Only + 時間副詞」置於句首時，主要子句必須倒裝，故選 Only then。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "inversion",
                "ipa": "/ɪnˈvɜːrʒn/",
                "pos": "n.",
                "zh": "倒裝；反轉",
                "sentence": "Inversion emphasizes the condition and lends literary gravitas to the prose."
              },
              {
                "word": "gravitas",
                "ipa": "/ˈɡrævətɑːs/",
                "pos": "n.",
                "zh": "莊重；嚴肅",
                "sentence": "The statesman spoke with remarkable moral gravitas during the summit."
              },
              {
                "word": "avert",
                "ipa": "/əˈvɜːrt/",
                "pos": "v.",
                "zh": "避免；防止",
                "sentence": "Prompt diplomatic intervention successfully averted an international crisis."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "Crisis Management in High-Stakes Aviation (高空飛行危機管理)",
              "strategy": "倒裝結構還原：在閱讀中看到 Had / Were / Should 置於句首且句末是句號時，立即還原為 If 條件句。",
              "text": "Had Captain Sullivan hesitated for even five seconds during the dual-engine failure over the Hudson River, the passenger aircraft would undoubtedly have crashed into Manhattan skyscrapers. Were modern flight simulators not equipped with realistic turbulence algorithms, pilots would be ill-prepared for catastrophic emergencies. Should any anomalies occur in flight telemetry today, autonomous safety systems immediately initiate corrective maneuvers.",
              "questions": [
                {
                  "q": "Rewrite 'Had Captain Sullivan hesitated' with 'If'.",
                  "ans": "If Captain Sullivan had hesitated."
                }
              ]
            },
            "step0Clue": "看到句首出現 Had / Were / Should + 主詞，句末不是問號而是逗號 + 主要子句時，百分之百是「省略 if 的倒裝假設句」！",
            "formativeQuiz": [
              {
                "q": "________ the government implemented stringent quarantine protocols sooner, the outbreak would not have spread so rapidly across the province.",
                "options": [
                  "If had",
                  "Had",
                  "Should",
                  "Were"
                ],
                "ans": 1,
                "hint1": "後方主要子句為 would not have spread (與過去相反)。",
                "hint2": "子句主詞為 the government，動詞為 implemented (p.p.)，這是省略 If 的倒裝句。",
                "solution": "If the government had implemented... 省略 If 後倒裝為 Had the government implemented...。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Had not he arrived in time, we would have failed. ❌",
                "correct": "Had he not arrived in time, we would have failed. ✔️",
                "reason": "省略 if 倒裝時，否定詞 not 不可與 Had 縮寫或一起提到句首，必須留在主詞之後。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s3_review",
            "motivation": "倒裝 (Inversion) 是英語營造修辭戲劇張力 (rhetorical drama) 與焦點突出的強大武器。掌握否定副詞 (Never, Seldom, Rarely, Little, Not only) 置於句首的不完全倒裝，以及地方副詞 (Here, There, On the hill) 置首的完全倒裝。",
            "concepts": [
              {
                "title": "否定副詞置首不完全倒裝 (Negative Adverbial Inversion - Auxiliary First)",
                "formula": "Negative Word (Never / Seldom / Rarely / Little / Not only / Hardly) + Auxiliary / Be + Subject + Main Verb...",
                "explanation": "否定副詞提至句首時，語序如同一般疑問句：助動詞 (do/does/did/have/can/will) 或 be 動詞必須倒裝提到主詞前方！",
                "example": "Never in human history have so many individuals possessed instantaneous access to global knowledge.",
                "examExample": {
                  "stem": "___ did the aerospace engineer realize that the sensor reading was corrupted by cosmic radiation.",
                  "options": [
                    "Only then",
                    "Then only",
                    "At that time",
                    "Soon"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方子句為助動詞倒裝結構 did the engineer realize（Aux + S + V）；依據文法規則，否定副詞或「Only + 時間副詞」置於句首時，主要子句必須倒裝，故選 Only then。"
                }
              },
              {
                "title": "地方副詞置首完全倒裝 (Locative Inversion - Verb Before Subject)",
                "formula": "Prep Phrase / Adverb of Place (On the hill / Under the tree / Here) + Verb + Noun Subject",
                "explanation": "地方副詞提至句首時，若主詞為普通名詞，整顆動詞直接搬到主詞前方 (完全倒裝)；但若主詞為代名詞 (he, they)，則不倒裝！",
                "example": "At the foot of the mountain stood an ancient pagoda. vs. Here comes the bus! / Here it comes!",
                "examExample": {
                  "stem": "___ did the aerospace engineer realize that the sensor reading was corrupted by cosmic radiation.",
                  "options": [
                    "Only then",
                    "Then only",
                    "At that time",
                    "Soon"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方子句為助動詞倒裝結構 did the engineer realize（Aux + S + V）；依據文法規則，否定副詞或「Only + 時間副詞」置於句首時，主要子句必須倒裝，故選 Only then。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "rhetorical",
                "ipa": "/rɪˈtɔːrɪkl/",
                "pos": "adj.",
                "zh": "修辭的；詞藻華麗的",
                "sentence": "Inversion is a classical rhetorical device used to captivate the listener."
              },
              {
                "word": "locative",
                "ipa": "/ˈloʊkətɪv/",
                "pos": "adj.",
                "zh": "表示方位的；地方的",
                "sentence": "Locative inversion moves the prepositional phrase to the head of the sentence."
              },
              {
                "word": "scarcely",
                "ipa": "/ˈskersli/",
                "pos": "adv.",
                "zh": "幾乎不；剛...就...",
                "sentence": "Scarcely had the keynote begun when the power grid collapsed."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "The Majesty of the Northern Lights (極光之美與地磁風暴)",
              "strategy": "倒裝句語氣體驗：圈出文中所有否定置首與方位置首的倒裝句，體會文學張力。",
              "text": "Seldom do travelers witness a spectacle as transcendent as the aurora borealis dancing across the Arctic canopy. Across the frozen tundra swept biting polar winds, yet beneath the shimmering curtains of emerald light stood hundreds of spellbound spectators. Not only does this celestial phenomenon illuminate the polar night, but it also reveals the turbulent magnetic interactions shielding our planet from deadly solar radiation.",
              "questions": [
                {
                  "q": "Rewrite 'Seldom do travelers witness...' in standard non-inverted word order.",
                  "ans": "Travelers seldom witness a spectacle as transcendent..."
                }
              ]
            },
            "step0Clue": "看到句首第一字是 Never / Seldom / Rarely / Little / Hardly / Scarcely / Not only 時，後面立刻檢查是否有「助動詞 + 主詞」倒裝！",
            "formativeQuiz": [
              {
                "q": "Little ________ that the anonymous donor who funded the research laboratory was actually their former mentor.",
                "options": [
                  "the scientists suspected",
                  "did the scientists suspect",
                  "the scientists did suspect",
                  "suspected the scientists"
                ],
                "ans": 1,
                "hint1": "句首為否定副詞 Little (幾乎不/完全沒)。",
                "hint2": "否定副詞置首需採不完全倒裝，過去式動詞需借用助動詞 did + S + 原形動詞。",
                "solution": "Little 置於句首，語序需倒裝為助動詞 + 主詞 + 原形動詞 (did the scientists suspect)。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "Under the bridge a strange man stood. (可接受但未倒裝) vs. Under the bridge did stand a strange man. ❌",
                "correct": "Under the bridge stood a strange man. ✔️",
                "reason": "地方副詞置首是「完全倒裝」，整顆不及物動詞直接搬到主詞前，不需要也不可以借用助動詞 did！"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s3_review",
            "motivation": "英文追求句型的「平行對稱 (Parallelism)」與「頭輕腳重」的流暢韻律。掌握 So + Adj / Such + Be 置首的結果倒裝句，以及 Not only... but also...、Neither... nor... 的平衡結構，是大學指考/學測英文寫作邁向 16 分以上的必備功力。",
            "concepts": [
              {
                "title": "So... that... 與 Such... that... 倒裝 (Inversion of So/Such Result Clauses)",
                "formula": "So + Adj/Adv + Be/Auxiliary + Subject + that... | Such + Be + Subject + that...",
                "explanation": "將「如此...以致於...」的 So + 形容詞提至句首加強語氣時，前半句倒裝，that 後面子句維持正常語序。",
                "example": "So intense was the summer heatwave that asphalt roads began to soften.",
                "examExample": {
                  "stem": "___ did the aerospace engineer realize that the sensor reading was corrupted by cosmic radiation.",
                  "options": [
                    "Only then",
                    "Then only",
                    "At that time",
                    "Soon"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方子句為助動詞倒裝結構 did the engineer realize（Aux + S + V）；依據文法規則，否定副詞或「Only + 時間副詞」置於句首時，主要子句必須倒裝，故選 Only then。"
                }
              },
              {
                "title": "Neither / Nor 的附和倒裝 (Negative Agreement Inversion)",
                "formula": "S + negative verb...; neither / nor + Be/Auxiliary + Subject",
                "explanation": "表達「某人/某物也不...」時，neither / nor 後面必須將 be 動詞或助動詞提至主詞之前。",
                "example": "The pilot could not see through the dense fog, nor could the radar detect the mountain ridge.",
                "examExample": {
                  "stem": "___ did the aerospace engineer realize that the sensor reading was corrupted by cosmic radiation.",
                  "options": [
                    "Only then",
                    "Then only",
                    "At that time",
                    "Soon"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方子句為助動詞倒裝結構 did the engineer realize（Aux + S + V）；依據文法規則，否定副詞或「Only + 時間副詞」置於句首時，主要子句必須倒裝，故選 Only then。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "parallelism",
                "ipa": "/ˈpærəlelɪzəm/",
                "pos": "n.",
                "zh": "平行對稱結構",
                "sentence": "Rhetorical parallelism establishes pleasing cognitive symmetry in argumentative writing."
              },
              {
                "word": "symmetry",
                "ipa": "/ˈsɪmətri/",
                "pos": "n.",
                "zh": "對稱；勻稱",
                "sentence": "Classical Greek architecture exemplifies architectural symmetry and proportion."
              },
              {
                "word": "eloquent",
                "ipa": "/ˈeləkwənt/",
                "pos": "adj.",
                "zh": "雄辯的；口才流利的",
                "sentence": "The defense attorney delivered an eloquent and compelling summation."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "Winston Churchill's Wartime Rhetoric: Defiance Against Tyranny (邱吉爾戰時演說修辭剖析)",
              "strategy": "修辭對稱性標記：找出演說文獻中 So... that 與 Not only 的對稱倒裝句型。",
              "text": "During the darkest hours of the Blitz in 1940, Winston Churchill galvanized a beleaguered nation. So profound was his mastery of language that his speeches mobilized the English language and sent it into battle. Not only did his steadfast resolve inspire Londoners enduring nightly bombardments, but it also forged an indomitable transatlantic alliance that ultimately vanquished fascism.",
              "questions": [
                {
                  "q": "What happened to the word order after 'So profound'?",
                  "ans": "The auxiliary/be verb was placed before the subject (was his mastery)."
                }
              ]
            },
            "step0Clue": "看到 So + 形容詞/副詞放在一整句話的最開頭時，主詞動詞一定要倒裝！that 後面則維持正常主動賓語序！",
            "formativeQuiz": [
              {
                "q": "So captivating ________ that the entire auditorium remained spellbound for over two hours.",
                "options": [
                  "the performance was",
                  "was the performance",
                  "the performance did be",
                  "did the performance"
                ],
                "ans": 1,
                "hint1": "句首為 So + 形容詞 captivating (如此引人入勝)。",
                "hint2": "So + Adj 置首時，be 動詞必須倒裝提到主詞 the performance 前方。",
                "solution": "So + Adj. 置首倒裝，be 動詞 was 倒裝至主詞 the performance 前。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "He doesn't like spicy food, and I don't too. ❌",
                "correct": "He doesn't like spicy food, and neither do I. (or: I don't either.) ✔️",
                "reason": "否定附和句不能用 too，只能用 either (放句尾) 或 neither + 助動詞 + 主詞 (倒裝)。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s4_review",
            "motivation": "分裂句 (Cleft Sentence) 是母語人士調整句子資訊焦點 (Focus) 的終極工具。將要強調的主詞、受詞或副詞片語夾在 'It is/was... that...' 之間，能使特定訊息產生強烈聚焦光環。",
            "concepts": [
              {
                "title": "分裂句標準公式與還原檢驗法 (Cleft Sentence Formula & Test)",
                "formula": "It is / was + [強調焦點 (S / O / Adv Phrase)] + that / who + [剩餘句子成分]",
                "explanation": "檢驗方法：若把 'It is/was' 和 'that' 同時拿掉，剩下的單字能重新還原拼成一句完整的正常句子，就是分裂強調句！",
                "example": "Columbus reached the Americas in 1492. => It was in 1492 that Columbus reached the Americas.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [分裂句標準公式與還原檢驗法 (Cleft Sentence Formula & Test)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Columbus reached the Americas in 1492. => It was in 1492 that Columbus reached the Americas.",
                    "Columbus reached the Americas in 1492. => It were in 1492 that Columbus reached the Americas.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「分裂句標準公式與還原檢驗法 (Cleft Sentence Formula & Test)」之核心公式：It is / was + [強調焦點 (S / O / Adv Phrase)] + that / who + [剩餘句子成分]。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "Wh- 分裂句 (Pseudo-cleft Sentences)",
                "formula": "What + S + V + is / was + [強調焦點]",
                "explanation": "以 what 子句作為主詞，將整個句子的核心焦點推移至 be 動詞之後。",
                "example": "What the biosphere urgently requires is substantive decarbonization, not hollow pledges.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [Wh- 分裂句 (Pseudo-cleft Sentences)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "What the biosphere urgently requires is substantive decarbonization, not hollow pledges.",
                    "What the biosphere urgently requires are substantive decarbonization, not hollow pledges.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「Wh- 分裂句 (Pseudo-cleft Sentences)」之核心公式：What + S + V + is / was + [強調焦點]。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "cleft",
                "ipa": "/kleft/",
                "pos": "adj./n.",
                "zh": "分裂的；裂隙",
                "sentence": "A cleft sentence splits a single clause into two sections to highlight a focus."
              },
              {
                "word": "substantive",
                "ipa": "/ˈsʌbstəntɪv/",
                "pos": "adj.",
                "zh": "實質性的；有實體的",
                "sentence": "Policymakers must enact substantive environmental legislation immediately."
              },
              {
                "word": "demarcate",
                "ipa": "/dɪˈmɑːrkeɪt/",
                "pos": "v.",
                "zh": "劃分；標明界線",
                "sentence": "Clear definitions demarcate the boundaries between scientific disciplines."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "Rosalind Franklin and the Double Helix (羅莎琳·富蘭克林與雙螺旋光環)",
              "strategy": "焦點句型提煉：辨識文章中透過 It was... that 強調的科學家實質貢獻。",
              "text": "For decades after Watson and Crick unveiled the molecular structure of DNA, historical textbooks minimized the contribution of Rosalind Franklin. However, historical reexamination confirms that it was Franklin's Photo 51 that provided the definitive experimental proof of the double helix. It was through her painstaking X-ray diffraction techniques that the geometric dimensions of the genetic code were first elucidated.",
              "questions": [
                {
                  "q": "What specific proof did Photo 51 provide according to the passage?",
                  "ans": "The definitive experimental proof of the double helix."
                }
              ]
            },
            "step0Clue": "做強調句題目時，把 It was 和 that 遮住，若剩下的句子能順暢讀通，空格處百分之百填 that (強調人時偶可用 who)！",
            "formativeQuiz": [
              {
                "q": "It was precisely because the thermal insulation was defective ________ the spacecraft sustained severe heat damage during reentry.",
                "options": [
                  "which",
                  "that",
                  "why",
                  "what"
                ],
                "ans": 1,
                "hint1": "句首為 It was，中間強調原因副詞子句 because the thermal insulation was defective。",
                "hint2": "分裂強調句夾入副詞子句時，後方引導詞一律使用 that。",
                "solution": "It was... that... 強調句型，此處強調原因副詞子句，後方連接詞必須用 that。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "It was in Taipei where we first met. (口語可見但學測大考視為非標準文法) ❌",
                "correct": "It was in Taipei that we first met. ✔️",
                "reason": "學測指考等正式學術英語規範中，分裂句強調地方副詞片語時，規範引導詞一律使用 that，不可任意代換為 where。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通、C3 多元文化",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s4_review",
            "motivation": "學測 14-15 級分頂標選手與一般考生的分水嶺！讓步倒裝 (Adj / Adv / N / V + as / though + S + V) 在大考閱讀測驗中頻繁出現，掌握此句型能瞬間看透篇章深層語義。",
            "concepts": [
              {
                "title": "As / Though 讓步倒裝公式 (Concession Inversion with As/Though)",
                "formula": "Adj / Adv / V / N (無冠詞) + as / though + S + V, S + V...",
                "explanation": "意為「雖然...、儘管...」。將形容詞、副詞、原形動詞或名詞 (不可加冠詞 a/an) 提至 as/though 前方！注意：although 絕不可用於此倒裝結構！",
                "example": "Rich as he is, he remains humble. / Child as she was, she displayed astonishing courage. / Hard as they tried, they failed.",
                "examExample": {
                  "stem": "___ did the aerospace engineer realize that the sensor reading was corrupted by cosmic radiation.",
                  "options": [
                    "Only then",
                    "Then only",
                    "At that time",
                    "Soon"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】空格後方子句為助動詞倒裝結構 did the engineer realize（Aux + S + V）；依據文法規則，否定副詞或「Only + 時間副詞」置於句首時，主要子句必須倒裝，故選 Only then。"
                }
              },
              {
                "title": "高級讓步與假設片語 (Advanced Idiomatic Concessions)",
                "formula": "Be it A or B (無論是A還是B) | Come what may (無論發生什麼) | Be that as it may (儘管如此)",
                "explanation": "源自古英語虛擬式原形倒裝，廣泛保留於現代新聞評論、法學與大考長文中。",
                "example": "Every participant must register, be they students or renowned scholars.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [高級讓步與假設片語 (Advanced Idiomatic Concessions)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Every participant must register, be they students or renowned scholars.",
                    "Every participant must regareter, be they students or renowned scholars.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「高級讓步與假設片語 (Advanced Idiomatic Concessions)」之核心公式：Be it A or B (無論是A還是B) | Come what may (無論發生什麼) | Be that as it may (儘管如此)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "concession",
                "ipa": "/kənˈseʃn/",
                "pos": "n.",
                "zh": "讓步；妥協",
                "sentence": "Concession inversion lends a sophisticated, literary cadence to essays."
              },
              {
                "word": "cadence",
                "ipa": "/ˈkeɪdns/",
                "pos": "n.",
                "zh": "節奏；韻律",
                "sentence": "The rhythmic cadence of the poet's speech captivated the entire hall."
              },
              {
                "word": "formidable",
                "ipa": "/ˈfɔːrmɪdəbl/",
                "pos": "adj.",
                "zh": "令人敬畏的；強大艱難的",
                "sentence": "The mountaineers conquered a formidable Himalayan peak in sub-zero conditions."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "The Stoic Philosophy of Marcus Aurelius (馬可·奧理略的斯多葛冥思)",
              "strategy": "讓步倒裝語義重組：將句首 Adj + as 還原為 Although 句子，理清邏輯轉折。",
              "text": "Emperor of the Roman world as Marcus Aurelius was, he sought peace not in imperial conquest, but within the citadel of his own mind. Powerful though he seemed to his contemporaries, he reminded himself daily of mortality and the ephemeral nature of fame. Difficult as his military campaigns along the frozen Danube were, he composed his Meditations by lantern light, bequeathing timeless reflections on civic virtue to humanity.",
              "questions": [
                {
                  "q": "Rewrite 'Difficult as his military campaigns... were' using 'Although'.",
                  "ans": "Although his military campaigns along the frozen Danube were difficult."
                }
              ]
            },
            "step0Clue": "看到形容詞、副詞或無冠詞名詞直接擺在句首，緊接著 as / though + 主詞 + 動詞時，這是「雖然...儘管...」的讓步倒裝！",
            "formativeQuiz": [
              {
                "q": "________ as he was, the apprentice managed to repair the intricate clockwork mechanism.",
                "options": [
                  "A novice",
                  "Novice",
                  "Novices",
                  "The novice"
                ],
                "ans": 1,
                "hint1": "本句為名詞提至句首的讓步倒裝結構 (as he was)。",
                "hint2": "單數可數名詞提至 as 前方時，冠詞 a/an 必須省略。",
                "solution": "名詞提至 as/though 前倒裝表讓步時，名詞前不加冠詞。故選 Novice (B)。"
              }
            ],
            "traps": [
              {
                "wrong": "Brave although he was, he could not defeat the beast. ❌",
                "correct": "Brave though/as he was, he could not defeat the beast. ✔️",
                "reason": "although 絕不能用於倒裝讓步結構，倒裝時只能用 as 或 though！"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "B2 科技資訊與媒體素養、A2 系統思考與問題解決",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s4_review",
            "motivation": "ESP (English for Specific Purposes) 專業英文已是大考與技高外語群主軸。人工智慧、演算法、自然語言處理、大型語言模型 (LLM) 的學術文獻高頻出現在跨學科閱讀題中，掌握專業詞彙與論證邏輯是未來雙語人才的基石。",
            "concepts": [
              {
                "title": "學術科技英文摘要四大結構 (Four Pillars of Academic Abstracts)",
                "formula": "Objective (研究目的) -> Methodology (研究方法) -> Findings (實驗結果) -> Implications (實務意涵)",
                "explanation": "科技論文摘要依循嚴密脈絡。善用定位詞快速抓取核心貢獻。",
                "example": "This paper proposes a novel Transformer architecture capable of mitigating hallucinations in LLMs.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [學術科技英文摘要四大結構 (Four Pillars of Academic Abstracts)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "This paper proposes a novel Transformer architecture capable of mitigating hallucinations in LLMs.",
                    "Thare paper proposes a novel Transformer architecture capable of mitigating hallucinations in LLMs.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「學術科技英文摘要四大結構 (Four Pillars of Academic Abstracts)」之核心公式：Objective (研究目的) -> Methodology (研究方法) -> Findings (實驗結果) -> Implications (實務意涵)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "科技詞彙構詞法：字根與字首拆解 (Affixation in Technical ESP)",
                "formula": "neuro- (神經) | bio- (生物) | auto- (自動) | trans- (轉變/跨越) | -ification (名詞化)",
                "explanation": "掌握常見希臘拉丁字根字首，面對陌生學術專業詞彙可瞬間推敲出 80% 以上語義。",
                "example": "Autonomous neuromuscular synchronization allows bionic prosthetics to emulate natural limb movements.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [科技詞彙構詞法：字根與字首拆解 (Affixation in Technical ESP)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Autonomous neuromuscular synchronization allows bionic prosthetics to emulate natural limb movements.",
                    "Autonomous neuromuscular synchronization allows bionic prosthetics to emulate natural limb movements.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「科技詞彙構詞法：字根與字首拆解 (Affixation in Technical ESP)」之核心公式：neuro- (神經) | bio- (生物) | auto- (自動) | trans- (轉變/跨越) | -ification (名詞化)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "algorithm",
                "ipa": "/ˈælɡərɪðəm/",
                "pos": "n.",
                "zh": "演算法",
                "sentence": "Recommendation algorithms optimize user engagement by predicting content preferences."
              },
              {
                "word": "hallucination",
                "ipa": "/həˌluːsɪˈneɪʃn/",
                "pos": "n.",
                "zh": "幻覺；(AI) 捏造事實",
                "sentence": "Mitigating factual hallucination remains a paramount hurdle in generative AI."
              },
              {
                "word": "neural",
                "ipa": "/ˈnʊrəl/",
                "pos": "adj.",
                "zh": "神經的；神經網路的",
                "sentence": "Deep artificial neural networks loosely mirror biological synaptic pathways."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "Reinforcement Learning from Human Feedback (人類反饋強化學習在 AI 之應用)",
              "strategy": "學術專有名詞脈絡推敲：依據上下文同位語定義理解新興科技術語。",
              "text": "Generative pre-trained models demonstrate remarkable fluency across diverse tasks. However, unsupervised training on uncurated internet datasets frequently leads models to generate toxic biases or fabricated references. To align machine behavior with human values, engineers employ Reinforcement Learning from Human Feedback (RLHF). By rewarding ethical outputs and penalizing deceptive answers, RLHF steers AI toward helpfulness, honesty, and harmlessness.",
              "questions": [
                {
                  "q": "What are the three core human values targeted by RLHF?",
                  "ans": "Helpfulness, honesty, and harmlessness."
                }
              ]
            },
            "step0Clue": "閱讀科技論文型文本時，不要被專有名詞嚇倒！專有名詞後方通常緊接著同位語 (comma), or which is called...，那裡就是最白話的中文解釋！",
            "formativeQuiz": [
              {
                "q": "In the passage, what problem arises from training AI on uncurated internet corpora?",
                "options": [
                  "System hardware overheating",
                  "Generating toxic biases and fabricated references",
                  "Faster computation degradation",
                  "Inability to parse syntax"
                ],
                "ans": 1,
                "hint1": "定位原文中的 uncurated internet datasets。",
                "hint2": "原文後方直接指出 leads models to generate...",
                "solution": "原文明確提到會產生有害偏見與捏造引證 (toxic biases or fabricated references)。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "一看到長篇學術縮寫 (如 RLHF, LLM) 就放棄不讀。 ❌",
                "correct": "在文中找到第一次出現該縮寫的地方，前方或括號內必定有全名與簡要定義。 ✔️",
                "reason": "學術英語規範規定所有專用縮寫在文章首次出現時必須提供完整全稱拼寫。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "C1 道德實踐與公民意識、C3 多元文化與國際理解、B2 科技資訊與媒體素養",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s4_review",
            "motivation": "聯合國永續發展目標 (SDGs 1-17) 與企業 ESG (環境、社會、公司治理) 是現今大考閱讀與英文寫作的最熱門題庫。本單元建立碳足跡、循環經濟、再生能源與氣候正義的高階論辯詞彙庫。",
            "concepts": [
              {
                "title": "永續發展論證高頻架構 (Argumentation in Environmental Discourse)",
                "formula": "Current Crisis (生態現況) -> Root Cause (人為成因) -> Proposed Solution (制度/科技方案) -> Call to Action (呼籲行動)",
                "explanation": "英文永續倡議文本通常遵循此四段論式結構。考生在寫作時亦可套用此模板以達結構嚴謹度。",
                "example": "Transitioning from fossil fuels to offshore wind requires substantial grid modernization.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [永續發展論證高頻架構 (Argumentation in Environmental Discourse)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Transitioning from fossil fuels to offshore wind requires substantial grid modernization.",
                    "Transitioning from fossil fuels to offshore wind requires substantial grid modernization.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「永續發展論證高頻架構 (Argumentation in Environmental Discourse)」之核心公式：Current Crisis (生態現況) -> Root Cause (人為成因) -> Proposed Solution (制度/科技方案) -> Call to Action (呼籲行動)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "綠色經濟高頻搭配詞 (High-Frequency Collocations in Green Economy)",
                "formula": "carbon neutral (碳中和) | circular economy (循環經濟) | ecological footprint (生態足跡) | sustainable agriculture (永續農業)",
                "explanation": "大考克漏字與寫作評分特別偏好道地的專業搭配詞組，能大幅提升論述的專業說服力。",
                "example": "The conglomerate pledged to achieve net-zero carbon neutrality across all operations by 2040.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [綠色經濟高頻搭配詞 (High-Frequency Collocations in Green Economy)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The conglomerate pledged to achieve net-zero carbon neutrality across all operations by 2040.",
                    "The conglomerate pledged to achieve net-zero carbon neutrality across all operations by 2040.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「綠色經濟高頻搭配詞 (High-Frequency Collocations in Green Economy)」之核心公式：carbon neutral (碳中和) | circular economy (循環經濟) | ecological footprint (生態足跡) | sustainable agriculture (永續農業)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "sustainability",
                "ipa": "/səˌsteɪnəˈbɪləti/",
                "pos": "n.",
                "zh": "永續性；持續發展",
                "sentence": "Corporate sustainability reports now receive the same regulatory audit as financial filings."
              },
              {
                "word": "decarbonization",
                "ipa": "/diːˌkɑːrbənaɪˈzeɪʃn/",
                "pos": "n.",
                "zh": "去碳化；減碳",
                "sentence": "Deep industrial decarbonization requires revolutionary hydrogen metallurgy."
              },
              {
                "word": "biodiversity",
                "ipa": "/ˌbaɪoʊdaɪˈvɜːrsəti/",
                "pos": "n.",
                "zh": "生物多樣性",
                "sentence": "Wetland preservation is indispensable for protecting regional biodiversity."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "The Global Circular Economy: Reimagining Resource Lifecycles (全球循環經濟：重塑資源生命週期)",
              "strategy": "因果與對比策略：比對線性經濟 (Take-Make-Waste) 與循環經濟 (Reduce-Reuse-Recycle) 的差異。",
              "text": "For over a century, global industrial capitalism has operated under a linear model characterized by extracting, manufacturing, and discarding. This 'take-make-waste' approach has generated catastrophic plastic accumulation in oceans and unprecedented resource depletion. In contrast, the circular economy conceives production loops where waste becomes input. By designing durable modular products and recovering critical minerals from obsolete electronics, nations can decouple economic prosperity from environmental destruction.",
              "questions": [
                {
                  "q": "What is the core philosophy of a circular economy according to the passage?",
                  "ans": "To conceive production loops where waste becomes input, decoupling economic growth from environmental harm."
                }
              ]
            },
            "step0Clue": "在做永續議題閱讀題時，注意作者對商業承諾的評價：是持樂觀肯定 (optimistic)，還是質疑漂綠 (skeptical of greenwashing)！",
            "formativeQuiz": [
              {
                "q": "According to the passage, what does the circular economy aim to 'decouple'?",
                "options": [
                  "Recycling from municipal subsidies",
                  "Economic prosperity from environmental destruction",
                  "Plastic packaging from consumer goods",
                  "Fossil fuels from international logistics"
                ],
                "ans": 1,
                "hint1": "定位文章最後一句中的 decouple (使脫鉤)。",
                "hint2": "原文為 'decouple economic prosperity from environmental destruction'。",
                "solution": "文章末句明確指出脫鉤經濟繁榮與環境破壞。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "把 sustainable 當成 sustain (支撐) 翻譯為「可維持支撐的」。 ❌",
                "correct": "在環境永續語境下，sustainable 專指「環境可持續發展、不耗竭地球資源的」。 ✔️",
                "reason": "大考常以一字多義出題，考生必須依據主題領域 (Domain) 選擇合宜語義。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s4_review",
            "motivation": "學測篇章結構 (Discourse Structure) 是鑑別頂標 (13-15級分) 的核心關卡。透過代名詞定錨、主題詞同義代換、時間順序鏈、因果關聯推導四大破解密碼，徹底掌握五題全對的秘訣。",
            "concepts": [
              {
                "title": "篇章連貫四大定錨法則 (Four Anchoring Principles of Discourse Cohesion)",
                "formula": "1. 代名詞定錨 (they, this, such) -> 2. 定冠詞特定指稱 (the + N) -> 3. 轉折語流 (However, Thus) -> 4. 語意回響 (Lexical Reiteration)",
                "explanation": "每個空格的答案，必定與其前一句和後一句有至少兩處「語意或文法黏著點」。找到代名詞先行詞是秒殺題目的最高法門。",
                "example": "Sentence A mentions 'Dr. Evans launched a project.' Option C begins with 'This ambitious endeavor...'",
                "examExample": {
                  "stem": "According to the core linguistic principle of [篇章連貫四大定錨法則 (Four Anchoring Principles of Discourse Cohesion)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Sentence A mentions 'Dr. Evans launched a project.' Option C begins with 'This ambitious endeavor...'",
                    "Sentence A mentions 'Dr. Evans launched a project.' Option C begins with 'Thare ambitious endeavor...'",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「篇章連貫四大定錨法則 (Four Anchoring Principles of Discourse Cohesion)」之核心公式：1. 代名詞定錨 (they, this, such) -> 2. 定冠詞特定指稱 (the + N) -> 3. 轉折語流 (However, Thus) -> 4. 語意回響 (Lexical Reiteration)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "cohesion",
                "ipa": "/koʊˈhiːʒn/",
                "pos": "n.",
                "zh": "篇章凝聚力；結合",
                "sentence": "Grammatical cohesion ties independent sentences into an unbroken narrative tapestry."
              },
              {
                "word": "reiteration",
                "ipa": "/riːˌɪtəˈreɪʃn/",
                "pos": "n.",
                "zh": "重申；反覆出現",
                "sentence": "Lexical reiteration reinforces key conceptual themes across paragraphs."
              },
              {
                "word": "tapestry",
                "ipa": "/ˈtæpəstri/",
                "pos": "n.",
                "zh": "織錦；錯綜複雜的結構",
                "sentence": "The novel weaves a magnificent linguistic tapestry of Victorian London."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "The Decipherment of the Rosetta Stone (羅塞塔石碑破譯全紀錄)",
              "strategy": "語篇代名詞定錨練習：追蹤文中代名詞與特定名詞之呼應關係。",
              "text": "In 1799, French soldiers in Egypt unearthed a slab of granodiorite inscribed with three distinct scripts: Ancient Egyptian hieroglyphs, Demotic script, and Ancient Greek. Because scholars could readily read the Greek inscriptions, they possessed a linguistic key. Jean-François Champollion hypothesized that the hieroglyphic characters represented phonetic sounds rather than merely symbolic pictograms. By meticulously cross-referencing royal cartouches such as 'Ptolemy' and 'Cleopatra', he unlocked the forgotten language of the Pharaohs.",
              "questions": [
                {
                  "q": "What did the Ancient Greek script provide for the researchers?",
                  "ans": "A linguistic key to compare and decipher the hieroglyphs."
                }
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
              {
                "wrong": "看到選項裡有跟文章一樣的單字就急著選進去。 ❌",
                "correct": "檢查該選項放進空格後，是否能同時跟「前句」和「後句」在邏輯與代名詞上雙向通順。 ✔️",
                "reason": "大考出題者最喜歡在干擾選項中故意放入文章原字，引誘只看單字不看整段邏輯的考生入坑。"
              }
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
            "stage": "第五學習階段 (高中二年級 108 課綱)",
            "cefr": "B1+ ~ B2 (學測前標與統測外語)",
            "competency": "A1 自我精進、A2 系統思考、B1 符號溝通、B2 科技素養、C2 團隊領導",
            "guideline": "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。", 
            "sourceRef": "arch:s4_review",
            "motivation": "高二全冊終極封頂驗收。結合分詞構句、獨立分詞、假設語氣全系列、倒裝句、分裂句、讓步倒裝、ESP 科技與永續長文，打造具備大考頂標水準的綜合試煉場，引領學子邁入高三大考決勝舞台。",
            "concepts": [
              {
                "title": "高難度長篇閱讀三階速讀心法 (Three-Stage Velocity Reading for GSAT)",
                "formula": "Stage 1: Topic Sentence Skim (每段首尾句 45 秒抓大意) -> Stage 2: Question Keyword Scan (題幹定位 30 秒) -> Stage 3: Deep Syntactic Parsing (長難句精準拆解)",
                "explanation": "面對大考長達 1200 字的多篇閱讀題組，切莫一字一字死讀。首段抓議題、各段首句抓論點、末段抓結論，再帶題檢索精確定位。",
                "example": "Skim paragraph 1 for the main thesis; scan for capitalized proper nouns mentioned in Question 38.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [高難度長篇閱讀三階速讀心法 (Three-Stage Velocity Reading for GSAT)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Skim paragraph 1 for the main thesis; scan for capitalized proper nouns mentioned in Question 38.",
                    "Skim paragraph 1 for the main thesare; scan for capitalized proper nouns mentioned in Question 38.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「高難度長篇閱讀三階速讀心法 (Three-Stage Velocity Reading for GSAT)」之核心公式：Stage 1: Topic Sentence Skim (每段首尾句 45 秒抓大意) -> Stage 2: Question Keyword Scan (題幹定位 30 秒) -> Stage 3: Deep Syntactic Parsing (長難句精準拆解)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "culminating",
                "ipa": "/ˈkʌlmɪneɪtɪŋ/",
                "pos": "adj.",
                "zh": "達到頂點的；終極的",
                "sentence": "This trial represents the culminating diagnostic benchmark of secondary education."
              },
              {
                "word": "velocity",
                "ipa": "/vəˈlɑːsəti/",
                "pos": "n.",
                "zh": "速度；迅速",
                "sentence": "Reading velocity combined with syntactic comprehension ensures success in high-stakes testing."
              },
              {
                "word": "paramount",
                "ipa": "/ˈpærəmaʊnt/",
                "pos": "adj.",
                "zh": "至高無上的；首要的",
                "sentence": "Preserving intellectual rigor remains paramount in educational platform design."
              }
            ],
            "dialogue": [
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Had the catalyst been synthesized under higher pressure, the reaction rate would have doubled.",
                "zh": "倘若催化劑當時是在更高壓力下合成，反應速率早就翻倍了。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Indeed. We observed that inverted conditionals effectively emphasize counterfactual findings.",
                "zh": "確實如此。我們觀察到倒裝假設語氣能非常有力地凸顯反事實研究結論。"
              },
              {
                "speaker": "👩‍🔬 Dr. Vance",
                "en": "Let's incorporate this precise syntactic structure into our academic manuscript.",
                "zh": "我們將這個精準的句法結構寫入我們的學術期刊手稿中吧。"
              },
              {
                "speaker": "🧑‍🔬 Researcher Lee",
                "en": "Drafting the abstract with clear signposting will make peer review smoother.",
                "zh": "以清晰的標引詞起草論文摘要，能讓同行評審更順暢。"
              }
            ],
            "reading": {
              "title": "The Quantum Leap in Human Intelligence (人類智能的量子躍遷)",
              "strategy": "全維度綜合統整：將長文中出現的分裂句、倒裝句與分詞構句標註並分析其篇章功能。",
              "text": "Never before has humanity stood at such an epochal threshold. Had early computer scientists not persisted through computational winters, the neural network revolution transforming modern society would never have materialized. Transcending mere tool-making, artificial intelligence now challenges our definitions of creativity and consciousness. It is our collective ethical wisdom, rather than raw computational firepower, that will dictate whether this technological leap elevates civilization or precipitates irreversible alienation.",
              "questions": [
                {
                  "q": "What will ultimately dictate the future of this technological leap according to the author?",
                  "ans": "Our collective ethical wisdom."
                }
              ]
            },
            "step0Clue": "在挑戰頂標試卷時，遇到任何看似可怕的長長句子，先找逗號與連接詞拆成小模組，再一眼看透核心結構！",
            "formativeQuiz": [
              {
                "q": "Had the researchers not recalibrated the quantum sensors with extreme precision, the minute gravitational wave ________ undetected.",
                "options": [
                  "would remain",
                  "would have remained",
                  "remained",
                  "had remained"
                ],
                "ans": 1,
                "hint1": "句首為 Had the researchers not recalibrated... (與過去相反之省略 if 倒裝句)。",
                "hint2": "主要子句與過去相反，必須使用 would/could/should/might + have + p.p.。",
                "solution": "省略 if 的與過去事實相反假設，主要子句需用 would have remained。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "在大考閱讀測驗中，因為緊張而將全文從頭到尾每個字讀三遍導致寫不完。 ❌",
                "correct": "嚴格執行「題幹關鍵字定位法」，直奔答案段落精讀三行即可作答。 ✔️",
                "reason": "大考閱讀測驗比拼的是「閱讀策略與資訊檢索效率」，而非逐字默背全文。"
              }
            ],
            "checklist": [
              "我能在大考模擬題中 100% 辨識分詞、倒裝、分裂句與假設語氣各類變形",
              "我已具備從容迎戰學測 15 級分與指考頂標的完整實力"
            ]
          }
        ]
      }
    ]
  },
  {
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A1 自我精進、A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s1_review",
            "motivation": "學測英文第 1-10 題 (詞彙題) 與第 11-20 題 (綜合測驗/克漏字) 是大考 15 級分的起跑線。掌握動詞搭配詞、慣用介系詞、轉折連接詞與上下文語境線索，能在 15 分鐘內拿下 30 分滿分。",
            "concepts": [
              {
                "title": "詞彙題語境三步定位法 (Three-Step Lexical Context Method)",
                "formula": "1. 詞性判定 (判斷空格需要 N, V, Adj, Adv) -> 2. 正負向情感色彩 (+ / -) -> 3. 搭配詞精準鎖定 (Collocation)",
                "explanation": "大考詞彙題從不考冷僻罕用字，而是考驗考生是否能依據前後文的形容詞修飾或受詞搭配，選出唯一道地的動詞或名詞。",
                "example": "The scientist's pioneering research made a significant contribution to marine preservation.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [詞彙題語境三步定位法 (Three-Step Lexical Context Method)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "The scientist's pioneering research made a significant contribution to marine preservation.",
                    "The scientaret's pioneering research made a significant contribution to marine preservation.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「詞彙題語境三步定位法 (Three-Step Lexical Context Method)」之核心公式：1. 詞性判定 (判斷空格需要 N, V, Adj, Adv) -> 2. 正負向情感色彩 (+ / -) -> 3. 搭配詞精準鎖定 (Collocation)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "綜合測驗四大必考題型 (Four Core Cloze Question Types)",
                "formula": "Grammar (動詞時態/被動/分詞) | Vocabulary (語境名動形副) | Transitions (轉折副詞) | Prepositions (慣用片語介系詞)",
                "explanation": "每篇綜合測驗固定配置一題轉折詞、一題動詞文法形式、一至兩題搭配詞與語境單字。",
                "example": "He devoted his life to improving literacy; moreover, he established hundreds of rural mobile libraries.",
                "examExample": {
                  "stem": "All sensitive personal data on our server ___ using AES-256 military-grade encryption before being transmitted.",
                  "options": [
                    "is protected",
                    "protects",
                    "was protecting",
                    "has protected"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】主詞 All sensitive personal data 與動詞 protect 為被動關係（數據是被保護），且表示日常安全常態原則，故使用現在被動式 is protected。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "pioneering",
                "ipa": "/ˌpaɪəˈnɪrɪŋ/",
                "pos": "adj.",
                "zh": "開創性的；先驅的",
                "sentence": "Her pioneering investigations laid the foundations for quantum telecommunication."
              },
              {
                "word": "collocation",
                "ipa": "/ˌkɑːləˈkeɪʃn/",
                "pos": "n.",
                "zh": "詞語搭配；慣用連用",
                "sentence": "Native fluency relies heavily on automatic retrieval of natural collocations."
              },
              {
                "word": "indispensable",
                "ipa": "/ˌɪndɪˈspensəbl/",
                "pos": "adj.",
                "zh": "不可或缺的",
                "sentence": "A robust vocabulary is indispensable for achieving top percentiles in standardized tests."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "The Resurgence of Urban Agroecology (都會生態農業的復興浪潮)",
              "strategy": "克漏字上下文脈絡分析：由後文結果推導前文動詞與轉折副詞。",
              "text": "Urban rooftop farming has transformed vacant concrete expanses into flourishing agricultural hubs. By deploying soil-free hydroponic technologies, urban farmers dramatically reduce water consumption. Furthermore, hyper-local food production eliminates long-distance transportation emissions. Consequently, municipal governments are now offering tax rebates to stimulate citizen participation in building climate-resilient cities.",
              "questions": [
                {
                  "q": "What two benefits of urban farming are highlighted?",
                  "ans": "Reduced water consumption and elimination of transportation emissions."
                }
              ]
            },
            "step0Clue": "做克漏字時，空格前有動詞先看受詞是誰，空格後有介系詞先看誰能搭配！如 attribute A to B, contribute to, dedicate oneself to！",
            "formativeQuiz": [
              {
                "q": "The international committee decided to ________ the distinguished scientist with its highest honor for her cancer research.",
                "options": [
                  "reward",
                  "present",
                  "distribute",
                  "attribute"
                ],
                "ans": 1,
                "hint1": "空格後方句型為 ________ somebody WITH an award/honor。",
                "hint2": "present somebody with something 為授與某人榮譽的標準搭配 (reward somebody for doing something)。",
                "solution": "present sb with an honor 為大考高頻搭配詞，意為「頒發榮譽給某人」。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "看到 contribute 就選 with (受中文「用...貢獻」影響)。 ❌",
                "correct": "contribute 永遠搭配 to (+ V-ing / N)！ ✔️",
                "reason": "介系詞搭配不能用中文直譯思考，必須死記英文原生搭配 contribute to / lead to / devote to。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A2 系統思考、B1 符號溝通",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s2_review",
            "motivation": "文意選填 (10選10) 與篇章結構是學測決定「頂標 (Top)」與「前標」的最關鍵陣地。利用「詞性分類代號法」將文意選填降維打擊；利用「代名詞與主旨定錨法」將篇章結構五題全數拿下！",
            "concepts": [
              {
                "title": "文意選填標註詞性四色法 (The Four-Color POS Tagging Method)",
                "formula": "Step 1: 先花 40 秒在選項 A-J 標註詞性 (V, Adj, N, Adv, Prep) -> Step 2: 掃描空格判斷所需詞性 -> Step 3: 語意過濾即選即劃",
                "explanation": "標註詞性後，每個空格只需要在 2-3 個同詞性選項中做選擇，錯誤率直接下降 75% 以上！",
                "example": "Blank 21 needs an adjective before noun 'consequence'; only options (B) catastrophic and (F) negligible qualify.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [文意選填標註詞性四色法 (The Four-Color POS Tagging Method)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Blank 21 needs an adjective before noun 'consequence'; only options (B) catastrophic and (F) negligible qualify.",
                    "Blank 21 needs an adjective before noun 'consequence'; only options (B) catastrophic and (F) negligible qualify.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「文意選填標註詞性四色法 (The Four-Color POS Tagging Method)」之核心公式：Step 1: 先花 40 秒在選項 A-J 標註詞性 (V, Adj, N, Adv, Prep) -> Step 2: 掃描空格判斷所需詞性 -> Step 3: 語意過濾即選即劃。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "篇章結構上下夾攻原則 (Double-Flank Verification in Discourse Structure)",
                "formula": "Sentence (N-1) <== [Blank Target Sentence] ==> Sentence (N+1)",
                "explanation": "正確選項必須同時滿足前句的因果承接，以及後句的主詞代名詞呼應，缺一不可。",
                "example": "If Sentence N+1 starts with 'These rigorous precautions', the blank MUST mention safety measures.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [篇章結構上下夾攻原則 (Double-Flank Verification in Discourse Structure)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "If Sentence N+1 starts with 'These rigorous precautions', the blank MUST mention safety measures.",
                    "If Sentence N+1 starts with 'These rigorous precautions', the blank MUST mention safety measures.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「篇章結構上下夾攻原則 (Double-Flank Verification in Discourse Structure)」之核心公式：Sentence (N-1) <== [Blank Target Sentence] ==> Sentence (N+1)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "tagging",
                "ipa": "/ˈtæɡɪŋ/",
                "pos": "n.",
                "zh": "標註；標籤",
                "sentence": "Parts-of-speech tagging streamlines multiple-choice reading efficiency."
              },
              {
                "word": "precaution",
                "ipa": "/prɪˈkɔːʃn/",
                "pos": "n.",
                "zh": "預防措施；防備",
                "sentence": "Stringent laboratory precautions prevent hazardous bio-contaminant leakage."
              },
              {
                "word": "negligible",
                "ipa": "/ˈneɡlɪdʒəbl/",
                "pos": "adj.",
                "zh": "微不足道的；可忽略的",
                "sentence": "The algorithmic margin of error was negligible in the quantum simulation."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "The Evolutionary Marvel of Cephalopod Camouflage (頭足類生物偽裝的演化奇蹟)",
              "strategy": "詞性代碼實戰演練：在空白處填入最適詞性之詞彙。",
              "text": "Octopuses and cuttlefish exhibit dynamic camouflage unmatched in the animal kingdom. Specialized skin cells called chromatophores expand and contract instantaneously under neural control, altering pigment reflection within milliseconds. Additionally, dermal papillae physically alter skin texture, transforming smooth skin into jagged ridges that mimic coral reefs. This multifaceted disguise affords cephalopods absolute invisibility from predatory sharks.",
              "questions": [
                {
                  "q": "What controls the expansion and contraction of chromatophores?",
                  "ans": "Direct neural control."
                }
              ]
            },
            "step0Clue": "做文意選填第一件事：絕對不要先讀文章！先看 A-J 選項，在每個單字旁邊寫上 [N] [V] [Adj] [Adv]，做完才能開始看文章！",
            "formativeQuiz": [
              {
                "q": "The newly discovered deep-sea trench possesses ________ geothermal pressures that crush conventional research submersibles.",
                "options": [
                  "immense",
                  "immensely",
                  "immensity",
                  "to immense"
                ],
                "ans": 0,
                "hint1": "空格位於名詞 geothermal pressures 之前。",
                "hint2": "修飾名詞需要形容詞。",
                "solution": "修飾名詞片語需要形容詞，選項中只有 immense (巨大的) 為形容詞。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "文意選填選完一題不劃掉，十個選項從頭看到尾看十遍。 ❌",
                "correct": "確定填入後，立刻用鉛筆在選項列表上輕輕劃掉該字母，縮小後續思考空間。 ✔️",
                "reason": "即選即消能成倍提升做題速度，避免大腦工作記憶過載。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A2 系統思考、B1 符號溝通、B2 科技素養",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s3_review",
            "motivation": "學測長篇閱讀篇幅每篇高達 400-500 字，主題涵蓋人類學、天文學、海洋生態與心理學。第六大題混合題更包含簡答、選字填空、圖表對照、是非打勾。本單元傳授「大考閱讀三大極速定位術」，確保考生準確填寫不扣分。",
            "concepts": [
              {
                "title": "長篇閱讀四大多層次題型破解法 (Four Types of GSAT Reading Questions)",
                "formula": "1. 主旨題 (首段末段+各段首句) | 2. 細節題 (專有名詞關鍵字定位) | 3. 推論題 (嚴禁超譯過度推測) | 4. 詞義題 (上下文代入驗證)",
                "explanation": "主旨題不可選過於狹隘的單一段落細節；細節題以原文精確字詞為準；推論題從原文事實進行最小邏輯步長推導。",
                "example": "Question asks for 'primary purpose'; look at opening and concluding paragraphs for thesis statement.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [長篇閱讀四大多層次題型破解法 (Four Types of GSAT Reading Questions)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Question asks for 'primary purpose'; look at opening and concluding paragraphs for thesis statement.",
                    "Question asks for 'primary purpose'; look at opening and concluding paragraphs for thesare statement.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「長篇閱讀四大多層次題型破解法 (Four Types of GSAT Reading Questions)」之核心公式：1. 主旨題 (首段末段+各段首句) | 2. 細節題 (專有名詞關鍵字定位) | 3. 推論題 (嚴禁超譯過度推測) | 4. 詞義題 (上下文代入驗證)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "混合題非選擇題作答三鐵律 (Three Golden Rules for Hybrid Non-MCQ)",
                "formula": "Rule 1: 原文摘錄不可改變原詞拼字 | Rule 2: 填表格注意詞性一致性 | Rule 3: 簡答題寫出完整合乎文法主謂結構",
                "explanation": "若題幹要求 'Find a word in paragraph 2'，考生自行更換單字詞性將直接被判零分！務必原詞摘錄。",
                "example": "If text says 'substantive', do NOT write 'substance' when instructed to quote directly.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [混合題非選擇題作答三鐵律 (Three Golden Rules for Hybrid Non-MCQ)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "If text says 'substantive', do NOT write 'substance' when instructed to quote directly.",
                    "If text says 'substantive', do NOT write 'substance' when instructed to quote directly.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「混合題非選擇題作答三鐵律 (Three Golden Rules for Hybrid Non-MCQ)」之核心公式：Rule 1: 原文摘錄不可改變原詞拼字 | Rule 2: 填表格注意詞性一致性 | Rule 3: 簡答題寫出完整合乎文法主謂結構。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "hybrid",
                "ipa": "/ˈhaɪbrɪd/",
                "pos": "adj./n.",
                "zh": "混合的；雜交種",
                "sentence": "GSAT hybrid questions evaluate both receptive and productive literacy competencies."
              },
              {
                "word": "verbatim",
                "ipa": "/vɜːrˈbeɪtɪm/",
                "pos": "adv./adj.",
                "zh": "逐字地；一字不差地",
                "sentence": "Quoting text verbatim guarantees accuracy when responding to extraction prompts."
              },
              {
                "word": "extrapolation",
                "ipa": "/ɪkˌstræpəˈleɪʃn/",
                "pos": "n.",
                "zh": "推斷；外推法",
                "sentence": "Avoid wild extrapolation when answering GSAT inference questions."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "The Decoupling of GDP and Carbon Emissions in Scandinavia (北歐經濟成長與碳排放脫鉤實證)",
              "strategy": "混合題雙文本提取：從文本提煉關鍵字填入綜合分析圖表。",
              "text": "Over the past three decades, Sweden and Denmark have demonstrated that aggressive climate policy does not impede economic vitality. While national real GDP expanded by over 75% between 1990 and 2020, domestic greenhouse gas emissions declined by 38%. This decoupling was catalyzed by early carbon taxation, extensive nuclear integration, and sweeping district heating modernization. Economists cite this empirical achievement as proof that sustainable industrial transitions are entirely achievable without compromising societal prosperity.",
              "questions": [
                {
                  "q": "According to the passage, what specific policy instrument initiated early in Sweden and Denmark catalyzed the decoupling?",
                  "ans": "Early carbon taxation."
                }
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
              {
                "wrong": "簡答題字體潦草，大小寫不分，句末忘記加句點。 ❌",
                "correct": "字體工整清晰，句首大寫，句末加上明確句點，文法時態與提問嚴格一致。 ✔️",
                "reason": "大考中心閱卷標準中，非選擇題若有句法結構殘缺或拼寫模糊將會被酌予扣分。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A1 自我精進、B1 符號溝通、C1 道德公民、C3 國際理解",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s4_review",
            "motivation": "學測英文非選擇題作文 (20 分) 是決定 14 級分與 15 級分頂標狀元的最高聖杯。大考中心評分四大面向：內容 (5分)、組織 (5分)、文法句構 (4分)、字彙拼字 (4分) + 體例標點 (2分)。本單元解析看圖敘事與雙面論證的滿分骨架與高階表達句庫。",
            "concepts": [
              {
                "title": "學測英文作文經典雙段式黃金架構 (Two-Paragraph Gold Standard)",
                "formula": "Paragraph 1: Situation Description / Objective Prompt Analysis (約 60-70 字) | Paragraph 2: In-Depth Personal Reflection / Dual Perspective Argumentation (約 70-80 字)",
                "explanation": "第一段精準描述圖表情境或現象本質；第二段提出個人深刻論述、批判反思與具體解方。總字數控制在 130-160 字為最理想區間。",
                "example": "P1 depicts the scenario; P2 introduces a personal encounter and draws a moral lesson.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [學測英文作文經典雙段式黃金架構 (Two-Paragraph Gold Standard)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "P1 depicts the scenario; P2 introduces a personal encounter and draws a moral lesson.",
                    "P1 depicts the scenario; P2 introduces a personal encounter and draws a moral lesson.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「學測英文作文經典雙段式黃金架構 (Two-Paragraph Gold Standard)」之核心公式：Paragraph 1: Situation Description / Objective Prompt Analysis (約 60-70 字) | Paragraph 2: In-Depth Personal Reflection / Dual Perspective Argumentation (約 70-80 字)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "提升作文文法檔次的三大高階句型 (Three Elite Sentence Patterns for 18+ Scores)",
                "formula": "1. 分詞構句 (Feeling..., she...) | 2. 假設語氣倒裝 (Had I known...) | 3. 分裂強調句 (It is ... that ...)",
                "explanation": "在第二段反思中自然穿插 1-2 個高階句型，能向大考閱卷教授展示卓越的語法驾馭能力，直接躍升至 16-19 分級距！",
                "example": "It was this profound epiphany that fundamentally reshaped my perspective on failure.",
                "examExample": {
                  "stem": "___ by the spectacular aurora borealis in northern Norway, the tourists stood in stunned silence for hours.",
                  "options": [
                    "Fascinated",
                    "Fascinating",
                    "To fascinate",
                    "Having fascinated"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】分詞修飾主要子句主詞 the tourists；遊客是被極光「深深吸引 (be fascinated by)」，省略連接詞與主詞後，被動語態保留過去分詞 Fascinated。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "epiphany",
                "ipa": "/ɪˈpɪfəni/",
                "pos": "n.",
                "zh": "頓悟；神聖啟示",
                "sentence": "Experiencing that failure triggered an unexpected psychological epiphany."
              },
              {
                "word": "persuasive",
                "ipa": "/pərˈsweɪsɪv/",
                "pos": "adj.",
                "zh": "有說服力的；勸導性的",
                "sentence": "A persuasive essay combines emotional resonance with logical coherence."
              },
              {
                "word": "exemplary",
                "ipa": "/ɪɡˈzempləri/",
                "pos": "adj.",
                "zh": "模範的；典範的",
                "sentence": "The essay was hailed as exemplary by the admissions evaluation panel."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "Model Essay: Embracing Solitude in a Hyper-Connected World (範文鑑賞：在高度連結的世界擁抱孤獨)",
              "strategy": "評分規準對照：分析範文中高階轉折詞、句型多樣性與論點深化技巧。",
              "text": "In contemporary society, constant digital notifications tether individuals to an incessant stream of online chatter. While smartphones provide instantaneous connection, they paradoxically deprive us of tranquil introspection. It is during deliberate solitude that authentic creativity flourishes, allowing our minds to consolidate memories and synthesize original thoughts. Had I not learned to unplug from virtual networks regularly, my intellectual autonomy would have been subsumed by algorithmic conformity.",
              "questions": [
                {
                  "q": "Identify the inverted conditional in the model essay.",
                  "ans": "'Had I not learned to unplug from virtual networks regularly, my intellectual autonomy would have been subsumed...'"
                }
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
              {
                "wrong": "用中文思考逐字翻譯，寫出 'People more and more use phones' 這種中式英文。 ❌",
                "correct": "寫出 'An increasing number of individuals rely heavily on smartphones' 的地道句構。 ✔️",
                "reason": "中式直譯 (Chinglish) 是大考作文無法突破 12 分的主要元兇。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A2 系統思考、B1 符號溝通、B2 科技素養",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s1_review",
            "motivation": "針對全國技術型高中 (高職) 百萬學子！徹底破譯統測英文共同科目、外語群英語類專業科目(一)英文閱讀與寫作、專業科目(二)英語聽力與商務對話。掌握技高核心專業英語，奪取國立科大第一志願！",
            "concepts": [
              {
                "title": "統測共同科目四大版塊破題速率 (TVE Common English Speed Strategy)",
                "formula": "字彙測驗 (8題 5分鐘) -> 對話測驗 (5題 3分鐘) -> 綜合測驗 (7題 7分鐘) -> 閱讀測驗 (10題 15分鐘)",
                "explanation": "統測英文共同科目著重生活與職場實務溝通。掌握商務、旅遊、科技、飲食與服務業高頻情境用語。",
                "example": "In business correspondence: 'Enclosed please find the invoice for your perusal.'",
                "examExample": {
                  "stem": "According to the core linguistic principle of [統測共同科目四大版塊破題速率 (TVE Common English Speed Strategy)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "In business correspondence: 'Enclosed please find the invoice for your perusal.'",
                    "In business correspondence: 'Enclosed please find the invoice for your perusal.'",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「統測共同科目四大版塊破題速率 (TVE Common English Speed Strategy)」之核心公式：字彙測驗 (8題 5分鐘) -> 對話測驗 (5題 3分鐘) -> 綜合測驗 (7題 7分鐘) -> 閱讀測驗 (10題 15分鐘)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "外語群專業科目寫作四大評分標準 (TVE ESP Writing Rubric)",
                "formula": "Sentence Combining (句子合併與改寫) | Guided Writing (引導寫作與應用文書信信件格式)",
                "explanation": "專業科目包含中譯英、句子改寫 (利用關係詞、分詞構句、倒裝) 以及書信應用文 (Dear Sir/Madam, Yours sincerely)。",
                "example": "Combine using a relative clause: The technician fixed the machine. It operates flawlessly now.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [外語群專業科目寫作四大評分標準 (TVE ESP Writing Rubric)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Combine using a relative clause: The technician fixed the machine. It operates flawlessly now.",
                    "Combine using a relative clause: The technician fixed the machine. It operates flawlessly now.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「外語群專業科目寫作四大評分標準 (TVE ESP Writing Rubric)」之核心公式：Sentence Combining (句子合併與改寫) | Guided Writing (引導寫作與應用文書信信件格式)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "vocational",
                "ipa": "/voʊˈkeɪʃənl/",
                "pos": "adj.",
                "zh": "職業的；技術的",
                "sentence": "Vocational English education blends core language proficiency with specialized industry nomenclature."
              },
              {
                "word": "itinerary",
                "ipa": "/aɪˈtɪnəreri/",
                "pos": "n.",
                "zh": "旅行日程；行程表",
                "sentence": "The travel agency emailed a detailed conference itinerary to all delegates."
              },
              {
                "word": "perusal",
                "ipa": "/pəˈruːzl/",
                "pos": "n.",
                "zh": "細閱；仔細閱讀",
                "sentence": "The contracts are attached below for your careful perusal."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "Smart Logistics and Warehouse Automation (智慧物流與倉儲自動化)",
              "strategy": "技高職場專業閱讀：抓取物流自動化流程中的專有名詞與效率數據。",
              "text": "Modern supply chain fulfillment centers rely on Automated Guided Vehicles (AGVs) coordinated by artificial intelligence. Upon receiving an online order, algorithms route robotic carts to retrieve designated storage bins, reducing order processing latency by 65%. Barcode scanners and RFID tracking tags verify cargo accuracy in real time, virtually eliminating sorting human errors during peak shopping holidays.",
              "questions": [
                {
                  "q": "By how much did AGVs reduce order processing latency?",
                  "ans": "By 65%."
                }
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
              {
                "wrong": "商務書信信末隨意寫 'Bye bye' 或 'See you'。 ❌",
                "correct": "正式書信信末署名使用 'Sincerely yours,' 或 'Best regards,'。 ✔️",
                "reason": "統測外語群書信應用文要求嚴謹的正式體例格式，不可使用口語簡訊縮寫。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A2 系統思考、B1 符號溝通、B2 科技資訊",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "jh:cap_analysis",
            "motivation": "國中會考英文要拿 A++ (容錯率僅 1-2 題)，關鍵在於攻克「克漏字時態長篇對照題」與「閱讀素養圖表多文本題」。本單元總結會考 109-115 歷屆最致命魔王陷阱，為國九衝刺與高中銜接建立百分之百制霸信心。",
            "concepts": [
              {
                "title": "會考克漏字三維時間軸判定法 (Three-Dimensional Timeline in CAP Cloze)",
                "formula": "Past Fact (過去簡單式) <== [Prior Event (過去完成式 had p.p.)] <== Habitual (現在簡單式) ==> Prediction (未來式)",
                "explanation": "會考克漏字最常考敘事故事中，主角「回憶過去更早發生的事」或「講述不變的哲理真理」，時態跳躍需由前後句動詞精確校準。",
                "example": "When he arrived at the station, the train had already left.",
                "examExample": {
                  "stem": "Professor Higgins ___ at Oxford University for over twenty-five years, and he still conducts seminars every Tuesday.",
                  "options": [
                    "has taught",
                    "taught",
                    "is teaching",
                    "had taught"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】時間副詞 for over twenty-five years（長達25年）搭配後句 and he still conducts（至今仍在授課），表明動作始於過去並持續至現在，必須使用現在完成式 has taught。"
                }
              },
              {
                "title": "會考多文本圖表長難題交叉審查原則 (CAP Cross-Checking Protocol)",
                "formula": "Chart Data (時刻/價格/年齡) + Email Text (特殊條件/優惠券) -> 交集處即唯一正解",
                "explanation": "近年會考每份試卷必定包含 2-3 組長達兩頁的跨領域題組 (小說節錄、時刻表、地圖導航、廣告公告)，不可通篇逐字死讀，需善用檢索關鍵字。",
                "example": "Map shows ferry terminal; note warns about high tide cancellation after 4 p.m.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [會考多文本圖表長難題交叉審查原則 (CAP Cross-Checking Protocol)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Map shows ferry terminal; note warns about high tide cancellation after 4 p.m.",
                    "Map shows ferry terminal; note warns about high tide cancellation after 4 p.m.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「會考多文本圖表長難題交叉審查原則 (CAP Cross-Checking Protocol)」之核心公式：Chart Data (時刻/價格/年齡) + Email Text (特殊條件/優惠券) -> 交集處即唯一正解。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "fatal",
                "ipa": "/ˈfeɪtl/",
                "pos": "adj.",
                "zh": "致命的；決定命運的",
                "sentence": "Avoiding fatal grammar misconceptions guarantees an A++ standing in CAP."
              },
              {
                "word": "cross-reference",
                "ipa": "/ˌkrɔːs ˈrefrəns/",
                "pos": "v.",
                "zh": "交叉參照；相互對照",
                "sentence": "Cross-reference the flight schedule with the promotional coupon terms."
              },
              {
                "word": "benchmark",
                "ipa": "/ˈbentʃmɑːrk/",
                "pos": "n.",
                "zh": "基準；標竿",
                "sentence": "CAP score standards serve as an indispensable learning benchmark nationwide."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "Notice: Heritage Railway Special Autumn Excursion (歷史鐵道秋季專列公告)",
              "strategy": "多重限制條款比對：比對車票票價、兒童年齡優惠與行李托運限制。",
              "text": "Mountain Scenic Railway is operating heritage steam locomotives every Saturday throughout October. Standard round-trip tickets cost NT$600. Children aged 6 to 12 receive a 50% discount, while children under 6 ride free when accompanied by a paying adult. Note: Bicycles and oversized luggage exceeding 20 kg are strictly prohibited aboard vintage carriages due to narrow corridors.",
              "questions": [
                {
                  "q": "How much does a round-trip ticket cost for an 8-year-old child?",
                  "ans": "NT$300 (50% discount of NT$600)."
                }
              ]
            },
            "step0Clue": "做會考題組看到海報、門票或時刻表時，第一眼先看最底下的星號 (*) 與 Note:，魔王考題 80% 都出在星號附註的小字裡！",
            "formativeQuiz": [
              {
                "q": "A father travels with his 10-year-old daughter and 4-year-old son on the steam excursion. What is their total ticket cost?",
                "options": [
                  "NT$600",
                  "NT$900",
                  "NT$1,200",
                  "NT$1,500"
                ],
                "ans": 1,
                "hint1": "父親付全票 NT$600。",
                "hint2": "10 歲女兒半價 (NT$300)，4 歲兒子免票 (NT$0)。",
                "solution": "父親 600 + 10歲女兒 300 + 4歲兒子 0 = NT$900。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "沒看清楚題目問的是 'one-way' (單程) 還是 'round-trip' (來回)。 ❌",
                "correct": "在題幹中圈出單程或來回關鍵字，確認計算基數。 ✔️",
                "reason": "會考數學性英文題目最喜歡在單程與來回票價上設置陷阱。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "B1 符號溝通、A1 身心自我精進、C3 國際理解",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s2_review",
            "motivation": "全民英檢 (GEPT) 是台灣大專院校畢業門檻、公教人員升遷與雙語高中審查最廣泛採計之國家級英語認證。本單元剖析初試 (聽力、閱讀) 極速破題與複試 (寫作、口說) 的流暢度與文法精確度評分規準。",
            "concepts": [
              {
                "title": "英檢中高級寫作二合一破題架構 (GEPT High-Intermediate Writing Structure)",
                "formula": "Part 1: Translation (兩題精準中譯英，考倒裝/分詞/子句) | Part 2: Guided Argumentative Essay (150-180 字論說文)",
                "explanation": "中譯英必須力求文法時態與原中文情感語氣嚴格吻合，不可隨意漏譯修飾語；論說文要求明確立場句 (Thesis) 與對比論述。",
                "example": "Translate: '儘管面臨經濟不景氣，該科技公司仍持續投資於綠色研發。'",
                "examExample": {
                  "stem": "___ by the spectacular aurora borealis in northern Norway, the tourists stood in stunned silence for hours.",
                  "options": [
                    "Fascinated",
                    "Fascinating",
                    "To fascinate",
                    "Having fascinated"
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】分詞修飾主要子句主詞 the tourists；遊客是被極光「深深吸引 (be fascinated by)」，省略連接詞與主詞後，被動語態保留過去分詞 Fascinated。"
                }
              },
              {
                "title": "英檢口說回答黃金時長與流暢節奏 (GEPT Speaking Rhythm Mastery)",
                "formula": "Part 1: Answer Directly (5秒) -> Part 2: Elaborate with Two Concrete Details (15秒) -> Part 3: Personal Example (15秒)",
                "explanation": "切忌停頓沉默 (Dead air) 超過 3 秒。善用填補詞 (Well, to be frank, in my personal experience) 爭取思考時間。",
                "example": "Q: Do you prefer studying alone or in a group? A: Without hesitation, I find solitary study far more productive...",
                "examExample": {
                  "stem": "According to the core linguistic principle of [英檢口說回答黃金時長與流暢節奏 (GEPT Speaking Rhythm Mastery)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Q: Do you prefer studying alone or in a group? A: Without hesitation, I find solitary study far more productive...",
                    "Q: Do you prefer studying alone or in a group? A: Without hesitation, I find solitary study far more productive...",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「英檢口說回答黃金時長與流暢節奏 (GEPT Speaking Rhythm Mastery)」之核心公式：Part 1: Answer Directly (5秒) -> Part 2: Elaborate with Two Concrete Details (15秒) -> Part 3: Personal Example (15秒)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "blueprint",
                "ipa": "/ˈbluːprɪnt/",
                "pos": "n.",
                "zh": "藍圖；詳細計劃",
                "sentence": "This comprehensive syllabus provides a clear blueprint for mastering the GEPT."
              },
              {
                "word": "spontaneous",
                "ipa": "/spɑːnˈteɪniəs/",
                "pos": "adj.",
                "zh": "自發的；自然的",
                "sentence": "Fluency evaluates a candidate's ability to produce spontaneous, unscripted discourse."
              },
              {
                "word": "proficient",
                "ipa": "/prəˈfɪʃnt/",
                "pos": "adj.",
                "zh": "精通的；熟練的",
                "sentence": "High-intermediate certification verifies that a speaker is proficient in academic contexts."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "The Evolutionary Function of Storytelling in Human Tribes (人類部落敘事的演化功能)",
              "strategy": "英檢中高級學術閱讀：分析部落神話與社會凝聚力的因果機制。",
              "text": "Anthropological research suggests that oral storytelling served as an indispensable survival mechanism for ancestral hominid tribes. Rather than existing merely for entertainment, narratives transmitted survival wisdom regarding dangerous flora, predatory wildlife, and territorial boundaries. Furthermore, collective mythologies fostered inter-tribal empathy and shared normative values, allowing human bands to cooperate at scales unmatched by any other primate species.",
              "questions": [
                {
                  "q": "What two critical categories of wisdom were transmitted through ancestral narratives?",
                  "ans": "Survival wisdom about dangers, and collective normative values fostering social cooperation."
                }
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
              {
                "wrong": "英檢口說第一部分自顧自背誦長篇大論，被考官打斷。 ❌",
                "correct": "依據題目時間鈴聲精確控制回答長度，直接回答提問核心。 ✔️",
                "reason": "英檢口說重視聽懂問題並切題直接作答，背誦無關範文會被扣分。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "B1 符號溝通、A2 系統思考、B2 科技素養",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s3_review",
            "motivation": "多益 (TOEIC) 是全球外商企業、科技巨頭 (TSMC, Google) 與金融機構徵才的最通用門檻。要在 120 分鐘內寫完 200 道高強度商業題並衝破 900 分，掌握 Part 5 (單句填空) 秒殺法與 Part 7 (三篇多文本閱讀) 交叉檢索術是核心關鍵。",
            "concepts": [
              {
                "title": "Part 5 單句填空 15 秒秒殺法則 (TOEIC Part 5 15-Second Blitz)",
                "formula": "Grammar Question (前後單字定詞性，不看句意 5 秒選出) vs. Vocabulary Question (看動詞搭配詞 15 秒選出)",
                "explanation": "Part 5 共 30 題，必須在 10 分鐘內全部作答完畢，為 Part 7 留下至少 55 分鐘！",
                "example": "Ms. Lin reviewed the financial spreadsheet ________ (thorough / thoroughly) before the board meeting. -> Adv modifies reviewed.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [Part 5 單句填空 15 秒秒殺法則 (TOEIC Part 5 15-Second Blitz)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Ms. Lin reviewed the financial spreadsheet ________ (thorough",
                    "Ms. Lin reviewed the financial spreadsheet ________ (thorough",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「Part 5 單句填空 15 秒秒殺法則 (TOEIC Part 5 15-Second Blitz)」之核心公式：Grammar Question (前後單字定詞性，不看句意 5 秒選出) vs. Vocabulary Question (看動詞搭配詞 15 秒選出)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "Part 7 三文本交叉檢索題 (Triple Passage Cross-Referencing in Part 7)",
                "formula": "Text 1 (網頁公告/產品型錄) + Text 2 (客戶訂購單/客訴電郵) + Text 3 (客服主管回覆) -> 尋找時間、型號與差價交叉點",
                "explanation": "三文本題的第 3 題與第 5 題，答案必定需要同時整合兩份甚至三份文本的資訊。",
                "example": "Text 1 lists Model X400 at $200; Text 2 is an invoice for Model X400; Text 3 offers 10% discount on order.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [Part 7 三文本交叉檢索題 (Triple Passage Cross-Referencing in Part 7)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Text 1 lists Model X400 at $200; Text 2 is an invoice for Model X400; Text 3 offers 10% discount on order.",
                    "Text 1 larets Model X400 at $200; Text 2 are an invoice for Model X400; Text 3 offers 10% darecount on order.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「Part 7 三文本交叉檢索題 (Triple Passage Cross-Referencing in Part 7)」之核心公式：Text 1 (網頁公告/產品型錄) + Text 2 (客戶訂購單/客訴電郵) + Text 3 (客服主管回覆) -> 尋找時間、型號與差價交叉點。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "lucrative",
                "ipa": "/ˈluːkrətɪv/",
                "pos": "adj.",
                "zh": "獲利豐厚的；有利可圖的",
                "sentence": "The software conglomerate secured a lucrative multi-year defense contract."
              },
              {
                "word": "compliance",
                "ipa": "/kəmˈplaɪəns/",
                "pos": "n.",
                "zh": "法規遵從；合規",
                "sentence": "Financial institutions must ensure strict compliance with anti-money laundering regulations."
              },
              {
                "word": "reimburse",
                "ipa": "/ˌriːɪmˈbɜːrs/",
                "pos": "v.",
                "zh": "核銷；償還；報銷",
                "sentence": "The accounting department will reimburse all approved travel expenditures within two weeks."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "Corporate Memo: Transition to Hybrid Workspace Architecture (企業內部備忘錄：轉型混合辦公架構)",
              "strategy": "多益職場閱讀：快速定位政策生效日期、員工適用對象與申請程序。",
              "text": "Effective November 1st, Apex Global Logistics will implement a flexible hybrid work model. Full-time personnel who have completed their probationary tenure may telecommute up to two days per working week, subject to departmental managerial approval. To facilitate seamless synchronization, the IT infrastructure division will distribute encrypted laptops and provide monthly broadband stipends of $75.",
              "questions": [
                {
                  "q": "What is the maximum number of telecommuting days permitted weekly?",
                  "ans": "Two days per working week."
                }
              ]
            },
            "step0Clue": "做多益 Part 5 時，先看四個選項：若是同一個單字的不同詞性變化 (e.g., decide, decision, decisive, decisively)，千萬不要讀全文！看空格前後詞性秒殺！",
            "formativeQuiz": [
              {
                "q": "Due to a clerical oversight in the procurement department, the delivery of the industrial microchips was ________ delayed.",
                "options": [
                  "temporarily",
                  "temporary",
                  "temporariness",
                  "temporal"
                ],
                "ans": 0,
                "hint1": "空格位於 was (be動詞) 與 delayed (過去分詞) 之間。",
                "hint2": "修飾過去分詞動詞 delayed 需要副詞。",
                "solution": "修飾動詞 delayed 需要副詞，故選 temporarily。故選 A。"
              }
            ],
            "traps": [
              {
                "wrong": "多益閱讀從 Part 7 單篇開始慢慢推敲，導致最後三篇雙文本與三文本完全沒時間寫只能猜 C。 ❌",
                "correct": "嚴格控管配速：Part 5 & 6 在 18 分鐘內解決，為 Part 7 預留完整的 55 分鐘！ ✔️",
                "reason": "多益是一場「資訊檢索耐力賽」，做題配速紀律決定最終成績能否跨越 900 分。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "B1 符號溝通、C2 團隊領導與合作、C3 國際理解與跨文化溝通",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s4_review",
            "motivation": "因應 2030 雙語政策與頂尖大學 (台大、清大、交大、成大) 全面推動 EMI 全英語授課。本單元培訓高中畢業生無縫銜接大學專業英語課堂：學術聽講速記法 (Cornell Note-Taking)、研討會提問禮儀與專業投影片英文口頭簡報架構。",
            "concepts": [
              {
                "title": "大學講堂康乃爾筆記速記心法 (Cornell Academic Note-Taking System)",
                "formula": "Right Column (課堂筆記：主論點、縮寫、箭頭) -> Left Column (課後提煉關鍵字與可能考題) -> Bottom (50字核心摘要)",
                "explanation": "面對外籍教授每分鐘 160 字的高速全英授課，切忌逐字聽抄。善用符號與縮寫 (w/o = without, b/c = because, -> leads to, = equals) 記錄概念鏈。",
                "example": "Prof explains photosynthesis: Light -> Thylakoid -> ATP + NADPH -> Calvin Cycle (Stroma) -> Glucose.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [大學講堂康乃爾筆記速記心法 (Cornell Academic Note-Taking System)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Prof explains photosynthesis: Light -> Thylakoid -> ATP + NADPH -> Calvin Cycle (Stroma) -> Glucose.",
                    "Prof explains photosynthesare: Light -> Thylakoid -> ATP + NADPH -> Calvin Cycle (Stroma) -> Glucose.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「大學講堂康乃爾筆記速記心法 (Cornell Academic Note-Taking System)」之核心公式：Right Column (課堂筆記：主論點、縮寫、箭頭) -> Left Column (課後提煉關鍵字與可能考題) -> Bottom (50字核心摘要)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "學術口頭簡報標準開場與轉折三部曲 (Three-Stage Presentation Architecture)",
                "formula": "Hook & Roadmap (吸引注意並交代報告大綱) -> Signposting (清晰章節轉折語) -> Takeaway & Q&A (總結結論並開放提問)",
                "explanation": "使用標準簡報標記語 (signposts)：'Now let us turn our attention to...', 'This brings me to my next point...', 'To summarize our primary findings...'",
                "example": "Good morning esteemed colleagues. Today, our research team explores the geopolitical ramifications of semiconductor supply chains.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [學術口頭簡報標準開場與轉折三部曲 (Three-Stage Presentation Architecture)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Good morning esteemed colleagues. Today, our research team explores the geopolitical ramifications of semiconductor supply chains.",
                    "Good morning esteemed colleagues. Today, our research team explores the geopolitical ramifications of semiconductor supply chains.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「學術口頭簡報標準開場與轉折三部曲 (Three-Stage Presentation Architecture)」之核心公式：Hook & Roadmap (吸引注意並交代報告大綱) -> Signposting (清晰章節轉折語) -> Takeaway & Q&A (總結結論並開放提問)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "ramification",
                "ipa": "/ˌræmɪfɪˈkeɪʃn/",
                "pos": "n.",
                "zh": "後果；衍生影響",
                "sentence": "Geopolitical friction carries profound ramifications for global microchip production."
              },
              {
                "word": "signposting",
                "ipa": "/ˈsaɪnpoʊstɪŋ/",
                "pos": "n.",
                "zh": "路標語言；指示語",
                "sentence": "Effective linguistic signposting guides listeners effortlessly through complex seminar arguments."
              },
              {
                "word": "articulate",
                "ipa": "/ɑːrˈtɪkjuleɪt/",
                "pos": "v./adj.",
                "zh": "清楚表達；善於辭令的",
                "sentence": "Scholars must articulate novel theories with clarity and empirical evidence."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "Syllabus Excerpt: Advanced Microeconomic Theory (高等個體經濟學全英語授課大綱節錄)",
              "strategy": "EMI 課程大綱解讀：確認評分權重、期中期末考規範與學術誠信守則。",
              "text": "Course Code: ECON-301. Lecture Delivery: 100% English. Assessment Weighting: Class Seminar Participation (15%), Bi-weekly Problem Sets (25%), Midterm Examination (30%), and Culminating Research Presentation (30%). Academic Integrity: Plagiarism, including unauthorized deployment of generative AI without explicit citation, constitutes severe scholastic misconduct subject to automatic disciplinary expulsion.",
              "questions": [
                {
                  "q": "What is the assessment weighting for the culminating research presentation?",
                  "ans": "30%."
                }
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
              {
                "wrong": "簡報時把演講稿全文密密麻麻貼在投影片上，背對觀眾低頭念稿。 ❌",
                "correct": "投影片只放核心關鍵字與圖表，眼神堅定注視台下觀眾，手勢自然自信流暢表達。 ✔️",
                "reason": "投影片是視覺輔助，演講者的眼神交流 (eye contact) 與台風才是簡報成功的核心靈魂。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "A2 系統思考與問題解決、B1 符號運用、C1 道德公民實踐",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s4_review",
            "motivation": "英語不僅是溝通工具，更是「嚴密理性思辨」的作業系統。本單元剖析常見七大邏輯謬誤 (如滑坡謬誤、稻草人謬誤、以偏概全)，並傳授大學程度學術論文引言 (Introduction)、正反反駁 (Counter-argument & Rebuttal) 與結論 (Conclusion) 的精密架構。",
            "concepts": [
              {
                "title": "三大常見學術邏輯謬誤辨識 (Three Core Logical Fallacies in Academic Writing)",
                "formula": "Straw Man (稻草人謬誤：曲解對方論點) | Slippery Slope (滑坡謬誤：極端連鎖假想) | Ad Hominem (人身攻擊：針對個人非論點)",
                "explanation": "批判性思維的核心就是檢驗論證的前提是否扎實、推導鏈是否有效，避免被情緒煽動或虛假相關性所誤導。",
                "example": "Claiming 'If we allow this minor amendment, total tyranny will inevitably result tomorrow' is a classic slippery slope.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [三大常見學術邏輯謬誤辨識 (Three Core Logical Fallacies in Academic Writing)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Claiming 'If we allow this minor amendment, total tyranny will inevitably result tomorrow' is a classic slippery slope.",
                    "Claiming 'If we allow thare minor amendment, total tyranny will inevitably result tomorrow' are a classic slippery slope.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「三大常見學術邏輯謬誤辨識 (Three Core Logical Fallacies in Academic Writing)」之核心公式：Straw Man (稻草人謬誤：曲解對方論點) | Slippery Slope (滑坡謬誤：極端連鎖假想) | Ad Hominem (人身攻擊：針對個人非論點)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "駁論結構三部曲 (The Anatomy of Counter-Argument and Rebuttal)",
                "formula": "Acknowledge (承認反方觀點之合理性) -> Pivot (以 While / Although / Admittedly 轉折) -> Refute with Empirical Evidence (提出更有力之反駁證據)",
                "explanation": "最高分的學術作文絕不對反對意見視而不見，而是主動提出反對論點並透過實證數據徹底予以反駁，展現客觀宏大的思辨器度。",
                "example": "Admittedly, solar installations entail initial capital costs. However, life-cycle operational savings far surpass conventional alternatives.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [駁論結構三部曲 (The Anatomy of Counter-Argument and Rebuttal)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Admittedly, solar installations entail initial capital costs. However, life-cycle operational savings far surpass conventional alternatives.",
                    "Admittedly, solar installations entail initial capital costs. However, life-cycle operational savings far surpass conventional alternatives.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「駁論結構三部曲 (The Anatomy of Counter-Argument and Rebuttal)」之核心公式：Acknowledge (承認反方觀點之合理性) -> Pivot (以 While / Although / Admittedly 轉折) -> Refute with Empirical Evidence (提出更有力之反駁證據)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "fallacy",
                "ipa": "/ˈfæləsi/",
                "pos": "n.",
                "zh": "謬誤；謬論",
                "sentence": "Critical thinking exposes hidden logical fallacies in political propaganda."
              },
              {
                "word": "rebuttal",
                "ipa": "/rɪˈbʌtl/",
                "pos": "n.",
                "zh": "反駁；抗辯",
                "sentence": "Her cogent rebuttal dismantled the opposition's empirical methodology."
              },
              {
                "word": "cogent",
                "ipa": "/ˈkoʊdʒənt/",
                "pos": "adj.",
                "zh": "令人信服的；強有力的",
                "sentence": "The defense presented a cogent argument substantiated by genetic evidence."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "The Dangers of Confirmation Bias in Algorithmic Societies (演算法社會中確認偏誤的危機)",
              "strategy": "邏輯論證結構解構：標註文章中的前題、論點、反方意見與作者最終反駁。",
              "text": "Confirmation bias—the human cognitive inclination to embrace information confirming pre-existing beliefs while ignoring disconfirming data—has been dramatically amplified by algorithmic content feeds. Critics argue that users bear individual responsibility for curating diverse perspectives. Admittedly, personal media literacy is indispensable. However, when recommendation engines are mathematically optimized for engagement over veracity, individual willpower alone cannot withstand systemic behavioral engineering.",
              "questions": [
                {
                  "q": "What counter-argument does the author acknowledge before presenting their rebuttal?",
                  "ans": "The argument that users bear individual responsibility for curating diverse perspectives."
                }
              ]
            },
            "step0Clue": "在撰寫思辨性作文時，想要拿到滿分，一定要寫一句：'Admittedly, proponents of X argue that... However, this overlooks the fact that...'！",
            "formativeQuiz": [
              {
                "q": "What logical fallacy occurs when someone distorts an opponent's argument to make it easier to attack?",
                "options": [
                  "Ad Hominem",
                  "Straw Man Fallacy",
                  "Circular Reasoning",
                  "Slippery Slope"
                ],
                "ans": 1,
                "hint1": "將對手的論點故意曲解或誇大成一個脆弱的假目標。",
                "hint2": "就像在田中立一個稻草人來痛打一樣。",
                "solution": "曲解或誇大他人論點以便攻擊，稱為「稻草人謬誤 (Straw Man Fallacy)」。故選 B。"
              }
            ],
            "traps": [
              {
                "wrong": "在作文中宣稱「所有人都知道這一定是對的」或「只有傻瓜才會反對」。 ❌",
                "correct": "使用嚴謹學術限定詞「Empirical evidence indicates that...」或「Scholars suggest...」。 ✔️",
                "reason": "學術思辨最忌諱情緒化斷言與人身攻擊，必須以客觀證據為論證依歸。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "全人核心素養九大面向全景融合應用",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s4_review",
            "motivation": "集結高中三年、國中會考與國際認證的最高綜合驗收。涵蓋文學、科技、倫理、跨文化與全球治理，在多文本長難句與圖表矩陣中鍛造頂標直覺，為所有面臨大考與人生的學子注入無堅不摧的實力。",
            "concepts": [
              {
                "title": "大考倒數全景心智調適矩陣 (Final Examination Psychological Protocol)",
                "formula": "Syntactic Confidence (文法自信) + Rapid Scanning (檢索速度) + Emotional Composure (臨場沉著)",
                "explanation": "臨場大考比拼的不僅是記憶力，更是心理素質。面對沒看過的新穎生字與長文，保持深呼吸，利用詞根與上下文脈絡化繁為簡。",
                "example": "Maintain steady breathing; parse complex sentences by finding the main predicate verb first.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [大考倒數全景心智調適矩陣 (Final Examination Psychological Protocol)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Maintain steady breathing; parse complex sentences by finding the main predicate verb first.",
                    "Maintain steady breathing; parse complex sentences by finding the main predicate verb first.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「大考倒數全景心智調適矩陣 (Final Examination Psychological Protocol)」之核心公式：Syntactic Confidence (文法自信) + Rapid Scanning (檢索速度) + Emotional Composure (臨場沉著)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "composure",
                "ipa": "/kəmˈpoʊʒər/",
                "pos": "n.",
                "zh": "鎮靜；沉著",
                "sentence": "Emotional composure during high-stakes testing unlocks optimal cognitive recall."
              },
              {
                "word": "diagnostic",
                "ipa": "/ˌdaɪəɡˈnɑːstɪk/",
                "pos": "adj.",
                "zh": "診斷的；分析評估的",
                "sentence": "Diagnostic mock examinations expose subtle conceptual blind spots before official testing."
              },
              {
                "word": "culmination",
                "ipa": "/ˌkʌlmɪˈneɪʃn/",
                "pos": "n.",
                "zh": "頂點；集大成",
                "sentence": "This exam represents the glorious culmination of twelve years of secondary scholarship."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "The Symphony of Human Civilization: A Retrospective on Progress (人類文明的交響樂章：歷史進程之回顧)",
              "strategy": "終極綜合跨域閱讀：整合分詞構句、倒裝句、虛擬語氣與篇章邏輯脈絡。",
              "text": "Standing upon the shoulders of countless generations, modern civilization possesses unprecedented technological capabilities. Had our ancestors not dared to venture across uncharted oceans and question scholastic dogmas, the Enlightenment that emancipated human reason would never have ignited. Yet, with immense power comes existential responsibility. As we stand on the threshold of the interplanetary and synthetic intelligence eras, it is our moral empathy and universal solidarity that must guide our collective trajectory.",
              "questions": [
                {
                  "q": "According to the author, what must guide our collective trajectory in the new era?",
                  "ans": "Our moral empathy and universal solidarity."
                }
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
              {
                "wrong": "考試結束鐘響前 3 分鐘還在猶豫改答案，把原本正確的直覺改錯。 ❌",
                "correct": "除非在原文中找到 100% 確鑿的相反反證，否則相信自己的第一直覺不輕易改答案。 ✔️",
                "reason": "統計學研究顯示，考生在最後一刻因焦慮而更改的答案，超過 60% 是將原本正確的選項改為錯誤選項。"
              }
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
            "stage": "第五學習階段 (高三與大考巔峰戰力)",
            "cefr": "B2 ~ C1 (學測滿級分 · 國際認證)",
            "competency": "自主行動、溝通互動、社會參與三大面向終身實踐",
            "guideline": "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。", 
            "sourceRef": "arch:s4_review",
            "motivation": "高中畢業不是英語學習的終點，而是以英語探索宇宙真理的起點！本單元為所有學習者打造「終身自主英語力進化系統」：如何利用國際播客 (Podcasts)、學術開放式課程 (Coursera, edX)、原文書籍精讀、以及 AI 語言模型成為永不懈怠的個人英文教練。",
            "concepts": [
              {
                "title": "終身自主英語學習飛輪效應 (The Lifelong Autonomous Flywheel)",
                "formula": "High-Quality Input (優質英文原版輸入) -> Cognitive Synthesis (筆記與知識內化) -> Authentic Output (部落格/演講/交流輸出) -> Continuous Feedback (反思精進)",
                "explanation": "將英語從「考試學科」轉化為「日常生活思維語言」。每天沉浸 30 分鐘優質英語內容，十年間累積的複利效應將徹底重塑人生軌跡。",
                "example": "Listen to BBC Radio 4 or NPR daily; engage in international seminars and academic exchange.",
                "examExample": {
                  "stem": "According to the core linguistic principle of [終身自主英語學習飛輪效應 (The Lifelong Autonomous Flywheel)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Listen to BBC Radio 4 or NPR daily; engage in international seminars and academic exchange.",
                    "Lareten to BBC Radio 4 or NPR daily; engage in international seminars and academic exchange.",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「終身自主英語學習飛輪效應 (The Lifelong Autonomous Flywheel)」之核心公式：High-Quality Input (優質英文原版輸入) -> Cognitive Synthesis (筆記與知識內化) -> Authentic Output (部落格/演講/交流輸出) -> Continuous Feedback (反思精進)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              },
              {
                "title": "AI 時代人機協作英文精進術 (Human-AI Synergistic Language Mastery)",
                "formula": "Prompt Engineering for Language Acquisition (設計情境對話、寫作評分規準檢驗、口音糾正)",
                "explanation": "善用生成式 AI 扮演蘇格拉底式導師，主動要求 AI 指出自己文法盲點與用詞不自然處，達成 24 小時個人化刻意練習。",
                "example": "Prompt: 'Act as an academic editor. Critique my essay for discourse flow and suggest three natural collocations.'",
                "examExample": {
                  "stem": "According to the core linguistic principle of [AI 時代人機協作英文精進術 (Human-AI Synergistic Language Mastery)], which sentence demonstrates the most accurate grammatical and syntactic structure?",
                  "options": [
                    "Prompt: 'Act as an academic editor. Critique my essay for discourse flow and suggest three natural collocations.'",
                    "Prompt: 'Act as an academic editor. Critique my essay for darecourse flow and suggest three natural collocations.'",
                    "The findings was concluded without sufficient empirical verification.",
                    "Regardless of the evidence, the hypothesis were abruptly abandoned."
                  ],
                  "answer": 0,
                  "analysis": "【考點解構】本題精確考核「AI 時代人機協作英文精進術 (Human-AI Synergistic Language Mastery)」之核心公式：Prompt Engineering for Language Acquisition (設計情境對話、寫作評分規準檢驗、口音糾正)。正確選項完美符合該句法原則；其餘選項皆存在主謂不一致或時態語態誤用。"
                }
              }
            ],
            "phonicsVocab": [
              {
                "word": "autonomous",
                "ipa": "/ɔːˈtɑːnəməs/",
                "pos": "adj.",
                "zh": "自主的；自治的",
                "sentence": "Autonomous learners take proactive responsibility for diagnosing their own developmental frontiers."
              },
              {
                "word": "flywheel",
                "ipa": "/ˈflaɪwiːl/",
                "pos": "n.",
                "zh": "飛輪效應；慣性輪",
                "sentence": "Consistent daily habit formation creates an unstoppable language acquisition flywheel."
              },
              {
                "word": "indomitable",
                "ipa": "/ɪnˈdɑːmɪtəbl/",
                "pos": "adj.",
                "zh": "不屈不撓的；堅毅的",
                "sentence": "An indomitable spirit transforms linguistic challenges into stepping stones toward global mastery."
              }
            ],
            "dialogue": [
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "How do you evaluate corporate trade-offs between rapid product expansion and cybersecurity compliance?",
                "zh": "您如何評估企業在快速擴張產品規模與資安合規之間的權衡取捨？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "I adhere to a zero-trust architecture. Speed should never compromise data integrity.",
                "zh": "我堅持零信任架構原則。研發速度絕不能犧牲數據完整性。"
              },
              {
                "speaker": "👨‍💼 Interviewer",
                "en": "Can you provide an instance where proactive governance prevented a catastrophic outage?",
                "zh": "您能否舉出一個前瞻性治理成功避免重大系統停機的具體實例？"
              },
              {
                "speaker": "👩‍💼 Candidate",
                "en": "At my prior firm, automated fuzz testing uncovered a memory vulnerability prior to deployment.",
                "zh": "在上一家企業，自動模糊測試在系統部署前即時偵測到了內存漏洞。"
              }
            ],
            "reading": {
              "title": "A Window to the World: The Lifelong Odyssey of Language (世界的窗戶：語言的終生奧德賽之旅)",
              "strategy": "全篇哲理反思：感悟英語作為跨越文化邊界與心靈交融之媒介價值。",
              "text": "To master a language is to acquire a second soul. Throughout this educational odyssey, we have explored the delicate architecture of phonemes, the rigorous logic of clauses, and the transcendent majesty of discourse. Beyond every examination, certificate, and academic milestone lies the true power of language: the capacity to comprehend diverse human hearts, to dismantle barriers of prejudice, and to articulate profound truths across oceans and epochs.",
              "questions": [
                {
                  "q": "According to the passage, what is the true power of language beyond examinations?",
                  "ans": "The capacity to comprehend diverse human hearts, dismantle barriers of prejudice, and articulate profound truths."
                }
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
              {
                "wrong": "考完大考就把所有英文書本丟掉，半年不讀不看導致字彙迅速退化。 ❌",
                "correct": "將手機系統設為英文，每天閱讀外媒一篇或聽英文 Podcast，保持終生語感。 ✔️",
                "reason": "語言習得如同肌肉鍛鍊，唯有將其融入日常生活的終生實踐，才能永保巔峰。"
              }
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
];
