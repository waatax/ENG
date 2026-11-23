// Ultralearning (Scott H. Young) + Get Better at Anything (See -> Do -> Feedback)
// Unified All-Stage English & Exam Mastery Engine (Pre-A1 through C1+)

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const UL_STORAGE_KEY = 'eq_ultralearning_v1';

export const LEARNING_PILLARS = [
  {
    id: 'see',
    code: 'SEE · 看懂範式',
    book: 'Get Better at Anything Part I · Ultralearning P1/P8',
    title: '從拆解典範開始，降低工作記憶負荷',
    summary: '先畫出考科的後設學習地圖（觀念 / 事實 / 程序），透過「已解範例（Worked Example）」與專家拆題步驟把隱性能力顯性化，避免盲目試錯。',
    tactics: ['後設地圖（10% 前置規劃）', '已解範例 → 漸退提示', '專家認知拆解（3 步掃題）', '費曼直覺（一句話講懂）']
  },
  {
    id: 'do',
    code: 'DO · 實戰精煉',
    book: 'Get Better at Anything Part II · Ultralearning P2–P5',
    title: '在 75–85% 甜蜜難度區做直接、交錯、閉書提取練習',
    summary: '直接練真實考題與語境（Directness），用「交錯變異（Interleaving）」取代死背重複，鎖定最弱瓶頸（Direct → Drill）並以閉書提取（Retrieval）強化記憶。',
    tactics: ['直接學習真實考型', '75–85% 甜蜜區自適應', '交錯變異題型練習', '閉書主動提取勝過重讀']
  },
  {
    id: 'feedback',
    code: 'FEEDBACK · 糾錯固化',
    book: 'Get Better at Anything Part III · Ultralearning P6–P9',
    title: '即時糾錯去慣性，用分級暴露克服考場與開口恐懼',
    summary: '區分結果／資訊／修正三層回饋，主動「去學習（Unlearn）」石化中式英文陷阱，再以間隔複習＋過度學習＋限時分級暴露，把能力轉成考場自動化反射。',
    tactics: ['結果→資訊→修正三層回饋', '去學習石化錯覺（Unlearning）', '間隔複習＋程序化過度學習', '分級限時暴露（0.8×→1.25×）']
  }
];

