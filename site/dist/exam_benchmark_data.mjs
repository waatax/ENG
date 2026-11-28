// 考試對標羅盤資料：官方格式（2026-11-28 查核）、CEFR 對標、得分地圖與 A/B 兩卷原創快篩題。
// 題目全部為本站原創，依官方題型設計，不是官方試題；正確率不換算正式分數。

export const CHECKED_AT = '2026-11-28';

export const CEFR_LEVELS = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// Cambridge English 估計的「引導學習時數」（累計，從零開始）。只用來排每週時間，不是保證。
export const GUIDED_HOURS = {
  'Pre-A1': [0, 0], A1: [90, 100], A2: [180, 200], B1: [350, 400], B2: [500, 600], C1: [700, 800], C2: [1000, 1200]
};
export const GUIDED_HOURS_SOURCE = {
  label: 'Cambridge English：Guided learning hours',
  url: 'https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours'
};

// kind: official＝主辦或研究單位公布的對照；estimate＝本站教學估計；none＝沒有官方 CEFR 對照
export const EVIDENCE_KINDS = {
  official: {label: '官方對照', note: '主辦或測驗研究單位公布的 CEFR 對照'},
  estimate: {label: '本站教學估計', note: '依題目語言難度估計，沒有官方對照'},
  none: {label: '建議先備程度', note: '考試沒有 CEFR 對照，這是開始題型訓練前建議的閱讀程度'}
};

