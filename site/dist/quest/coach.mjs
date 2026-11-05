// Feedback text remains derived from the item; no answer is exposed before submission.
export function answerText(it) {
  if (it.type === 'multi') return (it.correctAnswers || []).join('；');
  if (it.type === 'match') return it.pairs.map(p => p.join('，')).join('。');
  if (it.audioAfter) return it.audioAfter;
  if (it.given) return `${it.given} ${it.answer}`;
  const answer = String(it.answer ?? '');
  const sentence = it.text || it.prompt;
  if (sentence && /_{2,}/.test(sentence) && /[a-z]/i.test(answer) && !/[\u3400-\u9fff]/.test(answer)) return sentence.replace(/_{2,}/g, answer);
  if (it.audio && /[\u3400-\u9fff]/.test(answer) && !/[\u3400-\u9fff]/.test(it.audio)) return `${it.audio}。${answer}`;
  return answer;
}

export function questionText(it) {
  if (!it) return '';
  if (it.audio && it.type === 'listen') return joinSpeech([it.prompt, it.audio]);
  return joinSpeech([it.prompt, it.text]);
}

export function questionAndOptionsText(it) {
  const q = questionText(it);
  if (!it?.options || !it.options.length) return q;
  const optList = it.options.map((o, i) => `選項 ${i + 1}：${o}`).join('。');
  return joinSpeech([q, optList]);
}
// Join spoken parts without doubled punctuation such as "day.。".
export function joinSpeech(parts) { return parts.filter(Boolean).map(p => String(p).trim()).filter(Boolean).map((p, i, a) => i < a.length - 1 && !/[。．.!?！？：:]$/.test(p) ? p + '。' : p).join(' '); }

export function errorFeedbackSpeechText(it, value, { diagnosis = '', evidence = '' } = {}) {
  const chosen = String(value ?? '').trim();
  const ans = answerText(it);
  const contrast = chosen && it.type !== 'match' ? `你剛才回答「${chosen}」。` : '';
  const why = it.why ? `為什麼？${it.why.replace(/[。.]$/, '')}。` : '';
  const diag = diagnosis ? `錯在哪裡？${diagnosis}` : '';
  const ev = evidence ? `原文線索：${evidence}` : '';
  const tip = correctionTip(it, value);
  return `${contrast}正確答案是「${ans}」。${diag}${why}${ev}${diag ? '' : tip}`.trim();
}

export function feedbackText(it, value) {
  const chosen = String(value ?? '').trim();
  const contrast = chosen && it.type !== 'match' ? `你剛才回答「${chosen}」。正確答案是「${it.answer}」。` : '';
  return `${contrast}${it.why || ''} ${correctionTip(it, value)}`.trim();
}

export function correctionTip(it, value) {
  if (it.type === 'match') return '先把每個英文和中文意思各念一次，再逐組配對。錯配的字會再練習。';
  if (it.type === 'build') return '對照正確句子的字序，留意主詞、動詞與後面的補充資訊，再跟讀完整句子。';
  if (it.type === 'input') return `把你的「${String(value ?? '')}」和正確答案逐字比對，留意拼字、漏字與動詞形式，再遮住答案重說一次。`;
  if (it.type === 'listen') return '重新聽一次原音，對照正解找出沒聽清楚的字，再用慢速跟讀。';
  return '先讀上方解析，找出正確答案的線索，再回頭比較你選的選項，最後遮住答案說一次。';
}

