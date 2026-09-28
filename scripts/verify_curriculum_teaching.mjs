import { curriculum } from '../dist/curriculum.mjs';

const targetExams = ['toeic', 'sat', 'gre', 'gmat'];

for (const examId of targetExams) {
  const chapter = curriculum.flatMap(t => t.chapters).find(c => c.id === examId);
  if (!chapter) {
    throw new Error(`Chapter ${examId} not found!`);
  }
  console.log(`\n=== Exam: ${chapter.title} (${examId}) ===`);
  console.log(`Total concepts: ${chapter.concepts.length}`);

  const questionTypes = chapter.concepts.filter(c => c.heading.includes('題型') || c.heading.includes('Part') || c.heading.includes('Craft') || c.heading.includes('Text Completion') || c.heading.includes('CR '));
  console.log(`Question type concepts found: ${questionTypes.length}`);

  let hasStep0 = 0, hasTraps = 0, hasMasterDemo = 0;
  for (const c of chapter.concepts) {
    if (c.body.includes('步驟 0') || c.body.includes('步驟0')) hasStep0++;
    if (c.body.includes('致命陷阱') || c.body.includes('常見錯誤') || c.body.includes('陷阱')) hasTraps++;
    if (c.body.includes('大師經典示範') || c.body.includes('示範題') || c.body.includes('大師解剖')) hasMasterDemo++;
  }
  console.log(`Step 0 mindsets: ${hasStep0}, Traps: ${hasTraps}, Master demos: ${hasMasterDemo}`);
  if (questionTypes.length < 3) {
    throw new Error(`Exam ${examId} must have at least 3 question type teaching modules! Found: ${questionTypes.length}`);
  }
}
console.log('\nALL 4 EXAMS VERIFIED SUCCESSFULLY!');
