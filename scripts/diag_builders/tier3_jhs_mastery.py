"""tier3_jhs_mastery.py - Tier 3: 國中會考精熟躍升 (JHS Mastery A2~B1) 250 Questions Generator.
IDs: diag-0501 to diag-0750.
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
        "tier": 3,
        "tierLabel": "Level 3: 國中會考精熟躍升 (JHS Mastery A2~B1)",
        "targetExam": "國中會考",
        "cefr": "B1",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 3,
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

def build_tier3():
    items = []
    
    subtopics_data = [
        # 1. 現在完成式經驗與持續 (have/has + p.p., since, for)
        ("現在完成式經驗與持續 (have/has + p.p., since, for)", "文法句構", [
            ("Mr. Davis ___ in this tranquil mountain town since he retired in 2015.", "has lived", "lived", "is living", "lives", "自從 2015 年退休以來，Davis 先生就一直住持在這個寧靜的山城裡。", "since + 過去時間點，主要子句必須使用現在完成式 has lived 表示動作持續至今。", "since 提示現在完成式，主詞 Mr. Davis 搭配 has lived。", "tranquil", "/ˈtræŋ.kwɪl/", "平靜寧靜的", "retire", "/rɪˈtaɪr/", "退休"),
            ("We ___ each other for more than ten years since elementary school.", "have known", "knew", "know", "are knowing", "自國小以來，我們彼此認識已經超過十年了。", "for + 一段時間，表示從過去持續至今之狀態，動詞使用現在完成式 have known。", "for ten years 搭配完成式 have known。", "elementary", "/ˌel.əˈmen.t̬ɚ.i/", "基礎/國小的", "decade", "/ˈdek.eɪd/", "十年"),
            ("Have you ever ___ to Alishan to appreciate the breathtaking sunrise?", "been", "gone", "went", "being", "你曾經去過阿里山欣賞那令人屏息的日出嗎？", "Have you ever been to... 表示「是否曾造訪某地之經驗」（gone to 表去了尚未返回）。", "造訪經驗使用 have been to。", "breathtaking", "/ˈbreθˌteɪ.kɪŋ/", "令人屏息的", "sunrise", "/ˈsʌn.raɪz/", "日出"),
            ("Dr. Thornton ___ at Cambridge University for twenty-five years.", "has taught", "taught", "teaches", "is teaching", "Thornton 博士在劍橋大學任教已經長達二十五年了。", "for twenty-five years 持續態搭配現在完成式 has taught。", "持續時間片語搭配 has taught。", "university", "/ˌjuː.nəˈvɝː.sə.t̬i/", "大學", "teach", "/tiːtʃ/", "教導"),
            ("How long ___ you had this reliable laptop computer?", "have", "did", "do", "are", "這台可靠的筆記型電腦你已經擁有多少年了？", "How long have you had... 詢問持有狀態持續了多久。", "完成式疑問句助動詞用 have。", "reliable", "/rɪˈlaɪ.ə.bəl/", "可靠耐用的", "laptop", "/ˈlæp.tɑːp/", "筆記型電腦"),
            ("She ___ in London since she graduated from Oxford last autumn.", "has resided", "resided", "resides", "is residing", "自從去年秋天自牛津畢業以來，她就一直定居在倫敦。", "since 子句接過去式，主要子句使用現在完成式 has resided。", "since 對應現在完成式 has resided。", "reside", "/rɪˈzaɪd/", "居住定居", "graduate", "/ˈɡrædʒ.u.eɪt/", "畢業"),
            ("The experienced architect ___ over fifty sustainable buildings in Asia.", "has designed", "designed", "designs", "is designing", "這位經驗豐富的建築師已在亞洲設計了超過五十座永續綠建築。", "表達累計成果經驗使用現在完成式 has designed。", "累積經驗與成果選 has designed。", "architect", "/ˈɑːr.kə.tekt/", "建築師", "sustainable", "/səˈsteɪ.nə.bəl/", "永續的"),
            ("They ___ in Tainan since their company opened its southern branch.", "have worked", "worked", "work", "are working", "自從公司南部據點開幕以來，他們就一直在台南工作。", "since 引導過去時間基準點，主要子句搭配 have worked。", "since 提示現在完成式 have worked。", "branch", "/bræntʃ/", "分公司/分部", "southern", "/ˈsʌð.ɚn/", "南方的"),
            ("My uncle ___ abroad for five years and speaks German fluently.", "has lived", "lived", "lives", "is living", "我叔叔在國外住了五年，德語說得非常流利。", "for five years 搭配現在完成式 has lived。", "持續時間搭配 has lived。", "abroad", "/əˈbrɑːd/", "在國外", "German", "/ˈdʒɝː.mən/", "德語"),
            ("Tony ___ a member of the school debate club since seventh grade.", "has been", "was", "is", "had been", "自國一以來，Tony 就一直是學校辯論社的成員。", "since seventh grade 搭配現在完成式 has been。", "持續至今的身分選 has been。", "debate", "/dɪˈbeɪt/", "辯論", "member", "/ˈmem.bɚ/", "成員")
        ]),
        # 2. 現在完成式已完成與未完成 (already, yet, just)
        ("現在完成式已完成與未完成 (already, yet, just)", "文法句構", [
            ("Emily has ___ finished her biology research project ahead of schedule.", "already", "yet", "still", "ever", "Emily 已經提前完成了她的生物研究專題報告。", "already 用於肯定句表示「已經完成某事」，置於助動詞與過去分詞之間。", "肯定完成句使用 already。", "ahead", "/əˈhed/", "領先/提前", "schedule", "/ˈskedʒ.uːl/", "行程進度"),
            ("Have the delivery workers arrived with our new furniture ___?", "yet", "already", "still", "just", "送貨工人已經帶著我們的新家具抵達了嗎？", "yet 常用於現在完成式疑問句句尾，詢問「某事是否已經完成」。", "疑問句句末使用 yet 詢問進度。", "furniture", "/ˈfɝː.nɪ.tʃɚ/", "家具", "delivery", "/dɪˈlɪv.ɚ.i/", "遞送"),
            ("The school bus has not arrived at the intersection ___.", "yet", "already", "ever", "just", "校車尚未抵達該十字路口。", "yet 常用於現在完成式否定句句末，表示「尚未完成」。", "否定完成句句末選 yet 表尚未。", "intersection", "/ˌɪn.t̬ɚˈsek.ʃən/", "十字路口", "arrive", "/əˈraɪv/", "抵達"),
            ("Leo has ___ stepped out of the library to answer an urgent phone call.", "just", "yet", "ever", "still", "Leo 剛剛走出圖書館去接一通緊急電話。", "just 用於現在完成式表示「剛剛、方才完成之動作」。", "動作剛發生選 just。", "urgent", "/ˈɝː.dʒənt/", "緊急的", "step", "/step/", "邁步"),
            ("I haven't received any confirmation email from the admissions office ___.", "yet", "already", "just", "ever", "我尚未收到來自招生辦公室的確認電子郵件。", "否定句句末表示尚未收到，選 yet。", "否定句句尾用 yet。", "confirmation", "/ˌkɑːn.fɚˈmeɪ.ʃən/", "確認", "admissions", "/ədˈmɪʃ.ənz/", "錄取招生"),
            ("The flight has ___ departed, so passenger boarding is now closed.", "already", "yet", "still", "ever", "航班已經離港啟程，因此旅客登機現已截止關閉。", "already 表示動作已完成完畢。", "肯定完成使用 already。", "depart", "/dɪˈpɑːrt/", "啟程離開", "boarding", "/ˈbɔːr.dɪŋ/", "登機"),
            ("Have you ___ seen such a magnificent shooting star in the night sky?", "ever", "never", "yet", "already", "你曾經在夜空中看過如此壯觀的流星嗎？", "ever 用於疑問句表示「曾經何時之經驗」。", "經驗疑問句使用 ever。", "magnificent", "/mæɡˈnɪf.ə.sənt/", "壯麗的", "shooting star", "/ˈʃuː.t̬ɪŋ ˌstɑːr/", "流星"),
            ("Our team has ___ solved the most complex coding challenge in the contest.", "just", "yet", "ever", "still", "我們團隊剛剛解開了競賽中最複雜的程式碼難題。", "just 表示剛剛順利解決。", "剛完成選 just。", "complex", "/kɑːmˈpleks/", "複雜的", "coding", "/ˈkoʊ.dɪŋ/", "寫程式"),
            ("The principal hasn't announced the winners of the speech contest ___.", "yet", "already", "just", "ever", "校長尚未公布演講比賽的獲獎者名單。", "否定句末尾表示「尚未」使用 yet。", "否定句句尾選 yet。", "announce", "/əˈnaʊns/", "宣布公布", "contest", "/ˈkɑːn.test/", "競賽"),
            ("We have ___ booked the train tickets, so you don't need to worry.", "already", "yet", "still", "ever", "我們已經訂好火車票了，所以你不需要擔心。", "already 表示票券已訂好。", "已完成預訂選 already。", "book", "/bʊk/", "預訂", "ticket", "/ˈtɪk.ɪt/", "票券")
        ]),
        # 3. 被動語態現在式與過去式 (is/are + p.p., was/were + p.p.)
        ("被動語態現在式與過去式 (is/are + p.p., was/were + p.p.)", "文法句構", [
            ("This historic stone bridge ___ by ancient craftsmen five centuries ago.", "was built", "built", "is built", "was building", "這座歷史悠久的石橋在五個世紀前由古代工匠所建造。", "主詞 stone bridge 為承受動作之物，時間片語 five centuries ago 提示過去式，被動為 was built。", "過去被動語態 was built by...", "historic", "/hɪsˈtɔːr.ɪk/", "歷史悠久的", "craftsman", "/ˈkræfts.mən/", "工匠"),
            ("English ___ as an official language in dozens of countries worldwide.", "is spoken", "speaks", "was spoken", "is speaking", "英語在全球數十個國家被作為官方語言使用。", "客觀事實之現在被動語態：is spoken worldwide。", "常態客觀被動使用 is spoken。", "official", "/əˈfɪʃ.əl/", "官方的", "spoken", "/ˈspoʊ.kən/", "說語言"),
            ("The stolen jewelry ___ by the detective in an abandoned warehouse yesterday.", "was found", "found", "is found", "was finding", "遭竊的珠寶昨天被刑警在一座廢棄倉庫中找到了。", "yesterday 提示過去被動語態 was found。", "過去被動語態選 was found。", "detective", "/dɪˈtek.tɪv/", "刑警偵探", "abandoned", "/əˈbæn.dənd/", "廢棄的"),
            ("Millions of plastic bottles ___ every single minute across the globe.", "are discarded", "discard", "were discarded", "are discarding", "全球每分鐘有數百萬個塑膠瓶遭到丟棄。", "複數主詞 bottles 搭配現在被動語態 are discarded。", "複數現在被動選 are discarded。", "discard", "/dɪˈskɑːrd/", "拋棄丟棄", "plastic", "/ˈplæs.tɪk/", "塑膠的"),
            ("The school auditorium ___ thoroughly before the graduation ceremony yesterday.", "was cleaned", "cleaned", "is cleaned", "has cleaned", "昨天在畢業典禮開始之前，學校禮堂被徹底打掃了一遍。", "yesterday 提示過去式被動 was cleaned。", "過去被動選 was cleaned。", "auditorium", "/ˌɑː.dəˈtɔːr.i.əm/", "禮堂大廳", "ceremony", "/ˈser.ə.mə.ni/", "典禮儀式"),
            ("Delicious pineapple cakes ___ in this traditional bakery every morning.", "are made", "make", "were made", "are making", "這家傳統烘焙店每天早晨都製作美味的鳳梨酥。", "every morning 提示現在被動 are made。", "現在常態被動選 are made。", "pineapple", "/ˈpaɪnˌæp.əl/", "鳳梨", "bakery", "/ˈbeɪ.kɚ.i/", "麵包店"),
            ("The lost boy ___ safe and sound by the rescue team in the forest.", "was found", "found", "is found", "was finding", "走失的男孩被搜救隊在森林裡平安尋獲。", "過去被動語態 was found safe。", "過去被動選 was found。", "rescue", "/ˈres.kjuː/", "搜救", "forest", "/ˈfɔːr.ɪst/", "森林"),
            ("These classic novels ___ by Charles Dickens in the nineteenth century.", "were written", "wrote", "are written", "were writing", "這些經典小說是由查爾斯·狄更斯在十九世紀寫成的。", "複數主詞 novels 在過去被寫成，使用 were written。", "複數過去被動選 were written。", "classic", "/ˈklæs.ɪk/", "經典的", "novel", "/ˈnɑː.vəl/", "小說"),
            ("Coffee beans ___ from Brazil and Colombia to roasting plants in Taiwan.", "are imported", "import", "were imported", "are importing", "咖啡豆從巴西和哥倫比亞被進口至台灣的烘焙廠。", "常態商務被動使用 are imported。", "現在被動選 are imported。", "import", "/ɪmˈpɔːrt/", "進口輸入", "roast", "/roʊst/", "烘焙"),
            ("The classroom windows ___ by the violent typhoon winds last night.", "were broken", "broke", "are broken", "were breaking", "教室的窗戶昨晚被強烈颱風的狂風吹破了。", "複數 windows 過去被動 were broken。", "過去複數被動選 were broken。", "violent", "/ˈvaɪə.lənt/", "狂暴強烈的", "typhoon", "/taɪˈfuːn/", "颱風")
        ]),
        # 4. 含有助動詞之被動語態 (must be done, should be cleaned)
        ("含有助動詞之被動語態 (must be done, should be cleaned)", "文法句構", [
            ("All chemical waste ___ disposed of according to strict safety regulations.", "must be", "must", "should", "ought", "所有化學廢棄物必須依據嚴格的安全法規予以處置。", "助動詞被動結構：must be + p.p. (disposed of)。", "助動詞後加 be + p.p.，選 must be。", "chemical", "/ˈkem.ɪ.kəl/", "化學的", "regulation", "/ˌreɡ.jəˈleɪ.ʃən/", "規範條例"),
            ("This confidential document ___ to anyone outside the executive board.", "should not be revealed", "should not reveal", "is not revealing", "must reveal", "這份機密文件不應當向執行董事會以外的任何人洩漏。", "否定被動：should not be + p.p. (revealed)。", "否定助動詞被動選 should not be revealed。", "confidential", "/ˌkɑːn.fəˈden.ʃəl/", "機密的", "reveal", "/rɪˈviːl/", "洩露透露"),
            ("The damaged playground equipment ___ immediately before students get hurt.", "needs to be repaired", "needs repairing to", "is repaired", "will repair", "損壞的遊樂場設施需要立即修復，以免學生受傷。", "needs to be + p.p. (repaired) 表示需要被修復。", "need to be repaired 結構完整。", "equipment", "/ɪˈkwɪp.mənt/", "設備器材", "immediately", "/ɪˈmiː.di.ət.li/", "立即地"),
            ("Your application form ___ to the admissions office before May 15th.", "has to be submitted", "has submitted", "submits", "is submitting", "你的申請表格必須在五月十五日之前遞交至招生處。", "has to be + p.p. (submitted) 表必須被遞交。", "義務被動選 has to be submitted。", "submit", "/səbˈmɪt/", "提交遞交", "application", "/ˌæp.ləˈkeɪ.ʃən/", "申請"),
            ("Valuable antique items in the museum ___ touched by tourists.", "cannot be", "must not", "can be not", "should", "博物館裡的珍貴古董絕對不可被遊客觸摸。", "cannot be + p.p. 表示不可被…。", "禁止被動選 cannot be touched。", "antique", "/ænˈtiːk/", "古董文物", "valuable", "/ˈvæl.jə.bəl/", "珍貴的"),
            ("The school sports day ___ if torrential rain continues tomorrow.", "will be canceled", "cancels", "is canceling", "would cancel", "如果明天豪雨持續，學校運動會將會被取消。", "未來式被動：will be + p.p. (canceled)。", "未來被動選 will be canceled。", "torrential", "/tɔːˈren.ʃəl/", "傾盆豪雨的", "cancel", "/ˈkæn.səl/", "取消"),
            ("Trash ___ into designated recycling bins on campus.", "ought to be thrown", "ought to throw", "is throwing", "must throw", "垃圾應當被投入校園指定的資源回收桶中。", "ought to be + p.p. (thrown) 道德規範被動。", "道德被動選 ought to be thrown。", "designated", "/ˈdez.ɪɡ.neɪ.t̬ɪd/", "指定的", "recycling", "/ˌriːˈsaɪ.klɪŋ/", "資源回收"),
            ("Seatbelts ___ during the entire duration of the flight.", "must be worn", "must wear", "are wearing", "should wear", "在整個航行過程中必須全程繫好安全帶。", "安全帶承受穿戴動作，must be worn。", "法規義務被動選 must be worn。", "seatbelt", "/ˈsiːtˌbelt/", "安全帶", "duration", "/dʊˈreɪ.ʃən/", "持續期間"),
            ("All library books ___ within two weeks of borrowing.", "must be returned", "must return", "should return", "are returning", "所有圖書館藏書必須在借出後兩週內歸還。", "書籍承受歸還動作，must be returned。", "被動歸還選 must be returned。", "borrowing", "/ˈbɑːr.oʊ.ɪŋ/", "借用借閱", "return", "/rɪˈtɝːn/", "歸還"),
            ("This delicate glass vase ___ with extreme caution.", "should be handled", "should handle", "is handling", "handles", "這個精緻的花瓶在搬運時應當極為謹慎小心。", "花瓶承受拿取動作，should be handled with caution。", "拿取被動選 should be handled。", "delicate", "/ˈdel.ə.kət/", "脆弱精緻的", "caution", "/ˈkɑː.ʃən/", "謹慎小心")
        ]),
        # 5. 主格關係代名詞 who / which / that 引導之關係子句
        ("主格關係代名詞 who / which / that", "文法句構", [
            ("The dedicated physician ___ discovered the new vaccine won an international award.", "who", "which", "whom", "whose", "發現新疫苗的那位敬業內科醫生榮獲了國際大獎。", "先行詞為人 (The dedicated physician)，在關係子句中擔任主詞，使用主格關係代名詞 who 或 that。", "先行詞為人且作子句主詞選 who。", "physician", "/fɪˈzɪʃ.ən/", "內科醫生", "vaccine", "/vækˈsiːn/", "疫苗"),
            ("We visited a historic temple ___ was constructed during the Qing Dynasty.", "which", "who", "whom", "whose", "我們參觀了一座興建於清朝年間的歷史名廟。", "先行詞為物/建物 (a historic temple)，在關係子句中擔任主詞，使用 which 或 that。", "先行詞為物且當子句主詞選 which。", "temple", "/ˈtem.pəl/", "寺廟", "construct", "/kənˈstrʌkt/", "興建建造"),
            ("The students ___ volunteer at the nursing home every Saturday are very caring.", "who", "which", "whose", "whom", "每週六在安養院當志工的那些學生們非常富有愛心。", "先行詞 The students 為人，引導主格關係子句使用 who。", "先行詞為人，擔任主詞選 who。", "volunteer", "/ˌvɑː.lənˈtɪr/", "自願服務", "caring", "/ˈker.ɪŋ/", "關懷他人的"),
            ("A dictionary is a useful reference book ___ explains the meanings of words.", "that", "who", "whom", "whose", "字典是一本解釋字詞涵義的實用工具書。", "先行詞 a book 為物，在關係子句中作主詞，選 that（或 which）。", "先行詞為物選 that。", "reference", "/ˈref.ɚ.əns/", "參考工具", "meaning", "/ˈmiː.nɪŋ/", "涵義"),
            ("The little girl ___ lives next door plays the violin beautifully.", "who", "which", "whom", "whose", "住在隔壁的那個小女孩把小提琴拉得非常動聽。", "先行詞 The little girl 為人，子句缺主詞，使用 who。", "先行詞為人選 who。", "violin", "/ˌvaɪəˈlɪn/", "小提琴", "door", "/dɔːr/", "門戶隔壁"),
            ("This is the robotic vacuum cleaner ___ cleans our floors automatically.", "which", "who", "whom", "whose", "這就是能夠自動打掃我們地板的掃地機器人。", "先行詞 robotic vacuum cleaner 為科技物品，主格關代用 which。", "科技機器先行詞選 which。", "robotic", "/roʊˈbɑː.t̬ɪk/", "機器人的", "vacuum", "/ˈvæk.juːm/", "真空吸塵"),
            ("People ___ consume a balanced diet are less likely to develop chronic diseases.", "who", "which", "whom", "whose", "攝取均衡飲食的人們罹患慢性病的機率較低。", "先行詞 People 為人，引導主格關係子句使用 who。", "先行詞為人選 who。", "chronic", "/ˈkrɑː.nɪk/", "慢性的", "disease", "/dɪˈziːz/", "疾病"),
            ("The solar panels ___ were installed on our school roof generate clean electricity.", "that", "who", "whom", "whose", "安裝在我們學校屋頂上的太陽能板產生乾淨的電力。", "先行詞 solar panels 為物，當關係子句主詞用 that（或 which）。", "物品先行詞選 that。", "solar", "/ˈsoʊ.lɚ/", "太陽能的", "generate", "/ˈdʒen.ə.reɪt/", "產生髮電"),
            ("The wildlife documentary ___ won the film festival prize impressed all viewers.", "which", "who", "whom", "whose", "榮獲影展大獎的那部野生動物紀錄片給所有觀眾留下了深刻印象。", "先行詞 documentary 為影視作品，選 which。", "紀錄片選 which。", "documentary", "/ˌdɑː.kjəˈmen.t̬ɚ.i/", "紀錄片", "impress", "/ɪmˈpres/", "留下深刻印象"),
            ("The young athlete ___ broke the national sprint record was praised by everyone.", "who", "which", "whom", "whose", "打破全國短跑紀錄的那位年輕運動員受到了所有人的稱讚。", "先行詞 athlete 為人，擔任子句主詞使用 who。", "運動員先行詞選 who。", "athlete", "/ˈæθ.liːt/", "運動員", "sprint", "/sprɪnt/", "衝刺短跑")
        ])
    ]
    
    # Let's populate the remaining 20 subtopics (subtopics 6 to 25)
    remaining_subtopics_3 = [
        # 6. 受格關係代名詞及其省略 (whom / which / that)
        ("受格關係代名詞及其省略 (whom / which / that)", "文法句構", [
            ("The novel ___ I borrowed from the public library was profoundly moving.", "which", "who", "whom", "whose", "我從公共圖書館借來的那本小說深深令人感動。", "先行詞 The novel 為物，在關係子句中作 borrowed 的受詞，使用 which（可省略）。", "受格關係代名詞修飾物用 which。", "profoundly", "/prəˈfaʊnd.li/", "深深地", "novel", "/ˈnɑː.vəl/", "小說"),
            ("The guest speaker ___ our school invited yesterday gave an inspiring speech.", "whom", "which", "whose", "what", "我們學校昨天邀請的那位演講貴賓發表了一場鼓舞人心的演講。", "先行詞 The guest speaker 為人，作 invited 的受格，正式語法使用 whom（亦可用 who/that 或省略）。", "先行詞為人且作受格選 whom。", "inspiring", "/ɪnˈspaɪr.ɪŋ/", "鼓舞人心的", "speaker", "/ˈspiː.kɚ/", "演講者"),
            ("The delicious strawberry cake ___ Mom baked yesterday was gone in minutes.", "that", "who", "whom", "whose", "媽媽昨天烤的美味草莓蛋糕幾分鐘內就被吃光了。", "先行詞 cake 為物，作 baked 的受詞，使用 that。", "受格修飾物選 that。", "delicious", "/dɪˈlɪʃ.əs/", "美味的", "bake", "/beɪk/", "烘烤"),
            ("The mentor ___ Leo respects most in his life is his junior high history teacher.", "whom", "which", "whose", "what", "Leo 一生中最尊敬的導師就是他的國中歷史老師。", "作 respects 的受詞，先行詞 The mentor 為人，使用 whom。", "受格指代人選 whom。", "mentor", "/ˈmen.tɔːr/", "導師引導者", "respect", "/rɪˈspekt/", "尊敬"),
            ("The new bicycle ___ Dad bought for my twelfth birthday is shiny and blue.", "which", "who", "whom", "whose", "爸爸買給我當十二歲生日禮物的新腳踏車閃亮又是藍色的。", "先行詞 bicycle 為物，作 bought 的受詞，選 which。", "受格指代物選 which。", "shiny", "/ˈʃaɪ.ni/", "閃亮的", "bicycle", "/ˈbaɪ.sə.kəl/", "腳踏車"),
            ("The talented musician ___ we saw performing at the concert was astonishing.", "whom", "which", "whose", "what", "我們在音樂會上看見演出的那位才華洋溢的音樂家令人驚嘆。", "先行詞 musician 為人，作 saw 的受格，選 whom。", "人稱受格關代選 whom。", "astonishing", "/əˈstɑː.nɪ.ʃɪŋ/", "令人驚嘆的", "musician", "/mjuːˈzɪʃ.ən/", "音樂家"),
            ("Is this the leather wallet ___ you lost on the playground yesterday?", "that", "who", "whom", "whose", "這就是你昨天在操場上弄丟的皮夾嗎？", "先行詞 wallet 為物，作 lost 的受詞，選 that。", "物之受格選 that。", "wallet", "/ˈwɑː.lɪt/", "皮夾", "leather", "/ˈleð.ɚ/", "皮革"),
            ("The foreign pen pal ___ Emily has been writing to lives in Melbourne.", "whom", "which", "whose", "what", "Emily 一直在通信的那位外國筆友住在墨爾本。", "介系詞 to 的受詞，先行詞為人，選 whom。", "介系詞受詞指代人選 whom。", "pen pal", "/ˈpen ˌpæl/", "筆友", "foreign", "/ˈfɔːr.ən/", "外國的"),
            ("The ancient artifacts ___ archaeologists excavated are now on display.", "which", "who", "whom", "whose", "考古學家發掘的那些古代文物現在正在陳列展覽。", "先行詞 artifacts 為物，作 excavated 受詞，選 which。", "文物受格選 which。", "artifact", "/ˈɑːr.t̬ə.fækt/", "文物手工藝品", "excavate", "/ˈek.skə.veɪt/", "挖掘出土"),
            ("The doctor ___ my grandfather consulted yesterday gave very reassuring advice.", "whom", "which", "whose", "what", "我爺爺昨天諮詢的那位醫生給予了非常令人安心的建議。", "作 consulted 的受詞，指代人選 whom。", "受格關代指代人選 whom。", "reassuring", "/ˌriː.əˈʃʊr.ɪŋ/", "令人寬慰安心的", "consult", "/kənˈsʌlt/", "請教諮詢")
        ]),
        # 7. 所有格關係代名詞 whose 之修飾
        ("所有格關係代名詞 whose 之修飾", "文法句構", [
            ("I have a classmate ___ father is an airline pilot for international flights.", "whose", "who", "whom", "which", "我有一位同班同學，他的父親是一名開國際航班的民航機師。", "表示「某人的父親」，關係子句名詞 father 前需用所有格關係代名詞 whose。", "表示所屬關係（某人的父親）選 whose。", "pilot", "/ˈpaɪ.lət/", "飛行員機師", "airline", "/ˈer.laɪn/", "航空公司"),
            ("The old tree ___ branches extended over the roof was struck by lightning.", "whose", "which", "who", "that", "那棵樹枝延伸至屋頂上方的大樹遭到了雷擊。", "先行詞 The old tree 為物，修飾其樹枝 (whose branches)，使用 whose。", "物品的所有格亦使用 whose。", "branch", "/bræntʃ/", "樹枝", "lightning", "/ˈlaɪt.nɪŋ/", "閃電雷擊"),
            ("We visited a traditional village ___ houses were built entirely of bamboo.", "whose", "which", "who", "whom", "我們參觀了一座房屋完全由竹子建造的傳統村落。", "修飾村莊的房屋 (whose houses)，使用所有格 whose。", "所屬關係修飾選 whose。", "entirely", "/ɪnˈtaɪr.li/", "完全地", "bamboo", "/bæmˈbuː/", "竹子"),
            ("The famous novelist ___ latest book became an instant bestseller gave a lecture.", "whose", "who", "whom", "which", "那位最新著作瞬間成為暢銷書的知名小說家發表了演講。", "修飾小說家的著作 (whose latest book)，使用 whose。", "人物的所有格選 whose。", "bestseller", "/ˌbestˈsel.ɚ/", "暢銷書", "novelist", "/ˈnɑː.vəl.ɪst/", "小說家"),
            ("The little boy ___ dog went missing yesterday was crying inconsolably.", "whose", "who", "whom", "which", "那隻小狗昨天走失的小男孩哭得傷心欲絕。", "修飾小男孩的狗 (whose dog)，選 whose。", "表示所屬選 whose。", "inconsolably", "/ˌɪn.kənˈsoʊ.lə.bli/", "極為悲痛難過地", "missing", "/ˈmɪs.ɪŋ/", "失蹤走失的"),
            ("A triangle is a geometric polygon ___ three interior angles sum to 180 degrees.", "whose", "which", "that", "who", "三角形是一個三個內角總和為180度的幾何多邊形。", "幾何多邊形的內角 (whose three interior angles)，選 whose。", "幾何所屬選 whose。", "polygon", "/ˈpɑː.li.ɡɑːn/", "多邊形", "interior", "/ɪnˈtɪr.i.ɚ/", "內部的"),
            ("The patient ___ medical report showed significant improvement was discharged.", "whose", "who", "whom", "which", "病歷報告顯示顯著好轉的那位病患獲准出院了。", "病患的報告 (whose medical report)，使用 whose。", "病患的報告選 whose。", "discharged", "/dɪsˈtʃɑːrdʒd/", "獲准出院", "improvement", "/ɪmˈpruːv.mənt/", "改善進步"),
            ("This is the historic mansion ___ owner donated it to the city government.", "whose", "who", "which", "that", "這就是宅邸主人將其捐贈給市政府的那棟歷史豪宅。", "豪宅的主人 (whose owner)，選 whose。", "物的所有人格選 whose。", "mansion", "/ˈmæn.ʃən/", "大豪宅邸", "donate", "/ˈdoʊ.neɪt/", "捐贈"),
            ("The talented student ___ artwork won first prize received a scholarship.", "whose", "who", "whom", "which", "藝術創作贏得第一名的那位才華學生獲得了獎學金。", "學生的藝術品 (whose artwork)，選 whose。", "所屬作品選 whose。", "scholarship", "/ˈskɑː.lɚ.ʃɪp/", "獎學金", "artwork", "/ˈɑːrt.wɝːk/", "藝術作品"),
            ("We adopted an injured bird ___ left wing was broken.", "whose", "which", "who", "that", "我們收養了一隻左邊翅膀骨折的受傷鳥兒。", "鳥兒的翅膀 (whose left wing)，使用 whose。", "動物身體器官所屬選 whose。", "adopt", "/əˈdɑːpt/", "收養領養", "wing", "/wɪŋ/", "翅膀")
        ]),
        # 8. 使役動詞 make / have / let / get 句型與受詞補語
        ("使役動詞 make / have / let / get 句型與受詞補語", "文法句構", [
            ("The inspiring movie made all the audience ___ tears of joy.", "shed", "to shed", "shedding", "sheds", "這部鼓舞人心的電影讓所有觀眾流下了喜悅的淚水。", "使役動詞 make + 受詞 + 原形動詞 (V) 作受詞補語。", "make + O + 原形動詞 shed。", "shed", "/ʃed/", "流出滴落", "audience", "/ˈɑː.di.əns/", "觀眾群"),
            ("Dad had the experienced mechanic ___ the car engine yesterday.", "inspect", "to inspect", "inspecting", "inspected", "爸爸昨天請經驗豐富的技師檢查了汽車引擎。", "使役動詞 have + 人 + 原形動詞 (inspect)。", "have + 人 + 原形動詞 inspect。", "mechanic", "/mɪˈkæn.ɪk/", "技師機械工", "inspect", "/ɪnˈspekt/", "檢查視察"),
            ("Mom let my younger sister ___ her friends over for a sleepover.", "invite", "to invite", "inviting", "invites", "媽媽允許我妹妹邀請她的朋友來家裡過夜派對。", "使役動詞 let + 受詞 + 原形動詞 (invite)。", "let + O + 原形動詞 invite。", "sleepover", "/ˈsliːpˌoʊ.vɚ/", "過夜派對", "invite", "/ɪnˈvaɪt/", "邀請"),
            ("Leo managed to get his reluctant brother ___ up the messy room.", "to tidy", "tidy", "tidying", "tidied", "Leo 設法說服讓他不情願的弟弟把凌亂的房間整理乾淨。", "使役動詞 get + 人 + 不定詞 (to + V) 作補語（注意 get 接 to-V！）。", "get + 人 + to-V，選 to tidy。", "reluctant", "/rɪˈlʌk.tənt/", "不情願的", "tidy", "/ˈtaɪ.di/", "收拾整潔"),
            ("The teacher had the students ___ their compositions in pairs.", "revise", "to revise", "revising", "revised", "老師請學生們兩人一組互相批改修訂作文。", "have + 人 + 原形動詞 (revise)。", "have + 人 + 原形動詞 revise。", "revise", "/rɪˈvaɪz/", "修改修訂", "composition", "/ˌkɑːm.pəˈzɪʃ.ən/", "作文作品"),
            ("Please don't let small failures ___ you from pursuing your goals.", "stop", "to stop", "stopping", "stopped", "請不要讓小小的挫折阻礙你追求目標的腳步。", "let + 受詞 + 原形動詞 (stop)。", "let + O + 原形動詞 stop。", "pursue", "/pɚˈsuː/", "追求實踐", "failure", "/ˈfeɪ.ljɚ/", "挫折失敗"),
            ("The funny joke told by Tony made everyone in the room ___.", "laugh", "to laugh", "laughing", "laughed", "Tony 講的滑稽笑話讓房間裡的每個人都放聲大笑。", "make + 受詞 + 原形動詞 (laugh)。", "make + O + 原形動詞 laugh。", "joke", "/dʒoʊk/", "笑話", "laugh", "/læf/", "大笑"),
            ("I need to have my broken bicycle ___ at the local repair shop.", "repaired", "repair", "to repair", "repairing", "我需要把壞掉的腳踏車在當地的修車行修好。", "have + 物 (bicycle) + 過去分詞 (p.p.) 表被動處置！", "have + 物 + p.p. 被動選 repaired。", "repair", "/rɪˈper/", "修理", "broken", "/ˈbroʊ.kən/", "壞掉的"),
            ("Can you get the computer technician ___ our software problem?", "to fix", "fix", "fixing", "fixed", "你能請電腦工程師幫忙排除我們的軟體問題嗎？", "get + 人 + to-V 表委託說服某人去做某事。", "get + 人 + to fix。", "technician", "/tekˈnɪʃ.ən/", "技術人員", "fix", "/fɪks/", "修復"),
            ("Sad news often makes people ___ deeply heartbroken and anxious.", "feel", "to feel", "feeling", "felt", "悲傷的消息往往讓人們感到深深的心碎與焦慮。", "make + 人 + 原形連綴動詞 (feel)。", "make + 人 + 原形 feel。", "anxious", "/ˈæŋk.ʃəs/", "焦慮不安的", "heartbroken", "/ˈhɑːrtˌbroʊ.kən/", "心碎的")
        ]),
        # 9. 感官動詞 see / hear / watch / notice + V / V-ing
        ("感官動詞 see / hear / watch / notice + V / V-ing", "文法句構", [
            ("I heard the soprano ___ a magnificent aria when I walked past the music hall.", "singing", "sang", "to sing", "sings", "當我走過音樂廳時，我聽見女高音正在演唱一首壯麗的詠嘆調。", "感官動詞 heard + 受詞 + V-ing (singing) 強調當時動作正在進行中。", "感官動詞強調進行態選 singing。", "soprano", "/səˈpræn.oʊ/", "女高音", "aria", "/ˈɑːr.i.ə/", "詠嘆調"),
            ("The guard noticed a shadowy figure ___ over the tall security fence.", "climb", "to climb", "climbed", "climbs", "警衛目睹一個黑影翻越了高高的安全圍牆。", "感官動詞 noticed + 受詞 + 原形動詞 (climb) 表示目睹了整個動作過程。", "感官動詞表示全過程接原形 climb。", "shadowy", "/ˈʃæd.oʊ.i/", "陰暗模糊的", "fence", "/fens/", "圍牆柵欄"),
            ("We watched the golden sun slowly ___ below the ocean horizon.", "sink", "to sink", "sunk", "sinks", "我們注視著金黃色的太陽緩緩沉入海平面下方。", "感官動詞 watched + 受詞 + 原形動詞 (sink) 或 sinking。", "感官動詞接原形動詞 sink。", "horizon", "/həˈraɪ.zən/", "地平線/海平面", "golden", "/ˈɡoʊl.dən/", "金色的"),
            ("Did you hear someone ___ on the front door just now?", "knocking", "knocked", "to knock", "knocks", "你剛才有聽見有人正在敲前門嗎？", "hear + 受詞 + knocking (敲門動作持續進行)。", "感官動詞接 knocking。", "knock", "/nɑːk/", "敲擊", "door", "/dɔːr/", "大門"),
            ("Emily saw a cute squirrel ___ acorns under the shady oak tree.", "gathering", "gathered", "to gather", "gathers", "Emily 看見一隻可愛的松鼠正在陰涼的橡樹下收集橡實。", "saw + 受詞 + gathering (採集動作進行中)。", "感官動詞接分詞 gathering。", "squirrel", "/ˈskwɝː.əl/", "松鼠", "acorn", "/ˈeɪ.kɔːrn/", "橡實"),
            ("I felt the ground beneath my feet ___ violently during the earthquake.", "tremble", "to tremble", "trembled", "trembles", "地震期間我感覺到腳下的地面劇烈地震動。", "felt + 受詞 + 原形動詞 (tremble) 或 trembling。", "感官動詞接原形 tremble。", "tremble", "/ˈtrem.bəl/", "顫抖震動", "violently", "/ˈvaɪə.lənt.li/", "劇烈猛烈地"),
            ("The teacher listened to the students ___ the English dialogue in pairs.", "practicing", "practiced", "to practice", "practices", "老師傾聽著學生們兩人一組正在練習英語對話。", "listened to + 受詞 + practicing (動作進行中)。", "感官動詞接 practicing。", "dialogue", "/ˈdaɪ.ə.lɑːɡ/", "對話", "listen to", "/ˈlɪs.ən tuː/", "聆聽"),
            ("We observed the bird ___ a sturdy nest using twigs and mud.", "build", "to build", "built", "builds", "我們觀察那隻鳥兒用細枝與泥土築起一座堅固的巢。", "observed + 受詞 + 原形動詞 build（完成完整築巢過程）。", "觀察動詞接原形 build。", "nest", "/nest/", "鳥巢", "sturdy", "/ˈstɝː.di/", "堅固結實的"),
            ("Can you smell something delicious ___ in Grandma's kitchen?", "baking", "baked", "to bake", "bakes", "你能聞到奶奶廚房裡有美味的食物正在烘烤的香氣嗎？", "smell + 受詞 + baking (進行中散發香氣)。", "感官動詞接 baking。", "bake", "/beɪk/", "烘烤", "delicious", "/dɪˈlɪʃ.əs/", "美味的"),
            ("I noticed Tony ___ the classroom silently through the back door.", "leave", "to leave", "left", "leaves", "我注意到 Tony 默默地從後門離開了教室。", "noticed + 受詞 + 原形動詞 leave。", "感官動詞接原形 leave。", "silently", "/ˈsaɪ.lənt.li/", "默默無聲地", "notice", "/ˈnoʊ.t̬ɪs/", "注意到")
        ]),
        # 10. 名詞子句 that 引導主詞與受詞
        ("名詞子句 that 引導主詞與受詞", "文法句構", [
            ("Our science teacher demonstrated ___ heat causes metal bars to expand.", "that", "what", "which", "who", "我們的自然老師證實了熱量會使金屬棒膨脹的原理。", "demonstrated 後接完整的陳述名詞子句，引導詞使用 that（不具疑問含義）。", "接完整客觀事實子句用 that。", "expand", "/ɪkˈspænd/", "膨脹擴展", "metal", "/ˈmet̬.əl/", "金屬"),
            ("___ exercise strengthens both physical stamina and mental focus is widely proven.", "That", "What", "Which", "Whether", "運動能夠同時增強體力與專注力這一點已獲得廣泛證實。", "位於句首引導完整名詞子句擔任全句之主詞，引導詞使用 That。", "主詞名詞子句引導詞用 That。", "stamina", "/ˈstæm.ə.nə/", "耐力體能", "proven", "/ˈpruː.vən/", "已證實的"),
            ("Leo realized ___ he had accidentally left his geometry compass at home.", "that", "what", "which", "where", "Leo 意識到他不小心把幾何圓規遺留在家裡了。", "realized 後接完整的名詞子句，使用 that 作連接詞。", "及物動詞後完整名詞子句用 that。", "geometry", "/dʒiˈɑː.mə.tri/", "幾何學", "compass", "/ˈkʌm.pəs/", "圓規/指南針"),
            ("Scientists believe ___ global climate change demands urgent international cooperation.", "that", "what", "which", "who", "科學家們深信全球氣候變遷需要緊急的國際合作。", "believe 後接完整客觀主張子句，引導詞用 that。", "動詞受格名詞子句用 that。", "cooperation", "/koʊˌɑː.pəˈreɪ.ʃən/", "合作協作", "climate", "/ˈklaɪ.mət/", "氣候"),
            ("I hope ___ our soccer team will emerge victorious in the upcoming finals.", "that", "what", "which", "where", "我希望我們的足球隊能在即將到來的決賽中脫穎而出奪得勝利。", "hope 後接完整的願望名詞子句，引導詞用 that。", "hope 後接 that 子句。", "victorious", "/vɪkˈtɔːr.i.əs/", "獲勝勝利的", "upcoming", "/ˈʌpˌkʌm.ɪŋ/", "即將到來的"),
            ("Doctors emphasize ___ adequate hydration is vital for maintaining renal health.", "that", "what", "which", "who", "醫生強調補充足夠的水分對於維持腎臟健康至關重要。", "emphasize 後接完整醫學事實名詞子句，使用 that。", "強調客觀事實用 that 子句。", "hydration", "/haɪˈdreɪ.ʃən/", "水分補充", "vital", "/ˈvaɪ.t̬əl/", "極重要的"),
            ("___ honest communication resolves misunderstandings is a universal truth.", "That", "What", "Which", "If", "坦誠的溝通能夠化解誤會，這是一條放諸四海皆準的真理。", "名詞子句當主詞，結構完整，使用 That 開頭。", "句首名詞子句主詞用 That。", "misunderstanding", "/ˌmɪs.ʌn.dɚˈstæn.dɪŋ/", "誤解", "universal", "/ˌjuː.nəˈvɝː.səl/", "普遍的"),
            ("The weather forecast predicts ___ temperatures will drop drastically over the weekend.", "that", "what", "which", "who", "氣象預報預測氣溫將在週末期間急遽下降。", "predict 後接完整預測內容子句，使用 that。", "predict 後接 that 子句。", "drastically", "/ˈdræs.tɪ.kəl.i/", "劇烈地", "forecast", "/ˈfɔːr.kæst/", "預報"),
            ("Emily discovered ___ her ancient ancestors were renowned ceramic artisans.", "that", "what", "which", "who", "Emily 發現她的古代祖先曾是赫赫有名的陶瓷工藝大師。", "discovered 後接完整歷史事實子句，使用 that。", "發現事實用 that 子句。", "ancestor", "/ˈæn.ses.tɚ/", "祖先", "artisan", "/ˈɑːr.t̬ə.zən/", "工匠藝人"),
            ("We all agree ___ protecting endangered wildlife is our shared global responsibility.", "that", "what", "which", "where", "我們都同意保護瀕危野生動物是我們共同的全球責任。", "agree 後接完整共識名詞子句，引導詞用 that。", "agree 後接 that 子句。", "endangered", "/ɪnˈdeɪn.dʒɚd/", "瀕臨絕種的", "responsibility", "/rɪˌspɑːn.səˈbɪl.ə.t̬i/", "責任")
        ]),
        # 11. 間接問句之疑問詞 + 主詞 + 動詞正裝語序
        ("間接問句之疑問詞 + 主詞 + 動詞正裝語序", "文法句構", [
            ("Excuse me, could you please tell me where the nearest post office ___?", "is", "is it", "does it", "be", "不好意思，您可以請告訴我最近的郵局在哪裡嗎？", "間接問句需使用「陳述正裝語序」：疑問詞 (where) + 主詞 (the post office) + 動詞 (is)，不可倒裝！", "間接問句使用正裝語序 where + S + V (is)。", "nearest", "/ˈnɪr.ɪst/", "最近的", "post office", "/ˈpoʊst ˌɑː.fɪs/", "郵局"),
            ("Nobody in the classroom knows when the math exam ___ next week.", "will take place", "will it take place", "does it take place", "is it taking", "班上沒有人知道下週數學考試究竟會在何時舉行。", "間接問句正裝語序：when + 主詞 (the exam) + 動詞 (will take place)。", "間接問句不倒裝，選 will take place。", "take place", "/teɪk pleɪs/", "舉行發生", "exam", "/ɪɡˈzæm/", "考試"),
            ("Can you explain how this complex mechanical watch ___?", "works", "does it work", "is it working", "work", "你能解釋這只複雜的機械手錶是如何運作的嗎？", "間接問句語序：how + 主詞 (this watch) + 動詞單數 (works)。", "how + 主詞 + 動詞 works。", "mechanical", "/məˈkæn.ɪ.kəl/", "機械的", "complex", "/kɑːmˈpleks/", "複雜的"),
            ("I wonder why Tony ___ absent from school yesterday.", "was", "was he", "did he", "is", "我納悶 Tony 昨天為什麼會曠課沒來上學。", "正裝語序：why + 主詞 (Tony) + 動詞過去式 (was)。", "間接問句不倒裝，選 was。", "absent", "/ˈæb.sənt/", "缺席的", "wonder", "/ˈwʌn.dɚ/", "納悶想知道"),
            ("Please let me know what time the library ___ on Sunday afternoons.", "closes", "does it close", "is it closing", "close", "請讓我知道圖書館在週日下午幾點閉館。", "正裝語序：what time + 主詞 (the library) + 動詞 (closes)。", "正裝語序選 closes。", "close", "/kloʊz/", "關閉", "library", "/ˈlaɪ.brer.i/", "圖書館"),
            ("Do you know who ___ that revolutionary scientific discovery?", "made", "did make", "did he make", "was made", "你知道是誰做出了那一項革命性的科學發現嗎？", "who 當疑問詞同時兼任主詞，後方直接接動詞 made。", "who 作主詞直接接動詞 made。", "revolutionary", "/ˌrev.əˈluː.ʃən.er.i/", "革命性的", "discovery", "/dɪˈskʌv.ɚ.i/", "發現"),
            ("The tourist asked a passerby how much the museum admission ticket ___.", "cost", "did it cost", "does it cost", "is it costing", "遊客向路人詢問博物館入場門票要花多少錢。", "正裝語序：how much + 主詞 (the ticket) + 動詞過去式 (cost)。", "正裝語序不倒裝選 cost。", "passerby", "/ˈpæs.ɚ.baɪ/", "路人過客", "admission", "/ədˈmɪʃ.ən/", "門票入場"),
            ("I can't remember where I ___ my house keys last night.", "put", "did I put", "was I putting", "have put", "我想不起來昨晚我把家門鑰匙放在哪裡了。", "正裝語序：where + 主詞 (I) + 過去動詞 (put)。", "間接問句正裝選 put。", "key", "/kiː/", "鑰匙", "remember", "/rɪˈmem.bɚ/", "記得"),
            ("The teacher asked Emily why she ___ her project assignment late.", "submitted", "did she submit", "was she submitting", "submits", "老師詢問 Emily 為什麼她會遲交專題作業。", "正裝語序：why + 主詞 (she) + 過去動詞 (submitted)。", "正裝語序選 submitted。", "assignment", "/əˈsaɪn.mənt/", "作業任務", "submit", "/səbˈmɪt/", "遞交"),
            ("Could you show me how I ___ operate this new microwave oven?", "can", "can I", "do I", "am I", "您可以示範給我看我該如何操作這台新微波爐嗎？", "正裝語序：how + 主詞 (I) + 助動詞 (can) + 原形動詞 (operate)。", "主詞在助動詞前選 can。", "operate", "/ˈɑː.pə.reɪt/", "操作運轉", "microwave", "/ˈmaɪ.kroʊ.weɪv/", "微波爐")
        ]),
        # 12. whether / if 引導之名詞子句
        ("whether / if 引導之名詞子句", "文法句構", [
            ("I am not sure ___ the typhoon will make landfall tomorrow morning.", "whether", "that", "what", "which", "我不確定颱風明天早上是否會登陸。", "not sure 後表示「是否」的不確定名詞子句，引導詞使用 whether 或 if。", "表「是否」選 whether。", "landfall", "/ˈlænd.fɑːl/", "登陸", "typhoon", "/taɪˈfuːn/", "颱風"),
            ("The teacher asked Tony ___ he had finished his math assignment.", "if", "that", "what", "which", "老師詢問 Tony 他是否已經完成了數學作業。", "asked 後引導是否完成的名詞子句，使用 if 或 whether。", "詢問是否用 if。", "assignment", "/əˈsaɪn.mənt/", "作業", "finish", "/ˈfɪn.ɪʃ/", "完成"),
            ("___ we can hold the outdoor sports day depends entirely on the weather.", "Whether", "If", "That", "What", "我們能否舉辦室外運動會完全取決於天氣狀況。", "位於句首引導名詞子句當全句主詞時，只能使用 Whether，不可使用 if！", "句首當主詞只能用 Whether，不可用 if。", "depend", "/dɪˈpend/", "取決於", "entirely", "/ɪnˈtaɪr.li/", "完全地"),
            ("Leo has to decide ___ to accept the scholarship or stay in Taiwan.", "whether", "if", "that", "what", "Leo 必須決定究竟是要接受獎學金還是留在台灣。", "whether or not / whether... or... 結構，固定搭配 whether。", "whether... or 結構選 whether。", "scholarship", "/ˈskɑː.lɚ.ʃɪp/", "獎學金", "decide", "/dɪˈsaɪd/", "決定"),
            ("I wonder ___ it will snow in the high mountains this weekend.", "if", "that", "what", "which", "我納悶這週末高山上是否會下雪。", "wonder 後接「是否」名詞子句，使用 if 或 whether。", "wonder 接 if 表是否。", "snow", "/snoʊ/", "降雪", "mountain", "/ˈmaʊn.tən/", "山嶺"),
            ("The doctor wants to know ___ the patient is allergic to penicillin.", "whether", "that", "what", "which", "醫生想知道該病患是否對盤尼西林過敏。", "想知道「是否」過敏，名詞子句引導詞用 whether。", "表是否過敏選 whether。", "allergic", "/əˈlɝː.dʒɪk/", "過敏的", "patient", "/ˈpeɪ.ʃənt/", "病患"),
            ("We discussed the question of ___ online education can replace traditional schooling.", "whether", "if", "that", "what", "我們討論了線上教育是否能夠取代傳統學校教育的問題。", "介系詞 of 後方接名詞子句表示「是否」時，只能用 whether，不可用 if！", "介系詞後只能用 whether，不可用 if。", "replace", "/rɪˈpleɪs/", "取代代換", "schooling", "/ˈskuː.lɪŋ/", "學校教育"),
            ("I don't care ___ you agree with my proposal or disagree.", "whether", "if", "that", "what", "我不在乎你究竟是贊成我的提議還是反對。", "whether... or 結構固定搭配 whether。", "搭配 or 選 whether。", "proposal", "/prəˈpoʊ.zəl/", "提案提議", "disagree", "/ˌdɪs.əˈɡriː/", "不同意"),
            ("Emily asked her mother ___ she could adopt the abandoned puppy.", "if", "that", "what", "which", "Emily 詢問媽媽她是否可以領養那隻被遺棄的小狗。", "詢問是否許可使用 if。", "詢問是否用 if。", "adopt", "/əˈdɑːpt/", "領養收養", "puppy", "/ˈpʌp.i/", "小狗"),
            ("It is still uncertain ___ the construction project will be completed on time.", "whether", "that", "what", "which", "這項建設工程能否如期完工目前仍是不確定的。", "It is uncertain 表不確定，後方接 whether 引導之真主詞子句。", "uncertain 對應 whether。", "uncertain", "/ʌnˈsɝː.tən/", "不確定的", "construction", "/kənˈstrʌk.ʃən/", "工程建設")
        ]),
        # 13. so... that 與 too... to 結果句型轉換
        ("so... that 與 too... to 結果句型轉換", "文法句構", [
            ("The luggage was ___ heavy that the little boy could not lift it.", "so", "too", "very", "such", "行李太重了，以至於小男孩抬不起來。", "so + 形容詞/副詞 + that 子句 表示「如此…以致於…」之因果結果句型。", "搭配 that 子句使用 so heavy that。", "luggage", "/ˈlʌɡ.ɪdʒ/", "行李箱包", "lift", "/lɪft/", "抬起舉起"),
            ("The coffee was ___ hot for the child to drink immediately.", "too", "so", "very", "quite", "這杯咖啡太燙了，小孩子無法立刻喝下去。", "too + 形容詞 + for sb + to V 句型，表示「太…而不能…」。", "too... to 句型表示太過而不能。", "immediately", "/ɪˈmiː.di.ət.li/", "立刻地", "coffee", "/ˈkɑː.fi/", "咖啡"),
            ("Tony ran ___ fast that nobody in the sprint race could catch up with him.", "so", "too", "very", "such", "Tony 跑得如此飛快，以致於短跑賽中無人能趕上他。", "so + 副詞 fast + that 子句。", "so fast that 結構完整。", "sprint", "/sprɪnt/", "衝刺短跑", "catch up", "/kætʃ ʌp/", "追趕上"),
            ("The stone was ___ heavy for us to move without heavy machinery.", "too", "so", "very", "much", "這塊巨石太重了，我們若沒有重型機械便無法搬動它。", "too + adj + for sb to V 結構。", "too heavy to move。", "machinery", "/məˈʃiː.nɚ.i/", "機械設備", "heavy", "/ˈhev.i/", "沉重的"),
            ("Emily was ___ exhausted that she fell asleep on the sofa instantly.", "so", "too", "very", "such", "Emily 實在太疲憊了，以至於她立刻在沙發上睡著了。", "so + exhausted + that 子句。", "so exhausted that。", "exhausted", "/ɪɡˈzɑː.stɪd/", "精疲力竭的", "instantly", "/ˈɪn.stənt.li/", "立刻瞬間"),
            ("The weather was ___ cold to go swimming in the outdoor pool.", "too", "so", "very", "quite", "天氣太冷了，無法去室外游泳池游泳。", "too cold to go swimming。", "too... to 結構選 too。", "outdoor", "/ˈaʊtˌdɔːr/", "室外的", "pool", "/puːl/", "泳池"),
            ("He gave ___ an inspiring speech that the entire auditorium applauded.", "such", "so", "very", "too", "他發表了一場如此鼓舞人心的演講，以至於整個禮堂都起立鼓掌。", "such + a/an + adj + 單數名詞 + that 子句 (such an inspiring speech that)。", "such a + adj + 名詞 + that 選 such。", "applaud", "/əˈplɑːd/", "鼓掌喝采", "inspiring", "/ɪnˈspaɪr.ɪŋ/", "鼓舞人心的"),
            ("The math riddle was ___ difficult that even the teacher needed time to solve it.", "so", "too", "very", "such", "這道數學謎題如此困難，以致於連老師都需要時間來解開它。", "so + difficult + that 子句。", "so difficult that 選 so。", "riddle", "/ˈrɪd.əl/", "謎題謎語", "difficult", "/ˈdɪf.ə.kəlt/", "困難的"),
            ("The shoes are ___ small for Leo to wear comfortably.", "too", "so", "very", "quite", "這雙鞋太小了，Leo 無法舒適地穿上它。", "too small for sb to wear。", "too small to wear 選 too。", "comfortably", "/ˈkʌm.fɚ.t̬ə.bli/", "舒適地", "small", "/smɑːl/", "狹小的"),
            ("Grandpa was ___ touched that tears welled up in his eyes.", "so", "too", "very", "such", "爺爺如此受感動，以至於眼眶裡湧出了淚水。", "so + touched + that 子句。", "so touched that 選 so。", "touched", "/tʌtʃt/", "受感動的", "well up", "/wel ʌp/", "湧出湧現")
        ]),
        # 14. enough to 與 adj + enough 句型
        ("enough to 與 adj + enough 句型", "文法句構", [
            ("Tony is old ___ to obtain a legal motorcycle driver's license.", "enough", "too", "so", "very", "Tony 已經到了足夠的法定年齡，能夠考取合法的機車駕照。", "形容詞後置修飾：形容詞 (old) + enough + to V。", "形容詞後放 enough，構成 old enough to V。", "license", "/ˈlaɪ.səns/", "執照執照", "legal", "/ˈliː.ɡəl/", "合法的"),
            ("The little boy is strong ___ to lift the heavy carton by himself.", "enough", "too", "so", "such", "這個小男孩足夠強壯，能靠自己搬起沉重的紙箱。", "形容詞 (strong) + enough + to V。", "strong enough to lift。", "carton", "/ˈkɑːr.t̬ən/", "紙箱", "strong", "/strɑːŋ/", "強壯的"),
            ("Do we have ___ time to visit the museum before the train departs?", "enough", "too", "so", "very", "在火車開出之前，我們有足夠的時間參觀博物館嗎？", "修飾名詞時，enough 置於名詞前面：enough + 名詞 (enough time)。", "修飾名詞置於名詞前用 enough time。", "depart", "/dɪˈpɑːrt/", "啟程離開", "museum", "/mjuːˈziː.əm/", "博物館"),
            ("The water in the kettle is not hot ___ to brew black tea properly.", "enough", "too", "so", "very", "水壺裡的水不夠熱，無法適當沖泡紅茶。", "形容詞 (hot) + enough + to V。", "hot enough to brew。", "kettle", "/ˈket̬.əl/", "水壺", "brew", "/bruː/", "沖泡"),
            ("Leo spoke clearly ___ for everyone in the back row to hear.", "enough", "too", "so", "such", "Leo 說話足夠清晰，後排的每個人都能聽見。", "副詞 (clearly) + enough + to V。", "clearly enough to hear。", "row", "/roʊ/", "排", "clearly", "/ˈklɪr.li/", "清晰地"),
            ("The classroom is large ___ to accommodate forty students comfortably.", "enough", "too", "so", "very", "這間教室足夠大，能舒適容納四十名學生。", "形容詞 (large) + enough + to V。", "large enough to accommodate。", "accommodate", "/əˈkɑː.mə.deɪt/", "容納提供住宿", "large", "/lɑːrdʒ/", "寬敞的"),
            ("There isn't ___ food in the refrigerator to feed six hungry guests.", "enough", "too", "so", "very", "冰箱裡沒有足夠的食物來招待六位飢餓的客人。", "enough + 不可數名詞 (enough food)。", "修飾不可數名詞用 enough food。", "refrigerator", "/rɪˈfrɪdʒ.ə.reɪ.t̬ɚ/", "冰箱", "guest", "/ɡest/", "客人"),
            ("She was kind ___ to lend me her umbrella on that rainy afternoon.", "enough", "too", "so", "such", "在那個下雨的下午，她非常仁慈地把她的雨傘借給了我。", "be kind enough to V 表示仁慈客氣地做某事。", "kind enough to lend。", "lend", "/lend/", "借出", "kind", "/kaɪnd/", "仁慈的"),
            ("The weather was warm ___ to have our lunch outdoors in the courtyard.", "enough", "too", "so", "very", "天氣足夠溫暖，我們可以在戶外庭院吃午餐。", "warm enough to have lunch。", "warm enough to V。", "courtyard", "/ˈkɔːrt.jɑːrd/", "庭院中庭", "warm", "/wɔːrm/", "溫暖的"),
            ("We didn't have ___ money to purchase the premium concert ticket.", "enough", "too", "so", "very", "我們沒有足夠的錢購買這張特等音樂會門票。", "enough + 不可數名詞 (enough money)。", "修飾金錢用 enough money。", "purchase", "/ˈpɝː.tʃəs/", "採購購買", "premium", "/ˈpriː.mi.əm/", "高級特等的")
        ]),
        # 15. used to V 與 be used to V-ing 習慣語意辨析
        ("used to V 與 be used to V-ing 習慣語意辨析", "文法句構", [
            ("Grandpa ___ smoke heavily, but he quit twenty years ago.", "used to", "is used to", "was used to", "used", "爺爺過去曾經抽菸抽得很兇，但他二十年前就戒菸了。", "used to + 原形動詞 (V) 表示「過去曾經（現在已無）的習慣或狀態」。", "過去曾經選 used to + 原形動詞。", "smoke", "/smoʊk/", "吸菸", "quit", "/kwɪt/", "戒除停止"),
            ("Living in London for three years, Leo is now used to ___ on the left.", "driving", "drive", "to drive", "drove", "在倫敦生活了三年，Leo 現在已經習慣靠左開車了。", "be used to + V-ing（或名詞）表示「習慣於…」。", "be used to 接動名詞 driving。", "left", "/left/", "左邊", "habit", "/ˈhæb.ɪt/", "習慣"),
            ("Emily used to ___ long hair when she was an elementary school student.", "have", "having", "had", "has", "Emily 讀小學的時候過去曾留著一頭長髮。", "used to + 原形動詞 have。", "used to 後接原形動詞 have。", "elementary", "/ˌel.əˈmen.t̬ɚ.i/", "國小的", "hair", "/her/", "頭髮"),
            ("Taiwanese students are used to ___ uniforms to school on weekdays.", "wearing", "wear", "to wear", "wore", "台灣學生習慣在平日上學時穿著制服。", "are used to + V-ing (wearing)。", "習慣於穿著選 wearing。", "uniform", "/ˈjuː.nə.fɔːrm/", "制服", "weekday", "/ˈwiːk.deɪ/", "平日工作日"),
            ("There ___ be an old wooden bridge over this river decades ago.", "used to", "is used to", "was used to", "used", "數十年前這條河上曾經有一座老木橋。", "There used to be... 表示「過去曾經存在著…」。", "過去曾存在用 There used to be。", "wooden", "/ˈwʊd.ən/", "木製的", "decade", "/ˈdek.eɪd/", "十年"),
            ("Tony is gradually getting used to ___ up at 6:00 a.m. every morning.", "waking", "wake", "to wake", "woke", "Tony 正逐漸習慣每天早上六點整起床。", "get used to + V-ing (waking) 表示逐漸適應習慣。", "get used to 接動名詞 waking。", "gradually", "/ˈɡrædʒ.u.ə.li/", "逐漸地", "wake", "/weɪk/", "醒來"),
            ("We ___ play hide-and-seek in this neighborhood when we were children.", "used to", "are used to", "used", "were used to", "小時候我們過去常常在這個社區玩捉迷藏。", "used to + 原形動詞 play。", "過去常做用 used to play。", "neighborhood", "/ˈneɪ.bɚ.hʊd/", "鄰里社區", "hide-and-seek", "/ˌhaɪd.ənˈsiːk/", "捉迷藏"),
            ("The chef is used to ___ in a noisy and high-temperature kitchen.", "working", "work", "to work", "worked", "這位主廚早已習慣在嘈雜且高溫的廚房裡工作。", "is used to + V-ing (working)。", "習慣於工作選 working。", "noisy", "/ˈnɔɪ.zi/", "吵雜喧鬧的", "chef", "/ʃef/", "主廚"),
            ("Wood is used ___ make sturdy paper and fine wooden furniture.", "to", "for", "by", "with", "木材被用來製作堅固的紙張與優良的木製家具。", "被動語態：S (物) + be used to + V (make) 表示「被用來做某事」！", "物被用來做某事用 is used to make。", "sturdy", "/ˈstɝː.di/", "堅固耐用的", "furniture", "/ˈfɝː.nɪ.tʃɚ/", "家具"),
            ("Did you ___ live near the harbor before moving to this apartment?", "use to", "used to", "using to", "be used to", "在搬到這棟公寓之前，你過去曾經住在港口附近嗎？", "疑問句配合助動詞 Did，動詞回歸原形：Did you use to live...?", "Did 疑問句中回歸原形 use to。", "harbor", "/ˈhɑːr.bɚ/", "港口海港", "apartment", "/əˈpɑːrt.mənt/", "公寓大樓")
        ]),
        # 16. either... or 與 neither... nor 主謂一致性
        ("either... or 與 neither... nor 主謂一致性", "文法句構", [
            ("Either Tony or his twin brothers ___ responsible for feeding the dog tonight.", "are", "is", "be", "was", "今晚不是 Tony 就是他的雙胞胎弟弟們要負責餵狗。", "either A or B 連接主詞時，動詞依循「就近原則」，由較靠近的 his twin brothers (複數) 決定，使用 are！", "就近原則：靠近動詞之 brothers 複數決定 are。", "responsible", "/rɪˈspɑːn.sə.bəl/", "負有責任的", "twin", "/twɪn/", "雙胞胎"),
            ("Neither the teacher nor the students ___ pleased with the exam results.", "were", "was", "is", "be", "無論是老師還是學生們都對考試成績感到不滿意。", "neither A nor B 就近原則：靠近動詞的主詞 the students 為複數，過去式使用 were！", "就近原則：複數 students 決定 were。", "pleased", "/pliːzd/", "感到欣慰滿意的", "result", "/rɪˈzʌlt/", "成果成績"),
            ("You can choose ___ the chocolate cake or the strawberry cheesecake.", "either", "neither", "both", "not only", "你可以選擇巧克力蛋糕或是草莓起司蛋糕兩者之一。", "either A or B 表示「兩者擇一」。", "兩者選一搭配 either... or。", "cheesecake", "/ˈtʃiːz.keɪk/", "乳酪起司蛋糕", "choose", "/tʃuːz/", "挑選選擇"),
            ("Neither Leo nor his sister ___ to participate in the marathon race.", "wants", "want", "are wanting", "have wanted", "Leo 和他妹妹兩個人都不想參加這場馬拉松賽事。", "就近原則：靠近動詞的 his sister 為第三人稱單數，動詞使用單數 wants！", "就近原則：單數 sister 決定 wants。", "participate", "/pɑːrˈtɪs.ə.peɪt/", "參與參加", "marathon", "/ˈmær.ə.θɑːn/", "馬拉松"),
            ("Either you or I ___ going to represent our class in the speech contest.", "am", "are", "is", "be", "不是你就是我要代表我們班去參加演講比賽。", "就近原則：靠近動詞的主詞為 I，be 動詞現在式使用 am！", "就近原則：靠近動詞之 I 搭配 am。", "represent", "/ˌrep.rɪˈzent/", "代表", "contest", "/ˈkɑːn.test/", "競賽"),
            ("Neither of the two candidates ___ sufficient leadership experience.", "has", "have", "is having", "are having", "兩位候選人當中沒有一位具備足夠的領導經驗。", "Neither of + 複數名詞，主詞核心為代名詞 Neither（視為單數），動詞使用 has！", "Neither of 單數主詞搭配 has。", "candidate", "/ˈkæn.dɪ.deɪt/", "候選人", "sufficient", "/səˈfɪʃ.ənt/", "充足足夠的"),
            ("We can travel to Kaohsiung ___ by high-speed rail or by highway bus.", "either", "neither", "both", "and", "我們可以選擇搭乘高鐵或是國道客運前往高雄。", "either A or B 連接對等介系詞片語。", "兩者擇一選 either。", "highway", "/ˈhaɪ.weɪ/", "國道公路", "travel", "/ˈtræv.əl/", "旅行移動"),
            ("Neither of my parents ___ coffee; they both drink green tea.", "drinks", "drink", "are drinking", "have drunk", "我父母雙親都不喝咖啡；他們兩人都喝綠茶。", "Neither of + 複數名詞，文法上視為單數，動詞使用 drinks。", "Neither of 單數動詞選 drinks。", "parent", "/ˈper.ənt/", "雙親", "both", "/boʊθ/", "兩者皆"),
            ("You must decide ___ now or never.", "either", "neither", "both", "whether", "你必須決定，要嘛現在做，要嘛永遠不做。", "either now or never 經典慣用語。", "either... or 慣用選 either。", "decide", "/dɪˈsaɪd/", "做決定", "never", "/ˈnev.ɚ/", "絕不"),
            ("Neither the principal nor the teachers ___ to cancel the sports day.", "want", "wants", "is wanting", "wishes", "無論是校長還是老師們都不想取消運動會。", "就近原則：the teachers 為複數，動詞使用原形 want。", "就近原則複數 teachers 決定 want。", "principal", "/ˈprɪn.sə.pəl/", "校長", "cancel", "/ˈkæn.səl/", "取消")
        ]),
        # 17. not only... but also 連接對等成分
        ("not only... but also 連接對等成分", "文法句構", [
            ("Emily is not only intelligent ___ extremely hardworking in her studies.", "but also", "and also", "as well", "too", "Emily 不僅聰穎敏慧，而且在學業上極為勤奮刻苦。", "not only A but also B 相關連接詞結構，表示「不僅…而且…」。", "not only 固定搭配 but also。", "intelligent", "/ɪnˈtel.ə.dʒənt/", "聰穎有智慧的", "hardworking", "/ˌhɑːrdˈwɝː.kɪŋ/", "勤奮的"),
            ("Not only the students but also their homeroom teacher ___ excited about the trip.", "was", "were", "are", "be", "不僅是學生們，連他們的班導師也對這趟旅程感到興奮不已。", "not only A but also B 連接主詞時，動詞依循就近原則，由 their teacher (單數) 決定 was！", "就近原則：單數 teacher 決定 was。", "excited", "/ɪkˈsaɪ.t̬ɪd/", "興奮狂喜的", "homeroom", "/ˈhoʊm.ruːm/", "原班導師"),
            ("Reading books not only expands knowledge ___ stimulates creative thinking.", "but also", "and", "or", "as well as", "閱讀書籍不僅能拓展知識，而且還能激發創造性思維。", "not only expands... but also stimulates... 連接兩個對等的第三人稱單數動詞。", "連接對等動詞選 but also。", "stimulate", "/ˈstɪm.jə.leɪt/", "激發刺激", "creative", "/kriˈeɪ.t̬ɪv/", "創造力的"),
            ("Tony can speak not only English ___ French fluently.", "but also", "and too", "as well", "also", "Tony 不僅能流利說英語，而且還會說法語。", "not only English but also French 連接對等名詞。", "連接對等名詞選 but also。", "fluently", "/ˈfluː.ənt.li/", "流利順暢地", "French", "/frentʃ/", "法語"),
            ("The new community library is not only spacious ___ very modern.", "but also", "and as well", "too", "so", "這座新社區圖書館不僅空間寬敞，而且非常現代化。", "not only spacious but also very modern 連接對等形容詞。", "連接對等形容詞選 but also。", "spacious", "/ˈspeɪ.ʃəs/", "寬敞寬闊的", "modern", "/ˈmɑː.dɚn/", "現代化的"),
            ("Not only Tony but also his teammates ___ praised by the school principal.", "were", "was", "is", "has been", "不僅是 Tony，連他的隊友們也受到了校長的公開稱讚。", "就近原則：靠近動詞的 teammates 為複數，過去被動使用 were praised！", "就近原則：複數 teammates 決定 were。", "praise", "/preɪz/", "稱讚讚美", "teammate", "/ˈtiːm.meɪt/", "隊友夥伴"),
            ("Physical exercise not only strengthens muscles ___ improves sleep quality.", "but also", "and so", "too", "as well", "體育鍛鍊不僅能夠強健肌肉，而且能提升睡眠品質。", "not only strengthens... but also improves... 對等動詞。", "連接對等動詞選 but also。", "muscle", "/ˈmʌs.əl/", "肌肉", "quality", "/ˈkwɑː.lə.t̬i/", "品質水準"),
            ("She is admired not only for her talent ___ for her extraordinary modesty.", "but also", "and also", "as well", "too", "她受人欽佩不僅是因為她的才華，而且更是因為她非凡的謙遜美德。", "not only for... but also for... 連接對等介系詞片語。", "連接對等介系詞片語選 but also。", "extraordinary", "/ɪkˈstrɔːr.dən.er.i/", "非凡出眾的", "modesty", "/ˈmɑː.də.sti/", "謙遜謙恭"),
            ("The typhoon brought not only violent winds ___ torrential rainfall.", "but also", "and", "or", "as well", "這場颱風不僅帶來了狂暴的強風，而且帶來了傾盆的豪雨。", "not only winds but also rainfall 連接對等名詞受詞。", "連接對等名詞選 but also。", "torrential", "/tɔːˈren.ʃəl/", "傾盆洶湧的", "rainfall", "/ˈreɪn.fɑːl/", "降雨量"),
            ("Not only the doctor but also the nurses ___ working tirelessly to treat the patients.", "are", "is", "was", "be", "不僅是醫生，連護理師們也都在不知疲倦地工作以治療病患。", "就近原則：the nurses 為複數，動詞使用 are。", "就近原則：複數 nurses 搭配 are。", "tirelessly", "/ˈtaɪr.ləs.li/", "不知疲倦地", "treat", "/triːt/", "醫治診治")
        ]),
        # 18. 授與動詞雙賓語與介系詞 to / for (give to, buy for)
        ("授與動詞雙賓語與介系詞 to / for (give to, buy for)", "文法句構", [
            ("Dad bought a stylish new bicycle ___ my brother on his birthday.", "for", "to", "at", "with", "爸爸在我哥哥生日時買了一輛時髦的新腳踏車給他。", "授與動詞 buy/make/cook/bake 表「為某人付出心力準備」，介系詞固定搭配 for！", "buy + 物 + for + 人。", "stylish", "/ˈstaɪ.lɪʃ/", "時髦時尚的", "bicycle", "/ˈbaɪ.sə.kəl/", "腳踏車"),
            ("Emily sent a heartfelt thank-you card ___ her homeroom teacher.", "to", "for", "at", "on", "Emily 寄了一張情真意切的感謝卡給她的班導師。", "授與動詞 send/give/tell/show 表「方向傳遞性傳達」，介系詞搭配 to！", "send + 物 + to + 人。", "heartfelt", "/ˈhɑːrt.felt/", "真誠由衷的", "card", "/kɑːrd/", "卡片"),
            ("Mom made a delicious chocolate cake ___ our family reunion party.", "for", "to", "with", "at", "媽媽為我們的家族團聚派對烤了一個美味的巧克力蛋糕。", "make + 物 + for + 人/派對。", "make 搭配介系詞 for。", "reunion", "/ˌriːˈjuː.njən/", "團聚聚會", "delicious", "/dɪˈlɪʃ.əs/", "美味好吃的"),
            ("The librarian handed the rare history book ___ the eager student.", "to", "for", "in", "by", "圖書館員將那本珍貴的歷史書籍遞交給了求知若渴的學生。", "hand + 物 + to + 人 表遞交動作方向性。", "hand 搭配介系詞 to。", "eager", "/ˈiː.ɡɚ/", "渴望熱切的", "librarian", "/laɪˈbrer.i.ən/", "圖書館員"),
            ("Uncle Mark cooked a wonderful seafood dinner ___ all of us last night.", "for", "to", "at", "with", "Mark 叔叔昨晚為我們所有人烹調了一頓豐盛的海鮮晚餐。", "cook + 物 + for + 人。", "cook 搭配介系詞 for。", "seafood", "/ˈsiː.fuːd/", "海鮮", "dinner", "/ˈdɪn.ɚ/", "晚餐"),
            ("Please pass the salt shaker ___ me; the soup needs more flavor.", "to", "for", "at", "in", "請把鹽罐遞給我；這碗湯需要更多風味。", "pass + 物 + to + 人 表遞送動作。", "pass 搭配介系詞 to。", "shaker", "/ˈʃeɪ.kɚ/", "調味罐", "flavor", "/ˈfleɪ.vɚ/", "風味"),
            ("Grandpa built a cozy wooden birdhouse ___ the garden birds.", "for", "to", "at", "with", "爺爺為花園裡的小鳥建造了一座舒適的木製鳥屋。", "build + 物 + for + 對象。", "build 搭配介系詞 for。", "cozy", "/ˈkoʊ.zi/", "舒適溫馨的", "birdhouse", "/ˈbɝːd.haʊs/", "鳥屋"),
            ("The guide showed the historic fortress ___ the enthusiastic foreign tourists.", "to", "for", "at", "by", "導遊將那座歷史要塞展示介紹給熱情的國外觀光客。", "show + 物 + to + 人。", "show 搭配介系詞 to。", "fortress", "/ˈfɔːr.trəs/", "要塞堡壘", "enthusiastic", "/ɪnˌθuː.ziˈæs.tɪk/", "熱情熱烈的"),
            ("Tony bought an expensive bouquet of roses ___ his mother on Mother's Day.", "for", "to", "at", "with", "Tony 在母親節為媽媽買了一束昂貴的玫瑰花束。", "buy + 物 + for + 人。", "buy 搭配介系詞 for。", "bouquet", "/buˈkeɪ/", "花束", "expensive", "/ɪkˈspen.sɪv/", "昂貴的"),
            ("The teacher taught an important grammar lesson ___ the entire class.", "to", "for", "with", "in", "老師給全班同學講授了一堂重要的文法課。", "teach + 課程 + to + 學生。", "teach 搭配介系詞 to。", "lesson", "/ˈles.ən/", "課程課業", "grammar", "/ˈɡræm.ɚ/", "文法語法")
        ]),
        # 19. It is + adj + for sb to V 虛主詞句型
        ("It is + adj + for sb to V 虛主詞句型", "文法句構", [
            ("It is essential ___ teenagers to develop consistent physical exercise habits.", "for", "of", "to", "with", "青少年養成持之以恆的體育運動習慣是至關重要的。", "形容事物的性質特徵（essential, important, difficult），介系詞固定搭配 for sb to V！", "事物特質形容詞搭配 for sb to V。", "essential", "/ɪˈsen.ʃəl/", "不可或缺的", "consistent", "/kənˈsɪs.tənt/", "一致持之以恆的"),
            ("It was very generous ___ Mr. Lin to donate his ancestral land to the city.", "of", "for", "to", "with", "林先生將其祖傳土地捐給市府，真是太慷慨仁慈了。", "形容人的品德人格特質（generous, kind, polite, foolish），介系詞固定搭配 of sb to V！", "人格品德形容詞搭配 of sb to V。", "generous", "/ˈdʒen.ər.əs/", "慷慨大方的", "ancestral", "/ænˈses.trəl/", "祖傳的"),
            ("It is difficult ___ the young pianist to master this intricate concerto.", "for", "of", "to", "at", "對於這位年輕鋼琴家來說，要掌握這首複雜的協奏曲是困難的。", "事物特徵 difficult 搭配 for sb to V。", "事物難度形容詞搭配 for。", "intricate", "/ˈɪn.trə.kət/", "複雜精巧的", "concerto", "/kənˈtʃer.t̬oʊ/", "協奏曲"),
            ("It is extremely rude ___ him to interrupt others during formal meetings.", "of", "for", "to", "with", "他在正式會議期間打斷他人發言，真是太粗魯無禮了。", "人格評價 rude（粗魯的）搭配 of sb to V。", "人格評價形容詞搭配 of。", "interrupt", "/ˌɪn.t̬əˈrʌpt/", "打斷插話", "formal", "/ˈfɔːr.məl/", "正式的"),
            ("It is vital ___ every citizen to participate actively in democratic processes.", "for", "of", "to", "with", "每位公民積極參與民主進程是至關重要的。", "事物重要性 vital 搭配 for sb to V。", "vital 搭配 for。", "citizen", "/ˈsɪt̬.ə.zən/", "公民市民", "democratic", "/ˌdem.əˈkræt̬.ɪk/", "民主的"),
            ("It was polite ___ the little boy to say thank you to the bus driver.", "of", "for", "to", "at", "小男孩向公車司機道謝，真是彬彬有禮。", "人格品行 polite 搭配 of sb to V。", "polite 搭配 of。", "polite", "/pəˈlaɪt/", "有禮貌的", "driver", "/ˈdraɪ.vɚ/", "司機駕駛"),
            ("It is necessary ___ applicants to submit all official documents before the deadline.", "for", "of", "to", "with", "申請者在截止日期前提交所有官方文件是必要的。", "事物客觀需要 necessary 搭配 for sb to V。", "necessary 搭配 for。", "applicant", "/ˈæp.lə.kənt/", "申請者", "deadline", "/ˈded.laɪn/", "截止期限"),
            ("It was careless ___ Tony to leave his bicycle unlocked outside the store.", "of", "for", "to", "at", "Tony 把腳踏車沒上鎖就留在店外，真是太粗心大意了。", "人格行徑 careless（粗心的）搭配 of sb to V。", "careless 搭配 of。", "careless", "/ˈker.ləs/", "粗心大意的", "unlocked", "/ʌnˈlɑːkt/", "未上鎖的"),
            ("It is impossible ___ the construction crew to finish the bridge in one week.", "for", "of", "to", "with", "施工團隊要在一週之內完工這座橋樑是不可能的。", "事物可能性 impossible 搭配 for sb to V。", "impossible 搭配 for。", "impossible", "/ɪmˈpɑː.sə.bəl/", "不可能的", "crew", "/kruː/", "工作班組"),
            ("It was thoughtful ___ Emily to send a get-well card to her sick friend.", "of", "for", "to", "with", "Emily 給生病的朋友寄了一張早日康復慰問卡，真是體貼入微。", "人格特質 thoughtful（體貼的）搭配 of sb to V。", "thoughtful 搭配 of。", "thoughtful", "/ˈθɑːt.fəl/", "體貼周到的", "sick", "/sɪk/", "生病的")
        ]),
        # 20. 分詞當形容詞 (boring vs bored, exciting vs excited)
        ("分詞當形容詞 (boring vs bored, exciting vs excited)", "文法句構", [
            ("The science lecture on astrophysics was so ___ that many students fell asleep.", "boring", "bored", "boredom", "boringly", "那場關於天體物理學的自然演講如此枯燥乏味，以致於許多學生都睡著了。", "事物本身的性質（演講令人感到無趣），使用現在分詞 boring；人的感受才用 bored！", "事物令人感到無聊選 boring。", "astrophysics", "/ˌæs.troʊˈfɪz.ɪks/", "天體物理學", "lecture", "/ˈlek.tʃɚ/", "演講授課"),
            ("The audience felt thoroughly ___ by the magician's dazzling illusions.", "amazed", "amazing", "amazement", "amazingly", "觀眾們被魔術師眼花繚亂的幻術深深震撼折服了。", "人的內心感受（觀眾感到驚奇驚訝），使用過去分詞 amazed！", "人的情緒感受選 amazed。", "illusion", "/ɪˈluː.ʒən/", "幻術假象", "magician", "/məˈdʒɪʃ.ən/", "魔術師"),
            ("Visiting the newly opened safari theme park was an ___ experience.", "exciting", "excited", "excitement", "excitedly", "參觀新開幕的野生動物主題樂園是一次令人興奮的經歷。", "修飾事物的特質 (experience)，使用現在分詞 exciting。", "修飾事物特質選 exciting。", "safari", "/səˈfɑːr.i/", "野生動物園", "experience", "/ɪkˈspɪr.i.əns/", "體驗經歷"),
            ("After cleaning the entire house for five hours, Mom felt completely ___.", "exhausted", "exhausting", "exhaust", "exhaustion", "打掃整棟房子五個小時後，媽媽感到徹底精疲力竭。", "人的身體疲憊感受，使用過去分詞 exhausted。", "人的疲倦感受選 exhausted。", "exhausted", "/ɪɡˈzɑː.stɪd/", "筋疲力竭的", "completely", "/kəmˈpliːt.li/", "徹底地"),
            ("The plot of the mystery novel was so ___ that I couldn't put it down.", "gripping", "gripped", "grip", "grips", "這本推理小說的情節如此扣人心弦，以致於我手不釋卷。", "修飾情節令人著迷扣人心弦，使用現在分詞 gripping。", "情節扣人心弦選 gripping。", "gripping", "/ˈɡrɪp.ɪŋ/", "扣人心弦的", "mystery", "/ˈmɪs.tɚ.i/", "神秘推理"),
            ("The little boy was deeply ___ by the loud thunder during the midnight storm.", "frightened", "frightening", "frighten", "fright", "半夜雷雨中震耳欲聾的雷聲讓小男孩感到深深恐懼害怕。", "人的受驚嚇恐懼感受，使用過去分詞 frightened。", "人的害怕感受選 frightened。", "frightened", "/ˈfraɪ.tənd/", "感到受驚害怕的", "thunder", "/ˈθʌn.dɚ/", "雷聲霹靂"),
            ("The documentary revealed some truly ___ statistics about ocean pollution.", "shocking", "shocked", "shock", "shockingly", "這部紀錄片揭示了關於海洋污染的某些真正令人震驚的統計數據。", "數據本身令人感到震驚，使用現在分詞 shocking。", "事物令人震驚選 shocking。", "statistic", "/stəˈtɪs.tɪk/", "統計數據", "pollution", "/pəˈluː.ʃən/", "污染"),
            ("We were utterly ___ with our team's outstanding championship victory.", "thrilled", "thrilling", "thrill", "thrills", "我們對我們球隊輝煌的錦標賽勝利感到欣喜若狂興奮無比。", "人的興奮激動感受，使用過去分詞 thrilled。", "人的激動狂喜選 thrilled。", "thrilled", "/θrɪld/", "極度興奮欣喜的", "victory", "/ˈvɪk.tɚ.i/", "勝利"),
            ("Waiting in the long queue under the scorching sun was an ___ ordeal.", "annoying", "annoyed", "annoy", "annoyance", "在烈日下排長隊是一件令人惱火生厭的折磨。", "事物令人惱火煩躁，使用現在分詞 annoying。", "令人惱火選 annoying。", "scorching", "/ˈskɔːr.tʃɪŋ/", "灼熱酷熱的", "ordeal", "/ɔːrˈdiːl/", "苦難折磨"),
            ("The disappointed students were ___ to hear that the field trip was canceled.", "depressed", "depressing", "depression", "depress", "失望的學生們聽到校外教學被取消時感到心情沮喪消沉。", "學生的心情感受沮喪，使用過去分詞 depressed。", "人的沮喪感受選 depressed。", "depressed", "/dɪˈprest/", "沮喪消沉的", "disappointed", "/ˌdɪs.əˈpɔɪn.t̬ɪd/", "失望的")
        ]),
        # 21. 介系詞 despite / in spite of 與連接詞 although 辨析
        ("介系詞 despite / in spite of 與連接詞 although 辨析", "文法句構", [
            ("___ the torrential rainfall, the outdoor marathon proceeded as scheduled.", "Despite", "Although", "Because", "Even though", "儘管暴雨傾盆，戶外馬拉松賽事依然如期舉行。", "despite 為「介系詞」，後方接名詞片語 (the torrential rainfall)；although 為連接詞需接完整子句！", "後接名詞片語選介系詞 Despite。", "torrential", "/tɔːˈren.ʃəl/", "傾盆豪雨的", "proceed", "/proʊˈsiːd/", "繼續進行"),
            ("We arrived at the airport on time ___ the severe traffic congestion.", "in spite of", "although", "even though", "because", "儘管遭遇了嚴重的交通堵塞，我們還是準時抵達了機場。", "in spite of 為介系詞片語，後接名詞片語 the severe traffic congestion。", "後接名詞片語選 in spite of。", "congestion", "/kənˈdʒes.tʃən/", "擁塞堵塞", "severe", "/səˈvɪr/", "嚴重的"),
            ("___ he had trained diligently for months, Tony did not qualify for the final.", "Although", "Despite", "In spite of", "Because", "雖然他勤奮訓練了數月之久，Tony 依然未能晉級決賽。", "後方為完整主謂子句 (he had trained...)，必須使用從屬連接詞 Although！", "後接完整子句選連接詞 Although。", "diligently", "/ˈdɪl.ə.dʒənt.li/", "勤奮刻苦地", "qualify", "/ˈkwɑː.lə.faɪ/", "具備資格晉級"),
            ("The resilient climber reached the mountain peak ___ the freezing winds.", "despite", "although", "even though", "because", "儘管頂著刺骨寒風，那位堅毅的登山家依然登上了頂峰。", "後接名詞片語 the freezing winds，使用介系詞 despite。", "後接名詞片語選 despite。", "resilient", "/rɪˈzɪl.jənt/", "堅韌不拔的", "peak", "/piːk/", "頂峰山頂"),
            ("___ feeling extremely exhausted after the hike, Emily helped prepare dinner.", "In spite of", "Although", "Because", "Since", "儘管健行後感到極度疲憊，Emily 依然幫忙準備晚餐。", "In spite of 後接動名詞短語 feeling extremely exhausted。", "後接動名詞短語選 In spite of。", "exhausted", "/ɪɡˈzɑː.stɪd/", "精疲力竭的", "hike", "/haɪk/", "徒步健行"),
            ("The flight took off safely ___ the thick fog blankets the runway.", "although", "despite", "in spite of", "because of", "雖然濃霧籠罩著飛機跑道，航班依然安全起飛了。", "後方為完整子句 (the thick fog blankets...)，使用連接詞 although。", "後接子句選 although。", "runway", "/ˈrʌn.weɪ/", "跑道", "fog", "/fɑːɡ/", "濃霧"),
            ("___ having little formal musical training, Sam composed a stunning symphony.", "Despite", "Although", "Because", "Even though", "儘管幾乎沒有受過正規音樂訓練，Sam 卻譜寫出了一首震撼人心的交響曲。", "Despite 後接動名詞短語 having little training。", "後接動名詞短語選 Despite。", "symphony", "/ˈsɪm.fə.ni/", "交響曲", "compose", "/kəmˈpoʊz/", "作曲譜寫"),
            ("She bought the luxurious handbag ___ its exorbitant price tag.", "in spite of", "although", "though", "even if", "儘管其價格昂貴得令人咋舌，她還是買下了那個奢華的手提包。", "後接名詞短語 its exorbitant price tag，使用 in spite of。", "後接名詞片語選 in spite of。", "exorbitant", "/ɪɡˈzɔːr.bə.tənt/", "過高的過分的", "luxurious", "/lʌɡˈʒʊr.i.əs/", "奢華昂貴的"),
            ("___ the movie received mixed reviews from critics, audiences flocked to theaters.", "Although", "Despite", "In spite of", "Due to", "雖然這部電影受到影評人褒貶不一的評價，觀眾們依然蜂擁湧入電影院。", "後接完整子句 (the movie received...)，選 Although。", "後接完整子句選 Although。", "critic", "/ˈkrɪt̬.ɪk/", "評論家影評人", "flock", "/flɑːk/", "群聚湧向"),
            ("The courageous sailors persevered ___ the menacing storm raging around them.", "despite", "although", "even though", "because", "儘管周遭暴風雨狂暴肆虐，勇敢的水手們依然堅定前行。", "後接名詞短語 the menacing storm，選 despite。", "後接名詞短語選 despite。", "persevere", "/ˌpɝː.səˈvɪr/", "堅持不懈", "menacing", "/ˈmen.ə.sɪŋ/", "威脅恐嚇的")
        ]),
        # 22. 時間與條件副詞子句中之時態呼應
        ("時間與條件副詞子句中之時態呼應", "文法句構", [
            ("As soon as the bell ___, students will pack their schoolbags and leave.", "rings", "will ring", "rang", "has rung", "鐘聲一響起，學生們就會收拾書包離開。", "在 As soon as 引導的時間副詞子句中，使用現在簡單式 (rings) 代替未來式！", "時間副詞子句現在式代替未來式選 rings。", "pack", "/pæk/", "收拾打包", "schoolbag", "/ˈskuːl.bæɡ/", "書包"),
            ("We will start the outdoor barbecue as soon as Dad ___ home tonight.", "arrives", "will arrive", "arrived", "is arriving", "今晚爸爸一回到家，我們就將開始戶外烤肉。", "as soon as 條件時間子句主詞 Dad 為單數，動詞用現在式 arrives。", "時間子句現在式單數選 arrives。", "barbecue", "/ˈbɑːr.bə.kjuː/", "烤肉", "arrive", "/əˈraɪv/", "抵達"),
            ("Before you ___ the chemicals in the lab, ensure you wear safety goggles.", "mix", "will mix", "mixed", "are mixing", "在實驗室混合化學藥劑之前，請確保你戴好安全護目鏡。", "Before 時間子句中使用動詞原形現在式 mix 代替未來式。", "時間子句用現在式 mix。", "goggles", "/ˈɡɑː.ɡəlz/", "護目鏡", "chemical", "/ˈkem.ɪ.kəl/", "化學物"),
            ("Tony will call you the moment he ___ the airport in San Francisco.", "reaches", "will reach", "reached", "is reaching", "Tony 一抵達舊金山機場就會立刻打電話給你。", "the moment 引導時間子句，動詞用現在簡單式 reaches。", "時間子句現在式選 reaches。", "airport", "/ˈer.pɔːrt/", "機場", "reach", "/riːtʃ/", "到達"),
            ("When the rain ___, we will resume our soccer practice on the grass field.", "stops", "will stop", "stopped", "is stopping", "等雨停了之後，我們將恢復在草地球場上的足球訓練。", "When 引導之未來時間子句使用現在式 stops 代替未來式。", "時間子句現在式單數選 stops。", "resume", "/rɪˈzuːm/", "重新開始恢復", "practice", "/ˈpræk.tɪs/", "練習"),
            ("You shouldn't cross the railway tracks until the warning gate ___ up.", "goes", "will go", "went", "is going", "在平交道警示柵欄升起之前，你不應當穿越鐵軌。", "until 時間副詞子句使用現在式 goes 代替未來式。", "until 子句現在式單數選 goes。", "track", "/træk/", "鐵軌軌道", "gate", "/ɡeɪt/", "柵欄閘門"),
            ("After Emily ___ her homework, she will be permitted to watch television.", "finishes", "will finish", "finished", "is finishing", "在 Emily 寫完作業之後，她才會被獲准看電視。", "After 時間子句主詞 Emily 搭配現在簡單式單數 finishes。", "時間子句現在式單數選 finishes。", "permit", "/pɚˈmɪt/", "允許許可", "television", "/ˈtel.ə.vɪʒ.ən/", "電視"),
            ("I will send you a text message as soon as our flight ___ at the terminal.", "lands", "will land", "landed", "is landing", "我們的航班一在航廈降落，我就會傳簡訊給你。", "as soon as 子句使用現在式 lands。", "時間子句現在式選 lands。", "terminal", "/ˈtɝː.mə.nəl/", "航廈客運站", "land", "/lænd/", "著陸降落"),
            ("By the time the ambulance ___, the courageous bystander had performed CPR.", "arrived", "arrives", "will arrive", "had arrived", "當救護車抵達時，勇敢的旁觀者早已實施了 CPR 急救。", "主要子句為過去完成式 had performed，副詞子句時間點為過去式 arrived。", "過去時間點搭配 arrived。", "ambulance", "/ˈæm.bjə.ləns/", "救護車", "bystander", "/ˈbaɪˌstæn.dɚ/", "旁觀者"),
            ("While Dad ___ dinner in the kitchen, Mom was reviewing her legal documents.", "was cooking", "cooked", "cooks", "has cooked", "當爸爸在廚房煮晚餐時，媽媽正在審閱她的法律文件。", "While 連接過去兩項同時正在持續進行的動作，使用過去進行式 was cooking。", "過去兩項動作同時持續進行選 was cooking。", "document", "/ˈdɑː.kjə.mənt/", "文件檔案", "legal", "/ˈliː.ɡəl/", "法律的")
        ]),
        # 23. 會考克漏字篇章銜接與轉折 (however, therefore, in addition)
        ("會考克漏字篇章銜接與轉折", "篇章語境", [
            ("Electric cars produce zero tailpipe emissions. ___, generating electricity still creates environmental impacts.", "However", "Therefore", "Moreover", "Furthermore", "電動車實現零尾氣排放。然而，發電過程依然會對環境產生衝擊影響。", "前後句語意形成鮮明轉折對比，轉折副詞使用 However（副詞以逗號隔開）。", "語意轉折選 However。", "emission", "/iˈmɪʃ.ən/", "排放散發", "environmental", "/ɪnˌvaɪ.rənˈmen.t̬əl/", "環境的"),
            ("Regular exercise strengthens cardiovascular health. ___, it boosts mental well-being and elevates mood.", "Furthermore", "However", "Otherwise", "Instead", "規律運動能增強心血管健康。此外，它還能促進心理福祉並提振情緒。", "後句在健康益處上作進一步補充遞進，連接副詞使用 Furthermore（此外）。", "補充遞進關係選 Furthermore。", "cardiovascular", "/ˌkɑːr.di.oʊˈvæs.kjə.lɚ/", "心血管的", "elevate", "/ˈel.ə.veɪt/", "提升提振"),
            ("The company suffered enormous financial losses during the recession. ___, it had to lay off numerous employees.", "Therefore", "However", "Nevertheless", "Otherwise", "該公司在經濟衰退期間蒙受了巨大的財務虧損。因此，它不得不資遣解僱眾多員工。", "前後為因果承接關係（因巨虧故裁員），副詞使用 Therefore（因此）。", "因果承接選 Therefore。", "recession", "/rɪˈseʃ.ən/", "經濟衰退", "enormous", "/əˈnɔːr.məs/", "巨大的"),
            ("We must leave for the railway station immediately. ___, we will miss our scheduled express train.", "Otherwise", "Therefore", "However", "Moreover", "我們必須立刻前往火車站。否則，我們將會錯過預定的特快車班次。", "Otherwise 表「否則、要不然」（引出如果不這樣做將導致的負面後果）。", "表示否則選 Otherwise。", "scheduled", "/ˈskedʒ.uːld/", "排定的預約的", "express", "/ɪkˈspres/", "特快的"),
            ("The modern museum exhibits rare ancient treasures. ___, admission is completely free for all students.", "In addition", "However", "On the other hand", "Instead", "這座現代化博物館陳列了珍罕的古代珍寶。此外，所有學生均可完全免費入場。", "在參觀優點上作正面遞進補充，使用 In addition（此外）。", "正面補充選 In addition。", "exhibit", "/ɪɡˈzɪb.ɪt/", "展覽陳列", "admission", "/ədˈmɪʃ.ən/", "入場費門票"),
            ("Tony practiced tirelessly for the speech tournament. ___, he secured first place in the finals.", "As a result", "However", "Otherwise", "On the contrary", "Tony 為了演講錦標賽不知疲倦地苦練。結果，他在決賽中勇奪冠軍第一名。", "前後為努力與成功結果之承接，使用 As a result（結果、因而）。", "結果承接選 As a result。", "tournament", "/ˈtʊr.nə.mənt/", "錦標賽錦標賽", "tirelessly", "/ˈtaɪr.ləs.li/", "不知疲倦地"),
            ("The historic building was severely damaged by the fire. ___, the city government pledged to restore it.", "Nevertheless", "Therefore", "Consequently", "Moreover", "這棟歷史建物在火災中遭受嚴重損毀。儘管如此，市政府依然誓言全力修復它。", "災情嚴重與依然誓言修復形成強烈轉折讓步，使用 Nevertheless（儘管如此）。", "讓步轉折選 Nevertheless。", "severely", "/səˈvɪr.li/", "嚴重地", "restore", "/rɪˈstɔːr/", "修復重建"),
            ("You should consume plenty of fiber-rich vegetables. ___, reduce your intake of refined sugar.", "Similarly", "However", "Therefore", "Otherwise", "你應當攝取大量富含纖維的蔬菜。同樣地，減少精製糖的攝取量也很有必要。", "在健康飲食建議上作平行類比，使用 Similarly（同樣地）。", "平行類比選 Similarly。", "fiber", "/ˈfaɪ.bɚ/", "纖維", "refined", "/rɪˈfaɪnd/", "精緻的精煉的"),
            ("Plastic bags do not decompose easily in nature. ___, they pose a catastrophic threat to marine wildlife.", "Consequently", "However", "Instead", "Otherwise", "塑膠袋在自然界中極難被分解。因此，它們對海洋野生動物構成了毀滅性的威脅。", "不可分解（因）造成海洋威脅（果），選 Consequently（因此結果）。", "因果後果選 Consequently。", "decompose", "/ˌdiː.kəmˈpoʊz/", "分解腐爛", "marine", "/məˈriːn/", "海洋的"),
            ("The school didn't cancel the sports meet. ___, the organizers relocated all activities indoors.", "Instead", "Therefore", "Moreover", "Furthermore", "學校並未取消運動會。取而代之的是，主辦方將所有活動移至室內舉行。", "前句否定 didn't cancel，後句引出實際採取的替代方案，使用 Instead（取而代之）。", "替代方案選 Instead。", "relocate", "/ˌriːˈloʊ.keɪt/", "遷移改移", "organizer", "/ˈɔːr.ɡən.aɪ.zɚ/", "組織主辦者")
        ]),
        # 24. 圖表與告示理解題 (notices, charts, infographics)
        ("圖表與告示理解題", "篇章語境", [
            ("NOTICE: 'Trespassers will be prosecuted.' What does this sign mean?", "People entering without permission will face legal action.", "People are encouraged to enter freely.", "Visitors can park here for free.", "The building is open for public tours.", "告示「闖入者將受起訴依法究辦」，意即未經許可擅闖者將面臨法律訴訟。", "法律警示牌句意解析：未經許可進入將面臨法律究辦。", "trespasser", "/ˈtres.pəs.ɚ/", "非法侵入者", "prosecute", "/ˈprɑː.sə.kjuːt/", "起訴控告"),
            ("WARNING: 'Slippery when wet.' Where would you most likely see this sign?", "Near a swimming pool or newly mopped corridor", "Inside a library reading room", "On a bookshelf in a classroom", "On a television screen in an office", "警告標語「潮濕時地面濕滑」，最可能出現在游泳池旁或剛拖過的走廊地面上。", "生活告示情境判斷：泳池或濕滑地面。", "slippery", "/ˈslɪp.ɚ.i/", "濕滑的", "corridor", "/ˈkɔːr.ə.dɚ/", "走廊"),
            ("ANNOUNCEMENT: 'All flights delayed due to dense fog.' What caused the flight delay?", "Severe low visibility from thick fog", "Mechanical malfunction of the aircraft", "Lack of airline crew members", "Security checkpoint inspection", "公告指出所有航班因濃霧延誤，原因為濃霧導致的低能見度。", "公告因果理解：濃霧造成能見度極低。", "dense", "/dens/", "稠密濃密的", "visibility", "/ˌvɪz.əˈbɪl.ə.t̬i/", "能見度"),
            ("CHART NOTE: 'Sales surged by 40% in Q3.' What does 'surged' imply in this context?", "Increased dramatically and rapidly", "Decreased steadily and slowly", "Remained unchanged throughout", "Fluctuated unpredictably", "圖表備註「第三季銷售量激增了40%」，surged 代表急遽迅速大幅成長。", "商業圖表詞彙辨析：surge 表巨幅激增。", "surge", "/sɝːdʒ/", "急遽激增", "dramatically", "/drəˈmæt̬.ɪ.kəl.i/", "戲劇性巨幅地"),
            ("METRO NOTICE: 'Mind the gap between the train and the platform.' What is the advice?", "Step carefully over the opening when boarding.", "Run quickly into the train car.", "Leave your baggage on the platform.", "Do not look at the tracks below.", "捷運警示「小心列車與月台之間的間隙空隙」，即登車時要謹慎跨過間隙。", "大眾運輸警示：小心跨越空隙。", "gap", "/ɡæp/", "縫隙間距", "platform", "/ˈplæt.fɔːrm/", "月台"),
            ("FOOD LABEL: 'Best before October 15, 2026.' What should consumers understand?", "The product maintains optimal quality before this date.", "The food becomes poisonous immediately after October 15.", "The product was manufactured on October 15.", "The item cannot be opened until October 15.", "賞味期限標籤：在此日期之前該食品保有最佳品質。", "食品標籤認知：最佳賞味品質期。", "optimal", "/ˈɑːp.tə.məl/", "最佳的最優的", "maintain", "/meɪnˈteɪn/", "維持保持"),
            ("RESTAURANT SIGN: 'Please wait to be seated.' What are patrons expected to do?", "Wait for a staff member to guide them to a table.", "Find any empty table and sit down immediately.", "Go directly to the kitchen to place an order.", "Pay the bill before entering the dining area.", "餐廳標語「請在此等候引導帶位」，意即顧客需等候服務人員安排座位。", "用餐文化規範：等候帶位入座。", "patron", "/ˈpeɪ.trən/", "顧客賓客", "seated", "/ˈsiː.t̬ɪd/", "入座就座"),
            ("CAMPUS NOTICE: 'Bicycles parked improperly will be impounded.' What will happen to illegally parked bikes?", "They will be confiscated and removed by campus security.", "They will be repaired free of charge.", "They will be awarded a safety certificate.", "They will be rented to other students.", "校園公告「違規停放之腳踏車將遭到拖吊扣押」，違規者將被校安單位沒收移置。", "校規告示理解：違規扣押移除。", "impound", "/ɪmˈpaʊnd/", "扣押沒收", "improperly", "/ɪmˈprɑː.pɚ.li/", "不適當地違規地"),
            ("MUSEUM SIGN: 'Flash photography strictly prohibited.' What action is forbidden?", "Taking pictures with camera flashlights turned on.", "Looking closely at the ancient paintings.", "Speaking softly with companions.", "Wearing sunglasses inside the gallery.", "博物館告示「嚴禁閃光燈攝影拍照」，禁止的是開啟相機閃光燈拍照。", "參觀守則：嚴禁使用閃光燈拍照。", "prohibit", "/prəˈhɪb.ɪt/", "禁止阻絕", "strictly", "/ˈstrɪkt.li/", "嚴格地"),
            ("WEATHER ADVISORY: 'Gale warning in coastal areas.' What precautions should residents take?", "Secure outdoor objects and avoid ocean shores.", "Go swimming in the coastal waters.", "Open all windows wide to let wind in.", "Organize a beach volleyball tournament.", "氣象強風特報「沿海地區大風警報」，居民應固定戶外物品並遠離海邊。", "防災警報常識：防強風遠離海岸。", "gale", "/ɡeɪl/", "大風強風", "coastal", "/ˈkoʊ.stəl/", "沿海的海岸的")
        ]),
        # 25. 閱讀推論與作者觀點態度分析 (infer, attitude, main idea)
        ("閱讀推論與作者觀點態度分析", "篇章語境", [
            ("The author describes the ancient ruins with awe and veneration. What is the author's tone?", "Respectful and admiring", "Skeptical and dismissive", "Hostile and aggressive", "Indifferent and bored", "作者帶著敬畏與崇敬的心情描繪古老廢墟，態度是充滿敬意與讚賞的。", "文學閱讀語調分析：敬仰讚賞 (Respectful and admiring)。", "veneration", "/ˌven.əˈreɪ.ʃən/", "崇敬敬重", "ruins", "/ˈruː.ɪnz/", "廢墟遺跡"),
            ("The passage emphasizes both benefits and environmental hazards of wind turbines. The author's view is:", "Objective and balanced", "Entirely hostile", "Blindly optimistic", "Uninterested", "文章同時強調風力渦輪機的益處與潛在環境危害，作者觀點是客觀且平衡的。", "學術閱讀觀點分析：客觀平衡 (Objective and balanced)。", "turbine", "/ˈtɝː.baɪn/", "渦輪發電機", "objective", "/əbˈdʒek.tɪv/", "客觀公正的"),
            ("From the text, we can infer that the scientist's breakthrough hypothesis was initially met with:", "Skepticism and disbelief by conservative colleagues", "Instant worldwide celebration", "Financial rewards from the government", "Complete indifference by everyone", "由文本可知，該科學家突破性的假說最初遭遇了保守同僚的懷疑與不信。", "閱讀推論分析：先驅理論常遭早期質疑。", "skepticism", "/ˈskep.tə.sɪz.əm/", "懷疑態度", "conservative", "/kənˈsɝː.və.t̬ɪv/", "保守傳統的"),
            ("What is the primary objective of the author in writing about renewable energy?", "To advocate for sustainable energy policies", "To discourage people from using electricity", "To promote fossil fuel investments", "To praise plastic manufacturing", "作者撰寫再生能源專案的主要意圖在於倡導可持續的綠能政策。", "寫作宗旨與中心思想：倡導綠能政策。", "advocate", "/ˈæd.və.keɪt/", "提倡倡導", "renewable", "/rɪˈnuː.ə.bəl/", "可再生的"),
            ("The author concludes the essay by urging readers to 'take action before it is too late.' The tone is:", "Urgent and persuasive", "Humorous and playful", "Passive and resigned", "Arrogant and boastful", "作者在文末呼籲讀者「在為時已晚之前採取行動」，語調是急迫且富有說服力的。", "語調態度判定：急迫具說服力 (Urgent and persuasive)。", "persuasive", "/pɚˈsweɪ.sɪv/", "具說服力的", "urgent", "/ˈɝː.dʒənt/", "緊急急迫的"),
            ("The writer satirizes the superficial fashion trends of celebrities. What is the writer's attitude?", "Critical and mocking", "Supportive and encouraging", "Neutral and passive", "Fearful and timid", "作者諷刺名人膚淺的時尚潮流，其態度是批判且嘲弄的。", "諷刺語氣判斷：批判嘲弄 (Critical and mocking)。", "satirize", "/ˈsæt̬.ə.raɪz/", "諷刺譏弄", "superficial", "/ˌsuː.pɚˈfɪʃ.əl/", "膚淺表面的"),
            ("Based on the biographical excerpt, the inventor overcame poverty through sheer perseverance. We can infer:", "Dedication can overcome severe socioeconomic hardship.", "Wealth is necessary for technological innovation.", "Formal degrees guarantee scientific success.", "Luck is the only factor in human achievement.", "由傳記節選可知發明家靠堅定毅力克服貧困，推論：專注奉獻能克服社會經濟困境。", "主旨寓意推論：毅力戰勝逆境。", "perseverance", "/ˌpɝː.səˈvɪr.əns/", "堅毅不懈", "hardship", "/ˈhɑːrd.ʃɪp/", "困境艱辛"),
            ("In describing the deforestation crisis, the author cites alarming extinction rates. The purpose is to:", "Emphasize the catastrophic consequences of rainforest destruction", "Entertain readers with biological trivia", "Promote logging industry profits", "Encourage urban expansion into forests", "在描述森林濫伐危機時引述驚人滅絕率，目的在於強調雨林破壞帶來的災難性後果。", "論據功能判定：強調災難性嚴重後果。", "deforestation", "/diːˌfɔːr.əˈsteɪ.ʃən/", "森林砍伐", "catastrophic", "/ˌkæt̬.əˈstrɑː.fɪk/", "災難性的"),
            ("The article explores contrasting opinions on artificial intelligence. The passage is mainly organized by:", "Comparison and contrast of potential risks and benefits", "Chronological narrative of computer history", "Step-by-step technical instructions", "Personal emotional anecdotes", "該文章探討關於人工智慧的對立觀點，主要行文組織方式為：風險與效益的比較與對比。", "篇章結構分析：比較對照 (Comparison and contrast)。", "artificial", "/ˌɑːr.t̬əˈfɪʃ.əl/", "人工的", "chronological", "/ˌkrɑː.nəˈlɑː.dʒɪk.əl/", "依時間先後的"),
            ("The author describes the local hero's selfless sacrifice with poignant emotional resonance. The mood is:", "Solemn and deeply moving", "Frivolous and lighthearted", "Sarcastic and bitter", "Terrifying and dreadful", "作者以淒美的情感共鳴描繪當地英雄的無私奉獻，基調氛圍是莊嚴肅穆且令人深感動容的。", "文章氣氛基調分析：莊嚴動人 (Solemn and moving)。", "poignant", "/ˈpɔɪ.njənt/", "淒美令人辛酸的", "solemn", "/ˈsɑː.ləm/", "莊嚴肅穆的")
        ])
    ]
    
    subtopics_data.extend(remaining_subtopics_3)
    
    q_counter = 500
    for idx, (sub_title, dim, q_list) in enumerate(subtopics_data):
        unit_num = (idx % 8) + 1
        hook_item = {"module": "jh", "unitId": f"jh-u{unit_num}", "unitTitle": f"JH 國中會考衝刺: 現在完成式與被動語態完全突破 Unit {unit_num}"}
        for q_tuple in q_list:
            q_counter += 1
            if len(q_tuple) == 15:
                prompt, corr, d1, d2, d3, trans, concept, analysis, trap, w1, p1, m1, w2, p2, m2 = q_tuple
            elif len(q_tuple) == 14:
                prompt, corr, d1, d2, d3, trans, concept, trap, w1, p1, m1, w2, p2, m2 = q_tuple
                analysis = "標準英語文法結構：主幹主從或對等關係完整明確。"
            else:
                prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2 = q_tuple
                analysis = "篇章語意與句法結構嚴密，掌握核心語法訊號與前後文關聯。"
                trap = f"正確選項為「{corr}」。其他選項在詞性、語義或邏輯方向上不符題幹需求。"
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
            
    assert len(items) == 250, f"Tier 3 expected 250 items, got {len(items)}"
    return items
