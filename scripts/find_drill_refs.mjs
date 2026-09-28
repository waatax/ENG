import fs from 'node:fs';

const content = fs.readFileSync('dist/lesson_pages.mjs', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('renderExamDrillSuite') || l.includes('examDrillState') || l.includes('handleExamDrillClick') || l.includes('DRILL_TYPES')) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
