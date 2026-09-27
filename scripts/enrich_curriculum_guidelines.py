"""
enrich_curriculum_guidelines.py
Organizes and systematically aligns all English teaching materials with 108 Curriculum standards and CEFR guidelines.
- Updates dist/curriculum.mjs (All 27 chapters enriched with curriculumCode, stage, cefr, competency, learningPerformance, learningContent, guideline)
- Updates dist/curriculum_unified.mjs (All 61 units enriched with stage, cefr, guideline)
"""

import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

CHAPTER_METADATA = {
    "j1": {
        "curriculumCode": "1-Ⅳ-4 / 2-Ⅳ-2 / 3-Ⅳ-2 / 4-Ⅳ-1 / Ac-Ⅳ-1",
        "stage": "第四學習階段 (國中 7–9 年級)",
        "cefr": "A2 (初級精熟 · 國中會考滿分基礎)",
        "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
        "learningPerformance": "掌握英文五大基本句型（S+V, S+V+SC, S+V+O, S+V+IO+DO, S+V+O+OC）與四大基礎時態；依時間副詞標記判定動詞變化。",
        "learningContent": "Ac-Ⅳ-1 簡易句型與主謂結構；Ac-Ⅳ-3 現在、過去、未來與現在進行式；科學客觀真理現在式例外。",
        "guideline": "心測中心國中教育會考雙向細目表文法單題命題規準；科學客觀真理（Water boils at 100°C）名詞子句時態一致性例外必考點。"
    },
    "j2": {
        "curriculumCode": "3-Ⅳ-2 / 4-Ⅳ-1 / Ac-Ⅳ-2",
        "stage": "第四學習階段 (國中 7–9 年級)",
        "cefr": "A2 (初級精熟)",
        "competency": "A1 身心素質與自我精進、B1 符號運用與溝通表達",
        "learningPerformance": "辨析人稱代名詞四性格位（主格、受格、所有格、所有格代名詞）與反身代名詞功能；熟練可數與不可數名詞之數量詞修飾規則。",
        "learningContent": "Ac-Ⅳ-2 名詞與代名詞之性、數、格；數量詞 many/much, a few/a little 之肯定與否定語氣；常見不可數抽象物質名詞。",
        "guideline": "國中教育會考數量詞與不可數名詞（information, news, advice, bread）辨析；反身代名詞作受詞（主受同人）與強調語氣命題規準。"
    },
    "j3": {
        "curriculumCode": "1-Ⅳ-2 / 2-Ⅳ-1 / 2-Ⅳ-4 / Ac-Ⅳ-3",
        "stage": "第四學習階段 (國中 7–9 年級)",
        "cefr": "A2 (初級精熟 · 生活交際)",
        "competency": "B1 符號運用與溝通表達、C2 人際關係與團隊合作",
        "learningPerformance": "靈活運用 5W1H 疑問詞與附加問句獲取資訊；使用情態助動詞表達禮貌請求、允許、能力與義務。",
        "learningContent": "Ac-Ⅳ-3 疑問句結構、附加問句（前肯後否/前否後肯）；情態助動詞 can, could, may, must, should, would 語氣階梯。",
        "guideline": "心測中心生活會話與聽力基本問答題型；附加問句特例（Let's go, shall we? / I am, aren't I?）與情態動詞後接原形動詞標準。"
    },
    "j4": {
        "curriculumCode": "3-Ⅳ-2 / 3-Ⅳ-6 / 4-Ⅳ-1 / Ac-Ⅳ-5",
        "stage": "第四學習階段 (國中 7–9 年級)",
        "cefr": "A2+ (初級精熟進階)",
        "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
        "learningPerformance": "區分對等連接詞（and, but, or, so）與從屬連接詞（because, although, if, when, while）；建立邏輯嚴密之複合句。",
        "learningContent": "Ac-Ⅳ-5 複句結構；時間與條件副詞子句；因果與轉折子句；禁用雙重連接詞語法規則。",
        "guideline": "會考文法克漏字必考考點：條件句與時間子句「現在式代未來式」；禁用「Although... but...」與「Because... so...」命題偵錯。"
    },
    "j5": {
        "curriculumCode": "3-Ⅳ-4 / 3-Ⅳ-6 / Ad-Ⅳ-1 / Ad-Ⅳ-2",
        "stage": "第四學習階段 (國中 7–9 年級)",
        "cefr": "A2 ~ Pre-B1 (跨文本素養閱讀)",
        "competency": "B2 科技資訊與媒體素養、C3 多元文化與國際理解",
        "learningPerformance": "閱讀真實生活文本（如時刻表、海報、菜單、通訊記錄、地圖）；綜合擷取關鍵事實並進行合理推論文意。",
        "learningContent": "Ad-Ⅳ-1 生活實用文本；Ad-Ⅳ-2 圖表、圖示與數據轉譯；篇章主旨與細節事實交叉驗證。",
        "guideline": "心測中心 109–115 會考多模態題組命題規範：星號附註條件、雙文本資訊比對、排比圖表題之排除干擾選項原則。"
    },
    "j6": {
        "curriculumCode": "1-Ⅳ-1 / 1-Ⅳ-2 / 1-Ⅳ-3 / Ab-Ⅳ-1",
        "stage": "第四學習階段 (國中 7–9 年級)",
        "cefr": "A2 (聽力評量精熟)",
        "competency": "B1 符號運用與溝通表達、A1 身心素質與自我精進",
        "learningPerformance": "聽辨英語母語者弱化音、連音（Connected Speech）、同化與省音；辨識對話語氣、重音位置與時間數字資訊。",
        "learningContent": "Ab-Ⅳ-1 常用音標發音規則；語音弱化（schwa /ə/）；言談重音與語調所傳達之情感與隱含態度。",
        "guideline": "國中教育會考英語聽力測驗三大題型（辨識句意、基本問答、言談理解）命題準則；常見數字陷阱（-teen vs -ty）與轉折詞聽辨規準。"
    },
    "j7": {
        "curriculumCode": "3-Ⅳ-2 / 5-Ⅳ-1 / 5-Ⅳ-2 / Ac-Ⅳ-1",
        "stage": "第四學習階段 (國中 7–9 年級會考總複習)",
        "cefr": "A2+ (國中會考 A++ 標竿)",
        "competency": "A2 系統思考與解決問題、A3 規劃執行與創新應變",
        "learningPerformance": "建立全方位錯題歸因 X 光機診斷機制；掌握考場 42 項避雷法則與篇章克漏字雙向定錨策略。",
        "learningContent": "國中 1200 核心詞彙與高頻片語總盤點；全考科時態句型陷阱雷達；間隔重複與大考考前衝刺檢核清單。",
        "guideline": "教育部會考英語科答對題數與精熟門檻（A++、A+、A）換算標準；考前 10 分鐘必備避雷指南與時間分配配速標準。"
    },
    "s1": {
        "curriculumCode": "3-Ⅴ-2 / 4-Ⅴ-1 / Ac-Ⅴ-1",
        "stage": "第五學習階段 (高中 10–12 年級)",
        "cefr": "B1+ (高中學測前標)",
        "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
        "learningPerformance": "解構長難句之核心骨架；熟練分詞構句、關係代名詞子句、讓步倒裝句與分裂強調句之語意轉換與書寫。",
        "learningContent": "Ac-Ⅴ-1 進階句法結構；分詞構句（主動V-ing/被動p.p.）；與現在/過去事實相反之假設語氣；省略if之倒裝句型。",
        "guideline": "大考中心學測英文科長句分析能力規準；中譯英非選大題主從句結構對稱性與動詞時態一致性評分規準。"
    },
    "s2": {
        "curriculumCode": "3-Ⅴ-1 / 3-Ⅴ-2 / Ab-Ⅴ-2",
        "stage": "第五學習階段 (高中 10–12 年級)",
        "cefr": "B2 (高中學測頂標)",
        "competency": "A2 系統思考與解決問題、B1 符號運用與溝通表達",
        "learningPerformance": "分析論說文篇章銜接機制（Cohesive Devices）；掌握代名詞前指/後指、時空順序、反差轉折與因果鏈條。",
        "learningContent": "Ab-Ⅴ-2 篇章組織標記；段落主題句（Topic Sentence）與支持句邏輯扣連；干擾選項之同義代換破綻。",
        "guideline": "111–115 新型學測「篇章結構（四空五選 / 五空五選）」雙向細目表；段落前後上下文句法語意雙向定錨解題規範。"
    },
    "s3": {
        "curriculumCode": "3-Ⅴ-3 / 3-Ⅴ-4 / Ae-Ⅴ-1",
        "stage": "第五學習階段 (高中 10–12 年級)",
        "cefr": "B2 (學術跨域閱讀)",
        "competency": "B2 科技資訊與媒體素養、C3 多元文化與國際理解",
        "learningPerformance": "深度閱讀科技、人文、生態科普學術長篇文本；比對雙文本之共同論述焦點與互斥觀點，推論作者潛在語氣立場。",
        "learningContent": "Ae-Ⅴ-1 當代全球議題；人工智慧演算法、循環經濟ESG、生物多樣性；雙文本觀點比較與表格轉譯。",
        "guideline": "大考中心學測混合題型（選擇+非選擇）命題指引：手寫摘錄關鍵詞、字數嚴格限制、圖表轉譯評分標準。"
    },
    "s4": {
        "curriculumCode": "3-Ⅴ-1 / 4-Ⅴ-1 / Ab-Ⅴ-1",
        "stage": "第五學習階段 (高中 10–12 年級)",
        "cefr": "B1 ~ B2 (7000詞彙精熟)",
        "competency": "A1 身心素質與自我精進、B1 符號運用與溝通表達",
        "learningPerformance": "活用高中 7000 核心詞彙之字首、字根、字尾構詞衍生規律；精準掌握正式語域（Formal Register）與道地固定搭配詞（Collocations）。",
        "learningContent": "Ab-Ⅴ-1 高階學術詞彙；動詞+名詞搭配（e.g. conduct research, reach consensus）；介系詞慣用搭配；文意選填四色詞性定位。",
        "guideline": "學測第一大題詞彙題（1–10 題）語境搭配命題規準；文意選填十大詞性標記（動詞時態、名詞單複數、形容詞/副詞）排除法。"
    },
    "s5": {
        "curriculumCode": "4-Ⅴ-1 / 4-Ⅴ-2 / Ac-Ⅴ-1",
        "stage": "第五學習階段 (高中 10–12 年級)",
        "cefr": "B1+ (精準中譯英)",
        "competency": "B1 符號運用與溝通表達、A2 系統思考與解決問題",
        "learningPerformance": "擺脫中式英文（Chinglish）思維干擾；掌握無主句英譯轉化、及物不及物動詞用法與主被動句構轉換。",
        "learningContent": "Ac-Ⅴ-1 漢英語法結構對比；「虛主詞 It / There be」轉化；因果副詞子句與倒裝加強語氣句構。",
        "guideline": "大考中心學測非選擇題中譯英 8 分官方評分規準：兩小題各 4 分，結構 2 分、拼寫字彙搭配 2 分；扣分細則嚴格對標。"
    },
    "s6": {
        "curriculumCode": "4-Ⅴ-1 / 4-Ⅴ-3 / 5-Ⅴ-1",
        "stage": "第五學習階段 (高中 10–12 年級)",
        "cefr": "B2 (論述與寫作頂標)",
        "competency": "A3 規劃執行與創新應變、B1 符號運用與溝通表達",
        "learningPerformance": "撰寫 120–150 字結構完整之論說文或看圖敘事文；清晰鋪陳主張（Claim）、理由（Reason）與例證（Evidence）。",
        "learningContent": "篇章寫作四要素：內容（Content）、組織（Organization）、文法句構（Grammar）、字彙拼字（Vocabulary/Mechanics）。",
        "guideline": "大考中心學測英文作文 20 分四項度評分規準（每項 5 分）；高分模板破題句與結論句呼應原則。"
    },
    "s7": {
        "curriculumCode": "3-Ⅴ-2 / 4-Ⅴ-1 / 5-Ⅴ-2",
        "stage": "第五學習階段 (高中學測統測大考衝刺)",
        "cefr": "B2 (學測 15 級分滿級分)",
        "competency": "A3 規劃執行與創新應變、A2 系統思考與解決問題",
        "learningPerformance": "精確落實學測 100 分鐘全真作答時間配速；整合選擇題、混合題手寫與非選作文之雙向檢查策略。",
        "learningContent": "109–115 歷屆學測命題趨勢分析；易錯誘答肢排除法則；考場應試心態與答題卡劃記管理。",
        "guideline": "學測各級分累計百分比與非選閱卷規準；大考中心手寫卷卷面書寫規範與防倒扣答題策略。"
    },
    "v1": {
        "curriculumCode": "1-Ⅴ-2 / 2-Ⅴ-2 / Ac-Ⅴ-2 (技高外語群)",
        "stage": "第五學習階段 (技術型高中 10–12 年級)",
        "cefr": "B1 (技高職場安全)",
        "competency": "A3 規劃執行與創新應變、B1 符號運用與溝通表達",
        "learningPerformance": "掌握工廠與施工現場個人防護裝備（PPE）、安全警語（Caution/Danger/Warning）與緊急疏散指令之精準英語。",
        "learningContent": "技高專業英語 ESP；OSHA 與 ISO 45001 安全標誌；安全操作 SOP 祈使句與禁止用語。",
        "guideline": "技專校院入學測驗中心（TVE）四技二專統測外語群專業科目職場實務英語命題規準。"
    },
    "v2": {
        "curriculumCode": "3-Ⅴ-2 / 4-Ⅴ-2 / Ab-Ⅴ-2",
        "stage": "第五學習階段 (技術型高中 10–12 年級)",
        "cefr": "B1 (工程工具與材料)",
        "competency": "B1 符號運用與溝通表達、A2 系統思考與解決問題",
        "learningPerformance": "辨識工程精密量具（Caliper, Micrometer）、材料物性（Tensile strength, Corrosion resistance）與公差尺寸規格。",
        "learningContent": "英制與公制工程單位換算；材料物理特性詞彙；技術規格說明書參數表格讀取。",
        "guideline": "統測專業英文（二）工具材料題型；技術圖例與量測尺寸對照命題標準。"
    },
    "v3": {
        "curriculumCode": "3-Ⅴ-2 / 4-Ⅴ-2 / Ac-Ⅴ-2",
        "stage": "第五學習階段 (技術型高中 10–12 年級)",
        "cefr": "B1+ (流程與故障排除)",
        "competency": "A2 系統思考與解決問題、B2 科技資訊與媒體素養",
        "learningPerformance": "依據流程圖（Flowchart）閱讀步驟說明；使用順序副詞與條件句撰寫設備故障排除指引（Troubleshooting Guide）。",
        "learningContent": "順序連接詞（First, Next, Subsequently, Finally）；故障診斷條件句（If error code persists, then...）；被動語態操作說明。",
        "guideline": "四技二專統測外語群專業英文流程圖與操作步驟轉譯試題規準。"
    },
    "v4": {
        "curriculumCode": "3-Ⅴ-4 / 4-Ⅴ-2 / Ad-Ⅴ-1",
        "stage": "第五學習階段 (技術型高中 10–12 年級)",
        "cefr": "B1+ (技術圖表判讀)",
        "competency": "B2 科技資訊與媒體素養、A2 系統思考與解決問題",
        "learningPerformance": "精讀配線圖（Wiring diagram）、爆炸圖（Exploded view）、機械藍圖與工程參數數據表。",
        "learningContent": "空間方位詞；零件編號標註法；技術說明書中縮寫（OEM, CAD, CNC, PCB）與圖文互譯。",
        "guideline": "統測專業科目（二）閱讀測驗工程圖表題型；多模態技術文本訊息比對規範。"
    },
    "v5": {
        "curriculumCode": "4-Ⅴ-2 / 2-Ⅴ-2 / Ac-Ⅴ-2",
        "stage": "第五學習階段 (技術型高中 10–12 年級)",
        "cefr": "B2 (國際職場商務電郵)",
        "competency": "B1 符號運用與溝通表達、C2 人際關係與團隊合作",
        "learningPerformance": "撰寫標準國際商務與技術電子郵件；熟練詢價（RFQ）、交期催告、技術支援與客戶爭議協商之正式書信。",
        "learningContent": "電郵標準七結構；委婉禮貌語氣（I would appreciate if...）；專業商業術語與交貨條款（Incoterms）。",
        "guideline": "統測英文寫作大題：商務書信與技術便條寫作評分規準。"
    },
    "v6": {
        "curriculumCode": "3-Ⅴ-2 / 4-Ⅴ-3 / 5-Ⅴ-2",
        "stage": "第五學習階段 (技術型高中 10–12 年級統測衝刺)",
        "cefr": "B2 (統測專二頂標)",
        "competency": "A3 規劃執行與創新應變、A2 系統思考與解決問題",
        "learningPerformance": "全面掌握統測英語類專業科目（二）閱讀與寫作兩大題型；熟練 50 字精準摘要技巧與專業長篇閱讀解題。",
        "learningContent": "科技與商業跨領域閱讀；篇章主旨概括法；論說段落寫作與統測歷屆試題關鍵字定位法。",
        "guideline": "技測中心統測外語群專業科目（二）非選題官方評分規準（摘要內容度、文法句型、詞彙精確度）。"
    },
    "v7": {
        "curriculumCode": "2-Ⅴ-2 / 4-Ⅴ-2 / C3 (全球技職素養)",
        "stage": "第五學習階段 (技術型高中與全球就業銜接)",
        "cefr": "B2 (跨國工程現場實務)",
        "competency": "C3 多元文化與國際理解、C2 人際關係與團隊合作",
        "learningPerformance": "參與跨國技術會議與遠距視訊溝通；掌握 ISO 驗收文件、工程合約條款與保固協議之關鍵法律與技術英語。",
        "learningContent": "國際標準化用語；跨國視訊會議議事規則與發言用語；專案里程碑驗收與維護合約。",
        "guideline": "國際工程師與技術人才全球溝通指引；跨國專案驗收報告書寫標準。"
    },
    "gept": {
        "curriculumCode": "CEFR 全階對照認證 (A2–C2)",
        "stage": "終生學習與國際認證",
        "cefr": "A2 ~ C2 (初級、中級、中高級、高級、優級全階)",
        "competency": "B1 符號運用、A1 自我精進、C3 國際理解",
        "learningPerformance": "完整掌握全民英檢五大級別之聽、說、讀、寫評量規準；初級至中高級各階段寫作與口說評分量表解構。",
        "learningContent": "LTTC 全民英檢各級詞彙量（初級2260字、中級5000字、中高級8000字）；短文翻譯、段落寫作與口試回答技巧。",
        "guideline": "財團法人語言訓練測驗中心（LTTC）全民英檢各級能力指標與通過門檻規準。"
    },
    "toeic": {
        "curriculumCode": "CEFR B1–C1 (商務英語指標)",
        "stage": "國際職場與商務溝通",
        "cefr": "B1 ~ C1 (TOEIC 550–990 金色證書)",
        "competency": "B1 符號運用、C2 團隊合作、A3 規劃執行",
        "learningPerformance": "掌握 TOEIC 聽力與閱讀 200 題 120 分鐘極限配速；迅速辨識 Part 5 詞性填空、Part 6 篇章結構與 Part 7 跨篇閱讀破題點。",
        "learningContent": "ETS 國際商務十三大情境；商業採購、物流運輸、人事招聘、財務報表與商務差旅高頻語料。",
        "guideline": "ETS TOEIC Listening & Reading 官方分數對照表與 scaled score 轉換標準。"
    },
    "sat": {
        "curriculumCode": "CEFR B2–C1 (美加名校入學學術測驗)",
        "stage": "海外留學與高等學術英語",
        "cefr": "B2 ~ C1 (Digital SAT 1200–1600)",
        "competency": "A2 系統思考、B1 符號運用、B2 資訊素養",
        "learningPerformance": "駕馭 Digital SAT 雙模組多階段適性測驗（MST）演算法；精通 Craft & Structure, Information & Ideas, Standard English, Rhetorical Synthesis 四大領域。",
        "learningContent": "學術跨領域極短篇精讀；高難度句子修辭與修飾語錯置（Dangling Modifiers）；圖表數據因果反差推理。",
        "guideline": "College Board Digital SAT 官方評量標準與難度適性跳轉門檻規範。"
    },
    "gre": {
        "curriculumCode": "CEFR C1–C2 (研究所入學學術批判)",
        "stage": "研究所入學與學術深造",
        "cefr": "C1 ~ C2 (GRE Verbal 155–170)",
        "competency": "A2 系統思考、5-Ⅴ-1 邏輯批判思維",
        "learningPerformance": "掌握 Text Completion 單/雙/三空與 Sentence Equivalence 雙生同義詞邏輯轉折；解構學術長篇密集論證與反直覺觀點。",
        "learningContent": "GRE 高階難詞與同義語族；語意反差標記（Contrast clues）；Issue 立論分析與反駁架構。",
        "guideline": "ETS GRE General Test Verbal Reasoning 官方評量標準與雙向細目。"
    },
    "gmat": {
        "curriculumCode": "CEFR C1–C2 (全球頂尖商學院入學)",
        "stage": "全球商學院 MBA/MS 入學",
        "cefr": "C1 ~ C2 (GMAT Focus Edition)",
        "competency": "A2 系統思考、B1 符號運用、商業決策",
        "learningPerformance": "精準操作批判推理（Critical Reasoning）五大核心題型：Weaken, Strengthen, Assumption（否定測試法）, Evaluate, Boldface 角色判定。",
        "learningContent": "形式邏輯因果論證；充分必要條件；商業經濟長篇密集閱讀與 Data Insights 語文綜合判讀。",
        "guideline": "GMAC GMAT Focus Edition Verbal 官方評分規準與非邏輯干擾選項排除法。"
    },
    "toefl": {
        "curriculumCode": "CEFR B2–C1+ (海外學術英語能力)",
        "stage": "海外大學與研究所學術溝通",
        "cefr": "B2 ~ C1+ (TOEFL iBT 2026 新制 90–120分)",
        "competency": "B1 符號溝通、B2 科技資訊、C3 多元文化",
        "learningPerformance": "掌握 2026 TOEFL iBT 新制四技能：學術討論在線寫作（Writing for an Academic Discussion）、聽講速記與即席口說答辯。",
        "learningContent": "北美大學學術講座聽力；校園日常生活情境對話；學術閱讀長句簡化與觀點整合。",
        "guideline": "ETS TOEFL iBT 官方四技能評分量表（Rubrics）與 CEFR B2/C1 等級對照規準。"
    }
}

