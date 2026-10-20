// standards_visuals.mjs — 依課綱補上之知識點的圖解（重音語調、溝通策略、記要點、表格格式、押韻與故事大意、討論、文化比較、專題時程、職場說明）。
import { fig, storyMountain } from './elementary_visuals.mjs';

const tiles = items => `<ul class="ev-tiles">${items.map(([i, t, s]) => `<li><span aria-hidden="true">${i}</span><b>${t}</b>${s ? `<small>${s}</small>` : ''}</li>`).join('')}</ul>`;
const table = (head, rows) => `<table class="ev-table"><thead><tr>${head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
const flow = steps => `<ol class="ev-flow">${steps.map(s => `<li>${s}</li>`).join('')}</ol>`;

function stressIntonation() {
  const bar = (words) => `<div class="ev-syl ev-sentence">${words.map(([w, hi]) => `<i class="${hi ? 'hi' : ''}">${w}</i>`).join('')}</div>`;
  return fig('句子重音長條與語調箭頭', '句子重音長條圖與兩種語調', bar([['I', 0], ['LIKE', 1], ['ice', 0], ['CREAM', 1]]) + bar([['CAN', 1], ['you', 0], ['SWIM', 1], ['↗', 0]]) + bar([['WHAT’S', 1], ['your', 0], ['NAME', 1], ['↘', 0]]), '高長條＝重音（帶意思的字）；中性詢問常見：↗ 是非問句上揚、↘ Wh- 問句下降；語調會依情境與說話目的改變。');
}
function classroomPhrases() {
  return fig('情境 → 用語對照卡', '四種生活情境與對應英文用語', tiles([['🙋', 'May I…?', '請求許可'], ['🙏', 'Thank you. → You’re welcome.', '道謝與回應'], ['😥', 'Sorry. → That’s OK.', '道歉與回應'], ['🤝', 'Can you help me, please?', '請求幫忙'], ['👂', 'Excuse me.', '引起注意、借過'], ['🔁', 'Pardon? / Say it again, please.', '沒聽清楚']]));
}
function aroundMe() {
  return fig('生活英文猜字三線索', '猜字策略流程與生活中的英文例子', flow(['👀 看圖畫、位置、顏色', '🧩 找認識的字或字的一部分', '📖 查字典或問人確認，再用一次']) + tiles([['🚪', 'EXIT', '出口'], ['🏪', 'OPEN 24 HOURS', '24 小時營業'], ['🧃', 'apple juice', '蘋果汁'], ['🏷️', 'SALE 50% OFF', '五折特價']]));
}
function clarifyFlow() {
  return fig('溝通卡住時的策略流程與禮儀表', '聽不懂時選擇策略的流程，以及國際禮儀可與不可', table(['卡住的原因', '可以說', '也可以'], [['太快了', 'Could you speak more slowly?', '手勢示意放慢'], ['沒聽清楚', 'Sorry? / Could you say that again?', '指著耳朵、表情疑惑'], ['一個字不懂', 'What does “…” mean?', '請對方寫下來'], ['不確定意思', 'Do you mean…?', '用自己的話複述']]) + `<div class="ev-cols"><div><b>✅ 禮貌做法</b><ul><li>看著對方、等對方說完</li><li>please / thank you / excuse me</li><li>排隊保持距離</li></ul></div><div><b>⛔ 初次見面避免</b><ul><li>問年齡、體重</li><li>問收入</li><li>一直打斷對方</li></ul></div></div>`);
}
function noteGrid() {
  return fig('5W 記要點表', '聽力記要點的人事時地物表格', table(['Who', 'What', 'When', 'Where', 'Change / Note'], [['coach', 'practice', 'Fri 3:30', 'gym', 'bring shoes'], ['museum tour', 'start', '10:30 → 11:00', 'main gate', 'sorry = 更正']]), '只寫關鍵字、數字、箭頭；聽完立刻補成完整句子並轉述。');
}
function formMock() {
  const row = (k, v) => `<div class="ev-form-row"><span>${k}</span><b>${v}</b></div>`;
  return fig('英文表格範例與日期、地址格式', '填好的英文表格範例與格式比較', `<div class="ev-form">${row('First name', 'Yu-ting')}${row('Last name / Surname', 'Chen')}${row('Date of birth', 'April 5, 2012')}${row('Phone', '0912-345-678')}${row('Signature', 'Yu-ting Chen')}</div>` + table(['格式', '寫法', '意思'], [['美式', '04/05/2012', '4 月 5 日'], ['英式', '04/05/2012', '5 月 4 日'], ['最安全', 'April 5, 2012', '不會誤會']]) + flow(['門牌 No. 5', '巷 Ln. 12', '路 Zhongshan Rd.', '區 Da’an Dist.', '城市 Taipei City 106', '國家 Taiwan']), '地址由小到大；姓名欄先看清楚要「名」還是「姓」。');
}
function rhymeSwbs() {
  return fig('押韻配對與 Somebody–Wanted–But–So 故事框', '押韻字配對與四格故事大意框', tiles([['🌙', 'moon / soon', '/uːn/'], ['⭐', 'star / are', '/ɑːr/'], ['💡', 'night / light', '/aɪt/'], ['🚫', 'cough / though', '拼法像但不押韻']]) + `<div class="ev-cols ev-swbs"><div><b>Somebody</b><small>a fox</small></div><div><b>Wanted</b><small>the grapes</small></div><div><b>But</b><small>they were too high</small></div><div><b>So</b><small>he said they were sour</small></div></div>`);
}
function discussionMoves() {
  return fig('討論三步驟與事實／意見分類', '討論的說、回應、延伸三步驟與事實意見分類', flow(['🗣️ 說意見＋理由：I think…, because…', '🤝 回應：I agree with… / That’s a good point, but…', '🔗 延伸：That also works for… / Can you give an example?']) + `<div class="ev-cols"><div><b>📏 事實（可查證）</b><ul><li>The library opens at 8.</li><li>Our class has 28 students.</li></ul></div><div><b>💭 意見（有判斷字）</b><ul><li>I think P.E. is the best class.</li><li>Maybe we should start later.</li></ul></div></div>`);
}
function cultureCompare() {
  return fig('跨文化比較四層次', '描述、比較、原因、反思四層次與用語', table(['層次', '句型', '例子'], [['描述', 'In …, people often…', 'In Japan, people often remove their shoes indoors.'], ['比較', 'Similarly / In contrast / while', 'In contrast, many Americans keep shoes on.'], ['原因', 'This may be because…', 'This may be because homes have tatami floors.'], ['反思', 'This made me realize…', 'Small habits reflect values about cleanliness.']]), '用 many、often、some 避免刻板印象。');
}
function storiesPoems() {
  return storyMountain() + fig('修辭辨識表', '明喻、暗喻、擬人與意象的辨識', table(['修辭', '線索', '例句'], [['simile 明喻', 'like / as', 'Her smile was as bright as the sun.'], ['metaphor 暗喻', '直接說 A 是 B', 'Time is a thief.'], ['personification 擬人', '物做人的動作', 'The wind whispered.'], ['imagery 意象', '感官描寫', 'the smell of rain on hot stone']]));
}
function emailAnatomy() {
  return fig('正式電子郵件結構圖', '正式電子郵件由主旨到署名的六個部分', flow(['📌 Subject：具體目的＋日期', '👋 Dear Ms. Chen,', '🎯 I am writing to…', '📋 細節：時間、地點、原因', '🙏 Could you please…?', '✍️ Best regards, 署名']) + tiles([['⚙️', 'OUT OF ORDER', '故障'], ['🔒', 'STAFF ONLY', '員工專用'], ['🚫', 'KEEP CLEAR', '保持淨空'], ['📝', 'N/A', '不適用']]));
}
function accentsListening() {
  return fig('多腔調聽力策略', '不同腔調的特徵與聽力三步驟', table(['腔調背景', '常見特徵', '聽的策略'], [['美式', 'water 的 t 彈舌化', '抓重音字'], ['英式', 't 較清楚、r 常不捲', '利用上下文'], ['印度英語', '節奏較平均', '先聽主題再聽細節'], ['新加坡英語', '句尾語助詞 lah', '聽不懂先略過']]) + flow(['🔮 預測主題', '🎯 抓重音字、數字、轉折', '🔁 According to… 轉述']), '所有腔調都是正確的英語；重點是溝通。');
}
function projectGantt() {
  const steps = [['定題', 1, 1], ['蒐集資料', 2, 3], ['整合比較', 4, 5], ['分工製作', 5, 7], ['發表', 8, 8], ['檢討', 9, 9]];
  const cells = steps.map(([n, a, b]) => `<div class="ev-gantt-row"><span>${n}</span><div class="ev-gantt-track">${Array.from({ length: 9 }, (_, i) => `<i class="${i + 1 >= a && i + 1 <= b ? 'on' : ''}"></i>`).join('')}</div></div>`).join('');
  return fig('專題時程甘特圖（9 個工作日示範）', '專題六階段的時程長條', `<div class="ev-gantt">${cells}</div>` + table(['Who', 'What', 'By when'], [['Amy', 'Survey 50 students', 'Day 3'], ['Ben', 'Make the data chart', 'Day 6'], ['Cindy', 'Slides & script', 'Day 7']]));
}
function workplaceListening() {
  return fig('職場聽力行動資訊表', '職場廣播與指示中要記的行動資訊', table(['誰', '做什麼', '何時', '何地', '限制／注意'], [['all staff', 'use Gate C', '1–3 p.m.', 'loading area', 'area closed'], ['you', 'wear gloves', 'before touching parts', 'workshop', 'safety']]) + flow(['預測情境', '記行動資訊', 'Let me confirm… 複述確認']));
}
function introPicture() {
  return fig('職場自我介紹與看圖說明架構', '自我介紹三句法與看圖描述金字塔', tiles([['🪪', '身分', 'I’m a student in the … Department.'], ['🛠️', '專長', 'I’m good at …'], ['🎯', '目標', 'I hope to …']]) + flow(['🖼️ 整體：This picture shows…', '🔍 細節：A worker is …-ing', '💭 推測：He might be …']));
}
function readingThinking() {
  return fig('主旨三步與轉折語路標', '閱讀主旨步驟、事實意見判斷與轉折語', flow(['📰 標題＋首句預測', '🔑 每段一個關鍵句', '✍️ The article is mainly about…']) + table(['轉折語', '關係'], [['however', '相反'], ['as a result', '結果'], ['for example', '舉例'], ['in addition', '補充']]));
}
function globalLearning() {
  return fig('SMART 學習目標與 3R 循環', 'SMART 目標五要素與減量重複使用回收循環', table(['S 具體', 'M 可衡量', 'A 可達成', 'R 相關', 'T 有期限'], [['讀科別英文新聞', '每次 3 個關鍵字', '每週 2 次', '與職涯有關', '4 週內']]) + `<ol class="ev-seasons"><li><span aria-hidden="true">⬇️</span><b>Reduce</b><small>減量</small></li><li><span aria-hidden="true">🔁</span><b>Reuse</b><small>重複使用</small></li><li><span aria-hidden="true">♻️</span><b>Recycle</b><small>回收</small></li></ol>`);
}
function mediaMaterials() {
  return fig('課外英語素材怎麼聽讀', '歌曲、故事、廣播與雜誌的學習方法', table(['素材', '第一次', '第二次'], [['🎵 歌曲', '聽副歌重複句', '看歌詞找押韻'], ['📖 短篇故事', '人物—問題—結局', '說出最喜歡的一句'], ['📻 教學廣播', '聽主題', '記三個關鍵字＋一個例句'], ['📰 雜誌漫畫', '看圖猜意思', '只查關鍵生字']]));
}

const ROUTES = [
  [/重音、語調與節奏/, stressIntonation], [/教室與生活用語/, classroomPhrases], [/生活中的英文/, aroundMe], [/聽不懂怎麼辦/, clarifyFlow],
  [/聽力記要點/, noteGrid], [/填表與英文書寫格式/, formMock], [/歌謠韻文與故事大意/, rhymeSwbs], [/引導式討論/, discussionMoves],
  [/跨文化比較與國際禮儀/, cultureCompare], [/故事、詩歌與短劇/, storiesPoems], [/便條、書信、電子郵件與表格/, emailAnatomy],
  [/不同腔調、影片與廣播/, accentsListening], [/英語專題任務/, projectGantt], [/職場聽力/, workplaceListening],
  [/職場自我介紹與看圖說明/, introPicture], [/閱讀短文與故事：主旨/, readingThinking], [/國際議題、永續發展與英語學習計畫/, globalLearning],
  [/課外英語素材/, mediaMaterials]
];
export function renderStandardsVisual(title = '') {
  const hit = ROUTES.find(([re]) => re.test(String(title)));
  return hit ? `<div class="ev-wrap">${hit[1]()}</div>` : '';
}
