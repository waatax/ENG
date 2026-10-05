// display_settings.mjs - 舒適閱讀色調、字體與行距調整、手機直式與電腦最優化顯示引擎
// 支援 4 種護眼主題、多檔位字體無損縮放、行距微調、閱讀版寬切換與手機底部抽屜面板

export const THEMES = [
  { id: 'light', name: '☀️ 晨曦明眸', icon: '☀️', desc: '淺灰背景與深色文字，適合明亮環境' },
  { id: 'warm', name: '📜 羊皮暖陽', icon: '📜', desc: '柔和米色背景，可依環境與個人偏好選擇' },
  { id: 'dark', name: '🌙 墨夜星空', icon: '🌙', desc: '深色背景與柔白文字，適合低光環境' },
  { id: 'sage', name: '🍃 青木沉思', icon: '🍃', desc: '低彩度灰綠背景，提供另一種閱讀選擇' }
];

export const LINE_HEIGHTS = [
  { id: 'standard', val: '1.65', label: '標準 1.65', desc: '適中緊湊，查閱效率高' },
  { id: 'relaxed', val: '1.85', label: '舒適 1.85', desc: '呼吸感佳，長時間閱讀最推薦' },
  { id: 'spacious', val: '2.05', label: '疏朗 2.05', desc: '大字與易讀性優先' }
];

export const SCALE_PRESETS = [
  { scale: 0.90, label: '緊湊 90%', desc: '適合高密度排版與小螢幕全覽' },
  { scale: 1.0, label: '標準 100%', desc: '適合 1080p 一般筆電螢幕' },
  { scale: 1.15, label: '舒適 115%', desc: '適合 2K / 1440p 或大螢幕閱讀' },
  { scale: 1.30, label: '大字 130%', desc: '放大文字，依個人需求選擇' },
  { scale: 1.50, label: '4K特大 150%', desc: '4K (3840x2160) 100% 顯示黃金比例' },
  { scale: 1.75, label: '4K巨屏 175%', desc: '適合 4K 大尺寸螢幕、投影或高可讀性' }
];

const SCALE_STEPS = [0.85, 0.9, 1.0, 1.15, 1.30, 1.50, 1.75, 2.0];

let currentScale = 1.0;
let currentTheme = 'light';
let currentLineHeight = 'relaxed';
let currentReadingWidth = 'standard'; // 'standard' (focus) | 'wide'
let isDrawerOpen = false;
let isInitialized = false;
let drawerTrigger = null;
let backgroundStates = [];

// 初始化設定 (自動讀取 LocalStorage 或智慧偵測 4K 螢幕)
export function initDisplaySettings() {
  if (typeof window === 'undefined' || isInitialized) return;

  try {
    const savedTheme = localStorage.getItem('eq_reading_theme');
    if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
      currentTheme = savedTheme;
    } else {
      // 依系統偏好自動預設
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentTheme = 'dark';
      } else {
        currentTheme = 'light';
      }
    }

    const savedScale = localStorage.getItem('eq_display_scale');
    if (savedScale) {
      currentScale = parseFloat(savedScale) || 1.0;
    } else {
      // 智慧偵測：若為 4K 螢幕 (寬度 >= 3400 或 innerWidth >= 2560 且 devicePixelRatio 近似 1)
      const is4K = (window.screen && window.screen.width >= 3400) || window.innerWidth >= 2560;
      const is2K = (window.screen && window.screen.width >= 2400) || window.innerWidth >= 2000;
      if (is4K) {
        currentScale = 1.50; // 4K 100% 顯示最佳首選
      } else if (is2K) {
        currentScale = 1.15;
      } else {
        currentScale = 1.0;
      }
    }

    const savedLH = localStorage.getItem('eq_reading_line_height');
    if (savedLH && LINE_HEIGHTS.some(lh => lh.id === savedLH)) {
      currentLineHeight = savedLH;
    }

    const savedWidth = localStorage.getItem('eq_reading_width');
    if (savedWidth) {
      currentReadingWidth = savedWidth;
    }
  } catch {
    currentScale = 1.0;
    currentTheme = 'light';
    currentLineHeight = 'relaxed';
    currentReadingWidth = 'standard';
  }

  applyTheme(currentTheme, false);
  applyDisplayScale(currentScale, false);
  applyLineHeight(currentLineHeight, false);
  applyReadingWidth(currentReadingWidth);

  setupKeyboardShortcuts();
  isInitialized = true;
}

