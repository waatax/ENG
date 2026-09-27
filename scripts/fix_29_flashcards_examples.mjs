// scripts/fix_29_flashcards_examples.mjs
import fs from 'node:fs';

const fixes = {
  'fc-jh-0008': { ex: 'The little cat likes to hide under the sofa during the thunderstorm.', exZh: '在雷雨期間，小貓喜歡躲在沙發底下。' },
  'fc-jh-0009': { ex: 'The thief tried to steal a bicycle from outside the store.', exZh: '小偷試圖從店門口偷走一輛腳踏車。' },
  'fc-jh-0010': { ex: 'They decided to shake hands politely after concluding the deal.', exZh: '達成協議後，他們決定禮貌地握手。' },
  'fc-jh-0013': { ex: 'She plans to buy a birthday present for her best friend.', exZh: '她計劃為她最好的朋友買一份生日禮物。' },
  'fc-jh-0017': { ex: 'I feel very excited when I receive an encouraging letter.', exZh: '每當我收到鼓舞人心的信件時，我都感到無比興奮。' },
  'fc-jh-0032': { ex: 'The choir will sing beautiful carols at the celebration.', exZh: '合唱團將在慶祝活動中唱出優美的頌歌。' },
  'fc-jh-0036': { ex: 'He loves to swim across the lake during the summer competition.', exZh: '他喜歡在夏季賽事中游泳橫渡整座湖泊。' },
  'fc-jh-0037': { ex: 'It will take three days to finish writing the essay.', exZh: '寫完這篇論文將花費三天的時間。' },
  'fc-jh-0038': { ex: 'Mr. Davis loves to teach mathematics to junior high school students.', exZh: '戴維斯老師熱愛向國中學生教授數學。' },
  'fc-jh-0041': { ex: 'The pitcher will throw the baseball with tremendous speed.', exZh: '投手將以驚人的球速投出棒球。' },
  'fc-jh-0043': { ex: 'Our basketball team hopes to win the championship this year.', exZh: '我們的籃球隊希望在今年贏得總冠軍。' },
  'fc-jh-0083': { ex: 'Camping with family left a wonderful memory in my heart.', exZh: '和家人一起露營在我的心中留下了美好的回憶。' },
  'fc-jh-0095': { ex: 'He works hard to become a respected doctor in the community.', exZh: '他努力奮鬥，希望能成為社區中一位受人尊敬的醫生。' },
  'fc-jh-0096': { ex: 'A strong wind can blow away all the dry leaves on the ground.', exZh: '強風能夠吹走地上所有的乾樹葉。' },
  'fc-jh-0097': { ex: 'The talented artist can draw a magnificent portrait in minutes.', exZh: '那位才華洋溢的藝術家能在幾分鐘內畫出一幅壯麗的肖像。' },
  'fc-jh-0098': { ex: 'Athletes need to drink plenty of water after the marathon.', exZh: '運動員在馬拉松跑完後需要喝大量的水。' },
  'fc-jh-0099': { ex: 'We love to eat delicious homemade noodles at grandma\'s house.', exZh: '我們喜歡在奶奶家吃美味的手工麵條。' },
  'fc-jh-0102': { ex: 'When the school bell begins to ring, classes end for the day.', exZh: '當學校鐘聲開始響起時，當天的課程便結束了。' },
  'fc-jh-0103': { ex: 'He must run as fast as possible to deliver the message.', exZh: '他必須盡快奔跑去傳遞消息。' },
  'fc-jh-0104': { ex: 'Teachers often say that practice makes perfect.', exZh: '老師們常說熟能生巧。' },
  'fc-jh-0152': { ex: 'He is willing to lend his spare umbrella to his classmate.', exZh: '他樂意將備用雨傘借給他的同學。' },
  'fc-sh-0038': { ex: 'The engineer managed to come up with an ingenious design that halved production costs.', exZh: '該工程師設法想出了一項精巧設計，使生產成本降低了一半。' },
  'fc-sh-0039': { ex: 'Technological innovations will bring about profound changes in modern education.', exZh: '科技創新將為現代教育帶來深遠的變革。' },
  'fc-sh-0043': { ex: 'We must never take for granted our democratic freedoms and clean drinking water.', exZh: '我們絕不可將民主自由與純淨飲用水視為理所當然。' },
  'fc-sh-0045': { ex: 'The research team will carry out rigorous clinical trials to ensure medication safety.', exZh: '研究團隊將執行嚴謹的臨床試驗以確保藥物安全性。' },
  'fc-sh-0046': { ex: 'The controversial new zoning policy may give rise to heated protests in city hall.', exZh: '引發爭議的新土地分區政策可能會在市議會激起激烈的抗議。' },
  'fc-sh-0047': { ex: 'What does the acronym stand for in this official document?', exZh: '在這份官方文件中，這個縮寫代表什麼意思？' },
  'fc-sh-0050': { ex: 'After re-evaluating the financial forecast, the plan begins to make sense.', exZh: '在重新評估財務預測後，這項計畫開始顯得完全說得通。' },
  'fc-to-0035': { ex: 'The corporation decided to establish a subsidiary in Europe.', exZh: '該企業決定在歐洲建立一家子公司。' }
};

let content = fs.readFileSync('dist/flashcards.mjs', 'utf8');
let modifiedCount = 0;

for (const [id, f] of Object.entries(fixes)) {
  const needle = `"id": "${id}"`;
  const idPos = content.indexOf(needle);
  if (idPos !== -1) {
    const blockEnd = content.indexOf('},', idPos);
    let block = content.substring(idPos, blockEnd !== -1 ? blockEnd : idPos + 1000);
    const exMatch = block.match(/"example":\s*"(.*?)"/);
    const exZhMatch = block.match(/"exampleZh":\s*"(.*?)"/);
    if (exMatch && exZhMatch) {
      let newBlock = block.replace(exMatch[0], `"example": "${f.ex}"`)
                          .replace(exZhMatch[0], `"exampleZh": "${f.exZh}"`);
      content = content.substring(0, idPos) + newBlock + content.substring(idPos + block.length);
      modifiedCount++;
    }
  }
}

console.log('Modified cards in dist/flashcards.mjs:', modifiedCount);
fs.writeFileSync('dist/flashcards.mjs', content, 'utf8');
