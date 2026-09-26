// curriculum.mjs - 國中會考(J1-J7)、高中學測(S1-S7)、高工職場(V1-V7) 與 國際考制(GEPT, TOEIC, SAT, GRE, GMAT, TOEFL) 深度教學庫

export const curriculum = [
  {
    id: 'jhs',
    title: '國中英文｜會考能力線',
    badge: '國中 7–9 年級 · 會考滿分主幹 (108 課綱精準對標)',
    intro: '完整對應 108 課綱國民中小學英語文素養指標：涵蓋核心 1200–2000 詞彙、五大基本句型、四大核心時態、代名詞格位、數量詞規則、連接詞禁忌、生活應用閱讀與美語弱化連音聽力。每章均配備深度文法剖析、核心發音單字庫 (含 IPA)、大考必背片語與情境實戰會話。',
    chapters: [
      {
        id: 'j1',
        num: '01',
        title: '句子骨架與基本時態',
        subtitle: '五大基本句型・四大時態・科學真理現在式例外',
        curriculumCode: '1-Ⅳ-4 / 2-Ⅳ-2 / 3-Ⅳ-2 / 4-Ⅳ-1 / Ac-Ⅳ-1',
        stage: '第四學習階段 (國中 7–9 年級)',
        cefr: 'A2 (初級精熟 · 國中會考滿分基礎)',
        competency: 'A2 系統思考與解決問題、B1 符號運用與溝通表達',
        learningPerformance: '掌握英文五大基本句型（S+V, S+V+SC, S+V+O, S+V+IO+DO, S+V+O+OC）與四大基礎時態；依時間副詞標記判定動詞變化。',
        learningContent: 'Ac-Ⅳ-1 簡易句型與主謂結構；Ac-Ⅳ-3 現在、過去、未來與現在進行式；科學客觀真理現在式例外。',
        guideline: '心測中心國中教育會考雙向細目表文法單題命題規準；科學客觀真理（Water boils at 100°C）名詞子句時態一致性例外必考點。',
        concepts: [
          {
            heading: '英文句子的五大核心骨架 (Basic Sentence Patterns)',
            body: '先用主詞、動詞、受詞與補語觀察句子。以下五種常見句型用來幫助解析：\n1. S + V（主詞＋完全不及物動詞）：Birds fly. / The baby cried loudly.\n2. S + V + SC（主詞＋不完全不及物動詞＋主詞補詞）：She looks energetic. / Water feels cold.\n3. S + V + O（主詞＋完全及物動詞＋受詞）：Leo reads science magazines every evening.\n4. S + V + IO + DO（主詞＋授與動詞＋間接受詞＋直接受詞）：My father bought me a bicycle.（= bought a bicycle for me）\n5. S + V + O + OC（主詞＋不完全及物動詞＋受詞＋受詞補詞）：The news made everyone ecstatic. / We elected David class leader.',
            tip: '解題關鍵：先分辨主句與子句，分別找各子句的主詞和謂語，再檢查主詞與動詞是否一致。複句可以有多個限定動詞。'
          },
          {
            heading: '四大基礎時態的判斷與時間副詞標記',
            body: '1. 現在簡單式：表示習慣、真理或目前狀態。動詞第三人稱單數加 -s/-es。標記詞：always, usually, often, every day。\n2. 過去簡單式：表示過去特定時間已結束之動作。動詞加 -ed 或不規則變化。標記詞：yesterday, two days ago, in 2020, last night。\n3. 未來簡單式：表示將要發生的事。公式：will + V 原形 或 be going to + V 原形。標記詞：tomorrow, next week, soon, in the future。\n4. 現在進行式：表示此時此刻正進行之動作。公式：be動詞 (am/is/are) + V-ing。標記詞：now, listen!, look!, at the moment。',
            tip: '會考陷阱：表示真理或科學事實時，即便句子前面是過去式，若表達現在仍成立的事實，子句可以維持現在式（例如 The teacher told us that water boils at 100°C.）。'
          }
        ],
        vocab: [
          { word: 'sentence', ipa: '/ˈsentəns/', pos: 'n.', def: '句子；判決', example: 'Write a complete sentence with a subject and a verb.' },
          { word: 'action', ipa: '/ˈækʃən/', pos: 'n.', def: '動作；行動', example: 'Actions speak louder than words.' },
          { word: 'habit', ipa: '/ˈhæbɪt/', pos: 'n.', def: '習慣', example: 'Reading every morning is a wonderful habit.' },
          { word: 'future', ipa: '/ˈfjuːtʃər/', pos: 'n./adj.', def: '未來；未來的', example: 'What are your future plans after graduating?' },
          { word: 'yesterday', ipa: '/ˈjestərdeɪ/', pos: 'adv./n.', def: '昨天', example: 'I visited my grandparents yesterday afternoon.' },
          { word: 'tomorrow', ipa: '/təˈmɔːroʊ/', pos: 'adv./n.', def: '明天', example: 'We will take an important English test tomorrow.' }
        ],
        phrases: [
          { phrase: 'used to + V', def: '過去習慣於（現在已不）', example: 'I used to play soccer after school, but now I prefer reading.' },
          { phrase: 'be going to + V', def: '打算；將要', example: 'They are going to travel to Tainan this weekend.' },
          { phrase: 'right now', def: '立刻；此時此刻', example: 'Please clean your bedroom right now.' },
          { phrase: 'from time to time', def: '偶爾；有時', example: 'Mia visits the local library from time to time.' }
        ],
        dialogue: [
          { speaker: 'Alex', text: 'Hey Beth, what are you doing right now?' },
          { speaker: 'Beth', text: 'I am finishing my English homework about verb tenses. Did you finish yours yesterday?' },
          { speaker: 'Alex', text: 'Yes, I did! I usually complete my assignments before dinner.' },
          { speaker: 'Beth', text: 'That is a great habit. Are you going to study for the science quiz tomorrow?' },
          { speaker: 'Alex', text: 'Definitely. Let us review the notes together in the library after class.' }
        ]
      },
      {
        id: 'j2',
        num: '02',
        title: '代名詞、限定詞與數量詞',
        subtitle: '主格・受格・所有格・反身代名詞與可數不可數量詞',
        curriculumCode: '3-Ⅳ-2 / 4-Ⅳ-1 / Ac-Ⅳ-2',
        stage: '第四學習階段 (國中 7–9 年級)',
        cefr: 'A2 (初級精熟)',
        competency: 'A1 身心素質與自我精進、B1 符號運用與溝通表達',
        learningPerformance: '辨析人稱代名詞四性格位（主格、受格、所有格、所有格代名詞）與反身代名詞功能；熟練可數與不可數名詞之數量詞修飾規則。',
        learningContent: 'Ac-Ⅳ-2 名詞與代名詞之性、數、格；數量詞 many/much, a few/a little 之肯定與否定語氣；常見不可數抽象物質名詞。',
        guideline: '國中教育會考數量詞與不可數名詞（information, news, advice, bread）辨析；反身代名詞作受詞（主受同人）與強調語氣命題規準。',
        concepts: [
          {
            heading: '代名詞的四性格位轉換與反身代名詞用法',
            body: '人稱代名詞分為主格 (I, you, he, she, it, we, they)、受格 (me, you, him, her, it, us, them)、所有格形容詞 (my, your, his, her, its, our, their) 與所有格代名詞 (mine, yours, his, hers, ours, theirs)。\n反身代名詞 (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) 兩大功能：\n1. 作受詞：主詞與受詞為同一個人時必須使用反身代名詞（He looked at himself in the mirror.）。\n2. 表強調：放於主詞或受詞後表示親自（I prepared the meal myself.）。',
            tip: '易錯點：its（所有格，它的）與 it\'s（縮寫，it is / it has）絕不可混淆！'
          },
          {
            heading: '數量詞修飾可數 vs 不可數名詞口訣',
            body: '1. 僅修飾可數複數名詞：many, several, a few（有一些，表肯定）, few（幾乎沒有，表否定）。\n2. 僅修飾不可數名詞：much, a little（有一些，表肯定）, little（幾乎沒有，表否定）。\n3. 兩者皆可修飾：some, any, a lot of, plenty of。\n注意：some 常用於肯定句與表示禮貌請求之疑問句（Would you like some tea?）；any 常用於否定句與一般疑問句。',
            tip: '會考關鍵：news, information, advice, furniture, bread, homework, luggage 皆為常見不可數名詞，絕不可加 -s！'
          }
        ],
        vocab: [
          { word: 'quantity', ipa: '/ˈkwɑːntəti/', pos: 'n.', def: '數量', example: 'Quality is often more important than quantity.' },
          { word: 'several', ipa: '/ˈsevrəl/', pos: 'adj./pron.', def: '數個；好幾個', example: 'There are several apples on the kitchen table.' },
          { word: 'furniture', ipa: '/ˈfɜːrnɪtʃər/', pos: 'n.', def: '家具 (不可數)', example: 'The living room has very little modern furniture.' },
          { word: 'information', ipa: '/ˌɪnfərˈmeɪʃən/', pos: 'n.', def: '資訊；情報 (不可數)', example: 'Can you give me some information about the museum tour?' },
          { word: 'myself', ipa: '/maɪˈself/', pos: 'pron.', def: '我自己', example: 'I prepared dinner for myself tonight.' },
          { word: 'amount', ipa: '/əˈmaʊnt/', pos: 'n.', def: '數量 (常接不可數名詞)', example: 'A large amount of money was spent on the new library.' }
        ],
        phrases: [
          { phrase: 'a lot of / lots of', def: '大量的（可數/不可數皆可）', example: 'We have a lot of time before the train departs.' },
          { phrase: 'a piece of', def: '一張；一片；一則', example: 'Let me share a useful piece of advice with you.' },
          { phrase: 'by oneself', def: '獨自；靠自己', example: 'The little boy solved the puzzle all by himself.' },
          { phrase: 'each other', def: '彼此；互相', example: 'The two classmates always help each other with math problems.' }
        ],
        dialogue: [
          { speaker: 'Ken', text: 'Lisa, do we have any bread left in the refrigerator?' },
          { speaker: 'Lisa', text: 'No, we have very little bread, but there is some cheese and milk.' },
          { speaker: 'Ken', text: 'I need to buy a few ingredients for dinner. How much money do you have?' },
          { speaker: 'Lisa', text: 'I have fifty dollars on me. Take it and buy the groceries yourself.' },
          { speaker: 'Ken', text: 'Thank you! I will bring back enough fruit for both of us.' }
        ]
      },
      {
        id: 'j3',
        num: '03',
        title: '疑問句、情態助動詞與生活溝通',
        subtitle: '5W1H・附加問句・情態助動詞與禮貌社交應答',
        curriculumCode: '1-Ⅳ-2 / 2-Ⅳ-1 / 2-Ⅳ-4 / Ac-Ⅳ-3',
        stage: '第四學習階段 (國中 7–9 年級)',
        cefr: 'A2 (初級精熟 · 生活交際)',
        competency: 'B1 符號運用與溝通表達、C2 人際關係與團隊合作',
        learningPerformance: '靈活運用 5W1H 疑問詞與附加問句獲取資訊；使用情態助動詞表達禮貌請求、允許、能力與義務。',
        learningContent: 'Ac-Ⅳ-3 疑問句結構、附加問句（前肯後否/前否後肯）；情態助動詞 can, could, may, must, should, would 語氣階梯。',
        guideline: '心測中心生活會話與聽力基本問答題型；附加問句特例（Let\'s go, shall we? / I am, aren\'t I?）與情態動詞後接原形動詞標準。',
        concepts: [
          {
            heading: '5W1H 疑問詞與附加問句 (Tag Questions) 規則',
            body: '1. 5W1H 資訊對焦：Who/Whose（人物/所有權）、What（事物）、When（時間）、Where（地點）、Why（原因）、How（方式/程度，衍生 How often 頻率、How long 時間長度、How far 距離）。\n2. 附加問句口訣：「前肯後否，前否後肯；時態代名詞需一致」。\n例句：She is a doctor, isn\'t she? / Tom didn\'t call, did he?\n注意特例：Let\'s go, shall we? / Open the window, will you? / I am right, aren\'t I?',
            tip: '解題關鍵：辨明問句需要的是哪種資訊維度，避免被選項中重複出現的相同單字誘騙。'
          },
          {
            heading: '情態助動詞語氣階梯與禮貌交際原則',
            body: '1. 請求幫忙：Can you...? $\to$ Could you please...? $\to$ Would you mind + V-ing...?\n2. 義務與建議：must（必須，命令強制）$>$ should / ought to（應該，建議勸告）$>$ had better（最好，帶警告口吻）。\n3. 禮貌應答原則：Would you mind opening the door? 若同意開門，需回答 "No, not at all." 或 "Of course not."（表示不介意）；若回答 "Yes"，則表示反對開門！',
            tip: '會考交際題每年必考：區別 You\'re welcome. / My pleasure. / Never mind. / Take it easy. 的適用場景。'
          }
        ],
        vocab: [
          { word: 'suggestion', ipa: '/səɡˈdʒestʃən/', pos: 'n.', def: '建議；提議', example: 'Do you have any suggestions for our weekend trip?' },
          { word: 'invitation', ipa: '/ˌɪnvɪˈteɪʃən/', pos: 'n.', def: '邀請；請帖', example: 'I received a birthday invitation from Peter.' },
          { word: 'polite', ipa: '/pəˈlaɪt/', pos: 'adj.', def: '有禮貌的', example: 'It is important to be polite when asking strangers for directions.' },
          { word: 'opinion', ipa: '/əˈpɪnjən/', pos: 'n.', def: '意見；看法', example: 'In my opinion, walking to school is healthier than taking the bus.' },
          { word: 'pleasure', ipa: '/ˈpleʒər/', pos: 'n.', def: '樂趣；榮幸', example: 'It was a pleasure meeting your family yesterday.' },
          { word: 'apology', ipa: '/əˈpɑːlədʒi/', pos: 'n.', def: '道歉', example: 'Please accept my sincere apology for being late.' }
        ],
        phrases: [
          { phrase: 'how about + V-ing', def: '……如何？（提議）', example: 'How about watching a comedy tonight?' },
          { phrase: 'would like to + V', def: '想要……（比 want 更客氣）', example: 'I would like to order a chicken sandwich, please.' },
          { phrase: 'never mind', def: '沒關係；別放在心上', example: 'You spilled some water? Never mind, I will clean it up.' },
          { phrase: 'help yourself to', def: '請自便；請自行取用', example: 'Help yourself to some fresh cookies and juice on the table.' }
        ],
        dialogue: [
          { speaker: 'David', text: 'Good afternoon, Emma! Would you like to go to the movies this Saturday?' },
          { speaker: 'Emma', text: 'I would love to! What movie are you planning to see?' },
          { speaker: 'David', text: 'How about the new animated film about space exploration?' },
          { speaker: 'Emma', text: 'Sounds wonderful. Where and when should we meet?' },
          { speaker: 'David', text: 'Let us meet in front of the theater ticket counter at two o\'clock.' }
        ]
      },
      {
        id: 'j4',
        num: '04',
        title: '連接詞與複句',
        subtitle: '對等連接詞・因果轉折・時間與條件副詞子句',
        curriculumCode: '3-Ⅳ-2 / 3-Ⅳ-6 / 4-Ⅳ-1 / Ac-Ⅳ-5',
        stage: '第四學習階段 (國中 7–9 年級)',
        cefr: 'A2+ (初級精熟進階)',
        competency: 'A2 系統思考與解決問題、B1 符號運用與溝通表達',
        learningPerformance: '區分對等連接詞（and, but, or, so）與從屬連接詞（because, although, if, when, while）；建立邏輯嚴密之複合句。',
        learningContent: 'Ac-Ⅳ-5 複句結構；時間與條件副詞子句；因果與轉折子句；禁用雙重連接詞語法規則。',
        guideline: '會考文法克漏字必考考點：條件句與時間子句「現在式代未來式」；禁用「Although... but...」與「Because... so...」命題偵錯。',
        concepts: [
          {
            heading: '對等連接詞 vs 從屬連接詞的核心禁忌',
            body: '1. 對等連接詞：FANBOYS（for, and, nor, but, or, yet, so），連接兩個文法地位相等的字、片語或獨立子句。\n2. 從屬連接詞：引導副詞子句修飾主要子句。\n- 表原因：because, since, as\n- 表轉折讓步：although, though, even though\n- 表條件：if（如果）, unless（除非 = if not）\n- 表時間：when, while, before, after, until, as soon as',
            tip: '台式英文大雷區：Because 與 so 絕不能同時出現在同一句！Although 與 but 也絕不能同時出現在同一句！'
          },
          {
            heading: '副詞子句中「現在式代替未來式」規則',
            body: '在由 if（如果）、when（當……時）、as soon as（一……就）所引導的時間或條件副詞子句中，若主要子句使用未來式，副詞子句內必須使用「現在簡單式代替未來式」。\n例句：We will go hiking tomorrow if it does not rain.（條件子句用 does not rain，不可用 will not rain）。',
            tip: '會考每年必考重點！請辨明 if 是引導名詞子句（是否）還是副詞子句（如果）。'
          }
        ],
        vocab: [
          { word: 'although', ipa: '/ɔːlˈðoʊ/', pos: 'conj.', def: '雖然；儘管', example: 'Although it was raining heavily, the soccer match continued.' },
          { word: 'because', ipa: '/bɪˈkɔːz/', pos: 'conj.', def: '因為', example: 'He stayed home because he caught a bad cold.' },
          { word: 'unless', ipa: '/ənˈles/', pos: 'conj.', def: '除非 (等于 if not)', example: 'You will fail the exam unless you study harder.' },
          { word: 'condition', ipa: '/kənˈdɪʃən/', pos: 'n.', def: '條件；狀況', example: 'The old bicycle is still in excellent working condition.' },
          { word: 'result', ipa: '/rɪˈzʌlt/', pos: 'n.', def: '結果', example: 'The test results will be announced next Monday.' },
          { word: 'reason', ipa: '/ˈriːzən/', pos: 'n.', def: '原因；理由', example: 'What was your main reason for choosing this topic?' }
        ],
        phrases: [
          { phrase: 'as soon as', def: '一……就……', example: 'I will call you as soon as I arrive at the train station.' },
          { phrase: 'even though', def: '即使；縱然（語氣比 although 強）', example: 'Even though he was tired, he kept practicing the piano.' },
          { phrase: 'so that + S + can/may', def: '以便於；為了能夠……', example: 'She woke up early so that she could catch the first bus.' },
          { phrase: 'either... or...', def: '不是……就是……（兩者擇一）', example: 'You can either have vanilla ice cream or chocolate cake.' }
        ],
        dialogue: [
          { speaker: 'Sam', text: 'Tina, look outside! Heavy dark clouds are gathering quickly.' },
          { speaker: 'Tina', text: 'Yes, although the morning weather forecast promised clear skies, it looks like rain now.' },
          { speaker: 'Sam', text: 'Should we postpone our outdoor picnic if it starts to rain?' },
          { speaker: 'Tina', text: 'Yes, unless the rain stops within twenty minutes, let us move to the indoor café.' },
          { speaker: 'Sam', text: 'Good idea. I will pack the food so that nothing gets wet.' }
        ]
      },
      {
        id: 'j5',
        num: '05',
        title: '短文閱讀與生活應用文本',
        subtitle: '公告・表格・菜單資訊檢索與推論技巧',
        curriculumCode: '3-Ⅳ-4 / 3-Ⅳ-6 / Ad-Ⅳ-1 / Ad-Ⅳ-2',
        stage: '第四學習階段 (國中 7–9 年級)',
        cefr: 'A2 ~ Pre-B1 (跨文本素養閱讀)',
        competency: 'B2 科技資訊與媒體素養、C3 多元文化與國際理解',
        learningPerformance: '閱讀真實生活文本（如時刻表、海報、菜單、通訊記錄、地圖）；綜合擷取關鍵事實並進行合理推論文意。',
        learningContent: 'Ad-Ⅳ-1 生活實用文本；Ad-Ⅳ-2 圖表、圖示與數據轉譯；篇章主旨與細節事實交叉驗證。',
        guideline: '心測中心 109–115 會考多模態題組命題規範：星號附註條件、雙文本資訊比對、排比圖表題之排除干擾選項原則。',
        concepts: [
          {
            heading: '生活應用文本的 Scanning 掃描定位術',
            body: '會考生活題型（公共告示、公車班表、菜單價目表、展覽入場券、活動海報）不需從頭逐字精讀，應先看題目任務：\n1. 找價格/折扣：先定位 $ 符號、discount、special offer、half-price、buy one get one free。\n2. 找時間限制：定位 opening hours、valid until、deadline、daily except Sunday。\n3. 找對象限制：定位 under 12、students only、residents、accompanied by an adult。',
            tip: '特別留意「排除性詞彙」：free refill only with reusable cup（未帶指定杯即無法享優惠）。'
          },
          {
            heading: '文章主旨題 (Main Purpose / Idea) 的拆解',
            body: '第一段首尾句與最後一段總結句最關鍵。主旨題選項特徵：\n- 正確選項：高度概括、覆蓋全文核心目的。\n- 常見陷阱：過於細節（僅為某一段之佐證例子）、過度誇大（出現 always, never, completely 等極端詞）、反客為主（選項內容文章有提到，但不是作者主要目的）。',
            tip: '找證據：每一個閱讀題答案，都必須在文章中畫出對應的句子或圖表數據支撐。'
          }
        ],
        vocab: [
          { word: 'notice', ipa: '/ˈnoʊtɪs/', pos: 'n./v.', def: '通知；告示；注意到', example: 'Please read the safety notice posted on the door.' },
          { word: 'schedule', ipa: '/ˈskedʒuːl/', pos: 'n./v.', def: '時程表；行程；安排', example: 'The bus schedule changes during public holidays.' },
          { word: 'discount', ipa: '/ˈdɪskaʊnt/', pos: 'n.', def: '折扣；打折', example: 'Students are entitled to a twenty percent discount.' },
          { word: 'entrance', ipa: '/ˈentrəns/', pos: 'n.', def: '入口；入場', example: 'The entrance fee to the botanical garden is five dollars.' },
          { word: 'available', ipa: '/əˈveɪləbəl/', pos: 'adj.', def: '可取得的；有空的', example: 'Are there any seats available near the window?' },
          { word: 'reusable', ipa: '/ˌriːˈjuːzəbəl/', pos: 'adj.', def: '可重複使用的', example: 'Bring your own reusable shopping bag to protect the environment.' }
        ],
        phrases: [
          { phrase: 'look forward to + V-ing/N', def: '期待；盼望', example: 'We are all looking forward to our summer vacation.' },
          { phrase: 'free of charge', def: '免費', example: 'Wi-Fi connection is provided free of charge throughout the hotel.' },
          { phrase: 'sign up for', def: '報名參加……', example: 'Over one hundred students signed up for the speech contest.' },
          { phrase: 'due to + N', def: '因為；由於', example: 'The outdoor concert was canceled due to bad weather.' }
        ],
        dialogue: [
          { speaker: 'Clara', text: 'Excuse me, Brian. What does this museum announcement say?' },
          { speaker: 'Brian', text: 'It says the modern art exhibition will be closed next Monday for maintenance.' },
          { speaker: 'Clara', text: 'Are tickets discounted if we visit as a school group this Friday?' },
          { speaker: 'Brian', text: 'Yes! Groups of ten or more get a thirty percent discount, and audio guides are free of charge.' },
          { speaker: 'Clara', text: 'Terrific! Let us sign up our whole study group right now.' }
        ]
      },
      {
        id: 'j6',
        num: '06',
        title: '聽力辨識與語音線索',
        subtitle: '連音・弱化・語音轉折與關鍵數字聽辨',
        curriculumCode: '1-Ⅳ-1 / 1-Ⅳ-2 / 1-Ⅳ-3 / Ab-Ⅳ-1',
        stage: '第四學習階段 (國中 7–9 年級)',
        cefr: 'A2 (聽力評量精熟)',
        competency: 'B1 符號運用與溝通表達、A1 身心素質與自我精進',
        learningPerformance: '聽辨英語母語者弱化音、連音（Connected Speech）、同化與省音；辨識對話語氣、重音位置與時間數字資訊。',
        learningContent: 'Ab-Ⅳ-1 常用音標發音規則；語音弱化（schwa /ə/）；言談重音與語調所傳達之情感與隱含態度。',
        guideline: '國中教育會考英語聽力測驗三大題型（辨識句意、基本問答、言談理解）命題準則；常見數字陷阱（-teen vs -ty）與轉折詞聽辨規準。',
        concepts: [
          {
            heading: '美語語流中的弱化與連音規律',
            body: '1. 子音連母音 (Consonant-Vowel Linking)：當前字結尾是子音、後字開頭是母音時，兩者會自然連綴。例如：pick it up 聽起來像 [pɪ-kɪ-tʌp]；give up 像 [gɪ-vʌp]。\n2. 弱化音 (Schwa /ə/)：功能詞如 to, for, at, and, can 在流暢語速中母音會弱化成 /ə/。例如：I can do it 中的 can 念成 /kən/，而否定 can\'t 則保留飽滿母音並重讀 /kænt/。\n3. Flap T (輕拍音)：在兩母音間的 /t/ 或 /d/，美語常發成類似短促的 /d/ 或 /ɾ/。例如：water 像 [wɑː-dər]，better 像 [be-dər]。',
            tip: '掌握「內容詞（名詞、動詞、形容詞）重讀，功能詞（冠詞、介系詞、代名詞）輕讀」的英文節奏感。'
          },
          {
            heading: '數字與混淆時間的聽力陷阱',
            body: '1. -teen vs -ty 的重音辨別：thirteen /ˌθɜːrˈtiːn/ 重音在第二音節且結尾有清晰鼻音 /n/；thirty /ˈθɜːrti/ 重音在第一音節，結尾是短促母音。\n2. 時間的兩種讀法：half past six = 6:30；a quarter to seven = 6:45；a quarter past eight = 8:15。\n3. 否定與語氣轉折：注意 actually, however, in fact, unfortunately 之後出現的資訊往往推翻前面說法！',
            tip: '聽力技巧：利用播音前的幾秒鐘瀏覽題幹選項，預測對話情境是醫院、機場、餐廳還是學校。'
          }
        ],
        vocab: [
          { word: 'pronounce', ipa: '/prəˈnaʊns/', pos: 'v.', def: '發音；讀出', example: 'How do you pronounce this scientific term correctly?' },
          { word: 'accent', ipa: '/ˈæksent/', pos: 'n.', def: '口音；腔調', example: 'She speaks English with a lovely Canadian accent.' },
          { word: 'rhythm', ipa: '/ˈrɪðəm/', pos: 'n.', def: '節奏；韻律', example: 'English has a natural stress-timed rhythm.' },
          { word: 'reduction', ipa: '/rɪˈdʌkʃən/', pos: 'n.', def: '語音弱化；減少', example: 'Vowel reduction is very common in casual conversation.' },
          { word: 'receipt', ipa: '/rɪˈsiːt/', pos: 'n.', def: '收據 (p不發音)', example: 'Please keep your payment receipt in case you want to return the shirt.' },
          { word: 'direction', ipa: '/dɪˈrekʃən/', pos: 'n.', def: '方向；指示', example: 'Could you give me directions to the central bus station?' }
        ],
        phrases: [
          { phrase: 'pay attention to', def: '注意；專注於', example: 'Please pay attention to the flight departure announcement.' },
          { phrase: 'check out', def: '結帳；辦理退房', example: 'Guests are required to check out before eleven in the morning.' },
          { phrase: 'run out of', def: '用盡；耗盡', example: 'Our printer has run out of black ink.' },
          { phrase: 'catch up with', def: '趕上；跟上進度', example: 'She studied hard during the weekend to catch up with her classmates.' }
        ],
        dialogue: [
          { speaker: 'Barista', text: 'Welcome to Sunrise Coffee! Can I take your order?' },
          { speaker: 'Customer', text: 'Hi! I would like a large latte and two blueberry muffins, please.' },
          { speaker: 'Barista', text: 'Sure thing. That comes to thirteen dollars and fifty cents.' },
          { speaker: 'Customer', text: 'Did you say thirty dollars or thirteen dollars?' },
          { speaker: 'Barista', text: 'Thirteen dollars and fifty cents, sir. Here is your receipt.' }
        ]
      },
      {
        id: 'j7',
        num: '07',
        title: '會考英語整合與訂正策略',
        subtitle: '題型總複習・錯題歸因分析・跨日提取策略',
        curriculumCode: '3-Ⅳ-2 / 5-Ⅳ-1 / 5-Ⅳ-2 / Ac-Ⅳ-1',
        stage: '第四學習階段 (國中 7–9 年級會考總複習)',
        cefr: 'A2+ (國中會考 A++ 標竿)',
        competency: 'A2 系統思考與解決問題、A3 規劃執行與創新應變',
        learningPerformance: '建立全方位錯題歸因 X 光機診斷機制；掌握考場 42 項避雷法則與篇章克漏字雙向定錨策略。',
        learningContent: '國中 1200 核心詞彙與高頻片語總盤點；全考科時態句型陷阱雷達；間隔重複與大考考前衝刺檢核清單。',
        guideline: '教育部會考英語科答對題數與精熟門檻（A++、A+、A）換算標準；考前 10 分鐘必備避雷指南與時間分配配速標準。',
        concepts: [
          {
            heading: '會考全卷結構與 60 分鐘配速策略',
            body: '國中會考英語科包含閱讀測驗（單題 15–20 題，題組 23–25 題，共 40–43 題，作答時間 60 分鐘）與聽力測驗（約 21 題，作答時間約 25 分鐘）。\n配速黃金時間表：\n- 00–15 分鐘：完成全部單題（單字、文法、基本情境），平均每題不超過 45 秒。\n- 15–48 分鐘：完成全部閱讀題組，每組長文控制在 4–6 分鐘內。\n- 48–60 分鐘：全面檢查答案卡劃記，回頭重審標記待查的 1–2 道難題。',
            tip: '千萬不可在一道爭議題卡住超過 2 分鐘，先順手做記號並跳過，保持作答節奏流暢！'
          },
          {
            heading: '高成效錯題訂正四步法（Reflective Remediation）',
            body: '刷題不能只看分數，必須落實錯題歸因四步：\n1. 錯因定位：標註是「單字不識」、「句法混淆」、「時間緊迫」還是「推論過度」。\n2. 證據重找：在原文用螢光筆標出決定正確選項的具體句子。\n3. 干擾項反思：寫下一句話解釋「當初為什麼選了那個錯誤選項」。\n4. 隔週同構題檢驗：7 天後用不同情境但相同文法/推理結構的新題進行盲測。',
            tip: '不把同一題目反覆做十遍；只有在陌生文本中能穩定答對，才代表真正習得遷移能力！'
          }
        ],
        vocab: [
          { word: 'strategy', ipa: '/ˈstrætədʒi/', pos: 'n.', def: '策略；戰略', example: 'A sensible time-management strategy is crucial for the exam.' },
          { word: 'accuracy', ipa: '/ˈækjərəsi/', pos: 'n.', def: '準確性；精確度', example: 'Focus on accuracy before trying to increase your reading speed.' },
          { word: 'passage', ipa: '/ˈpæsɪdʒ/', pos: 'n.', def: '短文；篇章；走廊', example: 'Read the following passage and answer the three questions below.' },
          { word: 'conclusion', ipa: '/kənˈkluːʒən/', pos: 'n.', def: '結論；結尾', example: 'What conclusion can be drawn from the survey data?' },
          { word: 'context', ipa: '/ˈkɑːntekst/', pos: 'n.', def: '語境；上下文', example: 'Guess the meaning of unfamiliar words from their surrounding context.' },
          { word: 'remedy', ipa: '/ˈremədi/', pos: 'n./v.', def: '補救；補償；治療', example: 'Active recall is the best remedy for weak vocabulary retention.' }
        ],
        phrases: [
          { phrase: 'in terms of', def: '就……而言；在……方面', example: 'In terms of difficulty, this reading comprehension is quite manageable.' },
          { phrase: 'make sense', def: '有道理；講得通', example: 'Does this grammatical explanation make sense to you?' },
          { phrase: 'figure out', def: '想出；弄明白', example: 'Can you figure out why the author used this specific metaphor?' },
          { phrase: 'keep in mind that', def: '牢記；請記住……', example: 'Keep in mind that the exam will end strictly at eleven sharp.' }
        ],
        dialogue: [
          { speaker: 'Teacher', text: 'Leo, you made steady progress in today\'s mock exam, scoring forty out of forty-three!' },
          { speaker: 'Leo', text: 'Thank you, Ms. Lin! But I still struggled with the last reading comprehension passage.' },
          { speaker: 'Teacher', text: 'Let us figure out the reason together. Did you run out of time, or was the vocabulary too dense?' },
          { speaker: 'Leo', text: 'I spent too long on question thirty-two, so I had to rush through the final two questions.' },
          { speaker: 'Teacher', text: 'Keep in mind that pacing is everything. Next time, follow our time-allocation strategy strictly!' }
        ]
      }
    ]
  },
  {
    id: 'sh',
    title: '高中英文｜學測與統測共通能力',
    badge: '高中 10–12 年級 · 升學衝刺高分線 (108 課綱與 115 新制)',
    intro: '深度對標 108 課綱普通高中英語文：涵蓋高中 7000 核心詞彙與精確搭配、分詞構句與倒裝句型、115 學測四空五選篇章結構、科普長篇雙文比較、中譯英思維轉換、大考 20 分作文論證與 100 分鐘實戰配速。',
    chapters: [
      {
        id: 's1',
        num: '01',
        title: '高中句法與長難句拆解',
        subtitle: '分詞構句・關係子句・倒裝與假設語氣',
        curriculumCode: '3-Ⅴ-2 / 4-Ⅴ-1 / Ac-Ⅴ-1',
        stage: '第五學習階段 (高中 10–12 年級)',
        cefr: 'B1+ (高中學測前標)',
        competency: 'A2 系統思考與解決問題、B1 符號運用與溝通表達',
        learningPerformance: '解構長難句之核心骨架；熟練分詞構句、關係代名詞子句、讓步倒裝句與分裂強調句之語意轉換與書寫。',
        learningContent: 'Ac-Ⅴ-1 進階句法結構；分詞構句（主動V-ing/被動p.p.）；與現在/過去事實相反之假設語氣；省略if之倒裝句型。',
        guideline: '大考中心學測英文科長句分析能力規準；中譯英非選大題主從句結構對稱性與動詞時態一致性評分規準。',
        concepts: [
          {
            heading: '分詞構句 (Participle Clauses) 的化簡與還原',
            body: '當副詞子句主詞與主要子句主詞相同時，可省略連接詞與主詞，將動詞改為分詞：\n1. 主動語態：改為 V-ing（例：Feeling exhausted after the marathon, Jack fell asleep immediately. 原句：Because he felt exhausted...）。\n2. 被動語態：改為 V-p.p.（例：Surrounded by mountains, the village enjoys cool weather year-round. 原句：Because it is surrounded...）。\n3. 獨立分詞構句：兩子句主詞不同時，須保留副詞子句之主詞（例：Weather permitting, we will set sail tomorrow.）。',
            tip: '判斷訣竅：找出主要子句主詞，反問自己「這個主詞發出動作還是承受動作」，主動必用 V-ing，被動必用 V-p.p.！'
          },
          {
            heading: '否定副詞置首倒裝與假設語氣倒裝',
            body: '1. 否定副詞倒裝：當 Not only, Seldom, Rarely, Scarcely, Never, Under no circumstances 置於句首時，句子須採疑問句語序倒裝。\n例句：Seldom has she encountered such an intricate scientific problem.\n2. 假設語氣 If 省略倒裝：\n- 與現在事實相反：Were I you, I would take the offer. (原 If I were you...)\n- 與過去事實相反：Had he studied harder, he would have passed. (原 If he had studied...)\n- 與未來極不可能發生：Should it rain tomorrow, the ceremony will be held indoors.',
            tip: '學測翻譯與綜合測驗特高頻考點！'
          }
        ],
        vocab: [
          { word: 'clause', ipa: '/klɔːz/', pos: 'n.', def: '子句；條款', example: 'A complex sentence contains an independent clause and at least one dependent clause.' },
          { word: 'inversion', ipa: '/ɪnˈvɜːrʒən/', pos: 'n.', def: '倒裝；倒置', example: 'Subject-auxiliary inversion adds rhetorical emphasis to formal written prose.' },
          { word: 'subjunctive', ipa: '/səbˈdʒʌŋktɪv/', pos: 'adj./n.', def: '虛擬語氣的；假設語氣', example: 'The subjunctive mood expresses hypothetical situations or wishes.' },
          { word: 'simultaneously', ipa: '/ˌsaɪməlˈteɪniəsli/', pos: 'adv.', def: '同時地', example: 'The software can process multiple data streams simultaneously.' },
          { word: 'hypothesis', ipa: '/haɪˈpɑːθəsɪs/', pos: 'n.', def: '假說；假設 (複數 hypotheses)', example: 'The researchers proposed a bold hypothesis to explain the unexpected anomaly.' },
          { word: 'participial', ipa: '/ˌpɑːrtɪˈsɪpiəl/', pos: 'adj.', def: '分詞的', example: 'A participial phrase functions as an adjective modifying a noun.' }
        ],
        phrases: [
          { phrase: 'under no circumstances', def: '絕不；無論如何都不（句首須倒裝）', example: 'Under no circumstances should students share their examination passwords.' },
          { phrase: 'were it not for + N', def: '若非……（與現在事實相反）', example: 'Were it not for your timely guidance, I would still be confused.' },
          { phrase: 'no sooner... than...', def: '剛……就……（前句倒裝用 had + p.p.）', example: 'No sooner had she stepped outside than a torrential downpour started.' },
          { phrase: 'as if / as though', def: '彷彿；好像', example: 'He spoke with absolute authority, as if he had witnessed the incident himself.' }
        ],
        dialogue: [
          { speaker: 'Professor', text: 'Notice how the author structures this compound sentence in the opening paragraph.' },
          { speaker: 'Student', text: 'Yes, she used a participial phrase at the start: "Having reviewed thousands of documents, the committee reached a verdict."' },
          { speaker: 'Professor', text: 'Exactly. It avoids repetitive subject pronouns and elevates the academic tone.' },
          { speaker: 'Student', text: 'And in the second line, she placed "Rarely" at the beginning, triggering subject-auxiliary inversion!' },
          { speaker: 'Professor', text: 'Brilliant observation. Master these syntactic patterns, and your essays will achieve a C1 fluency.' }
        ]
      },
      {
        id: 's2',
        num: '02',
        title: '篇章結構與四空五選策略',
        subtitle: '語意鉤子・代名詞指涉・115 新制干擾選項排除',
        curriculumCode: '3-Ⅴ-1 / 3-Ⅴ-2 / Ab-Ⅴ-2',
        stage: '第五學習階段 (高中 10–12 年級)',
        cefr: 'B2 (高中學測頂標)',
        competency: 'A2 系統思考與解決問題、B1 符號運用與溝通表達',
        learningPerformance: '分析論說文篇章銜接機制（Cohesive Devices）；掌握代名詞前指/後指、時空順序、反差轉折與因果鏈條。',
        learningContent: 'Ab-Ⅴ-2 篇章組織標記；段落主題句（Topic Sentence）與支持句邏輯扣連；干擾選項之同義代換破綻。',
        guideline: '111–115 新型學測「篇章結構（四空五選 / 五空五選）」雙向細目表；段落前後上下文句法語意雙向定錨解題規範。',
        concepts: [
          {
            heading: '115 學年度大考篇章結構改制核心因應',
            body: '大考中心自 115 學年度起，學測英文篇章結構題採「四個空格、五個選項（4空5選）」。\n這意味著必定會有一個「極具誘惑力之多餘干擾項（Distractor）」。\n破解策略：\n1. 閱讀前先讀五個選項，圈出每個選項的核心主題詞、轉折詞（However, Furthermore, Consequently）與代名詞（these, such, they, it）。\n2. 逐格分析前後文的「邏輯語意鉤子（Semantic Hooks）」：\n- 順承延伸：前後話題一致，尋找同義字替換或例證。\n- 轉折反駁：前後立場相反，必須有對比性字詞。\n- 因果推導：前句是原因，本句是結果，或反之。',
            tip: '切記：代名詞的人稱、數與指涉對象要合理；格位由代名詞在自己子句中的功能決定，不需與先行詞的格相同，這是排除干擾項最強的鐵證！'
          },
          {
            heading: '段落連貫性 (Cohesion) 與過渡副詞家族',
            body: '1. 表補充添加：furthermore, moreover, in addition, besides.\n2. 表對比轉折：however, nevertheless, on the contrary, conversely, yet.\n3. 表因果結論：therefore, consequently, accordingly, as a result, hence.\n4. 表舉例說明：for instance, to illustrate, specifically, in particular.\n5. 表讓步重申：granted that, even so, in any case, all the same.',
            tip: '將過渡詞替換回文章中唸一次，若語氣不通或邏輯跳躍，該選項立馬排除。'
          }
        ],
        vocab: [
          { word: 'cohesion', ipa: '/koʊˈhiːʒən/', pos: 'n.', def: '銜接；凝聚力', example: 'Lexical repetition and transitional adverbs enhance textual cohesion.' },
          { word: 'coherence', ipa: '/koʊˈhɪrəns/', pos: 'n.', def: '連貫性；條理性', example: 'The argument lacks logical coherence because the premises contradict each other.' },
          { word: 'transition', ipa: '/trænˈzɪʃən/', pos: 'n.', def: '過渡；轉變', example: 'Smooth transitions between paragraphs help readers follow complex reasoning.' },
          { word: 'distractor', ipa: '/dɪˈstræktər/', pos: 'n.', def: '干擾選項；誘答項', example: 'A good multiple-choice item features plausible yet clearly incorrect distractors.' },
          { word: 'subsequent', ipa: '/ˈsʌbsɪkwənt/', pos: 'adj.', def: '隨後的；後來的', example: 'Subsequent experimental trials confirmed the validity of the preliminary data.' },
          { word: 'preceding', ipa: '/prɪˈsiːdɪŋ/', pos: 'adj.', def: '在前的；前面的', example: 'Refer back to the preceding paragraph to understand why this conclusion was reached.' }
        ],
        phrases: [
          { phrase: 'on the contrary', def: '相反地；反之', example: 'He is not arrogant; on the contrary, he is remarkably humble.' },
          { phrase: 'in light of', def: '有鑑於；考慮到', example: 'In light of recent developments, we must revise our project timeline.' },
          { phrase: 'nevertheless', def: '然而；儘管如此', example: 'The experimental design was flawed; nevertheless, it yielded intriguing insights.' },
          { phrase: 'by the same token', def: '同理；基於同樣的理由', example: 'We must respect local customs, and by the same token, visitors should respect ours.' }
        ],
        dialogue: [
          { speaker: 'Claire', text: 'I am struggling with the fifth option in this 4-hole-5-option practice test.' },
          { speaker: 'Jason', text: 'Option D mentions "These unexpected consequences," but look at paragraph three.' },
          { speaker: 'Claire', text: 'Paragraph three discusses positive breakthroughs, not negative consequences!' },
          { speaker: 'Jason', text: 'Exactly! Option D is the artificial distractor designed to trick students who only look at the word "consequences."' },
          { speaker: 'Claire', text: 'That makes total sense. The cohesive tie requires a plural noun indicating harm earlier in the text.' }
        ]
      },
      {
        id: 's3',
        num: '03',
        title: '學術長篇閱讀與雙文比較',
        subtitle: '科普社科篇章・作者語氣推論・跨文本觀點整合',
        curriculumCode: '3-Ⅴ-3 / 3-Ⅴ-4 / Ae-Ⅴ-1',
        stage: '第五學習階段 (高中 10–12 年級)',
        cefr: 'B2 (學術跨域閱讀)',
        competency: 'B2 科技資訊與媒體素養、C3 多元文化與國際理解',
        learningPerformance: '深度閱讀科技、人文、生態科普學術長篇文本；比對雙文本之共同論述焦點與互斥觀點，推論作者潛在語氣立場。',
        learningContent: 'Ae-Ⅴ-1 當代全球議題；人工智慧演算法、循環經濟ESG、生物多樣性；雙文本觀點比較與表格轉譯。',
        guideline: '大考中心學測混合題型（選擇+非選擇）命題指引：手寫摘錄關鍵詞、字數嚴格限制、圖表轉譯評分標準。',
        concepts: [
          {
            heading: '學術長篇的主旨、細節與作者態度推論',
            body: '學測與統測閱讀題組篇幅日漸拉長（每篇 350–450 字），常涉及認知神經科學、氣候變遷、社會學、科技倫理等領域：\n1. 主旨題 (Central Theme)：問全文最恰當的標題或主旨。注意段落開頭的 Topic Sentences。\n2. 事實與細節題 (Fact & Detail)：題幹常含「According to the passage」，答案必須在文章中找到一一對應的 paraphrased 語句，禁止加入個人外部先備常識。\n3. 作者語氣題 (Tone & Attitude)：分析文章中修飾語之色彩：\n- 客觀中立：objective, neutral, impartial, analytical\n- 懷疑保留：skeptical, critical, reserved, doubtful\n- 支持讚揚：sympathetic, supportive, enthusiastic, approving\n- 憂心警惕：cautious, alarmed, concerned, pessimistic',
            tip: '若文章通篇呈現兩造實驗證據且未做價值判斷，語氣通常是 objective 或 analytical。'
          },
          {
            heading: '雙篇文本與圖表跨文本整合題攻略',
            body: '108 課綱強調「素養導向與跨領域整合」，學測常出現雙文本題（Text A 贊成基因編輯，Text B 指出潛在生態災難）：\n1. 閱讀前先讀題目：明確題幹是問 Text A 的立場、Text B 的反駁、還是兩者的共同交集 (Common Ground)。\n2. 畫十字矩陣：在草稿紙快速標記 [Text A 主張/證據] 與 [Text B 主張/證據]。\n3. 圖表比對：若附有統計長條圖或趨勢折線圖，檢查坐標軸單位 (%, thousands, ratio)，避免數值換算陷阱。',
            tip: '跨文本題常考「Text B 的作者最可能如何回應 Text A 第三段的某項宣稱」，這是典型 GRE/SAT 邏輯推論題型！'
          }
        ],
        vocab: [
          { word: 'skeptical', ipa: '/ˈskeptɪkəl/', pos: 'adj.', def: '懷疑的；持保留態度的', example: 'Scholars remain skeptical about the claims until reproducible evidence is published.' },
          { word: 'objective', ipa: '/əbˈdʒektɪv/', pos: 'adj./n.', def: '客觀的；目標', example: 'Scientists strive to maintain an objective perspective when analyzing empirical data.' },
          { word: 'implication', ipa: '/ˌɪmplɪˈkeɪʃən/', pos: 'n.', def: '意涵；可能影響；暗示', example: 'The widespread adoption of generative AI has profound ethical implications.' },
          { word: 'synthesis', ipa: '/ˈsɪnθəsɪs/', pos: 'n.', def: '綜合；整合 (複數 syntheses)', example: 'The final chapter provides an illuminating synthesis of both theoretical models.' },
          { word: 'correlation', ipa: '/ˌkɔːrəˈleɪʃən/', pos: 'n.', def: '相關性；相互關聯', example: 'Correlation does not necessarily imply direct causation.' },
          { word: 'empirical', ipa: '/ɪmˈpɪrɪkəl/', pos: 'adj.', def: '經驗主義的；實證的', example: 'Empirical investigations are essential to substantiate theoretical conjectures.' }
        ],
        phrases: [
          { phrase: 'shed light on', def: '闡明；揭示；解釋清楚', example: 'Recent neuroimaging studies shed light on how memories consolidate during sleep.' },
          { phrase: 'attribute A to B', def: '將 A 歸因於 B', example: 'Historians attribute the economic boom to rapid technological modernization.' },
          { phrase: 'take into account', def: '考慮到；顧及', example: 'The urban planning committee must take environmental sustainability into account.' },
          { phrase: 'play a vital role in', def: '在……中扮演不可或缺的角色', example: 'Metacognitive reflection plays a vital role in successful autonomous learning.' }
        ],
        dialogue: [
          { speaker: 'Dr. Evans', text: 'In Text A, the economist claims that remote work invariably boosts overall workforce productivity.' },
          { speaker: 'Reporter', text: 'However, in Text B, the sociologist highlights the erosion of informal social mentorship among junior staff.' },
          { speaker: 'Dr. Evans', text: 'Precisely. What would the author of Text B say to the author of Text A?' },
          { speaker: 'Reporter', text: 'Text B would argue that Text A overlooks long-term organizational health by focusing solely on short-term output metrics.' },
          { speaker: 'Dr. Evans', text: 'Spot on! That is exactly how to synthesize contrasting academic viewpoints.' }
        ]
      },
      {
        id: 's4',
        num: '04',
        title: '高中核心詞彙與精確搭配詞',
        subtitle: '7000 詞字根構詞・語域辨義・核心搭配語塊',
        curriculumCode: '3-Ⅴ-1 / 4-Ⅴ-1 / Ab-Ⅴ-1',
        stage: '第五學習階段 (高中 10–12 年級)',
        cefr: 'B1 ~ B2 (7000詞彙精熟)',
        competency: 'A1 身心素質與自我精進、B1 符號運用與溝通表達',
        learningPerformance: '活用高中 7000 核心詞彙之字首、字根、字尾構詞衍生規律；精準掌握正式語域（Formal Register）與道地固定搭配詞（Collocations）。',
        learningContent: 'Ab-Ⅴ-1 高階學術詞彙；動詞+名詞搭配（e.g. conduct research, reach consensus）；介系詞慣用搭配；文意選填四色詞性定位。',
        guideline: '學測第一大題詞彙題（1–10 題）語境搭配命題規準；文意選填十大詞性標記（動詞時態、名詞單複數、形容詞/副詞）排除法。',
        concepts: [
          {
            heading: '字根、字首與字尾 (Morphology) 快速倍增字彙量',
            body: '高中 7000 詞不可死記字母，掌握拉丁與希臘構詞字根能推導數千生字：\n1. 常見字首 (Prefixes)：\n- bene-（良好）：beneficial（有益的）, benevolent（仁慈的）\n- mal-（不良）：malfunction（故障）, malicious（懷惡意的）\n- chron-（時間）：chronological（按時間順序的）, synchronize（同步）\n- syn-/sym-（共同）：synthesis（綜合）, symmetry（對稱）\n2. 核心字根 (Roots)：\n- duct/duc（引導）：conduct, produce, reduce, induce\n- spect/spic（觀看）：inspect, retrospective, conspicuous\n- scrib/script（書寫）：describe, prescribe, transcript',
            tip: '遇到長單字先拆分「字首＋字根＋字尾」，辨別詞性與核心語意方向（正向/負向/中性）。'
          },
          {
            heading: '大考決勝關鍵：動名與介系詞搭配詞 (Collocations)',
            body: '學測綜合測驗（克漏字）與文意選填，70% 考點在於固定的詞語搭配（Collocations）：\n- 動詞＋名詞：conduct an experiment（進行實驗，不說 do an experiment）、reach a consensus（達成共識）、draw a conclusion（得出結論）、pose a threat（構成威脅）。\n- 形容詞＋名詞：a heavy smoker（老菸槍，不說 big smoker）、fierce competition（激烈競爭）、substantial evidence（充分證據）。\n- 專屬介系詞搭配：be prone to + N/V-ing（易於……）、interfere with（干擾）、conform to（符合；遵守）。',
            tip: '背單字務必連同動詞搭配詞與介系詞整塊記憶（Chunking），寫作與翻譯才能自然地道！'
          }
        ],
        vocab: [
          { word: 'beneficial', ipa: '/ˌbenɪˈfɪʃəl/', pos: 'adj.', def: '有益的；有利的', example: 'Regular aerobic exercise is highly beneficial to cardiovascular health.' },
          { word: 'inevitable', ipa: '/ɪnˈevɪtəbəl/', pos: 'adj.', def: '不可避免的；必然的', example: 'Technological disruption in traditional industries is virtually inevitable.' },
          { word: 'controversial', ipa: '/ˌkɑːntrəˈvɜːrʃəl/', pos: 'adj.', def: '具爭議性的', example: 'The government proposed a controversial policy on nuclear energy development.' },
          { word: 'substantial', ipa: '/səbˈstænʃəl/', pos: 'adj.', def: '大量的；實質的；可觀的', example: 'The company invested a substantial sum of money into artificial intelligence research.' },
          { word: 'deteriorate', ipa: '/dɪˈtɪriəreɪt/', pos: 'v.', def: '惡化；墮落', example: 'Air quality in the metropolitan basin began to deteriorate during the dry winter months.' },
          { word: 'comprehensive', ipa: '/ˌkɑːmprɪˈhensɪv/', pos: 'adj.', def: '全面的；詳盡的', example: 'The university published a comprehensive guide for prospective international applicants.' }
        ],
        phrases: [
          { phrase: 'come up with', def: '想出（主意、解決方案）', example: 'The engineering team came up with an ingenious design to reduce energy consumption.' },
          { phrase: 'give rise to', def: '引起；導致', example: 'Unchecked social inequality can give rise to widespread civic unrest.' },
          { phrase: 'account for', def: '占……比例；解釋原因', example: 'Renewable energy sources now account for over thirty percent of domestic electricity.' },
          { phrase: 'stand out from', def: '在……中脫穎而出', example: 'Her outstanding creative portfolio made her stand out from all other candidates.' }
        ],
        dialogue: [
          { speaker: 'Tutor', text: 'In your draft essay, you wrote "make research about environmental pollution."' },
          { speaker: 'Student', text: 'Is that grammatically incorrect?' },
          { speaker: 'Tutor', text: 'It is understandable, but unidiomatic. In academic English, we say "conduct research" or "carry out research."' },
          { speaker: 'Student', text: 'Ah, so "conduct" is the precise collocation that collocates with "research"!' },
          { speaker: 'Tutor', text: 'Precisely. Upgrading your collocations from colloquial verbs to academic pairings instantly elevates your score band.' }
        ]
      },
      {
        id: 's5',
        num: '05',
        title: '中譯英與句子產出邏輯',
        subtitle: '無主句轉化・形合意合・大考高分翻譯句型',
        curriculumCode: '4-Ⅴ-1 / 4-Ⅴ-2 / Ac-Ⅴ-1',
        stage: '第五學習階段 (高中 10–12 年級)',
        cefr: 'B1+ (精準中譯英)',
        competency: 'B1 符號運用與溝通表達、A2 系統思考與解決問題',
        learningPerformance: '擺脫中式英文（Chinglish）思維干擾；掌握無主句英譯轉化、及物不及物動詞用法與主被動句構轉換。',
        learningContent: 'Ac-Ⅴ-1 漢英語法結構對比；「虛主詞 It / There be」轉化；因果副詞子句與倒裝加強語氣句構。',
        guideline: '大考中心學測非選擇題中譯英 8 分官方評分規準：兩小題各 4 分，結構 2 分、拼寫字彙搭配 2 分；扣分細則嚴格對標。',
        concepts: [
          {
            heading: '中英文思維結構的本質差異與無主句轉換',
            body: '中文重「意合（Parataxis）」，常無主詞或以主題為首（例如「隨著科技進步，人們的生活變得更便利」）；\n英文重「形合（Hypotaxis）」，必須有形式主詞與法定動詞，句子主幹結構分明。\n翻譯核心三步驟：\n1. 尋找靈魂：找出整句話真正的「邏輯主詞」與「核心動詞」。\n2. 決定骨架：決定主要子句型態（主動、被動、It is + adj. + to V、There is/are）。\n3. 補齊修飾：將時間、地點、原因、條件等修飾語轉化為介系詞片語或副詞子句。',
            tip: '大考陷阱：「隨著……」不可直譯 "Follow with..."，標準寫法是 With the advancement of... 或 As technology advances...'
          },
          {
            heading: '學測歷屆最常出現的五大翻譯金牌句型',
            body: '1. It goes without saying that...（不言而喻；毫無疑問……）\n2. It is estimated / reported / believed that...（據估計/報導/相信……）\n3. S + spend + 時間/金錢 + (in) V-ing / on + N（花費……做某事）\n4. Not until + 過去時間點/子句 + 倒裝主句（直到……才……）\n5. The more..., the more...（越……就越……）',
            tip: '翻譯評分細則：每個小句子 4 分，時態錯扣 0.5–1 分，拼字錯扣 0.5 分，主動詞一致性錯扣 1 分。'
          }
        ],
        vocab: [
          { word: 'translate', ipa: '/trænzˈleɪt/', pos: 'v.', def: '翻譯；轉化', example: 'Translating idioms requires a deep grasp of cultural subtleties.' },
          { word: 'equivalent', ipa: '/ɪˈkwɪvələnt/', pos: 'adj./n.', def: '等同的；等價物', example: 'There is no direct English equivalent for this particular Taiwanese cultural expression.' },
          { word: 'expression', ipa: '/ɪkˈspreʃən/', pos: 'n.', def: '表達；詞句；表情', example: 'Freedom of expression is a fundamental constitutional entitlement.' },
          { word: 'idiomatic', ipa: '/ˌɪdiəˈmætɪk/', pos: 'adj.', def: '道地的；符合語言習慣的', example: 'Living overseas helped her acquire genuinely idiomatic everyday expressions.' },
          { word: 'structure', ipa: '/ˈstrʌktʃər/', pos: 'n./v.', def: '結構；構造；組織', example: 'Sentences in academic discourse require rigorous grammatical structure.' },
          { word: 'accuracy', ipa: '/ˈækjərəsi/', pos: 'n.', def: '精準度；正確無誤', example: 'Proofread your translation carefully to maintain syntactic and lexical accuracy.' }
        ],
        phrases: [
          { phrase: 'pave the way for', def: '為……鋪平道路；促進', example: 'Groundbreaking laboratory discoveries paved the way for effective medical therapies.' },
          { phrase: 'with regard to', def: '關於；就……而論', example: 'I am writing to inquire with regard to your department\'s internship openings.' },
          { phrase: 'lead to / result in', def: '導致；造成', example: 'Prolonged sleep deprivation can lead to severe cognitive impairment.' },
          { phrase: 'be capable of + V-ing', def: '有能力做……', example: 'Modern autonomous vehicles are capable of navigating congested urban intersections.' }
        ],
        dialogue: [
          { speaker: 'Instructor', text: 'Let us examine this translation prompt: "為了維護身體健康，我們應該養成規律運動的習慣。"' },
          { speaker: 'Student', text: 'I wrote: "To maintain physical health, we should develop a habit of regular exercise."' },
          { speaker: 'Instructor', text: 'That is grammatically spotless! How would you make it even more academic?' },
          { speaker: 'Student', text: '"In order to preserve optimal physical well-being, cultivating a habit of regular exercise is highly recommended."' },
          { speaker: 'Instructor', text: 'Superb! Using a gerund phrase as the subject gives the sentence superior academic elegance.' }
        ]
      },
      {
        id: 's6',
        num: '06',
        title: '英文寫作與思維論證',
        subtitle: '圖表說明文・看圖敘事・論說文主張—理由—例證架構',
        curriculumCode: '4-Ⅴ-1 / 4-Ⅴ-3 / 5-Ⅴ-1',
        stage: '第五學習階段 (高中 10–12 年級)',
        cefr: 'B2 (論述與寫作頂標)',
        competency: 'A3 規劃執行與創新應變、B1 符號運用與溝通表達',
        learningPerformance: '撰寫 120–150 字結構完整之論說文或看圖敘事文；清晰鋪陳主張（Claim）、理由（Reason）與例證（Evidence）。',
        learningContent: '篇章寫作四要素：內容（Content）、組織（Organization）、文法句構（Grammar）、字彙拼字（Vocabulary/Mechanics）。',
        guideline: '大考中心學測英文作文 20 分四項度評分規準（每項 5 分）；高分模板破題句與結論句呼應原則。',
        concepts: [
          {
            heading: '學測大考非選作文四大向度評分標準',
            body: '學測英文作文滿分 20 分，評閱由兩位教授盲打，四大向度各占 5 分：\n1. 內容 (Content, 5分)：切合題意、論點具說服力、情節豐富完整。\n2. 組織 (Organization, 5分)：首尾呼應、段落分明、轉折銜接詞運用自然。\n3. 文法句構 (Grammar, 5分)：長短句交錯、無嚴重時態與主謂一致錯誤、句型多樣性（包含倒裝、分詞、關係子句）。\n4. 字彙拼寫 (Vocabulary & Mechanics, 5分)：用字精準恰當（使用 CEFR B2/C1 詞彙）、拼字標點正確。',
            tip: '千萬不可套用空洞的萬用模板！大考閱卷教授對陳腔濫調（如 Every coin has two sides）非常反感，分數通常壓在及格邊緣。'
          },
          {
            heading: '論說文經典段落黃金架構（Claim - Reason - Evidence - Warrant）',
            body: '每一個支持段落 (Body Paragraph) 必須具備四元素：\n1. Claim（主題句/主張）：明確提出該段支持的核心觀點。\n2. Reason（理由推導）：深入解釋為何這項主張成立。\n3. Evidence（具體例證）：舉出真實世界案例、數據或個人親身經歷。\n4. Warrant / Concluding Hook（論證連結/總結）：將例證拉回主題，呼應全文主旨。',
            tip: '寫作完畢務必保留 3–4 分鐘檢查：單複數名詞、冠詞 a/an/the、動詞時態一致性、以及代名詞指涉。'
          }
        ],
        vocab: [
          { word: 'argument', ipa: '/ˈɑːrɡjəmənt/', pos: 'n.', def: '論點；論證；爭論', example: 'The author constructs a compelling argument supported by longitudinal statistical studies.' },
          { word: 'counterargument', ipa: '/ˈkaʊntərˌɑːrɡjəmənt/', pos: 'n.', def: '反對論點；駁論', example: 'Acknowledging and refuting a counterargument strengthens the persuasive impact of an essay.' },
          { word: 'persuasive', ipa: '/pərˈsweɪsɪv/', pos: 'adj.', def: '有說服力的', example: 'Her persuasive rhetorical style swayed the undecided members of the school board.' },
          { word: 'elaborate', ipa: '/ɪˈlæbəreɪt/', pos: 'v./adj.', def: '詳盡闡述；精緻的', example: 'Could you elaborate on how your proposed curriculum enhances critical thinking?' },
          { word: 'illustrate', ipa: '/ˈɪləstreɪt/', pos: 'v.', def: '說明；闡明；給……作插圖', example: 'The case of renewable solar infrastructure illustrates the economic viability of green transition.' },
          { word: 'refute', ipa: '/rɪˈfjuːt/', pos: 'v.', def: '反駁；駁斥', example: 'The scientist marshaled concrete laboratory evidence to refute the critic\'s conjecture.' }
        ],
        phrases: [
          { phrase: 'as far as I am concerned', def: '就我而言；依我看', example: 'As far as I am concerned, experiential fieldwork is as valuable as classroom lectures.' },
          { phrase: 'weigh the pros and cons', def: '權衡利弊得失', example: 'High school graduates must weigh the pros and cons of studying abroad versus staying local.' },
          { phrase: 'it is widely acknowledged that', def: '大家普遍公認……', example: 'It is widely acknowledged that continuous professional development is imperative.' },
          { phrase: 'strike a balance between', def: '在……之間取得平衡', example: 'Students must learn to strike a healthy balance between rigorous academics and leisure.' }
        ],
        dialogue: [
          { speaker: 'Mentor', text: 'Your introductory paragraph has a captivating hook, but the thesis statement is slightly vague.' },
          { speaker: 'Writer', text: 'I stated that artificial intelligence will change high school education forever.' },
          { speaker: 'Mentor', text: 'That is a broad forecast, not a thesis statement. Clarify your specific stance!' },
          { speaker: 'Writer', text: 'How about: "While AI tutoring enhances individualized feedback, it cannot replace teachers in cultivating empathy and civic values"?' },
          { speaker: 'Mentor', text: 'Outstanding! That provides a clear roadmap for both of your body paragraphs.' }
        ]
      },
      {
        id: 's7',
        num: '07',
        title: '學測與統測整卷衝刺',
        subtitle: '100 分鐘全真作答節奏・混合題手寫・歷屆陷阱掃描',
        curriculumCode: '3-Ⅴ-2 / 4-Ⅴ-1 / 5-Ⅴ-2',
        stage: '第五學習階段 (高中學測統測大考衝刺)',
        cefr: 'B2 (學測 15 級分滿級分)',
        competency: 'A3 規劃執行與創新應變、A2 系統思考與解決問題',
        learningPerformance: '精確落實學測 100 分鐘全真作答時間配速；整合選擇題、混合題手寫與非選作文之雙向檢查策略。',
        learningContent: '109–115 歷屆學測命題趨勢分析；易錯誘答肢排除法則；考場應試心態與答題卡劃記管理。',
        guideline: '學測各級分累計百分比與非選閱卷規準；大考中心手寫卷卷面書寫規範與防倒扣答題策略。',
        concepts: [
          {
            heading: '學測 100 分鐘實戰秒殺配速計畫',
            body: '學測英文科總測驗時間 100 分鐘，共 100 分原始分。建議配速時間表：\n- 00–12 分鐘：詞彙題 1–10 題（秒殺，每題平均 1 分鐘以內）。\n- 12–25 分鐘：綜合測驗 11–20 題（依上下文詞組與文法判斷）。\n- 25–35 分鐘：文意選填 21–30 題（先在題本各選項標詞性：N, V, adj, adv）。\n- 35–45 分鐘：篇章結構 31–34 題（四空五選，細緻檢核指涉與邏輯鉤子）。\n- 45–70 分鐘：閱讀測驗與混合題（共 4 篇長文，每篇 6 分鐘精讀作答）。\n- 70–82 分鐘：中譯英（2 題共 8 分，打草稿並檢查時態拼字）。\n- 82–97 分鐘：英文作文（120–150 字，落實三段或四段論證）。\n- 97–100 分鐘：全卷全面快速複核卡片劃記與非選填答欄位。',
            tip: '混合題手寫規範：題目若要求 "Fill in the blank with words from the passage"，必須原詞照抄，千萬不可擅自改寫時態或加字！'
          },
          {
            heading: '高分群考前 14 天心理與答題盲點清單',
            body: '1. 題目問 "Which is LEAST likely..." 或 "All of the following EXCEPT..."：務必在題本將 LEAST 或 EXCEPT 用黑筆大力圈起，避免順眼選成正確項！\n2. 篇章長文出現陌生學術詞彙時，切忌恐慌：大考中心命題原則明確指出，超出 7000 詞之專業生字必定在上下文有同位語或舉例說明釋義。\n3. 非選書寫手寫工整性：英文字母字距適中，大小寫分明，句點切勿點成 comma，整潔度直接影響閱卷印象分。',
            tip: '原始分與級分關係：近年學測英文 15 級分門檻約在原始分 86–90 分區間浮動。保證客觀題全對，非選拿下 22+ 分即穩上 15 級分！'
          }
        ],
        vocab: [
          { word: 'pacing', ipa: '/ˈpeɪsɪŋ/', pos: 'n.', def: '配速；步調掌控', example: 'Disciplined time pacing prevents panic during high-stakes competitive examinations.' },
          { word: 'allocation', ipa: '/ˌæləˈkeɪʃən/', pos: 'n.', def: '分配；配置', example: 'Sensible allocation of your 100 minutes ensures sufficient time for the writing section.' },
          { word: 'simulation', ipa: '/ˌsɪmjəˈleɪʃən/', pos: 'n.', def: '仿真；模擬', example: 'Full-length timed simulations desensitize students to actual exam anxiety.' },
          { word: 'benchmark', ipa: '/ˈbentʃmɑːrk/', pos: 'n./v.', def: '基準；衡量標準', example: 'Consistent scores on past official papers serve as a reliable readiness benchmark.' },
          { word: 'pitfall', ipa: '/ˈpɪtfɔːl/', pos: 'n.', def: '陷阱；隱患', example: 'Overlooking negative qualifiers like "seldom" is a notorious comprehension pitfall.' },
          { word: 'mastery', ipa: '/ˈmæstəri/', pos: 'n.', def: '精通；熟練掌握', example: 'True lexical mastery means deploying advanced terms accurately in novel contexts.' }
        ],
        phrases: [
          { phrase: 'keep track of', def: '隨時掌握；記錄', example: 'Always keep track of remaining examination time by checking the hall wall clock.' },
          { phrase: 'in advance', def: '提前；預先', example: 'Familiarize yourself with testing room regulations several days in advance.' },
          { phrase: 'stick to', def: '堅守；遵守', example: 'Stick to your planned strategy rather than altering your pacing haphazardly midway.' },
          { phrase: 'make the most of', def: '充分利用', example: 'Make the most of the final review minutes to eliminate careless mechanical errors.' }
        ],
        dialogue: [
          { speaker: 'Examiner', text: 'Five minutes remaining! Please ensure your student ID barcode is properly affixed.' },
          { speaker: 'Student A', text: 'I just completed my essay conclusion! Now I have three minutes to proofread.' },
          { speaker: 'Student B', text: 'I am double-checking my optical answer card alignment to make sure no bubbles were skipped.' },
          { speaker: 'Examiner', text: 'Time is up! Put down your pens and pencils immediately.' },
          { speaker: 'Student A', text: 'Phew! Sticking to our rehearsed 100-minute pacing plan made all the difference.' }
        ]
      }
    ]
  },
  {
    id: 'voc',
    title: '高工英文｜技術與職場英語',
    badge: '高工／技高專業情境 · 國際工匠實務線 (108 課綱與外語群專二)',
    intro: '深度對標 108 課綱技術型高級中等學校英語文：接軌工業車間與國際職場，涵蓋工場安全規章 (OSHA/ISO)、個人防護裝備 (PPE)、精密量具與尺寸公差、SOP 祈使句與故障排除流程圖、工程三視圖與爆炸圖、技術商務 Email (RFQ/交期催告)、以及統測外語群專業科目 (二) 科技長文與 50 字摘要寫作。',
    chapters: [
      {
        id: 'v1',
        num: '01',
        title: '工場安全與指令',
        subtitle: 'PPE 個人防護裝備・安全等級標示・緊急疏散指引',
        curriculumCode: '1-Ⅴ-2 / 2-Ⅴ-2 / Ac-Ⅴ-2 (技高外語群)',
        stage: '第五學習階段 (技術型高中 10–12 年級)',
        cefr: 'B1 (技高職場安全)',
        competency: 'A3 規劃執行與創新應變、B1 符號運用與溝通表達',
        learningPerformance: '掌握工廠與施工現場個人防護裝備（PPE）、安全警語（Caution/Danger/Warning）與緊急疏散指令之精準英語。',
        learningContent: '技高專業英語 ESP；OSHA 與 ISO 45001 安全標誌；安全操作 SOP 祈使句與禁止用語。',
        guideline: '技專校院入學測驗中心（TVE）四技二專統測外語群專業科目職場實務英語命題規準。',
        concepts: [
          {
            heading: '工業現場個人防護裝備 (PPE) 核心術語',
            body: '進入工廠車間必須穿戴之 PPE (Personal Protective Equipment)：\n1. Safety goggles / Face shield：防護眼鏡/面罩，防飛濺切屑或化學液體。\n2. Earplugs / Earmuffs：耳塞/耳罩，防止高分貝噪音聽力損害。\n3. Steel-toe boots：鋼頭安全鞋，防止重物掉落砸傷腳趾。\n4. Heavy-duty gloves：耐磨防割手套；注意操作旋轉機具（車床、銑床）時嚴禁配戴手套以免捲入！\n5. Respirator / Dust mask：防塵口罩/呼吸器，過濾有毒氣體與粉塵。',
            tip: '職場情境關鍵：must（必須）、must not / prohibited（嚴禁）、should（建議）之語氣差異攸關工安責任！'
          },
          {
            heading: '國際安全警語等級 (OSHA / ISO Standards)',
            body: '1. DANGER（危險 - 紅底白字）：表示極度迫切的致命危險，若不避開將導致死亡或重傷。\n2. WARNING（警告 - 橘底黑字）：表示中度潛在危害，若不避開可能導致嚴重傷害。\n3. CAUTION（注意 - 黃底黑字）：表示輕微或中度傷害，或設備損壞風險。\n4. NOTICE（須知 - 藍底白字）：傳達與人身安全無直接關係的重要程序與政策說明。',
            tip: '緊急應變動詞：evacuate immediately（立即疏散）、pull emergency stop button（拍下緊急停機鈕）、shut off power supply（切斷電源）。'
          }
        ],
        vocab: [
          { word: 'goggles', ipa: '/ˈɡɑːɡəlz/', pos: 'n.', def: '護目鏡 (恆用複數)', example: 'All technicians must wear protective safety goggles inside the machining workshop.' },
          { word: 'hazard', ipa: '/ˈhæzərd/', pos: 'n.', def: '危害；危險源', example: 'Exposed electrical wiring presents an immediate electrocution hazard.' },
          { word: 'ventilation', ipa: '/ˌventlˈeɪʃən/', pos: 'n.', def: '通風；換氣', example: 'Adequate chemical exhaust ventilation is mandatory in the battery assembly bay.' },
          { word: 'precaution', ipa: '/prɪˈkɔːʃən/', pos: 'n.', def: '預防措施；防範', example: 'Take necessary precautions before servicing pressurized hydraulic pipes.' },
          { word: 'flammable', ipa: '/ˈflæməbəl/', pos: 'adj.', def: '易燃的；可燃的', example: 'Store flammable solvents inside certified fireproof cabinets away from heat.' },
          { word: 'evacuation', ipa: '/ɪˌvækjuˈeɪʃən/', pos: 'n.', def: '疏散；撤離', example: 'Familiarize yourself with the workshop evacuation route marked with green exit signs.' }
        ],
        phrases: [
          { phrase: 'put on / take off', def: '穿上 / 脫下（裝備）', example: 'Put on your ear protection before entering the high-decibel stamping room.' },
          { phrase: 'shut down', def: '關閉（機器/電力）', example: 'Shut down the milling machine completely before clearing metal chips.' },
          { phrase: 'in case of emergency', def: '在緊急情況下', example: 'In case of an electrical fire, do not use water to extinguish the flames.' },
          { phrase: 'comply with', def: '遵守；符合（安全規定）', example: 'All operating personnel must comply with factory environmental safety guidelines.' }
        ],
        dialogue: [
          { speaker: 'Supervisor', text: 'Hold on, Kevin! Where are your safety glasses and steel-toe boots?' },
          { speaker: 'Apprentice', text: 'I left them in my locker across the hallway, sir. I was just coming in to grab a wrench.' },
          { speaker: 'Supervisor', text: 'Under factory safety rules, no one enters the machining floor without full PPE, period.' },
          { speaker: 'Apprentice', text: 'I apologize, Mr. Harris. I will fetch them immediately.' },
          { speaker: 'Supervisor', text: 'Good. Flying metal shavings can cause irreversible blindness in a fraction of a second.' }
        ]
      },
      {
        id: 'v2',
        num: '02',
        title: '工具、材料與尺寸規格',
        subtitle: '精密量具・金屬特性・公差標註與工程單位換算',
        curriculumCode: '3-Ⅴ-2 / 4-Ⅴ-2 / Ab-Ⅴ-2',
        stage: '第五學習階段 (技術型高中 10–12 年級)',
        cefr: 'B1 (工程工具與材料)',
        competency: 'B1 符號運用與溝通表達、A2 系統思考與解決問題',
        learningPerformance: '辨識工程精密量具（Caliper, Micrometer）、材料物性（Tensile strength, Corrosion resistance）與公差尺寸規格。',
        learningContent: '英制與公制工程單位換算；材料物理特性詞彙；技術規格說明書參數表格讀取。',
        guideline: '統測專業英文（二）工具材料題型；技術圖例與量測尺寸對照命題標準。',
        concepts: [
          {
            heading: '現場必備量具與加工機具英文',
            body: '1. Vernier caliper（游標卡尺）：用以精準量測外徑、內徑與深度。\n2. Micrometer（分厘卡/螺旋測微器）：量測小於 0.01 mm 之精密厚度。\n3. Torque wrench（扭力扳手）：確保螺栓鎖緊至規定之扭矩 (Nm)。\n4. Lathe（車床）/ Milling machine（銑床）/ CNC machine（數值控制工具機）。\n5. Soldering iron（烙鐵）：用於電子電路板焊接。',
            tip: '測量名詞搭配：take measurements（進行量測）、measure within tolerance（在公差範圍內量測）。'
          },
          {
            heading: '工程材料物理性質與公差規格 (Tolerance)',
            body: '1. 材料特性 (Material Properties)：\n- Tensile strength：抗拉強度\n- Ductility：延展性\n- Hardness vs Toughness：硬度 vs 韌性\n- Corrosion-resistant alloy：耐腐蝕合金（如不銹鋼 Stainless steel）\n2. 規格與公差 (Specifications & Tolerance)：\n- Dimensions：length（長）, width（寬）, height（高）, diameter（直徑 $\varnothing$）\n- Tolerance：$\pm 0.05\text{ mm}$ 表示容許誤差範圍在正負 0.05 毫米之間。',
            tip: '單位陷阱：注意英制 (inch, feet, psi) 與公制 (mm, meter, bar, MPa) 之換算。'
          }
        ],
        vocab: [
          { word: 'caliper', ipa: '/ˈkælɪpər/', pos: 'n.', def: '游標卡尺；測徑器', example: 'Use a digital vernier caliper to verify the outer diameter of the steel shaft.' },
          { word: 'tolerance', ipa: '/ˈtɑːlərəns/', pos: 'n.', def: '公差；容許誤差', example: 'The aerospace bearing must be machined within a tight tolerance of plus or minus two microns.' },
          { word: 'alloy', ipa: '/ˈælɔɪ/', pos: 'n.', def: '合金', example: 'Titanium alloy is widely favored for its extraordinary strength-to-weight ratio.' },
          { word: 'durable', ipa: '/ˈdʊrəbəl/', pos: 'adj.', def: '耐用的；堅固的', example: 'Polyurethane conveyor belts are extremely durable under continuous abrasive friction.' },
          { word: 'dimension', ipa: '/dɪˈmenʃən/', pos: 'n.', def: '尺寸；維度', example: 'Check the mechanical engineering blueprint for exact part dimensions.' },
          { word: 'conductivity', ipa: '/ˌkɑːndʌkˈtɪvəti/', pos: 'n.', def: '導電性；導熱率', example: 'Pure copper exhibits remarkably high electrical conductivity.' }
        ],
        phrases: [
          { phrase: 'measure up to', def: '達到（標準/規格）', example: 'The finished prototype did not measure up to client quality specifications.' },
          { phrase: 'be composed of', def: '由……組成', example: 'Bronze is an alloy primarily composed of copper and tin.' },
          { phrase: 'resistant to', def: '對……有抵抗力的；抗……的', example: 'The exterior casing is heat-treated to be resistant to chemical rust.' },
          { phrase: 'tighten up', def: '鎖緊；旋緊', example: 'Tighten up the hex bolts evenly using a calibrated torque wrench.' }
        ],
        dialogue: [
          { speaker: 'Engineer', text: 'Mark, let us inspect the newly arrived batch of aluminum transmission shafts.' },
          { speaker: 'Technician', text: 'I am measuring the diameter with the digital micrometer right now.' },
          { speaker: 'Engineer', text: 'What reading are you getting for sample number four?' },
          { speaker: 'Technician', text: 'It measures 25.04 millimeters. The blueprint specifies 25.00 millimeters with a plus-or-minus 0.02 tolerance.' },
          { speaker: 'Engineer', text: 'Then it is out of specification by two hundredths of a millimeter. We must quarantine this batch.' }
        ]
      },
      {
        id: 'v3',
        num: '03',
        title: '流程與故障排除',
        subtitle: 'SOP 祈使句・順序副詞・故障診斷流程圖',
        curriculumCode: '3-Ⅴ-2 / 4-Ⅴ-2 / Ac-Ⅴ-2',
        stage: '第五學習階段 (技術型高中 10–12 年級)',
        cefr: 'B1+ (流程與故障排除)',
        competency: 'A2 系統思考與解決問題、B2 科技資訊與媒體素養',
        learningPerformance: '依據流程圖（Flowchart）閱讀步驟說明；使用順序副詞與條件句撰寫設備故障排除指引（Troubleshooting Guide）。',
        learningContent: '順序連接詞（First, Next, Subsequently, Finally）；故障診斷條件句（If error code persists, then...）；被動語態操作說明。',
        guideline: '四技二專統測外語群專業英文流程圖與操作步驟轉譯試題規準。',
        concepts: [
          {
            heading: '標準作業程序 (SOP) 的英文語言特徵',
            body: '工廠標準作業程序書 (Standard Operating Procedure) 為確保操作零失誤，具備三大特色：\n1. 採用祈使句 (Imperative Sentences)：動詞原形置於句首（例：Inspect the hydraulic seal before powering on.）。\n2. 嚴謹的順序副詞 (Sequential Markers)：First / Prior to operation（首先/操作前）$\to$ Next / Subsequently（接下來）$\to$ Meanwhile / In the interim（同時）$\to$ Finally / Upon completion（最後/完成後）。\n3. 警示條件子句：If the pressure gauge exceeds 150 psi, immediately engage the emergency pressure relief valve.',
            tip: '統測英語類專二常考題型：重組混亂的步驟句子，還原正確 SOP 先後次序！'
          },
          {
            heading: '機電與設備常見故障排除 (Troubleshooting) 術語',
            body: '1. 症狀描述 (Symptoms)：\n- Overheating（過熱）/ Strange rattling noise（異常喀喀雜音）\n- Fluid leakage（液體洩漏）/ Voltage fluctuation（電壓波動）\n- Belt slippage（皮帶打滑）/ Paper/Material jamming（卡紙/卡料）\n2. 檢測動作 (Actions)：\n- Isolate the faulty circuit（隔離故障電路）\n- Replace worn-out bearings（更換磨損軸承）\n- Lubricate moving parts（潤滑活動機件）\n- Reset to factory defaults（重置為原廠預設值）。',
            tip: '報告公式：Problem statement（問題陳述）$\to$ Root cause（根本原因）$\to$ Corrective action（矯正措施）$\to$ Preventive measure（預防再發措施）。'
          }
        ],
        vocab: [
          { word: 'malfunction', ipa: '/ˌmælˈfʌŋkʃən/', pos: 'n./v.', def: '故障；運作失常', example: 'A sudden sensor malfunction caused the robotic assembly arm to halt.' },
          { word: 'diagnose', ipa: '/ˈdaɪəɡnoʊs/', pos: 'v.', def: '診斷；查明原因', example: 'The diagnostic software identified a short circuit in module three.' },
          { word: 'procedure', ipa: '/prəˈsiːdʒər/', pos: 'n.', def: '程序；步驟', example: 'Strict adherence to maintenance procedures minimizes production downtime.' },
          { word: 'lubricate', ipa: '/ˈluːbrɪkeɪt/', pos: 'v.', def: '潤滑；給……上油', example: 'Lubricate the linear guide rails every fifty operating hours.' },
          { word: 'overheat', ipa: '/ˌoʊvərˈhiːt/', pos: 'v.', def: '過熱', example: 'If the electric spindle motor overheats, the thermal relay trips automatically.' },
          { word: 'component', ipa: '/kəmˈpoʊnənt/', pos: 'n.', def: '零件；元件', example: 'Inspect every mechanical component for signs of metal fatigue before reassembly.' }
        ],
        phrases: [
          { phrase: 'troubleshoot', def: '檢修；故障排除', example: 'Our senior technicians are troubleshooting the intermittent network outage.' },
          { phrase: 'break down', def: '（機械/系統）拋錨；故障', example: 'The automatic packaging machine broke down right before the scheduled delivery.' },
          { phrase: 'carry out', def: '執行；落實', example: 'Carry out a comprehensive safety inspection prior to machine startup.' },
          { phrase: 'look into', def: '調查；深入研究', example: 'The engineering supervisor promised to look into the recurring pressure drop.' }
        ],
        dialogue: [
          { speaker: 'Operator', text: 'Line supervisor, the CNC lathe on station six has stopped cutting and is emitting smoke.' },
          { speaker: 'Supervisor', text: 'Did you hit the red emergency stop button?' },
          { speaker: 'Operator', text: 'Yes, sir. Power is killed. What should we troubleshoot first?' },
          { speaker: 'Supervisor', text: 'First, let the coolant pump clear the chamber. Next, check if the cutting tool fractured inside the workpiece.' },
          { speaker: 'Operator', text: 'Understood. I will disconnect the pneumatic supply line before opening the safety shield.' }
        ]
      },
      {
        id: 'v4',
        num: '04',
        title: '技術圖表與說明書',
        subtitle: '工程圖解・配線圖・爆炸圖・參數規格表精讀',
        curriculumCode: '3-Ⅴ-4 / 4-Ⅴ-2 / Ad-Ⅴ-1',
        stage: '第五學習階段 (技術型高中 10–12 年級)',
        cefr: 'B1+ (技術圖表判讀)',
        competency: 'B2 科技資訊與媒體素養、A2 系統思考與解決問題',
        learningPerformance: '精讀配線圖（Wiring diagram）、爆炸圖（Exploded view）、機械藍圖與工程參數數據表。',
        learningContent: '空間方位詞；零件編號標註法；技術說明書中縮寫（OEM, CAD, CNC, PCB）與圖文互譯。',
        guideline: '統測專業科目（二）閱讀測驗工程圖表題型；多模態技術文本訊息比對規範。',
        concepts: [
          {
            heading: '工程圖面三大必考視圖與圖例標示',
            body: '1. Orthographic Projection（正投影三視圖）：Front view（前視圖）、Top view（俯視圖）、Side view（側視圖）。\n2. Exploded View（爆炸圖/分解圖）：將機械內部零件依裝配順序炸開排列，標註各零件料號 (Part Number, P/N) 與裝配方向。\n3. Schematic / Wiring Diagram（電路/配線圖）：展示電阻 (resistor)、電容 (capacitor)、二極體 (diode)、接地 (ground $\frac{1}{=}$) 等符號之電氣連接關係。',
            tip: '圖表題技巧：先讀圖面右下角標題欄 (Title Block) 中的材料名稱、比例尺 (Scale) 與繪圖日期。'
          },
          {
            heading: '使用者操作手冊 (User Manual) 與規格表閱讀',
            body: '設備手冊典型章節架構：\n- Section 1: Product Overview & Specifications（產品概觀與參數規格表）\n- Section 2: Installation & Wiring（安裝與配線指引）\n- Section 3: Initial Commissioning & Calibration（試車與校準）\n- Section 4: Routine Maintenance Schedule（定期保養週期表）\n- Section 5: Troubleshooting Matrix（故障代碼與處置矩陣表）',
            tip: '讀規格表：注意額定輸入電壓 (Rated Input Voltage: AC 110V/220V $\pm 10\%$) 與最大工作負載 (Max Working Load)。'
          }
        ],
        vocab: [
          { word: 'schematic', ipa: '/skəˈmætɪk/', pos: 'n./adj.', def: '線路圖；示意圖', example: 'Trace the signal pathway on the printed circuit board schematic diagram.' },
          { word: 'assembly', ipa: '/əˈsembli/', pos: 'n.', def: '組裝；裝配；集會', example: 'The final product assembly takes place in an ISO Class 7 cleanroom.' },
          { word: 'parameter', ipa: '/pəˈræmɪtər/', pos: 'n.', def: '參數；界限', example: 'Adjust the laser cutting parameters according to the sheet metal thickness.' },
          { word: 'specification', ipa: '/ˌspesɪfɪˈkeɪʃən/', pos: 'n.', def: '規格說明；明細', example: 'Ensure that the newly purchased relays meet industrial specifications.' },
          { word: 'calibration', ipa: '/ˌkælɪˈbreɪʃən/', pos: 'n.', def: '校準；標定', example: 'Annual calibration of measuring instruments guarantees traceable measurement accuracy.' },
          { word: 'diagram', ipa: '/ˈdaɪəɡræm/', pos: 'n.', def: '圖表；圖解', example: 'Refer to the block diagram to understand the input-output sensor architecture.' }
        ],
        phrases: [
          { phrase: 'refer to', def: '參考；參照', example: 'Refer to page twenty-four of the instruction manual for the wiring sequence.' },
          { phrase: 'according to', def: '依據；按照', example: 'Install the anchor bolts strictly according to structural engineering blueprints.' },
          { phrase: 'line up', def: '對齊；排成一行', example: 'Line up the alignment notches before tightening the outer retaining ring.' },
          { phrase: 'connect with', def: '與……連接', example: 'Connect the green grounding cable securely with the main electrical panel.' }
        ],
        dialogue: [
          { speaker: 'Foreman', text: 'Take a close look at this exploded view diagram for the hydraulic pump assembly.' },
          { speaker: 'Technician', text: 'I see that part number 104 is an O-ring seal located right beneath the piston flange.' },
          { speaker: 'Foreman', text: 'Correct. If you omit that seal during reassembly, pressurized oil will spray across the cabinet.' },
          { speaker: 'Technician', text: 'What is the torque specification for the four hex bolts on top?' },
          { speaker: 'Foreman', text: 'Check the note box on the blueprint: torque to forty-five Newton-meters crosswise.' }
        ]
      },
      {
        id: 'v5',
        num: '05',
        title: '職場溝通與技術電子郵件',
        subtitle: '商務書信結構・RFQ 詢價採購・客訴處理與交期催告',
        curriculumCode: '4-Ⅴ-2 / 2-Ⅴ-2 / Ac-Ⅴ-2',
        stage: '第五學習階段 (技術型高中 10–12 年級)',
        cefr: 'B2 (國際職場商務電郵)',
        competency: 'B1 符號運用與溝通表達、C2 人際關係與團隊合作',
        learningPerformance: '撰寫標準國際商務與技術電子郵件；熟練詢價（RFQ）、交期催告、技術支援與客戶爭議協商之正式書信。',
        learningContent: '電郵標準七結構；委婉禮貌語氣（I would appreciate if...）；專業商業術語與交貨條款（Incoterms）。',
        guideline: '統測英文寫作大題：商務書信與技術便條寫作評分規準。',
        concepts: [
          {
            heading: '國際技術商務電子郵件標準骨架',
            body: '一封專業的技術商務 Email 包含四大要素：\n1. Subject Line（主旨）：清楚精簡，包含案號與緊急程度（例：[Urgent] RFQ for CNC Tooling Inserts - PO#8921）。\n2. Salutation & Opening（稱謂與開場白）：Dear Mr. Chen, / I hope this email finds you well.\n3. Core Message（核心訴求）：開門見山說明目的（I am writing to inquire about the delivery status of...）。\n4. Call to Action & Sign-off（具體後續行動與結尾）：Please confirm your availability by Friday. / Best regards, [Name].',
            tip: '避免情緒化字眼，表達催告時使用客氣而堅定的專業語氣（例：We would appreciate your prompt update on...）。'
          },
          {
            heading: '採購、交期與瑕疵索賠常用商業情境',
            body: '1. RFQ (Request for Quotation, 詢價單)：詢問單價 (unit price)、起訂量 (MOQ: Minimum Order Quantity)、交期 (lead time)、付款條件 (payment terms: Net 30 days)。\n2. Delay in Delivery（交期延誤）：Our production line is scheduled to commence on Oct 10th. Any delay will incur severe penalties.\n3. Defect Complaint（零件瑕疵）：Upon visual inspection, we discovered that 15% of the stamped parts exhibit severe hairline cracks.',
            tip: '統測英語類專二常考「商務信件填空」與「回覆客訴信寫作」，必須熟練商務套語！'
          }
        ],
        vocab: [
          { word: 'inquiry', ipa: '/ˈɪnkwəri/', pos: 'n.', def: '詢問；打聽；調查', example: 'Thank you for your business inquiry regarding our automated packaging systems.' },
          { word: 'quotation', ipa: '/kwoʊˈteɪʃən/', pos: 'n.', def: '報價單；引用語', example: 'We have attached our formal price quotation for your management\'s review.' },
          { word: 'shipment', ipa: '/ˈʃɪpmənt/', pos: 'n.', def: '貨物；裝運', example: 'The overseas shipment is scheduled to clear customs at Keelung port this Wednesday.' },
          { word: 'vendor', ipa: '/ˈvendər/', pos: 'n.', def: '供應商；賣方', example: 'We are evaluating three competing local vendors for injection molding parts.' },
          { word: 'deadline', ipa: '/ˈdedlaɪn/', pos: 'n.', def: '截止日期；交件期限', example: 'Meeting the client\'s delivery deadline is our manufacturing team\'s top priority.' },
          { word: 'defect', ipa: '/ˈdiːfekt/', pos: 'n.', def: '瑕疵；缺陷', example: 'Any casting component with visible structural defects will be rejected immediately.' }
        ],
        phrases: [
          { phrase: 'get back to', def: '回覆；回頭聯繫', example: 'Our sales engineer will get back to you with updated lead times by tomorrow.' },
          { phrase: 'follow up on', def: '跟進；追蹤（進度）', example: 'I am writing to follow up on our previous inquiry regarding replacement valves.' },
          { phrase: 'at your earliest convenience', def: '儘早；在您方便時儘速', example: 'Please sign and return the purchase agreement at your earliest convenience.' },
          { phrase: 'as per your request', def: '按照您的要求', example: 'As per your request, we have expedited the delivery schedule by one week.' }
        ],
        dialogue: [
          { speaker: 'Buyer', text: 'Good morning, Ms. Vance. I am calling from Taiwan Precision Machinery.' },
          { speaker: 'Supplier', text: 'Good morning, Mr. Lin. How can I assist you with your purchase order today?' },
          { speaker: 'Buyer', text: 'We sent a purchase order for five hundred servo drives last Monday. Could you confirm the shipping date?' },
          { speaker: 'Supplier', text: 'Let me pull up your account. Yes, the drives passed final factory QA and will ship via air freight on Thursday.' },
          { speaker: 'Buyer', text: 'Fantastic. Please email us the air waybill tracking number as soon as it departs.' }
        ]
      },
      {
        id: 'v6',
        num: '06',
        title: '統測英語類專業科目 (二) 讀寫',
        subtitle: '外語群專業英文・科技商業閱讀・摘要與寫作解題攻略',
        curriculumCode: '3-Ⅴ-2 / 4-Ⅴ-3 / 5-Ⅴ-2',
        stage: '第五學習階段 (技術型高中 10–12 年級統測衝刺)',
        cefr: 'B2 (統測專二頂標)',
        competency: 'A3 規劃執行與創新應變、A2 系統思考與解決問題',
        learningPerformance: '全面掌握統測英語類專業科目（二）閱讀與寫作兩大題型；熟練 50 字精準摘要技巧與專業長篇閱讀解題。',
        learningContent: '科技與商業跨領域閱讀；篇章主旨概括法；論說段落寫作與統測歷屆試題關鍵字定位法。',
        guideline: '技測中心統測外語群專業科目（二）非選題官方評分規準（摘要內容度、文法句型、詞彙精確度）。',
        concepts: [
          {
            heading: '統測外語群專二（英文閱讀與寫作）卷面結構',
            body: '四技二專統測外語群英語類專業科目（二）滿分 100 分，考試時間 100 分鐘：\n1. 第一部分：閱讀測驗（選擇題，約占 40–50 分）\n涵蓋科技發展、全球化商務、跨文化溝通、現代管理學等跨領域長篇閱讀。\n2. 第二部分：非選擇題（寫作與翻譯，約占 50–60 分）\n- 句子改寫與句子合併（考關係子句、分詞構句、倒裝句、連接詞）。\n- 短文摘要寫作（Summary Writing）：將 250 字之技術短文，以 50–70 字精準濃縮其核心論點。\n- 主題寫作：針對科技趨勢（如 AI 倫理、電動車、智慧工廠）進行立場闡述與解決方案提案。',
            tip: '專二與共同英文之別：專二詞彙量要求達 CEFR B2 水準，文章長度與句法複雜度皆顯著高於共同英文！'
          },
          {
            heading: '技術摘要 (Summary) 與短文寫作評分要訣',
            body: '摘要寫作三要三不要：\n- 要：提取原文各段主題句；使用自己的詞彙改寫 (Paraphrase)；維持客觀視角。\n- 不要：照抄原文整句句子；加入原文未提及之個人主觀偏見；抄錄過多瑣碎次要數據。\n短文寫作重點：首段清楚破題，第二段提出具體兩項策略，末段有力總結。',
            tip: '改寫神技：將動詞改為名詞化（e.g., The machine operates efficiently $\to$ The efficient operation of the machine）。'
          }
        ],
        vocab: [
          { word: 'innovation', ipa: '/ˌɪnəˈveɪʃən/', pos: 'n.', def: '創新；革新', example: 'Continuous engineering innovation is key to maintaining market competitiveness.' },
          { word: 'automation', ipa: '/ˌɔːtəˈmeɪʃən/', pos: 'n.', def: '自動化', example: 'Factory automation drastically reduces manual labor while elevating assembly consistency.' },
          { word: 'sustainable', ipa: '/səˈsteɪnəbəl/', pos: 'adj.', def: '永續的；可持續的', example: 'The manufacturing sector is transitioning toward carbon-neutral, sustainable manufacturing.' },
          { word: 'efficiency', ipa: '/ɪˈfɪʃənsi/', pos: 'n.', def: '效率；效能', example: 'Lean production techniques eliminate waste and boost thermal efficiency.' },
          { word: 'workforce', ipa: '/ˈwɜːrkfɔːrs/', pos: 'n.', def: '勞動力；全體從業人員', example: 'The modern industrial workforce requires proficiency in both mechanics and software.' },
          { word: 'industry', ipa: '/ˈɪndəstri/', pos: 'n.', def: '工業；產業', example: 'The semiconductor industry forms the backbone of Taiwan\'s global technological economy.' }
        ],
        phrases: [
          { phrase: 'in addition to', def: '除了……之外（還）', example: 'In addition to mechanical repairs, the technical team performs software diagnostics.' },
          { phrase: 'keep up with', def: '跟上……腳步；與……並駕齊驅', example: 'Engineers must continuously upskill to keep up with rapid artificial intelligence advancements.' },
          { phrase: 'play an essential role', def: '扮演關鍵不可或缺的角色', example: 'Precision tooling plays an essential role in high-yield chip manufacturing.' },
          { phrase: 'depend on', def: '依賴；取決於', example: 'The success of the automated production line depends on robust sensor reliability.' }
        ],
        dialogue: [
          { speaker: 'Instructor', text: 'In today\'s mock exam for TCTE Specialist English Two, let us analyze this summary prompt.' },
          { speaker: 'Student', text: 'The article describes how smart factories leverage Internet of Things (IoT) sensors.' },
          { speaker: 'Instructor', text: 'What is the author\'s primary thesis that must appear in your 50-word summary?' },
          { speaker: 'Student', text: 'Real-time data telemetry allows factories to shift from reactive repairs to predictive maintenance.' },
          { speaker: 'Instructor', text: 'Flawless encapsulation! Express that in your own words, and you are guaranteed top marks.' }
        ]
      },
      {
        id: 'v7',
        num: '07',
        title: '跨國技術現場實務整合',
        subtitle: 'ISO 國際認證標準・跨國視訊會議・專案驗收與保固協議',
        curriculumCode: '2-Ⅴ-2 / 4-Ⅴ-2 / C3 (全球技職素養)',
        stage: '第五學習階段 (技術型高中與全球就業銜接)',
        cefr: 'B2 (跨國工程現場實務)',
        competency: 'C3 多元文化與國際理解、C2 人際關係與團隊合作',
        learningPerformance: '參與跨國技術會議與遠距視訊溝通；掌握 ISO 驗收文件、工程合約條款與保固協議之關鍵法律與技術英語。',
        learningContent: '國際標準化用語；跨國視訊會議議事規則與發言用語；專案里程碑驗收與維護合約。',
        guideline: '國際工程師與技術人才全球溝通指引；跨國專案驗收報告書寫標準。',
        concepts: [
          {
            heading: '國際品質認證標準 (ISO / CE / RoHS) 英文規範',
            body: '外銷導向工程必須符合國際規範：\n1. ISO 9001（品質管理系統）：強調客訴處理、持續改善 (Continuous Improvement) 與文件管制。\n2. ISO 14001（環境管理系統）：控管碳排放、廢水處理與環境友善製程。\n3. CE Mark（歐洲合格認證）：符合歐盟健康、安全與環境保護標準。\n4. RoHS（危害性物質限制指令）：嚴禁電子產品中含有鉛 (Pb)、鎘 (Cd)、汞 (Hg) 等有毒重金屬。',
            tip: '合規關鍵字：compliance audit（合規稽核）、certify（認證）、non-conformity report（不合格報告）。'
          },
          {
            heading: '跨國工程師遠端會議與專案驗收 (Acceptance Testing)',
            body: '跨國視訊會議 (Teleconference) 常用主持與討論口語：\n- 開場確認：Can everyone hear me clearly and see my shared screen?\n- 推進議題：Let us move on to item three on the agenda: the final Site Acceptance Test (SAT).\n- 釐清問題：Could you elaborate on the intermittent telemetry delay you observed yesterday?\n- 達成共識：Are we all aligned on postponing the commissioning date by three days?\n- 專案驗收：Sign off on the handover protocol（簽署移交協議書）。',
            tip: '保固條款 (Warranty)：Warranty period begins upon commercial commissioning and covers free replacement of defective components for twelve calendar months.'
          }
        ],
        vocab: [
          { word: 'certification', ipa: '/ˌsɜːrtɪfɪˈkeɪʃən/', pos: 'n.', def: '認證；證書', example: 'The facility successfully obtained ISO 9001 quality management certification.' },
          { word: 'compliance', ipa: '/kəmˈplaɪəns/', pos: 'n.', def: '合規；遵守', example: 'All export electronic toys are subjected to stringent RoHS environmental compliance testing.' },
          { word: 'milestone', ipa: '/ˈmaɪlstoʊn/', pos: 'n.', def: '里程碑；重大進展', example: 'Completing the thermal vacuum chamber test marks a critical project milestone.' },
          { word: 'warranty', ipa: '/ˈwɔːrənti/', pos: 'n.', def: '保固；保證書', example: 'The industrial laser cutter is covered under a comprehensive three-year manufacturer warranty.' },
          { word: 'teleconference', ipa: '/ˈtelɪˌkɑːnfərəns/', pos: 'n.', def: '視訊/電話會議', example: 'We have scheduled a weekly teleconference with the German design engineering team.' },
          { word: 'verification', ipa: '/ˌverɪfɪˈkeɪʃən/', pos: 'n.', def: '驗證；核實', example: 'Final system verification requires running the production line uninterrupted for seventy-two hours.' }
        ],
        phrases: [
          { phrase: 'sign off on', def: '正式批准；簽署認可', example: 'The lead technical auditor will sign off on the facility inspection report this afternoon.' },
          { phrase: 'walk through', def: '帶領逐步審查；演練', example: 'Let us walk through the acceptance test procedure checklist together before client arrival.' },
          { phrase: 'in accordance with', def: '依照；與……一致', example: 'The structural welding was executed strictly in accordance with international maritime codes.' },
          { phrase: 'wrap up', def: '圓滿結束；收尾', example: 'Let us wrap up today\'s teleconference and summarize the agreed action items.' }
        ],
        dialogue: [
          { speaker: 'Project Lead', text: 'Good evening, everyone in Frankfurt and Taipei. Let us begin our final commissioning sign-off review.' },
          { speaker: 'German Partner', text: 'Hello, Frank. We reviewed the Site Acceptance Test data sent this morning. All automated axes met the speed benchmarks.' },
          { speaker: 'Project Lead', text: 'Were there any non-conformities noted during the twenty-four-hour endurance stress run?' },
          { speaker: 'German Partner', text: 'None whatsoever. The optical alignment remained within 0.005 millimeters. We are ready to sign off on the handover protocol.' },
          { speaker: 'Project Lead', text: 'Splendid news! We will finalize the warranty documentation and transmit the signed copies by midnight.' }
        ]
      }
    ]
  },
  {
    id: 'intl',
    title: '國際英文檢定與留學考試｜官方規格精通',
    badge: 'GEPT · TOEIC · SAT · GRE · GMAT · TOEFL iBT 2026',
    intro: '提供六種考試的教學與原創示例；完整官方題庫並未全部收錄。考試包括：全民英檢 (GEPT 全級別)、多益 (TOEIC L&R + S&W)、Digital SAT (雙模組適性與科學長文)、GRE (雙空三空邏輯反差與 Issue 立論)、GMAT (批判推理五大模型與商業決策)、以及 TOEFL iBT 2026 最新改革新題型。每科均具備官方規格拆解、高頻核心詞彙發音庫、實戰必備語塊與學術商務情境對話。',
    chapters: [
      {
        id: 'gept',
        num: '01',
        title: '全民英檢 GEPT 全級別實戰',
        subtitle: '初級至優級對標・四技能評量規準・短文翻譯與申論答辯',
        curriculumCode: 'CEFR 全階對照認證 (A2–C2)',
        stage: '終生學習與國際認證',
        cefr: 'A2 ~ C2 (初級、中級、中高級、高級、優級全階)',
        competency: 'B1 符號運用、A1 自我精進、C3 國際理解',
        learningPerformance: '完整掌握全民英檢五大級別之聽、說、讀、寫評量規準；初級至中高級各階段寫作與口說評分量表解構。',
        learningContent: 'LTTC 全民英檢各級詞彙量（初級2260字、中級5000字、中高級8000字）；短文翻譯、段落寫作與口試回答技巧。',
        guideline: '財團法人語言訓練測驗中心（LTTC）全民英檢各級能力指標與通過門檻規準。',
        concepts: [
          {
            heading: 'GEPT 初級至優級對標與通過門檻',
            body: '全民英檢 (GEPT) 是台灣最具信度的分級測驗，全面對標 CEFR 國際架構：\n1. 初級 (A2)：國中畢業程度。聽讀第一階段通過後始得考說寫（短句寫作與口說複誦）。\n2. 中級 (B1)：高中畢業程度。中譯英短文翻譯、生活經驗敘事寫作 (120字)、朗讀與回答問題。\n3. 中高級 (B2)：大學英語畢業門檻。長篇學術聽力、論述性寫作、口頭觀點闡述。\n4. 高級 (C1)：涉外商務與專業翻譯。圖表長篇評析、跨學科摘要、無主持小組討論。\n5. 優級 (C2)：最高語言境地。整合視聽資料長文研析、即席英文簡報與專業答辯。',
            tip: '說寫第二階段高分關鍵：發音清晰度、重音節奏、任務完整度（Task Completion）與論證連貫性。'
          },
          {
            heading: 'GEPT 寫作與口說評閱規準重點',
            body: '口說三向度：發音與語調 (Pronunciation & Intonation)、文法與詞彙 (Grammar & Vocabulary)、語流與內容連貫 (Fluency & Coherence)。\n寫作兩大關鍵：切合題意、邏輯銜接。初中級著重句子文法正確；中高級以上著重段落轉折與論點深度。',
            tip: '口試時若口誤，可自然修正（"Excuse me, I meant to say..."），考官不會扣分，反而體現自我監控能力。'
          }
        ],
        vocab: [
          { word: 'proficiency', ipa: '/prəˈfɪʃənsi/', pos: 'n.', def: '精通；熟練度', example: 'GEPT measures English language proficiency across listening, reading, writing, and speaking.' },
          { word: 'certificate', ipa: '/sərˈtɪfɪkət/', pos: 'n.', def: '證書；合格證照', example: 'Passing both stages of the exam qualifies you for the official GEPT certificate.' },
          { word: 'assessment', ipa: '/əˈsesmənt/', pos: 'n.', def: '評量；評估', example: 'Diagnostic assessment identifies targeted skill gaps before the official exam.' },
          { word: 'competence', ipa: '/ˈkɑːmpɪtəns/', pos: 'n.', def: '勝任能力；技能', example: 'Communicative competence requires cultural awareness as well as grammatical accuracy.' },
          { word: 'fluency', ipa: '/ˈfluːənsi/', pos: 'n.', def: '流利度；流暢', example: 'Regular conversational practice improves oral fluency and phonemic confidence.' },
          { word: 'articulate', ipa: '/ɑːrˈtɪkjəleɪt/', pos: 'v./adj.', def: '清楚表達；善於言辭的', example: 'Candidates must articulate their viewpoints with structured supporting evidence.' }
        ],
        phrases: [
          { phrase: 'in terms of', def: '就……而言', example: 'In terms of oral fluency, she performed exceptionally well in the interview.' },
          { phrase: 'stand a chance of', def: '有……的機會/希望', example: 'With thorough preparation, you stand a great chance of passing the High-Intermediate level.' },
          { phrase: 'cope with', def: '應對；處理', example: 'Active listening helps candidates cope with complex multi-speaker discussions.' },
          { phrase: 'bring about', def: '引起；導致', example: 'Technological innovations bring about profound transformations in language learning.' }
        ],
        dialogue: [
          { speaker: 'Examiner', text: 'Good morning. Could you explain how modern technology influences your daily study routine?' },
          { speaker: 'Candidate', text: 'Good morning. In terms of vocabulary acquisition, mobile applications enable spaced repetition anytime, anywhere.' },
          { speaker: 'Examiner', text: 'What is a potential drawback of relying excessively on automated translation tools?' },
          { speaker: 'Candidate', text: 'It may undermine one\'s capacity to formulate idiomatic sentence structures independently.' },
          { speaker: 'Examiner', text: 'Well articulated. Thank you very much.' }
        ]
      },
      {
        id: 'toeic',
        num: '02',
        title: 'TOEIC 多益國際商務測驗',
        subtitle: 'L&R 聽讀 990 滿分配速・Part 1–7 各大題秒殺破綻・商務情境',
        curriculumCode: 'CEFR B1–C1 (商務英語指標)',
        stage: '國際職場與商務溝通',
        cefr: 'B1 ~ C1 (TOEIC 550–990 金色證書)',
        competency: 'B1 符號運用、C2 團隊合作、A3 規劃執行',
        learningPerformance: '掌握 TOEIC 聽力與閱讀 200 題 120 分鐘極限配速；迅速辨識 Part 5 詞性填空、Part 6 篇章結構與 Part 7 跨篇閱讀破題點。',
        learningContent: 'ETS 國際商務十三大情境；商業採購、物流運輸、人事招聘、財務報表與商務差旅高頻語料。',
        guideline: 'ETS TOEIC Listening & Reading 官方分數對照表與 scaled score 轉換標準。',
        concepts: [
          {
            heading: 'L&R 200 題 120 分鐘實戰配速與防超時策略',
            body: '聽力 100 題約 45 分鐘，閱讀 100 題 75 分鐘：\n1. Part 1 照片題 (6題)：先看人動作，無人看物位置；依照片判斷狀態與動作；無人照片仍可能符合 has been p.p.，不能只憑無人就排除。\n2. Part 2 簡短應答 (25題)：聽清楚第一個單字（Wh- 疑問詞 vs 助動詞）；回應可直接回答，也可用理由或替代安排間接回應；須與問題的溝通目的相關。\n3. Part 3/4 對話與獨白 (69題)：利用音檔讀說明時間，提前畫線「下一題組 3 道題幹與選項核心詞」。\n4. Part 5 單句填空 (30題)：限時 10–12 分鐘，平均每題 20 秒，先辨詞性與文法。\n5. Part 6 段落填空 (16題)：限時 8–10 分鐘，句子插入題看前後邏輯鉤子。\n6. Part 7 閱讀理解 (54題)：限時 50–55 分鐘，雙篇與三篇閱讀必須進行「跨文本資訊交叉比對 (Cross-text Synthesis)」。',
            tip: '考場硬性規則：聽力播放時嚴禁跨區翻看閱讀題；兩大 Section 之間不可折返劃記！'
          },
          {
            heading: '多益高頻商務場景核心語塊 (Business Collocations)',
            body: '採購物流 (procurement & logistics)、航班行程 (flight itinerary)、開立發票 (issue an invoice)、費用核銷 (expense reimbursement)、會議議程 (meeting agenda)、人事招募 (recruitment & onboarding)、廠房巡檢 (facility inspection)。',
            tip: '同音/近音干擾陷阱：Part 2 常出現發音相近但意思無關的字（如 coffee vs copy, plan vs plant）誘騙考生，這類選項 99% 是陷阱！'
          }
        ],
        vocab: [
          { word: 'itinerary', ipa: '/aɪˈtɪnəreri/', pos: 'n.', def: '行程表；旅行路線', example: 'The travel coordinator emailed the finalized flight itinerary to all conference attendees.' },
          { word: 'reimbursement', ipa: '/ˌriːɪmˈbɜːrsmənt/', pos: 'n.', def: '核銷；費用報銷', example: 'Submit your travel receipts to accounting for prompt travel reimbursement.' },
          { word: 'negotiate', ipa: '/nɪˈɡoʊʃieɪt/', pos: 'v.', def: '談判；協商', example: 'The procurement team managed to negotiate a fifteen percent volume discount.' },
          { word: 'procurement', ipa: '/prəˈkjʊrmənt/', pos: 'n.', def: '採購；取得', example: 'The director oversaw the procurement of energy-efficient manufacturing machinery.' },
          { word: 'invoice', ipa: '/ˈɪnvɔɪs/', pos: 'n./v.', def: '發票；開立發票', example: 'Payment must be remitted within thirty days of the invoice date.' },
          { word: 'inventory', ipa: '/ˈɪnvəntɔːri/', pos: 'n.', def: '庫存；存貨清單', example: 'The quarterly warehouse audit verified physical inventory counts against digital records.' }
        ],
        phrases: [
          { phrase: 'follow up on', def: '追蹤；跟進（進度）', example: 'I am calling to follow up on the customized promotional brochures we requested.' },
          { phrase: 'at your earliest convenience', def: '在您方便時儘速', example: 'Please review the attached contract and sign at your earliest convenience.' },
          { phrase: 'in accordance with', def: '依照；符合（規定）', example: 'All operations are conducted in accordance with international safety protocols.' },
          { phrase: 'run out of', def: '用盡；短缺', example: 'The assembly floor has run out of size-M industrial gaskets.' }
        ],
        dialogue: [
          { speaker: 'Manager', text: 'Hello, Jason. Did the supplier confirm delivery for the new packaging units?' },
          { speaker: 'Coordinator', text: 'Yes, Ms. Vance. They sent the updated invoice and guaranteed delivery by next Wednesday.' },
          { speaker: 'Manager', text: 'Excellent. Please submit the paperwork to accounting for purchase reimbursement.' },
          { speaker: 'Coordinator', text: 'Will do. I will also follow up on the shipment tracking number tomorrow morning.' },
          { speaker: 'Manager', text: 'Thank you. Keep me posted on any logistical delays.' }
        ]
      },
      {
        id: 'sat',
        num: '03',
        title: 'Digital SAT Reading and Writing',
        subtitle: '雙模組適性 (MST) 演算法・Craft & Structure・長難句修辭',
        curriculumCode: 'CEFR B2–C1 (美加名校入學學術測驗)',
        stage: '海外留學與高等學術英語',
        cefr: 'B2 ~ C1 (Digital SAT 1200–1600)',
        competency: 'A2 系統思考、B1 符號運用、B2 資訊素養',
        learningPerformance: '駕馭 Digital SAT 雙模組多階段適性測驗（MST）演算法；精通 Craft & Structure, Information & Ideas, Standard English, Rhetorical Synthesis 四大領域。',
        learningContent: '學術跨領域極短篇精讀；高難度句子修辭與修飾語錯置（Dangling Modifiers）；圖表數據因果反差推理。',
        guideline: 'College Board Digital SAT 官方評量標準與難度適性跳轉門檻規範。',
        concepts: [
          {
            heading: 'Digital SAT 兩階段模組化適應性測驗 (MST) 機制',
            body: 'Digital SAT 閱讀與寫作包含兩個 27 題、32 分鐘的模組 (Modules)：\n1. Module 1（路由模組）：難度均勻分佈。系統採用邊界最大似然估計 (BMLE) 計算考生能力值 $\hat{\theta}$。\n2. Module 2（自適應模組）：\n- 若 Module 1 表現優異，進入 Hard Module 2，解鎖最高 800 分滿分區間。\n- 若 Module 1 表現不佳，進入 Easy Module 2，分數天花板受限（通常不高於 600 分）。\n3. 最終成績以 EAP (Expected A Posteriori) 聯合反應向量精算，包含標準測量誤差 (SEM)。',
            tip: '實戰策略：Module 1 前 15 題不容失誤，確保穩定打入 Hard Module 2！'
          },
          {
            heading: '四大領域解題精義 (Construct Blueprint)',
            body: '1. Craft and Structure (28%)：高難度語境詞彙精析（如 delineate, corroborate）、作者論證結構與修辭手法。\n2. Information and Ideas (26%)：中心主旨抓取、文本證據定位、科學數據圖表詮釋與隱含假設推論。\n3. Standard English Conventions (26%)：長句語法結構、主謂一致、標點符號 (分號連接兩獨立子句、冒號引導同位補充、破折號插入修飾)。\n4. Expression of Ideas (20%)：修辭修訂、段落銜接過渡詞、學生研究筆記整合 (Rhetorical Synthesis)。',
            tip: '標點題秒殺法則：兩個獨立完整子句 (Independent Clauses) 之間，不可僅用逗號連接（Comma Splice 錯誤），必須使用分號 (;) 或逗號加對等連接詞 (, and)！'
          }
        ],
        vocab: [
          { word: 'delineate', ipa: '/dɪˈlɪnieɪt/', pos: 'v.', def: '描繪；詳細勾勒', example: 'The research paper clearly delineates the boundaries of the theoretical framework.' },
          { word: 'corroborate', ipa: '/kəˈrɑːbəreɪt/', pos: 'v.', def: '證實；確證', example: 'Satellite telemetry corroborated the oceanographer\'s temperature anomaly calculations.' },
          { word: 'juxtaposition', ipa: '/ˌdʒʌkstəpəˈzɪʃən/', pos: 'n.', def: '並置；並列對比', example: 'The poet uses the juxtaposition of urban decay and natural renewal to convey hope.' },
          { word: 'pragmatic', ipa: '/præɡˈmætɪk/', pos: 'adj.', def: '務實的；實用主義的', example: 'The municipal government adopted a pragmatic approach to affordable housing construction.' },
          { word: 'unequivocal', ipa: '/ˌʌnɪˈkwɪvəkəl/', pos: 'adj.', def: '明確無誤的；不容置疑的', example: 'The genetic evidence provided unequivocal proof of the species\' lineage.' },
          { word: 'ambiguous', ipa: '/æmˈbɪɡjuəs/', pos: 'adj.', def: '含糊不清的；有歧義的', example: 'The statutory language was ambiguous, leaving room for divergent judicial interpretations.' }
        ],
        phrases: [
          { phrase: 'shed light on', def: '闡明；解釋清楚', example: 'Recent neuroimaging studies shed light on how memories consolidate during deep sleep.' },
          { phrase: 'take into account', def: '考慮到；顧及', example: 'The urban planning committee must take environmental sustainability into account.' },
          { phrase: 'by the same token', def: '同理；基於同樣的理由', example: 'We must respect local customs, and by the same token, visitors should respect ours.' },
          { phrase: 'play a pivotal role', def: '發揮關鍵樞紐作用', example: 'Renewable energy infrastructure plays a pivotal role in reducing global carbon emissions.' }
        ],
        dialogue: [
          { speaker: 'Instructor', text: 'Let us examine question fourteen from SAT Module 2. Why is Option C the only defensible choice?' },
          { speaker: 'Student', text: 'The text states that recent soil samples contradict the conventional volcanic hypothesis.' },
          { speaker: 'Instructor', text: 'And which vocabulary term in Option C captures that contradiction?' },
          { speaker: 'Student', text: '"Undermine"! It means to weaken the credibility of the prior conjecture.' },
          { speaker: 'Instructor', text: 'Spot on. In Digital SAT Information and Ideas questions, precise vocabulary alignment with textual evidence is king.' }
        ]
      },
      {
        id: 'gre',
        num: '04',
        title: 'GRE General Exam 語意與論證',
        subtitle: 'Verbal 130–170 雙空三空邏輯反差・Sentence Equivalence・Issue 立論',
        curriculumCode: 'CEFR C1–C2 (研究所入學學術批判)',
        stage: '研究所入學與學術深造',
        cefr: 'C1 ~ C2 (GRE Verbal 155–170)',
        competency: 'A2 系統思考、5-Ⅴ-1 邏輯批判思維',
        learningPerformance: '掌握 Text Completion 單/雙/三空與 Sentence Equivalence 雙生同義詞邏輯轉折；解構學術長篇密集論證與反直覺觀點。',
        learningContent: 'GRE 高階難詞與同義語族；語意反差標記（Contrast clues）；Issue 立論分析與反駁架構。',
        guideline: 'ETS GRE General Test Verbal Reasoning 官方評量標準與雙向細目。',
        concepts: [
          {
            heading: 'Text Completion 與 Sentence Equivalence 邏輯密碼',
            body: 'GRE Verbal 考的不是生僻詞本身，而是「邏輯正反向關係 (Logical Directionality)」：\n1. 同向信號詞：and, therefore, consequently, moreover, similarly, because $\to$ 判斷補充、因果或並列關係；不保證空格與前詞同義。\n2. 反向信號詞：although, however, nevertheless, paradoxically, ironically, far from, rather than $\to$ 檢查語意反差發生在哪兩個命題；不保證空格字詞必為反義。\n3. Sentence Equivalence（句子等價題）：六選二，兩個正確選項填入後必須讓全句語意完全一致，兩個選項都須符合句意，且填入後句意相近；不能只配對同義字。\n4. 三空題策略：從最具確定性線索的那個空格破題，切勿死板從第一空格硬猜！',
            tip: 'GRE 邏輯陷阱：避免加入過多主觀世俗常識，嚴格依據題幹內的對應詞 (Pivot Words) 判定正負色彩。'
          },
          {
            heading: 'Analytical Writing Issue 30 分鐘五步立論法',
            body: 'GRE Issue 寫作要求針對複雜學術/社會議題提出深刻批判論證：\n1. 審題破題 (3分鐘)：辨析題目預設前提 (Premise) 與極端詞 (invariably, only)。\n2. 立場聲明 (Thesis)：提出具備複雜度之觀點（"While X offers tangible merits, uncritical adoption poses Y..."）。\n3. 正面論證 (Body 1 & 2)：舉出自然科學、歷史或社會學實證案例，推導因果機制。\n4. 承認反對意見與駁斥 (Counterargument & Refutation)：展現多視角思維深度。\n5. 結論昇華 (Conclusion)：總結主張並提出兼顧現實之政策/哲學建言。',
            tip: 'Issue 評分量表 (0–6分)：4 分看論點完整，5 分看例子深刻，6 分看批判思維 (Critical Insight) 與語言駕馭的精準度。'
          }
        ],
        vocab: [
          { word: 'ephemeral', ipa: '/ɪˈfemərəl/', pos: 'adj.', def: '短暫的；轉瞬即逝的', example: 'Fame in modern digital media is often ephemeral, fading within a matter of weeks.' },
          { word: 'equivocal', ipa: '/ɪˈkwɪvəkəl/', pos: 'adj.', def: '模稜兩可的；含糊不清的', example: 'The laboratory results were equivocal, preventing any definitive causal conclusion.' },
          { word: 'paradigm', ipa: '/ˈpærədaɪm/', pos: 'n.', def: '典範；思維架構', example: 'The discovery of quantum mechanics precipitated a profound paradigm shift in modern physics.' },
          { word: 'anomalous', ipa: '/əˈnɑːmələs/', pos: 'adj.', def: '反常的；異常的', example: 'The astronomer detected an anomalous radiation burst originating from a distant galaxy.' },
          { word: 'mitigate', ipa: '/ˈmɪtɪɡeɪt/', pos: 'v.', def: '緩和；減輕', example: 'Aggressive reforestation programs help mitigate the catastrophic impacts of climate change.' },
          { word: 'bolster', ipa: '/ˈboʊlstər/', pos: 'v.', def: '支持；加強', example: 'Empirical survey data bolstered the sociologist\'s argument regarding urban isolation.' }
        ],
        phrases: [
          { phrase: 'in stark contrast to', def: '與……形成鮮明對比', example: 'The candidate\'s modest demeanor stood in stark contrast to his predecessor\'s flamboyance.' },
          { phrase: 'weigh the pros and cons', def: '權衡利弊得失', example: 'Policymakers must weigh the pros and cons of implementing carbon taxation.' },
          { phrase: 'give rise to', def: '引起；導致', example: 'Systemic economic disparities often give rise to widespread social discontent.' },
          { phrase: 'attribute A to B', def: '將 A 歸因於 B', example: 'Biologists attribute the decline in coral reefs to elevated oceanic surface temperatures.' }
        ],
        dialogue: [
          { speaker: 'Professor', text: 'Analyze this GRE text completion sentence: "Although the senator claimed her motives were entirely altruistic, her voting record revealed an unmistakably ________ agenda."' },
          { speaker: 'Student', text: 'The pivot word is "Although," which sets up a contrast between "altruistic" and the blank!' },
          { speaker: 'Professor', text: 'Excellent. What word with negative or self-serving meaning fits the blank?' },
          { speaker: 'Student', text: '"Self-interested" or "mercenary"!' },
          { speaker: 'Professor', text: 'Precisely. Grasping the directional polarity of transitional adverbs is the cornerstone of GRE Verbal reasoning.' }
        ]
      },
      {
        id: 'gmat',
        num: '05',
        title: 'GMAT 批判推理與商業長文',
        subtitle: 'Critical Reasoning 五大模型・Data Insights 語言理解・商學院決策',
        curriculumCode: 'CEFR C1–C2 (全球頂尖商學院入學)',
        stage: '全球商學院 MBA/MS 入學',
        cefr: 'C1 ~ C2 (GMAT Focus Edition)',
        competency: 'A2 系統思考、B1 符號運用、商業決策',
        learningPerformance: '精準操作批判推理（Critical Reasoning）五大核心題型：Weaken, Strengthen, Assumption（否定測試法）, Evaluate, Boldface 角色判定。',
        learningContent: '形式邏輯因果論證；充分必要條件；商業經濟長篇密集閱讀與 Data Insights 語文綜合判讀。',
        guideline: 'GMAC GMAT Focus Edition Verbal 官方評分規準與非邏輯干擾選項排除法。',
        concepts: [
          {
            heading: '批判推理 (Critical Reasoning) 核心五大題型模型',
            body: 'GMAT 批判推理是商學院入學測驗的靈魂，考查嚴密邏輯思維：\n1. 假設題 (Assumption)：找尋作者推導結論時「未言明但必不可少的必要條件」。檢驗法：否定測試法 (Negation Technique)——將選項取非，若結論立刻崩塌，該選項必為正確答案！\n2. 削弱題 (Weaken)：找出一個新資訊，能證明「即使前提成立，結論也未必成立」（常考因果倒置、另有他因、樣本偏差）。\n3. 支持題 (Strengthen)：排除潛在他因、證實無因即無果、強化樣本代表性。\n4. 推論題 (Inference)：100% 依據題幹已知事實推導，嚴禁任何無端腦補。\n5. 評價題 (Evaluate)：找出若回答 Yes 或 No 會分別強烈支持或削弱結論的關鍵變數。',
            tip: '現行 GMAT 規則：徹底排除舊版文法改錯 (Sentence Correction)；完成全卷 23 題後，若有剩餘時間，可以檢查本節作答，但至多修改 3 道題答案！'
          },
          {
            heading: '商學長文精讀與 Data Insights 跨文本邏輯',
            body: 'GMAT 閱讀篇幅長、句法密集，涉及企業管理戰略、金融市場、科技演進、反壟斷監管：\n- 略讀框架：每段只精讀第一句與轉折句，在草稿紙寫下段落功能（P1: 提出舊理論；P2: 實驗挑戰舊理論；P3: 提出新修正模型）。\n- Data Insights 語言整合：比對圖表趨勢與多來源文本陳述，找出邏輯矛盾與數據盲區。',
            tip: '商業決策題常見陷阱：將「相關性 (Correlation)」誤當成「因果性 (Causation)」，或將「利潤增加」誤當成「銷售額增加」（忽略成本變量）。'
          }
        ],
        vocab: [
          { word: 'fallacy', ipa: '/ˈfæləsi/', pos: 'n.', def: '謬誤；荒謬推論', example: 'Assuming temporal succession equates to causal influence is a classic logical fallacy.' },
          { word: 'substantiate', ipa: '/səbˈstænʃieɪt/', pos: 'v.', def: '證實；用實體證據支持', example: 'The chief financial officer failed to substantiate her bullish quarterly revenue forecast.' },
          { word: 'viability', ipa: '/ˌvaɪəˈbɪləti/', pos: 'n.', def: '可行性；存續能力', example: 'Venture capitalists closely scrutinized the commercial viability of the electric aircraft startup.' },
          { word: 'volatile', ipa: '/ˈvɑːlətl/', pos: 'adj.', def: '不穩定的；易波動的', example: 'Cryptocurrency markets are notoriously volatile, subject to sudden regulatory headwinds.' },
          { word: 'leverage', ipa: '/ˈlevərɪdʒ/', pos: 'v./n.', def: '槓桿；利用；發揮作用', example: 'The enterprise aims to leverage cloud analytics to optimize its global supply chain.' },
          { word: 'premise', ipa: '/ˈpremɪs/', pos: 'n.', def: '前提；假定', example: 'The consultant\'s recommendation rests on the premise that consumer spending will rebound.' }
        ],
        phrases: [
          { phrase: 'on the assumption that', def: '在……的假定下', example: 'The financial projection was formulated on the assumption that interest rates remain stable.' },
          { phrase: 'account for', def: '解釋原因；占比例', example: 'Operational inefficiencies account for a substantial fraction of production losses.' },
          { phrase: 'pave the way for', def: '為……鋪平道路', example: 'Successful venture trials paved the way for a multibillion-dollar initial public offering.' },
          { phrase: 'lead to', def: '導致；造成', example: 'Regulatory complacency can lead to severe systemic market vulnerabilities.' }
        ],
        dialogue: [
          { speaker: 'Consultant', text: 'The client argues that lowering prices will inevitably increase market share and net profits.' },
          { speaker: 'Associate', text: 'What is the flawed assumption in their reasoning?' },
          { speaker: 'Consultant', text: 'They assume production costs per unit will remain constant even as production scales rapidly.' },
          { speaker: 'Associate', text: 'And they also overlook competitor retaliation: rival firms might initiate an aggressive price war!' },
          { speaker: 'Consultant', text: 'Exactly. Pinpointing those unstated assumptions is how we dismantle flawed business arguments in GMAT Critical Reasoning.' }
        ]
      },
      {
        id: 'toefl',
        num: '06',
        title: 'TOEFL iBT 2026 新制四技能',
        subtitle: '2026 新制 1–6 量尺・學術在線討論寫作・聽後複誦與訪談',
        curriculumCode: 'CEFR B2–C1+ (海外學術英語能力)',
        stage: '海外大學與研究所學術溝通',
        cefr: 'B2 ~ C1+ (TOEFL iBT 2026 新制 90–120分)',
        competency: 'B1 符號溝通、B2 科技資訊、C3 多元文化',
        learningPerformance: '掌握 2026 TOEFL iBT 新制四技能：學術討論在線寫作（Writing for an Academic Discussion）、聽講速記與即席口說答辯。',
        learningContent: '北美大學學術講座聽力；校園日常生活情境對話；學術閱讀長句簡化與觀點整合。',
        guideline: 'ETS TOEFL iBT 官方四技能評分量表（Rubrics）與 CEFR B2/C1 等級對照規準。',
        concepts: [
          {
            heading: 'TOEFL iBT 2026 年最新考制改革剖析',
            body: 'ETS 自 2026 年起正式推出 TOEFL iBT 全新適性題型與 1–6 分數制（每 0.5 分一級距）：\n1. 寫作新題型：\n- 句子建構 (Sentence Construction)：重組複雜學術長句。\n- 電子郵件寫作 (Email Task)：針對校園行政或工作情境進行快速精準書信應答。\n- 學術討論 (Write for an Academic Discussion)：閱讀討論提示與同學發言後，提出與題目相關的立場、理由和支持細節；作答時間與字數指示以當次官方題目為準。\n2. 口說新題型：\n- 聽後逐句複誦 (Listen and Repeat)：考查語音工作記憶與音素精準度。\n- 訪談式問答 (Interview Format)：模擬與學術導師之互動式面談。',
            tip: '新制評分重視「溝通可理解度 (Communicative Intelligibility)」與「任務達成率」，不再鼓勵空洞堆砌生僻詞！'
          },
          {
            heading: '學術討論寫作 (Academic Discussion) 高分架構',
            body: '10 分鐘 100+ 字黃金攻略：\n1. 表達立場並呼應同學（1-2句）："While I acknowledge Sarah\'s concern regarding cost, I firmly align with David\'s perspective that..."\n2. 展開自己的核心論點（3-4句）：提出一個全新的視角或深化理由，切勿單純重複前面同學講過的話。\n3. 給出具體實證例證（3-4句）：舉出真實校園、科技或社會案例進行支撐。\n4. 總結句（1句）：有力扣回題目教授的核心提問。',
            tip: '時間管理：前 2 分鐘讀題立意，5 分鐘打字完成草稿，最後 3 分鐘檢查動詞時態、主動詞一致與拼字。'
          }
        ],
        vocab: [
          { word: 'collaborate', ipa: '/kəˈlæbəreɪt/', pos: 'v.', def: '合作；協同工作', example: 'Students from diverse faculties collaborated on the interdisciplinary clean energy initiative.' },
          { word: 'paraphrase', ipa: '/ˈpærəfreɪz/', pos: 'v./n.', def: '意譯；改述', example: 'In the integrated task, you should paraphrase the professor\'s arguments without quoting verbatim.' },
          { word: 'academic', ipa: '/ˌækəˈdemɪk/', pos: 'adj./n.', def: '學術的；學者', example: 'Academic integrity requires citing external scholarly sources meticulously.' },
          { word: 'articulate', ipa: '/ɑːrˈtɪkjəleɪt/', pos: 'v./adj.', def: '清晰闡明；善於說話的', example: 'The candidate articulated her research thesis clearly during the interview.' },
          { word: 'synthesis', ipa: '/ˈsɪnθəsɪs/', pos: 'n.', def: '綜合；整合', example: 'The integrated writing response requires a cohesive synthesis of listening and reading passages.' },
          { word: 'fluency', ipa: '/ˈfluːənsi/', pos: 'n.', def: '流利度；熟練度', example: 'Consistent oral practice develops natural rhythm and communicative fluency.' }
        ],
        phrases: [
          { phrase: 'in terms of', def: '就……而言', example: 'In terms of feasibility, the proposed campus solar project is highly promising.' },
          { phrase: 'come up with', def: '想出（解決方案）', example: 'Our study group came up with an innovative method to conserve laboratory energy.' },
          { phrase: 'keep in mind', def: '牢記；記住', example: 'Keep in mind that the listening audio will only be played once during the test.' },
          { phrase: 'figure out', def: '弄清楚；解決', example: 'Students must figure out the author\'s primary intent from contextual clues.' }
        ],
        dialogue: [
          { speaker: 'Professor', text: 'Welcome to our online discussion board. Today\'s question: Should cities subsidize electric public transit to combat emissions?' },
          { speaker: 'Student', text: 'I strongly support this measure, Professor. Subsidies lower the barrier to adoption and simultaneously reduce vehicular congestion.' },
          { speaker: 'Professor', text: 'Interesting point. How would municipal authorities finance the initial capital expenditure without raising income taxes?' },
          { speaker: 'Student', text: 'Municipalities can reallocate highway expansion budgets and leverage green municipal bonds to cover upfront infrastructure costs.' },
          { speaker: 'Professor', text: 'A thoughtful and concrete fiscal solution. Well done!' }
        ]
      }
    ]
  }
];

