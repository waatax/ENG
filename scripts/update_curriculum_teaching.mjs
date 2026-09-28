import fs from 'node:fs';

const filePath = 'dist/curriculum.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// TOEIC CONCEPTS
const toeicConcepts = `concepts: [
          {
            heading: 'L&R 200 題 120 分鐘實戰配速與防超時策略',
            body: '聽力 100 題約 45 分鐘，閱讀 100 題 75 分鐘：\\n1. Part 1 照片題 (6題)：先看人動作，無人看物位置；依照片判斷狀態與動作；無人照片仍可能符合 has been p.p.，不能只憑無人就排除。\\n2. Part 2 簡短應答 (25題)：聽清楚第一個單字（Wh- 疑問詞 vs 助動詞）；回應可直接回答，也可用理由或替代安排間接回應；須與問題的溝通目的相關。\\n3. Part 3/4 對話與獨白 (69題)：利用音檔讀說明時間，提前畫線「下一題組 3 道題幹與選項核心詞」。\\n4. Part 5 單句填空 (30題)：限時 10–12 分鐘，平均每題 20 秒，先辨詞性與文法。\\n5. Part 6 段落填空 (16題)：限時 8–10 分鐘，句子插入題看前後邏輯鉤子。\\n6. Part 7 閱讀理解 (54題)：限時 50–55 分鐘，雙篇與三篇閱讀必須進行「跨文本資訊交叉比對 (Cross-text Synthesis)」。',
            tip: '考場硬性規則：聽力播放時嚴禁跨區翻看閱讀題；兩大 Section 之間不可折返劃記！'
          },
          {
            heading: '題型一・Part 5 單句填空：詞性秒殺法與商務高頻句構 (Incomplete Sentences - POS & Grammar Mastery)',
            body: '【核心構念 (Construct Essence)】\\nPart 5 共 30 題，是多益閱讀奪取金色證書的速度引擎。官方命題嚴格鎖定於國際商務語境下的精確詞性搭配、時態語態與動詞補語結構。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n視線先看四個選項字根是否相同：\\n1. 同字根題（詞性題）：直接看空格前後 2–3 個單字定位文法功能。\\n   - 若空格位於冠詞與名詞之間，必填形容詞 (e.g., an [impressive] portfolio)。\\n   - 若空格位於及物動詞之後且已有完整受詞，必填副詞修飾該動作 (e.g., reviewed the proposal [thoroughly])。\\n   - 若空格在介系詞之後：後方若有受詞，必填及物動名詞 V-ing；後方若無受詞且前方有冠詞 the，必填名詞。\\n2. 異字根題（商務語塊題）：先看主詞與動詞、或動詞與受詞的固定搭配 (Collocations，如 implement a policy, conduct an audit, negotiate terms)。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：動名詞 (Gerund) vs 動作名詞 (Action Noun)。例如：for ______ the budget 需填入及物性的 approving (有受詞 the budget)；若為 the ______ of the budget 則需填入 approval。\\n• 陷阱 2：分詞修飾語的主動與被動。進行或主動狀態用 V-ing (an increasing number of clients)；被動或完成狀態用 p.p. (damaged goods)。\\n• 陷阱 3：省略 should 的假設語氣。demand / recommend / require that S + (should) + 原形動詞 V (e.g., The CEO insisted that everyone attend the briefing)。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目：The board of directors requested that the finance committee submit the revised quarterly budget ______ than originally scheduled.\\n選項：(A) early  (B) earlier  (C) earliest  (D) earliness\\n【大師解剖】：看到空格後方的標竿詞「than」，直接鎖定比較級形式；修飾動詞片語 submit the revised quarterly budget 需要副詞比較級，故秒殺 (B) earlier！此題作答耗時應在 10 秒以內。',
            tip: '秒殺口訣：先看選項定題型，同根比詞尾 (-tion 名詞, -tive 形容詞, -ly 副詞)，前後 3 字定乾坤，20 秒交卷！'
          },
          {
            heading: '題型二・Part 6 段落填空：上下文語意錨點與句子插入題 (Text Completion - Cohesion & Sentence Insertion)',
            body: '【核心構念 (Construct Essence)】\\nPart 6 共 4 篇短文、16 題，包含商務電郵、備忘錄、新聞通告與內部公告。每篇 4 題中必含 1 題「句子插入題 (Sentence Insertion)」，考查篇章連貫性 (Cohesion) 與邏輯推展。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 單字與轉折詞題：切忌孤立閱讀該句，必須讀完該句及其前一句，判定上下文邏輯關係：\\n   - 因果：Consequently, Therefore, As a result\\n   - 轉折：However, Nevertheless, Nonetheless\\n   - 補充遞進：Furthermore, In addition, Moreover\\n   - 時間序列：Subsequently, Meanwhile, In the meantime\\n2. 句子插入題破題三步 SOP：\\n   - 步驟 A：先掃描空格前一句的「末端主詞或概念」與空格後一句的「開端主詞」。\\n   - 步驟 B：尋找指示代名詞 (this, these, such, that) 或重複概念作為「邏輯鉤子 (Logical Hooks)」。\\n   - 步驟 C：檢驗插入句是否符合整段的時間線（Chronological Timeline）與商務溝通情境。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：時態突變。整篇描述過去出差報銷流程，干擾項卻突兀出現未來的促銷承諾。\\n• 陷阱 2：假性代名詞。選項中的 "These results" 看似合理，但前句根本沒有提到任何實驗或統計數字，屬於偽關聯干擾項。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n情境：前句提及「The updated IT infrastructure will undergo server maintenance on Friday night.」，後句提到「Consequently, please save all active files before leaving the office on Friday afternoon.」\\n待插入句必為：「During this window, company intranet servers will be completely inaccessible.」，該句完美承接維護說明，並合理解釋為何下午必須提前儲存檔案！',
            tip: '句子插入題定位法則：前後代名詞與因果轉折副詞是最佳定錨點；凡是帶有 "such + 名詞" 的句子，前句必有該名詞的具體對應！'
          },
          {
            heading: '題型三・Part 7 閱讀測驗：單雙篇跨文本交叉比對秒殺矩陣 (Reading Comprehension - Cross-text Synthesis & Indirect Inference)',
            body: '【核心構念 (Construct Essence)】\\nPart 7 總計 54 題（單篇 29 題、雙篇 10 題、三篇 15 題），是邁向 860–990 金色證書的決勝主戰場。雙篇與三篇閱讀核心考點在於「跨文本交叉比對 (Cross-text Synthesis)」。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 雙篇/三篇切忌逐字死讀！先看文本標題類型（如 Text 1: 研討會議程表 Schedule + Text 2: 講者電子郵件 Email）。\\n2. 閱讀題幹關鍵字（人名、專案名稱、具體時間），辨識題型是單篇細節題還是「跨文本關聯題 (Cross-reference Question)」。\\n3. 跨文本題定位公式：\\n   - 題目問：「某人將在下午參加哪一場演講？」題幹只給人名。\\n   - 先到 Text 2 找出此人感興趣的主題或專業職稱（如 Data Security）。\\n   - 再折返 Text 1 查找 Data Security 對應的時間與會議室（如 Room 302, 2:00 PM）。\\n   - 答案永遠存在於兩篇文本的「交集點」！\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：過期舊資訊陷阱 (Outdated Information)。第一篇文本（原訂單或初步會議行程）提到了日期 A，但在第二篇文本（更正通知或延期電郵）中明確將日期改為日期 B。題目若問「實際會議日期」，選日期 A 即落入命題陷阱。\\n• 陷阱 2：直接照抄字面但語意偷換 (Verbatim Trap)。多益正確答案 90% 以上採用「同義改寫 (Paraphrasing)」，選項如果完全複製文章原字但更換了主詞或修飾詞，往往是精心設計的干擾項。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n母題示範：Text 1 為設備租賃價目表（Full-size Van: $60/day, GPS add-on: $12/day）；Text 2 為客戶確認單（租用 Full-size Van 3 天並勾選 GPS）。題目問：客戶結算發票總金額為何？\\n大師解剖：需跨篇計算：($60 + $12) * 3 = $216。此為標準跨文本資訊提取與數學合成題！',
            tip: '多益雙篇三篇心法：題組 5 題中，通常第 1–2 題查第 1 篇，第 3 題查第 2 篇，第 4–5 題必為跨文本交叉比對題！'
          },
          {
            heading: '多益高頻商務場景核心語塊與易混淆詞 (Business Collocations & Confusables)',
            body: '採購物流 (procurement & logistics)、航班行程 (flight itinerary)、開立發票 (issue an invoice)、費用核銷 (expense reimbursement)、會議議程 (meeting agenda)、人事招募 (recruitment & onboarding)、廠房巡檢 (facility inspection)。\\n易混淆字：complement (補充) vs compliment (稱讚)；comprise (包含) vs compose (組成)；access (使用權限) vs assess (評估)。',
            tip: '同音/近音干擾陷阱：Part 2 常出現發音相近但意思無關的字（如 coffee vs copy, plan vs plant）誘騙考生，這類選項 99% 是陷阱！'
          }
        ]`;

