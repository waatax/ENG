import { AFFIX_LESSONS } from './affix_guide.mjs';
// Explicit teaching families, never a substring-based etymology guess.
const entries = new Map();
const part = (text, kind, meaning) => ({text, kind, meaning});
function family(affix, kind, meaning, pairs) {
  for (const [base, zh, word] of pairs) {
    const key = word || (kind === '字首' ? affix + base : base + affix);
    entries.set(key, {parts: kind === '字首'
      ? [part(affix, kind, meaning), part(base, '基底詞', zh)]
      : [part(base, '基底詞', zh), part(affix, kind, meaning)],
      note: word ? `基底詞 ${base} 加上 ${affix} 時有拼字變化；請以完整單字 ${key} 為準。` : '把各部分的意思連起來，再用本卡詞義與例句確認實際用法。'});
  }
}
family('un','字首','不；相反', [['happy','快樂'],['fair','公平'],['able','能夠'],['clear','清楚'],['usual','平常'],['certain','確定'],['known','已知'],['likely','可能'],['necessary','必要'],['successful','成功'],['comfortable','舒適'],['employment','就業']]);
family('re','字首','再次；重新', [['write','寫'],['read','讀'],['build','建造'],['use','使用'],['open','開啟'],['start','開始'],['consider','考慮'],['organize','組織'],['evaluate','評估']]);
family('dis','字首','不；相反', [['agree','同意'],['appear','出現'],['like','喜歡'],['honest','誠實'],['advantage','優勢'],['satisfied','滿意']]);
family('mis','字首','錯誤地', [['understand','理解'],['use','使用'],['lead','引導'],['spell','拼寫']]);
family('pre','字首','在…之前', [['view','觀看'],['school','學校'],['pay','付款'],['heat','加熱']]);
family('over','字首','過度；超過', [['work','工作'],['estimate','估計'],['population','人口'],['confident','有信心']]);
family('under','字首','不足；低於', [['estimate','估計'],['paid','付薪的'],['developed','發展的']]);
family('ful','字尾','充滿…的；具有…的', [['care','小心'],['help','幫助'],['hope','希望'],['power','力量'],['success','成功'],['peace','和平'],['use','用途'],['color','色彩'],['beauty','美','beautiful'],['wonder','驚奇']]);
family('less','字尾','沒有…的', [['care','小心'],['help','幫助'],['hope','希望'],['home','家'],['use','用途'],['end','盡頭'],['fear','恐懼'],['power','力量'],['harm','傷害']]);
family('ness','字尾','…的狀態／性質（名詞）', [['kind','親切'],['dark','黑暗'],['ill','生病'],['weak','虛弱'],['aware','察覺的'],['happy','快樂','happiness'],['busy','忙碌','business'],['lonely','孤單','loneliness']]);
family('ment','字尾','動作、結果或狀態（名詞）', [['develop','發展'],['agree','同意'],['improve','改善'],['achieve','達成'],['employ','雇用'],['manage','管理'],['govern','治理'],['move','移動'],['enjoy','享受'],['invest','投資']]);
family('er','字尾','做某事的人／事物', [['teach','教導'],['work','工作'],['read','閱讀'],['sing','唱歌'],['farm','耕作'],['paint','繪畫'],['play','玩；演奏'],['write','寫','writer'],['drive','駕駛','driver'],['run','跑','runner'],['swim','游泳','swimmer']]);
family('ly','字尾','以…方式（副詞）', [['quick','快速'],['slow','緩慢'],['careful','小心'],['final','最後'],['usual','通常'],['sudden','突然'],['clear','清楚'],['happy','快樂','happily'],['easy','容易','easily']]);
family('able','字尾','可以…的', [['read','閱讀'],['predict','預測'],['accept','接受'],['understand','理解'],['comfort','安慰'],['rely','依賴','reliable']]);
for (const [word, left, a, right, b] of [
 ['classroom','class','班級','room','房間'],['bedroom','bed','床','room','房間'],['bathroom','bath','洗澡','room','房間'],['homework','home','家','work','工作'],['notebook','note','筆記','book','本子'],['raincoat','rain','雨','coat','外套'],['sunlight','sun','太陽','light','光'],['toothbrush','tooth','牙齒','brush','刷子'],['football','foot','腳','ball','球'],['schoolbag','school','學校','bag','袋子'],['airport','air','空中','port','港口'],['bookshelf','book','書','shelf','架子']
]) entries.set(word,{parts:[part(left,'組合詞',a),part(right,'組合詞',b)],note:'這是複合字：兩個詞組合成新的意思。'});
for (const [word, parts, note] of [
 ['transport',[['trans','字首','跨越'],['port','字根','搬運']],'跨越地方搬運 → 運輸。'],
 ['portable',[['port','字根','搬運'],['able','字尾','可以…的']],'能被搬動 → 可攜帶的。'],
 ['predict',[['pre','字首','預先'],['dict','字根','說']],'預先說出 → 預測。'],
 ['inspect',[['in','字首','向內'],['spect','字根','看']],'往裡仔細看 → 檢查。'],
 ['biography',[['bio','組合形式','生命'],['graph','字根','寫'],['y','字尾','名詞結尾']],'書寫一個人的人生 → 傳記。'],
 ['telephone',[['tele','組合形式','遠'],['phone','組合形式','聲音']],'讓聲音傳到遠方 → 電話。'],
 ['microscope',[['micro','組合形式','微小'],['scope','組合形式','觀察儀器']],'觀察微小事物的儀器 → 顯微鏡。']
]) entries.set(word,{parts:parts.map(p=>part(...p)),note});
// Reuse the guide's explicitly taught examples without inferring unseen words.
for (const lesson of AFFIX_LESSONS) for (const example of lesson.examples) {
  if (entries.has(example.word)) continue;
  const tokens=example.split.split(' + ');
  if (tokens.length!==2 || example.split.includes('→')) continue;
  const prefix=lesson.type==='字首';
  entries.set(example.word,{parts:tokens.map((text,i)=>part(text, (prefix ? i===0 : i===1) ? lesson.type : '基底詞', (prefix ? i===0 : i===1) ? lesson.meaning : '參照完整詞義')),
    note:`${example.word}：${example.zh}。${lesson.trap}`});
}
export function wordStructure(word) {
  return entries.get(String(word).trim().toLowerCase()) || null;
}
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderWordStructure(card) {
  const structure=wordStructure(card.word);
  if (!structure) return `<section class="word-structure whole-word"><h3>整字・語境記憶</h3><p>${/\s/.test(card.word)?'片語請連同整體意思與搭配一起記，不逐字直譯。':'先記完整拼字與本卡詞義，再搭配發音回想；本卡尚未提供可靠的構詞拆解。'}</p></section>`;
  return `<section class="word-structure"><h3>拆字理解 <span>字首・字根・字尾</span></h3><div class="morpheme-grid">${structure.parts.map(p=>`<div class="morpheme"><span>${esc(p.kind)}</span><strong lang="en">${esc(p.text)}</strong><p>${esc(p.meaning)}</p></div>`).join('<span class="morpheme-plus" aria-hidden="true">+</span>')}</div><p>${esc(structure.note)}</p><p class="structure-note">構詞幫助理解意思；與發音音節的分法不同。</p></section>`;
}
