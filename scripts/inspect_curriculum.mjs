import { curriculum } from '../dist/curriculum.mjs';

for (const track of curriculum) {
  console.log(`Track: [${track.id}] ${track.title} (${track.chapters?.length || 0} chapters)`);
  for (const c of track.chapters || []) {
    console.log(`  Chapter: [${c.id}] ${c.num} ${c.title}`);
  }
}
