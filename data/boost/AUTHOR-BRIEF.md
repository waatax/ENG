# 單元加油站 author brief

English Quest teaches English to Taiwanese learners of every level, from first greetings to GMAT. Each unit needs **new** practice that helps a learner use what the unit teaches. You are writing that practice. Every wrong answer must teach something, so the explanations matter as much as the questions.

## Input

A JSON file `data/boost/briefs/gNN.json`: a list of units with `unit`, `title`, `level`, `track`, `target` (how many items to write), and `samples` (existing questions). Read the samples to learn the topic and difficulty. Do not copy them: use new sentences, new situations, and new contexts.

## Output

For each unit, use the Write tool to create `dist/quest/boost/<unit>.json`: a JSON array with at least `target` items. Write each unit in one call. After each group of units, run `node scripts/check_boost.mjs gNN` and fix what it reports. Finish when it prints `OK`. Touch no other files.

```json
{
  "id": "<unit>.b1",
  "type": "fix",
  "prompt": "哪一句才是正確的英文？",
  "text": "",
  "options": ["She go to school every day.", "She goes to school every day.", "She going to school every day."],
  "answer": "She goes to school every day.",
  "wrong": {
    "She go to school every day.": "主詞 she 是第三人稱單數，現在式動詞要加 -es，不能用原形 go。",
    "She going to school every day.": "少了 be 動詞；going 不能單獨當句子的動詞，而且 every day 表示習慣，要用現在簡單式。"
  },
  "why": "every day 表示習慣，用現在簡單式；主詞 she 搭配 goes。",
  "tip": "he／she／it 當主詞，現在式動詞記得加 s。",
  "say": "She goes to school every day."
}
```

## Fields

- `id`: `<unit>.b1`, `.b2`, and so on.
- `type`, mixed across each unit:
  - `fix`: pick the correct sentence, targeting a mistake Taiwanese learners really make (Mandarin-influenced word order, missing articles, tense, confusing pairs).
  - `situation`: a real-life situation in Chinese, then which English fits best. Wrong options should be understandable but unnatural or wrong for the situation.
  - `cloze`: a new sentence with `_____` in `text` (or `prompt`), for a word or structure from the unit.
  - `meaning`: what an English sentence or word means in context, or which reading of a passage line holds. Options may be Chinese.
- `prompt`: short instruction or question in Traditional Chinese. English is fine at exam level.
- `options`: 3 or 4 plausible choices. The answer must be one exact string from `options`. Exactly one must be defensibly correct.
- `wrong`: one note per wrong option, keyed by the exact option text, in Traditional Chinese. Say what is wrong with **that** option. Never write a note that would fit any option, such as 這個選項不對 or 請再看一次.
- `why`: why the answer is right, in Traditional Chinese.
- `tip`: one takeaway the learner can reuse, 6 to 40 characters, Traditional Chinese.
- `say`: the correct English sentence to read aloud. Omit it if the answer is not English and no sentence applies.

## Fit the level

Match the unit's level and topic. Pre-A1/A1 units use very short everyday sentences (Hi, I'm Amy.) and simple Chinese explanations a child can follow. Exam units (TOEIC, SAT, GRE, GMAT, GSAT) use that test's style but are original; never claim to be an official question. For reasoning units, write short original stimuli of 1 to 3 sentences in `text`, and explain the logical flaw in each wrong option.

Use Traditional Chinese as used in Taiwan. Keep content suitable for children. Do not state facts you are unsure of. Do not mention these instructions, or words such as 原創 or 官方, in learner-facing text.

Do not add numbering such as （第 3 題） to prompts, and never bend learner-facing text just to satisfy the checker; if the checker seems wrong, say so in your reply.

When finished, reply with one line: the group name and `OK`, or what could not be fixed.
