"""tier1_primary.py - Tier 1: 國小基礎生活英語 (Pre-A1~A1) 250 Questions Generator.
IDs: diag-0001 to diag-0250.
"""

def make_q(q_id, subtopic, dim, hook, prompt, corr, d1, d2, d3, trans, concept, analysis, trap, w1, p1, m1, w2, p2, m2):
    ans_idx = (q_id - 1) % 4
    d_list = [d1, d2, d3]
    options = []
    d_ptr = 0
    for i in range(4):
        if i == ans_idx:
            options.append(corr)
        else:
            options.append(d_list[d_ptr])
            d_ptr += 1

    opt_letters = ["A", "B", "C", "D"]
    ans_letter = opt_letters[ans_idx]

    formatted_trans = f"【題幹精譯】{trans}\n【選項列表】" + "  ".join([
        f"{opt_letters[i]}. {options[i]}" for i in range(4)
    ])
    full_trap = f"【選項剖析】正確答案為 ({ans_letter})「{corr}」。{trap}"

    return {
        "id": f"diag-{q_id:04d}",
        "tier": 1,
        "tierLabel": "Level 1: 國小基礎生活英語 (Primary Pre-A1~A1)",
        "targetExam": "國小英語",
        "cefr": "A1",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 1,
        "passage": None,
        "prompt": prompt,
        "options": options,
        "answer": ans_idx,
        "translation": formatted_trans,
        "coreConcept": concept,
        "sentenceAnalysis": analysis,
        "vocabulary": [
            {"word": w1, "phonetic": p1, "meaning": m1},
            {"word": w2, "phonetic": p2, "meaning": m2}
        ],
        "trapExplanation": full_trap,
        "courseHook": hook
    }

