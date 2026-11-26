// Run with an existing Playwright installation and Microsoft Edge.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require(process.env.JH_PLAYWRIGHT || 'playwright');

const root = path.resolve('dist');
const output = process.argv[2];
const types = {'.mjs':'text/javascript','.js':'text/javascript','.json':'application/json',
  '.html':'text/html; charset=utf-8','.css':'text/css','.webmanifest':'application/manifest+json'};
const server = http.createServer((req,res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  fs.readFile(file,(err,data) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'}).end(data);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const base = `http://127.0.0.1:${server.address().port}/`;
  let browser;
  try {
    browser = await chromium.launch({channel:'msedge',headless:true,args:['--no-proxy-server']});
    const page = await browser.newPage({viewport:{width:390,height:844},serviceWorkers:'block'});
    page.setDefaultTimeout(15000);
    const errors = [];
    page.on('pageerror',error => errors.push(error.message));
    await page.addInitScript(() => {
      const voice = {lang:'en-US',name:'Test English'};
      Object.defineProperty(window,'speechSynthesis',{value:{getVoices:() => [voice],cancel(){},
        speak(utterance) { setTimeout(() => utterance.onend?.(),20); },addEventListener(){},removeEventListener(){}}});
      window.SpeechSynthesisUtterance = function(text) { this.text = text; };
    });
    if (output) fs.mkdirSync(output,{recursive:true});
    await page.goto(base + '#jh/path');
    await page.waitForSelector('.jh-path');
    assert.equal(await page.locator('.jhp-navigation details').evaluate(el => el.open),false);
    assert.equal(await page.locator('[data-jhp-term]').count(),6);
    assert.equal(await page.locator('[data-jhp-answer]').count(),0);
    await page.click('[data-jhp-options]');
    await page.click('[data-jhp-answer="1"]');
    assert.match(await page.locator('.jhp-feedback').innerText(),/原形 clean/);
    await page.click('[data-jhp-retry]');
    assert.equal(await page.locator('.jhp-model').getAttribute('open'),'');
    await page.click('[data-jhp-options]');
    await page.click('[data-jhp-answer="0"]');
    assert.match(await page.locator('.jhp-feedback').innerText(),/答對了/);
    await page.reload();
    await page.waitForSelector('.jh-path');
    await page.click('[data-jhp-skill="english-1"]');
    assert.match(await page.locator('.jhp-task').innerText(),/等候隔日變式/);
    await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('eq_jh_path_v1'));
      state.units['english-1'].readyAt = Date.now()-1;
      localStorage.setItem('eq_jh_path_v1',JSON.stringify(state));
    });
    await page.reload();
    await page.waitForSelector('.jhp-task');
    assert.match(await page.locator('.jhp-task').innerText(),/Our school bus/);
    await page.click('[data-jhp-options]');
    await page.click('[data-jhp-answer="0"][data-jhp-form="transfer"]');
    assert.match(await page.locator('[data-jhp-term="j1a"]').innerText(),/1 \/ 2/);

    await page.click('[data-jhp-term="j1b"]');
    await page.click('[data-jhp-skill="english-2"]');
    assert.equal(await page.locator('[data-jhp-options]').isDisabled(),true);
    assert.doesNotMatch(await page.locator('.jhp-task').innerText(),/I usually walk/);
    await page.click('[data-jhp-audio]');
    await page.waitForFunction(() => !document.querySelector('[data-jhp-options]').disabled);
    await page.click('[data-jhp-options]');
    await page.click('[data-jhp-answer="0"]');
    assert.match(await page.locator('.jhp-feedback').innerText(),/waiting for the bus/);
    await page.evaluate(() => {
      const state = JSON.parse(localStorage.getItem('eq_jh_path_v1'));
      state.units['english-2'].readyAt = Date.now()-1;
      localStorage.setItem('eq_jh_path_v1',JSON.stringify(state));
    });
    await page.reload();
    await page.waitForSelector('[data-jhp-transcript]');
    await page.click('[data-jhp-transcript]');
    await page.click('[data-jhp-options]');
    await page.click('[data-jhp-answer="0"]');
    assert.match(await page.locator('.jhp-feedback').innerText(),/文字輔助/);
    assert.match(await page.locator('[data-jhp-term="j1b"]').innerText(),/0 \/ 3/);
    await page.selectOption('[data-jhp-goal]','gept');
    assert.match(await page.locator('.jhp-exam').innerText(),/GEPT 初級/);
    await page.locator('.jhp-exam-log > summary').click();
    await page.fill('[name="label"]','GEPT A');
    for (const [name,value] of [['listen','12'],['listenTotal','20'],['read','18'],['readTotal','20']]) await page.fill(`[name="${name}"]`,value);
    await page.click('[data-jhp-exam] button');
    assert.match(await page.locator('.jhp-exam-log').innerText(),/聽力 12\/20.*閱讀 18\/20/);
    await page.selectOption('[data-jhp-goal]','cap');
    assert.equal(await page.getByText('GEPT A').count(),0);
    await page.click('[data-jhp-term="j3b"]');
    await page.click('[data-jhp-skill="english-16"]');
    assert.equal(await page.locator('.jhp-table').isVisible(),true);
    await page.locator('.jhp-navigation summary').click();
    await page.click('[data-select-jh-tab="ultralearning"]');
    assert.match(await page.locator('.ul-readiness-gauge').innerText(),/示範題答對/);
    await page.click('[data-select-jh-tab="path"]');

    for (const [width,theme] of [[320,'light'],[390,'warm'],[1280,'dark']]) {
      await page.setViewportSize({width,height:900});
      await page.evaluate(value => document.documentElement.dataset.theme=value,theme);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),`${width} ${theme} overflow`);
      assert.ok((await page.locator('[data-jhp-term]').first().boundingBox()).height >= 44);
      if (output) await page.screenshot({path:path.join(output,`JH-${width}-${theme}.png`),fullPage:true});
    }
    await page.locator('.jhp-exam a[href="quest/#learn/sem-j3b"]').click();
    await page.waitForSelector('.semester-project[data-semester="j3b"]');
    assert.deepEqual(errors,[]);
    console.log('JH browser checks passed: correction, delayed transfer, audio, goals, score log, 3 layouts, semester handoff.');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode=1; });
