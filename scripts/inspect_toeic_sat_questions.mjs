import fs from 'node:fs';

const toeic = JSON.parse(fs.readFileSync('dist/questions/toeic.json', 'utf8'));
const sat = JSON.parse(fs.readFileSync('dist/questions/sat.json', 'utf8'));

console.log('TOEIC total questions:', toeic.length);
const toeicSubtopics = {};
for (const q of toeic) {
  const sub = q.subtopic || 'Unknown';
  toeicSubtopics[sub] = (toeicSubtopics[sub] || 0) + 1;
}
console.log('TOEIC Subtopics:');
console.log(Object.entries(toeicSubtopics).slice(0, 10));

console.log('\nSAT total questions:', sat.length);
const satSubtopics = {};
for (const q of sat) {
  const sub = q.subtopic || 'Unknown';
  satSubtopics[sub] = (satSubtopics[sub] || 0) + 1;
}
console.log('SAT Subtopics:');
console.log(Object.entries(satSubtopics).slice(0, 10));
