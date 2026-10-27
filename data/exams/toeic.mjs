import {card,single} from './authoring.mjs';
const c=(t,s,f,p,q)=>card('toeic',t,s,f,p,q,{listen:['conversation','talk'].includes(s)});
c('low','conversation','P',"A: Is the sales meeting still in Room Four? B: No, it is in Room Six today. Room Four needs repairs. A: Should I bring the printed price list? B: Yes, and please arrive at ten. The meeting starts fifteen minutes later.",[
 'Where will the meeting take place?|Room Six|Room Four|The repair shop|The reception desk|對方用 No 更正原定地點，現在是 Room Six。',
 'Why was the room changed?|The old room needs repairs.|More customers are coming.|The office is closed.|A delivery arrived early.|原因緊接更正地點之後：Room Four needs repairs。',
 'What should the first speaker bring?|A printed price list|A repair bill|A room key|A lunch order|直接要求 bring the printed price list，勿與場地維修混淆。',
 'When does the meeting start?|10:15|9:45|10:00|10:30|十點先到，十五分鐘後開始，因此是 10:15。']);
c('low','conversation','A',"A: I ordered six desk lamps, but only five are in this box. B: The sixth lamp is coming tomorrow in a separate package. A: Do I need to contact the supplier? B: No, I have already confirmed the second delivery.",[
 'What is the problem?|One lamp has not arrived.|All the lamps are broken.|The wrong address was used.|The order was canceled.|六盞中只收到五盞，缺少一盞，並未說損壞。',
 'When will the missing item arrive?|Tomorrow|This afternoon|Next month|In six days|第六盞 tomorrow 以另一包裹送達。',
 'What has the second speaker already done?|Confirmed another delivery|Returned the box|Canceled a payment|Changed the supplier|already confirmed 表示已完成確認後續配送。',
 'What will the first speaker probably do next?|Wait for the remaining lamp|Send all lamps back|Order six more lamps|Call to cancel delivery|對方已確認，不必再聯絡供應商，合理行動是等剩餘一盞。']);
c('low','conversation','B',"A: Can you show me how to use the new printer? B: Certainly. Put your card on the reader, then select your file. A: My card is upstairs. B: You can use mine this time, but please collect your own before tomorrow's training.",[
 'What does the first speaker need?|Help using a printer|A replacement computer|Directions to a station|A training refund|開頭請求教學使用 new printer。',
 'What is the first step?|Place a card on the reader|Choose a file|Restart the computer|Call the trainer|then select 表示先讀卡，再選檔案。',
 'Where is the first speaker’s card?|Upstairs|Inside the printer|At the station|In the training room|My card is upstairs 為直接位置資訊。',
 'What should be done before tomorrow?|Collect the personal card|Buy a new printer|Print the training schedule|Return a computer|最後要求在明日訓練前取回自己的卡。']);
c('mid','conversation','P',"A: The client approved the brochure text, but the photographs are still under review. B: The printer needs the final file by noon Thursday. A: Could we send the text now? B: Let's send a low-resolution proof today and wait until Wednesday evening to release the full file.",[
 'What has been approved?|The brochure text|All photographs|The final file|The print quantity|but 對比文字已核准、照片仍審查。',
 'What does the printer require by Thursday noon?|The final file|A new contract|A photo invoice|A meeting invitation|期限針對 final file，不是今日的低解析校樣。',
 'What will be sent today?|A low-resolution proof|The full print file|An invoice|A printed brochure|決定今天先送 proof，而非正式全檔。',
 'Why delay the full file?|Some images may still change.|The text was rejected.|The printer is unavailable.|The client canceled the project.|照片仍待核准，留時間避免把未定稿圖片交付印刷。']);
