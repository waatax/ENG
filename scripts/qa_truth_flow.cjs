// Real-browser flow for the flashcard studio and the unit booster. Usage: node scripts/qa_truth_flow.cjs [outDir]
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path');
const root = path.resolve('dist'), out = process.argv[2] || 'docs/redesign/verification/truth20261105/flow';
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html;charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/json' };
const server = http.createServer((req, res) => {
  let p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); });
});
const fakeSpeech = () => {
  const voices = [{ name: 'Fake US', lang: 'en-US' }, { name: 'Fake TW', lang: 'zh-TW' }];
  Object.defineProperty(window, 'speechSynthesis', { value: { speaking: false, getVoices: () => voices, cancel() {}, speak(u) { setTimeout(() => u.onend && u.onend(), 0); }, addEventListener() {}, removeEventListener() {} }, configurable: true });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; };
};
// Worst text contrast inside a container, computed from the colours the browser actually uses.
const contrastAudit = sel => {
  const lum = c => { const v = c.map(x => { x /= 255; return x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }); return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]; };
  const rgb = s => { const m = s.match(/[\d.]+/g).map(Number); return { c: m.slice(0, 3), a: m[3] ?? 1 }; };
  const bgOf = el => { for (let e = el; e; e = e.parentElement) { const b = rgb(getComputedStyle(e).backgroundColor); if (b.a > .9) return b.c; } return [255, 255, 255]; };
  const fails = []; let checked = 0;
  for (const box of document.querySelectorAll(sel)) for (const el of box.querySelectorAll('*')) {
    if (![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const st = getComputedStyle(el);
    if (st.visibility === 'hidden' || st.display === 'none' || !el.getClientRects().length || el.disabled || el.closest('[aria-hidden="true"]')) continue;
    const a = lum(rgb(st.color).c), b = lum(bgOf(el)), ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05); checked++;
    if (ratio < 4.5) fails.push({ text: el.textContent.trim().slice(0, 24), ratio: +ratio.toFixed(2), cls: String(el.className).slice(0, 30) });
  }
  return { checked, fails: fails.slice(0, 15), failCount: fails.length };
};
const tapAudit = sel => [...document.querySelectorAll(sel + ' button:not([disabled]),' + sel + ' a.btn,' + sel + ' input')].filter(e => e.getClientRects().length).map(e => ({ t: (e.textContent || e.id).trim().slice(0, 20), h: Math.round(e.getBoundingClientRect().height) })).filter(x => x.h < 40);
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://localhost:' + server.address().port + '/';
  const browser = await chromium.launch({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const checks = [], errors = [];
  const check = (name, ok, detail = '') => { checks.push({ name, ok: !!ok, detail }); if (!ok) console.log('FAIL', name, String(detail).slice(0, 500)); };
  try {
    for (const [w, h, scheme] of [[320, 640, 'light'], [390, 844, 'light'], [390, 844, 'dark'], [768, 1024, 'light'], [1280, 800, 'light'], [1280, 800, 'dark']]) {
      const tag = `${w}-${scheme}`;
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, serviceWorkers: 'block', hasTouch: w < 768 });
      const page = await ctx.newPage();
      page.on('pageerror', e => errors.push(tag + ': ' + e.message));
      await page.addInitScript(fakeSpeech);
      await page.goto(base + '#flashcards');
      await page.waitForSelector('.recall-studio', { timeout: 30000 });
      const over = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      check(`${tag} intro no overflow`, !(await over()));
      const c1 = await page.evaluate(contrastAudit, '.fcx');
      check(`${tag} intro contrast`, c1.failCount === 0, JSON.stringify(c1));
      const t1 = await page.evaluate(tapAudit, '.fcx');
      check(`${tag} tap targets`, t1.length === 0, JSON.stringify(t1.slice(0, 8)));
      await page.screenshot({ path: path.join(out, `intro-${tag}.png`) });
      if (w >= 769) check(`${tag} one navigation`, await page.locator('.platform-nav').isHidden());
      // Produce mode: wrong spelling, explanation, retry, cannot claim success.
      await page.click('[data-fc-recall="produce"]');
      await page.click('[data-fc-recall="start"]');
      const inView = await page.evaluate(() => { const r = document.querySelector('#fc-recall-answer').getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; });
      check(`${tag} answer box in first screen`, inView);
      await page.screenshot({ path: path.join(out, `produce-${tag}.png`) });
      await page.click('[data-fc-recall="hint"]');
      check(`${tag} hint shows`, await page.locator('.fcx-hint').isVisible());
      await page.fill('#fc-recall-answer', 'famly');
      await page.keyboard.press('Enter');
      await page.waitForSelector('.recall-answer');
      check(`${tag} letter diff`, await page.locator('.sp-missing').count() === 1);
      check(`${tag} miss blocks good`, await page.locator('[data-fc-recall="good"]').isDisabled());
      check(`${tag} why shown`, /少了字母|默音|為什麼/.test(await page.locator('.recall-diagnosis').innerText()));
      await page.fill('#fc-recall-retry', 'family'); await page.keyboard.press('Enter');
      await page.waitForSelector('.fcx-retry-ok');
      check(`${tag} answer no overflow`, !(await over()));
      const c2 = await page.evaluate(contrastAudit, '.fcx');
      check(`${tag} answer contrast`, c2.failCount === 0, JSON.stringify(c2));
      await page.screenshot({ path: path.join(out, `answer-${tag}.png`), fullPage: true });
      await page.keyboard.press('1');
      await page.waitForSelector('#fc-recall-answer');
      check(`${tag} key 1 rates`, (await page.locator('.recall-progress').innerText()).includes('第 2 /'));
      await page.click('[data-fc-recall="reveal"]'); await page.keyboard.press('2');
      await page.click('[data-fc-recall="end"]');
      // Browse card, including the flip.
      await page.locator('[data-fc-flip="true"]').first().click();
      await page.waitForSelector('.fc-back:not([inert])');
      check(`${tag} browse no overflow`, !(await over()));
      const c3 = await page.evaluate(contrastAudit, '.fcx');
      check(`${tag} browse contrast`, c3.failCount === 0, JSON.stringify(c3));
      await page.locator('.fc-back').scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(out, `browse-back-${tag}.png`) });
      await ctx.close();
    }
    // Smart mode: a new word starts as recognition; state survives a reload.
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push('smart: ' + e.message));
    await page.addInitScript(fakeSpeech);
    await page.goto(base + '#flashcards'); await page.waitForSelector('.recall-studio');
    await page.click('[data-fc-recall="start"]');
    check('smart starts with recognition', await page.locator('.fcx-reveal').isVisible());
    for (let i = 0; i < 10; i++) { await page.keyboard.press(' '); await page.waitForSelector('.recall-answer'); await page.keyboard.press(i === 1 ? '1' : '2'); await page.waitForTimeout(30); }
    await page.waitForSelector('.recall-finish');
    check('summary lists misses', await page.locator('.fcx-miss-list li').count() === 1);
    await page.screenshot({ path: path.join(out, 'summary-390.png') });
    await page.click('[data-fc-recall="repair"]');
    check('repair round', (await page.locator('.recall-progress').innerText()).includes('再練一輪'));
    await page.reload(); await page.waitForSelector('.recall-studio');
    check('daily progress persists', (await page.locator('.fcx-ring b').innerText()) === '10');
    await ctx.close();
    // Booster, mounted on a bare page so the check does not depend on game progress.
    const units = fs.existsSync('dist/quest/boost') ? fs.readdirSync('dist/quest/boost').map(f => f.replace('.json', '')) : [];
    if (units.length) {
      const unit = units[0], items = JSON.parse(fs.readFileSync(`dist/quest/boost/${unit}.json`, 'utf8'));
      const c2 = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
      const p = await c2.newPage();
      p.on('pageerror', e => errors.push('boost: ' + e.message));
      await p.addInitScript(fakeSpeech);
      await p.route('**/boost_probe.html', r => r.fulfill({ contentType: 'text/html', body: `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="quest.css"><div data-boost-unit="${unit}" class="unit-boost" hidden></div><script type="module">import {mountBoosts} from './boost.mjs';mountBoosts(document,'t');</script>` }));
      await p.goto(base + 'quest/boost_probe.html');
      await p.waitForSelector('[data-boost="start"]');
      await p.click('[data-boost="start"]');
      const prompt = await p.locator('.boost-prompt').innerText();
      const text = await p.locator('.boost-text').innerText().catch(() => '');
      const it = items.find(x => x.prompt === prompt && (!x.text || x.text === text)) || items[0];
      const wrong = it.options.find(o => o !== it.answer);
      await p.locator('.boost-opt').filter({ hasText: wrong }).first().click();
      const fb = await p.locator('.boost-feedback').innerText();
      check('booster explains the chosen wrong option', fb.includes(it.wrong[wrong].slice(0, 8)), fb.slice(0, 80));
      await p.screenshot({ path: path.join(out, 'boost-wrong-390.png'), fullPage: true });
      check('booster no overflow', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      await c2.close();
    }
  } finally { await browser.close(); server.close(); }
  check('no page errors', errors.length === 0, errors.join(' | '));
  fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify({ passed: checks.filter(c => c.ok).length, total: checks.length, checks }, null, 1));
  console.log(`checks ${checks.filter(c => c.ok).length}/${checks.length}`);
  process.exitCode = checks.every(c => c.ok) ? 0 : 1;
})().catch(e => { console.error(e); process.exit(1); });
