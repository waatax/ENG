// display_settings.mjs - 4K 螢幕自適應、動態字體縮放與全線 UI/UX 顯示控制模組
// 支援 4K (3840x2160) 100% 縮放最佳化、多檔位字體無損縮放、寬屏模式切換與本地持久化

export const SCALE_PRESETS = [
  { scale: 1.0, label: '標準 100%', desc: '適合 1080p 一般筆電螢幕' },
  { scale: 1.15, label: '舒適 115%', desc: '適合 2K / 1440p 或大螢幕閱讀' },
  { scale: 1.30, label: '大字 130%', desc: '字體清晰大氣，長時間閱讀不疲勞' },
  { scale: 1.50, label: '4K特大 150%', desc: '4K (3840x2160) 100% 顯示黃金比例' },
  { scale: 1.75, label: '4K巨屏 175%', desc: '適合 4K 大尺寸螢幕、投影或高可讀性' }
];

const SCALE_STEPS = [0.9, 1.0, 1.15, 1.30, 1.50, 1.75, 2.0];

let currentScale = 1.0;
let currentReadingWidth = 'standard'; // 'standard' | 'wide'
let isInitialized = false;

// 初始化設定 (自動讀取 LocalStorage 或智慧偵測 4K 螢幕)
export function initDisplaySettings() {
  if (typeof window === 'undefined') return;

  try {
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

    const savedWidth = localStorage.getItem('eq_reading_width');
    if (savedWidth) {
      currentReadingWidth = savedWidth;
    }
  } catch {
    currentScale = 1.0;
  }

  applyDisplayScale(currentScale, false);
  applyReadingWidth(currentReadingWidth);
  isInitialized = true;
}

// 套用顯示與字體縮放 (採用 CSS zoom 與 CSS 變數雙重驅動)
export function applyDisplayScale(scale, save = true) {
  currentScale = Math.min(2.2, Math.max(0.85, Math.round(scale * 100) / 100));

  if (save) {
    try {
      localStorage.setItem('eq_display_scale', currentScale.toString());
    } catch {}
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    // 1. 設定標準 CSS zoom (現代 Chrome、Edge、Safari、Firefox 126+ 原生向量清晰無損縮放)
    document.documentElement.style.zoom = currentScale;

    // 2. 設定 CSS 變數供相對尺寸精算
    document.documentElement.style.setProperty('--app-scale', currentScale);
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
      } else {
        p.classList.remove('active');
      }
    });
  }
}

// 套用閱讀寬度切換 (寬屏模式 vs 居中專注模式)
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
  }
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
  alert(msg);
  return optimal;
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
        <!-- 字體大小調整控制組 -->
        <div class="font-scale-control-group">
          <span class="font-scale-label">🔤 字體大小:</span>
          <button class="font-step-btn" data-scale-step="-1" title="縮小字體 (Alt + -)" aria-label="縮小字體">A-</button>
          
          <div class="scale-pills" role="radiogroup" aria-label="字體縮放預設檔位">
            ${SCALE_PRESETS.map(p => `
              <button class="scale-pill ${Math.abs(p.scale - currentScale) < 0.04 ? 'active' : ''}"
                data-set-scale="${p.scale}" title="${p.desc}">
                ${p.label}
              </button>
            `).join('')}
          </div>

          <button class="font-step-btn" data-scale-step="1" title="放大字體 (Alt + +)" aria-label="放大字體">A+</button>
          <span class="current-scale-text" style="font-size:12px;font-weight:700;color:#047857;min-width:38px;text-align:center">${Math.round(currentScale * 100)}%</span>
        </div>

        <!-- 4K 智慧適配按鈕 -->
        <button class="btn small quiet autofit-4k-btn" data-auto-4k="true" title="一鍵智慧檢測目前螢幕解析度並切換最佳比例" style="display:flex;align-items:center;gap:4px">
          <span>🖥️</span> 4K智慧適配
        </button>

        <!-- 閱讀寬度切換按鈕 -->
        <button class="btn small quiet width-toggle-btn" data-toggle-width="true" title="切換 4K 螢幕下的閱讀版面寬度 (寬屏全覽 / 居中專注)" style="display:flex;align-items:center;gap:4px">
          <span>${currentReadingWidth === 'wide' ? '↔️' : '📖'}</span>
          <span>${currentReadingWidth === 'wide' ? '寬屏模式' : '專注寬度'}</span>
        </button>
      </div>
    </header>
  `;
}

// 處理工具列點擊事件
export function handleDisplayToolbarClick(target, renderCallback) {
  const d = target.dataset;

  // 設定特定縮放檔位
  if (d.setScale !== undefined) {
    const scale = parseFloat(d.setScale);
    applyDisplayScale(scale, true);
    if (typeof renderCallback === 'function') renderCallback();
    return true;
  }

  // 步進放大/縮小
  if (d.scaleStep !== undefined) {
    const step = parseInt(d.scaleStep, 10);
    let nearestIdx = 1;
    let minDiff = 999;
    SCALE_STEPS.forEach((s, idx) => {
      const diff = Math.abs(s - currentScale);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = idx;
      }
    });

    const nextIdx = Math.max(0, Math.min(SCALE_STEPS.length - 1, nearestIdx + step));
    applyDisplayScale(SCALE_STEPS[nextIdx], true);
    if (typeof renderCallback === 'function') renderCallback();
    return true;
  }

  // 4K 智慧適配
  if (d.auto4k) {
    autoDetect4K();
    if (typeof renderCallback === 'function') renderCallback();
    return true;
  }

  // 切換閱讀寬度
  if (d.toggleWidth) {
    const nextMode = currentReadingWidth === 'wide' ? 'standard' : 'wide';
    applyReadingWidth(nextMode);
    if (typeof renderCallback === 'function') renderCallback();
    return true;
  }

  return false;
}
