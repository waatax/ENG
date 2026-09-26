// phonics_mastery.mjs - 自然拼讀與發音規則全景大師課 (Complete Phonics & Pronunciation Mastery Guide)
// 專為台灣 108 課綱學生與英語學習者打造：落實「見字能讀、聽音能寫」核心素養
// 涵蓋 8 大黃金拼讀規律、口腔發音部位圖解、26 字母音、CVC 短母音、Magic E、母音團隊、雙字母子音、Bossy R、軟硬音及音節直讀拆解法

import { playWord, playSentence } from './audio.mjs';

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

// 自然拼讀 8 大核心模組資料
export const PHONICS_MODULES = [
  {
    id: 'letters',
    title: '1. 26 字母基礎音與字母名',
    subtitle: 'Letter Sounds vs. Letter Names · 音韻覺識起點',
    icon: '🔤',
    badge: '基礎核心 Pre-A1',
    description: '英語學習最常見的誤區是把「字母的名字（Letter Name）」當成「字母的聲音（Letter Sound）」。自然拼讀的第一步，就是學會每個字母在單字中真正發出的自然聲音！',
    summaryRule: 'Letter Name 是字母叫什麼名字（如 B 唸 /biː/），Letter Sound 是字母在單字裡發什麼音（如 B 發 /b/ as in bat）。',
    items: [
      { letter: 'Aa', name: '/eɪ/', sound: '/æ/', keyWord: 'apple', example: 'apple, ant, axe', mouth: '嘴張大約三指寬，舌尖抵下齒，發出短促有力的 /æ/' },
      { letter: 'Bb', name: '/biː/', sound: '/b/', keyWord: 'bear', example: 'bag, bed, bus', mouth: '雙唇緊閉阻斷氣流，隨後突然放開爆破出聲（濁輔音）' },
      { letter: 'Cc', name: '/siː/', sound: '/k/', keyWord: 'cat', example: 'cup, car, cake', mouth: '舌後部隆起抵住軟顎，氣流衝破阻礙發出無聲 /k/' },
      { letter: 'Dd', name: '/diː/', sound: '/d/', keyWord: 'dog', example: 'duck, door, desk', mouth: '舌尖抵上齒齦阻擋氣流，聲帶振動瞬間爆破（濁輔音）' },
      { letter: 'Ee', name: '/iː/', sound: '/ɛ/', keyWord: 'egg', example: 'elephant, exit, pen', mouth: '嘴巴張開約兩指寬，嘴角向兩側微拉發出 /ɛ/' },
      { letter: 'Ff', name: '/ɛf/', sound: '/f/', keyWord: 'fish', example: 'fan, fox, food', mouth: '上門牙輕觸下唇內側，氣流由唇齒縫隙摩擦而出（摩擦音）' },
      { letter: 'Gg', name: '/dʒiː/', sound: '/ɡ/', keyWord: 'goat', example: 'girl, game, gift', mouth: '舌後部抵軟顎，聲帶振動爆破出聲（濁輔音）' },
      { letter: 'Hh', name: '/eɪtʃ/', sound: '/h/', keyWord: 'hat', example: 'hot, house, hand', mouth: '嘴巴微張，聲門開啟，氣流無阻礙急速呼出（如呵氣）' },
      { letter: 'Ii', name: '/aɪ/', sound: '/ɪ/', keyWord: 'igloo', example: 'ink, insect, sit', mouth: '嘴角微放鬆，舌前部稍抬起，短促有力發出 /ɪ/' },
      { letter: 'Jj', name: '/dʒeɪ/', sound: '/dʒ/', keyWord: 'jam', example: 'jump, juice, jacket', mouth: '舌尖與舌面抵上齒齦後方，雙唇微凸，聲帶振動破擦出聲' },
      { letter: 'Kk', name: '/keɪ/', sound: '/k/', keyWord: 'kite', example: 'king, kangaroo, key', mouth: '發音位置同 C，氣流爆破而出無振動' },
      { letter: 'Ll', name: '/ɛl/', sound: '/l/', keyWord: 'lion', example: 'lemon, lamp, look', mouth: '字首舌尖抵上齒齦發清晰音，字尾發暗音濁輔音' },
      { letter: 'Mm', name: '/ɛm/', sound: '/m/', keyWord: 'monkey', example: 'moon, milk, map', mouth: '雙唇緊閉，軟顎下垂，氣流從鼻腔共鳴流出（鼻音）' },
      { letter: 'Nn', name: '/ɛn/', sound: '/n/', keyWord: 'nest', example: 'nose, net, nut', mouth: '舌尖抵上齒齦，軟顎下垂，氣流從鼻腔共鳴流出' },
      { letter: 'Oo', name: '/oʊ/', sound: '/ɒ/', keyWord: 'ox', example: 'octopus, orange, top', mouth: '嘴巴張大成圓形，舌後微縮，發出飽滿短音 /ɒ/' },
      { letter: 'Pp', name: '/piː/', sound: '/p/', keyWord: 'pig', example: 'pen, pan, park', mouth: '雙唇緊閉後突然爆發氣流，無聲帶振動（送氣清輔音）' },
      { letter: 'Qq', name: '/kjuː/', sound: '/kw/', keyWord: 'queen', example: 'quick, quiet, quiz', mouth: '幾乎永遠與 u 搭配，發出 /k/ 接圓唇 /w/' },
      { letter: 'Rr', name: '/ɑːr/', sound: '/r/', keyWord: 'rabbit', example: 'red, ring, run', mouth: '舌尖向上齒齦後方捲起但不接觸，雙唇略圓，聲帶振動' },
      { letter: 'Ss', name: '/ɛs/', sound: '/s/', keyWord: 'sun', example: 'snake, star, see', mouth: '上下牙齒輕輕咬合，舌尖抵下齒背，氣流從齒縫急速摩擦' },
      { letter: 'Tt', name: '/tiː/', sound: '/t/', keyWord: 'tiger', example: 'top, tent, table', mouth: '舌尖抵上齒齦阻斷氣流，隨後爆破送氣（清音）' },
      { letter: 'Uu', name: '/juː/', sound: '/ʌ/', keyWord: 'umbrella', example: 'up, under, cup', mouth: '嘴巴自然放鬆半開，舌中部微隆，短促有力發出 /ʌ/' },
      { letter: 'Vv', name: '/viː/', sound: '/v/', keyWord: 'violin', example: 'van, vet, voice', mouth: '發音動作同 F，但聲帶必須強烈振動（唇齒濁音）' },
      { letter: 'Ww', name: '/ˈdʌbəl.juː/', sound: '/w/', keyWord: 'water', example: 'wind, watch, window', mouth: '雙唇收圓突出如吹口哨，舌後抬高，聲帶振動' },
      { letter: 'Xx', name: '/ɛks/', sound: '/ks/', keyWord: 'box', example: 'fox, six, axe', mouth: '由清輔音 /k/ 迅速滑至 /s/ 的複合輔音' },
      { letter: 'Yy', name: '/waɪ/', sound: '/j/', keyWord: 'yellow', example: 'yo-yo, yes, yacht', mouth: '舌前部向硬顎抬起，嘴角微向後拉，聲帶振動發半母音 /j/' },
      { letter: 'Zz', name: '/zɛd/', sound: '/z/', keyWord: 'zebra', example: 'zoo, zero, zipper', mouth: '發音口型同 S，但聲帶強烈振動發出如蜜蜂嗡嗡聲' }
    ]
  },
  {
    id: 'short_vowels',
    title: '2. 短母音與 CVC 拼讀家族',
    subtitle: 'Consonant-Vowel-Consonant · 見字拼音第一步',
    icon: '🐱',
    badge: '核心拼讀 A1',
    description: 'CVC（子音-母音-子音）是英文最常見的閉音節結構。只要母音被後面的子音關在中間，它就會發「短母音」！只要掌握這個規則，上千個英文單字立刻能唸！',
    summaryRule: '閉音節 (Closed Syllable) 公式：子音 + 短母音 + 子音 (CVC)。母音被關住，發短音！',
    families: [
      {
        vowel: 'a /æ/',
        pattern: '-at, -an, -ap, -am',
        words: [
          { w: 'cat', ipa: '/kæt/', chunk: 'c-a-t', zh: '貓咪' },
          { w: 'bat', ipa: '/bæt/', chunk: 'b-a-t', zh: '蝙蝠／球棒' },
          { w: 'map', ipa: '/mæp/', chunk: 'm-a-p', zh: '地圖' },
          { w: 'pan', ipa: '/pæn/', chunk: 'p-a-n', zh: '平底鍋' },
          { w: 'jam', ipa: '/dʒæm/', chunk: 'j-a-m', zh: '果醬' }
        ],
        sentence: 'The fat cat sat on the mat with a hat.'
      },
      {
        vowel: 'e /ɛ/',
        pattern: '-et, -en, -ed, -eg',
        words: [
          { w: 'bed', ipa: '/bɛd/', chunk: 'b-e-d', zh: '床' },
          { w: 'red', ipa: '/rɛd/', chunk: 'r-e-d', zh: '紅色的' },
          { w: 'pen', ipa: '/pɛn/', chunk: 'p-e-n', zh: '鋼筆／原子筆' },
          { w: 'net', ipa: '/nɛt/', chunk: 'n-e-t', zh: '網子' },
          { w: 'leg', ipa: '/lɛɡ/', chunk: 'l-e-g', zh: '腿' }
        ],
        sentence: 'Ten men met ten red pets.'
      },
      {
        vowel: 'i /ɪ/',
        pattern: '-ig, -in, -ip, -it',
        words: [
          { w: 'pig', ipa: '/pɪɡ/', chunk: 'p-i-g', zh: '豬' },
          { w: 'sit', ipa: '/sɪt/', chunk: 's-i-t', zh: '坐下' },
          { w: 'lip', ipa: '/lɪp/', chunk: 'l-i-p', zh: '嘴唇' },
          { w: 'pin', ipa: '/pɪn/', chunk: 'p-i-n', zh: '大頭針' },
          { w: 'hit', ipa: '/hɪt/', chunk: 'h-i-t', zh: '打擊' }
        ],
        sentence: 'A big pig can sit on the pink tin.'
      },
      {
        vowel: 'o /ɒ/',
        pattern: '-ot, -op, -og, -ox',
        words: [
          { w: 'dog', ipa: '/dɒɡ/', chunk: 'd-o-g', zh: '小狗' },
          { w: 'hot', ipa: '/hɒt/', chunk: 'h-o-t', zh: '炎熱的' },
          { w: 'fox', ipa: '/fɒks/', chunk: 'f-o-x', zh: '狐狸' },
          { w: 'top', ipa: '/tɒp/', chunk: 't-o-p', zh: '頂端／陀螺' },
          { w: 'pot', ipa: '/pɒt/', chunk: 'p-o-t', zh: '鍋子' }
        ],
        sentence: 'The hot dog ran to the top of the pot.'
      },
      {
        vowel: 'u /ʌ/',
        pattern: '-ug, -un, -ut, -up',
        words: [
          { w: 'cup', ipa: '/kʌp/', chunk: 'c-u-p', zh: '杯子' },
          { w: 'sun', ipa: '/sʌn/', chunk: 's-u-n', zh: '太陽' },
          { w: 'bug', ipa: '/bʌɡ/', chunk: 'b-u-g', zh: '昆蟲' },
          { w: 'run', ipa: '/rʌn/', chunk: 'r-u-n', zh: '跑步' },
          { w: 'nut', ipa: '/nʌt/', chunk: 'n-u-t', zh: '堅果' }
        ],
        sentence: 'A fun bug can run in the hot sun.'
      }
    ]
  },
  {
    id: 'magic_e',
    title: '3. Magic E (Silent E) 靜音 E 魔法規則',
    subtitle: 'CVC ➔ CVCe · 結尾不發音 E 讓前面的母音說出自己的名字！',
    icon: '🪄',
    badge: '進階開音節 A1-A2',
    description: '英語中最神奇的發音規律之一！當一個 CVC 短母音單字後面加上結尾字母 e 時，結尾的 e 本身不發音（Silent E），但它會施展魔法把前面的母音變成「長母音（發字母本身的名字）」！',
    summaryRule: '公式：子音 + 母音 + 子音 + e (CVCe)。結尾 e 閉嘴，前面的母音發自身字母名！',
    pairs: [
      {
        vowel: 'a: /æ/ ➔ /eɪ/',
        before: { w: 'cap', ipa: '/kæp/', zh: '鴨舌帽' },
        after: { w: 'cape', ipa: '/keɪp/', zh: '斗篷、披風' },
        tip: 'cap 加了 e 變成 cape，a 從 /æ/ 變成自身名字 /eɪ/！'
      },
      {
        vowel: 'a: /æ/ ➔ /eɪ/',
        before: { w: 'tap', ipa: '/tæp/', zh: '水龍頭、輕拍' },
        after: { w: 'tape', ipa: '/teɪp/', zh: '膠帶' },
        tip: 'tap 加了 e 變成 tape！'
      },
      {
        vowel: 'i: /ɪ/ ➔ /aɪ/',
        before: { w: 'kit', ipa: '/kɪt/', zh: '工具組' },
        after: { w: 'kite', ipa: '/kaɪt/', zh: '風箏' },
        tip: 'kit 加了 e 變成 kite，i 從短音 /ɪ/ 變成長音 /aɪ/！'
      },
      {
        vowel: 'i: /ɪ/ ➔ /aɪ/',
        before: { w: 'rid', ipa: '/rɪd/', zh: '免除、擺脫' },
        after: { w: 'ride', ipa: '/raɪd/', zh: '騎乘' },
        tip: 'rid 加上 e 變成 ride！'
      },
      {
        vowel: 'o: /ɒ/ ➔ /oʊ/',
        before: { w: 'hop', ipa: '/hɒp/', zh: '單腳跳' },
        after: { w: 'hope', ipa: '/hoʊp/', zh: '希望' },
        tip: 'hop 加了 e 變成 hope，o 唱出自己的名字 /oʊ/！'
      },
      {
        vowel: 'o: /ɒ/ ➔ /oʊ/',
        before: { w: 'rob', ipa: '/rɒb/', zh: '搶劫' },
        after: { w: 'robe', ipa: '/roʊb/', zh: '長袍' },
        tip: 'rob 加了 e 變成 robe！'
      },
      {
        vowel: 'u: /ʌ/ ➔ /juː/ 或 /uː/',
        before: { w: 'cut', ipa: '/kʌt/', zh: '切割' },
        after: { w: 'cute', ipa: '/kjuːt/', zh: '可愛的' },
        tip: 'cut 加了 e 變成 cute，u 發出 /juː/！'
      },
      {
        vowel: 'u: /ʌ/ ➔ /uː/',
        before: { w: 'tub', ipa: '/tʌb/', zh: '浴缸' },
        after: { w: 'tube', ipa: '/tjuːb/', zh: '管子、地鐵' },
        tip: 'tub 加了 e 變成 tube！'
      }
    ]
  },
  {
    id: 'vowel_teams',
    title: '4. 母音團隊與雙母音組合 (Vowel Teams)',
    subtitle: 'When two vowels go walking, the first one does the talking!',
    icon: '🤝',
    badge: '閱讀加速 A2',
    description: '英語俗諺說：「兩個母音結伴同行，第一個母音大聲唱出自己的名字，第二個母音安靜不說話！」（When two vowels go walking, the first does the talking!）。掌握常見母音組合，能瞬間解鎖海量長單字！',
    summaryRule: '兩母音並列時，通常發第一個字母的長母音（如 ai 發 /eɪ/，ee 發 /iː/，oa 發 /oʊ/）。特殊母音對需牢記固定口型！',
    groups: [
      {
        name: '長音 A 團隊 (ai / ay ➔ /eɪ/)',
        rule: '通常 ai 用於單字中間，ay 用於單字結尾',
        words: [
          { w: 'rain', ipa: '/reɪn/', zh: '下雨' },
          { w: 'train', ipa: '/treɪn/', zh: '火車' },
          { w: 'wait', ipa: '/weɪt/', zh: '等待' },
          { w: 'day', ipa: '/deɪ/', zh: '日子、白天' },
          { w: 'play', ipa: '/pleɪ/', zh: '玩耍' },
          { w: 'stay', ipa: '/steɪ/', zh: '停留' }
        ]
      },
      {
        name: '長音 E 團隊 (ee / ea ➔ /iː/)',
        rule: 'ee 和 ea 都發長音 /iː/（微笑音，嘴角兩側拉開）',
        words: [
          { w: 'tree', ipa: '/triː/', zh: '樹木' },
          { w: 'see', ipa: '/siː/', zh: '看見' },
          { w: 'green', ipa: '/ɡriːn/', zh: '綠色' },
          { w: 'meat', ipa: '/miːt/', zh: '肉類' },
          { w: 'read', ipa: '/riːd/', zh: '閱讀' },
          { w: 'beach', ipa: '/biːtʃ/', zh: '海灘' }
        ]
      },
      {
        name: '長音 O 團隊 (oa / ow ➔ /oʊ/)',
        rule: 'oa 常用於字中，ow 常用於字尾',
        words: [
          { w: 'boat', ipa: '/boʊt/', zh: '小船' },
          { w: 'coat', ipa: '/koʊt/', zh: '大衣外套' },
          { w: 'road', ipa: '/roʊd/', zh: '道路' },
          { w: 'snow', ipa: '/snoʊ/', zh: '下雪' },
          { w: 'grow', ipa: '/ɡroʊ/', zh: '成長' },
          { w: 'yellow', ipa: '/ˈjɛl.oʊ/', zh: '黃色' }
        ]
      },
      {
        name: '特殊雙母音 OO (長 /uː/ vs. 短 /ʊ/)',
        rule: '通常接 d, k 或在某些詞中發短音 /ʊ/；其他多發長音 /uː/',
        words: [
          { w: 'book', ipa: '/bʊk/', zh: '書本（短音 /ʊ/）' },
          { w: 'look', ipa: '/lʊk/', zh: '注視（短音 /ʊ/）' },
          { w: 'foot', ipa: '/fʊt/', zh: '腳步（短音 /ʊ/）' },
          { w: 'moon', ipa: '/muːn/', zh: '月亮（長音 /uː/）' },
          { w: 'food', ipa: '/fuːd/', zh: '食物（長音 /uː/）' },
          { w: 'spoon', ipa: '/spuːn/', zh: '湯匙（長音 /uː/）' }
        ]
      },
      {
        name: '滑動雙母音 (oi / oy ➔ /ɔɪ/ & ou / ow ➔ /aʊ/)',
        rule: '發音時口型有明顯滑動與變化！',
        words: [
          { w: 'coin', ipa: '/kɔɪn/', zh: '硬幣 (/ɔɪ/)' },
          { w: 'boy', ipa: '/bɔɪ/', zh: '男孩 (/ɔɪ/)' },
          { w: 'cloud', ipa: '/klaʊd/', zh: '雲朵 (/aʊ/)' },
          { w: 'house', ipa: '/haʊs/', zh: '房屋 (/aʊ/)' },
          { w: 'cow', ipa: '/kaʊ/', zh: '乳牛 (/aʊ/)' },
          { w: 'now', ipa: '/naʊ/', zh: '現在 (/aʊ/)' }
        ]
      }
    ]
  },
  {
    id: 'digraphs_blends',
    title: '5. 子音組合與雙字母子音 (Digraphs & Blends)',
    subtitle: '合體單音 (Digraphs) vs. 滑音連拼 (Blends)',
    icon: '⚡',
    badge: '拼音骨幹 A2',
    description: '子音是單字的骨架！這兩種組合有本質差別：Digraph 是兩個字母合體發出一個「全新聲音」（如 sh, ch, th）；Blend 則是兩個子音各自保留聲音，但「高速滑音連拼」在一起（如 bl, tr, st）！',
    summaryRule: 'Digraph（雙字母單音）：兩個字母合二為一。Blend（混音連拼）：每個字母都發音，快速滑拼！',
    sections: [
      {
        title: '💎 雙字母子音合體 (Consonant Digraphs)',
        items: [
          { combo: 'sh', sound: '/ʃ/', tip: '安靜音「噓——」', words: ['ship (輪船)', 'fish (魚)', 'shop (商店)', 'wish (願望)'] },
          { combo: 'ch', sound: '/tʃ/', tip: '火車鳴笛「氣切」音', words: ['chair (椅子)', 'beach (海灘)', 'lunch (午餐)', 'chip (洋芋片)'] },
          { combo: 'th (清)', sound: '/θ/', tip: '咬舌尖吹氣（無聲帶振動）', words: ['think (思考)', 'three (數字三)', 'thank (感謝)', 'bath (洗澡)'] },
          { combo: 'th (濁)', sound: '/ð/', tip: '咬舌尖吹氣（帶有聲帶振動）', words: ['this (這個)', 'that (那個)', 'mother (母親)', 'weather (天氣)'] },
          { combo: 'wh', sound: '/w/', tip: '雙唇向前吹氣', words: ['what (什麼)', 'white (白色)', 'whale (鯨魚)', 'wheel (車輪)'] },
          { combo: 'ph', sound: '/f/', tip: '發音同字母 f', words: ['phone (電話)', 'photo (照片)', 'dolphin (海豚)', 'elephant (大象)'] },
          { combo: 'ck', sound: '/k/', tip: '只出現在短母音之後', words: ['duck (鴨子)', 'black (黑色)', 'clock (時鐘)', 'kick (踢)'] },
          { combo: 'ng', sound: '/ŋ/', tip: '鼻根後閉鼻音', words: ['ring (戒指)', 'sing (唱歌)', 'king (國王)', 'spring (春天)'] }
        ]
      },
      {
        title: '🌪️ 子音連音滑拼 (Consonant Blends)',
        items: [
          { combo: 'L-Blends (bl, cl, fl, gl, pl, sl)', tip: '舌尖快速抵上齒齦', words: ['blue (藍色)', 'clock (時鐘)', 'flag (旗幟)', 'glass (玻璃)', 'plane (飛機)', 'slow (緩慢)'] },
          { combo: 'R-Blends (br, cr, dr, fr, gr, pr, tr)', tip: '舌尖快速捲起', words: ['bread (麵包)', 'cry (哭泣)', 'drum (鼓)', 'frog (青蛙)', 'green (綠色)', 'tree (樹木)'] },
          { combo: 'S-Blends (sc, sk, sm, sn, sp, st, sw)', tip: '自齒縫氣流快速滑入', words: ['smile (微笑)', 'snake (蛇)', 'star (星星)', 'spoon (湯匙)', 'swim (游泳)', 'stop (停止)'] }
        ]
      }
    ]
  },
  {
    id: 'bossy_r',
    title: '6. Bossy R 霸道 R 捲舌母音規則',
    subtitle: 'R-Controlled Vowels · 當母音遇到霸道總裁 R！',
    icon: '👑',
    badge: '美式音韻 B1',
    description: '字母 R 在自然拼讀中被稱為「霸道 R (Bossy R)」！因為當任何母音後面跟著 R 時，母音原本的短音或長音通通失效，必須被 R 控制，變成具有飽滿捲舌色彩的全新聲音！',
    summaryRule: '公式：母音 + R。ar 唱 /ɑːr/，or 唱 /ɔːr/；er, ir, ur 默契十足，三者全發 /ɜːr/！',
    groups: [
      {
        rSound: 'ar ➔ /ɑːr/',
        tip: '嘴巴張大，舌頭往後捲，如醫生檢查嗓子：/ɑːr/',
        words: [
          { w: 'car', ipa: '/kɑːr/', zh: '汽車' },
          { w: 'star', ipa: '/stɑːr/', zh: '星星' },
          { w: 'park', ipa: '/pɑːrk/', zh: '公園' },
          { w: 'farm', ipa: '/fɑːrm/', zh: '農場' },
          { w: 'smart', ipa: '/smɑːrt/', zh: '聰明的' }
        ],
        sentence: 'Park the smart car near the dark farm.'
      },
      {
        rSound: 'or ➔ /ɔːr/',
        tip: '嘴巴圓圓向前突，舌尖懸空捲起：/ɔːr/',
        words: [
          { w: 'fork', ipa: '/fɔːrk/', zh: '叉子' },
          { w: 'corn', ipa: '/kɔːrn/', zh: '玉米' },
          { w: 'storm', ipa: '/stɔːrm/', zh: '暴風雨' },
          { w: 'horse', ipa: '/hɔːrs/', zh: '馬' },
          { w: 'morning', ipa: '/ˈmɔːr.nɪŋ/', zh: '早晨' }
        ],
        sentence: 'The horse ate corn with a fork in the storm.'
      },
      {
        rSound: 'er / ir / ur ➔ 三兄弟同發 /ɜːr/',
        tip: '嘴角放鬆平平微開，舌中部微抬，舌根後縮捲起：/ɜːr/。這三組在美式英語發音完全一致！',
        words: [
          { w: 'her', ipa: '/hɜːr/', zh: '她的 (er)' },
          { w: 'teacher', ipa: '/ˈtiː.tʃɚ/', zh: '老師 (er)' },
          { w: 'bird', ipa: '/bɜːrd/', zh: '鳥 (ir)' },
          { w: 'girl', ipa: '/ɡɜːrl/', zh: '女孩 (ir)' },
          { w: 'nurse', ipa: '/nɜːrs/', zh: '護理師 (ur)' },
          { w: 'purple', ipa: '/ˈpɜːr.pəl/', zh: '紫色 (ur)' }
        ],
        sentence: 'The girl and her nurse saw a purple bird.'
      }
    ]
  },
  {
    id: 'soft_hard_cg',
    title: '7. 軟硬 C 與 G 規律 (Soft vs. Hard C & G)',
    subtitle: '遇到 e, i, y 就變溫柔 (Soft Sound)！',
    icon: '🧊',
    badge: '高階音變 B1-B2',
    description: '字母 C 和 G 到底什麼時候發硬音、什麼時候發軟音？有一條放諸四海皆準的黃金法則：只要後面接著 e, i, y，C 和 G 就會變身成柔軟的聲音！其他情況一律是堅硬的爆破音！',
    summaryRule: '遇 e, i, y 變軟音：C ➔ /s/，G ➔ /dʒ/。其餘一律硬音：C ➔ /k/，G ➔ /ɡ/！',
    contrasts: [
      {
        letter: '字母 C',
        soft: {
          sound: '軟音 /s/',
          rule: 'C + e, i, y',
          examples: [
            { w: 'city', ipa: '/ˈsɪt.i/', zh: '城市 (c+i)' },
            { w: 'cell', ipa: '/sɛl/', zh: '細胞／牢房 (c+e)' },
            { w: 'cycle', ipa: '/ˈsaɪ.kəl/', zh: '循環／腳踏車 (c+y)' },
            { w: 'face', ipa: '/feɪs/', zh: '臉蛋 (c+e)' },
            { w: 'pencil', ipa: '/ˈpɛn.səl/', zh: '鉛筆 (c+i)' }
          ]
        },
        hard: {
          sound: '硬音 /k/',
          rule: 'C + a, o, u 或子音',
          examples: [
            { w: 'cat', ipa: '/kæt/', zh: '貓咪 (c+a)' },
            { w: 'cold', ipa: '/koʊld/', zh: '寒冷的 (c+o)' },
            { w: 'cup', ipa: '/kʌp/', zh: '杯子 (c+u)' },
            { w: 'clean', ipa: '/kliːn/', zh: '乾淨的 (c+l)' }
          ]
        }
      },
      {
        letter: '字母 G',
        soft: {
          sound: '軟音 /dʒ/',
          rule: 'G + e, i, y',
          examples: [
            { w: 'gem', ipa: '/dʒɛm/', zh: '寶石 (g+e)' },
            { w: 'giant', ipa: '/ˈdʒaɪ.ənt/', zh: '巨人 (g+i)' },
            { w: 'gym', ipa: '/dʒɪm/', zh: '健身房 (g+y)' },
            { w: 'orange', ipa: '/ˈɔːr.ɪndʒ/', zh: '橘子 (g+e)' },
            { w: 'magic', ipa: '/ˈmædʒ.ɪk/', zh: '魔法 (g+i)' }
          ]
        },
        hard: {
          sound: '硬音 /ɡ/',
          rule: 'G + a, o, u 或子音',
          examples: [
            { w: 'game', ipa: '/ɡeɪm/', zh: '遊戲 (g+a)' },
            { w: 'gold', ipa: '/ɡoʊld/', zh: '黃金 (g+o)' },
            { w: 'gun', ipa: '/ɡʌn/', zh: '槍 (g+u)' },
            { w: 'green', ipa: '/ɡriːn/', zh: '綠色 (g+r)' }
          ]
        }
      }
    ]
  },
  {
    id: 'syllables',
    title: '8. 音節劃分與見字直讀拆解法 (Syllable Chunking)',
    subtitle: '多音節長單字不用背！學會切音節，看到就會唸！',
    icon: '🧩',
    badge: '終極直讀 B2-C2',
    description: '遇到 7 個字母以上的長單字（如 fantastic, congratulate, communication）不知該如何下手？其實任何長單字都是由小音節積木拼成的！只要掌握「一音一母」、「找母音、切子音」法則，長單字比短單字更好唸！',
    summaryRule: '音節切割三步法：① 標記所有發音的母音；② 兩母音間有兩個子音從中切 (VC/CV)；兩母音間有一個子音切母音後 (V/CV)；③ 弱讀音全歸 Schwa /ə/！',
    patterns: [
      {
        pattern: '規則 1：雙子音分家 (VC / CV)',
        formula: '母音 + 子音 / 子音 + 母音',
        tip: '兩母音中間夾著兩個子音時，從兩個子音中間切開！前後通常形成閉音節發短音。',
        examples: [
          { w: 'rabbit', chunk: 'rab - bit', ipa: '/ˈræb.ɪt/', zh: '兔子' },
          { w: 'happen', chunk: 'hap - pen', ipa: '/ˈhæp.ən/', zh: '發生' },
          { w: 'muffin', chunk: 'muf - fin', ipa: '/ˈmʌf.ɪn/', zh: '馬芬蛋糕' },
          { w: 'winter', chunk: 'win - ter', ipa: '/ˈwɪn.tɚ/', zh: '冬天' }
        ]
      },
      {
        pattern: '規則 2：單子音靠後 (V / CV) vs. 靠前 (VC / V)',
        formula: '開音節長音 vs. 閉音節短音',
        tip: '兩母音間只有一個子音時，75% 優先切在子音前 (V/CV)，前面變成開音節發長母音！',
        examples: [
          { w: 'tiger', chunk: 'ti - ger', ipa: '/ˈtaɪ.ɡɚ/', zh: '老虎 (ti 開音節發長音 /aɪ/)' },
          { w: 'music', chunk: 'mu - sic', ipa: '/ˈmjuː.zɪk/', zh: '音樂 (mu 開音節發長音 /juː/)' },
          { w: 'robot', chunk: 'ro - bot', ipa: '/ˈroʊ.bɒt/', zh: '機器人 (ro 開音節發長音 /oʊ/)' },
          { w: 'robin', chunk: 'rob - in', ipa: '/ˈrɒb.ɪn/', zh: '知更鳥 (例外：閉音節發短音 /ɒ/)' }
        ]
      },
      {
        pattern: '規則 3：子音 + le 字尾成一家 (-C-le)',
        formula: '子音 + l + e 結尾',
        tip: '當單字以 -le 結尾時，把前面的子音一起打包算作一個音節！',
        examples: [
          { w: 'candle', chunk: 'can - dle', ipa: '/ˈkæn.dəl/', zh: '蠟燭' },
          { w: 'table', chunk: 'ta - ble', ipa: '/ˈteɪ.bəl/', zh: '桌子' },
          { w: 'little', chunk: 'lit - tle', ipa: '/ˈlɪt.əl/', zh: '小小的' },
          { w: 'apple', chunk: 'ap - ple', ipa: '/ˈæp.əl/', zh: '蘋果' }
        ]
      },
      {
        pattern: '規則 4：神奇弱讀央母音 Schwa (/ə/)',
        formula: '非重音音節母音全部「懶化」發 /ə/',
        tip: '英文中最常出現的聲音！在不受重音的音節中，不論 a, e, i, o, u，都會變成舌頭放鬆、嘴唇微開的輕聲「呃」(/ə/)。',
        examples: [
          { w: 'banana', chunk: 'bə - nan - ə', ipa: '/bəˈnæn.ə/', zh: '香蕉 (首尾 a 均弱讀為 /ə/)' },
          { w: 'about', chunk: 'ə - bout', ipa: '/əˈbaʊt/', zh: '關於 (a 弱讀為 /ə/)' },
          { w: 'pencil', chunk: 'pen - cəl', ipa: '/ˈpɛn.səl/', zh: '鉛筆 (i 弱讀為 /ə/)' },
          { w: 'lemon', chunk: 'lem - ən', ipa: '/ˈlɛm.ən/', zh: '檸檬 (o 弱讀為 /ə/)' }
        ]
      }
    ]
  }
];

