// scripts/fix_66_flashcards_examples.mjs
// 為 66 張字卡修正例句，確保例句必含單字之原形（精準符合 \bword\b 詞界），
// 使語音合成朗讀例句時 100% 精準發音目標單字

import fs from 'node:fs';

const replacements = {
  'fc-el-0004': {
    example: 'Each parent plays an essential role in guiding a child.',
    exampleZh: '每一位父親或母親在引導孩子成長時都扮演關鍵角色。'
  },
  'fc-el-0025': {
    example: 'A friendly classmate helped me review the math assignment.',
    exampleZh: '一位友善的同學幫我複習了數學作業。'
  },
  'fc-el-0045': {
    example: 'Please write your full name clearly at the top of the test paper.',
    exampleZh: '請在測驗卷頂端把你的全名寫清楚。'
  },
  'fc-el-0049': {
    example: 'Please help me clean the living room before our guests arrive.',
    exampleZh: '請在客人抵達前幫我把客廳打掃乾淨。'
  },
  'fc-el-0055': {
    example: 'I want to learn how to swim across the Olympic pool.',
    exampleZh: '我想學會如何游泳橫越這座奧運標準泳池。'
  },
  'fc-el-0063': {
    example: 'Breakfast is widely considered the most important meal of the day.',
    exampleZh: '早餐被普遍認為是一天當中最重要的一餐。'
  },
  'fc-el-0070': {
    example: 'He ordered a steaming bowl of beef noodle soup for dinner.',
    exampleZh: '他晚餐點了一碗熱氣騰騰的牛肉麵。'
  },
  'fc-el-0072': {
    example: 'She ate a sweet yellow banana as a healthy afternoon snack.',
    exampleZh: '她吃了一根香甜的黃香蕉作為健康的下午點心。'
  },
  'fc-el-0073': {
    example: 'I like to peel a fresh juicy orange for dessert after lunch.',
    exampleZh: '午餐後我喜歡剝一顆新鮮多汁的柳橙當甜點。'
  },
  'fc-el-0074': {
    example: 'Broccoli is a nutritious green vegetable packed with essential vitamins.',
    exampleZh: '綠花椰菜是一種富含人體必需維生素的營養綠色蔬菜。'
  },
  'fc-el-0078': {
    example: 'A colorful little bird perched on the balcony railing this morning.',
    exampleZh: '今天早晨一隻色彩繽紛的小鳥棲息在陽台的欄杆上。'
  },
  'fc-el-0085': {
    example: 'A powerful brown bear catches fresh fish in the rushing mountain river.',
    exampleZh: '一隻強壯的棕熊在湍急的山區河流中抓新鮮的魚。'
  },
  'fc-el-0105': {
    example: 'The optometrist examined my left eye during the annual vision check.',
    exampleZh: '驗光師在年度視力檢查時仔細檢查了我的左眼。'
  },
  'fc-el-0106': {
    example: 'Whisper the secret into my ear so that nobody else can hear.',
    exampleZh: '把這個秘密輕輕對著我的耳朵說，免得其他人聽見。'
  },
  'fc-el-0136': {
    example: 'A cute pink baby pig rolled playfully in the clean dry straw.',
    exampleZh: '一隻可愛的粉紅色小豬在乾淨乾燥的稻草上開心地打滾。'
  },
  'fc-el-0137': {
    example: 'A black and white cow grazed peacefully in the lush green pasture.',
    exampleZh: '一隻黑白相間的乳牛在翠綠茂盛的牧場上平靜地吃草。'
  },
  'fc-el-0139': {
    example: 'A little yellow duck splashed merrily in the shallow garden pond.',
    exampleZh: '一隻黃色小鴨在花園的淺池塘中歡快地戲水。'
  },
  'fc-el-0143': {
    example: 'A gentle green sea turtle swam slowly toward the vibrant coral reef.',
    exampleZh: '一隻溫和的綠蠵龜緩緩游向充滿生機的珊瑚礁。'
  },
  'fc-el-0144': {
    example: 'Never try to touch a wild snake when hiking through the dense mountain forest.',
    exampleZh: '在穿越茂密山林健行時，絕不要試圖觸碰野生蛇類。'
  },
  'fc-el-0145': {
    example: 'A busy worker bee collected sweet nectar from the garden blossom.',
    exampleZh: '一隻忙碌的工蜂從花園盛開的花朵中採集香甜花蜜。'
  },
  'fc-el-0150': {
    example: 'You can easily mash a boiled potato with warm milk and butter.',
    exampleZh: '你可以很輕易地將一顆煮熟的馬鈴薯加上溫牛奶與奶油搗成泥。'
  },
  'fc-el-0151': {
    example: 'She carefully sliced a ripe red tomato to place inside the fresh sandwich.',
    exampleZh: '她細心地切了一片成熟紅番茄夾在新鮮三明治裡。'
  },
  'fc-el-0153': {
    example: 'He enjoyed a warm chocolate chip cookie alongside a cold glass of milk.',
    exampleZh: '他配著一杯冰牛奶享用了一塊熱騰騰的巧克力餅乾。'
  },
  'fc-el-0183': {
    example: 'We planted a sturdy young oak tree in the center of the schoolyard.',
    exampleZh: '我們在學校校園中央種植了一棵挺拔結實的年輕橡樹。'
  },
  'fc-el-0184': {
    example: 'He picked a lovely fragrant flower as a thoughtful gift for his mother.',
    exampleZh: '他摘了一朵芬芳可愛的鮮花作為送給母親的心意禮物。'
  },
  'fc-el-0190': {
    example: 'The North Star shines as a reliable navigation guide in the dark night sky.',
    exampleZh: '北極星在黑暗的夜空中宛如一盞可靠的導航明燈閃閃發亮。'
  },
  'fc-el-0203': {
    example: 'The ancient oak tree is exceptionally tall compared to the surrounding bushes.',
    exampleZh: '相較於周遭的矮灌木叢，這棵古老的橡樹顯得格外高聳。'
  },
  'fc-jh-0002': {
    example: 'Water will freeze into solid ice when the temperature drops to zero.',
    exampleZh: '當溫度降至零度時，水將會凍結成堅硬的冰塊。'
  },
  'fc-jh-0003': {
    example: 'We woke up early to watch the morning sun rise above the calm sea horizon.',
    exampleZh: '我們清晨早起觀賞朝陽自平靜的海平面冉冉升起。'
  },
  'fc-jh-0021': {
    example: 'Can you hear the distant chime of the church clock across the quiet valley?',
    exampleZh: '你能聽見教堂時鐘鐘聲自寧靜山谷遠處傳來嗎？'
  },
  'fc-jh-0025': {
    example: 'What time will you leave for the international airport tomorrow morning?',
    exampleZh: '你明天早晨預計幾點出發前往國際機場？'
  },
  'fc-jh-0029': {
    example: 'She loves to ride her bicycle along the scenic riverside bike path.',
    exampleZh: '她熱愛沿著風景優美的河濱自行車專用道騎腳踏車。'
  },
  'fc-jh-0034': {
    example: 'Students should not spend too much time browsing social media before bedtime.',
    exampleZh: '學生在睡前不宜花費過多時間漫無目的地滑社群媒體。'
  },
  'fc-jh-0048': {
    example: 'A modern smartphone is an indispensable portable electronic device.',
    exampleZh: '現代智慧型手機已成為一部不可或缺的隨身攜帶電子裝置。'
  },
  'fc-jh-0062': {
    example: 'Taiwan engineered resilient structures capable of withstanding a major earthquake.',
    exampleZh: '台灣研發建造了具備優異韌性且足以抵禦強烈地震的防震建築結構。'
  },
  'fc-jh-0063': {
    example: 'Clean fresh water is a precious natural resource that humanity must preserve.',
    exampleZh: '潔淨的淡水是人類必須全力守護與珍惜的寶貴自然資源。'
  },
  'fc-jh-0115': {
    example: 'Any caring citizen can register to serve as an active community volunteer.',
    exampleZh: '任何熱心的公民均可登記報名擔任積極的社區服務志工。'
  },
  'fc-jh-0120': {
    example: 'Every passenger must remain seated with seatbelts fastened until the plane stops.',
    exampleZh: '在飛機完全停穩之前，每位乘客都必須在座位上坐好並繫妥安全帶。'
  },
  'fc-jh-0122': {
    example: 'Living abroad allows you to immerse yourself fully in a fascinating foreign culture.',
    exampleZh: '在國外生活能讓您完全沉浸於迷人且深厚的異國文化之中。'
  },
  'fc-jh-0126': {
    example: 'A persistent high fever is a primary warning symptom of viral infection.',
    exampleZh: '持續不退的高燒是人體遭受病毒感染的重要警訊症狀。'
  },
  'fc-jh-0142': {
    example: 'The physics teacher explained the complex concept using simple real-world analogies.',
    exampleZh: '物理老師運用簡單的生活實例深入淺出地解釋了這個複雜的觀念。'
  },
  'fc-jh-0145': {
    example: 'A dedicated research scientist worked tirelessly to discover a sustainable cure.',
    exampleZh: '一位全心投入的研究科學家不辭辛勞地致力於發現可持續的治療方案。'
  },
  'fc-jh-0155': {
    example: 'I gratefully accept your kind invitation to attend the annual graduation ceremony.',
    exampleZh: '我由衷感謝並欣然接受您出席年度畢業典禮的熱情邀請。'
  },
  'fc-jh-0654': {
    example: 'Let us meet at the cozy corner café to enjoy an afternoon latte.',
    exampleZh: '我們下午在街角那家溫馨的咖啡館碰面喝杯熱拿鐵吧。'
  },
  'fc-jh-1023': {
    example: 'The technician assured us that the backup power system is completely O.K. now.',
    exampleZh: '技術工程師向我們保證備用電力系統現在已完全正常沒問題了。'
  },
  'fc-sh-0009': {
    example: 'Regular cardiovascular exercise will positively contribute to your overall well-being.',
    exampleZh: '規律的心血管有氧運動對促進您的身心整體健康具有顯著助益。'
  },
  'fc-sh-0034': {
    example: 'Quality inclusive education helps eliminate deep-rooted racial prejudice.',
    exampleZh: '優質包容的教育有助於消除社會中根深蒂固的種族歧視與偏見。'
  },
  'fc-sh-2135': {
    example: 'She happily introduced her handsome fiancé to all her relatives at the dinner.',
    exampleZh: '她在晚宴上開心地向所有親戚介紹了她英俊的未婚夫。'
  },
  'fc-to-0001': {
    example: 'Diplomats initiated a bilateral trade negotiation to resolve the tariff dispute.',
    exampleZh: '各國外交官啟動了雙邊經貿協商談判，以圓滿化解關稅爭端。'
  },
  'fc-to-0003': {
    example: 'The accounting department will promptly reimburse all approved business expenses.',
    exampleZh: '會計部門將迅速核銷並如數補償所有經核准的公務差旅開支。'
  },
  'fc-to-0024': {
    example: 'The procurement officer negotiated favorable bulk pricing with an authorized software vendor.',
    exampleZh: '採購主管與一家授權軟體供應商協商了優惠的大宗採購價格。'
  },
  'fc-to-0029': {
    example: 'The international company established a regional affiliate to oversee Asian distribution.',
    exampleZh: '該跨國企業設立了一家區域關係附屬機構以統籌亞洲的分銷業務。'
  },
  'fc-to-0037': {
    example: 'A competitive performance bonus serves as a compelling financial incentive for the sales team.',
    exampleZh: '具競爭力的績效獎金是激勵業務團隊全力以赴的強大財務誘因。'
  },
  'fc-to-0040': {
    example: 'Quality engineers identified a microscopic manufacturing defect on the microchip circuit.',
    exampleZh: '品管工程師在微晶片電路上發現了一處微觀的生產製造瑕疵。'
  },
  'fc-to-0041': {
    example: 'Financial analysts warned that sharp market fluctuation could impact quarterly earnings.',
    exampleZh: '財務分析師提出預警，指出劇烈的市場行情起伏波動可能會衝擊季度獲利。'
  },
  'fc-to-0045': {
    example: 'A visionary tech entrepreneur secured funding to build an innovative clean energy platform.',
    exampleZh: '一位具備遠見的科技創業家成功募得資金，打造創新的潔淨能源平台。'
  },
  'fc-sa-0001': {
    example: 'Independent laboratory analyses will corroborate the historical timeline of the discovery.',
    exampleZh: '獨立實驗室的複驗分析將能確證並佐證這項重大歷史發現的年代時序。'
  },
  'fc-sa-0007': {
    example: 'The findings serve to underscore the critical importance of public health infrastructure.',
    exampleZh: '這些研究成果進一步突顯了加強公共衛生基礎設施建設的極度重要性。'
  },
  'fc-sa-0023': {
    example: 'Rigorous scientific trials will discredit the unsubstantiated claims made by the vendor.',
    exampleZh: '嚴謹的科學臨床試驗將徹底駁倒並推翻廠商所做出的缺乏根據宣稱。'
  },
  'fc-sa-0024': {
    example: 'Advanced automation tools will augment human capabilities rather than replace workers.',
    exampleZh: '先進的自動化工具將擴增並提升人類的專業能力，而非完全取代勞工。'
  },
  'fc-sa-0026': {
    example: 'The researcher will synthesize diverse theoretical frameworks into a unified cohesive model.',
    exampleZh: '該研究員將把多元的理論框架綜合統整為一套前後一致的統一模型。'
  },
  'fc-sa-0028': {
    example: 'Financial constraints should never preclude talented students from pursuing higher education.',
    exampleZh: '經濟上的拮据限制絕不應阻礙或妨礙有才華的學子追求高等教育。'
  },
  'fc-sa-0030': {
    example: 'Extreme temperature spikes will further exacerbate regional drought conditions.',
    exampleZh: '極端高溫飆升將進一步加劇該區域的乾旱缺水災情。'
  },
  'fc-gr-0027': {
    example: 'Regular preventative maintenance will obviate the need for costly emergency structural repairs.',
    exampleZh: '定期落實預防性維護將能免除日後進行代價高昂的緊急結構修繕之必要。'
  },
  'fc-gm-0002': {
    example: 'Which piece of new evidence would most directly weaken the credibility of the argument?',
    exampleZh: '哪一項全新的調查事證最能直接削弱該論點的可信度與說服力？'
  },
  'fc-gm-0014': {
    example: 'The attorney formulated a persuasive counterargument to challenge the prosecution testimony.',
    exampleZh: '辯護律師擬定了一個極具說服力的反駁論點，有力質疑檢方的證詞。'
  }
};

