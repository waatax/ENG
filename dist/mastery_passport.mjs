// Cross-site Mastery Passport, All-Level Learning Highway & Unified Backup/Restore.
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const STORAGE_KEYS = [
  'english-quest-game-v2',
  'english-quest-simulation-v1',
  'english-quest-academy-v1',
  'eq-mnemonics-v1',
  'eq-roots-v1',
  'eq-conversation-practice-v1',
  'english-quest-word-mp3-v1',
  'eq_flashcards_mastery_v1',
  'eq_recall_v1',
  'eq_home_warmup_v1',
  'eq_masterclass_v1',
  'english-quest-school-words-v1',
  'english-quest-7700-practice-v1',
  'english-quest-studio-v1'
];

export const ALL_LEVEL_BANDS = [
  {
    id: 'starter',
    badge: 'Pre-A1 · 零基礎起步',
    title: '字母、自然拼讀與第一句開口',
    subtitle: '適合剛接觸英文、想從聽音辨字與日常招呼開始的學習者',
    defaultTier: 'elem_1000',
    questTrack: 's1',
    steps: [
      { icon: '🔤', label: '① 聽讀 10 個生活基礎字', desc: '國小核心字卡＋四段式諧音聯想 MP3', href: '#wordaudio/elementary-001' },
      { icon: '🌱', label: '② 闖關：第 1 段・開口說第一句', desc: '打招呼、字母音、最小對立音聽辨', href: 'quest/#learn' },
      { icon: '🎙️', label: '③ 跟讀：走廊遇見新朋友', desc: 'Pre-A1 分級共讀故事＋開口跟讀教練', href: 'quest/#stories' }
    ]
  },
  {
    id: 'foundation',
    badge: 'A1–A2 · 國小高年級至國中會考',
    title: '生活會話、核心句型與 3,000 字詞',
    subtitle: '適合建立日常溝通語感、國中六學期進度與會考基礎的學習者',
    defaultTier: 'jhs_2000',
    questTrack: 's5',
    steps: [
      { icon: '🧩', label: '① 字根字族與國中字集', desc: '用複合詞與常見字首一次記住一串字', href: 'roots/' },
      { icon: '🎒', label: '② 國中六學期／第 3–6 段闖關', desc: '108 課綱六學期任務、三步聽寫與錯題診斷', href: 'quest/#school' },
      { icon: '🎧', label: '③ 通勤會話四步開口練', desc: '盲聽大意 → 用法 → 留白跟讀 → 自己說', href: '#listening' }
    ]
  },
  {
    id: 'intermediate',
    badge: 'B1–B2 · 高中學測、英檢與職場 TOEIC',
    title: '長句解構、商務溝通與段落寫作',
    subtitle: '適合準備高中學測、全民英檢中級／中高級與職場多益的學習者',
    defaultTier: 'toeic',
    questTrack: 's7',
    steps: [
      { icon: '💼', label: '① 多益與高中核心詞彙聽讀', desc: '搭配真實職場與新聞例句、遮中主動回想', href: '#wordaudio/toeic-001' },
      { icon: '🎯', label: '② 學測／TOEIC 目標遠征與寫作坊', desc: '分級段落寫作檢核＋低中高標技能印記', href: 'quest/#exams/toeic' },
      { icon: '⏱️', label: '③ 分節計時擬真模考', desc: '學測英文、英檢中級聽讀寫、TOEIC L&R', href: 'quest/simulation.html' }
    ]
  },
  {
    id: 'advanced',
    badge: 'B2–C1 · 留學與學術推理 (TOEFL · SAT · GRE · GMAT)',
    title: '全英文思維、批判推理與學術閱讀',
    subtitle: '適合準備國際留學檢定、學術論文閱讀與高階邏輯論證的學習者',
    defaultTier: 'sat',
    questTrack: 's9',
    steps: [
      { icon: '🇺🇸', label: '① English Academy 全英文沉浸', desc: 'Word → English Definition 語音、Step-0 解題協議', href: 'EN/' },
      { icon: '🧠', label: '② SAT／GRE／GMAT 推理遠征', desc: '跨文本證據、六選二等義、批判推理假設評估', href: 'quest/#exams/sat' },
      { icon: '📖', label: '③ C1 學術共讀與論證寫作', desc: '點字即查學術詞彙、正反論點結構檢核', href: 'quest/#stories' }
    ]
  }
];

