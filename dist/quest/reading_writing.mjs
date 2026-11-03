// Graded Reading Library (Tap-to-Gloss continuous article view for all 51 stories)
// and CEFR Guided Writing & Sentence Builder Studio (Pre-A1 to C1).

import { renderShadowingWidget, readStudioStore } from './speaking_dictation.mjs?v=learn20261030';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CORE_GLOSS_FALLBACK = {
  hello: '哈囉、你好', hi: '嗨、你好', name: '名字', nice: '美好的、高興的', meet: '遇見、認識',
  good: '好的', morning: '早上', afternoon: '下午', evening: '傍晚', night: '夜晚',
  thank: '感謝', thanks: '謝謝', please: '請', sorry: '抱歉', excuse: '原諒、借過',
  school: '學校', teacher: '老師', student: '學生', classmate: '同班同學', friend: '朋友',
  family: '家庭、家人', father: '父親', mother: '母親', brother: '兄弟', sister: '姊妹',
  book: '書本', read: '閱讀', write: '寫作', listen: '聆聽', speak: '說話',
  water: '水', food: '食物', breakfast: '早餐', lunch: '午餐', dinner: '晚餐',
  train: '火車', bus: '公車', station: '車站', ticket: '票券', travel: '旅行',
  weather: '天氣', rain: '雨、下雨', sunny: '晴朗的', warm: '溫暖的', cold: '寒冷的',
  important: '重要的', because: '因為', although: '雖然', however: '然而', therefore: '因此',
  schedule: '行程表', meeting: '會議', project: '專案', research: '研究', evidence: '證據',
  environment: '環境', technology: '科技', community: '社區', culture: '文化', health: '健康'
};

