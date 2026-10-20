import { reviseFeaturedDialogues, UNIT_DIALOGUE_REVISIONS, CHAPTER_DIALOGUE_REVISIONS, FEATURED_LINE_REVISIONS } from './dialogue_editorial.mjs';
import { NEW_CONVERSATION_SCENARIOS } from './conversation_scenarios.mjs';
// commute_dialogues.mjs - 通勤英語教學會話快播與深度學習引擎 (Commute English Teaching Dialogue Studio)
// 專為「快速通勤、單手即點即播、邊聽邊學」設計：
// 1. 四大教學播放模式：🌟 教學精講 (導讀+英+中+句型解析+回想)、⚡ 雙語快播 (英+中極速刷聽)、🗣️ 開口跟讀 (慢速示範+留白跟讀+原速確認)、🎧 純英盲聽 (純英+語境思考)
// 2. 支援「📻 通勤電台自動連播下一篇」、「🔂 單篇循環熟練」、「🎭 A/B 角色扮演開口接話」、「🙈 盲聽字幕遮罩」
// 3. 整合：24 組高頻通勤實戰精選會話 + 27 組核心章節與國際考制會話 (含完整中譯與考點解析) + 61 組 108 課綱學年單元會話 = 共 112 組完整教學會話

import { speak, stopAudio, renderAmericanVoiceSettings, setAmericanVoice } from './audio.mjs';
import { curriculum } from './curriculum.mjs';
import { UNIFIED_GRADES } from './curriculum_unified.mjs';

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

export const COMMUTE_CATEGORIES = [
  { id: 'featured', label: '🔥 通勤實戰精選', sub: '生活・旅遊・商務・學術與新增實用情境', badge: '60秒即學即用' },
  { id: '國小', label: '🎒 國小基礎會話', sub: '日常作息・問路・點餐・節慶生活應對', badge: 'Pre-A1~A1' },
  { id: '國中', label: '🏫 國中日常＆會考', sub: '校園溝通・購物・天氣・會考聽力核心情境', badge: 'A1~B1' },
  { id: '高中', label: '🎓 高中學測＆思辨', sub: '長難句拆解・雙文觀點・搭配詞・學術討論', badge: 'B1~B2' },
  { id: '高工', label: '🛠️ 高工職場＆專業', sub: '現場安全・精密量測・故障排除・跨國驗收', badge: 'ESP 專業英文' },
  { id: '國際考試', label: '🌐 多益・托福・留學', sub: 'TOEIC 商務・TOEFL 研討・SAT・GRE・GMAT', badge: 'B2~C2' },
  { id: 'all', label: '📚 全部教學會話', sub: '跨學段與情境教學會話總庫', badge: '全收錄' }
];

export const COMMUTE_PLAY_MODES = [
  { id: 'retrieval', label: '🧠 中文提示說英文', short: '開口回想', desc: '先聽中文提示 ➔ 留白自己說英文 ➔ 英文示範核對 ➔ 換情境回想；可用不同但合適的說法' },
  { id: 'teaching', label: '🌟 教學精講', short: '教學精講', desc: '情境導讀 ➔ 美式英文示範 ➔ 中文翻譯 ➔ 句型與連音解析 ➔ 到站回想提問' },
  { id: 'bilingual', label: '⚡ 雙語快播', short: '雙語快播', desc: '英文會話 ➔ 中文意思，緊湊連播無干擾，1 分鐘快速刷完一組' },
  { id: 'shadowing', label: '🗣️ 開口跟讀', short: '開口跟讀', desc: '英文慢速清晰示範 ➔ 留白跟讀時間 (輪你開口) ➔ 英文原速確認 ➔ 中文' },
  { id: 'blind_en', label: '🎧 純英盲聽', short: '純英盲聽', desc: '純英文連播＋語境思考停頓，訓練不靠中文直接抓出對話關鍵訊息' }
];