export const examStudy = {
  gept: {
    name: '全民英檢 GEPT',
    subtitle: '初級 → 中級 → 中高級 → 高級 → 優級',
    intro: '台灣最具公信力之英語能力檢定，分聽讀、說寫兩階段評量，全面對標 CEFR 國際架構。',
    modules: [
      '初級 (A2)：日常生活基礎溝通；短對話聽辨、簡易造句與生活短文閱讀。',
      '中級 (B1)：高中畢業程度；掌握篇章主旨、中譯英短句、基本生活敘事作文。',
      '中高級 (B2)：大學英語能力指標；長篇學術聽力、論述寫作、深入口語申論。',
      '高級 (C1)：專業涉外能力；跨領域學術摘要、圖表長篇綜合評析、小組互動討論。',
      '優級 (C2)：最高語言境界；專案長篇文獻整合研析、即席英文簡報與專業答辯。'
    ],
    vocab: [
      { word: 'proficiency', ipa: '/prəˈfɪʃənsi/', pos: 'n.', def: '精通；熟練度', example: 'GEPT assesses comprehensive English language proficiency across four skills.' },
      { word: 'certificate', ipa: '/sərˈtɪfɪkət/', pos: 'n.', def: '證書；執照', example: 'Passing both stages entitles candidates to an official GEPT certificate.' },
      { word: 'assessment', ipa: '/əˈsesmənt/', pos: 'n.', def: '評量；評估', example: 'Formative assessment guides targeted remediation before the official test.' }
    ],
    source: 'https://www.gept.org.tw/Exam_Intro/t01_introduction.asp'
  },
  toeic: {
    name: 'TOEIC 多益國際商務測驗',
    subtitle: 'L&R 聽力閱讀 (990分) · S&W 口說寫作 (400分)',
    intro: '全球各大跨國企業與航空商務首選之職場英文溝通能力標準測驗。',
    modules: [
      'L&R Part 1–4 聽力 (100題/45分)：照片描述、簡短應答、雙人簡短對話、商務簡短獨白。',
      'L&R Part 5–7 閱讀 (100題/75分)：單句填空、篇章克漏字、單篇與雙篇/三篇跨文本閱讀。',
      'S&W 口說與寫作：圖片口頭描述、回答問題、提出解決方案、商務 Email 回覆與意見論述。',
      '職場高頻情境：全球採購、物流交期、供應鏈管理、金融投資、商務旅行與人事招募。'
    ],
    vocab: [
      { word: 'itinerary', ipa: '/aɪˈtɪnəreri/', pos: 'n.', def: '行程表；旅行路線', example: 'The travel coordinator emailed the finalized flight itinerary to all conference attendees.' },
      { word: 'reimbursement', ipa: '/ˌriːɪmˈbɜːrsmənt/', pos: 'n.', def: '核銷；費用報銷', example: 'Submit your travel receipts to accounting for prompt travel reimbursement.' },
      { word: 'negotiate', ipa: '/nɪˈɡoʊʃieɪt/', pos: 'v.', def: '談判；協商', example: 'The procurement team managed to negotiate a fifteen percent volume discount.' }
    ],
    source: 'https://www.toeic.com.tw/toeic/listening-reading/about/content/'
  },
  sat: {
    name: 'SAT Reading and Writing',
    subtitle: 'Digital Suite · 2 Modules · 54 Questions · 64 Minutes',
    intro: '美國大學入學標準測驗數位版，採用模組化適應性測驗 (MST) 架構。',
    modules: [
      'Craft and Structure (28%)：高難度語境詞彙精析、修辭手法、段落篇章結構與論證目的。',
      'Information and Ideas (26%)：中心主旨抓取、文本佐證定位、科學數據圖表詮釋與隱含假設推論。',
      'Standard English Conventions (26%)：長句語法結構、主謂一致、標點符號 (分號、冒號、破折號)。',
      'Expression of Ideas (20%)：修辭修訂、段落銜接、過渡副詞、筆記整合寫作 (Rhetorical Synthesis)。'
    ],
    vocab: [
      { word: 'delineate', ipa: '/dɪˈlɪnieɪt/', pos: 'v.', def: '描繪；詳細勾勒', example: 'The research paper clearly delineates the boundaries of the theoretical framework.' },
      { word: 'corroborate', ipa: '/kəˈrɑːbəreɪt/', pos: 'v.', def: '證實；確證', example: 'Satellite telemetry corroborated the oceanographer\'s temperature anomaly calculations.' },
      { word: 'juxtaposition', ipa: '/ˌdʒʌkstəpəˈzɪʃən/', pos: 'n.', def: '並置；並列對比', example: 'The poet uses the juxtaposition of urban decay and natural renewal to convey hope.' }
    ],
    source: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing'
  },
  gre: {
    name: 'GRE General Exam',
    subtitle: 'Verbal Reasoning (130–170) · Analytical Writing Issue (0–6)',
    intro: '全球頂尖理工、人文與商學院研究所入學測驗短版規格。',
    modules: [
      'Text Completion (雙空/三空填空)：深層語意邏輯反差、學術高難度詞彙對辨，須全對始給分。',
      'Sentence Equivalence (句子等價)：在六個選項中挑選「兩個意義相同且填入後句意完全吻合」的單字。',
      'Reading Comprehension (長篇閱讀與學術批判)：抽象人文社科哲學文本精讀、作者預設前提檢驗。',
      'Analytical Writing Issue (30分鐘限時立論)：針對複雜爭議政策提出嚴謹論證，權衡反駁觀點並給出立論依據。'
    ],
    vocab: [
      { word: 'ephemeral', ipa: '/ɪˈfemərəl/', pos: 'adj.', def: '短暫的；轉瞬即逝的', example: 'Fame in modern digital media is often ephemeral, fading within a matter of weeks.' },
      { word: 'equivocal', ipa: '/ɪˈkwɪvəkəl/', pos: 'adj.', def: '模稜兩可的；含糊不清的', example: 'The laboratory results were equivocal, preventing any definitive causal conclusion.' },
      { word: 'paradigm', ipa: '/ˈpærədaɪm/', pos: 'n.', def: '典範；思維架構', example: 'The discovery of quantum mechanics precipitated a profound paradigm shift in modern physics.' }
    ],
    source: 'https://www.ets.org/gre/score-users/about/general-test/content-structure.html'
  },
  gmat: {
    name: 'GMAT',
    subtitle: 'Verbal Reasoning (23題/45分，量尺 60–90 分)',
    intro: '全球頂級商學院 MBA / MS 核心能力評估，強調商業邏輯推演與批判思維。',
    modules: [
      'Critical Reasoning (批判推理)：前提 (Premise) 與結論 (Conclusion) 拆解、假設檢驗 (Assumption)、削弱 (Weaken)、支持 (Strengthen)。',
      'Reading Comprehension (商學長文)：經濟學理論、企業管理個案、科技演進史長篇分析。',
      '現行 GMAT 規則：徹底移除舊制 Sentence Correction 與作文，作答完畢至多可修改 3 題答案。',
      'Data Insights 語言理解加強：圖表判讀、多來源資訊比對 (Multi-Source Reasoning)。'
    ],
    vocab: [
      { word: 'fallacy', ipa: '/ˈfæləsi/', pos: 'n.', def: '謬誤；荒謬推論', example: 'Assuming temporal succession equates to causal influence is a classic logical fallacy.' },
      { word: 'substantiate', ipa: '/səbˈstænʃieɪt/', pos: 'v.', def: '證實；用實體證據支持', example: 'The chief financial officer failed to substantiate her bullish quarterly revenue forecast.' },
      { word: 'viability', ipa: '/ˌvaɪəˈbɪləti/', pos: 'n.', def: '可行性；存續能力', example: 'Venture capitalists closely scrutinized the commercial viability of the electric aircraft startup.' }
    ],
    source: 'https://www.mba.com/exams/gmat-exam/about/exam-structure'
  },
  toefl: {
    name: 'TOEFL iBT 2026 新制',
    subtitle: '四技能適應性 · 新制 1–6 分數制 (0.5 級距)',
    intro: 'ETS 2026 年最新改革考制，注重學術與生活情境實時互動表達能力。',
    modules: [
      'Reading：Complete the Words、Read in Daily Life、Read an Academic Passage；依官方現行版本練習。',
      'Listening Section (約29分鐘)：校園日常對話、學術講座 (Lecture) 筆記整合、教授語氣態度辨別。',
      'Writing Section (約23分鐘)：句子重組建構、商務電子郵件寫作、學術在線課堂討論 (Academic Discussion)。',
      'Speaking Section (約8分鐘)：聽後逐句複誦 (Listen and Repeat)、訪談式情境問答。'
    ],
    vocab: [
      { word: 'collaborate', ipa: '/kəˈlæbəreɪt/', pos: 'v.', def: '合作；協同工作', example: 'Students from diverse faculties collaborated on the interdisciplinary clean energy initiative.' },
      { word: 'fluency', ipa: '/ˈfluːənsi/', pos: 'n.', def: '流利度；熟練度', example: 'The speaking module assesses communicative fluency and phonemic intelligibility.' },
      { word: 'paraphrase', ipa: '/ˈpærəfreɪz/', pos: 'v./n.', def: '意譯；改述', example: 'In the integrated task, you should paraphrase the professor\'s arguments without quoting verbatim.' }
    ],
    source: 'https://www.ets.org/toefl/test-takers/ibt/about/content.html'
  }
};
