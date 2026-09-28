import fs from 'node:fs';

const content = fs.readFileSync('dist/lesson_workshops.mjs', 'utf8');
['toeic', 'sat', 'gre', 'gmat'].forEach(id => {
  const re = new RegExp(`\\b${id}:\\s*\\{`);
  const match = content.match(re);
  if (match) {
    const idx = match.index;
    console.log(`=== ${id} ===`);
    console.log(content.slice(idx, idx + 600));
  } else {
    console.log(`=== ${id} NOT FOUND ===`);
  }
});
