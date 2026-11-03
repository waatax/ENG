// Interactive Minimal-Pair Ear Trainer, 3-Speed Sentence Dictation & Connected-Speech Lab,
// and Web Speech API (SpeechRecognition + self-evaluation fallback) Speaking & Shadowing Coach.

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const STUDIO_STORAGE_KEY = 'english-quest-studio-v1';

export const MINIMAL_PAIRS = [
  {
    id: 'mp-01',
    contrast: '/æ/ vs /ɛ/',
    title: '蝴蝶音 /æ/ 與短母音 /ɛ/',
    tip: '發 /æ/ 時下巴明顯往下張大、舌頭壓低（如 pan）；發 /ɛ/ 時嘴巴僅半開、嘴角微向兩側（如 pen）。',
    pairs: [
      ['pan', '平底鍋', 'pen', '原子筆', 'Put the pan on the stove, and keep the pen on the desk.'],
      ['bad', '壞的', 'bed', '床', 'It is bad to eat snacks right before going to bed.'],
      ['man', '男人', 'men', '男人們', 'One man stood by the door while three men waited outside.'],
      ['sat', '坐下(過去式)', 'set', '擺設／設定', 'She sat down after she set the alarm clock.']
    ]
  },
  {
    id: 'mp-02',
    contrast: '/ɪ/ vs /iː/',
    title: '短放鬆母音 /ɪ/ 與長緊張母音 /iː/',
    tip: '/ɪ/ 舌位較低且肌肉放鬆短促（如 ship）；/iː/ 嘴角向兩側拉平、舌位高且持續較長（如 sheep）。',
    pairs: [
      ['ship', '大船', 'sheep', '綿羊', 'The big ship carried hundreds of white sheep.'],
      ['bit', '一點點', 'beat', '節拍／打敗', 'Wait a bit and listen to the drum beat.'],
      ['live', '居住', 'leave', '離開', 'Where will you live after you leave this city?'],
      ['sit', '坐', 'seat', '座位', 'Please sit down in your own seat.']
    ]
  },
  {
    id: 'mp-03',
    contrast: '/f/ vs /v/',
    title: '唇齒無聲 /f/ 與有聲 /v/',
    tip: '兩者都是上排門牙輕觸下唇；/f/ 只吹氣不震動聲帶（如 fan），/v/ 喉嚨聲帶會明顯震動（如 van）。',
    pairs: [
      ['fan', '電風扇', 'van', '廂型車', 'We loaded the electric fan into the delivery van.'],
      ['fine', '良好的', 'vine', '藤蔓', 'The grapes on the vine look fine today.'],
      ['leaf', '樹葉(單數)', 'leave', '離開', 'A green leaf fell just as we were about to leave.'],
      ['safe', '安全的', 'save', '拯救／儲蓄', 'Keep your password safe to save your account.']
    ]
  },
  {
    id: 'mp-04',
    contrast: '/θ/ vs /s/',
    title: '咬舌無聲 /θ/ 與齒齦音 /s/',
    tip: '發 /θ/ 時舌尖必須輕輕伸到上下齒之間吐氣（如 think）；不可縮回齒後發成 /s/（如 sink）。',
    pairs: [
      ['think', '思考', 'sink', '水槽／下沉', 'I think the dishes are still in the kitchen sink.'],
      ['thank', '感謝', 'sank', '下沉(過去式)', 'Thank goodness nobody was hurt when the boat sank.'],
      ['path', '小徑', 'pass', '通過', 'Walk along this mountain path to pass the gate.'],
      ['mouth', '嘴巴', 'mouse', '老鼠', 'The cat opened its mouth when it saw a mouse.']
    ]
  },
  {
    id: 'mp-05',
    contrast: '/ð/ vs /d/',
    title: '咬舌有聲 /ð/ 與齒齦塞音 /d/',
    tip: '/ð/ 是舌尖在齒間持續震動摩擦（如 they）；/d/ 是舌尖頂住上齒齦後彈開（如 day）。',
    pairs: [
      ['they', '他們', 'day', '日子／白天', 'They practice English every single day.'],
      ['then', '然後', 'den', '獸穴／小書房', 'First we cleaned the living room, and then the den.'],
      ['breathe', '呼吸(動詞)', 'breed', '培育／品種', 'Take time to breathe deeply and relax.'],
      ['though', '雖然', 'dough', '麵團', 'She kneaded the bread dough even though she was tired.']
    ]
  },
  {
    id: 'mp-06',
    contrast: '/l/ vs /r/',
    title: '舌邊音 /l/ 與捲舌音 /r/',
    tip: '發 /l/ 時舌尖確實頂住上排門牙後方的齒齦（如 light）；發 /r/ 時舌尖微向後捲、絕不碰到上顎，且雙唇微圓（如 right）。',
    pairs: [
      ['light', '燈光／輕的', 'right', '右邊／正確的', 'Turn on the light on your right side.'],
      ['glass', '玻璃杯', 'grass', '草地', 'Do not leave a glass cup on the green grass.'],
      ['long', '長的', 'wrong', '錯誤的', 'We walked a long way before realizing it was the wrong road.'],
      ['fly', '飛', 'fry', '油煎', 'Birds fly in the sky while we fry eggs in the pan.']
    ]
  },
  {
    id: 'mp-07',
    contrast: '/n/ vs /ŋ/',
    title: '前鼻音 /n/ 與後鼻音 /ŋ/',
    tip: '字尾 /n/ 舌尖要頂回上齒齦（如 thin）；字尾 /ŋ/ 舌尖放鬆在下齒後，由舌根抬起貼住軟顎發鼻音（如 thing）。',
    pairs: [
      ['thin', '薄的／瘦的', 'thing', '事物', 'This thin notebook is the most useful thing in my bag.'],
      ['win', '贏得', 'wing', '翅膀', 'The eagle spread its wing to win the race against the wind.'],
      ['ran', '跑(過去式)', 'rang', '響起(過去式)', 'He ran to the door when the doorbell rang.'],
      ['sun', '太陽', 'sung', '唱(過去分詞)', 'The morning song was sung as the sun rose.']
    ]
  },
  {
    id: 'mp-08',
    contrast: '/ʃ/ vs /tʃ/',
    title: '摩擦音 /ʃ/ 與破擦音 /tʃ/',
    tip: '/ʃ/ 可以持續吹氣延長（如 share = shhhh-are）；/tʃ/ 必須先擋住氣流再瞬間爆破衝出（如 chair）。',
    pairs: [
      ['share', '分享', 'chair', '椅子', 'Can we share this long wooden chair?'],
      ['ship', '大船', 'chip', '洋芋片／晶片', 'He ate a potato chip while watching the cruise ship.'],
      ['wash', '清洗', 'watch', '手錶／觀看', 'Take off your watch before you wash your hands.'],
      ['cash', '現金', 'catch', '接住／趕上', 'Bring some cash so we can catch the last bus.']
    ]
  },
  {
    id: 'mp-09',
    contrast: '/ɑː/ vs /oʊ/',
    title: '張口母音 /ɑː/ 與雙母音 /oʊ/',
    tip: '美式發 not (/nɑːt/) 時嘴巴打開不圓唇；發 note (/noʊt/) 時結尾雙唇必須明顯收圓成小圓孔。',
    pairs: [
      ['not', '不', 'note', '筆記／紙條', 'Do not forget to read the note on the table.'],
      ['clock', '時鐘', 'cloak', '斗篷', 'He hung his warm cloak beside the wall clock.'],
      ['cost', '花費', 'coast', '海岸', 'Living along the coast can cost a lot of money.'],
      ['rod', '釣竿／長桿', 'road', '道路', 'He carried his fishing rod down the quiet road.']
    ]
  },
  {
    id: 'mp-10',
    contrast: '/ʌ/ vs /ɑː/',
    title: '中央短母音 /ʌ/ 與後開母音 /ɑː/',
    tip: '/ʌ/ 在口腔正中央、短促輕快（如 cup）；/ɑː/ 下巴張得更大、發音位置偏口腔後方（如 cop）。',
    pairs: [
      ['cup', '杯子', 'cop', '警察(口語)', 'The friendly cop held a warm cup of coffee.'],
      ['luck', '運氣', 'lock', '鎖', 'With a little luck, this key will open the old lock.'],
      ['hut', '小屋', 'hot', '炎熱的', 'We rested inside the wooden hut on a hot afternoon.'],
      ['nut', '堅果', 'not', '不', 'This snack is a healthy nut, not candy.']
    ]
  },
  {
    id: 'mp-11',
    contrast: '字尾清濁塞音 (-p/-b, -t/-d, -k/-g)',
    title: '字尾無聲與有聲子音（母音長短關鍵）',
    tip: '英語字尾子音常不強烈爆破，母語者主要靠「前面母音的長短」分辨：有聲子音（b, d, g）前面的母音會比無聲子音（p, t, k）長約一倍！',
    pairs: [
      ['cap', '棒球帽', 'cab', '計程車', 'He left his blue cap inside the yellow cab.'],
      ['hat', '帽子', 'had', '有(過去式)', 'She had a warm wool hat last winter.'],
      ['back', '背部／後面', 'bag', '袋子／書包', 'Put the heavy bag on the back seat.'],
      ['rope', '繩索', 'robe', '長袍／浴袍', 'Tie the cotton robe with this soft rope.']
    ]
  },
  {
    id: 'mp-12',
    contrast: '子音群 /pl, gl, kl/ vs /pr, gr, kr/',
    title: '雙子音連綴（避免插入多餘母音）',
    tip: '第一個子音 /p, g, k/ 釋放的瞬間，舌頭已經在 /l/（頂齒齦）或 /r/（微捲舌）的位置，中間不可夾入「ㄜ」音。',
    pairs: [
      ['play', '玩耍／演奏', 'pray', '祈禱', 'The children play outside while their grandparents pray.'],
      ['glow', '發光', 'grow', '成長／種植', 'Fireflies glow where tall wildflowers grow.'],
      ['cloud', '雲朵', 'crowd', '人群', 'A cheering crowd looked up at the bright cloud.'],
      ['flame', '火焰', 'frame', '畫框／結構', 'Keep the candle flame away from the wooden picture frame.']
    ]
  }
];