// 24 組專為通勤族打造的 60~90 秒高頻實戰教學會話
const ORIGINAL_FEATURED_DIALOGUES = [
  {
    id: 'commute-daily-01',
    stage: 'featured',
    topicTag: '🚇 日常通勤・買咖啡',
    level: 'A2 實用生活',
    title: '上班途中買咖啡：客製化冰塊甜度與載具結帳',
    scenario: '早上趕捷運前在咖啡店點餐，學會用自然英文調整冰塊、換燕麥奶並使用手機感應支付。',
    keyPatterns: [
      'Can I get a ..., please?（請給我一份……好嗎？比 I want 更自然禮貌）',
      'with light ice / with oat milk instead（少冰／改換燕麥奶）',
      'I will pay by phone.（我用手機感應付款。）'
    ],
    lines: [
      { speaker: 'Barista', en: 'Good morning! What can I get started for you today?', zh: '早安！今天想點些什麼呢？', note: '連音題眼：get started for you 常連讀為 /ɡet ˈstɑːr.ɾɪd fər juː/，意為「為您準備餐點」。' },
      { speaker: 'Commuter', en: 'Hi! Can I get a medium iced Americano with light ice, please?', zh: '嗨！請給我一杯中杯冰美式，少冰，謝謝。', note: '實用句型：Can I get + 餐點 + with + 客製需求（light ice 少冰 / no sugar 無糖）。' },
      { speaker: 'Barista', en: 'Sure thing. Would you like any breakfast sandwich to go with that?', zh: '沒問題。需要搭配一份早餐三明治嗎？', note: '口語搭配：to go with that 指「搭配剛才點的飲品一起帶走」。' },
      { speaker: 'Commuter', en: 'No, just the coffee today. Can I tap my phone to pay?', zh: '不用了，今天只要咖啡就好。我可以刷手機感應付款嗎？', note: '生活高頻：tap my phone / tap my card 指「感應手機／感應信用卡」。' },
      { speaker: 'Barista', en: 'Of course, go right ahead. Your coffee will be ready at the pickup counter!', zh: '當然可以，請直接感應。您的咖啡馬上在取餐檯好喔！', note: '情境詞彙：pickup counter 取餐檯；go right ahead 請直接操作。' }
    ],
    recallPrompt: '想一想：如果你想點「大杯冰拿鐵、少冰、用手機付款」，英文怎麼說？',
    recallAnswer: 'Can I get a large iced latte with light ice, please? I will tap my phone to pay.'
  },
  {
    id: 'commute-daily-02',
    stage: 'featured',
    topicTag: '🚇 日常通勤・捷運轉乘',
    level: 'A2 實用生活',
    title: '捷運站月台問路：確認轉乘路線與末班車時間',
    scenario: '在地下鐵月台向站務員確認前往機場或市中心的轉乘站與搭車方向。',
    keyPatterns: [
      'Does this train go to ...?（這班列車有開往……嗎？）',
      'transfer to the Blue Line at ...（在……站轉乘藍線）',
      'How many stops is it from here?（從這裡過去有幾站？）'
    ],
    lines: [
      { speaker: 'Passenger', en: 'Excuse me, does this train on Platform Two go toward Taipei Main Station?', zh: '不好意思，請問第二月台這班車是開往台北車站方向嗎？', note: '問路必備：go toward + 目的地（朝……方向行駛）。' },
      { speaker: 'Staff', en: 'No, this platform is southbound. You need to take the escalator to Platform One.', zh: '不是喔，這個月台是往南的。您需要搭電扶梯去第一月台。', note: '方向字尾：southbound 往南行駛的；northbound 往北行駛的。' },
      { speaker: 'Passenger', en: 'Got it! Do I need to transfer anywhere, or is it a direct ride?', zh: '了解了！請問中途需要轉車，還是一班車直達呢？', note: '黃金對比：transfer（轉乘）vs. a direct ride（直達車）。' },
      { speaker: 'Staff', en: 'It is a direct ride, just four stops from here. Trains run every three minutes during rush hour.', zh: '是一班車直達，從這裡只要四站。尖峰時段每三分鐘就有一班車。', note: '通勤核心詞：rush hour 上下班尖峰時段；run every three minutes 每三分鐘一班。' }
    ],
    recallPrompt: '回想看看：怎麼用英文問「請問我需要轉車，還是一班車直達？」',
    recallAnswer: 'Do I need to transfer anywhere, or is it a direct ride?'
  },
  {
    id: 'commute-daily-03',
    stage: 'featured',
    topicTag: '🚇 日常通勤・超商取件',
    level: 'A2 實用生活',
    title: '下班超商取包裹：核對姓名末三碼與行動支付',
    scenario: '通勤回家順路到便利商店領取網購包裹，出示證件並核對手機號碼末三碼。',
    keyPatterns: [
      'I am here to pick up a package.（我來領取包裹。）',
      'What are the last three digits of your phone number?（您的電話號碼末三碼是什麼？）',
      'Do I need to show my ID?（需要出示身分證件嗎？）'
    ],
    lines: [
      { speaker: 'Customer', en: 'Hi, I am here to pick up an online package.', zh: '嗨，我想要領取網購包裹。', note: '核心片語：pick up a package 領取包裹；連讀 pick up an /pɪ.kʌ.pən/。' },
      { speaker: 'Clerk', en: 'Sure! What are the last three digits of your mobile number, and what is your last name?', zh: '好的！請問您手機號碼的末三碼是什麼？貴姓呢？', note: '實用表達：the last three digits 末三碼數字；last name 姓氏。' },
      { speaker: 'Customer', en: 'It is 8-2-9, under the name Chen. Since I already paid online, do I need to show my ID?', zh: '末三碼是 829，姓陳。因為我已經線上付過款了，需要出示證件嗎？', note: '介系詞用法：under the name + 姓名（登記在……名字下）。' },
      { speaker: 'Clerk', en: 'Yes, please. Zero-dollar pickups require a photo ID for verification. Here is your parcel!', zh: '要的，零元取件需要核對有照片的證件。這是您的包裹！', note: '核心字彙：verification 核對確認；parcel 包裹。' }
    ],
    recallPrompt: '想一想：怎麼用英文說「我來領取包裹，登記在林(Lin)的名字下」？',
    recallAnswer: 'I am here to pick up a package under the name Lin.'
  },
  {
    id: 'commute-daily-04',
    stage: 'featured',
    topicTag: '🚇 日常通勤・計程車趕路',
    level: 'B1 進階生活',
    title: '計程車與叫車通勤：避開塞車路段與預估抵達時間',
    scenario: '早上有重要會議改搭計程車，與司機確認最快路線及預估抵達時間 (ETA)。',
    keyPatterns: [
      'Could we take the elevated expressway to avoid traffic?（我們可以走高架快速道路避開塞車嗎？）',
      'How long do you think it will take?（您預計大概要開多久？）',
      'You can drop me off right by the main entrance.（讓我在正門口下車就可以了。）'
    ],
    lines: [
      { speaker: 'Passenger', en: 'Good morning! I am heading to the Nangang Exhibition Center. I have a meeting at nine.', zh: '早安！我要去南港展覽館，我九點鐘有一場會議。', note: '口語動向：be heading to + 地點（正要前往某地），比 go to 更自然。' },
      { speaker: 'Driver', en: 'Main roads are bumper-to-bumper right now. Should I take the elevated expressway instead?', zh: '現在平面主要道路塞得水洩不通。我改走高架快速道路好嗎？', note: '道地成語：bumper-to-bumper（車頭貼車尾，形容大塞車）。' },
      { speaker: 'Passenger', en: 'Yes, please! How long do you think it will take via the expressway?', zh: '好，拜託了！請問走快速道路預計要多久會到？', note: '實用介系詞：via（經由……路線／管道）。' },
      { speaker: 'Driver', en: 'About twenty minutes. Where should I drop you off when we get there?', zh: '大約二十分鐘。我們到的時候要在哪裡讓您下車呢？', note: '必背片語：drop someone off（讓某人下車）。' },
      { speaker: 'Passenger', en: 'You can drop me off right by the North Entrance. Thank you so much!', zh: '讓我在北側入口旁下車就可以了，非常感謝！', note: '位置精確表達：right by + 地標（就在……旁邊）。' }
    ],
    recallPrompt: '回想一下：怎麼跟司機說「讓我在正門口旁邊下車就可以了」？',
    recallAnswer: 'You can drop me off right by the main entrance.'
  },
  {
    id: 'commute-travel-01',
    stage: 'featured',
    topicTag: '✈️ 出國旅遊・海關入境',
    level: 'A2~B1 旅遊實戰',
    title: '機場海關入境審查：回答旅遊目的、住宿與回程機票',
    scenario: '抵達國外機場通過移民官審查，清晰回答停留天數、住宿地點與申報事項。',
    keyPatterns: [
      'What is the purpose of your visit?（您此行的目的是什麼？）',
      'I am here on vacation for ... days.（我來渡假……天。）',
      'I have nothing to declare.（我沒有需要申報的物品。）'
    ],
    lines: [
      { speaker: 'Officer', en: 'Good afternoon. Passport and boarding pass, please. What is the purpose of your visit?', zh: '午安，請出示護照與登機證。請問您這趟到訪的目的是什麼？', note: '海關必考句：purpose of your visit（到訪目的），回答可用 sightseeing / vacation / business。' },
      { speaker: 'Traveler', en: 'Here you go. I am here on vacation with my family for seven days.', zh: '給您。我和家人來這裡渡假七天。', note: '介系詞考點：on vacation（渡假中）、on business（出差中）。' },
      { speaker: 'Officer', en: 'Where will you be staying during your trip, and do you have a return ticket?', zh: '這趟旅程期間您會住在哪裡？有回程機票嗎？', note: '未來進行式：Where will you be staying 比一般未來式聽起來更自然、屬於既定行程詢問。' },
      { speaker: 'Traveler', en: 'We are staying at the Grand Hotel downtown. Here is our return flight confirmation.', zh: '我們住在市中心的格蘭德飯店。這是我們的回程班機確認單。', note: '旅遊核心詞：return flight confirmation 回程班機確認單。' },
      { speaker: 'Officer', en: 'Everything looks good. Enjoy your stay!', zh: '一切沒問題，祝您旅途愉快！', note: '慣用祝福：Enjoy your stay!（祝您停留期間愉快！）' }
    ],
    recallPrompt: '想一想：海關問 What is the purpose of your visit? 時，怎麼用英文回答「我來渡假五天，住在市中心飯店」？',
    recallAnswer: 'I am here on vacation for five days, and I am staying at a hotel downtown.'
  },
  {
    id: 'commute-travel-02',
    stage: 'featured',
    topicTag: '✈️ 出國旅遊・飯店入住',
    level: 'B1 旅遊實戰',
    title: '飯店櫃檯辦理入住：提早寄放行李與確認早餐時段',
    scenario: '中午前抵達飯店還不能進房，向櫃檯辦理手續、寄放行李並詢問 Wi-Fi 與早餐。',
    keyPatterns: [
      'I have a reservation under the name ...（我有訂房，登記在……名下。）',
      'Could we leave our luggage at the bell desk?（我們可以把行李寄放在行李櫃檯嗎？）',
      'Is breakfast included with our room?（我們的房型有附早餐嗎？）'
    ],
    lines: [
      { speaker: 'Guest', en: 'Hello! I have a reservation for two nights under the name Wang.', zh: '您好！我有預訂兩晚的房間，登記在王 (Wang) 的名下。', note: '訂房萬用句：have a reservation for + 晚數 + under the name + 姓氏。' },
      { speaker: 'Receptionist', en: 'Welcome, Ms. Wang! Official check-in begins at three, so your room is still being prepared.', zh: '歡迎您，王小姐！正式入住時間是下午三點，所以您的房間目前還在整理中。', note: '被動進行式：is still being prepared（正在被整理準備中）。' },
      { speaker: 'Guest', en: 'No problem at all. Could we leave our luggage here and come back this evening?', zh: '完全沒問題。我們可以先把行李寄放在這裡，傍晚再回來拿房卡嗎？', note: '不可數名詞陷阱：luggage / baggage（行李）不可加 s，也不加 a！' },
      { speaker: 'Receptionist', en: 'Certainly! Here is your luggage tag. Also, complimentary breakfast is served from seven to ten.', zh: '當然可以！這是您的行李牌。另外，免費早餐供應時間為早上七點到十點。', note: '多益高頻字：complimentary（免費贈送的 = free of charge）。' }
    ],
    recallPrompt: '回想看看：怎麼用禮貌英文問櫃檯「我們可以先把行李寄放在這裡嗎？」',
    recallAnswer: 'Could we leave our luggage here and come back later?'
  },
  {
    id: 'commute-travel-03',
    stage: 'featured',
    topicTag: '✈️ 出國旅遊・餐廳點餐',
    level: 'B1 旅遊實戰',
    title: '國外餐廳用餐：詢問招牌推薦、過敏原與分開結帳',
    scenario: '在海外餐廳點餐時詢問今日主廚推薦、確認餐點是否含堅果，並在餐後要求分開刷卡。',
    keyPatterns: [
      'What do you recommend for the main course?（主餐您推薦什麼呢？）',
      'Does this dish contain any nuts or dairy?（這道菜含有堅果或乳製品嗎？）',
      'Could we split the bill, please?（請問我們可以分開結帳嗎？）'
    ],
    lines: [
      { speaker: 'Server', en: 'Welcome! Are you ready to order, or do you need a few more minutes?', zh: '歡迎光臨！請問準備好點餐了，還是需要再看幾分鐘菜單呢？', note: '餐廳起手式：Are you ready to order?（準備好點餐了嗎？）' },
      { speaker: 'Diner', en: 'We are almost ready. What do you recommend for the main course tonight?', zh: '我們差不多看好了。今晚的主餐您有什麼推薦的嗎？', note: '點餐高頻：main course（主菜）、appetizer（前菜）、side dish（配菜）。' },
      { speaker: 'Server', en: 'Our grilled salmon with herb butter is very popular. It comes with roasted vegetables.', zh: '我們的香草奶油烤鮭魚非常受歡迎，會附烤時蔬。', note: '實用片語：come with + 附餐（隨餐附贈……）。' },
      { speaker: 'Diner', en: 'Sounds delicious! Does the sauce contain any peanuts? My friend has a severe nut allergy.', zh: '聽起來很美味！請問醬汁含有花生嗎？我朋友對堅果嚴重過敏。', note: '醫療飲食必備：have a nut allergy / be allergic to nuts（對堅果過敏）。' },
      { speaker: 'Server', en: 'It is completely nut-free. And whenever you are ready later, we can split the bill for you.', zh: '完全不含堅果喔！稍後用餐完畢需要結帳時，我們也可以幫您分開刷卡。', note: '結帳表達：split the bill（分攤帳單／分開結帳）；It is on me（這頓我請客）。' }
    ],
    recallPrompt: '想一想：怎麼用英文詢問服務生「這道菜含有堅果嗎？我對堅果過敏」？',
    recallAnswer: 'Does this dish contain any nuts? I am allergic to nuts.'
  },
  {
    id: 'commute-travel-04',
    stage: 'featured',
    topicTag: '✈️ 出國旅遊・藥局看診',
    level: 'B1 旅遊實戰',
    title: '海外藥局諮詢買藥：描述感冒發燒症狀與服藥劑量',
    scenario: '旅途中喉嚨痛且輕微發燒，向藥師說明症狀並確認成藥是否會想睡覺。',
    keyPatterns: [
      'I have had a sore throat and a mild fever since ...（我從……開始喉嚨痛且輕微發燒。）',
      'Will this medicine make me drowsy?（這種藥吃了會讓我嗜睡嗎？）',
      'Take one tablet every six hours after meals.（飯後每六小時服用一顆。）'
    ],
    lines: [
      { speaker: 'Pharmacist', en: 'Hello! How can I help you today?', zh: '您好！今天需要什麼幫忙呢？', note: '藥師發音：pharmacist /ˈfɑːr.mə.sɪst/（ph 發 /f/ 音）。' },
      { speaker: 'Traveler', en: 'Hi, I have had a sore throat and a runny nose since last night. Do you have anything over the counter?', zh: '嗨，我從昨晚開始喉嚨痛而且流鼻水。請問有不需要處方箋的成藥嗎？', note: '關鍵片語：over-the-counter (OTC) medicine（非處方成藥）；現在完成式表持續症狀。' },
      { speaker: 'Pharmacist', en: 'These cold relief tablets work very well. Do you need to drive or stay awake today?', zh: '這款綜合感冒錠效果很好。請問您今天需要開車或保持清醒嗎？', note: '藥局核心：relief（緩解疼痛或不適）。' },
      { speaker: 'Traveler', en: 'Yes, we are sightseeing all afternoon. Will this medicine make me drowsy?', zh: '要的，我們整個下午都要觀光。這藥吃了會讓我昏昏欲睡嗎？', note: '必背單字：drowsy /ˈdraʊ.zi/（嗜睡的、昏昏欲睡的，藥盒最常出現的警語字）。' },
      { speaker: 'Pharmacist', en: 'Then take this daytime formula instead. Take two tablets after meals with plenty of water.', zh: '那請改拿這款日間不嗜睡配方。飯後搭配大量開水服用兩顆。', note: '用藥指示：non-drowsy / daytime formula（不嗜睡日間配方）；after meals（飯後）。' }
    ],
    recallPrompt: '回想一下：去藥局買藥時，怎麼問藥師「這個藥吃了會想睡覺嗎？」',
    recallAnswer: 'Will this medicine make me drowsy?'
  },
  {
    id: 'commute-campus-01',
    stage: 'featured',
    topicTag: '🏫 校園實戰・小組報告',
    level: 'B1 校園會話',
    title: '課後小組專題討論：分配簡報任務與設定截稿日',
    scenario: '在學校圖書館討論英文專題報告，協調誰負責查資料、誰做投影片與彩排時間。',
    keyPatterns: [
      'How should we divide up the work for ...?（我們該怎麼分配……的工作？）',
      'I can take charge of the data slides.（我可以負責數據投影片的部分。）',
      'Let us aim to finish the first draft by Wednesday.（我們目標在週三前完成初稿。）'
    ],
    lines: [
      { speaker: 'Maya', en: 'Our presentation on renewable energy is due next Friday. How should we divide up the work?', zh: '我們關於再生能源的簡報下週五要交了。我們該怎麼分配工作呢？', note: '校園必備：be due + 時間（在……時間到期應繳交）；divide up 分配。' },
      { speaker: 'Ethan', en: 'I can gather the case studies on solar and wind power, and draft the introduction.', zh: '我可以負責蒐集太陽能與風力發電的案例研究，並起草引言。', note: '學術動詞：gather case studies（蒐集案例）、draft（起草初稿）。' },
      { speaker: 'Maya', en: 'Great! Then I will take charge of designing the slide deck and charts.', zh: '太好了！那我就負責設計簡報投影片跟圖表。', note: '實用片語：take charge of + V-ing/N（負責主導……）；slide deck（整份簡報投影片）。' },
      { speaker: 'Ethan', en: 'Let us aim to finish our parts by Wednesday night so we can rehearse on Thursday.', zh: '我們目標在週三晚上前完成各自的部分，這樣週四就能一起彩排。', note: '重要單字：rehearse /rɪˈhɝːs/（彩排、排練）。' }
    ],
    recallPrompt: '想一想：跟同學討論報告時，怎麼用英文說「我們目標在週三前完成初稿，這樣週四可以彩排」？',
    recallAnswer: 'Let us aim to finish the first draft by Wednesday so we can rehearse on Thursday.'
  },
  {
    id: 'commute-campus-02',
    stage: 'featured',
    topicTag: '🏫 校園實戰・請益老師',
    level: 'B1~B2 校園會話',
    title: '拜訪老師 Office Hours：請教作文修改與論點組織',
    scenario: '帶著英文作文草稿向老師請教如何讓主題句更聚焦、轉折詞更流暢。',
    keyPatterns: [
      'Do you have a few minutes to go over my essay draft?（請問您有幾分鐘可以幫我看一下作文草稿嗎？）',
      'Your examples are vivid, but the main argument needs to be more specific.（你的例子很生動，但主論點需要更具體。）',
      'Try backing up your claim with a concrete statistic.（試著用具體數據來支持你的主張。）'
    ],
    lines: [
      { speaker: 'Student', en: 'Excuse me, Professor Miller. Do you have a few minutes to go over my essay draft?', zh: '不好意思，Miller 教授。請問您有幾分鐘可以幫我檢視一下作文草稿嗎？', note: '高頻動詞片語：go over（仔細檢視、複習、核對）。' },
      { speaker: 'Professor', en: 'Sure, come on in. I read your opening paragraph—your hook is engaging, but the thesis is a bit broad.', zh: '當然，請進。我讀了你的第一段——你的開場引言很吸引人，但主旨句稍微太寬泛了。', note: '寫作術語：hook（吸引讀者的開場句）、thesis statement（全文主旨句）。' },
      { speaker: 'Student', en: 'Should I narrow it down to how public libraries bridge the digital divide in rural areas?', zh: '我應該把範圍縮小到「公共圖書館如何縮短偏鄉數位落差」嗎？', note: '核心片語：narrow it down to...（將範圍聚焦縮小至……）；bridge the divide（彌合落差）。' },
      { speaker: 'Professor', en: 'Spot on! And in paragraph two, try backing up that claim with a concrete example.', zh: '完全正確！而且在第二段，試著用一個具體實例來支持那個論點。', note: '口語肯定：Spot on!（非常精準！完全正確！）；back up a claim（支持論點）。' }
    ],
    recallPrompt: '回想看看：怎麼禮貌請問老師「您有幾分鐘可以幫我看一下我的作文草稿嗎？」',
    recallAnswer: 'Do you have a few minutes to go over my essay draft?'
  },
  {
    id: 'commute-campus-03',
    stage: 'featured',
    topicTag: '🏫 校園實戰・圖書館與資源',
    level: 'A2~B1 校園會話',
    title: '圖書館借閱與預約討論室：處理逾期與延長借期',
    scenario: '在學校圖書館詢問如何續借參考書，並與同學預約多媒體討論室。',
    keyPatterns: [
      'I would like to renew these two books.（我想要續借這兩本書。）',
      'There is a hold on this book from another student.（這本書有另一位同學預約等候中。）',
      'Can we reserve a study room for two hours?（我們可以預約兩小時的討論室嗎？）'
    ],
    lines: [
      { speaker: 'Student', en: 'Hi! I would like to renew these two history books for another week, please.', zh: '嗨！我想要把這兩本歷史書續借一個禮拜，謝謝。', note: '圖書館核心字：renew（續借、展期）；overdue（逾期未還的）。' },
      { speaker: 'Librarian', en: 'Let me check the system. I can renew the first one, but another student placed a hold on the second book.', zh: '我查一下系統喔。第一本可以續借，但第二本書有另一位學生已經預約候補了。', note: '道地表達：place a hold on a book（預約候補借書）。' },
      { speaker: 'Student', en: 'I understand. I will return that one today. Also, can I reserve a group study room for tomorrow afternoon?', zh: '我明白了，那本我今天就會歸還。另外，我可以預約明天下午的小組討論室嗎？', note: '實用句型：reserve / book a study room（預約討論室）。' },
      { speaker: 'Librarian', en: 'Room B is available from two to four o’clock. I have booked it under your student ID!', zh: 'B 討論室下午兩點到四點有空檔，我已經用你的學生證號碼幫你預約好囉！', note: '形容詞考點：available（有空檔的、可使用的，主詞為物或時段）。' }
    ],
    recallPrompt: '想一想：怎麼用英文跟圖書館員說「我想要續借這兩本書，並預約明天的討論室」？',
    recallAnswer: 'I would like to renew these two books and reserve a study room for tomorrow.'
  },
  {
    id: 'commute-campus-04',
    stage: 'featured',
    topicTag: '🏫 校園實戰・會考學測聽力題眼',
    level: 'B1 聽力解碼',
    title: '破解校園聽力反折陷阱：活動改期與地點變更通知',
    scenario: '針對會考與學測聽力最愛考的「先說原訂計畫、再用 but / actually 改地點與時間」進行實戰訓練。',
    keyPatterns: [
      'It was originally scheduled for ..., but ...（原本預定在……，但是……）',
      'Since the auditorium is being renovated, we moved it to ...（因為禮堂正在整修，我們改到……）',
      'Make sure to bring ... instead of ...（務必攜帶……而不是……）'
    ],
    lines: [
      { speaker: 'Kevin', en: 'Hey Rachel, are we still meeting at the school gym at three for the charity bazaar rehearsal?', zh: '嘿 Rachel，我們今天下午三點還是在學校體育館集合彩排慈善義賣會嗎？', note: '聽力陷阱預警：問句中出現的第一個地點（gym）與時間（three）通常是干擾選項！' },
      { speaker: 'Rachel', en: 'Actually, the gym floor is being repainted today, so Ms. Chen moved our rehearsal to the music room.', zh: '其實體育館地板今天正在重新油漆，所以陳老師把我們的彩排改到音樂教室了。', note: '破題轉折詞：聽到 Actually / However 後面的地點（music room）才是正確答案！' },
      { speaker: 'Kevin', en: 'Good thing I asked! Is the time still three o’clock?', zh: '幸好我有問！那時間一樣是三點鐘嗎？', note: '口語高頻：Good thing I asked!（幸好我有先問！）' },
      { speaker: 'Rachel', en: 'We pushed it back by half an hour to three-thirty so everyone can finish their lab cleanup first.', zh: '我們往後順延了半小時改到三點半，讓大家能先把實驗室清理完。', note: '時間片語考點：push back（往後順延）vs. move up（提前）。' }
    ],
    recallPrompt: '聽力考點回想：「把時間往後延半小時」與「把時間提前」的英文片語分別是什麼？',
    recallAnswer: '往後順延是 push it back by half an hour；提前則是 move it up。'
  },
  {
    id: 'commute-work-01',
    stage: 'featured',
    topicTag: '💼 職場多益・跨國會議',
    level: 'B2 商務實戰',
    title: '跨國視訊會議主持：確認音訊畫面、對齊議程與行動項目',
    scenario: '主持台美跨部門視訊會議，確認與會者麥克風與螢幕分享正常，並快速聚焦三大議程。',
    keyPatterns: [
      'Can everyone see my screen clearly?（大家都看得到我的分享畫面嗎？）',
      'Let us jump right into today’s agenda.（我們直接進入今天的議程吧。）',
      'Could you walk us through the Q3 figures?（可以請您帶我們看一下第三季的數據嗎？）'
    ],
    lines: [
      { speaker: 'Host (Taipei)', en: 'Good morning to our London team, and good evening to Taipei. Can everyone hear me and see my screen clearly?', zh: '倫敦團隊早安，台北團隊晚安。請問大家都聽得清楚、看得到我的螢幕畫面嗎？', note: '遠距會議起手式：Can everyone see my screen clearly? 確認畫面分享。' },
      { speaker: 'Lead (London)', en: 'Loud and clear, Sophia! We can see the Q3 product launch deck on our end.', zh: '非常清楚，Sophia！我們這邊看得到第三季產品發表的簡報。', note: '道地回應：Loud and clear!（聲音清晰響亮！）；on our end（在我們這一端）。' },
      { speaker: 'Host (Taipei)', en: 'Great. Since we only have thirty minutes, let us jump right into item one: the revised launch timeline.', zh: '太好了。因為我們只有三十分鐘，我們直接進入第一項議程：修訂後的上市時程表。', note: '會議控場：jump right into...（直接切入正題）。' },
      { speaker: 'Lead (London)', en: 'Sure. Let me walk you through the updated marketing milestones and budget allocation.', zh: '好的，讓我帶各位瀏覽一下更新後的行銷里程碑與預算配置。', note: '商務黃金片語：walk someone through + 資料（帶某人逐步解說某份資料）。' }
    ],
    recallPrompt: '職場回想：在視訊會議中，怎麼用英文說「可以請你帶我們逐步看一下更新後的時程表嗎？」',
    recallAnswer: 'Could you walk us through the updated timeline?'
  },
  {
    id: 'commute-work-02',
    stage: 'featured',
    topicTag: '💼 職場多益・交期協商',
    level: 'B2 商務實戰',
    title: '供應鏈危機處理：零件海運延誤與改採空運分批出貨',
    scenario: 'TOEIC Part 3 最常考的物流延誤情境：供應商通知港口壅塞，買方要求緊急先空運首批零件。',
    keyPatterns: [
      'We ran into an unexpected delay at the port.（我們在港口遇到了非預期的延誤。）',
      'send a partial shipment via express air freight（透過緊急空運先寄出部分貨件）',
      'expedite the customs clearance（加速報關流程）'
    ],
    lines: [
      { speaker: 'Supplier', en: 'Hi Marcus, I am calling about purchase order 408. Unfortunately, our sea freight ran into a four-day congestion delay at the port.', zh: '嗨 Marcus，我打來是關於 408 號採購單。很遺憾，我們的海運在港口遇到塞港，延誤了四天。', note: '多益高頻片語：run into a delay（遭遇延誤）；congestion（壅塞）。' },
      { speaker: 'Buyer', en: 'Four days? Our assembly line is scheduled to start mass production this Friday! We cannot afford a line shutdown.', zh: '四天？我們的組裝線預定這週五就要開始量產了！我們承擔不起停線的損失。', note: '製造業核心詞：mass production（量產）；cannot afford（無法承擔……的後果）。' },
      { speaker: 'Supplier', en: 'To keep your line running, we can dispatch the first two hundred units via express air freight tonight at our expense.', zh: '為了讓貴司產線順利運作，我們今晚可以先自費透過快捷空運寄出首批兩百組零件。', note: '談判關鍵詞：at our expense（由我方負擔費用）；dispatch（派送、發貨）。' },
      { speaker: 'Buyer', en: 'That works as a contingency plan. Please expedite the shipment and send me the tracking number right away.', zh: '這可以作為應變方案。請加速出貨，並立刻把追蹤單號發給我。', note: '多益必考字：contingency plan（應變計畫）；expedite /ˈek.spə.daɪt/（加速處理）。' }
    ],
    recallPrompt: '多益商務回想：怎麼用英文表達「我們可以自費透過空運先寄出首批貨件」？',
    recallAnswer: 'We can dispatch the first batch via air freight at our expense.'
  },
  {
    id: 'commute-work-03',
    stage: 'featured',
    topicTag: '💼 職場多益・報價談判',
    level: 'B2 商務實戰',
    title: '商務採購與合約談判：爭取大量採購折扣與延長保固',
    scenario: '與軟體或設備廠商洽談年度續約，以簽訂兩年長約換取 15% 折扣與免費技術支援。',
    keyPatterns: [
      'Is there any room for negotiation on the unit price?（單價方面還有協商空間嗎？）',
      'offer a fifteen percent volume discount（提供八五折的大量採購折扣）',
      'commit to a two-year service contract（承諾簽訂兩年服務合約）'
    ],
    lines: [
      { speaker: 'Client', en: 'Thank you for sending over the proposal, Elena. The features fit our needs, but the annual licensing fee exceeds our Q4 budget.', zh: '謝謝妳寄來提案書，Elena。功能很符合我們的需求，但年度授權費超出了我們第四季的預算。', note: '多益高頻動詞：exceed the budget（超出預算）；proposal（提案書）。' },
      { speaker: 'Account Exec', en: 'I understand your budget constraints. How many user seats are you looking to deploy across your regional offices?', zh: '我理解貴司的預算限制。請問你們預計在各區分公司部署多少個使用者帳號呢？', note: '商務搭配：budget constraints（預算限制）；deploy（部署導入）。' },
      { speaker: 'Client', en: 'At least three hundred seats. Is there any room for negotiation if we commit to a two-year contract upfront?', zh: '至少三百個帳號。如果我們直接簽訂兩年合約，價格上還有協商空間嗎？', note: '談判黃金句：Is there any room for negotiation?（還有協商空間嗎？）；upfront（預先、直接）。' },
      { speaker: 'Account Exec', en: 'If you sign a two-year agreement this month, I can authorize a fifteen percent volume discount plus priority onboarding support.', zh: '如果您本月簽署兩年合約，我可以授權給您八五折的量購優惠，外加優先導入培訓支援。', note: '注意數字換算：15% discount 是「折抵 15%（即八五折）」，千萬別誤譯為一五折！' }
    ],
    recallPrompt: '談判句型回想：怎麼用英文禮貌詢問對方「如果我們簽兩年合約，價格還有協商空間嗎？」',
    recallAnswer: 'Is there any room for negotiation if we commit to a two-year contract?'
  },
  {
    id: 'commute-work-04',
    stage: 'featured',
    topicTag: '💼 職場多益・差旅應變',
    level: 'B1~B2 商務實戰',
    title: '商務出差班機取消：機場櫃檯改簽最早航班與申請住宿券',
    scenario: '出差途中遇到暴風雪導致班機取消，在航空公司櫃檯要求改搭轉機航班並索取延誤證明。',
    keyPatterns: [
      'My flight was just canceled due to severe weather.（我的班機剛因為惡劣天氣被取消了。）',
      'rebook me on the next available flight（幫我改訂下一班有空位的班機）',
      'issue a hotel voucher and delay certificate（開立飯店住宿券與延誤證明）'
    ],
    lines: [
      { speaker: 'Traveler', en: 'Excuse me, Flight 602 to Chicago was just canceled. I have a keynote speech tomorrow morning—can you rebook me on the next available flight?', zh: '不好意思，飛往芝加哥的 602 號班機剛取消了。我明早有一場主題演講，能幫我改簽下一班有空位的飛機嗎？', note: '機場急救句：rebook me on the next available flight（幫我改簽下一班有空位的航班）。' },
      { speaker: 'Agent', en: 'Let me check right away. All direct flights tonight are grounded, but I can route you through Denver departing in fifty minutes.', zh: '我馬上幫您查。今晚所有直飛班機都停飛了，但我可以幫您改搭五十分鐘後經由丹佛轉機的航班。', note: '航空用語：grounded（停飛的）；route you through + 轉機地（安排經由……轉機）。' },
      { speaker: 'Traveler', en: 'Will my checked baggage be transferred automatically to the new flight?', zh: '請問我的託運行李會自動轉掛到新航班上嗎？', note: '行李分類：checked baggage（託運行李）vs. carry-on luggage（隨身登機行李）。' },
      { speaker: 'Agent', en: 'Yes, I am updating your baggage routing tag right now. Here is your new boarding pass for Gate B12—please head there immediately!', zh: '會的，我現在正幫您更新行李轉掛標籤。這是您 B12 登機門的新登機證，請立刻前往！', note: '行動指令：head there immediately（立即前往那裡）。' }
    ],
    recallPrompt: '差旅急救回想：班機被取消時，怎麼用英文請地勤「幫我改簽下一班有空位的班機，並確認託運行李會自動轉掛」？',
    recallAnswer: 'Could you rebook me on the next available flight, and will my checked baggage be transferred automatically?'
  },
  {
    id: 'commute-esp-01',
    stage: 'featured',
    topicTag: '🛠️ 科技工程・設備排障',
    level: 'B1~B2 工程專業',
    title: '智慧工廠產線排障：光學感測器誤報與緊急停機檢修',
    scenario: '自動化包裝線突然觸發安全連鎖停機，工程師與技術員依標準作業程序 (SOP) 進行斷電與感測器校正。',
    keyPatterns: [
      'triggered a safety interlock fault（觸發了安全連鎖故障保護）',
      'follow the lockout-tagout (LOTO) procedure（遵守上鎖掛牌斷電安全程序）',
      'recalibrate the optical sensor（重新校正光學感測器）'
    ],
    lines: [
      { speaker: 'Technician', en: 'Chief, Conveyor Line Three just halted and triggered an error code E-14 on the control panel.', zh: '組長，三號輸送帶剛才停機了，並在控制面板上跳出 E-14 錯誤代碼。', note: '工程動詞：halt（停止運作）；trigger an error code（觸發錯誤代碼）。' },
      { speaker: 'Engineer', en: 'E-14 indicates an optical sensor misalignment. Did you engage the lockout-tagout switch before opening the guard?', zh: 'E-14 代表光學感測器偏位。你在打開防護罩前，有先執行上鎖掛牌斷電開關嗎？', note: '工安鐵律：lockout-tagout (LOTO)（上鎖掛牌斷電程序，防止檢修時機台誤啟動）。' },
      { speaker: 'Technician', en: 'Yes, main power is isolated and padlocked. I noticed dust buildup on the reflector lens.', zh: '有的，主電源已隔離並上鎖。我發現反射鏡片上有粉塵堆積。', note: '專業詞彙：isolate power（隔離電源）；dust buildup（粉塵堆積）。' },
      { speaker: 'Engineer', en: 'Clean the lens with isopropyl alcohol, recalibrate the beam alignment, and run a five-minute dry cycle.', zh: '用異丙醇清潔鏡片，重新校正光束對位，然後先跑五分鐘的空轉測試。', note: '實務術語：recalibrate（重新校正）；dry cycle / dry run（空轉測試、試運轉）。' }
    ],
    recallPrompt: '工程英語回想：怎麼用英文說「清潔鏡片、重新校正感測器，並進行五分鐘空轉測試」？',
    recallAnswer: 'Clean the lens, recalibrate the sensor, and run a five-minute dry cycle.'
  },
  {
    id: 'commute-esp-02',
    stage: 'featured',
    topicTag: '🛠️ 科技工程・品質驗收',
    level: 'B2 工程專業',
    title: '精密加工品管會議：公差超標隔離與表面粗糙度檢驗',
    scenario: '品管工程師與製造部門核對 CNC 加工零件的尺寸公差 (Tolerance) 與退貨重工流程。',
    keyPatterns: [
      'exceeds the upper tolerance limit by ...（超出公差上限……）',
      'quarantine the non-conforming batch（隔離不符合規格的批次）',
      'replace the worn carbide insert（更換磨損的碳化鎢刀片）'
    ],
    lines: [
      { speaker: 'QA Engineer', en: 'We completed the dimensional inspection for Batch 09. Three samples exceeded the upper tolerance limit by 0.03 millimeters.', zh: '我們完成了第 09 批的尺寸檢驗，有三個樣品超出公差上限 0.03 毫米。', note: '品管核心：dimensional inspection（尺寸檢驗）；tolerance limit（公差界限）。' },
      { speaker: 'Machinist', en: 'Let me check the tool offset log. Ah, the finishing carbide insert showed thermal wear after two hundred cycles.', zh: '我查一下刀具補正紀錄。啊，精車用的碳化鎢刀片在加工兩百件後出現了熱磨耗。', note: '機械字彙：tool offset（刀具補正）；thermal wear（熱磨耗）。' },
      { speaker: 'QA Engineer', en: 'Please quarantine all parts produced after noon and tag them for 100% re-inspection.', zh: '請將中午後生產的所有零件隔離，並掛籤進行百分之百全檢。', note: '品管動詞：quarantine（隔離不良品）；100% re-inspection（全數重檢）。' },
      { speaker: 'Machinist', en: 'Understood. I will replace the insert, compensate the offset, and submit the first-article sample for your sign-off.', zh: '了解。我會立即更換刀片、補償刀具偏置，並送交首件樣品請您簽核。', note: '製造流程：first-article sample（首件檢驗樣品）；sign-off（簽核放行）。' }
    ],
    recallPrompt: '品管英語回想：怎麼用英文表達「請隔離這批不良品，並送交首件樣品簽核」？',
    recallAnswer: 'Please quarantine this non-conforming batch and submit the first-article sample for sign-off.'
  },
  {
    id: 'commute-esp-03',
    stage: 'featured',
    topicTag: '🛠️ 科技工程・軟體與資安',
    level: 'B2 科技職場',
    title: '軟體工程師 Stand-up 晨會：API 延遲排障與熱修復部署',
    scenario: '每日敏捷開發晨會 (Daily Stand-up) 中，前後端工程師同步資料庫查詢瓶頸與 Hotfix 上線進度。',
    keyPatterns: [
      'identified a bottleneck in the database query（找出了資料庫查詢的效能瓶頸）',
      'roll out a hotfix to production（將熱修復更新部署到正式環境）',
      'monitor the error rate on the dashboard（在監控儀表板上觀察錯誤率）'
    ],
    lines: [
      { speaker: 'Scrum Master', en: 'Morning, team! Let us do a quick stand-up. Alex, any updates on the checkout API latency spike?', zh: '大家早！我們開始簡短晨會。Alex，結帳 API 延遲飆高的問題有最新進展嗎？', note: '軟體高頻：latency spike（延遲時間突增）；stand-up（站立晨會）。' },
      { speaker: 'Backend Dev', en: 'Yes, I identified a bottleneck in the order history query—it was missing a composite index.', zh: '有的，我找出了訂單歷史查詢的效能瓶頸——原本漏建了一個複合索引。', note: '工程精準詞：identify a bottleneck（找出瓶頸）；composite index（複合索引）。' },
      { speaker: 'Scrum Master', en: 'Did the patch pass automated regression testing in the staging environment?', zh: '修補程式在測試預備環境 (Staging) 通過自動化回歸測試了嗎？', note: '開發流程：staging environment（準正式測試環境）vs. production（正式環境）。' },
      { speaker: 'Backend Dev', en: 'All tests passed green. We are ready to roll out the hotfix to production with zero downtime at noon.', zh: '全部測試綠燈通過！我們準備在中午以零停機方式將熱修復部署到正式環境。', note: '必背片語：roll out a hotfix（部署釋出熱修復）；zero downtime（零停機時間）。' }
    ],
    recallPrompt: '科技英語回想：怎麼用英文說「我們找出了效能瓶頸，準備部署更新到正式環境」？',
    recallAnswer: 'We identified the performance bottleneck and are ready to roll out the update to production.'
  },
  {
    id: 'commute-esp-04',
    stage: 'featured',
    topicTag: '🛠️ 科技工程・實驗室安全',
    level: 'B1~B2 工程專業',
    title: '化學與材料實驗室安全：通風櫥操作與廢液分類回收',
    scenario: '實驗室助教指導新生使用有機溶劑時的個人防護裝備 (PPE)、排煙櫃與廢液回收規範。',
    keyPatterns: [
      'must be handled inside the fume hood（必須在排煙通風櫥內操作）',
      'wear chemical-resistant nitrile gloves（配戴抗化學腐蝕的丁腈手套）',
      'dispose of halogenated waste in the designated container（將含鹵素廢液倒入指定回收桶）'
    ],
    lines: [
      { speaker: 'Lab TA', en: 'Before we start today’s synthesis, remember that volatile solvents must always be handled inside the fume hood.', zh: '在開始今天的合成實驗前，請記住揮發性溶劑務必全程在排煙通風櫥內操作。', note: '實驗室必備：volatile solvents（揮發性溶劑）；fume hood（排煙通風櫥）。' },
      { speaker: 'Student', en: 'Should we wear standard latex gloves, or do we need the blue nitrile gloves?', zh: '請問我們戴一般乳膠手套就可以，還是需要戴藍色的丁腈手套呢？', note: '防護比較：latex gloves（乳膠手套）vs. nitrile gloves（耐有機溶劑之丁腈手套）。' },
      { speaker: 'Lab TA', en: 'Always wear nitrile gloves and splash goggles. Also, never pour organic solvents down the sink!', zh: '務必配戴丁腈手套與防濺護目鏡。此外，絕對不可將有機溶劑直接倒入水槽！', note: '安全禁令：never pour ... down the sink（切勿將……倒入水槽）。' },
      { speaker: 'Student', en: 'Got it. We should dispose of them in the labeled waste carboy in the safety cabinet, right?', zh: '了解。我們應該把廢液倒入安全櫃裡貼有標籤的廢液回收桶，對嗎？', note: '核心片語：dispose of（妥善處理／丟棄）；labeled waste container（貼標廢液桶）。' }
    ],
    recallPrompt: '工安回想：「揮發性溶劑必須在通風櫥內操作，且不可倒入水槽」英文怎麼說？',
    recallAnswer: 'Volatile solvents must be handled inside the fume hood, and never pour them down the sink.'
  },
  {
    id: 'commute-intl-01',
    stage: 'featured',
    topicTag: '🏛️ 學術思辨・TOEFL iBT',
    level: 'B2~C1 托福口說與聽力',
    title: '托福校園政策討論：圖書館改建為 24 小時共享學習中心',
    scenario: '模擬 TOEFL iBT 校園聽力與整合口說：學生針對大學取消紙本期刊區、改設全天候協作空間提出正反論據。',
    keyPatterns: [
      'While I see the administration’s point, ...（雖然我理解校方的考量，但……）',
      'digitized archives are already accessible online（數位化典藏已經可以在線上存取）',
      'noise spillover might disrupt quiet study zones（噪音外溢可能會干擾安靜自習區）'
    ],
    lines: [
      { speaker: 'Liam', en: 'Did you read the campus announcement? The university is converting the first-floor periodical room into a 24-hour collaborative commons.', zh: '妳看過校園公告了嗎？學校要把一樓的期刊室改建成 24 小時開放的協作共享空間。', note: '托福校園高頻：convert A into B（將 A 改建／轉換為 B）；collaborative commons（協作共享空間）。' },
      { speaker: 'Chloe', en: 'I actually think it is a smart move. Most academic journals are digitized now, so those shelves sit half-empty anyway.', zh: '我其實覺得這一步很明智。現在多數學術期刊都已經數位化了，那些書架平時也半空著。', note: '口語論證：a smart move（明智之舉）；digitized（數位化的）。' },
      { speaker: 'Liam', en: 'True, but what about the noise spillover? Group discussions at midnight could disrupt students studying on the second floor.', zh: '這倒是真的，但噪音外溢怎麼辦？半夜的小組討論可能會干擾到二樓安靜自習的學生。', note: '反駁轉折：True, but what about...（先局部讓步，再提出反面疑慮）。' },
      { speaker: 'Chloe', en: 'According to the blueprint, they are installing acoustic glass partitions and soundproof booths to contain the noise.', zh: '根據工程藍圖，校方會安裝隔音玻璃隔間與獨立隔音艙來阻絕噪音。', note: '解方字彙：acoustic glass partitions（隔音玻璃隔間）；contain the noise（控制／阻絕噪音）。' }
    ],
    recallPrompt: '托福口說回想：怎麼用英文總結女學生的兩個贊成理由（期刊已數位化＋有安裝隔音玻璃）？',
    recallAnswer: 'She supports the plan because most journals are already digitized and the university will install acoustic glass partitions to contain noise.'
  },
  {
    id: 'commute-intl-02',
    stage: 'featured',
    topicTag: '🏛️ 學術思辨・Digital SAT',
    level: 'C1 學術閱讀與證據',
    title: 'SAT 學術閱讀研討：珊瑚白化恢復力之反直覺實驗證據',
    scenario: '剖析 Digital SAT Reading 中最常考的「推翻傳統假設 (Counter-Intuitive Finding)」與語境詞彙精準對應。',
    keyPatterns: [
      'runs counter to the prevailing assumption（與主流假設背道而馳）',
      'exhibited unexpected thermal resilience（展現出出乎意料的耐熱恢復力）',
      'attributable to symbiotic algae adaptation（歸因於共生藻類的適應機制）'
    ],
    lines: [
      { speaker: 'Mentor', en: 'In this marine biology passage, what is the conventional wisdom regarding shallow-water coral reefs?', zh: '在這篇海洋生物學文章中，過去學界對淺水珊瑚礁的傳統主流認知是什麼？', note: 'SAT 必考結構：conventional wisdom / prevailing assumption（傳統主流觀點，常在後文被推翻）。' },
      { speaker: 'Scholar', en: 'Ecologists long assumed that shallow reefs would bleach faster than deep-water reefs because of intense temperature fluctuations.', zh: '生態學家長期以為淺水珊瑚礁會因為劇烈的溫度波動，而比深水珊瑚礁更快白化。', note: '過去觀點標記：long assumed that...（過去長期以為……，暗示新研究將反駁它）。' },
      { speaker: 'Mentor', en: 'And how do Dr. Palumbi’s empirical findings challenge that view?', zh: '那麼 Palumbi 博士的實證研究結果如何挑戰這個觀點呢？', note: '學術核心詞：empirical findings（實證研究結果）。' },
      { speaker: 'Scholar', en: 'His team found that prior exposure to daily heat swings actually preconditioned shallow corals, granting them superior thermal resilience!', zh: '他的團隊發現，平時暴露在日夜溫差中反而讓淺水珊瑚產生了預先適應，賦予牠們更優異的耐熱恢復力！', note: '高階字彙：precondition（使預先適應）；thermal resilience（耐熱韌性／恢復力）。' }
    ],
    recallPrompt: 'SAT 邏輯回想：當文章開頭出現 Ecologists long assumed that... 時，作者接下來通常會怎麼寫？',
    recallAnswer: 'The author will typically introduce new empirical evidence that challenges or contradicts that conventional assumption.'
  },
  {
    id: 'commute-intl-03',
    stage: 'featured',
    topicTag: '🏛️ 學術思辨・GRE Verbal',
    level: 'C1~C2 語意極性與等價',
    title: 'GRE 語意邏輯對談：利用轉折極性破解雙選等價詞群',
    scenario: '訓練 GRE Sentence Equivalence 核心技能：不靠死背冷僻字，而是先抓轉折連接詞與前後語意正負號。',
    keyPatterns: [
      'Far from being ..., the critic’s review was ...（非但不是……，這位評論家的書評反而……）',
      'synonyms that preserve identical sentence polarity（維持相同句子語意極性的同義詞對）',
      'temper one’s praise with incisive caveats（在讚賞中伴隨著犀利的保留與警示）'
    ],
    lines: [
      { speaker: 'Professor', en: 'Look at this sentence: "Far from being purely adulatory, the biographer’s account is ________, candidly documenting the leader’s strategic blunders."', zh: '看這句：「這本傳記非但不是一味吹捧，反而是________的，坦率記錄了該領袖的戰略失誤。」', note: 'GRE 結構公式：Far from being A, S is B（非但不是 A，反而是與 A 相反的 B）。' },
      { speaker: 'Candidate', en: 'Since the second clause says "candidly documenting blunders," the blank must mean objective or critical rather than flattering!', zh: '因為後半句說「坦率記錄失誤」，空格一定是指「客觀公正或具批判性的」，而不是阿諛奉承的！', note: '破題關鍵：先用後半句的分詞構句（documenting blunders）鎖定空格的正負極性。' },
      { speaker: 'Professor', en: 'Spot on! Now, among the six choices, which pair of words shares that exact meaning?', zh: '完全正確！現在從六個選項中，哪一對單字共享這個精確語意呢？', note: 'GRE 六選二鐵律：選出的兩個字放入句中必須產生完全等價的句意。' },
      { speaker: 'Candidate', en: '"Evenhanded" and "dispassionate"! Both mean impartial and unclouded by personal bias.', zh: '是 evenhanded 與 dispassionate！這兩個字都代表「公正不阿、不受個人偏見影響的」。', note: 'GRE 核心孿生詞：evenhanded = dispassionate = impartial（公正客觀的）。' }
    ],
    recallPrompt: 'GRE 思維回想：evenhanded 與 dispassionate 在學術語境中的共同意思是什麼？',
    recallAnswer: 'Both mean impartial, objective, and free from emotional bias（公正客觀、不偏不倚的）。'
  },
  {
    id: 'commute-intl-04',
    stage: 'featured',
    topicTag: '🏛️ 學術思辨・GMAT CR',
    level: 'C1~C2 商業決策邏輯',
    title: 'GMAT 商業決策詰問：找出因果推論中的「他因干擾」與隱藏假設',
    scenario: '模擬 GMAT Focus Critical Reasoning 顧問案例討論：分析為何「導入遠距辦公後離職率下降」不一定代表遠距辦公留住了員工。',
    keyPatterns: [
      'confuses correlation with causation（將相關性誤認為因果關係）',
      'overlooks an alternative explanatory factor（忽略了另一個替代解釋因素）',
      'rule out rival hypotheses before scaling the policy（在全面擴大政策前先排除競爭假設）'
    ],
    lines: [
      { speaker: 'Partner', en: 'The HR director claims that our new hybrid work policy directly caused the thirty percent drop in employee turnover this quarter.', zh: '人資長主張，我們新推行的混合辦公政策直接促成了本季員工離職率下降 30%。', note: 'GMAT 典型論證：看到「A 發生後 B 改變，因此 A 導致 B」，立刻警覺因果跳躍！' },
      { speaker: 'Analyst', en: 'That argument confuses correlation with causation. Did anything else change in the labor market during the same quarter?', zh: '這個論證把相關性誤當成因果關係了。同一季勞動市場還有發生其他變化嗎？', note: '批判推理金句：confuse correlation with causation（混淆相關與因果）。' },
      { speaker: 'Partner', en: 'Good question! We also raised base salaries by twelve percent and major competitors froze hiring in May.', zh: '問得好！我們同時把底薪調高了 12%，而且主要競爭對手在五月凍結了徵才。', note: '削弱題核心：提出他因（Alternative Cause：加薪與對手凍結徵才）即可削弱原因果結論！' },
      { speaker: 'Analyst', en: 'Exactly. Unless we isolate those variables by comparing departments with and without hybrid work, the conclusion remains unproven.', zh: '沒錯。除非我們比較「有實施」與「未實施」混合辦公的部門來隔離那些變數，否則該結論仍未獲證實。', note: '對照組邏輯：isolate variables（隔離控制變數）是加強或評估因果推論的黃金標準。' }
    ],
    recallPrompt: 'GMAT 邏輯回想：要如何削弱「A 政策導致離職率下降」的商業推論？',
    recallAnswer: 'Point out an alternative cause (such as salary increases or competitor hiring freezes) that occurred during the same period.'
  }
];

