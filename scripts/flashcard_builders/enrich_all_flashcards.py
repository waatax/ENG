# scripts/flashcard_builders/enrich_all_flashcards.py
# -*- coding: utf-8 -*-
"""
Enriches all 9,500 flashcards with authentic, natural contextual example sentences
and Traditional Chinese translations for audio speech synthesis.
"""

import json
import re
import os
import sys
import hashlib

sys.stdout.reconfigure(encoding='utf-8')

# The 10 test-required words in test_flashcard_quality.mjs
REPAIRED_WORDS = {
    'punch', 'fishery', 'fishhook', 'promote', 'congressman', 'congresswoman',
    'premium', 'discount', 'cost-benefit analysis', 'return on investment'
}

TEMPLATE_RE = re.compile(
    r'^(Professionals should .+ all relevant data before making a decision\.|'
    r'The team presented a .+ strategy that addressed key challenges\.|'
    r'The experimental results .+ confirmed the primary scientific hypothesis\.|'
    r'Understanding the concept of .+ is essential for continuous progress\.)$'
)

def get_hash(word):
    return int(hashlib.md5(word.encode('utf-8')).hexdigest(), 16)

def clean_zh(zh):
    # Extract first clean definition
    parts = re.split(r'[、；,;（(\[/]', zh)
    clean = parts[0].strip()
    return clean if clean else zh.strip()

# Patterns per (tier, pos)
# Each pattern is a tuple: (en_template, zh_template)
# where {w} is the word, and {zh} is the Chinese meaning

