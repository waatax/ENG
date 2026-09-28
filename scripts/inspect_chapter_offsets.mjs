import fs from 'node:fs';

const txt = fs.readFileSync('dist/curriculum.mjs', 'utf8');
const toeicStart = txt.indexOf("id: 'toeic'");
const satStart = txt.indexOf("id: 'sat'");
const greStart = txt.indexOf("id: 'gre'");
const gmatStart = txt.indexOf("id: 'gmat'");
const toeflStart = txt.indexOf("id: 'toefl'");

console.log({ toeicStart, satStart, greStart, gmatStart, toeflStart });