c('mid','conversation','A',"A: The hotel can hold our twenty rooms until Friday, but the discount requires a deposit by Wednesday. B: Half the delegates have not confirmed yet. A: Shall we pay for ten rooms now? B: Yes. Keep the other ten on hold while I contact the remaining delegates.",[
 'What is due by Wednesday to obtain the discount?|A deposit|The final guest list|The full hotel payment|A room cancellation|折扣條件為 Wednesday 前支付訂金，不是 Friday 保留期限。',
 'How many rooms will receive a deposit now?|Ten|Five|Twenty|Thirty|half 尚未確認，決定先付十間。',
 'What will the second speaker do?|Contact unconfirmed delegates|Cancel all rooms|Request a new venue|Pay the entire balance|最後一句說明聯絡尚未確認的人。',
 'Why keep ten rooms on hold?|Attendance may increase.|The hotel has no other guests.|The discount lasts all month.|Those rooms need repairs.|保留未確認代表的住宿彈性，不能推論飯店其他入住狀況。']);
c('mid','conversation','B',"A: Our trial software license expires on Monday. The data export took longer than expected. B: Support offered a three-day extension at no charge, provided we request it before the trial ends. A: Please request it today, and ask whether the exported files retain their original dates.",[
 'What difficulty are the speakers facing?|Data export is taking longer than planned.|The software cannot be installed.|Their invoices are missing.|A password has expired.|原因是匯出進度超出原先預估。',
 'What condition applies to the free extension?|It must be requested before expiration.|It requires a one-year contract.|It allows no file exports.|It must be paid in advance.|provided 引導條件：須在試用結束前提出。',
 'How long is the extension?|Three days|One week|One month|Two days|support 提供 three-day extension。',
 'What additional information is requested?|Whether file dates are preserved|Whether more staff can be hired|Whether the trial can restart next year|Whether invoices include tax|最後要求確認匯出檔案是否保留原日期。']);
c('high','conversation','P',"A: The supplier can restore Friday delivery if we accept the substitute component. B: Engineering says it fits, but certification covers only the original part. A: Then earlier arrival would not help us ship the product. B: Exactly. Ask the supplier for the original component and revise the customer estimate instead.",[
 'What makes the substitute unsuitable?|It lacks the required certification.|It cannot physically fit.|It arrives after the original.|It is unavailable.|工程判定能安裝，但認證只涵蓋原零件，是主要限制。',
 'What does “earlier arrival would not help” imply?|Another requirement would still prevent shipment.|The customer no longer wants the product.|Friday is a public holiday.|Delivery time never matters.|更早收到替代品仍無法滿足認證，不能出貨。',
 'What will the speakers request?|The original component|A larger substitute|An untested certification|Immediate customer payment|決定訂回 original component。',
 'What else must change?|The customer’s delivery estimate|The component dimensions|The certification standard|The customer’s address|最後說 revise the customer estimate，須修正交期預估。']);
c('high','conversation','A',"A: The proposal cuts the monthly subscription fee, but charges separately for archived searches. B: Our analysts run those searches daily. Did procurement compare total annual costs? A: Only the base fees. B: Before renewing, ask for a quote using last year's actual search volume, including the migration charge.",[
 'What is missing from the comparison?|Usage-related and migration costs|The quoted base fees|The contract expiration date|The number of office chairs|目前只比基本費，需計入搜尋用量與搬移費。',
 'Why are archived searches important here?|Analysts use them frequently.|They will be discontinued.|They require no subscription.|They replace all other services.|每日使用會使另外計費的成本變重要。',
 'What information will make the quote more useful?|Last year’s actual search volume|The vendor’s advertising budget|A competitor’s stock price|The original office lease|真實用量可比較實際年度總費用。',
 'What is the second speaker’s main concern?|The lower headline fee may not mean lower total cost.|No renewal can be completed.|Archived searches are illegal.|The software has stopped working.|針對 headline fee 與總成本的差異提出核對。']);