// ---------- why the learner's own answer is off (Smart Coach v2) ----------
// Rule-based: a rule speaks only when it can see the cause; otherwise diagnose() returns '' and the item's own why stands alone.
const IRREGULAR = 'go goes went gone going|have has had having|do does did done doing|see sees saw seen seeing|eat eats ate eaten eating|come comes came coming|take takes took taken taking|make makes made making|get gets got gotten getting|give gives gave given giving|write writes wrote written writing|run runs ran running|buy buys bought buying|think thinks thought thinking|teach teaches taught teaching|catch catches caught catching|bring brings brought bringing|swim swims swam swum swimming|sing sings sang sung singing|drink drinks drank drunk drinking|begin begins began begun beginning|know knows knew known knowing|fly flies flew flown flying|speak speaks spoke spoken speaking|break breaks broke broken breaking|choose chooses chose chosen choosing|drive drives drove driven driving|ride rides rode ridden riding|tell tells told telling|say says said saying|find finds found finding|leave leaves left leaving|feel feels felt feeling|keep keeps kept keeping|sleep sleeps slept sleeping|meet meets met meeting|sit sits sat sitting|stand stands stood standing|win wins won winning|lose loses lost losing|pay pays paid paying|wear wears wore worn wearing|draw draws drew drawn drawing|grow grows grew grown growing|throw throws threw thrown throwing|forget forgets forgot forgotten forgetting|hear hears heard hearing|send sends sent sending|spend spends spent spending|build builds built building|sell sells sold selling|fall falls fell fallen falling|hold holds held holding|become becomes became becoming|read reads reading|put puts putting|cut cuts cutting|hit hits hitting|hurt hurts hurting|cost costs costing|let lets letting|set sets setting|shut shuts shutting|lend lends lent lending|mean means meant meaning|dream dreams dreamt dreaming|lead leads led leading|feed feeds fed feeding|hide hides hid hidden hiding|bite bites bit bitten biting|shake shakes shook shaken shaking|wake wakes woke woken waking|steal steals stole stolen stealing|tear tears tore torn tearing|rise rises rose risen rising|arise arises arose arisen arising|blow blows blew blown blowing|show shows showed shown showing|beat beats beaten beating|forgive forgives forgave forgiven forgiving|sink sinks sank sunk sinking|ring rings rang rung ringing|hang hangs hung hanging|dig digs dug digging|stick sticks stuck sticking|strike strikes struck striking|lay lays laid laying|lie lies lay lain lying|seek seeks sought seeking|fight fights fought fighting|deal deals dealt dealing'.split('|').map(s => s.split(' '));
const FORM_NAME = { base: '原形', s: '加 -s／-es 的形態（第三人稱單數現在式或複數名詞）', past: '過去式', pp: '過去分詞', ing: 'V-ing（進行式或動名詞）', er: '加 -er 的形態（比較級，或「做…的人」）', est: '最高級（-est）', ly: '副詞（-ly）' };
const BE = ['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'];
const BE_RULE = { am: 'I 搭配 am', is: 'he／she／it 和單數名詞搭配 is', are: 'you／we／they 和複數名詞搭配 are', was: '過去式的 I／he／she／it 搭配 was', were: '過去式的 you／we／they 搭配 were', be: '助動詞（will、can）和 to 後面用原形 be', been: 'have／has 後面用 been', being: 'is／are 後面表示「正在」用 being' };
const GROUPS = [
  [['a', 'an', 'the'], '冠詞看發音和特定性：a 接子音開頭的音、an 接母音開頭的音（an apple、an hour），the 指雙方都知道的那一個。'],
  [['in', 'on', 'at'], '介系詞：時間是 at 幾點、on 星期／日期、in 月份／年份／早上；地點是 at 一個點、on 表面、in 裡面。'],
  [['to', 'for', 'with', 'of', 'from', 'by', 'about', 'into', 'out', 'off', 'up', 'down', 'over', 'under', 'through', 'across', 'between', 'among', 'without', 'against', 'toward', 'towards', 'upon', 'in', 'on', 'at'], '介系詞與搭配詞需看前後動詞、形容詞或名詞的固定搭配（例如方向用 to、原因或對象用 for、工具或伴隨用 with、所屬用 of、來源用 from）。'],
  [['this', 'that', 'these', 'those'], '指示詞：this／that 接單數，these／those 接複數；this／these 指近的，that／those 指遠的。'],
  [['much', 'many', 'few', 'little', 'a few', 'a little', 'lot', 'lots', 'plenty', 'several'], '數量詞看名詞是否可數：many／few／several 接可數複數名詞；much／little 接不可數名詞。'],
  [['some', 'any', 'no', 'none', 'every', 'each', 'all', 'both', 'either', 'neither', 'everyone', 'everybody', 'someone', 'somebody', 'anyone', 'anybody', 'no one', 'nobody'], '限定詞看語氣與數量：some 多用肯定句、any 多用否定與疑問句；both 指兩者都、all 指三者以上、neither 指兩者皆非；everyone／each 等代名詞視為單數（搭配 is/has）。'],
  [['other', 'another', 'others', 'the other', 'the others'], '不定代名詞：another 指「不特定的另一個（單數）」；the other 指「兩者中的另一個」；others 指「其他的人事物（複數）」。'],
  [['will', 'would', 'can', 'could', 'shall', 'should', 'may', 'might', 'must', 'ought'], '情態助動詞需依語氣與時態選擇：can／could 表能力或請求、will／would 表意願或未來、should／ought to 表建議、must 表必須或強烈推測、may／might 表可能。'],
  [['because', 'since', 'as', 'so', 'therefore', 'thus', 'hence', 'consequently', 'because of', 'due to', 'owing to'], '因果銜接詞：because／since／as 後接完整子句表「原因」；because of／due to 後接名詞片語；so／therefore／consequently 表「結果」。'],
  [['although', 'though', 'even though', 'despite', 'in spite of', 'however', 'nevertheless', 'nonetheless', 'but', 'yet', 'while', 'whereas'], '讓步與轉折詞：although／though 後接完整子句（不可與 but 連用）；despite／in spite of 後接名詞或 V-ing；however／nevertheless 為副詞轉折。'],
  [['if', 'unless', 'whether', 'provided', 'providing', 'suppose', 'assuming', 'once', 'as long as'], '條件連接詞：if 表「如果」、unless 表「除非（= if ... not）」、whether 表「是否」、as long as 表「只要」。'],
  [['before', 'after', 'when', 'while', 'until', 'till', 'since', 'as soon as', 'by the time', 'during'], '時間銜接詞：when／while／before／after／until／since 後可接子句；during 後只能接名詞片語（不可接子句）。'],
  [['and', 'or', 'but', 'so', 'nor', 'yet'], '對等連接詞：and 表並列、but／yet 表轉折、or 表選擇或「否則」、so 表因果結果。'],
  [['too', 'either', 'also', 'neither', 'as well'], '「也」的用法：肯定句尾用 too／as well、句中用 also；否定句尾用 either。'],
  [['already', 'yet', 'still', 'ever', 'never', 'just'], '時間副詞：already 多用於肯定句表「已經」；yet 多用於否定與疑問句尾表「尚未／已經」；still 表「仍然」；ever／never 常搭配完成式。'],
  [['always', 'usually', 'often', 'sometimes', 'seldom', 'rarely', 'hardly', 'never'], '頻率副詞代表不同發生頻率（always 總是 > usually 通常 > often 經常 > sometimes 有時 > seldom／rarely／hardly 很少 > never 從不），放在一般動詞前、be 動詞後。'],
  [['good', 'well', 'better', 'best', 'bad', 'badly', 'worse', 'worst'], '詞性與級別：good／bad 是形容詞（修飾名詞或放連綴動詞後）；well／badly 是副詞（修飾動作）；better／worse 是比較級；best／worst 是最高級。'],
  [['interested', 'interesting'], '情緒分詞辨析：-ed 形容詞（interested）修飾人「感到有興趣的」；-ing 形容詞（interesting）修飾事物「令人感興趣的」。'],
  [['excited', 'exciting'], '情緒分詞辨析：-ed 形容詞（excited）修飾人「感到興奮的」；-ing 形容詞（exciting）修飾事物「令人興奮的」。'],
  [['tired', 'tiring'], '情緒分詞辨析：-ed 形容詞（tired）修飾人「感到疲累的」；-ing 形容詞（tiring）修飾事物「令人疲累的」。'],
  [['bored', 'boring'], '情緒分詞辨析：-ed 形容詞（bored）修飾人「感到無聊的」；-ing 形容詞（boring）修飾事物「令人感到無聊的」。'],
  [['surprised', 'surprising'], '情緒分詞辨析：-ed 形容詞（surprised）修飾人「感到驚訝的」；-ing 形容詞（surprising）修飾事物「令人驚訝的」。'],
  [['affect', 'effect'], '詞性辨析：affect 常為動詞（影響）；effect 常為名詞（效果、影響）。空格依句型位置決定是動詞還是名詞。'],
  [['borrow', 'lend'], '動作方向辨析：borrow 是向他人「借入」；lend 是把東西「借出」給別人。'],
  [['rise', 'raise'], '及物與不及物辨析：rise（不及物：上升、增加，無受詞）；raise（及物：舉起、飼養、募款，後面須接名詞受詞）。'],
  [['lie', 'lay'], '動詞三態與及物性：lie（不及物：躺、位於）；lay（及物：放置、下蛋，後面須接受詞）。'],
  [['sensible', 'sensitive'], '形容詞語意辨析：sensible 是「明智的、通情達理的」；sensitive 是「敏感的、易受傷的」。'],
  [['hard', 'hardly'], '副詞語意辨析：hard 當副詞是「努力地、辛苦地」；hardly 是否定副詞「幾乎不」。'],
  [['late', 'lately'], '時間副詞辨析：late 是「遲到、晚」；lately 是「最近（= recently）」。'],
  [['high', 'highly'], '副詞語意辨析：high 指具體「高度高」；highly 是抽象程度副詞「非常、極度讚譽」。'],
  [['near', 'nearly'], '副詞語意辨析：near 是「接近、靠近」；nearly 是程度副詞「幾乎（= almost）」。'],
  [['advice', 'advise'], '詞性與拼字辨析：advice 是不可數名詞（建議）；advise 是動詞（建議、勸告）。'],
  [['accept', 'except'], '詞義辨析：accept 是動詞「接受」；except 是介系詞「除…之外」。'],
  [['breath', 'breathe'], '詞性辨析：breath 是名詞（呼吸、氣息）；breathe 是動詞（呼吸）。'],
  [['choose', 'chose'], '時態辨析：choose 是現在式原形；chose 是過去式。'],
  [['compliment', 'complement'], '語意辨析：compliment 是「讚美、恭維」；complement 是「補充、相輔相成」。'],
  [['principle', 'principal'], '拼字與語意辨析：principle 是「原則、原理」（含 rule）；principal 是「校長、主要的」。'],
  [['stationary', 'stationery'], '拼字與語意辨析：stationary 是形容詞「靜止的」；stationery 是名詞「文具」（含 envelope 的 e）。'],
  [['desert', 'dessert'], '拼字與語意辨析：desert 是「沙漠」或動詞「拋棄」；dessert 是餐後「甜點」（兩個 s 代表 double sweet）。'],
  [['economic', 'economical'], '形容詞辨析：economic 與「經濟」相關（economic growth）；economical 是「節省的、實惠的」。'],
  [['historic', 'historical'], '形容詞辨析：historic 指「歷史上著名的、有重大意義的」；historical 指「與歷史相關的、歷史記載的」。'],
  [['classic', 'classical'], '形容詞辨析：classic 是「經典的、具代表性的」；classical 指「古典的（如古典音樂、古典希臘羅馬）」。'],
  [['assure', 'ensure', 'insure'], '動詞辨析：assure 向某人保證（接人受詞）；ensure 確保某事發生（接 that 子句）；insure 投保保險。'],
  [['emigrate', 'immigrate'], '移居方向辨析：emigrate 是自母國「移出」（exit）；immigrate 是遷入外國「移入」（in）。'],
  [['lose', 'loose'], '拼字與詞性辨析：lose（動詞：失去、輸掉）；loose（形容詞：寬鬆的、鬆散的）。'],
  [['quiet', 'quite'], '拼字與詞性辨析：quiet（形容詞：安靜的）；quite（程度副詞：相當、非常）。'],
  [['everyone', 'everybody', 'someone', 'somebody', 'anyone', 'anybody', 'no one', 'nobody'], '不定代名詞文法：everyone / someone 等代名詞視為「單數」，動詞要用單數形式（is / has / 單數動詞加 -s）。']
];
const CASE = { i: 'subj', he: 'subj', she: 'subj', we: 'subj', they: 'subj', me: 'obj', him: 'obj', us: 'obj', them: 'obj', my: 'poss', his: 'poss', our: 'poss', their: 'poss', your: 'poss', its: 'poss', mine: 'pron', hers: 'pron', ours: 'pron', theirs: 'pron', yours: 'pron', myself: 'refl', yourself: 'refl', himself: 'refl', herself: 'refl', itself: 'refl', ourselves: 'refl', yourselves: 'refl', themselves: 'refl', her: 'obj/poss', you: 'subj/obj', it: 'subj/obj' };
const CASE_RULE = '代名詞要看位置：主格（I／he／she／we／they）當主詞；受格（me／him／her／us／them）放在動詞或介系詞後；所有格（my／his／her／our／their）放在名詞前；mine／yours／hers 單獨使用，後面不接名詞；反身代名詞（-self）用於主詞與受詞同一人時。';
const PERSON_RULE = '代名詞要對應前面提到的人或物：男性單數用 he／him／his，女性單數用 she／her，事物用 it，兩個以上用 they／them／their，包含自己用 I 或 we。';
const WH_RULE = '疑問詞各問不同資訊：Who 問人、What 問事物、Where 問地點、When 問時間、Why 問原因、How 問方式或狀態、Which 問哪一個、Whose 問誰的。';
const REL_RULE = '關係代名詞看前面的名詞：人用 who（或 that），事物用 which（或 that），表示「…的」用 whose，地點用 where，時間用 when。';
const WH = { who: '人', whom: '人', what: '事物或內容', where: '地點', when: '時間', why: '原因', how: '方式、狀態或程度', which: '哪一個', whose: '誰的東西' };
const STOP = new Set('a an the is are am was were be to of in on at and or but it this that he she they we you i my your his her its our their do does did not no yes for with from by as so very'.split(' '));
const clean = s => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
const hasZh = s => /[㐀-鿿]/.test(String(s ?? ''));

