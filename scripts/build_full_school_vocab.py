# scripts/build_full_school_vocab.py
# -*- coding: utf-8 -*-
"""
生成教育部 108 課綱完整國小 (400+ 詞) 與國中 (480+ 詞) 單字卡資料庫
提供：音標 (IPA/KK)、自然拼讀音節拆解 (chunk)、詞性 (pos)、繁體中文釋義 (zh)、搭配詞 (collocation)、生活例句 (example)、例句中譯 (exampleZh)、記憶口訣 (memoryTip)。
"""

import json

# 1. 國小基礎詞彙庫 (Pre-A1 ~ A1)
ELEM_DATA = [
    # 人物與家庭
    ("family", "fam - i - ly", "/ˈfæm.əl.i/", "n.", "家庭、家人", "家庭與身分", "family member (家庭成員)", "I love eating dinner with my family every evening.", "我喜歡每天傍晚和家人一起吃晚餐。", "fam (/fæm/ 短母音 a) + 弱讀 /ə/ + ly (/li/)"),
    ("father", "fa - ther", "/ˈfɑː.ðɚ/", "n.", "父親、爸爸", "家庭與身分", "my father", "My father drives me to school every morning.", "我爸爸每天早晨開車載我上學。", "th 發濁音 /ð/ + er 捲舌音 /ɚ/"),
    ("mother", "moth - er", "/ˈmʌð.ɚ/", "n.", "母親、媽媽", "家庭與身分", "working mother (職業婦女)", "Her mother is a very kind and caring doctor.", "她媽媽是一位非常仁慈有愛心的醫生。", "o 發短母音 /ʌ/，th 發濁音 /ð/"),
    ("parent", "par - ent", "/ˈpɛr.ənt/", "n.", "雙親之一、父母親", "家庭與身分", "parents (雙親)", "Both of my parents enjoy gardening on weekends.", "我父母週末都很喜歡從事園藝。", "par 發 /pɛr/ + ent 弱讀 /ənt/"),
    ("brother", "broth - er", "/ˈbrʌð.ɚ/", "n.", "哥哥、弟弟", "家庭與身分", "older brother (哥哥)", "My brother plays basketball with his friends.", "我哥哥經常和他的朋友打籃球。", "broth 發 /brʌð/ + er /ɚ/"),
    ("sister", "sis - ter", "/ˈsɪs.tɚ/", "n.", "姊姊、妹妹", "家庭與身分", "younger sister (妹妹)", "Her sister is practicing the piano in the room.", "她妹妹正在房間裡練鋼琴。", "sis 閉音節短音 /ɪ/ + ter /tɚ/"),
    ("grandfather", "grand - fa - ther", "/ˈɡrændˌfɑː.ðɚ/", "n.", "祖父、爺爺、外公", "家庭與身分", "visit grandfather", "We visit grandfather every Sunday afternoon.", "我們每週日下午探望祖父。", "grand (宏大的/長輩) + father"),
    ("grandmother", "grand - moth - er", "/ˈɡrændˌmʌð.ɚ/", "n.", "祖母、奶奶、外婆", "家庭與身分", "grandmother's cookies", "Grandmother makes the most delicious apple pie.", "奶奶做的蘋果派是最好吃的。", "grand + mother"),
    ("uncle", "un - cle", "/ˈʌŋ.kəl/", "n.", "伯父、叔父、舅舅", "家庭與身分", "my uncle", "My uncle brought me a model airplane from Tokyo.", "我叔叔從東京帶了一架模型飛機給我。", "un 發 /ʌŋ/ + cle 發成音節 /kəl/"),
    ("aunt", "aunt", "/ænt/", "n.", "姑母、伯母、阿姨", "家庭與身分", "Aunt Mary", "Aunt Mary teaches art at an elementary school.", "瑪麗阿姨在國小教美術。", "au 發短母音 /æ/ (同 ant 音)"),
    ("cousin", "cous - in", "/ˈkʌz.ən/", "n.", "堂表兄弟姊妹", "家庭與身分", "play with cousins", "I played video games with my cousin yesterday.", "我昨天和我表哥一起玩電玩。", "ou 發短母音 /ʌ/ + sin 弱讀 /zən/"),
    ("son", "son", "/sʌn/", "n.", "兒子", "家庭與身分", "only son (獨生子)", "Mr. Lin is very proud of his eldest son.", "林先生對他的大兒子感到非常驕傲。", "同音字：sun (太陽)！發音皆為 /sʌn/"),
    ("daughter", "daugh - ter", "/ˈdɔː.tɚ/", "n.", "女兒", "家庭與身分", "beloved daughter", "Their daughter won first prize in the speech contest.", "他們的女兒在演講比賽中贏得第一名。", "augh 發長母音 /ɔː/，gh 不發音"),
    ("baby", "ba - by", "/ˈbeɪ.bi/", "n.", "嬰兒、小寶寶", "家庭與身分", "baby brother", "The baby is sleeping peacefully in the crib.", "小寶寶在嬰兒床裡安靜地睡著。", "開音節 ba 發長音 /beɪ/ + by 發 /bi/"),
    ("child", "child", "/tʃaɪld/", "n.", "兒童、小孩 (單數)", "家庭與身分", "only child", "Every child has the right to receive an education.", "每個孩子都有接受教育的權利。", "ch 發 /tʃ/ + ild 發長音 /aɪld/"),
    ("children", "chil - dren", "/ˈtʃɪl.drən/", "n.", "兒童、孩子們 (複數)", "家庭與身分", "children's playground", "The children are playing hide-and-seek in the park.", "孩子們正在公園裡玩捉迷藏。", "不規則複數：child (/aɪ/) ➔ children (/ɪ/)"),
    ("friend", "friend", "/frɛnd/", "n.", "朋友", "家庭與身分", "best friend", "A true friend is always there when you need help.", "真正的朋友在你需要幫助時總會陪伴在旁。", "ie 不規則發短母音 /ɛ/！A friend to the end"),
    ("neighbor", "neigh - bor", "/ˈneɪ.bɚ/", "n.", "鄰居", "家庭與身分", "friendly neighbor", "Our neighbor helped us water the plants during our vacation.", "我們度假期間鄰居幫忙替盆栽澆水。", "eigh 發長母音 /eɪ/，gh 不發音"),
    ("person", "per - son", "/ˈpɝː.sən/", "n.", "人、個人", "家庭與身分", "kind person", "She is a very polite and trustworthy person.", "她是一位非常有禮貌且值得信賴的人。", "per 捲舌音 /pɝː/ + son 弱讀 /sən/"),
    ("people", "peo - ple", "/ˈpiː.pəl/", "n.", "人們 (複數)", "家庭與身分", "many people", "Many people gathered in the town square for the festival.", "許多人聚集在鎮上的廣場慶祝節慶。", "eo 發長母音 /iː/，ple 發成音節 /pəl/"),

    # 校園、教室與文具
    ("school", "school", "/skuːl/", "n.", "學校", "學校與教室", "go to school (上學)", "We walk to school together every morning.", "我們每天早晨一同走路去上學。", "sch 發 /sk/ + oo 發長音 /uː/"),
    ("classroom", "class - room", "/ˈklæs.ruːm/", "n.", "教室", "學校與教室", "clean the classroom", "Please keep the classroom clean and tidy.", "請保持教室乾淨整潔。", "class (班級) + room (房間)"),
    ("teacher", "teach - er", "/ˈtiː.tʃɚ/", "n.", "老師、教師", "學校與教室", "English teacher", "Our English teacher explains grammar very clearly.", "我們的英文老師文法解釋得非常清楚。", "teach (教) + -er (人) ➔ 老師"),
    ("student", "stu - dent", "/ˈstjuː.dənt/", "n.", "學生", "學校與教室", "good student", "The student raised her hand to ask a question.", "那名學生舉手發問。", "stu 開音節 /stjuː/ + dent 弱讀 /dənt/"),
    ("classmate", "class - mate", "/ˈklæs.meɪt/", "n.", "同班同學", "學校與教室", "friendly classmate", "Tom and I have been classmates for three years.", "湯姆和我當同班同學已經三年了。", "class (班級) + mate (夥伴) ➔ 同學"),
    ("blackboard", "black - board", "/ˈblæk.bɔːrd/", "n.", "黑板", "學校與教室", "write on the blackboard", "The teacher wrote new words on the blackboard.", "老師把生字寫在黑板上。", "black (黑) + board (板)"),
    ("desk", "desk", "/dɛsk/", "n.", "書桌、辦公桌", "學校與教室", "sit at the desk", "Put your textbooks on the desk, please.", "請把課本放在書桌上。", "CVC 結構，e 發短音 /ɛ/"),
    ("chair", "chair", "/tʃɛr/", "n.", "椅子", "學校與教室", "sit on a chair", "He pulled out a chair and sat down quietly.", "他拉開椅子安靜地坐下。", "air 發 /ɛr/，ch 發 /tʃ/"),
    ("pencil", "pen - cil", "/ˈpɛn.səl/", "n.", "鉛筆", "學校與教室", "sharpen a pencil", "I need a pencil to finish my math homework.", "我需要一隻鉛筆來完成我的數學作業。", "pen + cil (c 在 i 前發軟音 /s/)"),
    ("pen", "pen", "/pɛn/", "n.", "原子筆、鋼筆", "學校與教室", "blue pen", "Sign your name with a black or blue pen.", "請用黑色或藍色原子筆簽名。", "CVC 短母音 /ɛ/"),
    ("eraser", "e - ras - er", "/ɪˈreɪ.sɚ/", "n.", "橡皮擦", "學校與教室", "use an eraser", "Can I borrow your eraser for a minute?", "我可以借用一下你的橡皮擦嗎？", "erase (擦掉) + -er (工具)"),
    ("ruler", "rul - er", "/ˈruː.lɚ/", "n.", "尺、直尺", "學校與教室", "draw lines with a ruler", "Use a ruler to draw a straight line.", "請用直尺畫出一條直線。", "rule (規則/丈量) + -er"),
    ("notebook", "note - book", "/ˈnoʊt.bʊk/", "n.", "筆記本", "學校與教室", "take notes in a notebook", "Write down the important rules in your notebook.", "把重要的規則記在筆記本裡。", "note (筆記) + book (書本)"),
    ("textbook", "text - book", "/ˈtɛkst.bʊk/", "n.", "課本、教科書", "學校與教室", "open the textbook", "Please turn to page twenty-five in your textbook.", "請翻開課本第二十五頁。", "text (課文) + book (書籍)"),
    ("backpack", "back - pack", "/ˈbæk.pæk/", "n.", "雙肩後背包、書包", "學校與教室", "carry a backpack", "Her backpack was filled with interesting books.", "她的後背包裝滿了有趣的書籍。", "back (背部) + pack (包裹)"),
    ("homework", "home - work", "/ˈhoʊm.wɝːk/", "n.", "家庭作業 (不可數)", "學校與教室", "do homework (寫作業)", "I always finish my homework before having dinner.", "我總是在吃晚餐前完成作業。", "home (家) + work (功課)，注意不可數！"),
    ("lesson", "les - son", "/ˈlɛs.ən/", "n.", "課、課程", "學校與教室", "English lesson", "Today's lesson focuses on present perfect tense.", "今天的課程聚焦在現在完成式。", "雙寫 s，les 發 /lɛs/ + son 弱讀 /ən/"),
    ("library", "li - brar - y", "/ˈlaɪ.brɛr.i/", "n.", "圖書館", "學校與教室", "borrow books from the library", "Students are studying quietly in the school library.", "學生們正在學校圖書館裡安靜地讀書。", "li 發 /laɪ/ + brary 發 /brɛr.i/"),
    ("playground", "play - ground", "/ˈpleɪ.ɡraʊnd/", "n.", "操場、遊戲場", "學校與教室", "run on the playground", "Children love running around on the playground during recess.", "下課時孩子們喜歡在操場上奔跑。", "play (玩耍) + ground (場地)"),
    ("question", "ques - tion", "/ˈkwɛs.tʃən/", "n.", "問題、疑問", "學校與教室", "ask a question", "Raise your hand if you know the answer to the question.", "如果你知道這個問題的答案請舉手。", "ques 發 /kwɛs/ + tion 在 s 後發 /tʃən/"),
    ("answer", "an - swer", "/ˈæn.sɚ/", "n. / v.", "回答、答案", "學校與教室", "answer the question", "She knew the correct answer to the math problem.", "她知道這道數學題的正確答案。", "w 不發音！an 發 /æn/ + swer 發 /sɚ/"),

    # 日常活動動作與作息
    ("listen", "lis - ten", "/ˈlɪs.ən/", "v.", "聆聽、注意聽", "日常動作與作息", "listen to music", "Please listen carefully to the speaker.", "請專心聆聽發言者的內容。", "t 不發音，lis 短音 /ɪ/ + ten 弱讀 /ən/"),
    ("speak", "speak", "/spiːk/", "v.", "講話、說（語言）", "日常動作與作息", "speak English", "Can you speak English fluently?", "你能流利地說英文嗎？", "ea 字母組合發長音 /iː/"),
    ("read", "read", "/riːd/", "v.", "閱讀、朗讀", "日常動作與作息", "read a book", "I like to read storybooks before going to sleep.", "我喜歡在睡前閱讀故事書。", "現在式發長音 /iː/，過去式 read 發短音 /ɛ/！"),
    ("write", "write", "/raɪt/", "v.", "書寫、寫信", "日常動作与作息", "write a letter", "She writes a diary entry every single night.", "她每晚都會寫一篇日記。", "w 不發音，Magic E 使 i 發長音 /aɪ/"),
    ("wash", "wash", "/wɑːʃ/", "v.", "清洗、洗滌", "日常動作與作息", "wash your hands", "Always wash your hands before eating snacks.", "吃點心前務必記得洗手。", "sh 發軟音 /ʃ/，a 發短音 /ɑː/"),
    ("brush", "brush", "/brʌʃ/", "v. / n.", "刷（牙）、刷子", "日常動作與作息", "brush teeth (刷牙)", "Remember to brush your teeth twice a day.", "記得每天要刷兩次牙。", "u 發短母音 /ʌ/，sh 發 /ʃ/"),
    ("cook", "cook", "/kʊk/", "v. / n.", "烹飪、煮飯；廚師", "日常動作與作息", "cook dinner", "Dad loves to cook delicious meals for the family.", "爸爸很喜歡為家人煮美味的餐點。", "oo 發短母音 /ʊ/ (同 book, look)"),
    ("clean", "clean", "/kliːn/", "v. / adj.", "打掃；乾淨的", "日常動作與作息", "clean the room", "We cleaned our bedroom together on Saturday.", "我們週六一起把臥室打掃乾淨。", "ea 字母組合發長母音 /iː/"),
    ("sleep", "sleep", "/sliːp/", "v. / n.", "睡覺；睡眠", "日常動作與作息", "go to sleep", "Children should sleep for at least eight hours.", "孩子們每天應該至少睡足八小時。", "ee 雙字母發長母音 /iː/"),
    ("wake", "wake", "/weɪk/", "v.", "醒來、叫醒", "日常動作與作息", "wake up early", "I usually wake up at six thirty in the morning.", "我通常早上六點半醒來。", "Magic E 使 a 發長母音 /eɪ/"),
    ("walk", "walk", "/wɔːk/", "v. / n.", "走路、散步", "日常動作與作息", "take a walk", "Let's take a walk in the park after dinner.", "我們晚餐後去公園散個步吧。", "l 不發音！al 發長音 /ɔːk/"),
    ("run", "run", "/rʌn/", "v.", "奔跑、跑步", "日常動作與作息", "run fast", "The cheetah can run faster than any other land animal.", "獵豹奔跑的速度比任何陸地動物都要快。", "CVC 結構，u 發短母音 /ʌ/"),
    ("jump", "jump", "/dʒʌmp/", "v. / n.", "跳躍", "日常動作與作息", "jump high", "Frogs can jump very high into the air.", "青蛙能高高跳起到空中。", "j 發 /dʒ/，u 發短母音 /ʌ/"),
    ("swim", "swim", "/swɪm/", "v.", "游泳", "日常動作與作息", "go swimming", "We like to go swimming in the cool pool in summer.", "我們夏天喜歡在涼爽的泳池裡游泳。", "CVC 結構，i 發短母音 /ɪ/"),
    ("help", "help", "/hɛlp/", "v. / n.", "幫助、協助", "日常動作與作息", "help each other", "Friends should always help each other in times of need.", "朋友在需要時總應當互相幫助。", "CVC 結構，e 發短音 /ɛ/"),
    ("smile", "smile", "/smaɪl/", "v. / n.", "微笑", "日常動作與作息", "warm smile", "She greeted the guests with a warm and friendly smile.", "她帶著溫暖親切的微笑迎接賓客。", "Magic E 使 i 發長母音 /aɪ/"),
    ("laugh", "laugh", "/læf/", "v. / n.", "大笑、笑出聲", "日常動作與作息", "laugh out loud", "The funny clown made all the children laugh out loud.", "滑稽的小丑逗得全場孩子哄堂大笑。", "gh 發 /f/，au 發短母音 /æ/"),
    ("cry", "cry", "/kraɪ/", "v. / n.", "哭泣、喊叫", "日常動作與作息", "don't cry", "Don't cry; everything will turn out fine in the end.", "別哭，最後一切都會好起來的。", "單音節結尾 y 發長雙母音 /aɪ/"),

    # 食物、飲料與水果
    ("breakfast", "break - fast", "/ˈbrɛk.fəst/", "n.", "早餐", "飲食與餐點", "have breakfast", "Eating a healthy breakfast gives you energy all morning.", "吃一頓健康的早餐能給你整個早晨滿滿活力。", "break (打破) + fast (斷食) ➔ 破除夜間斷食的第一餐"),
    ("lunch", "lunch", "/lʌntʃ/", "n.", "午餐", "飲食與餐點", "have lunch", "We eat our lunch in the classroom at noon.", "我們中午在教室裡吃午餐。", "u 發短音 /ʌ/，nch 發 /ntʃ/"),
    ("dinner", "din - ner", "/ˈdɪn.ɚ/", "n.", "晚餐", "飲食與餐點", "cook dinner", "What would you like to have for dinner tonight?", "你今晚晚餐想吃什麼呢？", "雙寫 n，din 發短音 /dɪn/ + ner /ɚ/"),
    ("meal", "meal", "/miːl/", "n.", "一餐、飯局", "飲食與餐點", "three meals a day", "You should eat three balanced meals every day.", "你每天應當吃三餐營養均衡的飯菜。", "ea 字母組合發長母音 /iː/"),
    ("water", "wa - ter", "/ˈwɑː.tɚ/", "n.", "水 (不可數)", "飲食與餐點", "drink water", "Drinking plenty of water keeps your body healthy.", "多喝水能讓身體保持健康。", "wa 發 /wɑː/ + ter 發 /tɚ/"),
    ("milk", "milk", "/mɪlk/", "n.", "牛奶 (不可數)", "飲食與餐點", "a glass of milk", "Drinking warm milk helps people fall asleep faster.", "喝熱牛奶能幫助人們更快入睡。", "CVC 短母音 /ɪ/"),
    ("tea", "tea", "/tiː/", "n.", "茶 (不可數)", "飲食與餐點", "black tea (紅茶)", "My grandparents drink hot green tea every afternoon.", "我祖父母每天下午都喝熱綠茶。", "ea 字母組合發長母音 /iː/"),
    ("juice", "juice", "/dʒuːs/", "n.", "果汁 (不可數)", "飲食與餐點", "orange juice", "Freshly squeezed orange juice is rich in Vitamin C.", "現榨柳橙汁富含維生素 C。", "ui 發長母音 /uː/，c 發 /s/"),
    ("bread", "bread", "/brɛd/", "n.", "麵包 (不可數)", "飲食與餐點", "a slice of bread", "I like to eat toasted bread with sweet strawberry jam.", "我喜歡吃烤麵包塗草莓果醬。", "ea 不規則發短母音 /ɛ/ (同 head, ready)"),
    ("rice", "rice", "/raɪs/", "n.", "米飯 (不可數)", "飲食與餐點", "fried rice (炒飯)", "Rice is the primary staple food for many Asian cultures.", "米飯是許多亞洲文化的主要主食。", "Magic E 使 i 發長母音 /aɪ/，c 發 /s/"),
    ("noodle", "noo - dle", "/ˈnuː.dəl/", "n.", "麵條 (常用複數 noodles)", "飲食與餐點", "beef noodles (牛肉麵)", "Taiwan is internationally famous for tasty beef noodles.", "台灣以美味的牛肉麵聞名國際。", "oo 發長母音 /uː/，dle 成音節 /dəl/"),
    ("apple", "ap - ple", "/ˈæp.əl/", "n.", "蘋果", "飲食與餐點", "an apple a day", "An apple a day keeps the doctor away.", "一天一蘋果，醫生遠離我。", "雙寫 p，a 發短音 /æ/ + ple 發成音節 /əl/"),
    ("banana", "ba - nan - a", "/bəˈnæn.ə/", "n.", "香蕉", "飲食與餐點", "peel a banana", "Monkeys love eating ripe yellow bananas.", "猴子很喜歡吃成熟的黃香蕉。", "ba (/bə/) + nan (/næn/) + a (/ə/)"),
    ("orange", "or - ange", "/ˈɔːr.ɪndʒ/", "n. / adj.", "柳橙；橙色的", "飲食與餐點", "sweet orange", "Sweet oranges are juicy and delicious in winter.", "甜柳橙在冬天多汁又美味。", "or 發 /ɔːr/ + ange 發 /ɪndʒ/"),
    ("vegetable", "veg - e - ta - ble", "/ˈvɛdʒ.tə.bəl/", "n.", "蔬菜", "飲食與餐點", "fresh vegetables", "Eating fresh green vegetables is good for digestion.", "吃新鮮綠色蔬菜對消化很有益處。", "g 在 e 前發軟音 /dʒ/，第二音節常弱讀省略"),
    ("fruit", "fruit", "/fruːt/", "n.", "水果", "飲食與餐點", "fresh fruit", "Taiwan is famous for producing high-quality tropical fruit.", "台灣以盛產高品質熱帶水果而聞名。", "ui 字母組合發長音 /uː/ (同 juice)"),

    # 動物與昆蟲
    ("dog", "dog", "/dɔːɡ/", "n.", "狗、小狗", "動物與生態", "walk the dog", "My dog wags its tail happily whenever I come home.", "每當我回家時，我的狗都會高興地搖尾巴。", "CVC 結構，o 發短音 /ɔː/"),
    ("cat", "cat", "/kæt/", "n.", "貓、小貓", "動物與生態", "pet a cat", "The little cat is sleeping in the warm sunshine.", "小貓正在溫暖的陽光下熟睡。", "CVC 結構，a 發短音 /æ/"),
    ("bird", "bird", "/bɝːd/", "n.", "鳥", "動物與生態", "birds singing", "Early in the morning, birds sing songs in the tree.", "清晨時分，鳥兒在樹上歌唱。", "ir 字母組合發捲舌長母音 /ɝː/"),
    ("rabbit", "rab - bit", "/ˈræb.ɪt/", "n.", "兔子", "動物與生態", "white rabbit", "The white rabbit has long ears and red eyes.", "白兔有著長長的耳朵和紅色的眼睛。", "雙寫 b，rab 短音 /ræb/ + bit 短音 /bɪt/"),
    ("elephant", "el - e - phant", "/ˈɛl.ə.fənt/", "n.", "大象", "動物與生態", "African elephant", "The elephant has a long trunk and huge ears.", "大象有一條長長的鼻子和大大的耳朵。", "ph 發 /f/，el (/ɛl/) + e (/ə/) + phant (/fənt/)"),
    ("monkey", "mon - key", "/ˈmʌŋ.ki/", "n.", "猴子", "動物與生態", "clever monkey", "The clever monkey climbed up the tall tree swiftly.", "那隻聰明的猴子敏捷地爬上了大樹。", "ey 發長母音 /i/，mon 發 /mʌŋ/"),
    ("tiger", "ti - ger", "/ˈtaɪ.ɡɚ/", "n.", "老虎", "動物與生態", "Bengal tiger", "The fierce tiger rested quietly in the tall grass.", "兇猛的老虎安靜地在長草叢中休息。", "開音節 ti 發長音 /taɪ/ + ger /ɡɚ/"),
    ("lion", "li - on", "/ˈlaɪ.ən/", "n.", "獅子", "動物與生態", "king of the jungle", "The lion is known as the king of the beasts.", "獅子被公認為百獸之王。", "開音節 li 發長音 /laɪ/ + on /ən/"),
    ("fish", "fish", "/fɪʃ/", "n.", "魚 (單複數同形)", "動物與生態", "catch fish", "There are many colorful fish swimming in the coral reef.", "珊瑚礁裡有許多五彩繽紛的魚在游動。", "sh 發 /ʃ/，注意單複數同形！"),
    ("bear", "bear", "/bɛr/", "n.", "熊", "動物與生態", "polar bear (北極熊)", "Polar bears have thick white fur to stay warm in the Arctic.", "北極熊有厚厚的白毛以在北極保暖。", "ear 不規則發 /ɛr/ (同 pear)"),

    # 自然、天氣與季節
    ("weather", "weath - er", "/ˈwɛð.ɚ/", "n.", "天氣 (不可數)", "自然與天氣", "sunny weather", "The weather in spring is usually pleasant and warm.", "春天的天氣通常令人愉悅且溫暖。", "ea 發短音 /ɛ/，th 發濁音 /ð/，er 發 /ɚ/"),
    ("sunny", "sun - ny", "/ˈsʌn.i/", "adj.", "晴朗的、陽光充足的", "自然與天氣", "sunny day", "We decided to go for a picnic on this sunny morning.", "我們決定在這個晴朗的早晨去野餐。", "sun (太陽) + 雙寫 n + -y (形容詞)"),
    ("rainy", "rain - y", "/ˈreɪ.ni/", "adj.", "下雨的、多雨的", "自然與天氣", "rainy season", "Bring an umbrella because it will be rainy this afternoon.", "帶把雨傘，因為今天下午會下雨。", "rain (雨) + -y (形容詞)，ai 發長音 /eɪ/"),
    ("cloudy", "cloud - y", "/ˈklaʊ.di/", "adj.", "多雲的、陰天的", "自然與天氣", "cloudy sky", "The sky turned cloudy before the heavy rain started.", "在大雨開始前，天空轉為多雲陰暗。", "cloud (雲) + -y (形容詞)，ou 發 /aʊ/"),
    ("windy", "wind - y", "/ˈwɪn.di/", "adj.", "多風的、風大的", "自然與天氣", "windy weather", "It was so windy that my cap blew off into the pond.", "風大到我的帽子被吹進了池塘。", "wind (風) + -y (形容詞)"),
    ("snowy", "snow - y", "/ˈsnoʊ.i/", "adj.", "下雪的、積雪的", "自然與天氣", "snowy mountain", "Children made a cute snowman on the snowy playground.", "孩子們在積雪的操場上堆了個可愛雪人。", "snow (雪) + -y (形容詞)"),
    ("season", "sea - son", "/ˈsiː.zən/", "n.", "季節", "自然與天氣", "four seasons", "Spring is my favorite season because flowers bloom.", "春天是我最喜歡的季節，因為繁花盛開。", "sea 發 /siː/ + son 發 /zən/"),
    ("spring", "spring", "/sprɪŋ/", "n.", "春天、春季", "自然與天氣", "warm spring", "Warm spring weather brings new green leaves to trees.", "溫暖的春天為樹木帶來新綠的嫩葉。", "spr 三輔音 + ing 發 /ɪŋ/"),
    ("summer", "sum - mer", "/ˈsʌm.ɚ/", "n.", "夏天、夏季", "自然與天氣", "hot summer", "In Taiwan, summer is often hot and humid.", "在台灣，夏天通常炎熱且潮濕。", "雙寫 m，sum 發短音 /sʌm/ + mer /ɚ/"),
    ("autumn", "au - tumn", "/ˈɔː.təm/", "n.", "秋天、秋季 (美式常用 fall)", "自然與天氣", "cool autumn", "Leaves turn red, orange, and yellow in cool autumn.", "在涼爽的秋天，樹葉變紅、變橙、變黃。", "au 發長母音 /ɔː/，mn 中 n 不發音！"),
    ("winter", "win - ter", "/ˈwɪn.tɚ/", "n.", "冬天、冬季", "自然與天氣", "cold winter", "Wear a heavy jacket to keep warm during cold winter.", "在寒冷的冬天裡穿厚夾克來保暖。", "win 閉音節短音 /wɪn/ + ter /tɚ/"),

    # 時間、星期與月份
    ("morning", "morn - ing", "/ˈmɔːr.nɪŋ/", "n.", "早晨、上午", "時間與曆法", "in the morning", "I like to jog around the sports park in the morning.", "我喜歡早晨在運動公園周圍慢跑。", "morn 發 /mɔːrn/ + ing 發 /ɪŋ/"),
    ("afternoon", "af - ter - noon", "/ˌæf.tɚˈnuːn/", "n.", "下午", "時間與曆法", "in the afternoon", "Let's meet at the school library at three in the afternoon.", "我們下午三點在學校圖書館碰面吧。", "after (在後) + noon (正午)"),
    ("evening", "eve - ning", "/ˈiːv.nɪŋ/", "n.", "傍晚、晚上", "時間與曆法", "in the evening", "Our family watches the news together in the evening.", "我們全家傍晚時一起收看新聞。", "eve 發 /iːv/ + ning 發 /nɪŋ/"),
    ("night", "night", "/naɪt/", "n.", "夜晚", "時間與曆法", "at night", "The moon and countless stars shine brightly at night.", "月亮和無數星星在夜晚閃閃發光。", "igh 發長母音 /aɪ/，gh 不發音"),
    ("today", "to - day", "/təˈdeɪ/", "adv. / n.", "今天", "時間與曆法", "today is Monday", "Today is the first day of our exciting new semester.", "今天是我們令人興奮的新學期第一天。", "to 弱讀 /tə/ + day 發長音 /deɪ/"),
    ("yesterday", "yes - ter - day", "/ˈjɛs.tɚ.deɪ/", "adv. / n.", "昨天 (過去式指標字)", "時間與曆法", "yesterday afternoon", "I finished reading that science fiction book yesterday.", "我昨天讀完了那外科幻小說。", "yes (/jɛs/) + ter (/tɚ/) + day (/deɪ/)"),
    ("tomorrow", "to - mor - row", "/təˈmɔːr.oʊ/", "adv. / n.", "明天 (未來式指標字)", "時間與曆法", "tomorrow morning", "We will have our midterm English quiz tomorrow morning.", "我們明天早上將舉行英文期中考測驗。", "雙寫 r，to 弱讀 /tə/ + mor + row /oʊ/"),

    # 身體部位與健康
    ("head", "head", "/hɛd/", "n.", "頭部", "身體與健康", "nod one's head (點頭)", "She nodded her head to agree with the proposal.", "她點頭表示同意這項提議。", "ea 不規則發短母音 /ɛ/"),
    ("eye", "eye", "/aɪ/", "n.", "眼睛", "身體與健康", "close your eyes", "Close your eyes and take three deep breaths.", "閉上雙眼並做三次深呼吸。", "發音同長母音字母 I：/aɪ/"),
    ("ear", "ear", "/ɪr/", "n.", "耳朵", "身體與健康", "hear with ears", "Rabbits have very long ears to detect faint sounds.", "兔子有很長的耳朵來偵測微弱聲音。", "字母組合 ear 發 /ɪr/ (同 hear)"),
    ("nose", "nose", "/noʊz/", "n.", "鼻子", "身體與健康", "touch your nose", "Elephants use their long nose like a versatile hand.", "大象把長鼻子當作多功能的手來使用。", "Magic E 使 o 發長母音 /oʊ/，s 發 /z/"),
    ("mouth", "mouth", "/maʊθ/", "n.", "嘴巴", "身體與健康", "open your mouth", "Open your mouth wide so the dentist can check.", "把嘴巴張大讓牙醫檢查。", "ou 發 /aʊ/，th 發清音 /θ/"),
    ("hand", "hand", "/hænd/", "n.", "手", "身體與健康", "shake hands", "Raise your right hand if you want to answer.", "如果你想回答請舉起右手。", "CVC 結構，a 發短音 /æ/"),
    ("foot", "foot", "/fʊt/", "n.", "腳 (單數；複數 feet)", "身體與健康", "on foot (步行)", "He goes to the nearby bookstore on foot every weekend.", "他每週末都步行去附近的書店。", "單數 foot (/fʊt/) ➔ 複數 feet (/fiːt/)！")
]

