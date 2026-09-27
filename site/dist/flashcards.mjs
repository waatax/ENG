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
  { id: 'elem_1000', name: '🎒 國小示範卡', cefr: 'Pre-A1~A1', count: '1,000 字', color: '#16a34a', desc: '日常生活、家庭學校、基礎動詞、顏色數字動物時間' },
  { id: 'jhs_2000', name: '🏫 國中示範卡', cefr: 'A1~B1', count: '2,000 字', color: '#0284c7', desc: '教育部常用 2,000 參考字彙、會考情境句、詞性與KK音標' },
  { id: 'shs_3000', name: '🎓 高中詞彙示範卡', cefr: 'B1~B2', count: '3,000 字+片語', color: '#7c3aed', desc: '大考 4,500/7,000 核心詞、關鍵動詞片語與學術搭配詞' },
  { id: 'toeic', name: '💼 TOEIC 國際商務實戰', cefr: 'B2', count: '商務核心 1,500 字', color: '#d97706', desc: '商務會議、合約談判、採購預算、辦公通訊高頻詞' },
  { id: 'sat', name: '🏛️ Digital SAT 語境學術詞', cefr: 'B2~C1', count: '學術核心 1,200 字', color: '#4f46e5', desc: 'Words in Context、學術對比詞、歷史社會科學閱讀必背' },
  { id: 'gre', name: '🏛️ GRE Verbal 孿生詞群', cefr: 'C1~C2', count: '核心等價 1,500 詞', color: '#e11d48', desc: '句子等價題孿生詞對 (capricious/fickle 等)、哲學社科精微詞' },
  { id: 'gmat', name: '📊 GMAT 批判邏輯推理詞', cefr: 'C2', count: '邏輯分析 1,000 詞', color: '#0891b2', desc: 'Assumption, Weaken, Strengthen, Corroborate 等商業決策詞' }
];

