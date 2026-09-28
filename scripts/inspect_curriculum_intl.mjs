import fs from 'node:fs';

const content = fs.readFileSync('dist/curriculum.mjs', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'intl'") || lines[i].includes('id: "intl"')) {
    console.log(`Track intl at line: ${i + 1}`);
  }
  if (lines[i].includes("id: 'toeic'") || lines[i].includes('id: "toeic"')) {
    console.log(`Chapter toeic at line: ${i + 1}`);
  }
  if (lines[i].includes("id: 'sat'") || lines[i].includes('id: "sat"')) {
    console.log(`Chapter sat at line: ${i + 1}`);
  }
  if (lines[i].includes("id: 'gre'") || lines[i].includes('id: "gre"')) {
    console.log(`Chapter gre at line: ${i + 1}`);
  }
  if (lines[i].includes("id: 'gmat'") || lines[i].includes('id: "gmat"')) {
    console.log(`Chapter gmat at line: ${i + 1}`);
  }
}
