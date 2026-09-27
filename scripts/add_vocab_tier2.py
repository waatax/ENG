# scripts/add_vocab_tier2.py
# -*- coding: utf-8 -*-
"""
擴充第二批教育部課綱必備單字，使國小字庫達 380+ 詞，國中字庫達 600+ 詞
"""

from generate_comprehensive_vocab import ELEM_BASE, ELEM_MORE, JUNIOR_BASE, JUNIOR_MORE

ELEM_TIER2 = [
    # 自然地理與地景
    ("beach", "beach", "/biːtʃ/", "n.", "海灘、沙灘", "自然與地理", "walk along the beach", "We collected colorful seashells on the sandy beach.", "我們在沙灘上收集五顏六色的貝殼。", "ea 發長母音 /iː/，ch 發 /tʃ/"),
    ("mountain", "moun - tain", "/ˈmaʊn.tən/", "n.", "高山、山脈", "自然與地理", "climb a mountain", "Jade Mountain is the highest peak in Taiwan.", "玉山是台灣最高峰。", "moun /maʊn/ + tain 弱讀 /tən/"),
    ("river", "riv - er", "/ˈrɪv.ɚ/", "n.", "河流", "自然與地理", "across the river", "A long concrete bridge stretches across the river.", "一座長長的混凝土橋跨越了這條河。", "riv 短音 /rɪv/ + er /ɚ/"),
    ("lake", "lake", "/leɪk/", "n.", "湖泊", "自然與地理", "calm lake", "Sun Moon Lake attracts tourists from all over the world.", "日月潭吸引了來自世界各地的遊客。", "Magic E 使 a 發長音 /eɪ/"),
    ("sea", "sea", "/siː/", "n.", "大海、海洋", "自然與地理", "by the sea", "They spent a relaxing summer holiday by the sea.", "他們在海邊度過了一個放鬆的暑假。", "ea 發長母音 /iː/，同 see"),
    ("ocean", "o - cean", "/ˈoʊ.ʃən/", "n.", "大洋、汪洋", "自然與地理", "Pacific Ocean", "The Pacific Ocean is the largest ocean on Earth.", "太平洋是地球上最大的海洋。", "o 開音節 /oʊ/ + cean 發 /ʃən/"),
    ("tree", "tree", "/triː/", "n.", "樹木", "自然與地理", "climb a tree", "Big trees provide cool shade during the summer.", "大樹在夏天提供涼爽的樹蔭。", "ee 發長母音 /iː/"),
    ("flower", "flow - er", "/ˈflaʊ.ɚ/", "n.", "花朵", "自然與地理", "fresh flowers", "Spring is a wonderful season when sweet flowers bloom.", "春天是芬芳花朵盛開的美好季節。", "flow /flaʊ/ + er /ɚ/"),
    ("grass", "grass", "/ɡræs/", "n.", "草地、青草 (不可數)", "自然與地理", "green grass", "Please do not step on the fresh green grass.", "請勿踐踏鮮綠的草坪。", "雙寫 s，a 發短音 /æ/"),
    ("garden", "gar - den", "/ˈɡɑːr.dən/", "n.", "花園、花壇", "自然與地理", "beautiful garden", "Grandpa grows colorful roses in his front garden.", "爺爺在他前院的花園裡種植繽紛的玫瑰。", "gar /ɡɑːr/ + den /dən/"),
    ("sky", "sky", "/skaɪ/", "n.", "天空", "自然與地理", "blue sky", "A colorful rainbow appeared across the bright blue sky.", "一道七彩彩虹出現在湛藍的天空中。", "單音節結尾 y 發長雙母音 /aɪ/"),
    ("sun", "sun", "/sʌn/", "n.", "太陽 (單數常加 the)", "自然與地理", "the sun shines", "The sun gives us light and warmth every single day.", "太陽每天都給予我們光和熱。", "CVC 結構，u 短母音 /ʌ/"),
    ("moon", "moon", "/muːn/", "n.", "月亮 (單數常加 the)", "自然與地理", "full moon", "Families gather to admire the full moon on Mid-Autumn Festival.", "中秋節時闔家團圓一同賞滿月。", "oo 發長母音 /uː/"),
    ("star", "star", "/stɑːr/", "n.", "星星、恆星", "自然與地理", "shining star", "You can see millions of stars in the countryside sky.", "在鄉村的夜空中你能看見千萬顆星星。", "ar 發捲舌長音 /ɑːr/"),
    ("rainbow", "rain - bow", "/ˈreɪn.boʊ/", "n.", "彩虹", "自然與地理", "see a rainbow", "A brilliant rainbow appeared after the sudden shower.", "陣雨過後出現了一道絢爛的彩虹。", "rain (雨) + bow (弓形)"),

    # 家居用品與器具
    ("clock", "clock", "/klɑːk/", "n.", "時鐘、座鐘", "居家與生活", "alarm clock", "The alarm clock rings loudly at six thirty.", "鬧鐘在六點半大聲響起。", "ck 發 /k/，o 短音 /ɑː/"),
    ("lamp", "lamp", "/læmp/", "n.", "檯燈、燈具", "居家與生活", "desk lamp", "Turn on the desk lamp when you read in the evening.", "晚上讀書時請打開檯燈。", "CVC 結構，a 短音 /æ/"),
    ("sofa", "so - fa", "/ˈsoʊ.fə/", "n.", "沙發", "居家與生活", "sit on the sofa", "Dad likes to relax on the comfortable sofa after work.", "爸爸下班後喜歡在舒適的沙發上放鬆。", "so /soʊ/ + fa /fə/"),
    ("computer", "com - pu - ter", "/kəmˈpjuː.t̬ɚ/", "n.", "電腦", "居家與生活", "personal computer", "Students use the computer to look up research data.", "學生們使用電腦查詢研究資料。", "com /kəm/ + pu /pjuː/ + ter /t̬ɚ/"),
    ("box", "box", "/bɑːks/", "n.", "盒子、箱子 (複數 boxes)", "居家與生活", "gift box", "She opened the mysterious box with great excitement.", "她懷著無比興奮的心情打開神秘盒子。", "CVC 結構，複數加 -es /ˈbɑːk.sɪz/"),
    ("bag", "bag", "/bæɡ/", "n.", "提袋、包包", "居家與生活", "plastic bag", "Bring your own reusable cloth bag when shopping.", "購物時請自備可重複使用的布袋。", "CVC 短母音 /æ/"),
    ("cup", "cup", "/kʌp/", "n.", "杯子 (有手把的杯)", "居家與生活", "a cup of tea", "Would you like a cup of hot green tea?", "你想來一杯熱綠茶嗎？", "CVC 短母音 /ʌ/"),
    ("glass", "glass", "/ɡlæs/", "n.", "玻璃杯；玻璃 (不可數)", "居家與生活", "a glass of water", "He drank a large glass of cold water after jogging.", "他慢跑後喝了一大杯冰水。", "雙寫 s，a 短音 /æ/"),
    ("bottle", "bot - tle", "/ˈbɑː.t̬əl/", "n.", "瓶子、水壺", "居家與生活", "water bottle", "Remember to bring your water bottle to sports class.", "上體育課時記得帶上你的水壺。", "雙寫 t，bot /bɑː/ + tle /t̬əl/"),

    # 常見形容詞
    ("big", "big", "/bɪɡ/", "adj.", "大的、巨大的", "常見形容詞", "big elephant", "An elephant is a very big land animal.", "大象是一種體型非常龐大的陸地動物。", "CVC 結構，比較級雙寫 g：bigger"),
    ("small", "small", "/smɔːl/", "adj.", "小的、微小的", "常見形容詞", "small mouse", "A small mouse slipped into the pantry quietly.", "一隻小老鼠悄悄溜進了食品儲藏室。", "all 發 /ɔːl/"),
    ("tall", "tall", "/tɔːl/", "adj.", "高的 (身材/建築)", "常見形容詞", "tall building", "Taipei 101 is one of the tallest towers in Asia.", "台北 101 是亞洲最高的高塔之一。", "all 發 /ɔːl/"),
    ("short", "short", "/ʃɔːrt/", "adj.", "矮的、短的", "常見形容詞", "short story", "He wrote a humorous short story for English class.", "他為英文課寫了一篇幽默的短篇故事。", "or 發長音 /ɔːr/"),
    ("long", "long", "/lɑːŋ/", "adj.", "長的、長期的", "常見形容詞", "long vacation", "Summer vacation is a long and wonderful holiday.", "暑假是一段漫長而美好的假期。", "ong 發 /ɑːŋ/"),
    ("fast", "fast", "/fæst/", "adj. / adv.", "快的；迅速地", "常見形容詞", "run fast", "Cheetahs can run exceptionally fast across grasslands.", "獵豹能在草原上以極快速度奔馳。", "a 短音 /æ/"),
    ("slow", "slow", "/sloʊ/", "adj.", "緩慢的", "常見形容詞", "slow turtle", "Turtles walk with slow and steady steps.", "烏龜邁著緩慢而穩健的步伐行走。", "ow 發長母音 /oʊ/"),
    ("hot", "hot", "/hɑːt/", "adj.", "炎熱的、燙的", "常見形容詞", "hot soup", "Be careful because the hot soup might burn your tongue.", "請小心，熱湯可能會燙傷你的舌頭。", "CVC 結構，比較級雙寫 t：hotter"),
    ("cold", "cold", "/koʊld/", "adj.", "寒冷的、冰涼的", "常見形容詞", "cold weather", "Drinking ice-cold juice is refreshing in summer.", "夏天喝冰涼果汁令人心曠神怡。", "old 字母組合發 /oʊld/"),
    ("new", "new", "/nuː/", "adj.", "新的、嶄新的", "常見形容詞", "new shoes", "I wore my new shoes to school for the first time.", "我第一次穿新鞋去上學。", "ew 字母組合發 /nuː/"),
    ("old", "old", "/oʊld/", "adj.", "年老的、陳舊的", "常見形容詞", "old friend", "Meeting an old friend brings back happy memories.", "遇見老朋友會喚起美好的回憶。", "old 發 /oʊld/"),
    ("young", "young", "/jʌŋ/", "adj.", "年輕的、幼小的", "常見形容詞", "young children", "Young children learn languages very quickly.", "幼童學習語言非常快速。", "ou 不規則發短母音 /ʌ/"),
    ("busy", "bus - y", "/ˈbɪz.i/", "adj.", "忙碌的、繁忙的", "常見形容詞", "busy day", "Dad had a very busy and productive day at work.", "爸爸在工作上度過了非常忙碌且充實的一天。", "u 不規則發短母音 /ɪ/！"),
    ("easy", "eas - y", "/ˈiː.zi/", "adj.", "容易的、簡便的", "常見形容詞", "easy question", "This English question is quite easy to answer.", "這道英文題目相當容易回答。", "ea 發長母音 /iː/，s 發 /z/"),
    ("hard", "hard", "/hɑːrd/", "adj. / adv.", "困難的；努力地", "常見形容詞", "work hard", "If you study hard, you will achieve your goals.", "如果你努力學習，你一定能達成目標。", "ar 發捲舌長音 /ɑːr/"),
    ("sweet", "sweet", "/swiːt/", "adj.", "甜的、芳香的", "常見形容詞", "sweet apples", "These red apples taste delightfully sweet.", "這些紅蘋果嘗起來非常甘甜可口。", "ee 發長母音 /iː/")
]