// 27 組核心教學章節 (`curriculum.mjs`) 之完整繁體中文翻譯、必學句型與教學重點對照庫
const CHAPTER_DIALOGUE_ENRICHMENTS = {
  j1: {
    scenario: '課後同學間關心彼此正在做的功課與日常讀書習慣，對比「現在進行式、過去簡單式、現在簡單式與未來計畫」。',
    keyPatterns: ['What are you doing right now?（你現在正在做什麼？）', 'I usually + 原形動詞...（我通常……，表日常習慣）', 'Are you going to ... tomorrow?（你明天打算……嗎？）'],
    zhLines: [
      '嘿 Beth，妳現在正在做什麼呢？',
      '我正在寫關於動詞時態的英文作業。你昨天寫完你的作業了嗎？',
      '有喔，我寫完了！我通常都會在晚餐前完成作業。',
      '真是個好習慣。你明天打算準備自然科小考嗎？',
      '當然囉。我們放學後在圖書館一起複習筆記吧！'
    ],
    notes: [
      'right now 搭配現在進行式 are you doing，表示「說話當下正在進行的動作」。',
      'yesterday 是明確過去時間點，助動詞必須用過去式 Did，後面動詞還原為 finish。',
      '頻率副詞 usually（通常）放在一般動詞 complete 前面，表規律習慣。',
      'be going to + 原形動詞 study，表示「已經計畫好要執行的未來行動」。',
      'Let us (Let’s) + 原形動詞 review，用於主動提出邀約與建議。'
    ],
    recallPrompt: '想一想：怎麼用英文問朋友「你現在正在做什麼？你昨天寫完作業了嗎？」',
    recallAnswer: 'What are you doing right now? Did you finish your homework yesterday?'
  },
  j2: {
    scenario: '在家中檢查冰箱食材並準備出門採買，靈活運用可數／不可數名詞限定詞 (any, little, some, a few, enough) 與反身代名詞。',
    keyPatterns: ['Do we have any ... left?（我們還剩下任何……嗎？）', 'very little + 不可數名詞（幾乎沒有……）', 'a few + 可數複數名詞（幾個／一些……）'],
    zhLines: [
      'Lisa，我們冰箱裡還剩下任何麵包嗎？',
      '沒有耶，我們的麵包所剩無幾了，但還有一些起司跟牛奶。',
      '我需要買幾樣晚餐的食材。妳身上有多少錢呢？',
      '我身上有五十元。你拿去自己買雜貨食材吧。',
      '謝謝妳！我會買足夠我們兩個人吃的水果回來。'
    ],
    notes: [
      '疑問句中詢問「是否有任何……」常用 any；left 放在名詞後表「剩下的」。',
      'bread 是不可數名詞，用 very little 表「少到幾乎沒有（否定意味）」。',
      'ingredients（食材）可數，用 a few；money（錢）不可數，必須用 How much 提問！',
      'yourself（你自己）為反身代名詞，強調「親自去買」；both of us 指「我們兩人」。',
      'enough 修飾名詞 fruit 時放在名詞前面（enough fruit）。'
    ],
    recallPrompt: '語法回想：詢問「你有多少錢？」跟「你需要買幾樣食材？」分別用 How much 還是 How many？',
    recallAnswer: '錢不可數用 How much money do you have?；食材可數用 a few ingredients。'
  },
  j3: {
    scenario: '週末相約去看太空探險動畫電影，演練禮貌邀約 (Would you like to...)、提議 (How about...) 與確認集合時間地點。',
    keyPatterns: ['Would you like to ... this Saturday?（這週六你想一起……嗎？）', 'How about + N / V-ing?（……如何呢？）', 'Where and when should we meet?（我們應該在何時何地碰面？）'],
    zhLines: [
      '午安，Emma！這週六妳想一起去看電影嗎？',
      '我很樂意去呀！你計畫看哪一部電影呢？',
      '看那部關於太空探險的新動畫片如何？',
      '聽起來太棒了！我們應該在哪裡、幾點見面呢？',
      '我們兩點鐘在電影院售票櫃檯前面見面吧！'
    ],
    notes: [
      'Would you like to + V 是最禮貌溫和的邀約句型，比 Do you want to 更得體。',
      '答應邀約最道地的說法：I would love to!（我很樂意！注意 to 後面省略了 go）。',
      'How about + 名詞片語 / V-ing，用於提出具體點子並徵詢對方意見。',
      '情態助動詞 should + 原形動詞 meet，用於商量「應該怎麼安排」。',
      '地點介系詞 in front of（在……正前方）；時間點用 at two o’clock。'
    ],
    recallPrompt: '口語回想：朋友問 Would you like to go to the movies? 時，怎麼熱情答應並問「我們幾點在哪裡見面」？',
    recallAnswer: 'I would love to! Where and when should we meet?'
  },
  j4: {
    scenario: '戶外野餐前突然烏雲密布，運用讓步子句 (although)、條件子句 (if / unless) 與目的子句 (so that) 做出應變決策。',
    keyPatterns: ['Although ..., ...（雖然……，但是……，切勿再加 but！）', 'unless + 現在簡單式（除非……，否則……）', 'so that + 主詞 + 助動詞（為了讓……）'],
    zhLines: [
      'Tina，妳看窗外！厚重的黑雲正快速聚集起來。',
      '對呀，雖然早上的天氣預報保證天氣晴朗，但現在看起來快下雨了。',
      '如果開始下雨的話，我們應該延後戶外野餐嗎？',
      '好，除非雨在二十分鐘內停下來，否則我們就改去室內咖啡廳吧。',
      '好主意！我先把食物打包好，才不會有任何東西淋濕。'
    ],
    notes: [
      '現在進行式 are gathering 描繪眼前正在發生的天氣變化。',
      '黃金必考規則：Although（雖然）已經是連接詞，後半句絕對不可以再寫 but！',
      '條件副詞子句 if it starts to rain，用「現在簡單式 starts」代替未來式！',
      'unless = if ... not（除非……），同樣遵守「以現在式表未來條件」規則。',
      'so that + 子句（nothing gets wet）表示前一個動作的目的（為了不讓東西淋濕）。'
    ],
    recallPrompt: '文法避雷回想：為什麼 Although the forecast promised clear skies, but it looks like rain 是錯的？',
    recallAnswer: '因為英文一句話只能有一個連接詞，用了 Although 就絕對不能再用 but！'
  },
  j5: {
    scenario: '在美術館閱讀休館公告與團體票優惠資訊，練習從生活應用文本抓出關鍵時間、條件與折扣數字。',
    keyPatterns: ['What does this announcement say?（這則公告上面寫什麼？）', 'be closed for maintenance（因維修保養而休館）', 'free of charge（完全免費）'],
    zhLines: [
      '不好意思，Brian。請問這張美術館公告寫了什麼？',
      '上面寫說現代藝術特展下週一將因例行維護而休館。',
      '如果我們這週五以學校團體名義參觀，門票有打折嗎？',
      '有喔！十人以上團體享有七折優惠（30% discount），而且語音導覽完全免費。',
      '太棒了！我們現在就幫整個讀書會報名吧。'
    ],
    notes: [
      '詢問標示、公告或信件內容時，英文習慣說 What does this sign/announcement say?',
      'be closed for maintenance（因維修保養而關閉），是會考與多益公告題常客。',
      'passive 被動語態 Are tickets discounted（門票有被打折嗎）。',
      '數字陷阱：a thirty percent (30%) discount 是「減免 30%」，也就是中文的「打七折」！',
      'free of charge = complimentary = at no extra cost（免費）。'
    ],
    recallPrompt: '生活應用回想：英文的 a 30% discount 是中文的打幾折？「完全免費」可以怎麼說？',
    recallAnswer: '30% discount 是減去 30%，即中文的「打七折」；免費可說 free of charge。'
  },
  j6: {
    scenario: '在咖啡廳點餐結帳時，聽辨極易混淆的長短重音數字（thirteen 13 vs. thirty 30）與點餐找零對話。',
    keyPatterns: ['Can I take your order?（我可以幫您點餐了嗎？）', 'That comes to ... dollars.（總共是……元。）', 'Did you say thirty or thirteen?（請問您剛才說的是 30 還是 13？）'],
    zhLines: [
      '歡迎光臨日出咖啡！請問可以幫您點餐了嗎？',
      '嗨！我想要一杯大杯拿鐵和兩個藍莓瑪芬蛋糕，謝謝。',
      '沒問題。這樣總共是十三塊五毛（$13.50）。',
      '請問您剛才說的是三十元（thirty）還是十三元（thirteen）呢？',
      '先生，是十三塊五毛（thirteen fifty）。這是您的收據。'
    ],
    notes: [
      '服務業常用句：Can I take your order? / Are you ready to order?',
      '點餐禮貌表達：I would like (I’d like) + 餐點，比 I want 更自然。',
      '計價片語：That comes to + 總金額（加總起來一共是……元）。',
      '聽力重音題眼：13 (thir-TEEN) 重音在後且有鼻音 /n/；30 (THIR-ty) 重音在前且 t 發彈舌音！',
      'receipt /rɪˈsiːt/（收據）注意字母 p 完全不發音！'
    ],
    recallPrompt: '發音與聽力回想：怎麼區分 13 (thirteen) 與 30 (thirty) 的重音位置？「收據」receipt 哪個字母不發音？',
    recallAnswer: 'thirteen 重音在第二音節 (-teen)，thirty 重音在第一音節 (thir-)；receipt 的 p 不發音。'
  },
  j7: {
    scenario: '模考後與老師檢討閱讀測驗配速策略，學會診斷錯題原因（時間分配不均 vs. 字彙密度）並制定應試計畫。',
    keyPatterns: ['make steady progress（取得穩定的進步）', 'figure out the reason（找出原因）', 'run out of time（時間不夠用／耗盡時間）'],
    zhLines: [
      'Leo，你在今天的模擬考取得了穩定的進步，43 題拿到了 40 分！',
      '謝謝林老師！但我最後一篇閱讀測驗還是寫得很掙扎。',
      '我們一起來找出原因吧。你是時間不夠用，還是單字太密集呢？',
      '我在第 32 題花了太長時間，所以最後兩題只好匆忙趕完。',
      '請記住「配速就是一切」。下次務必嚴格遵守我們的時間分配策略！'
    ],
    notes: [
      'progress（進步）為不可數名詞，搭配動詞 make（make steady progress）。',
      'struggle with...（在……方面感到吃力掙扎）。',
      '重要片語：figure out（弄清楚、想出）；run out of time（時間用光）。',
      'spend too long on + 題目 / rush through（匆忙趕過）。',
      'Keep in mind that + 子句（務必謹記……），寫作與口語皆極好用。'
    ],
    recallPrompt: '會考實戰回想：怎麼用英文說「我時間不夠用，所以最後兩題只好匆忙趕完」？',
    recallAnswer: 'I ran out of time, so I had to rush through the final two questions.'
  },
  s1: {
    scenario: '高中句法研討課：教授帶領學生剖析「完成式分詞構句 (Having + p.p.)」與「否定副詞放句首之倒裝句 (Rarely + 助動詞 + S + V)」。',
    keyPatterns: ['Having + p.p., S + V（完成式分詞構句，表先發生的主動動作）', 'Rarely / Never / Seldom + 助動詞 + S + V（否定副詞句首倒裝）'],
    zhLines: [
      '請注意作者在第一段是如何建構這個複合長句的。',
      '是的，她在句首使用了分詞構句：「Having reviewed thousands of documents, the committee reached a verdict.（在審閱數千份文件後，委員會達成裁決。）」',
      '沒錯。這樣能避免重複的主詞代名詞，並提升學術語氣。',
      '而且在第二行，她把否定副詞 Rarely 放在句首，觸發了主詞與助動詞倒裝！',
      '非常精彩的觀察！掌握這些句法結構，你的英文作文就能展現 C1 等級的流暢度。'
    ],
    notes: [
      '拆解長難句第一步：先抓主要子句的主詞與動詞（the committee reached）。',
      'Having reviewed 為完成式分詞構句，強調「審閱文件」發生在「達成裁決」之前。',
      'elevate the academic tone（提升學術語調）。',
      '大考必考倒裝：Rarely / Never / Not only 放句首時，後面必須接疑問句語序（助動詞 + S + V）。',
      'syntactic patterns（句法結構模式）。'
    ],
    recallPrompt: '高中句法回想：當 Rarely 或 Never 放在句首強調時，後面的主詞與動詞要怎麼變化？',
    recallAnswer: '必須採用部分倒裝（Subject-Auxiliary Inversion）：助動詞 / be 動詞 + 主詞 + 原形動詞。'
  },
  s2: {
    scenario: '攻克學測與統測「篇章結構（四空五選）」：利用代名詞指涉 (These unexpected consequences) 與正負語氣連貫排除誘答選項。',
    keyPatterns: ['These + 複數名詞（前文必須出現過對應的複數概念）', 'cohesive tie（篇章連貫線索）'],
    zhLines: [
      '我在這份「四空五選」篇章結構練習題裡，一直無法確定第五個選項該不該選。',
      '選項 D 提到「These unexpected consequences（這些意料之外的後果）」，但妳看第三段。',
      '第三段都在討論正面的技術突破，根本沒有提到負面的後果呀！',
      '完全正確！選項 D 就是專門用來誘騙「只看單字 consequences 就亂填」的人工干擾選項。',
      '這樣就完全說得通了！這個轉折線索需要前文先出現過表示負面傷害的複數名詞。'
    ],
    notes: [
      'struggle with（對……苦惱）。',
      '篇章結構破題王道：看到指示代名詞 These + N，立刻往前一句核對「正負極性」與「單複數」！',
      'positive breakthroughs（正面突破）vs. negative consequences（負面後果）。',
      'distractor（測驗學中的「誘答選項」）。',
      'That makes total sense.（這樣就完全合理／說得通了！）'
    ],
    recallPrompt: '篇章結構回想：看到選項開頭是 These unexpected consequences 時，前文必須滿足什麼條件才能選？',
    recallAnswer: '前文必須已經具體提到兩個以上「非預期的負面結果或影響」，才能用 These 指涉。'
  },
  s3: {
    scenario: '雙文比較閱讀 (Paired Passages)：分析經濟學家與社會學家對「遠距工作」的觀點交集與盲點批評。',
    keyPatterns: ['invariably boosts overall productivity（總是能提升整體生產力）', 'overlooks long-term organizational health（忽略了長期的組織健康）'],
    zhLines: [
      '在 A 文中，經濟學家宣稱遠距工作總是能提升整體的勞動力生產力。',
      '然而在 B 文中，社會學家卻強調資淺員工失去非正式社交指導（師徒傳承）的隱憂。',
      '非常精確。那麼 B 文作者會如何批評 A 文作者的觀點呢？',
      'B 文會批評 A 文只看短期產出指標，卻忽略了長期的組織文化與人才培育健康。',
      '一針見血！這正是綜合比較兩篇對立學術文本的標準破題法。'
    ],
    notes: [
      'invariably（總是、無一例外地），在閱讀測驗中屬於「絕對化字眼」，常是另一篇反駁的靶子。',
      'erosion（侵蝕、流失）；informal mentorship（非正式的職場前輩指導）。',
      '雙文比較必考題型：What would the author of Text B say to Text A?',
      'overlook（忽略、漏看）；focus solely on（只聚焦於……）。',
      'synthesize contrasting viewpoints（綜合對比不同觀點）。'
    ],
    recallPrompt: '雙文閱讀回想：怎麼用英文表達「A 文只看短期指標，卻忽略了長期影響」？',
    recallAnswer: 'Text A focuses solely on short-term metrics while overlooking long-term impacts.'
  },
  s4: {
    scenario: '英文寫作搭配詞診斷 (Collocations)：糾正中式英文 make research，改用道地學術搭配 conduct / carry out research。',
    keyPatterns: ['conduct / carry out research on...（針對……進行研究，切勿說 make research！）', 'elevate your score band（提升你的評分級距）'],
    zhLines: [
      '在你的作文草稿裡，你寫了「make research about environmental pollution」。',
      '請問那樣在文法上是錯的嗎？',
      '意思看得懂，但不符合母語搭配習慣。在學術英文中，我們說「conduct research」或「carry out research」。',
      '啊，原來「conduct」才是跟「research」精準配對的搭配動詞！',
      '沒錯！把口語萬用動詞升級為精確的學術搭配詞，能立刻拉高你的寫作級分。'
    ],
    notes: [
      '中式英文大忌：中文說「做研究、做決定、做犯錯」，英文動詞各不相同！',
      'unidiomatic（不符合母語慣用搭配的）。',
      '黃金搭配必背：conduct research（做研究）、make a decision（做決定）、commit a mistake（犯錯）。',
      'collocation（固定搭配詞）。',
      'colloquial verbs（口語一般動詞）vs. academic pairings（學術固定搭配）。'
    ],
    recallPrompt: '搭配詞回想：「進行研究」不能說 make research，正確的兩種道地英文動詞搭配是什麼？',
    recallAnswer: 'conduct research 或 carry out research。'
  },
  s5: {
    scenario: '大考中譯英進階演練：將中文無主詞句轉換為「In order to + V, 動名詞片語當主詞 + is recommended」之高分句型。',
    keyPatterns: ['To maintain physical health, we should develop a habit of...（基礎滿分句）', 'Cultivating a habit of regular exercise is highly recommended.（動名詞主詞高階句）'],
    zhLines: [
      '我們來看看這道中譯英題目：「為了維護身體健康，我們應該養成規律運動的習慣。」',
      '我寫的是：「To maintain physical health, we should develop a habit of regular exercise.」',
      '這句在文法上完美無瑕！如果要讓它聽起來更具學術文采，你會怎麼改寫？',
      '「In order to preserve optimal physical well-being, cultivating a habit of regular exercise is highly recommended.」',
      '太精彩了！使用動名詞片語（cultivating...）當主詞，賦予了整個句子極佳的學術優雅感。'
    ],
    notes: [
      '中譯英第一步：先決定主詞（we 或動名詞片語）與核心動詞。',
      '養成習慣：develop / cultivate / form a habit of + N/V-ing。',
      'spotless（毫無瑕疵的）。',
      '高分升級技巧：maintain ➔ preserve optimal well-being；develop ➔ cultivate。',
      '動名詞片語當主詞（Cultivating...）視為單數，後面配單數動詞 is！'
    ],
    recallPrompt: '中譯英回想：「養成規律運動的習慣」除了 develop a habit of regular exercise，還可以用哪個高階動詞代替 develop？',
    recallAnswer: '可以用 cultivate（cultivate a habit of regular exercise）。'
  },
  s6: {
    scenario: '議論文寫作指導：將空泛的預測改寫為具備「讓步子句 (While...) ＋ 明確立場主張」的強力主旨句 (Thesis Statement)。',
    keyPatterns: ['While + 讓步子句, 主詞 + 明確立場主張（雖然……，但……）', 'cultivate empathy and civic values（培養同理心與公民價值）'],
    zhLines: [
      '你的第一段有很吸引人的開場，但全文主旨句（Thesis Statement）稍微有點模糊。',
      '我寫說：「人工智慧將會永遠改變高中教育。」',
      '那只是一個寬泛的趨勢預測，不是論證主旨句。請亮出你具體的正反立場！',
      '那改成這樣如何：「雖然 AI 家教能強化個人化回饋，但它無法取代教師培養同理心與公民價值的角色」？',
      '太出色了！這句話直接為你接下來的兩個正文段落提供了清晰的論證藍圖。'
    ],
    notes: [
      'captivating hook（引人入勝的開場句）；vague（模糊不清的）。',
      '寫作避雷：只寫「某事物很重要／會改變世界」沒有論辯性，拿不到高分。',
      'stance（立場、觀點）。',
      '滿分主旨句公式：While + 對立面優點（AI enhances feedback）, 主張核心（it cannot replace teachers in...）。',
      'roadmap（文章架構藍圖）。'
    ],
    recallPrompt: '寫作回想：如何用 While 造出一個兼顧正反面、立場鮮明的高分主旨句？',
    recallAnswer: 'While [對方觀點的合理處], [我方更核心的主張與不可取代性].'
  },
  s7: {
    scenario: '大考考場最後五分鐘衝刺檢核：確認條碼張貼、作文收尾檢查與答案卡畫記對齊。',
    keyPatterns: ['Five minutes remaining!（還剩下五分鐘！）', 'double-check the optical answer card alignment（再次確認答案卡畫記題號對齊）'],
    zhLines: [
      '考試時間還剩五分鐘！請確認您的應試號碼條碼已妥善貼好。',
      '我剛寫完作文的結論段！現在還有三分鐘可以從頭檢查拼字與時態。',
      '我正在再次核對電腦答案卡的題號對齊，確保沒有跳題畫錯格。',
      '時間到！請立即放下手上的筆。',
      '呼！嚴格執行我們演練過的 100 分鐘配速計畫，真的起了關鍵作用！'
    ],
    notes: [
      'affix（張貼、貼附）；remaining（剩餘的，放在時間名詞後）。',
      'proofread（校對檢查文章的拼字與文法錯誤）。',
      '考場救命習慣：double-check answer card alignment（檢查答案卡有沒有跳題畫錯行）。',
      'Put down your pens immediately.（立即停筆。）',
      'make all the difference（產生決定性的重大影響）。'
    ],
    recallPrompt: '考場英語回想：「檢查作文拼字文法錯誤」的英文動詞是什麼？「起了關鍵作用」怎麼說？',
    recallAnswer: '校對檢查是 proofread；起了關鍵作用是 make all the difference。'
  },
  v1: {
    scenario: '機械加工工場安全檢核：領班攔下未戴護目鏡與安全鞋的學徒，嚴格要求穿戴完整個人防護裝備 (PPE)。',
    keyPatterns: ['safety glasses and steel-toe boots（安全護目鏡與鋼頭安全鞋）', 'full PPE (Personal Protective Equipment)（完整個人防護裝備）'],
    zhLines: [
      '慢著，Kevin！你的安全護目鏡跟鋼頭安全鞋呢？',
      '報告領班，我放在走廊對面的置物櫃裡。我只是想進來拿一支扳手而已。',
      '根據工場安全規定，任何人未穿戴完整個人防護裝備 (PPE) 絕對不得進入加工區，沒有例外！',
      '對不起，Harris 先生，我立刻去拿過來穿好。',
      '很好。飛濺的金屬切削碎屑只要幾分之一秒就會造成無法挽回的失明。'
    ],
    notes: [
      'Hold on!（慢著！停一下！）；steel-toe boots（防砸鋼頭安全鞋）。',
      'wrench /rentʃ/（扳手，w 不發音）。',
      'PPE = Personal Protective Equipment（個人防護裝備）；句尾加 period 表示「話說到此，毫無妥協餘地」。',
      'fetch（去把某物拿回來）。',
      'metal shavings（金屬碎屑）；irreversible（不可逆的、無法挽回的）。'
    ],
    recallPrompt: '工場安全回想：英文縮寫 PPE 代表什麼？「安全護目鏡與鋼頭鞋」英文怎麼說？',
    recallAnswer: 'PPE 是 Personal Protective Equipment（個人防護裝備）；safety glasses and steel-toe boots。'
  },
  v2: {
    scenario: '精密機械尺寸驗收：工程師與技術員使用數位分厘卡量測鋁合金傳動軸直徑，判定是否超出公差規格。',
    keyPatterns: ['measure the diameter with a digital micrometer（用數位分厘卡量測直徑）', 'plus-or-minus 0.02 tolerance（正負 0.02 的公差範圍）'],
    zhLines: [
      'Mark，我們來檢驗剛到貨的這批鋁合金傳動軸吧。',
      '我現在正在用數位分厘卡量測它的外徑。',
      '第四號樣品你量出來的讀數是多少？',
      '量出來是 25.04 毫米。工程藍圖規定是 25.00 毫米，公差正負 0.02 毫米。',
      '那它就超出規格 0.02 毫米了。我們必須把這整批貨隔離扣留。'
    ],
    notes: [
      'aluminum transmission shafts（鋁合金傳動軸）。',
      'digital micrometer（數位分厘卡／測微計）；diameter（直徑）。',
      'reading（儀器量測出來的讀數）。',
      'plus-or-minus tolerance（正負公差）：25.00 ± 0.02 代表合格範圍為 24.98 ~ 25.02 mm。',
      'out of specification (out of spec)（超出規格標準）；quarantine（隔離封存）。'
    ],
    recallPrompt: '量測英語回想：「超出規格標準」與「正負 0.02 公差」的英文怎麼說？',
    recallAnswer: 'out of specification (out of spec)；plus-or-minus 0.02 tolerance。'
  },
  v3: {
    scenario: 'CNC 車床異常冒煙緊急排障：操作員按下急停鈕斷電後，與領班逐步排查冷卻液與氣壓管路。',
    keyPatterns: ['hit the red emergency stop button（按下紅色緊急停止按鈕）', 'disconnect the pneumatic supply line（拔除氣壓供應管線）'],
    zhLines: [
      '產線領班，六號工站的 CNC 車床停止切削，而且正在冒煙！',
      '你按下紅色的緊急停止按鈕了嗎？',
      '按了，領班，電源已經切斷。我們第一步該先排查什麼？',
      '首先，讓冷卻液幫浦把加工艙排空。接著檢查車刀是不是在工件內部斷裂了。',
      '了解。在打開安全防護門之前，我會先卸除氣壓供應管線。'
    ],
    notes: [
      'CNC lathe（電腦數值控制車床）；emit smoke（冒煙）。',
      'emergency stop button (E-stop)（緊急停止按鈕）。',
      'Power is killed.（電源已切斷）；troubleshoot（排查故障）。',
      'coolant pump（冷卻液幫浦）；workpiece（加工工件）。',
      'pneumatic /nuːˈmæt.ɪk/（氣壓式的，注意字首 p 不發音！）；hydraulic 則是液壓式的。'
    ],
    recallPrompt: '設備排障回想：「排查故障」的英文動詞是什麼？「氣壓式的」pneumatic 哪個字母不發音？',
    recallAnswer: '排查故障是 troubleshoot；pneumatic 字首的 p 不發音。'
  },
  v4: {
    scenario: '判讀液壓幫浦爆炸圖與扭力規範：核對 O 型環密封墊位置，並依對角順序鎖緊六角螺栓至指定牛頓米。',
    keyPatterns: ['exploded view diagram（零件爆炸分解圖）', 'torque to 45 Newton-meters crosswise（依對角順序鎖緊至 45 牛頓米扭力）'],
    zhLines: [
      '仔細看一下這張液壓幫浦總成的零件爆炸分解圖。',
      '我看到 104 號零件是一個位於活塞法蘭正下方的 O 型環油封。',
      '沒錯。如果在重新組裝時漏裝那個油封，高壓液壓油就會噴滿整個機櫃。',
      '請問頂部那四顆六角螺栓的扭力規格是多少？',
      '查看藍圖上的註記欄：依對角交叉順序鎖緊至 45 牛頓米（N·m）。'
    ],
    notes: [
      'exploded view diagram（工程爆炸分解圖）；hydraulic pump assembly（液壓幫浦總成）。',
      'O-ring seal（O 型環密封件）；flange（法蘭／凸緣）。',
      'omit（遺漏、漏裝）；pressurized oil（加壓油）。',
      'torque specification（扭力規格）；hex bolts（六角螺栓）。',
      'crosswise（對角交叉地，鎖螺絲防止法蘭變形的標準工法）。'
    ],
    recallPrompt: '看圖工程回想：「零件爆炸分解圖」與「扭力規格」的英文怎麼說？',
    recallAnswer: 'exploded view diagram 與 torque specification。'
  },
  v5: {
    scenario: '跨國採購電話與出貨確認：台灣精密機械買方向外國供應商確認 500 台伺服驅動器的空運提單號碼。',
    keyPatterns: ['confirm the shipping date（確認出貨日期）', 'ship via air freight（透過空運出貨）', 'air waybill tracking number（空運提單追蹤號碼）'],
    zhLines: [
      '早安，Vance 女士。我是台灣精密機械打來的。',
      '早安，林先生。今天關於貴司的採購單，有什麼我可以協助您的嗎？',
      '我們上週一寄出了五百台伺服驅動器的採購單，能請您確認出貨日期嗎？',
      '我調出貴司的帳戶看一下。有的，驅動器已通過最終出廠品管，將於週四透過空運出貨。',
      '太棒了！班機起飛後，請立即把空運提單追蹤號碼用 Email 寄給我們。'
    ],
    notes: [
      '電話商務自報家門：I am calling from + 公司名稱。',
      'purchase order (PO)（正式採購訂單）。',
      'servo drives（伺服驅動器）；confirm the shipping date（確認出貨日）。',
      'pull up your account（在電腦調出您的帳戶資料）；final factory QA（出廠最終品管）。',
      'air waybill (AWB)（空運提單）。'
    ],
    recallPrompt: '商務採購回想：打電話給廠商時，「能請您確認我們採購單的出貨日期嗎？」英文怎麼說？',
    recallAnswer: 'Could you confirm the shipping date for our purchase order?'
  },
  v6: {
    scenario: '統測專業英文（二）摘要寫作指導：從智慧工廠物聯網文章中提煉「由事後搶修轉向預測性維護」的核心主旨。',
    keyPatterns: ['leverage Internet of Things (IoT) sensors（運用物聯網感測器）', 'shift from reactive repairs to predictive maintenance（從被動搶修轉向預測性維護）'],
    zhLines: [
      '在今天的統測專業英文（二）模擬考中，我們來分析這道摘要寫作題。',
      '這篇文章描述智慧工廠如何運用物聯網（IoT）感測器。',
      '那麼在你的 50 字摘要中，必須寫出來的作者核心主旨是什麼？',
      '即時數據遙測技術讓工廠能從「故障後被動搶修」轉型為「事前預測性維護」。',
      '完美濃縮！用你自己的話把這個核心邏輯寫出來，保證能拿到最高分。'
    ],
    notes: [
      'summary prompt（摘要寫作題目）。',
      'leverage（善用、發揮……的槓桿效益）。',
      'primary thesis（核心主旨）。',
      '工業 4.0 核心對比：reactive repairs（壞了才修的被動維修）vs. predictive maintenance（預測性維護）。',
      'encapsulation（精準概括濃縮）。'
    ],
    recallPrompt: '科技閱讀回想：「從被動維修轉向預測性維護」的英文片語怎麼說？',
    recallAnswer: 'shift from reactive repairs to predictive maintenance.'
  },
  v7: {
    scenario: '台北與法蘭克福跨國工程連線：完成現場驗收測試 (SAT) 與 24 小時耐久壓力測試後，簽署最終移交議定書。',
    keyPatterns: ['Site Acceptance Test (SAT)（客戶現場驗收測試）', 'sign off on the handover protocol（簽署設備移交議定書）'],
    zhLines: [
      '法蘭克福與台北的各位同仁晚安，我們開始最終試車驗收簽核會議吧。',
      '嗨 Frank，我們審閱了今早寄來的現場驗收測試 (SAT) 數據，所有自動化軸向皆達到速度基準。',
      '在 24 小時連續耐久壓力測試期間，有發現任何不符合規範的異常嗎？',
      '完全沒有！光學對位精度始終維持在 0.005 毫米以內。我們準備好簽署移交議定書了。',
      '太棒的好消息！我們會在午夜前完成保固文件定稿並傳送簽署副本。'
    ],
    notes: [
      'commissioning（設備試車與投產驗收）。',
      'Site Acceptance Test (SAT)（機台運抵客戶工廠後的現場驗收測試）。',
      'non-conformities（不合規項目／異常缺失）；endurance stress run（耐久壓力測試）。',
      'None whatsoever.（完全沒有任何問題，語氣非常篤定）；handover protocol（移交議定書）。',
      'warranty documentation（保固文件）。'
    ],
    recallPrompt: '跨國專案回想：「我們準備好簽署移交議定書了」英文怎麼說？',
    recallAnswer: 'We are ready to sign off on the handover protocol.'
  },
  gept: {
    scenario: '全民英檢 GEPT 中高級口試實戰：回答「行動科技對日常學習的優點」以及「過度依賴自動翻譯的潛在缺點」。',
    keyPatterns: ['In terms of ..., mobile applications enable ...（就……而言，行動應用程式能讓……）', 'undermine one’s capacity to ... independently（削弱個人獨立……的能力）'],
    zhLines: [
      '早安。請說明現代科技如何影響你的日常學習習慣？',
      '早安。就字彙吸收而言，行動應用程式讓我們能隨時隨地進行間隔重複複習。',
      '那麼過度依賴自動翻譯工具，會有什麼潛在的缺點呢？',
      '這可能會削弱學習者獨立組織道地英文句型的能力。',
      '表達得非常清晰有條理，非常謝謝你。'
    ],
    notes: [
      'GEPT 口試高分秘訣：第一句先用 In terms of...（就……層面而言）錨定主題。',
      'spaced repetition（間隔重複記憶法）；acquisition（語言習得）。',
      'potential drawback（潛在缺點 = disadvantage / downside）。',
      '高分動詞：undermine（暗中削弱、損害）；formulate idiomatic structures（構思道地句型）。',
      'Well articulated.（表達得非常清楚流暢。）'
    ],
    recallPrompt: '英檢口說回想：要表達「這可能會削弱我們獨立造句的能力」，可以用哪個高分動詞代替 weaken？',
    recallAnswer: '可以用 undermine（It may undermine our capacity to formulate sentences independently）。'
  },
  toeic: {
    scenario: 'TOEIC 多益商務辦公室對話：經理與採購協調員確認新型包裝耗材的發票、交貨保證與物流追蹤。',
    keyPatterns: ['confirm delivery for ...（確認……的交貨）', 'submit the paperwork to accounting for reimbursement（將單據送交會計部申請核銷）', 'Keep me posted on ...（隨時向我回報……的最新進度）'],
    zhLines: [
      '哈囉 Jason，供應商確認新款包裝材料的交貨時間了嗎？',
      '確認了，Vance 女士。他們寄來了更新後的發票，並保證下週三前交貨。',
      '太好了。請把相關單據送交會計部辦理採購核銷。',
      '馬上辦！我明天早上也會繼續追蹤貨件的物流單號。',
      '謝謝你。如果有任何物流延誤，請隨時向我回報。'
    ],
    notes: [
      'supplier（供應商）；packaging units（包裝組件）。',
      'invoice（商用發票／請款單）；guarantee delivery by + 時間（保證在……前交貨）。',
      '多益超高頻字：reimbursement /ˌriː.ɪmˈbɝːs.mənt/（費用核銷、報帳補償）。',
      'Will do!（沒問題，馬上辦！是職場最幹練的口語回應）；follow up on（持續追蹤）。',
      'Keep me posted on... = Keep me updated on...（隨時讓我知道……的最新狀況）。'
    ],
    recallPrompt: '多益職場回想：主管說 Please submit the paperwork時，最簡潔道地的英文回答是什麼？「隨時向我回報最新狀況」怎麼說？',
    recallAnswer: '回答「馬上辦」可說 Will do!；「隨時向我回報」是 Keep me posted!'
  },
  sat: {
    scenario: 'Digital SAT 閱讀證據題解析：為何當土壤樣本與火山假說矛盾時，選項中的 undermine 是唯一正解。',
    keyPatterns: ['contradict the conventional hypothesis（與傳統假說相矛盾）', 'undermine the credibility of ...（削弱……的可信度）'],
    zhLines: [
      '我們來看看 Digital SAT 第二模組的第 14 題。為什麼選項 C 是唯一站得住腳的答案？',
      '因為文章指出，最新的土壤樣本與傳統的火山成因假說互相矛盾。',
      '那麼選項 C 裡面的哪一個單字精準捕捉到了這個「矛盾與削弱」的關係？',
      '是「Undermine（削弱／動搖）」！它的意思是削弱先前推測的可信度。',
      '完全正確！在 SAT 資訊與觀念題中，選項字彙與文本證據的精準對齊就是致勝關鍵。'
    ],
    notes: [
      'defensible choice（站得住腳、有文本證據支持的選項）。',
      'contradict（與……矛盾、反駁）；hypothesis（科學假說）。',
      'capture（精準捕捉、表達出）。',
      'SAT 閱讀第一高頻字：undermine（削弱、動搖論點根基）；conjecture（推測）。',
      'textual evidence（文本證據）。'
    ],
    recallPrompt: 'SAT 核心詞回想：當新證據「反駁或削弱」舊假說時，SAT 最愛考哪兩個動詞？',
    recallAnswer: 'contradict（與……矛盾）與 undermine（削弱、動搖）。'
  },
  gre: {
    scenario: 'GRE Text Completion 破題實戰：利用讓步連接詞 Although 抓出「無私利他 (altruistic)」與「自私圖利 (self-interested / mercenary)」的反義極性。',
    keyPatterns: [
      'Although + 正向形容詞 (altruistic), ... + 反向空格 (mercenary)（轉折反義公式）',
      'reveal an agenda that is unquestionably ...（揭露出毫無疑問是……的企圖）'
    ],
    zhLines: [
      '請分析這道 GRE 填空句：「雖然該參議員宣稱她的動機完全是無私利他的（altruistic），但她的投票紀錄卻揭露了毫無疑問是________的企圖。」',
      '關鍵轉折詞是「Although（雖然）」，它在「altruistic（利他的）」與空格之間建立了相反對比！',
      '太好了。那麼哪一個帶有「負面或自私圖利」語意的單字適合填入空格？',
      '「Self-interested（自私自利的）」或「mercenary（唯利是圖的）」！',
      '非常精確！掌握轉折連接詞的方向極性，正是 GRE Verbal 語意推理的基石。'
    ],
    notes: [
      'altruistic /ˌæl.truˈɪs.tɪk/（無私利他的，字根 alter = other 他人）；agenda（背後真正的意圖／議程）。',
      'pivot word（決定句子語意轉向的樞紐轉折詞）。',
      'self-serving（自私自利的）。',
      'mercenary /ˈmɝː.sə.ner.i/（作形容詞指「唯利是圖的、見錢眼開的」）。',
      'directional polarity（語意正負方向極性）。'
    ],
    recallPrompt: 'GRE 詞彙回想：altruistic（無私利他的）在 GRE 中常見的反義詞有哪些？',
    recallAnswer: 'self-interested、self-serving 或 mercenary（唯利是圖的）。'
  },
  gmat: {
    scenario: 'GMAT Critical Reasoning 商業論證拆解：揭穿「降價必然提升市占率與淨利」背後的單位成本假設與競爭者報復盲點。',
    keyPatterns: ['flawed assumption in the reasoning（推理中的錯誤隱藏假設）', 'overlook competitor retaliation（忽略了競爭對手的報復性反擊）'],
    zhLines: [
      '客戶主張：調降產品售價必然會同時提升市場占有率與公司淨利。',
      '他們的推理中藏著什麼樣的錯誤假設呢？',
      '他們假設即使產量急速擴張，每單位的生產成本依然能維持不變。',
      '而且他們也忽略了「競爭對手反擊」：敵對廠商可能會發動激烈的價格戰！',
      '完全正確！精準揪出這些未明說的隱藏假設，正是我們在 GMAT 批判推理中瓦解漏洞論證的方法。'
    ],
    notes: [
      'market share（市場占有率）；net profits（淨利＝總營收減去總成本）。',
      'flawed assumption（有漏洞的隱藏假設）。',
      'per unit（每單位）；scale rapidly（快速擴大規模）。',
      'retaliation（報復、反擊）；initiate an aggressive price war（發動激烈價格戰）。',
      'unstated assumptions（未明言的前提假設）；dismantle（拆解、瓦解）。'
    ],
    recallPrompt: 'GMAT 商業邏輯回想：為什麼「降價增加銷量」不一定能「增加淨利 (net profits)」？',
    recallAnswer: 'Because unit production costs might rise or competitors might retaliate with a price war, shrinking profit margins.'
  },
  toefl: {
    scenario: 'TOEFL iBT Academic Discussion 學術討論寫作與口說：針對「城市是否應補貼電動大眾運輸」提出財政預算重分配與綠色債券解方。',
    keyPatterns: ['subsidize electric public transit（補貼電動大眾運輸）', 'lower the barrier to adoption（降低採用門檻）', 'leverage green municipal bonds（發行市政綠色債券籌資）'],
    zhLines: [
      '歡迎來到我們的線上學術討論版。今天的議題是：城市是否應該補貼電動大眾運輸以對抗碳排放？',
      '教授，我強烈支持這項措施。政府補貼能降低民眾搭乘門檻，同時減少道路車輛壅塞。',
      '很有意思的觀點。但市政當局要如何在不調漲所得稅的前提下，籌措初期的龐大資本支出呢？',
      '市政府可以重新分配高速公路拓寬預算，並發行「市政綠色債券」來支應前期的基礎建設成本。',
      '非常周密且具體的財政解決方案，表現得很好！'
    ],
    notes: [
      'subsidize /ˈsʌb.sə.daɪz/（政府予以財政補貼）；combat emissions（對抗碳排放）。',
      'lower the barrier to adoption（降低採用門檻）；vehicular congestion（車輛交通壅塞）。',
      'municipal authorities（市政當局）；capital expenditure（資本支出）。',
      'reallocate budgets（重新分配預算）；upfront infrastructure costs（前期基礎建設成本）。',
      'fiscal solution（財政解決方案）。'
    ],
    recallPrompt: '托福學術回想：怎麼用英文表達「補貼能降低採用門檻，並減少交通壅塞」？',
    recallAnswer: 'Subsidies lower the barrier to adoption and reduce vehicular congestion.'
  }
};

