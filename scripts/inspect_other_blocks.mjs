import fs from 'node:fs';

const txt = fs.readFileSync('dist/curriculum.mjs', 'utf8');
const satStart = txt.indexOf("id: 'sat'");
const greStart = txt.indexOf("id: 'gre'");

console.log('=== SAT ===');
console.log(txt.slice(satStart, greStart - 10));