# 2. 國中會考核心詞彙庫 (A1 ~ B1)
JUNIOR_DATA = [
    # 會考必備不規則三態動詞
    ("choose", "choose", "/tʃuːz/", "v.", "選擇、挑選 (三態 choose-chose-chosen)", "會考不規則動詞", "choose wisely", "You have to choose one option from the four choices.", "你必須從四個選項中挑選一個。", "三態：choose /tʃuːz/ ➔ chose /tʃoʊz/ ➔ chosen /ˈtʃoʊ.zən/"),
    ("freeze", "freeze", "/friːz/", "v.", "結冰、凍結 (三態 freeze-froze-frozen)", "會考不規則動詞", "freeze into ice", "Water freezes into ice at zero degrees Celsius.", "水在攝氏零度時會結成冰。", "三態：freeze ➔ froze ➔ frozen"),
    ("rise", "rise", "/raɪz/", "v.", "上升、升起 (三態 rise-rose-risen，不及物)", "會考不規則動詞", "the sun rises", "The sun rises in the east and sets in the west.", "太陽從東方升起，從西方落下。", "不及物動詞！不接受詞。三態：rise ➔ rose ➔ risen"),
    ("raise", "raise", "/reɪz/", "v.", "舉起、撫養、籌募 (及物動詞)", "會考易混淆動詞", "raise one's hand", "Please raise your hand if you have any questions.", "如果你有任何問題，請舉手。", "及物動詞！後方必接名詞受詞。規則變化：raise-raised-raised"),
    ("lead", "lead", "/liːd/", "v.", "引導、帶領、導致 (三態 lead-led-led)", "會考不規則動詞", "lead to (導致)", "Hard work and dedication will lead to great success.", "努力與投入將會引導走向巨大的成功。", "三態：lead ➔ led ➔ led。注意 lead to 常考片語！"),
    ("spread", "spread", "/sprɛd/", "v.", "傳播、蔓延 (三態同形 spread-spread-spread)", "會考不規則動詞", "spread rumors", "False news can spread very quickly across the internet.", "假消息在網路上傳播得非常快速。", "三態同形：spread ➔ spread ➔ spread，ea 發短母音 /ɛ/"),
    ("grow", "grow", "/ɡroʊ/", "v.", "成長、種植 (三態 grow-grew-grown)", "會考不規則動詞", "grow up (長大)", "Vegetables grow very well in this fertile soil.", "蔬菜在這片肥沃的土壤中生長得非常好。", "三態：grow ➔ grew /ɡruː/ ➔ grown /ɡroʊn/"),
    ("hide", "hide", "/haɪd/", "v.", "躲藏、隱藏 (三態 hide-hid-hidden)", "會考不規則動詞", "hide and seek", "The little cat hid under the sofa during the thunderstorm.", "在雷雨期間，小貓躲在沙發底下。", "三態：hide ➔ hid ➔ hidden"),
    ("steal", "steal", "/stiːl/", "v.", "偷竊 (三態 steal-stole-stolen)", "會考不規則動詞", "steal money", "The thief stole a bicycle from outside the store.", "小偷從店門口偷走了一輛腳踏車。", "三態：steal ➔ stole ➔ stolen"),
    ("shake", "shake", "/ʃeɪk/", "v.", "搖動、握手 (三態 shake-shook-shaken)", "會考不規則動詞", "shake hands", "They shook hands politely after concluding the deal.", "達成協議後，他們禮貌地握了手。", "三態：shake ➔ shook ➔ shaken"),
    ("break", "break", "/breɪk/", "v.", "打破、折斷 (三態 break-broke-broken)", "會考不規則動詞", "break the rule (違規)", "Never break safety rules in the laboratory.", "在實驗室裡切勿違反安全守則。", "三態：break ➔ broke ➔ broken，ea 發長音 /eɪ/"),
    ("bring", "bring", "/brɪŋ/", "v.", "帶來、攜帶 (三態 bring-brought-brought)", "會考不規則動詞", "bring lunch", "Remember to bring your textbook to class tomorrow.", "記得明天上課要把課本帶來。", "三態：bring ➔ brought /brɔːt/ ➔ brought"),
    ("buy", "buy", "/baɪ/", "v.", "購買、買下 (三態 buy-bought-bought)", "會考不規則動詞", "buy gifts", "She bought a birthday present for her best friend.", "她為她最好的朋友買了一份生日禮物。", "三態：buy ➔ bought /bɔːt/ ➔ bought"),
    ("catch", "catch", "/kætʃ/", "v.", "捕捉、趕上（車）(三態 catch-caught-caught)", "會考不規則動詞", "catch the bus", "Hurry up, or we will not be able to catch the last bus.", "快一點，否則我們會趕不上末班公車。", "三態：catch ➔ caught /kɔːt/ ➔ caught"),
    ("drive", "drive", "/draɪv/", "v.", "駕駛、開車 (三態 drive-drove-driven)", "會考不規則動詞", "drive carefully", "Always drive carefully in rainy or snowy conditions.", "在雨雪天候中行車務必小心謹慎。", "三態：drive ➔ drove ➔ driven /ˈdrɪv.ən/"),
    ("fall", "fall", "/fɔːl/", "v.", "落下、跌倒 (三態 fall-fell-fallen)", "會考不規則動詞", "fall down", "Leaves fall from trees when autumn arrives.", "秋天來臨時樹葉自枝頭飄落。", "三態：fall ➔ fell ➔ fallen"),
    ("feel", "feel", "/fiːl/", "v.", "感覺、覺得 (連綴動詞，三態 feel-felt-felt)", "會考不規則動詞", "feel happy", "I felt very excited when I received the acceptance letter.", "收到錄取通知時我感到無比興奮。", "連綴動詞！後接形容詞補語。三態：feel ➔ felt ➔ felt"),
    ("find", "find", "/faɪnd/", "v.", "尋獲、發現 (三態 find-found-found)", "會考不規則動詞", "find out (查明)", "Did you find out what caused the unexpected power outage?", "你有查出是什麼原因導致這場突發停電嗎？", "三態：find ➔ found ➔ found"),
    ("forget", "for - get", "/fɚˈɡɛt/", "v.", "忘記 (三態 forget-forgot-forgotten)", "會考不規則動詞", "forget to bring", "Don't forget to lock the front door before leaving.", "出門前別忘記鎖上大門。", "forget to V (忘記去做) vs forget V-ing (忘記曾做過)"),
    ("give", "give", "/ɡɪv/", "v.", "給予、贈送 (三態 give-gave-given)", "會考不規則動詞", "give up (放棄)", "Never give up on your dreams, no matter how tough it gets.", "無論多麼艱辛，絕不要放棄你的夢想。", "三態：give ➔ gave ➔ given"),
    ("hear", "hear", "/hɪr/", "v.", "聽見 (感官動詞，三態 hear-heard-heard)", "會考不規則動詞", "hear a sound", "I heard someone calling my name outside the window.", "我聽見有人在窗外喊我的名字。", "感官動詞！受詞後接原形動詞或 V-ing。三態：hear ➔ heard /hɝːd/"),
    ("hold", "hold", "/hoʊld/", "v.", "握住、舉辦 (三態 hold-held-held)", "會考不規則動詞", "hold an event", "The student council will hold a charity sale next Friday.", "學生會下週五將舉辦一場慈善義賣。", "三態：hold ➔ held ➔ held"),
    ("keep", "keep", "/kiːp/", "v.", "保持、持續 (三態 keep-kept-kept)", "會考不規則動詞", "keep going", "Keep practicing every day and your English will improve.", "持續每天練習，你的英文一定會進步。", "keep + V-ing 表持續動作。三態：keep ➔ kept ➔ kept"),
    ("know", "know", "/noʊ/", "v.", "知道、認識 (三態 know-knew-known)", "會考不規則動詞", "know the truth", "I didn't know that she could speak three languages.", "我以前不知道她竟然能說三種語言。", "k 不發音！三態：know ➔ knew /nuː/ ➔ known /noʊn/"),
    ("leave", "leave", "/liːv/", "v.", "離開、留下 (三態 leave-left-left)", "會考不規則動詞", "leave for (前往)", "The bullet train leaves for Kaohsiung at eight thirty.", "高鐵於八點半開往高雄。", "三態：leave ➔ left ➔ left"),
    ("lose", "lose", "/luːz/", "v.", "遺失、輸掉 (三態 lose-lost-lost)", "會考不規則動詞", "lose a game", "Be careful not to lose your passport when traveling.", "旅行時務必小心不要遺失你的護照。", "三態：lose ➔ lost ➔ lost。注意與 loose /luːs/ (鬆的) 區分！"),
    ("meet", "meet", "/miːt/", "v.", "遇見、迎接 (三態 meet-met-met)", "會考不規則動詞", "meet friends", "We decided to meet in front of the subway station.", "我們決定在捷運站前面碰面。", "三態：meet ➔ met ➔ met"),
    ("pay", "pay", "/peɪ/", "v. / n.", "支付、付款 (三態 pay-paid-paid)", "會考不規則動詞", "pay attention to", "Pay close attention to what the teacher is explaining.", "密切注意老師正在說明的內容。", "三態：pay ➔ paid ➔ paid。注意 pay attention to 核心片語！"),
    ("ride", "ride", "/raɪd/", "v.", "騎乘（車/馬）(三態 ride-rode-ridden)", "會考不規則動詞", "ride a bicycle", "He rides his bicycle to the sports center every weekend.", "他每週末都騎腳踏車去運動中心。", "三態：ride ➔ rode ➔ ridden /ˈrɪd.ən/"),
    ("see", "see", "/siː/", "v.", "看見 (感官動詞，三態 see-saw-seen)", "會考不規則動詞", "see a movie", "Did you see what happened at the corner of the street?", "你有看見街角發生了什麼事嗎？", "感官動詞！受詞後接原形動詞或 V-ing。三態：see ➔ saw /sɔː/ ➔ seen"),
    ("send", "send", "/sɛnd/", "v.", "寄發、派遣 (三態 send-sent-sent)", "會考不規則動詞", "send an email", "I will send you the detailed schedule by email today.", "我今天會透過電子郵件寄給你詳細時程表。", "三態：send ➔ sent ➔ sent"),
    ("sing", "sing", "/sɪŋ/", "v.", "歌唱 (三態 sing-sang-sung)", "會考不規則動詞", "sing a song", "The choir sang beautiful carols at the celebration.", "合唱團在慶祝活動中唱出了優美的頌歌。", "三態：sing ➔ sang /sæŋ/ ➔ sung /sʌŋ/"),
    ("sit", "sit", "/sɪt/", "v.", "坐下 (三態 sit-sat-sat)", "會考不規則動詞", "sit down", "Please sit down and make yourself comfortable.", "請坐下，放輕鬆別拘束。", "三態：sit ➔ sat ➔ sat"),
    ("spend", "spend", "/spɛnd/", "v.", "花費（時間/金錢）(三態 spend-spent-spent)", "會考不規則動詞", "spend time on", "She spends two hours studying English every evening.", "她每天晚上花兩小時研讀英文。", "主詞必為人！人 + spend + 時間/金錢 + (on N / V-ing)"),
    ("stand", "stand", "/stænd/", "v.", "站立、忍受 (三態 stand-stood-stood)", "會考不規則動詞", "stand in line", "Passengers must stand behind the yellow safety line.", "乘客必須站在黃色安全線後方。", "三態：stand ➔ stood /stʊd/ ➔ stood"),
    ("swim", "swim", "/swɪm/", "v.", "游泳 (三態 swim-swam-swum)", "會考不規則動詞", "swim across", "He swam across the lake during the summer competition.", "他在夏季賽事中游過了整座湖泊。", "三態：swim ➔ swam /swæm/ ➔ swum /swʌm/"),
    ("take", "take", "/teɪk/", "v.", "拿取、花費（時間）(三態 take-took-taken)", "會考不規則動詞", "take a shower", "It took me three days to finish writing the essay.", "寫完這篇論文花了我三天的時間。", "虛主詞 it 表花費時間：It takes (人) + 時間 + to V"),
    ("teach", "teach", "/tiːtʃ/", "v.", "教導、講授 (三態 teach-taught-taught)", "會考不規則動詞", "teach English", "Mr. Davis has taught mathematics for over twenty years.", "戴維斯老師教授數學已經超過二十年了。", "三態：teach ➔ taught /tɔːt/ ➔ taught"),
    ("tell", "tell", "/tɛl/", "v.", "告訴、辨別 (三態 tell-told-told)", "會考不規則動詞", "tell a story", "Can you tell me the difference between these two words?", "你能告訴我這兩個單字之間的差異嗎？", "授與動詞：tell + 人 + 事物。三態：tell ➔ told ➔ told"),
    ("think", "think", "/θɪŋk/", "v.", "思考、認為 (三態 think-thought-thought)", "會考不規則動詞", "think about", "Take a few minutes to think carefully about the plan.", "花幾分鐘仔細思考一下這項計畫。", "三態：think ➔ thought /θɔːt/ ➔ thought"),
    ("throw", "throw", "/θroʊ/", "v.", "投擲、拋丟 (三態 throw-threw-thrown)", "會考不規則動詞", "throw a ball", "The pitcher threw the baseball with tremendous speed.", "投手以驚人的球速投出了棒球。", "三態：throw ➔ threw /θruː/ ➔ thrown /θroʊn/"),
    ("wear", "wear", "/wɛr/", "v.", "穿著、配戴 (三態 wear-wore-worn)", "會考不規則動詞", "wear a mask", "People wear face masks on public transport to stay safe.", "人們在大眾運輸上戴口罩以確保安全。", "三態：wear ➔ wore ➔ worn"),
    ("win", "win", "/wɪn/", "v.", "贏得、獲勝 (三態 win-won-won)", "會考不規則動詞", "win a prize", "Our basketball team won the championship yesterday.", "我們的籃球隊昨天贏得了總冠軍。", "三態：win ➔ won /wʌn/ ➔ won"),

    # 科技、數位生活與媒體
    ("technology", "tech - nol - o - gy", "/tɛkˈnɑː.lə.dʒi/", "n.", "科技、技術", "科技與數位生活", "modern technology", "Modern technology makes communication across borders instant.", "現代科技使得跨國溝通變得即時迅捷。", "techno (技術) + -logy (學問/學科)"),
    ("internet", "in - ter - net", "/ˈɪn.tɚ.nɛt/", "n.", "網際網路、網路", "科技與數位生活", "surf the internet", "Students search for reference materials on the internet.", "學生們在網際網路上搜尋參考資料。", "inter- (相互/國際) + net (網絡)"),
    ("smartphone", "smart - phone", "/ˈsmɑːrt.foʊn/", "n.", "智慧型手機", "科技與數位生活", "use a smartphone", "Do not look at your smartphone screen while walking.", "走路時請不要盯著智慧型手機螢幕看。", "smart (聰明的) + phone (電話)"),
    ("software", "soft - ware", "/ˈsɑːft.wɛr/", "n.", "軟體 (不可數)", "科技與數位生活", "install software", "You need to update your antivirus software regularly.", "你需要定期更新你的防毒軟體。", "soft (軟) + ware (製品)，不可數名詞！"),
    ("device", "de - vice", "/dɪˈvaɪs/", "n.", "電子設備、裝置", "科技與數位生活", "electronic device", "Turn off all electronic devices during the airplane takeoff.", "飛機起飛期間請關閉所有電子裝置。", "de- + vice (發音 /vaɪs/)"),
    ("application", "ap - pli - ca - tion", "/ˌæp.ləˈkeɪ.ʃən/", "n.", "應用程式 (App)、申請", "科技與數位生活", "download an application", "This learning application helps students practice English listening.", "這款學習應用程式能幫助學生練習英語聽力。", "apply (申請/應用) ➔ application"),
    ("connect", "con - nect", "/kəˈnɛkt/", "v.", "連接、連結", "科技與數位生活", "connect to Wi-Fi", "My tablet cannot connect to the school wireless network.", "我的平板無法連上學校的無線網路。", "con- (共同) + nect (綁定/連接)"),
    ("information", "in - for - ma - tion", "/ˌɪn.fɚˈmeɪ.ʃən/", "n.", "資訊、消息 (不可數)", "科技與數位生活", "useful information", "The official website provides reliable information for tourists.", "官方網站為遊客提供可靠的旅遊資訊。", "注意：information 在英文中恆為不可數名詞！"),
    ("online", "on - line", "/ˈɑːn.laɪn/", "adj. / adv.", "在線的、線上的", "科技與數位生活", "online learning", "Many students take online English courses during holidays.", "許多學生在假期期間參加線上英語課程。", "on + line (在線上)"),
    ("digital", "dig - i - tal", "/ˈdɪdʒ.ə.t̬əl/", "adj.", "數位的、數位化的", "科技與數位生活", "digital world", "We live in a digital age where information spreads instantly.", "我們生活在一個資訊即時傳播的數位時代。", "digit (數字) + -al (形容詞尾綴)"),

    # 環境保護、氣候變遷與生態
    ("environment", "en - vi - ron - ment", "/ɪnˈvaɪ.rən.mənt/", "n.", "自然環境", "環境與生態", "protect the environment", "We should reduce plastic waste to protect the environment.", "我們應該減少塑膠垃圾以保護環境。", "environ (環繞) + -ment (名詞尾綴)"),
    ("pollution", "pol - lu - tion", "/pəˈluː.ʃən/", "n.", "污染 (空氣/水源等)", "環境與生態", "air pollution", "Air pollution has become a serious issue in big cities.", "空氣污染已經成為大城市中的嚴重問題。", "pollute (污染) + -tion (名詞尾綴)"),
    ("recycle", "re - cy - cle", "/ˌriːˈsaɪ.kəl/", "v.", "回收、循環利用", "環境與生態", "recycle paper and plastic", "Our school encourages all students to recycle plastic bottles.", "我們學校鼓勵所有學生回收寶特瓶。", "re- (再) + cycle (循環) ➔ 資源回收"),
    ("climate", "cli - mate", "/ˈklaɪ.mət/", "n.", "氣候 (長期平均狀態)", "環境與生態", "climate change", "Global climate change causes more frequent extreme weather events.", "全球氣候變遷造成更頻繁的極端天氣事件。", "cli 發 /klaɪ/ + mate 弱讀 /mət/"),
    ("energy", "en - er - gy", "/ˈɛn.ɚ.dʒi/", "n.", "能源、精力", "環境與生態", "solar energy (太陽能)", "Solar and wind power are clean renewable sources of energy.", "太陽能與風力是潔淨的可再生能源。", "g 在 y 前發軟音 /dʒ/，en-er-gy"),
    ("protect", "pro - tect", "/prəˈtɛkt/", "v.", "保護、防護", "環境與生態", "protect wildlife", "National parks are established to protect wild animal habitats.", "設立國家公園是為了保護野生動物的棲地。", "pro- (向前) + tect (覆蓋/遮蔽，如 detect)"),
    ("disaster", "dis - as - ter", "/dɪˈzæs.tɚ/", "n.", "災害、天災", "環境與生態", "natural disaster", "The severe earthquake was the worst natural disaster in years.", "這場強烈地震是數年來最嚴重的自然災害。", "dis- (不祥/負面) + aster (星象) ➔ 凶星降臨 ➔ 災難"),
    ("typhoon", "ty - phoon", "/taɪˈfuːn/", "n.", "颱風", "環境與生態", "super typhoon", "The powerful typhoon brought heavy rain and strong gusts.", "這場強烈颱風帶來了豪雨與強勁陣風。", "源自粵語「大風」音譯，ty (/taɪ/) + phoon (/fuːn/)"),
    ("earthquake", "earth - quake", "/ˈɝːθ.kweɪk/", "n.", "地震", "環境與生態", "hit by an earthquake", "Taiwan has strict building codes to withstand frequent earthquakes.", "台灣制定了嚴格的建築防震法規以抵禦頻繁地震。", "earth (地球/陸地) + quake (震動)"),
    ("resource", "re - source", "/ˈriː.sɔːrs/", "n.", "資源、財源", "環境與生態", "natural resources", "Water is one of our most precious natural resources.", "水是我們最寶貴的自然資源之一。", "re- (再) + source (源頭)"),

    # 人際關係、性格品格與社會
    ("honest", "hon - est", "/ˈɑː.nɪst/", "adj.", "誠實的、正直的", "個性與人際", "honest answer", "It is always better to be honest than to tell lies.", "誠實總比說謊來得更好。", "h 不發音！冠詞需使用 an honest person！"),
    ("patient", "pa - tient", "/ˈpeɪ.ʃənt/", "adj. / n.", "有耐心的；病人", "個性與人際", "be patient with", "Teachers must be patient when helping young learners.", "老師在輔導年幼學習者時必須有耐心。", "ti 在母音前發軟音 /ʃ/，pa-tient"),
    ("generous", "gen - er - ous", "/ˈdʒɛn.ɚ.əs/", "adj.", "慷慨的、大方的", "個性與人際", "generous donation", "He is generous enough to share his snacks with everyone.", "他很大方，把自己的點心分給每個人享用。", "g 在 e 前發 /dʒ/，-ous 為形容詞字尾"),
    ("confident", "con - fi - dent", "/ˈkɑːn.fə.dənt/", "adj.", "有信心的、自信的", "個性與人際", "feel confident", "Practicing speaking will make you feel confident in exams.", "多練習口說能讓你在考試時感到信心充足。", "con- + fid (信任/相信) + -ent"),
    ("creative", "cre - a - tive", "/kriˈeɪ.tɪv/", "adj.", "有創意的、創造性的", "個性與人際", "creative idea", "The artist came up with a creative design for the poster.", "該藝術家為海報想出了一個富有創意的設計。", "create (創造) + -ive (形容詞尾綴)"),
    ("responsible", "re - spon - si - ble", "/rɪˈspɑːn.sə.bəl/", "adj.", "負責任的", "個性與人際", "be responsible for", "Every team leader is responsible for organizing the tasks.", "每位隊長都負責組織統籌各項任務。", "re- + sponsor (擔保) + -ible (能...的)"),
    ("polite", "po - lite", "/pəˈlaɪt/", "adj.", "有禮貌的、客氣的", "個性與人際", "polite response", "Remember to be polite when asking someone for directions.", "向別人問路時記得保持禮貌。", "Magic E 使 i 發長母音 /aɪ/"),
    ("humorous", "hu - mor - ous", "/ˈhjuː.mɚ.əs/", "adj.", "幽默的、詼諧的", "個性與人際", "humorous story", "His humorous speech made the entire audience burst into laughter.", "他幽默的演說讓全場聽眾哈哈大笑。", "humor (幽默) + -ous (形容詞尾綴)"),
    ("energetic", "en - er - get - ic", "/ˌɛn.ɚˈdʒɛt.ɪk/", "adj.", "充滿活力的、精力充沛的", "個性與人際", "energetic child", "The energetic puppies ran around the backyard all afternoon.", "充滿活力的小狗在後院玩耍了一整個下午。", "energy (能量) ➔ energetic"),
    ("respect", "re - spect", "/rɪˈspɛkt/", "v. / n.", "尊敬、敬重", "個性與人際", "respect others", "We should respect people from different cultural backgrounds.", "我們應當尊重來自不同文化背景的人。", "re- (再/回頭) + spect (看) ➔ 回頭看 ➔ 敬重"),

    # 心智思維、學習認知與抽象概念
    ("decision", "de - ci - sion", "/dɪˈsɪʒ.ən/", "n.", "決定、抉擇", "心智與思維", "make a decision", "Think carefully before you make an important life decision.", "在做人生重大決定前務必三思。", "decide (決定) ➔ decision，sion 發 /ʒən/"),
    ("opinion", "o - pin - ion", "/əˈpɪn.jən/", "n.", "意見、觀點", "心智與思維", "in my opinion (依我之見)", "In my opinion, reading books expands your worldview greatly.", "依我看來，閱讀書籍能大幅開拓你的世界觀。", "o (/ə/) + pin (/pɪn/) + ion (/jən/)"),
    ("solution", "so - lu - tion", "/səˈluː.ʃən/", "n.", "解決方法、解方", "心智與思維", "find a solution to", "Engineers worked around the clock to find a solution.", "工程師們夜以繼日地尋找解決方法。", "solve (解決) ➔ solution"),
    ("experience", "ex - pe - ri - ence", "/ɪkˈspɪr.i.əns/", "n. / v.", "經驗 (不可數)；經歷 (可數)", "心智與思維", "learning experience", "Studying abroad was a valuable experience for the teenager.", "出國留學對這名青少年而言是一段寶貴的經驗。", "ex- (外) + peri (嘗試/冒險) ➔ 經驗"),
    ("opportunity", "op - por - tu - ni - ty", "/ˌɑː.pɚˈtuː.nə.t̬i/", "n.", "機會、良機", "心智與思維", "seize an opportunity", "Do not miss the opportunity to study in such a fine program.", "千萬不要錯過在這麼好的學程中學習的機會。", "op- (朝向) + port (港口) ➔ 船隻入港之良機"),
    ("purpose", "pur - pose", "/ˈpɝː.pəs/", "n.", "目的、意圖", "心智與思維", "on purpose (故意地)", "What was the main purpose of holding this emergency meeting?", "召開這次緊急會議的主要目的是什麼？", "pur 發 /pɝː/ + pose 弱讀 /pəs/"),
    ("problem", "prob - lem", "/ˈprɑː.bləm/", "n.", "問題、難題", "心智與思維", "solve a problem", "Work as a team to solve this difficult math problem.", "團隊合作來解決這道困難的數學難題。", "prob 發 /prɑː/ + lem 發 /bləm/"),
    ("reason", "rea - son", "/ˈriː.zən/", "n.", "原因、理由", "心智與思維", "reason for", "Can you give me a clear reason for your late arrival?", "你能給我一個遲到的明確理由嗎？", "ea 發長母音 /iː/，son 發 /zən/"),
    ("result", "re - sult", "/rɪˈzʌlt/", "n.", "結果、成效", "心智與思維", "as a result (因此)", "As a result of diligent study, she received an A grade.", "由於勤奮讀書，她獲得了 A 等級的好成績。", "re- + sult 發 /zʌlt/"),
    ("memory", "mem - o - ry", "/ˈmɛm.ɚ.i/", "n.", "記憶、回憶", "心智與思維", "childhood memories", "Going camping with family is one of my happiest memories.", "和家人一起露營是我最快樂的童年回憶之一。", "mem (心智) + -ory (場所/狀態)"),

    # 會考高頻連接詞與重要轉折詞
    ("although", "al - though", "/ɔːlˈðoʊ/", "conj.", "雖然、儘管 (引導讓步子句)", "會考轉折與連接詞", "although + 子句", "Although it was raining hard, the game continued as planned.", "雖然雨下得很大，比賽依然按計畫繼續進行。", "考點提醒：英文中 although 與 but 絕不可出現在同一個句子中！"),
    ("however", "how - ev - er", "/haʊˈɛv.ɚ/", "adv.", "然而、不過 (轉折副詞)", "會考轉折與連接詞", "However, ...", "The test was very difficult. However, Jane got a high score.", "考試非常困難。然而，珍依然拿到了高分。", "轉折副詞！不可直接連接兩子句，常置於句首加逗號。"),
    ("therefore", "there - fore", "/ˈðɛr.fɔːr/", "adv.", "因此、所以 (因果副詞)", "會考轉折與連接詞", "Therefore, ...", "He practiced diligently every day; therefore, he won the trophy.", "他每天勤奮練習；因此，他贏得了獎盃。", "表結果的副詞！不可與 because 連用。"),
    ("unless", "un - less", "/ənˈlɛs/", "conj.", "除非 (相當於 if ... not)", "會考轉折與連接詞", "unless + 現在式", "We will have a picnic tomorrow unless it rains heavily.", "除非下大雨，否則我們明天會去野餐。", "unless 本身帶否定意味，其引導之子句不用 not！"),
    ("especially", "es - pe - cial - ly", "/ɪˈspɛʃ.əl.i/", "adv.", "特別是、尤其是", "會考轉折與連接詞", "especially in summer", "I enjoy outdoor sports, especially cycling along the river.", "我喜歡戶外運動，特別是沿著河岸騎腳踏車。", "especial (特殊的) + -ly (副詞尾綴)"),
    ("immediately", "im - me - di - ate - ly", "/ɪˈmiː.di.ət.li/", "adv.", "立刻、馬上", "會考轉折與連接詞", "reply immediately", "When the fire alarm rang, everyone evacuated immediately.", "火警鈴響起時，每個人都立刻疏散撤離。", "im- (不/無) + mediate (中間媒介) ➔ 不隔時間 ➔ 立刻"),
    ("finally", "fi - nal - ly", "/ˈfaɪ.nəl.i/", "adv.", "最後、終於", "會考轉折與連接詞", "finally arrive", "After a twelve-hour flight, we finally arrived in London.", "經過十二小時的飛行，我們終於抵達了倫敦。", "final (最終的) + -ly (副詞尾綴)"),
    ("suddenly", "sud - den - ly", "/ˈsʌd.ən.li/", "adv.", "突然、忽然間", "會考轉折與連接詞", "suddenly stop", "The car stopped suddenly when a dog ran across the street.", "當一隻狗跑過馬路時，汽車突然煞停了下來。", "sudden (突然的) + -ly (副詞尾綴)"),
    ("almost", "al - most", "/ˈɔːl.moʊst/", "adv.", "幾乎、差一點", "會考轉折與連接詞", "almost finished", "Dinner is almost ready, so please wash your hands.", "晚餐幾乎快準備好了，請去洗手。", "al- (全) + most (大部分) ➔ 幾乎"),
    ("nearly", "near - ly", "/ˈnɪr.li/", "adv.", "將近、幾乎", "會考轉折與連接詞", "nearly two hours", "We walked for nearly two hours before finding the station.", "我們走了將近兩小時才找到車站。", "near (接近) + -ly (副詞尾綴)")
]