# 1. Update dist/curriculum.mjs
def enrich_curriculum_mjs():
    with open('dist/curriculum.mjs', 'r', encoding='utf-8') as f:
        content = f.read()

    for cid, meta in CHAPTER_METADATA.items():
        # Look for chapter id definition
        # e.g.: id: 'j1',
        pattern = re.compile(rf"id:\s*'{cid}',\s*num:\s*'([^']+)',\s*title:\s*'([^']+)',\s*subtitle:\s*'([^']+)',")
        match = pattern.search(content)
        if match:
            num = match.group(1)
            title = match.group(2)
            sub = match.group(3)
            # Check if curriculumCode already exists
            if f"id: '{cid}'," in content and "curriculumCode:" not in content[match.start():match.start()+600]:
                def esc(s):
                    return str(s).replace("\\", "\\\\").replace("'", "\\'")

                replacement = f"""id: '{cid}',
        num: '{num}',
        title: '{title}',
        subtitle: '{sub}',
        curriculumCode: '{esc(meta['curriculumCode'])}',
        stage: '{esc(meta['stage'])}',
        cefr: '{esc(meta['cefr'])}',
        competency: '{esc(meta['competency'])}',
        learningPerformance: '{esc(meta['learningPerformance'])}',
        learningContent: '{esc(meta['learningContent'])}',
        guideline: '{esc(meta['guideline'])}',"""
                content = content[:match.start()] + replacement + content[match.end():]
                print(f"✔️ Enriched chapter in curriculum.mjs: {cid} ({title})")
        else:
            print(f"⚠️ Chapter pattern not matched for {cid}")

    with open('dist/curriculum.mjs', 'w', encoding='utf-8') as f:
        f.write(content)
    print("dist/curriculum.mjs updated successfully!")


