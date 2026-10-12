// Real-browser QA for the v6 mnemonic cards (dist/mnemonics) and the 500 word families (dist/roots).
const {chromium}=require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const repo=path.resolve(__dirname,'..'),root=path.join(repo,'dist'),PORT=8098,base=`http://127.0.0.1:${PORT}`,V='keyword6r2';
const report={date:'2026-10-12',pages:['dist/mnemonics/index.html','dist/roots/index.html'],widths:[320,390,768,1280],checks:[],pageErrors:[],consoleErrors:[],httpErrors:[],screenshots:[]};
const cards=JSON.parse(fs.readFileSync(path.join(root,'mnemonics/cards.json'),'utf8')),groups=JSON.parse(fs.readFileSync(path.join(root,'roots/groups.json'),'utf8')).groups;
const timing=new Map(JSON.parse(fs.readFileSync(path.join(root,'roots/audio-manifest.json'),'utf8')).records.map(r=>[r.id,r.parts]));
const TYPES={'.html':'text/html; charset=utf-8','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.mp3':'audio/mpeg','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
// Static server for dist/ with a path-traversal guard and HTTP Range support so MP3 seeking behaves like GitHub Pages.
const server=http.createServer((req,res)=>{let p;try{p=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400);return res.end();}
 if(p!==root&&!p.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');
 fs.stat(p,(err,st)=>{if(err||!st.isFile()){res.writeHead(404);return res.end();}
  const size=st.size,head={'Content-Type':TYPES[path.extname(p)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-store'},m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range||'');
  if(m&&(m[1]||m[2])){const start=m[1]?Number(m[1]):Math.max(0,size-Number(m[2])),end=m[1]&&m[2]?Math.min(Number(m[2]),size-1):size-1;
   if(start>=size||start>end){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}
   res.writeHead(206,{...head,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});if(req.method==='HEAD')return res.end();return fs.createReadStream(p,{start,end}).pipe(res);}
  res.writeHead(200,{...head,'Content-Length':size});if(req.method==='HEAD')return res.end();fs.createReadStream(p).pipe(res);});});
function check(name,pass,detail={},width){report.checks.push({name,...(width?{width}:{}),pass:!!pass,detail});console.log(`${pass?'PASS':'FAIL'} ${width?width+' ':''}${name}${pass?'':' '+JSON.stringify(detail)}`);}
async function step(name,fn,width){try{await fn();}catch(e){check(name,false,{exception:String(e.message||e).split('\n')[0]},width);}}
const overflow=page=>page.evaluate(()=>{const w=innerWidth,beyond=[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&r.right>w+1&&getComputedStyle(el).visibility!=='hidden';}).slice(0,6).map(el=>el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(el.className&&typeof el.className==='string'?'.'+el.className.trim().replace(/\s+/g,'.'):''));return {scrollWidth:document.documentElement.scrollWidth,innerWidth:w,beyond,ok:document.documentElement.scrollWidth<=w+1&&!beyond.length};});
const options=(page,id)=>page.$$eval(`#${id} option`,os=>os.filter(o=>o.value).map(o=>({value:o.value,n:Number((o.textContent.match(/（([\d,]+)）/)||[,'NaN'])[1].replace(/,/g,''))})));
const countOf=async page=>Number((await page.locator('#count').innerText()).split('/')[0].replace(/[^\d]/g,''));
const pick=(arr,n)=>{const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.slice(0,n);};
const waitCards=page=>page.waitForFunction(()=>document.querySelectorAll('#cards .word-card').length>0,null,{timeout:20000});
const waitGroups=page=>page.waitForFunction(()=>document.querySelectorAll('#families .family').length>0,null,{timeout:20000});

(async()=>{await new Promise(r=>server.listen(PORT,'127.0.0.1',r));
 const browser=await chromium.launch({headless:true,channel:'msedge',args:['--autoplay-policy=no-user-gesture-required']});
 const context=await browser.newContext({viewport:{width:1280,height:900}});
 await context.addInitScript(()=>{const Original=window.Audio;window.__audios=[];window.Audio=function(...args){const a=new Original(...args);window.__audios.push(a);return a;};window.Audio.prototype=Original.prototype;});
 const page=await context.newPage();
 page.on('pageerror',e=>report.pageErrors.push({url:page.url(),message:e.message}));
 page.on('console',m=>{if(m.type()!=='error')return;const loc=(m.location()||{}).url||'';if(/favicon/i.test(loc+m.text()))return;report.consoleErrors.push({url:page.url(),text:m.text(),location:loc});});
 page.on('response',r=>{if(r.status()>=400&&!/favicon/i.test(r.url()))report.httpErrors.push({url:r.url(),status:r.status()});});

 // Static checks: every card and family has its MP3, every family link points at a real group.
 const ids=new Set(groups.map(g=>g.id)),missingTrio=cards.filter(c=>!fs.existsSync(path.join(root,'mnemonics/audio-trio',c.word+'.mp3'))).map(c=>c.word),missingFam=groups.filter(g=>!fs.existsSync(path.join(root,'roots/audio',g.id+'.mp3'))).map(g=>g.id);
 check('static: 1000 trio MP3 + 500 family MP3 files exist',!missingTrio.length&&!missingFam.length&&cards.length===1000&&groups.length===500,{missingTrio,missingFam});
 const badFam=cards.flatMap(c=>(c.families||[]).filter(f=>!ids.has(f.id)).map(f=>c.word+':'+f.id));check('static: card families reference existing groups',!badFam.length,{cardsWithFamilies:cards.filter(c=>c.families?.length).length,badFam});

 // Layout at every width.
 for(const width of report.widths){await page.setViewportSize({width,height:900});
  await step('mnemonics layout',async()=>{await page.goto(base+'/mnemonics/index.html');await waitCards(page);
   check('mnemonics: 12 cards on page 1',await page.locator('#cards .word-card').count()===12,{count:await page.locator('#cards .word-card').count()},width);
   const hero=await page.locator('#hero-stats').innerText(),kinds=await options(page,'kind'),cats=await options(page,'category'),sum=kinds.reduce((s,k)=>s+k.n,0);
   check('mnemonics: #hero-stats filled',/諧音聯想 \d+ 張/.test(hero)&&/構詞拆字 \d+ 張/.test(hero),{hero},width);
   check('mnemonics: method filter counts sum to 1000',sum===1000&&kinds.length>=4,{kinds,sum},width);
   check('mnemonics: category filter populated',cats.length>3,{categories:cats.length},width);
   check('mnemonics: no horizontal overflow (answers hidden)',(await overflow(page)).ok,await overflow(page),width);
   for(const b of await page.locator('#cards [data-reveal]').all())await b.click();
   const open=await page.$$eval('#cards .answer',as=>as.filter(a=>!a.hidden).length);
   const o=await overflow(page);check('mnemonics: no horizontal overflow (all 12 answers revealed)',o.ok&&open===12,{...o,revealed:open},width);
   if(width===390||width===1280){const f=`QA-v6-mnemonics-${width}.png`;await page.screenshot({path:path.join(repo,f),fullPage:true});report.screenshots.push(f);}
   if(width===320){// Extra sweep: reveal every card on every page and look for card-level or page-level overflow.
    const bad=await page.evaluate(async()=>{const bad=[],next=document.querySelector('#next');for(let p=0;p<200;p++){document.querySelectorAll('#cards [data-reveal][aria-expanded="false"]').forEach(b=>b.click());await new Promise(r=>requestAnimationFrame(()=>r()));const cardsOver=[...document.querySelectorAll('.word-card')].filter(c=>c.scrollWidth>c.clientWidth+1).map(c=>c.dataset.id);if(document.documentElement.scrollWidth>innerWidth+1||cardsOver.length)bad.push({page:p+1,scrollWidth:document.documentElement.scrollWidth,cardsOver});if(next.disabled)break;next.click();}return bad;});
    check('mnemonics: all 84 pages revealed, no page/card overflow',!bad.length,{bad},width);}
  },width);
  await step('roots layout',async()=>{await page.goto(base+'/roots/index.html');await waitGroups(page);
   check('roots: 12 groups on page 1',await page.locator('#families .family').count()===12,{count:await page.locator('#families .family').count()},width);
   const hero=await page.locator('#hero-stats').innerText(),types=await options(page,'type'),sum=types.reduce((s,k)=>s+k.n,0);
   check('roots: #hero-stats filled',/字根 \d+ 組/.test(hero)&&/個成員字/.test(hero),{hero},width);
   check('roots: type filter counts sum to 500',sum===500&&types.length===4,{types,sum},width);
   check('roots: no horizontal overflow',(await overflow(page)).ok,await overflow(page),width);
   if(width===390||width===1280){const f=`QA-v6-roots-${width}.png`;await page.screenshot({path:path.join(repo,f),fullPage:true});report.screenshots.push(f);}
   await page.locator('#quiz').check();const o=await overflow(page);check('roots: no horizontal overflow (quiz mode on)',o.ok&&await page.locator('#families.quiz').count()===1,o,width);
   if(width===320){const bad=await page.evaluate(async()=>{const bad=[],next=document.querySelector('#next');for(let p=0;p<100;p++){await new Promise(r=>requestAnimationFrame(()=>r()));const over=[...document.querySelectorAll('.family')].filter(c=>c.scrollWidth>c.clientWidth+1).map(c=>c.id);if(document.documentElement.scrollWidth>innerWidth+1||over.length)bad.push({page:p+1,scrollWidth:document.documentElement.scrollWidth,over});if(next.disabled)break;next.click();}return bad;});
    check('roots: all 42 pages, no page/card overflow',!bad.length,{bad},width);}
  },width);}

 // Mnemonics functional checks at desktop width.
 await page.setViewportSize({width:1280,height:900});
 await step('mnemonics: ambulance reveal',async()=>{await page.goto(base+'/mnemonics/index.html');await waitCards(page);const card=page.locator('.word-card[data-id="fc-el-0552"]');
  await card.locator('[data-reveal]').click();const mark=await card.locator('mark.hook').innerText();
  const vis={answer:await card.locator('.answer').isVisible(),hookBadge:await card.locator('.hook-badge').isVisible(),badge:await card.locator('.hook-badge').innerText(),markHook:mark,spell:await card.locator('.spell').isVisible(),example:await card.locator('.example').isVisible()};
  check('mnemonics: ambulance reveal shows hook badge, mark.hook 俺不能死, spell, example',vis.answer&&vis.hookBadge&&mark.includes('俺不能死')&&vis.spell&&vis.example,vis);});
 await step('mnemonics: search',async()=>{for(const q of ['俺不能死','ambulance']){await page.locator('#search').fill(q);check(`mnemonics: search "${q}" finds ambulance`,await page.locator('.word-card[data-id="fc-el-0552"]').count()===1,{count:await countOf(page)});}await page.locator('#search').fill('');});
 await step('mnemonics: method filter',async()=>{const res=[];for(const k of await options(page,'kind')){await page.selectOption('#kind',k.value);const methods=await page.$$eval('#cards .word-card .method',ms=>ms.map(m=>m.textContent));res.push({method:k.value,expected:k.n,count:await countOf(page),shown:methods.length,allMatch:methods.every(m=>m===k.value)});}
  await page.selectOption('#kind','');check('mnemonics: method filter shows only that method with matching counts',res.every(r=>r.allMatch&&r.count===r.expected&&r.shown===Math.min(12,r.expected)),{res});});
 await step('mnemonics: ?q=board',async()=>{await page.goto(base+'/mnemonics/index.html?q=board');await waitCards(page);const v=await page.locator('#search').inputValue(),n=await countOf(page);
  check('mnemonics: ?q=board pre-fills search and filters',v==='board'&&n>0&&n<1000&&await page.locator('.word-card[data-id="fc-el-0026"]').count()===1,{value:v,count:n});});
 await step('mnemonics: per-card play',async()=>{await page.goto(base+'/mnemonics/index.html');await waitCards(page);const b=page.locator('[data-play="fc-el-0552"]');await b.click();
  await page.waitForFunction(()=>window.__audios.some(a=>a.src.includes('/audio-trio/ambulance.mp3')&&!a.paused&&a.currentTime>.3),null,{timeout:15000});
  const st=await page.evaluate(()=>window.__audios.filter(a=>a.src.includes('/audio-trio/ambulance.mp3')).map(a=>({src:a.src,t:a.currentTime,paused:a.paused})));
  check('mnemonics: per-card play src ends audio-trio/ambulance.mp3?v=keyword6r2 and progresses >0.3s',st.length===1&&st[0].src.endsWith(`audio-trio/ambulance.mp3?v=${V}`)&&st[0].t>.3&&(await b.getAttribute('aria-pressed'))==='true',{...st[0],button:await b.innerText()});
  await b.click();check('mnemonics: per-card second click pauses',await page.evaluate(()=>window.__audios.every(a=>a.paused))&&(await b.innerText()).includes('繼續'),{button:await b.innerText()});});
 await step('mnemonics: play all',async()=>{await page.locator('#play-all').click();await page.waitForFunction(()=>/正在播放 · 第 1 \/ 1,?000/.test(document.querySelector('#all-status').textContent),null,{timeout:15000});
  const s1=await page.evaluate(()=>({src:window.__audios.find(a=>!a.paused)?.src,playing:document.querySelector('.word-card.is-playing')?.dataset.id,others:window.__audios.filter(a=>!a.paused).length}));
  check('mnemonics: play-all starts at card 1 (ambulance) and highlights it',s1.src?.endsWith(`audio-trio/ambulance.mp3?v=${V}`)&&s1.playing==='fc-el-0552'&&s1.others===1,{...s1,status:await page.locator('#all-status').innerText()});
  await page.locator('#all-next').click();await page.waitForFunction(()=>/正在播放 · 第 2 \/ 1,?000/.test(document.querySelector('#all-status').textContent),null,{timeout:15000});
  await page.waitForFunction(()=>window.__audios.some(a=>!a.paused&&a.currentTime>.2),null,{timeout:15000});
  const s2=await page.evaluate(()=>({src:window.__audios.find(a=>!a.paused)?.src,playing:document.querySelector('.word-card.is-playing')?.dataset.id}));
  check(`mnemonics: play-all next moves to card 2 (${cards[1].word})`,s2.src?.endsWith(`audio-trio/${cards[1].word}.mp3?v=${V}`)&&s2.playing===cards[1].id,{...s2,status:await page.locator('#all-status').innerText()});
  await page.locator('#all-stop').click();check('mnemonics: play-all stop pauses everything',await page.evaluate(()=>window.__audios.every(a=>a.paused))&&await page.locator('#all-progress').getAttribute('value')==='0',{});});
 await step('mnemonics: card-link targets',async()=>{// Every roots .card-link (?q=word) must show its card on results page 1.
  const words=new Set(cards.map(c=>c.word)),linked=[...new Set(groups.flatMap(g=>g.members.map(m=>m.word.toLowerCase()).filter(w=>words.has(w))))];
  const miss=await page.evaluate(ws=>{const s=document.querySelector('#search'),miss=[];for(const w of ws){s.value=w;s.dispatchEvent(new Event('input'));if(![...document.querySelectorAll('#cards .word-card h2')].some(h=>h.textContent.replace(/ /g,'')===w))miss.push(w);}s.value='';s.dispatchEvent(new Event('input'));return miss;},linked);
  check('mnemonics: every roots card-link word appears on results page 1',!miss.length,{linkedWords:linked.length,miss});});
 await step('mnemonics: families link',async()=>{const fam=cards.find(c=>c.word==='blackboard')||cards.find(c=>c.families?.length);const hrefs=[];
  for(const [i,f] of fam.families.entries()){await page.goto(base+'/mnemonics/index.html?q='+encodeURIComponent(fam.word));await waitCards(page);const card=page.locator(`.word-card[data-id="${fam.id}"]`);await card.locator('[data-reveal]').click();
   const link=card.locator('.families a').nth(i),href=await link.getAttribute('href');hrefs.push(href);await link.click();await page.waitForURL(/\/roots\/index\.html#wf-\d{3}$/,{timeout:15000});
   await page.waitForFunction(id=>document.getElementById(id)?.classList.contains('target'),f.id,{timeout:15000});const box=await page.locator('#'+f.id).boundingBox();
   check(`mnemonics: ${fam.word} family link ${f.id} opens roots page with .target group`,href===`../roots/index.html#${f.id}`&&box&&box.y<900&&box.y+box.height>0,{href,url:page.url(),inViewport:!!box&&box.y<900});}
  await page.evaluate(()=>{location.hash='#wf-381';});await page.waitForFunction(()=>document.getElementById('wf-381')?.classList.contains('target'),null,{timeout:10000});check('roots: hashchange to #wf-381 opens that group (page 32) as .target',true,{});});

 // Roots functional checks.
 await step('roots: search spect',async()=>{await page.goto(base+'/roots/index.html');await waitGroups(page);await page.locator('#search').fill('spect');
  check('roots: search "spect" finds the spect group (wf-381)',await page.locator('#wf-381').count()===1,{count:await countOf(page),display:await page.locator('#wf-381 h2').innerText()});await page.locator('#search').fill('');});
 await step('roots: type filter',async()=>{const res=[];for(const t of await options(page,'type')){await page.selectOption('#type',t.value);const types=await page.$$eval('#families .family .type',ts=>ts.map(x=>x.textContent));res.push({type:t.value,expected:t.n,count:await countOf(page),allMatch:types.every(x=>x===t.value),shown:types.length});}
  await page.selectOption('#type','');check('roots: type filter shows only that type with matching counts',res.every(r=>r.allMatch&&r.count===r.expected&&r.shown===12),{res});});
 const logAudio=()=>page.evaluate(()=>{window.__log=[];for(const [i,a] of window.__audios.entries())if(!a.__logged){a.__logged=true;for(const ev of ['playing','pause','seeked','timeupdate'])a.addEventListener(ev,()=>window.__log.push({i,ev,t:a.currentTime,src:a.src}));}});
 for(const [gid,mi] of [['wf-001',1],['wf-003',3]])await step(`roots: member clip ${gid}#${mi}`,async()=>{const parts=timing.get(gid).filter(p=>p.member===mi),en=parts.find(p=>p.role==='english'),zh=parts.find(p=>p.role==='chinese');
  await page.locator(`#${gid}`).scrollIntoViewIfNeeded();await logAudio();await page.locator(`.member[data-group="${gid}"][data-member="${mi}"]`).click();
  await page.waitForFunction(()=>{const i=window.__log.findIndex(e=>e.ev==='playing');return i>=0&&window.__log.slice(i).some(e=>e.ev==='pause');},null,{timeout:20000});
  const log=await page.evaluate(()=>window.__log),pi=log.findIndex(e=>e.ev==='playing'),startT=log[pi].t,pause=log.slice(pi).find(e=>e.ev==='pause');
  const ok=Math.abs(startT-en.start)<=.4&&pause.t>=zh.end&&pause.t<=zh.end+.7&&pause.src.endsWith(`audio/${gid}.mp3?v=${V}`);
  check(`roots: member click ${gid}#${mi} plays from its english start and stops near its chinese end`,ok,{word:en.text,englishStart:en.start,startedAt:+startT.toFixed(3),chineseEnd:zh.end,stoppedAt:+pause.t.toFixed(3),src:pause.src});});
 await step('roots: group play speaking',async()=>{await logAudio();const b=page.locator('[data-play="wf-002"]');await b.click();
  await page.waitForFunction(()=>document.querySelector('.member.speaking'),null,{timeout:20000});const sp=await page.evaluate(()=>{const el=document.querySelector('.member.speaking');return {group:el.dataset.group,member:el.dataset.member,word:el.querySelector('.w').textContent,t:window.__audios.find(a=>!a.paused)?.currentTime};});
  check('roots: group play highlights .member.speaking',sp.group==='wf-002'&&(await b.innerText()).includes('暫停'),{...sp,button:await b.innerText()});
  await b.click();check('roots: group play second click pauses',await page.evaluate(()=>window.__audios.every(a=>a.paused))&&(await b.innerText()).includes('繼續'),{button:await b.innerText()});});
 await step('roots: quiz',async()=>{await page.locator('#quiz').check();const hidden=await page.$$eval('#families .member .zh',zs=>zs.map(z=>getComputedStyle(z).visibility));
  check('roots: quiz hides every .member .zh',hidden.length>0&&hidden.every(v=>v==='hidden'),{count:hidden.length,visible:hidden.filter(v=>v!=='hidden').length});
  await page.locator('.member[data-group="wf-004"][data-member="0"]').click();const after=await page.$$eval('#families .member',ms=>ms.map(m=>({g:m.dataset.group,i:m.dataset.member,v:getComputedStyle(m.querySelector('.zh')).visibility})));
  const clicked=after.find(m=>m.g==='wf-004'&&m.i==='0');check('roots: clicking a member reveals only its .zh in quiz mode',clicked.v==='visible'&&after.filter(m=>m!==clicked).every(m=>m.v==='hidden'),{clicked});
  await page.locator('#quiz').uncheck();});
 await step('roots: grade',async()=>{await page.locator('#wf-001 [data-grade][data-correct="true"]').click();const ls=await page.evaluate(()=>JSON.parse(localStorage.getItem('eq-word-families-v1')||'null')),status=await page.locator('#wf-001 .status').innerText();
  check('roots: grade 記住了 writes localStorage and updates status',ls?.version===1&&ls.progress['wf-001']?.step===1&&ls.progress['wf-001'].reviews===1&&status.includes('已練習 1 次')&&(await page.locator('#notice').innerText()).includes('已記錄')&&(await page.locator('#count').innerText()).includes('已練習 1 組'),{stored:ls?.progress?.['wf-001'],status});});
 await step('roots: play all',async()=>{await page.locator('#play-all').click();await page.waitForFunction(()=>/正在播放 · 第 1 \/ 500 組/.test(document.querySelector('#all-status').textContent),null,{timeout:15000});
  await page.waitForFunction(()=>document.querySelector('#wf-001 .member.speaking'),null,{timeout:20000});const s1=await page.evaluate(()=>({src:window.__audios.find(a=>!a.paused)?.src,playing:document.querySelector('.family.is-playing')?.id}));
  check('roots: play-all starts at wf-001, highlights group and speaking member',s1.src?.endsWith(`audio/wf-001.mp3?v=${V}`)&&s1.playing==='wf-001',{...s1,status:await page.locator('#all-status').innerText()});
  await page.locator('#all-next').click();await page.waitForFunction(()=>/正在播放 · 第 2 \/ 500 組/.test(document.querySelector('#all-status').textContent),null,{timeout:15000});const s2=await page.evaluate(()=>window.__audios.find(a=>!a.paused)?.src);
  check('roots: play-all next moves to wf-002',s2?.endsWith(`audio/wf-002.mp3?v=${V}`),{src:s2});await page.locator('#all-stop').click();check('roots: play-all stop clears playback and highlights',await page.evaluate(()=>window.__audios.every(a=>a.paused)&&!document.querySelector('.member.speaking,.family.is-playing')),{});});
 await step('roots: card-link',async()=>{const link=page.locator('#wf-001 .card-link').first(),href=await link.getAttribute('href'),word=decodeURIComponent(href.match(/q=([^#&]+)/)[1]);await link.click();
  await page.waitForURL(/\/mnemonics\/index\.html\?q=/,{timeout:15000});await waitCards(page);const c=cards.find(x=>x.word===word);
  check('roots: .card-link opens mnemonics page with the target card in results',href===`../mnemonics/index.html?q=${encodeURIComponent(word)}#cards`&&await page.locator('#search').inputValue()===word&&await page.locator(`.word-card[data-id="${c.id}"]`).count()===1,{href,url:page.url(),count:await countOf(page)});});

 // In-browser decode of random MP3s.
 await step('decode',async()=>{const trio=pick(cards,40).map(c=>`/mnemonics/audio-trio/${encodeURIComponent(c.word)}.mp3?v=${V}`),fam=pick(groups,40).map(g=>`/roots/audio/${g.id}.mp3?v=${V}`);
  const res=await page.evaluate(async urls=>{const ctx=new OfflineAudioContext(1,1,44100),out=[];for(const u of urls){try{const r=await fetch(u);if(!r.ok)throw Error('HTTP '+r.status);const b=await ctx.decodeAudioData(await r.arrayBuffer());out.push({u,duration:+b.duration.toFixed(2)});}catch(e){out.push({u,error:String(e)});}}return out;},[...trio,...fam]);
  for(const [label,set] of [['trio',res.slice(0,40)],['family',res.slice(40)]]){const bad=set.filter(r=>r.error||!(r.duration>3)),d=set.map(r=>r.duration||0);
   check(`decode: 40 random ${label} MP3s decode with duration > 3 s`,set.length===40&&!bad.length,{min:Math.min(...d),max:Math.max(...d),bad,files:set.map(r=>r.u.split('/').pop().split('?')[0])});}});

 check('no page errors',!report.pageErrors.length,{pageErrors:report.pageErrors});
 check('no console errors (favicon ignored)',!report.consoleErrors.length,{consoleErrors:report.consoleErrors});
 check('no HTTP 4xx/5xx responses (favicon ignored)',!report.httpErrors.length,{httpErrors:report.httpErrors});
 const failed=report.checks.filter(c=>!c.pass);report.summary={total:report.checks.length,passed:report.checks.length-failed.length,failed:failed.length};
 fs.writeFileSync(path.join(repo,'QA-MNEMONIC-ROOTS-BROWSER-2026-10-12.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report.summary));await browser.close();server.close();process.exit(failed.length?1:0);
})().catch(e=>{console.error(e);server.close();process.exit(1);});
