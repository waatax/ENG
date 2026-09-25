// arch_prerequisites.mjs - Arch 專案 5 大英文先修核心主題互動數據館

// 1. 基本時態與被動語態 (Basic Tenses & Passive)
export const archTenseModules = [
    {
      id: 0,
      nameZh: '現在簡單式',
      nameEn: 'Present Simple',
      badge: '常態・真理・日常習慣',
      formula: 'S + V / V-(s/es)',
      color: 'from-blue-500 to-indigo-600',
      border: 'border-blue-300 dark:border-blue-800',
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      description: '描述客觀事實、科學真理、不變的定律以及日常反覆發生的習慣動作。',
      rules: [
        { title: '主詞為第三人稱單數 (he, she, it, the worker)', desc: '動詞字尾必須加 -s 或 -es (play -> plays, watch -> watches, study -> studies)。' },
        { title: '主詞為 I, you, we, they 或複數名詞', desc: '動詞直接使用原形動詞 (build, inspect, measure)。' },
        { title: '否定與疑問', desc: '藉由助動詞 do/does 協助，後方動詞回歸原形 (He does not know. / Do they work here?)。' }
      ],
      timeSignals: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'once a week', 'on Mondays'],
      examples: [
        { en: 'Concrete hardens after water is added.', zh: '混凝土在加水後會硬化。（客觀科學事實）', highlight: 'hardens (三單動詞)' },
        { en: 'The architect visits the construction site every Tuesday.', zh: '建築師每週二都會巡視工地。（反覆習慣）', highlight: 'visits / every Tuesday' }
      ],
      proTip: '統測高頻題：看到真理定理（如太陽升起、水結冰、材料特性）一律用「現在簡單式」！'
    },
    {
      id: 1,
      nameZh: '現在進行式',
      nameEn: 'Present Continuous',
      badge: '當下此時此刻・正在發生',
      formula: 'S + am / is / are + V-ing',
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-300 dark:border-emerald-800',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      description: '描述此時此刻正在進行的動作，或是現階段正在持續中的短期狀態。',
      rules: [
        { title: '動詞 -ing 變化規則', desc: '一般動詞直接 +ing；字尾有不發音 e 則去 e + ing (make -> making)；短母音+單子音則重複字尾 (run -> running)。' },
        { title: 'be 動詞與主詞呼應', desc: 'I am / He is / She is / It is / We are / They are + V-ing。' },
        { title: '狀態動詞通常不用進行式', desc: '表示心理、知覺或擁有的動詞 (know, love, believe, have 有) 通常只用簡單式。' }
      ],
      timeSignals: ['now', 'right now', 'at the moment', 'Look!', 'Listen!', 'currently', 'these days'],
      examples: [
        { en: 'Look! The crane is lifting the heavy steel girder.', zh: '看！起重機正在吊起沉重的鋼樑。', highlight: 'is lifting (現在進行式)' },
        { en: 'The workers are wearing safety helmets right now.', zh: '工人們現在都正戴著安全帽。', highlight: 'are wearing / right now' }
      ],
      proTip: '統測秘訣：句首若出現「Look!」或「Listen!」等感嘆提示詞，空格 99% 選現在進行式！'
    },
    {
      id: 2,
      nameZh: '過去簡單式',
      nameEn: 'Past Simple',
      badge: '過去特定時間・已結束動作',
      formula: 'S + V-ed / 不規則過去式',
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-300 dark:border-amber-800',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      description: '描述在過去特定時間點發生的動作或存在的狀態，該動作在過去已經完全結束。',
      rules: [
        { title: '規則動詞變化', desc: '一般動詞加 -ed (walk -> walked)；字尾為 e 加 -d (use -> used)；子音+y 變 -ied (study -> studied)。' },
        { title: '不規則動詞變化', desc: '須熟練記憶：build -> built, buy -> bought, see -> saw, write -> wrote, put -> put。' },
        { title: '否定與疑問助動詞', desc: '過去式統一使用 did / didn\'t，後方動詞務必還原為「原形動詞」！' }
      ],
      timeSignals: ['yesterday', 'last night / week / month / year', 'two hours ago', 'in 2018', 'just now (剛才)', 'then'],
      examples: [
        { en: 'The survey team finished the topographic map yesterday.', zh: '測量團隊昨天完成了地形圖。', highlight: 'finished / yesterday' },
        { en: 'The structural engineer did not approve the change.', zh: '結構工程師當時並沒有核准該項變更。', highlight: 'did not approve' }
      ],
      proTip: '統測陷阱：看到明確的過去時間副詞（如 yesterday, in 1999），絕對不能用現在完成式 (have/has p.p.)，只能用「過去簡單式」！'
    },
    {
      id: 3,
      nameZh: '未來式',
      nameEn: 'Future Tense',
      badge: '將要發生・計畫與預測',
      formula: 'will + 原形動詞 / be going to + 原形動詞',
      color: 'from-purple-500 to-violet-600',
      border: 'border-purple-300 dark:border-purple-800',
      bg: 'bg-purple-50/50 dark:bg-purple-950/20',
      description: '描述未來即將發生的事件、個人的意圖承諾，或基於現有跡象的客觀預測。',
      rules: [
        { title: 'will + 原形動詞 (V)', desc: '常用於臨時決定、純粹預測或承諾：I will call the supplier now.（我現在來打給供應商。）' },
        { title: 'be going to + 原形動詞 (V)', desc: '常用於事先規劃好的計畫，或已有明顯客觀跡象即將發生：Look at the sky; it is going to rain.' },
        { title: '時間副詞子句現在代未來', desc: '在 when, before, after, if 引導的時間與條件子句中，用「現在式」代替「未來式」！' }
      ],
      timeSignals: ['tomorrow', 'next week / month / year', 'soon', 'in three days', 'the day after tomorrow', 'in the future'],
      examples: [
        { en: 'The new suspension bridge will open to traffic next year.', zh: '這座新的懸索吊橋將於明年通車。', highlight: 'will open / next year' },
        { en: 'The project manager is going to hold a safety meeting tomorrow.', zh: '專案經理明天打算召開工安會議。', highlight: 'is going to hold' }
      ],
      proTip: '統測必考：「If it rains tomorrow, we will stop working.」條件子句用 rains（現在式），主要子句才用 will stop！'
    },
    {
      id: 4,
      nameZh: '現在完成式',
      nameEn: 'Present Perfect',
      badge: '經驗・持續・已完成',
      formula: 'S + have / has + 過去分詞 (p.p.)',
      color: 'from-rose-500 to-red-600',
      border: 'border-rose-300 dark:border-rose-800',
      bg: 'bg-rose-50/50 dark:bg-rose-950/20',
      description: '連接過去與現在的時態！表示從過去某時開始一直持續到現在的動作、過去已完成並對現在有影響的事，或過去的人生經驗。',
      rules: [
        { title: '三大典型核心情境', desc: '1. 持續 (Duration): 動作延續至今；2. 經驗 (Experience): 去過/做過；3. 完成 (Completion): 剛好完工。' },
        { title: '主詞搭配 have vs has', desc: '三單主詞 (he/she/it) 用 has + p.p.；其餘 (I/you/we/they) 用 have + p.p.。' },
        { title: 'since 與 for 黃金公式', desc: 'since + 過去時間點 (since 2015, since last year)；for + 一段時間 (for 10 years, for 3 hours)。' }
      ],
      timeSignals: ['since 2010', 'for three years', 'already (已經)', 'yet (尚未)', 'ever (曾經)', 'never (從不)', 'recently (最近)'],
      examples: [
        { en: 'The contractor has worked on this highway for five years.', zh: '該承包商在這條公路上施工已經五年了。（持續至今）', highlight: 'has worked / for five years' },
        { en: 'I have already inspected the foundation piles.', zh: '我已經檢查過基礎打樁了。（已完成）', highlight: 'have already inspected' }
      ],
      proTip: '統測口訣：看到 since 或 for + 一段時間，高達 95% 正解就是「現在完成式 (have/has p.p.)」！'
    },
    {
      id: 5,
      nameZh: '基本被動語態',
      nameEn: 'Basic Passive Voice',
      badge: '動作承受者為主詞・客觀正式',
      formula: 'S (承受者) + be 動詞 + 過去分詞 (p.p.) (+ by 動作發出者)',
      color: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-300 dark:border-cyan-800',
      bg: 'bg-cyan-50/50 dark:bg-cyan-950/20',
      description: '當動作的「承受者」比「執行者」更重要，或者執行者未知/顯而易見時使用。在工程報告、科學論文與法律規範中是壓倒性的主要句式！',
      rules: [
        { title: '主動轉被動三步法', desc: '1. 受詞移至句首當主詞；2. 動詞變為 be + p.p.（be 動詞依時態與主詞人稱變化）；3. 原主詞移至句尾加 by。' },
        { title: '時態與 be 動詞對照表', desc: '現在被動：is/am/are + p.p.；過去被動：was/were + p.p.；未來被動：will be + p.p.；完成被動：have/has been + p.p.。' },
        { title: '不及物動詞無被動語態', desc: 'happen（發生）, occur（發生）, appear（出現）, die（死亡）不能接受詞，絕不能改為被動！' }
      ],
      timeSignals: ['by + 執行者 (如 by the workers)', '受到... (受物當主詞)'],
      examples: [
        { en: 'The landmark tower was designed by a famous Taiwanese architect.', zh: '這棟地標大樓是由一位台灣著名建築師所設計的。（過去被動）', highlight: 'was designed by' },
        { en: 'Safety helmets must be worn at all times.', zh: '工地上隨時都必須配戴安全帽。（情態助動詞被動：must be worn）', highlight: 'must be worn' }
      ],
      proTip: '統測秒殺：主詞若是「物品、建築物、計畫、橋樑」，它本身不會主動做動作，90% 都要用「被動語態 (be + p.p.)」！'
    }
  ];