# 2. Update dist/curriculum_unified.mjs
GRADE_CEFR_MAP = {
    "g6": ("第三學習階段 (國小高年級 108 課綱)", "A1 ~ Pre-A2 (基礎起步 · 雙語銜接)", "教育部國小英語文學習成就評量標準：自然拼讀 (Phonics)、簡易日常生活對話與作息表達。"),
    "g7": ("第四學習階段 (國中 7 年級 108 課綱)", "A2 (初級起步 · 會考文法核心)", "心測中心國中教育會考雙向細目表：五大基本句型、代名詞格位、現在進行式與頻率副詞。"),
    "g8": ("第四學習階段 (國中 8 年級 108 課綱)", "A2+ (初級精熟 · 句構拓展)", "心測中心國中教育會考評量規準：過去簡單式、未來式、形容詞比較級最高級、動名詞與不定詞。"),
    "g9": ("第四學習階段 (國中 9 年級會考衝刺)", "A2++ / Pre-B1 (會考 A++ 標竿)", "國中教育會考精熟級 (A++) 雙向細目：現在完成式、被動語態、關係代名詞子句、名詞子句與多模態圖表題。"),
    "g10": ("第五學習階段 (高中一年級 108 課綱)", "B1 (學測核心基底)", "大考中心大學學測英文科命題規準：進階五大句型、動名詞語意區分、客觀被動語態、名詞副詞子句與 4500 詞彙。"),
    "g11": ("第五學習階段 (高中二年級 108 課綱)", "B1+ ~ B2 (學測前標與統測外語)", "大考中心學測與技專統測命題規準：分詞構句、獨立分詞、假設語氣全貌、分裂強調句、倒裝句與 ESP 科技論文。"),
    "g12": ("第五學習階段 (高三與大考巔峰戰力)", "B2 ~ C1 (學測滿級分 · 國際認證)", "大考中心學測非選寫作 20 分規準、混合題非選作答規範、GEPT 中高級與 TOEIC 900+ 金色證書雙向細目。")
}

