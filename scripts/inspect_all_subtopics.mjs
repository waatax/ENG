import fs from 'node:fs';

const toeic = JSON.parse(fs.readFileSync('dist/questions/toeic.json', 'utf8'));
const sat = JSON.parse(fs.readFileSync('dist/questions/sat.json', 'utf8'));

const toeicSubs = [...new Set(toeic.map(q => q.subtopic))];
console.log('All TOEIC Subtopics:');
toeicSubs.forEach(s => console.log(' -', s));

const satSubs = [...new Set(sat.map(q => q.subtopic))];
console.log('\nAll SAT Subtopics:');
satSubs.forEach(s => console.log(' -', s));
