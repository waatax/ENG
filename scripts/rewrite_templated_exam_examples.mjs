// Replaces templated or mismatched concept questions in dist/curriculum_unified.mjs with concept-specific items.
// Each key is "unitId :: concept title"; the script edits only the examExample object inside that concept.
import fs from 'node:fs';

const q = (stem, options, answer, analysis) => ({ stem, options, answer, analysis });
const rewrites = {
 'g6-s1-u3 :: 公共設施與市容場所核心詞庫': q('Ben wants to mail a birthday card to his grandma in Tainan. Where should he go?', ['a bakery', 'a post office', 'a pharmacy', 'a fire station'], 1, '寄卡片（mail a card）要去郵局 post office。bakery 是麵包店、pharmacy 是藥局、fire station 是消防局。複合名詞重音多在第一個字：POST office。'),
 'g7-s1-u1 :: be 動詞與助動詞 do/does 的絕對分界': q('___ your brother like basketball? — Yes, he ___.', ['Is; is', 'Does; does', 'Do; likes', 'Does; is'], 1, 'like 是一般動詞，問句要借助動詞；主詞 your brother 是第三人稱單數，用 Does，簡答也用 does。Is your brother like… 把 be 與一般動詞黏在一起，是常見錯誤。'),
 'g7-s1-u1 :: 現在簡單式第三人稱單數動詞加 -s/-es 終極規則': q('My sister ___ her teeth after every meal, and she ___ to bed at ten.', ['brush; go', 'brushs; goes', 'brushes; goes', 'brushes; gos'], 2, '主詞 My sister 是第三人稱單數，描述習慣用現在簡單式。brush 字尾是 sh，加 -es → brushes；go 加 -es → goes。brushs、gos 都拼錯。'),
 'g8-s1-u2 :: 長動作背景 vs 短動作突發 (When vs While)': q('___ Amy was cooking dinner, the doorbell suddenly ___.', ['When; was ringing', 'While; rang', 'While; was rung', 'Because; rings'], 1, '做飯是持續中的長動作（was cooking），用 while 帶出背景；門鈴響是突然插入的短動作，用過去簡單式 rang。was rung 是被動，語意不通；rings 時態不一致。'),
 'g8-s1-u3 :: 條件副詞子句「從現代未」鐵律': q('If it ___ tomorrow, the school sports day ___ postponed.', ['rains; will be', 'will rain; will be', 'rains; is being', 'rained; would'], 0, '表示未來條件的 if 子句用現在簡單式 rains；主要子句用 will 表未來結果。運動會是「被」延期，所以是 will be postponed。'),
 'g8-s2-u4 :: 三大必接動名詞巨頭 (Gerund Verbs)': q('Kevin finally finished ___ his science report and then enjoyed ___ a movie with his family.', ['to write; to watch', 'writing; watching', 'write; watch', 'writing; to watch'], 1, 'finish 和 enjoy 後面接另一個動作時用動名詞：finished writing、enjoyed watching。'),
 'g9-s2-u5 :: 代名詞指代與推論三大鐵證': q('Lisa lent Tom her umbrella on a rainy afternoon. The next morning, he returned it with a thank-you card. What does "it" refer to?', ['the afternoon', 'the umbrella', 'the thank-you card', 'the rain'], 1, 'return 的受詞必須是能被歸還的東西；前句 Tom 借走的是 umbrella。代回原句：he returned the umbrella，語意通順。卡片是他附上的，不是被歸還的物品。'),
 'g10-s1-u2 :: 雙向動詞的時間箭頭 (Temporal Distinction of Dual Verbs)': q('I clearly remember ___ the lab door, so the key must be somewhere else. Please remember ___ it again tonight.', ['locking; to lock', 'to lock; locking', 'locking; locking', 'to lock; to lock'], 0, 'remember V-ing＝記得做過（已發生）；remember to V＝記得要去做（尚未發生）。第一句回想已經鎖過門，第二句提醒今晚要鎖。'),
 'g10-s1-u3 :: 客觀報導句型雙重轉換 (Double Conversion of Impersonal Passives)': q('It is believed that the old bridge was built in the 12th century. → The old bridge is believed ___ in the 12th century.', ['to build', 'to be built', 'to have been built', 'having built'], 2, '建造（過去）早於「被相信」（現在），而且橋是被建造的，所以用完成式被動不定詞 to have been built。'),
 'g10-s1-u4 :: 堅決建意命要動詞後 that 子句 (Subjunctive with Verbs of Demand/Suggestion)': q('The doctor insisted that the patient ___ smoking immediately.', ['quits', 'quit', 'quitted', 'will quit'], 1, 'insist 表「堅持要求」時，that 子句用 (should) + 原形：(should) quit。若 insist 是「堅稱某事屬實」，才依事實使用一般時態。'),
 'g10-s2-u7 :: 非限定子句修飾整句或先行詞 (Comma + which / who)': q('The factory cut its emissions by 40 percent, ___ surprised many experts.', ['that', 'which', 'what', 'it'], 1, '逗號後補充說明前面整件事，用非限定的 which。that 不能用在逗號後的非限定子句；what 本身不接先行詞；用 it 會讓兩個子句沒有連接詞。'),
 'g10-s2-u7 :: 限定 vs. 非限定的語意對比 (Semantic Distinction)': q('Which sentence suggests that Mr. Lin has ONLY two daughters?', ['Mr. Lin has two daughters who work in Taipei.', 'Mr. Lin has two daughters, who work in Taipei.', 'Mr. Lin has two daughters that work in Taipei.', 'Mr. Lin has two daughters working in Taipei.'], 1, '有逗號的非限定子句只是補充說明，表示他的女兒就是這兩位。沒有逗號的 who、that 或分詞修飾是限定用法，暗示可能還有其他女兒，這兩位是在台北工作的。'),
 'g10-s2-u9 :: 四大核心邏輯語義家族 (Four Major Logical Families)': q('Solar panels produce almost no emissions. ___, their operating costs fall over time.', ['However', 'Furthermore', 'For example', 'Otherwise'], 1, '第二句再加上一項優點，屬於遞進關係，用 Furthermore。However 表轉折、For example 表舉例、Otherwise 表「否則」。'),
 'g11-s1-u2 :: 慣用懸置分詞 (Idiomatic Dangling Participles)': q('___ from his accent, the speaker probably grew up in Scotland.', ['Judged', 'Judging', 'To judge being', 'Having judged by'], 1, 'Judging from…（從…判斷）是慣用的獨立分詞片語，不需要和主句主詞一致。Judged 是被動形式，語意不通。'),
 'g11-s1-u3 :: 與過去相反之假設 (Subjunctive Unreal Past)': q('If we ___ ten minutes earlier, we ___ the high-speed train.', ['left; would not miss', 'had left; would not have missed', 'have left; will not miss', 'had left; will not miss'], 1, '事實是出發太晚、錯過了車，屬於與過去事實相反的假設：if 子句用 had + p.p.，主要子句用 would have + p.p.。'),
 'g11-s1-u3 :: 與未來相反之純假想 (Subjunctive Unreal Future)': q('If a typhoon ___ hit Taipei tomorrow, all flights would be cancelled.', ['were to', 'will', 'has', 'is going'], 0, '對未來提出假設性的情境，可用 If + S + were to + V，主要子句用 would + V。條件子句不用 will；has 與 is going 結構都不完整。'),
 'g11-s2-u7 :: 分裂句標準公式與還原檢驗法 (Cleft Sentence Formula & Test)': q('Original: Columbus reached the Americas in 1492. Which sentence emphasizes the YEAR?', ['It was Columbus that reached the Americas in 1492.', 'It was in 1492 that Columbus reached the Americas.', 'It was the Americas that Columbus reached in 1492.', 'It is 1492 when Columbus reached the Americas.'], 1, '分裂句：It was + 焦點 + that + 其餘部分。強調年份就把 in 1492 放進焦點；拿掉 It was…that 後可還原原句。最後一句時態與結構都不正確。'),
 'g11-s2-u7 :: Wh- 分裂句 (Pseudo-cleft Sentences)': q('Which pseudo-cleft sentence correctly puts the focus on "a quiet place to study"?', ['What I need is a quiet place to study.', 'What I need are a quiet place to study.', 'That I need is a quiet place to study.', 'What do I need is a quiet place to study.'], 0, 'What 子句當主詞時視為單數，後接 is；焦點放在 be 動詞之後。What 子句內用直述語序 I need，不能寫成 do I need。'),
 'g11-s2-u8 :: 高級讓步與假設片語 (Advanced Idiomatic Concessions)': q('Every visitor must sign in at the front desk, ___ a student or a professor.', ['be it', 'is it', 'being it', 'it be'], 0, 'be it A or B（無論是 A 還是 B）是保留虛擬原形的倒裝讓步句型；is it 是疑問語序，不能表示讓步。'),
 'g11-s2-u9 :: 學術科技英文摘要四大結構 (Four Pillars of Academic Abstracts)': q('In a research abstract, which sentence most likely reports the FINDINGS?', ['This study aims to examine how AI tutors affect writing accuracy.', 'We surveyed 300 students across five high schools.', 'Results show that weekly AI feedback reduced grammar errors by 18%.', 'These results suggest that schools should combine AI and teacher feedback.'], 2, '摘要常依序寫：目的（aims to）→ 方法（surveyed…）→ 結果（Results show…，常帶數據）→ 意涵（suggest that…should）。'),
 'g11-s2-u11 :: 篇章連貫四大定錨法則 (Four Anchoring Principles of Discourse Cohesion)': q('Dr. Evans launched a project to clean up the river. Which sentence best follows?', ['This ambitious effort attracted over 200 volunteers.', 'However, rivers are important for farming.', 'They are also popular among tourists.', 'For example, the weather was sunny.'], 0, 'This ambitious effort 用「this + 概括名詞」回指前句的 project，指涉鏈完整。However 沒有可對比的內容；They 找不到複數先行詞；天氣的例子和前句無關。'),
 'g11-s2-u12 :: 高難度長篇閱讀三階速讀心法 (Three-Stage Velocity Reading for GSAT)': q('A 900-word passage comes with a question asking in which year a law was passed. What is the most efficient first step?', ['Read every word carefully from the beginning.', 'Scan the passage for dates near the word "law."', 'Look up every unfamiliar word first.', 'Read only the last paragraph.'], 1, '細節題先用題幹關鍵字（law、year）掃讀定位日期，再精讀該句確認。逐字讀或先查所有生字太慢；只讀末段可能漏掉答案。'),
 'g12-s1-u1 :: 詞彙題語境三步定位法 (Three-Step Lexical Context Method)': q('The scientist\'s research made a significant ___ to marine conservation.', ['contribution', 'distribution', 'attribution', 'constitution'], 0, '空格前是 made a significant，後接 to：make a contribution to（對…做出貢獻）是固定搭配，語意也正向。distribution 分配、attribution 歸因、constitution 憲法皆不合。'),
 'g12-s1-u3 :: 長篇閱讀四大多層次題型破解法 (Four Types of GSAT Reading Questions)': q('A question asks for the passage\'s "primary purpose." Which strategy fits best?', ['Find the paragraph with the most numbers.', 'Check the opening and closing paragraphs and the first sentence of each paragraph.', 'Choose the option with the hardest vocabulary.', 'Pick a detail mentioned only in the last sentence.'], 1, '主旨題要看全文架構：首段、末段的論點加上各段首句。只取單一段落或單一句的細節，範圍太狹隘。'),
 'g12-s2-u8 :: Part 7 三文本交叉檢索題 (Triple Passage Cross-Referencing in Part 7)': q('Text 1: Model X400 costs $200. Text 2: Ms. Ho orders two X400 units. Text 3: The manager offers her 10% off the whole order. How much will Ms. Ho pay?', ['$180', '$360', '$400', '$380'], 1, '整合三篇：2 × $200 = $400，再打九折：$400 × 0.9 = $360。$180 是單台折扣價，$400 沒有打折。'),
 'g12-s2-u9 :: 大學講堂康乃爾筆記速記心法 (Cornell Academic Note-Taking System)': q('In the Cornell note-taking system, what goes in the LEFT column after class?', ['A word-for-word transcript of the lecture', 'Key words and questions that cue the main notes', 'A 50-word summary of the whole lecture', 'Drawings unrelated to the topic'], 1, '右欄是課堂速記，左欄在課後寫關鍵字與提問（cue），底部寫摘要。逐字抄寫跟不上講課，也不利整理。'),
 'g12-s2-u10 :: 三大常見學術邏輯謬誤辨識 (Three Core Logical Fallacies in Academic Writing)': q('"If we let students use phones at lunch, soon they will use them in every class, and education will collapse." Which fallacy is this?', ['Straw man', 'Slippery slope', 'Ad hominem', 'No fallacy'], 1, '從一個小步驟推到一連串未經證明的極端後果，是滑坡謬誤。稻草人是曲解對方論點；人身攻擊是針對人而不是論點。'),
 'g12-s2-u12 :: 終身自主英語學習飛輪效應 (The Lifelong Autonomous Flywheel)': q('Which plan best follows the "input → synthesis → output → feedback" cycle?', ['Listen to a podcast, write a summary, post it to a class forum, and revise it after comments.', 'Memorize 100 words a day without using them.', 'Watch English movies with Chinese subtitles only.', 'Take one practice test a year.'], 0, '第一個選項依序完成輸入（聽 podcast）、內化（寫摘要）、輸出（發表）與回饋修正（依留言修改）；其他選項缺少輸出或回饋。'),
 'g12-s2-u12 :: AI 時代人機協作英文精進術 (Human-AI Synergistic Language Mastery)': q('Which prompt uses AI as a learning coach rather than a ghostwriter?', ['Write my essay about climate change.', 'Point out three grammar problems in my paragraph and explain why, but do not rewrite it.', 'Translate my Chinese essay into perfect English.', 'Give me the answers to tomorrow\'s quiz.'], 1, '請 AI 指出問題並說明原因、再由自己修改，才是刻意練習。代寫、整篇翻譯或索取答案都跳過學習歷程，也可能違反學術誠信。')
};