def enrich_curriculum_unified_mjs():
    with open('dist/curriculum_unified.mjs', 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to enrich each unit object in UNIFIED_GRADES:
    # Look for "id": "gX-sY-uZ",
    # Add "stage", "cefr", "guideline" if not already present
    unit_pattern = re.compile(r'\{\s*"id":\s*"(g\d+-s\d+-u\d+)",\s*"unitNo":\s*"([^"]+)",\s*"title":\s*"([^"]+)",\s*"indicator":\s*"([^"]+)",\s*"competency":\s*"([^"]+)",')
    
    count = 0
    def repl(m):
        nonlocal count
        uid = m.group(1)
        unit_no = m.group(2)
        title = m.group(3)
        ind = m.group(4)
        comp = m.group(5)
        gid = uid.split('-')[0]
        stage_str, cefr_str, guide_str = GRADE_CEFR_MAP.get(gid, ("108 課綱", "A2", "標準指引"))
        count += 1
        return f"""{{
            "id": "{uid}",
            "unitNo": "{unit_no}",
            "title": "{title}",
            "indicator": "{ind}",
            "stage": "{stage_str}",
            "cefr": "{cefr_str}",
            "competency": "{comp}",
            "guideline": "{guide_str}", """

    new_content = unit_pattern.sub(repl, content)
    with open('dist/curriculum_unified.mjs', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"dist/curriculum_unified.mjs updated! Enriched {count} units.")

if __name__ == '__main__':
    enrich_curriculum_mjs()
    enrich_curriculum_unified_mjs()
