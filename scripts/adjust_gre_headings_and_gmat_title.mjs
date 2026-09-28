import fs from 'node:fs';

// 1. Update GRE heading in dist/curriculum.mjs
const currPath = 'dist/curriculum.mjs';
let currContent = fs.readFileSync(currPath, 'utf8');

const oldGreH1 = "heading: '題型一・Text Completion: 單/雙/三空確定性錨點破題矩陣 (TC Deterministic Anchor Matrix)'";
const newGreH1 = "heading: '題型一・Text Completion 與 Sentence Equivalence 邏輯密碼 (TC & SE Logical Directionality)'";
const oldGreH2 = "heading: '題型二・Sentence Equivalence: 六選二孿生同義詞等價密碼 (SE Twin Synonyms & Equivalence)'";
const newGreH2 = "heading: '題型二・GRE Text Completion 雙空與三空「確定性錨點」破題矩陣 (Anchor Blank First Matrix)'";
const oldGreH3 = "heading: '題型三・Academic Reading Comprehension & Argument Analysis 翻案文架構與作者立場辨析 (Revisionist Structure & Epistemic Stance)'";
const newGreH3 = "heading: '題型三・GRE 學術長篇閱讀「翻案文」結構與作者認知立場 (Revisionist Structure & Epistemic Stance)'";

if (currContent.includes(oldGreH1)) {
  currContent = currContent.replace(oldGreH1, newGreH1);
}
if (currContent.includes(oldGreH2)) {
  currContent = currContent.replace(oldGreH2, newGreH2);
}
if (currContent.includes(oldGreH3)) {
  currContent = currContent.replace(oldGreH3, newGreH3);
}
fs.writeFileSync(currPath, currContent, 'utf8');
console.log('Updated GRE headings in dist/curriculum.mjs');

// 2. Update GMAT title in dist/lesson_pages.mjs
const pagesPath = 'dist/lesson_pages.mjs';
let pagesContent = fs.readFileSync(pagesPath, 'utf8');

const oldGmatTitle = "title: '⚖️ GMAT Focus 批判推理實戰演練專區'";
const newGmatTitle = "title: '⚖️ GMAT Focus 核心題型實戰演練專區'";

if (pagesContent.includes(oldGmatTitle)) {
  pagesContent = pagesContent.replace(oldGmatTitle, newGmatTitle);
}
fs.writeFileSync(pagesPath, pagesContent, 'utf8');
console.log('Updated GMAT title in dist/lesson_pages.mjs');