export const archTenseTraps = [
    {
      title: '陷阱 1：現在簡單式第三人稱單數漏加 -s/-es',
      wrong: 'The site supervisor inspect the equipment every morning.',
      correct: 'The site supervisor inspects the equipment every morning.',
      reason: '主詞 The site supervisor 是第三人稱單數（相當於 he/she），現在簡單式動詞必須加 -s！'
    },
    {
      title: '陷阱 2：現在完成式誤用特定過去時間副詞',
      wrong: 'The engineer has completed the blueprint yesterday.',
      correct: 'The engineer completed the blueprint yesterday. (或 The engineer has completed the blueprint already.)',
      reason: 'yesterday, last night, two days ago 是「過去特定時間點」，必須搭配過去簡單式 (completed)，絕對不能用現在完成式 (has completed)！'
    },
    {
      title: '陷阱 3：被動語態 be 動詞單複數或時態搞錯',
      wrong: 'The damaged steel girders was replaced by the crew.',
      correct: 'The damaged steel girders were replaced by the crew.',
      reason: '主詞 steel girders 是複數名詞，過去式 be 動詞必須使用 were，不可用 was！'
    },
    {
      title: '陷阱 4：不及物動詞（發生/出現）誤用被動語態',
      wrong: 'A severe earthquake was occurred in 1999.',
      correct: 'A severe earthquake occurred in 1999.',
      reason: 'occur, happen, appear 是不及物動詞，本身就表示「發生」，沒有受詞，因此在英文中絕對沒有被動語態！'
    },
    {
      title: '陷阱 5：since 與 for 的時間介系詞混淆',
      wrong: 'We have lived here since three years. / We have lived here for 2018.',
      correct: 'We have lived here for three years. / We have lived here since 2018.',
      reason: 'for 後方接「一段時間長度」（three years, two months）；since 後方接「過去的時間起點」（2018, last week, yesterday）。'
    }
  ];
export const archTenseQuiz = [
    {
      question: 'Water _____ at 100 degrees Celsius under standard atmospheric pressure.',
      options: ['boil', 'boils', 'is boiling', 'has boiled'],
      answer: 1,
      explanation: '此處描述客觀的物理科學真理（水在標準氣壓下攝氏 100 度沸騰），必須使用「現在簡單式」。且 Water 為不可數名詞視為三單，動詞需加 -s，故選 boils。'
    },
    {
      question: 'Look at the construction team! They _____ the new foundation piles right now.',
      options: ['drove', 'are driving', 'have driven', 'drive'],
      answer: 1,
      explanation: '句首有感嘆提示詞 Look! 且句尾有 right now（現在正），代表此時此刻動作正在進行，必須使用現在進行式 (are driving)。'
    },
    {
      question: 'The famous suspension bridge _____ by a severe typhoon three years ago.',
      options: ['damaged', 'was damaged', 'is damaged', 'has damaged'],
      answer: 1,
      explanation: '看到 three years ago 為過去特定時間點，且橋樑是「被颱風損壞」（被動承受者），故須使用過去簡單被動語態 (was damaged)。'
    },
    {
      question: 'The senior engineer _____ on this high-speed rail project since 2021.',
      options: ['works', 'has worked', 'worked', 'is working'],
      answer: 1,
      explanation: '題目中有「since + 過去時間點 (since 2021)」，表示動作從 2021 年持續至今，標準標配時態為「現在完成式 (has worked)」。'
    },
    {
      question: 'A terrible landslide _____ on the mountain highway last night.',
      options: ['was happened', 'happened', 'has happened', 'happening'],
      answer: 1,
      explanation: 'happen 是不及物動詞，絕對不可使用被動語態 (was happened 為錯誤用法)；且有過去時間副詞 last night，故選過去簡單式 happened。'
    },
    {
      question: 'All safety regulations must _____ strictly by every worker on the site.',
      options: ['follow', 'followed', 'be followed', 'following'],
      answer: 2,
      explanation: '主詞 All safety regulations（所有工安規定）是被遵守的對象。情態助動詞 (must) 的被動語態公式為「must + be + p.p.」，故選 be followed。'
    }
  ];

// 2. 複合句與連接詞 (Complex Sentences & Clauses)
export const archSentencePillars = [
    {
      id: 0,
      nameZh: '對等連接詞 (FANBOYS 基礎)',
      nameEn: 'Coordinating Conjunctions',
      badge: '天平兩端・地位同等',
      formula: 'Clause 1, [and / but / or / so] Clause 2',
      color: 'from-blue-500 to-indigo-600',
      border: 'border-blue-300 dark:border-blue-800',
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      description: '連接詞性相同、文法地位平等的兩個單字、片語，或用逗號連接兩個各自獨立的完整子句。',
      rules: [
        { title: 'and (並列遞進、而且)', desc: '連接語義方向相同的內容：The steel is strong and durable.（鋼材堅固且耐久。）' },
        { title: 'but (對比轉折、但是)', desc: '連接語意相反或出乎意料的內容：The task was difficult, but the crew finished on time.（任務很艱鉅，但團隊按時完工。）' },
        { title: 'or (選擇、或者 / 否則)', desc: '提供選項：Do you want concrete or brick?；祈使句後代表「否則」：Wear your helmet, or you will get hurt.' },
        { title: 'so (因果推論、所以)', desc: '前因後果：The rain was heavy, so we stopped welding.（雨下得很大，所以我們停止焊接。）' }
      ],
      punctuationRule: '標點原則：連接兩個完整子句 (S+V) 時，對等連接詞前面務必加上「逗號 (,)」；連接兩個單字時不加逗號。',
      examples: [
        { en: 'The architect drew the sketch, and the engineer calculated the load.', zh: '建築師畫出了草圖，而工程師計算了載重。', highlight: ', and (連接兩子句)' },
        { en: 'Study hard, or you will fail the certification exam.', zh: '認真讀書，否則你專業證照考試會不及格。', highlight: 'or (祈使句後表示否則)' }
      ],
      proTip: '統測高頻句型：「祈使句 + and, S + will + V」代表「只要...就...」；「祈使句 + or, S + will + V」代表「...否則...」！'
    },
    {
      id: 1,
      nameZh: '副詞子句從屬連接詞',
      nameEn: 'Adverbial Clauses',
      badge: '主客分明・補充條件背景',
      formula: '[Because / When / If / Although] Sub-Clause, Main Clause',
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-300 dark:border-emerald-800',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      description: '由從屬連接詞引導，用來補充說明主要子句發生的「時間、原因、條件、讓步」背景。從屬子句不能單獨成為完整句子！',
      rules: [
        { title: '時間子句 (when, while, before, after, until, as soon as)', desc: '重要法則：時間副詞子句中一律「用現在式代替未來式」！例如：When the boss arrives tomorrow (不用 will arrive)。' },
        { title: '原因子句 (because, since, as)', desc: '致命禁忌：because (因為) 與 so (所以) 絕不能在同一個句子裡重複出現！只能二擇一。' },
        { title: '讓步子句 (although, though)', desc: '致命禁忌：although (雖然) 與 but (但是) 絕不能在同一個句子裡重複出現！只能二擇一。' },
        { title: '條件子句 (if, unless 除非)', desc: '重要法則：條件副詞子句中一律「用現在式代替未來式」！例如：If it rains tomorrow, we will stay indoors.' }
      ],
      punctuationRule: '標點原則：從屬副詞子句若放在「句首」，後方必須加逗號隔開；若放在「句尾」，前方通常不加逗號。',
      examples: [
        { en: 'Because the soil was unstable, the team reinforced the retaining wall.', zh: '因為土壤不穩定，團隊加固了擋土牆。（放在句首加逗號）', highlight: 'Because / , (不可加 so)' },
        { en: 'Although the crane is expensive, it saves enormous labor time.', zh: '雖然起重機很昂貴，但它節省了巨大的工時。（不可加 but）', highlight: 'Although / , (不可加 but)' }
      ],
      proTip: '統測秒殺法則：看到 Because 開頭，句中若有 so 一律是扣分錯字！看到 Although 開頭，句中若有 but 也一律是錯字！'
    },
    {
      id: 2,
      nameZh: '名詞子句 (that 引導)',
      nameEn: 'Noun Clauses with that',
      badge: '打包整個事實・當受詞主詞',
      formula: 'S + Verb + (that) + Complete Clause [S + V + O]',
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-300 dark:border-amber-800',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      description: '將一個「主謂受完整」的句子前面加上 that，把整個事件打包當作名詞，常放在及物動詞後面充當「受詞」！',
      rules: [
        { title: 'that 後接完整子句', desc: 'that 本身無實質中文意思，僅作連接功能，其後方的子句主詞、動詞、受詞必須完全齊全。' },
        { title: '常見接 that 子句之及物動詞', desc: 'think（認為）, know（知道）, believe（相信）, say（說）, hope（希望）, notice（注意到）, agree（同意）。' },
        { title: 'that 可自由省略之規則', desc: '當 that 引導的名詞子句充當動詞的受詞時，that 通常可以自由省略不寫！' }
      ],
      punctuationRule: '標點原則：名詞子句緊接在主要動詞之後，中間絕對不可以加逗號！',
      examples: [
        { en: 'The project manager thinks (that) we will finish the foundation on time.', zh: '專案經理認為我們能如期完成地基工程。', highlight: 'thinks (that) + 完整子句' },
        { en: 'All workers know that wearing a harness prevents fatal falls.', zh: '所有工人都知道配戴安全帶能預防致命墜落。', highlight: 'know that + 完整子句' }
      ],
      proTip: '統測秘訣：看到動詞後面直接接 that，後面必然是一個完整的五大句型結構；that 前面若不是動詞而是名詞，那就是形容詞關係子句！'
    },
    {
      id: 3,
      nameZh: '關係代名詞初階 (形容詞子句)',
      nameEn: 'Relative Pronouns (Basics)',
      badge: '名詞的專屬標籤・兩句合一',
      formula: 'Antecedent (先行詞) + [who / which / that] + Clause',
      color: 'from-purple-500 to-violet-600',
      border: 'border-purple-300 dark:border-purple-800',
      bg: 'bg-purple-50/50 dark:bg-purple-950/20',
      description: '用來修飾前方特定名詞（先行詞）的子句。關係代名詞兼具「代名詞」與「連接詞」雙重身分，是高中長句閱讀的基石！',
      rules: [
        { title: '先行詞指「人」', desc: '關係代名詞使用 who（主格）或 that。例如：The engineer who inspects the site is my mentor.' },
        { title: '先行詞指「事物、動物」', desc: '關係代名詞使用 which 或 that。例如：The tool which is on the workbench is an electric drill.' },
        { title: '兩句合一 3 步驟', desc: '1. 找出兩句相同名詞；2. 將第二句名詞換為 who/which/that；3. 將關係子句緊貼在先行詞後面。' }
      ],
      punctuationRule: '國中限定用法：關係代名詞前不加逗號，用來明確指定「是哪一個人或哪一個物品」。',
      examples: [
        { en: 'The surveyor who is holding the prism pole is highly experienced.', zh: '那位正拿著稜鏡桿的測量員經驗非常豐富。', highlight: 'surveyor who (先行詞指人)' },
        { en: 'We use steel that can resist seismic shock.', zh: '我們使用能夠抵禦地震震動的鋼材。', highlight: 'steel that (先行詞指物)' }
      ],
      proTip: '國中昇技高黃金鐵律：先行詞是人絕不可選 which！先行詞是物絕不可選 who！that 則是人事物皆通用的安全牌。'
    }
  ];