export const STAGE_EXAM_BLUEPRINTS = [
  {
    id: 'elementary',
    stage: '國小階段',
    cefr: 'Pre-A1 → A1',
    exams: '劍橋兒童英檢 YLE (Starters/Movers) · 國小六上六下銜接',
    targetHref: '#sixth',
    questHref: 'quest/#learn/s1',
    examHref: '#exams',
    accent: '#059669',
    metalearning: {
      benchmark: '掌握 300–600 生活高頻字、自然發音直覺拼讀與基礎 Be / 一般動詞直述問答，達 85% 正確率即具備升國中先備力。',
      concepts: ['主詞＋be 動詞 / 一般動詞基本語序', '可數名詞單複數與 a / an / the', '現在進行式與時間介系詞 (in/on/at)'],
      facts: ['300–600 教室、家庭、食物、交通、天氣生活核心字彙', '26 字母音與 44 常見自然發音組合'],
      procedures: ['看圖→聽音→跟讀→不看字拼出核心句', '先找主詞「誰」，再決定 be 動詞或一般動詞'],
      emphasize: '聽音辨字、朗讀語塊與高頻日常問答（先建立成功感與音義連結）',
      exclude: '暫不死背複雜文法術語或超綱抽象字彙'
    },
    seeWorkedExample: {
      prompt: 'Look! Tom ___ basketball in the park right now.',
      steps: [
        '① 掃描時間線索：看到 Look! 與 right now → 動作「此刻正在發生」。',
        '② 對應句型模板：現在進行式必須是「be 動詞 + V-ing」。',
        '③ 核對主詞單複數：Tom 是第三人稱單數 → 用 is playing（不可漏掉 is）。'
      ],
      feynman: '只要句子裡有 Look! / Listen! / now，動作就像正在直播中，動詞一定要穿「be + V-ing」兩件衣服！'
    },
    unlearnTraps: [
      { wrong: 'I very like apples.', why: '中式直譯「我很喜歡」，very 不能直接修飾一般動詞 like。', right: 'I like apples very much.' },
      { wrong: 'She happy today.', why: '中文「她今天很開心」沒有「是」，英文形容詞前必須補 be 動詞。', right: 'She is happy today.' },
      { wrong: 'Tom playing now.', why: '現在進行式漏掉 be 動詞，V-ing 不能單獨當句子主要動詞。', right: 'Tom is playing now.' }
    ],
    exposureLadder: [
      '階段 1（安全複製）：0.85× 慢速跟讀單句 3 次',
      '階段 2（漸退提示）：遮住英文只看圖片說出完整句',
      '階段 3（真實微考）：1.0× 聽力選圖＋3 分鐘 5 題快測達 85%'
    ],
    drills: [
      {
        id: 'el-1',
        skill: '時態線索（See→Do）',
        prompt: 'Listen! The birds ___ in the tree now.',
        options: ['sing', 'is singing', 'are singing', 'singing'],
        answer: 2,
        why: 'Listen! 與 now 表示此刻正在進行，主詞 The birds 為複數，故用 are singing。',
        wrong: {
          '0': 'sing 是現在簡單式（習慣），但 Listen! + now 強調「此刻正在唱」。',
          '1': 'The birds 是複數（不只一隻鳥），be 動詞應配合複數用 are，而非單數 is。',
          '3': 'singing 缺少 be 動詞，不能單獨構成完整現在進行式。'
        }
      },
      {
        id: 'el-2',
        skill: '去中式慣性（Unlearning）',
        prompt: '選出最道地的「我非常喜歡閱讀」：',
        options: ['I very like reading.', 'I like reading very much.', 'I am very like reading.', 'I much like reading.'],
        answer: 1,
        why: '修飾一般動詞 like 的程度副詞片語 very much 要放在受詞之後。',
        wrong: {
          '0': '典型中式直譯陷阱！very 只能修飾形容詞/副詞，不可直接放動詞 like 前面。',
          '2': 'am 與一般動詞原形 like 不能直接連用，且 very 仍不可修飾 like。',
          '3': '肯定句中不說 much like，標準用法是 like ... very much。'
        }
      },
      {
        id: 'el-3',
        skill: '交錯介系詞（Variability）',
        prompt: 'My birthday party is ___ Sunday afternoon.',
        options: ['in', 'at', 'on', 'to'],
        answer: 2,
        why: '特定日期或「特定某天的早午晚」（Sunday afternoon）一律用介系詞 on。',
        wrong: {
          '0': 'in 用於泛指上午/下午（in the afternoon），一旦加上星期幾（Sunday）就必須改用 on。',
          '1': 'at 用於精確鐘點（at 3:00）或 noon/night，不用於星期幾的下午。',
          '3': 'to 表方向或目的，不用來接時間點。'
        }
      }
    ]
  },
  {
    id: 'junior',
    stage: '國中 JH 階段（會考 A++ 衝刺）',
    cefr: 'A1 → B1',
    exams: '國中教育會考 (CAP) 精熟 A++ · 全民英檢 GEPT 初級',
    targetHref: '#jh',
    questHref: 'quest/#school',
    examHref: '#exams',
    accent: '#2563eb',
    metalearning: {
      benchmark: '熟練 1,200 基本字彙＋800 延伸字、國中 6 學期核心文法與 45% 素養圖表閱讀，聽力 21 題與閱讀 43 題達 88%+ 穩拿會考 A++。',
      concepts: ['六大核心時態（含現在完成式 since/for）', '被動語態、感官/使役動詞、不定詞與動名詞', '形容詞子句（關代）與名詞子句（間接問句）'],
      facts: ['108 課綱 1,200 必考字與高頻片語（look forward to, be used to, spend...V-ing）', '會考圖表常見資訊字（discount, valid until, departure, refund）'],
      procedures: ['單選題 30 秒掃時間詞與結構（15 題省時）', '圖表題「先讀題幹條件→再回圖定位」', '克漏字讀前後句邏輯轉折，閱讀題找同義替換證據'],
      emphasize: 'Direct-Then-Drill 鎖定「時態/子句/花費動詞/閱讀推論」四大失分瓶頸與聽力弱讀連音',
      exclude: '避免逐字翻譯長篇文章或無差別刷過難的高中冷僻字'
    },
    seeWorkedExample: {
      prompt: 'Although it rained heavily yesterday, ___ we still went hiking.',
      steps: [
        '① 辨識連接詞配對：句首已出現從屬連接詞 Although（雖然）。',
        '② 啟動去學習雷達：中文常說「雖然…但是…」，但英文一個句子只能有一個連接詞，絕不可再加 but！',
        '③ 確認正解：空格直接留空（填 ✕ / 不填連接詞），保留主子句 we still went hiking。'
      ],
      feynman: '英文連接詞像「橋梁」：兩座島（兩個子句）只需要一座橋（Although 或 but 擇一），蓋兩座橋就會撞在一起！'
    },
    unlearnTraps: [
      { wrong: 'Although he was tired, but he finished it.', why: '中文「雖然…但是…」干擾，英文 Although 與 but 不可並存。', right: 'Although he was tired, he finished it.' },
      { wrong: 'I spend two hours to do homework.', why: '混淆 spend 與 take 句型：人 + spend + 時間 + (in) V-ing。', right: 'I spend two hours doing homework.' },
      { wrong: 'Do you know where does he live?', why: '間接問句（名詞子句）誤保留疑問句倒裝助動詞 does。', right: 'Do you know where he lives?' }
    ],
    exposureLadder: [
      '階段 1（已解範例）：先看 3 步拆題再做同結構仿寫',
      '階段 2（交錯變異）：混合時態＋子句＋花費動詞 10 題不分類快測',
      '階段 3（真實暴露）：會考 1.0×/1.15× 聽力＋限時 20 題模擬考達 85%+'
    ],
    drills: [
      {
        id: 'jh-1',
        skill: '會考必考：現在完成式 vs 過去式',
        prompt: 'Kevin ___ in Taipei since he graduated from junior high school.',
        options: ['lived', 'has lived', 'lives', 'is living'],
        answer: 1,
        why: 'since + 過去時間點（since he graduated...）表示動作從過去持續至今，主要子句必須用現在完成式 has lived。',
        wrong: {
          '0': 'lived 是過去簡單式，代表動作已在過去結束，無法搭配 since 持續到現在。',
          '2': 'lives 是現在簡單式（習慣/事實），與 since 明確起點搭配不合文法。',
          '3': 'is living 是現在進行式，不與 since 連用來表達長年持續狀態。'
        }
      },
      {
        id: 'jh-2',
        skill: '會考陷阱：間接問句語序（Unlearning）',
        prompt: 'Could you tell me ___?',
        options: ['what time does the train leave', 'what time the train leaves', 'what time did the train leave', 'does the train leave what time'],
        answer: 1,
        why: '間接問句當 tell 的受詞（名詞子句），必須恢復「疑問詞 + 主詞 + 動詞」的直述語序，不可倒裝。',
        wrong: {
          '0': '保留了直接問句的倒裝助動詞 does！在 Could you tell me 後面應改回直述語序 the train leaves。',
          '2': 'did the train leave 仍是疑問倒裝語序，名詞子句內不可用 did 倒裝。',
          '3': '語序完全錯置，疑問詞 what time 必須放在名詞子句開頭。'
        }
      },
      {
        id: 'jh-3',
        skill: '會考核心：感官/使役與被動語態',
        prompt: 'The classroom ___ by the students every afternoon after school.',
        options: ['cleans', 'cleaned', 'is cleaned', 'has cleaned'],
        answer: 2,
        why: '主詞 The classroom（教室）是被打掃的對象，加上 every afternoon（現在習慣），故用現在簡單式被動 is cleaned。',
        wrong: {
          '0': 'cleans 是主動語態，教室不會自己打掃，看到 by the students 要立即反應被動語態。',
          '1': 'cleaned 是過去主動，既不符合被動語意，也不符合 every afternoon 的現在習慣。',
          '3': 'has cleaned 是現在完成主動，依然誤把教室當作執行動作的主詞。'
        }
      }
    ]
  },
  {
    id: 'senior',
    stage: '高中 SH 階段（學測頂標 / 統測）',
    cefr: 'B1 → B2',
    exams: '高中學測 (GSAT) 頂標 · 技專統測 (TVE) · GEPT 中級',
    targetHref: '#arch',
    questHref: 'quest/#school',
    examHref: '#exams',
    accent: '#7c3aed',
    metalearning: {
      benchmark: '精通 4,500–7,000 字彙精準搭配、分詞構句與假設語氣、篇章結構與混合題證據提取，學測選擇題穩拿 85%+ 並寫出 15+ 分兩段式作文。',
      concepts: ['分詞構句與獨立分詞（主詞一致檢驗）', '假設語氣（與現在/過去事實相反、倒裝省略 if）', '轉折語與篇章指代（However / Nevertheless / Hence）'],
      facts: ['大考中心 Level 3–5 高頻動詞搭配（account for, give rise to, cope with）', '易混詞族與字根字首（adapt/adopt, affect/effect, compose/comprise）'],
      procedures: ['文意選填：先標註選項詞性 (n./v./adj./adv.) 再依空格語法篩選', '篇章結構：鎖定段首代名詞（this/such/these）與邏輯轉折詞', '學測作文：主題句 (Topic Sentence) → 具體細節 → 因果/反思收尾'],
      emphasize: '字彙語境搭配、長難句主幹拆解、分詞/假設語氣精準辨識與中翻英主謂架構',
      exclude: '避免孤立背單字表不看搭配詞（collocation）與例句語境'
    },
    seeWorkedExample: {
      prompt: '___ from the top of the mountain, the city looks like a sea of lights.',
      steps: [
        '① 鎖定主子句主詞：逗號後真正的主詞是 the city（城市）。',
        '② 判斷主動或被動：城市是「被從山頂俯瞰」（be seen），不是自己去看。',
        '③ 選擇分詞：被動關係直接用過去分詞 Seen（不可用 Seeing，否則會變成「城市自己看著山頂」的懸垂修飾錯）。'
      ],
      feynman: '分詞構句開頭省略的主詞，一定要跟逗號後面的主詞是同一個人／物！把後面主詞搬回前面問「是它主動做，還是被做？」就能秒殺！'
    },
    unlearnTraps: [
      { wrong: 'Despite of the heavy rain, we arrived on time.', why: '把 despite（介系詞）與 in spite of 混在一起多加了 of。', right: 'Despite the heavy rain, we arrived on time.' },
      { wrong: 'I look forward to see you soon.', why: '誤把 look forward to 的介系詞 to 當成不定詞 to + VR。', right: 'I look forward to seeing you soon.' },
      { wrong: 'Seeing from the hill, the village looks tiny.', why: '懸垂分詞錯：村莊是被看見，應使用過去分詞 Seen。', right: 'Seen from the hill, the village looks tiny.' }
    ],
    exposureLadder: [
      '階段 1（結構顯影）：先劃掉介系詞片語與關代子句，抓出長句主幹',
      '階段 2（交錯克漏）：混合轉折詞、分詞構句、假設語氣 10 題精練',
      '階段 3（大考限時）：學測 20 題模考（每題 ≤ 45 秒）＋寫作支架仿寫'
    ],
    drills: [
      {
        id: 'sh-1',
        skill: '學測高頻：分詞構句主被動',
        prompt: '___ by the sudden noise, the baby started to cry loudly.',
        options: ['Frightening', 'Frightened', 'To frighten', 'Having frightening'],
        answer: 1,
        why: '主詞 the baby 是「感到驚嚇／被嚇到」（be frightened by），故用過去分詞 Frightened。',
        wrong: {
          '0': 'Frightening 表「令人害怕的」（主動），嬰兒不是嚇人的人，而是被噪音嚇到。',
          '2': 'To frighten 表目的「為了去嚇…」，與後句嬰兒大哭的因果關係不合。',
          '3': 'Having frightening 文法錯誤，完成分詞應為 Having + p.p.，且此處表被動只需 Frightened。'
        }
      },
      {
        id: 'sh-2',
        skill: '學測必殺：讓步介系詞 vs 連接詞',
        prompt: '___ the tight deadline, the engineering team delivered a flawless prototype.',
        options: ['Although', 'Despite of', 'Despite', 'Even though'],
        answer: 2,
        why: '空格後 the tight deadline 是名詞片語而非完整子句，必須用介系詞 Despite（且不可加 of）。',
        wrong: {
          '0': 'Although 是連接詞，後面必須接含主詞與動詞的完整子句（如 Although the deadline was tight）。',
          '1': 'Despite of 是大考最愛考的混合陷阱！正確寫法是 Despite（無 of）或 in spite of。',
          '3': 'Even though 與 Although 一樣是連接詞，後方不能只接名詞片語。'
        }
      },
      {
        id: 'sh-3',
        skill: '學測進階：與過去事實相反假設',
        prompt: 'Had she checked the schedule earlier, she ___ the flight.',
        options: ['would not miss', 'will not miss', 'would not have missed', 'did not miss'],
        answer: 2,
        why: 'Had she checked... 是 If she had checked... 的倒裝（與過去事實相反），主子句須用 would not have + p.p.。',
        wrong: {
          '0': 'would not miss 用於與「現在」事實相反，但 Had she checked 明確指向過去事件。',
          '1': 'will not miss 是真實條件句未來式，不適用於與過去相反的假設語氣。',
          '3': 'did not miss 是過去事實直述，缺少假設語氣助動詞 would have。'
        }
      }
    ]
  },
  {
    id: 'career',
    stage: '大學與職場階段（TOEIC 860+ / GEPT 中高級）',
    cefr: 'B1+ → B2+',
    exams: '多益 TOEIC 金色證書 (860+) · 全民英檢 GEPT 中高級',
    targetHref: '#exams',
    questHref: 'quest/#exams/toeic',
    examHref: '#exams',
    accent: '#0284c7',
    metalearning: {
      benchmark: 'Part 5 單句填空每題 ≤ 20 秒、Part 7 雙/三篇商務文件交叉定位零遺漏，聽力適應美/英/加/澳口音與同義改寫，總分衝刺 860+ 金色證書。',
      concepts: ['詞性快速辨識（名詞/形容詞/副詞/動詞字尾）', '商務條件句、分詞修飾與主詞動詞遠距一致', 'Part 7 跨文本交叉比對（Email + Invoice + Schedule）'],
      facts: ['商務高頻核心字（reimburse, itinerary, compliance, tentative, expedite, discrepancy）', '聽力同義替換對照（postpone = put off / reschedule; out of stock = unavailable）'],
      procedures: ['Part 5：先看選項！同字根考詞性直接看空格前後 3 字秒殺', 'Part 3/4 聽力：音檔播放前 5 秒先讀題幹關鍵字（Who/Where/Next）', 'Part 7：先看題目類型，細節題找專有名詞與數字，推論題對照兩篇日期與附註'],
      emphasize: '速度＋精準度雙軌訓練（Part 5 詞性秒殺、Part 3/4 預讀與同義轉換）',
      exclude: '避免在 Part 5 逐字精讀整句浪費時間，導致 Part 7 最後 15 題寫不完'
    },
    seeWorkedExample: {
      prompt: 'The revised budget must be submitted ___ by Friday at 5:00 p.m.',
      steps: [
        '① 先掃選項（若為 prompt / promptly / promptness / prompting）：四個字同字根 → 確定考「詞性」！',
        '② 看空格前後：前面已有完整被動動詞片語 must be submitted，空格修飾動詞「如何提交」。',
        '③ 3 秒鎖定答案：修飾動詞用副詞 promptly，根本不必浪費時間翻譯整句！'
      ],
      feynman: '多益 Part 5 有一半都是「結構填空」：看到同字根四選一，先看空格左右鄰居缺什麼詞性，3 秒就拿分，把時間留給 Part 7！'
    },
    unlearnTraps: [
      { wrong: 'We will discuss about the contract tomorrow.', why: 'discuss 是及物動詞，本身已含「關於」，不可加 about。', right: 'We will discuss the contract tomorrow.' },
      { wrong: 'Please provide me the updated informations.', why: 'information 為不可數名詞（不可加 s），且 provide 人 with 物。', right: 'Please provide me with the updated information.' },
      { wrong: 'The manager recommended me to attend the seminar.', why: 'recommend 不可接人 + to V，須用 that 子句（動詞用原形）或 V-ing。', right: 'The manager recommended that I attend the seminar.' }
    ],
    exposureLadder: [
      '階段 1（秒殺節奏）：Part 5 10 題限時 3 分鐘（每題 ≤ 18 秒）',
      '階段 2（多口音辨識）：1.0× → 1.15× 商務對話＋同義替換聽寫',
      '階段 3（耐力模擬）：20–40 題連續不中斷模考，訓練 Part 7 後段專注力'
    ],
    drills: [
      {
        id: 'cr-1',
        skill: 'TOEIC Part 5：3 秒詞性判定',
        prompt: 'All travel expense reports must be reviewed ___ before reimbursement is approved.',
        options: ['thorough', 'thoroughly', 'thoroughness', 'more thorough'],
        answer: 1,
        why: '空格位於完整被動語態 must be reviewed 之後，需副詞 thoroughly 修飾動詞 reviewed。',
        wrong: {
          '0': 'thorough 是形容詞，無法修飾動詞片語 must be reviewed。',
          '2': 'thoroughness 是名詞，被動動詞後方不應直接接名詞當受詞。',
          '3': 'more thorough 仍是形容詞比較級，此處需要副詞。'
        }
      },
      {
        id: 'cr-2',
        skill: 'TOEIC 高頻陷阱：及物動詞與搭配',
        prompt: 'The logistics team will ___ the shipment delay at tomorrow’s briefing.',
        options: ['discuss about', 'address', 'explain about', 'mention about'],
        answer: 1,
        why: 'address（處理／談及）為及物動詞，直接接受詞 the shipment delay；discuss / explain / mention 皆不加 about。',
        wrong: {
          '0': 'discuss 為及物動詞，加 about 是多益最常見中式陷阱。',
          '2': 'explain 直接接受詞（explain the delay），不加 about。',
          '3': 'mention 直接接受詞（mention the delay），不加 about。'
        }
      },
      {
        id: 'cr-3',
        skill: 'TOEIC 商務語境：精準選字',
        prompt: 'Due to a ___ in the invoice figures, the accounting department paused payment.',
        options: ['discrepancy', 'itinerary', 'compliment', 'occupancy'],
        answer: 0,
        why: 'discrepancy 意為「（帳目／數據）不一致、出入」，最符合發票數字異常導致暫停付款的語境。',
        wrong: {
          '1': 'itinerary 是「行程表」，與發票數字異常無關。',
          '2': 'compliment 是「讚美」，語意不符。',
          '3': 'occupancy 是「入住率／佔用率」，多用於飯店或空間租賃。'
        }
      }
    ]
  },
  {
    id: 'academic',
    stage: '國際學術與留學階段（SAT / GRE / GMAT / IELTS）',
    cefr: 'B2+ → C1+',
    exams: 'Digital SAT · GRE Verbal · GMAT Focus · IELTS / TOEFL',
    targetHref: '#advanced',
    questHref: 'quest/#exams/sat',
    examHref: '#exams',
    accent: '#db2777',
    metalearning: {
      benchmark: '精準拆解學術長難句、論證假設／削弱／加強結構、GRE 雙選語意極性與 SAT 修辭精簡原則，達到 C1 學術批判閱讀與證據寫作水準。',
      concepts: ['論證三要素（Claim 主張 / Evidence 證據 / Hidden Assumption 隱含假設）', '語意極性與邏輯轉折（concession, contrast, causal reversal）', '修辭經濟原則（Economy of Expression）與對照組檢驗'],
      facts: ['GRE/SAT 高階學術態度詞（tentative, corroborates, undermines, equivocal, pragmatism）', '邏輯謬誤標籤（自選擇偏差、相關誤當因果、倖存者偏差、過度類推）'],
      procedures: ['SAT/GRE 填空：先不看選項，靠轉折詞自己預測空格「正負極性與語意方向」（閉書預測）', 'GMAT 假設題：使用「否定測試法（Negation Test）」——否定選項後若結論崩潰即為必備假設', '學術閱讀：先區分作者立場 vs 被引用學者的觀點'],
      emphasize: '先預測再看選項（避免被漂亮干擾項誘導）、邏輯結構顯影與反例檢驗',
      exclude: '避免憑主觀常識或「聽起來很合理」選答，一切以文本證據為唯一依據'
    },
    seeWorkedExample: {
      prompt: 'While early critics dismissed the theory as speculative, recent fossil discoveries have ___ its core predictions.',
      steps: [
        '① 鎖定邏輯訊號：While 帶出「讓步對比」——前半句是負向（dismissed as speculative 斥為臆測）。',
        '② 閉書預測極性：後半句必須轉為正向「證實／支持」其核心預測。',
        '③ 精準比對選項：秒選 corroborated（證實），直接排除 undermined（削弱）或 echoed（僅重複未證實）。'
      ],
      feynman: '學術大考不考你背了多少冷僻字，考的是「邏輯箭頭」：先用轉折詞畫出同向 (=) 或反向 (≠) 箭頭，自己先填一個簡單英文詞，再找最貼近的選項！'
    },
    unlearnTraps: [
      { wrong: '看到選項用了文章原字就直接選', why: 'SAT/GRE/IELTS 干擾項最愛用原文詞彙拼湊錯誤因果；正解幾乎都是同義改寫。', right: '核對主張範圍與邏輯關係，優先辨識同義改寫（Paraphrase）' },
      { wrong: '把「A 與 B 同時發生」當成「A 導致 B」', why: '忽略共同第三因素（confounding variable）或自選擇偏差。', right: '檢查是否有對照組、時間先後與替代解釋' },
      { wrong: '選用冗長華麗但偏離題目目標的句子', why: 'Digital SAT 修辭綜合題只獎勵精準滿足題幹特定目標的選項。', right: '逐一比對題幹要求（如 emphasize a difference / introduce a study）' }
    ],
    exposureLadder: [
      '階段 1（閉書預測）：遮住選項，只看題幹先口頭說出邏輯方向',
      '階段 2（論證拆解）：每天精拆 3 題 SAT/GMAT 削弱與假設題並寫出反例',
      '階段 3（自適應高壓）：限時 20 題高階模考（SAT/GRE/GMAT 交錯）達 85%+'
    ],
    drills: [
      {
        id: 'ac-1',
        skill: 'SAT / GRE：轉折極性預測',
        prompt: 'Far from being ___, the committee’s final report offered concrete, step-by-step funding proposals.',
        options: ['pragmatic', 'vague', 'meticulous', 'persuasive'],
        answer: 1,
        why: 'Far from being X（絕非 X）與後半句 concrete, step-by-step（具體、按部就班）形成反差，故 X 必為「模糊籠統的」vague。',
        wrong: {
          '0': 'pragmatic 是「務實的」，與後半句具體方案同向，放進 Far from being 後會造成語意矛盾。',
          '2': 'meticulous 是「一絲不苟的」，與 concrete 同向而非反差。',
          '3': 'persuasive 是「具說服力的」，無法與具體方案構成 Far from 的對比。'
        }
      },
      {
        id: 'ac-2',
        skill: 'GMAT / SAT：因果論證削弱',
        prompt: 'A district introduced tablets and saw math scores rise 8%. Which finding most weakens the claim that tablets caused the gain?',
        options: [
          'Teachers also received 40 hours of new math-instruction coaching that same semester.',
          'Students enjoyed using the tablets during class.',
          'The tablets had longer battery life than older laptops.',
          'Neighboring districts purchased tablets from a different brand.'
        ],
        answer: 0,
        why: '同一學期老師也接受了 40 小時新數學教學培訓，提供了強力的「替代原因（alternative cause）」，直接削弱「平板導致進步」的單一因果主張。',
        wrong: {
          '1': '學生喜歡使用平板無法削弱「平板導致成績上升」，甚至略微支持。',
          '2': '電池續航力與數學成績提升的因果歸因無關。',
          '3': '鄰近學區買不同品牌並未提供其成績變化對照，無法削弱因果。'
        }
      },
      {
        id: 'ac-3',
        skill: 'Digital SAT：標準英文精簡與結構',
        prompt: 'Architects studying ancient Roman concrete ___ that seawater actually strengthens the material over centuries.',
        options: ['has discovered', 'discovering', 'have discovered', 'having discovered'],
        answer: 2,
        why: '主詞是複數 Architects（studying ancient Roman concrete 是分詞片語修飾主詞），需要複數主要動詞 have discovered。',
        wrong: {
          '0': '主詞是複數 Architects 而非單數 concrete，不可用單數助動詞 has。',
          '1': 'discovering 是現在分詞，整句會缺少主要動詞（fragment）。',
          '3': 'having discovered 同樣是非限定分詞，無法擔任句子主要動詞。'
        }
      }
    ]
  }
];

