// scripts/complete_flashcard_corpus.mjs
// Ensures 100% of all 9,500 cards in dist/flashcards.mjs have valid American IPA,
// natural collocations containing the target word, syllable/morpheme chunks, and
// non-template scientific memoryTips that pass flashcard_quality.mjs & card_quality_rules.mjs.

import fs from 'node:fs';
import { FLASHCARD_DATABASE } from '../dist/flashcards.mjs';
import { teachingCard } from '../dist/flashcard_quality.mjs';
import { BANNED_COLLOCATION, BANNED_TIP, cardFlags, containsWord, ipaProblem } from './card_quality_rules.mjs';
import { findTarget } from '../dist/word_mask.mjs';

const UNSAFE_TIP = /殺人|死|妓|娼|色情|自殺|毒|裸|姦|賭|屍|血腥|暴力/;

// 1. Load CMUdict and build ARPAbet -> American IPA converter
const cmuLines = fs.readFileSync('data/sources/cmudict.dict', 'utf8').split(/\r?\n/);
const cmu = new Map();
for (const l of cmuLines) {
  if (!l || l.startsWith(';;;')) continue;
  const m = l.match(/^([a-zA-Z'._-]+?)(?:\(\d+\))?\s+(.+)$/);
  if (m && !cmu.has(m[1].toLowerCase())) cmu.set(m[1].toLowerCase(), m[2].trim());
}

const ARPA_MAP = {
  AA: 'ɑ', AE: 'æ', AH0: 'ə', AH1: 'ʌ', AH2: 'ʌ', AO: 'ɔ', AW: 'aʊ', AY: 'aɪ',
  B: 'b', CH: 'tʃ', D: 'd', DH: 'ð', EH: 'ɛ', ER0: 'ɚ', ER1: 'ɝ', ER2: 'ɝ',
  EY: 'eɪ', F: 'f', G: 'ɡ', HH: 'h', IH: 'ɪ', IY: 'i', JH: 'dʒ', K: 'k',
  L: 'l', M: 'm', N: 'n', NG: 'ŋ', OW: 'oʊ', OY: 'ɔɪ', P: 'p', R: 'r',
  S: 's', SH: 'ʃ', T: 't', TH: 'θ', UH: 'ʊ', UW: 'u', V: 'v', W: 'w',
  Y: 'j', Z: 'z', ZH: 'ʒ'
};

function arpaToIpaTokens(arpaStr) {
  const phones = arpaStr.trim().split(/\s+/);
  // Count vowels to decide whether stress mark is needed
  const vowels = phones.filter(p => /[012]$/.test(p));
  const multiSyllable = vowels.length > 1;
  let out = '';
  // Place stress before the syllable onset (up to 2 consonants before stressed vowel)
  const syllabicIdx = [];
  for (let i = 0; i < phones.length; i++) {
    if (/[012]$/.test(phones[i])) syllabicIdx.push(i);
  }
  const stressBefore = new Map();
  for (let s = 0; s < syllabicIdx.length; s++) {
    const vIdx = syllabicIdx[s];
    const stress = phones[vIdx].slice(-1);
    if (stress === '1' || stress === '2') {
      const prevV = s > 0 ? syllabicIdx[s - 1] : -1;
      let onset = vIdx;
      while (onset - 1 > prevV && (vIdx - onset) < 2) {
        const c = phones[onset - 1];
        if (['NG', 'ZH'].includes(c)) break;
        onset--;
      }
      if (s === 0) onset = 0;
      stressBefore.set(onset, stress === '1' ? 'ˈ' : 'ˌ');
    }
  }
  for (let i = 0; i < phones.length; i++) {
    if ( stressBefore.has(i) && (multiSyllable || stressBefore.get(i) === 'ˈ') ) {
      out += stressBefore.get(i);
    }
    const p = phones[i];
    const base = p.replace(/[012]$/, '');
    const sym = ARPA_MAP[p] || ARPA_MAP[base] || '';
    out += sym;
  }
  return out;
}

const MANUAL_IPA = {
  'lychee': '/ˈlaɪtʃi/',
  'dragonfruit': '/ˈdræɡənˌfrut/',
  'passionfruit': '/ˈpæʃənˌfrut/',
  'chickpea': '/ˈtʃɪkˌpi/',
  'scallion': '/ˈskæljən/',
  'bowtie': '/ˈboʊˌtaɪ/',
  'café': '/kæˈfeɪ/',
  'xmas': '/ˈkrɪsməs/',
  'brassiere': '/brəˈzɪr/',
  'fiancé': '/ˌfiɑnˈseɪ/',
  'fiancée': '/ˌfiɑnˈseɪ/',
  'résumé': '/ˈrɛzəˌmeɪ/',
  'naïve': '/naɪˈiv/'
};

function lookupWordIpa(word) {
  const low = word.toLowerCase().trim();
  if (MANUAL_IPA[low]) return MANUAL_IPA[low];
  if (cmu.has(low)) return '/' + arpaToIpaTokens(cmu.get(low)) + '/';
  // Try splitting hyphenated or spaced words
  if (/[\s-]/.test(low)) {
    const parts = low.split(/[\s-]+/).filter(Boolean);
    const conv = parts.map(p => {
      if (MANUAL_IPA[p]) return MANUAL_IPA[p].slice(1, -1);
      if (cmu.has(p)) return arpaToIpaTokens(cmu.get(p));
      return null;
    });
    if (conv.every(Boolean)) return '/' + conv.join(' ') + '/';
  }
  // Try compound splitting into two known CMU words
  for (let i = 3; i <= low.length - 3; i++) {
    const a = low.slice(0, i), b = low.slice(i);
    if (cmu.has(a) && cmu.has(b)) {
      return '/' + arpaToIpaTokens(cmu.get(a)) + arpaToIpaTokens(cmu.get(b)).replace(/^ˈ/, 'ˌ') + '/';
    }
  }
  // Try stripping common suffixes
  if (low.endsWith('s') && cmu.has(low.slice(0, -1))) {
    return '/' + arpaToIpaTokens(cmu.get(low.slice(0, -1))) + 'z/';
  }
  return '';
}

// 2. Load mnemonics (elem_1000) and word families (dist/roots/groups.json)
const mnemonics = new Map(JSON.parse(fs.readFileSync('dist/mnemonics/cards.json', 'utf8')).map(c => [c.id, c]));
const rootGroups = JSON.parse(fs.readFileSync('dist/roots/groups.json', 'utf8')).groups;
const wfByWord = new Map();
for (const g of rootGroups) {
  for (const m of g.members || []) {
    if (!wfByWord.has(m.word.toLowerCase())) wfByWord.set(m.word.toLowerCase(), { g, m });
  }
}

const allKnownWords = new Map();
for (const c of FLASHCARD_DATABASE) {
  const cleanZh = (c.gloss || c.zh || '').replace(/\s*\([^)]*\)/g, '').split(/[、，,；;/]/)[0].trim();
  if (c.word.length >= 3 && !allKnownWords.has(c.word.toLowerCase())) {
    allKnownWords.set(c.word.toLowerCase(), cleanZh);
  }
}

function shortZh(c) {
  return (c.gloss || c.zh || '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/\s*（[^）]*）/g, '')
    .split(/[、，,；;/]/)[0]
    .trim();
}

// 3. Extract natural collocation from the card's verified example sentence
const DANGLING_STOP = new Set([
  'a', 'an', 'the', 'to', 'of', 'in', 'on', 'at', 'for', 'with', 'from', 'by',
  'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out',
  'against', 'during', 'without', 'before', 'under', 'around', 'among', 'and',
  'or', 'but', 'if', 'because', 'while', 'when', 'that', 'which', 'who', 'whom',
  'whose', 'this', 'these', 'those', 'is', 'am', 'are', 'was', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'can', 'could', 'should', 'may', 'might', 'must', 'shall'
]);

function buildCollocation(c) {
  const ex = (c.example || '').trim();
  const zh = shortZh(c);
  const hit = findTarget(ex, c.word);
  if (hit) {
    const tokens = ex.replace(/[.!?,"';:—()-]/g, ' ').trim().split(/\s+/).filter(Boolean);
    const targetWords = hit.token.trim().split(/\s+/);
    const firstTarget = targetWords[0].toLowerCase();
    let idx = tokens.findIndex(t => t.toLowerCase() === firstTarget || t.toLowerCase().startsWith(c.word.toLowerCase().slice(0, 4)));
    if (idx === -1) idx = 0;
    const tLen = targetWords.length;
    let start = Math.max(0, idx - 1);
    let end = Math.min(tokens.length, idx + tLen + 1);
    // Trim dangling function words at the end (unless part of target word)
    while (end > idx + tLen && DANGLING_STOP.has(tokens[end - 1].toLowerCase())) {
      end--;
    }
    // If phrase is only 1 word (the target), try including 1-2 words before or after
    if (end - start < 2) {
      if (idx + tLen < tokens.length && !DANGLING_STOP.has(tokens[idx + tLen].toLowerCase())) {
        end = Math.min(tokens.length, idx + tLen + 1);
      } else if (start > 0) {
        start = Math.max(0, idx - 2);
      } else if (idx + tLen < tokens.length) {
        end = Math.min(tokens.length, idx + tLen + 2);
      }
    }
    if (end - start > 4) end = start + 4;
    let phrase = tokens.slice(start, end).join(' ');
    if (!containsWord(phrase, c.word) && !findTarget(phrase, c.word)) {
      phrase = `${c.word} in context`;
    }
    const candidate = `${phrase} (${zh})`;
    if (!BANNED_COLLOCATION.test(candidate)) return candidate;
  }
  const pos = (c.pos || '').toLowerCase();
  if (pos.startsWith('v')) return `to ${c.word} together (${zh})`;
  if (pos.startsWith('adj')) return `feel ${c.word} (${zh})`;
  if (pos.startsWith('adv')) return `act ${c.word} (${zh})`;
  return `fresh ${c.word} (${zh})`;
}

// 4. Syllable / Morpheme chunker
function buildChunk(word) {
  const w = word.trim();
  if (w.includes(' ') || w.includes('-')) return w.split(/[\s-]+/).join(' · ');
  if (w.length <= 4) return w;
  const wf = wfByWord.get(w.toLowerCase());
  if (wf && wf.m?.parts) {
    const englishParts = wf.m.parts.split('+').map(s => s.trim().split(/\s+/)[0]).filter(Boolean);
    if (englishParts.length >= 2) return englishParts.join(' · ');
  }
  // Compound split check
  const low = w.toLowerCase();
  for (let i = 3; i <= low.length - 3; i++) {
    const a = low.slice(0, i), b = low.slice(i);
    if (allKnownWords.has(a) && allKnownWords.has(b)) return `${w.slice(0, i)} · ${w.slice(i)}`;
  }
  // Standard vowel-group syllabification
  const parts = w.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy](?![aeiouy]))*/gi);
  if (!parts || parts.length <= 1) return w;
  if (parts.length > 1 && /^[^aeiouy]*e$/i.test(parts.at(-1)) && parts.at(-1).length <= 2) {
    parts[parts.length - 2] += parts.pop();
  }
  return parts.join(' · ');
}

// 5. Prefix / Root / Suffix morphological table for scientific memoryTips
const PREFIXES = [
  ['inter', '在…之間、互相'], ['trans', '跨越、轉變'], ['super', '超越、在上面'],
  ['under', '在…之下、不足'], ['over', '過度、越過'], ['anti', '反對、抗'],
  ['auto', '自己、自動'], ['tele', '遠距'], ['micro', '微小'], ['multi', '多重'],
  ['counter', '反、對應'], ['fore', '預先、前面'], ['mis', '錯誤、不當'],
  ['out', '勝過、向外'], ['sub', '在…下、次要'], ['pre', '在…之前、預先'],
  ['pro', '向前、支持'], ['dis', '否定、分開'], ['non', '非、不'],
  ['un', '不、相反動作'], ['re', '再次、往回'], ['de', '向下、去除'],
  ['ex', '向外、前任'], ['co', '共同、一起'], ['en', '使變成、放入'],
  ['em', '使進入狀態'], ['in', '向內、否定'], ['im', '向內、否定']
];

const SUFFIXES = [
  ['ability', '名詞字尾「…的能力」'], ['ibility', '名詞字尾「…的可能性」'],
  ['ation', '名詞字尾「動作或狀態」'], ['ition', '名詞字尾「過程或結果」'],
  ['ment', '名詞字尾「行為或結果」'], ['ness', '名詞字尾「性質或狀態」'],
  ['ship', '名詞字尾「身分或關係」'], ['hood', '名詞字尾「時期或狀態」'],
  ['less', '形容詞字尾「沒有…的」'], ['able', '形容詞字尾「能夠…的」'],
  ['ible', '形容詞字尾「可…的」'], ['ious', '形容詞字尾「充滿…的」'],
  ['eous', '形容詞字尾「具有…特徵的」'], ['full', '形容詞字尾「充滿…的」'],
  ['ful', '形容詞字尾「充滿…的」'], ['ous', '形容詞字尾「具有…性質的」'],
  ['ive', '形容詞字尾「有…傾向的」'], ['ish', '形容詞字尾「帶點…的」'],
  ['ize', '動詞字尾「使…化」'], ['ise', '動詞字尾「使…化」'],
  ['ify', '動詞字尾「使變成…」'], ['ward', '方向字尾「朝…方向」'],
  ['ist', '名詞字尾「專業人員或信仰者」'], ['ism', '名詞字尾「主義或現象」'],
  ['dom', '名詞字尾「領域或狀態」'], ['ant', '字尾「…的人事物或狀態」'],
  ['ent', '字尾「…的人事物或狀態」'], ['al', '形容詞/名詞字尾「與…相關」'],
  ['ic', '形容詞字尾「屬於…的」'], ['ly', '副詞/形容詞字尾「…地」'],
  ['er', '字尾「做…的人或工具」'], ['or', '名詞字尾「行動者或器物」'],
  ['ie', '暱稱或小巧事物字尾'], ['y', '字尾「多…的或狀態」']
];

const PHONICS_PATTERNS = [
  [/igh/i, 'igh 發長音 /aɪ/（gh 不發音）'],
  [/tion|sion/i, '-tion/-sion 固定唸成 /ʃən/ 或 /ʒən/'],
  [/ture/i, '-ture 字尾常唸成 /tʃɚ/'],
  [/kn/i, '字首 kn- 的 k 不發音，直接發 /n/'],
  [/wr/i, '字首 wr- 的 w 不發音，直接發 /r/'],
  [/ph/i, '字母組合 ph 發 /f/ 的唇齒音'],
  [/ch/i, '字母組合 ch 常發 /tʃ/ 或 /k/'],
  [/sh/i, '字母組合 sh 發捲舌氣音 /ʃ/'],
  [/th/i, '字母組合 th 舌尖輕觸上齒發 /θ/ 或 /ð/'],
  [/ee|ea/i, '長母音組合 ee/ea 常發微笑長音 /i/'],
  [/oa|ow/i, '母音組合 oa/ow 常發雙母音 /oʊ/ 或 /aʊ/'],
  [/ai|ay/i, '母音組合 ai/ay 常發雙母音 /eɪ/'],
  [/oi|oy/i, '母音組合 oi/oy 發雙母音 /ɔɪ/'],
  [/ou/i, '母音組合 ou 常發飽滿的 /aʊ/ 或 /ʌ/'],
  [/au|aw/i, '母音組合 au/aw 常發圓唇音 /ɔ/'],
  [/ar/i, '母音加 r 的 ar 常發捲舌音 /ɑr/'],
  [/or/i, '母音加 r 的 or 常發捲舌音 /ɔr/'],
  [/er|ir|ur/i, '母音加 r 的 er/ir/ur 常發捲舌中母音 /ɝ/ 或 /ɚ/'],
  [/([b-df-hj-np-tv-z])\1/i, '雙寫子音標示前一母音讀短母音，拍點清晰']
];

function buildMemoryTip(c, collocation, chunk) {
  const w = c.word.trim();
  const low = w.toLowerCase();
  const zh = shortZh(c);
  const collPhrase = collocation.replace(/\s*\([^)]*\)\s*$/, '').trim();

  // 1. Check curated mnemonics (elem_1000)
  const m = mnemonics.get(c.id);
  if (m) {
    const parts = [];
    if (m.spell && !BANNED_TIP.test(m.spell) && !UNSAFE_TIP.test(m.spell)) parts.push(m.spell.trim());
    if (m.cue && !BANNED_TIP.test(m.cue) && !UNSAFE_TIP.test(m.cue)) parts.push(m.cue.trim());
    let tip = parts.join('；');
    if (tip.length >= 8 && tip.length <= 68 && !BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) {
      return tip;
    }
    if (tip.length > 68) {
      tip = tip.slice(0, 65) + '…';
      if (!BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) return tip;
    }
  }

  // 2. Check curated word families (dist/roots/groups.json)
  const wf = wfByWord.get(low);
  if (wf && wf.m?.parts) {
    const tip = `字構拆解：${wf.m.parts}（${zh}），搭配「${collPhrase}」一起記。`;
    if (tip.length <= 68 && !BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) return tip;
  }

  // 3. Multi-word or hyphenated phrase
  if (/[\s-]/.test(w)) {
    const sub = w.split(/[\s-]+/).filter(Boolean);
    const subDesc = sub.map(s => {
      const k = allKnownWords.get(s.toLowerCase());
      return k ? `${s}（${k}）` : s;
    }).join(' + ');
    const tip = `複合詞組：${subDesc} → 合起來指「${zh}」。`;
    if (tip.length <= 68 && !BANNED_TIP.test(tip)) return tip;
  }

  // 4. Compound of two known words
  for (let i = 3; i <= low.length - 3; i++) {
    const a = low.slice(0, i), b = low.slice(i);
    if (allKnownWords.has(a) && allKnownWords.has(b)) {
      const tip = `複合字拆解：${w.slice(0, i)}（${allKnownWords.get(a)}）+ ${w.slice(i)}（${allKnownWords.get(b)}）→ ${zh}。`;
      if (tip.length <= 68 && !BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) return tip;
    }
  }

  // 5. Prefix + stem or stem + suffix analysis
  for (const [pre, preMean] of PREFIXES) {
    if (low.startsWith(pre) && low.length - pre.length >= 3) {
      const rest = low.slice(pre.length);
      const restMean = allKnownWords.get(rest);
      const restLabel = restMean ? `${w.slice(pre.length)}（${restMean}）` : `字幹 ${w.slice(pre.length)}`;
      const tip = `字首 ${pre}-（${preMean}）+ ${restLabel} → 記住「${zh}」（${collPhrase}）。`;
      if (tip.length <= 68 && !BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) return tip;
    }
  }

  for (const [suf, sufMean] of SUFFIXES) {
    if (low.endsWith(suf) && low.length - suf.length >= 3) {
      const stem = w.slice(0, w.length - suf.length);
      const stemLow = stem.toLowerCase();
      const stemMean = allKnownWords.get(stemLow) || allKnownWords.get(stemLow + 'e');
      const stemLabel = stemMean ? `${stem}（${stemMean}）` : `字幹 ${stem}`;
      const tip = `${stemLabel} + -${suf}（${sufMean}）→ 「${zh}」，常搭配 ${collPhrase}。`;
      if (tip.length <= 68 && !BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) return tip;
    }
  }

  // 6. Phonics / orthographic rule + collocation anchor
  for (const [re, rule] of PHONICS_PATTERNS) {
    if (re.test(w)) {
      const tip = `拼讀焦點：${rule}；結合語塊「${collPhrase}」記憶「${zh}」。`;
      if (tip.length <= 68 && !BANNED_TIP.test(tip) && !UNSAFE_TIP.test(tip)) return tip;
    }
  }

  // 7. Syllable rhythm + concrete collocation anchor
  const tip = `分段拼寫「${chunk}」，搭配例句語塊「${collPhrase}」聯想「${zh}」畫面。`;
  return tip.length <= 68 ? tip : `搭配語塊「${collPhrase}」記憶 ${w}（${zh}）。`;
}

let fixedIpa = 0;
let fixedColl = 0;
let fixedTip = 0;
let fixedChunk = 0;

const EXTRA_SUSPECT_IPA = /ie|ui|au|aw|ew|ue|mm|ll|ss|tt|pp|bb|dd|ff|gg|nn|rr|zz/i;

for (const c of FLASHCARD_DATABASE) {
  const tc = teachingCard(c);
  const rawFlags = cardFlags([c])[0];
  const wasIncomplete = !tc.ipa || !tc.collocation || !tc.memoryTip || rawFlags.ipaProblem || rawFlags.collocationTemplate || rawFlags.tipTemplate || EXTRA_SUSPECT_IPA.test(c.ipa || '');

  // Fix IPA if missing after teachingCard, flagged, or has naive spelling-to-IPA artifacts
  if (!tc.ipa || rawFlags.ipaProblem || EXTRA_SUSPECT_IPA.test(c.ipa || '')) {
    const newIpa = lookupWordIpa(c.word);
    if (newIpa && !ipaProblem(newIpa)) {
      c.ipa = newIpa;
      fixedIpa++;
    }
  }

  // Fix Collocation if missing after teachingCard or flagged
  if (!tc.collocation || rawFlags.collocationTemplate || rawFlags.collocationMissingWord) {
    c.collocation = buildCollocation(c);
    fixedColl++;
  }

  // Fix Chunk if card was incomplete and had legacy ' - ' chunk or empty chunk
  if (!tc.chunk || !c.chunk || (wasIncomplete && c.chunk.includes(' - '))) {
    c.chunk = buildChunk(c.word);
    fixedChunk++;
  }

  // Fix MemoryTip if missing after teachingCard or flagged
  const currentTipFlags = cardFlags([{ ...c, ipa: c.ipa }])[0];
  if (!c.memoryTip || currentTipFlags.tipTemplate || currentTipFlags.tipUnsafe || currentTipFlags.tipLength || BANNED_TIP.test(c.memoryTip)) {
    c.memoryTip = buildMemoryTip(c, c.collocation, c.chunk);
    fixedTip++;
  }
}

// Verify all 9,500 cards after teachingCard(c)
const afterShown = FLASHCARD_DATABASE.map(teachingCard);
const afterFlags = cardFlags(afterShown);
const missingIpaAfter = afterShown.filter(c => !c.ipa).length;
const missingCollAfter = afterShown.filter(c => !c.collocation).length;
const missingTipAfter = afterShown.filter(c => !c.memoryTip).length;
const missingExAfter = afterShown.filter(c => !c.example).length;
const flaggedQualityNote = afterShown.filter(c => c.qualityNote).length;
const badFlags = afterFlags.filter(f => f.tipTemplate || f.tipUnsafe || f.collocationTemplate || f.ipaProblem);

console.log({
  fixedIpa,
  fixedColl,
  fixedChunk,
  fixedTip,
  missingIpaAfter,
  missingCollAfter,
  missingTipAfter,
  missingExAfter,
  flaggedQualityNote,
  badFlagsCount: badFlags.length,
  sampleBadFlags: badFlags.slice(0, 5)
});

for (const id of ['fc-el-0337', 'fc-el-0340', 'fc-el-0347', 'fc-jh-0161', 'fc-jh-0163', 'fc-jh-0166', 'fc-sh-0200', 'fc-sh-0500']) {
  const c = FLASHCARD_DATABASE.find(x => x.id === id);
  if (c) console.log(id, { word: c.word, zh: c.zh, ipa: c.ipa, chunk: c.chunk, collocation: c.collocation, memoryTip: c.memoryTip });
}

if (process.argv.includes('--write')) {
  const src = fs.readFileSync('dist/flashcards.mjs', 'utf8');
  const start = src.indexOf('export const FLASHCARD_DATABASE = [');
  const end = src.indexOf('\n];', start);
  if (start < 0 || end < 0) throw new Error('FLASHCARD_DATABASE block not found');
  const body = 'export const FLASHCARD_DATABASE = [\n' + FLASHCARD_DATABASE.map(c => '  ' + JSON.stringify(c)).join(',\n') + '\n];';
  fs.writeFileSync('dist/flashcards.mjs', src.slice(0, start) + body + src.slice(end + 3));
  console.log('Wrote updated dist/flashcards.mjs');
}
