import { teachingChapter, renderExamDrillSuite, examDrillState, getExamDrillMeta } from '../dist/lesson_pages.mjs';

const exams = ['toeic', 'sat', 'gre', 'gmat'];

for (const examId of exams) {
  console.log(`\nTesting exam: ${examId}`);
  const meta = getExamDrillMeta(examId);
  if (!meta) throw new Error(`Meta for ${examId} missing!`);
  console.log(`Title: ${meta.title}, Types count: ${meta.types.length}`);

  const renderedSuite = renderExamDrillSuite(examId);
  if (!renderedSuite.includes('lesson-drill-suite')) {
    throw new Error(`Drill suite for ${examId} not rendered properly!`);
  }
  console.log(`renderExamDrillSuite length: ${renderedSuite.length}`);

  const chapterHtml = teachingChapter(`intl:${examId}`);
  if (!chapterHtml.includes('lesson-drill-suite')) {
    throw new Error(`teachingChapter(intl:${examId}) does not contain lesson-drill-suite!`);
  }
  console.log(`teachingChapter(intl:${examId}) includes drill suite!`);
}

console.log('\nALL 4 EXAM DRILL SUITES IN LESSON PAGES VERIFIED PERFECTLY!');