export const archSentenceTraps = [
    {
      title: '陷阱 1：因為...所以... (Because... so...) 雙重連接詞扣分地雷',
      wrong: 'Because the typhoon was approaching, so the site manager suspended all crane operations.',
      correct: 'Because the typhoon was approaching, the site manager suspended all crane operations. (或 The typhoon was approaching, so the site manager suspended all crane operations.)',
      reason: '中文常說「因為...所以...」，但在英文中 because 與 so 都是連接詞，一個句子連接兩個子句只能用「一個」連接詞！'
    },
    {
      title: '陷阱 2：雖然...但是... (Although... but...) 雙重連接詞扣分地雷',
      wrong: 'Although the reinforced concrete is very heavy, but it provides superior stability.',
      correct: 'Although the reinforced concrete is very heavy, it provides superior stability. (或 The reinforced concrete is very heavy, but it provides superior stability.)',
      reason: '與 because... so... 完全相同，although 與 but 絕對不能在同一句中並存！'
    },
    {
      title: '陷阱 3：時間與條件副詞子句誤用未來式 (will)',
      wrong: 'When the concrete mixer will arrive tomorrow, we will begin the casting.',
      correct: 'When the concrete mixer arrives tomorrow, we will begin the casting.',
      reason: '在 when, before, after, if 引導的時間與條件副詞子句中，必須「用現在簡單式 (arrives) 代替未來式」！只有主要子句才用 will begin。'
    },
    {
      title: '陷阱 4：because (連接詞) 與 because of (介系詞) 混淆',
      wrong: 'We halted the survey because of the rain was too heavy.',
      correct: 'We halted the survey because the rain was too heavy. (或 We halted the survey because of the heavy rain.)',
      reason: 'because 是「連接詞」，後面必須接完整子句 (S + V)；because of 是「介系詞片語」，後面只能接「名詞或名詞片語」！'
    },
    {
      title: '陷阱 5：先行詞為人，關代誤用 which',
      wrong: 'The welder which repaired the steel truss won the safety badge.',
      correct: 'The welder who (或 that) repaired the steel truss won the safety badge.',
      reason: 'welder（電焊工）是人，關係代名詞必須用 who 或 that，絕對不能使用指涉物品的 which！'
    }
  ];
export const archSentenceQuiz = [
    {
      question: '_____ the weather was stormy and cold, the crew managed to finish the inspection on time.',
      options: ['Although', 'Because of', 'Despite of', 'So'],
      answer: 0,
      explanation: '後方為完整子句「the weather was stormy and cold (天氣暴風雨且寒冷)」與「如期完成檢驗」形成轉折對比，故需選表示「雖然」的從屬連接詞 Although。注意：主要子句沒有 but，用法完全正確。'
    },
    {
      question: 'If the supplier _____ the steel bars tomorrow, we will begin assembling the cage.',
      options: ['delivers', 'will deliver', 'delivered', 'is delivering'],
      answer: 0,
      explanation: '在 if 引導的條件副詞子句中，即使有明日時間提示詞 tomorrow，也必須「用現在簡單式代替未來式」，主詞 the supplier 為三單，故選 delivers。'
    },
    {
      question: 'The construction project was temporarily suspended _____ the sudden torrential rain.',
      options: ['because', 'because of', 'although', 'since'],
      answer: 1,
      explanation: '空格後方「the sudden torrential rain (突如其來的暴雨)」是一個名詞片語，並沒有動詞。表示原因且後接名詞片語，必須選擇介系詞 because of。'
    },
    {
      question: 'Put on your safety helmet and goggles, _____ you may get injured on the site.',
      options: ['and', 'or', 'so', 'but'],
      answer: 1,
      explanation: '這是「祈使句 + or + S + will/may + V」句型，or 在此代表「否則（不然的話）」。句意：戴上你的安全帽與護目鏡，否則你在工地上可能會受傷。'
    },
    {
      question: 'The structural engineer _____ inspected the bridge foundation certified its safety.',
      options: ['which', 'who', 'whom', 'whose'],
      answer: 1,
      explanation: '先行詞 The structural engineer（結構工程師）是人，且在關係子句中擔任動詞 inspected 的主詞（主格），因此應選關係代名詞 who。'
    },
    {
      question: 'All the apprentice architects believe _____ 3D BIM modeling will replace traditional 2D drawings.',
      options: ['what', 'which', 'that', 'where'],
      answer: 2,
      explanation: '動詞 believe 後方接一個主謂受完整的名詞子句當作直接受詞，引導詞應使用 that（在口語中常可省略）。what 需引導不完整子句，故不能選。'
    }
  ];

