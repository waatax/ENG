// flashcards.mjs - 全階程度單字與片語記憶閃卡館 (Graded Memory Flashcards Studio)
// 完整依照程度編排：小學1,000字、國中2,000字、高中3,000字與核心片語、TOEIC、Digital SAT、GRE、GMAT
// 配備：3D卡片翻轉動畫、自然拼讀音節拆解、KK音標、雙語例句、即時真人語音 (Web Speech API)、掌握度標記與自動輪播聽讀

import { playWord, playSentence, stopAudio } from './audio.mjs';

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

// 閃卡分級定義
export const FLASHCARD_TIERS = [
  { id: 'elem_1000', name: '🎒 小學必備 1,000 字', cefr: 'Pre-A1~A1', count: '1,000 字', color: '#16a34a', desc: '日常生活、家庭學校、基礎動詞、顏色數字動物時間' },
  { id: 'jhs_2000', name: '🏫 國中會考 2,000 字', cefr: 'A1~B1', count: '2,000 字', color: '#0284c7', desc: '教育部常用 2,000 參考字彙、會考情境句、詞性與KK音標' },
  { id: 'shs_3000', name: '🎓 高中學測 3,000 字與片語', cefr: 'B1~B2', count: '3,000 字+片語', color: '#7c3aed', desc: '大考 4,500/7,000 核心詞、關鍵動詞片語與學術搭配詞' },
  { id: 'toeic', name: '💼 TOEIC 國際商務實戰', cefr: 'B2', count: '商務核心 1,500 字', color: '#d97706', desc: '商務會議、合約談判、採購預算、辦公通訊高頻詞' },
  { id: 'sat', name: '🏛️ Digital SAT 語境學術詞', cefr: 'B2~C1', count: '學術核心 1,200 字', color: '#4f46e5', desc: 'Words in Context、學術對比詞、歷史社會科學閱讀必背' },
  { id: 'gre', name: '🏛️ GRE Verbal 孿生詞群', cefr: 'C1~C2', count: '核心等價 1,500 詞', color: '#e11d48', desc: '句子等價題孿生詞對 (capricious/fickle 等)、哲學社科精微詞' },
  { id: 'gmat', name: '📊 GMAT 批判邏輯推理詞', cefr: 'C2', count: '邏輯分析 1,000 詞', color: '#0891b2', desc: 'Assumption, Weaken, Strengthen, Corroborate 等商業決策詞' }
];