export function readUltralearningState(storage = null) {
  const s = storage || (() => { try { return globalThis.localStorage; } catch { return null; } })();
  const fallback = { activeStage: 'junior', answers: {}, completedExposure: {}, updatedAt: null };
  if (!s) return fallback;
  try {
    const raw = JSON.parse(s.getItem(UL_STORAGE_KEY) || '{}');
    return {
      activeStage: STAGE_EXAM_BLUEPRINTS.some((b) => b.id === raw.activeStage) ? raw.activeStage : 'junior',
      answers: raw.answers && typeof raw.answers === 'object' ? raw.answers : {},
      completedExposure: raw.completedExposure && typeof raw.completedExposure === 'object' ? raw.completedExposure : {},
      updatedAt: raw.updatedAt || null
    };
  } catch {
    return fallback;
  }
}

export function saveUltralearningState(state, storage = null) {
  const s = storage || (() => { try { return globalThis.localStorage; } catch { return null; } })();
  if (!s) return false;
  try {
    s.setItem(UL_STORAGE_KEY, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }));
    return true;
  } catch {
    return false;
  }
}

export function recordUltralearningAnswer(drillId, choiceIdx, storage = null) {
  const state = readUltralearningState(storage);
  state.answers[String(drillId)] = Number(choiceIdx);
  saveUltralearningState(state, storage);
  return state;
}