const POS_SUFFIX = [
  [/((?:tion|sion|ment|ness|ity|ance|ence|ship|hood|ism|ist))$/, '名詞字尾（-$1）'],
  [/((?:ous|ful|less|able|ible|ive|ical|al|ic|ant|ent))$/, '形容詞字尾（-$1）'],
  [/(ly)$/, '副詞字尾（-ly）'],
  [/((?:ize|ise|ify|ate))$/, '動詞字尾（-$1）']
];

function derivationalDiagnosis(a, b) {
  if (a.length < 4 || b.length < 4) return '';
  let k = 0;
  while (k < a.length && k < b.length && a[k] === b[k]) k++;
  const sharedRoot = k >= 4;
  let posA = '', posB = '';
  for (const [re, label] of POS_SUFFIX) {
    if (!posA && re.test(a)) posA = label.replace('$1', re.exec(a)[1]);
    if (!posB && re.test(b)) posB = label.replace('$1', re.exec(b)[1]);
  }
  if (sharedRoot && (posA || posB) && posA !== posB) {
    return `「${a}」和「${b}」來自同一詞族，但詞性不同：${posA ? `「${a}」是${posA}` : `「${a}」`}，而空格處依句構需要${posB ? `${posB}「${b}」` : `「${b}」`}。`;
  }
  return '';
}

