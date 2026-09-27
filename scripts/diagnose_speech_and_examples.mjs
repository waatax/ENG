import { FLASHCARD_DATABASE } from '../dist/flashcards.mjs';

console.log('Total cards:', FLASHCARD_DATABASE.length);

let notExactWord = [];

for (const card of FLASHCARD_DATABASE) {
  const w = card.word.trim();
  const ex = card.example || '';
  
  // Word boundary regex
  const escapedWord = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const wordRegex = new RegExp(`\\b${escapedWord}\\b`, 'i');
  
  if (!wordRegex.test(ex)) {
    notExactWord.push({ id: card.id, word: w, example: ex, exampleZh: card.exampleZh });
  }
}

console.log('Total cards missing EXACT word boundary:', notExactWord.length);
for (let i = 0; i < notExactWord.length; i++) {
  console.log(`${i + 1}. [${notExactWord[i].id}] "${notExactWord[i].word}": "${notExactWord[i].example}" // ${notExactWord[i].exampleZh}`);
}
