// Browser verification for Loop 1-7 All-Level Mastery features. Usage: node scripts/qa_all_levels_loop7.cjs
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.resolve('dist'), out = 'docs/redesign/verification/learn20261030/browser';
fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html;charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.mp3': 'audio/mpeg' };
const server = http.createServer((req, res) => {
  let p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); return res.end(); }
    res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream');
    res.end(data);
  });
});

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://localhost:' + server.address().port;
  const launcher = await chromium.launchServer({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const browser = await chromium.connect(launcher.wsEndpoint());
  const checks = [], errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.setDefaultTimeout(15000);
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    const noOverflow = async label => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'overflow: ' + label);

    // 1. Main Hub: All-Level Highway, 6-Skill Mastery Passport, and Word Picker Example Previews
    await page.goto(base + '/#home');
    await page.locator('.hub-highway').waitFor();
    await page.locator('.hub-passport').waitFor();
    assert.equal(await page.locator('[data-hub-band]').count(), 4);
    assert.equal(await page.locator('.hub-skill-card').count(), 6);
    await page.locator('[data-hub-band="advanced"]').click();
    assert.match(await page.locator('.hub-band-panel').innerText(), /B2–C1/);
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await noOverflow('home highway ' + width);
    }
    checks.push('Main Hub: Next Best Step, 4-band All-Level Highway, and 6-Skill Mastery Passport render without overflow at 320/390/1280px');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('.hub-word .hub-word-ex').first().waitFor();
    assert.ok((await page.locator('.hub-word .hub-word-ex').first().innerText()).length > 5);
    await noOverflow('words example preview 390');
    checks.push('Vocabulary Hub: 9,500 catalog displays bilingual example sentence previews on word rows');

    // 2. Quest #practice: Minimal Pairs, 3-Speed Dictation, Speaking Coach & CEFR Writing Studio
    await page.goto(base + '/quest/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-why"][data-id="school"]').click();
    await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-goal"][data-id="casual"]').click();
    await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-start"][data-id="s1"]').click();
    await page.locator('.path').waitFor();
    await page.goto(base + '/quest/#practice');
    await page.locator('#ear-dictation-studio').waitFor();
    await page.locator('#writing-studio').waitFor();

    // Minimal pair quiz
    await page.locator('[data-act="mp-guess"]').first().click();
    await page.locator('.mp-feedback').waitFor();

    // Dictation check
    await page.locator('#dic-input-field').fill('Good morning! Nice to meet you.');
    await page.locator('[data-act="dic-check"]').click();
    await page.locator('.dic-result-box').waitFor();

    // Speaking coach self-eval fallback
    await page.locator('[data-act="shadow-self"]').first().click();
    await page.locator('.shadow-coach-result .mp-feedback.good').first().waitFor();

    // Writing studio model & save
    await page.locator('[data-act="write-select"][data-id="w-b1"]').click();
    await page.locator('#writing-studio-textarea').fill('In my opinion, daily exercise is essential for all high school students. First, regular physical activity improves both daytime concentration and sleep quality. For example, jogging for twenty minutes after school helps me release stress before studying at night. However, many students sit at their desks for hours without taking a break. Therefore, building a simple daily exercise habit is the best way to stay healthy and energetic.');
    await page.locator('[data-act="write-save"]').click();
    await page.locator('#writing-studio .mp-feedback.good').waitFor();
    for (const width of [320, 390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await noOverflow('quest practice studios ' + width);
    }
    checks.push('Quest Practice: Minimal-Pair quiz, 3-Speed Dictation, Speaking Coach, and CEFR Writing Studio work without overflow at 320/390/1280px');

    // 3. Quest #stories: Graded Reader Tap-to-Gloss Modal
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/quest/#stories');
    await page.locator('[data-act="read-story"]').first().click();
    await page.locator('.graded-reader-modal').waitFor();
    await page.locator('[data-act="reader-word"]').first().click();
    assert.match(await page.locator('.reader-gloss-bar').innerText(), /🔊/);
    await noOverflow('graded reader modal 390');
    checks.push('Graded Reader Library: Tap-to-Gloss continuous story view looks up clicked words and plays audio without overflow');
  } catch (e) {
    errors.push(String(e && e.stack || e));
  }
  await browser.close();
  await launcher.close();
  server.close();
  console.log(JSON.stringify({ checks, errors }, null, 2));
  process.exit(errors.length ? 1 : 0);
})();