// 精選高階與分級閃卡題庫（具代表性之完整示範庫，包含完整發音音節拆解、例句與自然拼讀記憶技巧）
export const FLASHCARD_DATABASE = [
  // 1. 國小基礎 1,000 (Elementary 1,000)
  {
    id: "fc-el-001", tier: "elem_1000", category: "家庭與身分",
    word: "family", chunk: "fam - i - ly", ipa: "/\u02c8f\u00e6m.\u0259l.i/", pos: "n.", zh: "家庭、家人",
    collocation: "family member (家庭成員)",
    example: "I love eating dinner with my family every evening.", exampleZh: "我喜歡每天傍晚和家人一起吃晚餐。",
    memoryTip: "fam (/fæm/ 短母音 a) + 弱讀 /ə/ + ly (/li/)"
  },
  {
    id: "fc-el-002", tier: "elem_1000", category: "家庭與身分",
    word: "father", chunk: "fa - ther", ipa: "/\u02c8f\u0251\u02d0.\u00f0\u025a/", pos: "n.", zh: "父親、爸爸",
    collocation: "my father",
    example: "My father drives me to school every morning.", exampleZh: "我爸爸每天早晨開車載我上學。",
    memoryTip: "th 發濁音 /ð/ + er 捲舌音 /ɚ/"
  },
  {
    id: "fc-el-003", tier: "elem_1000", category: "家庭與身分",
    word: "mother", chunk: "moth - er", ipa: "/\u02c8m\u028c\u00f0.\u025a/", pos: "n.", zh: "母親、媽媽",
    collocation: "working mother (職業婦女)",
    example: "Her mother is a very kind and caring doctor.", exampleZh: "她媽媽是一位非常仁慈有愛心的醫生。",
    memoryTip: "o 發短母音 /ʌ/，th 發濁音 /ð/"
  },
  {
    id: "fc-el-004", tier: "elem_1000", category: "家庭與身分",
    word: "parent", chunk: "par - ent", ipa: "/\u02c8p\u025br.\u0259nt/", pos: "n.", zh: "雙親之一、父母親",
    collocation: "parents (雙親)",
    example: "Both of my parents enjoy gardening on weekends.", exampleZh: "我父母週末都很喜歡從事園藝。",
    memoryTip: "par 發 /pɛr/ + ent 弱讀 /ənt/"
  },
  {
    id: "fc-el-005", tier: "elem_1000", category: "家庭與身分",
    word: "brother", chunk: "broth - er", ipa: "/\u02c8br\u028c\u00f0.\u025a/", pos: "n.", zh: "哥哥、弟弟",
    collocation: "older brother (哥哥)",
    example: "My brother plays basketball with his friends.", exampleZh: "我哥哥經常和他的朋友打籃球。",
    memoryTip: "broth 發 /brʌð/ + er /ɚ/"
  },
  {
    id: "fc-el-006", tier: "elem_1000", category: "家庭與身分",
    word: "sister", chunk: "sis - ter", ipa: "/\u02c8s\u026as.t\u025a/", pos: "n.", zh: "姊姊、妹妹",
    collocation: "younger sister (妹妹)",
    example: "Her sister is practicing the piano in the room.", exampleZh: "她妹妹正在房間裡練鋼琴。",
    memoryTip: "sis 閉音節短音 /ɪ/ + ter /tɚ/"
  },
  {
    id: "fc-el-007", tier: "elem_1000", category: "家庭與身分",
    word: "grandfather", chunk: "grand - fa - ther", ipa: "/\u02c8\u0261r\u00e6nd\u02ccf\u0251\u02d0.\u00f0\u025a/", pos: "n.", zh: "祖父、爺爺、外公",
    collocation: "visit grandfather",
    example: "We visit grandfather every Sunday afternoon.", exampleZh: "我們每週日下午探望祖父。",
    memoryTip: "grand (宏大的/長輩) + father"
  },
  {
    id: "fc-el-008", tier: "elem_1000", category: "家庭與身分",
    word: "grandmother", chunk: "grand - moth - er", ipa: "/\u02c8\u0261r\u00e6nd\u02ccm\u028c\u00f0.\u025a/", pos: "n.", zh: "祖母、奶奶、外婆",
    collocation: "grandmother's cookies",
    example: "Grandmother makes the most delicious apple pie.", exampleZh: "奶奶做的蘋果派是最好吃的。",
    memoryTip: "grand + mother"
  },
  {
    id: "fc-el-009", tier: "elem_1000", category: "家庭與身分",
    word: "uncle", chunk: "un - cle", ipa: "/\u02c8\u028c\u014b.k\u0259l/", pos: "n.", zh: "伯父、叔父、舅舅",
    collocation: "my uncle",
    example: "My uncle brought me a model airplane from Tokyo.", exampleZh: "我叔叔從東京帶了一架模型飛機給我。",
    memoryTip: "un 發 /ʌŋ/ + cle 發成音節 /kəl/"
  },
  {
    id: "fc-el-010", tier: "elem_1000", category: "家庭與身分",
    word: "aunt", chunk: "aunt", ipa: "/\u00e6nt/", pos: "n.", zh: "姑母、伯母、阿姨",
    collocation: "Aunt Mary",
    example: "Aunt Mary teaches art at an elementary school.", exampleZh: "瑪麗阿姨在國小教美術。",
    memoryTip: "au 發短母音 /æ/ (同 ant 音)"
  },
  {
    id: "fc-el-011", tier: "elem_1000", category: "家庭與身分",
    word: "cousin", chunk: "cous - in", ipa: "/\u02c8k\u028cz.\u0259n/", pos: "n.", zh: "堂表兄弟姊妹",
    collocation: "play with cousins",
    example: "I played video games with my cousin yesterday.", exampleZh: "我昨天和我表哥一起玩電玩。",
    memoryTip: "ou 發短母音 /ʌ/ + sin 弱讀 /zən/"
  },
  {
    id: "fc-el-012", tier: "elem_1000", category: "家庭與身分",
    word: "son", chunk: "son", ipa: "/s\u028cn/", pos: "n.", zh: "兒子",
    collocation: "only son (獨生子)",
    example: "Mr. Lin is very proud of his eldest son.", exampleZh: "林先生對他的大兒子感到非常驕傲。",
    memoryTip: "同音字：sun (太陽)！發音皆為 /sʌn/"
  },
  {
    id: "fc-el-013", tier: "elem_1000", category: "家庭與身分",
    word: "daughter", chunk: "daugh - ter", ipa: "/\u02c8d\u0254\u02d0.t\u025a/", pos: "n.", zh: "女兒",
    collocation: "beloved daughter",
    example: "Their daughter won first prize in the speech contest.", exampleZh: "他們的女兒在演講比賽中贏得第一名。",
    memoryTip: "augh 發長母音 /ɔː/，gh 不發音"
  },
  {
    id: "fc-el-014", tier: "elem_1000", category: "家庭與身分",
    word: "baby", chunk: "ba - by", ipa: "/\u02c8be\u026a.bi/", pos: "n.", zh: "嬰兒、小寶寶",
    collocation: "baby brother",
    example: "The baby is sleeping peacefully in the crib.", exampleZh: "小寶寶在嬰兒床裡安靜地睡著。",
    memoryTip: "開音節 ba 發長音 /beɪ/ + by 發 /bi/"
  },
  {
    id: "fc-el-015", tier: "elem_1000", category: "家庭與身分",
    word: "child", chunk: "child", ipa: "/t\u0283a\u026ald/", pos: "n.", zh: "兒童、小孩 (單數)",
    collocation: "only child",
    example: "Every child has the right to receive an education.", exampleZh: "每個孩子都有接受教育的權利。",
    memoryTip: "ch 發 /tʃ/ + ild 發長音 /aɪld/"
  },
  {
    id: "fc-el-016", tier: "elem_1000", category: "家庭與身分",
    word: "children", chunk: "chil - dren", ipa: "/\u02c8t\u0283\u026al.dr\u0259n/", pos: "n.", zh: "兒童、孩子們 (複數)",
    collocation: "children's playground",
    example: "The children are playing hide-and-seek in the park.", exampleZh: "孩子們正在公園裡玩捉迷藏。",
    memoryTip: "不規則複數：child (/aɪ/) ➔ children (/ɪ/)"
  },
  {
    id: "fc-el-017", tier: "elem_1000", category: "家庭與身分",
    word: "friend", chunk: "friend", ipa: "/fr\u025bnd/", pos: "n.", zh: "朋友",
    collocation: "best friend",
    example: "A true friend is always there when you need help.", exampleZh: "真正的朋友在你需要幫助時總會陪伴在旁。",
    memoryTip: "ie 不規則發短母音 /ɛ/！A friend to the end"
  },
  {
    id: "fc-el-018", tier: "elem_1000", category: "家庭與身分",
    word: "neighbor", chunk: "neigh - bor", ipa: "/\u02c8ne\u026a.b\u025a/", pos: "n.", zh: "鄰居",
    collocation: "friendly neighbor",
    example: "Our neighbor helped us water the plants during our vacation.", exampleZh: "我們度假期間鄰居幫忙替盆栽澆水。",
    memoryTip: "eigh 發長母音 /eɪ/，gh 不發音"
  },
  {
    id: "fc-el-019", tier: "elem_1000", category: "家庭與身分",
    word: "person", chunk: "per - son", ipa: "/\u02c8p\u025d\u02d0.s\u0259n/", pos: "n.", zh: "人、個人",
    collocation: "kind person",
    example: "She is a very polite and trustworthy person.", exampleZh: "她是一位非常有禮貌且值得信賴的人。",
    memoryTip: "per 捲舌音 /pɝː/ + son 弱讀 /sən/"
  },
  {
    id: "fc-el-020", tier: "elem_1000", category: "家庭與身分",
    word: "people", chunk: "peo - ple", ipa: "/\u02c8pi\u02d0.p\u0259l/", pos: "n.", zh: "人們 (複數)",
    collocation: "many people",
    example: "Many people gathered in the town square for the festival.", exampleZh: "許多人聚集在鎮上的廣場慶祝節慶。",
    memoryTip: "eo 發長母音 /iː/，ple 發成音節 /pəl/"
  },
  {
    id: "fc-el-021", tier: "elem_1000", category: "學校與教室",
    word: "school", chunk: "school", ipa: "/sku\u02d0l/", pos: "n.", zh: "學校",
    collocation: "go to school (上學)",
    example: "We walk to school together every morning.", exampleZh: "我們每天早晨一同走路去上學。",
    memoryTip: "sch 發 /sk/ + oo 發長音 /uː/"
  },
  {
    id: "fc-el-022", tier: "elem_1000", category: "學校與教室",
    word: "classroom", chunk: "class - room", ipa: "/\u02c8kl\u00e6s.ru\u02d0m/", pos: "n.", zh: "教室",
    collocation: "clean the classroom",
    example: "Please keep the classroom clean and tidy.", exampleZh: "請保持教室乾淨整潔。",
    memoryTip: "class (班級) + room (房間)"
  },
  {
    id: "fc-el-023", tier: "elem_1000", category: "學校與教室",
    word: "teacher", chunk: "teach - er", ipa: "/\u02c8ti\u02d0.t\u0283\u025a/", pos: "n.", zh: "老師、教師",
    collocation: "English teacher",
    example: "Our English teacher explains grammar very clearly.", exampleZh: "我們的英文老師文法解釋得非常清楚。",
    memoryTip: "teach (教) + -er (人) ➔ 老師"
  },
  {
    id: "fc-el-024", tier: "elem_1000", category: "學校與教室",
    word: "student", chunk: "stu - dent", ipa: "/\u02c8stju\u02d0.d\u0259nt/", pos: "n.", zh: "學生",
    collocation: "good student",
    example: "The student raised her hand to ask a question.", exampleZh: "那名學生舉手發問。",
    memoryTip: "stu 開音節 /stjuː/ + dent 弱讀 /dənt/"
  },
  {
    id: "fc-el-025", tier: "elem_1000", category: "學校與教室",
    word: "classmate", chunk: "class - mate", ipa: "/\u02c8kl\u00e6s.me\u026at/", pos: "n.", zh: "同班同學",
    collocation: "friendly classmate",
    example: "Tom and I have been classmates for three years.", exampleZh: "湯姆和我當同班同學已經三年了。",
    memoryTip: "class (班級) + mate (夥伴) ➔ 同學"
  },
  {
    id: "fc-el-026", tier: "elem_1000", category: "學校與教室",
    word: "blackboard", chunk: "black - board", ipa: "/\u02c8bl\u00e6k.b\u0254\u02d0rd/", pos: "n.", zh: "黑板",
    collocation: "write on the blackboard",
    example: "The teacher wrote new words on the blackboard.", exampleZh: "老師把生字寫在黑板上。",
    memoryTip: "black (黑) + board (板)"
  },
  {
    id: "fc-el-027", tier: "elem_1000", category: "學校與教室",
    word: "desk", chunk: "desk", ipa: "/d\u025bsk/", pos: "n.", zh: "書桌、辦公桌",
    collocation: "sit at the desk",
    example: "Put your textbooks on the desk, please.", exampleZh: "請把課本放在書桌上。",
    memoryTip: "CVC 結構，e 發短音 /ɛ/"
  },
  {
    id: "fc-el-028", tier: "elem_1000", category: "學校與教室",
    word: "chair", chunk: "chair", ipa: "/t\u0283\u025br/", pos: "n.", zh: "椅子",
    collocation: "sit on a chair",
    example: "He pulled out a chair and sat down quietly.", exampleZh: "他拉開椅子安靜地坐下。",
    memoryTip: "air 發 /ɛr/，ch 發 /tʃ/"
  },
  {
    id: "fc-el-029", tier: "elem_1000", category: "學校與教室",
    word: "pencil", chunk: "pen - cil", ipa: "/\u02c8p\u025bn.s\u0259l/", pos: "n.", zh: "鉛筆",
    collocation: "sharpen a pencil",
    example: "I need a pencil to finish my math homework.", exampleZh: "我需要一隻鉛筆來完成我的數學作業。",
    memoryTip: "pen + cil (c 在 i 前發軟音 /s/)"
  },
  {
    id: "fc-el-030", tier: "elem_1000", category: "學校與教室",
    word: "pen", chunk: "pen", ipa: "/p\u025bn/", pos: "n.", zh: "原子筆、鋼筆",
    collocation: "blue pen",
    example: "Sign your name with a black or blue pen.", exampleZh: "請用黑色或藍色原子筆簽名。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-031", tier: "elem_1000", category: "學校與教室",
    word: "eraser", chunk: "e - ras - er", ipa: "/\u026a\u02c8re\u026a.s\u025a/", pos: "n.", zh: "橡皮擦",
    collocation: "use an eraser",
    example: "Can I borrow your eraser for a minute?", exampleZh: "我可以借用一下你的橡皮擦嗎？",
    memoryTip: "erase (擦掉) + -er (工具)"
  },
  {
    id: "fc-el-032", tier: "elem_1000", category: "學校與教室",
    word: "ruler", chunk: "rul - er", ipa: "/\u02c8ru\u02d0.l\u025a/", pos: "n.", zh: "尺、直尺",
    collocation: "draw lines with a ruler",
    example: "Use a ruler to draw a straight line.", exampleZh: "請用直尺畫出一條直線。",
    memoryTip: "rule (規則/丈量) + -er"
  },
  {
    id: "fc-el-033", tier: "elem_1000", category: "學校與教室",
    word: "notebook", chunk: "note - book", ipa: "/\u02c8no\u028at.b\u028ak/", pos: "n.", zh: "筆記本",
    collocation: "take notes in a notebook",
    example: "Write down the important rules in your notebook.", exampleZh: "把重要的規則記在筆記本裡。",
    memoryTip: "note (筆記) + book (書本)"
  },
  {
    id: "fc-el-034", tier: "elem_1000", category: "學校與教室",
    word: "textbook", chunk: "text - book", ipa: "/\u02c8t\u025bkst.b\u028ak/", pos: "n.", zh: "課本、教科書",
    collocation: "open the textbook",
    example: "Please turn to page twenty-five in your textbook.", exampleZh: "請翻開課本第二十五頁。",
    memoryTip: "text (課文) + book (書籍)"
  },
  {
    id: "fc-el-035", tier: "elem_1000", category: "學校與教室",
    word: "backpack", chunk: "back - pack", ipa: "/\u02c8b\u00e6k.p\u00e6k/", pos: "n.", zh: "雙肩後背包、書包",
    collocation: "carry a backpack",
    example: "Her backpack was filled with interesting books.", exampleZh: "她的後背包裝滿了有趣的書籍。",
    memoryTip: "back (背部) + pack (包裹)"
  },
  {
    id: "fc-el-036", tier: "elem_1000", category: "學校與教室",
    word: "homework", chunk: "home - work", ipa: "/\u02c8ho\u028am.w\u025d\u02d0k/", pos: "n.", zh: "家庭作業 (不可數)",
    collocation: "do homework (寫作業)",
    example: "I always finish my homework before having dinner.", exampleZh: "我總是在吃晚餐前完成作業。",
    memoryTip: "home (家) + work (功課)，注意不可數！"
  },
  {
    id: "fc-el-037", tier: "elem_1000", category: "學校與教室",
    word: "lesson", chunk: "les - son", ipa: "/\u02c8l\u025bs.\u0259n/", pos: "n.", zh: "課、課程",
    collocation: "English lesson",
    example: "Today's lesson focuses on present perfect tense.", exampleZh: "今天的課程聚焦在現在完成式。",
    memoryTip: "雙寫 s，les 發 /lɛs/ + son 弱讀 /ən/"
  },
  {
    id: "fc-el-038", tier: "elem_1000", category: "學校與教室",
    word: "library", chunk: "li - brar - y", ipa: "/\u02c8la\u026a.br\u025br.i/", pos: "n.", zh: "圖書館",
    collocation: "borrow books from the library",
    example: "Students are studying quietly in the school library.", exampleZh: "學生們正在學校圖書館裡安靜地讀書。",
    memoryTip: "li 發 /laɪ/ + brary 發 /brɛr.i/"
  },
  {
    id: "fc-el-039", tier: "elem_1000", category: "學校與教室",
    word: "playground", chunk: "play - ground", ipa: "/\u02c8ple\u026a.\u0261ra\u028and/", pos: "n.", zh: "操場、遊戲場",
    collocation: "run on the playground",
    example: "Children love running around on the playground during recess.", exampleZh: "下課時孩子們喜歡在操場上奔跑。",
    memoryTip: "play (玩耍) + ground (場地)"
  },
  {
    id: "fc-el-040", tier: "elem_1000", category: "學校與教室",
    word: "question", chunk: "ques - tion", ipa: "/\u02c8kw\u025bs.t\u0283\u0259n/", pos: "n.", zh: "問題、疑問",
    collocation: "ask a question",
    example: "Raise your hand if you know the answer to the question.", exampleZh: "如果你知道這個問題的答案請舉手。",
    memoryTip: "ques 發 /kwɛs/ + tion 在 s 後發 /tʃən/"
  },
  {
    id: "fc-el-041", tier: "elem_1000", category: "學校與教室",
    word: "answer", chunk: "an - swer", ipa: "/\u02c8\u00e6n.s\u025a/", pos: "n. / v.", zh: "回答、答案",
    collocation: "answer the question",
    example: "She knew the correct answer to the math problem.", exampleZh: "她知道這道數學題的正確答案。",
    memoryTip: "w 不發音！an 發 /æn/ + swer 發 /sɚ/"
  },
  {
    id: "fc-el-042", tier: "elem_1000", category: "日常動作與作息",
    word: "listen", chunk: "lis - ten", ipa: "/\u02c8l\u026as.\u0259n/", pos: "v.", zh: "聆聽、注意聽",
    collocation: "listen to music",
    example: "Please listen carefully to the speaker.", exampleZh: "請專心聆聽發言者的內容。",
    memoryTip: "t 不發音，lis 短音 /ɪ/ + ten 弱讀 /ən/"
  },
  {
    id: "fc-el-043", tier: "elem_1000", category: "日常動作與作息",
    word: "speak", chunk: "speak", ipa: "/spi\u02d0k/", pos: "v.", zh: "講話、說（語言）",
    collocation: "speak English",
    example: "Can you speak English fluently?", exampleZh: "你能流利地說英文嗎？",
    memoryTip: "ea 字母組合發長音 /iː/"
  },
  {
    id: "fc-el-044", tier: "elem_1000", category: "日常動作與作息",
    word: "read", chunk: "read", ipa: "/ri\u02d0d/", pos: "v.", zh: "閱讀、朗讀",
    collocation: "read a book",
    example: "I like to read storybooks before going to sleep.", exampleZh: "我喜歡在睡前閱讀故事書。",
    memoryTip: "現在式發長音 /iː/，過去式 read 發短音 /ɛ/！"
  },
  {
    id: "fc-el-045", tier: "elem_1000", category: "日常動作与作息",
    word: "write", chunk: "write", ipa: "/ra\u026at/", pos: "v.", zh: "書寫、寫信",
    collocation: "write a letter",
    example: "She writes a diary entry every single night.", exampleZh: "她每晚都會寫一篇日記。",
    memoryTip: "w 不發音，Magic E 使 i 發長音 /aɪ/"
  },
  {
    id: "fc-el-046", tier: "elem_1000", category: "日常動作與作息",
    word: "wash", chunk: "wash", ipa: "/w\u0251\u02d0\u0283/", pos: "v.", zh: "清洗、洗滌",
    collocation: "wash your hands",
    example: "Always wash your hands before eating snacks.", exampleZh: "吃點心前務必記得洗手。",
    memoryTip: "sh 發軟音 /ʃ/，a 發短音 /ɑː/"
  },
  {
    id: "fc-el-047", tier: "elem_1000", category: "日常動作與作息",
    word: "brush", chunk: "brush", ipa: "/br\u028c\u0283/", pos: "v. / n.", zh: "刷（牙）、刷子",
    collocation: "brush teeth (刷牙)",
    example: "Remember to brush your teeth twice a day.", exampleZh: "記得每天要刷兩次牙。",
    memoryTip: "u 發短母音 /ʌ/，sh 發 /ʃ/"
  },
  {
    id: "fc-el-048", tier: "elem_1000", category: "日常動作與作息",
    word: "cook", chunk: "cook", ipa: "/k\u028ak/", pos: "v. / n.", zh: "烹飪、煮飯；廚師",
    collocation: "cook dinner",
    example: "Dad loves to cook delicious meals for the family.", exampleZh: "爸爸很喜歡為家人煮美味的餐點。",
    memoryTip: "oo 發短母音 /ʊ/ (同 book, look)"
  },
  {
    id: "fc-el-049", tier: "elem_1000", category: "日常動作與作息",
    word: "clean", chunk: "clean", ipa: "/kli\u02d0n/", pos: "v. / adj.", zh: "打掃；乾淨的",
    collocation: "clean the room",
    example: "We cleaned our bedroom together on Saturday.", exampleZh: "我們週六一起把臥室打掃乾淨。",
    memoryTip: "ea 字母組合發長母音 /iː/"
  },
  {
    id: "fc-el-050", tier: "elem_1000", category: "日常動作與作息",
    word: "sleep", chunk: "sleep", ipa: "/sli\u02d0p/", pos: "v. / n.", zh: "睡覺；睡眠",
    collocation: "go to sleep",
    example: "Children should sleep for at least eight hours.", exampleZh: "孩子們每天應該至少睡足八小時。",
    memoryTip: "ee 雙字母發長母音 /iː/"
  },
  {
    id: "fc-el-051", tier: "elem_1000", category: "日常動作與作息",
    word: "wake", chunk: "wake", ipa: "/we\u026ak/", pos: "v.", zh: "醒來、叫醒",
    collocation: "wake up early",
    example: "I usually wake up at six thirty in the morning.", exampleZh: "我通常早上六點半醒來。",
    memoryTip: "Magic E 使 a 發長母音 /eɪ/"
  },
  {
    id: "fc-el-052", tier: "elem_1000", category: "日常動作與作息",
    word: "walk", chunk: "walk", ipa: "/w\u0254\u02d0k/", pos: "v. / n.", zh: "走路、散步",
    collocation: "take a walk",
    example: "Let's take a walk in the park after dinner.", exampleZh: "我們晚餐後去公園散個步吧。",
    memoryTip: "l 不發音！al 發長音 /ɔːk/"
  },
  {
    id: "fc-el-053", tier: "elem_1000", category: "日常動作與作息",
    word: "run", chunk: "run", ipa: "/r\u028cn/", pos: "v.", zh: "奔跑、跑步",
    collocation: "run fast",
    example: "The cheetah can run faster than any other land animal.", exampleZh: "獵豹奔跑的速度比任何陸地動物都要快。",
    memoryTip: "CVC 結構，u 發短母音 /ʌ/"
  },
  {
    id: "fc-el-054", tier: "elem_1000", category: "日常動作與作息",
    word: "jump", chunk: "jump", ipa: "/d\u0292\u028cmp/", pos: "v. / n.", zh: "跳躍",
    collocation: "jump high",
    example: "Frogs can jump very high into the air.", exampleZh: "青蛙能高高跳起到空中。",
    memoryTip: "j 發 /dʒ/，u 發短母音 /ʌ/"
  },
  {
    id: "fc-el-055", tier: "elem_1000", category: "日常動作與作息",
    word: "swim", chunk: "swim", ipa: "/sw\u026am/", pos: "v.", zh: "游泳",
    collocation: "go swimming",
    example: "We like to go swimming in the cool pool in summer.", exampleZh: "我們夏天喜歡在涼爽的泳池裡游泳。",
    memoryTip: "CVC 結構，i 發短母音 /ɪ/"
  },
  {
    id: "fc-el-056", tier: "elem_1000", category: "日常動作與作息",
    word: "help", chunk: "help", ipa: "/h\u025blp/", pos: "v. / n.", zh: "幫助、協助",
    collocation: "help each other",
    example: "Friends should always help each other in times of need.", exampleZh: "朋友在需要時總應當互相幫助。",
    memoryTip: "CVC 結構，e 發短音 /ɛ/"
  },
  {
    id: "fc-el-057", tier: "elem_1000", category: "日常動作與作息",
    word: "smile", chunk: "smile", ipa: "/sma\u026al/", pos: "v. / n.", zh: "微笑",
    collocation: "warm smile",
    example: "She greeted the guests with a warm and friendly smile.", exampleZh: "她帶著溫暖親切的微笑迎接賓客。",
    memoryTip: "Magic E 使 i 發長母音 /aɪ/"
  },
  {
    id: "fc-el-058", tier: "elem_1000", category: "日常動作與作息",
    word: "laugh", chunk: "laugh", ipa: "/l\u00e6f/", pos: "v. / n.", zh: "大笑、笑出聲",
    collocation: "laugh out loud",
    example: "The funny clown made all the children laugh out loud.", exampleZh: "滑稽的小丑逗得全場孩子哄堂大笑。",
    memoryTip: "gh 發 /f/，au 發短母音 /æ/"
  },
  {
    id: "fc-el-059", tier: "elem_1000", category: "日常動作與作息",
    word: "cry", chunk: "cry", ipa: "/kra\u026a/", pos: "v. / n.", zh: "哭泣、喊叫",
    collocation: "don't cry",
    example: "Don't cry; everything will turn out fine in the end.", exampleZh: "別哭，最後一切都會好起來的。",
    memoryTip: "單音節結尾 y 發長雙母音 /aɪ/"
  },
  {
    id: "fc-el-060", tier: "elem_1000", category: "飲食與餐點",
    word: "breakfast", chunk: "break - fast", ipa: "/\u02c8br\u025bk.f\u0259st/", pos: "n.", zh: "早餐",
    collocation: "have breakfast",
    example: "Eating a healthy breakfast gives you energy all morning.", exampleZh: "吃一頓健康的早餐能給你整個早晨滿滿活力。",
    memoryTip: "break (打破) + fast (斷食) ➔ 破除夜間斷食的第一餐"
  },
  {
    id: "fc-el-061", tier: "elem_1000", category: "飲食與餐點",
    word: "lunch", chunk: "lunch", ipa: "/l\u028cnt\u0283/", pos: "n.", zh: "午餐",
    collocation: "have lunch",
    example: "We eat our lunch in the classroom at noon.", exampleZh: "我們中午在教室裡吃午餐。",
    memoryTip: "u 發短音 /ʌ/，nch 發 /ntʃ/"
  },
  {
    id: "fc-el-062", tier: "elem_1000", category: "飲食與餐點",
    word: "dinner", chunk: "din - ner", ipa: "/\u02c8d\u026an.\u025a/", pos: "n.", zh: "晚餐",
    collocation: "cook dinner",
    example: "What would you like to have for dinner tonight?", exampleZh: "你今晚晚餐想吃什麼呢？",
    memoryTip: "雙寫 n，din 發短音 /dɪn/ + ner /ɚ/"
  },
  {
    id: "fc-el-063", tier: "elem_1000", category: "飲食與餐點",
    word: "meal", chunk: "meal", ipa: "/mi\u02d0l/", pos: "n.", zh: "一餐、飯局",
    collocation: "three meals a day",
    example: "You should eat three balanced meals every day.", exampleZh: "你每天應當吃三餐營養均衡的飯菜。",
    memoryTip: "ea 字母組合發長母音 /iː/"
  },
  {
    id: "fc-el-064", tier: "elem_1000", category: "飲食與餐點",
    word: "water", chunk: "wa - ter", ipa: "/\u02c8w\u0251\u02d0.t\u025a/", pos: "n.", zh: "水 (不可數)",
    collocation: "drink water",
    example: "Drinking plenty of water keeps your body healthy.", exampleZh: "多喝水能讓身體保持健康。",
    memoryTip: "wa 發 /wɑː/ + ter 發 /tɚ/"
  },
  {
    id: "fc-el-065", tier: "elem_1000", category: "飲食與餐點",
    word: "milk", chunk: "milk", ipa: "/m\u026alk/", pos: "n.", zh: "牛奶 (不可數)",
    collocation: "a glass of milk",
    example: "Drinking warm milk helps people fall asleep faster.", exampleZh: "喝熱牛奶能幫助人們更快入睡。",
    memoryTip: "CVC 短母音 /ɪ/"
  },
  {
    id: "fc-el-066", tier: "elem_1000", category: "飲食與餐點",
    word: "tea", chunk: "tea", ipa: "/ti\u02d0/", pos: "n.", zh: "茶 (不可數)",
    collocation: "black tea (紅茶)",
    example: "My grandparents drink hot green tea every afternoon.", exampleZh: "我祖父母每天下午都喝熱綠茶。",
    memoryTip: "ea 字母組合發長母音 /iː/"
  },
  {
    id: "fc-el-067", tier: "elem_1000", category: "飲食與餐點",
    word: "juice", chunk: "juice", ipa: "/d\u0292u\u02d0s/", pos: "n.", zh: "果汁 (不可數)",
    collocation: "orange juice",
    example: "Freshly squeezed orange juice is rich in Vitamin C.", exampleZh: "現榨柳橙汁富含維生素 C。",
    memoryTip: "ui 發長母音 /uː/，c 發 /s/"
  },
  {
    id: "fc-el-068", tier: "elem_1000", category: "飲食與餐點",
    word: "bread", chunk: "bread", ipa: "/br\u025bd/", pos: "n.", zh: "麵包 (不可數)",
    collocation: "a slice of bread",
    example: "I like to eat toasted bread with sweet strawberry jam.", exampleZh: "我喜歡吃烤麵包塗草莓果醬。",
    memoryTip: "ea 不規則發短母音 /ɛ/ (同 head, ready)"
  },
  {
    id: "fc-el-069", tier: "elem_1000", category: "飲食與餐點",
    word: "rice", chunk: "rice", ipa: "/ra\u026as/", pos: "n.", zh: "米飯 (不可數)",
    collocation: "fried rice (炒飯)",
    example: "Rice is the primary staple food for many Asian cultures.", exampleZh: "米飯是許多亞洲文化的主要主食。",
    memoryTip: "Magic E 使 i 發長母音 /aɪ/，c 發 /s/"
  },
  {
    id: "fc-el-070", tier: "elem_1000", category: "飲食與餐點",
    word: "noodle", chunk: "noo - dle", ipa: "/\u02c8nu\u02d0.d\u0259l/", pos: "n.", zh: "麵條 (常用複數 noodles)",
    collocation: "beef noodles (牛肉麵)",
    example: "Taiwan is internationally famous for tasty beef noodles.", exampleZh: "台灣以美味的牛肉麵聞名國際。",
    memoryTip: "oo 發長母音 /uː/，dle 成音節 /dəl/"
  },
  {
    id: "fc-el-071", tier: "elem_1000", category: "飲食與餐點",
    word: "apple", chunk: "ap - ple", ipa: "/\u02c8\u00e6p.\u0259l/", pos: "n.", zh: "蘋果",
    collocation: "an apple a day",
    example: "An apple a day keeps the doctor away.", exampleZh: "一天一蘋果，醫生遠離我。",
    memoryTip: "雙寫 p，a 發短音 /æ/ + ple 發成音節 /əl/"
  },
  {
    id: "fc-el-072", tier: "elem_1000", category: "飲食與餐點",
    word: "banana", chunk: "ba - nan - a", ipa: "/b\u0259\u02c8n\u00e6n.\u0259/", pos: "n.", zh: "香蕉",
    collocation: "peel a banana",
    example: "Monkeys love eating ripe yellow bananas.", exampleZh: "猴子很喜歡吃成熟的黃香蕉。",
    memoryTip: "ba (/bə/) + nan (/næn/) + a (/ə/)"
  },
  {
    id: "fc-el-073", tier: "elem_1000", category: "飲食與餐點",
    word: "orange", chunk: "or - ange", ipa: "/\u02c8\u0254\u02d0r.\u026and\u0292/", pos: "n. / adj.", zh: "柳橙；橙色的",
    collocation: "sweet orange",
    example: "Sweet oranges are juicy and delicious in winter.", exampleZh: "甜柳橙在冬天多汁又美味。",
    memoryTip: "or 發 /ɔːr/ + ange 發 /ɪndʒ/"
  },
  {
    id: "fc-el-074", tier: "elem_1000", category: "飲食與餐點",
    word: "vegetable", chunk: "veg - e - ta - ble", ipa: "/\u02c8v\u025bd\u0292.t\u0259.b\u0259l/", pos: "n.", zh: "蔬菜",
    collocation: "fresh vegetables",
    example: "Eating fresh green vegetables is good for digestion.", exampleZh: "吃新鮮綠色蔬菜對消化很有益處。",
    memoryTip: "g 在 e 前發軟音 /dʒ/，第二音節常弱讀省略"
  },
  {
    id: "fc-el-075", tier: "elem_1000", category: "飲食與餐點",
    word: "fruit", chunk: "fruit", ipa: "/fru\u02d0t/", pos: "n.", zh: "水果",
    collocation: "fresh fruit",
    example: "Taiwan is famous for producing high-quality tropical fruit.", exampleZh: "台灣以盛產高品質熱帶水果而聞名。",
    memoryTip: "ui 字母組合發長音 /uː/ (同 juice)"
  },
  {
    id: "fc-el-076", tier: "elem_1000", category: "動物與生態",
    word: "dog", chunk: "dog", ipa: "/d\u0254\u02d0\u0261/", pos: "n.", zh: "狗、小狗",
    collocation: "walk the dog",
    example: "My dog wags its tail happily whenever I come home.", exampleZh: "每當我回家時，我的狗都會高興地搖尾巴。",
    memoryTip: "CVC 結構，o 發短音 /ɔː/"
  },
  {
    id: "fc-el-077", tier: "elem_1000", category: "動物與生態",
    word: "cat", chunk: "cat", ipa: "/k\u00e6t/", pos: "n.", zh: "貓、小貓",
    collocation: "pet a cat",
    example: "The little cat is sleeping in the warm sunshine.", exampleZh: "小貓正在溫暖的陽光下熟睡。",
    memoryTip: "CVC 結構，a 發短音 /æ/"
  },
  {
    id: "fc-el-078", tier: "elem_1000", category: "動物與生態",
    word: "bird", chunk: "bird", ipa: "/b\u025d\u02d0d/", pos: "n.", zh: "鳥",
    collocation: "birds singing",
    example: "Early in the morning, birds sing songs in the tree.", exampleZh: "清晨時分，鳥兒在樹上歌唱。",
    memoryTip: "ir 字母組合發捲舌長母音 /ɝː/"
  },
  {
    id: "fc-el-079", tier: "elem_1000", category: "動物與生態",
    word: "rabbit", chunk: "rab - bit", ipa: "/\u02c8r\u00e6b.\u026at/", pos: "n.", zh: "兔子",
    collocation: "white rabbit",
    example: "The white rabbit has long ears and red eyes.", exampleZh: "白兔有著長長的耳朵和紅色的眼睛。",
    memoryTip: "雙寫 b，rab 短音 /ræb/ + bit 短音 /bɪt/"
  },
  {
    id: "fc-el-080", tier: "elem_1000", category: "動物與生態",
    word: "elephant", chunk: "el - e - phant", ipa: "/\u02c8\u025bl.\u0259.f\u0259nt/", pos: "n.", zh: "大象",
    collocation: "African elephant",
    example: "The elephant has a long trunk and huge ears.", exampleZh: "大象有一條長長的鼻子和大大的耳朵。",
    memoryTip: "ph 發 /f/，el (/ɛl/) + e (/ə/) + phant (/fənt/)"
  },
  {
    id: "fc-el-081", tier: "elem_1000", category: "動物與生態",
    word: "monkey", chunk: "mon - key", ipa: "/\u02c8m\u028c\u014b.ki/", pos: "n.", zh: "猴子",
    collocation: "clever monkey",
    example: "The clever monkey climbed up the tall tree swiftly.", exampleZh: "那隻聰明的猴子敏捷地爬上了大樹。",
    memoryTip: "ey 發長母音 /i/，mon 發 /mʌŋ/"
  },
  {
    id: "fc-el-082", tier: "elem_1000", category: "動物與生態",
    word: "tiger", chunk: "ti - ger", ipa: "/\u02c8ta\u026a.\u0261\u025a/", pos: "n.", zh: "老虎",
    collocation: "Bengal tiger",
    example: "The fierce tiger rested quietly in the tall grass.", exampleZh: "兇猛的老虎安靜地在長草叢中休息。",
    memoryTip: "開音節 ti 發長音 /taɪ/ + ger /ɡɚ/"
  },
  {
    id: "fc-el-083", tier: "elem_1000", category: "動物與生態",
    word: "lion", chunk: "li - on", ipa: "/\u02c8la\u026a.\u0259n/", pos: "n.", zh: "獅子",
    collocation: "king of the jungle",
    example: "The lion is known as the king of the beasts.", exampleZh: "獅子被公認為百獸之王。",
    memoryTip: "開音節 li 發長音 /laɪ/ + on /ən/"
  },
  {
    id: "fc-el-084", tier: "elem_1000", category: "動物與生態",
    word: "fish", chunk: "fish", ipa: "/f\u026a\u0283/", pos: "n.", zh: "魚 (單複數同形)",
    collocation: "catch fish",
    example: "There are many colorful fish swimming in the coral reef.", exampleZh: "珊瑚礁裡有許多五彩繽紛的魚在游動。",
    memoryTip: "sh 發 /ʃ/，注意單複數同形！"
  },
  {
    id: "fc-el-085", tier: "elem_1000", category: "動物與生態",
    word: "bear", chunk: "bear", ipa: "/b\u025br/", pos: "n.", zh: "熊",
    collocation: "polar bear (北極熊)",
    example: "Polar bears have thick white fur to stay warm in the Arctic.", exampleZh: "北極熊有厚厚的白毛以在北極保暖。",
    memoryTip: "ear 不規則發 /ɛr/ (同 pear)"
  },
  {
    id: "fc-el-086", tier: "elem_1000", category: "自然與天氣",
    word: "weather", chunk: "weath - er", ipa: "/\u02c8w\u025b\u00f0.\u025a/", pos: "n.", zh: "天氣 (不可數)",
    collocation: "sunny weather",
    example: "The weather in spring is usually pleasant and warm.", exampleZh: "春天的天氣通常令人愉悅且溫暖。",
    memoryTip: "ea 發短音 /ɛ/，th 發濁音 /ð/，er 發 /ɚ/"
  },
  {
    id: "fc-el-087", tier: "elem_1000", category: "自然與天氣",
    word: "sunny", chunk: "sun - ny", ipa: "/\u02c8s\u028cn.i/", pos: "adj.", zh: "晴朗的、陽光充足的",
    collocation: "sunny day",
    example: "We decided to go for a picnic on this sunny morning.", exampleZh: "我們決定在這個晴朗的早晨去野餐。",
    memoryTip: "sun (太陽) + 雙寫 n + -y (形容詞)"
  },
  {
    id: "fc-el-088", tier: "elem_1000", category: "自然與天氣",
    word: "rainy", chunk: "rain - y", ipa: "/\u02c8re\u026a.ni/", pos: "adj.", zh: "下雨的、多雨的",
    collocation: "rainy season",
    example: "Bring an umbrella because it will be rainy this afternoon.", exampleZh: "帶把雨傘，因為今天下午會下雨。",
    memoryTip: "rain (雨) + -y (形容詞)，ai 發長音 /eɪ/"
  },
  {
    id: "fc-el-089", tier: "elem_1000", category: "自然與天氣",
    word: "cloudy", chunk: "cloud - y", ipa: "/\u02c8kla\u028a.di/", pos: "adj.", zh: "多雲的、陰天的",
    collocation: "cloudy sky",
    example: "The sky turned cloudy before the heavy rain started.", exampleZh: "在大雨開始前，天空轉為多雲陰暗。",
    memoryTip: "cloud (雲) + -y (形容詞)，ou 發 /aʊ/"
  },
  {
    id: "fc-el-090", tier: "elem_1000", category: "自然與天氣",
    word: "windy", chunk: "wind - y", ipa: "/\u02c8w\u026an.di/", pos: "adj.", zh: "多風的、風大的",
    collocation: "windy weather",
    example: "It was so windy that my cap blew off into the pond.", exampleZh: "風大到我的帽子被吹進了池塘。",
    memoryTip: "wind (風) + -y (形容詞)"
  },
  {
    id: "fc-el-091", tier: "elem_1000", category: "自然與天氣",
    word: "snowy", chunk: "snow - y", ipa: "/\u02c8sno\u028a.i/", pos: "adj.", zh: "下雪的、積雪的",
    collocation: "snowy mountain",
    example: "Children made a cute snowman on the snowy playground.", exampleZh: "孩子們在積雪的操場上堆了個可愛雪人。",
    memoryTip: "snow (雪) + -y (形容詞)"
  },
  {
    id: "fc-el-092", tier: "elem_1000", category: "自然與天氣",
    word: "season", chunk: "sea - son", ipa: "/\u02c8si\u02d0.z\u0259n/", pos: "n.", zh: "季節",
    collocation: "four seasons",
    example: "Spring is my favorite season because flowers bloom.", exampleZh: "春天是我最喜歡的季節，因為繁花盛開。",
    memoryTip: "sea 發 /siː/ + son 發 /zən/"
  },
  {
    id: "fc-el-093", tier: "elem_1000", category: "自然與天氣",
    word: "spring", chunk: "spring", ipa: "/spr\u026a\u014b/", pos: "n.", zh: "春天、春季",
    collocation: "warm spring",
    example: "Warm spring weather brings new green leaves to trees.", exampleZh: "溫暖的春天為樹木帶來新綠的嫩葉。",
    memoryTip: "spr 三輔音 + ing 發 /ɪŋ/"
  },
  {
    id: "fc-el-094", tier: "elem_1000", category: "自然與天氣",
    word: "summer", chunk: "sum - mer", ipa: "/\u02c8s\u028cm.\u025a/", pos: "n.", zh: "夏天、夏季",
    collocation: "hot summer",
    example: "In Taiwan, summer is often hot and humid.", exampleZh: "在台灣，夏天通常炎熱且潮濕。",
    memoryTip: "雙寫 m，sum 發短音 /sʌm/ + mer /ɚ/"
  },
  {
    id: "fc-el-095", tier: "elem_1000", category: "自然與天氣",
    word: "autumn", chunk: "au - tumn", ipa: "/\u02c8\u0254\u02d0.t\u0259m/", pos: "n.", zh: "秋天、秋季 (美式常用 fall)",
    collocation: "cool autumn",
    example: "Leaves turn red, orange, and yellow in cool autumn.", exampleZh: "在涼爽的秋天，樹葉變紅、變橙、變黃。",
    memoryTip: "au 發長母音 /ɔː/，mn 中 n 不發音！"
  },
  {
    id: "fc-el-096", tier: "elem_1000", category: "自然與天氣",
    word: "winter", chunk: "win - ter", ipa: "/\u02c8w\u026an.t\u025a/", pos: "n.", zh: "冬天、冬季",
    collocation: "cold winter",
    example: "Wear a heavy jacket to keep warm during cold winter.", exampleZh: "在寒冷的冬天裡穿厚夾克來保暖。",
    memoryTip: "win 閉音節短音 /wɪn/ + ter /tɚ/"
  },
  {
    id: "fc-el-097", tier: "elem_1000", category: "時間與曆法",
    word: "morning", chunk: "morn - ing", ipa: "/\u02c8m\u0254\u02d0r.n\u026a\u014b/", pos: "n.", zh: "早晨、上午",
    collocation: "in the morning",
    example: "I like to jog around the sports park in the morning.", exampleZh: "我喜歡早晨在運動公園周圍慢跑。",
    memoryTip: "morn 發 /mɔːrn/ + ing 發 /ɪŋ/"
  },
  {
    id: "fc-el-098", tier: "elem_1000", category: "時間與曆法",
    word: "afternoon", chunk: "af - ter - noon", ipa: "/\u02cc\u00e6f.t\u025a\u02c8nu\u02d0n/", pos: "n.", zh: "下午",
    collocation: "in the afternoon",
    example: "Let's meet at the school library at three in the afternoon.", exampleZh: "我們下午三點在學校圖書館碰面吧。",
    memoryTip: "after (在後) + noon (正午)"
  },
  {
    id: "fc-el-099", tier: "elem_1000", category: "時間與曆法",
    word: "evening", chunk: "eve - ning", ipa: "/\u02c8i\u02d0v.n\u026a\u014b/", pos: "n.", zh: "傍晚、晚上",
    collocation: "in the evening",
    example: "Our family watches the news together in the evening.", exampleZh: "我們全家傍晚時一起收看新聞。",
    memoryTip: "eve 發 /iːv/ + ning 發 /nɪŋ/"
  },
  {
    id: "fc-el-100", tier: "elem_1000", category: "時間與曆法",
    word: "night", chunk: "night", ipa: "/na\u026at/", pos: "n.", zh: "夜晚",
    collocation: "at night",
    example: "The moon and countless stars shine brightly at night.", exampleZh: "月亮和無數星星在夜晚閃閃發光。",
    memoryTip: "igh 發長母音 /aɪ/，gh 不發音"
  },
  {
    id: "fc-el-101", tier: "elem_1000", category: "時間與曆法",
    word: "today", chunk: "to - day", ipa: "/t\u0259\u02c8de\u026a/", pos: "adv. / n.", zh: "今天",
    collocation: "today is Monday",
    example: "Today is the first day of our exciting new semester.", exampleZh: "今天是我們令人興奮的新學期第一天。",
    memoryTip: "to 弱讀 /tə/ + day 發長音 /deɪ/"
  },
  {
    id: "fc-el-102", tier: "elem_1000", category: "時間與曆法",
    word: "yesterday", chunk: "yes - ter - day", ipa: "/\u02c8j\u025bs.t\u025a.de\u026a/", pos: "adv. / n.", zh: "昨天 (過去式指標字)",
    collocation: "yesterday afternoon",
    example: "I finished reading that science fiction book yesterday.", exampleZh: "我昨天讀完了那外科幻小說。",
    memoryTip: "yes (/jɛs/) + ter (/tɚ/) + day (/deɪ/)"
  },
  {
    id: "fc-el-103", tier: "elem_1000", category: "時間與曆法",
    word: "tomorrow", chunk: "to - mor - row", ipa: "/t\u0259\u02c8m\u0254\u02d0r.o\u028a/", pos: "adv. / n.", zh: "明天 (未來式指標字)",
    collocation: "tomorrow morning",
    example: "We will have our midterm English quiz tomorrow morning.", exampleZh: "我們明天早上將舉行英文期中考測驗。",
    memoryTip: "雙寫 r，to 弱讀 /tə/ + mor + row /oʊ/"
  },
  {
    id: "fc-el-104", tier: "elem_1000", category: "身體與健康",
    word: "head", chunk: "head", ipa: "/h\u025bd/", pos: "n.", zh: "頭部",
    collocation: "nod one's head (點頭)",
    example: "She nodded her head to agree with the proposal.", exampleZh: "她點頭表示同意這項提議。",
    memoryTip: "ea 不規則發短母音 /ɛ/"
  },
  {
    id: "fc-el-105", tier: "elem_1000", category: "身體與健康",
    word: "eye", chunk: "eye", ipa: "/a\u026a/", pos: "n.", zh: "眼睛",
    collocation: "close your eyes",
    example: "Close your eyes and take three deep breaths.", exampleZh: "閉上雙眼並做三次深呼吸。",
    memoryTip: "發音同長母音字母 I：/aɪ/"
  },
  {
    id: "fc-el-106", tier: "elem_1000", category: "身體與健康",
    word: "ear", chunk: "ear", ipa: "/\u026ar/", pos: "n.", zh: "耳朵",
    collocation: "hear with ears",
    example: "Rabbits have very long ears to detect faint sounds.", exampleZh: "兔子有很長的耳朵來偵測微弱聲音。",
    memoryTip: "字母組合 ear 發 /ɪr/ (同 hear)"
  },
  {
    id: "fc-el-107", tier: "elem_1000", category: "身體與健康",
    word: "nose", chunk: "nose", ipa: "/no\u028az/", pos: "n.", zh: "鼻子",
    collocation: "touch your nose",
    example: "Elephants use their long nose like a versatile hand.", exampleZh: "大象把長鼻子當作多功能的手來使用。",
    memoryTip: "Magic E 使 o 發長母音 /oʊ/，s 發 /z/"
  },
  {
    id: "fc-el-108", tier: "elem_1000", category: "身體與健康",
    word: "mouth", chunk: "mouth", ipa: "/ma\u028a\u03b8/", pos: "n.", zh: "嘴巴",
    collocation: "open your mouth",
    example: "Open your mouth wide so the dentist can check.", exampleZh: "把嘴巴張大讓牙醫檢查。",
    memoryTip: "ou 發 /aʊ/，th 發清音 /θ/"
  },
  {
    id: "fc-el-109", tier: "elem_1000", category: "身體與健康",
    word: "hand", chunk: "hand", ipa: "/h\u00e6nd/", pos: "n.", zh: "手",
    collocation: "shake hands",
    example: "Raise your right hand if you want to answer.", exampleZh: "如果你想回答請舉起右手。",
    memoryTip: "CVC 結構，a 發短音 /æ/"
  },
  {
    id: "fc-el-110", tier: "elem_1000", category: "身體與健康",
    word: "foot", chunk: "foot", ipa: "/f\u028at/", pos: "n.", zh: "腳 (單數；複數 feet)",
    collocation: "on foot (步行)",
    example: "He goes to the nearby bookstore on foot every weekend.", exampleZh: "他每週末都步行去附近的書店。",
    memoryTip: "單數 foot (/fʊt/) ➔ 複數 feet (/fiːt/)！"
  },
  {
    id: "fc-el-111", tier: "elem_1000", category: "數字與順序",
    word: "one", chunk: "one", ipa: "/w\u028cn/", pos: "num.", zh: "一、一個",
    collocation: "number one",
    example: "I have only one apple in my bag.", exampleZh: "我的袋子裡只有一顆蘋果。",
    memoryTip: "發音 /wʌn/，同 won (贏)"
  },
  {
    id: "fc-el-112", tier: "elem_1000", category: "數字與順序",
    word: "two", chunk: "two", ipa: "/tu\u02d0/", pos: "num.", zh: "二、兩個",
    collocation: "two students",
    example: "There are two birds singing on the branch.", exampleZh: "有兩隻鳥在樹枝上唱歌。",
    memoryTip: "同音字 to, too"
  },
  {
    id: "fc-el-113", tier: "elem_1000", category: "數字與順序",
    word: "three", chunk: "three", ipa: "/\u03b8ri\u02d0/", pos: "num.", zh: "三、三個",
    collocation: "three books",
    example: "She bought three books at the bookstore.", exampleZh: "她在書店買了三本書。",
    memoryTip: "th 發咬舌音 /θ/"
  },
  {
    id: "fc-el-114", tier: "elem_1000", category: "數字與順序",
    word: "four", chunk: "four", ipa: "/f\u0254\u02d0r/", pos: "num.", zh: "四、四個",
    collocation: "four seasons",
    example: "There are four seasons in a year.", exampleZh: "一年有四個季節。",
    memoryTip: "同音字 for"
  },
  {
    id: "fc-el-115", tier: "elem_1000", category: "數字與順序",
    word: "five", chunk: "five", ipa: "/fa\u026av/", pos: "num.", zh: "五、五個",
    collocation: "five minutes",
    example: "Give me five minutes to get ready.", exampleZh: "給我五分鐘準備一下。",
    memoryTip: "Magic E 使 i 發 /aɪ/"
  },
  {
    id: "fc-el-116", tier: "elem_1000", category: "數字與順序",
    word: "six", chunk: "six", ipa: "/s\u026aks/", pos: "num.", zh: "六、六個",
    collocation: "six o'clock",
    example: "We usually eat dinner at six o'clock.", exampleZh: "我們通常六點吃晚餐。",
    memoryTip: "CVC 短母音 /ɪ/"
  },
  {
    id: "fc-el-117", tier: "elem_1000", category: "數字與順序",
    word: "seven", chunk: "sev - en", ipa: "/\u02c8s\u025bv.\u0259n/", pos: "num.", zh: "七、七個",
    collocation: "seven days",
    example: "There are seven days in a week.", exampleZh: "一週有七天。",
    memoryTip: "sev 短音 /sɛv/ + en 弱讀 /ən/"
  },
  {
    id: "fc-el-118", tier: "elem_1000", category: "數字與順序",
    word: "eight", chunk: "eight", ipa: "/e\u026at/", pos: "num.", zh: "八、八個",
    collocation: "eight years old",
    example: "My younger sister is eight years old.", exampleZh: "我妹妹今年八歲。",
    memoryTip: "eigh 發長音 /eɪ/，同 ate"
  },
  {
    id: "fc-el-119", tier: "elem_1000", category: "數字與順序",
    word: "nine", chunk: "nine", ipa: "/na\u026an/", pos: "num.", zh: "九、九個",
    collocation: "nine books",
    example: "He has nine comic books on the shelf.", exampleZh: "他書架上有九本漫畫書。",
    memoryTip: "Magic E 使 i 發 /aɪ/"
  },
  {
    id: "fc-el-120", tier: "elem_1000", category: "數字與順序",
    word: "ten", chunk: "ten", ipa: "/t\u025bn/", pos: "num.", zh: "十、十個",
    collocation: "ten dollars",
    example: "The pen costs only ten dollars.", exampleZh: "這枝筆只要十元。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-121", tier: "elem_1000", category: "數字與順序",
    word: "hundred", chunk: "hun - dred", ipa: "/\u02c8h\u028cn.dr\u0259d/", pos: "num.", zh: "百、一百",
    collocation: "one hundred",
    example: "There are one hundred cents in a dollar.", exampleZh: "一美元等於一百美分。",
    memoryTip: "hun /hʌn/ + dred /drəd/"
  },
  {
    id: "fc-el-122", tier: "elem_1000", category: "數字與順序",
    word: "thousand", chunk: "thou - sand", ipa: "/\u02c8\u03b8a\u028a.z\u0259nd/", pos: "num.", zh: "千、一千",
    collocation: "one thousand",
    example: "Over one thousand students attend this school.", exampleZh: "超過一千名學生在這所學校就讀。",
    memoryTip: "thou /θaʊ/ + sand /zənd/"
  },
  {
    id: "fc-el-123", tier: "elem_1000", category: "數字與順序",
    word: "first", chunk: "first", ipa: "/f\u025d\u02d0st/", pos: "adj. / adv.", zh: "第一的、首先",
    collocation: "first prize",
    example: "She won the first prize in the singing contest.", exampleZh: "她在歌唱比賽中獲得第一名。",
    memoryTip: "ir 發捲舌長音 /ɝː/"
  },
  {
    id: "fc-el-124", tier: "elem_1000", category: "數字與順序",
    word: "second", chunk: "sec - ond", ipa: "/\u02c8s\u025bk.\u0259nd/", pos: "adj. / n.", zh: "第二的；秒鐘",
    collocation: "second floor",
    example: "Our classroom is on the second floor.", exampleZh: "我們的教室在二樓。",
    memoryTip: "sec /sɛk/ + ond /ənd/"
  },
  {
    id: "fc-el-125", tier: "elem_1000", category: "數字與順序",
    word: "third", chunk: "third", ipa: "/\u03b8\u025d\u02d0d/", pos: "adj.", zh: "第三的",
    collocation: "third place",
    example: "He finished in third place in the race.", exampleZh: "他在比賽中獲得第三名。",
    memoryTip: "th /θ/ + ir /ɝː/ + d"
  },
  {
    id: "fc-el-126", tier: "elem_1000", category: "顏色與外觀",
    word: "red", chunk: "red", ipa: "/r\u025bd/", pos: "adj. / n.", zh: "紅色的；紅色",
    collocation: "red apple",
    example: "The red roses in the garden are blooming.", exampleZh: "花園裡的紅玫瑰正在盛開。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-127", tier: "elem_1000", category: "顏色與外觀",
    word: "blue", chunk: "blue", ipa: "/blu\u02d0/", pos: "adj. / n.", zh: "藍色的；藍色",
    collocation: "blue sky",
    example: "The blue sky has no clouds today.", exampleZh: "今天藍藍的天空萬里無雲。",
    memoryTip: "ue 發長音 /uː/"
  },
  {
    id: "fc-el-128", tier: "elem_1000", category: "顏色與外觀",
    word: "yellow", chunk: "yel - low", ipa: "/\u02c8j\u025bl.o\u028a/", pos: "adj. / n.", zh: "黃色的；黃色",
    collocation: "yellow banana",
    example: "The yellow school bus picked up the kids.", exampleZh: "黃色校車接走了孩子們。",
    memoryTip: "yel /jɛl/ + low /oʊ/"
  },
  {
    id: "fc-el-129", tier: "elem_1000", category: "顏色與外觀",
    word: "green", chunk: "green", ipa: "/\u0261ri\u02d0n/", pos: "adj. / n.", zh: "綠色的；綠色",
    collocation: "green leaves",
    example: "The trees have fresh green leaves in spring.", exampleZh: "春天時樹木長出鮮綠的嫩葉。",
    memoryTip: "ee 發長音 /iː/"
  },
  {
    id: "fc-el-130", tier: "elem_1000", category: "顏色與外觀",
    word: "white", chunk: "white", ipa: "/wa\u026at/", pos: "adj. / n.", zh: "白色的；白色",
    collocation: "white snow",
    example: "A blanket of white snow covered the fields.", exampleZh: "一片白雪覆蓋了田野。",
    memoryTip: "wh 發 /w/，Magic E 使 i 發 /aɪ/"
  },
  {
    id: "fc-el-131", tier: "elem_1000", category: "顏色與外觀",
    word: "black", chunk: "black", ipa: "/bl\u00e6k/", pos: "adj. / n.", zh: "黑色的；黑色",
    collocation: "black coffee",
    example: "He wears a stylish black jacket.", exampleZh: "他穿著一件有型的黑色夾克。",
    memoryTip: "ck 發 /k/，a 短音 /æ/"
  },
  {
    id: "fc-el-132", tier: "elem_1000", category: "顏色與外觀",
    word: "pink", chunk: "pink", ipa: "/p\u026a\u014bk/", pos: "adj. / n.", zh: "粉紅色的；粉紅色",
    collocation: "pink dress",
    example: "The little girl wore a lovely pink dress.", exampleZh: "小女孩穿著一件可愛的粉紅色洋裝。",
    memoryTip: "ink 發 /ɪŋk/"
  },
  {
    id: "fc-el-133", tier: "elem_1000", category: "顏色與外觀",
    word: "purple", chunk: "pur - ple", ipa: "/\u02c8p\u025d\u02d0.p\u0259l/", pos: "adj. / n.", zh: "紫色的；紫色",
    collocation: "purple grapes",
    example: "Ripe purple grapes are sweet and juicy.", exampleZh: "成熟的紫葡萄香甜多汁。",
    memoryTip: "ur 發 /ɝː/ + ple /pəl/"
  },
  {
    id: "fc-el-134", tier: "elem_1000", category: "顏色與外觀",
    word: "brown", chunk: "brown", ipa: "/bra\u028an/", pos: "adj. / n.", zh: "棕色的；棕色",
    collocation: "brown bear",
    example: "The brown dog barked at the stranger.", exampleZh: "棕色的狗對著陌生人狂吠。",
    memoryTip: "ow 發 /aʊ/"
  },
  {
    id: "fc-el-135", tier: "elem_1000", category: "動物與生態",
    word: "horse", chunk: "horse", ipa: "/h\u0254\u02d0rs/", pos: "n.", zh: "馬",
    collocation: "ride a horse",
    example: "He learned how to ride a horse on the ranch.", exampleZh: "他在農場學會了如何騎馬。",
    memoryTip: "or 發長音 /ɔːr/"
  },
  {
    id: "fc-el-136", tier: "elem_1000", category: "動物與生態",
    word: "pig", chunk: "pig", ipa: "/p\u026a\u0261/", pos: "n.", zh: "豬",
    collocation: "little pig",
    example: "The three little pigs built different houses.", exampleZh: "三隻小豬蓋了不同的房子。",
    memoryTip: "CVC 短母音 /ɪ/"
  },
  {
    id: "fc-el-137", tier: "elem_1000", category: "動物與生態",
    word: "cow", chunk: "cow", ipa: "/ka\u028a/", pos: "n.", zh: "乳牛、母牛",
    collocation: "dairy cow",
    example: "Cows give us fresh and nutritious milk.", exampleZh: "乳牛提供我們新鮮有營養的牛奶。",
    memoryTip: "ow 發 /aʊ/"
  },
  {
    id: "fc-el-138", tier: "elem_1000", category: "動物與生態",
    word: "sheep", chunk: "sheep", ipa: "/\u0283i\u02d0p/", pos: "n.", zh: "綿羊 (單複數同形)",
    collocation: "flock of sheep",
    example: "The white sheep are grazing on the green hill.", exampleZh: "白色的綿羊正在綠色山丘上吃草。",
    memoryTip: "注意：sheep 單複數同形！"
  },
  {
    id: "fc-el-139", tier: "elem_1000", category: "動物與生態",
    word: "duck", chunk: "duck", ipa: "/d\u028ck/", pos: "n.", zh: "鴨子",
    collocation: "swimming duck",
    example: "Yellow ducks are swimming happily in the pond.", exampleZh: "黃色鴨子在池塘裡高興地游泳。",
    memoryTip: "ck 發 /k/，u 短音 /ʌ/"
  },
  {
    id: "fc-el-140", tier: "elem_1000", category: "動物與生態",
    word: "chicken", chunk: "chick - en", ipa: "/\u02c8t\u0283\u026ak.\u026an/", pos: "n.", zh: "雞、雞肉",
    collocation: "fried chicken",
    example: "We had fried chicken and salad for lunch.", exampleZh: "我們午餐吃了炸雞和沙拉。",
    memoryTip: "chick /tʃɪk/ + en /ɪn/"
  },
  {
    id: "fc-el-141", tier: "elem_1000", category: "動物與生態",
    word: "mouse", chunk: "mouse", ipa: "/ma\u028as/", pos: "n.", zh: "老鼠 (複數 mice)",
    collocation: "little mouse",
    example: "The mouse ran quickly into the hole.", exampleZh: "老鼠迅速地跑進洞穴裡。",
    memoryTip: "複數不規則：mouse ➔ mice！"
  },
  {
    id: "fc-el-142", tier: "elem_1000", category: "動物與生態",
    word: "frog", chunk: "frog", ipa: "/fr\u0251\u02d0\u0261/", pos: "n.", zh: "青蛙",
    collocation: "green frog",
    example: "The green frog jumped into the cool water.", exampleZh: "綠色青蛙跳進了涼爽的水中。",
    memoryTip: "fr + og /ɑːɡ/"
  },
  {
    id: "fc-el-143", tier: "elem_1000", category: "動物與生態",
    word: "turtle", chunk: "tur - tle", ipa: "/\u02c8t\u025d\u02d0.t\u032c\u0259l/", pos: "n.", zh: "烏龜",
    collocation: "sea turtle (海龜)",
    example: "Sea turtles lay their eggs on sandy beaches.", exampleZh: "海龜在沙灘上下蛋。",
    memoryTip: "ur 發 /ɝː/ + tle /t̬əl/"
  },
  {
    id: "fc-el-144", tier: "elem_1000", category: "動物與生態",
    word: "snake", chunk: "snake", ipa: "/sne\u026ak/", pos: "n.", zh: "蛇",
    collocation: "long snake",
    example: "Be careful; there might be snakes in the bush.", exampleZh: "小心點，灌木叢中可能會有蛇。",
    memoryTip: "Magic E 使 a 發 /eɪ/"
  },
  {
    id: "fc-el-145", tier: "elem_1000", category: "動物與生態",
    word: "bee", chunk: "bee", ipa: "/bi\u02d0/", pos: "n.", zh: "蜜蜂",
    collocation: "busy bee",
    example: "Bees collect nectar from colorful flowers.", exampleZh: "蜜蜂從鮮豔的花朵中採集花蜜。",
    memoryTip: "ee 發長音 /iː/"
  },
  {
    id: "fc-el-146", tier: "elem_1000", category: "動物與生態",
    word: "butterfly", chunk: "but - ter - fly", ipa: "/\u02c8b\u028ct.\u025a.fla\u026a/", pos: "n.", zh: "蝴蝶",
    collocation: "beautiful butterfly",
    example: "A colorful butterfly landed gently on the rose.", exampleZh: "一隻五彩斑斕的蝴蝶輕輕停在玫瑰上。",
    memoryTip: "butter (奶油) + fly (飛舞)"
  },
  {
    id: "fc-el-147", tier: "elem_1000", category: "飲食與餐點",
    word: "egg", chunk: "egg", ipa: "/\u025b\u0261/", pos: "n.", zh: "雞蛋、蛋",
    collocation: "boiled egg",
    example: "Eating an egg every day provides good protein.", exampleZh: "每天吃一顆蛋能提供優質蛋白質。",
    memoryTip: "雙寫 g，e 短音 /ɛ/"
  },
  {
    id: "fc-el-148", tier: "elem_1000", category: "飲食與餐點",
    word: "soup", chunk: "soup", ipa: "/su\u02d0p/", pos: "n.", zh: "湯 (不可數)",
    collocation: "hot soup",
    example: "Mom made a pot of hot chicken soup for us.", exampleZh: "媽媽為我們煮了一鍋熱雞湯。",
    memoryTip: "ou 發長音 /uː/"
  },
  {
    id: "fc-el-149", tier: "elem_1000", category: "飲食與餐點",
    word: "salad", chunk: "sal - ad", ipa: "/\u02c8s\u00e6l.\u0259d/", pos: "n.", zh: "沙拉",
    collocation: "fruit salad",
    example: "She ordered a fresh vegetable salad with dressing.", exampleZh: "她點了一份淋上醬汁的新鮮蔬菜沙拉。",
    memoryTip: "sal /sæl/ + ad 弱讀 /əd/"
  },
  {
    id: "fc-el-150", tier: "elem_1000", category: "飲食與餐點",
    word: "potato", chunk: "po - ta - to", ipa: "/p\u0259\u02c8te\u026a.t\u032co\u028a/", pos: "n.", zh: "馬鈴薯、土豆",
    collocation: "mashed potatoes",
    example: "Baked potatoes are delicious with a little butter.", exampleZh: "烤馬鈴薯加上一點奶油非常美味。",
    memoryTip: "po /pə/ + ta /teɪ/ + to /toʊ/"
  },
  {
    id: "fc-el-151", tier: "elem_1000", category: "飲食與餐點",
    word: "tomato", chunk: "to - ma - to", ipa: "/t\u0259\u02c8me\u026a.t\u032co\u028a/", pos: "n.", zh: "番茄",
    collocation: "red tomato",
    example: "Fresh red tomatoes are great for making pasta sauce.", exampleZh: "新鮮紅番茄非常適合拿來做義大利麵醬汁。",
    memoryTip: "to /tə/ + ma /meɪ/ + to /toʊ/"
  },
  {
    id: "fc-el-152", tier: "elem_1000", category: "飲食與餐點",
    word: "cake", chunk: "cake", ipa: "/ke\u026ak/", pos: "n.", zh: "蛋糕",
    collocation: "birthday cake",
    example: "We blew out the candles on the birthday cake.", exampleZh: "我們吹熄了生日蛋糕上的蠟燭。",
    memoryTip: "Magic E 使 a 發長音 /eɪ/"
  },
  {
    id: "fc-el-153", tier: "elem_1000", category: "飲食與餐點",
    word: "cookie", chunk: "cook - ie", ipa: "/\u02c8k\u028ak.i/", pos: "n.", zh: "餅乾、曲奇",
    collocation: "chocolate cookie",
    example: "Grandma baked warm chocolate chip cookies for us.", exampleZh: "奶奶為我們烤了熱騰騰的巧克力餅乾。",
    memoryTip: "cook /kʊk/ + ie /i/"
  },
  {
    id: "fc-el-154", tier: "elem_1000", category: "飲食與餐點",
    word: "ice cream", chunk: "ice cream", ipa: "/\u02cca\u026as \u02c8kri\u02d0m/", pos: "n.", zh: "冰淇淋",
    collocation: "vanilla ice cream",
    example: "Eating cold ice cream on a hot summer day is wonderful.", exampleZh: "在炎熱夏天吃冰涼的冰淇淋真是太棒了。",
    memoryTip: "ice (冰) + cream (奶油)"
  },
  {
    id: "fc-el-155", tier: "elem_1000", category: "飲食與餐點",
    word: "pizza", chunk: "piz - za", ipa: "/\u02c8pi\u02d0t.s\u0259/", pos: "n.", zh: "披薩",
    collocation: "cheese pizza",
    example: "We shared a large cheese pizza with our classmates.", exampleZh: "我們和同班同學分享了一個大起司披薩。",
    memoryTip: "zz 發 /ts/，源自義大利語"
  },
  {
    id: "fc-el-156", tier: "elem_1000", category: "衣物與穿戴",
    word: "shirt", chunk: "shirt", ipa: "/\u0283\u025d\u02d0t/", pos: "n.", zh: "襯衫",
    collocation: "white shirt",
    example: "Dad wears a clean white shirt to work every day.", exampleZh: "爸爸每天穿著乾淨的白襯衫上班。",
    memoryTip: "ir 發捲舌長音 /ɝː/"
  },
  {
    id: "fc-el-157", tier: "elem_1000", category: "衣物與穿戴",
    word: "pants", chunk: "pants", ipa: "/p\u00e6nts/", pos: "n.", zh: "長褲 (恆為複數)",
    collocation: "a pair of pants",
    example: "He bought a new pair of black pants for the concert.", exampleZh: "他為音樂會買了一條新的黑長褲。",
    memoryTip: "兩隻褲管，恆用複數！"
  },
  {
    id: "fc-el-158", tier: "elem_1000", category: "衣物與穿戴",
    word: "dress", chunk: "dress", ipa: "/dr\u025bs/", pos: "n. / v.", zh: "洋裝、連衣裙；穿衣",
    collocation: "wear a dress",
    example: "She wore a lovely blue dress to the party.", exampleZh: "她穿著一件優雅的藍色洋裝去參加宴會。",
    memoryTip: "雙寫 s，dr + ess /ɛs/"
  },
  {
    id: "fc-el-159", tier: "elem_1000", category: "衣物與穿戴",
    word: "coat", chunk: "coat", ipa: "/ko\u028at/", pos: "n.", zh: "大衣、外套",
    collocation: "warm coat",
    example: "Put on your warm coat because it is freezing outside.", exampleZh: "穿上你的暖大衣，因為外面很寒冷。",
    memoryTip: "oa 字母組合發長音 /oʊ/"
  },
  {
    id: "fc-el-160", tier: "elem_1000", category: "衣物與穿戴",
    word: "jacket", chunk: "jack - et", ipa: "/\u02c8d\u0292\u00e6k.\u026at/", pos: "n.", zh: "夾克、短外套",
    collocation: "leather jacket",
    example: "He zipped up his warm jacket before going outdoors.", exampleZh: "出門前他拉上了保暖夾克的拉鍊。",
    memoryTip: "jack /dʒæk/ + et /ɪt/"
  },
  {
    id: "fc-el-161", tier: "elem_1000", category: "衣物與穿戴",
    word: "shoes", chunk: "shoes", ipa: "/\u0283u\u02d0z/", pos: "n.", zh: "鞋子 (恆常用複數)",
    collocation: "put on shoes",
    example: "Take off your muddy shoes before entering the house.", exampleZh: "進屋前請脫掉沾滿泥巴的鞋子。",
    memoryTip: "oe 發長音 /uː/，s 發 /z/"
  },
  {
    id: "fc-el-162", tier: "elem_1000", category: "衣物與穿戴",
    word: "hat", chunk: "hat", ipa: "/h\u00e6t/", pos: "n.", zh: "帽子 (有邊緣的帽)",
    collocation: "wear a hat",
    example: "She wore a straw hat to protect her face from the sun.", exampleZh: "她戴了一頂草帽來遮陽。",
    memoryTip: "CVC 短母音 /æ/"
  },
  {
    id: "fc-el-163", tier: "elem_1000", category: "居家與生活",
    word: "home", chunk: "home", ipa: "/ho\u028am/", pos: "n. / adv.", zh: "家、家庭",
    collocation: "go home (回家)",
    example: "After school, the students were eager to go home.", exampleZh: "放學後學生們迫不及待地想回家。",
    memoryTip: "Magic E 使 o 發長音 /oʊ/"
  },
  {
    id: "fc-el-164", tier: "elem_1000", category: "居家與生活",
    word: "house", chunk: "house", ipa: "/ha\u028as/", pos: "n.", zh: "房子、房屋",
    collocation: "big house",
    example: "They live in a beautiful house with a green garden.", exampleZh: "他們住在一棟帶有綠色花園的美麗房子裡。",
    memoryTip: "ou 發 /aʊ/，s 發清音 /s/"
  },
  {
    id: "fc-el-165", tier: "elem_1000", category: "居家與生活",
    word: "room", chunk: "room", ipa: "/ru\u02d0m/", pos: "n.", zh: "房間",
    collocation: "clean room",
    example: "Keep your study room neat and well organized.", exampleZh: "保持你的書房整齊又有條理。",
    memoryTip: "oo 發長音 /uː/"
  },
  {
    id: "fc-el-166", tier: "elem_1000", category: "居家與生活",
    word: "door", chunk: "door", ipa: "/d\u0254\u02d0r/", pos: "n.", zh: "門",
    collocation: "open the door",
    example: "Please close the door quietly so as not to wake the baby.", exampleZh: "請輕輕關上門以免吵醒小寶寶。",
    memoryTip: "oor 發長音 /ɔːr/"
  },
  {
    id: "fc-el-167", tier: "elem_1000", category: "居家與生活",
    word: "window", chunk: "win - dow", ipa: "/\u02c8w\u026an.do\u028a/", pos: "n.", zh: "窗戶",
    collocation: "look out the window",
    example: "Open the window to let fresh morning air in.", exampleZh: "打開窗戶讓早晨的新鮮空氣進來。",
    memoryTip: "win /wɪn/ + dow /doʊ/"
  },
  {
    id: "fc-el-168", tier: "elem_1000", category: "居家與生活",
    word: "table", chunk: "ta - ble", ipa: "/\u02c8te\u026a.b\u0259l/", pos: "n.", zh: "桌子、餐桌",
    collocation: "set the table (擺餐具)",
    example: "Help Mom set the table before dinner starts.", exampleZh: "在晚餐開始前幫媽媽擺好餐具。",
    memoryTip: "ta /teɪ/ + ble /bəl/"
  },
  {
    id: "fc-el-169", tier: "elem_1000", category: "居家與生活",
    word: "bed", chunk: "bed", ipa: "/b\u025bd/", pos: "n.", zh: "床",
    collocation: "go to bed (就寢)",
    example: "Children should go to bed early and get up early.", exampleZh: "小孩子應該早睡早起。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-170", tier: "elem_1000", category: "地方與交通",
    word: "city", chunk: "cit - y", ipa: "/\u02c8s\u026at.i/", pos: "n.", zh: "城市",
    collocation: "big city",
    example: "Taipei is a bustling and convenient modern city.", exampleZh: "台北是一座繁華且便利的現代城市。",
    memoryTip: "c 在 i 前發軟音 /s/"
  },
  {
    id: "fc-el-171", tier: "elem_1000", category: "地方與交通",
    word: "park", chunk: "park", ipa: "/p\u0251\u02d0rk/", pos: "n. / v.", zh: "公園；停車",
    collocation: "walk in the park",
    example: "Families like to picnic in the central park on Sundays.", exampleZh: "家庭喜歡在週日去中央公園野餐。",
    memoryTip: "ar 發捲舌長音 /ɑːrk/"
  },
  {
    id: "fc-el-172", tier: "elem_1000", category: "地方與交通",
    word: "hospital", chunk: "hos - pi - tal", ipa: "/\u02c8h\u0251\u02d0.sp\u026a.t\u032c\u0259l/", pos: "n.", zh: "醫院",
    collocation: "go to the hospital",
    example: "The ambulance rushed the injured patient to the hospital.", exampleZh: "救護車將受傷的病患迅速送往醫院。",
    memoryTip: "hos /hɑːs/ + pi /pɪ/ + tal /t̬əl/"
  },
  {
    id: "fc-el-173", tier: "elem_1000", category: "地方與交通",
    word: "store", chunk: "store", ipa: "/st\u0254\u02d0r/", pos: "n.", zh: "商店、店家",
    collocation: "convenience store",
    example: "You can buy snacks at the 24-hour convenience store.", exampleZh: "你可以在二十四小時便利商店買點心。",
    memoryTip: "ore 發長音 /ɔːr/"
  },
  {
    id: "fc-el-174", tier: "elem_1000", category: "地方與交通",
    word: "bus", chunk: "bus", ipa: "/b\u028cs/", pos: "n.", zh: "公車、巴士",
    collocation: "take a bus",
    example: "Taking a bus is an eco-friendly way to travel around.", exampleZh: "搭乘公車是環遊市區的環保方式。",
    memoryTip: "CVC 短母音 /ʌ/"
  },
  {
    id: "fc-el-175", tier: "elem_1000", category: "地方與交通",
    word: "train", chunk: "train", ipa: "/tre\u026an/", pos: "n.", zh: "火車",
    collocation: "take a train",
    example: "The train arrived at the station right on schedule.", exampleZh: "火車非常準時地抵達了車站。",
    memoryTip: "ai 字母組合發長音 /eɪ/"
  },
  {
    id: "fc-el-176", tier: "elem_1000", category: "地方與交通",
    word: "car", chunk: "car", ipa: "/k\u0251\u02d0r/", pos: "n.", zh: "汽車、轎車",
    collocation: "drive a car",
    example: "Dad bought a fuel-efficient electric car last month.", exampleZh: "爸爸上個月買了一輛節能的電動汽車。",
    memoryTip: "ar 發捲舌長音 /ɑːr/"
  },
  {
    id: "fc-el-177", tier: "elem_1000", category: "自然與地理",
    word: "beach", chunk: "beach", ipa: "/bi\u02d0t\u0283/", pos: "n.", zh: "海灘、沙灘",
    collocation: "walk along the beach",
    example: "We collected colorful seashells on the sandy beach.", exampleZh: "我們在沙灘上收集五顏六色的貝殼。",
    memoryTip: "ea 發長母音 /iː/，ch 發 /tʃ/"
  },
  {
    id: "fc-el-178", tier: "elem_1000", category: "自然與地理",
    word: "mountain", chunk: "moun - tain", ipa: "/\u02c8ma\u028an.t\u0259n/", pos: "n.", zh: "高山、山脈",
    collocation: "climb a mountain",
    example: "Jade Mountain is the highest peak in Taiwan.", exampleZh: "玉山是台灣最高峰。",
    memoryTip: "moun /maʊn/ + tain 弱讀 /tən/"
  },
  {
    id: "fc-el-179", tier: "elem_1000", category: "自然與地理",
    word: "river", chunk: "riv - er", ipa: "/\u02c8r\u026av.\u025a/", pos: "n.", zh: "河流",
    collocation: "across the river",
    example: "A long concrete bridge stretches across the river.", exampleZh: "一座長長的混凝土橋跨越了這條河。",
    memoryTip: "riv 短音 /rɪv/ + er /ɚ/"
  },
  {
    id: "fc-el-180", tier: "elem_1000", category: "自然與地理",
    word: "lake", chunk: "lake", ipa: "/le\u026ak/", pos: "n.", zh: "湖泊",
    collocation: "calm lake",
    example: "Sun Moon Lake attracts tourists from all over the world.", exampleZh: "日月潭吸引了來自世界各地的遊客。",
    memoryTip: "Magic E 使 a 發長音 /eɪ/"
  },
  {
    id: "fc-el-181", tier: "elem_1000", category: "自然與地理",
    word: "sea", chunk: "sea", ipa: "/si\u02d0/", pos: "n.", zh: "大海、海洋",
    collocation: "by the sea",
    example: "They spent a relaxing summer holiday by the sea.", exampleZh: "他們在海邊度過了一個放鬆的暑假。",
    memoryTip: "ea 發長母音 /iː/，同 see"
  },
  {
    id: "fc-el-182", tier: "elem_1000", category: "自然與地理",
    word: "ocean", chunk: "o - cean", ipa: "/\u02c8o\u028a.\u0283\u0259n/", pos: "n.", zh: "大洋、汪洋",
    collocation: "Pacific Ocean",
    example: "The Pacific Ocean is the largest ocean on Earth.", exampleZh: "太平洋是地球上最大的海洋。",
    memoryTip: "o 開音節 /oʊ/ + cean 發 /ʃən/"
  },
  {
    id: "fc-el-183", tier: "elem_1000", category: "自然與地理",
    word: "tree", chunk: "tree", ipa: "/tri\u02d0/", pos: "n.", zh: "樹木",
    collocation: "climb a tree",
    example: "Big trees provide cool shade during the summer.", exampleZh: "大樹在夏天提供涼爽的樹蔭。",
    memoryTip: "ee 發長母音 /iː/"
  },
  {
    id: "fc-el-184", tier: "elem_1000", category: "自然與地理",
    word: "flower", chunk: "flow - er", ipa: "/\u02c8fla\u028a.\u025a/", pos: "n.", zh: "花朵",
    collocation: "fresh flowers",
    example: "Spring is a wonderful season when sweet flowers bloom.", exampleZh: "春天是芬芳花朵盛開的美好季節。",
    memoryTip: "flow /flaʊ/ + er /ɚ/"
  },
  {
    id: "fc-el-185", tier: "elem_1000", category: "自然與地理",
    word: "grass", chunk: "grass", ipa: "/\u0261r\u00e6s/", pos: "n.", zh: "草地、青草 (不可數)",
    collocation: "green grass",
    example: "Please do not step on the fresh green grass.", exampleZh: "請勿踐踏鮮綠的草坪。",
    memoryTip: "雙寫 s，a 發短音 /æ/"
  },
  {
    id: "fc-el-186", tier: "elem_1000", category: "自然與地理",
    word: "garden", chunk: "gar - den", ipa: "/\u02c8\u0261\u0251\u02d0r.d\u0259n/", pos: "n.", zh: "花園、花壇",
    collocation: "beautiful garden",
    example: "Grandpa grows colorful roses in his front garden.", exampleZh: "爺爺在他前院的花園裡種植繽紛的玫瑰。",
    memoryTip: "gar /ɡɑːr/ + den /dən/"
  },
  {
    id: "fc-el-187", tier: "elem_1000", category: "自然與地理",
    word: "sky", chunk: "sky", ipa: "/ska\u026a/", pos: "n.", zh: "天空",
    collocation: "blue sky",
    example: "A colorful rainbow appeared across the bright blue sky.", exampleZh: "一道七彩彩虹出現在湛藍的天空中。",
    memoryTip: "單音節結尾 y 發長雙母音 /aɪ/"
  },
  {
    id: "fc-el-188", tier: "elem_1000", category: "自然與地理",
    word: "sun", chunk: "sun", ipa: "/s\u028cn/", pos: "n.", zh: "太陽 (單數常加 the)",
    collocation: "the sun shines",
    example: "The sun gives us light and warmth every single day.", exampleZh: "太陽每天都給予我們光和熱。",
    memoryTip: "CVC 結構，u 短母音 /ʌ/"
  },
  {
    id: "fc-el-189", tier: "elem_1000", category: "自然與地理",
    word: "moon", chunk: "moon", ipa: "/mu\u02d0n/", pos: "n.", zh: "月亮 (單數常加 the)",
    collocation: "full moon",
    example: "Families gather to admire the full moon on Mid-Autumn Festival.", exampleZh: "中秋節時闔家團圓一同賞滿月。",
    memoryTip: "oo 發長母音 /uː/"
  },
  {
    id: "fc-el-190", tier: "elem_1000", category: "自然與地理",
    word: "star", chunk: "star", ipa: "/st\u0251\u02d0r/", pos: "n.", zh: "星星、恆星",
    collocation: "shining star",
    example: "You can see millions of stars in the countryside sky.", exampleZh: "在鄉村的夜空中你能看見千萬顆星星。",
    memoryTip: "ar 發捲舌長音 /ɑːr/"
  },
  {
    id: "fc-el-191", tier: "elem_1000", category: "自然與地理",
    word: "rainbow", chunk: "rain - bow", ipa: "/\u02c8re\u026an.bo\u028a/", pos: "n.", zh: "彩虹",
    collocation: "see a rainbow",
    example: "A brilliant rainbow appeared after the sudden shower.", exampleZh: "陣雨過後出現了一道絢爛的彩虹。",
    memoryTip: "rain (雨) + bow (弓形)"
  },
  {
    id: "fc-el-192", tier: "elem_1000", category: "居家與生活",
    word: "clock", chunk: "clock", ipa: "/kl\u0251\u02d0k/", pos: "n.", zh: "時鐘、座鐘",
    collocation: "alarm clock",
    example: "The alarm clock rings loudly at six thirty.", exampleZh: "鬧鐘在六點半大聲響起。",
    memoryTip: "ck 發 /k/，o 短音 /ɑː/"
  },
  {
    id: "fc-el-193", tier: "elem_1000", category: "居家與生活",
    word: "lamp", chunk: "lamp", ipa: "/l\u00e6mp/", pos: "n.", zh: "檯燈、燈具",
    collocation: "desk lamp",
    example: "Turn on the desk lamp when you read in the evening.", exampleZh: "晚上讀書時請打開檯燈。",
    memoryTip: "CVC 結構，a 短音 /æ/"
  },
  {
    id: "fc-el-194", tier: "elem_1000", category: "居家與生活",
    word: "sofa", chunk: "so - fa", ipa: "/\u02c8so\u028a.f\u0259/", pos: "n.", zh: "沙發",
    collocation: "sit on the sofa",
    example: "Dad likes to relax on the comfortable sofa after work.", exampleZh: "爸爸下班後喜歡在舒適的沙發上放鬆。",
    memoryTip: "so /soʊ/ + fa /fə/"
  },
  {
    id: "fc-el-195", tier: "elem_1000", category: "居家與生活",
    word: "computer", chunk: "com - pu - ter", ipa: "/k\u0259m\u02c8pju\u02d0.t\u032c\u025a/", pos: "n.", zh: "電腦",
    collocation: "personal computer",
    example: "Students use the computer to look up research data.", exampleZh: "學生們使用電腦查詢研究資料。",
    memoryTip: "com /kəm/ + pu /pjuː/ + ter /t̬ɚ/"
  },
  {
    id: "fc-el-196", tier: "elem_1000", category: "居家與生活",
    word: "box", chunk: "box", ipa: "/b\u0251\u02d0ks/", pos: "n.", zh: "盒子、箱子 (複數 boxes)",
    collocation: "gift box",
    example: "She opened the mysterious box with great excitement.", exampleZh: "她懷著無比興奮的心情打開神秘盒子。",
    memoryTip: "CVC 結構，複數加 -es /ˈbɑːk.sɪz/"
  },
  {
    id: "fc-el-197", tier: "elem_1000", category: "居家與生活",
    word: "bag", chunk: "bag", ipa: "/b\u00e6\u0261/", pos: "n.", zh: "提袋、包包",
    collocation: "plastic bag",
    example: "Bring your own reusable cloth bag when shopping.", exampleZh: "購物時請自備可重複使用的布袋。",
    memoryTip: "CVC 短母音 /æ/"
  },
  {
    id: "fc-el-198", tier: "elem_1000", category: "居家與生活",
    word: "cup", chunk: "cup", ipa: "/k\u028cp/", pos: "n.", zh: "杯子 (有手把的杯)",
    collocation: "a cup of tea",
    example: "Would you like a cup of hot green tea?", exampleZh: "你想來一杯熱綠茶嗎？",
    memoryTip: "CVC 短母音 /ʌ/"
  },
  {
    id: "fc-el-199", tier: "elem_1000", category: "居家與生活",
    word: "glass", chunk: "glass", ipa: "/\u0261l\u00e6s/", pos: "n.", zh: "玻璃杯；玻璃 (不可數)",
    collocation: "a glass of water",
    example: "He drank a large glass of cold water after jogging.", exampleZh: "他慢跑後喝了一大杯冰水。",
    memoryTip: "雙寫 s，a 短音 /æ/"
  },
  {
    id: "fc-el-200", tier: "elem_1000", category: "居家與生活",
    word: "bottle", chunk: "bot - tle", ipa: "/\u02c8b\u0251\u02d0.t\u032c\u0259l/", pos: "n.", zh: "瓶子、水壺",
    collocation: "water bottle",
    example: "Remember to bring your water bottle to sports class.", exampleZh: "上體育課時記得帶上你的水壺。",
    memoryTip: "雙寫 t，bot /bɑː/ + tle /t̬əl/"
  },
  {
    id: "fc-el-201", tier: "elem_1000", category: "常見形容詞",
    word: "big", chunk: "big", ipa: "/b\u026a\u0261/", pos: "adj.", zh: "大的、巨大的",
    collocation: "big elephant",
    example: "An elephant is a very big land animal.", exampleZh: "大象是一種體型非常龐大的陸地動物。",
    memoryTip: "CVC 結構，比較級雙寫 g：bigger"
  },
  {
    id: "fc-el-202", tier: "elem_1000", category: "常見形容詞",
    word: "small", chunk: "small", ipa: "/sm\u0254\u02d0l/", pos: "adj.", zh: "小的、微小的",
    collocation: "small mouse",
    example: "A small mouse slipped into the pantry quietly.", exampleZh: "一隻小老鼠悄悄溜進了食品儲藏室。",
    memoryTip: "all 發 /ɔːl/"
  },
  {
    id: "fc-el-203", tier: "elem_1000", category: "常見形容詞",
    word: "tall", chunk: "tall", ipa: "/t\u0254\u02d0l/", pos: "adj.", zh: "高的 (身材/建築)",
    collocation: "tall building",
    example: "Taipei 101 is one of the tallest towers in Asia.", exampleZh: "台北 101 是亞洲最高的高塔之一。",
    memoryTip: "all 發 /ɔːl/"
  },
  {
    id: "fc-el-204", tier: "elem_1000", category: "常見形容詞",
    word: "short", chunk: "short", ipa: "/\u0283\u0254\u02d0rt/", pos: "adj.", zh: "矮的、短的",
    collocation: "short story",
    example: "He wrote a humorous short story for English class.", exampleZh: "他為英文課寫了一篇幽默的短篇故事。",
    memoryTip: "or 發長音 /ɔːr/"
  },
  {
    id: "fc-el-205", tier: "elem_1000", category: "常見形容詞",
    word: "long", chunk: "long", ipa: "/l\u0251\u02d0\u014b/", pos: "adj.", zh: "長的、長期的",
    collocation: "long vacation",
    example: "Summer vacation is a long and wonderful holiday.", exampleZh: "暑假是一段漫長而美好的假期。",
    memoryTip: "ong 發 /ɑːŋ/"
  },
  {
    id: "fc-el-206", tier: "elem_1000", category: "常見形容詞",
    word: "fast", chunk: "fast", ipa: "/f\u00e6st/", pos: "adj. / adv.", zh: "快的；迅速地",
    collocation: "run fast",
    example: "Cheetahs can run exceptionally fast across grasslands.", exampleZh: "獵豹能在草原上以極快速度奔馳。",
    memoryTip: "a 短音 /æ/"
  },
  {
    id: "fc-el-207", tier: "elem_1000", category: "常見形容詞",
    word: "slow", chunk: "slow", ipa: "/slo\u028a/", pos: "adj.", zh: "緩慢的",
    collocation: "slow turtle",
    example: "Turtles walk with slow and steady steps.", exampleZh: "烏龜邁著緩慢而穩健的步伐行走。",
    memoryTip: "ow 發長母音 /oʊ/"
  },
  {
    id: "fc-el-208", tier: "elem_1000", category: "常見形容詞",
    word: "hot", chunk: "hot", ipa: "/h\u0251\u02d0t/", pos: "adj.", zh: "炎熱的、燙的",
    collocation: "hot soup",
    example: "Be careful because the hot soup might burn your tongue.", exampleZh: "請小心，熱湯可能會燙傷你的舌頭。",
    memoryTip: "CVC 結構，比較級雙寫 t：hotter"
  },
  {
    id: "fc-el-209", tier: "elem_1000", category: "常見形容詞",
    word: "cold", chunk: "cold", ipa: "/ko\u028ald/", pos: "adj.", zh: "寒冷的、冰涼的",
    collocation: "cold weather",
    example: "Drinking ice-cold juice is refreshing in summer.", exampleZh: "夏天喝冰涼果汁令人心曠神怡。",
    memoryTip: "old 字母組合發 /oʊld/"
  },
  {
    id: "fc-el-210", tier: "elem_1000", category: "常見形容詞",
    word: "new", chunk: "new", ipa: "/nu\u02d0/", pos: "adj.", zh: "新的、嶄新的",
    collocation: "new shoes",
    example: "I wore my new shoes to school for the first time.", exampleZh: "我第一次穿新鞋去上學。",
    memoryTip: "ew 字母組合發 /nuː/"
  },
  {
    id: "fc-el-211", tier: "elem_1000", category: "常見形容詞",
    word: "old", chunk: "old", ipa: "/o\u028ald/", pos: "adj.", zh: "年老的、陳舊的",
    collocation: "old friend",
    example: "Meeting an old friend brings back happy memories.", exampleZh: "遇見老朋友會喚起美好的回憶。",
    memoryTip: "old 發 /oʊld/"
  },
  {
    id: "fc-el-212", tier: "elem_1000", category: "常見形容詞",
    word: "young", chunk: "young", ipa: "/j\u028c\u014b/", pos: "adj.", zh: "年輕的、幼小的",
    collocation: "young children",
    example: "Young children learn languages very quickly.", exampleZh: "幼童學習語言非常快速。",
    memoryTip: "ou 不規則發短母音 /ʌ/"
  },
  {
    id: "fc-el-213", tier: "elem_1000", category: "常見形容詞",
    word: "busy", chunk: "bus - y", ipa: "/\u02c8b\u026az.i/", pos: "adj.", zh: "忙碌的、繁忙的",
    collocation: "busy day",
    example: "Dad had a very busy and productive day at work.", exampleZh: "爸爸在工作上度過了非常忙碌且充實的一天。",
    memoryTip: "u 不規則發短母音 /ɪ/！"
  },
  {
    id: "fc-el-214", tier: "elem_1000", category: "常見形容詞",
    word: "easy", chunk: "eas - y", ipa: "/\u02c8i\u02d0.zi/", pos: "adj.", zh: "容易的、簡便的",
    collocation: "easy question",
    example: "This English question is quite easy to answer.", exampleZh: "這道英文題目相當容易回答。",
    memoryTip: "ea 發長母音 /iː/，s 發 /z/"
  },
  {
    id: "fc-el-215", tier: "elem_1000", category: "常見形容詞",
    word: "hard", chunk: "hard", ipa: "/h\u0251\u02d0rd/", pos: "adj. / adv.", zh: "困難的；努力地",
    collocation: "work hard",
    example: "If you study hard, you will achieve your goals.", exampleZh: "如果你努力學習，你一定能達成目標。",
    memoryTip: "ar 發捲舌長音 /ɑːr/"
  },
  {
    id: "fc-el-216", tier: "elem_1000", category: "常見形容詞",
    word: "sweet", chunk: "sweet", ipa: "/swi\u02d0t/", pos: "adj.", zh: "甜的、芳香的",
    collocation: "sweet apples",
    example: "These red apples taste delightfully sweet.", exampleZh: "這些紅蘋果嘗起來非常甘甜可口。",
    memoryTip: "ee 發長母音 /iː/"
  },

  // 2. 國中會考 2,000 (JHS 2,000)
  {
    id: "fc-jh-001", tier: "jhs_2000", category: "會考不規則動詞",
    word: "choose", chunk: "choose", ipa: "/t\u0283u\u02d0z/", pos: "v.", zh: "選擇、挑選 (三態 choose-chose-chosen)",
    collocation: "choose wisely",
    example: "You have to choose one option from the four choices.", exampleZh: "你必須從四個選項中挑選一個。",
    memoryTip: "三態：choose /tʃuːz/ ➔ chose /tʃoʊz/ ➔ chosen /ˈtʃoʊ.zən/"
  },
  {
    id: "fc-jh-002", tier: "jhs_2000", category: "會考不規則動詞",
    word: "freeze", chunk: "freeze", ipa: "/fri\u02d0z/", pos: "v.", zh: "結冰、凍結 (三態 freeze-froze-frozen)",
    collocation: "freeze into ice",
    example: "Water freezes into ice at zero degrees Celsius.", exampleZh: "水在攝氏零度時會結成冰。",
    memoryTip: "三態：freeze ➔ froze ➔ frozen"
  },
  {
    id: "fc-jh-003", tier: "jhs_2000", category: "會考不規則動詞",
    word: "rise", chunk: "rise", ipa: "/ra\u026az/", pos: "v.", zh: "上升、升起 (三態 rise-rose-risen，不及物)",
    collocation: "the sun rises",
    example: "The sun rises in the east and sets in the west.", exampleZh: "太陽從東方升起，從西方落下。",
    memoryTip: "不及物動詞！不接受詞。三態：rise ➔ rose ➔ risen"
  },
  {
    id: "fc-jh-004", tier: "jhs_2000", category: "會考易混淆動詞",
    word: "raise", chunk: "raise", ipa: "/re\u026az/", pos: "v.", zh: "舉起、撫養、籌募 (及物動詞)",
    collocation: "raise one's hand",
    example: "Please raise your hand if you have any questions.", exampleZh: "如果你有任何問題，請舉手。",
    memoryTip: "及物動詞！後方必接名詞受詞。規則變化：raise-raised-raised"
  },
  {
    id: "fc-jh-005", tier: "jhs_2000", category: "會考不規則動詞",
    word: "lead", chunk: "lead", ipa: "/li\u02d0d/", pos: "v.", zh: "引導、帶領、導致 (三態 lead-led-led)",
    collocation: "lead to (導致)",
    example: "Hard work and dedication will lead to great success.", exampleZh: "努力與投入將會引導走向巨大的成功。",
    memoryTip: "三態：lead ➔ led ➔ led。注意 lead to 常考片語！"
  },
  {
    id: "fc-jh-006", tier: "jhs_2000", category: "會考不規則動詞",
    word: "spread", chunk: "spread", ipa: "/spr\u025bd/", pos: "v.", zh: "傳播、蔓延 (三態同形 spread-spread-spread)",
    collocation: "spread rumors",
    example: "False news can spread very quickly across the internet.", exampleZh: "假消息在網路上傳播得非常快速。",
    memoryTip: "三態同形：spread ➔ spread ➔ spread，ea 發短母音 /ɛ/"
  },
  {
    id: "fc-jh-007", tier: "jhs_2000", category: "會考不規則動詞",
    word: "grow", chunk: "grow", ipa: "/\u0261ro\u028a/", pos: "v.", zh: "成長、種植 (三態 grow-grew-grown)",
    collocation: "grow up (長大)",
    example: "Vegetables grow very well in this fertile soil.", exampleZh: "蔬菜在這片肥沃的土壤中生長得非常好。",
    memoryTip: "三態：grow ➔ grew /ɡruː/ ➔ grown /ɡroʊn/"
  },
  {
    id: "fc-jh-008", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hide", chunk: "hide", ipa: "/ha\u026ad/", pos: "v.", zh: "躲藏、隱藏 (三態 hide-hid-hidden)",
    collocation: "hide and seek",
    example: "The little cat hid under the sofa during the thunderstorm.", exampleZh: "在雷雨期間，小貓躲在沙發底下。",
    memoryTip: "三態：hide ➔ hid ➔ hidden"
  },
  {
    id: "fc-jh-009", tier: "jhs_2000", category: "會考不規則動詞",
    word: "steal", chunk: "steal", ipa: "/sti\u02d0l/", pos: "v.", zh: "偷竊 (三態 steal-stole-stolen)",
    collocation: "steal money",
    example: "The thief stole a bicycle from outside the store.", exampleZh: "小偷從店門口偷走了一輛腳踏車。",
    memoryTip: "三態：steal ➔ stole ➔ stolen"
  },
  {
    id: "fc-jh-010", tier: "jhs_2000", category: "會考不規則動詞",
    word: "shake", chunk: "shake", ipa: "/\u0283e\u026ak/", pos: "v.", zh: "搖動、握手 (三態 shake-shook-shaken)",
    collocation: "shake hands",
    example: "They shook hands politely after concluding the deal.", exampleZh: "達成協議後，他們禮貌地握了手。",
    memoryTip: "三態：shake ➔ shook ➔ shaken"
  },
  {
    id: "fc-jh-011", tier: "jhs_2000", category: "會考不規則動詞",
    word: "break", chunk: "break", ipa: "/bre\u026ak/", pos: "v.", zh: "打破、折斷 (三態 break-broke-broken)",
    collocation: "break the rule (違規)",
    example: "Never break safety rules in the laboratory.", exampleZh: "在實驗室裡切勿違反安全守則。",
    memoryTip: "三態：break ➔ broke ➔ broken，ea 發長音 /eɪ/"
  },
  {
    id: "fc-jh-012", tier: "jhs_2000", category: "會考不規則動詞",
    word: "bring", chunk: "bring", ipa: "/br\u026a\u014b/", pos: "v.", zh: "帶來、攜帶 (三態 bring-brought-brought)",
    collocation: "bring lunch",
    example: "Remember to bring your textbook to class tomorrow.", exampleZh: "記得明天上課要把課本帶來。",
    memoryTip: "三態：bring ➔ brought /brɔːt/ ➔ brought"
  },
  {
    id: "fc-jh-013", tier: "jhs_2000", category: "會考不規則動詞",
    word: "buy", chunk: "buy", ipa: "/ba\u026a/", pos: "v.", zh: "購買、買下 (三態 buy-bought-bought)",
    collocation: "buy gifts",
    example: "She bought a birthday present for her best friend.", exampleZh: "她為她最好的朋友買了一份生日禮物。",
    memoryTip: "三態：buy ➔ bought /bɔːt/ ➔ bought"
  },
  {
    id: "fc-jh-014", tier: "jhs_2000", category: "會考不規則動詞",
    word: "catch", chunk: "catch", ipa: "/k\u00e6t\u0283/", pos: "v.", zh: "捕捉、趕上（車）(三態 catch-caught-caught)",
    collocation: "catch the bus",
    example: "Hurry up, or we will not be able to catch the last bus.", exampleZh: "快一點，否則我們會趕不上末班公車。",
    memoryTip: "三態：catch ➔ caught /kɔːt/ ➔ caught"
  },
  {
    id: "fc-jh-015", tier: "jhs_2000", category: "會考不規則動詞",
    word: "drive", chunk: "drive", ipa: "/dra\u026av/", pos: "v.", zh: "駕駛、開車 (三態 drive-drove-driven)",
    collocation: "drive carefully",
    example: "Always drive carefully in rainy or snowy conditions.", exampleZh: "在雨雪天候中行車務必小心謹慎。",
    memoryTip: "三態：drive ➔ drove ➔ driven /ˈdrɪv.ən/"
  },
  {
    id: "fc-jh-016", tier: "jhs_2000", category: "會考不規則動詞",
    word: "fall", chunk: "fall", ipa: "/f\u0254\u02d0l/", pos: "v.", zh: "落下、跌倒 (三態 fall-fell-fallen)",
    collocation: "fall down",
    example: "Leaves fall from trees when autumn arrives.", exampleZh: "秋天來臨時樹葉自枝頭飄落。",
    memoryTip: "三態：fall ➔ fell ➔ fallen"
  },
  {
    id: "fc-jh-017", tier: "jhs_2000", category: "會考不規則動詞",
    word: "feel", chunk: "feel", ipa: "/fi\u02d0l/", pos: "v.", zh: "感覺、覺得 (連綴動詞，三態 feel-felt-felt)",
    collocation: "feel happy",
    example: "I felt very excited when I received the acceptance letter.", exampleZh: "收到錄取通知時我感到無比興奮。",
    memoryTip: "連綴動詞！後接形容詞補語。三態：feel ➔ felt ➔ felt"
  },
  {
    id: "fc-jh-018", tier: "jhs_2000", category: "會考不規則動詞",
    word: "find", chunk: "find", ipa: "/fa\u026and/", pos: "v.", zh: "尋獲、發現 (三態 find-found-found)",
    collocation: "find out (查明)",
    example: "Did you find out what caused the unexpected power outage?", exampleZh: "你有查出是什麼原因導致這場突發停電嗎？",
    memoryTip: "三態：find ➔ found ➔ found"
  },
  {
    id: "fc-jh-019", tier: "jhs_2000", category: "會考不規則動詞",
    word: "forget", chunk: "for - get", ipa: "/f\u025a\u02c8\u0261\u025bt/", pos: "v.", zh: "忘記 (三態 forget-forgot-forgotten)",
    collocation: "forget to bring",
    example: "Don't forget to lock the front door before leaving.", exampleZh: "出門前別忘記鎖上大門。",
    memoryTip: "forget to V (忘記去做) vs forget V-ing (忘記曾做過)"
  },
  {
    id: "fc-jh-020", tier: "jhs_2000", category: "會考不規則動詞",
    word: "give", chunk: "give", ipa: "/\u0261\u026av/", pos: "v.", zh: "給予、贈送 (三態 give-gave-given)",
    collocation: "give up (放棄)",
    example: "Never give up on your dreams, no matter how tough it gets.", exampleZh: "無論多麼艱辛，絕不要放棄你的夢想。",
    memoryTip: "三態：give ➔ gave ➔ given"
  },
  {
    id: "fc-jh-021", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hear", chunk: "hear", ipa: "/h\u026ar/", pos: "v.", zh: "聽見 (感官動詞，三態 hear-heard-heard)",
    collocation: "hear a sound",
    example: "I heard someone calling my name outside the window.", exampleZh: "我聽見有人在窗外喊我的名字。",
    memoryTip: "感官動詞！受詞後接原形動詞或 V-ing。三態：hear ➔ heard /hɝːd/"
  },
  {
    id: "fc-jh-022", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hold", chunk: "hold", ipa: "/ho\u028ald/", pos: "v.", zh: "握住、舉辦 (三態 hold-held-held)",
    collocation: "hold an event",
    example: "The student council will hold a charity sale next Friday.", exampleZh: "學生會下週五將舉辦一場慈善義賣。",
    memoryTip: "三態：hold ➔ held ➔ held"
  },
  {
    id: "fc-jh-023", tier: "jhs_2000", category: "會考不規則動詞",
    word: "keep", chunk: "keep", ipa: "/ki\u02d0p/", pos: "v.", zh: "保持、持續 (三態 keep-kept-kept)",
    collocation: "keep going",
    example: "Keep practicing every day and your English will improve.", exampleZh: "持續每天練習，你的英文一定會進步。",
    memoryTip: "keep + V-ing 表持續動作。三態：keep ➔ kept ➔ kept"
  },
  {
    id: "fc-jh-024", tier: "jhs_2000", category: "會考不規則動詞",
    word: "know", chunk: "know", ipa: "/no\u028a/", pos: "v.", zh: "知道、認識 (三態 know-knew-known)",
    collocation: "know the truth",
    example: "I didn't know that she could speak three languages.", exampleZh: "我以前不知道她竟然能說三種語言。",
    memoryTip: "k 不發音！三態：know ➔ knew /nuː/ ➔ known /noʊn/"
  },
  {
    id: "fc-jh-025", tier: "jhs_2000", category: "會考不規則動詞",
    word: "leave", chunk: "leave", ipa: "/li\u02d0v/", pos: "v.", zh: "離開、留下 (三態 leave-left-left)",
    collocation: "leave for (前往)",
    example: "The bullet train leaves for Kaohsiung at eight thirty.", exampleZh: "高鐵於八點半開往高雄。",
    memoryTip: "三態：leave ➔ left ➔ left"
  },
  {
    id: "fc-jh-026", tier: "jhs_2000", category: "會考不規則動詞",
    word: "lose", chunk: "lose", ipa: "/lu\u02d0z/", pos: "v.", zh: "遺失、輸掉 (三態 lose-lost-lost)",
    collocation: "lose a game",
    example: "Be careful not to lose your passport when traveling.", exampleZh: "旅行時務必小心不要遺失你的護照。",
    memoryTip: "三態：lose ➔ lost ➔ lost。注意與 loose /luːs/ (鬆的) 區分！"
  },
  {
    id: "fc-jh-027", tier: "jhs_2000", category: "會考不規則動詞",
    word: "meet", chunk: "meet", ipa: "/mi\u02d0t/", pos: "v.", zh: "遇見、迎接 (三態 meet-met-met)",
    collocation: "meet friends",
    example: "We decided to meet in front of the subway station.", exampleZh: "我們決定在捷運站前面碰面。",
    memoryTip: "三態：meet ➔ met ➔ met"
  },
  {
    id: "fc-jh-028", tier: "jhs_2000", category: "會考不規則動詞",
    word: "pay", chunk: "pay", ipa: "/pe\u026a/", pos: "v. / n.", zh: "支付、付款 (三態 pay-paid-paid)",
    collocation: "pay attention to",
    example: "Pay close attention to what the teacher is explaining.", exampleZh: "密切注意老師正在說明的內容。",
    memoryTip: "三態：pay ➔ paid ➔ paid。注意 pay attention to 核心片語！"
  },
  {
    id: "fc-jh-029", tier: "jhs_2000", category: "會考不規則動詞",
    word: "ride", chunk: "ride", ipa: "/ra\u026ad/", pos: "v.", zh: "騎乘（車/馬）(三態 ride-rode-ridden)",
    collocation: "ride a bicycle",
    example: "He rides his bicycle to the sports center every weekend.", exampleZh: "他每週末都騎腳踏車去運動中心。",
    memoryTip: "三態：ride ➔ rode ➔ ridden /ˈrɪd.ən/"
  },
  {
    id: "fc-jh-030", tier: "jhs_2000", category: "會考不規則動詞",
    word: "see", chunk: "see", ipa: "/si\u02d0/", pos: "v.", zh: "看見 (感官動詞，三態 see-saw-seen)",
    collocation: "see a movie",
    example: "Did you see what happened at the corner of the street?", exampleZh: "你有看見街角發生了什麼事嗎？",
    memoryTip: "感官動詞！受詞後接原形動詞或 V-ing。三態：see ➔ saw /sɔː/ ➔ seen"
  },
  {
    id: "fc-jh-031", tier: "jhs_2000", category: "會考不規則動詞",
    word: "send", chunk: "send", ipa: "/s\u025bnd/", pos: "v.", zh: "寄發、派遣 (三態 send-sent-sent)",
    collocation: "send an email",
    example: "I will send you the detailed schedule by email today.", exampleZh: "我今天會透過電子郵件寄給你詳細時程表。",
    memoryTip: "三態：send ➔ sent ➔ sent"
  },
  {
    id: "fc-jh-032", tier: "jhs_2000", category: "會考不規則動詞",
    word: "sing", chunk: "sing", ipa: "/s\u026a\u014b/", pos: "v.", zh: "歌唱 (三態 sing-sang-sung)",
    collocation: "sing a song",
    example: "The choir sang beautiful carols at the celebration.", exampleZh: "合唱團在慶祝活動中唱出了優美的頌歌。",
    memoryTip: "三態：sing ➔ sang /sæŋ/ ➔ sung /sʌŋ/"
  },
  {
    id: "fc-jh-033", tier: "jhs_2000", category: "會考不規則動詞",
    word: "sit", chunk: "sit", ipa: "/s\u026at/", pos: "v.", zh: "坐下 (三態 sit-sat-sat)",
    collocation: "sit down",
    example: "Please sit down and make yourself comfortable.", exampleZh: "請坐下，放輕鬆別拘束。",
    memoryTip: "三態：sit ➔ sat ➔ sat"
  },
  {
    id: "fc-jh-034", tier: "jhs_2000", category: "會考不規則動詞",
    word: "spend", chunk: "spend", ipa: "/sp\u025bnd/", pos: "v.", zh: "花費（時間/金錢）(三態 spend-spent-spent)",
    collocation: "spend time on",
    example: "She spends two hours studying English every evening.", exampleZh: "她每天晚上花兩小時研讀英文。",
    memoryTip: "主詞必為人！人 + spend + 時間/金錢 + (on N / V-ing)"
  },
  {
    id: "fc-jh-035", tier: "jhs_2000", category: "會考不規則動詞",
    word: "stand", chunk: "stand", ipa: "/st\u00e6nd/", pos: "v.", zh: "站立、忍受 (三態 stand-stood-stood)",
    collocation: "stand in line",
    example: "Passengers must stand behind the yellow safety line.", exampleZh: "乘客必須站在黃色安全線後方。",
    memoryTip: "三態：stand ➔ stood /stʊd/ ➔ stood"
  },
  {
    id: "fc-jh-036", tier: "jhs_2000", category: "會考不規則動詞",
    word: "swim", chunk: "swim", ipa: "/sw\u026am/", pos: "v.", zh: "游泳 (三態 swim-swam-swum)",
    collocation: "swim across",
    example: "He swam across the lake during the summer competition.", exampleZh: "他在夏季賽事中游過了整座湖泊。",
    memoryTip: "三態：swim ➔ swam /swæm/ ➔ swum /swʌm/"
  },
  {
    id: "fc-jh-037", tier: "jhs_2000", category: "會考不規則動詞",
    word: "take", chunk: "take", ipa: "/te\u026ak/", pos: "v.", zh: "拿取、花費（時間）(三態 take-took-taken)",
    collocation: "take a shower",
    example: "It took me three days to finish writing the essay.", exampleZh: "寫完這篇論文花了我三天的時間。",
    memoryTip: "虛主詞 it 表花費時間：It takes (人) + 時間 + to V"
  },
  {
    id: "fc-jh-038", tier: "jhs_2000", category: "會考不規則動詞",
    word: "teach", chunk: "teach", ipa: "/ti\u02d0t\u0283/", pos: "v.", zh: "教導、講授 (三態 teach-taught-taught)",
    collocation: "teach English",
    example: "Mr. Davis has taught mathematics for over twenty years.", exampleZh: "戴維斯老師教授數學已經超過二十年了。",
    memoryTip: "三態：teach ➔ taught /tɔːt/ ➔ taught"
  },
  {
    id: "fc-jh-039", tier: "jhs_2000", category: "會考不規則動詞",
    word: "tell", chunk: "tell", ipa: "/t\u025bl/", pos: "v.", zh: "告訴、辨別 (三態 tell-told-told)",
    collocation: "tell a story",
    example: "Can you tell me the difference between these two words?", exampleZh: "你能告訴我這兩個單字之間的差異嗎？",
    memoryTip: "授與動詞：tell + 人 + 事物。三態：tell ➔ told ➔ told"
  },
  {
    id: "fc-jh-040", tier: "jhs_2000", category: "會考不規則動詞",
    word: "think", chunk: "think", ipa: "/\u03b8\u026a\u014bk/", pos: "v.", zh: "思考、認為 (三態 think-thought-thought)",
    collocation: "think about",
    example: "Take a few minutes to think carefully about the plan.", exampleZh: "花幾分鐘仔細思考一下這項計畫。",
    memoryTip: "三態：think ➔ thought /θɔːt/ ➔ thought"
  },
  {
    id: "fc-jh-041", tier: "jhs_2000", category: "會考不規則動詞",
    word: "throw", chunk: "throw", ipa: "/\u03b8ro\u028a/", pos: "v.", zh: "投擲、拋丟 (三態 throw-threw-thrown)",
    collocation: "throw a ball",
    example: "The pitcher threw the baseball with tremendous speed.", exampleZh: "投手以驚人的球速投出了棒球。",
    memoryTip: "三態：throw ➔ threw /θruː/ ➔ thrown /θroʊn/"
  },
  {
    id: "fc-jh-042", tier: "jhs_2000", category: "會考不規則動詞",
    word: "wear", chunk: "wear", ipa: "/w\u025br/", pos: "v.", zh: "穿著、配戴 (三態 wear-wore-worn)",
    collocation: "wear a mask",
    example: "People wear face masks on public transport to stay safe.", exampleZh: "人們在大眾運輸上戴口罩以確保安全。",
    memoryTip: "三態：wear ➔ wore ➔ worn"
  },
  {
    id: "fc-jh-043", tier: "jhs_2000", category: "會考不規則動詞",
    word: "win", chunk: "win", ipa: "/w\u026an/", pos: "v.", zh: "贏得、獲勝 (三態 win-won-won)",
    collocation: "win a prize",
    example: "Our basketball team won the championship yesterday.", exampleZh: "我們的籃球隊昨天贏得了總冠軍。",
    memoryTip: "三態：win ➔ won /wʌn/ ➔ won"
  },
  {
    id: "fc-jh-044", tier: "jhs_2000", category: "科技與數位生活",
    word: "technology", chunk: "tech - nol - o - gy", ipa: "/t\u025bk\u02c8n\u0251\u02d0.l\u0259.d\u0292i/", pos: "n.", zh: "科技、技術",
    collocation: "modern technology",
    example: "Modern technology makes communication across borders instant.", exampleZh: "現代科技使得跨國溝通變得即時迅捷。",
    memoryTip: "techno (技術) + -logy (學問/學科)"
  },
  {
    id: "fc-jh-045", tier: "jhs_2000", category: "科技與數位生活",
    word: "internet", chunk: "in - ter - net", ipa: "/\u02c8\u026an.t\u025a.n\u025bt/", pos: "n.", zh: "網際網路、網路",
    collocation: "surf the internet",
    example: "Students search for reference materials on the internet.", exampleZh: "學生們在網際網路上搜尋參考資料。",
    memoryTip: "inter- (相互/國際) + net (網絡)"
  },
  {
    id: "fc-jh-046", tier: "jhs_2000", category: "科技與數位生活",
    word: "smartphone", chunk: "smart - phone", ipa: "/\u02c8sm\u0251\u02d0rt.fo\u028an/", pos: "n.", zh: "智慧型手機",
    collocation: "use a smartphone",
    example: "Do not look at your smartphone screen while walking.", exampleZh: "走路時請不要盯著智慧型手機螢幕看。",
    memoryTip: "smart (聰明的) + phone (電話)"
  },
  {
    id: "fc-jh-047", tier: "jhs_2000", category: "科技與數位生活",
    word: "software", chunk: "soft - ware", ipa: "/\u02c8s\u0251\u02d0ft.w\u025br/", pos: "n.", zh: "軟體 (不可數)",
    collocation: "install software",
    example: "You need to update your antivirus software regularly.", exampleZh: "你需要定期更新你的防毒軟體。",
    memoryTip: "soft (軟) + ware (製品)，不可數名詞！"
  },
  {
    id: "fc-jh-048", tier: "jhs_2000", category: "科技與數位生活",
    word: "device", chunk: "de - vice", ipa: "/d\u026a\u02c8va\u026as/", pos: "n.", zh: "電子設備、裝置",
    collocation: "electronic device",
    example: "Turn off all electronic devices during the airplane takeoff.", exampleZh: "飛機起飛期間請關閉所有電子裝置。",
    memoryTip: "de- + vice (發音 /vaɪs/)"
  },
  {
    id: "fc-jh-049", tier: "jhs_2000", category: "科技與數位生活",
    word: "application", chunk: "ap - pli - ca - tion", ipa: "/\u02cc\u00e6p.l\u0259\u02c8ke\u026a.\u0283\u0259n/", pos: "n.", zh: "應用程式 (App)、申請",
    collocation: "download an application",
    example: "This learning application helps students practice English listening.", exampleZh: "這款學習應用程式能幫助學生練習英語聽力。",
    memoryTip: "apply (申請/應用) ➔ application"
  },
  {
    id: "fc-jh-050", tier: "jhs_2000", category: "科技與數位生活",
    word: "connect", chunk: "con - nect", ipa: "/k\u0259\u02c8n\u025bkt/", pos: "v.", zh: "連接、連結",
    collocation: "connect to Wi-Fi",
    example: "My tablet cannot connect to the school wireless network.", exampleZh: "我的平板無法連上學校的無線網路。",
    memoryTip: "con- (共同) + nect (綁定/連接)"
  },
  {
    id: "fc-jh-051", tier: "jhs_2000", category: "科技與數位生活",
    word: "information", chunk: "in - for - ma - tion", ipa: "/\u02cc\u026an.f\u025a\u02c8me\u026a.\u0283\u0259n/", pos: "n.", zh: "資訊、消息 (不可數)",
    collocation: "useful information",
    example: "The official website provides reliable information for tourists.", exampleZh: "官方網站為遊客提供可靠的旅遊資訊。",
    memoryTip: "注意：information 在英文中恆為不可數名詞！"
  },
  {
    id: "fc-jh-052", tier: "jhs_2000", category: "科技與數位生活",
    word: "online", chunk: "on - line", ipa: "/\u02c8\u0251\u02d0n.la\u026an/", pos: "adj. / adv.", zh: "在線的、線上的",
    collocation: "online learning",
    example: "Many students take online English courses during holidays.", exampleZh: "許多學生在假期期間參加線上英語課程。",
    memoryTip: "on + line (在線上)"
  },
  {
    id: "fc-jh-053", tier: "jhs_2000", category: "科技與數位生活",
    word: "digital", chunk: "dig - i - tal", ipa: "/\u02c8d\u026ad\u0292.\u0259.t\u032c\u0259l/", pos: "adj.", zh: "數位的、數位化的",
    collocation: "digital world",
    example: "We live in a digital age where information spreads instantly.", exampleZh: "我們生活在一個資訊即時傳播的數位時代。",
    memoryTip: "digit (數字) + -al (形容詞尾綴)"
  },
  {
    id: "fc-jh-054", tier: "jhs_2000", category: "環境與生態",
    word: "environment", chunk: "en - vi - ron - ment", ipa: "/\u026an\u02c8va\u026a.r\u0259n.m\u0259nt/", pos: "n.", zh: "自然環境",
    collocation: "protect the environment",
    example: "We should reduce plastic waste to protect the environment.", exampleZh: "我們應該減少塑膠垃圾以保護環境。",
    memoryTip: "environ (環繞) + -ment (名詞尾綴)"
  },
  {
    id: "fc-jh-055", tier: "jhs_2000", category: "環境與生態",
    word: "pollution", chunk: "pol - lu - tion", ipa: "/p\u0259\u02c8lu\u02d0.\u0283\u0259n/", pos: "n.", zh: "污染 (空氣/水源等)",
    collocation: "air pollution",
    example: "Air pollution has become a serious issue in big cities.", exampleZh: "空氣污染已經成為大城市中的嚴重問題。",
    memoryTip: "pollute (污染) + -tion (名詞尾綴)"
  },
  {
    id: "fc-jh-056", tier: "jhs_2000", category: "環境與生態",
    word: "recycle", chunk: "re - cy - cle", ipa: "/\u02ccri\u02d0\u02c8sa\u026a.k\u0259l/", pos: "v.", zh: "回收、循環利用",
    collocation: "recycle paper and plastic",
    example: "Our school encourages all students to recycle plastic bottles.", exampleZh: "我們學校鼓勵所有學生回收寶特瓶。",
    memoryTip: "re- (再) + cycle (循環) ➔ 資源回收"
  },
  {
    id: "fc-jh-057", tier: "jhs_2000", category: "環境與生態",
    word: "climate", chunk: "cli - mate", ipa: "/\u02c8kla\u026a.m\u0259t/", pos: "n.", zh: "氣候 (長期平均狀態)",
    collocation: "climate change",
    example: "Global climate change causes more frequent extreme weather events.", exampleZh: "全球氣候變遷造成更頻繁的極端天氣事件。",
    memoryTip: "cli 發 /klaɪ/ + mate 弱讀 /mət/"
  },
  {
    id: "fc-jh-058", tier: "jhs_2000", category: "環境與生態",
    word: "energy", chunk: "en - er - gy", ipa: "/\u02c8\u025bn.\u025a.d\u0292i/", pos: "n.", zh: "能源、精力",
    collocation: "solar energy (太陽能)",
    example: "Solar and wind power are clean renewable sources of energy.", exampleZh: "太陽能與風力是潔淨的可再生能源。",
    memoryTip: "g 在 y 前發軟音 /dʒ/，en-er-gy"
  },
  {
    id: "fc-jh-059", tier: "jhs_2000", category: "環境與生態",
    word: "protect", chunk: "pro - tect", ipa: "/pr\u0259\u02c8t\u025bkt/", pos: "v.", zh: "保護、防護",
    collocation: "protect wildlife",
    example: "National parks are established to protect wild animal habitats.", exampleZh: "設立國家公園是為了保護野生動物的棲地。",
    memoryTip: "pro- (向前) + tect (覆蓋/遮蔽，如 detect)"
  },
  {
    id: "fc-jh-060", tier: "jhs_2000", category: "環境與生態",
    word: "disaster", chunk: "dis - as - ter", ipa: "/d\u026a\u02c8z\u00e6s.t\u025a/", pos: "n.", zh: "災害、天災",
    collocation: "natural disaster",
    example: "The severe earthquake was the worst natural disaster in years.", exampleZh: "這場強烈地震是數年來最嚴重的自然災害。",
    memoryTip: "dis- (不祥/負面) + aster (星象) ➔ 凶星降臨 ➔ 災難"
  },
  {
    id: "fc-jh-061", tier: "jhs_2000", category: "環境與生態",
    word: "typhoon", chunk: "ty - phoon", ipa: "/ta\u026a\u02c8fu\u02d0n/", pos: "n.", zh: "颱風",
    collocation: "super typhoon",
    example: "The powerful typhoon brought heavy rain and strong gusts.", exampleZh: "這場強烈颱風帶來了豪雨與強勁陣風。",
    memoryTip: "源自粵語「大風」音譯，ty (/taɪ/) + phoon (/fuːn/)"
  },
  {
    id: "fc-jh-062", tier: "jhs_2000", category: "環境與生態",
    word: "earthquake", chunk: "earth - quake", ipa: "/\u02c8\u025d\u02d0\u03b8.kwe\u026ak/", pos: "n.", zh: "地震",
    collocation: "hit by an earthquake",
    example: "Taiwan has strict building codes to withstand frequent earthquakes.", exampleZh: "台灣制定了嚴格的建築防震法規以抵禦頻繁地震。",
    memoryTip: "earth (地球/陸地) + quake (震動)"
  },
  {
    id: "fc-jh-063", tier: "jhs_2000", category: "環境與生態",
    word: "resource", chunk: "re - source", ipa: "/\u02c8ri\u02d0.s\u0254\u02d0rs/", pos: "n.", zh: "資源、財源",
    collocation: "natural resources",
    example: "Water is one of our most precious natural resources.", exampleZh: "水是我們最寶貴的自然資源之一。",
    memoryTip: "re- (再) + source (源頭)"
  },
  {
    id: "fc-jh-064", tier: "jhs_2000", category: "個性與人際",
    word: "honest", chunk: "hon - est", ipa: "/\u02c8\u0251\u02d0.n\u026ast/", pos: "adj.", zh: "誠實的、正直的",
    collocation: "honest answer",
    example: "It is always better to be honest than to tell lies.", exampleZh: "誠實總比說謊來得更好。",
    memoryTip: "h 不發音！冠詞需使用 an honest person！"
  },
  {
    id: "fc-jh-065", tier: "jhs_2000", category: "個性與人際",
    word: "patient", chunk: "pa - tient", ipa: "/\u02c8pe\u026a.\u0283\u0259nt/", pos: "adj. / n.", zh: "有耐心的；病人",
    collocation: "be patient with",
    example: "Teachers must be patient when helping young learners.", exampleZh: "老師在輔導年幼學習者時必須有耐心。",
    memoryTip: "ti 在母音前發軟音 /ʃ/，pa-tient"
  },
  {
    id: "fc-jh-066", tier: "jhs_2000", category: "個性與人際",
    word: "generous", chunk: "gen - er - ous", ipa: "/\u02c8d\u0292\u025bn.\u025a.\u0259s/", pos: "adj.", zh: "慷慨的、大方的",
    collocation: "generous donation",
    example: "He is generous enough to share his snacks with everyone.", exampleZh: "他很大方，把自己的點心分給每個人享用。",
    memoryTip: "g 在 e 前發 /dʒ/，-ous 為形容詞字尾"
  },
  {
    id: "fc-jh-067", tier: "jhs_2000", category: "個性與人際",
    word: "confident", chunk: "con - fi - dent", ipa: "/\u02c8k\u0251\u02d0n.f\u0259.d\u0259nt/", pos: "adj.", zh: "有信心的、自信的",
    collocation: "feel confident",
    example: "Practicing speaking will make you feel confident in exams.", exampleZh: "多練習口說能讓你在考試時感到信心充足。",
    memoryTip: "con- + fid (信任/相信) + -ent"
  },
  {
    id: "fc-jh-068", tier: "jhs_2000", category: "個性與人際",
    word: "creative", chunk: "cre - a - tive", ipa: "/kri\u02c8e\u026a.t\u026av/", pos: "adj.", zh: "有創意的、創造性的",
    collocation: "creative idea",
    example: "The artist came up with a creative design for the poster.", exampleZh: "該藝術家為海報想出了一個富有創意的設計。",
    memoryTip: "create (創造) + -ive (形容詞尾綴)"
  },
  {
    id: "fc-jh-069", tier: "jhs_2000", category: "個性與人際",
    word: "responsible", chunk: "re - spon - si - ble", ipa: "/r\u026a\u02c8sp\u0251\u02d0n.s\u0259.b\u0259l/", pos: "adj.", zh: "負責任的",
    collocation: "be responsible for",
    example: "Every team leader is responsible for organizing the tasks.", exampleZh: "每位隊長都負責組織統籌各項任務。",
    memoryTip: "re- + sponsor (擔保) + -ible (能...的)"
  },
  {
    id: "fc-jh-070", tier: "jhs_2000", category: "個性與人際",
    word: "polite", chunk: "po - lite", ipa: "/p\u0259\u02c8la\u026at/", pos: "adj.", zh: "有禮貌的、客氣的",
    collocation: "polite response",
    example: "Remember to be polite when asking someone for directions.", exampleZh: "向別人問路時記得保持禮貌。",
    memoryTip: "Magic E 使 i 發長母音 /aɪ/"
  },
  {
    id: "fc-jh-071", tier: "jhs_2000", category: "個性與人際",
    word: "humorous", chunk: "hu - mor - ous", ipa: "/\u02c8hju\u02d0.m\u025a.\u0259s/", pos: "adj.", zh: "幽默的、詼諧的",
    collocation: "humorous story",
    example: "His humorous speech made the entire audience burst into laughter.", exampleZh: "他幽默的演說讓全場聽眾哈哈大笑。",
    memoryTip: "humor (幽默) + -ous (形容詞尾綴)"
  },
  {
    id: "fc-jh-072", tier: "jhs_2000", category: "個性與人際",
    word: "energetic", chunk: "en - er - get - ic", ipa: "/\u02cc\u025bn.\u025a\u02c8d\u0292\u025bt.\u026ak/", pos: "adj.", zh: "充滿活力的、精力充沛的",
    collocation: "energetic child",
    example: "The energetic puppies ran around the backyard all afternoon.", exampleZh: "充滿活力的小狗在後院玩耍了一整個下午。",
    memoryTip: "energy (能量) ➔ energetic"
  },
  {
    id: "fc-jh-073", tier: "jhs_2000", category: "個性與人際",
    word: "respect", chunk: "re - spect", ipa: "/r\u026a\u02c8sp\u025bkt/", pos: "v. / n.", zh: "尊敬、敬重",
    collocation: "respect others",
    example: "We should respect people from different cultural backgrounds.", exampleZh: "我們應當尊重來自不同文化背景的人。",
    memoryTip: "re- (再/回頭) + spect (看) ➔ 回頭看 ➔ 敬重"
  },
  {
    id: "fc-jh-074", tier: "jhs_2000", category: "心智與思維",
    word: "decision", chunk: "de - ci - sion", ipa: "/d\u026a\u02c8s\u026a\u0292.\u0259n/", pos: "n.", zh: "決定、抉擇",
    collocation: "make a decision",
    example: "Think carefully before you make an important life decision.", exampleZh: "在做人生重大決定前務必三思。",
    memoryTip: "decide (決定) ➔ decision，sion 發 /ʒən/"
  },
  {
    id: "fc-jh-075", tier: "jhs_2000", category: "心智與思維",
    word: "opinion", chunk: "o - pin - ion", ipa: "/\u0259\u02c8p\u026an.j\u0259n/", pos: "n.", zh: "意見、觀點",
    collocation: "in my opinion (依我之見)",
    example: "In my opinion, reading books expands your worldview greatly.", exampleZh: "依我看來，閱讀書籍能大幅開拓你的世界觀。",
    memoryTip: "o (/ə/) + pin (/pɪn/) + ion (/jən/)"
  },
  {
    id: "fc-jh-076", tier: "jhs_2000", category: "心智與思維",
    word: "solution", chunk: "so - lu - tion", ipa: "/s\u0259\u02c8lu\u02d0.\u0283\u0259n/", pos: "n.", zh: "解決方法、解方",
    collocation: "find a solution to",
    example: "Engineers worked around the clock to find a solution.", exampleZh: "工程師們夜以繼日地尋找解決方法。",
    memoryTip: "solve (解決) ➔ solution"
  },
  {
    id: "fc-jh-077", tier: "jhs_2000", category: "心智與思維",
    word: "experience", chunk: "ex - pe - ri - ence", ipa: "/\u026ak\u02c8sp\u026ar.i.\u0259ns/", pos: "n. / v.", zh: "經驗 (不可數)；經歷 (可數)",
    collocation: "learning experience",
    example: "Studying abroad was a valuable experience for the teenager.", exampleZh: "出國留學對這名青少年而言是一段寶貴的經驗。",
    memoryTip: "ex- (外) + peri (嘗試/冒險) ➔ 經驗"
  },
  {
    id: "fc-jh-078", tier: "jhs_2000", category: "心智與思維",
    word: "opportunity", chunk: "op - por - tu - ni - ty", ipa: "/\u02cc\u0251\u02d0.p\u025a\u02c8tu\u02d0.n\u0259.t\u032ci/", pos: "n.", zh: "機會、良機",
    collocation: "seize an opportunity",
    example: "Do not miss the opportunity to study in such a fine program.", exampleZh: "千萬不要錯過在這麼好的學程中學習的機會。",
    memoryTip: "op- (朝向) + port (港口) ➔ 船隻入港之良機"
  },
  {
    id: "fc-jh-079", tier: "jhs_2000", category: "心智與思維",
    word: "purpose", chunk: "pur - pose", ipa: "/\u02c8p\u025d\u02d0.p\u0259s/", pos: "n.", zh: "目的、意圖",
    collocation: "on purpose (故意地)",
    example: "What was the main purpose of holding this emergency meeting?", exampleZh: "召開這次緊急會議的主要目的是什麼？",
    memoryTip: "pur 發 /pɝː/ + pose 弱讀 /pəs/"
  },
  {
    id: "fc-jh-080", tier: "jhs_2000", category: "心智與思維",
    word: "problem", chunk: "prob - lem", ipa: "/\u02c8pr\u0251\u02d0.bl\u0259m/", pos: "n.", zh: "問題、難題",
    collocation: "solve a problem",
    example: "Work as a team to solve this difficult math problem.", exampleZh: "團隊合作來解決這道困難的數學難題。",
    memoryTip: "prob 發 /prɑː/ + lem 發 /bləm/"
  },
  {
    id: "fc-jh-081", tier: "jhs_2000", category: "心智與思維",
    word: "reason", chunk: "rea - son", ipa: "/\u02c8ri\u02d0.z\u0259n/", pos: "n.", zh: "原因、理由",
    collocation: "reason for",
    example: "Can you give me a clear reason for your late arrival?", exampleZh: "你能給我一個遲到的明確理由嗎？",
    memoryTip: "ea 發長母音 /iː/，son 發 /zən/"
  },
  {
    id: "fc-jh-082", tier: "jhs_2000", category: "心智與思維",
    word: "result", chunk: "re - sult", ipa: "/r\u026a\u02c8z\u028clt/", pos: "n.", zh: "結果、成效",
    collocation: "as a result (因此)",
    example: "As a result of diligent study, she received an A grade.", exampleZh: "由於勤奮讀書，她獲得了 A 等級的好成績。",
    memoryTip: "re- + sult 發 /zʌlt/"
  },
  {
    id: "fc-jh-083", tier: "jhs_2000", category: "心智與思維",
    word: "memory", chunk: "mem - o - ry", ipa: "/\u02c8m\u025bm.\u025a.i/", pos: "n.", zh: "記憶、回憶",
    collocation: "childhood memories",
    example: "Going camping with family is one of my happiest memories.", exampleZh: "和家人一起露營是我最快樂的童年回憶之一。",
    memoryTip: "mem (心智) + -ory (場所/狀態)"
  },
  {
    id: "fc-jh-084", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "although", chunk: "al - though", ipa: "/\u0254\u02d0l\u02c8\u00f0o\u028a/", pos: "conj.", zh: "雖然、儘管 (引導讓步子句)",
    collocation: "although + 子句",
    example: "Although it was raining hard, the game continued as planned.", exampleZh: "雖然雨下得很大，比賽依然按計畫繼續進行。",
    memoryTip: "考點提醒：英文中 although 與 but 絕不可出現在同一個句子中！"
  },
  {
    id: "fc-jh-085", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "however", chunk: "how - ev - er", ipa: "/ha\u028a\u02c8\u025bv.\u025a/", pos: "adv.", zh: "然而、不過 (轉折副詞)",
    collocation: "However, ...",
    example: "The test was very difficult. However, Jane got a high score.", exampleZh: "考試非常困難。然而，珍依然拿到了高分。",
    memoryTip: "轉折副詞！不可直接連接兩子句，常置於句首加逗號。"
  },
  {
    id: "fc-jh-086", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "therefore", chunk: "there - fore", ipa: "/\u02c8\u00f0\u025br.f\u0254\u02d0r/", pos: "adv.", zh: "因此、所以 (因果副詞)",
    collocation: "Therefore, ...",
    example: "He practiced diligently every day; therefore, he won the trophy.", exampleZh: "他每天勤奮練習；因此，他贏得了獎盃。",
    memoryTip: "表結果的副詞！不可與 because 連用。"
  },
  {
    id: "fc-jh-087", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "unless", chunk: "un - less", ipa: "/\u0259n\u02c8l\u025bs/", pos: "conj.", zh: "除非 (相當於 if ... not)",
    collocation: "unless + 現在式",
    example: "We will have a picnic tomorrow unless it rains heavily.", exampleZh: "除非下大雨，否則我們明天會去野餐。",
    memoryTip: "unless 本身帶否定意味，其引導之子句不用 not！"
  },
  {
    id: "fc-jh-088", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "especially", chunk: "es - pe - cial - ly", ipa: "/\u026a\u02c8sp\u025b\u0283.\u0259l.i/", pos: "adv.", zh: "特別是、尤其是",
    collocation: "especially in summer",
    example: "I enjoy outdoor sports, especially cycling along the river.", exampleZh: "我喜歡戶外運動，特別是沿著河岸騎腳踏車。",
    memoryTip: "especial (特殊的) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-089", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "immediately", chunk: "im - me - di - ate - ly", ipa: "/\u026a\u02c8mi\u02d0.di.\u0259t.li/", pos: "adv.", zh: "立刻、馬上",
    collocation: "reply immediately",
    example: "When the fire alarm rang, everyone evacuated immediately.", exampleZh: "火警鈴響起時，每個人都立刻疏散撤離。",
    memoryTip: "im- (不/無) + mediate (中間媒介) ➔ 不隔時間 ➔ 立刻"
  },
  {
    id: "fc-jh-090", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "finally", chunk: "fi - nal - ly", ipa: "/\u02c8fa\u026a.n\u0259l.i/", pos: "adv.", zh: "最後、終於",
    collocation: "finally arrive",
    example: "After a twelve-hour flight, we finally arrived in London.", exampleZh: "經過十二小時的飛行，我們終於抵達了倫敦。",
    memoryTip: "final (最終的) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-091", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "suddenly", chunk: "sud - den - ly", ipa: "/\u02c8s\u028cd.\u0259n.li/", pos: "adv.", zh: "突然、忽然間",
    collocation: "suddenly stop",
    example: "The car stopped suddenly when a dog ran across the street.", exampleZh: "當一隻狗跑過馬路時，汽車突然煞停了下來。",
    memoryTip: "sudden (突然的) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-092", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "almost", chunk: "al - most", ipa: "/\u02c8\u0254\u02d0l.mo\u028ast/", pos: "adv.", zh: "幾乎、差一點",
    collocation: "almost finished",
    example: "Dinner is almost ready, so please wash your hands.", exampleZh: "晚餐幾乎快準備好了，請去洗手。",
    memoryTip: "al- (全) + most (大部分) ➔ 幾乎"
  },
  {
    id: "fc-jh-093", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "nearly", chunk: "near - ly", ipa: "/\u02c8n\u026ar.li/", pos: "adv.", zh: "將近、幾乎",
    collocation: "nearly two hours",
    example: "We walked for nearly two hours before finding the station.", exampleZh: "我們走了將近兩小時才找到車站。",
    memoryTip: "near (接近) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-094", tier: "jhs_2000", category: "會考不規則動詞",
    word: "begin", chunk: "be - gin", ipa: "/b\u026a\u02c8\u0261\u026an/", pos: "v.", zh: "開始 (三態 begin-began-begun)",
    collocation: "begin to study",
    example: "The concert will begin promptly at seven thirty.", exampleZh: "音樂會將於七點半準時開始。",
    memoryTip: "三態：begin ➔ began /bɪˈɡæn/ ➔ begun /bɪˈɡʌn/"
  },
  {
    id: "fc-jh-095", tier: "jhs_2000", category: "會考不規則動詞",
    word: "become", chunk: "be - come", ipa: "/b\u026a\u02c8k\u028cm/", pos: "v.", zh: "成為、變成 (三態 become-became-become)",
    collocation: "become a doctor",
    example: "He worked hard and eventually became a respected doctor.", exampleZh: "他努力奮鬥，最終成為一位受人尊敬的醫生。",
    memoryTip: "三態：become ➔ became ➔ become"
  },
  {
    id: "fc-jh-096", tier: "jhs_2000", category: "會考不規則動詞",
    word: "blow", chunk: "blow", ipa: "/blo\u028a/", pos: "v.", zh: "吹動、颳風 (三態 blow-blew-blown)",
    collocation: "blow out candles",
    example: "Strong wind blew away all the dry leaves on the ground.", exampleZh: "強風吹走了地上所有的乾樹葉。",
    memoryTip: "三態：blow ➔ blew /bluː/ ➔ blown /bloʊn/"
  },
  {
    id: "fc-jh-097", tier: "jhs_2000", category: "會考不規則動詞",
    word: "draw", chunk: "draw", ipa: "/dr\u0254\u02d0/", pos: "v.", zh: "繪畫、拉出 (三態 draw-drew-drawn)",
    collocation: "draw a picture",
    example: "The talented artist drew a magnificent portrait.", exampleZh: "那位才華洋溢的藝術家畫了一幅壯麗的肖像。",
    memoryTip: "三態：draw ➔ drew /druː/ ➔ drawn /drɔːn/"
  },
  {
    id: "fc-jh-098", tier: "jhs_2000", category: "會考不規則動詞",
    word: "drink", chunk: "drink", ipa: "/dr\u026a\u014bk/", pos: "v.", zh: "飲用、喝 (三態 drink-drank-drunk)",
    collocation: "drink water",
    example: "Athletes drank plenty of water after the marathon.", exampleZh: "運動員在馬拉松跑完後喝了大量的水。",
    memoryTip: "三態：drink ➔ drank /dræŋk/ ➔ drunk /drʌŋk/"
  },
  {
    id: "fc-jh-099", tier: "jhs_2000", category: "會考不規則動詞",
    word: "eat", chunk: "eat", ipa: "/i\u02d0t/", pos: "v.", zh: "吃、食用 (三態 eat-ate-eaten)",
    collocation: "eat healthy food",
    example: "We ate delicious homemade noodles at grandma's house.", exampleZh: "我們在奶奶家吃了美味的手工麵條。",
    memoryTip: "三態：eat ➔ ate /eɪt/ ➔ eaten /ˈiː.tən/"
  },
  {
    id: "fc-jh-100", tier: "jhs_2000", category: "會考不規則動詞",
    word: "fly", chunk: "fly", ipa: "/fla\u026a/", pos: "v.", zh: "飛行、放飛 (三態 fly-flew-flown)",
    collocation: "fly a kite",
    example: "Birds fly south to seek warmer weather in winter.", exampleZh: "鳥兒在冬天向南飛尋求更溫暖的氣候。",
    memoryTip: "三態：fly ➔ flew /fluː/ ➔ flown /floʊn/"
  },
  {
    id: "fc-jh-101", tier: "jhs_2000", category: "會考不規則動詞",
    word: "get", chunk: "get", ipa: "/\u0261\u025bt/", pos: "v.", zh: "得到、到達 (三態 get-got-gotten)",
    collocation: "get good grades",
    example: "She studied thoroughly to get top marks on the final test.", exampleZh: "她徹底複習以在期末考拿到頂尖成績。",
    memoryTip: "三態：get ➔ got ➔ gotten /ˈɡɑː.tən/"
  },
  {
    id: "fc-jh-102", tier: "jhs_2000", category: "會考不規則動詞",
    word: "ring", chunk: "ring", ipa: "/r\u026a\u014b/", pos: "v. / n.", zh: "鳴響；戒指 (三態 ring-rang-rung)",
    collocation: "the bell rings",
    example: "The school bell rang, signaling the end of the school day.", exampleZh: "學校鐘聲響起，宣告放學時間已到。",
    memoryTip: "三態：ring ➔ rang /ræŋ/ ➔ rung /rʌŋ/"
  },
  {
    id: "fc-jh-103", tier: "jhs_2000", category: "會考不規則動詞",
    word: "run", chunk: "run", ipa: "/r\u028cn/", pos: "v.", zh: "奔跑、經營 (三態 run-ran-run)",
    collocation: "run a business",
    example: "He ran as fast as he could to deliver the message.", exampleZh: "他以最快速度奔跑去傳遞消息。",
    memoryTip: "三態：run ➔ ran /ræn/ ➔ run /rʌn/"
  },
  {
    id: "fc-jh-104", tier: "jhs_2000", category: "會考不規則動詞",
    word: "say", chunk: "say", ipa: "/se\u026a/", pos: "v.", zh: "說、講出 (三態 say-said-said)",
    collocation: "say hello",
    example: "The teacher said that practice makes perfect.", exampleZh: "老師說熟能生巧。",
    memoryTip: "三態：say /seɪ/ ➔ said /sɛd/ ➔ said /sɛd/！注意音標短母音"
  },
  {
    id: "fc-jh-105", tier: "jhs_2000", category: "學業與教育",
    word: "education", chunk: "ed - u - ca - tion", ipa: "/\u02cc\u025bd\u0292.\u028a\u02c8ke\u026a.\u0283\u0259n/", pos: "n.", zh: "教育",
    collocation: "quality education",
    example: "Education plays a critical role in shaping a child's future.", exampleZh: "教育在塑造孩子的未來中扮演關鍵角色。",
    memoryTip: "educate (教育) + -tion (名詞尾綴)"
  },
  {
    id: "fc-jh-106", tier: "jhs_2000", category: "學業與教育",
    word: "grammar", chunk: "gram - mar", ipa: "/\u02c8\u0261r\u00e6m.\u025a/", pos: "n.", zh: "文法 (不可數)",
    collocation: "English grammar",
    example: "Understanding basic grammar rules makes writing much easier.", exampleZh: "理解基礎文法規則讓寫作變得容易許多。",
    memoryTip: "雙寫 m，gram /ɡræm/ + mar /ɚ/，注意結尾是 ar！"
  },
  {
    id: "fc-jh-107", tier: "jhs_2000", category: "學業與教育",
    word: "vocabulary", chunk: "vo - cab - u - lar - y", ipa: "/vo\u028a\u02c8k\u00e6b.j\u0259.l\u025br.i/", pos: "n.", zh: "單字量、詞彙",
    collocation: "expand vocabulary",
    example: "Reading articles regularly helps students expand their vocabulary.", exampleZh: "定期閱讀文章能幫助學生擴充單字量。",
    memoryTip: "vocab (詞彙) + ulary"
  },
  {
    id: "fc-jh-108", tier: "jhs_2000", category: "學業與教育",
    word: "pronunciation", chunk: "pro - nun - ci - a - tion", ipa: "/pr\u0259\u02ccn\u028cn.si\u02c8e\u026a.\u0283\u0259n/", pos: "n.", zh: "發音、讀音",
    collocation: "clear pronunciation",
    example: "Listen to native audio recordings to improve your pronunciation.", exampleZh: "收聽母語者錄音以改善你的發音。",
    memoryTip: "注意拼寫：pronounce ➔ pronunciation (沒有 o)！"
  },
  {
    id: "fc-jh-109", tier: "jhs_2000", category: "學業與教育",
    word: "dictionary", chunk: "dic - tion - ar - y", ipa: "/\u02c8d\u026ak.\u0283\u0259n.\u025br.i/", pos: "n.", zh: "字典、辭典",
    collocation: "look up in a dictionary",
    example: "If you encounter an unfamiliar word, look it up in a dictionary.", exampleZh: "如果遇到不認識的字，請查字典。",
    memoryTip: "diction (用詞) + -ary (場所/工具)"
  },
  {
    id: "fc-jh-110", tier: "jhs_2000", category: "學業與教育",
    word: "comprehension", chunk: "com - pre - hen - sion", ipa: "/\u02cck\u0251\u02d0m.pr\u026a\u02c8h\u025bn.\u0283\u0259n/", pos: "n.", zh: "理解力、閱讀理解",
    collocation: "reading comprehension",
    example: "The test includes questions measuring reading comprehension.", exampleZh: "該測驗包含評量閱讀理解能力的題目。",
    memoryTip: "comprehend (理解) ➔ comprehension"
  },
  {
    id: "fc-jh-111", tier: "jhs_2000", category: "學業與教育",
    word: "describe", chunk: "de - scribe", ipa: "/d\u026a\u02c8skra\u026ab/", pos: "v.", zh: "描述、描寫",
    collocation: "describe a scene",
    example: "Can you describe what the suspect looked like?", exampleZh: "你能描述一下嫌疑犯長什麼樣子嗎？",
    memoryTip: "de- (向下) + scribe (書寫) ➔ 描繪"
  },
  {
    id: "fc-jh-112", tier: "jhs_2000", category: "學業與教育",
    word: "improve", chunk: "im - prove", ipa: "/\u026am\u02c8pru\u02d0v/", pos: "v.", zh: "改進、進步",
    collocation: "improve skills",
    example: "Continuous practice will help you improve your speaking skills.", exampleZh: "持續練習將幫助你增進口語技巧。",
    memoryTip: "im- + prove (證明/改善)"
  },
  {
    id: "fc-jh-113", tier: "jhs_2000", category: "社會與公共事務",
    word: "government", chunk: "gov - ern - ment", ipa: "/\u02c8\u0261\u028cv.\u025an.m\u0259nt/", pos: "n.", zh: "政府",
    collocation: "local government",
    example: "The government announced new environmental conservation policies.", exampleZh: "政府宣布了新的環境保育政策。",
    memoryTip: "govern (治理) + -ment (名詞尾綴)"
  },
  {
    id: "fc-jh-114", tier: "jhs_2000", category: "社會與公共事務",
    word: "community", chunk: "com - mu - ni - ty", ipa: "/k\u0259\u02c8mju\u02d0.n\u0259.t\u032ci/", pos: "n.", zh: "社區、共同體",
    collocation: "local community",
    example: "Volunteers collected food to help the elderly in their community.", exampleZh: "志工們收集食物來幫助社區裡的長者。",
    memoryTip: "common (共同) ➔ community"
  },
  {
    id: "fc-jh-115", tier: "jhs_2000", category: "社會與公共事務",
    word: "volunteer", chunk: "vol - un - teer", ipa: "/\u02ccv\u0251\u02d0l.\u0259n\u02c8t\u026ar/", pos: "n. / v.", zh: "志工；自願服務",
    collocation: "work as a volunteer",
    example: "Many high school students work as volunteers at the shelter.", exampleZh: "許多高中生在收容所擔任志工服務。",
    memoryTip: "vol- (意志/意願) + -teer (人)"
  },
  {
    id: "fc-jh-116", tier: "jhs_2000", category: "社會與公共事務",
    word: "citizen", chunk: "cit - i - zen", ipa: "/\u02c8s\u026at\u032c.\u0259.z\u0259n/", pos: "n.", zh: "公民、國民",
    collocation: "responsible citizen",
    example: "A responsible citizen obeys the laws and protects public property.", exampleZh: "負責任的公民遵守法律並愛護公物。",
    memoryTip: "city (城市) ➔ citizen (公民)"
  },
  {
    id: "fc-jh-117", tier: "jhs_2000", category: "社會與公共事務",
    word: "profession", chunk: "pro - fes - sion", ipa: "/pr\u0259\u02c8f\u025b\u0283.\u0259n/", pos: "n.", zh: "專業、職業",
    collocation: "medical profession",
    example: "Nursing is a demanding yet deeply rewarding profession.", exampleZh: "護理是一項要求嚴格卻深具回報的崇高專業。",
    memoryTip: "profess (聲明) ➔ profession"
  },
  {
    id: "fc-jh-118", tier: "jhs_2000", category: "旅行與文化",
    word: "journey", chunk: "jour - ney", ipa: "/\u02c8d\u0292\u025d\u02d0.ni/", pos: "n.", zh: "旅程、旅行",
    collocation: "safe journey",
    example: "They wished him a safe and wonderful journey across Europe.", exampleZh: "他們祝他橫越歐洲的旅程平安且精彩。",
    memoryTip: "jour (日) ➔ 一日的行程 ➔ 旅程"
  },
  {
    id: "fc-jh-119", tier: "jhs_2000", category: "旅行與文化",
    word: "passport", chunk: "pass - port", ipa: "/\u02c8p\u00e6s.p\u0254\u02d0rt/", pos: "n.", zh: "護照",
    collocation: "valid passport",
    example: "You must show a valid passport when boarding an international flight.", exampleZh: "登上班機時你必須出示有效護照。",
    memoryTip: "pass (通過) + port (港口/口岸) ➔ 護照"
  },
  {
    id: "fc-jh-120", tier: "jhs_2000", category: "旅行與文化",
    word: "passenger", chunk: "pas - sen - ger", ipa: "/\u02c8p\u00e6s.\u0259n.d\u0292\u025a/", pos: "n.", zh: "乘客、旅客",
    collocation: "seatbelt for passengers",
    example: "All passengers must fasten their seatbelts before takeoff.", exampleZh: "起飛前所有乘客必須繫好安全帶。",
    memoryTip: "pass (經過) ➔ passenger"
  },
  {
    id: "fc-jh-121", tier: "jhs_2000", category: "旅行與文化",
    word: "schedule", chunk: "sched - ule", ipa: "/\u02c8sk\u025bd\u0292.u\u02d0l/", pos: "n. / v.", zh: "時程表、日程安排",
    collocation: "on schedule (按時)",
    example: "The train arrived right on schedule despite the heavy rain.", exampleZh: "儘管下著大雨，火車依然準時抵達。",
    memoryTip: "sch 發 /sk/，edule 發 /ɛdʒ.uːl/"
  },
  {
    id: "fc-jh-122", tier: "jhs_2000", category: "旅行與文化",
    word: "culture", chunk: "cul - ture", ipa: "/\u02c8k\u028cl.t\u0283\u025a/", pos: "n.", zh: "文化",
    collocation: "traditional culture",
    example: "Traveling to new countries allows you to experience different cultures.", exampleZh: "去新國家旅行讓你能體驗不同的文化。",
    memoryTip: "cult (耕耘/培育) + -ure"
  },
  {
    id: "fc-jh-123", tier: "jhs_2000", category: "健康與身心",
    word: "medicine", chunk: "med - i - cine", ipa: "/\u02c8m\u025bd.\u0259.s\u0259n/", pos: "n.", zh: "藥物 (不可數)；醫學",
    collocation: "take medicine (服藥)",
    example: "Take this prescribed medicine three times a day after meals.", exampleZh: "請於三餐飯後服用這款處方藥物。",
    memoryTip: "med (醫治) + -icine"
  },
  {
    id: "fc-jh-124", tier: "jhs_2000", category: "健康與身心",
    word: "hospital", chunk: "hos - pi - tal", ipa: "/\u02c8h\u0251\u02d0.sp\u026a.t\u032c\u0259l/", pos: "n.", zh: "醫院",
    collocation: "emergency room",
    example: "The injured driver was rushed to the nearby hospital.", exampleZh: "受傷的駕駛被迅速送往附近醫院急救。",
    memoryTip: "hospit (接待/客人) ➔ 醫院"
  },
  {
    id: "fc-jh-125", tier: "jhs_2000", category: "健康與身心",
    word: "disease", chunk: "dis - ease", ipa: "/d\u026a\u02c8zi\u02d0z/", pos: "n.", zh: "疾病",
    collocation: "prevent disease",
    example: "Regular handwashing helps prevent the spread of infectious disease.", exampleZh: "常洗手有助於預防傳染病的傳播。",
    memoryTip: "dis- (不/非) + ease (安適) ➔ 身體不安 ➔ 疾病"
  },
  {
    id: "fc-jh-126", tier: "jhs_2000", category: "健康與身心",
    word: "symptom", chunk: "symp - tom", ipa: "/\u02c8s\u026amp.t\u0259m/", pos: "n.", zh: "症狀、徵兆",
    collocation: "common symptoms",
    example: "Fever, cough, and sore throat are common symptoms of the flu.", exampleZh: "發燒、咳嗽和喉嚨痛是流感的常見症狀。",
    memoryTip: "sym- (共同) + ptom (掉落/發生)"
  },
  {
    id: "fc-jh-127", tier: "jhs_2000", category: "健康與身心",
    word: "exercise", chunk: "ex - er - cise", ipa: "/\u02c8\u025bk.s\u025a.sa\u026az/", pos: "n. / v.", zh: "運動；練習",
    collocation: "regular exercise",
    example: "Doing aerobic exercise thirty minutes a day strengthens your heart.", exampleZh: "每天做三十分鐘有氧運動能強化你的心臟。",
    memoryTip: "ex- + ercise"
  },
  {
    id: "fc-jh-128", tier: "jhs_2000", category: "會考不規則動詞",
    word: "cost", chunk: "cost", ipa: "/k\u0251\u02d0st/", pos: "v. / n.", zh: "花費（金錢）；成本 (三態 cost-cost-cost)",
    collocation: "cost a lot",
    example: "The new smartphone cost three hundred dollars.", exampleZh: "這款新智慧型手機花費了三百美元。",
    memoryTip: "事物當主詞！物 + cost + 人 + 金錢。三態同形！"
  },
  {
    id: "fc-jh-129", tier: "jhs_2000", category: "會考不規則動詞",
    word: "cut", chunk: "cut", ipa: "/k\u028ct/", pos: "v.", zh: "剪切、切斷 (三態 cut-cut-cut)",
    collocation: "cut paper",
    example: "Use safety scissors to cut the colored paper carefully.", exampleZh: "請使用安全剪刀仔細剪裁色紙。",
    memoryTip: "三態同形：cut ➔ cut ➔ cut"
  },
  {
    id: "fc-jh-130", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hit", chunk: "hit", ipa: "/h\u026at/", pos: "v. / n.", zh: "擊打、襲擊 (三態 hit-hit-hit)",
    collocation: "hit a baseball",
    example: "The batter hit the baseball over the fence.", exampleZh: "擊球手將棒球打出了全壘打牆外。",
    memoryTip: "三態同形：hit ➔ hit ➔ hit"
  },
  {
    id: "fc-jh-131", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hurt", chunk: "hurt", ipa: "/h\u025d\u02d0t/", pos: "v. / adj.", zh: "傷害、使疼痛；受傷的 (三態 hurt-hurt-hurt)",
    collocation: "hurt one's leg",
    example: "He hurt his ankle while playing soccer yesterday.", exampleZh: "他昨天踢足球時傷到了腳踝。",
    memoryTip: "三態同形：hurt ➔ hurt ➔ hurt"
  },
  {
    id: "fc-jh-132", tier: "jhs_2000", category: "會考不規則動詞",
    word: "let", chunk: "let", ipa: "/l\u025bt/", pos: "v.", zh: "讓、允許 (使役動詞，三態 let-let-let)",
    collocation: "let me know",
    example: "Please let me know if you need any assistance.", exampleZh: "如果你需要任何協助請讓我知道。",
    memoryTip: "使役動詞！後接受詞 + 原形動詞。三態同形！"
  },
  {
    id: "fc-jh-133", tier: "jhs_2000", category: "會考不規則動詞",
    word: "put", chunk: "put", ipa: "/p\u028at/", pos: "v.", zh: "放置、安放 (三態 put-put-put)",
    collocation: "put on (穿上)",
    example: "Put on your heavy coat before going outdoors.", exampleZh: "出門前穿上你的厚大衣。",
    memoryTip: "三態同形：put ➔ put ➔ put"
  },
  {
    id: "fc-jh-134", tier: "jhs_2000", category: "會考不規則動詞",
    word: "quit", chunk: "quit", ipa: "/kw\u026at/", pos: "v.", zh: "戒除、放棄 (三態 quit-quit-quit)",
    collocation: "quit smoking",
    example: "Dad decided to quit smoking for the sake of his health.", exampleZh: "為了身體健康爸爸決定戒菸。",
    memoryTip: "quit 後接 V-ing。三態同形！"
  },
  {
    id: "fc-jh-135", tier: "jhs_2000", category: "會考不規則動詞",
    word: "shut", chunk: "shut", ipa: "/\u0283\u028ct/", pos: "v. / adj.", zh: "關閉；合上的 (三態 shut-shut-shut)",
    collocation: "shut the door",
    example: "Please shut the window because the wind is getting cold.", exampleZh: "請關上窗戶，因為風越來越涼了。",
    memoryTip: "三態同形：shut ➔ shut ➔ shut"
  },
  {
    id: "fc-jh-136", tier: "jhs_2000", category: "會考不規則動詞",
    word: "bite", chunk: "bite", ipa: "/ba\u026at/", pos: "v. / n.", zh: "咬、叮咬 (三態 bite-bit-bitten)",
    collocation: "mosquito bite",
    example: "Be careful; that stray dog might bite if frightened.", exampleZh: "請小心，那隻流浪狗如果受驚可能會咬人。",
    memoryTip: "三態：bite ➔ bit ➔ bitten /ˈbɪt.ən/"
  },
  {
    id: "fc-jh-137", tier: "jhs_2000", category: "會考不規則動詞",
    word: "forgive", chunk: "for - give", ipa: "/f\u025a\u02c8\u0261\u026av/", pos: "v.", zh: "原諒、寬恕 (三態 forgive-forgave-forgiven)",
    collocation: "forgive mistakes",
    example: "True friends readily forgive each other's mistakes.", exampleZh: "真正的朋友總會寬恕彼此的過失。",
    memoryTip: "三態：forgive ➔ forgave ➔ forgiven"
  },
  {
    id: "fc-jh-138", tier: "jhs_2000", category: "會考不規則動詞",
    word: "understand", chunk: "un - der - stand", ipa: "/\u02cc\u028cn.d\u025a\u02c8st\u00e6nd/", pos: "v.", zh: "理解、明白 (三態 understand-understood-understood)",
    collocation: "understand grammar",
    example: "Do you understand what the teacher just explained?", exampleZh: "你理解老師剛才說明的內容了嗎？",
    memoryTip: "三態：understand ➔ understood ➔ understood"
  },
  {
    id: "fc-jh-139", tier: "jhs_2000", category: "心智與思維",
    word: "knowledge", chunk: "knowl - edge", ipa: "/\u02c8n\u0251\u02d0.l\u026ad\u0292/", pos: "n.", zh: "知識 (不可數)",
    collocation: "gain knowledge",
    example: "Reading widely is the best way to gain useful knowledge.", exampleZh: "博覽群書是獲取實用知識的最佳途徑。",
    memoryTip: "k 不發音！knowl /nɑː/ + edge /lɪdʒ/，注意不可數！"
  },
  {
    id: "fc-jh-140", tier: "jhs_2000", category: "心智與思維",
    word: "attitude", chunk: "at - ti - tude", ipa: "/\u02c8\u00e6t\u032c.\u0259.tu\u02d0d/", pos: "n.", zh: "態度、心態",
    collocation: "positive attitude",
    example: "A positive learning attitude leads to remarkable progress.", exampleZh: "積極的學習態度能帶來顯著的進步。",
    memoryTip: "at /æt/ + ti /t̬ə/ + tude /tuːd/"
  },
  {
    id: "fc-jh-141", tier: "jhs_2000", category: "心智與思維",
    word: "habit", chunk: "hab - it", ipa: "/\u02c8h\u00e6b.\u026at/", pos: "n.", zh: "習慣",
    collocation: "good habit",
    example: "Reading for thirty minutes every day is an excellent habit.", exampleZh: "每天閱讀三十分鐘是一項極佳的習慣。",
    memoryTip: "hab 短音 /hæb/ + it /ɪt/"
  },
  {
    id: "fc-jh-142", tier: "jhs_2000", category: "心智與思維",
    word: "concept", chunk: "con - cept", ipa: "/\u02c8k\u0251\u02d0n.s\u025bpt/", pos: "n.", zh: "觀念、概念",
    collocation: "core concept",
    example: "Make sure you master the core concepts before the exam.", exampleZh: "考試前務必精熟核心觀念。",
    memoryTip: "con- + cept (抓取) ➔ 抓取本質 ➔ 概念"
  },
  {
    id: "fc-jh-143", tier: "jhs_2000", category: "心智與思維",
    word: "reality", chunk: "re - al - i - ty", ipa: "/ri\u02c8\u00e6l.\u0259.t\u032ci/", pos: "n.", zh: "現實、真實狀況",
    collocation: "face reality",
    example: "We must face reality and find practical ways to solve this.", exampleZh: "我們必須面對現實並尋求切實的解決之道。",
    memoryTip: "real (真實的) ➔ reality"
  },
  {
    id: "fc-jh-144", tier: "jhs_2000", category: "心智與思維",
    word: "wisdom", chunk: "wis - dom", ipa: "/\u02c8w\u026az.d\u0259m/", pos: "n.", zh: "智慧 (不可數)",
    collocation: "words of wisdom",
    example: "Elders often pass down valuable words of wisdom.", exampleZh: "長者常傳承下寶貴的智慧箴言。",
    memoryTip: "wise (有智慧的) ➔ wisdom"
  },
  {
    id: "fc-jh-145", tier: "jhs_2000", category: "社會與公共事務",
    word: "scientist", chunk: "sci - en - tist", ipa: "/\u02c8sa\u026a.\u0259n.t\u026ast/", pos: "n.", zh: "科學家",
    collocation: "talented scientist",
    example: "Scientists are researching clean renewable energy sources.", exampleZh: "科學家們正在研究潔淨的可再生能源。",
    memoryTip: "science (科學) + -ist (人)"
  },
  {
    id: "fc-jh-146", tier: "jhs_2000", category: "社會與公共事務",
    word: "engineer", chunk: "en - gi - neer", ipa: "/\u02cc\u025bn.d\u0292\u0259\u02c8n\u026ar/", pos: "n.", zh: "工程師",
    collocation: "civil engineer (土木工程師)",
    example: "The software engineer designed a powerful mobile app.", exampleZh: "軟體工程師設計了一款強大的行動應用程式。",
    memoryTip: "engine (引擎/工程) + -eer (專家)"
  },
  {
    id: "fc-jh-147", tier: "jhs_2000", category: "社會與公共事務",
    word: "doctor", chunk: "doc - tor", ipa: "/\u02c8d\u0251\u02d0k.t\u025a/", pos: "n.", zh: "醫生、醫師；博士",
    collocation: "see a doctor",
    example: "You should see a doctor if your high fever persists.", exampleZh: "如果你的高燒持續不退，你應該去看醫生。",
    memoryTip: "doc /dɑːk/ + tor /tɚ/"
  },
  {
    id: "fc-jh-148", tier: "jhs_2000", category: "社會與公共事務",
    word: "nurse", chunk: "nurse", ipa: "/n\u025d\u02d0s/", pos: "n.", zh: "護理師、護士",
    collocation: "caring nurse",
    example: "The caring nurse took gentle care of the young patient.", exampleZh: "貼心的護理師溫柔地照料這位年幼的病患。",
    memoryTip: "ur 發捲舌長音 /ɝː/"
  },
  {
    id: "fc-jh-149", tier: "jhs_2000", category: "社會與公共事務",
    word: "officer", chunk: "of - fi - cer", ipa: "/\u02c8\u0251\u02d0.f\u026a.s\u025a/", pos: "n.", zh: "警官、官員",
    collocation: "police officer",
    example: "The police officer directed traffic at the busy crossroads.", exampleZh: "警官在繁忙的十字路口指揮交通。",
    memoryTip: "office (辦公室) ➔ officer"
  },
  {
    id: "fc-jh-150", tier: "jhs_2000", category: "社會與公共事務",
    word: "musician", chunk: "mu - si - cian", ipa: "/mju\u02d0\u02c8z\u026a\u0283.\u0259n/", pos: "n.", zh: "音樂家",
    collocation: "talented musician",
    example: "The classical musician played the violin beautifully.", exampleZh: "那位古典音樂家優美地演奏了小提琴。",
    memoryTip: "music (音樂) + -ian (專家)"
  },
  {
    id: "fc-jh-151", tier: "jhs_2000", category: "會考易混淆字",
    word: "borrow", chunk: "bor - row", ipa: "/\u02c8b\u0251\u02d0r.o\u028a/", pos: "v.", zh: "向（他人）借入",
    collocation: "borrow sth from sb",
    example: "Can I borrow your English dictionary for today's lesson?", exampleZh: "今天的課我可以向你借用英文字典嗎？",
    memoryTip: "向外借入！borrow + 物 + from + 人"
  },
  {
    id: "fc-jh-152", tier: "jhs_2000", category: "會考易混淆字",
    word: "lend", chunk: "lend", ipa: "/l\u025bnd/", pos: "v.", zh: "借出（給他人）(三態 lend-lent-lent)",
    collocation: "lend sth to sb",
    example: "He kindly lent his spare umbrella to his classmate.", exampleZh: "他親切地將備用雨傘借給了他的同學。",
    memoryTip: "借出給人！lend + 物 + to + 人。三態：lend ➔ lent ➔ lent"
  },
  {
    id: "fc-jh-153", tier: "jhs_2000", category: "會考易混淆字",
    word: "affect", chunk: "af - fect", ipa: "/\u0259\u02c8f\u025bkt/", pos: "v.", zh: "影響、對...產生作用 (動詞)",
    collocation: "affect health",
    example: "Lack of sleep can seriously affect your academic performance.", exampleZh: "睡眠不足會嚴重影響你的學業表現。",
    memoryTip: "動詞！以 a 起首。常考：Smoking affects health."
  },
  {
    id: "fc-jh-154", tier: "jhs_2000", category: "會考易混淆字",
    word: "effect", chunk: "ef - fect", ipa: "/\u026a\u02c8f\u025bkt/", pos: "n.", zh: "影響、效果 (名詞)",
    collocation: "have an effect on",
    example: "Regular exercise has a positive effect on your immune system.", exampleZh: "規律運動對你的免疫系統有正面的良好效果。",
    memoryTip: "名詞！以 e 起首。常考片語：have an effect on..."
  },
  {
    id: "fc-jh-155", tier: "jhs_2000", category: "會考易混淆字",
    word: "accept", chunk: "ac - cept", ipa: "/\u0259k\u02c8s\u025bpt/", pos: "v.", zh: "接受、收下",
    collocation: "accept an invitation",
    example: "She gladly accepted the invitation to the birthday party.", exampleZh: "她欣然接受了參加生日派對的邀請。",
    memoryTip: "ac- (朝向) + cept (收下) ➔ 接受"
  },
  {
    id: "fc-jh-156", tier: "jhs_2000", category: "會考易混淆字",
    word: "except", chunk: "ex - cept", ipa: "/\u026ak\u02c8s\u025bpt/", pos: "prep.", zh: "除了...之外 (不包含)",
    collocation: "all except",
    example: "Everyone passed the examination except John.", exampleZh: "除了約翰之外，每個人都通過了考試。",
    memoryTip: "ex- (排除在外) ➔ 不包含在內！"
  },
  {
    id: "fc-jh-157", tier: "jhs_2000", category: "會考易混淆字",
    word: "beside", chunk: "be - side", ipa: "/b\u026a\u02c8sa\u026ad/", pos: "prep.", zh: "在...旁邊 (位置)",
    collocation: "sit beside",
    example: "Come and sit beside me so we can read together.", exampleZh: "過來坐在我身旁，這樣我們可以一起閱讀。",
    memoryTip: "be + side ➔ 在旁邊"
  },
  {
    id: "fc-jh-158", tier: "jhs_2000", category: "會考易混淆字",
    word: "besides", chunk: "be - sides", ipa: "/b\u026a\u02c8sa\u026adz/", pos: "prep. / adv.", zh: "除了...之外還有；此外",
    collocation: "besides English",
    example: "Besides English, she also speaks fluent Japanese and Spanish.", exampleZh: "除了英文之外，她還能說流利的日文與西班牙文。",
    memoryTip: "字尾多個 s ➔ 表「加上、還有」！"
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
    <section class="card"><h2>國小・國中單字記憶、複習與練習</h2><p>教材卡庫、字義檢核、拼字練習與到期排程。</p><button class="btn primary" data-nav="schoolwords">開啟國小・國中單字複習</button></section>
    <div class="header-block">
      <div class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700">🗂️ 全階記憶閃卡館 · 間隔複習與合成語音點讀</div>
      <h1 style="margin:8px 0;font-size:28px">多階層英語單字與核心片語記憶閃卡 (3D 翻轉·語音點讀)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px;line-height:1.6">
        此區為各程度精選示範卡。國小、國中完整的本站教材字詞與到期複習，請使用下方入口。
        每張卡片整合「自然拼讀拆解、KK音標、雙語例句、語用搭配與記憶技巧」，配備 🔊 合成發音與自動輪播背誦！
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