def build_tier1():
    items = []
    
    # 25 Subtopics, each with 10 questions = 250 items
    subtopics_data = [
        # 1. Be動詞現在式單數 (am / is)
        (
            "Be動詞現在式單數 (am / is)", "文法句構",
            {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: 人稱代名詞與 Be 動詞全面統整"},
            [
                ("Hello, my name ___ Kevin, and I am twelve years old.", "is", "am", "are", "be", "哈囉，我的名字是 Kevin，我十二歲。", "主詞 My name 為第三人稱單數，現在式 be 動詞使用 is。", "主詞 [My name] + 動詞 [is] + 主詞補語 [Kevin]。", "My name 視為第三人稱單數 it，不可用 am 或 are。", "name", "/neɪm/", "名字", "twelve", "/twelv/", "十二"),
                ("The little girl ___ very happy because she got a cute puppy.", "is", "are", "am", "be", "那個小女孩非常開心，因為她得到了一隻可愛的小狗。", "主詞 The little girl 為單數，現在式 be 動詞使用 is。", "主詞 [The little girl] + 動詞 [is] + 形容詞補語 [very happy]。", "小女孩為單數主詞，故動詞選 is。", "puppy", "/ˈpʌp.i/", "小狗", "happy", "/ˈhæp.i/", "開心的"),
                ("I ___ a hardworking student in Class 602.", "am", "is", "are", "be", "我是 602 班的一位勤奮學生。", "第一人稱代名詞 I 在現在式中搭配 be 動詞 am。", "主詞 [I] + 動詞 [am] + 名詞補語 [a hardworking student]。", "I 只能搭配 am，不可用 is 或 are。", "student", "/ˈstuː.dənt/", "學生", "hardworking", "/ˌhɑːrdˈwɝː.kɪŋ/", "勤奮的"),
                ("Look! The red apple on the wooden table ___ ripe and sweet.", "is", "are", "am", "be", "看！木桌上的紅蘋果又熟又甜。", "主詞核心詞為單數名詞 The red apple，介系詞片語 on the table 為修飾語，動詞用 is。", "主詞 [The red apple] + 修飾語 [on the table] + 動詞 [is] + 補語 [ripe and sweet]。", "受詞 table 不影響主詞為 apple，單數主詞搭配 is。", "ripe", "/raɪp/", "成熟的", "apple", "/ˈæp.əl/", "蘋果"),
                ("My English teacher, Miss Lin, ___ always patient with every student.", "is", "are", "am", "be", "我的英文老師林老師對每位學生總是非常有耐心。", "主詞 Miss Lin 為第三人稱單數，現在式動詞用 is。", "主詞 [Miss Lin] + 頻率副詞 [always] + 動詞 [is] + 補語 [patient]。", "Miss Lin 是單數人名，故動詞選 is。", "patient", "/ˈpeɪ.ʃənt/", "有耐心的", "teacher", "/ˈtiː.tʃɚ/", "老師"),
                ("This blue backpack ___ too heavy for the little boy to carry.", "is", "are", "am", "be", "這個藍色背包太重了，小男孩背不動。", "主詞 This blue backpack 為單數物品，be 動詞使用 is。", "主詞 [This blue backpack] + 動詞 [is] + 補語 [too heavy]。", "單數名詞 backpack 必須選 is。", "backpack", "/ˈbæk.pæk/", "背包", "heavy", "/ˈhev.i/", "沉重的"),
                ("I ___ so excited about our upcoming school field trip tomorrow!", "am", "is", "are", "be", "我對於我們明天即將到來的校外教學感到好興奮！", "第一人稱主詞 I 搭配 am 表示情緒感受。", "主詞 [I] + 動詞 [am] + 形容詞補語 [excited]。", "主詞為 I，選 am 最正確。", "excited", "/ɪkˈsaɪ.t̬ɪd/", "興奮的", "trip", "/trɪp/", "旅行"),
                ("That shiny new bicycle ___ a special present from my uncle.", "is", "are", "am", "be", "那輛閃亮的新腳踏車是我叔叔送的一份特別禮物。", "單數指示代名詞片語 That new bicycle 搭配 is。", "主詞 [That shiny new bicycle] + 動詞 [is] + 補語 [a special present]。", "bicycle 是單數名詞，使用 is。", "bicycle", "/ˈbaɪ.sə.kəl/", "腳踏車", "present", "/ˈprez.ənt/", "禮物"),
                ("The weather ___ warm and pleasant in Taipei this afternoon.", "is", "are", "am", "be", "今天下午台北的天氣溫暖宜人。", "weather 為不可數名詞，文法上視為單數，動詞搭配 is。", "主詞 [The weather] + 動詞 [is] + 補語 [warm and pleasant]。", "天氣 weather 為不可數名詞，動詞選 is。", "weather", "/ˈweð.ɚ/", "天氣", "pleasant", "/ˈplez.ənt/", "宜人的"),
                ("My younger brother ___ only five years old; he loves painting.", "is", "are", "am", "be", "我的弟弟只有五歲；他很喜歡畫畫。", "單數主詞 My younger brother 搭配 is。", "主詞 [My younger brother] + 動詞 [is] + 補語 [five years old]。", "brother 為單數，選 is。", "brother", "/ˈbrʌð.ɚ/", "兄弟", "young", "/jʌŋ/", "年輕的")
            ]
        ),
        # 2. Be動詞現在式複數 (are)
        (
            "Be動詞現在式複數 (are)", "文法句構",
            {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: 人稱代名詞與 Be 動詞全面統整"},
            [
                ("Tom and Jerry ___ good friends who play basketball together every Friday.", "are", "is", "am", "be", "Tom 和 Jerry 是好朋友，他們每週五一起打籃球。", "由 and 連接兩個人名構成複數主詞，現在式 be 動詞使用 are。", "複數主詞 [Tom and Jerry] + 動詞 [are] + 補語 [good friends]。", "並列主詞為複數概念，不可選單數 is。", "friend", "/frend/", "朋友", "together", "/təˈɡeð.ɚ/", "一起"),
                ("The children ___ building a tall sandcastle on the sunny beach.", "are", "is", "am", "be", "孩子們正在陽光明媚的沙灘上建造一座高高的沙堡。", "children 為 child 的不規則複數形，be 動詞必須使用 are。", "主詞 [The children] + 助動詞 [are] + 分詞 [building]。", "children 為複數名詞，動詞選 are。", "children", "/ˈtʃɪl.drən/", "孩子們", "sandcastle", "/ˈsændˌkæs.əl/", "沙堡"),
                ("You and I ___ selected as the class leaders this semester.", "are", "is", "am", "be", "你和我這學期被選為班長。", "You and I 形成複數第一人稱主詞（相當於 we），be 動詞使用 are。", "複數主詞 [You and I] + 助動詞 [are] + 分詞 [selected]。", "看到 I 容易誤選 am，但主詞是 You and I 兩個人，必須選 are。", "leader", "/ˈliː.dɚ/", "領導者", "semester", "/səˈmes.tɚ/", "學期"),
                ("These fresh strawberries in the white bowl ___ very sweet and juicy.", "are", "is", "am", "be", "白色碗裡的這些新鮮草莓非常甜美多汁。", "主詞核心詞為複數名詞 strawberries，修飾片語 in the bowl 不影響數，動詞用 are。", "主詞 [These fresh strawberries] + 動詞 [are] + 補語 [sweet]。", "strawberries 是複數，故選 are。", "strawberry", "/ˈstrɑːˌber.i/", "草莓", "juicy", "/ˈdʒuː.si/", "多汁的"),
                ("The students in our class ___ practicing hard for the sports day.", "are", "is", "am", "be", "我們班的學生們正在為了運動會努力練習。", "主詞核心詞為 The students (複數)，動詞使用 are。", "主詞 [The students] + 助動詞 [are] + 分詞 [practicing]。", "核心名詞 students 為複數，選 are。", "student", "/ˈstuː.dənt/", "學生", "sports", "/spɔːrts/", "運動"),
                ("Where ___ my glasses? I cannot find them anywhere in the room.", "are", "is", "am", "be", "我的眼鏡在哪裡？我在房間裡到處都找不到它們。", "glasses（眼鏡）由兩個鏡片組成，文法上恆為複數名詞，動詞用 are。", "疑問詞 [Where] + 動詞 [are] + 主詞 [my glasses]。", "glasses 視為複數名詞，後方指代亦用 them，故選 are。", "glasses", "/ˈɡlæs.ɪz/", "眼鏡", "anywhere", "/ˈen.i.wer/", "任何地方"),
                ("Both of my parents ___ teachers who work at the local high school.", "are", "is", "am", "be", "我的雙親都是在當地高中任教的老師。", "Both of + 複數名詞，主詞為兩者，動詞使用複數 are。", "主詞 [Both of my parents] + 動詞 [are] + 補語 [teachers]。", "Both 表兩者，必接複數動詞 are。", "parent", "/ˈper.ənt/", "父母親", "local", "/ˈloʊ.kəl/", "當地的"),
                ("Those colorful flowers in the garden ___ blooming beautifully.", "are", "is", "am", "be", "花園裡那些色彩繽紛的花朵正美麗地盛開著。", "主詞 Those colorful flowers 為複數，動詞用 are。", "主詞 [Those colorful flowers] + 助動詞 [are] + 分詞 [blooming]。", "flowers 是複數名詞，故選 are。", "flower", "/ˈflaʊ.ɚ/", "花朵", "bloom", "/bluːm/", "盛開"),
                ("The puppies sleeping under the big tree ___ very adorable.", "are", "is", "am", "be", "大樹下睡覺的那些小狗非常討人喜歡。", "主詞 The puppies 為複數，動詞用 are。", "主詞 [The puppies] + 動詞 [are] + 補語 [very adorable]。", "puppies 是複數，故選 are。", "puppy", "/ˈpʌp.i/", "小狗", "adorable", "/əˈdɔːr.ə.bəl/", "可愛的"),
                ("My cousins from Canada ___ visiting our family in Taiwan this week.", "are", "is", "am", "be", "我來自加拿大的堂表兄弟姊妹這週正在台灣拜訪我們家。", "主詞 My cousins 為複數名詞，修飾片語不影響數，動詞選 are。", "主詞 [My cousins] + 助動詞 [are] + 分詞 [visiting]。", "主詞 cousins 為複數，選 are。", "cousin", "/ˈkʌz.ən/", "堂表兄弟", "visit", "/ˈvɪz.ɪt/", "拜訪")
            ]
        ),
        # 3. 人稱代名詞主格與受格
        (
            "人稱代名詞主格與受格", "文法句構",
            {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: 人稱代名詞與 Be 動詞全面統整"},
            [
                ("Please give that blue storybook to ___; I need to read it now.", "me", "I", "my", "mine", "請把那本藍色故事書給我；我現在需要讀它。", "介系詞 to 後方必須接人稱代名詞的「受格」。", "祈使句動詞 [give] + 受詞 [that storybook] + 介系詞片語 [to me]。", "介系詞後面必須放受格 me，不可選主格 I。", "give", "/ɡɪv/", "給予", "storybook", "/ˈstɔːr.i.bʊk/", "故事書"),
                ("Mrs. White asked ___ to clean the blackboard after class.", "him", "he", "his", "himself", "懷特老師要求他下課後把黑板擦乾淨。", "及物動詞 asked 後接人稱代名詞受格 him 作為受詞。", "主詞 [Mrs. White] + 及物動詞 [asked] + 受詞 [him] + 不定詞補語 [to clean]。", "動詞後方當受詞需用受格 him，不可用主格 he。", "blackboard", "/ˈblæk.bɔːrd/", "黑板", "clean", "/kliːn/", "擦乾淨"),
                ("___ love to play badminton in the gym every Saturday morning.", "They", "Them", "Their", "Theirs", "他們每週六早上都喜歡在體育館打羽毛球。", "空格位於句首擔任主要子句之「主詞」，必須使用主格 They。", "主詞 [They] + 動詞 [love] + 受詞 [to play badminton]。", "句首當主詞必須用主格 They。", "badminton", "/ˈbæd.mɪn.tən/", "羽毛球", "gym", "/dʒɪm/", "體育館"),
                ("Dad took ___ to the National Museum of Natural Science last weekend.", "us", "we", "our", "ours", "爸爸上週末帶我們去了國立自然科學博物館。", "動詞 took（帶領）後方需放人稱受格 us。", "主詞 [Dad] + 動詞 [took] + 受詞 [us] + 地方片語 [to the Museum]。", "及物動詞之後當受詞選 us。", "museum", "/mjuːˈziː.əm/", "博物館", "weekend", "/ˈwiːk.end/", "週末"),
                ("Can you help ___ carry these heavy math textbooks upstairs?", "her", "she", "hers", "herself", "你能幫她把這些沉重的數學課本搬上樓嗎？", "及物動詞 help 後方接人稱代名詞受格 her 作為受詞。", "助動詞 [Can] + 主詞 [you] + 動詞 [help] + 受詞 [her] + 原形補語 [carry]。", "動詞 help 後面接人稱受格 her。", "textbook", "/ˈtekst.bʊk/", "課本", "upstairs", "/ʌpˈsterz/", "上樓"),
                ("___ is my best friend; we often study English together.", "She", "Her", "Hers", "Herself", "她是我的好朋友；我們經常一起讀英文。", "空格在主要子句擔任主詞，指代單數女性，使用主格 She。", "主詞 [She] + 動詞 [is] + 補語 [my best friend]。", "句首當主詞選主格 She。", "friend", "/frend/", "朋友", "study", "/ˈstʌd.i/", "學習"),
                ("Our teacher told ___ an exciting story about dinosaurs today.", "us", "we", "our", "ours", "我們的老師今天給我們講了一個關於恐龍的精彩故事。", "授與動詞 told 後接間接受詞（人），必須使用受格 us。", "主詞 [Our teacher] + 授與動詞 [told] + 間接受詞 [us] + 直接受詞 [an exciting story]。", "授與動詞後的間接賓語必須用受格 us。", "dinosaur", "/ˈdaɪ.nə.sɔːr/", "恐龍", "exciting", "/ɪkˈsaɪ.t̬ɪŋ/", "精彩的"),
                ("Let ___ show you how to solve this interesting puzzle.", "me", "I", "my", "mine", "讓我向你展示如何解開這個有趣的謎題吧。", "使役動詞 Let 後方必須接人稱受格（Let me / Let us）。", "使役動詞 [Let] + 受詞 [me] + 動詞補語 [show] + 受詞 [you]。", "Let 後接受格 me，形成固定口語 Let me...。", "puzzle", "/ˈpʌz.əl/", "謎題", "solve", "/sɑːlv/", "解開"),
                ("The doctor asked ___ to drink more warm water every day.", "them", "they", "their", "theirs", "醫生要求他們每天多喝溫開水。", "及物動詞 asked 後方接代名詞受格 them。", "主詞 [The doctor] + 動詞 [asked] + 受詞 [them] + 不定詞補語 [to drink]。", "動詞受詞需用受格 them。", "doctor", "/ˈdɑːk.tɚ/", "醫生", "warm", "/wɔːrm/", "溫暖的"),
                ("___ went to the zoo with our science teacher yesterday morning.", "We", "Us", "Our", "Ours", "我們昨天早上和自然老師一起去了動物園。", "空格位於句首擔任主詞，動詞為 went，必須選主格 We。", "主詞 [We] + 動詞 [went] + 地方片語 [to the zoo]。", "句首擔任主詞用主格 We。", "science", "/ˈsaɪ.əns/", "自然科學", "yesterday", "/ˈjes.tɚ.deɪ/", "昨天")
            ]
        ),
        # 4. 所有格形容詞與代名詞
        (
            "所有格形容詞與代名詞", "文法句構",
            {"module": "sixth", "unitId": "sixth-u3", "unitTitle": "國小六年級 Unit 3: 所有格代名詞與生活物品歸屬"},
            [
                ("Whose red umbrella is this? It's not ___; my umbrella is yellow.", "mine", "my", "me", "myself", "這把紅雨傘是誰的？這不是我的；我的雨傘是黃色的。", "句末獨立指代「我的雨傘 (my umbrella)」，必須使用所有格代名詞 mine。", "主詞 [It] + 動詞 [is not] + 補語 [mine]。", "my 後面一定要有名詞，單獨在句尾必須用 mine。", "umbrella", "/ʌmˈbrel.ə/", "雨傘", "yellow", "/ˈjel.oʊ/", "黃色的"),
                ("This is ___ new bicycle; I ride it to school every morning.", "my", "mine", "me", "I", "這是我的新腳踏車；我每天早上騎它上學。", "名詞 new bicycle 前方需要所有格形容詞 my 進行修飾。", "主詞 [This] + 動詞 [is] + 補語 [my new bicycle]。", "修飾後方名詞 bicycle 必須使用所有格 my。", "bicycle", "/ˈbaɪ.sə.kəl/", "腳踏車", "ride", "/raɪd/", "騎乘"),
                ("That blue water bottle is not David's; it is ___.", "hers", "her", "she", "herself", "那個藍色水壺不是 David 的；那是她的。", "hers 代表 her water bottle，獨立充當主詞補語。", "主詞 [it] + 動詞 [is] + 補語 [hers]。", "後方無名詞，獨立代表她的水瓶用 hers。", "bottle", "/ˈbɑː.t̬əl/", "水壺", "water", "/ˈwɑː.t̬ɚ/", "水"),
                ("Children, please take out ___ English workbooks now.", "your", "yours", "you", "yourself", "孩子們，現在請拿出你們的英文作業本。", "修飾名詞 English workbooks 需用第二人稱複數所有格 your。", "祈使動詞 [take out] + 受詞片語 [your English workbooks]。", "後面有名詞 workbooks，故選所有格形容詞 your。", "workbook", "/ˈwɝːk.bʊk/", "作業本", "take out", "/teɪk aʊt/", "拿出"),
                ("Is this pencil case yours or Peter's? It's ___; Peter's is green.", "his", "him", "he", "himself", "這個鉛筆盒是你的還是 Peter 的？這是他的；Peter 的是綠色的。", "his 同時可作所有格代名詞，在此指代 his pencil case。", "主詞 [It] + 動詞 [is] + 補語 [his]。", "指代男性的所有物，所有格代名詞為 his。", "pencil", "/ˈpen.səl/", "鉛筆", "case", "/keɪs/", "盒"),
                ("The cat is licking ___ paws after drinking a bowl of milk.", "its", "it's", "it", "itself", "那隻貓喝完一碗牛奶後正在舔牠的爪子。", "修飾動物的名詞 paws（爪子）需用所有格 its（無撇號）。", "主詞 [The cat] + 進行式動詞 [is licking] + 受詞 [its paws]。", "注意 its (所有格) 與 it's (it is 縮寫) 之區別，選 its。", "paw", "/pɑː/", "爪子", "lick", "/lɪk/", "舔舐"),
                ("Our classroom is on the second floor, and ___ is on the third floor.", "theirs", "their", "them", "they", "我們的教室在二樓，而他們的（教室）在三樓。", "theirs 獨立擔任對等子句之主詞，指代 their classroom。", "連接詞 [and] + 主詞 [theirs] + 動詞 [is] + 片語 [on the third floor]。", "當子句主詞且後無名詞，需用所有格代名詞 theirs。", "classroom", "/ˈklæs.rʊm/", "教室", "floor", "/flɔːr/", "樓層"),
                ("Emily lost ___ keys on the playground during recess yesterday.", "her", "hers", "she", "herself", "Emily 昨天在下課時間把她的鑰匙弄丟在操場上了。", "修飾名詞 keys 必須使用所有格形容詞 her。", "主詞 [Emily] + 動詞 [lost] + 受詞 [her keys]。", "修飾名詞 keys 選所有格 her。", "playground", "/ˈpleɪ.ɡraʊnd/", "操場", "key", "/kiː/", "鑰匙"),
                ("These drawing markers are ___; you can borrow them if you need.", "ours", "our", "us", "we", "這些彩色筆是我們的；如果你需要的話可以借去用。", "ours 獨立充當主詞補語，指代 our drawing markers。", "主詞 [These drawing markers] + 動詞 [are] + 補語 [ours]。", "句尾無名詞，代表我們擁有的物品用 ours。", "marker", "/ˈmɑːr.kɚ/", "彩色筆", "borrow", "/ˈbɑːr.oʊ/", "借用"),
                ("Grandpa loves to tell stories about ___ childhood in the countryside.", "his", "him", "he", "himself", "爺爺喜歡講述他童年在鄉下的故事。", "修飾名詞 childhood（童年）需用所有格形容詞 his。", "介系詞 [about] + 受詞片語 [his childhood]。", "修飾名詞 childhood 需用所有格 his。", "childhood", "/ˈtʃaɪld.hʊd/", "童年", "countryside", "/ˈkʌn.tri.saɪd/", "鄉村")
            ]
        ),
        # 5. 現在進行式結構 (be + V-ing)
        (
            "現在進行式結構 (be + V-ing)", "文法句構",
            {"module": "sixth", "unitId": "sixth-u2", "unitTitle": "國小六年級 Unit 2: 現在進行式動作描述"},
            [
                ("Listen! The choir ___ a beautiful song in the music hall right now.", "is singing", "sings", "sang", "sing", "聽！合唱團此刻正在音樂廳唱著一首美妙的歌曲。", "感嘆詞 Listen! 與時間副詞 right now 明確指示當下正在進行之動作，使用 be + V-ing。", "感嘆詞 [Listen!] + 主詞 [The choir] + 動詞 [is singing] + 受詞 [a song]。", "Listen! 提示當下進行式，選 is singing。", "choir", "/kwaɪ.ɚ/", "合唱團", "sing", "/sɪŋ/", "唱歌"),
                ("Look out the window! It ___ heavily, so don't forget your raincoat.", "is raining", "rains", "rained", "rain", "看窗外！正在下大雨，所以別忘了帶你的雨衣。", "Look out the window 提示眼前的動作正在發生，使用現在進行式 is raining。", "主詞 [It] + 進行式動詞 [is raining] + 副詞 [heavily]。", "眼前的天氣變化用現在進行式 is raining。", "heavily", "/ˈhev.əl.i/", "大量地", "raincoat", "/ˈreɪn.koʊt/", "雨衣"),
                ("The twin brothers ___ a puzzle together on the living room floor right now.", "are doing", "do", "did", "does", "雙胞胎兄弟此刻正一起在客廳地板上拼拼圖。", "複數主詞 The twin brothers 搭配 are + doing 表示當下正在進行。", "主詞 [The twin brothers] + 進行式動詞 [are doing] + 受詞 [a puzzle]。", "複數主詞與 right now 提示選 are doing。", "puzzle", "/ˈpʌz.əl/", "拼圖", "twin", "/twɪn/", "雙胞胎"),
                ("Be quiet! The baby ___ peacefully in the small crib.", "is sleeping", "sleeps", "slept", "sleep", "安靜！小嬰兒正在小嬰兒床裡平靜地睡覺呢。", "祈使句 Be quiet! 指示當前環境需要肅靜，因為動作正在進行中，用 is sleeping。", "感嘆祈使 [Be quiet!] + 主詞 [The baby] + 動詞 [is sleeping]。", "Be quiet 提示當前動作進行中，選 is sleeping。", "crib", "/krɪb/", "嬰兒床", "peacefully", "/ˈpiːs.fəl.i/", "安詳地"),
                ("Mom is in the kitchen; she ___ delicious noodles for lunch.", "is cooking", "cooks", "cooked", "cook", "媽媽在廚房；她正在煮美味的麵條當午餐。", "前句指出 Mom is in the kitchen，表示當下此刻正在進行烹飪動作，使用 is cooking。", "主詞 [she] + 進行式動詞 [is cooking] + 受詞 [noodles]。", "當前所在位置廚房提示動作正在進行，選 is cooking。", "noodles", "/ˈnuː.dəlz/", "麵條", "delicious", "/dɪˈlɪʃ.əs/", "美味好吃的"),
                ("The soccer players ___ hard on the field to prepare for tomorrow's match.", "are practicing", "practices", "practiced", "practice", "足球選手們正在球場上努力練習，為明天的比賽做準備。", "複數主詞 The soccer players 搭配 are + V-ing。", "主詞 [The soccer players] + 進行式動詞 [are practicing] + 副詞 [hard]。", "複數選手正在進行動作，選 are practicing。", "match", "/mætʃ/", "比賽", "prepare", "/prɪˈper/", "準備"),
                ("What are you doing in the garden? I ___ the colorful roses.", "am watering", "water", "watered", "waters", "你在花園裡做什麼？我正在給色彩繽紛的玫瑰花澆水。", "問句為 What are you doing（進行式），答句必須以 I am V-ing 呼應進行式時態。", "主詞 [I] + 進行式動詞 [am watering] + 受詞 [the roses]。", "進行式問句需以進行式回答，故選 am watering。", "water", "/ˈwɑː.t̬ɚ/", "澆水", "rose", "/roʊz/", "玫瑰花"),
                ("Look! The monkeys ___ up the tall trees very quickly.", "are climbing", "climbs", "climbed", "climb", "看！猴子們正非常迅速地爬上高大的樹木。", "感嘆詞 Look! 提示眼前動作正在發生，複數主詞 The monkeys 搭配 are climbing。", "感嘆詞 [Look!] + 主詞 [The monkeys] + 動詞 [are climbing]。", "Look! 提示進行式，主詞為複數 monkeys，選 are climbing。", "monkey", "/ˈmʌŋ.ki/", "猴子", "climb", "/klaɪm/", "攀爬"),
                ("Dad ___ the newspaper in the living room; don't disturb him.", "is reading", "reads", "read", "reading", "爸爸正在客廳讀報紙；不要打擾他。", "後句 don't disturb him 提示爸爸當下正在專注讀報，使用現在進行式 is reading。", "主詞 [Dad] + 進行式動詞 [is reading] + 受詞 [the newspaper]。", "現在進行式必須包含 be動詞 + V-ing，故選 is reading。", "newspaper", "/ˈnuːzˌpeɪ.pɚ/", "報紙", "disturb", "/dɪˈstɝːb/", "打擾"),
                ("The children ___ happily around the Christmas tree in the hall.", "are dancing", "dances", "danced", "dance", "孩子們正在大廳的聖誕樹周圍開心地跳舞。", "複數主詞 The children 搭配 are + dancing 表示正在進行的情景。", "主詞 [The children] + 進行式動詞 [are dancing] + 副詞 [happily]。", "主詞為複數名詞 children，選 are dancing。", "dance", "/dæns/", "跳舞", "happily", "/ˈhæp.əl.i/", "開心地")
            ]
        )
    ]
    
    # Define additional 20 subtopics to complete the 25 subtopics
    extra_subtopics = [
        # 6. 情態助動詞 can
        ("情態助動詞 can 能力與請求", "文法句構", {"module": "sixth", "unitId": "sixth-u8", "unitTitle": "國小六年級 Unit 8: 情態助動詞 can/will 綜合應用"}, [
            ("Leo can ___ English and Japanese very fluently.", "speak", "speaks", "spoke", "speaking", "Leo 能非常流利地說英語和日語。", "情態助動詞 can 後方主要動詞必須回歸「動詞原形」。", "主詞 [Leo] + 助動詞 [can] + 原形動詞 [speak] + 受詞 [English and Japanese]。", "can 後面動詞一律用原形 speak。", "speak", "/spiːk/", "說語言", "fluently", "/ˈfluː.ənt.li/", "流利地"),
            ("Can you ___ me with this difficult math question, please?", "help", "helps", "helped", "helping", "你可以請幫忙我解答這道困難的數學題嗎？", "助動詞 Can 形成的疑問句中，主要動詞使用原形 help。", "助動詞 [Can] + 主詞 [you] + 原形動詞 [help] + 受詞 [me]。", "Can 後動詞用原形 help。", "help", "/help/", "幫忙", "difficult", "/ˈdɪf.ə.kəlt/", "困難的"),
            ("My little sister is only four, but she can already ___ bicycles.", "ride", "rides", "rode", "riding", "我的小妹妹只有四歲，但她已經會騎腳踏車了。", "情態助動詞 can 後接動詞原形 ride。", "主詞 [she] + 助動詞 [can] + 原形動詞 [ride] + 受詞 [bicycles]。", "can 之後動詞不可加 s，必選原形 ride。", "ride", "/raɪd/", "騎乘", "already", "/ɑːlˈred.i/", "已經"),
            ("Penguins are birds, but they cannot ___ in the sky.", "fly", "flies", "flew", "flying", "企鵝是鳥類，但牠們不會在天空中飛行。", "否定助動詞 cannot 後接原形動詞 fly。", "主詞 [they] + 否定助動詞 [cannot] + 原形動詞 [fly]。", "cannot 後接原形 fly。", "fly", "/flaɪ/", "飛行", "penguin", "/ˈpeŋ.ɡwɪn/", "企鵝"),
            ("Excuse me, ___ I borrow your red marker pen for a minute?", "can", "am", "do", "are", "不好意思，我可以借用你的紅色麥克筆一分鐘嗎？", "表示禮貌提出請求或徵求許可時，使用情態助動詞 Can I...?", "助動詞 [can] + 主詞 [I] + 原形動詞 [borrow] + 受詞 [your marker]。", "徵求許可選 can。", "borrow", "/ˈbɑːr.oʊ/", "借用", "minute", "/ˈmɪn.ɪt/", "分鐘"),
            ("Sam has a sweet voice; he can ___ very well on the stage.", "sing", "sings", "sang", "singing", "Sam 擁有甜美的嗓音；他能在舞台上唱得非常好。", "助動詞 can 後接原形動詞 sing。", "主詞 [he] + 助動詞 [can] + 原形動詞 [sing] + 副詞 [very well]。", "can 後面動詞用原形 sing。", "sing", "/sɪŋ/", "唱歌", "voice", "/vɔɪs/", "嗓音"),
            ("We cannot ___ swimming in the deep river; it is dangerous.", "go", "goes", "went", "going", "我們不能去深水河流游泳；那很危險。", "cannot 後接原形動詞 go，構成 go swimming 慣用語。", "主詞 [We] + 否定助動詞 [cannot] + 原形動詞 [go] + 動名詞 [swimming]。", "cannot 後接原形 go。", "dangerous", "/ˈdeɪn.dʒɚ.əs/", "危險的", "deep", "/diːp/", "深的"),
            ("My grandfather can ___ four different languages, including French.", "speak", "speaks", "spoke", "speaking", "我的祖父能說四種不同的語言，包括法語。", "助動詞 can 後接動詞原形 speak。", "主詞 [My grandfather] + 助動詞 [can] + 原形動詞 [speak] + 受詞 [languages]。", "can 之後使用原形 speak。", "language", "/ˈlæŋ.ɡwɪdʒ/", "語言", "different", "/ˈdɪf.ɚ.ənt/", "不同的"),
            ("Fish can ___ underwater with their gills.", "breathe", "breathes", "breathed", "breathing", "魚類可以用牠們的鰓在水下呼吸。", "助動詞 can 後接原形動詞 breathe。", "主詞 [Fish] + 助動詞 [can] + 原形動詞 [breathe] + 副詞 [underwater]。", "can 後接動詞原形 breathe。", "breathe", "/briːð/", "呼吸", "underwater", "/ˌʌn.dɚˈwɑː.t̬ɚ/", "在水下"),
            ("Can you play the piano, or ___ you prefer the violin?", "do", "are", "is", "can", "你會彈鋼琴嗎，還是你比較喜歡小提琴？", "後半句主要動詞為一般動詞 prefer（偏好），問句使用助動詞 do。", "對等連接詞 [or] + 助動詞 [do] + 主詞 [you] + 原形動詞 [prefer]。", "一般動詞 prefer 疑問句搭配助動詞 do。", "prefer", "/prɪˈfɝː/", "更喜愛", "piano", "/piˈæn.oʊ/", "鋼琴")
        ]),
        # 7. 祈使句與生活規範
        ("祈使句與生活規範 (Please / Don't)", "文法句構", {"module": "sixth", "unitId": "sixth-u4", "unitTitle": "國小六年級 Unit 4: 祈使句生活規範與校園守則"}, [
            ("___ run in the hallway; the floor is very slippery!", "Don't", "No", "Not", "Doesn't", "不要在走廊奔跑；地板非常濕滑！", "否定祈使句以 Don't + 原形動詞 開頭，表示禁止命令。", "否定助動詞 [Don't] + 原形動詞 [run] + 地方片語 [in the hallway]。", "否定祈使句開頭必須用 Don't，不可單用 Not 或 No。", "hallway", "/ˈhɑːl.weɪ/", "走廊", "slippery", "/ˈslɪp.ɚ.i/", "濕滑的"),
            ("Please ___ your hands before eating dinner, kids.", "wash", "washes", "washed", "washing", "孩子們，吃晚餐前請先洗手。", "肯定祈使句以 Please + 動詞原形 開頭表示禮貌要求。", "禮貌詞 [Please] + 原形動詞 [wash] + 受詞 [your hands]。", "祈使句動詞一律用原形 wash。", "wash", "/wɑːʃ/", "洗滌", "dinner", "/ˈdɪn.ɚ/", "晚餐"),
            ("___ quiet in the library; other students are studying hard.", "Be", "Is", "Are", "Being", "在圖書館保持安靜；其他學生正在努力讀書。", "祈使句中若接形容詞 quiet，動詞必須使用 be 動詞原形 Be。", "原形動詞 [Be] + 形容詞補語 [quiet] + 地方片語 [in the library]。", "祈使句使用原形動詞 Be quiet!。", "quiet", "/ˈkwaɪ.ət/", "安靜的", "library", "/ˈlaɪ.brer.i/", "圖書館"),
            ("Don't ___ the animals in the zoo; they have special diets.", "feed", "feeds", "fed", "feeding", "不要餵食動物園裡的動物；牠們有特殊的飲食配方。", "Don't 後方必須接動詞原形 feed。", "否定祈使詞 [Don't] + 原形動詞 [feed] + 受詞 [the animals]。", "Don't 後接原形動詞 feed。", "feed", "/fiːd/", "餵食", "diet", "/ˈdaɪ.ət/", "飲食"),
            ("Please ___ the door when you leave the classroom.", "close", "closes", "closed", "closing", "當你離開教室時請把門關上。", "Please 後接動詞原形 close。", "禮貌詞 [Please] + 原形動詞 [close] + 受詞 [the door]。", "祈使句使用原形動詞 close。", "close", "/kloʊz/", "關閉", "leave", "/liːv/", "離開"),
            ("___ touch the hot stove; you will burn your fingers!", "Don't", "Not", "No", "Aren't", "不要碰熱火爐；你會燙傷手指的！", "否定祈使句警示語以 Don't 開頭。", "否定助動詞 [Don't] + 原形動詞 [touch] + 受詞 [the hot stove]。", "警告不要做某事用 Don't touch。", "stove", "/stoʊv/", "火爐", "finger", "/ˈfɪŋ.ɡɚ/", "手指"),
            ("Always ___ to your teacher carefully during class.", "listen", "listens", "listened", "listening", "上課時務必隨時認真聽老師講課。", "Always 用於祈使句句首表示叮嚀，後方動詞仍需使用原形 listen。", "頻率副詞 [Always] + 原形動詞 [listen] + 片語 [to your teacher]。", "祈使句動詞一律維持原形 listen。", "listen", "/ˈlɪs.ən/", "聆聽", "carefully", "/ˈker.fəl.i/", "認真地"),
            ("___ your seatbelt fastened before the car starts moving.", "Keep", "Keeps", "Kept", "Keeping", "在汽車開始行駛前，請保持繫好安全帶。", "祈使句句首以原形動詞 Keep 開頭。", "原形動詞 [Keep] + 受詞 [your seatbelt] + 補語 [fastened]。", "祈使句首使用動詞原形 Keep。", "seatbelt", "/ˈsiːtˌbelt/", "安全帶", "fasten", "/ˈfæs.ən/", "繫緊"),
            ("Don't ___ late for the school bus again tomorrow, Tony.", "be", "is", "are", "been", "Tony，明天搭校車不要再遲到了。", "Don't 後接形容詞 late，必須使用原形 be 動詞 be。", "否定助動詞 [Don't] + 原形動詞 [be] + 補語 [late]。", "Don't 後面接原形動詞 be，形成 Don't be late!。", "late", "/leɪt/", "遲到的", "again", "/əˈɡen/", "再次"),
            ("Please ___ your shoes outside the traditional tea house.", "take off", "takes off", "took off", "taking off", "在進入這間傳統茶藝館前請脫下鞋子。", "Please 後接片語動詞原形 take off。", "禮貌詞 [Please] + 原形片語動詞 [take off] + 受詞 [your shoes]。", "祈使句片語動詞維持原形 take off。", "shoes", "/ʃuːz/", "鞋子", "outside", "/ˌaʊtˈsaɪd/", "在外面")
        ]),
        # 8. 一般現在式第三人稱單數動詞變化
        ("一般現在式第三人稱單數動詞變化", "文法句構", {"module": "sixth", "unitId": "sixth-u2", "unitTitle": "國小六年級 Unit 2: 現在簡單式與習慣規律動作"}, [
            ("My father usually ___ a cup of black coffee before work.", "drinks", "drink", "drank", "drinking", "我父親上班前通常會喝一杯黑咖啡。", "主詞 My father 為第三人稱單數，頻率副詞 usually 搭配一般現在式動詞加 -s。", "主詞 [My father] + 頻率副詞 [usually] + 動詞 [drinks] + 受詞 [coffee]。", "第三人稱單數主詞 father 搭配動詞加 s (drinks)。", "coffee", "/ˈkɑː.fi/", "咖啡", "usually", "/ˈjuː.ʒu.ə.li/", "通常"),
            ("The sun ___ in the east and sets in the west every day.", "rises", "rise", "rose", "rising", "太陽每天從東方升起，在西方落下。", "自然客觀真理使用現在簡單式，主詞 The sun 為單數，動詞需加 -s (rises)。", "主詞 [The sun] + 動詞 [rises] + 地方片語 [in the east]。", "客觀真理且主詞為單數，動詞用 rises。", "rise", "/raɪz/", "升起", "east", "/iːst/", "東方"),
            ("Emily ___ her teeth twice a day to keep them healthy.", "brushes", "brush", "brushed", "brushing", "Emily 每天刷牙兩次以保持牙齒健康。", "動詞以 -sh 結尾，遇到第三人稱單數主詞 Emily 時需加 -es (brushes)。", "主詞 [Emily] + 動詞 [brushes] + 受詞 [her teeth]。", "sh 結尾動詞遇單數主詞加 es，選 brushes。", "brush", "/brʌʃ/", "刷洗", "healthy", "/ˈhel.θi/", "健康的"),
            ("David loves nature; he ___ to the city park every weekend.", "goes", "go", "went", "going", "David 熱愛大自然；他每個週末都去市立公園。", "動詞 go 以字母 o 結尾，第三人稱單數主詞 he 搭配時需加 -es (goes)。", "主詞 [he] + 動詞 [goes] + 地方片語 [to the city park]。", "he 為第三人稱單數，go 需變為 goes。", "park", "/pɑːrk/", "公園", "nature", "/ˈneɪ.tʃɚ/", "大自然"),
            ("Our teacher always ___ us interesting stories about ancient history.", "teaches", "teach", "taught", "teaching", "我們的老師總是教給我們關於古代歷史的有趣故事。", "動詞 teach 以 -ch 結尾，第三人稱單數主詞搭配時需加 -es (teaches)。", "主詞 [Our teacher] + 頻率副詞 [always] + 動詞 [teaches] + 受詞 [us]。", "ch 結尾動詞加 es，選 teaches。", "teach", "/tiːtʃ/", "教導", "ancient", "/ˈeɪn.ʃənt/", "古代的"),
            ("The baby ___ loudly whenever he is hungry.", "cries", "cry", "cried", "crying", "這小嬰兒每當肚子餓的時候就大聲哭泣。", "子音 + y 結尾的動詞 cry，遇到第三人稱單數主詞需去掉 y 加 -ies (cries)。", "主詞 [The baby] + 動詞 [cries] + 副詞 [loudly]。", "子音+y結尾動詞變三單去y加ies，選 cries。", "cry", "/kraɪ/", "哭泣", "loudly", "/ˈlaʊd.li/", "大聲地"),
            ("Uncle Mark ___ hard in a software company in the science park.", "works", "work", "worked", "working", "Mark 叔叔在科學園區的一家軟體公司努力工作。", "主詞 Uncle Mark 為第三人稱單數，規律常態動作使用現在簡單式 works。", "主詞 [Uncle Mark] + 動詞 [works] + 副詞 [hard]。", "第三人稱單數主詞搭配 works。", "company", "/ˈkʌm.pə.ni/", "公司", "software", "/ˈsɑːft.wer/", "軟體"),
            ("The school bus ___ at our street corner at 7:15 every morning.", "stops", "stop", "stopped", "stopping", "校車每天早上 7:15 在我們的街角停靠。", "主詞 The school bus 為單數名詞，規律時刻表使用現在簡單式加 -s (stops)。", "主詞 [The school bus] + 動詞 [stops] + 片語 [at our street corner]。", "單數主詞 bus 搭配 stops。", "corner", "/ˈkɔːr.nɚ/", "角落", "street", "/striːt/", "街道"),
            ("My sister ___ the violin for an hour after school every day.", "practices", "practice", "practiced", "practicing", "我妹妹每天放學後練習拉小提琴一個小時。", "主詞 My sister 為單數，習慣性動作動詞加 -s (practices)。", "主詞 [My sister] + 動詞 [practices] + 受詞 [the violin]。", "第三人稱單數搭配 practices。", "practice", "/ˈpræk.tɪs/", "練習", "hour", "/aʊr/", "小時"),
            ("The chef ___ special chocolate cakes for our birthday parties.", "bakes", "bake", "baked", "baking", "這位主廚為我們的生日派對烘焙特別的巧克力蛋糕。", "單數主詞 The chef 搭配動詞加 -s (bakes)。", "主詞 [The chef] + 動詞 [bakes] + 受詞 [chocolate cakes]。", "單數主詞搭配 bakes。", "chef", "/ʃef/", "廚師", "bake", "/beɪk/", "烘烤")
        ]),
        # 9. 一般現在式助動詞問答
        ("一般現在式助動詞問答 (Do / Does)", "文法句構", {"module": "sixth", "unitId": "sixth-u2", "unitTitle": "國小六年級 Unit 2: 助動詞 Do/Does 疑問句精熟"}, [
            ("___ your sister like to eat vanilla ice cream after dinner?", "Does", "Do", "Is", "Are", "你妹妹晚餐後喜歡吃香草冰淇淋嗎？", "主詞 your sister 為第三人稱單數，疑問句需使用助動詞 Does，動詞為原形 like。", "助動詞 [Does] + 主詞 [your sister] + 動詞 [like] + 受詞 [ice cream]。", "主詞是單數 sister，且句中有一般動詞 like，助動詞必選 Does。", "vanilla", "/vəˈnɪl.ə/", "香草", "cream", "/kriːm/", "奶油"),
            ("___ you walk to school every morning, or do you take the bus?", "Do", "Does", "Are", "Is", "你每天早上走路去學校嗎，還是你搭公車？", "主詞為 you，一般現在式疑問句使用助動詞 Do 開頭。", "助動詞 [Do] + 主詞 [you] + 原形動詞 [walk] + 地方片語 [to school]。", "主詞是 you，選助動詞 Do。", "walk", "/wɑːk/", "走路", "every", "/ˈev.ri/", "每一個"),
            ("What time ___ your father usually get up on weekdays?", "does", "do", "is", "are", "你父親在平日通常幾點起床？", "主詞 your father 為第三人稱單數，特殊疑問句需搭配助動詞 does。", "疑問詞 [What time] + 助動詞 [does] + 主詞 [your father] + 原形動詞 [get up]。", "主詞 father 為單數，選 does。", "weekday", "/ˈwiːk.deɪ/", "平日", "usually", "/ˈjuː.ʒu.ə.li/", "通常"),
            ("Do your classmates enjoy playing soccer? Yes, they ___.", "do", "does", "are", "did", "你的同班同學們喜歡踢足球嗎？是的，他們喜歡。", "簡答句需呼應問句的助動詞 Do 與代名詞 they，回答 Yes, they do。", "肯定簡答 [Yes] + 主詞 [they] + 助動詞 [do]。", "以 Do 問，they 答，選 do。", "classmate", "/ˈklæs.meɪt/", "同學", "enjoy", "/ɪnˈdʒɔɪ/", "喜愛"),
            ("Where ___ Mr. and Mrs. Smith live now?", "do", "does", "are", "is", "史密斯夫婦現在住在哪裡？", "主詞 Mr. and Mrs. Smith 為兩人（複數主詞），主要動詞為原形 live，助動詞使用 do。", "疑問詞 [Where] + 助動詞 [do] + 複數主詞 [Mr. and Mrs. Smith] + 動詞 [live]。", "兩個人是複數主詞，助動詞選 do。", "live", "/lɪv/", "居住", "where", "/wer/", "在哪裡"),
            ("My little cat ___ not like to take a bath in the tub.", "does", "do", "is", "are", "我的小貓不喜歡在浴缸裡洗澡。", "主詞 My little cat 為單數動物，否定句使用 does not (doesn't) + 原形動詞 like。", "主詞 [My little cat] + 助動詞否定 [does not] + 動詞 [like]。", "單數主詞否定句選 does not。", "bath", "/bæθ/", "洗澡", "tub", "/tʌb/", "浴缸"),
            ("They ___ not have any homework to do this Friday evening.", "do", "does", "are", "is", "他們這個週五晚上沒有任何作業要做。", "主詞 They 為第三人稱複數，否定句使用 do not (don't) + 原形動詞 have。", "主詞 [They] + 助動詞否定 [do not] + 動詞 [have] + 受詞 [homework]。", "複數主詞 they 否定句搭配 do not。", "homework", "/ˈhoʊm.wɝːk/", "家庭作業", "evening", "/ˈiːv.nɪŋ/", "傍晚"),
            ("Does Kevin have a pet dog at home? No, he ___.", "doesn't", "don't", "isn't", "aren't", "Kevin 家裡有養寵物狗嗎？不，他沒有。", "問句以 Does Kevin 開頭，否定簡答為 No, he doesn't。", "否定簡答 [No] + 主詞 [he] + 助動詞否定 [doesn't]。", "Does 問句用 doesn't 回答。", "pet", "/pet/", "寵物", "home", "/hoʊm/", "家"),
            ("Why ___ you look so tired today? Did you sleep well last night?", "do", "does", "are", "is", "你今天為什麼看起來這麼累？你昨晚有睡好嗎？", "主詞為 you，主要動詞為連綴動詞 look（原形），助動詞搭配 do。", "疑問詞 [Why] + 助動詞 [do] + 主詞 [you] + 動詞 [look] + 補語 [tired]。", "主詞是 you，一般動詞 look 前需放助動詞 do。", "tired", "/taɪərd/", "疲憊的", "why", "/waɪ/", "為什麼"),
            ("How often ___ your brother clean his bedroom?", "does", "do", "is", "are", "你哥哥多常打掃他的臥室一次？", "主詞 your brother 為單數，頻率疑問詞 How often 後接助動詞 does。", "疑問詞片語 [How often] + 助動詞 [does] + 主詞 [your brother] + 動詞 [clean]。", "單數主詞 brother 搭配助動詞 does。", "often", "/ˈɑːf.ən/", "經常", "bedroom", "/ˈbed.rʊm/", "臥室")
        ]),
        # 10. 時間介系詞搭配
        ("時間介系詞搭配 (at, on, in)", "單字語意", {"module": "sixth", "unitId": "sixth-u5", "unitTitle": "國小六年級 Unit 5: 時間介系詞與日常時段表達"}, [
            ("The morning bell rings ___ 7:50 a.m. every school day.", "at", "on", "in", "to", "每個上學日早上鈴聲都在上午 7:50 響起。", "表示具體的「鐘點時間（幾點幾分）」，介系詞一律使用 at。", "主詞 [The bell] + 動詞 [rings] + 時間片語 [at 7:50 a.m.]。", "幾點幾分特定鐘點搭配 at。", "bell", "/bel/", "鐘聲", "ring", "/rɪŋ/", "響起"),
            ("We have an exciting basketball game ___ Saturday afternoon.", "on", "in", "at", "for", "我們在星期六下午有一場精彩的籃球比賽。", "在具體的「星期幾的上午/下午/晚上」，介系詞使用 on。", "主詞 [We] + 動詞 [have] + 受詞 [a game] + 片語 [on Saturday afternoon]。", "特定某一天的下午前面搭配 on。", "Saturday", "/ˈsæt̬.ɚ.deɪ/", "星期六", "afternoon", "/ˌæf.tɚˈnuːn/", "下午"),
            ("My birthday is ___ July, which is the hottest summer month.", "in", "on", "at", "to", "我的生日在七月，那是一年中最熱的夏季月份。", "表示「月份（如 July, December）」或「季節/年份」前，介系詞使用 in。", "主詞 [My birthday] + 動詞 [is] + 時間片語 [in July]。", "單獨只有月份時搭配 in。", "July", "/dʒuːˈlaɪ/", "七月", "birthday", "/ˈbɝːθ.deɪ/", "生日"),
            ("Dad always reads the morning newspaper ___ breakfast.", "at", "on", "in", "to", "爸爸總是在吃早餐時讀早報。", "表示三餐的時間時刻（at breakfast / at lunch），介系詞使用 at。", "主詞 [Dad] + 頻率副詞 [always] + 動詞 [reads] + 片語 [at breakfast]。", "三餐用餐時刻慣用 at breakfast。", "breakfast", "/ˈbrek.fəst/", "早餐", "newspaper", "/ˈnuːzˌpeɪ.pɚ/", "報紙"),
            ("Children in Taiwan celebrate Children's Day ___ April 4th.", "on", "in", "at", "by", "台灣的孩童在四月四日慶祝兒童節。", "表示含有具體「月日（如 April 4th）」的特定日期時，介系詞使用 on。", "主詞 [Children] + 動詞 [celebrate] + 片語 [on April 4th]。", "具體月日日期必須搭配 on。", "celebrate", "/ˈsel.ə.breɪt/", "慶祝", "April", "/ˈeɪ.prəl/", "四月"),
            ("Flowers bloom and birds sing happily ___ spring.", "in", "on", "at", "of", "在春天，花兒盛開，鳥兒歡快地歌唱。", "在四大「季節（spring, summer, autumn, winter）」前，介系詞使用 in。", "主詞 [Flowers] + 動詞 [bloom] + 時間片語 [in spring]。", "季節名稱前面搭配 in。", "spring", "/sprɪŋ/", "春天", "bloom", "/bluːm/", "盛開"),
            ("Most students go to bed ___ night after finishing their homework.", "at", "in", "on", "to", "多數學生在寫完作業後會在夜間就寢。", "夜間固定習慣搭配介系詞 at night。", "主詞 [Most students] + 動詞片語 [go to bed] + 片語 [at night]。", "夜晚固定片語為 at night。", "night", "/naɪt/", "夜晚", "finish", "/ˈfɪn.ɪʃ/", "完成"),
            ("The English party will start ___ Friday night.", "on", "at", "in", "to", "英文派對將在週五晚上開始。", "具體某天的晚上（Friday night），介系詞必須改用 on！", "主詞 [The party] + 動詞 [will start] + 片語 [on Friday night]。", "具體某天的晚上（如 Friday night）必須用 on。", "party", "/ˈpɑːr.t̬i/", "派對", "Friday", "/ˈfraɪ.deɪ/", "星期五"),
            ("The new school year starts ___ September in Taiwan.", "in", "on", "at", "with", "在台灣，新學年於九月開始。", "月份名稱前面使用介系詞 in。", "主詞 [The new school year] + 動詞 [starts] + 片語 [in September]。", "單獨月份搭配 in。", "September", "/sepˈtem.bɚ/", "九月", "start", "/stɑːrt/", "開始"),
            ("The library closes ___ noon for a short lunch break.", "at", "in", "on", "to", "圖書館在正午中午十二點關閉，進行簡短的午休。", "正午 noon 與午夜 midnight 視為精確時間點，固定搭配 at noon。", "主詞 [The library] + 動詞 [closes] + 時間片語 [at noon]。", "正午 noon 搭配 at。", "noon", "/nuːn/", "中午", "break", "/breɪk/", "休息")
        ]),
        # 11. 空間方位介系詞
        ("空間方位介系詞 (in, on, under, behind, between)", "單字語意", {"module": "sixth", "unitId": "sixth-u4", "unitTitle": "國小六年級 Unit 4: 空間介系詞與校園日常位置"}, [
            ("The cat is sleeping comfortably ___ the sofa, between two soft pillows.", "on", "at", "into", "to", "貓咪舒服地睡在沙發上，在兩個柔軟的枕頭之間。", "平面表面上方接觸使用 on。", "主詞 [The cat] + 動詞 [is sleeping] + 地方片語 [on the sofa]。", "on the sofa 表平面接觸。", "sofa", "/ˈsoʊ.fə/", "沙發", "pillow", "/ˈpɪl.oʊ/", "枕頭"),
            ("Please put the green trash can ___ the desk so it won't block the door.", "under", "on", "in", "over", "請把綠色垃圾桶放在書桌底下，這樣就不會擋住門。", "桌子底下空間使用 under。", "祈使動詞 [put] + 受詞 [the trash can] + 片語 [under the desk]。", "桌下空間選 under。", "desk", "/desk/", "書桌", "trash", "/træʃ/", "垃圾"),
            ("The tall tree stands right ___ the two small wooden houses.", "between", "among", "in", "at", "那棵大樹正好聳立在兩棟小木屋之間。", "兩者之間使用 between A and B。", "主詞 [The tall tree] + 動詞 [stands] + 片語 [between the two houses]。", "兩者之間選 between。", "between", "/bɪˈtwiːn/", "在…之間", "wooden", "/ˈwʊd.ən/", "木製的"),
            ("There are many colorful fish swimming happily ___ the clean lake.", "in", "on", "at", "to", "有許多色彩斑斕的魚兒在乾淨的湖水裡歡快地游著。", "水中、湖中立體空間使用 in。", "引導詞 [There are] + 主詞 [fish] + 分詞 [swimming] + 片語 [in the clean lake]。", "水體內部游動選 in。", "lake", "/leɪk/", "湖泊", "clean", "/kliːn/", "乾淨的"),
            ("The clever boy hid ___ the large wardrobe during the hide-and-seek game.", "behind", "between", "on", "under", "聰明的男孩在捉迷藏遊戲中躲在大型衣櫃後面。", "物體後方隱蔽處使用 behind。", "主詞 [The boy] + 動詞 [hid] + 地方片語 [behind the wardrobe]。", "衣櫃後方選 behind。", "behind", "/bɪˈhaɪnd/", "在…後面", "wardrobe", "/ˈwɔːr.droʊb/", "衣櫃"),
            ("There is a large world map hanging ___ the classroom wall.", "on", "in", "at", "under", "教室的牆壁上掛著一張大大的世界地圖。", "牆壁表面附著使用 on the wall。", "引導詞 [There is] + 主詞 [a map] + 分詞 [hanging] + 片語 [on the wall]。", "牆面懸掛選 on。", "wall", "/wɑːl/", "牆壁", "map", "/mæp/", "地圖"),
            ("Grandpa left his reading glasses ___ the dining table.", "on", "in", "into", "at", "爺爺把他的老花眼鏡遺留在餐桌上了。", "桌面上使用 on the table。", "主詞 [Grandpa] + 動詞 [left] + 受詞 [his glasses] + 片語 [on the table]。", "桌面表面選 on。", "dining", "/ˈdaɪ.nɪŋ/", "進餐", "table", "/ˈteɪ.bəl/", "桌子"),
            ("The mouse ran ___ the hole when it saw the hungry cat.", "into", "onto", "at", "on", "老鼠看到飢餓的貓時便跑進了洞穴裡。", "動態進入內部使用 into。", "主詞 [The mouse] + 動詞 [ran] + 動態片語 [into the hole]。", "跑進洞內動態選 into。", "hole", "/hoʊl/", "洞穴", "mouse", "/maʊs/", "老鼠"),
            ("The school bus stop is right ___ front of our community gate.", "in", "on", "at", "by", "校車站牌就在我們社區大門正前方。", "固定空間片語 in front of（在…前方）。", "主詞 [The stop] + 動詞 [is] + 片語 [in front of our gate]。", "固定片語 in front of 選 in。", "front", "/frʌnt/", "前方", "community", "/kəˈmjuː.nə.t̬i/", "社區"),
            ("The puppy is hiding ___ the warm blanket on Mom's bed.", "under", "between", "over", "above", "小狗正躲在媽媽床上溫暖的毛毯底下。", "被物體覆蓋下方使用 under。", "主詞 [The puppy] + 動詞 [is hiding] + 片語 [under the blanket]。", "毛毯底下選 under。", "blanket", "/ˈblæŋ.kɪt/", "毛毯", "hide", "/haɪd/", "躲藏")
        ]),
        # 12. 可數名詞不規則複數
        ("可數名詞不規則複數 (children, feet, teeth, mice)", "文法句構", {"module": "sixth", "unitId": "sixth-u6", "unitTitle": "國小六年級 Unit 6: 名詞單複數不規則變化特訓"}, [
            ("Three little ___ are running joyfully on the grass.", "children", "childs", "child", "childrens", "三個小孩子正歡樂地在草地上奔跑。", "child 的複數為不規則形 children，不可加 s。", "主詞 [Three little children] + 助動詞 [are] + 分詞 [running]。", "child 複數為 children。", "children", "/ˈtʃɪl.drən/", "孩子們", "grass", "/ɡræs/", "草地"),
            ("The dentist advised Leo to clean his ___ after every meal.", "teeth", "tooth", "tooths", "teethes", "牙醫建議 Leo 每餐飯後都要清潔他的牙齒。", "tooth 的複數為不規則變化 teeth。", "主詞 [The dentist] + 動詞 [advised] + 受詞 [Leo] + 補語 [to clean his teeth]。", "tooth 複數為 teeth。", "teeth", "/tiːθ/", "牙齒", "dentist", "/ˈden.tɪst/", "牙醫"),
            ("After walking for five hours, my ___ hurt very badly.", "feet", "foots", "foot", "feets", "走了五個小時的路之後，我的雙腳痛得非常厲害。", "foot 的複數為不規則變化 feet。", "主詞 [my feet] + 動詞 [hurt] + 副詞 [badly]。", "foot 複數為 feet。", "feet", "/fiːt/", "雙腳", "hurt", "/hɝːt/", "疼痛"),
            ("The old house had many ___ living in the attic.", "mice", "mouses", "mouse", "mices", "那座老房子閣樓裡住著許多老鼠。", "mouse 的複數為不規則變化 mice。", "主詞 [The house] + 動詞 [had] + 受詞 [many mice]。", "mouse 複數為 mice。", "mice", "/maɪs/", "老鼠(複數)", "attic", "/ˈæt̬.ɪk/", "閣樓"),
            ("Several ___ were waiting patiently in line at the bus station.", "women", "womans", "woman", "womens", "幾位女士在公車站耐心地排隊等待。", "woman 的複數為不規則變化 women。", "主詞 [Several women] + 助動詞 [were] + 分詞 [waiting]。", "woman 複數為 women。", "women", "/ˈwɪm.ɪn/", "女士們", "station", "/ˈsteɪ.ʃən/", "車站"),
            ("Two tall ___ helped us carry the heavy piano into the hall.", "men", "mans", "man", "mens", "兩位身材高大的男士幫助我們把重型鋼琴搬進大廳。", "man 的複數為不規則變化 men。", "主詞 [Two tall men] + 動詞 [helped] + 受詞 [us]。", "man 複數為 men。", "men", "/men/", "男人們", "carry", "/ˈker.i/", "搬運"),
            ("A flock of ___ flew south across the lake this morning.", "geese", "gooses", "goose", "geeses", "今天早上有一群天鵝/大雁飛越湖面向南飛行。", "goose 的複數為不規則變化 geese。", "主詞 [A flock of geese] + 動詞 [flew] + 地方片語 [across the lake]。", "goose 複數為 geese。", "geese", "/ɡiːs/", "大雁鵝群", "flock", "/flɑːk/", "群"),
            ("There are many ___ swimming in the clear mountain stream.", "fish", "fishes", "fishs", "fishing", "清澈的山間溪流裡有許多魚在游動。", "fish 作為同一種魚的數量複數時，單複數同形。", "引導詞 [There are] + 主詞 [many fish] + 分詞 [swimming]。", "fish 單複數同形。", "fish", "/fɪʃ/", "魚類", "stream", "/striːm/", "小溪"),
            ("The farmer raises fifty ___ on his green hillside farm.", "sheep", "sheeps", "sheepes", "shoop", "農夫在他綠色的山坡農場上飼養了五十隻羊。", "sheep 為單複數同形名詞，不可加 s。", "主詞 [The farmer] + 動詞 [raises] + 受詞 [fifty sheep]。", "sheep 單複數同形。", "sheep", "/ʃiːp/", "綿羊", "raise", "/reɪz/", "飼養"),
            ("The park pond is home to dozens of yellow ___.", "ducklings", "duckling", "ducksling", "ducklinges", "公園的池塘是數十隻黃色小鴨的家。", "duckling 複數直接加 -s 變 ducklings。", "主詞 [The pond] + 動詞 [is] + 補語 [home to dozens of yellow ducklings]。", "duckling 加 s 變複數。", "duckling", "/ˈdʌk.lɪŋ/", "小鴨", "pond", "/pɑːnd/", "池塘")
        ]),
        # 13. 不可數名詞與生活計量
        ("不可數名詞與生活計量", "文法句構", {"module": "sixth", "unitId": "sixth-u6", "unitTitle": "國小六年級 Unit 6: 可數與不可數名詞數量量詞"}, [
            ("Dad bought two ___ of fresh milk from the supermarket.", "bottles", "milks", "bottle", "carton milk", "爸爸從超市買了兩瓶新鮮牛奶。", "不可數名詞 milk 需透過量詞計量，two 後接複數量詞 bottles of...", "主詞 [Dad] + 動詞 [bought] + 受詞 [two bottles of milk]。", "two bottles of milk。", "bottle", "/ˈbɑː.t̬əl/", "瓶", "milk", "/mɪlk/", "牛奶"),
            ("May I have a ___ of hot water, please? I feel chilly.", "glass", "slice", "bowl", "loaf", "請給我一杯熱水好嗎？我覺得有點冷。", "水通常以 a glass of water 或 a cup of water 計量。", "助動詞 [May] + 主詞 [I] + 動詞 [have] + 受詞 [a glass of hot water]。", "一杯水用 a glass of water。", "glass", "/ɡlæs/", "玻璃杯", "chilly", "/ˈtʃɪl.i/", "寒冷的"),
            ("Mom cut three ___ of delicious chocolate cake for us.", "slices", "slice", "cakes", "pie", "媽媽為我們切了三片美味的巧克力蛋糕。", "蛋糕塊/片使用 slice，三片用 three slices of...", "主詞 [Mom] + 動詞 [cut] + 受詞 [three slices of cake]。", "三片蛋糕用 three slices of cake。", "slice", "/slaɪs/", "薄片", "chocolate", "/ˈtʃɑːk.lət/", "巧克力"),
            ("Would you like a ___ of chicken soup to warm up?", "bowl", "slice", "loaf", "bottle", "你想要來一碗雞湯暖暖身子嗎？", "湯類通常盛裝於碗中，量詞使用 a bowl of soup。", "助動詞 [Would] + 主詞 [you] + 動詞 [like] + 受詞 [a bowl of soup]。", "一碗湯用 a bowl of soup。", "bowl", "/boʊl/", "碗", "soup", "/suːp/", "湯"),
            ("We need to buy a ___ of bread for breakfast tomorrow morning.", "loaf", "slice", "piece", "bar", "我們需要買一條麵包當作明天早上的早餐。", "整條麵包計量單位為 a loaf of bread。", "主詞 [We] + 動詞 [need] + 不定詞 [to buy a loaf of bread]。", "整條麵包用 a loaf of bread。", "loaf", "/loʊf/", "條(麵包)", "bread", "/bred/", "麵包"),
            ("Uncle Tom drank two ___ of black tea during the meeting.", "cups", "cup", "teas", "bottle", "Tom 叔叔在會議期間喝了兩杯紅茶。", "熱茶計量用 cups of tea。", "主詞 [Uncle Tom] + 動詞 [drank] + 受詞 [two cups of tea]。", "兩杯茶用 two cups of tea。", "cup", "/kʌp/", "茶杯", "tea", "/tiː/", "茶"),
            ("Can you hand me two ___ of paper to write notes on?", "sheets", "sheet", "papers", "rolls", "你能遞給我兩張紙來記筆記嗎？", "紙張不可數，計量使用 sheet of paper。", "助動詞 [Can] + 主詞 [you] + 動詞 [hand] + 受詞 [me] + 直接受詞 [two sheets of paper]。", "兩張紙用 two sheets of paper。", "sheet", "/ʃiːt/", "張", "paper", "/ˈpeɪ.pɚ/", "紙張"),
            ("The recipe requires a ___ of salt to enhance the flavor.", "pinch", "slice", "loaf", "bottle", "這道食譜需要一小撮鹽來提升風味。", "鹽巴微量調味用 a pinch of salt。", "主詞 [The recipe] + 動詞 [requires] + 受詞 [a pinch of salt]。", "一小撮鹽用 a pinch of salt。", "pinch", "/pɪntʃ/", "一撮", "salt", "/sɑːlt/", "鹽"),
            ("Grandma put a ___ of sweet honey into her herbal tea.", "spoonful", "slice", "loaf", "sheet", "奶奶在她花草茶裡加了一滿匙甜蜂蜜。", "蜂蜜以湯匙計量用 a spoonful of honey。", "主詞 [Grandma] + 動詞 [put] + 受詞 [a spoonful of honey]。", "一匙蜂蜜用 a spoonful of honey。", "spoonful", "/ˈspuːn.fʊl/", "一匙", "honey", "/ˈhʌn.i/", "蜂蜜"),
            ("We ordered two ___ of delicious fried rice for dinner.", "plates", "plate", "rices", "bowl", "我們晚餐點了兩盤美味的炒飯。", "炒飯盛於盤中，兩盤用 two plates of fried rice。", "主詞 [We] + 動詞 [ordered] + 受詞 [two plates of fried rice]。", "兩盤炒飯用 two plates of...。", "plate", "/pleɪt/", "盤子", "rice", "/raɪs/", "米飯")
        ]),
        # 14. There is / There are 存在句型
        ("There is / There are 存在句型", "文法句構", {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: There be 存在句型與空間描述"}, [
            ("There ___ a large brown bear sleeping in the mountain cave.", "is", "are", "am", "be", "有一隻大棕熊正在山洞裡睡覺。", "There is + 單數名詞 (a bear)。", "引導詞 [There] + 動詞 [is] + 主詞 [a bear] + 分詞 [sleeping]。", "單數主詞 a bear 搭配 There is。", "bear", "/ber/", "熊", "cave", "/keɪv/", "洞穴"),
            ("There ___ twenty-five students listening to the teacher in the classroom.", "are", "is", "am", "be", "教室裡有二十五名學生正在聽老師講課。", "There are + 複數名詞 (twenty-five students)。", "引導詞 [There] + 動詞 [are] + 主詞 [twenty-five students]。", "複數名詞 students 搭配 There are。", "twenty", "/ˈtwen.t̬i/", "二十", "listen", "/ˈlɪs.ən/", "聆聽"),
            ("There ___ some milk in the glass; you can drink it.", "is", "are", "am", "were", "玻璃杯裡有一些牛奶；你可以喝掉它。", "milk 為不可數名詞，搭配單數 be 動詞 is。", "引導詞 [There] + 動詞 [is] + 主詞 [some milk]。", "不可數名詞搭配 There is。", "some", "/sʌm/", "一些", "drink", "/drɪŋk/", "喝"),
            ("There ___ many tall trees along the riverbank in our town.", "are", "is", "am", "be", "我們鎮上的河岸旁有許多高大的樹木。", "trees 為複數名詞，使用 There are。", "引導詞 [There] + 動詞 [are] + 主詞 [many tall trees]。", "複數 trees 搭配 There are。", "riverbank", "/ˈrɪv.ɚ.bæŋk/", "河岸", "town", "/taʊn/", "城鎮"),
            ("There ___ no clouds in the bright blue sky today.", "are", "is", "am", "be", "今天晴朗的藍天中一片雲朵都沒有。", "clouds 為複數名詞，否定使用 There are no clouds。", "引導詞 [There] + 動詞 [are] + 主詞 [no clouds]。", "複數 clouds 搭配 are。", "cloud", "/klaʊd/", "雲朵", "sky", "/skaɪ/", "天空"),
            ("There ___ an eraser and two pencils in my pencil box.", "is", "are", "am", "be", "我的鉛筆盒裡有一塊橡皮擦和兩支鉛筆。", "There be 句型遵循「就近原則」，緊鄰名詞 an eraser 為單數，動詞用 is！", "引導詞 [There] + 動詞 [is] + 主詞 [an eraser and two pencils]。", "就近原則：緊鄰 an eraser 單數選 is。", "eraser", "/ɪˈreɪ.sɚ/", "橡皮擦", "box", "/bɑːks/", "盒子"),
            ("There ___ two pencils and an eraser on the wooden desk.", "are", "is", "am", "be", "木書桌上有兩支鉛筆和一塊橡皮擦。", "就近原則：緊鄰名詞 two pencils 為複數，動詞用 are！", "引導詞 [There] + 動詞 [are] + 主詞 [two pencils and an eraser]。", "就近原則：緊鄰 two pencils 複數選 are。", "wooden", "/ˈwʊd.ən/", "木製的", "desk", "/desk/", "書桌"),
            ("___ there any fresh juice left in the refrigerator?", "Is", "Are", "Do", "Does", "冰箱裡還有剩下任何新鮮果汁嗎？", "juice 為不可數名詞，疑問句使用 Is there...?", "動詞 [Is] + 引導詞 [there] + 主詞 [any fresh juice]。", "不可數名詞疑問句用 Is there...?。", "juice", "/dʒuːs/", "果汁", "refrigerator", "/rɪˈfrɪdʒ.ə.reɪ.t̬ɚ/", "冰箱"),
            ("___ there any apples on that big apple tree?", "Are", "Is", "Do", "Does", "那棵大蘋果樹上有任何蘋果嗎？", "apples 為複數名詞，疑問句使用 Are there...?", "動詞 [Are] + 引導詞 [there] + 主詞 [any apples]。", "複數名詞疑問句用 Are there...?。", "apple", "/ˈæp.əl/", "蘋果", "tree", "/triː/", "樹木"),
            ("There ___ a wonderful concert in the park yesterday evening.", "was", "were", "is", "are", "昨天傍晚在公園有一場精彩的音樂會。", "yesterday evening 表示過去時間，單數 concert 搭配 was。", "引導詞 [There] + 動詞 [was] + 主詞 [a concert] + 時間片語 [yesterday evening]。", "過去式單數使用 There was。", "concert", "/ˈkɑːn.sɚt/", "音樂會", "wonderful", "/ˈwʌn.dɚ.fəl/", "美好的")
        ]),
        # 15. 疑問詞 What / Where / When / Who 基礎問答
        ("疑問詞 What / Where / When / Who 基礎問答", "文法句構", {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: 疑問詞引導句型與生活問答"}, [
            ("___ is your favorite color? I love sky blue.", "What", "Where", "Who", "When", "你最喜歡的顏色是什麼？我喜歡天藍色。", "詢問事物、顏色使用疑問代名詞 What。", "疑問詞 [What] + 動詞 [is] + 主詞 [your favorite color]。", "詢問顏色使用 What is your favorite...?。", "color", "/ˈkʌl.ɚ/", "顏色", "favorite", "/ˈfeɪ.vər.ɪt/", "最喜愛的"),
            ("___ is the post office? It's next to the library.", "Where", "What", "When", "Who", "郵局在哪裡？它在圖書館隔壁。", "答句為地點方位（next to...），問句必用 Where。", "疑問詞 [Where] + 動詞 [is] + 主詞 [the post office]。", "詢問地點使用 Where。", "post office", "/ˈpoʊst ˌɑː.fɪs/", "郵局", "next to", "/nekst tuː/", "在隔壁"),
            ("___ is that tall man wearing glasses? He is our new teacher.", "Who", "Where", "What", "When", "那位戴眼鏡的高個子男士是誰？他是我們的新老師。", "詢問人物身分姓名使用 Who。", "疑問詞 [Who] + 動詞 [is] + 主詞 [that tall man]。", "詢問人物身分使用 Who。", "tall", "/tɑːl/", "高大的", "glasses", "/ˈɡlæs.ɪz/", "眼鏡"),
            ("___ does the school sports day start? It starts at 8:30 a.m.", "When", "Where", "Who", "What", "學校運動會什麼時候開始？早上 8:30 開始。", "答句為時間點，問句使用 When。", "疑問詞 [When] + 助動詞 [does] + 主詞 [sports day] + 動詞 [start]。", "詢問時間使用 When。", "start", "/stɑːrt/", "開始", "sports", "/spɔːrts/", "運動"),
            ("___ is making that strange noise in the kitchen? It's just the cat.", "Who", "What", "Where", "When", "是誰在廚房裡製造那奇怪的聲音？只是貓咪啦。", "詢問動作的發出者是誰，使用 Who。", "疑問詞主詞 [Who] + 動詞 [is making] + 受詞 [that noise]。", "詢問動作主體選 Who。", "strange", "/streɪndʒ/", "奇怪的", "noise", "/nɔɪz/", "噪音"),
            ("___ do you usually do on Sunday afternoons? I often read books.", "What", "Where", "When", "Who", "你週日下午通常都做什麼？我經常看書。", "詢問從事何種活動使用 What do you do...?", "疑問詞 [What] + 助動詞 [do] + 主詞 [you] + 原形動詞 [do]。", "詢問活動用 What do you do?。", "Sunday", "/ˈsʌn.deɪ/", "星期日", "read", "/riːd/", "閱讀"),
            ("___ did you put my English textbook? On the teacher's desk.", "Where", "When", "What", "Who", "你把我的英文課本放在哪裡了？在老師的桌上。", "答句為地點，問句選 Where。", "疑問詞 [Where] + 助動詞 [did] + 主詞 [you] + 動詞 [put]。", "詢問放置地點選 Where。", "put", "/pʊt/", "放置", "desk", "/desk/", "書桌"),
            ("___ season do you like best, spring or winter? I like winter.", "Which", "What", "Where", "Who", "你最喜歡哪一個季節，春天還是冬天？我喜歡冬天。", "在有限選項中挑選（spring or winter）使用 Which。", "疑問詞 [Which] + 名詞 [season] + 助動詞 [do] + 主詞 [you] + 動詞 [like best]。", "有範圍選擇用 Which。", "season", "/ˈsiː.zən/", "季節", "best", "/best/", "最"),
            ("___ is your birthday? It's on October 10th.", "When", "Where", "Who", "What", "你的生日是什麼時候？在十月十日。", "詢問生日時間使用 When is your birthday?。", "疑問詞 [When] + 動詞 [is] + 主詞 [your birthday]。", "詢問生日時間選 When。", "birthday", "/ˈbɝːθ.deɪ/", "生日", "October", "/ɑːkˈtoʊ.bɚ/", "十月"),
            ("___ will cook dinner for us tonight? Grandma will.", "Who", "What", "Where", "When", "今晚誰要幫我們煮晚餐？奶奶會煮。", "詢問人選使用 Who will...?", "疑問主詞 [Who] + 助動詞 [will] + 動詞 [cook] + 受詞 [dinner]。", "詢問何人負責用 Who。", "tonight", "/təˈnaɪt/", "今晚", "cook", "/kʊk/", "烹飪")
        ]),
        # 16. 疑問詞 How many / How much 數量提問
        ("疑問詞 How many / How much 數量提問", "文法句構", {"module": "sixth", "unitId": "sixth-u6", "unitTitle": "國小六年級 Unit 6: How many / How much 數量疑問句"}, [
            ("___ apples are there in the red basket? There are six.", "How many", "How much", "How old", "How long", "紅色籃子裡有幾顆蘋果？有六顆。", "apples 為可數名詞複數，詢問數量使用 How many。", "疑問片語 [How many] + 名詞 [apples] + 動詞 [are there]。", "可數名詞數量用 How many。", "basket", "/ˈbæs.kət/", "籃子", "six", "/sɪks/", "六"),
            ("___ water should we drink every day? About eight glasses.", "How much", "How many", "How often", "How far", "我們每天應該喝多少水？大約八杯。", "water 為不可數名詞，詢問數量使用 How much。", "疑問片語 [How much] + 名詞 [water] + 助動詞 [should] + 主詞 [we] + 動詞 [drink]。", "不可數名詞用 How much。", "water", "/ˈwɑː.t̬ɚ/", "水", "glass", "/ɡlæs/", "杯子"),
            ("___ is this cute teddy bear? It's only three hundred dollars.", "How much", "How many", "How old", "How big", "這隻可愛的泰迪熊多少錢？只要三百元。", "詢問商品價格一律使用 How much is...?", "疑問詞 [How much] + 動詞 [is] + 主詞 [this teddy bear]。", "詢問價格用 How much。", "dollar", "/ˈdɑː.lɚ/", "元", "cute", "/kjuːt/", "可愛的"),
            ("___ brothers and sisters do you have? I have one older brother.", "How many", "How much", "How old", "How often", "你有幾位兄弟姊妹？我有一位哥哥。", "brothers and sisters 為可數複數名詞，使用 How many。", "疑問片語 [How many] + 名詞 [brothers] + 助動詞 [do] + 主詞 [you] + 動詞 [have]。", "詢問家人人數用 How many。", "sister", "/ˈsɪs.tɚ/", "姊妹", "brother", "/ˈbrʌð.ɚ/", "兄弟"),
            ("___ sugar do you want in your milk tea? Just a little, please.", "How much", "How many", "How often", "How long", "你的奶茶裡想要加多少糖？只要一點點就好，謝謝。", "sugar（糖）為不可數名詞，使用 How much。", "疑問片語 [How much] + 名詞 [sugar] + 助動詞 [do] + 主詞 [you] + 動詞 [want]。", "不可數名詞 sugar 用 How much。", "sugar", "/ˈʃʊɡ.ɚ/", "糖", "tea", "/tiː/", "茶"),
            ("___ students are there in Class 601? There are twenty-eight.", "How many", "How much", "How old", "How often", "601 班有幾名學生？有二十八名。", "students 為可數名詞複數，使用 How many。", "疑問片語 [How many] + 名詞 [students] + 動詞 [are there]。", "學生人數用 How many。", "student", "/ˈstuː.dənt/", "學生", "twenty", "/ˈtwen.t̬i/", "二十"),
            ("___ days are there in a week? There are seven days.", "How many", "How much", "How long", "How often", "一週有幾天？有七天。", "days 為可數複數，使用 How many。", "疑問片語 [How many] + 名詞 [days] + 動詞 [are there]。", "天數可數用 How many。", "week", "/wiːk/", "週", "seven", "/ˈsev.ən/", "七"),
            ("___ pocket money do you receive each month? Five hundred dollars.", "How much", "How many", "How old", "How often", "你每個月收到多少零用錢？五百元。", "money 為不可數名詞，詢問金額使用 How much money。", "疑問片語 [How much] + 名詞 [pocket money] + 助動詞 [do] + 主詞 [you] + 動詞 [receive]。", "不可數 money 用 How much。", "pocket", "/ˈpɑː.kɪt/", "口袋", "money", "/ˈmʌn.i/", "金錢"),
            ("___ books did you borrow from the library? Three books.", "How many", "How much", "How long", "How often", "你從圖書館借了幾本書？三本書。", "books 為可數名詞複數，使用 How many。", "疑問片語 [How many] + 名詞 [books] + 助動詞 [did] + 主詞 [you] + 動詞 [borrow]。", "書籍數量用 How many。", "borrow", "/ˈbɑːr.oʊ/", "借閱", "library", "/ˈlaɪ.brer.i/", "圖書館"),
            ("___ flour do we need to bake this pie? Two cups of flour.", "How much", "How many", "How often", "How long", "我們烤這個派需要多少麵粉？兩杯麵粉。", "flour（麵粉）為不可數名詞，使用 How much。", "疑問片語 [How much] + 名詞 [flour] + 助動詞 [do] + 主詞 [we] + 動詞 [need]。", "麵粉不可數用 How much。", "flour", "/flaʊr/", "麵粉", "pie", "/paɪ/", "派餅")
        ]),
        # 17. 動詞過去簡單式規則變化
        ("動詞過去簡單式規則變化 (-ed)", "文法句構", {"module": "sixth", "unitId": "sixth-u7", "unitTitle": "國小六年級 Unit 7: 過去簡單式規則與不規則變化"}, [
            ("Yesterday afternoon, we ___ soccer on the school field.", "played", "play", "plays", "playing", "昨天下午，我們在學校操場踢足球。", "時間副詞 Yesterday afternoon 指示過去時間，動詞使用規則過去式 played。", "時間副詞 [Yesterday] + 主詞 [we] + 動詞 [played] + 受詞 [soccer]。", "過去時間標記 yesterday 搭配 played。", "played", "/pleɪd/", "玩耍", "field", "/fiːld/", "操場"),
            ("Mom ___ a delicious strawberry cake for my birthday last night.", "baked", "bakes", "bake", "baking", "昨晚媽媽為我的生日烤了一個美味的草莓蛋糕。", "last night 為過去時間，bake 字尾有 e 直接加 -d 變 baked。", "主詞 [Mom] + 動詞 [baked] + 受詞 [a cake] + 時間片語 [last night]。", "過去式 baked。", "baked", "/beɪkt/", "烘烤", "night", "/naɪt/", "夜晚"),
            ("Leo ___ his teeth and washed his face before going to bed last night.", "brushed", "brushes", "brush", "brushing", "昨晚睡前，Leo 刷了牙也洗了臉。", "對等動詞 washed 為過去式，前面 brush 亦需用過去式 brushed。", "主詞 [Leo] + 動詞 [brushed] + 受詞 [his teeth] + 對等動詞 [washed]。", "與 washed 時態對等，選 brushed。", "brushed", "/brʌʃt/", "刷洗", "face", "/feɪs/", "臉部"),
            ("The little boy ___ loudly because he dropped his ice cream cone.", "cried", "cries", "cry", "crying", "小男孩大聲哭泣，因為他把冰淇淋甜筒弄掉了。", "子音 + y 結尾動詞 cry，過去式去掉 y 加 -ied 變 cried。", "主詞 [The boy] + 動詞 [cried] + 副詞 [loudly]。", "cry 過去式去y加ied變 cried。", "cried", "/kraɪd/", "哭泣", "cone", "/koʊn/", "甜筒"),
            ("They ___ their grandparents in Tainan two weeks ago.", "visited", "visit", "visits", "visiting", "兩週前他們去台南拜訪了祖父母。", "two weeks ago 明確表示過去時間，動詞加 -ed 變 visited。", "主詞 [They] + 動詞 [visited] + 受詞 [their grandparents]。", "two weeks ago 搭配過去式 visited。", "visited", "/ˈvɪz.ɪ.tɪd/", "拜訪", "ago", "/əˈɡoʊ/", "以前"),
            ("The rain ___ suddenly, and the bright sun came out.", "stopped", "stop", "stops", "stopping", "雨突然停了，明亮的太陽出來了。", "單音節短母音 + 單子音結尾之 stop，過去式需重複字尾 p 再加 -ed (stopped)。", "主詞 [The rain] + 動詞 [stopped] + 副詞 [suddenly]。", "stop 重複字尾加 ed 變 stopped。", "stopped", "/stɑːpt/", "停止", "suddenly", "/ˈsʌd.ən.li/", "突然"),
            ("We ___ at the funny clowns in the circus yesterday.", "laughed", "laugh", "laughs", "laughing", "昨天我們在馬戲團對著滑稽的小丑們大笑。", "yesterday 提示過去式，laugh 加 -ed 變 laughed。", "主詞 [We] + 動詞 [laughed] + 介系詞片語 [at the clowns]。", "過去時間搭配 laughed。", "laughed", "/læft/", "笑了", "circus", "/ˈsɝː.kəs/", "馬戲團"),
            ("Emily ___ her messy bedroom completely yesterday morning.", "cleaned", "clean", "cleans", "cleaning", "Emily 昨天早上把她凌亂的臥室徹底打掃乾淨了。", "yesterday morning 提示過去式，clean 加 -ed 變 cleaned。", "主詞 [Emily] + 動詞 [cleaned] + 受詞 [her bedroom]。", "過去時間搭配 cleaned。", "cleaned", "/kliːnd/", "打掃", "messy", "/ˈmes.i/", "凌亂的"),
            ("The students ___ their hands to answer the teacher's question.", "raised", "raise", "raises", "raising", "學生們舉手回答老師的問題。", "字尾為 e 的規則動詞 raise，直接加 -d 變 raised。", "主詞 [The students] + 動詞 [raised] + 受詞 [their hands]。", "raise 過去式為 raised。", "raised", "/reɪzd/", "舉起", "answer", "/ˈæn.sɚ/", "回答"),
            ("Dad ___ dinner for our entire family last Sunday.", "cooked", "cook", "cooks", "cooking", "上週日爸爸為我們全家人煮了晚餐。", "last Sunday 提示過去簡單式，cook 加 -ed 變 cooked。", "主詞 [Dad] + 動詞 [cooked] + 受詞 [dinner] + 時間片語 [last Sunday]。", "last Sunday 搭配 cooked。", "cooked", "/kʊkt/", "煮飯", "entire", "/ɪnˈtaɪr/", "全部的")
        ]),
        # 18. 動詞過去簡單式不規則變化
        ("動詞過去簡單式不規則變化 (went, ate, saw, had)", "文法句構", {"module": "sixth", "unitId": "sixth-u7", "unitTitle": "國小六年級 Unit 7: 過去簡單式規則與不規則變化"}, [
            ("We ___ to Kenting National Park with our family last summer.", "went", "go", "goes", "going", "去年夏天我們和家人一起去了墾丁國家公園。", "go 的不規則過去式為 went。", "主詞 [We] + 動詞 [went] + 地方片語 [to Kenting]。", "go 過去式為 went。", "went", "/went/", "去了", "summer", "/ˈsʌm.ɚ/", "夏天"),
            ("Peter ___ two big slices of pepperoni pizza for lunch yesterday.", "ate", "eat", "eats", "eating", "Peter 昨天午餐吃了兩大片義式臘腸披薩。", "eat 的不規則過去式為 ate。", "主詞 [Peter] + 動詞 [ate] + 受詞 [two slices of pizza]。", "eat 過去式為 ate。", "ate", "/eɪt/", "吃了", "pizza", "/ˈpiːt.sə/", "披薩"),
            ("I ___ a colorful rainbow in the sky after the heavy rain.", "saw", "see", "sees", "seeing", "大雨過後我看見天空中有一道色彩繽紛的彩虹。", "see 的不規則過去式為 saw。", "主詞 [I] + 動詞 [saw] + 受詞 [a colorful rainbow]。", "see 過去式為 saw。", "saw", "/sɑː/", "看見", "rainbow", "/ˈreɪn.boʊ/", "彩虹"),
            ("We ___ a wonderful picnic party under the cherry trees last weekend.", "had", "have", "has", "having", "上週末我們在櫻花樹下舉辦了一場美好的野餐派對。", "have 的不規則過去式為 had。", "主詞 [We] + 動詞 [had] + 受詞 [a picnic party]。", "have 過去式為 had。", "had", "/hæd/", "舉辦/擁有", "picnic", "/ˈpɪk.nɪk/", "野餐"),
            ("Mom ___ me a new set of color pencils for my birthday yesterday.", "bought", "buy", "buys", "buying", "昨天媽媽買了一套新的彩色鉛筆送我當生日禮物。", "buy 的不規則過去式為 bought。", "主詞 [Mom] + 授與動詞 [bought] + 間接受詞 [me] + 直接受詞 [pencils]。", "buy 過去式為 bought。", "bought", "/bɑːt/", "買了", "pencil", "/ˈpen.səl/", "鉛筆"),
            ("The school bus ___ at our bus stop early this morning.", "came", "come", "comes", "coming", "校車今天一大早就來到我們的公車站牌。", "come 的不規則過去式為 came。", "主詞 [The school bus] + 動詞 [came] + 地方片語 [at our stop]。", "come 過去式為 came。", "came", "/keɪm/", "來了", "early", "/ˈɝː.li/", "早早地"),
            ("Tony ___ his science homework before watching television last night.", "did", "do", "does", "doing", "Tony 昨晚看電視前做完了他的自然作業。", "do 的不規則過去式為 did。", "主詞 [Tony] + 動詞 [did] + 受詞 [his homework]。", "do 過去式為 did。", "did", "/dɪd/", "做了", "television", "/ˈtel.ə.vɪʒ.ən/", "電視"),
            ("The little girl ___ her favorite doll on the playground yesterday.", "lost", "lose", "loses", "losing", "小女孩昨天在操場上弄丟了她心愛的洋娃娃。", "lose 的不規則過去式為 lost。", "主詞 [The girl] + 動詞 [lost] + 受詞 [her doll]。", "lose 過去式為 lost。", "lost", "/lɑːst/", "弄丟了", "doll", "/dɑːl/", "玩偶"),
            ("Grandpa ___ a warm letter to his old friend in Tokyo last week.", "wrote", "write", "writes", "writing", "上週爺爺寫了一封溫暖的信給他在東京的老朋友。", "write 的不規則過去式為 wrote。", "主詞 [Grandpa] + 動詞 [wrote] + 受詞 [a warm letter]。", "write 過去式為 wrote。", "wrote", "/roʊt/", "寫了", "letter", "/ˈlet̬.ɚ/", "信件"),
            ("The baby ___ for ten hours straight without waking up last night.", "slept", "sleep", "sleeps", "sleeping", "昨晚小嬰兒連續睡了十個小時沒有醒來。", "sleep 的不規則過去式為 slept。", "主詞 [The baby] + 動詞 [slept] + 時間片語 [for ten hours]。", "sleep 過去式為 slept。", "slept", "/slept/", "睡覺", "straight", "/streɪt/", "連續地")
        ]),
        # 19. 特徵形容詞與反義詞
        ("特徵形容詞與反義詞 (tall/short, big/small)", "單字語意", {"module": "sixth", "unitId": "sixth-u3", "unitTitle": "國小六年級 Unit 3: 特徵形容詞與對比描繪"}, [
            ("An elephant is very ___, while a tiny mouse is small.", "big", "small", "thin", "short", "大象非常龐大，而微小的老鼠很小。", "對比 tiny mouse，形容大象使用 big / large。", "主詞 [An elephant] + 動詞 [is] + 補語 [very big]。", "大象龐大選 big。", "big", "/bɪɡ/", "龐大的", "elephant", "/ˈel.ə.fənt/", "大象"),
            ("The basketball player is very ___; he can easily touch the rim.", "tall", "short", "fat", "low", "那位籃球選手非常高大；他能輕易摸到籃框。", "形容身材高大使用 tall。", "主詞 [The player] + 動詞 [is] + 補語 [very tall]。", "籃球選手高挑選 tall。", "tall", "/tɑːl/", "高大的", "player", "/ˈpleɪ.ɚ/", "選手"),
            ("Don't drink that soup right now; it is boiling ___!", "hot", "cold", "cool", "clean", "現在不要喝那碗湯；它滾燙燙的！", "boiling 提示溫度滾燙，選 hot。", "主詞 [it] + 動詞 [is] + 補語 [hot]。", "滾燙選 hot。", "hot", "/hɑːt/", "滾燙的", "boil", "/bɔɪl/", "沸騰"),
            ("In winter, the weather in the high mountains becomes freezing ___.", "cold", "hot", "warm", "sunny", "在冬天，高山上的天氣變得極度寒冷。", "冬季高山低溫使用 cold。", "主詞 [the weather] + 動詞 [becomes] + 補語 [freezing cold]。", "冬季嚴寒選 cold。", "cold", "/koʊld/", "寒冷的", "freezing", "/ˈfriː.zɪŋ/", "冰凍的"),
            ("The marathon runner was very ___ after running forty kilometers.", "tired", "fresh", "energetic", "sleepy", "跑了四十公里後，馬拉松跑者非常疲倦。", "長跑後體力耗盡形容為 tired。", "主詞 [The runner] + 動詞 [was] + 補語 [very tired]。", "長跑後疲憊選 tired。", "tired", "/taɪərd/", "疲倦的", "runner", "/ˈrʌn.ɚ/", "跑者"),
            ("After playing soccer for two hours, the boys felt hungry and ___.", "thirsty", "full", "cold", "sad", "踢了兩個小時足球後，男孩們感到又餓又渴。", "運動流汗需要補充水分形容為 thirsty。", "主詞 [the boys] + 連綴動詞 [felt] + 補語 [hungry and thirsty]。", "口渴選 thirsty。", "thirsty", "/ˈθɝː.sti/", "口渴的", "hungry", "/ˈhʌŋ.ɡri/", "飢餓的"),
            ("The classroom floor was very ___ after the students cleaned it.", "clean", "dirty", "messy", "dark", "學生們打掃過後，教室地板非常乾淨。", "cleaned 動作帶來的正面結果為 clean。", "主詞 [The floor] + 動詞 [was] + 補語 [very clean]。", "打掃乾淨選 clean。", "clean", "/kliːn/", "乾淨的", "floor", "/flɔːr/", "地板"),
            ("Taking the high-speed train is very ___; it takes only 90 minutes.", "fast", "slow", "heavy", "late", "搭乘高鐵非常快速；只需要 90 分鐘。", "僅需90分鐘表示車速極快，選 fast。", "主詞 [Taking the train] + 動詞 [is] + 補語 [very fast]。", "高鐵速度快選 fast。", "fast", "/fæst/", "快速的", "train", "/treɪn/", "火車"),
            ("This math puzzle is quite ___; even first graders can solve it.", "easy", "difficult", "hard", "heavy", "這個數學謎題相當容易；連一年級小學生都能解答。", "連一年級都能輕易解出表示題目很 easy。", "主詞 [This puzzle] + 動詞 [is] + 補語 [quite easy]。", "題目簡單選 easy。", "easy", "/ˈiː.zi/", "容易的", "grade", "/ɡreɪd/", "年級"),
            ("The stone monument in the park is extremely ___; we cannot lift it.", "heavy", "light", "soft", "small", "公園裡的石碑極其沉重；我們抬不起來。", "抬不動說明非常 heavy。", "主詞 [The monument] + 動詞 [is] + 補語 [extremely heavy]。", "重量沉重選 heavy。", "heavy", "/ˈhev.i/", "沉重的", "stone", "/stoʊn/", "石頭")
        ]),
        # 20. 天氣、季節與日常衣著
        ("天氣、季節與日常衣著 (sunny, rainy, winter, jacket)", "單字語意", {"module": "sixth", "unitId": "sixth-u5", "unitTitle": "國小六年級 Unit 5: 天氣現象與季節衣著搭配"}, [
            ("It is a bright and ___ day; let's go have a picnic in the park!", "sunny", "rainy", "stormy", "cloudy", "今天是一個明媚晴朗的日子；我們去公園野餐吧！", "適合野餐的天氣為 sunny。", "主詞 [It] + 動詞 [is] + 補語 [a bright and sunny day]。", "適合野餐選 sunny。", "sunny", "/ˈsʌn.i/", "晴朗的", "bright", "/braɪt/", "明亮的"),
            ("Don't forget to take an umbrella; it will be ___ this afternoon.", "rainy", "sunny", "clear", "dry", "別忘了帶傘；今天下午會是下雨天。", "需要帶傘提示天氣為 rainy。", "主詞 [it] + 動詞 [will be] + 補語 [rainy]。", "帶傘應對 rainy。", "rainy", "/ˈreɪ.ni/", "多雨的", "umbrella", "/ʌmˈbrel.ə/", "雨傘"),
            ("It is freezing cold outside; remember to put on your thick ___.", "jacket", "swimsuit", "shorts", "sandals", "外面寒冷刺骨；記得穿上你的厚夾克外套。", "禦寒保暖穿著厚夾克 jacket。", "動詞片語 [put on] + 受詞 [your thick jacket]。", "寒冬保暖穿 jacket。", "jacket", "/ˈdʒæk.ɪt/", "夾克", "thick", "/θɪk/", "厚重的"),
            ("Summer in southern Taiwan is usually very ___ and humid.", "hot", "freezing", "snowy", "cold", "南台灣的夏天通常非常炎熱且潮濕。", "夏季氣候特徵為 hot。", "主詞 [Summer] + 動詞 [is] + 補語 [hot and humid]。", "夏季炎熱選 hot。", "hot", "/hɑːt/", "炎熱的", "humid", "/ˈhjuː.mɪd/", "潮濕的"),
            ("Leaves turn yellow and fall from branches in ___.", "autumn", "spring", "summer", "winter", "樹葉在秋天變成黃色，並從樹枝上飄落。", "落葉變色是秋季 autumn 的特徵。", "主詞 [Leaves] + 動詞 [turn yellow] + 時間片語 [in autumn]。", "秋天落葉選 autumn。", "autumn", "/ˈɑː.t̬əm/", "秋天", "leaf", "/liːf/", "樹葉"),
            ("Children love to build snowmen and play with snow in ___.", "winter", "summer", "spring", "autumn", "孩子們喜歡在冬天堆雪人、玩雪。", "下雪堆雪人的季節是 winter。", "主詞 [Children] + 動詞 [love] + 受詞 [to build snowmen] + 片語 [in winter]。", "玩雪季節選 winter。", "winter", "/ˈwɪn.t̬ɚ/", "冬天", "snowman", "/ˈsnoʊ.mæn/", "雪人"),
            ("Look at the dark clouds in the sky; it looks very ___ right now.", "cloudy", "sunny", "dry", "clear", "看看天空中烏雲密布；此刻看起來陰雲密布。", "dark clouds 提示 cloudy。", "主詞 [it] + 連綴動詞 [looks] + 補語 [very cloudy]。", "烏雲密布選 cloudy。", "cloudy", "/ˈklaʊ.di/", "陰天的", "sky", "/skaɪ/", "天空"),
            ("The wind is blowing strongly today; it is a very ___ afternoon.", "windy", "calm", "still", "quiet", "今天風吹得好大；這是一個風很大的下午。", "風吹得大形容為 windy。", "主詞 [it] + 動詞 [is] + 補語 [a very windy afternoon]。", "風勢大選 windy。", "windy", "/ˈwɪn.di/", "風大的", "blow", "/bloʊ/", "吹拂"),
            ("Lucy wore a beautiful white ___ to the school music concert.", "dress", "boots", "gloves", "umbrella", "Lucy 穿了一件漂亮的白色洋裝去參加學校音樂會。", "穿著一件漂亮的白色衣服為 dress。", "主詞 [Lucy] + 動詞 [wore] + 受詞 [a white dress]。", "穿著禮服選 dress。", "dress", "/dres/", "洋裝", "wear", "/wer/", "穿著"),
            ("You should wear a warm ___ around your neck to protect against the wind.", "scarf", "swimsuit", "shorts", "sandals", "你應該在脖子圍上溫暖的圍巾以抵禦寒風。", "圍在脖子上的防寒配件為圍巾 scarf。", "動詞 [wear] + 受詞 [a warm scarf] + 片語 [around your neck]。", "圍巾選 scarf。", "scarf", "/skɑːrf/", "圍巾", "neck", "/nek/", "脖子")
        ]),
        # 21. 日期、星期與月份日常應用
        ("日期、星期與月份日常應用", "單字語意", {"module": "sixth", "unitId": "sixth-u5", "unitTitle": "國小六年級 Unit 5: 日曆、週期與節慶時間認知"}, [
            ("___ is the first day of the week in traditional Western calendars.", "Sunday", "Monday", "Friday", "Saturday", "在傳統西方日曆中，星期日是一週的第一天。", "西方日曆一週的第一天為 Sunday。", "主詞 [Sunday] + 動詞 [is] + 補語 [the first day]。", "西方週曆首日為 Sunday。", "Sunday", "/ˈsʌn.deɪ/", "星期日", "calendar", "/ˈkæl.ən.dɚ/", "日曆"),
            ("We have a weekly English quiz every ___ morning before lunch.", "Friday", "July", "Winter", "Morning", "我們每週五上午午餐前都有一次每週英語小考。", "修飾 morning 表每週具體星期用 Friday。", "主詞 [We] + 動詞 [have] + 受詞 [a quiz] + 時間片語 [every Friday morning]。", "星期幾選 Friday。", "Friday", "/ˈfraɪ.deɪ/", "星期五", "quiz", "/kwɪz/", "小考"),
            ("The hottest month of the year in Taiwan is usually ___.", "July", "January", "February", "December", "在台灣，一年當中最熱的月份通常是七月。", "盛夏最熱月份為 July 或 August。", "主詞 [The hottest month] + 動詞 [is] + 補語 [July]。", "炎熱盛夏選 July。", "July", "/dʒuːˈlaɪ/", "七月", "hot", "/hɑːt/", "熱的"),
            ("Christmas Day is celebrated worldwide on ___ 25th.", "December", "October", "November", "September", "全球於十二月二十五日慶祝聖誕節。", "聖誕節在 December 25th。", "主詞 [Christmas] + 助動詞 [is celebrated] + 片語 [on December 25th]。", "聖誕月為 December。", "December", "/dɪˈsem.bɚ/", "十二月", "celebrate", "/ˈsel.ə.breɪt/", "慶祝"),
            ("New Year's Day is on ___ 1st every year.", "January", "February", "March", "April", "元旦新年在每年的的一月一日。", "新年第一天在一月 January 1st。", "主詞 [New Year's Day] + 動詞 [is] + 片語 [on January 1st]。", "元旦為 January。", "January", "/ˈdʒæn.ju.er.i/", "一月", "year", "/jɪr/", "年份"),
            ("Tomorrow is ___, the weekend! We don't have to wake up early.", "Saturday", "Wednesday", "Tuesday", "Thursday", "明天是星期六，週末了！我們不必早起。", "週末第一天為 Saturday。", "主詞 [Tomorrow] + 動詞 [is] + 補語 [Saturday]。", "週末首日為 Saturday。", "Saturday", "/ˈsæt̬.ɚ.deɪ/", "星期六", "weekend", "/ˈwiːk.end/", "週末"),
            ("Halloween is celebrated on the last day of ___, October 31st.", "October", "August", "May", "June", "萬聖夜在十月的最後一天——十月三十一日慶祝。", "萬聖節在 October 31st。", "主詞 [Halloween] + 助動詞 [is celebrated] + 片語 [in October]。", "萬聖節月份為 October。", "October", "/ɑːkˈtoʊ.bɚ/", "十月", "Halloween", "/ˌhæl.oʊˈiːn/", "萬聖節"),
            ("Teachers' Day in Taiwan falls on ___ 28th.", "September", "July", "August", "December", "台灣的教師節在九月二十八日。", "教師節為 September 28th。", "主詞 [Teachers' Day] + 動詞 [falls] + 片語 [on September 28th]。", "教師節月份為 September。", "September", "/sepˈtem.bɚ/", "九月", "teacher", "/ˈtiː.tʃɚ/", "老師"),
            ("There are twelve ___ in one year.", "months", "days", "weeks", "hours", "一年有十二個月份。", "一年有十二個 months。", "引導詞 [There are] + 主詞 [twelve months] + 片語 [in one year]。", "一年十二個月選 months。", "month", "/mʌnθ/", "月份", "twelve", "/twelv/", "十二"),
            ("February is the shortest month; it usually has twenty-eight ___.", "days", "months", "years", "weeks", "二月是最短的月份；它通常有二十八天。", "每個月由天數 days 組成，二月有 28 days。", "主詞 [it] + 動詞 [has] + 受詞 [twenty-eight days]。", "天數選 days。", "day", "/deɪ/", "天", "February", "/ˈfeb.ruː.er.i/", "二月")
        ]),
        # 22. 日常作息與休閒娛樂
        ("日常作息與休閒娛樂 (ride a bike, play the piano)", "篇章語境", {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: 日常作息與休閒嗜好英語"}, [
            ("Every evening after dinner, Grandpa likes to take a walk in the ___.", "park", "station", "hospital", "kitchen", "每天晚餐後，爺爺喜歡在公園裡散步。", "散步的戶外場所為 park。", "主詞 [Grandpa] + 動詞 [likes to take a walk] + 地方片語 [in the park]。", "散步去公園 park。", "park", "/pɑːrk/", "公園", "walk", "/wɑːk/", "散步"),
            ("Lucy practices playing the ___ for forty minutes every afternoon.", "piano", "soccer", "swimming", "running", "Lucy 每天下午練習彈鋼琴四十分鐘。", "動詞為 play the... 樂器，選 piano。", "主詞 [Lucy] + 動詞 [practices] + 受詞 [playing the piano]。", "樂器搭配 play the piano。", "piano", "/piˈæn.oʊ/", "鋼琴", "practice", "/ˈpræk.tɪs/", "練習"),
            ("On sunny weekends, the boys love to ___ their bicycles along the path.", "ride", "drive", "fly", "sail", "在晴朗的週末，男孩們喜歡沿著步道騎腳踏車。", "腳踏車搭配動詞 ride bicycles。", "主詞 [the boys] + 動詞 [love to ride] + 受詞 [their bicycles]。", "騎腳踏車用 ride。", "ride", "/raɪd/", "騎乘", "bicycle", "/ˈbaɪ.sə.kəl/", "腳踏車"),
            ("Before going to bed, Emily always ___ an interesting storybook.", "reads", "watches", "listens", "draws", "上床睡覺前，Emily 總是會閱讀一本有趣的故事書。", "書籍搭配動詞 read a storybook。", "主詞 [Emily] + 頻率副詞 [always] + 動詞 [reads] + 受詞 [a storybook]。", "看書搭配 reads。", "read", "/riːd/", "閱讀", "book", "/bʊk/", "書籍"),
            ("My brother loves sports; he ___ badminton with his friends every Saturday.", "plays", "takes", "makes", "goes", "我哥哥熱愛運動；他每週六都和朋友打羽毛球。", "球類運動搭配 play badminton。", "主詞 [he] + 動詞 [plays] + 受詞 [badminton]。", "打球搭配 plays。", "badminton", "/ˈbæd.mɪn.tən/", "羽毛球", "sports", "/spɔːrts/", "體育"),
            ("We often ___ swimming in the indoor heated pool during winter.", "go", "do", "play", "make", "冬天我們經常去室內溫水游泳池游泳。", "休閒體育活動習慣用 go swimming。", "主詞 [We] + 頻率副詞 [often] + 動詞 [go] + 動名詞 [swimming]。", "游泳用 go swimming。", "swimming", "/ˈswɪm.ɪŋ/", "游泳", "pool", "/puːl/", "水池"),
            ("Peter likes to ___ music on his headphones while doing exercises.", "listen to", "hear", "watch", "look at", "Peter 喜歡在寫練習題時戴耳機聽音樂。", "聽音樂固定片語為 listen to music。", "主詞 [Peter] + 動詞 [likes to listen to] + 受詞 [music]。", "聽音樂選 listen to。", "music", "/ˈmjuː.zɪk/", "音樂", "headphone", "/ˈhed.foʊn/", "耳機"),
            ("Mom asks us to ___ our hands thoroughly before having dinner.", "wash", "watch", "wake", "walk", "媽媽要求我們在吃晚餐前要徹底洗手。", "飯前洗手為 wash our hands。", "動詞 [wash] + 受詞 [our hands]。", "洗手選 wash。", "wash", "/wɑːʃ/", "洗滌", "hand", "/hænd/", "手"),
            ("I always ___ up at 6:30 a.m. to catch the first school bus.", "wake", "stay", "look", "stand", "我總是早上 6:30 起床以趕搭第一班校車。", "起床、醒來片語為 wake up / get up。", "主詞 [I] + 頻率副詞 [always] + 動詞片語 [wake up]。", "起床片語 wake up。", "wake", "/weɪk/", "醒來", "bus", "/bʌs/", "公車"),
            ("The children love to ___ colorful pictures with their new crayons.", "draw", "sing", "swim", "write", "孩子們喜歡用他們的新蠟筆畫色彩繽紛的圖畫。", "用蠟筆畫圖為 draw pictures。", "主詞 [The children] + 動詞 [love to draw] + 受詞 [pictures]。", "畫圖選 draw。", "draw", "/drɑː/", "畫畫", "crayon", "/ˈkreɪ.ɑːn/", "蠟筆")
        ]),
        # 23. 食物、飲品與喜好表達
        ("食物、飲品與喜好表達 (like, want, favorite)", "單字語意", {"module": "sixth", "unitId": "sixth-u3", "unitTitle": "國小六年級 Unit 3: 美食點心與餐飲偏好表達"}, [
            ("An apple a day keeps the ___ away, as an old saying goes.", "doctor", "teacher", "cook", "driver", "俗話說：一天一蘋果，醫生遠離我。", "經典健康英語諺語：An apple a day keeps the doctor away。", "主詞 [An apple] + 動詞 [keeps] + 受詞 [the doctor] + 副詞 [away]。", "健康諺語選 doctor。", "doctor", "/ˈdɑːk.tɚ/", "醫生", "apple", "/ˈæp.əl/", "蘋果"),
            ("My younger sister loves sweet desserts; her ___ fruit is strawberry.", "favorite", "hated", "boring", "terrible", "我妹妹喜愛甜食點心；她最喜愛的水果是草莓。", "最喜愛的水果使用 favorite fruit。", "主詞 [her favorite fruit] + 動詞 [is] + 補語 [strawberry]。", "最喜歡的選 favorite。", "favorite", "/ˈfeɪ.vər.ɪt/", "最喜愛的", "dessert", "/dɪˈzɝːt/", "甜點"),
            ("Would you like some orange ___ or cold milk with your breakfast?", "juice", "soup", "tea", "sauce", "你吃早餐時想要來點柳橙汁還是冰牛奶呢？", "orange juice（柳橙汁）為常見早餐飲品。", "助動詞 [Would] + 主詞 [you] + 動詞 [like] + 受詞 [orange juice]。", "柳橙汁選 juice。", "juice", "/dʒuːs/", "果汁", "orange", "/ˈɔːr.ɪndʒ/", "柳橙"),
            ("Peter is very hungry; he wants to order a double beef ___.", "burger", "candy", "cookie", "cake", "Peter 非常飢餓；他想點一份雙層牛肉漢堡。", "雙層牛肉漢堡為 double beef burger。", "主詞 [he] + 動詞 [wants to order] + 受詞 [a beef burger]。", "牛肉漢堡選 burger。", "burger", "/ˈbɝː.ɡɚ/", "漢堡", "beef", "/biːf/", "牛肉"),
            ("We eat vegetables and fruits every day to keep our bodies ___.", "healthy", "sick", "tired", "weak", "我們每天吃蔬菜和水果以保持身體健康。", "吃蔬果保持健康 healthy。", "動詞 [keep] + 受詞 [our bodies] + 補語 [healthy]。", "保持健康選 healthy。", "healthy", "/ˈhel.θi/", "健康的", "vegetable", "/ˈvedʒ.tə.bəl/", "蔬菜"),
            ("A slice of hot pepperoni ___ is my brother's favorite party snack.", "pizza", "soup", "juice", "tea", "一片熱騰騰的義式臘腸披薩是我哥哥最愛的派對點心。", "按片 (slice) 享用的義式食物為 pizza。", "主詞 [A slice of pizza] + 動詞 [is] + 補語 [favorite snack]。", "披薩選 pizza。", "pizza", "/ˈpiːt.sə/", "披薩", "snack", "/snæk/", "點心"),
            ("Mom added some fresh ___ and onions to the vegetable soup.", "carrots", "candies", "cookies", "chocolates", "媽媽在蔬菜湯裡加了一些新鮮的胡蘿蔔和洋蔥。", "蔬菜湯食材為胡蘿蔔 carrots。", "主詞 [Mom] + 動詞 [added] + 受詞 [carrots and onions]。", "蔬菜食材選 carrots。", "carrot", "/ˈker.ət/", "胡蘿蔔", "onion", "/ˈʌn.jən/", "洋蔥"),
            ("I don't like bitter coffee; I prefer sweet chocolate ___.", "milk", "soup", "oil", "sauce", "我不喜歡苦咖啡；我比較喜歡甜甜的巧克力牛奶。", "甜飲品為 chocolate milk（巧克力牛奶）。", "主詞 [I] + 動詞 [prefer] + 受詞 [chocolate milk]。", "巧克力牛奶選 milk。", "milk", "/mɪlk/", "牛奶", "chocolate", "/ˈtʃɑːk.lət/", "巧克力"),
            ("Drinking enough clean ___ every day is essential for good health.", "water", "cola", "candy", "chips", "每天喝足夠的乾淨白開水對身體健康至關重要。", "維持健康必喝 clean water。", "動名詞主詞 [Drinking clean water] + 動詞 [is] + 補語 [essential]。", "喝白開水選 water。", "water", "/ˈwɑː.t̬ɚ/", "水", "clean", "/kliːn/", "純淨的"),
            ("Grandma baked a tray of crispy chocolate chip ___ for afternoon tea.", "cookies", "soups", "juices", "waters", "奶奶為下午茶烤了一盤酥脆的巧克力豆餅乾。", "烘烤出酥脆的點心為 cookies。", "主詞 [Grandma] + 動詞 [baked] + 受詞 [a tray of cookies]。", "烘烤餅乾選 cookies。", "cookie", "/ˈkʊk.i/", "餅乾", "crispy", "/ˈkrɪs.pi/", "酥脆的")
        ]),
        # 24. 動物與自然生態基礎認知
        ("動物與自然生態基礎認知 (dolphin, lion, forest, zoo)", "單字語意", {"module": "sixth", "unitId": "sixth-u4", "unitTitle": "國小六年級 Unit 4: 動物生態與大自然探索"}, [
            ("A ___ is known as the king of the jungle because of its power.", "lion", "rabbit", "mouse", "sheep", "獅子因其威猛而聞名為萬獸之王。", "萬獸之王 (king of the jungle) 指 lion。", "主詞 [A lion] + 助動詞 [is known] + 補語 [as the king]。", "萬獸之王為 lion。", "lion", "/ˈlaɪ.ən/", "獅子", "jungle", "/ˈdʒʌŋ.ɡəl/", "叢林"),
            ("A smart ___ can leap out of the ocean water and perform tricks.", "dolphin", "elephant", "giraffe", "bear", "聰明的海豚能躍出海面並表演特技。", "生活在海洋且會躍水表演的是 dolphin。", "主詞 [A dolphin] + 助動詞 [can leap] + 地方片語 [out of the ocean]。", "海中精靈選 dolphin。", "dolphin", "/ˈdɑːl.fɪn/", "海豚", "ocean", "/ˈoʊ.ʃən/", "海洋"),
            ("The tall ___ has a very long neck to reach fresh leaves on high branches.", "giraffe", "monkey", "tiger", "pig", "高大的長頸鹿有非常長的脖子，能吃到高枝上的新鮮樹葉。", "長脖子吃高樹葉的動物為 giraffe。", "主詞 [The giraffe] + 動詞 [has] + 受詞 [a long neck]。", "長頸鹿選 giraffe。", "giraffe", "/dʒɪˈræf/", "長頸鹿", "neck", "/nek/", "脖子"),
            ("Koalas and kangaroos are unique wild animals native to ___.", "Australia", "Taiwan", "Japan", "Canada", "無尾熊和袋鼠是澳洲特有的野生動物。", "袋鼠與無尾熊原產地為 Australia。", "主詞 [Koalas and kangaroos] + 動詞 [are] + 補語 [animals] + 片語 [native to Australia]。", "特產國為 Australia。", "kangaroo", "/ˌkæŋ.ɡəˈruː/", "袋鼠", "Australia", "/ɑːˈstreɪl.jə/", "澳洲"),
            ("The giant panda loves to eat fresh green ___ in the mountain forest.", "bamboo", "meat", "fish", "bread", "大貓熊喜歡在山林裡吃新鮮翠綠的竹子。", "貓熊的主食是竹子 bamboo。", "主詞 [The panda] + 動詞 [loves to eat] + 受詞 [bamboo]。", "貓熊主食選 bamboo。", "panda", "/ˈpæn.də/", "貓熊", "bamboo", "/bæmˈbuː/", "竹子"),
            ("A ___ has black and white stripes all over its body.", "zebra", "horse", "lion", "camel", "斑馬全身覆蓋著黑白相間的條紋。", "黑白條紋動物為 zebra。", "主詞 [A zebra] + 動詞 [has] + 受詞 [stripes]。", "黑白條紋選 zebra。", "zebra", "/ˈzeb.rə/", "斑馬", "stripe", "/straɪp/", "條紋"),
            ("Birds use their sturdy ___ to fly gracefully through the sky.", "wings", "legs", "ears", "teeth", "鳥類使用牠們堅韌的翅膀優雅地在天空中飛翔。", "飛行器官為翅膀 wings。", "主詞 [Birds] + 動詞 [use] + 受詞 [their wings] + 目的片語 [to fly]。", "飛翔器官選 wings。", "wing", "/wɪŋ/", "翅膀", "gracefully", "/ˈɡreɪs.fəl.i/", "優雅地"),
            ("Camels can survive for weeks in the hot and dry ___ without water.", "desert", "ocean", "forest", "river", "駱駝可以在炎熱乾燥的沙漠中數週不喝水而生存。", "炎熱乾旱且駱駝適應的環境為 desert。", "主詞 [Camels] + 助動詞 [can survive] + 地方片語 [in the desert]。", "沙漠環境選 desert。", "camel", "/ˈkæm.əl/", "駱駝", "desert", "/ˈdez.ɚt/", "沙漠"),
            ("Monkeys are very agile; they can swing easily from tree to ___.", "tree", "car", "desk", "bed", "猴子非常敏捷；牠們能輕易地從一棵樹盪到另一棵樹。", "from tree to tree 固定片語（在樹木之間）。", "主詞 [they] + 助動詞 [can swing] + 片語 [from tree to tree]。", "樹木間擺盪選 tree。", "swing", "/swɪŋ/", "擺盪", "tree", "/triː/", "樹木"),
            ("Frogs can live both on land and in fresh ___.", "water", "fire", "sky", "space", "青蛙既能生活在陸地上，也能生活在淡水中。", "兩棲動物生活於陸地與水中 (water)。", "主詞 [Frogs] + 助動詞 [can live] + 片語 [both on land and in water]。", "兩棲生活選 water。", "frog", "/frɑːɡ/", "青蛙", "land", "/lænd/", "陸地")
        ]),
        # 25. 校園生活、常見職業與場所
        ("校園生活、常見職業與場所 (teacher, doctor, library)", "單字語意", {"module": "sixth", "unitId": "sixth-u1", "unitTitle": "國小六年級 Unit 1: 校園職業與社區生活場所"}, [
            ("A dedicated ___ helps sick patients recover in the general hospital.", "doctor", "pilot", "driver", "singer", "一位敬業的醫生在綜合醫院幫助生病的病患康復。", "在醫院治療病人的是 doctor。", "主詞 [A doctor] + 動詞 [helps] + 受詞 [patients] + 原形補語 [recover]。", "醫治病患選 doctor。", "doctor", "/ˈdɑːk.tɚ/", "醫生", "patient", "/ˈpeɪ.ʃənt/", "病人"),
            ("Students can borrow books and study quietly in the school ___.", "library", "bakery", "restaurant", "gym", "學生可以在學校圖書館借書並安靜地自習。", "借書與安靜讀書的地方是 library。", "主詞 [Students] + 助動詞 [can borrow] + 受詞 [books] + 片語 [in the library]。", "借書場所選 library。", "library", "/ˈlaɪ.brer.i/", "圖書館", "borrow", "/ˈbɑːr.oʊ/", "借閱"),
            ("A talented ___ bakes fresh bread and cakes early every morning.", "baker", "doctor", "pilot", "officer", "一位手藝精湛的烘焙師每天清晨烘烤新鮮的麵包和蛋糕。", "烘烤麵包蛋糕的職人是 baker。", "主詞 [A baker] + 動詞 [bakes] + 受詞 [bread and cakes]。", "烤麵包選 baker。", "baker", "/ˈbeɪ.kɚ/", "烘焙師", "bread", "/bred/", "麵包"),
            ("Firefighters are brave workers who extinguish dangerous ___.", "fires", "waters", "winds", "rain", "消防隊員是撲滅危險火災的勇敢工作者。", "消防員滅火 (extinguish fires)。", "主詞 [Firefighters] + 動詞 [are] + 關係子句 [who extinguish fires]。", "消防滅火選 fires。", "firefighter", "/ˈfaɪrˌfaɪ.t̬ɚ/", "消防員", "extinguish", "/ɪkˈstɪŋ.ɡwɪʃ/", "撲滅"),
            ("A careful ___ drives the yellow school bus safely every day.", "driver", "doctor", "cook", "farmer", "一位細心的司機每天安全地駕駛著黃色校車。", "駕駛巴士的人是 driver。", "主詞 [A driver] + 動詞 [drives] + 受詞 [the bus] + 副詞 [safely]。", "開校車選 driver。", "driver", "/ˈdraɪ.vɚ/", "司機", "safely", "/ˈseɪf.li/", "安全地"),
            ("Our science ___ explained how plants make food through sunlight.", "teacher", "nurse", "cook", "singer", "我們的自然老師解釋了植物如何透過陽光製造養分。", "在課堂講解科學知識的是 teacher。", "主詞 [Our science teacher] + 動詞 [explained] + 名詞子句 [how plants make food]。", "課堂教學選 teacher。", "teacher", "/ˈtiː.tʃɚ/", "老師", "sunlight", "/ˈsʌn.laɪt/", "陽光"),
            ("When Leo had a toothache, his mom took him to see a ___.", "dentist", "pilot", "farmer", "waiter", "當 Leo 牙痛時，他媽媽帶他去看牙醫。", "治療牙痛專科醫生為 dentist。", "主詞 [his mom] + 動詞 [took] + 受詞 [him] + 片語 [to see a dentist]。", "看牙醫選 dentist。", "dentist", "/ˈden.tɪst/", "牙醫", "toothache", "/ˈtuːθ.eɪk/", "牙痛"),
            ("We bought medicine and bandages at the local ___ down the street.", "pharmacy", "cinema", "museum", "park", "我們在街角當地的藥局買了藥品和繃帶。", "購買藥品繃帶的場所為 pharmacy。", "主詞 [We] + 動詞 [bought] + 受詞 [medicine] + 片語 [at the pharmacy]。", "買藥場所選 pharmacy。", "pharmacy", "/ˈfɑːr.mə.si/", "藥局", "medicine", "/ˈmed.ɪ.sən/", "藥品"),
            ("A skilled ___ prepares delicious meals for guests at the restaurant.", "chef", "driver", "pilot", "postman", "一位廚藝精湛的主廚在餐廳為賓客烹調美味佳餚。", "餐廳烹飪佳餚者為 chef。", "主詞 [A skilled chef] + 動詞 [prepares] + 受詞 [meals]。", "餐廳大廚選 chef。", "chef", "/ʃef/", "主廚", "meal", "/miːl/", "餐點"),
            ("The police ___ helped the lost little boy find his parents.", "officer", "cook", "singer", "baker", "警察幫助走失的小男孩找到了父母親。", "police officer 代表警察維護治安。", "主詞 [The police officer] + 動詞 [helped] + 受詞 [the lost boy]。", "警察選 officer。", "officer", "/ˈɑː.fɪ.sɚ/", "警官", "police", "/pəˈliːs/", "警察")
        ])
    ]
    
    subtopics_data.extend(extra_subtopics)
    
    # Process all 25 subtopics
    q_counter = 0
    for sub_title, dim, hook, q_list in subtopics_data:
        for q_tuple in q_list:
            q_counter += 1
            prompt, corr, d1, d2, d3, trans, concept, analysis, trap, w1, p1, m1, w2, p2, m2 = q_tuple
            item = make_q(
                q_id=q_counter,
                subtopic=sub_title,
                dim=dim,
                hook=hook,
                prompt=prompt,
                corr=corr,
                d1=d1,
                d2=d2,
                d3=d3,
                trans=trans,
                concept=concept,
                analysis=analysis,
                trap=trap,
                w1=w1,
                p1=p1,
                m1=m1,
                w2=w2,
                p2=p2,
                m2=m2
            )
            items.append(item)
            
    assert len(items) == 250, f"Tier 1 expected 250 items, got {len(items)}"
    return items