// 註冊全域鍵盤快捷鍵 (提升電腦端無障礙操作體驗)
function setupKeyboardShortcuts() {
  if (typeof window === 'undefined') return;
  window.addEventListener('keydown', (e) => {
    if (isDrawerOpen && e.key === 'Escape') {
      e.preventDefault();
      closeReadingDrawer();
      return;
    }
    if (isDrawerOpen && e.key === 'Tab') {
      const sheet = document.querySelector('.reading-drawer-sheet');
      const items = [...(sheet?.querySelectorAll('button:not(:disabled), [href], input, select, textarea, [tabindex="0"]') || [])];
      const first = items[0], last = items.at(-1);
      if (first && e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (last && !e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    // 避免在輸入框中攔截快捷鍵
    const tag = e.target?.tagName?.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target?.isContentEditable) return;

    if (e.key === '[' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // 縮小字體
      stepScale(-1);
    } else if (e.key === ']' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // 放大字體
      stepScale(1);
    } else if (e.altKey && (e.key === 't' || e.key === 'T')) {
      // 輪播切換色彩主題
      e.preventDefault();
      cycleTheme();
    } else if (e.altKey && (e.key === 'w' || e.key === 'W')) {
      // 切換閱讀版面寬度
      e.preventDefault();
      toggleWidth();
    } else if (e.key === 'Escape' && isDrawerOpen) {
      closeReadingDrawer();
    }
  });
}

// 套用主題色彩模式
export function applyTheme(themeId, save = true) {
  currentTheme = THEMES.some(t => t.id === themeId) ? themeId : 'light';
  if (save) {
    try {
      localStorage.setItem('eq_reading_theme', currentTheme);
    } catch {}
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (document.body) {
      document.body.setAttribute('data-theme', currentTheme);
    }

    // 更新介面上所有主題標記
    const themePills = document.querySelectorAll('[data-set-theme]');
    themePills.forEach(pill => {
      if (pill.dataset.setTheme === currentTheme) {
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
      } else {
        pill.classList.remove('active');
        pill.setAttribute('aria-pressed', 'false');
      }
    });
  }
}

// 輪播下一個色彩主題
export function cycleTheme() {
  const currentIdx = THEMES.findIndex(t => t.id === currentTheme);
  const nextIdx = (currentIdx + 1) % THEMES.length;
  applyTheme(THEMES[nextIdx].id, true);
}

// 套用顯示與字體縮放
export function applyDisplayScale(scale, save = true) {
  currentScale = Number.isFinite(Number(scale)) ? Math.min(2, Math.max(0.85, Math.round(Number(scale) * 100) / 100)) : 1;

  if (save) {
    try {
      localStorage.setItem('eq_display_scale', currentScale.toString());
    } catch {}
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    // 1. 設定標準 CSS zoom (現代 Chrome、Edge、Safari、Firefox 126+ 原生向量清晰無損縮放)
    document.documentElement.style.zoom = 1;

    // 2. 設定 CSS 變數供相對尺寸精算與根字體縮放
    document.documentElement.style.setProperty('--app-scale', currentScale);
    document.documentElement.style.fontSize = `calc(16px * ${currentScale})`;
    document.documentElement.setAttribute('data-app-scale', currentScale);

    // 3. 更新介面上所有標記
    const scaleDisplays = document.querySelectorAll('.current-scale-text');
    scaleDisplays.forEach(el => {
      el.textContent = `${Math.round(currentScale * 100)}%`;
    });

    const pills = document.querySelectorAll('[data-set-scale]');
    pills.forEach(p => {
      const s = parseFloat(p.dataset.setScale);
      if (Math.abs(s - currentScale) < 0.04) {
        p.classList.add('active');
        p.setAttribute('aria-pressed', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      }
    });
  }
}

// 步進縮放
function stepScale(stepDirection) {
  let nearestIdx = 2;
  let minDiff = 999;
  SCALE_STEPS.forEach((s, idx) => {
    const diff = Math.abs(s - currentScale);
    if (diff < minDiff) {
      minDiff = diff;
      nearestIdx = idx;
    }
  });

  const nextIdx = Math.max(0, Math.min(SCALE_STEPS.length - 1, nearestIdx + stepDirection));
  applyDisplayScale(SCALE_STEPS[nextIdx], true);
}

// 套用行距密度
export function applyLineHeight(lhId, save = true) {
  const item = LINE_HEIGHTS.find(lh => lh.id === lhId) || LINE_HEIGHTS[1];
  currentLineHeight = item.id;

  if (save) {
    try {
      localStorage.setItem('eq_reading_line_height', currentLineHeight);
    } catch {}
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.style.setProperty('--reading-line-height', item.val);
    document.documentElement.setAttribute('data-reading-line-height', item.id);

    const lhPills = document.querySelectorAll('[data-set-line-height]');
    lhPills.forEach(p => {
      if (p.dataset.setLineHeight === currentLineHeight) {
        p.classList.add('active');
        p.setAttribute('aria-pressed', 'true');
      } else {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      }
    });
  }
}

// 套用閱讀寬度切換 (寬屏模式 vs 專注模式)
export function applyReadingWidth(widthMode) {
  currentReadingWidth = widthMode === 'wide' ? 'wide' : 'standard';
  try {
    localStorage.setItem('eq_reading_width', currentReadingWidth);
  } catch {}

  if (typeof document !== 'undefined' && document.body) {
    if (currentReadingWidth === 'wide') {
      document.body.classList.add('reading-wide-mode');
    } else {
      document.body.classList.remove('reading-wide-mode');
    }

    const widthBtns = document.querySelectorAll('.width-toggle-btn');
    widthBtns.forEach(btn => {
      const isWide = currentReadingWidth === 'wide';
      btn.innerHTML = `<span>${isWide ? '↔️' : '📖'}</span> <span>${isWide ? '寬屏模式' : '專注寬度 (850px)'}</span>`;
    });
  }
}

// 切換版面寬度
export function toggleWidth() {
  const nextMode = currentReadingWidth === 'wide' ? 'standard' : 'wide';
  applyReadingWidth(nextMode);
}

// 智慧 4K 自動偵測與配適
export function autoDetect4K() {
  if (typeof window === 'undefined') return 1.0;

  const screenW = window.screen?.width || window.innerWidth;
  const dpr = window.devicePixelRatio || 1;

  let optimal = 1.0;
  let msg = '已偵測為標準解析度螢幕，套用 100% 標準比例。';

  if (screenW >= 3400) {
    optimal = 1.50;
    msg = `🖥️ 偵測到 4K 超高解析度螢幕 (${screenW}px)！已自動套用 150% 最佳清晰黃金比例！`;
  } else if (screenW >= 2400) {
    optimal = 1.25;
    msg = `🖥️ 偵測到 2K / QHD 螢幕 (${screenW}px)！已自動套用 125% 舒適比例！`;
  } else if (dpr >= 1.75 && screenW >= 1800) {
    optimal = 1.15;
    msg = `🖥️ 偵測到高 DPI 視網膜螢幕，已自動微調至 115% 舒適比例！`;
  }

  applyDisplayScale(optimal, true);
  if (typeof window.alert === 'function') {
    try { window.alert(msg); } catch {}
  }
  return optimal;
}

// 手機直式專用閱讀設定抽屜控制
export function openReadingDrawer() {
  const drawer = document.querySelector('.reading-drawer-overlay');
  if (drawer) {
    if (!isDrawerOpen) drawerTrigger = document.activeElement;
    isDrawerOpen = true;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    backgroundStates = [...document.querySelectorAll('.shell, .mobile-bottom-nav')].map(el => [el, el.inert]);
    backgroundStates.forEach(([el]) => { el.inert = true; });
    document.body.classList.add('reading-drawer-open');
    drawer.querySelector('button')?.focus();
  }
}

export function closeReadingDrawer() {
  isDrawerOpen = false;
  const drawer = document.querySelector('.reading-drawer-overlay');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
  }
  backgroundStates.forEach(([el, inert]) => { el.inert = inert; });
  backgroundStates = [];
  document.body.classList.remove('reading-drawer-open');
  drawerTrigger?.focus?.();
}

export function toggleReadingDrawer() {
  if (isDrawerOpen) {
    closeReadingDrawer();
  } else {
    openReadingDrawer();
  }
}

// 產生頂部通用顯示與字體縮放工具列 HTML
export function renderDisplayToolbar(pageTitle = '108 課綱英語全學年教育平台') {
  if (!isInitialized) initDisplaySettings();

  return `
    <header class="top-utility-bar" role="toolbar" aria-label="顯示與字體縮放設定">
      <div class="top-utility-left">
        <span class="top-utility-badge">🖥️ 視圖與閱讀優化</span>
        <span class="top-utility-title">English Quest · ${pageTitle}</span>
      </div>

      <div class="top-utility-right">
        <!-- 色彩風格主題切換組 -->
        <div class="theme-control-group" role="group" aria-label="閱讀色彩模式">
          <span class="toolbar-section-label">🎨 舒適色調:</span>
          <div class="theme-pills">
            ${THEMES.map(t => `
              <button class="theme-pill ${t.id === currentTheme ? 'active' : ''}"
                aria-pressed="${t.id === currentTheme}" data-set-theme="${t.id}" title="${t.desc}" aria-label="${t.name}">
                <span class="theme-pill-icon">${t.icon}</span>
                <span class="theme-pill-name">${t.name.split(' ')[1]}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 字體大小調整控制組 -->
        <div class="font-scale-control-group">
          <span class="font-scale-label">🔤 字體大小:</span>
          <button class="font-step-btn" data-scale-step="-1" title="縮小字體 (快捷鍵: [ )" aria-label="縮小字體">A-</button>
          
          <div class="scale-pills" role="group" aria-label="字體縮放預設檔位">
            ${SCALE_PRESETS.map(p => `
              <button class="scale-pill ${Math.abs(p.scale - currentScale) < 0.04 ? 'active' : ''}"
                aria-pressed="${Math.abs(p.scale - currentScale) < 0.04}" data-set-scale="${p.scale}" title="${p.desc}">
                ${p.label}
              </button>
            `).join('')}
          </div>

          <button class="font-step-btn" data-scale-step="1" title="放大字體 (快捷鍵: ] )" aria-label="放大字體">A+</button>
          <span class="current-scale-text" style="font-size:12px;font-weight:700;color:var(--green-core);min-width:38px;text-align:center">${Math.round(currentScale * 100)}%</span>
        </div>

        <!-- 行距調整控制組 -->
        <div class="line-height-control-group">
          <span class="toolbar-section-label">📏 行距:</span>
          <div class="line-height-pills" role="group" aria-label="行距密度">
            ${LINE_HEIGHTS.map(lh => `
              <button class="line-height-pill ${lh.id === currentLineHeight ? 'active' : ''}"
                aria-pressed="${lh.id === currentLineHeight}" data-set-line-height="${lh.id}" title="${lh.desc}">
                ${lh.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 4K 智慧適配按鈕 -->
        <button class="btn small quiet autofit-4k-btn" data-auto-4k="true" title="一鍵智慧檢測目前螢幕解析度並切換最佳比例" style="display:flex;align-items:center;gap:4px">
          <span>🖥️</span> 4K適配
        </button>

        <!-- 閱讀寬度切換按鈕 -->
        <button class="btn small quiet width-toggle-btn" data-toggle-width="true" title="切換閱讀版面寬度 (快捷鍵: Alt+W)" style="display:flex;align-items:center;gap:4px">
          <span>${currentReadingWidth === 'wide' ? '↔️' : '📖'}</span>
          <span>${currentReadingWidth === 'wide' ? '寬屏模式' : '專注寬度 (850px)'}</span>
        </button>
      </div>
    </header>
  `;
}

// 產生手機直式滑出式閱讀排版抽屜面板 (Mobile Bottom Sheet Drawer)
export function renderReadingDrawer(pageTitle = '閱讀設定') {
  return `
    <div class="reading-drawer-overlay ${isDrawerOpen ? 'open' : ''}" data-close-reading-drawer="true" aria-hidden="${!isDrawerOpen}">
      <div class="reading-drawer-sheet" role="dialog" aria-modal="true" aria-label="閱讀排版與快適色調設定">
        <div class="drawer-header">
          <div class="drawer-title-block">
            <span class="drawer-title-icon">📖</span>
            <h3>閱讀舒適排版與顯示設定</h3>
          </div>
          <button class="drawer-close-btn" data-close-reading-drawer="true" aria-label="關閉設定面板">✕</button>
        </div>

        <div class="drawer-content">
          <!-- 1. 色彩主題 -->
          <div class="drawer-section">
            <div class="drawer-section-title">
              <span>🎨 閱讀色調模式</span>
              <small>依環境與偏好選擇</small>
            </div>
            <div class="drawer-theme-grid">
              ${THEMES.map(t => `
                <button class="drawer-theme-card ${t.id === currentTheme ? 'active' : ''}" aria-pressed="${t.id === currentTheme}" data-set-theme="${t.id}">
                  <span class="theme-card-icon">${t.icon}</span>
                  <strong class="theme-card-name">${t.name.split(' ')[1]}</strong>
                  <span class="theme-card-desc">${t.desc.split('(')[0]}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 2. 字體大小 -->
          <div class="drawer-section">
            <div class="drawer-section-title">
              <span>🔤 字體縮放大小</span>
              <strong class="current-scale-text" style="color:var(--green-core)">${Math.round(currentScale * 100)}%</strong>
            </div>
            <div class="drawer-scale-row">
              <button class="font-step-btn-large" data-scale-step="-1" aria-label="縮小字體">A-</button>
              <div class="drawer-scale-pills">
                ${SCALE_PRESETS.map(p => `
                  <button class="scale-pill ${Math.abs(p.scale - currentScale) < 0.04 ? 'active' : ''}"
                    aria-pressed="${Math.abs(p.scale - currentScale) < 0.04}" data-set-scale="${p.scale}">
                    ${p.label.split(' ')[1]}
                  </button>
                `).join('')}
              </div>
              <button class="font-step-btn-large" data-scale-step="1" aria-label="放大字體">A+</button>
            </div>
          </div>

          <!-- 3. 行距與版寬 -->
          <div class="drawer-section">
            <div class="drawer-section-title">
              <span>📏 行距呼吸感</span>
            </div>
            <div class="drawer-lh-row">
              ${LINE_HEIGHTS.map(lh => `
                <button class="line-height-pill-large ${lh.id === currentLineHeight ? 'active' : ''}"
                  aria-pressed="${lh.id === currentLineHeight}" data-set-line-height="${lh.id}">
                  ${lh.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 4. 版面寬度與適配 -->
          <div class="drawer-section drawer-actions-row">
            <button class="btn secondary width-toggle-btn" data-toggle-width="true" style="flex:1">
              <span>${currentReadingWidth === 'wide' ? '↔️ 寬屏模式' : '📖 專注寬度 (850px)'}</span>
            </button>
            <button class="btn secondary autofit-4k-btn" data-auto-4k="true" style="flex:1">
              <span>🖥️ 4K智慧適配</span>
            </button>
          </div>
        </div>

        <div class="drawer-footer">
          <button class="btn primary full-width" data-close-reading-drawer="true" style="width:100%;min-height:44px;font-weight:700">
            完成並返回閱讀
          </button>
        </div>
      </div>
    </div>
  `;
}

// 處理工具列與抽屜點擊事件
export function handleDisplayToolbarClick(target, renderCallback) {
  const d = target.dataset;
  if (!d) return false;

  // 設定主題色彩
  if (d.setTheme !== undefined) {
    applyTheme(d.setTheme, true);

    return true;
  }

  // 設定特定縮放檔位
  if (d.setScale !== undefined) {
    const scale = parseFloat(d.setScale);
    applyDisplayScale(scale, true);

    return true;
  }

  // 步進放大/縮小
  if (d.scaleStep !== undefined) {
    const step = parseInt(d.scaleStep, 10);
    stepScale(step);

    return true;
  }

  // 設定行距
  if (d.setLineHeight !== undefined) {
    applyLineHeight(d.setLineHeight, true);

    return true;
  }

  // 4K 智慧適配
  if (d.auto4k) {
    autoDetect4K();

    return true;
  }

  // 切換閱讀寬度
  if (d.toggleWidth) {
    toggleWidth();

    return true;
  }

  // 切換抽屜面板
  if (d.toggleReadingDrawer) {
    toggleReadingDrawer();
    return true;
  }

  // 關閉抽屜面板
  if (d.closeReadingDrawer) {
    closeReadingDrawer();
    return true;
  }

  return false;
}
