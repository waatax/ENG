// Browser verification for the 2026-10-30 round-2 learning features. Usage: node scripts/qa_feedback_diagnosis.cjs
// Covers: why-your-answer diagnosis, passage evidence, spoken feedback content, 聽題模式, unit phrasebook, repair tile, dark mode.
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.resolve('dist'), out = process.env.EQ_QA_OUT || 'docs/redesign/verification/learn20261030/browser'; fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html;charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.mp3': 'audio/mpeg' };
const server = http.createServer((req, res) => {
  let p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); });
});
const KEY = 'english-quest-game-v2';
// A fake voice engine: records what would be spoken and finishes each utterance at once.
const fakeSpeech = () => {
  window.__spoken = [];
  const voices = [{ name: 'Fake US', lang: 'en-US' }, { name: 'Fake TW', lang: 'zh-TW' }];
  const synth = { speaking: false, getVoices: () => voices, cancel() {}, speak(u) { window.__spoken.push(u.text); setTimeout(() => u.onend && u.onend(), 0); } };
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = function (text) { this.text = text; };
  HTMLMediaElement.prototype.play = function () { setTimeout(() => this.onended && this.onended(), 0); return Promise.resolve(); };
};
(async () => {
  const dir = 'dist/quest/course/', index = JSON.parse(fs.readFileSync(dir + 'index.json', 'utf8'));
  const items = {}; for (const t of [...index.sections, ...index.branches]) Object.assign(items, JSON.parse(fs.readFileSync(dir + t.id + '.json', 'utf8')).items);
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://localhost:' + server.address().port + '/quest/';
  const launcher = await chromium.launchServer({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const browser = await chromium.connect(launcher.wsEndpoint());
  const checks = [], errors = [], samples = {};
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.setDefaultTimeout(15000);
    await page.addInitScript(fakeSpeech);
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    const state = () => page.evaluate(k => JSON.parse(localStorage.getItem(k) || '{}'), KEY);
    const session = async () => (await state()).session;
    const spoken = () => page.evaluate(() => window.__spoken.slice());
    const clearSpoken = () => page.evaluate(() => { window.__spoken.length = 0; });
    const noOverflow = async label => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'overflow: ' + label);
    async function answer(wrong) {
      const s = await session(); if (!s) return null;
      if (s.feedback) { await page.locator('#go').click(); return 'next'; }
      const it = items[s.queue[s.index]] || {};
      if (it.type === 'info' || it.type === 'line' || !it.type) { await page.locator('#go').click(); return 'info'; }
      if (it.type === 'choice' || it.type === 'listen') {
        const opts = page.locator('.opt'), n = await opts.count();
        for (let i = 0; i < n; i++) { const v = await opts.nth(i).getAttribute('data-v'); if ((v === it.answer) !== wrong) { await opts.nth(i).click(); break; } }
        await page.locator('#go').click();
      } else if (it.type === 'build') {
        const words = it.answer.split(' '), order = wrong && words.length > 2 ? [words[0], words[2], words[1], ...words.slice(3)] : words;
        for (const w of order) await page.locator('.bank .tok:not([disabled])', { hasText: new RegExp(`^${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }).first().click();
        await page.locator('#go').click();
      } else if (it.type === 'input') { await page.locator('#answer').fill(wrong ? it.answer.slice(0, -1) + (it.answer.endsWith('x') ? 'y' : 'x') : it.answer); await page.locator('#answer').press('Enter'); }
      else if (it.type === 'match') for (let i = 0; i < it.pairs.length; i++) { await page.locator(`[data-act="mL"][data-i="${i}"]`).click(); await page.locator(`[data-act="mR"][data-i="${i}"]`).click(); }
      await page.locator('.check.ok, .check.bad').waitFor();
      return it;
    }
    async function finish() { for (let g = 0; g < 80 && await session(); g++) await answer(false); await page.locator('.result').waitFor(); }
    async function leaveResult() { for (let i = 0; i < 3; i++) { const b = page.locator('[data-act="streak-ok"], [data-act="done"]'); if (await b.count()) await b.first().click(); else break; } await page.locator('.path, .page-head').first().waitFor(); }
    async function openNode(id) { await page.locator(`[data-act="pop"][data-id="${id}"]`).click(); await page.locator(`.pop [data-act="start"][data-id="${id}"]`).click(); await page.locator('.lesson-screen').waitFor(); }

    await page.goto(base);
    await page.evaluate(() => localStorage.clear()); await page.reload();
    await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-why"][data-id="school"]').click(); await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-goal"][data-id="casual"]').click(); await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-start"][data-id="s1"]').click();
    await page.locator('.path').waitFor();

    // 1. Wrong answers explain the learner's own choice, and the spoken feedback says the same thing.
    await openNode('u1:q1');
    let diag = null;
    for (let g = 0; g < 30 && !diag; g++) {
      const s = await session(); if (!s) break;
      await clearSpoken();
      const it = await answer(!s.feedback);
      if (it && typeof it === 'object' && await page.locator('.check.bad .diagnosis').count()) {
        diag = { prompt: it.prompt, answer: it.answer, text: await page.locator('.diagnosis').innerText() };
        await page.waitForTimeout(200);
        const said = (await spoken()).join(' ');
        assert.match(said, /錯在哪裡/, 'auto narration includes the diagnosis');
        assert.equal(await page.locator('.check.bad .correction-tip').count(), 0, 'generic tip hidden when a specific diagnosis exists');
        await noOverflow('diagnosis 390'); await page.screenshot({ path: `${out}/diagnosis-wrong-390.png` });
        await page.emulateMedia({ colorScheme: 'dark' }); await page.screenshot({ path: `${out}/diagnosis-wrong-dark-390.png` });
        const contrast = await page.evaluate(() => { const el = document.querySelector('.diagnosis'), cs = getComputedStyle(el); return [cs.color, cs.backgroundColor]; });
        samples.darkDiagnosisColors = contrast; await page.emulateMedia({ colorScheme: 'light' });
        await clearSpoken(); await page.locator('[data-act="explain-say"]').click(); await page.waitForTimeout(200);
        assert.match((await spoken()).join(' '), /錯在哪裡/, 'explain button narrates the diagnosis');
      }
    }
    assert.ok(diag, 'a diagnosis appeared in the first lesson'); samples.diagnosis = diag;
    checks.push('wrong answer shows 🔍 錯在哪裡 and the narration reads it (light/dark, 390px)');

    // 2. The repair round counts toward 訂正成功 on the results screen.
    await finish();
    if (await page.locator('[data-act="streak-ok"]').count()) await page.locator('[data-act="streak-ok"]').click(); // first lesson of the day shows the streak screen first
    const tile = await page.locator('.tile.fixed').innerText(); samples.repairTile = tile;
    assert.match(tile, /訂正成功[\s\S]*\d+\/\d+/); await page.locator('.repair-win').waitFor();
    await page.screenshot({ path: `${out}/result-repair-390.png` });
    checks.push('results show 訂正成功 n/m and a growth message after repaired mistakes');
    await leaveResult();

    // 3. Reading items cite the passage sentence (seed earlier nodes as done so the unit's grammar node is open).
    await page.evaluate(([k, ids]) => { const s = JSON.parse(localStorage.getItem(k)); for (const id of ids) s.nodes[id] ||= { n: 1 }; localStorage.setItem(k, JSON.stringify(s)); }, [KEY, ['u1:q1', 'u1:q2', 'u1:q3', 'u1:q4', 'g3-s1-u1:word']]);
    await page.reload(); await page.locator('.path').waitFor();
    let evidence = null;
    for (let round = 0; round < 6 && !evidence; round++) {
      await openNode('g3-s1-u1:grammar');
      for (let g = 0; g < 60 && await session(); g++) {
        const s = await session(); const it = items[s.queue[s.index]];
        const r = await answer(!s.feedback && !!it?.passage);
        if (r && typeof r === 'object' && r.passage && await page.locator('.check .evidence').count()) { evidence = { prompt: r.prompt, text: await page.locator('.evidence').innerText(), diagnosis: await page.locator('.diagnosis').count() ? await page.locator('.diagnosis').innerText() : '' }; await page.screenshot({ path: `${out}/evidence-390.png` }); }
      }
      await page.locator('.result').waitFor(); await leaveResult();
    }
    assert.ok(evidence, 'a passage item showed 原文線索'); samples.evidence = evidence;
    checks.push('reading item shows 📖 原文線索 with the passage sentence');

    // 4. 聽題模式 is off by default, and once on it reads each new question and its options.
    await page.goto(base + '#profile'); await page.locator('[data-set="readq"]').waitFor();
    assert.equal(await page.locator('[data-set="readq"]').isChecked(), false);
    await page.locator('[data-set="readq"]').check(); assert.equal((await state()).profile.readq, true);
    await page.goto(base + '#learn'); await page.locator('.path').waitFor();
    await clearSpoken(); await openNode('u1:q1');
    for (let g = 0; g < 60 && !samples.readAloud; g++) {
      await page.waitForTimeout(250);
      const s = await session(); if (!s) break;
      const it = items[s.queue[s.index]];
      if (!s.feedback && ['choice', 'build'].includes(it?.type) && !it.audio) {
        const said = (await spoken()).join(' ');
        assert.ok(said.includes(it.prompt.slice(0, 4)), 'read-aloud speaks the prompt');
        if (it.options) assert.match(said, /選項 1/, 'read-aloud speaks the options');
        samples.readAloud = { prompt: it.prompt, said: said.slice(0, 160) };
      }
      await clearSpoken(); await answer(false);
    }
    assert.ok(samples.readAloud, 'a text choice question was read aloud');
    checks.push('聽題模式 toggle saves and reads a text question with its options aloud');
    await finish(); await leaveResult();

    // 5. Each unit lab lists its 10% phrasebook with per-line and play-all narration.
    await page.goto(base + '#learn'); await page.locator('.path').waitFor();
    await page.locator('[data-act="lab"][data-id="g3-s1-u1"]').click(); await page.locator('.lab-phrases').waitFor();
    const nPhrases = await page.locator('.lab-phrases li').count(), nCards = await page.locator('.lab-card').count();
    assert.equal(nPhrases, nCards, 'phrasebook size equals the 10% card count');
    await clearSpoken(); await page.locator('.lab-phrases .btn.gold').click(); await page.waitForTimeout(300);
    assert.ok((await spoken()).length > 1, 'play-all speaks Chinese and English chunks');
    samples.phrasebook = { phrases: nPhrases, first: await page.locator('.lab-phrases li').first().innerText() };
    for (const width of [320, 390, 1280]) { await page.setViewportSize({ width, height: 900 }); await noOverflow('phrasebook ' + width); await page.locator('.lab-phrases').screenshot({ path: `${out}/phrasebook-${width}.png` }); }
    checks.push('unit lab phrasebook: count matches 10%, play-all narration, no overflow at 320/390/1280');
  } catch (e) { errors.push(String(e && e.stack || e)); }
  await browser.close(); await launcher.close(); server.close();
  const report = { date: '2026-10-30', version: 'learn20261030', checks, samples, errors };
  fs.writeFileSync(`${out}/feedback-diagnosis.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  process.exit(errors.length ? 1 : 0);
})();
