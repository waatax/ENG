// curriculum_elementary.mjs — 國小三至五年級單元（108 課綱第二學習階段與第三學習階段前半）。
// 原創教學內容；單元順序為本站編排，各校教科書版本順序可能不同。課綱條文對應見 curriculum_alignment.mjs。
import { alignmentFor } from './curriculum_alignment.mjs';

const ex = (stem, options, answer, analysis) => ({ stem, options, answer, analysis });
const c = (title, formula, explanation, example, examExample) => ({ title, formula, explanation, example, examExample });
const v = (word, ipa, pos, zh, sentence) => ({ word, ipa, pos, zh, sentence });
const d = (speaker, en, zh) => ({ speaker, en, zh });
const fq = (q, options, ans, hint1, hint2, solution) => ({ q, options, ans, hint1, hint2, solution });
const t = (wrong, correct, reason) => ({ wrong: wrong + ' ❌', correct: correct + ' ✔️', reason });

function unit(id, unitNo, title, stage, cefr, guideline, data) {
  const a = alignmentFor('unit:' + id);
  return { id, unitNo, title, indicator: a ? [...a.perf, ...a.content].join(' / ') : '', stage, cefr, competency: a ? a.comp.join('、') : '', guideline, sourceRef: 'core:' + id, ...data };
}
const S2 = '第二學習階段 (國小中年級 108 課綱)', S3 = '第三學習階段 (國小高年級 108 課綱)';

