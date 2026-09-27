# scripts/generate_comprehensive_vocab.py
# -*- coding: utf-8 -*-
import json
import os

# Complete vocabulary database for Elementary (Pre-A1 ~ A1) and Junior High (A1 ~ B1)
# Standard Taiwan 108 Curriculum Aligned

from build_full_school_vocab import ELEM_DATA as ELEM_BASE, JUNIOR_DATA as JUNIOR_BASE

ELEM_MORE = [
    # 數字與順序
    ("one", "one", "/wʌn/", "num.", "一、一個", "數字與順序", "number one", "I have only one apple in my bag.", "我的袋子裡只有一顆蘋果。", "發音 /wʌn/，同 won (贏)"),
    ("two", "two", "/tuː/", "num.", "二、兩個", "數字與順序", "two students", "There are two birds singing on the branch.", "有兩隻鳥在樹枝上唱歌。", "同音字 to, too"),
    ("three", "three", "/θriː/", "num.", "三、三個", "數字與順序", "three books", "She bought three books at the bookstore.", "她在書店買了三本書。", "th 發咬舌音 /θ/"),
    ("four", "four", "/fɔːr/", "num.", "四、四個", "數字與順序", "four seasons", "There are four seasons in a year.", "一年有四個季節。", "同音字 for"),
    ("five", "five", "/faɪv/", "num.", "五、五個", "數字與順序", "five minutes", "Give me five minutes to get ready.", "給我五分鐘準備一下。", "Magic E 使 i 發 /aɪ/"),
    ("six", "six", "/sɪks/", "num.", "六、六個", "數字與順序", "six o'clock", "We usually eat dinner at six o'clock.", "我們通常六點吃晚餐。", "CVC 短母音 /ɪ/"),
    ("seven", "sev - en", "/ˈsɛv.ən/", "num.", "七、七個", "數字與順序", "seven days", "There are seven days in a week.", "一週有七天。", "sev 短音 /sɛv/ + en 弱讀 /ən/"),
    ("eight", "eight", "/eɪt/", "num.", "八、八個", "數字與順序", "eight years old", "My younger sister is eight years old.", "我妹妹今年八歲。", "eigh 發長音 /eɪ/，同 ate"),
    ("nine", "nine", "/naɪn/", "num.", "九、九個", "數字與順序", "nine books", "He has nine comic books on the shelf.", "他書架上有九本漫畫書。", "Magic E 使 i 發 /aɪ/"),
    ("ten", "ten", "/tɛn/", "num.", "十、十個", "數字與順序", "ten dollars", "The pen costs only ten dollars.", "這枝筆只要十元。", "CVC 短母音 /ɛ/"),
    ("hundred", "hun - dred", "/ˈhʌn.drəd/", "num.", "百、一百", "數字與順序", "one hundred", "There are one hundred cents in a dollar.", "一美元等於一百美分。", "hun /hʌn/ + dred /drəd/"),
    ("thousand", "thou - sand", "/ˈθaʊ.zənd/", "num.", "千、一千", "數字與順序", "one thousand", "Over one thousand students attend this school.", "超過一千名學生在這所學校就讀。", "thou /θaʊ/ + sand /zənd/"),
    ("first", "first", "/fɝːst/", "adj. / adv.", "第一的、首先", "數字與順序", "first prize", "She won the first prize in the singing contest.", "她在歌唱比賽中獲得第一名。", "ir 發捲舌長音 /ɝː/"),
    ("second", "sec - ond", "/ˈsɛk.ənd/", "adj. / n.", "第二的；秒鐘", "數字與順序", "second floor", "Our classroom is on the second floor.", "我們的教室在二樓。", "sec /sɛk/ + ond /ənd/"),
    ("third", "third", "/θɝːd/", "adj.", "第三的", "數字與順序", "third place", "He finished in third place in the race.", "他在比賽中獲得第三名。", "th /θ/ + ir /ɝː/ + d"),

    # 顏色與外觀
    ("red", "red", "/rɛd/", "adj. / n.", "紅色的；紅色", "顏色與外觀", "red apple", "The red roses in the garden are blooming.", "花園裡的紅玫瑰正在盛開。", "CVC 短母音 /ɛ/"),
    ("blue", "blue", "/bluː/", "adj. / n.", "藍色的；藍色", "顏色與外觀", "blue sky", "The blue sky has no clouds today.", "今天藍藍的天空萬里無雲。", "ue 發長音 /uː/"),
    ("yellow", "yel - low", "/ˈjɛl.oʊ/", "adj. / n.", "黃色的；黃色", "顏色與外觀", "yellow banana", "The yellow school bus picked up the kids.", "黃色校車接走了孩子們。", "yel /jɛl/ + low /oʊ/"),
    ("green", "green", "/ɡriːn/", "adj. / n.", "綠色的；綠色", "顏色與外觀", "green leaves", "The trees have fresh green leaves in spring.", "春天時樹木長出鮮綠的嫩葉。", "ee 發長音 /iː/"),
    ("white", "white", "/waɪt/", "adj. / n.", "白色的；白色", "顏色與外觀", "white snow", "A blanket of white snow covered the fields.", "一片白雪覆蓋了田野。", "wh 發 /w/，Magic E 使 i 發 /aɪ/"),
    ("black", "black", "/blæk/", "adj. / n.", "黑色的；黑色", "顏色與外觀", "black coffee", "He wears a stylish black jacket.", "他穿著一件有型的黑色夾克。", "ck 發 /k/，a 短音 /æ/"),
    ("pink", "pink", "/pɪŋk/", "adj. / n.", "粉紅色的；粉紅色", "顏色與外觀", "pink dress", "The little girl wore a lovely pink dress.", "小女孩穿著一件可愛的粉紅色洋裝。", "ink 發 /ɪŋk/"),
    ("purple", "pur - ple", "/ˈpɝː.pəl/", "adj. / n.", "紫色的；紫色", "顏色與外觀", "purple grapes", "Ripe purple grapes are sweet and juicy.", "成熟的紫葡萄香甜多汁。", "ur 發 /ɝː/ + ple /pəl/"),
    ("brown", "brown", "/braʊn/", "adj. / n.", "棕色的；棕色", "顏色與外觀", "brown bear", "The brown dog barked at the stranger.", "棕色的狗對著陌生人狂吠。", "ow 發 /aʊ/"),

    # 更多動物
    ("horse", "horse", "/hɔːrs/", "n.", "馬", "動物與生態", "ride a horse", "He learned how to ride a horse on the ranch.", "他在農場學會了如何騎馬。", "or 發長音 /ɔːr/"),
    ("pig", "pig", "/pɪɡ/", "n.", "豬", "動物與生態", "little pig", "The three little pigs built different houses.", "三隻小豬蓋了不同的房子。", "CVC 短母音 /ɪ/"),
    ("cow", "cow", "/kaʊ/", "n.", "乳牛、母牛", "動物與生態", "dairy cow", "Cows give us fresh and nutritious milk.", "乳牛提供我們新鮮有營養的牛奶。", "ow 發 /aʊ/"),
    ("sheep", "sheep", "/ʃiːp/", "n.", "綿羊 (單複數同形)", "動物與生態", "flock of sheep", "The white sheep are grazing on the green hill.", "白色的綿羊正在綠色山丘上吃草。", "注意：sheep 單複數同形！"),
    ("duck", "duck", "/dʌk/", "n.", "鴨子", "動物與生態", "swimming duck", "Yellow ducks are swimming happily in the pond.", "黃色鴨子在池塘裡高興地游泳。", "ck 發 /k/，u 短音 /ʌ/"),
    ("chicken", "chick - en", "/ˈtʃɪk.ɪn/", "n.", "雞、雞肉", "動物與生態", "fried chicken", "We had fried chicken and salad for lunch.", "我們午餐吃了炸雞和沙拉。", "chick /tʃɪk/ + en /ɪn/"),
    ("mouse", "mouse", "/maʊs/", "n.", "老鼠 (複數 mice)", "動物與生態", "little mouse", "The mouse ran quickly into the hole.", "老鼠迅速地跑進洞穴裡。", "複數不規則：mouse ➔ mice！"),
    ("frog", "frog", "/frɑːɡ/", "n.", "青蛙", "動物與生態", "green frog", "The green frog jumped into the cool water.", "綠色青蛙跳進了涼爽的水中。", "fr + og /ɑːɡ/"),
    ("turtle", "tur - tle", "/ˈtɝː.t̬əl/", "n.", "烏龜", "動物與生態", "sea turtle (海龜)", "Sea turtles lay their eggs on sandy beaches.", "海龜在沙灘上下蛋。", "ur 發 /ɝː/ + tle /t̬əl/"),
    ("snake", "snake", "/sneɪk/", "n.", "蛇", "動物與生態", "long snake", "Be careful; there might be snakes in the bush.", "小心點，灌木叢中可能會有蛇。", "Magic E 使 a 發 /eɪ/"),
    ("bee", "bee", "/biː/", "n.", "蜜蜂", "動物與生態", "busy bee", "Bees collect nectar from colorful flowers.", "蜜蜂從鮮豔的花朵中採集花蜜。", "ee 發長音 /iː/"),
    ("butterfly", "but - ter - fly", "/ˈbʌt.ɚ.flaɪ/", "n.", "蝴蝶", "動物與生態", "beautiful butterfly", "A colorful butterfly landed gently on the rose.", "一隻五彩斑斕的蝴蝶輕輕停在玫瑰上。", "butter (奶油) + fly (飛舞)"),

    # 更多飲食與點心
    ("egg", "egg", "/ɛɡ/", "n.", "雞蛋、蛋", "飲食與餐點", "boiled egg", "Eating an egg every day provides good protein.", "每天吃一顆蛋能提供優質蛋白質。", "雙寫 g，e 短音 /ɛ/"),
    ("soup", "soup", "/suːp/", "n.", "湯 (不可數)", "飲食與餐點", "hot soup", "Mom made a pot of hot chicken soup for us.", "媽媽為我們煮了一鍋熱雞湯。", "ou 發長音 /uː/"),
    ("salad", "sal - ad", "/ˈsæl.əd/", "n.", "沙拉", "飲食與餐點", "fruit salad", "She ordered a fresh vegetable salad with dressing.", "她點了一份淋上醬汁的新鮮蔬菜沙拉。", "sal /sæl/ + ad 弱讀 /əd/"),
    ("potato", "po - ta - to", "/pəˈteɪ.t̬oʊ/", "n.", "馬鈴薯、土豆", "飲食與餐點", "mashed potatoes", "Baked potatoes are delicious with a little butter.", "烤馬鈴薯加上一點奶油非常美味。", "po /pə/ + ta /teɪ/ + to /toʊ/"),
    ("tomato", "to - ma - to", "/təˈmeɪ.t̬oʊ/", "n.", "番茄", "飲食與餐點", "red tomato", "Fresh red tomatoes are great for making pasta sauce.", "新鮮紅番茄非常適合拿來做義大利麵醬汁。", "to /tə/ + ma /meɪ/ + to /toʊ/"),
    ("cake", "cake", "/keɪk/", "n.", "蛋糕", "飲食與餐點", "birthday cake", "We blew out the candles on the birthday cake.", "我們吹熄了生日蛋糕上的蠟燭。", "Magic E 使 a 發長音 /eɪ/"),
    ("cookie", "cook - ie", "/ˈkʊk.i/", "n.", "餅乾、曲奇", "飲食與餐點", "chocolate cookie", "Grandma baked warm chocolate chip cookies for us.", "奶奶為我們烤了熱騰騰的巧克力餅乾。", "cook /kʊk/ + ie /i/"),
    ("ice cream", "ice cream", "/ˌaɪs ˈkriːm/", "n.", "冰淇淋", "飲食與餐點", "vanilla ice cream", "Eating cold ice cream on a hot summer day is wonderful.", "在炎熱夏天吃冰涼的冰淇淋真是太棒了。", "ice (冰) + cream (奶油)"),
    ("pizza", "piz - za", "/ˈpiːt.sə/", "n.", "披薩", "飲食與餐點", "cheese pizza", "We shared a large cheese pizza with our classmates.", "我們和同班同學分享了一個大起司披薩。", "zz 發 /ts/，源自義大利語"),

    # 衣物與穿戴
    ("shirt", "shirt", "/ʃɝːt/", "n.", "襯衫", "衣物與穿戴", "white shirt", "Dad wears a clean white shirt to work every day.", "爸爸每天穿著乾淨的白襯衫上班。", "ir 發捲舌長音 /ɝː/"),
    ("pants", "pants", "/pænts/", "n.", "長褲 (恆為複數)", "衣物與穿戴", "a pair of pants", "He bought a new pair of black pants for the concert.", "他為音樂會買了一條新的黑長褲。", "兩隻褲管，恆用複數！"),
    ("dress", "dress", "/drɛs/", "n. / v.", "洋裝、連衣裙；穿衣", "衣物與穿戴", "wear a dress", "She wore a lovely blue dress to the party.", "她穿著一件優雅的藍色洋裝去參加宴會。", "雙寫 s，dr + ess /ɛs/"),
    ("coat", "coat", "/koʊt/", "n.", "大衣、外套", "衣物與穿戴", "warm coat", "Put on your warm coat because it is freezing outside.", "穿上你的暖大衣，因為外面很寒冷。", "oa 字母組合發長音 /oʊ/"),
    ("jacket", "jack - et", "/ˈdʒæk.ɪt/", "n.", "夾克、短外套", "衣物與穿戴", "leather jacket", "He zipped up his warm jacket before going outdoors.", "出門前他拉上了保暖夾克的拉鍊。", "jack /dʒæk/ + et /ɪt/"),
    ("shoes", "shoes", "/ʃuːz/", "n.", "鞋子 (恆常用複數)", "衣物與穿戴", "put on shoes", "Take off your muddy shoes before entering the house.", "進屋前請脫掉沾滿泥巴的鞋子。", "oe 發長音 /uː/，s 發 /z/"),
    ("hat", "hat", "/hæt/", "n.", "帽子 (有邊緣的帽)", "衣物與穿戴", "wear a hat", "She wore a straw hat to protect her face from the sun.", "她戴了一頂草帽來遮陽。", "CVC 短母音 /æ/"),

    # 居住與家庭空間
    ("home", "home", "/hoʊm/", "n. / adv.", "家、家庭", "居家與生活", "go home (回家)", "After school, the students were eager to go home.", "放學後學生們迫不及待地想回家。", "Magic E 使 o 發長音 /oʊ/"),
    ("house", "house", "/haʊs/", "n.", "房子、房屋", "居家與生活", "big house", "They live in a beautiful house with a green garden.", "他們住在一棟帶有綠色花園的美麗房子裡。", "ou 發 /aʊ/，s 發清音 /s/"),
    ("room", "room", "/ruːm/", "n.", "房間", "居家與生活", "clean room", "Keep your study room neat and well organized.", "保持你的書房整齊又有條理。", "oo 發長音 /uː/"),
    ("door", "door", "/dɔːr/", "n.", "門", "居家與生活", "open the door", "Please close the door quietly so as not to wake the baby.", "請輕輕關上門以免吵醒小寶寶。", "oor 發長音 /ɔːr/"),
    ("window", "win - dow", "/ˈwɪn.doʊ/", "n.", "窗戶", "居家與生活", "look out the window", "Open the window to let fresh morning air in.", "打開窗戶讓早晨的新鮮空氣進來。", "win /wɪn/ + dow /doʊ/"),
    ("table", "ta - ble", "/ˈteɪ.bəl/", "n.", "桌子、餐桌", "居家與生活", "set the table (擺餐具)", "Help Mom set the table before dinner starts.", "在晚餐開始前幫媽媽擺好餐具。", "ta /teɪ/ + ble /bəl/"),
    ("bed", "bed", "/bɛd/", "n.", "床", "居家與生活", "go to bed (就寢)", "Children should go to bed early and get up early.", "小孩子應該早睡早起。", "CVC 短母音 /ɛ/"),

    # 地方與交通
    ("city", "cit - y", "/ˈsɪt.i/", "n.", "城市", "地方與交通", "big city", "Taipei is a bustling and convenient modern city.", "台北是一座繁華且便利的現代城市。", "c 在 i 前發軟音 /s/"),
    ("park", "park", "/pɑːrk/", "n. / v.", "公園；停車", "地方與交通", "walk in the park", "Families like to picnic in the central park on Sundays.", "家庭喜歡在週日去中央公園野餐。", "ar 發捲舌長音 /ɑːrk/"),
    ("hospital", "hos - pi - tal", "/ˈhɑː.spɪ.t̬əl/", "n.", "醫院", "地方與交通", "go to the hospital", "The ambulance rushed the injured patient to the hospital.", "救護車將受傷的病患迅速送往醫院。", "hos /hɑːs/ + pi /pɪ/ + tal /t̬əl/"),
    ("store", "store", "/stɔːr/", "n.", "商店、店家", "地方與交通", "convenience store", "You can buy snacks at the 24-hour convenience store.", "你可以在二十四小時便利商店買點心。", "ore 發長音 /ɔːr/"),
    ("bus", "bus", "/bʌs/", "n.", "公車、巴士", "地方與交通", "take a bus", "Taking a bus is an eco-friendly way to travel around.", "搭乘公車是環遊市區的環保方式。", "CVC 短母音 /ʌ/"),
    ("train", "train", "/treɪn/", "n.", "火車", "地方與交通", "take a train", "The train arrived at the station right on schedule.", "火車非常準時地抵達了車站。", "ai 字母組合發長音 /eɪ/"),
    ("car", "car", "/kɑːr/", "n.", "汽車、轎車", "地方與交通", "drive a car", "Dad bought a fuel-efficient electric car last month.", "爸爸上個月買了一輛節能的電動汽車。", "ar 發捲舌長音 /ɑːr/")
]