// 自動為課綱單元產生精準的會話教學解析與句型提示
function inferLineTeachingNote(en, zh, unitTitle) {
  const s = String(en || '');
  if (/Could you|Would you|Can I|May I/i.test(s)) return '禮貌請求與詢問句型：用助動詞 Could / Would / Can 開頭，語氣自然得體，尾音可微揚表客氣。';
  if (/How much|How many|How long|What time|Where|When|Why/i.test(s)) return 'Wh- 特殊疑問句：聽力時務必抓準第一個疑問詞（時間／地點／數量／原因），句尾語調自然下沉 (↘)。';
  if (/already|yet|ever|since|for .* years|have [a-z]+ed|has [a-z]+ed/i.test(s)) return '完成式語境應用：連接過去動作與現在的結果或持續狀態，注意助動詞 have/has 常弱讀。';
  if (/although|unless|if |because|so that|while/i.test(s)) return '複句邏輯連接：注意連接詞引導的條件、原因或讓步轉折，前後兩個子句主詞動詞須完整。';
  if (/going to|will |plan to|schedule/i.test(s)) return '未來計畫與行動表達：清楚傳達接下來的安排或承諾，口語中 going to 常連讀。';
  return `對應「${String(unitTitle || '').split('(')[0].trim()}」核心情境句：建議先盲聽抓關鍵實詞（名詞與動詞），再開口跟讀模仿語調。`;
}

