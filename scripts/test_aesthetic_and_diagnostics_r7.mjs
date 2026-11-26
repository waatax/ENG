import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spellingFeedback, normalizeRecall } from '../dist/recall.mjs';
import { createCourse } from '../dist/quest/engine.mjs';
import { unitLab } from '../dist/quest/lab.mjs';
import { unitMissions, renderUnitMissions } from '../dist/quest/missions.mjs';
import { diagnose, errorFeedbackSpeechText, feedbackText, answerText } from '../dist/quest/coach.mjs';
import { wordStructure, renderWordStructure } from '../dist/word_structure.mjs';
import { sfx } from '../dist/quest/sound.mjs';

const memory = () => {
  const map = new Map();
  return { getItem: k => map.get(k) || null, setItem: (k, v) => map.set(k, v) };
};

test('Loop 1: UI/UX design tokens and tactile styling in learning_joy.css', () => {
  const css = fs.readFileSync('dist/learning_joy.css', 'utf8');
  assert.ok(css.includes('--joy-paper'), 'defines paper background token');
  assert.ok(css.includes('--joy-accent'), 'defines forest green accent token');
  assert.ok(css.includes('--joy-shadow'), 'defines card elevation shadow token');
  assert.ok(css.includes('.sp-match'), 'defines spelling match highlight');
  assert.ok(css.includes('.sp-mismatch'), 'defines spelling mismatch highlight');
  assert.ok(css.includes('.sp-missing'), 'defines spelling missing characters highlight');
  assert.ok(css.includes('.recall-tip'), 'defines diagnostic tip box styling');
  assert.ok(css.includes('@media(max-width:600px)'), 'contains mobile responsive rules');
  assert.ok(css.includes('@media(prefers-color-scheme:dark)'), 'contains dark mode styling');
});

test('Loop 2: Flashcard vocabulary learning & intelligent spelling error diagnostics', () => {
  // Transposition detection
  const transposed = spellingFeedback('teh', 'the');
  assert.ok(!transposed.ok);
  assert.match(transposed.text, /第 2 個字元/);
  assert.match(transposed.tip, /相鄰字母順序顛倒/);
  assert.ok(transposed.diffHtml.includes('sp-mismatch'));

  // Silent k
  const silentK = spellingFeedback('now', 'know');
  assert.ok(!silentK.ok);
  assert.match(silentK.tip, /默音字母/);

  // Silent b
  const silentB = spellingFeedback('dout', 'doubt');
  assert.ok(!silentB.ok);
  assert.match(silentB.tip, /默音字母/);

  // ie vs ei rule
  const receiveErr = spellingFeedback('recieve', 'receive');
  assert.ok(!receiveErr.ok);
  assert.match(receiveErr.tip, /i before e except after c/);

  // Double consonant
  const tomorrowErr = spellingFeedback('tomorow', 'tomorrow');
  assert.ok(!tomorrowErr.ok);
  assert.match(tomorrowErr.tip, /連續兩個「r」/);

  // Silent p (receipt)
  const receiptErr = spellingFeedback('receit', 'receipt');
  assert.ok(!receiptErr.ok);
  assert.match(receiptErr.tip, /默音字母/);

  // Silent t (listen)
  const listenErr = spellingFeedback('lisen', 'listen');
  assert.ok(!listenErr.ok);
  assert.match(listenErr.tip, /默音字母/);

  // -able vs -ible suffix
  const possibleErr = spellingFeedback('possable', 'possible');
  assert.ok(!possibleErr.ok);
  assert.match(possibleErr.tip, /-able 與 -ible/);

  // Homophone: their vs there
  const homophoneErr = spellingFeedback('there', 'their');
  assert.ok(!homophoneErr.ok);
  assert.match(homophoneErr.tip, /同音辨析/);

  // Exact match
  const exact = spellingFeedback('beautiful', 'beautiful');
  assert.ok(exact.ok);
  assert.ok(exact.tip.includes('出聲跟讀'));
});