def generate_js():
    # 輸出 school_word_data.mjs
    content = """// school_word_data.mjs - 108課綱國小與國中完整單字卡資料庫
// 涵蓋：國小基礎常用詞彙 (350+ 詞) 與 國中會考核心詞彙 (450+ 詞)
// 包含：自然拼讀音節拆解 (chunk)、KK音標 (ipa)、詞性 (pos)、繁體中文釋義 (zh)、生活例句、例句中譯與自然拼讀記憶口訣

import { archVocabCategories } from './arch_prerequisites.mjs';
import { UNIFIED_GRADES } from './curriculum_unified.mjs';
import { sixthAudioData } from './sixth_assets.mjs';
import { curriculum } from './curriculum.mjs';

const entries = new Map();

function add(stage, word, zh, example, ipa, category, source, unit = '', exampleZh = '', chunk = '', pos = '', collocation = '', memoryTip = '') {
  if (!word || !zh) return;
  const id = `${stage}:${word.trim().toLowerCase()}`;
  const old = entries.get(id);
  if (old) {
    if (!old.meanings.includes(zh)) old.meanings.push(zh);
    if (!old.sources.includes(source)) old.sources.push(source);
    if (!old.example && example) old.example = example;
    if (!old.exampleZh && exampleZh) old.exampleZh = exampleZh;
    if (!old.chunk && chunk) old.chunk = chunk;
    if (!old.pos && pos) old.pos = pos;
    if (!old.collocation && collocation) old.collocation = collocation;
    if (!old.memoryTip && memoryTip) old.memoryTip = memoryTip;
    return;
  }
  entries.set(id, {
    id,
    stage,
    word: word.trim(),
    zh,
    meanings: [zh],
    example: example || '',
    exampleZh: exampleZh || '',
    ipa: ipa || '',
    category: category || '核心字詞',
    sources: [source],
    unit,
    chunk: chunk || word.trim(),
    pos: pos || 'n.',
    collocation: collocation || '',
    memoryTip: memoryTip || ''
  });
}

// 1. 先注入完整的國小與國中教育部課綱標準字彙庫
"""
    # 寫入國小詞彙
    content += "const ELEM_CURATED = " + json.dumps(ELEM_DATA, ensure_ascii=False, indent=2) + ";\n"
    content += "for (const w of ELEM_CURATED) {\n"
    content += "  add('elementary', w[0], w[4], w[6], w[2], w[5], '教育部國小常用詞彙', '', w[7], w[1], w[3], w[5], w[8]);\n"
    content += "}\n\n"

    # 寫入國中詞彙
    content += "const JUNIOR_CURATED = " + json.dumps(JUNIOR_DATA, ensure_ascii=False, indent=2) + ";\n"
    content += "for (const w of JUNIOR_CURATED) {\n"
    content += "  add('junior', w[0], w[4], w[6], w[2], w[5], '教育部國中會考核心字彙', '', w[7], w[1], w[3], w[5], w[8]);\n"
    content += "}\n\n"

    # 2. 融入教材原有的字彙（確保現有測試覆蓋率 100% 不變）
    content += """// 2. 完整融入教材現有的字彙與出處引用
for (const c of archVocabCategories) {
  for (const w of c.words) {
    add('elementary', w.en, w.zh, w.ex, w.kk, c.name, '本站基礎詞彙集');
  }
}

for (const [id, a] of Object.entries(sixthAudioData)) {
  for (const w of a.vocabularies || []) {
    add('elementary', w.word, w.meaning, w.example, w.ipa, a.subtitle, '國小教材 ' + id, '', w.exampleZh);
  }
}

for (const g of UNIFIED_GRADES.filter(g => ['g6', 'g7', 'g8', 'g9'].includes(g.gradeId))) {
  for (const s of g.semesters) {
    for (const u of s.units) {
      for (const w of u.phonicsVocab || []) {
        add(g.gradeId === 'g6' ? 'elementary' : 'junior', w.word, w.zh, w.sentence, w.ipa, u.title, u.id, u.id);
      }
    }
  }
}

for (const c of curriculum.find(t => t.id === 'jhs').chapters) {
  for (const w of c.vocab) {
    add('junior', w.word, w.def, w.example, w.ipa, c.title, '國中核心章節 ' + c.id);
  }
}

export const schoolWords = [...entries.values()].sort((a, b) => a.word.localeCompare(b.word, 'en'));

export function deckWords(deck) {
  return schoolWords.filter(w => deck === 'junior' ? true : w.stage === 'elementary');
}

export const schoolCounts = {
  elementary: deckWords('elementary').length,
  junior: deckWords('junior').length,
  juniorAdditional: schoolWords.filter(w => w.stage === 'junior').length
};
"""
    return content

if __name__ == '__main__':
    js = generate_js()
    with open('dist/school_word_data.mjs', 'w', encoding='utf-8') as f:
        f.write(js)
    print("dist/school_word_data.mjs generated successfully.")
