import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createCourse } from '../dist/quest/engine.mjs';
import { unitLab, labView } from '../dist/quest/lab.mjs';
import { answerText, feedbackText, questionText, questionAndOptionsText, errorFeedbackSpeechText } from '../dist/quest/coach.mjs';
import * as sound from '../dist/quest/sound.mjs';

const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
const course = createCourse(index);
for (const t of [...index.sections, ...index.branches]) {
  course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
}

test('all 141 course and semester units have >= 10% useful contents with tips, checks, and audio walkthrough', () => {
  assert.equal(course.units.size, 141, 'Must have exactly 141 units across all tracks and semesters');
  let totalCards = 0;
  for (const u of course.units.values()) {
    const lab = unitLab(course, u.id);
    assert.ok(lab.baseline > 0, `Baseline for unit ${u.id} must be > 0`);
    assert.equal(lab.cards.length, Math.ceil(lab.baseline * 0.1), `Unit ${u.id} must have ceil(baseline * 0.1) cards`);
    totalCards += lab.cards.length;
    for (const c of lab.cards) {
      assert.ok(c.title && c.recall && c.transfer && c.check && c.tip, `Card in ${u.id} must have title, recall, transfer, check, and tip`);
      assert.ok(c.answer && c.why, `Card in ${u.id} must have answer and why`);
      assert.ok(!/undefined|\[object Object\]/.test(c.answer), `Card answer must be clean string in ${u.id}`);
      assert.ok(!/undefined|\[object Object\]/.test(c.why), `Card why must be clean string in ${u.id}`);
    }
    const html = labView(course, u.id);
    assert.match(html, /10% 實用內容擴充/);
    assert.match(html, /語音導讀（題＋答＋解）/);
    assert.match(html, /非新增計分題/);
  }
  assert.ok(totalCards >= 1483, `Total added useful cards (${totalCards}) must be >= 1483`);
});

test('question speech and question+options speech text formats accurately for voice narration', () => {
  const qChoice = {
    prompt: '請選出正確的動詞',
    text: 'He ___ to school every day.',
    options: ['go', 'goes', 'going', 'went']
  };
  assert.equal(questionText(qChoice), '請選出正確的動詞。He ___ to school every day.');
  assert.equal(questionAndOptionsText(qChoice), '請選出正確的動詞。He ___ to school every day.。選項 1：go。選項 2：goes。選項 3：going。選項 4：went');

  const qListen = {
    type: 'listen',
    prompt: '聽句子並選出意思',
    audio: 'Where is the library?'
  };
  assert.equal(questionText(qListen), '聽句子並選出意思。Where is the library?');
});

test('error feedback speech text provides clear contrast, correct answer and formative why explanation', () => {
  const item = {
    type: 'choice',
    prompt: '選出正確動詞',
    answer: 'goes',
    why: '第三人稱單數現在式動詞需加 es。'
  };
  const speech = errorFeedbackSpeechText(item, 'go');
  assert.match(speech, /你剛才回答「go」/);
  assert.match(speech, /正確答案是「goes」/);
  assert.match(speech, /第三人稱單數現在式/);
  assert.match(speech, /先讀上方解析/);
});

test('view and CSS contain required gamification, option audio buttons, and question speech buttons', () => {
  const viewSrc = fs.readFileSync('dist/quest/view.mjs', 'utf8');
  assert.match(viewSrc, /speech-question-options-btn/);
  assert.match(viewSrc, /opt-say/);
  assert.match(viewSrc, /question-all-say/);
  assert.match(viewSrc, /question-say/);
  assert.match(viewSrc, /pop-sub-actions/);
  assert.match(viewSrc, /correct-answer-banner/);

  const cssSrc = fs.readFileSync('dist/quest/quest.css', 'utf8');
  assert.match(cssSrc, /\.speech-question-options-btn/);
  assert.match(cssSrc, /\.opt-say/);
  assert.match(cssSrc, /\.correct-answer-banner/);
});