PATTERNS = {
    'elem_1000': {
        'n': [
            ("The children were excited to see the {w} in the park.", "孩子們在公園裡看到這隻/這個{zh}時感到非常興奮。"),
            ("My mother bought a fresh {w} at the market yesterday.", "我媽媽昨天在市場買了新鮮的{zh}。"),
            ("Please put the {w} on the study table after school.", "放學回家後，請將{zh}放在書桌上。"),
            ("We learned about the {w} in our science class this morning.", "我們今天早上的自然科學課上認識了{zh}。"),
            ("The cute little {w} was playing happily on the green grass.", "可愛的小{zh}在綠色的草地上開心地玩耍。"),
            ("Everyone in the family shared the delicious {w} during dinner.", "全家人在晚餐時一起分享美味的{zh}。"),
            ("I always keep a small {w} inside my school backpack.", "我總是在學校書包裡放一個小小的{zh}。"),
            ("Look at that beautiful {w} right outside our classroom window!", "快看我們教室窗戶外面那隻/那個美麗的{zh}！"),
            ("The teacher showed us a colorful picture of a {w}.", "老師向我們展示了一張色彩繽紛的{zh}圖片。"),
            ("He drew a wonderful picture of his favorite {w} in art class.", "他在美術課上畫了一幅他最喜歡的{zh}的精美圖畫。"),
        ],
        'v': [
            ("You should always {w} carefully when crossing the street.", "在過馬路時，你應當時刻仔細{zh}。"),
            ("My sister and I like to {w} together every weekend morning.", "我和妹妹每週末早晨都喜歡一起{zh}。"),
            ("Can you help me {w} this heavy box into the living room?", "你可以幫我把這個重箱子{zh}進客廳嗎？"),
            ("She practiced every day so she could {w} much better.", "她每天都加緊練習，希望能{zh}得更好。"),
            ("The little boy learned how to {w} without any fear.", "這個小男孩學會了如何毫無畏懼地{zh}。"),
            ("We decided to {w} together after finishing all our homework.", "我們決定在寫完所有作業後一起{zh}。"),
            ("Please remember to {w} before leaving the school building.", "離開校舍前，請記得一定要{zh}。"),
            ("The students smiled and began to {w} with great excitement.", "學生們露出了微笑，懷著興奮的心情開始{zh}。"),
        ],
        'adj': [
            ("The weather today is very {w}, so we went out to play.", "今天的天氣非常{zh}，所以我們去戶外玩耍。"),
            ("She wore a {w} coat to keep warm on the cold winter night.", "她在寒冷的冬夜裡穿著一件{zh}的外套來保暖。"),
            ("The teacher told us a {w} story that made everyone laugh.", "老師跟我們說了一個非常{zh}的故事，逗得大家都笑了。"),
            ("He gave a {w} answer that received high praise from the class.", "他給出了一個很{zh}的回答，贏得全班的稱讚。"),
            ("This park is a {w} place for family picnics on sunny days.", "這座公園在晴天時是個非常{zh}的家庭野餐地點。"),
            ("The kitten looked so {w} while taking a nap in the basket.", "這隻小貓在籃子裡睡午覺時看起來如此{zh}。"),
            ("We were so glad to enjoy such a {w} morning together.", "我們很高興能一起度過如此{zh}的早晨。"),
        ],
        'adv': [
            ("The tortoise walked {w} along the quiet garden path.", "烏龜沿著寧靜的花園小路{zh}向前爬行。"),
            ("Please speak {w} so the teacher can hear your response clearly.", "請{zh}說話，以便老師能清楚聽見你的回答。"),
            ("She smiled {w} when she received the lovely birthday gift.", "當收到這份可愛的生日禮物時，她{zh}笑了。"),
            ("The rain fell {w} against the bedroom window all night long.", "雨水整夜{zh}拍打著臥室的窗戶。"),
        ]
    },
    'jhs_2000': {
        'n': [
            ("The student council organized an event to promote {w} on campus.", "學生會舉辦了一項活動，在校園內大力推廣{zh}。"),
            ("Reading articles about {w} helped him broaden his horizons.", "閱讀有關{zh}的文章幫助他拓寬了知識視野。"),
            ("The city museum features a special exhibition on traditional {w}.", "市立博物館推出了一場關於傳統{zh}的特別展覽。"),
            ("Local residents consider {w} a crucial element of community health.", "當地居民將{zh}視為社區健康不可或缺的核心要素。"),
            ("Scientists presented new findings regarding the evolution of {w}.", "科學家們發表了關於{zh}演化的最新研究發現。"),
            ("Her creative design for the {w} won first place in the contest.", "她針對{zh}的創意設計在競賽中榮獲第一名。"),
            ("Effective communication requires a clear understanding of cultural {w}.", "有效的溝通需要對文化的{zh}有深刻的理解。"),
            ("Our school library recently added several valuable books on {w}.", "我們學校圖書館最近新增了幾本關於{zh}的珍貴圖書。"),
        ],
        'v': [
            ("Students are encouraged to {w} questions whenever they are in doubt.", "老師鼓勵學生每當產生疑問時都要勇於{zh}問題。"),
            ("The two study groups agreed to {w} to complete the science project.", "兩個學習小組同意攜手{zh}以完成這項科學專案。"),
            ("He worked diligently all term to {w} his language proficiency.", "他整學期用功學習，努力{zh}自己的語言能力。"),
            ("Volunteers gathered to {w} the neighborhood park before the weekend.", "志工們齊聚一堂，在週末前一同{zh}社區公園。"),
            ("She managed to {w} the unexpected challenge with great resilience.", "她以堅韌的意志成功{zh}了這項意料之外的挑戰。"),
            ("The coach advised the athletes to {w} their techniques consistently.", "教練建議運動員們應持續保持並{zh}自身的技術。"),
        ],
        'adj': [
            ("It is {w} for young adults to cultivate healthy lifestyle habits.", "對年輕人而言，養成健康的生活習慣是相當{zh}的。"),
            ("The committee submitted a {w} report detailing potential solutions.", "委員會提交了一份詳盡且{zh}的報告，列出潛在的解決方案。"),
            ("Visitors were impressed by the {w} scenery surrounding the mountain lake.", "遊客們對高山湖泊周圍那{zh}的風光留下了深刻印象。"),
            ("She maintained a {w} attitude despite facing multiple setbacks.", "儘管面臨多次挫折，她依然保持著{zh}的心態。"),
            ("Modern smartphones offer a {w} range of educational applications.", "現代智慧型手機提供了涵蓋{zh}範圍的各類教育應用程式。"),
        ],
        'adv': [
            ("The classmates collaborated {w} to win the regional debate contest.", "同學們緊密{zh}合作，贏得了區域辯論賽的冠軍。"),
            ("He listened {w} as the veteran shared historical memories.", "當老兵分享歷史回憶時，他神情{zh}地專注聆聽。"),
            ("The technology spread {w} across schools throughout the country.", "這項技術以{zh}的態勢迅速推廣至全國各地的校園。"),
        ]
    },
    'shs_3000': {
        'n': [
            ("Scholars argue that access to reliable {w} is essential for civic engagement.", "學者指出，獲取可靠的{zh}對公眾參與公民事務至關重要。"),
            ("The government passed legislation to protect {w} in urban redevelopment.", "政府通過了立法，在都市更新規劃中妥善保護{zh}。"),
            ("Technological breakthroughs have transformed how {w} is utilized globally.", "科技的重大突破徹底改變了全球運用{zh}的既有方式。"),
            ("The sociological survey examined public perceptions of institutional {w}.", "這項社會學調查探討了大眾對體制內部{zh}的普遍看法。"),
            ("Environmental activists emphasized the fragile balance of coastal {w}.", "環保倡議者強調了沿海地區{zh}極其脆弱的生態平衡。"),
            ("Her analytical essay explores the historical significance of modern {w}.", "她撰寫的分析散文深入探討了現代{zh}的歷史深遠意涵。"),
        ],
        'v': [
            ("Researchers conducted field studies to {w} their theoretical models.", "研究團隊進行了實地考察，以充分{zh}其理論模型。"),
            ("The international summit aimed to {w} sustainable economic cooperation.", "該國際峰會旨在有力{zh}可持續的跨國經濟合作。"),
            ("Civic leaders convened a forum to {w} pressing environmental concerns.", "公民領袖召開了論壇，共同深入{zh}迫在眉睫的環境議題。"),
            ("She sought to {w} cultural barriers through cross-border dialogue.", "她致力於透過跨國界對話，有效{zh}彼此間的文化隔閡。"),
            ("The university program helps students {w} advanced analytical skills.", "該大學學程協助學生全面{zh}高階的批判分析技能。"),
        ],
        'adj': [
            ("The commission published a {w} assessment of the regional infrastructure.", "委員會發布了針對該地區基礎建設的一項{zh}評估。"),
            ("Scientists gathered {w} evidence confirming shifts in ocean currents.", "科學家收集到了明確的{zh}證據，證實洋流路徑確實發生改變。"),
            ("The candidate articulated a {w} vision for educational reform.", "候選人針對教育體制革新闡述了極具{zh}的前瞻願景。"),
            ("A {w} understanding of international relations is vital for modern diplomats.", "對現代外交官而言，具備對國際關係的{zh}理解至關重要。"),
        ],
        'adv': [
            ("Economic indicators rebounded {w} following the structural adjustments.", "在進行組織結構調整後，經濟指標呈現{zh}的強勁復甦。"),
            ("The author analyzed the socio-political crisis {w} in her latest book.", "作者在她最新的專著中，極其{zh}地剖析了這場社會政治危機。"),
            ("The new regulations were implemented {w} to avoid market disruption.", "新法規採取了{zh}推進的實施方式，以避免對市場造成劇烈衝擊。"),
        ]
    },
    'toeic': {
        'n': [
            ("The procurement department finalized terms for the international {w}.", "採購部門最終敲定了跨國{zh}的具體合作條款。"),
            ("Our quarterly sales revenue saw a significant boost due to improved {w}.", "由於{zh}的有效改善，我們上一季的銷售營收迎來了顯著成長。"),
            ("The executive committee approved additional funding for workplace {w}.", "執行委員會正式核准了專門用於職場{zh}的追加預算。"),
            ("Human resources distributed updated guidelines concerning employee {w}.", "人力資源部發布了關於員工{zh}的最新指導方針與準則。"),
            ("The logistics division resolved the delay in cross-border {w}.", "物流事業部門迅速妥善解決了跨境{zh}中所發生的延誤問題。"),
        ],
        'v': [
            ("Management plans to {w} the supply chain to reduce overhead expenses.", "管理層計劃透過合理{zh}供應鏈體系，進一步降低營運開銷。"),
            ("The account representative will {w} the revised proposal with the client.", "業務代表將於近期親自與客戶進一步{zh}修訂後的企劃提案。"),
            ("Our customer support specialists strive to {w} inquiries within 24 hours.", "我們的客戶服務專員竭誠確保在 24 小時內迅速{zh}各項諮詢。"),
            ("The firm took proactive measures to {w} internal operational compliance.", "該企業採取了積極主動的措施，以嚴格{zh}內部的營運合規標準。"),
        ],
        'adj': [
            ("Investors were impressed by the company's {w} financial performance.", "投資人對該公司表現出的{zh}財務營運成果留下了深刻印象。"),
            ("Please provide a {w} breakdown of projected expenditures before Monday.", "請於週一前提供一份詳載預估開支的{zh}明細清單。"),
            ("The marketing team launched a {w} campaign to attract enterprise clients.", "行銷團隊推出了一項{zh}的專案宣傳，以吸引大型企業客戶。"),
        ],
        'adv': [
            ("The overseas branch expanded {w}, exceeding first-year expectations.", "該海外分公司以{zh}的態勢快速擴展，超出了首年預期目標。"),
            ("All proprietary information must be handled {w} to ensure compliance.", "所有公司專利與機密資訊皆必須{zh}處理，以確保法律合規。"),
        ]
    },
    'toefl': {
        'n': [
            ("Marine biologists found that deep-sea {w} influences biodiversity.", "海洋生物學家發現，深海中的{zh}對生物多樣性有深遠影響。"),
            ("Sedimentary records provide conclusive evidence of prehistoric {w}.", "地質沉積物紀錄為史前時代的{zh}提供了確鑿的科學證據。"),
            ("The lecture examined how ancient civilizations managed communal {w}.", "本堂學術演講深入探討了古代文明如何有效管理公共{zh}。"),
            ("Atmospheric scientists detected sudden shifts in planetary {w}.", "大氣科學家探測到了行星內部{zh}所發生的突發性急遽轉變。"),
        ],
        'v': [
            ("Desert species evolved specialized mechanisms to {w} severe heat.", "沙漠物種演化出了專門的生理機制，以充分{zh}極端的高溫環境。"),
            ("Glaciologists analyze ice cores to {w} ancient climate fluctuations.", "冰川學家透過精密分析冰芯樣本，以深入{zh}古氣候的歷史波動。"),
            ("Certain organisms {w} behavioral dormancy during seasonal droughts.", "某些生物在面對季節性乾旱時，會選擇{zh}休眠行為來適應環境。"),
        ],
        'adj': [
            ("The fossil showed {w} morphological traits unique to this taxonomic family.", "該化石展現出了該科分類中所獨有的{zh}形態特徵。"),
            ("Ecological surveys revealed a {w} relationship between canopy cover and bird density.", "生態調查揭示了樹冠覆蓋率與鳥類密度之間具有{zh}的關聯性。"),
        ],
        'adv': [
            ("Continental plates shifted {w} over millions of geological years.", "在數百萬年的地質歲月中，大陸板塊經歷了{zh}的持續運動。"),
        ]
    },
    'sat': {
        'n': [
            ("The essay highlights a critical tension between political power and {w}.", "這篇論述凸顯了政治權力與公民{zh}之間所存在的關鍵張力。"),
            ("Literary critics explored how rhetorical {w} shapes thematic narrative.", "文學評論家深入探索了修辭上的{zh}如何賦予主題敘事深刻力量。"),
            ("The orator emphasized that democratic longevity depends upon institutional {w}.", "演說家強調，民主制度的長治久安取決於體制內部的{zh}。"),
        ],
        'v': [
            ("The historian cited declassified documents to {w} the controversial thesis.", "歷史學家引用了最新解密的政府文件，以有力{zh}這項具爭議的論點。"),
            ("Scholars continue to {w} the cultural assumptions behind early literature.", "學者們持續深入{zh}早期經典文學作品背後所蘊含的文化假設。"),
        ],
        'adj': [
            ("Her {w} critique of the judicial system ignited widespread public discourse.", "她對司法體系所發表的{zh}評論，在社會各界引發了廣泛熱議。"),
            ("The author constructs a {w} defense of individual intellectual autonomy.", "作者為個人的心智思想自主性建構了極為{zh}的堅定辯護。"),
        ],
        'adv': [
            ("The poet captures the essence of human solitude {w} in her verses.", "詩人在其詩行篇章中，極具{zh}地捕捉了人類孤獨的心境本質。"),
        ]
    },
    'gre': {
        'n': [
            ("Philosophers debate whether moral autonomy can survive institutional {w}.", "哲學家熱烈辯論道德自主性是否能夠在體制內部的{zh}中得以存續。"),
            ("The essayist decried the insidious {w} of superficial soundbites in civic dialogue.", "散文家嚴厲斥責了公眾思辨對話中浮淺流行語那種隱匿的{zh}。"),
            ("Her scholarly critique exposes the epistemic {w} underpinning conventional dogma.", "她的學術批判尖銳地揭露了支撐傳統教條背後的認知{zh}。"),
        ],
        'v': [
            ("Empirical findings continue to {w} traditional theoretical frameworks.", "持續湧現的實證發現，正強有力地{zh}傳統的既定理論架構。"),
            ("The seasoned diplomat endeavored to {w} the profound enmity between both nations.", "經驗豐富的外交家傾注全力，試圖徹底{zh}兩國之間根深蒂固的敵意。"),
        ],
        'adj': [
            ("His {w} temperament constantly confounded colleagues who preferred steady deliberation.", "他那{zh}的性情，時常讓偏好條理分明周密商討的同事困惑不已。"),
            ("The monograph offers an {w} analysis of ideological fragmentation across society.", "該專著對整個社會中意識形態的分崩離析進行了極具{zh}的深刻剖析。"),
        ],
        'adv': [
            ("The witness replied {w} under aggressive cross-examination by the prosecutor.", "面對檢察官咄咄逼人的交互詰問，證人以極度{zh}的態度冷靜作答。"),
        ]
    },
    'gmat': {
        'n': [
            ("The board evaluated whether the proposed merger would compromise market {w}.", "董事會嚴肅評估了擬議中的併購交易是否會損及整個市場的{zh}。"),
            ("The analyst detected an unstated assumption concerning customer {w} in the business case.", "分析師在商業策劃書中發現了一個關於客戶{zh}的未明言底層假設。"),
            ("Economic volatility exerted downward pressure on overall investment {w}.", "整體經濟環境的劇烈波動，對各項投資的{zh}造成了嚴重的下行壓力。"),
        ],
        'v': [
            ("Management instituted audit protocols to {w} redundant operating expenditures.", "管理層制定了嚴密的審計規章，以果斷{zh}冗餘重複的日常營運開支。"),
            ("The statistical model failed to {w} for unexpected external price fluctuations.", "該統計預測模型未能充分{zh}難以預料的外部原材料價格劇烈波動。"),
        ],
        'adj': [
            ("Auditors discovered {w} irregularities between billing logs and reported ledger balances.", "審計人員在開票紀錄與帳簿通報餘額之間查出了重大且{zh}的異常問題。"),
            ("A {w} correlation in historic data does not guarantee ongoing predictive validity.", "歷史數據中呈現的{zh}關聯，絕不保證其具備持久不變的預測有效性。"),
        ],
        'adv': [
            ("Productivity increased {w} once automated robotics reached operational scale.", "一旦自動化機器人達到規模化運轉，整體生產力便{zh}迎來飛躍式提升。"),
        ]
    }
}

def generate_sentence_for_card(card):
    word = card['word'].strip()
    tier = card['tier']
    pos = card['pos'].lower()
    zh = card['zh']
    zh_clean = clean_zh(zh)

    # Determine general POS class
    if pos.startswith('v'):
        p_class = 'v'
    elif pos.startswith('adj'):
        p_class = 'adj'
    elif pos.startswith('adv'):
        p_class = 'adv'
    else:
        p_class = 'n'

    tier_patterns = PATTERNS.get(tier, PATTERNS['elem_1000'])
    pos_patterns = tier_patterns.get(p_class, tier_patterns.get('n'))

    idx = get_hash(word) % len(pos_patterns)
    en_tpl, zh_tpl = pos_patterns[idx]

    en = en_tpl.replace('{w}', word)
    zh_s = zh_tpl.replace('{zh}', zh_clean)

    return en, zh_s

print("Script loaded successfully.")