// 3. 八大詞性與字尾衍生 (Parts of Speech)
export const archPartsOfSpeech = [
    {
      id: 0,
      nameZh: '名詞',
      nameEn: 'Noun (n.)',
      badge: '人、事、時、地、物',
      color: 'from-blue-500 to-indigo-600',
      border: 'border-blue-300 dark:border-blue-800',
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      role: '句子的核心磚塊。可以當句子的「主詞（S）」或「受詞（O）」！',
      analogy: '【演員角色】扮演故事裡的人物或道具',
      types: [
        { title: '可數名詞 (Countable)', desc: '單數加 a/an，複數加 s/es。例如：a book, two pens, three engineers.' },
        { title: '不可數名詞 (Uncountable)', desc: '不能數、無複數，不加 a/an。例如：water, wood, safety, information, concrete.' }
      ],
      examples: [
        { en: 'The architect designs modern houses.', zh: '建築師設計現代房屋。', highlight: 'architect / houses (名詞)' },
        { en: 'Safety is the most important rule on a construction site.', zh: '安全是工地上最重要的規則。', highlight: 'Safety / rule / site (名詞)' }
      ],
      testTip: '統測秘訣：前面有 a / an / the、所有格 (my/our)、或介系詞 (in/at/for) 後面，通常要選「名詞」！'
    },
    {
      id: 1,
      nameZh: '動詞',
      nameEn: 'Verb (v.)',
      badge: '動作、狀態、靈魂核心',
      color: 'from-rose-500 to-red-600',
      border: 'border-rose-300 dark:border-rose-800',
      bg: 'bg-rose-50/50 dark:bg-rose-950/20',
      role: '句子的引擎心臟！沒有動詞就不能構成完整句子。',
      analogy: '【引擎動力】推動整台句子列車前進',
      types: [
        { title: '一般動詞 / 行為動詞', desc: '表達具體動作：build（建造）, measure（測量）, calculate（計算）, draw（繪製）。' },
        { title: 'be 動詞與連綴動詞', desc: '表達狀態或特徵：is/am/are/was/were；look（看起來）, seem（似乎）, feel（感覺）。' },
        { title: '及物 [T] vs 不及物 [I]', desc: '及物動詞後面必須接「受詞名詞」；不及物動詞後面通常直接句號或接「介系詞」。' }
      ],
      examples: [
        { en: 'Workers build the bridge with steel and concrete.', zh: '工人們用鋼筋和混凝土建造橋樑。', highlight: 'build (及物動詞)' },
        { en: 'The structure looks extremely solid.', zh: '這棟結構體看起來非常堅固。', highlight: 'looks (連綴動詞)' }
      ],
      testTip: '統測秘訣：助動詞 (can, will, must, should) 後面一定接「原形動詞」；第三人稱單數現在式記得加 s！'
    },
    {
      id: 2,
      nameZh: '形容詞',
      nameEn: 'Adjective (adj. / a.)',
      badge: '名詞的化妝師與修飾者',
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-300 dark:border-amber-800',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      role: '專門用來修飾「名詞」或「代名詞」，說明其顏色、尺寸、特徵、狀態。',
      analogy: '【服裝化妝師】為名詞穿上漂亮的衣服與色彩',
      types: [
        { title: '位置 1：名詞正前方', desc: 'an accurate measurement（精準的測量）, durable materials（耐久材料）。' },
        { title: '位置 2：be動詞 / 連綴動詞之後', desc: 'The steel is strong.（鋼材很強韌。） / The design looks modern.（設計看起來很摩登。）' }
      ],
      examples: [
        { en: 'We need accurate data before starting the foundation work.', zh: '在開始地基工程之前，我們需要精準的數據。', highlight: 'accurate (修飾名詞 data)' },
        { en: 'This helmet is durable and protective.', zh: '這頂安全帽既耐用又具防護性。', highlight: 'durable / protective (在 is 後作補語)' }
      ],
      testTip: '統測秘訣：克漏字看到 be 動詞 (is, are) 或 look, sound, smell 後面有空格，通常選「形容詞」！'
    },
    {
      id: 3,
      nameZh: '副詞',
      nameEn: 'Adverb (adv.)',
      badge: '動詞、形容詞與全句的加速器',
      color: 'from-emerald-500 to-teal-600',
      border: 'border-emerald-300 dark:border-emerald-800',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      role: '修飾「動詞」、「形容詞」、「另一個副詞」或「整個句子」。絕不能直接修飾名詞！',
      analogy: '【增強外掛】加強威力、說明時間、地點或方式',
      types: [
        { title: '情態副詞 (通常是 adj + ly)', desc: 'carefully（小心地）, quickly（迅速地）, precisely（精準地）。' },
        { title: '程度副詞', desc: 'very（非常）, extremely（極度地）, quite（相當地）。' },
        { title: '頻率副詞', desc: 'always（總是）, usually（通常）, often（經常）, never（從不）。' }
      ],
      examples: [
        { en: 'The surveyor measured the land carefully.', zh: '測量員仔細地測量了這塊土地。', highlight: 'carefully (修飾動詞 measured)' },
        { en: 'The test results were extremely accurate.', zh: '測試結果極度精準。', highlight: 'extremely (修飾形容詞 accurate)' }
      ],
      testTip: '統測秘訣：當一個句子「主詞、動詞、受詞都齊全」時，空格刪掉也不影響文法，這空格 90% 填「副詞」！'
    },
    {
      id: 4,
      nameZh: '代名詞',
      nameEn: 'Pronoun (pron.)',
      badge: '懶人救星，代替重複名詞',
      color: 'from-purple-500 to-violet-600',
      border: 'border-purple-300 dark:border-purple-800',
      bg: 'bg-purple-50/50 dark:bg-purple-950/20',
      role: '避免一直重複念同一個名詞，讓語言更簡潔乾淨。',
      analogy: '【替身演員】正牌名詞退場時，代名詞上場扛住句子',
      types: [
        { title: '人稱代名詞格位', desc: '主格 (I, he, they) 放動詞前；受格 (me, him, them) 放動詞或介系詞後。' },
        { title: '所有格代名詞', desc: 'mine（我的東西）, yours（你的東西）, theirs（他們的東西）。' },
        { title: '不定代名詞', desc: 'someone, everyone, nothing, each, both, all。' }
      ],
      examples: [
        { en: 'Tom is an engineer. He checks the beam every day.', zh: '湯姆是工程師。他每天檢查橫樑。', highlight: 'He 代替前面出現過的 Tom' },
        { en: 'These blueprints are yours, and those are mine.', zh: '這些藍圖是你的，而那些是我的。', highlight: 'yours / mine (所有格代名詞)' }
      ],
      testTip: '統測秘訣：介系詞後面一定要接「受格」（例：with him, for us, between you and me）！'
    },
    {
      id: 5,
      nameZh: '介系詞',
      nameEn: 'Preposition (prep.)',
      badge: '空間、時間與邏輯的黏著橋樑',
      color: 'from-cyan-500 to-sky-600',
      border: 'border-cyan-300 dark:border-cyan-800',
      bg: 'bg-cyan-50/50 dark:bg-cyan-950/20',
      role: '表示名詞在時間、空間或關係上的位置。介系詞後面絕對不能單獨存在，後面一定要跟「名詞」或「V-ing」！',
      analogy: '【定位雷達】標示在上方、裡面、時間點或目的',
      types: [
        { title: '空間地點介系詞', desc: 'in（在...裡面）, on（在...表面上）, under（在...下方）, at（在某地點）。' },
        { title: '時間介系詞', desc: 'at 7:00（特定時間點）, on Monday（特定日期/星期）, in 2026 / in May（年月）。' },
        { title: '方向與目的', desc: 'to（往/給）, into（進入）, through（穿過）, for（為了/給予）。' }
      ],
      examples: [
        { en: 'The drawing tools are on the desk in the office.', zh: '製圖工具在辦公室的書桌上。', highlight: 'on the desk / in the office (介系詞片語)' },
        { en: 'Thank you for giving us detailed instructions.', zh: '感謝你提供我們詳細的指示。', highlight: 'for + V-ing (介系詞後接動名詞)' }
      ],
      testTip: '統測秘訣：介系詞後面如果要接動作，必須變成「動名詞 V-ing」形式（例：good at calculating, thank you for coming）！'
    },
    {
      id: 6,
      nameZh: '連接詞',
      nameEn: 'Conjunction (conj.)',
      badge: '句子與句子的強力膠水',
      color: 'from-pink-500 to-rose-500',
      border: 'border-pink-300 dark:border-pink-800',
      bg: 'bg-pink-50/50 dark:bg-pink-950/20',
      role: '將單字、片語、或兩個完整的子句緊緊連結在一起。',
      analogy: '【鋼骨接合器】把兩段獨立的樑柱銲接成穩固的框架',
      types: [
        { title: '對等連接詞 (FANBOYS)', desc: 'for, and, nor, but, or, yet, so。前後連接的詞性或結構必須對等！' },
        { title: '從屬連接詞', desc: 'because（因為）, although / even though（雖然）, if（如果）, when（當...時）。' },
        { title: '相關連接詞', desc: 'both...and...（兩者皆是）, either...or...（二選一）, neither...nor...（兩者皆非）。' }
      ],
      examples: [
        { en: 'The steel is strong, but the wood is flexible.', zh: '鋼材很強韌，但木材有彈性。', highlight: 'but (對等連接詞連接兩個句子)' },
        { en: 'Although it rained heavily, the workers continued building.', zh: '雖然下著大雨，工人們依然繼續施工。', highlight: 'Although (從屬連接詞引導讓步子句)' }
      ],
      testTip: '統測秘訣：中文常說「雖然...但是...」或「因為...所以...」，但在英文裡 Although 和 But 絕對不能同時出現！'
    },
    {
      id: 7,
      nameZh: '感嘆詞',
      nameEn: 'Interjection (interj.)',
      badge: '情緒的瞬間爆發語',
      color: 'from-amber-400 to-yellow-500',
      border: 'border-amber-300 dark:border-yellow-700',
      bg: 'bg-yellow-50/50 dark:bg-yellow-950/20',
      role: '表達驚奇、喜悅、痛苦、警示等突發情緒。在句子中通常獨立存在，後面常帶驚嘆號。',
      analogy: '【信號彈】瞬間發出情緒警報，不牽動文法結構',
      types: [
        { title: '驚奇喜悅', desc: 'Wow!（哇！太棒了）, Bravo!（太棒了！喝采）' },
        { title: '痛苦驚慌', desc: 'Ouch!（好痛！）, Oops!（糟糕！不小心犯錯）' },
        { title: '打招呼與引起注意', desc: 'Hey!（嘿！）, Look out!（小心！）' }
      ],
      examples: [
        { en: 'Wow! This skyscraper is taller than I imagined.', zh: '哇！這座摩天大樓比我想像的還要高。', highlight: 'Wow! (表達讚嘆)' },
        { en: 'Watch out! The crane is lifting heavy beams.', zh: '小心！起重機正在吊掛重型橫樑。', highlight: 'Watch out! (引起注意與警示)' }
      ],
      testTip: '統測秘訣：感嘆詞在統測閱讀或對話題中常出現在第 1~2 題日常對話，看懂情緒字就能秒答！'
    }
  ];