c('high','conversation','B',"A: The candidate can start next week if we waive the usual reference check. B: The project is urgent, but the client contract explicitly requires screened staff. A: Could she begin with internal documentation only? B: Yes, provided access to client records remains disabled until screening is complete.",[
 'Why cannot the reference check simply be waived?|The client contract requires screened staff.|The candidate rejected the offer.|Internal documents are confidential to the client.|The start date is already past.|合約明定 screened staff，急迫性不能取消此要求。',
 'What work may begin next week?|Internal documentation|Unrestricted client support|Client record auditing|Final screening approval|允許先做內部文件，範圍有限。',
 'What restriction remains?|No access to client records before screening is complete|No internal office access at any time|No communication with colleagues|No use of ordinary documentation|provided 的條件是先維持客戶資料權限關閉。',
 'How is the scheduling problem addressed?|By separating permitted tasks from restricted access|By removing all safeguards|By postponing every task indefinitely|By asking the client to cancel|以工作分流兼顧急迫時程與合約限制。']);
c('low','talk','P',"Welcome to the staff library. Books may be borrowed for two weeks. Please scan your staff card at the desk. The library closes at six on weekdays and is closed on Sundays. If you need to renew a book, email the library before its return date.",[
 'How long may staff borrow a book?|Two weeks|Two days|One month|Six weeks|借期為 two weeks。',
 'What must borrowers scan?|A staff card|A receipt|A bus pass|A book review|借書時掃描 staff card。',
 'When is the library closed all day?|Sunday|Monday|Wednesday|Friday|Sundays 全天關閉。',
 'How can a book be renewed?|By emailing before its due date|By paying at a café|By calling after midnight|By scanning a bus pass|續借需在到期前寄 email。']);
c('low','talk','A',"Attention passengers for the Riverside tour. Your coach now leaves from Bay Eight, not Bay Three. Departure remains at two thirty. Please carry your ticket and a bottle of water. Large bags should be placed in the luggage area before boarding.",[
 'What has changed?|The departure bay|The departure time|The tour destination|The ticket price|now Bay Eight 取代 Bay Three，但時間不變。',
 'At what time will the coach depart?|2:30|2:00|3:00|8:30|Departure remains at two thirty。',
 'What should passengers carry?|A ticket and water|A room key and lunch voucher|A passport only|A large suitcase inside the cabin|明確要求 ticket 與 bottle of water。',
 'What should happen to large bags?|Place them in the luggage area before boarding|Leave them at the hotel forever|Buy extra tickets for them|Carry them on the seats|上車前把大包放 luggage area。']);
c('low','talk','B',"Thank you for calling Maple Dental. We are open from nine until five, Monday through Friday. For an appointment, press one. For a billing question, press two. If you are calling about an appointment already scheduled for tomorrow, please have your booking number ready.",[
 'What business is being called?|A dental office|A train company|A bank|A furniture shop|Maple Dental 是牙科診所。',
 'Which key is for billing questions?|Two|One|Five|Nine|press two 對應帳務問題。',
 'When does the office close on weekdays?|5 p.m.|9 a.m.|2 p.m.|Midnight|營業九點到五點，結束時間為下午五點。',
 'What should callers with tomorrow’s bookings prepare?|Their booking number|A train ticket|A purchase order|Their employment contract|已預約明日的來電者需 booking number。']);
c('mid','talk','P',"This is an update from facilities. The west elevator will be inspected between eight and eleven tomorrow morning. Deliveries normally using that elevator should enter through the east loading dock. The stairs remain open, but heavy equipment must not be carried on them. Contact facilities if your delivery cannot be rescheduled.",[
 'Why will the west elevator be unavailable?|An inspection|A power bill dispute|A fire drill|A public exhibition|原因為 inspected。',
 'Which entrance should deliveries use?|The east loading dock|The west lobby|The roof entrance|The emergency staircase|貨物改走 east loading dock。',
 'What is prohibited?|Carrying heavy equipment on the stairs|Using the east dock|Entering after eleven|Calling facilities|樓梯雖開放，但不得搬重設備。',
 'Who should be contacted about an inflexible delivery?|Facilities|The exhibition curator|The billing department|A travel agent|無法調整配送時需聯絡 facilities。']);