export const WRITING_PROMPTS = [
  {
    id: 'w-prea1',
    cefr: 'Pre-A1',
    title: '① Pre-A1 零基礎造句：三句自我介紹',
    scenario: '向新認識的同學或外師介紹自己的名字、喜歡的事物，以及每天常做的一件事。',
    minWords: 15,
    maxWords: 45,
    minSentences: 3,
    targetWords: ['name', 'like', 'every'],
    scaffolds: [
      'Hello, my name is ____.',
      'I like ____ and ____.',
      'Every morning / day, I ____.'
    ],
    model: 'Hello, my name is Leo. I like music and basketball. Every afternoon, I practice English with my friend.',
    modelZh: '哈囉，我的名字是 Leo。我喜歡音樂和籃球。每天下午，我和朋友一起練習英文。'
  },
  {
    id: 'w-a1',
    cefr: 'A1',
    title: '② A1 國小高年級／國中起步：我的週末日常',
    scenario: '用 3–4 個完整句子描述你週末通常和家人或朋友做什麼，以及你的心情。',
    minWords: 30,
    maxWords: 65,
    minSentences: 3,
    targetWords: ['usually', 'with', 'because', 'happy'],
    scaffolds: [
      'On weekends, I usually ____ with my ____.',
      'In the afternoon, we ____.',
      'I feel happy because ____.'
    ],
    model: 'On weekends, I usually ride a bicycle in the park with my brother. In the afternoon, we help our mother cook dinner at home. I feel very happy because we can talk and laugh together.',
    modelZh: '週末時，我通常和哥哥去公園騎腳踏車。下午我們在家幫媽媽煮晚餐。我覺得非常開心，因為我們可以一起聊天說笑。'
  },
  {
    id: 'w-a2',
    cefr: 'A2',
    title: '③ A2 國中會考／英檢初級：活動邀請短函',
    scenario: '寫一則短訊或短信用英文邀請朋友這週六一起去博物館或看電影，說明時間、地點與原因。',
    minWords: 45,
    maxWords: 90,
    minSentences: 4,
    targetWords: ['would like', 'saturday', 'because', 'let me know'],
    scaffolds: [
      'Hi ____, would you like to ____ with me this Saturday?',
      'We can meet at ____ at ____ o’clock.',
      'I want to go there because ____.',
      'Please let me know if you can come.'
    ],
    model: 'Hi Amy, would you like to visit the science museum with me this Saturday? We can meet at the metro station at ten o’clock in the morning. I want to see the new space exhibition because it looks very exciting. Please let me know if you can come.',
    modelZh: '嗨 Amy，這週六你想和我一起去參觀科學博物館嗎？我們可以早上十點在捷運站見面。我想看新的太空特展，因為它看起來非常精彩。如果你能來的話請告訴我。'
  },
  {
    id: 'w-b1',
    cefr: 'B1',
    title: '④ B1 高中基礎／英檢中級：主題觀點段落',
    scenario: '針對「學生是否應該養成每天運動 30 分鐘的習慣」寫一段有主題句、舉例與結論的英文段落。',
    minWords: 55,
    maxWords: 130,
    minSentences: 4,
    targetWords: ['first', 'for example', 'however', 'therefore'],
    scaffolds: [
      'In my opinion, daily exercise is essential for students.',
      'First, regular physical activity ____. For example, ____.',
      'However, some students feel too busy to ____.',
      'Therefore, schools and families should encourage ____.'
    ],
    model: 'In my opinion, daily exercise is essential for all high school students. First, regular physical activity improves both daytime concentration and sleep quality. For example, jogging for twenty minutes after school helps me release stress before studying at night. However, many students sit at their desks for hours without taking a break. Therefore, building a simple daily exercise habit is the best way to stay healthy and energetic.',
    modelZh: '我認為每天運動對所有高中生而言至關重要。首先，規律的體能活動能同時改善白天的專注力與睡眠品質。舉例來說，放學後慢跑二十分鐘能幫助我在晚上讀書前釋放壓力。然而，許多學生一坐就是好幾個小時沒有休息。因此，建立簡單的每日運動習慣是保持健康與活力的最佳方式。'
  },
  {
    id: 'w-b2',
    cefr: 'B2',
    title: '⑤ B2 高中學測／TOEIC 職場分析：混合辦公與團隊溝通',
    scenario: '分析「遠距與實體混合辦公（或自主學習時間）」的優缺點，並提出具體的配套建議。',
    minWords: 70,
    maxWords: 170,
    minSentences: 5,
    targetWords: ['although', 'furthermore', 'for instance', 'consequently'],
    scaffolds: [
      'Although flexible schedules offer clear benefits, they also require strong self-discipline.',
      'On the one hand, working remotely saves commuting time and ____.',
      'Furthermore, digital tools allow teams to ____. For instance, ____.',
      'Consequently, organizations should establish clear communication guidelines so that ____.'
    ],
    model: 'Although flexible hybrid schedules offer clear benefits, they also require strong coordination. On the one hand, working from home twice a week reduces commuting fatigue and allows employees to focus on deep tasks. Furthermore, cloud platforms make it easy to share project updates across time zones. For instance, our design team cut revision delays by thirty percent after adopting shared checklists. Consequently, companies should combine remote flexibility with regular in-person workshops to maintain team trust.',
    modelZh: '雖然彈性的混合辦公制度具有明確優勢，但同時也需要良好的協調機制。一方面，每週兩天在家工作能減少通勤疲勞，讓員工專注於深度任務；此外，雲端平台讓跨時區更新專案進度變得容易。例如，我們的設計團隊在導入共用檢核表後減少了三成的修訂延誤。因此，企業應將遠距彈性與定期的實體工作坊結合，以維繫團隊信任。'
  },
  {
    id: 'w-c1',
    cefr: 'C1',
    title: '⑥ C1 TOEFL／SAT／GRE 學術論證：AI 工具時代的批判思考教育',
    scenario: '撰寫學術論證段落，探討當生成式資訊隨手可得時，高等教育應如何培養學生的獨立查證與批判推理能力。',
    minWords: 75,
    maxWords: 240,
    minSentences: 5,
    targetWords: ['nevertheless', 'moreover', 'empirical', 'ultimately'],
    scaffolds: [
      'Rapid advances in automated information retrieval have transformed how students approach research.',
      'Nevertheless, effortless access to summaries cannot substitute for rigorous source evaluation.',
      'Moreover, empirical studies indicate that active questioning deepens long-term comprehension.',
      'Ultimately, universities must design assessments that reward analytical reasoning rather than rote synthesis.'
    ],
    model: 'Rapid advances in automated information tools have transformed how students gather background knowledge. Nevertheless, effortless access to instant summaries cannot substitute for rigorous source evaluation and independent reasoning. When learners accept generated claims without inspecting primary evidence, subtle logical fallacies easily go unnoticed. Moreover, empirical studies in cognitive psychology indicate that wrestling with conflicting perspectives strengthens long-term retention. Ultimately, educators must design assignments that require students to verify data, compare counterarguments, and defend their conclusions with transparent evidence.',
    modelZh: '自動化資訊工具的快速發展改變了學生蒐集背景知識的方式。然而，輕易取得即時摘要並不能取代嚴謹的來源查證與獨立推理。當學習者未經檢視第一手證據便接受現成結論時，細微的邏輯謬誤很容易被忽略。此外，認知心理學的實證研究顯示，思辨相互衝突的觀點能強化長期記憶保留。最終，教育者必須設計要求學生查核數據、比較反方論點並以透明證據支持結論的學習任務。'
  }
];