function safeRead(storage, key) {
  try {
    const raw = storage?.getItem?.(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function computeMasteryPassport(storage = globalThis.localStorage) {
  const quest = safeRead(storage, 'english-quest-game-v2') || {};
  const sim = safeRead(storage, 'english-quest-simulation-v1') || {};
  const acad = safeRead(storage, 'english-quest-academy-v1') || {};
  const mnem = safeRead(storage, 'eq-mnemonics-v1') || {};
  const roots = safeRead(storage, 'eq-roots-v1') || {};
  const conv = safeRead(storage, 'eq-conversation-practice-v1') || {};
  const mp3 = safeRead(storage, 'english-quest-word-mp3-v1') || {};
  const fc = safeRead(storage, 'eq_flashcards_mastery_v1') || {};
  const studio = safeRead(storage, 'english-quest-studio-v1') || {};

  const questNodes = Object.values(quest.nodes || {}).filter(n => n && n.n > 0).length;
  const crowns = Object.keys(quest.crowns || {}).length;
  const storiesRead = Object.keys(quest.stories || {}).length + Object.keys(studio.readStories || {}).length;
  const questXp = Number(quest.xp?.total) || 0;
  const streakDays = Array.isArray(quest.days) ? quest.days.length : 0;
  const mistakes = Object.values(quest.items || {}).filter(r => r && r.m).length;
  const fixed = Number(quest.stats?.fixed) || 0;

  const mnemReviewed = Object.keys(mnem.progress || {}).length;
  const rootsReviewed = Object.keys(roots.progress || {}).length;
  const fcMastered = Object.values(fc || {}).filter(v => v === 'mastered').length;
  const vocabEvidence = mnemReviewed + rootsReviewed + fcMastered + Object.values(quest.items || {}).filter(r => r && r.c > 0).length;

  const listenCount = (Number(quest.stats?.listen) || 0) + (Number(studio.dictationDone) || 0) + (Number(studio.minimalPairsDone) || 0) + (mp3.group ? 1 : 0);
  const speakCount = Object.keys(conv || {}).length + (Number(studio.spokenChecks) || 0);
  const writingCount = Object.keys(quest.schoolWork || {}).filter(k => quest.schoolWork[k]?.text?.trim()).length + Object.keys(studio.writingDrafts || {}).length;
  const examChecks = Object.values(quest.examProgress || {}).reduce((n, p) => n + ((p?.checks || []).length), 0) + (sim.status === 'finished' ? 1 : 0) + (Array.isArray(acad.completed) ? acad.completed.length : 0);

  const skills = [
    { id: 'vocab', icon: '🔤', name: '字彙與構詞', count: vocabEvidence, unit: '項證據', desc: `聯想卡 ${mnemReviewed} · 字族 ${rootsReviewed} · 閃卡精熟 ${fcMastered}`, href: '#words' },
    { id: 'listen', icon: '🎧', name: '聽辨與拼讀', count: listenCount, unit: '次訓練', desc: `聽力闖關 ${Number(quest.stats?.listen) || 0} · 聽寫與辨音 ${(Number(studio.dictationDone) || 0) + (Number(studio.minimalPairsDone) || 0)}`, href: 'quest/#practice' },
    { id: 'speak', icon: '🎙️', name: '開口與跟讀', count: speakCount, unit: '句自評', desc: `會話自評 ${Object.keys(conv || {}).length} · 語音教練 ${Number(studio.spokenChecks) || 0}`, href: '#listening' },
    { id: 'read', icon: '📖', name: '分級閱讀', count: storiesRead, unit: '篇故事', desc: `Pre-A1 至 C1 故事與短文共讀`, href: 'quest/#stories' },
    { id: 'write', icon: '✍️', name: '句型與寫作', count: questNodes + writingCount, unit: '項完成', desc: `闖關 ${questNodes} 關 · 寫作草稿 ${writingCount} 篇 · 訂正 ${fixed} 題`, href: 'quest/#school' },
    { id: 'exam', icon: '🎯', name: '檢定與模考', count: examChecks + crowns, unit: '項紀錄', desc: `金冠 ${crowns} · 模考與全英課 ${examChecks}`, href: 'quest/#exams' }
  ];

  let nextAction = { title: '🧭 先做 3 分鐘程度檢測，找出最適合你的起點', desc: '涵蓋 Pre-A1 基礎至 SAT／GRE／GMAT 學術推理，測後附完整錯題解析。', href: 'quest/#placement', cta: '開始程度檢測 →' };
  if (mistakes > 0) {
    nextAction = { title: `📕 錯題本有 ${mistakes} 題待複習`, desc: '趁記憶新鮮時把錯題改對，建立長期提取路徑。', href: 'quest/#practice', cta: '前往訂正錯題 →' };
  } else if (quest.session) {
    nextAction = { title: '⏳ 接續未完成的闖關練習', desc: '上次的作答進度已保存在此瀏覽器，隨時可接著完成。', href: 'quest/#learn', cta: '繼續闖關 →' };
  } else if (questNodes > 0 || quest.profile) {
    nextAction = { title: '🌱 繼續今天的英語遠征（每天 1 小關＋開口說 1 句）', desc: `目前累積 ${questXp} XP · 完成 ${questNodes} 關 · 讀完 ${storiesRead} 篇故事`, href: 'quest/#learn', cta: '進入今日關卡 →' };
  }

  return {
    questXp,
    questNodes,
    crowns,
    storiesRead,
    streakDays,
    mistakes,
    fixed,
    vocabEvidence,
    listenCount,
    speakCount,
    writingCount,
    examChecks,
    skills,
    nextAction,
    hasAnyProgress: (questXp + vocabEvidence + listenCount + speakCount + storiesRead + writingCount + examChecks) > 0
  };
}

export function exportFullSiteBackup(storage = globalThis.localStorage, now = new Date()) {
  const data = {};
  for (const key of STORAGE_KEYS) {
    const val = safeRead(storage, key);
    if (val !== null) data[key] = val;
  }
  return JSON.stringify({
    kind: 'english-quest-full-backup',
    version: 1,
    exportedAt: now.toISOString(),
    stores: data
  }, null, 2);
}

export function restoreFullSiteBackup(jsonText, storage = globalThis.localStorage) {
  try {
    const parsed = JSON.parse(jsonText);
    if (!parsed || typeof parsed !== 'object') return { ok: false, restored: 0, message: '備份格式不正確。' };
    // Support both full-site backup and standalone quest v2 backup
    if (parsed.kind === 'english-quest-full-backup' && parsed.stores && typeof parsed.stores === 'object') {
      let count = 0;
      for (const key of STORAGE_KEYS) {
        if (Object.hasOwn(parsed.stores, key) && parsed.stores[key] && typeof parsed.stores[key] === 'object') {
          storage.setItem(key, JSON.stringify(parsed.stores[key]));
          count++;
        }
      }
      return { ok: true, restored: count, message: `已還原全站 ${count} 個學習模組的進度紀錄。` };
    }
    if (parsed.schema === 2 && parsed.xp) {
      storage.setItem('english-quest-game-v2', JSON.stringify(parsed));
      return { ok: true, restored: 1, message: '已還原闖關模式進度紀錄。' };
    }
    return { ok: false, restored: 0, message: '找不到可識別的 English Quest 備份欄位。' };
  } catch {
    return { ok: false, restored: 0, message: '無法解析 JSON 備份檔案，現有紀錄未變更。' };
  }
}

export function renderMasteryPassportSection(selectedBandId = 'starter', storage = globalThis.localStorage) {
  const p = computeMasteryPassport(storage);
  const band = ALL_LEVEL_BANDS.find(b => b.id === selectedBandId) || ALL_LEVEL_BANDS[0];
  return `<section class="hub-highway" aria-label="全程度分級學習導航與學習護照">
    <div class="hub-next-banner">
      <div>
        <span class="hub-badge-pill">今日最佳下一步 · Next Best Step</span>
        <h2>${esc(p.nextAction.title)}</h2>
        <p>${esc(p.nextAction.desc)}</p>
      </div>
      <a class="hub-cta-btn" href="${esc(p.nextAction.href)}">${esc(p.nextAction.cta)}</a>
    </div>
    <div class="hub-band-header">
      <div>
        <h2>依程度選擇今日三步路線（Pre-A1 → C1）</h2>
        <p class="hub-sub">切換程度會同時推薦適合你的「聽讀輸入 → 互動闖關 → 開口與閱讀輸出」三步日常練習。</p>
      </div>
    </div>
    <div class="hub-band-tabs" role="group" aria-label="選擇學習程度階段">
      ${ALL_LEVEL_BANDS.map(b => `<button type="button" class="hub-band-tab ${b.id === band.id ? 'active' : ''}" data-hub-band="${esc(b.id)}" data-hub-band-tier="${esc(b.defaultTier)}" aria-pressed="${b.id === band.id}"><strong>${esc(b.badge)}</strong><small>${esc(b.title)}</small></button>`).join('')}
    </div>
    <div class="hub-band-panel">
      <div class="hub-band-intro">
        <span class="hub-badge-pill">${esc(band.badge)}</span>
        <h3>${esc(band.title)}</h3>
        <p>${esc(band.subtitle)}</p>
      </div>
      <div class="hub-band-steps">
        ${band.steps.map(s => `<a class="hub-step-card" href="${esc(s.href)}"><span class="hub-step-ic" aria-hidden="true">${esc(s.icon)}</span><div><strong>${esc(s.label)}</strong><small>${esc(s.desc)}</small></div><b aria-hidden="true">→</b></a>`).join('')}
      </div>
    </div>
    <details class="hub-passport" ${p.hasAnyProgress ? 'open' : ''}>
      <summary><span>🛂 全站學習護照（聽・說・讀・寫・字彙・檢定）</span><small>${p.hasAnyProgress ? `已累積 ${p.questXp} XP · ${p.questNodes} 關 · ${p.storiesRead} 篇故事` : '查看六大能力紀錄與全站備份 ▾'}</small></summary>
      <div class="hub-passport-grid">
        ${p.skills.map(s => `<a class="hub-skill-card" href="${esc(s.href)}"><div class="hub-skill-top"><span>${esc(s.icon)} <strong>${esc(s.name)}</strong></span><b>${s.count} <small>${esc(s.unit)}</small></b></div><small>${esc(s.desc)}</small></a>`).join('')}
      </div>
      <div class="hub-backup-bar">
        <span>💾 跨模組全站備份（包含闖關、字卡、聯想卡、字族、會話、模考與寫作草稿，皆僅儲存在本機瀏覽器）</span>
        <div class="hub-backup-actions">
          <button type="button" data-hub-backup-export>⬇ 下載全站備份</button>
          <label class="hub-backup-import">⬆ 匯入全站備份<input type="file" accept="application/json,.json" data-hub-backup-import hidden></label>
        </div>
      </div>
      <p id="hub-backup-status" class="hub-sub" role="status" aria-live="polite"></p>
    </details>
  </section>`;
}