export const COMMUTE_FEATURED_DIALOGUES = reviseFeaturedDialogues(ORIGINAL_FEATURED_DIALOGUES);

function buildAllCommuteDialogues() {
  const list = [...COMMUTE_FEATURED_DIALOGUES, ...NEW_CONVERSATION_SCENARIOS];

  // 整合 27 組核心教學章節會話 (`curriculum.mjs`)
  const stageMap = { jhs: '國中', sh: '高中', voc: '高工', intl: '國際考試' };
  for (const t of curriculum) {
    const stg = stageMap[t.id] || '高中';
    for (const c of t.chapters) {
      if (!c.dialogue || !c.dialogue.length) continue;
      const enrich = CHAPTER_DIALOGUE_ENRICHMENTS[c.id] || {};
      const lines = c.dialogue.map((d, idx) => ({
        speaker: d.speaker,
        en: d.text || d.en || '',
        zh: d.zh || (enrich.zhLines && enrich.zhLines[idx]) || '（請聽美式英文示範，體會上下文語境與句構關係）',
        note: d.note || (enrich.notes && enrich.notes[idx]) || inferLineTeachingNote(d.text || d.en, d.zh, c.title)
      }));
      list.push({
        id: `chapter:${t.id}:${c.id}`,
        stage: stg,
        topicTag: `${stg}章節 · ${c.num || c.id.toUpperCase()}`,
        level: c.cefr || 'A2~B2',
        title: `${c.title}（情境實戰會話）`,
        scenario: enrich.scenario || c.learningPerformance || `將「${c.title}」的核心語法與字彙放回真實雙人對話中演練。`,
        keyPatterns: enrich.keyPatterns || (c.phrases || []).slice(0, 3).map(p => `${p.phrase}（${p.def}）`),
        lines,
        recallPrompt: enrich.recallPrompt || `回想看看：請不看字幕，用自己的話說出本段「${c.title}」會話中的任意一個關鍵英文句子！`,
        recallAnswer: enrich.recallAnswer || (lines[0] ? `${lines[0].en} — ${lines[0].zh}` : ''),
        sourceLink: `#chapter/${t.id}/${c.id}`
      });
    }
  }

  // 整合 61 組 108 課綱學年單元會話 (`curriculum_unified.mjs`)
  for (const g of UNIFIED_GRADES) {
    const stg = /^g[1-6]$/.test(g.gradeId) ? '國小' : ['g7', 'g8', 'g9'].includes(g.gradeId) ? '國中' : '高中';
    for (const sem of g.semesters) {
      for (const u of sem.units) {
        if (!u.dialogue || !u.dialogue.length) continue;
        const cleanTitle = String(u.title || '').replace(/\s*\([^)]*\)/g, '').trim();
        const patterns = (u.concepts || []).slice(0, 2).map(c => `${c.title}：${c.example || c.formula || ''}`).filter(Boolean);
        const lines = u.dialogue.map(d => ({
          speaker: String(d.speaker || 'Speaker').replace(/^[^\w\u3400-\u9fff]+\s*/, ''),
          en: d.en || d.text || '',
          zh: d.zh || '',
          note: d.note || inferLineTeachingNote(d.en || d.text, d.zh, cleanTitle)
        }));
        const keyPatterns = [...patterns];
        if (keyPatterns.length < 2 && lines[0]?.en) keyPatterns.push(`${lines[0].en}（${lines[0].zh || '問句'}）`);
        if (keyPatterns.length < 2 && lines[1]?.en) keyPatterns.push(`${lines[1].en}（${lines[1].zh || '答句'}）`);
        if (keyPatterns.length < 2) keyPatterns.push('核心生活問對句型');
        list.push({
          id: `unit:${u.id}`,
          stage: stg,
          topicTag: `${g.gradeId.toUpperCase()} 課綱單元`,
          level: u.cefr || 'A1~B2',
          title: `${cleanTitle}（生活教學會話）`,
          scenario: u.motivation || `結合「${cleanTitle}」核心句型與高頻單字的生活情境應對。`,
          keyPatterns,
          lines,
          recallPrompt: `通勤回想：如果有人對你說「${lines[0]?.en || ''}」，你會怎麼用英文接下一句？`,
          recallAnswer: lines[1] ? `${lines[1].en}（${lines[1].zh}）` : (lines[0]?.en || ''),
          sourceLink: `#unit/${u.id}`
        });
      }
    }
  }

  for(const d of list) {
    const revised = d.id.startsWith('unit:') ? UNIT_DIALOGUE_REVISIONS[d.id.slice(5)] : d.id.startsWith('chapter:') ? CHAPTER_DIALOGUE_REVISIONS[d.id.slice(8)] : FEATURED_LINE_REVISIONS[d.id];
    if(revised) {
      d.keyPatterns = d.lines.slice(0,2).map(l=>`${l.en}（${l.zh}）`);
      d.recallPrompt = '先不看字幕，用自己的資訊改寫本段的一問一答，再跟讀核對。';
      d.recallAnswer = d.lines.slice(0,2).map(l=>l.en).join(' ');
      if(d.id.startsWith('unit:')) d.scenario = '把本課主題用在一問一答中：'+d.title.replace(/（[^）]*）/g,'')+'。先聽懂雙方目的，再換成自己的資訊練習。';
    }
  }
  return list;
}