export function lookupWordGloss(rawWord, gloss) {
  const clean = String(rawWord ?? '').toLowerCase().replace(/^[^a-z']+|[^a-z']+$/g, '');
  if (!clean) return null;
  const candidates = [
    clean,
    clean.replace(/s$/, ''),
    clean.replace(/es$/, ''),
    clean.replace(/ies$/, 'y'),
    clean.replace(/ed$/, ''),
    clean.replace(/ed$/, 'e'),
    clean.replace(/ing$/, ''),
    clean.replace(/ing$/, 'e')
  ];
  for (const cand of candidates) {
    if (!cand) continue;
    if (gloss?.en?.has(cand)) {
      const val = gloss.en.get(cand);
      const list = typeof val === 'string' ? [val] : [...val];
      return { word: clean, base: cand, zh: list.slice(0, 3).join('；') };
    }
    if (CORE_GLOSS_FALLBACK[cand]) {
      return { word: clean, base: cand, zh: CORE_GLOSS_FALLBACK[cand] };
    }
  }
  return { word: clean, base: clean, zh: '點擊 🔊 聽發音；可搭配前後文推敲語意' };
}

export function evaluateWritingDraft(promptSpec, rawText) {
  const text = String(rawText ?? '').trim();
  const words = text ? text.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const cleanWords = words.map(w => w.toLowerCase().replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '')).filter(Boolean);
  const uniqueWords = new Set(cleanWords).size;
  const uniqueRatio = wordCount > 0 ? Math.round((uniqueWords / wordCount) * 100) : 0;

  const sentences = text
    ? text.split(/(?<=[.!?])\s+/).map(s => s.trim()).filter(Boolean)
    : [];
  const sentenceCount = sentences.length;

  const lowerText = text.toLowerCase();
  const targetWords = promptSpec?.targetWords || [];
  const usedTargets = targetWords.filter(t => lowerText.includes(t.toLowerCase()));

  const startsWithCap = sentences.length > 0 && sentences.every(s => /^[A-Z"']/.test(s));
  const endsWithPunct = text.length > 0 && /[.!?]["']?$/.test(text);
  const mechanicsOk = startsWithCap && endsWithPunct;

  const grammarNotes = [];
  if (/\bbecause\b[^.!?]+\bso\b/i.test(text)) {
    grammarNotes.push('⚠️ 偵測到「because ... so ...」同句連用：英文中 because 與 so 都是連接詞，同一句只需保留其中一個。');
  }
  if (/\b(although|though)\b[^.!?]+\bbut\b/i.test(text)) {
    grammarNotes.push('⚠️ 偵測到「although/though ... but ...」同句連用：英文中 although 與 but 不會同時出現在同一個句子裡，請刪去 but 或改用 yet。');
  }
  if (/\bi\b/.test(text)) {
    grammarNotes.push('⚠️ 第一人稱單數「I」在英文中無論在句首或句中都必須大寫。');
  }
  if (/\b([a-zA-Z]+)\s+\1\b/i.test(text)) {
    grammarNotes.push('⚠️ 偵測到連續重複的相同單字（例如 the the），請檢查是否不小心多打了一次。');
  }
  if (/,[a-zA-Z]/.test(text)) {
    grammarNotes.push('💡 標點排版提醒：英文逗號「,」後面建議留一個半形空格再接下一個單字。');
  }

  const minW = promptSpec?.minWords || 20;
  const maxW = promptSpec?.maxWords || 150;
  const minS = promptSpec?.minSentences || 3;

  const checks = [
    {
      id: 'length',
      label: `字數範圍（目標 ${minW}–${maxW} 字）`,
      ok: wordCount >= minW && wordCount <= maxW * 1.25,
      detail: `目前 ${wordCount} 字`
    },
    {
      id: 'sentences',
      label: `完整句子數（至少 ${minS} 句）`,
      ok: sentenceCount >= minS,
      detail: `目前 ${sentenceCount} 句`
    },
    {
      id: 'targets',
      label: `目標轉折詞／核心語塊（至少用 ${Math.min(2, targetWords.length)} 個）`,
      ok: usedTargets.length >= Math.min(2, targetWords.length),
      detail: usedTargets.length ? `已使用：${usedTargets.join(', ')}` : `建議融入：${targetWords.join(', ')}`
    },
    {
      id: 'mechanics',
      label: '句首大寫與句尾標點（. ! ?）',
      ok: mechanicsOk,
      detail: mechanicsOk ? '格式完整' : '請確認每句開頭大寫且結尾有句號／問號'
    },
    {
      id: 'variety',
      label: '用字多樣性（避免過度重複同一字）',
      ok: wordCount >= 12 && uniqueRatio >= 55,
      detail: wordCount ? `相異詞比例 ${uniqueRatio}%（${uniqueWords}/${wordCount}）` : '尚未輸入'
    }
  ];

  return {
    wordCount,
    sentenceCount,
    uniqueWords,
    uniqueRatio,
    usedTargets,
    checks,
    passedCount: checks.filter(c => c.ok).length,
    grammarNotes
  };
}

export function renderGradedReaderModal(course, storyId, uiState = {}, gloss = null) {
  const meta = course.stories.get(storyId);
  if (!meta) return `<p>找不到這篇故事。</p>`;
  const lines = (meta.steps || [])
    .map(id => course.item(id))
    .filter(it => it && it.type === 'line');

  const showZh = uiState.readerShowZh !== false;
  const activeWord = uiState.readerWord ? lookupWordGloss(uiState.readerWord, gloss) : null;
  const fullEnText = lines.map(l => l.en).join(' ');
  const fullBilingualText = lines.map(l => `${l.en}。${l.zh}`).join('。');

  const tokenizeLine = lineText => String(lineText ?? '').split(/(\s+)/).map(part => {
    if (/^\s+$/.test(part)) return part;
    const clean = part.replace(/^[^a-zA-Z']+|[^a-zA-Z']+$/g, '');
    if (!clean) return esc(part);
    return `<button type="button" class="reader-word ${activeWord?.word === clean.toLowerCase() ? 'active' : ''}" data-act="reader-word" data-word="${esc(clean)}">${esc(part)}</button>`;
  }).join('');

  return `<article class="graded-reader-modal">
    <p class="eyebrow">GRADED READER · ${esc(meta.cefr || meta.level || '')} · 點字即查共讀模式</p>
    <h2>📖 ${esc(meta.title)}</h2>
    ${meta.scenario ? `<p class="muted">${esc(meta.scenario)}</p>` : ''}
    <div class="reader-toolbar">
      <button type="button" class="btn small gold" data-act="prompt-say" data-text="${esc(fullEnText)}">▶ 全篇英文連播</button>
      <button type="button" class="btn small" data-act="prompt-say" data-text="${esc(fullBilingualText)}">🎧 雙語導讀（英＋中）</button>
      <button type="button" class="btn small ghost" data-act="reader-toggle-zh">${showZh ? '🙈 隱藏中文翻譯' : '👀 顯示中文翻譯'}</button>
      <button type="button" class="btn small primary" data-act="story" data-id="${esc(storyId)}">🎮 進入互動答題闖關</button>
      <button type="button" class="link" data-act="stop-say">停止朗讀</button>
    </div>

    <div class="reader-gloss-bar" role="status" aria-live="polite">
      ${activeWord ? `<div><b lang="en">${esc(activeWord.word)}</b> ${activeWord.base !== activeWord.word ? `<small class="muted">（原形：${esc(activeWord.base)}）</small>` : ''}：<span>${esc(activeWord.zh)}</span></div><div class="row"><button type="button" class="btn small" data-act="say" data-text="${esc(activeWord.word)}">🔊 聽單字</button><button type="button" class="btn small ghost" data-act="say" data-slow="1" data-text="${esc(activeWord.word)}">🐢 慢速</button></div>` : `<span class="muted">💡 點擊下方文章中的任何英文單字，即可即時查看中文釋義與發音。</span>`}
    </div>

    <div class="reader-lines">
      ${lines.map((l, idx) => `<section class="reader-line-card">
        <div class="reader-line-head">
          <b>${esc(l.speaker || `段落 ${idx + 1}`)}</b>
          <div class="row">
            <button type="button" class="say" data-act="say" data-text="${esc(l.en)}" aria-label="原速朗讀此句">🔊</button>
            <button type="button" class="say slow" data-act="say" data-slow="1" data-text="${esc(l.en)}" aria-label="慢速朗讀此句">🐢</button>
          </div>
        </div>
        <p class="reader-line-en" lang="en">${tokenizeLine(l.en)}</p>
        ${showZh && l.zh ? `<p class="reader-line-zh">${esc(l.zh)}</p>` : ''}
        ${l.note ? `<p class="reader-line-note">💡 重點筆記：${esc(l.note)}</p>` : ''}
        ${renderShadowingWidget(l.en, `story-${storyId}-${idx}`)}
      </section>`).join('')}
    </div>
  </article>`;
}

export function renderWritingStudio(uiState = {}, storage = globalThis.localStorage) {
  const store = readStudioStore(storage);
  const drafts = store.writingDrafts || {};
  const promptId = uiState.writingId || WRITING_PROMPTS[0].id;
  const promptSpec = WRITING_PROMPTS.find(p => p.id === promptId) || WRITING_PROMPTS[0];
  const currentText = uiState.writingText !== undefined ? uiState.writingText : (drafts[promptSpec.id]?.text || '');
  const evalResult = evaluateWritingDraft(promptSpec, currentText);
  const showModel = Boolean(uiState.writingShowModel);

  return `<section class="card studio-section" id="writing-studio" aria-label="CEFR 分級引導寫作與造句工坊">
    <div class="studio-header">
      <div>
        <p class="eyebrow">CEFR GUIDED WRITING &amp; SENTENCE BUILDER STUDIO</p>
        <h2>✍️ 分級引導寫作與段落建構工坊（Pre-A1 → C1）</h2>
        <p class="muted">提供句型鷹架、目標轉折詞、即時字數與常見中式英文盲點檢核（本機規則檢查，不偽造官方寫作評分）。</p>
      </div>
      <div class="studio-stats-pills">
        <span>📝 已儲存草稿 <b>${Object.keys(drafts).filter(k => drafts[k]?.text?.trim()).length}</b> / ${WRITING_PROMPTS.length} 篇</span>
      </div>
    </div>

    <div class="chips">
      ${WRITING_PROMPTS.map(p => `<button type="button" class="chip ${p.id === promptSpec.id ? 'on' : ''}" data-act="write-select" data-id="${esc(p.id)}">${esc(p.cefr)} · ${esc(p.title.split('：')[1] || p.title)}</button>`).join('')}
    </div>

    <div class="studio-two-col">
      <div class="studio-panel">
        <h3>${esc(promptSpec.title)}</h3>
        <p class="muted">${esc(promptSpec.scenario)}</p>
        <div class="write-targets">
          <span>🎯 建議融入語塊（點擊可插入游標處）：</span>
          <div class="chips">
            ${promptSpec.targetWords.map(w => `<button type="button" class="chip small ${evalResult.usedTargets.includes(w) ? 'on' : ''}" data-act="write-insert" data-word="${esc(w)}" lang="en">+ ${esc(w)}</button>`).join('')}
          </div>
        </div>
        <div class="write-scaffolds">
          <b>🧱 句型鷹架（點擊可帶入草稿區修改）：</b>
          <ul>
            ${promptSpec.scaffolds.map(sc => `<li><span lang="en">${esc(sc)}</span> <button type="button" class="btn small ghost" data-act="write-scaffold" data-text="${esc(sc)}">帶入此句型</button></li>`).join('')}
          </ul>
        </div>
        <label class="offscreen" for="writing-studio-textarea">英文寫作草稿區</label>
        <textarea id="writing-studio-textarea" class="write-textarea" rows="6" lang="en" placeholder="在這裡寫下你的英文句子或段落…">${esc(currentText)}</textarea>
        <div class="row">
          <button type="button" class="btn primary" data-act="write-save" data-id="${esc(promptSpec.id)}">💾 儲存草稿並檢核</button>
          <button type="button" class="btn small" data-act="say" data-text="${esc(currentText || promptSpec.model)}">🔊 朗讀我的草稿</button>
          <button type="button" class="btn small ghost" data-act="write-model-toggle">${showModel ? '🙈 隱藏範文對照' : '📖 查看高分範文與中譯'}</button>
        </div>
        ${uiState.writingSavedMsg ? `<p class="mp-feedback good" role="status">${esc(uiState.writingSavedMsg)}</p>` : ''}
      </div>

      <div class="studio-panel">
        <h3>🔍 即時結構與語法自評清單（${evalResult.passedCount}/${evalResult.checks.length} 項達成）</h3>
        <ul class="write-checklist">
          ${evalResult.checks.map(c => `<li class="${c.ok ? 'ok' : 'pending'}">
            <span>${c.ok ? '✅' : '⬜'} <b>${esc(c.label)}</b></span>
            <small>${esc(c.detail)}</small>
          </li>`).join('')}
        </ul>
        ${evalResult.grammarNotes.length ? `<div class="write-grammar-notes">
          ${evalResult.grammarNotes.map(n => `<p>${esc(n)}</p>`).join('')}
        </div>` : `<p class="muted small">✔ 目前未偵測到常見中式連接詞重疊或大小寫格式錯誤。</p>`}

        ${showModel ? `<div class="write-model-box">
          <h4>📖 參考範文（${esc(promptSpec.cefr)}）</h4>
          <p lang="en">${esc(promptSpec.model)} <button type="button" class="say" data-act="say" data-text="${esc(promptSpec.model)}" aria-label="朗讀參考範文">🔊</button></p>
          <p class="muted small">${esc(promptSpec.modelZh)}</p>
        </div>` : ''}
      </div>
    </div>
  </section>`;
}
