import fs from 'node:fs';
const content = fs.readFileSync('dist/flashcards.mjs', 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('export function renderFlashcardsStudioView')) {
    console.log('renderFlashcardsStudioView is at line:', i + 1);
  }
  if (lines[i].includes('fcVoiceMode') || lines[i].includes('fc-voice-mode')) {
    console.log('Voice mode mention at line:', i + 1, lines[i].slice(0, 100));
  }
}
