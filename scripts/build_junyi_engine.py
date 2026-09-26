"""
build_junyi_engine.py
Generates the fully expanded, 42-fatal-trap, 12-badge JunyiEngine module for dist/junyi_engine.mjs.
"""

import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

code = r'''// junyi_engine.mjs - 均一教育平台 (Junyi Academy) 風格智慧自學引導引擎
// 專家委員會指導：課綱總體諮詢、第二語言習得 (SLA)、均一微課自學、大考會考測驗、語音聲學、技高ESP與全齡UX
// 包含技能精熟追蹤、鷹架提示 (Scaffolding Hints)、步驟 0 破題思維、42項致命陷阱 X 光機與 12 枚核心素養徽章系統

const STORAGE_KEY = 'junyi-mastery-v2';

// 精熟等級定義
export const MASTERY_LEVELS = {
  UNSTARTED: { code: 'unstarted', label: '未開始', icon: '⚪', xp: 0, color: '#94a3b8' },
  PRACTICING: { code: 'practicing', label: '練習中', icon: '🟡', xp: 50, color: '#f59e0b' },
  FAMILIAR: { code: 'familiar', label: '熟悉', icon: '🟢', xp: 120, color: '#10b981' },
  MASTERED: { code: 'mastered', label: '精熟', icon: '⭐', xp: 200, color: '#6366f1' }
};

// 12 枚大考與自學核心素養徽章
export const JUNYI_BADGES = [
  { id: 'badge-phonics', title: '拼讀領航員', desc: '掌握自然拼讀與長短母音規則', icon: '🔤', reqXp: 100 },
  { id: 'badge-grammar-scout', title: '語法偵探', desc: '熟練時態標記與主動被動轉換', icon: '🔍', reqXp: 300 },
  { id: 'badge-clause-architect', title: '句型建築師', desc: '掌握複合句、連接詞與關係代名詞子句', icon: '🏛️', reqXp: 600 },
  { id: 'badge-reading-ace', title: '跨文本閱讀王', desc: '能快速解讀時刻表、地圖與長篇多模態文本', icon: '📜', reqXp: 1000 },
  { id: 'badge-cap-grandmaster', title: '會考全勝神將', desc: '完成 109–115 國中會考歷屆考點診斷與圖表交叉檢索', icon: '👑', reqXp: 1500 },
  { id: 'badge-sh-pinnacle', title: '高中句構宗師', desc: '五大句型、非限定動詞與名詞/副詞子句全通', icon: '💎', reqXp: 2000 },
  { id: 'badge-participle-titan', title: '分詞倒裝征服者', desc: '攻克分詞構句、獨立分詞與否定/地方副詞倒裝', icon: '⚡', reqXp: 2600 },
  { id: 'badge-subjunctive-sage', title: '假設語氣思辨賢者', desc: '融會貫通現在、過去、未來相反與省略 if 倒裝', icon: '🔮', reqXp: 3200 },
  { id: 'badge-multimodal-analyst', title: '多模態圖表分析師', desc: '熟練解讀長篇趨勢圖、柱狀圖與學測混合題簡答', icon: '📊', reqXp: 4000 },
  { id: 'badge-gsat-elite', title: '學測指考滿級分傳奇', desc: '詞彙、克漏字、文意選填與篇章結構無懈可擊', icon: '🏆', reqXp: 5000 },
  { id: 'badge-esp-technologist', title: '科技與 ESG 專業先鋒', desc: '掌握人工智慧演算法論文與全球淨零永續專業英語', icon: '🌱', reqXp: 6200 },
  { id: 'badge-lifelong-odyssey', title: '終生自主雙語航海王', desc: '具備全英語授課聽講、英文簡報與終生自學飛輪能力', icon: '🌍', reqXp: 7500 }
];

// 42 項均一致命陷阱避雷雷達 (台灣英語學習者最常犯失分點全圖譜)
export const FATAL_TRAPS = [
  // === 國小與國中初階 (1-10) ===
  {
    id: 'trap-1',
    gradeBand: '國小/國中初階',
    topic: '現在進行式漏掉 be 動詞',
    wrong: 'He playing basketball now. ❌',
    correct: 'He is playing basketball now. ✔️',
    explanation: '進行式的核心公式是「be動詞＋V-ing」，兩者缺一不可。只寫 V-ing 只是分詞，不能獨立充當句子主要動詞。',
    step0Clue: '看到時間副詞 now / right now 或感嘆詞 Look! / Listen!，先確定動詞是否有 be 動詞 (am/is/are) 再加 -ing。'
  },
  {
    id: 'trap-2',
    gradeBand: '國小/國中初階',
    topic: '頻率副詞位置搞混',
    wrong: 'He goes always to school by bus. ❌',
    correct: 'He always goes to school by bus. ✔️',
    explanation: '頻率副詞口訣：「Be後動前」——在 be 動詞與助動詞之後，一般動詞之前。',
    step0Clue: '先圈出句子中的動詞：如果是一般動詞 (go, eat, study)，副詞放前面；如果是 be 動詞 (is, am, are)，副詞放後面。'
  },
  {
    id: 'trap-3',
    gradeBand: '國小/國中初階',
    topic: '第三人稱單數現在式動詞忘記加 -s / -es',
    wrong: 'My brother play the violin every evening. ❌',
    correct: 'My brother plays the violin every evening. ✔️',
    explanation: '主詞為第三人稱單數 (he, she, it, my brother)，在現在簡單式中，一般動詞必須字尾加 -s 或 -es。',
    step0Clue: '看到 every day / usually 時，先用手指指著主詞：是一個人/物嗎？如果是，動詞立刻加 s！'
  },
  {
    id: 'trap-4',
    gradeBand: '國小/國中初階',
    topic: 'There is vs. There are 單複數錯置',
    wrong: 'There is three books on the wooden desk. ❌',
    correct: 'There are three books on the wooden desk. ✔️',
    explanation: 'There is/are 句型的真正主詞是後面的名詞！名詞為複數 (three books) 時，be 動詞必須使用 are。',
    step0Clue: '遮住 There，看空格後面的名詞是單數還是複數！單數用 is，複數用 are。'
  },
  {
    id: 'trap-5',
    gradeBand: '國小/國中初階',
    topic: '疑問句與否定句中助動詞後動詞未打回原形',
    wrong: 'Did you saw the magnificent fireworks last night? ❌',
    correct: 'Did you see the magnificent fireworks last night? ✔️',
    explanation: '助動詞 (do, does, did) 已經承擔了時態與人稱標記，其後的一般動詞必須強制回歸「原形動詞」。',
    step0Clue: '只要前面出現 Did / Didn\'t / Do / Does，後面的動詞一律回歸字典原形！'
  },
  {
    id: 'trap-6',
    gradeBand: '國小/國中初階',
    topic: '人稱代名詞主格、受格混淆',
    wrong: 'Please hand the blueprint to he and I. ❌',
    correct: 'Please hand the blueprint to him and me. ✔️',
    explanation: '介系詞 (to, for, with, at) 後方必須接「受格代名詞」(him, her, me, them, us)。',
    step0Clue: '看到介系詞後面跟著代名詞，一律換成受格 (me, him, her)！'
  },
  {
    id: 'trap-7',
    gradeBand: '國小/國中初階',
    topic: '可數名詞與不可數名詞計量混淆',
    wrong: 'She gave me two advices and many informations. ❌',
    correct: 'She gave me two pieces of advice and much information. ✔️',
    explanation: 'advice, information, furniture, homework, news 均為不可數名詞，絕對不可加複數 -s，亦不可直接加數字！',
    step0Clue: '看到 information / advice，立刻檢查字尾有沒有被偷加 -s，有加就是錯！'
  },
  {
    id: 'trap-8',
    gradeBand: '國小/國中初階',
    topic: '否定句與疑問句中誤用 some 代替 any',
    wrong: 'We do not have some fresh apples in the basket. ❌',
    correct: 'We do not have any fresh apples in the basket. ✔️',
    explanation: 'some 通常用於肯定句；否定句與一般疑問句中應使用 any。',
    step0Clue: '檢查句子有沒有 not 或問號：否定句與一般疑問句一律換成 any。'
  },
  {
    id: 'trap-9',
    gradeBand: '國小/國中初階',
    topic: '不定冠詞 a vs. an 依發音而非拼字決定',
    wrong: 'He is a honest student with a unusual hobby. ❌',
    correct: 'He is an honest student with an unusual hobby. ✔️',
    explanation: '冠詞 an 依據後方單字的「母音發音」而非字母拼寫！honest 的 h 不發音 (首音為母音 /ɑː/)，需用 an；hour 亦同。',
    step0Clue: '念出單字的第一個音：若是母音發音 (如 honest /ˈɑːnɪst/)，必須用 an！'
  },
  {
    id: 'trap-10',
    gradeBand: '國小/國中初階',
    topic: '時間介系詞 in, on, at 混淆',
    wrong: 'The concert will take place in Friday night at July. ❌',
    correct: 'The concert will take place on Friday night in July. ✔️',
    explanation: '時間介系詞口訣：at 接特定時間點 (at 7:00)；on 接特定某一天或特定日子的早午晚 (on Friday, on July 4th)；in 接月份、年份與季節 (in July, in 2026)。',
    step0Clue: '有具體「星期」或「日期」用 on；只有「月份、年份」用 in；幾點幾分用 at！'
  },

  // === 國中中階與會考主力 (11-24) ===
  {
    id: 'trap-11',
    gradeBand: '國中中階',
    topic: '連接詞雙重使用 (Although... but / Because... so)',
    wrong: 'Although it rained hard, but we still played soccer. ❌',
    correct: 'Although it rained hard, we still played soccer. ✔️',
    explanation: '英文一個句子只能有一個連接詞連接兩個子句。Although 和 but 都是連接詞，不能同時出現；Because 和 so 亦同。',
    step0Clue: '數句子裡的動詞數量：如果有兩個主要動詞，只能有一個連接詞；出現兩個連接詞必定語法錯誤。'
  },
  {
    id: 'trap-12',
    gradeBand: '國中中階',
    topic: '過去進行式與時間連接詞 when / while 時態衝突',
    wrong: 'While I cooked dinner, the doorbell suddenly rang. (宜改進行) ❌',
    correct: 'While I was cooking dinner, the doorbell suddenly rang. ✔️',
    explanation: 'while 引導較長、正在持續進行的背景動作 (was cooking)；短暫突發的打斷動作則用過去簡單式 (rang)。',
    step0Clue: '看動作是「持續進行的背景」還是「一瞬間發生的事件」：背景用 was/were V-ing，突發事件用過去簡單式！'
  },
  {
    id: 'trap-13',
    gradeBand: '國中中階',
    topic: '比較級與最高級雙重疊加錯誤',
    wrong: 'This smartphone is more cheaper than that one. ❌',
    correct: 'This smartphone is cheaper than that one. ✔️',
    explanation: '單音節形容詞加上 -er (cheaper) 即可，絕不可在前面再多加 more！避免雙重比較級。',
    step0Clue: '單字已經有 -er (如 faster, taller)，前面絕不能再寫 more！'
  },
  {
    id: 'trap-14',
    gradeBand: '國中中階',
    topic: '授與動詞介系詞 to 與 for 混淆',
    wrong: 'My mother made a birthday cake to me yesterday. ❌',
    correct: 'My mother made a birthday cake for me yesterday. ✔️',
    explanation: '授與動詞雙賓語改寫：動作帶有方向傳遞性 (give, send, write) 介系詞用 to；帶有代勞、烹飪或購買好意 (make, buy, cook, bake) 介系詞用 for！',
    step0Clue: '是「寄出傳遞」還是「親手製造/購買」？製造購買用 for！'
  },
  {
    id: 'trap-15',
    gradeBand: '國中中階',
    topic: '感官動詞後接原形或 V-ing，誤加不定詞 to',
    wrong: 'We heard the famous soprano to sing in the concert hall. ❌',
    correct: 'We heard the famous soprano sing (or singing) in the concert hall. ✔️',
    explanation: '感官動詞 (see, hear, watch, notice) 主動受詞補語用「原形動詞 (全程事實)」或「現在分詞 V-ing (正在發生)」，主動語態下絕不能加 to！',
    step0Clue: '看到 hear / see / watch，受詞後面的動詞第一時間劃掉 to V！'
  },
  {
    id: 'trap-16',
    gradeBand: '國中中階',
    topic: '連綴動詞後誤接副詞作為主詞補語',
    wrong: 'The freshly baked apple pie smells deliciously. ❌',
    correct: 'The freshly baked apple pie smells delicious. ✔️',
    explanation: '連綴動詞 (look, smell, taste, feel, sound) 用來描述主詞的特質與狀態，其後的主詞補語必須使用「形容詞」，不可受中文「聞起來很美味地」誤導而用副詞！',
    step0Clue: '聞/嘗/看/聽/摸起來怎麼樣，後面一律接「形容詞」(good, sweet, delicious)！'
  },
  {
    id: 'trap-17',
    gradeBand: '國中中階',
    topic: '不定詞與動名詞在特定動詞後的語義分歧',
    wrong: 'He stopped to smoke because the doctor warned him of lung cancer. ❌',
    correct: 'He stopped smoking because the doctor warned him of lung cancer. ✔️',
    explanation: 'stop to V 是「停下手中的事，去開始做 V」；stop V-ing 才是「戒掉/停止 V 這個習慣動作」！',
    step0Clue: '是「戒除不再做」(選 V-ing) 還是「停下來轉頭去做」(選 to V)？'
  },
  {
    id: 'trap-18',
    gradeBand: '國中中階',
    topic: '花費動詞主詞與動詞搭錯 (spend, cost, take, pay)',
    wrong: 'The high-speed rail ticket spent me seven hundred dollars. ❌',
    correct: 'The high-speed rail ticket cost me seven hundred dollars. (or: I spent... on the ticket) ✔️',
    explanation: '花費動詞口訣：人當主詞用 spend / pay (人 spend 金錢/時間 on 事；人 pay 金錢 for 事)；物當主詞用 cost / take (物 cost 人 金錢；It takes 人 時間 to V)。',
    step0Clue: '主詞是人還是物？物當主詞花錢只能用 cost，花時間只能用 take！'
  },
  {
    id: 'trap-19',
    gradeBand: '國中中階',
    topic: '被動語態漏掉關鍵 be 動詞',
    wrong: 'This suspension bridge constructed over fifty years ago. ❌',
    correct: 'This suspension bridge was constructed over fifty years ago. ✔️',
    explanation: '被動語態必須有「be動詞＋過去分詞 (p.p.)」。橋梁不會自己建造，若只有 constructed 會變成主動過去式，造成語義崩潰。',
    step0Clue: '主詞是無生命的東西 (如橋梁、大樓、歌曲) 嗎？檢查動詞是不是 be + p.p.！'
  },
  {
    id: 'trap-20',
    gradeBand: '國中中階',
    topic: '間接問句保留助動詞倒裝語序',
    wrong: 'Can you tell me where does the tour bus depart? ❌',
    correct: 'Can you tell me where the tour bus departs? ✔️',
    explanation: '間接問句嵌入主句作名詞子句時，語序必須恢復為平鋪直敘「疑問詞 + 主詞 + 動詞」，不可保留直接問句的 does / did 倒裝結構！',
    step0Clue: '看到 Can you tell me / I wonder 後接疑問詞，立刻檢查有沒有把 does/did 拿掉並把主詞放前面！'
  },
  {
    id: 'trap-21',
    gradeBand: '國中中階',
    topic: '祈使句動詞未用原形',
    wrong: 'Please being quiet while the baby is sleeping. ❌',
    correct: 'Please be quiet while the baby is sleeping. ✔️',
    explanation: '祈使句省略了主詞 You，動詞一律強制使用「原形動詞」(Be / Do / Open / Listen)。',
    step0Clue: '句首是 Please 或沒有主詞的命令句，動詞一律用原形 Be / V！'
  },
  {
    id: 'trap-22',
    gradeBand: '國中中階',
    topic: '數量代名詞 one, another, the other, others 配對混淆',
    wrong: 'I have two brothers; one is a doctor, and another is an artist. ❌',
    correct: 'I have two brothers; one is a doctor, and the other is an artist. ✔️',
    explanation: '只有兩個人或物時，配對口訣是「One..., the other...」(一個...另一個，限定特定對象加 the)。another 用於三者以上的「另一個(不指定)」。',
    step0Clue: '總數是「兩個」嗎？只要已知總數為 2，剩下的那個一定是 the other！'
  },
  {
    id: 'trap-23',
    gradeBand: '國中中階',
    topic: '現在完成式與具體過去時間副詞連用',
    wrong: 'I have visited the National Palace Museum yesterday afternoon. ❌',
    correct: 'I visited the National Palace Museum yesterday afternoon. ✔️',
    explanation: '現在完成式 (have/has p.p.) 表經驗或持續狀態，不可與具體精確的過去時間點 (yesterday, last year, in 2020, two days ago) 連用！具體過去時間必須用過去簡單式。',
    step0Clue: '看到 yesterday, ago, last... 這種明確過去時間，直接排除 have/has p.p.！'
  },
  {
    id: 'trap-24',
    gradeBand: '國中中階',
    topic: '附加問句主被動與助動詞極性錯配',
    wrong: 'He has seldom eaten spicy food, hasn\'t he? ❌',
    correct: 'He has seldom eaten spicy food, has he? ✔️',
    explanation: '前半句若含有否定或半否定副詞 (seldom, rarely, hardly, never, few, little)，前半句視為否定，後方的附加問句必須用「肯定」！',
    step0Clue: '掃描前半句有沒有 seldom / never / hardly，有看到的話，附加問句尾巴不能加 n\'t！'
  },

  // === 國中會考 CAP 頂標決勝陷阱 (25-32) ===
  {
    id: 'trap-25',
    gradeBand: '國中會考 A++ 決勝',
    topic: '會考多文本忽略海報最下方星號附註 (* Note:)',
    wrong: '只讀票價正文就直接作答，漏看「六歲以下免票」或「下午四點後停止售票」。 ❌',
    correct: '先掃視海報、價目表底部的星號與括號補充條件，再進行題幹計算與比對。 ✔️',
    explanation: '109-115 國中會考閱讀題組中，超過 70% 的高難度陷阱題目出在最底層字體最小的星號附註。',
    step0Clue: '做題前先用筆將海報底部的 * 或 Note: 圈起來，那裡是出題老師埋伏的命題點！'
  },
  {
    id: 'trap-26',
    gradeBand: '國中會考 A++ 決勝',
    topic: '單程票 (one-way) 與來回票 (round-trip) 價格計算錯位',
    wrong: '題目問來回兩人總價，卻只用單程票價計算；或題目問單程，卻把來回票價除以二。 ❌',
    correct: '在題幹中圈出 one-way 還是 round-trip，並嚴格確認是否有平日/假日折扣。 ✔️',
    explanation: '會考數學素養英語題常考大眾運輸票價計算，需精準抓取關鍵詞與加乘係數。',
    step0Clue: '在題目中圈出「人數」、「單程/來回」、「成人/兒童折扣」，列出算式再劃卡。'
  },
  {
    id: 'trap-27',
    gradeBand: '國中會考 A++ 決勝',
    topic: '閱讀測驗主旨題過度擴張或侷限細節',
    wrong: '選了一個只在第三段提過一句的話作為全篇文章的主旨。 ❌',
    correct: '主旨必須涵蓋「首段核心議題」與「末段結論」，能概括全文而非單一段落細節。 ✔️',
    explanation: '大考中心常見誘答選項是「原文完全正確的事實，但只是局部細節，不能代表全文主旨」。',
    step0Clue: '問 main idea 時，問自己：這句話能當整篇文章的標題嗎？只講其中一段的絕對不是主旨！'
  },
  {
    id: 'trap-28',
    gradeBand: '國中會考 A++ 決勝',
    topic: '代名詞跨段落指涉對象判斷失誤',
    wrong: '以為 it 指的是上一句的主詞，卻沒注意到文意是指代前面提到的整件事或受詞。 ❌',
    correct: '將選項代入代名詞位置，重新通讀前後兩句，檢驗邏輯語義是否完全通順。 ✔️',
    explanation: '代名詞題必須往回尋找最近的單複數相符之名詞，並進行「代入檢驗」。',
    step0Clue: '把選項填入 it / they 的位置念一次，意思通順才是正解。'
  },
  {
    id: 'trap-29',
    gradeBand: '國中會考 A++ 決勝',
    topic: '時間連接詞 before / after 引導的時間軸先後顛倒',
    wrong: 'He washed his hands before he had lunch. 誤解為「他先吃午餐才洗手」。 ❌',
    correct: 'Before 引導的動作後發生！句意為「在他吃午餐前 (後發生的事)，他洗了手 (先洗手)」。 ✔️',
    explanation: 'Before + 動作 B, 動作 A => 先做 A，再做 B。切勿因為英文語序而把時間先後讀反。',
    step0Clue: '畫箭頭！Before 後面那件事是後發生的，主要子句是先發生的！'
  },
  {
    id: 'trap-30',
    gradeBand: '國中會考 A++ 決勝',
    topic: '題幹否定詞 NOT / LEAST 漏看盲區',
    wrong: '匆忙作答把 Which of the following is NOT true? 當成選正確選項。 ❌',
    correct: '看到題幹中的 NOT, EXCEPT, LEAST 時，立即用鉛筆在試卷上畫大圈提醒自己選「錯的」。 ✔️',
    explanation: '心理學研究顯示，考試焦慮下大腦容易忽略否定詞。會考題目大寫 NOT 即是防呆機制，考生必須落實劃圈。',
    step0Clue: '審題三秒鐘：題幹只要出現 NOT / EXCEPT，在考卷上打個大叉提醒自己找錯誤項！'
  },
  {
    id: 'trap-31',
    gradeBand: '國中會考 A++ 決勝',
    topic: '多模態圖表 X 軸 Y 軸單位換算盲點 (thousands vs. millions)',
    wrong: '看到圖表上標記 50，就誤以為是 50 人，忽略軸線標題註明 (in thousands)。 ❌',
    correct: '圖表題必讀坐標軸標題與單位，50 (in thousands) 代表 50,000。 ✔️',
    explanation: '跨領域圖表題常在軸線單位 (千、百萬、百分比) 設計數字陷阱。',
    step0Clue: '看圖表第一秒：檢查括號裡的單位！是 %、dollars、還是 in thousands？'
  },
  {
    id: 'trap-32',
    gradeBand: '國中會考 A++ 決勝',
    topic: '跨段落因果關係倒置 (Reverse Causality)',
    wrong: '文章寫 A 導致 B，題目誘答選項寫成 B 促成了 A，考生未經比對直接選入。 ❌',
    correct: '確認因果動詞方向：lead to / result in 是「前因後果」；result from 是「前果後因」。 ✔️',
    explanation: '因果關係倒置是會考閱讀與學測綜合測驗最經典的高鑑別度誘答模式。',
    step0Clue: '圈出 lead to 或 because of，箭頭永遠從「原因」指向「結果」！'
  },

  // === 高中、統測與學測頂標 (33-42) ===
  {
    id: 'trap-33',
    gradeBand: '高中/學測頂標',
    topic: '關係代名詞 that 前加逗號或介系詞',
    wrong: 'Taipei 101, that is located in Xinyi, is famous. ❌',
    correct: 'Taipei 101, which is located in Xinyi, is famous. ✔️',
    explanation: 'that 作為關係代名詞時有兩大絕對禁忌：1. 前面不可有逗號（非限定子句不可用 that）；2. 前面不可有介系詞（如 in that ❌，需用 in which）。',
    step0Clue: '看到關係子句空格前有「,」或介系詞 (in, on, at, with)，立刻排除選項 that。'
  },
  {
    id: 'trap-34',
    gradeBand: '高中/學測頂標',
    topic: '不及物動詞誤用被動語態',
    wrong: 'The catastrophic explosion was happened at midnight. ❌',
    correct: 'The catastrophic explosion happened at midnight. ✔️',
    explanation: 'happen, occur, take place, exist, disappear, break out 均為完全不及物動詞，無受詞，因此「絕對沒有被動語態」！',
    step0Clue: '看到 happen / occur 等發生類動詞，看到選項中有 was happened / is occurred 直接劃掉！'
  },
  {
    id: 'trap-35',
    gradeBand: '高中/學測頂標',
    topic: '堅決建意命要動詞後 that 子句動詞未用原形',
    wrong: 'The doctor suggested that the patient takes the medication twice daily. ❌',
    correct: 'The doctor suggested that the patient (should) take the medication twice daily. ✔️',
    explanation: '表示「命令、建議、要求、堅持」的動詞 (demand, suggest, insist, recommend, order) 後面的 that 子句，助動詞 should 常省略，動詞一律回歸「原形動詞」！',
    step0Clue: '前面有 suggest / demand / insist，後面的 that 子句動詞不管主詞是誰，一律填原形動詞！'
  },
  {
    id: 'trap-36',
    gradeBand: '高中/學測頂標',
    topic: '分詞構句懸垂分詞 (Dangling Participle) 主詞不一致',
    wrong: 'Walking down the boulevard, the ancient castle appeared majestic. ❌',
    correct: 'Walking down the boulevard, we saw the ancient castle appear majestic. ✔️',
    explanation: '分詞片語簡化時，其隱含的主詞必須與「主要子句的主詞完全一致」。古堡不會自己走在林蔭大道上，主句主詞必須是走在街上的人！',
    step0Clue: '做分詞構句時，先問自己：主要子句的主詞是分詞動作的執行者嗎？不是的話就是懸垂分詞錯誤！'
  },
  {
    id: 'trap-37',
    gradeBand: '高中/學測頂標',
    topic: '假設語氣 if 條件子句誤用 would have p.p.',
    wrong: 'If I would have known the answer, I would have told you. ❌',
    correct: 'If I had known the answer, I would have told you. ✔️',
    explanation: '與過去事實相反的假設，if 子句中只能使用過去完成式「had + p.p.」，would have p.p. 只能出現在「主要子句」中！',
    step0Clue: 'if 子句裡面絕對不能出現 would have！看到 if + would have 直接判錯！'
  },
  {
    id: 'trap-38',
    gradeBand: '高中/學測頂標',
    topic: '否定副詞置於句首忘記倒裝',
    wrong: 'Never I have witnessed such an extraordinary solar eclipse. ❌',
    correct: 'Never have I witnessed such an extraordinary solar eclipse. ✔️',
    explanation: '當 Never, Seldom, Rarely, Little, Scarcely, Not only 置於句首時，語序必須採疑問句式的倒裝：助動詞/be動詞提至主詞之前！',
    step0Clue: '句首第一字是否定副詞 (Never / Seldom / Little)，緊接著必須是助動詞或 be 動詞！'
  },
  {
    id: 'trap-39',
    gradeBand: '高中/學測頂標',
    topic: '轉折副詞 However / Therefore 造成逗號串句 (Comma Splice)',
    wrong: 'The experiment failed, however, the researchers did not lose hope. ❌',
    correct: 'The experiment failed; however, the researchers did not lose hope. (or: ...failed. However, ...) ✔️',
    explanation: 'however, therefore, furthermore 是「副詞」而不是「連接詞」！絕不能只用一個逗號連接兩個獨立子句，前面必須使用「分號」或「句號」。',
    step0Clue: 'however 不是連接詞！連接兩個句子時，however 前面必須是「分號 (;)」或「句號 (.)」！'
  },
  {
    id: 'trap-40',
    gradeBand: '高中/學測頂標',
    topic: '複合關係代名詞 what 前贅加先行詞',
    wrong: 'I don\'t understand the reason what caused the financial crisis. ❌',
    correct: 'I don\'t understand what caused the financial crisis. (or: ...the reason why/that...) ✔️',
    explanation: 'what 本身就是「the thing which/that」，已經包含了先行詞，前面絕對不可再有名詞先行詞！',
    step0Clue: '空格前如果已經有名詞 (如 the reason, the book)，空格絕對不能填 what！'
  },
  {
    id: 'trap-41',
    gradeBand: '高中/學測頂標',
    topic: '讓步倒裝 Adj / N + as 置首時單數名詞誤加冠詞 a/an',
    wrong: 'A child as he was, he showed remarkable bravery. ❌',
    correct: 'Child as he was, he showed remarkable bravery. ✔️',
    explanation: '名詞移至 as / though 前方倒裝表讓步時，若為單數可數名詞，必須省略不定冠詞 a 或 an！',
    step0Clue: '看到 as he was 倒裝，句首的名詞「絕對不加 a / an」！'
  },
  {
    id: 'trap-42',
    gradeBand: '高中/學測頂標',
    topic: '特殊片語中的介系詞 to 後誤接原形動詞',
    wrong: 'All the students are looking forward to graduate next summer. ❌',
    correct: 'All the students are looking forward to graduating next summer. ✔️',
    explanation: 'look forward to, be used to (習慣於), devote oneself to, object to (反對) 中的 to 是「介系詞」，後面必須接「動名詞 V-ing」或名詞，而非原形動詞！',
    step0Clue: '看到 look forward to / object to，後面的動詞閉著眼睛選 V-ing！'
  }
];

export class JunyiEngine {
  constructor() {
    this.data = this.loadState();
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // ignore
    }
    return {
      xp: 0,
      streak: 1,
      lastActive: new Date().toISOString().slice(0, 10),
      mastery: {}, // unitId: 'unstarted' | 'practicing' | 'familiar' | 'mastered'
      unitScores: {}, // unitId: { correct: 0, total: 0 }
      earnedBadges: []
    };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // ignore
    }
  }

  getUnitMastery(unitId) {
    const code = this.data.mastery[unitId] || 'unstarted';
    return Object.values(MASTERY_LEVELS).find(l => l.code === code) || MASTERY_LEVELS.UNSTARTED;
  }

  recordQuizResult(unitId, isCorrect) {
    if (!this.data.unitScores[unitId]) {
      this.data.unitScores[unitId] = { correct: 0, total: 0 };
    }
    const score = this.data.unitScores[unitId];
    score.total += 1;
    if (isCorrect) {
      score.correct += 1;
      this.addXp(30);
    } else {
      this.addXp(5); // 均一理念：嘗試也有經驗值激勵
    }

    // 依答對率判定精熟等級
    const ratio = score.correct / score.total;
    if (score.total >= 4 && ratio >= 0.85) {
      this.data.mastery[unitId] = 'mastered';
    } else if (score.total >= 2 && ratio >= 0.6) {
      this.data.mastery[unitId] = 'familiar';
    } else {
      this.data.mastery[unitId] = 'practicing';
    }

    this.checkBadges();
    this.saveState();
  }

  addXp(amount) {
    this.data.xp += amount;
    this.checkBadges();
    this.saveState();
  }

  checkBadges() {
    const currentXp = this.data.xp;
    JUNYI_BADGES.forEach(b => {
      if (currentXp >= b.reqXp && !this.data.earnedBadges.includes(b.id)) {
        this.data.earnedBadges.push(b.id);
      }
    });
  }

  getProgressStats() {
    const totalUnitsCount = 61; // 全7年段 61 個完整核心單元
    const masteredCount = Object.values(this.data.mastery).filter(m => m === 'mastered').length;
    const familiarCount = Object.values(this.data.mastery).filter(m => m === 'familiar').length;
    const practicingCount = Object.values(this.data.mastery).filter(m => m === 'practicing').length;
    return {
      xp: this.data.xp,
      masteredCount,
      familiarCount,
      practicingCount,
      totalUnitsCount,
      badgesEarned: this.data.earnedBadges.length,
      totalBadges: JUNYI_BADGES.length,
      masteryRate: Math.round((masteredCount / totalUnitsCount) * 100) || 0
    };
  }

  renderJunyiHeader() {
    const stats = this.getProgressStats();
    return `
      <div class="junyi-header-card">
        <div class="junyi-xp-badge">
          <span class="xp-icon">⚡</span>
          <span class="xp-val">${stats.xp} XP</span>
        </div>
        <div class="junyi-stat-pill">
          <span>精熟單元:</span>
          <strong>${stats.masteredCount} / ${stats.totalUnitsCount}</strong>
          <span class="rate">(${stats.masteryRate}%)</span>
        </div>
        <div class="junyi-stat-pill">
          <span>素養徽章:</span>
          <strong>${stats.badgesEarned} / ${stats.totalBadges}</strong>
        </div>
      </div>
    `;
  }
}
'''

with open("dist/junyi_engine.mjs", "w", encoding="utf-8") as f:
    f.write(code)

print("Generated expanded dist/junyi_engine.mjs with 42 fatal traps and 12 badges!")