c('mid','talk','A',"Our customer-service workshop begins at nine on Tuesday. Everyone should complete the online safety module first. The module takes about twenty minutes and is available until Monday evening. Staff who completed it within the past six months need not repeat it, but must bring their completion email to the workshop.",[
 'What must most attendees do before the workshop?|Complete an online module|Buy safety equipment|Interview a customer|Submit a travel claim|必須先完成線上安全單元。',
 'What is the deadline for accessing the module?|Monday evening|Tuesday noon|Wednesday morning|Six months from now|單元開放至 Monday evening。',
 'Who is exempt from repeating the module?|Staff who completed it in the past six months|All new staff|Anyone arriving early|Only workshop instructors|六個月內完成者可免重做。',
 'What must exempt staff bring?|Their completion email|A printed product catalog|A medical certificate|An unsigned contract|免重做仍須攜帶完成 email 作證明。']);
c('mid','talk','B',"We are extending the product-return desk's hours this Saturday only. The desk will close at eight instead of six. Returns still require proof of purchase, and opened software remains nonreturnable unless defective. Exchanges for a different size can be handled by the clothing department throughout normal store hours.",[
 'When do the extended hours apply?|This Saturday only|Every weekday|All next month|Every Sunday|延長只適用本週六。',
 'What remains necessary for a return?|Proof of purchase|A membership upgrade|Original travel tickets|A manager’s appointment|營業時間變更不影響購買證明要求。',
 'When may opened software be returned?|When it is defective|Whenever a newer version exists|Only after one year|When its package is lost|unless defective 表示只有故障例外。',
 'Where can a size exchange be processed?|The clothing department|The software counter only|The loading dock|An external warehouse|尺寸更換由 clothing department 處理。']);
c('high','talk','P',"The new expense policy takes effect next month. Existing bookings retain their approved limits, even if travel occurs later. New bookings require advance approval when projected costs exceed the department ceiling. A supervisor's approval does not replace the separate finance review required for international travel. Please distinguish booking dates from travel dates when submitting claims.",[
 'Which date determines whether an existing booking keeps its approved limit?|The booking date|The reimbursement date|The employee’s birthday|The date of the flight alone|政策明確要求區分訂位與出發，既有已核准訂位保留額度。',
 'When is advance approval needed for a new booking?|When projected costs exceed the department ceiling|For every local bus ticket|Only after the claim is paid|Only if travel has already ended|新訂位預估成本超過部門上限，須先核准。',
 'What is additionally required for international travel?|A separate finance review|Only a supervisor’s verbal consent|No approval if booked online|Cancellation of all prior bookings|主管核准不能取代獨立財務審查。',
 'What is the announcement mainly clarifying?|How transition dates and approval requirements interact|Why all travel is prohibited|How to choose airlines|Why existing bookings were canceled|內容處理新舊政策與兩層核准條件。']);
c('high','talk','A',"A security audit found no evidence of unauthorized access, but some older accounts lack complete access logs. Those accounts will be restricted temporarily while logging is upgraded. This precaution does not mean a breach has been confirmed. Account owners will receive individual notices; please do not forward customer files to personal email to bypass the restriction.",[
 'Why are some accounts being restricted?|Their logging records are incomplete.|A breach was conclusively proved.|Their owners resigned.|Customers requested deletion.|限制是因舊帳號紀錄不全，不代表已確認入侵。',
 'What does the announcement explicitly avoid claiming?|That a security breach has been confirmed|That logging needs upgrading|That individual notices will be sent|That some restrictions are temporary|發言特別區分預防處置與確認事故。',
 'How will affected owners be informed?|By individual notices|Only by newspaper|Through customer invoices|By an airline alert|account owners receive individual notices。',
 'Which action is prohibited?|Forwarding customer files to personal email to evade restrictions|Reading an individual notice|Waiting for logging upgrades|Asking security for clarification|不可用私人信箱轉寄檔案來繞過管制。']);
