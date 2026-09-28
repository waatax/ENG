import { curriculum } from '../dist/curriculum.mjs';

const intl = curriculum.find(t => t.id === 'intl');
for (const cid of ['toeic', 'sat', 'gre', 'gmat']) {
  const c = intl.chapters.find(ch => ch.id === cid);
  console.log(`\n=================== [${c.id}] ${c.title} ===================`);
  console.log(`Concepts (${c.concepts?.length || 0}):`);
  for (const cp of c.concepts || []) {
    console.log(`  - ${cp.heading}`);
  }
  console.log(`Vocab (${c.vocab?.length || 0}), Phrases (${c.phrases?.length || 0}), Dialogue (${c.dialogue?.length || 0})`);
}