const g3 = {
 gradeId: 'g3', title: '國小三年級 (Grade 3)', stage: S2, badge: '英語起步 · 字母、聲音與教室英語',
 desc: '從 26 個字母的名稱、大小寫與聲音開始，學會打招呼、教室用語、數字、顏色、家人與動物，用簡單句型說出自己喜歡的東西。',
 semesters: [
  { semId: 'g3-s1', title: '三年級上學期 (3上)', examFocus: '字母辨識與書寫、打招呼、教室用語與數字 1–10', units: [
   unit('g3-s1-u1', 'Unit 1', '字母 A–M 與打招呼 (Letters A–M & Greetings)', S2, 'Pre-A1 (起步)', '能聽說讀寫 A–M 的大小寫，並用 Hello、Good morning 與 What’s your name? 互相問候。', {
    motivation: '英文有 26 個字母，每個字母都有大寫和小寫兩種樣子。先認識 A 到 M，再學會用英文打招呼，你就能和外國朋友說出第一句話！',
    concepts: [
     c('大寫與小寫是一對好朋友', 'A a · B b · C c · D d · E e · F f · G g · H h · I i · J j · K k · L l · M m', '大寫字母用在名字和句子開頭，小寫字母用在大部分的字裡。寫字時注意四線格：大寫頂到第一條線，小寫多在中間兩線之間，g、j 的尾巴會往下延伸。', 'Amy · Ben · Hello', ex('Which pair is the SAME letter?', ['B and d', 'G and g', 'M and n', 'E and f'], 1, 'G 是大寫、g 是小寫，名稱都唸 /dʒiː/。b 與 d、m 與 n 長得像但是不同字母。')),
     c('打招呼與自我介紹', 'Hello! / Hi! / Good morning! → What’s your name? → I’m ___. / My name is ___.', '早上見面說 Good morning，下午說 Good afternoon。別人問 What’s your name? 就回答 I’m Amy. 或 My name is Amy. 名字的第一個字母要大寫。', 'Good morning, Ms. Lin! — Good morning, Ben!', ex('Ms. Wang says, "What’s your name?" What do you say?', ['I’m fine.', 'I’m Kevin.', 'Good night.', 'Thank you.'], 1, '問名字要回答名字：I’m Kevin. I’m fine. 是回答 How are you?；Good night 是晚上道別。'))
    ],
    phonicsVocab: [v('hello', '/həˈloʊ/', 'interj.', '哈囉；你好', 'Hello, I’m Amy.'), v('morning', '/ˈmɔːrnɪŋ/', 'n.', '早上', 'Good morning, everyone!'), v('name', '/neɪm/', 'n.', '名字', 'My name is Ben.'), v('goodbye', '/ɡʊdˈbaɪ/', 'interj.', '再見', 'Goodbye, Ms. Lin!')],
    dialogue: [d('Amy', 'Hello! I’m Amy. What’s your name?', '哈囉！我是 Amy。你叫什麼名字？'), d('Ben', 'Hi, Amy! My name is Ben.', '嗨，Amy！我的名字是 Ben。'), d('Amy', 'Nice to meet you, Ben.', '很高興認識你，Ben。'), d('Ben', 'Nice to meet you, too.', '我也很高興認識你。')],
    reading: { title: 'Hello, Friends! (哈囉，朋友們！)', strategy: '先找大寫字母開頭的字，那常常是人名。', text: 'Hello! I’m Amy. I’m in Class 3A. This is my friend Ben. Ben is happy. Good morning, Ms. Lin!', questions: [{ q: 'Who is Amy’s friend?', ans: 'Ben.' }, { q: 'Who is the teacher?', ans: 'Ms. Lin.' }] },
    step0Clue: '先看問題問的是「名字」「心情」還是「時間」，再選對應的回答。',
    formativeQuiz: [
     fq('Which letter comes after F?', ['E', 'G', 'H', 'D'], 1, '唸一次字母歌：E, F, ___', 'F 後面是 G。', '字母順序 E–F–G，所以答案是 G。'),
     fq('It is 8 o’clock in the morning. You see your teacher. What do you say?', ['Good night.', 'Good morning.', 'Goodbye.', 'Good afternoon.'], 1, '早上 8 點是一天的開始。', 'morning＝早上。', '早上見面說 Good morning。Good night 是晚上道別。'),
     fq('Which name is written correctly?', ['amy', 'aMY', 'Amy', 'AmY'], 2, '名字的第一個字母要怎麼寫？', '名字開頭大寫，其餘小寫。', '人名第一個字母大寫，其他小寫：Amy。')
    ],
    traps: [t('my name is amy.', 'My name is Amy.', '句子開頭與人名的第一個字母都要大寫。'), t('A: What’s your name? B: I’m fine.', 'A: What’s your name? B: I’m Amy.', '問名字要回答名字；I’m fine 是回答 How are you?。')],
    checklist: ['我能說出並寫出 A 到 M 的大寫和小寫', '我能分辨 b/d、m/n 這些長得很像的字母', '我能用 Hello、Good morning 打招呼並說出自己的名字']
   }),
   unit('g3-s1-u2', 'Unit 2', '字母 N–Z 與字母的聲音 (Letters N–Z & Letter Sounds)', S2, 'Pre-A1 (起步)', '能聽說讀寫 N–Z，分辨字母「名稱」與「聲音」，聽出單字的第一個音。', {
    motivation: '字母有「名字」，也有「聲音」。B 的名字唸 /biː/，但在 bag 裡發 /b/。學會字母的聲音，你就能開始自己唸出英文字！',
    concepts: [
     c('字母名稱 vs. 字母聲音', '字母名稱：S = /es/ ｜ 字母聲音：s = /s/（sun）', '唸字母歌時用的是名稱；拼單字時要用聲音。看到 sun，要唸 /s/ + /ʌ/ + /n/，不是 /es/。', 'b → /b/ bag · m → /m/ milk · t → /t/ ten', ex('Which word begins with the /s/ sound?', ['zoo', 'sun', 'cat', 'pen'], 1, 'sun 的第一個音是 /s/。zoo 是 /z/，cat 是 /k/，pen 是 /p/。')),
     c('長得像的字母要分清楚', 'b /b/ ↔ d /d/ · p /p/ ↔ q /kw/ · n /n/ ↔ u /ʌ/', 'b 是「先有棒子再有肚子」，d 是「先有肚子再有棒子」。可以把左手比成 b、右手比成 d，排在一起就是一張床 bed。', 'bed · dog · pig · queen', ex('Look: _ig (豬). Which letter makes the word "pig"?', ['q', 'b', 'p', 'd'], 2, 'pig 開頭是 /p/，寫成 p。q 通常和 u 一起出現（queen）。'))
    ],
    phonicsVocab: [v('nose', '/noʊz/', 'n.', '鼻子', 'Touch your nose.'), v('queen', '/kwiːn/', 'n.', '皇后；女王', 'The queen has a crown.'), v('sun', '/sʌn/', 'n.', '太陽', 'The sun is hot.'), v('zebra', '/ˈziːbrə/', 'n.', '斑馬', 'The zebra is black and white.')],
    dialogue: [d('Teacher', 'What letter is this?', '這是什麼字母？'), d('Mia', 'It’s S. S says /s/, /s/, sun!', '是 S。S 發 /s/ 的音，sun！'), d('Teacher', 'Great! What about this one?', '很好！那這個呢？'), d('Mia', 'It’s Z. /z/, /z/, zebra!', '是 Z。/z/、/z/，斑馬！')],
    reading: { title: 'The ABC Zoo (ABC 動物園)', strategy: '看每個字的第一個字母，猜猜它的聲音。', text: 'N is for nest. O is for ox. P is for pig. Q is for queen. R is for rabbit. S is for sun. Z is for zebra.', questions: [{ q: 'What is P for?', ans: 'Pig.' }, { q: 'Which animal starts with R?', ans: 'Rabbit.' }] },
    step0Clue: '聽單字時，先抓住「第一個聲音」，再對照字母。',
    formativeQuiz: [
     fq('Which word starts with the same sound as "rabbit"?', ['red', 'yes', 'wet', 'lip'], 0, '先唸 rabbit 的第一個音。', 'rabbit 開頭是 /r/。', 'red 也以 /r/ 開頭。'),
     fq('Which letter is NOT between N and S?', ['P', 'Q', 'T', 'R'], 2, '唸：N, O, P, Q, R, S。', 'T 在 S 後面。', 'N 到 S 之間是 O、P、Q、R，沒有 T。'),
     fq('"d-o-g" — which picture matches?', ['🐶', '🐷', '🐱', '🦓'], 0, '把三個聲音連起來唸。', '/d/ + /ɑ/ + /ɡ/。', 'd-o-g 拼成 dog，是狗。')
    ],
    traps: [t('把 bed 寫成 ded', 'bed', 'b 和 d 方向相反；bed 兩邊各是 b 和 d，像一張床。'), t('看到 sun 唸成 /es/-/juː/-/en/', '/s/-/ʌ/-/n/ → sun', '拼字時要用字母的「聲音」，不是字母的「名稱」。')],
    checklist: ['我能說出並寫出 N 到 Z 的大小寫', '我知道字母名稱和字母聲音不一樣', '我能聽出一個單字的第一個聲音']
   }),
   unit('g3-s1-u3', 'Unit 3', '教室用語與數字 1–10 (Classroom English & Numbers 1–10)', S2, 'Pre-A1 (起步)', '能聽懂並做出教室指令，數出 1–10，並回答 How many…?', {
    motivation: '上英文課時，老師常說 Stand up!、Open your book!。聽懂這些話，你就能跟著做；學會 1 到 10，就能數東西、回答「有幾個」。',
    concepts: [
     c('教室指令：動詞放在最前面', '動詞原形 + (受詞)：Stand up. / Sit down. / Open your book. / Be quiet, please.', '叫別人做事的句子叫「祈使句」，直接用動詞開頭，不用說 you。加上 please 會更有禮貌。', 'Close your book, please.', ex('Your teacher wants you to look at the board. What does she say?', ['Sit down.', 'Look at the board.', 'Be quiet.', 'Stand up.'], 1, '看黑板是 look at the board；其他指令是坐下、安靜、起立。')),
     c('數字 1–10 與 How many', 'How many + 複數名詞? → (I have) three pencils.', '問數量用 How many，後面的東西加 s。回答時，數字大於 1 的東西也要加 s：one pen、two pens。', 'How many books? — Five books.', ex('How many apples? 🍎🍎🍎🍎', ['Three apples.', 'Four apples.', 'Four apple.', 'Five apples.'], 1, '數一數有 4 個，數量大於一要加 s：four apples。'))
    ],
    phonicsVocab: [v('stand', '/stænd/', 'v.', '站', 'Stand up, please.'), v('open', '/ˈoʊpən/', 'v.', '打開', 'Open your book.'), v('quiet', '/ˈkwaɪət/', 'adj.', '安靜的', 'Be quiet, please.'), v('seven', '/ˈsevən/', 'num.', '七', 'I have seven crayons.')],
    dialogue: [d('Teacher', 'Good morning, class. Sit down, please.', '同學早安，請坐下。'), d('Class', 'Thank you, Mr. Chen.', '謝謝陳老師。'), d('Teacher', 'How many books do you have, Leo?', 'Leo，你有幾本書？'), d('Leo', 'I have two books.', '我有兩本書。')],
    reading: { title: 'In My Classroom (在我的教室裡)', strategy: '找數字，再看數字後面的東西。', text: 'This is my classroom. There are ten desks. I have one bag and three pencils. My teacher says, "Open your book, please."', questions: [{ q: 'How many desks are there?', ans: 'Ten.' }, { q: 'How many pencils does the writer have?', ans: 'Three.' }] },
    step0Clue: '聽到 How many，就準備好「數字 + 東西（加 s）」。',
    formativeQuiz: [
     fq('Which number is "eight"?', ['6', '8', '3', '9'], 1, 'e-i-g-h-t。', '六 six、八 eight、九 nine。', 'eight 是 8。'),
     fq('Mr. Chen says, "Close your book." What do you do?', ['打開書', '闔上書', '站起來', '舉手'], 1, 'close 和 open 意思相反。', 'close＝關上、闔上。', 'Close your book 是把書闔起來。'),
     fq('I have ___.', ['two pen', 'two pens', 'a pens', 'one pens'], 1, '數量是二，東西要不要加 s？', '大於一要加 s。', 'two pens 正確；one pen 不加 s。')
    ],
    traps: [t('You stand up.', 'Stand up, please.', '下指令時直接用動詞開頭；加 please 更有禮貌。'), t('I have three pencil.', 'I have three pencils.', '數量大於一的可數名詞要加 s。')],
    checklist: ['我聽得懂 Stand up、Sit down、Open/Close your book', '我能用英文從 1 數到 10', '我能回答 How many…? 並在名詞後面加 s']
   })
  ] },
  { semId: 'g3-s2', title: '三年級下學期 (3下)', examFocus: '顏色與文具、家人介紹、動物與喜好問答', units: [
   unit('g3-s2-u4', 'Unit 4', '顏色與文具 (Colors & School Things)', S2, 'Pre-A1 (起步)', '能說出常見顏色與文具，用 What color is it? 與 This is a/an… 描述物品並分類。', {
    motivation: '你的鉛筆盒裡有什麼？是什麼顏色？學會顏色和文具的說法，就能介紹自己的東西，也能幫物品分類。',
    concepts: [
     c('This is a / an + 物品', 'This is a pen. / This is an eraser.（母音開頭的字用 an）', 'a 和 an 都是「一個」。如果下一個字的第一個聲音是母音（a, e, i, o, u 的音），用 an，例如 an eraser、an apple。', 'This is a ruler. This is an eraser.', ex('This is ___ eraser.', ['a', 'an', 'two', 'the a'], 1, 'eraser 以母音 /ɪ/ 開頭，用 an。')),
     c('問顏色與描述顏色', 'What color is it? → It’s red. / It’s a blue pen.', '顏色放在物品前面：a red bag（紅色的書包）。中文說「書包是紅色的」，英文也能說 The bag is red.', 'What color is your bag? — It’s green.', ex('What color is the sky on a sunny day? ☀️', ['It’s blue.', 'It’s a blue.', 'Blue it is.', 'It blue.'], 0, '回答顏色用 It’s + 顏色；It’s a blue 少了名詞，It blue 少了 is。'))
    ],
    phonicsVocab: [v('pencil', '/ˈpensəl/', 'n.', '鉛筆', 'This is a yellow pencil.'), v('eraser', '/ɪˈreɪsər/', 'n.', '橡皮擦', 'I have an eraser.'), v('ruler', '/ˈruːlər/', 'n.', '尺', 'The ruler is long.'), v('purple', '/ˈpɜːrpəl/', 'adj.', '紫色的', 'My bag is purple.')],
    dialogue: [d('Ken', 'What’s this?', '這是什麼？'), d('Lily', 'It’s a crayon.', '是一支蠟筆。'), d('Ken', 'What color is it?', '它是什麼顏色？'), d('Lily', 'It’s orange.', '是橘色。')],
    reading: { title: 'My Pencil Box (我的鉛筆盒)', strategy: '先找顏色字，再找它描述哪一個東西。', text: 'This is my pencil box. It is blue. I have a red pen, a yellow pencil, and an eraser. My ruler is green.', questions: [{ q: 'What color is the pencil box?', ans: 'It is blue.' }, { q: 'What color is the ruler?', ans: 'It is green.' }] },
    step0Clue: '看到名詞前的空格，先唸唸看下一個字的第一個聲音，決定 a 或 an。',
    formativeQuiz: [
     fq('Which group are ALL colors?', ['red, pen, blue', 'green, pink, black', 'book, bag, ruler', 'cat, dog, white'], 1, '把每個字的意思想一想。', '顏色：紅、綠、粉紅、黑…', 'green、pink、black 都是顏色，這就是「分類」。'),
     fq('This is ___ apple.', ['a', 'an', 'two', 'three'], 1, 'apple 的第一個聲音是什麼？', '/æ/ 是母音。', 'apple 以母音開頭，用 an。'),
     fq('A: What color is your bag? B: ___', ['It’s a bag.', 'It’s brown.', 'Yes, it is.', 'I’m fine.'], 1, '問題問的是顏色。', '回答要說出顏色。', 'It’s brown. 回答了顏色。')
    ],
    traps: [t('This is a eraser.', 'This is an eraser.', 'eraser 以母音開頭，要用 an。'), t('It’s pen red.', 'It’s a red pen.', '顏色放在物品前面：a red pen。')],
    checklist: ['我能說出 8 種以上的顏色', '我會用 a / an 介紹文具', '我能把字分成「顏色」「文具」「動物」等類別']
   }),
   unit('g3-s2-u5', 'Unit 5', '我的家人 (My Family)', S2, 'Pre-A1 ~ A1', '能用 This is my… 介紹家人，用 he / she 描述，聽說句子的重音。', {
    motivation: '照片裡的人是誰？學會家人的英文和 This is my father.，你就能向朋友介紹你最重要的人。',
    concepts: [
     c('介紹家人：This is my…', 'This is my + 家人。 → He is / She is + 描述。', '男生用 he，女生用 she。介紹完可以多說一句：He is tall. She is kind.', 'This is my mother. She is a nurse.', ex('This is my grandpa. ___ is seventy.', ['She', 'He', 'It', 'They'], 1, 'grandpa（爺爺）是男生，男生要用 He 代替；女生才用 She。')),
     c('問「他是誰？」', 'Who is he? / Who is she? → He’s my brother. / She’s my aunt.', 'Who 用來問人。回答時用 He’s（He is）或 She’s（She is）。說句子時，重要的字要唸重一點：This is my MOTHER.', 'Who is she? — She’s my sister.', ex('Look at the boy in the photo. You ask: "___"', ['Who is he?', 'What is he?', 'Who is she?', 'How is it?'], 0, '照片中是男生，問「他是誰」用 Who is he?；問女生才用 Who is she?'))
    ],
    phonicsVocab: [v('father', '/ˈfɑːðər/', 'n.', '爸爸', 'This is my father.'), v('mother', '/ˈmʌðər/', 'n.', '媽媽', 'My mother is kind.'), v('brother', '/ˈbrʌðər/', 'n.', '哥哥；弟弟', 'He is my brother.'), v('sister', '/ˈsɪstər/', 'n.', '姊姊；妹妹', 'She is my sister.')],
    dialogue: [d('Nina', 'Who is she?', '她是誰？'), d('Tom', 'She’s my sister, Kelly.', '她是我妹妹 Kelly。'), d('Nina', 'Who is he?', '他是誰？'), d('Tom', 'He’s my dad. He is a cook.', '他是我爸爸。他是廚師。')],
    reading: { title: 'Tom’s Family Photo (Tom 的全家福)', strategy: '找出 he 和 she 指的是誰。', text: 'This is my family. This is my dad. He is tall. This is my mom. She is a teacher. This is my sister, Kelly. She is five.', questions: [{ q: 'Who is a teacher?', ans: 'Tom’s mom.' }, { q: 'How old is Kelly?', ans: 'She is five.' }] },
    step0Clue: '先判斷照片中的人是男生還是女生，再選 he 或 she。',
    formativeQuiz: [
     fq('Which word is a girl?', ['brother', 'father', 'aunt', 'uncle'], 2, '想想每個家人是男生還是女生。', 'aunt＝阿姨、姑姑。', 'aunt 是女性；其他是男性。'),
     fq('This is my mom. ___ is a nurse.', ['He', 'She', 'It', 'I'], 1, 'mom 是男生還是女生？', '女生用 she。', 'mom 是女生，用 She。'),
     fq('Which sentence is correct?', ['This my brother.', 'This is my brother.', 'This is brother my.', 'Is this my brother is.'], 1, '介紹的句型是 This is my…', '別漏掉 is。', 'This is my brother. 完整又正確。')
    ],
    traps: [t('This my sister.', 'This is my sister.', '英文句子要有動詞，這裡不能少了 is。'), t('My mom, he is kind.', 'My mom is kind. / She is kind.', '媽媽是女生用 she，而且不要重複主詞。')],
    checklist: ['我能說出 8 個家人的英文', '我能用 This is my… 介紹家人', '我會分清楚 he 和 she']
   }),
   unit('g3-s2-u6', 'Unit 6', '動物與喜好 (Animals & I Like…)', S2, 'Pre-A1 ~ A1', '能說出常見動物並分類，用 I like… 與 Do you like…? 表達喜好，聽出問句語調上揚。', {
    motivation: '你喜歡貓還是狗？學會 I like cats. 和 Do you like…?，就能和同學聊彼此喜歡的動物。',
    concepts: [
     c('I like + 複數名詞', 'I like cats. / I don’t like snakes.', '說「喜歡某種動物」時，動物通常加 s，表示這一類動物：I like dogs.（我喜歡狗）。不喜歡就說 I don’t like…。', 'I like rabbits. I don’t like spiders.', ex('I like ___.', ['dog', 'dogs', 'a dogs', 'doges'], 1, '說喜歡「狗這一類動物」時，名詞用複數 dogs，不說 I like dog。'))
     ,
     c('Do you like…? 問句與簡答', 'Do you like birds? ↗ → Yes, I do. / No, I don’t.', '是非問句的尾巴語調要往上揚 ↗。回答時用 Yes, I do. 或 No, I don’t.，不要只說 Yes, I like.', 'Do you like pandas? — Yes, I do!', ex('A: Do you like fish? B: ___', ['Yes, I am.', 'Yes, I do.', 'Yes, I like.', 'Yes, you do.'], 1, '用 Do 問就用 do 回答：Yes, I do.'))
    ],
    phonicsVocab: [v('rabbit', '/ˈræbɪt/', 'n.', '兔子', 'The rabbit is cute.'), v('monkey', '/ˈmʌŋki/', 'n.', '猴子', 'Monkeys like bananas.'), v('bird', '/bɜːrd/', 'n.', '鳥', 'I like birds.'), v('elephant', '/ˈelɪfənt/', 'n.', '大象', 'The elephant is big.')],
    dialogue: [d('Sam', 'Do you like elephants?', '你喜歡大象嗎？'), d('Ivy', 'Yes, I do. They are big and smart.', '喜歡。牠們又大又聰明。'), d('Sam', 'Do you like snakes?', '你喜歡蛇嗎？'), d('Ivy', 'No, I don’t. I like birds.', '不喜歡。我喜歡鳥。')],
    reading: { title: 'Pets, Farm Animals and Zoo Animals (寵物、農場和動物園的動物)', strategy: '把動物分成三組，找出規律。', text: 'Cats and dogs are pets. Cows and pigs live on a farm. Lions and elephants live in the zoo. I like pets. I have a cat.', questions: [{ q: 'Where do cows live?', ans: 'On a farm.' }, { q: 'What pet does the writer have?', ans: 'A cat.' }] },
    step0Clue: '聽到句子開頭是 Do you…，回答就用 Yes, I do. / No, I don’t.',
    formativeQuiz: [
     fq('Which animal lives in the zoo?', ['cat', 'lion', 'dog', 'hamster'], 1, '想想動物園裡有什麼。', 'cat、dog、hamster 常是寵物。', 'lion（獅子）住在動物園。'),
     fq('A: Do you like monkeys? B: No, ___', ['I don’t.', 'I do.', 'I am not.', 'I not.'], 0, '否定的簡答怎麼說？', 'do not = don’t。', 'No, I don’t. 是正確的否定簡答。'),
     fq('Which question should go UP ↗ at the end?', ['I like cats.', 'Do you like cats?', 'Cats are cute.', 'I have a cat.'], 1, '哪一句是是非問句？', '是非問句尾音上揚。', 'Do you like cats? 是問句，語調上揚。')
    ],
    traps: [t('I like cat.', 'I like cats.', '表示喜歡一類動物，名詞用複數。'), t('Yes, I like.', 'Yes, I do.', 'Do you…? 問句用 do 簡答。')],
    checklist: ['我能說出 10 種動物', '我能用 I like / I don’t like 表達喜好', '我會用 Yes, I do. / No, I don’t. 回答']
   })
  ] }
 ]
};

