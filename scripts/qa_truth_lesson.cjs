// Wrong-answer panel in a real lesson: screenshot and whether the Continue button stays reachable. Usage: node scripts/qa_truth_lesson.cjs [outDir]
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path');
const root = path.resolve('dist'), out = process.argv[2] || 'docs/redesign/verification/truth20261105/lesson';
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html;charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!p.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); });
});
const KEY = 'english-quest-game-v2';
(async () => {
  const dir = 'dist/quest/course/', index = JSON.parse(fs.readFileSync(dir + 'index.json', 'utf8'));
  const items = {}; for (const t of [...index.sections, ...index.branches]) Object.assign(items, JSON.parse(fs.readFileSync(dir + t.id + '.json', 'utf8')).items);
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://localhost:' + server.address().port + '/quest/';
  const browser = await chromium.launch({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const report = [];
  for (const [w, h, scheme] of [[390, 844, 'light'], [390, 844, 'dark'], [1280, 800, 'light']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    await page.goto(base);
    await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-why"][data-id="school"]').click(); await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-goal"][data-id="casual"]').click(); await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-start"][data-id="s1"]').click();
    await page.locator('.path').waitFor();
    await page.locator('[data-act="pop"][data-id="u1:q1"]').click();
    await page.locator('.pop [data-act="start"][data-id="u1:q1"]').click();
    await page.locator('.lesson-screen').waitFor();
    for (let g = 0; g < 30; g++) {
      const s = await page.evaluate(k => JSON.parse(localStorage.getItem(k) || '{}').session, KEY);
      if (!s) break;
      if (s.feedback) { await page.locator('#go').click(); continue; }
      const it = items[s.queue[s.index]] || {};
      if (it.type === 'choice' || it.type === 'listen') {
        const opts = page.locator('.opt'), n = await opts.count();
        for (let i = 0; i < n; i++) if (await opts.nth(i).getAttribute('data-v') !== it.answer) { await opts.nth(i).click(); break; }
        await page.locator('#go').click();
        await page.locator('.check.bad').waitFor();
        await page.waitForTimeout(150);
        const m = await page.evaluate(() => { const f = document.querySelector('.check'), go = document.querySelector('#go').getBoundingClientRect(), r = f.getBoundingClientRect(); return { panelH: Math.round(r.height), panelScroll: f.scrollHeight, viewH: innerHeight, goBottom: Math.round(go.bottom), goVisible: go.top >= 0 && go.bottom <= innerHeight, position: getComputedStyle(f).position, overflowX: document.documentElement.scrollWidth > innerWidth + 1 }; });
        await page.screenshot({ path: path.join(out, `wrong-${w}-${scheme}.png`) });
        report.push({ w, scheme, ...m, text: (await page.locator('.check').innerText()).slice(0, 260) });
        break;
      }
      await page.locator('#go').click().catch(() => {});
    }
    await ctx.close();
  }
  await browser.close(); server.close();
  console.log(JSON.stringify(report, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