function irregularForm(w) {
  for (const row of IRREGULAR) { const k = row.indexOf(w); if (k >= 0) return { lemma: row[0], form: (row.length === 5 ? ['base', 's', 'past', 'pp', 'ing'] : row.length === 4 ? ['base', 's', 'past', 'ing'] : ['base', 's', 'ing'])[k] }; }
  return null;
}
const SUFFIX = [['ing', 'ing'], ['ied', 'past'], ['ed', 'past'], ['iest', 'est'], ['est', 'est'], ['ier', 'er'], ['er', 'er'], ['ily', 'ly'], ['ly', 'ly'], ['ies', 's'], ['es', 's'], ['s', 's']];
function regularForm(w) {
  for (const [suf, form] of SUFFIX) if (w.length > suf.length + 2 && w.endsWith(suf)) {
    const stem = w.slice(0, -suf.length) + (suf[0] === 'i' ? 'y' : '');
    return { stem: stem.replace(/(.)\1$/, '$1').replace(/e$/, ''), form };
  }
  return { stem: w.replace(/e$/, ''), form: 'base' };
}
function wordDiagnosis(a, b, initial = false) {
  if (BE.includes(a) && BE.includes(b)) return `「${a}」和「${b}」都是 be 動詞，要看主詞與時間：${BE_RULE[b]}。`;
  const ia = irregularForm(a), ib = irregularForm(b);
  if (ia && ib && ia.lemma === ib.lemma) return `「${a}」是 ${ia.lemma} 的${FORM_NAME[ia.form]}，這裡需要${FORM_NAME[ib.form]}「${b}」。先找主詞與時間線索（every day、yesterday、now、have／has），再決定動詞形態。`;
  for (const [set, rule] of GROUPS) if (set.includes(a) && set.includes(b)) return rule;
  if (CASE[a] && CASE[b]) return CASE[a].split('/').some(c => CASE[b].includes(c)) ? PERSON_RULE : CASE_RULE;
  if (WH[a] && WH[b]) return initial ? WH_RULE : REL_RULE;
  const ra = regularForm(a), rb = regularForm(b);
  if (!ia && !ib && ra.stem.length >= 3 && ra.stem === rb.stem && ra.form !== rb.form) return `「${a}」和「${b}」是同一個字的不同形態：你用了${FORM_NAME[ra.form]}，這裡需要${FORM_NAME[rb.form]}。先看句子的主詞、時間或要修飾的詞，再決定字尾。`;
  const deriv = derivationalDiagnosis(a, b);
  if (deriv) return deriv;
  return '';
}

