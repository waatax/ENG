import fs from 'node:fs';
const S = process.argv[2];
const raw = fs.readFileSync(S + '/all_raw.txt', 'utf8');
const lines = raw.split(/\r?\n/);
const tidy = s => s.replace(/\s+/g, ' ')
  .replace(/([\u3000-\u9fff\uff00-\uffef（）、。，；：「」])\s+(?=[\u3000-\u9fff\uff00-\uffef（）、。，；：「」])/g, '$1')
  .replace(/\s*([（）、。，；：「」])\s*/g, '$1').trim();
const stagePrefix = /^第[二三四五]學習階段\s*/;
// 學習表現
const perfStart = lines.findIndex((l, i) => l.trim() === '一、學習表現' && i > 300);
const contStart = lines.findIndex((l, i) => l.trim() === '二、學習內容' && i > perfStart);
const perf = [];
let cur = null;
const catNum = {一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};
for (let i = perfStart; i < contStart; i++) {
  const l = lines[i].trim().replace(stagePrefix, '');
  if (!l) continue;
  if (/^（[一二三四五六七八九]）/.test(l)) { if (cur) perf.push(cur); cur = null; continue; }
  const m = l.match(/^([*◎\s]*)(\d)-\s*([ⅠⅡⅢⅣⅤ])\s*-(\d+)\s*(.*)$/);
  if (m) { if (cur) perf.push(cur); cur = { code: `${m[2]}-${m[3]}-${m[4]}`, cat: +m[2], stage: m[3], advanced: m[1].includes('*'), spiral: m[1].includes('◎'), text: m[5] }; continue; }
  if (/^(學習階段.*|第[二三四五]學習階段|\d+)$/.test(l)) continue;
  if (cur) cur.text += l;
}
if (cur) perf.push(cur);
perf.forEach(p => p.text = tidy(p.text));
// 學習內容
const tblStart = lines.findIndex((l, i) => i > contStart && /^主題 項目 第二學習階段/.test(l.trim()));
const tblEnd = lines.findIndex((l, i) => i > tblStart && /^三、普通型高級中等學校/.test(l.trim()));
const content = [];
cur = null;
const codeRe = /(?:[*◎]\s*)*(A[a-e]|[BCD])\s*-\s*([ⅠⅡⅢⅣⅤ])\s*-\s*(\d+)/g;
for (let i = tblStart; i < tblEnd; i++) {
  const l = lines[i].trim();
  if (!l || /^\d+$/.test(l) || /^(學習內容|主題 項目.*|A\.|語言|知識|[a-e]\.|字母|語音|字詞|句構|篇章|B\.|溝通|功能|C\.|文化|與|習俗|D\.|思考|能力)$/.test(l)) continue;
  const hits = [...l.matchAll(codeRe)];
  if (!hits.length) { if (cur) cur.text += l; continue; }
  if (hits[0].index > 0 && cur) cur.text += l.slice(0, hits[0].index);
  hits.forEach((h, k) => {
    if (cur) content.push(cur);
    const end = h.index + h[0].length;
    cur = { code: `${h[1]}-${h[2]}-${h[3]}`, theme: h[1], stage: h[2], advanced: h[0].includes('*'), spiral: h[0].includes('◎'), text: l.slice(end, k + 1 < hits.length ? hits[k + 1].index : l.length) };
  });
}
if (cur) content.push(cur);
content.forEach(c => c.text = tidy(c.text));
// page-split cells: verified against the PDF table layout
const fix = {
  'Ae-Ⅲ-1': '簡易歌謠、韻文、短文、故事及短劇。', 'Ae-Ⅳ-1': '簡易歌謠、韻文、短文、故事及短劇。', 'Ae-Ⅴ-1': '歌曲、短詩、短文、短劇、故事。',
  'Ae-Ⅲ-2': '繪本故事、兒童短劇。', 'B-Ⅳ-3': '語言與非語言的溝通策略（如請求重述、手勢、表情等）。', 'B-Ⅴ-2': '高中階段所學字詞及句型的生活溝通。',
  'B-Ⅳ-8': '引導式討論。', 'D-Ⅲ-3': '依綜合資訊作簡易猜測。', 'D-Ⅳ-2': '二至三項訊息的比較、歸類、排序的方法。', 'D-Ⅴ-2': '兩個訊息關係的釐清。'
};
content.forEach(c => { if (fix[c.code]) c.text = fix[c.code]; });
// 核心素養
const compRegion = lines.slice(lines.findIndex(l => /英-E-A1/.test(l)) - 5, lines.findIndex((l, i) => i > 300 && l.trim() === '伍、學習重點')).join('\n');
const comp = [];
const compRe = /英\s*(S-U|-E|-J)-\s*([ABC][123])\s*\n([\s\S]*?)(?=\n英\s*(?:S-U|-E|-J)-|\n[ABC][123]\n|\n\d+\n總綱|\nC\n社會|\nB\n溝通|$)/g;
for (const mm of compRegion.matchAll(compRe)) {
  const lvl = mm[1] === 'S-U' ? 'S-U' : mm[1].slice(1);
  comp.push({ code: lvl === 'S-U' ? `英S-U-${mm[2]}` : `英-${lvl}-${mm[2]}`, level: lvl, dim: mm[2], text: tidy(mm[3]).replace(/\s*\d+\s*總綱.*$/, '').replace(/。\d+$/, '。') });
}
fs.writeFileSync(S + '/parsed.json', JSON.stringify({ perf, content, comp }, null, 1));
console.log('perf', perf.length, 'content', content.length, 'comp', comp.length);