c('high','talk','B',"Starting July first, late contract amendments may be accepted if they do not alter the tender's competitive terms. Any change affecting price, delivery priority, or the evaluation method requires a new review. Administrative corrections can proceed without reopening bids, but the rationale must be recorded. When uncertain, seek procurement advice before making the change.",[
 'What determines whether a new review is needed?|Whether competitive terms are affected|Whether the document is longer|Whether the supplier is nearby|Whether the request is handwritten|影響競爭條件（價金、交付優先、評選）才須重審。',
 'Which change clearly requires a new review?|A change in delivery priority|Correction of a typographical error|Updating an internal extension number|Fixing page numbering|delivery priority 被明列為須重新審查。',
 'What must accompany administrative corrections?|A recorded rationale|Automatic cancellation|An increase in contract price|A new public holiday notice|行政修正不需重開投標，但須紀錄理由。',
 'What is recommended in an uncertain case?|Consult procurement before changing the contract|Implement the change without a record|Ask a competitor to approve it|Delete the previous version immediately|最後指示先取得採購建議再改。']);
c('low','reading','P','NOTICE: The Elm Café will be closed on Monday for cleaning. It reopens at seven on Tuesday. Customers with Monday catering orders should collect them from the kitchen entrance between eight and nine. The dining-room entrance will remain locked.',[
 'Why will the café be closed?|Cleaning|A staff holiday|A price increase|A change of ownership|公告直接說 for cleaning。',
 'When will normal service resume?|Tuesday at seven|Monday at nine|Wednesday at eight|Sunday at seven|reopens at seven on Tuesday。',
 'Where should Monday catering customers go?|The kitchen entrance|The locked dining-room entrance|A nearby hotel|The upstairs office|特殊訂單使用 kitchen entrance。',
 'Which statement is supported?|Catering collection is available despite the closure.|All catering orders are canceled.|The dining room opens on Monday.|Cleaning will continue for a week.|內用暫停與外燴領取分開安排，不能推論全數取消。']);
c('low','reading','A','Email: Please bring your laptop to Friday’s orientation in the training room. We will provide lunch, but you should tell reception about dietary needs by Wednesday. Parking is free in the north lot. Visitor spaces beside the main door are reserved for customers.',[
 'What should participants bring?|A laptop|Their own lunch|A parking meter|A customer pass|明確要求攜帶 laptop。',
 'By when should dietary needs be reported?|Wednesday|Friday evening|Monday morning|The following week|飲食需求週三前告知 reception。',
 'Where may participants park for free?|The north lot|The customer spaces|Any loading bay|The hotel basement|免費地點為 north lot，門口車位留客戶。',
 'What is the email’s purpose?|To prepare participants for orientation|To advertise a laptop sale|To cancel a lunch order|To recruit reception staff|通知新人活動所需物品與後勤安排。']);
c('low','reading','B','Library email: Your reserved business handbook has arrived. We will hold it until Thursday at closing time. Please collect it at the service desk with your membership card. If you no longer need it, reply to this email so another reader can borrow it.',[
 'What has become available?|A reserved handbook|A new membership card|A study-room key|A job vacancy|讀者預約的 handbook 已到館。',
 'How long will the item be held?|Until Thursday’s closing time|Until next month|For one hour only|Until Monday morning|保留至週四閉館時。',
 'What is needed for collection?|A membership card|A business contract|A parking receipt|A passport photograph|取件帶 membership card。',
 'Why reply if the item is no longer needed?|To release it for another reader|To obtain a refund for lunch|To renew every borrowed book|To change the library’s hours|回覆可釋出給其他讀者借用。']);