// 精選高階與分級閃卡題庫（具代表性之完整示範庫，包含完整發音音節拆解、例句與自然拼讀記憶技巧）
export const FLASHCARD_DATABASE = [
  // 1. 小學基礎 1,000 (Elementary 1,000)
  {
    id: 'fc-el-01', tier: 'elem_1000', category: '學校日常 / School',
    word: 'student', chunk: 'stu - dent', ipa: '/ˈstjuː.dənt/', pos: 'n.', zh: '學生',
    collocation: 'elementary school student (小學生)',
    example: 'Every student in the classroom is reading a book.', exampleZh: '教室裡的每位學生都在看書。',
    memoryTip: 'stu (開音節長音 /juː/) + dent (弱讀 /dənt/)'
  },
  {
    id: 'fc-el-02', tier: 'elem_1000', category: '生活動詞 / Verbs',
    word: 'listen', chunk: 'lis - ten', ipa: '/ˈlɪs.ən/', pos: 'v.', zh: '聆聽、注意聽',
    collocation: 'listen to music (聽音樂)',
    example: 'Please listen to the teacher carefully.', exampleZh: '請專心聽老師說話。',
    memoryTip: 'lis (閉音節短音 /ɪ/) + ten (t 不發音，弱讀 /ən/)'
  },
  {
    id: 'fc-el-03', tier: 'elem_1000', category: '家庭與人物 / Family',
    word: 'family', chunk: 'fam - i - ly', ipa: '/ˈfæm.əl.i/', pos: 'n.', zh: '家庭、家人',
    collocation: 'family member (家庭成員)',
    example: 'I love having dinner with my family every evening.', exampleZh: '我喜歡每天傍晚和家人一起吃晚餐。',
    memoryTip: 'fam (/fæm/ 短母音 a) + 弱讀 /ə/ + ly (/li/)'
  },
  {
    id: 'fc-el-04', tier: 'elem_1000', category: '食物與飲料 / Food',
    word: 'breakfast', chunk: 'break - fast', ipa: '/ˈbrɛk.fəst/', pos: 'n.', zh: '早餐',
    collocation: 'have breakfast (吃早餐)',
    example: 'Eating a healthy breakfast gives you energy for the day.', exampleZh: '吃一頓健康的早餐能帶給你一整天的活力。',
    memoryTip: 'break (打破) + fast (禁食) ➔ 破除夜間禁食的早晨第一餐！'
  },
  {
    id: 'fc-el-05', tier: 'elem_1000', category: '形容詞與感受 / Feelings',
    word: 'happy', chunk: 'hap - py', ipa: '/ˈhæp.i/', pos: 'adj.', zh: '快樂的、高興的',
    collocation: 'happy birthday (生日快樂)',
    example: 'The children were very happy when they went to the zoo.', exampleZh: '孩子們去動物園時都非常開心。',
    memoryTip: 'hap (雙寫 p 閉音節發短音 /æ/) + py (結尾 y 發長音 /i/)'
  },
  {
    id: 'fc-el-06', tier: 'elem_1000', category: '自然與天氣 / Nature',
    word: 'weather', chunk: 'weath - er', ipa: '/ˈwɛð.ɚ/', pos: 'n.', zh: '天氣',
    collocation: 'sunny weather (晴朗的天氣)',
    example: 'The weather is warm and sunny today, perfect for a picnic.', exampleZh: '今天天氣溫暖晴朗，非常適合野餐。',
    memoryTip: 'ea 發短音 /ɛ/ + th 濁音 /ð/ + er 捲舌音 /ɚ/'
  },
  {
    id: 'fc-el-07', tier: 'elem_1000', category: '人際與朋友 / Social',
    word: 'friend', chunk: 'friend', ipa: '/frɛnd/', pos: 'n.', zh: '朋友',
    collocation: 'best friend (最好的朋友)',
    example: 'She has been my best friend since kindergarten.', exampleZh: '從幼兒園起她就是我最好的朋友。',
    memoryTip: 'ie 不規則發短母音 /ɛ/！記憶口訣：A friend to the end (朋友陪你走到 end)！'
  },
  {
    id: 'fc-el-08', tier: 'elem_1000', category: '場所與設施 / Places',
    word: 'library', chunk: 'li - brar - y', ipa: '/ˈlaɪ.brɛr.i/', pos: 'n.', zh: '圖書館',
    collocation: 'school library (學校圖書館)',
    example: 'We often borrow exciting storybooks from the school library.', exampleZh: '我們經常從學校圖書館借精彩的故事書。',
    memoryTip: 'li (開音節長音 /laɪ/) + brar (/brɛr/) + y (結尾發長音 /i/)'
  },

  // 2. 國中會考 2,000 (JHS 2,000)
  {
    id: 'fc-jh-01', tier: 'jhs_2000', category: '會考核心動詞 / Verbs',
    word: 'encourage', chunk: 'en - cour - age', ipa: '/ɪnˈkʌr.ɪdʒ/', pos: 'v.', zh: '鼓勵、激勵',
    collocation: 'encourage sb to V (鼓勵某人做…)',
    example: 'My English teacher always encourages us to speak bravely.', exampleZh: '我的英文老師總是鼓勵我們要勇敢開口說。',
    memoryTip: 'en- (使動字首) + courage (勇氣) ➔ 給予勇氣 ➔ 鼓勵！'
  },
  {
    id: 'fc-jh-02', tier: 'jhs_2000', category: '會考情境名詞 / Environment',
    word: 'environment', chunk: 'en - vi - ron - ment', ipa: '/ɪnˈvaɪ.rən.mənt/', pos: 'n.', zh: '環境、自然環境',
    collocation: 'protect the environment (保護環境)',
    example: 'Recycling plastic bottles is a good way to protect the environment.', exampleZh: '回收寶特瓶是保護環境的好方法。',
    memoryTip: 'vi 為開音節長音 /vaɪ/ + ron 弱讀 /rən/ + ment 名詞字尾'
  },
  {
    id: 'fc-jh-03', tier: 'jhs_2000', category: '會考核心副詞 / Connectors',
    word: 'however', chunk: 'how - ev - er', ipa: '/haʊˈɛv.ɚ/', pos: 'adv.', zh: '然而、不過',
    collocation: '轉折連接副詞：S + V. However, S + V.',
    example: 'He studied very hard; however, he did not pass the exam.', exampleZh: '他非常認真讀書，然而，他還是沒通過考試。',
    memoryTip: 'how (雙母音 /aʊ/) + ever (/ˈɛv.ɚ/ 捲舌 R 音)'
  },
  {
    id: 'fc-jh-04', tier: 'jhs_2000', category: '會考情緒與心理 / Psychology',
    word: 'nervous', chunk: 'ner - vous', ipa: '/ˈnɝː.vəs/', pos: 'adj.', zh: '緊張的、擔憂的',
    collocation: 'feel nervous about (對…感到緊張)',
    example: 'She felt nervous before giving the speech in front of the school.', exampleZh: '在全校面前發表演講前，她感到很緊張。',
    memoryTip: 'ner (Bossy R 發 /nɝː/) + vous (字尾 ous 弱讀為 /vəs/)'
  },
  {
    id: 'fc-jh-05', tier: 'jhs_2000', category: '會考溝通表達 / Expression',
    word: 'opinion', chunk: 'o - pin - ion', ipa: '/əˈpɪn.jən/', pos: 'n.', zh: '意見、看法',
    collocation: 'in my opinion (依我之見)',
    example: 'In my opinion, teamwork is more important than personal success.', exampleZh: '依我之見，團隊合作比個人成功更重要。',
    memoryTip: 'o (首音弱讀 Schwa /ə/) + pin (短音 /pɪn/) + ion (/jən/)'
  },
  {
    id: 'fc-jh-06', tier: 'jhs_2000', category: '生活機能與科技 / Lifestyle',
    word: 'convenient', chunk: 'con - ven - ient', ipa: '/kənˈviːn.jənt/', pos: 'adj.', zh: '便利的、方便的',
    collocation: 'convenient store / It is convenient to V (做…很方便)',
    example: 'Mass rapid transit makes traveling in Taipei extremely convenient.', exampleZh: '大眾捷運讓在台北市區通勤極為便利。',
    memoryTip: 'ven 音節發長母音 /viːn/ + ient 弱讀 /jənt/'
  },
  {
    id: 'fc-jh-07', tier: 'jhs_2000', category: '社會參與與奉獻 / Community',
    word: 'volunteer', chunk: 'vol - un - teer', ipa: '/ˌvɑː.lənˈtɪr/', pos: 'n. / v.', zh: '志工；自願去做',
    collocation: 'work as a volunteer (擔任志工)',
    example: 'Many junior high students volunteered to clean up the coast on Saturday.', exampleZh: '許多國中生週六自願到海岸淨灘。',
    memoryTip: '重音在最後音節 teer (母音團隊 ee 發長音 /ɪr/)'
  },
  {
    id: 'fc-jh-08', tier: 'jhs_2000', category: '文化與節慶 / Culture',
    word: 'celebrate', chunk: 'cel - e - brate', ipa: '/ˈsɛl.ə.breɪt/', pos: 'v.', zh: '慶祝、祝賀',
    collocation: 'celebrate the festival (慶祝節慶)',
    example: 'Families gather together to celebrate the Mid-Autumn Festival under the full moon.', exampleZh: '滿月之夜，全家人聚在一起慶祝中秋節。',
    memoryTip: '軟 C 規則：c 遇 e 發 /s/，brate 含有 Magic E (長音 /eɪt/)'
  },

  // 3. 高中學測 3,000 與核心動詞片語 (SHS 3,000 Vocab & Phrasal Verbs)
  {
    id: 'fc-sh-01', tier: 'shs_3000', category: '大考核心動詞片語 / Phrasal Verbs',
    word: 'come up with', chunk: 'come up with', ipa: '/kʌm ʌp wɪð/', pos: 'phr.', zh: '想出（主意、解決方案）',
    collocation: 'come up with an innovative solution (想出創新解決之道)',
    example: 'The engineering team came up with a brilliant plan to reduce carbon emissions.', exampleZh: '工程團隊想出了一個絕妙方案來減少碳排放。',
    memoryTip: '動詞片語三字組：come (來) + up (向上浮現) + with (帶著想法)'
  },
  {
    id: 'fc-sh-02', tier: 'shs_3000', category: '大考核心字彙 / Academic',
    word: 'contemporary', chunk: 'con - tem - po - rar - y', ipa: '/kənˈtɛm.pəˌrɛr.i/', pos: 'adj. / n.', zh: '當代的；同時代的人',
    collocation: 'contemporary society (當代社會)',
    example: 'Contemporary artists often use digital media to question traditional norms.', exampleZh: '當代藝術家經常使用數位媒材來質疑傳統規範。',
    memoryTip: 'con- (共同) + tempor (時間，如 tempo) + -ary (形容詞字尾)'
  },
  {
    id: 'fc-sh-03', tier: 'shs_3000', category: '大考高頻介系詞片語 / Idioms',
    word: 'take advantage of', chunk: 'take ad - van - tage of', ipa: '/teɪk ədˈvæn.tɪdʒ ʌv/', pos: 'phr.', zh: '利用、善用；佔…的便宜',
    collocation: 'take advantage of this precious opportunity (善用這次寶貴機會)',
    example: 'You should take advantage of the free workshops to improve your coding skills.', exampleZh: '你應該善用這些免費工作坊來提升你的寫程式技巧。',
    memoryTip: 'advantage (優勢) ➔ 抓取優勢 ➔ 善加利用'
  },
  {
    id: 'fc-sh-04', tier: 'shs_3000', category: '大考核心形容詞 / Quality',
    word: 'indispensable', chunk: 'in - dis - pen - sa - ble', ipa: '/ˌɪn.dɪˈspɛn.sə.bəl/', pos: 'adj.', zh: '不可或缺的、絕對必需的',
    collocation: 'an indispensable part of daily life (日常生活中不可或缺的一部分)',
    example: 'Clean drinking water is indispensable for human survival and public health.', exampleZh: '純淨飲用水對於人類生存與公共衛生而言是不可或缺的。',
    memoryTip: 'in- (不) + dispense (分發/省去) + -able (可…的) ➔ 無法省去的 ➔ 不可或缺的'
  },
  {
    id: 'fc-sh-05', tier: 'shs_3000', category: '大考核心動詞片語 / Phrasal Verbs',
    word: 'put up with', chunk: 'put up with', ipa: '/pʊt ʌp wɪð/', pos: 'phr.', zh: '忍受、容忍 (= tolerate / endure)',
    collocation: 'put up with the noisy neighbor (忍受吵鬧的鄰居)',
    example: 'She refused to put up with his rude behavior and left the meeting immediately.', exampleZh: '她拒絕容忍他粗魯的舉止，隨即離開了會議室。',
    memoryTip: 'put up (架起防線) + with (面對) ➔ 硬撐忍受'
  },
  {
    id: 'fc-sh-06', tier: 'shs_3000', category: '大考核心動詞 / Critical Thinking',
    word: 'distinguish', chunk: 'dis - tin - guish', ipa: '/dɪˈstɪŋ.ɡwɪʃ/', pos: 'v.', zh: '區分、辨別',
    collocation: 'distinguish between A and B / distinguish A from B',
    example: 'It is important for consumers to distinguish genuine reviews from sponsored ads.', exampleZh: '對消費者而言，區別真實評價與贊助廣告是非常重要的。',
    memoryTip: 'dis- (分開) + tinct/tinguish (刺/標記) ➔ 劃分記號 ➔ 辨識區分'
  },
  {
    id: 'fc-sh-07', tier: 'shs_3000', category: '永續發展與跨領域 / Sustainability',
    word: 'sustainable', chunk: 'sus - tain - a - ble', ipa: '/səˈsteɪ.nə.bəl/', pos: 'adj.', zh: '永續的、可持續發展的',
    collocation: 'sustainable development / sustainable energy (永續發展/能源)',
    example: 'Solar and wind power are key sources of sustainable green energy for the future.', exampleZh: '太陽能與風力是未來永續綠色能源的關鍵來源。',
    memoryTip: 'sus- (在下方) + tain (支撐/握住，如 retain) + -able ➔ 能在底層長久支撐的 ➔ 永續的'
  },
  {
    id: 'fc-sh-08', tier: 'shs_3000', category: '大考高頻動詞片語 / Phrasal Verbs',
    word: 'take for granted', chunk: 'take for gran - ted', ipa: '/teɪk fɔːr ˈɡræn.tɪd/', pos: 'phr.', zh: '視為理所當然',
    collocation: 'take sth for granted (把某事視為理所當然)',
    example: 'We must never take our clean water and natural resources for granted.', exampleZh: '我們絕不能將乾淨水源與自然資源視為理所當然。',
    memoryTip: 'grant (准許/賜予) ➔ 認為上天已經給定 ➔ 視為理所當然'
  },

  // 4. TOEIC 多益國際商務英語 (TOEIC Business)
  {
    id: 'fc-to-01', tier: 'toeic', category: '商務合約與談判 / Contracts',
    word: 'negotiation', chunk: 'ne - go - ti - a - tion', ipa: '/nɪˌɡoʊ.ʃiˈeɪ.ʃən/', pos: 'n.', zh: '談判、協商',
    collocation: 'contract negotiations (合約談判)',
    example: 'After weeks of intensive negotiations, both corporations finally signed the merger agreement.', exampleZh: '經過數週的密集協商，兩家企業終於簽署了合併協議。',
    memoryTip: 'ti 在母音前發軟音 /ʃi/，tion 發 /ʃən/'
  },
  {
    id: 'fc-to-02', tier: 'toeic', category: '公司運營與行程 / Operations',
    word: 'itinerary', chunk: 'i - tin - er - ar - y', ipa: '/aɪˈtɪn.ə.rɛr.i/', pos: 'n.', zh: '行程表、出差旅行計畫',
    collocation: 'flight itinerary (航班行程表)',
    example: 'The executive secretary distributed the detailed flight and hotel itinerary to all delegates.', exampleZh: '執行秘書將詳細的班機與飯店行程表發給所有代表。',
    memoryTip: 'itin- (走動/旅行，如 exit) + -ary (名詞，相關物品)'
  },
  {
    id: 'fc-to-03', tier: 'toeic', category: '財務與採購 / Finance',
    word: 'reimburse', chunk: 're - im - burse', ipa: '/ˌriː.ɪmˈbɜːrs/', pos: 'v.', zh: '核銷、補償、報銷款項',
    collocation: 'reimburse travel expenses (報銷出差費用)',
    example: 'Please retain all original receipts so the accounting department can reimburse your expenses.', exampleZh: '請保留所有原始收據，以便會計部門為您核銷差旅費用。',
    memoryTip: 're- (回) + im- (入) + purse (錢包) ➔ 把錢放回錢包 ➔ 報銷！'
  },
  {
    id: 'fc-to-04', tier: 'toeic', category: '策略與政策執行 / Execution',
    word: 'implement', chunk: 'im - ple - ment', ipa: '/ˈɪm.plə.mənt/', pos: 'v. / n.', zh: '實施、貫徹執行；工具',
    collocation: 'implement a new policy / protocol (實施新政策/規範)',
    example: 'The corporation will implement the upgraded cybersecurity protocol next Monday.', exampleZh: '該企業將於下週一實施升級後的網路安全規範。',
    memoryTip: 'im- (進入) + ple- (填滿，如 complete) ➔ 將方案填滿實行 ➔ 貫徹執行'
  },
  {
    id: 'fc-to-05', tier: 'toeic', category: '客戶接待與設施 / Hospitality',
    word: 'accommodate', chunk: 'ac - com - mo - date', ipa: '/əˈkɑː.mə.deɪt/', pos: 'v.', zh: '容納；迎合、配合（需求）',
    collocation: 'accommodate special requests / conference guests (配合特殊要求/容納賓客)',
    example: 'The Grand Ballroom can comfortably accommodate up to five hundred conference delegates.', exampleZh: '大宴會廳能舒適容納多達五百位會議代表。',
    memoryTip: '雙寫 c 與雙寫 m！date 有 Magic E 發長音 /eɪt/'
  },

  // 5. Digital SAT 語境學術詞 (SAT Contextual)
  {
    id: 'fc-sat-01', tier: 'sat', category: '語境詞義辨析 / Words in Context',
    word: 'corroborate', chunk: 'cor - rob - o - rate', ipa: '/kəˈrɒb.ə.reɪt/', pos: 'v.', zh: '證實、確證、提供客觀證據支持',
    collocation: 'corroborate the scientific hypothesis (證實該科學假說)',
    example: 'Subsequent archaeological excavations corroborated the historical accounts inscribed on the stone stele.', exampleZh: '隨後的考古發掘證實了石碑上銘刻的歷史記載。',
    memoryTip: 'cor- (加強) + robor (強壯/穩固，如 robust) + -ate (動詞) ➔ 使論據更穩固 ➔ 證實'
  },
  {
    id: 'fc-sat-02', tier: 'sat', category: '學術修辭與邏輯 / Rhetoric',
    word: 'anomalous', chunk: 'a - nom - a - lous', ipa: '/əˈnɒm.ə.ləs/', pos: 'adj.', zh: '異常的、不規則的、反常規的',
    collocation: 'anomalous experimental results (異常的實驗結果)',
    example: 'The astrophysicist detected an anomalous radiation surge that could not be explained by existing planetary models.', exampleZh: '該天文物理學家偵測到一次異常的輻射暴增，現存行星模型無法對其做出解釋。',
    memoryTip: 'a- (無/否定) + nomos (規則/法律) + -ous ➔ 不合常規的 ➔ 異常的'
  },
  {
    id: 'fc-sat-03', tier: 'sat', category: '論據與實證支持 / Empirical',
    word: 'substantiate', chunk: 'sub - stan - ti - ate', ipa: '/səbˈstæn.ʃi.eɪt/', pos: 'v.', zh: '證實、具體證明、以事實支持',
    collocation: 'substantiate the claim with empirical data (以經驗數據證實主張)',
    example: 'The research team provided rigorous statistical evidence to substantiate their controversial claim.', exampleZh: '研究團隊提供了嚴謹的統計證據來證實他們引發爭議的主張。',
    memoryTip: 'substance (實質/物質) ➔ 使論證具有實質佐證 ➔ 證實 (= corroborate)'
  },
  {
    id: 'fc-sat-04', tier: 'sat', category: '學術哲學與決策 / Pragmatism',
    word: 'pragmatic', chunk: 'prag - mat - ic', ipa: '/præɡˈmæt.ɪk/', pos: 'adj.', zh: '務實的、實踐導向的',
    collocation: 'a pragmatic approach / solution (務實的途徑/解決方案)',
    example: 'Instead of adhering to rigid ideological dogma, the committee adopted a pragmatic approach.', exampleZh: '委員會並未墨守僵化的意識形態教條，而是採取了務實的途徑。',
    memoryTip: 'prag- (行動/實踐，如 practice) + -ic (形容詞) ➔ 重視實踐結果的 ➔ 務實的'
  },

  // 6. GRE Verbal 核心等價孿生詞 (GRE Twin Synonyms)
  {
    id: 'fc-gre-01', tier: 'gre', category: '句子等價孿生詞對 / Volatility',
    word: 'capricious', chunk: 'ca - pri - cious', ipa: '/kəˈprɪʃ.əs/', pos: 'adj.', zh: '反覆無常的、善變任性的',
    collocation: 'capricious governance / capricious decision (任性無常的統治/裁決)',
    example: 'Throughout his volatile tenure, the monarch was notorious for his capricious governance.', exampleZh: '在動盪的任期中，該統治者以其反覆無常的治理風格而聲名狼藉。',
    memoryTip: '【GRE 孿生同義詞】：capricious = fickle！兩者在 GRE Sentence Equivalence 六選二中並列正解！'
  },
  {
    id: 'fc-gre-02', tier: 'gre', category: '句子等價孿生詞對 / Volatility',
    word: 'fickle', chunk: 'fick - le', ipa: '/ˈfɪk.əl/', pos: 'adj.', zh: '易變無常的、搖擺不定的',
    collocation: 'fickle fortune / fickle public sentiment (變幻莫測的命運/浮動的人心)',
    example: 'The autocratic ruler banishing allies on a whim proved his governance was utterly fickle.', exampleZh: '該專制統治者憑一時興致流放盟友，證明了其治理風格完全是反覆無常的。',
    memoryTip: '【搭配提示】：capricious governance 為政治專斷經典搭配；fickle 偏修飾情緒與命運。兩者在等價題為雙生同義詞！'
  },
  {
    id: 'fc-gre-03', tier: 'gre', category: '句子等價孿生詞對 / Difficulty',
    word: 'onerous', chunk: 'on - er - ous', ipa: '/ˈoʊ.nɚ.əs/', pos: 'adj.', zh: '繁重艱鉅的、沉重的',
    collocation: 'an onerous undertaking / task (極端繁重艱辛的事業/任務)',
    example: 'Translating fragmented cuneiform clay tablets proved to be an extraordinarily onerous undertaking.', exampleZh: '翻譯殘破的楔形文字泥板對學者而言被證明是一項極其繁重艱鉅的事業。',
    memoryTip: '【GRE 孿生同義詞】：onerous = burdensome (繁重的、沉重的)。源自拉丁語 onus (負擔)。'
  },
  {
    id: 'fc-gre-04', tier: 'gre', category: '句子等價孿生詞對 / Clarity',
    word: 'pellucid', chunk: 'pel - lu - cid', ipa: '/pəˈluː.sɪd/', pos: 'adj.', zh: '清晰透徹的、清澈明瞭的',
    collocation: 'pellucid exposition (清澈明白的論述說明)',
    example: 'The physicist was acclaimed for his pellucid exposition, reducing baffling equations into accessible concepts.', exampleZh: '該物理學家因其清晰透徹的論述而備受讚譽，將令人困惑的方程式化為淺白觀念。',
    memoryTip: '【GRE 孿生同義詞】：pellucid = limpid (清澈簡潔的)。pel- (透徹) + luc (光亮/清晰)。'
  },
  {
    id: 'fc-gre-05', tier: 'gre', category: '句子等價孿生詞對 / Mitigation',
    word: 'mitigate', chunk: 'mit - i - gate', ipa: '/ˈmɪt.ə.ɡeɪt/', pos: 'v.', zh: '緩和、減輕、緩解',
    collocation: 'mitigate climate change impact (緩和氣候變遷衝擊)',
    example: 'Urban reforestation projects are engineered to mitigate the severe urban heat island effect.', exampleZh: '都市重新造林計畫旨在緩解嚴重的都市熱島效應。',
    memoryTip: '【GRE 孿生同義詞】：mitigate = abate = attenuate = alleviate (減輕、緩和)。等價題極高頻！'
  },
  {
    id: 'fc-gre-06', tier: 'gre', category: '句子等價孿生詞對 / Transience',
    word: 'ephemeral', chunk: 'e - phem - er - al', ipa: '/ɪˈfɛm.ɚ.əl/', pos: 'adj.', zh: '短暫的、轉瞬即逝的',
    collocation: 'ephemeral fame / transient glory (轉瞬即逝的名氣/短暫的榮耀)',
    example: 'Viral internet celebrity often proves to be ephemeral, fading within a matter of weeks.', exampleZh: '網路爆紅的知名度往往被證明是轉瞬即逝的，幾週之內便煙消雲散。',
    memoryTip: '【GRE 孿生同義詞】：ephemeral = transient = evanescent (短暫的、朝生暮死的)。'
  },

  // 7. GMAT Focus 批判推理詞卡 (GMAT Critical Reasoning)
  {
    id: 'fc-gm-01', tier: 'gmat', category: '邏輯分析與論證前提 / Logic',
    word: 'assumption', chunk: 'as - sump - tion', ipa: '/əˈsʌmp.ʃən/', pos: 'n.', zh: '假設、不可或缺的未言明前提',
    collocation: 'underlying assumption (潛在的核心假設)',
    example: 'The argument relies on the critical assumption that consumer demand will not decline during the price hike.', exampleZh: '該論證依賴於一個關鍵假設：在價格調漲期間消費者需求不會下滑。',
    memoryTip: '【GMAT 解題密鑰】：否定測試法 (Negation Test)——若否定該選項後結論立即崩潰，則該選項必為 Necessary Assumption！'
  },
  {
    id: 'fc-gm-02', tier: 'gmat', category: '批判推理題型與削弱 / Weaken',
    word: 'weaken', chunk: 'weak - en', ipa: '/ˈwiː.kən/', pos: 'v.', zh: '削弱（論證的說服力）',
    collocation: 'weaken the argument / conclusion (削弱論點/結論)',
    example: 'Which of the following, if true, most seriously weakens the mayor\'s economic claim?', exampleZh: '下列何者若為真，最嚴重削弱了市長的經濟主張？',
    memoryTip: '【GMAT CR 核心題型】：削弱題——尋找引入他因 (Alternative Cause) 或打破因果必然性 (Severing Link) 之選項！'
  },
  {
    id: 'fc-gm-03', tier: 'gmat', category: '批判推理題型與加強 / Strengthen',
    word: 'strengthen', chunk: 'strength - en', ipa: '/ˈstrɛŋk.θən/', pos: 'v.', zh: '加強、支持（論證結論）',
    collocation: 'strengthen the conclusion (支持結論)',
    example: 'The consultant presented market survey data to strengthen the feasibility of the global expansion.', exampleZh: '顧問出示了市場調查數據以加強該全球擴張計畫的可行性。',
    memoryTip: '【GMAT CR 核心題型】：加強題——排除反因、證明因果無反例或提供支持證據！'
  }
];