JUNIOR_TIER2 = [
    # 更多會考高頻不規則動詞
    ("cost", "cost", "/kɑːst/", "v. / n.", "花費（金錢）；成本 (三態 cost-cost-cost)", "會考不規則動詞", "cost a lot", "The new smartphone cost three hundred dollars.", "這款新智慧型手機花費了三百美元。", "事物當主詞！物 + cost + 人 + 金錢。三態同形！"),
    ("cut", "cut", "/kʌt/", "v.", "剪切、切斷 (三態 cut-cut-cut)", "會考不規則動詞", "cut paper", "Use safety scissors to cut the colored paper carefully.", "請使用安全剪刀仔細剪裁色紙。", "三態同形：cut ➔ cut ➔ cut"),
    ("hit", "hit", "/hɪt/", "v. / n.", "擊打、襲擊 (三態 hit-hit-hit)", "會考不規則動詞", "hit a baseball", "The batter hit the baseball over the fence.", "擊球手將棒球打出了全壘打牆外。", "三態同形：hit ➔ hit ➔ hit"),
    ("hurt", "hurt", "/hɝːt/", "v. / adj.", "傷害、使疼痛；受傷的 (三態 hurt-hurt-hurt)", "會考不規則動詞", "hurt one's leg", "He hurt his ankle while playing soccer yesterday.", "他昨天踢足球時傷到了腳踝。", "三態同形：hurt ➔ hurt ➔ hurt"),
    ("let", "let", "/lɛt/", "v.", "讓、允許 (使役動詞，三態 let-let-let)", "會考不規則動詞", "let me know", "Please let me know if you need any assistance.", "如果你需要任何協助請讓我知道。", "使役動詞！後接受詞 + 原形動詞。三態同形！"),
    ("put", "put", "/pʊt/", "v.", "放置、安放 (三態 put-put-put)", "會考不規則動詞", "put on (穿上)", "Put on your heavy coat before going outdoors.", "出門前穿上你的厚大衣。", "三態同形：put ➔ put ➔ put"),
    ("quit", "quit", "/kwɪt/", "v.", "戒除、放棄 (三態 quit-quit-quit)", "會考不規則動詞", "quit smoking", "Dad decided to quit smoking for the sake of his health.", "為了身體健康爸爸決定戒菸。", "quit 後接 V-ing。三態同形！"),
    ("shut", "shut", "/ʃʌt/", "v. / adj.", "關閉；合上的 (三態 shut-shut-shut)", "會考不規則動詞", "shut the door", "Please shut the window because the wind is getting cold.", "請關上窗戶，因為風越來越涼了。", "三態同形：shut ➔ shut ➔ shut"),
    ("bite", "bite", "/baɪt/", "v. / n.", "咬、叮咬 (三態 bite-bit-bitten)", "會考不規則動詞", "mosquito bite", "Be careful; that stray dog might bite if frightened.", "請小心，那隻流浪狗如果受驚可能會咬人。", "三態：bite ➔ bit ➔ bitten /ˈbɪt.ən/"),
    ("forgive", "for - give", "/fɚˈɡɪv/", "v.", "原諒、寬恕 (三態 forgive-forgave-forgiven)", "會考不規則動詞", "forgive mistakes", "True friends readily forgive each other's mistakes.", "真正的朋友總會寬恕彼此的過失。", "三態：forgive ➔ forgave ➔ forgiven"),
    ("understand", "un - der - stand", "/ˌʌn.dɚˈstænd/", "v.", "理解、明白 (三態 understand-understood-understood)", "會考不規則動詞", "understand grammar", "Do you understand what the teacher just explained?", "你理解老師剛才說明的內容了嗎？", "三態：understand ➔ understood ➔ understood"),

    # 思維認知與心智概念
    ("knowledge", "knowl - edge", "/ˈnɑː.lɪdʒ/", "n.", "知識 (不可數)", "心智與思維", "gain knowledge", "Reading widely is the best way to gain useful knowledge.", "博覽群書是獲取實用知識的最佳途徑。", "k 不發音！knowl /nɑː/ + edge /lɪdʒ/，注意不可數！"),
    ("attitude", "at - ti - tude", "/ˈæt̬.ə.tuːd/", "n.", "態度、心態", "心智與思維", "positive attitude", "A positive learning attitude leads to remarkable progress.", "積極的學習態度能帶來顯著的進步。", "at /æt/ + ti /t̬ə/ + tude /tuːd/"),
    ("habit", "hab - it", "/ˈhæb.ɪt/", "n.", "習慣", "心智與思維", "good habit", "Reading for thirty minutes every day is an excellent habit.", "每天閱讀三十分鐘是一項極佳的習慣。", "hab 短音 /hæb/ + it /ɪt/"),
    ("concept", "con - cept", "/ˈkɑːn.sɛpt/", "n.", "觀念、概念", "心智與思維", "core concept", "Make sure you master the core concepts before the exam.", "考試前務必精熟核心觀念。", "con- + cept (抓取) ➔ 抓取本質 ➔ 概念"),
    ("reality", "re - al - i - ty", "/riˈæl.ə.t̬i/", "n.", "現實、真實狀況", "心智與思維", "face reality", "We must face reality and find practical ways to solve this.", "我們必須面對現實並尋求切實的解決之道。", "real (真實的) ➔ reality"),
    ("wisdom", "wis - dom", "/ˈwɪz.dəm/", "n.", "智慧 (不可數)", "心智與思維", "words of wisdom", "Elders often pass down valuable words of wisdom.", "長者常傳承下寶貴的智慧箴言。", "wise (有智慧的) ➔ wisdom"),

    # 職業、專業與社會角色
    ("scientist", "sci - en - tist", "/ˈsaɪ.ən.tɪst/", "n.", "科學家", "社會與公共事務", "talented scientist", "Scientists are researching clean renewable energy sources.", "科學家們正在研究潔淨的可再生能源。", "science (科學) + -ist (人)"),
    ("engineer", "en - gi - neer", "/ˌɛn.dʒəˈnɪr/", "n.", "工程師", "社會與公共事務", "civil engineer (土木工程師)", "The software engineer designed a powerful mobile app.", "軟體工程師設計了一款強大的行動應用程式。", "engine (引擎/工程) + -eer (專家)"),
    ("doctor", "doc - tor", "/ˈdɑːk.tɚ/", "n.", "醫生、醫師；博士", "社會與公共事務", "see a doctor", "You should see a doctor if your high fever persists.", "如果你的高燒持續不退，你應該去看醫生。", "doc /dɑːk/ + tor /tɚ/"),
    ("nurse", "nurse", "/nɝːs/", "n.", "護理師、護士", "社會與公共事務", "caring nurse", "The caring nurse took gentle care of the young patient.", "貼心的護理師溫柔地照料這位年幼的病患。", "ur 發捲舌長音 /ɝː/"),
    ("officer", "of - fi - cer", "/ˈɑː.fɪ.sɚ/", "n.", "警官、官員", "社會與公共事務", "police officer", "The police officer directed traffic at the busy crossroads.", "警官在繁忙的十字路口指揮交通。", "office (辦公室) ➔ officer"),
    ("musician", "mu - si - cian", "/mjuːˈzɪʃ.ən/", "n.", "音樂家", "社會與公共事務", "talented musician", "The classical musician played the violin beautifully.", "那位古典音樂家優美地演奏了小提琴。", "music (音樂) + -ian (專家)"),

    # 會考高頻易混淆字組 (Commonly Confused Pairs)
    ("borrow", "bor - row", "/ˈbɑːr.oʊ/", "v.", "向（他人）借入", "會考易混淆字", "borrow sth from sb", "Can I borrow your English dictionary for today's lesson?", "今天的課我可以向你借用英文字典嗎？", "向外借入！borrow + 物 + from + 人"),
    ("lend", "lend", "/lɛnd/", "v.", "借出（給他人）(三態 lend-lent-lent)", "會考易混淆字", "lend sth to sb", "He kindly lent his spare umbrella to his classmate.", "他親切地將備用雨傘借給了他的同學。", "借出給人！lend + 物 + to + 人。三態：lend ➔ lent ➔ lent"),
    ("affect", "af - fect", "/əˈfɛkt/", "v.", "影響、對...產生作用 (動詞)", "會考易混淆字", "affect health", "Lack of sleep can seriously affect your academic performance.", "睡眠不足會嚴重影響你的學業表現。", "動詞！以 a 起首。常考：Smoking affects health."),
    ("effect", "ef - fect", "/ɪˈfɛkt/", "n.", "影響、效果 (名詞)", "會考易混淆字", "have an effect on", "Regular exercise has a positive effect on your immune system.", "規律運動對你的免疫系統有正面的良好效果。", "名詞！以 e 起首。常考片語：have an effect on..."),
    ("accept", "ac - cept", "/əkˈsɛpt/", "v.", "接受、收下", "會考易混淆字", "accept an invitation", "She gladly accepted the invitation to the birthday party.", "她欣然接受了參加生日派對的邀請。", "ac- (朝向) + cept (收下) ➔ 接受"),
    ("except", "ex - cept", "/ɪkˈsɛpt/", "prep.", "除了...之外 (不包含)", "會考易混淆字", "all except", "Everyone passed the examination except John.", "除了約翰之外，每個人都通過了考試。", "ex- (排除在外) ➔ 不包含在內！"),
    ("beside", "be - side", "/bɪˈsaɪd/", "prep.", "在...旁邊 (位置)", "會考易混淆字", "sit beside", "Come and sit beside me so we can read together.", "過來坐在我身旁，這樣我們可以一起閱讀。", "be + side ➔ 在旁邊"),
    ("besides", "be - sides", "/bɪˈsaɪdz/", "prep. / adv.", "除了...之外還有；此外", "會考易混淆字", "besides English", "Besides English, she also speaks fluent Japanese and Spanish.", "除了英文之外，她還能說流利的日文與西班牙文。", "字尾多個 s ➔ 表「加上、還有」！")
]

def main():
    elem_total = ELEM_BASE + ELEM_MORE + ELEM_TIER2
    junior_total = JUNIOR_BASE + JUNIOR_MORE + JUNIOR_TIER2

    print(f"Grand Total Elementary: {len(elem_total)}")
    print(f"Grand Total Junior High: {len(junior_total)}")

    import build_full_school_vocab
    build_full_school_vocab.ELEM_DATA = elem_total
    build_full_school_vocab.JUNIOR_DATA = junior_total

    js = build_full_school_vocab.generate_js()
    with open('dist/school_word_data.mjs', 'w', encoding='utf-8') as f:
        f.write(js)
    with open('site/dist/school_word_data.mjs', 'w', encoding='utf-8') as f:
        f.write(js)
    print("dist/school_word_data.mjs & site/dist/school_word_data.mjs updated.")

if __name__ == '__main__':
    main()