c('mid','reading','P','Supplier offer: Orders of at least 40 chairs receive a 10% product discount. Delivery is free only when the discounted product total exceeds $4,000. Assembly costs $12 per chair and does not count toward that threshold. Quote: 40 chairs at $100 each, before discount.',[
 'What is the discounted product total?|$3,600|$4,000|$4,080|$4,800|40×100×0.9＝3600。',
 'Does this order qualify for free delivery?|No, the discounted product total is below the threshold.|Yes, because assembly is included.|Yes, because 40 chairs always qualify.|No, because only 50 chairs get a discount.|運費門檻用折後商品金額，不把組裝費列入。',
 'What is the total assembly charge?|$480|$120|$400|$360|每張12，40張為480。',
 'Which distinction matters in the offer?|Discount eligibility and free-delivery eligibility are separate.|Assembly replaces the product price.|Delivery is always free.|Discounts apply only to assembly.|數量決定折扣，折後金額另決定免運。']);
c('mid','reading','A','Ad: Annual members may reserve the studio up to fourteen days in advance; monthly members may reserve seven days ahead. Email: I am a monthly member and need a room ten days from today. Reply: You may upgrade now, or wait three days before trying to reserve. Availability is not guaranteed.',[
 'Why can the member not reserve immediately under the current plan?|The requested date is outside the seven-day window.|Monthly members cannot use studios.|The studio is permanently closed.|Ten people are required.|月繳方案只能提前七天，目標還有十天。',
 'What would allow an immediate reservation attempt?|Upgrading to annual membership|Canceling the membership|Waiting ten days|Changing the email address|年繳可提早十四天預約。',
 'Why is waiting three days suggested?|The desired date will then be seven days away.|All studios reopen in three days.|Membership fees fall in three days.|The studio requires three days to clean.|10−3＝7，進入原方案的預約窗口。',
 'What is not guaranteed?|Room availability|The existence of an annual plan|The monthly booking window|A response by email|即使進入窗口，也不保證有空間。']);
c('mid','reading','B','Policy: Domestic shipments requested before 2 p.m. normally leave the warehouse that day. Customized products require two extra working days. Email sent Tuesday at noon: Please ship the customized display stands immediately. Reply: We can dispatch them on Thursday; delivery is expected Friday.',[
 'Why will the order not leave on Tuesday?|Customization adds processing time.|The request arrived after 2 p.m.|Tuesday is always a holiday.|The destination is overseas.|中午未超過截止，但客製品額外需要兩個工作日。',
 'When is dispatch planned?|Thursday|Tuesday|Wednesday|Friday|回信明定 Thursday dispatch。',
 'What does Friday refer to?|Expected delivery|Order submission|Warehouse dispatch|Customization approval|Friday 是預計收貨，不是出貨日。',
 'Which statement combines both documents correctly?|The cutoff rule does not remove the customization delay.|All noon requests leave the same day.|Customized goods are never shipped domestically.|The order missed the daily cutoff.|特殊客製處理時間優先於一般當日出貨規則。']);
c('high','reading','P','Contract excerpt: A service credit is available for outages exceeding four continuous hours, excluding scheduled maintenance notified at least 48 hours in advance. Incident record: A five-hour maintenance outage was announced 36 hours before it began. Provider email: We classify this as scheduled maintenance and deny the credit.',[
 'Which condition is disputed by the provider’s position?|The required advance-notice period|The length of a workweek|The customer’s subscription date|The currency of the credit|公告只有36小時，不符合排除條款所需48小時。',
 'What supports the customer’s request?|The outage exceeded four hours without sufficient advance notice.|Every maintenance event must earn a credit.|The outage lasted less than four hours.|The notice was given 72 hours in advance.|五小時超標，且提前通知不足48小時，不能直接套用例外。',
 'Why is the label “scheduled” alone insufficient?|The exception also requires timely notice.|The contract bans all maintenance.|Scheduled work can never last five hours.|The provider cannot send emails.|例外有複合條件，名稱不會消除通知時限。',
 'What is the best next step?|Request reconsideration citing the 48-hour clause and incident times|Accept that any maintenance is automatically excluded|Demand a different contract without mentioning the incident|Ignore the notification record|以具體條款及時序證據提出複核，較直接對焦爭議。']);