// 閃卡互動內部狀態
let currentTier = 'elem_1000';
let currentCardIndex = 0;
let isFlipped = false;
let autoPlayInterval = null;
let isAutoPlaying = false;
let cardFilterStatus = 'all'; // 'all' | 'need_review' | 'mastered'
let cardSearchKeyword = '';

// 本機學習進度 (cardId -> 'mastered' | 'need_review')
const STORAGE_KEY = 'eq_flashcards_mastery_v1';
let masteryState = {};
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) masteryState = JSON.parse(saved);
} catch (e) {
  masteryState = {};
}

function saveMastery() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(masteryState));
  } catch (e) {}
}

// 取得當前篩選後的卡片清單
function getFilteredCards() {
  let list = FLASHCARD_DATABASE.filter(c => c.tier === currentTier);

  if (cardSearchKeyword) {
    const kw = cardSearchKeyword.toLowerCase();
    list = list.filter(c => c.word.toLowerCase().includes(kw) || c.zh.includes(kw) || c.category.toLowerCase().includes(kw));
  }

  if (cardFilterStatus === 'mastered') {
    list = list.filter(c => masteryState[c.id] === 'mastered');
  } else if (cardFilterStatus === 'need_review') {
    list = list.filter(c => masteryState[c.id] === 'need_review');
  }

  return list;
}

