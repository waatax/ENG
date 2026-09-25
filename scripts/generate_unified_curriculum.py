"""
generate_unified_curriculum.py
Builds dist/curriculum_unified.mjs by synthesizing:
- Sixth project assets (Grade 6 Semester 1 & 2)
- JH project assets (Grade 7, 8, 9 Semesters 1 & 2)
- Arch project assets (Grade 10, 11 Semesters 1 & 2 + 5 Prerequisite Modules)
- Junyi Academy pedagogical framework & 108 Curriculum metadata
"""

import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

DIST_DIR = r"C:\Users\User\OneDrive\文件\Antigravity\ENG\dist"

code = r"""// curriculum_unified.mjs - 108 課綱英語文全學年上下學期深度教學總庫
// 深度整合：國小 (Sixth 專案 6上/6下)、國中 (JH 專案 7-9 年級)、高中/技高 (Arch 專案 10-11 年級先修與學期複習)
// 融入均一教育平台 (Junyi Academy) 鷹架式階梯微課、步驟0破題思維、致命陷阱診斷與語音發音系統

import { sixthLessons, sixthNotes, sixthQuestions, sixthAudioData } from './sixth_assets.mjs';
import { jhUnits, jhCases, jhHandouts, jhCapAnalysis } from './jh_assets.mjs';
import { 
  archTenseModules, archTenseTraps, archTenseQuiz,
  archSentencePillars, archSentenceTraps, archSentenceQuiz,
  archPartsOfSpeech, archSuffixRules, archPosQuiz,
  archPhoneticItems, archStressRules, archDictCodes, archPhoneticsQuiz,
  archVocabCategories, archVocabQuiz
} from './arch_prerequisites.mjs';
import { archSemesters, englishS1Review, englishS2Review, englishS3Review, englishS4Review } from './arch_semesters.mjs';

export const UNIFIED_GRADES = [
  {
    gradeId: 'g6',
    title: '國小六年級 (Grade 6)',
    stage: '第三學習階段 (國小高年級)',
    badge: '108 課綱小升初銜接・雙語素養奠基',
    desc: '聚焦自然拼讀 (Phonics)、日常作息時間、過去簡單式故事冒險、街道地圖問路、身體照護、世界節慶多元文化、未來計畫志向與比較級最高級。',
    semesters: [
      {
        semId: 'g6-s1',
        title: '六年級上學期 (6上 · 6A)',
        examFocus: '第一次段考 (作息時間/動態描述)、第二次段考 (問路方位/身體健康)、期末大複習',
        units: [
          {
            id: 'g6-s1-u1',
            unitNo: 'Unit 1',
            title: '日常生活作息與時間表達 (Daily Routines & Telling Time)',
            indicator: '1-III-2 / 2-III-1',
            sourceRef: 'sixth:eng-u1',
            topics: ['半點 half past、一刻 quarter past/to', '時間三大介系詞 at/on/in 倒金字塔', '6 大頻率副詞「Be後動前」黃金定律'],
            step0Clue: '看到鐘面或題目問 What time...，先判斷過了幾分：30分以內用 past，超過30分用 to (算差幾分到下一個整點)。',
            traps: [
              { wrong: 'It is a quarter to eight at 8:15. ❌', correct: 'It is a quarter past eight. ✔️', reason: 'past 是「過了」，to 是「差幾分到」。8:15 是過了8點15分，應使用 past。' },
              { wrong: 'I go always to bed at 10. ❌', correct: 'I always go to bed at 10. ✔️', reason: '頻率副詞在一般動詞前面 (always go)。' }
            ]
          },
          {
            id: 'g6-s1-u2',
            unitNo: 'Unit 2',
            title: '過去式故事與冒險歷險記 (Past Tense Stories & Irregular Verbs)',
            indicator: '2-III-3 / 3-III-1',
            sourceRef: 'sixth:eng-u2',
            topics: ['規則動詞 +ed 發音規則 (/t/, /d/, /ɪd/)', '高頻不規則動詞三態 (go-went, see-saw, eat-ate)', "did / didn't 助動詞後接原形動詞"],
            step0Clue: '看到 yesterday, last night, two days ago, in 2022，第一時間確定主要動詞用「過去式」；否定句和疑問句出現 did，主要動詞必定打回「原形」。',
            traps: [
              { wrong: 'Did you went to the park? ❌', correct: 'Did you go to the park? ✔️', reason: '助動詞 Did 已經吸收了過去時態，後面主要動詞必須用原形動詞 go。' },
              { wrong: 'He buyed a new comic book. ❌', correct: 'He bought a new comic book. ✔️', reason: 'buy 是不規則變化，過去式為 bought。' }
            ]
          },
          {
            id: 'g6-s1-u3',
            unitNo: 'Unit 3',
            title: '城市探索與問路指路指南 (Places & Asking for Directions)',
            indicator: '1-III-4 / 2-III-2',
            sourceRef: 'sixth:eng-u3',
            topics: ['生活建築設施單字 (bakery, post office, clinic, library)', '空間介系詞 (across from, next to, between A and B)', '問路句型 Excuse me, how do I get to...? / Turn left / Go straight'],
            step0Clue: '在地圖題中先找到自己的起點 (You are here)，順著街道方向前進，注意轉彎左右方向判定。',
            traps: [
              { wrong: 'The bank is between the bookstore. ❌', correct: 'The bank is between the bookstore and the clinic. ✔️', reason: 'between 表示在兩者之間，必須搭配 and 連接兩個地點；單一地點用 next to 或 across from。' }
            ]
          },
          {
            id: 'g6-s1-u4',
            unitNo: 'Unit 4',
            title: '健康飲食、身體部位與醫療照護 (Food, Health & Care)',
            indicator: '2-III-4 / 3-III-2',
            sourceRef: 'sixth:eng-u4',
            topics: ['身體部位與疼痛複合字 (headache, toothache, stomachache)', "看病日常醫病對話 What's wrong? / I have a fever.", '健康生活建議 should / shouldn\'t + 原形動詞'],
            step0Clue: '表達病症時，「a/an + 疾病名詞」（have a cold, have a headache, have a fever）；但如果形容部位疼痛可用 My ... hurts。',
            traps: [
              { wrong: 'You should to see a doctor. ❌', correct: 'You should see a doctor. ✔️', reason: '情態助動詞 should 後面直接接原形動詞，不可加 to。' }
            ]
          }
        ]
      },
      {
        semId: 'g6-s2',
        title: '六年級下學期 (6下 · 6B)',
        examFocus: '第一次段考 (節慶文化/閱讀拼讀)、畢業考 (未來志向/形容詞比較級最高級)、國小升國中大會考前哨戰',
        units: [
          {
            id: 'g6-s2-u5',
            unitNo: 'Unit 5',
            title: '世界節慶巡禮與多元文化 (Festivals & World Cultures)',
            indicator: '3-III-3 / 5-III-1',
            sourceRef: 'sixth:eng-u5',
            topics: ['臺灣傳統節慶 (Lunar New Year, Dragon Boat Festival, Moon Festival)', '西方節慶 (Halloween, Christmas, Thanksgiving)', '文化飲食與習俗活動英語表達'],
            step0Clue: '區分節慶的特定日期介系詞用 on (on Christmas Day, on Halloween)；特定月份或季節用 in (in December, in spring)。',
            traps: [
              { wrong: 'We eat mooncakes in Mid-Autumn Festival. ❌', correct: 'We eat mooncakes on Mid-Autumn Festival. ✔️', reason: '特定節日或日子前面用介系詞 on。' }
            ]
          },
          {
            id: 'g6-s2-u6',
            unitNo: 'Unit 6',
            title: '閱讀理解力、字首字尾與語篇導航 (Reading & Phonics Mastery)',
            indicator: '3-III-4 / 4-III-1',
            sourceRef: 'sixth:eng-u6',
            topics: ['Skimming 略讀（看標題、首尾段抓大意）', 'Scanning 掃讀（找關鍵人名、地名、數字）', '常見字尾轉換 (-tion 名詞, -ful 形容詞, -ly 副詞)'],
            step0Clue: '做長篇閱讀前，先花 10 秒鐘看題目問什麼，圈出題目關鍵詞，再回文章中 Scanning 定位答案所在句子。',
            traps: [
              { wrong: '讀文章遇到不懂的單字就停下來查字典。 ❌', correct: '根據上下文情境線索猜測詞義，維持閱讀節奏。 ✔️', reason: '108 課綱強調閱讀素養，考的是推論與訊息檢索能力，非死背罕見單字。' }
            ]
          },
          {
            id: 'g6-s2-u7',
            unitNo: 'Unit 7',
            title: '未來計畫與夢想志向 (Future Plans & Dream Careers)',
            indicator: '3-III-3',
            sourceRef: 'sixth:eng-u7',
            topics: ['未來式 will + 原形動詞（即時決定、預測）', '未來式 be going to + 原形動詞（事先計畫好的意圖）', '職業志向單字 (architect, programmer, scientist, pilot)'],
            step0Clue: '看到 tomorrow, next week, tonight, in the future，動詞形式鎖定 will 或 be going to；二者後面動詞均保持原形。',
            traps: [
              { wrong: 'I will going to Taipei tomorrow. ❌', correct: 'I will go to Taipei tomorrow. / I am going to go to Taipei tomorrow. ✔️', reason: 'will 和 be going to 是兩種不同的未來式結構，不能混雜在一起。' }
            ]
          },
          {
            id: 'g6-s2-u8',
            unitNo: 'Unit 8',
            title: '事物比較與世界之最 (Comparisons & World Wonders)',
            indicator: '2-III-6',
            sourceRef: 'sixth:eng-u8',
            topics: ['單音節形容詞比較級 (-er + than)', '多音節形容詞比較級 (more + 形容詞 + than)', '最高級結構 (the + -est / the most + 形容詞 + of all / in the world)'],
            step0Clue: '看到 than 出現，前面形容詞一定是「比較級」；看到 the 出現且後面有範圍 (in the world, of all)，形容詞一定是「最高級」。',
            traps: [
              { wrong: 'Taipei 101 is more taller than this building. ❌', correct: 'Taipei 101 is taller than this building. ✔️', reason: 'tall 是一音節，比較級加 -er 即可，不可加上 more 形成雙重比較！' }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeId: 'g7',
    title: '國中七年級 (Grade 7)',
    stage: '第四學習階段 (國中)',
    badge: '108 課綱會考核心基石・七年級文法主幹',
    desc: '從句子骨架、be 動詞與現在式展開，深入名詞可數不可數、指示代名詞、祈使句、現在進行式、頻率副詞、情態助動詞 can 與精確時空方位介系詞。',
    semesters: [
      {
        semId: 'g7-s1',
        title: '七年級上學期 (7上)',
        examFocus: '第一次段考 (be動詞/指示詞)、第二次段考 (現在簡單式/名詞單複數)、第三次段考 (祈使句/時間前置詞)',
        units: [
          {
            id: 'g7-s1-u1',
            unitNo: 'JH-Unit 1',
            title: '句子骨架與現在簡單式 (Sentence Patterns & Present Simple)',
            indicator: 'JH: english-1',
            sourceRef: 'jh:english-1',
            topics: ['先找主詞與動詞：be 動詞描述身分、狀態；一般動詞描述動作', '第三人稱單數的一般動詞加 -s 或 -es', '否定句與疑問句使用 do/does 助動詞'],
            step0Clue: '看主詞人稱：如果是 He, She, It 或單數名詞，肯定句動詞加 s/es；否定問句一律叫 does 出來幫忙，動詞變原形！',
            traps: [
              { wrong: 'Does Leo likes reading novels? ❌', correct: 'Does Leo like reading novels? ✔️', reason: '問句中已經有 does 體現第三人稱單數，後方主要動詞必須恢復原形 like。' }
            ]
          },
          {
            id: 'g7-s1-u2',
            unitNo: 'JH-Unit 2',
            title: '名詞單複數、指示代名詞與祈使句 (Nouns, Demonstratives & Imperatives)',
            indicator: 'JH: english-7',
            sourceRef: 'jh:english-7',
            topics: ['規則名詞複數 (+s, +es, y改ies) 與不規則名詞複數 (child-children, tooth-teeth)', '指示代名詞單複數對比 (this/these, that/those)', "祈使句省略主詞 you，以原形動詞開頭，否定用 Don't"],
            step0Clue: '祈使句開頭沒有主詞，直接放「原形動詞」或「Please + 原形動詞」；要禮貌可在句首或句尾加上 please。',
            traps: [
              { wrong: "Be careful! Don't running! ❌", correct: "Be careful! Don't run! ✔️", reason: "Don't 後面永遠接「原形動詞」，不可接 V-ing。" }
            ]
          },
          {
            id: 'g7-s1-u3',
            unitNo: 'Prereq-Phonetics',
            title: '國際音標 (IPA/KK) 與字典查閱指南 (Phonetics & Dictionary Guide)',
            indicator: 'Arch: phonetics-dictionary',
            sourceRef: 'arch:phonetics-dictionary',
            topics: ['母音與子音音標對照表 (KK音標 vs IPA)', '音節切分原則與單字重音規律 (Primary & Secondary Stress)', '英英字典詞性標記 (n., v., adj., adv., prep.) 與例句研讀法'],
            step0Clue: '看音標時，注意重音符號 [ ˈ ] 在哪個音節前面，該音節要念得最響亮、最高昂、最清晰。',
            traps: [
              { wrong: '把名詞和動詞同形的單字都念一樣的重音。 ❌', correct: '名詞在前、動詞在後 (REcord 名詞 vs reCORD 動詞)。 ✔️', reason: '英文雙音節名詞重音多在第一音節，動詞重音多在第二音節。' }
            ]
          }
        ]
      },
      {
        semId: 'g7-s2',
        title: '七年級下學期 (7下)',
        examFocus: '第一次段考 (現在進行式)、第二次段考 (頻率副詞/助動詞)、第三次段考 (存在句/方位介系詞)',
        units: [
          {
            id: 'g7-s2-u4',
            unitNo: 'JH-Unit 3',
            title: '現在進行式與動態時間表達 (Present Continuous & Dynamic Time)',
            indicator: 'JH: english-2',
            sourceRef: 'jh:english-2',
            topics: ['現在進行式完整公式：S + am/is/are + V-ing', '進行式不可搭配靜態動詞 (know, like, have有, want)', '此刻正在發生的動作 vs 平日習慣現在簡單式區分'],
            step0Clue: '辨認動詞性質：表示動作的 (run, write) 可用進行式；表示心理狀態或擁有的 (know, like, have) 通常不使用進行式。',
            traps: [
              { wrong: 'I am having a computer. ❌', correct: 'I have a computer. ✔️', reason: 'have 表示「擁有」時為靜態動詞，不可用進行式；只有在表示「吃喝/度過」時才能用 (I am having breakfast)。' }
            ]
          },
          {
            id: 'g7-s2-u5',
            unitNo: 'JH-Unit 4',
            title: '頻率副詞、情態助動詞 can 與存在句 (Adverbs of Frequency & Existential Sentences)',
            indicator: 'JH: english-8',
            sourceRef: 'jh:english-8',
            topics: ['6 大頻率副詞百分比：always(100%), usually(80%), often(60%), sometimes(40%), seldom(10%), never(0%)', '情態助動詞 can / could 表示能力與請求', '存在句 There is + 單數/不可數; There are + 複數名詞'],
            step0Clue: 'There is/are 的主詞在後面！看到空格後面的名詞是複數 (two cats)，動詞選 are；如果是不可數 (some water)，動詞選 is。',
            traps: [
              { wrong: 'There have a book on the table. ❌', correct: 'There is a book on the table. ✔️', reason: '中文常說「那裡有一本書」，受母語影響誤用 have。英文「某處有某物」必定用 There is / There are！' }
            ]
          },
          {
            id: 'g7-s2-u6',
            unitNo: 'JH-Unit 5',
            title: '時空方位介系詞與地圖導航指南 (Prepositions of Space & Directions)',
            indicator: 'JH: english-13',
            sourceRef: 'jh:english-13',
            topics: ['時間介系詞：at(特定點/時刻), on(特定日期/星期), in(月份/年份/季節/長時段)', '空間介系詞：at(點), on(面/街道), in(空間內部/城市/國家)', '方位與移動：along, across, through, into, toward'],
            step0Clue: '由小到大原則：at 最小 (at 7:00 / at the bus stop) ➔ on 中間 (on Monday / on Zhongshan Road) ➔ in 最大 (in May / in Taiwan)。',
            traps: [
              { wrong: 'I was born in May 20th. ❌', correct: 'I was born on May 20th. ✔️', reason: '只要有明確的「日期號數」，一律使用介系詞 on。' }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeId: 'g8',
    title: '國中八年級 (Grade 8)',
    stage: '第四學習階段 (國中)',
    badge: '108 課綱會考進階主幹・八年級文法突破',
    desc: '過去簡單式、未來式、過去進行式、時間連接詞 when/while、數量詞、條件副詞子句 if/unless、比較級與最高級、不定詞與動名詞、連綴動詞與感官動詞。',
    semesters: [
      {
        semId: 'g8-s1',
        title: '八年級上學期 (8上)',
        examFocus: '第一次段考 (過去簡單式與未來式)、第二次段考 (過去進行式與時間連接詞)、第三次段考 (條件子句與數量詞)',
        units: [
          {
            id: 'g8-s1-u1',
            unitNo: 'JH-Unit 6',
            title: '過去式、未來與敘事時間軸 (Past Simple, Future Tense & Narrative)',
            indicator: 'JH: english-3',
            sourceRef: 'jh:english-3',
            topics: ['過去簡單式敘述已完結事件', '未來式 will 與 be going to 配合情境選擇', '時間順序副詞 first, then, after that, finally 串連文章段落'],
            step0Clue: '在閱讀短文時，先掃視每一段的主要動詞時態，建立時間軸，確認事件發生的先後順序。',
            traps: [
              { wrong: 'Before I went to bed, I had brush my teeth. ❌', correct: 'Before I went to bed, I brushed my teeth. ✔️', reason: '國中階段敘述過去連續動作，前後子句均使用過去簡單式即可。' }
            ]
          },
          {
            id: 'g8-s1-u2',
            unitNo: 'JH-Unit 7',
            title: '過去進行式、時間連接詞 when/while 與數量詞 (Past Continuous & Quantifiers)',
            indicator: 'JH: english-9',
            sourceRef: 'jh:english-9',
            topics: ['過去進行式 (was/were + V-ing) 描述過去某一瞬間正在持續的背景動作', 'when (短動作插入) 與 while (長背景動作持續) 的精確搭配', '數量詞用法：many/few + 可數; much/little + 不可數; some/any 用法'],
            step0Clue: '看動詞動作持續長短：was reading 是長動作，配 while；fell down 是瞬間短動作，配 when。',
            traps: [
              { wrong: 'While I cooked dinner, the phone rang. ❌', correct: 'While I was cooking dinner, the phone rang. ✔️', reason: 'while 後面通常接正在持續的進行式 (was cooking)。' }
            ]
          },
          {
            id: 'g8-s1-u3',
            unitNo: 'JH-Unit 8',
            title: '條件副詞子句與情態假設語氣 (Conditional Clauses: If & Unless)',
            indicator: 'JH: english-14',
            sourceRef: 'jh:english-14',
            topics: ['真實條件子句口訣：「從屬現在式代替未來式，主要子句用未來式」', 'unless = if ... not (除非...) 否定含義不重複加 not', '祈使句, and/or... 的條件替代結構 (Work hard, and you will pass.)'],
            step0Clue: '看到 If 引導的副詞子句，哪怕事情發生在明天，If 子句裡的動詞也「絕對不能加 will」，必須用現在式代替未來式！',
            traps: [
              { wrong: 'If it will rain tomorrow, we will cancel the picnic. ❌', correct: 'If it rains tomorrow, we will cancel the picnic. ✔️', reason: '條件副詞子句中，用現在簡單式 rains 代替未來式。' }
            ]
          }
        ]
      },
      {
        semId: 'g8-s2',
        title: '八年級下學期 (8下)',
        examFocus: '第一次段考 (形容詞副詞比較級與最高級)、第二次段考 (不定詞與動名詞)、第三次段考 (連綴動詞與感官動詞)',
        units: [
          {
            id: 'g8-s2-u4',
            unitNo: 'JH-Unit 9',
            title: '比較級、不定詞與動名詞 (Comparatives, Infinitives & Gerunds)',
            indicator: 'JH: english-4',
            sourceRef: 'jh:english-4',
            topics: ['比較級 + than 與最高級 the + -est / most + 比較範圍 (of all / in the class)', '只接不定詞的動詞：want, hope, plan, decide, agree, refuse + to V', '只接動名詞的動詞：enjoy, practice, finish, keep, avoid, quit + V-ing', '接 to V / V-ing 意義不同：stop, remember, forget'],
            step0Clue: '記住三大常考動名詞巨頭：enjoy / practice / finish 後面必定接 V-ing；看到 decide / plan 後面必定接 to V。',
            traps: [
              { wrong: 'She enjoys to read English novels. ❌', correct: 'She enjoys reading English novels. ✔️', reason: 'enjoy 是及物動詞，後面受詞必須接動名詞 reading。' }
            ]
          },
          {
            id: 'g8-s2-u5',
            unitNo: 'JH-Unit 10',
            title: '連綴動詞、感官動詞與最高級比較 (Linking & Sensory Verbs, Superlatives)',
            indicator: 'JH: english-10',
            sourceRef: 'jh:english-10',
            topics: ['連綴動詞：look, sound, smell, taste, feel + 形容詞 (不能加副詞！)', '連綴動詞 + like + 名詞 (It looks like a butterfly.)', '感官動詞：see, hear, watch, notice + 受詞 + 原形動詞 (完整事實) / V-ing (正在發生)'],
            step0Clue: '中文說「聽起來很甜美」，習慣用副詞；但英文連綴動詞後面當補詞，必須接「形容詞」(sound sweet, taste delicious)。',
            traps: [
              { wrong: 'The soup tastes deliciously. ❌', correct: 'The soup tastes delicious. ✔️', reason: 'taste 是連綴動詞，受詞補詞應使用形容詞 delicious。' }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeId: 'g9',
    title: '國中九年級 (Grade 9 / 會考衝刺)',
    stage: '第四學習階段 (國中畢業考與教育會考)',
    badge: '108 課綱會考滿分高分區・九年級決戰樞紐',
    desc: '現在完成式、被動語態、關係代名詞子句、授予動詞、使役動詞、附加問句、名詞子句與間接問句、素養多模態閱讀策略與會考歷屆真題。',
    semesters: [
      {
        semId: 'g9-s1',
        title: '九年級上學期 (9上)',
        examFocus: '第一次段考 (現在完成式與被動語態)、第二次段考 (使役動詞與授予動詞)、第三次段考 (關係代名詞子句與介系詞)',
        units: [
          {
            id: 'g9-s1-u1',
            unitNo: 'JH-Unit 11',
            title: '完成式、被動與關係子句 (Present Perfect, Passive Voice, Rel Clauses)',
            indicator: 'JH: english-5',
            sourceRef: 'jh:english-5',
            topics: ['現在完成式：have/has + p.p. 表示經驗、持續 (since + 時間點 / for + 時間段) 與完成 (already, yet)', '被動語態：S + be + p.p. (+ by + 動作執行者)', '關係代名詞主格 who/which/that 引導形容詞子句修飾先行詞'],
            step0Clue: '看到 since + 過去時間點 或 for + 一段時間，動詞時態 99% 是「現在完成式」(have/has + p.p.)！',
            traps: [
              { wrong: 'I have lived here since three years. ❌', correct: 'I have lived here for three years. / ... since three years ago. ✔️', reason: 'for 接一段時間 (for three years)；since 接明確的時間起點 (since 2021 / since three years ago)。' }
            ]
          },
          {
            id: 'g9-s1-u2',
            unitNo: 'JH-Unit 12',
            title: '授予動詞、使役動詞與完成式進階 (Dative & Causative Verbs)',
            indicator: 'JH: english-11',
            sourceRef: 'jh:english-11',
            topics: ['授予動詞雙受詞轉換：give/send/teach ... to sb. vs buy/make/cook ... for sb.', '三大使役動詞：make (強迫), have (要求/安排), let (允許) + 受詞 + 原形動詞', 'help + sb. + (to) 原形動詞; get + sb. + to V'],
            step0Clue: '看到 make / have / let 接人，受詞補詞一定要找「原形動詞」！',
            traps: [
              { wrong: 'The teacher made us to clean the classroom. ❌', correct: 'The teacher made us clean the classroom. ✔️', reason: '使役動詞 make 後面接原形動詞 clean，不可加 to。' }
            ]
          },
          {
            id: 'g9-s1-u3',
            unitNo: 'JH-Unit 13',
            title: '關係代名詞受格省略與介系詞搭配 (Rel Pronoun Omission & Prepositions)',
            indicator: 'JH: english-15',
            sourceRef: 'jh:english-15',
            topics: ['關係代名詞作為子句受格時，who(m)/which/that 可以直接省略', '介系詞提前規則：介系詞後只能接 whom (人) 或 which (物)，不可接 that 或省略', '關係代名詞當主格時「絕對不可省略」'],
            step0Clue: '判定關代能否省略：看關代後面如果緊接著「主詞 + 動詞」，代表它是受格，可以省略；如果緊接著「動詞」，代表它是主格，絕對不能省略！',
            traps: [
              { wrong: 'The girl speaks English well is my sister. ❌', correct: 'The girl who speaks English well is my sister. ✔️', reason: 'who 當子句主詞，不可省略，否則全句會出現兩個主要動詞。' }
            ]
          }
        ]
      },
      {
        semId: 'g9-s2',
        title: '九年級下學期 (9下 / 會考總衝刺)',
        examFocus: '第一次段考 (附加問句與名詞子句)、會考模擬考 (109-115 歷屆聽力與閱讀)、非選題作答規範與素養克漏字',
        units: [
          {
            id: 'g9-s2-u4',
            unitNo: 'JH-Unit 14',
            title: '附加問句、名詞子句與間接問句 (Tag Questions & Indirect Questions)',
            indicator: 'JH: english-12',
            sourceRef: 'jh:english-12',
            topics: ['附加問句前肯後否、前否後肯原則；含有 never, seldom, hardly 視為否定句', 'that 引導名詞子句當受詞；that 常可省略', '間接問句核心心訣：「疑問詞 + 主詞 + 動詞」正常語序 (不再用倒裝問句！)', 'whether / if (是否) 名詞子句'],
            step0Clue: '間接問句萬能公式：主句 + 疑問詞 + S + V！看到 Do you know where does he live? 立刻把 does 去掉，改成 where he lives！',
            traps: [
              { wrong: 'Can you tell me where is the MRT station? ❌', correct: 'Can you tell me where the MRT station is? ✔️', reason: '間接問句內部必須恢復直述句語序 (主詞 the MRT station + 動詞 is)。' }
            ]
          },
          {
            id: 'g9-s2-u5',
            unitNo: 'JH-Unit 15',
            title: '閱讀策略、情境溝通與指代推論 (Reading Strategies & Contextual Inference)',
            indicator: 'JH: english-6',
            sourceRef: 'jh:english-6',
            topics: ['公告、時刻表、傳單小字與條件限制 (Notice, Timetable, Poster)', '代名詞指代關係判定 (What does "it" / "they" refer to?)', '作者立場、態度與未明說含義之合邏輯推論 (Inference)'],
            step0Clue: '會考長篇素養題中，答案通常不是文章原句照抄，而是「同義置換 (Paraphrase)」；仔細比對選項與原文中的同義字。',
            traps: [
              { wrong: '只根據常識猜測答案，沒有回到文章找支持證據。 ❌', correct: '每一題推論題都必須在原文中圈出對應的一至兩句關鍵證據句。 ✔️', reason: '會考閱讀測驗嚴格要求依據文本證據答題，過度腦補必錯。' }
            ]
          },
          {
            id: 'g9-s2-u6',
            unitNo: 'JH-Unit 16',
            title: '跨文本圖表閱讀與素養克漏字 (Multimodal Texts & Cloze Mastery)',
            indicator: 'JH: english-16',
            sourceRef: 'jh:english-16',
            topics: ['跨文本互證：一篇文章為電子郵件，另一篇為公車班表或氣象圖表', '克漏字篇章轉折詞 (However, Therefore, In addition, On the other hand)', '109–115 國中教育會考歷屆考點診斷與常錯題庫'],
            step0Clue: '做克漏字時，千萬不要只看空格那一行！必須閱讀空格「前一句」和「後一句」，找出語意因果、轉折或遞進邏輯。',
            traps: [
              { wrong: '看到空格立刻套四個選項感覺順不順。 ❌', correct: '先分析空格所屬句子的主詞、動詞、受詞結構，確定缺什麼詞性再看選項。 ✔️', reason: '會考克漏字首重篇章邏輯與語法結構，死靠語感容易掉入誘答陷阱。' }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeId: 'g10',
    title: '高中十年級 (Grade 10 / 高一 · 技高一)',
    stage: '第五學習階段 (高中與技術型高中)',
    badge: '108 課綱學測與統測基石・高中高職核心雙軌',
    desc: '核心 1200-2000 單字、五大時態變化、被動語態、情態助動詞、複合句核心支柱、對等與從屬連接詞、名詞子句、副詞子句與生活職場會話。',
    semesters: [
      {
        semId: 'g10-s1',
        title: '高一上學期 (10上 · S1)',
        examFocus: '第一次段考 (基礎字彙與詞性轉換)、第二次段考 (五大時態縱橫與被動態)、期末段考 (情態助動詞與生活會話)',
        units: [
          {
            id: 'g10-s1-u1',
            unitNo: 'Arch-S1 Review',
            title: '核心 1200 單字、詞性轉換規則與字根字尾 (Arch englishS1Review)',
            indicator: 'Arch: englishS1Review',
            sourceRef: 'arch:english-s1',
            topics: ['名詞字尾 (-tion, -ment, -ity) 與形容詞字尾 (-ful, -able, -ive)', '常考混淆單字對比 (affect vs effect, adapt vs adopt)', '五大時態指標時間副詞與無生命主詞被動判定'],
            step0Clue: '看到動詞或名詞選項四個字根相同、字尾不同時，第一眼看句子缺什麼詞性（主詞缺名詞、動詞前修飾缺副詞）。',
            traps: [
              { wrong: 'The pollution will serious affect our health. ❌', correct: 'The pollution will seriously affect our health. ✔️', reason: 'affect 是動詞，修飾動詞必須使用副詞 seriously。' }
            ]
          },
          {
            id: 'g10-s1-u2',
            unitNo: 'Arch-Prereq 1',
            title: 'Arch 先修專題 1：五大基本時態與被動語態全圖解 (Basic Tenses & Passive)',
            indicator: 'Arch: basic-tenses-passive',
            sourceRef: 'arch:basic-tenses-passive',
            topics: ['現在簡單式、過去簡單式、未來式、現在進行式、現在完成式', '主動句轉被動句三步驟：受詞變主詞、加 be + pp、主詞變 by 受格', '感官與使役動詞被動態還原 to 原則 (He was made to clean...)'],
            step0Clue: '主動句若為使役動詞 make，變成被動態時，主動句中被省略的 to 必須「立刻還原」！',
            traps: [
              { wrong: 'He was made clean the room. ❌', correct: 'He was made to clean the room. ✔️', reason: 'make 在主動句省略 to，但在被動態必須補回 to (be made to V)。' }
            ]
          },
          {
            id: 'g10-s1-u3',
            unitNo: 'Arch-Prereq 3',
            title: 'Arch 先修專題 3：八大詞性與句型骨架全解密 (Parts of Speech)',
            indicator: 'Arch: parts-of-speech',
            sourceRef: 'arch:parts-of-speech',
            topics: ['名詞、代名詞、動詞、形容詞、副詞、介系詞、連接詞、感嘆詞', '詞性在句子中的定位法則 (Subject, Predicate, Object, Complement)', '字尾變換大腦思維導圖'],
            step0Clue: '看到句子只有一個主詞和一個動詞，其餘補充成分不是形容詞就是副詞或介系詞片語。',
            traps: [
              { wrong: 'She speaks English very good. ❌', correct: 'She speaks English very well. ✔️', reason: '修飾動詞 speaks 必須用副詞 well，good 是形容詞只能修飾名詞或當補詞。' }
            ]
          }
        ]
      },
      {
        semId: 'g10-s2',
        title: '高一下學期 (10下 · S2)',
        examFocus: '第一次段考 (對等與從屬連接詞)、第二次段考 (名詞子句與間接問句)、期末段考 (副詞子句與綜合閱讀)',
        units: [
          {
            id: 'g10-s2-u4',
            unitNo: 'Arch-S2 Review',
            title: '複合句、對等與從屬連接詞、名詞子句 (Arch englishS2Review)',
            indicator: 'Arch: englishS2Review',
            sourceRef: 'arch:english-s2',
            topics: ['對等連接詞 FANBOYS (For, And, Nor, But, Or, Yet, So)', '從屬連接詞三大族群：時間 (when/while), 原因 (because/since), 讓步 (although/though)', 'that / whether / 疑問詞引導名詞子句當主詞與受詞'],
            step0Clue: '兩個完整子句中間絕對不能只用一個逗號隔開 (Comma Splice 致命錯誤)，必須有對等連接詞或分號連接！',
            traps: [
              { wrong: 'I like coffee, my sister likes tea. ❌', correct: 'I like coffee, but my sister likes tea. / I like coffee; my sister likes tea. ✔️', reason: '逗號不能連接兩個獨立子句，此為逗號黏連 (Comma Splice) 錯誤。' }
            ]
          },
          {
            id: 'g10-s2-u5',
            unitNo: 'Arch-Prereq 2',
            title: 'Arch 先修專題 2：複合句與子句核心支柱 (Complex Sentences)',
            indicator: 'Arch: complex-sentences',
            sourceRef: 'arch:complex-sentences',
            topics: ['簡單句 (Simple)、複合句 (Compound)、複雜句 (Complex)、複合複雜句 (Compound-Complex)', '名詞子句當主詞時視為單數動詞 (That he failed is surprising.)', '標點符號與連接詞禁忌避坑指南'],
            step0Clue: '看名詞子句當主詞 (Whether we go or not...)，主要動詞一律用「第三人稱單數動詞」！',
            traps: [
              { wrong: 'That they are honest make everyone happy. ❌', correct: 'That they are honest makes everyone happy. ✔️', reason: 'That 引導的整個子句當主詞，屬於抽象單一概念，主要動詞需用單數 makes。' }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeId: 'g11',
    title: '高中十一年級 (Grade 11 / 高二 · 技高二)',
    stage: '第五學習階段 (高中深化與學測統測衝刺)',
    badge: '108 課綱進階語法與專業素養・高二決戰',
    desc: '關係子句 (限定與非限定)、關係副詞 (where, when, why)、分詞構句、假設語氣 (與現在/過去事實相反)、倒裝句、長篇多元文本閱讀與工程/職場專業字彙 (ESP)。',
    semesters: [
      {
        semId: 'g11-s1',
        title: '高二上學期 (11上 · S3)',
        examFocus: '第一次段考 (限定與非限定關係子句)、第二次段考 (關係副詞與介系詞提前)、期末段考 (分詞構句與動名詞進階)',
        units: [
          {
            id: 'g11-s1-u1',
            unitNo: 'Arch-S3 Review',
            title: '關係子句進階、關係副詞與分詞構句 (Arch englishS3Review)',
            indicator: 'Arch: englishS3Review',
            sourceRef: 'arch:english-s3',
            topics: ['非限定關係子句逗號用法 (專有名詞或唯一事物必須加逗號)', '關係副詞轉換：where = in/at which; when = on/in which; why = for which', '分詞構句簡化法則：主詞相同時省略連接詞與主詞，主動用 V-ing，被動用 p.p.'],
            step0Clue: '分詞構句簡化時，先找「主句的主詞是誰」；如果主詞主動發出該動作，選 V-ing；如果主詞承受動作，選 p.p.！',
            traps: [
              { wrong: 'Seeing from the top of the hill, the city looks beautiful. ❌', correct: 'Seen from the top of the hill, the city looks beautiful. ✔️', reason: '主句主詞是 the city，城市是被看 (被動)，因此必須使用過去分詞 Seen。' }
            ]
          }
        ]
      },
      {
        semId: 'g11-s2',
        title: '高二下學期 (11下 · S4)',
        examFocus: '第一次段考 (假設語氣時態倒退)、第二次段考 (否定副詞與地方副詞倒裝句)、期末大複習 (長篇工程與職場商務應用)',
        units: [
          {
            id: 'g11-s2-u2',
            unitNo: 'Arch-S4 Review',
            title: '假設語氣、倒裝句與多元職場素養閱讀 (Arch englishS4Review)',
            indicator: 'Arch: englishS4Review',
            sourceRef: 'arch:english-s4',
            topics: ['與現在事實相反：If + S + 過去式 (be動詞一律用 were), S + would/could/should/might + 原形 V', '與過去事實相反：If + S + had + p.p., S + would have + p.p.', '否定副詞倒裝：Never, Seldom, Rarely, Little, Not only 置於句首時，句子倒裝為助動詞 + S + V'],
            step0Clue: '看到否定副詞 (Never / Seldom / Not only) 放在句首，立刻找後面的助動詞倒裝結構 (Never have I seen...)！',
            traps: [
              { wrong: 'If I was rich, I will buy an airplane. ❌', correct: 'If I were rich, I would buy an airplane. ✔️', reason: '與現在事實相反的假設語氣，be 動詞標準寫法一律用 were，主要子句用 would + 原形 V。' }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeId: 'g12',
    title: '高三升學與國際檢定 (Grade 12 & Standardized Exams)',
    stage: '第五學習階段 (學測、統測、指考分科與國際證照)',
    badge: '大考滿級分與國際認證衝刺',
    desc: '全面整合國中教育會考 (CAP)、高中學測 (GSAT)、四技二專統測 (TVE)、全民英檢 (GEPT)、多益 (TOEIC)、SAT、GRE、GMAT、TOEFL 全方位高難度題庫與非選寫作。',
    semesters: [
      {
        semId: 'g12-cap',
        title: '國中教育會考歷屆真題庫 (CAP 109–115)',
        examFocus: '聽力測驗、單題文法字彙、克漏字與多元圖表題',
        units: [
          {
            id: 'cap-exam-suite',
            unitNo: 'CAP Suite',
            title: '109–115 國中教育會考英聽與閱讀全卷實戰與錯題歸納',
            indicator: 'CAP 109-115',
            sourceRef: 'jh:cap',
            topics: ['歷屆聽力三大部分：辨識句意、基本問答、言談理解', '閱讀素養題型：日常生活應用、科普短文、跨文化篇章', '非選作答範例與失分避雷針'],
            step0Clue: '會考聽力每題播放前有 5 秒鐘預覽選項，務必在聽音前快速圈出三張圖或三個選項的關鍵差異詞！',
            traps: [
              { wrong: '聽力一聽到選項中的某個單字就立刻選它。 ❌', correct: '聽懂整句意圖，防範誘答音（干擾項常直接唸出原文某個單字）。 ✔️', reason: '會考聽力常設有同音或同字誘答，必須確認對話者真正的意圖與時態。' }
            ]
          }
        ]
      },
      {
        semId: 'g12-gsat',
        title: '大學學測與統測歷屆真題庫 (GSAT & TVE 108–115)',
        examFocus: '詞彙題 (1-15)、綜合測驗、文意選填、篇章結構、閱讀測驗、中譯英與英文作文',
        units: [
          {
            id: 'gsat-exam-suite',
            unitNo: 'GSAT Suite',
            title: '108–115 大學學測與統測英文真題詳解大數據庫',
            indicator: 'GSAT / TVE 108-115',
            sourceRef: 'eng:gsat',
            topics: ['大考中心 7000 字表第 4-5 級高頻詞彙', '篇章結構五大邏輯連鎖解題心法', '中譯英雙句翻譯技巧與五大評分規準 (Rubrics)', '圖表看圖寫作與論說文段落佈局 (Topic Sentence, Supporting Details, Conclusion)'],
            step0Clue: '中譯英翻譯題：先斷句抓出中文的主詞與動詞，判定時態與語態，再決定是否需要使用關係子句或分詞構句修飾！',
            traps: [
              { wrong: '英文作文一段到底沒有分段。 ❌', correct: '標準作文寫作必備兩至三段（引言段、主體論證段、結論段）。 ✔️', reason: '大考中心評分規準明定篇章結構分，未分段或分段不當將嚴重失分。' }
            ]
          }
        ]
      }
    ]
  }
];
"""

with open(os.path.join(DIST_DIR, "curriculum_unified.mjs"), "w", encoding="utf-8") as f:
    f.write(code)

print("Created dist/curriculum_unified.mjs successfully!")
