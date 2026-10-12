import { escapeJourney as e, relatedLessons } from './learning_journey.mjs';
export const supplements = {
 sounds:['先聽再看字','同一句先聽兩遍，記下聽到的重音詞，再開文字核對。','不要把中文近音當成英文發音；以英文音訊核對母音與尾音。','錄下自己的跟讀，比較哪個字的重音改變了意思。'],
 words:['聲音、意思、用法一起記','先用聲音提示想起詞義，再在例句中找詞性與搭配。','中文口訣是提取提示；能背口訣卻說不出英文意思，仍需重練。','遮住中文，用本課一個詞描述你今天做的事。'],
 sentences:['從意思決定形式','先找主詞與動詞，再看時間、數量與說話目的。','規則有使用條件；比較兩個例句，確認改變的是哪個條件。','把例句改成否定與問句，逐一核對助動詞及動詞形式。'],
 reading:['每個判斷都找證據','先概括段落，再圈出轉折、指涉與支持主旨的句子。','合理常識不等於文章證據；推論不能超過文字支持的範圍。','用一句話寫主旨，再抄下支持它的短語，解釋兩者的關係。'],
 application:['先確定對象與目的','先寫必要訊息，再調整語氣、順序與對方可採取的行動。','文法正確不一定適合情境；檢查對方是否知道如何回應。','把本課表達分別改寫給朋友與老師，說明語氣差異。'],
 integrated:['把錯誤變成補強線索','先獨立作答，再記錄線索、錯因與下次的判斷步驟。','看懂解析不等於能獨立完成；隔一段時間換題再試。','選一個錯誤，分類為字詞、句法、證據或時間，再回到相關教材。']
};
export function mountStudyWorkspace(main, entry, container, map) {
 const data=supplements[entry.domain];
 const tools=document.createElement('div');tools.className='study-toolbar';
 tools.innerHTML='<strong>學習工作台</strong><button class="btn" data-study-wide aria-pressed="false">橫式寬版</button><button class="btn" data-study-focus aria-pressed="false">專注閱讀</button><button class="btn" data-study-full>全螢幕</button><span role="status" data-study-message></span>';
 container.prepend(tools);container.classList.add('study-workspace');map.open=true;
 const aside=document.createElement('aside');aside.className='study-support card';aside.setAttribute('aria-label','補充學習與本課筆記');
 aside.innerHTML=`<p class="eyebrow">補充學習指南</p><h2>${e(data[0])}</h2><p>${e(data[1])}</p><details><summary>容易忽略的地方</summary><p>${e(data[2])}</p></details><details><summary>換情境試一次</summary><p>${e(data[3])}</p></details><h3>連結相關知識</h3><ul>${relatedLessons(entry).map(c=>`<li><a href="${c.link}">${e(c.title)}</a></li>`).join('')}</ul><label for="study-note">本課筆記 · 用自己的話說明</label><textarea id="study-note" rows="6" placeholder="觀念 → 例句 → 我的疑問"></textarea><p class="small" role="status" data-note-status>筆記保存在此瀏覽器，可下載備份。</p><button class="btn" data-note-export>下載本課筆記</button>`;
 container.append(aside);
 const message=tools.querySelector('[data-study-message]'),note=aside.querySelector('textarea'),status=aside.querySelector('[data-note-status]');
 const key='english-quest-note:'+entry.link;
 try{note.value=localStorage.getItem(key)||'';}catch{status.textContent='此瀏覽器無法讀取筆記，請下載備份。';}
 note.addEventListener('input',()=>{try{localStorage.setItem(key,note.value);status.textContent='本課筆記已儲存。';}catch{status.textContent='無法儲存，請下載本課筆記。';}});
 aside.querySelector('[data-note-export]').onclick=()=>{const url=URL.createObjectURL(new Blob([entry.title+'\n'+location.href+'\n\n'+note.value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='English-Quest-note.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 const wide=tools.querySelector('[data-study-wide]'),focus=tools.querySelector('[data-study-focus]');
 const apply=()=>{wide.setAttribute('aria-pressed',String(document.body.classList.contains('study-wide')));focus.setAttribute('aria-pressed',String(document.body.classList.contains('study-focus')));};
 wide.onclick=()=>{document.body.classList.toggle('study-wide');apply();};focus.onclick=()=>{document.body.classList.toggle('study-focus');apply();};apply();
 const full=tools.querySelector('[data-study-full]');
 const sync=()=>{full.textContent=document.fullscreenElement?'離開全螢幕':'全螢幕';};
 full.onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else message.textContent='此瀏覽器不支援全螢幕，請使用橫式寬版。';}catch{message.textContent='無法啟用全螢幕，仍可使用橫式寬版。';}};
 document.addEventListener('fullscreenchange',sync);sync();
 return ()=>document.removeEventListener('fullscreenchange',sync);
}
