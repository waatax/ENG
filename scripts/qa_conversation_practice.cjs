const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');
const root=path.resolve('dist');
const server=http.createServer((req,res)=>{let p=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(p!==root&&!p.startsWith(root+path.sep)){res.writeHead(403);return res.end();}if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');fs.readFile(p,(e,b)=>{if(e){res.writeHead(404);return res.end();}res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json'})[path.extname(p)]||'application/octet-stream');res.end(b);});});
(async()=>{await new Promise(r=>server.listen(8113,'127.0.0.1',r));const browser=await chromium.launch({channel:'msedge',headless:true});const errors=[],checks=[];try{
const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>{
window.__spoken=[];window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Test US',lang:'en-US'},{name:'Test TW',lang:'zh-TW'}],speak:u=>window.__spoken.push({text:u.text,lang:u.lang}),cancel(){},addEventListener(){},removeEventListener(){}}});
});
for(const width of [320,1280]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:8113/');await page.locator('[data-home-stage="retrieval"]').waitFor();
 await page.locator('[data-home-stage="retrieval"]').click();assert.ok((await page.evaluate(()=>__spoken.at(-1).text)).startsWith('請用英文表達：'));
 await page.locator('[data-home-stop]').click();await page.locator('[data-home-rating="supported"]').click();
 assert.equal(await page.locator('[data-home-rating="supported"]').getAttribute('aria-pressed'),'true');
 await page.reload();assert.equal(await page.locator('[data-home-rating="supported"]').getAttribute('aria-pressed'),'true');
 await page.locator('#home-conversation-progress').selectOption('到期複習');assert.match(await page.locator('#home-conversation-results').innerText(),/找到 0 篇/);
 await page.locator('#home-conversation-progress').selectOption('全部');
 await page.locator('[data-home-stage="teaching"]').focus();await page.keyboard.press('Enter');assert.ok((await page.evaluate(()=>__spoken.at(-1).text)).startsWith('通勤教學會話'));
 await page.locator('[data-home-stop]').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('.conversation-learning').scrollIntoViewIfNeeded();await page.screenshot({path:`QA-conversation-practice-${width}-2026-10-20.png`,fullPage:false});checks.push({width,play:true,stop:true,keyboard:true,reload:true,dueFilter:true,noOverflow:true});
 await page.goto('http://127.0.0.1:8113/#listening');await page.locator('[data-cd-mode="retrieval"]').waitFor();await page.locator('[data-cd-mode="retrieval"]').click();assert.equal(await page.locator('[data-cd-mode="retrieval"]').getAttribute('aria-pressed'),'true');
}
assert.deepEqual(errors,[]);fs.writeFileSync('QA-CONVERSATION-PRACTICE-2026-10-20.json',JSON.stringify({checks,errors,speech:'Mock speech validates events and text, not device sound quality'},null,2));console.log(JSON.stringify({checks,errors}));
}finally{server.close();const timer=setTimeout(()=>process.exit(process.exitCode||0),5000);timer.unref();await browser.close();clearTimeout(timer);}})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
