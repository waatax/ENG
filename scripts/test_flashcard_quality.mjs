import test from 'node:test';
import assert from 'node:assert/strict';
import {teachingCard,qualityCounts} from '../dist/flashcard_quality.mjs';
import {FLASHCARD_DATABASE,renderFlashcardsStudioView,handleFlashcardEvents} from '../dist/flashcards.mjs';
test('Known generated templates cannot teach invented pronunciation or semantic filler',()=>{
 const flagged=FLASHCARD_DATABASE.filter(c=>teachingCard(c).qualityNote);
 for(const raw of flagged){const card=teachingCard(raw);assert.equal(card.id,raw.id);assert.equal(card.ipa,'');assert.equal(card.chunk,'');assert.equal(card.memoryTip,'');assert.ok(!card.example.includes('all relevant data before making a decision'));}
 for(const c of FLASHCARD_DATABASE.slice(0,50))assert.ok(teachingCard(c).example);
});
test('Flip is keyboard-operable and hidden faces cannot expose answers or controls',()=>{
 let html=renderFlashcardsStudioView();
 assert.match(html,/<button[^>]*data-fc-flip="true"[^>]*>翻卡/);
 assert.match(html,/fc-back" inert aria-hidden="true"/);
 handleFlashcardEvents({dataset:{fcFlip:'true'}},()=>{});
 html=renderFlashcardsStudioView();assert.match(html,/fc-front" inert aria-hidden="true"/);
});