// 自然拼讀解碼字典（可快速解構長單字並提供規則分析）
export const PHONICS_DECODER_SAMPLES = [
  { word: 'fantastic', chunks: ['fan', 'tas', 'tic'], rules: ['3個音節 (VC/CV 雙切)', '全為閉音節短母音 /æ/-/æ/-/ɪ/', '重音在第二音節'], ipa: '/fænˈtæs.tɪk/', zh: '極好的、棒極了' },
  { word: 'sunshine', chunks: ['sun', 'shine'], rules: ['複合字 (sun + shine)', 'sun 為 CVC 短母音 /ʌ/', 'shine 為 Magic E 長母音 /aɪ/ + sh 組合'], ipa: '/ˈsʌn.ʃaɪn/', zh: '陽光' },
  { word: 'chocolate', chunks: ['choc', 'o', 'late'], rules: ['ch 雙字母單音 /tʃ/', '中間 o 弱讀成 Schwa /ə/', 'late 結尾弱讀'], ipa: '/ˈtʃɒk.lət/', zh: '巧克力' },
  { word: 'elephant', chunks: ['el', 'e', 'phant'], rules: ['ph 發 /f/ 雙字母音', '首音節短母音 /ɛ/', 'ant 弱讀'], ipa: '/ˈɛl.ɪ.fənt/', zh: '大象' },
  { word: 'pronunciation', chunks: ['pro', 'nun', 'ci', 'a', 'tion'], rules: ['5音節超長詞分解', 'ci 軟音 /si/', 'tion 發 /ʃən/ 經典名詞字尾'], ipa: '/prəˌnʌn.siˈeɪ.ʃən/', zh: '發音' },
  { word: 'celebration', chunks: ['cel', 'e', 'bra', 'tion'], rules: ['c 遇 e 發軟音 /s/', 'bra 為 R-Blend 開音節 /eɪ/', 'tion 發 /ʃən/'], ipa: '/ˌsɛl.əˈbreɪ.ʃən/', zh: '慶祝活動' },
  { word: 'vocabulary', chunks: ['vo', 'cab', 'u', 'lar', 'y'], rules: ['5音節學術詞', 'cab 閉音節短音 /æ/', 'lar R控制母音弱讀'], ipa: '/voʊˈkæb.jəˌlɛr.i/', zh: '詞彙、字彙量' }
];

