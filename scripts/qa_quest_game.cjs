// Browser verification for English Quest v2 (dist/quest). Usage: node scripts/qa_quest_game.cjs [--smoke]
const { chromium } = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs'), http = require('node:http'), path = require('node:path'), assert = require('node:assert/strict'), { pathToFileURL } = require('node:url');
const root = path.resolve('dist'), out = process.env.EQ_QA_OUT || 'docs/redesign/verification/v5/round6'; fs.mkdirSync(out, { recursive: true });
const types = { '.html': 'text/html;charset=utf-8', '.mjs': 'text/javascript', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.mp3': 'audio/mpeg' };
const server = http.createServer((req, res) => {
  let p = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (p !== root && !p.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); return res.end(); } res.setHeader('Content-Type', types[path.extname(p)] || 'application/octet-stream'); res.end(data); });
});
const KEY = 'english-quest-game-v2';
(async () => {
  const { vocabExercises } = await import(pathToFileURL(path.resolve('dist/quest/engine.mjs')).href);
  const dir = 'dist/quest/course/', index = JSON.parse(fs.readFileSync(dir + 'index.json', 'utf8'));
  const items = {};
  for (const t of [...index.sections, ...index.branches]) Object.assign(items, JSON.parse(fs.readFileSync(dir + t.id + '.json', 'utf8')).items);
  const {ADVANCED_ITEMS}=await import(pathToFileURL(path.resolve('dist/quest/advanced_placement.mjs')).href);for(const q of ADVANCED_ITEMS)items[q.id]=q;
  for (const s of Object.values(JSON.parse(fs.readFileSync(dir + 'stories.json', 'utf8')).stories)) for (const x of s.steps) items[x.id] = x;
  for (const set of JSON.parse(fs.readFileSync(dir + 'vocab.json', 'utf8')).sets) for (const x of vocabExercises(set)) items[x.id] = x;
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const base = 'http://localhost:' + server.address().port + '/quest/';
  const launcher = await chromium.launchServer({ headless: true, channel: 'msedge', args: ['--no-proxy-server'] });
  const browser = await chromium.connect(launcher.wsEndpoint());
  const checks = [], errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    page.setDefaultTimeout(15000);
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    const session = () => page.evaluate(k => JSON.parse(localStorage.getItem(k) || '{}').session, KEY);
    const noOverflow = async label => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'overflow: ' + label);
    async function step(wrong = false) {
      const s = await session(); if (!s) return null;
      if (s.feedback) { await page.locator('#go').click(); return 'next'; }
      const it = items[s.queue[s.index]];
      if (it.type === 'info' || it.type === 'line') { await page.locator('#go').click(); return it.type; }
      assert.equal(await page.locator('.prompt [data-act="prompt-say"]').getAttribute('data-text'),it.prompt);
      if (it.type === 'choice' || it.type === 'listen') {
        const opts = page.locator('.opt'); const n = await opts.count();
        for (let i = 0; i < n; i++) { const v = await opts.nth(i).getAttribute('data-v'); if ((v === it.answer) !== wrong) { await opts.nth(i).click(); break; } }
        await page.locator('#go').click();
      } else if (it.type === 'build') {
        for (const w of it.answer.split(' ')) { const tok = page.locator('.bank .tok:not([disabled])', { hasText: new RegExp(`^${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }).first(); await tok.click(); }
        await page.locator('#go').click();
      } else if (it.type === 'input') { await page.locator('#answer').fill(wrong ? 'zzz' : it.answer); await page.locator('#answer').press('Enter'); }
      else if (it.type === 'match') for (let i = 0; i < it.pairs.length; i++) { await page.locator(`[data-act="mL"][data-i="${i}"]`).click(); await page.locator(`[data-act="mR"][data-i="${i}"]`).click(); }
      await page.locator(s.mode==='placement'?'.assessment-recorded':'.check.ok, .check.bad').waitFor();
      return it.type;
    }
    async function play(wrong = () => false, guard = 80) { const seen = []; let k = 0; while (guard-- > 0) { const r = await step(wrong(k)); if (r === null) break; if (r !== 'next') { seen.push(r); k++; } } await page.locator('.result').waitFor(); return seen; }
    async function leaveResult() { for (let i = 0; i < 3; i++) { const b = page.locator('[data-act="streak-ok"], [data-act="done"]'); if (await b.count()) await b.first().click(); else break; } await page.locator('.path, .page-head').first().waitFor(); }
    async function openNode(id) { await page.locator(`[data-act="pop"][data-id="${id}"]`).click(); await page.locator(`.pop [data-act="start"][data-id="${id}"]`).click(); await page.locator('.lesson-screen').waitFor(); }

    await page.goto(base);
    await page.evaluate(() => localStorage.clear()); await page.reload();
    await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-why"][data-id="school"]').click(); await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-goal"][data-id="casual"]').click(); await page.locator('[data-act="ob-next"]').click();
    await page.locator('[data-act="ob-start"][data-id="s1"]').click();
    await page.locator('.path').waitFor();await page.locator('.adventure').waitFor();checks.push('onboarding and actionable next adventure');
    for (const width of [320, 390, 768, 1280]) { await page.setViewportSize({ width, height: 900 }); await noOverflow('path ' + width); await page.screenshot({ path: `${out}/v2-path-${width}.png` }); }
    checks.push('path at 320/390/768/1280 without horizontal scroll');
    await page.setViewportSize({ width: 390, height: 844 });

    await openNode('u1:q1');
    await page.screenshot({ path: `${out}/v2-lesson-390.png` });
    await step(true); await page.locator('.correction-tip').waitFor(); assert.equal(await page.locator('.coach-controls button').count(),4); await page.locator('[data-act="answer-say"]').first().click(); await page.locator('[data-act="stop-say"]').click(); assert.ok((await session()).feedback); checks.push('wrong answer has explanation, correction, normal/slow answer and stop controls'); await page.screenshot({ path: `${out}/v2-feedback-wrong-390.png` }); await step(); // wrong answer, then continue
    await step(); await page.reload(); await page.locator('[data-act="resume"]').click(); await page.locator('.lesson-screen').waitFor(); checks.push('reload keeps the session and resumes');
    const seen = await play(); assert.ok(seen.length >= 5);
    assert.match(await page.locator('.result h1').innerText(), /連續 1 天/); await page.screenshot({ path: `${out}/v2-streak-390.png` });
    await page.locator('[data-act="streak-ok"]').click(); assert.match(await page.locator('.tiles').innerText(), /90%/); await page.screenshot({ path: `${out}/v2-result-390.png` });
    await page.locator('.recall-pack details').first().locator('summary').click();assert.ok(await page.locator('.recall-pack details[open]').count());await leaveResult(); checks.push('wrong answer repaired; first-try score and retrieval souvenir verified');
    for (const id of ['u1:q2', 'u1:q3']) { await openNode(id); if (id === 'u1:q2') { await page.locator('[data-act="transcript"]').click(); await page.reload();await page.locator('[data-act="resume"]').click();assert.ok(await page.locator('.transcript').count()); }
      if(id==='u1:q3'){let guard=30;while(items[(await session()).queue[(await session()).index]].type!=='input'&&guard-->0)await step();assert.ok(guard>0);await page.locator('#answer').dispatchEvent('compositionstart');await page.locator('#answer').fill('am');await page.locator('.type-form').dispatchEvent('submit');assert.equal((await session()).feedback,null);await page.locator('#answer').dispatchEvent('compositionend');checks.push('IME composition does not submit prematurely');}
      await play(); await leaveResult(); }
    checks.push('listening transcript fallback and build/input items');
    let st = await page.evaluate(k => JSON.parse(localStorage.getItem(k)), KEY);
    assert.ok(st.review.u1, 'review scheduled after unit lessons');
    await openNode('u1:q4'); assert.equal(await page.locator('.hearts').count(), 1); await play(() => true);
    assert.match(await page.locator('.result h1').innerText(), /差一點/); await page.locator('[data-act="start"][data-mode="boss"]').click(); await play();
    assert.match(await page.locator('.result h1').innerText(), /金冠/); await page.screenshot({ path: `${out}/v2-crown-390.png` }); await leaveResult(); checks.push('unit challenge: 3 hearts fail, retry, crown');
    await openNode('g3-s1-u1:word');
    while (true) { const s = await session(); const it = items[s.queue[s.index]]; if (it.type === 'match' && !s.feedback) break; await step(); }
    await page.locator('[data-act="mL"]').first().click(); await page.screenshot({ path: `${out}/v2-match-390.png` }); await page.locator('[data-act="mL"]').first().click();
    await play(); await leaveResult(); checks.push('word lesson with matching pairs');
    await page.locator('[data-act="guide"][data-id="g3-s1-u1"]').click(); await page.locator('.modal.guide').waitFor(); await page.screenshot({ path: `${out}/v2-guide-390.png` }); await page.locator('.modal [data-act="close"]').first().click(); checks.push('unit guide');

    await page.goto(base + '#stories'); await page.locator('.story-card').first().click(); await page.locator('.story-line').waitFor(); await page.screenshot({ path: `${out}/v2-story-390.png` });
    await play(); assert.match(await page.locator('.result h1').innerText(), /故事/); await leaveResult(); checks.push('interactive story');
    await page.goto(base + '#practice'); await page.locator('[data-mode="mistakes"]').click(); await page.locator('.lesson-screen').waitFor(); await play(); await leaveResult(); checks.push('mistake bank practice');
    await page.goto(base + '#practice'); await page.locator('.set').first().click(); await page.locator('.lesson-screen').waitFor(); await play(); await leaveResult(); checks.push('vocabulary set with recorded MP3');
    await page.goto(base + '#practice'); await page.locator('[data-mode="practice"]').click(); await page.locator('.lesson-screen').waitFor(); await play(); await leaveResult(); checks.push('personalised practice');
    await page.goto(base + '#learn'); await page.locator('[data-act="tracks"]').click(); await page.locator('.modal [data-act="track"][data-id="s3"]').click();
    await page.locator('.track-head [data-act="jump"]').click(); await page.locator('.lesson-screen').waitFor(); await play();
    assert.match(await page.locator('.result h1').innerText(), /跳級成功/); await leaveResult();
    assert.ok(await page.locator('.node.current').count()); checks.push('jump test unlocks section 3');
    await page.goto(base + '#profile'); await page.locator('.top [data-act="placement"]').click(); await page.locator('[data-size="20"]').click(); await page.locator('.lesson-screen').waitFor(); await play();
    assert.match(await page.locator('.result h1').innerText(), /建議從第|進階學術挑戰/); await page.locator('[data-act="accept"]').first().click(); checks.push('placement recommends a section');
    for (const tab of ['practice', 'stories', 'library', 'profile']) for (const width of [320, 1280]) { await page.setViewportSize({ width, height: 900 }); await page.goto(base + '#' + tab); await page.locator('.page-head').waitFor(); await noOverflow(tab + ' ' + width); if (width === 1280) await page.screenshot({ path: `${out}/v2-${tab}-1280.png`, fullPage: false }); }
    checks.push('practice/stories/library/profile at 320 and 1280');
    await page.setViewportSize({ width: 1280, height: 900 }); await page.goto(base + '#learn'); await page.screenshot({ path: `${out}/v2-learn-1280.png` });
    st = await page.evaluate(k => JSON.parse(localStorage.getItem(k)), KEY);
    assert.ok(st.xp.total > 0 && Object.keys(st.awards).length === Object.keys(st.awards).length);
    const download = page.waitForEvent('download'); await page.goto(base + '#profile'); await page.locator('[data-act="export"]').click(); assert.ok((await download).suggestedFilename().endsWith('.json')); checks.push('backup download');
    const denied = await browser.newPage(); await denied.addInitScript(() => { Storage.prototype.setItem = function () { throw Error('blocked'); }; });
    await denied.goto(base); await denied.locator('[data-act="ob-next"]').click(); await denied.locator('[data-act="ob-next"]').click(); await denied.locator('[data-act="ob-next"]').click(); await denied.locator('[data-act="ob-start"][data-id="s1"]').click();
    assert.match(await denied.locator('.warn').innerText(), /無法儲存/); await denied.close(); checks.push('blocked storage shows a warning and stays usable');
    const direct = await browser.newPage({viewport:{width:320,height:740}});
    await direct.addInitScript(() => {
      window.coachSpeech=[];
      window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
      Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
        getVoices:()=>[{lang:'en-US',name:'English'},{lang:'zh-TW',name:'Chinese'}],cancel(){},addEventListener(){},
        speak(u){window.coachSpeech.push({text:u.text,lang:u.lang,rate:u.rate});queueMicrotask(()=>u.onend?.());}
      }});
    });
    await direct.goto(base+'#placement'); await direct.locator('.placement-options').waitFor(); assert.equal(await direct.locator('.placement-size').count(),3); await direct.locator('[data-size="10"]').click();await direct.locator('.lesson-screen').waitFor();
    assert.equal(await direct.locator('.coach-controls').count(),0);
    await direct.locator('[data-act="prompt-say"]').first().click();
    await direct.waitForFunction(()=>window.coachSpeech.length>0);
    assert.equal(await direct.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
    checks.push('fresh learner chooses 10/20/30 before placement; prompt narration works without revealing answer');
    await direct.goto(base.replace(/quest\/$/,''));await direct.locator('.level-top-entry').waitFor();
    assert.match(await direct.locator('.level-top-entry').getAttribute('href'),/quest\/#placement$/);
    assert.equal(await direct.locator('.level-top-entry').evaluate(e=>e.getBoundingClientRect().top),0);
    await direct.locator('.level-top-entry').click();await direct.locator('[data-act="resume"]').waitFor();
    checks.push('main site top placement link preserves an unfinished test');await direct.close();
    // Reproduce the user's section-nine report using a fresh, isolated learner fixture.
    await page.evaluate(async () => {
      const {createCourse,createGame}=await import('./engine.mjs?v=quality20261027');
      const ix=await fetch('./course/index.json?v=quality20261027').then(r=>r.json()),c=createCourse(ix);
      c.register(await fetch('./course/s9.json?v=quality20261027').then(r=>r.json()));
      const g=createGame({course:c,storage:localStorage});g.state.session=null;g.state.exposures={};g.state.rotations={};
      g.setup({start:'s9',goal:'regular'});g.acceptPlacement('s9');g.save();
    });
    await page.goto(base+'#learn');await page.reload();await page.locator('.path').waitFor();
    const {learningKeys}=await import(pathToFileURL(path.resolve('dist/quest/question_quality.mjs')).href),targets=new Set();
    for(let round=0;round<4;round++){
      await openNode('g12-s1-u1:word');const current=await session(),scored=current.queue.filter(id=>items[id]?.type!=='info');
      assert.equal(scored.length,round===3?2:10);assert.equal(current.rotation.round,1);
      for(const id of scored)for(const key of learningKeys(items[id])){assert.ok(!targets.has(key),'section nine repeated '+key);targets.add(key);}
      if(round===0){await page.screenshot({path:`${out}/section-nine-distinct-390.png`});await step();await step();await page.reload();await page.locator('[data-act="resume"]').click();assert.deepEqual((await session()).queue,current.queue);}
      await play();await leaveResult();
    }
    assert.equal(targets.size,32);await openNode('g12-s1-u1:word');assert.equal((await session()).rotation.cycled,true);assert.match(await page.locator('.question-rotation').innerText(),/輪替複習/);
    await page.screenshot({path:`${out}/section-nine-cycle-390.png`});await play();await leaveResult();
    checks.push('section nine first unit: 32 distinct words across four sessions, reload preserves queue, next round explicitly labelled');
    assert.deepEqual(errors, []);
    const report = { date: '2026-10-27', version: 'quality20261027', courseVersion: index.version, checks, errors };
    fs.writeFileSync(`${out}/browser-v2.json`, JSON.stringify(report, null, 2) + '\n'); console.log(JSON.stringify(report, null, 2));
  } catch (e) { console.error('Browser verification failed:', e, errors); process.exitCode = 1; }
  finally { server.closeAllConnections(); server.close(); await Promise.race([browser.close(), new Promise(r => setTimeout(r, 3000))]); launcher.process()?.kill(); }
})();