export const ALL_COMMUTE_DIALOGUES = buildAllCommuteDialogues();

// 狀態管理與本機儲存
const STORAGE_KEY = 'eq-commute-dialogue-studio-v1';
let state = {
  category: 'featured',
  search: '',
  selectedId: COMMUTE_FEATURED_DIALOGUES[0].id,
  playMode: 'teaching', // 'teaching' | 'bilingual' | 'shadowing' | 'blind_en'
  rolePlay: 'off', // 'off' | 'speakerB' | 'speakerA'
  autoAdvance: true,
  loopSingle: false,
  blindMask: false,
  rate: 1,
  shadowGap: 3,
  completedIds: [],
  favoriteIds: [],
  resumeLine: 0
};

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (saved && typeof saved === 'object') {
    state = { ...state, ...saved };
    if (!COMMUTE_CATEGORIES.some(c => c.id === state.category)) state.category = 'featured';
    if (!COMMUTE_PLAY_MODES.some(m => m.id === state.playMode)) state.playMode = 'teaching';
    if (!ALL_COMMUTE_DIALOGUES.some(d => d.id === state.selectedId)) state.selectedId = COMMUTE_FEATURED_DIALOGUES[0].id;
    if (!Array.isArray(state.completedIds)) state.completedIds = [];
    if (!Array.isArray(state.favoriteIds)) state.favoriteIds = [];
  }
} catch {}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      resumeLine: state.resumeLine,
      category: state.category,
      selectedId: state.selectedId,
      playMode: state.playMode,
      rolePlay: state.rolePlay,
      autoAdvance: state.autoAdvance,
      loopSingle: state.loopSingle,
      blindMask: state.blindMask,
      rate: state.rate,
      shadowGap: state.shadowGap,
      completedIds: state.completedIds,
      favoriteIds: state.favoriteIds
    }));
  } catch {}
}

// 播放執行期狀態
let isPlaying = false;
let activeLineIndex = -1; // -2: 導讀, 0..N-1: 對話句, N: 回想提問
let activePhaseLabel = '準備就緒，點選「▶ 立即播放」或任一情境卡即可邊走邊聽。';
let playToken = 0;
let playTimer = null;
let revealedLines = new Set();
let showRecallAnswer = false;
let externalRerender = null;

export function getFilteredCommuteDialogues(cat = state.category, query = state.search) {
  let list = cat === 'all'
    ? ALL_COMMUTE_DIALOGUES
    : ALL_COMMUTE_DIALOGUES.filter(d => d.stage === cat);
  const q = String(query || '').trim().toLowerCase();
  if (q) {
    list = list.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.scenario.toLowerCase().includes(q) ||
      d.topicTag.toLowerCase().includes(q) ||
      d.lines.some(l => l.en.toLowerCase().includes(q) || l.zh.includes(q))
    );
  }
  return list;
}

export function getActiveCommuteDialogue() {
  const filtered = getFilteredCommuteDialogues();
  const found = filtered.find(d => d.id === state.selectedId) || ALL_COMMUTE_DIALOGUES.find(d => d.id === state.selectedId) || filtered[0] || ALL_COMMUTE_DIALOGUES[0];
  if (found) state.selectedId = found.id;
  return found;
}

export function stopCommuteDialogue(clearMessage = false) {
  playToken++;
  if (playTimer) {
    clearTimeout(playTimer);
    playTimer = null;
  }
  isPlaying = false;
  activeLineIndex = -1;
  stopAudio();
  if (clearMessage) {
    activePhaseLabel = '已停止播放。可隨時點擊任一句子或按播放繼續。';
  }
  refreshCommuteDom();
}

function refreshCommuteDom() {
  if (typeof document === 'undefined') return;
  const statusEl = document.querySelector('[data-commute-status]');
  if (statusEl) statusEl.textContent = activePhaseLabel;

  document.querySelectorAll('[data-commute-line-idx]').forEach(el => {
    const idx = Number(el.dataset.commuteLineIdx);
    el.classList.toggle('is-active-line', isPlaying && idx === activeLineIndex);
  });

  document.querySelectorAll('[data-cd-action="toggle-play"]').forEach(btn => {
    btn.textContent = isPlaying ? '⏸ 暫停會話' : '▶ 立即播放本篇會話';
    btn.classList.toggle('is-playing', isPlaying);
  });
}

export function speakingGapMs(text, minimum = 3, rate = 1) {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length;
  return Math.min(30000, Math.max(3000, (Number(minimum) || 3) * 1000, Math.ceil(words / (2 * Math.max(.5, Number(rate) || 1)) * 1000) + 1500));
}