export const DICTATION_ITEMS = [
  {
    id: 'dic-pre1',
    cefr: 'Pre-A1',
    text: 'Good morning, nice to meet you.',
    zh: '早安，很高興認識你。',
    speechNote: '連音與弱讀：meet you 常連音成 /miːtʃu/；to 在子音前弱讀為輕快的 /tə/。'
  },
  {
    id: 'dic-pre2',
    cefr: 'Pre-A1',
    text: 'Can I have a cup of water, please?',
    zh: '請問可以給我一杯水嗎？',
    speechNote: '連音解碼：Can I 連讀為 /kænaɪ/；cup of 連讀為 /kʌpəv/，of 的 f 發有聲 /v/。'
  },
  {
    id: 'dic-a1-1',
    cefr: 'A1',
    text: 'My brother takes the bus to school every day.',
    zh: '我哥哥每天搭公車去上學。',
    speechNote: '子音銜接：takes the 的字尾 /s/ 不停頓直接滑向 /ð/；to school 的 to 弱讀為 /tə/。'
  },
  {
    id: 'dic-a1-2',
    cefr: 'A1',
    text: 'What time does the train leave tomorrow morning?',
    zh: '明天早上的火車幾點出發？',
    speechNote: '不除阻停頓：What time 兩個 /t/ 相遇時，第一個 /t/ 只擺口型不噴氣，直接發第二個 /t/。'
  },
  {
    id: 'dic-a2-1',
    cefr: 'A2',
    text: 'Could you tell me how to get to the nearest station?',
    zh: '請問你能告訴我怎麼去最近的車站嗎？',
    speechNote: '同化與連音：Could you 自然語速常同化為 /kʊdʒu/；get to 的兩個 /t/ 合併成一個。'
  },
  {
    id: 'dic-a2-2',
    cefr: 'A2',
    text: 'We decided to stay at home because of the heavy rain.',
    zh: '因為下大雨，我們決定待在家裡。',
    speechNote: '連音解碼：decided to 的 /d/ 與 /t/ 合併；because of 連讀為 /bɪˈkɔːzəv/。'
  },
  {
    id: 'dic-b1-1',
    cefr: 'B1',
    text: 'Regular exercise and enough sleep can improve your memory.',
    zh: '規律運動與充足睡眠能改善你的記憶力。',
    speechNote: '弱讀與連音：and enough 在口語中常把 and 的 d 省略，連音成 /ən ɪˈnʌf/。'
  },
  {
    id: 'dic-b1-2',
    cefr: 'B1',
    text: 'Please review the attached schedule before Friday meeting.',
    zh: '請在週五會議前審閱附件的行程表。',
    speechNote: '職場節奏：attached schedule 中間的 -ed (/t/) 輕觸即過，重音清楚落在 review、schedule、meeting。'
  },
  {
    id: 'dic-b2-1',
    cefr: 'B2',
    text: 'Although renewable energy requires investment, it reduces carbon emissions.',
    zh: '雖然再生能源需要投資，但它能減少碳排放。',
    speechNote: '子句語調：requires investment 的 /z/ 與 /ɪn/ 連讀；逗號前語調微揚表示話未說完。'
  },
  {
    id: 'dic-b2-2',
    cefr: 'B2',
    text: 'The committee postponed the decision until more evidence was available.',
    zh: '委員會將決定延後，直到有更多證據為止。',
    speechNote: '子音簡化：postponed the 的 /d/ 在 /ð/ 前常不爆破；was available 連音為 /wəzəˈveɪləbəl/。'
  },
  {
    id: 'dic-c1-1',
    cefr: 'C1',
    text: 'Empirical research suggests that bilingualism enhances cognitive flexibility.',
    zh: '實證研究顯示，雙語能力能提升認知彈性。',
    speechNote: '學術演講重音：that 弱讀為 /ðət/；重音清楚落在實詞 Empirical、bilingualism、cognitive、flexibility。'
  },
  {
    id: 'dic-c1-2',
    cefr: 'C1',
    text: 'Policymakers must balance economic growth with environmental sustainability.',
    zh: '決策者必須在經濟成長與環境永續之間取得平衡。',
    speechNote: '子音群省音：must balance 中 must 的 /t/ 在雙唇音 /b/ 前常省略不噴氣。'
  }
];

