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
family('im','字首','不；向內', [['possible','可能'],['patient','有耐心'],['polite','有禮貌'],['perfect','完美']]);
family('in','字首','不；相反', [['visible','可見的'],['direct','直接的'],['correct','正確的'],['formal','正式的'],['active','活躍的']]);
family('en','字首','使成為；放入', [['courage','勇氣','encourage'],['large','巨大'],['able','能夠','enable'],['rich','豐富']]);
family('anti','字首','反對；對抗', [['body','身體','antibody'],['freeze','冰凍','antifreeze'],['social','社交的']]);
family('inter','字首','在…之間；相互', [['national','國家的'],['net','網路','internet'],['act','行動','interact'],['view','看待','interview']]);
family('sub','字首','在…下方；次要', [['way','道路','subway'],['title','標題','subtitle'],['marine','海洋的','submarine']]);
family('ion','字尾','動作或狀態（名詞）', [['act','行動','action'],['direct','指引','direction'],['protect','保護','protection'],['connect','連接','connection']]);
family('ous','字尾','充滿…的（形容詞）', [['danger','危險'],['fame','名聲','famous'],['nerve','神經','nervous'],['courage','勇氣','courageous']]);
family('ive','字尾','具…特性的（形容詞）', [['act','行動','active'],['create','創造','creative'],['attract','吸引','attractive'],['protect','保護','protective']]);
family('bi','字首','二；雙重', [['cycle','輪子','bicycle'],['lingual','語言的','bilingual']]);
family('tri','字首','三', [['angle','角','triangle']]);
family('auto','字首','自己；自動', [['mobile','可移動的','automobile'],['graph','書寫','autograph']]);
for (const [word, left, a, right, b] of [
 ['classroom','class','班級','room','房間'],['bedroom','bed','床','room','房間'],['bathroom','bath','洗澡','room','房間'],['homework','home','家','work','工作'],['notebook','note','筆記','book','本子'],['raincoat','rain','雨','coat','外套'],['sunlight','sun','太陽','light','光'],['toothbrush','tooth','牙齒','brush','刷子'],['football','foot','腳','ball','球'],['schoolbag','school','學校','bag','袋子'],['airport','air','空中','port','港口'],['bookshelf','book','書','shelf','架子'],
 ['sunflower','sun','太陽','flower','花'],['earthquake','earth','地球','quake','震動'],['waterfall','water','水','fall','落下'],['butterfly','butter','奶油','fly','蒼蠅/飛行'],['keyboard','key','鍵','board','板子'],['pancake','pan','平底鍋','cake','蛋糕'],['seafood','sea','海','food','食物'],
 ['playground','play','玩耍','ground','場地'],['skyscraper','sky','天空','scraper','刮擦物/高樓'],['lighthouse','light','光線','house','房屋'],['firefighter','fire','火災','fighter','戰鬥員'],['background','back','後方','ground','背景/地面'],['masterpiece','master','大師','piece','作品'],['breakthrough','break','突破','through','穿透'],['landmark','land','陸地','mark','標誌'],
 ['railway','rail','鐵軌','way','道路'],['cupboard','cup','杯子','board','櫃子/板子'],['moonlight','moon','月亮','light','光線'],['sunshine','sun','太陽','shine','照耀'],['rainstorm','rain','雨','storm','暴風雨'],['waterproof','water','水','proof','防護'],['headline','head','主要/頭部','line','文字行/標題'],['heartbeat','heart','心臟','beat','跳動'],['lifestyle','life','生活','style','風格'],['download','down','向下','load','載入'],['upload','up','向上','load','載入'],['network','net','網狀','work','運作網絡'],['passcode','pass','通行','code','密碼代碼'],['workbook','work','練習工作','book','書本'],['ecosystem','eco','生態環境','system','系統'],['biodiversity','bio','生物生命','diversity','多樣性']
]) entries.set(word,{parts:[part(left,'組合詞',a),part(right,'組合詞',b)],note:'這是複合字：兩個詞組合成新的意思。'});
for (const [word, parts, note] of [
 ['transport',[['trans','字首','跨越'],['port','字根','搬運']],'跨越地方搬運 → 運輸。'],
 ['portable',[['port','字根','搬運'],['able','字尾','可以…的']],'能被搬動 → 可攜帶的。'],
 ['export',[['ex','字首','向外'],['port','字根','搬運']],'搬運出國門 → 出口。'],
 ['import',[['im','字首','向內'],['port','字根','搬運']],'搬運進國門 → 進口。'],
 ['predict',[['pre','字首','預先'],['dict','字根','說']],'預先說出 → 預測。'],
 ['dictation',[['dict','字根','說'],['ion','字尾','名詞字尾']],'說出字句讓他人寫下 → 聽寫。'],
 ['inspect',[['in','字首','向內'],['spect','字根','看']],'往裡仔細看 → 檢查。'],
 ['spectator',[['spect','字根','看'],['or','字尾','做…的人']],'在場觀看比賽或表演的人 → 觀眾。'],
 ['biography',[['bio','組合形式','生命'],['graph','字根','寫'],['y','字尾','名詞結尾']],'書寫一個人的人生 → 傳記。'],
 ['telephone',[['tele','組合形式','遠'],['phone','組合形式','聲音']],'讓聲音傳到遠方 → 電話。'],
 ['telescope',[['tele','組合形式','遠'],['scope','組合形式','觀察儀器']],'觀察遠方天體的儀器 → 望遠鏡。'],
 ['microscope',[['micro','組合形式','微小'],['scope','組合形式','觀察儀器']],'觀察微小事物的儀器 → 顯微鏡。'],
 ['construct',[['con','字首','共同'],['struct','字根','建造']],'共同堆疊建造 → 建設、構建。'],
 ['structure',[['struct','字根','建造'],['ure','字尾','名詞字尾']],'建造出來的型態 → 結構、構造。'],
 ['destruction',[['de','字首','向下/破壞'],['struct','字根','建造'],['ion','字尾','名詞字尾']],'把建造好的事物拆除 → 破壞、毀滅。'],
 ['attract',[['at','字首','朝向'],['tract','字根','拉引']],'朝向自己拉過來 → 吸引。'],
 ['distract',[['dis','字首','分散'],['tract','字根','拉引']],'把注意力拉開分散 → 分心。'],
 ['contract',[['con','字首','共同'],['tract','字根','拉引']],'拉在一起相互約束／拉緊 → 合約；收縮。'],
 ['reject',[['re','字首','向後/回頭'],['ject','字根','投擲']],'扔擲回去 → 拒絕。'],
 ['inject',[['in','字首','向內'],['ject','字根','投擲']],'注射打入體內 → 注射。'],
 ['project',[['pro','字首','向前'],['ject','字根','投擲']],'向前投射／向前規畫 → 投射；專案。'],
 ['describe',[['de','字首','向下/詳細'],['scribe','字根','寫']],'詳細寫下特徵 → 描述、描繪。'],
 ['manuscript',[['manu','組合形式','手'],['script','字根','寫']],'親手寫下的原稿 → 手稿、底稿。'],
 ['audience',[['aud','字根','聽'],['ience','字尾','名詞字尾']],'聚集前來傾聽的人群 → 聽眾、觀眾。'],
 ['audible',[['aud','字根','聽'],['ible','字尾','可以…的']],'聽得清楚的、可聽見的。'],
 ['visible',[['vis','字根','看'],['ible','字尾','可以…的']],'看得見的、顯著的。'],
 ['vision',[['vis','字根','看'],['ion','字尾','名詞字尾']],'眼光、視力、未來願景。'],
 ['chronology',[['chrono','組合形式','時間'],['logy','字尾','學問/記錄']],'依時間先後記錄的年表或歷史順序。'],
 ['geography',[['geo','組合形式','地球/土地'],['graphy','字尾','描繪/記錄']],'描繪地球地貌與人文環境的學問 → 地理學。'],
 ['geology',[['geo','組合形式','地球/土地'],['logy','字尾','學問/研究']],'研究地質與岩層結構的學問 → 地質學。'],
 ['biology',[['bio','組合形式','生命'],['logy','字尾','學問/研究']],'研究生命與生物體的學問 → 生物學。']
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