// 當前選取的自然拼讀模組標籤
let activePhonicsTab = 'letters';
let customDecoderInput = '';
let customDecoderResult = null;

// 口腔器官圖示 SVG
function renderMouthDiagramSvg() {
  return `
    <div style="background:#fff;border:1px solid #cbd5e1;border-radius:12px;padding:16px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
      <div style="font-weight:700;color:#0f172a;margin-bottom:8px;font-size:14px">👄 自然拼讀口腔發音器官結構圖解 (Articulatory Anatomy)</div>
      <svg viewBox="0 0 420 180" style="max-width:100%;height:auto;margin:0 auto;display:block">
        <defs>
          <linearGradient id="gradLips" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f87171" />
            <stop offset="100%" stop-color="#ef4444" />
          </linearGradient>
          <linearGradient id="gradTongue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fda4af" />
            <stop offset="100%" stop-color="#f43f5e" />
          </linearGradient>
          <linearGradient id="gradAir" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#60a5fa" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#2563eb" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <!-- 鼻腔與硬顎輪廓 -->
        <path d="M 60,30 Q 140,20 220,40 T 360,70" fill="none" stroke="#94a3b8" stroke-width="3" stroke-dasharray="4,4" />
        <text x="140" y="24" font-size="11" fill="#64748b" font-weight="600">硬顎 (Hard Palate)</text>
        <text x="260" y="38" font-size="11" fill="#64748b" font-weight="600">軟顎 (Soft Palate)</text>

        <!-- 上門牙與齒齦 -->
        <rect x="75" y="45" width="14" height="24" rx="3" fill="#f1f5f9" stroke="#475569" stroke-width="2" />
        <text x="10" y="60" font-size="11" fill="#334155" font-weight="700">上門牙 (Teeth)</text>
        <path d="M 60,60 L 74,58" stroke="#475569" stroke-width="1.5" marker-end="url(#arrow)" />

        <!-- 上唇 -->
        <path d="M 65,40 C 45,45 40,60 55,68" fill="none" stroke="url(#gradLips)" stroke-width="6" stroke-linecap="round" />
        <!-- 下唇 -->
        <path d="M 55,100 C 40,115 50,130 70,135" fill="none" stroke="url(#gradLips)" stroke-width="6" stroke-linecap="round" />
        <text x="12" y="125" font-size="11" fill="#dc2626" font-weight="700">雙唇 (Lips /p,b,m/)</text>

        <!-- 舌頭動態本體 -->
        <path d="M 95,120 Q 150,75 220,105 Q 260,130 300,150 L 100,150 Z" fill="url(#gradTongue)" opacity="0.9" />
        <circle cx="115" cy="98" r="5" fill="#be123c" />
        <text x="125" y="98" font-size="11" fill="#881337" font-weight="700">舌尖 (Tip /t,d,n,s,th/)</text>

        <circle cx="180" cy="92" r="5" fill="#be123c" />
        <text x="190" y="88" font-size="11" fill="#881337" font-weight="700">舌面 (Body /j,iː/)</text>

        <circle cx="245" cy="115" r="5" fill="#be123c" />
        <text x="255" y="115" font-size="11" fill="#881337" font-weight="700">舌根 (Root /k,g,ŋ/)</text>

        <!-- 聲帶與氣流 -->
        <path d="M 330,140 Q 250,120 120,70" fill="none" stroke="url(#gradAir)" stroke-width="4" stroke-linecap="round" />
        <circle cx="345" cy="155" r="8" fill="#10b981" />
        <text x="280" y="172" font-size="12" fill="#047857" font-weight="700">聲帶 (Vocal Cords 振動發母音/濁音)</text>
      </svg>
      <div style="font-size:12px;color:#64748b;margin-top:6px">
        💡 <strong>發音秘訣：</strong>只要分清楚「氣流從哪裡阻斷（嘴唇、牙齒、舌頭）」以及「聲帶有沒有振動（清音 vs. 濁音）」，44 個英文音標立刻通曉！
      </div>
    </div>
  `;
}