// 閃卡館主頁渲染函數
export function renderFlashcardsStudioView() {
  const tierInfo = FLASHCARD_TIERS.find(t => t.id === currentTier) || FLASHCARD_TIERS[0];
  const allTierCards = FLASHCARD_DATABASE.filter(c => c.tier === currentTier);
  const filteredCards = getFilteredCards();

  if (currentCardIndex >= filteredCards.length) {
    currentCardIndex = Math.max(0, filteredCards.length - 1);
  }

  const currentCard = filteredCards[currentCardIndex] || null;
  const isMastered = currentCard ? masteryState[currentCard.id] === 'mastered' : false;
  const isNeedReview = currentCard ? masteryState[currentCard.id] === 'need_review' : false;

  const totalTierMastered = allTierCards.filter(c => masteryState[c.id] === 'mastered').length;
  const masteryPercentage = allTierCards.length ? Math.round((totalTierMastered / allTierCards.length) * 100) : 0;

  return `
    <div class="header-block">
      <div class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700">🗂️ 全階記憶閃卡館 · 間隔複習與真人口說點讀</div>
      <h1 style="margin:8px 0;font-size:28px">多階層英語單字與核心片語記憶閃卡 (3D 翻轉·語音點讀)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px;line-height:1.6">
        依照程度科學分級：小學 1,000 字、國中會考 2,000 字、高中學測 3,000 字與核心動詞片語、TOEIC、Digital SAT、GRE 與 GMAT。
        每張卡片整合「自然拼讀拆解、KK音標、雙語例句、語用搭配與記憶技巧」，配備 🔊 真人發音與自動輪播背誦！
      </p>
    </div>

    <!-- 程度級別切換標籤條 (Tiers Tabs) -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:18px;scrollbar-width:thin">
      ${FLASHCARD_TIERS.map(t => {
        const isCur = t.id === currentTier;
        return `
          <button class="btn ${isCur ? 'primary' : 'quiet'}" data-fc-tier="${t.id}"
            style="white-space:nowrap;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:${isCur ? '700' : '500'};border:${isCur ? '2px solid #047857' : '1px solid #cbd5e1'}">
            ${t.name}
          </button>
        `;
      }).join('')}
    </div>

    <!-- 程度進度狀態欄 -->
    <div class="card" style="margin-bottom:20px;background:#f8fafc;border-left:5px solid ${tierInfo.color};padding:16px 20px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px">
        <div>
          <strong style="font-size:17px;color:#0f172a">${tierInfo.name}</strong>
          <span class="pill" style="font-size:12px;margin-left:8px;background:#fff;border:1px solid #cbd5e1;color:#475569">CEFR: ${tierInfo.cefr}</span>
          <div style="font-size:13px;color:#64748b;margin-top:2px">${tierInfo.desc}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:13px;color:#475569">
            已精熟：<strong style="color:#047857;font-size:16px">${totalTierMastered}</strong> / ${allTierCards.length} 張 (${masteryPercentage}%)
          </div>
        </div>
      </div>

      <!-- 進度條 -->
      <div style="width:100%;height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden">
        <div style="width:${masteryPercentage}%;height:100%;background:linear-gradient(90deg, #10b981 0%, #34d399 100%);transition:width 0.3s ease"></div>
      </div>
    </div>

    <!-- 篩選與搜尋工具列 -->
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px">
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn ${cardFilterStatus === 'all' ? 'primary' : 'quiet'}" data-fc-filter="all" style="font-size:13px;padding:6px 12px">
          全部卡片 (${allTierCards.length})
        </button>
        <button class="btn ${cardFilterStatus === 'need_review' ? 'primary' : 'quiet'}" data-fc-filter="need_review" style="font-size:13px;padding:6px 12px">
          🌱 需複習 (${allTierCards.filter(c => masteryState[c.id] === 'need_review').length})
        </button>
        <button class="btn ${cardFilterStatus === 'mastered' ? 'primary' : 'quiet'}" data-fc-filter="mastered" style="font-size:13px;padding:6px 12px">
          ✅ 已精熟 (${totalTierMastered})
        </button>
      </div>

      <div style="display:flex;gap:8px;align-items:center">
        <input type="text" id="fc-search-input" placeholder="🔍 搜尋單字或中文..." value="${esc(cardSearchKeyword)}"
          style="padding:8px 12px;border:1px solid #cbd5e1;border-radius:8px;font-size:13px;width:180px" />
        <button class="btn quiet" data-fc-shuffle="true" style="font-size:13px;padding:8px 12px" title="隨機洗牌重排順序">
          🔀 洗牌
        </button>
        <button class="btn ${isAutoPlaying ? 'primary' : 'quiet'}" data-fc-toggle-autoplay="true" style="font-size:13px;padding:8px 14px">
          ${isAutoPlaying ? '⏸ 停止輪播' : '▶ 自動輪播聽讀'}
        </button>
      </div>
    </div>

    <!-- 🎴 3D 記憶閃卡主舞台 -->
    ${currentCard ? `
      <div style="perspective:1000px;max-width:720px;margin:0 auto 24px">
        <div class="fc-card-stage" data-fc-flip="true"
          style="min-height:360px;position:relative;transform-style:preserve-3d;transition:transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;border-radius:18px;box-shadow:0 12px 30px -5px rgba(0,0,0,0.12);transform:${isFlipped ? 'rotateY(180deg)' : 'none'}">

          <!-- 卡片正面 (FRONT) -->
          <div class="fc-card-face fc-front"
            style="position:absolute;inset:0;background:#ffffff;border:2px solid ${isMastered ? '#10b981' : (isNeedReview ? '#f59e0b' : '#e2e8f0')};border-radius:18px;padding:32px 28px;display:flex;flex-direction:column;justify-content:space-between;backface-visibility:hidden;-webkit-backface-visibility:hidden">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
                <span class="pill" style="background:#eff6ff;color:#1e40af;font-size:12px;font-weight:700">${currentCard.category}</span>
                <span style="font-size:13px;color:#64748b">卡片 ${currentCardIndex + 1} / ${filteredCards.length}</span>
              </div>

              <!-- 單字與音節拆解 -->
              <div style="text-align:center;padding:24px 0 16px">
                <div style="font-size:42px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin-bottom:8px">
                  ${currentCard.word}
                </div>
                <div style="font-size:18px;font-weight:700;color:#2563eb;letter-spacing:1px;margin-bottom:6px">
                  ${currentCard.chunk}
                </div>
                <div style="font-size:16px;color:#64748b;font-family:monospace">
                  <span class="pill" style="background:#f1f5f9;color:#334155;font-weight:700;font-size:12px;margin-right:6px">${currentCard.pos}</span>
                  ${currentCard.ipa}
                </div>
              </div>
            </div>

            <!-- 正面底部：發音與翻面提示 -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:16px">
              <button class="btn primary" data-fc-speak-word="${esc(currentCard.word)}" style="padding:10px 20px;font-size:14px;font-weight:700;border-radius:10px">
                🔊 聆聽單字發音
              </button>
              <div style="font-size:13px;color:#94a3b8;display:flex;align-items:center;gap:4px">
                <span>🔄 點擊卡片翻轉查看中文與例句</span>
              </div>
            </div>
          </div>

          <!-- 卡片背面 (BACK) -->
          <div class="fc-card-face fc-back"
            style="position:absolute;inset:0;background:linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);border:2px solid #3b82f6;border-radius:18px;padding:30px 28px;display:flex;flex-direction:column;justify-content:space-between;transform:rotateY(180deg);backface-visibility:hidden;-webkit-backface-visibility:hidden">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <span class="pill" style="background:#ecfdf5;color:#047857;font-weight:700">${currentCard.pos} ${currentCard.word}</span>
                <span style="font-size:13px;color:#64748b">卡片 ${currentCardIndex + 1} / ${filteredCards.length}</span>
              </div>

              <!-- 中文釋義與搭配 -->
              <div style="margin-bottom:16px">
                <h2 style="margin:0 0 6px;font-size:26px;color:#047857">${currentCard.zh}</h2>
                ${currentCard.collocation ? `
                  <div style="font-size:13px;color:#b45309;background:#fef3c7;padding:6px 12px;border-radius:6px;display:inline-block;font-weight:600">
                    💡 必考搭配：${currentCard.collocation}
                  </div>
                ` : ''}
              </div>

              <!-- 雙語例句 -->
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px 16px;margin-bottom:14px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                  <div style="font-size:15px;color:#1e293b;line-height:1.5;font-weight:500" lang="en">
                    "${currentCard.example}"
                  </div>
                  <button class="btn small primary" data-fc-speak-sentence="${esc(currentCard.example)}" style="padding:4px 8px;font-size:12px;white-space:nowrap">
                    🔊 例句朗讀
                  </button>
                </div>
                <div style="font-size:13px;color:#64748b;margin-top:4px">
                  ${currentCard.exampleZh}
                </div>
              </div>

              <!-- 拼讀與記憶聯想技巧 -->
              ${currentCard.memoryTip ? `
                <div style="font-size:12px;color:#475569;background:#f1f5f9;padding:8px 12px;border-radius:8px;border-left:3px solid #10b981">
                  🧠 <strong>拼音記憶技巧：</strong>${currentCard.memoryTip}
                </div>
              ` : ''}
            </div>

            <!-- 背面底部：翻回正面按鈕 -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2e8f0;padding-top:14px">
              <span style="font-size:13px;color:#94a3b8">🔄 點擊卡片翻回正面</span>
              <button class="btn quiet small" data-fc-flip="true" style="padding:6px 12px">
                返回單字面
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 控制工具列：上一張、掌握標記、下一張 -->
      <div style="max-width:720px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <button class="btn" data-fc-prev="true" ${currentCardIndex === 0 ? 'disabled' : ''} style="padding:10px 20px;font-weight:700">
          ⬅ 上一張
        </button>

        <!-- 掌握狀態標記按鈕組 -->
        <div style="display:flex;gap:10px">
          <button class="btn ${isNeedReview ? 'secondary' : 'quiet'}" data-fc-mark="need_review"
            style="padding:10px 18px;font-size:14px;border:1px solid #f59e0b;color:${isNeedReview ? '#b45309' : '#d97706'};font-weight:700;background:${isNeedReview ? '#fef3c7' : '#fff'}">
            ${isNeedReview ? '🌱 標記為需加強 (已標記)' : '🌱 仍需複習'}
          </button>
          <button class="btn ${isMastered ? 'primary' : 'quiet'}" data-fc-mark="mastered"
            style="padding:10px 20px;font-size:14px;border:1px solid #10b981;color:${isMastered ? '#fff' : '#047857'};font-weight:700;background:${isMastered ? '#10b981' : '#fff'}">
            ${isMastered ? '✅ 已精熟掌握 (已標記)' : '✅ 標記已精熟'}
          </button>
        </div>

        <button class="btn primary" data-fc-next="true" ${currentCardIndex === filteredCards.length - 1 ? 'disabled' : ''} style="padding:10px 20px;font-weight:700">
          下一張 ➡
        </button>
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:50px 20px;max-width:600px;margin:0 auto">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <h3 style="margin:0 0 8px">該篩選條件下無符合卡片！</h3>
        <p style="color:var(--text-muted);font-size:14px;margin-bottom:16px">
          您可能已完成本分類下的所有卡片複習，或目前的搜尋條件無符合項目。
        </p>
        <button class="btn primary" data-fc-filter="all">重設篩選條件 (查看全部卡片)</button>
      </div>
    `}
  `;
}