// English ⇄ Chinese pairs taken from the course's own vocabulary questions, match pairs, and item explanations.
export function makeGlossary(items) {
  const en = new Map(), zh = new Map();
  const add = (w, m) => {
    w = clean(w);
    m = String(m ?? '').trim();
    if (!w || w.split(' ').length > 4 || hasZh(w) || !hasZh(m) || m.length > 28) return;
    if (!en.has(w)) en.set(w, m);
    if (!zh.has(m)) zh.set(m, w);
    const shortM = m.split(/[；;、，,／/]/)[0]?.trim();
    if (shortM && hasZh(shortM) && !zh.has(shortM)) zh.set(shortM, w);
  };
  for (const q of items) {
    if (!q) continue;
    const m = /^「(.+)」的英文是？$/.exec(q.prompt || '');
    if (m) add(q.answer, m[1]);
    else if (q.type === 'listen' && q.kind === 'word' && q.audio && hasZh(q.answer)) add(q.audio, q.answer);
    else if (q.kind === 'word' && q.text && !hasZh(q.text) && hasZh(q.answer)) add(q.text, q.answer);
    if (q.type === 'match' && Array.isArray(q.pairs)) {
      for (const pair of q.pairs) if (Array.isArray(pair) && pair.length >= 2) add(pair[0], pair[1]);
    }
    if (q.why) {
      const wm = /^([A-Za-z][A-Za-z -]{0,24})[：:]\s*([^\s。.]+)/.exec(q.why);
      if (wm && hasZh(wm[2])) add(wm[1], wm[2]);
    }
  }
  return { en, zh };
}

