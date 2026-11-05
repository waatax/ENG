# Wrong-option note brief

Each input item is a question from an English course for Taiwanese learners. Some wrong options have no explanation yet. Write one note per wrong option, in Traditional Chinese as used in Taiwan, saying why **that** option is wrong for **this** question.

Output one JSON object to data/option_notes/out/<file>.json, keyed by item id, then by the exact option text:

{"item-id": {"wrong option text": "note"}}

Include every option except the answer (even if a rule might already cover it). Each note is 15 to 70 characters and must be specific: name what the option says or does and why it fails, based only on the question, passage, and given answer. Examples: 「文章只說銷量上升，沒有提到利潤，這個選項超出原文。」「這個選項削弱了論點，題目問的是加強。」「M 和 n 是不同字母，n 是 N 的小寫，m 才是 M 的小寫。」

Never write a note that would fit any option, like 這個選項不對. If you think the listed answer is actually wrong, still write notes, and add the id to your final reply. Keep it suitable for children. Write in batches of about 50 items is not possible with one output file, so build the whole object and write it once, or use a throwaway script in the scratchpad to merge parts. Finish when `node scripts/check_option_notes.mjs <file>` prints OK. Reply in one line with the file name and OK, plus any suspect item ids.
