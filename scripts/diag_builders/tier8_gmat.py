"""tier8_gmat.py - Tier 8: GMAT Focus 商業邏輯 (GMAT C2+) 250 Questions Generator.
IDs: diag-1751 to diag-2000.
"""

def make_q(q_id, subtopic, dim, hook, prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2):
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

    formatted_trans = f"【題幹精譯與邏輯分析】{trans}\n【選項列表】" + "  ".join([
        f"{opt_letters[i]}. {options[i]}" for i in range(4)
    ])
    full_trap = f"【選項剖析】正確答案為 ({ans_letter})「{corr}」。{concept} 此項精準鎖定核心邏輯因果關係，其餘干擾選項若非偏離討論範疇 (Out of Scope)，即為混淆充分與必要條件、或反向削弱/支持。"

    hook_obj = {
        "module": hook.split("-")[0].lower() if isinstance(hook, str) and "-" in hook else "gmat",
        "unitId": hook if isinstance(hook, str) else (hook.get("unitId", "gmat-u1") if isinstance(hook, dict) else "gmat-u1"),
        "unitTitle": f"{subtopic} 核心微課" if isinstance(hook, str) else (hook.get("unitTitle", subtopic) if isinstance(hook, dict) else subtopic)
    }

    return {
        "id": f"diag-{q_id:04d}",
        "tier": 8,
        "tierLabel": "Level 8: GMAT Focus 商業邏輯 (GMAT C2+)",
        "targetExam": "GMAT 批判推理 (GMAT CR)",
        "cefr": "C2+",
        "dimension": dim,
        "subtopic": subtopic,
        "difficulty": 5,
        "passage": None,
        "prompt": prompt,
        "options": options,
        "answer": ans_idx,
        "translation": formatted_trans,
        "coreConcept": concept,
        "sentenceAnalysis": "GMAT Focus 批判推理高階商業思維模型：要求嚴密辨識論點隱含前提 (Suppressed Premises)、因果混雜變數與量價/經濟學權衡機制。",
        "vocabulary": [
            {"word": w1, "phonetic": p1, "meaning": m1},
            {"word": w2, "phonetic": p2, "meaning": m2}
        ],
        "trapExplanation": full_trap,
        "courseHook": hook_obj
    }