c('high','reading','A','Tender rules: Bids must include proof of insurance valid on the submission deadline. Post-deadline clarifications may explain existing documents but cannot supply a missing mandatory qualification. Bidder email: Our policy began two days after the deadline. We can submit the new certificate during clarification.',[
 'What is the central qualification issue?|Insurance was not valid at the deadline.|The email was not signed.|The bidder lacks a website.|The certificate has too many pages.|保單晚兩天生效，未滿足截止日有效的要求。',
 'Why cannot clarification necessarily cure this problem?|It cannot create a qualification absent at the deadline.|Clarification never allows any explanation.|Insurance certificates are optional.|All late documents are automatically accepted.|規則允許解釋既存文件，不允許事後補造缺少資格。',
 'Which fact would materially change the assessment?|Evidence that an earlier policy already covered the deadline|A promise to lower the bid price|A new certificate starting next month|A longer clarification email|若有先前保單已涵蓋截止日，可能是釐清既存資格。',
 'What distinction do the rules make?|Explaining existing evidence versus supplying a missing qualification|Cheap bids versus expensive bids|Domestic versus foreign websites|Long versus short certificates|規範區分補充說明與截止後補足必要資格。']);
c('high','reading','B','Report: The help desk resolved 900 tickets in April and 1,080 in May. Staffing increased from 10 to 12 full-time agents, with equal working hours per agent in both months. Manager note: Total output rose 20%, proving the new workflow increased individual productivity.',[
 'What was April’s output per agent?|90 tickets|108 tickets|75 tickets|120 tickets|900除10＝90。',
 'What was May’s output per agent?|90 tickets|108 tickets|100 tickets|80 tickets|1080除12＝90，個別產出相同。',
 'What weakens the manager’s conclusion?|Staffing rose at the same rate as total output.|Total output fell.|Agents worked fewer hours in May.|Only nine tickets were resolved.|人力與總量同增20%，不能據此證明個人效率提高。',
 'Which conclusion is justified by the data?|Total output increased, but output per agent did not.|The workflow caused a 20% efficiency gain.|The workflow was necessarily harmful.|May had fewer agents.|資料支持總量增加與人均不變，沒有充分因果證據。']);
single('toeic','low','language','P',[
 'All visitors must ___ at reception before entering.|sign in|signing in|signed in|signs in|情態動詞 must 後接原形動詞。',
 'The office is closed ___ Sundays.|on|at|in|by|星期前使用 on。',
 'Please place the invoices in the blue ___ on my desk.|folder|fold|folding|folded|限定詞及形容詞後需要名詞 folder。',
 'The new assistant speaks to customers ___.|politely|polite|politeness|politer|修飾 speaks 的方式用副詞 politely。']);
single('toeic','low','language','A',[
 'The manager ___ the delivery every morning.|checks|check|checking|to check|單數主詞、習慣動作，用現在式 checks。',
 'Please send the file ___ email.|by|on|at|from|by email 表示傳送方式。',
 'There are two ___ available near the entrance.|spaces|space|spacing|spaced|two 後用複數可數名詞。',
 'We cannot print the labels ___ the printer is repaired.|until|during|despite|among|until 引導修復前不能列印的時間條件。']);
single('toeic','low','language','B',[
 'Ms. Chen is responsible ___ ordering office supplies.|for|with|from|at|be responsible for 為固定搭配。',
 'The workshop begins at nine, ___ please arrive early.|so|although|unless|despite|前句原因帶出建議，使用 so。',
 'The package ___ yesterday afternoon.|arrived|arrive|arriving|has arrive|yesterday 指已結束時間，用過去式。',
 'Employees should keep ___ identification cards visible.|their|theirs|them|they|修飾 identification cards 需所有格形容詞 their。']);
