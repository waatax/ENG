import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createCourse} from '../dist/quest/engine.mjs';
import {unitLab, labView, unitClinic} from '../dist/quest/lab.mjs';
import {blankExample, extraCount, vocabularyPractice} from '../dist/extra_practice.mjs';
import {UNIFIED_GRADES} from '../dist/curriculum_unified.mjs';
import {curriculum} from '../dist/curriculum.mjs';
import {microLesson, teachingChapter} from '../dist/lesson_pages.mjs';
import {ADVANCED_UNITS} from '../dist/advanced_content.mjs';
import {renderAdvancedCourse} from '../dist/advanced_academy.mjs';
import {tracks as academyTracks} from '../dist/EN/content.mjs';

test('every Quest unit gains at least 5% more self-check activities', () => {
  const courseFile = id => JSON.parse(readFileSync(`dist/quest/course/${id}.json`, 'utf8'));
  const index = courseFile('index');
  const course = createCourse(index);
  for (const track of [...index.sections, ...index.branches]) course.register(courseFile(track.id));
  assert.equal(course.units.size, 141);
  for (const unit of course.units.values()) {
    const {baseline, extra} = unitLab(course, unit.id);
    const pool = new Set(unit.nodes.flatMap(node => course.nodes.get(node.id)?.pool || []));
    assert.equal(extra.length, extraCount(baseline), unit.id);
    assert.equal(new Set(extra.map(card => card.source)).size, extra.length, unit.id);
    for (const card of extra) {
      assert.ok(pool.has(card.source));
      assert.ok(card.prompt && card.answer && card.why);
      assert.doesNotMatch(card.answer + card.why, /undefined|\[object Object\]/);
    }
  }
  assert.match(labView(course, 'u1'), /extra-practice-answer/);
});

test('the clinic excludes every correct multi-select choice and reads editor notes by option', () => {
  const [one] = unitClinic([{id:'mc',type:'multi',options:['A','B','C'],correctAnswers:['A','B'],
    answer:'A || B',why:'A and B satisfy the condition.',wrong:{2:'C changes the condition.'}}]);
  assert.equal(one.trap, 'C');
  assert.equal(one.trapWhy, 'C changes the condition.');
});

test('textbook and advanced units expose supplementary practice through their normal routes', () => {
  const units = UNIFIED_GRADES.flatMap(grade => grade.semesters.flatMap(term => term.units));
  for (const unit of units) {
    const words = unit.phonicsVocab.map(v => ({word:v.word, meaning:v.zh, example:v.sentence}));
    assert.equal(vocabularyPractice(words, extraCount(words.length)).length, extraCount(words.length), unit.id);
    assert.match(microLesson(unit.id), /extra-practice-answer/, unit.id);
  }
  for (const track of curriculum) for (const chapter of track.chapters) {
    const words = chapter.vocab.map(v => ({word:v.word, meaning:v.def, example:v.example}));
    assert.equal(vocabularyPractice(words, extraCount(words.length)).length, extraCount(words.length), chapter.id);
    assert.match(teachingChapter(`${track.id}:${chapter.id}`), /extra-practice-answer/, chapter.id);
  }
  for (const unit of ADVANCED_UNITS) {
    const baseline = unit.checks.length + unit.transfer.length + Number(Boolean(unit.diagnosticCheck));
    assert.ok(1 / baseline >= .05, unit.id);
    assert.match(renderAdvancedCourse(`#advanced/${unit.id}`), /新情境：試著自己說一次/);
  }
});

test('every English Academy lesson can use its own definitions and sentences', () => {
  for (const lesson of academyTracks.flatMap(track => track.lessons)) {
    const words = lesson.words.map(([word, meaning, example]) => ({word, meaning, example}));
    const cards = vocabularyPractice(words, extraCount(words.length), 'en');
    assert.equal(cards.length, extraCount(words.length), lesson.title);
    assert.match(cards[0].why, /^The missing term/);
  }
});

test('cloze generation skips repeated exact targets and embedded words', () => {
  assert.equal(blankExample('The city grew.', 'city'), 'The _____ grew.');
  assert.equal(blankExample('The city grew, and CITY roads filled.', 'city'), '');
  assert.equal(blankExample('A cycling path connects the cities.', 'city'), '');
  assert.equal(blankExample('The city-level data are available.', 'city'), '');
});
