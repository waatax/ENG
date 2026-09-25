// arch_semesters.mjs - 高中/技術型高中 108 課綱 4 個學期深度複習講義 (移植自 Arch 專案)



// ==========================================
// 英語文 第一學期（高一上）：基礎 1200 單字、五大時態與被動語態
// ==========================================
export const englishS1Review = {
  id: "english-s1",
  subjectSlug: "english",
  subjectTitle: "英語文",
  semesterCode: "s1",
  semesterTitle: "第一學期（高一上）",
  gradeLevel: 10,
  subtitle: "核心基礎 1200 單字、五大時態變化、被動語態與情態助動詞",
  category: "共同科目",
  curriculumScope: "108 課綱技術型高中英語文第一冊：基礎 1200 單字、名詞單複數、五大基本時態、主動被動轉換、情態助動詞與生活會話",
  topicSlugs: ["english"],
  examAnalysis: {
    examWeight: "佔統測英語文約 30% ~ 35%（字彙前 10 題與基礎綜合對話題型）",
    coreExamThemes: [
      "核心字彙與詞性變化：名詞 (-tion, -ment, -ity)、形容詞 (-ful, -able, -ive)、副詞 (-ly)",
      "五大核心時態與時間副詞指標 (Time Markers)：現在簡單式 (真理與習慣)、過去簡單式 (明確過去時間)、現在進行式 (正在進行)、現在完成式 (have/has + pp, since/for)、未來式 (will / be going to)",
      "被動語態公式：be 動詞 + 過去分詞 (p.p.)，無生命物體當主詞之被動判定",
      "情態助動詞：must, can, should, may 後接原形動詞；情態助動詞被動 (must be done)",
      "生活與職場情境短對話：問路、預約、工程安全提醒、飯店登記"
    ],
    recentTrends: "統測單字題每年必定出現 3~4 題高一基礎時態與被動語態。題幹敘述結合工程工地參訪、建築展覽與校園日常。",
    targetScoreAdvice: "看到時間副詞 (yesterday, since, every day) 立刻判定時態；看到無生命物品當主詞優先考慮被動態，此區塊務必 100% 拿滿。"
  },
  chapters: [
    {
      chapterNo: 1,
      title: "核心 1200 單字、詞性轉換規則與字根字尾",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "名詞、動詞、形容詞與副詞之字尾判讀法則",
          explanation: "統測字彙題常考同一字根之不同詞性變形：",
          keyPoints: [
            "名詞字尾 (Noun Endings)：-tion (construction, pollution), -ment (development, equipment), -ity (safety, reality), -ance/-ence (importance, difference)。",
            "形容詞字尾 (Adjective Endings)：-ful (useful, careful), -able/-ible (sustainable, flexible), -ive (creative, active), -al (traditional, structural)。",
            "副詞字尾 (Adverb Endings)：形容詞 + ly (safely, quickly, carefully)。",
            "動詞字尾 (Verb Endings)：-ize (standardize, modernize), -en (widen, strengthen)。"
          ]
        },
        {
          heading: "常考混淆單字對比",
          explanation: "外觀相似但意義截然不同之高頻統測單字：",
          keyPoints: [
            "affect (v. 影響) vs effect (n. 效果、效應)。",
            "adopt (v. 採用、領養) vs adapt (v. 適應、改編)。",
            "access (n./v. 進入、取得管道) vs assess (v. 評估、評定)。"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{Noun: -tion, -ment, -ity}; \\quad \\text{Adj: -ful, -able, -ive}; \\quad \\text{Adv: Adj + ly}",
        meaning: "英語四大詞性標準字尾轉換公式",
        unit: "詞性學",
        cautions: "ly 結尾不一定全是副詞！例如 friendly, lovely, lonely 是『形容詞』！切勿見 ly 即當副詞！",
        latex: "\\text{Adjective} + \\text{-ly} = \\text{Adverb}; \\quad \\text{Noun} + \\text{-ly} = \\text{Adjective}"
      },
      tables: [
        {
          title: "建築與工程高頻單字詞性四態轉換表",
          headers: ["動詞 (Verb)", "名詞 (Noun)", "形容詞 (Adjective)", "副詞 (Adverb)"],
          rows: [
            ["construct (建造)", "construction (營造/建築)", "constructive (建設性的)", "constructively"],
            ["create (創造)", "creation / creator", "creative (具創意的)", "creatively (創造性地)"],
            ["measure (量測)", "measurement (測量值)", "measurable (可測量的)", "measurably"],
            ["produce (生產)", "product / production", "productive (多產的)", "productively"],
            ["develop (發展/開發)", "development (發展/建案)", "developed / developing", "developmentally"]
          ]
        }
      ],
      mustMasterChecklist: [
        "能由字尾迅速辨識單字詞性 (-tion 名詞, -able 形容詞, -ly 副詞)",
        "清楚區分 affect (動詞) 與 effect (名詞)",
        "掌握建築核心單字：construct, structure, design, material, measure"
      ]
    },
    {
      chapterNo: 2,
      title: "五大核心時態體系與時間副詞信號",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "現在簡單式 vs 過去簡單式",
          explanation: "現在簡單式表達事實、真理或習慣動作；過去簡單式表達在過去某一特定時間點發生且已結束之動作：",
          keyPoints: [
            "現在簡單式信號：every day, always, usually, often, once a week。",
            "過去簡單式信號：yesterday, last week/year, ... ago, in 2015, just now（動詞必用過去式 V-ed 或不規則變化）。"
          ]
        },
        {
          heading: "現在完成式 (Present Perfect Tense) 必考三情境",
          explanation: "結構為『have / has + 過去分詞 (p.p.)』，表達自過去持續到現在的動作或截至目前為止的經驗：",
          keyPoints: [
            "時間副詞一：since + 過去時間點 (e.g. since 2010, since he was a child)；主要子句必用現在完成式！",
            "時間副詞二：for + 一段時間 (e.g. for five years, for two months)。",
            "時間副詞三：already (已經), yet (尚未，用於否定與疑問句), ever (曾經), never (從未)。"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{Present Perfect: } \\text{have/has} + \\text{p.p.} \\quad (\\text{since } + \\text{過去點} \\; / \\; \\text{for } + \\text{時段})",
        meaning: "現在完成式核心時態公式與時間副詞連動",
        unit: "文法時態",
        cautions: "since 後面接的是『過去特定時間點或過去式子句』，前面主要子句 100% 搭配『現在完成式 have/has + p.p.』！",
        latex: "S + \\text{have/has} + \\text{p.p.} + \\dots + \\text{since} + S + V_{\\text{past}}"
      },
      diagram: {
        title: "五大英文核心時態時間軸對照圖",
        type: "timeline",
        caption: "過去簡單式強調過去特定點；現在完成式涵蓋過去至現在之一整段時間區間 (since/for)；現在式表達習慣與真理。",
        asciiArt: `   ─────────────────────────────┼─────────────────────────────► 時間軸
   [過去 Past]                 [現在 Present]              [未來 Future]
        * 過去簡單式                 * 現在簡單式                 * 未來式
      (yesterday, ago)            (every day, always)         (tomorrow, will)
        V-ed                        V / V-s                     will + V
   
        ├─── 現在完成式 (have/has + p.p.) ───►|
          (從過去持續到現在, since 2018 / for 5 years)
   
        >>> 現在進行式 (be + V-ing) <<< (此時此刻正在發生, now, Look!)`,
        labels: [
          { label: "現在完成式", desc: "have/has + p.p.，時間自過去延伸至今，搭配 since/for" },
          { label: "過去簡單式", desc: "動詞過去式 V-ed，動作在過去已結束，搭配 yesterday/ago" },
          { label: "現在簡單式", desc: "V / V-s，常態性習慣、客觀真理、科學事實" }
        ]
      },
      tables: [
        {
          title: "五大時態動詞形態與指標時間副詞速查表",
          headers: ["時態名稱", "動詞肯定句結構", "動詞否定/疑問句", "典型關鍵時間指標詞", "統測例句"],
          rows: [
            ["現在簡單式", "V / V-(e)s", "do / does + V", "always, usually, every day", "The architect works in Taichung."],
            ["過去簡單式", "V-ed (不規則)", "did + V", "yesterday, ago, last night", "The contractor finished the bridge yesterday."],
            ["現在進行式", "is/am/are + V-ing", "is/am/are + not + V-ing", "now, at this moment, Look!", "They are building a new library now."],
            ["現在完成式", "have/has + p.p.", "have/has not + p.p.", "since, for, already, yet", "We have lived in this city since 2018."],
            ["未來式", "will + V / be going to + V", "will not (won't) + V", "tomorrow, next week, soon", "The inspection will begin tomorrow."]
          ]
        }
      ],
      mustMasterChecklist: [
        "看到 since + 過去時間，主要子句 99% 選 have/has + p.p.",
        "看到 yesterday, ago, last 必定選過去式動詞",
        "熟背常用不規則動詞三態：build-built-built, draw-drew-drawn, write-wrote-written"
      ]
    },
    {
      chapterNo: 3,
      title: "被動語態 (Passive Voice) 與情態助動詞被動",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "被動語態公式與主被動判斷",
          explanation: "當句子的主詞是『動作的承受對象』而非執行者時，必須採用被動態：主詞 + be動詞 + 過去分詞 (p.p.) + (by + 受詞)。",
          keyPoints: [
            "現在式被動：is / am / are + p.p. (e.g. English is spoken around the world.)",
            "過去式被動：was / were + p.p. (e.g. The cathedral was constructed in 1890.)",
            "現在完成被動：have / has been + p.p. (e.g. The blueprints have been approved.)",
            "進行式被動：is / am / are being + p.p. (e.g. The road is being paved.)"
          ]
        },
        {
          heading: "情態助動詞被動式",
          explanation: "情態助動詞 (must, can, should, may, will) 本身後接原形動詞，其被動結構為：情態助動詞 + be + p.p.！",
          keyPoints: [
            "must be done (必須被執行)",
            "should be cleaned (應該被清潔)",
            "can be seen (可以被看見)"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{Passive Voice: } S + \\text{be} + \\text{p.p.}; \\quad \\text{Modal Passive: } \\text{Modal} + \\text{be} + \\text{p.p.}",
        meaning: "一般被動語態與情態助動詞被動標準公式",
        unit: "語態",
        cautions: "被動態中『be 動詞』絕對不能漏掉！不可寫成 The bridge built in 1999 (缺少 was)！",
        latex: "\\text{Active: } S + V + O \\implies \\text{Passive: } O + \\text{be} + \\text{p.p.} + (\\text{by } S)"
      },
      tables: [
        {
          title: "各時態被動語態變化一覽表",
          headers: ["時態", "主動結構範例", "被動語態結構", "被動範例句子"],
          rows: [
            ["現在簡單式", "Architects design buildings.", "is / am / are + p.p.", "Buildings are designed by architects."],
            ["過去簡單式", "They built the tower in 2004.", "was / were + p.p.", "The tower was built in 2004."],
            ["現在完成式", "We have checked the plans.", "have / has been + p.p.", "The plans have been checked."],
            ["情態助動詞", "You must wear safety boots.", "Modal + be + p.p.", "Safety boots must be worn on site."]
          ]
        }
      ],
      mustMasterChecklist: [
        "物品（如大樓、橋梁、圖紙、規範）當主詞時，動詞必定優先選被動 (be + p.p.)",
        "情態助動詞被動結構為：助動詞 + be + p.p. (如 must be inspected)",
        "注意主詞單複數：單數配 is/was/has，複數配 are/were/have"
      ]
    }
  ],
  highFrequencyTraps: [
    {
      title: "【陷阱一】無生命主詞誤選主動動詞",
      trap: "看到 The report (報告) 當主詞，考生選 completes 或 completed 而非 was completed。",
      solution: "報告不會自己完成！主詞受動時必定使用被動態 was completed！",
      relatedExamConcept: "被動語態"
    },
    {
      title: "【陷阱二】since 子句與主要子句時態混淆",
      trap: "看到 since，考生把 since 後面的子句也寫成現在完成式。",
      solution: "口訣：『since 後面接過去式，主要子句用現在完成式』！例如：I have known him since I was a child.",
      relatedExamConcept: "現在完成式"
    }
  ],
  curatedPastQuestions: [
    {
      id: "115-英文-03",
      year: 115,
      questionNo: 3,
      examPaper: "共同科目 英語文",
      stem: "All safety rules _______ carefully followed by construction workers to prevent serious accidents.",
      options: {
        A: "must",
        B: "must be",
        C: "have must",
        D: "to be"
      },
      answer: "B",
      sopSteps: [
        {
          stepNo: 1,
          title: "分析主詞與動詞語態",
          detail: "主詞為 All safety rules (所有安全規範)，動作為 follow (遵守)。規範是被遵守的對象，且後面有 followed (p.p.)，故必須構成被動語態。"
        },
        {
          stepNo: 2,
          title: "檢驗助動詞被動語態結構",
          detail: "情態助動詞被動語態結構為：情態助動詞 + be + 過去分詞 (p.p.)。故空格處應填入 must be。"
        },
        {
          stepNo: 3,
          title: "結論選答",
          detail: "選 (B)。"
        }
      ],
      examinerTrapNotes: "考生常只選 must (A)，漏了關鍵的 be 動詞。",
      quickShortcut: "【秒殺模型：情態助動詞被動】情態助動詞 + be + p.p.！空格後面已有 followed，故填入 must be，2 秒秒殺 (B)！"
    },
    {
      id: "114-英文-05",
      year: 114,
      questionNo: 5,
      examPaper: "共同科目 英語文",
      stem: "Our engineering team _______ on this green building project since last October.",
      options: {
        A: "worked",
        B: "is working",
        C: "has worked",
        D: "will work"
      },
      answer: "C",
      sopSteps: [
        {
          stepNo: 1,
          title: "尋找句中關鍵時間副詞",
          detail: "句尾出現『since last October (自從去年十月以來)』，為標準現在完成式指標。"
        },
        {
          stepNo: 2,
          title: "比對現在完成式結構",
          detail: "現在完成式結構為 have / has + p.p.；主詞 Our engineering team 為單數集合名詞，故搭配 has worked。"
        },
        {
          stepNo: 3,
          title: "結論選答",
          detail: "選 (C)。"
        }
      ],
      examinerTrapNotes: "看到 last October 很多考生誤以為是純過去式而選 (A) worked，忽略了前面的 since！",
      quickShortcut: "【秒殺模型：since 必配現在完成】看到 since 毫不猶豫直接找 have / has + p.p.，秒選 (C)！"
    }
  ],
  preExamChecklist: [
    "我能由字尾迅速辨識單字詞性 (-tion, -ment, -ful, -able, -ly)",
    "看到 since + 過去時間，主要子句必定搭配 have/has + p.p.",
    "看到物品當主詞，動詞必定選被動語態 be + p.p.",
    "情態助動詞被動結構為：must/can/should + be + p.p."
  ]
};