single('toeic','mid','language','P',[
 'The replacement parts will be dispatched as soon as payment ___.|is received|will receive|receiving|has receiving|時間子句用現在式表未來；付款被收到，需被動式。',
 'The proposal is ___ more detailed than the earlier draft.|considerably|considerable|consideration|consider|副詞 considerably 修飾比較級 more detailed。',
 '___ the delay, the installation was completed within budget.|Despite|Although|Because|Unless|the delay 為名詞片語，介系詞 Despite 表讓步。',
 'Applicants ___ references are incomplete will be contacted.|whose|who|whom|which|references 屬於 applicants，關係所有格用 whose。']);
single('toeic','mid','language','A',[
 'Neither the director nor the assistants ___ available this afternoon.|are|is|was|being|neither...nor 就近一致，assistants 為複數。',
 'The shipment is subject ___ customs inspection.|to|for|with|by|subject to inspection 表示須接受檢查。',
 'Please retain the receipt ___ you need to request reimbursement.|in case|even though|as if|whereas|in case 表示預備可能發生的需要。',
 'The technician suggested ___ the damaged cable first.|replacing|replace|to replace|replaced|suggest 後接動名詞 replacing。']);
single('toeic','mid','language','B',[
 'All safety procedures must be followed, ___ the size of the order.|regardless of|in addition|because|even though|regardless of 後接名詞片語，意為不論。',
 'The presentation has been postponed ___ the speaker’s flight was canceled.|because|because of|despite|during|後接完整子句，因果連接詞用 because。',
 'The updated manual is available to ___ needs it.|whoever|whomever|whose|whichever|whoever 為 needs 的主詞，整個名詞子句作 to 的受詞。',
 'The service agreement remains ___ for another six months.|valid|validly|validity|validate|remain 為連綴動詞，後接形容詞 valid。']);
single('toeic','high','language','P',[
 'Had the discrepancy been detected earlier, the invoice ___ before payment.|could have been corrected|could correct|will have corrected|had correcting|與過去事實相反的條件倒裝，主要子句用 could have been corrected。',
 'The board approved the expansion, ___ financing could be secured.|provided that|even so|regardless of|in spite of|provided that 引導「只要融資到位」的條件子句。',
 'Not until the final inspection ___ the equipment released for use.|was|did|has|being|否定時間片語前置，原被動 was released 以 was 倒裝。',
 'The revised figures, rather than the preliminary estimate, ___ the basis of this report.|form|forms|forming|has formed|主詞為複數 figures，rather than 片語不改變數。']);
single('toeic','high','language','A',[
 'The vendor undertook to replace any units ___ to be defective.|found|finding|find|have found|units 與 find 為被動關係，過去分詞 found 作縮減關係子句。',
 'The policy applies to temporary staff no less ___ permanent employees.|than to|as for|that of|so as|no less...than... 表同等適用，保留平行介系詞 to。',
 'Authorization ___ granted, the data cannot be released.|not having been|not has been|not being have|not to have been|獨立主格結構 Authorization not having been granted，表示未獲授權，因此不可釋出資料。',
 'The committee requested that the revised terms ___ circulated before voting.|be|are|were|being|request that 的要求語氣用原形 be，與 circulated 構成被動。']);
single('toeic','high','language','B',[
 'Only after both parties sign ___ the amendment become effective.|will|has|is|being|Only after 前置引發主要子句助動詞 will 倒裝。',
 'The report attributes the shortfall ___ delayed shipments rather than weak demand.|to|for|with|as|attribute A to B，將短缺歸因於配送延誤。',
 'The warranty covers defects in materials; ___, damage from misuse is excluded.|however|therefore|similarly|for example|兩分句為對比限制，however 符合邏輯。',
 'The estimate is provisional and should not be construed ___ a binding quotation.|as|by|to|from|construe A as B 表示把 A 解讀成 B。']);