// 渲染自然拼讀大師課主介面
export function renderPhonicsMasteryView() {
  const currentMod = PHONICS_MODULES.find(m => m.id === activePhonicsTab) || PHONICS_MODULES[0];

  return `
    <div class="header-block">
      <div class="pill" style="background:#fef3c7;color:#92400e;font-weight:700">🔤 核心發音與自然拼讀大師課 · 見字能讀 · 聽音能寫</div>
      <h1 style="margin:8px 0;font-size:28px">英文自然拼讀 (Phonics) 與發音規則全景大圖鑑</h1>
      <p style="color:var(--text-muted);margin:0;font-size:15px;line-height:1.6">
        徹底告別死記硬背單字字母！掌握 8 大發音黃金法則，看到英文字就能秒讀，聽到發音就能拼出單字。
        配備真人原音發音（🔊 點擊即聽）、口腔發音器官圖示、Magic E 魔法對比卡、母音團隊與長單字音節即時解碼器！
      </p>
    </div>

    <!-- 頂部功能快捷按鈕條 -->
    <div class="card" style="margin-bottom:20px;background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#fff;border-radius:14px;padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
        <div>
          <span class="pill" style="background:#10b981;color:#fff;font-weight:700;font-size:12px">⚡ 終身受用技能</span>
          <h2 style="margin:6px 0;color:#fff;font-size:20px">學會自然拼讀，單字記憶速度提升 300%！</h2>
          <div style="font-size:13px;color:#cbd5e1">
            從 26 字母基礎音 ➔ CVC 短母音 ➔ Magic E 變長音 ➔ 母音團隊 ➔ 子音組合 ➔ Bossy R ➔ 軟硬音 ➔ 音節劃分
          </div>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn" data-nav="flashcards" style="background:#f59e0b;color:#0f172a;font-weight:700;padding:10px 18px;border-radius:8px;border:none">
            🗂️ 前往全階記憶閃卡館
          </button>
          <button class="btn" data-scroll-to="#phonics-decoder" style="background:#38bdf8;color:#0f172a;font-weight:700;padding:10px 18px;border-radius:8px;border:none">
            🔍 互動式長單字音節解碼器
          </button>
        </div>
      </div>
    </div>

    <!-- 口腔發音器官解剖圖示 -->
    <div style="margin-bottom:20px">
      ${renderMouthDiagramSvg()}
    </div>

    <!-- 8 大核心模組導覽標籤頁籤 (Tabs) -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:20px;scrollbar-width:thin">
      ${PHONICS_MODULES.map(m => {
        const isActive = m.id === activePhonicsTab;
        return `
          <button class="btn ${isActive ? 'primary' : 'quiet'}" data-phonics-tab="${m.id}"
            style="white-space:nowrap;padding:10px 16px;border-radius:10px;font-size:14px;font-weight:${isActive ? '700' : '500'};border:${isActive ? '2px solid #047857' : '1px solid #cbd5e1'};display:flex;align-items:center;gap:6px">
            <span>${m.icon}</span>
            <span>${m.title}</span>
          </button>
        `;
      }).join('')}
    </div>

    <!-- 模組主卡片 -->
    <div class="card" style="border-top:4px solid #10b981;margin-bottom:28px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <div>
          <span class="pill" style="background:#d1fae5;color:#065f46;font-weight:700;font-size:12px">${currentMod.badge}</span>
          <h2 style="margin:6px 0;font-size:22px;color:#0f172a">${currentMod.title}</h2>
          <div style="font-size:14px;color:#64748b">${currentMod.subtitle}</div>
        </div>
        <div style="background:#f1f5f9;border:1px solid #cbd5e1;padding:8px 14px;border-radius:8px;font-size:13px;max-width:320px;color:#334155">
          <strong>💡 核心黃金定律：</strong><br>${currentMod.summaryRule}
        </div>
      </div>

      <p style="font-size:15px;line-height:1.7;color:#334155;margin-bottom:20px">
        ${currentMod.description}
      </p>

      <!-- 依據不同模組渲染專屬內容 -->
      ${renderModuleSpecificContent(currentMod)}
    </div>

    <!-- 🔍 互動式長單字音節解碼器 (Interactive Multisyllable Phonics Decoder) -->
    <div class="card" id="phonics-decoder" style="background:linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);border:2px solid #86efac;margin-bottom:28px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
        <div>
          <h3 style="margin:0;font-size:18px;color:#166534">🔍 互動式自然拼讀與音節解碼器 (Phonics Syllable Decoder)</h3>
          <p style="margin:4px 0 0;font-size:13px;color:#15803d">
            隨手輸入任何英文字，立即看懂如何切音節、套用哪條拼讀規則，並直接聽美式真人發音！
          </p>
        </div>
        <span class="pill" style="background:#15803d;color:#fff">看字即唸神器</span>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap">
        <input type="text" id="phonics-decoder-input" placeholder="輸入任一英文字，如 sunshine, fantastic, elephant..."
          value="${esc(customDecoderInput)}"
          style="flex:1;min-width:240px;padding:12px 16px;border-radius:8px;border:1px solid #86efac;font-size:16px;background:#fff" />
        <button class="btn primary" data-phonics-decode="true" style="padding:12px 24px;font-weight:700">
          ⚡ 立即智能拆解音節
        </button>
      </div>

      <!-- 快速範例點選按鈕 -->
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
        <span style="font-size:12px;color:#166534;font-weight:600">經典試驗字：</span>
        ${PHONICS_DECODER_SAMPLES.map(s => `
          <button class="btn small quiet" data-phonics-try-sample="${esc(s.word)}"
            style="background:#fff;border:1px solid #bbf7d0;font-size:12px;padding:4px 10px;border-radius:6px">
            ${s.word}
          </button>
        `).join('')}
      </div>

      <!-- 解碼展示卡片 -->
      ${renderDecoderResultCard(customDecoderResult || PHONICS_DECODER_SAMPLES[0])}
    </div>
  `;
}

