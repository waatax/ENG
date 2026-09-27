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

export const FLASHCARD_DATABASE = [
  // 1. 國小基礎 1,000 (Elementary 1,000)
  {
    id: "fc-el-001", tier: "elem_1000", category: "家庭與身分",
    word: "family", chunk: "fam - i - ly", ipa: "/\u02c8f\u00e6m.\u0259l.i/", pos: "n.",
    icon: "👨‍👩‍👧", zh: "家庭、家人",
    collocation: "family member (家庭成員)",
    example: "I love eating dinner with my family every evening.", exampleZh: "我喜歡每天傍晚和家人一起吃晚餐。",
    memoryTip: "fam (/fæm/ 短母音 a) + 弱讀 /ə/ + ly (/li/)"
  },
  {
    id: "fc-el-002", tier: "elem_1000", category: "家庭與身分",
    word: "father", chunk: "fa - ther", ipa: "/\u02c8f\u0251\u02d0.\u00f0\u025a/", pos: "n.",
    icon: "👨", zh: "父親、爸爸",
    collocation: "my father",
    example: "My father drives me to school every morning.", exampleZh: "我爸爸每天早晨開車載我上學。",
    memoryTip: "th 發濁音 /ð/ + er 捲舌音 /ɚ/"
  },
  {
    id: "fc-el-003", tier: "elem_1000", category: "家庭與身分",
    word: "mother", chunk: "moth - er", ipa: "/\u02c8m\u028c\u00f0.\u025a/", pos: "n.",
    icon: "👩", zh: "母親、媽媽",
    collocation: "working mother (職業婦女)",
    example: "Her mother is a very kind and caring doctor.", exampleZh: "她媽媽是一位非常仁慈有愛心的醫生。",
    memoryTip: "o 發短母音 /ʌ/，th 發濁音 /ð/"
  },
  {
    id: "fc-el-004", tier: "elem_1000", category: "家庭與身分",
    word: "parent", chunk: "par - ent", ipa: "/\u02c8p\u025br.\u0259nt/", pos: "n.",
    icon: "👨‍👩‍👧", zh: "雙親之一、父母親",
    collocation: "parents (雙親)",
    example: "Both of my parents enjoy gardening on weekends.", exampleZh: "我父母週末都很喜歡從事園藝。",
    memoryTip: "par 發 /pɛr/ + ent 弱讀 /ənt/"
  },
  {
    id: "fc-el-005", tier: "elem_1000", category: "家庭與身分",
    word: "brother", chunk: "broth - er", ipa: "/\u02c8br\u028c\u00f0.\u025a/", pos: "n.",
    icon: "👦", zh: "哥哥、弟弟",
    collocation: "older brother (哥哥)",
    example: "My brother plays basketball with his friends.", exampleZh: "我哥哥經常和他的朋友打籃球。",
    memoryTip: "broth 發 /brʌð/ + er /ɚ/"
  },
  {
    id: "fc-el-006", tier: "elem_1000", category: "家庭與身分",
    word: "sister", chunk: "sis - ter", ipa: "/\u02c8s\u026as.t\u025a/", pos: "n.",
    icon: "👧", zh: "姊姊、妹妹",
    collocation: "younger sister (妹妹)",
    example: "Her sister is practicing the piano in the room.", exampleZh: "她妹妹正在房間裡練鋼琴。",
    memoryTip: "sis 閉音節短音 /ɪ/ + ter /tɚ/"
  },
  {
    id: "fc-el-007", tier: "elem_1000", category: "家庭與身分",
    word: "grandfather", chunk: "grand - fa - ther", ipa: "/\u02c8\u0261r\u00e6nd\u02ccf\u0251\u02d0.\u00f0\u025a/", pos: "n.",
    icon: "👴", zh: "祖父、爺爺、外公",
    collocation: "visit grandfather",
    example: "We visit grandfather every Sunday afternoon.", exampleZh: "我們每週日下午探望祖父。",
    memoryTip: "grand (宏大的/長輩) + father"
  },
  {
    id: "fc-el-008", tier: "elem_1000", category: "家庭與身分",
    word: "grandmother", chunk: "grand - moth - er", ipa: "/\u02c8\u0261r\u00e6nd\u02ccm\u028c\u00f0.\u025a/", pos: "n.",
    icon: "👵", zh: "祖母、奶奶、外婆",
    collocation: "grandmother's cookies",
    example: "Grandmother makes the most delicious apple pie.", exampleZh: "奶奶做的蘋果派是最好吃的。",
    memoryTip: "grand + mother"
  },
  {
    id: "fc-el-009", tier: "elem_1000", category: "家庭與身分",
    word: "uncle", chunk: "un - cle", ipa: "/\u02c8\u028c\u014b.k\u0259l/", pos: "n.",
    icon: "🧔", zh: "伯父、叔父、舅舅",
    collocation: "my uncle",
    example: "My uncle brought me a model airplane from Tokyo.", exampleZh: "我叔叔從東京帶了一架模型飛機給我。",
    memoryTip: "un 發 /ʌŋ/ + cle 發成音節 /kəl/"
  },
  {
    id: "fc-el-010", tier: "elem_1000", category: "家庭與身分",
    word: "aunt", chunk: "aunt", ipa: "/\u00e6nt/", pos: "n.",
    icon: "👩‍🦰", zh: "姑母、伯母、阿姨",
    collocation: "Aunt Mary",
    example: "Aunt Mary teaches art at an elementary school.", exampleZh: "瑪麗阿姨在國小教美術。",
    memoryTip: "au 發短母音 /æ/ (同 ant 音)"
  },
  {
    id: "fc-el-011", tier: "elem_1000", category: "家庭與身分",
    word: "cousin", chunk: "cous - in", ipa: "/\u02c8k\u028cz.\u0259n/", pos: "n.",
    icon: "🧑‍🤝‍🧑", zh: "堂表兄弟姊妹",
    collocation: "play with cousins",
    example: "I played video games with my cousin yesterday.", exampleZh: "我昨天和我表哥一起玩電玩。",
    memoryTip: "ou 發短母音 /ʌ/ + sin 弱讀 /zən/"
  },
  {
    id: "fc-el-012", tier: "elem_1000", category: "家庭與身分",
    word: "son", chunk: "son", ipa: "/s\u028cn/", pos: "n.",
    icon: "📚", zh: "兒子",
    collocation: "only son (獨生子)",
    example: "Mr. Lin is very proud of his eldest son.", exampleZh: "林先生對他的大兒子感到非常驕傲。",
    memoryTip: "同音字：sun (太陽)！發音皆為 /sʌn/"
  },
  {
    id: "fc-el-013", tier: "elem_1000", category: "家庭與身分",
    word: "daughter", chunk: "daugh - ter", ipa: "/\u02c8d\u0254\u02d0.t\u025a/", pos: "n.",
    icon: "👨‍👩‍👧", zh: "女兒",
    collocation: "beloved daughter",
    example: "Their daughter won first prize in the speech contest.", exampleZh: "他們的女兒在演講比賽中贏得第一名。",
    memoryTip: "augh 發長母音 /ɔː/，gh 不發音"
  },
  {
    id: "fc-el-014", tier: "elem_1000", category: "家庭與身分",
    word: "baby", chunk: "ba - by", ipa: "/\u02c8be\u026a.bi/", pos: "n.",
    icon: "👶", zh: "嬰兒、小寶寶",
    collocation: "baby brother",
    example: "The baby is sleeping peacefully in the crib.", exampleZh: "小寶寶在嬰兒床裡安靜地睡著。",
    memoryTip: "開音節 ba 發長音 /beɪ/ + by 發 /bi/"
  },
  {
    id: "fc-el-015", tier: "elem_1000", category: "家庭與身分",
    word: "child", chunk: "child", ipa: "/t\u0283a\u026ald/", pos: "n.",
    icon: "🧒", zh: "兒童、小孩 (單數)",
    collocation: "only child",
    example: "Every child has the right to receive an education.", exampleZh: "每個孩子都有接受教育的權利。",
    memoryTip: "ch 發 /tʃ/ + ild 發長音 /aɪld/"
  },
  {
    id: "fc-el-016", tier: "elem_1000", category: "家庭與身分",
    word: "children", chunk: "chil - dren", ipa: "/\u02c8t\u0283\u026al.dr\u0259n/", pos: "n.",
    icon: "🧒", zh: "兒童、孩子們 (複數)",
    collocation: "children's playground",
    example: "The children are playing hide-and-seek in the park.", exampleZh: "孩子們正在公園裡玩捉迷藏。",
    memoryTip: "不規則複數：child (/aɪ/) ➔ children (/ɪ/)"
  },
  {
    id: "fc-el-017", tier: "elem_1000", category: "家庭與身分",
    word: "friend", chunk: "friend", ipa: "/fr\u025bnd/", pos: "n.",
    icon: "🤝", zh: "朋友",
    collocation: "best friend",
    example: "A true friend is always there when you need help.", exampleZh: "真正的朋友在你需要幫助時總會陪伴在旁。",
    memoryTip: "ie 不規則發短母音 /ɛ/！A friend to the end"
  },
  {
    id: "fc-el-018", tier: "elem_1000", category: "家庭與身分",
    word: "neighbor", chunk: "neigh - bor", ipa: "/\u02c8ne\u026a.b\u025a/", pos: "n.",
    icon: "🏘️", zh: "鄰居",
    collocation: "friendly neighbor",
    example: "Our neighbor helped us water the plants during our vacation.", exampleZh: "我們度假期間鄰居幫忙替盆栽澆水。",
    memoryTip: "eigh 發長母音 /eɪ/，gh 不發音"
  },
  {
    id: "fc-el-019", tier: "elem_1000", category: "家庭與身分",
    word: "person", chunk: "per - son", ipa: "/\u02c8p\u025d\u02d0.s\u0259n/", pos: "n.",
    icon: "👨‍👩‍👧", zh: "人、個人",
    collocation: "kind person",
    example: "She is a very polite and trustworthy person.", exampleZh: "她是一位非常有禮貌且值得信賴的人。",
    memoryTip: "per 捲舌音 /pɝː/ + son 弱讀 /sən/"
  },
  {
    id: "fc-el-020", tier: "elem_1000", category: "家庭與身分",
    word: "people", chunk: "peo - ple", ipa: "/\u02c8pi\u02d0.p\u0259l/", pos: "n.",
    icon: "👨‍👩‍👧", zh: "人們 (複數)",
    collocation: "many people",
    example: "Many people gathered in the town square for the festival.", exampleZh: "許多人聚集在鎮上的廣場慶祝節慶。",
    memoryTip: "eo 發長母音 /iː/，ple 發成音節 /pəl/"
  },
  {
    id: "fc-el-021", tier: "elem_1000", category: "學校與教室",
    word: "school", chunk: "school", ipa: "/sku\u02d0l/", pos: "n.",
    icon: "🏫", zh: "學校",
    collocation: "go to school (上學)",
    example: "We walk to school together every morning.", exampleZh: "我們每天早晨一同走路去上學。",
    memoryTip: "sch 發 /sk/ + oo 發長音 /uː/"
  },
  {
    id: "fc-el-022", tier: "elem_1000", category: "學校與教室",
    word: "classroom", chunk: "class - room", ipa: "/\u02c8kl\u00e6s.ru\u02d0m/", pos: "n.",
    icon: "🏫", zh: "教室",
    collocation: "clean the classroom",
    example: "Please keep the classroom clean and tidy.", exampleZh: "請保持教室乾淨整潔。",
    memoryTip: "class (班級) + room (房間)"
  },
  {
    id: "fc-el-023", tier: "elem_1000", category: "學校與教室",
    word: "teacher", chunk: "teach - er", ipa: "/\u02c8ti\u02d0.t\u0283\u025a/", pos: "n.",
    icon: "👩‍🏫", zh: "老師、教師",
    collocation: "English teacher",
    example: "Our English teacher explains grammar very clearly.", exampleZh: "我們的英文老師文法解釋得非常清楚。",
    memoryTip: "teach (教) + -er (人) ➔ 老師"
  },
  {
    id: "fc-el-024", tier: "elem_1000", category: "學校與教室",
    word: "student", chunk: "stu - dent", ipa: "/\u02c8stju\u02d0.d\u0259nt/", pos: "n.",
    icon: "🧑‍🎓", zh: "學生",
    collocation: "good student",
    example: "The student raised her hand to ask a question.", exampleZh: "那名學生舉手發問。",
    memoryTip: "stu 開音節 /stjuː/ + dent 弱讀 /dənt/"
  },
  {
    id: "fc-el-025", tier: "elem_1000", category: "學校與教室",
    word: "classmate", chunk: "class - mate", ipa: "/\u02c8kl\u00e6s.me\u026at/", pos: "n.",
    icon: "🎒", zh: "同班同學",
    collocation: "friendly classmate",
    example: "Tom and I have been classmates for three years.", exampleZh: "湯姆和我當同班同學已經三年了。",
    memoryTip: "class (班級) + mate (夥伴) ➔ 同學"
  },
  {
    id: "fc-el-026", tier: "elem_1000", category: "學校與教室",
    word: "blackboard", chunk: "black - board", ipa: "/\u02c8bl\u00e6k.b\u0254\u02d0rd/", pos: "n.",
    icon: "⚫", zh: "黑板",
    collocation: "write on the blackboard",
    example: "The teacher wrote new words on the blackboard.", exampleZh: "老師把生字寫在黑板上。",
    memoryTip: "black (黑) + board (板)"
  },
  {
    id: "fc-el-027", tier: "elem_1000", category: "學校與教室",
    word: "desk", chunk: "desk", ipa: "/d\u025bsk/", pos: "n.",
    icon: "🪑", zh: "書桌、辦公桌",
    collocation: "sit at the desk",
    example: "Put your textbooks on the desk, please.", exampleZh: "請把課本放在書桌上。",
    memoryTip: "CVC 結構，e 發短音 /ɛ/"
  },
  {
    id: "fc-el-028", tier: "elem_1000", category: "學校與教室",
    word: "chair", chunk: "chair", ipa: "/t\u0283\u025br/", pos: "n.",
    icon: "🪑", zh: "椅子",
    collocation: "sit on a chair",
    example: "He pulled out a chair and sat down quietly.", exampleZh: "他拉開椅子安靜地坐下。",
    memoryTip: "air 發 /ɛr/，ch 發 /tʃ/"
  },
  {
    id: "fc-el-029", tier: "elem_1000", category: "學校與教室",
    word: "pencil", chunk: "pen - cil", ipa: "/\u02c8p\u025bn.s\u0259l/", pos: "n.",
    icon: "✏️", zh: "鉛筆",
    collocation: "sharpen a pencil",
    example: "I need a pencil to finish my math homework.", exampleZh: "我需要一隻鉛筆來完成我的數學作業。",
    memoryTip: "pen + cil (c 在 i 前發軟音 /s/)"
  },
  {
    id: "fc-el-030", tier: "elem_1000", category: "學校與教室",
    word: "pen", chunk: "pen", ipa: "/p\u025bn/", pos: "n.",
    icon: "🖊️", zh: "原子筆、鋼筆",
    collocation: "blue pen",
    example: "Sign your name with a black or blue pen.", exampleZh: "請用黑色或藍色原子筆簽名。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-031", tier: "elem_1000", category: "學校與教室",
    word: "eraser", chunk: "e - ras - er", ipa: "/\u026a\u02c8re\u026a.s\u025a/", pos: "n.",
    icon: "🧹", zh: "橡皮擦",
    collocation: "use an eraser",
    example: "Can I borrow your eraser for a minute?", exampleZh: "我可以借用一下你的橡皮擦嗎？",
    memoryTip: "erase (擦掉) + -er (工具)"
  },
  {
    id: "fc-el-032", tier: "elem_1000", category: "學校與教室",
    word: "ruler", chunk: "rul - er", ipa: "/\u02c8ru\u02d0.l\u025a/", pos: "n.",
    icon: "📏", zh: "尺、直尺",
    collocation: "draw lines with a ruler",
    example: "Use a ruler to draw a straight line.", exampleZh: "請用直尺畫出一條直線。",
    memoryTip: "rule (規則/丈量) + -er"
  },
  {
    id: "fc-el-033", tier: "elem_1000", category: "學校與教室",
    word: "notebook", chunk: "note - book", ipa: "/\u02c8no\u028at.b\u028ak/", pos: "n.",
    icon: "📖", zh: "筆記本",
    collocation: "take notes in a notebook",
    example: "Write down the important rules in your notebook.", exampleZh: "把重要的規則記在筆記本裡。",
    memoryTip: "note (筆記) + book (書本)"
  },
  {
    id: "fc-el-034", tier: "elem_1000", category: "學校與教室",
    word: "textbook", chunk: "text - book", ipa: "/\u02c8t\u025bkst.b\u028ak/", pos: "n.",
    icon: "📖", zh: "課本、教科書",
    collocation: "open the textbook",
    example: "Please turn to page twenty-five in your textbook.", exampleZh: "請翻開課本第二十五頁。",
    memoryTip: "text (課文) + book (書籍)"
  },
  {
    id: "fc-el-035", tier: "elem_1000", category: "學校與教室",
    word: "backpack", chunk: "back - pack", ipa: "/\u02c8b\u00e6k.p\u00e6k/", pos: "n.",
    icon: "🎒", zh: "雙肩後背包、書包",
    collocation: "carry a backpack",
    example: "Her backpack was filled with interesting books.", exampleZh: "她的後背包裝滿了有趣的書籍。",
    memoryTip: "back (背部) + pack (包裹)"
  },
  {
    id: "fc-el-036", tier: "elem_1000", category: "學校與教室",
    word: "homework", chunk: "home - work", ipa: "/\u02c8ho\u028am.w\u025d\u02d0k/", pos: "n.",
    icon: "📝", zh: "家庭作業 (不可數)",
    collocation: "do homework (寫作業)",
    example: "I always finish my homework before having dinner.", exampleZh: "我總是在吃晚餐前完成作業。",
    memoryTip: "home (家) + work (功課)，注意不可數！"
  },
  {
    id: "fc-el-037", tier: "elem_1000", category: "學校與教室",
    word: "lesson", chunk: "les - son", ipa: "/\u02c8l\u025bs.\u0259n/", pos: "n.",
    icon: "📚", zh: "課、課程",
    collocation: "English lesson",
    example: "Today's lesson focuses on present perfect tense.", exampleZh: "今天的課程聚焦在現在完成式。",
    memoryTip: "雙寫 s，les 發 /lɛs/ + son 弱讀 /ən/"
  },
  {
    id: "fc-el-038", tier: "elem_1000", category: "學校與教室",
    word: "library", chunk: "li - brar - y", ipa: "/\u02c8la\u026a.br\u025br.i/", pos: "n.",
    icon: "📚", zh: "圖書館",
    collocation: "borrow books from the library",
    example: "Students are studying quietly in the school library.", exampleZh: "學生們正在學校圖書館裡安靜地讀書。",
    memoryTip: "li 發 /laɪ/ + brary 發 /brɛr.i/"
  },
  {
    id: "fc-el-039", tier: "elem_1000", category: "學校與教室",
    word: "playground", chunk: "play - ground", ipa: "/\u02c8ple\u026a.\u0261ra\u028and/", pos: "n.",
    icon: "🎮", zh: "操場、遊戲場",
    collocation: "run on the playground",
    example: "Children love running around on the playground during recess.", exampleZh: "下課時孩子們喜歡在操場上奔跑。",
    memoryTip: "play (玩耍) + ground (場地)"
  },
  {
    id: "fc-el-040", tier: "elem_1000", category: "學校與教室",
    word: "question", chunk: "ques - tion", ipa: "/\u02c8kw\u025bs.t\u0283\u0259n/", pos: "n.",
    icon: "🎒", zh: "問題、疑問",
    collocation: "ask a question",
    example: "Raise your hand if you know the answer to the question.", exampleZh: "如果你知道這個問題的答案請舉手。",
    memoryTip: "ques 發 /kwɛs/ + tion 在 s 後發 /tʃən/"
  },
  {
    id: "fc-el-041", tier: "elem_1000", category: "學校與教室",
    word: "answer", chunk: "an - swer", ipa: "/\u02c8\u00e6n.s\u025a/", pos: "n. / v.",
    icon: "🎒", zh: "回答、答案",
    collocation: "answer the question",
    example: "She knew the correct answer to the math problem.", exampleZh: "她知道這道數學題的正確答案。",
    memoryTip: "w 不發音！an 發 /æn/ + swer 發 /sɚ/"
  },
  {
    id: "fc-el-042", tier: "elem_1000", category: "日常動作與作息",
    word: "listen", chunk: "lis - ten", ipa: "/\u02c8l\u026as.\u0259n/", pos: "v.",
    icon: "👂", zh: "聆聽、注意聽",
    collocation: "listen to music",
    example: "Please listen carefully to the speaker.", exampleZh: "請專心聆聽發言者的內容。",
    memoryTip: "t 不發音，lis 短音 /ɪ/ + ten 弱讀 /ən/"
  },
  {
    id: "fc-el-043", tier: "elem_1000", category: "日常動作與作息",
    word: "speak", chunk: "speak", ipa: "/spi\u02d0k/", pos: "v.",
    icon: "🗣️", zh: "講話、說（語言）",
    collocation: "speak English",
    example: "Can you speak English fluently?", exampleZh: "你能流利地說英文嗎？",
    memoryTip: "ea 字母組合發長音 /iː/"
  },
  {
    id: "fc-el-044", tier: "elem_1000", category: "日常動作與作息",
    word: "read", chunk: "read", ipa: "/ri\u02d0d/", pos: "v.",
    icon: "📖", zh: "閱讀、朗讀",
    collocation: "read a book",
    example: "I like to read storybooks before going to sleep.", exampleZh: "我喜歡在睡前閱讀故事書。",
    memoryTip: "現在式發長音 /iː/，過去式 read 發短音 /ɛ/！"
  },
  {
    id: "fc-el-045", tier: "elem_1000", category: "日常動作与作息",
    word: "write", chunk: "write", ipa: "/ra\u026at/", pos: "v.",
    icon: "✍️", zh: "書寫、寫信",
    collocation: "write a letter",
    example: "She writes a diary entry every single night.", exampleZh: "她每晚都會寫一篇日記。",
    memoryTip: "w 不發音，Magic E 使 i 發長音 /aɪ/"
  },
  {
    id: "fc-el-046", tier: "elem_1000", category: "日常動作與作息",
    word: "wash", chunk: "wash", ipa: "/w\u0251\u02d0\u0283/", pos: "v.",
    icon: "🎒", zh: "清洗、洗滌",
    collocation: "wash your hands",
    example: "Always wash your hands before eating snacks.", exampleZh: "吃點心前務必記得洗手。",
    memoryTip: "sh 發軟音 /ʃ/，a 發短音 /ɑː/"
  },
  {
    id: "fc-el-047", tier: "elem_1000", category: "日常動作與作息",
    word: "brush", chunk: "brush", ipa: "/br\u028c\u0283/", pos: "v. / n.",
    icon: "🎒", zh: "刷（牙）、刷子",
    collocation: "brush teeth (刷牙)",
    example: "Remember to brush your teeth twice a day.", exampleZh: "記得每天要刷兩次牙。",
    memoryTip: "u 發短母音 /ʌ/，sh 發 /ʃ/"
  },
  {
    id: "fc-el-048", tier: "elem_1000", category: "日常動作與作息",
    word: "cook", chunk: "cook", ipa: "/k\u028ak/", pos: "v. / n.",
    icon: "👨‍🍳", zh: "烹飪、煮飯；廚師",
    collocation: "cook dinner",
    example: "Dad loves to cook delicious meals for the family.", exampleZh: "爸爸很喜歡為家人煮美味的餐點。",
    memoryTip: "oo 發短母音 /ʊ/ (同 book, look)"
  },
  {
    id: "fc-el-049", tier: "elem_1000", category: "日常動作與作息",
    word: "clean", chunk: "clean", ipa: "/kli\u02d0n/", pos: "v. / adj.",
    icon: "✨", zh: "打掃；乾淨的",
    collocation: "clean the room",
    example: "We cleaned our bedroom together on Saturday.", exampleZh: "我們週六一起把臥室打掃乾淨。",
    memoryTip: "ea 字母組合發長母音 /iː/"
  },
  {
    id: "fc-el-050", tier: "elem_1000", category: "日常動作與作息",
    word: "sleep", chunk: "sleep", ipa: "/sli\u02d0p/", pos: "v. / n.",
    icon: "💤", zh: "睡覺；睡眠",
    collocation: "go to sleep",
    example: "Children should sleep for at least eight hours.", exampleZh: "孩子們每天應該至少睡足八小時。",
    memoryTip: "ee 雙字母發長母音 /iː/"
  },
  {
    id: "fc-el-051", tier: "elem_1000", category: "日常動作與作息",
    word: "wake", chunk: "wake", ipa: "/we\u026ak/", pos: "v.",
    icon: "⏰", zh: "醒來、叫醒",
    collocation: "wake up early",
    example: "I usually wake up at six thirty in the morning.", exampleZh: "我通常早上六點半醒來。",
    memoryTip: "Magic E 使 a 發長母音 /eɪ/"
  },
  {
    id: "fc-el-052", tier: "elem_1000", category: "日常動作與作息",
    word: "walk", chunk: "walk", ipa: "/w\u0254\u02d0k/", pos: "v. / n.",
    icon: "🚶", zh: "走路、散步",
    collocation: "take a walk",
    example: "Let's take a walk in the park after dinner.", exampleZh: "我們晚餐後去公園散個步吧。",
    memoryTip: "l 不發音！al 發長音 /ɔːk/"
  },
  {
    id: "fc-el-053", tier: "elem_1000", category: "日常動作與作息",
    word: "run", chunk: "run", ipa: "/r\u028cn/", pos: "v.",
    icon: "🏃", zh: "奔跑、跑步",
    collocation: "run fast",
    example: "The cheetah can run faster than any other land animal.", exampleZh: "獵豹奔跑的速度比任何陸地動物都要快。",
    memoryTip: "CVC 結構，u 發短母音 /ʌ/"
  },
  {
    id: "fc-el-054", tier: "elem_1000", category: "日常動作與作息",
    word: "jump", chunk: "jump", ipa: "/d\u0292\u028cmp/", pos: "v. / n.",
    icon: "🦘", zh: "跳躍",
    collocation: "jump high",
    example: "Frogs can jump very high into the air.", exampleZh: "青蛙能高高跳起到空中。",
    memoryTip: "j 發 /dʒ/，u 發短母音 /ʌ/"
  },
  {
    id: "fc-el-055", tier: "elem_1000", category: "日常動作與作息",
    word: "swim", chunk: "swim", ipa: "/sw\u026am/", pos: "v.",
    icon: "🏊", zh: "游泳",
    collocation: "go swimming",
    example: "We like to go swimming in the cool pool in summer.", exampleZh: "我們夏天喜歡在涼爽的泳池裡游泳。",
    memoryTip: "CVC 結構，i 發短母音 /ɪ/"
  },
  {
    id: "fc-el-056", tier: "elem_1000", category: "日常動作與作息",
    word: "help", chunk: "help", ipa: "/h\u025blp/", pos: "v. / n.",
    icon: "🤝", zh: "幫助、協助",
    collocation: "help each other",
    example: "Friends should always help each other in times of need.", exampleZh: "朋友在需要時總應當互相幫助。",
    memoryTip: "CVC 結構，e 發短音 /ɛ/"
  },
  {
    id: "fc-el-057", tier: "elem_1000", category: "日常動作與作息",
    word: "smile", chunk: "smile", ipa: "/sma\u026al/", pos: "v. / n.",
    icon: "🎒", zh: "微笑",
    collocation: "warm smile",
    example: "She greeted the guests with a warm and friendly smile.", exampleZh: "她帶著溫暖親切的微笑迎接賓客。",
    memoryTip: "Magic E 使 i 發長母音 /aɪ/"
  },
  {
    id: "fc-el-058", tier: "elem_1000", category: "日常動作與作息",
    word: "laugh", chunk: "laugh", ipa: "/l\u00e6f/", pos: "v. / n.",
    icon: "🎒", zh: "大笑、笑出聲",
    collocation: "laugh out loud",
    example: "The funny clown made all the children laugh out loud.", exampleZh: "滑稽的小丑逗得全場孩子哄堂大笑。",
    memoryTip: "gh 發 /f/，au 發短母音 /æ/"
  },
  {
    id: "fc-el-059", tier: "elem_1000", category: "日常動作與作息",
    word: "cry", chunk: "cry", ipa: "/kra\u026a/", pos: "v. / n.",
    icon: "🎒", zh: "哭泣、喊叫",
    collocation: "don't cry",
    example: "Don't cry; everything will turn out fine in the end.", exampleZh: "別哭，最後一切都會好起來的。",
    memoryTip: "單音節結尾 y 發長雙母音 /aɪ/"
  },
  {
    id: "fc-el-060", tier: "elem_1000", category: "飲食與餐點",
    word: "breakfast", chunk: "break - fast", ipa: "/\u02c8br\u025bk.f\u0259st/", pos: "n.",
    icon: "🍳", zh: "早餐",
    collocation: "have breakfast",
    example: "Eating a healthy breakfast gives you energy all morning.", exampleZh: "吃一頓健康的早餐能給你整個早晨滿滿活力。",
    memoryTip: "break (打破) + fast (斷食) ➔ 破除夜間斷食的第一餐"
  },
  {
    id: "fc-el-061", tier: "elem_1000", category: "飲食與餐點",
    word: "lunch", chunk: "lunch", ipa: "/l\u028cnt\u0283/", pos: "n.",
    icon: "🍱", zh: "午餐",
    collocation: "have lunch",
    example: "We eat our lunch in the classroom at noon.", exampleZh: "我們中午在教室裡吃午餐。",
    memoryTip: "u 發短音 /ʌ/，nch 發 /ntʃ/"
  },
  {
    id: "fc-el-062", tier: "elem_1000", category: "飲食與餐點",
    word: "dinner", chunk: "din - ner", ipa: "/\u02c8d\u026an.\u025a/", pos: "n.",
    icon: "🍽️", zh: "晚餐",
    collocation: "cook dinner",
    example: "What would you like to have for dinner tonight?", exampleZh: "你今晚晚餐想吃什麼呢？",
    memoryTip: "雙寫 n，din 發短音 /dɪn/ + ner /ɚ/"
  },
  {
    id: "fc-el-063", tier: "elem_1000", category: "飲食與餐點",
    word: "meal", chunk: "meal", ipa: "/mi\u02d0l/", pos: "n.",
    icon: "🍽️", zh: "一餐、飯局",
    collocation: "three meals a day",
    example: "You should eat three balanced meals every day.", exampleZh: "你每天應當吃三餐營養均衡的飯菜。",
    memoryTip: "ea 字母組合發長母音 /iː/"
  },
  {
    id: "fc-el-064", tier: "elem_1000", category: "飲食與餐點",
    word: "water", chunk: "wa - ter", ipa: "/\u02c8w\u0251\u02d0.t\u025a/", pos: "n.",
    icon: "💧", zh: "水 (不可數)",
    collocation: "drink water",
    example: "Drinking plenty of water keeps your body healthy.", exampleZh: "多喝水能讓身體保持健康。",
    memoryTip: "wa 發 /wɑː/ + ter 發 /tɚ/"
  },
  {
    id: "fc-el-065", tier: "elem_1000", category: "飲食與餐點",
    word: "milk", chunk: "milk", ipa: "/m\u026alk/", pos: "n.",
    icon: "🥛", zh: "牛奶 (不可數)",
    collocation: "a glass of milk",
    example: "Drinking warm milk helps people fall asleep faster.", exampleZh: "喝熱牛奶能幫助人們更快入睡。",
    memoryTip: "CVC 短母音 /ɪ/"
  },
  {
    id: "fc-el-066", tier: "elem_1000", category: "飲食與餐點",
    word: "tea", chunk: "tea", ipa: "/ti\u02d0/", pos: "n.",
    icon: "🍵", zh: "茶 (不可數)",
    collocation: "black tea (紅茶)",
    example: "My grandparents drink hot green tea every afternoon.", exampleZh: "我祖父母每天下午都喝熱綠茶。",
    memoryTip: "ea 字母組合發長母音 /iː/"
  },
  {
    id: "fc-el-067", tier: "elem_1000", category: "飲食與餐點",
    word: "juice", chunk: "juice", ipa: "/d\u0292u\u02d0s/", pos: "n.",
    icon: "🧃", zh: "果汁 (不可數)",
    collocation: "orange juice",
    example: "Freshly squeezed orange juice is rich in Vitamin C.", exampleZh: "現榨柳橙汁富含維生素 C。",
    memoryTip: "ui 發長母音 /uː/，c 發 /s/"
  },
  {
    id: "fc-el-068", tier: "elem_1000", category: "飲食與餐點",
    word: "bread", chunk: "bread", ipa: "/br\u025bd/", pos: "n.",
    icon: "🍞", zh: "麵包 (不可數)",
    collocation: "a slice of bread",
    example: "I like to eat toasted bread with sweet strawberry jam.", exampleZh: "我喜歡吃烤麵包塗草莓果醬。",
    memoryTip: "ea 不規則發短母音 /ɛ/ (同 head, ready)"
  },
  {
    id: "fc-el-069", tier: "elem_1000", category: "飲食與餐點",
    word: "rice", chunk: "rice", ipa: "/ra\u026as/", pos: "n.",
    icon: "🍚", zh: "米飯 (不可數)",
    collocation: "fried rice (炒飯)",
    example: "Rice is the primary staple food for many Asian cultures.", exampleZh: "米飯是許多亞洲文化的主要主食。",
    memoryTip: "Magic E 使 i 發長母音 /aɪ/，c 發 /s/"
  },
  {
    id: "fc-el-070", tier: "elem_1000", category: "飲食與餐點",
    word: "noodle", chunk: "noo - dle", ipa: "/\u02c8nu\u02d0.d\u0259l/", pos: "n.",
    icon: "🍜", zh: "麵條 (常用複數 noodles)",
    collocation: "beef noodles (牛肉麵)",
    example: "Taiwan is internationally famous for tasty beef noodles.", exampleZh: "台灣以美味的牛肉麵聞名國際。",
    memoryTip: "oo 發長母音 /uː/，dle 成音節 /dəl/"
  },
  {
    id: "fc-el-071", tier: "elem_1000", category: "飲食與餐點",
    word: "apple", chunk: "ap - ple", ipa: "/\u02c8\u00e6p.\u0259l/", pos: "n.",
    icon: "🍎", zh: "蘋果",
    collocation: "an apple a day",
    example: "An apple a day keeps the doctor away.", exampleZh: "一天一蘋果，醫生遠離我。",
    memoryTip: "雙寫 p，a 發短音 /æ/ + ple 發成音節 /əl/"
  },
  {
    id: "fc-el-072", tier: "elem_1000", category: "飲食與餐點",
    word: "banana", chunk: "ba - nan - a", ipa: "/b\u0259\u02c8n\u00e6n.\u0259/", pos: "n.",
    icon: "🍌", zh: "香蕉",
    collocation: "peel a banana",
    example: "Monkeys love eating ripe yellow bananas.", exampleZh: "猴子很喜歡吃成熟的黃香蕉。",
    memoryTip: "ba (/bə/) + nan (/næn/) + a (/ə/)"
  },
  {
    id: "fc-el-073", tier: "elem_1000", category: "飲食與餐點",
    word: "orange", chunk: "or - ange", ipa: "/\u02c8\u0254\u02d0r.\u026and\u0292/", pos: "n. / adj.",
    icon: "🟠", zh: "柳橙；橙色的",
    collocation: "sweet orange",
    example: "Sweet oranges are juicy and delicious in winter.", exampleZh: "甜柳橙在冬天多汁又美味。",
    memoryTip: "or 發 /ɔːr/ + ange 發 /ɪndʒ/"
  },
  {
    id: "fc-el-074", tier: "elem_1000", category: "飲食與餐點",
    word: "vegetable", chunk: "veg - e - ta - ble", ipa: "/\u02c8v\u025bd\u0292.t\u0259.b\u0259l/", pos: "n.",
    icon: "🥦", zh: "蔬菜",
    collocation: "fresh vegetables",
    example: "Eating fresh green vegetables is good for digestion.", exampleZh: "吃新鮮綠色蔬菜對消化很有益處。",
    memoryTip: "g 在 e 前發軟音 /dʒ/，第二音節常弱讀省略"
  },
  {
    id: "fc-el-075", tier: "elem_1000", category: "飲食與餐點",
    word: "fruit", chunk: "fruit", ipa: "/fru\u02d0t/", pos: "n.",
    icon: "🍎", zh: "水果",
    collocation: "fresh fruit",
    example: "Taiwan is famous for producing high-quality tropical fruit.", exampleZh: "台灣以盛產高品質熱帶水果而聞名。",
    memoryTip: "ui 字母組合發長音 /uː/ (同 juice)"
  },
  {
    id: "fc-el-076", tier: "elem_1000", category: "動物與生態",
    word: "dog", chunk: "dog", ipa: "/d\u0254\u02d0\u0261/", pos: "n.",
    icon: "🐶", zh: "狗、小狗",
    collocation: "walk the dog",
    example: "My dog wags its tail happily whenever I come home.", exampleZh: "每當我回家時，我的狗都會高興地搖尾巴。",
    memoryTip: "CVC 結構，o 發短音 /ɔː/"
  },
  {
    id: "fc-el-077", tier: "elem_1000", category: "動物與生態",
    word: "cat", chunk: "cat", ipa: "/k\u00e6t/", pos: "n.",
    icon: "🐱", zh: "貓、小貓",
    collocation: "pet a cat",
    example: "The little cat is sleeping in the warm sunshine.", exampleZh: "小貓正在溫暖的陽光下熟睡。",
    memoryTip: "CVC 結構，a 發短音 /æ/"
  },
  {
    id: "fc-el-078", tier: "elem_1000", category: "動物與生態",
    word: "bird", chunk: "bird", ipa: "/b\u025d\u02d0d/", pos: "n.",
    icon: "🐦", zh: "鳥",
    collocation: "birds singing",
    example: "Early in the morning, birds sing songs in the tree.", exampleZh: "清晨時分，鳥兒在樹上歌唱。",
    memoryTip: "ir 字母組合發捲舌長母音 /ɝː/"
  },
  {
    id: "fc-el-079", tier: "elem_1000", category: "動物與生態",
    word: "rabbit", chunk: "rab - bit", ipa: "/\u02c8r\u00e6b.\u026at/", pos: "n.",
    icon: "🐰", zh: "兔子",
    collocation: "white rabbit",
    example: "The white rabbit has long ears and red eyes.", exampleZh: "白兔有著長長的耳朵和紅色的眼睛。",
    memoryTip: "雙寫 b，rab 短音 /ræb/ + bit 短音 /bɪt/"
  },
  {
    id: "fc-el-080", tier: "elem_1000", category: "動物與生態",
    word: "elephant", chunk: "el - e - phant", ipa: "/\u02c8\u025bl.\u0259.f\u0259nt/", pos: "n.",
    icon: "🐘", zh: "大象",
    collocation: "African elephant",
    example: "The elephant has a long trunk and huge ears.", exampleZh: "大象有一條長長的鼻子和大大的耳朵。",
    memoryTip: "ph 發 /f/，el (/ɛl/) + e (/ə/) + phant (/fənt/)"
  },
  {
    id: "fc-el-081", tier: "elem_1000", category: "動物與生態",
    word: "monkey", chunk: "mon - key", ipa: "/\u02c8m\u028c\u014b.ki/", pos: "n.",
    icon: "🐒", zh: "猴子",
    collocation: "clever monkey",
    example: "The clever monkey climbed up the tall tree swiftly.", exampleZh: "那隻聰明的猴子敏捷地爬上了大樹。",
    memoryTip: "ey 發長母音 /i/，mon 發 /mʌŋ/"
  },
  {
    id: "fc-el-082", tier: "elem_1000", category: "動物與生態",
    word: "tiger", chunk: "ti - ger", ipa: "/\u02c8ta\u026a.\u0261\u025a/", pos: "n.",
    icon: "🐯", zh: "老虎",
    collocation: "Bengal tiger",
    example: "The fierce tiger rested quietly in the tall grass.", exampleZh: "兇猛的老虎安靜地在長草叢中休息。",
    memoryTip: "開音節 ti 發長音 /taɪ/ + ger /ɡɚ/"
  },
  {
    id: "fc-el-083", tier: "elem_1000", category: "動物與生態",
    word: "lion", chunk: "li - on", ipa: "/\u02c8la\u026a.\u0259n/", pos: "n.",
    icon: "🦁", zh: "獅子",
    collocation: "king of the jungle",
    example: "The lion is known as the king of the beasts.", exampleZh: "獅子被公認為百獸之王。",
    memoryTip: "開音節 li 發長音 /laɪ/ + on /ən/"
  },
  {
    id: "fc-el-084", tier: "elem_1000", category: "動物與生態",
    word: "fish", chunk: "fish", ipa: "/f\u026a\u0283/", pos: "n.",
    icon: "🐟", zh: "魚 (單複數同形)",
    collocation: "catch fish",
    example: "There are many colorful fish swimming in the coral reef.", exampleZh: "珊瑚礁裡有許多五彩繽紛的魚在游動。",
    memoryTip: "sh 發 /ʃ/，注意單複數同形！"
  },
  {
    id: "fc-el-085", tier: "elem_1000", category: "動物與生態",
    word: "bear", chunk: "bear", ipa: "/b\u025br/", pos: "n.",
    icon: "🐻", zh: "熊",
    collocation: "polar bear (北極熊)",
    example: "Polar bears have thick white fur to stay warm in the Arctic.", exampleZh: "北極熊有厚厚的白毛以在北極保暖。",
    memoryTip: "ear 不規則發 /ɛr/ (同 pear)"
  },
  {
    id: "fc-el-086", tier: "elem_1000", category: "自然與天氣",
    word: "weather", chunk: "weath - er", ipa: "/\u02c8w\u025b\u00f0.\u025a/", pos: "n.",
    icon: "🍽️", zh: "天氣 (不可數)",
    collocation: "sunny weather",
    example: "The weather in spring is usually pleasant and warm.", exampleZh: "春天的天氣通常令人愉悅且溫暖。",
    memoryTip: "ea 發短音 /ɛ/，th 發濁音 /ð/，er 發 /ɚ/"
  },
  {
    id: "fc-el-087", tier: "elem_1000", category: "自然與天氣",
    word: "sunny", chunk: "sun - ny", ipa: "/\u02c8s\u028cn.i/", pos: "adj.",
    icon: "☀️", zh: "晴朗的、陽光充足的",
    collocation: "sunny day",
    example: "We decided to go for a picnic on this sunny morning.", exampleZh: "我們決定在這個晴朗的早晨去野餐。",
    memoryTip: "sun (太陽) + 雙寫 n + -y (形容詞)"
  },
  {
    id: "fc-el-088", tier: "elem_1000", category: "自然與天氣",
    word: "rainy", chunk: "rain - y", ipa: "/\u02c8re\u026a.ni/", pos: "adj.",
    icon: "🌧️", zh: "下雨的、多雨的",
    collocation: "rainy season",
    example: "Bring an umbrella because it will be rainy this afternoon.", exampleZh: "帶把雨傘，因為今天下午會下雨。",
    memoryTip: "rain (雨) + -y (形容詞)，ai 發長音 /eɪ/"
  },
  {
    id: "fc-el-089", tier: "elem_1000", category: "自然與天氣",
    word: "cloudy", chunk: "cloud - y", ipa: "/\u02c8kla\u028a.di/", pos: "adj.",
    icon: "☁️", zh: "多雲的、陰天的",
    collocation: "cloudy sky",
    example: "The sky turned cloudy before the heavy rain started.", exampleZh: "在大雨開始前，天空轉為多雲陰暗。",
    memoryTip: "cloud (雲) + -y (形容詞)，ou 發 /aʊ/"
  },
  {
    id: "fc-el-090", tier: "elem_1000", category: "自然與天氣",
    word: "windy", chunk: "wind - y", ipa: "/\u02c8w\u026an.di/", pos: "adj.",
    icon: "💨", zh: "多風的、風大的",
    collocation: "windy weather",
    example: "It was so windy that my cap blew off into the pond.", exampleZh: "風大到我的帽子被吹進了池塘。",
    memoryTip: "wind (風) + -y (形容詞)"
  },
  {
    id: "fc-el-091", tier: "elem_1000", category: "自然與天氣",
    word: "snowy", chunk: "snow - y", ipa: "/\u02c8sno\u028a.i/", pos: "adj.",
    icon: "❄️", zh: "下雪的、積雪的",
    collocation: "snowy mountain",
    example: "Children made a cute snowman on the snowy playground.", exampleZh: "孩子們在積雪的操場上堆了個可愛雪人。",
    memoryTip: "snow (雪) + -y (形容詞)"
  },
  {
    id: "fc-el-092", tier: "elem_1000", category: "自然與天氣",
    word: "season", chunk: "sea - son", ipa: "/\u02c8si\u02d0.z\u0259n/", pos: "n.",
    icon: "🌊", zh: "季節",
    collocation: "four seasons",
    example: "Spring is my favorite season because flowers bloom.", exampleZh: "春天是我最喜歡的季節，因為繁花盛開。",
    memoryTip: "sea 發 /siː/ + son 發 /zən/"
  },
  {
    id: "fc-el-093", tier: "elem_1000", category: "自然與天氣",
    word: "spring", chunk: "spring", ipa: "/spr\u026a\u014b/", pos: "n.",
    icon: "🌸", zh: "春天、春季",
    collocation: "warm spring",
    example: "Warm spring weather brings new green leaves to trees.", exampleZh: "溫暖的春天為樹木帶來新綠的嫩葉。",
    memoryTip: "spr 三輔音 + ing 發 /ɪŋ/"
  },
  {
    id: "fc-el-094", tier: "elem_1000", category: "自然與天氣",
    word: "summer", chunk: "sum - mer", ipa: "/\u02c8s\u028cm.\u025a/", pos: "n.",
    icon: "☀️", zh: "夏天、夏季",
    collocation: "hot summer",
    example: "In Taiwan, summer is often hot and humid.", exampleZh: "在台灣，夏天通常炎熱且潮濕。",
    memoryTip: "雙寫 m，sum 發短音 /sʌm/ + mer /ɚ/"
  },
  {
    id: "fc-el-095", tier: "elem_1000", category: "自然與天氣",
    word: "autumn", chunk: "au - tumn", ipa: "/\u02c8\u0254\u02d0.t\u0259m/", pos: "n.",
    icon: "🍂", zh: "秋天、秋季 (美式常用 fall)",
    collocation: "cool autumn",
    example: "Leaves turn red, orange, and yellow in cool autumn.", exampleZh: "在涼爽的秋天，樹葉變紅、變橙、變黃。",
    memoryTip: "au 發長母音 /ɔː/，mn 中 n 不發音！"
  },
  {
    id: "fc-el-096", tier: "elem_1000", category: "自然與天氣",
    word: "winter", chunk: "win - ter", ipa: "/\u02c8w\u026an.t\u025a/", pos: "n.",
    icon: "❄️", zh: "冬天、冬季",
    collocation: "cold winter",
    example: "Wear a heavy jacket to keep warm during cold winter.", exampleZh: "在寒冷的冬天裡穿厚夾克來保暖。",
    memoryTip: "win 閉音節短音 /wɪn/ + ter /tɚ/"
  },
  {
    id: "fc-el-097", tier: "elem_1000", category: "時間與曆法",
    word: "morning", chunk: "morn - ing", ipa: "/\u02c8m\u0254\u02d0r.n\u026a\u014b/", pos: "n.",
    icon: "🌅", zh: "早晨、上午",
    collocation: "in the morning",
    example: "I like to jog around the sports park in the morning.", exampleZh: "我喜歡早晨在運動公園周圍慢跑。",
    memoryTip: "morn 發 /mɔːrn/ + ing 發 /ɪŋ/"
  },
  {
    id: "fc-el-098", tier: "elem_1000", category: "時間與曆法",
    word: "afternoon", chunk: "af - ter - noon", ipa: "/\u02cc\u00e6f.t\u025a\u02c8nu\u02d0n/", pos: "n.",
    icon: "☀️", zh: "下午",
    collocation: "in the afternoon",
    example: "Let's meet at the school library at three in the afternoon.", exampleZh: "我們下午三點在學校圖書館碰面吧。",
    memoryTip: "after (在後) + noon (正午)"
  },
  {
    id: "fc-el-099", tier: "elem_1000", category: "時間與曆法",
    word: "evening", chunk: "eve - ning", ipa: "/\u02c8i\u02d0v.n\u026a\u014b/", pos: "n.",
    icon: "🌆", zh: "傍晚、晚上",
    collocation: "in the evening",
    example: "Our family watches the news together in the evening.", exampleZh: "我們全家傍晚時一起收看新聞。",
    memoryTip: "eve 發 /iːv/ + ning 發 /nɪŋ/"
  },
  {
    id: "fc-el-100", tier: "elem_1000", category: "時間與曆法",
    word: "night", chunk: "night", ipa: "/na\u026at/", pos: "n.",
    icon: "🌙", zh: "夜晚",
    collocation: "at night",
    example: "The moon and countless stars shine brightly at night.", exampleZh: "月亮和無數星星在夜晚閃閃發光。",
    memoryTip: "igh 發長母音 /aɪ/，gh 不發音"
  },
  {
    id: "fc-el-101", tier: "elem_1000", category: "時間與曆法",
    word: "today", chunk: "to - day", ipa: "/t\u0259\u02c8de\u026a/", pos: "adv. / n.",
    icon: "📅", zh: "今天",
    collocation: "today is Monday",
    example: "Today is the first day of our exciting new semester.", exampleZh: "今天是我們令人興奮的新學期第一天。",
    memoryTip: "to 弱讀 /tə/ + day 發長音 /deɪ/"
  },
  {
    id: "fc-el-102", tier: "elem_1000", category: "時間與曆法",
    word: "yesterday", chunk: "yes - ter - day", ipa: "/\u02c8j\u025bs.t\u025a.de\u026a/", pos: "adv. / n.",
    icon: "⏮️", zh: "昨天 (過去式指標字)",
    collocation: "yesterday afternoon",
    example: "I finished reading that science fiction book yesterday.", exampleZh: "我昨天讀完了那外科幻小說。",
    memoryTip: "yes (/jɛs/) + ter (/tɚ/) + day (/deɪ/)"
  },
  {
    id: "fc-el-103", tier: "elem_1000", category: "時間與曆法",
    word: "tomorrow", chunk: "to - mor - row", ipa: "/t\u0259\u02c8m\u0254\u02d0r.o\u028a/", pos: "adv. / n.",
    icon: "⏭️", zh: "明天 (未來式指標字)",
    collocation: "tomorrow morning",
    example: "We will have our midterm English quiz tomorrow morning.", exampleZh: "我們明天早上將舉行英文期中考測驗。",
    memoryTip: "雙寫 r，to 弱讀 /tə/ + mor + row /oʊ/"
  },
  {
    id: "fc-el-104", tier: "elem_1000", category: "身體與健康",
    word: "head", chunk: "head", ipa: "/h\u025bd/", pos: "n.",
    icon: "🗣️", zh: "頭部",
    collocation: "nod one's head (點頭)",
    example: "She nodded her head to agree with the proposal.", exampleZh: "她點頭表示同意這項提議。",
    memoryTip: "ea 不規則發短母音 /ɛ/"
  },
  {
    id: "fc-el-105", tier: "elem_1000", category: "身體與健康",
    word: "eye", chunk: "eye", ipa: "/a\u026a/", pos: "n.",
    icon: "👀", zh: "眼睛",
    collocation: "close your eyes",
    example: "Close your eyes and take three deep breaths.", exampleZh: "閉上雙眼並做三次深呼吸。",
    memoryTip: "發音同長母音字母 I：/aɪ/"
  },
  {
    id: "fc-el-106", tier: "elem_1000", category: "身體與健康",
    word: "ear", chunk: "ear", ipa: "/\u026ar/", pos: "n.",
    icon: "👂", zh: "耳朵",
    collocation: "hear with ears",
    example: "Rabbits have very long ears to detect faint sounds.", exampleZh: "兔子有很長的耳朵來偵測微弱聲音。",
    memoryTip: "字母組合 ear 發 /ɪr/ (同 hear)"
  },
  {
    id: "fc-el-107", tier: "elem_1000", category: "身體與健康",
    word: "nose", chunk: "nose", ipa: "/no\u028az/", pos: "n.",
    icon: "👃", zh: "鼻子",
    collocation: "touch your nose",
    example: "Elephants use their long nose like a versatile hand.", exampleZh: "大象把長鼻子當作多功能的手來使用。",
    memoryTip: "Magic E 使 o 發長母音 /oʊ/，s 發 /z/"
  },
  {
    id: "fc-el-108", tier: "elem_1000", category: "身體與健康",
    word: "mouth", chunk: "mouth", ipa: "/ma\u028a\u03b8/", pos: "n.",
    icon: "👄", zh: "嘴巴",
    collocation: "open your mouth",
    example: "Open your mouth wide so the dentist can check.", exampleZh: "把嘴巴張大讓牙醫檢查。",
    memoryTip: "ou 發 /aʊ/，th 發清音 /θ/"
  },
  {
    id: "fc-el-109", tier: "elem_1000", category: "身體與健康",
    word: "hand", chunk: "hand", ipa: "/h\u00e6nd/", pos: "n.",
    icon: "✋", zh: "手",
    collocation: "shake hands",
    example: "Raise your right hand if you want to answer.", exampleZh: "如果你想回答請舉起右手。",
    memoryTip: "CVC 結構，a 發短音 /æ/"
  },
  {
    id: "fc-el-110", tier: "elem_1000", category: "身體與健康",
    word: "foot", chunk: "foot", ipa: "/f\u028at/", pos: "n.",
    icon: "🦶", zh: "腳 (單數；複數 feet)",
    collocation: "on foot (步行)",
    example: "He goes to the nearby bookstore on foot every weekend.", exampleZh: "他每週末都步行去附近的書店。",
    memoryTip: "單數 foot (/fʊt/) ➔ 複數 feet (/fiːt/)！"
  },
  {
    id: "fc-el-111", tier: "elem_1000", category: "數字與順序",
    word: "one", chunk: "one", ipa: "/w\u028cn/", pos: "num.",
    icon: "1️⃣", zh: "一、一個",
    collocation: "number one",
    example: "I have only one apple in my bag.", exampleZh: "我的袋子裡只有一顆蘋果。",
    memoryTip: "發音 /wʌn/，同 won (贏)"
  },
  {
    id: "fc-el-112", tier: "elem_1000", category: "數字與順序",
    word: "two", chunk: "two", ipa: "/tu\u02d0/", pos: "num.",
    icon: "2️⃣", zh: "二、兩個",
    collocation: "two students",
    example: "There are two birds singing on the branch.", exampleZh: "有兩隻鳥在樹枝上唱歌。",
    memoryTip: "同音字 to, too"
  },
  {
    id: "fc-el-113", tier: "elem_1000", category: "數字與順序",
    word: "three", chunk: "three", ipa: "/\u03b8ri\u02d0/", pos: "num.",
    icon: "3️⃣", zh: "三、三個",
    collocation: "three books",
    example: "She bought three books at the bookstore.", exampleZh: "她在書店買了三本書。",
    memoryTip: "th 發咬舌音 /θ/"
  },
  {
    id: "fc-el-114", tier: "elem_1000", category: "數字與順序",
    word: "four", chunk: "four", ipa: "/f\u0254\u02d0r/", pos: "num.",
    icon: "4️⃣", zh: "四、四個",
    collocation: "four seasons",
    example: "There are four seasons in a year.", exampleZh: "一年有四個季節。",
    memoryTip: "同音字 for"
  },
  {
    id: "fc-el-115", tier: "elem_1000", category: "數字與順序",
    word: "five", chunk: "five", ipa: "/fa\u026av/", pos: "num.",
    icon: "5️⃣", zh: "五、五個",
    collocation: "five minutes",
    example: "Give me five minutes to get ready.", exampleZh: "給我五分鐘準備一下。",
    memoryTip: "Magic E 使 i 發 /aɪ/"
  },
  {
    id: "fc-el-116", tier: "elem_1000", category: "數字與順序",
    word: "six", chunk: "six", ipa: "/s\u026aks/", pos: "num.",
    icon: "6️⃣", zh: "六、六個",
    collocation: "six o'clock",
    example: "We usually eat dinner at six o'clock.", exampleZh: "我們通常六點吃晚餐。",
    memoryTip: "CVC 短母音 /ɪ/"
  },
  {
    id: "fc-el-117", tier: "elem_1000", category: "數字與順序",
    word: "seven", chunk: "sev - en", ipa: "/\u02c8s\u025bv.\u0259n/", pos: "num.",
    icon: "7️⃣", zh: "七、七個",
    collocation: "seven days",
    example: "There are seven days in a week.", exampleZh: "一週有七天。",
    memoryTip: "sev 短音 /sɛv/ + en 弱讀 /ən/"
  },
  {
    id: "fc-el-118", tier: "elem_1000", category: "數字與順序",
    word: "eight", chunk: "eight", ipa: "/e\u026at/", pos: "num.",
    icon: "8️⃣", zh: "八、八個",
    collocation: "eight years old",
    example: "My younger sister is eight years old.", exampleZh: "我妹妹今年八歲。",
    memoryTip: "eigh 發長音 /eɪ/，同 ate"
  },
  {
    id: "fc-el-119", tier: "elem_1000", category: "數字與順序",
    word: "nine", chunk: "nine", ipa: "/na\u026an/", pos: "num.",
    icon: "9️⃣", zh: "九、九個",
    collocation: "nine books",
    example: "He has nine comic books on the shelf.", exampleZh: "他書架上有九本漫畫書。",
    memoryTip: "Magic E 使 i 發 /aɪ/"
  },
  {
    id: "fc-el-120", tier: "elem_1000", category: "數字與順序",
    word: "ten", chunk: "ten", ipa: "/t\u025bn/", pos: "num.",
    icon: "🔟", zh: "十、十個",
    collocation: "ten dollars",
    example: "The pen costs only ten dollars.", exampleZh: "這枝筆只要十元。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-121", tier: "elem_1000", category: "數字與順序",
    word: "hundred", chunk: "hun - dred", ipa: "/\u02c8h\u028cn.dr\u0259d/", pos: "num.",
    icon: "🔴", zh: "百、一百",
    collocation: "one hundred",
    example: "There are one hundred cents in a dollar.", exampleZh: "一美元等於一百美分。",
    memoryTip: "hun /hʌn/ + dred /drəd/"
  },
  {
    id: "fc-el-122", tier: "elem_1000", category: "數字與順序",
    word: "thousand", chunk: "thou - sand", ipa: "/\u02c8\u03b8a\u028a.z\u0259nd/", pos: "num.",
    icon: "🎒", zh: "千、一千",
    collocation: "one thousand",
    example: "Over one thousand students attend this school.", exampleZh: "超過一千名學生在這所學校就讀。",
    memoryTip: "thou /θaʊ/ + sand /zənd/"
  },
  {
    id: "fc-el-123", tier: "elem_1000", category: "數字與順序",
    word: "first", chunk: "first", ipa: "/f\u025d\u02d0st/", pos: "adj. / adv.",
    icon: "🎒", zh: "第一的、首先",
    collocation: "first prize",
    example: "She won the first prize in the singing contest.", exampleZh: "她在歌唱比賽中獲得第一名。",
    memoryTip: "ir 發捲舌長音 /ɝː/"
  },
  {
    id: "fc-el-124", tier: "elem_1000", category: "數字與順序",
    word: "second", chunk: "sec - ond", ipa: "/\u02c8s\u025bk.\u0259nd/", pos: "adj. / n.",
    icon: "🎒", zh: "第二的；秒鐘",
    collocation: "second floor",
    example: "Our classroom is on the second floor.", exampleZh: "我們的教室在二樓。",
    memoryTip: "sec /sɛk/ + ond /ənd/"
  },
  {
    id: "fc-el-125", tier: "elem_1000", category: "數字與順序",
    word: "third", chunk: "third", ipa: "/\u03b8\u025d\u02d0d/", pos: "adj.",
    icon: "🎒", zh: "第三的",
    collocation: "third place",
    example: "He finished in third place in the race.", exampleZh: "他在比賽中獲得第三名。",
    memoryTip: "th /θ/ + ir /ɝː/ + d"
  },
  {
    id: "fc-el-126", tier: "elem_1000", category: "顏色與外觀",
    word: "red", chunk: "red", ipa: "/r\u025bd/", pos: "adj. / n.",
    icon: "🔴", zh: "紅色的；紅色",
    collocation: "red apple",
    example: "The red roses in the garden are blooming.", exampleZh: "花園裡的紅玫瑰正在盛開。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-127", tier: "elem_1000", category: "顏色與外觀",
    word: "blue", chunk: "blue", ipa: "/blu\u02d0/", pos: "adj. / n.",
    icon: "🔵", zh: "藍色的；藍色",
    collocation: "blue sky",
    example: "The blue sky has no clouds today.", exampleZh: "今天藍藍的天空萬里無雲。",
    memoryTip: "ue 發長音 /uː/"
  },
  {
    id: "fc-el-128", tier: "elem_1000", category: "顏色與外觀",
    word: "yellow", chunk: "yel - low", ipa: "/\u02c8j\u025bl.o\u028a/", pos: "adj. / n.",
    icon: "🟡", zh: "黃色的；黃色",
    collocation: "yellow banana",
    example: "The yellow school bus picked up the kids.", exampleZh: "黃色校車接走了孩子們。",
    memoryTip: "yel /jɛl/ + low /oʊ/"
  },
  {
    id: "fc-el-129", tier: "elem_1000", category: "顏色與外觀",
    word: "green", chunk: "green", ipa: "/\u0261ri\u02d0n/", pos: "adj. / n.",
    icon: "🟢", zh: "綠色的；綠色",
    collocation: "green leaves",
    example: "The trees have fresh green leaves in spring.", exampleZh: "春天時樹木長出鮮綠的嫩葉。",
    memoryTip: "ee 發長音 /iː/"
  },
  {
    id: "fc-el-130", tier: "elem_1000", category: "顏色與外觀",
    word: "white", chunk: "white", ipa: "/wa\u026at/", pos: "adj. / n.",
    icon: "⚪", zh: "白色的；白色",
    collocation: "white snow",
    example: "A blanket of white snow covered the fields.", exampleZh: "一片白雪覆蓋了田野。",
    memoryTip: "wh 發 /w/，Magic E 使 i 發 /aɪ/"
  },
  {
    id: "fc-el-131", tier: "elem_1000", category: "顏色與外觀",
    word: "black", chunk: "black", ipa: "/bl\u00e6k/", pos: "adj. / n.",
    icon: "⚫", zh: "黑色的；黑色",
    collocation: "black coffee",
    example: "He wears a stylish black jacket.", exampleZh: "他穿著一件有型的黑色夾克。",
    memoryTip: "ck 發 /k/，a 短音 /æ/"
  },
  {
    id: "fc-el-132", tier: "elem_1000", category: "顏色與外觀",
    word: "pink", chunk: "pink", ipa: "/p\u026a\u014bk/", pos: "adj. / n.",
    icon: "🌸", zh: "粉紅色的；粉紅色",
    collocation: "pink dress",
    example: "The little girl wore a lovely pink dress.", exampleZh: "小女孩穿著一件可愛的粉紅色洋裝。",
    memoryTip: "ink 發 /ɪŋk/"
  },
  {
    id: "fc-el-133", tier: "elem_1000", category: "顏色與外觀",
    word: "purple", chunk: "pur - ple", ipa: "/\u02c8p\u025d\u02d0.p\u0259l/", pos: "adj. / n.",
    icon: "🟣", zh: "紫色的；紫色",
    collocation: "purple grapes",
    example: "Ripe purple grapes are sweet and juicy.", exampleZh: "成熟的紫葡萄香甜多汁。",
    memoryTip: "ur 發 /ɝː/ + ple /pəl/"
  },
  {
    id: "fc-el-134", tier: "elem_1000", category: "顏色與外觀",
    word: "brown", chunk: "brown", ipa: "/bra\u028an/", pos: "adj. / n.",
    icon: "🟤", zh: "棕色的；棕色",
    collocation: "brown bear",
    example: "The brown dog barked at the stranger.", exampleZh: "棕色的狗對著陌生人狂吠。",
    memoryTip: "ow 發 /aʊ/"
  },
  {
    id: "fc-el-135", tier: "elem_1000", category: "動物與生態",
    word: "horse", chunk: "horse", ipa: "/h\u0254\u02d0rs/", pos: "n.",
    icon: "🐴", zh: "馬",
    collocation: "ride a horse",
    example: "He learned how to ride a horse on the ranch.", exampleZh: "他在農場學會了如何騎馬。",
    memoryTip: "or 發長音 /ɔːr/"
  },
  {
    id: "fc-el-136", tier: "elem_1000", category: "動物與生態",
    word: "pig", chunk: "pig", ipa: "/p\u026a\u0261/", pos: "n.",
    icon: "🐷", zh: "豬",
    collocation: "little pig",
    example: "The three little pigs built different houses.", exampleZh: "三隻小豬蓋了不同的房子。",
    memoryTip: "CVC 短母音 /ɪ/"
  },
  {
    id: "fc-el-137", tier: "elem_1000", category: "動物與生態",
    word: "cow", chunk: "cow", ipa: "/ka\u028a/", pos: "n.",
    icon: "🐮", zh: "乳牛、母牛",
    collocation: "dairy cow",
    example: "Cows give us fresh and nutritious milk.", exampleZh: "乳牛提供我們新鮮有營養的牛奶。",
    memoryTip: "ow 發 /aʊ/"
  },
  {
    id: "fc-el-138", tier: "elem_1000", category: "動物與生態",
    word: "sheep", chunk: "sheep", ipa: "/\u0283i\u02d0p/", pos: "n.",
    icon: "🐑", zh: "綿羊 (單複數同形)",
    collocation: "flock of sheep",
    example: "The white sheep are grazing on the green hill.", exampleZh: "白色的綿羊正在綠色山丘上吃草。",
    memoryTip: "注意：sheep 單複數同形！"
  },
  {
    id: "fc-el-139", tier: "elem_1000", category: "動物與生態",
    word: "duck", chunk: "duck", ipa: "/d\u028ck/", pos: "n.",
    icon: "🦆", zh: "鴨子",
    collocation: "swimming duck",
    example: "Yellow ducks are swimming happily in the pond.", exampleZh: "黃色鴨子在池塘裡高興地游泳。",
    memoryTip: "ck 發 /k/，u 短音 /ʌ/"
  },
  {
    id: "fc-el-140", tier: "elem_1000", category: "動物與生態",
    word: "chicken", chunk: "chick - en", ipa: "/\u02c8t\u0283\u026ak.\u026an/", pos: "n.",
    icon: "🐔", zh: "雞、雞肉",
    collocation: "fried chicken",
    example: "We had fried chicken and salad for lunch.", exampleZh: "我們午餐吃了炸雞和沙拉。",
    memoryTip: "chick /tʃɪk/ + en /ɪn/"
  },
  {
    id: "fc-el-141", tier: "elem_1000", category: "動物與生態",
    word: "mouse", chunk: "mouse", ipa: "/ma\u028as/", pos: "n.",
    icon: "🐭", zh: "老鼠 (複數 mice)",
    collocation: "little mouse",
    example: "The mouse ran quickly into the hole.", exampleZh: "老鼠迅速地跑進洞穴裡。",
    memoryTip: "複數不規則：mouse ➔ mice！"
  },
  {
    id: "fc-el-142", tier: "elem_1000", category: "動物與生態",
    word: "frog", chunk: "frog", ipa: "/fr\u0251\u02d0\u0261/", pos: "n.",
    icon: "🐸", zh: "青蛙",
    collocation: "green frog",
    example: "The green frog jumped into the cool water.", exampleZh: "綠色青蛙跳進了涼爽的水中。",
    memoryTip: "fr + og /ɑːɡ/"
  },
  {
    id: "fc-el-143", tier: "elem_1000", category: "動物與生態",
    word: "turtle", chunk: "tur - tle", ipa: "/\u02c8t\u025d\u02d0.t\u032c\u0259l/", pos: "n.",
    icon: "🎒", zh: "烏龜",
    collocation: "sea turtle (海龜)",
    example: "Sea turtles lay their eggs on sandy beaches.", exampleZh: "海龜在沙灘上下蛋。",
    memoryTip: "ur 發 /ɝː/ + tle /t̬əl/"
  },
  {
    id: "fc-el-144", tier: "elem_1000", category: "動物與生態",
    word: "snake", chunk: "snake", ipa: "/sne\u026ak/", pos: "n.",
    icon: "🐍", zh: "蛇",
    collocation: "long snake",
    example: "Be careful; there might be snakes in the bush.", exampleZh: "小心點，灌木叢中可能會有蛇。",
    memoryTip: "Magic E 使 a 發 /eɪ/"
  },
  {
    id: "fc-el-145", tier: "elem_1000", category: "動物與生態",
    word: "bee", chunk: "bee", ipa: "/bi\u02d0/", pos: "n.",
    icon: "🐝", zh: "蜜蜂",
    collocation: "busy bee",
    example: "Bees collect nectar from colorful flowers.", exampleZh: "蜜蜂從鮮豔的花朵中採集花蜜。",
    memoryTip: "ee 發長音 /iː/"
  },
  {
    id: "fc-el-146", tier: "elem_1000", category: "動物與生態",
    word: "butterfly", chunk: "but - ter - fly", ipa: "/\u02c8b\u028ct.\u025a.fla\u026a/", pos: "n.",
    icon: "✈️", zh: "蝴蝶",
    collocation: "beautiful butterfly",
    example: "A colorful butterfly landed gently on the rose.", exampleZh: "一隻五彩斑斕的蝴蝶輕輕停在玫瑰上。",
    memoryTip: "butter (奶油) + fly (飛舞)"
  },
  {
    id: "fc-el-147", tier: "elem_1000", category: "飲食與餐點",
    word: "egg", chunk: "egg", ipa: "/\u025b\u0261/", pos: "n.",
    icon: "🥚", zh: "雞蛋、蛋",
    collocation: "boiled egg",
    example: "Eating an egg every day provides good protein.", exampleZh: "每天吃一顆蛋能提供優質蛋白質。",
    memoryTip: "雙寫 g，e 短音 /ɛ/"
  },
  {
    id: "fc-el-148", tier: "elem_1000", category: "飲食與餐點",
    word: "soup", chunk: "soup", ipa: "/su\u02d0p/", pos: "n.",
    icon: "🍲", zh: "湯 (不可數)",
    collocation: "hot soup",
    example: "Mom made a pot of hot chicken soup for us.", exampleZh: "媽媽為我們煮了一鍋熱雞湯。",
    memoryTip: "ou 發長音 /uː/"
  },
  {
    id: "fc-el-149", tier: "elem_1000", category: "飲食與餐點",
    word: "salad", chunk: "sal - ad", ipa: "/\u02c8s\u00e6l.\u0259d/", pos: "n.",
    icon: "🥗", zh: "沙拉",
    collocation: "fruit salad",
    example: "She ordered a fresh vegetable salad with dressing.", exampleZh: "她點了一份淋上醬汁的新鮮蔬菜沙拉。",
    memoryTip: "sal /sæl/ + ad 弱讀 /əd/"
  },
  {
    id: "fc-el-150", tier: "elem_1000", category: "飲食與餐點",
    word: "potato", chunk: "po - ta - to", ipa: "/p\u0259\u02c8te\u026a.t\u032co\u028a/", pos: "n.",
    icon: "🎒", zh: "馬鈴薯、土豆",
    collocation: "mashed potatoes",
    example: "Baked potatoes are delicious with a little butter.", exampleZh: "烤馬鈴薯加上一點奶油非常美味。",
    memoryTip: "po /pə/ + ta /teɪ/ + to /toʊ/"
  },
  {
    id: "fc-el-151", tier: "elem_1000", category: "飲食與餐點",
    word: "tomato", chunk: "to - ma - to", ipa: "/t\u0259\u02c8me\u026a.t\u032co\u028a/", pos: "n.",
    icon: "🎒", zh: "番茄",
    collocation: "red tomato",
    example: "Fresh red tomatoes are great for making pasta sauce.", exampleZh: "新鮮紅番茄非常適合拿來做義大利麵醬汁。",
    memoryTip: "to /tə/ + ma /meɪ/ + to /toʊ/"
  },
  {
    id: "fc-el-152", tier: "elem_1000", category: "飲食與餐點",
    word: "cake", chunk: "cake", ipa: "/ke\u026ak/", pos: "n.",
    icon: "🍰", zh: "蛋糕",
    collocation: "birthday cake",
    example: "We blew out the candles on the birthday cake.", exampleZh: "我們吹熄了生日蛋糕上的蠟燭。",
    memoryTip: "Magic E 使 a 發長音 /eɪ/"
  },
  {
    id: "fc-el-153", tier: "elem_1000", category: "飲食與餐點",
    word: "cookie", chunk: "cook - ie", ipa: "/\u02c8k\u028ak.i/", pos: "n.",
    icon: "🍪", zh: "餅乾、曲奇",
    collocation: "chocolate cookie",
    example: "Grandma baked warm chocolate chip cookies for us.", exampleZh: "奶奶為我們烤了熱騰騰的巧克力餅乾。",
    memoryTip: "cook /kʊk/ + ie /i/"
  },
  {
    id: "fc-el-154", tier: "elem_1000", category: "飲食與餐點",
    word: "ice cream", chunk: "ice cream", ipa: "/\u02cca\u026as \u02c8kri\u02d0m/", pos: "n.",
    icon: "🍦", zh: "冰淇淋",
    collocation: "vanilla ice cream",
    example: "Eating cold ice cream on a hot summer day is wonderful.", exampleZh: "在炎熱夏天吃冰涼的冰淇淋真是太棒了。",
    memoryTip: "ice (冰) + cream (奶油)"
  },
  {
    id: "fc-el-155", tier: "elem_1000", category: "飲食與餐點",
    word: "pizza", chunk: "piz - za", ipa: "/\u02c8pi\u02d0t.s\u0259/", pos: "n.",
    icon: "🍕", zh: "披薩",
    collocation: "cheese pizza",
    example: "We shared a large cheese pizza with our classmates.", exampleZh: "我們和同班同學分享了一個大起司披薩。",
    memoryTip: "zz 發 /ts/，源自義大利語"
  },
  {
    id: "fc-el-156", tier: "elem_1000", category: "衣物與穿戴",
    word: "shirt", chunk: "shirt", ipa: "/\u0283\u025d\u02d0t/", pos: "n.",
    icon: "👕", zh: "襯衫",
    collocation: "white shirt",
    example: "Dad wears a clean white shirt to work every day.", exampleZh: "爸爸每天穿著乾淨的白襯衫上班。",
    memoryTip: "ir 發捲舌長音 /ɝː/"
  },
  {
    id: "fc-el-157", tier: "elem_1000", category: "衣物與穿戴",
    word: "pants", chunk: "pants", ipa: "/p\u00e6nts/", pos: "n.",
    icon: "👖", zh: "長褲 (恆為複數)",
    collocation: "a pair of pants",
    example: "He bought a new pair of black pants for the concert.", exampleZh: "他為音樂會買了一條新的黑長褲。",
    memoryTip: "兩隻褲管，恆用複數！"
  },
  {
    id: "fc-el-158", tier: "elem_1000", category: "衣物與穿戴",
    word: "dress", chunk: "dress", ipa: "/dr\u025bs/", pos: "n. / v.",
    icon: "👗", zh: "洋裝、連衣裙；穿衣",
    collocation: "wear a dress",
    example: "She wore a lovely blue dress to the party.", exampleZh: "她穿著一件優雅的藍色洋裝去參加宴會。",
    memoryTip: "雙寫 s，dr + ess /ɛs/"
  },
  {
    id: "fc-el-159", tier: "elem_1000", category: "衣物與穿戴",
    word: "coat", chunk: "coat", ipa: "/ko\u028at/", pos: "n.",
    icon: "🧥", zh: "大衣、外套",
    collocation: "warm coat",
    example: "Put on your warm coat because it is freezing outside.", exampleZh: "穿上你的暖大衣，因為外面很寒冷。",
    memoryTip: "oa 字母組合發長音 /oʊ/"
  },
  {
    id: "fc-el-160", tier: "elem_1000", category: "衣物與穿戴",
    word: "jacket", chunk: "jack - et", ipa: "/\u02c8d\u0292\u00e6k.\u026at/", pos: "n.",
    icon: "🧥", zh: "夾克、短外套",
    collocation: "leather jacket",
    example: "He zipped up his warm jacket before going outdoors.", exampleZh: "出門前他拉上了保暖夾克的拉鍊。",
    memoryTip: "jack /dʒæk/ + et /ɪt/"
  },
  {
    id: "fc-el-161", tier: "elem_1000", category: "衣物與穿戴",
    word: "shoes", chunk: "shoes", ipa: "/\u0283u\u02d0z/", pos: "n.",
    icon: "👟", zh: "鞋子 (恆常用複數)",
    collocation: "put on shoes",
    example: "Take off your muddy shoes before entering the house.", exampleZh: "進屋前請脫掉沾滿泥巴的鞋子。",
    memoryTip: "oe 發長音 /uː/，s 發 /z/"
  },
  {
    id: "fc-el-162", tier: "elem_1000", category: "衣物與穿戴",
    word: "hat", chunk: "hat", ipa: "/h\u00e6t/", pos: "n.",
    icon: "🧢", zh: "帽子 (有邊緣的帽)",
    collocation: "wear a hat",
    example: "She wore a straw hat to protect her face from the sun.", exampleZh: "她戴了一頂草帽來遮陽。",
    memoryTip: "CVC 短母音 /æ/"
  },
  {
    id: "fc-el-163", tier: "elem_1000", category: "居家與生活",
    word: "home", chunk: "home", ipa: "/ho\u028am/", pos: "n. / adv.",
    icon: "🏡", zh: "家、家庭",
    collocation: "go home (回家)",
    example: "After school, the students were eager to go home.", exampleZh: "放學後學生們迫不及待地想回家。",
    memoryTip: "Magic E 使 o 發長音 /oʊ/"
  },
  {
    id: "fc-el-164", tier: "elem_1000", category: "居家與生活",
    word: "house", chunk: "house", ipa: "/ha\u028as/", pos: "n.",
    icon: "🏠", zh: "房子、房屋",
    collocation: "big house",
    example: "They live in a beautiful house with a green garden.", exampleZh: "他們住在一棟帶有綠色花園的美麗房子裡。",
    memoryTip: "ou 發 /aʊ/，s 發清音 /s/"
  },
  {
    id: "fc-el-165", tier: "elem_1000", category: "居家與生活",
    word: "room", chunk: "room", ipa: "/ru\u02d0m/", pos: "n.",
    icon: "🚪", zh: "房間",
    collocation: "clean room",
    example: "Keep your study room neat and well organized.", exampleZh: "保持你的書房整齊又有條理。",
    memoryTip: "oo 發長音 /uː/"
  },
  {
    id: "fc-el-166", tier: "elem_1000", category: "居家與生活",
    word: "door", chunk: "door", ipa: "/d\u0254\u02d0r/", pos: "n.",
    icon: "🚪", zh: "門",
    collocation: "open the door",
    example: "Please close the door quietly so as not to wake the baby.", exampleZh: "請輕輕關上門以免吵醒小寶寶。",
    memoryTip: "oor 發長音 /ɔːr/"
  },
  {
    id: "fc-el-167", tier: "elem_1000", category: "居家與生活",
    word: "window", chunk: "win - dow", ipa: "/\u02c8w\u026an.do\u028a/", pos: "n.",
    icon: "🪟", zh: "窗戶",
    collocation: "look out the window",
    example: "Open the window to let fresh morning air in.", exampleZh: "打開窗戶讓早晨的新鮮空氣進來。",
    memoryTip: "win /wɪn/ + dow /doʊ/"
  },
  {
    id: "fc-el-168", tier: "elem_1000", category: "居家與生活",
    word: "table", chunk: "ta - ble", ipa: "/\u02c8te\u026a.b\u0259l/", pos: "n.",
    icon: "🥦", zh: "桌子、餐桌",
    collocation: "set the table (擺餐具)",
    example: "Help Mom set the table before dinner starts.", exampleZh: "在晚餐開始前幫媽媽擺好餐具。",
    memoryTip: "ta /teɪ/ + ble /bəl/"
  },
  {
    id: "fc-el-169", tier: "elem_1000", category: "居家與生活",
    word: "bed", chunk: "bed", ipa: "/b\u025bd/", pos: "n.",
    icon: "🛏️", zh: "床",
    collocation: "go to bed (就寢)",
    example: "Children should go to bed early and get up early.", exampleZh: "小孩子應該早睡早起。",
    memoryTip: "CVC 短母音 /ɛ/"
  },
  {
    id: "fc-el-170", tier: "elem_1000", category: "地方與交通",
    word: "city", chunk: "cit - y", ipa: "/\u02c8s\u026at.i/", pos: "n.",
    icon: "🏙️", zh: "城市",
    collocation: "big city",
    example: "Taipei is a bustling and convenient modern city.", exampleZh: "台北是一座繁華且便利的現代城市。",
    memoryTip: "c 在 i 前發軟音 /s/"
  },
  {
    id: "fc-el-171", tier: "elem_1000", category: "地方與交通",
    word: "park", chunk: "park", ipa: "/p\u0251\u02d0rk/", pos: "n. / v.",
    icon: "🏞️", zh: "公園；停車",
    collocation: "walk in the park",
    example: "Families like to picnic in the central park on Sundays.", exampleZh: "家庭喜歡在週日去中央公園野餐。",
    memoryTip: "ar 發捲舌長音 /ɑːrk/"
  },
  {
    id: "fc-el-172", tier: "elem_1000", category: "地方與交通",
    word: "hospital", chunk: "hos - pi - tal", ipa: "/\u02c8h\u0251\u02d0.sp\u026a.t\u032c\u0259l/", pos: "n.",
    icon: "🏥", zh: "醫院",
    collocation: "go to the hospital",
    example: "The ambulance rushed the injured patient to the hospital.", exampleZh: "救護車將受傷的病患迅速送往醫院。",
    memoryTip: "hos /hɑːs/ + pi /pɪ/ + tal /t̬əl/"
  },
  {
    id: "fc-el-173", tier: "elem_1000", category: "地方與交通",
    word: "store", chunk: "store", ipa: "/st\u0254\u02d0r/", pos: "n.",
    icon: "🏪", zh: "商店、店家",
    collocation: "convenience store",
    example: "You can buy snacks at the 24-hour convenience store.", exampleZh: "你可以在二十四小時便利商店買點心。",
    memoryTip: "ore 發長音 /ɔːr/"
  },
  {
    id: "fc-el-174", tier: "elem_1000", category: "地方與交通",
    word: "bus", chunk: "bus", ipa: "/b\u028cs/", pos: "n.",
    icon: "🚌", zh: "公車、巴士",
    collocation: "take a bus",
    example: "Taking a bus is an eco-friendly way to travel around.", exampleZh: "搭乘公車是環遊市區的環保方式。",
    memoryTip: "CVC 短母音 /ʌ/"
  },
  {
    id: "fc-el-175", tier: "elem_1000", category: "地方與交通",
    word: "train", chunk: "train", ipa: "/tre\u026an/", pos: "n.",
    icon: "🚆", zh: "火車",
    collocation: "take a train",
    example: "The train arrived at the station right on schedule.", exampleZh: "火車非常準時地抵達了車站。",
    memoryTip: "ai 字母組合發長音 /eɪ/"
  },
  {
    id: "fc-el-176", tier: "elem_1000", category: "地方與交通",
    word: "car", chunk: "car", ipa: "/k\u0251\u02d0r/", pos: "n.",
    icon: "🚗", zh: "汽車、轎車",
    collocation: "drive a car",
    example: "Dad bought a fuel-efficient electric car last month.", exampleZh: "爸爸上個月買了一輛節能的電動汽車。",
    memoryTip: "ar 發捲舌長音 /ɑːr/"
  },
  {
    id: "fc-el-177", tier: "elem_1000", category: "自然與地理",
    word: "beach", chunk: "beach", ipa: "/bi\u02d0t\u0283/", pos: "n.",
    icon: "🏖️", zh: "海灘、沙灘",
    collocation: "walk along the beach",
    example: "We collected colorful seashells on the sandy beach.", exampleZh: "我們在沙灘上收集五顏六色的貝殼。",
    memoryTip: "ea 發長母音 /iː/，ch 發 /tʃ/"
  },
  {
    id: "fc-el-178", tier: "elem_1000", category: "自然與地理",
    word: "mountain", chunk: "moun - tain", ipa: "/\u02c8ma\u028an.t\u0259n/", pos: "n.",
    icon: "⛰️", zh: "高山、山脈",
    collocation: "climb a mountain",
    example: "Jade Mountain is the highest peak in Taiwan.", exampleZh: "玉山是台灣最高峰。",
    memoryTip: "moun /maʊn/ + tain 弱讀 /tən/"
  },
  {
    id: "fc-el-179", tier: "elem_1000", category: "自然與地理",
    word: "river", chunk: "riv - er", ipa: "/\u02c8r\u026av.\u025a/", pos: "n.",
    icon: "🏞️", zh: "河流",
    collocation: "across the river",
    example: "A long concrete bridge stretches across the river.", exampleZh: "一座長長的混凝土橋跨越了這條河。",
    memoryTip: "riv 短音 /rɪv/ + er /ɚ/"
  },
  {
    id: "fc-el-180", tier: "elem_1000", category: "自然與地理",
    word: "lake", chunk: "lake", ipa: "/le\u026ak/", pos: "n.",
    icon: "🛶", zh: "湖泊",
    collocation: "calm lake",
    example: "Sun Moon Lake attracts tourists from all over the world.", exampleZh: "日月潭吸引了來自世界各地的遊客。",
    memoryTip: "Magic E 使 a 發長音 /eɪ/"
  },
  {
    id: "fc-el-181", tier: "elem_1000", category: "自然與地理",
    word: "sea", chunk: "sea", ipa: "/si\u02d0/", pos: "n.",
    icon: "🌊", zh: "大海、海洋",
    collocation: "by the sea",
    example: "They spent a relaxing summer holiday by the sea.", exampleZh: "他們在海邊度過了一個放鬆的暑假。",
    memoryTip: "ea 發長母音 /iː/，同 see"
  },
  {
    id: "fc-el-182", tier: "elem_1000", category: "自然與地理",
    word: "ocean", chunk: "o - cean", ipa: "/\u02c8o\u028a.\u0283\u0259n/", pos: "n.",
    icon: "🌊", zh: "大洋、汪洋",
    collocation: "Pacific Ocean",
    example: "The Pacific Ocean is the largest ocean on Earth.", exampleZh: "太平洋是地球上最大的海洋。",
    memoryTip: "o 開音節 /oʊ/ + cean 發 /ʃən/"
  },
  {
    id: "fc-el-183", tier: "elem_1000", category: "自然與地理",
    word: "tree", chunk: "tree", ipa: "/tri\u02d0/", pos: "n.",
    icon: "🌲", zh: "樹木",
    collocation: "climb a tree",
    example: "Big trees provide cool shade during the summer.", exampleZh: "大樹在夏天提供涼爽的樹蔭。",
    memoryTip: "ee 發長母音 /iː/"
  },
  {
    id: "fc-el-184", tier: "elem_1000", category: "自然與地理",
    word: "flower", chunk: "flow - er", ipa: "/\u02c8fla\u028a.\u025a/", pos: "n.",
    icon: "🌸", zh: "花朵",
    collocation: "fresh flowers",
    example: "Spring is a wonderful season when sweet flowers bloom.", exampleZh: "春天是芬芳花朵盛開的美好季節。",
    memoryTip: "flow /flaʊ/ + er /ɚ/"
  },
  {
    id: "fc-el-185", tier: "elem_1000", category: "自然與地理",
    word: "grass", chunk: "grass", ipa: "/\u0261r\u00e6s/", pos: "n.",
    icon: "🌱", zh: "草地、青草 (不可數)",
    collocation: "green grass",
    example: "Please do not step on the fresh green grass.", exampleZh: "請勿踐踏鮮綠的草坪。",
    memoryTip: "雙寫 s，a 發短音 /æ/"
  },
  {
    id: "fc-el-186", tier: "elem_1000", category: "自然與地理",
    word: "garden", chunk: "gar - den", ipa: "/\u02c8\u0261\u0251\u02d0r.d\u0259n/", pos: "n.",
    icon: "🏡", zh: "花園、花壇",
    collocation: "beautiful garden",
    example: "Grandpa grows colorful roses in his front garden.", exampleZh: "爺爺在他前院的花園裡種植繽紛的玫瑰。",
    memoryTip: "gar /ɡɑːr/ + den /dən/"
  },
  {
    id: "fc-el-187", tier: "elem_1000", category: "自然與地理",
    word: "sky", chunk: "sky", ipa: "/ska\u026a/", pos: "n.",
    icon: "🌤️", zh: "天空",
    collocation: "blue sky",
    example: "A colorful rainbow appeared across the bright blue sky.", exampleZh: "一道七彩彩虹出現在湛藍的天空中。",
    memoryTip: "單音節結尾 y 發長雙母音 /aɪ/"
  },
  {
    id: "fc-el-188", tier: "elem_1000", category: "自然與地理",
    word: "sun", chunk: "sun", ipa: "/s\u028cn/", pos: "n.",
    icon: "☀️", zh: "太陽 (單數常加 the)",
    collocation: "the sun shines",
    example: "The sun gives us light and warmth every single day.", exampleZh: "太陽每天都給予我們光和熱。",
    memoryTip: "CVC 結構，u 短母音 /ʌ/"
  },
  {
    id: "fc-el-189", tier: "elem_1000", category: "自然與地理",
    word: "moon", chunk: "moon", ipa: "/mu\u02d0n/", pos: "n.",
    icon: "🌙", zh: "月亮 (單數常加 the)",
    collocation: "full moon",
    example: "Families gather to admire the full moon on Mid-Autumn Festival.", exampleZh: "中秋節時闔家團圓一同賞滿月。",
    memoryTip: "oo 發長母音 /uː/"
  },
  {
    id: "fc-el-190", tier: "elem_1000", category: "自然與地理",
    word: "star", chunk: "star", ipa: "/st\u0251\u02d0r/", pos: "n.",
    icon: "⭐", zh: "星星、恆星",
    collocation: "shining star",
    example: "You can see millions of stars in the countryside sky.", exampleZh: "在鄉村的夜空中你能看見千萬顆星星。",
    memoryTip: "ar 發捲舌長音 /ɑːr/"
  },
  {
    id: "fc-el-191", tier: "elem_1000", category: "自然與地理",
    word: "rainbow", chunk: "rain - bow", ipa: "/\u02c8re\u026an.bo\u028a/", pos: "n.",
    icon: "🌈", zh: "彩虹",
    collocation: "see a rainbow",
    example: "A brilliant rainbow appeared after the sudden shower.", exampleZh: "陣雨過後出現了一道絢爛的彩虹。",
    memoryTip: "rain (雨) + bow (弓形)"
  },
  {
    id: "fc-el-192", tier: "elem_1000", category: "居家與生活",
    word: "clock", chunk: "clock", ipa: "/kl\u0251\u02d0k/", pos: "n.",
    icon: "⏰", zh: "時鐘、座鐘",
    collocation: "alarm clock",
    example: "The alarm clock rings loudly at six thirty.", exampleZh: "鬧鐘在六點半大聲響起。",
    memoryTip: "ck 發 /k/，o 短音 /ɑː/"
  },
  {
    id: "fc-el-193", tier: "elem_1000", category: "居家與生活",
    word: "lamp", chunk: "lamp", ipa: "/l\u00e6mp/", pos: "n.",
    icon: "💡", zh: "檯燈、燈具",
    collocation: "desk lamp",
    example: "Turn on the desk lamp when you read in the evening.", exampleZh: "晚上讀書時請打開檯燈。",
    memoryTip: "CVC 結構，a 短音 /æ/"
  },
  {
    id: "fc-el-194", tier: "elem_1000", category: "居家與生活",
    word: "sofa", chunk: "so - fa", ipa: "/\u02c8so\u028a.f\u0259/", pos: "n.",
    icon: "🛋️", zh: "沙發",
    collocation: "sit on the sofa",
    example: "Dad likes to relax on the comfortable sofa after work.", exampleZh: "爸爸下班後喜歡在舒適的沙發上放鬆。",
    memoryTip: "so /soʊ/ + fa /fə/"
  },
  {
    id: "fc-el-195", tier: "elem_1000", category: "居家與生活",
    word: "computer", chunk: "com - pu - ter", ipa: "/k\u0259m\u02c8pju\u02d0.t\u032c\u025a/", pos: "n.",
    icon: "💻", zh: "電腦",
    collocation: "personal computer",
    example: "Students use the computer to look up research data.", exampleZh: "學生們使用電腦查詢研究資料。",
    memoryTip: "com /kəm/ + pu /pjuː/ + ter /t̬ɚ/"
  },
  {
    id: "fc-el-196", tier: "elem_1000", category: "居家與生活",
    word: "box", chunk: "box", ipa: "/b\u0251\u02d0ks/", pos: "n.",
    icon: "📦", zh: "盒子、箱子 (複數 boxes)",
    collocation: "gift box",
    example: "She opened the mysterious box with great excitement.", exampleZh: "她懷著無比興奮的心情打開神秘盒子。",
    memoryTip: "CVC 結構，複數加 -es /ˈbɑːk.sɪz/"
  },
  {
    id: "fc-el-197", tier: "elem_1000", category: "居家與生活",
    word: "bag", chunk: "bag", ipa: "/b\u00e6\u0261/", pos: "n.",
    icon: "🎒", zh: "提袋、包包",
    collocation: "plastic bag",
    example: "Bring your own reusable cloth bag when shopping.", exampleZh: "購物時請自備可重複使用的布袋。",
    memoryTip: "CVC 短母音 /æ/"
  },
  {
    id: "fc-el-198", tier: "elem_1000", category: "居家與生活",
    word: "cup", chunk: "cup", ipa: "/k\u028cp/", pos: "n.",
    icon: "☕", zh: "杯子 (有手把的杯)",
    collocation: "a cup of tea",
    example: "Would you like a cup of hot green tea?", exampleZh: "你想來一杯熱綠茶嗎？",
    memoryTip: "CVC 短母音 /ʌ/"
  },
  {
    id: "fc-el-199", tier: "elem_1000", category: "居家與生活",
    word: "glass", chunk: "glass", ipa: "/\u0261l\u00e6s/", pos: "n.",
    icon: "🥛", zh: "玻璃杯；玻璃 (不可數)",
    collocation: "a glass of water",
    example: "He drank a large glass of cold water after jogging.", exampleZh: "他慢跑後喝了一大杯冰水。",
    memoryTip: "雙寫 s，a 短音 /æ/"
  },
  {
    id: "fc-el-200", tier: "elem_1000", category: "居家與生活",
    word: "bottle", chunk: "bot - tle", ipa: "/\u02c8b\u0251\u02d0.t\u032c\u0259l/", pos: "n.",
    icon: "🍾", zh: "瓶子、水壺",
    collocation: "water bottle",
    example: "Remember to bring your water bottle to sports class.", exampleZh: "上體育課時記得帶上你的水壺。",
    memoryTip: "雙寫 t，bot /bɑː/ + tle /t̬əl/"
  },
  {
    id: "fc-el-201", tier: "elem_1000", category: "常見形容詞",
    word: "big", chunk: "big", ipa: "/b\u026a\u0261/", pos: "adj.",
    icon: "🐘", zh: "大的、巨大的",
    collocation: "big elephant",
    example: "An elephant is a very big land animal.", exampleZh: "大象是一種體型非常龐大的陸地動物。",
    memoryTip: "CVC 結構，比較級雙寫 g：bigger"
  },
  {
    id: "fc-el-202", tier: "elem_1000", category: "常見形容詞",
    word: "small", chunk: "small", ipa: "/sm\u0254\u02d0l/", pos: "adj.",
    icon: "🐭", zh: "小的、微小的",
    collocation: "small mouse",
    example: "A small mouse slipped into the pantry quietly.", exampleZh: "一隻小老鼠悄悄溜進了食品儲藏室。",
    memoryTip: "all 發 /ɔːl/"
  },
  {
    id: "fc-el-203", tier: "elem_1000", category: "常見形容詞",
    word: "tall", chunk: "tall", ipa: "/t\u0254\u02d0l/", pos: "adj.",
    icon: "🦒", zh: "高的 (身材/建築)",
    collocation: "tall building",
    example: "Taipei 101 is one of the tallest towers in Asia.", exampleZh: "台北 101 是亞洲最高的高塔之一。",
    memoryTip: "all 發 /ɔːl/"
  },
  {
    id: "fc-el-204", tier: "elem_1000", category: "常見形容詞",
    word: "short", chunk: "short", ipa: "/\u0283\u0254\u02d0rt/", pos: "adj.",
    icon: "🩳", zh: "矮的、短的",
    collocation: "short story",
    example: "He wrote a humorous short story for English class.", exampleZh: "他為英文課寫了一篇幽默的短篇故事。",
    memoryTip: "or 發長音 /ɔːr/"
  },
  {
    id: "fc-el-205", tier: "elem_1000", category: "常見形容詞",
    word: "long", chunk: "long", ipa: "/l\u0251\u02d0\u014b/", pos: "adj.",
    icon: "📏", zh: "長的、長期的",
    collocation: "long vacation",
    example: "Summer vacation is a long and wonderful holiday.", exampleZh: "暑假是一段漫長而美好的假期。",
    memoryTip: "ong 發 /ɑːŋ/"
  },
  {
    id: "fc-el-206", tier: "elem_1000", category: "常見形容詞",
    word: "fast", chunk: "fast", ipa: "/f\u00e6st/", pos: "adj. / adv.",
    icon: "⚡", zh: "快的；迅速地",
    collocation: "run fast",
    example: "Cheetahs can run exceptionally fast across grasslands.", exampleZh: "獵豹能在草原上以極快速度奔馳。",
    memoryTip: "a 短音 /æ/"
  },
  {
    id: "fc-el-207", tier: "elem_1000", category: "常見形容詞",
    word: "slow", chunk: "slow", ipa: "/slo\u028a/", pos: "adj.",
    icon: "🐢", zh: "緩慢的",
    collocation: "slow turtle",
    example: "Turtles walk with slow and steady steps.", exampleZh: "烏龜邁著緩慢而穩健的步伐行走。",
    memoryTip: "ow 發長母音 /oʊ/"
  },
  {
    id: "fc-el-208", tier: "elem_1000", category: "常見形容詞",
    word: "hot", chunk: "hot", ipa: "/h\u0251\u02d0t/", pos: "adj.",
    icon: "🔥", zh: "炎熱的、燙的",
    collocation: "hot soup",
    example: "Be careful because the hot soup might burn your tongue.", exampleZh: "請小心，熱湯可能會燙傷你的舌頭。",
    memoryTip: "CVC 結構，比較級雙寫 t：hotter"
  },
  {
    id: "fc-el-209", tier: "elem_1000", category: "常見形容詞",
    word: "cold", chunk: "cold", ipa: "/ko\u028ald/", pos: "adj.",
    icon: "🧊", zh: "寒冷的、冰涼的",
    collocation: "cold weather",
    example: "Drinking ice-cold juice is refreshing in summer.", exampleZh: "夏天喝冰涼果汁令人心曠神怡。",
    memoryTip: "old 字母組合發 /oʊld/"
  },
  {
    id: "fc-el-210", tier: "elem_1000", category: "常見形容詞",
    word: "new", chunk: "new", ipa: "/nu\u02d0/", pos: "adj.",
    icon: "✨", zh: "新的、嶄新的",
    collocation: "new shoes",
    example: "I wore my new shoes to school for the first time.", exampleZh: "我第一次穿新鞋去上學。",
    memoryTip: "ew 字母組合發 /nuː/"
  },
  {
    id: "fc-el-211", tier: "elem_1000", category: "常見形容詞",
    word: "old", chunk: "old", ipa: "/o\u028ald/", pos: "adj.",
    icon: "📜", zh: "年老的、陳舊的",
    collocation: "old friend",
    example: "Meeting an old friend brings back happy memories.", exampleZh: "遇見老朋友會喚起美好的回憶。",
    memoryTip: "old 發 /oʊld/"
  },
  {
    id: "fc-el-212", tier: "elem_1000", category: "常見形容詞",
    word: "young", chunk: "young", ipa: "/j\u028c\u014b/", pos: "adj.",
    icon: "🌱", zh: "年輕的、幼小的",
    collocation: "young children",
    example: "Young children learn languages very quickly.", exampleZh: "幼童學習語言非常快速。",
    memoryTip: "ou 不規則發短母音 /ʌ/"
  },
  {
    id: "fc-el-213", tier: "elem_1000", category: "常見形容詞",
    word: "busy", chunk: "bus - y", ipa: "/\u02c8b\u026az.i/", pos: "adj.",
    icon: "🐝", zh: "忙碌的、繁忙的",
    collocation: "busy day",
    example: "Dad had a very busy and productive day at work.", exampleZh: "爸爸在工作上度過了非常忙碌且充實的一天。",
    memoryTip: "u 不規則發短母音 /ɪ/！"
  },
  {
    id: "fc-el-214", tier: "elem_1000", category: "常見形容詞",
    word: "easy", chunk: "eas - y", ipa: "/\u02c8i\u02d0.zi/", pos: "adj.",
    icon: "👌", zh: "容易的、簡便的",
    collocation: "easy question",
    example: "This English question is quite easy to answer.", exampleZh: "這道英文題目相當容易回答。",
    memoryTip: "ea 發長母音 /iː/，s 發 /z/"
  },
  {
    id: "fc-el-215", tier: "elem_1000", category: "常見形容詞",
    word: "hard", chunk: "hard", ipa: "/h\u0251\u02d0rd/", pos: "adj. / adv.",
    icon: "🧗", zh: "困難的；努力地",
    collocation: "work hard",
    example: "If you study hard, you will achieve your goals.", exampleZh: "如果你努力學習，你一定能達成目標。",
    memoryTip: "ar 發捲舌長音 /ɑːr/"
  },
  {
    id: "fc-el-216", tier: "elem_1000", category: "常見形容詞",
    word: "sweet", chunk: "sweet", ipa: "/swi\u02d0t/", pos: "adj.",
    icon: "🍬", zh: "甜的、芳香的",
    collocation: "sweet apples",
    example: "These red apples taste delightfully sweet.", exampleZh: "這些紅蘋果嘗起來非常甘甜可口。",
    memoryTip: "ee 發長母音 /iː/"
  },

  // 2. 國中會考 2,000 (JHS 2,000)
  {
    id: "fc-jh-001", tier: "jhs_2000", category: "會考不規則動詞",
    word: "choose", chunk: "choose", ipa: "/t\u0283u\u02d0z/", pos: "v.",
    icon: "👉", zh: "選擇、挑選 (三態 choose-chose-chosen)",
    collocation: "choose wisely",
    example: "You have to choose one option from the four choices.", exampleZh: "你必須從四個選項中挑選一個。",
    memoryTip: "三態：choose /tʃuːz/ ➔ chose /tʃoʊz/ ➔ chosen /ˈtʃoʊ.zən/"
  },
  {
    id: "fc-jh-002", tier: "jhs_2000", category: "會考不規則動詞",
    word: "freeze", chunk: "freeze", ipa: "/fri\u02d0z/", pos: "v.",
    icon: "🔄", zh: "結冰、凍結 (三態 freeze-froze-frozen)",
    collocation: "freeze into ice",
    example: "Water freezes into ice at zero degrees Celsius.", exampleZh: "水在攝氏零度時會結成冰。",
    memoryTip: "三態：freeze ➔ froze ➔ frozen"
  },
  {
    id: "fc-jh-003", tier: "jhs_2000", category: "會考不規則動詞",
    word: "rise", chunk: "rise", ipa: "/ra\u026az/", pos: "v.",
    icon: "🌅", zh: "上升、升起 (三態 rise-rose-risen，不及物)",
    collocation: "the sun rises",
    example: "The sun rises in the east and sets in the west.", exampleZh: "太陽從東方升起，從西方落下。",
    memoryTip: "不及物動詞！不接受詞。三態：rise ➔ rose ➔ risen"
  },
  {
    id: "fc-jh-004", tier: "jhs_2000", category: "會考易混淆動詞",
    word: "raise", chunk: "raise", ipa: "/re\u026az/", pos: "v.",
    icon: "🏫", zh: "舉起、撫養、籌募 (及物動詞)",
    collocation: "raise one's hand",
    example: "Please raise your hand if you have any questions.", exampleZh: "如果你有任何問題，請舉手。",
    memoryTip: "及物動詞！後方必接名詞受詞。規則變化：raise-raised-raised"
  },
  {
    id: "fc-jh-005", tier: "jhs_2000", category: "會考不規則動詞",
    word: "lead", chunk: "lead", ipa: "/li\u02d0d/", pos: "v.",
    icon: "🔄", zh: "引導、帶領、導致 (三態 lead-led-led)",
    collocation: "lead to (導致)",
    example: "Hard work and dedication will lead to great success.", exampleZh: "努力與投入將會引導走向巨大的成功。",
    memoryTip: "三態：lead ➔ led ➔ led。注意 lead to 常考片語！"
  },
  {
    id: "fc-jh-006", tier: "jhs_2000", category: "會考不規則動詞",
    word: "spread", chunk: "spread", ipa: "/spr\u025bd/", pos: "v.",
    icon: "📖", zh: "傳播、蔓延 (三態同形 spread-spread-spread)",
    collocation: "spread rumors",
    example: "False news can spread very quickly across the internet.", exampleZh: "假消息在網路上傳播得非常快速。",
    memoryTip: "三態同形：spread ➔ spread ➔ spread，ea 發短母音 /ɛ/"
  },
  {
    id: "fc-jh-007", tier: "jhs_2000", category: "會考不規則動詞",
    word: "grow", chunk: "grow", ipa: "/\u0261ro\u028a/", pos: "v.",
    icon: "🌿", zh: "成長、種植 (三態 grow-grew-grown)",
    collocation: "grow up (長大)",
    example: "Vegetables grow very well in this fertile soil.", exampleZh: "蔬菜在這片肥沃的土壤中生長得非常好。",
    memoryTip: "三態：grow ➔ grew /ɡruː/ ➔ grown /ɡroʊn/"
  },
  {
    id: "fc-jh-008", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hide", chunk: "hide", ipa: "/ha\u026ad/", pos: "v.",
    icon: "🙈", zh: "躲藏、隱藏 (三態 hide-hid-hidden)",
    collocation: "hide and seek",
    example: "The little cat hid under the sofa during the thunderstorm.", exampleZh: "在雷雨期間，小貓躲在沙發底下。",
    memoryTip: "三態：hide ➔ hid ➔ hidden"
  },
  {
    id: "fc-jh-009", tier: "jhs_2000", category: "會考不規則動詞",
    word: "steal", chunk: "steal", ipa: "/sti\u02d0l/", pos: "v.",
    icon: "🕵️", zh: "偷竊 (三態 steal-stole-stolen)",
    collocation: "steal money",
    example: "The thief stole a bicycle from outside the store.", exampleZh: "小偷從店門口偷走了一輛腳踏車。",
    memoryTip: "三態：steal ➔ stole ➔ stolen"
  },
  {
    id: "fc-jh-010", tier: "jhs_2000", category: "會考不規則動詞",
    word: "shake", chunk: "shake", ipa: "/\u0283e\u026ak/", pos: "v.",
    icon: "🔄", zh: "搖動、握手 (三態 shake-shook-shaken)",
    collocation: "shake hands",
    example: "They shook hands politely after concluding the deal.", exampleZh: "達成協議後，他們禮貌地握了手。",
    memoryTip: "三態：shake ➔ shook ➔ shaken"
  },
  {
    id: "fc-jh-011", tier: "jhs_2000", category: "會考不規則動詞",
    word: "break", chunk: "break", ipa: "/bre\u026ak/", pos: "v.",
    icon: "🔨", zh: "打破、折斷 (三態 break-broke-broken)",
    collocation: "break the rule (違規)",
    example: "Never break safety rules in the laboratory.", exampleZh: "在實驗室裡切勿違反安全守則。",
    memoryTip: "三態：break ➔ broke ➔ broken，ea 發長音 /eɪ/"
  },
  {
    id: "fc-jh-012", tier: "jhs_2000", category: "會考不規則動詞",
    word: "bring", chunk: "bring", ipa: "/br\u026a\u014b/", pos: "v.",
    icon: "🎁", zh: "帶來、攜帶 (三態 bring-brought-brought)",
    collocation: "bring lunch",
    example: "Remember to bring your textbook to class tomorrow.", exampleZh: "記得明天上課要把課本帶來。",
    memoryTip: "三態：bring ➔ brought /brɔːt/ ➔ brought"
  },
  {
    id: "fc-jh-013", tier: "jhs_2000", category: "會考不規則動詞",
    word: "buy", chunk: "buy", ipa: "/ba\u026a/", pos: "v.",
    icon: "🛍️", zh: "購買、買下 (三態 buy-bought-bought)",
    collocation: "buy gifts",
    example: "She bought a birthday present for her best friend.", exampleZh: "她為她最好的朋友買了一份生日禮物。",
    memoryTip: "三態：buy ➔ bought /bɔːt/ ➔ bought"
  },
  {
    id: "fc-jh-014", tier: "jhs_2000", category: "會考不規則動詞",
    word: "catch", chunk: "catch", ipa: "/k\u00e6t\u0283/", pos: "v.",
    icon: "🧤", zh: "捕捉、趕上（車）(三態 catch-caught-caught)",
    collocation: "catch the bus",
    example: "Hurry up, or we will not be able to catch the last bus.", exampleZh: "快一點，否則我們會趕不上末班公車。",
    memoryTip: "三態：catch ➔ caught /kɔːt/ ➔ caught"
  },
  {
    id: "fc-jh-015", tier: "jhs_2000", category: "會考不規則動詞",
    word: "drive", chunk: "drive", ipa: "/dra\u026av/", pos: "v.",
    icon: "🚗", zh: "駕駛、開車 (三態 drive-drove-driven)",
    collocation: "drive carefully",
    example: "Always drive carefully in rainy or snowy conditions.", exampleZh: "在雨雪天候中行車務必小心謹慎。",
    memoryTip: "三態：drive ➔ drove ➔ driven /ˈdrɪv.ən/"
  },
  {
    id: "fc-jh-016", tier: "jhs_2000", category: "會考不規則動詞",
    word: "fall", chunk: "fall", ipa: "/f\u0254\u02d0l/", pos: "v.",
    icon: "🍂", zh: "落下、跌倒 (三態 fall-fell-fallen)",
    collocation: "fall down",
    example: "Leaves fall from trees when autumn arrives.", exampleZh: "秋天來臨時樹葉自枝頭飄落。",
    memoryTip: "三態：fall ➔ fell ➔ fallen"
  },
  {
    id: "fc-jh-017", tier: "jhs_2000", category: "會考不規則動詞",
    word: "feel", chunk: "feel", ipa: "/fi\u02d0l/", pos: "v.",
    icon: "🔄", zh: "感覺、覺得 (連綴動詞，三態 feel-felt-felt)",
    collocation: "feel happy",
    example: "I felt very excited when I received the acceptance letter.", exampleZh: "收到錄取通知時我感到無比興奮。",
    memoryTip: "連綴動詞！後接形容詞補語。三態：feel ➔ felt ➔ felt"
  },
  {
    id: "fc-jh-018", tier: "jhs_2000", category: "會考不規則動詞",
    word: "find", chunk: "find", ipa: "/fa\u026and/", pos: "v.",
    icon: "🔍", zh: "尋獲、發現 (三態 find-found-found)",
    collocation: "find out (查明)",
    example: "Did you find out what caused the unexpected power outage?", exampleZh: "你有查出是什麼原因導致這場突發停電嗎？",
    memoryTip: "三態：find ➔ found ➔ found"
  },
  {
    id: "fc-jh-019", tier: "jhs_2000", category: "會考不規則動詞",
    word: "forget", chunk: "for - get", ipa: "/f\u025a\u02c8\u0261\u025bt/", pos: "v.",
    icon: "💭", zh: "忘記 (三態 forget-forgot-forgotten)",
    collocation: "forget to bring",
    example: "Don't forget to lock the front door before leaving.", exampleZh: "出門前別忘記鎖上大門。",
    memoryTip: "forget to V (忘記去做) vs forget V-ing (忘記曾做過)"
  },
  {
    id: "fc-jh-020", tier: "jhs_2000", category: "會考不規則動詞",
    word: "give", chunk: "give", ipa: "/\u0261\u026av/", pos: "v.",
    icon: "🎁", zh: "給予、贈送 (三態 give-gave-given)",
    collocation: "give up (放棄)",
    example: "Never give up on your dreams, no matter how tough it gets.", exampleZh: "無論多麼艱辛，絕不要放棄你的夢想。",
    memoryTip: "三態：give ➔ gave ➔ given"
  },
  {
    id: "fc-jh-021", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hear", chunk: "hear", ipa: "/h\u026ar/", pos: "v.",
    icon: "👂", zh: "聽見 (感官動詞，三態 hear-heard-heard)",
    collocation: "hear a sound",
    example: "I heard someone calling my name outside the window.", exampleZh: "我聽見有人在窗外喊我的名字。",
    memoryTip: "感官動詞！受詞後接原形動詞或 V-ing。三態：hear ➔ heard /hɝːd/"
  },
  {
    id: "fc-jh-022", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hold", chunk: "hold", ipa: "/ho\u028ald/", pos: "v.",
    icon: "🤝", zh: "握住、舉辦 (三態 hold-held-held)",
    collocation: "hold an event",
    example: "The student council will hold a charity sale next Friday.", exampleZh: "學生會下週五將舉辦一場慈善義賣。",
    memoryTip: "三態：hold ➔ held ➔ held"
  },
  {
    id: "fc-jh-023", tier: "jhs_2000", category: "會考不規則動詞",
    word: "keep", chunk: "keep", ipa: "/ki\u02d0p/", pos: "v.",
    icon: "🔒", zh: "保持、持續 (三態 keep-kept-kept)",
    collocation: "keep going",
    example: "Keep practicing every day and your English will improve.", exampleZh: "持續每天練習，你的英文一定會進步。",
    memoryTip: "keep + V-ing 表持續動作。三態：keep ➔ kept ➔ kept"
  },
  {
    id: "fc-jh-024", tier: "jhs_2000", category: "會考不規則動詞",
    word: "know", chunk: "know", ipa: "/no\u028a/", pos: "v.",
    icon: "💡", zh: "知道、認識 (三態 know-knew-known)",
    collocation: "know the truth",
    example: "I didn't know that she could speak three languages.", exampleZh: "我以前不知道她竟然能說三種語言。",
    memoryTip: "k 不發音！三態：know ➔ knew /nuː/ ➔ known /noʊn/"
  },
  {
    id: "fc-jh-025", tier: "jhs_2000", category: "會考不規則動詞",
    word: "leave", chunk: "leave", ipa: "/li\u02d0v/", pos: "v.",
    icon: "🚪", zh: "離開、留下 (三態 leave-left-left)",
    collocation: "leave for (前往)",
    example: "The bullet train leaves for Kaohsiung at eight thirty.", exampleZh: "高鐵於八點半開往高雄。",
    memoryTip: "三態：leave ➔ left ➔ left"
  },
  {
    id: "fc-jh-026", tier: "jhs_2000", category: "會考不規則動詞",
    word: "lose", chunk: "lose", ipa: "/lu\u02d0z/", pos: "v.",
    icon: "📉", zh: "遺失、輸掉 (三態 lose-lost-lost)",
    collocation: "lose a game",
    example: "Be careful not to lose your passport when traveling.", exampleZh: "旅行時務必小心不要遺失你的護照。",
    memoryTip: "三態：lose ➔ lost ➔ lost。注意與 loose /luːs/ (鬆的) 區分！"
  },
  {
    id: "fc-jh-027", tier: "jhs_2000", category: "會考不規則動詞",
    word: "meet", chunk: "meet", ipa: "/mi\u02d0t/", pos: "v.",
    icon: "🤝", zh: "遇見、迎接 (三態 meet-met-met)",
    collocation: "meet friends",
    example: "We decided to meet in front of the subway station.", exampleZh: "我們決定在捷運站前面碰面。",
    memoryTip: "三態：meet ➔ met ➔ met"
  },
  {
    id: "fc-jh-028", tier: "jhs_2000", category: "會考不規則動詞",
    word: "pay", chunk: "pay", ipa: "/pe\u026a/", pos: "v. / n.",
    icon: "💵", zh: "支付、付款 (三態 pay-paid-paid)",
    collocation: "pay attention to",
    example: "Pay close attention to what the teacher is explaining.", exampleZh: "密切注意老師正在說明的內容。",
    memoryTip: "三態：pay ➔ paid ➔ paid。注意 pay attention to 核心片語！"
  },
  {
    id: "fc-jh-029", tier: "jhs_2000", category: "會考不規則動詞",
    word: "ride", chunk: "ride", ipa: "/ra\u026ad/", pos: "v.",
    icon: "🚲", zh: "騎乘（車/馬）(三態 ride-rode-ridden)",
    collocation: "ride a bicycle",
    example: "He rides his bicycle to the sports center every weekend.", exampleZh: "他每週末都騎腳踏車去運動中心。",
    memoryTip: "三態：ride ➔ rode ➔ ridden /ˈrɪd.ən/"
  },
  {
    id: "fc-jh-030", tier: "jhs_2000", category: "會考不規則動詞",
    word: "see", chunk: "see", ipa: "/si\u02d0/", pos: "v.",
    icon: "👀", zh: "看見 (感官動詞，三態 see-saw-seen)",
    collocation: "see a movie",
    example: "Did you see what happened at the corner of the street?", exampleZh: "你有看見街角發生了什麼事嗎？",
    memoryTip: "感官動詞！受詞後接原形動詞或 V-ing。三態：see ➔ saw /sɔː/ ➔ seen"
  },
  {
    id: "fc-jh-031", tier: "jhs_2000", category: "會考不規則動詞",
    word: "send", chunk: "send", ipa: "/s\u025bnd/", pos: "v.",
    icon: "✉️", zh: "寄發、派遣 (三態 send-sent-sent)",
    collocation: "send an email",
    example: "I will send you the detailed schedule by email today.", exampleZh: "我今天會透過電子郵件寄給你詳細時程表。",
    memoryTip: "三態：send ➔ sent ➔ sent"
  },
  {
    id: "fc-jh-032", tier: "jhs_2000", category: "會考不規則動詞",
    word: "sing", chunk: "sing", ipa: "/s\u026a\u014b/", pos: "v.",
    icon: "🎤", zh: "歌唱 (三態 sing-sang-sung)",
    collocation: "sing a song",
    example: "The choir sang beautiful carols at the celebration.", exampleZh: "合唱團在慶祝活動中唱出了優美的頌歌。",
    memoryTip: "三態：sing ➔ sang /sæŋ/ ➔ sung /sʌŋ/"
  },
  {
    id: "fc-jh-033", tier: "jhs_2000", category: "會考不規則動詞",
    word: "sit", chunk: "sit", ipa: "/s\u026at/", pos: "v.",
    icon: "🔄", zh: "坐下 (三態 sit-sat-sat)",
    collocation: "sit down",
    example: "Please sit down and make yourself comfortable.", exampleZh: "請坐下，放輕鬆別拘束。",
    memoryTip: "三態：sit ➔ sat ➔ sat"
  },
  {
    id: "fc-jh-034", tier: "jhs_2000", category: "會考不規則動詞",
    word: "spend", chunk: "spend", ipa: "/sp\u025bnd/", pos: "v.",
    icon: "💳", zh: "花費（時間/金錢）(三態 spend-spent-spent)",
    collocation: "spend time on",
    example: "She spends two hours studying English every evening.", exampleZh: "她每天晚上花兩小時研讀英文。",
    memoryTip: "主詞必為人！人 + spend + 時間/金錢 + (on N / V-ing)"
  },
  {
    id: "fc-jh-035", tier: "jhs_2000", category: "會考不規則動詞",
    word: "stand", chunk: "stand", ipa: "/st\u00e6nd/", pos: "v.",
    icon: "🔄", zh: "站立、忍受 (三態 stand-stood-stood)",
    collocation: "stand in line",
    example: "Passengers must stand behind the yellow safety line.", exampleZh: "乘客必須站在黃色安全線後方。",
    memoryTip: "三態：stand ➔ stood /stʊd/ ➔ stood"
  },
  {
    id: "fc-jh-036", tier: "jhs_2000", category: "會考不規則動詞",
    word: "swim", chunk: "swim", ipa: "/sw\u026am/", pos: "v.",
    icon: "🏊", zh: "游泳 (三態 swim-swam-swum)",
    collocation: "swim across",
    example: "He swam across the lake during the summer competition.", exampleZh: "他在夏季賽事中游過了整座湖泊。",
    memoryTip: "三態：swim ➔ swam /swæm/ ➔ swum /swʌm/"
  },
  {
    id: "fc-jh-037", tier: "jhs_2000", category: "會考不規則動詞",
    word: "take", chunk: "take", ipa: "/te\u026ak/", pos: "v.",
    icon: "🤲", zh: "拿取、花費（時間）(三態 take-took-taken)",
    collocation: "take a shower",
    example: "It took me three days to finish writing the essay.", exampleZh: "寫完這篇論文花了我三天的時間。",
    memoryTip: "虛主詞 it 表花費時間：It takes (人) + 時間 + to V"
  },
  {
    id: "fc-jh-038", tier: "jhs_2000", category: "會考不規則動詞",
    word: "teach", chunk: "teach", ipa: "/ti\u02d0t\u0283/", pos: "v.",
    icon: "👩‍🏫", zh: "教導、講授 (三態 teach-taught-taught)",
    collocation: "teach English",
    example: "Mr. Davis has taught mathematics for over twenty years.", exampleZh: "戴維斯老師教授數學已經超過二十年了。",
    memoryTip: "三態：teach ➔ taught /tɔːt/ ➔ taught"
  },
  {
    id: "fc-jh-039", tier: "jhs_2000", category: "會考不規則動詞",
    word: "tell", chunk: "tell", ipa: "/t\u025bl/", pos: "v.",
    icon: "🗣️", zh: "告訴、辨別 (三態 tell-told-told)",
    collocation: "tell a story",
    example: "Can you tell me the difference between these two words?", exampleZh: "你能告訴我這兩個單字之間的差異嗎？",
    memoryTip: "授與動詞：tell + 人 + 事物。三態：tell ➔ told ➔ told"
  },
  {
    id: "fc-jh-040", tier: "jhs_2000", category: "會考不規則動詞",
    word: "think", chunk: "think", ipa: "/\u03b8\u026a\u014bk/", pos: "v.",
    icon: "🧠", zh: "思考、認為 (三態 think-thought-thought)",
    collocation: "think about",
    example: "Take a few minutes to think carefully about the plan.", exampleZh: "花幾分鐘仔細思考一下這項計畫。",
    memoryTip: "三態：think ➔ thought /θɔːt/ ➔ thought"
  },
  {
    id: "fc-jh-041", tier: "jhs_2000", category: "會考不規則動詞",
    word: "throw", chunk: "throw", ipa: "/\u03b8ro\u028a/", pos: "v.",
    icon: "⚾", zh: "投擲、拋丟 (三態 throw-threw-thrown)",
    collocation: "throw a ball",
    example: "The pitcher threw the baseball with tremendous speed.", exampleZh: "投手以驚人的球速投出了棒球。",
    memoryTip: "三態：throw ➔ threw /θruː/ ➔ thrown /θroʊn/"
  },
  {
    id: "fc-jh-042", tier: "jhs_2000", category: "會考不規則動詞",
    word: "wear", chunk: "wear", ipa: "/w\u025br/", pos: "v.",
    icon: "👕", zh: "穿著、配戴 (三態 wear-wore-worn)",
    collocation: "wear a mask",
    example: "People wear face masks on public transport to stay safe.", exampleZh: "人們在大眾運輸上戴口罩以確保安全。",
    memoryTip: "三態：wear ➔ wore ➔ worn"
  },
  {
    id: "fc-jh-043", tier: "jhs_2000", category: "會考不規則動詞",
    word: "win", chunk: "win", ipa: "/w\u026an/", pos: "v.",
    icon: "🏆", zh: "贏得、獲勝 (三態 win-won-won)",
    collocation: "win a prize",
    example: "Our basketball team won the championship yesterday.", exampleZh: "我們的籃球隊昨天贏得了總冠軍。",
    memoryTip: "三態：win ➔ won /wʌn/ ➔ won"
  },
  {
    id: "fc-jh-044", tier: "jhs_2000", category: "科技與數位生活",
    word: "technology", chunk: "tech - nol - o - gy", ipa: "/t\u025bk\u02c8n\u0251\u02d0.l\u0259.d\u0292i/", pos: "n.",
    icon: "🏫", zh: "科技、技術",
    collocation: "modern technology",
    example: "Modern technology makes communication across borders instant.", exampleZh: "現代科技使得跨國溝通變得即時迅捷。",
    memoryTip: "techno (技術) + -logy (學問/學科)"
  },
  {
    id: "fc-jh-045", tier: "jhs_2000", category: "科技與數位生活",
    word: "internet", chunk: "in - ter - net", ipa: "/\u02c8\u026an.t\u025a.n\u025bt/", pos: "n.",
    icon: "🏫", zh: "網際網路、網路",
    collocation: "surf the internet",
    example: "Students search for reference materials on the internet.", exampleZh: "學生們在網際網路上搜尋參考資料。",
    memoryTip: "inter- (相互/國際) + net (網絡)"
  },
  {
    id: "fc-jh-046", tier: "jhs_2000", category: "科技與數位生活",
    word: "smartphone", chunk: "smart - phone", ipa: "/\u02c8sm\u0251\u02d0rt.fo\u028an/", pos: "n.",
    icon: "📱", zh: "智慧型手機",
    collocation: "use a smartphone",
    example: "Do not look at your smartphone screen while walking.", exampleZh: "走路時請不要盯著智慧型手機螢幕看。",
    memoryTip: "smart (聰明的) + phone (電話)"
  },
  {
    id: "fc-jh-047", tier: "jhs_2000", category: "科技與數位生活",
    word: "software", chunk: "soft - ware", ipa: "/\u02c8s\u0251\u02d0ft.w\u025br/", pos: "n.",
    icon: "🏫", zh: "軟體 (不可數)",
    collocation: "install software",
    example: "You need to update your antivirus software regularly.", exampleZh: "你需要定期更新你的防毒軟體。",
    memoryTip: "soft (軟) + ware (製品)，不可數名詞！"
  },
  {
    id: "fc-jh-048", tier: "jhs_2000", category: "科技與數位生活",
    word: "device", chunk: "de - vice", ipa: "/d\u026a\u02c8va\u026as/", pos: "n.",
    icon: "🏫", zh: "電子設備、裝置",
    collocation: "electronic device",
    example: "Turn off all electronic devices during the airplane takeoff.", exampleZh: "飛機起飛期間請關閉所有電子裝置。",
    memoryTip: "de- + vice (發音 /vaɪs/)"
  },
  {
    id: "fc-jh-049", tier: "jhs_2000", category: "科技與數位生活",
    word: "application", chunk: "ap - pli - ca - tion", ipa: "/\u02cc\u00e6p.l\u0259\u02c8ke\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🐱", zh: "應用程式 (App)、申請",
    collocation: "download an application",
    example: "This learning application helps students practice English listening.", exampleZh: "這款學習應用程式能幫助學生練習英語聽力。",
    memoryTip: "apply (申請/應用) ➔ application"
  },
  {
    id: "fc-jh-050", tier: "jhs_2000", category: "科技與數位生活",
    word: "connect", chunk: "con - nect", ipa: "/k\u0259\u02c8n\u025bkt/", pos: "v.",
    icon: "🏫", zh: "連接、連結",
    collocation: "connect to Wi-Fi",
    example: "My tablet cannot connect to the school wireless network.", exampleZh: "我的平板無法連上學校的無線網路。",
    memoryTip: "con- (共同) + nect (綁定/連接)"
  },
  {
    id: "fc-jh-051", tier: "jhs_2000", category: "科技與數位生活",
    word: "information", chunk: "in - for - ma - tion", ipa: "/\u02cc\u026an.f\u025a\u02c8me\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🏫", zh: "資訊、消息 (不可數)",
    collocation: "useful information",
    example: "The official website provides reliable information for tourists.", exampleZh: "官方網站為遊客提供可靠的旅遊資訊。",
    memoryTip: "注意：information 在英文中恆為不可數名詞！"
  },
  {
    id: "fc-jh-052", tier: "jhs_2000", category: "科技與數位生活",
    word: "online", chunk: "on - line", ipa: "/\u02c8\u0251\u02d0n.la\u026an/", pos: "adj. / adv.",
    icon: "🏫", zh: "在線的、線上的",
    collocation: "online learning",
    example: "Many students take online English courses during holidays.", exampleZh: "許多學生在假期期間參加線上英語課程。",
    memoryTip: "on + line (在線上)"
  },
  {
    id: "fc-jh-053", tier: "jhs_2000", category: "科技與數位生活",
    word: "digital", chunk: "dig - i - tal", ipa: "/\u02c8d\u026ad\u0292.\u0259.t\u032c\u0259l/", pos: "adj.",
    icon: "🏫", zh: "數位的、數位化的",
    collocation: "digital world",
    example: "We live in a digital age where information spreads instantly.", exampleZh: "我們生活在一個資訊即時傳播的數位時代。",
    memoryTip: "digit (數字) + -al (形容詞尾綴)"
  },
  {
    id: "fc-jh-054", tier: "jhs_2000", category: "環境與生態",
    word: "environment", chunk: "en - vi - ron - ment", ipa: "/\u026an\u02c8va\u026a.r\u0259n.m\u0259nt/", pos: "n.",
    icon: "🏫", zh: "自然環境",
    collocation: "protect the environment",
    example: "We should reduce plastic waste to protect the environment.", exampleZh: "我們應該減少塑膠垃圾以保護環境。",
    memoryTip: "environ (環繞) + -ment (名詞尾綴)"
  },
  {
    id: "fc-jh-055", tier: "jhs_2000", category: "環境與生態",
    word: "pollution", chunk: "pol - lu - tion", ipa: "/p\u0259\u02c8lu\u02d0.\u0283\u0259n/", pos: "n.",
    icon: "🏫", zh: "污染 (空氣/水源等)",
    collocation: "air pollution",
    example: "Air pollution has become a serious issue in big cities.", exampleZh: "空氣污染已經成為大城市中的嚴重問題。",
    memoryTip: "pollute (污染) + -tion (名詞尾綴)"
  },
  {
    id: "fc-jh-056", tier: "jhs_2000", category: "環境與生態",
    word: "recycle", chunk: "re - cy - cle", ipa: "/\u02ccri\u02d0\u02c8sa\u026a.k\u0259l/", pos: "v.",
    icon: "🏫", zh: "回收、循環利用",
    collocation: "recycle paper and plastic",
    example: "Our school encourages all students to recycle plastic bottles.", exampleZh: "我們學校鼓勵所有學生回收寶特瓶。",
    memoryTip: "re- (再) + cycle (循環) ➔ 資源回收"
  },
  {
    id: "fc-jh-057", tier: "jhs_2000", category: "環境與生態",
    word: "climate", chunk: "cli - mate", ipa: "/\u02c8kla\u026a.m\u0259t/", pos: "n.",
    icon: "🏫", zh: "氣候 (長期平均狀態)",
    collocation: "climate change",
    example: "Global climate change causes more frequent extreme weather events.", exampleZh: "全球氣候變遷造成更頻繁的極端天氣事件。",
    memoryTip: "cli 發 /klaɪ/ + mate 弱讀 /mət/"
  },
  {
    id: "fc-jh-058", tier: "jhs_2000", category: "環境與生態",
    word: "energy", chunk: "en - er - gy", ipa: "/\u02c8\u025bn.\u025a.d\u0292i/", pos: "n.",
    icon: "🏫", zh: "能源、精力",
    collocation: "solar energy (太陽能)",
    example: "Solar and wind power are clean renewable sources of energy.", exampleZh: "太陽能與風力是潔淨的可再生能源。",
    memoryTip: "g 在 y 前發軟音 /dʒ/，en-er-gy"
  },
  {
    id: "fc-jh-059", tier: "jhs_2000", category: "環境與生態",
    word: "protect", chunk: "pro - tect", ipa: "/pr\u0259\u02c8t\u025bkt/", pos: "v.",
    icon: "🏫", zh: "保護、防護",
    collocation: "protect wildlife",
    example: "National parks are established to protect wild animal habitats.", exampleZh: "設立國家公園是為了保護野生動物的棲地。",
    memoryTip: "pro- (向前) + tect (覆蓋/遮蔽，如 detect)"
  },
  {
    id: "fc-jh-060", tier: "jhs_2000", category: "環境與生態",
    word: "disaster", chunk: "dis - as - ter", ipa: "/d\u026a\u02c8z\u00e6s.t\u025a/", pos: "n.",
    icon: "🏫", zh: "災害、天災",
    collocation: "natural disaster",
    example: "The severe earthquake was the worst natural disaster in years.", exampleZh: "這場強烈地震是數年來最嚴重的自然災害。",
    memoryTip: "dis- (不祥/負面) + aster (星象) ➔ 凶星降臨 ➔ 災難"
  },
  {
    id: "fc-jh-061", tier: "jhs_2000", category: "環境與生態",
    word: "typhoon", chunk: "ty - phoon", ipa: "/ta\u026a\u02c8fu\u02d0n/", pos: "n.",
    icon: "🏫", zh: "颱風",
    collocation: "super typhoon",
    example: "The powerful typhoon brought heavy rain and strong gusts.", exampleZh: "這場強烈颱風帶來了豪雨與強勁陣風。",
    memoryTip: "源自粵語「大風」音譯，ty (/taɪ/) + phoon (/fuːn/)"
  },
  {
    id: "fc-jh-062", tier: "jhs_2000", category: "環境與生態",
    word: "earthquake", chunk: "earth - quake", ipa: "/\u02c8\u025d\u02d0\u03b8.kwe\u026ak/", pos: "n.",
    icon: "🌍", zh: "地震",
    collocation: "hit by an earthquake",
    example: "Taiwan has strict building codes to withstand frequent earthquakes.", exampleZh: "台灣制定了嚴格的建築防震法規以抵禦頻繁地震。",
    memoryTip: "earth (地球/陸地) + quake (震動)"
  },
  {
    id: "fc-jh-063", tier: "jhs_2000", category: "環境與生態",
    word: "resource", chunk: "re - source", ipa: "/\u02c8ri\u02d0.s\u0254\u02d0rs/", pos: "n.",
    icon: "🏫", zh: "資源、財源",
    collocation: "natural resources",
    example: "Water is one of our most precious natural resources.", exampleZh: "水是我們最寶貴的自然資源之一。",
    memoryTip: "re- (再) + source (源頭)"
  },
  {
    id: "fc-jh-064", tier: "jhs_2000", category: "個性與人際",
    word: "honest", chunk: "hon - est", ipa: "/\u02c8\u0251\u02d0.n\u026ast/", pos: "adj.",
    icon: "1️⃣", zh: "誠實的、正直的",
    collocation: "honest answer",
    example: "It is always better to be honest than to tell lies.", exampleZh: "誠實總比說謊來得更好。",
    memoryTip: "h 不發音！冠詞需使用 an honest person！"
  },
  {
    id: "fc-jh-065", tier: "jhs_2000", category: "個性與人際",
    word: "patient", chunk: "pa - tient", ipa: "/\u02c8pe\u026a.\u0283\u0259nt/", pos: "adj. / n.",
    icon: "🏫", zh: "有耐心的；病人",
    collocation: "be patient with",
    example: "Teachers must be patient when helping young learners.", exampleZh: "老師在輔導年幼學習者時必須有耐心。",
    memoryTip: "ti 在母音前發軟音 /ʃ/，pa-tient"
  },
  {
    id: "fc-jh-066", tier: "jhs_2000", category: "個性與人際",
    word: "generous", chunk: "gen - er - ous", ipa: "/\u02c8d\u0292\u025bn.\u025a.\u0259s/", pos: "adj.",
    icon: "🏫", zh: "慷慨的、大方的",
    collocation: "generous donation",
    example: "He is generous enough to share his snacks with everyone.", exampleZh: "他很大方，把自己的點心分給每個人享用。",
    memoryTip: "g 在 e 前發 /dʒ/，-ous 為形容詞字尾"
  },
  {
    id: "fc-jh-067", tier: "jhs_2000", category: "個性與人際",
    word: "confident", chunk: "con - fi - dent", ipa: "/\u02c8k\u0251\u02d0n.f\u0259.d\u0259nt/", pos: "adj.",
    icon: "🏫", zh: "有信心的、自信的",
    collocation: "feel confident",
    example: "Practicing speaking will make you feel confident in exams.", exampleZh: "多練習口說能讓你在考試時感到信心充足。",
    memoryTip: "con- + fid (信任/相信) + -ent"
  },
  {
    id: "fc-jh-068", tier: "jhs_2000", category: "個性與人際",
    word: "creative", chunk: "cre - a - tive", ipa: "/kri\u02c8e\u026a.t\u026av/", pos: "adj.",
    icon: "🍽️", zh: "有創意的、創造性的",
    collocation: "creative idea",
    example: "The artist came up with a creative design for the poster.", exampleZh: "該藝術家為海報想出了一個富有創意的設計。",
    memoryTip: "create (創造) + -ive (形容詞尾綴)"
  },
  {
    id: "fc-jh-069", tier: "jhs_2000", category: "個性與人際",
    word: "responsible", chunk: "re - spon - si - ble", ipa: "/r\u026a\u02c8sp\u0251\u02d0n.s\u0259.b\u0259l/", pos: "adj.",
    icon: "🏫", zh: "負責任的",
    collocation: "be responsible for",
    example: "Every team leader is responsible for organizing the tasks.", exampleZh: "每位隊長都負責組織統籌各項任務。",
    memoryTip: "re- + sponsor (擔保) + -ible (能...的)"
  },
  {
    id: "fc-jh-070", tier: "jhs_2000", category: "個性與人際",
    word: "polite", chunk: "po - lite", ipa: "/p\u0259\u02c8la\u026at/", pos: "adj.",
    icon: "🏫", zh: "有禮貌的、客氣的",
    collocation: "polite response",
    example: "Remember to be polite when asking someone for directions.", exampleZh: "向別人問路時記得保持禮貌。",
    memoryTip: "Magic E 使 i 發長母音 /aɪ/"
  },
  {
    id: "fc-jh-071", tier: "jhs_2000", category: "個性與人際",
    word: "humorous", chunk: "hu - mor - ous", ipa: "/\u02c8hju\u02d0.m\u025a.\u0259s/", pos: "adj.",
    icon: "🏫", zh: "幽默的、詼諧的",
    collocation: "humorous story",
    example: "His humorous speech made the entire audience burst into laughter.", exampleZh: "他幽默的演說讓全場聽眾哈哈大笑。",
    memoryTip: "humor (幽默) + -ous (形容詞尾綴)"
  },
  {
    id: "fc-jh-072", tier: "jhs_2000", category: "個性與人際",
    word: "energetic", chunk: "en - er - get - ic", ipa: "/\u02cc\u025bn.\u025a\u02c8d\u0292\u025bt.\u026ak/", pos: "adj.",
    icon: "🏫", zh: "充滿活力的、精力充沛的",
    collocation: "energetic child",
    example: "The energetic puppies ran around the backyard all afternoon.", exampleZh: "充滿活力的小狗在後院玩耍了一整個下午。",
    memoryTip: "energy (能量) ➔ energetic"
  },
  {
    id: "fc-jh-073", tier: "jhs_2000", category: "個性與人際",
    word: "respect", chunk: "re - spect", ipa: "/r\u026a\u02c8sp\u025bkt/", pos: "v. / n.",
    icon: "🏫", zh: "尊敬、敬重",
    collocation: "respect others",
    example: "We should respect people from different cultural backgrounds.", exampleZh: "我們應當尊重來自不同文化背景的人。",
    memoryTip: "re- (再/回頭) + spect (看) ➔ 回頭看 ➔ 敬重"
  },
  {
    id: "fc-jh-074", tier: "jhs_2000", category: "心智與思維",
    word: "decision", chunk: "de - ci - sion", ipa: "/d\u026a\u02c8s\u026a\u0292.\u0259n/", pos: "n.",
    icon: "🏫", zh: "決定、抉擇",
    collocation: "make a decision",
    example: "Think carefully before you make an important life decision.", exampleZh: "在做人生重大決定前務必三思。",
    memoryTip: "decide (決定) ➔ decision，sion 發 /ʒən/"
  },
  {
    id: "fc-jh-075", tier: "jhs_2000", category: "心智與思維",
    word: "opinion", chunk: "o - pin - ion", ipa: "/\u0259\u02c8p\u026an.j\u0259n/", pos: "n.",
    icon: "🏫", zh: "意見、觀點",
    collocation: "in my opinion (依我之見)",
    example: "In my opinion, reading books expands your worldview greatly.", exampleZh: "依我看來，閱讀書籍能大幅開拓你的世界觀。",
    memoryTip: "o (/ə/) + pin (/pɪn/) + ion (/jən/)"
  },
  {
    id: "fc-jh-076", tier: "jhs_2000", category: "心智與思維",
    word: "solution", chunk: "so - lu - tion", ipa: "/s\u0259\u02c8lu\u02d0.\u0283\u0259n/", pos: "n.",
    icon: "🏫", zh: "解決方法、解方",
    collocation: "find a solution to",
    example: "Engineers worked around the clock to find a solution.", exampleZh: "工程師們夜以繼日地尋找解決方法。",
    memoryTip: "solve (解決) ➔ solution"
  },
  {
    id: "fc-jh-077", tier: "jhs_2000", category: "心智與思維",
    word: "experience", chunk: "ex - pe - ri - ence", ipa: "/\u026ak\u02c8sp\u026ar.i.\u0259ns/", pos: "n. / v.",
    icon: "🏫", zh: "經驗 (不可數)；經歷 (可數)",
    collocation: "learning experience",
    example: "Studying abroad was a valuable experience for the teenager.", exampleZh: "出國留學對這名青少年而言是一段寶貴的經驗。",
    memoryTip: "ex- (外) + peri (嘗試/冒險) ➔ 經驗"
  },
  {
    id: "fc-jh-078", tier: "jhs_2000", category: "心智與思維",
    word: "opportunity", chunk: "op - por - tu - ni - ty", ipa: "/\u02cc\u0251\u02d0.p\u025a\u02c8tu\u02d0.n\u0259.t\u032ci/", pos: "n.",
    icon: "🏫", zh: "機會、良機",
    collocation: "seize an opportunity",
    example: "Do not miss the opportunity to study in such a fine program.", exampleZh: "千萬不要錯過在這麼好的學程中學習的機會。",
    memoryTip: "op- (朝向) + port (港口) ➔ 船隻入港之良機"
  },
  {
    id: "fc-jh-079", tier: "jhs_2000", category: "心智與思維",
    word: "purpose", chunk: "pur - pose", ipa: "/\u02c8p\u025d\u02d0.p\u0259s/", pos: "n.",
    icon: "🏫", zh: "目的、意圖",
    collocation: "on purpose (故意地)",
    example: "What was the main purpose of holding this emergency meeting?", exampleZh: "召開這次緊急會議的主要目的是什麼？",
    memoryTip: "pur 發 /pɝː/ + pose 弱讀 /pəs/"
  },
  {
    id: "fc-jh-080", tier: "jhs_2000", category: "心智與思維",
    word: "problem", chunk: "prob - lem", ipa: "/\u02c8pr\u0251\u02d0.bl\u0259m/", pos: "n.",
    icon: "🏫", zh: "問題、難題",
    collocation: "solve a problem",
    example: "Work as a team to solve this difficult math problem.", exampleZh: "團隊合作來解決這道困難的數學難題。",
    memoryTip: "prob 發 /prɑː/ + lem 發 /bləm/"
  },
  {
    id: "fc-jh-081", tier: "jhs_2000", category: "心智與思維",
    word: "reason", chunk: "rea - son", ipa: "/\u02c8ri\u02d0.z\u0259n/", pos: "n.",
    icon: "🏫", zh: "原因、理由",
    collocation: "reason for",
    example: "Can you give me a clear reason for your late arrival?", exampleZh: "你能給我一個遲到的明確理由嗎？",
    memoryTip: "ea 發長母音 /iː/，son 發 /zən/"
  },
  {
    id: "fc-jh-082", tier: "jhs_2000", category: "心智與思維",
    word: "result", chunk: "re - sult", ipa: "/r\u026a\u02c8z\u028clt/", pos: "n.",
    icon: "🏫", zh: "結果、成效",
    collocation: "as a result (因此)",
    example: "As a result of diligent study, she received an A grade.", exampleZh: "由於勤奮讀書，她獲得了 A 等級的好成績。",
    memoryTip: "re- + sult 發 /zʌlt/"
  },
  {
    id: "fc-jh-083", tier: "jhs_2000", category: "心智與思維",
    word: "memory", chunk: "mem - o - ry", ipa: "/\u02c8m\u025bm.\u025a.i/", pos: "n.",
    icon: "🏫", zh: "記憶、回憶",
    collocation: "childhood memories",
    example: "Going camping with family is one of my happiest memories.", exampleZh: "和家人一起露營是我最快樂的童年回憶之一。",
    memoryTip: "mem (心智) + -ory (場所/狀態)"
  },
  {
    id: "fc-jh-084", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "although", chunk: "al - though", ipa: "/\u0254\u02d0l\u02c8\u00f0o\u028a/", pos: "conj.",
    icon: "🏫", zh: "雖然、儘管 (引導讓步子句)",
    collocation: "although + 子句",
    example: "Although it was raining hard, the game continued as planned.", exampleZh: "雖然雨下得很大，比賽依然按計畫繼續進行。",
    memoryTip: "考點提醒：英文中 although 與 but 絕不可出現在同一個句子中！"
  },
  {
    id: "fc-jh-085", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "however", chunk: "how - ev - er", ipa: "/ha\u028a\u02c8\u025bv.\u025a/", pos: "adv.",
    icon: "🏫", zh: "然而、不過 (轉折副詞)",
    collocation: "However, ...",
    example: "The test was very difficult. However, Jane got a high score.", exampleZh: "考試非常困難。然而，珍依然拿到了高分。",
    memoryTip: "轉折副詞！不可直接連接兩子句，常置於句首加逗號。"
  },
  {
    id: "fc-jh-086", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "therefore", chunk: "there - fore", ipa: "/\u02c8\u00f0\u025br.f\u0254\u02d0r/", pos: "adv.",
    icon: "🏫", zh: "因此、所以 (因果副詞)",
    collocation: "Therefore, ...",
    example: "He practiced diligently every day; therefore, he won the trophy.", exampleZh: "他每天勤奮練習；因此，他贏得了獎盃。",
    memoryTip: "表結果的副詞！不可與 because 連用。"
  },
  {
    id: "fc-jh-087", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "unless", chunk: "un - less", ipa: "/\u0259n\u02c8l\u025bs/", pos: "conj.",
    icon: "🏫", zh: "除非 (相當於 if ... not)",
    collocation: "unless + 現在式",
    example: "We will have a picnic tomorrow unless it rains heavily.", exampleZh: "除非下大雨，否則我們明天會去野餐。",
    memoryTip: "unless 本身帶否定意味，其引導之子句不用 not！"
  },
  {
    id: "fc-jh-088", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "especially", chunk: "es - pe - cial - ly", ipa: "/\u026a\u02c8sp\u025b\u0283.\u0259l.i/", pos: "adv.",
    icon: "💎", zh: "特別是、尤其是",
    collocation: "especially in summer",
    example: "I enjoy outdoor sports, especially cycling along the river.", exampleZh: "我喜歡戶外運動，特別是沿著河岸騎腳踏車。",
    memoryTip: "especial (特殊的) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-089", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "immediately", chunk: "im - me - di - ate - ly", ipa: "/\u026a\u02c8mi\u02d0.di.\u0259t.li/", pos: "adv.",
    icon: "🏫", zh: "立刻、馬上",
    collocation: "reply immediately",
    example: "When the fire alarm rang, everyone evacuated immediately.", exampleZh: "火警鈴響起時，每個人都立刻疏散撤離。",
    memoryTip: "im- (不/無) + mediate (中間媒介) ➔ 不隔時間 ➔ 立刻"
  },
  {
    id: "fc-jh-090", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "finally", chunk: "fi - nal - ly", ipa: "/\u02c8fa\u026a.n\u0259l.i/", pos: "adv.",
    icon: "🏫", zh: "最後、終於",
    collocation: "finally arrive",
    example: "After a twelve-hour flight, we finally arrived in London.", exampleZh: "經過十二小時的飛行，我們終於抵達了倫敦。",
    memoryTip: "final (最終的) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-091", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "suddenly", chunk: "sud - den - ly", ipa: "/\u02c8s\u028cd.\u0259n.li/", pos: "adv.",
    icon: "🏫", zh: "突然、忽然間",
    collocation: "suddenly stop",
    example: "The car stopped suddenly when a dog ran across the street.", exampleZh: "當一隻狗跑過馬路時，汽車突然煞停了下來。",
    memoryTip: "sudden (突然的) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-092", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "almost", chunk: "al - most", ipa: "/\u02c8\u0254\u02d0l.mo\u028ast/", pos: "adv.",
    icon: "🏫", zh: "幾乎、差一點",
    collocation: "almost finished",
    example: "Dinner is almost ready, so please wash your hands.", exampleZh: "晚餐幾乎快準備好了，請去洗手。",
    memoryTip: "al- (全) + most (大部分) ➔ 幾乎"
  },
  {
    id: "fc-jh-093", tier: "jhs_2000", category: "會考轉折與連接詞",
    word: "nearly", chunk: "near - ly", ipa: "/\u02c8n\u026ar.li/", pos: "adv.",
    icon: "👂", zh: "將近、幾乎",
    collocation: "nearly two hours",
    example: "We walked for nearly two hours before finding the station.", exampleZh: "我們走了將近兩小時才找到車站。",
    memoryTip: "near (接近) + -ly (副詞尾綴)"
  },
  {
    id: "fc-jh-094", tier: "jhs_2000", category: "會考不規則動詞",
    word: "begin", chunk: "be - gin", ipa: "/b\u026a\u02c8\u0261\u026an/", pos: "v.",
    icon: "🏁", zh: "開始 (三態 begin-began-begun)",
    collocation: "begin to study",
    example: "The concert will begin promptly at seven thirty.", exampleZh: "音樂會將於七點半準時開始。",
    memoryTip: "三態：begin ➔ began /bɪˈɡæn/ ➔ begun /bɪˈɡʌn/"
  },
  {
    id: "fc-jh-095", tier: "jhs_2000", category: "會考不規則動詞",
    word: "become", chunk: "be - come", ipa: "/b\u026a\u02c8k\u028cm/", pos: "v.",
    icon: "🌱", zh: "成為、變成 (三態 become-became-become)",
    collocation: "become a doctor",
    example: "He worked hard and eventually became a respected doctor.", exampleZh: "他努力奮鬥，最終成為一位受人尊敬的醫生。",
    memoryTip: "三態：become ➔ became ➔ become"
  },
  {
    id: "fc-jh-096", tier: "jhs_2000", category: "會考不規則動詞",
    word: "blow", chunk: "blow", ipa: "/blo\u028a/", pos: "v.",
    icon: "🔄", zh: "吹動、颳風 (三態 blow-blew-blown)",
    collocation: "blow out candles",
    example: "Strong wind blew away all the dry leaves on the ground.", exampleZh: "強風吹走了地上所有的乾樹葉。",
    memoryTip: "三態：blow ➔ blew /bluː/ ➔ blown /bloʊn/"
  },
  {
    id: "fc-jh-097", tier: "jhs_2000", category: "會考不規則動詞",
    word: "draw", chunk: "draw", ipa: "/dr\u0254\u02d0/", pos: "v.",
    icon: "🎨", zh: "繪畫、拉出 (三態 draw-drew-drawn)",
    collocation: "draw a picture",
    example: "The talented artist drew a magnificent portrait.", exampleZh: "那位才華洋溢的藝術家畫了一幅壯麗的肖像。",
    memoryTip: "三態：draw ➔ drew /druː/ ➔ drawn /drɔːn/"
  },
  {
    id: "fc-jh-098", tier: "jhs_2000", category: "會考不規則動詞",
    word: "drink", chunk: "drink", ipa: "/dr\u026a\u014bk/", pos: "v.",
    icon: "🥤", zh: "飲用、喝 (三態 drink-drank-drunk)",
    collocation: "drink water",
    example: "Athletes drank plenty of water after the marathon.", exampleZh: "運動員在馬拉松跑完後喝了大量的水。",
    memoryTip: "三態：drink ➔ drank /dræŋk/ ➔ drunk /drʌŋk/"
  },
  {
    id: "fc-jh-099", tier: "jhs_2000", category: "會考不規則動詞",
    word: "eat", chunk: "eat", ipa: "/i\u02d0t/", pos: "v.",
    icon: "🍽️", zh: "吃、食用 (三態 eat-ate-eaten)",
    collocation: "eat healthy food",
    example: "We ate delicious homemade noodles at grandma's house.", exampleZh: "我們在奶奶家吃了美味的手工麵條。",
    memoryTip: "三態：eat ➔ ate /eɪt/ ➔ eaten /ˈiː.tən/"
  },
  {
    id: "fc-jh-100", tier: "jhs_2000", category: "會考不規則動詞",
    word: "fly", chunk: "fly", ipa: "/fla\u026a/", pos: "v.",
    icon: "✈️", zh: "飛行、放飛 (三態 fly-flew-flown)",
    collocation: "fly a kite",
    example: "Birds fly south to seek warmer weather in winter.", exampleZh: "鳥兒在冬天向南飛尋求更溫暖的氣候。",
    memoryTip: "三態：fly ➔ flew /fluː/ ➔ flown /floʊn/"
  },
  {
    id: "fc-jh-101", tier: "jhs_2000", category: "會考不規則動詞",
    word: "get", chunk: "get", ipa: "/\u0261\u025bt/", pos: "v.",
    icon: "🥦", zh: "得到、到達 (三態 get-got-gotten)",
    collocation: "get good grades",
    example: "She studied thoroughly to get top marks on the final test.", exampleZh: "她徹底複習以在期末考拿到頂尖成績。",
    memoryTip: "三態：get ➔ got ➔ gotten /ˈɡɑː.tən/"
  },
  {
    id: "fc-jh-102", tier: "jhs_2000", category: "會考不規則動詞",
    word: "ring", chunk: "ring", ipa: "/r\u026a\u014b/", pos: "v. / n.",
    icon: "🔔", zh: "鳴響；戒指 (三態 ring-rang-rung)",
    collocation: "the bell rings",
    example: "The school bell rang, signaling the end of the school day.", exampleZh: "學校鐘聲響起，宣告放學時間已到。",
    memoryTip: "三態：ring ➔ rang /ræŋ/ ➔ rung /rʌŋ/"
  },
  {
    id: "fc-jh-103", tier: "jhs_2000", category: "會考不規則動詞",
    word: "run", chunk: "run", ipa: "/r\u028cn/", pos: "v.",
    icon: "🏃", zh: "奔跑、經營 (三態 run-ran-run)",
    collocation: "run a business",
    example: "He ran as fast as he could to deliver the message.", exampleZh: "他以最快速度奔跑去傳遞消息。",
    memoryTip: "三態：run ➔ ran /ræn/ ➔ run /rʌn/"
  },
  {
    id: "fc-jh-104", tier: "jhs_2000", category: "會考不規則動詞",
    word: "say", chunk: "say", ipa: "/se\u026a/", pos: "v.",
    icon: "💬", zh: "說、講出 (三態 say-said-said)",
    collocation: "say hello",
    example: "The teacher said that practice makes perfect.", exampleZh: "老師說熟能生巧。",
    memoryTip: "三態：say /seɪ/ ➔ said /sɛd/ ➔ said /sɛd/！注意音標短母音"
  },
  {
    id: "fc-jh-105", tier: "jhs_2000", category: "學業與教育",
    word: "education", chunk: "ed - u - ca - tion", ipa: "/\u02cc\u025bd\u0292.\u028a\u02c8ke\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🐱", zh: "教育",
    collocation: "quality education",
    example: "Education plays a critical role in shaping a child's future.", exampleZh: "教育在塑造孩子的未來中扮演關鍵角色。",
    memoryTip: "educate (教育) + -tion (名詞尾綴)"
  },
  {
    id: "fc-jh-106", tier: "jhs_2000", category: "學業與教育",
    word: "grammar", chunk: "gram - mar", ipa: "/\u02c8\u0261r\u00e6m.\u025a/", pos: "n.",
    icon: "🏫", zh: "文法 (不可數)",
    collocation: "English grammar",
    example: "Understanding basic grammar rules makes writing much easier.", exampleZh: "理解基礎文法規則讓寫作變得容易許多。",
    memoryTip: "雙寫 m，gram /ɡræm/ + mar /ɚ/，注意結尾是 ar！"
  },
  {
    id: "fc-jh-107", tier: "jhs_2000", category: "學業與教育",
    word: "vocabulary", chunk: "vo - cab - u - lar - y", ipa: "/vo\u028a\u02c8k\u00e6b.j\u0259.l\u025br.i/", pos: "n.",
    icon: "🏫", zh: "單字量、詞彙",
    collocation: "expand vocabulary",
    example: "Reading articles regularly helps students expand their vocabulary.", exampleZh: "定期閱讀文章能幫助學生擴充單字量。",
    memoryTip: "vocab (詞彙) + ulary"
  },
  {
    id: "fc-jh-108", tier: "jhs_2000", category: "學業與教育",
    word: "pronunciation", chunk: "pro - nun - ci - a - tion", ipa: "/pr\u0259\u02ccn\u028cn.si\u02c8e\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🏫", zh: "發音、讀音",
    collocation: "clear pronunciation",
    example: "Listen to native audio recordings to improve your pronunciation.", exampleZh: "收聽母語者錄音以改善你的發音。",
    memoryTip: "注意拼寫：pronounce ➔ pronunciation (沒有 o)！"
  },
  {
    id: "fc-jh-109", tier: "jhs_2000", category: "學業與教育",
    word: "dictionary", chunk: "dic - tion - ar - y", ipa: "/\u02c8d\u026ak.\u0283\u0259n.\u025br.i/", pos: "n.",
    icon: "🏫", zh: "字典、辭典",
    collocation: "look up in a dictionary",
    example: "If you encounter an unfamiliar word, look it up in a dictionary.", exampleZh: "如果遇到不認識的字，請查字典。",
    memoryTip: "diction (用詞) + -ary (場所/工具)"
  },
  {
    id: "fc-jh-110", tier: "jhs_2000", category: "學業與教育",
    word: "comprehension", chunk: "com - pre - hen - sion", ipa: "/\u02cck\u0251\u02d0m.pr\u026a\u02c8h\u025bn.\u0283\u0259n/", pos: "n.",
    icon: "🏫", zh: "理解力、閱讀理解",
    collocation: "reading comprehension",
    example: "The test includes questions measuring reading comprehension.", exampleZh: "該測驗包含評量閱讀理解能力的題目。",
    memoryTip: "comprehend (理解) ➔ comprehension"
  },
  {
    id: "fc-jh-111", tier: "jhs_2000", category: "學業與教育",
    word: "describe", chunk: "de - scribe", ipa: "/d\u026a\u02c8skra\u026ab/", pos: "v.",
    icon: "🏫", zh: "描述、描寫",
    collocation: "describe a scene",
    example: "Can you describe what the suspect looked like?", exampleZh: "你能描述一下嫌疑犯長什麼樣子嗎？",
    memoryTip: "de- (向下) + scribe (書寫) ➔ 描繪"
  },
  {
    id: "fc-jh-112", tier: "jhs_2000", category: "學業與教育",
    word: "improve", chunk: "im - prove", ipa: "/\u026am\u02c8pru\u02d0v/", pos: "v.",
    icon: "🏫", zh: "改進、進步",
    collocation: "improve skills",
    example: "Continuous practice will help you improve your speaking skills.", exampleZh: "持續練習將幫助你增進口語技巧。",
    memoryTip: "im- + prove (證明/改善)"
  },
  {
    id: "fc-jh-113", tier: "jhs_2000", category: "社會與公共事務",
    word: "government", chunk: "gov - ern - ment", ipa: "/\u02c8\u0261\u028cv.\u025an.m\u0259nt/", pos: "n.",
    icon: "🏫", zh: "政府",
    collocation: "local government",
    example: "The government announced new environmental conservation policies.", exampleZh: "政府宣布了新的環境保育政策。",
    memoryTip: "govern (治理) + -ment (名詞尾綴)"
  },
  {
    id: "fc-jh-114", tier: "jhs_2000", category: "社會與公共事務",
    word: "community", chunk: "com - mu - ni - ty", ipa: "/k\u0259\u02c8mju\u02d0.n\u0259.t\u032ci/", pos: "n.",
    icon: "🏫", zh: "社區、共同體",
    collocation: "local community",
    example: "Volunteers collected food to help the elderly in their community.", exampleZh: "志工們收集食物來幫助社區裡的長者。",
    memoryTip: "common (共同) ➔ community"
  },
  {
    id: "fc-jh-115", tier: "jhs_2000", category: "社會與公共事務",
    word: "volunteer", chunk: "vol - un - teer", ipa: "/\u02ccv\u0251\u02d0l.\u0259n\u02c8t\u026ar/", pos: "n. / v.",
    icon: "🏫", zh: "志工；自願服務",
    collocation: "work as a volunteer",
    example: "Many high school students work as volunteers at the shelter.", exampleZh: "許多高中生在收容所擔任志工服務。",
    memoryTip: "vol- (意志/意願) + -teer (人)"
  },
  {
    id: "fc-jh-116", tier: "jhs_2000", category: "社會與公共事務",
    word: "citizen", chunk: "cit - i - zen", ipa: "/\u02c8s\u026at\u032c.\u0259.z\u0259n/", pos: "n.",
    icon: "🏫", zh: "公民、國民",
    collocation: "responsible citizen",
    example: "A responsible citizen obeys the laws and protects public property.", exampleZh: "負責任的公民遵守法律並愛護公物。",
    memoryTip: "city (城市) ➔ citizen (公民)"
  },
  {
    id: "fc-jh-117", tier: "jhs_2000", category: "社會與公共事務",
    word: "profession", chunk: "pro - fes - sion", ipa: "/pr\u0259\u02c8f\u025b\u0283.\u0259n/", pos: "n.",
    icon: "🏫", zh: "專業、職業",
    collocation: "medical profession",
    example: "Nursing is a demanding yet deeply rewarding profession.", exampleZh: "護理是一項要求嚴格卻深具回報的崇高專業。",
    memoryTip: "profess (聲明) ➔ profession"
  },
  {
    id: "fc-jh-118", tier: "jhs_2000", category: "旅行與文化",
    word: "journey", chunk: "jour - ney", ipa: "/\u02c8d\u0292\u025d\u02d0.ni/", pos: "n.",
    icon: "🏫", zh: "旅程、旅行",
    collocation: "safe journey",
    example: "They wished him a safe and wonderful journey across Europe.", exampleZh: "他們祝他橫越歐洲的旅程平安且精彩。",
    memoryTip: "jour (日) ➔ 一日的行程 ➔ 旅程"
  },
  {
    id: "fc-jh-119", tier: "jhs_2000", category: "旅行與文化",
    word: "passport", chunk: "pass - port", ipa: "/\u02c8p\u00e6s.p\u0254\u02d0rt/", pos: "n.",
    icon: "🏫", zh: "護照",
    collocation: "valid passport",
    example: "You must show a valid passport when boarding an international flight.", exampleZh: "登上班機時你必須出示有效護照。",
    memoryTip: "pass (通過) + port (港口/口岸) ➔ 護照"
  },
  {
    id: "fc-jh-120", tier: "jhs_2000", category: "旅行與文化",
    word: "passenger", chunk: "pas - sen - ger", ipa: "/\u02c8p\u00e6s.\u0259n.d\u0292\u025a/", pos: "n.",
    icon: "🏫", zh: "乘客、旅客",
    collocation: "seatbelt for passengers",
    example: "All passengers must fasten their seatbelts before takeoff.", exampleZh: "起飛前所有乘客必須繫好安全帶。",
    memoryTip: "pass (經過) ➔ passenger"
  },
  {
    id: "fc-jh-121", tier: "jhs_2000", category: "旅行與文化",
    word: "schedule", chunk: "sched - ule", ipa: "/\u02c8sk\u025bd\u0292.u\u02d0l/", pos: "n. / v.",
    icon: "🏫", zh: "時程表、日程安排",
    collocation: "on schedule (按時)",
    example: "The train arrived right on schedule despite the heavy rain.", exampleZh: "儘管下著大雨，火車依然準時抵達。",
    memoryTip: "sch 發 /sk/，edule 發 /ɛdʒ.uːl/"
  },
  {
    id: "fc-jh-122", tier: "jhs_2000", category: "旅行與文化",
    word: "culture", chunk: "cul - ture", ipa: "/\u02c8k\u028cl.t\u0283\u025a/", pos: "n.",
    icon: "🏫", zh: "文化",
    collocation: "traditional culture",
    example: "Traveling to new countries allows you to experience different cultures.", exampleZh: "去新國家旅行讓你能體驗不同的文化。",
    memoryTip: "cult (耕耘/培育) + -ure"
  },
  {
    id: "fc-jh-123", tier: "jhs_2000", category: "健康與身心",
    word: "medicine", chunk: "med - i - cine", ipa: "/\u02c8m\u025bd.\u0259.s\u0259n/", pos: "n.",
    icon: "🏫", zh: "藥物 (不可數)；醫學",
    collocation: "take medicine (服藥)",
    example: "Take this prescribed medicine three times a day after meals.", exampleZh: "請於三餐飯後服用這款處方藥物。",
    memoryTip: "med (醫治) + -icine"
  },
  {
    id: "fc-jh-124", tier: "jhs_2000", category: "健康與身心",
    word: "hospital", chunk: "hos - pi - tal", ipa: "/\u02c8h\u0251\u02d0.sp\u026a.t\u032c\u0259l/", pos: "n.",
    icon: "🏥", zh: "醫院",
    collocation: "emergency room",
    example: "The injured driver was rushed to the nearby hospital.", exampleZh: "受傷的駕駛被迅速送往附近醫院急救。",
    memoryTip: "hospit (接待/客人) ➔ 醫院"
  },
  {
    id: "fc-jh-125", tier: "jhs_2000", category: "健康與身心",
    word: "disease", chunk: "dis - ease", ipa: "/d\u026a\u02c8zi\u02d0z/", pos: "n.",
    icon: "🌊", zh: "疾病",
    collocation: "prevent disease",
    example: "Regular handwashing helps prevent the spread of infectious disease.", exampleZh: "常洗手有助於預防傳染病的傳播。",
    memoryTip: "dis- (不/非) + ease (安適) ➔ 身體不安 ➔ 疾病"
  },
  {
    id: "fc-jh-126", tier: "jhs_2000", category: "健康與身心",
    word: "symptom", chunk: "symp - tom", ipa: "/\u02c8s\u026amp.t\u0259m/", pos: "n.",
    icon: "🏫", zh: "症狀、徵兆",
    collocation: "common symptoms",
    example: "Fever, cough, and sore throat are common symptoms of the flu.", exampleZh: "發燒、咳嗽和喉嚨痛是流感的常見症狀。",
    memoryTip: "sym- (共同) + ptom (掉落/發生)"
  },
  {
    id: "fc-jh-127", tier: "jhs_2000", category: "健康與身心",
    word: "exercise", chunk: "ex - er - cise", ipa: "/\u02c8\u025bk.s\u025a.sa\u026az/", pos: "n. / v.",
    icon: "🏫", zh: "運動；練習",
    collocation: "regular exercise",
    example: "Doing aerobic exercise thirty minutes a day strengthens your heart.", exampleZh: "每天做三十分鐘有氧運動能強化你的心臟。",
    memoryTip: "ex- + ercise"
  },
  {
    id: "fc-jh-128", tier: "jhs_2000", category: "會考不規則動詞",
    word: "cost", chunk: "cost", ipa: "/k\u0251\u02d0st/", pos: "v. / n.",
    icon: "💰", zh: "花費（金錢）；成本 (三態 cost-cost-cost)",
    collocation: "cost a lot",
    example: "The new smartphone cost three hundred dollars.", exampleZh: "這款新智慧型手機花費了三百美元。",
    memoryTip: "事物當主詞！物 + cost + 人 + 金錢。三態同形！"
  },
  {
    id: "fc-jh-129", tier: "jhs_2000", category: "會考不規則動詞",
    word: "cut", chunk: "cut", ipa: "/k\u028ct/", pos: "v.",
    icon: "✂️", zh: "剪切、切斷 (三態 cut-cut-cut)",
    collocation: "cut paper",
    example: "Use safety scissors to cut the colored paper carefully.", exampleZh: "請使用安全剪刀仔細剪裁色紙。",
    memoryTip: "三態同形：cut ➔ cut ➔ cut"
  },
  {
    id: "fc-jh-130", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hit", chunk: "hit", ipa: "/h\u026at/", pos: "v. / n.",
    icon: "⚪", zh: "擊打、襲擊 (三態 hit-hit-hit)",
    collocation: "hit a baseball",
    example: "The batter hit the baseball over the fence.", exampleZh: "擊球手將棒球打出了全壘打牆外。",
    memoryTip: "三態同形：hit ➔ hit ➔ hit"
  },
  {
    id: "fc-jh-131", tier: "jhs_2000", category: "會考不規則動詞",
    word: "hurt", chunk: "hurt", ipa: "/h\u025d\u02d0t/", pos: "v. / adj.",
    icon: "🩹", zh: "傷害、使疼痛；受傷的 (三態 hurt-hurt-hurt)",
    collocation: "hurt one's leg",
    example: "He hurt his ankle while playing soccer yesterday.", exampleZh: "他昨天踢足球時傷到了腳踝。",
    memoryTip: "三態同形：hurt ➔ hurt ➔ hurt"
  },
  {
    id: "fc-jh-132", tier: "jhs_2000", category: "會考不規則動詞",
    word: "let", chunk: "let", ipa: "/l\u025bt/", pos: "v.",
    icon: "🚪", zh: "讓、允許 (使役動詞，三態 let-let-let)",
    collocation: "let me know",
    example: "Please let me know if you need any assistance.", exampleZh: "如果你需要任何協助請讓我知道。",
    memoryTip: "使役動詞！後接受詞 + 原形動詞。三態同形！"
  },
  {
    id: "fc-jh-133", tier: "jhs_2000", category: "會考不規則動詞",
    word: "put", chunk: "put", ipa: "/p\u028at/", pos: "v.",
    icon: "📥", zh: "放置、安放 (三態 put-put-put)",
    collocation: "put on (穿上)",
    example: "Put on your heavy coat before going outdoors.", exampleZh: "出門前穿上你的厚大衣。",
    memoryTip: "三態同形：put ➔ put ➔ put"
  },
  {
    id: "fc-jh-134", tier: "jhs_2000", category: "會考不規則動詞",
    word: "quit", chunk: "quit", ipa: "/kw\u026at/", pos: "v.",
    icon: "🔄", zh: "戒除、放棄 (三態 quit-quit-quit)",
    collocation: "quit smoking",
    example: "Dad decided to quit smoking for the sake of his health.", exampleZh: "為了身體健康爸爸決定戒菸。",
    memoryTip: "quit 後接 V-ing。三態同形！"
  },
  {
    id: "fc-jh-135", tier: "jhs_2000", category: "會考不規則動詞",
    word: "shut", chunk: "shut", ipa: "/\u0283\u028ct/", pos: "v. / adj.",
    icon: "🚪", zh: "關閉；合上的 (三態 shut-shut-shut)",
    collocation: "shut the door",
    example: "Please shut the window because the wind is getting cold.", exampleZh: "請關上窗戶，因為風越來越涼了。",
    memoryTip: "三態同形：shut ➔ shut ➔ shut"
  },
  {
    id: "fc-jh-136", tier: "jhs_2000", category: "會考不規則動詞",
    word: "bite", chunk: "bite", ipa: "/ba\u026at/", pos: "v. / n.",
    icon: "🔄", zh: "咬、叮咬 (三態 bite-bit-bitten)",
    collocation: "mosquito bite",
    example: "Be careful; that stray dog might bite if frightened.", exampleZh: "請小心，那隻流浪狗如果受驚可能會咬人。",
    memoryTip: "三態：bite ➔ bit ➔ bitten /ˈbɪt.ən/"
  },
  {
    id: "fc-jh-137", tier: "jhs_2000", category: "會考不規則動詞",
    word: "forgive", chunk: "for - give", ipa: "/f\u025a\u02c8\u0261\u026av/", pos: "v.",
    icon: "🎁", zh: "原諒、寬恕 (三態 forgive-forgave-forgiven)",
    collocation: "forgive mistakes",
    example: "True friends readily forgive each other's mistakes.", exampleZh: "真正的朋友總會寬恕彼此的過失。",
    memoryTip: "三態：forgive ➔ forgave ➔ forgiven"
  },
  {
    id: "fc-jh-138", tier: "jhs_2000", category: "會考不規則動詞",
    word: "understand", chunk: "un - der - stand", ipa: "/\u02cc\u028cn.d\u025a\u02c8st\u00e6nd/", pos: "v.",
    icon: "🔄", zh: "理解、明白 (三態 understand-understood-understood)",
    collocation: "understand grammar",
    example: "Do you understand what the teacher just explained?", exampleZh: "你理解老師剛才說明的內容了嗎？",
    memoryTip: "三態：understand ➔ understood ➔ understood"
  },
  {
    id: "fc-jh-139", tier: "jhs_2000", category: "心智與思維",
    word: "knowledge", chunk: "knowl - edge", ipa: "/\u02c8n\u0251\u02d0.l\u026ad\u0292/", pos: "n.",
    icon: "💡", zh: "知識 (不可數)",
    collocation: "gain knowledge",
    example: "Reading widely is the best way to gain useful knowledge.", exampleZh: "博覽群書是獲取實用知識的最佳途徑。",
    memoryTip: "k 不發音！knowl /nɑː/ + edge /lɪdʒ/，注意不可數！"
  },
  {
    id: "fc-jh-140", tier: "jhs_2000", category: "心智與思維",
    word: "attitude", chunk: "at - ti - tude", ipa: "/\u02c8\u00e6t\u032c.\u0259.tu\u02d0d/", pos: "n.",
    icon: "🏫", zh: "態度、心態",
    collocation: "positive attitude",
    example: "A positive learning attitude leads to remarkable progress.", exampleZh: "積極的學習態度能帶來顯著的進步。",
    memoryTip: "at /æt/ + ti /t̬ə/ + tude /tuːd/"
  },
  {
    id: "fc-jh-141", tier: "jhs_2000", category: "心智與思維",
    word: "habit", chunk: "hab - it", ipa: "/\u02c8h\u00e6b.\u026at/", pos: "n.",
    icon: "🏫", zh: "習慣",
    collocation: "good habit",
    example: "Reading for thirty minutes every day is an excellent habit.", exampleZh: "每天閱讀三十分鐘是一項極佳的習慣。",
    memoryTip: "hab 短音 /hæb/ + it /ɪt/"
  },
  {
    id: "fc-jh-142", tier: "jhs_2000", category: "心智與思維",
    word: "concept", chunk: "con - cept", ipa: "/\u02c8k\u0251\u02d0n.s\u025bpt/", pos: "n.",
    icon: "🏫", zh: "觀念、概念",
    collocation: "core concept",
    example: "Make sure you master the core concepts before the exam.", exampleZh: "考試前務必精熟核心觀念。",
    memoryTip: "con- + cept (抓取) ➔ 抓取本質 ➔ 概念"
  },
  {
    id: "fc-jh-143", tier: "jhs_2000", category: "心智與思維",
    word: "reality", chunk: "re - al - i - ty", ipa: "/ri\u02c8\u00e6l.\u0259.t\u032ci/", pos: "n.",
    icon: "🏫", zh: "現實、真實狀況",
    collocation: "face reality",
    example: "We must face reality and find practical ways to solve this.", exampleZh: "我們必須面對現實並尋求切實的解決之道。",
    memoryTip: "real (真實的) ➔ reality"
  },
  {
    id: "fc-jh-144", tier: "jhs_2000", category: "心智與思維",
    word: "wisdom", chunk: "wis - dom", ipa: "/\u02c8w\u026az.d\u0259m/", pos: "n.",
    icon: "⚡", zh: "智慧 (不可數)",
    collocation: "words of wisdom",
    example: "Elders often pass down valuable words of wisdom.", exampleZh: "長者常傳承下寶貴的智慧箴言。",
    memoryTip: "wise (有智慧的) ➔ wisdom"
  },
  {
    id: "fc-jh-145", tier: "jhs_2000", category: "社會與公共事務",
    word: "scientist", chunk: "sci - en - tist", ipa: "/\u02c8sa\u026a.\u0259n.t\u026ast/", pos: "n.",
    icon: "🏫", zh: "科學家",
    collocation: "talented scientist",
    example: "Scientists are researching clean renewable energy sources.", exampleZh: "科學家們正在研究潔淨的可再生能源。",
    memoryTip: "science (科學) + -ist (人)"
  },
  {
    id: "fc-jh-146", tier: "jhs_2000", category: "社會與公共事務",
    word: "engineer", chunk: "en - gi - neer", ipa: "/\u02cc\u025bn.d\u0292\u0259\u02c8n\u026ar/", pos: "n.",
    icon: "🏫", zh: "工程師",
    collocation: "civil engineer (土木工程師)",
    example: "The software engineer designed a powerful mobile app.", exampleZh: "軟體工程師設計了一款強大的行動應用程式。",
    memoryTip: "engine (引擎/工程) + -eer (專家)"
  },
  {
    id: "fc-jh-147", tier: "jhs_2000", category: "社會與公共事務",
    word: "doctor", chunk: "doc - tor", ipa: "/\u02c8d\u0251\u02d0k.t\u025a/", pos: "n.",
    icon: "🧑‍⚕️", zh: "醫生、醫師；博士",
    collocation: "see a doctor",
    example: "You should see a doctor if your high fever persists.", exampleZh: "如果你的高燒持續不退，你應該去看醫生。",
    memoryTip: "doc /dɑːk/ + tor /tɚ/"
  },
  {
    id: "fc-jh-148", tier: "jhs_2000", category: "社會與公共事務",
    word: "nurse", chunk: "nurse", ipa: "/n\u025d\u02d0s/", pos: "n.",
    icon: "🧑‍⚕️", zh: "護理師、護士",
    collocation: "caring nurse",
    example: "The caring nurse took gentle care of the young patient.", exampleZh: "貼心的護理師溫柔地照料這位年幼的病患。",
    memoryTip: "ur 發捲舌長音 /ɝː/"
  },
  {
    id: "fc-jh-149", tier: "jhs_2000", category: "社會與公共事務",
    word: "officer", chunk: "of - fi - cer", ipa: "/\u02c8\u0251\u02d0.f\u026a.s\u025a/", pos: "n.",
    icon: "🏫", zh: "警官、官員",
    collocation: "police officer",
    example: "The police officer directed traffic at the busy crossroads.", exampleZh: "警官在繁忙的十字路口指揮交通。",
    memoryTip: "office (辦公室) ➔ officer"
  },
  {
    id: "fc-jh-150", tier: "jhs_2000", category: "社會與公共事務",
    word: "musician", chunk: "mu - si - cian", ipa: "/mju\u02d0\u02c8z\u026a\u0283.\u0259n/", pos: "n.",
    icon: "🏫", zh: "音樂家",
    collocation: "talented musician",
    example: "The classical musician played the violin beautifully.", exampleZh: "那位古典音樂家優美地演奏了小提琴。",
    memoryTip: "music (音樂) + -ian (專家)"
  },
  {
    id: "fc-jh-151", tier: "jhs_2000", category: "會考易混淆字",
    word: "borrow", chunk: "bor - row", ipa: "/\u02c8b\u0251\u02d0r.o\u028a/", pos: "v.",
    icon: "🏫", zh: "向（他人）借入",
    collocation: "borrow sth from sb",
    example: "Can I borrow your English dictionary for today's lesson?", exampleZh: "今天的課我可以向你借用英文字典嗎？",
    memoryTip: "向外借入！borrow + 物 + from + 人"
  },
  {
    id: "fc-jh-152", tier: "jhs_2000", category: "會考易混淆字",
    word: "lend", chunk: "lend", ipa: "/l\u025bnd/", pos: "v.",
    icon: "🏫", zh: "借出（給他人）(三態 lend-lent-lent)",
    collocation: "lend sth to sb",
    example: "He kindly lent his spare umbrella to his classmate.", exampleZh: "他親切地將備用雨傘借給了他的同學。",
    memoryTip: "借出給人！lend + 物 + to + 人。三態：lend ➔ lent ➔ lent"
  },
  {
    id: "fc-jh-153", tier: "jhs_2000", category: "會考易混淆字",
    word: "affect", chunk: "af - fect", ipa: "/\u0259\u02c8f\u025bkt/", pos: "v.",
    icon: "🏫", zh: "影響、對...產生作用 (動詞)",
    collocation: "affect health",
    example: "Lack of sleep can seriously affect your academic performance.", exampleZh: "睡眠不足會嚴重影響你的學業表現。",
    memoryTip: "動詞！以 a 起首。常考：Smoking affects health."
  },
  {
    id: "fc-jh-154", tier: "jhs_2000", category: "會考易混淆字",
    word: "effect", chunk: "ef - fect", ipa: "/\u026a\u02c8f\u025bkt/", pos: "n.",
    icon: "🏫", zh: "影響、效果 (名詞)",
    collocation: "have an effect on",
    example: "Regular exercise has a positive effect on your immune system.", exampleZh: "規律運動對你的免疫系統有正面的良好效果。",
    memoryTip: "名詞！以 e 起首。常考片語：have an effect on..."
  },
  {
    id: "fc-jh-155", tier: "jhs_2000", category: "會考易混淆字",
    word: "accept", chunk: "ac - cept", ipa: "/\u0259k\u02c8s\u025bpt/", pos: "v.",
    icon: "🏫", zh: "接受、收下",
    collocation: "accept an invitation",
    example: "She gladly accepted the invitation to the birthday party.", exampleZh: "她欣然接受了參加生日派對的邀請。",
    memoryTip: "ac- (朝向) + cept (收下) ➔ 接受"
  },
  {
    id: "fc-jh-156", tier: "jhs_2000", category: "會考易混淆字",
    word: "except", chunk: "ex - cept", ipa: "/\u026ak\u02c8s\u025bpt/", pos: "prep.",
    icon: "🏫", zh: "除了...之外 (不包含)",
    collocation: "all except",
    example: "Everyone passed the examination except John.", exampleZh: "除了約翰之外，每個人都通過了考試。",
    memoryTip: "ex- (排除在外) ➔ 不包含在內！"
  },
  {
    id: "fc-jh-157", tier: "jhs_2000", category: "會考易混淆字",
    word: "beside", chunk: "be - side", ipa: "/b\u026a\u02c8sa\u026ad/", pos: "prep.",
    icon: "🏫", zh: "在...旁邊 (位置)",
    collocation: "sit beside",
    example: "Come and sit beside me so we can read together.", exampleZh: "過來坐在我身旁，這樣我們可以一起閱讀。",
    memoryTip: "be + side ➔ 在旁邊"
  },
  {
    id: "fc-jh-158", tier: "jhs_2000", category: "會考易混淆字",
    word: "besides", chunk: "be - sides", ipa: "/b\u026a\u02c8sa\u026adz/", pos: "prep. / adv.",
    icon: "🏫", zh: "除了...之外還有；此外",
    collocation: "besides English",
    example: "Besides English, she also speaks fluent Japanese and Spanish.", exampleZh: "除了英文之外，她還能說流利的日文與西班牙文。",
    memoryTip: "字尾多個 s ➔ 表「加上、還有」！"
  },

  // 3. 高中大考 3,000 (SHS 3,000)
  {
    id: "fc-sh-001", tier: "shs_3000", category: "大考核心動詞 / Critical Thinking",
    word: "distinguish", chunk: "dis - tin - guish", ipa: "/d\u026a\u02c8st\u026a\u014b.\u0261w\u026a\u0283/", pos: "v.",
    icon: "🔍", zh: "區分、辨別、使有別於",
    collocation: "distinguish between A and B (區分 A 與 B)",
    example: "Critical readers can readily distinguish between objective facts and personal opinions.", exampleZh: "具備批判思維的讀者能夠輕易區分客觀事實與個人主觀意見。",
    memoryTip: "dis- (分開) + tinct/tinguish (刺/做記號) ➔ 刺上不同記號以分開 ➔ 區分辨別"
  },
  {
    id: "fc-sh-002", tier: "shs_3000", category: "永續發展與跨領域 / Sustainability",
    word: "sustainable", chunk: "sus - tain - a - ble", ipa: "/s\u0259\u02c8ste\u026a.n\u0259.b\u0259l/", pos: "adj.",
    icon: "🌱", zh: "永續的、可持續發展的",
    collocation: "sustainable development (永續發展目標)",
    example: "Solar and wind energy are crucial components of a sustainable green economy.", exampleZh: "太陽能與風能是永續綠色經濟至關重要的基石。",
    memoryTip: "sus- (在下方) + tain (握住/支撐) + -able ➔ 能在底層長久支撐的 ➔ 永續的"
  },
  {
    id: "fc-sh-003", tier: "shs_3000", category: "大考學術閱讀詞彙 / Academic",
    word: "phenomenon", chunk: "phe - nom - e - non", ipa: "/f\u0259\u02c8n\u0251\u02d0.m\u0259.n\u0251\u02d0n/", pos: "n.",
    icon: "🌌", zh: "現象、非凡奇蹟 (複數 phenomena)",
    collocation: "natural phenomenon (自然現象)",
    example: "The northern lights are a breathtaking natural phenomenon visible in polar regions.", exampleZh: "極光是北極地區令人嘆為觀止的自然現象。",
    memoryTip: "希臘字根 phain- (顯現/光芒)。注意複數為 phenomena！"
  },
  {
    id: "fc-sh-004", tier: "shs_3000", category: "科技與創新變革 / Innovation",
    word: "innovative", chunk: "in - no - va - tive", ipa: "/\u02c8\u026an.\u0259.ve\u026a.t\u032c\u026av/", pos: "adj.",
    icon: "💡", zh: "創新的、革新的",
    collocation: "innovative approach / design (創新的途徑/設計)",
    example: "The biotech startup proposed an innovative method for rapid vaccine synthesis.", exampleZh: "該生技新創提出了一種快速合成疫苗的創新方法。",
    memoryTip: "in- (進入) + nov (新，如 novel) + -ative ➔ 注入嶄新思維 ➔ 創新的"
  },
  {
    id: "fc-sh-005", tier: "shs_3000", category: "永續發展與跨領域 / Environment",
    word: "conservation", chunk: "con - ser - va - tion", ipa: "/\u02cck\u0251\u02d0n.s\u025a\u02c8ve\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🛡️", zh: "保育、保護、節約",
    collocation: "wildlife conservation (野生動物保育)",
    example: "Marine conservation programs protect vulnerable coral reefs from ocean warming.", exampleZh: "海洋保育計畫保護脆弱的珊瑚礁免於海洋暖化的威脅。",
    memoryTip: "con- (共同) + serv (保護/保持，如 preserve) + -ation ➔ 共同守護 ➔ 保育"
  },
  {
    id: "fc-sh-006", tier: "shs_3000", category: "人文與社會科學 / Society",
    word: "diversity", chunk: "di - ver - si - ty", ipa: "/d\u026a\u02c8v\u025d\u02d0.s\u0259.t\u032ci/", pos: "n.",
    icon: "🌈", zh: "多樣性、多元化",
    collocation: "biological / cultural diversity (生物/文化多樣性)",
    example: "Tropical rainforests boast the richest biological diversity on our planet.", exampleZh: "熱帶雨林擁有地球上最豐富的生物多樣性。",
    memoryTip: "di- (分開) + vers/vert (轉向，如 convert) + -ity ➔ 轉向不同方向 ➔ 多樣性"
  },
  {
    id: "fc-sh-007", tier: "shs_3000", category: "心理與認知素養 / Psychology",
    word: "resilience", chunk: "re - sil - ience", ipa: "/r\u026a\u02c8z\u026al.j\u0259ns/", pos: "n.",
    icon: "🎋", zh: "韌性、復原力、彈性",
    collocation: "mental / psychological resilience (心理韌性)",
    example: "Children who overcome early adversity often develop remarkable emotional resilience.", exampleZh: "克服早期逆境的孩子往往能培養出非凡的情感韌性。",
    memoryTip: "re- (回) + sili (跳，如 salient) + -ence ➔ 被打擊後能回跳彈起 ➔ 復原力/韌性"
  },
  {
    id: "fc-sh-008", tier: "shs_3000", category: "大考學術閱讀詞彙 / Academic",
    word: "comprehensive", chunk: "com - pre - hen - sive", ipa: "/\u02cck\u0251\u02d0m.pr\u026a\u02c8hen.s\u026av/", pos: "adj.",
    icon: "📚", zh: "全面的、綜合性的、廣泛的",
    collocation: "comprehensive review / survey (全面性的審查/調查)",
    example: "The medical textbook provides a comprehensive overview of human anatomy.", exampleZh: "該醫學教科書提供了人體解剖學的全面性綜述。",
    memoryTip: "com- (完全) + prehens (抓住，如 comprehend) + -ive ➔ 全面囊括抓住 ➔ 廣泛全面的"
  },
  {
    id: "fc-sh-009", tier: "shs_3000", category: "大考核心動詞 / Causality",
    word: "contribute", chunk: "con - trib - ute", ipa: "/k\u0259n\u02c8tr\u026ab.ju\u02d0t/", pos: "v.",
    icon: "🤝", zh: "貢獻、促成、導致",
    collocation: "contribute to + V-ing/N (促成某事/導致某結果)",
    example: "Excessive intake of processed sugar significantly contributes to obesity and heart disease.", exampleZh: "過量攝取精緻糖是導致肥胖與心臟疾病的重大因素。",
    memoryTip: "con- (共同) + tribute (給予/貢獻，如 tribute) ➔ 一起給予 ➔ 貢獻/促成"
  },
  {
    id: "fc-sh-010", tier: "shs_3000", category: "人文與社會科學 / Cognition",
    word: "perspective", chunk: "per - spec - tive", ipa: "/p\u025a\u02c8spek.t\u026av/", pos: "n.",
    icon: "👁️", zh: "視角、觀點、遠景",
    collocation: "from a global perspective (從全球視角來看)",
    example: "Studying abroad allows students to examine domestic issues from an objective perspective.", exampleZh: "出國留學能讓學生從客觀的視角來審視國內議題。",
    memoryTip: "per- (穿透) + spect (看，如 inspect) + -ive ➔ 穿透看清全局 ➔ 視角觀點"
  },
  {
    id: "fc-sh-011", tier: "shs_3000", category: "大考學術閱讀詞彙 / Causality",
    word: "consequence", chunk: "con - se - quence", ipa: "/\u02c8k\u0251\u02d0n.s\u0259.kw\u0259ns/", pos: "n.",
    icon: "📉", zh: "後果、結果 (常指負面影響)",
    collocation: "face the consequences (承擔後果)",
    example: "Rising sea levels are a direct consequence of relentless global greenhouse emissions.", exampleZh: "海平面上升是持續不斷的全球溫室氣體排放所導致的直接後果。",
    memoryTip: "con- (跟隨) + sequ (跟隨，如 sequence) + -ence ➔ 跟在後面發生的事 ➔ 後果"
  },
  {
    id: "fc-sh-012", tier: "shs_3000", category: "大考學術閱讀詞彙 / Academic",
    word: "fundamental", chunk: "fun - da - men - tal", ipa: "/\u02ccf\u028cn.d\u0259\u02c8men.t\u032c\u0259l/", pos: "adj.",
    icon: "🧱", zh: "基礎的、根本的、不可或缺的",
    collocation: "fundamental human rights (基本人權)",
    example: "Freedom of speech is recognized as a fundamental principle in modern democracies.", exampleZh: "言論自由在現代民主體制中被公認為一項根本原則。",
    memoryTip: "foundation (地基) ➔ 位於地基底層的 ➔ 基礎根本的"
  },
  {
    id: "fc-sh-013", tier: "shs_3000", category: "大考學術閱讀詞彙 / Philosophy",
    word: "inevitable", chunk: "in - ev - i - ta - ble", ipa: "/\u02cc\u026an\u02c8ev.\u0259.t\u032c\u0259.b\u0259l/", pos: "adj.",
    icon: "⏳", zh: "不可避免的、必然發生的",
    collocation: "inevitable trend / outcome (不可避免的趨勢/結果)",
    example: "As technology advances, structural changes in the job market are entirely inevitable.", exampleZh: "隨著科技進步，就業市場的結構性變革是完全不可避免的。",
    memoryTip: "in- (不) + evit (避開) + -able ➔ 無法避開的 ➔ 不可避免的"
  },
  {
    id: "fc-sh-014", tier: "shs_3000", category: "大考核心動詞 / Social",
    word: "participate", chunk: "par - tic - i - pate", ipa: "/p\u0251\u02d0r\u02c8t\u026as.\u0259.pe\u026at/", pos: "v.",
    icon: "🙋", zh: "參加、參與 (常搭配 in)",
    collocation: "participate in public affairs (參與公共事務)",
    example: "Citizens are strongly encouraged to participate in community volunteer projects.", exampleZh: "政府強烈鼓勵公民參與社區志工服務方案。",
    memoryTip: "part (部分) + cip (拿取) + -ate ➔ 拿取一份份額 ➔ 參與"
  },
  {
    id: "fc-sh-015", tier: "shs_3000", category: "大考核心動詞 / Problem Solving",
    word: "eliminate", chunk: "e - lim - i - nate", ipa: "/i\u02c8l\u026am.\u0259.ne\u026at/", pos: "v.",
    icon: "❌", zh: "消除、淘汰、排除",
    collocation: "eliminate poverty / discrimination (消除貧困/歧視)",
    example: "Strict hygiene regulations helped eliminate the spread of bacterial infections in hospitals.", exampleZh: "嚴格的衛生規範協助醫院消除了細菌感染的擴散。",
    memoryTip: "e- (出) + limin (門檻，如 limit) + -ate ➔ 推到門檻之外 ➔ 淘汰消除"
  },
  {
    id: "fc-sh-016", tier: "shs_3000", category: "大考核心動詞 / Function",
    word: "substitute", chunk: "sub - sti - tute", ipa: "/\u02c8s\u028cb.st\u0259.tu\u02d0t/", pos: "v. / n.",
    icon: "🔄", zh: "代替、替代；替代品",
    collocation: "substitute A for B (用 A 取代 B)",
    example: "Chefs frequently substitute honey for refined sugar in healthy baking recipes.", exampleZh: "主廚在健康烘焙食譜中經常以蜂蜜代替精緻糖。",
    memoryTip: "sub- (在下方) + stit/stat (站立) ➔ 站在底下遞補 ➔ 替代"
  },
  {
    id: "fc-sh-017", tier: "shs_3000", category: "人文與社會科學 / Politics",
    word: "advocate", chunk: "ad - vo - cate", ipa: "/\u02c8\u00e6d.v\u0259.ke\u026at/", pos: "v. / n.",
    icon: "📢", zh: "提倡、主張；擁護者",
    collocation: "advocate for environmental reform (提倡環境改革)",
    example: "Prominent activists actively advocate for educational equality in underprivileged regions.", exampleZh: "知名社運人士積極為弱勢地區的教育平等倡導發聲。",
    memoryTip: "ad- (朝向) + voc (聲音，如 voice) + -ate ➔ 為某事發聲 ➔ 提倡擁護"
  },
  {
    id: "fc-sh-018", tier: "shs_3000", category: "社會與人際溝通 / Negotiation",
    word: "compromise", chunk: "com - pro - mise", ipa: "/\u02c8k\u0251\u02d0m.pr\u0259.ma\u026az/", pos: "n. / v.",
    icon: "🤝", zh: "妥協、折衷；危及 (安全/名譽)",
    collocation: "reach a compromise (達成妥協)",
    example: "After intense deliberation, both political parties finally reached a mutual compromise.", exampleZh: "在經過激烈審議後，兩黨終於達成了相互妥協。",
    memoryTip: "com- (共同) + promise (承諾) ➔ 彼此共同做出讓步承諾 ➔ 妥協"
  },
  {
    id: "fc-sh-019", tier: "shs_3000", category: "大考學術閱讀詞彙 / Academic",
    word: "indispensable", chunk: "in - dis - pen - sa - ble", ipa: "/\u02cc\u026an.d\u026a\u02c8spen.s\u0259.b\u0259l/", pos: "adj.",
    icon: "💎", zh: "不可或缺的、絕對必要的",
    collocation: "an indispensable tool / resource (不可或缺的工具/資源)",
    example: "Smartphones have become an indispensable part of daily communication and logistics.", exampleZh: "智慧型手機已成為現代日常通訊與物流中不可或缺的一部分。",
    memoryTip: "in- (不) + dispense (分發/省去) + -able ➔ 無法省去的 ➔ 不可或缺的"
  },
  {
    id: "fc-sh-020", tier: "shs_3000", category: "大考核心動詞 / Economy & Mind",
    word: "stimulate", chunk: "stim - u - late", ipa: "/\u02c8st\u026am.j\u0259.le\u026at/", pos: "v.",
    icon: "⚡", zh: "刺激、促進、激勵",
    collocation: "stimulate economic growth (促進經濟成長)",
    example: "Lowering interest rates is designed to stimulate investment and job creation.", exampleZh: "降低利率旨在刺激企業投資並創造就業機會。",
    memoryTip: "stimulus (刺針/刺激物) ➔ 像針刺激動 ➔ 促進激發"
  },
  {
    id: "fc-sh-021", tier: "shs_3000", category: "大考核心動詞 / Change",
    word: "deteriorate", chunk: "de - te - ri - o - rate", ipa: "/d\u026a\u02c8t\u026ar.i.\u0259.re\u026at/", pos: "v.",
    icon: "📉", zh: "惡化、退化、變壞",
    collocation: "relations deteriorate rapidly (關係急劇惡化)",
    example: "Air quality continues to deteriorate due to heavy industrial emissions and wildfire smoke.", exampleZh: "由於大量工業排放與野火濃煙，空氣品質持續惡化。",
    memoryTip: "de- (向下) + terior (更壞) + -ate ➔ 每況愈下 ➔ 惡化"
  },
  {
    id: "fc-sh-022", tier: "shs_3000", category: "科技與創新變革 / Change",
    word: "transform", chunk: "trans - form", ipa: "/tr\u00e6n\u02c8sf\u0254\u02d0rm/", pos: "v.",
    icon: "🦋", zh: "轉變、改造、改觀",
    collocation: "transform into a digital hub (轉型為數位樞紐)",
    example: "Artificial intelligence is set to transform the healthcare diagnostics industry.", exampleZh: "人工智慧將全面改造醫療診斷產業的運作樣貌。",
    memoryTip: "trans- (跨越/轉移) + form (形狀) ➔ 改變形貌 ➔ 改造轉型"
  },
  {
    id: "fc-sh-023", tier: "shs_3000", category: "自然與地理 / Environment",
    word: "abundant", chunk: "a - bun - dant", ipa: "/\u0259\u02c8b\u028cn.d\u0259nt/", pos: "adj.",
    icon: "🌾", zh: "豐富的、充沛的、大量的",
    collocation: "abundant natural resources (豐沛的天然資源)",
    example: "The island is blessed with abundant sunshine and geothermal energy reserves.", exampleZh: "該島嶼得天獨厚，擁有豐富的陽光與地熱能源儲備。",
    memoryTip: "ab- (溢出) + und (波浪，如 wave/surround) + -ant ➔ 像波浪滿溢 ➔ 豐富充裕的"
  },
  {
    id: "fc-sh-024", tier: "shs_3000", category: "大考學術閱讀詞彙 / Time",
    word: "coincide", chunk: "co - in - cide", ipa: "/\u02ccko\u028a.\u026an\u02c8sa\u026ad/", pos: "v.",
    icon: "⏱️", zh: "巧合、同時發生；一致 (搭配 with)",
    collocation: "coincide with the annual festival (巧合與年度節慶同時發生)",
    example: "The scientific conference was scheduled to coincide with the solar eclipse.", exampleZh: "該科學研討會特意安排與日全食天文奇景同時間舉行。",
    memoryTip: "co- (共同) + in- (在內) + cid/cad (掉落，如 accident) ➔ 一起掉落發生 ➔ 同時發生"
  },
  {
    id: "fc-sh-025", tier: "shs_3000", category: "心理與認知素養 / Psychology",
    word: "reluctant", chunk: "re - luc - tant", ipa: "/r\u026a\u02c8l\u028ck.t\u0259nt/", pos: "adj.",
    icon: "😣", zh: "不情願的、勉強的",
    collocation: "be reluctant to admit error (不情願承認錯誤)",
    example: "The witness was initially reluctant to testify in court due to safety concerns.", exampleZh: "該證人出於安全考量，起初十分不情願在法庭上出庭作證。",
    memoryTip: "re- (抵抗) + luct (摔角/掙扎) + -ant ➔ 內心仍在掙扎抵抗 ➔ 不情願的"
  },
  {
    id: "fc-sh-026", tier: "shs_3000", category: "大考核心動詞 / Process",
    word: "accumulate", chunk: "ac - cu - mu - late", ipa: "/\u0259\u02c8kju\u02d0.mj\u0259.le\u026at/", pos: "v.",
    icon: "📦", zh: "積累、積聚、漸增",
    collocation: "accumulate valuable experience (積累寶貴經驗)",
    example: "Toxic microplastics accumulate along the food chain, threatening marine organisms.", exampleZh: "有毒的塑膠微粒在食物鏈中不斷積聚，對海洋生物構成威脅。",
    memoryTip: "ac- (增加) + cumul (堆疊，如 cumulative) + -ate ➔ 向上堆高 ➔ 積累"
  },
  {
    id: "fc-sh-027", tier: "shs_3000", category: "大考核心動詞 / Action",
    word: "tackle", chunk: "tack - le", ipa: "/\u02c8t\u00e6k.\u0259l/", pos: "v.",
    icon: "🤼", zh: "著手應對、解決 (難題)",
    collocation: "tackle the housing crisis (著手解決住房危機)",
    example: "The newly elected municipal council pledged to tackle traffic congestion immediately.", exampleZh: "新當選的市議會承諾立即著手解決嚴重的交通壅塞問題。",
    memoryTip: "源自美式足球擒抱 (tackle) ➔ 迎頭攔截解決問題 ➔ 著手處理"
  },
  {
    id: "fc-sh-028", tier: "shs_3000", category: "社會與人文 / Development",
    word: "flourish", chunk: "flour - ish", ipa: "/\u02c8fl\u025d\u02d0.\u026a\u0283/", pos: "v.",
    icon: "🌸", zh: "繁榮、興盛、茁壯成長",
    collocation: "arts and commerce flourish (藝術與商務蓬勃繁榮)",
    example: "Independent bookstores flourish in neighborhoods with active reading communities.", exampleZh: "獨立書店在擁有活躍閱讀社群的街區中蓬勃發展。",
    memoryTip: "flour/flor (花朵，如 flora) + -ish ➔ 繁花盛開 ➔ 繁榮興盛"
  },
  {
    id: "fc-sh-029", tier: "shs_3000", category: "心理與認知素養 / Virtue",
    word: "perseverance", chunk: "per - se - ver - ance", ipa: "/\u02ccp\u025d\u02d0.s\u0259\u02c8v\u026ar.\u0259ns/", pos: "n.",
    icon: "🧗", zh: "堅持不懈、毅力",
    collocation: "show great perseverance (展現無比毅力)",
    example: "Through sheer perseverance and hard study, she passed the rigorous bar exam.", exampleZh: "憑藉堅忍不拔的毅力與苦讀，她順利通過了嚴格的律師考試。",
    memoryTip: "per- (始終) + severe (嚴格) + -ance ➔ 始終嚴以律己堅持到底 ➔ 堅忍不拔"
  },
  {
    id: "fc-sh-030", tier: "shs_3000", category: "社會與環境 / Condition",
    word: "vulnerable", chunk: "vul - ner - a - ble", ipa: "/\u02c8v\u028cl.n\u025a.\u0259.b\u0259l/", pos: "adj.",
    icon: "🛡️", zh: "脆弱的、易受傷害的",
    collocation: "vulnerable to cyberattacks (易遭受網路攻擊的)",
    example: "Elderly populations and infants are particularly vulnerable during intense heatwaves.", exampleZh: "年長者與嬰幼兒在強烈熱浪侵襲期間特別脆弱易受危害。",
    memoryTip: "vulner (傷口) + -able ➔ 容易受傷的 ➔ 脆弱的"
  },
  {
    id: "fc-sh-031", tier: "shs_3000", category: "大考核心名詞 / Challenge",
    word: "obstacle", chunk: "ob - sta - cle", ipa: "/\u02c8\u0251\u02d0b.st\u0259.k\u0259l/", pos: "n.",
    icon: "🚧", zh: "障礙、阻礙",
    collocation: "overcome every obstacle (克服重重障礙)",
    example: "Language barriers proved to be a major obstacle during the initial relief mission.", exampleZh: "語言隔閡在初期的救災任務中被證實是一大主要障礙。",
    memoryTip: "ob- (反對/阻擋) + sta (站立) + -cle ➔ 站立在面前阻擋的物體 ➔ 障礙"
  },
  {
    id: "fc-sh-032", tier: "shs_3000", category: "大考學術閱讀詞彙 / Academic",
    word: "profound", chunk: "pro - found", ipa: "/pr\u0259\u02c8fa\u028and/", pos: "adj.",
    icon: "🌊", zh: "深遠的、深刻的、深奧的",
    collocation: "have a profound impact on (對...產生深遠影響)",
    example: "The invention of the printing press had a profound influence on European literacy.", exampleZh: "活字印刷術的發明對歐洲人的識字率產生了深遠的影響。",
    memoryTip: "pro- (向前) + fund (底部，如 foundation) ➔ 直探最底部 ➔ 深沉深遠的"
  },
  {
    id: "fc-sh-033", tier: "shs_3000", category: "心理與行為 / Nature",
    word: "spontaneous", chunk: "spon - ta - ne - ous", ipa: "/sp\u0251\u02d0n\u02c8te\u026a.ni.\u0259s/", pos: "adj.",
    icon: "⚡", zh: "自發的、自然產生的、隨興的",
    collocation: "spontaneous applause (自發的熱烈掌聲)",
    example: "The audience erupted into spontaneous applause at the end of the virtuoso's solo.", exampleZh: "音樂大師獨奏結束時，觀眾席爆發出熱烈而自發的掌聲。",
    memoryTip: "sponte (出於自願) + -ous ➔ 自主產生無人強迫的 ➔ 自發的"
  },
  {
    id: "fc-sh-034", tier: "shs_3000", category: "人文與社會科學 / Society",
    word: "prejudice", chunk: "prej - u - dice", ipa: "/\u02c8pred\u0292.\u0259.d\u026as/", pos: "n. / v.",
    icon: "⚖️", zh: "偏見、歧視；使產生偏見",
    collocation: "racial / gender prejudice (種族/性別偏見)",
    example: "Education serves as an effective weapon to eradicate irrational social prejudices.", exampleZh: "教育是根除社會中不合理偏見與歧見的有力武器。",
    memoryTip: "pre- (預先) + judice (審判/判決，如 judge) ➔ 尚未看清事實就先入為主預先下判決 ➔ 偏見"
  },
  {
    id: "fc-sh-035", tier: "shs_3000", category: "大考學術閱讀詞彙 / Intensity",
    word: "drastic", chunk: "dras - tic", ipa: "/\u02c8dr\u00e6s.t\u026ak/", pos: "adj.",
    icon: "💥", zh: "嚴厲的、劇烈的、猛烈的",
    collocation: "drastic measures / changes (嚴厲措施/劇烈變動)",
    example: "The government took drastic measures to curb soaring inflation and housing prices.", exampleZh: "政府採取嚴厲手段以抑制飆升的通貨膨脹與房價。",
    memoryTip: "dras- (行動/去做，如 drama) + -tic ➔ 動作猛烈的 ➔ 劇烈的/嚴厲的"
  },
  {
    id: "fc-sh-036", tier: "shs_3000", category: "大考學術閱讀詞彙 / Trends",
    word: "fluctuate", chunk: "fluc - tu - ate", ipa: "/\u02c8fl\u028ck.t\u0283u.e\u026at/", pos: "v.",
    icon: "📈", zh: "波動、起伏不定",
    collocation: "prices fluctuate widely (價格劇烈波動)",
    example: "Exchange rates often fluctuate in response to international geopolitical instability.", exampleZh: "匯率往往會因應國際地緣政治的不穩定而大幅波動。",
    memoryTip: "fluct (流動/水波，如 fluent/fluid) + -ate ➔ 像水波浪潮般起伏 ➔ 波動"
  },
  {
    id: "fc-sh-037", tier: "shs_3000", category: "大考學術閱讀詞彙 / Time",
    word: "simultaneous", chunk: "si - mul - ta - ne - ous", ipa: "/\u02ccsa\u026a.m\u0259l\u02c8te\u026a.ni.\u0259s/", pos: "adj.",
    icon: "⏱️", zh: "同時發生的、同步的",
    collocation: "simultaneous translation / interpretation (同步口譯)",
    example: "The summit features simultaneous interpretation into six official languages.", exampleZh: "該高峰會提供六種官方語言的同步口譯服務。",
    memoryTip: "simul (相同，如 similar) + -ous ➔ 處在同一時間 ➔ 同時的/同步的"
  },
  {
    id: "fc-sh-038", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "come up with", chunk: "come up with", ipa: "/k\u028cm \u028cp w\u026a\u00f0/", pos: "phr.",
    icon: "💡", zh: "想出 (點子、解方)、提出",
    collocation: "come up with a creative solution (想出創意解方)",
    example: "The engineer came up with an ingenious design that halved production costs.", exampleZh: "該工程師想出了一項精巧設計，使生產成本降低了一半。",
    memoryTip: "come up (浮上腦海) + with ➔ 靈光一現提出想法"
  },
  {
    id: "fc-sh-039", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "bring about", chunk: "bring a - bout", ipa: "/br\u026a\u014b \u0259\u02c8ba\u028at/", pos: "phr.",
    icon: "🌀", zh: "引起、促成、導致 (= cause / lead to)",
    collocation: "bring about profound social reform (促成深刻社會改革)",
    example: "The industrial revolution brought about massive urbanization across Europe.", exampleZh: "工業革命促成了全歐洲範圍的大規模都市化。",
    memoryTip: "bring (帶來) + about (周遭) ➔ 讓周遭產生變革 ➔ 引起促成"
  },
  {
    id: "fc-sh-040", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "cope with", chunk: "cope with", ipa: "/ko\u028ap w\u026a\u00f0/", pos: "phr.",
    icon: "🧘", zh: "應對、處理、克服 (壓力困難)",
    collocation: "cope with extreme stress (應對巨大壓力)",
    example: "Mindfulness meditation helps healthcare professionals cope with daily emotional burnout.", exampleZh: "正念冥想有助於醫護專業人員應對日常的情緒倦怠。",
    memoryTip: "cope (抗衡) + with ➔ 與困難並肩作戰並克服之 ➔ 應對"
  },
  {
    id: "fc-sh-041", tier: "shs_3000", category: "大考高頻動詞片語 / Causality",
    word: "result in", chunk: "re - sult in", ipa: "/r\u026a\u02c8z\u028clt \u026an/", pos: "phr.",
    icon: "🎯", zh: "導致、造成 (= lead to / cause)",
    collocation: "result in heavy casualties (造成重大傷亡)",
    example: "Careless driving and icy highway surfaces often result in catastrophic pileups.", exampleZh: "粗心駕駛加上結冰的高速公路路面往往導致災難性的連環車禍。",
    memoryTip: "注意：A result in B (A 導致 B)；A result from B (A 起因於 B)！"
  },
  {
    id: "fc-sh-042", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "put up with", chunk: "put up with", ipa: "/p\u028at \u028cp w\u026a\u00f0/", pos: "phr.",
    icon: "😣", zh: "忍受、容忍 (= tolerate / endure)",
    collocation: "put up with constant noise (忍受持續噪音)",
    example: "She refused to put up with toxic workplace harassment and notified HR immediately.", exampleZh: "她拒絕容忍職場有毒騷擾行為，並立即通報了人力資源部。",
    memoryTip: "put up (架起心靈圍牆) + with ➔ 勉強隱忍支撐"
  },
  {
    id: "fc-sh-043", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "take for granted", chunk: "take for gran - ted", ipa: "/te\u026ak f\u0254\u02d0r \u02c8\u0261r\u00e6n.t\u026ad/", pos: "phr.",
    icon: "🤲", zh: "視為理所當然",
    collocation: "take sth for granted (將某事視為理所當然)",
    example: "We must never take our democratic freedoms and clean drinking water for granted.", exampleZh: "我們絕不可將民主自由與純淨飲用水視為理所當然。",
    memoryTip: "grant (天賜/核准) ➔ 自認理應享受 ➔ 視為理所當然"
  },
  {
    id: "fc-sh-044", tier: "shs_3000", category: "大考高頻動詞片語 / Grammar",
    word: "look forward to", chunk: "look for - ward to", ipa: "/l\u028ak \u02c8f\u0254\u02d0r.w\u025ad tu\u02d0/", pos: "phr.",
    icon: "🌅", zh: "引頸期盼、期待 (to 為介系詞後接 V-ing/N)",
    collocation: "look forward to hearing from you (期待收到您的來信)",
    example: "Graduating seniors eagerly look forward to starting their college journeys.", exampleZh: "高三畢業生滿懷熱忱，期待著展開他們的大學生涯。",
    memoryTip: "大考文法陷阱：此處 to 是介系詞！後方必須接動名詞 (V-ing) 或名詞！"
  },
  {
    id: "fc-sh-045", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "carry out", chunk: "car - ry out", ipa: "/\u02c8k\u00e6r.i a\u028at/", pos: "phr.",
    icon: "📋", zh: "貫徹、執行 (計畫、實驗、命令)",
    collocation: "carry out scientific experiments (執行科學實驗)",
    example: "The laboratory carried out rigorous clinical trials to ensure medication safety.", exampleZh: "該實驗室執行了嚴謹的臨床試驗以確保藥物安全性。",
    memoryTip: "carry (搬運) + out (出來) ➔ 將紙上計畫搬出來實行 ➔ 貫徹執行"
  },
  {
    id: "fc-sh-046", tier: "shs_3000", category: "大考高頻動詞片語 / Causality",
    word: "give rise to", chunk: "give rise to", ipa: "/\u0261\u026av ra\u026az tu\u02d0/", pos: "phr.",
    icon: "⚡", zh: "引起、招致、導致",
    collocation: "give rise to intense debate (引發激烈論戰)",
    example: "The controversial new zoning policy gave rise to heated protests in city hall.", exampleZh: "引發爭議的新土地分區政策在市議會激起了激烈的抗議。",
    memoryTip: "give (給予) + rise (上升機會) ➔ 讓爭端冒出頭 ➔ 引起促成"
  },
  {
    id: "fc-sh-047", tier: "shs_3000", category: "大考高頻動詞片語 / Meaning",
    word: "stand for", chunk: "stand for", ipa: "/st\u00e6nd f\u0254\u02d0r/", pos: "phr.",
    icon: "🏛️", zh: "代表、象徵；支持 (理念)",
    collocation: "stand for justice and equity (代表並捍衛正義與公平)",
    example: "The acronym UNESCO stands for United Nations Educational, Scientific and Cultural Organization.", exampleZh: "縮寫 UNESCO 代表聯合國教科文組織。",
    memoryTip: "stand (站立) + for (為了) ➔ 為某理念挺身而立 ➔ 代表/支持"
  },
  {
    id: "fc-sh-048", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "take advantage of", chunk: "take ad - van - tage of", ipa: "/te\u026ak \u0259d\u02c8v\u00e6n.t\u032c\u026ad\u0292 \u028cv/", pos: "phr.",
    icon: "🎯", zh: "利用 (機會)；占...便宜",
    collocation: "take full advantage of the opportunity (充分利用這次良機)",
    example: "Ambitious students take advantage of library databases to broaden their academic research.", exampleZh: "有抱負的學生善用圖書館資料庫來拓展他們的學術研究。",
    memoryTip: "advantage (優勢) ➔ 抓住優勢 ➔ 充分利用"
  },
  {
    id: "fc-sh-049", tier: "shs_3000", category: "大考高頻動詞片語 / Phrasal Verbs",
    word: "turn down", chunk: "turn down", ipa: "/t\u025d\u02d0n da\u028an/", pos: "phr.",
    icon: "🙅", zh: "拒絕 (提議/邀請)；調低 (音量)",
    collocation: "turn down the job offer (婉拒工作錄取)",
    example: "He had to turn down the prestigious fellowship because of family obligations.", exampleZh: "由於家庭責任，他不得不婉拒那項享負盛名的研究學者職位。",
    memoryTip: "turn (轉) + down (向下) ➔ 把大拇指朝下 ➔ 拒絕"
  },
  {
    id: "fc-sh-050", tier: "shs_3000", category: "大考高頻動詞片語 / Logic",
    word: "make sense", chunk: "make sense", ipa: "/me\u026ak sens/", pos: "phr.",
    icon: "🧠", zh: "有道理、合乎邏輯、講得通",
    collocation: "make good sense (十分有道理)",
    example: "After re-evaluating the financial forecast, the CEO's austerity plan makes complete sense.", exampleZh: "在重新評估財務預測後，執行長的緊縮開支計畫完全說得通。",
    memoryTip: "sense (感覺/道理) ➔ 製造出道理 ➔ 合乎邏輯"
  },
  {
    id: "fc-sh-051", tier: "shs_3000", category: "大考高頻動詞片語 / Connection",
    word: "in terms of", chunk: "in terms of", ipa: "/\u026an t\u025d\u02d0mz \u028cv/", pos: "phr.",
    icon: "📐", zh: "就...而言、從...角度來看",
    collocation: "in terms of cost efficiency (就成本效益而言)",
    example: "In terms of academic reputation and research output, the university ranks in the top five.", exampleZh: "就學術聲望與研究產出而言，該大學穩居全國前五名。",
    memoryTip: "terms (條件/字眼) ➔ 在該範疇字眼之內 ➔ 就...而言"
  },
  {
    id: "fc-sh-052", tier: "shs_3000", category: "大考高頻動詞片語 / Representation",
    word: "on behalf of", chunk: "on be - half of", ipa: "/\u0251\u02d0n b\u026a\u02c8h\u00e6f \u028cv/", pos: "phr.",
    icon: "👥", zh: "代表、代為",
    collocation: "on behalf of the entire committee (代表全體委員會)",
    example: "The principal delivered an inspiring speech on behalf of the faculty and staff.", exampleZh: "校長代表全體教職員工發表了一場振奮人心的演說。",
    memoryTip: "behalf (利益/方面) ➔ 站在對方的立場說話 ➔ 代表某人"
  },
  {
    id: "fc-sh-053", tier: "shs_3000", category: "大考高頻動詞片語 / Contrast",
    word: "in spite of", chunk: "in spite of", ipa: "/\u026an spa\u026at \u028cv/", pos: "phr.",
    icon: "⛈️", zh: "儘管、不管 (= despite，介系詞後接名詞/V-ing)",
    collocation: "in spite of bad weather (儘管天氣惡劣)",
    example: "In spite of torrential downpours, the marathon runners pushed on toward the finish line.", exampleZh: "儘管傾盆大雨，馬拉松跑者依然奮勇奔向終點線。",
    memoryTip: "spite (惡意/藐視) ➔ 藐視困難前進 ➔ 儘管 (= despite)"
  },
  {
    id: "fc-sh-054", tier: "shs_3000", category: "大考高頻動詞片語 / Condition",
    word: "as long as", chunk: "as long as", ipa: "/\u00e6z l\u0251\u02d0\u014b \u00e6z/", pos: "phr.",
    icon: "⛓️", zh: "只要 (引導條件子句)",
    collocation: "as long as you keep trying (只要你持續努力)",
    example: "You are welcome to borrow the laboratory equipment as long as you return it intact.", exampleZh: "只要你完好無損地歸還，非常歡迎你借用實驗室設備。",
    memoryTip: "表條件「只要」；表時間則為「長達...之久」"
  },

  // 4. TOEIC 多益國際商務 1,500 (TOEIC Business)
  {
    id: "fc-to-001", tier: "toeic", category: "商務合約與談判 / Contracts",
    word: "negotiation", chunk: "ne - go - ti - a - tion", ipa: "/n\u026a\u02cc\u0261o\u028a.\u0283i\u02c8e\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🤝", zh: "談判、協商、交涉",
    collocation: "contract negotiations (合約談判)",
    example: "After weeks of intensive negotiations, both multinational corporations signed the merger agreement.", exampleZh: "經過數週的密集協商，兩家跨國企業終於簽署了合併協議。",
    memoryTip: "ti 在母音前發軟音 /ʃi/，tion 發 /ʃən/。TOEIC 聽力 Part 3/4 極高頻！"
  },
  {
    id: "fc-to-002", tier: "toeic", category: "公司運營與行程 / Operations",
    word: "itinerary", chunk: "i - tin - er - ar - y", ipa: "/a\u026a\u02c8t\u026an.\u0259.r\u025br.i/", pos: "n.",
    icon: "✈️", zh: "行程表、差旅行程規劃",
    collocation: "travel / flight itinerary (差旅/航班行程表)",
    example: "The executive administrative assistant emailed the comprehensive business itinerary to the sales director.", exampleZh: "執行行政助理已將詳細的商務行程表以電子郵件寄給業務總監。",
    memoryTip: "itin- (走動/旅行，同 exit) + -ary (名詞，相關物品) ➔ 旅程表"
  },
  {
    id: "fc-to-003", tier: "toeic", category: "財務與採購 / Finance",
    word: "reimburse", chunk: "re - im - burse", ipa: "/\u02ccri\u02d0.\u026am\u02c8b\u025c\u02d0rs/", pos: "v.",
    icon: "💳", zh: "核銷、報銷、補償 (款項)",
    collocation: "reimburse travel expenses (報銷出差費用)",
    example: "Employees must submit original itemized receipts within thirty days to be reimbursed for meal expenses.", exampleZh: "員工必須在三十天內提交原始明細收據，以利核銷差旅餐飲費用。",
    memoryTip: "re- (回) + im- (入) + purse (錢包) ➔ 把墊付的錢放回錢包 ➔ 報銷"
  },
  {
    id: "fc-to-004", tier: "toeic", category: "策略與政策執行 / Execution",
    word: "implement", chunk: "im - ple - ment", ipa: "/\u02c8\u026am.pl\u0259.m\u0259nt/", pos: "v. / n.",
    icon: "⚙️", zh: "貫徹執行、實施；工具",
    collocation: "implement a strict quality control policy (實施嚴格品管政策)",
    example: "Management decided to implement an automated inventory tracking software across all regional warehouses.", exampleZh: "管理層決定在所有區域倉庫全面實施自動化庫存追蹤軟體。",
    memoryTip: "im- (進入) + ple (填滿，同 complete) ➔ 將方案填滿落實 ➔ 貫徹執行"
  },
  {
    id: "fc-to-005", tier: "toeic", category: "客戶接待與設施 / Hospitality",
    word: "accommodate", chunk: "ac - com - mo - date", ipa: "/\u0259\u02c8k\u0251\u02d0.m\u0259.de\u026at/", pos: "v.",
    icon: "🏨", zh: "容納；迎合、配合 (特殊需求)",
    collocation: "accommodate dietary restrictions (迎合特殊飲食限制)",
    example: "The conference venue can comfortably accommodate up to eight hundred international symposium attendees.", exampleZh: "會議場地能舒適容納多達八百位國際研討會與會者。",
    memoryTip: "雙寫 c 與雙寫 m！date 有 Magic E 發長音 /eɪt/。TOEIC 飯店與會議情境必考！"
  },
  {
    id: "fc-to-006", tier: "toeic", category: "財務與採購 / Procurement",
    word: "procurement", chunk: "pro - cure - ment", ipa: "/pr\u0259\u02c8kj\u028ar.m\u0259nt/", pos: "n.",
    icon: "📦", zh: "政府/企業採購、調度",
    collocation: "procurement department (採購部門)",
    example: "The procurement manager negotiated bulk purchasing discounts with three certified vendors.", exampleZh: "採購經理與三家合格供應商洽談了大宗採購的折扣優惠。",
    memoryTip: "pro- (向前) + cure (照顧/設法弄到) + -ment ➔ 設法為公司取得物資 ➔ 採購"
  },
  {
    id: "fc-to-007", tier: "toeic", category: "物流與製造管理 / Production",
    word: "specifications", chunk: "spec - i - fi - ca - tions", ipa: "/\u02ccspes.\u0259.f\u026a\u02c8ke\u026a.\u0283\u0259nz/", pos: "n.",
    icon: "📐", zh: "產品規格、技術明細 (常複數)",
    collocation: "meet technical specifications (符合技術規格標準)",
    example: "The manufactured microchips must strictly comply with international semiconductor specifications.", exampleZh: "製造出的晶片必須嚴格符合國際半導體規格標準。",
    memoryTip: "specific (明確具體的) ➔ 規格明細書"
  },
  {
    id: "fc-to-008", tier: "toeic", category: "公司運營與行程 / Meetings",
    word: "agenda", chunk: "a - gen - da", ipa: "/\u0259\u02c8d\u0292en.d\u0259/", pos: "n.",
    icon: "📋", zh: "會議議程、代辦事項",
    collocation: "items on the agenda (議程上的討論事項)",
    example: "The board chairperson distributed the revised quarterly agenda before opening the annual meeting.", exampleZh: "董事會主席在年度大會開幕前發送了修訂後的季度議程。",
    memoryTip: "ag- (做/行動，如 agent) ➔ 要付諸行動的事項清單 ➔ 議程"
  },
  {
    id: "fc-to-009", tier: "toeic", category: "財務與採購 / Finance",
    word: "revenue", chunk: "rev - e - nue", ipa: "/\u02c8rev.\u0259.nu\u02d0/", pos: "n.",
    icon: "💰", zh: "營收、收入 (指公司營業額)",
    collocation: "annual revenue growth (年度營收增長)",
    example: "Quarterly earnings reports showed a twelve percent surge in overseas subscription revenue.", exampleZh: "季度財報顯示海外訂閱營收大幅攀升了百分之十二。",
    memoryTip: "re- (回) + ven (來，如 venue) ➔ 資金回流 ➔ 營收"
  },
  {
    id: "fc-to-010", tier: "toeic", category: "商務合約與談判 / Customer Service",
    word: "warranty", chunk: "war - ran - ty", ipa: "/\u02c8w\u0254\u02d0r.\u0259n.t\u032ci/", pos: "n.",
    icon: "🛡️", zh: "產品保固、維修保證書",
    collocation: "under warranty (在保固期內)",
    example: "All purchased electronic appliances come with a two-year limited manufacturer warranty.", exampleZh: "所有購買的電子家電均附有製造商提供的兩年有限保固。",
    memoryTip: "warrant (保證/授權) + -y ➔ 保固書"
  },
  {
    id: "fc-to-011", tier: "toeic", category: "人力資源與招募 / Leadership",
    word: "delegate", chunk: "del - e - gate", ipa: "/\u02c8del.\u0259.\u0261\u0259t/ (n.) , /-\u0261e\u026at/ (v.)", pos: "n. / v.",
    icon: "👥", zh: "會議代表；委派、授權 (工作責任)",
    collocation: "delegate tasks to subordinates (委派任務給下屬)",
    example: "Effective executives learn how to delegate operational responsibilities to experienced team leaders.", exampleZh: "高效的企業主管懂得如何將日常營運職責授權委派給資深的團隊組長。",
    memoryTip: "名詞發短母音 /-ɡət/ 代表；動詞發長母音 /-ɡeɪt/ 授權委派"
  },
  {
    id: "fc-to-012", tier: "toeic", category: "物流與製造管理 / Supply Chain",
    word: "logistics", chunk: "lo - gis - tics", ipa: "/l\u0259\u02c8d\u0292\u026as.t\u026aks/", pos: "n.",
    icon: "🚚", zh: "物流、後勤配送規劃",
    collocation: "global supply chain and logistics (全球供應鏈與物流)",
    example: "The e-commerce conglomerate upgraded its regional logistics centers to ensure next-day delivery.", exampleZh: "該電商巨頭升級了區域物流中心以確保隔日送達服務。",
    memoryTip: "源自軍隊後勤調配，商務中指倉儲運輸與貨運供應鏈"
  },
  {
    id: "fc-to-013", tier: "toeic", category: "物流與製造管理 / Inventory",
    word: "inventory", chunk: "in - ven - to - ry", ipa: "/\u02c8\u026an.v\u0259n.t\u0254\u02d0r.i/", pos: "n.",
    icon: "📑", zh: "庫存盤點、存貨清單",
    collocation: "take inventory (進行庫存盤點)",
    example: "The retail warehouse closes for half a day each quarter to conduct a complete physical inventory.", exampleZh: "該零售倉庫每季暫停營業半天以進行全面性的實體庫存盤點。",
    memoryTip: "in- (入) + vent (來到) ➔ 盤點進貨來到倉庫的所有商品 ➔ 庫存"
  },
  {
    id: "fc-to-014", tier: "toeic", category: "商務合約與談判 / Legal",
    word: "confidential", chunk: "con - fi - den - tial", ipa: "/\u02cck\u0251\u02d0n.f\u0259\u02c8den.\u0283\u0259l/", pos: "adj.",
    icon: "🔒", zh: "機密的、保密的",
    collocation: "strictly confidential information (高度機密資訊)",
    example: "All patent blueprints and financial records must be stored in strictly confidential digital vaults.", exampleZh: "所有專利藍圖與財務紀錄都必須儲存在高度機密的數位保險庫中。",
    memoryTip: "con- (加強) + fid (信任，同 confidence) + -tial ➔ 僅能告知受信任之人的 ➔ 機密的"
  },
  {
    id: "fc-to-015", tier: "toeic", category: "商務合約與談判 / Regulatory",
    word: "compliance", chunk: "com - pli - ance", ipa: "/k\u0259m\u02c8pla\u026a.\u0259ns/", pos: "n.",
    icon: "⚖️", zh: "法規遵從、合規性 (搭配 with)",
    collocation: "in compliance with safety regulations (符合安全法規)",
    example: "The pharmaceutical manufacturing facility operates in strict compliance with federal FDA standards.", exampleZh: "該製藥生產廠房的營運嚴格遵從聯邦 FDA 的規範標準。",
    memoryTip: "comply with (遵守) ➔ 名詞 compliance"
  },
  {
    id: "fc-to-016", tier: "toeic", category: "策略與政策執行 / M&A",
    word: "merger", chunk: "merg - er", ipa: "/\u02c8m\u025d\u02d0.d\u0292\u025a/", pos: "n.",
    icon: "🏢", zh: "企業合併、兼併",
    collocation: "merger and acquisition (M&A，企業併購)",
    example: "The proposed merger between the two airline corporations awaits antitrust regulatory approval.", exampleZh: "兩家航空公司擬議中的合併案正在等待反托拉斯監管機構的審查批准。",
    memoryTip: "merge (融入/結合) + -er ➔ 結合成為一家公司 ➔ 合併"
  },
  {
    id: "fc-to-017", tier: "toeic", category: "財務與採購 / Accounting",
    word: "invoice", chunk: "in - voice", ipa: "/\u02c8\u026an.v\u0254\u026as/", pos: "n. / v.",
    icon: "🧾", zh: "發票、出貨請款單；開立發票",
    collocation: "issue an invoice (開立請款發票)",
    example: "Payment will be remitted within thirty days upon receipt of the official contractor invoice.", exampleZh: "收到承包商的正式請款發票後，款項將在三十天內匯出。",
    memoryTip: "envoi (法語：寄出送出) ➔ 隨貨物寄出的付款明細清單 ➔ 請款單"
  },
  {
    id: "fc-to-018", tier: "toeic", category: "人力資源與招募 / Compensation",
    word: "compensation", chunk: "com - pen - sa - tion", ipa: "/\u02cck\u0251\u02d0m.pen\u02c8se\u026a.\u0283\u0259n/", pos: "n.",
    icon: "💼", zh: "薪資待遇、報酬；補償金",
    collocation: "compensation package (整體薪酬福利方案)",
    example: "The enterprise offers a highly competitive compensation package including comprehensive health insurance.", exampleZh: "該企業提供極具競爭力的薪資福利方案，包含全額健保與績效獎金。",
    memoryTip: "compensate (補償/酬謝) ➔ 勞動付出的報酬 ➔ 薪酬"
  },
  {
    id: "fc-to-019", tier: "toeic", category: "人力資源與招募 / Metrics",
    word: "turnover", chunk: "turn - o - ver", ipa: "/\u02c8t\u025d\u02d0n\u02cco\u028a.v\u025a/", pos: "n.",
    icon: "🔄", zh: "員工離職流動率；商品營業額",
    collocation: "high employee turnover rate (偏高的員工流動率)",
    example: "Implementing flexible telecommuting policies successfully reduced staff turnover by twenty percent.", exampleZh: "實施彈性遠端辦公政策成功使員工離職流動率降低了百分之二十。",
    memoryTip: "turn (轉) + over (翻過去) ➔ 人員頻繁更替流動"
  },
  {
    id: "fc-to-020", tier: "toeic", category: "策略與政策執行 / Planning",
    word: "feasibility", chunk: "fea - si - bil - i - ty", ipa: "/\u02ccfi\u02d0.z\u0259\u02c8b\u026al.\u0259.t\u032ci/", pos: "n.",
    icon: "🔍", zh: "可行性、切實可行",
    collocation: "conduct a feasibility study (執行可行性研究)",
    example: "The urban planning board commissioned a comprehensive feasibility study for the light rail transit.", exampleZh: "都市計畫委員會委託針對輕軌捷運系統進行了全面的可行性研究。",
    memoryTip: "feasible (可行的，同 able to do) + -ity ➔ 可行性"
  },
  {
    id: "fc-to-021", tier: "toeic", category: "人力資源與招募 / HR",
    word: "appraisal", chunk: "ap - prais - al", ipa: "/\u0259\u02c8pre\u026a.z\u0259l/", pos: "n.",
    icon: "📝", zh: "員工績效考核；資產估價",
    collocation: "annual performance appraisal (年度績效考核評估)",
    example: "Promotions and salary increases are determined during the formal year-end performance appraisal.", exampleZh: "升遷與加薪幅度是在正式的年終績效考核期間決定的。",
    memoryTip: "praise (稱讚/評鑑價值) ➔ 評估價值與表現 ➔ 考核估價"
  },
  {
    id: "fc-to-022", tier: "toeic", category: "財務與採購 / Finance",
    word: "deficit", chunk: "def - i - cit", ipa: "/\u02c8def.\u0259.s\u026at/", pos: "n.",
    icon: "📉", zh: "財政赤字、虧損額 (反義詞 surplus)",
    collocation: "budget deficit (預算赤字)",
    example: "The finance director warned that unexpected supply chain disruptions could widen the quarterly deficit.", exampleZh: "財務長警告，非預期的供應鏈中斷可能會擴大本季度的財政赤字。",
    memoryTip: "de- (欠缺) + fic (做) ➔ 入不敷出 ➔ 赤字"
  },
  {
    id: "fc-to-023", tier: "toeic", category: "財務與採購 / Finance",
    word: "surplus", chunk: "sur - plus", ipa: "/\u02c8s\u025d\u02d0.pl\u0259s/", pos: "n. / adj.",
    icon: "📈", zh: "盈餘、過剩；剩餘的 (反義詞 deficit)",
    collocation: "trade surplus (貿易順差盈餘)",
    example: "A strong export performance in semiconductors yielded a record trade surplus this quarter.", exampleZh: "半導體強勁的出口表現為本季度帶來了創紀錄的貿易順差盈餘。",
    memoryTip: "sur- (超過) + plus (加上) ➔ 超過所需留下來的 ➔ 盈餘"
  },
  {
    id: "fc-to-024", tier: "toeic", category: "財務與採購 / Supply Chain",
    word: "vendor", chunk: "ven - dor", ipa: "/\u02c8ven.d\u025a/", pos: "n.",
    icon: "🏪", zh: "供應商、售貨廠商、攤販",
    collocation: "approved vendor list (合格供應商名錄)",
    example: "The corporate procurement team only contracts with vendors who guarantee green manufacturing practices.", exampleZh: "企業採購團隊僅與保證符合綠色製造規範的供應商簽訂合約。",
    memoryTip: "vend (販賣，如 vending machine 自動販賣機) + -or (人/機構) ➔ 供應商"
  },
  {
    id: "fc-to-025", tier: "toeic", category: "策略與政策執行 / Risk",
    word: "contingency", chunk: "con - tin - gen - cy", ipa: "/k\u0259n\u02c8t\u026an.d\u0292\u0259n.si/", pos: "n.",
    icon: "🚨", zh: "緊急應變方案、意外事故預備",
    collocation: "contingency plan (應變方案/備案)",
    example: "The risk management committee formulated a contingency plan in case of power grid failures.", exampleZh: "風險管理委員會擬定了一份緊急應變備案，以防電網發生故障。",
    memoryTip: "con- (共同) + ting/tang (接觸/發生) ➔ 萬一意外降臨時的應對方案 ➔ 備案"
  },
  {
    id: "fc-to-026", tier: "toeic", category: "商務合約與談判 / Legal",
    word: "terminate", chunk: "ter - mi - nate", ipa: "/\u02c8t\u025d\u02d0.m\u0259.ne\u026at/", pos: "v.",
    icon: "🛑", zh: "終止、解除 (合約)、結束",
    collocation: "terminate a contractual agreement (解除合約協議)",
    example: "Either party reserves the legal right to terminate the contract upon thirty days written notice.", exampleZh: "任何一方均保留在提前三十天提出書面通知後終止合約的法定權利。",
    memoryTip: "term (界限/終點，如 terminal 航廈/終點站) + -ate ➔ 到達終點 ➔ 終止合約"
  },
  {
    id: "fc-to-027", tier: "toeic", category: "市場營銷與品牌 / Business",
    word: "lucrative", chunk: "lu - cra - tive", ipa: "/\u02c8lu\u02d0.kr\u0259.t\u032c\u026av/", pos: "adj.",
    icon: "💎", zh: "獲利豐厚的、賺錢的",
    collocation: "lucrative contract / market (獲利豐厚的合約/利潤可觀的市場)",
    example: "Securing the government cloud infrastructure tender proved to be a highly lucrative venture.", exampleZh: "贏得政府雲端基礎建設的標案被證實是一項獲利極為豐厚的商業投資。",
    memoryTip: "lucre (錢財利潤) + -ative ➔ 利潤滾滾的 ➔ 獲利豐厚的"
  },
  {
    id: "fc-to-028", tier: "toeic", category: "公司運營與行程 / Governance",
    word: "unanimous", chunk: "u - nan - i - mous", ipa: "/ju\u02d0\u02c8n\u00e6n.\u0259.m\u0259s/", pos: "adj.",
    icon: "🙋‍♂️", zh: "全體一致的、毫無異議的",
    collocation: "unanimous approval (全體一致批准)",
    example: "The board of directors gave unanimous approval to the appointment of the new chief operating officer.", exampleZh: "董事會全體一致通過了新任營運長的人事任命案。",
    memoryTip: "un- (單一，如 unite) + anim (心智，如 animal) + -ous ➔ 眾人一條心 ➔ 全體一致的"
  },
  {
    id: "fc-to-029", tier: "toeic", category: "策略與政策執行 / Organization",
    word: "affiliate", chunk: "af - fil - i - ate", ipa: "/\u0259\u02c8f\u026al.i.e\u026at/", pos: "n. / v.",
    icon: "🌐", zh: "附屬機構、分公司；使隸屬",
    collocation: "regional corporate affiliate (區域分公司/關係企業)",
    example: "The media conglomerate distributes streaming content through its overseas European affiliates.", exampleZh: "該媒體巨頭透過其海外歐洲分公司與關係機構發行串流影音內容。",
    memoryTip: "af- (朝向) + fili (兒子，如 filial 孝順的) + -ate ➔ 收為子機構 ➔ 附屬機構/分會"
  },
  {
    id: "fc-to-030", tier: "toeic", category: "財務與採購 / Stocks",
    word: "dividend", chunk: "div - i - dend", ipa: "/\u02c8d\u026av.\u0259.dend/", pos: "n.",
    icon: "💵", zh: "股利、紅利 (上市公司配發予股東)",
    collocation: "pay quarterly dividends (配發季度股利)",
    example: "Shareholders rejoiced after the tech corporation declared a substantial cash dividend increase.", exampleZh: "在該科技企業宣布大幅調高現金股利後，廣大股東皆歡欣鼓舞。",
    memoryTip: "divide (分開) + -end ➔ 分發利潤給股東 ➔ 股利紅利"
  },
  {
    id: "fc-to-031", tier: "toeic", category: "策略與政策執行 / Corporate",
    word: "consortium", chunk: "con - sor - ti - um", ipa: "/k\u0259n\u02c8s\u0254\u02d0r.ti.\u0259m/", pos: "n.",
    icon: "🏛️", zh: "企業聯盟、跨國財團、合夥聯合體",
    collocation: "international banking consortium (國際銀行聯合團)",
    example: "A consortium of engineering firms submitted a joint bid to construct the high-speed rail line.", exampleZh: "由多家工程公司組成的聯合財團提交了建造高鐵路線的共同投標書。",
    memoryTip: "con- (共同) + sort (命運/同類) + -ium ➔ 命運相連的聯合組織 ➔ 財團/聯合體"
  },
  {
    id: "fc-to-032", tier: "toeic", category: "公司運營與行程 / Time",
    word: "deadline", chunk: "dead - line", ipa: "/\u02c8ded.la\u026an/", pos: "n.",
    icon: "⏰", zh: "最後截止期限",
    collocation: "meet / miss the strict deadline (趕上/錯過嚴格的截止期限)",
    example: "The engineering team worked overtime to ensure the software release met the launch deadline.", exampleZh: "工程團隊全力加班以確保軟體發表能如期趕上發布截止日。",
    memoryTip: "dead (死) + line (線) ➔ 超過這條線就出局 ➔ 截止死線"
  },
  {
    id: "fc-to-033", tier: "toeic", category: "財務與採購 / Accounting",
    word: "audit", chunk: "au - dit", ipa: "/\u02c8\u0251\u02d0.d\u026at/", pos: "n. / v.",
    icon: "🔍", zh: "查帳、審計、稽核",
    collocation: "annual financial audit (年度財務審計)",
    example: "An external accounting firm conducted an independent audit of the firm's balance sheets.", exampleZh: "一家外部獨立會計師事務所對該公司的資產負債表進行了查帳審計。",
    memoryTip: "aud- (聽，同 audio) ➔ 早期官員透過當面聽取口頭陳述查帳 ➔ 審計稽核"
  },
  {
    id: "fc-to-034", tier: "toeic", category: "商務合約與談判 / Legal",
    word: "liability", chunk: "li - a - bil - i - ty", ipa: "/\u02ccla\u026a.\u0259\u02c8b\u026al.\u0259.t\u032ci/", pos: "n.",
    icon: "⚖️", zh: "法律責任、賠償責任；債務負債",
    collocation: "limited liability company (有限責任公司)",
    example: "The insurance contract clearly outlines the company's liability in cases of equipment failure.", exampleZh: "保險合約清楚明列了公司在設備故障時所應承擔的賠償責任。",
    memoryTip: "liable (有責任的) + -ity ➔ 法律賠償責任；複數 liabilities 表負債"
  },
  {
    id: "fc-to-035", tier: "toeic", category: "策略與政策執行 / Organization",
    word: "subsidiary", chunk: "sub - sid - i - ar - y", ipa: "/s\u0259b\u02c8s\u026ad.i.er.i/", pos: "n. / adj.",
    icon: "🏢", zh: "子公司；次要的、附屬的",
    collocation: "wholly owned subsidiary (百分之百持股子公司)",
    example: "The conglomerate operates fifty subsidiaries in over twenty countries worldwide.", exampleZh: "該企業集團在全球二十多個國家經營著五十家子公司。",
    memoryTip: "sub- (在下方) + sid (坐著，同 reside) ➔ 坐在母公司底下 ➔ 子公司"
  },
  {
    id: "fc-to-036", tier: "toeic", category: "市場營銷與品牌 / Retail",
    word: "franchise", chunk: "fran - chise", ipa: "/\u02c8fr\u00e6n.t\u0283a\u026az/", pos: "n. / v.",
    icon: "🏪", zh: "特許加盟權、經銷權；給予加盟權",
    collocation: "franchise agreement (加盟合約協議)",
    example: "The fast food chain expanded rapidly across Asia by offering attractive franchise opportunities.", exampleZh: "該速食連鎖店透過提供吸引人的特許加盟機會，在亞洲市場迅速擴張。",
    memoryTip: "franc (自由/免稅) ➔ 給予經營特定品牌生意的特權自由 ➔ 加盟權"
  },
  {
    id: "fc-to-037", tier: "toeic", category: "人力資源與招募 / Compensation",
    word: "incentive", chunk: "in - cen - tive", ipa: "/\u026an\u02c8sen.t\u026av/", pos: "n.",
    icon: "🎁", zh: "激勵措施、獎勵誘因、獎金",
    collocation: "financial / sales incentive (財務激勵/業務銷售獎金)",
    example: "The corporation offers performance incentives to top sales representatives every quarter.", exampleZh: "該企業每季為頂尖業務代表提供豐厚的績效獎勵獎金。",
    memoryTip: "in- (進入) + cant/cent (唱歌/歌詠，同 chant) ➔ 唱起號角鼓舞士氣 ➔ 誘因激勵"
  },
  {
    id: "fc-to-038", tier: "toeic", category: "財務與採購 / Investment",
    word: "portfolio", chunk: "port - fo - li - o", ipa: "/p\u0254\u02d0rt\u02c8fo\u028a.li.o\u028a/", pos: "n.",
    icon: "📁", zh: "投資組合；作品集、產品系列",
    collocation: "diversified investment portfolio (多元化的投資組合)",
    example: "Financial advisors recommend building a diversified portfolio to hedge against market volatility.", exampleZh: "財務顧問建議建立多元化的投資組合，以規避市場劇烈波動的風險。",
    memoryTip: "port (攜帶) + folio (活頁紙夾) ➔ 隨身攜帶的證券紙夾或作品集 ➔ 投資組合"
  },
  {
    id: "fc-to-039", tier: "toeic", category: "物流與製造管理 / Retail",
    word: "merchandise", chunk: "mer - chan - dise", ipa: "/\u02c8m\u025d\u02d0.t\u0283\u0259n.da\u026as/", pos: "n. / v.",
    icon: "🛍️", zh: "商品、貨物 (不可數名詞)；推銷商品",
    collocation: "defective merchandise (有瑕疵的商品貨物)",
    example: "Customers can exchange purchased merchandise within fourteen days with an original receipt.", exampleZh: "顧客持原始收據可在十四天內更換所購買的商品。",
    memoryTip: "merchant (商人) ➔ 商人買賣的東西 ➔ 商品 (不可數！)"
  },
  {
    id: "fc-to-040", tier: "toeic", category: "物流與製造管理 / Quality",
    word: "defect", chunk: "de - fect", ipa: "/\u02c8di\u02d0.fekt/ (n.) , /d\u026a\u02c8fekt/ (v.)", pos: "n. / v.",
    icon: "⚠️", zh: "產品缺陷、瑕疵；背叛叛逃",
    collocation: "manufacturing defect (製造瑕疵缺損)",
    example: "All returned smartphones are inspected by quality engineers for microscopic screen defects.", exampleZh: "所有退貨的智慧型手機均由品管工程師檢驗微觀的螢幕瑕疵。",
    memoryTip: "de- (欠缺) + fect (做，同 factor/perfect) ➔ 沒做好的地方 ➔ 瑕疵"
  },
  {
    id: "fc-to-041", tier: "toeic", category: "財務與採購 / Finance",
    word: "fluctuation", chunk: "fluc - tu - a - tion", ipa: "/\u02ccfl\u028ck.t\u0283u\u02c8e\u026a.\u0283\u0259n/", pos: "n.",
    icon: "📉", zh: "價格/匯率波動、上下起伏",
    collocation: "currency exchange fluctuation (外幣匯率波動)",
    example: "Export businesses must hedge against unexpected fluctuations in crude oil prices.", exampleZh: "出口貿易企業必須針對原油價格的意外波動進行避險操作。",
    memoryTip: "fluct (流水/水波) + -ation ➔ 潮起潮落 ➔ 波動"
  },
  {
    id: "fc-to-042", tier: "toeic", category: "商務合約與談判 / Negotiation",
    word: "negotiable", chunk: "ne - go - tia - ble", ipa: "/n\u0259\u02c8\u0261o\u028a.\u0283i.\u0259.b\u0259l/", pos: "adj.",
    icon: "🏷️", zh: "可協商的、價格可議的",
    collocation: "salary is negotiable (薪資待遇面議可協商)",
    example: "The wholesale price per carton is negotiable depending on the volume of the purchase order.", exampleZh: "每箱批發價格可依據採購訂單數量多寡予以協商議定。",
    memoryTip: "negotiate (談判) + -able ➔ 可以再談的 ➔ 可協商的"
  },
  {
    id: "fc-to-043", tier: "toeic", category: "策略與政策執行 / Strategy",
    word: "leverage", chunk: "lev - er - age", ipa: "/\u02c8lev.\u025a.\u026ad\u0292/", pos: "v. / n.",
    icon: "🏗️", zh: "善加利用 (資源/優勢)；槓桿操作",
    collocation: "leverage market leadership (善加發揮市場領先優勢)",
    example: "The brand plans to leverage social media influencers to reach younger consumer demographics.", exampleZh: "該品牌計畫善用社群媒體意見領袖的影響力，以觸及年輕消費客群。",
    memoryTip: "lever (槓桿) ➔ 用槓桿以小博大、充分利用"
  },
  {
    id: "fc-to-044", tier: "toeic", category: "財務與採購 / Legal",
    word: "bankruptcy", chunk: "bank - rupt - cy", ipa: "/\u02c8b\u00e6\u014b.kr\u0259pt.si/", pos: "n.",
    icon: "💥", zh: "破產、倒閉清算",
    collocation: "file for bankruptcy protection (申請破產保護)",
    example: "Faced with crushing debt liabilities, the legacy retailer was forced to declare bankruptcy.", exampleZh: "面臨沉重龐大的債務負擔，這家老牌零售商被迫宣告破產倒閉。",
    memoryTip: "bank (銀行長凳) + rupt (斷裂破碎，同 interrupt) ➔ 錢莊櫃台被砸碎 ➔ 破產"
  },
  {
    id: "fc-to-045", tier: "toeic", category: "策略與政策執行 / Business",
    word: "entrepreneur", chunk: "en - tre - pre - neur", ipa: "/\u02cc\u0251\u02d0n.tr\u0259.pr\u0259\u02c8n\u025d\u02d0/", pos: "n.",
    icon: "🚀", zh: "創業者、企業家",
    collocation: "aspiring tech entrepreneur (有抱負的科技創業者)",
    example: "Venture capital firms invest heavily in promising tech entrepreneurs with disruptive visions.", exampleZh: "創投基金大手筆投資於擁有顛覆性遠見的潛力科技創業者。",
    memoryTip: "法語借詞 entre (在...之間) + preneur (抓取者) ➔ 勇於承擔商業風險開拓新局之人 ➔ 企業家"
  },
  {
    id: "fc-to-046", tier: "toeic", category: "市場營銷與品牌 / Marketing",
    word: "endorsement", chunk: "en - dorse - ment", ipa: "/\u026an\u02c8d\u0254\u02d0rs.m\u0259nt/", pos: "n.",
    icon: "🌟", zh: "名人代言；背書、公開支持",
    collocation: "celebrity product endorsement (名人產品代言)",
    example: "Securing an athletic superstar's endorsement boosted sneaker sales by thirty-five percent.", exampleZh: "贏得體壇巨星的產品代言使該款運動鞋銷量激增了百分之三十五。",
    memoryTip: "dors (背面，同 dorsal fin 背鰭) ➔ 在支票背後簽名背書支持 ➔ 代言背書"
  },
  {
    id: "fc-to-047", tier: "toeic", category: "公司運營與行程 / Facilities",
    word: "headquarters", chunk: "head - quar - ters", ipa: "/\u02c8hed\u02cckw\u0254\u02d0r.t\u032c\u025az/", pos: "n.",
    icon: "🏢", zh: "總公司、企業總部 (單複數同形，常縮寫為 HQ)",
    collocation: "corporate headquarters (企業營運總部)",
    example: "The tech corporation recently relocated its global headquarters to a modern tech park in Silicon Valley.", exampleZh: "該科技公司最近將其全球營運總部遷至矽谷的一座現代化科技園區。",
    memoryTip: "head (首腦) + quarters (駐地營區) ➔ 司令總部/總公司"
  },
  {
    id: "fc-to-048", tier: "toeic", category: "財務與採購 / Economy",
    word: "recession", chunk: "re - ces - sion", ipa: "/r\u026a\u02c8se\u0283.\u0259n/", pos: "n.",
    icon: "📉", zh: "經濟衰退、景氣蕭條",
    collocation: "deep economic recession (嚴重的經濟衰退蕭條)",
    example: "Economists predict a mild recession as consumer interest rates and fuel prices stabilize.", exampleZh: "經濟學家預測，隨著消費者利率與燃料價格趨於穩定，將出現溫和的經濟衰退。",
    memoryTip: "re- (向後) + cess (行走，同 process) + -ion ➔ 經濟往後倒退 ➔ 衰退"
  },

  // 5. Digital SAT 語境學術詞 1,200 (SAT Contextual)
  {
    id: "fc-sat-001", tier: "sat", category: "論據與實證支持 / Empirical",
    word: "corroborate", chunk: "cor - rob - o - rate", ipa: "/k\u0259\u02c8r\u0251\u02d0.b\u0259.re\u026at/", pos: "v.",
    icon: "🔍", zh: "證實、確證、提供客觀證據支持",
    collocation: "corroborate the scientific hypothesis (證實該科學假說)",
    example: "Subsequent radiometric dating corroborated the archaeological timeline uncovered at the excavation site.", exampleZh: "隨後的放射性碳定年法證實了發掘現場出土文物的考古年代時序。",
    memoryTip: "cor- (加強) + robor (強壯/穩固，同 robust) + -ate ➔ 使論據更穩固 ➔ 證實"
  },
  {
    id: "fc-sat-002", tier: "sat", category: "學術修辭與邏輯 / Scientific",
    word: "anomalous", chunk: "a - nom - a - lous", ipa: "/\u0259\u02c8n\u0251\u02d0.m\u0259.l\u0259s/", pos: "adj.",
    icon: "⚠️", zh: "異常的、不規則的、反常規的",
    collocation: "anomalous experimental readings (反常的實驗讀數)",
    example: "Astrophysicists were puzzled by anomalous gravitational fluctuations detected near the dwarf galaxy.", exampleZh: "天文物理學家對在矮星系周圍偵測到的異常重力波動感到十分困惑。",
    memoryTip: "a- (否定/無) + nomos (規則/常規) + -ous ➔ 不合乎常規的 ➔ 異常的"
  },
  {
    id: "fc-sat-003", tier: "sat", category: "論據與實證支持 / Textual Evidence",
    word: "substantiate", chunk: "sub - stan - ti - ate", ipa: "/s\u0259b\u02c8st\u00e6n.\u0283i.e\u026at/", pos: "v.",
    icon: "📜", zh: "以事實證明、證實、使實體化",
    collocation: "substantiate claims with empirical data (以經驗數據佐證主張)",
    example: "Without verifiable documentary records, the historian could not substantiate the oral legend.", exampleZh: "缺乏可查證的文獻檔案記錄，歷史學家無法證實那則口述傳說的真實性。",
    memoryTip: "substance (實質實體) ➔ 為論點提供實質骨肉 ➔ 證實 (= corroborate)"
  },
  {
    id: "fc-sat-004", tier: "sat", category: "學術哲學與決策 / Pragmatism",
    word: "pragmatic", chunk: "prag - mat - ic", ipa: "/pr\u00e6\u0261\u02c8m\u00e6t\u032c.\u026ak/", pos: "adj.",
    icon: "🛠️", zh: "務實的、注重實效的 (反義詞 idealistic / dogmatic)",
    collocation: "a pragmatic policy solution (務實的政策解決方案)",
    example: "Rather than adhering to rigid ideological dogma, the diplomat proposed a pragmatic compromise.", exampleZh: "該外交官並未墨守僵化的意識形態教條，而是提出了一項務實的折衷方案。",
    memoryTip: "prag- (行動/實踐，同 practice) + -ic ➔ 重視實踐結果 ➔ 務實的"
  },
  {
    id: "fc-sat-005", tier: "sat", category: "觀點對比與張力 / Psychology",
    word: "ambivalent", chunk: "am - biv - a - lent", ipa: "/\u00e6m\u02c8b\u026av.\u0259.l\u0259nt/", pos: "adj.",
    icon: "⚖️", zh: "心存矛盾的、悲喜交集的、猶豫不決的",
    collocation: "feel ambivalent about the promotion (對這次升遷心情矛盾)",
    example: "Critics remained ambivalent toward the experimental novel, praising its prose while lamenting its pacing.", exampleZh: "評論家對這部實驗小說態度矛盾，既讚賞其優美散文，又對其情節節奏感到遺憾。",
    memoryTip: "ambi- (兩側，如 amphibian 兩棲) + val (力量/價值) ➔ 兩種力量拉扯 ➔ 矛盾猶豫的"
  },
  {
    id: "fc-sat-006", tier: "sat", category: "學術修辭與邏輯 / Rhetoric",
    word: "disparage", chunk: "dis - par - age", ipa: "/d\u026a\u02c8sp\u00e6r.\u026ad\u0292/", pos: "v.",
    icon: "👎", zh: "貶損、輕蔑、貶低價值",
    collocation: "disparage rivals' achievements (貶低競爭對手的成就)",
    example: "Scholars should debate theoretical arguments constructively rather than disparage opposing viewpoints.", exampleZh: "學者應建設性地探討理論觀點，而非惡意貶低對立方的學術主張。",
    memoryTip: "dis- (否定) + par (同等，同 peer/pair) ➔ 視為不如自己平起平坐 ➔ 貶損輕視"
  },
  {
    id: "fc-sat-007", tier: "sat", category: "學術修辭與邏輯 / Emphasis",
    word: "underscore", chunk: "un - der - score", ipa: "/\u02cc\u028cn.d\u025a\u02c8sk\u0254\u02d0r/", pos: "v.",
    icon: "✍️", zh: "強調、突顯、在底下劃線 (= emphasize)",
    collocation: "underscore the urgent need for reform (突顯改革的迫切需求)",
    example: "The recent seismic event underscores the necessity of reinforcing municipal bridge structures.", exampleZh: "最近發生的地震事件突顯了加固市區橋樑結構的迫切必要性。",
    memoryTip: "under (在...底下) + score (劃線記號) ➔ 在重點底下劃重點線 ➔ 強調突顯"
  },
  {
    id: "fc-sat-008", tier: "sat", category: "歷史與社會政治 / History",
    word: "unprecedented", chunk: "un - prec - e - den - ted", ipa: "/\u028cn\u02c8pres.\u0259.den.t\u032c\u026ad/", pos: "adj.",
    icon: "🚀", zh: "史無前例的、空前的",
    collocation: "unprecedented technological growth (空前的科技爆發成長)",
    example: "The rapid rollout of the global vaccination campaign occurred at an unprecedented speed.", exampleZh: "全球疫苗接種行動的迅速鋪開，是以史上空前未有的速度進行的。",
    memoryTip: "un- (無) + precedent (先例) + -ed ➔ 沒有前例可循的 ➔ 史無前例的"
  },
  {
    id: "fc-sat-009", tier: "sat", category: "歷史與社會政治 / Debate",
    word: "contentious", chunk: "con - ten - tious", ipa: "/k\u0259n\u02c8ten.\u0283\u0259s/", pos: "adj.",
    icon: "🗣️", zh: "有爭議的、引發激烈爭論的",
    collocation: "a contentious constitutional issue (具重大爭議的憲法議題)",
    example: "Allocating municipal tax revenues to private sports stadiums proved to be a highly contentious issue.", exampleZh: "將市政稅收提撥補助私人體育場館，被證實是一個極具爭議的議題。",
    memoryTip: "contend (爭奪/奮戰) + -ious ➔ 容易引發爭奪爭論的 ➔ 有爭議的"
  },
  {
    id: "fc-sat-010", tier: "sat", category: "論據與實證支持 / Methodology",
    word: "empirical", chunk: "em - pir - i - cal", ipa: "/em\u02c8p\u026ar.\u026a.k\u0259l/", pos: "adj.",
    icon: "🧪", zh: "以經驗/實驗為依據的、實證的",
    collocation: "empirical evidence / research (實證證據/經驗研究)",
    example: "Theoretical quantum models require empirical validation through particle accelerator collisions.", exampleZh: "量子力學的理論模型必須透過粒子加速器碰撞實驗的實證檢驗。",
    memoryTip: "em- (在內) + pir (嘗試/試驗，同 experiment) ➔ 靠實際試驗得來的 ➔ 實證的"
  },
  {
    id: "fc-sat-011", tier: "sat", category: "學術哲學與決策 / Knowledge",
    word: "esoteric", chunk: "es - o - ter - ic", ipa: "/\u02cces.\u0259\u02c8ter.\u026ak/", pos: "adj.",
    icon: "🔮", zh: "深奧難懂的、秘傳的 (僅少數圈內人知曉)",
    collocation: "esoteric philosophical doctrines (深奧玄妙的哲學學說)",
    example: "Medieval alchemy texts were intentionally written in esoteric symbols to conceal chemical formulas.", exampleZh: "中世紀煉金術文獻刻意使用深奧難懂的符號撰寫，以隱匿化學配方。",
    memoryTip: "eso- (內在的/圈內的) + -teric ➔ 只有小圈子密友懂得 ➔ 深奧秘傳的"
  },
  {
    id: "fc-sat-012", tier: "sat", category: "人文與社會科學 / Art",
    word: "aesthetic", chunk: "aes - thet - ic", ipa: "/es\u02c8\u03b8et\u032c.\u026ak/", pos: "adj. / n.",
    icon: "🎨", zh: "美學的、審美的；審美標準",
    collocation: "aesthetic appeal / sensibilities (美學吸引力/審美品味)",
    example: "Modern architecture often prioritizes functional simplicity over ornate aesthetic decoration.", exampleZh: "現代建築設計往往將功能性簡潔置於華麗的美學裝飾之上。",
    memoryTip: "希臘字根 aisthet- (知覺/感知) ➔ 感知美的事物 ➔ 美學審美的"
  },
  {
    id: "fc-sat-013", tier: "sat", category: "科技與創新變革 / Ubiquity",
    word: "ubiquitous", chunk: "u - biq - ui - tous", ipa: "/ju\u02d0\u02c8b\u026ak.w\u0259.t\u032c\u0259s/", pos: "adj.",
    icon: "🌐", zh: "無所不在的、普及的 (= omnipresent)",
    collocation: "ubiquitous mobile connectivity (無所不在的行動連線)",
    example: "Touchscreen payment terminals have become ubiquitous in metropolitan cafes and retail shops.", exampleZh: "觸控式感應支付終端機在大都市的咖啡館與零售門市已變得無所不在。",
    memoryTip: "ubi (在哪裡，同 where) + -quitous ➔ 走到哪裡都有 ➔ 無所不在的"
  },
  {
    id: "fc-sat-014", tier: "sat", category: "論據與實證支持 / Argumentation",
    word: "bolster", chunk: "bol - ster", ipa: "/\u02c8bo\u028al.st\u025a/", pos: "v. / n.",
    icon: "🧱", zh: "支撐、加固、支持 (論點或信心)",
    collocation: "bolster the central thesis (支持/鞏固核心論點)",
    example: "The sociologist cited longitudinal demographic statistics to bolster her conclusions.", exampleZh: "該社會學家引用了長期的縱貫人口統計數據來鞏固加強她的結論。",
    memoryTip: "原意為厚長的墊枕 (bolster) ➔ 在背後墊高支撐 ➔ 支持加強"
  },
  {
    id: "fc-sat-015", tier: "sat", category: "文本證據與推論 / Logic",
    word: "plausible", chunk: "plau - si - ble", ipa: "/\u02c8pl\u0251\u02d0.z\u0259.b\u0259l/", pos: "adj.",
    icon: "💡", zh: "貌似合理的、合乎情理的",
    collocation: "a plausible explanation (看似合理的解釋)",
    example: "Paleontologists offered a plausible explanation for the sudden extinction of the apex predators.", exampleZh: "古生物學家對頂級掠食者的驟然滅絕提出了貌似合理的解釋。",
    memoryTip: "plaus/plaud (拍手喝采，同 applaud) + -ible ➔ 令人拍手贊同的 ➔ 貌似合理的"
  },
  {
    id: "fc-sat-016", tier: "sat", category: "論據與實證支持 / Critical Analysis",
    word: "scrutinize", chunk: "scru - ti - nize", ipa: "/\u02c8skru\u02d0.t\u032c\u0259n.a\u026az/", pos: "v.",
    icon: "🧐", zh: "仔細審視、嚴密檢驗、端詳",
    collocation: "scrutinize the financial audit (嚴格審查財務審計報告)",
    example: "Regulatory watchdogs rigorously scrutinize the drug trials before approving retail sales.", exampleZh: "監管機構在批准藥品上市銷售前，會嚴格審視其臨床試驗數據。",
    memoryTip: "scruta (碎片/破爛) ➔ 翻找每個碎片仔細檢查 ➔ 嚴格審視"
  },
  {
    id: "fc-sat-017", tier: "sat", category: "語境詞義辨析 / Clarity",
    word: "lucid", chunk: "lu - cid", ipa: "/\u02c8lu\u02d0.s\u026ad/", pos: "adj.",
    icon: "💡", zh: "清晰易懂的、頭腦清醒明晰的",
    collocation: "lucid explanation / prose (清晰明白的解釋/散文)",
    example: "Despite the intricacy of neurochemistry, the lecturer offered a remarkably lucid explanation.", exampleZh: "儘管神經化學錯綜複雜，該講師依然給出了極其清晰明白的解說。",
    memoryTip: "luc (光亮，同 translucent) ➔ 透著光亮的 ➔ 清晰透徹的"
  },
  {
    id: "fc-sat-018", tier: "sat", category: "學術修辭與邏輯 / Rhetoric",
    word: "elucidate", chunk: "e - lu - ci - date", ipa: "/i\u02c8lu\u02d0.s\u0259.de\u026at/", pos: "v.",
    icon: "🔦", zh: "闡明、解釋清楚",
    collocation: "elucidate the complex theory (闡明複雜理論)",
    example: "The diagrams were specifically designed to elucidate the intricate mechanisms of DNA replication.", exampleZh: "這些圖解專門設計用以闡明 DNA 複製複製過程中的繁複機制。",
    memoryTip: "e- (出) + luc (光) + -idate ➔ 將光照耀出來 ➔ 闡明解釋"
  },
  {
    id: "fc-sat-019", tier: "sat", category: "學術修辭與邏輯 / Style",
    word: "superfluous", chunk: "su - per - flu - ous", ipa: "/su\u02d0\u02c8p\u025d\u02d0.flu.\u0259s/", pos: "adj.",
    icon: "🌊", zh: "多餘的、過剩累贅的",
    collocation: "superfluous details / spending (多餘多贅的細節/過剩支出)",
    example: "The editor eliminated several superfluous paragraphs to improve the rhythm and pacing of the novel.", exampleZh: "編輯刪除了若干多餘累贅的段落，以提升小說的節奏與明快度。",
    memoryTip: "super- (超過) + flu (流動) + -ous ➔ 水滿溢位來 ➔ 多餘過剩的"
  },
  {
    id: "fc-sat-020", tier: "sat", category: "觀點對比與張力 / Contrast",
    word: "paradoxical", chunk: "par - a - dox - i - cal", ipa: "/\u02ccper.\u0259\u02c8d\u0251\u02d0k.s\u026a.k\u0259l/", pos: "adj.",
    icon: "🔄", zh: "自相矛盾的、似非而是的",
    collocation: "a paradoxical outcome (自相矛盾的結果)",
    example: "It is paradoxical that increased automation has sometimes resulted in longer working hours.", exampleZh: "自動化程度提高有時反而導致工時變長，這是一項看似矛盾的現象。",
    memoryTip: "para- (超越/相悖) + dox (觀點信條，同 orthodox) ➔ 與常理觀點相悖 ➔ 矛盾似有理的"
  },
  {
    id: "fc-sat-021", tier: "sat", category: "文本證據與推論 / Tone",
    word: "tentative", chunk: "ten - ta - tive", ipa: "/\u02c8ten.t\u032c\u0259.t\u032c\u026av/", pos: "adj.",
    icon: "🧪", zh: "試驗性的、暫定未決的、猶豫的",
    collocation: "tentative agreement / conclusion (暫定協議/初步試驗結論)",
    example: "The researchers reached a tentative conclusion pending further genomic sequencing confirmation.", exampleZh: "研究人員得出一項初步暫定結論，正等待進一步基因組定序的證實。",
    memoryTip: "tent- (摸索/嘗試，同 attempt) + -ative ➔ 摸石過河嘗試中的 ➔ 暫定的"
  },
  {
    id: "fc-sat-022", tier: "sat", category: "學術修辭與邏輯 / Structure",
    word: "coherent", chunk: "co - her - ent", ipa: "/ko\u028a\u02c8h\u026ar.\u0259nt/", pos: "adj.",
    icon: "🧩", zh: "條理連貫的、前後一致的",
    collocation: "a coherent narrative / argument (條理清晰的敘事/論述)",
    example: "The essay lacks a coherent structure, jumping erratically between unrelated historical epochs.", exampleZh: "該散文缺乏連貫條理的結構，在不相關的歷史時代之間跳躍不定。",
    memoryTip: "co- (共同) + her/hes (黏著，同 adhesive) ➔ 緊密黏合不散漫 ➔ 條理連貫的"
  },
  {
    id: "fc-sat-023", tier: "sat", category: "文本證據與推論 / Critique",
    word: "discredit", chunk: "dis - cred - it", ipa: "/d\u026a\u02c8skred.\u026at/", pos: "v. / n.",
    icon: "❌", zh: "使喪失信譽、懷疑其真實性",
    collocation: "discredit the false rumor (破除不實謠言使其不可信)",
    example: "Rigorous investigative journalism completely discredited the company's misleading environmental claims.", exampleZh: "嚴謹的調查報導徹底推翻了該公司具誤導性的環保宣言，使其名譽掃地。",
    memoryTip: "dis- (去除) + credit (信用) ➔ 剝奪其信用 ➔ 使不可信"
  },
  {
    id: "fc-sat-024", tier: "sat", category: "科技與創新變革 / Change",
    word: "augment", chunk: "aug - ment", ipa: "/\u0251\u02d0\u0261\u02c8ment/", pos: "v.",
    icon: "📈", zh: "增加、擴充、強化",
    collocation: "augment memory / capacity (擴充記憶體/增強產能)",
    example: "Surgeons use augmented reality headsets to guide delicate microsurgical incisions.", exampleZh: "外科醫師使用擴增實境頭戴裝置來引導精細的顯微手術切口。",
    memoryTip: "aug- (增加，同 auction 拍賣/august 尊貴) ➔ 擴充強化"
  },
  {
    id: "fc-sat-025", tier: "sat", category: "歷史與社會政治 / Society",
    word: "polarize", chunk: "po - lar - ize", ipa: "/\u02c8po\u028a.l\u0259.ra\u026az/", pos: "v.",
    icon: "🧲", zh: "使兩極分化、使截然對立",
    collocation: "polarize public sentiment (使公眾輿論走向兩極對立)",
    example: "Economic inequality and sensationalized media tend to polarize national political discourse.", exampleZh: "經濟不平等與煽情化媒體往往導致國家政治論述走向極端兩極化。",
    memoryTip: "polar (極地的/兩極的) + -ize ➔ 走向南北極端 ➔ 使兩極分化"
  },
  {
    id: "fc-sat-026", tier: "sat", category: "論據與實證支持 / Research",
    word: "synthesize", chunk: "syn - the - size", ipa: "/\u02c8s\u026an.\u03b8\u0259.sa\u026az/", pos: "v.",
    icon: "🧬", zh: "綜合、合成、統整各方觀點",
    collocation: "synthesize diverse perspectives (統整多元視角觀點)",
    example: "The concluding chapter synthesizes findings from forty separate international field trials.", exampleZh: "結論章節綜合統整了來自四十項獨立國際田野試驗的研究成果。",
    memoryTip: "syn- (共同) + the (放置) + -ize ➔ 放到一起融會貫通 ➔ 綜合合成"
  },
  {
    id: "fc-sat-027", tier: "sat", category: "語境詞義辨析 / Ambiguity",
    word: "equivocal", chunk: "e - quiv - o - cal", ipa: "/\u026a\u02c8kw\u026av.\u0259.k\u0259l/", pos: "adj.",
    icon: "🌫️", zh: "模稜兩可的、含糊其辭的",
    collocation: "an equivocal answer (模稜兩可含糊的回答)",
    example: "His equivocal response left both journalists unsure whether he intended to run for office.", exampleZh: "他含糊其辭的回答讓在場記者皆無法確定他是否打算競選公職。",
    memoryTip: "equi (平等) + voc (聲音) ➔ 兩種聲音平分秋色說不清楚 ➔ 模稜兩可的"
  },
  {
    id: "fc-sat-028", tier: "sat", category: "學術哲學與決策 / Action",
    word: "preclude", chunk: "pre - clude", ipa: "/pr\u0259\u02c8klu\u02d0d/", pos: "v.",
    icon: "🚫", zh: "預先排除、防堵、使不可能發生",
    collocation: "preclude the possibility of error (杜絕發生錯誤的可能性)",
    example: "A severe wrist injury precluded the tennis prodigy from competing in the national tournament.", exampleZh: "嚴重的手腕傷勢使這位網球神童無法參加全國錦標賽。",
    memoryTip: "pre- (預先) + clud (關閉，同 exclude) ➔ 預先關上大門 ➔ 排除阻止"
  },
  {
    id: "fc-sat-029", tier: "sat", category: "學術修辭與邏輯 / Tone",
    word: "candid", chunk: "can - did", ipa: "/\u02c8k\u00e6n.d\u026ad/", pos: "adj.",
    icon: "🪞", zh: "坦率直言的、公正誠實的",
    collocation: "candid interview / remarks (坦誠的專訪/直率言論)",
    example: "In a candid retrospective, the retired diplomat recounted the missteps of foreign policy.", exampleZh: "在一篇坦誠直言的回憶錄中，這位退役外交官回顧了外交政策的種種失誤。",
    memoryTip: "cand (白色/純潔，同 candidate 穿白袍的候選人) ➔ 赤誠坦白 ➔ 坦率的"
  },
  {
    id: "fc-sat-030", tier: "sat", category: "學術哲學與決策 / Intensity",
    word: "exacerbate", chunk: "ex - ac - er - bate", ipa: "/\u026a\u0261\u02c8z\u00e6s.\u025a.be\u026at/", pos: "v.",
    icon: "🔥", zh: "使惡化、加劇、雪上加霜 (反義詞 ameliorate / mitigate)",
    collocation: "exacerbate existing shortages (加劇既有物資短缺危機)",
    example: "Prolonged agricultural drought exacerbated food scarcity across the developing nation.", exampleZh: "長期的農業乾旱加劇了整個開發中國家的糧食短缺危機。",
    memoryTip: "ex- (加強) + acerb (酸苦辛辣，同 acerbic) + -ate ➔ 使酸苦惡化 ➔ 加劇惡化"
  },

  // 6. GRE Verbal 孿生詞群 1,500 (GRE Twin Synonyms)
  {
    id: "fc-gre-001", tier: "gre", category: "句子等價孿生詞對 / Volatility",
    word: "capricious", chunk: "ca - pri - cious", ipa: "/k\u0259\u02c8pr\u026a\u0283.\u0259s/", pos: "adj.",
    icon: "🎭", zh: "反覆無常的、善變任性的",
    collocation: "capricious decisions (反覆無常的決定)",
    example: "Throughout his turbulent tenure, the autocratic monarch was infamous for his capricious governance.", exampleZh: "在動盪的統治任期內，該專制君主以其反覆無常的治理風格而聲名狼藉。",
    memoryTip: "【GRE 孿生同義詞】：capricious = fickle = mercurial！在 Sentence Equivalence 六選二中並列正解！"
  },
  {
    id: "fc-gre-002", tier: "gre", category: "句子等價孿生詞對 / Volatility",
    word: "fickle", chunk: "fick - le", ipa: "/\u02c8f\u026ak.\u0259l/", pos: "adj.",
    icon: "🌪️", zh: "易變無常的、搖擺不定的",
    collocation: "fickle public opinion (浮動易變的民意)",
    example: "Politicians often discover that public adulation is utterly fickle and rapidly evaporates.", exampleZh: "政治人物常發現公眾的崇拜完全是變幻無常的，很快便煙消雲散。",
    memoryTip: "【GRE 孿生同義詞】：fickle = capricious！修飾命運、人心與天候。"
  },
  {
    id: "fc-gre-003", tier: "gre", category: "句子等價孿生詞對 / Burden",
    word: "onerous", chunk: "on - er - ous", ipa: "/\u02c8\u0251\u02d0.n\u025a.\u0259s/", pos: "adj.",
    icon: "🏋️", zh: "繁重艱鉅的、沉重的、費力的",
    collocation: "an onerous assignment (繁重艱辛的任務)",
    example: "Translating ancient cuneiform clay tablets proved to be an extraordinarily onerous undertaking.", exampleZh: "翻譯殘破的古代楔形文字泥板被證明是一項極其繁重艱鉅的事業。",
    memoryTip: "【GRE 孿生同義詞】：onerous = burdensome。拉丁語 onus (沉重負擔)。"
  },
  {
    id: "fc-gre-004", tier: "gre", category: "句子等價孿生詞對 / Burden",
    word: "burdensome", chunk: "bur - den - some", ipa: "/\u02c8b\u025d\u02d0.d\u0259n.s\u0259m/", pos: "adj.",
    icon: "🎒", zh: "沉重繁難的、累贅的",
    collocation: "burdensome regulatory compliance (繁複沉重的法規遵循負擔)",
    example: "Small business entrepreneurs often lament the burdensome paperwork required by state agencies.", exampleZh: "小型企業創業者經常抱怨政府機構所要求的繁複沉重的文書作業。",
    memoryTip: "【GRE 孿生同義詞】：burdensome = onerous。burden (負擔) + -some (充滿)。"
  },
  {
    id: "fc-gre-005", tier: "gre", category: "句子等價孿生詞對 / Clarity",
    word: "pellucid", chunk: "pel - lu - cid", ipa: "/p\u0259\u02c8lu\u02d0.s\u026ad/", pos: "adj.",
    icon: "💎", zh: "清澈透亮的、清晰明瞭的",
    collocation: "pellucid prose (清新明徹的文筆)",
    example: "The theoretical physicist was renowned for her pellucid exposition of complex gravitational theory.", exampleZh: "該理論物理學家因其對複雜重力理論清晰透徹的闡述而享譽學界。",
    memoryTip: "【GRE 孿生同義詞】：pellucid = limpid。pel- (透徹) + luc (光亮/清晰)。"
  },
  {
    id: "fc-gre-006", tier: "gre", category: "句子等價孿生詞對 / Clarity",
    word: "limpid", chunk: "lim - pid", ipa: "/\u02c8l\u026am.p\u026ad/", pos: "adj.",
    icon: "💧", zh: "清澈透明的、明白通暢的",
    collocation: "limpid stream / style (清澈的溪流/明白暢達的文風)",
    example: "The mountain lake was so limpid that pebbles on the bedrock twelve meters below were visible.", exampleZh: "高山湖泊是如此清澈見底，以至於水下十二公尺岩床上的鵝卵石都清晰可辨。",
    memoryTip: "【GRE 孿生同義詞】：limpid = pellucid。修飾文風「清澈無晦澀」。"
  },
  {
    id: "fc-gre-007", tier: "gre", category: "句子等價孿生詞對 / Mitigation",
    word: "mitigate", chunk: "mit - i - gate", ipa: "/\u02c8m\u026at\u032c.\u0259.\u0261e\u026at/", pos: "v.",
    icon: "🌿", zh: "緩和、減輕、緩解",
    collocation: "mitigate economic fallout (緩解經濟衝擊)",
    example: "Massive coastal mangrove reforestation projects are designed to mitigate hurricane storm surges.", exampleZh: "大規模的沿海紅樹林造林計畫旨在緩解颶風引發的風暴潮。",
    memoryTip: "【GRE 孿生四姐妹】：mitigate = abate = attenuate = alleviate (減輕緩和)。等價題極高頻！"
  },
  {
    id: "fc-gre-008", tier: "gre", category: "句子等價孿生詞對 / Mitigation",
    word: "alleviate", chunk: "al - le - vi - ate", ipa: "/\u0259\u02c8li\u02d0.vi.e\u026at/", pos: "v.",
    icon: "🍃", zh: "減輕、緩和 (痛苦或負擔)",
    collocation: "alleviate poverty and chronic pain (緩解貧困與慢性疼痛)",
    example: "The humanitarian NGO provided emergency rations to alleviate acute famine in the drought sector.", exampleZh: "人道救援非政府組織提供了緊急口糧以緩解乾旱災區嚴重的饑荒。",
    memoryTip: "【GRE 孿生同義詞】：alleviate = mitigate = abate。lev (輕，同 elevate) ➔ 使變輕。"
  },
  {
    id: "fc-gre-009", tier: "gre", category: "句子等價孿生詞對 / Transience",
    word: "ephemeral", chunk: "e - phem - er - al", ipa: "/\u026a\u02c8fem.\u025a.\u0259l/", pos: "adj.",
    icon: "⏳", zh: "短暫的、轉瞬即逝的、朝生暮死的",
    collocation: "ephemeral celebrity (轉瞬即逝的名氣)",
    example: "Viral internet fame frequently proves to be ephemeral, vanishing as swiftly as it appeared.", exampleZh: "網路爆紅的知名度往往被證明是轉瞬即逝的，消逝得如同當初竄紅時那般迅速。",
    memoryTip: "【GRE 孿生三胞胎】：ephemeral = transient = evanescent (短暫的)。"
  },
  {
    id: "fc-gre-010", tier: "gre", category: "句子等價孿生詞對 / Transience",
    word: "transient", chunk: "tran - sient", ipa: "/\u02c8tr\u00e6n.zi.\u0259nt/", pos: "adj.",
    icon: "🍂", zh: "短暫的、瞬息即逝的、過客的",
    collocation: "transient sensation (轉瞬即逝的感覺)",
    example: "The psychologist observed that material wealth generates only a transient surge in happiness.", exampleZh: "心理學家觀察到，物質財富帶來的幸福感往往只是轉瞬即逝的短暫提升。",
    memoryTip: "【GRE 孿生同義詞】：transient = ephemeral。trans- (通過) + i (走) ➔ 走過即逝。"
  },
  {
    id: "fc-gre-011", tier: "gre", category: "GRE 核心同義詞群 / Rhetoric",
    word: "laconic", chunk: "la - con - ic", ipa: "/l\u0259\u02c8k\u0251\u02d0.n\u026ak/", pos: "adj.",
    icon: "🤐", zh: "簡潔的、說話言簡意賅的、寡言的",
    collocation: "a laconic reply (言簡意賅的答覆)",
    example: "Famous for his laconic temperament, the general responded to the enemy ultimatum with one word: 'Never.'", exampleZh: "將軍以其言簡意賅的寡言脾性聞名，他對敵軍的最後通牒只回敬了一個字：「休想。」",
    memoryTip: "【GRE 孿生同義詞】：laconic = terse = curt。源自斯巴達拉哥尼亞 (Laconia) 人說話極簡之典故。"
  },
  {
    id: "fc-gre-012", tier: "gre", category: "GRE 核心同義詞群 / Rhetoric",
    word: "terse", chunk: "terse", ipa: "/t\u025d\u02d0s/", pos: "adj.",
    icon: "✂️", zh: "簡短生硬的、扼要的",
    collocation: "a terse statement (簡短扼要的聲明)",
    example: "The CEO issued a terse statement denying all allegations of insider stock trading.", exampleZh: "執行長發表了一份措辭簡短生硬的聲明，全盤否認內線交易指控。",
    memoryTip: "【GRE 孿生同義詞】：terse = laconic。ters- (擦乾淨/去除多餘) ➔ 去除贅字。"
  },
  {
    id: "fc-gre-013", tier: "gre", category: "學術態度與評價 / Falsehood",
    word: "specious", chunk: "spe - cious", ipa: "/\u02c8spi\u02d0.\u0283\u0259s/", pos: "adj.",
    icon: "🎭", zh: "似是而非的、華而不實的、虛假的",
    collocation: "specious reasoning / argument (似是而非的論點)",
    example: "Under rigorous scrutiny, the lobbyist's plausible rhetoric was unmasked as entirely specious.", exampleZh: "在嚴格審視之下，說客看似合理的修辭被揭穿完全是似是而非的詭辯。",
    memoryTip: "【GRE 孿生同義詞】：specious = spurious = fallacious。spec (看) ➔ 僅表面好看而已！"
  },
  {
    id: "fc-gre-014", tier: "gre", category: "學術態度與評價 / Falsehood",
    word: "spurious", chunk: "spu - ri - ous", ipa: "/\u02c8spj\u028ar.i.\u0259s/", pos: "adj.",
    icon: "🪙", zh: "偽造的、虛假的、站不住腳的",
    collocation: "spurious statistical correlation (虛假的統計相關性)",
    example: "The scientific journal retracted the published paper after uncovering spurious experimental data.", exampleZh: "在揭發出偽造虛假的實驗數據後，該科學期刊撤回了已發表的論文。",
    memoryTip: "【GRE 孿生同義詞】：spurious = specious = counterfeit (偽造虛假的)。"
  },
  {
    id: "fc-gre-015", tier: "gre", category: "GRE 核心同義詞群 / Character",
    word: "fastidious", chunk: "fas - tid - i - ous", ipa: "/f\u00e6s\u02c8t\u026ad.i.\u0259s/", pos: "adj.",
    icon: "🔬", zh: "一絲不苟的、過分挑剔講究的",
    collocation: "fastidious attention to detail (對細節一絲不苟的講究)",
    example: "The master watchmaker was famously fastidious, examining each microscopic gear under high magnification.", exampleZh: "鐘錶大師以極度一絲不苟聞名，在高倍放大鏡下一一檢視每顆微型齒輪。",
    memoryTip: "【GRE 孿生同義詞】：fastidious = meticulous = punctilious (嚴謹挑剔)。"
  },
  {
    id: "fc-gre-016", tier: "gre", category: "GRE 核心同義詞群 / Character",
    word: "meticulous", chunk: "me - tic - u - lous", ipa: "/m\u0259\u02c8t\u026ak.j\u0259.l\u0259s/", pos: "adj.",
    icon: "📐", zh: "極其嚴謹細緻的、一絲不苟的",
    collocation: "meticulous scientific documentation (細緻嚴謹的科學記錄)",
    example: "The conservator restored the Renaissance fresco with meticulous precision and immense patience.", exampleZh: "古蹟修復專家以無比細緻嚴謹的精準度與無窮耐心，修復了文藝復興時期的濕壁畫。",
    memoryTip: "【GRE 孿生同義詞】：meticulous = fastidious。正向表「一絲不苟」，負向表「過分挑剔」。"
  },
  {
    id: "fc-gre-017", tier: "gre", category: "句子等價孿生詞對 / Demeanor",
    word: "reticent", chunk: "ret - i - cent", ipa: "/\u02c8ret\u032c.\u0259.s\u0259nt/", pos: "adj.",
    icon: "🤫", zh: "沉默寡言的、不願吐露的",
    collocation: "reticent about personal matters (對個人私事守口如瓶寡言)",
    example: "The witness remained reticent, answering the prosecutor's inquiries only with brief nods.", exampleZh: "證人始終保持沉默寡言，僅以微弱的點頭回應檢察官的訊問。",
    memoryTip: "【GRE 孿生同義詞】：reticent = taciturn。tacit (心照不宣/安靜)。"
  },
  {
    id: "fc-gre-018", tier: "gre", category: "句子等價孿生詞對 / Demeanor",
    word: "taciturn", chunk: "tac - i - turn", ipa: "/\u02c8t\u00e6s.\u0259.t\u025d\u02d0n/", pos: "adj.",
    icon: "😶", zh: "不苟言笑的、生性孤僻寡言的",
    collocation: "a taciturn loner (寡言孤僻之人)",
    example: "Growing up on a solitary mountain homestead made the woodsman notoriously taciturn.", exampleZh: "在偏僻孤絕的高山農莊長大，讓這位伐木工人變得極其寡言孤僻。",
    memoryTip: "【GRE 孿生同義詞】：taciturn = reticent。修飾性格習慣性不講話。"
  },
  {
    id: "fc-gre-019", tier: "gre", category: "句子等價孿生詞對 / Emotion",
    word: "apathy", chunk: "ap - a - thy", ipa: "/\u02c8\u00e6p.\u0259.\u03b8i/", pos: "n.",
    icon: "🧊", zh: "漠然、冷淡、無動於衷",
    collocation: "voter apathy (選民冷漠不投票)",
    example: "Widespread civic apathy poses a grave danger to the vitality of democratic self-governance.", exampleZh: "普遍的公民冷漠對民主自治的蓬勃生機構成了嚴重威脅。",
    memoryTip: "【GRE 孿生同義詞】：apathy = indifference。a- (無) + pathy (情感) ➔ 毫無感情。"
  },
  {
    id: "fc-gre-020", tier: "gre", category: "句子等價孿生詞對 / Emotion",
    word: "indifference", chunk: "in - dif - fer - ence", ipa: "/\u026an\u02c8d\u026af.\u025a.\u0259ns/", pos: "n.",
    icon: "😐", zh: "漠不關心、冷淡對待",
    collocation: "treat with utter indifference (以徹底的漠不關心對待)",
    example: "The monarch met the peasant petitions with callous indifference and increased levies.", exampleZh: "君主對農民的請願書表現出冷酷的漠不關心，反而加重了賦稅徵收。",
    memoryTip: "【GRE 孿生同義詞】：indifference = apathy。in- (無) + difference (差別) ➔ 覺得都無所謂。"
  },
  {
    id: "fc-gre-021", tier: "gre", category: "句子等價孿生詞對 / Reverence",
    word: "veneration", chunk: "ven - er - a - tion", ipa: "/\u02ccven.\u0259\u02c8re\u026a.\u0283\u0259n/", pos: "n.",
    icon: "🙇", zh: "崇敬、景仰、頂禮膜拜",
    collocation: "held in great veneration (備受尊崇景仰)",
    example: "The indigenous community preserves deep veneration for the sacred cedar grove.", exampleZh: "該原住民族社群對這片神聖的雪松林懷抱著無比深沉的崇敬與景仰。",
    memoryTip: "【GRE 孿生同義詞】：veneration = reverence = deification。Venus (愛與美之神) ➔ 崇拜膜拜。"
  },
  {
    id: "fc-gre-022", tier: "gre", category: "句子等價孿生詞對 / Reverence",
    word: "reverence", chunk: "rev - er - ence", ipa: "/\u02c8rev.\u025a.\u0259ns/", pos: "n.",
    icon: "🕯️", zh: "敬畏、虔敬崇拜",
    collocation: "profound reverence for nature (對大自然深沉的敬畏與崇拜)",
    example: "The pilgrims entered the sanctuary in hushed reverence, lighting ceremonial candles.", exampleZh: "朝聖者滿懷虔敬的敬畏之情踏入聖所，點燃儀式專用的蠟燭。",
    memoryTip: "【GRE 孿生同義詞】：reverence = veneration。revere (敬畏) ➔ 名詞 reverence。"
  },
  {
    id: "fc-gre-023", tier: "gre", category: "句子等價孿生詞對 / Aggression",
    word: "bellicose", chunk: "bel - li - cose", ipa: "/\u02c8bel.\u0259.ko\u028as/", pos: "adj.",
    icon: "⚔️", zh: "好戰的、窮兵黷武的",
    collocation: "bellicose rhetoric (好戰的叫囂言論)",
    example: "The dictator delivered a bellicose speech threatening military invasion across the border.", exampleZh: "該獨裁者發表了一場好戰的演說，揚言將對邊境彼端發動軍事入侵。",
    memoryTip: "【GRE 孿生同義詞】：bellicose = pugnacious = truculent。bell (戰爭，如 rebel 反叛)。"
  },
  {
    id: "fc-gre-024", tier: "gre", category: "句子等價孿生詞對 / Aggression",
    word: "pugnacious", chunk: "pug - na - cious", ipa: "/p\u028c\u0261\u02c8ne\u026a.\u0283\u0259s/", pos: "adj.",
    icon: "🥊", zh: "好鬥好吵架的、尋釁滋事的",
    collocation: "a pugnacious politician (咄咄逼人好鬥的政客)",
    example: "Known for his pugnacious posture during committee debates, he rarely conceded a point.", exampleZh: "因在委員會辯論中咄咄逼人、好鬥善辯聞名，他幾乎從不向對手做出讓步。",
    memoryTip: "【GRE 孿生同義詞】：pugnacious = bellicose。pugn (拳頭，同 pugilist 拳擊手)。"
  },
  {
    id: "fc-gre-025", tier: "gre", category: "句子等價孿生詞對 / Harmlessness",
    word: "innocuous", chunk: "in - noc - u - ous", ipa: "/\u026a\u02c8n\u0251\u02d0.kju.\u0259s/", pos: "adj.",
    icon: "🕊️", zh: "無害的、良性的、無傷大雅的",
    collocation: "an innocuous remark (無傷大雅的隨興評論)",
    example: "What seemed like an innocuous question provoked unexpected outrage from the witness.", exampleZh: "一句看似無傷大雅的隨興提問，卻引發了證人出乎意料的強烈憤怒。",
    memoryTip: "【GRE 孿生同義詞】：innocuous = benign = inoffensive。in- (無) + noc (傷害，同 noxious 有毒)。"
  },
  {
    id: "fc-gre-026", tier: "gre", category: "句子等價孿生詞對 / Harmlessness",
    word: "benign", chunk: "be - nign", ipa: "/b\u026a\u02c8na\u026an/", pos: "adj.",
    icon: "🌸", zh: "溫和善良的、良性無害的 (反義詞 malignant 惡性的)",
    collocation: "a benign tumor / climate (良性腫瘤/溫和宜人的氣候)",
    example: "The biopsy confirmed that the detected tissue lump was completely benign.", exampleZh: "組織切片檢查證實偵測到的組織腫塊完全是良性的。",
    memoryTip: "【GRE 孿生同義詞】：benign = innocuous。bene- (好/善，同 benefit)。"
  },
  {
    id: "fc-gre-027", tier: "gre", category: "句子等價孿生詞對 / Prevention",
    word: "obviate", chunk: "ob - vi - ate", ipa: "/\u02c8\u0251\u02d0b.vi.e\u026at/", pos: "v.",
    icon: "🛡️", zh: "排除、消除、使不再需要",
    collocation: "obviate the need for surgery (免除動手術的需要)",
    example: "Early diagnostic detection often obviates the need for invasive chemotherapy treatments.", exampleZh: "早期診斷發現往往能免除病患進行侵入性化學治療的需要。",
    memoryTip: "【GRE 孿生同義詞】：obviate = preclude。ob- (反對) + via (道路) ➔ 阻擋在半路免去麻煩。"
  },
  {
    id: "fc-gre-028", tier: "gre", category: "GRE 核心同義詞群 / Speech",
    word: "loquacious", chunk: "lo - qua - cious", ipa: "/lo\u028a\u02c8kwe\u026a.\u0283\u0259s/", pos: "adj.",
    icon: "🗣️", zh: "話多的、滔滔不絕的、喋喋不休的",
    collocation: "a loquacious dinner companion (話多健談的宴席同伴)",
    example: "A few glasses of vintage wine turned the normally reserved scholar into a loquacious conversationalist.", exampleZh: "幾杯陳年佳釀讓原本矜持沉靜的學者頓時化身為滔滔不絕的健談者。",
    memoryTip: "【GRE 孿生同義詞】：loquacious = garrulous。loqu (說話，同 eloquent 雄辯的)。"
  },
  {
    id: "fc-gre-029", tier: "gre", category: "GRE 核心同義詞群 / Speech",
    word: "garrulous", chunk: "gar - ru - lous", ipa: "/\u02c8\u0261\u00e6r.\u0259.l\u0259s/", pos: "adj.",
    icon: "📢", zh: "嘮叨絮聒的、多嘴多舌的",
    collocation: "a garrulous neighbor (愛嘮叨多話的鄰居)",
    example: "The driver proved so garrulous that passengers could scarcely read their newspapers in quiet.", exampleZh: "司機是如此喋喋不休、熱衷嘮叨，乘客幾乎無法在安靜中閱讀報紙。",
    memoryTip: "【GRE 孿生同義詞】：garrulous = loquacious。garr- (喉嚨發聲，同 gargle 漱口)。"
  },
  {
    id: "fc-gre-030", tier: "gre", category: "句子等價孿生詞對 / Dullness",
    word: "prosaic", chunk: "pro - sa - ic", ipa: "/pro\u028a\u02c8ze\u026a.\u026ak/", pos: "adj.",
    icon: "🪵", zh: "平淡無奇的、乏味的、散文般的",
    collocation: "prosaic day-to-day existence (平淡乏味的日常生活)",
    example: "Beyond the dazzling glamour of cinema lies the prosaic labor of logistical scheduling.", exampleZh: "在電影耀眼炫目的光環背後，其實充斥著調度後勤排程等平淡乏味繁瑣的勞動。",
    memoryTip: "【GRE 孿生同義詞】：prosaic = pedestrian = mundane。prose (散文) ➔ 毫無詩意 ➔ 平淡無奇。"
  },
  {
    id: "fc-gre-031", tier: "gre", category: "句子等價孿生詞對 / Dullness",
    word: "pedestrian", chunk: "pe - des - tri - an", ipa: "/p\u0259\u02c8des.tri.\u0259n/", pos: "adj. / n.",
    icon: "🚶", zh: "平淡沉悶的、乏味的；行人",
    collocation: "a pedestrian plotline (陳腐沉悶的情節架構)",
    example: "Critics condemned the television series for its pedestrian dialogue and clich\u00e9 characters.", exampleZh: "影評人斥責該電視影集對白平淡沉悶、角色設定落入俗套陳腐。",
    memoryTip: "【GRE 孿生同義詞】：pedestrian = prosaic。ped (腳步) ➔ 像走路般尋常平庸 ➔ 乏味的。"
  },
  {
    id: "fc-gre-032", tier: "gre", category: "句子等價孿生詞對 / Remedy",
    word: "panacea", chunk: "pan - a - ce - a", ipa: "/\u02ccp\u00e6n.\u0259\u02c8si\u02d0.\u0259/", pos: "n.",
    icon: "🧪", zh: "萬靈丹、百病良藥、萬全之策",
    collocation: "no universal panacea (並非萬靈妙藥)",
    example: "Technological innovation is beneficial, but it is not a panacea for deep structural poverty.", exampleZh: "科技創新大有裨益，但絕非根除深層結構性貧困問題的萬靈妙藥。",
    memoryTip: "【GRE 孿生同義詞】：panacea = cure-all。pan- (全/所有) + akos (治療) ➔ 包治百病之神藥。"
  },

  // 7. GMAT Focus 批判推理 1,000 (GMAT Critical Reasoning)
  {
    id: "fc-gm-001", tier: "gmat", category: "批判邏輯與前提 / Logic",
    word: "assumption", chunk: "as - sump - tion", ipa: "/\u0259\u02c8s\u028cmp.\u0283\u0259n/", pos: "n.",
    icon: "🎯", zh: "未言明的前提假設 (若否定之，結論必崩潰)",
    collocation: "underlying assumption (未言明的根本假設)",
    example: "The marketing argument relies on the implicit assumption that consumer disposable income will not fall.", exampleZh: "該行銷論證仰賴於一個潛在未言明的前提假設：消費者的可支配所得不會下滑。",
    memoryTip: "【GMAT 命題密鑰】：否定測試法 (Negation Test)——若將該選項否定後，題幹結論直接崩解，則此選項必為 Necessary Assumption！"
  },
  {
    id: "fc-gm-002", tier: "gmat", category: "批判推理削弱題型 / Weaken",
    word: "weaken", chunk: "weak - en", ipa: "/\u02c8wi\u02d0.k\u0259n/", pos: "v.",
    icon: "🔨", zh: "削弱 (論證說服力、打破因果鏈)",
    collocation: "seriously weaken the argument (嚴重削弱該論證)",
    example: "Which of the following findings, if true, most seriously weakens the mayor's municipal economic claim?", exampleZh: "下列何項調查發現若為真，最嚴重削弱了市長對市政經濟前景的主張？",
    memoryTip: "【GMAT 削弱三大途徑】：1. 引入他因 (Alternative Cause)；2. 因果倒置 (Reverse Causality)；3. 割裂論據與結論之必然關聯。"
  },
  {
    id: "fc-gm-003", tier: "gmat", category: "批判推理加強題型 / Strengthen",
    word: "strengthen", chunk: "strength - en", ipa: "/\u02c8stre\u014b.k\u03b8\u0259n/", pos: "v.",
    icon: "🛡️", zh: "加強、支持 (結論成立的機率)",
    collocation: "strengthen the executive conclusion (加強經營團隊的結論)",
    example: "The economic consultant presented competitor cost data to strengthen the viability of the joint venture.", exampleZh: "經濟顧問出示了競爭對手的成本數據，以加強該合資計畫的可行性。",
    memoryTip: "【GMAT 加強三大途徑】：1. 排除反因/干擾變數；2. 證明無因則無果；3. 證實數據樣本具代表性。"
  },
  {
    id: "fc-gm-004", tier: "gmat", category: "評估與因果關係鏈 / Evaluation",
    word: "evaluate", chunk: "e - val - u - ate", ipa: "/\u026a\u02c8v\u00e6l.ju.e\u026at/", pos: "v.",
    icon: "⚖️", zh: "評估 (論證有效性之關鍵資訊)",
    collocation: "evaluate the validity of the argument (評估論證的有效性)",
    example: "Determining whether regional rivals can replicate the patented technology is critical to evaluate the proposal.", exampleZh: "查明區域競爭對手是否能複製這項專利技術，對於評估該提案而言至關重要。",
    memoryTip: "【GMAT 評估密鑰】：變異測試法 (Variance Test)——對選項回答 Yes 能加強結論，回答 No 則能削弱結論，即為正確 Evaluate 答案！"
  },
  {
    id: "fc-gm-005", tier: "gmat", category: "批判邏輯與前提 / Argumentation",
    word: "refute", chunk: "re - fute", ipa: "/r\u026a\u02c8fju\u02d0t/", pos: "v.",
    icon: "💥", zh: "駁斥、反駁 (論點或假說)",
    collocation: "refute the analyst's forecast (駁斥分析師的預測)",
    example: "The corporate treasurer presented audited financial statements to refute claims of imminent bankruptcy.", exampleZh: "財務長出示經獨立審計的財務報表，駁斥了公司瀕臨破產的傳言。",
    memoryTip: "re- (反向) + fut (倒/擊碎，同 futile) ➔ 擊碎對方論點 ➔ 駁斥"
  },
  {
    id: "fc-gm-006", tier: "gmat", category: "批判邏輯與前提 / Argument Structure",
    word: "premise", chunk: "prem - ise", ipa: "/\u02c8prem.\u026as/", pos: "n.",
    icon: "🏛️", zh: "論據、前提 (題幹中明確陳述為事實的事實依據)",
    collocation: "underlying premise (基本論據前提)",
    example: "The entire strategic plan is constructed upon the questionable premise that raw material prices will remain flat.", exampleZh: "整個策略計畫皆建立在一個令人質疑的論據前提之上：原料價格將保持平穩不變。",
    memoryTip: "【GMAT CR 結構分析】：Premise (已知客觀事實) + Assumption (隱含未言明前提) ➔ Conclusion (主觀推導結論)。"
  },
  {
    id: "fc-gm-007", tier: "gmat", category: "批判邏輯與前提 / Flaw",
    word: "fallacy", chunk: "fal - la - cy", ipa: "/\u02c8f\u00e6l.\u0259.si/", pos: "n.",
    icon: "🌀", zh: "邏輯謬誤、謬論",
    collocation: "commit a causal fallacy (犯下因果關係倒置或混淆的謬誤)",
    example: "Confusing correlation with causation is a classic logical fallacy often tested in GMAT reasoning.", exampleZh: "將相關性誤認為因果關係，是 GMAT 邏輯批判推理中經常考查的經典邏輯謬誤。",
    memoryTip: "fall (欺騙/錯誤，同 false) + -acy ➔ 看似有理實則荒謬 ➔ 邏輯謬誤"
  },
  {
    id: "fc-gm-008", tier: "gmat", category: "評估與因果關係鏈 / Causality",
    word: "causal", chunk: "cau - sal", ipa: "/\u02c8k\u0251\u02d0.z\u0259l/", pos: "adj.",
    icon: "⛓️", zh: "因果關係的 (非純粹相關)",
    collocation: "establish a direct causal link (確立直接的因果鏈結)",
    example: "Epidemiologists must establish a rigorous causal mechanism before asserting that chemical exposure triggers illness.", exampleZh: "流行病學家在斷定化學物質暴露會引發疾病之前，必須先確立嚴謹的因果機制。",
    memoryTip: "【GMAT 因果論證核心】：Correlation (相關) ≠ Causation (因果)！常考「倒果為因」或「第三外在因素干擾 (Confounding)」。"
  },
  {
    id: "fc-gm-009", tier: "gmat", category: "矛盾解釋與推論 / Resolve the Paradox",
    word: "paradox", chunk: "par - a - dox", ipa: "/\u02c8p\u00e6r.\u0259.d\u0251\u02d0ks/", pos: "n.",
    icon: "🔄", zh: "看似矛盾的現象、悖論 (題幹要求解釋矛盾)",
    collocation: "resolve the apparent paradox (解釋/化解看似矛盾之處)",
    example: "The report presented a paradox: although average incomes rose, overall consumer discretionary spending fell.", exampleZh: "該報告揭示了一項看似矛盾的現象：儘管平均所得提升，但整體消費者的非必要支出卻下滑了。",
    memoryTip: "【GMAT 解題密鑰】：Explain/Resolve the Paradox 題型——尋求一個「新資訊」，能同時合理解釋 Fact A 與 Fact B 兩者何以同時並存！"
  },
  {
    id: "fc-gm-010", tier: "gmat", category: "批判邏輯與前提 / Flaw in Reasoning",
    word: "extrapolate", chunk: "ex - trap - o - late", ipa: "/\u026ak\u02c8str\u00e6p.\u0259.le\u026at/", pos: "v.",
    icon: "📈", zh: "外推、推斷 (根據已知趨勢預測未知領域)",
    collocation: "extrapolate future trends from past data (由歷史數據外推未來趨勢)",
    example: "The executive warned that one cannot blindly extrapolate regional trial success to nationwide commercial viability.", exampleZh: "執行長警告，絕不能盲目地將單一區域試辦的成功，直接外推為在全國商業推廣的可行性。",
    memoryTip: "extra- (向外) + pol (樞紐/軸心) + -ate ➔ 向外延伸推測 ➔ 外推推斷 (GMAT 常作為過度概括之錯誤邏輯選項)。"
  },
  {
    id: "fc-gm-011", tier: "gmat", category: "評估與因果關係鏈 / Causality",
    word: "concomitant", chunk: "con - com - i - tant", ipa: "/k\u0259n\u02c8k\u0251\u02d0.m\u0259.t\u032c\u0259nt/", pos: "adj. / n.",
    icon: "🔗", zh: "伴隨發生的、相伴而生的 (非因果之伴生現象)",
    collocation: "concomitant economic expansion (伴隨發生的經濟擴張現象)",
    example: "The reduction in operational expenses was a concomitant benefit, not the primary driver of the software overhaul.", exampleZh: "營運支出的減少只是一項伴隨而來的附帶好處，並非該軟體系統大改版的主要推動動機。",
    memoryTip: "con- (共同) + comit (伴侶/隨行) + -ant ➔ 只是結伴同行，並非起因！"
  },
  {
    id: "fc-gm-012", tier: "gmat", category: "批判邏輯與前提 / Boldface",
    word: "boldface", chunk: "bold - face", ipa: "/\u02c8bo\u028ald.fe\u026as/", pos: "n. / adj.",
    icon: "🔲", zh: "黑體字 (GMAT 句子角色劃分題型)",
    collocation: "the role of the boldface portion (黑體字部分在論證中所扮演的角色)",
    example: "The first boldface statement introduces evidence supporting the conclusion that the second boldface statement refutes.", exampleZh: "第一段黑體字陳述引入了支持某結論的證據，而第二段黑體字陳述則旨在駁斥該結論。",
    memoryTip: "【GMAT CR 黑體字經典解法】：判斷每一段黑體字是「Premise (客觀論據)」還是「Conclusion (主觀推論)」？立場是站在作者方還是反對作者？"
  },
  {
    id: "fc-gm-013", tier: "gmat", category: "批判邏輯與前提 / Boldface",
    word: "intermediate conclusion", chunk: "in - ter - me - di - ate con - clu - sion", ipa: "/\u02cc\u026an.t\u032c\u025a\u02c8mi\u02d0.di.\u0259t k\u0259n\u02c8klu\u02d0.\u0292\u0259n/", pos: "n.",
    icon: "🪜", zh: "中間次要結論 (既是上一層推論的結果，又是終極結論的前提)",
    collocation: "serves as an intermediate conclusion (作為過渡的中間結論)",
    example: "The analyst inferred that revenue would drop, which served as an intermediate conclusion supporting the budget cut.", exampleZh: "分析師推斷營收將會下滑，這項中間結論進一步支持了最終削減預算的決策。",
    memoryTip: "【GMAT CR 經典角色】：Sub-conclusion / Intermediate Conclusion——銜接基礎論據與主結論之樞紐！"
  },
  {
    id: "fc-gm-014", tier: "gmat", category: "批判邏輯與前提 / Argumentation",
    word: "counterargument", chunk: "coun - ter - ar - gu - ment", ipa: "/\u02c8ka\u028an.t\u032c\u025a\u02cc\u0251\u02d0r\u0261.j\u0259.m\u0259nt/", pos: "n.",
    icon: "🥊", zh: "對立反駁論點、反面主張",
    collocation: "address potential counterarguments (回應潛在的反對主張)",
    example: "The proposal anticipated industry counterarguments by providing verified safety audit certifications.", exampleZh: "該提案透過提供經認證的安全審計證明，預先回應了業界可能提出的反駁主張。",
    memoryTip: "counter (反對) + argument (論點) ➔ 對立方的論點"
  },
  {
    id: "fc-gm-015", tier: "gmat", category: "批判邏輯與前提 / Flaw",
    word: "unwarranted", chunk: "un - war - ran - ted", ipa: "/\u028cn\u02c8w\u0254\u02d0r.\u0259n.t\u032c\u026ad/", pos: "adj.",
    icon: "❌", zh: "毫無根據的、缺乏正當理由的",
    collocation: "an unwarranted leap in logic (邏輯上毫無根據的跳躍)",
    example: "Critics pointed out that assuming all users would upgrade immediately was an unwarranted inference.", exampleZh: "評論家指出，逕自假設所有使用者都會立即升級，是一項毫無客觀根據的推論。",
    memoryTip: "un- (無) + warrant (正當授權/保證) + -ed ➔ 缺乏保證的 ➔ 毫無根據的"
  },
  {
    id: "fc-gm-016", tier: "gmat", category: "評估與因果關係鏈 / Causality",
    word: "confound", chunk: "con - found", ipa: "/k\u0259n\u02c8fa\u028and/", pos: "v.",
    icon: "🌀", zh: "混淆、使混亂；干擾混入因果變數",
    collocation: "confound the experimental findings (干擾混淆實驗研究結果)",
    example: "Uncontrolled socioeconomic disparities confound the correlation between diet and cardiac health.", exampleZh: "未受控制的社會經濟差距干擾混淆了飲食與心臟健康之間的相關性判定。",
    memoryTip: "con- (共同) + found (倒/融化) ➔ 倒在一起分不清 ➔ 混淆干擾變數"
  },
  {
    id: "fc-gm-017", tier: "gmat", category: "商業決策與可行性 / Economics",
    word: "marginal", chunk: "mar - gin - al", ipa: "/\u02c8m\u0251\u02d0r.d\u0292\u026a.n\u0259l/", pos: "adj.",
    icon: "📉", zh: "邊際的、微不足道的、極微小的",
    collocation: "marginal cost / benefit (邊際成本/邊際效益)",
    example: "The marketing upgrade produced only marginal sales improvements despite enormous capital expenditure.", exampleZh: "儘管耗費了龐大的資本支出，該行銷升級僅帶來了微不足道的業績提升。",
    memoryTip: "margin (頁邊空白) ➔ 處在最邊緣的 ➔ 微小的/邊際的"
  },
  {
    id: "fc-gm-018", tier: "gmat", category: "商業決策與可行性 / Decision",
    word: "imperative", chunk: "im - per - a - tive", ipa: "/\u026am\u02c8per.\u0259.t\u032c\u026av/", pos: "adj. / n.",
    icon: "🚨", zh: "迫切緊急的、勢在必行的；當務之急",
    collocation: "a strategic imperative (策略上的當務之急)",
    example: "Diversifying the semiconductor supplier network has become a national strategic imperative.", exampleZh: "半導體供應商網絡的多元化分散已成為國家層級勢在必行的策略當務之急。",
    memoryTip: "imper (統治/命令，同 empire 帝國) ➔ 如帝王軍令般十萬火急 ➔ 勢在必行的"
  },
  {
    id: "fc-gm-019", tier: "gmat", category: "商業決策與可行性 / Strategy",
    word: "deter", chunk: "de - ter", ipa: "/d\u026a\u02c8t\u025d\u02d0/", pos: "v.",
    icon: "🛑", zh: "威懾阻止、使打消念頭 (搭配 from)",
    collocation: "deter hostile takeovers (威懾阻止惡意併購)",
    example: "Stiff regulatory financial penalties are instituted to deter corporations from dumping industrial pollutants.", exampleZh: "制定高額監管罰款旨在威懾阻止企業傾倒工業廢棄物。",
    memoryTip: "de- (離開) + ter (恐懼，同 terror) ➔ 因恐懼代價而退縮 ➔ 威懾阻止"
  },
  {
    id: "fc-gm-020", tier: "gmat", category: "商業決策與可行性 / Economics",
    word: "trade-off", chunk: "trade - off", ipa: "/\u02c8tre\u026ad.\u0251\u02d0f/", pos: "n.",
    icon: "⚖️", zh: "權衡取捨、妥協折衷 (兩難之間的選擇)",
    collocation: "a trade-off between speed and accuracy (速度與精確度之間的權衡取捨)",
    example: "Engineers face an inevitable trade-off between lighter battery weight and extended driving range.", exampleZh: "工程師面臨著電池輕量化與更長續航里程之間不可避免的權衡取捨。",
    memoryTip: "trade (交換) + off ➔ 放棄 A 以換取 B ➔ 權衡取捨"
  },
  {
    id: "fc-gm-021", tier: "gmat", category: "商業決策與可行性 / Pricing",
    word: "prohibitive", chunk: "pro - hib - i - tive", ipa: "/pro\u028a\u02c8h\u026ab.\u0259.t\u032c\u026av/", pos: "adj.",
    icon: "💸", zh: "(價格或費用) 高昂得令人望而卻步的",
    collocation: "prohibitive installation costs (高昂令人卻步的安裝成本)",
    example: "The cost of licensing the patented manufacturing process proved entirely prohibitive for the small startup.", exampleZh: "這項專利製造製程的授權費用過於高昂，這家小型新創公司完全負擔不起。",
    memoryTip: "prohibit (禁止) + -ive ➔ 價格高到形同禁止購買 ➔ 昂貴得令人卻步的"
  },
  {
    id: "fc-gm-022", tier: "gmat", category: "矛盾解釋與推論 / Resolve the Paradox",
    word: "discrepancy", chunk: "dis - crep - an - cy", ipa: "/d\u026a\u02c8skrep.\u0259n.si/", pos: "n.",
    icon: "⚡", zh: "差異、不符、矛盾之處",
    collocation: "unexplained discrepancy in inventory figures (庫存數據中無法解釋的不符之處)",
    example: "Auditors noticed a significant discrepancy between logged warehouse shipments and ledger receipts.", exampleZh: "審計員察覺到了倉庫出貨登記紀錄與總帳收據之間存在重大不符與矛盾之處。",
    memoryTip: "dis- (分開) + crep (劈啪聲/裂痕) ➔ 數據出現裂痕對不上 ➔ 矛盾不一致"
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
      <div class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700">🗂️ 全階記憶閃卡館 · 雙重編碼與檢索練習</div>
      <h1 style="margin:8px 0;font-size:28px">多階層英語單字與核心片語記憶閃卡 (一面英文·一面中文與圖示)</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px;line-height:1.6">
        依據第二語言習得 (SLA) 之「雙重編碼理論 (Dual-Coding Theory)」與「檢索練習 (Retrieval Practice)」深層設計：
        <strong>正面純英文</strong>（音節拆解、KK音標、詞性與發音），激發大腦主動提取；<strong>背面繁中與主題圖示</strong>（圖示錨點、核心釋義、高頻搭配、情境例句與記憶秘訣）。
      </p>
    </div>

    <!-- 程度級別切換標籤條 (Tiers Tabs) -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:18px;scrollbar-width:thin">
      ${FLASHCARD_TIERS.map(t => {
        const isCur = t.id === currentTier;
        const countNum = FLASHCARD_DATABASE.filter(c => c.tier === t.id).length;
        return `
          <button class="btn ${isCur ? 'primary' : 'quiet'}" data-fc-tier="${t.id}"
            style="white-space:nowrap;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:${isCur ? '700' : '500'};border:${isCur ? '2px solid #047857' : '1px solid #cbd5e1'}">
            ${t.name} (${countNum})
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
          style="min-height:380px;position:relative;transform-style:preserve-3d;transition:transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;border-radius:18px;box-shadow:0 12px 30px -5px rgba(0,0,0,0.12);transform:${isFlipped ? 'rotateY(180deg)' : 'none'}">

          <!-- 卡片正面 (FRONT) - 嚴格純英文環境，促進檢索提取 (Retrieval Practice) -->
          <div class="fc-card-face fc-front"
            style="position:absolute;inset:0;background:#ffffff;border:2px solid ${isMastered ? '#10b981' : (isNeedReview ? '#f59e0b' : '#e2e8f0')};border-radius:18px;padding:26px 28px;display:flex;flex-direction:column;justify-content:space-between;backface-visibility:hidden;-webkit-backface-visibility:hidden">
            <div>
              <!-- 頂部級別與分類標籤 -->
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
                <div style="display:flex;align-items:center;gap:6px">
                  <span class="pill" style="background:${tierInfo.color}15;color:${tierInfo.color};font-size:12px;font-weight:700;border:1px solid ${tierInfo.color}35">
                    ${tierInfo.name.split(' ')[0]} ${tierInfo.cefr}
                  </span>
                  <span class="pill" style="background:#f1f5f9;color:#475569;font-size:12px;font-weight:600">${currentCard.category}</span>
                </div>
                <span style="font-size:13px;color:#64748b;font-weight:500">卡片 ${currentCardIndex + 1} / ${filteredCards.length}</span>
              </div>

              <!-- 單字與音節拆解 (正面絕無中文釋義，以利檢索回想) -->
              <div style="text-align:center;padding:24px 0 16px">
                <div style="font-size:42px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;margin-bottom:8px;line-height:1.2">
                  ${currentCard.word}
                </div>
                <div style="font-size:20px;font-weight:700;color:#2563eb;letter-spacing:1.5px;margin-bottom:10px">
                  ${currentCard.chunk}
                </div>
                <div style="display:inline-flex;align-items:center;gap:8px;background:#f8fafc;padding:6px 14px;border-radius:20px;border:1px solid #e2e8f0">
                  <span class="pill" style="background:#e0e7ff;color:#3730a3;font-weight:700;font-size:12px;padding:2px 8px">${currentCard.pos}</span>
                  <span style="font-size:15px;color:#334155;font-family:'Segoe UI',monospace;font-weight:500">${currentCard.ipa}</span>
                </div>
              </div>
            </div>

            <!-- 正面底部：雙速發音控制與翻面提示 -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f1f5f9;padding-top:14px;flex-wrap:wrap;gap:10px">
              <div style="display:flex;gap:8px">
                <button class="btn primary" data-fc-speak-word="${esc(currentCard.word)}" style="padding:8px 16px;font-size:13px;font-weight:700;border-radius:8px">
                  🔊 標準發音 1.0x
                </button>
                <button class="btn quiet" data-fc-speak-word-slow="${esc(currentCard.word)}" style="padding:8px 14px;font-size:13px;font-weight:600;border-radius:8px;border:1px solid #cbd5e1">
                  🐢 慢速拼讀 0.65x
                </button>
              </div>
              <div style="font-size:13px;color:#64748b;display:flex;align-items:center;gap:4px;font-weight:500">
                <span>🔄 點擊卡片翻轉查看中文與圖示</span>
              </div>
            </div>
          </div>

          <!-- 卡片背面 (BACK) - 繁體中文釋義、專屬主題視覺圖示與雙重編碼記憶 -->
          <div class="fc-card-face fc-back"
            style="position:absolute;inset:0;background:linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);border:2px solid #3b82f6;border-radius:18px;padding:22px 26px;display:flex;flex-direction:column;justify-content:space-between;transform:rotateY(180deg);backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow-y:auto">
            <div>
              <!-- 背面頂部：核心概念圖示、詞性單字與中文釋義 -->
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;background:#ffffff;padding:10px 14px;border-radius:14px;border:1px solid #e2e8f0;box-shadow:0 2px 6px rgba(0,0,0,0.03)">
                <!-- 醒目主題圖示徽章 (Visual Anchor Icon) -->
                <div style="font-size:38px;line-height:1;width:56px;height:56px;border-radius:14px;background:${tierInfo.color}15;border:2px solid ${tierInfo.color}35;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:inset 0 2px 4px rgba(0,0,0,0.04)">
                  ${currentCard.icon || '📌'}
                </div>
                <div style="flex-grow:1;min-width:0">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
                    <div style="display:flex;align-items:center;gap:6px">
                      <span class="pill" style="font-size:11px;font-weight:700;background:#ecfdf5;color:#047857">${currentCard.pos} ${currentCard.word}</span>
                      <span style="font-size:12px;font-weight:600;color:#64748b">${currentCard.category}</span>
                    </div>
                    <span style="font-size:12px;color:#94a3b8">卡片 ${currentCardIndex + 1} / ${filteredCards.length}</span>
                  </div>
                  <!-- 中文核心釋義 -->
                  <h2 style="margin:0;font-size:22px;color:#0f172a;font-weight:800;letter-spacing:-0.3px">
                    ${currentCard.zh}
                  </h2>
                </div>
              </div>

              <!-- 搭配詞提示 -->
              ${currentCard.collocation ? `
                <div style="margin-bottom:10px;font-size:13px;color:#92400e;background:#fef3c7;border:1px solid #fde68a;padding:5px 12px;border-radius:8px;font-weight:600;display:inline-block">
                  💡 必考搭配：${currentCard.collocation}
                </div>
              ` : ''}

              <!-- 雙語情境例句 -->
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:10px 14px;margin-bottom:10px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
                  <div style="font-size:14px;color:#1e293b;line-height:1.5;font-weight:500" lang="en">
                    "${currentCard.example}"
                  </div>
                  <div style="display:flex;gap:4px;flex-shrink:0">
                    <button class="btn small primary" data-fc-speak-sentence="${esc(currentCard.example)}" style="padding:3px 8px;font-size:11px;white-space:nowrap">
                      🔊 朗讀
                    </button>
                    <button class="btn small quiet" data-fc-speak-sentence-slow="${esc(currentCard.example)}" style="padding:3px 6px;font-size:11px;white-space:nowrap;border:1px solid #cbd5e1">
                      🐢 慢速
                    </button>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;margin-top:4px">
                  ${currentCard.exampleZh}
                </div>
              </div>

              <!-- 認知記憶、字根字首、孿生詞對或題型口訣 -->
              ${currentCard.memoryTip ? `
                <div style="font-size:12px;color:#334155;background:#f8fafc;padding:8px 12px;border-radius:8px;border-left:3px solid #10b981;border:1px solid #e2e8f0;border-left-width:3px">
                  🧠 <strong>深層記憶要點：</strong>${currentCard.memoryTip}
                </div>
              ` : ''}
            </div>

            <!-- 背面底部：翻回正面按鈕 -->
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #e2e8f0;padding-top:10px;margin-top:6px">
              <span style="font-size:12px;color:#94a3b8">🔄 點擊卡片翻回正面</span>
              <button class="btn quiet small" data-fc-flip="true" style="padding:4px 10px;font-size:12px;border-radius:6px">
                返回英文單字面
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

  // 發音單字 (標準 1.0x)
  if (d.fcSpeakWord) {
    playWord(d.fcSpeakWord, false);
    return true;
  }

  // 慢速發音單字 (0.65x)
  if (d.fcSpeakWordSlow) {
    playWord(d.fcSpeakWordSlow, true);
    return true;
  }

  // 發音例句 (標準)
  if (d.fcSpeakSentence) {
    playSentence(d.fcSpeakSentence, false);
    return true;
  }

  // 慢速發音例句 (0.75x)
  if (d.fcSpeakSentenceSlow) {
    playSentence(d.fcSpeakSentenceSlow, true);
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
  }, 4800);
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
