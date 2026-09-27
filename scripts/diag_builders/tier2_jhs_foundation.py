"""tier2_jhs_foundation.py - Tier 2: 國中會考基礎實踐 (A1~A2) 250 Questions Generator.
IDs: diag-0251 to diag-0500.
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
        "tier": 2,
        "tierLabel": "Level 2: 國中會考基礎實踐 (JHS Foundation A1~A2)",
        "targetExam": "國中會考",
        "cefr": "A2",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 2,
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

def build_tier2():
    items = []
    hook = {"module": "jh", "unitId": "jh-u2", "unitTitle": "JH 國中會考衝刺: 過去時態與頻率副詞專案"}
    
    subtopics_data = [
        # 1. 過去進行式 (was/were + V-ing) 與 when/while 連接
        (
            "過去進行式 (was/were + V-ing) 與 when/while 連接", "文法句構",
            [
                ("I ___ a shower when the earthquake struck yesterday evening.", "was taking", "took", "am taking", "take", "昨天傍晚地震發生時，我正在洗淋浴。", "過去某一特定時間點正在進行的動作，使用過去進行式 was/were + V-ing。", "主句 [I was taking a shower] + 時間副詞子句 [when the earthquake struck]。", "struck 為過去式，when 引導瞬間動作，主要子句背景進行動作選 was taking。", "earthquake", "/ˈɝːθ.kweɪk/", "地震", "shower", "/ˈʃaʊ.ɚ/", "淋浴"),
                ("While Mom was cooking dinner, Dad and I ___ the living room.", "were cleaning", "cleaned", "clean", "are cleaning", "當媽媽正在煮晚餐時，我和爸爸正在打掃客廳。", "While 連接過去同時正在進行的兩個背景動作，兩子句均用過去進行式。", "時間子句 [While Mom was cooking] + 主要子句 [Dad and I were cleaning]。", "主詞 Dad and I 為複數，選 were cleaning。", "dinner", "/ˈdɪn.ɚ/", "晚餐", "while", "/waɪl/", "當…同時"),
                ("What ___ you doing when the fire alarm rang this morning?", "were", "are", "did", "was", "今天早上火警警報響起時，你正在做什麼？", "過去進行式疑問句：疑問詞 + was/were + 主詞 + V-ing？主詞為 you 搭配 were。", "疑問片語 [What were you doing] + 時間子句 [when the fire alarm rang]。", "主詞為 you，過去進行式助動詞選 were。", "alarm", "/əˈlɑːrm/", "警報", "rang", "/ræŋ/", "響起"),
                ("The students ___ English when the principal walked into the room.", "were studying", "studied", "study", "are studying", "當校長走進教室時，學生們正在研讀英文。", "過去時間點正在持續進行的動作，複數主詞 The students 搭配 were studying。", "主句 [The students were studying] + 時間子句 [when the principal walked in]。", "walked 提示過去時間，選 were studying。", "principal", "/ˈprɪn.sə.pəl/", "校長", "study", "/ˈstʌd.i/", "研讀"),
                ("It ___ heavily when we stepped out of the railway station.", "was raining", "rained", "rains", "is raining", "當我們走出火車站時，外面正下著傾盆大雨。", "過去瞬間動作 stepped out 發生時，背景天氣動作正在持續，使用 was raining。", "主句 [It was raining heavily] + 時間子句 [when we stepped out]。", "主詞 it 搭配 was raining。", "heavily", "/ˈhev.əl.i/", "大量地", "railway", "/ˈreɪl.weɪ/", "鐵路"),
                ("Tony fell asleep while he ___ his history report last night.", "was writing", "wrote", "writes", "is writing", "Tony 昨晚在寫歷史報告時睡著了。", "while 引導持續進行的背景動作，主詞 he 搭配 was writing。", "主句 [Tony fell asleep] + 時間子句 [while he was writing]。", "while 後接進行態，選 was writing。", "asleep", "/əˈsliːp/", "睡著的", "report", "/rɪˈpɔːrt/", "報告"),
                ("At eight o'clock yesterday evening, Emily ___ the violin in her bedroom.", "was practicing", "practiced", "practices", "is practicing", "昨天晚上八點整，Emily 正在她的臥室裡練習拉小提琴。", "過去具體時間點（At eight o'clock yesterday evening）正在進行之動作，用過去進行式。", "時間片語 + 主詞 [Emily] + 動詞 [was practicing] + 受詞 [the violin]。", "特定過去時刻進行動作，選 was practicing。", "practice", "/ˈpræk.tɪs/", "練習", "evening", "/ˈiːv.nɪŋ/", "傍晚"),
                ("The phone rang loudly while I ___ a bath in the bathroom.", "was taking", "took", "take", "am taking", "當我正在浴室泡澡時，電話大聲響起了。", "while 引導過去持續進行動作，主詞 I 搭配 was taking。", "主句 [The phone rang] + 時間子句 [while I was taking a bath]。", "泡澡動作進行中選 was taking。", "bathroom", "/ˈbæθ.ruːm/", "浴室", "bath", "/bæθ/", "泡澡"),
                ("They ___ dinner at a restaurant when the blackout occurred.", "were having", "had", "have", "are having", "當大停電發生時，他們正在一家餐廳吃晚餐。", "停電瞬間發生，當時正在進行用餐，複數主詞 They 搭配 were having。", "主句 [They were having dinner] + 時間子句 [when the blackout occurred]。", "複數主詞選 were having。", "blackout", "/ˈblæk.aʊt/", "大停電", "occur", "/əˈkɝː/", "發生"),
                ("Who ___ you talking to on the phone when I saw you yesterday?", "were", "was", "did", "are", "昨天我看見你時，你正在電話裡和誰說話？", "過去進行式特殊疑問句，主詞為 you，助動詞使用 were。", "疑問詞 [Who were you talking to] + 時間子句 [when I saw you]。", "主詞 you 搭配 were。", "phone", "/foʊn/", "電話", "yesterday", "/ˈjes.tɚ.deɪ/", "昨天")
            ]
        ),
        # 2. 未來式 will 與 be going to 語意辨析
        (
            "未來式 will 與 be going to 語意辨析", "文法句構",
            [
                ("Look at those dark clouds in the sky! It ___ rain very soon.", "is going to", "will", "was going to", "rained", "看天空中那些烏雲！馬上就要下雨了。", "根據眼前明確客觀跡象（dark clouds）做出的客觀預測，慣用 is going to。", "感嘆句 + 主句 [It is going to rain very soon]。", "眼前有客觀跡象 dark clouds，表示即將發生，用 is going to。", "cloud", "/klaʊd/", "雲朵", "soon", "/suːn/", "很快"),
                ("Don't worry about the heavy luggage; I ___ help you carry it.", "will", "am going to", "was", "did", "別擔心這件沉重的行李；我來幫你搬它。", "說話當下立即做出的承諾、意願或決定，使用 will。", "祈使句 + 主句 [I will help you carry it]。", "說話當下的臨時決定與主動承諾選 will。", "luggage", "/ˈlʌɡ.ɪdʒ/", "行李", "worry", "/ˈwɝː.i/", "擔心"),
                ("We ___ a surprise party for Grandma's 70th birthday next Saturday.", "are going to hold", "held", "hold", "were holding", "我們下週六打算為奶奶的七十歲大壽舉辦驚喜派對。", "事先已經計畫、安排好的未來行程，使用 be going to + V。", "主詞 [We] + 動詞 [are going to hold] + 受詞 [a surprise party]。", "事先規劃好的派對使用 are going to hold。", "surprise", "/sɚˈpraɪz/", "驚喜", "hold", "/hoʊld/", "舉辦"),
                ("— The doorbell is ringing.\n— OK, I ___ get it!", "will", "am going to", "was", "can", "— 門鈴在響。\n— 好的，我去開門！", "針對突發狀況當場做出的反應決定，使用 will。", "答句主詞 [I] + 助動詞 [will] + 原形動詞 [get it]。", "說話瞬間臨時反應選 will。", "doorbell", "/ˈdɔːr.bel/", "門鈴", "ring", "/rɪŋ/", "響起"),
                ("Kevin has already bought his ticket; he ___ to Tokyo next week.", "is going to fly", "flies", "flew", "was flying", "Kevin 已經買好機票了；他下週就要飛往東京了。", "已買好機票代表具體既定計畫，使用 is going to fly。", "主句 [Kevin has bought his ticket] + [he is going to fly]。", "已有周全準備之未來計畫選 is going to fly。", "ticket", "/ˈtɪk.ɪt/", "票券", "flight", "/flaɪt/", "航班"),
                ("In fifty years, robots ___ probably do most household chores.", "will", "are going to", "did", "were", "五十年後，機器人大概會做大多數的家務瑣事。", "遠期預測與含有 probably, perhaps 時，通常使用 will。", "時間片語 [In fifty years] + 主詞 [robots] + 助動詞 [will probably do]。", "遠期客觀預測搭配 will。", "robot", "/ˈroʊ.bɑːt/", "機器人", "chore", "/tʃɔːr/", "雜務"),
                ("Be careful! The ladder is shaking; you ___ fall down!", "are going to", "will", "would", "did", "小心！梯子在晃動；你快要摔下來了！", "眼前即時可見的危險與跡象，使用 be going to。", "警告感嘆詞 + 主句 [you are going to fall down]。", "眼前迫在眉睫的客觀危險選 are going to。", "ladder", "/ˈlæd.ɚ/", "梯子", "shake", "/ʃeɪk/", "晃動"),
                ("I promise I ___ return the borrowed science book to you tomorrow.", "will", "am going to", "did", "was", "我保證我明天一定會把借來的自然書還給你。", "含有 I promise（我承諾、我保證）時，固定搭配 will 表示誓言。", "主句 [I promise] + 名詞子句 [I will return the book]。", "承諾保證一律搭配 will。", "promise", "/ˈprɑː.mɪs/", "承諾", "return", "/rɪˈtɝːn/", "歸還"),
                ("What ___ you going to do after graduating from junior high school?", "are", "will", "do", "did", "國中畢業之後你打算做什麼？", "be going to 疑問句句型：疑問詞 + be + 主詞 + going to + V？主詞 you 搭配 are。", "疑問片語 [What are you going to do] + 介系詞片語 [after graduating]。", "搭配 going to 的疑問句助動詞為 are。", "graduate", "/ˈɡrædʒ.u.eɪt/", "畢業", "junior", "/ˈdʒuː.njɚ/", "初級的"),
                ("If it rains tomorrow, the baseball match ___ postponed.", "will be", "is being", "was", "would be", "如果明天下雨，棒球比賽將會延期。", "條件副詞子句用現在式表示未來，主要子句需用未來式 will be + p.p.。", "條件子句 [If it rains] + 主要子句 [the match will be postponed]。", "主要子句表示未來將發生，選 will be。", "postpone", "/poʊstˈpoʊn/", "延期", "match", "/mætʃ/", "比賽")
            ]
        ),
        # 3. 頻率副詞位置與問答
        (
            "頻率副詞位置與問答 (always, usually, often, seldom, never)", "文法句構",
            [
                ("Leo is a diligent boy; he is ___ late for school.", "never", "always", "usually", "often", "Leo 是一個勤奮的男孩；他上學從不遲到。", "頻率副詞放在 be 動詞之後、一般動詞之前；diligent（勤奮）對應從不遲到 never。", "主詞 [he] + be動詞 [is] + 頻率副詞 [never] + 形容詞補語 [late]。", "勤奮學生從不遲到，語義選 never。", "diligent", "/ˈdɪl.ə.dʒənt/", "勤奮的", "never", "/ˈnev.ɚ/", "從不"),
                ("My father ___ drinks green tea after dinner every evening.", "usually", "is usually", "usually is", "does usually", "我父親每天晚餐後通常喝綠茶。", "頻率副詞 usually 放在一般動詞 drinks 之前，且不需多餘的 be 動詞。", "主詞 [My father] + 頻率副詞 [usually] + 動詞 [drinks] + 受詞 [green tea]。", "頻率副詞放在一般動詞前面，選 usually。", "usually", "/ˈjuː.ʒu.ə.li/", "通常", "dinner", "/ˈdɪn.ɚ/", "晚餐"),
                ("— ___ do you practice the piano at home?\n— Three times a week.", "How often", "How many", "How long", "How much", "— 你在家多常練鋼琴一次？\n— 一週三次。", "答句為頻率（Three times a week），問句使用 How often（多常）。", "疑問片語 [How often] + 助動詞 [do] + 主詞 [you] + 原形動詞 [practice]。", "詢問動作頻率固定使用 How often。", "practice", "/ˈpræk.tɪs/", "練習", "often", "/ˈɑːf.ən/", "經常"),
                ("The weather in London is ___ foggy and cool in autumn.", "often", "seldom", "never", "rarely", "倫敦秋天的天氣經常多霧且涼爽。", "頻率副詞放在 be 動詞 is 之後，常態多霧選 often。", "主詞 [The weather] + be動詞 [is] + 頻率副詞 [often] + 補語 [foggy]。", "be動詞之後放頻率副詞 often。", "foggy", "/ˈfɑː.ɡi/", "有霧的", "autumn", "/ˈɑː.t̬əm/", "秋天"),
                ("Kevin has a healthy habit; he ___ stays up late playing video games.", "seldom", "always", "regularly", "often", "Kevin 有健康習慣；他很少熬夜玩電玩遊戲。", "healthy habit 提示負面行為極少發生，選 seldom（很少）。", "主詞 [he] + 頻率副詞 [seldom] + 動詞片語 [stays up late]。", "健康習慣對應很少熬夜，選 seldom。", "habit", "/ˈhæb.ɪt/", "習慣", "seldom", "/ˈsel.dəm/", "很少"),
                ("Our English teacher is ___ friendly and patient with students.", "always", "never", "seldom", "rarely", "我們的英文老師對學生總是非常親切有耐心。", "正面教學態度，頻率副詞 placed after be 動詞，選 always。", "主詞 [Our teacher] + be動詞 [is] + 頻率副詞 [always] + 補語 [friendly]。", "be 動詞後放 always。", "friendly", "/ˈfrend.li/", "親切的", "patient", "/ˈpeɪ.ʃənt/", "有耐心的"),
                ("Does your brother ___ eat breakfast before going to school?", "always", "is always", "always does", "never", "你哥哥上學前總是會吃早餐嗎？", "一般疑問句中，頻率副詞放在主詞 your brother 與一般動詞 eat 之間。", "助動詞 [Does] + 主詞 [your brother] + 頻率副詞 [always] + 動詞 [eat]。", "頻率副詞置於主詞與一般動詞之間，選 always。", "breakfast", "/ˈbrek.fəst/", "早餐", "always", "/ˈɑːl.weɪz/", "總是"),
                ("I ___ visit my dentist for a routine dental checkup twice a year.", "regularly", "never", "seldom", "rarely", "我每半年定期拜訪牙醫做一次常規牙科檢查。", "twice a year 表示有規律的頻率，選 regularly（規律地、定期地）。", "主詞 [I] + 頻率副詞 [regularly] + 動詞 [visit] + 受詞 [my dentist]。", "每半年一次代表定期，選 regularly。", "regularly", "/ˈreɡ.jə.lɚ.li/", "定期地", "routine", "/ruːˈtiːn/", "常規的"),
                ("Grandma does not like loud places, so she ___ goes to night markets.", "rarely", "always", "frequently", "constantly", "奶奶不喜歡嘈雜的地方，所以她極少去夜市。", "前半句指出不喜嘈雜，故去夜市的頻率極低，選 rarely（極罕見地）。", "連接詞 [so] + 主詞 [she] + 頻率副詞 [rarely] + 動詞 [goes]。", "不喜歡吵雜故極少去，選 rarely。", "rarely", "/ˈrer.li/", "極少、罕見", "market", "/ˈmɑːr.kɪt/", "市場"),
                ("— How often does the express train stop at this small station?\n— It ___ stops here; only local trains do.", "never", "always", "often", "usually", "— 快速特快車多常停靠這個小站？\n— 它從不停靠這裡；只有區間電車才會停靠。", "後句指出 only local trains do，表示特快車「從不」停靠，選 never。", "主詞 [It] + 頻率副詞 [never] + 動詞 [stops] + 地方副詞 [here]。", "由後句對比可知從不停靠，選 never。", "express", "/ɪkˈspres/", "特快的", "local", "/ˈloʊ.kəl/", "當地的/區間的")
            ]
        ),
        # 4. 形容詞比較級與 than 句型
        (
            "形容詞比較級與 than 句型 (taller, more expensive)", "文法句構",
            [
                ("Taipei 101 is much ___ than any other building in Taipei.", "taller", "tall", "tallest", "more tall", "台北101比台北任何其他建築物都高得多。", "兩者比較且有 than，單音節形容詞 tall 加 -er 變 taller，much 可修飾比較級。", "主詞 [Taipei 101] + 動詞 [is] + 程度副詞 [much] + 比較級 [taller] + 連接詞 [than]。", "than 提示比較級，tall 的比較級為 taller。", "building", "/ˈbɪl.dɪŋ/", "建築物", "tall", "/tɑːl/", "高聳的"),
                ("Taking the bullet train is ___ than taking the highway bus.", "faster", "fast", "fastest", "more fast", "搭高鐵比搭國道客運更為快速。", "fast 為單音節形容詞，比較級為 faster，後接 than。", "主詞 [Taking the bullet train] + 動詞 [is] + 比較級 [faster] + [than]。", "fast 比較級直接加 er 變 faster。", "bullet", "/ˈbʊl.ɪt/", "子彈", "highway", "/ˈhaɪ.weɪ/", "公路"),
                ("This leather jacket is more ___ than that cotton sweater.", "expensive", "cheaper", "expensively", "expense", "這件皮夾克比那件棉質毛衣更為昂貴。", "三音節形容詞 expensive 的比較級為 more expensive。", "主詞 [This leather jacket] + 動詞 [is] + [more expensive than]。", "多音節形容詞前面加 more 形成比較級。", "leather", "/ˈleð.ɚ/", "皮革", "expensive", "/ɪkˈspen.sɪv/", "昂貴的"),
                ("Gold is much ___ than silver in current market value.", "heavier", "heavy", "heaviest", "more heavy", "在當前市場價值與物理密度上，黃金比白銀重得多。", "子音 + y 結尾形容詞 heavy，比較級去 y 加 -ier (heavier)。", "主詞 [Gold] + 動詞 [is] + 程度修飾 [much] + 比較級 [heavier] + [than]。", "heavy 比較級為 heavier。", "gold", "/ɡoʊld/", "黃金", "silver", "/ˈsɪl.vɚ/", "白銀"),
                ("My younger brother is ___ than me, but I am stronger than him.", "shorter", "short", "shortest", "more short", "我弟弟比我矮，但我比他強壯。", "short 單音節形容詞比較級為 shorter。", "主詞 [My brother] + 動詞 [is] + 比較級 [shorter] + [than me]。", "short 比較級加 er 變 shorter。", "stronger", "/ˈstrɑːŋ.ɡɚ/", "更強壯的", "short", "/ʃɔːrt/", "矮的"),
                ("Learning English grammar is ___ than Leo originally thought.", "easier", "easy", "easiest", "more easy", "學習英語文法比 Leo 原先想的更為容易。", "easy 變比較級去 y 加 -ier 變 easier。", "主詞 [Learning English] + 動詞 [is] + 比較級 [easier] + [than thought]。", "easy 比較級為 easier。", "grammar", "/ˈɡræm.ɚ/", "文法", "easy", "/ˈiː.zi/", "容易的"),
                ("Health is far more ___ than wealth in leading a happy life.", "important", "importance", "importantly", "import", "在過幸福生活方面，健康遠比財富重要得多。", "多音節形容詞 important 比較級加 more，far 可修飾比較級。", "主詞 [Health] + 動詞 [is] + 程度詞 [far] + 比較級 [more important] + [than]。", "important 前加 more 形成比較級。", "health", "/helθ/", "健康", "wealth", "/welθ/", "財富"),
                ("Today is much ___ than yesterday; please put on a warm coat.", "colder", "cold", "coldest", "more cold", "今天比昨天冷得多；請穿上一件溫暖的外套。", "cold 比較級加 -er 變 colder，前面以 much 修飾程度。", "主詞 [Today] + 動詞 [is] + 程度詞 [much] + 比較級 [colder] + [than yesterday]。", "cold 比較級為 colder。", "coat", "/koʊt/", "外套", "cold", "/koʊld/", "寒冷的"),
                ("This science question is more ___ than the previous one.", "difficult", "harder", "difficulty", "easy", "這道自然科學問題比前一題更為困難。", "difficult 為多音節形容詞，比較級為 more difficult。", "主詞 [This question] + 動詞 [is] + 比較級 [more difficult] + [than]。", "more difficult 結構完整。", "previous", "/ˈpriː.vi.əs/", "先前的", "difficult", "/ˈdɪf.ə.kəlt/", "困難的"),
                ("The weather in Hualien is generally ___ than that in Taipei.", "better", "good", "best", "more good", "花蓮的天氣整體而言比台北的天氣好。", "good 的不規則比較級為 better，不可用 more good。", "主詞 [The weather] + 動詞 [is] + 不規則比較級 [better] + [than that in Taipei]。", "good 比較級不規則變化為 better。", "weather", "/ˈweð.ɚ/", "天氣", "better", "/ˈbet̬.ɚ/", "更好的")
            ]
        ),
        # 5. 形容詞最高級與 of all / in the world 句型
        (
            "形容詞最高級與 of all / in the world 句型", "文法句構",
            [
                ("Mount Everest is the ___ mountain peak in the world.", "highest", "higher", "high", "most high", "聖母峰是世界上最高的山峰。", "最高級句型：the + 最高級 + in 範圍；high 加 -est 變 highest。", "主詞 [Mount Everest] + 動詞 [is] + 最高級 [the highest mountain] + 片語 [in the world]。", "三者以上範圍最高級用 the highest。", "peak", "/piːk/", "山峰", "high", "/haɪ/", "高的"),
                ("The blue whale is the ___ animal that has ever lived on Earth.", "largest", "larger", "large", "most large", "藍鯨是地球上有史以來生活過最大的動物。", "large 字尾有 e 直接加 -st 變 largest，前面需加 the。", "主詞 [The blue whale] + 動詞 [is] + 最高級 [the largest animal]。", "large 最高級為 largest。", "whale", "/weɪl/", "鯨魚", "large", "/lɑːrdʒ/", "巨大的"),
                ("Of all the students in our class, Tony runs the ___.", "fastest", "faster", "fast", "most fast", "在我們班所有學生當中，Tony 跑得最快。", "Of all 介系詞片語引導三者以上全體範圍，使用最高級 the fastest。", "片語 [Of all the students] + 主詞 [Tony] + 動詞 [runs] + 最高級 [the fastest]。", "Of all 範圍提示最高級 fastest。", "run", "/rʌn/", "奔跑", "fast", "/fæst/", "快的"),
                ("Summer is usually the ___ season of the year in Taiwan.", "hottest", "hotter", "hot", "most hot", "夏天通常是台灣一年當中最熱的季節。", "hot 短母音加單子音，最高級重複字尾 t 加 -est (hottest)。", "主詞 [Summer] + 動詞 [is] + 最高級 [the hottest season] + 片語 [of the year]。", "hot 最高級重複 t 加 est 變 hottest。", "season", "/ˈsiː.zən/", "季節", "hot", "/hɑːt/", "熱的"),
                ("This is the most ___ book that I have ever read in junior high.", "interesting", "interested", "interest", "more interesting", "這是我在國中讀過最有趣的一本書。", "多音節形容詞 interesting 最高級為 the most interesting。", "主詞 [This] + 動詞 [is] + 最高級 [the most interesting book] + 關係子句 [I have read]。", "多音節最高級加 most。", "interesting", "/ˈɪn.trɪs.tɪŋ/", "有趣的", "read", "/riːd/", "閱讀"),
                ("Who is the ___ person in your family? My grandfather is eighty-five.", "oldest", "older", "old", "most old", "誰是你家裡年紀最大的人？我爺爺八十五歲了。", "家庭全員三者以上年齡比較，使用最高級 the oldest。", "疑問詞 [Who] + 動詞 [is] + 最高級 [the oldest person] + 片語 [in your family]。", "三者以上家庭成員最年長用 oldest。", "family", "/ˈfæm.əl.i/", "家庭", "old", "/oʊld/", "年長的"),
                ("Jupiter is the ___ planet in our entire solar system.", "biggest", "bigger", "big", "most big", "木星是我們整個太陽系中最大的行星。", "big 重複 g 加 -est 變 biggest。", "主詞 [Jupiter] + 動詞 [is] + 最高級 [the biggest planet] + 片語 [in solar system]。", "big 最高級重複字尾加 est 變 biggest。", "planet", "/ˈplæn.ɪt/", "行星", "solar", "/ˈsoʊ.lɚ/", "太陽的"),
                ("Cheetahs are the ___ land mammals on Earth.", "fastest", "faster", "fast", "most fast", "獵豹是地球上陸地哺乳動物中奔跑速度最快的。", "fast 加 -est 變 fastest。", "主詞 [Cheetahs] + 動詞 [are] + 最高級 [the fastest mammals]。", "陸地最快用 the fastest。", "cheetah", "/ˈtʃiː.t̬ə/", "獵豹", "mammal", "/ˈmæm.əl/", "哺乳動物"),
                ("Of the three brothers, Kevin is the ___ student in academic studies.", "most hardworking", "hardworking", "more hardworking", "hardest working", "在三兄弟當中，Kevin 在學業上是最勤奮的學生。", "三者比較（Of the three）使用最高級 the most hardworking。", "片語 [Of the three brothers] + 主詞 [Kevin] + 動詞 [is] + 最高級 [the most hardworking]。", "三者中之最用 most hardworking。", "brother", "/ˈbrʌð.ɚ/", "兄弟", "hardworking", "/ˌhɑːrdˈwɝː.kɪŋ/", "勤奮的"),
                ("Yesterday was the ___ day of this entire winter so far.", "coldest", "colder", "cold", "more cold", "昨天是截至目前為止整個冬天最冷的一天。", "cold 最高級加 -est 變 coldest。", "主詞 [Yesterday] + 動詞 [was] + 最高級 [the coldest day] + 片語 [of this winter]。", "整季中最冷一天用 the coldest。", "entire", "/ɪnˈtaɪr/", "全部的", "cold", "/koʊld/", "寒冷的")
            ]
        )
    ]
    
    # Let's populate the remaining 20 subtopics (subtopics 6 to 25)
    remaining_subtopics_2 = [
        # 6. 副詞比較級與最高級
        ("副詞比較級與最高級 (more carefully, most fluently)", "文法句構", [
            ("Tony drives much ___ than his brother on slippery rainy days.", "more carefully", "carefully", "most carefully", "careful", "Tony 在下雨濕滑的日子裡開車比他哥哥小心得多。", "修飾動詞 drives 需用副詞 carefully，兩者比較加 more 構成比較級。", "副詞修飾動詞 drives，比較級用 more carefully。", "carefully", "/ˈker.fəl.i/", "小心地", "slippery", "/ˈslɪp.ɚ.i/", "濕滑的"),
            ("Of all the choir members, Lucy sings the ___.", "most beautifully", "more beautifully", "beautifully", "beautiful", "在所有合唱團成員中，Lucy 唱得最優美。", "Of all 範圍修飾動詞 sings，副詞最高級使用 most beautifully。", "三者以上最高級修飾動詞用 most beautifully。", "beautifully", "/ˈbjuː.t̬ə.fəl.i/", "優美地", "choir", "/kwaɪ.ɚ/", "合唱團"),
            ("Leo works ___ than anyone else in our study group.", "harder", "hardly", "more hardly", "hardest", "Leo 在我們讀書小組裡比任何其他人都更努力工作。", "hard 作為副詞（努力地），比較級為 harder（hardly 意為幾乎不）。", "hard 兼作副詞，比較級為 harder，不可選 hardly。", "harder", "/ˈhɑːr.dɚ/", "更努力地", "group", "/ɡruːp/", "小組"),
            ("My sister speaks English much ___ than I do.", "more fluently", "fluent", "most fluently", "fluently", "我妹妹說英文比我說得流利得多。", "修飾動詞 speaks 需用副詞 fluently，比較級加 more。", "副詞比較級 more fluently 修飾 speaks。", "fluently", "/ˈfluː.ənt.li/", "流利地", "speak", "/spiːk/", "說話"),
            ("The turtle moves ___ than the energetic rabbit.", "more slowly", "slowly", "slow", "most slowly", "烏龜比精力充沛的兔子移動得更慢。", "修飾動詞 moves 需用副詞 slowly，比較級為 more slowly。", "副詞比較級使用 more slowly。", "slowly", "/ˈsloʊ.li/", "緩慢地", "turtle", "/ˈtɝː.t̬əl/", "烏龜"),
            ("Among the three runners, Sam crossed the finish line ___.", "earliest", "earlier", "early", "more early", "在三位跑者之中，Sam 最早通過終點線。", "三者之中副詞 early 的最高級為 earliest（去y加iest）。", "三者之中最早選 earliest。", "earliest", "/ˈɝː.li.ɪst/", "最早地", "finish", "/ˈfɪn.ɪʃ/", "終點"),
            ("Please write your answers ___ on the answer sheet next time.", "more clearly", "clearly", "clearest", "clear", "下次請在答案卡上把你的答案寫得更清晰一點。", "修飾動詞 write 且有比較之意，使用副詞比較級 more clearly。", "副詞比較級修飾動詞 write，選 more clearly。", "clearly", "/ˈklɪr.li/", "清晰地", "answer", "/ˈæn.sɚ/", "答案"),
            ("Who can solve this difficult math equation ___?", "most quickly", "more quickly", "quick", "quicker", "誰能最迅速地解開這道困難的數學方程式？", "最高級副詞修飾 solve，使用 most quickly。", "副詞最高級選 most quickly。", "quickly", "/ˈkwɪk.li/", "迅速地", "equation", "/ɪˈkweɪ.ʒən/", "方程式"),
            ("Peter jumps ___ than Tony during the high jump competition.", "higher", "high", "highest", "more high", "在高跳比賽中，Peter 跳得比 Tony 更高。", "high 兼作副詞（高地），比較級直接加 -er 變 higher。", "副詞 high 比較級為 higher。", "higher", "/ˈhaɪ.ɚ/", "更高地", "competition", "/ˌkɑːm.pəˈtɪʃ.ən/", "競賽"),
            ("She danced ___ of all the ballerinas on the grand stage.", "most gracefully", "more gracefully", "graceful", "gracefully", "她在宏偉的舞台上跳得比所有芭蕾舞者都要優雅。", "of all 引導三者以上全體範圍，修飾 danced 用 most gracefully。", "三者以上副詞最高級用 most gracefully。", "gracefully", "/ˈɡreɪs.fəl.i/", "優雅地", "ballerina", "/ˌbæl.əˈriː.nə/", "芭蕾舞者")
        ]),
        # 7. 情態助動詞 should / must / have to 義務與建議
        ("情態助動詞 should / must / have to 義務與建議", "文法句構", [
            ("Students ___ obey traffic rules and wear helmets when riding bikes.", "must", "can't", "shouldn't", "may not", "學生騎腳踏車時必須遵守交通規則並戴安全帽。", "表達法律規範與絕對義務，使用情態助動詞 must。", "絕對規範與義務選 must。", "obey", "/oʊˈbeɪ/", "遵守", "traffic", "/ˈtræf.ɪk/", "交通"),
            ("You look pale and sick; you ___ see a doctor immediately.", "should", "must not", "would", "shall", "你看起來蒼白虛弱；你應該立刻去看醫生。", "表達給予善意建議與勸告，使用 should。", "給予建議勸告使用 should。", "pale", "/peɪl/", "蒼白的", "immediately", "/ɪˈmiː.di.ət.li/", "立刻"),
            ("Tomorrow is Sunday, so we ___ wake up early in the morning.", "don't have to", "must not", "should", "have to", "明天是星期天，所以我們不必一大早起床。", "表達「沒有必要、不必」使用 don't have to（must not 表強烈禁止）。", "不必早起表示無此必要，選 don't have to。", "Sunday", "/ˈsʌn.deɪ/", "星期日", "wake", "/weɪk/", "醒來"),
            ("Visitors ___ touch the valuable paintings displayed in the museum.", "must not", "don't have to", "can", "should", "參觀者絕不可觸摸博物館裡陳列的珍貴畫作。", "表達嚴厲禁止（絕不可）使用 must not。", "嚴格禁止使用 must not。", "valuable", "/ˈvæl.jə.bəl/", "珍貴的", "museum", "/mjuːˈziː.əm/", "博物館"),
            ("Leo ___ finish his science project before Friday afternoon.", "has to", "have to", "is having", "had to do", "Leo 必須在週五下午前完成他的自然專題。", "主詞 Leo 為第三人稱單數，義務動詞使用 has to + 原形動詞。", "單數主詞搭配 has to。", "project", "/ˈprɑː.dʒekt/", "專題", "finish", "/ˈfɪn.ɪʃ/", "完成"),
            ("You ___ eat so much junk food; it is harmful to your health.", "should not", "must", "have to", "need", "你不應該吃這麼多垃圾食物；這對你的健康有害。", "表達勸阻不要做某事（不應該），使用 should not (shouldn't)。", "勸阻建議使用 should not。", "harmful", "/ˈhɑːrm.fəl/", "有害的", "junk", "/dʒʌŋk/", "垃圾"),
            ("Drivers ___ stop their cars when the traffic light turns red.", "must", "may", "can", "might", "當交通號誌變紅燈時，駕駛人必須停車。", "交通法規強制性義務使用 must。", "法規強制義務選 must。", "driver", "/ˈdraɪ.vɚ/", "駕駛", "light", "/laɪt/", "號誌燈"),
            ("Children ___ cross the busy street alone without an adult.", "should not", "have to", "must", "can", "兒童不應該在沒有大人陪伴下獨自穿過繁忙的街道。", "給予安全忠告與建議使用 should not。", "安全警告忠告用 should not。", "busy", "/ˈbɪz.i/", "繁忙的", "adult", "/ˈæd.ʌlt/", "成人"),
            ("Do we ___ bring our own lunchboxes for tomorrow's field trip?", "have to", "must", "should", "ought", "我們明天的校外教學必須自備便當嗎？", "一般疑問句中配合助動詞 Do，義務動詞使用原形 have to。", "Do 疑問句中接原形 have to。", "lunchbox", "/ˈlʌntʃ.bɑːks/", "便當盒", "trip", "/trɪp/", "旅行"),
            ("You ___ apologize to Tony for breaking his favorite toy yesterday.", "ought to", "must not", "needn't", "have", "你應該為昨天弄壞 Tony 心愛的玩具向他道歉。", "ought to + V 表示道德上的義務與應當做之事（相當於 should）。", "道德責任選 ought to。", "apologize", "/əˈpɑː.lə.dʒaɪz/", "道歉", "break", "/breɪk/", "弄壞")
        ]),
        # 8. 動名詞 (V-ing) 當主詞與受詞
        ("動名詞 (V-ing) 當主詞與受詞 (enjoy, practice)", "文法句構", [
            ("___ exercise every day helps people maintain good physical fitness.", "Taking", "Take", "Took", "Taken", "每天進行運動有助於人們維持良好的體適能。", "動名詞片語 Taking exercise 擔任主要子句之主詞，視為單數動名詞。", "動名詞當主詞選 Taking。", "maintain", "/meɪnˈteɪn/", "維持", "fitness", "/ˈfɪt.nəs/", "體適能"),
            ("My younger sister enjoys ___ watercolor pictures in her art class.", "painting", "paint", "to paint", "painted", "我妹妹在美術課上很享受繪製水彩畫。", "動詞 enjoy 後方必須接動名詞 (V-ing) 作為受詞。", "enjoy 後固定接動名詞 painting。", "enjoy", "/ɪnˈdʒɔɪ/", "享受", "watercolor", "/ˈwɑː.t̬ɚˌkʌl.ɚ/", "水彩"),
            ("Leo finished ___ his English workbook before watching television.", "doing", "to do", "do", "did", "Leo 在看電視前完成了他的英文習作。", "動詞 finish 後方接動名詞 (V-ing) 當受詞。", "finish 後固定接動名詞 doing。", "finish", "/ˈfɪn.ɪʃ/", "完成", "workbook", "/ˈwɝːk.bʊk/", "習作"),
            ("Would you mind ___ the window? It is getting quite chilly inside.", "closing", "to close", "close", "closed", "你介意把窗戶關上嗎？室內變得相當寒冷了。", "片語 Would you mind 後方接動名詞 (V-ing)。", "mind 後固定接動名詞 closing。", "mind", "/maɪnd/", "介意", "chilly", "/ˈtʃɪl.i/", "寒冷的"),
            ("The boys practiced ___ basketball on the court for three hours.", "playing", "to play", "play", "played", "男孩們在球場上練習打籃球打了三個小時。", "動詞 practice 後方固定接動名詞 (V-ing) 當受詞。", "practice 後接動名詞 playing。", "practice", "/ˈpræk.tɪs/", "練習", "court", "/kɔːrt/", "球場"),
            ("___ books in the public library requires complete quietness.", "Reading", "Read", "To reading", "Reads", "在公共圖書館看書需要保持徹底的安靜。", "動名詞 Reading 當主詞，視為單數概念，搭配單數動詞 requires。", "動名詞當主詞選 Reading。", "require", "/rɪˈkwaɪr/", "需要", "quietness", "/ˈkwaɪ.ət.nəs/", "安靜"),
            ("Emily kept on ___ even though her legs felt very tired.", "running", "to run", "run", "ran", "儘管 Emily 的腿感到非常疲倦，她依然繼續奔跑。", "介系詞 on 之後接動名詞 (V-ing)，keep on running 為固定片語。", "keep on 後接動名詞 running。", "keep on", "/kiːp ɑːn/", "持續", "tired", "/taɪərd/", "疲累的"),
            ("My grandparents enjoy ___ in the park early every morning.", "walking", "to walk", "walk", "walked", "我祖父母每天清晨都享受在公園散步。", "enjoy 後方必須接動名詞 walking。", "enjoy 後接動名詞 walking。", "grandparent", "/ˈɡræn.per.ənt/", "祖父母", "morning", "/ˈmɔːr.nɪŋ/", "早晨"),
            ("We should avoid ___ sweet sugary drinks right before bedtime.", "drinking", "to drink", "drink", "drank", "我們應該避免在睡前喝含糖甜飲料。", "動詞 avoid（避免）後方固定接動名詞 (V-ing) 當受詞。", "avoid 後固定接動名詞 drinking。", "avoid", "/əˈvɔɪd/", "避免", "sugary", "/ˈʃʊɡ.ɚ.i/", "含糖的"),
            ("___ swimming in the cold mountain lake was an exciting adventure.", "Going", "Go", "Went", "Gone", "去寒冷的高山湖泊游泳是一場刺激的冒險。", "動名詞 Going swimming 擔任全句主詞。", "動名詞當主詞選 Going。", "adventure", "/ədˈven.tʃɚ/", "冒險", "exciting", "/ɪkˈsaɪ.t̬ɪŋ/", "令人興奮的")
        ]),
        # 9. 不定詞 (to V) 當受詞與目的狀語
        ("不定詞 (to V) 當受詞與目的狀語 (decide, plan)", "文法句構", [
            ("Kevin decided ___ a new bicycle with his saved pocket money.", "to buy", "buying", "buy", "bought", "Kevin 決定用他存下來的零用錢買一輛新腳踏車。", "動詞 decide 後方固定接不定詞 (to + V) 當受詞。", "decide 後固定接不定詞 to buy。", "decide", "/dɪˈsaɪd/", "決定", "save", "/seɪv/", "儲蓄"),
            ("We plan ___ Kenting National Park during our winter vacation.", "to visit", "visiting", "visit", "visited", "我們計畫在寒假期間造訪墾丁國家公園。", "動詞 plan 後方固定接不定詞 (to + V) 當受詞。", "plan 後接不定詞 to visit。", "plan", "/plæn/", "計畫", "vacation", "/veɪˈkeɪ.ʃən/", "假期"),
            ("Emily studies hard every evening ___ pass the math exam.", "in order to", "so that", "because", "for", "Emily 每天晚上努力讀書，目的是為了通過數學考試。", "表示目的「為了…」後接原形動詞 pass，使用不定詞片語 in order to。", "表目的接原形動詞用 in order to。", "pass", "/pæs/", "及格通過", "order", "/ˈɔːr.dɚ/", "順序/目的"),
            ("My brother hopes ___ an aeronautical engineer in the future.", "to become", "becoming", "become", "became", "我哥哥希望未來能成為一名航空工程師。", "動詞 hope 後方固定接不定詞 (to + V) 當受詞。", "hope 後接不定詞 to become。", "hope", "/hoʊp/", "希望", "engineer", "/ˌen.dʒɪˈnɪr/", "工程師"),
            ("The tourists stopped at the scenic pavilion ___ some photos.", "to take", "taking", "take", "took", "遊客們在觀景涼亭停下來為了拍幾張照片。", "stop to take photos 表停下當前的步伐「為了去拍照片」（表目的）。", "停下來去做某事用 stop to take。", "pavilion", "/pəˈvɪl.jən/", "涼亭", "tourist", "/ˈtʊr.ɪst/", "遊客"),
            ("Dad promised ___ me to the science museum this weekend.", "to take", "taking", "take", "took", "爸爸答應這週末帶我去自然科學博物館。", "動詞 promise 後方接不定詞 (to + V) 當受詞。", "promise 後接不定詞 to take。", "promise", "/ˈprɑː.mɪs/", "承諾", "museum", "/mjuːˈziː.əm/", "博物館"),
            ("The teacher told the students ___ attention to the lecture.", "to pay", "paying", "pay", "paid", "老師告訴學生們要專心聽講。", "句型 tell sb to V（告訴某人去做某事），使用不定詞 to pay。", "tell sb to V 結構選 to pay。", "attention", "/əˈten.ʃən/", "注意力", "lecture", "/ˈlek.tʃɚ/", "授課"),
            ("Leo woke up early this morning ___ catch the first school bus.", "to", "for", "at", "with", "Leo 今天一大早起床是為了趕搭第一班校車。", "不定詞 to catch 表示起床的具體目的狀語。", "表目的使用不定詞 to catch。", "catch", "/kætʃ/", "趕上", "early", "/ˈɝː.li/", "早早地"),
            ("We agreed ___ our class meeting on Friday afternoon instead.", "to hold", "holding", "hold", "held", "我們同意改在週五下午舉行班會。", "動詞 agree 後方接不定詞 (to + V) 當受詞。", "agree 後接不定詞 to hold。", "agree", "/əˈɡriː/", "同意", "meeting", "/ˈmiː.tɪŋ/", "會議"),
            ("It is very important for teenagers ___ enough sleep every night.", "to get", "getting", "get", "got", "對青少年來說，每晚獲得充足的睡眠是非常重要的。", "虛主詞句型：It is + adj + for sb + to V，真主詞使用不定詞 to get。", "虛主詞 It 對應真主詞 to get。", "teenager", "/ˈtiːnˌeɪ.dʒɚ/", "青少年", "important", "/ɪmˈpɔːr.tənt/", "重要的")
        ]),
        # 10. 動名詞與不定詞語意差異動詞 (stop, remember, forget)
        ("動名詞與不定詞語意差異動詞 (stop, remember, forget)", "文法句構", [
            ("Please remember ___ the front door before you go to bed tonight.", "to lock", "locking", "lock", "locked", "今晚睡覺前請記得去鎖前門。", "remember to V 表記得「去做尚未發生的事」；remember V-ing 表記得「曾做過的事」。", "記得去鎖門（未做）用 remember to lock。", "lock", "/lɑːk/", "上鎖", "remember", "/rɪˈmem.bɚ/", "記得"),
            ("I distinctly remember ___ that documentary film about space last year.", "watching", "to watch", "watch", "watched", "我清楚記得去年看過那部關於太空的紀錄片。", "remember V-ing 表示記得「過去已經做過的事」，last year 提示過去回憶。", "記得已做過的事情選 watching。", "distinctly", "/dɪˈstɪŋkt.li/", "清楚地", "documentary", "/ˌdɑː.kjəˈmen.t̬ɚ.i/", "紀錄片"),
            ("Don't forget ___ off the lights when leaving the classroom.", "to turn", "turning", "turn", "turned", "離開教室時別忘了去隨手關燈。", "forget to V 表忘記「去做該做的事」，祈使句提醒去關燈用 to turn。", "提醒去關燈選 to turn。", "forget", "/fɚˈɡet/", "忘記", "light", "/laɪt/", "電燈"),
            ("I will never forget ___ the majestic sunrise on Mount Ali.", "seeing", "to see", "see", "saw", "我永遠不會忘記在阿里山上看見壯麗日出的那一幕。", "forget V-ing 表忘記「過去曾發生的珍貴經歷」，用於否定回憶。", "難忘過去經歷選 seeing。", "majestic", "/məˈdʒes.tɪk/", "壯麗的", "sunrise", "/ˈsʌn.raɪz/", "日出"),
            ("The noisy students stopped ___ when the teacher entered the classroom.", "talking", "to talk", "talk", "talked", "當老師走進教室時，喧鬧的學生們停止了說話。", "stop V-ing 表「停止正在進行的動作」；stop to V 表「停下來去轉做另一件事」。", "停止說話這個動作選 talking。", "noisy", "/ˈnɔɪ.zi/", "喧鬧的", "enter", "/ˈen.t̬ɚ/", "進入"),
            ("After driving for four hours, Dad stopped ___ a cup of hot coffee.", "to drink", "drinking", "drink", "drank", "開車四個小時後，爸爸停下車來為了喝一杯熱咖啡。", "stop to drink 表停下行車「為了去喝咖啡」（表目的）。", "停下來去喝咖啡選 to drink。", "drive", "/draɪv/", "開車", "stop", "/stɑːp/", "停止"),
            ("Tony stopped ___ junk food because he wanted to be healthier.", "eating", "to eat", "eat", "ate", "Tony 戒掉了吃垃圾食物，因為他想要更健康。", "戒除某種習慣動作使用 stop eating。", "戒掉不良飲食習慣選 eating。", "healthier", "/ˈhel.θi.ɚ/", "更健康的", "junk", "/dʒʌŋk/", "垃圾"),
            ("Did you remember ___ Dad's birthday present yesterday?", "to buy", "buying", "buy", "bought", "你昨天有記得去買爸爸的生日禮物嗎？", "記得去執行任務使用 remember to buy。", "記得去買選 to buy。", "present", "/ˈprez.ənt/", "禮物", "yesterday", "/ˈjes.tɚ.deɪ/", "昨天"),
            ("I forgot ___ my umbrella at home, so I got wet in the rain.", "bringing", "to bring", "bring", "brought", "我忘了帶傘出門，結果在雨中淋濕了。", "forget to bring 表忘了帶傘（導致沒帶），選 to bring。", "忘了帶傘用 to bring。", "umbrella", "/ʌmˈbrel.ə/", "雨傘", "wet", "/wet/", "潮濕的"),
            ("She tried ___ the heavy window, but it was stuck completely.", "to open", "opening", "open", "opened", "她努力嘗試要去推開那扇厚重的窗戶，但它徹底卡死了。", "try to V 表「竭盡全力嘗試做某件困難之事」；try V-ing 表「嘗試試驗看某方法」。", "竭力去推開選 to open。", "stuck", "/stʌk/", "卡住的", "window", "/ˈwɪn.doʊ/", "窗戶")
        ]),
        # 11. 連接詞 because vs so 因果關係
        ("連接詞 because vs so 因果關係", "文法句構", [
            ("It was raining heavily outside, ___ we decided to cancel our picnic.", "so", "because", "although", "since", "外面正下著大雨，所以我們決定取消野餐。", "前因後果句型：原因在前，結果在後，連接詞使用 so（不可與 because 混用）。", "前因後果連接詞選 so。", "cancel", "/ˈkæn.səl/", "取消", "picnic", "/ˈpɪk.nɪk/", "野餐"),
            ("We canceled our picnic ___ it was raining heavily outside.", "because", "so", "therefore", "though", "我們取消了野餐，因為外面正下著大雨。", "後方為原因副詞子句，引導原因使用 because。", "引導原因子句選 because。", "heavily", "/ˈhev.əl.i/", "大量地", "decide", "/dɪˈsaɪd/", "決定"),
            ("Leo studied very hard for the test, ___ he got a perfect score.", "so", "because", "but", "although", "Leo 為了考試非常努力讀書，因此他拿到了滿分。", "努力讀書（因）導向拿滿分（果），使用 so。", "前因後果選 so。", "perfect", "/ˈpɝː.fekt/", "完美的", "score", "/skɔːr/", "分數"),
            ("Emily went to bed early last night ___ she felt completely exhausted.", "because", "so", "although", "but", "Emily 昨晚很早就上床睡覺了，因為她覺得精疲力竭。", "後方為早睡的原因，引導原因使用 because。", "引導原因選 because。", "exhausted", "/ɪɡˈzɑː.stɪd/", "筋疲力竭的", "early", "/ˈɝː.li/", "早早地"),
            ("The math question was very tricky, ___ none of us could solve it.", "so", "because", "though", "since", "這道數學題目非常刁鑽，所以我們沒有一個人解得出來。", "題目刁鑽（因）導致無人解出（果），連接詞用 so。", "因果順承選 so。", "tricky", "/ˈtrɪk.i/", "棘手的", "solve", "/sɑːlv/", "解開"),
            ("I was late for school this morning ___ my alarm clock did not go off.", "because", "so", "although", "however", "我今天早上上學遲到了，因為我的鬧鐘沒有響。", "遲到之後說明原因，使用 because。", "引導遲到原因選 because。", "alarm", "/əˈlɑːrm/", "鬧鐘", "late", "/leɪt/", "遲到的"),
            ("Grandpa loves nature, ___ he goes hiking in the hills every weekend.", "so", "because", "but", "although", "爺爺熱愛大自然，所以他每個週末都去山丘健行。", "前因後果選 so。", "前因後果連接詞選 so。", "hiking", "/ˈhaɪ.kɪŋ/", "健行", "nature", "/ˈneɪ.tʃɚ/", "大自然"),
            ("Tony had a terrible stomachache ___ he ate too much spicy food.", "because", "so", "though", "unless", "Tony 肚子劇痛，因為他吃了太多辛辣食物。", "腹痛原因為吃太多辣，使用 because。", "引導病痛原因選 because。", "stomachache", "/ˈstʌm.ək.eɪk/", "胃痛/肚子痛", "spicy", "/ˈspaɪ.si/", "辛辣的"),
            ("The school bus broke down on the road, ___ all the students were late.", "so", "because", "although", "if", "校車在路上拋錨了，所以所有學生都遲到了。", "校車拋錨為原因，學生遲到為結果，使用 so。", "前因後果選 so。", "broke down", "/broʊk daʊn/", "拋錨故障", "road", "/roʊd/", "道路"),
            ("We wore thick coats and scarves ___ the mountain wind was icy cold.", "because", "so", "although", "but", "我們穿上厚外套和圍巾，因為山風冰冷刺骨。", "穿厚衣之原因為風冷，使用 because。", "引導原因選 because。", "scarf", "/skɑːrf/", "圍巾", "icy", "/ˈaɪ.si/", "冰冷的")
        ]),
        # 12. 讓步連接詞 although / though
        ("讓步連接詞 although / though", "文法句構", [
            ("___ the weather was cold and rainy, the soccer players kept practicing.", "Although", "Because", "So", "However", "雖然天氣寒冷且下雨，足球選手們依然堅持練習。", "連接詞 Although 引導讓步子句，不可與 but 同時出現在同一個句子中！", "Although 引導讓步從屬子句，不與 but 連用。", "weather", "/ˈweð.ɚ/", "天氣", "practice", "/ˈpræk.tɪs/", "練習"),
            ("Emily did not give up ___ she failed the audition twice.", "though", "because", "so", "therefore", "儘管 Emily 兩次試鏡都落選，她依然沒有放棄。", "though 引導讓步子句（儘管、雖然）。", "引導讓步子句選 though。", "audition", "/ɑːˈdɪʃ.ən/", "試鏡", "give up", "/ɡɪv ʌp/", "放棄"),
            ("___ Tony studied very hard, he didn't pass the difficult test.", "Although", "Because", "So", "If", "雖然 Tony 非常努力讀書，但他沒有通過這場困難的考試。", "努力讀書與沒通過考試形成讓步對立，句首選 Although。", "讓步轉折選 Although。", "difficult", "/ˈdɪf.ə.kəlt/", "困難的", "pass", "/pæs/", "通過及格"),
            ("The little boy finished the large pizza ___ he was not very hungry.", "although", "because", "so", "since", "雖然小男孩不是非常飢餓，但他還是吃完了整張大披薩。", "吃完大披薩與不很餓形成讓步關係，選 although。", "讓步對比選 although。", "hungry", "/ˈhʌŋ.ɡri/", "飢餓的", "finish", "/ˈfɪn.ɪʃ/", "完成吃完"),
            ("___ Mr. Davis is over seventy years old, he looks energetic and young.", "Although", "Because", "So", "However", "雖然 Davis 先生已經年過七十，但他看起來充滿活力且年輕。", "年過七旬與神采奕奕形成讓步對比，句首選 Although。", "年齡與活力對比選 Although。", "energetic", "/ˌen.ɚˈdʒet̬.ɪk/", "精力充沛的", "over", "/ˈoʊ.vɚ/", "超過"),
            ("She decided to walk to school ___ it was raining slightly.", "though", "because", "so", "unless", "儘管正下著毛毛雨，她還是決定走路去學校。", "下雨天依然走路形成讓步，選 though。", "讓步連接詞選 though。", "slightly", "/ˈslaɪt.li/", "輕微地", "walk", "/wɑːk/", "走路"),
            ("___ the movie had a slow start, the ending was deeply touching.", "Although", "Because", "So", "Therefore", "雖然這部電影開頭步調緩慢，但結局深深令人感動。", "開頭緩慢與結尾感人形成讓步對比，句首選 Although。", "情節對比選 Although。", "touching", "/ˈtʌtʃ.ɪŋ/", "令人感動的", "ending", "/ˈen.dɪŋ/", "結局"),
            ("Tony bought the expensive shoes ___ his mother warned him not to.", "even though", "because", "so", "unless", "即便媽媽警告過他不要買，Tony 還是買了那雙昂貴的鞋子。", "even though 強調讓步語氣（即便、縱然）。", "強烈讓步選 even though。", "warn", "/wɔːrn/", "警告", "expensive", "/ɪkˈspen.sɪv/", "昂貴的"),
            ("___ it was late at night, the scientists continued their experiments.", "Although", "Because", "So", "However", "雖然已經是深夜，科學家們依然繼續進行他們的實驗。", "深夜與繼續實驗形成讓步關係，句首選 Although。", "時間與動作對比選 Although。", "experiment", "/ɪkˈsper.ə.mənt/", "實驗", "continue", "/kənˈtɪn.juː/", "繼續"),
            ("Lucy ran as fast as she could, ___ she still missed the school bus.", "but", "although", "because", "so", "Lucy 拼盡全力奔跑，但她還是錯過了校車。", "對等連接詞 but 連接兩個獨立子句（注意 Although 與 but 擇一使用）。", "對等子句轉折選 but。", "miss", "/mɪs/", "錯過", "fast", "/fæst/", "快速地")
        ]),
        # 13. 條件連接詞 if 引導之現在式代替未來式
        ("條件連接詞 if 引導之現在式代替未來式", "文法句構", [
            ("If it ___ sunny tomorrow morning, we will go on a picnic in the park.", "is", "will be", "was", "be", "如果明天早上天氣晴朗，我們將去公園野餐。", "在 if 引導的條件副詞子句中，一律使用「現在簡單式 (is)」代替未來式！", "條件子句以現在式代替未來式，選 is。", "sunny", "/ˈsʌn.i/", "晴朗的", "tomorrow", "/təˈmɔːr.oʊ/", "明天"),
            ("We will cancel the baseball game if it ___ heavily tomorrow.", "rains", "will rain", "rained", "rain", "如果明天下大雨，我們將會取消棒球比賽。", "if 條件子句主詞為 it，動詞用現在簡單式單數 rains 代替未來式。", "if 子句現在式單數選 rains。", "rain", "/reɪn/", "下雨", "cancel", "/ˈkæn.səl/", "取消"),
            ("If you ___ hard every day, you will definitely achieve your dreams.", "study", "will study", "studied", "are studying", "如果你每天努力學習，你絕對會實現你的夢想。", "if 條件子句主詞 you 搭配現在式原形 study。", "if 條件子句用現在式 study。", "achieve", "/əˈtʃiːv/", "實現達成", "definitely", "/ˈdef.ən.ət.li/", "肯定地"),
            ("Leo ___ to Canada next month if he passes his English interview.", "will go", "goes", "went", "is going", "如果 Leo 通過英語面試，他下個月將會前往加拿大。", "主要子句表示未來將要發生的結果，必須使用未來式 will go！", "主要子句表示未來結果用 will go。", "interview", "/ˈɪn.t̬ɚ.vjuː/", "面試", "pass", "/pæs/", "通過"),
            ("What ___ you do if you find a lost wallet on the street?", "will", "did", "are", "have", "如果你在街上撿到遺失的皮夾，你將會怎麼做？", "條件句主要子句疑問句：What will you do...?", "主要子句未來式疑問詞後放 will。", "wallet", "/ˈwɑː.lɪt/", "皮夾", "find", "/faɪnd/", "找到"),
            ("If Dad ___ off work early tonight, he will take us to the night market.", "gets", "will get", "got", "get", "如果爸爸今晚提早下班，他會帶我們去夜市。", "if 子句主詞 Dad 為單數，動詞用現在式 gets。", "if 子句第三人稱單數現在式選 gets。", "market", "/ˈmɑːr.kɪt/", "市場", "tonight", "/təˈnaɪt/", "今晚"),
            ("Unless you ___ right now, you will be late for the morning train.", "hurry", "will hurry", "hurried", "don't hurry", "除非你現在趕緊出發，否則你將會趕不上早班火車。", "unless 相當於 if... not，條件子句使用現在式 hurry。", "unless 子句用現在式 hurry。", "unless", "/ənˈles/", "除非", "hurry", "/ˈhɝː.i/", "匆忙趕緊"),
            ("If Emily ___ up early tomorrow, she won't miss the sunrise.", "wakes", "will wake", "woke", "wake", "如果 Emily 明天早起，她就不會錯過日出。", "if 條件子句主詞 Emily 搭配單數動詞 wakes。", "if 子句現在式單數選 wakes。", "sunrise", "/ˈsʌn.raɪz/", "日出", "miss", "/mɪs/", "錯過"),
            ("We will stay at home and watch movies if the typhoon ___ tomorrow.", "comes", "will come", "came", "come", "如果明天颱風來襲，我們將待在家裡看電影。", "if 條件子句主詞 the typhoon 搭配現在式單數 comes。", "if 條件子句單數選 comes。", "typhoon", "/taɪˈfuːn/", "颱風", "stay", "/steɪ/", "停留"),
            ("If you need any help with your math, I ___ glad to assist you.", "will be", "am", "was", "would be", "如果你數學需要任何幫忙，我會很樂意協助你。", "主要子句未來承諾使用 will be glad。", "主要子句用 will be。", "assist", "/əˈsɪst/", "協助", "glad", "/ɡlæd/", "高興的")
        ]),
        # 14. 花費動詞辨析 (spend, cost, take)
        ("花費動詞辨析 (spend, cost, take)", "文法句構", [
            ("It ___ me forty minutes to walk from my home to the school.", "takes", "spends", "costs", "pays", "從我家走路到學校花費了我四十分鐘。", "虛主詞 It + takes + 人 + 時間 + to V 句型，表示花費時間。", "It takes 人 時間 to V 句型選 takes。", "minute", "/ˈmɪn.ɪt/", "分鐘", "walk", "/wɑːk/", "走路"),
            ("Leo ___ three hundred dollars on his new English dictionary.", "spent", "cost", "took", "paid for", "Leo 在他的新英文字典上花費了三百元。", "人 + spend + 金錢/時間 + on + 物 句型，過去式為 spent。", "人當主詞花錢在物品上用 spent on。", "dictionary", "/ˈdɪk.ʃən.er.i/", "字典", "dollar", "/ˈdɑː.lɚ/", "元"),
            ("This stylish leather backpack ___ Dad two thousand dollars.", "cost", "spent", "took", "paid", "這個時尚的皮背包花費了爸爸兩千元。", "物 + cost + 人 + 金錢 句型，主詞為物品 backpack，過去式 cost 同形。", "物當主詞花費金錢用 cost。", "stylish", "/ˈstaɪ.lɪʃ/", "時髦的", "leather", "/ˈleð.ɚ/", "皮革"),
            ("Emily spent two hours ___ her history report yesterday evening.", "writing", "to write", "wrote", "written", "Emily 昨天傍晚花了兩個小時寫她的歷史報告。", "人 + spend + 時間 + V-ing 句型，動詞必須使用動名詞 writing！", "spend 時間後接動名詞 writing。", "report", "/rɪˈpɔːrt/", "報告", "history", "/ˈhɪs.t̬ɚ.i/", "歷史"),
            ("How much did you ___ for that wonderful concert ticket?", "pay", "cost", "spend", "take", "你買那張精彩的音樂會門票付了多少錢？", "人 + pay + 金錢 + for + 物 句型，搭配介系詞 for 使用 pay。", "搭配 pay for 物件選 pay。", "ticket", "/ˈtɪk.ɪt/", "門票", "concert", "/ˈkɑːn.sɚt/", "音樂會"),
            ("It will ___ about two hours to fly from Taipei to Tokyo.", "take", "spend", "cost", "pay", "從台北飛到東京將花費大約兩小時。", "It will take + 時間 + to V 表示花費時間。", "It will take 時間 to V 選 take。", "fly", "/flaɪ/", "飛行", "hour", "/aʊr/", "小時"),
            ("My mother ___ half an hour preparing breakfast every morning.", "spends", "takes", "costs", "pays", "我媽媽每天早上花半個小時準備早餐。", "人 + spend + 時間 + V-ing (preparing)，主詞為 Mother 用 spends。", "人花時間做某事用 spends。", "prepare", "/prɪˈper/", "準備", "half", "/hæf/", "一半"),
            ("That shiny new bicycle ___ Tony almost all of his savings.", "cost", "spent", "took", "paid", "那輛閃亮的新腳踏車花掉了 Tony 幾乎所有的存款。", "物當主詞花費金錢用 cost。", "物當主詞花費選 cost。", "saving", "/ˈseɪ.vɪŋ/", "存款", "shiny", "/ˈʃaɪ.ni/", "閃亮的"),
            ("How long does it ___ you to do your homework every afternoon?", "take", "spend", "cost", "pay", "你每天下午做家庭作業花費你多長時間？", "How long does it take you to V 句型。", "詢問花費時間用 does it take。", "homework", "/ˈhoʊm.wɝːk/", "家庭作業", "afternoon", "/ˌæf.tɚˈnuːn/", "下午"),
            ("We ___ five hundred dollars for dinner at the noodle shop.", "paid", "cost", "took", "spent", "我們在麵店付了五百元吃晚餐。", "人 + pay + 金錢 + for + 物，過去式使用 paid。", "付錢給某物用 paid for。", "noodle", "/ˈnuː.dəl/", "麵條", "dinner", "/ˈdɪn.ɚ/", "晚餐")
        ]),
        # 15. 連綴動詞 look, sound, smell, taste, feel + 形容詞
        ("連綴動詞 look, sound, smell, taste, feel + 形容詞", "文法句構", [
            ("The freshly baked strawberry cake smells ___ and sweet.", "delicious", "deliciously", "sweetly", "well", "剛出爐的草莓蛋糕聞起來美味又香甜。", "感官連綴動詞 smell 後接形容詞 delicious 作為主詞補語（不可接副詞）。", "連綴動詞 smell 接形容詞 delicious。", "delicious", "/dɪˈlɪʃ.əs/", "美味的", "freshly", "/ˈfreʃ.li/", "新鮮地"),
            ("That travel plan to Kenting sounds ___! Let's join them.", "exciting", "excited", "excitedly", "excitement", "那個去墾丁的旅遊計畫聽起來很令人興奮！我們加入他們吧。", "事物主詞 plan + sound + 形容詞補語 exciting（令人興奮的）。", "計畫聽起來如何用 exciting。", "plan", "/plæn/", "計畫", "sound", "/saʊnd/", "聽起來"),
            ("The soup tastes a bit ___ because Dad added too much salt.", "salty", "salt", "saltily", "sweet", "這道湯嚐起來有點鹹，因為爸爸加了太多鹽巴。", "連綴動詞 taste 後接形容詞 salty 作為主詞補語。", "連綴動詞 taste 接形容詞 salty。", "salty", "/ˈsɑːl.t̬i/", "鹹的", "taste", "/teɪst/", "嚐起來"),
            ("You look ___ today; didn't you sleep well last night?", "tired", "tiredly", "tiring", "tire", "你今天看起來很疲倦；你昨晚沒睡好嗎？", "連綴動詞 look 後接形容詞 tired 表示外貌感受。", "look 接表示人感受的形容詞 tired。", "tired", "/taɪərd/", "疲倦的", "sleep", "/sliːp/", "睡覺"),
            ("The silk blanket on the bed feels extremely ___ and smooth.", "soft", "softly", "softness", "smoothly", "床上這條絲綢毛毯摸起來極其柔軟滑順。", "連綴動詞 feel 後接形容詞 soft 作為觸感補語。", "feel 後接形容詞 soft。", "smooth", "/smuːð/", "光滑的", "silk", "/sɪlk/", "絲綢"),
            ("Leo's wonderful singing voice sounds like a professional ___.", "singer", "singing", "sang", "singerly", "Leo 美妙的歌聲聽起來像一位專業的歌手。", "sound like + 名詞片語（sound like a professional singer）。", "sound like 後接名詞 singer。", "professional", "/prəˈfeʃ.ən.əl/", "專業的", "voice", "/vɔɪs/", "嗓音"),
            ("The medicine smells bitter, but it ___ sweet after you drink it.", "tastes", "looks", "sounds", "hears", "這藥草聞起來很苦，但喝下去後嚐起來卻很甘甜。", "藥物味道嚐起來甘甜，使用 taste sweet。", "味道口感用 taste。", "bitter", "/ˈbɪt̬.ɚ/", "苦的", "medicine", "/ˈmed.ɪ.sən/", "藥品"),
            ("The children felt ___ when they heard about the canceled trip.", "sad", "sadly", "sadness", "happily", "當孩子們聽到校外教學取消時感到很傷心。", "連綴動詞 felt 後接形容詞 sad 作補語。", "feel 後接形容詞 sad。", "sad", "/sæd/", "悲傷的", "cancel", "/ˈkæn.səl/", "取消"),
            ("The roses in Grandma's garden smell very ___ in the morning.", "fragrant", "fragrantly", "sweetly", "badly", "奶奶花園裡的玫瑰花在早晨聞起來芬芳撲鼻。", "smell 後接形容詞 fragrant（芬芳的）。", "smell 後接形容詞 fragrant。", "fragrant", "/ˈfreɪ.ɡrənt/", "芬芳香甜的", "rose", "/roʊz/", "玫瑰"),
            ("That mysterious old house looks ___ at night without lights.", "scary", "scarily", "scared", "fear", "那棟神秘的老房子在夜間沒有燈光時看起來很可怕。", "連綴動詞 look 後接形容詞 scary（令人害怕的）。", "外觀令人害怕選 scary。", "scary", "/ˈsker.i/", "可怕的", "mysterious", "/mɪˈstɪr.i.əs/", "神秘的")
        ]),
        # 16. 反身代名詞用法 (myself, himself, herself, themselves)
        ("反身代名詞用法 (myself, himself, themselves)", "文法句構", [
            ("The little boy is proud because he tied his shoelaces by ___.", "himself", "him", "his", "he", "小男孩很自豪，因為他自己繫好了鞋帶。", "by oneself 表「獨自、靠自己」，主詞為 he 搭配 himself。", "by himself 表靠他自己獨立完成。", "shoelace", "/ˈʃuː.leɪs/", "鞋帶", "proud", "/praʊd/", "自豪的"),
            ("I accidentally cut ___ with the sharp kitchen knife yesterday.", "myself", "me", "my", "mine", "我昨天不小心用鋒利的菜刀割傷了自己。", "主詞 I 與受詞為同一個人時，受詞必須使用反身代名詞 myself！", "主受詞同一人使用 myself。", "accidentally", "/ˌæk.səˈden.t̬əl.i/", "意外地", "knife", "/naɪf/", "刀子"),
            ("The students enjoyed ___ at the amusement park last Saturday.", "themselves", "them", "their", "they", "學生們上週六在遊樂園玩得很盡興。", "enjoy oneself 表「玩得開心」，主詞 The students 搭配 themselves。", "enjoy themselves 固定片語玩得開心。", "amusement", "/əˈmjuːz.mənt/", "娛樂", "park", "/pɑːrk/", "公園"),
            ("Emily looked at ___ in the full-length mirror and smiled.", "herself", "her", "she", "hers", "Emily 在全身鏡中看著自己並微笑了起來。", "Emily 看的是自己，介系詞 at 後受詞使用 herself。", "主受詞為同一人選 herself。", "mirror", "/ˈmɪr.ɚ/", "鏡子", "smile", "/smaɪl/", "微笑"),
            ("Help ___ to some delicious snacks and drinks, everyone!", "yourselves", "yourself", "you", "yours", "各位，請自便享用一些美味的點心和飲料吧！", "Help yourselves to... 對多數人表達「請自便享用」，使用複數 yourselves。", "對大家說請自便用 Help yourselves。", "snack", "/snæk/", "點心", "delicious", "/dɪˈlɪʃ.əs/", "美味的"),
            ("The brave girl repaired her broken bicycle all by ___.", "herself", "her", "she", "hers", "那位勇敢的女孩完全靠自己修好了壞掉的腳踏車。", "all by herself 表完全靠她自己一人。", "靠她自己選 by herself。", "repair", "/rɪˈper/", "修理", "brave", "/breɪv/", "勇敢的"),
            ("The cat washed ___ with its tongue after drinking the milk.", "itself", "it", "its", "it's", "那隻貓喝完牛奶後用舌頭清理了自己。", "動物指代自身使用反身代名詞 itself。", "動物反身代名詞用 itself。", "tongue", "/tʌŋ/", "舌頭", "wash", "/wɑːʃ/", "清洗"),
            ("We built this treehouse in the backyard by ___ last summer.", "ourselves", "us", "our", "ours", "去年夏天我們自己在後院建造了這座樹屋。", "主詞 We 對應反身代名詞 ourselves（我們自己）。", "by ourselves 表靠我們自己。", "treehouse", "/ˈtriː.haʊs/", "樹屋", "backyard", "/ˌbækˈjɑːrd/", "後院"),
            ("Be careful with that hot tea, Peter; don't burn ___!", "yourself", "yourselves", "you", "your", "Peter，小心那杯熱茶；別燙傷了你自己！", "對單數對象 Peter 叮嚀，使用單數反身代名詞 yourself。", "對單一人交代選 yourself。", "burn", "/bɝːn/", "燙傷/燒傷", "careful", "/ˈker.fəl/", "小心的"),
            ("The old man lives by ___ in the quiet mountain cabin.", "himself", "him", "his", "he", "老先生獨自一人住在安靜的山間小木屋裡。", "live by oneself 表獨自一人居住，主詞 The man 搭配 himself。", "獨自居住選 by himself。", "cabin", "/ˈkæb.ɪn/", "小木屋", "quiet", "/ˈkwaɪ.ət/", "安靜的")
        ]),
        # 17. 不定代名詞用法 (one/another/the other, some/others)
        ("不定代名詞用法 (one/another/the other, some/others)", "文法句構", [
            ("I have two colorful pens; one is blue, and ___ is red.", "the other", "another", "other", "others", "我有兩支彩色筆；一支是藍色的，另一支是紅色的。", "兩者之中的「一個是…另一個是…」固定使用 one... the other... 結構！", "兩者範圍中另一個為 the other。", "pen", "/pen/", "筆", "colorful", "/ˈkʌl.ɚ.fəl/", "彩色的"),
            ("This apple pie is delicious; may I have ___ slice, please?", "another", "other", "the other", "others", "這個蘋果派真好吃；我可以再吃另一片嗎？", "表示三者以上未指定範圍中「再另一個/片」使用 another + 單數名詞。", "再另一個單數用 another。", "slice", "/slaɪs/", "薄片", "delicious", "/dɪˈlɪʃ.əs/", "美味的"),
            ("Some students love playing soccer, while ___ prefer basketball.", "others", "the other", "another", "other", "有些學生喜愛踢足球，而其他人則偏好籃球。", "Some... others... 句型表示「有些人…有些人（其他人）…」。", "Some 對應複數其他人 others。", "prefer", "/prɪˈfɝː/", "偏好", "soccer", "/ˈsɑː.kɚ/", "足球"),
            ("There are three kittens; one is black, another is white, and ___ is striped.", "the other", "others", "other", "another", "有三隻小貓；一隻是黑色的，另一隻是白色的，最後一隻是條紋的。", "三者範圍：「one... another... the other（最後剩下的一隻）」。", "三者最後一個固定用 the other。", "striped", "/straɪpt/", "有條紋的", "kitten", "/ˈkɪt̬.ən/", "小貓"),
            ("Do you have any ___ questions about tomorrow's schedule?", "other", "another", "others", "the others", "關於明天的行程，你還有任何其他問題嗎？", "other 修飾複數名詞 questions（other + 複數名詞）。", "other 修飾後方複數名詞 questions。", "schedule", "/ˈskedʒ.uːl/", "行程", "question", "/ˈkwes.tʃən/", "問題"),
            ("Only two tickets were left; Tony took one, and I bought ___.", "the other", "another", "others", "other", "只剩下兩張票；Tony 拿走了一張，我買下了另一張。", "兩者範圍剩下的最後一張用 the other。", "兩者中剩下的另一個用 the other。", "ticket", "/ˈtɪk.ɪt/", "票券", "left", "/left/", "剩下的"),
            ("Some people like winter, but ___ people enjoy the warm summer.", "other", "another", "others", "the other", "有些人喜歡冬天，但其他的人喜愛溫暖的夏天。", "other 作為形容詞修飾後方的名詞 people。", "other 修飾名詞 people。", "people", "/ˈpiː.pəl/", "人們", "warm", "/wɔːrm/", "溫暖的"),
            ("I don't like this green shirt; please show me ___ one.", "another", "other", "others", "the other", "我不喜歡這件綠色襯衫；請給我看另外一件。", "another one 表另外一件（不特定）。", "另外一件單數用 another one。", "shirt", "/ʃɝːt/", "襯衫", "show", "/ʃoʊ/", "展示"),
            ("Five students participated in the race; two won medals, and ___ received certificates.", "the others", "others", "another", "other", "五名學生參加了比賽；兩位贏得獎牌，其餘所有人獲得證書。", "特定五人範圍中除去兩人後的「其餘全部」使用 the others。", "特定全體剩下全部用 the others。", "certificate", "/sɚˈtɪf.ə.kət/", "證書", "medal", "/ˈmed.əl/", "獎牌"),
            ("We should always respect ___ and be kind to everyone.", "others", "another", "other", "the other", "我們應當隨時尊重他人，並對每個人和善。", "respect others（尊重他人）為常見道德慣用語。", "泛指他人用 others。", "respect", "/rɪˈspekt/", "尊重", "kind", "/kaɪnd/", "和善的")
        ]),
        # 18. 附加問句規則與肯定否定倒裝 (isn't it?, did you?, will they?)
        ("附加問句規則與肯定否定倒裝", "文法句構", [
            ("It is very hot and humid in Taipei today, ___?", "isn't it", "is it", "doesn't it", "does it", "今天台北非常炎熱潮濕，不是嗎？", "前肯後否規則：前面為肯定句 It is...，附加問句使用否定縮寫 isn't it？", "前肯後否，be動詞對應 isn't it。", "humid", "/ˈhjuː.mɪd/", "潮濕的", "today", "/təˈdeɪ/", "今天"),
            ("Tony didn't go to the movie with you yesterday, ___?", "did he", "didn't he", "does he", "was he", "Tony 昨天沒有和你們一起去看電影，對吧？", "前否後肯規則：前面為 didn't go，附加問句使用肯定助動詞 did he？", "前否後肯，過去助動詞對應 did he。", "movie", "/ˈmuː.vi/", "電影", "yesterday", "/ˈjes.tɚ.deɪ/", "昨天"),
            ("You can speak both English and Japanese fluently, ___?", "can't you", "can you", "don't you", "aren't you", "你能流利地說英語和日語，不是嗎？", "前面為肯定情態句 You can...，附加問句使用 can't you？", "助動詞 can 否定附加為 can't you。", "fluently", "/ˈfluː.ənt.li/", "流利地", "speak", "/spiːk/", "說語言"),
            ("The students have finished their math homework, ___?", "haven't they", "have they", "don't they", "didn't they", "學生們已經完成了他們的數學作業，不是嗎？", "現在完成式 have finished 前肯後否，附加問句用 haven't they？", "完成式 have 對應 haven't they。", "finish", "/ˈfɪn.ɪʃ/", "完成", "homework", "/ˈhoʊm.wɝːk/", "作業"),
            ("She walks to school every morning, ___?", "doesn't she", "does she", "isn't she", "is she", "她每天早上走路去學校，不是嗎？", "一般現在式第三人稱單數 walks，附加問句使用助動詞 doesn't she？", "一般動詞三單對應 doesn't she。", "walk", "/wɑːk/", "走路", "morning", "/ˈmɔːr.nɪŋ/", "早晨"),
            ("There are twenty students in Class 601, ___?", "aren't there", "are there", "aren't they", "are they", "601 班有二十名學生，不是嗎？", "There are 句型附加問句主詞仍使用 there，前肯後否為 aren't there？", "There be 句型附加問句用 aren't there。", "student", "/ˈstuː.dənt/", "學生", "twenty", "/ˈtwen.t̬i/", "二十"),
            ("Let's go have a picnic in the botanical garden, ___?", "shall we", "will you", "don't we", "can we", "我們去植物園野餐吧，好嗎？", "Let's 開頭的祈使句提議，附加問句固定使用 shall we？", "Let's 提議句固定接 shall we。", "botanical", "/bəˈtæn.ɪ.kəl/", "植物的", "picnic", "/ˈpɪk.nɪk/", "野餐"),
            ("Open the window to let some fresh air in, ___?", "will you", "shall we", "don't you", "aren't you", "把窗戶打開讓新鮮空氣進來，好嗎？", "肯定祈使句要求對方做某事，附加問句使用 will you？", "祈使句請求對方選 will you。", "fresh", "/freʃ/", "新鮮的", "window", "/ˈwɪn.doʊ/", "窗戶"),
            ("Peter has never been to London before, ___?", "has he", "hasn't he", "is he", "does he", "Peter 以前從未去過倫敦，對吧？", "句中含否定副詞 never 視為否定句，附加問句需用肯定 has he？", "含 never 視為否定句，後接肯定 has he。", "never", "/ˈnev.ɚ/", "從未", "before", "/bɪˈfɔːr/", "以前"),
            ("Your parents won't be angry with you, ___?", "will they", "won't they", "are they", "do they", "你父母不會生你的氣，對吧？", "前面為 won't (will not) 否定，附加問句使用肯定 will they？", "won't 對應肯定 will they。", "angry", "/ˈæŋ.ɡri/", "生氣的", "parent", "/ˈper.ənt/", "父母")
        ]),
        # 19. 交通方式表達法 (by bus, on foot, take the MRT)
        ("交通方式表達法 (by bus, on foot, take the MRT)", "單字語意", [
            ("Leo lives near the school, so he usually goes to school on ___.", "foot", "bus", "train", "car", "Leo 住在學校附近，所以他通常步行上學。", "步行、走路固定介系詞片語為 on foot（不可用 by foot）。", "步行固定片語為 on foot。", "foot", "/fʊt/", "腳", "near", "/nɪr/", "靠近"),
            ("Most commuters in Taipei go to work ___ MRT because it is fast.", "by", "on", "in", "with", "台北多數通勤族搭捷運上班，因為捷運很快。", "by + 交通工具無冠詞單數（by MRT, by bus, by train）。", "搭乘大眾運輸工具用 by MRT。", "commuter", "/kəˈmjuː.t̬ɚ/", "通勤族", "fast", "/fæst/", "快速的"),
            ("It is safer and more convenient to ___ a taxi when it rains heavily.", "take", "ride", "drive", "by", "下大雨時搭計程車更安全也更便利。", "動詞搭乘計程車/公車使用 take a taxi / take a bus。", "動詞搭乘計程車用 take a taxi。", "taxi", "/ˈtæk.si/", "計程車", "convenient", "/kənˈviː.ni.ənt/", "便利的"),
            ("The tourists decided to ___ bicycles along the scenic riverbank.", "ride", "drive", "fly", "take", "遊客們決定沿著風景優美的河岸騎腳踏車。", "腳踏車/機車/馬匹動詞搭配 ride bicycles。", "騎腳踏車用 ride。", "scenic", "/ˈsiː.nɪk/", "風景優美的", "bicycle", "/ˈbaɪ.sə.kəl/", "腳踏車"),
            ("Dad usually goes to his office in the industrial park ___ car.", "by", "on", "in", "with", "爸爸通常開車去工業園區的辦公室。", "by car（開車、搭自用車）。", "開車代步固定用 by car。", "office", "/ˈɑː.fɪs/", "辦公室", "industrial", "/ɪnˈdʌs.tri.əl/", "工業的"),
            ("We can ___ the high-speed train to reach Kaohsiung in two hours.", "take", "ride", "fly", "drive", "我們可以搭高鐵在兩小時內抵達高雄。", "搭乘火車/高鐵使用及物動詞 take the train。", "搭高鐵用 take the train。", "reach", "/riːtʃ/", "抵達", "hour", "/aʊr/", "小時"),
            ("Uncle Mark traveled from Keelung to Penghu ___ boat last summer.", "by", "on", "in", "with", "Mark 叔叔去年夏天乘船從基隆前往澎湖。", "by boat（搭船）。", "搭船用 by boat。", "boat", "/boʊt/", "船隻", "travel", "/ˈtræv.əl/", "旅行"),
            ("They arrived at the party ___ foot because of the heavy traffic jam.", "on", "by", "in", "with", "因為嚴重交通堵塞，他們步行抵達派對現場。", "步行固定用 on foot。", "步行一律用 on foot。", "traffic", "/ˈtræf.ɪk/", "交通", "jam", "/dʒæm/", "堵塞"),
            ("Lucy gets motion sickness easily, so she dislikes traveling by ___.", "plane", "walk", "foot", "station", "Lucy 很容易暈車暈機，所以她不喜歡搭飛機旅行。", "by plane（搭飛機）。", "搭飛機旅行用 by plane。", "plane", "/pleɪn/", "飛機", "motion", "/ˈmoʊ.ʃən/", "移動"),
            ("How do you usually get to school? I ___ the school bus every day.", "take", "drive", "ride", "walk", "你通常怎麼去學校？我每天搭校車。", "搭校車動詞使用 take the school bus。", "搭乘校車用 take。", "school", "/skuːl/", "學校", "bus", "/bʌs/", "公車")
        ]),
        # 20. 疾病與就診症狀表達 (have a headache, catch a cold)
        ("疾病與就診症狀表達", "篇章語境", [
            ("Tony ate too much spicy fried chicken and now has a terrible ___.", "stomachache", "headache", "toothache", "fever", "Tony 吃了太多辛辣炸雞，現在肚子劇烈疼痛。", "吃太多辛辣食物引起的腹部劇痛為 stomachache。", "腹部疼痛選 stomachache。", "stomachache", "/ˈstʌm.ək.eɪk/", "肚子痛/胃痛", "spicy", "/ˈspaɪ.si/", "辛辣的"),
            ("Remember to wear a warm jacket so you won't ___ a bad cold.", "catch", "take", "make", "give", "記得穿暖夾克，這樣你才不會感冒。", "感冒固定片語為 catch a cold（或 have a cold）。", "感冒固定片語 catch a cold。", "catch", "/kætʃ/", "罹患/感染", "cold", "/koʊld/", "感冒"),
            ("Leo has a severe ___ and needs to visit the dental clinic.", "toothache", "headache", "fever", "cough", "Leo 牙痛得很厲害，需要去牙科診所看診。", "去 dental clinic（牙科診所）治療的是 toothache（牙痛）。", "看牙醫治療 toothache。", "toothache", "/ˈtuːθ.eɪk/", "牙痛", "clinic", "/ˈklɪn.ɪk/", "診所"),
            ("The doctor used a digital thermometer to check if the child had a ___.", "fever", "cold", "headache", "cough", "醫生用電子體溫計檢查小孩子是否有發燒。", "用 thermometer（體溫計）測量的是 fever（發燒）。", "體溫計量發燒 fever。", "fever", "/ˈfiː.vɚ/", "發燒", "thermometer", "/θɚˈmɑː.mə.t̬ɚ/", "體溫計"),
            ("Grandpa has a sore ___ and cannot speak loudly today.", "throat", "head", "foot", "hand", "爺爺今天喉嚨痛，無法大聲說話。", "喉嚨痛固定片語為 sore throat。", "喉嚨痛為 sore throat。", "throat", "/θroʊt/", "喉嚨", "sore", "/sɔːr/", "疼痛發炎的"),
            ("You should take this prescribed medicine three times a day after ___.", "meals", "sleep", "sports", "school", "你應該在三餐飯後每天服用這項處方藥三次。", "服藥常規為 after meals（三餐飯後）。", "飯後服藥用 after meals。", "medicine", "/ˈmed.ɪ.sən/", "藥物", "meal", "/miːl/", "餐點"),
            ("Emily has been coughing all morning; she has a persistent ___.", "cough", "fever", "pain", "toothache", "Emily 整個早上都在咳嗽；她有持續性的咳嗽症狀。", "咳嗽名詞為 cough。", "持續咳嗽用 persistent cough。", "cough", "/kɑːf/", "咳嗽", "persistent", "/pɚˈsɪs.tənt/", "持續的"),
            ("Drink plenty of warm water and get enough ___ to recover quickly.", "rest", "sports", "games", "homework", "多喝溫開水並獲得充足休息，以迅速康復。", "生病康復需要 get enough rest（充足休息）。", "多休息用 get enough rest。", "rest", "/rest/", "休息", "recover", "/rɪˈkʌv.ɚ/", "康復"),
            ("My head feels very dizzy and heavy; I have a splitting ___.", "headache", "stomachache", "toothache", "earache", "我的頭感到非常暈眩沉重；我頭痛欲裂。", "頭部劇痛為 headache（a splitting headache）。", "頭痛選 headache。", "headache", "/ˈhed.eɪk/", "頭痛", "dizzy", "/ˈdɪz.i/", "頭暈的"),
            ("The nurse told the patient to take two tablets of this painkiller for the ___.", "pain", "happy", "health", "appetite", "護士告訴病患服用兩錠止痛藥以緩解疼痛。", "止痛藥 (painkiller) 用於緩解 pain（疼痛）。", "止痛藥針對 pain。", "pain", "/peɪn/", "疼痛", "nurse", "/nɝːs/", "護士")
        ]),
        # 21. 購物、折扣與付款情境會話
        ("購物、折扣與付款情境會話", "篇章語境", [
            ("— How much is this blue silk dress?\n— It's on ___ for only $800.", "sale", "sell", "sold", "selling", "— 這件藍色絲綢洋裝多少錢？\n— 它正在特價特賣，只要 800 元。", "特價特賣中固定片語為 on sale。", "特價特賣用 on sale。", "dress", "/dres/", "洋裝", "sale", "/seɪl/", "特賣"),
            ("— Can I try on this denim jacket?\n— Sure, the fitting ___ is over there.", "room", "table", "desk", "hall", "— 我可以試穿這件牛仔夾克嗎？\n— 當然，試衣間就在那邊。", "試衣間為 fitting room。", "試衣間為 fitting room。", "denim", "/ˈden.ɪm/", "牛仔布", "room", "/ruːm/", "房間"),
            ("— Would you like to pay in cash or by ___ card?\n— By card, please.", "credit", "gift", "paper", "book", "— 您想要付現還是刷信用卡？\n— 請刷卡，謝謝。", "信用卡為 credit card，付現為 pay in cash。", "信用卡為 credit card。", "credit", "/ˈkred.ɪt/", "信用", "cash", "/kæʃ/", "現金"),
            ("This bookstore offers a twenty percent ___ for all junior high students.", "discount", "price", "sale", "money", "這家書店為所有國中生提供八折（20% 折扣）。", "折扣名詞為 discount（a 20% discount）。", "提供折扣用 discount。", "discount", "/ˈdɪs.kaʊnt/", "折扣", "student", "/ˈstuː.dənt/", "學生"),
            ("Please keep your shopping ___ in case you want to exchange the shirt.", "receipt", "menu", "ticket", "poster", "請保留您的購物收據發票，以防您想更換這件襯衫。", "購物發票、收據為 receipt。", "購物收據為 receipt。", "receipt", "/rɪˈsiːt/", "收據發票", "exchange", "/ɪksˈtʃeɪndʒ/", "更換"),
            ("— How can I help you, sir?\n— I'm just ___ around, thank you.", "looking", "buying", "selling", "taking", "— 先生，有什麼需要為您服務的嗎？\n— 我只是隨便看看逛逛，謝謝您。", "隨便逛逛固定回答：I'm just looking around。", "隨便逛逛用 looking around。", "around", "/əˈraʊnd/", "到處", "help", "/help/", "幫忙"),
            ("The shoes are too tight; do you have a larger ___ in stock?", "size", "color", "price", "room", "這雙鞋太緊了；你們庫存裡有更大的尺寸號碼嗎？", "鞋子衣服的尺碼為 size。", "尺寸號碼為 size。", "size", "/saɪz/", "尺寸", "tight", "/taɪt/", "緊繃的"),
            ("Everything in this department store is twenty percent ___ this weekend.", "off", "up", "on", "in", "這家百貨公司本週末所有商品一律打八折（減價 20%）。", "減價打折慣用語為 20% off。", "折扣減價用 off。", "department", "/dɪˈpɑːrt.mənt/", "部門/百貨", "store", "/stɔːr/", "商店"),
            ("The customer asked the cashier for a paper ___ to carry the groceries.", "bag", "box", "card", "sheet", "顧客向收銀員要了一個紙袋來裝雜貨食品。", "裝物品的紙袋為 paper bag。", "紙袋為 paper bag。", "bag", "/bæɡ/", "袋子", "cashier", "/kæʃˈɪr/", "收銀員"),
            ("Is this sweater made of natural wool? It feels very ___.", "comfortable", "cheaper", "heavily", "badly", "這件毛衣是純天然羊毛做的嗎？摸起來非常舒適。", "感覺舒適接形容詞 comfortable。", "連綴動詞 feel 接 comfortable。", "comfortable", "/ˈkʌm.fɚ.t̬ə.bəl/", "舒適的", "wool", "/wʊl/", "羊毛")
        ]),
        # 22. 方位與指路問答 (turn left, go straight, cross the street)
        ("方位與指路問答", "篇章語境", [
            ("— Excuse me, how do I get to the train station?\n— Go ___ for two blocks and turn right.", "straight", "right", "back", "away", "— 不好意思，請問火車站怎麼走？\n— 直直走兩個街區，然後右轉。", "直直走固定片語為 Go straight。", "直走為 Go straight。", "straight", "/streɪt/", "筆直地", "block", "/blɑːk/", "街區"),
            ("The post office is on the corner, right ___ from the public library.", "across", "between", "next", "in front", "郵局就在轉角處，正好在公共圖書館的正對面。", "在…正對面固定片語為 across from。", "正對面片語為 across from。", "across", "/əˈkrɑːs/", "在對面", "corner", "/ˈkɔːr.nɚ/", "角落"),
            ("Be careful when you ___ the busy street during rush hour.", "cross", "pass", "through", "across", "在交通尖峰時段穿過繁忙街道時要小心。", "橫越、穿越街道及物動詞使用 cross the street。", "橫越馬路動詞用 cross。", "cross", "/krɑːs/", "穿越", "busy", "/ˈbɪz.i/", "繁忙的"),
            ("Walk along Zhongshan Road and ___ left at the second traffic light.", "turn", "take", "make", "go", "沿著中山路走，在第二個紅綠燈處左轉。", "左轉動詞為 turn left。", "左轉為 turn left。", "turn", "/tɝːn/", "轉彎", "light", "/laɪt/", "號誌燈"),
            ("The city museum is located ___ the bank and the bookstore.", "between", "among", "across", "through", "市立博物館坐落在銀行與書店兩者之間。", "兩者之間使用 between A and B。", "兩者之間選 between。", "between", "/bɪˈtwiːn/", "在…之間", "museum", "/mjuːˈziː.əm/", "博物館"),
            ("You can find the nearest convenience store on your ___ hand side.", "right", "straight", "front", "through", "你可以在你的右手邊找到最近的便利商店。", "在右手邊為 on your right-hand side。", "在右手邊為 on your right。", "convenience", "/kənˈviː.ni.əns/", "便利", "nearest", "/ˈnɪr.ɪst/", "最近的"),
            ("Keep walking until you see a large fountain, then turn ___.", "around", "straight", "into", "through", "一直往前走直到你看到一座大噴泉，然後轉身回頭。", "轉身、回頭為 turn around。", "轉身回頭為 turn around。", "fountain", "/ˈfaʊn.tən/", "噴泉", "large", "/lɑːrdʒ/", "大型的"),
            ("The bakery is on the ___ floor of this shopping mall.", "second", "two", "twice", "secondary", "麵包店在購物中心的二樓。", "樓層使用序數 second floor。", "二樓使用序數 second floor。", "second", "/ˈsek.ənd/", "第二的", "bakery", "/ˈbeɪ.kɚ.i/", "麵包店"),
            ("Is the subway station far from here? No, it's within ___ distance.", "walking", "walked", "walk", "to walk", "捷運站離這裡很遠嗎？不遠，在步行距離之內。", "步行距離為 walking distance。", "步行距離為 walking distance。", "distance", "/ˈdɪs.təns/", "距離", "subway", "/ˈsʌb.weɪ/", "地鐵/捷運"),
            ("Follow this paved path; it will ___ you directly to the lakeside.", "lead", "take", "bring", "go", "沿著這條鋪好磚的小徑走；它會直接引領你到湖畔。", "引領道路及物動詞使用 lead you to...", "引領通往使用 lead。", "lead", "/liːd/", "引導", "lakeside", "/ˈleɪk.saɪd/", "湖畔")
        ]),
        # 23. 學校課程與社團生活英語
        ("學校課程與社團生活英語", "篇章語境", [
            ("Emily joined the school science ___ because she loves experiments.", "club", "team", "room", "desk", "Emily 加入了學校自然科學社團，因為她熱愛做實驗。", "學校社團名詞為 club（science club）。", "學校社團為 science club。", "club", "/klʌb/", "社團", "experiment", "/ɪkˈsper.ə.mənt/", "實驗"),
            ("Students must wear protective goggles in the chemistry ___.", "lab", "gym", "field", "canteen", "學生在化學實驗室裡必須配戴防護護目鏡。", "實驗室簡稱 lab（chemistry lab）。", "化學實驗室為 chemistry lab。", "chemistry", "/ˈkem.ə.stri/", "化學", "goggles", "/ˈɡɑː.ɡəlz/", "護目鏡"),
            ("Our basketball team practiced tirelessly to win the inter-school ___.", "championship", "club", "class", "lecture", "我們的籃球隊不知疲倦地練習，以贏得校際總冠軍賽。", "贏得冠軍錦標賽為 win the championship。", "冠軍錦標賽為 championship。", "championship", "/ˈtʃæm.pi.ən.ʃɪp/", "錦標賽", "tirelessly", "/ˈtaɪr.ləs.li/", "不知疲倦地"),
            ("The annual school sports day was held on the outdoor ___.", "track", "desk", "room", "hall", "一年一度的學校運動會在室外田徑場跑道上舉行。", "田徑場跑道為 track（running track）。", "跑道田徑場為 track。", "annual", "/ˈæn.ju.əl/", "年度的", "track", "/træk/", "跑道"),
            ("Tony plays the saxophone in the school marching ___.", "band", "team", "club", "group", "Tony 在學校行進管樂隊裡吹薩克斯風。", "行進管樂團為 marching band。", "行進樂隊為 marching band。", "marching", "/ˈmɑːr.tʃɪŋ/", "行進的", "band", "/bænd/", "樂團"),
            ("Students elect their class ___ at the beginning of each semester.", "leader", "teacher", "principal", "driver", "學生在每學期開始時選出他們的班長。", "班長為 class leader。", "班級幹部班長為 class leader。", "elect", "/iˈlekt/", "選舉選出", "semester", "/səˈmes.tɚ/", "學期"),
            ("The drama club will put on an English ___ during the campus festival.", "play", "game", "match", "quiz", "話劇社將在校園節慶期間上演一齣英語戲劇。", "戲劇、舞台劇名詞為 play（an English play）。", "上演戲劇為 put on a play。", "drama", "/ˈdræm.ə/", "戲劇", "play", "/pleɪ/", "舞台劇"),
            ("We have biology class in the laboratory every ___ morning.", "Wednesday", "Summer", "Morning", "July", "我們每週三上午在實驗室上生物課。", "修飾 morning 表每週特定星期為 Wednesday。", "星期三為 Wednesday。", "Wednesday", "/ˈwenz.deɪ/", "星期三", "biology", "/baɪˈɑː.lə.dʒi/", "生物學"),
            ("The school library provides a quiet environment for students to ___.", "study", "play", "shout", "dance", "學校圖書館為學生提供了一個安靜自習的環境。", "在圖書館安靜讀書學習為 study。", "圖書館自習為 study。", "environment", "/ɪnˈvaɪ.rən.mənt/", "環境", "quiet", "/ˈkwaɪ.ət/", "安靜的"),
            ("Our homeroom teacher praised us for winning the clean classroom ___.", "contest", "quiz", "class", "exam", "我們的導師稱讚我們贏得了整潔教室比賽冠軍。", "整潔競賽名詞為 contest（cleaning contest）。", "比賽競賽為 contest。", "homeroom", "/ˈhoʊm.ruːm/", "原班導師", "contest", "/ˈkɑːn.test/", "競賽")
        ]),
        # 24. 電話禮貌留言與邀請對話
        ("電話禮貌留言與邀請對話", "篇章語境", [
            ("— Hello, may I speak to David, please?\n— Hold ___, please. I'll get him.", "on", "up", "off", "in", "— 哈囉，請問我可以和 David 通話嗎？\n— 請稍候，我去叫他。", "電話請對方「稍候、別掛斷」固定片語為 Hold on, please。", "電話稍等固定用 Hold on。", "speak", "/spiːk/", "通話", "hold on", "/hoʊld ɑːn/", "稍候"),
            ("— I'm sorry, Mr. Lin is not in right now.\n— Could I leave a ___?", "message", "letter", "card", "word", "— 很抱歉，林先生現在不在。\n— 我可以留個口信/留言嗎？", "打電話留言固定片語為 leave a message。", "留留言為 leave a message。", "message", "/ˈmes.ɪdʒ/", "口信留言", "sorry", "/ˈsɑːr.i/", "抱歉的"),
            ("— Who is ___ on the phone, please?\n— This is Kevin calling.", "calling", "speaking", "talking", "telling", "— 請問電話是哪位打來的？\n— 我是 Kevin。", "接電話詢問對方何人來電：Who is calling, please?", "詢問來電者用 Who is calling?。", "call", "/kɑːl/", "打電話", "phone", "/foʊn/", "電話"),
            ("— Would you like to come to my birthday party this Saturday?\n— I'd ___ to!", "love", "hate", "dislike", "tired", "— 這週六你願意來參加我的生日派對嗎？\n— 我很樂意！", "接受熱情邀請禮貌回應：I'd love to!（我非常樂意）。", "樂意接受邀請用 I'd love to。", "party", "/ˈpɑːr.t̬i/", "派對", "love", "/lʌv/", "喜愛/樂意"),
            ("I'm afraid I can't make it to the movie tonight because I have to ___ for an exam.", "study", "play", "sleep", "sing", "恐怕我今晚無法去看電影，因為我必須為了考試而研讀。", "禮貌婉拒邀請並說明理由：have to study for an exam。", "婉拒理由為準備考試 study。", "afraid", "/əˈfreɪd/", "恐怕的", "exam", "/ɪɡˈzæm/", "考試"),
            ("Please tell Peter to ___ me back as soon as he returns home.", "call", "send", "give", "write", "請轉告 Peter 一回到家就立刻給我回電話。", "給某人回電話片語為 call me back。", "回電話為 call back。", "return", "/rɪˈtɝːn/", "返回", "soon", "/suːn/", "很快"),
            ("I'm sorry, but you have reached the wrong ___; there is no Tony here.", "number", "person", "phone", "call", "很抱歉，您撥錯號碼了；這裡沒有一位叫 Tony 的人。", "打錯電話號碼固定表達為 reached the wrong number。", "撥錯電話用 wrong number。", "number", "/ˈnʌm.bɚ/", "號碼", "wrong", "/rɑːŋ/", "錯誤的"),
            ("Can you hear me clearly? The phone line is very ___ right now.", "noisy", "clean", "quiet", "bright", "你能聽清楚我說話嗎？現在電話線路雜音非常多。", "電話線路嘈雜用 noisy。", "線路吵雜選 noisy。", "line", "/laɪn/", "線路", "clearly", "/ˈklɪr.li/", "清晰地"),
            ("Thanks for the kind invitation, but I already have ___ plans for Sunday.", "other", "another", "others", "the other", "謝謝您的熱情邀請，但我週日已經有其他計畫了。", "other plans 修飾複數名詞 plans（其他計畫）。", "其他計畫用 other plans。", "invitation", "/ˌɪn.vəˈteɪ.ʃən/", "邀請", "plan", "/plæn/", "計畫"),
            ("I will ___ you a text message with the restaurant address later.", "send", "take", "call", "make", "我稍後會傳簡訊把餐廳地址發給你。", "傳送文字簡訊為 send a text message。", "傳簡訊動詞用 send。", "address", "/ˈæd.res/", "地址", "message", "/ˈmes.ɪdʒ/", "簡訊")
        ]),
        # 25. 節慶文化與習俗描述 (Moon Festival, Dragon Boat, Thanksgiving)
        ("節慶文化與習俗描述", "篇章語境", [
            ("During the Mid-Autumn Festival, families gather together to eat sweet ___.", "mooncakes", "dumplings", "turkeys", "candies", "中秋節期間，全家人聚在一起品嚐香甜的月餅。", "中秋節應節傳統點心為 mooncakes（月餅）。", "中秋節吃月餅 mooncakes。", "mooncake", "/ˈmuːn.keɪk/", "月餅", "gather", "/ˈɡæð.ɚ/", "團聚"),
            ("People watch thrilling dragon boat races during the Dragon Boat ___.", "Festival", "Party", "Game", "Match", "在端午節期間，人們觀賞驚險刺激的龍舟競渡。", "端午節英文為 Dragon Boat Festival。", "端午節為 Dragon Boat Festival。", "thrilling", "/ˈθrɪl.ɪŋ/", "刺激的", "festival", "/ˈfes.tə.vəl/", "節慶"),
            ("On Thanksgiving Day, families in America gather to enjoy roast ___.", "turkey", "fish", "beef", "chicken", "在感恩節這天，美國的家庭齊聚一堂享用烤火雞大餐。", "感恩節傳統經典主菜為 roast turkey（烤火雞）。", "感恩節吃火雞 turkey。", "turkey", "/ˈtɝː.ki/", "火雞", "roast", "/roʊst/", "烘烤"),
            ("Children dress up in spooky costumes and go trick-or-treating on ___.", "Halloween", "Christmas", "Easter", "New Year", "孩子們在萬聖節當天穿上搞怪恐怖服裝並挨家挨戶要糖果。", "不給糖就搗蛋 (trick-or-treat) 的節日為 Halloween。", "萬聖節變裝為 Halloween。", "spooky", "/ˈspuː.ki/", "陰森搞怪的", "costume", "/ˈkɑː.stuːm/", "戲服"),
            ("People give and receive red envelopes filled with lucky money on Lunar New ___.", "Year", "Month", "Day", "Week", "農曆新年期間，人們分發並領取裝有吉祥壓歲錢的紅包。", "農曆新年為 Lunar New Year。", "農曆新年為 Lunar New Year。", "envelope", "/ˈɑːn.və.loʊp/", "信封/紅包", "lucky", "/ˈlʌk.i/", "幸運吉祥的"),
            ("Decorating evergreen pine trees with lights and ornaments is a tradition of ___.", "Christmas", "Halloween", "Thanksgiving", "Easter", "用彩燈與裝飾品妝點長青松樹是聖誕節的傳統。", "裝飾聖誕樹為 Christmas 傳統。", "裝飾松樹為 Christmas。", "pine", "/paɪn/", "松樹", "ornament", "/ˈɔːr.nə.mənt/", "裝飾品"),
            ("Children hunt for colorful painted eggs hidden in the garden on ___ Sunday.", "Easter", "Mother's", "Father's", "Labor", "在復活節星期日，孩子們在花園裡尋找隱藏的彩色彩蛋。", "彩蛋尋寶活動 (egg hunt) 是 Easter（復活節）傳統。", "彩蛋尋寶為 Easter。", "Easter", "/ˈiː.stɚ/", "復活節", "hidden", "/ˈhɪd.ən/", "隱藏的"),
            ("Lantern Festival marks the official end of the Lunar New Year ___.", "celebrations", "school", "season", "vacation", "元宵節象徵著農曆新年慶祝活動的正式落幕。", "新年慶祝活動名詞為 celebrations。", "新年慶祝用 celebrations。", "lantern", "/ˈlæn.tɚn/", "燈籠/元宵", "official", "/əˈfɪʃ.əl/", "正式的"),
            ("People in Taiwan eat delicious rice dumplings called zongzi during ___ Festival.", "Dragon Boat", "Mid-Autumn", "Spring", "Lantern", "台灣民眾在端午節期間享用稱為粽子的美味糯米點心。", "吃粽子是 Dragon Boat Festival（端午節）習俗。", "端午吃粽為 Dragon Boat。", "dumpling", "/ˈdʌm.plɪŋ/", "粽子/餃子", "delicious", "/dɪˈlɪʃ.əs/", "美味的"),
            ("Mother's Day is celebrated on the second Sunday of ___ in many countries.", "May", "April", "June", "March", "在許多國家，母親節是在五月的第二個星期日慶祝。", "母親節在五月 (May) 的第二個週日。", "母親節在五月 May。", "Mother", "/ˈmʌð.ɚ/", "母親", "celebrate", "/ˈsel.ə.breɪt/", "慶祝")
        ])
    ]
    
    for sub_title, dim, q_list in remaining_subtopics_2:
        subtopics_data.append((sub_title, dim, q_list))
        
    q_counter = 250
    for idx, (sub_title, dim, q_list) in enumerate(subtopics_data):
        unit_num = (idx % 8) + 1
        hook_item = {"module": "jh", "unitId": f"jh-u{unit_num}", "unitTitle": f"JH 國中會考衝刺 Unit {unit_num}: 核心文法與會考高頻考點"}
        for q_tuple in q_list:
            q_counter += 1
            if len(q_tuple) == 15:
                prompt, corr, d1, d2, d3, trans, concept, analysis, trap, w1, p1, m1, w2, p2, m2 = q_tuple
            else:
                prompt, corr, d1, d2, d3, trans, concept, trap, w1, p1, m1, w2, p2, m2 = q_tuple
                analysis = "標準英語文法結構：主幹主從或對等關係完整明確。"
            item = make_q(
                q_id=q_counter,
                subtopic=sub_title,
                dim=dim,
                hook=hook_item,
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
            
    assert len(items) == 250, f"Tier 2 expected 250 items, got {len(items)}"
    return items
