export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let catalogPromise;
export function vocabularyCatalog(){return catalogPromise??=fetch(new URL('vocabulary-catalog.json?v=hub1',import.meta.url)).then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).catch(e=>{catalogPromise=null;throw e;});}
export function wordAtTime(words,time){const word=words?.find(w=>time>=w.start&&time<w.end);if(!word)return null;const round=word.repetitions.filter(r=>r.en<=time).at(-1)||word.repetitions[0];return {word,back:time>=round.zh,round:round.round};}
let panel,current,key='',manual=false,back=false,collapsed=false,controls={},loadEpoch=0;
function mount(){if(panel)return;panel=document.createElement('aside');panel.id='vocabulary-player';panel.hidden=true;panel.setAttribute('aria-label','播放中的單字卡');document.body.append(panel);
 panel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.vc==='flip'){manual=true;back=!back;draw();}
 if(b.dataset.vc==='auto'){manual=false;back=!!controls.back;draw();}
 if(b.dataset.vc==='collapse'){collapsed=!collapsed;draw();}
 if(b.dataset.vc==='close'){controls.stop?.();hideVocabularyCard();}
 if(b.dataset.vc==='toggle')controls.toggle?.();
 });
 window.addEventListener('hashchange',hideVocabularyCard);window.addEventListener('pagehide',hideVocabularyCard);
}
function draw(){if(!current||!panel)return;const en=controls.lang==='en',focused=panel.contains(document.activeElement)?document.activeElement.dataset.vc:null;panel.hidden=false;panel.classList.toggle('compact',collapsed);
 panel.innerHTML=`<div class="vc-top"><strong>${esc(controls.label||(en?'Listening card':'隨聲字卡'))}</strong><div><button data-vc="collapse" aria-expanded="${!collapsed}" aria-label="${collapsed?(en?'Expand':'展開'):(en?'Collapse':'收合')}${en?' card':'字卡'}">${collapsed?(en?'Expand':'展開'):(en?'Collapse':'收合')}</button><button data-vc="close" aria-label="${en?'Stop and close card':'停止播放並關閉字卡'}">✕</button></div></div>${collapsed?`<p lang="en">${esc(current.word)}</p>`:`<button class="vc-face ${back?'back':''}" data-vc="flip" aria-label="${esc(back?(current.zh||current.definition):current.word)} · ${en?(back?'Flip to word':'Flip to meaning'):('翻面：'+(back?'看英文':'看意思與記憶方式'))}">${back?`<strong>${esc(current.zh||current.definition||'請參考本頁說明')}</strong><span>${esc(current.tip||'用這個字說一句自己的例句，再遮住答案回想。')}</span>${current.example?`<small lang="en">${esc(current.example)}</small>`:''}`:`<span class="vc-picture" aria-hidden="true">${esc(current.icon||'📖')}</span><strong lang="en">${esc(current.word)}</strong><small>${en?'Recall the meaning · Tap to flip':'看圖，先想意思 · 點卡翻面'}</small>`}</button><div class="vc-tools">${controls.toggle?`<button data-vc="toggle">${controls.paused?'▶ 繼續':'Ⅱ 暫停'}</button>`:''}<button data-vc="auto" ${manual?'':'disabled'}>${en?(manual?'Follow audio':'Following audio'):(manual?'恢復自動翻面':'跟隨播放')}</button></div>`}`;
 if(focused)panel.querySelector(`[data-vc="${focused}"]`)?.focus({preventScroll:true});
}
export function hideVocabularyCard(){loadEpoch++;if(panel)panel.hidden=true;current=null;key='';}
export function showVocabularyCard(card,options={}){if(typeof document==='undefined'||!document.body||typeof document.createElement!=='function')return;
 mount();panel.setAttribute('aria-label',options.lang==='en'?'Current vocabulary card':'播放中的單字卡');const nextKey=String(card.id||card.word||card.en);const changed=key!==nextKey;
 const oldBack=back,oldPaused=controls.paused,oldLabel=controls.label;controls=options;
 if(changed){key=nextKey;manual=false;current={...card,word:card.word||card.en};const epoch=++loadEpoch;
 vocabularyCatalog().then(items=>{if(epoch!==loadEpoch)return;const found=items.find(c=>c.id===card.id)||items.find(c=>c.word.toLowerCase()===current.word.toLowerCase());if(found){current={...found,...current,icon:current.icon||found.icon,tip:current.tip||found.tip};draw();}}).catch(()=>{});
 }
 if(!manual)back=!!options.back;
 if(changed||oldBack!==back||oldPaused!==options.paused||oldLabel!==options.label||panel.hidden)draw();
}