function lookupMeaning(word, gloss) {
  if (!gloss || !word) return '';
  const direct = gloss.en.get(word);
  if (direct) return direct;
  for (const cand of [word.replace(/s$/, ''), word.replace(/es$/, ''), word.replace(/ed$/, ''), word.replace(/ing$/, '')]) {
    if (cand && cand !== word && gloss.en.has(cand)) return gloss.en.get(cand);
  }
  return '';
}

function glossLine(words, gloss, skip) {
  if (!gloss) return '';
  const out = [];
  for (const w of new Set(words)) {
    if (STOP.has(w) || skip.has(w)) continue;
    const m = lookupMeaning(w, gloss);
    if (m) out.push(`「${w}」是「${m}」`);
    if (out.length === 2) break;
  }
  return out.join('、');
}

// The passage sentence that carries the answer, so "文章依據" points at real text.
export function evidenceFor(it) {
  if (!it?.passage || !it.answer || hasZh(it.answer) || it.type === 'multi') return '';
  const sentences = String(it.passage).replace(/\b(Mr|Mrs|Ms|Dr|St)\./g, '$1․').split(/(?<=[.!?])\s+/).map(s => s.replace(/․/g, '.').trim()).filter(Boolean);
  const want = clean(it.answer).split(' ').filter(w => w.length > 1 && !STOP.has(w));
  if (!want.length) return '';
  const ask = clean(it.prompt).split(' ').filter(w => w.length > 2 && !STOP.has(w) && !WH[w]);
  let best = '', bestScore = 0;
  for (const s of sentences) {
    const words = new Set(clean(s).split(' '));
    const hit = want.filter(w => words.has(w)).length / want.length;
    if (hit < 0.5) continue;
    const score = hit * 10 + ask.filter(w => words.has(w)).length;
    if (score > bestScore) { best = s; bestScore = score; }
  }
  return best.length <= 220 ? best : '';
}

