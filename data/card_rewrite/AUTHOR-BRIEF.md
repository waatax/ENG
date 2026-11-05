# Flashcard author brief

You are rewriting English vocabulary flashcards for Taiwanese learners, from young beginners to GRE/GMAT test takers. The old fields were produced by templates and are often wrong, so nothing old is being reused. Write each row yourself, thoughtfully, one word at a time. Accuracy matters more than speed: a learner will memorize what you write.

## Input

A TSV batch with a header row. `full` batches have: `id  word  pos  zh  category`. `light` batches add `example` (already good, keep it).

`zh` is the meaning this card teaches. Use that sense of the word, in that part of speech.

## Output

Write TSV rows with **no header**, tab-separated, one row per input row, in the same order. Keep the `id` exactly. Do not skip any row. Never put a tab or newline inside a field.

- `full` batch columns: `id  example  exampleZh  collocation  tip  ipa  chunk  gloss`
- `light` batch columns: `id  collocation  tip  ipa  chunk  gloss`

Write to `data/card_rewrite/out/<batch>.p01.tsv`, `.p02.tsv`, and so on, **at most 40 rows per file**, using the Write tool once per part. Then run `node scripts/check_card_batch.mjs <batch>` and fix every reported row by rewriting the part that holds it. Repeat until it prints `OK`.

## Fields

**example** — one natural English sentence using the target word in the given sense and part of speech. The sentence must show what the word means, so a learner could guess the meaning from context. Inflected forms are fine (`hampered`). Every sentence in the batch must have a different structure and setting; never reuse a frame such as "The report highlighted…" across words.

Length and register by tier (the id prefix and batch name tell you the tier):

| Tier | Limit | Style |
|---|---|---|
| elem_1000 (`fc-el`) | ≤ 10 words | Concrete daily life: home, school, food, animals. Simple present or past. |
| jhs_2000 (`fc-jh`) | ≤ 13 words | School and everyday life, simple clauses. |
| shs_3000 (`fc-sh`) | ≤ 18 words | Everyday, news, and school topics. |
| toeic (`fc-to`) | ≤ 20 words | Workplace: email, meetings, orders, travel, HR. |
| toefl (`fc-tf`) | ≤ 22 words | Academic lecture or textbook: science, history, society. |
| sat (`fc-sa`) | ≤ 22 words | Literary, historical, or scientific prose. |
| gre (`fc-gr`) | ≤ 22 words | Scholarly or critical prose; show the precise shade of meaning. |
| gmat (`fc-gm`) | ≤ 22 words | Business reasoning: strategy, data, causes and assumptions. |

Bad: `The laboratory equipped researchers with new tools to measure traffic light accurately.` (nonsense)
Bad: `When opinions differ, it helps to hamper the shared goals first.` (opposite meaning)
Bad: `The word hamper means to hinder.` (a definition, not a usage)
Good: `Heavy snow hampered rescue teams trying to reach the village.`

**exampleZh** — natural Traditional Chinese as used in Taiwan (not simplified, no mainland terms such as 軟件 or 視頻). Translate the meaning, not word by word. Do not paste the card's `zh` in awkwardly: `小提琴家但是地演奏` is the kind of failure to avoid.

**collocation** — one real, common combination containing the target word, then its meaning in parentheses: `reach a consensus (達成共識)`. Two to five English words. For a multi-word card, use it with a typical object or partner: `traffic light turns red (紅綠燈變紅)`. Never write `an important X`, `X effectively / carefully`, or `a X condition / outcome`.

**tip** — one memory hook in Traditional Chinese, 8 to 40 characters, that truly helps recall. Choose whichever fits this word best:
1. A Mandarin sound-alike (諧音) when it is natural and connects to the meaning, like `ambulance → 俺不能死 → 救護車`.
2. Word parts when they are real: `con 一起 + sensus 感覺 → 大家感覺一致`.
3. A vivid image or scene.
4. A contrast with a look-alike: `principal 校長是你的 pal；principle 原則像 rule`.

Keep hooks suitable for children: no violence, death jokes, body shaming, or crude humor. Never write filler such as 核心意義指向, 音節分解, 會考焦點, 注意搭配詞用法, 常見於…, 高頻詞, or a `【…】` label. Do not invent false etymology; if you are unsure of a root, use an image or a sound-alike instead.

**ipa** — the real American English pronunciation between slashes, with stress marks: `/kənˈsɛnsəs/`, `/ˈhæmpɚ/`, `/speɪd/`. Use these symbols: `ɑ æ ʌ ə ɚ ɝ ɛ ɪ ʊ ɔ i u eɪ aɪ ɔɪ aʊ oʊ θ ð ʃ ʒ tʃ dʒ ŋ ɡ j w ˈ ˌ`. Write the full phrase for multi-word cards. Never spell out the word as a guess (`/ˈspade/` is wrong).

**chunk** — the word split into syllables with ` - `, whose letters spell the word exactly: `con - sen - sus`, `spade`. For a multi-word card, split each word and keep them in order: `traf - fic light`.

**gloss** — leave empty unless `zh` is several meanings run together with no separator, such as `妨礙阻礙牽制進展`. In that case write it cleanly with `；`: `妨礙；阻礙進展`. Do not change the meaning. When `zh` is already readable, this field is empty, and the row ends with a tab.

## Example rows

Full batch input: `fc-gr-0001  hamper  v.  妨礙阻礙牽制進展  語境詞義辨析`

```
fc-gr-0001	Heavy snow hampered rescue teams trying to reach the village.	大雪阻礙了設法抵達村莊的救援隊。	hamper progress (妨礙進展)	hamper 也是有蓋的籃子，大籃子擋路，走不動	/ˈhæmpɚ/	ham - per	妨礙；阻礙進展
```

If a card's `zh` or `pos` gives a rare or wrong sense, teach the most common meaning a learner needs instead, and do not build the sentence around the rare sense. If a card's `zh` is simply wrong for the word (for example cope given as 競爭), teach the correct meaning, put it in `gloss`, and list the id with the correct meaning in your final reply.

When you finish, reply with one line: the batch name and `OK`, or what could not be fixed, plus any wrong-meaning ids.