const filePath = 'dist/flashcards.mjs';
let content = fs.readFileSync(filePath, 'utf8');

// Parse FLASHCARD_DATABASE JSON
const prefix = 'export const FLASHCARD_DATABASE = ';
const startIdx = content.indexOf(prefix);
if (startIdx === -1) {
  console.error('Prefix not found');
  process.exit(1);
}

const jsonStart = startIdx + prefix.length;
let endIdx = content.indexOf('];\r\n\r\nconst contentAudit', jsonStart);
if (endIdx === -1) {
  endIdx = content.indexOf('];\n\nconst contentAudit', jsonStart);
}
if (endIdx === -1) {
  console.error('Suffix not found');
  process.exit(1);
}
endIdx += 1; // include the ']'

const db = JSON.parse(content.slice(jsonStart, endIdx));
console.log(`Loaded ${db.length} cards from ${filePath}`);

let updatedCount = 0;
for (const card of db) {
  if (replacements[card.id]) {
    const rep = replacements[card.id];
    card.example = rep.example;
    card.exampleZh = rep.exampleZh;
    updatedCount++;
  }
}

console.log(`Updated ${updatedCount} cards with verified base lemma examples.`);

const newJson = JSON.stringify(db, null, 2);
const newContent = content.slice(0, jsonStart) + newJson + content.slice(endIdx);
fs.writeFileSync(filePath, newContent, 'utf8');
console.log(`Saved updated content to ${filePath}.`);