export function tokenizeWords(text) {
  return String(text ?? '')
    .replace(/[’‘]/g, "'")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(raw => ({
      raw,
      clean: raw.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '')
    }))
    .filter(x => x.clean);
}

export function scoreDictation(target, input) {
  const targetTokens = tokenizeWords(target);
  const inputTokens = tokenizeWords(input);
  const tokens = targetTokens.map((t, idx) => {
    const actual = inputTokens[idx]?.clean || '';
    const exactPos = actual === t.clean;
    const nearMatch = !exactPos && inputTokens.some((inp, j) => Math.abs(j - idx) <= 2 && inp.clean === t.clean);
    return {
      target: t.raw,
      clean: t.clean,
      actual: inputTokens[idx]?.raw || '',
      ok: exactPos || nearMatch
    };
  });
  const matchedCount = tokens.filter(t => t.ok).length;
  const totalCount = Math.max(1, targetTokens.length);
  const accuracy = Math.round((matchedCount / totalCount) * 100);
  return {
    accuracy,
    matchedCount,
    totalCount: targetTokens.length,
    tokens,
    isExact: matchedCount === targetTokens.length && inputTokens.length === targetTokens.length
  };
}

export function evaluateSpokenMatch(target, transcript) {
  const targetTokens = tokenizeWords(target);
  const spokenSet = new Set(tokenizeWords(transcript).map(t => t.clean));
  const words = targetTokens.map(t => ({
    word: t.raw,
    clean: t.clean,
    ok: spokenSet.has(t.clean)
  }));
  const matchedWords = words.filter(w => w.ok).length;
  const totalWords = Math.max(1, targetTokens.length);
  const ratio = matchedWords / totalWords;
  return {
    ratio,
    matchedWords,
    totalWords: targetTokens.length,
    words,
    status: ratio >= 0.8 ? 'great' : ratio >= 0.45 ? 'partial' : 'retry'
  };
}

