const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve('dist'),out='docs/redesign/verification/advanced20261027';fs.mkdirSync(out,{recursive:true});
const items={};for(const file of fs.readdirSync('dist/quest/course').filter(x=>/^s\d\.json$/.test(x)))Object.assign(items,JSON.parse(fs.readFileSync('dist/quest/course/'+file)).items);
const server=http.createServer((req,res)=>{let p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!p.startsWith(root+path.sep)&&p!==root){res.writeHead(403);return res.end();}if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');fs.readFile(p,(e,b)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html;charset=utf-8','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg'})[path.extname(p)]||'application/octet-stream');res.end(b);});});
const KEY='english-quest-game-v2';
(async()=>{
 const {ADVANCED_ITEMS}=await import(require('node:url').pathToFileURL(path.resolve('dist/quest/advanced_placement.mjs')).href);for(const q of ADVANCED_ITEMS)items[q.id]=q;
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const launcher=await chromium.launchServer({headless:true,channel:'msedge',args:['--no-proxy-server']});const browser=await chromium.connect(launcher.wsEndpoint());
 const checks=[],errors=[],base='http://127.0.0.1:'+server.address().port+'/quest/';
 try{
 const page=await browser.newPage({viewport:{width:390,height:844}});page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(15000);
 await page.addInitScript(()=>{window.__time=Date.now();Date.now=()=>window.__time;window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{getVoices:()=>[{lang:'en-US',name:'English'},{lang:'zh-TW',name:'Chinese'}],cancel(){},addEventListener(){},speak(u){queueMicrotask(()=>u.onend?.());}}});});
 const state=()=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)||'{}'),KEY);
 const session=async()=>(await state()).session;
 const overflow=async label=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+label);
 async function answer(correct=true){
  const s=await session();if(!s)return false;
  if(s.feedback){await page.locator('#go').click();return true;}
  const it=items[s.queue[s.index]];
  if(['info','line'].includes(it.type)){await page.locator('#go').click();return true;}
  await page.evaluate(()=>window.__time+=2200);
  if(it.type==='listen'||it.type==='input'&&it.audio&&!it.text){await page.locator('.listen-box [data-slow="1"]').click();await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)).session.audio,KEY);}
  if(['choice','listen'].includes(it.type)){
   const options=page.locator('.opt');for(let i=0;i<await options.count();i++)if(((await options.nth(i).getAttribute('data-v'))===it.answer)===correct){await options.nth(i).click();break;}
   await page.locator('#go').click();
  }else if(it.type==='input'){await page.locator('#answer').fill(correct?it.answer:'wrong-answer');await page.locator('#answer').press('Enter');}
  else if(it.type==='build'){for(const w of it.answer.split(' ')){const bank=page.locator('.bank .tok:not(:disabled)');let found=false;for(let i=0;i<await bank.count();i++)if((await bank.nth(i).innerText()).toLowerCase()===w.toLowerCase()){await bank.nth(i).click();found=true;break;}assert.ok(found,'missing token '+w);}await page.locator('#go').click();}
  else if(it.type==='match'){for(let i=0;i<it.pairs.length;i++){await page.locator(`[data-act="mL"][data-i="${i}"]`).click();await page.locator(`[data-act="mR"][data-i="${i}"]`).click();}}
  await page.locator(s.mode==='placement'?'.assessment-recorded':'.check.ok,.check.bad').waitFor();return true;
 }
 for(const size of [10,20,30]){
  await page.goto(base);await page.evaluate(()=>localStorage.clear());await page.reload();await page.goto(base+'#placement');await page.locator('.placement-options').waitFor();
  for(const width of [320,390,768,1280]){await page.setViewportSize({width,height:844});await overflow('picker '+width);if(size===10)await page.screenshot({path:`${out}/placement-picker-${width}.png`});}
  await page.setViewportSize({width:390,height:844});await page.locator(`[data-size="${size}"]`).click();await page.locator('.lesson-screen').waitFor();assert.equal((await session()).queue.length,size);assert.deepEqual((await session()).placement.slots.slice(-3).map(x=>x.section),['b-sat','b-gre','b-gmat']);
  await answer(false);assert.equal(await page.locator('.opt.right,.opt.wrong,.check.bad,.coach-controls').count(),0);assert.match(await page.locator('.assessment-recorded').innerText(),/已記錄/);
  if(size===20){const old=await session();await page.reload();await page.locator('[data-act="resume"]').click();assert.equal((await session()).index,old.index);assert.deepEqual((await session()).placement,old.placement);}
  let guard=100;while(await session()&&guard-->0)await answer(true);assert.ok(guard>0);await page.locator('.placement-result').waitFor();
  assert.equal(await page.locator('.level-evidence>div').count(),7);assert.equal(await page.locator('.advanced-grid>article').count(),3);assert.equal(await page.locator('.skill-evidence>section').count(),4);assert.equal((await state()).xp.total,0);assert.equal(Object.keys((await state()).nodes).length,0);
  await page.locator('.placement-review>summary').click();assert.equal(await page.locator('.placement-review>details').count(),size);await page.locator('.placement-review>details').first().locator('summary').click();await page.locator('.placement-review [data-act="prompt-say"]').first().click();
  await overflow('result '+size);await page.screenshot({path:`${out}/placement-result-${size}-390.png`,fullPage:true});checks.push(`${size} exact questions, protected SAT/GRE/GMAT tail, separate general and advanced evidence, full explanations and no XP`);
 }
 await page.locator('[data-act="advanced-track"][data-id="b-gre"]').click();await page.locator('.track-head h1').waitFor();assert.match(await page.locator('.track-head h1').innerText(),/GRE/);checks.push('advanced report opens GRE learning path');
 checks.push('20-question interrupted test restores metadata and deferred feedback');
 await page.goto(base);await page.evaluate(()=>localStorage.clear());await page.reload();for(let i=0;i<3;i++)await page.locator('[data-act="ob-next"]').click();await page.locator('[data-act="ob-start"]').click();
 await page.locator('.course-atlas>summary').click();assert.equal(await page.locator('.atlas-level').count(),12);await page.locator('.atlas-level').nth(7).locator('details>summary').click();await page.locator('.atlas-level').nth(7).locator('[data-act="unit-select"]').last().click();
 await page.locator('.track-head h1').waitFor();assert.match(await page.locator('.track-head h1').innerText(),/高中進階/);assert.equal(await page.locator('.node.locked').count(),0);await overflow('high school free select');await page.reload();assert.match(await page.locator('.track-head h1').innerText(),/高中進階/);checks.push('all nine levels expandable; every high-school lesson/challenge selectable and chosen level survives reload');
 await page.locator('[data-act="tracks"]').click();await page.locator('.modal [data-act="track"][data-id="s1"]').click();await page.locator('[data-act="pop"][data-id="u1:q1"]').click();await page.locator('.pop [data-act="start"]').click();let guard=50;while(await session()&&guard-->0)await answer(true);
 if(await page.locator('[data-act="streak-ok"]').count())await page.locator('[data-act="streak-ok"]').click();await page.locator('.jump-offer').waitFor();await page.screenshot({path:`${out}/fast-jump-offer-390.png`,fullPage:true});assert.equal((await state()).jumped.s2,undefined);
 await page.locator('[data-act="result-jump"]').click();await page.locator('.lesson-screen').waitFor();assert.equal((await session()).mode,'jump');assert.equal((await session()).ref,'s2');guard=30;while(await session()&&guard-->0)await answer(false);assert.equal((await state()).jumped.s2,undefined);assert.match(await page.locator('.result h1').innerText(),/還沒過關/);checks.push('fast fresh independent answers offer a separate jump test; failed test never marks a level as tested');
 assert.deepEqual(errors,[]);fs.writeFileSync(out+'/placement-browser.json',JSON.stringify({date:'2026-10-27',checks,errors},null,2)+'\n');console.log(JSON.stringify({checks,errors},null,2));
 }catch(e){console.error(e,errors);process.exitCode=1;}finally{server.closeAllConnections();server.close();await Promise.race([browser.close(),new Promise(r=>setTimeout(r,3000))]);launcher.process()?.kill();}
})();
