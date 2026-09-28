import fs from 'node:fs';

const filePath = 'dist/curriculum.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// Refined GRE Concepts
const greConcepts = `concepts: [
          {
            heading: '題型一・Text Completion: 單/雙/三空確定性錨點破題矩陣 (TC Deterministic Anchor Matrix)',
            body: '【核心構念 (Construct Essence)】\\nGRE Verbal 考的不是生僻詞本身，而是「邏輯正反向關係 (Logical Directionality)」與高階思維。雙空與三空題切忌從第一格硬猜，必須運用「線索獨立空格先解 (Anchor Blank First)」法則。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 尋找語意錨點：先掃描全句，尋找修飾成分最完整、語意最明確的那個空格作為破題突破口。\\n2. 讓步與反差辨析：識別 although, however, nevertheless, paradoxically, ironically, far from, rather than, belie 的語意翻轉點；分清作者主句主張與讓步從句的層次。\\n3. 辯證結構推進：學術長句常呈現「正題 (Thesis) $\\\\to$ 反題 (Antithesis) $\\\\to$ 合題 (Synthesis)」三層推進，三空格常各自對應這三個哲學階段。\\n4. 標點符號邏輯功能：分號 (;) 代表語意平行或對比延伸；冒號 (:) 代表前句主張的具體解釋或同義重述。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：主觀世俗常識腦補。嚴格依據題幹內的對應詞 (Pivot Words) 判定正負色彩，切勿引入未提及的外部背景知識。\\n• 陷阱 2：雙空題連鎖反應。第二空格通常是第一空格推論成立的邏輯前提，兩空格之間往往互為線索，不可割裂解讀。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目：Although the senator claimed her motives were entirely altruistic, her voting record revealed an unmistakably ______ agenda.\\n大師解剖：樞紐詞「Although」引導讓步從句，主句的空格必與從句的「altruistic (利他的)」形成鮮明反義！空格必須具有「自私的、追逐私利的」色彩，秒殺 mercenary 或 self-serving！',
            tip: '雙空題連鎖反應：第二空格通常是第一空格推論成立的邏輯前提，兩空格之間往往互為線索，不可割裂解讀。'
          },
          {
            heading: '題型二・Sentence Equivalence: 六選二孿生同義詞等價密碼 (SE Twin Synonyms & Equivalence)',
            body: '【核心構念 (Construct Essence)】\\n句子等價題要求在 6 個選項中選出恰好 2 個答案，填入後不僅兩者各自語法正確，更必須使全句所表達的「語意與修辭意圖完全等價 (Produce sentences that are alike in meaning)」。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 步驟 A：先分析題幹邏輯骨架，確定空格的語意方向（正向/負向/特定學術屬性）。\\n2. 步驟 B：掃描 6 個選項，進行「同義詞組對 (Twin Synonym Grouping)」；通常 6 個選項會分成兩組同義詞與兩個孤立干擾詞。\\n3. 步驟 C：將成對同義詞帶入題幹檢驗，確保填入後的兩句話在學術語意層次上無微小歧異。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：孤立詞語意完美但無孿生詞對。某個選項填入句意極佳，但在其餘 5 個選項中找不到第二個同義詞，此為最致命的誘答陷阱！\\n• 陷阱 2：同義但感情色彩或適用語境偏離。例如 superficial (膚淺的) 與 cursory (草率倉促的) 在某些字典列為同義，但在學術批判語境中一者指深度不足，一者指時間匆忙，不可混用。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目：Because of the team\\'s ______ efforts, the historic cathedral was restored to its pristine condition ahead of schedule.\\n選項：(A) sporadic (B) relentless (C) perfunctory (D) unflagging (E) tentative (F) futile\\n大師解剖：題幹「Because of」表因果，結果是提早恢復原貌，因此努力必須是堅持不懈的。(B) relentless 與 (D) unflagging 構成完美孿生同義詞組，填入後全句語意完全一致！',
            tip: 'SE 六選二心法：無同義詞組對的選項直接排除；兩詞必須填入後全句語意等價，不可僅憑單字表面近義就草率勾選！'
          },
          {
            heading: '題型三・Academic Reading Comprehension & Argument Analysis 翻案文架構與作者立場辨析 (Revisionist Structure & Epistemic Stance)',
            body: '【核心構念 (Construct Essence)】\\nGRE 閱讀篇章源自權威學術期刊，以「翻案文 (Historiographical Revisionism)」為最具代表性題型。考查學術長篇密集論證、因果機制推導與異常數據反證。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 翻案文經典三部曲：\\n   - 第一階段：提出傳統歷史學界或科學界普遍接受的主流舊說 (Traditional Historiographical Consensus)。\\n   - 第二階段：引述新出土考古文獻、新計量統計模型或異常實驗數據 (Anomalous Evidence)，挑戰舊說盲區。\\n   - 第三階段：作者提出修訂版綜合框架 (Nuanced Synthesis)，非全然推翻，而是界定適用邊界。\\n2. 作者認知態度 (Author\\'s Epistemic Stance) 判讀：\\n   - unqualified endorsement：無保留全力支持（極少出現）。\\n   - guarded skepticism：審慎懷疑（最常作為正確答案）。\\n   - measured optimism：適度審慎的樂觀。\\n   - scathing repudiation：嚴厲斥責抨擊。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：極端化詞彙干擾項。凡出現 completely, infallible, unequivocally, wholly discredited 等極端化詞彙之選項，95% 以上為命題陷阱。\\n• 陷阱 2：細節偷換主詞。將學者 A 的主張安插到學者 B 頭上。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n文章首句：「Historians long assumed that urban migration in 19th-century Europe uniformly degraded living standards...」\\n第二句：「However, recent parish records examined by Dubois suggest...」\\n大師解剖：看到「long assumed」直接預判下文必有「翻案」！作者隨後引述 Dubois 的新資料，態度屬於「qualified revision (有保留的修正)」，主旨題直接鎖定 challenge a prevailing historical assumption！',
            tip: '長篇閱讀定位法：主旨題先抓第一段末句或第二段首句轉折；細節題務必回到原文錨定對應行數，以「同義改寫 (Paraphrase)」為唯一判定標準。'
          },
          {
            heading: 'Analytical Writing Issue 30 分鐘五步立論法',
            body: 'GRE Issue 寫作要求針對複雜學術/社會議題提出深刻批判論證：\\n1. 審題破題 (3分鐘)：辨析題目預設前提 (Premise) 與極端詞 (invariably, only)。\\n2. 立場聲明 (Thesis)：提出具備複雜度之觀點（"While X offers tangible merits, uncritical adoption poses Y..."）。\\n3. 正面論證 (Body 1 & 2)：舉出自然科學、歷史或社會學實證案例，推導因果機制。\\n4. 承認反對意見與駁斥 (Counterargument & Refutation)：展現多視角思維深度。\\n5. 結論昇華 (Conclusion)：總結主張並提出兼顧現實之政策/哲學建言。',
            tip: 'Issue 評分量表 (0–6分)：4 分看論點完整，5 分看例子深刻，6 分看批判思維 (Critical Insight) 與語言駕馭的精準度。'
          }
        ]`;

