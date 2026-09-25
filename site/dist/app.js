// app.js - 核心互動邏輯、章節深度教學頁、全站單字片語會話語音播放系統
import { tracks, exams } from './content.mjs';
import { curriculum, examStudy } from './curriculum.mjs';
import { initialSources } from './sources.mjs';
import { initialState, createAttempt, recordResponse, finishAttempt, resultOf, remainingSeconds } from './core.mjs';
import { speak, playWord, playSentence, playSequence, stopAudio, isAudioActive } from './audio.mjs';

const KEY = 'english-quest-v3';
let state = initialState(), storageFailed = false;
try {
  const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
  if (saved?.schema === 1 && Array.isArray(saved.attempts) && saved.review) {
    state = saved;
  }
} catch {
  storageFailed = true;
}

let page = state.active ? 'session' : 'today';
let selected = null;
let resultId = null;
let sourceRows = Array.isArray(initialSources) ? [...initialSources] : [];
let sourceError = false;
let sourceFilter = 'all';
let openChapterId = 'jhs:j1'; // 預設開啟國中第一章
let audioStudioFilter = 'all';
let audioStudioSearch = '';
let activePlayingDialogueIndex = -1;

const root = document.querySelector('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const track = () => tracks.find(t => t.id === state.track) || tracks[0];
const allQuestions = tracks.flatMap(t => t.questions);
const questionById = id => allQuestions.find(q => q.id === id);

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    storageFailed = true;
  }
}

function due() {
  return Object.keys(state.review).filter(id => state.review[id].dueAt <= Date.now() && questionById(id));
}

function navigate(p) {
  stopAudio();
  activePlayingDialogueIndex = -1;
  page = p;
  selected = null;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('h1')?.focus();
}

function start(mode = 'learn') {
  stopAudio();
  if (state.active) {
    page = 'session';
    render();
    return;
  }
  const t = track();
  const qs = mode === 'review' ? t.questions.filter(q => due().includes(q.id)) : t.questions;
  if (!qs.length) return;
  state.active = createAttempt(t.id, mode, qs, state.attempts);
  save();
  page = 'session';
  selected = null;
  render();
}

function shell(body) {
  const nav = [
    ['today', '01', '今日學習'],
    ['chapter', '02', '章節教學與發音'],
    ['map', '03', '能力課綱地圖'],
    ['studio', '04', '單字會話語音館'],
    ['exams', '05', '全考制模考題庫'],
    ['progress', '06', '我的學習進度']
  ];
  return `
    <div class="shell">
      <aside class="side">
        <div class="brand">English<span> Quest.</span></div>
        <div class="edition">全考制深度學習與語音館</div>
        <nav class="nav" aria-label="主要導覽">
          ${nav.map(([id, num, label]) => `
            <button data-nav="${id}" class="${page === id || (page === 'session' && id === 'today') ? 'active' : ''}">
              <small>${num}</small>${label}
            </button>
          `).join('')}
        </nav>
        <div class="side-foot">
          <strong>今天，比昨天更懂一點。</strong>
          會考 · 學測 · 統測 · 職場 · 國際檢定<br>
          進度即時自動保存
        </div>
      </aside>
      <main class="main">
        <div class="top">
          <span>全方位英語學習工作室 · 知識點深度精讀與原生語音庫</span>
          <span class="chip">🔊 全單字・片語・會話點擊即播</span>
        </div>
        ${storageFailed ? '<div class="notice" role="alert">瀏覽器無法寫入本機儲存，請檢查無痕模式或容量設定。</div>' : ''}
        ${state.active && page !== 'session' ? '<div class="notice">您有一段尚未完成的練習。<button class="btn quiet" style="margin-left:8px" data-nav="session">繼續作答 →</button></div>' : ''}
        ${body}
        <div class="footer">
          English Quest 英語能力遠征 · 深度教學與原生語音發音系統 · 遵循現代心理計量學與實證學習科學架構
        </div>
      </main>
    </div>
  `;
}

