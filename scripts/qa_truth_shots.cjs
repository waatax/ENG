// Real-browser screenshots for the 2026-11-05 round. Usage: node scripts/qa_truth_shots.cjs <outDir> [filter]
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path');
const root = path.resolve('dist'), out = process.argv[2] || 'docs/redesign/verification/truth20261105/shots', filter = process.argv[3] || '';
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html;charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.mp3': 'audio/mpeg', '.webmanifest': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); });
});
const fakeSpeech = () => {
  const voices = [{ name: 'Fake US', lang: 'en-US' }, { name: 'Fake TW', lang: 'zh-TW' }];
  const synth = { speaking: false, getVoices: () => voices, cancel() {}, speak(u) { setTimeout(() => u.onend && u.onend(), 0); }, addEventListener() {}, removeEventListener() {} };
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (text) { this.text = text; };
};
const viewports = { 320: { width: 320, height: 640 }, 390: { width: 390, height: 844 }, 768: { width: 768, height: 1024 }, 1280: { width: 1280, height: 800 } };
const scenes = [
  ['home', 390, 'light', '#home'],
  ['home', 1280, 'light', '#home'],
  ['flash', 390, 'light', '#flashcards'],
  ['flash', 390, 'dark', '#flashcards'],
  ['flash', 1280, 'light', '#flashcards'],
];
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://localhost:' + server.address().port + '/';
  const browser = await chromium.launch({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const report = [];
  try {
    for (const [name, vw, scheme, hash] of scenes) {
      const label = `${name}-${vw}-${scheme}`;
      if (filter && !label.includes(filter)) continue;
      const ctx = await browser.newContext({ viewport: viewports[vw], colorScheme: scheme, serviceWorkers: 'block', reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.addInitScript(fakeSpeech);
      await page.goto(base + hash);
      await page.waitForTimeout(hash === '#flashcards' ? 2500 : 900);
      await page.screenshot({ path: path.join(out, label + '.png') });
      const m = await page.evaluate(() => {
        const st = document.querySelector('.fc-card-stage');
        return { scrollH: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth > innerWidth + 1, cardTop: st ? Math.round(st.getBoundingClientRect().top + scrollY) : null };
      });
      report.push({ label, ...m, errors });
      await ctx.close();
    }
    // A lesson with a wrong answer, so the feedback panel can be judged by eye.
    for (const vw of [390, 1280]) {
      const label = `lesson-wrong-${vw}`;
      if (filter && !label.includes(filter)) continue;
      const ctx = await browser.newContext({ viewport: viewports[vw], colorScheme: 'light', serviceWorkers: 'block', reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      await page.addInitScript(fakeSpeech);
      await page.goto(base + 'quest/');
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(out, `quest-${vw}.png`) });
      report.push({ label: `quest-${vw}`, text: (await page.evaluate(() => document.body.innerText)).slice(0, 300) });
      await ctx.close();
    }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify(report, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