// ==========================================
// 英語文 第二學期（高一下）：進階 2000 字、動名詞不定詞與名詞子句
// ==========================================
export const englishS2Review = {
  id: "english-s2",
  subjectSlug: "english",
  subjectTitle: "英語文",
  semesterCode: "s2",
  semesterTitle: "第二學期（高一下）",
  gradeLevel: 10,
  subtitle: "進階 2000 單字、動名詞與不定詞、名詞子句與情境會話",
  category: "共同科目",
  curriculumScope: "108 課綱技術型高中英語文第二冊：動名詞 (V-ing) vs 不定詞 (to V)、名詞子句 (that, whether/if, wh-)、對話溝通、圖表短文閱讀",
  topicSlugs: ["english"],
  examAnalysis: {
    examWeight: "佔統測英語文約 30% ~ 35%（綜合測驗克漏字與對話核心）",
    coreExamThemes: [
      "動名詞 (V-ing) 專屬動詞：enjoy, avoid, practice, mind, consider, suggest, finish 後面必定接 V-ing！",
      "不定詞 (to V) 專屬動詞：want, decide, hope, plan, promise, refuse 後面必定接 to V！",
      "兩者皆可但語意不同之動詞：remember / forget / stop / try（to V 表『將去做』；V-ing 表『做過的事/正在進行』）",
      "名詞子句三巨頭：that 子句 (陳述事實)、whether / if 子句 (是否)、wh- 疑問詞子句 (間接問句，疑問詞 + 主詞 + 動詞！)",
      "情境職場對話：意見交換、詢問建議、商務確認"
    ],
    recentTrends: "克漏字極常考動名詞與不定詞搭配，以及間接問句的『疑問詞 + 主詞 + 動詞 (S+V)』正向語序，考驗學生句子骨架分析能力。",
    targetScoreAdvice: "牢記 avoid doing, decide to do 口訣，間接問句絕不倒裝，穩穩拿下克漏字與對話題。"
  },
  chapters: [
    {
      chapterNo: 1,
      title: "動名詞 (V-ing) 與不定詞 (to V) 核心動詞分類與語意破譯",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "只接動名詞 (V-ing) 的常考高頻動詞",
          explanation: "以下動詞後方若有動作，依文法必須使用動名詞 (Gerund, V-ing)：",
          keyPoints: [
            "口訣記憶：enjoy (享受), avoid (避免), practice (練習), mind (介意), finish (完成), suggest (建議), consider (考慮), postpone (延期)。",
            "例句：The workers avoided making loud noises during the meeting.",
            "介系詞後面必定接 V-ing：be good at V-ing, look forward to V-ing (注意此 to 為介系詞！)。"
          ]
        },
        {
          heading: "只接不定詞 (to V) 的常考動詞",
          explanation: "表達『意圖、計畫或未來期望』的動詞，後面必定接不定詞 (Infinitive, to V)：",
          keyPoints: [
            "decide (決定), want (想要), hope (希望), plan (計畫), refuse (拒絕), agree (同意), promise (承諾)。",
            "例句：The architect decided to use eco-friendly materials."
          ]
        },
        {
          heading: "接 to V 與 V-ing 語意大不同之四大金剛",
          explanation: "remember, forget, stop, try 接不同形態表達截然不同含意：",
          keyPoints: [
            "remember to V (記得要去未做的事) vs remember V-ing (記得曾經做過的事)。",
            "forget to V (忘記要去未做的事) vs forget V-ing (忘記做過某事)。",
            "stop to V (停下當前動作去轉做另一件事) vs stop V-ing (停止正在進行的動作)。",
            "try to V (努力嘗試達成) vs try V-ing (試試看某方法)。"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{avoid/enjoy/finish} + V\\text{-ing}, \\quad \\text{decide/plan/hope} + \\text{to } V, \\quad \\text{stop } V\\text{-ing (停止目前動作)}",
        meaning: "動名詞與不定詞受詞搭配口訣",
        unit: "動狀詞",
        cautions: "look forward to 中的 to 是介系詞！後面 100% 接動名詞 V-ing (I look forward to hearing from you)！切勿接原形！",
        latex: "\\text{Preposition} + V\\text{-ing}; \\quad \\text{look forward to} + V\\text{-ing}"
      },
      tables: [
        {
          title: "動名詞 (V-ing) vs 不定詞 (to V) 受詞分類速記表",
          headers: ["分類群組", "涵蓋核心動詞清單", "文法受詞形態", "統測典型範例"],
          rows: [
            ["只接動名詞 (V-ing)", "avoid, enjoy, finish, mind, practice, suggest, consider", "受詞一律為 V-ing", "She suggested taking the subway."],
            ["只接不定詞 (to V)", "decide, hope, plan, promise, refuse, want, agree", "受詞一律為 to V", "They agreed to sign the contract."],
            ["介系詞慣用語", "look forward to, be used to, with a view to", "受詞一律為 V-ing", "I look forward to seeing your design."],
            ["stop 語意對比", "stop to V (停下去做) / stop V-ing (戒除/停止)", "視語意而定", "He stopped smoking. (戒菸)"]
          ]
        }
      ],
      mustMasterChecklist: [
        "熟背 avoid, enjoy, finish, practice 後面必接 V-ing",
        "熟背 decide, hope, plan, refuse 後面必接 to V",
        "熟記 look forward to 後面必須接 V-ing",
        "清楚 stop smoking 是戒菸，stop to smoke 是停下來去抽菸"
      ]
    },
    {
      chapterNo: 2,
      title: "名詞子句三大形態與間接問句語序",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "名詞子句三大引導詞",
          explanation: "名詞子句在句中扮演主詞、受詞或同位語：",
          keyPoints: [
            "1. that 引導之名詞子句：that + 完整句子 (S+V+O)，表示一件事實（that 本身無實質意義，當受詞時可省略）。e.g. I know (that) honesty is important.",
            "2. whether / if 引導之名詞子句：表示『是否』。whether 可接 or not，if 不能直接接 or not。e.g. I don't know whether he will come or not.",
            "3. 疑問詞引導之名詞子句（間接問句）：who, what, where, when, why, how。"
          ]
        },
        {
          heading: "間接問句 (Indirect Questions) 絕不倒裝鐵律",
          explanation: "當疑問句被嵌入另一個主要子句中成為受詞時，其語序必須恢復為『直述句正常語序（疑問詞 + 主詞 + 動詞）』！",
          keyPoints: [
            "直接問句：Where does he live? (倒裝助動詞 does)",
            "間接問句：I don't know where he lives. (直述語序：where + he + lives，絕無助動詞 does！)",
            "統測破題口訣：『間接問句不倒裝，疑問詞後接主詞動詞 (Wh- + S + V)』！"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{間接問句語序: } \\text{疑問詞 (Wh-)} + \\text{主詞 (S)} + \\text{動詞 (V)} \\quad (\\text{絕不倒裝！})",
        meaning: "間接問句名詞子句標準語序公式",
        unit: "子句句型",
        cautions: "間接問句中絕對不可再出現 do, does, did 等疑問倒裝助動詞！若原問句是 does，動詞要記得加 s！",
        latex: "\\text{Direct: } \\text{Wh-} + \\text{Aux} + S + V? \\implies \\text{Indirect: } \\text{Wh-} + S + V"
      },
      diagram: {
        title: "間接問句 (名詞子句) 絕不倒裝結構圖",
        type: "flowchart",
        caption: "直接問句嵌入主要子句後，必須恢復為直述句正常語序：疑問詞 (Wh-) + 主詞 (S) + 動詞 (V)，不可出現助動詞 do/does/did 倒裝！",
        asciiArt: `    【直接問句 Direct】               【間接問句 Indirect (嵌入句)】
      Where does he live?  ───┐          I don't know where he lives.
      ▲      ▲   ▲  ▲         │          ──────────── ───── ── ─────
      Wh-   助動 主  動       │           主要子句    Wh-  S    V
            (倒裝助動詞)      └──► 轉化 ───►  [恢復直述語序：Wh + S + V]
                                             ❌ 不可寫成 ...where does he live.`,
        labels: [
          { label: "正常語序", desc: "疑問詞 + 主詞 + 動詞 (Wh- + S + V)，直述句骨幹" },
          { label: "剔除倒裝", desc: "do, does, did 助動詞必須完全剔除，動詞依主詞人稱變化" },
          { label: "是否子句", desc: "若原句為 Yes/No 問句，則以 whether / if (是否) 引導" }
        ]
      },
      tables: [
        {
          title: "直接問句轉換為間接問句語序對照表",
          headers: ["直接問句 (Direct)", "嵌入主要子句", "正確間接問句 (Indirect)", "常見考生錯誤 (❌)"],
          rows: [
            ["What is his name?", "Could you tell me...", "...what his name is.", "...what is his name? ❌"],
            ["Where does she live?", "I wonder...", "...where she lives.", "...where does she live. ❌"],
            ["When will the train arrive?", "Nobody knows...", "...when the train will arrive.", "...when will arrive the train. ❌"],
            ["How can we solve the issue?", "They discussed...", "...how they could solve the issue.", "...how could they solve... ❌"]
          ]
        }
      ],
      mustMasterChecklist: [
        "熟背間接問句語序：疑問詞 + S + V",
        "間接問句中絕不可使用 do, does, did",
        "知道 whether / if 表示『是否』，that 表示事實"
      ]
    }
  ],
  highFrequencyTraps: [
    {
      title: "【陷阱一】間接問句保留直接問句倒裝結構",
      trap: "題目問 Can you tell me _______? 考生選 where does the bus stop 或是 where is the station。",
      solution: "間接問句語序必須為『疑問詞 + 主詞 + 動詞』！正確答案必為 where the bus stops 或 where the station is！",
      relatedExamConcept: "間接問句"
    },
    {
      title: "【陷阱二】look forward to 後面誤接原形動詞",
      trap: "看到 to 就反射性接原形動詞 V。",
      solution: "look forward to 中的 to 是介系詞！介系詞後面必定接動名詞 V-ing！必須選 looking forward to meeting you！",
      relatedExamConcept: "介系詞受詞"
    }
  ],
  curatedPastQuestions: [
    {
      id: "115-英文-12",
      year: 115,
      questionNo: 12,
      examPaper: "共同科目 英語文",
      stem: "The civil engineer explained to the public _______ the new tunnel was designed to withstand strong earthquakes.",
      options: {
        A: "how",
        B: "what",
        C: "which",
        D: "who"
      },
      answer: "A",
      sopSteps: [
        {
          stepNo: 1,
          title: "分析子句語意與完整性",
          detail: "空格後方的子句『the new tunnel was designed to withstand strong earthquakes (新隧道被設計用以承受強烈地震)』結構完整，包含主詞、被動動詞與受詞。"
        },
        {
          stepNo: 2,
          title: "判斷合適的疑問副詞",
          detail: "工程師向大眾解釋隧道是如何 (How) 被設計來耐震的，表『方式、機制』，故填入疑問副詞 how。"
        },
        {
          stepNo: 3,
          title: "結論選答",
          detail: "選 (A)。"
        }
      ],
      examinerTrapNotes: "很多考生看到 explained 就想選 what，但後方子句結構完整不缺名詞，故只能選副詞 how。",
      quickShortcut: "【秒殺模型：解釋運作機制】解釋結構『如何』運作 = how！秒選 (A)！"
    },
    {
      id: "114-英文-08",
      year: 114,
      questionNo: 8,
      examPaper: "共同科目 英語文",
      stem: "To complete the bridge on schedule, the contractor decided _______ more experienced welders.",
      options: {
        A: "hire",
        B: "hiring",
        C: "to hire",
        D: "hired"
      },
      answer: "C",
      sopSteps: [
        {
          stepNo: 1,
          title: "抓住主要動詞 decided",
          detail: "動詞 decide (決定) 表未來意向，其受詞固定必須搭配不定詞 (to V)。"
        },
        {
          stepNo: 2,
          title: "比對選項",
          detail: "decide to hire (決定聘僱)，故應選 to hire。"
        },
        {
          stepNo: 3,
          title: "結論選答",
          detail: "選 (C)。"
        }
      ],
      examinerTrapNotes: "標準動名詞與不定詞基本題，只要熟背 decide + to V 即可秒拿 2 分。",
      quickShortcut: "【秒殺模型：decide 口訣】decide to do！3 秒鎖定 (C)！"
    }
  ],
  preExamChecklist: [
    "我熟記 avoid, enjoy, finish 後接 V-ing",
    "我熟記 decide, plan, want 後接 to V",
    "我知道 look forward to 後面必須接 V-ing",
    "我熟背間接問句語序為：疑問詞 + S + V (絕不倒裝)"
  ]
};