// SAT CONCEPTS
const satConcepts = `concepts: [
          {
            heading: 'Digital SAT 兩階段模組化適應性測驗 (MST) 機制與算分藍圖',
            body: 'Digital SAT 閱讀與寫作包含兩個 27 題、32 分鐘的模組 (Modules)：\\n1. Module 1（路由模組）：難度均勻分佈。系統採用邊界最大似然估計 (BMLE) 計算考生能力值 $\\\\hat{\\\\theta}$。\\n2. Module 2（自適應模組）：\\n- 若 Module 1 表現優異，進入 Hard Module 2，解鎖最高 800 分滿分區間。\\n- 若 Module 1 表現不佳，進入 Easy Module 2，分數天花板受限（通常不高於 600 分）。\\n3. 最終成績以 EAP (Expected A Posteriori) 聯合反應向量精算，包含標準測量誤差 (SEM)。',
            tip: '實戰策略：Module 1 前 15 題不容失誤，確保穩定打入 Hard Module 2！'
          },
          {
            heading: '三大核心題型解題架構藍圖 (Construct Blueprint)',
            body: '1. Craft and Structure (28%)：Words in Context 高難度語境詞彙精析（如 delineate, corroborate）、作者論證結構與修辭目的。\\n2. Information and Ideas (26%)：Command of Evidence 文本與數據證據定位、Inferences 邏輯完形結論推論。\\n3. Standard English Conventions (26%)：長句語法結構、Boundaries 標點符號、主謂一致、懸垂修飾語 (Dangling Modifiers)。\\n4. Expression of Ideas (20%)：修辭修訂、段落銜接過渡詞、學生研究筆記整合 (Rhetorical Synthesis)。',
            tip: '標點題秒殺法則：兩個獨立完整子句 (Independent Clauses) 之間，不可僅用逗號連接（Comma Splice 錯誤），必須使用分號 (;) 或逗號加對等連接詞 (, and)！'
          },
          {
            heading: '題型一・Craft & Structure: Words in Context 高階語境詞彙與修辭目的 (Contextual Nuance & Rhetorical Purpose)',
            body: '【核心構念 (Construct Essence)】\\nDigital SAT 徹底拋棄死記硬背生僻詞套路，聚焦於大學學術文獻、自然科學報告、歷史文獻中「高階學術詞彙（Tier 2 Academic Words）在極度精確語境下的修辭功能與意圖辨析」。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 嚴禁憑中文翻譯套入後「覺得通順」主觀猜測！Digital SAT 題幹文本極其凝練，命題團隊在空格前後必然埋設了 100% 絕對客觀的「同義指針 (Synonym Pointer)」或「反義對照標記 (Contrast Marker)」。\\n2. 尋找轉折樞紐詞：However, yet, far from, rather than, whereas 指向空格必須與文中已知形容詞/動詞構成精確反義；In addition, moreover, indeed, colon (:) 則指向空格為前句觀點的精確深化或同義置換。\\n3. 預測空格語意極性（+/-/中性）與詞義核心，再去四個選項中精確打擊！\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：字面常見義項干擾 (Familiar Sense Trap)。例如 compromise 常見義為「妥協」，但在學術安全語境中指「危害、使受損 (undermine / jeopardize)」；table 作動詞指「擱置延後討論」而非「擺在桌上」。\\n• 陷阱 2：感情色彩過度極端 (Overly Extreme Tone)。學術論述追求嚴謹客觀，非特殊修辭文本中，過度情緒化的詞彙（如 disastrous, miraculous, definitive）往往是干擾項。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目：Far from being a monolithic movement, modern environmentalism is characterized by ______ viewpoints, ranging from radical ecocentrism to pragmatic market-based policies.\\n選項：(A) homogeneous  (B) disparate  (C) dogmatic  (D) obsolete\\n【大師解剖】：看到句首樞紐結構「Far from being [monolithic]」（絕非單一鐵板一塊的），後文又列舉了從極端生態中心主義到實用市場政策的廣泛跨度，空格必須填入表達「多元、紛繁多樣」的精確學術詞彙。秒選 (B) disparate！(A) homogeneous 恰好反義，(C)(D) 與題幹語境無關。',
            tip: '語境詞彙破題律：空格答案必由題幹中另一個詞或句子成分嚴格保證，切勿帶入個人主觀偏好！'
          },
          {
            heading: '題型二・Information & Ideas: Command of Evidence & Logical Inferences 論據鎖定與完形推論 (Evidence Anchoring & Valid Conclusions)',
            body: '【核心構念 (Construct Essence)】\\n包含四大高分題型：Textual Evidence（文本引文論據）、Quantitative Evidence（圖表數據論據）、Inferences（完形邏輯結論推導）、Central Idea & Details（主旨與細節）。考查從學術實證資料推導合法結論的能力。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 論據支持/削弱題（Which finding, if true, would most strongly support/weaken the claim?）：\\n   - 第一步：迅速用括號圈出文章中研究人員的核心假說 (Hypothesis) 或主張 (Claim)，將其抽象為因果公式：自變量 X 導致 因變量 Y。\\n   - 第二步：審讀四個選項。若為「支持題」，選項必須證實 X 與 Y 之間的正相關/因果機制，或證明「沒有 X 則沒有 Y」，或排除潛在替代解釋；若為「削弱題」，選項必須指出異常數據 (Anomalous Evidence) 或提出變量 Z 才是導致 Y 的真因。\\n2. 完形推論題（Which choice most logically completes the text?）：\\n   - 結論必須「嚴格由已知前提推出」，不可外推跨出文章設定的邊界（嚴守 Scope of the Argument）。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：範疇漂移 (Scope Shift)。選項內容本身是客觀科學真理，但它所論述的對象超出了本實驗特定物種、特定地理區域或特定時間範疇。\\n• 陷阱 2：相關性誤當因果 (Correlation as Causation)。選項僅證明兩者同時發生，但題幹要求支持「前者引發後者」的機制。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目情境：某古生物學家假設某古代鳥類的長羽毛是用於「求偶展示」而非「飛行輔助」。問哪項發現最支持此假設？\\n大師解剖：支持項必須呈現求偶特異性，例如發現該羽毛僅在成熟雄性化石中出現，且其羽軸強度不足以支撐空氣動力學負荷。這直接驗證了求偶假說並排除了飛行功能！',
            tip: '圖表題黃金法則：先讀圖表標題、座標軸單位 (Units)、圖例 (Legend)，再回題幹定位數值，嚴防百分比 (Percentage) 與絕對數 (Absolute Value) 偷換！'
          },
          {
            heading: '題型三・Standard English Conventions: 句子邊界標點、修飾語與平行結構 (Boundaries, Modifiers & Syntactic Symmetry)',
            body: '【核心構念 (Construct Essence)】\\n考查 100% 客觀的標準書面英文法規，也是 Module 1 與 Module 2 中最具「確定性秒殺」特性的高分題型。核心涵蓋：Boundaries（句界標點）、Form, Structure, and Sense（主謂一致、動詞時態語態、代名詞指涉、修飾語懸垂、對等平行結構）。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 第一步：抓全句主幹！迅速挑出句子主要主詞 (Subject) 與主要限定動詞 (Finite Verb)，將所有介系詞片語、關係子句、同位語括號隔離。\\n2. 第二步：標點邊界三大鐵律（Punctuation Golden Rules）：\\n   - 鐵律 A（分號 ;）：兩邊必須均為能獨立成句的獨立子句（Independent Clause; Independent Clause）。分號功能等同句號。\\n   - 鐵律 B（逗號加對等連接詞 , FANBOYS）：IC, and/but/so/or IC。絕不能只用逗號連接兩獨立子句（此為 Comma Splice 致命錯誤！）。\\n   - 鐵律 C（冒號 : 與破折號 —）：冒號前方必須是語法完整的獨立子句（Complete IC），後方可以接單字、片語或子句，用作同位解釋、列表或結果。\\n3. 懸垂修飾 (Dangling Modifiers) 秒殺法：句首分詞片語或介系詞片語（如 Having completed the trials, ...），逗號後面緊接的主詞必須是「完成臨床試驗的那個邏輯主體」（如 the researchers）！\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：主謂遠距離阻隔 (Intervening Prepositional Phrases)。主詞與動詞之間夾雜長達 15 字的介系詞修飾，誘騙考生用最靠近動詞的複數名詞來決定動詞單複數。\\n• 陷阱 2：雙主詞贅肉 (Redundant Subject)。The scientist who led the expedition she discovered...（scientist 與 she 重複）。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目：Using laser spectroscopy to analyze ancient terracotta vessels, ______\\n選項：(A) significant chemical residues of cacao were detected by the archaeologists.\\n(B) the archaeologists detected significant chemical residues of cacao.\\n(C) cacao\\'s chemical residues were significantly detected.\\n(D) detection of chemical residues was achieved by the archaeologists.\\n【大師解剖】：句首現在分詞片語 Using laser spectroscopy...，使用儀器的人必須是「考古學家 (the archaeologists)」，因此逗號後第一個字必為 the archaeologists！秒殺 (B)，排除 (A)(C)(D) 懸垂修飾錯誤！',
            tip: '標點題秒殺心法：見到選項包含「分號 (;)」與「句號 (.)」，若兩者周圍詞彙完全相同，則兩者必同時錯誤（因兩者語法功能等價）；直接在逗號與連接詞間定奪！'
          }
        ]`;

// Update TOEIC
const toeicStart = content.indexOf("id: 'toeic'");
const toeicEnd = content.indexOf("vocab:", toeicStart);
const toeicConceptsStart = content.indexOf("concepts: [", toeicStart);
if (toeicConceptsStart !== -1 && toeicConceptsStart < toeicEnd) {
  content = content.slice(0, toeicConceptsStart) + toeicConcepts + ',\n        ' + content.slice(toeicEnd);
  console.log('Updated TOEIC concepts!');
}

// Update SAT
const satStart = content.indexOf("id: 'sat'");
const satEnd = content.indexOf("vocab:", satStart);
const satConceptsStart = content.indexOf("concepts: [", satStart);
if (satConceptsStart !== -1 && satConceptsStart < satEnd) {
  content = content.slice(0, satConceptsStart) + satConcepts + ',\n        ' + content.slice(satEnd);
  console.log('Updated SAT concepts!');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating dist/curriculum.mjs!');