// 閃卡事件處理
export function handleFlashcardEvents(target, renderCallback) {
  const d = target.dataset;

  // 切換級別
  if (d.fcTier) {
    currentTier = d.fcTier;
    currentCardIndex = 0;
    isFlipped = false;
    stopFlashcardAutoPlay();
    renderCallback();
    return true;
  }

  // 翻轉卡片
  if (d.fcFlip) {
    isFlipped = !isFlipped;
    renderCallback();
    return true;
  }

  // 發音單字
  if (d.fcSpeakWord) {
    playWord(d.fcSpeakWord, false);
    return true;
  }

  // 發音例句
  if (d.fcSpeakSentence) {
    playSentence(d.fcSpeakSentence, false);
    return true;
  }

  // 上一張卡片
  if (d.fcPrev) {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      isFlipped = false;
      renderCallback();
    }
    return true;
  }

  // 下一張卡片
  if (d.fcNext) {
    const list = getFilteredCards();
    if (currentCardIndex < list.length - 1) {
      currentCardIndex++;
      isFlipped = false;
      renderCallback();
    }
    return true;
  }

  // 標記掌握狀態
  if (d.fcMark) {
    const list = getFilteredCards();
    const card = list[currentCardIndex];
    if (card) {
      if (masteryState[card.id] === d.fcMark) {
        delete masteryState[card.id];
      } else {
        masteryState[card.id] = d.fcMark;
      }
      saveMastery();
      renderCallback();
    }
    return true;
  }

  // 切換卡片篩選 (all, need_review, mastered)
  if (d.fcFilter) {
    cardFilterStatus = d.fcFilter;
    currentCardIndex = 0;
    isFlipped = false;
    renderCallback();
    return true;
  }

  // 洗牌隨機重排
  if (d.fcShuffle) {
    const list = getFilteredCards();
    if (list.length > 1) {
      currentCardIndex = Math.floor(Math.random() * list.length);
      isFlipped = false;
      renderCallback();
    }
    return true;
  }

  // 切換自動輪播
  if (d.fcToggleAutoplay) {
    if (isAutoPlaying) {
      stopFlashcardAutoPlay();
    } else {
      startFlashcardAutoPlay(renderCallback);
    }
    renderCallback();
    return true;
  }

  return false;
}