JUNIOR_MORE = [
    # 更多不規則動詞
    ("begin", "be - gin", "/bɪˈɡɪn/", "v.", "開始 (三態 begin-began-begun)", "會考不規則動詞", "begin to study", "The concert will begin promptly at seven thirty.", "音樂會將於七點半準時開始。", "三態：begin ➔ began /bɪˈɡæn/ ➔ begun /bɪˈɡʌn/"),
    ("become", "be - come", "/bɪˈkʌm/", "v.", "成為、變成 (三態 become-became-become)", "會考不規則動詞", "become a doctor", "He worked hard and eventually became a respected doctor.", "他努力奮鬥，最終成為一位受人尊敬的醫生。", "三態：become ➔ became ➔ become"),
    ("blow", "blow", "/bloʊ/", "v.", "吹動、颳風 (三態 blow-blew-blown)", "會考不規則動詞", "blow out candles", "Strong wind blew away all the dry leaves on the ground.", "強風吹走了地上所有的乾樹葉。", "三態：blow ➔ blew /bluː/ ➔ blown /bloʊn/"),
    ("draw", "draw", "/drɔː/", "v.", "繪畫、拉出 (三態 draw-drew-drawn)", "會考不規則動詞", "draw a picture", "The talented artist drew a magnificent portrait.", "那位才華洋溢的藝術家畫了一幅壯麗的肖像。", "三態：draw ➔ drew /druː/ ➔ drawn /drɔːn/"),
    ("drink", "drink", "/drɪŋk/", "v.", "飲用、喝 (三態 drink-drank-drunk)", "會考不規則動詞", "drink water", "Athletes drank plenty of water after the marathon.", "運動員在馬拉松跑完後喝了大量的水。", "三態：drink ➔ drank /dræŋk/ ➔ drunk /drʌŋk/"),
    ("eat", "eat", "/iːt/", "v.", "吃、食用 (三態 eat-ate-eaten)", "會考不規則動詞", "eat healthy food", "We ate delicious homemade noodles at grandma's house.", "我們在奶奶家吃了美味的手工麵條。", "三態：eat ➔ ate /eɪt/ ➔ eaten /ˈiː.tən/"),
    ("fly", "fly", "/flaɪ/", "v.", "飛行、放飛 (三態 fly-flew-flown)", "會考不規則動詞", "fly a kite", "Birds fly south to seek warmer weather in winter.", "鳥兒在冬天向南飛尋求更溫暖的氣候。", "三態：fly ➔ flew /fluː/ ➔ flown /floʊn/"),
    ("get", "get", "/ɡɛt/", "v.", "得到、到達 (三態 get-got-gotten)", "會考不規則動詞", "get good grades", "She studied thoroughly to get top marks on the final test.", "她徹底複習以在期末考拿到頂尖成績。", "三態：get ➔ got ➔ gotten /ˈɡɑː.tən/"),
    ("ring", "ring", "/rɪŋ/", "v. / n.", "鳴響；戒指 (三態 ring-rang-rung)", "會考不規則動詞", "the bell rings", "The school bell rang, signaling the end of the school day.", "學校鐘聲響起，宣告放學時間已到。", "三態：ring ➔ rang /ræŋ/ ➔ rung /rʌŋ/"),
    ("run", "run", "/rʌn/", "v.", "奔跑、經營 (三態 run-ran-run)", "會考不規則動詞", "run a business", "He ran as fast as he could to deliver the message.", "他以最快速度奔跑去傳遞消息。", "三態：run ➔ ran /ræn/ ➔ run /rʌn/"),
    ("say", "say", "/seɪ/", "v.", "說、講出 (三態 say-said-said)", "會考不規則動詞", "say hello", "The teacher said that practice makes perfect.", "老師說熟能生巧。", "三態：say /seɪ/ ➔ said /sɛd/ ➔ said /sɛd/！注意音標短母音"),

    # 學校學業與學習策略
    ("education", "ed - u - ca - tion", "/ˌɛdʒ.ʊˈkeɪ.ʃən/", "n.", "教育", "學業與教育", "quality education", "Education plays a critical role in shaping a child's future.", "教育在塑造孩子的未來中扮演關鍵角色。", "educate (教育) + -tion (名詞尾綴)"),
    ("grammar", "gram - mar", "/ˈɡræm.ɚ/", "n.", "文法 (不可數)", "學業與教育", "English grammar", "Understanding basic grammar rules makes writing much easier.", "理解基礎文法規則讓寫作變得容易許多。", "雙寫 m，gram /ɡræm/ + mar /ɚ/，注意結尾是 ar！"),
    ("vocabulary", "vo - cab - u - lar - y", "/voʊˈkæb.jə.lɛr.i/", "n.", "單字量、詞彙", "學業與教育", "expand vocabulary", "Reading articles regularly helps students expand their vocabulary.", "定期閱讀文章能幫助學生擴充單字量。", "vocab (詞彙) + ulary"),
    ("pronunciation", "pro - nun - ci - a - tion", "/prəˌnʌn.siˈeɪ.ʃən/", "n.", "發音、讀音", "學業與教育", "clear pronunciation", "Listen to native audio recordings to improve your pronunciation.", "收聽母語者錄音以改善你的發音。", "注意拼寫：pronounce ➔ pronunciation (沒有 o)！"),
    ("dictionary", "dic - tion - ar - y", "/ˈdɪk.ʃən.ɛr.i/", "n.", "字典、辭典", "學業與教育", "look up in a dictionary", "If you encounter an unfamiliar word, look it up in a dictionary.", "如果遇到不認識的字，請查字典。", "diction (用詞) + -ary (場所/工具)"),
    ("comprehension", "com - pre - hen - sion", "/ˌkɑːm.prɪˈhɛn.ʃən/", "n.", "理解力、閱讀理解", "學業與教育", "reading comprehension", "The test includes questions measuring reading comprehension.", "該測驗包含評量閱讀理解能力的題目。", "comprehend (理解) ➔ comprehension"),
    ("describe", "de - scribe", "/dɪˈskraɪb/", "v.", "描述、描寫", "學業與教育", "describe a scene", "Can you describe what the suspect looked like?", "你能描述一下嫌疑犯長什麼樣子嗎？", "de- (向下) + scribe (書寫) ➔ 描繪"),
    ("improve", "im - prove", "/ɪmˈpruːv/", "v.", "改進、進步", "學業與教育", "improve skills", "Continuous practice will help you improve your speaking skills.", "持續練習將幫助你增進口語技巧。", "im- + prove (證明/改善)"),

    # 社會、職業與公共事務
    ("government", "gov - ern - ment", "/ˈɡʌv.ɚn.mənt/", "n.", "政府", "社會與公共事務", "local government", "The government announced new environmental conservation policies.", "政府宣布了新的環境保育政策。", "govern (治理) + -ment (名詞尾綴)"),
    ("community", "com - mu - ni - ty", "/kəˈmjuː.nə.t̬i/", "n.", "社區、共同體", "社會與公共事務", "local community", "Volunteers collected food to help the elderly in their community.", "志工們收集食物來幫助社區裡的長者。", "common (共同) ➔ community"),
    ("volunteer", "vol - un - teer", "/ˌvɑːl.ənˈtɪr/", "n. / v.", "志工；自願服務", "社會與公共事務", "work as a volunteer", "Many high school students work as volunteers at the shelter.", "許多高中生在收容所擔任志工服務。", "vol- (意志/意願) + -teer (人)"),
    ("citizen", "cit - i - zen", "/ˈsɪt̬.ə.zən/", "n.", "公民、國民", "社會與公共事務", "responsible citizen", "A responsible citizen obeys the laws and protects public property.", "負責任的公民遵守法律並愛護公物。", "city (城市) ➔ citizen (公民)"),
    ("profession", "pro - fes - sion", "/prəˈfɛʃ.ən/", "n.", "專業、職業", "社會與公共事務", "medical profession", "Nursing is a demanding yet deeply rewarding profession.", "護理是一項要求嚴格卻深具回報的崇高專業。", "profess (聲明) ➔ profession"),

    # 旅行、交通與休閒文化
    ("journey", "jour - ney", "/ˈdʒɝː.ni/", "n.", "旅程、旅行", "旅行與文化", "safe journey", "They wished him a safe and wonderful journey across Europe.", "他們祝他橫越歐洲的旅程平安且精彩。", "jour (日) ➔ 一日的行程 ➔ 旅程"),
    ("passport", "pass - port", "/ˈpæs.pɔːrt/", "n.", "護照", "旅行與文化", "valid passport", "You must show a valid passport when boarding an international flight.", "登上班機時你必須出示有效護照。", "pass (通過) + port (港口/口岸) ➔ 護照"),
    ("passenger", "pas - sen - ger", "/ˈpæs.ən.dʒɚ/", "n.", "乘客、旅客", "旅行與文化", "seatbelt for passengers", "All passengers must fasten their seatbelts before takeoff.", "起飛前所有乘客必須繫好安全帶。", "pass (經過) ➔ passenger"),
    ("schedule", "sched - ule", "/ˈskɛdʒ.uːl/", "n. / v.", "時程表、日程安排", "旅行與文化", "on schedule (按時)", "The train arrived right on schedule despite the heavy rain.", "儘管下著大雨，火車依然準時抵達。", "sch 發 /sk/，edule 發 /ɛdʒ.uːl/"),
    ("culture", "cul - ture", "/ˈkʌl.tʃɚ/", "n.", "文化", "旅行與文化", "traditional culture", "Traveling to new countries allows you to experience different cultures.", "去新國家旅行讓你能體驗不同的文化。", "cult (耕耘/培育) + -ure"),

    # 健康、身心醫療與安全
    ("medicine", "med - i - cine", "/ˈmɛd.ə.sən/", "n.", "藥物 (不可數)；醫學", "健康與身心", "take medicine (服藥)", "Take this prescribed medicine three times a day after meals.", "請於三餐飯後服用這款處方藥物。", "med (醫治) + -icine"),
    ("hospital", "hos - pi - tal", "/ˈhɑː.spɪ.t̬əl/", "n.", "醫院", "健康與身心", "emergency room", "The injured driver was rushed to the nearby hospital.", "受傷的駕駛被迅速送往附近醫院急救。", "hospit (接待/客人) ➔ 醫院"),
    ("disease", "dis - ease", "/dɪˈziːz/", "n.", "疾病", "健康與身心", "prevent disease", "Regular handwashing helps prevent the spread of infectious disease.", "常洗手有助於預防傳染病的傳播。", "dis- (不/非) + ease (安適) ➔ 身體不安 ➔ 疾病"),
    ("symptom", "symp - tom", "/ˈsɪmp.təm/", "n.", "症狀、徵兆", "健康與身心", "common symptoms", "Fever, cough, and sore throat are common symptoms of the flu.", "發燒、咳嗽和喉嚨痛是流感的常見症狀。", "sym- (共同) + ptom (掉落/發生)"),
    ("exercise", "ex - er - cise", "/ˈɛk.sɚ.saɪz/", "n. / v.", "運動；練習", "健康與身心", "regular exercise", "Doing aerobic exercise thirty minutes a day strengthens your heart.", "每天做三十分鐘有氧運動能強化你的心臟。", "ex- + ercise")
]

def main():
    elem_all = ELEM_BASE + ELEM_MORE
    junior_all = JUNIOR_BASE + JUNIOR_MORE

    print(f"Total Elementary curated entries: {len(elem_all)}")
    print(f"Total Junior High curated entries: {len(junior_all)}")

    # Update build_full_school_vocab.py with combined lists
    from build_full_school_vocab import generate_js
    import build_full_school_vocab
    build_full_school_vocab.ELEM_DATA = elem_all
    build_full_school_vocab.JUNIOR_DATA = junior_all

    js = build_full_school_vocab.generate_js()
    with open('dist/school_word_data.mjs', 'w', encoding='utf-8') as f:
        f.write(js)
    with open('site/dist/school_word_data.mjs', 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated dist/school_word_data.mjs and site/dist/school_word_data.mjs.")

if __name__ == '__main__':
    main()