export function readStudioStore(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem?.(STUDIO_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function writeStudioStore(patch, storage = globalThis.localStorage) {
  try {
    const cur = readStudioStore(storage);
    const next = { ...cur, ...patch };
    storage?.setItem?.(STUDIO_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return {};
  }
}

export function hasSpeechRecognition() {
  return Boolean(globalThis.window && (window.SpeechRecognition || window.webkitSpeechRecognition));
}

export function renderShadowingWidget(targetText, idKey = 'inline') {
  const cleanText = String(targetText ?? '').trim();
  if (!cleanText || /[\u3400-\u9fff]/.test(cleanText)) return '';
  return `<div class="shadow-coach-box" data-shadow-box="${esc(idKey)}" data-shadow-target="${esc(cleanText)}">
    <div class="shadow-coach-row">
      <span class="shadow-coach-label">🎙️ 開口跟讀教練</span>
      <div class="shadow-coach-btns">
        <button type="button" class="btn small" data-act="say" data-text="${esc(cleanText)}">🔊 原速示範</button>
        <button type="button" class="btn small" data-act="say" data-slow="1" data-text="${esc(cleanText)}">🐢 慢速分解</button>
        <button type="button" class="btn small gold" data-act="shadow-rec" data-target="${esc(cleanText)}" data-box="${esc(idKey)}">🎙️ 按下開口說</button>
        <button type="button" class="btn small ghost" data-act="shadow-self" data-target="${esc(cleanText)}" data-box="${esc(idKey)}">✔ 我已開口自評</button>
      </div>
    </div>
    <div class="shadow-coach-result" id="shadow-res-${esc(idKey)}" aria-live="polite">
      <small class="muted">支援瀏覽器語音辨識比對單字（不打假音素分數）；若未開麥克風，也可聽完示範後按「我已開口自評」。</small>
    </div>
  </div>`;
}

export function renderSpeakingDictationStudio(uiState = {}, storage = globalThis.localStorage) {
  const store = readStudioStore(storage);
  const mpIdx = Number.isInteger(uiState.mpIdx) ? uiState.mpIdx : 0;
  const group = MINIMAL_PAIRS[mpIdx % MINIMAL_PAIRS.length];
  const pairIdx = Number.isInteger(uiState.pairIdx) ? uiState.pairIdx : 0;
  const pair = group.pairs[pairIdx % group.pairs.length];
  const quizSide = uiState.mpSecretSide === 1 ? 1 : 0;
  const secretWord = quizSide === 0 ? pair[0] : pair[2];

  const dicCeFr = uiState.dicCefr || 'ALL';
  const filteredDic = dicCeFr === 'ALL' ? DICTATION_ITEMS : DICTATION_ITEMS.filter(d => d.cefr === dicCeFr);
  const dicItem = filteredDic.find(d => d.id === uiState.dicId) || filteredDic[0] || DICTATION_ITEMS[0];
  const dicInput = uiState.dicInput ?? '';
  const dicHint = Boolean(uiState.dicHint);
  const dicResult = uiState.dicResult || null;

  const maskedFrame = dicItem.text
    .split(/\s+/)
    .map(w => w[0] + '_'.repeat(Math.max(2, w.replace(/[^a-zA-Z]/g, '').length - 1)))
    .join(' ');

  return `<section class="card studio-section" id="ear-dictation-studio" aria-label="最小對立音聽辨、三速聽寫與開口跟讀實驗室">
    <div class="studio-header">
      <div>
        <p class="eyebrow">LISTENING · PHONICS · SHADOWING LAB</p>
        <h2>🎧 最小對立音聽辨 ＆ 三速連音聽寫實驗室</h2>
        <p class="muted">針對台灣學習者最常混淆的 12 組對立音素與自然語速連音／弱讀，結合即時開口跟讀比對。</p>
      </div>
      <div class="studio-stats-pills">
        <span>👂 辨音完成 <b>${Number(store.minimalPairsDone) || 0}</b> 次</span>
        <span>✍️ 聽寫完成 <b>${Number(store.dictationDone) || 0}</b> 句</span>
        <span>🎙️ 開口跟讀 <b>${Number(store.spokenChecks) || 0}</b> 句</span>
      </div>
    </div>

    <div class="studio-two-col">
      <article class="studio-panel">
        <h3>① 最小對立音聽辨訓練（Minimal Pairs）</h3>
        <div class="chips">
          ${MINIMAL_PAIRS.map((m, i) => `<button type="button" class="chip ${i === mpIdx ? 'on' : ''}" data-act="mp-select" data-idx="${i}">${esc(m.contrast)}</button>`).join('')}
        </div>
        <div class="mp-stage">
          <p class="mp-title"><b>${esc(group.title)}</b></p>
          <p class="mp-tip">💡 發音嘴型訣竅：${esc(group.tip)}</p>
          <div class="mp-pair-switcher">
            ${group.pairs.map((p, i) => `<button type="button" class="btn small ${i === (pairIdx % group.pairs.length) ? 'primary' : 'ghost'}" data-act="mp-pair" data-idx="${i}" lang="en">${esc(p[0])} / ${esc(p[2])}</button>`).join('')}
          </div>
          <div class="mp-cards-row">
            <div class="mp-word-box">
              <strong lang="en">${esc(pair[0])}</strong>
              <span>${esc(pair[1])}</span>
              <div class="row">
                <button type="button" class="btn small" data-act="say" data-text="${esc(pair[0])}">🔊 原速</button>
                <button type="button" class="btn small" data-act="say" data-slow="1" data-text="${esc(pair[0])}">🐢 慢速</button>
              </div>
            </div>
            <div class="mp-vs">VS</div>
            <div class="mp-word-box">
              <strong lang="en">${esc(pair[2])}</strong>
              <span>${esc(pair[3])}</span>
              <div class="row">
                <button type="button" class="btn small" data-act="say" data-text="${esc(pair[2])}">🔊 原速</button>
                <button type="button" class="btn small" data-act="say" data-slow="1" data-text="${esc(pair[2])}">🐢 慢速</button>
              </div>
            </div>
          </div>
          <p class="mp-context" lang="en">📖 對比造句：${esc(pair[4])} <button type="button" class="say" data-act="say" data-text="${esc(pair[4])}" aria-label="播放對比造句">🔊</button></p>
          <div class="mp-blind-quiz">
            <span>🎯 盲聽小測驗：先點「播放神秘音」，再選出你聽到的是哪一個字！</span>
            <div class="row">
              <button type="button" class="btn small gold" data-act="mp-play-secret" data-text="${esc(secretWord)}">🔊 播放神秘音</button>
              <button type="button" class="btn small" data-act="mp-guess" data-guess="0" lang="en">我聽到 ${esc(pair[0])}</button>
              <button type="button" class="btn small" data-act="mp-guess" data-guess="1" lang="en">我聽到 ${esc(pair[2])}</button>
            </div>
            ${uiState.mpFeedback ? `<p class="mp-feedback ${uiState.mpFeedback.ok ? 'good' : 'bad'}" role="status">${esc(uiState.mpFeedback.msg)}</p>` : ''}
          </div>
        </div>
      </article>

      <article class="studio-panel">
        <h3>② 三速連音與弱讀聽寫（Pre-A1 → C1）</h3>
        <div class="chips">
          ${['ALL', 'Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'].map(lv => `<button type="button" class="chip ${dicCeFr === lv ? 'on' : ''}" data-act="dic-cefr" data-cefr="${lv}">${lv === 'ALL' ? '全部程度' : lv}</button>`).join('')}
        </div>
        <div class="dic-selector">
          ${filteredDic.map((d, idx) => `<button type="button" class="btn small ${d.id === dicItem.id ? 'primary' : 'ghost'}" data-act="dic-pick" data-id="${esc(d.id)}">${esc(d.cefr)} #${idx + 1}</button>`).join('')}
        </div>
        <div class="dic-stage">
          <p class="dic-zh">🎯 目標句意：<b>${esc(dicItem.zh)}</b> <span class="badge-inline">${esc(dicItem.cefr)}</span></p>
          <div class="row">
            <button type="button" class="btn small gold" data-act="say" data-text="${esc(dicItem.text)}">🔊 ① 正常語速</button>
            <button type="button" class="btn small" data-act="say" data-slow="1" data-text="${esc(dicItem.text)}">🐢 ② 慢速切分</button>
            <button type="button" class="btn small ghost" data-act="dic-hint-toggle">${dicHint ? '🙈 隱藏字首提示' : '🔤 ③ 顯示字首提示'}</button>
          </div>
          ${dicHint ? `<p class="dic-hint-frame" lang="en">${esc(maskedFrame)}</p>` : ''}
          <p class="dic-speech-note">🔍 <b>連音與弱讀解碼：</b>${esc(dicItem.speechNote)}</p>
          <div class="dic-input-row">
            <input type="text" id="dic-input-field" class="type-in" lang="en" autocomplete="off" spellcheck="false" value="${esc(dicInput)}" placeholder="聽音輸入完整英文句子…">
            <button type="button" class="btn primary" data-act="dic-check">核對聽寫</button>
          </div>
          ${dicResult ? `<div class="dic-result-box" role="status">
            <p><b>聽寫吻合度：${dicResult.accuracy}%（${dicResult.matchedCount}/${dicResult.totalCount} 字）</b></p>
            <div class="dic-token-diff" lang="en">
              ${dicResult.tokens.map(t => `<span class="dic-tok ${t.ok ? 'ok' : 'miss'}" title="${t.ok ? '正確' : `你輸入：${esc(t.actual || '缺漏')}`}">${esc(t.target)}</span>`).join(' ')}
            </div>
          </div>` : ''}
          ${renderShadowingWidget(dicItem.text, 'dictation-main')}
        </div>
      </article>
    </div>
  </section>`;
}