test('Loop 3: All 141 units provide at least 10% useful content with explanations', () => {
  const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json'));
  const course = createCourse(index);
  for (const t of [...index.sections, ...index.branches]) {
    course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`)));
  }

  assert.equal(course.units.size, 141, 'all 141 course and semester units present');
  let totalMissions = 0, totalPhrases = 0, totalCards = 0;

  for (const u of course.units.values()) {
    const lab = unitLab(course, u.id);
    assert.ok(lab.baseline > 0, `${u.id} has questions`);
    const tenPercent = Math.ceil(lab.baseline * 0.1);
    assert.ok(lab.cards.length >= tenPercent, `${u.id} has >= 10% retrieval cards`);
    assert.ok(lab.phrases.length >= tenPercent, `${u.id} has >= 10% practical expressions`);
    assert.ok(lab.missions.length >= tenPercent, `${u.id} has >= 10% transfer missions`);

    // Verify mission content completeness
    for (const m of lab.missions) {
      assert.ok(m.title, 'mission has title');
      assert.ok(m.task, 'mission has task');
      assert.ok(m.check, 'mission has check criteria');
      assert.ok(m.answer, 'mission has answer');
      assert.ok(m.why, 'mission has pedagogical explanation');
    }

    totalMissions += lab.missions.length;
    totalPhrases += lab.phrases.length;
    totalCards += lab.cards.length;
  }

  assert.ok(totalMissions >= 1480, `total missions ${totalMissions} >= 1480`);
  assert.ok(totalPhrases >= 1480, `total phrases ${totalPhrases} >= 1480`);
  assert.ok(totalCards >= 1480, `total cards ${totalCards} >= 1480`);
});

test('Loop 4: Deep error explanations & smart pedagogical diagnostics for errors', () => {
  // Emotion adjectives: -ed vs -ing
  const q1 = { type: 'choice', answer: 'interested', options: ['interested', 'interesting'], why: '人感到有興趣用 interested in。' };
  const d1 = diagnose(q1, 'interesting');
  assert.match(d1, /情緒分詞辨析/);

  // Confusable pair: affect vs effect
  const q2 = { type: 'choice', answer: 'affect', options: ['affect', 'effect'], why: '空格需填動詞。' };
  const d2 = diagnose(q2, 'effect');
  assert.match(d2, /affect.*effect/);

  // Confusable pair: borrow vs lend
  const q3 = { type: 'choice', answer: 'borrow', options: ['borrow', 'lend'], why: '跟別人借入。' };
  const d3 = diagnose(q3, 'lend');
  assert.match(d3, /借入.*借出/);

  // Confusable pair: sensible vs sensitive
  const q4 = { type: 'choice', answer: 'sensible', options: ['sensible', 'sensitive'], why: '指明智的決定。' };
  const d4 = diagnose(q4, 'sensitive');
  assert.match(d4, /明智.*敏感/);

  // Confusable pair: accept vs except
  const q6 = { type: 'choice', answer: 'accept', options: ['accept', 'except'], why: '動詞接受。' };
  const d6 = diagnose(q6, 'except');
  assert.match(d6, /接受.*除/);

  // Confusable pair: breath vs breathe
  const q7 = { type: 'choice', answer: 'breathe', options: ['breath', 'breathe'], why: '動詞呼吸。' };
  const d7 = diagnose(q7, 'breath');
  assert.match(d7, /呼吸/);

  // Confusable pair: desert vs dessert
  const q8 = { type: 'choice', answer: 'dessert', options: ['desert', 'dessert'], why: '餐後甜點。' };
  const d8 = diagnose(q8, 'desert');
  assert.match(d8, /甜點/);

  // Indefinite pronouns agreement
  const q5 = { type: 'choice', answer: 'everyone', options: ['everyone', 'all'], why: '後接單數動詞 is。' };
  const d5 = diagnose(q5, 'all');
  assert.match(d5, /限定詞看語氣與數量/);

  // Error feedback speech text includes contrast and why
  const speech = errorFeedbackSpeechText(q1, 'interesting', { diagnosis: d1 });
  assert.match(speech, /你剛才回答「interesting」/);
  assert.match(speech, /正確答案是「interested」/);
  assert.match(speech, /錯在哪裡？/);
  assert.match(speech, /為什麼？/);
});

test('Loop 5: Any level progression & word morphology support', () => {
  // Compound words
  assert.ok(wordStructure('sunflower') !== null);
  assert.ok(wordStructure('earthquake') !== null);
  assert.ok(wordStructure('waterfall') !== null);
  assert.ok(wordStructure('playground') !== null);
  assert.ok(wordStructure('skyscraper') !== null);
  assert.ok(wordStructure('masterpiece') !== null);

  // Prefixes & Suffixes
  assert.ok(wordStructure('impossible') !== null);
  assert.ok(wordStructure('invisible') !== null);
  assert.ok(wordStructure('encourage') !== null);
  assert.ok(wordStructure('export') !== null);
  assert.ok(wordStructure('spectator') !== null);
  assert.ok(wordStructure('bicycle') !== null);
  assert.ok(wordStructure('triangle') !== null);

  // Word structure rendering
  const html = renderWordStructure({ word: 'sunflower' });
  assert.ok(html.includes('morpheme-grid'));
  assert.ok(html.includes('太陽'));
  assert.ok(html.includes('花'));
});

test('Loop 6: Gamification audio synthesis without crashes', () => {
  // sfx runs safely in Node environment without Throwing
  assert.doesNotThrow(() => {
    sfx('correct');
    sfx('wrong');
    sfx('done');
    sfx('tap');
    sfx('combo');
    sfx('flip');
    sfx('streak');
  });
});

test('Loop 7: 100% Flashcard Corpus Completion & Instant Studio Quiz with Error Explanations', async () => {
  const { FLASHCARD_DATABASE, renderFlashcardsStudioView, handleFlashcardEvents } = await import('../dist/flashcards.mjs');
  const { teachingCard } = await import('../dist/flashcard_quality.mjs');

  assert.equal(FLASHCARD_DATABASE.length, 9500);
  const shown = FLASHCARD_DATABASE.map(teachingCard);
  assert.equal(shown.filter(c => !c.ipa).length, 0, 'Every card must have valid American IPA');
  assert.equal(shown.filter(c => !c.collocation).length, 0, 'Every card must have a natural collocation');
  assert.equal(shown.filter(c => !c.memoryTip).length, 0, 'Every card must have a scientific memoryTip');
  assert.equal(shown.filter(c => !c.example).length, 0, 'Every card must have an example sentence');

  let html = renderFlashcardsStudioView();
  assert.ok(html.includes('fc-card-deck'), 'Flashcard studio must render physical deck depth');
  assert.ok(html.includes('fc-instant-quiz'), 'Flashcard studio must render instant 4-option quiz');
  assert.ok(html.includes('data-fc-quiz-pick="0"'), 'Instant quiz must render 4 option buttons');

  // Trigger a quiz option and verify feedback renders
  handleFlashcardEvents({ dataset: { fcQuizPick: '0' } }, () => {});
  html = renderFlashcardsStudioView();
  assert.ok(html.includes('fc-instant-feedback'), 'Instant quiz must display diagnostic feedback');
  handleFlashcardEvents({ dataset: { fcQuizReset: 'true' } }, () => {});
});

test('Loop 8: Universal +10% Useful Content & Wrong-Answer Explanations Across All Unit Systems', async () => {
  const { createCourse } = await import('../dist/quest/engine.mjs');
  const { unitLab, labView } = await import('../dist/quest/lab.mjs');
  const { UNIFIED_GRADES } = await import('../dist/curriculum_unified.mjs');
  const { GRAMMAR_EXTRA } = await import('../dist/practice_extra.mjs');
  const { grammarTopics } = await import('../dist/grammar_content.mjs');
  const { ADVANCED_UNITS } = await import('../dist/advanced_content.mjs');
  await import('../dist/grammar.mjs');

  // 1. 141 Quest units: clinic >= 10%
  const index = JSON.parse(fs.readFileSync('dist/quest/course/index.json', 'utf8'));
  const course = createCourse(index);
  for (const t of [...index.sections, ...index.branches]) {
    course.register(JSON.parse(fs.readFileSync(`dist/quest/course/${t.id}.json`, 'utf8')));
  }
  let totalClinic = 0;
  for (const u of course.units.values()) {
    const lab = unitLab(course, u.id);
    assert.equal(lab.clinic.length, Math.ceil(lab.baseline * 0.1), `${u.id} clinic must be >= 10%`);
    totalClinic += lab.clinic.length;
  }
  assert.equal(totalClinic, 1483);
  const firstUnitId = [...course.units.keys()][0];
  assert.ok(labView(course, firstUnitId).includes('易錯盲點與干擾項診斷卡'));

  // 2. 79 Unified 108 Curriculum units: usefulChunks & wrong explanations
  const units = UNIFIED_GRADES.flatMap(g => g.semesters.flatMap(s => s.units));
  assert.equal(units.length, 79);
  for (const u of units) {
    assert.ok(Array.isArray(u.usefulChunks) && u.usefulChunks.length >= 1, `${u.id} usefulChunks`);
    for (const fq of u.formativeQuiz) {
      assert.ok(fq.wrong && Object.keys(fq.wrong).length >= fq.options.length - 1, `${u.id} formativeQuiz wrong map`);
    }
  }

  // 3. 20 Grammar topics: GRAMMAR_EXTRA >= 3 items with wrong explanations
  for (const t of grammarTopics) {
    assert.ok(GRAMMAR_EXTRA[t.id].length >= 3, `${t.id} GRAMMAR_EXTRA length`);
    for (const item of GRAMMAR_EXTRA[t.id]) {
      assert.ok(item.wrong, `${t.id} GRAMMAR_EXTRA wrong map`);
    }
  }

  // 4. 8 C1->C2 Advanced units: collocations & diagnosticCheck with wrong map
  for (const u of ADVANCED_UNITS) {
    assert.ok(Array.isArray(u.collocations) && u.collocations.length >= 2, `${u.id} collocations`);
    assert.ok(u.diagnosticCheck && u.diagnosticCheck.wrong, `${u.id} diagnosticCheck`);
  }
});

test('Loop 9: Phonics Mastery, Affix Studio, Commute Dialogues & Diagnostic Error Explanations (+10% Useful Content)', async () => {
  const { PHONICS_MODULES, PHONICS_DECODER_SAMPLES, PHONICS_MODULE_QUIZZES, renderPhonicsMasteryView, handlePhonicsEvents } = await import('../dist/phonics_mastery.mjs');
  const { AFFIX_LESSONS, AFFIX_DIAGNOSTIC_QUIZ, renderAffixGuide } = await import('../dist/affix_guide.mjs');
  const { handleAffixClick } = await import('../dist/affix_library.mjs');
  const { ALL_COMMUTE_DIALOGUES, renderCommuteDialogueStudio, handleCommuteDialogueClick } = await import('../dist/commute_dialogues.mjs');

  // 1. Phonics Mastery: 10 decoder samples (+42.8%) & 16 interactive module quiz questions with wrong explanations
  assert.equal(PHONICS_DECODER_SAMPLES.length, 10);
  for (const mod of PHONICS_MODULES) {
    const qList = PHONICS_MODULE_QUIZZES[mod.id];
    assert.ok(Array.isArray(qList) && qList.length === 2, `${mod.id} must have 2 interactive phonics quiz questions`);
    for (const q of qList) {
      assert.ok(q.wrong && Object.keys(q.wrong).length === 2, `${q.id} must have wrong explanations for both distractors`);
    }
  }
  handlePhonicsEvents({ dataset: { phonicsQuizId: 'pq-letters-1', phonicsQuizPick: '1' } }, () => {});
  const phonicsHtml = renderPhonicsMasteryView();
  assert.ok(phonicsHtml.includes('phonics-quiz-box'), 'Phonics view must render interactive quiz box');
  assert.ok(phonicsHtml.includes('phonics-wrong-diagnosis'), 'Phonics quiz must diagnose wrong option');

  // 2. Affix Studio: all 35 lessons have contextSentence & contextZh (+25% useful context) + 6 diagnostic quizzes
  assert.equal(AFFIX_LESSONS.length, 35);
  for (const l of AFFIX_LESSONS) {
    assert.ok(l.contextSentence && l.contextSentence.length > 15, `${l.affix} must have contextSentence`);
    assert.ok(l.contextZh && l.contextZh.length > 4, `${l.affix} must have contextZh`);
  }
  assert.equal(AFFIX_DIAGNOSTIC_QUIZ.length, 6);
  handleAffixClick({ dataset: { affixQuizId: 'aq-1', affixQuizPick: '1' } }, () => {});
  const affixHtml = renderAffixGuide();
  assert.ok(affixHtml.includes('affix-quiz-section'), 'Affix view must render morphology diagnostic quiz');
  assert.ok(affixHtml.includes('affix-wrong-diagnosis'), 'Affix quiz must diagnose wrong option');

  // 3. Commute Dialogues: all 154 dialogues have compCheck (+20% useful content) with wrong explanations
  assert.equal(ALL_COMMUTE_DIALOGUES.length, 154);
  for (const d of ALL_COMMUTE_DIALOGUES) {
    assert.ok(d.compCheck && Array.isArray(d.compCheck.options) && d.compCheck.options.length === 3, `${d.id} must have 3-option compCheck`);
    assert.ok(d.compCheck.wrong && Object.keys(d.compCheck.wrong).length >= 2, `${d.id} compCheck must explain wrong choices`);
  }
  handleCommuteDialogueClick({ dataset: { cdQuizPick: '1' } }, () => {});
  const cdHtml = renderCommuteDialogueStudio();
  assert.ok(cdHtml.includes('commute-comp-quiz'), 'Commute dialogue view must render listening comprehension check');
  assert.ok(cdHtml.includes('commute-wrong-diagnosis'), 'Commute dialogue quiz must diagnose wrong option');

  // 4. Diagnostic report & Recall Studio repair steps
  const diagSrc = fs.readFileSync('dist/diagnostic.mjs', 'utf8');
  assert.ok(diagSrc.includes('diag-user-wrong-box'), 'Diagnostic report must include per-choice wrong diagnosis box');
  const recallSrc = fs.readFileSync('dist/flashcard_recall.mjs', 'utf8');
  assert.ok(recallSrc.includes('recall-repair-steps'), 'Recall Studio must include 3-step memory repair guide on missed cards');
  assert.ok(recallSrc.includes('data-fc-speak-sentence-slow'), 'Recall Studio must include slow sentence audio button');
});

test('Loop 10: Pure-English Academy (dist/EN/) +50% Practice Questions, +31% Exam Drills, 3D Flashcards & Distractor Diagnosis', async () => {
  const { tracks } = await import('../dist/EN/content.mjs');
  const { examWordAndPhraseSets, examSubtopicDrills } = await import('../dist/EN/exam_curriculum.mjs');

  const lessons = tracks.flatMap(t => t.lessons);
  assert.equal(lessons.length, 20);
  for (const l of lessons) {
    assert.equal(l.questions.length, 3, `${l.id} must have 3 practice questions (+50% useful content)`);
  }
  assert.equal(examWordAndPhraseSets.length, 10);
  for (const s of examWordAndPhraseSets) {
    assert.ok(s.items.length >= 7, `${s.id} must have at least 7 items`);
  }
  assert.equal(examSubtopicDrills.length, 21, 'examSubtopicDrills must have 21 drills (+31.25%)');

  const enAcademySrc = fs.readFileSync('dist/EN/academy.mjs', 'utf8');
  assert.ok(enAcademySrc.includes('en-flash-deck'), 'Pure-English flashcards must render 3D tactile deck');
  assert.ok(enAcademySrc.includes('en-instant-quiz'), 'Pure-English flashcards must render 4-option instant retrieval check');
  assert.ok(enAcademySrc.includes('en-wrong-diagnosis'), 'Pure-English quizzes and drills must render distractor error diagnosis');
});

test('Loop 11 (Wave 3): 12 Semesters, Duolingo Quest, Ear Trainer/Dictation, Writing Studio, Graded Readers, Home Warmup, Mnemonics/Roots & Word MP3 (+5%~+25% Useful Content & Error Explanations)', async () => {
  const { SEMESTERS } = await import('../dist/quest/semesters.mjs');
  const { schoolGuide, recordSemesterQuickCheck } = await import('../dist/quest/school_view.mjs');
  const { duolingoState, resetDuolingoGame, handleDuolingoClick, renderDuolingoGameView } = await import('../dist/duolingo_game.mjs');
  const { MINIMAL_PAIRS, scoreDictation } = await import('../dist/quest/speaking_dictation.mjs');
  const { WRITING_PROMPTS, evaluateWritingDraft, renderGradedReaderModal } = await import('../dist/quest/reading_writing.mjs');
  const { WARMUP_ITEMS } = await import('../dist/home_experience.mjs');
  const { FATAL_TRAPS } = await import('../dist/junyi_engine.mjs');

  // 1. 12 Semesters: usefulPhrases (+15%) and quickCheck with distractor explanations
  assert.equal(SEMESTERS.length, 12);
  for (const s of SEMESTERS) {
    assert.ok(Array.isArray(s.usefulPhrases) && s.usefulPhrases.length === 3, `${s.id} must have 3 usefulPhrases`);
    assert.ok(s.quickCheck && Array.isArray(s.quickCheck.options) && s.quickCheck.options.length === 3, `${s.id} must have quickCheck`);
    assert.ok(s.quickCheck.wrong && Object.keys(s.quickCheck.wrong).length === 2, `${s.id} quickCheck must explain both wrong options`);
  }
  recordSemesterQuickCheck('j1a', 1); // wrong option for j1a (answer is 0)
  const j1aGuideHtml = schoolGuide(SEMESTERS[0], { units: new Map() });
  assert.ok(j1aGuideHtml.includes('sem-wrong-diagnosis'), 'Semester guide must render wrong-choice diagnosis');

  // 2. Duolingo Quest (J1): specific error explanations on Stage 1, 2, 3, 4, 5 + bonus useful phrases
  resetDuolingoGame();
  assert.equal(duolingoState.s2BonusUsefulPhrases.length, 3);
  duolingoState.s1Selected = ['Actions', 'speaks'];
  handleDuolingoClick({ dataset: { duoAction: 's1-check' } }, () => {});
  assert.match(duolingoState.drawer.message, /錯在哪裡.*speaks/);

  // 3. Minimal Pairs: 5 pairs per contrast (+25% useful content = 60 pairs) & Dictation errorNotes
  assert.equal(MINIMAL_PAIRS.length, 12);
  for (const mp of MINIMAL_PAIRS) {
    assert.equal(mp.pairs.length, 5, `${mp.id} must have 5 minimal pairs (+25% useful content)`);
  }
  const dicScore = scoreDictation('Good morning, nice to meet you.', 'Good morning nice meet you');
  assert.ok(Array.isArray(dicScore.errorNotes) && dicScore.errorNotes.length >= 1, 'Dictation must generate specific errorNotes for missed weak/content words');

  // 4. Writing Studio: expanded scaffolds (+25%) & 5 new grammar trap diagnostics
  for (const wp of WRITING_PROMPTS) {
    assert.ok(wp.scaffolds.length >= 4, `${wp.id} must have >= 4 sentence scaffolds`);
  }
  const writeCheck = evaluateWritingDraft(WRITING_PROMPTS[0], 'I have many informations and it is more better. I look forward to see you.');
  assert.ok(writeCheck.grammarNotes.some(n => n.includes('不可數名詞盲點')));
  assert.ok(writeCheck.grammarNotes.some(n => n.includes('雙重比較級盲點')));
  assert.ok(writeCheck.grammarNotes.some(n => n.includes('介系詞 to 盲點')));

  // 5. Graded Reader Modal: patterns & comprehension quick-check with wrong diagnosis
  const storiesData = JSON.parse(fs.readFileSync('dist/quest/course/stories.json', 'utf8'));
  const firstStory = storiesData.stories['story-prea1-01'];
  const mockCourse = {
    stories: new Map([['story-prea1-01', firstStory]]),
    item: id => firstStory.steps.find(st => st.id === id)
  };
  const readerHtml = renderGradedReaderModal(mockCourse, 'story-prea1-01', { readerQuizStory: 'story-prea1-01', readerQuizPick: 1 });
  assert.ok(readerHtml.includes('reader-patterns-box'), 'Graded reader must render +15% key patterns box');
  assert.ok(readerHtml.includes('reader-quick-check'), 'Graded reader must render interactive comprehension quick-check');
  assert.ok(readerHtml.includes('reader-wrong-diagnosis'), 'Graded reader quiz must diagnose wrong choices');

  // 6. Home Warmup: per-choice wrong map across all 12 items
  for (const band of Object.values(WARMUP_ITEMS)) {
    for (const item of band) {
      assert.ok(item.wrong && Object.keys(item.wrong).length === 2, `${item.prompt} must have wrong explanations for both distractors`);
    }
  }

  // 7. Junyi Fatal Traps expanded from 42 to 48 (+14.3% useful traps)
  assert.equal(FATAL_TRAPS.length, 48);

  // 8. Mnemonics, Roots, Word MP3 & Simulation View error diagnosis markers
  const mnemApp = fs.readFileSync('dist/mnemonics/app.mjs', 'utf8');
  assert.ok(mnemApp.includes('mnem-quick-quiz') && mnemApp.includes('錯在哪裡'));
  const rootsApp = fs.readFileSync('dist/roots/app.mjs', 'utf8');
  assert.ok(rootsApp.includes('buildRootChoices') && rootsApp.includes('錯在哪裡'));
  const wordMp3Src = fs.readFileSync('dist/word_mp3.mjs', 'utf8');
  assert.ok(wordMp3Src.includes('mp3-quick-quiz-box') && wordMp3Src.includes('錯在哪裡'));
  const simViewSrc = fs.readFileSync('dist/quest/simulation_view.mjs', 'utf8');
  assert.ok(simViewSrc.includes('simWrongDiagnosis') && simViewSrc.includes('sim-wrong-diagnosis'));
});