export function toggleExposureStep(stageId, stepIdx, storage = null) {
  const state = readUltralearningState(storage);
  const key = `${stageId}:${stepIdx}`;
  state.completedExposure[key] = !state.completedExposure[key];
  saveUltralearningState(state, storage);
  return state;
}

export function setUltralearningStage(stageId, storage = null) {
  const state = readUltralearningState(storage);
  if (STAGE_EXAM_BLUEPRINTS.some((b) => b.id === stageId)) {
    state.activeStage = stageId;
    saveUltralearningState(state, storage);
  }
  return state;
}

export function resetUltralearningStage(stageId, storage = null) {
  const state = readUltralearningState(storage);
  const bp = STAGE_EXAM_BLUEPRINTS.find((b) => b.id === stageId);
  if (bp) {
    for (const d of bp.drills) delete state.answers[d.id];
    saveUltralearningState(state, storage);
  }
  return state;
}

export function evaluateSweetSpot(correct, attempted) {
  if (!attempted) {
    return {
      zone: 'unstarted',
      label: '尚未檢測 · 先做 3 題閉書提取',
      rate: 0,
      advice: '依據《Ultralearning》提取原則：在覺得「準備好」之前就先測 3 題，大腦對後續解析的記憶力會倍增。'
    };
  }
  const rate = Math.round((correct / attempted) * 100);
  if (rate >= 95) {
    return {
      zone: 'too-easy',
      label: `${rate}% · 舒適區（該加難度了！）`,
      rate,
      advice: '你已突破 85% 精熟門檻！依據《Get Better at Anything》第 5/12 章，立即進入下一級「限時分級暴露」或挑戰上一階段考制。'
    };
  }
  if (rate >= 75) {
    return {
      zone: 'sweet-spot',
      label: `${rate}% · 黃金甜蜜難度區 (75–90%)`,
      rate,
      advice: '最理想的大腦成長區！繼續保持交錯變異練習，並把偶爾出錯的那 1 題加入「Direct → Drill」單點爆破。'
    };
  }
  return {
    zone: 'overload',
    label: `${rate}% · 認知超載區 (<75% · 先回看範例)`,
    rate,
    advice: '工作記憶負荷過高！依據《Get Better at Anything》第 2 章：先回到上方「SEE 已解範例」讀懂 3 步拆題，再重試本階段題目直到突破 85%。'
  };
}