// ==========================================
// 英語文 第三學期（高二上）：核心 3500 字、關係詞、分詞構句與轉折語
// ==========================================
export const englishS3Review = {
  id: "english-s3",
  subjectSlug: "english",
  subjectTitle: "英語文",
  semesterCode: "s3",
  semesterTitle: "第三學期（高二上）",
  gradeLevel: 11,
  subtitle: "核心高頻 3500 字、關係詞全方位體系、分詞構句與段落轉折語",
  category: "共同科目",
  curriculumScope: "108 課綱技術型高中英語文第三冊：高頻 3500 字、關係代名詞 (who/which/that/whose)、限定與非限定 (逗點)、分詞構句、轉折副詞與長篇閱讀",
  topicSlugs: ["english"],
  examAnalysis: {
    examWeight: "佔統測英語文約 35% ~ 40%（克漏字與閱讀測驗長難句解析核心）",
    coreExamThemes: [
      "關係代名詞 (Relative Pronouns)：先行詞為人 (who/whom/whose/that)、先行詞為物 (which/that/whose)",
      "that 的禁忌：that 前面『絕對不可有逗點 (,)』，前面『絕對不可有介系詞』！",
      "關係代名詞所有格 whose：whose + 名詞 (e.g. a building whose roof is green)",
      "分詞構句 (Participle Clauses)：兩子句主詞相同時，省略連接詞與主詞，主動動詞改 V-ing，被動動詞改 p.p.！",
      "段落轉折詞四大天王：轉折 (However, Nevertheless), 因果 (Therefore, As a result), 遞進 (Furthermore, In addition), 對比 (In contrast, On the other hand)"
    ],
    recentTrends: "統測克漏字每篇必考 1 題轉折詞與 1 題關係詞或分詞構句。掌握逗點後不可接 that，主動 V-ing 被動 p.p.，即可快速破題。",
    targetScoreAdvice: "看到逗點排除 that，看到轉折詞看前後兩句是因果還是對立，此區塊能大幅提升作答速度。"
  },
  chapters: [
    {
      chapterNo: 1,
      title: "關係代名詞、關係副詞與逗點非限定用法",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "關係代名詞選用決策樹",
          explanation: "依『先行詞屬性』與『在關係子句中擔任之角色』選用：",
          keyPoints: [
            "先行詞為人：主格 who / that；受格 whom / who / that；所有格 whose + N。",
            "先行詞為物：主格 which / that；受格 which / that；所有格 whose + N / of which。",
            "關代在子句中當『受格』時可直接省略 (e.g. The house (which) we visited is modern.)。"
          ]
        },
        {
          heading: "that 的兩大黃金禁忌與必考考點",
          explanation: "在統測中，看到 that 必須立刻檢查兩大禁忌：",
          keyPoints: [
            "禁忌一：that 前面『絕對不可有逗點 (,)』！非限定用法中不能使用 that，先行詞為人只能用 who，先行詞為物只能用 which！",
            "禁忌二：that 前面『絕對不可有介系詞』！介系詞後面只能用 whom (人) 或 which (物)（如 in which, with whom）！"
          ]
        },
        {
          heading: "關係副詞 (where, when, why)",
          explanation: "關係副詞 = 介系詞 + 關係代名詞 (which)：",
          keyPoints: [
            "where = in / at which (修飾地點，後方接完整子句)。",
            "when = on / in / at which (修飾時間)。",
            "why = for which (修飾原因 the reason)。"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{that 兩大禁忌: } \\text{逗點後不用 that, 介系詞後不用 that}; \\quad \\text{介系詞} + \\text{whom / which}",
        meaning: "關係代名詞核心使用限制與口訣",
        unit: "關係詞",
        cautions: "看到先行詞是地方，不可盲目選 where！若後方子句缺主詞或受詞，依然必須選 which / that！只有在後方子句『完整不缺主受詞』時才能選 where！",
        latex: ", + \\text{that } (\\times); \\quad \\text{Prep} + \\text{that } (\\times); \\quad \\text{where} = \\text{in which}"
      },
      diagram: {
        title: "關係代名詞 that 兩大黃金禁忌決策樹",
        type: "decision-tree",
        caption: "先行詞後有逗點或介系詞時，絕對不可使用 that！非限定逗點後用 who/which，介系詞後用 whom/which。",
        asciiArt: `                     先行詞 (人或事物)
                             │
            ┌────────────────┴────────────────┐
     [前方有逗點 , ]                   [前方有介系詞 Prep]
            │                                 │
     ❌ 禁忌：不可用 that              ❌ 禁忌：不可用 that
            │                                 │
     ┌──────┴──────┐                   ┌──────┴──────┐
     人 → 用 who   物 → 用 which       人 → Prep+whom  物 → Prep+which
   (非限定補充說明)                   (如 with whom, in which)`,
        labels: [
          { label: "逗點後禁 that", desc: "非限定子句 (有逗點) 只能用 who (人) 或 which (物)" },
          { label: "介系詞後禁 that", desc: "介系詞後只能用受格 whom (人) 或 which (物)" },
          { label: "受格省略", desc: "關代在子句中作及物動詞之受詞且無介系詞時，可直接省略" }
        ]
      },
      tables: [
        {
          title: "關係代名詞選用全方位決策表",
          headers: ["先行詞屬性", "主格 (缺主詞)", "受格 (缺受詞)", "所有格 (+名詞)", "前面有逗點時"],
          rows: [
            ["先行詞為人", "who / that", "whom / that / 省略", "whose + N", "只能用 who (禁 that)"],
            ["先行詞為物", "which / that", "which / that / 省略", "whose / of which", "只能用 which (禁 that)"],
            ["先行詞為人+物", "that 優先", "that 優先", "whose", "—"],
            ["前面有介系詞", "—", "Prep + whom / which", "Prep + whose", "Prep + which (禁 that)"]
          ]
        }
      ],
      mustMasterChecklist: [
        "熟背 that 兩大禁忌：逗點後面不用 that，介系詞後面不用 that",
        "知道關係代名詞當受格時可以省略",
        "知道 whose 後面必須緊接一個名詞 (whose + N)",
        "區分 which (後接不完整子句) 與 where (後接完整子句)"
      ]
    },
    {
      chapterNo: 2,
      title: "分詞構句 (Participle Clauses) 與動狀詞化簡",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "分詞構句化簡四步驟",
          explanation: "為了使文字簡練，將副詞子句簡化為分詞片語：",
          keyPoints: [
            "步驟 1：確認副詞子句與主要子句的『主詞相同』。",
            "步驟 2：省略連接詞 (When, Because, Although...)。",
            "步驟 3：省略副詞子句的相同主詞。",
            "步驟 4：動詞改為分詞——『主動語態改為現在分詞 V-ing』；『被動語態改為過去分詞 p.p. (省略 being)』！"
          ]
        },
        {
          heading: "統測秒殺破題口訣",
          explanation: "看到句子以逗點分隔，前半段無連接詞且無主詞，直接檢視主要子句主詞：",
          keyPoints: [
            "主要子句主詞若能『自己主動執行動作』⇒ 答案必選 V-ing！(e.g. Seeing the blueprint, the engineer smiled.)",
            "主要子句主詞若是『被動承受動作』⇒ 答案必選 p.p.！(e.g. Built in 1990, the building is still solid.)"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{分詞構句: 主動選 } V\\text{-ing}, \\quad \\text{被動選 } p.p. \\quad (\\text{依主要子句主詞判定})",
        meaning: "分詞構句主被動判定黃金準則",
        unit: "分詞",
        cautions: "判定 V-ing 還是 p.p.，唯一關鍵是看『主要子句逗點後面的第一個主詞』！千萬不要看別的名詞！",
        latex: "V\\text{-ing / } p.p., \\quad \\mathbf{S} + V + O \\implies \\mathbf{S} \\text{ 做該動作選 } V\\text{-ing}, \\; \\mathbf{S} \\text{ 被做選 } p.p."
      },
      tables: [
        {
          title: "原句轉換為分詞構句對照表",
          headers: ["原始副詞子句形態", "主動/被動", "化簡後之分詞構句", "統測破題關鍵"],
          rows: [
            ["Because he felt tired, he went to bed.", "主動", "Feeling tired, he went to bed.", "he 自己感到累 ⇒ 選 Feeling (V-ing)"],
            ["Because it was located on a hill, the hotel has a great view.", "被動", "Located on a hill, the hotel has a great view.", "the hotel 被坐落 ⇒ 選 Located (p.p.)"],
            ["While they were walking along the road, they found a coin.", "主動", "Walking along the road, they found a coin.", "they 自己散步 ⇒ 選 Walking (V-ing)"],
            ["Although the tower was damaged by fire, it was restored.", "被動", "Damaged by fire, the tower was restored.", "the tower 被大火燒損 ⇒ 選 Damaged (p.p.)"]
          ]
        }
      ],
      mustMasterChecklist: [
        "掌握分詞構句口訣：主詞相同，主動 V-ing，被動 p.p.",
        "判定依據一律以『逗點後面的主要主詞』為準",
        "看到 Built in..., Located in..., Designed by... 立刻辨識為被動分詞片語"
      ]
    },
    {
      chapterNo: 3,
      title: "篇章轉折詞 (Transitional Words) 與語氣脈絡解密",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "段落轉折詞四大語氣分類",
          explanation: "轉折副詞連接前後兩句，決定段落邏輯方向：",
          keyPoints: [
            "1. 轉折/對立 (Contrast)：However (然而), Nevertheless (儘管如此), Nonetheless, Yet。前後文意思相反（正面 vs 負面）。",
            "2. 因果/結論 (Cause & Effect)：Therefore (因此), Consequently, As a result, Thus。前句為原因，後句為結果。",
            "3. 遞進/補充 (Addition)：Furthermore (此外), Moreover, In addition, Besides。前後文觀點相同，增加論據。",
            "4. 舉例 (Exemplification)：For example (例如), For instance。"
          ]
        },
        {
          heading: "Although (連接詞) vs Despite (介系詞) 致命文法區別",
          explanation: "統測超高頻考點：",
          keyPoints: [
            "Although / Even though / Though 是『連接詞』，後面必須接『完整句子 (S + V)』！",
            "Despite / In spite of 是『介系詞』，後面只能接『名詞 (N) 或動名詞 (V-ing)』，絕不可直接接句子！"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{Although} + S + V, \\quad \\text{Despite / In spite of} + N / V\\text{-ing}",
        meaning: "讓步連接詞與讓步介系詞結構差異",
        unit: "連接詞與介系詞",
        cautions: "Despite 本身就是介系詞，後面絕不可再加 of！只有 In spite of 才有 of！切勿寫 Despite of！",
        latex: "\\text{Although } S + V = \\text{Despite } N; \\quad \\text{However, } S + V"
      },
      tables: [
        {
          title: "常考篇章轉折副詞與連接詞功能分類表",
          headers: ["邏輯關係", "轉折副詞 (副詞+逗點)", "副詞連接詞 (+子句)", "介系詞 (+名詞/V-ing)"],
          rows: [
            ["轉折與讓步", "However, Nevertheless", "Although, Even though", "Despite, In spite of"],
            ["因果與結論", "Therefore, Consequently, As a result", "Because, Since, As", "Because of, Due to, Owing to"],
            ["遞進與補充", "Furthermore, Moreover, In addition", "and", "In addition to, Besides"],
            ["對比與相反", "In contrast, On the other hand", "While, Whereas", "Unlike"]
          ]
        }
      ],
      mustMasterChecklist: [
        "熟記 However 表轉折、Therefore 表因果、Furthermore 表補充",
        "熟背 Although 後接句子 (S+V)，Despite 後接名詞 (N)",
        "切記 Despite 絕不加 of，只有 In spite of"
      ]
    }
  ],
  highFrequencyTraps: [
    {
      title: "【陷阱一】逗點後面選 that",
      trap: "看到逗點後面的關係代名詞空格，考生誤選 that。",
      solution: "法規鐵律：that 前面絕不可有逗點！先行詞是物時在逗點後必定只能選 which！",
      relatedExamConcept: "非限定關係子句"
    },
    {
      title: "【陷阱二】Despite 後面直接接完整句子",
      trap: "看到後面有主詞動詞，考生選 Despite 而非 Although。",
      solution: "Despite 是介系詞，後面只能接名詞！後方有完整句子 (S+V) 必須選連接詞 Although！",
      relatedExamConcept: "讓步語氣詞性"
    }
  ],
  curatedPastQuestions: [
    {
      id: "115-英文-16",
      year: 115,
      questionNo: 16,
      examPaper: "共同科目 英語文",
      stem: "Taipei 101, _______ was once the tallest building in the world, is famous for its tuned mass damper.",
      options: {
        A: "that",
        B: "which",
        C: "where",
        D: "what"
      },
      answer: "B",
      sopSteps: [
        {
          stepNo: 1,
          title: "觀察空格前後標點符號",
          detail: "空格前有逗點 (,)，後方亦有逗點，此為標準非限定關係子句 (補充說明專有名詞 Taipei 101)。"
        },
        {
          stepNo: 2,
          title: "套用 that 禁忌原則",
          detail: "非限定用法中 (逗點後)，絕對不可使用 that，直接排除 (A)。"
        },
        {
          stepNo: 3,
          title: "分析子句角色與先行詞",
          detail: "先行詞 Taipei 101 為建築物 (物)，關係子句缺少主詞 (was once...)，故必須採用主格關係代名詞 which。"
        },
        {
          stepNo: 4,
          title: "結論選答",
          detail: "選 (B)。"
        }
      ],
      examinerTrapNotes: "出題老師專門以 Taipei 101 考驗逗點後不得用 that 的鐵律。",
      quickShortcut: "【秒殺模型：逗點殺 that】先行詞是物，前面有逗點，秒殺排除 that，直接選 which (B)！"
    },
    {
      id: "114-英文-18",
      year: 114,
      questionNo: 18,
      examPaper: "共同科目 英語文",
      stem: "_______ on a hill with a view of the ocean, the villa attracts thousands of tourists every summer.",
      options: {
        A: "Located",
        B: "Locating",
        C: "To locate",
        D: "Locates"
      },
      answer: "A",
      sopSteps: [
        {
          stepNo: 1,
          title: "辨識分詞構句句型",
          detail: "句首以分詞片語開頭，逗點後的主要子句主詞為 the villa (別墅)。"
        },
        {
          stepNo: 2,
          title: "分析主要主詞與動詞關係",
          detail: "別墅不會自己主動座落，而是『被座落 (be located on)』，屬於被動語態。"
        },
        {
          stepNo: 3,
          title: "選用過去分詞 p.p.",
          detail: "被動語態分詞構句省略 being，保留過去分詞 Located。"
        },
        {
          stepNo: 4,
          title: "結論選答",
          detail: "選 (A)。"
        }
      ],
      examinerTrapNotes: "很多考生誤以為別墅存在是主動而選 Locating (B)。記住：be located 永遠是用被動！",
      quickShortcut: "【秒殺模型：座落必被動】be located 必用被動，分詞構句選 Located (A)，2 秒搞定！"
    },
    {
      id: "113-英文-24",
      year: 113,
      questionNo: 24,
      examPaper: "共同科目 英語文",
      stem: "The municipal government decided to build a new transit hub to boost local economy. _______, many environmentalists strongly opposed the construction because of potential damage to wetlands.",
      options: {
        A: "In addition",
        B: "However",
        C: "Therefore",
        D: "For example"
      },
      answer: "B",
      sopSteps: [
        {
          stepNo: 1,
          title: "剖析前句情境與語意方向",
          detail: "前句指『市政府決定興建新轉運樞紐以促進在地經濟』，語氣為積極推動建設 (+)。"
        },
        {
          stepNo: 2,
          title: "剖析後句情境與語意方向",
          detail: "後句指『許多環保人士因為可能破壞濕地而強烈反對施工』，語氣為抗爭反對 (-)。"
        },
        {
          stepNo: 3,
          title: "確立前後句邏輯關係",
          detail: "政府想蓋 vs 環保人士反對，前後句邏輯呈現 180 度正反逆轉，必須使用表『語氣轉折 (Contrast)』之副詞。"
        },
        {
          stepNo: 4,
          title: "檢視選項邏輯功能",
          detail: "(A) In addition (此外) 為順向遞進；(B) However (然而) 為反向轉折；(C) Therefore (因此) 為順向因果；(D) For example (例如) 為舉例說明。"
        },
        {
          stepNo: 5,
          title: "結論選答",
          detail: "精準選 (B)。"
        }
      ],
      examinerTrapNotes: "克漏字每年必考 1~2 題轉折詞。解題絕招是先替前後句打上 (+) 或 (-)，若同號選 Therefore/In addition，若異號必選 However/Nevertheless！",
      quickShortcut: "【秒殺模型：正反符號法】前句蓋樞紐 (+)，後句反對建案 (-)。正負異號直接秒選 However (B)！"
    }
  ],
  preExamChecklist: [
    "我熟記逗點後面絕對不能用 that，只能用 who 或 which",
    "我知道分詞構句主動選 V-ing，被動選 p.p.",
    "我清楚 Although 後接句子 (S+V)，Despite 後接名詞 (N)",
    "我掌握 However (轉折), Therefore (因果), Furthermore (補充) 的用法",
    "我清楚 whose 後面緊接無冠詞名詞表示所有格",
    "我熟練介系詞 + which/whom 的結構（介系詞後絕不用 that）"
  ]
};