// Refined GMAT Concepts
const gmatConcepts = `concepts: [
          {
            heading: '批判推理 (Critical Reasoning) 核心五大題型模型',
            body: 'GMAT 批判推理是商學院入學測驗的靈魂，考查嚴密邏輯思維：\\n1. 假設題 (Assumption)：找尋作者推導結論時「未言明但必不可少的必要條件」。檢驗法：否定測試法 (Negation Technique)——將選項取非，若結論立刻崩塌，該選項必為正確答案！\\n2. 削弱題 (Weaken)：找出一個新資訊，能證明「即使前提成立，結論也未必成立」（常考因果倒置、另有他因、樣本偏差）。\\n3. 支持題 (Strengthen)：排除潛在他因、證實無因即無果、強化樣本代表性。\\n4. 推論題 (Inference)：100% 依據題幹已知事實推導，嚴禁任何無端腦補。\\n5. 評價題 (Evaluate)：找出若回答 Yes 或 No 會分別強烈支持或削弱結論的關鍵變數。',
            tip: '現行 GMAT 規則：徹底排除舊版文法改錯 (Sentence Correction)；完成全卷 23 題後，若有剩餘時間，可以檢查本節作答，但至多修改 3 道題答案！'
          },
          {
            heading: '題型一・CR Weaken & Strengthen 因果論證三大致命漏洞與攻防向量 (Causal Argument Vulnerabilities)',
            body: '【核心構念 (Construct Essence)】\\nGMAT CR 80% 以上論證屬於因果推論（Premise: 事件 A 發生，Conclusion: A 導致 B）。商學院評估候選人是否能敏銳識別商業決策中的歸因謬誤。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 區分事實與推論：題幹中給定的 Premise 為不可爭辯的既成事實，絕不可質疑 Premise 本身之真實性，攻擊點永遠在 Premise 到 Conclusion 的推導邏輯漏洞！\\n2. 識別三大漏洞：\\n   - 另有他因 (Alternative Cause)：忽視可能同時存在的外部變量 C 才是造成 B 的真因。\\n   - 因果倒置 (Reverse Causality)：將結果與原因順序搞反。\\n   - 樣本選擇偏差 (Selection Bias)：由特殊自願群體推論全體母體。\\n3. 削弱與加強的對偶性：\\n   - 削弱題：主動引入另有他因、因果倒置可能、或指出樣本偏差。\\n   - 加強題：主動排除混淆變量、證實「無 A 則無 B」、或提供平行行業類似操作的成功驗證。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：質疑前提事實。選項若企圖反駁題幹已給出的統計數據，直接排除！\\n• 陷阱 2：無關信息混淆。涉及產品外包裝顏色、公司成立歷史等無關商業細節，皆為經典干擾項。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目：某連鎖超市延長每晚營業時間 2 小時後，該季度銷售額增長了 15%。經理因此宣稱，延長營業時間是銷售增長的原因。問哪項最削弱？\\n大師解剖：另有他因攻擊！正確選項：該季度該超市同時啟動了全店 7 折會員促銷活動。這直接說明 15% 的增長極可能是促銷帶來的，而非延長營業時間！',
            tip: '因果攻防金律：削弱找「他因/倒置/偏差」；加強找「排他因/無因無果/同因同果」！'
          },
          {
            heading: '題型二・CR Assumption 假設題「否定測試法」決策樹 (Negation Decision Tree)',
            body: '【核心構念 (Construct Essence)】\\n假設（Assumption）是讓論證結論得以成立的「未明言必要條件 (Sine Qua Non)」。沒有這個假設，作者的推理大廈將瞬間坍塌。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n否定測試法 (Negation Technique) 三步 SOP：\\n1. 步驟一：選取待測選項，將其動詞取非（將肯定的選項加 NOT，或將含有 NOT 的選項去掉 NOT）。\\n2. 步驟二：將取非後的命題帶回原題幹，檢視原論證結論是否受到實質致命衝擊。\\n3. 步驟三：若結論因此立即瓦解崩潰（Argument Falls Apart），該選項就是正確答案！\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：充分條件陷阱。假設必須是「必要條件」，不可將題目推向過度嚴苛的充分條件（例如：結論只需降低成本，選項不需保證降低所有產品的成本）。\\n• 陷阱 2：極端絕對語氣。帶有 all, completely, impossible 等絕對詞的選項，往往是充分條件而非作者心底默認的底層必要假設。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n題目結論：透過採用全自動組裝機器人，本工廠將能降低每台汽車的生產總成本。\\n假設檢驗：\\n選項：機器人的維護與折舊成本不會超過節省下來的人工工資。\\n取非測試：若機器人的維護折舊成本「超過」節省下來的人工工資，則生產總成本不僅不會降低，反而會上升！結論徹底瓦解！取非即死，驗證此選項必為正確假設！',
            tip: '否定測試口訣：「取非即死」——選項取反若能一劍封喉擊潰作者結論，該選項必為作者心底默認的底層假設！'
          },
          {
            heading: '題型三・CR Method of Reasoning / Boldface 黑體字角色題判定決策樹 (Boldface Role Architecture)',
            body: '【核心構念 (Construct Essence)】\\n黑體字題考查對學術與商業論證內部各組件功能角色的抽象結構認知。考生必須抽離具體商業細節，精確識別各句的邏輯功能。\\n\\n【步驟 0 破題思維 (Step 0 Mindset)】\\n1. 判定組件屬性 (Fact vs. Claim)：\\n   - 客觀事實 (Evidence / Premise / Finding / Data)：歷史數據、實驗測量結果、既成事實。\\n   - 主觀主張 (Claim / Judgment / Hypothesis / Position)：作者或反對派提出的判斷、預測或結論。\\n2. 判定立場陣營 (Support vs. Oppose)：\\n   - 該黑體字是站在作者立場，還是站在作者反對的立場（Opponent\\'s argument）？\\n3. 判定結論層級：\\n   - 是中間過渡結論 (Intermediate / Subsidiary Conclusion)，還是全篇最終推論 (Main Conclusion)？\\n4. 排除技巧：快速掃描選項前半句與後半句的功能關鍵字，只要一處不符合立即排除，無需全文細讀選項。\\n\\n【致命陷阱診斷 (Traps Diagnosis)】\\n• 陷阱 1：混淆中間結論與最終結論。中間結論後方往往還有 However 或 Therefore 引導全篇最終立場。\\n• 陷阱 2：立場張冠李戴。將作者用來駁斥的對手前提誤當成作者自己的支持論據。\\n\\n【大師經典示範題精析 (Master Worked Demonstration)】\\n句型結構：[Many analysts claim that company X will dominate the EV sector.] (BF 1) However, because rare earth raw material costs have doubled, [this projection is largely overoptimistic.] (BF 2)\\n大師解剖：BF 1 是作者反對的主張 (a claim that the argument seeks to challenge)；BF 2 是作者提出的最終主要結論 (the main conclusion of the argument)。直接在選項中精準匹配！',
            tip: '黑體字定位關鍵詞：However, But, Clearly, Therefore, Hence 往往是立場轉換與最終結論的旗幟標誌。'
          },
          {
            heading: '題型四・商學長文精讀與 Data Insights 跨文本邏輯 (Two-Sided Platforms & Multi-Source Synthesis)',
            body: 'GMAT 閱讀篇幅長、句法密集，涉及企業管理戰略、雙邊平台網路效應、金融市場、科技演進、反壟斷監管：\\n- 略讀框架：每段只精讀第一句與轉折句，在草稿紙寫下段落功能（P1: 提出舊商業理論；P2: 實證數據挑戰舊理論；P3: 提出新平台經濟模型）。\\n- Data Insights 語言整合：比對圖表趨勢與多來源文本陳述，找出邏輯矛盾與數據盲區。\\n- 雙邊平台動態 (Two-Sided Platforms)：跨邊網路外部性 (Cross-Side Network Effects) 與補貼策略。',
            tip: '商業決策題常見陷阱：將「相關性 (Correlation)」誤當成「因果性 (Causation)」，或將「利潤增加」誤當成「銷售額增加」（忽略成本變量）。'
          }
        ]`;

// Update GRE
const greStart = content.indexOf("id: 'gre'");
const greEnd = content.indexOf("vocab:", greStart);
const greConceptsStart = content.indexOf("concepts: [", greStart);
if (greConceptsStart !== -1 && greConceptsStart < greEnd) {
  content = content.slice(0, greConceptsStart) + greConcepts + ',\n        ' + content.slice(greEnd);
  console.log('Updated GRE concepts!');
}

// Update GMAT
const gmatStart = content.indexOf("id: 'gmat'");
const gmatEnd = content.indexOf("vocab:", gmatStart);
const gmatConceptsStart = content.indexOf("concepts: [", gmatStart);
if (gmatConceptsStart !== -1 && gmatConceptsStart < gmatEnd) {
  content = content.slice(0, gmatConceptsStart) + gmatConcepts + ',\n        ' + content.slice(gmatEnd);
  console.log('Updated GMAT concepts!');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating GRE and GMAT in dist/curriculum.mjs!');