export function computeStageReadiness(stageId, state = readUltralearningState()) {
  const bp = STAGE_EXAM_BLUEPRINTS.find((b) => b.id === stageId) || STAGE_EXAM_BLUEPRINTS[1];
  let attempted = 0;
  let correct = 0;
  for (const d of bp.drills) {
    if (Object.hasOwn(state.answers, d.id)) {
      attempted++;
      if (state.answers[d.id] === d.answer) correct++;
    }
  }
  const exposureDone = bp.exposureLadder.filter((_, i) => state.completedExposure[`${bp.id}:${i}`]).length;
  const drillScore = bp.drills.length ? Math.round((correct / bp.drills.length) * 70) : 0;
  const exposureScore = bp.exposureLadder.length ? Math.round((exposureDone / bp.exposureLadder.length) * 30) : 0;
  const readiness = Math.min(100, drillScore + exposureScore);
  const sweetSpot = evaluateSweetSpot(correct, attempted);
  const passedGate = attempted === bp.drills.length && (correct / bp.drills.length) >= 0.85;
  return {
    stageId: bp.id,
    attempted,
    totalDrills: bp.drills.length,
    correct,
    exposureDone,
    totalExposure: bp.exposureLadder.length,
    readiness,
    passedGate,
    sweetSpot
  };
}

