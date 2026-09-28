import fs from 'node:fs';

const content = fs.readFileSync('dist/curriculum.mjs', 'utf8');
const greStart = content.indexOf("id: 'gre'");
const greEnd = content.indexOf("vocab:", greStart);
console.log(content.slice(greStart, greEnd));
