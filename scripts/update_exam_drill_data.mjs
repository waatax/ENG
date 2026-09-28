// scripts/update_exam_drill_data.mjs
// 擴充 exam_drill_data.mjs，加入完整之 TOEIC, SAT, GRE, GMAT 四大考制題型分類與高擬真錨定題庫

import fs from 'node:fs';

const content = `// exam_drill_data.mjs - TOEIC, SAT, GRE & GMAT 高階題型實戰演練錨定資料庫與題型映射表

export const TOEIC_DRILL_TYPES = [
  { id: 'all', label: '🌟 全部題型 (綜合隨選 3,000 題)', filter: '' },
  { id: 'part5-pos', label: '⚡ Part 5 詞性與詞尾變化 (Parts of Speech)', filter: 'Part 5 詞性與詞尾變化' },
  { id: 'part5-grammar', label: '📐 Part 5 時態語態與子句 (Grammar & Tenses)', filter: 'Part 5 時態與被動語態' },
  { id: 'part5-prep', label: '📌 Part 5 介系詞與商務搭配 (Collocations)', filter: 'Part 5 介系詞與商務搭配' },
  { id: 'part6-completion', label: '📝 Part 6 段落填空與句子插入 (Text Completion)', filter: 'Part 6 段落填空' },
  { id: 'part7-single', label: '📄 Part 7 單篇商務書信與公告 (Single Passage)', filter: 'Part 7' },
  { id: 'part7-multi', label: '📑 Part 7 雙篇關聯與跨文推論 (Cross-Text)', filter: '雙篇關聯閱讀' }
];

export const SAT_DRILL_TYPES = [
  { id: 'all', label: '🌟 全部題型 (綜合隨選 3,000 題)', filter: '' },
  { id: 'words-context', label: '🔍 Words in Context (語境詞彙精確度)', filter: 'Words in Context' },
  { id: 'evidence-text', label: '🎯 Command of Evidence (文本與圖表論據)', filter: 'Command of Evidence' },
  { id: 'inferences', label: '💡 Inferences (完形邏輯推論)', filter: 'Inferences' },
  { id: 'boundaries', label: '📐 Boundaries (分號冒號與句子邊界)', filter: 'Boundaries' },
  { id: 'modifiers', label: '⚙️ Form & Structure (懸垂修飾與主謂一致)', filter: 'Standard English Conventions' },
  { id: 'transitions', label: '✍️ Transitions & Rhetoric (轉折與修辭綜合)', filter: 'Expression of Ideas' }
];

export const GRE_DRILL_TYPES = [
  { id: 'all', label: '🌟 全部題型 (綜合隨選 3,000 題)', filter: '' },
  { id: 'tc-single', label: '🔠 TC 單空題 (Single Blank)', filter: 'Single Blank' },
  { id: 'tc-double', label: '🔀 TC 雙空題 (Double Blank)', filter: 'Double Blank' },
  { id: 'tc-triple', label: '🧩 TC 三空題 (Triple Blank)', filter: 'Triple Blank' },
  { id: 'se', label: '👯 SE 雙選等價 (Sentence Equivalence)', filter: 'Sentence Equivalence' },
  { id: 'rc', label: '📖 RC 學術閱讀 (Historiography / Purpose)', filter: 'Reading Comprehension' }
];

export const GMAT_DRILL_TYPES = [
  { id: 'all', label: '🌟 全部題型 (綜合隨選 3,000 題)', filter: '' },
  { id: 'cr-weaken', label: '🛡️ CR 削弱題 (Alternative Causes)', filter: 'Weaken the Argument' },
  { id: 'cr-strengthen', label: '🎯 CR 加強題 (Ruling Out Confounders)', filter: 'Strengthen the Argument' },
  { id: 'cr-assumption', label: '🔍 CR 假設題 (Negation Test)', filter: 'Find the Assumption' },
  { id: 'cr-evaluate', label: '⚖️ CR 評價題 (Two-Way Variance)', filter: 'Evaluate the Argument' },
  { id: 'cr-discrepancy', label: '💡 CR 矛盾解釋 (The Paradox of Safety Gear)', filter: 'Explain the Discrepancy' },
  { id: 'cr-boldface', label: '🏷️ CR 黑體字角色 (Method of Reasoning)', filter: 'Method of Reasoning' },
  { id: 'rc', label: '📊 RC 商業長文 (Platform Dynamics / Permits)', filter: 'Reading Comprehension' }
];

export const ANCHOR_DRILL_QUESTIONS = [
  // ==================== TOEIC 核心錨定示範題 ====================
  {
    id: "toeic-0001",
    category: "toeic",
    categoryLabel: "TOEIC 多益國際商務測驗",
    subtopic: "Part 5 詞性與詞尾變化 - 形容詞修飾名詞",
    difficulty: 3,
    passage: null,
    prompt: "The board of directors unanimously praised the marketing division for their ___ contribution to the company's annual revenue growth.",
    options: [
      "signify",
      "signification",
      "significant",
      "significantly"
    ],
    answer: 2,
    selectCount: 1,
    hint: "【步驟0秒殺破題】空格位於所有格 (their) 與名詞 (contribution) 之間，語法結構必為形容詞 (Adj.) 修飾後方名詞。",
    explain: "【大師級專業詳解·Part 5 詞性題秒殺方程式】\\n1. 結構剖析：their (所有格形容詞) + [ ___ ] + contribution (抽象名詞受詞) + to...\\n2. 詞性判斷：空格必然填入形容詞用以修飾名詞 contribution。\\n3. 選項詞性辨析：\\n   (A) signify：動詞（象徵、表示）\\n   (B) signification：名詞（含義、意義）\\n   (C) significant：形容詞（重大的、顯著的）➔ 正解\\n   (D) significantly：副詞（顯著地、重大地）\\n4. 商務高頻搭配：make a significant contribution to (對…做出重大貢獻)。"
  },
  {
    id: "toeic-0002",
    category: "toeic",
    categoryLabel: "TOEIC 多益國際商務測驗",
    subtopic: "Part 5 介系詞與商務搭配 - prior to 之前",
    difficulty: 3,
    passage: null,
    prompt: "All international travel reimbursement requests must be signed by the department supervisor ___ submission to the accounting office.",
    options: [
      "prior to",
      "in order that",
      "subsequent",
      "as long"
    ],
    answer: 0,
    selectCount: 1,
    hint: "【步驟0秒殺破題】空格後方接名詞受詞 submission (提交)，空格必須填入具介系詞功能的片語引導時間名詞。",
    explain: "【大師級專業詳解·Part 5 介系詞與商務搭配方程式】\\n1. 結構剖析：主句完整 (All requests must be signed...)，空格後接名詞 submission (名詞) + to the accounting office。\\n2. 選項功能辨析：\\n   (A) prior to：複合介系詞（等同 before），後接名詞或動名詞 V-ing，意為「在…之前」➔ 正解\\n   (B) in order that：連接詞（表目的），後方必須接完整子句 (S + V)\\n   (C) subsequent：形容詞（隨後的），不能直接作介系詞連接後方名詞\\n   (D) as long：殘缺片語，表條件需為 as long as 並後接子句\\n3. 商務場景：prior to submission / departure / arrival 為多益聽力與閱讀之極高頻慣用語。"
  },
  {
    id: "toeic-0003",
    category: "toeic",
    categoryLabel: "TOEIC 多益國際商務測驗",
    subtopic: "Part 6 段落填空 - 句子插入連貫題",
    difficulty: 4,
    passage: "To: All Engineering Staff\\nFrom: Facilities Management\\nSubject: Server Room Air-Conditioning Upgrade\\nDate: October 12\\n\\nPlease be advised that the primary cooling units in the central server facility will undergo scheduled overhaul this Saturday between 8:00 A.M. and 2:00 P.M. [ ___ ] Technicians will monitor system core temperatures on-site throughout the entire maintenance window to guarantee uninterrupted cloud service.",
    prompt: "Which sentence most logically completes the text in the bracketed space [ ___ ]?",
    options: [
      "Consequently, the cafeteria will expand its lunch menu options.",
      "A dual redundant backup chiller will operate automatically during this period.",
      "Most employees prefer to commute by subway rather than personal vehicles.",
      "The annual performance appraisal meetings have been rescheduled to next month."
    ],
    answer: 1,
    selectCount: 1,
    hint: "【步驟0篇章定位】前句提到主冷卻設備將於週六停機檢修，後句提到技術人員將監控溫度以確保服務不中斷；空格必為「檢修期間如何維持冷卻」的連貫方案。",
    explain: "【大師級專業詳解·Part 6 篇章句子插入四大錨點法】\\n1. 篇章因果邏輯鏈：\\n   前句：中央伺服器機房的主冷卻單元週六進行大修 (undergo overhaul)\\n   空格：[ ___ ] 應填入過渡保障機制！\\n   後句：技術人員現場監控溫度以「確保雲端服務不中斷」 (guarantee uninterrupted service)\\n2. 選項邏輯吻合度：\\n   (A) 食堂午餐菜單擴充：毫無關聯的離題干擾項。\\n   (B) A dual redundant backup chiller will operate...（雙備援冷卻機組將於此期間自動運轉）：完美銜接前句停機與後句維持低溫不中斷的因果，時間錨點 this period 亦呼應 Saturday。➔ 正解\\n   (C) 員工通勤方式：完全偏離伺服器機房檢修主題。\\n   (D) 年終考績會議改期：離題干擾項。"
  },
  {
    id: "toeic-0004",
    category: "toeic",
    categoryLabel: "TOEIC 多益國際商務測驗",
    subtopic: "Part 7 雙篇關聯閱讀 - 貨損投訴與客服主管回信",
    difficulty: 4,
    passage: "【Document 1: Customer Invoice & Damage Report】\\nOrder #8831 | Order Date: Sept 4 | Delivery Date: Sept 8\\nItem: 50 Ergonomic Executive Chairs (Model EC-200)\\nUnit Price: $120 | Total: $6,000\\nCustomer Note: Upon inspection at our loading dock, 6 chairs suffered severely damaged armrests during transit.\\n\\n【Document 2: Email from Supplier Customer Support】\\nDear Ms. Vance,\\nThank you for notifying us regarding Order #8831. Per our corporate warranty, we provide replacement parts within 48 hours or offer an immediate credit memo for the full purchase price of any defective units upon receiving photographic proof. We have received your photos and processed the refund credit for the six damaged chairs.\\nSincerely, Mark Dawson, Support Manager",
    prompt: "How much credit will be refunded to Ms. Vance's account according to the documents?",
    options: [
      "$120",
      "$600",
      "$720",
      "$6,000"
    ],
    answer: 2,
    selectCount: 1,
    hint: "【步驟0跨篇交叉比對】定位 Document 1 之單價與受損數量，交叉運算 Document 2 承諾之全額退款金額。",
    explain: "【大師級專業詳解·Part 7 多篇閱讀交叉數據運算】\\n1. 資訊交叉定位：\\n   - Document 1 載明：每張人體工學椅單價為 $120 (Unit Price: $120)，回報受損數量為 6 張 (6 chairs suffered damaged armrests)。\\n   - Document 2 載明：Mark Dawson 確認針對這 6 張受損椅子處理全額退款信用額度 (processed the refund credit for the six damaged chairs per full purchase price)。\\n2. 運算推導：6 張 × $120/張 = $720。\\n3. 陷阱排除：\\n   (A) $120 為單張椅子價格。\\n   (B) $600 為計算錯誤干擾項（誤乘 5 張）。\\n   (D) $6,000 為整筆訂單全部 50 張椅子的總額，非受損退款額。"
  },

  // ==================== SAT 核心錨定示範題 ====================
  {
    id: "sat-0001",
    category: "sat",
    categoryLabel: "Digital SAT 數位測驗",
    subtopic: "Craft and Structure: Words in Context - Academic Vocabulary",
    difficulty: 5,
    passage: "Although the archival manuscript was severely degraded by mold, paleographers were astonished to find that the medieval scribe's calligraphic marginalia were remarkably ___, allowing twentieth-century scholars to decipher the legal codex with minimal guesswork.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    options: [
      "pellucid",
      "ephemeral",
      "ambiguous",
      "archaic"
    ],
    answer: 0,
    selectCount: 1,
    hint: "【步驟0語境反差與線索解碼】句首 Although... severely degraded（儘管嚴重受損）構成讓步對比，後文 decipher with minimal guesswork（毫不費力即可解讀）要求填入「清澈易讀」的精確學術詞。",
    explain: "【大師級專業詳解·SAT Words in Context 雙向語境約束法】\\n1. 語意推導路徑：\\n   - 邏輯樞紐 (Pivot)：Although 引導讓步反差。前半句指手稿受黴菌侵蝕嚴重降解 (severely degraded by mold)；\\n   - 核心線索：後文 astonished to find... decipher with minimal guesswork（震驚地發現...僅需極少猜測即可解讀）。\\n   - 預測詞 (Prediction)：空格必填入「清晰易認、一目了然 (clear / legible)」之高階詞彙。\\n2. 選項精確度辨析：\\n   (A) pellucid：形容詞，指文筆或筆跡極其清澈明瞭的 (translucently clear, easily understood) ➔ 完美契合語境！\\n   (B) ephemeral：短暫短命的 (fleeting, short-lived)，與解讀難易度無涉。\\n   (C) ambiguous：模糊不清有歧義的，與後文 minimal guesswork 完全矛盾。\\n   (D) archaic：古老的，手稿本為中世紀物件，填入為廢話同義反覆，無法形成 astonished 的驚艷反差。"
  },
  {
    id: "sat-0002",
    category: "sat",
    categoryLabel: "Digital SAT 數位測驗",
    subtopic: "Information and Ideas: Command of Evidence - Textual",
    difficulty: 5,
    passage: "Ecologist Dr. Elena Rostova hypothesized that mutualistic mycorrhizal fungi networks in boreal forest soils do not merely distribute phosphorus uniformly; rather, they actively allocate resources preferentially to tree saplings that are experiencing severe photosynthetic stress from heavy canopy shading.\\n\\nWhich finding, if true, would most directly support Dr. Rostova's hypothesis?",
    prompt: "Which choice most directly supports the researcher's hypothesis?",
    options: [
      "Boreal forest soils contain higher overall concentrations of nitrogen than do tropical rainforest soils.",
      "Mature canopy trees produce twice as many seeds in years following unusually mild winters.",
      "Radioisotope-labeled phosphorus injected into fungal mycelia was transferred at a fourfold higher rate to shaded saplings than to fully sunlit saplings of identical biomass.",
      "Certain invasive beetle species consume fungal fruiting bodies without altering root symbiosis."
    ],
    answer: 2,
    selectCount: 1,
    hint: "【步驟0假說鎖定】假說核心：菌根網絡並非均勻分配養分，而是「優先分配給遭受林冠遮蔭逆境的幼苗 (preferentially allocate to shaded saplings)」。支持項必須直接給出該差別待遇之量化實證！",
    explain: "【大師級專業詳解·SAT Command of Evidence 實證匹配律】\\n1. 假說因果鏈：\\n   - 假說陳述：Fungi actively allocate resources preferentially to saplings experiencing photosynthetic stress from canopy shading.\\n   - 證明要求：尋找實證數據證明「遮蔭逆境幼苗獲得顯著更多養分資源」。\\n2. 選項嚴密檢驗：\\n   (A) 北方森林土壤與熱帶雨林土壤氮含量比較：無關巨觀地理比較，未觸及遮蔭分配。\\n   (B) 成熟樹木種子產量與暖冬關係：無關物種繁殖現象。\\n   (C) 同等生物量下，放射性同位素標記的磷元素轉移至受遮蔭幼苗的速率是全日照幼苗的四倍 (fourfold higher rate to shaded saplings)：精確匹配「優先定向輸送養分給遮蔭逆境個體」之假說！➔ 正解\\n   (D) 甲蟲食用菌絲體：無關昆蟲生態干擾項。"
  },
  {
    id: "sat-0003",
    category: "sat",
    categoryLabel: "Digital SAT 數位測驗",
    subtopic: "Standard English Conventions: Boundaries - Semicolons & Commas",
    difficulty: 4,
    passage: "During the late nineteenth century, electrical pioneer Nikola Tesla conducted revolutionary high-voltage experiments at his Colorado Springs ___ his laboratory notebooks meticulously documented wireless energy transmission phenomena that conventional physics could not yet explain.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    options: [
      "facility, and",
      "facility; and,",
      "facility, while",
      "facility; there,"
    ],
    answer: 0,
    selectCount: 1,
    hint: "【步驟0句子邊界四大金科玉律】前後皆為獨立完整子句 (Independent Clause)，連接兩子句必須使用「分號 (;)」或「逗號 + 對等連接詞 (Comma + FANBOYS)」。",
    explain: "【大師級專業詳解·SAT 標點符號與子句邊界分流術】\\n1. 結構切分：\\n   子句 1：During the late nineteenth century, Nikola Tesla conducted experiments at his Colorado Springs facility (完整獨立子句，S + V + O)。\\n   子句 2：his laboratory notebooks meticulously documented wireless transmission phenomena... (完整獨立子句，S + V + O)。\\n2. 規範準則：\\n   - 規則：兩個獨立子句不能僅用單一逗號拼接 (Comma Splice 致命錯誤)。\\n   - 正確連結方式：\\n     ① \`;\` (分號)\\n     ② \`,\` + FANBOYS (for, and, nor, but, or, yet, so)\\n3. 選項逐一甄別：\\n   (A) facility, and：逗號 + 對等連接詞 and 完美合法連接兩獨立子句。➔ 正解\\n   (B) facility; and,：分號後不可緊接 and 再加多餘逗號。\\n   (C) facility, while：while 後接進行態或對比，此處前後為並列遞進事實，且逗號 while 易生歧義。\\n   (D) facility; there,：there 為副詞非連接詞，加逗號形成非法懸掛。"
  },

  // ==================== GRE 核心錨定示範題 ====================
  {
    subtopic: "Text Completion: Single Blank - Semantic Polarity",
    difficulty: 5,
    passage: null,
    prompt: "Far from being ___, the young philosopher's disquisition on phenomenology was remarkably lucid, unraveling labyrinthine metaphysical puzzles with effortless clarity that enthralled both undergraduates and senior fellows.",
    options: [
      "trenchant",
      "inscrutable",
      "eloquent",
      "perspicuous"
    ],
    answer: 1,
    selectCount: 1,
    explain: "句首 Far from being（遠非…）創造了強烈的否定反差，後文以 remarkably lucid（極其清晰易讀）與 effortless clarity（毫不費力的清晰）修飾其論述，故空格必須填入反義詞 inscrutable（難以理解的、深奧莫測的）。",
    hint: "識別否定反差引導結構 Far from being，空格需要填入 lucid / clarity 的反義詞。",
    id: "gre-0001",
    category: "gre",
    categoryLabel: "GRE 研究所入學考試 Verbal"
  },
  {
    subtopic: "Text Completion: Double Blank - Concession & Paradox",
    difficulty: 5,
    passage: null,
    prompt: "Although the municipal administration's austerity regime was initially lauded for its ___, rigorous independent audits subsequently revealed that the severe capital expenditure reductions had precipitated ___ infrastructural decay.",
    options: [
      "prudence; catastrophic",
      "extravagance; negligible",
      "audacity; superficial",
      "parsimony; transient"
    ],
    answer: 0,
    selectCount: 1,
    explain: "前半句 Although... initially lauded for 指出緊縮政策起初因「謹慎審慎 (prudence)」獲譽；後半句轉折 audits subsequently revealed 揭露大幅削減資本支出造成了「災難性的 (catastrophic)」基礎設施衰敗，語義邏輯嚴密對稱。",
    hint: "注意 Although 的讓步轉折結構：第一空為被讚許的美德 (prudence)，第二空為審計揭發的嚴重災難後果 (catastrophic)。",
    id: "gre-0004",
    category: "gre",
    categoryLabel: "GRE 研究所入學考試 Verbal"
  },
  {
    subtopic: "Text Completion: Triple Blank - Dialectical Thesis",
    difficulty: 5,
    passage: null,
    prompt: "The literary critic argued that the avant-garde novelist's latest prose was neither wholly ___ as reactionary reviewers had sneered, nor entirely ___ as obsequious partisans had proclaimed; instead, it represented a ___ synthesis that delicately balanced classical tropes with disruptive stylistic experiments.",
    options: [
      "banal; derivative; superficial",
      "visionary; sublime; archaic",
      "derivative; epochal; nuanced",
      "original; pedestrian; clumsy"
    ],
    answer: 2,
    selectCount: 1,
    explain: "三段式辯證：既非保守評論家嘲笑的「毫無創意的剽竊之作 (derivative)」，亦非諂媚支持者宣稱的「劃時代傑作 (epochal)」，而是微妙精準平衡傳統與前衛的「細膩精妙綜合體 (nuanced synthesis)」。",
    hint: "掌握三段式辯證平衡：neither [批評者的貶低] nor [捧殺者的盛讚], instead a [中肯細膩的綜合評價]。",
    id: "gre-0006",
    category: "gre",
    categoryLabel: "GRE 研究所入學考試 Verbal"
  },
  {
    subtopic: "Sentence Equivalence: Twin Synonyms - Burden & Difficulty",
    difficulty: 5,
    passage: null,
    prompt: "Because the ancient cuneiform clay tablets were fragmented and obscured by vitrified mineral deposits, translating the royal economic decrees proved to be an extraordinarily ___ undertaking for the epigraphers.",
    options: [
      "facile",
      "perfunctory",
      "elementary",
      "cursory",
      "onerous",
      "burdensome"
    ],
    answer: [4, 5],
    selectCount: 2,
    explain: "【GRE 六選二·句子等價雙選解析】\\n1. 題幹線索：泥板殘破 (fragmented) 且被礦物沉積物遮蔽 (obscured)，說明翻譯王室法令對銘文學家而言是極端艱鉅繁重的任務。\\n2. 雙選同義詞對：onerous（繁重的、艱難的）與 burdensome（沉重的、累人的）填入空格皆表極其繁重艱辛，句意完全等價。\\n3. 干擾項排除：facile（輕易的）與 elementary（容易的）方向相反；perfunctory（敷衍的）與 cursory（草率的）修飾態度而非事業本身的艱鉅度。",
    hint: "Sentence Equivalence 核心策略：尋找能替換且保持句意完全一致的孿生同義詞組 (Twin Synonyms)：onerous 與 burdensome 皆意為繁重艱辛的。",
    questionType: "sentence_equivalence",
    id: "gre-0007",
    category: "gre",
    categoryLabel: "GRE 研究所入學考試 Verbal"
  },
  {
    subtopic: "Reading Comprehension: Primary Purpose & Historiography",
    difficulty: 5,
    passage: "Passage:\\nIn examining the economic divergence between Western Europe and East Asia during the eighteenth century, institutional historians have historically attributed the rise of mechanized manufacturing exclusively to the advent of steam locomotion. However, recent quantitative cliometric analyses demonstrate that regional disparities in capital interest rates and legal enforcement of artisanal property rights were already driving technological differentiation decades prior to the widespread commercialization of coal engines.",
    prompt: "The primary purpose of the passage is to:",
    options: [
      "reappraise the causal mechanisms underlying historical economic divergence by foregrounding institutional determinants",
      "refute all quantitative methods currently employed in the field of economic cliometrics",
      "prove that the development of coal-powered steam engines hindered global technological innovation",
      "demonstrate that legal contracts were entirely non-existent in eighteenth-century manufacturing"
    ],
    answer: 0,
    selectCount: 1,
    explain: "文章指出過往史學界將工業崛起唯一歸因於蒸汽機，而最新量化計量史學則揭示資本利率與產權法律等制度因素在此前數十年即推動了分流，因此主旨是「透過強調制度決定因素重新審視歷史經濟分流的因果機制」。",
    hint: "分析作者寫作意圖：質疑單一技術決定論，引入法律產權等制度因素 -> reappraise causal mechanisms by foregrounding institutions。",
    id: "gre-0012",
    category: "gre",
    categoryLabel: "GRE 研究所入學考試 Verbal"
  },

  // ==================== GMAT 核心錨定示範題 ====================
  {
    subtopic: "Critical Reasoning: Weaken the Argument - Alternative Causes",
    difficulty: 5,
    passage: "Premise: Six months ago, Metropolitan Transit installed 400 self-service contactless ticketing kiosks to eliminate commuter ticketing queues.\\nConclusion: The average waiting time for commuters purchasing transit tickets has significantly decreased.",
    prompt: "Which of the following, if true, most seriously weakens the argument?",
    options: [
      "The transit authority expanded evening subway train frequencies on its two busiest trunk lines.",
      "Frequent software crashes on the new kiosks force commuters to wait in long lines for manual station agent assistance.",
      "The contactless kiosks accept digital mobile wallet payments as well as physical credit cards.",
      "Two neighboring transit authorities are currently reviewing procurement bids for identical kiosks."
    ],
    answer: 1,
    selectCount: 1,
    explain: "結論主張自動售票機減少了排隊時間；若自動售票機軟體頻繁當機死機，反而迫使乘客大排長龍等待人工站務員協助處理，直接打破了投入設備導致時間縮短的因果推論，構成致命削弱。",
    hint: "削弱題尋找否定因果鏈的實質反例：新技術故障導致乘客排隊時間不減反增。",
    id: "gmat-0001",
    category: "gmat",
    categoryLabel: "GMAT Focus 批判性推理與商業邏輯"
  },
  {
    subtopic: "Critical Reasoning: Strengthen the Argument - Ruling Out Confounders",
    difficulty: 4,
    passage: "Premise: Agricultural scientists applied a newly synthesized microbial bio-stimulant to experimental soybean plots, observing a 28% increase in pod yield compared to adjacent control plots.\\nConclusion: The microbial bio-stimulant is solely responsible for the observed harvest increase.",
    prompt: "Which of the following, if true, most strongly supports the conclusion?",
    options: [
      "Soybeans harvested from the treated plot commanded premium prices at international export auctions.",
      "The microbial bio-stimulant was synthesized from naturally occurring marine bacterial strains.",
      "The researchers plan to test the bio-stimulant on wheat and barley during the subsequent growing season.",
      "Soil composition, sunlight exposure, irrigation volume, and pest incidence were rigorously monitored and held identical across both plots."
    ],
    answer: 3,
    selectCount: 1,
    explain: "結論宣稱該微生物刺激素是產量提升的「唯一原因」；若土壤、日照、灌溉與蟲害等一切潛在混淆變因皆受到嚴格控制且完全相同（排除他因），最能強烈支持該刺激素確實是產量增長的決定性因素。",
    hint: "加強因果論證的黃金法則：嚴格排除其他混淆變因 (Ruling out confounding factors)。",
    id: "gmat-0003",
    category: "gmat",
    categoryLabel: "GMAT Focus 批判性推理與商業邏輯"
  },
  {
    subtopic: "Critical Reasoning: Find the Assumption - Negation Test",
    difficulty: 5,
    passage: "Plan: To curtail fossil fuel consumption, the municipality will offer a $4,000 subsidy to residents who scrap combustion vehicles and purchase battery electric vehicles (BEVs).\\nGoal: Significantly reduce citywide vehicular tailpipe greenhouse gas emissions over the next three years.",
    prompt: "The municipal plan relies on which of the following assumptions?",
    options: [
      "All public transit buses operating in the city have already achieved 100 percent zero-emission electrification.",
      "The financial subsidy will motivate a significant number of car owners who would not have otherwise transitioned to electric vehicles.",
      "Electric vehicles require zero maintenance expenses throughout their functional operating lifespan.",
      "Gasoline prices will skyrocket by over 50 percent within the municipal borders over the next year."
    ],
    answer: 1,
    selectCount: 1,
    explain: "使用否定測試 (Negation Test)：若否定該選項——「這筆補助無法激勵那些原本不打算換車的車主換購電動車」，那麼補助政策將毫無額外減碳效益，計畫目標徹底崩潰，證明此為不可或缺的必要假設。",
    hint: "假設題使用否定測試法 (Negation Test)：若假設不成立，整個減碳政策邏輯立刻瓦解。",
    id: "gmat-0005",
    category: "gmat",
    categoryLabel: "GMAT Focus 批判性推理與商業邏輯"
  },
  {
    subtopic: "Critical Reasoning: Method of Reasoning - Boldface Roles",
    difficulty: 5,
    passage: "Corporate governance critics frequently claim that **instituting mandatory worker representation on enterprise supervisory boards stifles managerial decision-making efficiency**. However, extensive longitudinal empirical data across European industrial firms demonstrate that **such representation substantially mitigates catastrophic labor walkouts and aligns long-term investment horizons**. Therefore, the contention that mandated employee governance harms enterprise competitiveness is unconvincing.",
    prompt: "In the argument above, the two boldface portions play which of the following roles?",
    options: [
      "The first is an assertion that the argument seeks to refute; the second is empirical evidence adduced to support that refutation.",
      "The first is the main conclusion of the argument; the second is a premise offered in support of that conclusion.",
      "The first is background context accepted by the author; the second is the author's primary concluding judgment.",
      "Both boldface portions are intermediate conclusions that support an identical corporate strategy."
    ],
    answer: 0,
    selectCount: 1,
    explain: "梳理論證脈絡：第一個粗體是批評者的主張，也是作者通篇致力於反駁的論調 (assertion that the argument seeks to refute)；第二個粗體是歐洲企業的客觀統計證據，用來支持作者對該主張的反駁 (empirical evidence to support refutation)。",
    hint: "注意轉折詞 However 與結論詞 Therefore：第一粗體為被駁斥的反方主張，第二粗體為支持作者反駁的客觀經驗證據。",
    id: "gmat-0008",
    category: "gmat",
    categoryLabel: "GMAT Focus 批判性推理與商業邏輯"
  },
  {
    subtopic: "Reading Comprehension: Business Economics - Two-Sided Platform Dynamics",
    difficulty: 5,
    passage: "Passage:\\nIn digital platform economics, two-sided networks exhibit cross-side network externalities where the value experienced by users on one margin (e.g., app developers) scales proportionally with the installed user base on the opposite margin (e.g., smartphone owners). Early strategic literature posited that platform operators must subsidize the more price-sensitive side indefinitely to preserve critical mass. However, empirical investigations of ridesharing and app ecosystems suggest that once platform dominance is established, operators face an inevitable tension between maintaining multi-homing deterrents and capturing monopoly surplus, frequently leading to developer revolts.",
    prompt: "According to the passage, why do dominant digital platforms experience tension with third-party developers?",
    options: [
      "Two-sided networks inherently prevent developers from distributing software across multiple competing platforms.",
      "Efforts by established platforms to extract economic rents often clash with developers' economic viability.",
      "Smartphone users refuse to download applications developed by third-party software engineers.",
      "Government regulators legally mandate that platform operators subsidize developers forever."
    ],
    answer: 1,
    selectCount: 1,
    explain: "文章指出平台在建立壟斷優勢後，會在維持防止開發者多平台跨棲 (multi-homing) 與攫取壟斷盈餘 (capturing monopoly surplus) 之間陷入緊張，導致開發者反彈，即平台企圖榨取租金直接侵害了開發者的經濟生存空間。",
    hint: "定位文章末尾衝突原因：operators face tension between multi-homing deterrents and capturing monopoly surplus -> developer revolts。",
    id: "gmat-0009",
    category: "gmat",
    categoryLabel: "GMAT Focus 批判性推理與商業邏輯"
  }
];
`;

fs.writeFileSync('dist/exam_drill_data.mjs', content, 'utf8');
console.log('Successfully updated dist/exam_drill_data.mjs with TOEIC, SAT, GRE, GMAT drill suites.');