export const archSuffixRules = [
    {
      part: '名詞字尾 (Noun Suffixes)',
      icon: '🏛️',
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900',
      suffixes: [
        { suf: '-tion / -sion', ex: 'construction (建築), decision (決定), action (行動)' },
        { suf: '-ment', ex: 'measurement (測量), equipment (設備), development (發展)' },
        { suf: '-ness', ex: 'hardness (硬度), thickness (厚度), darkness (黑暗)' },
        { suf: '-er / -or', ex: 'worker (工人), surveyor (測量員), operator (操作員)' },
        { suf: '-ity', ex: 'safety (安全), quality (品質), durability (耐用性)' }
      ]
    },
    {
      part: '動詞字尾 (Verb Suffixes)',
      icon: '⚙️',
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
      suffixes: [
        { suf: '-ize / -ise', ex: 'standardize (標準化), organize (組織), realize (理解)' },
        { suf: '-ate', ex: 'calculate (計算), estimate (估計), operate (操作)' },
        { suf: '-en', ex: 'strengthen (加強), widen (加寬), lengthen (加長)' },
        { suf: '-ify', ex: 'simplify (簡化), modify (修改), identify (識別)' }
      ]
    },
    {
      part: '形容詞字尾 (Adjective Suffixes)',
      icon: '🎨',
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      suffixes: [
        { suf: '-ful', ex: 'useful (有用的), careful (小心的), powerful (強大的)' },
        { suf: '-less', ex: 'flawless (完美無瑕的), careless (粗心的), useless (無用的)' },
        { suf: '-able / -ible', ex: 'reliable (可靠的), flexible (有彈性的), visible (可見的)' },
        { suf: '-ive', ex: 'effective (有效的), protective (保護性的), expensive (昂貴的)' },
        { suf: '-al', ex: 'structural (結構的), digital (數位的), natural (自然的)' },
        { suf: '-ous', ex: 'dangerous (危險的), continuous (連續的), famous (著名的)' }
      ]
    },
    {
      part: '副詞字尾 (Adverb Suffixes)',
      icon: '🚀',
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      suffixes: [
        { suf: '-ly (形容詞 + ly)', ex: 'carefully (小心地), accurately (精準地), safely (安全地)' },
        { suf: '-ward / -wards', ex: 'forward (向前), backward (向後), upward (向上)' }
      ]
    }
  ];
export const archPosQuiz = [
    {
      id: 1,
      sentence: 'The technician needs an _______ tool to measure the angle.',
      audio: 'The technician needs an accurate tool to measure the angle.',
      options: [
        { text: 'accuracy', pos: '名詞 (n.)' },
        { text: 'accurate', pos: '形容詞 (adj.)' },
        { text: 'accurately', pos: '副詞 (adv.)' },
        { text: 'accurateness', pos: '名詞 (n.)' }
      ],
      correctIndex: 1,
      reason: '空格在冠詞 an 與名詞 tool 之間，必須填入「形容詞 (accurate)」來修飾名詞 tool（精確的工具）！'
    },
    {
      id: 2,
      sentence: 'All workers must wear safety helmets for their _______.',
      audio: 'All workers must wear safety helmets for their protection.',
      options: [
        { text: 'protect', pos: '動詞 (v.)' },
        { text: 'protective', pos: '形容詞 (adj.)' },
        { text: 'protection', pos: '名詞 (n.)' },
        { text: 'protectively', pos: '副詞 (adv.)' }
      ],
      correctIndex: 2,
      reason: '空格在所有格 their（他們的）後面，所有格後面一定要接「名詞 (protection)」，字尾 -tion 為典型名詞字尾！'
    },
    {
      id: 3,
      sentence: 'Please inspect the blueprint _______ before pouring the concrete.',
      audio: 'Please inspect the blueprint carefully before pouring the concrete.',
      options: [
        { text: 'careful', pos: '形容詞 (adj.)' },
        { text: 'carefully', pos: '副詞 (adv.)' },
        { text: 'carefulness', pos: '名詞 (n.)' },
        { text: 'care', pos: '動詞/名詞' }
      ],
      correctIndex: 1,
      reason: '前面句子「inspect the blueprint（檢查藍圖）」動詞與受詞結構已經完整，此處需要「副詞 (carefully)」來修飾動詞 inspect！'
    },
    {
      id: 4,
      sentence: 'The new foundation _______ strong enough to support ten floors.',
      audio: 'The new foundation is strong enough to support ten floors.',
      options: [
        { text: 'is', pos: 'be 動詞 (v.)' },
        { text: 'very', pos: '副詞 (adv.)' },
        { text: 'of', pos: '介系詞 (prep.)' },
        { text: 'and', pos: '連接詞 (conj.)' }
      ],
      correctIndex: 0,
      reason: '主詞 The new foundation 後面缺乏最重要的心臟——「動詞」，所以必須填入 be 動詞 is！'
    },
    {
      id: 5,
      sentence: 'The project manager is satisfied _______ your structural calculations.',
      audio: 'The project manager is satisfied with your structural calculations.',
      options: [
        { text: 'with', pos: '介系詞 (prep.)' },
        { text: 'so', pos: '連接詞 (conj.)' },
        { text: 'because', pos: '從屬連接詞 (conj.)' },
        { text: 'always', pos: '副詞 (adv.)' }
      ],
      correctIndex: 0,
      reason: '片語 be satisfied with...（對...感到滿意），with 是「介系詞」，後面接名詞片語 your structural calculations！'
    },
    {
      id: 6,
      sentence: '_______ the weather was cold and rainy, the construction went on smoothly.',
      audio: 'Although the weather was cold and rainy, the construction went on smoothly.',
      options: [
        { text: 'Because', pos: '連接詞（因果）' },
        { text: 'Although', pos: '連接詞（讓步轉折）' },
        { text: 'During', pos: '介系詞' },
        { text: 'In spite of', pos: '介系詞片語' }
      ],
      correctIndex: 1,
      reason: '後半句「went on smoothly（進展順利）」與前半句「天氣寒冷下雨」形成轉折對比，且引導完整子句（有主詞 the weather 與動詞 was），故選從屬連接詞 Although！'
    }
  ];

// 4. KK音標與查字典指南 (Phonetics & Dictionary Guide)
export const archPhoneticItems = [
    // Vowels
    { sym: 'i', type: 'vowel', name: '長母音', word: 'see', kk: '[si]', zh: '看見', tip: '微笑拉長音，如國語「一」稍拉長' },
    { sym: 'ɪ', type: 'vowel', name: '短母音', word: 'sit', kk: '[sɪt]', zh: '坐下', tip: '短促放鬆，介於「一」與「ㄝ」之間' },
    { sym: 'e', type: 'vowel', name: '雙/單母音', word: 'say', kk: '[se]', zh: '說', tip: '嘴角拉開「欸」' },
    { sym: 'ɛ', type: 'vowel', name: '短母音', word: 'bed', kk: '[bɛd]', zh: '床', tip: '嘴巴開約兩指寬「ㄝ」' },
    { sym: 'æ', type: 'vowel', name: '大嘴母音', word: 'cat', kk: '[kæt]', zh: '貓', tip: '下巴下壓三指寬蝴蝶音' },
    { sym: 'ɑ', type: 'vowel', name: '短母音', word: 'hot', kk: '[hɑt]', zh: '熱的', tip: '看牙醫張大嘴說「阿」' },
    { sym: 'ɔ', type: 'vowel', name: '長母音', word: 'saw', kk: '[sɔ]', zh: '看見(過)/鋸子', tip: '嘴唇縮圓發「奧」' },
    { sym: 'o', type: 'vowel', name: '雙母音', word: 'go', kk: '[go]', zh: '去', tip: '嘴唇由大圓縮小圓「歐」' },
    { sym: 'ʊ', type: 'vowel', name: '短母音', word: 'book', kk: '[bʊk]', zh: '書本', tip: '短促收緊「屋」' },
    { sym: 'u', type: 'vowel', name: '長母音', word: 'boot', kk: '[but]', zh: '靴子', tip: '嘟嘴吹口哨延長「屋～」' },
    { sym: 'ʌ', type: 'vowel', name: '短母音', word: 'cup', kk: '[kʌp]', zh: '杯子', tip: '腹部用力短音「啊」' },
    { sym: 'ə', type: 'vowel', name: '弱讀母音', word: 'about', kk: '[əˈbaʊt]', zh: '關於', tip: '英文中最常見懶人音，放鬆念「ㄜ」' },
    { sym: 'ɝ', type: 'vowel', name: '捲舌母音', word: 'bird', kk: '[bɝd]', zh: '鳥', tip: '重音捲舌「ㄦ」' },
    { sym: 'ɚ', type: 'vowel', name: '弱讀捲舌', word: 'worker', kk: '[ˈwɝkɚ]', zh: '工人', tip: '輕音結尾微捲舌' },
    { sym: 'aɪ', type: 'vowel', name: '雙母音', word: 'time', kk: '[taɪm]', zh: '時間', tip: '「阿」滑向「依」' },
    { sym: 'aʊ', type: 'vowel', name: '雙母音', word: 'now', kk: '[naʊ]', zh: '現在', tip: '「阿」滑向「屋」' },
    { sym: 'ɔɪ', type: 'vowel', name: '雙母音', word: 'boy', kk: '[bɔɪ]', zh: '男孩', tip: '「奧」滑向「依」' },

    // Consonants (Voiceless vs Voiced pairs)
    { sym: 'p', type: 'consonant', name: '無聲爆破', word: 'pen', kk: '[pɛn]', zh: '原子筆', tip: '雙唇閉合噴氣，聲帶不震動' },
    { sym: 'b', type: 'consonant', name: '有聲爆破', word: 'bag', kk: '[bæg]', zh: '袋子', tip: '雙唇閉合濁音，聲帶震動' },
    { sym: 't', type: 'consonant', name: '無聲齒齦', word: 'tool', kk: '[tul]', zh: '工具', tip: '舌尖頂上齒齦彈開噴氣' },
    { sym: 'd', type: 'consonant', name: '有聲齒齦', word: 'draw', kk: '[drɔ]', zh: '繪製', tip: '舌尖頂上齒齦濁音震動' },
    { sym: 'k', type: 'consonant', name: '無聲軟顎', word: 'key', kk: '[ki]', zh: '鑰匙', tip: '舌後頂軟顎清脆噴氣' },
    { sym: 'g', type: 'consonant', name: '有聲軟顎', word: 'gate', kk: '[get]', zh: '大門', tip: '舌後頂軟顎濁音' },
    { sym: 'f', type: 'consonant', name: '無聲唇齒', word: 'fast', kk: '[fæst]', zh: '快速的', tip: '上門牙輕咬下唇輕吹氣' },
    { sym: 'v', type: 'consonant', name: '有聲唇齒', word: 'view', kk: '[vju]', zh: '視野', tip: '上門牙輕咬下唇強烈震動' },
    { sym: 'θ', type: 'consonant', name: '無聲咬舌', word: 'think', kk: '[θɪŋk]', zh: '思考', tip: '★重要：舌尖放上下門牙間輕吐氣' },
    { sym: 'ð', type: 'consonant', name: '有聲咬舌', word: 'this', kk: '[ðɪs]', zh: '這個', tip: '★重要：舌尖放上下門牙間震動發聲' },
    { sym: 's', type: 'consonant', name: '無聲齒齦', word: 'site', kk: '[saɪt]', zh: '工地/地點', tip: '氣流從牙縫摩擦如同蛇嘶聲' },
    { sym: 'z', type: 'consonant', name: '有聲齒齦', word: 'zero', kk: '[ˈzɪro]', zh: '零', tip: '如同蜜蜂嗡嗡聲強烈震動' },
    { sym: 'ʃ', type: 'consonant', name: '無聲噓音', word: 'ship', kk: '[ʃɪp]', zh: '船', tip: '比「噓」手勢嘴唇微噘' },
    { sym: 'ʒ', type: 'consonant', name: '有聲摩擦', word: 'measure', kk: '[ˈmɛʒɚ]', zh: '測量', tip: '濁音版「日」微捲舌' },
    { sym: 'tʃ', type: 'consonant', name: '無聲破擦', word: 'check', kk: '[tʃɛk]', zh: '檢查', tip: '如國語「七」的短促爆發音' },
    { sym: 'dʒ', type: 'consonant', name: '有聲破擦', word: 'job', kk: '[dʒɑb]', zh: '工作', tip: '如國語「居」的濁音震動' },
    { sym: 'm', type: 'consonant', name: '雙唇鼻音', word: 'map', kk: '[mæp]', zh: '地圖', tip: '雙唇緊閉由鼻子出氣' },
    { sym: 'n', type: 'consonant', name: '齒齦鼻音', word: 'net', kk: '[nɛt]', zh: '網路/網子', tip: '舌尖抵齒齦鼻腔共鳴' },
    { sym: 'ŋ', type: 'consonant', name: '軟顎鼻音', word: 'ring', kk: '[rɪŋ]', zh: '環/響起', tip: '舌根抵軟顎「嗯」' },
    { sym: 'l', type: 'consonant', name: '舌邊側音', word: 'line', kk: '[laɪn]', zh: '線條', tip: '字首「樂」，字尾舌尖抵上顎「歐」' },
    { sym: 'r', type: 'consonant', name: '捲舌音', word: 'rule', kk: '[rul]', zh: '規則', tip: '舌尖捲起懸空，不碰口腔任何部位' }
  ];
