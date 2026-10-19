// Browser QA for the 108 課綱 alignment release: every teaching page at phone (dark) and desktop (light) widths.
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path');
const root = path.resolve('dist');
const types = { '.html': 'text/html', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  let p; try { p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); } catch { res.writeHead(400); return res.end(); }
  if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); });
});
const linkOf = key => { const [kind, a, b] = key.split(':'); return kind === 'chapter' ? `#chapter/${a}/${b}` : `#${kind}/${a}`; };

(async () => {
  await new Promise(r => server.listen(8094, '127.0.0.1', r));
  const { ALIGNMENT } = await import('../dist/curriculum_alignment.mjs');
  const keys = Object.keys(ALIGNMENT).filter(k => !k.startsWith('tool:'));
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const report = { date: '2026-10-19', pages: keys.length, runs: [], failures: [] };
  try {
    for (const [width, theme] of [[390, 'dark'], [1280, 'light']]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      page.setDefaultTimeout(15000);
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto('http://localhost:8094/#knowledge');
      await page.evaluate(t => { localStorage.setItem('eq_reading_theme', t); }, theme);
      await page.reload();
      let ok = 0;
      for (const key of keys) {
        const before = errors.length;
        await page.goto('http://localhost:8094/' + linkOf(key));
        await page.locator('.std-card').first().waitFor();
        const r = await page.evaluate(() => ({
          std: document.querySelectorAll('.std-card').length,
          kp: document.querySelectorAll('.kp-summary').length,
          chart: document.querySelectorAll('.ev-figure, .lesson-visual-diagram, .aid-chart, .teaching-aid').length,
          overflow: document.documentElement.scrollWidth - innerWidth,
          theme: document.documentElement.getAttribute('data-theme'),
          h1: document.querySelectorAll('h1').length
        }));
        const problems = [];
        if (r.std !== 1) problems.push(`std-card ×${r.std}`);
        if (r.kp !== 1) problems.push(`kp-summary ×${r.kp}`);
        if (!r.chart) problems.push('no chart');
        if (r.overflow > 1) problems.push(`horizontal overflow ${r.overflow}px`);
        if (r.h1 !== 1) problems.push(`h1 ×${r.h1}`);
        if (errors.length > before) problems.push('errors: ' + errors.slice(before).join(' | '));
        if (problems.length) report.failures.push({ width, key, problems }); else ok++;
      }
      await page.goto('http://localhost:8094/#standards');
      await page.locator('.sm-heatmap').first().waitFor();
      const map = await page.evaluate(() => ({ heat: document.querySelectorAll('.sm-heat').length, overflow: document.documentElement.scrollWidth - innerWidth }));
      if (map.overflow > 1) report.failures.push({ width, key: '#standards', problems: [`horizontal overflow ${map.overflow}px`] });
      await page.screenshot({ path: `QA-standards-map-${width}-2026-10-19.png` });
      for (const [key, name] of [['unit:g3-s1-u1', 'alphabet'], ['knowledge:past-perfect', 'knowledge'], ['knowledge:project-planning-hs', 'gantt']]) {
        await page.goto('http://localhost:8094/' + linkOf(key));
        await page.locator('.std-card').first().waitFor();
        await page.locator('.std-card').first().screenshot({ path: `QA-standards-card-${name}-${width}-2026-10-19.png` });
        const fig = page.locator('.ev-figure').first();
        if (await fig.count()) await fig.screenshot({ path: `QA-standards-chart-${name}-${width}-2026-10-19.png` });
      }
      report.runs.push({ width, theme, pagesPassed: ok, mapHeatCells: map.heat });
      console.log(`${width}px ${theme}: ${ok}/${keys.length} pages passed`);
      await page.close();
    }
  } finally {
    await browser.close(); server.close();
    fs.writeFileSync('QA-CURRICULUM-STANDARDS-2026-10-19.json', JSON.stringify(report, null, 1));
  }
  if (report.failures.length) { console.log(JSON.stringify(report.failures.slice(0, 20), null, 1)); process.exitCode = 1; }
})();