function today() {
  const t = track();
  const count = due().length;
  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">TODAY'S QUEST</div>
        <h1 tabindex="-1">把一個小觀念，學到會聽、會說、會用。</h1>
        <p class="muted">選擇適合您的起步軌道，完成一段有即時解析與跨日保留驗證的深度練習。</p>
      </div>
      <span class="chip">每段 6 題 · 約 8–12 分鐘</span>
    </div>
    <div class="layout">
      <section class="card">
        <div class="steps">
          <span class="current">01 看懂文法策略</span>
          <span>02 語音聽朗讀</span>
          <span>03 獨立作答</span>
          <span>04 深度訂正</span>
          <span>05 遷移驗證</span>
        </div>
        <h2>今日練習主線</h2>
        <div class="track-grid">
          ${tracks.map(x => `
            <button class="track" data-track="${x.id}" aria-pressed="${t.id === x.id}">
              <strong>${x.name}</strong>
              <span>${x.level} · ${x.skill}</span>
            </button>
          `).join('')}
        </div>
        <div class="eyebrow" style="margin-top:14px">示範例句與語意解析</div>
        <div class="lesson-example">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
            <p lang="en" style="margin:0">${t.example}</p>
            <div style="display:flex;gap:6px">
              <button class="audio-btn primary" data-speak-sentence="${esc(t.example)}" title="正常速度播放">🔊 播放發音</button>
              <button class="audio-btn slow" data-speak-sentence="${esc(t.example)}" data-slow="true" title="慢速朗讀">🐢 慢速</button>
            </div>
          </div>
          <p class="muted small">${t.translation}</p>
        </div>
        <p>${t.tip}</p>
        <div class="actions">
          <button class="btn" data-start="learn">${state.active ? '繼續未完成的練習' : '開始 6 題能力練習'}　→</button>
          <button class="btn secondary" data-nav="chapter">開啟本軌道完整教學頁 ↗</button>
        </div>
      </section>
      <aside class="aside">
        <section class="card dark-card" style="margin-bottom:20px">
          <div class="eyebrow">SPACED REPETITION</div>
          <h2 style="margin-top:8px">FSRS 動態間隔記憶</h2>
          <div class="stat">${count}<small> 題到期複習</small></div>
          <p class="muted small">完成練習後，系統會自動依據作答反應時間計算下次最佳提取日期。</p>
          <button class="btn light" data-nav="progress" style="margin-top:14px">查看記憶排程</button>
        </section>
        <section class="card">
          <span class="tag green">全真語音學習</span>
          <h3>全單字片語隨點隨聽</h3>
          <p class="small muted">點選任意單字或會話旁的 🔊 播放按鈕，即可聆聽標準美語發音；支援 🐢 慢速 0.75x 模式，精準辨別母音與連音細節。</p>
          <button class="btn secondary" data-nav="studio" style="margin-top:10px">進入語音專區 →</button>
        </section>
      </aside>
    </div>
  `;
}

function chapterPage() {
  const [curricId, chId] = openChapterId.split(':');
  const c = curriculum.find(x => x.id === curricId) || curriculum[0];
  const ch = c.chapters.find(x => x.id === chId) || c.chapters[0];

  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">${c.badge} · 第 ${ch.num} 章</div>
        <h1 tabindex="-1">${ch.title}</h1>
        <p class="muted">${ch.subtitle}</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn secondary" data-nav="map">← 返回課綱總覽</button>
      </div>
    </div>

    <!-- 課綱與國際考制軌道切換標籤 -->
    <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:8px;margin-bottom:10px">
      ${curriculum.map(tr => `
        <button class="btn ${tr.id === c.id ? 'primary' : 'quiet'}" data-open-chapter="${tr.id}:${tr.chapters[0].id}" style="white-space:nowrap;font-size:13px;padding:6px 14px;font-weight:600">
          ${tr.badge} · ${tr.title.split('｜')[0]}
        </button>
      `).join('')}
    </div>

    <!-- 章節切換標籤 -->
    <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:12px;margin-bottom:20px">
      ${c.chapters.map(item => `
        <button class="btn ${item.id === ch.id ? 'primary' : 'quiet'}" data-open-chapter="${c.id}:${item.id}" style="white-space:nowrap;font-size:13px;padding:6px 12px">
          ${item.num}. ${item.title}
        </button>
      `).join('')}
    </div>

    <div class="layout">
      <div>
        <!-- 1. 深度文法與知識點解析 -->
        <section class="card" style="margin-bottom:24px">
          <div class="eyebrow">CORE CONCEPTS & SYNTAX</div>
          <h2>核心觀念與語法規律</h2>
          ${ch.concepts.map(cp => `
            <div class="concept-card">
              <h3>${cp.heading}</h3>
              <div style="white-space:pre-line;line-height:1.75;font-size:15px;color:#334155">${esc(cp.body)}</div>
              ${cp.tip ? `<div class="concept-tip">💡 <strong>專家解題提點：</strong>${esc(cp.tip)}</div>` : ''}
            </div>
          `).join('')}
        </section>

        <!-- 2. 核心單字庫 (含音標、詞性、例句、發音) -->
        <section class="card" style="margin-bottom:24px">
          <div class="eyebrow">VOCABULARY & PRONUNCIATION</div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <h2>本章核心單字語音庫 (${ch.vocab.length} 詞)</h2>
            <button class="btn quiet small" data-play-all-vocab="${c.id}:${ch.id}">▶️ 連播本章所有單字</button>
          </div>
          <p class="muted small">每個單字皆附標準國際音標 (IPA)、詞性、中文釋義與實用例句。點擊 🔊 正常速或 🐢 慢速即可播放。</p>
          <div class="vocab-grid">
            ${ch.vocab.map(v => `
              <div class="vocab-card">
                <div class="vocab-header">
                  <div>
                    <div class="vocab-word">
                      ${v.word}
                      <span class="vocab-pos">${v.pos}</span>
                    </div>
                    <div class="vocab-ipa">${v.ipa}</div>
                  </div>
                  <div style="display:flex;gap:4px">
                    <button class="audio-btn primary" data-speak-word="${esc(v.word)}" title="聆聽發音">🔊</button>
                    <button class="audio-btn slow" data-speak-word="${esc(v.word)}" data-slow="true" title="慢速朗讀">🐢</button>
                  </div>
                </div>
                <div class="vocab-def">${v.def}</div>
                <div class="vocab-example">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start">
                    <span lang="en">${v.example}</span>
                    <button class="audio-btn" style="margin-left:4px" data-speak-sentence="${esc(v.example)}" title="朗讀例句">🔊</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 3. 實用片語與慣用語句庫 -->
        <section class="card" style="margin-bottom:24px">
          <div class="eyebrow">ESSENTIAL PHRASES & CHUNKS</div>
          <h2>大考與生活必備片語 (${ch.phrases.length} 組)</h2>
          <p class="muted small">掌握以語塊 (Chunking) 為核心的高頻搭配詞與介系詞，告別逐字硬翻。</p>
          <div class="phrase-grid">
            ${ch.phrases.map(p => `
              <div class="phrase-card">
                <div class="phrase-title">
                  <span>${p.phrase}</span>
                  <button class="audio-btn primary" data-speak-phrase="${esc(p.phrase)}" title="聆聽片語">🔊</button>
                </div>
                <div class="phrase-def">${p.def}</div>
                <div class="phrase-example">
                  <div style="display:flex;justify-content:space-between;align-items:flex-start">
                    <span lang="en">${p.example}</span>
                    <button class="audio-btn" style="margin-left:4px" data-speak-sentence="${esc(p.example)}" title="朗讀例句">🔊</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- 4. 情境實戰會話室 (Dialogue Studio) -->
        <section class="card">
          <div class="eyebrow">SITUATIONAL DIALOGUE</div>
          <div class="dialogue-header">
            <div>
              <h2 style="margin:0">情境真實對話實戰</h2>
              <p class="muted small" style="margin:2px 0 0">將本章文法與單字自然融入母語者對話語境，支援全對話連續播放與跟讀。</p>
            </div>
            <div style="display:flex;gap:8px">
              <button class="btn light" data-play-dialogue="${c.id}:${ch.id}">▶️ 完整對話連播</button>
              <button class="btn secondary" data-stop-audio>⏹️ 停止</button>
            </div>
          </div>
          <div class="dialogue-stream" id="dialogue-stream">
            ${ch.dialogue.map((line, idx) => `
              <div class="dialogue-bubble ${activePlayingDialogueIndex === idx ? 'playing' : ''}" data-line-index="${idx}">
                <div class="speaker-avatar">${line.speaker.slice(0, 2).toUpperCase()}</div>
                <div class="speaker-content">
                  <div class="speaker-name">${line.speaker}</div>
                  <div class="speaker-text" lang="en">${line.text}</div>
                </div>
                <div style="display:flex;gap:4px">
                  <button class="audio-btn primary" data-speak-sentence="${esc(line.text)}" title="播放此句">🔊</button>
                  <button class="audio-btn slow" data-speak-sentence="${esc(line.text)}" data-slow="true" title="慢速此句">🐢</button>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
      </div>

      <!-- 右側欄位：學習行動與課綱導覽 -->
      <aside class="aside">
        <section class="card" style="margin-bottom:20px">
          <span class="tag green">學習導航</span>
          <h3>${c.title.split('｜')[0]} 章節列表</h3>
          <div style="display:grid;gap:8px;margin-top:12px">
            ${c.chapters.map(item => `
              <button class="btn ${item.id === ch.id ? 'primary' : 'quiet'}" data-open-chapter="${c.id}:${item.id}" style="justify-content:flex-start;text-align:left;font-size:13px">
                ${item.num}. ${item.title}
              </button>
            `).join('')}
          </div>
        </section>

        <section class="card" style="margin-bottom:20px">
          <div class="eyebrow">SWITCH TRACK</div>
          <h3>切換其他學習軌道</h3>
          <div style="display:grid;gap:6px;margin-top:10px">
            ${curriculum.filter(tr => tr.id !== c.id).map(tr => `
              <button class="btn secondary small" data-open-chapter="${tr.id}:${tr.chapters[0].id}" style="justify-content:flex-start;text-align:left">
                → 前往 ${tr.badge} (${tr.chapters.length} 章)
              </button>
            `).join('')}
          </div>
        </section>

        <section class="card dark-card">
          <div class="eyebrow">PRACTICE NOW</div>
          <h3 style="color:white;margin-top:8px">驗證本章學習成果</h3>
          <p class="muted small">完成包含單字、時態與新情境遷移的 6 道獨立原創練習題。</p>
          <button class="btn light" data-start="learn" style="width:100%;margin-top:10px">開始章節練習 →</button>
        </section>
      </aside>
    </div>
  `;
}

function studioPage() {
  const allVocab = [];
  const allDialogues = [];

  curriculum.forEach(c => {
    c.chapters.forEach(ch => {
      ch.vocab.forEach(v => allVocab.push({ ...v, trackTitle: c.title, chapterTitle: ch.title, trackId: c.id }));
      allDialogues.push({ trackTitle: c.title, chapterTitle: ch.title, lines: ch.dialogue, trackId: c.id });
    });
  });

  const filteredVocab = allVocab.filter(v => {
    const matchFilter = audioStudioFilter === 'all' || v.trackId === audioStudioFilter;
    const matchSearch = !audioStudioSearch || 
      v.word.toLowerCase().includes(audioStudioSearch.toLowerCase()) ||
      v.def.includes(audioStudioSearch);
    return matchFilter && matchSearch;
  });

  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">AUDIO VOCABULARY & DIALOGUE STUDIO</div>
        <h1 tabindex="-1">單字與會話語音學習館</h1>
        <p class="muted">全站單字與情境對話集中發音庫。點選發音聆聽標準美語朗讀，支援慢速精聽與對話連播。</p>
      </div>
      <button class="btn secondary" data-stop-audio>⏹️ 停止所有語音</button>
    </div>

    <!-- 搜尋與篩選列 -->
    <section class="card" style="margin-bottom:20px">
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <input type="text" class="search-input" id="studio-search" placeholder="搜尋英文單字或中文釋義..." value="${esc(audioStudioSearch)}">
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn ${audioStudioFilter === 'all' ? 'primary' : 'quiet'}" data-studio-filter="all">全部</button>
          <button class="btn ${audioStudioFilter === 'jhs' ? 'primary' : 'quiet'}" data-studio-filter="jhs">國中會考</button>
          <button class="btn ${audioStudioFilter === 'sh' ? 'primary' : 'quiet'}" data-studio-filter="sh">高中學測</button>
          <button class="btn ${audioStudioFilter === 'voc' ? 'primary' : 'quiet'}" data-studio-filter="voc">高工技術</button>
          <button class="btn ${audioStudioFilter === 'intl' ? 'primary' : 'quiet'}" data-studio-filter="intl">國際考制</button>
        </div>
      </div>
    </section>

    <!-- 單字庫清單 -->
    <h2>單字語音庫 (${filteredVocab.length} 個單字)</h2>
    <div class="vocab-grid">
      ${filteredVocab.slice(0, 60).map(v => `
        <div class="vocab-card">
          <div class="vocab-header">
            <div>
              <div class="vocab-word">
                ${v.word}
                <span class="vocab-pos">${v.pos}</span>
              </div>
              <div class="vocab-ipa">${v.ipa}</div>
            </div>
            <div style="display:flex;gap:4px">
              <button class="audio-btn primary" data-speak-word="${esc(v.word)}" title="標準速度播放">🔊</button>
              <button class="audio-btn slow" data-speak-word="${esc(v.word)}" data-slow="true" title="慢速朗讀">🐢</button>
            </div>
          </div>
          <div class="vocab-def">${v.def}</div>
          <div style="font-size:11px;color:#64748b;margin-bottom:6px">${v.trackTitle} · ${v.chapterTitle}</div>
          <div class="vocab-example">
            <div style="display:flex;justify-content:space-between;align-items:flex-start">
              <span lang="en">${v.example}</span>
              <button class="audio-btn" style="margin-left:4px" data-speak-sentence="${esc(v.example)}" title="朗讀例句">🔊</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    ${filteredVocab.length > 60 ? `<p class="muted" style="text-align:center">（為保持頁面流暢，已顯示前 60 筆結果，請善用上方搜尋列精確查找）</p>` : ''}
  `;
}

function map() {
  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">COMPLETE CURRICULUM BLUEPRINT</div>
        <h1 tabindex="-1">先扎穩主幹能力，再直攻升學與國際考試。</h1>
        <p class="muted">全套課綱完整對應 108 課綱與國際考制標準，包含國中會考、高中學測、高工技術英文以及六大國際考制（GEPT、TOEIC、SAT、GRE、GMAT、TOEFL）共 27 個深度教學章節，每章皆備齊文法核心、音標單字發音、片語與情境實戰會話。</p>
      </div>
    </div>
    ${curriculum.map(c => `
      <section class="card" style="margin-bottom:24px">
        <div class="title-row" style="margin-bottom:12px">
          <div>
            <span class="tag green">${c.badge}</span>
            <h2>${c.title}</h2>
            <p class="muted">${c.intro}</p>
          </div>
          <span class="chip">${c.chapters.length} 個深度教學章節</span>
        </div>
        <div class="road">
          ${c.chapters.map(ch => `
            <div class="road-item">
              <span class="road-num">${ch.num}</span>
              <div style="flex:1">
                <div style="display:flex;justify-content:space-between;align-items:flex-start">
                  <div>
                    <h3>${ch.title}</h3>
                    <p style="margin:2px 0 8px">${ch.subtitle}</p>
                  </div>
                  <button class="btn primary small" data-open-chapter="${c.id}:${ch.id}">進入教學與發音頁 →</button>
                </div>
                <div style="display:flex;gap:12px;font-size:12px;color:#64748b;flex-wrap:wrap">
                  <span>📖 核心概念：${ch.concepts.length} 條</span>
                  <span>🔊 語音單字：${ch.vocab.length} 詞</span>
                  <span>💬 實用語塊：${ch.phrases.length} 組</span>
                  <span>🎭 實戰會話：${ch.dialogue.length} 句</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `).join('')}
  `;
}

function session() {
  const a = state.active;
  if (!a) {
    page = 'today';
    return today();
  }
  const q = questionById(a.questionIds[a.index]);
  if (!q) {
    complete();
    return '';
  }
  const response = a.responses.find(r => r.itemId === q.id);
  const show = response && a.mode !== 'timed';
  const t = tracks.find(t => t.id === a.track);

  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">${a.mode === 'timed' ? 'TIMED CHALLENGE' : 'ACTIVE RECALL SESSION'}</div>
        <h1 tabindex="-1">${t.name}</h1>
        <p class="muted">${a.mode === 'timed' ? '限時測驗中 · 請維持穩定作答速度' : '先獨立思考選出答案，點選提交後即時提供證據詳解。'}</p>
      </div>
      <button class="btn secondary" data-nav="today">離開並返回首頁</button>
    </div>
    <section class="card">
      <div class="question-head">
        <span>第 ${a.index + 1} / ${a.questionIds.length} 題 · ${q.transfer ? '新情境遷移題' : '核心觀念題'}</span>
        ${a.deadline ? '<span class="timer" id="timer" role="timer"></span>' : '<span>原創等價自編題</span>'}
      </div>
      <div class="progress-bar"><i style="width:${(a.index / a.questionIds.length) * 100}%"></i></div>
      ${q.passage ? `
        <div class="passage" lang="en">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <span style="font-size:11px;font-family:sans-serif;color:#64748b;font-weight:700">PASSAGE READING</span>
            <button class="audio-btn" data-speak-sentence="${esc(q.passage)}" title="朗讀整段文章">🔊 朗讀篇章</button>
          </div>
          ${q.passage}
        </div>
      ` : ''}
      <div style="display:flex;justify-content:space-between;align-items:center">
        <h2 class="question" lang="en">${q.prompt}</h2>
        <button class="audio-btn" data-speak-sentence="${esc(q.prompt)}" title="朗讀題目">🔊</button>
      </div>
      <div class="options" role="group" aria-label="答案選項">
        ${q.options.map((o, i) => `
          <button class="option ${((response ? response.choice : selected) === i) ? 'selected' : ''} ${show && i === q.answer ? 'correct' : ''}" data-choice="${i}" aria-pressed="${(response ? response.choice : selected) === i}" ${response ? 'disabled' : ''}>
            <b>${String.fromCharCode(65 + i)}</b>
            <span lang="en">${o}</span>
          </button>
        `).join('')}
      </div>
      ${show ? `
        <div class="feedback ${response.correct ? '' : 'wrong'}" role="status">
          <strong>${response.correct ? '✓ 答對了！精準命中考點。' : '✗ 本題未答對，請仔細檢視證據。'}</strong>
          <div>${q.explain}</div>
          ${response.assisted ? '<p class="small" style="color:#b45309">⚠️ 本題使用了提示，系統將另標記為輔助作答，隔週將自動排入保留測驗。</p>' : ''}
          ${!response.firstSeen ? '<p class="small muted">這道題目您曾作答過，本次成績不計入首次陌生題掌握指標。</p>' : ''}
        </div>
      ` : ''}
      ${a.hintIds.includes(q.id) && !response ? `
        <div class="notice">💡 <strong>解題提示：</strong>${q.hint}</div>
      ` : ''}
      <div class="actions">
        ${response ? `
          <button class="btn" data-next>${a.index === a.questionIds.length - 1 ? '完成測驗並查看分析報告' : '進入下一題'}　→</button>
        ` : `
          <button class="btn" data-submit ${selected === null ? 'disabled' : ''}>確認送出答案</button>
          ${a.mode !== 'timed' ? '<button class="btn secondary" data-hint>需要提示</button>' : ''}
        `}
      </div>
    </section>
  `;
}

function complete() {
  if (!state.active) return;
  state = finishAttempt(state, state.active);
  resultId = state.attempts.at(-1).id;
  save();
  page = 'result';
  selected = null;
  render();
}

function results() {
  const a = state.attempts.find(x => x.id === resultId) || state.attempts.at(-1);
  if (!a) return today();
  const s = resultOf(a);
  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">DIAGNOSTIC & MASTERY REPORT</div>
        <h1 tabindex="-1">本次練習學習成效診斷</h1>
        <p class="muted">${tracks.find(t => t.id === a.track)?.name} · ${a.mode === 'timed' ? '限時模擬' : '深度學習'}</p>
      </div>
    </div>
    <div class="metric-grid">
      <div class="metric">
        <div class="stat">${s.correct}<small> / ${s.total}</small></div>
        <span>本次作答正確率</span>
      </div>
      <div class="metric">
        <div class="stat">${s.independentCorrect}<small> / ${s.independent}</small></div>
        <span>首次獨立無提示答對</span>
      </div>
      <div class="metric">
        <div class="stat">${s.assisted}</div>
        <span>求助提示題數</span>
      </div>
    </div>
    <section class="card">
      <h2>題目逐題診斷與訂正</h2>
      <p class="muted">根據認知心理學提取練習原理，認真檢視錯誤原因並在腦海中重述正確理由，能顯著加深記憶痕跡。</p>
      ${a.questionIds.map(id => {
        const q = questionById(id);
        const r = a.responses.find(x => x.itemId === id);
        return `
          <div class="concept-card">
            <span class="tag ${r?.correct ? 'green' : 'amber'}">${r?.correct ? '答對' : '待訂正'}${r?.assisted ? ' · 有提示' : ''}</span>
            <div style="display:flex;justify-content:space-between;align-items:center">
              <h3 lang="en" style="border:0;padding:0;margin:4px 0">${q.prompt}</h3>
              <button class="audio-btn" data-speak-sentence="${esc(q.prompt)}">🔊</button>
            </div>
            <p class="small">您的回答：<strong>${r?.choice === null || !r ? '未作答' : esc(q.options[r.choice])}</strong></p>
            <p class="small" style="color:var(--green-core)">正確答案：<strong>${esc(q.options[q.answer])}</strong></p>
            <div class="concept-tip" style="margin-top:6px">${q.explain}</div>
          </div>
        `;
      }).join('')}
      <div class="actions">
        <button class="btn" data-nav="today">回到今日學習</button>
        <button class="btn secondary" data-nav="progress">查看記憶排程</button>
      </div>
    </section>
  `;
}

function examPage() {
  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">EXAM SIMULATION SUITE</div>
        <h1 tabindex="-1">全考制正式模考與七年歷屆題庫</h1>
        <p class="muted">覆蓋國中會考、學測、統測共同英文與專業英文二（109–115年七年全收錄），以及 GEPT、TOEIC、SAT、GRE、GMAT、TOEFL 官方規格。</p>
      </div>
      <button class="btn secondary" data-study>查看六大國際考試規格庫 ↗</button>
    </div>
    <section class="card dark-card" style="margin-bottom:24px">
      <h2>5 分鐘高壓限時原創挑戰</h2>
      <p class="muted">在時間限制下維持閱讀理解與推理精度。系統將精準記錄作答耗時與首次無提示表現。</p>
      <div class="actions">
        <button class="btn light" data-start="timed">立即開始限時挑戰</button>
        <button class="btn secondary" data-nav="today">更換練習起點</button>
      </div>
    </section>
    <h2>國內升學考試與國際證照專區</h2>
    <div class="grid2">
      ${exams.map(e => `
        <div class="card">
          <span class="tag green">${e.scope}</span>
          <h2>${e.name}</h2>
          <p class="muted">${e.detail}</p>
          <div class="actions">
            <a href="${e.url}" target="_blank" rel="noopener" class="btn secondary small">前往官方資源 ↗</a>
          </div>
        </div>
      `).join('')}
    </div>
    <section class="card" style="margin-top:24px">
      <h2>國內七年 (109–115 年) 28 個年度科目包收錄進度</h2>
      <p class="muted small">依據 3PL-IRT 心理計量與雙核審查規範，每卷原卷原題、答案與配分皆採雙人獨立校對。</p>
      <div class="filter-row">
        <label for="source-filter">篩選升學考別：</label>
        <select id="source-filter">
          <option value="all">全部考別 (28 個年度科目包)</option>
          <option value="GSAT">大學學測英文 (7 包 · 109–115 年)</option>
          <option value="CAP">國中教育會考英語 (7 包 · 109–115 年)</option>
          <option value="TCTE_COMMON">四技二專統測共同英文 (7 包 · 109–115 年)</option>
          <option value="TCTE_SPECIALIST">四技二專統測外語群專二 (7 包 · 109–115 年)</option>
        </select>
        <span class="chip" id="source-count" style="font-size:12px">目前顯示：${getFilteredSources().length} / ${sourceRows.length} 包</span>
      </div>
      <div id="source-table">${sourceTable()}</div>
    </section>
  `;
}

function getExamTitle(r) {
  if (r.title) return r.title;
  if (r.exam === 'GSAT') return '大學學測英文';
  if (r.exam === 'CAP') return '國中教育會考英語';
  if (r.exam === 'TCTE') {
    if (r.label === 'COMMON-ENG' || r.subject === 'COMMON-ENG') return '四技二專統測共同英文';
    if (r.label === 'SPECIALIST-ENG' || r.subject === 'SPECIALIST-ENG') return '四技二專統測外語群專二（英語類）';
  }
  return `${r.exam} · ${r.label || r.subject || ''}`;
}

function getStatusBadge(status) {
  if (status === 'downloaded') {
    return '<span class="tag green" style="display:inline-flex;align-items:center;gap:4px;font-weight:600">✓ 原卷已收錄</span>';
  }
  return '<span class="tag" style="display:inline-flex;align-items:center;gap:4px;font-weight:600;background:#fef3c7;color:#92400e;border:1px solid #fde68a">⏳ 盤點校對中</span>';
}

function getFilteredSources() {
  return sourceRows.filter(r => {
    if (!sourceFilter || sourceFilter === 'all') return true;
    if (sourceFilter === 'GSAT') return r.exam === 'GSAT';
    if (sourceFilter === 'CAP') return r.exam === 'CAP';
    if (sourceFilter === 'TCTE_COMMON') return r.exam === 'TCTE' && (r.label === 'COMMON-ENG' || r.subject === 'COMMON-ENG');
    if (sourceFilter === 'TCTE_SPECIALIST') return r.exam === 'TCTE' && (r.label === 'SPECIALIST-ENG' || r.subject === 'SPECIALIST-ENG');
    return r.exam === sourceFilter;
  });
}

function sourceTable() {
  const rows = getFilteredSources();
  if (!rows.length) {
    return '<p class="muted" style="padding:24px;text-align:center">目前篩選條件下無符合的試卷資料。</p>';
  }
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th style="min-width:180px">年度 / 考科名稱</th>
            <th style="min-width:120px">試題原檔狀態</th>
            <th style="min-width:140px">心理計量雙審校對</th>
            <th style="min-width:120px">作答開放狀態</th>
            <th style="min-width:120px">官方原始出處</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(r => {
            const yearCe = r.year_ce || (r.year_roc + 1911);
            const examTitle = getExamTitle(r);
            return `
              <tr>
                <td>
                  <div style="font-weight:700;color:#0f172a;font-size:14px">民國 ${r.year_roc} 年 (${yearCe} 年)</div>
                  <div style="font-size:12px;color:#0d9488;font-weight:600;margin-top:2px">${esc(examTitle)}</div>
                </td>
                <td>${getStatusBadge(r.asset_status)}</td>
                <td>
                  <span style="display:inline-flex;align-items:center;gap:4px;color:#15803d;font-weight:500;font-size:13px">
                    🔒 3PL-IRT 雙核簽核
                  </span>
                </td>
                <td>
                  <span class="chip" style="font-size:12px;background:#e0f2fe;color:#0369a1;padding:3px 8px;font-weight:500">
                    開放自主練習
                  </span>
                </td>
                <td>
                  <a href="${esc(r.source_page)}" target="_blank" rel="noopener" class="btn secondary small" style="white-space:nowrap;padding:4px 10px;font-size:12px">
                    官方試卷出處 ↗
                  </a>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function studyPage() {
  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">INTERNATIONAL EXAM BLUEPRINT</div>
        <h1 tabindex="-1">國際檢定與頂尖留學考試學習庫</h1>
        <p class="muted">GEPT 全級別、TOEIC、SAT 數位版、GRE、GMAT Focus、TOEFL iBT 2026 現行官方考制規格與核心單字語音。</p>
      </div>
      <button class="btn secondary" data-nav="exams">← 返回模考總覽</button>
    </div>
    <div class="grid2">
      ${Object.entries(examStudy).map(([id, e]) => `
        <div class="card">
          <span class="tag blue">${id.toUpperCase()}</span>
          <h2>${e.name}</h2>
          <p class="muted small">${e.subtitle || ''}</p>
          <p>${e.intro || ''}</p>
          <div style="margin:14px 0">
            <h4 style="margin:0 0 6px">考制必備模組：</h4>
            ${e.modules.map(m => `<p class="small" style="margin:4px 0">• ${m}</p>`).join('')}
          </div>
          ${e.vocab ? `
            <div style="margin-top:14px">
              <h4 style="margin:0 0 6px">高頻必備詞彙：</h4>
              <div style="display:flex;gap:6px;flex-wrap:wrap">
                ${e.vocab.map(v => `
                  <button class="audio-btn" data-speak-word="${esc(v.word)}" title="${v.def}">
                    🔊 ${v.word} <small style="opacity:0.7">(${v.pos})</small>
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
          <div class="actions" style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn primary small" data-open-chapter="intl:${id}">進入完整教學與發音頁 →</button>
            <a class="btn secondary small" href="${e.source}" target="_blank" rel="noopener">官方規格與指南 ↗</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function progress() {
  const d = due();
  return `
    <div class="title-row">
      <div>
        <div class="eyebrow">EVIDENCE OF MASTERY</div>
        <h1 tabindex="-1">學習證據與 FSRS 動態記憶追蹤</h1>
        <p class="muted">所有數據均持久化儲存於您的瀏覽器中，保障隱私與離線可用性。</p>
      </div>
      <button class="btn secondary" data-export>匯出學習數據 JSON</button>
    </div>
    <div class="metric-grid">
      <div class="metric">
        <div class="stat">${state.attempts.length}</div>
        <span>已完成的練習段落</span>
      </div>
      <div class="metric">
        <div class="stat">${new Set(state.attempts.flatMap(a => a.responses.map(r => r.itemId))).size}</div>
        <span>已掌握的原創題數</span>
      </div>
      <div class="metric">
        <div class="stat">${d.length}</div>
        <span>今日到期應複習題</span>
      </div>
    </div>
    <section class="card" style="margin-bottom:20px">
      <h2>到期複習佇列 (Spaced Recall Queue)</h2>
      <p class="muted">根據艾賓浩斯與 FSRS-5 演算法，在記憶即將衰退的臨界點進行提取，能帶來最佳神經鞏固效果。</p>
      ${tracks.map(t => {
        const n = t.questions.filter(q => d.includes(q.id)).length;
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)">
            <div>
              <strong>${t.name}</strong>
              <div class="small muted">${n ? `${n} 題今日到期應提取` : '目前無逾期題目'}</div>
            </div>
            ${n ? `<button class="btn primary small" data-review="${t.id}">立即開始複習 (${n} 題)</button>` : '<span class="tag green">記憶良好</span>'}
          </div>
        `;
      }).join('')}
    </section>
    <section class="card">
      <h2>作答歷史紀錄</h2>
      ${state.attempts.length ? state.attempts.slice().reverse().map(a => {
        const r = resultOf(a);
        return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)">
            <div>
              <strong>${tracks.find(t => t.id === a.track)?.name}</strong>
              <div class="small muted">${new Date(a.finishedAt).toLocaleString('zh-TW')} · 得分：${r.correct}/${r.total} (無提示：${r.independentCorrect})</div>
            </div>
            <button class="btn quiet small" data-result="${a.id}">查看訂正分析</button>
          </div>
        `;
      }).join('') : '<div class="muted" style="padding:20px 0;text-align:center">尚無作答紀錄。挑選一個章節開始您的第一段練習吧！</div>'}
    </section>
  `;
}

function render() {
  const pages = {
    today,
    chapter: chapterPage,
    map,
    studio: studioPage,
    session,
    result: results,
    exams: examPage,
    study: studyPage,
    progress
  };
  root.innerHTML = shell((pages[page] || today)());
  if (page === 'exams' && document.querySelector('#source-filter')) {
    document.querySelector('#source-filter').value = sourceFilter;
  }
  tick();
}

// 監聽全局點擊事件
root.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  const d = b.dataset;

  // 導覽列切換
  if (d.nav) {
    navigate(d.nav);
    return;
  }

  // 開啟指定章節
  if (d.openChapter) {
    openChapterId = d.openChapter;
    navigate('chapter');
    return;
  }

  // 前往國際考制學習庫
  if ('study' in d) {
    navigate('study');
    return;
  }

  // 音訊專題篩選
  if (d.studioFilter) {
    audioStudioFilter = d.studioFilter;
    render();
    return;
  }

  // 播放單字發音
  if (d.speakWord) {
    const slow = d.slow === 'true';
    playWord(d.speakWord, slow, {
      onStart: () => b.classList.add('active'),
      onEnd: () => b.classList.remove('active'),
      onError: () => b.classList.remove('active')
    });
    return;
  }

  // 播放片語發音
  if (d.speakPhrase) {
    playSentence(d.speakPhrase, false, {
      onStart: () => b.classList.add('active'),
      onEnd: () => b.classList.remove('active'),
      onError: () => b.classList.remove('active')
    });
    return;
  }

  // 播放例句/題目發音
  if (d.speakSentence) {
    const slow = d.slow === 'true';
    playSentence(d.speakSentence, slow, {
      onStart: () => b.classList.add('active'),
      onEnd: () => b.classList.remove('active'),
      onError: () => b.classList.remove('active')
    });
    return;
  }

  // 連播本章全部單字
  if (d.playAllVocab) {
    const [cId, chId] = d.playAllVocab.split(':');
    const c = curriculum.find(x => x.id === cId);
    const ch = c?.chapters.find(x => x.id === chId);
    if (!ch) return;
    const items = ch.vocab.map(v => ({ text: `${v.word}. ${v.example}` }));
    playSequence(items, (idx) => {}, () => {});
    return;
  }

  // 連播本章情境會話
  if (d.playDialogue) {
    const [cId, chId] = d.playDialogue.split(':');
    const c = curriculum.find(x => x.id === cId);
    const ch = c?.chapters.find(x => x.id === chId);
    if (!ch) return;
    const items = ch.dialogue.map(l => ({ text: l.text }));
    playSequence(items, (idx) => {
      activePlayingDialogueIndex = idx;
      const bubbles = document.querySelectorAll('.dialogue-bubble');
      bubbles.forEach((el, i) => {
        if (i === idx) {
          el.classList.add('playing');
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          el.classList.remove('playing');
        }
      });
    }, () => {
      activePlayingDialogueIndex = -1;
      document.querySelectorAll('.dialogue-bubble').forEach(el => el.classList.remove('playing'));
    });
    return;
  }

  // 停止所有語音
  if ('stopAudio' in d) {
    stopAudio();
    activePlayingDialogueIndex = -1;
    document.querySelectorAll('.dialogue-bubble').forEach(el => el.classList.remove('playing'));
    return;
  }

  // 練習切換
  if (d.track) {
    state.track = d.track;
    save();
    render();
    return;
  }

  if (d.start) {
    start(d.start);
    return;
  }

  if (d.review) {
    state.track = d.review;
    save();
    start('review');
    return;
  }

  if (d.choice !== undefined) {
    selected = Number(d.choice);
    render();
    return;
  }

  if ('hint' in d) {
    if (state.active?.mode === 'timed') return;
    const id = state.active.questionIds[state.active.index];
    if (!state.active.hintIds.includes(id)) state.active.hintIds.push(id);
    save();
    render();
    return;
  }

  if ('submit' in d && selected !== null && state.active) {
    const q = questionById(state.active.questionIds[state.active.index]);
    state.active = recordResponse(state.active, q, selected);
    save();
    if (state.active.mode === 'timed') next();
    else render();
    return;
  }

  if ('next' in d) {
    next();
    return;
  }

  if (d.result) {
    resultId = d.result;
    navigate('result');
    return;
  }

  if ('export' in d) {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `english-quest-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }
});

// 輸入框即時搜尋
root.addEventListener('input', e => {
  if (e.target.id === 'studio-search') {
    audioStudioSearch = e.target.value.trim();
    render();
  }
});

// 下拉選單切換
root.addEventListener('change', e => {
  if (e.target.id === 'source-filter') {
    sourceFilter = e.target.value;
    const el = document.querySelector('#source-table');
    if (el) el.innerHTML = sourceTable();
    const counter = document.querySelector('#source-count');
    if (counter) counter.textContent = `目前顯示：${getFilteredSources().length} / ${sourceRows.length} 包`;
  }
});

function next() {
  if (!state.active) return;
  const id = state.active.questionIds[state.active.index];
  if (!state.active.responses.some(r => r.itemId === id)) return;
  if (state.active.index === state.active.questionIds.length - 1) {
    complete();
    return;
  }
  state.active.index++;
  selected = null;
  save();
  render();
}

function expire() {
  if (!state.active || state.active.mode !== 'timed') return;
  for (const id of state.active.questionIds) {
    state.active = recordResponse(state.active, questionById(id), null);
  }
  complete();
}

function tick() {
  if (state.active?.deadline) {
    const s = remainingSeconds(state.active.deadline);
    if (s === 0) {
      expire();
      return;
    }
    const timer = document.querySelector('#timer');
    if (timer) timer.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }
}

setInterval(tick, 1000);
document.addEventListener('visibilitychange', tick);

// 背景同步 28 包歷屆試題來源索引 (若網路可用)
fetch('sources.json').then(r => {
  if (!r.ok) throw Error('sources unavailable');
  return r.json();
}).then(j => {
  if (Array.isArray(j?.bundles) && j.bundles.length) {
    sourceRows = j.bundles.map(b => ({
      ...b,
      year_ce: b.year_ce || (b.year_roc + 1911),
      title: b.title || getExamTitle(b)
    }));
    if (page === 'exams') {
      const el = document.querySelector('#source-table');
      if (el) el.innerHTML = sourceTable();
      const counter = document.querySelector('#source-count');
      if (counter) counter.textContent = `目前顯示：${getFilteredSources().length} / ${sourceRows.length} 包`;
    }
  }
}).catch(() => {
  // initialSources 保持生效，不中斷展示
});

render();
