import fs from 'node:fs';
const S = process.argv[2];
const lines = fs.readFileSync(S + '/voc_raw.txt', 'utf8').split(/\r?\n/);
const tidy = s => s.replace(/\s+/g, ' ')
  .replace(/([\u3000-\u9fff\uff00-\uffef（）、。，；：「」])\s+(?=[\u3000-\u9fff\uff00-\uffef（）、。，；：「」])/g, '$1')
  .replace(/\s*([（）、。，；：「」])\s*/g, '$1').trim();
const pStart = lines.findIndex((l, i) => i > 400 && l.trim() === '一、學習表現');
const cStart = lines.findIndex((l, i) => i > pStart && l.trim() === '二、學習內容');
const cEnd = lines.findIndex((l, i) => i > cStart && l.trim() === '陸、實施要點');
const grab = (from, to, re, mk) => { const out = []; let cur = null;
  for (let i = from; i < to; i++) { const l = lines[i].trim(); if (!l) continue;
    const m = l.match(re);
    if (m) { if (cur) out.push(cur); cur = mk(m); continue; }
    if (/^(類別 學習表現|主題 項目 學習內容|\d+|[（）一二三四五六七八九語言能力聽說讀寫綜合應用學習興趣與態度方法策略文化理解邏輯思考判斷創造力、]{1,2}|[A-D]\.|[a-e]\.[^\s]*|[溝通功能文化與習俗思考能力語言知識]{1})$/.test(l)) continue;
    if (cur) cur.text += l; }
  if (cur) out.push(cur); out.forEach(x => x.text = tidy(x.text)); return out; };
const perf = grab(pStart, cStart, /^([*◎]*)(\d)-V-(\d+)\s*(.*)$/, m => ({ code: `${m[2]}-V-${m[3]}`, cat: +m[2], stage: 'V', advanced: m[1].includes('*'), spiral: m[1].includes('◎'), text: m[4] }));
const content = grab(cStart, cEnd, /^(?:[a-e]\.\S*\s*)?([*◎]*)(A[a-e]|[BCD])-V-(\d+)\s*(.*)$/, m => ({ code: `${m[2]}-V-${m[3]}`, theme: m[2], stage: 'V', advanced: m[1].includes('*'), spiral: m[1].includes('◎'), text: m[4] }));
const comp = [];
for (let i = 100; i < 430; i++) { const m = lines[i].trim().match(/^英 ?V-U-([ABC][123])$/); if (!m) continue;
  let t = ''; for (let j = i + 1; j < i + 14; j++) { const l = lines[j].trim(); if (/^(英|[ABC]\d?$|\d+$|總綱|[ABC]$|社會|溝通|自主|參與|互動|行動)/.test(l) || /^[ABC][123]$/.test(l)) break; t += l; }
  comp.push({ code: `英V-U-${m[1]}`, level: 'V-U', dim: m[1], text: tidy(t) }); }
fs.writeFileSync(S + '/voc_parsed.json', JSON.stringify({ perf, content, comp }, null, 1));
console.log(perf.length, content.length, comp.length);
perf.filter(p=>p.text.length<6||p.text.length>70).forEach(p=>console.log('P?',p.code,p.text));
content.forEach(c=>console.log(c.code,c.text));
comp.forEach(c=>console.log(c.code,c.text));