function buildStepsForDialogue(dlg, startFromLine = 0) {
  const steps = [];
  const mode = state.playMode;
  const enRate = state.rate;
  const speakers = [...new Set(dlg.lines.map(l=>l.speaker))];
  const slowRate = Math.max(0.68, +(state.rate * 0.84).toFixed(2));
  const zhRate = Math.min(1.15, +(state.rate * 1.02).toFixed(2));

  // 若從頭播放且為教學精講模式，先加入簡短情境導讀
  if (startFromLine === 0 && mode === 'teaching') {
    steps.push({
      lineIdx: -2,
      phase: '🎧 情境導讀：' + dlg.title,
      text: `通勤教學會話：${dlg.title.replace(/（[^）]*）/g, '')}。情境：${dlg.scenario}`,
      lang: 'zh-TW',
      rate: zhRate,
      pauseMs: 450
    });
  }

  for (let i = Math.max(0, startFromLine); i < dlg.lines.length; i++) {
    const line = dlg.lines[i];
    const roleIndex = speakers.indexOf(line.speaker) % 2;
    const isMutedRole = (state.rolePlay === 'speakerB' && roleIndex === 1) || (state.rolePlay === 'speakerA' && roleIndex === 0);

    if (isMutedRole) {
      steps.push({
        lineIdx: i,
        phase: `🎤 輪你扮演 ${line.speaker} 開口接話！（提示：${line.zh}）`,
        text: `輪你扮演 ${line.speaker}。提示：${line.zh}`,
        lang: 'zh-TW',
        rate: zhRate,
        pauseMs: speakingGapMs(line.en, state.shadowGap, enRate)
      });
      steps.push({
        lineIdx: i,
        phase: `🔊 示範核對（${line.speaker}）：${line.en}`,
        text: line.en,
        lang: 'en-US',
        rate: enRate,
        pauseMs: 650
      });
      continue;
    }

    if (mode === 'retrieval') {
      steps.push({lineIdx:i, phase:`🧠 第 ${i + 1}/${dlg.lines.length} 句：聽中文後自己說英文`, text:`請用英文表達：${line.zh}`, lang:'zh-TW', rate:zhRate, pauseMs:speakingGapMs(line.en,state.shadowGap,enRate)});
      steps.push({lineIdx:i, phase:`🔎 第 ${i + 1}/${dlg.lines.length} 句：核對意思與用法，不必逐字相同`, text:line.en, lang:'en-US', rate:enRate, pauseMs:650});
    } else if (mode === 'bilingual') {
      steps.push({
        lineIdx: i,
        phase: `🗣️ 第 ${i + 1}/${dlg.lines.length} 句（${line.speaker}）美式英文示範`,
        text: line.en,
        lang: 'en-US',
        rate: enRate,
        pauseMs: 350
      });
      if (line.zh) {
        steps.push({
          lineIdx: i,
          phase: `🇹🇼 第 ${i + 1}/${dlg.lines.length} 句中文意思`,
          text: line.zh,
          lang: 'zh-TW',
          rate: zhRate,
          pauseMs: 500
        });
      }
    } else if (mode === 'shadowing') {
      steps.push({
        lineIdx: i,
        phase: `🐢 第 ${i + 1}/${dlg.lines.length} 句慢速示範（仔細聽連音與重音）`,
        text: line.en,
        lang: 'en-US',
        rate: slowRate,
        pauseMs: speakingGapMs(line.en, state.shadowGap, enRate)
      });
      steps.push({
        lineIdx: i,
        phase: `🎤 留白跟讀後 ➔ 原速英文確認（${line.speaker}）`,
        text: line.en,
        lang: 'en-US',
        rate: enRate,
        pauseMs: 400
      });
      if (line.zh) {
        steps.push({
          lineIdx: i,
          phase: `🇹🇼 中文意思確認：${line.zh}`,
          text: line.zh,
          lang: 'zh-TW',
          rate: zhRate,
          pauseMs: 650
        });
      }
    } else if (mode === 'blind_en') {
      steps.push({
        lineIdx: i,
        phase: `🎧 純英盲聽第 ${i + 1}/${dlg.lines.length} 句（${line.speaker}）— 在腦中直接描繪畫面`,
        text: line.en,
        lang: 'en-US',
        rate: enRate,
        pauseMs: 1100
      });
    } else {
      // 'teaching' 教學精講模式
      steps.push({
        lineIdx: i,
        phase: `🗣️ 第 ${i + 1}/${dlg.lines.length} 句美式英文示範（${line.speaker}）`,
        text: line.en,
        lang: 'en-US',
        rate: enRate,
        pauseMs: 400
      });
      if (line.zh) {
        steps.push({
          lineIdx: i,
          phase: `🇹🇼 中文對照：${line.zh}`,
          text: line.zh,
          lang: 'zh-TW',
          rate: zhRate,
          pauseMs: 350
        });
      }
      if (line.note) {
        steps.push({
          lineIdx: i,
          phase: `💡 教學解析：${line.note}`,
          text: line.note,
          lang: 'zh-TW',
          rate: zhRate,
          pauseMs: 600
        });
      }
    }
  }

  // 結尾加入主動回想提問與示範解答
  if (dlg.recallPrompt && ['teaching','shadowing','retrieval'].includes(mode)) {
    steps.push({
      lineIdx: dlg.lines.length,
      phase: `🧠 換情境回想：先開口，再聽參考回答`,
      text: dlg.recallPrompt,
      lang: 'zh-TW',
      rate: zhRate,
      pauseMs: speakingGapMs(dlg.recallAnswer || '', Math.max(8,state.shadowGap), enRate)
    });
    if (dlg.recallAnswer) {
      const enPart = dlg.recallAnswer.split('（')[0].trim();
      steps.push({
        lineIdx: dlg.lines.length,
        phase: `✨ 示範解答：${dlg.recallAnswer}`,
        text: enPart,
        lang: /[\u3400-\u9fff]/.test(enPart) ? 'zh-TW' : 'en-US',
        rate: enRate,
        pauseMs: 900
      });
    }
  }

  for(const step of steps) { if(step.lang==='en-US') {step.voiceRole=Math.max(0,speakers.indexOf(dlg.lines[step.lineIdx]?.speaker))%2; if(step.pauseMs===1100)step.pauseMs=480;} }
  return steps;
}

export function startCommuteDialogue(dialogueId = state.selectedId, startLine = 0, singleLineOnly = false, rerender = externalRerender) {
  if (rerender) externalRerender = rerender;
  const target = ALL_COMMUTE_DIALOGUES.find(d => d.id === dialogueId) || getActiveCommuteDialogue();
  if (!target) return false;

  stopCommuteDialogue(false);
  state.selectedId = target.id;
  state.resumeLine = Math.max(0, Math.min(target.lines.length - 1, Number(startLine) || 0));
  persistState();

  isPlaying = true;
  const myToken = ++playToken;

  if (singleLineOnly && target.lines[startLine]) {
    const line = target.lines[startLine];
    activeLineIndex = startLine;
    activePhaseLabel = `🔊 單句朗讀（${line.speaker}）：${line.en}`;
    if (externalRerender) externalRerender();
    else refreshCommuteDom();

    speak(line.en, {
      lang: 'en-US',
      requireAmerican: true,
      voiceRole: Math.max(0,[...new Set(target.lines.map(l=>l.speaker))].indexOf(line.speaker))%2,
      chunkLimit: 240,
      rate: state.rate,
      onEnd: () => {
        if (myToken !== playToken) return;
        if (state.playMode !== 'blind_en' && line.zh) {
          playTimer = setTimeout(() => {
            if (myToken !== playToken) return;
            activePhaseLabel = `🇹🇼 中文意思：${line.zh}`;
            refreshCommuteDom();
            speak(line.zh, {
              lang: 'zh-TW',
              rate: state.rate,
              onEnd: () => {
                if (myToken !== playToken) return;
                isPlaying = false;
                activeLineIndex = -1;
                activePhaseLabel = `已播完第 ${startLine + 1} 句。點「▶ 立即播放本篇會話」可連播整篇。`;
                if (externalRerender) externalRerender();
                else refreshCommuteDom();
              },
              onError: () => stopCommuteDialogue(true)
            });
          }, 300);
        } else {
          isPlaying = false;
          activeLineIndex = -1;
          activePhaseLabel = `已播完第 ${startLine + 1} 句。`;
          if (externalRerender) externalRerender();
          else refreshCommuteDom();
        }
      },
      onError: error => {
        if (myToken !== playToken) return;
        isPlaying = false;
        activeLineIndex = -1;
        activePhaseLabel = error?.message || '語音未完整播放，請重試或更換聲音。';
        if (externalRerender) externalRerender();
        else refreshCommuteDom();
      }
    });
    return true;
  }

  const steps = buildStepsForDialogue(target, startLine);
  let stepIdx = 0;

  function runNextStep() {
    if (!isPlaying || myToken !== playToken) return;
    if (stepIdx >= steps.length) {
      state.resumeLine = 0;
      persistState();
      if (!state.completedIds.includes(target.id)) {
        state.completedIds.push(target.id);
        persistState();
      }
      if (state.loopSingle) {
        activePhaseLabel = `🔂 單篇循環中：重新播放「${target.title}」`;
        refreshCommuteDom();
        playTimer = setTimeout(() => {
          if (myToken !== playToken || !isPlaying) return;
          startCommuteDialogue(target.id, 0, false, externalRerender);
        }, 1000);
        return;
      }
      if (state.autoAdvance) {
        const list = getFilteredCommuteDialogues();
        const curPos = list.findIndex(d => d.id === target.id);
        const nextDlg = curPos >= 0 && curPos + 1 < list.length ? list[curPos + 1] : list[0];
        if (nextDlg && nextDlg.id !== target.id) {
          activePhaseLabel = `📻 通勤電台自動接續下一篇：${nextDlg.title}`;
          refreshCommuteDom();
          playTimer = setTimeout(() => {
            if (myToken !== playToken || !isPlaying) return;
            startCommuteDialogue(nextDlg.id, 0, false, externalRerender);
          }, 1200);
          return;
        }
      }
      isPlaying = false;
      activeLineIndex = -1;
      activePhaseLabel = `🎉 已完成本篇會話！可試著不看文字回答下方的「通勤口頭回想挑戰」。`;
      if (externalRerender) externalRerender();
      else refreshCommuteDom();
      return;
    }

    const step = steps[stepIdx];
    activeLineIndex = step.lineIdx;
    if (Number.isInteger(step.lineIdx) && step.lineIdx >= 0 && step.lineIdx < target.lines.length) { state.resumeLine = step.lineIdx; persistState(); }
    activePhaseLabel = step.phase;
    if (stepIdx === 0 && externalRerender) externalRerender();
    else refreshCommuteDom();

    speak(step.text, {
      lang: step.lang,
      requireAmerican: step.lang==='en-US',
      voiceRole: step.voiceRole || 0,
      chunkLimit: 240,
      rate: step.rate,
      onEnd: () => {
        if (!isPlaying || myToken !== playToken) return;
        if (step.pauseMs >= 3000) {
          activePhaseLabel = `🎤 輪你開口 · 約 ${Math.round(step.pauseMs / 1000)} 秒；說不完可停止後接續本句。`;
          refreshCommuteDom();
        }
        stepIdx++;
        playTimer = setTimeout(runNextStep, step.pauseMs || 450);
      },
      onError: error => {
        if (myToken !== playToken) return;
        isPlaying = false;
        activePhaseLabel = error?.message || '語音中斷或裝置不支援，已保留目前進度。請按播放重試。';
        if (externalRerender) externalRerender();
        else refreshCommuteDom();
      }
    });
  }

  runNextStep();
  return true;
}

