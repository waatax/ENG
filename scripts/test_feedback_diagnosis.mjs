// 2026-10-30 round 2: why-your-answer diagnosis, passage evidence, speech cleanup, read-aloud mode, unit phrasebook, repair stat.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCourse, createGame, isScored } from '../dist/quest/engine.mjs';
import { diagnose, evidenceFor, makeGlossary, errorFeedbackSpeechText, joinSpeech } from '../dist/quest/coach.mjs';
import { speakable } from '../dist/quest/sound.mjs';
import { unitLab, labView } from '../dist/quest/lab.mjs';

const dir = 'dist/quest/course/';
const read = f => JSON.parse(fs.readFileSync(dir + f, 'utf8'));
const index = read('index.json');
function loadCourse() { const c = createCourse(index); for (const t of [...index.sections, ...index.branches]) c.register(read(t.id + '.json')); c.register(read('stories.json')); c.register(read('vocab.json')); return c; }
const course = loadCourse();
const gloss = makeGlossary(course.items.values());
const memory = () => { const data = new Map(); return { getItem: k => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) }; };

test('verb, be, pronoun, article, preposition and relative-pronoun mistakes get the matching rule', () => {
  assert.match(diagnose({ type: 'choice', answer: 'goes' }, 'went'), /go 的過去式.*goes/);
  assert.match(diagnose({ type: 'choice', answer: 'played' }, 'playing'), /V-ing.*過去式/);
  assert.match(diagnose({ type: 'choice', answer: 'cats' }, 'cat'), /同一個字的不同形態/);
  assert.match(diagnose({ type: 'choice', answer: 'is' }, 'are'), /be 動詞.*he／she／it/);
  assert.match(diagnose({ type: 'choice', answer: 'He' }, 'She'), /對應前面提到的人/);
  assert.match(diagnose({ type: 'choice', answer: 'mine' }, 'my'), /位置/);
  assert.match(diagnose({ type: 'choice', answer: 'an' }, 'a'), /母音/);
  assert.match(diagnose({ type: 'choice', answer: 'on' }, 'in'), /星期／日期/);
  assert.match(diagnose({ type: 'choice', answer: 'who' }, 'which'), /關係代名詞/);
  assert.match(diagnose({ type: 'choice', answer: 'What' }, 'Who'), /疑問詞/);
  assert.match(diagnose({ type: 'choice', answer: 'are singing' }, 'is singing'), /只差一個字.*be 動詞/);
});

test('spelling, word order, multi-select and meaning choices point at the exact difference', () => {
  assert.match(diagnose({ type: 'input', answer: 'receive' }, 'recieve'), /拼字只差 2 個字母.*第 4 個字母/);
  assert.match(diagnose({ type: 'build', answer: 'My name is Mia' }, 'My is name Mia'), /第 2 個字開始不同.*「is」.*「name」/);
  assert.match(diagnose({ type: 'multi', correctAnswers: ['a', 'b'] }, 'a || c'), /多選了「c」.*漏選了「b」/);
  const g = { en: new Map([['night', '晚上'], ['morning', '早上']]), zh: new Map([['下午', 'afternoon'], ['早上', 'morning']]) };
  assert.match(diagnose({ type: 'listen', audio: 'Good morning, Amy.', answer: '早上' }, '下午', { gloss: g }), /afternoon.*關鍵字是 morning/);
  assert.match(diagnose({ type: 'choice', prompt: '早上見到老師，你會說？', answer: 'Good morning.' }, 'Good night.', { gloss: g }), /night」是「晚上.*morning」是「早上/);
});

test('reading answers cite the passage and distractors are explained without inventing reasons', () => {
  const it = { type: 'choice', passage: 'Hello! I’m Amy. I’m in Class 3A. This is my friend Ben. Ben is happy. Good morning, Ms. Lin!', prompt: 'Who is Amy’s friend?', answer: 'Ben.' };
  assert.equal(evidenceFor(it), 'This is my friend Ben.');
  assert.equal(evidenceFor({ ...it, prompt: 'Who does Amy say good morning to?', answer: 'Ms. Lin.' }), 'Good morning, Ms. Lin!');
  assert.match(diagnose(it, 'Ms. Lin.'), /Who 問的是「人」.*有出現，但不是/);
  assert.match(diagnose(it, 'She is five.'), /文章沒有提到/);
  // Inference answers are not in the text, so "not mentioned" would be false: stay silent.
  assert.equal(diagnose({ type: 'choice', passage: 'Prices rose after the storm.', prompt: 'What can be inferred?', answer: 'Supply fell.' }, 'Demand vanished.'), '');
  assert.equal(diagnose({ type: 'choice', answer: 'cat' }, 'dog'), '');
  assert.equal(diagnose({ type: 'match', answer: 'match' }, 'x'), '');
});