export const BENCH_EXAMS = [
  {
    id: 'cap', short: '會考', name: '國中教育會考英語', icon: '🎒', accent: '#15803d', who: '國三・升高中職',
    time: '閱讀 60 分＋聽力 25 分',
    report: '閱讀：精熟／基礎／待加強；聽力：基礎／待加強；英語整體等級依兩者加權分數判定，並加註 A++～B 標示（A++＝精熟等級前 25%）。',
    sections: [
      {name: '閱讀', detail: '4 選 1・40–45 題', minutes: 60},
      {name: '聽力', detail: '3 選 1・20–30 題', minutes: 25}
    ],
    scoreNote: '會考公布題數範圍，不公布固定題型配分；加權方式以心測中心當年度計分說明為準。下面以題型「出現範圍」呈現，不是配分。',
    pointMap: [
      {skill: 'grammar', label: '單題字詞與句構', share: null, detail: '閱讀卷前段單題'},
      {skill: 'text', label: '生活文本・圖表', share: null, detail: '公告、訊息、表格的資訊整合'},
      {skill: 'reading', label: '題組閱讀推論', share: null, detail: '短文主旨、細節、推論'},
      {skill: 'listening', label: '聽力', share: null, detail: '辨識句意、對話、言談理解'}
    ],
    cefr: [{from: 'A2', to: 'A2', kind: 'estimate', label: '約 A2'}],
    suggest: 'A2',
    targets: [
      {id: 'basic', label: '穩住基礎（B）', cefr: 'A2'},
      {id: 'proficient', label: '進入精熟（A）', cefr: 'A2'},
      {id: 'top', label: '挑戰 A++', cefr: 'B1'}
    ],
    sources: [
      {label: '心測中心：考試科目與題型', url: 'https://cap.rcpet.edu.tw/test2.html'},
      {label: '心測中心：成績計算及應用', url: 'https://cap.rcpet.edu.tw/score3.html'}
    ],
    practice: {
      grammar: {label: '國中六學期路線', href: '#jh/path'},
      text: {label: '會考衝刺：生活文本單元', href: 'quest/#learn/b-cap'},
      reading: {label: '會考衝刺分支', href: 'quest/#learn/b-cap'},
      listening: {label: '最小對立音與三速聽寫', href: 'quest/#practice'},
      vocab: {label: '國小・國中單字複習', href: '#schoolwords'},
      timed: {label: '會考方向 10 題快測', href: '#exams'}
    }
  },
  {
    id: 'tve', short: '統測', name: '統測共同科目英文', icon: '🛠️', accent: '#c2410c', who: '技高三・四技二專',
    time: '100 分鐘・100 分',
    report: '原始分數 0–100。選擇題答錯不倒扣。',
    sections: [
      {name: '選擇題', detail: '42 題・每題 2 分・共 84 分', minutes: null},
      {name: '非選擇題', detail: '填充 4 分＋句子重組 6 分＋中譯英 6 分', minutes: null}
    ],
    scoreNote: '依 115 學年度試題本注意事項計算。',
    pointMap: [
      {skill: 'vocab', label: '字彙（含同義）', share: 20, detail: '第 1–10 題，10 題×2 分'},
      {skill: 'dialogue', label: '對話', share: 20, detail: '第 11–20 題，10 題×2 分'},
      {skill: 'cloze', label: '綜合測驗', share: 16, detail: '第 21–28 題，兩篇 8 空'},
      {skill: 'reading', label: '閱讀測驗', share: 28, detail: '第 29–42 題，五篇 14 題'},
      {skill: 'production', label: '填充・重組・中譯英', share: 16, detail: '非選擇題'}
    ],
    cefr: [{from: 'A2', to: 'B1', kind: 'estimate', label: 'A2–B1'}],
    suggest: 'B1',
    targets: [
      {id: 't50', label: '穩定 50 分', cefr: 'A2'},
      {id: 't70', label: '衝 70 分', cefr: 'B1'},
      {id: 't85', label: '挑戰 85 分', cefr: 'B1'}
    ],
    sources: [
      {label: '技專校院入學測驗中心：115 學年度試題', url: 'https://web1.tcte.edu.tw/EXAM/115_4y'},
      {label: '技專校院入學測驗中心', url: 'https://www.tcte.edu.tw/'}
    ],
    practice: {
      vocab: {label: '9,500 張字卡學習', href: '#wordpractice'},
      dialogue: {label: '通勤會話快播', href: '#listening'},
      cloze: {label: '技高職場英語分支', href: 'quest/#learn/b-voc'},
      reading: {label: '技高職場英語：說明書與電郵', href: 'quest/#learn/b-voc'},
      production: {label: '學測統測：中譯英單元', href: 'quest/#learn/b-gsat'},
      timed: {label: '學測統測整卷衝刺', href: 'quest/#learn/b-gsat'}
    }
  },
  {
    id: 'gsat', short: '學測', name: '學測英文考科', icon: '🏫', accent: '#7c3aed', who: '高三・大學申請',
    time: '100 分鐘・100 分',
    report: '原始分數換算為 0–15 級分；大考中心另公布頂標、前標、均標、後標、底標。',
    sections: [
      {name: '選擇題', detail: '46 題・62%（詞彙、綜合測驗、文意選填、篇章結構 5 選 4、閱讀 12 題）', minutes: null},
      {name: '混合題', detail: '10%', minutes: null},
      {name: '非選擇題', detail: '中譯英 8%＋英文作文 20%', minutes: null}
    ],
    scoreNote: '依大考中心 115 學年度起考試說明與參考試卷。',
    pointMap: [
      {skill: 'vocab', label: '詞彙', share: 10, detail: '10 題'},
      {skill: 'cloze', label: '綜合測驗', share: 10, detail: '10 題'},
      {skill: 'discourse', label: '文意選填', share: 10, detail: '10 題'},
      {skill: 'structure', label: '篇章結構', share: 8, detail: '4 空 5 選項'},
      {skill: 'reading', label: '閱讀測驗', share: 24, detail: '12 題'},
      {skill: 'mixed', label: '混合題', share: 10, detail: '選擇＋簡答'},
      {skill: 'production', label: '中譯英＋作文', share: 28, detail: '8＋20'}
    ],
    cefr: [{from: 'B1', to: 'B2', kind: 'estimate', label: 'B1–B2'}],
    suggest: 'B1',
    targets: [
      {id: 'g10', label: '10 級分', cefr: 'B1'},
      {id: 'g12', label: '12 級分', cefr: 'B1'},
      {id: 'g14', label: '14 級分以上', cefr: 'B2'}
    ],
    sources: [
      {label: '大考中心：115 學年度起學測英文考試說明與參考試卷', url: 'https://www.ceec.edu.tw/xmdoc/cont?sid=0O211573150658099894&xsmsid=0J018586101460336585'}
    ],
    practice: {
      vocab: {label: '9,500 張字卡學習', href: '#wordpractice'},
      cloze: {label: '高中句法與長難句', href: 'quest/#learn/b-gsat'},
      discourse: {label: '高中句法與閱讀', href: '#arch'},
      structure: {label: '篇章結構 5 選 4 策略', href: 'quest/#learn/b-gsat'},
      reading: {label: '學測統測衝刺分支', href: 'quest/#learn/b-gsat'},
      mixed: {label: '學測統測衝刺分支', href: 'quest/#learn/b-gsat'},
      production: {label: '英文寫作與中譯英', href: 'quest/#learn/b-gsat'},
      timed: {label: '學測英文擬真模考', href: 'quest/simulation.html'}
    }
  },
  {
    id: 'toeic', short: 'TOEIC', name: 'TOEIC Listening & Reading', icon: '💼', accent: '#b45309', who: '大學・職場',
    time: '聽力 45 分＋閱讀 75 分・200 題',
    report: '聽力 5–495、閱讀 5–495，總分 10–990，以 5 分為單位。',
    sections: [
      {name: 'Listening', detail: 'Part 1–4・100 題', minutes: 45},
      {name: 'Reading', detail: 'Part 5–7・100 題', minutes: 75}
    ],
    scoreNote: '以官方題數計算占比。',
    pointMap: [
      {skill: 'response', label: 'Part 1–2 照片・應答', share: 15.5, detail: '6＋25 題'},
      {skill: 'conversation', label: 'Part 3–4 對話・獨白', share: 34.5, detail: '39＋30 題'},
      {skill: 'language', label: 'Part 5–6 句子・段落填空', share: 23, detail: '30＋16 題'},
      {skill: 'reading', label: 'Part 7 閱讀', share: 27, detail: '54 題'}
    ],
    cefr: [
      {from: 'A1', to: 'A1', kind: 'official', label: '120+'},
      {from: 'A2', to: 'A2', kind: 'official', label: '225+'},
      {from: 'B1', to: 'B1', kind: 'official', label: '550+'},
      {from: 'B2', to: 'B2', kind: 'official', label: '785+'},
      {from: 'C1', to: 'C1', kind: 'official', label: '945+'}
    ],
    cefrNote: 'ETS 最低分：聽力 A1 60／A2 110／B1 275／B2 400／C1 490；閱讀 A1 60／A2 115／B1 275／B2 385／C1 455。總分為兩者相加；ETS 提醒不宜僵硬使用切分。',
    suggest: 'B1',
    targets: [
      {id: 's550', label: '550（B1 最低總分）', cefr: 'B1'},
      {id: 's785', label: '785（B2 最低總分）', cefr: 'B2'},
      {id: 's860', label: '860（金色證書）', cefr: 'B2'},
      {id: 's945', label: '945（C1 最低總分）', cefr: 'C1'}
    ],
    sources: [
      {label: 'ETS：Mapping the TOEIC tests on the CEFR', url: 'https://www.ets.org/pdfs/toeic/toeic-mapping-cefr-reference.pdf'},
      {label: 'IIBC：TOEIC L&R 題型', url: 'https://www.iibc-global.org/english/toeic/test/lr/about/format.html'}
    ],
    practice: {
      response: {label: 'TOEIC 考試遠征', href: 'quest/#exams/toeic'},
      conversation: {label: 'TOEIC 多益分支', href: 'quest/#learn/b-toeic'},
      language: {label: 'TOEIC 考試遠征', href: 'quest/#exams/toeic'},
      reading: {label: 'TOEIC 多益分支', href: 'quest/#learn/b-toeic'},
      vocab: {label: '9,500 張字卡學習', href: '#wordpractice'},
      timed: {label: 'TOEIC 擬真模考', href: 'quest/simulation.html'}
    }
  },
  {
    id: 'sat', short: 'SAT', name: 'SAT Reading and Writing', icon: '🎓', accent: '#4338ca', who: '美國大學申請',
    time: '兩模組各 32 分・共 54 題',
    report: 'Reading and Writing 分項 200–800（不含 Math）。',
    sections: [
      {name: 'Module 1', detail: '27 題', minutes: 32},
      {name: 'Module 2', detail: '27 題（依第一模組表現選路）', minutes: 32}
    ],
    scoreNote: '依 College Board 公布的各領域約略占比。',
    pointMap: [
      {skill: 'craft', label: 'Craft and Structure', share: 28, detail: '字義、結構、跨文本'},
      {skill: 'information', label: 'Information and Ideas', share: 26, detail: '證據、推論、圖表'},
      {skill: 'conventions', label: 'Standard English Conventions', share: 26, detail: '標點、句界、一致'},
      {skill: 'expression', label: 'Expression of Ideas', share: 20, detail: '轉折、修辭綜合'}
    ],
    cefr: [{from: 'B2', to: 'C1', kind: 'none', label: '建議 B2 起'}],
    suggest: 'B2',
    targets: [
      {id: 'r550', label: 'R&W 550', cefr: 'B2'},
      {id: 'r650', label: 'R&W 650', cefr: 'B2'},
      {id: 'r750', label: 'R&W 750', cefr: 'C1'}
    ],
    sources: [
      {label: 'College Board：SAT 結構', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/structure'},
      {label: 'College Board：Reading and Writing 內容', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing'}
    ],
    practice: {
      craft: {label: 'SAT 考試遠征', href: 'quest/#exams/sat'},
      information: {label: 'Digital SAT 分支', href: 'quest/#learn/b-sat'},
      conventions: {label: 'SAT 考試遠征', href: 'quest/#exams/sat'},
      expression: {label: 'Digital SAT 分支', href: 'quest/#learn/b-sat'},
      vocab: {label: '9,500 張字卡學習', href: '#wordpractice'},
      timed: {label: 'SAT R&W 擬真模考', href: 'quest/simulation.html'}
    }
  },
  {
    id: 'gre', short: 'GRE', name: 'GRE Verbal Reasoning', icon: '🏛️', accent: '#be123c', who: '研究所申請',
    time: '12 題 18 分＋15 題 23 分',
    report: 'Verbal 130–170，以 1 分為單位。',
    sections: [
      {name: 'Verbal 1', detail: '12 題', minutes: 18},
      {name: 'Verbal 2', detail: '15 題（依第一節表現選路）', minutes: 23}
    ],
    scoreNote: 'ETS 說明閱讀約占一半，其餘為填空與句子等義；占比為約略值。',
    pointMap: [
      {skill: 'completion', label: 'Text Completion', share: 25, detail: '單空、多空'},
      {skill: 'equivalence', label: 'Sentence Equivalence', share: 25, detail: '六選二，兩個都對才得分'},
      {skill: 'reading', label: 'Reading Comprehension', share: 50, detail: '單選、複選、選句'}
    ],
    cefr: [{from: 'C1', to: 'C2', kind: 'none', label: '建議 C1 起'}],
    suggest: 'C1',
    targets: [
      {id: 'v145', label: 'Verbal 145', cefr: 'B2'},
      {id: 'v155', label: 'Verbal 155', cefr: 'C1'},
      {id: 'v165', label: 'Verbal 165', cefr: 'C1'}
    ],
    sources: [
      {label: 'ETS：GRE General Test 結構', url: 'https://www.ets.org/gre/score-users/about/general-test/content-structure.html'}
    ],
    practice: {
      completion: {label: 'GRE 考試遠征', href: 'quest/#exams/gre'},
      equivalence: {label: 'GRE Verbal 分支', href: 'quest/#learn/b-gre'},
      reading: {label: 'GRE 考試遠征', href: 'quest/#exams/gre'},
      vocab: {label: '字首・字尾學習館', href: '#affixes'},
      timed: {label: 'GRE Verbal 擬真模考', href: 'quest/simulation.html'}
    }
  },
  {
    id: 'gmat', short: 'GMAT', name: 'GMAT Verbal Reasoning', icon: '📈', accent: '#0e7490', who: '商學院申請',
    time: '23 題・45 分鐘',
    report: 'Verbal 60–90；總分 205–805 另含 Quantitative 與 Data Insights。',
    sections: [
      {name: 'Verbal Reasoning', detail: '23 題・Critical Reasoning 與 Reading Comprehension', minutes: 45}
    ],
    scoreNote: 'GMAC 未公布固定題型配比，下面為題型而非配分。',
    pointMap: [
      {skill: 'critical', label: 'Critical Reasoning', share: null, detail: '削弱、加強、假設、評估、解釋'},
      {skill: 'reading', label: 'Reading Comprehension', share: null, detail: '主旨、推論、作用'}
    ],
    cefr: [{from: 'C1', to: 'C2', kind: 'none', label: '建議 C1 起'}],
    suggest: 'C1',
    targets: [
      {id: 'v75', label: 'Verbal 75', cefr: 'B2'},
      {id: 'v80', label: 'Verbal 80', cefr: 'C1'},
      {id: 'v85', label: 'Verbal 85', cefr: 'C1'}
    ],
    sources: [
      {label: 'GMAC：GMAT 考試結構', url: 'https://www.mba.com/exams/gmat-exam/about/exam-structure'},
      {label: 'GMAC：考試內容', url: 'https://www.mba.com/exams/gmat-exam/about/exam-content'}
    ],
    practice: {
      critical: {label: 'GMAT 考試遠征', href: 'quest/#exams/gmat'},
      reading: {label: 'GMAT 批判推理分支', href: 'quest/#learn/b-gmat'},
      vocab: {label: '字首・字尾學習館', href: '#affixes'},
      timed: {label: 'GMAT Verbal 擬真模考', href: 'quest/simulation.html'}
    }
  }
];

// 時間配置建議（本站建議，依官方時間與題數計算）。
export const EXAM_PACE = {
  cap: '閱讀 60 分鐘、約 40–45 題：平均每題約 80–90 秒。單題快做，把時間留給題組與圖表；聽力跟著音檔節奏，聽完立刻作答。',
  tve: '100 分鐘：建議選擇題約 65 分鐘（每題約 90 秒）、非選擇題 20 分鐘、最後 15 分鐘檢查畫卡與拼字。',
  gsat: '100 分鐘：建議選擇與混合題約 55 分鐘、中譯英 10 分鐘、作文 30 分鐘、檢查 5 分鐘。',
  toeic: '閱讀 75 分鐘：Part 5 每題約 20–30 秒，Part 6 約 8 分鐘，至少留 50 分鐘給 Part 7。聽力先預讀題目。',
  sat: '每模組 32 分鐘、27 題：平均每題約 70 秒；卡住先標記，最後回頭。',
  gre: '第一節 12 題 18 分鐘、第二節 15 題 23 分鐘：平均每題約 90 秒；填空題快做，留時間給閱讀。',
  gmat: '23 題 45 分鐘：平均每題約 2 分鐘；可標記後回頭，作答完最多改 3 題。'
};

// 交錯練習入口：混合本考試各題型。
export const MIXED_PRACTICE = {
  cap: {label: '會考衝刺分支（混合題型）', href: 'quest/#learn/b-cap'},
  tve: {label: '技高職場英語分支（混合題型）', href: 'quest/#learn/b-voc'},
  gsat: {label: '學測統測衝刺分支（混合題型）', href: 'quest/#learn/b-gsat'},
  toeic: {label: 'TOEIC 考試遠征（未見題挑戰）', href: 'quest/#exams/toeic'},
  sat: {label: 'SAT 考試遠征（未見題挑戰）', href: 'quest/#exams/sat'},
  gre: {label: 'GRE 考試遠征（未見題挑戰）', href: 'quest/#exams/gre'},
  gmat: {label: 'GMAT 考試遠征（未見題挑戰）', href: 'quest/#exams/gmat'}
};

// GEPT 只放在對標階梯當作臺灣常見的橋樑檢定。
export const GEPT_ROW = {
  id: 'gept', short: 'GEPT', name: '全民英檢', icon: '📜', accent: '#475569',
  cefr: [
    {from: 'A2', to: 'A2', kind: 'official', label: '初級'},
    {from: 'B1', to: 'B1', kind: 'official', label: '中級'},
    {from: 'B2', to: 'B2', kind: 'official', label: '中高級'},
    {from: 'C1', to: 'C1', kind: 'official', label: '高級'},
    {from: 'C2', to: 'C2', kind: 'official', label: '優級'}
  ],
  source: {label: '語言訓練測驗中心 LTTC', url: 'https://www.lttc.ntu.edu.tw/'}
};

export const SKILL_LABELS = {
  grammar: '字詞與句構', text: '生活文本・圖表', reading: '閱讀推論', listening: '聽力',
  vocab: '字彙', dialogue: '對話', cloze: '綜合測驗', production: '產出（重組・翻譯）',
  discourse: '文意選填（詞性）', structure: '篇章結構', mixed: '混合題（字形）',
  response: '聽力應答', conversation: '對話聽力', language: '句子・段落填空',
  craft: '文意與結構', information: '資訊與證據', conventions: '標準英語規範', expression: '表達與修辭',
  completion: '語意填空', equivalence: '句子等義（選二）', critical: '批判推理'
};

// 作者格式：第一個（GRE 句子等義為前兩個）是正解；其他每個選項都寫出錯在哪裡。
// keep:true 代表選項依數字順序顯示，不打亂。
const RAW_ITEMS = [
  // ───────── 會考 A 卷 ─────────
  {id: 'cap-a1', exam: 'cap', form: 'A', skill: 'grammar', type: '單題・時態',
    stem: 'My brother ___ his homework yet, so he can\'t watch TV now.',
    opts: [['hasn\'t finished'], ['doesn\'t finish', '現在簡單式描述習慣，不能表達「到現在還沒做完」，也不和 yet 搭配。'], ['wasn\'t finishing', '過去進行式描述過去某一刻正在做，與 now 的結果無關。'], ['won\'t finish', '指未來不會完成，與 yet「到目前為止」衝突；後句說「現在」不能看電視，是因為作業還沒寫完。']],
    why: 'yet 表示「到目前為止還沒」，搭配現在完成式否定 hasn\'t + p.p.，並說明對現在的影響。',
    cue: '看到 yet、already、since、for，先想現在完成式 have/has + p.p.'},
  {id: 'cap-a2', exam: 'cap', form: 'A', skill: 'grammar', type: '單題・連接詞',
    stem: 'Amy studied hard for the test, ___ she still felt nervous before it started.',
    opts: [['but'], ['so', 'so 表結果，但「用功」不會導致「緊張」，still 也暗示前後相反。'], ['because', 'because 表原因：「因為她緊張所以用功」與 still（仍然）的語氣不合。'], ['if', 'if 表條件，句子說的是已發生的事，不是假設。']],
    why: '「用功準備」和「仍然緊張」相反，still 是轉折線索，用 but。',
    cue: '句中有 still、yet、however 時，先檢查前後是否相反。'},
  {id: 'cap-a3', exam: 'cap', form: 'A', skill: 'text', type: '生活文本・公告',
    passage: 'City Library — Summer Reading Club\n• For students aged 10–15\n• Read 5 books by August 20 and get a free bookmark.\n• Read 10 books by August 20 and get a movie ticket.\n• Sign up at the front desk. Bring your student card.',
    stem: 'Ken is 14. He read 7 books before August 20. What can he get?',
    opts: [['A bookmark.'], ['A movie ticket.', '電影票要讀滿 10 本，Ken 只讀了 7 本。'], ['Nothing, because he is too old.', '14 歲在 10–15 歲的範圍內，可以參加。'], ['A student card.', '學生證是報名時要帶的證件，不是獎品。']],
    why: '讀滿 5 本得書籤，7 本達到書籤門檻但未達 10 本電影票門檻。',
    cue: '圖表題先圈題目條件（14 歲、7 本），再回公告逐條比對。'},
  {id: 'cap-a4', exam: 'cap', form: 'A', skill: 'reading', type: '短訊・推論',
    passage: 'Mom: I\'ll be home late tonight. There\'s some rice and soup in the fridge. Please heat them up for dinner, and don\'t forget to feed Lucky. (6:10 p.m.)',
    stem: 'What is Lucky most likely?',
    opts: [['The family\'s pet.'], ['Mom\'s coworker.', 'feed 是「餵食」，對象通常是動物或嬰兒，不會用在同事身上。'], ['A kind of soup.', '湯前面已經提過；feed 的受詞是被餵的對象，不是食物。'], ['A restaurant near home.', '不會「餵」一家餐廳；訊息是請孩子在家熱飯。']],
    why: 'feed Lucky＝餵 Lucky，最合理的是家裡的寵物。',
    cue: '推論題找「動詞＋受詞」的搭配：feed 後面接的是被餵的對象。'},
  {id: 'cap-a5', exam: 'cap', form: 'A', skill: 'reading', type: '題組・推論',
    passage: 'Many students think they study better with music. A teacher asked two groups to read the same article. Group A listened to songs with words; Group B read in a quiet room. Group B remembered more details. But when Group A listened to music without words, the difference became smaller.',
    stem: 'What can we learn from the reading?',
    opts: [['Songs with words may make it harder to remember what we read.'], ['Music always helps students remember more.', '文中安靜組記得更多，與 always helps 相反。'], ['The two groups read different articles.', '原文說兩組讀 the same article。'], ['Music without words made Group A do better than Group B.', '原文只說差距變小（became smaller），沒有說 A 組超過 B 組。']],
    why: '聽有歌詞的歌時記得較少，換成純音樂差距變小，表示歌詞可能干擾記憶。',
    cue: '推論題選「有文字證據、語氣不過度」的選項，小心 always、never 等絕對字。'},
  {id: 'cap-a6', exam: 'cap', form: 'A', skill: 'listening', type: '聽力・言談理解', keep: true,
    listen: 'Girl: Dad, can you drive me to the station? My train leaves at four thirty. Man: Sure. It\'s three forty-five now, so let\'s go in fifteen minutes.',
    stem: 'When will they leave for the station?',
    opts: [['At 3:45.', '3:45 是說話當下的時間。'], ['At 4:00.', null, true], ['At 4:30.', '4:30 是火車開車時間，不是出門時間。']],
    why: '現在 3:45，再過 15 分鐘出門，所以是 4:00。',
    cue: '聽到兩個以上的數字時，邊聽邊記下各自代表什麼，再算答案。'},
  // ───────── 會考 B 卷 ─────────
  {id: 'cap-b1', exam: 'cap', form: 'B', skill: 'grammar', type: '單題・時態',
    stem: 'We ___ in this town since I was six.',
    opts: [['have lived'], ['lived', '過去式只描述過去；since 表示從過去延續到現在，要用完成式。'], ['are living', '現在進行式不能和 since 搭配表示「一直住到現在」。'], ['live', '現在簡單式不能和 since 子句搭配表示持續。']],
    why: 'since I was six 表示從六歲一直到現在，用現在完成式 have lived。',
    cue: 'since＋過去時間點 → 主要子句用 have/has + p.p.'},
  {id: 'cap-b2', exam: 'cap', form: 'B', skill: 'grammar', type: '單題・連接詞',
    stem: 'It was raining hard, ___ the soccer game was put off.',
    opts: [['so'], ['but', '前後是「下大雨 → 延期」的因果，不是轉折。'], ['although', '「雖然下大雨，比賽延期」語意不通，前後並不相反。'], ['because', '會變成「因為比賽延期，所以下大雨」，因果顛倒。']],
    why: '下大雨是原因，比賽延期是結果，用 so。',
    cue: '先用中文說一次前後關係（因果、轉折、條件），再選連接詞。'},
  {id: 'cap-b3', exam: 'cap', form: 'B', skill: 'text', type: '生活文本・價目表', keep: true,
    passage: 'Sunny Swimming Pool\nOpen: 9 a.m. – 8 p.m. (closed on Tuesdays)\nTickets: Adults $100 / Students $60 / Children under 6: free\n* Swimming caps are required. Caps for sale: $50',
    stem: 'Mia is a student. She doesn\'t have a swimming cap. How much will she pay to swim today?',
    opts: [['$60', '只算了學生票，忘了規定要戴泳帽，而她沒有。'], ['$100', '這是成人票價。'], ['$110', null, true], ['$150', '這是成人票加泳帽。']],
    why: '學生票 $60＋必須購買的泳帽 $50＝$110。',
    cue: '價目題常有「附註＊」條件，算錢前先把每一條規定讀完。'},
  {id: 'cap-b4', exam: 'cap', form: 'B', skill: 'reading', type: '短訊・推論',
    passage: 'Grandpa: Thank you for the gift! I can ride it to the market every morning, so I don\'t have to wait for the bus anymore. It\'s good exercise for my legs, too.',
    stem: 'What was the gift most likely?',
    opts: [['A bicycle.'], ['An umbrella.', '傘不能 ride，也不能讓人不用等公車。'], ['A bus card.', '公車卡是用來搭公車的，還是得等車；卡片也不能騎。'], ['A raincoat.', '雨衣不能騎，也不能代替公車。']],
    why: '可以 ride it 去市場、不用再等公車，還能運動雙腿，禮物最可能是腳踏車。',
    cue: '代名詞 it 指的是禮物：把每個選項代進 ride it，看哪個說得通。'},
  {id: 'cap-b5', exam: 'cap', form: 'B', skill: 'reading', type: '題組・推論',
    passage: 'Some people believe breakfast helps students do better at school. In one school, students who ate breakfast got higher math scores. But most of these students also went to bed earlier. So the teacher said, "We need to learn more before we say breakfast is the only reason."',
    stem: 'What does the teacher mean?',
    opts: [['Sleep might also explain the higher scores.'], ['Breakfast is bad for students\' math scores.', '吃早餐的學生分數比較高，文中沒說早餐有害。'], ['Students should stop eating breakfast.', '老師只說要再了解，沒有叫學生不吃早餐。'], ['Going to bed early makes students hungry.', '文中沒有談飢餓。']],
    why: '吃早餐的學生也比較早睡，所以分數高可能和睡眠有關，不能只歸功早餐。',
    cue: '看到 But…also… 時，作者常在提醒「還有別的原因」。'},
  {id: 'cap-b6', exam: 'cap', form: 'B', skill: 'listening', type: '聽力・言談理解', keep: true,
    listen: 'Boy: How much are these apples? Woman: Thirty dollars each, or one hundred dollars for four. Boy: Then I\'ll take four.',
    stem: 'How much will the boy pay?',
    opts: [['$30', '30 元是一顆的價錢。'], ['$100', null, true], ['$120', '4 × 30 是單買四顆的價錢，但四顆有 100 元的組合價。']],
    why: '四顆組合價 100 元，男孩買四顆，所以付 100 元。',
    cue: '聽到 or 時，通常會出現兩種方案，注意說話者最後選哪一個。'},

  // ───────── 統測 A 卷 ─────────
  {id: 'tve-a1', exam: 'tve', form: 'A', skill: 'vocab', type: '字彙・填空',
    stem: 'Please ___ your seat belt before the car starts moving.',
    opts: [['fasten'], ['loosen', '鬆開安全帶與開車前的安全提醒相反。'], ['borrow', '借用，不能表示「繫上」。'], ['repair', '修理，句意是出發前要繫好，不是修理。']],
    why: 'fasten your seat belt＝繫上安全帶，是固定搭配。',
    cue: '字彙題先翻譯空格前後（seat belt、before the car starts），再找搭配。'},
  {id: 'tve-a2', exam: 'tve', form: 'A', skill: 'vocab', type: '字彙・同義', mark: 'postpone',
    stem: 'The factory will postpone the meeting until next Friday because the manager is sick.\n劃線字 postpone 的意思最接近：',
    opts: [['delay'], ['cancel', '取消是不舉行；until next Friday 表示延到下週五仍會開。'], ['attend', '出席，和「延後」無關。'], ['arrange', '安排，沒有「往後延」的意思。']],
    why: 'postpone＝延後，與 delay 同義；until next Friday 是延到的時間。',
    cue: '同義題可把選項代回原句，看句意是否不變。'},
  {id: 'tve-a3', exam: 'tve', form: 'A', skill: 'dialogue', type: '對話',
    stem: 'A: Excuse me, is this seat taken?\nB: ________\nA: Thanks. I\'ll just put my bag down then.',
    opts: [['No, go ahead.'], ['Yes, I\'m afraid so.', '表示有人坐，A 就不會道謝並放下包包。'], ['I\'d love to.', 'I\'d love to 是接受邀請的回答。'], ['It\'s on the left.', '回答方向，答非所問。']],
    why: 'is this seat taken? 問「有人坐嗎」，回答 No（沒人坐）才接得上 A 的道謝。',
    cue: '對話題看空格「下一句」：A 道謝並放包包，代表 B 答應了。'},
  {id: 'tve-a4', exam: 'tve', form: 'A', skill: 'cloze', type: '綜合測驗・關係代名詞',
    stem: 'Our hotel offers free shuttle service to the airport. Guests ___ want to use the service should sign up at the front desk one day in advance.',
    opts: [['who'], ['which', '先行詞 Guests 是人，不用 which。'], ['whose', 'whose 後面要接名詞（whose car…），這裡直接接動詞 want。'], ['whom', 'whom 是受格，但空格是子句的主詞（___ want）。']],
    why: '先行詞是人且空格當子句主詞，用 who。',
    cue: '關代題：先看先行詞（人／物），再看空格在子句裡當主詞還是受詞。'},
  {id: 'tve-a5', exam: 'tve', form: 'A', skill: 'reading', type: '閱讀・職場公告',
    passage: 'NOTICE — Machine Room B\nFrom May 3 to May 5, the cutting machines in Room B will be checked by technicians. During this time, all workers must use the machines in Room C. Safety glasses are still required in Room C. Questions? Call Mr. Chen at ext. 215.',
    stem: 'What will happen from May 3 to May 5?',
    opts: [['Workers will use the machines in Room C.'], ['Room C will be closed for repairs.', '被檢查的是 Room B 的機器。'], ['Safety glasses will not be needed.', '公告寫 Room C 仍然需要護目鏡。'], ['Mr. Chen will train new workers.', '陳先生是詢問窗口，公告沒有提到訓練。']],
    why: 'During this time, all workers must use the machines in Room C.',
    cue: '公告題先找日期，再看同一句或下一句說了什麼改變。'},
  {id: 'tve-a6', exam: 'tve', form: 'A', skill: 'production', type: '句子重組（選擇版）',
    stem: '重組：the report / before Friday / the manager / asked us / to finish',
    opts: [['The manager asked us to finish the report before Friday.'], ['The manager asked to finish us the report before Friday.', 'ask 的句型是 ask＋人＋to V，us 要放在 asked 後面。'], ['The report asked us the manager to finish before Friday.', '報告不會提出要求，主詞錯了，字序也不通。'], ['Before Friday the manager to finish asked us the report.', '主要動詞 asked 被放在不定詞後面，語序錯。']],
    why: '主詞 The manager＋asked＋us＋to finish＋the report＋時間 before Friday。',
    cue: '重組先找主詞與主要動詞，再套句型（ask 人 to V），時間片語放最後。'},
  // ───────── 統測 B 卷 ─────────
  {id: 'tve-b1', exam: 'tve', form: 'B', skill: 'vocab', type: '字彙・填空',
    stem: 'The new phone is too ___ for me; it costs more than my monthly salary.',
    opts: [['expensive'], ['convenient', '方便的，和「比月薪還貴」無關。'], ['familiar', '熟悉的，無法說明為什麼買不起。'], ['traditional', '傳統的，與價格無關。']],
    why: '分號後說明「比月薪還貴」，所以是 expensive。',
    cue: '分號或冒號後常是前半句的說明，用它來判斷空格意思。'},
  {id: 'tve-b2', exam: 'tve', form: 'B', skill: 'vocab', type: '字彙・同義', mark: 'checked',
    stem: 'The engineer checked every part of the machine carefully.\n劃線字 checked 的意思最接近：',
    opts: [['inspected'], ['ordered', '訂購，不是檢查。'], ['replaced', '更換，不是檢查。'], ['designed', '設計，不是檢查。']],
    why: 'check＝檢查，與 inspect 同義。',
    cue: '同義題可把選項代回原句，看句意是否不變。'},
  {id: 'tve-b3', exam: 'tve', form: 'B', skill: 'dialogue', type: '對話',
    stem: 'A: Could you help me carry these boxes to the second floor?\nB: ________ I\'ve got a meeting in five minutes. Maybe Tom can help.',
    opts: [['Sorry, I\'m in a hurry.'], ['Sure, no problem.', '答應幫忙，卻接著說要開會並建議找 Tom，前後矛盾。'], ['Here you are.', '遞東西給對方時說的話。'], ['You\'re welcome.', '回應對方道謝時說的話。']],
    why: 'B 後面說五分鐘後要開會、建議找 Tom，表示婉拒。',
    cue: '對話題的關鍵常在空格後面那句：這裡是婉拒的理由。'},
  {id: 'tve-b4', exam: 'tve', form: 'B', skill: 'cloze', type: '綜合測驗・條件句',
    stem: 'If the package ___ damaged when it arrives, please contact our customer service within seven days.',
    opts: [['is'], ['was', '主句是 please contact（現在／未來），條件句用過去式時態不一致。'], ['will be', 'if 引導的條件副詞子句用現在式代替未來，不用 will。'], ['be', '原形 be 不能當子句的限定動詞。']],
    why: '條件副詞子句以現在式表示未來：If the package is damaged…',
    cue: 'if、when、before、after 引導的時間或條件子句，用現在式表未來。'},
  {id: 'tve-b5', exam: 'tve', form: 'B', skill: 'reading', type: '閱讀・商業電郵',
    passage: 'Dear Ms. Wu,\nThank you for your order of 200 metal parts. Unfortunately, 50 of them are out of stock. We can send the other 150 today and the rest by June 12. If this is not acceptable, please let us know by June 2.\nBest regards,\nKevin Lee, Sales Department',
    stem: 'What does Kevin want Ms. Wu to do?',
    opts: [['Tell him by June 2 if the plan does not work for her.'], ['Pay for 50 more metal parts.', '信中沒有要求加購。'], ['Cancel the whole order today.', '信中提出分兩批出貨的方案，沒有要她取消。'], ['Send the metal parts back by June 12.', 'June 12 是剩下 50 件的出貨期限，不是退貨日。']],
    why: 'If this is not acceptable, please let us know by June 2.',
    cue: '「要對方做什麼」通常在 please… 那句。'},
  {id: 'tve-b6', exam: 'tve', form: 'B', skill: 'production', type: '句子重組（選擇版）',
    stem: '重組：the machine / how to use / showed / the new workers / Mr. Lin',
    opts: [['Mr. Lin showed the new workers how to use the machine.'], ['Mr. Lin showed how to use the new workers the machine.', 'show＋人＋how to V＋物：the new workers 要緊跟在 showed 後面。'], ['The new workers showed Mr. Lin the machine how to use.', '主詞換成新員工，how to use 也被拆開，語序錯。'], ['Mr. Lin how to use showed the new workers the machine.', '主要動詞 showed 被放到 how to use 後面，語序錯。']],
    why: 'Mr. Lin（主詞）＋showed＋the new workers（人）＋how to use the machine（事）。',
    cue: 'show／teach／tell 常用「動詞＋人＋how to V」。'},

  // ───────── 學測 A 卷 ─────────
  {id: 'gsat-a1', exam: 'gsat', form: 'A', skill: 'vocab', type: '詞彙題',
    stem: 'The scientist\'s ___ discovery changed the way people think about the origin of life; it was truly revolutionary.',
    opts: [['remarkable'], ['ordinary', '普通的，和 truly revolutionary（革命性的）矛盾。'], ['temporary', '暫時的，無法說明「改變人們的想法」。'], ['reluctant', '不情願的，用來形容人的態度，不能形容發現。']],
    why: '分號後 truly revolutionary 說明這個發現非凡，用 remarkable。',
    cue: '詞彙題先找句中的同義重述（分號後、破折號後）。'},
  {id: 'gsat-a2', exam: 'gsat', form: 'A', skill: 'cloze', type: '綜合測驗・轉折',
    stem: 'Plastic bags are cheap and convenient. ___, they can take hundreds of years to break down and often end up in the ocean.',
    opts: [['However'], ['Therefore', '前句是優點、後句是缺點，不是因果。'], ['For example', '後句不是前句的例子。'], ['Similarly', '前後一好一壞，不是相似。']],
    why: '前句優點、後句缺點，語意相反，用 However。',
    cue: '連接詞題把前後兩句各濃縮成「＋」或「－」，正負相反就用轉折。'},
  {id: 'gsat-a3', exam: 'gsat', form: 'A', skill: 'discourse', type: '文意選填・詞性（單句練習版）',
    stem: 'Many teenagers feel ___ when they compare their lives with the perfect pictures they see online.',
    opts: [['anxious'], ['anxiety', 'anxiety 是名詞；feel 後面要接形容詞當補語。'], ['anxiously', 'anxiously 是副詞，不能當 feel 的補語。'], ['confidence', '名詞，而且和「比較完美照片」的情境語意相反。']],
    why: 'feel＋形容詞：feel anxious（感到焦慮）。',
    cue: '文意選填先判斷空格詞性：feel、look、become 後面接形容詞。'},
  {id: 'gsat-a4', exam: 'gsat', form: 'A', skill: 'structure', type: '篇章結構（單格練習版）',
    stem: 'Sleep is not a waste of time. ___ During deep sleep, the brain sorts new information and stores the important parts. Without enough sleep, students may find it hard to remember what they learned.',
    opts: [['In fact, it plays a key role in how we learn.'], ['Many people enjoy watching movies late at night.', '話題轉到看電影，和後文大腦整理資訊接不上。'], ['However, it is completely useless for the body.', 'However 轉折且 useless 與全文主張相反。'], ['This is why students should skip breakfast.', '跳到早餐，與睡眠和學習無關，是多出來的干擾選項。']],
    why: '前句說睡眠不是浪費，空格要承接並引出後文「深睡時大腦整理資訊」。',
    cue: '篇章結構看空格前後句：選項要同時接得上前一句與下一句；正式考試 5 選 4，會有一句無處可放。'},
  {id: 'gsat-a5', exam: 'gsat', form: 'A', skill: 'reading', type: '閱讀測驗',
    passage: 'Bees do more than make honey. About one-third of the food we eat depends on pollination by bees and other insects. In recent years, bee numbers have dropped because of pesticides, disease, and habitat loss. Some cities have responded by planting flowers on rooftops and along roads, creating "bee highways" that link green spaces.',
    stem: 'What is the purpose of "bee highways"?',
    opts: [['To connect green areas so bees can travel and find food.'], ['To make honey easier for farmers to sell.', '文中沒有談到販售蜂蜜。'], ['To keep bees away from busy roads.', '花是種在道路旁邊，目的是串連綠地，不是讓蜜蜂遠離道路。'], ['To replace pesticides used on farms.', '農藥是蜜蜂減少的原因之一，蜜蜂廊道不是農藥的替代品。']],
    why: 'creating "bee highways" that link green spaces：串連綠地，讓蜜蜂移動覓食。',
    cue: '引號詞的意思通常就在同一句後半，找 that、which 後的說明。'},
  {id: 'gsat-a6', exam: 'gsat', form: 'A', skill: 'mixed', type: '混合題・字形變化（選擇練習版）',
    passage: 'In recent years, bee numbers have dropped because of pesticides, disease, and habitat loss.',
    stem: '依上文完成摘要：Bee numbers are ___ because of pesticides, disease, and habitat loss.',
    opts: [['declining'], ['increasing', '詞性對但意思相反：原文是 dropped（下降）。'], ['decline', 'are 後面不能直接接原形動詞。'], ['declined', 'are declined 是被動，意思變成「被拒絕」，不符合。']],
    why: 'are＋V-ing 表示正在下降，declining 與 dropped 同義。',
    cue: '混合題要「意思對＋字形對」：先選意思，再依前面的 be 動詞決定字形。'},
  // ───────── 學測 B 卷 ─────────
  {id: 'gsat-b1', exam: 'gsat', form: 'B', skill: 'vocab', type: '詞彙題',
    stem: 'To protect their ___, many celebrities refuse to share details about their children online.',
    opts: [['privacy'], ['publicity', '曝光、宣傳，與「拒絕分享孩子資訊」相反。'], ['property', '財產，和網路分享孩子資訊沒有直接關係。'], ['poverty', '貧窮，語意不合。']],
    why: '不在網路分享孩子細節是為了保護隱私 privacy。',
    cue: '用「目的」推空格：To protect ___ → 不分享資訊在保護什麼？'},
  {id: 'gsat-b2', exam: 'gsat', form: 'B', skill: 'cloze', type: '綜合測驗・轉折',
    stem: 'The small café had no advertising. ___, it became popular because customers kept recommending it to their friends.',
    opts: [['Nevertheless'], ['As a result', '沒有廣告不是變受歡迎的原因，不能用表結果的連接詞。'], ['In other words', '換句話說要重述前句，後句不是重述。'], ['For instance', '後句不是前句的例子。']],
    why: '「沒有廣告」卻「變受歡迎」，前後相反，用 Nevertheless（儘管如此）。',
    cue: '把前後兩句濃縮成正負號，再挑連接詞。'},
  {id: 'gsat-b3', exam: 'gsat', form: 'B', skill: 'discourse', type: '文意選填・詞性（單句練習版）',
    stem: 'The new policy aims to ___ the gap between rural and urban schools.',
    opts: [['narrow'], ['narrowly', '副詞，aims to 後面要接原形動詞。'], ['narrowness', '名詞，aims to 後面要接原形動詞。'], ['widen', '詞性對，但「擴大差距」不會是政策目標。']],
    why: 'aim to＋原形動詞；narrow the gap＝縮小差距。',
    cue: 'to 後面先想原形動詞，再用語意刪掉相反詞。'},
  {id: 'gsat-b4', exam: 'gsat', form: 'B', skill: 'structure', type: '篇章結構（單格練習版）',
    stem: 'Many people think creativity is a gift that only a few are born with. ___ Researchers have found that people become more creative when they practice generating many ideas before judging them.',
    opts: [['However, studies suggest it can be developed.'], ['As a result, most artists are born rich.', '與創造力能否培養無關，也不合邏輯。'], ['For example, many people dislike drawing.', '舉例和後文的研究結果接不上。'], ['This explains why creativity cannot be learned.', '與後文「練習後更有創意」的研究結果相反。']],
    why: '前句是常見看法，空格用 However 轉向研究證據，再由下一句說明研究內容。',
    cue: '「Many people think…」後面常接轉折，引出作者真正的論點。'},
  {id: 'gsat-b5', exam: 'gsat', form: 'B', skill: 'reading', type: '閱讀測驗',
    passage: 'A small mountain town turned its empty elementary school into a hotel. Visitors sleep in former classrooms, eat lunch in the old cafeteria, and can even take a "class" in local cooking. The project brought tourists back to the town and created jobs for older residents, who now work as guides and teachers.',
    stem: 'Which statement is supported by the passage?',
    opts: [['The project helped the town\'s economy and its older residents.'], ['Students still attend classes in the hotel every day.', '學校原本就空了（empty school）才改成旅館。'], ['The hotel was built after the old school was torn down.', 'turned…into 是改建，不是拆掉重蓋。'], ['Visitors must take a cooking class before checking in.', '原文是 can even take（可以選擇），不是必須。']],
    why: '帶回觀光客並為年長居民創造工作，對應「幫助經濟與年長居民」。',
    cue: '「supported by the passage」要找有原文依據的選項，注意 can 和 must 的差別。'},
  {id: 'gsat-b6', exam: 'gsat', form: 'B', skill: 'mixed', type: '混合題・字形變化（選擇練習版）',
    passage: 'The project brought tourists back to the town and created jobs for older residents.',
    stem: '依上文完成摘要：The hotel project made the town ___ to visitors again.',
    opts: [['attractive'], ['attract', 'make＋受詞＋原形動詞本身可以（made the town attract visitors），但 attract 是及物動詞，後面不能接 to visitors；「對遊客有吸引力」要用 attractive to。'], ['attraction', '名詞放在這裡變成「讓小鎮成為吸引」，缺冠詞也不通順。'], ['attractively', '副詞不能當受詞補語。']],
    why: 'make＋the town＋attractive：讓小鎮對遊客有吸引力。',
    cue: 'make／keep／find＋受詞＋形容詞，是常考的補語句型。'},

  // ───────── TOEIC A 卷 ─────────
  {id: 'toeic-a1', exam: 'toeic', form: 'A', skill: 'language', type: 'Part 5・介系詞',
    stem: 'All employees must complete the online safety training ___ the end of this month.',
    opts: [['by'], ['until', 'until 表示動作「持續到」某時，complete 是一次完成的動作，期限要用 by。'], ['since', 'since 表示「自從」，搭配完成式，不表示期限。'], ['during', 'during 表示「在…期間」，不表示截止時間。']],
    why: '「在…之前完成」的期限用 by。',
    cue: '看到 complete、submit、return 等一次性動作＋時間，先想 by。'},
  {id: 'toeic-a2', exam: 'toeic', form: 'A', skill: 'language', type: 'Part 5・詞性',
    stem: 'The new software allows the team to process orders more ___ than before.',
    opts: [['efficiently'], ['efficient', '形容詞不能修飾動詞 process。'], ['efficiency', '名詞不能放在 more ___ than 修飾動詞。'], ['efficiencies', '複數名詞，詞性錯。']],
    why: '修飾動詞 process 要用副詞 efficiently。',
    cue: '詞性題先看空格修飾誰：動詞 → 副詞，名詞 → 形容詞。'},
  {id: 'toeic-a3', exam: 'toeic', form: 'A', skill: 'language', type: 'Part 6・句子插入',
    stem: 'Dear Mr. Patel,\nThank you for choosing Harbor View Hotel for your conference. ___ Please confirm the number of attendees by Friday so that we can prepare the room.',
    opts: [['We have reserved our largest meeting room for you on March 14.'], ['The hotel restaurant is closed on public holidays.', '和會議、準備會場無關。'], ['The airport is located 40 kilometers from downtown.', '機場距離與會議室安排無關，也無法讓下一句的 the room 有所指。'], ['You can return the item within 30 days for a full refund.', '退貨規定與訂會議室無關。']],
    why: '後句 prepare the room 的 the room 需要前句先提到會議室。',
    cue: 'Part 6 找「前後呼應」：下一句的 the room 指向前一句提過的東西。'},
  {id: 'toeic-a4', exam: 'toeic', form: 'A', skill: 'reading', type: 'Part 7・條件判斷',
    passage: 'Greenway Office Supplies — Spring Sale\nOrders over $200 receive free delivery. Members get an extra 10% off. Sale ends April 30.',
    stem: 'Ms. Ho, a member, orders $250 of paper on April 28. What is true about her order?',
    opts: [['It will be delivered free, and she will get 10% off.'], ['It will not get free delivery because she is a member.', '免運條件是金額超過 $200，與會員身分無關。'], ['She cannot get the discount because the sale has ended.', '特價到 4 月 30 日，她 4 月 28 日下單。'], ['She must pay a delivery fee because the order is under $200.', '訂單是 $250，超過 $200。']],
    why: '$250 > $200 免運；會員再打九折；4/28 在活動期間。',
    cue: '條件題把人物資料逐條對照公告：金額、身分、日期。'},
  {id: 'toeic-a5', exam: 'toeic', form: 'A', skill: 'response', type: 'Part 2・應答',
    listen: 'When is the budget report due?',
    stem: '聽完問句，選出最適當的回應。',
    opts: [['By Thursday afternoon.'], ['Yes, it\'s in the report.', 'When 開頭的問句不能用 Yes／No 回答，且重複 report 是同字陷阱。'], ['About two hundred dollars.', '由 budget 聯想到金額，但問的是「何時」。']],
    why: '問 When…due，回答期限 By Thursday afternoon。',
    cue: 'Part 2 先抓第一個字（When／Where／Who），再刪掉 Yes／No 與同字陷阱。'},
  {id: 'toeic-a6', exam: 'toeic', form: 'A', skill: 'conversation', type: 'Part 3・對話',
    listen: 'Woman: Hi, I\'m calling about the printer in room 305. It keeps jamming. Man: I can send a technician this afternoon, but the earliest time is three o\'clock. Woman: That\'s fine. We have a big client presentation tomorrow, so we need it working.',
    stem: 'Why does the woman need the printer fixed quickly?',
    opts: [['She has a presentation for a client tomorrow.'], ['The technician is leaving at three.', '三點是技師最早能到的時間，不是離開時間。'], ['She wants to buy a new printer.', '她要求修理，沒有提到買新的。'], ['Room 305 will close tomorrow.', '305 是印表機所在的房間，沒說要關閉。']],
    why: 'We have a big client presentation tomorrow, so we need it working.',
    cue: '先讀題目再聽；「why」題注意 so、because 前後。'},
  // ───────── TOEIC B 卷 ─────────
  {id: 'toeic-b1', exam: 'toeic', form: 'B', skill: 'language', type: 'Part 5・介系詞',
    stem: 'The conference room is reserved ___ 2 p.m. to 4 p.m. for the sales meeting.',
    opts: [['from'], ['at', 'at 用於單一時間點，不能和 to 組成時段。'], ['on', 'on 用於日期或星期。'], ['by', 'by 表示期限，不表示時段起點。']],
    why: 'from…to… 表示時段。',
    cue: '看到後面有 to／until，回頭找 from。'},
  {id: 'toeic-b2', exam: 'toeic', form: 'B', skill: 'language', type: 'Part 5・詞性語態',
    stem: 'Ms. Kim was ___ for her outstanding work on the marketing campaign.',
    opts: [['recognized'], ['recognizing', 'was recognizing 是主動進行，句意變成她在表揚別人，且後面缺受詞。'], ['recognition', '名詞放在 was 後面會變成「她是表揚」，不通。'], ['recognize', 'was 後面不能接原形動詞。']],
    why: '她「被」表揚：was＋p.p.（被動）。',
    cue: 'be 動詞後面接 p.p. 或 V-ing，先判斷主詞是動作者還是接受者。'},
  {id: 'toeic-b3', exam: 'toeic', form: 'B', skill: 'language', type: 'Part 6・句子插入',
    stem: 'Attention all staff: The parking garage will be repainted next week. ___ We apologize for any inconvenience.',
    opts: [['During this time, please use the visitor lot on Elm Street.'], ['Our sales increased by 15 percent last quarter.', '營業額與停車場施工無關。'], ['The cafeteria now offers vegetarian options.', '餐廳菜單與停車場施工無關。'], ['Please send your résumé to the HR department.', '求職資訊與停車場施工無關。']],
    why: '施工期間給出替代停車方案，後句再為不便致歉。',
    cue: '公告的結構常是「改變 → 替代做法 → 致歉／聯絡人」。'},
  {id: 'toeic-b4', exam: 'toeic', form: 'B', skill: 'reading', type: 'Part 7・條件判斷',
    passage: 'Delta Logistics is hiring warehouse supervisors.\nRequirements: at least three years of warehouse experience. A forklift license is preferred but not required. Apply by May 15.',
    stem: 'Which applicant meets all the requirements?',
    opts: [['Someone with four years of warehouse experience and no forklift license who applies on May 10.'], ['Someone with a forklift license and one year of warehouse experience.', '倉儲經驗不足三年。'], ['Someone with five years of warehouse experience who applies on May 20.', '已超過 5 月 15 日的申請期限。'], ['Someone with two years of office experience.', '不是倉儲經驗，年資也不足三年。']],
    why: '四年倉儲經驗符合「至少三年」；堆高機證照是加分而非必要。',
    cue: '分清 required（必要）與 preferred（加分）。'},
  {id: 'toeic-b5', exam: 'toeic', form: 'B', skill: 'response', type: 'Part 2・應答',
    listen: 'Would you like me to book a taxi for you?',
    stem: '聽完問句，選出最適當的回應。',
    opts: [['Thanks, but I\'ll take the train.'], ['It\'s a good book.', 'book 在題目是「預訂」，這裡當「書」，是同字異義陷阱。'], ['At the front desk.', '回答地點，沒有回應對方的提議。']],
    why: 'Would you like me to…? 是提議，婉拒並說明替代方案最自然。',
    cue: '聽到同一個字在選項重複出現時要小心，常是陷阱。'},
  {id: 'toeic-b6', exam: 'toeic', form: 'B', skill: 'conversation', type: 'Part 3・對話',
    listen: 'Man: Did you see that our flight to Singapore is delayed? Woman: Yes, by two hours. I\'ll call the client and move our meeting to tomorrow morning. Man: Good idea. I\'ll let the hotel know we\'ll check in late.',
    stem: 'What will the woman do next?',
    opts: [['Call the client to change the meeting time.'], ['Book a new flight.', '對話沒有提到改訂機票。'], ['Contact the hotel.', '聯絡飯店的是男士。'], ['Cancel the trip.', '只是延誤兩小時，沒有取消行程。']],
    why: 'I\'ll call the client and move our meeting to tomorrow morning.',
    cue: '「next」題聽 I\'ll…；注意是誰說的。'},

  // ───────── SAT A 卷 ─────────
  {id: 'sat-a1', exam: 'sat', form: 'A', skill: 'craft', type: 'Words in Context',
    stem: 'Although the committee\'s initial response to the proposal was ___, members became enthusiastic once they saw the data on projected savings.\nWhich choice completes the text with the most logical and precise word?',
    opts: [['lukewarm'], ['ecstatic', '一開始就狂喜，和後來「變得熱情」沒有對比，Although 失去作用。'], ['unanimous', '「一致」只說明意見是否相同，不能和 enthusiastic 形成冷熱對比。'], ['hasty', '「倉促」不是熱情的反面，對比不精準。']],
    why: 'Although 表讓步：一開始冷淡（lukewarm），後來熱情。',
    cue: '先找句中的對比或因果訊號（Although、but、because），再決定空格的方向。'},
  {id: 'sat-a2', exam: 'sat', form: 'A', skill: 'craft', type: 'Text Structure and Purpose',
    stem: 'Urban gardens are often praised for supplying fresh produce to city residents. A survey of community gardeners in three cities, however, found that most participants valued the gardens less for food than for the chance to meet neighbors.\nWhich choice best describes the function of the second sentence?',
    opts: [['It presents a finding that complicates a common view stated in the first sentence.'], ['It provides an example that supports the claim in the first sentence.', 'however 顯示第二句不是支持，而是修正。'], ['It explains how researchers selected the three cities.', '句子沒有說明選城市的方法。'], ['It summarizes the main reasons gardens produce more food.', '第二句的重點是社交，不是產量。']],
    why: '第一句是常見看法，第二句用 however 提出不同的調查結果。',
    cue: '功能題看轉折字（however、yet）：第二句通常在修正或挑戰第一句。'},
  {id: 'sat-a3', exam: 'sat', form: 'A', skill: 'information', type: 'Command of Evidence',
    stem: 'A biologist hypothesizes that a species of frog changes color mainly to regulate its body temperature rather than to hide from predators.\nWhich finding, if true, would most directly support the hypothesis?',
    opts: [['The frogs become lighter on hot days even when no predators are present.'], ['The frogs\' predators can see a wide range of colors.', '這和「躲避天敵」的解釋有關，不能支持體溫假說。'], ['The frogs are found in both forests and wetlands.', '棲地資訊與變色原因無關。'], ['Some frogs of the species never change color.', '沒有說明變色的原因。']],
    why: '沒有天敵時仍隨溫度變色，直接支持「調節體溫」而不是「躲天敵」。',
    cue: '支持題要同時「符合假說」又「排除對立解釋」。'},
  {id: 'sat-a4', exam: 'sat', form: 'A', skill: 'conventions', type: 'Boundaries・標點',
    stem: 'The museum\'s newest exhibit features artifacts from three ___ Egypt, Peru, and China.\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    opts: [['civilizations:'], ['civilizations,', '逗號會讓 civilizations 與 Egypt, Peru, and China 看起來像同一串並列項目，造成歧義；在完整句後引出說明性列舉應用冒號。'], ['civilizations;', '分號兩邊都要是完整句子，Egypt, Peru, and China 不是完整句。'], ['civilizations', '沒有標點，名詞直接接列舉，句界不清。']],
    why: '前面是完整句子，冒號用來引出具體列舉。',
    cue: '冒號前必須是完整句；分號兩邊都必須是完整句。'},
  {id: 'sat-a5', exam: 'sat', form: 'A', skill: 'conventions', type: 'Form, Structure, and Sense・一致',
    stem: 'The collection of rare manuscripts, which includes letters written by several nineteenth-century scientists, ___ on display until June.\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    opts: [['is'], ['are', '主詞是單數 collection，不是 manuscripts 或 scientists。'], ['were', 'were 是複數動詞，與單數主詞 collection 不一致。'], ['have been', '複數助動詞 have 與單數主詞不一致。']],
    why: '真正主詞是 The collection（單數），中間的介系詞片語與子句不影響動詞。',
    cue: '把介系詞片語和逗號間的子句先遮住，再對主詞與動詞。'},
  {id: 'sat-a6', exam: 'sat', form: 'A', skill: 'expression', type: 'Transitions',
    stem: 'Solar panels have become far cheaper over the past decade. ___ many homeowners who once considered them too expensive are now installing them.\nWhich choice completes the text with the most logical transition?',
    opts: [['Consequently,'], ['Nevertheless,', '前後不是相反，而是因果。'], ['Similarly,', '後句不是另一個相似的情況。'], ['In contrast,', '前後沒有對比。']],
    why: '變便宜（原因）→ 更多人安裝（結果）。',
    cue: '轉折題先寫出兩句關係：因果、轉折、舉例、補充。'},
  // ───────── SAT B 卷 ─────────
  {id: 'sat-b1', exam: 'sat', form: 'B', skill: 'craft', type: 'Words in Context',
    stem: 'The novelist\'s prose is notably ___: she uses few adjectives and rarely writes a sentence longer than ten words.\nWhich choice completes the text with the most logical and precise word?',
    opts: [['spare'], ['ornate', '華麗的，與「形容詞少、句子短」相反。'], ['verbose', '冗長的，與「句子很短」相反。'], ['archaic', '古老的，文中沒有提到用字古舊。']],
    why: '冒號後說明形容詞少、句子短，對應 spare（簡練的）。',
    cue: '冒號後面就是空格的定義，直接拿來比對。'},
  {id: 'sat-b2', exam: 'sat', form: 'B', skill: 'craft', type: 'Text Structure and Purpose',
    stem: 'Many people assume that octopuses, being solitary animals, have little capacity for social learning. In one experiment, however, young octopuses that watched another octopus open a jar solved the same task faster than those that did not.\nWhich choice best states the main purpose of the text?',
    opts: [['To present evidence that challenges an assumption about octopuses'], ['To explain why octopuses prefer to live alone', '文中沒有解釋獨居的原因。'], ['To describe how jars are used in marine research', '罐子只是實驗工具，不是重點。'], ['To argue that octopuses are more intelligent than all other animals', '說法過度，文中沒有和其他動物比較。']],
    why: '先提出常見假設，再用 however 帶出挑戰該假設的實驗證據。',
    cue: '主旨題避免範圍過大或過度推論的選項（all、always）。'},
  {id: 'sat-b3', exam: 'sat', form: 'B', skill: 'information', type: 'Command of Evidence',
    stem: 'A historian claims that a town\'s newspaper in 1880 exaggerated the size of a local festival to attract visitors.\nWhich finding, if true, would most strongly support the claim?',
    opts: [['Railway ticket records show far fewer arrivals that week than the newspaper reported.'], ['The newspaper also reported on the weather that week.', '天氣報導與是否誇大人數無關。'], ['The festival has been held every year since 1850.', '歷史長短不能說明報導是否誇大。'], ['Other towns in the region held smaller festivals.', '其他城鎮的規模不能證明這份報紙誇大。']],
    why: '獨立紀錄顯示實際人數遠少於報導，直接支持「誇大」。',
    cue: '支持「誇大」的最佳證據是：獨立來源的實際數字比報導小。'},
  {id: 'sat-b4', exam: 'sat', form: 'B', skill: 'conventions', type: 'Boundaries・句界',
    stem: 'The research team spent three months in the ___ collected more than 400 ice samples.\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    opts: [['Arctic; they'], ['Arctic, they', '兩個完整句只用逗號連接，形成逗號拼接（comma splice）。'], ['Arctic they', '兩個完整句之間沒有標點，形成連寫句（run-on）。'], ['Arctic, which they', 'which 引導的子句缺少可指代的空位，句子不通。']],
    why: '兩個獨立子句用分號連接最正確。',
    cue: '先數完整句子：兩個完整句之間需要句號、分號，或逗號＋連接詞。'},
  {id: 'sat-b5', exam: 'sat', form: 'B', skill: 'conventions', type: 'Form, Structure, and Sense・一致',
    stem: 'Each of the volunteers who helped clean the beaches ___ a certificate of appreciation.\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    opts: [['receives'], ['receive', 'Each of… 主詞是 each（單數），動詞要用單數。'], ['are receiving', '複數 be 動詞與單數主詞 each 不一致。'], ['have received', '複數助動詞 have 與單數主詞 each 不一致。']],
    why: 'Each of the volunteers 的主詞是 Each，單數動詞 receives。',
    cue: 'Each of、One of、Every 開頭，動詞看 each／one（單數）。'},
  {id: 'sat-b6', exam: 'sat', form: 'B', skill: 'expression', type: 'Transitions',
    stem: 'The first trial of the new vaccine showed promising results. ___ researchers cautioned that a larger study was needed before drawing firm conclusions.\nWhich choice completes the text with the most logical transition?',
    opts: [['Still,'], ['Therefore,', '「結果好」不會導致「提醒需要更大研究」，不是因果。'], ['For example,', '後句不是前句的例子。'], ['Likewise,', '後句不是相似的好消息，而是保留。']],
    why: '前句正面，後句保留提醒，用 Still（儘管如此）。',
    cue: '「好消息」後面接「但要小心」，常用 Still、However。'},

  // ───────── GRE A 卷 ─────────
  {id: 'gre-a1', exam: 'gre', form: 'A', skill: 'completion', type: 'Text Completion',
    stem: 'Although the critic was known for her ___ reviews, her assessment of the debut novel was surprisingly generous.',
    opts: [['scathing'], ['lavish', '「慷慨的」與 generous 同方向，Although 與 surprisingly 會失去對比。'], ['tentative', '「猶豫的」不是 generous 的反面。'], ['anonymous', '「匿名的」與評論寬嚴無關。'], ['prolific', '「多產的」說的是數量，不是語氣。']],
    why: 'Although＋surprisingly generous → 平常是嚴厲的評論 scathing。',
    cue: '先自己填一個中文詞（「很兇的」），再去選項找最接近的字。'},
  {id: 'gre-a2', exam: 'gre', form: 'A', skill: 'completion', type: 'Text Completion',
    stem: 'The professor\'s explanation was so ___ that even students with no background in physics could follow it.',
    opts: [['lucid'], ['convoluted', '錯綜複雜，與「沒背景也能懂」相反。'], ['cursory', '草率的，不一定讓人看懂。'], ['pedantic', '賣弄學問的，通常讓人更難懂。'], ['esoteric', '深奧難懂的，與句意相反。']],
    why: 'so…that 結果是「人人都懂」，所以解釋清楚易懂 lucid。',
    cue: 'so…that 的結果子句就是空格的證據。'},
  {id: 'gre-a3', exam: 'gre', form: 'A', skill: 'equivalence', type: 'Sentence Equivalence（選二）', select: 2,
    stem: 'The senator\'s speech was ___, touching on many topics but never settling on a clear position.',
    opts: [['rambling'], ['discursive'], ['incisive', '一針見血，與「沒有明確立場」相反。'], ['succinct', '簡潔的，與「談很多主題」相反。'], ['persuasive', '有說服力的，句中沒有支持。'], ['fervent', '熱烈的，說的是情緒，不是內容散亂。']],
    why: 'rambling 與 discursive 都表示「東拉西扯、離題」，代入後句意相同。',
    cue: '選二題要找兩個「放進去意思一樣」的字，單一字對還不算得分。'},
  {id: 'gre-a4', exam: 'gre', form: 'A', skill: 'equivalence', type: 'Sentence Equivalence（選二）', select: 2,
    stem: 'Far from being ___, the new policy was adopted only after months of careful consultation.',
    opts: [['hasty'], ['precipitate'], ['deliberate', '經過深思的，與 Far from 要否定的意思相反。'], ['popular', '受歡迎與「是否倉促」無關。'], ['controversial', '有爭議與「是否倉促」無關。'], ['thorough', '周全的，與要否定的意思相反。']],
    why: 'Far from being X＝一點也不 X；後面說經過數月審慎諮詢，所以 X＝倉促：hasty／precipitate。',
    cue: 'Far from、rather than 會把空格翻成與後文相反的意思。'},
  {id: 'gre-a5', exam: 'gre', form: 'A', skill: 'reading', type: 'Reading Comprehension',
    passage: 'Historians once treated diaries as transparent records of daily life. More recent scholarship, however, emphasizes that diarists often wrote with an audience in mind—family members, future readers, or even an idealized version of themselves—and therefore shaped their entries accordingly. This does not make diaries useless as evidence; rather, it requires historians to ask not only what a diary says but why it was written that way.',
    stem: 'The author suggests that historians should regard diaries as',
    opts: [['useful evidence that must be interpreted in light of the writer\'s intended audience'], ['unreliable sources that historians should avoid', '原文明說 does not make diaries useless。'], ['more accurate than official government records', '文中沒有和官方紀錄比較。'], ['private documents never meant to be read by others', '新研究正是指出日記常有讀者設定。'], ['valuable mainly for studying handwriting', '文中沒有提到筆跡。']],
    why: '仍是證據（not useless），但要問「為什麼這樣寫」，也就是考慮預設讀者。',
    cue: '推論題找作者的平衡結論句（rather, it requires…）。'},
  {id: 'gre-a6', exam: 'gre', form: 'A', skill: 'reading', type: 'Reading Comprehension',
    passage: 'Historians once treated diaries as transparent records of daily life. More recent scholarship, however, emphasizes that diarists often wrote with an audience in mind—family members, future readers, or even an idealized version of themselves—and therefore shaped their entries accordingly. This does not make diaries useless as evidence; rather, it requires historians to ask not only what a diary says but why it was written that way.',
    stem: 'The author mentions "an idealized version of themselves" primarily to',
    opts: [['illustrate one kind of audience that may influence how a diarist writes'], ['argue that diarists were usually dishonest', '「塑造內容」不等於說謊，選項過度推論。'], ['suggest that diaries were written mainly for publication', '這是在列舉讀者類型，不是說為了出版。'], ['explain why historians stopped reading diaries', '原文說日記仍然有用。'], ['show that diaries describe only ideal days', '過度推論，文中沒有這樣說。']],
    why: '它出現在破折號列舉的讀者類型中，是例子之一。',
    cue: '作用題先看該詞在句中的位置：破折號內的列舉通常是「舉例」。'},
  // ───────── GRE B 卷 ─────────
  {id: 'gre-b1', exam: 'gre', form: 'B', skill: 'completion', type: 'Text Completion',
    stem: 'The CEO\'s ___ manner—she rarely spoke in meetings and avoided interviews—surprised journalists who had expected a flamboyant leader.',
    opts: [['reticent'], ['garrulous', '多話的，與「很少發言」相反。'], ['bombastic', '浮誇的，與「低調」相反。'], ['gregarious', '愛社交的，與「避開採訪」相反。'], ['volatile', '情緒多變的，破折號內沒有支持。']],
    why: '破折號內說明她很少發言、避開採訪：沉默寡言 reticent。',
    cue: '破折號中的說明就是空格的定義。'},
  {id: 'gre-b2', exam: 'gre', form: 'B', skill: 'completion', type: 'Text Completion',
    stem: 'Because the evidence was largely ___, the jury was reluctant to convict without a confession.',
    opts: [['circumstantial'], ['conclusive', '決定性的證據會讓陪審團願意定罪，與句意相反。'], ['incontrovertible', '無可辯駁的，同樣與「不願定罪」相反。'], ['forensic', '鑑識證據通常被視為有力，不能解釋陪審團為何不願定罪。'], ['documented', '有文件記錄的，不能解釋陪審團的猶豫。']],
    why: '證據多為間接（circumstantial），所以沒有自白就不願定罪。',
    cue: 'Because 引導原因，要讓結果（不願定罪）合理。'},
  {id: 'gre-b3', exam: 'gre', form: 'B', skill: 'equivalence', type: 'Sentence Equivalence（選二）', select: 2,
    stem: 'The new manager\'s approach was ___: she reversed several long-standing policies in her first week.',
    opts: [['radical'], ['drastic'], ['cautious', '謹慎的，與「第一週就推翻多項政策」相反。'], ['incremental', '漸進的，與「一次大幅改變」相反。'], ['popular', '受歡迎與否，句中沒有支持。'], ['customary', '慣常的，與推翻長期政策相反。']],
    why: 'radical 與 drastic 都表示「激烈、大幅」，代入後句意相同。',
    cue: '冒號後的事實（第一週推翻多項政策）定義了空格。'},
  {id: 'gre-b4', exam: 'gre', form: 'B', skill: 'equivalence', type: 'Sentence Equivalence（選二）', select: 2,
    stem: 'Despite the author\'s reputation for ___, his latest essay is remarkably brief.',
    opts: [['verbosity'], ['prolixity'], ['concision', '簡潔，與 Despite…brief 的對比相反。'], ['clarity', '清晰與「長短」不是對比。'], ['humor', '幽默與長短無關。'], ['accuracy', '準確與長短無關。']],
    why: 'Despite 表對比：一向冗長（verbosity／prolixity），這篇卻很短。',
    cue: 'Despite＋X，後面的事實與 X 相反。'},
  {id: 'gre-b5', exam: 'gre', form: 'B', skill: 'reading', type: 'Reading Comprehension',
    passage: 'Early studies of animal behavior assumed that tool use was a uniquely human trait. When researchers documented chimpanzees using sticks to extract termites, some scientists responded not by abandoning the assumption but by redefining "tool" more narrowly. Critics argued that such redefinitions protected the theory rather than tested it.',
    stem: 'The critics mentioned in the passage would most likely agree that',
    opts: [['changing a definition to fit new evidence can prevent a theory from being properly tested'], ['chimpanzees do not actually use tools', '批評者反對的是改定義，不是否認黑猩猩用工具。'], ['tool use is a uniquely human trait', '這正是被質疑的假設。'], ['termites are difficult to study', '文中沒有談研究白蟻的難度。'], ['narrower definitions are always more scientific', '批評者的立場正好相反，且 always 過度。']],
    why: '批評者說重新定義是「保護理論而不是檢驗理論」。',
    cue: '人物觀點題，把該人物說的那句話換句話說就是答案。'},
  {id: 'gre-b6', exam: 'gre', form: 'B', skill: 'reading', type: 'Reading Comprehension',
    passage: 'Early studies of animal behavior assumed that tool use was a uniquely human trait. When researchers documented chimpanzees using sticks to extract termites, some scientists responded not by abandoning the assumption but by redefining "tool" more narrowly. Critics argued that such redefinitions protected the theory rather than tested it.',
    stem: 'The primary purpose of the passage is to',
    opts: [['describe a response to new evidence and a criticism of that response'], ['prove that humans are the only tool users', '文章並未支持這個假設。'], ['compare chimpanzees with other primates', '沒有比較其他靈長類。'], ['explain how termites build their mounds', '白蟻只是例子中的細節。'], ['argue that early studies were completely worthless', '說法過度，文中沒有這個結論。']],
    why: '文章依序呈現：舊假設 → 新證據 → 部分學者改定義 → 批評者的回應。',
    cue: '主旨題把每句的角色寫成一個動詞（假設、發現、回應、批評）。'},

  // ───────── GMAT A 卷 ─────────
  {id: 'gmat-a1', exam: 'gmat', form: 'A', skill: 'critical', type: 'CR・削弱',
    stem: 'Last year, Café Nova introduced a loyalty-card program, and its revenue rose 20 percent. The owner concludes that the loyalty program caused the increase.\nWhich of the following, if true, most seriously weakens the conclusion?',
    opts: [['A large office building opened next to Café Nova last year, bringing hundreds of new workers to the area.'], ['Many customers say they enjoy collecting stamps on the card.', '這反而支持顧客喜歡集點，沒有削弱因果。'], ['Café Nova\'s prices did not change last year.', '排除了「漲價」這個替代原因，反而略為加強結論。'], ['Other cafés in the city also offer loyalty cards.', '別家也有集點卡，不影響本店的因果判斷。'], ['The loyalty program cost little to run.', '成本高低與營收增加的原因無關。']],
    why: '提出另一個可能原因（新辦公大樓帶來客人），削弱「集點卡造成成長」。',
    cue: '因果結論的削弱首選「替代原因」。'},
  {id: 'gmat-a2', exam: 'gmat', form: 'A', skill: 'critical', type: 'CR・假設',
    stem: 'The city plans to reduce traffic congestion downtown by raising parking fees there. Therefore, fewer people will drive downtown.\nThe argument assumes which of the following?',
    opts: [['At least some people who would otherwise drive downtown will decide not to because of the higher parking fees.'], ['Public transportation downtown is free.', '不必免費，結論也可能成立。'], ['Parking fees are higher in other cities.', '其他城市的收費與本論證無關。'], ['Most downtown workers live in the suburbs.', '住哪裡不影響「漲價是否讓人少開車」這個關鍵。'], ['The city will use the parking revenue to build roads.', '收入用途與是否減少開車無關。']],
    why: '否定測試：若沒有任何人因停車費上漲而不開車進市區，結論就不成立，所以這是必要假設。',
    cue: '假設題用否定測試：把選項反過來，結論會垮的就是答案。'},
  {id: 'gmat-a3', exam: 'gmat', form: 'A', skill: 'critical', type: 'CR・評估',
    stem: 'A school found that students who used a new math app scored higher on exams than students who did not, and concluded that the app improves performance.\nWhich of the following would be most useful to know in evaluating the conclusion?',
    opts: [['Whether students who chose to use the app were already stronger in math before using it'], ['How much the app costs per student', '價格與「是否提升成績」無關。'], ['Whether the app is available in other languages', '語言版本與成效無關。'], ['How many teachers like the app', '老師喜不喜歡不能證明成效。'], ['Whether the exams were held in the morning', '只問考試是否在早上，沒有區分使用與未使用 App 的兩組，無法判斷成績差異的原因。']],
    why: '若使用者本來就比較強（自我選擇），成績差異就不能歸功於 App。',
    cue: '評估題找「答案是／否會讓結論變強或變弱」的問題。'},
  {id: 'gmat-a4', exam: 'gmat', form: 'A', skill: 'critical', type: 'CR・加強',
    stem: 'Researchers concluded that a new fertilizer increases tomato yields because farms that used it produced 15 percent more tomatoes than farms that did not.\nWhich of the following, if true, most strengthens the conclusion?',
    opts: [['The farms that used the fertilizer and those that did not had similar soil, weather, and tomato varieties.'], ['The fertilizer is more expensive than older fertilizers.', '價格與產量因果無關。'], ['Some farms that used the fertilizer also grew peppers.', '種辣椒與番茄產量無關。'], ['Tomato prices rose that year.', '價格上漲不能說明產量差異的原因。'], ['Farmers who used the fertilizer were satisfied with it.', '滿意度不是產量證據。']],
    why: '排除土壤、天氣、品種等替代原因，讓肥料成為最可能的解釋。',
    cue: '加強因果：排除替代原因，或補上機制證據。'},
  {id: 'gmat-a5', exam: 'gmat', form: 'A', skill: 'reading', type: 'RC・推論',
    passage: 'Companies often assume that offering more product choices will increase sales. However, several field studies have found that when shoppers face too many similar options, they are more likely to delay purchasing or buy nothing at all. Researchers call this "choice overload." Yet the effect is not universal: when shoppers already know what they want, or when options are clearly organized into categories, a large assortment can attract customers rather than discourage them.',
    stem: 'The passage suggests that a large assortment is LEAST likely to discourage purchases when',
    opts: [['shoppers have clear preferences before shopping'], ['the options are very similar to one another', '這正是造成選擇過載的條件。'], ['shoppers are unfamiliar with the product category', '不熟悉時更可能不知所措，與文中條件相反。'], ['the products are displayed without any organization', '文中說「清楚分類」才會吸引人，沒有分類相反。'], ['prices are higher than average', '文中沒有提到價格。']],
    why: 'when shoppers already know what they want…a large assortment can attract customers.',
    cue: 'LEAST likely to discourage＝最可能有幫助；找文中的例外條件。'},
  {id: 'gmat-a6', exam: 'gmat', form: 'A', skill: 'reading', type: 'RC・主旨',
    passage: 'Companies often assume that offering more product choices will increase sales. However, several field studies have found that when shoppers face too many similar options, they are more likely to delay purchasing or buy nothing at all. Researchers call this "choice overload." Yet the effect is not universal: when shoppers already know what they want, or when options are clearly organized into categories, a large assortment can attract customers rather than discourage them.',
    stem: 'The primary purpose of the passage is to',
    opts: [['qualify a research finding by describing conditions under which it may not hold'], ['argue that companies should always limit product choices', 'always 過度，文末說明大量選項也可能有利。'], ['explain how researchers design field studies', '沒有談研究設計。'], ['prove that larger assortments always increase sales', '與 choice overload 的發現相反，且 always 過度。'], ['describe the history of retail marketing', '沒有談歷史。']],
    why: '先介紹選擇過載，再用 Yet 說明它不是在所有情況都成立。',
    cue: 'Yet the effect is not universal 是作者「加上限制」的訊號。'},
  // ───────── GMAT B 卷 ─────────
  {id: 'gmat-b1', exam: 'gmat', form: 'B', skill: 'critical', type: 'CR・削弱',
    stem: 'Town officials found that residents living near the new park report better moods than residents elsewhere, and they conclude that the park improves residents\' moods.\nWhich of the following, if true, most seriously weakens the conclusion?',
    opts: [['Homes near the park are more expensive, and their residents have higher average incomes, which are associated with better moods.'], ['The park has a playground and walking trails.', '描述公園設施，反而可能支持公園的效果。'], ['Mood surveys were conducted in the spring.', '兩組都在春天調查，不會造成差異。'], ['The park was built with public funds.', '經費來源與心情無關。'], ['The town plans to build a second park next year.', '未來計畫不影響目前的因果判斷。']],
    why: '收入可能才是心情較好的原因（替代原因／混淆因素）。',
    cue: '比較兩群人時，先問：兩群人本來就不一樣嗎？'},
  {id: 'gmat-b2', exam: 'gmat', form: 'B', skill: 'critical', type: 'CR・假設',
    stem: 'Since the company switched to a four-day work week, employee errors have declined. So the shorter week reduced errors.\nThe argument depends on which of the following assumptions?',
    opts: [['The decline in errors was not entirely the result of some other change made at about the same time.'], ['Employees prefer a four-day work week.', '員工喜好與錯誤減少的原因無關。'], ['Other companies have also adopted four-day weeks.', '其他公司的做法與本公司因果無關。'], ['Errors were very common before the switch.', '錯誤多寡不是論證需要的前提。'], ['Productivity increased after the switch.', '生產力不是這個論證的必要條件。']],
    why: '否定測試：若錯誤減少完全是同時期其他改變造成的，結論就不成立。',
    cue: '「時間先後 → 因果」的論證，必要假設常是「不完全是其他原因造成」；假設只需要最低限度。'},
  {id: 'gmat-b3', exam: 'gmat', form: 'B', skill: 'critical', type: 'CR・評估',
    stem: 'A city reports that crime fell after it installed brighter streetlights, and it concludes that the lights reduced crime.\nWhich of the following would be most useful to know in evaluating the conclusion?',
    opts: [['Whether crime also fell during the same period in similar neighborhoods without new lights'], ['How much electricity the new lights use', '用電量與犯罪因果無關。'], ['Whether residents like the color of the lights', '喜好與犯罪率無關。'], ['Which company manufactured the lights', '製造商與因果無關。'], ['How many streetlights the city had in 1990', '久遠的數量與本次變化無關。']],
    why: '若沒裝新燈的地區犯罪也同樣下降，路燈就不是原因；若沒下降，結論被加強。',
    cue: '評估因果：找「對照組」資訊。'},
  {id: 'gmat-b4', exam: 'gmat', form: 'B', skill: 'critical', type: 'CR・解釋矛盾',
    stem: 'After a bakery lowered the price of its bread by 10 percent, its total revenue from bread increased.\nWhich of the following, if true, best explains this?',
    opts: [['The lower price led customers to buy enough additional bread to more than offset the lower price per loaf.'], ['The bakery\'s costs for flour increased.', '成本變化不影響「營收」為何增加。'], ['The bakery also sells cakes.', '蛋糕與麵包營收無關。'], ['Some customers did not notice the price change.', '沒注意到降價的人不會因此多買，無法解釋營收增加。'], ['Competitors raised their prices for cakes.', '對手的蛋糕價格與本店麵包營收無關。']],
    why: '營收＝價格×數量；銷量增加夠多，就能彌補單價下降。',
    cue: '矛盾題找能讓「兩件事同時成立」的選項，營收題想「價×量」。'},
  {id: 'gmat-b5', exam: 'gmat', form: 'B', skill: 'reading', type: 'RC・觀點',
    passage: 'For decades, economists assumed that people make financial decisions by carefully weighing costs and benefits. Behavioral economists challenged this view by showing that small changes in how choices are presented—such as making retirement savings the default option—can greatly change behavior. Critics respond that such "nudges" may work in the short term but do little to improve people\'s understanding of their own finances.',
    stem: 'The critics mentioned in the passage would most likely agree that',
    opts: [['changing behavior through default options does not necessarily increase financial understanding'], ['default options have no effect on behavior', '批評者承認短期可能有效。'], ['people always weigh costs and benefits carefully', '這是被行為經濟學挑戰的舊觀點，不是批評者的說法。'], ['retirement savings should never be a default option', '說法過度，文中沒有。'], ['behavioral economics has been proven wrong', '說法過度，批評者只指出限制。']],
    why: '批評者說推力短期有效，但不太能增進理解。',
    cue: '觀點題注意限制語氣：may work…but do little to…'},
  {id: 'gmat-b6', exam: 'gmat', form: 'B', skill: 'reading', type: 'RC・作用',
    passage: 'For decades, economists assumed that people make financial decisions by carefully weighing costs and benefits. Behavioral economists challenged this view by showing that small changes in how choices are presented—such as making retirement savings the default option—can greatly change behavior. Critics respond that such "nudges" may work in the short term but do little to improve people\'s understanding of their own finances.',
    stem: 'The passage mentions "making retirement savings the default option" primarily to',
    opts: [['give an example of how the way choices are presented can affect behavior'], ['argue that all savings plans should be mandatory', '預設選項不是強制，選項扭曲原意。'], ['show that the traditional economic view was correct', '這個例子用來挑戰傳統觀點。'], ['explain how retirement plans are taxed', '文中沒有談稅。'], ['criticize behavioral economists', '這是行為經濟學家的例子，不是批評。']],
    why: '破折號中的 such as 是舉例，說明呈現方式如何改變行為。',
    cue: 'such as、for example 引出的內容，作用多半是「舉例支持前一句」。'}
];

function hash(text) {
  let h = 2166136261;
  for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}

function seededOrder(length, seed) {
  const order = Array.from({length}, (_, i) => i);
  let s = seed || 1;
  for (let i = length - 1; i > 0; i--) {
    s = Math.imul(s ^ (s >>> 15), 2246822519) >>> 0;
    s = Math.imul(s ^ (s >>> 13), 3266489917) >>> 0;
    const j = s % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function buildItem(raw) {
  const select = raw.select || 1;
  const authored = raw.opts.map((opt, i) => ({
    text: opt[0],
    note: opt[1] || '',
    ok: opt[2] === true || (!raw.keep && i < select)
  }));
  const order = raw.keep ? authored.map((_, i) => i) : seededOrder(authored.length, hash(raw.id));
  const shown = order.map(i => authored[i]);
  const answers = shown.map((opt, i) => opt.ok ? i : -1).filter(i => i >= 0);
  const wrong = {};
  shown.forEach((opt, i) => { if (!opt.ok) wrong[i] = opt.note; });
  const {opts, keep, ...rest} = raw;
  return {
    ...rest,
    select,
    options: shown.map(opt => opt.text),
    answer: select === 1 ? answers[0] : answers,
    wrong
  };
}

export const BENCH_ITEMS = RAW_ITEMS.map(buildItem);
export const itemsFor = (examId, form) => BENCH_ITEMS.filter(item => item.exam === examId && item.form === form);
export const examById = id => BENCH_EXAMS.find(exam => exam.id === id);