export function renderUltralearningMasteryHub(options = {}) {
  const state = options.state || readUltralearningState();
  const stageId = options.forceStage || state.activeStage || 'junior';
  const bp = STAGE_EXAM_BLUEPRINTS.find((b) => b.id === stageId) || STAGE_EXAM_BLUEPRINTS[1];
  const metrics = computeStageReadiness(bp.id, state);
  const compact = !!options.compact;

  const stageTabs = options.forceStage ? '' : `
    <div class="ul-stage-tabs" role="tablist" aria-label="各階段英文與檢定考試切換">
      ${STAGE_EXAM_BLUEPRINTS.map((s) => {
        const m = computeStageReadiness(s.id, state);
        const active = s.id === bp.id;
        return `<button type="button" role="tab" aria-selected="${active}" class="ul-stage-tab ${active ? 'is-active' : ''}" data-ul-stage="${s.id}" style="--stage-accent:${s.accent}">
          <span class="ul-tab-cefr">${esc(s.cefr)}</span>
          <strong>${esc(s.stage)}</strong>
          <small>${m.readiness}% 就緒</small>
        </button>`;
      }).join('')}
    </div>
  `;

  const pillarsStrip = compact ? '' : `
    <div class="ul-pillars-grid">
      ${LEARNING_PILLARS.map((p) => `
        <article class="ul-pillar-card ul-pillar-${p.id}">
          <span class="ul-pillar-code">${esc(p.code)}</span>
          <h4>${esc(p.title)}</h4>
          <p>${esc(p.summary)}</p>
          <div class="ul-tactic-chips">${p.tactics.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
          <small class="ul-book-ref">${esc(p.book)}</small>
        </article>
      `).join('')}
    </div>
  `;

  const drillsHtml = bp.drills.map((d, idx) => {
    const hasPick = Object.hasOwn(state.answers, d.id);
    const pick = hasPick ? state.answers[d.id] : null;
    const isRight = hasPick && pick === d.answer;
    const wrongMsg = hasPick && !isRight ? (d.wrong?.[String(pick)] || d.why) : '';
    return `
      <div class="ul-drill-item" data-ul-drill="${esc(d.id)}">
        <div class="ul-drill-meta">
          <span class="ul-drill-badge">實戰 ${idx + 1} · ${esc(d.skill)}</span>
          ${hasPick ? `<span class="ul-drill-status ${isRight ? 'ok' : 'err'}">${isRight ? '✅ 提取成功' : '🔍 啟動糾錯'}</span>` : '<span class="ul-drill-status">閉書提取</span>'}
        </div>
        <p class="ul-drill-prompt" lang="en">${esc(d.prompt)}</p>
        <div class="ul-drill-options" role="group" aria-label="作答選項">
          ${d.options.map((opt, oi) => {
            const cls = !hasPick ? '' : oi === d.answer ? 'is-right' : oi === pick ? 'is-wrong' : '';
            return `<button type="button" class="ul-opt-btn ${cls}" data-ul-answer="${esc(d.id)}" data-ul-choice="${oi}">
              <span class="ul-opt-key">${String.fromCharCode(65 + oi)}</span>
              <span lang="en">${esc(opt)}</span>
            </button>`;
          }).join('')}
        </div>
        ${hasPick ? `
          <div class="ul-feedback-box ${isRight ? 'is-good' : 'is-bad'}" role="status">
            ${isRight
              ? `<p><strong>✅ 資訊回饋（Informational）：</strong>${esc(d.why)}</p>`
              : `<p class="ul-wrong-line"><strong>🔍 錯在哪裡（Corrective）：</strong>你選了「${esc(d.options[pick])}」— ${esc(wrongMsg)}</p>
                 <p><strong>💡 正解與規則：</strong><span lang="en">${esc(d.options[d.answer])}</span> — ${esc(d.why)}</p>`
            }
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `
    <section class="ul-mastery-hub" data-ul-hub="${esc(bp.id)}" style="--stage-accent:${bp.accent}" aria-label="Ultralearning 與 See-Do-Feedback 各階段考試掌握引擎">
      <header class="ul-hub-head">
        <div>
          <span class="ul-eyebrow">ULTRALEARNING × GET BETTER AT ANYTHING · 科學通關引擎</span>
          <h2>${esc(bp.stage)}（${esc(bp.cefr)}）通關藍圖</h2>
          <p class="ul-exams-line">🎯 對應檢定考試：<strong>${esc(bp.exams)}</strong></p>
        </div>
        <div class="ul-readiness-gauge" aria-label="階段考試就緒度 ${metrics.readiness}%">
          <div class="ul-gauge-top">
            <span>考試就緒度</span>
            <strong>${metrics.readiness}%</strong>
          </div>
          <div class="ul-gauge-bar"><i style="width:${metrics.readiness}%"></i></div>
          <small class="ul-sweet-tag zone-${metrics.sweetSpot.zone}">${esc(metrics.sweetSpot.label)}</small>
        </div>
      </header>

      ${stageTabs}
      ${pillarsStrip}

      <div class="ul-sweet-banner zone-${metrics.sweetSpot.zone}">
        <strong>🎯 甜蜜難度區教練建議（85% 精熟門檻）：</strong>
        <span>${esc(metrics.sweetSpot.advice)}</span>
      </div>

      <div class="ul-blueprint-grid">
        <!-- 1. Metalearning Map -->
        <article class="ul-card ul-metalearning">
          <div class="ul-card-head"><span class="ul-step-num">01</span><h3>後設學習地圖（Metalearning：先畫地圖再衝刺）</h3></div>
          <p class="ul-benchmark"><strong>🏆 通關基準：</strong>${esc(bp.metalearning.benchmark)}</p>
          <div class="ul-cfp-grid">
            <div><strong>觀念 Concepts（要懂）</strong><ul>${bp.metalearning.concepts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
            <div><strong>事實 Facts（要記）</strong><ul>${bp.metalearning.facts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
            <div><strong>程序 Procedures（要練）</strong><ul>${bp.metalearning.procedures.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
          </div>
          <div class="ul-ee-row">
            <p class="ul-emph"><strong>⚡ 高投報必攻（Emphasize）：</strong>${esc(bp.metalearning.emphasize)}</p>
            <p class="ul-excl"><strong>✂️ 低投報先排除（Exclude）：</strong>${esc(bp.metalearning.exclude)}</p>
          </div>
        </article>

        <!-- 2. SEE: Worked Example + CTA -->
        <article class="ul-card ul-see">
          <div class="ul-card-head"><span class="ul-step-num">02</span><h3>SEE · 專家拆題顯影（Worked Example & 費曼直覺）</h3></div>
          <blockquote class="ul-example-stem" lang="en">${esc(bp.seeWorkedExample.prompt)}</blockquote>
          <ol class="ul-cta-steps">${bp.seeWorkedExample.steps.map((st) => `<li>${esc(st)}</li>`).join('')}</ol>
          <div class="ul-feynman-box"><strong>💡 費曼一句話直覺：</strong>${esc(bp.seeWorkedExample.feynman)}</div>
        </article>
      </div>

      <!-- 3. DO: Interleaved Retrieval Drills -->
      <article class="ul-card ul-do-section">
        <div class="ul-card-head">
          <span class="ul-step-num">03</span>
          <h3>DO · 交錯變異＋閉書提取實戰（Direct-Then-Drill）</h3>
          <span class="ul-drill-score">答對 ${metrics.correct} / ${metrics.totalDrills}</span>
          ${metrics.attempted > 0 ? `<button type="button" class="btn quiet small" data-ul-reset-stage="${esc(bp.id)}">🔄 重測本階段</button>` : ''}
        </div>
        <div class="ul-drills-grid">${drillsHtml}</div>
      </article>

      <div class="ul-blueprint-grid">
        <!-- 4. FEEDBACK: Unlearning Fossilized Traps -->
        <article class="ul-card ul-unlearn">
          <div class="ul-card-head"><span class="ul-step-num">04</span><h3>FEEDBACK · 去學習石化陷阱（Unlearning 錯覺清除）</h3></div>
          <div class="ul-trap-list">
            ${bp.unlearnTraps.map((t) => `
              <div class="ul-trap-item">
                <div class="ul-trap-wrong" lang="en">❌ ${esc(t.wrong)}</div>
                <div class="ul-trap-why">🔍 ${esc(t.why)}</div>
                <div class="ul-trap-right" lang="en">✅ ${esc(t.right)}</div>
              </div>
            `).join('')}
          </div>
        </article>

        <!-- 5. EXPOSURE: Graded Exam Exposure Ladder -->
        <article class="ul-card ul-exposure">
          <div class="ul-card-head"><span class="ul-step-num">05</span><h3>EXPOSURE · 分級暴露階梯（消除考場與開口焦慮）</h3></div>
          <p class="ul-exp-note">依《Get Better at Anything》第 12 章：恐懼只會在溫和遞增的真實暴露中消退。完成一階勾選一階：</p>
          <div class="ul-exposure-list">
            ${bp.exposureLadder.map((step, i) => {
              const checked = !!state.completedExposure[`${bp.id}:${i}`];
              return `<label class="ul-exp-item ${checked ? 'is-done' : ''}">
                <input type="checkbox" data-ul-exposure="${esc(bp.id)}" data-ul-exp-idx="${i}" ${checked ? 'checked' : ''}>
                <span>${esc(step)}</span>
              </label>`;
            }).join('')}
          </div>
          <div class="ul-direct-actions">
            <a class="btn primary small" href="${bp.questHref}">🚀 進入本階段闖關</a>
            <a class="btn secondary small" href="${bp.targetHref}">📘 打開課綱教材</a>
            <a class="btn quiet small" href="${bp.examHref}">🎯 前往限時模擬考</a>
          </div>
        </article>
      </div>
    </section>
  `;
}

export function renderAllStagesReadinessOverview(state = readUltralearningState()) {
  return `
    <section class="ul-overview-card card" aria-label="全階段英文與檢定考試 85% 精熟總覽">
      <div class="ul-overview-head">
        <div>
          <span class="ul-eyebrow">MASTERY GATE · 85% 精熟門檻總覽</span>
          <h3>從國小到國際留學：五階段檢定就緒儀表板</h3>
        </div>
        <a class="btn primary small" href="#exams">進入超速學習引擎 →</a>
      </div>
      <div class="ul-overview-grid">
        ${STAGE_EXAM_BLUEPRINTS.map((bp) => {
          const m = computeStageReadiness(bp.id, state);
          return `<article class="ul-ov-item" style="--stage-accent:${bp.accent}">
            <div class="ul-ov-top">
              <span class="ul-tab-cefr">${esc(bp.cefr)}</span>
              <strong>${m.readiness}%</strong>
            </div>
            <h4>${esc(bp.stage)}</h4>
            <p>${esc(bp.exams)}</p>
            <div class="ul-gauge-bar"><i style="width:${m.readiness}%"></i></div>
            <small>${m.passedGate ? '👑 已達 85% 精熟門檻' : esc(m.sweetSpot.label)}</small>
          </article>`;
        }).join('')}
      </div>
    </section>
  `;
}