test('every wrong option in the course can be diagnosed safely, with honest coverage', () => {
  let total = 0, hit = 0, passages = 0, cited = 0;
  for (const it of course.items.values()) {
    if (!['choice', 'listen'].includes(it.type) || !it.options) continue;
    if (it.passage) { passages++; if (evidenceFor(it)) cited++; }
    for (const o of it.options) {
      if (o === it.answer) continue;
      total++;
      const d = diagnose(it, o, { gloss });
      assert.equal(typeof d, 'string');
      assert.ok(!/undefined|null|\[object/.test(d), `${it.id}: ${d}`);
      if (d) hit++;
    }
  }
  assert.ok(total > 20000, 'scan covers the whole course');
  assert.ok(hit / total > 0.35, `specific diagnosis coverage ${hit}/${total}`);
  assert.ok(cited / passages > 0.6, `passage evidence ${cited}/${passages}`);
  fs.mkdirSync('docs/redesign/verification/learn20261030', { recursive: true });
  fs.writeFileSync('docs/redesign/verification/learn20261030/diagnosis.json', JSON.stringify({ wrongOptions: total, specificDiagnosis: hit, coverage: +(hit / total).toFixed(3), passageItems: passages, evidenceCited: cited, glossary: gloss.en.size, note: 'Rule-based; uncovered options fall back to the item explanation and a generic correction tip.' }, null, 2) + '\n');
});

test('spoken feedback includes the diagnosis and evidence, and speech text is cleaned for the voice', () => {
  const s = errorFeedbackSpeechText({ type: 'choice', answer: 'goes', why: '主詞 He 是第三人稱單數。' }, 'went', { diagnosis: '「went」是過去式。', evidence: 'He goes to school.' });
  assert.match(s, /你剛才回答「went」.*正確答案是「goes」.*錯在哪裡？.*為什麼？.*原文線索：He goes/);
  assert.doesNotMatch(s, /先讀上方解析/, 'generic tip is dropped when a specific diagnosis exists');
  assert.equal(joinSpeech(['Where is it?', '選項 1：A']), 'Where is it? 選項 1：A');
  assert.equal(speakable('💡 He ___ to school every day.。選項'), 'He blank to school every day.選項');
});

test('read-aloud mode is opt-in, saved in the profile, and repairs that end correct are counted', () => {
  const g = createGame({ storage: memory(), course });
  g.setup({ goal: 'regular', start: 's1' });
  assert.equal(g.state.profile.readq, false);
  g.update({ readq: true });
  assert.equal(g.state.profile.readq, true);
  g.start('lesson', 'u1:q1');
  let missed = false, guard = 200;
  while (g.state.session && guard--) {
    const it = g.currentItem();
    if (isScored(it) && !g.state.session.feedback) g.submit(!missed && it.options ? (missed = true, it.options.find(o => o !== it.answer)) : it.type === 'match' ? 'matched' : it.answer);
    g.next();
  }
  assert.equal(g.result.repairs, 1);
  assert.equal(g.result.repairsFixed, 1);
});

test('all 141 units add a 10% phrasebook of real expressions from their own items', () => {
  let total = 0;
  for (const u of course.units.values()) {
    const lab = unitLab(course, u.id);
    assert.equal(lab.phrases.length, lab.cards.length, `${u.id} phrase count`);
    const pool = new Set(u.nodes.flatMap(n => course.nodes.get(n.id)?.pool || []));
    for (const p of lab.phrases) {
      assert.ok(pool.has(p.source), `${u.id}: ${p.source} comes from the unit`);
      assert.ok(p.en && !/[㐀-鿿]/.test(p.en) && !/undefined/.test(p.en + p.zh), `${u.id}: ${p.en}`);
    }
    total += lab.phrases.length;
    assert.match(labView(course, u.id), /本單元實用表達/);
  }
  assert.equal(total, 1483);
});

test('view wires diagnosis, evidence, read-aloud and the repair tile, and every changed module uses the new cache key', () => {
  const view = fs.readFileSync('dist/quest/view.mjs', 'utf8'), html = fs.readFileSync('dist/quest/index.html', 'utf8'), lab = fs.readFileSync('dist/quest/lab.mjs', 'utf8');
  for (const needle of ['class="diagnosis"', 'class="evidence"', 'data-set="readq"', 'readAloudOn()', 'tile fixed', 'repair-win']) assert.ok(view.includes(needle), needle);
  for (const mod of ['engine', 'sound', 'coach', 'lab']) assert.match(view, new RegExp(`${mod}\\.mjs\\?v=learn20261030`));
  assert.match(lab, /coach\.mjs\?v=learn20261030/);
  assert.match(html, /quest\.css\?v=learn20261030/);
  assert.match(html, /view\.mjs\?v=learn20261030/);
  assert.doesNotMatch(view + html + lab, /learn20261029/);
});
