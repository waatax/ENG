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

// ---------- why the learner's own answer is off ----------
// Rule-based: a rule speaks only when it can see the cause; otherwise diagnose() returns '' and the item's own why stands alone.
const IRREGULAR = 'go goes went gone going|have has had having|do does did done doing|see sees saw seen seeing|eat eats ate eaten eating|come comes came coming|take takes took taken taking|make makes made making|get gets got gotten getting|give gives gave given giving|write writes wrote written writing|run runs ran running|buy buys bought buying|think thinks thought thinking|teach teaches taught teaching|catch catches caught catching|bring brings brought bringing|swim swims swam swum swimming|sing sings sang sung singing|drink drinks drank drunk drinking|begin begins began begun beginning|know knows knew known knowing|fly flies flew flown flying|speak speaks spoke spoken speaking|break breaks broke broken breaking|choose chooses chose chosen choosing|drive drives drove driven driving|ride rides rode ridden riding|tell tells told telling|say says said saying|find finds found finding|leave leaves left leaving|feel feels felt feeling|keep keeps kept keeping|sleep sleeps slept sleeping|meet meets met meeting|sit sits sat sitting|stand stands stood standing|win wins won winning|lose loses lost losing|pay pays paid paying|wear wears wore worn wearing|draw draws drew drawn drawing|grow grows grew grown growing|throw throws threw thrown throwing|forget forgets forgot forgotten forgetting|hear hears heard hearing|send sends sent sending|spend spends spent spending|build builds built building|sell sells sold selling|fall falls fell fallen falling|hold holds held holding|become becomes became becoming'.split('|').map(s => s.split(' '));
const FORM_NAME = { base: '原形', s: '加 -s／-es 的形態（第三人稱單數現在式或複數名詞）', past: '過去式', pp: '過去分詞', ing: 'V-ing（進行式或動名詞）', er: '加 -er 的形態（比較級，或「做…的人」）', est: '最高級（-est）', ly: '副詞（-ly）' };
const BE = ['am', 'is', 'are', 'was', 'were', 'be', 'been', 'being'];
const BE_RULE = { am: 'I 搭配 am', is: 'he／she／it 和單數名詞搭配 is', are: 'you／we／they 和複數名詞搭配 are', was: '過去式的 I／he／she／it 搭配 was', were: '過去式的 you／we／they 搭配 were', be: '助動詞（will、can）和 to 後面用原形 be', been: 'have／has 後面用 been', being: 'is／are 後面表示「正在」用 being' };
const GROUPS = [
  [['a', 'an', 'the'], '冠詞看發音和特定性：a 接子音開頭的音、an 接母音開頭的音（an apple、an hour），the 指雙方都知道的那一個。'],
  [['in', 'on', 'at'], '介系詞：時間是 at 幾點、on 星期／日期、in 月份／年份／早上；地點是 at 一個點、on 表面、in 裡面。'],
  [['this', 'that', 'these', 'those'], '指示詞：this／that 接單數，these／those 接複數；this／these 指近的，that／those 指遠的。'],
  [['much', 'many'], 'many 接可數名詞複數（many books），much 接不可數名詞（much water）。'],
  [['some', 'any'], 'some 多用在肯定句，any 多用在否定句和疑問句；請別人吃東西或提出邀請時，問句也可用 some。'],
];
const CASE = { i: 'subj', he: 'subj', she: 'subj', we: 'subj', they: 'subj', me: 'obj', him: 'obj', us: 'obj', them: 'obj', my: 'poss', his: 'poss', our: 'poss', their: 'poss', your: 'poss', its: 'poss', mine: 'pron', hers: 'pron', ours: 'pron', theirs: 'pron', yours: 'pron', her: 'obj/poss', you: 'subj/obj', it: 'subj/obj' };
const CASE_RULE = '代名詞要看位置：主格（I／he／she／we／they）當主詞；受格（me／him／her／us／them）放在動詞或介系詞後；所有格（my／his／her／our／their）放在名詞前；mine／yours／hers 單獨使用，後面不接名詞。';
const PERSON_RULE = '代名詞要對應前面提到的人或物：男性單數用 he／him／his，女性單數用 she／her，事物用 it，兩個以上用 they／them／their，包含自己用 I 或 we。';
const WH_RULE = '疑問詞各問不同資訊：Who 問人、What 問事物、Where 問地點、When 問時間、Why 問原因、How 問方式或狀態、Which 問哪一個、Whose 問誰的。';
const REL_RULE = '關係代名詞看前面的名詞：人用 who（或 that），事物用 which（或 that），表示「…的」用 whose，地點用 where，時間用 when。';
const WH = { who: '人', whom: '人', what: '事物或內容', where: '地點', when: '時間', why: '原因', how: '方式、狀態或程度', which: '哪一個', whose: '誰的東西' };
const STOP = new Set('a an the is are am was were be to of in on at and or but it this that he she they we you i my your his her its our their do does did not no yes for with from by as so very'.split(' '));
const clean = s => String(s ?? '').toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
const hasZh = s => /[㐀-鿿]/.test(String(s ?? ''));
function irregularForm(w) {
  for (const row of IRREGULAR) { const k = row.indexOf(w); if (k >= 0) return { lemma: row[0], form: (row.length === 5 ? ['base', 's', 'past', 'pp', 'ing'] : ['base', 's', 'past', 'ing'])[k] }; }
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
  return '';
}
// English ⇄ Chinese pairs taken from the course's own vocabulary questions.
export function makeGlossary(items) {
  const en = new Map(), zh = new Map();
  const add = (w, m) => { w = clean(w); m = String(m ?? '').trim(); if (!w || w.split(' ').length > 3 || hasZh(w) || !hasZh(m) || m.length > 16) return; if (!en.has(w)) en.set(w, m); if (!zh.has(m)) zh.set(m, w); };
  for (const q of items) {
    const m = /^「(.+)」的英文是？$/.exec(q?.prompt || '');
    if (m) add(q.answer, m[1]);
    else if (q?.type === 'listen' && q.kind === 'word' && q.audio && hasZh(q.answer)) add(q.audio, q.answer);
  }
  return { en, zh };
}
function glossLine(words, gloss, skip) {
  const out = [];
  for (const w of new Set(words)) { if (STOP.has(w) || skip.has(w)) continue; const m = gloss?.en.get(w); if (m) out.push(`「${w}」是「${m}」`); if (out.length === 2) break; }
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
export function diagnose(it, value, { gloss } = {}) {
  if (!it || it.type === 'match' || it.type === 'info' || value == null || String(value).trim() === '') return '';
  const chosen = String(value).trim();
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
    const keyPart = key && words.includes(key) ? (single ? `${src} 的意思是「${answer}」。` : `原句「${src}」裡的關鍵字是 ${key}（${answer}）。`) : '';
    const backPart = back && !words.includes(back) ? `「${chosen}」的英文是 ${back}${single ? '' : '，原句裡沒有這個字'}。` : '';
    if (!keyPart && !backPart) return '';
    return `${backPart}${keyPart}${it.type === 'listen' ? '再聽一次，抓住決定意思的關鍵字。' : '再讀一次，抓住決定意思的關鍵字。'}`;
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
  if (it.passage && clean(it.passage).includes(b)) {
    const wh = clean(it.prompt).split(' ').find(w => WH[w]);
    const ask = wh ? `題目用 ${wh[0].toUpperCase() + wh.slice(1)} 問的是「${WH[wh]}」。` : '';
    return clean(it.passage).includes(a) ? `${ask}「${chosen}」在文章裡有出現，但不是這一題要的資訊；回到原文，找出直接回答題目的那一句。` : `${ask}文章沒有提到「${chosen}」，不能用猜測或常識作答；答案要能在原文找到依據。`;
  }
  if (!hasZh(it.prompt) || aw.length > 4 || bw.length > 4) return '';
  const mine = glossLine(aw, gloss, new Set(bw)), theirs = glossLine(bw, gloss, new Set(aw));
  if (mine && theirs) { return `你選的答案裡，${mine}${theirs ? `；正確答案裡，${theirs}` : ''}。先確認關鍵字的意思是否符合題目情境。`; }
  return '';
}
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