def build_tier8():
    items = []
    q_counter = 1751
    
    subtopics_data = [('Identify the Assumption: Causal Premises',
  '批判推理',
  'C2-GMAT01',
  [('A municipal transit agency introduced express bus lanes on major arteries and observed a twenty percent increase '
    'in ridership over six months. The director concluded that dedicating lanes exclusively to buses directly caused '
    "commuters to abandon private automobiles. Which of the following is an assumption required by the director's "
    'argument?',
    'The surge in bus ridership was not primarily driven by an influx of new residents or fuel price spikes occurring '
    'during the same period.',
    'Private automobile registrations in the municipality decreased by exactly twenty percent over the six months.',
    'Bus fares were doubled immediately following the installation of the dedicated express lanes.',
    'The express bus routes experienced zero mechanical breakdowns throughout the evaluation period.',
    '辨識必要假設：論點認為『專用道直接導致通勤者棄私家車搭公車』。因果結論必須排除其他外生混雜變數（如人口湧入或油價暴漲亦能暴增搭乘人數），故假設『該增幅並非主要由同時期的新增居民湧入或油價飆升所驅動』是該論證成立的必備假設。',
    'GMAT 核心題型：排除外生因果混雜變數 (Alternative Causes)。',
    'conundrum',
    '/kəˈnʌn.drəm/',
    '難題謎語複雜困境',
    'artery',
    '/ˈɑːr.t̬ɚ.i/',
    '幹線要道動脈'),
   ('A retail chain eliminated paper coupons and shifted its entire promotional budget to smartphone app '
    'notifications, subsequently recording record quarterly sales. The marketing VP asserted that app notifications '
    'are far more effective at stimulating consumer purchases than print media. Which assumption underlies this '
    'conclusion?',
    'Customers who made purchases through the app would not have spent an equal or greater amount had print coupons '
    'been retained alongside the app.',
    "The retailer's competitor declared bankruptcy during the same quarter.",
    "Smartphone ownership among the retailer's customers reached one hundred percent.",
    'Print coupons cost twice as much to distribute as digital notifications.',
    '辨識必要假設：副總裁斷言『App 通知比紙本優惠券更有效拉抬消費』。必須假設『若保留紙本優惠券，這些消費者的消費額不會等於或超過使用 App 時的消費額』，否則無法證明 App 相對更有效。',
    '否定檢驗法 (Negation Test)：若紙本帶來更多消費，則結論被擊潰。',
    'stimulate',
    '/ˈstɪm.jə.leɪt/',
    '刺激激勵促使',
    'underlie',
    '/ˌʌn.dɚˈlaɪ/',
    '作為…的基礎構成…的根基'),
   ('A manufacturing corporation installed ergonomic chairs and standing desks across its headquarters and '
    'subsequently observed a fifteen percent drop in employee absenteeism. Management concluded that ergonomic '
    'furniture directly improved employee physical health, thereby reducing sick leave. Which assumption is required?',
    'The decline in absenteeism was not primarily attributable to a newly implemented remote-work policy enacted at '
    'the same time.',
    'Every employee used the standing function of their desk for at least four hours daily.',
    'The cost of the ergonomic furniture was completely offset by productivity gains within six months.',
    'Absenteeism rates in competing firms increased over the same chronological timeframe.',
    '必要假設題：管理層認定人體工學家具直接減少了生病請假。必須排除同時實施的遠距辦公政策等其他重大混雜變數（排除他因）。',
    '因果歸因必要假設：排除同時發生的重大干擾政策。',
    'absenteeism',
    '/ˌæb.sənˈtiː.ɪ.zəm/',
    '曠工曠職常態性缺勤',
    'ergonomic',
    '/ˌɝː.ɡəˈnɑː.mɪk/',
    '人體工學的'),
   ('A regional hospital mandated that all surgeons complete a ten-minute mindfulness meditation prior to entering the '
    'operating theater, resulting in a thirty percent reduction in postoperative surgical complications. The chief of '
    'surgery concluded that surgeon meditation directly enhances surgical precision. Which assumption is necessary?',
    'The complexity and risk profile of the surgical procedures performed remained comparable before and after the '
    'mindfulness mandate.',
    'Surgeons who meditated slept an average of two hours longer each night.',
    'Postoperative complications were entirely eradicated following the introduction of the policy.',
    "Patients were informed of their surgeon's meditation practice prior to anesthesia.",
    '必要假設題：結論認為冥想提高精準度降低併發症。必要假設是：手術的複雜度與風險程度在政策實施前後是相當的（若後續只接簡單手術，則併發症減少不能歸因於冥想）。',
    '控制變數假設：手術難度維持相當 (comparable complexity)。',
    'mindfulness',
    '/ˈmaɪnd.fəl.nəs/',
    '正念專注覺察',
    'postoperative',
    '/ˌpoʊstˈɑː.pɚ.ə.t̬ɪv/',
    '手術後的術後的'),
   ('An airline replaced hot meal service with pre-packaged snack boxes on short-haul flights and saw customer '
    'satisfaction scores increase by eight points. The executive concluded that passengers prefer light snacks over '
    'elaborate hot meals. What does this argument assume?',
    'The increase in satisfaction scores was not caused by significant improvements in flight punctuality during the '
    'trial.',
    'Snack boxes cost the airline forty percent less to provision than hot catering.',
    'Every passenger on short-haul flights consumed the entirety of their snack box.',
    'Hot meals will be permanently discontinued across all transcontinental international routes.',
    '必要假設題：高管將滿意度上升歸因於輕食點心盒。必須排除航班準點率大幅提升等其他真正導致滿意度暴增的決定性因素。',
    '排除他因假設：滿意度上升並非由準點率改善所致。',
    'punctuality',
    '/ˌpʌŋk.tʃuˈæl.ə.t̬i/',
    '準時守時',
    'provision',
    '/prəˈvɪʒ.ən/',
    '供應配備補給'),
   ('A tech enterprise switched from annual performance evaluations to continuous weekly feedback sessions, observing '
    'a twenty-five percent increase in software deployment frequency. Leadership inferred that continuous feedback '
    'directly accelerated developer output. Which assumption is required?',
    'The increased deployment frequency was not the result of breaking software updates into smaller, more frequent '
    'increments.',
    'Annual reviews caused severe psychological distress among all engineering staff.',
    'Developers worked forty percent more overtime hours following the policy change.',
    'Software bug density doubled as a consequence of faster deployments.',
    '必要假設題：領導層認定每週回饋提高了產出。必須排除『工程師只是將大更新拆解為更多次微型更新』這一偽增長假象。',
    '排除測量口徑改變之他因：非因拆小更新所致。',
    'deployment',
    '/dɪˈplɔɪ.mənt/',
    '部署上線調配',
    'increment',
    '/ˈɪn.krə.mənt/',
    '增量微幅增加遞增'),
   ('A university library replaced desktop computers with individual study carrels equipped with power outlets, and '
    'student visits increased by fifty percent. The head librarian concluded that students prioritize quiet laptop '
    'charging spaces over shared computing terminals. What assumption is necessary?',
    'The surge in library attendance was not driven by an campus-wide expansion of overall student enrollment that '
    'semester.',
    'Desktop computers were completely obsolete and incapable of browsing the internet.',
    'Students spend an average of six consecutive hours studying in the library daily.',
    'University tuition was reduced following the removal of the desktop computers.',
    '必要假設題：結論將入館人數暴增歸因於充電自習隔間。必須排除全校總招生人數暴增這一整體母體擴張因素。',
    '排除母體膨脹混雜變數：入館人次暴增並非源自全校擴招。',
    'carrel',
    '/ˈker.əl/',
    '自習隔間小書房',
    'enrollment',
    '/ɪnˈroʊl.mənt/',
    '註冊人數入學人數'),
   ('A logistics firm mandated that delivery drivers follow GPS algorithms that avoid left turns across oncoming '
    'traffic, subsequently noting a twelve percent drop in fuel consumption. The fleet director argued that minimizing '
    'idling at left turns was the primary driver of fuel efficiency. What does this argument assume?',
    'Drivers did not substantially reduce their highway driving speeds during the test period.',
    'Fleet maintenance costs increased by fifteen percent due to transmission wear.',
    'Left turns are responsible for ninety percent of all municipal traffic collisions.',
    'The algorithm increased the total mileage driven per delivery route by fifty miles.',
    '必要假設題：車隊主管將省油歸因於少等左轉怠速。必須假設司機在測試期間沒有同時大幅降低高速公路行車速度（低速省油是潛在他因）。',
    '排除速度改變之他因：司機未大幅降低行車速度。',
    'fleet',
    '/fliːt/',
    '車隊船隊機隊',
    'idling',
    '/ˈaɪ.dəl.ɪŋ/',
    '空轉怠速無所事事'),
   ('A metropolitan school district introduced interactive tablets in seventh-grade math classrooms, and average '
    'standardized test scores rose by six percentile points. The superintendent concluded that digital learning tools '
    'directly enhance mathematical comprehension. Which assumption is required?',
    'The test score improvement was not primarily the result of teachers teaching directly to the exam curriculum.',
    'Every seventh-grade student had high-speed broadband internet access at home.',
    'Standardized math exams were identical in difficulty to those administered five years prior.',
    'Paper textbooks were completely eradicated from the school district.',
    '必要假設題：學區長將分數提高歸因於平板數位教學。必須假設該進步並非主要源自教師針對考試重點進行應試填鴨刷題。',
    '排除應試刷題他因：進步非主要源自針對考綱教學。',
    'superintendent',
    '/ˌsuː.pɚ.ɪnˈten.dənt/',
    '學區長負責人主管總監',
    'percentile',
    '/pɚˈsen.taɪl/',
    '百分位數百分位'),
   ('A pharmaceutical company altered the packaging of its allergy medication from blister packs to easy-open bottles, '
    'and customer reorder rates increased by eighteen percent. Marketing concluded that packaging accessibility was '
    'the decisive factor driving brand loyalty. What assumption underlies this argument?',
    'The price of the medication was not reduced significantly during the same period.',
    'Blister packs are impossible for elderly individuals to puncture.',
    'Customer allergies became substantially more severe following the packaging alteration.',
    'The active chemical formulation of the allergy medication was completely redesigned.',
    '必要假設題：行銷部門將回購率上升歸因於包裝易開。必須假設在此期間藥品價格並未大幅降價（降價促銷是強烈他因）。',
    '排除價格變動他因：藥品價格未大幅下調。',
    'blister pack',
    '/ˈblɪs.tɚ ˌpæk/',
    '泡殼包裝泡罩包裝',
    'accessibility',
    '/əkˌses.əˈbɪl.ə.t̬i/',
    '易用性可近性無障礙性')]),
 ('Identify the Assumption: Sample vs. Population',
  '批判推理',
  'C2-GMAT02',
  [('A consumer research firm surveyed five hundred luxury electric vehicle owners in Beverly Hills and found that '
    'eighty percent preferred digital touchscreens over physical knobs. The automotive analyst concluded that all '
    'American automobile buyers will favor touchscreen-only dashboards in future models. Which assumption is required '
    "by the analyst's conclusion?",
    'The dashboard preferences of affluent luxury EV owners in Beverly Hills are representative of the broader '
    'American car-buying population.',
    'Physical knobs are thirty percent cheaper to fabricate than integrated digital touchscreens.',
    'Gasoline-powered vehicles will be entirely phased out of the American market within five years.',
    'Every surveyed participant owned at least two luxury automobiles.',
    '樣本與母體抽樣假設題：分析師用比佛利山莊500位豪車車主的偏好，直接推論至『全體美國購車大眾』。其必然隱含的假設是：比佛利山莊豪車車主的偏好能代表廣大美國汽車買家整體母體。',
    '抽樣代表性假設 (Sample Representativeness)：樣本偏好具有代表性。',
    'affluent',
    '/ˈæf.lu.ənt/',
    '富裕的富足的',
    'representative',
    '/ˌrep.rɪˈzen.t̬ə.t̬ɪv/',
    '具代表性的代表性的'),
   ('A trial of an experimental anti-hypertensive medication conducted exclusively on male collegiate athletes showed '
    'zero adverse cardiac events. The medical director concluded that the drug is completely safe for widespread '
    'clinical prescription across the general population. What does this argument assume?',
    'The physiological cardiovascular response of elite male collegiate athletes is sufficiently representative of '
    'older, sedentary demographics.',
    'Hypertension is exclusively diagnosed in young athletic individuals.',
    'Adverse events will occur in precisely ten percent of female clinical trial participants.',
    'The experimental drug costs less than conventional beta-blockers.',
    '樣本與母體代表性假設題：以年輕男性大學運動員為試驗對象，推論藥物對『全體廣大公眾（含老年、久坐族）』完全安全。其核心假設為：菁英男運動員的心血管反應足以代表年長且缺乏運動的普羅大眾。',
    '抽樣偏差防範假設：樣本反應能代表真實老年高危母體。',
    'anti-hypertensive',
    '/ˌæn.ti.haɪ.pɚˈten.sɪv/',
    '抗高血壓的降血壓的',
    'sedentary',
    '/ˈsed.ən.ter.i/',
    '久坐的缺乏運動的'),
   ('A corporate software company tested a new user interface on twenty veteran internal software engineers and '
    'reported a forty percent increase in task completion speed. The product manager declared that the software will '
    'dramatically accelerate workflow for all corporate clients. Which assumption underlies this assertion?',
    'The technical proficiency and software familiarity of veteran internal engineers do not skew task completion '
    'speed compared to everyday corporate clients.',
    'Every corporate client employs at least twenty software engineers.',
    'Internal software engineers worked without taking breaks during the trial.',
    'The user interface code was written entirely in Python.',
    '樣本代表性偏差假設：以內部資深工程師的測試數據，推論外部日常企業客戶。必須假設內部資深工程師的深厚技術造詣與熟悉度不會造成偏差。',
    '樣本特異性假設：內部專家速度不偏離普通客戶。',
    'proficiency',
    '/prəˈfɪʃ.ən.si/',
    '熟練精通造詣',
    'skew',
    '/skjuː/',
    '偏斜扭曲使有偏差'),
   ('A university survey polled three hundred students exiting the main campus library on a Friday night and found '
    'that ninety percent favored increasing student fees to fund extended library hours. The administration concluded '
    'that the student body overwhelmingly supports a library fee hike. What assumption is required?',
    'Students present in the library on a Friday night are not uncharacteristically enthusiastic about library '
    'services compared to the broader student body.',
    'Library attendance on Friday night equals library attendance on Tuesday morning.',
    'The fee hike will generate exactly one million dollars in municipal revenue.',
    'Students surveyed were enrolled exclusively in doctoral humanities programs.',
    '抽樣偏差假設題：在週五夜晚從圖書館走出來的學生，顯然對圖書館極具熱情。推論至全體學生時，必須假設週五夜晚在館內的學生並非異於常人般特別狂熱。',
    '自選擇偏差假設：週五在館學生能代表全校一般學生。',
    'uncharacteristically',
    '/ˌʌn.ker.ək.təˈrɪs.tɪ.kəl.i/',
    '反常地非典型地',
    'enrollment',
    '/ɪnˈroʊl.mənt/',
    '入學註冊'),
   ('An urban cycling advocacy group surveyed five hundred subscribers to a dedicated cycling magazine and discovered '
    'that ninety-five percent favor converting vehicular lanes into protected bike paths. The group asserted that '
    'urban residents broadly support road reallocations. What assumption does this argument require?',
    'Subscribers to a niche cycling publication share transport preferences that are broadly aligned with the diverse '
    'urban populace.',
    'Vehicular traffic congestion in the municipality decreased over the preceding decade.',
    'Bicycle manufacturing costs have declined due to foreign import subsidies.',
    'Every survey respondent commuted to work exclusively by bicycle year-round.',
    '樣本偏誤假設：抽樣對象為小眾自行車雜誌訂閱戶（極端愛好者）。推論至全體城市居民時，必須假設訂閱戶的偏好與多元市民群體大體一致。',
    '利益相關樣本假設：小眾愛好者偏好與大眾一致。',
    'advocacy',
    '/ˈæd.və.kə.si/',
    '倡導擁護宣傳',
    'reallocation',
    '/ˌriː.æl.əˈkeɪ.ʃən/',
    '重新分配再配置'),
   ('A market research firm evaluated consumer taste preferences by offering free samples of organic dark chocolate in '
    'a high-end gourmet supermarket, finding that seventy percent preferred it over milk chocolate. The analyst '
    'projected that dark chocolate will dominate overall confectionery retail sales nationwide. Which assumption is '
    'necessary?',
    'Shoppers frequenting high-end gourmet supermarkets do not hold palate preferences that diverge significantly from '
    'mainstream retail grocery consumers.',
    'Dark chocolate contains fewer calories per serving than commercial milk chocolate.',
    'Milk chocolate production will be halted by international trade embargoes.',
    'Every supermarket customer sampled exactly two pieces of dark chocolate.',
    '樣本偏差假設：在高檔精品超市試吃的顧客，其味覺偏好與主流大眾雜貨店消費者的偏好並無顯著分歧。',
    '高端樣本代表性假設：精品超市顧客偏好不顯著偏離主流人群。',
    'confectionery',
    '/kənˈfek.ʃən.er.i/',
    '糖果糕點糖果業',
    'palate',
    '/ˈpæl.ət/',
    '味覺品味上顎'),
   ('A clinical trial evaluating a novel cognitive behavioral therapy for insomnia recruited fifty corporate '
    'executives suffering from chronic work stress and observed an eighty percent recovery rate. The lead researcher '
    'concluded that the therapy is an efficacious treatment for all forms of insomnia. What does the conclusion '
    'assume?',
    'The mechanisms driving insomnia in stressed corporate executives are sufficiently similar to those causing '
    'insomnia across diverse patient populations.',
    'Chronic work stress is the sole medical cause of insomnia worldwide.',
    'Cognitive behavioral therapy takes twice as long to administer as pharmacological sedatives.',
    'Executives in the trial slept an average of eight hours nightly following the intervention.',
    '樣本適用範圍假設：高壓白領高管的失眠機制與普羅大眾各種病因引發的失眠機制充分相似。',
    '病因機理代表性假設：高管失眠機制與廣大病患人群相似。',
    'efficacious',
    '/ˌef.əˈkeɪ.ʃəs/',
    '有效的靈驗的產生成效的',
    'insomnia',
    '/ɪnˈsɑːm.ni.ə/',
    '失眠症'),
   ('A survey of five hundred smartphone power-users who voluntarily registered for a public beta operating system '
    'test indicated that ninety percent appreciated the new complex multitasking interface. The software architect '
    'concluded that the interface will be enthusiastically received by the general consumer market. What assumption '
    'underlies this argument?',
    'Early-adopter beta testers do not possess technical tolerance and appetite for complexity that is fundamentally '
    'unrepresentative of everyday users.',
    'Smartphones running the beta operating system never experienced battery drainage.',
    'Everyday consumers update their smartphone operating systems within twenty-four hours of release.',
    'The beta operating system was tested on five different hardware architectures.',
    'Beta 測試者偏好假設：自願申請公開測試的極客硬核玩家(power-users)，其對複雜度的偏好與容忍度不會根本性地脫離一般普通用戶。',
    '極客樣本代表性假設：早期玩家偏好不顯著脫離普通大眾。',
    'beta tester',
    '/ˈbeɪ.t̬ə ˌtes.tɚ/',
    '公測人員測試員',
    'appetite',
    '/ˈæp.ə.taɪt/',
    '胃口食慾慾望強烈愛好'),
   ('An environmental organization polled visitors entering a national park during peak summer wilderness season and '
    'found that eighty-five percent supported tripling park admission fees to fund conservation. The director '
    'announced that citizens nationwide are willing to pay higher fees for public lands. What assumption is required?',
    'National park visitors during peak summer do not exhibit a willingness to pay that is disproportionately higher '
    'than that of the broader national electorate.',
    'Park admission fees have remained frozen for over fifty consecutive years.',
    'Every visitor surveyed possessed a college degree in environmental ecology.',
    'Conservation projects funded by park fees will eliminate forest wildfire risk entirely.',
    '自選擇遊客樣本假設：旺季主動前往國家公園的遊客，其付費意願不會顯著高於全國廣大選民公眾。',
    '付費意願代表性假設：熱心遊客願付高額費用不代表全體納稅人亦然。',
    'electorate',
    '/iˈlek.tɚ.ət/',
    '全體選民選區全體居民',
    'disproportionately',
    '/ˌdɪs.prəˈpɔːr.ʃən.ət.li/',
    '不成比例地過分地'),
   ('A political polling agency surveyed four hundred home-telephone owners on weekday afternoons regarding municipal '
    'tax levies and found that sixty-eight percent opposed the tax. The pollster declared that the municipal tax levy '
    "is doomed to defeat at the upcoming ballot box. Which assumption underlies the pollster's prediction?",
    'Voters who answer home landline telephones on weekday afternoons do not hold political orientations that '
    'systematically differ from the broader active voting electorate.',
    'Every registered voter in the municipality possesses an active residential landline.',
    'The municipal tax levy would fund construction of an international sports stadium.',
    'Voters who oppose taxes never participate in municipal school board elections.',
    '住宅固話日間調查偏差假設：週間下午會接家用市話的選民（多為退休高齡者），其政治傾向不會系統性地偏離廣大整體投票選民。',
    '經典抽樣偏差假設：日間座機受訪者不偏離整體選民結構。',
    'levy',
    '/ˈlev.i/',
    '課稅徵收徵稅額',
    'landline',
    '/ˈlænd.laɪn/',
    '市話陸上通信線路固定電話')]),
 ('Weaken the Argument: Alternative Explanations',
  '批判推理',
  'C2-GMAT03',
  [('A municipal police department installed high-definition speed cameras along an accident-prone highway corridor, '
    'and fatal collisions dropped by forty percent over the subsequent twelve months. The police chief claimed that '
    'automated enforcement cameras were directly responsible for the dramatic reduction in fatalities. Which of the '
    "following, if true, most seriously weakens the police chief's claim?",
    'Six months prior to camera installation, the department of transportation repaved the treacherous highway surface '
    'and installed high-friction asphalt with median barriers.',
    'The speed cameras issued an average of three hundred citations daily during their first week of operation.',
    'Fatal collisions on neighboring rural secondary roads remained unchanged over the same timeframe.',
    'The cost of installing and maintaining the cameras was entirely financed by municipal traffic fines.',
    '削弱題（引入強大他因）：局長將事故銳減歸功於測速相機。若在相機啟用前，交通局早已重新鋪設高摩擦力抗滑瀝青並加裝中央實體防撞護欄，這提供了導致事故暴跌的決定性實體工程他因，直接削弱相機歸因！',
    'GMAT 核心削弱手段：提供更有說服力之替代解釋 (Alternative Cause)。',
    'treacherous',
    '/ˈtretʃ.ɚ.əs/',
    '危險陰險的危難的',
    'asphalt',
    '/ˈæs.fɑːlt/',
    '瀝青柏油'),
   ('A wellness retreat center claimed that its seven-day organic raw food cleanse causes profound reductions in '
    'chronic inflammation, citing blood panels of fifty clients who showed thirty percent drops in C-reactive protein. '
    "Which of the following, if true, casts the most serious doubt on the retreat's claim?",
    'All retreat participants concurrently discontinued smoking tobacco, abstained from alcohol, and engaged in '
    'mandatory eight-hour nightly sleep and daily yoga.',
    'The organic raw food cleanse consisted primarily of cold-pressed kale juice and raw almond butter.',
    'Blood tests were conducted by an independent certified diagnostic pathology laboratory.',
    'Ten of the fifty participants reported mild gastrointestinal discomfort during the first two days.',
    '削弱題（混雜變數干擾）：養生中心將發炎指標暴跌歸功於生機排毒飲食。若學員在排毒期間同時徹底戒菸戒酒、每日強制睡眠八小時並練瑜伽，這些強大的健康生活方式改變完全能解釋發炎消退，從而動搖純生食排毒的神效宣稱！',
    '混雜生活型態他因削弱單一飲食歸因。',
    'inflammation',
    '/ˌɪn.fləˈmeɪ.ʃən/',
    '發炎炎性反應點火',
    'concurrently',
    '/kənˈkɝː.ənt.li/',
    '同時發生地兼'),
   ('An e-commerce retailer redesigned its website navigation layout to be minimalist and observed a twenty percent '
    'increase in checkout conversions over the subsequent month. The design director claimed that eliminating visual '
    "clutter was the sole cause of the revenue surge. Which finding, if true, most undermines the director's "
    'conclusion?',
    'The site redesign was launched simultaneously with an aggressive nationwide thirty-percent-off holiday '
    'promotional campaign.',
    'The number of product search queries conducted on the site remained stable after the redesign.',
    'Mobile shoppers accounted for sixty-five percent of all completed transactions during the period.',
    'Competitors in the same retail vertical did not modify their website navigation layouts.',
    '削弱題（促銷降價他因）：設計總監自誇是極簡排版拉抬了結帳轉化率。若改版上線當天正好同步推出了全國性的七折重大促銷折扣，這項全網打折活動才是銷量暴增的壓倒性真正主因，總監歸因不攻自破！',
    '促銷大降價成為壓倒性替代解釋。',
    'clutter',
    '/ˈklʌt̬.ɚ/',
    '雜亂混亂混雜',
    'simultaneously',
    '/ˌsaɪ.məlˈteɪ.ni.əs.li/',
    '同時地同步地'),
   ('A city renovated its central park by adding modern lighting and walking trails, after which violent crime '
    'incidents in the park dropped by fifty percent. City officials proclaimed that landscape improvements actively '
    "deter criminal activity. Which of the following, if true, most severely weakens the officials' argument?",
    'The municipal police department quadrupled the number of uniformed foot patrol officers stationed in the park '
    'around the clock following the renovation.',
    'Park maintenance expenditures increased by twenty-five percent following the installation of the new walking '
    'trails.',
    'Nearby residential neighborhoods experienced a modest five percent increase in property crime rates.',
    'The walking trails were constructed using eco-friendly permeable recycled rubber pavers.',
    '削弱題（警力倍增他因）：官員宣稱是公園景觀改造震懾了犯罪。若改建完成後市警局將全天候駐守巡邏的徒步制服警力擴增為四倍，強大的警力巡邏才是犯罪腰折的直接原因，有力削弱景觀決定論！',
    '警力四倍增強成為最致命之削弱他因。',
    'deter',
    '/dɪˈtɝː/',
    '威懾制止防範嚇阻',
    'permeable',
    '/ˈpɝː.mi.ə.bəl/',
    '可滲透的透水的'),
   ('A private university instituted mandatory mid-semester course evaluations, after which end-of-term student '
    'failure rates declined by eighteen percent. The dean argued that giving students an early voice motivates '
    "professors to improve pedagogy dynamically. Which of the following, if true, most undermines the dean's "
    'assertion?',
    'Concurrently with the policy, the academic senate lowered the passing grade threshold across all undergraduate '
    'departments from 70% to 60%.',
    'Professors received computerized summaries of mid-semester feedback within forty-eight hours.',
    'Student attendance in lecture halls remained virtually unchanged across both semesters.',
    'Course evaluation completion rates exceeded ninety percent across all academic divisions.',
    '削弱題（降格通過門檻他因）：院長自認期中回饋促使教授精進教學進而降低不及格率。若學校教務會議在推行回饋的同時，悄悄將全校及格門檻從70分大幅調降至60分，不及格率下滑純粹是標準放水所致，極大削弱院長論點！',
    '評量標準放寬成為壓倒性替代解釋。',
    'pedagogy',
    '/ˈped.ə.ɡɑː.dʒi/',
    '教學法教學學教育學',
    'threshold',
    '/ˈθreʃ.hoʊld/',
    '門檻臨界點起點'),
   ('A poultry farming conglomerate eliminated preventative antibiotic usage in its feed and subsequently reported an '
    'eight percent decrease in overall flock mortality over two years. The chief veterinarian claimed that '
    'antibiotic-free feed improves baseline avian immune function. Which of the following, if true, most seriously '
    "weakens the veterinarian's claim?",
    'During the same two-year period, the conglomerate modernized all its coops with advanced HEPA air filtration and '
    'reduced bird flocking density by fifty percent.',
    'The cost of organic, antibiotic-free poultry feed was twenty percent higher than standard feed.',
    'Flock mortality rates among competitors utilizing antibiotics remained consistent over the period.',
    'Antibiotic residues in processed chicken breast meat fell to undetectable levels.',
    '削弱題（環境改善他因）：獸醫宣稱不用抗生素改善了禽鳥免疫力降低死亡率。若同一時期養殖場全面升級了高規格HEPA空氣過濾系統，並將飼養密度大幅砍半減少50%，居住環境與空氣的大幅改善才是死亡率下降的真正關鍵！',
    '飼養密度砍半與空氣過濾構成替代解釋。',
    'poultry',
    '/ˈpoʊl.tri/',
    '家禽禽肉',
    'conglomerate',
    '/kənˈɡlɑː.mɚ.ət/',
    '企業集團多角化大企業'),
   ('A tech corporation switched its default search engine across all employee workstations to an AI-driven knowledge '
    'retrieval tool, and worker productivity self-reported an increase of twenty-five percent. The CTO concluded that '
    'the AI tool was the sole catalyst of enhanced corporate output. Which of the following, if true, most seriously '
    "undermines the CTO's conclusion?",
    'The company implemented a mandatory forty-hour workweek cap that eliminated rampant chronic overtime fatigue '
    'during the identical quarter.',
    'Employees were required to complete an hour-long webinar demonstrating how to query the AI tool.',
    'Workstation IT support ticket volumes remained constant throughout the testing period.',
    'The AI-driven knowledge retrieval tool cost three times as much per user license as standard search engines.',
    '削弱題（工時上限消除疲勞他因）：技術長認定AI工具是生產力暴增的唯一催化劑。若公司在同一個季度強制推行每週40小時工時上限，徹底消除了員工長期積習的慢性加班疲勞，精神恢復才是產出提升的主因！',
    '消除加班過勞成為生產力提升之有力他因。',
    'retrieval',
    '/rɪˈtriː.vəl/',
    '檢索擷取收回',
    'rampant',
    '/ˈræm.pənt/',
    '猖獗的氾濫的狂暴的'),
   ('A pharmaceutical trial evaluated an experimental antidepressant and noted a forty percent reduction in depressive '
    "symptom scores among participants after eight weeks. The pharmaceutical firm announced that the drug's molecular "
    "mechanism is exceptionally efficacious. Which finding, if true, casts the most severe doubt on the firm's claim?",
    'A parallel control group receiving an inert sugar pill placebo demonstrated an identical forty percent reduction '
    'in depressive symptom scores.',
    'The trial participants were recruited through targeted advertisements on public subway lines.',
    'The molecular structure of the antidepressant binds selectively to serotonin receptors.',
    'Participants in the trial attended thirty-minute clinical assessment sessions once every fortnight.',
    '削弱題（安慰劑對照組效應）：藥廠宣稱新藥分子機制療效卓越。若吃純糖丸安慰劑的對照組患者同樣表現出了完全相同40%的症狀減輕，說明所謂的療效只不過是安慰劑效應或自癒效應，該分子藥物毫無實質特異療效！',
    '經典對照組削弱：安慰劑組效果相同 (Identical Placebo Effect)。',
    'antidepressant',
    '/ˌæn.ti.dɪˈpres.ənt/',
    '抗憂鬱劑抗抑鬱藥',
    'placebo',
    '/pləˈsiː.boʊ/',
    '安慰劑無效對照劑'),
   ('A metropolitan transit authority raised municipal subway fares by twenty percent and observed a ten percent '
    'increase in total revenue over the following year. Officials declared that subway demand is largely '
    'price-inelastic and will continue to generate higher revenues with future fare hikes. Which of the following, if '
    "true, most seriously weakens the officials' conclusion?",
    'A nationwide fuel shortage doubled the cost of operating private automobiles, temporarily forcing motorists to '
    'commute via subway despite the fare hike.',
    'Subway operating expenditures increased by four percent due to wage adjustments for track maintenance crews.',
    'The municipal bus system maintained its fares at previous levels throughout the entire year.',
    'The transit authority introduced mobile contactless payment gates at all stations.',
    '削弱題（外生替代品油荒逼迫他因）：官員宣稱地鐵需求缺乏彈性，未來繼續漲價仍會增收。若全國性油荒導致開車成本暴增一倍，暫時迫使開車族不得不搭地鐵，這種外生極端衝擊掩蓋了漲價對需求的真實破壞，未來常態下繼續漲價必遭反噬！',
    '極端油荒外生衝擊削弱價格彈性不變假定。',
    'inelastic',
    '/ˌɪn.ɪˈlæs.tɪk/',
    '無彈性的缺乏彈性的',
    'motorist',
    '/ˈmoʊ.t̬ɚ.ɪst/',
    '開車者駕駛人汽車駕駛'),
   ('An organic orchard replaced synthetic chemical fungicides with beneficial predatory nematodes, and apple yield '
    'increased by fifteen percent the following autumn. The orchardist concluded that biological pest control is '
    'superior to chemical treatments in maximizing harvest yields. Which finding, if true, most seriously weakens the '
    "orchardist's conclusion?",
    'The region experienced an exceptionally sunny, frost-free spring with record pollination rates, boosting harvest '
    'yields across all regional orchards by twenty percent.',
    'Predatory nematodes cost thirty percent more to purchase per acre than standard chemical fungicides.',
    'The orchardist planted sixty new heirloom apple saplings along the western boundary of the property.',
    'Nematode populations naturally declined as ambient autumn temperatures dropped below freezing.',
    '削弱題（全區大豐收他因）：果農自誇生物防治優於化學藥劑使產量增加15%。若該地區當年春季氣候極佳、無霜凍且授粉率破紀錄，導致全區所有果園平均產量普遍暴增20%，說明該果農的15%甚至低於平均水準，完全是氣候大豐收所致！',
    '全區氣候豐收大環境削弱個別技術優勢結論。',
    'fungicide',
    '/ˈfʌn.dʒɪ.saɪd/',
    '殺真菌劑殺菌劑',
    'nematode',
    '/ˈnem.ə.toʊd/',
    '線蟲線蟲類')]),
 ('Weaken the Argument: Reverse Causality',
  '批判推理',
  'C2-GMAT04',
  [('A sociological study established a strong positive correlation between high levels of civic volunteerism and '
    'robust subjective psychological well-being. The lead researcher concluded that participating in community '
    'volunteer programs directly causes individuals to develop greater emotional contentment. Which of the following, '
    "if true, most directly undermines the researcher's conclusion?",
    'Individuals who already possess high baseline psychological well-being and life satisfaction are substantially '
    'more likely to seek out and sustain volunteer commitments.',
    'Volunteer programs that focus on environmental cleanup report higher volunteer retention than those addressing '
    'food insecurity.',
    'Many municipal governments offer tax credits to citizens who complete fifty hours of certified community '
    'volunteer service.',
    'The sociological study surveyed twelve hundred adults across six distinct metropolitan districts.',
    '削弱題（因果倒置）：研究人員認為『當志工導致心理幸福』。若原本就具備極高心理幸福感的人更傾向於主動參與志願服務，說明是『幸福感促成了當志工』，因果方向完全顛倒！',
    'GMAT 核心邏輯削弱：因果倒置 (Reverse Causality)。',
    'volunteerism',
    '/ˌvɑː.lənˈtɪr.ɪ.zəm/',
    '志願服務志工行動',
    'contentment',
    '/kənˈtent.mənt/',
    '知足滿足滿意'),
   ('An educational survey revealed that high school students who play competitive chess score twenty percent higher '
    'on standardized mathematical aptitude exams than non-chess players. The school board concluded that playing chess '
    'directly improves mathematical reasoning ability. Which of the following, if true, most severely weakens the '
    "board's argument?",
    'Students with an innate, pre-existing talent for mathematical abstraction and spatial reasoning are '
    'overwhelmingly drawn to playing competitive chess.',
    'Chess clubs in the school district meet for ninety minutes twice weekly after formal classes conclude.',
    'Standardized mathematical exams place heavy emphasis on algebra and planar geometry.',
    'Several master chess players in the state failed to graduate from four-year universities.',
    '削弱題（因果倒置）：校董會認定『下西洋棋提高數學能力』。若天生就具備高度數學抽象與空間天賦的學生強烈被西洋棋吸引，說明是『數學天賦導致喜歡下棋』，存在嚴重的反向因果！',
    '反向因果削弱題：天賦使然吸引下棋 (pre-existing talent leads to chess)。',
    'aptitude',
    '/ˈæp.tə.tuːd/',
    '天資資質能力傾向',
    'spatial',
    '/ˈspeɪ.ʃəl/',
    '空間的空間維度的'),
   ('A public health study found that adults who drink three or more cups of green tea daily have significantly lower '
    'rates of cardiovascular disease. Researchers concluded that chemical polyphenols in green tea exert a protective '
    "effect on arterial walls. Which finding, if true, most seriously weakens the researchers' causal claim?",
    'Individuals who routinely consume green tea lead profoundly more health-conscious lifestyles, including daily '
    'vigorous aerobic exercise and low-sodium diets.',
    'Green tea contains caffeine, which temporarily elevates resting heart rate in sensitive individuals.',
    'Black tea and oolong tea contain chemical polyphenols in concentrations comparable to green tea.',
    'Cardiovascular disease remains the leading cause of adult mortality in Western industrialized nations.',
    '削弱題（健康意識促成習慣與健康的雙重因果/混雜）：若天天喝綠茶的人本身生活型態極度重視健康（規律運動低鈉），是追求健康促成了喝茶與低心臟病，削弱了茶本身的藥理決定論。',
    '生活型態自選擇因果混雜削弱。',
    'polyphenol',
    '/ˌpɑː.liˈfiː.nɑːl/',
    '多酚多酚類化合物',
    'arterial',
    '/ɑːrˈtɪr.i.əl/',
    '動脈的幹道的'),
   ('A management consultant discovered that highly profitable corporate enterprises invest forty percent more capital '
    'in ergonomic workplace amenities than marginal firms. The consultant concluded that lavish office amenities '
    "directly drive superior profitability. Which of the following, if true, most seriously weakens the consultant's "
    'claim?',
    'Companies that achieve exceptional profitability have vast surplus capital that permits lavish discretionary '
    'expenditures on office amenities.',
    'Ergonomic furniture typically lasts five years longer than budget office furnishings.',
    'Employees in the corporate headquarters reported high satisfaction with the ergonomic seating.',
    'The survey evaluated two hundred technology firms across Silicon Valley.',
    '削弱題（因果倒置）：顧問認為『豪華辦公設施帶動了高利潤』。若事實上是已經實現超凡盈利的公司擁有充裕的盈餘資金，才得以大肆採購奢華辦公設施，因果關係徹底倒置！',
    '因果倒置削弱：是盈利催生了設施消費 (Profitability enables amenities)。',
    'amenity',
    '/əˈmen.ə.t̬i/',
    '便利設施生活福利',
    'lavish',
    '/ˈlæv.ɪʃ/',
    '奢華的揮霍的慷慨的'),
   ('A psychological survey established that individuals who read literary fiction regularly display higher scores on '
    'cognitive empathy and emotional recognition tests. The psychologist inferred that reading literary fiction trains '
    "the brain to understand others' emotions. Which finding, if true, most damages the psychologist's inference?",
    'Individuals who possess naturally superior innate empathy and interpersonal sensitivity are strongly predisposed '
    'toward choosing complex character-driven fiction.',
    'Reading non-fiction historical biographies requires comparable levels of vocabulary and concentration.',
    'Audiobook listeners demonstrated emotional recognition scores identical to print book readers.',
    'Many critically acclaimed literary novelists struggled with turbulent personal relationships.',
    '削弱題（因果倒置）：心理學家認定『讀純文學小說訓練了同理心』。若天生同理心高、人際敏感度強的人，本身就更強烈傾向於挑選複雜的人物小說來閱讀，說明是『同理心促成了讀小說』，因果倒置！',
    '反向因果：天生同理心高者主動選擇文學小說。',
    'empathy',
    '/ˈem.pə.θi/',
    '同理心同感同情心',
    'predispose',
    '/ˌpriː.dɪˈspoʊz/',
    '使傾向於使易受感染'),
   ('An urban study observed that metropolitan neighborhoods with higher numbers of public green parks exhibit '
    'significantly lower rates of juvenile delinquency. The sociologist concluded that urban greenery pacifies '
    'aggressive impulses and prevents adolescent crime. Which finding, if true, most seriously undermines the '
    "sociologist's conclusion?",
    'Affluent, low-crime neighborhoods possess the municipal political leverage required to lobby for and secure the '
    'construction of public parks.',
    'Public parks require regular municipal maintenance, including trash collection and lawn mowing.',
    'Juvenile delinquency rates across the entire metropolitan area have decreased by five percent over the decade.',
    'Children who visit parks engage in team sports like soccer and basketball.',
    '削弱題（因果倒置/政經實力倒推）：社會學家認為『公園綠地降低青少年犯罪』。若本身就治安良好、犯罪率低的富裕社區，擁有足夠的政治影響力去成功遊說爭取修建更多公園，說明是『治安好的富人區促成了公園修建』！',
    '反向因果與階級資源倒置削弱。',
    'delinquency',
    '/dɪˈlɪŋ.kwən.si/',
    '違法行為犯罪失職',
    'pacify',
    '/ˈpæs.ə.faɪ/',
    '平息安撫撫慰'),
   ('A workplace study noted that executives who maintain organized, clutter-free desks make corporate decisions '
    'twenty percent faster than those with messy workspaces. The researcher concluded that a tidy desk clears mental '
    'cognitive clutter, directly expediting decision-making. Which finding, if true, most directly undermines the '
    "researcher's conclusion?",
    'Individuals with naturally fast, decisive cognitive styles prioritize rapid organizational habits and keep '
    'workspaces tidy to facilitate quick paper disposal.',
    'The study was conducted across three distinct corporate offices in Chicago.',
    'Messy desks contained an average of forty more paper documents than tidy desks.',
    'Executives with tidy desks reported drinking fewer cups of espresso daily.',
    '削弱題（因果倒置）：研究人員認定『整潔的桌子加速決策』。若天生雷厲風行、思維快速果斷的人，本身就習慣性地保持工作環境整潔以便快速處理文件，說明是『果斷敏捷的性格造就了乾淨的桌子』！',
    '性格果斷導致桌面整潔之反向因果削弱。',
    'clutter-free',
    '/ˈklʌt̬.ɚ friː/',
    '無雜亂的整潔的',
    'expedite',
    '/ˈek.spə.daɪt/',
    '加快加速處理促進'),
   ('A pediatric study found that children who spend more than two hours outdoors daily score higher on tests of '
    'creative divergent thinking. The pediatrician concluded that outdoor natural sunlight stimulates cognitive '
    "creativity. Which of the following, if true, most seriously weakens the pediatrician's conclusion?",
    'Children who are inherently energetic and imaginatively curious are far more restless indoors and actively choose '
    'to spend extended hours exploring outside.',
    'Sunlight exposure catalyzes the synthesis of vitamin D in human skin.',
    'Standardized tests of divergent thinking measure multiple potential uses for common household objects.',
    'Children in urban settings had fewer opportunities to visit forested public reserves.',
    '削弱題（因果倒置）：兒科醫生宣稱『戶外陽光刺激了創造力』。若天生精力充沛、富有想像好奇心的孩子在室內根本待不住，而主動選擇跑去戶外探索，說明是『富有創造想像力的特質驅使他們去戶外』！',
    '性格好奇驅使戶外活動之反向因果削弱。',
    'pediatric',
    '/ˌpiː.diˈæt.rɪk/',
    '小兒科的兒科學的',
    'divergent',
    '/daɪˈvɝː.dʒənt/',
    '發散的分歧的背道而馳的'),
   ('An economic survey observed that countries with high venture capital investment rates experience unprecedented '
    'patent output and technological innovation. The economist argued that abundant venture capital directly sparks '
    "technological genius. Which finding, if true, most severely damages the economist's claim?",
    'Venture capital funds flow overwhelmingly into countries that already possess pre-existing concentrations of '
    'world-class scientists, engineers, and patentable inventions.',
    'Venture capital investments carry higher portfolio risk than government municipal bonds.',
    'Patents registered in technology sectors typically expire twenty years after filing.',
    'The survey evaluated patent registry statistics across thirty-two OECD member states.',
    '削弱題（因果倒置）：經濟學家宣稱『創投資本點燃了科技天才與發明』。若創投資金本來就是蜂擁流向那些已經高度聚集了世界級科學家與現成專利技術發明的國家，說明是『既有的科技實力吸引了創投資本』！',
    '科技實力吸引資本之反向因果削弱。',
    'venture capital',
    '/ˈven.tʃɚ ˌkæp.ə.t̬əl/',
    '創業投資風險投資',
    'OECD',
    '/ˌoʊ.iː.siːˈdiː/',
    '經濟合作暨發展組織'),
   ('A sleep research study established that individuals who sleep eight hours nightly earn significantly higher '
    'salaries than those who sleep six or fewer hours. The researcher claimed that adequate sleep directly enhances '
    'professional productivity, leading to promotions and pay raises. Which finding, if true, most seriously '
    'undermines this claim?',
    'Individuals in secure, high-paying executive positions have greater job autonomy and financial security, enabling '
    'them to afford eight hours of uninterrupted sleep.',
    'Shift workers in manufacturing plants earn hourly wages rather than annual salaries.',
    'Sleep deprivation is known to elevate daytime cortisol concentrations in laboratory subjects.',
    'The study tracked five thousand adults over an eight-year longitudinal monitoring period.',
    '削弱題（因果倒置）：研究人員宣稱『睡飽八小時帶來高薪晉升』。若身居高位、拿高薪的企業高管享有極高工作自主權與財務無憂保障，因而能夠從容享受八小時不受打擾的優質睡眠，說明是『高薪職位賦予了睡眠條件』，因果倒置！',
    '高薪職權賦予充裕睡眠之反向因果削弱。',
    'deprivation',
    '/ˌdep.rəˈveɪ.ʃən/',
    '剝奪缺乏損失',
    'autonomy',
    '/ɑːˈtɑː.nə.mi/',
    '自主權自治獨立性')]),
 ('Strengthen the Argument: Ruling Out Counter-Hypotheses',
  '批判推理',
  'C2-GMAT05',
  [('A pharmaceutical laboratory developed a synthetic monoclonal antibody designed to neutralize the venom of the '
    'deadly inland taipan. In murine models, mice injected with the antibody exhibited a ninety percent survival rate, '
    'compared to zero percent in the control group. The lead scientist asserted that the antibody binds specifically '
    "to the lethal neurotoxin. Which of the following, if true, most strongly supports the scientist's assertion?",
    'Mice injected with an identical dosage of the antibody but not exposed to the venom experienced zero adverse '
    'physiological effects or behavioral anomalies.',
    'The inland taipan is native exclusively to the arid interior river basins of eastern Australia.',
    'Murine biological models possess renal filtration systems structurally similar to human kidneys.',
    'The synthesis of monoclonal antibodies requires advanced recombinant bioreactor fermentation technology.',
    '加強題（排除反假設/證明特異安全性）：科學家斷言該抗體特異性結合致命神經毒素。若未注射蛇毒的對照組小鼠注射相同劑量抗體後，完全未發生任何不良反應，證明該抗體本身無毒且專一，有力支持了其專一中和毒素的結論！',
    'GMAT 核心加強手段：排除潛在反面混雜假設 (Ruling out Alternative Confounders)。',
    'taipan',
    '/ˈtaɪ.pæn/',
    '太攀蛇大班蛇',
    'murine',
    '/ˈmjʊr.aɪn/',
    '鼠科的鼠類的'),
   ('A municipal transit authority converted half of its diesel bus fleet to fully electric battery power, noting that '
    'municipal airborne particulate matter dropped by twelve percent over the year. Environmental officials concluded '
    'that replacing diesel buses with electric models directly improved city air quality. Which of the following, if '
    "true, most strengthens the officials' conclusion?",
    'Industrial manufacturing emissions and prevailing regional weather patterns affecting pollution dispersal '
    'remained completely stable across the year.',
    'Electric buses require recharging infrastructure that draws electricity from the regional grid.',
    'The initial capital purchase price of electric buses is thirty percent higher than clean diesel models.',
    'Bus passengers reported that electric vehicles provided a significantly quieter commuter ride.',
    '加強題（排除外生環境他因）：官員認為電動公車改善了空氣。若全區工業排放與影響污染擴散的大氣氣象條件全年度維持絕對穩定，排除了天氣幫忙或工廠停工等外生干擾，極大加強了是電動公車促成空品改善的結論！',
    '控制外部變數穩定 (Holding Confounders Constant) 加強因果結論。',
    'particulate',
    '/pɑːrˈtɪk.jə.lət/',
    '微粒顆粒狀的',
    'dispersal',
    '/dɪˈspɝː.səl/',
    '擴散分散散佈'),
   ('An online apparel retailer introduced augmented reality (AR) virtual fitting rooms on its mobile app, and the '
    'merchandise return rate plummeted by twenty-two percent. Management claimed that the AR feature allowed consumers '
    'to accurately visualize garment sizing and drape, directly reducing misfit returns. Which of the following, if '
    "true, provides the strongest support for management's claim?",
    'Customer returns citing incorrect sizing or poor aesthetic fit dropped precipitously, while returns citing '
    'damaged goods remained constant.',
    'The retailer expanded its product catalog by introducing three hundred new casual clothing items.',
    'Competitor apparel brands reported return rates consistent with industry historical averages.',
    'The mobile application was downloaded by over two million smartphone users within sixty days.',
    '加強題（分類數據精準支持）：管理層宣稱AR試衣減少了尺碼不合退貨。若退貨原因中，因『尺碼錯誤或上身效果不佳』的退貨急遽暴跌，而因『商品瑕疵破損』的退貨維持不變，這種特異性的分類數據提供了最無懈可擊的強力支持！',
    '特異性分類驗證 (Subcategory Evidence) 強力加強因果機制。',
    'augmented reality',
    '/ɑːɡˌmen.t̬ɪd riˈæl.ə.t̬i/',
    '擴增實境',
    'drape',
    '/dreɪp/',
    '懸垂懸垂效果垂褶'),
   ('A regional commercial bank installed algorithmic fraud detection software that scrutinizes wire transfers in real '
    'time, and unauthorized credit transactions dropped by eighty percent. The chief risk officer concluded that the '
    'software successfully intercepts fraudulent transfers before execution. Which finding, if true, most strongly '
    'reinforces this conclusion?',
    'The bank did not concurrently tighten customer credit limits or introduce mandatory multi-factor authentication '
    'procedures.',
    'The software algorithm was developed by an Israeli cybersecurity startup founded by intelligence veterans.',
    "Commercial wire transfers account for sixty percent of the bank's annual transaction volume.",
    "Customers surveyed praised the bank's customer service helpline responsiveness.",
    '加強題（排除同時推行的其他資安措施）：風控長認定是新演算法攔截了欺詐。若銀行在同一時期並未收緊信用額度，亦未強制導入雙重驗證等多因素認證，排除了其他資安手段干擾，強烈加強了新軟體的單一防護成效！',
    '排除同時推行其他防護措施 (No Concurrent Interventions) 強化結論。',
    'wire transfer',
    '/ˈwaɪr ˌtræns.fɝː/',
    '電匯銀行轉帳',
    'intercept',
    '/ˌɪn.t̬ɚˈsept/',
    '攔截截獲截擊'),
   ('An archaeological excavation at a coastal site unearthed hearths containing burnt bones of pelagic fish dated to '
    '40,000 BCE. The archaeologist concluded that early humans in this region possessed seafaring watercraft capable '
    "of offshore deep-water fishing. Which of the following, if true, most strongly supports the archaeologist's "
    'conclusion?',
    'The specific pelagic fish species identified can only be captured in open ocean waters exceeding depths of two '
    'hundred meters and cannot be caught from the shoreline.',
    'The coastal site also contained fossilized shells of shallow-water intertidal mollusks.',
    'Archaeologists recovered obsidian flakes that had been fashioned into scrapers and projectile points.',
    'The average global sea level during 40,000 BCE was over one hundred meters lower than today.',
    '加強題（排除淺水近岸捕獲之反假設）：考古學家推斷古人類擁有深海航海船隻。若出土的遠洋魚類物種『唯有在水深兩百米以上的開闊大洋才能捕獲，絕不可能在海岸邊釣到』，排除了在岸邊撿拾死魚或涉水捕撈的可能，決定性加強了必須搭船出海的結論！',
    '排除淺水海岸捕獲可能，鐵證支持遠洋航行技能。',
    'pelagic',
    '/pəˈlædʒ.ɪk/',
    '遠洋的浮游的大洋深海的',
    'watercraft',
    '/ˈwɑː.t̬ɚ.kræft/',
    '水上船隻船艇'),
   ("A metropolitan hospital instituted a mandatory thirty-second pre-procedural 'surgical pause' for operating teams "
    'to verify patient identity and surgical site, resulting in zero wrong-site surgical errors over three years. '
    'Hospital administrators concluded that the checklist pause effectively eliminates site-identification errors. '
    'Which finding, if true, most strongly bolsters this claim?',
    'The surgical team volume and the total annual number of complex surgical procedures performed remained steady '
    'over the three-year trial.',
    'Surgical pauses were timed using an electronic countdown clock mounted on the operating room wall.',
    "The hospital was awarded an 'A' safety rating by an independent national healthcare watchdog.",
    'Surgeons who participated in the trial had an average of fifteen years of clinical experience.',
    '加強題（排除手術量下降等偽因）：管理層宣稱手術暫停確認清單消除了開錯部位事故。若這三年期間醫院執行的複雜手術總量維持穩定高水準（排除了手術量大減導致事故概率下降的可能），加強了清單機制的實效性！',
    '手術總量穩定排除基數縮減之偽因。',
    'checklist',
    '/ˈtʃek.lɪst/',
    '核對清單檢查表',
    'bolster',
    '/ˈboʊl.stɚ/',
    '加強支持增強鞏固'),
   ('A municipal water board replaced iron pipes with cross-linked polyethylene tubing across five districts, and '
    'instances of bacterial biofilm contamination dropped to zero. The director asserted that polyethylene tubing '
    "inhibits bacterial adhesion. Which finding, if true, provides the strongest support for the director's assertion?",
    'Laboratory tests confirm that bacteria cannot adhere to the smooth inner molecular surface of polyethylene tubing '
    'under typical municipal water flow pressures.',
    'Polyethylene tubing costs forty percent less to install per linear foot than copper piping.',
    'The five municipal districts evaluated contain a combined residential population of two hundred thousand.',
    'The municipal water supply originates from a pristine mountain reservoir.',
    '加強題（實驗室微觀機理解釋支持）：局長宣稱聚乙烯管道抑制了細菌黏附。若實驗室獨立測試證實細菌在標準水流壓力下根本無法黏附在聚乙烯管道平滑的內表面，從微觀分子層面證實了抑制機理，極大加強了結論！',
    '實驗室機理實證 (Direct Mechanism Verification) 加強論點。',
    'biofilm',
    '/ˈbaɪ.oʊ.fɪlm/',
    '生物膜生物薄膜',
    'polyethylene',
    '/ˌpɑː.liˈeθ.əl.iːn/',
    '聚乙烯'),
   ('A tech hardware manufacturer switched from solder paste to conductive silver adhesive in assembling circuit '
    'boards, and vibration-induced board failures dropped by ninety percent. The chief engineer concluded that silver '
    "adhesive provides superior mechanical damping. What finding, if true, most strongly supports the engineer's "
    'conclusion?',
    'Accelerated mechanical vibration shake-table testing conducted under controlled laboratory conditions verified '
    'that silver adhesive absorbs vibration energy far more effectively than solder alloy.',
    'Conductive silver adhesive cures within twenty minutes when exposed to ultraviolet radiation.',
    'Circuit boards assembled using the silver adhesive were installed in commercial satellite guidance systems.',
    'The cost of silver adhesive fluctuated with global precious metal commodity markets.',
    '加強題（實驗室受控震動台驗證）：工程師認定銀膠提供更優越的機械阻尼減震。若在實驗室受控條件下的加速振動搖床測試證實，銀膠吸收振動能量的效率遠高於焊料合金，提供了最直接的科學實驗支持！',
    '實驗室搖床測試直接證實減震機理。',
    'damping',
    '/ˈdæm.pɪŋ/',
    '阻尼減震衰減',
    'solder',
    '/ˈsɑː.dɚ/',
    '焊料焊錫銲接'),
   ('A wildlife sanctuary planted buffer zones of prickly unpalatable vegetation around elephant habitats, and '
    'human-elephant agricultural conflicts dropped by seventy percent. Conservationists claimed that the barrier '
    'vegetation effectively redirected elephant foraging corridors away from village crops. Which finding, if true, '
    'most reinforces this claim?',
    'GPS collar tracking data demonstrated that elephant herds consistently diverted their movements along the '
    'perimeter of the buffer vegetation and did not traverse it.',
    'Prickly buffer vegetation can be harvested by local villagers to produce medicinal herbal extracts.',
    'Elephant populations within the sanctuary grew by five percent over the duration of the project.',
    'Villagers were compensated financially by conservation organizations for previous crop damages.',
    '加強題（GPS 實測軌跡排除跳過圍欄）：環保人士宣稱刺灌木隔離帶成功引導大象轉向避開農田。若 GPS 項圈即時追蹤軌跡證實，象群在遭遇隔離帶邊界時確實主動繞道轉向且從未強行穿透，以硬核物證直接加強了隔離導流假說！',
    'GPS 實測移動軌跡 (Direct Tracking Data) 強烈支持。',
    'sanctuary',
    '/ˈsæŋk.tʃu.er.i/',
    '保護區避難所聖所',
    'perimeter',
    '/pəˈrɪm.ə.t̬ɚ/',
    '周邊周長周線邊緣'),
   ('A corporate call center installed acoustic sound-masking pink noise emitters in its open-plan office, and '
    'employee customer call handling errors dropped by thirty percent. Management inferred that sound-masking improved '
    'conversational privacy and reduced auditory distraction. Which finding, if true, provides the strongest support '
    "for management's inference?",
    'Speech intelligibility acoustic tests demonstrated that surrounding conversational speech became largely '
    'incomprehensible beyond a radius of twelve feet following emitter activation.',
    'Pink noise emitters cost the facility management department five thousand dollars to install.',
    'Employees were allowed to personalize their cubicle decor following the installation of the emitters.',
    'The call center handles billing inquiries for an international telecommunications provider.',
    '加強題（客觀聲學清晰度測試支持）：管理層推斷粉紅噪音掩蔽消除了周遭語音分心。若客觀聲學語言清晰度測試證實，發射器啟用後，超過12英尺以外的周圍談話內容便完全無法聽清辨識，從物理上消除了言語干擾，強力證實推斷！',
    '客觀聲學清晰度測試直接證實干擾消除。',
    'masking',
    '/ˈmæsk.ɪŋ/',
    '掩蔽掩蓋屏蔽',
    'intelligibility',
    '/ɪnˌtel.ə.dʒəˈbɪl.ə.t̬i/',
    '清晰度可理解性可懂度')]),
 ('Strengthen the Argument: Corroborating Data',
  '批判推理',
  'C2-GMAT06',
  [('Paleontologists hypothesized that the extinction of the Australian megafauna 45,000 years ago was primarily '
    'caused by human hunting and fire-stick burning rather than natural climate shifts. Which discovery, if confirmed, '
    'provides the strongest independent corroboration for this hypothesis?',
    'Sediment core records from across Australia show that severe climatic droughts occurred repeatedly over the '
    'preceding two million years without causing any megafaunal extinctions.',
    'Aboriginal rock art depicts stylized ancestral figures holding hunting spears.',
    'Australia was colonized by maritime modern human populations navigating from Southeast Asia.',
    'Fossilized marsupial lion teeth display wear patterns consistent with consuming large herbivores.',
    '加強題（歷史反覆驗證/排除氣候假說）：古生物學家認為是人類狩獵與放火導致澳洲巨型動物滅絕，而非自然乾旱氣候所致。若沉積物岩芯顯示，在過去兩百萬年間曾反覆多次發生過相同程度的極端大乾旱，但從未引發巨型動物滅絕，唯獨人類抵達時滅絕，有力證實了氣候非主因，人類才是元兇！',
    '縱向歷史對比排除自然氣候假說，強烈加強人類獵殺論。',
    'megafauna',
    '/ˌmeɡ.əˈfɑː.nə/',
    '巨型動物群大動物',
    'corroboration',
    '/kəˌrɑː.bəˈreɪ.ʃən/',
    '確證證實佐證'),
   ('An economic historian hypothesized that the invention of the mechanical marine chronometer by John Harrison in '
    'the eighteenth century revolutionized transatlantic trade by slashing navigation shipwreck rates. Which '
    'historical finding provides the most powerful corroboration for this argument?',
    'Maritime insurance registries in London show that merchant shipping premiums dropped by seventy percent '
    'exclusively on vessels equipped with marine chronometers.',
    'John Harrison was awarded a financial monetary prize by the British Board of Longitude.',
    'Scurvy continued to afflict sailors on transatlantic voyages well into the nineteenth century.',
    'Wooden sailing vessels required frequent dry-dock maintenance to eliminate shipworms.',
    '加強題（獨立第三方經濟數據驗證）：歷史學家認為航海鐘透過大幅降低海難率革新了貿易。若倫敦海運保險公會檔案顯示，配備了航海鐘的商船其航運保險費率斷崖式暴跌70%（且僅限配備鐘的船隻），保險公司的真金白銀費率暴跌提供了最具客觀說服力的獨立佐證！',
    '保險費率暴跌 (Third-party Financial Data) 作為硬核獨立佐證。',
    'chronometer',
    '/krəˈnɑː.mə.t̬ɚ/',
    '航海天文鐘計時儀',
    'premium',
    '/ˈpriː.mi.əm/',
    '保險費溢價貼水'),
   ('Epidemiologists hypothesized that the implementation of clean public sanitation infrastructure—rather than '
    'medical pharmaceutical interventions—was the primary driver of the dramatic decline in cholera mortality in '
    'nineteenth-century London. Which historical data set would most strongly corroborate this epidemiological '
    'hypothesis?',
    'Municipal mortality records show that the steepest decline in cholera deaths occurred decades before the '
    'introduction of intravenous saline hydration therapies and antibiotics.',
    'Cholera is caused by the waterborne bacterium *Vibrio cholerae*, which produces severe dehydrating diarrhea.',
    'Dr. John Snow mapped cholera cases in the Soho district during the 1854 Broad Street pump outbreak.',
    'London’s metropolitan sewer network was engineered by Chief Engineer Joseph Bazalgette.',
    '加強題（時序領先獨立佐證）：流行病學家主張是公共衛生管道而非醫藥治療導致霍亂死亡率暴跌。若官方死亡檔案證明，霍亂死亡人數的斷崖式下跌，發生在靜脈輸液生理鹽水與抗生素發明與臨床應用的數十年前，徹底證明醫藥不是功臣，衛生排污才是根本原因！',
    '醫藥發明前數十年死亡率已暴跌之時序鐵證。',
    'sanitation',
    '/ˌsæn.əˈteɪ.ʃən/',
    '公共衛生衛生設施環境衛生',
    'intravenous',
    '/ˌɪn.trəˈviː.nəs/',
    '靜脈內的靜脈注射的'),
   ('Biologists argued that the evolution of bioluminescence in deep-sea anglerfish evolved to lure prey rather than '
    'as a defensive mechanism against predators. Which observation provides the most decisive corroborating evidence '
    'for this predatory hypothesis?',
    'Stomach-content analyses of anglerfish consistently reveal species of prey fish that are known to be strongly '
    'attracted to light sources in laboratory behavioral assays.',
    'Anglerfish reproduce via extreme sexual parasitism, where dwarf males permanently fuse to females.',
    'The light organ of the anglerfish, known as the esca, contains millions of symbiotic bioluminescent bacteria.',
    'Deep-sea hydrothermal vents emit geothermal infrared radiation detectable by specialized crustaceans.',
    '加強題（胃內容物光趨性物證）：生物學家認為鮟鱇魚發光器是為了誘捕獵物而非防禦。若鮟鱇魚胃內容物解剖分析一貫發現，其吞食的魚類在實驗室行為測試中均被證實對光源具有強烈趨光性，直接將發光與捕食成功建立了鐵證鏈條！',
    '胃內容物物種具趨光性直接佐證捕食誘惑假說。',
    'anglerfish',
    '/ˈæŋ.ɡlɚ.fɪʃ/',
    '鮟鱇魚琵琶魚',
    'bioluminescence',
    '/ˌbaɪ.oʊˌluː.məˈnes.əns/',
    '生物發光生物冷光'),
   ('An investment fund claimed that algorithmic trading strategies exploiting microsecond price discrepancies across '
    'geographically separated financial exchanges generate consistent alpha without market risk. Which finding '
    'provides the strongest empirical corroboration for this claim?',
    'The fund generated consistent daily trading profits on over ninety-nine percent of trading days across five '
    'consecutive years, regardless of whether broader equity indices rallied or crashed.',
    'The algorithmic trading servers are connected via high-speed transoceanic fiber-optic communications conduits.',
    'High-frequency algorithmic trading represents over fifty percent of all daily US equity market trading volume.',
    'The investment fund employs thirty quantitative mathematicians with PhDs in theoretical physics.',
    '加強題（穿越牛熊獨立數據佐證）：投資基金聲稱微秒套利能在毫無市場風險下賺取超額收益。若該基金在長達五年的所有交易日中，超過99%的天數均實現穩定獲利，且無論大盤牛市暴漲或股災暴跌皆然，穿越牛熊的日常勝率提供了最震撼的實證佐證！',
    '跨越五年無論牛熊99%勝率證實零市場風險假說。',
    'discrepancy',
    '/dɪˈskrep.ən.si/',
    '出入不符差異不一致',
    'alpha',
    '/ˈæl.fə/',
    '阿爾法超額收益超額報酬'),
   ('An art historian asserted that a previously unattributed Renaissance portrait was painted personally by Leonardo '
    'da Vinci rather than one of his workshop apprentices. Which forensic discovery provides the most powerful '
    'corroboration for this attribution?',
    'High-resolution multispectral scanning confirmed the presence of a left-handed palm-smear sfumato fingerprint on '
    "the canvas that matches da Vinci’s authenticated prints on *Ginevra de' Benci*.",
    'The portrait depicts an Italian noblewoman wearing a silk velvet dress embroidered with floral motifs.',
    'Da Vinci spent several months in Milan during the exact period to which the portrait is chronologically dated.',
    'The wooden poplar panel upon which the portrait is painted was sourced from trees grown in northern Tuscany.',
    '加強題（不可偽造之法醫生物指紋）：藝術史家認定該畫為達文西親筆真跡而非學徒代筆。若多光譜掃描在畫布漸層暈塗中確認發現了左撇子手掌塗抹指紋，且該指紋與達文西已被公認權威認證的名作上的指紋完全一致，這是任何學徒無法仿造的獨一無二生物法醫鐵證！',
    '已認證的達文西獨特左撇子掌紋法醫佐證。',
    'unattributed',
    '/ˌʌn.əˈtrɪb.juː.t̬ɪd/',
    '未歸屬的未確定作者的',
    'sfumato',
    '/sfuːˈmɑː.toʊ/',
    '暈塗法漸層暈色法'),
   ('A cognitive scientist hypothesized that dreaming functions primarily to consolidate newly learned procedural '
    'motor skills into long-term memory. Which experimental finding provides the strongest independent corroboration '
    'for this hypothesis?',
    'Subjects instructed to master a complex physical juggling routine who entered uninterrupted rapid-eye-movement '
    '(REM) sleep showed a forty percent performance gain the next morning, whereas subjects deprived of REM sleep '
    'showed zero gain.',
    'Brain wave recordings during non-REM sleep are characterized by slow-wave delta activity and sleep spindles.',
    'Dreams reported during waking from non-REM sleep contain fewer vivid sensory narratives than REM dreams.',
    'The human sleep architecture consists of repeating ninety-minute ultradian cycles throughout the night.',
    '加強題（REM 睡眠剝奪對照實驗佐證）：認知學家認為做夢功能在於鞏固運動記憶。若練習雜耍拋球的受試者在經歷完整 REM 做夢睡眠後表現暴增40%，而故意剝奪 REM '
    '做夢睡眠的對照組表現毫無提升，決定性證實做夢對運動技能鞏固的不可或缺性！',
    '做夢睡眠剝奪對照實驗提供獨立因果佐證。',
    'consolidate',
    '/kənˈsɑː.lə.deɪt/',
    '鞏固加強整合聯合',
    'procedural',
    '/prəˈsiː.dʒɚ.əl/',
    '程序的程序性的操作上的'),
   ('An atmospheric chemist argued that sulfur dioxide emissions from the 1991 Mount Pinatubo volcanic eruption '
    'lowered global surface temperatures by 0.5 degrees Celsius for two years. Which finding most directly '
    'corroborates this chemical thesis?',
    'Global climate model simulations that isolate the precise stratospheric optical depth of Pinatubo’s sulfate '
    'aerosol veil match the observed two-year planetary cooling curve with ninety-eight percent statistical accuracy.',
    'Mount Pinatubo ejected an estimated ten cubic kilometers of tephra and ash into the atmosphere.',
    'Satellite instrumentation measured ash clouds spreading westward across the Indian Ocean.',
    'The eruption forced the evacuation of tens of thousands of residents from surrounding municipalities.',
    '加強題（氣候模型分離純硫酸鹽層精準擬合）：化學家認為皮納圖博火山排放的二氧化硫使全球降溫0.5度。若氣候模擬在精確分離平流層硫酸鹽氣溶膠光學厚度後，其模擬降溫曲線與全球實際觀測到的兩年冷卻數據契合度高達98%，提供了嚴密的科學模型計算佐證！',
    '氣候模型光學厚度分離模擬契合度達98%。',
    'stratospheric',
    '/ˌstræt̬.əˈsfɪr.ɪk/',
    '平流層的同溫層的',
    'aerosol',
    '/ˈer.ə.sɑːl/',
    '氣溶膠浮質氣霧'),
   ('An economic researcher claimed that microfinance loans in developing villages generate substantial net household '
    'income growth only when disbursed directly to female borrowers rather than male household heads. Which empirical '
    'study provides the strongest corroboration for this claim?',
    'A multi-year randomized controlled trial showed that women invested ninety percent of loan revenues into '
    'revenue-generating livestock and inventory, whereas male borrowers diverted forty percent of funds to personal '
    'leisure consumption.',
    'Microfinance interest rates are typically higher than rates offered by commercial urban banks.',
    'Over eighty percent of microfinance institutions globally utilize group-lending peer accountability frameworks.',
    'The average size of an initial microfinance loan in rural agricultural districts is under two hundred dollars.',
    '加強題（隨機對照試驗資金流向鐵證）：研究者主張微型貸款唯有直接發給女性才能創造家庭淨增長。若多年隨機對照試驗(RCT)揭示，女性將90%貸款投入生產性家禽牲畜與存貨，而男性借款人將40%資金挪用作個人娛樂消費，直接用真實資金分配數據證實了該核心假說！',
    'RCT 實測女性將90%資金投入生產性資產。',
    'microfinance',
    '/ˌmaɪ.kroʊˈfaɪ.næns/',
    '微型金融小額貸款',
    'disburse',
    '/dɪsˈbɝːs/',
    '支付撥款付出'),
   ('A linguist hypothesized that the unique click consonants of the southern African Khoisan languages represent the '
    'most archaic phonological features of human speech, preserved since the origin of Homo sapiens. What genetic '
    'discovery provides the strongest corroborating evidence for this linguistic hypothesis?',
    'Human genomic mapping establishes that populations speaking indigenous Khoisan languages with click consonants '
    'carry the deepest, most ancestral mitochondrial and Y-chromosome genetic divergence among all living human '
    'populations.',
    'Khoisan languages utilize five distinct click consonants produced through specialized tongue suction.',
    'Rock engravings across southern Africa depict hunter-gatherer bands from the Middle Stone Age.',
    'Click consonants do not exist in the indigenous languages of the Australian continent.',
    '加強題（人類基因譜系最古老分支獨立印證）：語言學家推斷科伊桑語的喀噠吸氣音代表人類最古老的原始語音。若人類全基因組圖譜獨立證實，操科伊桑語的群體在全人類現存人口中擁有最古老、最深層的粒線體與 Y '
    '染色體基因分歧點，語言古老性與基因古老性完美交匯重合，提供了頂級佐證！',
    '科伊桑人群具備人類全基因組最古老深層分支。',
    'Khoisan',
    '/ˈkɔɪ.sɑːn/',
    '科伊桑人科伊桑語族',
    'consonant',
    '/ˈkɑːn.sə.nənt/',
    '子音子音字母輔音')]),
 ('Evaluate the Argument: Decisive Variables',
  '批判推理',
  'C2-GMAT07',
  [('A municipal government plans to subsidize home solar panel installations by fifty percent, asserting that this '
    "initiative will substantially reduce fossil-fuel reliance on the city's coal-fired electrical grid. Which of the "
    'following would be most useful to determine in evaluating whether the subsidy will achieve its objective?',
    'Whether residents who install solar panels will significantly increase their total electricity consumption due to '
    'perceived zero marginal cost of power.',
    'Whether neighboring suburban municipalities also offer solar panel purchase subsidies.',
    'Whether solar panel silicon photovoltaic cells are manufactured domestically or imported.',
    'Whether coal miners in the regional electrical utility are unionized.',
    '評價題（雙向檢驗法）：市府計畫補助50%裝太陽能以減少對燃煤電網的依賴。若居民裝了太陽能後，因為覺得電不要錢而報復性暴增用電量（反彈效應），若用電暴增（Yes），煤炭發電量根本減不下來；若用電未增（No），則有效減煤。此問題的答案對結論具有決定性的雙向判定效力！',
    'GMAT 核心評價方法：雙向檢驗法 (Two-Way Test)。',
    'subsidize',
    '/ˈsʌb.sə.daɪz/',
    '補貼資助給…津貼',
    'marginal',
    '/ˈmɑːr.dʒɪ.nəl/',
    '邊際的微小的邊緣的'),
   ('A commercial bakery plans to replace butter with hydrogenated palm oil in its pastry recipe, calculating that '
    'this alteration will reduce production ingredient costs by twenty percent while preserving pastry texture. Which '
    'of the following would be most critical to know in evaluating the financial viability of this strategy?',
    'Whether a significant proportion of the bakery’s loyal customer base will cease purchasing pastries if the '
    'ingredient shift impairs flavor or perceived healthiness.',
    'Whether hydrogenated palm oil requires refrigerated storage facilities identical to dairy butter.',
    'Whether the price of refined white flour is projected to fluctuate over the upcoming calendar year.',
    'Whether competing artisanal bakeries utilize unpasteurized dairy cream in their cakes.',
    '評價題（顧客流失對沖成本節約）：麵包店打算換人造棕櫚油省20%原料成本。最關鍵需評估的是：老顧客是否會因為口感變差或覺得不健康而憤而拒買！若顧客大規模拒買（Yes），收入暴跌超過20%，策略虧損失敗；若顧客照買不誤（No），策略成功省錢。答案具有決定性分水嶺效應！',
    '顧客拒買流失率決定成本節省是否具商業可行性。',
    'viability',
    '/ˌvaɪ.əˈbɪl.ə.t̬i/',
    '可行性存活能力生存力',
    'hydrogenated',
    '/haɪˈdrɑː.dʒə.neɪ.t̬ɪd/',
    '氫化的加氫的'),
   ('A streaming media company plans to crack down on password sharing across households, predicting that this '
    'enforcement will convert forty percent of unauthorized viewers into paying subscribers, thereby dramatically '
    'boosting overall subscription revenue. Which of the following inquiries would be most decisive in evaluating the '
    "company's projection?",
    'Whether unauthorized users who lose access will simply abandon the streaming platform entirely rather than '
    'purchasing individual paid subscriptions.',
    'Whether the streaming platform produces more original drama series than original documentary films.',
    'Whether the engineering team can deploy the password detection algorithm without server downtime.',
    'Whether competing streaming networks license their archived film libraries to broadcast television.',
    '評價題（流失轉化雙向評估）：串流平台欲封殺共享密碼，預期有40%白嫖用戶會轉化為付費訂閱戶。最決定性的評估是：這些被封鎖的未授權用戶究竟是會乾脆徹底棄用轉身離開，還是乖乖掏錢訂閱？若是前者（Yes），轉化率掛零且招致罵名；若是後者（No），收入暴增。',
    '用戶流失 vs 購買訂閱之抉擇決定收益預測。',
    'enforcement',
    '/ɪnˈfɔːrs.mənt/',
    '執法執行落實強制',
    'unauthorized',
    '/ʌnˈɑː.θɚ.aɪzd/',
    '未授權的未經許可的'),
   ('A metropolitan police department intends to equip all patrol officers with body-worn cameras, asserting that the '
    'presence of recording devices will dramatically reduce instances of excessive police force. Which question would '
    'be most helpful in evaluating the efficacy of this policy?',
    'Whether officers equipped with cameras will face mandatory legal penalties if they deliberately deactivate or '
    'obscure the recording lens during confrontational encounters.',
    'Whether body-worn cameras utilize rechargeable lithium-ion battery packs or disposable cells.',
    'Whether the police union supported the initial purchase tender for the recording devices.',
    'Whether neighboring county sheriffs’ departments utilize drone surveillance in hostage standoffs.',
    '評價題（是否能擅自關閉鏡頭）：市警局擬普及密錄器以遏止執法過當。最關鍵需評估：當警察在爆發暴力衝突時若刻意關閉或遮蔽鏡頭，是否會面臨強制性的法律嚴厲懲罰？若不會受罰（No），警察出事時直接關機，密錄器形同虛設；若強制重罰（Yes），則真正起到嚇阻約束效力！',
    '違規關閉鏡頭之法定懲戒為密錄器實效之命門。',
    'excessive',
    '/ekˈses.ɪv/',
    '過度的過分的極度的',
    'deactivate',
    '/diːˈæk.tə.veɪt/',
    '停用使無效關閉'),
   ('An agricultural corporation developed a genetically engineered corn hybrid that secretes a natural organic '
    'insecticide, claiming that farmers adopting this seed will eliminate their expenditures on chemical spray '
    "insecticides. Which of the following would be most important to determine in evaluating the corporation's claim?",
    'Whether target insect pests will rapidly evolve physiological resistance to the plant-secreted insecticide within '
    'two to three growing seasons.',
    'Whether the genetically engineered corn stalks grow six inches taller than traditional non-GMO corn.',
    'Whether European regulatory agencies permit the importation of the engineered corn harvest.',
    'Whether the seed corporation holds patent protection on the genetic sequencing vectors.',
    '評價題（害蟲抗藥性演化）：公司宣稱抗蟲轉基因玉米能讓農民徹底免除農藥噴灑支出。最關鍵在於：目標害蟲是否會在兩至三季內迅速演化出抗藥性？若害蟲快速演化出抗藥性（Yes），農民被迫重新大面積噴灑農藥，宣稱破產；若不產生抗藥性（No），則確實能省下農藥費！',
    '害蟲抗藥性演化速度決定農藥支出是否被徹底消除。',
    'insecticide',
    '/ɪnˈsek.tə.saɪd/',
    '殺蟲劑殺蟲藥',
    'secrete',
    '/sɪˈkriːt/',
    '分泌藏匿隱匿'),
   ('A fast-food restaurant chain plans to install automated self-ordering touch kiosks in all franchises, calculating '
    'that eliminating frontline cashier positions will slash overall store labor costs by thirty percent. Which '
    'inquiry would be most vital in evaluating the anticipated labor savings?',
    'Whether the stores will need to hire high-wage technical support staff and specialized customer-service hosts to '
    'assist confused patrons with kiosk errors.',
    'Whether the touchscreen kiosks are illuminated by energy-efficient LED display panels.',
    'Whether the restaurant chain offers plant-based vegetarian burger alternatives on its menu.',
    'Whether competing burger chains introduced mobile app drive-thru pickup lanes.',
    '評價題（新聘高薪技術員抵消工資節約）：快餐店裁撤收銀員改用自助點餐機，號稱省30%人工。最關鍵需釐清：門市是否需要額外聘用高薪技術工程師和專門客服人員來隨時排除點餐機故障和指引困惑顧客？若必須聘請高薪技術人員（Yes），節省的基層工資全被高薪人員吃掉，根本省不下錢！',
    '維護高薪技術人力是否抵消收銀員裁撤節餘。',
    'kiosk',
    '/ˈkiː.ɑːsk/',
    '售貨亭自助服務機點餐機',
    'patron',
    '/ˈpeɪ.trən/',
    '顧客贊助人老主顧'),
   ('A national health ministry considers imposing a twenty percent excise tax on sugar-sweetened beverages, '
    "projecting that this policy will substantially curb municipal obesity rates. In evaluating the ministry's "
    'projection, it would be most useful to determine which of the following?',
    'Whether consumers will offset their reduced sugary soda intake by purchasing equally caloric untaxed substitute '
    'beverages, such as fruit juices or sweetened coffees.',
    'Whether soft drink bottling manufacturers employ unionized transport logistics drivers.',
    'Whether sugar cane farmers receive federal agricultural price-support subsidies.',
    'Whether artificial non-caloric sweeteners leave a metallic aftertaste on the palate.',
    '評價題（熱量替代品抵消）：衛生部擬對含糖飲料課徵20%消費稅以遏制肥胖。最關鍵是：消費者是否會轉向購買未課稅但熱量同樣爆表的替代品（ '
    '例如轉買果汁或加糖咖啡）？若會轉移熱量攝取（Yes），總熱量不變，肥胖率根本降不下來；若不會（No），則有效減肥！',
    '替代高熱量飲品是否導致熱量補償效應 (Caloric Substitution)。',
    'beverage',
    '/ˈbev.ɚ.ɪdʒ/',
    '飲料',
    'caloric',
    '/kəˈlɔːr.ɪk/',
    '熱量的卡路里的'),
   ('A car rental corporation plans to convert its entire fleet to electric vehicles (EVs), predicting that fuel '
    'savings and reduced maintenance will increase annual operating margins. Which question is most decisive in '
    'evaluating the financial viability of this fleet transition?',
    'Whether customers who rent cars for long-distance regional road trips will avoid renting EVs due to range anxiety '
    'and scarce highway charging infrastructure.',
    'Whether electric vehicle batteries can be recycled at the end of their operational lifecycle.',
    'Whether corporate car rental loyalty program members prefer luxury sedans over compact SUVs.',
    'Whether rental branch offices are located adjacent to international airport passenger terminals.',
    '評價題（續航焦慮導致租車顧客流失）：租車公司擬全換電動車省油錢。最關鍵在於：長途公路自駕租車的廣大客戶，是否會因為里程焦慮和高速公路充電樁稀缺而徹底拒租電動車？若顧客因續航焦慮拒租（Yes），訂單斷崖式暴跌，財務崩潰；若顧客不在意（No），則省油提升利潤！',
    '長途公路旅行客戶之續航焦慮與拒租率是成敗核心。',
    'margin',
    '/ˈmɑːr.dʒɪn/',
    '利潤率邊界餘裕',
    'anxiety',
    '/æŋˈzaɪ.ə.t̬i/',
    '焦慮不安擔憂'),
   ('A public university plans to eliminate physical textbook requirements and switch exclusively to open-access '
    'digital e-books, arguing that this policy will substantially lower the total cost of higher education for '
    'undergraduates. In evaluating the proposed policy, it would be most important to investigate which of the '
    'following?',
    'Whether software licensing fees and mandatory digital platform access codes will cost students an amount '
    'comparable to or exceeding traditional physical textbooks.',
    "Whether university libraries archive digital copies of historical master's theses.",
    'Whether students prefer highlighting physical textbook pages with fluorescent markers.',
    'Whether tenure-track professors are granted sabbatical leaves to author academic monographs.',
    '評價題（平台授權費變相剝削）：大學宣稱取消紙本教材改用電子書能大幅降低學生開銷。最關鍵需調查：數位平台存取授權代碼與軟體授權費，其價格是否等同甚至超過了傳統二手紙本書？若數位平台授權碼比紙本書更貴（Yes），學生負擔反而加重；若很便宜（No），則真能省錢！',
    '數位平台強制存取授權費是否變相推高教育成本。',
    'undergraduate',
    '/ˌʌn.dɚˈɡrædʒ.u.ət/',
    '大學生大學本科生',
    'licensing',
    '/ˈlaɪ.sən.sɪŋ/',
    '許可授權發給許可證'),
   ('A city council plans to ban single-use plastic grocery bags and mandate reusable heavy-duty tote bags, projecting '
    "that this regulation will dramatically decrease the city's overall solid landfill waste. Which of the following "
    "inquiries is most critical in evaluating the council's projection?",
    'Whether the manufacturing energy and material mass of reusable tote bags requires hundreds of uses before '
    'offsetting the environmental footprint of discarded thin plastic bags.',
    'Whether local supermarkets print promotional weekly discount coupons on recycled paper.',
    'Whether plastic bags are composed of low-density polyethylene or high-density polymers.',
    'Whether municipal landfill incinerators operate below regulatory emission standards.',
    '評價題（棉布提袋全生命週期碳足跡與材質抵消）：市府擬禁用一次性塑膠袋強推重複使用提袋以減少固體廢棄物。最關鍵需探究：重複使用提袋的生產能耗與材料質量是否需要重複使用數百次才能抵消其環境足跡，且市民是否會頻繁丟棄棉布提袋？若市民只用幾次就扔（Yes），垃圾質量反而激增；若重複用數百次（No），則真正環保！',
    '全生命週期能耗與使用次數門檻決定環保政策實效。',
    'landfill',
    '/ˈlænd.fɪl/',
    '垃圾掩埋場垃圾堆填區',
    'tote bag',
    '/ˈtoʊt ˌbæɡ/',
    '托特包大提袋布提袋')]),
 ('Resolve the Paradox: Business Contradictions',
  '批判推理',
  'C2-GMAT08',
  [('Paradox: Over the past five years, a luxury wristwatch manufacturer increased its retail prices by forty percent '
    'across all flagship product lines, yet total units sold and market share increased dramatically rather than '
    'declining. Which of the following, if true, best resolves this apparent economic paradox?',
    'In the luxury goods sector, consumers perceive exorbitant prices as a definitive signal of elite social prestige, '
    'transforming the watches into highly coveted Veblen goods.',
    'The manufacturer outsourced its mechanical movement assembly to a state-of-the-art facility in Switzerland.',
    'The global production of stainless steel remained constant across the identical five-year period.',
    'Competitor brands of quartz watches lowered their retail prices by fifteen percent.',
    '解釋矛盾題：手錶暴漲40%，銷量反而激增。解析：在奢侈品領域，消費者將昂貴價格視為極致社會地位的象徵，使其演變成為越貴越買的韋伯倫商品(Veblen Goods)，完美調和了提價與銷量暴增的經濟學悖論！',
    'GMAT 核心解釋矛盾：尋找調和雙方事實之機制 (Veblen Good Phenomenon)。',
    'coveted',
    '/ˈkʌv.ə.t̬ɪd/',
    '令人垂涎的夢寐以求的',
    'exorbitant',
    '/ɪɡˈzɔːr.bə.t̬ənt/',
    '過高的過分的昂貴的'),
   ('Paradox: A regional highway safety board raised the maximum speed limit on a rural interstate from 65 to 75 miles '
    'per hour, yet the total number of vehicular collisions and traffic fatalities on that corridor decreased '
    'significantly over the subsequent year. Which of the following, if true, best explains this unexpected outcome?',
    'The higher speed limit significantly reduced driver speed variance by bringing legal limits in line with actual '
    'driving speeds, thereby eliminating hazardous tailgating and erratic overtaking maneuvers.',
    'The highway corridor connects two agricultural towns with populations of fewer than twenty thousand residents.',
    'Highway patrol officers issued twenty percent more speeding citations in the first month following the change.',
    'The price of regular unleaded gasoline increased by fifteen cents per gallon over the year.',
    '解釋矛盾題：限速從65拉高至75英里，車禍與死亡率反而顯著下降。解析：拉高限速消除了不同車輛間的車速方差（慢車與快車速度拉平），消除了頻繁變道超車與追尾等高危駕駛動作，車流更加平穩順暢，從而降低車禍！',
    '消除車速方差 (Speed Variance Reduction) 調和提速降事故之矛盾。',
    'interstate',
    '/ˈɪn.t̬ɚ.steɪt/',
    '州際公路州際的',
    'erratic',
    '/ɪˈræt̬.ɪk/',
    '不穩定的古怪的反覆無常的'),
   ('Paradox: An executive search firm noted that corporations offering unlimited paid time off (PTO) reported that '
    'their employees took fifteen percent fewer vacation days annually than employees at firms with strict, capped PTO '
    'allowances. Which finding, if true, resolves the apparent paradox?',
    'Without explicit formal PTO allowances, employees feared that taking vacations would be interpreted by managers '
    'and peers as a lack of career commitment.',
    'Unlimited PTO policies are predominantly adopted by high-growth software and financial technology startups.',
    'Employees at firms with capped allowances must request vacation approvals at least two weeks in advance.',
    'State labor laws require corporations to pay out unused capped vacation days upon employee termination.',
    '解釋矛盾題：提供無限帶薪休假的企業，員工實際休假天數反而比休假有上限的企業少了15%。解析：在缺乏明確規定天數的情況下，員工唯恐休假會被主管和同事解讀為對工作不夠投入，在心理同儕壓力下反而不敢休假！',
    '缺乏清晰基準引發同儕競爭恐懼，調和無限休假反少休之矛盾。',
    'unlimited',
    '/ʌnˈlɪm.ə.t̬ɪd/',
    '無限的不受限的',
    'allowance',
    '/əˈlaʊ.əns/',
    '額度津貼允許'),
   ('Paradox: A pharmaceutical company introduced an over-the-counter allergy nasal spray that is clinically proven to '
    'be forty percent more effective than its leading competitor, priced it identically, and backed it with an '
    'extensive advertising campaign, yet the new spray captured less than two percent of market share. Which of the '
    'following, if true, most helps to resolve the paradox?',
    'The nasal spray formula contains a harmless preservative that produces an intense, unpleasant burning sensation '
    'in nasal passages immediately upon inhalation.',
    'Allergy symptoms in the target demographic are most severe during early spring tree-pollination cycles.',
    'The competitor allergy spray has been available on pharmacy shelves for over fifteen consecutive years.',
    'Over-the-counter allergy medications are categorized as non-prescription medical devices.',
    '解釋矛盾題：藥品療效好40%、價格相同、廣告鋪天蓋地，市佔率卻不到2%。解析：該噴劑含有一種防腐劑，噴入鼻腔瞬間會引發劇烈難受的灼燒痛感！這種極其惡劣的感官體驗使消費者用一次便終身拒用，完美解釋市佔率低迷！',
    '致命感官副作用 (Severe Burning Sensation) 調和療效佳銷量差矛盾。',
    'nasal',
    '/ˈneɪ.zəl/',
    '鼻的鼻音的',
    'inhalation',
    '/ˌɪn.həˈleɪ.ʃən/',
    '吸入吸氣吸入劑'),
   ('Paradox: A metropolitan public library recorded a thirty percent decline in the total number of physical books '
    'checked out over three years, yet annual in-person patron visits and library operating expenditures reached '
    'all-time record highs. Which of the following, if true, best explains this divergence?',
    'The library transformed its facilities into community learning centers, hosting daily adult literacy classes, '
    'coding bootcamps, and providing free high-speed digital workstations.',
    'The public library system added twenty thousand new physical hardcover titles to its catalog during the period.',
    'Digital e-book downloads through the library’s mobile application increased by five percent annually.',
    'Surrounding suburban municipal libraries faced severe municipal budget cuts that restricted weekend operating '
    'hours.',
    '解釋矛盾題：圖書館實體書借閱量暴跌30%，但實體進館人次與營運支出卻創歷史新高。解析：圖書館轉型為社區學習中心，舉辦成人讀寫班、程式訓練營並提供免費高速數位工作站，人們進館是為了各類活動和數位設備而非借實體書！',
    '圖書館功能全面轉型 (Functional Transformation) 完美化解借書少人次多的矛盾。',
    'divergence',
    '/daɪˈvɝː.dʒəns/',
    '分歧背離分化發散',
    'bootcamp',
    '/ˈbuːt.kæmp/',
    '新兵訓練營密集培訓營'),
   ('Paradox: An organic dairy cooperative increased its milk production capacity by fifty percent and simultaneously '
    'reduced retail prices by ten percent, yet its gross sales revenue from milk plummeted by thirty percent. Which of '
    'the following, if true, best resolves this financial paradox?',
    'The cooperative’s production expansion coincided with a massive nationwide milk surplus that crashed overall '
    'wholesale dairy prices by sixty percent.',
    'Organic milk contains higher concentrations of omega-3 fatty acids than conventional pasteurized milk.',
    'The dairy cooperative distributes its products through regional organic grocery store networks.',
    'Glass milk bottling packaging was replaced with recyclable cardboard cartons to reduce freight costs.',
    '解釋矛盾題：產能提升50%、零售降價10%，總營收卻暴跌30%。解析：合作社擴產時正好碰上全國性牛奶大過剩，導致大宗批發奶價腰斬暴跌60%！批發價的崩盤直接吞噬了所有擴產增幅，導致總收入慘跌！',
    '全國性大宗批發價崩盤徹底解釋收入暴跌矛盾。',
    'cooperative',
    '/koʊˈɑː.pɚ.ə.t̬ɪv/',
    '合作社合作的',
    'surplus',
    '/ˈsɝː.pləs/',
    '過剩盈餘多餘額'),
   ('Paradox: A national airline introduced ultra-spacious business-class suites on transcontinental flights, which '
    'required removing twenty economy-class seats per aircraft, yet total flight profitability increased by eighteen '
    'percent despite the reduction in passenger capacity. Which of the following, if true, best explains this outcome?',
    'Corporate business travelers were willing to pay premium fares for the private suites that generated four times '
    'the revenue of the twenty removed economy seats.',
    'Fuel consumption per passenger mile increased marginally due to the weight of the suite partitions.',
    'Economy-class tickets on transcontinental routes include one free checked luggage allowance.',
    'The airline operates fifteen daily departures along its primary transcontinental hub corridor.',
    '解釋矛盾題：拆掉20個經濟艙座位使總載客量下降，但每班機的總利潤反而暴增18%。解析：商務客願意為豪華私人包廂支付高昂溢價，其產生的票價收入整整是拆掉的20個經濟艙座位的4倍之多！高票價溢價完全彌補並超越了座位損失！',
    '高階包廂超額溢價 (High-Yield Premium) 解釋縮減座位反增利潤矛盾。',
    'suite',
    '/swiːt/',
    '套房套裝組套件',
    'partition',
    '/pɑːrˈtɪʃ.ən/',
    '隔板隔間分割'),
   ('Paradox: A fitness app implemented an aggressive push-notification reminder system designed to encourage daily '
    'workouts, yet user attrition doubled within thirty days of the update. Which of the following, if true, best '
    'resolves this paradox?',
    'Frequent, intrusive push notifications irritated users and induced guilt, prompting a majority of subscribers to '
    'delete the application to eliminate the annoyance.',
    'The fitness application offers customizable workout routines for strength training and cardiovascular exercise.',
    'App store customer ratings for mobile health applications average 4.2 out of five stars.',
    'The update included ten newly recorded high-definition instructional yoga videos.',
    '解釋矛盾題：健身App推出高頻推播提醒用戶運動，用戶流失率卻在30天內暴增一倍。解析：頻繁且侵入性的推播通知極度惹惱了用戶，並引發了沒運動的內疚感，促使大量訂閱者直接卸載刪除App以圖耳根清淨！',
    '過度推播惹惱用戶引發卸載潮，完美化解推播反增流失之矛盾。',
    'attrition',
    '/əˈtrɪʃ.ən/',
    '損耗人員流失磨損消磨',
    'intrusive',
    '/ɪnˈtruː.sɪv/',
    '侵入的打擾的干擾的'),
   ('Paradox: A municipal government constructed sixty miles of new multi-lane expressways to alleviate chronic '
    'morning gridlock, yet average commuter travel times during rush hour actually increased by fifteen minutes two '
    'years after project completion. Which of the following, if true, best explains this unexpected outcome?',
    'The expanded highway capacity induced tens of thousands of suburban motorists who previously commuted via public '
    'commuter rail to switch to driving private automobiles.',
    'The highway construction was completed six months ahead of schedule and three million dollars under budget.',
    'The municipal speed limit on the newly constructed expressway was set at fifty-five miles per hour.',
    'Local property values in residential neighborhoods adjacent to highway exits rose by eight percent.',
    '解釋矛盾題：拓寬60英里高速公路以緩解堵車，兩年後早高峰通勤時間反而增加了15分鐘。解析：這就是交通經濟學著名的『誘導需求效應(Induced '
    'Demand)』：新增的道路容量吸引了成千上萬原本搭乘通勤鐵路的郊區居民改開私家車上路，新增車流迅速填滿並癱瘓了新路！',
    '誘導需求效應 (Induced Demand) 完美調和修路反變堵的交通悖論。',
    'gridlock',
    '/ˈɡrɪd.lɑːk/',
    '交通癱瘓僵局大塞車',
    'induce',
    '/ɪnˈduːs/',
    '誘發引起促使歸納'),
   ('Paradox: A luxury electric vehicle startup manufactured an SUV with acceleration and battery range superior to '
    'every vehicle on the market, yet it received almost zero corporate fleet purchase orders from rental car '
    'agencies. Which of the following, if true, resolves this commercial paradox?',
    'The startup’s proprietary charging architecture is incompatible with public commercial charging stations, and '
    'replacement body panels require months to import for repairs.',
    'The electric SUV interior features vegan leather upholstery and a panoramic tempered glass roof.',
    'Rental car agencies generate sixty percent of their annual revenues from airport terminal locations.',
    'The startup’s CEO frequently appears on national business television broadcasts to discuss renewable energy.',
    '解釋矛盾題：電動SUV性能與續航超越市場所有車款，卻拿不到任何租車公司的車隊採購訂單。解析：該車充電規格與公共充電樁不相容，且維修配件需進口數月，這對講求車輛高周轉率和全美通用充電的租車公司而言是致命硬傷！',
    '充電不相容與維修週期過長調和性能好卻無訂單矛盾。',
    'proprietary',
    '/prəˈpraɪ.ə.ter.i/',
    '專有的專利的獨家的',
    'upholstery',
    '/ʌpˈhoʊl.stɚ.i/',
    '室內裝飾沙發裝飾面料墊料')]),
 ('Boldface: Intermediate Conclusion vs. Evidence',
  '批判推理',
  'C2-GMAT09',
  [("In the argument: 'The municipal government should reject the proposed light rail corridor. **Recent geological "
    'surveys reveal that the tunnel route traverses an unstable subterranean fault line susceptible to sinkholes.** If '
    'extensive subterranean collapses occur during drilling, the financial cost of emergency stabilization will '
    'bankrupt the regional transit authority. Therefore, **constructing the light rail tunnel poses an unacceptable '
    "fiscal risk to the city.**' What is the relationship between the two boldface portions?",
    'The first provides factual evidence supporting an intermediate concern; the second is the main conclusion of the '
    'argument.',
    'The first is the main conclusion; the second provides contextual background information.',
    'Both boldface portions are intermediate conclusions used to support a third unstated thesis.',
    'The first provides evidence supporting a claim that the argument seeks to refute; the second is that refutation.',
    '黑體字題型：第一處黑體字提供地質調查的客觀事實證據；第二處黑體字『建造隧道對城市構成不可接受之財政風險』是整個論證的最終主結論 (Main Conclusion)。',
    'GMAT 經典黑體字分析：第一段為證據 (Evidence)，第二段為主要結論 (Main Conclusion)。',
    'traverse',
    '/trəˈvɝːs/',
    '橫跨穿越穿過',
    'subterranean',
    '/ˌsʌb.təˈreɪ.ni.ən/',
    '地下的'),
   ("In the argument: 'Environmentalists argue that replacing natural gas with biomass wood pellets reduces net "
    'atmospheric carbon emissions. However, this claim overlooks foundational carbon accounting realities. **Logging '
    'mature forests to produce wood pellets instantaneously releases carbon that took centuries to sequester,** while '
    'replanted saplings require decades to recapture equivalent emissions. Consequently, **burning wood pellets '
    'actually accelerates short-term atmospheric warming rather than mitigating it.** For this reason, governmental '
    "clean-energy subsidies should not be awarded to biomass power facilities.' What roles do the two boldface "
    'portions play?',
    'The first is an empirical consideration offered to support an intermediate conclusion; the second is an '
    'intermediate conclusion that supports the main recommendation.',
    'The first is the main conclusion of the argument; the second is a premise supporting it.',
    'The first is an objection raised against the author’s position; the second is the author’s refutation of that '
    'objection.',
    "Both boldface portions are premises offered in support of the author's primary conclusion.",
    '黑體字題型：第一處黑體字陳述伐木排碳的事實證據；第二處黑體字『燃燒木屑顆粒加速短期暖化』是中間結論 (Intermediate Conclusion)，它進而支持最終結論『因此政府不應給予生質能清潔能源補貼』。',
    '雙黑體字角色：第一段為實證前提支持中間結論；第二段為中間結論支持最終政策建議。',
    'biomass',
    '/ˈbaɪ.oʊˌmæs/',
    '生物質生物生質',
    'sequester',
    '/sɪˈkwes.tɚ/',
    '封存隔絕扣押'),
   ("In the argument: 'Proponents of urban highway expansion contend that adding lanes permanently relieves traffic "
    'congestion. **This contention is fundamentally flawed.** Traffic engineers have repeatedly documented that newly '
    'added highway capacity quickly induces previously suppressed vehicle trips. Hence, **any temporary reduction in '
    'travel times following highway widening is inevitably eradicated by induced demand within three years.** '
    "Therefore, metropolitan planners should invest capital in public mass transit rather than highway widening.' What "
    'are the functions of the two boldface portions?',
    "The first expresses the author's primary objection to a rival position; the second is an intermediate finding "
    'that supports the overall recommendation.',
    'The first is a premise that the argument seeks to establish; the second is the main conclusion of the argument.',
    "The first introduces background context; the second is a counterexample undermining the author's thesis.",
    'Both boldface portions represent opposing claims that the argument systematically disproves.',
    '黑體字題型：第一處黑體字是作者對對立觀點的直接反駁反對；第二處黑體字『任何短暫的通行時間減少都會被誘導需求在三年內消滅殆盡』是中間結論，支持最終建議『因此應投資大眾運輸而非拓寬道路』。',
    '黑體字結構：第一段反對對立觀點；第二段中間結論支持最終決策。',
    'contention',
    '/kənˈten.ʃən/',
    '爭論主張論點爭辯',
    'eradicate',
    '/ɪˈræd.ɪ.keɪt/',
    '根除消滅拔除'),
   ("In the argument: '**Retail pharmacies should not be permitted to sell homeopathic remedies alongside regulated "
    'pharmaceuticals.** Rigorous double-blind clinical trials consistently confirm that homeopathic formulations '
    'possess therapeutic efficacy identical to that of an inert placebo. Displaying these products on the same shelves '
    'as validated medicines deceives consumers into assuming regulatory equivalency. Thus, **permitting these sales '
    "fundamentally compromises public health transparency.**' What role do the two boldface portions play?",
    'The first is the main conclusion of the argument; the second is an intermediate conclusion supporting that main '
    'conclusion.',
    'The first is an intermediate conclusion; the second is the main conclusion.',
    'The first is background context; the second is an empirical premise.',
    'The first provides evidence supporting a claim the author opposes; the second refutes that claim.',
    '黑體字題型：第一處黑體字『零售藥局不應獲准將順勢療法藥物與正規藥品並列販售』是整篇的核心主結論 (Main Conclusion)；第二處黑體字『因此允許此類銷售根本上損害了公衛透明度』是中間結論 (Intermediate '
    'Conclusion)，為第一句結論提供支撐！',
    '首句為主要結論，末句為中間結論支持主結論。',
    'homeopathic',
    '/ˌhoʊ.mi.oʊˈpæθ.ɪk/',
    '順勢療法的順勢醫學的',
    'equivalency',
    '/ɪˈkwɪv.ə.lən.si/',
    '等價性等同性同等'),
   ("In the argument: 'Corporate directors must evaluate whether adopting artificial intelligence tools will reduce "
    'operational costs. **Many tech executives assume that deploying generative AI will automatically eliminate '
    'customer support labor expenditures.** However, this assumption fails to account for integration realities. '
    'Generative AI models hallucinate errors that require ongoing verification by experienced human supervisors. '
    'Consequently, **the necessity of human oversight prevents any meaningful net reduction in staffing costs.** For '
    "this reason, the projected cost savings from AI deployment are vastly exaggerated.' What roles do the two "
    'boldface portions play?',
    'The first is an assumption underlying a position that the author challenges; the second is an intermediate '
    "conclusion that supports the author's final verdict.",
    'The first is the main conclusion of the argument; the second is a factual premise supporting that conclusion.',
    'The first introduces an empirical finding; the second is a concession to a rival argument.',
    'Both boldface portions are intermediate conclusions that support the opening premise.',
    '黑體字題型：第一處黑體字是作者所抨擊挑戰之對立觀點的假設；第二處黑體字『人工監督的必要性防範了任何有意義的人力成本縮減』是中間結論，支撐最後一句總結論『AI 成本節約被大幅誇大』。',
    '黑體字判定：第一段為被反駁對立立場之假設；第二段為支持最終結論之中間結論。',
    'hallucinate',
    '/həˈluː.sə.neɪt/',
    '產生幻覺虛構錯誤資訊',
    'expenditure',
    '/ɪkˈspen.də.tʃɚ/',
    '支出開銷花費'),
   ("In the argument: '**Small modular nuclear reactors (SMRs) represent the most reliable baseload complement to "
    'intermittent renewable energy.** Solar and wind facilities generate power erratically depending on meteorological '
    'conditions. Large conventional nuclear plants require up to a decade to construct and carry prohibitive capital '
    'financing costs. In contrast, **factory-fabricated SMRs can be deployed rapidly at a fraction of the capital '
    "expenditure.** Therefore, energy policymakers should prioritize federal loan guarantees for SMR development.' "
    'What are the functions of the two boldface portions?',
    'The first is the main claim that the argument seeks to establish; the second is an empirical premise comparing '
    'SMRs to conventional alternatives.',
    'The first is an intermediate conclusion; the second is the main conclusion.',
    'The first is an objection that the argument refutes; the second is the refutation.',
    'Both boldface portions are background premises supporting a rival energy policy.',
    '黑體字題型：第一處黑體字『小型模組化反應爐(SMR)代表最可靠的基載綠能補充』是作者力圖確立的核心主結論 (Main Claim)；第二處黑體字提供工廠模組化快速建造且成本僅為一小部分的客觀實證比較前提 (Empirical '
    'Premise)。',
    '第一段為核心主結論，第二段為實證對比前提。',
    'modular',
    '/ˈmɑː.dʒə.lɚ/',
    '模組化的模組的',
    'intermittent',
    '/ˌɪn.t̬ɚˈmɪt.ənt/',
    '間歇的斷斷續續的'),
   ("In the argument: 'Museums must decide whether to repatriate colonial-era cultural artifacts to their countries of "
    'origin. **Critics claim that returning ancient artifacts will compromise their physical preservation due to '
    'inadequate climate control in developing institutions.** However, this patronizing assertion is thoroughly '
    'contradicted by modern realities. Many indigenous and regional institutions feature state-of-the-art conservation '
    'laboratories superior to Western facilities. Thus, **the purported conservation risk is largely an ungrounded '
    'pretext used to retain looted heritage.** Consequently, international museums have an unequivocal moral and legal '
    "duty to execute repatriation.' What roles do the two boldface portions play?",
    'The first is a counter-claim that the author seeks to dismantle; the second is an intermediate conclusion that '
    "supports the author's ultimate moral directive.",
    'The first is the primary conclusion of the argument; the second provides contextual evidence supporting it.',
    'The first is an intermediate conclusion; the second is an unproven assumption.',
    'Both boldface portions are concessions made by the author to appease critics.',
    '黑體字題型：第一處黑體字是批評者提出的反對論點（作者欲駁斥之反方觀點）；第二處黑體字『所謂的保護風險大體上只是用以留存掠奪文物的毫無根據的藉口』是中間結論，支持最後一句『國際博物館負有明確歸還義務』之終極結論！',
    '第一段為反對之對立論點；第二段為中間結論支撐最終結論。',
    'repatriate',
    '/riːˈpeɪ.tri.eɪt/',
    '遣返歸國歸還文物',
    'pretext',
    '/ˈpriː.tekst/',
    '藉口託詞掩飾'),
   ("In the argument: '**The central bank should immediately halt its benchmark interest rate increases.** Continued "
    'rate hikes are designed to cool persistent macroeconomic inflation. However, **current inflationary pressures are '
    'driven primarily by geopolitical energy supply shocks rather than excessive domestic consumer demand.** '
    'Suppressing consumer borrowing cannot resolve global oil and natural gas shipping bottlenecks. Hence, escalating '
    "interest rates will induce an unnecessary domestic recession without dampening inflation.' What is the "
    'relationship between the two boldface portions?',
    'The first is the main conclusion of the argument; the second is an analytical premise establishing that current '
    'inflation is supply-driven.',
    'The first is an intermediate conclusion; the second is an empirical counterexample to the main thesis.',
    'The first introduces background context; the second is the primary conclusion.',
    'Both boldface portions are rival claims that the central bank considers equally valid.',
    '黑體字題型：第一處黑體字『中央銀行應立即停止調升基準利率』是全篇核心主結論 (Main Conclusion)；第二處黑體字『當前通膨壓力主要由地緣政治能源供給衝擊驅動』是分析性前提 (Analytical '
    'Premise)，論證升息無效。',
    '第一段為核心主結論；第二段為關鍵分析前提。',
    'benchmark',
    '/ˈbentʃ.mɑːrk/',
    '基準標準指標',
    'recession',
    '/rɪˈseʃ.ən/',
    '經濟衰退衰退期'),
   ("In the argument: 'Advocates of remote work contend that eliminating daily commutes enhances employee happiness "
    'and retention. **Surveys confirm that eighty percent of remote employees report higher subjective satisfaction.** '
    'However, this statistic fails to capture long-term organizational health. Remote isolation erodes informal '
    'mentorship, cross-departmental spontaneous innovation, and deep institutional loyalty. Consequently, **hybrid '
    'schedules featuring mandatory in-person collaboration days produce superior long-term organizational '
    "resilience.** Corporate leaders should therefore reject fully remote staffing models.' What roles do the two "
    'boldface portions play?',
    'The first is an acknowledged empirical finding that supports a rival view; the second is an intermediate '
    "conclusion supporting the author's final recommendation.",
    'The first is the main conclusion of the argument; the second is a premise offered to defend it.',
    'The first is a refuted fallacy; the second is an ungrounded speculation.',
    'Both boldface portions represent intermediate steps leading to an unstated conclusion.',
    '黑體字題型：第一處黑體字是作者承認的實證調查發現（支持對立觀點的讓步事實）；第二處黑體字是中間結論『因此混合辦公模式產生卓越的長期組織韌性』，支持最後一句政策建議！',
    '第一段為承認之對立面實證發現；第二段為中間結論支持最終建議。',
    'mentorship',
    '/ˈmen.tɔːr.ʃɪp/',
    '指導導師制度輔導',
    'resilience',
    '/rɪˈzɪl.jəns/',
    '韌性恢復力適應力'),
   ("In the argument: 'The municipality should not construct the proposed offshore wind farm. Opponents argue that "
    'offshore turbines will disrupt commercial trawling fisheries. **Marine acoustic surveys demonstrate that fish '
    'stocks temporarily relocate during underwater pile-driving construction.** However, post-construction surveys at '
    'European offshore wind installations reveal that submerged turbine foundations rapidly develop into artificial '
    'reefs that increase local marine biomass by forty percent. Therefore, **the proposed wind farm will ultimately '
    "enhance rather than deplete commercial marine stocks.**' What role do the two boldface portions play?",
    'The first is an empirical finding offered in support of the concern raised by opponents; the second is the '
    "author's primary rebuttal to those opponents.",
    'The first is the main conclusion of the argument; the second is an intermediate finding.',
    'The first introduces an unverified assumption; the second is an irrelevant digression.',
    'Both boldface portions are premises supporting the opening policy recommendation.',
    '黑體字題型：第一處黑體字是支持反對派擔憂的實證調查（魚群在施工時暫時遷離）；第二處黑體字『擬建風場最終將增強而非消耗商業魚類資源』是作者對反對派的核心反駁結論 (Primary Rebuttal)！',
    '第一段支持反對派的短暫擔憂；第二段為作者的最終反駁結論。',
    'trawling',
    '/ˈtrɑː.lɪŋ/',
    '拖網捕魚拖網捕撈',
    'biomass',
    '/ˈbaɪ.oʊˌmæs/',
    '生物量生物質')]),
 ('Boldface: Counterarguments & Refutations',
  '批判推理',
  'C2-GMAT10',
  [("In the argument: 'Many environmentalists assert that electric passenger vehicles will rapidly decarbonize the "
    'transportation sector. **Electric vehicles produce zero tailpipe emissions during everyday driving.** '
    'Nevertheless, this optimistic assessment ignores upstream manufacturing realities. The extraction and refining of '
    'rare earth minerals like lithium and cobalt generate immense carbon emissions and catastrophic local '
    'environmental degradation. Thus, **the immediate environmental footprint of electric vehicle adoption is far more '
    "severe than popular discourse acknowledges.**' What is the function of the two boldface portions?",
    "The first is a concession to a position that the author challenges; the second is the author's main conclusion.",
    'The first is the main conclusion; the second provides factual evidence supporting it.',
    'The first is an objection that completely invalidates the author’s argument; the second is an irrelevant '
    'concession.',
    'Both boldface portions are premises used to defend the opening claim.',
    '黑體字題型：第一處黑體字『電動車日常行駛完全零尾氣排放』是作者對其所挑戰立場的讓步 (Concession)；第二處黑體字『因此電動車普及的立即環境足跡遠比大眾普遍認知更為嚴峻』是作者的核心主結論 (Main '
    'Conclusion)。',
    '第一段為對立觀點讓步；第二段為作者主要結論。',
    'tailpipe',
    '/ˈteɪl.paɪp/',
    '排氣管尾氣管',
    'concession',
    '/kənˈseʃ.ən/',
    '讓步妥協承認'),
   ("In the argument: 'Proponents of urban rent control argue that capping residential rent increases protects "
    'low-income tenants from displacement. **Capping rent increases does indeed prevent immediate rent spikes for '
    'current resident leaseholders.** However, rent control systematically suppresses private capital investment in '
    'residential maintenance and discourages the construction of new multi-family housing units. Over time, **the '
    'resulting housing shortage inflicts severe economic harm on future prospective tenants.** Therefore, city '
    "councils should abolish statutory rent controls.' What roles do the two boldface portions play?",
    'The first is a concession to a perspective the argument ultimately rejects; the second is an intermediate '
    'conclusion supporting the final recommendation.',
    'The first is the main conclusion of the argument; the second is an empirical premise.',
    'The first is a premise supporting rent control; the second is a premise opposing housing development.',
    'Both boldface portions are intermediate conclusions supporting a compromise policy.',
    '黑體字題型：第一處黑體字是作者對租金管制益處的讓步 (Concession)；第二處黑體字『由此引發的房屋短缺對未來潛在租客造成嚴重經濟傷害』是中間結論，支持廢除租金管制的最終建議！',
    '第一段為對立觀點讓步；第二段為中間結論支撐最終廢除建議。',
    'displacement',
    '/dɪsˈpleɪs.mənt/',
    '被迫搬遷流離失所位移',
    'statutory',
    '/ˈstætʃ.ə.tɔːr.i/',
    '法定的法令的'),
   ("In the argument: 'Classical art critics maintain that generative artificial intelligence can never produce "
    'authentic visual art. **AI algorithms merely remix pre-existing digital datasets without experiencing genuine '
    'human emotion.** While this technical description is accurate, art is defined by the aesthetic response of the '
    'observer rather than the biological origin of the creator. When viewers experience profound emotional '
    'transcendence viewing an AI-generated portrait, the work successfully achieves the core function of art. '
    "Therefore, **generative AI must be recognized as a legitimate medium of artistic expression.**' What are the "
    'functions of the two boldface portions?',
    'The first is a premise cited by opponents of the author’s thesis; the second is the author’s primary conclusion.',
    'The first is the main conclusion of the argument; the second is an intermediate claim.',
    'The first is a concession made by the author; the second is an unverified assumption.',
    'Both boldface portions are claims that the author attempts to disprove.',
    '黑體字題型：第一處黑體字是反對派引用的前提論據（AI僅是重組資料庫且無感情）；第二處黑體字『因此生成式 AI 必須被承認為合法的藝術表達媒介』是作者的核心主結論 (Primary Conclusion)！',
    '第一段為反對派論據前提；第二段為作者核心主結論。',
    'remix',
    '/ˌriːˈmɪks/',
    '混音重新混和重組',
    'transcendence',
    '/trænˈsen.dəns/',
    '超驗卓越超凡超越'),
   ("In the argument: 'The government should mandate that commercial airliners install real-time satellite telemetry "
    'tracking systems. **Airlines object that equipping long-haul aircraft with continuous satellite streaming will '
    'impose exorbitant telecommunications subscription fees.** However, the cost of maritime search-and-recovery '
    'operations following an oceanic aviation disappearance vastly exceeds the cumulative expense of satellite '
    'streaming subscriptions. Thus, **the financial objection raised by commercial airlines is ultimately penny-wise '
    "and pound-foolish.**' What is the relationship between the two boldface portions?",
    "The first introduces an opposing objection that the author seeks to undermine; the second expresses the author's "
    'primary judgment regarding that objection.',
    'The first is the main conclusion of the argument; the second provides evidence in its defense.',
    "The first is an empirical finding that validates the author's policy; the second is an irrelevant digression.",
    "Both boldface portions are intermediate conclusions that support the airlines' position.",
    '黑體字題型：第一處黑體字引出航空公司反對該政策的經濟異議；第二處黑體字『因此航空公司的財務異議終究是因小失大的愚蠢之舉』是作者對該異議的主要定性評判結論！',
    '第一段為反方異議；第二段為作者對反方異議之直接駁斥判定。',
    'telemetry',
    '/təˈlem.ə.tri/',
    '遙測遙測技術',
    'exorbitant',
    '/ɪɡˈzɔːr.bə.t̬ənt/',
    '過高的過分的昂貴的'),
   ("In the argument: 'Traditional macroeconomists warn that rapid minimum wage increases automatically trigger "
    'catastrophic spikes in youth unemployment. **Advocates of wage hikes counter that higher wages boost consumer '
    'spending power, stimulating retail job creation.** However, both theoretical extremes oversimplify labor market '
    'dynamics. Decades of empirical state-border minimum wage studies demonstrate that modest wage increases produce '
    'negligible impacts on overall employment numbers while significantly reducing child poverty. Consequently, **the '
    'dogmatic claim that modest wage hikes inevitably devastate employment is thoroughly refuted by historical '
    "evidence.**' What roles do the two boldface portions play?",
    'The first presents a counter-argument that the author considers one-sided; the second is the author’s definitive '
    'conclusion regarding the rival dogmatic position.',
    "The first is the author's main conclusion; the second provides empirical data supporting it.",
    'The first is an unverified assumption; the second is a concession to economic orthodoxy.',
    'Both boldface portions are intermediate claims supporting a radical increase in minimum wages.',
    '黑體字題型：第一處黑體字提出支持加薪方的反論點（作者認為太片面過度簡化）；第二處黑體字『微調工資必然摧毀就業的教條宣稱徹底被歷史實證所駁斥』是作者的最終確定性結論！',
    '第一段為片面之反向觀點；第二段為作者的最終結論。',
    'devastate',
    '/ˈdev.ə.steɪt/',
    '徹底摧毀破壞毀滅',
    'dogmatic',
    '/dɑːɡˈmæt̬.ɪk/',
    '教條主義的武斷的盲從的'),
   ("In the argument: 'Urban planning theorists debate whether autonomous robotaxis will alleviate metropolitan "
    'traffic congestion. **Robotaxis could theoretically optimize lane merging and eliminate human rubbernecking '
    'delays.** Nevertheless, this utopian forecast ignores fundamental passenger behavioral adaptations. When '
    'point-to-point transit becomes cheap and effortless, commuters who currently ride subways or cycle will switch to '
    'individual robotaxi trips. Thus, **the widespread deployment of robotaxis will ultimately intensify rather than '
    "reduce urban street gridlock.**' What are the functions of the two boldface portions?",
    "The first is a concession regarding potential technological efficiencies; the second is the author's final "
    'prediction.',
    'The first is the main conclusion; the second provides empirical evidence supporting it.',
    "The first is an objection that disproves the author's thesis; the second is an irrelevant afterthought.",
    'Both boldface portions are intermediate conclusions that support the robotaxi industry.',
    '黑體字題型：第一處黑體字是作者對無人出租車潛在技術效率的讓步 (Concession)；第二處黑體字『因此無人出租車普及終將加劇而非減緩都會堵車』是作者的終極預測結論 (Final Prediction)！',
    '第一段為技術效率讓步；第二段為作者最終預測結論。',
    'rubbernecking',
    '/ˈrʌb.ɚˌnek.ɪŋ/',
    '看熱鬧張望引發的車流遲滯',
    'utopian',
    '/juːˈtoʊ.pi.ən/',
    '烏托邦的空想的不切實際的'),
   ("In the argument: 'The national archaeological service should prohibit the construction of a hydroelectric "
    'reservoir that will inundate a prehistoric valley. **Energy planners argue that the hydroelectric dam will supply '
    'clean, baseload electricity to two million citizens.** While clean energy is undeniably a vital national '
    'objective, ancient cultural heritage destroyed by flooding is permanently lost to humanity. Archaeological '
    'excavation can preserve only a minute fraction of subterranean material artifacts. Therefore, **the irreversible '
    "destruction of unique cultural heritage outweighs the temporary utility of energy generation.**' What roles do "
    'the two boldface portions play?',
    'The first is an opposing argument that the author seeks to override; the second is the central value judgment '
    "that serves as the argument's main conclusion.",
    'The first is the main conclusion; the second provides factual evidence supporting that conclusion.',
    'The first is an intermediate conclusion; the second is an empirical premise.',
    'Both boldface portions represent concessions made by the archaeological service.',
    '黑體字題型：第一處黑體字是能源規劃官員提出的反對論點（清潔電能優勢）；第二處黑體字『獨特文化遺產的不可逆毀滅超越了發電的短暫功用』是核心價值判斷與主要結論 (Central Value Judgment / Main '
    'Conclusion)！',
    '第一段為反對派論點；第二段為核心價值判斷與主要結論。',
    'inundate',
    '/ˈɪn.ʌn.deɪt/',
    '淹沒浸水泛濫淹灌',
    'repatriation',
    '/ˌriː.pæt.riˈeɪ.ʃən/',
    '遣返歸還'),
   ("In the argument: 'Biotechnology executives argue that genetically modified crops are essential to feeding an "
    'expanding global population. **Engineered crops can indeed withstand extreme environmental droughts and resist '
    'devastating insect pests.** However, the consolidation of the global seed supply in the hands of three '
    'multinational conglomerates creates immense geopolitical vulnerability. When smallholder farmers become legally '
    'dependent on proprietary patented seeds, agricultural autonomy dissolves. Consequently, **the concentration of '
    "seed ownership poses a greater long-term threat to food security than climate variability.**' What is the "
    'relationship between the two boldface portions?',
    "The first is a concession acknowledging a genuine benefit of the technology; the second is the author's "
    'overarching conclusion regarding food security.',
    'The first is the main conclusion; the second is an empirical premise supporting it.',
    'The first is an unverified assumption; the second is a refutation of the opening premise.',
    'Both boldface portions are intermediate claims advocating the deregulation of agricultural biotechnology.',
    '黑體字題型：第一處黑體字承認轉基因作物抗旱抗蟲的真實益處（讓步 Concession）；第二處黑體字『種子所有權的壟斷集中對糧食安全的長期威脅超過氣候變遷』是作者的核心總體結論 (Overarching '
    'Conclusion)！',
    '第一段為技術益處讓步；第二段為作者核心總結。',
    'consolidation',
    '/kənˌsɑː.ləˈdeɪ.ʃən/',
    '鞏固合併集中',
    'overarching',
    '/ˌoʊ.vɚˈɑːr.tʃɪŋ/',
    '包羅萬象的首要的核心整體的'),
   ("In the argument: '**Organic agriculture should not be regarded as a viable global replacement for conventional "
    'synthetic farming.** Organic farming practices preserve localized soil microbiome health and eliminate pesticide '
    'runoff. However, rigorous comparative meta-analyses establish that organic yields average forty percent lower per '
    'acre than conventional synthetic yields. Replacing global synthetic agriculture with organic methods would '
    'therefore require clearing millions of square miles of tropical rainforest for cropland. Hence, **a total '
    "transition to organic agriculture would trigger catastrophic global ecological degradation.**' What are the "
    'functions of the two boldface portions?',
    'The first is the main conclusion of the argument; the second is an intermediate conclusion that provides the '
    'primary rationale for that main conclusion.',
    'The first is an intermediate conclusion; the second is the main conclusion.',
    'The first is background context; the second is an objection raised by organic farming proponents.',
    'Both boldface portions are concessions acknowledging the ecological benefits of synthetic fertilizers.',
    '黑體字題型：第一處黑體字『有機農業不應被視為常規農業的全球替代方案』是核心主結論 (Main Conclusion)；第二處黑體字『因此全面轉型有機農業將引發毀滅性的全球生態退化』是為首句主結論提供根本論證支撐的中間結論 '
    '(Intermediate Conclusion)！',
    '首句為主要結論；末句為支持主結論的中間結論。',
    'microbiome',
    '/ˌmaɪ.kroʊˈbaɪ.oʊm/',
    '微生物組微生物群落',
    'meta-analysis',
    '/ˌmet̬.ə.əˈnæl.ə.sɪs/',
    '統合分析後設分析元分析'),
   ("In the argument: 'The central bank recently announced an emergency quantitative easing bond-purchase program. "
    '**Financial sector analysts praised the intervention, projecting that purchasing government bonds will suppress '
    'borrowing costs and stimulate capital investment.** This assessment, however, assumes that banks will lend their '
    'newly acquired liquidity to productive enterprises. In reality, commercial banks faced with an economic downturn '
    'hoard surplus reserves to shore up their own balance sheets. Therefore, **the bond-purchase program will merely '
    "inflate asset bubbles rather than revitalizing the real economy.**' What roles do the two boldface portions play?",
    "The first presents a rival analysis that the author proceeds to critique; the second expresses the author's "
    "primary judgment regarding the policy's ultimate consequence.",
    'The first is the main conclusion of the argument; the second is a supporting premise.',
    'The first introduces an empirical finding; the second is an unverified speculation.',
    'Both boldface portions represent concessions made by the central bank.',
    '黑體字題型：第一處黑體字介紹金融分析師對寬鬆政策的讚譽預測（作者隨後批駁的對立分析）；第二處黑體字『因此購債計畫只會吹大資產泡沫而非振興實體經濟』是作者對政策最終後果的主要判定結論！',
    '第一段為作者批駁之對立面分析；第二段為作者對政策實效之主要判定結論。',
    'quantitative easing',
    '/ˌkwɑːn.t̬ə.teɪ.t̬ɪv ˈiː.zɪŋ/',
    '量化寬鬆',
    'revitalize',
    '/riːˈvaɪ.t̬əl.aɪz/',
    '使復興賦予新生振興')]),
 ('Flaw in the Reasoning: Post Hoc Fallacy',
  '批判推理',
  'C2-GMAT11',
  [('The mayor observed that violent crime dropped by twenty percent immediately after the city installed bright blue '
    'decorative LED streetlights in the entertainment district. The mayor concluded that blue light physically '
    "pacifies criminal impulses. The reasoning in the mayor's argument is most vulnerable to criticism on the grounds "
    'that it:',
    'infers a direct causal relationship based solely on a chronological sequence of events without ruling out '
    'alternative causes',
    'relies on an unrepresentative sample of violent crime statistics from a single weekend',
    'presupposes the truth of the very claim that it sets out to prove',
    'confuses a necessary condition for crime reduction with a sufficient condition',
    '謬誤分析題（後此謬誤 Post Hoc）：市長因藍色街燈安裝在先、犯罪下降在後，便斷言藍光直接抑制犯罪衝擊。其邏輯缺陷在於：單純依據時間前後順序便武斷推導出直接因果關係，而未排除其他潛在成因！',
    'GMAT 經典邏輯謬誤：後此謬誤 (Post Hoc Ergo Propter Hoc / Temporal Fallacy)。',
    'pacify',
    '/ˈpæs.ə.faɪ/',
    '平息安撫撫慰',
    'chronological',
    '/ˌkrɑː.nəˈlɑː.dʒɪ.kəl/',
    '按年代順序的時間先後的'),
   ('A patient began taking daily garlic supplements and noted that her chronic arthritis pain vanished three weeks '
    'later. She concluded that garlic possesses potent anti-inflammatory properties that cure joint inflammation. '
    'Which of the following highlights the primary logical flaw in her deduction?',
    'It concludes that the garlic caused the improvement merely because the improvement occurred after the garlic was '
    'consumed, ignoring the cyclical nature of chronic arthritis flare-ups.',
    'It attacks the personal integrity of pharmaceutical rheumatologists rather than addressing their clinical data.',
    'It draws an inference based on the assumption that what is true of a part of the body is necessarily true of the '
    'whole.',
    'It treats a condition that is sufficient to alleviate pain as one that is necessary for doing so.',
    '謬誤分析題（時間前後假因果與自癒週期）：患者吃大蒜後關節炎好轉，便斷言大蒜治癒發炎。缺陷在於：僅因好轉發生在吃大蒜之後便認定大蒜是起因，忽略了關節炎本身存在的週期性發作與自發緩解規律。',
    '忽視疾病自發週期，將時間後續錯當因果。',
    'arthritis',
    '/ɑːrˈθraɪ.t̬ɪs/',
    '關節炎',
    'cyclical',
    '/ˈsaɪ.klɪ.kəl/',
    '週期的循環的輪轉的'),
   ('A corporate CEO wore his lucky crimson tie during a critical boardroom presentation, and the board approved a '
    'multi-million-dollar capital expansion. The CEO subsequently refused to enter any high-stakes contract '
    "negotiation without wearing the tie, asserting that it guaranteed deal approval. The CEO's reasoning exhibits "
    'which logical flaw?',
    'It commits the post hoc fallacy by attributing an outcome to an antecedent event that has no plausible causal '
    'connection to that outcome.',
    "It relies on equivocation by using the term 'deal' in two fundamentally incompatible senses.",
    'It creates a false dichotomy by presenting only two extreme contractual alternatives.',
    'It assumes that a strategy that works for a competitor will work identically for his own firm.',
    '謬誤分析題（迷信時間關聯）：CEO 將董事會核准擴張歸功於自己戴的幸運領帶。缺陷在於：犯下後此謬誤，將結果歸因於在物理或商業邏輯上毫無因果關聯的先行無關事件！',
    '典型後此謬誤：先行事件與結果毫無因果機制。',
    'antecedent',
    '/ˌæn.t̬əˈsiː.dənt/',
    '先行的前事的先前的',
    'plausible',
    '/ˈplɑː.zə.bəl/',
    '合理的看似有理的'),
   ('A school principal observed that student standardized test scores rose after the cafeteria introduced organic '
    'kale smoothies on Monday mornings. The principal announced that kale smoothies directly elevate adolescent '
    'cognitive intelligence. The principal’s argument is flawed because it fails to consider that:',
    'the score increase might be attributable to tutoring sessions introduced during the same period rather than the '
    'smoothies consumed earlier',
    'kale contains high concentrations of vitamin K and dietary fiber',
    'not all students enrolled in the school consume meals provided by the cafeteria',
    'standardized exams test verbal aptitude in addition to mathematical reasoning',
    '謬誤分析題（時間前後混雜他因）：校長將成績進步歸因於喝羽衣甘藍奶昔。缺陷在於未能考量：該成績進步完全可能是同一時期推行的課後輔導等其他教學措施所致，而非奶昔的作用！',
    '時間前後關聯未能排除同期輔導他因。',
    'smoothie',
    '/ˈsmuː.ði/',
    '冰沙奶昔果昔',
    'attributable',
    '/əˈtrɪb.jə.t̬ə.bəl/',
    '可歸因於的可歸咎於的'),
   ('A tech startup launched a social media advertising campaign on Tuesday and observed that its website crashed due '
    'to traffic volume on Wednesday morning. The founder concluded that the Tuesday ad campaign was the exclusive '
    'cause of the server collapse. Which of the following demonstrates the flaw in this conclusion?',
    'It fails to consider that a major independent technology blog may have published an unsolicited glowing review of '
    "the company's product on Wednesday morning.",
    'It relies on the assumption that website crashes are inherently detrimental to customer brand loyalty.',
    'It assumes that advertising campaigns on social media are less cost-effective than billboard displays.',
    'It draws a conclusion regarding server capacity without consulting the firm’s chief technology officer.',
    '謬誤分析題（忽視突發獨立他因）：創辦人將週三當機歸因於週二廣告。缺陷在於：未能考量週三上午可能有獨立頂級科技部落格自發發表了爆款推薦文章（突發獨立他因）！',
    '忽視時間後續中發生的獨立外部爆發性他因。',
    'unsolicited',
    '/ˌʌn.səˈlɪs.ə.t̬ɪd/',
    '未經請求的主動提供的',
    'detrimental',
    '/ˌdet.rəˈmen.t̬əl/',
    '有害的損害的不利的'),
   ('A farmer noticed that whenever his rooster crowed loudly before dawn, the sun appeared above the horizon thirty '
    "minutes later. The farmer concluded that the rooster’s crowing causes the sun to rise. The farmer's reasoning is "
    'flawed because it:',
    'mistakes a regular temporal succession for a causal relationship between two phenomena',
    'assumes that what is true of dawn during the summer solstice is true of dawn during the winter solstice',
    'relies on expert meteorological testimony that has been thoroughly discredited',
    'concludes that the sun rises because of the rooster without establishing that roosters are native to the region',
    '謬誤分析題（公雞啼叫與日出經典謬誤）：公雞破曉啼叫，30分鐘後日出，農夫斷言啼叫導致日出。缺陷在於：將兩種現象之間規律的時間先後相繼發生，荒唐地錯當成了實質的因果驅動關係！',
    '公雞打鳴經典後此謬誤：錯將時間順序當因果。',
    'succession',
    '/səkˈseʃ.ən/',
    '相繼接連演替繼承',
    'solstice',
    '/ˈsɑːl.stɪs/',
    '至點(夏至冬至)'),
   ('An investor noted that the stock market experienced a dramatic multi-week correction immediately after the '
    'national team lost the international soccer championship. The investor concluded that sports tournament defeats '
    'cause macroeconomic stock market crashes. The argument is vulnerable to criticism because it:',
    'posits a causal link between two entirely independent events based purely on chronological sequence',
    'assumes that all equity investors watch international soccer broadcasts',
    'fails to specify whether the soccer match was decided in regular time or penalty shootouts',
    'relies on historical economic data spanning fewer than ten trading days',
    '謬誤分析題（足球輸球與股市崩跌）：投資人將球賽失利歸因於隨後的股市回檔。缺陷在於：純粹依據時間前後先後順序，便在兩起完全獨立、毫不相干的事件之間強行構建因果關聯！',
    '在毫無機理之獨立事件間強加因果關聯。',
    'correction',
    '/kəˈrek.ʃən/',
    '回檔修正批改矯正',
    'tournament',
    '/ˈtɝː.nə.mənt/',
    '錦標賽錦標聯賽聯賽'),
   ('A municipal transit authority repainted all subway station benches yellow, and fare evasion citations dropped by '
    'fifteen percent over the subsequent month. The director asserted that the color yellow psychologically compels '
    'commuters to purchase transit tickets. The argument is fundamentally flawed because it:',
    'fails to establish a plausible behavioral mechanism linking bench color to ticket compliance, ignoring potential '
    'alternative factors',
    'assumes that yellow paint is more toxic to inhale than industrial gray enamel',
    'relies on survey data collected exclusively from transit maintenance workers',
    'concludes that ticket compliance increased without defining what constitutes transit fare evasion',
    '謬誤分析題（黃色長凳與逃票下降）：局長將逃票減少歸因於長凳漆成黃色。缺陷在於：完全未能確立將長凳顏色與買票遵從行為相聯繫的任何合理心理機制，且無視了可能存在的替代混雜變數！',
    '缺乏合理機制支持且忽略潛在替代因素。',
    'evasion',
    '/ɪˈveɪ.ʒən/',
    '逃避躲避規避逃稅',
    'compel',
    '/kəmˈpel/',
    '強迫迫使使不得不'),
   ('A homeowner hung an iron horseshoe above his front door and noted that his house was not struck by lightning '
    'during a severe thunderstorm the following week. The homeowner claimed that the horseshoe shielded the property '
    'from lightning strikes. The flaw in this reasoning is that it:',
    'commits the post hoc fallacy by attributing non-occurrence of an event to a superstitious antecedent action',
    'assumes that iron is an insulator that repels electrostatic discharge',
    'fails to interview electrical engineering professors from regional technical institutes',
    'concludes that lightning never strikes residential structures located in urban zones',
    '謬誤分析題（迷信護身符防雷）：掛鐵馬蹄鐵後沒被雷劈，便認定馬蹄鐵能防雷。缺陷在於：犯下典型的後此謬誤，將一件小概率事件的未發生(non-occurrence)荒謬地歸因於迷信的先行舉動！',
    '將偶發事件之未發生歸因於迷信先行舉動。',
    'horseshoe',
    '/ˈhɔːrs.ʃuː/',
    '馬蹄鐵馬掌U形物',
    'superstitious',
    '/ˌsuː.pɚˈstɪʃ.əs/',
    '迷信的迷信思想的'),
   ('A retail manager played classical Mozart symphonies over store speakers on Friday, and customer retail purchases '
    "rose by twelve percent compared to the prior Friday. The manager concluded that Mozart's music is directly "
    'responsible for boosting consumer spending. The reasoning is flawed because it fails to rule out the possibility '
    'that:',
    "the Friday in question coincided with a regional bi-weekly payday that significantly increased consumers' "
    'disposable cash',
    'Mozart composed his symphonies in the late eighteenth century rather than the modern era',
    'shoppers in the retail store possessed diverse musical genre preferences',
    'the volume of the store speakers was set below sixty-five decibels',
    '謬誤分析題（週五放莫札特與銷量上升）：經理將週五銷量增加歸因於放莫札特。缺陷在於未能排除：該週五恰逢雙週發薪日(Payday)，顧客口袋裡可支配現金大增，發薪日才是消費拉抬的真正推手！',
    '發薪日可支配所得增加成為被忽略的強大他因。',
    'disposable',
    '/dɪˈspoʊ.zə.bəl/',
    '可支配的一性使用的',
    'symphony',
    '/ˈsɪm.fə.ni/',
    '交響樂交響曲')]),
 ('Flaw in the Reasoning: Sufficient vs. Necessary',
  '批判推理',
  'C2-GMAT12',
  [("The university prospectus states: 'In order to graduate with honors, a student must maintain a cumulative GPA "
    "above 3.8.' Leo has achieved a cumulative GPA of 3.85. Therefore, Leo will definitely graduate with honors. The "
    'flawed reasoning in this argument arises from:',
    'confusing a necessary condition with a sufficient condition',
    'attacking Leo’s personal character rather than evaluating his academic credentials',
    "relying on an ambiguous definition of the term 'cumulative'",
    'assuming that what is true of a single student is true of the entire graduating class',
    '謬誤分析題（混淆充分與必要條件）：規章寫道：『為了獲得榮譽學位，必須(must)維持GPA高於3.8』。這說明GPA>3.8是必要條件(Necessary '
    'Condition)。Leo達到了3.85，論點便斷言他『必然能』獲得榮譽學位（可能還有論文答辯、無違紀等其他必要條件）。其邏輯謬誤正是：錯把必要條件當作了充分條件！',
    'GMAT 經典邏輯條件謬誤：混淆必要與充分條件 (Necessary vs. Sufficient)。',
    'prospectus',
    '/prəˈspek.təs/',
    '簡章招生簡章招股章程',
    'credentials',
    '/krɪˈden.ʃəlz/',
    '資歷資格證書身分證明'),
   ("A commercial driver's manual states: 'Passing a comprehensive vision exam is required to obtain a heavy "
    "commercial truck license.' Marcus passed the vision exam with perfect marks. Therefore, Marcus is legally "
    'entitled to operate a commercial truck immediately. The argument’s reasoning is vulnerable to criticism because '
    'it:',
    'treats a requirement that is necessary to obtain the license as if it were sufficient by itself to guarantee '
    'licensure',
    'fails to specify whether Marcus completed his eye examination with or without corrective lenses',
    'assumes that commercial trucking regulations are identical across all state jurisdictions',
    'draws a conclusion about Marcus based on statistical averages of other commercial drivers',
    '謬誤分析題（視力測驗為必要非充分）：通過視力測驗是取得大貨車駕照的必備條件(is required)。Marcus '
    '通過了視力測驗，結論便斷言他有權立刻開卡車（他還沒考路考、筆試、路況測試！）。缺陷在於：將取得執照的必要條件，錯誤地當作了足以保證發照的充分條件！',
    '必要條件當充分條件：Passing vision exam is necessary, not sufficient.',
    'licensure',
    '/ˈlaɪ.sən.ʃɚ/',
    '許可發照執照授予',
    'corrective',
    '/kəˈrek.tɪv/',
    '矯正的改善的'),
   ("An economics professor asserts: 'All successful multinational corporations have diversified revenue streams. "
    'Corporation X has recently diversified its revenue streams into three new sectors. Therefore, Corporation X will '
    "inevitably achieve commercial success.' The professor's reasoning is flawed because it:",
    'illicitly infers that satisfying a characteristic common to successful firms guarantees commercial success',
    'assumes that revenue diversification can be achieved without incurring initial capital costs',
    'ignores the competitive advantage enjoyed by single-product artisanal monopolies',
    "fails to define whether 'diversification' encompasses foreign currency hedging operations",
    '謬誤分析題（條件充分必要顛倒）：『所有成功的跨國企業都擁有多元化營收（成功 -> 多元化）』。X公司多元化了營收，便斷定X公司必能成功（多元化 -> 成功）。這犯下了肯定後件(Affirming the '
    'Consequent)的充分必要混淆謬誤，將成功普遍具備的特徵錯當成了保證成功的充分條件！',
    '肯定後件謬誤：錯將共同特徵當成成功保證。',
    'diversified',
    '/daɪˈvɝː.sə.faɪd/',
    '多元化的多樣化的',
    'illicitly',
    '/ɪˈlɪs.ɪt.li/',
    '非法地不正當地不合理地'),
   ("A corporate code of conduct warns: 'No employee who engages in insider trading will escape immediate "
    "termination.' David was fired by the board of directors yesterday afternoon. Therefore, David must have engaged "
    'in insider trading. The flaw in this deductive inference is that it:',
    'assumes that an action that is sufficient to warrant termination is the only possible grounds for being fired',
    'relies on hearsay testimony from corporate compliance auditors',
    'presupposes that insider trading is defined identically under federal and state penal codes',
    'treats David’s dismissal as an isolated incident unrepresentative of company culture',
    '謬誤分析題（充分條件當唯一原因）：『任何從事內線交易的員工都會被立即開除（內線 -> 開除）』。David '
    '被開除了，便斷言他一定是從事了內線交易！缺陷在於：將足以引發開除的一種充分條件，荒唐地當成了被開除的『唯一可能原因』（他可能因為曠職、性騷擾、業績太差被開除）！',
    '充分條件當唯一原因：Trading is sufficient for firing, not the only reason.',
    'insider trading',
    '/ˌɪn.saɪ.dɚ ˈtreɪ.dɪŋ/',
    '內線交易內幕買賣',
    'hearsay',
    '/ˈhɪr.seɪ/',
    '傳聞傳說道聽塗說'),
   ("The botanical greenhouse protocol notes: 'Adequate soil nitrogen is necessary for orchids to produce blossoms.' "
    'The gardener enriched the greenhouse soil with abundant nitrogen fertilizer. Therefore, the orchids are '
    'guaranteed to bloom profusely next month. The gardener’s deduction is flawed because it:',
    'fails to recognize that satisfying one necessary condition does not ensure the outcome, as other requirements may '
    'be unmet',
    'assumes that synthetic nitrogen fertilizer possesses chemical properties identical to organic compost',
    'ignores the fact that wild orchids thrive in tropical rainforest canopies without soil',
    'draws a conclusion about orchids based on the physiological behavior of desert cacti',
    '謬誤分析題（單一必要條件滿足不保證結果）：氮肥充足是開花的『必要條件(is '
    'necessary)』。園丁施了大量氮肥，便斷言蘭花下個月『保證盛開』！缺陷在於：未能體認到僅僅滿足單一必要條件根本無法確保結果必然發生，因為其他必要條件（如陽光、水分、溫度）可能完全未達標！',
    '單一必要條件滿足不等於充分條件。',
    'profusely',
    '/prəˈfjuːs.li/',
    '豐富地大量地極其充沛地',
    'cactus',
    '/ˈkæk.təs/',
    '仙人掌'),
   ("A municipal building code stipulates: 'To obtain a residential occupancy permit, an apartment building must "
    "install compliant fire escape stairwells.' The newly constructed high-rise features compliant fire escape "
    'stairwells on every floor. Consequently, the municipal building inspector must grant an occupancy permit '
    'immediately. The reasoning in this argument is flawed because it:',
    'confuses an essential regulatory prerequisite with a guarantee of total code compliance',
    'assumes that municipal building inspectors are susceptible to bribery and personal influence',
    'overlooks the aesthetic impact of exterior metal fire escapes on urban architectural character',
    'fails to specify whether the fire escape stairwells are constructed from reinforced steel or aluminum',
    '謬誤分析題（法規先決條件錯當整體合規保證）：安裝逃生梯是取得使用執照的必備先決條件(must '
    'install)。大樓裝了逃生梯，便斷言建管處必須立刻核發執照（水電管線、耐震結構還沒驗收！）。缺陷在於：將一項至關重要的法規必備先決條件，錯當成了保證全面合規的充分依據！',
    '先決必備條件 (Prerequisite) 錯當充分保證。',
    'occupancy',
    '/ˈɑː.kjə.pən.si/',
    '居住佔用入住使用',
    'prerequisite',
    '/ˌpriːˈrek.wə.zɪt/',
    '先決條件必備條件'),
   ("A cybersecurity whitepaper asserts: 'Every organization that suffers a catastrophic ransomware breach lacks "
    "multi-factor authentication (MFA).' Corporation Y has universally deployed MFA across all employee cloud "
    'accounts. Therefore, Corporation Y is completely invulnerable to catastrophic ransomware breaches. The flaw in '
    'this argument is that it:',
    'assumes that eliminating one contributing vulnerability is sufficient to guarantee absolute security against all '
    'breach vectors',
    'ignores the fact that MFA software occasionally generates user login delays',
    'relies on cybersecurity survey data that was self-reported by IT managers',
    'treats ransomware as the only malware threat confronting corporate digital networks',
    '謬誤分析題（消除單一弱點不等於絕對免疫）：論文稱『遭受勒索攻擊的企業都缺乏MFA』。Y公司全面部署了MFA，便斷言Y公司『對勒索攻擊完全絕對免疫』！缺陷在於：假定消除了引發漏洞的一項條件，就足以保證抵禦所有攻擊途徑（釣魚、零日漏洞、物理滲透依然能破防）！',
    '消除單一漏洞條件錯當絕對免疫之充分條件。',
    'ransomware',
    '/ˈræn.səm.wer/',
    '勒索軟體勒索病毒',
    'invulnerable',
    '/ɪnˈvʌl.nɚ.ə.bəl/',
    '刀槍不入的無懈可擊的無法傷害的'),
   ("An art authentication standard states: 'To be authenticated as a genuine Rembrandt, an oil canvas must contain "
    "Dutch oak stretcher bars fabricated before 1660.' Chemical analysis confirms that a recovered canvas features "
    'Dutch oak stretcher bars dated to 1645. Thus, the painting is conclusively a genuine Rembrandt masterpiece. The '
    'reasoning is flawed because it:',
    'treats an attribute necessary to establish authenticity as an attribute that single-handedly confirms '
    'authenticity',
    'fails to consider that seventeenth-century Dutch painters utilized pigments sourced from lapis lazuli',
    'assumes that Rembrandt worked without employing apprentices or workshop assistants in Amsterdam',
    'draws a definitive judgment based on radiocarbon dating techniques that carry experimental margins of error',
    '謬誤分析題（真偽檢驗必要特徵錯當單一充分鐵證）：在1660年前的荷蘭橡木框架是認定林布蘭真跡的必備要件(must '
    'contain)。檢測證實某畫框為1645年橡木，便宣稱該畫『決定性地就是林布蘭真跡』！缺陷在於：將確立真偽所必不可少的一項特徵，錯當成了單憑自身就能直接證實真跡的充分條件（那年代有成百上千個荷蘭畫家在用同款畫框）！',
    '真品必備特徵 (Necessary Attribute) 錯當單一充分憑證。',
    'stretcher',
    '/ˈstretʃ.ɚ/',
    '畫框撐架擔架伸展物',
    'single-handedly',
    '/ˌsɪŋ.ɡəlˈhæn.dɪd.li/',
    '單槍匹馬地獨力地全憑一人地'),
   ("A financial advisory brochure states: 'Individuals who retire comfortably invariably begin saving at least ten "
    "percent of their income in their twenties.' Julian has faithfully saved ten percent of his salary since his "
    'twenty-second birthday. Therefore, Julian’s comfortable retirement is mathematically assured. The primary '
    'weakness in this reasoning is that it:',
    'assumes that satisfying an action common to all successful retirees guarantees a successful retirement regardless '
    'of future contingencies',
    'overlooks the impact of dividend reinvestment programs in long-term mutual fund portfolios',
    'fails to state Julian’s exact current annual salary and anticipated career trajectory',
    'presupposes that retirement age will remain fixed at sixty-five years across the next four decades',
    '謬誤分析題（退休先行條件錯當必然保證）：舒適退休者都在20歲時存10%。Julian '
    '從22歲起存了10%，便斷言他『絕對能確保舒適退休』（如果遇上惡性通膨、重大疾病、投資爆倉呢？）。缺陷在於：假定滿足了一項成功退休人士普遍採取的先決舉措，就足以保證在無視任何未來意外變故下實現成功！',
    '先決儲蓄條件錯當對沖一切未來風險之充分保證。',
    'invariably',
    '/ɪnˈver.i.ə.bli/',
    '總是始終如一地一成不變地',
    'contingency',
    '/kənˈtɪn.dʒən.si/',
    '偶發事件意外變故不測'),
   ("An elite athletic training academy rule proclaims: 'No sprinter can achieve an Olympic qualifying time without "
    "undergoing high-altitude hypoxic training.' Diego has trained at an altitude of 2,500 meters for six consecutive "
    'months. Consequently, Diego will certainly achieve an Olympic qualifying time at the trials tomorrow. The flaw in '
    'this deductive claim is that it:',
    'mistakes a rigorous training prerequisite for a sufficient guarantee of competitive athletic success',
    'fails to account for differences in barometric pressure between high altitude and sea level',
    'assumes that all Olympic track-and-field events require identical physiological endurance profiles',
    'relies on biographical testimonies provided by former Olympic gold medalists',
    '謬誤分析題（高原低氧訓練為必要非充分）：沒有高原低氧訓練就無法達到奧運資格標準(No sprinter can... '
    'without)。Diego在2500米高原苦練了六個月，便斷言他明天『必定能』拿到奧運門票！缺陷在於：將一項極其嚴苛的訓練先決條件(Prerequisite)，錯當成了保證競技比賽必定成功的充分保證（速度、天賦、起跑、受傷問題均未考量）！',
    '訓練先決條件錯當競技成功之充分保證。',
    'hypoxic',
    '/haɪˈpɑːk.sɪk/',
    '低氧的缺氧的高原低氧的',
    'prerequisite',
    '/ˌpriːˈrek.wə.zɪt/',
    '先決條件前提條件必備要素')]),
 ('Flaw in Reasoning: Equivocation & Semantic Shift',
  '批判推理',
  'C2-GMAT13',
  [("The university's public relations officer stated that all members of the academic faculty have an undeniable "
    'right to freedom of speech. Because granting tenure gives professors speech protections without threat of '
    'termination, the officer concluded that non-tenured lecturers must also be awarded tenure immediately to preserve '
    "their rights. Which of the following best describes the logical flaw in the officer's argument?",
    'It treats a legal and moral right to free expression as equivalent to granting a specific employment contractual '
    'status.',
    'It overlooks the possibility that tenured faculty members might occasionally express unpopular scholarly '
    'opinions.',
    'It presumes without justification that non-tenured lecturers desire permanent career advancement within the '
    'university.',
    'It assumes that academic tenure has been completely abolished across peer research universities.',
    '偷換概念與語意滑轉 (Equivocation)：論點將憲法/道德層面的『言論自由權利 (right to freedom of speech)』直接等同於特定勞動聘僱身分『終身聘任制 '
    '(tenure)』，將概念偷換以推導出荒謬政策結論。',
    '邏輯謬誤：概念偷換 (Equivocation) 與範疇混淆。',
    'equivocation',
    '/ɪˌkwɪv.əˈkeɪ.ʃən/',
    '模稜兩可語意偷換含糊其詞',
    'tenure',
    '/ˈten.jɚ/',
    '終身聘用權終生職位'),
   ('A political commentator argued that because a democratic society relies fundamentally on public interest, any '
    'television network broadcasting programming that the public finds interesting is performing a vital democratic '
    "public service. What is the fundamental flaw in the commentator's reasoning?",
    "It conflates 'public interest' in the sense of the general social welfare with 'what the public finds "
    "interesting' in the sense of commercial curiosity.",
    'It ignores that public television networks receive statutory funding from government bodies.',
    'It assumes that commercial television networks never produce documentary journalism.',
    'It takes for granted that democratic societies are the only governance systems that value commercial '
    'entertainment.',
    '語意偷換謬誤：將公眾利益/社會福祉 (public interest) 與『大眾覺得有趣/八卦好奇 (what is interesting to the public)』混為一談，犯了典型的一詞多義謬誤。',
    '概念偷換：混淆社會公眾福祉與娛樂好奇心。',
    'conflate',
    '/kənˈfleɪt/',
    '合併混淆將…混為一談',
    'welfare',
    '/ˈwel.fer/',
    '福祉社會利益福利'),
   ('A software company proclaimed that its proprietary operating platform is entirely free because any registered '
    'user is free to customize interface display colors without paying an additional licensing fee. Which flaw '
    'characterizes this argument?',
    "It shifts the meaning of 'free' from costing no money to being unconstrained in cosmetic customization.",
    'It presumes that enterprise clients place zero economic value on color customization.',
    'It fails to consider that open-source operating platforms are developed by volunteer engineers.',
    'It relies on the unsupported premise that custom color palettes reduce computer monitor energy consumption.',
    '語意滑轉：論點在『免費 (free of charge)』與『自由/無約束 (free to do)』之間進行概念滑轉，以客製化介面的自由度掩蓋該平台仍需收費的商業本質。',
    '偷換概念：混淆無成本 (free of charge) 與行為自由 (freedom of choice)。',
    'proprietary',
    '/prəˈpraɪə.ter.i/',
    '專有的專利的專賣的',
    'unconstrained',
    '/ˌʌn.kənˈstreɪnd/',
    '不受拘束的無限制的'),
   ('An ethics committee member claimed that because lying is always wrong, and acting falsely in a theatrical stage '
    'play involves speaking untrue statements, dramatic actors are behaving unethically during performances. The '
    'reasoning is flawed because it:',
    'Equivocates between intentional deception intended to mislead and artistic portrayal in a mutually recognized '
    'theatrical context.',
    'Assumes that dramatic actors earn higher salaries than corporate compliance officers.',
    'Neglects to specify whether comedic performances are more harmful than tragic performances.',
    'Fails to acknowledge that classic theatrical plays were originally composed in verse.',
    '語意與情境偷換：論點將意圖欺騙公眾的『說謊』與互為共識的藝術舞台演繹中『台詞虛構』混為一談，抽離了社會情境與意圖邊界。',
    '概念泛化：混淆惡意欺瞞與戲劇虛構藝術。',
    'portrayal',
    '/pɔːrˈtreɪ.əl/',
    '描繪演繹飾演畫像',
    'compliance',
    '/kəmˈplaɪ.əns/',
    '合規順從遵從法令'),
   ('A financial adviser argued that money cannot buy happiness because wealth is purely material, whereas true '
    'happiness is a spiritual state of contentment. Therefore, lifting impoverished households above the poverty line '
    'will do nothing to alleviate their unhappiness. Which flaw undermines this reasoning?',
    'It equates absolute deprivation with ordinary material wealth, ignoring that basic financial resources alleviate '
    'concrete sources of misery.',
    'It presumes that all wealthy individuals suffer from chronic psychiatric conditions.',
    'It relies on survey data gathered exclusively from developing agrarian economies.',
    'It assumes that spiritual contentment can be measured through algorithmic biometric sensors.',
    '偷換範疇謬誤：將『追求極致奢靡無法買到心靈平靜』偷換套用到『處於赤貧線以下的家庭』，忽略了擺脫飢寒匱乏等基本資源能直接消除痛苦。',
    '邏輯漏洞：混淆邊際財富效應與基本生活匱乏之消除。',
    'deprivation',
    '/ˌdep.rəˈveɪ.ʃən/',
    '匱乏剝奪貧困',
    'contentment',
    '/kənˈtent.mənt/',
    '滿足知足滿意'),
   ('The defense attorney argued that human beings are naturally aggressive because millions of bodily cells engage in '
    'constant cellular competition and destruction. Hence, international armed conflict is an inevitable expression of '
    'human nature. The argument is vulnerable to criticism because it:',
    'Illegitimately applies a biological concept of cellular dynamics to macro-level sociological and geopolitical '
    'behaviors.',
    'Fails to cite specific biochemical pathways involved in cellular apoptosis.',
    'Assumes that national treaties have never succeeded in mitigating armed warfare.',
    'Overlooks that military defense budgets have expanded exponentially across sovereign states.',
    '範疇與層次謬誤 (Composition/Equivocation)：將微觀生物細胞層級的代謝競爭現象，直接偷換套用到宏觀地緣政治與國際武裝衝突的社會制度行為上。',
    '層次謬誤：微觀生理學概念不能直接等同於宏觀社會學行為。',
    'geopolitical',
    '/ˌdʒiː.oʊ.pəˈlɪt̬.ɪ.kəl/',
    '地緣政治的',
    'mitigate',
    '/ˈmɪt̬.ə.ɡeɪt/',
    '減輕緩和撫平'),
   ('A real estate developer claimed that his new luxury subdivision is environmentally green because every single '
    "residence will be painted with eco-friendly pastel green acrylic paint. The developer's argument is flawed "
    'because it:',
    'Conflates the literal color green with the ecological concept of environmental sustainability.',
    'Fails to demonstrate that acrylic paints have lower toxicity than oil-based paints.',
    'Assumes that buyers in luxury subdivisions commute solely via electric trains.',
    'Ignores that municipal zoning regulations mandate concrete sidewalk construction.',
    '荒謬字面偷換 (Literal Equivocation)：將象徵環境永續的『綠色 (green)』偷換為油漆塗料的字面顏色『綠色』，犯了字面主義偷換概念謬誤。',
    '字面偷換謬誤：將生態永續抽象意涵偷換為物理色素顏色。',
    'subdivision',
    '/ˈsʌb.də.vɪʒ.ən/',
    '社區建案住宅分區細分',
    'acrylic',
    '/əˈkrɪl.ɪk/',
    '壓克力的丙烯酸的'),
   ('A museum curator argued that since art is inherently an expression of subjective emotion, and emotional states '
    'cannot be objectively quantified, any critical evaluation of artistic craftsmanship is impossible and '
    'illegitimate. The flaw in this reasoning is that it:',
    'Treats the subjective emotional origin of artwork as incompatible with objective criteria of technical execution '
    'and structural coherence.',
    'Assumes that ancient marble sculptures require more craftsmanship than contemporary digital art.',
    'Ignores that museum ticket prices fluctuate based on seasonal tourist demand.',
    'Fails to define whether emotional expressions must be pleasant to be deemed artistic.',
    '非黑即白與範疇偷換：將藝術作品具有主觀情感表現，推論出技術技藝 (craftsmanship) 與結構連貫性無法進行任何客觀評價，混淆了情感來源與技術執行。',
    '範疇混淆：主觀情感驅動力並不排除對技術工藝的客觀評價。',
    'craftsmanship',
    '/ˈkræfts.mən.ʃɪp/',
    '工藝手藝精湛技藝',
    'coherence',
    '/koʊˈhɪr.əns/',
    '連貫性條理性一致性'),
   ('A culinary blogger claimed that because salt is a mineral composed of sodium and chlorine, and elemental chlorine '
    "gas is toxic to human tissue, seasoning meals with table salt is actively poisoning diners. The blogger's logic "
    'fails because it:',
    'Assumes that the chemical compound sodium chloride possesses the identical chemical reactivity and toxicity of '
    'its constituent elemental gas.',
    'Overlooks that organic sea salt contains trace levels of magnesium and calcium.',
    'Presumes that toxic gases cannot be safely isolated in glass containers.',
    'Ignores that excessive sodium consumption is correlated with elevated blood pressure.',
    '化學複合物之整體與部分謬誤 (Fallacy of Division)：誤以為化合物 (NaCl) 必然承繼其單質元素 (Cl2) 的毒性特徵，忽略了分子鍵結改變了化學性質。',
    '分解謬誤：部分單質特性不等於化學合成物之整體性質。',
    'elemental',
    '/ˌel.əˈmen.t̬əl/',
    '元素的基本的單純的',
    'constituent',
    '/kənˈstɪtʃ.u.ənt/',
    '組成的構成成分選民'),
   ('An editorialist maintained that since freedom of the press guarantees journalists the liberty to publish news, '
    'social media platforms that ban users for distributing fraudulent election disinformation are violating '
    'constitutional press protections. Which flaw undermines this editorial?',
    'It treats private corporate content moderation as equivalent to state-sponsored censorship and confuses '
    'journalistic liberty with unregulated fraudulent speech.',
    'It presumes that all social media platforms are incorporated within the same sovereign jurisdiction.',
    'It fails to note that newspaper circulations have plummeted over the past twenty years.',
    'It takes for granted that election candidates never utilize digital platforms for legitimate campaigning.',
    '概念偷換與主體錯置：將憲法防止『國家公權力審查新聞自由』的範疇，偷換套用到『私人商業平台對造假詐欺言論進行內容審核』之上。',
    '憲政範疇錯置：混淆私人契約審核與政府違憲審查。',
    'moderation',
    '/ˌmɑː.dəˈreɪ.ʃən/',
    '審核調節適度溫和',
    'disinformation',
    '/ˌdɪs.ɪn.fɚˈmeɪ.ʃən/',
    '虛假不實訊息刻意假情報')]),
 ('Flaw in Reasoning: Circular Reasoning & Begging the Question',
  '批判推理',
  'C2-GMAT14',
  [("A company CEO asserted: 'Our management consulting methodology is the most reliable in the world because it was "
    'designed by the foremost industry authorities, and we know these authorities are the foremost because only the '
    "most elite practitioners could have created our methodology.' This argument is flawed because it:",
    'Employs circular reasoning where the validity of the premise depends directly on the truth of the conclusion it '
    'seeks to establish.',
    "Fails to benchmark the consulting firm's performance against publicly traded competitors.",
    'Presumes that all management consulting engagements result in positive shareholder value.',
    'Ignores that proprietary methodologies must be registered with patent regulatory authorities.',
    '循環論證 (Circular Reasoning / Begging the Question)：用『專家的權威』來證明『方法論最可靠』，又用『方法論最可靠』來證明『專家最頂尖』，前提與結論互為因果循環證明。',
    'GMAT 核心邏輯謬誤：乞題與循環論證 (Begging the Question)。',
    'circular',
    '/ˈsɝː.kjə.lɚ/',
    '循環的圓形的環狀的',
    'benchmark',
    '/ˈbentʃ.mɑːrk/',
    '基準以…為基準比較'),
   ("A theological author wrote: 'Our sacred text contains the unblemished truth because every passage is divinely "
    "inspired, and we know it is divinely inspired because the sacred text explicitly states so.' Which flaw is "
    'present in this reasoning?',
    'It assumes as true the very premise that it is attempting to substantiate.',
    'It neglects to provide an archaeological timeline for when the text was inscribed.',
    "It fails to compare the text's moral doctrines with contemporary secular jurisprudence.",
    'It presupposes that ancient languages cannot be translated into modern vernaculars.',
    '乞題謬誤：試圖證明文本是神聖真理，卻直接引述文本本身的宣稱作為證明文本是神聖真理的依據，預先假設了待證前提的真實性。',
    '乞題論證：以待證命題本身作為證明自身成立之前提。',
    'unblemished',
    '/ʌnˈblem.ɪʃt/',
    '無瑕疵的完美無缺的',
    'substantiate',
    '/səbˈstæn.ʃi.eɪt/',
    '證實實質支持提供證據'),
   ('A pharmaceutical lobbyist argued that proprietary drug prices are fair and rational because they are set strictly '
    'in accordance with market value, and market value is defined precisely by whatever price the pharmaceutical firm '
    'determines to charge. What flaw undermines this argument?',
    "It defines 'market value' tautologically in terms of the firm's unilateral pricing, rendering the conclusion a "
    'circular assertion.',
    'It overlooks the existence of state-subsidized universal healthcare programs in overseas markets.',
    'It fails to document the precise research expenditures required to discover new chemical entities.',
    'It presumes that generic drug manufacturers have lower operating profit margins.',
    '同義反覆與循環定義：先稱價格公平是因為符合市場價值，再將市場價值定義為藥廠自己所定之價格，使整個論證淪為自說自話的套套邏輯 (tautology)。',
    '套套邏輯與循環定義：用被定義項直接定義概念本身。',
    'tautologically',
    '/ˌtɔː.t̬əˈlɑː.dʒɪ.kəl.i/',
    '同義反覆地套套邏輯地',
    'unilateral',
    '/ˌjuː.nəˈlæt̬.ɚ.əl/',
    '單方面的單邊的'),
   ("A film critic wrote: 'Director Vance is undeniably a brilliant auteur because all of his films exhibit profound "
    "artistic brilliance, and any film that does not exhibit brilliance cannot truly be considered one of Vance's "
    "authentic auteur works.' What is the logical weakness in this argument?",
    'It insulates the claim from counterexamples by defining authentic works strictly by the positive quality being '
    'asserted.',
    "It fails to analyze the box office receipts of the director's cinematic debut.",
    'It assumes that cinematic auteurs must write their own musical scores.',
    'It relies on interview testimonials from actors who worked on low-budget independent films.',
    '無懈可擊式循環定義（無真蘇格蘭人謬誤）：將『不具才華的作品』直接開除籍貫、定義為『非凡斯真正的作者作品』，用結論反向定義前提以屏蔽任何反例。',
    '循環屏蔽謬誤：透過重新定義範疇來屏蔽任何反對論據。',
    'auteur',
    '/oʊˈtɝː/',
    '電影作者電影導演大師',
    'insulate',
    '/ˈɪn.sə.leɪt/',
    '隔離使免受…使絕緣'),
   ("A state governor declared: 'The new high-speed rail line is indispensable because our transportation "
    'infrastructure demands it, and we know our infrastructure demands it because building the rail line is absolutely '
    "necessary.' Which of the following describes the governor's reasoning?",
    'It merely restates the conclusion in different vocabulary rather than providing substantive empirical '
    'justification.',
    'It confuses a necessary condition for fiscal solvency with a sufficient condition.',
    'It assumes that passenger rail patronage will exceed airline passenger volumes.',
    'It overlooks the environmental impact of tunnel excavation through granite bedrock.',
    '同義反覆（換句話說）：論點宣稱高鐵必不可少是因為基礎建設需要，而基礎建設需要是因為高鐵必不可少。純粹用不同同義詞替換重述結論，缺乏任何客觀經驗證據。',
    '同義贅述謬誤：以詞語變換代替實質因果邏輯支撐。',
    'indispensable',
    '/ˌɪn.dɪˈspen.sə.bəl/',
    '不可或缺的必不可少的',
    'solvency',
    '/ˈsɑːl.vən.si/',
    '償債能力財務穩健'),
   ("A software security officer stated: 'Our cloud architecture is invulnerable to cyberattacks because our "
    'encryption protocols are impenetrable, and we are certain our encryption is impenetrable because no system with '
    "our architecture could ever be compromised.' The officer's reasoning is flawed because it:",
    'Derives its conclusion through a self-referential chain that presumes the integrity of the system without '
    'independent testing.',
    'Fails to specify whether two-factor authentication is mandatory for administrative logins.',
    'Assumes that malicious hackers utilize only brute-force cryptographic cracking techniques.',
    'Ignores that hardware routers require firmware updates to prevent denial-of-service disruptions.',
    '自我循環參照：用『架構堅不可摧』推得『密碼防護無懈可擊』，又用『密碼無懈可擊』推得『不可能被攻破』，缺乏任何獨立第三方實證滲透測試。',
    '自我參照循環謬誤：欠缺獨立經驗驗證之自我證明鏈。',
    'invulnerable',
    '/ɪnˈvʌl.nɚ.ə.bəl/',
    '無懈可擊的刀槍不入的',
    'compromise',
    '/ˈkɑːm.prə.maɪz/',
    '危害妥協損害折衷'),
   ("A macroeconomic theorist claimed: 'Consumer spending always increases following tax cuts because tax cuts "
    "stimulate aggregate demand, and aggregate demand stimulates demand because consumer spending expands.' What flaw "
    'characterizes this statement?',
    'It traces an unbroken circular loop of causality where each factor is justified solely by the next.',
    'It takes for granted that marginal propensity to consume is uniform across income brackets.',
    'It assumes that central banks will raise interest rates simultaneously.',
    'It fails to account for international balance of trade deficits in manufacturing.',
    '循環因果鏈條：減稅促總需求，總需求促需求，因為消費擴大。整段推論在概念之間空轉，因果鏈互為擔保，沒有提供任何實體機制分析。',
    '循環因果閉環：邏輯推演原地踏步缺乏真實外生變數。',
    'propensity',
    '/prəˈpen.sə.t̬i/',
    '傾向偏好習性',
    'deficit',
    '/ˈdef.ə.sɪt/',
    '赤字逆差虧損'),
   ("An educational psychologist argued: 'Standardized aptitude tests are an accurate measure of innate intelligence "
    'because students with superior intelligence score highest on them, and we know these students have superior '
    "intelligence because of their high test scores.' This reasoning is logically deficient because:",
    'It utilizes the metric of evaluation to define the very trait that the metric is supposed to measure '
    'independently.',
    'It assumes that test questions contain cultural biases against bilingual test-takers.',
    'It fails to calculate the standard deviation across differing geographical testing centers.',
    'It overlooks that test-takers who review preparation manuals show improved timing performance.',
    '測驗循環定義謬誤：用智商高來解釋高分，又用高分來定義智商高。評量工具直接定義了待測特質，缺乏外在獨立驗證效標。',
    '測量學循環謬誤：評量工具與特質定義自我循環。',
    'aptitude',
    '/ˈæp.tə.tuːd/',
    '性向才能天資',
    'innate',
    '/ɪˈneɪt/',
    '先天的天賦的與生俱來的'),
   ("A political philosopher argued: 'Monarchies are the most legitimate form of government because the sovereign "
    'holds absolute divine mandate, and this divine mandate is evidenced by the uncontested sovereignty of the '
    "monarch.' Which flaw underlies this argument?",
    'It presumes the legitimacy of sovereign authority to prove the divine mandate that supposedly legitimizes that '
    'very authority.',
    'It ignores that constitutional monarchies share power with elected parliamentary assemblies.',
    'It relies on historical anecdotes drawn exclusively from medieval European kingdoms.',
    'It assumes that democratic republics experience higher rates of civil insurrection.',
    '君權神授之循環乞題：用君主擁有主權來證明神授天命，又用神授天命來證成君主主權的合法性，互為因果相互乞題。',
    '政治哲學循環論證：權威合法性與神聖依據自我印證。',
    'sovereignty',
    '/ˈsɑːv.rən.ti/',
    '主權統治權獨立自主權',
    'insurrection',
    '/ˌɪn.səˈrek.ʃən/',
    '叛亂暴動起義'),
   ("A corporate auditor concluded: 'The company's financial ledgers are completely transparent because the chief "
    'financial officer is thoroughly honest, and we know the chief financial officer is thoroughly honest because the '
    "financial ledgers contain no recorded improprieties.' What is the logical defect in this conclusion?",
    'It reasons in a circle by using the unverified integrity of the ledger to validate the character of the executive '
    'whose character validates the ledger.',
    'It assumes that forensic accounting algorithms can detect fraudulent double-entry transactions.',
    'It fails to review the depreciation schedules applied to heavy commercial industrial machinery.',
    'It ignores that external audit partners are rotated once every seven financial quarters.',
    '循環審計邏輯：帳本誠信靠長官品德背書，長官品德靠帳本無污點背書。在未經第三方獨立實質性審查前，兩者互相擔保形成死循環。',
    '審計邏輯死循環：以互為依賴的未經驗證主體互背書。',
    'impropriety',
    '/ˌɪm.prəˈpraɪə.t̬i/',
    '不當行為不正當失檢',
    'forensic',
    '/fəˈren.zɪk/',
    '鑑識的法庭的取證的')]),
 ('Flaw in Reasoning: False Dichotomy & Excluded Middle',
  '批判推理',
  'C2-GMAT15',
  [("A defense strategist argued: 'The nation must either double its annual military procurement expenditures or face "
    'immediate foreign invasion and subjugation. Because we cannot tolerate foreign conquest, we must immediately '
    "double military procurement.' Which of the following highlights the primary logical flaw in this argument?",
    'It falsely presents two extreme outcomes as mutually exhaustive, ignoring moderate intermediate defensive '
    'policies and diplomatic deterrence.',
    'It fails to specify which foreign adversaries currently possess amphibious naval landing vessels.',
    'It assumes that doubling procurement would eliminate all domestic budget deficits.',
    'It presumes that civilian manufacturing facilities cannot be requisitioned during wartime.',
    '假兩難/排除中道謬誤 (False Dichotomy / Excluded Middle)：將選項極端二分化為『軍費加倍』或『立即亡國』，刻意忽視外交嚇阻、防禦同盟或適度軍備整頓等中間折衷方案。',
    'GMAT 核心邏輯謬誤：假兩難 (False Dilemma) 與極端二分法。',
    'subjugation',
    '/ˌsʌb.dʒəˈɡeɪ.ʃən/',
    '征服屈服鎮壓',
    'procurement',
    '/prəˈkjʊr.mənt/',
    '採購採辦調撥'),
   ("A university provost told faculty: 'Either we eliminate all funding for humanities departments to finance "
    'advanced artificial intelligence research laboratories, or the university will fall into total academic '
    "irrelevance. Therefore, shutting down humanities is our only viable choice.' The provost's argument is flawed "
    'because it:',
    'Presupposes without evidence that no compromise or alternative funding mechanisms exist between two radical '
    'alternatives.',
    'Fails to acknowledge that humanities graduates achieve high acceptance rates to legal schools.',
    'Assumes that artificial intelligence researchers never read classical historical literature.',
    'Ignores that private philanthropy donations to universities fluctuate with stock market cycles.',
    '非黑即白假兩難：預設唯有『砍光人文學院』或『大學徹底被淘汰』兩條極端道路，忽視了爭取民間產學贊助、多元調整預算等中間可行方案。',
    '假兩難架構：忽視多元資源調配之中間選擇 (Intermediate Options)。',
    'provost',
    '/ˈproʊ.voʊst/',
    '教務長學術副校長主管',
    'irrelevance',
    '/ɪˈrel.ə.vəns/',
    '無關緊要無足輕重'),
   ("A business columnist asserted: 'In modern commerce, a startup must either aggressively spend all operating "
    'capital to achieve total market dominance within eighteen months, or it will inevitably slide into immediate '
    "bankruptcy.' What logical error does this assertion commit?",
    'It treats aggressive hypergrowth and bankruptcy as the only possible outcomes, overlooking sustainable, '
    'profitable niche strategies.',
    'It presumes that venture capital syndicates require board representation in every financing round.',
    'It fails to cite specific accounting definitions of operational working capital.',
    'It ignores that corporate trademark registrations grant legal exclusivity in international jurisdictions.',
    '二分法盲點：將新創企業命運窄化為『瘋狂燒錢換取壟斷』或『立即破產』，完全無視深耕細分市場、穩健獲利的利基成長途徑。',
    '排除利基市場之中道：忽視穩健小而美盈利模式。',
    'syndicate',
    '/ˈsɪn.də.kət/',
    '辛迪加財團企業聯盟',
    'niche',
    '/niːʃ/',
    '利基市場合適的定位'),
   ("A city council member argued: 'We must either ban all private motor vehicles from downtown streets entirely, or "
    'downtown will choke on catastrophic traffic gridlock and toxic smog. Since gridlock is untenable, the complete '
    "ban on private vehicles must pass.' The argument is vulnerable because it:",
    'Overlooks intermediate congestion-mitigation strategies such as congestion pricing, synchronized traffic '
    'signaling, or expanded transit.',
    'Fails to project the impact of pedestrianization on local retail boutique revenues.',
    'Assumes that delivery trucks require the same road space as passenger sedans.',
    'Ignores that electric vehicle market penetration will reach twenty percent within five years.',
    '忽視中庸治理手段：非黑即白地強推全城禁車，排除擁擠稅收費、號誌時相優化、強化公車接駁等漸進高效之交通治理手段。',
    '極端排除政策：忽略擁擠收費等有效調控措施。',
    'gridlock',
    '/ˈɡrɪd.lɑːk/',
    '交通大癱瘓僵局',
    'untenable',
    '/ʌnˈten.ə.bəl/',
    '難以維持的站不住腳的'),
   ("An energy lobbyist claimed: 'The nation can either continue extracting fossil fuels without new environmental "
    'regulations, or our electrical grid will experience nationwide rolling blackouts. Because blackouts would ruin '
    "industry, we must dismantle all regulatory constraints.' This argument is logically deficient because it:",
    'Creates a false dichotomy between unregulated fossil fuel extraction and grid collapse, ignoring diversified '
    'renewable energy transitions and regulatory modernization.',
    'Assumes that nuclear reactors require three decades of engineering construction.',
    'Fails to quantify the exact megawatt capacity of offshore wind turbine arrays.',
    'Ignores that coal mining labor unions negotiate multi-year collective bargaining agreements.',
    '虛假對立：將『廢除一切環保規管』與『全國大停電』對立起來，無視現代電網可透過綠能轉型、儲能系統及精準監管取得平衡發展。',
    '假對立謬誤：無視能源多角化與儲能技術的中間路徑。',
    'blackout',
    '/ˈblæk.aʊt/',
    '大停電斷電燈火管制',
    'dismantle',
    '/dɪsˈmæn.t̬əl/',
    '廢除拆卸拆開'),
   ("A diet book author stated: 'A person must either strictly adhere to a zero-carbohydrate carnivore regimen or "
    'suffer chronic metabolic disease and premature death. There is no middle ground in human nutritional '
    "biochemistry.' What is the primary logical flaw in this claim?",
    'It falsely polarizes human dietetics into two stark extremes, ignoring that balanced diets containing complex '
    'carbohydrates sustain long-term cardiovascular health.',
    'It neglects to provide recipes for preparing lean poultry cuts.',
    'It assumes that exercise routines burn calories at identical rates across gender cohorts.',
    'It fails to cite the international market price of grass-fed bovine tallow.',
    '非黑即白飲食極端論：抹煞營養學光譜，宣稱不是『零碳純肉』就是『慢性病暴斃』，完全抹殺了地中海飲食與均衡飲食的龐大醫學實證。',
    '極端二分法：抹殺均衡營養光譜與中間醫學實證。',
    'metabolic',
    '/ˌmet̬.əˈbɑː.lɪk/',
    '新陳代謝的',
    'carnivore',
    '/ˈkɑːr.nə.vɔːr/',
    '食肉動物純肉飲食者'),
   ("A parenting influencer declared: 'Parents must either enforce absolute authoritarian obedience in their children "
    'or watch them grow up to become delinquent criminals. Since no parent wants a criminal child, absolute obedience '
    "is the only moral parenting philosophy.' The reasoning is flawed because it:",
    'Frames parenting strategies as an all-or-nothing choice between strict authoritarianism and complete lawlessness, '
    'disregarding authoritative and nurturing guidance styles.',
    'Fails to analyze juvenile recidivism statistics across municipal detention centers.',
    'Assumes that children who practice classical violin never experience emotional tantrums.',
    'Ignores that secondary school curricula incorporate civics education classes.',
    '二分教養極端論：將教養簡化為『絕對專制高壓』與『墮落犯罪』，無視權威民主型 (authoritative) 及引導式教養等公認最健康的成熟教養模式。',
    '教養模型假兩難：忽視民主引導型之中間成熟策略。',
    'authoritarian',
    '/əˌθɔːr.əˈter.i.ən/',
    '威權主義的專制的獨裁的',
    'delinquent',
    '/dɪˈlɪŋ.kwənt/',
    '違法行為的失足的青少年犯'),
   ("A software engineer argued: 'We must either rewrite our five-million-line codebase from scratch in an entirely "
    'new programming language, or technical debt will cause our application to permanently crash tomorrow. Therefore, '
    "a complete rewrite is mandatory.' Which flaw is evident here?",
    'It ignores incremental refactoring and targeted module optimization as viable alternatives to a perilous total '
    'system rewrite.',
    'It fails to benchmark compilation speed between static and dynamic typing runtimes.',
    'It presumes that new programming languages require specialized integrated development environments.',
    'It takes for granted that database queries consume more memory than frontend rendering engines.',
    '工程二分假兩難：預設只有『全盤重寫五百萬行代碼』與『明天徹底崩潰』兩極，忽視了漸進式模組重構 (incremental refactoring) 等穩健工程手段。',
    '工程極端決策謬誤：忽視漸進重構之可行方案。',
    'refactor',
    '/riːˈfæk.tɚ/',
    '重構重整代碼架構',
    'perilous',
    '/ˈper.əl.əs/',
    '危險的充滿風險的'),
   ("An art museum board chair asserted: 'The museum must either sell off its prized Renaissance paintings to cover "
    'operational deficits, or close its doors forever. We refuse to shutter our doors, so the paintings must be '
    "auctioned immediately.' The argument is flawed because it:",
    'Presents selling core collections and permanent closure as the only options, ignoring endowment fundraising, '
    'ticket restructuring, or operational cost reductions.',
    'Assumes that Renaissance paintings require atmospheric humidity control systems.',
    'Fails to disclose whether the paintings were donated with legally binding donor covenants.',
    'Presumes that modern art exhibitions attract younger demographic audiences.',
    '破產威脅下的假兩難：將經營抉擇窄化為『賣祖產名畫』或『永遠倒閉』，無視捐贈基金募款 (endowment)、票價調整或成本精簡等健全營運選項。',
    '財務治理假兩難：忽視募款與撙節開支等中間途徑。',
    'endowment',
    '/ɪnˈdaʊ.mənt/',
    '捐贈基金稟賦天賦',
    'covenant',
    '/ˈkʌv.ə.nənt/',
    '契約協約盟約限制性條款'),
   ("A trade protectionist argued: 'Our domestic market must either enact total tariffs on all imported industrial "
    'components or witness the total extinction of our manufacturing workforce. Hence, a complete trade embargo on '
    "components is vital.' What logical flaw weakens this argument?",
    'It treats absolute protectionism and complete deindustrialization as the only outcomes, neglecting targeted '
    'tariffs, workforce upskilling, and domestic production subsidies.',
    'It presumes that freight container shipping rates will double over the subsequent fiscal quarter.',
    'It overlooks that domestic patent litigation has increased among industrial robotics manufacturers.',
    'It assumes that consumer goods packaging relies predominantly on virgin corrugated cardboard.',
    '貿易政策假兩難：宣稱要麼全面課徵封閉性重稅，要麼製造業徹底滅亡。忽略了靶向補貼、勞工技能升級或結構性關稅等多元平衡政策工具。',
    '貿易保護假兩難：忽視靶向補貼與產業轉型之中間選項。',
    'tariff',
    '/ˈter.ɪf/',
    '關稅價目表',
    'deindustrialization',
    '/diː.ɪnˌdʌs.tri.ə.laɪˈzeɪ.ʃən/',
    '去工業化去產業化')]),
 ('Drawing Valid Inferences: Strictly Deductive Conclusions',
  '批判推理',
  'C2-GMAT16',
  [('All prospective flight attendants at AirGlobal must pass a rigorous multi-tier security clearance. Anyone who '
    'holds a past criminal conviction for identity fraud is permanently barred from obtaining this security clearance. '
    'Jason was hired as an AirGlobal flight attendant yesterday. If the statements above are true, which of the '
    'following must also be true?',
    'Jason has never been convicted of criminal identity fraud.',
    'Jason has completed at least five hundred commercial flight hours.',
    'Jason holds an advanced university degree in aviation safety management.',
    'AirGlobal has never hired an individual who failed a routine medical examination.',
    '嚴密演繹推理 (Strictly Deductive Inference)：所有錄取者皆通過審查；有身分詐欺前科者絕對無法通過審查；傑森昨日被錄取為空服員。因此，傑森絕對沒有身分詐欺前科。100% 邏輯必然得出。',
    'GMAT 核心演繹題型：三段論必真推論 (Modus Tollens)。',
    'clearance',
    '/ˈklɪr.əns/',
    '許可安全審查通過清理',
    'rigorous',
    '/ˈrɪɡ.ɚ.əs/',
    '嚴格的嚴密的嚴厲的'),
   ('No commercial airliner manufactured by AeroTech has ever suffered a fuselage structural failure while cruising at '
    'operational altitude. Every transatlantic passenger flight operated by TransSky Airlines utilizes aircraft '
    'manufactured by AeroTech. Flight TS-402, a TransSky passenger flight en route from New York to London, suffered '
    'an in-flight fuselage structural failure. Which statement must be true based on the premises?',
    'Flight TS-402 was not cruising at operational altitude when the structural failure occurred.',
    'Flight TS-402 was carrying twice its certified maximum cargo weight.',
    'AeroTech will be forced to recall all commercial airliners currently in global operation.',
    'TransSky Airlines will immediately cease all transatlantic route schedules.',
    '嚴密演繹必真推論：AeroTech 飛機在巡航高度下從未發生機身結構損壞；TransSky 跨大西洋客機皆為 AeroTech 製造；TS-402 '
    '為此類客機且發生了結構損壞。因此，損壞發生時該客機絕對不在平飛巡航高度（例如在起飛或爬升降落階段）。',
    '嚴格否定後件推論：排除前提否定之必然結論。',
    'fuselage',
    '/ˈfjuː.zə.lɑːʒ/',
    '機身機體',
    'altitude',
    '/ˈæl.tə.tuːd/',
    '高度海拔高處'),
   ('Every senior partner at the law firm Sterling & Cross owns equity shares in the corporate partnership. Any '
    'attorney who owns equity shares is legally prohibited from personally representing clients in litigation adverse '
    "to the partnership's corporate clients. Attorney Elena represents a client who is suing Sterling & Cross's "
    'largest corporate client. If the statements above are true, which must be true?',
    'Elena is not a senior partner at Sterling & Cross.',
    'Elena was formerly an associate attorney at Sterling & Cross.',
    'The litigation against the corporate client will be dismissed with prejudice.',
    'All associate attorneys at Sterling & Cross are permitted to sue any corporate entity.',
    '嚴密三段論推論：高級合夥人必持股；持股人依法不得代表客戶起訴該所客戶；Elena 正在起訴該所最大客戶。因此，Elena 必然不是該所的高級合夥人。',
    '嚴格推論：否定後件 (Elena 訴訟 -> Elena 未持股 -> Elena 非高級合夥人)。',
    'equity',
    '/ˈek.wə.t̬i/',
    '股權普通股公平資產淨值',
    'adverse',
    '/ædˈvɝːs/',
    '不利的相反的敵對的'),
   ('During the annual audit, any financial division of OmniCorp that fails to reconcile its accounts payable ledger '
    'within twenty-four hours receives a mandatory regulatory censure. The Logistics Division received no regulatory '
    "censure following this year's annual audit. Which of the following is logically guaranteed by this information?",
    'The Logistics Division reconciled its accounts payable ledger within twenty-four hours during the audit.',
    'The Logistics Division incurred fewer operating expenses than any other division of OmniCorp.',
    'OmniCorp will dismiss the head of accounting for the Logistics Division.',
    'Every financial division of OmniCorp completed its annual audit ahead of schedule.',
    '逆否命題必真 (Contrapositive)：若未在24小時內完成帳目調節則必受懲戒；後勤部門未受懲戒。因此，後勤部門必然在24小時內完成了調節。逆否命題等價於原命題。',
    '演繹邏輯：逆否命題必真律 (~Q -> ~P)。',
    'reconcile',
    '/ˈrek.ən.saɪl/',
    '對帳調節和解調和',
    'censure',
    '/ˈsen.ʃɚ/',
    '譴責嚴厲指責戒飭'),
   ('Every residential architectural blueprint approved by the municipal planning board in Greenfield must meet both '
    'seismic reinforcement standards and passive solar heating criteria. Blueprint Model Alpha meets seismic '
    'reinforcement standards but relies entirely on active geothermal heat pumps. If the rules above are enforced, '
    'what must follow?',
    'Blueprint Model Alpha cannot be approved by the Greenfield municipal planning board as a residential blueprint.',
    'Blueprint Model Alpha will be granted a permanent municipal zoning variance.',
    'Active geothermal heating is legally prohibited in commercial buildings in Greenfield.',
    'Passive solar heating is cheaper to install than geothermal heat pump infrastructure.',
    '嚴格演繹推論：核准必須『同時具備』防震與被動式太陽能；Alpha 模型只有防震、無被動太陽能（改採主動地熱）。因此該模型必然無法通過該市住家藍圖審查。',
    '聯言命題否定推論：未滿足必要條件必不成立。',
    'seismic',
    '/ˈsaɪz.mɪk/',
    '地震的抗震的',
    'geothermal',
    '/ˌdʒiː.oʊˈθɝː.məl/',
    '地熱的地熱能的'),
   ('All certified sommeliers at the Grand Palate Restaurant must have passed the Level Four Master tasting '
    'examination. No individual who experiences chronic olfactory nerve dysfunction can pass the Level Four Master '
    'tasting examination. Chef Marcus is a certified sommelier at the Grand Palate Restaurant. What can be properly '
    'inferred?',
    'Marcus does not suffer from chronic olfactory nerve dysfunction.',
    'Marcus has worked in culinary restaurants for at least fifteen years.',
    'No chef at the Grand Palate Restaurant is permitted to cook without tasting ingredients.',
    'The Level Four Master tasting examination includes thirty vintage French Bordeaux wines.',
    '嚴格演繹推理：侍酒師必通過四級考試；有嗅覺神經障礙者絕無法通過；Marcus 是該餐廳認證侍酒師。推導出 Marcus 絕無慢性嗅覺神經障礙。',
    '演繹推理鏈： Marcus -> 通過考試 -> 無嗅覺神經障礙。',
    'sommelier',
    '/səmˈel.jeɪ/',
    '侍酒師酒窖主管',
    'olfactory',
    '/ɑːlˈfæk.tɚ.i/',
    '嗅覺的'),
   ('Whenever the temperature inside the chemical polymerization reactor drops below 180 degrees Celsius, catalyst '
    'decay occurs automatically. Whenever catalyst decay occurs, the resultant plastic polymers become brittle and '
    'unmarketable. A batch of plastic polymers produced by the reactor was verified to be highly flexible and '
    'commercially marketable. Which conclusion is definitively proven?',
    'The temperature inside the reactor did not drop below 180 degrees Celsius during the production of this batch.',
    'The reactor operated at an internal temperature of precisely 250 degrees Celsius.',
    'The chemical manufacturer will install automated backup heating coils immediately.',
    'Brittle plastic polymers can be recycled into high-grade automotive bumpers.',
    '假言連鎖演繹推論：低於180度 -> 觸媒衰變 -> 塑膠脆化無法銷售。現已證實該批塑膠韌性極高且暢銷（非脆化），逆否推導出當時反應爐溫度絕對沒有跌破180度。',
    '連續連鎖逆否推論：~脆化 -> ~衰變 -> ~低於180度。',
    'catalyst',
    '/ˈkæt̬.əl.ɪst/',
    '催化劑觸媒促進因素',
    'brittle',
    '/ˈbrɪt̬.əl/',
    '脆的易碎的脆弱的'),
   ('Only employees who possess an active cryptographic clearance key can decrypt and view Project Zephyr '
    'documentation. All software developers who joined after January 1st were denied cryptographic clearance keys. '
    'Rachel is currently decrypting and viewing Project Zephyr documentation. What must be true?',
    'Rachel did not join the software development team after January 1st.',
    'Rachel is the chief architect and technical supervisor of Project Zephyr.',
    'Cryptographic clearance keys are reset and reissued every ninety days.',
    'Project Zephyr documentation contains confidential military defense patents.',
    '必要條件演繹推論：能解密者必有密鑰；1月1日後入職之軟體人員皆無密鑰；Rachel 正在解密。因此 Rachel 絕非1月1日後入職的軟體開發人員。',
    '必要條件逆否推理：有解密權限者必然排除無密鑰群體。',
    'cryptographic',
    '/ˌkrɪp.təˈɡræf.ɪk/',
    '密碼的密碼學的加密的',
    'decrypt',
    '/diːˈkrɪpt/',
    '解密破解密文'),
   ('Every hospital patient who received medication Delta exhibited elevated liver enzymes within forty-eight hours. '
    'No patient who has elevated liver enzymes is permitted to undergo elective orthopedic surgery. Patient Gomez '
    'underwent elective orthopedic surgery at the hospital yesterday. If all statements are true, which must also be '
    'true?',
    'Gomez did not receive medication Delta within the forty-eight hours prior to surgery.',
    'Gomez has completely recovered from his elective orthopedic surgical procedure.',
    'Medication Delta is the most potent anti-inflammatory prescription available at the hospital.',
    'Orthopedic surgeons are legally liable for any elevated liver enzyme complications.',
    '三段論否定式推論：服 Delta 藥物 -> 48小時內肝指數升高；肝指數升高 -> 不得動骨科擇期手術；Gomez 動了骨科擇期手術。證明 Gomez 在術前48小時內未服用 Delta 藥物。',
    '演繹推理：逆否鏈條 ~不得手術 -> ~指數升高 -> ~未服Delta。',
    'orthopedic',
    '/ˌɔːr.θəˈpiː.dɪk/',
    '骨科的矯形的',
    'elective',
    '/iˈlek.tɪv/',
    '非緊急的擇期的選修的'),
   ('All venture capital partners at Apex Capital who evaluated the robotics pitch agreed that the valuation was '
    'unrealistic. Anyone who agreed that the valuation was unrealistic voted against investing in the robotics '
    'startup. Partner Liam voted in favor of investing in the robotics startup. What must be concluded from these '
    'facts?',
    'Liam is either not a partner at Apex Capital or did not evaluate the robotics pitch.',
    'Liam believes the robotics startup will achieve profitability within one year.',
    'The robotics startup secured financing from a competing venture capital syndicate.',
    'Apex Capital has never invested in an early-stage artificial intelligence robotics firm.',
    '嚴密德摩根與三段論演繹：Apex合夥人且評估該案者 -> 認同估值不合理 -> 投反對票。Liam 投了贊成票（否定結論），表示 Liam 未同時滿足前提兩條件（要麼不是Apex合夥人，要麼當時根本沒去評估該案）。',
    '複合命題演繹否定：否定後件導出前件聯言命題之否定 (~(P and Q) = ~P or ~Q)。',
    'valuation',
    '/ˌvæl.juˈeɪ.ʃən/',
    '估值評價評定',
    'syndicate',
    '/ˈsɪn.də.kət/',
    '辛迪加聯合組織財團')]),
 ('Drawing Valid Inferences: Avoiding Speculative Extrapolations',
  '批判推理',
  'C2-GMAT17',
  [('Archaeologists excavating a coastal Bronze Age settlement unearthed three bronze ceremonial daggers crafted with '
    'sophisticated metallurgy techniques not documented in the region until five centuries later. The soil layer was '
    'verified undisturbed by modern intrusive digging. Which conclusion is most reliably supported without speculative '
    'overreach?',
    'The metallurgical techniques used to manufacture the daggers existed earlier than had previously been documented '
    'for that geographical region.',
    "The settlement was an empire's capital city that dominated maritime trade routes.",
    'Bronze Age metallurgists had direct contact with Mediterranean sea merchants.',
    'The ceremonial daggers were used exclusively in royal coronation ceremonies.',
    '防範過度推論 (Avoiding '
    'Overreach)：已知該未擾動土層出土了比該地區原先紀錄早500年的冶金青銅匕首。唯一必真、不跨越經驗邊界的推論是：製造這些匕首的冶金技術在該地區出現的時間比原先文獻記載的更早。其餘帝國霸權、海外商隊、加冕儀式皆屬過度推測。',
    'GMAT 歸納題原則：嚴格基於文本邊界，拒絕無依據之過度外推 (No Wild Extrapolations)。',
    'metallurgy',
    '/ˈmet̬.əl.ɝː.dʒi/',
    '冶金學冶金術',
    'intrusive',
    '/ɪnˈtruː.sɪv/',
    '侵入的打擾的侵入性的'),
   ('A survey of eight hundred public high school teachers in a Midwestern state revealed that ninety-two percent '
    'spend an average of four hundred dollars of their personal funds annually on basic classroom school supplies. '
    'What can be most reasonably inferred from this survey data?',
    'A substantial majority of the surveyed teachers utilize personal financial resources to provide materials for '
    'their classrooms.',
    'School boards in the Midwestern state deliberately misappropriate education budget funds.',
    'High school teachers in private schools never spend personal money on classroom supplies.',
    'Public high schools will experience widespread teacher strikes in the subsequent school year.',
    '合理事實推論：調查顯示該州 92% 的受訪公立高中教師每年平均自掏腰包 400 美元購買文具。僅能穩妥推論出：受訪教師中絕大多數人都動用了個人資金提供教室物資。不能腦補貪污或罷工等情節。',
    '文本事實歸納：嚴格忠實於統計母體與事實陳述。',
    'misappropriate',
    '/ˌmɪs.əˈproʊ.pri.eɪt/',
    '挪用侵吞濫用',
    'substantial',
    '/səbˈstæn.ʃəl/',
    '大量的實質的重大的'),
   ('In a monitored wildlife sanctuary, the population of predatory gray wolves increased by thirty percent over five '
    'years, during which the local population of white-tailed deer declined by twenty-five percent, while the '
    'abundance of wild browse vegetation showed a thirty-five percent resurgence. What is the most circumspect '
    'inference supported by this data?',
    'The decline in the deer population occurred concurrently with an increase in the wolf population and a resurgence '
    'in browse vegetation.',
    'Gray wolves are the sole environmental determinant regulating white-tailed deer mortality.',
    'Eliminating gray wolves would permanently cause the starvation of all local herbivores.',
    'Browse vegetation grew more rapidly due to increased nitrogen deposition from wolf excretions.',
    '嚴謹客觀描述推論：生態監測數據顯示狼增加、鹿減少、植被復甦。最嚴謹合乎邏輯的推論是客觀確認這三項現象在同個時間跨度內並行發生。未排除氣候、獵捕等變數前，不能斷言狼是鹿死亡的『唯一決定因素』。',
    '審慎推論原則：描述相關性 (co-occurrence) 優先於未經嚴格驗證之單一決定性因果斷言。',
    'resurgence',
    '/rɪˈsɝː.dʒəns/',
    '復甦回潮復興',
    'circumspect',
    '/ˈsɝː.kəm.spekt/',
    '慎重的謹慎小心的周全的'),
   ('Laboratory analyses showed that mice fed diet X lived an average of twenty-eight months, whereas mice fed '
    'standard diet Y lived an average of twenty-two months. Both cohorts were kept in identical climate-controlled '
    'pathogen-free vivariums. Which inference is best justified?',
    'Under the controlled conditions of the experiment, mice fed diet X exhibited a longer average lifespan than mice '
    'fed diet Y.',
    'Diet X will extend human life expectancy by six years if adopted in clinical trials.',
    'Diet Y contains synthetic carcinogenic preservatives that induce cellular senescence.',
    'Mice fed diet X experienced zero cases of age-related cardiovascular degeneration.',
    '實驗室邊界推論：在該受控實驗條件下，吃 X 飲食的老鼠平均壽命長於吃 Y 飲食的老鼠。不能跨物種推論人類壽命延長六年，也不能無端臆測 Y 飼料含有致癌防腐劑。',
    '實驗數據嚴格推論：僅限於特定受試樣本與受控實驗環境之統計結論。',
    'vivarium',
    '/vaɪˈver.i.əm/',
    '實驗動物飼養所生態缸',
    'senescence',
    '/sɪˈnes.əns/',
    '衰老老化'),
   ('A longitudinal study tracked three thousand corporate managers over a decade and found that those who slept fewer '
    'than six hours per night reported forty percent more sick leave days than those who slept seven to eight hours. '
    'What can be safely inferred?',
    'There is a positive statistical association between sleeping fewer than six hours per night and taking higher '
    'amounts of sick leave among the surveyed managers.',
    'Sleeping exactly nine hours per night guarantees immunity from viral respiratory infections.',
    'Workplace stress causes individuals to develop chronic neurological sleep disorders.',
    'All managers who slept eight hours received faster career promotions than short sleepers.',
    '統計關聯性推論：研究確立了每晚少於6小時睡眠與請更多病假之間的『正統計關聯性 (positive statistical association)』。不能妄自過度外推為睡眠9小時必然免疫或加班壓力造成神經病變。',
    '統計相關非全稱必然：僅承認統計相關性，拒絕絕對化因果推論。',
    'longitudinal',
    '/ˌlɑːn.dʒəˈtuː.dɪ.nəl/',
    '縱向的長期的經度的',
    'association',
    '/əˌsoʊ.siˈeɪ.ʃən/',
    '關聯聯繫協會聯合'),
   ('In an excavation of an unplundered eighteenth-century royal crypt, forensic historians found that the lead coffin '
    'had completely shielded the embalmed remains from microbial decomposition, leaving textile vestments perfectly '
    'intact. Which statement is fully supported?',
    'The physical barrier provided by the lead coffin prevented the entry of microorganisms that would otherwise cause '
    'microbial decomposition of the remains.',
    'Lead coffin burial was universally accessible to all social strata in the eighteenth century.',
    'Embalming herbs used in the crypt possessed greater antibacterial potency than modern penicillin.',
    'The monarch interred in the crypt died of acute environmental heavy metal poisoning.',
    '物理因果邊界推論：鉛棺提供的物理密封屏障阻絕了微生物分解遺體與衣物。不能擅自腦補鉛棺葬禮普及平民、古代防腐草藥強過盤尼西林、或是該國王死於重金屬中毒。',
    '文本事實錨定：基於物理防護機制得出直接推論，杜絕主觀臆造。',
    'crypt',
    '/krɪpt/',
    '地下墓穴地窖',
    'embalmed',
    '/ɪmˈbɑːmd/',
    '防腐的塗以香料的'),
   ('A regional commercial bank reported that default rates on unsecured personal loans rose from two percent in 2021 '
    'to six percent in 2023, while default rates on collateralized auto loans remained steady at 1.5%. Which inference '
    'is best substantiated by this financial report?',
    'Between 2021 and 2023, the bank observed a greater increase in the default rate on unsecured loans than on '
    'collateralized auto loans.',
    'Unsecured personal loans will be permanently eradicated from the commercial banking sector.',
    'Borrowers who defaulted on auto loans surrendered their residential real estate titles.',
    'The bank incurred catastrophic operating losses across its retail operations in 2023.',
    '數據差值嚴密歸納：無擔保個人貸款違約率升幅 (2%->6%) 大於有抵押汽車貸款違約率升幅 (維持1.5%)。僅能就此比較數字得出穩健結論，不能臆測銀行全面廢除個人信貸或面臨破產。',
    '金融數據對比推論：依據客觀百分比走勢進行事實判定。',
    'unsecured',
    '/ʌn.səˈkjʊrd/',
    '無擔保的無防護的',
    'collateralized',
    '/kəˈlæt̬.ɚ.ə.laɪzd/',
    '有擔保的以資產質押的'),
   ('Over a three-year period, a municipality added forty miles of separated bicycle lanes and saw reported bicycle '
    'accidents involving motor vehicles decrease by twelve percent. Which inference avoids unwarranted speculation?',
    'The period following the addition of separated bike lanes coincided with a reduction in vehicular bicycle '
    'accidents in the municipality.',
    'Separated bicycle lanes eliminate all roadway traffic hazards for urban cyclists.',
    'Automobile drivers in the municipality received advanced safety awareness training.',
    'Every municipal cyclist now uses separated bike lanes exclusively during commutes.',
    '審慎時序關聯推論：增設獨立自行車專用道期間，與機動車事故減少12%的趨勢相互伴隨 (coincided with)。不能誇大為消除『所有』道路危險，亦不能無中生有指控司機全體受訓。',
    '杜絕全稱絕對化：避免使用 eliminate all 等極端誇大之詞。',
    'coincided',
    '/ˌkoʊ.ɪnˈsaɪdɪd/',
    '巧合同時發生一致',
    'unwarranted',
    '/ʌnˈwɔːr.ən.t̬ɪd/',
    '無根據的無端的未獲授權的'),
   ('An experiment demonstrated that tomato seedlings exposed to blue LED wavelengths developed twenty percent thicker '
    'stems than seedlings exposed to red LED wavelengths under identical ambient moisture and carbon dioxide levels. '
    'What is the most defensible conclusion?',
    'Under the tested ambient conditions, exposure to blue LED light was associated with greater stem thickness than '
    'exposure to red LED light.',
    'Blue LED wavelengths enhance the sugar sweetness of mature harvestable tomatoes.',
    'Red LED lighting disrupts chlorophyll synthesis in all horticultural plant species.',
    'Farmers who cultivate greenhouse tomatoes should eliminate natural sunlight completely.',
    '受控植物生理推論：在該受控條件下，藍光LED與幼苗莖部增粗顯著相關。不能外推至果實含糖甜度、不能否定紅光的葉綠素合成、更不能建議農民完全廢除天然陽光。',
    '植物生理受控推論：恪守變數範圍，不任意跨階段推論果實特質。',
    'seedling',
    '/ˈsiːd.lɪŋ/',
    '幼苗苗木',
    'horticultural',
    '/ˌhɔːr.t̬əˈkʌl.tʃɚ.əl/',
    '園藝的園藝學的'),
   ('In a trial of a digital language app, adult learners who completed fifteen minutes of daily spaced-repetition '
    'drills scored eighteen percent higher on vocabulary retention tests than those who studied once weekly for two '
    'hours. What conclusion is safely warranted?',
    'In this trial, frequent shorter study intervals were correlated with higher vocabulary retention scores than a '
    'single extended weekly session.',
    'Spaced-repetition software guarantees native-level conversational fluency within six months.',
    'Studying for two hours consecutively damages long-term cognitive synaptic memory pathways.',
    'Learners using spaced repetition never need to review grammatical syntactic structures.',
    '間隔重複事實推論：試驗表明每日15分鐘分散複習比每週一次2小時集中苦讀取得更高的詞彙記憶分數。安全推論為：高頻短間隔複習與較高的詞彙保留率具相關性。不能誇大為保證母語流利。',
    '學習科學審慎結論：短時分散訓練勝於長時集中突擊。',
    'spaced repetition',
    '/ˌspeɪst rep.əˈtɪʃ.ən/',
    '間隔重複間隔記憶法',
    'synaptic',
    '/sɪˈnæp.tɪk/',
    '突觸的神經突觸的')]),
 ('Numerical & Statistical Logic: Confusing Absolute Numbers with Percentages',
  '批判推理',
  'C2-GMAT18',
  [('In Metropolis, the total number of bicycle theft complaints registered with the police department fell from five '
    "thousand in 2020 to four thousand in 2022. The mayor boasted that Metropolis's municipal bicycle anti-theft "
    'program reduced the risk of bicycle theft by twenty percent. Which of the following, if true, reveals the '
    "statistical flaw in the mayor's claim?",
    'The total number of operational bicycles owned and ridden in Metropolis decreased by forty percent over the same '
    'two-year period.',
    'Motor vehicle carjackings in Metropolis increased by fifteen percent during the identical timeframe.',
    'The retail purchase price of anti-theft bicycle chain locks increased by eight percent.',
    'Metropolis allocated three hundred thousand dollars to create public bicycle lock stations.',
    '絕對數量與比例混淆 (Numbers vs. '
    'Percentages)：市長看到失竊報案總件數從5000降至4000（降20%），就自吹失竊風險降低20%。若全市自行車保有總數暴跌了40%（分母大幅縮水），則實際每台車失竊的風險反而是大幅上升的！',
    'GMAT 核心統計思維：忽視分母基礎總量變動 (Base Rate & Denominator Shift)。',
    'carjacking',
    '/ˈkɑːrˌdʒæk.ɪŋ/',
    '劫車搶劫車輛',
    'complaint',
    '/kəmˈpleɪnt/',
    '投訴申訴報案怨言'),
   ("A hospital administrator declared: 'Hospital A is far more hazardous for surgical patients than Hospital B "
    'because Hospital A recorded two hundred postoperative surgical infections last year, whereas Hospital B recorded '
    "only fifty.' Which of the following exposes the flaw in this comparison?",
    'Hospital A performed ten thousand surgeries last year, whereas Hospital B performed only one thousand.',
    'Hospital A employs twice as many registered nurses as Hospital B.',
    'Hospital B specialized in outpatient cosmetic dental procedures.',
    'The average length of patient hospitalization at Hospital A was three days.',
    '忽視手術總量基數：A醫院感染200例，B醫院感染50例。若A醫院總共動了10,000台手術（感染率僅 2%），而B醫院只動了1,000台手術（感染率高達 5%），則A醫院手術安全率顯著高於B醫院！',
    '基數差異謬誤：絕對感染數不能代表真實感染率 (Infection Rate)。',
    'hazardous',
    '/ˈhæz.ɚ.dəs/',
    '危險的有害的具危害性的',
    'postoperative',
    '/ˌpoʊstˈɑː.pɚ.ə.t̬ɪv/',
    '術後的'),
   ('A pharmaceutical company celebrated that adverse allergic reactions to its new allergy spray accounted for only '
    '0.5% of all reported pharmaceutical allergic reactions nationwide, concluding that the spray is exceptionally '
    'safe. Why is this conclusion misleading?',
    'The allergy spray is an orphan drug prescribed to only a few dozen patients nationwide, while other drugs are '
    'taken by millions.',
    'Allergic reactions are typically characterized by nasal congestion and skin urticaria.',
    'The spray was developed in partnership with a European biotechnology institute.',
    'The retail cost of the spray is covered by prescription drug insurance formularies.',
    '市場份額極小造成的比例假象：該噴劑的過敏通報僅佔全國所有藥物過敏通報的0.5%，但若該藥是極小眾罕見病用藥（全國僅幾十人使用），其在自身使用者中的過敏發生率可能極高！',
    '全國總通報佔比與個體藥物發病率混淆謬誤。',
    'orphan drug',
    '/ˈɔːr.fən ˌdrʌɡ/',
    '罕見病藥物孤兒藥',
    'urticaria',
    '/ˌɝː.t̬əˈker.i.ə/',
    '蕁麻疹風疹塊'),
   ("A regional airline advertised: 'Fly with us—our flights accounted for only two percent of all delayed flights "
    "nationwide last month!' Which of the following, if true, most seriously undermines this promotional claim?",
    'The regional airline operates only 0.5% of all commercial flights scheduled nationwide.',
    'The airline operates turboprop regional planes on short-haul mountain routes.',
    'Commercial jet fuel costs increased by four percent across global supply hubs.',
    "The airline's customer service hotline received sixty thousand phone inquiries.",
    '比例與市場份額嚴重脫節：該航空公司班機只佔全國延誤航班的2%，聽起來很低；但若該航司的班機起降總量僅佔全國的0.5%，表示其延誤率高達全國平均的4倍！',
    '市場基數佔比錯覺：延誤份額高於飛行總量份額。',
    'turboprop',
    '/ˈtɝː.boʊ.prɑːp/',
    '渦輪螺旋槳飛機',
    'undermine',
    '/ˌʌn.dɚˈmaɪn/',
    '削弱損害破壞'),
   ("A school district claimed: 'Our scholarship tutoring initiative was a phenomenal success: the number of students "
    "receiving academic honors doubled from ten to twenty!' What context, if true, reveals the weakness of this boast?",
    'During the same academic year, the total high school student enrollment expanded from one hundred to one '
    'thousand.',
    'The tutoring initiative met for two hours every Tuesday and Thursday afternoon.',
    'Standardized state exam formats were transitioned from paper to digital terminals.',
    'The school district hired three additional certified mathematics instructors.',
    '分子翻倍但分母暴增：優等生由10人增至20人（增加一倍），但全校學生總數由100人暴增至1,000人（優等生比例由10%暴跌至2%），計畫實際上是失敗或倒退的。',
    '率與總量之分母稀釋：母體擴張導致優等生比例實質大跌。',
    'initiative',
    '/ɪˈnɪʃ.ə.t̬ɪv/',
    '倡議新方案主動權主導性',
    'enrollment',
    '/ɪnˈroʊl.mənt/',
    '入學人數註冊人數'),
   ('An industrial manufacturer claimed that workplace injuries had plummeted because the factory recorded thirty '
    'fewer injury incidents this year than last year. Which of the following, if true, most completely refutes the '
    "factory's claim of improved safety?",
    'Due to supply shortages, the factory operated with seventy percent fewer employee labor hours than it did the '
    'previous year.',
    'The factory manufactured hydraulic industrial valves for agricultural irrigation systems.',
    'OSHA inspectors conducted an unannounced walkthrough inspection in November.',
    'The factory spent fifty thousand dollars upgrading its emergency eye-wash stations.',
    '工時基數暴跌掩蓋工傷率上升：工傷件數雖然減少30件，但因斷料導致工廠全年生產總工時暴跌了70%，若以每百萬工時工傷率計算，工安風險反而顯著惡化！',
    '總量減少不等於事故率降低：忽視暴露時間（工時基數）。',
    'hydraulic',
    '/haɪˈdrɑː.lɪk/',
    '水力的液壓的水壓的',
    'unannounced',
    '/ˌʌn.əˈnaʊnst/',
    '突擊的不經預先通知的'),
   ("A venture capital investor asserted: 'Fintech startups are three times more likely to fail than Biotech startups "
    'because last year one hundred and fifty Fintech startups declared bankruptcy compared to only fifty Biotech '
    "startups.' What is the fundamental flaw in this reasoning?",
    'It compares the raw number of bankruptcies without accounting for the total number of startups founded in each '
    'industry.',
    'It assumes that venture capital funding rounds occur on fixed quarterly schedules.',
    'It overlooks that Biotech patents have a statutory duration of twenty years.',
    'It fails to define whether software development costs exceed laboratory reagent costs.',
    '忽視行業總基數：Fintech 破產150家，Biotech 破產50家。若市場上總共有1,500家 Fintech（破產率10%），而只有100家 Biotech（破產率高達50%），則生技公司失敗率高得多！',
    '絕對破產數與破產概率混淆謬誤。',
    'fintech',
    '/ˈfɪn.tek/',
    '金融科技金融科技公司',
    'reagent',
    '/riˈeɪ.dʒənt/',
    '試劑反應物'),
   ('A car insurer asserted that red sports cars are the most dangerous vehicles on the road because they are involved '
    'in more fatal collisions nationwide than yellow pickup trucks. What statistical omission undermines this '
    'conclusion?',
    'It fails to consider that red sports cars vastly outnumber yellow pickup trucks in total registered vehicles on '
    'the road.',
    'It ignores that sports car insurance premiums are fifteen percent higher on average.',
    'It assumes that sports cars possess smaller braking calipers than commercial pickup trucks.',
    'It takes for granted that sports car owners drive exclusively on interstate highways.',
    '車輛保有量基數差異：紅色跑車致命車禍總量多於黃色皮卡，但全美紅色跑車的總保有量若為黃色皮卡的五十倍，其每萬輛事故率很可能遠低於黃色皮卡。',
    '車輛總數基數偏差：未計算每單位車輛的暴露事故率。',
    'caliper',
    '/ˈkæl.ə.pɚ/',
    '卡鉗測徑器游標卡尺',
    'interstate',
    '/ˌɪn.t̬ɚˈsteɪt/',
    '州際的州際公路'),
   ("A municipal police chief announced: 'Our precinct is becoming dramatically safer: violent crime as a percentage "
    "of all reported crimes dropped from 30% to 15% this year.' Which finding exposes the chief's misleading rhetoric?",
    'The absolute number of violent crimes doubled, but reported non-violent property theft complaints increased '
    'tenfold.',
    'The police precinct purchased thirty new electric patrol cruisers.',
    'Neighborhood watch volunteers held weekly community safety briefings.',
    'Municipal court judges increased bail requirements for repeat felony offenders.',
    '相對比例掩蓋絕對暴力罪案飆升：暴力犯罪在總案件中佔比腰斬 (30%->15%)，看似治安改善；實際上暴力犯罪案件絕對數翻倍，只是因為竊盜案暴增十倍，將分母極端撐大！',
    '比例假象：其他分母項目惡性膨脹導致重點指標比例虛假下降。',
    'precinct',
    '/ˈpriː.sɪŋkt/',
    '警察轄區分局管區',
    'tenfold',
    '/ˈten.foʊld/',
    '十倍地'),
   ('A software company announced that its employee turnover rate was cut in half, dropping from 10% to 5% in one '
    'year, proving employee morale reached unprecedented heights. Which of the following, if true, reveals the flaw in '
    'this conclusion?',
    'The total headcount of the company expanded from one hundred to one thousand through aggressive entry-level '
    'hiring during the year, while the raw number of veteran resignations actually increased.',
    'Employee dental insurance benefits were outsourced to a regional provider.',
    'The human resources department introduced an anonymous digital suggestion box.',
    'The company relocated its corporate headquarters to an adjacent suburban office park.',
    '快速招募稀釋離職率：離職率由10%降至5%，但公司總人數因大量招收新人從100人擴增至1,000人（離職人數由10人增至50人），老鳥出走實質加劇，絕非士氣高昂！',
    '離職率被分母擴張稀釋：老員工離職總數實質激增。',
    'headcount',
    '/ˈhed.kaʊnt/',
    '總員工人數人數清點',
    'turnover',
    '/ˈtɝːnˌoʊ.vɚ/',
    '人員流動率營業額離職率')]),
 ('Numerical & Statistical Logic: Base Rate Fallacy & Proportion Disparity',
  '批判推理',
  'C2-GMAT19',
  [('A medical screening test for an ultra-rare blood syndrome (prevalence: 1 in 10,000 in the general population) has '
    'a 99% true-positive accuracy rate and a 1% false-positive rate. A randomly selected asymptomatic patient tests '
    "positive. The physician informs the patient that there is a 99% chance he has the disease. Why is the physician's "
    'assessment flawed?',
    'It ignores the low base rate of the disease: in a population of 10,000, approximately 100 healthy people will '
    'test positive compared to only 1 genuinely sick person, making the true probability around 1%.',
    'It assumes that blood samples were compromised by laboratory cross-contamination during centrifuging.',
    'It overlooks that false negatives are clinically more dangerous than false positives in acute epidemiology.',
    'It presumes that asymptomatic patients have higher immune antibody titers than symptomatic individuals.',
    '基本比率謬誤 (Base Rate '
    'Fallacy)：極罕見疾病（盛行率萬分之一），檢驗準確率99%，假陽性率1%。一萬人中只有1人真得病且檢驗陽性；但另外9999名健康人中有約100人出現假陽性！因此在所有陽性反應者中，真正得病的機率僅約 1/(1+100) '
    '≈ 1%，而非99%。',
    'GMAT 核心統計思維：忽視先驗基本比率 (Base Rate Neglect)。',
    'prevalence',
    '/ˈprev.əl.əns/',
    '盛行率流行率普遍程度',
    'asymptomatic',
    '/ˌeɪ.sɪmp.təˈmæt̬.ɪk/',
    '無症狀的未出現病徵的'),
   ('An airport security facial-recognition algorithm boasts 99% accuracy in identifying wanted fugitives, with a 1% '
    'false-match rate. In an airport processing one million passengers annually where five fugitives pass through, the '
    'system triggers alarms for any match. Why is an alarm trigger unlikely to identify an actual fugitive?',
    'Because the five actual fugitives are dwarfed by the roughly ten thousand false-positive alerts generated among '
    'the innocent travelers.',
    'Because fugitives frequently alter their biometric appearance via non-surgical disguise.',
    'Because airport security personnel do not receive uniform algorithmic audit training.',
    'Because the facial-recognition cameras rely on low-resolution ambient terminal lighting.',
    '百萬旅客中的基本比率失衡：100萬旅客中僅5名通緝犯（真陽性約5人）；但999,995名普通旅客中1%假警報高達約10,000人！任何一次警報響起，嫌犯在警報群體中的機率僅約 5/10005 ≈ '
    '0.05%，99.95%是無辜大眾。',
    '高基數稀有事件中的假陽性爆炸：警報真實概率極低。',
    'fugitive',
    '/ˈfjuː.dʒə.t̬ɪv/',
    '逃犯亡命之徒逃匿者',
    'dwarf',
    '/dwɔːrf/',
    '使相形見絀使顯得矮小矮化'),
   ('A bank automated fraud-detection software flags transactions with 98% accuracy, flagging 2% of legitimate '
    'purchases as fraudulent. Legitimate purchases occur at a rate of 999 to 1 fraudulent transaction. What is the '
    'fundamental reality when a transaction is flagged?',
    'The vast majority of flagged transactions are legitimate purchases because 2% of legitimate transactions vastly '
    'outnumbers 98% of fraudulent ones.',
    'Fraudulent transactions cost commercial banks less than five hundred dollars on average.',
    'Online e-commerce merchants bear the full liability for fraudulent payment chargebacks.',
    'Credit cardholders review their digital banking transaction statements twice weekly.',
    '交易詐欺風控基本比率：每1000筆交易僅1筆詐欺。1筆真詐欺被抓出（約0.98筆）；而999筆合法交易中2%被誤報（約20筆）。因此被警示的交易中，超過95%皆為正常合法消費誤報。',
    '風控演算法謬誤：合法交易龐大基底導致誤報佔絕大多數。',
    'fraudulent',
    '/ˈfrɑː.dʒə.lənt/',
    '詐欺的欺騙性的偽造的',
    'chargeback',
    '/ˈtʃɑːrdʒ.bæk/',
    '扣款拒付退單'),
   ('A polygraph examiner claimed that because the lie detector has an 85% accuracy rate, any job applicant who fails '
    'the polygraph test has an 85% likelihood of having lied during the employment screening. What error does this '
    'claim commit?',
    'It treats the conditional probability of failing given a lie as equal to the probability of having lied given a '
    'failed test, ignoring the proportion of truth-tellers in the applicant pool.',
    'It assumes that heart rate is unaffected by chronic physiological anxiety or caffeine consumption.',
    'It overlooks that polygraph exams are inadmissible in criminal jury trials in federal courts.',
    'It fails to calibrate the pneumatic chest sensor straps according to body mass index.',
    "條件機率逆轉謬誤 (Prosecutor's Fallacy / Confusion of Inverse)：將 P(測謊未過 | 說謊) = 85%，直接等同於 P(說謊 | 測謊未過) = "
    '85%。若應徵者中說實話者佔95%，假陽性人數將遠超真說謊人數。',
    '檢察官謬誤：倒置條件機率，忽視求職者說實話的先驗高比例。',
    'polygraph',
    '/ˈpɑː.li.ɡræf/',
    '測謊儀測謊器',
    'conditional probability',
    '/kənˈdɪʃ.ən.əl ˌprɑː.bəˈbɪl.ə.t̬i/',
    '條件機率條件概率'),
   ('A university cybersecurity team deployed an intrusion detection system with a 99% success rate and a 1% false '
    'positive rate. Network logs recorded fifty million legitimate data packets and only fifty unauthorized malicious '
    'intrusion packets daily. Why do IT engineers dismiss most intrusion warnings?',
    'Because the system generates approximately five hundred thousand false alarms daily compared to fewer than fifty '
    'true alarms.',
    'Because malicious hackers encrypt intrusion payloads with quantum-resistant keys.',
    'Because IT security personnel work eight-hour rotating shifts across operations centers.',
    'Because legitimate packets are processed through secondary proxy caching servers.',
    '網路封包警報疲勞：每日5000萬正常封包產生 1% 誤報 = 50萬筆假警報！而真入侵僅50筆。警報中99.99%是狼來了，造成嚴重的告警疲勞 (alert fatigue)。',
    '告警疲勞統計本質：海量正常樣本乘上微小誤報率壓垮真實訊號。',
    'payload',
    '/ˈpeɪ.loʊd/',
    '有效載荷攻擊酬載裝載量',
    'proxy',
    '/ˈprɑːk.si/',
    '代理伺服器代理人代權'),
   ('A rare genetic mutation that protects against coronary heart disease exists in 0.05% of the human population. A '
    'genetic sequencing assay produces a false-positive reading in 0.5% of samples without the mutation. If an '
    'individual receives a positive assay result, which statement is mathematically correct?',
    'The probability that the individual actually carries the protective mutation is substantially lower than 50%.',
    'The individual is guaranteed complete physiological immunity against myocardial infarction.',
    'The individual must repeat the assay using identical polymerase chain reaction primers.',
    'The genetic assay is invalid because the false-positive rate exceeds the mutation prevalence.',
    '真陽性率遠低於50%：基底突變率萬分之5 (0.05%)，假陽性千分之5 (0.5%)。假陽性率是真突變率的10倍！故每出現11個陽性結果，只有1個真帶因，個體真正帶因機率僅約 9%（遠低於50%）。',
    '貝氏機率核心演算：假陽性率超過先驗機率時，陽性預測值極低。',
    'myocardial',
    '/ˌmaɪ.oʊˈkɑːr.di.əl/',
    '心肌的心臟肌肉的',
    'infarction',
    '/ɪnˈfɑːrk.ʃən/',
    '梗塞梗死'),
   ("A corporate recruitment algorithm screens resumes for 'high executive potential.' Only 1% of the applicant pool "
    'genuinely possesses high potential. The algorithm accurately identifies 90% of high-potential candidates but '
    'misclassifies 10% of standard candidates as high potential. What proportion of candidates flagged by the '
    'algorithm are actually standard candidates?',
    'More than ninety percent, because 10% of the massive standard group vastly exceeds 90% of the tiny high-potential '
    'group.',
    'Precisely ten percent, corresponding exactly to the algorithmic misclassification rate.',
    'Zero percent, because machine learning models calibrate feature vectors iteratively.',
    'Fifty percent, assuming equal distribution of male and female professional applicants.',
    '演算法推薦的劣幣驅逐良幣：1000名求職者中僅10人真正高潛力（檢出9人）；其餘990名普通求職者中10%被誤貼標籤（99人）。被演算法推薦的108人中，有99人是普通人（佔 91.7%）！',
    '推薦系統假高潛力陷阱：普通樣本基數過大導致誤判者佔推薦群體九成以上。',
    'iteratively',
    '/ˈɪt̬.ɚ.ə.t̬ɪv.li/',
    '迭代地反覆地',
    'misclassify',
    '/ˌmɪsˈklæs.ə.faɪ/',
    '錯誤分類分錯類別'),
   ('A forensic breathalyzer deployed by traffic police has a 2% false-positive rate. On a typical commuter morning, '
    'only one in two thousand drivers has consumed alcohol above the legal limit. What occurs when a morning commuter '
    'triggers a positive breathalyzer reading?',
    'The driver is statistically almost certain to be completely sober, as false positives outnumber true violators by '
    'roughly forty to one.',
    'The breathalyzer internal infrared spectroscopic fuel cell has suffered physical corrosion.',
    'The police officer is legally mandated to impound the motor vehicle on the spot.',
    "The driver's blood alcohol concentration must exceed 0.08 grams per deciliter.",
    '晨間酒測假陽性碾壓真酒駕：2000名通勤司機中僅1人酒駕（真陽性1人）；但1999名清醒司機中 2% 誤報高達約 40 人。每出現41次呼氣警報，有40次是司機完全清醒被冤枉！',
    '晨間呼氣測試偏差：清醒人口壓倒性基底導致假陽性率高達40比1。',
    'breathalyzer',
    '/ˈbreθ.ə.laɪ.zɚ/',
    '呼氣酒精測試儀酒測器',
    'spectroscopic',
    '/ˌspek.trəˈskɑː.pɪk/',
    '光譜的光譜學的'),
   ('A factory quality-control scanner inspects microchips. The defect rate on the assembly line is 0.1%. The scanner '
    'correctly flags 99% of defective chips and incorrectly flags 1% of flawless chips. What is the likelihood that a '
    'flagged microchip is actually flawless?',
    'Approximately ninety percent, because 1% of the flawless chips represents ten times as many units as 99% of the '
    'defective chips.',
    "Under one percent, because the scanner's detection accuracy exceeds ninety-eight percent.",
    'Fifty percent, because industrial sensors produce symmetrical Gaussian distribution errors.',
    'One hundred percent, because silicone substrate wafer defects cannot be identified by optical scanners.',
    '晶片瑕疵品剔除悖論：10,000片晶片中只有10片瑕疵（檢出約10片）；但9,990片良品中1%被誤殺（約100片）。被機器標記剔除的110片中，有100片是良品（瑕疵標記中良品佔比高達 91%）！',
    '品質工程檢驗成本困境：超低不良率下誤殺良品數量龐大。',
    'flawless',
    '/ˈflɑː.ləs/',
    '完美無瑕的無缺陷的',
    'substrate',
    '/ˈsʌb.streɪt/',
    '基板底層基質'),
   ("An investigative journalist claimed: 'Seventy percent of prison inmates convicted of petty burglary played "
    'violent video games in their youth, proving that playing video games increases the likelihood of committing '
    "burglary.' What critical piece of baseline information is missing from this reasoning?",
    'The proportion of non-criminal individuals in the general population who also played violent video games during '
    'their youth.',
    'The retail sales figures of major video game console manufacturers over the preceding decade.',
    'The average sentence duration served by petty burglary convicts in state correctional facilities.',
    'Whether the convicted inmates completed secondary educational general equivalency diplomas.',
    '忽視一般大眾先驗對照比例：囚犯中有70%玩暴力電玩。若在非犯罪的一般正常青年群體中，玩暴力電玩的人數比例也是70%（甚至更高），則玩電玩與入獄竊盜毫無統計相關性！',
    '缺乏基線對照組之因果謬誤：必須檢驗母體基礎背景比例。',
    'burglary',
    '/ˈbɝː.ɡlɚ.i/',
    '夜盜竊盜入室盜竊',
    'equivalency',
    '/ɪˈkwɪv.ə.lən.si/',
    '同等等值等價性')]),
 ('Business Strategy Scenarios: Price Elasticity & Revenue vs. Profit Trade-offs',
  '批判推理',
  'C2-GMAT20',
  [('A premium coffee roasting chain lowered its beverage prices by twenty percent across all metropolitan stores and '
    'achieved a thirty percent surge in total transaction volume. Management celebrated that the discounting strategy '
    'was an unqualified financial success that boosted gross profitability. Which of the following, if true, reveals '
    "the serious flaw in management's celebration?",
    'The cost of coffee beans, milk, and hourly barista labor per cup remained fixed, causing total operating expenses '
    'to surge faster than the modest four percent increase in gross revenue.',
    'The coffee chain introduced two new organic herbal iced tea options on its seasonal menu.',
    'A competing bakery chain expanded its morning breakfast sandwich promotional offerings.',
    'Corporate headquarter office rent increased by three percent due to commercial inflation indexation.',
    '降價衝量利潤反蝕陷阱 (Volume vs. Margin Trade-off)：降價20%（價格變0.8），銷量增30%（銷量變1.3），總營收變為 0.8 * 1.3 = '
    '1.04（僅微增4%）。但每杯咖啡的原料與咖啡師時薪等可變成本是固定發生的，銷量激增30%導致總可變成本暴增30%，總毛利實質嚴重腰斬！',
    'GMAT 商業策略核心：營收 (Revenue) 增加不等於毛利 (Gross Profit) 成長。',
    'elasticity',
    '/ˌiː.læsˈtɪs.ə.t̬i/',
    '彈性伸縮性適應性',
    'barista',
    '/bəˈriː.stə/',
    '咖啡師咖啡調理員'),
   ('An enterprise SaaS software vendor doubled the annual subscription price for its flagship CRM platform. Over the '
    'next year, customer churn reached twenty-five percent as smaller clients defected to cheaper alternatives. The '
    'CEO asserted that the price hike was a disastrous strategic misstep. Which finding, if true, most undermines the '
    "CEO's pessimistic appraisal?",
    'Total annual subscription revenue increased by fifty percent because the seventy-five percent of clients who '
    'remained each paid double the original price.',
    'The SaaS vendor increased its customer service headcount by five junior support representatives.',
    'Competing CRM software platforms experienced minor server latency downtime during the third quarter.',
    "The vendor's chief marketing officer presented a keynote speech at a major technology summit.",
    '價格需求彈性不具彈性 (Inelastic Demand)：價格漲100%（變2.0），即使流失25%客戶（剩餘0.75），總營收仍為 2.0 * 0.75 = '
    '1.50（暴增50%！）。且服務客戶數減少25%，伺服器頻寬與客服成本大幅下降，淨利潤極速飆升，絕非戰略失策！',
    'SaaS 軟體定價權思維：高留存客戶帶來的溢價大幅超過少數流失客戶。',
    'flagship',
    '/ˈflæɡ.ʃɪp/',
    '旗艦的旗艦產品王牌',
    'defected',
    '/dɪˈfek.tɪd/',
    '叛離脫離倒戈轉向'),
   ('A luxury wristwatch manufacture slashed production output by fifty percent while raising the retail sticker price '
    'of its timepieces from $10,000 to $30,000, creating long retail waiting lists. An equities analyst warned that '
    'halving unit sales volume would inevitably ruin corporate profitability. What dynamic did the analyst fail to '
    'consider?',
    'Tripling the price while cutting volume in half increased total gross revenue by fifty percent while dramatically '
    'reducing total manufacturing and raw material costs.',
    "The watchmaker's master horologists receive specialized apprenticeships in the Swiss Jura canton.",
    'Stainless steel commodity spot market prices fluctuated by five percent during the year.',
    'The watchmaker opened a single boutique showroom in central Tokyo.',
    '奢侈品飢餓定價的超額毛利：產量減半 (0.5)，價格變3倍 (3.0)，總營收變 0.5 * 3 = '
    '1.5倍（增長50%！）。同時手錶製造總成本腰斬50%，毛利率與淨利大幅暴漲。分析師死板盯著銷量減半，完全忽視了超額定價權與成本減半帶來的利潤爆發。',
    '奢侈品定價經濟學：產量減半搭配價格三倍帶來利潤極限暴增。',
    'horologist',
    '/həˈrɑː.lə.dʒɪst/',
    '鐘錶學家鐘錶製造名匠',
    'timepiece',
    '/ˈtaɪm.piːs/',
    '時計鐘錶手錶'),
   ('A budget regional airline eliminated complimentary checked baggage and instituted a forty-dollar fee per bag. '
    'Within three months, total passenger bookings fell by five percent. Wall Street analysts concluded that baggage '
    'fees eroded airline earnings. Which of the following, if true, most seriously challenges this conclusion?',
    'Ancillary baggage fee collections generated seventy million dollars, vastly exceeding the ten million dollars in '
    'ticket revenue lost from departing passengers.',
    'The airline operated a fleet comprised exclusively of modern Boeing 737 aircraft.',
    'Flight attendants attended weekend workshops on de-escalating customer baggage disputes.',
    'Jet fuel consumption remained stable despite marginally lighter passenger luggage weights.',
    '附加營收 (Ancillary Revenue) 抵消客流微跌：機票訂位雖跌5%（損失1000萬機票收入），但行李收費單項暴賺7000萬附加營收，淨收益大幅多賺6000萬！',
    '輔助收入策略評估：微小客流流失換取超額輔助利潤。',
    'ancillary',
    '/ænˈsɪl.er.i/',
    '輔助的附加的副業的',
    'complimentary',
    '/ˌkɑːm.pləˈmen.t̬ɚ.i/',
    '免費贈送的讚美的'),
   ('A streaming media conglomerate raised its monthly subscription fee by 10% and spent ten million dollars acquiring '
    'exclusive rights to an acclaimed television drama series. Over the quarter, subscriber numbers grew by 2%. The '
    'head of finance declared that the content acquisition was directly responsible for the revenue growth. What '
    'alternative explanation undermines this claim?',
    'The entire revenue growth can be accounted for by the ten percent price increase on preexisting sticky '
    'subscribers, while the new content attracted negligible net additions.',
    'The television series received three nominations at an international entertainment awards ceremony.',
    'The streaming service redesigned its mobile user interface to support portrait video playback.',
    'Competitor streaming platforms also introduced original science-fiction documentary programming.',
    '價格調漲與內容投資混淆歸因：營收成長並非因為花重金買劇吸引了新客，而是既有老訂戶承擔了10%漲價所帶來的被動營收擴張，買劇可能根本是賠錢買賣。',
    '營收增長拆解 (Revenue Decomposition)：混淆量價分離的根本因果。',
    'acclaimed',
    '/əˈkleɪmd/',
    '廣受好評的大受讚賞的',
    'negligible',
    '/ˈneɡ.lə.dʒə.bəl/',
    '微不足道的可以忽略的'),
   ("A fast-food franchise chain introduced a 'One-Dollar Value Menu' to undercut competitors, resulting in a fifty "
    'percent spike in total customer foot traffic and record total gross revenue. Yet at the end of the fiscal '
    'quarter, net operating income fell to zero. Which factor best explains this financial outcome?',
    'Customers who previously purchased profitable eight-dollar combo meals systematically downgraded to items sold '
    'below unit production cost on the value menu.',
    'The franchise launched a national television advertising campaign featuring animated mascots.',
    'Local minimum wage regulations in three states increased by twenty-five cents per hour.',
    'The franchise sourced paper beverage cups from a certified sustainable forestry supplier.',
    '產品線利潤自相殘殺 (Cannibalization)：超低價菜單吸引人潮並衝高總營收，但原先買高毛利8元套餐的忠實客戶紛紛降級改吃賠本賣的1元特價餐，導致毛利全被侵蝕殆盡，淨利歸零！',
    '自相殘殺效應 (Cannibalization)：低價產品侵蝕高利潤主產品線。',
    'franchise',
    '/ˈfræn.tʃaɪz/',
    '特許加盟特許經營權',
    'mascot',
    '/ˈmæs.kɑːt/',
    '吉祥物'),
   ('A pharmaceutical company held an exclusive patent on a life-saving respiratory inhaler, pricing it at $400 per '
    'unit where unit manufacturing cost was $10. Faced with public outrage, the firm lowered the price to $100. '
    'Despite selling twice as many inhalers, gross profit from the inhaler dropped by fifty percent. Why did gross '
    'profit decline?',
    'Because a seventy-five percent price reduction requires a fourfold increase in unit sales merely to match the '
    'previous gross profit margin.',
    'Because generic inhaler alternatives entered the market upon chemical patent expiry.',
    'Because the corporate public relations department spent five million dollars on goodwill advertisements.',
    'Because medical clinics stocked thirty days of inventory in warehouse distribution freezers.',
    '降價幅度與銷量擴張彈性失衡：原先單價400成本10，每支賺390。降為100後每支賺90。要維持原有利潤，銷量必須擴增 390/90 = 4.33 倍！銷量僅翻倍（2倍）遠遠無法彌補單位毛利的巨大蒸發，導致毛利暴跌一半。',
    '毛利率降幅損益平衡公式：大降價需巨幅銷量才能損益平衡。',
    'respiratory',
    '/ˈres.pə.rə.tɔːr.i/',
    '呼吸的呼吸器官的',
    'inhaler',
    '/ɪnˈheɪ.lɚ/',
    '吸入器噴霧器'),
   ('An electric vehicle startup sold thirty thousand cars last quarter and generated five billion dollars in revenue, '
    'yet posted a two-billion-dollar net loss. The founder promised that doubling production to sixty thousand cars '
    'next quarter will guarantee net profitability. What critical economic assumption does the founder rely upon?',
    'That economies of scale will compress fixed overhead and marginal production costs per unit sufficiently below '
    'the selling price.',
    'That raw lithium carbonate commodity prices will remain completely frozen for the next five years.',
    'That state environmental emission credits can be auctioned to overseas diesel truck builders.',
    'That all sixty thousand manufactured vehicles will be painted in metallic pearl white.',
    '規模經濟轉正關鍵假設：產量翻倍要實現轉虧為盈，必須假設規模效應 (economies of scale) 能將固定分攤成本及每輛車的邊際製造成本壓低到售價以下，否則賣越多虧越多。',
    '規模經濟轉正必要假設：邊際利潤必須高於平均固定成本分攤。',
    'lithium',
    '/ˈlɪθ.i.əm/',
    '鋰鋰元素',
    'overhead',
    '/ˈoʊ.vɚ.hed/',
    '經常性開銷營運間接成本'),
   ('A high-end audio headphone maker offered a twenty-five percent trade-in discount for any customer recycling an '
    "older competitor's model. Total quarterly sales grew by forty percent, and net gross profits increased by thirty "
    "percent. What does this outcome reveal about the company's customer demand elasticity?",
    'Customer demand was highly price-elastic, and the discount successfully captured high-margin market share from '
    'competing brands without eroding brand pricing power.',
    'Headphone consumers prioritize wireless Bluetooth codec latency above industrial design.',
    'Raw titanium driver components became fifteen percent cheaper on global commodity exchanges.',
    'Competitor headphone brands ceased all digital display banner advertising campaigns.',
    '高彈性掠奪市場份額：降價25%換購帶動銷量大漲40%且淨毛利增30%，證明市場需求具高度價格彈性，精準收割了競品客戶，擴大了利潤池。',
    '價格彈性實證：彈性大於1且成功奪取對手高利潤份額。',
    'codec',
    '/ˈkoʊ.dek/',
    '編解碼器',
    'elastic',
    '/iˈlæs.tɪk/',
    '有彈性的靈活的彈力的'),
   ('A subscription meal-kit startup doubled its customer acquisition marketing spend, driving a sixty percent '
    'increase in active registered paying households. However, customer lifetime value (LTV) dropped below customer '
    'acquisition cost (CAC). Why is this business trajectory unsustainable?',
    'Because each newly acquired customer costs more to sign up than the cumulative gross profit generated over their '
    'tenure, widening corporate operating cash burns.',
    'Because organic produce distribution hubs require specialized refrigerated climate lockers.',
    'Because recipe development chefs demand royalty bonuses for vegan dinner recipe cards.',
    'Because packaging cardboard costs fluctuate during peak holiday e-commerce shipping seasons.',
    '單位經濟模型崩潰 (LTV < CAC)：當獲客成本 (CAC) 高於顧客終生價值 (LTV)，每多增加一個付費客戶，公司累計虧損就擴大一次，規模擴張只會加速現金焚燒走向破產。',
    'SaaS / 訂閱制核心財務健康指標：LTV 必須大於 CAC 的3倍以上。',
    'tenure',
    '/ˈten.jɚ/',
    '任期存續期保有權',
    'trajectory',
    '/trəˈdʒek.tɚ.i/',
    '軌道軌跡發展路徑')]),
 ('Business Strategy Scenarios: Competitive Advantage & Barrier to Entry',
  '批判推理',
  'C2-GMAT21',
  [('A retail clothing company invented a novel waterproof jacket fabric using standard, unpatented polyester weaving '
    'machinery and saw its operating profit margins reach forty percent. The CEO declared that this proprietary fabric '
    "will secure the company's market dominance for the next decade. Why is the CEO's declaration overly optimistic?",
    'Because the absence of patent protection and reliance on standard machinery allows well-capitalized competitors '
    'to easily reverse-engineer and replicate the fabric, eliminating the barrier to entry.',
    'Because international shipping container freight rates are projected to increase by five percent.',
    'Because consumer fashion trends consistently favor down-filled parkas over waterproof shells.',
    'Because synthetic polyester is derived from non-renewable petrochemical petroleum feedstocks.',
    '護城河與進入壁壘 (Barriers to Entry)：該布料既無專利保護，又使用市面上標準通用的聚酯織機生產。競爭對手只需購買樣品反向工程，即可立即仿造生產，高利潤將迅速被競爭對手抹平，不具備任何持久競爭優勢。',
    '邁克爾·波特五力模型：缺乏技術專利與資產專用性，無法建立防禦壁壘。',
    'replicate',
    '/ˈrep.lɪ.keɪt/',
    '複製重現仿造',
    'polyester',
    '/ˌpɑː.liˈes.tɚ/',
    '聚酯纖維滌綸'),
   ('A ride-hailing company spent billions on passenger fare subsidies and driver sign-up bonuses to capture eighty '
    'percent of a metropolitan market, asserting it had built an insurmountable economic moat. Once subsidies were '
    'curtailed, market share collapsed back to twenty percent within four months. What fundamental strategic weakness '
    'was exposed?',
    'The platform possessed zero switching costs for riders and drivers, who immediately migrated to rival '
    'applications offering lower prices and higher compensation.',
    'Metropolitan municipal authorities mandated that all ride-hailing vehicles pass annual smog tests.',
    'Smartphone manufacturers released updated mobile operating system location protocols.',
    'Automobile leasing finance companies increased interest rates on commercial fleet loans.',
    '轉換成本為零 (Zero Switching Costs)：靠補貼堆出來的市佔率並非護城河。乘客與司機的手機皆裝有競品App，切換成本為零，補貼一停立刻跳槽，證明純補貼模式無法沉澱競爭優勢。',
    '平台經濟學缺陷：網絡效應若無高轉換成本綑綁，黏著度極低。',
    'insurmountable',
    '/ˌɪn.sɚˈmaʊn.t̬ə.bəl/',
    '難以克服的無法逾越的',
    'curtail',
    '/kɚˈteɪl/',
    '縮減削減截減限制'),
   ('An industrial robotics startup holds dozens of defensible international patents on its robotic surgical arm '
    'joints. An equity analyst concluded that the startup will quickly displace the incumbent market leader who has '
    'operated in regional hospitals for twenty years. What structural barrier to entry did the analyst disregard?',
    'High hospital switching costs and institutional entrenchment, where surgeons are already extensively trained on '
    "the incumbent's proprietary software and hospital procurement contracts run for decades.",
    "The startup's robotic surgical arms are fabricated from aircraft-grade anodized aluminum.",
    'Surgical nurse unions bargain collectively for mandatory overtime rest provisions.',
    'Federal patent renewal fees must be paid to the patent office every four fiscal years.',
    '既有體系轉換成本與制度壁壘：雖然新創擁有專利，但外科手術儀器涉及長期合約、醫生多年形成的操作肌肉記憶與培訓認證，醫院轉換系統的隱性成本與醫療事故風險極高，形成巨大阻力。',
    '醫療器械護城河：資產與培訓專用性帶來的深度體制綁定。',
    'entrenchment',
    '/ɪnˈtrentʃ.mənt/',
    '根深蒂固確立堅固體制',
    'anodized',
    '/ˈæn.ə.daɪzd/',
    '陽極氧化的'),
   ('A social networking platform achieved one hundred million active users primarily because every new user makes the '
    'service more valuable to all existing users by expanding communication connections. A new startup launched a '
    'clone with superior graphics and zero ads. Why will the clone struggle to capture market share?',
    'The incumbent platform benefits from massive direct two-sided network effects that cannot be easily replicated by '
    'aesthetic or cosmetic enhancements alone.',
    'Digital mobile advertising spending accounts for fifty percent of global marketing allocations.',
    'Server cloud hosting providers charge tiered bandwidth fees based on gigabyte throughput.',
    'Social media algorithms prioritize short-form vertical video over textual discussion boards.',
    '雙向網絡效應 (Direct Network Effects)：社交平台的核心價值在於全體社交關係鏈的存在（朋友都在這裡）。單純優化介面美觀或去廣告，根本無法撬動巨大網絡效應構建的超級護城河。',
    '網絡效應護城河：社交關係圖譜難以單憑介面優化遷移。',
    'aesthetic',
    '/esˈθet̬.ɪk/',
    '美學的美感的美術的',
    'throughput',
    '/ˈθruː.pʊt/',
    '吞吐量生產能力處理量'),
   ('A pharmaceutical conglomerate manufactures an off-patent, complex sterile injectable chemotherapy formulation '
    'requiring multi-million-dollar cold-chain bioreactors and rigorous regulatory sanitary clearance. Despite holding '
    'zero patents, the conglomerate has faced zero competition for fifteen years. What constitutes its competitive '
    'moat?',
    'High manufacturing complexity, stringent regulatory compliance costs, and low market volume that make generic '
    'entry economically unattractive and technically hazardous.',
    'The chemotherapy medication was originally discovered in marine deep-sea sponge sponges.',
    'Oncologists prescribe chemotherapy combinations alongside oral corticosteroid pills.',
    'Hospital oncology suites are sterilized with gaseous hydrogen peroxide vapors.',
    '高技術門檻與監管壁壘：即使專利過期，無菌注射劑需要極度昂貴的生物反應爐與嚴苛查驗認證；市場規模有限，仿製藥廠投資數千萬無法回收，形成了自然技術與監管護城河。',
    '小眾高難度製藥護城河：監管合規 + 重資產無菌製造雙重防護。',
    'injectable',
    '/ɪnˈdʒek.tə.bəl/',
    '可注射的注射劑',
    'stringent',
    '/ˈstrɪn.dʒənt/',
    '嚴格的苛刻的緊縮的'),
   ('A semiconductor foundry invests twenty billion dollars annually in extreme ultraviolet lithography research and '
    'cleanroom fabrication infrastructure, while smaller competitors spend only one billion. Why does this capital '
    'disparity create a widening competitive advantage?',
    'Immense capital expenditure economies of scale create a self-reinforcing flywheel where higher chip yields drive '
    'lower unit costs and fund subsequent generational technology leads.',
    'Extreme ultraviolet lithography relies on mirrors polished with deuterium vapor deposition.',
    'Cleanroom technicians wear electrostatic discharge suits fabricated from carbon filaments.',
    'Semiconductor silicon ingots are sliced into wafers using high-speed diamond wire saws.',
    '資本重資產飛輪效應 (Capital Moat & Flywheel)：每年200億美元的巨大資本支出形成良性循環：最高良率 -> 最低單位成本 -> 囊括全球大訂單獲利 -> 投資下一代製程，將小對手永遠甩在身後。',
    '半導體晶圓代工護城河：重資本支出 + 學習曲線良率累積。',
    'foundry',
    '/ˈfaʊn.dri/',
    '晶圓代工廠鑄造廠',
    'flywheel',
    '/ˈflaɪ.wiːl/',
    '飛輪慣性輪良性循環機制'),
   ('An international enterprise software firm provides enterprise resource planning (ERP) suites embedded in the '
    "daily accounting, inventory, and human resources operations of Fortune 500 multinationals. What makes this firm's "
    'customer base exceptionally defensible?',
    'Extreme operational switching costs, where replacing the ERP system risks crippling business-critical operations, '
    'causing corporate clients to renew indefinitely regardless of price hikes.',
    'The ERP software suite was originally coded in the C++ object-oriented programming language.',
    'Fortune 500 corporations maintain branch offices across at least four international continents.',
    'Human resources managers conduct annual performance appraisals every December.',
    '極端更換風險 (Catastrophic Switching Risk)：ERP深度嵌入巨型跨國企業的會計、庫存與人資核心神經。抽換ERP如同心臟移植，稍有不慎全公司停擺，企業寧願承受漲價也絕不輕易更換。',
    '企業級ERP護城河：營運命脈綁定所形成的絕對更換成本。',
    'crippling',
    '/ˈkrɪp.əl.ɪŋ/',
    '癱瘓性的嚴重削弱的致殘的',
    'indefinitely',
    '/ɪnˈdef.ə.nət.li/',
    '無限期地持續地'),
   ('A regional aggregate stone quarry supplies crushed rock for highway concrete within a fifty-mile radius. A '
    'distant quarry offering ten-percent cheaper stone attempts to take its corporate clients. Why will the distant '
    'quarry fail?',
    'High geographical transport freight costs make crushed stone an economically localized commodity where distance '
    'quickly negates any production price discount.',
    'Crushed limestone possesses a calcium carbonate purity rating exceeding ninety-five percent.',
    'Highway asphalt contractors use pneumatic pneumatic steamrollers to compress roadbed ballast.',
    'Quarry workers must complete federal mine safety health administration training modules.',
    '地理位置與物流半徑護城河 (Geographic Moat)：碎石等大宗建材價值低、重量極大，長途卡車運費極其高昂。超出50英里運費就大幅超過價差，形成天然地理壟斷保護。',
    '重物料物流護城河：物流成本半徑限制外來低價競爭者。',
    'quarry',
    '/ˈkwɔːr.i/',
    '採石場石礦採石',
    'negate',
    '/nɪˈɡeɪt/',
    '抵消否定使無效'),
   ('A global athletic shoe brand spends five hundred million dollars annually on athlete endorsements and cultural '
    'marketing, charging a thirty-percent price premium over unbranded shoes of identical physical quality. What '
    'barrier to entry protects this profit premium?',
    'Intangible brand equity and emotional affinity that confer social status, which competitors cannot duplicate '
    'merely by manufacturing physically comparable footwear.',
    'Athletic shoe midsoles are molded from expanded thermoplastic polyurethane foam pellets.',
    'Rubber sole vulcanization ovens operate at temperatures of 150 degrees Celsius.',
    'Container ships transport manufactured footwear across transpacific commercial trade lanes.',
    '無形品牌資產 (Brand Equity Moat)：運動鞋核心價值不在於橡膠發泡底，而在於頂級球星代言與文化符號帶來的心理溢價與社交身分認同，單純製造同等質感的鞋子無法撼動其品牌定價權。',
    '消費品品牌護城河：情感溢價與身分象徵難以靠純代工模仿。',
    'affinity',
    '/əˈfɪn.ə.t̬i/',
    '親和力密切關係喜愛認同',
    'thermoplastic',
    '/ˌθɝː.moʊˈplæs.tɪk/',
    '熱塑性的熱塑性塑料'),
   ('A digital marketplace connecting independent freelance translators with multinational corporations charges a '
    'fifteen percent transaction commission. A new fee-free platform enters the market. Why might the incumbent '
    'marketplace retain its dominant market share?',
    'Because two-sided liquidity and established counterparty reputation ratings keep both translators and corporate '
    'clients locked into the existing active marketplace.',
    'Because professional translators frequently possess academic certification in literary translation.',
    'Because corporate purchase orders must be approved by internal accounts payable controllers.',
    'Because internet translation platforms utilize cloud-based neural machine translation APIs.',
    '雙向流動性與信用評價護城河 (Two-Sided Marketplace Liquidity)：翻譯平台最重要的不是免手續費，而是『海量隨選買家』與『累積多年信用評價的優秀譯者』。無人流動性的新平台即使免費也無法成交。',
    '雙邊市場護城河：評價資產與即時流動性構建防禦深溝。',
    'liquidity',
    '/lɪˈkwɪd.ə.t̬i/',
    '流動性資金週轉變現能力',
    'counterparty',
    '/ˈkaʊn.t̬ɚˌpɑːr.t̬i/',
    '交易對手契約當事人一方')]),
 ('Public Policy & Economics: Unintended Consequences & Moral Hazard',
  '批判推理',
  'C2-GMAT22',
  [('To improve rental housing affordability, a municipality enacted strict rent control capping residential rent '
    'increases at one percent annually. Within three years, affordable housing supply plummeted as landlords converted '
    'apartments to private condominiums or deferred building maintenance. Which economic concept best explains this '
    'outcome?',
    'Unintended policy consequences stemming from price ceilings that disincentivize housing maintenance and restrict '
    'rental capital investment.',
    'Moral hazard induced by asymmetric information between commercial banks and mortgage underwriters.',
    'Monopolistic price-gouging by regional municipal electric utility providers.',
    'Hyperinflation driven by municipal bond issuances for civic stadium construction.',
    '租金管制之意外後果 (Unintended Policy Consequences)：立意良善的租金天花板 (Price Ceiling) '
    '扭曲了價格訊號，房東因無利可圖不再維修房屋、或將出租公寓改裝為產權公寓出售，反而導致可負擔租屋供應大幅萎縮。',
    'GMAT 核心公共政策題型：價格上限的非意圖反向衝擊。',
    'condominium',
    '/ˌkɑːn.dəˈmɪn.i.əm/',
    '產權獨立公寓私有公寓',
    'disincentivize',
    '/ˌdɪs.ɪnˈsen.t̬ə.vaɪz/',
    '打擊積極性抑制促使放棄'),
   ('A national government instituted comprehensive deposit insurance guaranteeing one hundred percent of commercial '
    "bank depositors' funds against institutional collapse. Following the decree, commercial banks dramatically "
    'increased investments in volatile, high-yield speculative derivatives. What mechanism drove this risky behavior?',
    'Moral hazard: banks captured private profits from speculative upside while transferring downside systemic '
    'insolvency risks to the taxpayer guarantor.',
    'Regulatory capture by environmental sustainability non-governmental lobbying organizations.',
    'Adverse selection among elderly depositors seeking tax-free municipal retirement accounts.',
    'Technological disruption from decentralized cryptocurrency mining operations.',
    '道德風險 (Moral Hazard)：政府提供百分之百存款全額擔保，消除了存戶對銀行的監督機制；銀行高管賭贏了賺暴利，賭輸了由納稅人兜底，直接誘發了極端投機的道德風險。',
    '金融監管核心概念：全額存款保險引發的道德風險 (Moral Hazard)。',
    'insolvency',
    '/ɪnˈsɑːl.vən.si/',
    '無力償債破產倒閉',
    'guarantor',
    '/ˌɡer.ənˈtɔːr/',
    '擔保人保證人保證機構'),
   ('A city passed an ordinance requiring employers to provide thirty days of severance pay to any terminated worker. '
    'Within a year, full-time permanent corporate hiring stalled while temporary freelance gig contracts surged by '
    'forty percent. What explains this structural labor shift?',
    'Employers adapted to increased termination dismissal costs by substituting flexible short-term contract labor to '
    'avoid severance liability.',
    'Labor unions mandated that corporate apprentices complete four years of mechanical training.',
    'The municipality reduced corporate income tax rates on multinational software conglomerates.',
    'Workers voluntarily forfeited healthcare insurance benefits to seek flexible freelancing.',
    '解僱保護政策誘發之就業形式替代：強制高額資遣費增加了終止勞動契約的潛在負擔，雇主為規避法律義務，轉向僱用免付資遣費的零工與短期約聘人員，正職員缺大幅凍結。',
    '勞動經濟學意外後果：高解僱成本催生零工化與就業不穩定。',
    'severance',
    '/ˈsev.ɚ.əns/',
    '資遣費離職補償金中斷切斷',
    'ordinance',
    '/ˈɔːr.dən.əns/',
    '法令法規市政條例'),
   ('To curb municipal plastic waste, a city banned thin single-use plastic grocery bags. Supermarkets switched to '
    'distributing heavy multi-use polypropylene tote bags. Environmental lifecycle audits later revealed that total '
    'petroleum polymer usage in the city increased by twenty percent. What unintended flaw caused this failure?',
    'Consumers treated heavy multi-use polypropylene bags as disposable, discarding them after a single use despite '
    'their tenfold higher plastic resin mass.',
    'Polypropylene bags emit chlorofluorocarbons when composted in commercial municipal landfills.',
    'Supermarket chains purchased automated checkout scanning kiosks manufactured overseas.',
    "Consumers substituted organic cotton produce mesh bags during suburban farmers' markets.",
    '環保禁令之物質總量反噬：立法者忽視了消費者行為慣性。厚的不織布袋塑膠樹脂含量是一次性塑膠袋的十倍，若消費者仍將厚袋當作一次性垃圾丟棄，整體塑膠消耗量反而不減反增！',
    '環保政策反噬：忽視生命週期評估與消費慣性導致反效果。',
    'polypropylene',
    '/ˌpɑː.liˈproʊ.pə.liːn/',
    '聚丙烯不織布材質',
    'resin',
    '/ˈrez.ɪn/',
    '樹脂合成樹脂'),
   ('A provincial government instituted a subsidy reimbursing farmers for fifty percent of the electricity cost used '
    'to pump agricultural groundwater for irrigation. Within five years, regional water table aquifers dropped at '
    'three times their historic rate. What economic behavioral distortion occurred?',
    'The artificial price reduction for pumping electricity eliminated the market conservation price signal, '
    'incentivizing farmers to cultivate water-intensive cash crops in arid soils.',
    'Subsidized irrigation water was contaminated with trace agricultural chemical runoff.',
    'Farmers sold surplus electrical kilowatt-hours back to regional power grid distributors.',
    'Provincial agricultural extension agents distributed hybrid drought-resistant wheat grains.',
    '能源補貼誘發地下水過度抽榨：抽水電費減半消除了水資源稀缺的成本信號，農民因抽水極其便宜而擴大種植耗水經濟作物，加速抽乾地下含水層。',
    '資源經濟學扭曲：價格補貼摧毀自然資源節約動機。',
    'aquifer',
    '/ˈæk.wə.fɚ/',
    '含水層地下蓄水層',
    'arid',
    '/ˈer.ɪd/',
    '乾旱的貧瘠的乾燥的'),
   ('A healthcare agency required hospitals to publicly report 30-day postoperative mortality rates for cardiac bypass '
    'surgeries. Over subsequent years, reported mortality rates declined dramatically, but severely ill cardiac '
    'patients were increasingly turned away from surgical intervention. What unintended gaming of the metric occurred?',
    'Surgeons engaged in risk-selection cherry-picking, refusing to operate on high-risk, critically ill patients to '
    'protect their public clinical mortality metrics.',
    'Hospital cafeterias switched to offering organic plant-based patient recovery broths.',
    'Cardiac operating theaters were upgraded with robotic automated bypass heart-lung pumps.',
    'Postoperative nurses were required to complete annual continuing cardiology coursework.',
    '指標考核異化與挑選病患 (Gaming the Metric / Cherry-Picking)：公開死亡率評比導致外科醫生為求自保，拒收命懸一線的高危急症患者，只挑低風險手術動刀，表面指標漂亮但真正重症患者喪失救治機會。',
    "古德哈特定律 (Goodhart's Law)：當指標變成目標時，它就不再是好指標。",
    'bypass',
    '/ˈbaɪ.pæs/',
    '心臟繞道手術旁路外環道',
    'cherry-picking',
    '/ˈtʃer.i ˌpɪk.ɪŋ/',
    '挑三揀四擇優挑選'),
   ('A sovereign nation passed a law exempting small enterprises with fewer than fifty employees from stringent '
    'corporate reporting and mandatory worker benefit mandates. Five years later, economic census data revealed an '
    'immense clustering of firms with exactly forty-nine workers and a near-total absence of firms with fifty to '
    'seventy workers. What economic phenomenon is demonstrated?',
    'Regulatory notch distortion, where the substantial compliance cost cliff at the fifty-worker threshold creates a '
    'strong disincentive for small firms to expand organically.',
    'Small enterprises systematically underpaid corporate payroll taxes across provincial regions.',
    'Multinational industrial corporations purchased domestic enterprise patent assets.',
    'Employees in forty-nine-person firms formed unauthorized independent labor bargaining councils.',
    '政策斷崖門檻效應 (Regulatory Notch Effect)：在50人處設立高昂法規遵循成本斷崖，導致49人企業不敢多請1名員工，形成刻意壓抑成長、聚攏在49人的畸形現象。',
    '制度經濟學規管斷崖：斷點處的高負擔直接壓制企業規模擴張。',
    'notch',
    '/nɑːtʃ/',
    '刻痕斷崖階差特定等級',
    'clustering',
    '/ˈklʌs.tɚ.ɪŋ/',
    '群聚聚集聚類'),
   ('In an effort to eradicate venomous cobras, a colonial administration offered a cash bounty for every dead cobra '
    'delivered to municipal offices. The policy initially succeeded, but authorities soon discovered that citizens '
    'were secretly breeding cobras in domestic cellars to collect bounties. What is this classic unintended '
    'consequence called?',
    'The Cobra Effect, where a perverse financial incentive directly encourages the expansion of the very problem it '
    'was enacted to resolve.',
    'A negative Pigouvian environmental consumption externality on suburban housing.',
    "The prisoner's dilemma in non-cooperative game theoretic trade negotiations.",
    'Schumpeterian creative destruction in agricultural municipal economies.',
    '眼鏡蛇效應 (The Cobra Effect)：政府為消滅眼鏡蛇而按蛇頭發放獎金，民眾反而為了領取賞金開始私下大量飼養眼鏡蛇，獎勵機制直接催生並惡化了待解決的問題本身！',
    '經典博弈機制設計失敗：反向激勵導致目標完全走向反面。',
    'bounty',
    '/ˈbaʊn.t̬i/',
    '賞金獎勵金慷慨',
    'perverse',
    '/pɚˈvɝːs/',
    '反常的適得其反的墮落的'),
   ('A commercial insurance company introduced comprehensive full-coverage theft insurance with a zero-dollar '
    'deductible for luxury bicycles. Over the next six months, bike theft claims among policyholders tripled compared '
    'to the municipal average. What behavioral dynamic best explains this surge in claims?',
    'Moral hazard: policyholders became reckless in securing their bicycles because they bore zero financial loss in '
    'the event of theft.',
    'Adverse selection among bicycle lock manufacturers utilizing substandard magnesium alloys.',
    'Municipal police forces reallocated patrolling officers away from downtown transit hubs.',
    'Bicycle thieves utilized hydraulic angle grinders capable of cutting hardened boron steel.',
    '零自負額保險引發之道德風險：車主一旦全額受保且自負額為零，鎖車便不再謹慎，甚至隨意停放路邊，個人防範動機被徹底消解，竊案隨之暴增。',
    '保險經濟學道德風險：缺乏自負額 (Deductible) 誘發被保人疏忽怠惰。',
    'deductible',
    '/dɪˈdʌk.tə.bəl/',
    '保險免賠額自負額可扣除的',
    'reckless',
    '/ˈrek.ləs/',
    '魯莽的肆無忌憚的草率的'),
   ('To combat climate change, a government mandated that twenty percent of transportation diesel fuel must be blended '
    'with biodiesel derived from palm oil. What catastrophic international unintended consequence resulted?',
    'Tropical rainforests across Southeast Asia were clear-cut and burned to establish massive industrial palm oil '
    'monoculture plantations, releasing gigatons of sequestered carbon.',
    'Global commercial airline passenger ticket prices increased by fifteen percent on long-haul flights.',
    'Diesel automobile engine fuel injection nozzles suffered chronic particulate clog degradation.',
    'Domestic freight locomotives were replaced with electric high-speed passenger rail sets.',
    '生質燃油政策引發的熱帶雨林浩劫：立意良善的生質燃油配額法案大幅拉抬棕櫚油需求，導致印尼、馬來西亞大片熱帶雨林遭到砍伐焚燒改種油棕，釋放的碳排放遠高於燃油節省量！',
    '跨國意外外部性：替代能源需求誘發全球生態棲地毀滅。',
    'monoculture',
    '/ˈmɑː.nəˌkʌl.tʃɚ/',
    '單一作物栽培單一文化',
    'sequestered',
    '/sɪˈkwes.tɚd/',
    '封存的隔離的隱居的')]),
 ('Medical & Epidemiological Logic: Clinical Trials, Placebo & Selection Bias',
  '批判推理',
  'C2-GMAT23',
  [('A pharmaceutical trial evaluating a new weight-loss drug reported that subjects who completed the full '
    'twelve-month regimen lost an average of twenty-five pounds. However, sixty percent of the original participants '
    'dropped out within the first three months due to severe nausea. Why is the reported twenty-five-pound weight loss '
    'misleading?',
    'Attrition bias: the study evaluated only the highly tolerant survivor subpopulation, ignoring that the drug was '
    'intolerable for the vast majority of real-world patients.',
    'Publication bias in peer-reviewed clinical medicine journals.',
    'The trial did not mandate a daily caloric deficit of five hundred calories.',
    'Placebo control participants were not provided with digital weighing scales.',
    '損耗偏差/存活者偏差 (Attrition Bias / Survivor '
    'Bias)：報告僅統計完成一年療程的少數人（平均減重25磅），卻隱瞞了60%受試者因劇烈噁心早在前三個月棄賽。留下來的人代表耐受度極高的特殊體質，結論對一般臨床患者嚴重失真！',
    'GMAT 核心醫學統計邏輯：脫落率 (Dropout Rate) 引發之存活者偏差。',
    'attrition',
    '/əˈtrɪʃ.ən/',
    '人員耗損磨損消耗消磨',
    'intolerable',
    '/ɪnˈtɑː.lɚ.ə.bəl/',
    '無法忍受的難以耐受的'),
   ('A clinical trial of a candidate migraine medication was unblinded: both the patients and the attending '
    'neurologists knew whether each participant received the experimental drug or an inert sugar pill. The study '
    'concluded that the drug significantly reduced migraine intensity. What methodological defect invalidates this '
    'conclusion?',
    'Lack of double-blinding introduced profound placebo effects among patients and confirmation bias in physician '
    'symptom scoring.',
    'Migraine headaches are biologically correlated with cranial vascular constriction.',
    'The trial enrolled participants diagnosed with episodic tension headaches.',
    'The experimental drug was synthesized from synthetic ergot alkaloid compounds.',
    '雙盲缺失與主觀偏倚 (Double-Blinding Failure)：頭痛強度屬於完全主觀的自評症狀。病患知情會產生強大心理安慰劑預期；神經科醫生知情會帶著確認偏誤主觀打低分數，完全破壞試驗效度。',
    '臨床試驗方法論：雙盲設計 (Double-Blind) 是排除主觀評量偏倚之必備條件。',
    'unblinded',
    '/ʌnˈblaɪn.dɪd/',
    '非雙盲的揭盲的',
    'cranial',
    '/ˈkreɪ.ni.əl/',
    '顱骨的頭顱的腦的'),
   ('An observational study of fifty thousand healthcare professionals found that individuals who consumed four cups '
    'of coffee daily had a twenty percent lower risk of developing type 2 diabetes than non-coffee drinkers. The '
    'researchers concluded that coffee directly prevents diabetes. What confounding lifestyle factor threatens this '
    'conclusion?',
    'Coffee drinkers in the cohort engaged in thirty percent more physical exercise and had lower baseline body mass '
    'indices than the sedentary non-coffee drinkers.',
    'Commercial coffee roasters utilize robusta beans imported from equatorial nations.',
    'Caffeine binds antagonistically to adenosine neuro-receptors in the cerebral cortex.',
    'Non-coffee drinkers in the cohort consumed bottled sparkling mineral water.',
    '觀察性研究混雜變數 (Confounding Variable)：咖啡組與非咖啡組的生活型態存在巨大差異（喝咖啡者運動量高出30%、BMI更低）。是運動與體重控制預防了糖尿病，而非咖啡因的神效！',
    '流行病學混雜變數：未控制生活型態對照組之虛假因果。',
    'confounding',
    '/kənˈfaʊn.dɪŋ/',
    '混雜的使人困惑的干擾性的',
    'antagonistically',
    '/ænˌtæɡ.əˈnɪs.tɪ.kəl.i/',
    '對抗性地敵對地拮抗地'),
   ('A private fertility clinic advertised an eighty-five percent pregnancy success rate for in vitro fertilization, '
    'compared to the national average of forty-five percent. An investigation revealed that the clinic accepts only '
    'young women under age thirty with no prior history of reproductive pathologies, while turning away older or '
    "complex patients. What bias explains the clinic's stellar metric?",
    'Selection bias: the clinic artificially inflated its success rate by systematically cherry-picking the healthiest '
    'patients with favorable baseline prognoses.',
    'Recall bias among women completing retrospective pregnancy wellness questionnaires.',
    'Observer-expectancy bias during microscopic embryological cleavage inspections.',
    'Attrition bias resulting from couples relocating out of state during ovulation cycles.',
    '選擇性偏誤 (Selection Bias)：該診所只篩選收治30歲以下且無生殖病史的最優質年輕女性，直接拒收大齡高危患者。高成功率純粹是挑選病患的母體偏差，不代表醫療技術高超。',
    '醫療機構選擇偏差：透過苛刻篩選病患人為拉高成功率指標。',
    'pathology',
    '/pəˈθɑː.lə.dʒi/',
    '病理學病狀病症',
    'prognosis',
    '/prɑːɡˈnoʊ.sɪs/',
    '預後病況預測發展預測'),
   ('A randomized controlled trial of an experimental topical eczema ointment showed identical thirty-percent lesion '
    'clearance rates in both the medicated active group and the vehicle cream base group containing no active '
    'pharmaceutical ingredient. The pharmaceutical company claimed the active ingredient is effective. Why is this '
    'claim refuted?',
    'The therapeutic clearance was entirely attributable to the emollient moisturizing properties of the inactive base '
    'cream, proving the chemical drug added zero incremental efficacy.',
    'Eczema flares are triggered by psychological stress and environmental dry humidity.',
    'The trial enrolled six hundred pediatric patients across fifteen academic medical centers.',
    'The active pharmaceutical ingredient inhibited Janus kinase enzymatic signaling pathways.',
    '基質對照驗證無效 (Vehicle Control Failure)：含藥組與純潤膚基質霜組 (Vehicle Base) 的濕疹消退率完全相同（皆為30%）。證明皮膚好轉純粹是凡士林/保濕霜保濕所致，活性藥物毫無額外療效！',
    '藥物對照組邏輯：藥物療效必須顯著高於空白溶劑基質 (Vehicle Efficacy)。',
    'ointment',
    '/ˈɔɪnt.mənt/',
    '藥膏軟膏油膏',
    'emollient',
    '/ɪˈmɑːl.i.ənt/',
    '潤膚劑潤膚的使柔軟的'),
   ('A survey found that individuals who regularly take multivitamin supplements live an average of three years longer '
    'than those who do not. The authors concluded that multivitamin ingestion directly extends human longevity. Which '
    'finding casts the most severe doubt on this causal deduction?',
    'Individuals who purchase multivitamins are disproportionately affluent, have comprehensive health insurance, '
    'exercise regularly, and consume high-nutrient organic diets.',
    'Multivitamin capsules contain synthetic water-soluble B-complex vitamins.',
    'Elderly individuals require calcium supplementation to maintain bone mineral density.',
    'Multivitamins are manufactured under current Good Manufacturing Practice guidelines.',
    '健康意識混雜偏差 (Healthy User Bias)：規律買綜合維生素的人，本身多為注重健康、收入高、有全額醫保、規律運動、飲食優良的群體。是這套健康生活方式延長了壽命，維生素只是伴隨現象！',
    '流行病學健康用戶偏差 (Healthy User Bias)：維生素僅為健康意識的附屬標籤。',
    'longevity',
    '/lɑːnˈdʒev.ə.t̬i/',
    '長壽壽命持久性',
    'disproportionately',
    '/ˌdɪs.prəˈpɔːr.ʃən.ət.li/',
    '不成比例地'),
   ('A university health service tracked college freshmen who reported mild depressive symptoms. Over the course of '
    'the freshman year, seventy percent reported significant emotional improvement without taking medication. The '
    'wellness director claimed that student resilience naturally cures clinical depression. What statistical '
    'phenomenon did the director overlook?',
    'Regression to the mean: individuals who measure at extreme symptomatic peaks naturally revert toward their '
    'baseline emotional equilibrium over chronological time.',
    'Sampling bias resulting from surveying students residing exclusively in freshman dormitories.',
    'Observer bias among counselors conducting semi-structured diagnostic intake interviews.',
    'Hawthorne effects generated by students knowing they were enrolled in a longitudinal study.',
    '回歸平均值 (Regression to the Mean)：學生在入學適應期情緒處於極度低谷的極端值，隨著時間流逝，情緒自然回歸常態基準水平，不能輕率斷言為天然免疫抗體或自癒神話。',
    '統計與臨床偏誤：極端數值自然回歸平均線 (Regression to the Mean)。',
    'resilience',
    '/rɪˈzɪl.jəns/',
    '韌性恢復力適應力',
    'equilibrium',
    '/ˌek.wəˈlɪb.ri.əm/',
    '平衡均衡均勢'),
   ('In a study assessing a retrospective questionnaire on childhood dietary habits and adult arthritis, adults with '
    'severe arthritis remembered eating twice as much processed sugar as children compared to adults without '
    'arthritis. What cognitive bias compromises the accuracy of this dietary data?',
    'Recall bias: patients suffering from chronic painful illnesses scrutinize and exaggerate past perceived negative '
    'behaviors to explain their current physical suffering.',
    'Survivorship bias among elderly arthritis patients surviving past age eighty.',
    'Hindsight bias among orthopedic surgeons reviewing radiographic knee joint images.',
    'Selection bias driven by recruiting arthritis patients through television infomercials.',
    '回憶偏誤 (Recall Bias)：慢性關節炎重症患者身心痛苦，在回憶童年時會過度檢視並誇大自己吃糖等不良習慣以尋找生病理由；健康人則容易遺忘，導致回顧性問卷數據嚴重失真。',
    '回顧性病例對照研究之死穴：回憶偏誤 (Recall Bias)。',
    'retrospective',
    '/ˌret.rəˈspek.tɪv/',
    '回顧的回溯的追溯的',
    'arthritis',
    '/ɑːrˈθraɪ.t̬əs/',
    '關節炎'),
   ('An oncology trial evaluating a revolutionary immunotherapy regimen terminated early because interim analysis '
    'showed treated patients survived eighteen months compared to historically matched historical controls who '
    'survived ten months. What historical confounding factor weakens this comparison?',
    'The historical control group was treated a decade earlier when baseline supportive medical care, imaging '
    'diagnostics, and antimicrobial therapies were far less advanced.',
    'Immunotherapy mechanisms utilize chimeric antigen receptor modified cytotoxic T-cells.',
    'The clinical trial was conducted across six comprehensive National Cancer Institute centers.',
    'Participating oncologists had completed medical fellowship training at tertiary clinics.',
    '歷史對照組偏差 (Historical Control Bias)：用當下的新療法與十年前的舊病例對比，忽視了過去十年間整體重症照護、精準影像診斷與抗生素支持療法的巨大進步，不可同日而語。',
    '臨床試驗對照缺陷：歷史對照組因醫療基線演進而喪失可比性。',
    'interim',
    '/ˈɪn.t̬ɚ.ɪm/',
    '中期的過渡的暫時的',
    'cytotoxic',
    '/ˌsaɪ.t̬oʊˈtɑːk.sɪk/',
    '細胞毒性的殺傷細胞的'),
   ('A clinical trial evaluating a novel cholesterol medication enrolled five thousand middle-aged white suburban '
    'males and demonstrated a thirty percent reduction in low-density lipoprotein. The pharmaceutical company filed '
    'for general FDA approval for all adult demographics. What scientific criticism will the FDA advisory panel raise?',
    'Lack of demographic diversity limits the external validity and generalizability of the findings across diverse '
    'genders, ethnicities, and socio-economic cohorts.',
    'Low-density lipoprotein is synthesized primarily within human hepatocytes in the liver.',
    'Participants were compensated with a nominal travel reimbursement stipend for clinical visits.',
    'The medication was administered as a once-monthly subcutaneous automated injection pen.',
    '外部效度與母體代表性缺失 (External Validity)：試驗全部由單一族裔（白人郊區中年男性）組成，缺乏女性、多元族群及不同社經背景樣本，無法將結論直接推廣至全體普羅大眾。',
    '臨床試驗外部效度：單一樣本族群無法支撐全民通用之普適性結論。',
    'generalizability',
    '/ˌdʒen.ɚ.əl.aɪ.zəˈbɪl.ə.t̬i/',
    '普遍性普適性推廣性',
    'subcutaneous',
    '/ˌsʌb.kjuːˈteɪ.ni.əs/',
    '皮下的')]),
 ('Environmental & Resource Economics: Tragedy of the Commons & Externalities',
  '批判推理',
  'C2-GMAT24',
  [('A shared coastal marine bay is fished by forty independent commercial trawlers. Although marine biologists warned '
    'that fish stocks are collapsing, each individual captain upgraded to larger, high-efficiency nylon gillnets. '
    'Which economic reality drives this self-destructive overfishing?',
    'The Tragedy of the Commons: because the fishery is an open-access unowned resource, individual captains reap the '
    'full private gain of each additional fish caught while dispersing the stock depletion cost onto all participants.',
    'A supply-side monopoly orchestrating artificial shortages to drive up wholesale sushi prices.',
    'Adverse selection among boatbuilders fabricating lightweight fiber-reinforced hulls.',
    'Excessive government price controls capping retail market fish prices at seafood markets.',
    '公地悲劇 (Tragedy of the Commons)：開放式公有漁場無明確產權，個別船長多捕一條魚能獲得100%私人收益，而資源枯竭的成本由全體共同分攤，理性自私導致集體毀滅。',
    'GMAT 資源經濟學核心題型：公地悲劇與產權缺位。',
    'trawler',
    '/ˈtrɑː.lɚ/',
    '拖網漁船拖網捕魚者',
    'gillnet',
    '/ˈɡɪl.net/',
    '刺網流刺網'),
   ('A coal-fired power station generates cheap electricity for a metropolitan region, earning strong commercial '
    'profits while emitting thousands of tons of sulfur dioxide that cause acid rain, damaging forests and freshwater '
    'fisheries fifty miles downwind. What market failure does this scenario illustrate?',
    'A negative environmental externality, where the social cost of production (environmental pollution and ecological '
    "ruin) is not factored into the plant's private operational ledger.",
    'Moral hazard arising from municipal utility debt restructuring.',
    'The base rate fallacy in industrial engineering risk modeling.',
    'A natural monopoly requiring government-mandated price-ceiling interventions.',
    '負外部性 (Negative Externality)：火力發電廠賺取商業暴利，將二氧化硫酸雨損害轉嫁給下風處的森林與漁業，社會外部成本未內生化於電廠私人生產成本中，導致市場失靈。',
    '環境經濟學核心概念：負外部性與社會成本脫節 (Social vs. Private Cost)。',
    'downwind',
    '/ˈdaʊn.wɪnd/',
    '順風的下風方向的',
    'ledger',
    '/ˈledʒ.ɚ/',
    '帳簿總帳簿會計帳冊'),
   ('A farmer installs an expensive drip irrigation system that recharges the communal aquifer and prevents '
    'surrounding agricultural soil salinization, yet neighboring farmers refuse to contribute to the installation '
    'costs. What collective action obstacle is present here?',
    'The Free-Rider Problem: neighbors enjoy the shared hydrological and soil benefits of the aquifer without '
    'incurring any of the private capital investment costs.',
    'Predatory pricing by regional fertilizer and agricultural seed wholesalers.',
    'Information asymmetry between organic farmers and urban grocery cooperatives.',
    'Diseconomies of scale in suburban agricultural farm parcel layouts.',
    '搭便車問題 (Free-Rider Problem)：農民自費改善公用含水層並防止土壤鹽鹼化，周邊鄰居無需出資即可坐享其成，搭便車動機導致正外部性產品在自由市場上供給嚴重不足。',
    '公共財與外部性：搭便車動機阻礙集體理性投資。',
    'salinization',
    '/ˌsæl.ə.nəˈzeɪ.ʃən/',
    '鹽鹼化鹽化',
    'hydrological',
    '/ˌhaɪ.drəˈlɑː.dʒɪ.kəl/',
    '水文的水文學的'),
   ('An industrial paper mill discharges chemical effluent into a river basin, increasing its own paper manufacturing '
    'margins while forcing downstream municipal water treatment facilities to spend twenty million dollars upgrading '
    'filtration technology. What economic policy tool directly internalizes this cost?',
    'Levying a Pigouvian tax on the mill proportional to each gallon of chemical effluent discharged, aligning private '
    'operating costs with true social environmental costs.',
    "Subsidizing the paper mill's purchase of commercial timber logging land.",
    'Imposing an import tariff on finished recycled printer paper reams.',
    'Eradicating municipal water quality testing standards for river basin water.',
    '庇古稅內生化外部成本 (Pigouvian Tax)：對造紙廠排放廢水課徵與污染量等額的庇古稅，強迫造紙廠將其轉嫁給社會的外部成本計入私人生產帳中，實現產量與環境均衡。',
    '庇古稅原理：以稅收手段矯正負外部性 (Corrective Pigouvian Tax)。',
    'effluent',
    '/ˈef.lu.ənt/',
    '污水工業廢水流出物',
    'Pigouvian',
    '/pɪˈɡuː.vi.ən/',
    '庇古的庇古稅的'),
   ('An ancient pasture in an alpine valley was sustained for four centuries under strict communal regulations that '
    'limited each village family to grazing two dairy cows, fining anyone who grazed three. What institutional '
    'framework successfully prevented pasture collapse?',
    "Elinor Ostrom's governing of the commons: local communal governance rules with monitoring and enforcement "
    'overcome open-access resource depletion without state privatization.',
    'A government price floor fixing the wholesale market price of aged Gruyere cheese.',
    'International intellectual property protection over artisanal cheese cultivation cultures.',
    'Vertical integration of dairy distribution cooperatives across alpine cantons.',
    '奧斯特羅姆公地治理理論 (Governing the Commons)：諾貝爾經濟學獎得主奧斯特羅姆指出，地方社群透過嚴格自主監督、明確規則與懲處機制，無需私有化亦能成功避免公地悲劇。',
    '公地治理典範：社群自主約束與監督克服公地悲劇。',
    'pasture',
    '/ˈpæs.tʃɚ/',
    '牧場草地牧草',
    'artisanal',
    '/ɑːrˈtɪz.ən.əl/',
    '手工藝的手工製造的'),
   ('A petrochemical refinery operates adjacent to an urban residential neighborhood, resulting in elevated childhood '
    'asthma hospitalization rates. An economist suggests that the refinery compensate the residents directly to fund '
    'medical care and air purifiers. Under the Coase Theorem, what condition must hold for this private negotiation to '
    'achieve efficiency?',
    'Property rights must be clearly assigned and legally enforced, with near-zero transaction costs between the '
    'refinery and the affected residents.',
    'The municipal government must expropriate the refinery and operate it as a state-owned utility.',
    'The price of crude oil futures contracts must remain stable on international commodities exchanges.',
    'Residents must unanimously consent to relocate fifty miles outside the metropolitan zone.',
    '高斯定理 (Coase Theorem)：諾貝爾得主高斯證明，若產權邊界明確且交易成本趨近於零，私人談判無論產權歸誰，皆可自行協商達成資源的最優配置與外部性內部化。',
    '高斯定理核心假設：產權明確界定 + 交易成本微不足道 (Zero Transaction Costs)。',
    'refinery',
    '/rɪˈfaɪ.nɚ.i/',
    '煉油廠精煉廠',
    'expropriate',
    '/ekˈsproʊ.pri.eɪt/',
    '徵收沒收沒入'),
   ('A municipality established a Tradable Emissions Permit program (Cap-and-Trade) for industrial factories emitting '
    'particulate soot. Factory A can eliminate soot at $50 per ton, whereas Factory B faces abatement costs of $300 '
    'per ton. What market transaction will occur between them?',
    "Factory A will abate more pollution and sell its excess emissions permits to Factory B, achieving the city's "
    'total pollution reduction target at the lowest overall economic cost.',
    'Factory B will sue Factory A in civil court for anti-competitive industrial collusion.',
    'Both factories will immediately shut down manufacturing operations and declare bankruptcy.',
    'The municipal government will double corporate franchise taxes on both factories.',
    '排放權交易機制 (Cap-and-Trade)：A工廠減排成本極低（50元），B工廠減排極貴（300元）。A會超額減排，將省下的排放配額以高於50且低於300的價格賣給B，以全社會最低成本達成總量減排。',
    '總量管制與配額交易：市場化交易實現邊際減排成本均等化。',
    'abatement',
    '/əˈbeɪt.mənt/',
    '減排消除減輕減損',
    'collusion',
    '/kəˈluː.ʒən/',
    '勾結共謀密謀'),
   ('A high-tech company installed an extensive rooftop beehive array to pollinate urban rooftop gardens, boosting '
    'honey yield and accelerating botanical diversity across neighboring municipal properties without charging '
    'neighbors. What economic phenomenon is demonstrated here?',
    'A positive production externality, where a private economic activity confers uncompensated spillover benefits '
    'onto third-party neighboring actors.',
    'Monopsonistic market dominance in regional raw honey wholesale purchasing.',
    'The free-rider problem bankrupting urban honey-harvesting entrepreneurs.',
    'Adverse selection among commercial horticulture nursery suppliers.',
    '正生產外部性 (Positive Production Externality)：養蜂產蜜的同時，蜜蜂免費替鄰近屋頂花園與植物授粉，使第三方在無需付費的情況下享有生態多樣性外溢好處。',
    '正外部性與外溢效應 (Spillover Benefits)：私人行為產生社會正向福利。',
    'pollinate',
    '/ˈpɑː.lə.neɪt/',
    '授粉傳粉',
    'spillover',
    '/ˈspɪlˌoʊ.vɚ/',
    '外溢效應溢出外溢物'),
   ('A commercial airliner flight corridor operates directly over a quiet residential suburb at night, causing chronic '
    'sleep disruption among homeowners. The airline refuses to alter flight paths because jet fuel costs on '
    'alternative routes are higher. What explains why individual homeowners do not privately bribe the airline to '
    'reroute flights?',
    'Prohibitive transaction costs and collective action barriers, where coordinating thousands of dispersed '
    'homeowners to negotiate and pool funds is practically impossible.',
    'A complete lack of certified commercial airline pilots in the regional labor market.',
    'Federal noise pollution regulations mandating decibel meters on residential street corners.',
    "The airline's corporate charter prohibiting financial transactions with non-corporate entities.",
    '高昂交易成本阻礙高斯私人談判：千家萬戶居民分散，組織協調、募款出資向航司購買安寧權的交易成本極其巨大且極易有人搭便車，導致私人談判破局，必須依賴政府噪音法規管制。',
    '交易成本阻礙談判：集體協商成本過高導致高斯定理無法運作。',
    'prohibitive',
    '/prəˈhɪb.ə.t̬ɪv/',
    '令人望而卻步的高昂的過高的限制性的',
    'reroute',
    '/ˌriːˈruːt/',
    '改變航線改道繞道'),
   ('An international treaty created shared global marine satellite monitoring to track illicit bottom trawling in '
    'open international waters. What characteristic of high-seas international fisheries makes enforcement '
    'historically ineffective?',
    'High-seas fisheries are non-excludable yet rivalrous common-pool resources that lack a sovereign enforcement '
    'authority capable of legally sanctioning rogue foreign vessels.',
    'Marine satellite transponders cannot penetrate oceanic seawater beneath ten meters depth.',
    'International shipping corridors are exempt from maritime navigation radar protocols.',
    'Bottom trawling vessels consume twenty percent less marine bunker fuel than longline boats.',
    '公海公共資源的非排他與競用特質：公海漁業具備『無法排他 (non-excludable)』但『具高度競用性 (rivalrous)』之公共池塘特點，且無單一主權政府能強制作法治制裁，形成治理真空。',
    '公海悲劇之產權本質：非排他性 + 競用性 + 欠缺主權跨國執法主體。',
    'transponder',
    '/trænˈspɑːn.dɚ/',
    '轉發器應答器脈衝發送器',
    'rivalrous',
    '/ˈraɪ.vəl.rəs/',
    '具競用性的競爭性的')]),
 ('Technological Disruption: S-Curve Adoption & Cannibalization Dynamics',
  '批判推理',
  'C2-GMAT25',
  [('A leading film photography giant dominated ninety percent of the camera film market with record operational cash '
    'flows. When digital sensors were invented, executive management shelved internal digital research because digital '
    'sensors produced grainy images and offered zero film cartridge margins. Which innovation dilemma caused the '
    "firm's eventual bankruptcy?",
    "The Innovator's Dilemma: listening to core legacy customers led the incumbent to dismiss an early-stage "
    'disruptive technology that improved along an exponential S-curve until it surpassed film.',
    'A sudden global shortage of silver halide emulsion chemicals used in photo development.',
    'Hostile antitrust litigation brought by domestic consumer protection enforcement commissions.',
    'Macroeconomic currency hyperinflation eroding consumer disposable entertainment spending.',
    "創新者的兩難 (The Innovator's Dilemma)：傳統巨頭沉迷於底片帶來的巨大現金流與核心客戶的高標準，輕視了初期畫質粗糙、無耗材毛利的數位相機；但數位技術沿著S型曲線指數級迭代進步，最終徹底顛覆底片帝國。",
    "GMAT 顛覆性創新經典模型：早期低端顛覆與S型曲線跨越 (The Innovator's Dilemma)。",
    'shelve',
    '/ʃelv/',
    '擱置將…擱置延期',
    'halide',
    '/ˈheɪ.laɪd/',
    '鹵化物'),
   ('An electric vehicle battery startup announced a solid-state battery that achieved laboratory energy density four '
    'times that of lithium-ion cells. An industry analyst declared that all gasoline and lithium-ion passenger '
    'vehicles will be obsolete within two years. What fundamental technology commercialization bottleneck did the '
    'analyst ignore?',
    'The transition from laboratory feasibility to high-yield, cost-effective commercial gigawatt manufacturing is '
    'governed by complex industrial scale-up hurdles that take a decade to overcome.',
    'Automotive dealership franchises require certified service technicians to replace spark plugs.',
    'Consumer automotive financing loans have average amortization durations of sixty months.',
    'Highway toll transponder systems are incompatible with carbon-fiber vehicle chassis.',
    '實驗室技術到大規模量產之瓶頸鴻溝 (Scale-up Bottleneck)：固態電池在實驗室具超高能量密度，但從實驗室試製到建造數十吉瓦時 (GWh) '
    '的百億美元工廠、克服高良率與低成本製造極限，通常需時十年以上，絕非兩年可達成。',
    '商業化規模瓶頸：混淆實驗室原型 (Lab Prototype) 與工業化量產 (Mass Production)。',
    'solid-state',
    '/ˌsɑː.lɪdˈsteɪt/',
    '固態的',
    'amortization',
    '/ˌæm.ɚ.t̬əˈzeɪ.ʃən/',
    '分期攤還攤提'),
   ('A mainframe computing corporation generated ninety percent of its gross profits from high-margin proprietary '
    'server hardware. When cloud computing infrastructure emerged, the CEO refused to build public cloud offerings, '
    'fearing it would gut on-premise hardware sales. What strategic failure did the CEO commit?',
    'Failure to actively cannibalize its own legacy revenue streams, allowing agile external competitors to capture '
    'the unstoppable cloud computing S-curve shift.',
    'Refusing to settle intellectual property patent disputes with microprocessor chip designers.',
    'Authorizing excessive employee stock option dilution during a private equity takeover bid.',
    'Underestimating the electricity cooling consumption required by server liquid cooling tubes.',
    '拒絕自我革命與自我蠶食 (Failure to Cannibalize)：害怕雲端運算侵蝕自己的地端伺服器暴利，不敢自我顛覆，結果只是將龐大的雲端市場拱手讓給亞馬遜等外部顛覆者，最終老業務與新業務雙雙潰敗。',
    '商業策略箴言：若不主動自我蠶食 (Cannibalize Yourself)，對手就會徹底蠶食你。',
    'on-premise',
    '/ˌɑːnˈprem.ɪs/',
    '本地部署的地端設施的',
    'cannibalize',
    '/ˈkæn.ə.bəl.aɪz/',
    '蠶食自相殘殺拆用零配件'),
   ('An emerging e-commerce marketplace subsidizes delivery fees to ignite network adoption. While initial growth was '
    'sluggish for two years, user growth suddenly exploded exponentially in year three before tapering into plateaued '
    'stability in year five. What classic technological adoption framework does this follow?',
    'The logistic S-curve of technology adoption: slow early proof-of-concept traction, followed by rapid '
    'tipping-point exponential diffusion, culminating in mature market saturation.',
    'A linear regression model driven by continuous incremental advertising spending adjustments.',
    'The boom-and-bust Austrian capital investment cycle driven by central bank interest manipulation.',
    'Predatory price undercutting designed to drive brick-and-mortar retail competitors into liquidation.',
    'S型普及曲線 (Logistic S-Curve of Adoption)：技術或平台採納初期進展緩慢，突破臨界拐點 (Tipping Point) 後進入指數級爆發，隨後觸及天花板進入成熟平穩期，呈標準 Logistic S '
    '曲線。',
    '技術普及動力學：S型曲線（起步緩慢 -> 拐點爆發 -> 飽和收斂）。',
    'plateaued',
    '/plæˈtoʊd/',
    '進入平穩期處於停滯期的',
    'diffusion',
    '/dɪˈfjuː.ʒən/',
    '傳播普及擴散'),
   ('A disk-drive manufacturer produced 14-inch hard drives for mainframe computers with unmatched engineering '
    'precision. A startup introduced crude 8-inch drives with smaller storage capacity and lower profit margins, aimed '
    'at microcomputers. The incumbent ignored the 8-inch drives. Why was this fatal?',
    'Because disruptive technologies initially underperform in mainstream markets but serve emerging niches, improving '
    'their performance trajectories until they invade and displace the mainstream.',
    'Because microcomputer operating systems were written in rudimentary assembly code.',
    'Because 14-inch drive spindles were lubricated with synthetic fluoro-chemical oils.',
    'Because mainframe computer leases were negotiated on multi-year institutional procurement schedules.',
    '低端破局與技術軌跡顛覆 (Low-End Disruption)：8吋硬碟容量小毛利低，主流客戶根本看不上，巨頭因此忽視；但8吋驅動器在個人電腦利基市場迅速改進，性能軌跡迅速攀升，最終將14吋大硬碟徹底趕出市場！',
    '克里斯汀森顛覆理論：低端切入 + 性能軌跡 (Performance Trajectory) 攀升。',
    'spindle',
    '/ˈspɪn.dəl/',
    '主軸軸心紡錘',
    'rudimentary',
    '/ˌruː.dəˈmen.t̬ɚ.i/',
    '基本的初步的粗糙的'),
   ('A leading video rental store chain evaluated streaming video in 2002 and concluded that broadband speeds were '
    'inadequate to stream high-definition movies without continuous buffering. By 2010, the chain went bankrupt as '
    'broadband speeds quadrupled. What strategic planning error occurred?',
    'Evaluating a disruptive technology based strictly on static infrastructural constraints at a single moment in '
    'time, failing to anticipate infrastructure bandwidth expansion.',
    'Overspending corporate cash reserves on regional commercial warehouse leases.',
    'Failing to patent plastic clamshell protective cassette tape storage cases.',
    'Mandating that store managers enforce forty-eight-hour movie return deadlines.',
    '以靜態視角看待動態基礎設施：巨頭在2002年以『寬頻頻寬不夠』為由否定流媒體，犯了靜態刻舟求劍的戰略錯誤，忽視了光纖與4G網路頻寬的摩爾定律式擴張，最終在2010年被全面淘汰。',
    '技術預測盲點：靜態基礎設施邊界假設 vs. 動態基礎設施指數級躍遷。',
    'buffering',
    '/ˈbʌf.ɚ.ɪŋ/',
    '緩衝數據緩衝',
    'clamshell',
    '/ˈklæm.ʃel/',
    '蚌殼狀的蛤殼式的包裝盒'),
   ('A smartphone pioneer built devices featuring physical QWERTY mechanical keyboards, beloved by corporate '
    "enterprise executives for email typing speed. When touchscreen-only phones debuted, the pioneer's leadership "
    'declared that serious business professionals would never abandon physical key tactile feedback. What cognitive '
    'trap doomed the firm?',
    'Incumbent feature fixation: overvaluing a single legacy mechanical optimization while failing to recognize that '
    'full-screen touchscreens transformed the smartphone into a flexible multi-application computational platform.',
    'Physical mechanical keyboard switches cost sixty percent more to fabricate than capacitive glass.',
    'Enterprise email servers required proprietary encryption firewall connection tokens.',
    'Corporate IT directors signed multi-year corporate telecommunication enterprise mobile contracts.',
    '既有特性執念 (Incumbent Feature Fixation)：巨頭過度執著於全鍵盤打字的實體觸感，看不出純觸控大螢幕將手機從『打字郵件機』重新定義為『全方位多功能計算平台』，執著於單一局部最佳化導致滅頂之災。',
    '產品範式轉移 (Paradigm Shift)：局部功能最佳化無法對抗底層平台的範式轉移。',
    'capacitive',
    '/kəˈpæs.ə.t̬ɪv/',
    '電容的電容式的',
    'fixation',
    '/fɪkˈseɪ.ʃən/',
    '迷戀執念固定注視'),
   ('An artificial intelligence startup developed an automated legal contract analysis tool that reviews corporate '
    'leasing covenants in seconds with 95% accuracy. Senior partners at a top law firm dismissed the software, '
    "stating: 'Contract law requires human wisdom, nuance, and contextual prudence that algorithms can never "
    "replicate.' What competitive threat are the partners ignoring?",
    'Algorithmic disruption begins by automating standard modular tasks at massive cost and speed advantages, '
    'progressively climbing the complexity ladder until it commoditizes high-end professional advisory services.',
    'Commercial office real estate lease documents require physical notarized signatures.',
    'Law school graduates must pass state bar examinations to represent clients in litigation.',
    'Corporate general counsels retain outside litigation attorneys on billable hourly retainers.',
    '專業服務自動化與複雜度攀登：演算法從繁複耗時的基礎合約審閱切入，以億萬倍速度與極低成本碾壓人工，並持續攀登複雜法律推理階梯，老派合夥人若迷信『人類智慧不可替代』將面臨商業模式被商品化擊垮。',
    '專業服務知識自動化：從模組化任務切入並沿著複雜度曲線向上侵蝕高端業務。',
    'prudence',
    '/ˈpruː.dəns/',
    '謹慎審慎周密精明',
    'commoditize',
    '/kəˈmɑː.də.taɪz/',
    '使商品化使失去差異性'),
   ('An electric utility corporation generates reliable baseload power from massive coal and nuclear facilities. When '
    'distributed rooftop solar and commercial battery storage costs fell by eighty percent, the utility imposed '
    'exorbitant grid-connection penalty fees on solar-equipped residences. What defensive dynamic is the utility '
    'exhibiting?',
    'Defensive regulatory barrier erection: using political lobbying and tariff structures to protect stranded, '
    'high-fixed-cost capital assets from decentralized, cleaner technological substitutes.',
    'Rooftop solar panels utilize polycrystalline photovoltaic silicon wafer arrays.',
    'Electric power transformers step down high-voltage transmission power to 120-volt current.',
    'Nuclear power reactors undergo mandatory refuelling outages every eighteen months.',
    '擱置資產與規管護盾防禦：巨額投資的燃煤與核電資產已成『沉沒/擱置資產 (Stranded Assets)』。面對分散式太陽能儲能的碾壓，老牌公用事業公司訴諸政治遊說與連網懲罰性收費，試圖延緩技術替代。',
    '既得利益集團規管防禦：以高額懲罰性壁壘護航沉沒固定資產。',
    'baseload',
    '/ˈbeɪs.loʊd/',
    '基載基本負載',
    'exorbitant',
    '/ɪɡˈzɔːr.bə.t̬ənt/',
    '過高的過分的離譜的'),
   ('A high-end luxury watch manufacturer watched inexpensive battery-powered quartz watches invade the market in the '
    '1970s. Rather than trying to beat quartz watches on precision and low cost, the mechanical watchmaker '
    'repositioned its mechanical watches as ultra-luxury jewelry, heritage art, and Veblen status symbols. What '
    'strategic maneuver saved the brand?',
    'Value-proposition transcendence: abandoning a commoditized performance dimension (timekeeping accuracy) and '
    'repositioning the legacy craft along an untouchable emotional and aesthetic luxury dimension.',
    'Quartz crystal oscillators vibrate at precisely 32,768 hertz when stimulated by electric current.',
    'Watchmakers in Switzerland export eighty percent of finished chronometers to Asian luxury boutiques.',
    'Mechanical watch mainsprings are coiled using specialized cobalt-nickel-chromium alloys.',
    '價值主張昇華與維度轉換 (Value-Proposition '
    'Transcendence)：面對石英錶在精準度與成本上的致命顛覆，機械錶品牌聰明地放棄了在『走時準確度』上的無謂競爭，將機械錶昇華為藝術傳承、高級珠寶與韋伯倫炫耀性身分符號 (Veblen Good)，成功開闢百倍溢價藍海！',
    '反顛覆策略：逃離被商品化的功能維度，躍升至情感身分象徵之極致維度。',
    'transcendence',
    '/trænˈsen.dəns/',
    '超越卓越昇華',
    'veblen',
    '/ˈveb.lən/',
    '韋伯倫炫耀性商品的')])]

    for sub_title, dim, hook, q_list in subtopics_data:
        for q_tuple in q_list:
            prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2 = q_tuple
            items.append(make_q(
                q_counter, sub_title, dim, hook, prompt, corr, d1, d2, d3, trans, concept, w1, p1, m1, w2, p2, m2
            ))
            q_counter += 1

    return items
