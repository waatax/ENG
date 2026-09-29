import {AFFIX_LIBRARY} from './affix_library_data.mjs';
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let query='',kind='all',page=0;
const pageSize=24;
export function selectAffixRows(q=query,k=kind){return AFFIX_LIBRARY.filter(r=>(k==='all'||r.kind===k)&&`${r.word} ${r.base} ${r.affix} ${r.zh} ${r.baseZh}`.toLowerCase().includes(q.trim().toLowerCase())).sort((a,b)=>(a.kind==='文法詞尾')-(b.kind==='文法詞尾')||a.word.localeCompare(b.word));}
export function renderAffixLibrary(){
 const found=selectAffixRows(),pages=Math.max(1,Math.ceil(found.length/pageSize));page=Math.min(page,pages-1);
 const derived=AFFIX_LIBRARY.filter(r=>r.kind!=='文法詞尾').length;
 return `<section class="card affix-library" id="affix-library"><p class="pill">可搜尋的構詞與詞形範例庫</p><h2>${AFFIX_LIBRARY.length.toLocaleString('en-US')} 個不同英文詞形，分組練習</h2><p>${derived} 個字首／字尾衍生範例，另有 ${(AFFIX_LIBRARY.length-derived).toLocaleString('en-US')} 個文法詞尾範例。文法詞形包括第三人稱單數、過去式與 -ing；這些不是同等數量的新詞根。</p><div class="word-controls"><label for="affix-query">搜尋單字、基底或中文<input id="affix-query" type="search" value="${e(query)}" placeholder="例如 happy、care、-ment、改善"></label><label for="affix-kind">範例類型<select id="affix-kind"><option value="all" ${kind==='all'?'selected':''}>全部範例</option>${['字首','字尾','文法詞尾'].map(k=>`<option ${kind===k?'selected':''}>${k}</option>`).join('')}</select></label></div><p role="status">符合 ${found.length} 個 · 第 ${page+1} / ${pages} 頁</p><div class="affix-grid">${found.slice(page*pageSize,(page+1)*pageSize).map(r=>`<article class="affix-entry"><p class="pill">${e(r.kind)} · ${e(r.affix)}</p><h3 lang="en">${e(r.word)}</h3><p><strong>${e(r.zh)}</strong></p><p class="affix-formula" lang="en">${e(r.split||`${r.base} → ${r.word}`)}</p><dl><dt>基底詞</dt><dd><span lang="en">${e(r.base)}</span> · ${e(r.baseZh)}</dd><dt>字首／字尾的作用</dt><dd>${e(r.meaning)}</dd></dl><button class="btn quiet" data-speak-word="${e(r.word)}" aria-label="朗讀 ${e(r.word)}">🔊 聽完整單字</button><details><summary>拼字與用法提醒</summary><p>${e(r.note)}</p></details></article>`).join('')||'<p>沒有符合的範例，試著改查基底詞或縮短關鍵字。</p>'}</div><nav class="answer-toolbar" aria-label="構詞範例分頁"><button class="btn" data-affix-page="prev" ${page===0?'disabled':''}>上一頁</button><span>第 ${page+1} / ${pages} 頁</span><button class="btn primary" data-affix-page="next" ${page+1>=pages?'disabled':''}>下一頁</button></nav></section>`;
}
export function handleAffixInput(target,render){
 if(target.id!=='affix-query'&&target.id!=='affix-kind')return false;
 const caret=target.selectionStart;
 if(target.id==='affix-query')query=target.value;else kind=target.value;
 page=0;render();const input=document.getElementById(target.id);input?.focus();if(target.id==='affix-query'&&caret!==null)input?.setSelectionRange?.(caret,caret);return true;
}
export function handleAffixClick(target,render){
 if(!target.dataset.affixPage)return false;
 const max=Math.max(0,Math.ceil(selectAffixRows().length/pageSize)-1);
 page=Math.max(0,Math.min(max,page+(target.dataset.affixPage==='next'?1:-1)));render();document.getElementById('affix-library')?.scrollIntoView({block:'start'});return true;
}