function objectEnd(src, open) {
  let depth = 0, inStr = false, esc = false;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true; else if (ch === '{') depth++; else if (ch === '}') { depth--; if (!depth) return i + 1; }
  }
  throw new Error('Unbalanced object');
}

let src = fs.readFileSync('dist/curriculum_unified.mjs', 'utf8');
let done = 0;
for (const [key, value] of Object.entries(rewrites)) {
  const [uid, title] = key.split(' :: ');
  const unitAt = src.indexOf(`"id": "${uid}"`);
  if (unitAt < 0) throw new Error('Unit not found ' + uid);
  const titleAt = src.indexOf(`"title": ${JSON.stringify(title)}`, unitAt);
  if (titleAt < 0) throw new Error('Concept not found ' + key);
  const exAt = src.indexOf('"examExample": {', titleAt);
  const nextConcept = src.indexOf('"title": ', titleAt + 10);
  if (exAt < 0 || (nextConcept > 0 && exAt > nextConcept)) throw new Error('examExample not inside concept ' + key);
  const open = src.indexOf('{', exAt);
  const end = objectEnd(src, open);
  const indent = ' '.repeat(src.lastIndexOf('\n', exAt) >= 0 ? exAt - src.lastIndexOf('\n', exAt) - 1 : 0);
  const body = JSON.stringify(value, null, 1).split('\n').map((l, i) => i ? indent + l : l).join('\n');
  src = src.slice(0, open) + body + src.slice(end);
  done++;
}
fs.writeFileSync('dist/curriculum_unified.mjs', src);
console.log(`Rewrote ${done} concept questions.`);