export const archStressRules = [
    {
      word: 'present',
      nounKK: '[ˈprɛznt]',
      nounZh: '禮物；現在 (名詞)',
      verbKK: '[prɪˈzɛnt]',
      verbZh: '呈現；贈送 (動詞)',
      rule: '雙音節名詞重音在第一音節；動詞重音後移至第二音節。'
    },
    {
      word: 'record',
      nounKK: '[ˈrɛkɚd]',
      nounZh: '紀錄；唱片 (名詞)',
      verbKK: '[rɪˈkɔrd]',
      verbZh: '錄音；記載 (動詞)',
      rule: '名詞重音在前 [ˈrɛ-]；動詞重音在後 [-ˈkɔrd]。'
    },
    {
      word: 'project',
      nounKK: '[ˈprɑdʒɛkt]',
      nounZh: '專案；工程計畫 (名詞)',
      verbKK: '[prəˈdʒɛkt]',
      verbZh: '投射；預測 (動詞)',
      rule: '工科關鍵字！名詞重音在前，動詞重音在後。'
    },
    {
      word: 'contract',
      nounKK: '[ˈkɑntrækt]',
      nounZh: '契約；合同 (名詞)',
      verbKK: '[kənˈtrækt]',
      verbZh: '收縮；訂約 (動詞)',
      rule: '工程合約念第一音節；熱脹冷縮之收縮念第二音節。'
    }
  ];
export const archDictCodes = [
    { code: '[C]', title: 'Countable Noun (可數名詞)', desc: '可以數的一顆顆東西，有單數與複數 (如 a beam, two beams)。' },
    { code: '[U]', title: 'Uncountable Noun (不可數名詞)', desc: '無法數、無複數、不加 a/an (如 concrete, steel, safety, information)。' },
    { code: '[T]', title: 'Transitive Verb (及物動詞)', desc: '動作必須直接接「受詞名詞」才完整 (如 build a bridge)。' },
    { code: '[I]', title: 'Intransitive Verb (不及物動詞)', desc: '動詞自己獨立完整，不需要受詞，或必須接介系詞 (如 The train arrives)。' },
    { code: '[pl.]', title: 'Plural (複數型)', desc: '通常恆為複數形式 (如 scissors 剪刀, goggles 護目鏡, premises 廠區)。' },
    { code: 'colloc.', title: 'Collocation (慣用搭配詞)', desc: '外國人最自然的字詞組合，統測克漏字命題熱區 (如 pay attention to, make an effort)。' }
  ];
export const archPhoneticsQuiz = [
    {
      id: 1,
      question: '請問 KK 音標 [θ] 與 [ð] 在發音時最大的共同特徵是什麼？',
      audio: 'think and this',
      options: [
        '舌尖要放在上下門牙之間輕咬咬舌',
        '雙唇必須緊緊閉合噴氣',
        '舌根要緊貼軟顎發出鼻音',
        '嘴巴要張成三個指頭寬的蝴蝶音'
      ],
      correctIndex: 0,
      reason: '[θ] (如 think) 與 [ð] (如 this) 是英文咬舌音，發音時舌尖必須置於上下齒之間，是台灣學生最容易誤念成 [s] 或 [z] 的常考發音！'
    },
    {
      id: 2,
      question: '單字 "project" 若要作為工科統測常見的「工程專案、計畫」(名詞) 時，其重音應該放在哪裡？',
      audio: 'project',
      options: [
        '第一音節 [ˈprɑdʒɛkt]',
        '第二音節 [prəˈdʒɛkt]',
        '第三音節',
        '沒有重音限制'
      ],
      correctIndex: 0,
      reason: '英文雙音節字有一條強大通則：「名詞重音常在前，動詞重音常在後」。因此名詞專案念 [ˈprɑdʒɛkt]；動詞投射/放映念 [prəˈdʒɛkt]！'
    },
    {
      id: 3,
      question: '在英文字典中，若某名詞詞條標註為 [U]，代表以下哪一種文法特性？',
      audio: 'uncountable noun',
      options: [
        '它是不可數名詞，前方不能加 a/an，也不能加 -s/es 複數',
        '它是極度罕見的不規則名詞',
        '它是單位名詞，後面一定要接 of',
        '它是通用名詞，可以隨意加 s'
      ],
      correctIndex: 0,
      reason: '[U] 代表 Uncountable (不可數名詞)。例如 concrete (混凝土)、information (資訊) 前面絕對不能寫 an information，也不能寫 informations！'
    },
    {
      id: 4,
      question: '字典裡動詞標註 [T] 代表 Transitive (及物動詞)，這意味著它在句子中有什麼必要條件？',
      audio: 'transitive verb',
      options: [
        '後面必須緊接著受詞 (Object)，否則意思不完整',
        '後面永遠不能接地點或時間',
        '只能用於過去式，不能用於現在式',
        '必須搭配助動詞 will 才能使用'
      ],
      correctIndex: 0,
      reason: '及物動詞 [T] 如 build (建造)、measure (測量)，後面必須直接接受詞 (例如 build a house)，如果只寫 I build. 句子就不成立！'
    },
    {
      id: 5,
      question: '下列哪一組單字的音標字首子音是「無聲子音」(聲帶不震動)？',
      audio: 'pen, tool, check',
      options: [
        '[p] (pen), [t] (tool), [tʃ] (check)',
        '[b] (bag), [d] (dog), [g] (gate)',
        '[v] (view), [z] (zoo), [m] (map)',
        '[r] (rule), [l] (line), [w] (we)'
      ],
      correctIndex: 0,
      reason: '[p], [t], [k], [f], [θ], [s], [ʃ], [tʃ] 為無聲清子音，發音時手摸喉嚨喉頭不會震動；其餘 B、C、D 選項皆為有聲濁子音！'
    },
    {
      id: 6,
      question: '在查閱英文字典時，如果遇到「片語搭配 (Collocation)」如 "be responsible for"，最佳的學習策略是什麼？',
      audio: 'be responsible for',
      options: [
        '整組片語連同介系詞 for 一起記憶，並閱讀字典例句',
        '只單獨背 responsible 的中文，不管介系詞',
        '把 responsible 當作動詞背誦',
        '只抄寫三遍音標即可'
      ],
      correctIndex: 0,
      reason: '統測克漏字最愛考搭配詞介系詞（例如 responsible 一定搭 for、interested 一定搭 in）。整組片語記憶並透過字典例句內化，考試才能直覺秒殺！'
    }
  ];