const ZH_CUE_PAIRS = [
  ['what', '什麼'], ['who', '誰'], ['where', '哪裡'], ['when', '何時'], ['why', '為什麼'],
  ['how many', '幾個'], ['how much', '多少'], ['how old', '幾歲'], ['morning', '早'],
  ['afternoon', '午'], ['evening', '晚'], ['night', '晚'], ['thank', '謝'], ['sorry', '抱歉'],
  ['name', '名字'], ['meet', '認識'], ['help', '幫']
];

export function diagnose(it, value, { gloss } = {}) {
  if (!it || it.type === 'match' || it.type === 'info' || value == null || String(value).trim() === '') return '';
  const chosen = String(value).trim();
  if (it.wrong?.[chosen]) return it.wrong[chosen];
  if (it.type === 'multi') {
    const picked = chosen.split(' || '), right = it.correctAnswers || [];
    const extra = picked.filter(x => !right.includes(x)), missed = right.filter(x => !picked.includes(x));
    if (!extra.length && !missed.length) return '';
    return [extra.length ? `多選了「${extra.join('」「')}」` : '', missed.length ? `漏選了「${missed.join('」「')}」` : ''].filter(Boolean).join('，') + '。逐一檢查每個選項是否都符合題目條件。';
  }
  const answer = String(it.answer ?? '');
  if (hasZh(chosen) && hasZh(answer)) { // choosing a meaning for English sound or text
    const src = it.audio || it.text || '', back = gloss?.zh.get(chosen), key = gloss?.zh.get(answer);
    if (!src || hasZh(src)) return '';
    const words = clean(src).split(' ');
    const single = words.length === 1;
    const keyPart = key && words.includes(key) ? (single ? `${src} 的意思是「${answer}」。` : `原句「${src}」裡的關鍵字是 ${key}（${answer}）。`) : (single ? `「${src}」的正確意思是「${answer}」。` : '');
    const backPart = back && !words.includes(back) ? `「${chosen}」的英文是 ${back}${single ? '' : '，原句裡沒有這個字'}。` : '';
    if (keyPart || backPart) {
      return `${backPart}${keyPart}${it.type === 'listen' ? '再聽一次，抓住決定意思的關鍵字。' : '再讀一次，抓住決定意思的關鍵字。'}`;
    }
    const srcLower = src.toLowerCase();
    for (const [enCue, zhCue] of ZH_CUE_PAIRS) {
      if (srcLower.includes(enCue) && answer.includes(zhCue) && !chosen.includes(zhCue)) {
        return `原句含有「${enCue}」（對應「${zhCue}」），因此選「${answer}」；你選的「${chosen}」沒有對應到這個關鍵詞。`;
      }
    }
    return '';
  }
  const a = clean(chosen), b = clean(answer);
  if (!a || a === b) return '';
  if (it.type === 'build') {
    const aw = a.split(' '), bw = b.split(' '), k = bw.findIndex((w, i) => aw[i] !== w);
    if (k < 0) return '';
    return `${k > 1 ? `前 ${k} 個字都排對了，` : k ? '第 1 個字排對了，' : ''}從第 ${k + 1} 個字開始不同：你放了「${aw[k] ?? '（沒有字）'}」，這裡應該是「${bw[k]}」。英文常見順序是「主詞＋動詞＋受詞／補語＋地點＋時間」。`;
  }
  if (hasZh(chosen) || hasZh(answer)) return '';
  const aw = a.split(' '), bw = b.split(' ');
  if (aw.length === 1 && bw.length === 1) {
    const rule = wordDiagnosis(aw[0], bw[0], /^[A-Z]/.test(answer));
    if (rule) return rule;
    const d = editDistance(aw[0], bw[0]);
    if (it.type === 'input' && d <= 2 && bw[0].length >= 3) { let k = 0; while (aw[0][k] === bw[0][k]) k++; return `拼字只差 ${d} 個字母：你寫「${chosen}」，正確是「${answer}」，從第 ${k + 1} 個字母開始不同。一個字母一個字母念出正確拼字，再寫一次。`; }
  } else if (aw.length === bw.length) {
    const diff = aw.map((w, i) => [w, bw[i]]).filter(([x, y]) => x !== y);
    if (diff.length === 1) { const rule = wordDiagnosis(diff[0][0], diff[0][1], aw.indexOf(diff[0][0]) === 0); if (rule) return `兩句只差一個字（${diff[0][0]} → ${diff[0][1]}）。${rule}`; }
  }
  // Sound-to-word / sound-to-sentence listening comparison when audio matches target answer
  if (it.type === 'listen' && it.audio && clean(it.audio) === b) {
    const mine = glossLine(aw, gloss, new Set(bw)), theirs = glossLine(bw, gloss, new Set(aw));
    const meaningPart = (mine || theirs) ? `${[mine && `你選的${mine}`, theirs && `正確答案${theirs}`].filter(Boolean).join('；')}。` : '';
    if (aw.length === 1 && bw.length === 1) {
      return `音訊播放的是「${answer}」（開頭字母為 ${bw[0].slice(0, 2).toUpperCase()}），不是「${chosen}」（開頭為 ${aw[0].slice(0, 2).toUpperCase()}）。${meaningPart}再聽一次開頭子音與母音重音。`;
    }
    return `音訊播放的是「${answer}」，與你選的「${chosen}」不同。${meaningPart}再聽一次關鍵字。`;
  }
  if (it.passage && clean(it.passage).includes(b)) {
    const wh = clean(it.prompt).split(' ').find(w => WH[w]);
    const ask = wh ? `題目用 ${wh[0].toUpperCase() + wh.slice(1)} 問的是「${WH[wh]}」。` : '';
    return clean(it.passage).includes(a) ? `${ask}「${chosen}」在文章裡有出現，但不是這一題要的資訊；回到原文，找出直接回答題目的那一句。` : `${ask}文章沒有提到「${chosen}」，不能用猜測或常識作答；答案要能在原文找到依據。`;
  }
  // Listening comprehension with transcript in it.audio
  if (it.type === 'listen' && it.audio && !hasZh(it.audio) && clean(it.audio).includes(b) && !clean(it.audio).includes(a)) {
    return `音訊原句提到了「${answer}」，並沒有提到「${chosen}」。重聽一次原音，鎖定題目問的關鍵字。`;
  }
  // Grammar & vocabulary context diagnosis using gloss when available
  if (gloss) {
    const mine = glossLine(aw, gloss, new Set(bw)), theirs = glossLine(bw, gloss, new Set(aw));
    if (mine && theirs && hasZh(it.prompt) && aw.length <= 4 && bw.length <= 4) {
      return `你選的答案裡，${mine}${theirs ? `；正確答案裡，${theirs}` : ''}。先確認關鍵字的意思是否符合題目情境。`;
    }
    if ((mine || theirs) && aw.length <= 5 && bw.length <= 5) {
      return `${[mine && `你選的答案裡，${mine}`, theirs && `正確答案裡，${theirs}`].filter(Boolean).join('；')}。請對照題目語境選擇最合適的表達。`;
    }
  }
  // Dialogue / response context mismatch
  const stim = String(it.text || it.audio || '');
  if (stim && /\?/.test(stim)) {
    const qClean = clean(stim);
    const wh = ['how many', 'how much', 'how old', 'what', 'where', 'when', 'who', 'why', 'how'].find(w => qClean.includes(w));
    if (wh) {
      const whMap = { 'how many': '數量（幾個）', 'how much': '數量或價錢', 'how old': '年齡', what: '事物或名稱', where: '地點', when: '時間', who: '人物', why: '原因', how: '方式或狀態' };
      return `對方用「${wh}」提問，詢問的是「${whMap[wh]}」；回應應為「${answer}」，而「${chosen}」沒有回答到這個問題焦點。`;
    }
  }
  return '';
}
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