// 自動輪播聽讀定時器
function startFlashcardAutoPlay(renderCallback) {
  stopFlashcardAutoPlay();
  isAutoPlaying = true;

  autoPlayInterval = setInterval(() => {
    const list = getFilteredCards();
    if (!list.length) return;

    const card = list[currentCardIndex];
    if (!card) return;

    if (!isFlipped) {
      // 朗讀單字，隨後翻面
      playWord(card.word, false, {
        onEnd: () => {
          setTimeout(() => {
            isFlipped = true;
            renderCallback();
            // 朗讀例句
            playSentence(card.example);
          }, 800);
        }
      });
    } else {
      // 已經在背面，翻回正面並切換下一張
      isFlipped = false;
      if (currentCardIndex < list.length - 1) {
        currentCardIndex++;
      } else {
        currentCardIndex = 0;
      }
      renderCallback();
      const nextCard = list[currentCardIndex];
      if (nextCard) {
        playWord(nextCard.word);
      }
    }
  }, 4500);
}

function stopFlashcardAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
  isAutoPlaying = false;
  stopAudio();
}

export function handleFlashcardInput(target, renderCallback) {
  if (target && target.id === 'fc-search-input') {
    cardSearchKeyword = target.value;
    currentCardIndex = 0;
    renderCallback();
    return true;
  }
  return false;
}