// 5. 108 課綱核心 1200 單字庫 (Vocab 1200 Core Explorer)
export const archVocabCategories = [
    {
      id: 0,
      name: '人物、家庭與身分',
      enName: 'People & Family',
      icon: '👨‍👩‍👧',
      words: [
        { en: 'family', kk: '[ˈfæməlɪ]', zh: '家庭；家人', ex: 'My family lives in Taichung.' },
        { en: 'father', kk: '[ˈfɑðɚ]', zh: '父親；爸爸', ex: 'His father is a civil engineer.' },
        { en: 'mother', kk: '[ˈmʌðɚ]', zh: '母親；媽媽', ex: 'Her mother works at a hospital.' },
        { en: 'brother', kk: '[ˈbrʌðɚ]', zh: '哥哥；弟弟', ex: 'My brother enjoys drawing blueprints.' },
        { en: 'sister', kk: '[ˈsɪstɚ]', zh: '姊姊；妹妹', ex: 'She has an older sister.' },
        { en: 'friend', kk: '[frɛnd]', zh: '朋友', ex: 'A good friend is always supportive.' },
        { en: 'teacher', kk: '[ˈtitʃɚ]', zh: '老師；教師', ex: 'The teacher explained the formula.' },
        { en: 'student', kk: '[ˈstudnt]', zh: '學生', ex: 'Every student should practice daily.' },
        { en: 'worker', kk: '[ˈwɝkɚ]', zh: '工人；勞動者', ex: 'Safety is vital for every worker.' },
        { en: 'person', kk: '[ˈpɝsn]', zh: '人；個人', ex: 'He is a very reliable person.' },
      ]
    },
    {
      id: 1,
      name: '日常生活與作息動作',
      enName: 'Daily Life & Routines',
      icon: '⏰',
      words: [
        { en: 'wake', kk: '[wek]', zh: '醒來；喚醒 (wake up)', ex: 'I wake up at six thirty every morning.' },
        { en: 'wash', kk: '[wɑʃ]', zh: '洗滌；清洗', ex: 'Always wash your hands before meals.' },
        { en: 'cook', kk: '[kʊk]', zh: '烹飪；廚師', ex: 'My parents cook dinner together.' },
        { en: 'clean', kk: '[klin]', zh: '打掃；乾淨的', ex: 'Keep the drafting table clean.' },
        { en: 'sleep', kk: '[slip]', zh: '睡覺；睡眠', ex: 'Adequate sleep improves memory.' },
        { en: 'rest', kk: '[rɛst]', zh: '休息；其餘部分', ex: 'Take a short rest after intensive study.' },
        { en: 'wear', kk: '[wɛr]', zh: '穿戴；佩戴', ex: 'Workers must wear safety helmets.' },
        { en: 'open', kk: '[ˈopən]', zh: '打開；營業的', ex: 'Please open the window for ventilation.' },
        { en: 'close', kk: '[kloz]', zh: '關閉；接近的', ex: 'Remember to close the door.' },
        { en: 'wait', kk: '[wet]', zh: '等待 (wait for)', ex: 'Wait for the concrete to dry completely.' },
      ]
    },
    {
      id: 2,
      name: '食物、餐飲與料理',
      enName: 'Food & Dining',
      icon: '🍱',
      words: [
        { en: 'rice', kk: '[raɪs]', zh: '米飯；稻米', ex: 'Rice is a staple food in Taiwan.' },
        { en: 'noodle', kk: '[ˈnudl]', zh: '麵條', ex: 'Beef noodles are famous worldwide.' },
        { en: 'bread', kk: '[brɛd]', zh: '麵包', ex: 'He bought fresh bread for breakfast.' },
        { en: 'water', kk: '[ˈwɔtɚ]', zh: '水', ex: 'Drink plenty of water on hot days.' },
        { en: 'tea', kk: '[ti]', zh: '茶', ex: 'Taiwanese oolong tea smells wonderful.' },
        { en: 'milk', kk: '[mɪlk]', zh: '牛奶', ex: 'Milk is rich in calcium.' },
        { en: 'fruit', kk: '[frut]', zh: '水果', ex: 'Eat fresh fruit every day.' },
        { en: 'vegetable', kk: '[ˈvɛdʒtəbl]', zh: '蔬菜', ex: 'Vegetables are good for health.' },
        { en: 'delicious', kk: '[dɪˈlɪʃəs]', zh: '美味的；可口的', ex: 'This homemade lunch is delicious.' },
        { en: 'hungry', kk: '[ˈhʌŋgrɪ]', zh: '飢餓的', ex: 'After three hours of surveying, we were hungry.' },
      ]
    },
    {
      id: 3,
      name: '房屋、建築空間與設施',
      enName: 'House & Architecture Space',
      icon: '🏠',
      words: [
        { en: 'house', kk: '[haʊs]', zh: '房屋；房子', ex: 'They bought a traditional brick house.' },
        { en: 'room', kk: '[rum]', zh: '房間；空間', ex: 'The living room has good natural lighting.' },
        { en: 'door', kk: '[dɔr]', zh: '門', ex: 'Exit through the emergency door.' },
        { en: 'window', kk: '[ˈwɪndo]', zh: '窗戶', ex: 'Double-glazed windows save energy.' },
        { en: 'wall', kk: '[wɔl]', zh: '牆壁；圍牆', ex: 'The concrete wall prevents noise.' },
        { en: 'floor', kk: '[flɔr]', zh: '地板；樓層', ex: 'The studio is on the fifth floor.' },
        { en: 'roof', kk: '[ruf]', zh: '屋頂', ex: 'Solar panels were installed on the roof.' },
        { en: 'bridge', kk: '[brɪdʒ]', zh: '橋樑', ex: 'The suspension bridge spans the river.' },
        { en: 'building', kk: '[ˈbɪldɪŋ]', zh: '建築物；大樓', ex: 'Taipei 101 is an iconic building.' },
        { en: 'space', kk: '[spes]', zh: '空間；太空', ex: 'Architects optimize public space.' },
      ]
    },
    {
      id: 4,
      name: '交通、移動與方向',
      enName: 'Transportation & Directions',
      icon: '🚆',
      words: [
        { en: 'bus', kk: '[bʌs]', zh: '公車；巴士', ex: 'Take the bus to the city center.' },
        { en: 'train', kk: '[tren]', zh: '火車；列車', ex: 'The high-speed train arrives on time.' },
        { en: 'car', kk: '[kɑr]', zh: '汽車；轎車', ex: 'Electric cars produce zero emissions.' },
        { en: 'station', kk: '[ˈsteʃən]', zh: '車站；站', ex: 'Meet me at the MRT station entrance.' },
        { en: 'road', kk: '[rod]', zh: '道路；馬路', ex: 'The mountain road is being repaired.' },
        { en: 'street', kk: '[strit]', zh: '街道', ex: 'Pedestrians walk along the quiet street.' },
        { en: 'turn', kk: '[tɝn]', zh: '轉彎；轉變', ex: 'Turn right at the traffic lights.' },
        { en: 'left', kk: '[lɛft]', zh: '左邊；向左', ex: 'The site office is on your left.' },
        { en: 'right', kk: '[raɪt]', zh: '右邊；正確的', ex: 'Make a right turn at the intersection.' },
        { en: 'straight', kk: '[stret]', zh: '筆直地；直的', ex: 'Go straight for two blocks.' },
      ]
    },
    {
      id: 5,
      name: '校園、學業與測量文具',
      enName: 'School, Study & Tools',
      icon: '📐',
      words: [
        { en: 'book', kk: '[bʊk]', zh: '書本；預約', ex: 'Read the structural engineering book.' },
        { en: 'pen', kk: '[pɛn]', zh: '鋼筆；原子筆', ex: 'Use a black pen to sign the drawings.' },
        { en: 'pencil', kk: '[ˈpɛnsl]', zh: '鉛筆', ex: 'Architects sketch with a 2B pencil.' },
        { en: 'ruler', kk: '[ˈrulɚ]', zh: '尺；直尺', ex: 'Measure the line length with a scale ruler.' },
        { en: 'paper', kk: '[ˈpepɚ]', zh: '紙張；考卷', ex: 'Print the floor plan on A3 paper.' },
        { en: 'desk', kk: '[dɛsk]', zh: '書桌；製圖桌', ex: 'Organize your drafting desk.' },
        { en: 'homework', kk: '[ˈhomˌwɝk]', zh: '作業；功課', ex: 'Submit your homework before Friday.' },
        { en: 'test', kk: '[tɛst]', zh: '測驗；試驗', ex: 'Conduct a slump test on fresh concrete.' },
        { en: 'class', kk: '[klæs]', zh: '班級；課堂', ex: 'Pay full attention during class.' },
        { en: 'learn', kk: '[lɝn]', zh: '學習；得知', ex: 'We learn civil surveying step by step.' },
      ]
    },
    {
      id: 6,
      name: '數字、時間與行事曆',
      enName: 'Numbers & Time',
      icon: '📅',
      words: [
        { en: 'today', kk: '[təˈde]', zh: '今天', ex: 'We start excavation today.' },
        { en: 'tomorrow', kk: '[təˈmɔro]', zh: '明天', ex: 'The materials will arrive tomorrow.' },
        { en: 'yesterday', kk: '[ˈjɛstɚde]', zh: '昨天', ex: 'We completed the site inspection yesterday.' },
        { en: 'morning', kk: '[ˈmɔrnɪŋ]', zh: '早晨；上午', ex: 'The safety meeting begins in the morning.' },
        { en: 'night', kk: '[naɪt]', zh: '夜晚；晚上', ex: 'The bridge looks stunning at night.' },
        { en: 'week', kk: '[wik]', zh: '星期；週', ex: 'The project schedule spans fifty weeks.' },
        { en: 'month', kk: '[mʌnθ]', zh: '月份', ex: 'Concrete curing takes about one month.' },
        { en: 'year', kk: '[jɪr]', zh: '年份；年', ex: 'The landmark was built in the year 2000.' },
        { en: 'first', kk: '[fɝst]', zh: '第一；首先', ex: 'Safety comes first on the job site.' },
        { en: 'second', kk: '[ˈsɛkənd]', zh: '第二；秒鐘', ex: 'Check the rebar spacing a second time.' },
      ]
    },
    {
      id: 7,
      name: '自然、氣候與環境',
      enName: 'Nature & Environment',
      icon: '🌿',
      words: [
        { en: 'sun', kk: '[sʌn]', zh: '太陽', ex: 'Deep eaves block direct summer sun.' },
        { en: 'rain', kk: '[ren]', zh: '雨水；下雨', ex: 'Waterproof coatings prevent rain leakage.' },
        { en: 'wind', kk: '[wɪnd]', zh: '風', ex: 'Tuned mass dampers resist strong typhoon wind.' },
        { en: 'sky', kk: '[skaɪ]', zh: '天空', ex: 'The skyscraper stretches into the blue sky.' },
        { en: 'tree', kk: '[tri]', zh: '樹木', ex: 'Native trees provide pleasant shade.' },
        { en: 'earth', kk: '[ɝθ]', zh: '地球；泥土', ex: 'Geotechnical engineers test earth stability.' },
        { en: 'river', kk: '[ˈrɪvɚ]', zh: '河流', ex: 'A dike was built along the river bank.' },
        { en: 'hot', kk: '[hɑt]', zh: '炎熱的；燙的', ex: 'Avoid pouring concrete in extremely hot weather.' },
        { en: 'cold', kk: '[kold]', zh: '寒冷的；感冒', ex: 'Thermal insulation keeps rooms warm in cold winters.' },
        { en: 'weather', kk: '[ˈwɛðɚ]', zh: '天氣；氣候', ex: 'Check the weather forecast before outdoor surveys.' },
      ]
    },
    {
      id: 8,
      name: '情緒、性格與身心狀態',
      enName: 'Emotions & Feelings',
      icon: '😊',
      words: [
        { en: 'happy', kk: '[ˈhæpɪ]', zh: '快樂的；高興的', ex: 'The client was happy with our floor plan.' },
        { en: 'sad', kk: '[sæd]', zh: '難過的；悲傷的', ex: 'It is sad to see historic buildings demolished.' },
        { en: 'tired', kk: '[taɪrd]', zh: '疲勞的；累的', ex: 'Workers feel tired after lifting heavy steel.' },
        { en: 'angry', kk: '[ˈæŋgrɪ]', zh: '生氣的', ex: 'Stay calm even when an inspector is angry.' },
        { en: 'afraid', kk: '[əˈfred]', zh: '害怕的 (be afraid of)', ex: 'Do not be afraid of making mistakes while learning.' },
        { en: 'careful', kk: '[ˈkɛrfəl]', zh: '細心的；小心的', ex: 'Be careful when operating heavy machinery.' },
        { en: 'busy', kk: '[ˈbɪzɪ]', zh: '忙碌的', ex: 'Civil drafters are busy before project deadlines.' },
        { en: 'safe', kk: '[sef]', zh: '安全的', ex: 'Always ensure the scaffolding is safe.' },
        { en: 'sure', kk: '[ʃʊr]', zh: '確定的；確信的', ex: 'Make sure the measurements are exact.' },
        { en: 'ready', kk: '[ˈrɛdɪ]', zh: '準備好的 (ready for)', ex: 'The concrete mix is ready for pouring.' },
      ]
    },
    {
      id: 9,
      name: '核心超高頻動詞 (必備)',
      enName: 'Essential Action Verbs',
      icon: '⚡',
      words: [
        { en: 'go', kk: '[go]', zh: '去；走 (go to)', ex: 'Engineers go to the construction site daily.' },
        { en: 'come', kk: '[kʌm]', zh: '來；抵達', ex: 'The materials will come by truck.' },
        { en: 'see', kk: '[si]', zh: '看見；了解', ex: 'I see a small structural crack on the beam.' },
        { en: 'hear', kk: '[hɪr]', zh: '聽到；聽見', ex: 'We heard the alarm bell ring.' },
        { en: 'make', kk: '[mek]', zh: '製造；使成為', ex: 'Computers make drafting much faster.' },
        { en: 'take', kk: '[tek]', zh: '拿取；花費時間', ex: 'It will take two days to finish the survey.' },
        { en: 'get', kk: '[gɛt]', zh: '獲得；變得', ex: 'You can get the construction permit next week.' },
        { en: 'give', kk: '[gɪv]', zh: '給予；提供', ex: 'Please give me the revised elevation drawing.' },
        { en: 'know', kk: '[no]', zh: '知道；認識', ex: 'Do you know how to calculate beam reactions?' },
        { en: 'think', kk: '[θɪŋk]', zh: '思考；認為', ex: 'I think steel is stronger than timber.' },
      ]
    },
    {
      id: 10,
      name: '常用修飾形容詞與副詞',
      enName: 'Core Modifiers',
      icon: '✨',
      words: [
        { en: 'big', kk: '[bɪg]', zh: '大的；巨大的', ex: 'They erected a big crane yesterday.' },
        { en: 'small', kk: '[smɔl]', zh: '小的；細微的', ex: 'Even a small defect can cause structural failure.' },
        { en: 'fast', kk: '[fæst]', zh: '快速的；迅速地', ex: 'Fast trains connect major urban centers.' },
        { en: 'slow', kk: '[slo]', zh: '緩慢的', ex: 'Soil settlement is a slow natural process.' },
        { en: 'good', kk: '[gʊd]', zh: '良好的；優秀的', ex: 'Good ventilation improves indoor air quality.' },
        { en: 'bad', kk: '[bæd]', zh: '糟糕的；有害的', ex: 'Bad weather delayed the concrete delivery.' },
        { en: 'hard', kk: '[hɑrd]', zh: '堅硬的；困難的；努力地', ex: 'Granite is a very hard stone.' },
        { en: 'easy', kk: '[ˈizɪ]', zh: '容易的；簡單的', ex: 'Learning 1200 words is easy with audio flashcards.' },
        { en: 'new', kk: '[nju]', zh: '新的；嶄新的', ex: 'The government funded a new library project.' },
        { en: 'old', kk: '[old]', zh: '古老的；老舊的', ex: 'Preserve the old historic arch bridge.' },
      ]
    },
    {
      id: 11,
      name: '高頻功能詞與代名詞',
      enName: 'Pronouns & Function Words',
      icon: '🧩',
      words: [
        { en: 'this', kk: '[ðɪs]', zh: '這個 (近指單數)', ex: 'This blueprint shows the foundation layout.' },
        { en: 'that', kk: '[ðæt]', zh: '那個 (遠指單數)', ex: 'That column supports the roof load.' },
        { en: 'these', kk: '[ðiz]', zh: '這些 (近指複數)', ex: 'These steel rebars are for the shear wall.' },
        { en: 'those', kk: '[ðoz]', zh: '那些 (遠指複數)', ex: 'Those workers completed safety training.' },
        { en: 'some', kk: '[sʌm]', zh: '一些；某些', ex: 'Some materials need special storage.' },
        { en: 'many', kk: '[ˈmɛnɪ]', zh: '許多的 (可數名詞)', ex: 'Many students pass the surveying certification.' },
        { en: 'much', kk: '[mʌtʃ]', zh: '許多的 (不可數名詞)', ex: 'Too much water weakens concrete strength.' },
        { en: 'all', kk: '[ɔl]', zh: '全部的；所有的', ex: 'All inspectors wear protective glasses.' },
        { en: 'every', kk: '[ˈɛvrɪ]', zh: '每一個 (接單數名詞)', ex: 'Every dimension must be checked twice.' },
        { en: 'both', kk: '[boθ]', zh: '兩者都', ex: 'Both architects approved the sustainable design.' },
      ]
    },
  ];