// ==========================================
// 英語文 第四學期（高二下至高三衝刺）：進階 4500 字、假設語氣、倒裝句與閱讀素養
// ==========================================
export const englishS4Review = {
  id: "english-s4",
  subjectSlug: "english",
  subjectTitle: "英語文",
  semesterCode: "s4",
  semesterTitle: "第四學期（高二下至高三衝刺）",
  gradeLevel: 11,
  subtitle: "統測高階 4500 單字、假設語氣三大公式、倒裝句與長篇閱讀破題攻略",
  category: "共同科目",
  curriculumScope: "108 課綱技術型高中英語文第四冊與統測總衝刺：假設語氣 (與現在/過去事實相反)、if 省略倒裝、否定倒裝句、克漏字與長篇跨領域閱讀測驗",
  topicSlugs: ["english"],
  examAnalysis: {
    examWeight: "佔統測英語文約 40% ~ 45%（閱讀測驗、克漏字壓軸難題、高分關鍵門檻）",
    coreExamThemes: [
      "與現在事實相反之假設語氣：If + S + 過去式動詞 (be動詞一律用 were), S + would/could/should/might + 原形動詞 (V)！",
      "與過去事實相反之假設語氣：If + S + had + p.p., S + would/could/should/might + have + p.p.！",
      "if 省略之倒裝句型：省略 if 時，將 Were, Had, Should 移到主詞前面倒裝！(e.g. Had I known... = If I had known...)",
      "否定副詞放句首之倒裝：Not only, Seldom, Never, Rarely, Hardly 放句首時，句子採疑問句式倒裝 (否定詞 + 助動詞 + S + V)！",
      "長篇素養閱讀測驗破題 SOP：先讀題目選項抓關鍵字 (Keywords) → 回文定位對應段落 → 比對同義替換詞 (Paraphrasing) → 排除絕對化選項 (always, never)"
    ],
    recentTrends: "近年統測英文長篇閱讀全面導入『建築永續、智慧城市、綠色材料、地震預警』等跨科技專業題組，長度達 350~450 字，考驗學生抓主旨與細節定位速度。",
    targetScoreAdvice: "假設語氣兩大公式背熟即可秒拿 4 分；長篇閱讀先題後文，掌握首尾句主旨，輕鬆斬獲 80 分以上高分。"
  },
  chapters: [
    {
      chapterNo: 1,
      title: "假設語氣 (Subjunctive Mood) 三大核心公式與 if 倒裝",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "與現在事實相反之假設語氣",
          explanation: "假設目前不可能實現的狀況：",
          keyPoints: [
            "公式：If + S + 過去式動詞 (be 動詞不論人稱一律用 were), S + would / could / should / might + 原形動詞 (V)。",
            "例句：If I were an architect, I would design a carbon-neutral skyscraper. (事實上我現在不是建築師)。"
          ]
        },
        {
          heading: "與過去事實相反之假設語氣",
          explanation: "對過去已經發生的事情表達悔恨或假設：",
          keyPoints: [
            "公式：If + S + had + p.p., S + would / could / should / might + have + p.p.！",
            "例句：If the contractor had followed the blueprint, the roof would not have collapsed. (事實上過去未照圖施工，屋頂已崩塌)。"
          ]
        },
        {
          heading: "省略 if 之倒裝句型",
          explanation: "若將 if 省略，必須將助動詞提至主詞前方：",
          keyPoints: [
            "與現在相反省略 if：Were I an architect, I would... (If I were...)",
            "與過去相反省略 if：Had the contractor followed..., the roof... (If the contractor had followed...)"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{現在相反: } \\text{If } S + V_{\\text{past}} (\\text{were}), \\; S + \\text{would/could} + V; \\quad \\text{過去相反: } \\text{If } S + \\text{had } p.p., \\; S + \\text{would have } p.p.",
        meaning: "假設語氣兩大經典核心公式",
        unit: "語氣",
        cautions: "與過去事實相反時，主要子句一定要有『have + p.p.』！不可只寫 would + 原形！",
        latex: "\\text{If } S + \\text{had } p.p. \\iff \\text{Had } S + p.p."
      },
      diagram: {
        title: "假設語氣與事實相反時態倒流模型",
        type: "timeline",
        caption: "假設語氣文法原則為『時態倒退一步』：與現在事實相反退至過去式 (were/would+V)；與過去事實相反退至過去完成式 (had+p.p./would have+p.p.)。",
        asciiArt: `    【事實狀態 (Fact)】                      【假設語氣 (Subjunctive)】
    
    [現在事實 Present Fact]      倒退一步    [與現在相反]
    I am not a rich man.       ─────────►   If I WERE rich,
    I cannot buy this tower.                 I WOULD BUY this tower.
                                             (If S + 過去式, S + would + V)
    
    [過去事實 Past Fact]         倒退一步    [與過去相反]
    He did not study hard.     ─────────►   If he HAD STUDIED hard,
    He failed the exam.                      he WOULD HAVE PASSED.
                                             (If S + had p.p., S + would have p.p.)`,
        labels: [
          { label: "與現在相反", desc: "If 子句動詞用過去式 (be動詞一律用 were)，主要子句用 would/could + 原形V" },
          { label: "與過去相反", desc: "If 子句用 had + p.p.，主要子句用 would/could + have + p.p." },
          { label: "if 省略倒裝", desc: "省略 If 時將 Were 或 Had 提前至主詞前：Had I known... / Were I..." }
        ]
      },
      tables: [
        {
          title: "假設語氣時態降格與對應結構對照表",
          headers: ["假設情境", "If 條件子句動詞形態", "主要子句動詞結構", "if 省略之倒裝句型"],
          rows: [
            ["與現在事實相反", "過去式 (be 一律用 were)", "would / could + 原形 V", "Were + S + ..., S + would + V"],
            ["與過去事實相反", "過去完成式 had + p.p.", "would / could + have + p.p.", "Had + S + p.p., S + would have + p.p."],
            ["與未來相反 (不可實現)", "were to + V 或 should + V", "would / could + 原形 V", "Should + S + V, S + would + V"]
          ]
        }
      ],
      mustMasterChecklist: [
        "熟背與現在相反：If S + were/過去式, S + would + V",
        "熟背與過去相反：If S + had p.p., S + would have p.p.",
        "看到 Had I known... 立刻認出是 If I had known... 的倒裝句型",
        "be 動詞在與現在相反假設中一律用 were，即使主詞是 I, he, she"
      ]
    },
    {
      chapterNo: 2,
      title: "否定倒裝句、分裂強調句與常見特殊句型",
      topicSlug: "english",
      examFrequency: 4,
      coreConcepts: [
        {
          heading: "否定副詞置於句首之倒裝句",
          explanation: "為了加強語氣，將否定或半否定副詞移至句首時，主要子句必須倒裝成疑問句語序：",
          keyPoints: [
            "常考否定副詞：Never (絕不), Seldom (罕見), Rarely (極少), Hardly / Scarcely (幾乎不), Little (幾乎無), Not only (不僅)。",
            "倒裝結構：否定副詞 + 助動詞 / be 動詞 + 主詞 + 動詞！",
            "例句：Never have I seen such an amazing bridge. (原句: I have never seen...)",
            "例句：Not only did the earthquake damage the building, but it also cut off the power."
          ]
        },
        {
          heading: "It is ... that 分裂強調句型",
          explanation: "強調句中某一名詞、時間或地方副詞：It is / was + [被強調部分] + that + [其餘句子]。",
          keyPoints: [
            "檢驗真偽：若將 It is / was 與 that 拿掉，剩下的單字可拼回一個語法正確的完整句子，則為分裂強調句！",
            "例句：It was yesterday that the architect approved the new structure."
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{否定副詞} + \\text{助動詞 (do/did/have/will)} + S + V; \\quad \\text{It is/was } [\\text{強調部分}] \\text{ that } \\dots",
        meaning: "否定倒裝句與分裂強調句公式",
        unit: "特殊句型",
        cautions: "否定副詞倒裝時，若原動詞是現在簡單式一般動詞，需依主詞補出 do / does；過去式補出 did！主動詞必須恢復為原形！",
        latex: "\\text{Seldom / Never / Not only} + \\text{Aux} + S + V"
      },
      tables: [
        {
          title: "否定倒裝句型轉換對照表",
          headers: ["一般正常語序", "置首之否定副詞", "標準倒裝句型", "破題關鍵助動詞"],
          rows: [
            ["He rarely goes to the library.", "Rarely", "Rarely does he go to the library.", "補出 does，動詞恢復原形 go"],
            ["We have never experienced this.", "Never", "Never have we experienced this.", "原句已有助動詞 have，直接往前移"],
            ["She realized the danger only then.", "Only then", "Only then did she realize the danger.", "補出 did，動詞恢復原形 realize"],
            ["They not only designed the facade but also built it.", "Not only", "Not only did they design the facade...", "Not only 置首，第一子句倒裝 did they design"]
          ]
        }
      ],
      mustMasterChecklist: [
        "看到 Never, Seldom, Rarely, Hardly 放句首，後面必定找倒裝句 (助動詞+主詞+動詞)",
        "看到 Not only 放句首，後面緊接 did / does / has + S + V",
        "掌握 It is ... that 強調句，拿掉 It is 與 that 句子依然完整"
      ]
    },
    {
      chapterNo: 3,
      title: "統測長篇素養閱讀測驗破題五步 SOP",
      topicSlug: "english",
      examFrequency: 5,
      coreConcepts: [
        {
          heading: "長篇素養閱讀破題五步 SOP",
          explanation: "統測英文閱讀測驗長達 300~450 字，不可逐字死翻譯，必須使用戰略破題法：",
          keyPoints: [
            "Step 1【先看題幹抓題目關鍵字】：先看後面的 3~4 題題目，圈出專有名詞、年份、因果關鍵詞 (Why, How)。",
            "Step 2【掃描首尾段抓主旨】：閱讀文章第一段（抓核心主題與論點）與最後一段（抓結論與作者態度），80% 的主旨題 (Main Idea) 答案就在首尾段！",
            "Step 3【定位文章細節】：帶著題目關鍵字在正文中進行掃讀 (Scanning)，找到關鍵字出現的句子及前後句。",
            "Step 4【同義替換詞比對 (Paraphrasing)】：統測正確選項絕少與原文單字 100% 一模一樣，通常會進行同義字替換 (例如：build 換成 construct，improve 換成 enhance)。",
            "Step 5【排除極端陷阱選項】：選項中若出現 always (總是), never (從不), only (唯一), completely (完全) 等絕對化字眼，95% 是誘答陷阱！"
          ]
        }
      ],
      formulaCard: {
        formula: "\\text{閱讀破題: 先題後文} \\to \\text{抓首尾句} \\to \\text{定位關鍵字} \\to \\text{比對同義詞} \\to \\text{排除極端字}",
        meaning: "長篇素養閱讀測驗滿分策略五步 SOP",
        unit: "閱讀策略",
        cautions: "切忌從文章第一個字一字一字慢讀到最後一個字，否則後面題目將完全來不及寫！一定要『先看題、後讀文』！",
        latex: "\\text{Keywords} \\to \\text{Scanning} \\to \\text{Paraphrase} \\implies \\text{Correct Answer}"
      },
      tables: [
        {
          title: "統測閱讀測驗四大題型與解題捷徑表",
          headers: ["閱讀測驗題型", "典型題幹問法", "最佳資訊獲取位置", "解題破門技巧"],
          rows: [
            ["主旨大意題", "What is the main purpose / idea of this passage?", "第一段首尾句、最後一段總結句", "概括全文核心，排除過於狹隘或片面的選項"],
            ["細節定位題", "According to the passage, which of the following is true?", "利用題幹專有名詞/數字回文定位", "比對定位句與前後相鄰兩句之同義改寫"],
            ["單字猜義題", "The word 'X' in paragraph 2 is closest in meaning to...", "目標單字所在句與前後邏輯連接詞", "利用 and (同義) 或 but (反義) 推敲單字正負情感"],
            ["推論題", "What can be inferred from the passage?", "文章細節資訊之延伸結論", "答案必須有文章依據支持，切勿憑個人想像過度腦補"]
          ]
        }
      ],
      mustMasterChecklist: [
        "掌握閱讀五步 SOP：先題後文，首尾段抓大意，關鍵字定位，排除極端字",
        "小心選項中過於絕對的單字 (always, completely, only)",
        "明白正確答案通常是原文關鍵字的『同義字改寫 (Paraphrasing)』"
      ]
    }
  ],
  highFrequencyTraps: [
    {
      title: "【陷阱一】與過去事實相反假設誤用 would + 原形",
      trap: "If he had checked the steel bars, the accident _______ (not happen). 考生選 would not happen。",
      solution: "條件句是 had checked (過去完成)，表示與過去事實相反！主要子句必定要用 would have + p.p.！正確為 would not have happened！",
      relatedExamConcept: "假設語氣與過去相反"
    },
    {
      title: "【陷阱二】否定倒裝句忘記將動詞恢復為原形",
      trap: "Seldom did he _______ (goes / went / go). 考生選 went 或 goes。",
      solution: "助動詞 did 已經借走了過去式！後方的一般動詞必須無條件恢復為『原形動詞 (go)』！",
      relatedExamConcept: "否定副詞倒裝"
    }
  ],
  curatedPastQuestions: [
    {
      id: "115-英文-24",
      year: 115,
      questionNo: 24,
      examPaper: "共同科目 英語文",
      stem: "If the contractor _______ high-performance concrete, the building would have resisted the chemical erosion much better.",
      options: {
        A: "uses",
        B: "used",
        C: "has used",
        D: "had used"
      },
      answer: "D",
      sopSteps: [
        {
          stepNo: 1,
          title: "觀察主要子句動詞結構",
          detail: "主要子句動詞為『would have resisted (would have + p.p.)』，此為標準『與過去事實相反』的假設語氣主要子句結構。"
        },
        {
          stepNo: 2,
          title: "推導 If 條件子句應有時態",
          detail: "根據假設語氣公式：與過去事實相反時，If 條件子句必須使用『過去完成式 had + p.p.』。"
        },
        {
          stepNo: 3,
          title: "比對選項",
          detail: "had used 符合 had + p.p. 結構。"
        },
        {
          stepNo: 4,
          title: "結論選答",
          detail: "選 (D)。"
        }
      ],
      examinerTrapNotes: "很多考生看到 would 就選過去式 used (B)，忽視了後面還有 have resisted！",
      quickShortcut: "【秒殺模型：假設語氣配對】後有 would have p.p.，前必配 had p.p.！直接秒殺 (D)！"
    },
    {
      id: "114-英文-22",
      year: 114,
      questionNo: 22,
      examPaper: "共同科目 英語文",
      stem: "Seldom _______ such severe damage to modern buildings during moderate earthquakes.",
      options: {
        A: "we see",
        B: "we have seen",
        C: "do we see",
        D: "did we saw"
      },
      answer: "C",
      sopSteps: [
        {
          stepNo: 1,
          title: "辨識句首詞性與句型",
          detail: "句首為否定副詞 Seldom (極少/罕見)，觸發倒裝句規則：否定副詞 + 助動詞 + 主詞 + 動詞原形。"
        },
        {
          stepNo: 2,
          title: "排除未倒裝選項",
          detail: "選項 (A) we see 與 (B) we have seen 皆為正常語序未倒裝，直接排除。"
        },
        {
          stepNo: 3,
          title: "檢驗選項 (C) 與 (D)",
          detail: "選項 (D) 助動詞 did 後方動詞誤用過去式 saw，違規；選項 (C) do we see 具備正確助動詞 do 與原形動詞 see，符合常態陳述。"
        },
        {
          stepNo: 4,
          title: "結論選答",
          detail: "選 (C)。"
        }
      ],
      examinerTrapNotes: "標準否定倒裝句型考題，只要辨識 Seldom 置首需倒裝即可秒殺。",
      quickShortcut: "【秒殺模型：否定置首即倒裝】Seldom 置首，尋找『助動詞 + 主詞 + 原形動詞』結構，秒選 do we see (C)！"
    }
  ],
  preExamChecklist: [
    "我熟背假設語氣兩大公式：與現在相反 would+V，與過去相反 would have+p.p.",
    "我知道 If S + had p.p. 可倒裝為 Had S + p.p.",
    "我熟記 Never, Seldom, Rarely 放句首必定倒裝 (助動詞+S+V)",
    "閱讀測驗我能貫徹五步 SOP：先題後文，首尾段抓主旨，排除極端絕對化選項"
  ]
};


export const archSemesters = [
  englishS1Review,
  englishS2Review,
  englishS3Review,
  englishS4Review
];
