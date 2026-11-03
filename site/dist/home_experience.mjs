// A small, dependency-free front door. Warm-up evidence never changes placement, XP or crowns.
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const HOME_REVIEW_KEY = 'eq_home_warmup_v1';
export const WARMUP_BANDS = [
  {id:'starter',label:'零基礎',level:'Pre-A1',title:'從第一句開始',href:'quest/#quickstart'},
  {id:'foundation',label:'生活基礎',level:'A1–A2',title:'讓英文走進日常',href:'quest/#learn'},
  {id:'intermediate',label:'進階應用',level:'B1–B2',title:'說清楚，也讀得懂',href:'quest/#exams/toeic'},
  {id:'advanced',label:'學術挑戰',level:'B2–C1',title:'讀懂觀點與證據',href:'quest/#exams/sat'}
];
export const WARMUP_ITEMS = {
  starter:[
    {skill:'字詞',prompt:'這個水果的英文是？',picture:'🍎',options:['apple','book','water'],answer:0,example:'This is an apple.',zh:'這是一顆蘋果。',why:'apple 是蘋果；book 是書；water 是水。an 放在母音「發音」開頭的單數名詞前。',tip:'先說 apple，再試著說完整句。'},
    {skill:'句型',prompt:'「我是學生」中間少了什麼？',text:'I ___ a student.',options:['is','am','are'],answer:1,example:'I am a student.',zh:'我是學生。',why:'主詞 I 搭配 am。he／she／it 搭配 is；you／we／they 搭配 are。',tip:'把 student 換成 teacher，說說自己的新句子。'},
    {skill:'情境',prompt:'早上遇到同學，怎麼打招呼？',options:['Good night.','Thank you.','Good morning.'],answer:2,example:'Good morning, Mia!',zh:'Mia，早安！',why:'morning 是早晨。Good night. 通常是睡前或夜間道別；Thank you. 用來道謝。',tip:'現在對自己說一次 Good morning!'}
  ],
  foundation:[
    {skill:'句型',prompt:'每天的習慣：選出正確動詞。',text:'My brother ___ to school every day.',options:['go','goes','going'],answer:1,example:'My brother goes to school every day.',zh:'我的兄弟每天去上學。',why:'every day 表示習慣，使用現在簡單式。My brother 是第三人稱單數，go 要變成 goes；going 不能在這裡單獨當完整動詞。',tip:'換成 I 時，動詞要變回 go。'},
    {skill:'閱讀',prompt:'根據短文，Leo 今天怎麼上學？',text:'Leo usually walks to school. It is raining today, so his father drives him.',options:['On foot.','By bike.','By car.'],answer:2,example:'His father drives him to school today.',zh:'他爸爸今天開車載他去上學。',why:'usually 是平常；today 問今天。so his father drives him 才是今天的交通方式，不能只看到 walks 就選步行。',tip:'讀題先圈出 today，再找對應句。'},
    {skill:'溝通',prompt:'在咖啡店禮貌點餐，你會說？',options:['Could I have a tea, please?','Where is your tea?','I had tea yesterday.'],answer:0,example:'Could I have a tea, please?',zh:'可以請你給我一杯茶嗎？',why:'Could I have …, please? 是禮貌請求。Where 問地點；yesterday 談昨天，兩者都沒有在點餐。',tip:'用 a sandwich 替換 a tea，再練一次。'}
  ],
  intermediate:[
    {skill:'文法',prompt:'這份工作從過去持續到現在。',text:'She ___ here since 2020.',options:['works','has worked','is working'],answer:1,example:'She has worked here since 2020.',zh:'她從 2020 年起就在這裡工作。',why:'since + 起始時間，搭配現在完成式表示延續到現在。現在簡單式或現在進行式在這個延續語境中不合適。',tip:'用 for six years 表示持續時間也可以。'},
    {skill:'閱讀',prompt:'哪一個結論最有原文支持？',text:'The library extended its evening hours. Visits after 6 p.m. doubled, while daytime visits stayed the same.',options:['Evening access attracted more visits.','All visitors prefer reading at night.','Daytime visits fell by half.'],answer:0,example:'Evening visits increased after the hours were extended.',zh:'延長開放時間後，晚間到訪次數增加了。',why:'晚間到訪倍增支持晚間使用增加；文章沒有調查「所有人」的偏好，也明說白天到訪維持不變。',tip:'把原文事實與自己推測的原因分開。'},
    {skill:'表達',prompt:'選擇合適的讓步連接方式。',text:'___ the high price, the course is popular.',options:['Although','Because','Despite'],answer:2,example:'Despite the high price, the course is popular.',zh:'儘管價格高，這門課仍很受歡迎。',why:'Despite 後面接名詞片語 the high price。Although 與 Because 後面在這裡需要完整子句，例如 although the price is high。',tip:'試著把這句改寫成 Although 開頭。'}
  ],
  advanced:[
    {skill:'論證',prompt:'這個推論最需要補上什麼假設？',text:'Students who joined the reading club scored higher. Therefore, joining the club caused the higher scores.',options:['All books are equally difficult.','The groups were comparable before joining.','Every student enjoys group work.'],answer:1,example:'A pre-existing difference could explain the scores.',zh:'原本就存在的差異可能解釋分數差距。',why:'參加者可能本來就更擅長閱讀。若未控制原有差異，相關不等於因果；書本難度與所有人的喜好不是這個因果跳躍的核心。',tip:'想一想：是否可能是動機同時影響參加與成績？'},
    {skill:'語意',prompt:'tentative 在這裡最接近什麼意思？',text:'The findings are tentative and require replication with a larger sample.',options:['Conclusive.','Irrelevant.','Provisional.'],answer:2,example:'The findings are provisional, pending further evidence.',zh:'這些發現仍屬初步，尚待更多證據。',why:'require replication 表示仍需重複研究，所以 tentative 是暫定的（provisional），不是確定的（conclusive）或不相關的（irrelevant）。',tip:'用上下文的證據判斷語氣強弱。'},
    {skill:'證據',prompt:'哪一項證據最能削弱這個主張？',text:'A city claims its new cycling lanes caused a drop in car use because car trips fell after the lanes opened.',options:['Car use fell by the same amount in comparable cities without new lanes.','Some residents enjoy cycling.','The lanes are painted green.'],answer:0,example:'A shared external factor may explain the decline.',zh:'共同的外在因素可能解釋下降。',why:'沒有新增車道的相似城市也有同幅下降，使其他共同因素成為合理解釋，削弱「車道造成下降」的因果主張。喜好與顏色無法排除替代原因。',tip:'先找主張，再檢查是否有對照組。'}
  ]
};

