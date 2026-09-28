import fs from 'node:fs';
import path from 'node:path';

const filesToSync = [
  'exam_drill_data.mjs',
  'lesson_visuals.mjs',
  'curriculum.mjs',
  'lesson_pages.mjs'
];

for (const file of filesToSync) {
  const src = path.join('dist', file);
  const dest = path.join('site', 'dist', file);

  const srcBuf = fs.readFileSync(src);
  fs.writeFileSync(dest, srcBuf);

  const destBuf = fs.readFileSync(dest);
  if (srcBuf.compare(destBuf) !== 0) {
    throw new Error(`Sync parity failed for ${file}`);
  }
  console.log(`Synced ${file}: ${srcBuf.length} bytes (100% parity verified)`);
}

console.log('All files synced to site/dist/ successfully!');
