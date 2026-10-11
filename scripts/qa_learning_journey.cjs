const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve('dist');
const server=http.createServer((req,res)=>{let p;try{p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400);return res.end();}if(p!==root&&!p.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');fs.readFile(p,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(p)]||'application/octet-stream');res.end(data);});});
(async()=>{
 await new Promise(resolve=>server.listen(8093,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{
  const page=await browser.newPage();page.setDefaultTimeout(15000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const {journeyCatalog}=await import('../dist/learning_journey.mjs');let checked=0;
  for(const width of [320,1280]){
   await page.setViewportSize({width,height:900});await page.goto('http://localhost:8093/#knowledge');
   await page.locator('.path-grid').waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`home ${width}`);
   await page.screenshot({path:`QA-journey-home-${width}-2026-10-12.png`,fullPage:false});
   await page.locator('.learning-paths').screenshot({path:`QA-journey-paths-${width}-2026-10-12.png`});
   for(const c of journeyCatalog){
    await page.goto('http://localhost:8093/'+c.link);
    await page.locator('.journey-context').waitFor();
    assert.equal(await page.locator('h1').count(),1,c.link);
    assert.equal((await page.locator('h1').innerText()).trim(),c.title,c.link);
    assert.equal(await page.locator('.journey-recall').count(),1,c.link);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width} ${c.link}`);
    checked++;
   }
   console.log(`Verified ${checked} page/viewport pairs`);
  }
  for(const width of [390,768]){await page.setViewportSize({width,height:900});await page.goto('http://localhost:8093/#knowledge');await page.locator('.path-grid').waitFor();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  await page.goto('http://localhost:8093/#knowledge/be-sentences');
  await page.locator('[data-journey-save]').click();assert.equal(await page.locator('[data-journey-save]').getAttribute('aria-pressed'),'true');
  await page.locator('[data-recall="remembered"]').click();await page.reload();await page.locator('[data-journey-save]').waitFor();assert.equal(await page.locator('[data-journey-save]').getAttribute('aria-pressed'),'true');
  await page.goto('http://localhost:8093/#knowledge');await page.locator('.journey-columns').waitFor();assert.ok((await page.locator('.journey-columns').innerText()).includes('第一個完整句子'));
  await page.locator('#knowledge-search').fill('passive');assert.ok((await page.locator('#knowledge-results').innerText()).includes('被動'));
  await page.locator('[data-catalog-reset]').click();assert.equal(await page.locator('#knowledge-search').inputValue(),'');
  await page.locator('[data-catalog-domain="reading"]').click();assert.equal(await page.locator('#knowledge-domain').inputValue(),'reading');
  for(const theme of ['dark','light']){await page.evaluate(theme=>{document.documentElement.dataset.theme=theme;document.body.dataset.theme=theme;},theme);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));const colors=await page.locator('.journey-home').evaluate(el=>({color:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));assert.notEqual(colors.color,colors.bg);}
  await page.locator('[data-catalog-reset]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('#knowledge-domain').inputValue(),'全部');
  await page.goto('http://localhost:8093/#grammar/perfect');await page.locator('.journey-recall').waitFor();await page.screenshot({path:'QA-journey-lesson-390-2026-10-12.png'});
  // Storage denied: the UI must retain actions while explaining the persistence limit.
  const denied=await browser.newPage();await denied.addInitScript(()=>{Storage.prototype.setItem=function(){throw Error('denied');};});await denied.goto('http://localhost:8093/#knowledge/be-sentences');await denied.locator('[data-journey-save]').click();assert.ok((await denied.locator('[data-journey-status]').innerText()).includes('無法儲存'));
  assert.deepEqual(errors,[]);
  fs.writeFileSync('QA-LEARNING-JOURNEY-2026-10-12.json',JSON.stringify({catalogPages:journeyCatalog.length,pageViewportPairs:checked,homeWidths:[320,390,768,1280],overflow:false,saveReload:true,recallSchedule:true,searchAliases:true,resetAndDomainButtons:true,keyboardReset:true,darkAndLight:true,storageDenied:true,errors},null,2));
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