export const archVocabQuiz = [
    {
      q: '英文單字 "bridge" 的中文意思是？',
      options: ['屋頂', '橋樑', '道路', '隧道'],
      ans: '橋樑',
      hint: 'The suspension bridge connects two cities across the river.',
      word: 'bridge'
    },
    {
      q: '安全規範中常說 "Workers must ____ safety helmets." 空格應填？',
      options: ['cook', 'wash', 'wear', 'wake'],
      ans: 'wear',
      hint: 'wear 代表穿戴（衣物、安全帽、護具）。',
      word: 'wear'
    },
    {
      q: '"The drafting ____ is on the fifth floor." 指建築空間樓層的字是？',
      options: ['sun', 'floor', 'rain', 'tree'],
      ans: 'floor',
      hint: 'floor 同時代表地板與樓層（如 fifth floor = 五樓）。',
      word: 'floor'
    },
    {
      q: '走在路上問路時，直走的英文是 "Go ____"？',
      options: ['straight', 'left', 'hungry', 'tired'],
      ans: 'straight',
      hint: 'Go straight for two blocks. 直走兩個街區。',
      word: 'straight'
    },
    {
      q: '"Concrete curing takes about one ____." 表示月份的單字是？',
      options: ['week', 'month', 'year', 'today'],
      ans: 'month',
      hint: 'month 代表月份，一年有 12 個 months。',
      word: 'month'
    },
    {
      q: '"Granite is a very ____ stone." 形容花崗岩質地「堅硬」的形容詞是？',
      options: ['soft', 'easy', 'hard', 'slow'],
      ans: 'hard',
      hint: 'hard 可表示「堅硬的」或「困難的、努力地」。',
      word: 'hard'
    },
  ];