// 依據模組 ID 渲染特定內容
function renderModuleSpecificContent(mod) {
  if (mod.id === 'letters') {
    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(210px, 1fr));gap:12px">
        ${mod.items.map(item => `
          <div style="border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;background:#fff;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.03);transition:all 0.15s ease">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <span style="font-size:24px;font-weight:800;color:#0f172a">${item.letter}</span>
                <button class="btn small primary" data-phonics-speak="${esc(item.keyWord)}" style="padding:4px 8px;font-size:11px">
                  🔊 聽發音
                </button>
              </div>
              <div style="display:flex;gap:6px;font-size:12px;margin-bottom:6px">
                <span class="pill" style="background:#eff6ff;color:#1e40af">名: ${item.name}</span>
                <span class="pill" style="background:#fef3c7;color:#92400e">音: ${item.sound}</span>
              </div>
              <div style="font-size:13px;font-weight:700;color:#047857;margin-bottom:4px">
                代表字: ${item.keyWord}
              </div>
              <div style="font-size:12px;color:#64748b;margin-bottom:6px">
                例: ${item.example}
              </div>
            </div>
            <div style="font-size:11px;color:#475569;background:#f8fafc;padding:6px 8px;border-radius:6px;border-left:3px solid #3b82f6">
              👄 ${item.mouth}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'short_vowels') {
    return `
      <div style="display:grid;gap:18px">
        ${mod.families.map(fam => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px">
              <div>
                <span class="pill" style="background:#ecfdf5;color:#047857;font-weight:800;font-size:15px">${fam.vowel} 短母音家族</span>
                <span style="font-size:13px;color:#64748b;margin-left:8px">常見字尾家族: <strong>${fam.pattern}</strong></span>
              </div>
              <button class="btn small quiet" data-phonics-speak="${esc(fam.sentence)}" style="font-size:12px">
                🔊 朗讀押韻繞口令
              </button>
            </div>

            <!-- 單字拼讀方塊卡 (C-V-C 拆解點擊) -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;margin-bottom:12px">
              ${fam.words.map(w => `
                <div style="border:1px solid #e2e8f0;border-radius:8px;padding:10px;text-align:center;background:#f8fafc">
                  <div style="font-size:18px;font-weight:800;color:#0f172a">${w.w}</div>
                  <div style="font-size:12px;color:#0284c7;font-weight:600">${w.chunk}</div>
                  <div style="font-size:11px;color:#64748b">${w.ipa} · ${w.zh}</div>
                  <button class="btn small" data-phonics-speak="${esc(w.w)}" style="margin-top:6px;width:100%;padding:3px;font-size:11px">
                    🔊 發音
                  </button>
                </div>
              `).join('')}
            </div>

            <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:8px 12px;font-size:13px;color:#92400e">
              <strong>🎵 經典情境韻文：</strong><em>"${fam.sentence}"</em>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'magic_e') {
    return `
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px;margin-bottom:16px;font-size:14px;color:#1e40af">
        🪄 <strong>魔法咒語：</strong>看到結尾帶 e 的單字，千萬別把 e 唸出來！請將手指指向中間的母音，直接大聲說出它的字母名！
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px">
        ${mod.pairs.map(p => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between">
            <div>
              <div class="pill" style="font-size:11px;background:#fef3c7;color:#92400e;margin-bottom:10px">${p.vowel}</div>
              <div style="display:flex;align-items:center;justify-content:space-around;margin-bottom:12px">
                <!-- 短音 CVC -->
                <div style="text-align:center;background:#f1f5f9;padding:10px 14px;border-radius:8px;border:1px solid #cbd5e1">
                  <div style="font-size:13px;color:#64748b">CVC 短母音</div>
                  <div style="font-size:22px;font-weight:800;color:#0f172a">${p.before.w}</div>
                  <div style="font-size:11px;color:#0284c7">${p.before.ipa}</div>
                  <div style="font-size:12px;color:#334155">${p.before.zh}</div>
                  <button class="btn small" data-phonics-speak="${esc(p.before.w)}" style="margin-top:4px;font-size:11px;padding:2px 8px">🔊</button>
                </div>

                <div style="font-size:24px;color:#f59e0b;font-weight:800">➔</div>

                <!-- 長音 CVCe -->
                <div style="text-align:center;background:#ecfdf5;padding:10px 14px;border-radius:8px;border:2px solid #10b981">
                  <div style="font-size:13px;color:#047857;font-weight:700">🪄 Magic E 長母音</div>
                  <div style="font-size:22px;font-weight:800;color:#065f46">${p.after.w}</div>
                  <div style="font-size:11px;color:#047857">${p.after.ipa}</div>
                  <div style="font-size:12px;color:#065f46">${p.after.zh}</div>
                  <button class="btn small primary" data-phonics-speak="${esc(p.after.w)}" style="margin-top:4px;font-size:11px;padding:2px 8px">🔊</button>
                </div>
              </div>
            </div>
            <div style="font-size:12px;color:#475569;background:#f8fafc;padding:6px 10px;border-radius:6px">
              💡 ${p.tip}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'vowel_teams') {
    return `
      <div style="display:grid;gap:16px">
        ${mod.groups.map(grp => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px">
              <strong style="font-size:16px;color:#0f172a">${grp.name}</strong>
              <span style="font-size:12px;color:#64748b">${grp.rule}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px">
              ${grp.words.map(w => `
                <div style="border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;background:#f8fafc;display:flex;justify-content:space-between;align-items:center">
                  <div>
                    <strong style="color:#1e293b;font-size:15px">${w.w}</strong>
                    <div style="font-size:11px;color:#0284c7">${w.ipa}</div>
                    <div style="font-size:11px;color:#64748b">${w.zh}</div>
                  </div>
                  <button class="btn small" data-phonics-speak="${esc(w.w)}" style="padding:4px 8px;font-size:11px">
                    🔊
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'digraphs_blends') {
    return `
      <div style="display:grid;gap:20px">
        ${mod.sections.map(sec => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:16px">
            <h3 style="margin:0 0 12px;font-size:16px;color:#0f172a">${sec.title}</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px">
              ${sec.items.map(it => `
                <div style="border:1px solid #e2e8f0;background:#f8fafc;padding:12px;border-radius:8px">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                    <span style="font-size:20px;font-weight:800;color:#2563eb">${it.combo}</span>
                    ${it.sound ? `<span class="pill" style="font-size:11px;background:#eff6ff;color:#1e40af">${it.sound}</span>` : ''}
                  </div>
                  <div style="font-size:12px;color:#475569;margin-bottom:8px">💡 ${it.tip}</div>
                  <div style="display:flex;flex-wrap:wrap;gap:6px">
                    ${it.words.map(w => {
                      const wordOnly = w.split(' ')[0];
                      return `
                        <button class="btn small quiet" data-phonics-speak="${esc(wordOnly)}"
                          style="background:#fff;border:1px solid #cbd5e1;font-size:12px;padding:3px 8px">
                          🔊 ${w}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'bossy_r') {
    return `
      <div style="display:grid;gap:16px">
        ${mod.groups.map(grp => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px">
              <strong style="font-size:18px;color:#7c3aed">${grp.rSound}</strong>
              <button class="btn small quiet" data-phonics-speak="${esc(grp.sentence)}" style="font-size:12px">
                🔊 聽情境例句
              </button>
            </div>
            <p style="font-size:13px;color:#475569;margin-bottom:12px">${grp.tip}</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;margin-bottom:10px">
              ${grp.words.map(w => `
                <div style="border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;background:#f8fafc;text-align:center">
                  <div style="font-size:16px;font-weight:700;color:#0f172a">${w.w}</div>
                  <div style="font-size:11px;color:#0284c7">${w.ipa}</div>
                  <div style="font-size:11px;color:#64748b">${w.zh}</div>
                  <button class="btn small" data-phonics-speak="${esc(w.w)}" style="margin-top:4px;font-size:11px;padding:2px 8px">
                    🔊
                  </button>
                </div>
              `).join('')}
            </div>
            <div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:6px;padding:8px 12px;font-size:13px;color:#5b21b6">
              💬 <em>"${grp.sentence}"</em>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'soft_hard_cg') {
    return `
      <div style="display:grid;gap:18px">
        ${mod.contrasts.map(c => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:16px">
            <h3 style="margin:0 0 12px;font-size:18px;color:#0f172a">${c.letter} 的雙面性格：軟音 vs. 硬音</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
              <!-- 軟音 -->
              <div style="background:#f0fdf4;border:2px solid #86efac;border-radius:10px;padding:12px">
                <div style="font-weight:800;color:#166534;font-size:16px;margin-bottom:4px">🍦 ${c.soft.sound}</div>
                <div style="font-size:12px;color:#15803d;margin-bottom:10px">條件: <strong>${c.soft.rule}</strong></div>
                <div style="display:grid;gap:6px">
                  ${c.soft.examples.map(ex => `
                    <div style="background:#fff;padding:6px 10px;border-radius:6px;border:1px solid #bbf7d0;display:flex;justify-content:space-between;align-items:center">
                      <div><strong>${ex.w}</strong> <span style="font-size:11px;color:#64748b">(${ex.zh})</span></div>
                      <button class="btn small quiet" data-phonics-speak="${esc(ex.w)}" style="padding:2px 6px;font-size:11px">🔊</button>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- 硬音 -->
              <div style="background:#fef2f2;border:2px solid #fca5a5;border-radius:10px;padding:12px">
                <div style="font-weight:800;color:#991b1b;font-size:16px;margin-bottom:4px">🥊 ${c.hard.sound}</div>
                <div style="font-size:12px;color:#b91c1c;margin-bottom:10px">條件: <strong>${c.hard.rule}</strong></div>
                <div style="display:grid;gap:6px">
                  ${c.hard.examples.map(ex => `
                    <div style="background:#fff;padding:6px 10px;border-radius:6px;border:1px solid #fecaca;display:flex;justify-content:space-between;align-items:center">
                      <div><strong>${ex.w}</strong> <span style="font-size:11px;color:#64748b">(${ex.zh})</span></div>
                      <button class="btn small quiet" data-phonics-speak="${esc(ex.w)}" style="padding:2px 6px;font-size:11px">🔊</button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (mod.id === 'syllables') {
    return `
      <div style="display:grid;gap:16px">
        ${mod.patterns.map(pat => `
          <div style="border:1px solid #cbd5e1;background:#fff;border-radius:12px;padding:16px">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px">
              <strong style="font-size:16px;color:#0f172a">${pat.pattern}</strong>
              <span class="pill" style="background:#e0e7ff;color:#3730a3;font-size:11px">${pat.formula}</span>
            </div>
            <p style="font-size:13px;color:#475569;margin-bottom:12px">${pat.tip}</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));gap:10px">
              ${pat.examples.map(ex => `
                <div style="border:1px solid #e2e8f0;background:#f8fafc;padding:10px;border-radius:8px;text-align:center">
                  <div style="font-size:17px;font-weight:800;color:#0f172a">${ex.w}</div>
                  <div style="font-size:14px;font-weight:700;color:#2563eb;letter-spacing:1px;margin:2px 0">${ex.chunk}</div>
                  <div style="font-size:11px;color:#64748b">${ex.ipa} · ${ex.zh}</div>
                  <button class="btn small" data-phonics-speak="${esc(ex.w)}" style="margin-top:6px;width:100%;font-size:11px;padding:3px">
                    🔊 聽音節拼讀
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return '';
}

// 渲染解碼結果卡片
function renderDecoderResultCard(item) {
  if (!item) return '';

  return `
    <div style="background:#fff;border:1px solid #86efac;border-radius:10px;padding:16px;box-shadow:0 2px 6px rgba(0,0,0,0.04)">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
        <div>
          <span style="font-size:26px;font-weight:800;color:#0f172a;letter-spacing:0.5px">${item.word}</span>
          <span style="font-size:15px;color:#0284c7;font-weight:600;margin-left:8px">${item.ipa}</span>
          <span style="font-size:14px;color:#64748b;margin-left:8px">${item.zh || ''}</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn primary" data-phonics-speak="${esc(item.word)}" style="font-size:13px;padding:6px 14px">
            🔊 正常速朗讀
          </button>
          <button class="btn secondary" data-phonics-speak-slow="${esc(item.word)}" style="font-size:13px;padding:6px 12px">
            🐢 慢速拼讀
          </button>
        </div>
      </div>

      <!-- 音節切塊視覺展示 -->
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
        <span style="font-size:13px;color:#475569;font-weight:600">自然拼讀切塊 (Chunking)：</span>
        <div style="display:flex;gap:6px;align-items:center">
          ${item.chunks.map((ch, ci) => `
            <span style="background:#eff6ff;border:2px solid #3b82f6;color:#1e40af;font-size:18px;font-weight:800;padding:6px 14px;border-radius:8px;box-shadow:0 2px 4px rgba(59,130,246,0.15)">
              ${ch}
            </span>
            ${ci < item.chunks.length - 1 ? '<span style="font-size:16px;color:#94a3b8;font-weight:bold">•</span>' : ''}
          `).join('')}
        </div>
      </div>

      <!-- 套用的拼讀規則清單 -->
      <div style="background:#f8fafc;border-radius:8px;padding:12px 14px;border:1px solid #e2e8f0">
        <strong style="color:#0f172a;font-size:13px;display:block;margin-bottom:6px">📐 本字套用之自然拼讀與音韻規則：</strong>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${item.rules.map(r => `
            <span style="background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46;padding:4px 10px;border-radius:6px;font-size:12px">
              ✔ ${r}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 簡易自訂單字切音節啟發式演算法
export function decodeWordPhonics(rawWord) {
  const word = (rawWord || '').trim().toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return null;

  // 查表 sample
  const sample = PHONICS_DECODER_SAMPLES.find(s => s.word.toLowerCase() === word);
  if (sample) return sample;

  // 演算法啟發式拆解
  const vowels = 'aeiouy';
  const chunks = [];
  let cur = '';

  for (let i = 0; i < word.length; i++) {
    cur += word[i];
    const isVowel = vowels.includes(word[i]);
    const nextIsVowel = i + 1 < word.length && vowels.includes(word[i + 1]);
    const nextNextIsVowel = i + 2 < word.length && vowels.includes(word[i + 2]);

    // 若當前為母音，且後面有兩個子音再加母音 (VC/CV)
    if (isVowel && !nextIsVowel && !nextNextIsVowel && i + 3 < word.length && vowels.includes(word[i + 3])) {
      cur += word[i + 1];
      i++;
      chunks.push(cur);
      cur = '';
    } else if (isVowel && !nextIsVowel && nextNextIsVowel) {
      // V/CV
      chunks.push(cur);
      cur = '';
    }
  }
  if (cur) {
    if (chunks.length > 0 && cur.length === 1 && !vowels.includes(cur)) {
      chunks[chunks.length - 1] += cur;
    } else {
      chunks.push(cur);
    }
  }

  const finalChunks = chunks.length ? chunks : [word];
  const rules = [`依據音節核心劃分為 ${finalChunks.length} 個發音積木`];
  if (word.endsWith('e') && word.length > 3) rules.push('結尾可能包含 Magic E 靜音規則');
  if (/sh|ch|th|wh|ph|ck|ng/.test(word)) rules.push('包含雙字母子音 (Digraphs)');
  if (/ar|er|ir|or|ur/.test(word)) rules.push('包含 Bossy R 捲舌母音');
  if (/[cg][eiy]/.test(word)) rules.push('包含軟音 C 或 G (/s/ 或 /dʒ/)');

  return {
    word: rawWord,
    chunks: finalChunks,
    rules,
    ipa: `/${word}/`,
    zh: '自訂解析單字'
  };
}

// 處理自然拼讀相關點擊與操作
export function handlePhonicsEvents(target, renderCallback) {
  const d = target.dataset;

  // 切換模組標籤
  if (d.phonicsTab) {
    activePhonicsTab = d.phonicsTab;
    renderCallback();
    return true;
  }

  // 發音（正常速）
  if (d.phonicsSpeak) {
    playWord(d.phonicsSpeak, false);
    return true;
  }

  // 發音（慢速）
  if (d.phonicsSpeakSlow) {
    playWord(d.phonicsSpeakSlow, true);
    return true;
  }

  // 嘗試解碼範例字
  if (d.phonicsTrySample) {
    customDecoderInput = d.phonicsTrySample;
    customDecoderResult = decodeWordPhonics(d.phonicsTrySample);
    renderCallback();
    return true;
  }

  // 點擊解碼按鈕
  if (d.phonicsDecode) {
    const inputEl = document.querySelector('#phonics-decoder-input');
    if (inputEl) {
      customDecoderInput = inputEl.value;
      customDecoderResult = decodeWordPhonics(inputEl.value);
      renderCallback();
    }
    return true;
  }

  return false;
}