const g4 = {
 gradeId: 'g4', title: '國小四年級 (Grade 4)', stage: S2, badge: '拼讀起飛 · 看字讀音、聽音拼字',
 desc: '學會短母音拼讀、數字 11–100、食物飲料、天氣季節、星期與國內外節慶、身體與能力，開始用完整句子和同學溝通。',
 semesters: [
  { semId: 'g4-s1', title: '四年級上學期 (4上)', examFocus: '短母音 CVC 拼讀、數字與年齡、食物飲料', units: [
   unit('g4-s1-u1', 'Unit 1', '短母音拼讀 CVC (Short Vowels & CVC Words)', S2, 'Pre-A1 ~ A1', '能唸出 a e i o u 的短母音，看字讀出 CVC 單字，聽音拼出字。', {
    motivation: 'c-a-t 三個聲音連起來就是 cat！只要學會五個短母音，你就能自己唸出幾百個英文字，也能聽到聲音就拼出來。',
    concepts: [
     c('五個短母音', 'a /æ/ cat · e /e/ bed · i /ɪ/ pig · o /ɑ/ dog · u /ʌ/ cup', '子音 + 母音 + 子音（CVC）的短字，母音通常唸短母音。先找出中間的母音，就知道怎麼唸。', 'hat · ten · sit · hot · bus', ex('Which word has the same vowel sound as "cat"?', ['bed', 'map', 'pig', 'cup'], 1, 'cat 和 map 中間都是短母音 a /æ/。'))
     ,
     c('拼讀三步驟：拆音 → 連音 → 讀字', 'm-a-p → /m/ /æ/ /p/ → map', '看字讀音：一個字母一個聲音，慢慢連起來。聽音拼字：把聽到的聲音一個一個寫成字母。', 'Listen: /s/ /ɪ/ /t/ → sit', ex('Listen: /b/ /ʌ/ /s/. Which word is it?', ['bus', 'bis', 'bas', 'bos'], 0, '/b/、/ʌ/、/s/ 三個聲音，/ʌ/ 是短母音 u，所以拼成 bus（公車）。'))
    ],
    phonicsVocab: [v('cat', '/kæt/', 'n.', '貓', 'The cat is on the mat.'), v('bed', '/bed/', 'n.', '床', 'My bed is big.'), v('pig', '/pɪɡ/', 'n.', '豬', 'The pig is pink.'), v('cup', '/kʌp/', 'n.', '杯子', 'I have a red cup.')],
    dialogue: [d('Teacher', 'Let’s read: /h/ /æ/ /t/.', '我們來唸：/h/ /æ/ /t/。'), d('Kids', 'Hat!', '帽子！'), d('Teacher', 'Now spell "dog."', '現在拼出 dog。'), d('Kids', 'D-O-G, dog!', 'D-O-G，dog！')],
    reading: { title: 'A Fat Cat (一隻胖貓)', strategy: '每個字都用拼讀唸唸看，再理解句子。', text: 'A fat cat sat on a mat. A big pig sat in the mud. The cat and the pig had fun in the sun.', questions: [{ q: 'Where did the cat sit?', ans: 'On a mat.' }, { q: 'Where did the pig sit?', ans: 'In the mud.' }] },
    step0Clue: '遇到不會的短字，先找中間的母音，再把三個聲音連起來。',
    formativeQuiz: [
     fq('Which word does NOT have the short "i" sound?', ['sit', 'pin', 'bed', 'big'], 2, '短母音 i 唸 /ɪ/。', 'bed 的母音是 e。', 'bed 是短母音 e，其他是短母音 i。'),
     fq('h-o-t spells…', ['hat', 'hot', 'hit', 'hut'], 1, '中間的字母是 o。', 'o 唸 /ɑ/。', 'h-o-t 拼成 hot（熱的）。'),
     fq('Which words rhyme (押韻)?', ['cat / hat', 'cat / cup', 'pig / pen', 'dog / bed'], 0, '押韻是字尾的聲音相同。', '-at 和 -at。', 'cat 和 hat 都是 -at 結尾，聲音相同。')
    ],
    traps: [t('把 bed 唸成 /bɪd/', '/bed/', '短母音 e 唸 /e/，嘴巴比 i 張得大一點。'), t('聽到 /kʌp/ 寫成 cap', 'cup', '/ʌ/ 是短母音 u；/æ/ 才是短母音 a（cap）。')],
    checklist: ['我能唸出 a e i o u 的短母音', '我能自己唸出 CVC 單字', '我聽到三個聲音就能拼出單字']
   }),
   unit('g4-s1-u2', 'Unit 2', '數字 11–100：年齡與數量 (Numbers 11–100: How Old & How Many)', S2, 'A1', '能說寫 11–100，聽出 -teen 與 -ty 的重音差別，回答 How old…? 與 How many…?', {
    motivation: '13 和 30 聽起來很像，買東西時聽錯可就麻煩了！學會重音的秘密，就能聽清楚數字，也能說出自己的年齡。',
    concepts: [
     c('-teen 和 -ty 的重音不同', 'thirTEEN (13) ↔ THIRty (30) · fifTEEN (15) ↔ FIFty (50)', '-teen 的重音在後面，而且尾巴的 n 要唸清楚；-ty 的重音在前面。聽數字時，注意哪一個音節比較重、比較長。', 'I’m thirteen. / It’s thirty dollars.', ex('You hear: "FOR-ty." Which number is it?', ['14', '40', '4', '44'], 1, '重音在前面、結尾是 -ty，所以是 forty（40）。'))
     ,
     c('問年齡與數量', 'How old are you? → I’m ten (years old). · How many ___s? → Twenty-five.', '21 到 99 的寫法是「十位 + 連字號 + 個位」：twenty-one、forty-five。問年齡用 How old，問數量用 How many。', 'How many students are in your class? — Twenty-eight.', ex('A: How old is your grandma? B: ___', ['She is seventy.', 'She is seventy students.', 'She has seventy.', 'Seventy old.'], 0, '回答年齡：She is seventy (years old).'))
    ],
    phonicsVocab: [v('eleven', '/ɪˈlevən/', 'num.', '十一', 'I’m eleven years old.'), v('fifteen', '/ˌfɪfˈtiːn/', 'num.', '十五', 'There are fifteen boys.'), v('fifty', '/ˈfɪfti/', 'num.', '五十', 'The book is fifty dollars.'), v('hundred', '/ˈhʌndrəd/', 'num.', '百', 'I can count to one hundred.')],
    dialogue: [d('Clerk', 'This toy car is fifteen dollars.', '這台玩具車十五元。'), d('Ray', 'Fifteen or fifty?', '是十五還是五十？'), d('Clerk', 'Fif-TEEN. One five.', '十五，一和五。'), d('Ray', 'Great! Here you are.', '太好了！給你。')],
    reading: { title: 'Our Class Survey (班級小調查)', strategy: '先找數字，再看數字在說什麼。', text: 'There are twenty-six students in our class. Fourteen students like dogs. Twelve students like cats. Our teacher is thirty-five years old.', questions: [{ q: 'How many students like cats?', ans: 'Twelve.' }, { q: 'How old is the teacher?', ans: 'Thirty-five.' }] },
    step0Clue: '聽數字時先判斷重音在前還是在後，再決定是 -teen 還是 -ty。',
    formativeQuiz: [
     fq('Which is 48?', ['forty-eight', 'fourteen-eight', 'eighty-four', 'four-eight'], 0, '十位是 40，個位是 8。', '40 = forty。', '48 寫成 forty-eight。'),
     fq('How many legs does a spider have?', ['Six.', 'Eight.', 'Ten.', 'Four.'], 1, '想想蜘蛛的樣子。', '昆蟲六隻腳，蜘蛛不是昆蟲。', '蜘蛛有八隻腳：eight。'),
     fq('Which number has the stress on the SECOND syllable?', ['sixty', 'sixteen', 'twenty', 'ninety'], 1, '哪一個是 -teen？', '-teen 重音在後。', 'sixTEEN 的重音在後面。')
    ],
    traps: [t('I’m ten years.', 'I’m ten (years old).', '說年齡要加 old，或只說 I’m ten.'), t('fourty', 'forty', '40 的拼字沒有 u：forty。')],
    checklist: ['我能用英文從 11 數到 100', '我聽得出 thirteen 和 thirty 的不同', '我能回答 How old…? 和 How many…?']
   }),
   unit('g4-s1-u3', 'Unit 3', '食物與飲料 (Food & Drinks: I Want… / Do You Want…?)', S2, 'A1', '能說出常見食物飲料，用 I’m hungry / thirsty、I want… 表達需求，禮貌地點餐。', {
    motivation: '肚子餓了怎麼說？早餐店點餐、朋友請你吃東西時，學會 I want a sandwich. 和 Yes, please.，就能清楚又有禮貌地表達。',
    concepts: [
     c('說出需要：I’m hungry. I want…', 'I’m hungry / thirsty. → I want + a/an + 食物 / some + 飲料。', '餓了說 hungry，渴了說 thirsty。可以一個一個數的食物用 a/an（a sandwich），飲料常用 some（some milk）。', 'I’m thirsty. I want some water.', ex('I’m thirsty. I want ___.', ['a hamburger', 'some juice', 'a sandwich', 'an egg'], 1, 'thirsty 是口渴，需要的是飲料，所以選 some juice；其他選項都是食物。'))
     ,
     c('禮貌地問與答', 'Do you want some milk? → Yes, please. / No, thank you.', '別人請你吃東西，接受說 Yes, please.，不要說 Yes, I want.；拒絕要說 No, thank you.。', 'Do you want an apple? — No, thank you.', ex('Grandma: "Do you want some cookies?" You are full. You say: ___', ['Yes, please.', 'No, thank you.', 'I don’t want.', 'Give me.'], 1, '吃飽了要有禮貌地拒絕：No, thank you.'))
    ],
    phonicsVocab: [v('hungry', '/ˈhʌŋɡri/', 'adj.', '餓的', 'I’m hungry. Let’s eat.'), v('thirsty', '/ˈθɜːrsti/', 'adj.', '渴的', 'Are you thirsty?'), v('sandwich', '/ˈsænwɪtʃ/', 'n.', '三明治', 'I want a sandwich.'), v('juice', '/dʒuːs/', 'n.', '果汁', 'I like orange juice.')],
    dialogue: [d('Clerk', 'Good morning. What do you want?', '早安。你要什麼？'), d('Joy', 'I want a sandwich and some milk, please.', '我要一個三明治和一些牛奶，謝謝。'), d('Clerk', 'Do you want an egg, too?', '你也要一顆蛋嗎？'), d('Joy', 'No, thank you.', '不用，謝謝。')],
    reading: { title: 'Breakfast Time (早餐時間)', strategy: '找出每個人吃什麼、喝什麼。', text: 'It’s seven o’clock. Dad wants some coffee and an egg. Mom wants some tea. I’m hungry. I want a hamburger and some juice.', questions: [{ q: 'What does Mom want?', ans: 'Some tea.' }, { q: 'What does the writer want to drink?', ans: 'Some juice.' }] },
    step0Clue: '先看是「吃的」還是「喝的」，再決定用 a/an 或 some。',
    formativeQuiz: [
     fq('Which one is a drink?', ['rice', 'milk', 'bread', 'noodles'], 1, '哪一個可以喝？', 'drink＝飲料。', 'milk（牛奶）是飲料。'),
     fq('I want ___ egg.', ['a', 'an', 'some', 'two'], 1, 'egg 的第一個聲音是母音。', '母音開頭用 an。', 'an egg。'),
     fq('A: Do you want some tea? B: ___ I’m thirsty.', ['No, thank you.', 'Yes, please.', 'I’m full.', 'Goodbye.'], 1, '他說自己渴了。', '渴了就想喝。', '口渴所以接受：Yes, please.')
    ],
    traps: [t('I am hungry. I want a milk.', 'I want some milk.', '飲料通常用 some，不用 a。'), t('Yes, I want.', 'Yes, please.', '接受別人提供的東西，說 Yes, please. 比較自然有禮。')],
    checklist: ['我能說出 10 種食物和飲料', '我能說 I’m hungry / thirsty 並說出想要的東西', '我會用 Yes, please. / No, thank you. 有禮貌地回答']
   })
  ] },
  { semId: 'g4-s2', title: '四年級下學期 (4下)', examFocus: '天氣季節、星期與國內外節慶、身體部位與能力', units: [
   unit('g4-s2-u4', 'Unit 4', '天氣與季節 (Weather & Seasons)', S2, 'A1', '能描述天氣與四季，看氣象圖示說句子，並依天氣給簡單建議。', {
    motivation: '出門前看看天氣：今天會下雨嗎？要不要帶傘？學會天氣英文，看氣象圖也能說出 It’s rainy. Take an umbrella!',
    concepts: [
     c('問天氣、說天氣', 'How’s the weather? → It’s sunny / cloudy / rainy / windy / hot / cold.', '描述天氣用 It’s 開頭，這裡的 it 不是指某個東西，而是代表天氣。很多天氣字是名詞加 y：sun → sunny、rain → rainy。', 'How’s the weather today? — It’s windy.', ex('☁️🌧️ How’s the weather?', ['It’s sunny.', 'It’s rainy.', 'It’s hot.', 'It’s snowy.'], 1, '圖示是雲和雨滴，表示下雨天，所以說 It’s rainy.，不是晴天或下雪。'))
     ,
     c('四季與建議', 'spring 春 · summer 夏 · fall/autumn 秋 · winter 冬 → It’s cold. Wear a coat.', '可以根據天氣給建議：下雨帶傘（Take an umbrella.）、冷要穿外套（Wear a coat.）。給建議也是祈使句，用動詞開頭。', 'It’s hot in summer. Drink some water.', ex('It’s cold and windy. What should you say to your brother?', ['Wear a coat.', 'Take off your coat.', 'Eat ice cream.', 'Go swimming.'], 0, '又冷又有風，合理的建議是穿外套 Wear a coat.；吃冰、游泳都不適合。'))
    ],
    phonicsVocab: [v('sunny', '/ˈsʌni/', 'adj.', '晴朗的', 'It’s sunny today.'), v('cloudy', '/ˈklaʊdi/', 'adj.', '多雲的', 'It’s cloudy in the morning.'), v('umbrella', '/ʌmˈbrelə/', 'n.', '雨傘', 'Take an umbrella.'), v('winter', '/ˈwɪntər/', 'n.', '冬天', 'It’s cold in winter.')],
    dialogue: [d('Mom', 'How’s the weather outside?', '外面天氣怎麼樣？'), d('Ella', 'It’s cloudy and windy.', '多雲又有風。'), d('Mom', 'It may rain. Take an umbrella.', '可能會下雨，帶把傘。'), d('Ella', 'OK, Mom. Thanks!', '好的，媽媽。謝謝！')],
    reading: { title: 'Weather Report (氣象報告)', strategy: '看圖示與地名，配對天氣。', text: 'Good morning! Here is the weather. Taipei is rainy. Taichung is cloudy. Kaohsiung is sunny and hot. Have a nice day!', questions: [{ q: 'How’s the weather in Taipei?', ans: 'It’s rainy.' }, { q: 'Which city is sunny and hot?', ans: 'Kaohsiung.' }] },
    step0Clue: '先看圖示（☀️☁️🌧️💨），再找對應的天氣字。',
    formativeQuiz: [
     fq('Which season is usually the hottest in Taiwan?', ['winter', 'summer', 'spring', 'fall'], 1, '想想什麼時候最熱。', '暑假在這個季節。', 'summer 夏天最熱。'),
     fq('💨 It’s ___.', ['windy', 'rainy', 'snowy', 'sunny'], 0, '這個圖示是風。', 'wind＋y。', '有風是 windy。'),
     fq('Which sentence is correct?', ['It sunny.', 'It’s sunny.', 'Is sunny.', 'It’s sun.'], 1, '描述天氣的句型？', 'It’s + 天氣形容詞。', 'It’s sunny. 主詞、動詞、形容詞都齊全。')
    ],
    traps: [t('Today is rain.', 'It’s rainy today. / It’s raining.', '描述天氣用 It’s + 形容詞（rainy），rain 是名詞或動詞。'), t('It’s hot in winter. Wear a coat.', 'It’s cold in winter. Wear a coat.', '注意天氣和建議要合理對應。')],
    checklist: ['我能說出 6 種天氣', '我能說出四季的英文', '我能看天氣圖示說句子並給建議']
   }),
   unit('g4-s2-u5', 'Unit 5', '星期與國內外節慶 (Days of the Week & Festivals)', S2, 'A1', '能說出星期、問今天星期幾，認識國內外主要節慶並說出節慶祝福語。', {
    motivation: '星期一要上課，星期六可以去公園！過年說 Happy New Year，聖誕節說 Merry Christmas。學會星期和節慶，就能和外國朋友分享你的生活和文化。',
    concepts: [
     c('星期與 What day is it?', 'Monday · Tuesday · Wednesday · Thursday · Friday · Saturday · Sunday → What day is it today? It’s Friday.', '星期的第一個字母一定大寫。在星期幾做某事，用 on：on Sunday。', 'What day is it today? — It’s Wednesday. I have P.E. on Wednesday.', ex('Today is Tuesday. What day is tomorrow?', ['Monday', 'Wednesday', 'Thursday', 'Sunday'], 1, 'Tuesday 的下一天是 Wednesday。'))
     ,
     c('國內外節慶與祝福語', '春節 Chinese New Year：Happy New Year! · 端午節 Dragon Boat Festival · 中秋節 Moon Festival · 聖誕節 Christmas：Merry Christmas! · 萬聖節 Halloween：Trick or treat!', '每個節慶都有特別的食物和活動：春節拿紅包（red envelopes），端午節吃粽子（rice dumplings），中秋節賞月吃月餅（mooncakes），萬聖節小朋友說 Trick or treat! 要糖果。', 'People eat mooncakes at the Moon Festival.', ex('Which festival do people eat rice dumplings at?', ['Christmas', 'Dragon Boat Festival', 'Halloween', 'Moon Festival'], 1, '端午節吃粽子，粽子英文是 rice dumplings。'))
    ],
    phonicsVocab: [v('Monday', '/ˈmʌndeɪ/', 'n.', '星期一', 'I go to school on Monday.'), v('Saturday', '/ˈsætərdeɪ/', 'n.', '星期六', 'We play in the park on Saturday.'), v('festival', '/ˈfestɪvəl/', 'n.', '節日', 'The Moon Festival is in fall.'), v('mooncake', '/ˈmuːnkeɪk/', 'n.', '月餅', 'I like mooncakes.')],
    dialogue: [d('Ann', 'What day is it today?', '今天星期幾？'), d('Leo', 'It’s Friday. Tomorrow is the Moon Festival!', '星期五。明天就是中秋節！'), d('Ann', 'What do you do at the Moon Festival?', '你們中秋節做什麼？'), d('Leo', 'We look at the moon and eat mooncakes.', '我們賞月、吃月餅。')],
    reading: { title: 'Festivals Around the World (世界各地的節慶)', strategy: '把節慶和它的食物或活動配對。', text: 'In Taiwan, children get red envelopes at Chinese New Year. In the U.S., children say "Trick or treat!" on Halloween. Many people give gifts at Christmas.', questions: [{ q: 'What do children get at Chinese New Year?', ans: 'Red envelopes.' }, { q: 'What do children say on Halloween?', ans: '"Trick or treat!"' }] },
    step0Clue: '題目提到食物或活動時，先想它屬於哪一個節慶。',
    formativeQuiz: [
     fq('Which day comes after Saturday?', ['Friday', 'Sunday', 'Monday', 'Thursday'], 1, '一週的順序是…Friday, Saturday, ___。', '週末有兩天。', 'Saturday 之後是 Sunday。'),
     fq('It’s December 25th. You say: ___', ['Happy New Year!', 'Merry Christmas!', 'Trick or treat!', 'Happy birthday!'], 1, '12 月 25 日是什麼節日？', '聖誕節的祝福語。', '聖誕節說 Merry Christmas!'),
     fq('I have English ___ Monday.', ['in', 'on', 'at', 'of'], 1, '星期幾前面用哪個介系詞？', 'on + 星期。', 'on Monday。')
    ],
    traps: [t('monday', 'Monday', '星期的第一個字母要大寫。'), t('I have music in Friday.', 'I have music on Friday.', '星期幾前面用 on。')],
    checklist: ['我能依序說出一週七天', '我會問 What day is it today? 並回答', '我能說出 3 個國內外節慶和它們的祝福語或食物']
   }),
   unit('g4-s2-u6', 'Unit 6', '身體與能力 (My Body & I Can…)', S2, 'A1', '能說出身體部位，跟著韻文節奏唸，並用 can / can’t 說出能力與合作活動。', {
    motivation: 'Head, shoulders, knees and toes! 邊唱邊指身體部位，再用 I can jump. 說出你會做的事，和同學一起玩動作遊戲吧。',
    concepts: [
     c('身體部位與指令', 'Touch your head / nose / ears. · Clap your hands. · Stamp your feet.', '兩個的身體部位要加 s：two eyes、two hands。注意 foot 的複數是 feet，tooth 的複數是 teeth。', 'Clap your hands! Stamp your feet!', ex('I have two ___.', ['foot', 'feet', 'foots', 'feets'], 1, 'foot 的複數不加 s，而是變成 feet。'))
     ,
     c('can / can’t 說能力', 'I can swim. / I can’t fly. → Can you jump? Yes, I can. / No, I can’t.', 'can 後面的動詞用原形，不加 s：She can swim.（不是 swims）。唸韻文時，重要的字要唸重、跟著拍子。', 'Birds can fly. Fish can’t walk.', ex('My dog ___ run fast.', ['can', 'cans', 'can to', 'is can'], 0, 'can 不加 s，後面直接接動詞原形：can run。'))
    ],
    phonicsVocab: [v('head', '/hed/', 'n.', '頭', 'Touch your head.'), v('shoulder', '/ˈʃoʊldər/', 'n.', '肩膀', 'Put your hands on your shoulders.'), v('knee', '/niː/', 'n.', '膝蓋', 'Bend your knees.'), v('swim', '/swɪm/', 'v.', '游泳', 'I can swim.')],
    dialogue: [d('Coach', 'Can you jump high?', '你可以跳得很高嗎？'), d('Max', 'Yes, I can! Look!', '可以！你看！'), d('Coach', 'Can you swim?', '你會游泳嗎？'), d('Max', 'No, I can’t. But I can ride a bike.', '不會。但我會騎腳踏車。')],
    reading: { title: 'Animal Talents (動物的本領)', strategy: '找出每種動物 can 和 can’t 做的事。', text: 'A bird can fly, but it can’t swim well. A fish can swim, but it can’t walk. A kangaroo can jump very high. What can you do?', questions: [{ q: 'Can a fish walk?', ans: 'No, it can’t.' }, { q: 'Which animal can jump very high?', ans: 'A kangaroo.' }] },
    step0Clue: '看到 can，後面的動詞一定是原形，不加 s、不加 to。',
    formativeQuiz: [
     fq('We see with our ___.', ['ears', 'eyes', 'hands', 'feet'], 1, '用什麼看東西？', 'see＝看。', '用眼睛 eyes 看。'),
     fq('A: Can you sing? B: Yes, ___', ['I do.', 'I can.', 'I am.', 'I sing.'], 1, '用 Can 問就用…回答。', 'Yes, I can.', 'Can 問句用 can 簡答。'),
     fq('Which sentence is correct?', ['She can dances.', 'She can dance.', 'She cans dance.', 'She can to dance.'], 1, 'can 後面接什麼？', '動詞原形。', 'She can dance. 正確。')
    ],
    traps: [t('He can swims.', 'He can swim.', 'can 後面接動詞原形。'), t('I have two foots.', 'I have two feet.', 'foot 的複數是 feet。')],
    checklist: ['我能說出 10 個身體部位', '我能跟著節奏唸 Head, shoulders, knees and toes', '我會用 can / can’t 說出自己的能力']
   })
  ] }
 ]
};