// 首頁與閃卡快選抽屜共用的「一鍵即播通勤教學會話」卡片
export function renderCommuteQuickPlayStrip() {
  const quickPills = [
    { id: 'commute-daily-01', label: '☕ 買咖啡客製點餐' },
    { id: 'commute-daily-02', label: '🚇 捷運月台問路轉乘' },
    { id: 'commute-travel-01', label: '✈️ 機場海關入境問答' },
    { id: 'commute-work-01', label: '💼 多益跨國視訊會議' },
    { id: 'commute-work-02', label: '📦 供應鏈交期協商' },
    { id: 'commute-intl-01', label: '🏛️ 托福校園政策思辨' }
  ];
  return `
    <div class="commute-quick-strip" role="region" aria-label="通勤英語教學會話一鍵即播">
      <div class="commute-quick-strip-head">
        <div>
          <span class="pill" style="background:#dcfce7;color:#166534;font-weight:700">🎧 通勤會話快播 · ${ALL_COMMUTE_DIALOGUES.length} 組情境教學</span>
          <strong>走進捷運或公車，點一下就開始「聽會話＋學句型」</strong>
        </div>
        <a class="btn primary small" href="#listening">開啟通勤會話電台 →</a>
      </div>
      <div class="commute-quick-pills">
        ${quickPills.map(p => `
          <button type="button" class="btn quiet small" data-commute-quick-dialogue="${p.id}">
            ▶ ${esc(p.label)}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// 渲染完整「通勤英語教學會話快播工作台」（用於 #listening 頂部與 #studio）
export function renderCommuteDialogueStudio() {
  const filtered = getFilteredCommuteDialogues();
  const dlg = getActiveCommuteDialogue();
  const curIdx = filtered.findIndex(d => d.id === dlg.id);
  const isFav = state.favoriteIds.includes(dlg.id);
  const isDone = state.completedIds.includes(dlg.id);
  const modeInfo = COMMUTE_PLAY_MODES.find(m => m.id === state.playMode) || COMMUTE_PLAY_MODES[0];

  return `
    <section class="card commute-dialogue-studio" id="commute-dialogue-studio" aria-labelledby="commute-studio-heading">
      <div class="commute-studio-top">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
            <span class="pill" style="background:#059669;color:#ffffff;font-weight:700">📻 通勤英語教學會話電台 · 即點即播</span>
            <span class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700">共 ${ALL_COMMUTE_DIALOGUES.length} 組情境會話</span>
            <span class="pill" style="background:#fef3c7;color:#92400e;font-weight:700">已聽完 ${state.completedIds.length} 組</span>
          </div>
          <h2 id="commute-studio-heading" style="margin:4px 0 6px;font-size:clamp(1.25rem,3vw,1.6rem)">一鍵連播雙語教學會話：聽英文 ➔ 懂句型 ➔ 開口跟讀回想</h2>
          <p style="margin:0;color:var(--text-muted);font-size:14px">
            專為通勤單手操作設計：選擇下方任一分類或情境會話，立即依所選模式連播。支援<strong>自動接續下一篇</strong>、<strong>慢速留白跟讀</strong>與<strong>盲聽字幕遮罩</strong>。
          </p>
        </div>
      </div>

      <!-- 1. 分類快選大按鈕 (Mobile 2-Column / Desktop Grid) -->
      <div class="commute-cat-grid" role="group" aria-label="選擇通勤會話分類">
        ${COMMUTE_CATEGORIES.map(c => {
          const count = c.id === 'all' ? ALL_COMMUTE_DIALOGUES.length : ALL_COMMUTE_DIALOGUES.filter(d => d.stage === c.id).length;
          const active = state.category === c.id;
          return `
            <button type="button" class="commute-cat-btn ${active ? 'active' : ''}" data-cd-category="${esc(c.id)}" aria-pressed="${active}">
              <div class="commute-cat-title">${esc(c.label)} <span>(${count})</span></div>
              <small>${esc(c.sub)}</small>
            </button>
          `;
        }).join('')}
      </div>

      <!-- 2. 四大通勤教學播放模式切換 -->
      <div class="commute-mode-bar" role="group" aria-label="選擇會話教學播放模式">
        ${COMMUTE_PLAY_MODES.map(m => {
          const active = state.playMode === m.id;
          return `
            <button type="button" class="btn ${active ? 'primary' : 'quiet'} commute-mode-btn" data-cd-mode="${m.id}" aria-pressed="${active}" title="${esc(m.desc)}">
              <strong>${esc(m.label)}</strong>
              <small>${esc(m.desc)}</small>
            </button>
          `;
        }).join('')}
      </div>

      <!-- 3. 情境會話快選膠囊與搜尋列 (點選立即載入並播放) -->
      <div class="commute-selector-box">
        <div class="commute-selector-header">
          <label for="commute-dialogue-select" style="font-weight:700;font-size:14px">
            🎯 選擇會話主題（本類共 ${filtered.length} 組 · 點選下方按鈕直接開播）：
          </label>
          <input type="search" id="commute-dialogue-search" value="${esc(state.search)}" placeholder="🔍 搜尋情境（如：咖啡、機場、多益、車床）..." aria-label="搜尋通勤會話關鍵字" style="max-width:260px;padding:7px 12px;border-radius:8px;border:1px solid var(--line);font-size:13px">
        </div>

        <select id="commute-dialogue-select" aria-label="選擇要播放的教學會話">
          ${filtered.map((d, idx) => `
            <option value="${esc(d.id)}" ${d.id === dlg.id ? 'selected' : ''}>
              ${idx + 1}. [${d.topicTag}] ${d.title} (${d.level})
            </option>
          `).join('')}
        </select>

        <div class="commute-pill-scroller" role="group" aria-label="一鍵快播情境會話清單">
          ${filtered.slice(0, 12).map((d, idx) => {
            const isCur = d.id === dlg.id;
            const done = state.completedIds.includes(d.id);
            return `
              <button type="button" class="commute-scene-pill ${isCur ? 'active' : ''}" data-cd-select-play="${esc(d.id)}">
                <span class="scene-pill-tag">${done ? '✓ ' : '▶ '}${esc(d.topicTag)}</span>
                <strong>${esc(d.title.replace(/（[^）]*）/g, ''))}</strong>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 4. 主播放控制台與即時狀態看板 -->
      <div class="commute-player-stage">
        <div class="commute-stage-meta">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span class="pill" style="background:#ecfdf5;color:#047857;font-weight:700">${esc(dlg.topicTag)}</span>
            <span class="pill" style="background:#eff6ff;color:#1d4ed8;font-weight:700">${esc(dlg.level)}</span>
            <span style="font-size:13px;color:var(--text-muted)">第 ${Math.max(1, curIdx + 1)} / ${filtered.length} 篇</span>
            ${isDone ? '<span class="pill" style="background:#dcfce7;color:#15803d;font-weight:700">✓ 已完成聽讀</span>' : ''}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" class="btn quiet small" data-cd-action="toggle-fav" aria-pressed="${isFav}">
              ${isFav ? '★ 已收藏本篇' : '☆ 收藏會話'}
            </button>
            ${dlg.sourceLink ? `<a class="btn quiet small" href="${dlg.sourceLink}">📖 前往完整單元講義 →</a>` : ''}
          </div>
        </div>

        <h3 class="commute-dialogue-title">${esc(dlg.title)}</h3>
        <p class="commute-dialogue-scenario"><strong>📍 情境與學習目標：</strong>${esc(dlg.scenario)}</p>

        <!-- 主控按鈕列 -->
        <div class="commute-main-controls">
          <button type="button" class="btn primary commute-play-hero-btn ${isPlaying ? 'is-playing' : ''}" data-cd-action="toggle-play">
            ${isPlaying ? '⏸ 暫停會話' : '▶ 立即播放本篇會話'}
          </button>
          <button type="button" class="btn quiet" data-cd-action="prev-line">⏮ 上一句</button>
          <button type="button" class="btn quiet" data-cd-action="next-line">⏭ 下一句</button>
          <button type="button" class="btn quiet" data-cd-action="prev-dialogue" ${curIdx <= 0 ? 'disabled' : ''}>⏮ 上一篇會話</button>
          <button type="button" class="btn quiet" data-cd-action="next-dialogue" ${curIdx >= filtered.length - 1 ? 'disabled' : ''}>下一篇會話 ⏭</button>
          <button type="button" class="btn quiet" data-cd-action="stop">⏹ 停止</button>
        </div>

        ${renderAmericanVoiceSettings()}
        <!-- 通勤微調設定列：自動連播、循環、角色扮演、盲聽遮罩、語速 -->
        <div class="commute-sub-controls">
          <button type="button" class="btn small ${state.autoAdvance ? 'primary' : 'quiet'}" data-cd-action="toggle-autoadvance" aria-pressed="${state.autoAdvance}">
            📻 自動連播下一篇：${state.autoAdvance ? '開啟' : '關閉'}
          </button>
          <button type="button" class="btn small ${state.loopSingle ? 'primary' : 'quiet'}" data-cd-action="toggle-loop" aria-pressed="${state.loopSingle}">
            🔂 單篇循環：${state.loopSingle ? '開啟' : '關閉'}
          </button>
          <button type="button" class="btn small ${state.blindMask ? 'primary' : 'quiet'}" data-cd-action="toggle-mask" aria-pressed="${state.blindMask}">
            ${state.blindMask ? '👁️ 顯示全部中文字幕' : '🙈 盲聽遮罩（先聽英文想意思）'}
          </button>
          <button type="button" class="btn small ${state.rolePlay !== 'off' ? 'primary' : 'quiet'}" data-cd-action="cycle-roleplay">
            🎭 角色扮演：${state.rolePlay === 'off' ? '關閉（雙人示範）' : state.rolePlay === 'speakerB' ? '我扮演回應方 (B角)' : '我扮演發起方 (A角)'}
          </button>
          <label class="commute-inline-select">
            語速
            <select data-cd-setting="rate" aria-label="會話播放語速">
              ${[0.75, 0.85, 0.95, 1, 1.05, 1.2].map(r => `<option value="${r}" ${state.rate === r ? 'selected' : ''}>${r}x</option>`).join('')}
            </select>
          </label>
          <label class="commute-inline-select">
            最少留白（長句自動延長，最多 30 秒）
            <select data-cd-setting="shadowGap" aria-label="開口跟讀最少停頓秒數">
              ${[3, 5, 8, 10].map(s => `<option value="${s}" ${Math.max(3,state.shadowGap) === s ? 'selected' : ''}>${s} 秒</option>`).join('')}
            </select>
          </label>
        </div>

        <!-- 即時語音狀態橫幅 -->
        <div class="commute-live-banner" role="status" aria-live="polite">
          <span class="live-dot ${isPlaying ? 'pulsing' : ''}"></span>
          <strong data-commute-status>${esc(activePhaseLabel)}</strong>
          <small style="margin-left:auto;opacity:0.85">當前模式：${esc(modeInfo.short)}</small>
        </div>

        <!-- 必學核心句型塊 (Key Conversational Chunks) -->
        ${dlg.keyPatterns && dlg.keyPatterns.length ? `
          <div class="commute-patterns-box">
            <strong>🔑 本篇必學萬用句型與高頻語塊（點擊直接聽發音）：</strong>
            <div class="commute-pattern-chips">
              ${dlg.keyPatterns.map(pat => {
                const enClean = String(pat).split('（')[0].replace(/\.\.\./g, '').trim();
                return `<button type="button" class="commute-pattern-chip" data-speak-sentence="${esc(enClean)}">🔊 ${esc(pat)}</button>`;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 5. 逐句雙語互動台詞與教學重點卡 -->
        <div class="commute-lines-list" role="list" aria-label="會話逐句互動台詞">
          ${dlg.lines.map((line, idx) => {
            const lineKey = `${dlg.id}:${idx}`;
            const isMasked = state.blindMask && !revealedLines.has(lineKey);
            const isActive = isPlaying && activeLineIndex === idx;
            const isSpeakerB = [...new Set(dlg.lines.map(l=>l.speaker))].indexOf(line.speaker) % 2 === 1;
            return `
              <article class="commute-line-card ${isActive ? 'is-active-line' : ''} ${isSpeakerB ? 'speaker-b' : 'speaker-a'}" data-commute-line-idx="${idx}" role="listitem">
                <div class="commute-line-head">
                  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                    <span class="speaker-badge ${isSpeakerB ? 'badge-b' : 'badge-a'}">${idx + 1}. ${esc(line.speaker)}</span>
                    ${state.rolePlay === 'speakerB' && isSpeakerB ? '<span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">🎤 輪你扮演此角</span>' : ''}
                    ${state.rolePlay === 'speakerA' && !isSpeakerB ? '<span class="pill" style="font-size:11px;background:#fef3c7;color:#92400e">🎤 輪你扮演此角</span>' : ''}
                  </div>
                  <div class="commute-line-actions">
                    <button type="button" class="btn small primary" data-cd-play-line="${idx}" aria-label="單句播放第 ${idx + 1} 句">▶ 聽本句</button>
                    <button type="button" class="btn small quiet" data-speak-sentence="${esc(line.en)}" data-slow="true" aria-label="慢速跟讀第 ${idx + 1} 句">🐢 慢速</button>
                    <button type="button" class="btn small quiet" data-cd-play-from="${idx}" title="從這一句開始往下連播">⏬ 從此連播</button>
                  </div>
                </div>
                <p class="commute-line-en" lang="en">${esc(line.en)}</p>
                ${isMasked ? `
                  <button type="button" class="commute-mask-reveal-btn" data-cd-reveal-line="${esc(lineKey)}">
                    🙈 盲聽思考中：先在心裡想一次中文意思，點擊此處揭曉翻譯與教學重點
                  </button>
                ` : `
                  <p class="commute-line-zh">${esc(line.zh)}</p>
                  ${line.note ? `<div class="commute-line-note">💡 <strong>教學與聽力重點：</strong>${esc(line.note)}</div>` : ''}
                `}
              </article>
            `;
          }).join('')}
        </div>

        <!-- 6. 通勤到站 10 秒口頭回想挑戰 -->
        ${dlg.recallPrompt ? `
          <div class="commute-recall-box">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
              <strong>🧠 通勤到站 10 秒口頭回想挑戰（Active Recall）</strong>
              <div style="display:flex;gap:8px;flex-wrap:wrap">
                <button type="button" class="btn small quiet" data-cd-action="toggle-recall-ans">
                  ${showRecallAnswer ? '🙈 隱藏示範回應' : '👀 查看／聆聽示範回應'}
                </button>
                ${dlg.recallAnswer ? `<button type="button" class="btn small primary" data-speak-sentence="${esc(dlg.recallAnswer.split('（')[0])}">🔊 聽英文示範回答</button>` : ''}
              </div>
            </div>
            <p style="margin:8px 0 0;font-weight:600;color:#0f172a">${esc(dlg.recallPrompt)}</p>
            ${showRecallAnswer && dlg.recallAnswer ? `
              <div class="commute-recall-answer">
                <strong>✨ 推薦英文回應：</strong><span lang="en">${esc(dlg.recallAnswer)}</span>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>

      <!-- 手機直式底部單手常駐快播列 (Mobile Commute Dock) -->
      <div class="commute-mobile-dock" role="region" aria-label="手機單手通勤會話播放控制">
        <button type="button" class="btn" data-cd-action="prev-line">⏮ 上句</button>
        <button type="button" class="btn primary" data-cd-action="toggle-play" data-commute-dock-play>${isPlaying ? '⏸ 暫停' : '▶ 播放會話'}</button>
        <button type="button" class="btn" data-cd-action="next-line">下句 ⏭</button>
        <button type="button" class="btn" data-cd-action="next-dialogue">下篇 ⏭</button>
        <button type="button" class="btn" data-cd-action="cycle-mode">🎙️ ${esc(modeInfo.short)}</button>
      </div>
    </section>
  `;
}

// 供各教材頁 (`lesson_pages.mjs` / `app.js`) 內嵌使用的「本課情境會話一鍵教學連播卡」
export function renderInlineDialoguePlayer(dialogueId, fallbackLines = [], title = '情境雙語教學會話') {
  const dlg = ALL_COMMUTE_DIALOGUES.find(d => d.id === dialogueId);
  const lines = dlg ? dlg.lines : fallbackLines.map(d => ({
    speaker: d.speaker || 'Speaker',
    en: d.en || d.text || '',
    zh: d.zh || '',
    note: d.note || inferLineTeachingNote(d.en || d.text, d.zh, title)
  }));
  if (!lines.length) return '';

  const isThisPlaying = isPlaying && state.selectedId === dialogueId;
  return `
    <section class="card inline-commute-dialogue" data-inline-dialogue="${esc(dialogueId)}">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <div>
          <span class="pill" style="background:#ecfdf5;color:#047857;font-weight:700">🎧 通勤會話教學連播</span>
          <h3 style="margin:4px 0 0">${esc(dlg ? dlg.title : title)}</h3>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button type="button" class="btn small primary" data-cd-inline-play="${esc(dialogueId)}" data-cd-inline-mode="teaching">
            ${isThisPlaying && state.playMode === 'teaching' ? '⏸ 暫停' : '▶ 教學精講連播'}
          </button>
          <button type="button" class="btn small quiet" data-cd-inline-play="${esc(dialogueId)}" data-cd-inline-mode="bilingual">
            ⚡ 雙語快播
          </button>
          <button type="button" class="btn small quiet" data-cd-inline-play="${esc(dialogueId)}" data-cd-inline-mode="shadowing">
            🗣️ 跟讀模式
          </button>
          ${isThisPlaying ? `<button type="button" class="btn small quiet" data-cd-action="stop">⏹ 停止</button>` : ''}
        </div>
      </div>
      ${dlg?.scenario ? `<p class="small" style="margin:0 0 10px;color:var(--text-muted)">📍 <strong>情境：</strong>${esc(dlg.scenario)}</p>` : ''}
      <div class="commute-lines-list">
        ${lines.map((line, idx) => `
          <div class="commute-line-card ${isThisPlaying && activeLineIndex === idx ? 'is-active-line' : ''}" data-commute-line-idx="${idx}">
            <div class="commute-line-head">
              <strong class="speaker-badge ${idx % 2 === 1 ? 'badge-b' : 'badge-a'}">${esc(line.speaker)}：</strong>
              <div class="commute-line-actions">
                <button type="button" class="btn small quiet" data-speak-sentence="${esc(line.en)}" aria-label="朗讀：${esc(line.en)}">🔊 朗讀</button>
                <button type="button" class="btn small quiet" data-speak-sentence="${esc(line.en)}" data-slow="true">🐢 慢速</button>
              </div>
            </div>
            <p class="commute-line-en" lang="en">${esc(line.en)}</p>
            ${line.zh ? `<p class="commute-line-zh">${esc(line.zh)}</p>` : ''}
            ${line.note ? `<div class="commute-line-note">💡 ${esc(line.note)}</div>` : ''}
          </div>
        `).join('')}
      </div>
      ${dlg?.recallPrompt ? `
        <div class="commute-recall-box" style="margin-top:12px">
          <strong>🧠 口頭回想練習：</strong>${esc(dlg.recallPrompt)}
          ${dlg.recallAnswer ? `<details style="margin-top:6px"><summary style="cursor:pointer;font-weight:700;color:#047857">查看示範英文回應</summary><p lang="en" style="margin:6px 0 0">${esc(dlg.recallAnswer)}</p></details>` : ''}
        </div>
      ` : ''}
    </section>
  `;
}

export function handleCommuteDialogueClick(button, rerender) {
  if (!button || !button.dataset) return false;
  if (rerender) externalRerender = rerender;
  const d = button.dataset;

  // 從首頁或快選列一鍵啟動指定會話
  if (d.commuteQuickDialogue) {
    const target = ALL_COMMUTE_DIALOGUES.find(x => x.id === d.commuteQuickDialogue);
    if (target) {
      state.category = target.stage;
      state.selectedId = target.id;
      persistState();
    }
    return false; // 交由外層導覽至 #listening 後開播
  }

  // 內嵌教材頁的連播按鈕
  if (d.cdInlinePlay) {
    const id = d.cdInlinePlay;
    const mode = d.cdInlineMode || 'teaching';
    if (isPlaying && state.selectedId === id && state.playMode === mode) {
      stopCommuteDialogue(true);
      rerender?.();
      return true;
    }
    state.playMode = mode;
    state.selectedId = id;
    persistState();
    startCommuteDialogue(id, 0, false, rerender);
    rerender?.();
    return true;
  }

  if (d.cdCategory) {
    stopCommuteDialogue(false);
    state.category = d.cdCategory;
    const list = getFilteredCommuteDialogues();
    if (list.length) state.selectedId = list[0].id;
    showRecallAnswer = false;
    persistState();
    rerender?.();
    return true;
  }

  if (d.cdMode) {
    if (COMMUTE_PLAY_MODES.some(m => m.id === d.cdMode)) {
      state.playMode = d.cdMode;
      persistState();
      if (isPlaying) {
        startCommuteDialogue(state.selectedId, Math.max(0, activeLineIndex >= 0 ? activeLineIndex : Number(state.resumeLine)||0), false, rerender);
      } else {
        activePhaseLabel = `已切換為「${COMMUTE_PLAY_MODES.find(m => m.id === d.cdMode).label}」，按播放即可開始。`;
        rerender?.();
      }
    }
    return true;
  }

  if (d.cdSelectPlay) {
    showRecallAnswer = false;
    state.selectedId = d.cdSelectPlay;
    persistState();
    startCommuteDialogue(d.cdSelectPlay, 0, false, rerender);
    rerender?.();
    return true;
  }

  if (d.cdPlayLine !== undefined) {
    const idx = Number(d.cdPlayLine);
    startCommuteDialogue(state.selectedId, idx, true, rerender);
    return true;
  }

  if (d.cdPlayFrom !== undefined) {
    const idx = Number(d.cdPlayFrom);
    startCommuteDialogue(state.selectedId, idx, false, rerender);
    return true;
  }

  if (d.cdRevealLine) {
    revealedLines.add(d.cdRevealLine);
    rerender?.();
    return true;
  }

  if (d.cdAction) {
    const act = d.cdAction;
    const dlg = getActiveCommuteDialogue();
    const list = getFilteredCommuteDialogues();
    const curIdx = list.findIndex(x => x.id === dlg.id);

    if (act === 'toggle-play') {
      if (isPlaying) {
        stopCommuteDialogue(true);
        rerender?.();
      } else {
        startCommuteDialogue(dlg.id, Math.max(0, activeLineIndex >= 0 ? activeLineIndex : Number(state.resumeLine)||0), false, rerender);
      }
      return true;
    }
    if (act === 'stop') {
      stopCommuteDialogue(true);
      rerender?.();
      return true;
    }
    if (act === 'prev-line') {
      const prev = Math.max(0, (activeLineIndex > 0 ? activeLineIndex - 1 : 0));
      startCommuteDialogue(dlg.id, prev, false, rerender);
      return true;
    }
    if (act === 'next-line') {
      const next = Math.min(dlg.lines.length - 1, (activeLineIndex >= 0 ? activeLineIndex + 1 : 1));
      startCommuteDialogue(dlg.id, next, false, rerender);
      return true;
    }
    if (act === 'prev-dialogue') {
      if (curIdx > 0) {
        showRecallAnswer = false;
        state.selectedId = list[curIdx - 1].id;
        persistState();
        startCommuteDialogue(state.selectedId, 0, false, rerender);
        rerender?.();
      }
      return true;
    }
    if (act === 'next-dialogue') {
      if (curIdx >= 0 && curIdx + 1 < list.length) {
        showRecallAnswer = false;
        state.selectedId = list[curIdx + 1].id;
        persistState();
        startCommuteDialogue(state.selectedId, 0, false, rerender);
        rerender?.();
      }
      return true;
    }
    if (act === 'toggle-autoadvance') {
      state.autoAdvance = !state.autoAdvance;
      persistState();
      rerender?.();
      return true;
    }
    if (act === 'toggle-loop') {
      state.loopSingle = !state.loopSingle;
      persistState();
      rerender?.();
      return true;
    }
    if (act === 'toggle-mask') {
      state.blindMask = !state.blindMask;
      revealedLines.clear();
      persistState();
      rerender?.();
      return true;
    }
    if (act === 'cycle-roleplay') {
      const order = ['off', 'speakerB', 'speakerA'];
      state.rolePlay = order[(order.indexOf(state.rolePlay) + 1) % order.length];
      persistState();
      if (isPlaying) startCommuteDialogue(dlg.id, 0, false, rerender);
      else rerender?.();
      return true;
    }
    if (act === 'cycle-mode') {
      const idx = COMMUTE_PLAY_MODES.findIndex(m => m.id === state.playMode);
      state.playMode = COMMUTE_PLAY_MODES[(idx + 1) % COMMUTE_PLAY_MODES.length].id;
      persistState();
      if (isPlaying) startCommuteDialogue(dlg.id, Math.max(0, activeLineIndex >= 0 ? activeLineIndex : Number(state.resumeLine)||0), false, rerender);
      else rerender?.();
      return true;
    }
    if (act === 'toggle-fav') {
      if (state.favoriteIds.includes(dlg.id)) {
        state.favoriteIds = state.favoriteIds.filter(x => x !== dlg.id);
      } else {
        state.favoriteIds.push(dlg.id);
      }
      persistState();
      rerender?.();
      return true;
    }
    if (act === 'toggle-recall-ans') {
      showRecallAnswer = !showRecallAnswer;
      rerender?.();
      return true;
    }
  }

  return false;
}

export function handleCommuteDialogueChange(target, rerender) {
  if(target?.dataset?.americanVoice !== undefined) {
    stopCommuteDialogue(false);
    setAmericanVoice(Number(target.dataset.americanVoice),target.value);
    activePhaseLabel='已更新美式角色聲音，按播放可從保存的位置重試。';
    rerender?.(); return true;
  }
  if (!target) return false;
  if (rerender) externalRerender = rerender;

  if (target.id === 'commute-dialogue-select') {
    showRecallAnswer = false;
    state.selectedId = target.value;
    persistState();
    startCommuteDialogue(state.selectedId, 0, false, rerender);
    rerender?.();
    return true;
  }

  if (target.dataset?.cdSetting) {
    const setting = target.dataset.cdSetting;
    const val = Number(target.value);
    if (setting === 'rate' && val >= 0.5 && val <= 1.5) state.rate = val;
    if (setting === 'shadowGap' && val >= 1 && val <= 10) state.shadowGap = val;
    persistState();
    if (isPlaying) startCommuteDialogue(state.selectedId, Math.max(0, activeLineIndex >= 0 ? activeLineIndex : Number(state.resumeLine)||0), false, rerender);
    else rerender?.();
    return true;
  }

  return false;
}

export function handleCommuteDialogueInput(target, rerender) {
  if (target && target.id === 'commute-dialogue-search') {
    const caret = target.selectionStart;
    state.search = target.value;
    const list = getFilteredCommuteDialogues();
    if (list.length && !list.some(d => d.id === state.selectedId)) {
      state.selectedId = list[0].id;
    }
    rerender?.();
    const input = typeof document !== 'undefined' && document.getElementById('commute-dialogue-search');
    if (input) {
      input.focus();
      if (caret !== null) input.setSelectionRange(caret, caret);
    }
    return true;
  }
  return false;
}

export function getCommuteDialogueState() {
  return {
    ...state,
    isPlaying,
    activeLineIndex,
    activePhaseLabel,
    totalDialogues: ALL_COMMUTE_DIALOGUES.length
  };
}

// Home playback stays in the selected lesson, sharing completion and position with the studio.
export function playHomeConversation(id, mode, resume, rerender) {
  const target = ALL_COMMUTE_DIALOGUES.find(d => d.id === id);
  if (!target) return;
  const line = resume && state.selectedId === id ? Math.max(0, Math.min(target.lines.length - 1, Number(state.resumeLine) || 0)) : 0;
  state.category = target.stage;
  state.playMode = COMMUTE_PLAY_MODES.some(m=>m.id===mode) ? mode : 'blind_en';
  state.rolePlay = 'off';
  state.autoAdvance = false;
  state.loopSingle = false;
  startCommuteDialogue(id, line, false, rerender);
}
