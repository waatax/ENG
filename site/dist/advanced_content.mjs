import {MASTERCLASS_TASKS} from './masterclass.mjs?v=advanced20261103';
const q=(prompt,options,answer,why)=>({prompt,options,answer,why});
const original=id=>MASTERCLASS_TASKS.find(t=>t.id===id);

export const ADVANCED_UNITS=[
 {
  ...original('synthesis'),number:1,level:'C1 → C2',minutes:25,icon:'▤',canDo:'能比較兩個來源，重組共同點、分歧與證據限制。',
  lesson:['摘要先保留作者的核心主張，再把來源依議題整合，而不是把 A 與 B 各縮短一遍就結束。讀者需要知道雙方在哪裡同意、為何不同意。','區分「有人提出需求」與「已證明全面有效」。把研究樣本、時間與成本限制帶進摘要，建議才不會超出來源。'],
  diagram:[['A + B','共同目標'],['However','分歧與限制'],['Therefore?','有條件的整合']],
  table:[['來源歸屬','The committee argues that…','指出誰的觀點，避免當成事實。'],['保留限制','The sample may not represent…','交代樣本涵蓋不到誰。'],['整合建議','A pilot could test whether…','先測試，避免保證結果。']],
  checks:[q('A 調查 80 名社團成員。哪個摘要最準確？',['All students need longer library hours.','Surveyed club members expressed demand for later access.','Most residents oppose evening access.'],1,'來源只涵蓋受訪社團成員。不能擴大成全校學生，更沒有居民反對的資料。'),q('哪句最能整合 A 的需求與 B 的成本考量？',['Demand makes costs irrelevant.','The director rejects all evening access.','A limited pilot could assess demand alongside staffing costs.'],2,'有限試辦同時保留需求與成本兩個面向；B 並未完全拒絕晚間服務。'),q('哪個連接詞最適合「有需求，但樣本有限」？',['However','Therefore','Similarly'],0,'However 標示限制或轉折。Therefore 需要推論結果；Similarly 表示相似。')],
  transfer:[q('研究甲發現 30 位志願者喜歡線上課；研究乙指出設備限制。哪個結論最適當？',['Online courses suit everyone.','A trial should include learners with limited access to devices.','Equipment has no bearing on participation.'],1,'把自選樣本的限制和設備障礙帶進設計，而非直接把偏好擴大為全民適用。'),q('兩篇文章都支持改善交通，卻對免費乘車的經費意見不同。摘要的組織最好是？',['只按文章順序逐段抄寫。','只保留贊成方，讓結論更清楚。','先交代共同目標，再比較經費與公平的取捨。'],2,'跨文本綜合要呈現關係與分歧，不是單方取樣或排列摘句。'),q('「A 的作者主張…」與「資料證明…」最大的差別是？',['前者標出觀點歸屬，後者宣稱有證據支持。','兩者永遠完全同義。','前者必定錯，後者必定對。'],0,'歸屬不是驗證；宣稱證明需要檢查證據強度。作者可能提出合理意見，但仍未用資料證實。')]
 },
 {
  ...original('argument'),number:2,level:'C1 → C2',minutes:30,icon:'⚖',canDo:'能提出可辯護的主張，公平回應反方並明定適用範圍。',
  lesson:['先把主張的範圍說清楚：every、some、normally、under these conditions 都會改變論證責任。反駁一個較弱的說法，並沒有回應真正的反方。','讓步不是在末段補一句「各有好壞」。承認合理限制後，說明你的政策如何處理例外、個別責任與執行條件。'],
  diagram:[['Claim','明確立場'],['Concession','最強反方'],['Conditions','回應與例外']],
  table:[['範圍','In courses where collaboration is an outcome…','界定哪些課程。'],['讓步','Admittedly, individual competence still matters.','承認合理顧慮。'],['回應','This can be addressed through an individual defence.','提出處理機制。']],
  checks:[q('原提案要求 every course 都有小組專題。哪個回應真正處理範圍？',['Some projects are enjoyable.','Teamwork is a useful word.','Individual-certification courses may require a different approach.'],2,'回應普遍要求需要處理合理例外；有趣或定義詞彙都沒有回答 every。'),q('哪句是實質讓步後的回應？',['Although schedules differ, staged check-ins can make contributions visible.','Opponents simply dislike teamwork.','Group projects are good because they are good.'],0,'這句承認排程差異，並提出可執行的處理辦法；其他兩句是貶低對手或循環論證。'),q('哪個證據最能評估「小組分數代表每人能力」？',['教室牆壁的顏色。','個別答辯與成員貢獻紀錄。','課程名稱的長度。'],1,'個別答辯與貢獻紀錄直接關聯個人能力；其他資訊無法支持這個推論。')],
  transfer:[q('「所有會議都應改成線上」最值得提出的例外是？',['開會的人通常有姓名。','線上有時很方便。','需要實體操作或無法可靠連線的場合。'],2,'有效反方針對 universal claim 的適用條件；方便不等於所有場合適用。'),q('哪句公平呈現反方？',['Critics reasonably question whether individual contributions can be assessed.','Critics are lazy and hate progress.','There is no possible objection.'],0,'公平呈現可回應的實質問題，而非替對方安上動機。'),q('什麼最能把「應公平評分」變成可執行政策？',['重複三次公平的重要。','設定貢獻紀錄、個別答辯與申訴程序。','使用更長的句子。'],1,'具體機制把價值主張落實為可觀察流程。重複口號或拉長句子，都無法說明要如何公平評分。')]
 },
 {
  ...original('register'),number:3,level:'C1 → C2',minutes:25,icon:'✉',canDo:'能依對象與目的調整語氣，同時保留承諾、事實與時間。',
  lesson:['語域轉換要改的是人際距離、資訊順序與用語；事件本身不能跟著改。正式不等於冗長，親切也不代表可以模糊期限。','先列出誰、什麼、何時、影響與下一步，再各寫一個版本。比較兩份訊息時，逐項核對資訊，而不只檢查難字。'],
  diagram:[['Facts','不變的資訊'],['Audience','對象與關係'],['Register','語氣與順序']],
  table:[['主管','I can provide the verified draft by…','清楚負責與新期限。'],['熟悉同事','Quick update: the export failed…','自然直接，仍保持準確。'],['避免','Something went wrong. Maybe soon.','原因與承諾都太模糊。']],
  checks:[q('哪個新期限符合來源？',['Thursday at 3 p.m.','Friday evening.','Whenever the data arrives.'],0,'來源承諾星期四下午三點；不能擅改成星期五或模糊的有空再說。'),q('改成非正式訊息時，哪件事應保留？',['每個字必須相同。','Friday review 仍按原計畫進行。','必須加入同事的私人資訊。'],1,'語氣可變，已知事實與安排不能擅改。不需逐字相同，也不應加入與任務無關的私人資訊。'),q('哪句最能對主管表現負責且有解法？',['The delay is somebody else’s fault.','It will be fine somehow.','I will send the introduction today and the verified draft on Thursday.'],2,'清楚交代可先交付的部分與修正時間，比推責或空泛保證更有用。')],
  transfer:[q('朋友邀約需改期，哪句自然又清楚？',['Could we move lunch to 1 p.m. on Friday?','Pursuant to lunch, temporal matters arise.','Later, probably.'],0,'自然語氣仍具備明確時間；其他選項過度堆詞或太模糊。'),q('客戶信改寫成內部訊息，哪個做法有風險？',['簡化客套開場。','把尚未確認的日期改成保證交期。','保留負責人與下一步。'],1,'改寫不能提高原資訊的確定性或新增承諾。簡化開場和保留下一步可改善閱讀；擅自保證日期會失真。'),q('收件者最需要一分鐘內做決定，資訊順序應優先是？',['所有背景細節，再說目的。','艱深詞彙清單。','所需決定、期限與關鍵理由。'],2,'依任務安排資訊，讓讀者先知道需要做什麼。完整背景可放後面；艱深詞彙不會讓決定更容易。')]
 },
 {
  ...original('nuance'),number:4,level:'C1 → C2',minutes:25,icon:'◐',canDo:'能辨認審慎支持、反諷與語氣強弱，改寫時不擴大原意。',
  lesson:['精準改寫要保留原文的確定程度。promising 不等於 proven；would not rule out 不等於 fully supports。留意否定、情態詞與條件。','反諷常由語境與字面期待落差產生。只看到正面形容詞就當成讚美，容易錯過委婉批評；判斷仍須有上下文支持。'],
  diagram:[['may / seems','保留態度'],['provided','成立條件'],['context','字面以外的語氣']],
  table:[['seems promising','有潛力，尚未證實','不可改成 definitely works。'],['hardly definitive','遠非定論','hardly 具有否定方向。'],['not rule out','保留可能性','不等於已決定採用。']],
  checks:[q('The pilot seems promising. 最精準的意思是？',['已確定全面成功。','看來有潛力，仍需更多證據。','已證明完全失敗。'],1,'seems 與 promising 都沒有保證有效，應保留審慎語氣。'),q('provided we monitor costs 的功能是？',['介紹無關細節。','表示條件已不重要。','提出擴大試辦的條件。'],2,'provided 在此相當於 if，指出支持成立的條件。'),q('看到連續三次延誤後說 “A wonderfully punctual service.”，最可能是？',['借字面讚美表達反諷。','確認從未延誤。','討論車票價格。'],0,'三次延誤與 punctual 的期待相反，提供反諷判斷的語境。')],
  transfer:[q('The evidence is not entirely unconvincing. 哪個改寫較保守？',['The evidence proves everything.','The evidence has some persuasive force, though reservations remain.','There is no evidence at all.'],1,'雙重否定在此提供有限肯定，不能放大成完全證明。'),q('A proposal is “ambitious” and “underfunded”. 摘要應？',['只說 ambitious，所以作者全面支持。','直接說作者討厭所有創新。','同時保留目標遠大與資源不足的顧慮。'],2,'兩個詞形成評價張力；刪掉其中一邊會改變立場。'),q('may have contributed 與 caused 的差別是？',['前者保留因果不確定性，後者語氣更強。','兩者都表示毫無可能。','前者必定表示未來。'],0,'may have + 過去分詞表示對過去可能影響的推測。')]
 },
 {
  id:'listening',number:5,title:'聽取立場與限制',skill:'聽力筆記',level:'C1 → C2',minutes:25,icon:'♫',canDo:'能從口頭報告抓出主張、證據、保留與下一步。',listening:true,
  target:'先聽兩段報告，記下 4 欄筆記：主張、證據、限制、下一步。再寫 120–160 字英文摘要，保留兩位發言者的差異。',
  sources:[['A · Project lead','The remote-work pilot reduced commuting time, and most respondents welcomed the flexibility. I would be cautious about calling it a productivity success, though: output was not measured consistently across teams. I suggest extending the trial while agreeing on comparable measures.'],['B · Operations lead','Flexibility is valuable, but new colleagues reported fewer informal opportunities to ask questions. Rather than bringing everyone back full-time, we could arrange common mentoring days and evaluate whether that addresses the problem.']],
  lesson:['第一遍先聽發言目的，不急著抄完整句。第二遍用四欄筆記記下證據與限制，尤其留意 though、rather than、while 等轉折。','想聽到的結論不等於實際聽到的內容。若需要看逐字稿才能答題，仍可繼續學，但應把這次紀錄當成文字輔助練習。'],
  diagram:[['Position','發言目的'],['Caveat','限制與轉折'],['Action','下一步']],
  table:[['先記關鍵詞','flexibility / output not comparable','避免逐字抄到漏聽。'],['捕捉轉折','rather than full-time return','分清建議與被排除方案。'],['回查','筆記與逐字稿逐項對照','補漏，但不倒填成盲聽證據。']],
  steps:['不看稿聽兩段；各寫一句立場。','第二遍填四欄筆記，再開稿核對遺漏。','整合摘要，區分通勤、產出與新人協作。'],criteria:['準確呈現兩位的立場','保留產出測量的限制','沒有把共同導師日改成全面返辦','摘要結構清楚並標示觀點歸屬'],
  model:'The project lead supports a longer remote-work trial but warns that inconsistent output measures prevent a firm productivity conclusion. The operations lead identifies a different issue: new colleagues have fewer informal opportunities to seek help. Both favour adjusting the pilot rather than abandoning flexibility, with comparable performance measures and shared mentoring days as possible next steps.',focus:'這是策略示範；觀察如何把 productivity caveat 和 mentoring issue 分開。',
  checks:[q('Project lead 對生產力的態度是？',['已確定大幅增加。','完全不可能提高。','尚不能下定論，因為測量不一致。'],2,'發言明說 output 未一致測量，通勤改善不能直接證明生產力改善。'),q('Operations lead 建議什麼？',['安排共同導師日並檢查效果。','立刻全面取消彈性工作。','停止讓新人提問。'],0,'Rather than 排除了全面返辦；真正建議是 mentoring days。'),q('哪個筆記最準確？',['所有團隊產出都下降。','彈性受歡迎；產出證據有限；新人需更多非正式協助。','大家完全反對遠距。'],1,'這組筆記同時保留支持、證據限制與協作問題。')],
  transferSources:[['A · Training manager','Attendance improved during the new training programme, but retention was not tracked. The improved turnout is encouraging; we should not claim that it has reduced staff turnover without follow-up data.'],['B · Event organiser','Instead of cancelling the event, I suggest reducing its scale. A smaller event would still allow the team to share its work while we collect better information about future demand.']],
  transfer:[q('第一位發言者如何看待出席與留任？',['留任率已證明上升。','出席改善不代表已證明留任改善。','出席一定下降。'],1,'發言明說沒有追蹤留任，不能把不同指標混為一談。'),q('第二位建議如何處理活動？',['取消活動。','擴大規模。','縮小規模但繼續辦。'],2,'instead of 後是被替代方案；後半句才是主張。'),q('兩段發言的共同點是？',['對改善保持開放，同時保留證據或執行條件。','都主張立刻全面停止。','都宣稱資料已完美無缺。'],0,'兩位都沒有全盤拒絕行動，但避免過強推論或不必要取消。')]
 },
 {
  id:'mediation',number:6,title:'把專業內容說清楚',skill:'面向讀者的轉述',level:'C1 → C2',minutes:25,icon:'↔',canDo:'能把資料限制轉述給非專業讀者，維持原本的精確度。',
  target:'寫 140–180 字英文說明給學生會：解釋研究能說什麼、不能說什麼，並提出下一次如何取得更可靠資料。',
  sources:[['Research note','A voluntary survey of 60 students found that those using the new study room reported higher satisfaction. The survey was conducted during one examination week. Satisfaction was self-reported; academic performance was not measured.'],['Reader brief','The student council is considering whether to fund more study rooms. Members are not trained in research methods and need a clear explanation without statistical jargon. They also need to know what evidence to gather next.']],
  lesson:['轉述的目的，是讓特定讀者能理解並採取合理行動，不是逐字翻譯專業詞。先辨認讀者的決定，再留下與決定相關的限制。','可以把 self-selection 說成「自願回答的人可能不同於沒有回答的人」，但不能簡化成「研究完全沒有用」。清楚與精確應同時存在。'],
  diagram:[['Original','原始資訊'],['Reader need','讀者要做的決定'],['Plain language','清楚且不失真']],
  table:[['樣本限制','Volunteers may differ from non-respondents.','用日常語言解釋選樣。'],['測量限制','Feeling more satisfied is not the same as scoring higher.','區分感受與學業表現。'],['下一步','Include different weeks and non-users.','對應限制設計資料蒐集。']],
  steps:['列出學生會要做的資源決定。','用白話說明三個限制，避免術語堆疊。','提出可操作的後續資料計畫。'],criteria:['保留自願取樣與單週調查的限制','區分滿意度與學業成績','語言適合非研究背景讀者','下一步能實際回應研究缺口'],model:'The survey suggests that some users value the new room, but it does not show that the room improves grades. Only volunteers responded, and the survey covered a single exam week. Before expanding, the council could seek views from non-users and collect information in ordinary teaching weeks as well as examination periods.',focus:'這段使用 suggests 而不是 proves，並把限制連到具體下一步。',
  checks:[q('研究直接測量的是？',['滿意度自評。','正式考試成績。','所有學生的未來收入。'],0,'來源明示 satisfaction was self-reported，沒有測量學業表現。'),q('給學生會的最佳說法是？',['Self-selection negates all epistemic utility.','The survey proves that grades improved.','Volunteers’ views may not represent students who did not respond.'],2,'白話說明樣本限制最適合讀者，且沒有把研究全盤否定或誇大。'),q('哪個後續計畫較有針對性？',['只訪問同一批滿意的使用者。','納入未使用者與不同週期的資料。','只把報告字體放大。'],1,'新資料需直接補上選樣與期間限制。再次只問滿意的使用者，仍無法了解未使用者或非考試週的需求。')],
  transfer:[q('把 uncertainty interval 解釋給一般讀者時，最重要的是？',['保留估計的不確定性，依情境說明可能範圍。','直接刪掉所有限制。','保證真值永遠是區間中點。'],0,'轉述可換說法，不能消除不確定性；也不能創造中點保證。'),q('原研究只在一所學校進行，轉述成「所有學校都如此」違反什麼？',['字體格式。','時態必須永遠用過去式。','把適用範圍擴大超過證據。'],2,'範圍是內容的一部分，不能因簡化而遺失。單校結果是否適用其他學校，需要額外證據而非改變字體或時態。'),q('哪句適合作為面向決策者的結尾？',['More research is needed，且不必說明。','Before expanding, test the scheme in two additional settings and compare results.','Readers should learn all technical terms first.'],1,'把需要什麼資料與決策步驟說明白，轉述才有用途。')]
 },
 {
  id:'debate',number:7,title:'口頭答辯與修復誤解',skill:'互動與即席回應',level:'C1 → C2',minutes:30,icon:'☏',canDo:'能回應質疑、澄清誤解，修正措辭而不失去論點。',
  target:'準備 150–200 字英文發言稿，再進行 90 秒口頭答辯：主張 30 秒、回應質疑 30 秒、提出修正或條件 30 秒。可用裝置錄音工具自行回聽。',
  sources:[['Your proposal','The college should trial one device-free seminar each week to encourage discussion. This is a pilot for discussion-based classes, not a ban across all teaching. Accessibility needs must be accommodated.'],['Challenge from a colleague','Does your proposal assume that all students learn better without devices? Some students use assistive technology, and others rely on digital notes. What would count as evidence that the pilot worked?']],
  lesson:['先準確重述對方問題，再回答。當別人把試辦理解成全面禁令，可以用 “Let me clarify the scope…” 修復誤解，不必把問題當成攻擊。','成熟回應允許你縮小主張或承認未知。區分立場修正與前後矛盾：若理由與條件說清楚，修正能讓論證更可靠。'],
  diagram:[['Acknowledge','承接問題'],['Clarify','澄清範圍'],['Respond','證據與條件']],
  table:[['承接','That is a fair concern.','承認問題值得處理。'],['澄清','I am proposing a limited trial, not a general ban.','修復範圍誤解。'],['界線','We would need evidence of…','指出如何驗證主張。']],
  steps:['各寫一句主張、例外與評估方式。','請自己或同伴提出最強質疑，先重述再回答。','回聽後重寫一段模糊或過強的說法。'],criteria:['沒有把試辦說成全面禁令','回應無障礙與筆記需求','提出可觀察的成效指標','口頭有承接、澄清與明確回應'],model:'That is a fair concern. Let me clarify that I am proposing a limited trial in discussion-based seminars, not a general ban. Assistive technology would remain available, and students could choose an accessible way to take notes. We would compare participation and the quality of discussion, while collecting students’ views before deciding whether to extend the trial.',focus:'流利不等於講得快。回聽時檢查是否回答問題、保留範圍並適當停頓。口說品質由自己或他人評閱。',
  checks:[q('對方把試辦誤解成全面禁令，先怎麼回應？',['You clearly understand nothing.','Let me clarify the scope of the proposal.','Ignore the question entirely.'],1,'先澄清範圍，才能對真正的疑慮作出回應。人身批評或忽略問題，都無法修復「試辦等於全面禁令」的誤解。'),q('哪個回應處理無障礙需求？',['Every device must be removed without exception.','Accessibility is irrelevant to discussion.','Assistive technology remains available, with accessible note-taking options.'],2,'原提案明定需照顧 accessibility，例外不能消失。'),q('口說自評最應檢查哪件事？',['是否準確回答質疑並清楚表達條件。','是否每秒都不停說話。','是否使用最多罕見單字。'],0,'互動成功仰賴回應與可理解度，速度與罕見詞數不能取代溝通。')],
  transfer:[q('有人問 “Are you claiming this always works?”，但你只有小規模證據。最好回應？',['Yes, without exception.','No; my claim is limited to the conditions tested so far.','Questions are not allowed.'],1,'用已有證據界定範圍，避免把有限結果擴大為總是有效。'),q('回聽發現自己說成「所有學生都支持」，實際只有部分人支持。應？',['保留錯誤，避免顯得不自信。','改說沒有人支持。','明確更正為 some students，並說明來源。'],2,'修復錯誤資訊比維持表面一致更重要。應改成有來源支持的部分學生，而不是走向完全相反的誇大。'),q('對方問題不清楚時，哪句最有幫助？',['Do you mean the cost of the pilot or its long-term funding?','I will answer something unrelated.','There is only one possible meaning.'],0,'釐清焦點可避免答非所問，也是互動策略。先區分試辦成本與長期資金，才能給出對方需要的答案。')]
 },
 {
  id:'capstone',number:8,title:'綜合提案與編修',skill:'整合型作品集',level:'C1 → C2',minutes:40,icon:'◇',canDo:'能整合資料、反方與讀者需求，提出可驗證且語氣精準的提案。',
  target:'用 280–340 個英文字寫給學院的提案：是否擴大晚間服務？整合兩份來源，提出試辦、無障礙安排、成效指標與停止條件。初稿隔天修訂並說明修改理由。',
  sources:[['A · Trial summary','A six-week evening-service trial recorded 420 visits, but only 90 unique users. Most visits occurred in the two weeks before exams. Staff reported that the final hour was often quiet. No comparison with the same period in previous years was made.'],['B · Consultation note','Commuter students asked for later access on selected days. Some disabled students said the last accessible bus left before closing time. Staff representatives supported a limited extension if shifts were agreed in advance and costs reviewed monthly.']],
  lesson:['綜合提案需要把每一個建議接到證據與讀者決定。訪次、使用人數、考前需求與全年需求不是同一指標；不要只挑支持自己立場的數字。','編修分三次：先修內容與證據，再修組織與語域，最後修句子與用詞。先換形容詞而不修失真的結論，無法改善作品的核心品質。'],
  diagram:[['Evidence','來源與限制'],['Proposal','可執行方案'],['Evaluation','指標與停止條件']],
  table:[['數據','420 visits ≠ 420 people','避免把訪次當人數。'],['公平','Service hours + accessible transport','評估能否實際使用。'],['檢核','Set a review date and decision rule','說明何時擴大或停止。']],
  steps:['為每個來源列出支持、限制與缺漏。','寫清楚試辦日、排班、交通與評估方式。','隔天用四維規準修訂，提出至少兩項有理由的修改。'],criteria:['正確區分訪次、人數與時段需求','公平處理交通與工作條件','提案有成效指標與停止或調整條件','修訂理由處理內容或結構，而非只換字'],model:'The trial indicates concentrated demand rather than a clear case for extending every evening. The 420 visits came from 90 users and clustered before exams; this limits any claim about year-round demand. A targeted pilot on selected days, with agreed staffing and accessible transport, would provide a more defensible next step. A monthly review should compare unique users, costs and unmet access needs before deciding whether to continue.',focus:'示範為較短的策略段落，非完整交件。綜合任務要再補具體方案、不同觀點與停止條件。',
  checks:[q('420 visits 與 90 unique users 表示什麼？',['420 個不同的人都參加。','至少有些人重複到訪。','平均每人只有一次且總人數未知。'],1,'訪次大於不同使用者人數，顯示有重複到訪；不能把 420 當成人數。'),q('哪項建議最回應無障礙問題？',['只延長建築開放，不查交通。','把最後一班車資訊刪掉。','協調可及交通或調整服務時段。'],2,'服務是否可實際使用，必須連同可及交通一起考量。'),q('修訂應先處理哪件事？',['把「全年需求已證明」改成符合考前取樣限制的結論。','把 good 換成 excellent。','把所有句子拉長。'],0,'先校正證據與主張關係，才處理措辭裝飾。考前六週的取樣不能直接代表全年；換形容詞也不會修正這項推論。')],
  transfer:[q('一份提案只有開放時間與宣傳口號，最需要補什麼？',['更多沒有定義的形容詞。','成效指標、資源安排、檢討日期與調整條件。','一張不相關照片。'],1,'可執行提案需要知道如何做、如何評估，以及何時改變做法。'),q('兩個來源一個支持需求、一個指出風險。應？',['忽略風險以維持說服力。','改寫風險使其看來已解決。','在提案中說明如何處理風險及仍未知的部分。'],2,'說服力來自可信的取捨與條件，不是隱藏不利證據。'),q('完成自評與修訂代表什麼？',['留下可供回饋的學習證據，仍需他人評閱語言品質。','自動取得 C2 認證。','所有聽說讀寫能力已無需練習。'],0,'作品流程完成和能力認證是兩件事；自評不等同獨立專業評閱。')]
 }
];

export const RUBRIC=[
 {id:'content',title:'內容與證據',levels:['主張或來源常被誤讀，讀者仍缺關鍵資訊。','大致切題，但有遺漏或超出來源的推論。','資訊準確、限制明確，主要內容充分。','能有效整合多方觀點，準確處理例外與證據強弱。']},
 {id:'reader',title:'讀者與語氣',levels:['目的、對象或語氣不清楚。','讀者大致看得懂，部分用語或承諾不合情境。','對象、目的與語域一致，承諾清楚。','能細膩調整語氣、立場與資訊順序，回應複雜需求。']},
 {id:'organisation',title:'組織與連貫',levels:['資訊零散，關係不容易辨認。','有段落，但比較、因果或轉折仍不清楚。','段落與論證順序清楚，連接自然。','能靈活重組資訊，讓複雜論點清楚且有說服力。']},
 {id:'language',title:'語言與精準度',levels:['語法或用詞常妨礙理解。','意思可理解，但有不自然或含糊表達。','語法與用詞大致受控，語氣與範圍準確。','用詞、句構與細微差異靈活自然；需評閱者核對。']}
];
export const advancedUnit=id=>ADVANCED_UNITS.find(u=>u.id===id)||ADVANCED_UNITS[0];
