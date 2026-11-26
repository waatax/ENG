import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CATEGORY_META } from '../dist/question_db.mjs';

test('JH page fixes quiz category to valid jhs, removes duplicate hub on units tab, and adds semester filters + search', () => {
  const appJs = fs.readFileSync('dist/app.js', 'utf8');
  assert.ok(Object.hasOwn(CATEGORY_META, 'jhs'), 'questionDB must define jhs category');
  assert.ok(!appJs.includes('data-quiz-cat="cap"'), 'JH quiz buttons must never use invalid category "cap"');
  assert.match(appJs, /data-quiz-cat="jhs"/, 'JH quiz buttons must target valid category "jhs"');
  assert.match(appJs, /class="jh-readiness-strip"/, 'JH units tab renders focused readiness strip');
  assert.match(appJs, /id="jh-unit-search"/, 'JH units tab includes keyword search');
  assert.match(appJs, /data-jh-term=/, 'JH units tab includes semester filter pills');
  assert.ok(!appJs.includes("renderUltralearningMasteryHub({ forceStage: 'junior', compact: true })"), 'JH units tab should not duplicate the full Ultralearning hub');
});

test('Exam Arena upgrades dark-safe UI, question jump navigator, post-quiz summary, mistake drill, and real keyboard shortcuts', () => {
  const appJs = fs.readFileSync('dist/app.js', 'utf8');
  assert.match(appJs, /class="exam-q-nav"/, 'Exam Arena renders numbered question jump navigator');
  assert.match(appJs, /data-jump-quiz-q=/, 'Exam Arena supports direct jump to any question');
  assert.match(appJs, /class="exam-summary-banner/, 'Exam Arena renders post-quiz Ultralearning summary banner');
  assert.match(appJs, /data-retry-quiz-mistakes="true"/, 'Exam Arena offers Direct-to-Drill mistake re-test');
  assert.match(appJs, /class="exam-passage-box"/, 'Exam passages use theme-safe class instead of light-only inline style');
  assert.match(appJs, /class="exam-kbd-bar"/, 'Exam Arena displays keyboard shortcut bar');
  assert.ok(!appJs.includes('[data-quiz-choice="${idx}"]'), 'Broken [data-quiz-choice] exam shortcut selector must be replaced');
  assert.match(appJs, /\[data-quiz-answer="\$\{idx\}"\]/, 'Exam keyboard shortcuts target real [data-quiz-answer] buttons');
  assert.match(appJs, /setUltralearningStage\(stageMap\[quizCategory\]\)/, 'Changing exam category auto-syncs Ultralearning stage');
});

test('Home, Flashcards, and Ultralearning stylesheets support Light, Warm Sepia, Dark, and OS Dark modes cleanly', () => {
  const homeCss = fs.readFileSync('dist/home_experience.css', 'utf8');
  const fcCss = fs.readFileSync('dist/flashcard_studio.css', 'utf8');
  const ulCss = fs.readFileSync('dist/ultralearning_mastery.css', 'utf8');

  assert.match(homeCss, /:root\[data-theme=dark\] \.home-experience/, 'Home supports explicit dark theme');
  assert.match(homeCss, /:root\[data-theme=warm\] \.home-experience/, 'Home supports explicit warm sepia theme');
  assert.ok(!homeCss.includes('.home-picker-toggle{background:#fff;color:#193d3b}'), 'Home dark mode no longer renders white picker toggle box');

  assert.match(fcCss, /:root\[data-theme="warm"\] \.fcx/, 'Flashcard studio supports explicit warm sepia theme');
  assert.match(fcCss, /:root\[data-theme="dark"\] \.fcx/, 'Flashcard studio supports explicit dark theme');
  assert.match(fcCss, /@media \(prefers-color-scheme: dark\)/, 'Flashcard studio respects OS dark mode preference');

  assert.match(ulCss, /:root\[data-theme="warm"\]/, 'Ultralearning & Exam Arena stylesheet supports warm sepia theme');
  assert.match(ulCss, /:root\[data-theme="dark"\]/, 'Ultralearning & Exam Arena stylesheet supports explicit dark theme');
  assert.match(ulCss, /\.exam-passage-box/, 'Exam Arena passage styling defined');
  assert.match(ulCss, /\.jh-filter-bar/, 'JH filter bar styling defined');
});

test('Updated UI/UX assets maintain 100% byte parity between dist/ and site/dist/', () => {
  const files = [
    'app.js',
    'home_experience.css',
    'flashcard_studio.css',
    'ultralearning_mastery.css',
    'index.html',
    'quest/index.html',
    'start.mjs',
    'sw.js'
  ];
  for (const rel of files) {
    const a = fs.readFileSync(`dist/${rel}`);
    const b = fs.readFileSync(`site/dist/${rel}`);
    assert.ok(a.equals(b), `dist/${rel} and site/dist/${rel} must match byte-for-byte`);
  }
});