export function localDay(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
const browserStorage=()=>{try{return globalThis.localStorage;}catch{return null;}};
export function readWarmups(storage = browserStorage()) {
  try {
    const value = JSON.parse(storage?.getItem(HOME_REVIEW_KEY) || '{}');
    return Array.isArray(value?.records) ? value.records.filter(r => /^\d{4}-\d{2}-\d{2}$/.test(r?.day) && WARMUP_BANDS.some(b=>b.id===r.band) && Number.isInteger(r.correct) && r.correct>=0 && r.correct<=3 && r.total===3).slice(-28) : [];
  } catch { return []; }
}
export function saveWarmup(band, answers, storage = browserStorage(), now = new Date()) {
  if (!Object.hasOwn(WARMUP_ITEMS,band) || !Array.isArray(answers) || answers.length!==3 || !answers.every((a,i)=>Number.isInteger(a)&&a>=-1&&a<WARMUP_ITEMS[band][i].options.length)) return null;
  const correct=answers.filter((a,i)=>a===WARMUP_ITEMS[band][i].answer).length;
  const record={day:localDay(now),band,correct,total:3};
  try {
    const records=readWarmups(storage).filter(r=>!(r.day===record.day&&r.band===band));
    storage.setItem(HOME_REVIEW_KEY,JSON.stringify({version:1,records:[...records,record].slice(-28)}));
    return record;
  } catch { return null; }
}

const iconPaths={
  compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
  play:'<path d="m9 5 11 7-11 7V5Z"/>',
  book:'<path d="M12 6c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v15"/>',
  leaf:'<path d="M20 3C7 2 2 9 6 16c6 6 16 0 14-13ZM4 21 16 9"/>',
  spark:'<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/>',
  chart:'<path d="M4 3v17h17M8 16v-4m5 4V8m5 8V4"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  sound:'<path d="M11 4 5 9H2v6h3l6 5V4Zm5 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>'
};
export const homeIcon=(name)=>`<svg class="home-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.spark}</svg>`;

export function renderHomeHero() {
  return `<div class="home-topline"><span class="home-label">YOUR NEXT CHAPTER STARTS HERE</span><span class="home-free"><i></i> 免費探索 · 不需註冊</span></div>
  <section class="home-hero" aria-labelledby="home-heading"><div class="home-hero-copy"><p class="home-kicker">每天一小關，英文多一點。</p><h1 id="home-heading">從第一句 Hello，<br>到自信表達<span class="home-serif">自己。</span></h1><p class="home-intro">不確定從哪裡開始？先找適合你的起點。<br class="home-desktop-break">看懂一個觀念、玩一關，再把英文用出來。</p><div class="home-actions"><a class="home-btn primary" href="quest/#placement">${homeIcon('compass')}測出我的起點 <span>→</span></a><a class="home-btn secondary" href="quest/#quickstart">${homeIcon('play')}直接開始闖關</a></div><p class="home-fine">程度檢測可選 10／20／30 題 · 附解析與建議路線</p><div class="home-proof"><span><b>9</b> 段學習旅程</span><span><b>9,500</b> 張單字卡</span><span><b>6</b> 種能力練習</span></div></div><section class="home-warmup" aria-label="首頁互動暖身"><div class="warmup-top"><span>${homeIcon('spark')} 今日暖身</span><small>先試 3 題</small></div><div id="home-warmup-body">${renderWarmup()}</div></section></section>`;
}

let warmup={band:'starter',index:0,answers:[],stage:'intro',saved:false};
export function renderWarmup() {
  const band=WARMUP_BANDS.find(b=>b.id===warmup.band),items=WARMUP_ITEMS[band.id];
  if(warmup.stage==='intro')return `<div class="warmup-intro"><div class="warmup-emblem" aria-hidden="true">${homeIcon('leaf')}<span>Let's grow!</span></div><h2>你的第一顆學習星星</h2><p>選個難度，直接在這裡試玩。<br>答錯也沒關係，每題都有解說。</p><div class="warmup-bands" role="group" aria-label="暖身難度">${WARMUP_BANDS.map(b=>`<button type="button" data-home-band="${b.id}" aria-pressed="${band.id===b.id}">${b.label}<small>${b.level}</small></button>`).join('')}</div><button class="home-btn primary warmup-start" type="button" data-home-action="start">開始 3 題暖身 <span>→</span></button><small class="warmup-note">暖身不判定程度，不影響闖關 XP。</small></div>`;
  const score=warmup.answers.filter((a,i)=>a===items[i].answer).length;
  if(warmup.stage==='result')return `<div class="warmup-result"><div class="warmup-stars" aria-label="獲得 ${score} 顆星">${[0,1,2].map(i=>`<span class="${i<score?'earned':''}" aria-hidden="true">★</span>`).join('')}</div><p class="home-label">${esc(band.label)} · 暖身完成</p><h2 tabindex="-1">你已經往前一步了！</h2><p>首次獨立答對 <b>${score} / 3</b> 題。${score===3?'試著不看選項，把例句說出來。':'把剛才的例句說一次，再進課程練習。'}</p><p class="warmup-note">${warmup.saved?'本次結果已存於此瀏覽器；同日重玩更新紀錄。':'目前無法儲存，這次仍可繼續學習。'}<br>3 題不足以判定 CEFR 或整體程度。</p><a class="home-btn primary" href="${band.href}">前往適合的練習 →</a><div class="warmup-result-actions"><button type="button" data-home-action="reset">換難度再試</button><a href="quest/#placement">完整程度檢測 →</a></div></div>`;
  const item=items[warmup.index],answered=warmup.answers.length>warmup.index,chosen=warmup.answers[warmup.index],ok=chosen===item.answer;
  return `<div class="warmup-question"><div class="warmup-progress"><span>${band.label} · ${item.skill}</span><b>${warmup.index+1} / 3</b></div><progress max="3" value="${warmup.index}" aria-label="已完成暖身題數"></progress><h2 tabindex="-1">${esc(item.prompt)}</h2>${item.picture?`<div class="warmup-picture" aria-hidden="true">${item.picture}</div>`:''}${item.text?`<p class="warmup-context" lang="en">${esc(item.text)}</p>`:''}<div class="warmup-options" role="group" aria-label="選擇答案">${item.options.map((option,i)=>`<button type="button" data-home-answer="${i}" ${answered?'disabled':''} class="${answered&&i===item.answer?'correct':answered&&i===chosen?'incorrect':''}"><span>${String.fromCharCode(65+i)}</span><b lang="en">${esc(option)}</b>${answered&&i===item.answer?'<em>✓ 正解</em>':answered&&i===chosen?'<em>再學一次</em>':''}</button>`).join('')}</div>${answered?`<div class="warmup-feedback ${ok?'good':''}" role="status"><strong>${ok?'✓ 答對，獲得一顆星！':chosen===-1?'一起學會這一題':'這題可以這樣想'}</strong><p>${esc(item.why)}</p><blockquote><span lang="en">${esc(item.example)}</span><small>${esc(item.zh)}</small></blockquote><p class="warmup-transfer">換你試試：${esc(item.tip)}</p></div><button class="home-btn primary warmup-next" type="button" data-home-action="next">${warmup.index===2?'看看我的成果':'下一題'} →</button>`:`<button class="warmup-skip" type="button" data-home-answer="-1">還不會，先看教學</button>`}</div>`;
}

const CONCEPTS=[
 {id:'be',name:'第一個句子',level:'Pre-A1–A1',title:'英文句子，先找到「誰」與「是」。',lead:'介紹身分或描述狀態，可以先學主詞 + be 動詞 + 補充說明。',chunks:[['I','誰 · 主詞'],['am','是 · be 動詞'],['a student.','身分 · 補充說明']],headers:['主詞','be 動詞','完整例句'],rows:[['I','am','I am ready.'],['He / She / It','is','She is a teacher.'],['You / We / They','are','They are happy.']],trap:'I am happy. ✓　I happy. ✕　描述狀態時，別把 am 漏掉。',task:'把「她是醫生」說成英文，再揭開核對。',answer:'She is a doctor.',href:'#grammar'},
 {id:'time',name:'時態時間線',level:'A1–B1',title:'先找時間，再決定動詞的樣子。',lead:'同一個動作，時間與觀點不同，句子也會改變。時間詞是線索，還要看整個語境。',chunks:[['yesterday','過去 → played'],['every day','習慣 → play'],['tomorrow','未來 → will play']],headers:['想表達什麼','例句','觀察重點'],rows:[['過去完成的事','I played tennis yesterday.','play → played'],['現在的習慣','I play tennis every Sunday.','I 搭配原形'],['此刻正在做','I am playing tennis now.','am + V-ing']],trap:'He plays tennis. ✓　He play tennis. ✕　第三人稱單數的現在習慣要留意 -s。',task:'「我昨天走路上學」怎麼說？',answer:'I walked to school yesterday.',href:'#grammar'},
 {id:'sentence',name:'長句拆解',level:'B1–B2',title:'長句不用硬背，先拆出主幹。',lead:'先找到誰做了什麼，再處理關係子句或其他補充資訊。',chunks:[['The book','主詞'],['that you lent me','補充：你借我的'],['was fascinating.','主幹動詞 + 描述']],headers:['閱讀步驟','這句的線索','理解結果'],rows:[['找主詞','The book','談的是那本書'],['括起補充','that you lent me','限定哪一本書'],['讀回主幹','The book was fascinating.','那本書非常有趣']],trap:'that you lent me 裡的 you 不是整句主詞；先別讓補充資訊搶走主幹。',task:'The students who arrived early helped us. 誰幫了我們？',answer:'The students helped us.（那些提早到的學生幫了我們。）',href:'#knowledge'},
 {id:'argument',name:'論證與證據',level:'B2–C1',title:'讀懂論點，還要問「證據夠嗎？」',lead:'分開主張、證據與隱含假設。看到兩件事一起發生，不代表已證明因果。',chunks:[['Claim','主張：閱讀社有效'],['Evidence','證據：社員分數高'],['Assumption?','假設：原本程度相近']],headers:['檢查哪一層','要問自己的問題','常見風險'],rows:[['主張','作者希望我相信什麼？','把範圍說得太大'],['證據','資料直接支持這句話嗎？','小樣本、缺少對照'],['替代解釋','是否有別的因素造成結果？','把相關當因果']],trap:'社員成績高，可能因為他們原本就更喜歡閱讀；需要比較加入前的程度。',task:'一間店換招牌後業績變好，還需要查什麼？',answer:'例如同期是否有促銷、季節需求或附近競爭者歇業；比較相似店家的變化。',href:'quest/#exams/sat'}
];
let conceptId='be';
export function renderConceptPanel(id=conceptId){
 const c=CONCEPTS.find(c=>c.id===id)||CONCEPTS[0];
 return `<div class="concept-heading"><span class="home-tag">${c.level}</span><h3>${c.title}</h3><p>${c.lead}</p></div><figure class="concept-figure"><div class="concept-chunks">${c.chunks.map(([text,label],i)=>`<div class="chunk chunk-${i}"><strong lang="en">${text}</strong><small>${label}</small></div>`).join('<span class="chunk-plus" aria-hidden="true">+</span>')}</div><figcaption>把結構看清楚，再試著換字、換情境。</figcaption></figure><div class="concept-table-wrap" tabindex="0" role="region" aria-label="${c.name}對照表"><table><caption>${c.name} · 一眼對照</caption><thead><tr>${c.headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${c.rows.map(row=>`<tr>${row.map((cell,i)=>i===0?`<th scope="row">${cell}</th>`:`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="concept-trap"><b>容易卡住的地方</b>${c.trap}</p><details class="concept-recall"><summary>先回想，再核對：${c.task}</summary><p>${c.answer}</p><small>說出答案後，再換一個自己的例子。</small></details><a class="home-text-link" href="${c.href}">繼續學這個觀念 →</a>`;
}

export function renderHomeDiscovery(){return `<section class="home-section home-routes" aria-labelledby="home-route-heading"><div class="home-section-heading"><div><p class="home-label">01 / FIND YOUR PATH</p><h2 id="home-route-heading">每個程度，都有下一步。</h2></div><a class="home-text-link" href="quest/#placement">不知道怎麼選？先測程度 ↗</a></div><div class="home-route-grid">${WARMUP_BANDS.map((b,i)=>`<a class="home-route route-${i}" href="${b.href}"><div class="route-number"><span>0${i+1}</span>${homeIcon(['leaf','book','chart','compass'][i])}</div><span class="route-level">${b.level}</span><h3>${b.title}</h3><p>${['字母音、生活單字、自我介紹','日常對話、核心句型、短文閱讀','長句理解、職場表達、段落寫作','跨文本閱讀、論證推理、學術寫作'][i]}</p><span class="route-cta">${b.label} <b>↗</b></span></a>`).join('')}</div><p class="home-fine">程度標籤是教材編排參考。進階內容目前至 C1；考試路線依需求選擇，通關不等於正式程度認證。</p></section>
 <section class="home-section home-concepts" aria-labelledby="home-concept-heading"><div class="home-section-heading"><div><p class="home-label">02 / MAKE IT CLICK</p><h2 id="home-concept-heading">難懂的英文，換個方式看。</h2></div><a class="home-text-link" href="#knowledge">探索知識點教室 ↗</a></div><div class="concept-layout"><div class="concept-selectors" role="group" aria-label="選擇圖解觀念">${CONCEPTS.map((c,i)=>`<button type="button" data-home-concept="${c.id}" aria-pressed="${conceptId===c.id}" aria-controls="home-concept-panel"><span>0${i+1}</span><b>${c.name}</b><small>${c.level}</small></button>`).join('')}</div><div id="home-concept-panel">${renderConceptPanel()}</div></div></section>
 <section class="home-section home-loop" aria-labelledby="home-loop-heading"><div class="home-section-heading"><div><p class="home-label">03 / SMALL STEPS, REAL PRACTICE</p><h2 id="home-loop-heading">學會，不只是一個答對。</h2></div><p>今天理解，明天還能想起來。</p></div><ol class="home-loop-steps">${[['book','看懂','圖解觀念與雙語例句','先知道為什麼'],['play','試一關','選答、拼字、聽辨與排句','自己提取答案'],['check','弄懂錯因','對照正解、線索與解說','換個情境再用'],['compass','隔天再想','到期複習與雙向回想','讓記憶慢慢長穩']].map(([ic,title,body,note],i)=>`<li><div class="loop-icon">${homeIcon(ic)}<span>0${i+1}</span></div><h3>${title}</h3><p>${body}</p><small>${note}</small></li>`).join('')}</ol><div class="home-loop-bottom"><span>累積 XP、解鎖關卡、挑戰金冠。<br><small>練習紀錄與能力判定分開，依自己的步調前進。</small></span><a class="home-btn secondary" href="quest/#quickstart">開始我的第一小關 →</a></div></section><a class="home-advanced-entry" href="#masterclass"><span class="home-tag">C1 → C2 延伸目標</span><div><strong>從答對題目，走向精準表達。</strong><small>4 個進階作品任務 · 跨文摘要、論證反駁、語域轉換、細膩改寫 · 草稿與自評</small></div><b aria-hidden="true">↗</b></a>`;}

const bindings=new WeakMap();
export function bindHomeExperience(root){
 bindings.get(root)?.abort();const controller=new AbortController();bindings.set(root,controller);
 root.addEventListener('click',event=>{
   const button=event.target.closest('button');if(!button)return;
   if(button.dataset.homeConcept){conceptId=button.dataset.homeConcept;root.querySelectorAll('[data-home-concept]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.homeConcept===conceptId)));root.querySelector('#home-concept-panel').innerHTML=renderConceptPanel();return;}
   if(button.dataset.homeBand && warmup.stage==='intro' && WARMUP_ITEMS[button.dataset.homeBand]) warmup.band=button.dataset.homeBand;
   else if('homeAnswer'in button.dataset && warmup.stage==='question' && warmup.answers.length===warmup.index){const a=Number(button.dataset.homeAnswer);if(!Number.isInteger(a)||a< -1||a>=WARMUP_ITEMS[warmup.band][warmup.index].options.length)return;warmup.answers.push(a);}
   else if(button.dataset.homeAction==='start' && warmup.stage==='intro')warmup.stage='question';
   else if(button.dataset.homeAction==='next' && warmup.answers.length===warmup.index+1){if(warmup.index===2){warmup.stage='result';warmup.saved=!!saveWarmup(warmup.band,warmup.answers);}else warmup.index++;}
   else if(button.dataset.homeAction==='reset')warmup={band:warmup.band,index:0,answers:[],stage:'intro',saved:false};
   else return;
   const body=root.querySelector('#home-warmup-body');if(!body)return;
   const isBand=!!button.dataset.homeBand,wasAnswer='homeAnswer'in button.dataset;
   body.innerHTML=renderWarmup();
   if(isBand)body.querySelector(`[data-home-band="${warmup.band}"]`)?.focus({preventScroll:true});
   else if(wasAnswer)body.querySelector('.warmup-next')?.focus({preventScroll:true});
   else body.querySelector('h2')?.focus({preventScroll:true});
 },{signal:controller.signal});
}