const g5 = {
 gradeId: 'g5', title: '國小五年級 (Grade 5)', stage: S3, badge: '讀寫銜接 · 長母音、介紹自己與故事閱讀',
 desc: '學會 Magic e 與母音組合、完整介紹自己和家人朋友、現在進行式、校園標示與位置、大寫與標點，以及繪本故事的閱讀與排序。',
 semesters: [
  { semId: 'g5-s1', title: '五年級上學期 (5上)', examFocus: '長母音拼讀、自我與家人朋友介紹、現在進行式', units: [
   unit('g5-s1-u1', 'Unit 1', '長母音與 Magic e (Long Vowels & Magic e)', S3, 'A1', '能分辨長短母音，運用 Magic e 與 ee、ea、ai、ay、oa 等母音組合讀出與拼寫單字，並會查字典確認發音。', {
    motivation: 'cap 加上一個 e 變成 cape，聲音就變了！這個不發音的 e 就像魔法，讓前面的母音唸出自己的名字。學會它，你能讀的字會一下子變好多。',
    concepts: [
     c('Magic e：母音唸字母名稱', 'a_e /eɪ/ cake · i_e /aɪ/ kite · o_e /oʊ/ home · u_e /juː/ cute', '字尾的 e 不發音，但會讓前面的母音唸長母音（就是字母本身的名稱）。比較：cap → cape、kit → kite、hop → hope。', 'Make a cake. Fly a kite.', ex('Which word has a long "a" sound?', ['cap', 'cat', 'cape', 'can'], 2, 'cape 有 Magic e，a 唸 /eɪ/；其他是短母音 /æ/。'))
     ,
     c('兩個母音一起走：母音組合', 'ee/ea → /iː/ (tree, eat) · ai/ay → /eɪ/ (rain, play) · oa → /oʊ/ (boat)', '「兩個母音一起走，第一個說話」：常見的母音組合會唸第一個母音的名稱。遇到例外（如 bread 的 ea 唸 /e/），就查字典的音標確認。', 'I see a boat in the rain.', ex('Which word does NOT have the /iː/ sound?', ['tree', 'sea', 'bread', 'feet'], 2, 'bread 的 ea 是例外，唸短音 /e/；可以查字典確認。'))
    ],
    phonicsVocab: [v('cake', '/keɪk/', 'n.', '蛋糕', 'I want a piece of cake.'), v('kite', '/kaɪt/', 'n.', '風箏', 'Let’s fly a kite.'), v('rain', '/reɪn/', 'n.', '雨', 'I like the sound of rain.'), v('boat', '/boʊt/', 'n.', '船', 'The boat is on the lake.')],
    dialogue: [d('Teacher', 'How do you read c-a-p-e?', 'c-a-p-e 怎麼唸？'), d('Ian', 'The e is quiet, so a says its name. Cape!', 'e 不發音，所以 a 唸自己的名字。Cape！'), d('Teacher', 'Good. What about b-r-e-a-d?', '很好。那 b-r-e-a-d 呢？'), d('Ian', 'Let me check the dictionary… It’s /bred/!', '我查一下字典……是 /bred/！')],
    reading: { title: 'A Kite on the Lake (湖上的風箏)', strategy: '把長母音的字圈出來，大聲唸一遍。', text: 'Kate and Mike ride their bikes to the lake. They fly a white kite. The wind is strong, and the kite goes up high. They sit by a boat and eat cake.', questions: [{ q: 'Where do Kate and Mike go?', ans: 'To the lake.' }, { q: 'What color is the kite?', ans: 'It is white.' }] },
    step0Clue: '看到字尾 e，先試試把前面的母音唸成字母名稱。',
    formativeQuiz: [
     fq('Add a Magic e to "pin". What do you get?', ['pine', 'pinn', 'pein', 'pen'], 0, '在字尾加上 e。', 'i 會唸 /aɪ/。', 'pin + e = pine（松樹）。'),
     fq('Which pair has the same vowel sound?', ['rain / play', 'rain / ran', 'boat / bot', 'kite / kit'], 0, 'ai 和 ay 都唸什麼？', '/eɪ/。', 'rain 和 play 都是 /eɪ/。'),
     fq('You are not sure how to say "great." What is the best way to check?', ['Guess it.', 'Look it up in a dictionary.', 'Skip it.', 'Read it like "greet."'], 1, '怎樣確認發音最可靠？', '字典有音標。', '查字典看音標或聽發音最可靠。')
    ],
    traps: [t('把 hope 唸成 hop', 'hope /hoʊp/', '字尾有 e 時，o 唸長母音 /oʊ/。'), t('看到 ea 一律唸 /iː/', '先試 /iː/，不確定就查字典（bread、head 唸 /e/）', '拼讀規則有例外，查字典能幫你確認。')],
    checklist: ['我能分辨長母音和短母音', '我會用 Magic e 規則讀字', '我會用字典查單字發音']
   }),
   unit('g5-s1-u2', 'Unit 2', '介紹自己、家人與朋友 (Introducing Myself, Family & Friends)', S3, 'A1', '能用數句連貫的英文介紹自己、家人和朋友（姓名、年齡、外表、喜好），並能朗讀與角色扮演對話。', {
    motivation: '新學期、新同學！只會說 My name is… 不夠，學會連續說三到五句話介紹自己和朋友，讓別人更快認識你。',
    concepts: [
     c('自我介紹四步驟', '名字 → 年齡 → 喜好 → 能力：I’m Mia. I’m eleven. I like drawing. I can play the piano.', '一句話說一件事，再用 and 或 but 連起來會更自然：I like drawing, and I can play the piano.', 'Hi, I’m Leo. I’m eleven years old. I like basketball, but I don’t like running.', ex('Which sentence tells about a HOBBY?', ['I’m eleven.', 'I’m from Tainan.', 'I like reading comics.', 'My name is Ted.'], 2, 'hobby 是興趣嗜好，I like reading comics. 說的是喜歡做的事。'))
     ,
     c('介紹別人：he / she + 動詞加 s', 'This is my friend Ken. He is tall. He likes soccer. He has a dog.', '介紹第三個人時，be 動詞用 is，一般動詞要加 s：he likes、she has（have → has）。', 'This is Amy. She lives near my house. She plays the violin.', ex('My best friend ___ comic books.', ['like', 'likes', 'is like', 'liking'], 1, '主詞 My best friend 是第三人稱單數，like 要加 s。'))
    ],
    phonicsVocab: [v('hobby', '/ˈhɑːbi/', 'n.', '嗜好；興趣', 'My hobby is drawing.'), v('friend', '/frend/', 'n.', '朋友', 'Ken is my good friend.'), v('tall', '/tɔːl/', 'adj.', '高的', 'My brother is tall.'), v('live', '/lɪv/', 'v.', '住', 'She lives in Hsinchu.')],
    dialogue: [d('Mia', 'Hi! I’m Mia. I’m new here.', '嗨！我是 Mia，我是新來的。'), d('Ken', 'Welcome! I’m Ken. This is my friend Ray.', '歡迎！我是 Ken，這是我朋友 Ray。'), d('Ray', 'Hi, Mia. Do you like sports?', '嗨，Mia。妳喜歡運動嗎？'), d('Mia', 'Yes, I do. I can play badminton.', '喜歡。我會打羽毛球。')],
    reading: { title: 'My Best Friend (我最好的朋友)', strategy: '找出描述外表、喜好和能力的句子。', text: 'My best friend is Ann. She is eleven. She has long hair and big eyes. She likes music, and she can sing very well. We walk to school together every day.', questions: [{ q: 'What does Ann look like?', ans: 'She has long hair and big eyes.' }, { q: 'What can Ann do well?', ans: 'She can sing very well.' }] },
    step0Clue: '介紹「他／她」時，動詞記得加 s 或改成 is、has。',
    formativeQuiz: [
     fq('She ___ a cat and two fish.', ['have', 'has', 'haves', 'is have'], 1, '主詞是 She。', 'have 的第三人稱單數是…', 'She has。'),
     fq('Which is the best order for introducing yourself?', ['I like dogs. Hi! I’m Joe. I’m ten.', 'Hi! I’m Joe. I’m ten. I like dogs.', 'I’m ten. I like dogs. Hi!', 'Dogs. Ten. Joe.'], 1, '先打招呼和說名字。', '名字 → 年齡 → 喜好。', '先問候、說名字，再說年齡和喜好，最清楚。'),
     fq('This is my uncle. He ___ in Japan.', ['live', 'lives', 'living', 'are live'], 1, 'He 後面的一般動詞…', '要加 s。', 'He lives in Japan.')
    ],
    traps: [t('He like basketball.', 'He likes basketball.', '主詞是第三人稱單數，動詞加 s。'), t('She have long hair.', 'She has long hair.', 'have 遇到 he / she 要變 has。')],
    checklist: ['我能用 4 句以上介紹自己', '我能介紹一位家人或朋友的外表與喜好', '我能和同學角色扮演初次見面的對話']
   }),
   unit('g5-s1-u3', 'Unit 3', '現在進行式：你在做什麼？ (What Are You Doing? Present Continuous)', S3, 'A1', '能用 be + V-ing 描述正在發生的動作，正確拼寫 -ing，並用自然語調問答。', {
    motivation: '打電話時朋友問：What are you doing? 你正在寫功課、看電視還是打球？學會現在進行式，就能說出「現在正在做」的事，也能看圖描述。',
    concepts: [
     c('be + V-ing 表示正在做', 'I am reading. / He is running. / They are playing.', '「正在做」要用兩個部分：be 動詞（am / is / are）+ 動詞加 ing。常和 now、Look! 一起出現。', 'Look! The baby is sleeping.', ex('Look! The boys ___ basketball now.', ['play', 'are playing', 'is playing', 'playing'], 1, '主詞 The boys 是複數，用 are + playing。單獨 playing 少了 be 動詞。'))
     ,
     c('-ing 的拼字規則', '一般加 ing：read → reading · 字尾 e 去 e：make → making · 短母音 + 一個子音：重複字尾 run → running, swim → swimming', '先看字尾：是不發音的 e 嗎？是「短母音 + 一個子音」嗎？再決定怎麼加 ing。', 'She is writing. They are swimming.', ex('He is ___ a kite.', ['makeing', 'making', 'makking', 'make'], 1, 'make 字尾是不發音的 e，去 e 再加 ing：making。'))
    ],
    phonicsVocab: [v('doing', '/ˈduːɪŋ/', 'v.', '做（進行式）', 'What are you doing?'), v('writing', '/ˈraɪtɪŋ/', 'v.', '寫（進行式）', 'I’m writing a card.'), v('running', '/ˈrʌnɪŋ/', 'v.', '跑（進行式）', 'The dog is running.'), v('now', '/naʊ/', 'adv.', '現在', 'It’s raining now.')],
    dialogue: [d('Grandma', 'Hello, Tina. What are you doing?', '喂，Tina。妳在做什麼？'), d('Tina', 'I’m doing my homework.', '我在寫功課。'), d('Grandma', 'Is your brother doing his homework, too?', '妳哥哥也在寫功課嗎？'), d('Tina', 'No, he isn’t. He’s playing video games!', '沒有。他在打電動！')],
    reading: { title: 'At the Park (在公園裡)', strategy: '找出每個人「正在」做的事。', text: 'It is Sunday afternoon. Many people are in the park. Some kids are flying kites. A man is walking his dog. Two girls are sitting under a tree. They are reading comic books.', questions: [{ q: 'What is the man doing?', ans: 'He is walking his dog.' }, { q: 'Where are the two girls sitting?', ans: 'Under a tree.' }] },
    step0Clue: '看到 now、Look!、Listen! 這類線索，就想到 be + V-ing。',
    formativeQuiz: [
     fq('Listen! Someone ___ the piano.', ['play', 'is playing', 'are playing', 'plays now'], 1, 'Listen! 表示現在正在發生。', 'Someone 視為單數。', 'is playing 正確。'),
     fq('Which -ing word is spelled correctly?', ['swiming', 'swimming', 'swimeing', 'swimmming'], 1, 'swim 是短母音 + 一個子音。', '重複最後一個字母。', 'swim → swimming。'),
     fq('A: Are you sleeping? B: No, ___', ['I’m not.', 'I don’t.', 'I amn’t.', 'I’m.'], 0, 'Are you…? 怎麼否定回答？', 'I am not 縮寫成 I’m not。', 'No, I’m not.')
    ],
    traps: [t('She reading a book.', 'She is reading a book.', '進行式要有 be 動詞。'), t('He is runing.', 'He is running.', 'run 是短母音加一個子音，要重複 n。')],
    checklist: ['我會用 am / is / are + V-ing 說正在做的事', '我知道 -ing 的三種拼字規則', '我能看圖說出圖中人物正在做什麼']
   })
  ] },
  { semId: 'g5-s2', title: '五年級下學期 (5下)', examFocus: '校園標示與位置、大寫標點、繪本故事與排序', units: [
   unit('g5-s2-u4', 'Unit 4', '校園標示與位置 (Signs on Campus & Where Is It?)', S3, 'A1', '能看懂校園常見英文標示與教室用語，用介系詞說明位置並問路。', {
    motivation: '學校的牆上有 EXIT、NO RUNNING、LIBRARY 這些英文標示，你看得懂嗎？學會它們，再加上 next to、between，就能幫新同學找到教室。',
    concepts: [
     c('看懂校園標示', 'EXIT 出口 · RESTROOM 廁所 · LIBRARY 圖書館 · NO RUNNING 禁止奔跑 · KEEP QUIET 保持安靜 · PUSH / PULL 推／拉', '標示常用大寫、字很少。NO + V-ing 表示「禁止做某事」；動詞開頭（KEEP QUIET）是要你去做的事。', 'NO FOOD OR DRINK — 禁止飲食。', ex('You see this sign in the hallway: NO RUNNING. What should you do?', ['Run fast.', 'Walk slowly.', 'Eat lunch.', 'Shout loudly.'], 1, 'NO RUNNING 是禁止奔跑，所以要慢慢走。'))
     ,
     c('說位置與問路', 'Where is the library? → It’s next to / between / across from / behind ___.', 'in 在…裡面、on 在…上面、under 在…下面、next to 在…旁邊、between A and B 在 A 和 B 中間、across from 在…對面。', 'The nurse’s office is between the library and the gym.', ex('🏫 Library | Music Room | Gym → The music room is ___ the library and the gym.', ['next', 'between', 'under', 'on'], 1, '在兩個地方中間用 between A and B。'))
    ],
    phonicsVocab: [v('library', '/ˈlaɪbreri/', 'n.', '圖書館', 'The library is on the second floor.'), v('restroom', '/ˈrestruːm/', 'n.', '廁所；洗手間', 'Where is the restroom?'), v('exit', '/ˈeɡzɪt/', 'n.', '出口', 'The exit is over there.'), v('between', '/bɪˈtwiːn/', 'prep.', '在…之間', 'I sit between Amy and Ben.')],
    dialogue: [d('New student', 'Excuse me. Where is the computer lab?', '不好意思，電腦教室在哪裡？'), d('Ella', 'It’s on the third floor, next to the library.', '在三樓，圖書館旁邊。'), d('New student', 'Thank you very much!', '非常謝謝妳！'), d('Ella', 'You’re welcome. Don’t run on the stairs!', '不客氣。樓梯上別奔跑喔！')],
    reading: { title: 'A Map of Our School (我們學校的地圖)', strategy: '邊讀邊在紙上畫出位置。', text: 'Our school has three floors. The office is on the first floor, next to the main gate. The library is on the second floor, across from the music room. The computer lab is between the art room and the science lab.', questions: [{ q: 'Where is the office?', ans: 'On the first floor, next to the main gate.' }, { q: 'What is across from the library?', ans: 'The music room.' }] },
    step0Clue: '先找出「參考地點」，再看介系詞決定方向。',
    formativeQuiz: [
     fq('Which sign tells you where to go out?', ['PUSH', 'EXIT', 'LIBRARY', 'KEEP QUIET'], 1, '「出去」的地方叫什麼？', 'exit＝出口。', 'EXIT 是出口。'),
     fq('The cat is ___ the table. 🐱⬇️ (在桌子下面)', ['on', 'under', 'in', 'between'], 1, '下面是哪個字？', 'under＝在…下面。', 'under the table。'),
     fq('You want to find the toilet politely. You say: ___', ['Toilet!', 'Excuse me. Where is the restroom?', 'Where toilet?', 'Give me the restroom.'], 1, '有禮貌地問路怎麼開頭？', 'Excuse me…', 'Excuse me. Where is the restroom? 完整又有禮貌。')
    ],
    traps: [t('The gym is next the library.', 'The gym is next to the library.', 'next 後面要加 to。'), t('NO RUN', 'NO RUNNING', '禁止標示常用 NO + V-ing。')],
    checklist: ['我看得懂 6 個以上的校園英文標示', '我會用 next to、between、across from 說位置', '我能有禮貌地問路並回答']
   }),
   unit('g5-s2-u5', 'Unit 5', '大寫與標點：寫出正確句子 (Capital Letters & Punctuation)', S3, 'A1', '能正確使用大寫、句號、問號、驚嘆號與逗號，抄寫並寫出課堂所學句子。', {
    motivation: '說英文時看不到標點，但寫英文時，大寫和標點能讓讀的人知道句子從哪裡開始、在哪裡結束，是問句還是驚呼。',
    concepts: [
     c('哪些地方要大寫？', '句子第一個字 · 我 I · 人名地名 Amy, Taipei · 星期月份 Monday, May · 節日 Christmas', '不管在句子的哪裡，I（我）永遠大寫。名字、城市、國家、星期、月份、節日的第一個字母也都要大寫。', 'On Monday, Amy and I go to Taipei.', ex('Which sentence uses capital letters correctly?', ['my friend lives in tainan.', 'My friend lives in Tainan.', 'My Friend Lives In Tainan.', 'my Friend lives in Tainan.'], 1, '句首 My 和地名 Tainan 大寫，其他字小寫。'))
     ,
     c('標點符號的工作', '. 句號（敘述）· ? 問號（問句）· ! 驚嘆號（強烈感覺）· , 逗號（列舉、停頓）', '敘述句結尾用句號；問句結尾用問號；表示驚訝、興奮用驚嘆號。列舉三樣東西時，用逗號隔開，最後一項前加 and。', 'I like apples, bananas, and grapes. Do you like grapes? Wow, they’re sweet!', ex('Where are you going___', ['.', '?', '!', ','], 1, 'Where 開頭的句子是在問地點，屬於問句，結尾要用問號 ?。'))
    ],
    phonicsVocab: [v('capital', '/ˈkæpɪtəl/', 'adj.', '大寫的', 'Use a capital letter for names.'), v('period', '/ˈpɪriəd/', 'n.', '句號', 'Put a period at the end.'), v('question', '/ˈkwestʃən/', 'n.', '問題', 'Can I ask a question?'), v('comma', '/ˈkɑːmə/', 'n.', '逗號', 'Use a comma between the words.')],
    dialogue: [d('Teacher', 'Look at this sentence: "i like dogs".', '看看這個句子："i like dogs"。'), d('Owen', 'The I should be a capital letter.', 'I 應該要大寫。'), d('Teacher', 'Good. What else?', '很好，還有呢？'), d('Owen', 'We need a period at the end!', '句尾要加句號！')],
    reading: { title: 'A Note to Grandpa (給爺爺的便條)', strategy: '讀的時候注意每個大寫字母和標點。', text: 'Dear Grandpa, How are you? I’m in Kaohsiung with Mom and Dad. We saw the sea, a big ship, and many birds. It was so fun! See you on Sunday. Love, Ivy', questions: [{ q: 'Where is Ivy?', ans: 'In Kaohsiung.' }, { q: 'When will Ivy see Grandpa?', ans: 'On Sunday.' }] },
    step0Clue: '寫完句子先檢查三件事：開頭大寫、專有名詞大寫、結尾標點。',
    formativeQuiz: [
     fq('Which word should ALWAYS be capitalized?', ['dog', 'I', 'school', 'happy'], 1, '哪個字不管在哪裡都大寫？', '代表「我」的字。', 'I（我）永遠大寫。'),
     fq('Choose the correct sentence.', ['what a big cake!', 'What a big cake!', 'What a big cake.', 'what a big cake?'], 1, '這是驚呼的句子。', '句首大寫＋驚嘆號。', 'What a big cake! 開頭大寫、結尾驚嘆號。'),
     fq('I have a pen___ a ruler, and an eraser.', ['.', ',', '?', '!'], 1, '列舉東西時用什麼隔開？', '逗號。', '列舉三樣東西用逗號隔開。')
    ],
    traps: [t('my birthday is in july', 'My birthday is in July.', '句首與月份大寫，句尾加句號。'), t('Do you like music.', 'Do you like music?', '問句結尾要用問號。')],
    checklist: ['我知道 5 種要大寫的情況', '我會正確使用句號、問號、驚嘆號和逗號', '我能自己檢查並訂正句子的大寫和標點']
   }),
   unit('g5-s2-u6', 'Unit 6', '繪本故事與事件排序 (Picture Books & Story Order)', S3, 'A1 ~ A2', '能藉書名與圖畫預測內容，讀懂繪本故事的要素，依 first、next、then、finally 排序事件，並朗讀韻文與短劇。', {
    motivation: '打開繪本前，先看封面和書名猜猜故事會發生什麼。讀完後，用 First…Next…Then…Finally… 把故事說一遍，你就是小小說書人！',
    concepts: [
     c('讀故事前先預測', '看書名 + 看封面圖 → 猜：Who? Where? What happens?', '書名和圖畫藏著線索。例如書名 The Lost Puppy 和一張哭泣的小狗圖，可以猜到故事是在找走失的小狗。讀完再檢查自己猜得對不對。', 'Title: The Big Rain → I think it will rain a lot in the story.', ex('Book title: "Tim’s First Day at School." What is the story probably about?', ['A trip to the zoo', 'Tim’s new school life', 'A birthday party', 'A rainy night'], 1, '書名 First Day at School 告訴我們是 Tim 第一天上學的故事。'))
     ,
     c('故事要素與事件排序', '人物 Who · 地點 Where · 問題 Problem · 結局 Ending ｜ First → Next → Then → Finally', '用時間順序字把事件串起來，就能清楚重述故事。先找出故事的「問題」，結局通常就是問題被解決了。', 'First, the puppy got lost. Next, it walked in the rain. Then, a girl found it. Finally, it went home.', ex('Which word tells the LAST event of a story?', ['First', 'Next', 'Then', 'Finally'], 3, 'Finally 表示最後、終於，用在最後一個事件。'))
    ],
    phonicsVocab: [v('story', '/ˈstɔːri/', 'n.', '故事', 'Let’s read a story.'), v('title', '/ˈtaɪtəl/', 'n.', '標題；書名', 'What is the title of the book?'), v('first', '/fɜːrst/', 'adv.', '首先', 'First, wash your hands.'), v('finally', '/ˈfaɪnəli/', 'adv.', '最後', 'Finally, they went home.')],
    dialogue: [d('Narrator', 'One day, a little mouse was hungry.', '有一天，一隻小老鼠肚子餓了。'), d('Mouse', 'I want some cheese! Where is it?', '我想吃起司！起司在哪裡？'), d('Cat', 'Meow! I see you, little mouse!', '喵！我看到你了，小老鼠！'), d('Mouse', 'Oh no! Run, run, as fast as I can!', '糟了！快跑，用最快的速度跑！')],
    reading: { title: 'The Lost Puppy (走失的小狗)', strategy: '找出人物、問題和結局，再用 First / Next / Then / Finally 重述。', text: 'First, a puppy ran out of the yard and got lost. Next, it walked in the rain and felt cold. Then, a girl named Rose saw it and gave it a towel. Finally, Rose read the name tag and took the puppy home to its family.', questions: [{ q: 'What was the puppy’s problem?', ans: 'It got lost.' }, { q: 'How did Rose know where the puppy lived?', ans: 'She read the name tag.' }] },
    step0Clue: '排序題先找 First 和 Finally 兩個端點，再排中間的事件。',
    formativeQuiz: [
     fq('Put in order: (a) She ate breakfast. (b) She woke up. (c) She went to school.', ['a → b → c', 'b → a → c', 'c → b → a', 'b → c → a'], 1, '一天的開始是什麼？', '起床 → 吃早餐 → 上學。', '合理的順序是 b → a → c。'),
     fq('In "The Lost Puppy," who helped the puppy?', ['A cat', 'Rose', 'A teacher', 'The puppy’s mom'], 1, '回到故事找人物。', 'a girl named Rose。', 'Rose 給小狗毛巾並帶牠回家。'),
     fq('Which is the BEST way to guess a story before reading?', ['Read the last page only.', 'Look at the title and pictures.', 'Count the pages.', 'Close the book.'], 1, '哪些線索最直接？', '書名與圖畫。', '看書名和圖畫可以做合理的預測。')
    ],
    traps: [t('Finally, the puppy got lost. First, it went home.', 'First, the puppy got lost. Finally, it went home.', '時間順序字要和事件的真正順序一致。'), t('只看第一句就決定整個故事在說什麼', '讀完整篇，找出人物、問題和結局', '故事的重點常在問題如何被解決。')],
    checklist: ['我會用書名和圖畫預測故事', '我能說出故事的人物、地點、問題和結局', '我能用 First / Next / Then / Finally 重述故事']
   })
  ] }
 ]
};

export const ELEMENTARY_GRADES = [g3, g4, g5];
