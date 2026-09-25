// curriculum.mjs - 完整 21 個章節深度知識點、核心單字庫(含IPA與發音)、實用片語庫、情境會話庫與考制模組

export const curriculum = [
  {
    id: 'jhs',
    title: '國中英文｜會考能力線',
    badge: '國中 7–9 年級 · 會考滿分主幹',
    intro: '覆蓋國中會考核心 1200 詞、基礎句型、時態變化、閱讀定位與生活聽力辨識。每章皆附文法深度剖析、發音單字庫、必背片語與情境實戰會話。',
    chapters: [
      {
        id: 'j1',
        num: '01',
        title: '句子骨架與基本時態',
        subtitle: '主詞・動詞・受詞與四大核心時態變化',
        concepts: [
          {
            heading: '英文句子的五大核心骨架',
            body: '英文是「主詞＋動詞」為軸心的形合語言。五大基本句型包括：\n1. S + V（主詞＋完全不及物動詞，如 Birds fly.）\n2. S + V + SC（主詞＋不完全不及物動詞＋主詞補詞，如 She is happy.）\n3. S + V + O（主詞＋完全及物動詞＋受詞，如 Leo reads books.）\n4. S + V + IO + DO（主詞＋授與動詞＋間接受詞＋直接受詞，如 Dad gave me a watch.）\n5. S + V + O + OC（主詞＋不完全及物動詞＋受詞＋受詞補詞，如 We painted the wall green.）',
            tip: '解題關鍵：先找出句中唯一的「主要動詞（Finite Verb）」，再檢查主詞與動詞之單複數一致性。'
          },
          {
            heading: '四大基礎時態的判斷與時間副詞標記',
            body: '1. 現在簡單式：表示習慣、真理或目前狀態。標記詞：always, usually, every day。\n2. 過去簡單式：表示過去特定時間已結束之動作。動詞加 -ed 或不規則變化。標記詞：yesterday, ago, last night。\n3. 未來簡單式：表示將要發生的事。公式：will + V 原形 或 be going to + V 原形。標記詞：tomorrow, next week, soon。\n4. 現在進行式：表示此時此刻正進行之動作。公式：be動詞 (am/is/are) + V-ing。標記詞：now, listen!, look!, at the moment。',
            tip: '會考陷阱：表示真理或科學事實時，即便句子前面是過去式，子句仍須維持現在式（例如 The teacher told us that water boils at 100°C.）。'
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
        subtitle: '主格・受格・所有格與可數不可數量詞規則',
        concepts: [
          {
            heading: '代名詞的四性格位轉換與反身代名詞',
            body: '人稱代名詞分為主格 (I, you, he, she, it, we, they)、受格 (me, you, him, her, it, us, them)、所有格形容詞 (my, your, his, her, its, our, their) 與所有格代名詞 (mine, yours, his, hers, ours, theirs)。\n反身代名詞 (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) 用於「主詞與受詞為同一個人」或「強調親自做某事」。',
            tip: '易錯點：its（所有格，它的）與 it\'s（縮寫，it is / it has）絕不可混淆！'
          },
          {
            heading: '數量詞修飾可數 vs 不可數名詞口訣',
            body: '1. 僅修飾可數複數名詞：many, several, a few（有一些，表肯定）, few（幾乎沒有，表否定）。\n2. 僅修飾不可數名詞：much, a little（有一些，表肯定）, little（幾乎沒有，表否定）。\n3. 兩者皆可修飾：some, any, a lot of, plenty of。\n注意：some 常用於肯定句與表示禮貌請求之疑問句（Would you like some tea?）；any 常用於否定句與一般疑問句。',
            tip: '會考關鍵：news, information, advice, furniture, bread, homework 皆為常見不可數名詞，絕不可加 -s！'
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
        title: '疑問句與生活溝通',
        subtitle: '5W1H 疑問詞・邀請請求・日常情境應答',
        concepts: [
          {
            heading: '5W1H 疑問詞的資訊對焦',
            body: '1. Who（問人物身份）/ Whose（問所有權）。\n2. What（問事物、職業、名稱）。\n3. When（問時間點或期間）。\n4. Where（問地點或方位）。\n5. Why（問原因，回答常伴隨 because）。\n6. How（問方式、感受、程度，衍生 How many/much/often/long/far）。',
            tip: '解題關鍵：聽力與閱讀第一直覺是「鎖定題目要哪種資訊類型」，勿被選項中重複的生字誘騙。'
          },
          {
            heading: '日常交際句型的禮貌原則',
            body: '1. 請求幫忙：Could you please...? / Would you mind + V-ing...?\n2. 提出建議：Why not + V原形? / How about + V-ing? / Let\'s + V原形.\n3. 表達意願：I would like to + V原形.\n4. 應答禮儀：You\'re welcome. / My pleasure. / Never mind. / Don\'t mention it.',
            tip: '會考必考：Would you mind opening the window? 回答若表示「不介意/可以打開」，必須回答 "No, not at all." 或 "Of course not."！'
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
        subtitle: '對等連接詞・因果轉折・時間條件副詞子句',
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
    badge: '高中 10–12 年級 · 升學衝刺高分線',
    intro: '深度剖析分詞構句、關係代名詞、倒裝假設、篇章結構四空五選、學術長篇雙文比較、7000 高階詞彙、中譯英產出與作文論述。',
    chapters: [
      {
        id: 's1',
        num: '01',
        title: '高中句法與長難句拆解',
        subtitle: '分詞構句・關係子句・倒裝與假設語氣',
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
        concepts: [
          {
            heading: '115 學年度大考篇章結構改制核心因應',
            body: '大考中心自 115 學年度起，將學測英文篇章結構題由「四個空格、四個選項」全面改制為「四個空格、五個選項（4空5選）」。\n這意味著必定會有一個「極具誘惑力之多餘干擾項（Distractor）」。\n破解策略：\n1. 閱讀前先讀五個選項，圈出每個選項的核心主題詞、轉折詞（However, Furthermore, Consequently）與代名詞（these, such, they, it）。\n2. 逐格分析前後文的「邏輯語意鉤子（Semantic Hooks）」：\n- 順承延伸：前後話題一致，尋找同義字替換或例證。\n- 轉折反駁：前後立場相反，必須有對比性字詞。\n- 因果推導：前句是原因，本句是結果，或反之。',
            tip: '切記：代名詞指涉必須「性、數、格」完全吻合前文提及的名詞，這是排除干擾項最強的鐵證！'
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
    badge: '高工／技高專業情境 · 國際工匠實務線',
    intro: '接軌工業現場與國際職場：工場安全、防護裝備、工具規格、標準作業程序 (SOP)、機電故障排除、技術圖表、商務書信與統測專業英文 (二)。',
    chapters: [
      {
        id: 'v1',
        num: '01',
        title: '工場安全與指令',
        subtitle: 'PPE 個人防護裝備・安全等級標示・緊急疏散指引',
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
    name: 'GMAT Focus Edition',
    subtitle: 'Verbal Reasoning (23題/45分，量尺 60–90 分)',
    intro: '全球頂級商學院 MBA / MS 核心能力評估，強調商業邏輯推演與批判思維。',
    modules: [
      'Critical Reasoning (批判推理)：前提 (Premise) 與結論 (Conclusion) 拆解、假設檢驗 (Assumption)、削弱 (Weaken)、支持 (Strengthen)。',
      'Reading Comprehension (商學長文)：經濟學理論、企業管理個案、科技演進史長篇分析。',
      '現行 GMAT Focus 規則：徹底移除舊制 Sentence Correction 與作文，作答完畢至多可修改 3 題答案。',
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
      'Reading Section (約30分鐘)：學術段落精讀、句子插入題、事實資訊定位、文章總結歸納題。',
      'Listening Section (約29分鐘)：校園日常對話、學術講座 (Lecture) 筆記整合、教授語氣態度辨別。',
      'Writing Section (約23分鐘)：句子重組建構、商務電子郵件寫作、學術在線課堂討論 (Academic Discussion)。',
      'Speaking Section (約8分鐘)：聽後即時複誦與改述 (Listen & Repeat)、訪談式情境問答。'
    ],
    vocab: [
      { word: 'collaborate', ipa: '/kəˈlæbəreɪt/', pos: 'v.', def: '合作；協同工作', example: 'Students from diverse faculties collaborated on the interdisciplinary clean energy initiative.' },
      { word: 'fluency', ipa: '/ˈfluːənsi/', pos: 'n.', def: '流暢度；熟練度', example: 'The speaking module assesses communicative fluency and phonemic intelligibility.' },
      { word: 'paraphrase', ipa: '/ˈpærəfreɪz/', pos: 'v./n.', def: '意譯；改述', example: 'In the integrated task, you should paraphrase the professor\'s arguments without quoting verbatim.' }
    ],
    source: 'https://www.ets.org/toefl/test-takers/ibt/about/content.html'
  }
};
