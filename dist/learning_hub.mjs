import {vocabularyCatalog,esc} from './vocabulary_card.mjs';
import {renderHomeHero,renderHomeDiscovery,bindHomeExperience,homeIcon} from './home_experience.mjs?v=launch20261103r2';
import {computeMasteryPassport} from './mastery_passport.mjs?v=launch20261103r2';
import {ALL_LEVEL_BANDS,renderMasteryPassportSection,exportFullSiteBackup,restoreFullSiteBackup} from './mastery_passport.mjs?v=launch20261103r2';
export const levels=[['','全部程度'],['elem_1000','國小'],['jhs_2000','國中'],['shs_3000','高中'],['toeic','TOEIC'],['toefl','TOEFL'],['sat','SAT'],['gre','GRE'],['gmat','GMAT']];
let tier='',query='',items=null,limit=20,loadError=false,selectedBand='starter';
export function renderLearningHub(){
 const p=computeMasteryPassport();
 return `<article class="learning-hub home-experience">${renderHomeHero()}${p.hasAnyProgress?`<aside class="home-resume" aria-label="接續學習"><div><strong>${esc(p.nextAction.title)}</strong><p>${esc(p.nextAction.desc)}</p></div><a class="home-btn secondary" href="${esc(p.nextAction.href)}">${esc(p.nextAction.cta)}</a></aside>`:''}${renderHomeDiscovery()}
 <section class="home-section" aria-labelledby="home-tools-heading"><div class="home-section-heading"><div><p class="home-label">04 / YOUR LEARNING TOOLKIT</p><h2 id="home-tools-heading">找到適合你的學習方式。</h2></div><a class="home-text-link" href="#words">學單字與搜尋 ↗</a></div><div class="home-tools">${[['#flashcards','spark','每日單字小遠征','先回想，再看答案 · 中英雙向'],['mnemonics/','leaf','圖像聯想記憶','1,000 字 · 口訣與 MP3'],['roots/','book','字根與字族','500 組 · 看懂單字零件'],['#listening','sound','會話與跟讀','聽懂情境，練習自己說']].map(([href,icon,title,desc])=>`<a class="home-tool" href="${href}"><span>${homeIcon(icon)}</span><strong>${title}</strong><small>${desc}</small></a>`).join('')}</div></section>
 ${renderMasteryPassportSection(selectedBand)}<details class="home-picker-toggle"><summary>搜尋 9,500 張單字卡與雙語例句</summary>${renderWordPicker()}</details><details class="hub-library home-library"><summary>完整教材與其他工具</summary><div class="hub-library-links">${[['#knowledge','知識點與圖解'],['#curriculum108','學年課程'],['#grammar','文法教室'],['#diagnostic','程度檢核'],['#wordaudio','MP3 聽讀'],['#wordpractice','拼字與複習'],['#progress','學習紀錄'],['EN/','全英文學習'],['quest/simulation.html','擬真計時模考']].map(([url,label])=>`<a href="${url}">${label} →</a>`).join('')}</div></details><p class="home-source-note">學習設計參考 <a href="https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors" target="_blank" rel="noopener noreferrer">CEFR 能力描述</a>與 <a href="https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication" target="_blank" rel="noopener noreferrer">AERO 提取與間隔練習指南</a>。本站內容不代表官方認證或已驗證的個人學習成效。進度保存在此瀏覽器，可用學習護照匯出備份。</p></article>`;
}
export function renderWordPicker(){return `<section class="hub-picker" id="word-picker"><div class="hub-section-title"><h2>選你要學的單字</h2><a href="#wordaudio">繼續上次聽讀 →</a></div><a class="hub-recall-entry" href="#flashcards"><span aria-hidden="true">✦</span><span><strong>每日單字小遠征</strong><small>先回想、再核對 · 每次最多 10 張 · 中英雙向</small></span><b aria-hidden="true">→</b></a><label for="hub-search">搜尋英文或中文</label><input id="hub-search" type="search" value="${esc(query)}" placeholder="例如 ambulance、救護車" autocomplete="off"><div class="hub-levels" role="group" aria-label="選擇程度">${levels.map(([id,name])=>`<button data-hub-tier="${id}" aria-pressed="${tier===id}">${name}</button>`).join('')}</div><div id="hub-results" aria-live="polite">正在準備單字…</div></section>`;}
function results(){const box=document.querySelector('#hub-results');if(!box)return;
 if(!items){box.innerHTML=loadError?'<p>單字目錄暫時無法載入。</p><button data-hub-retry>重新載入</button><a href="#wordaudio">前往 MP3 選組</a>':'<p>正在準備單字…</p>';return;}
 const q=query.trim().toLowerCase(),matches=items.filter(c=>(!tier||c.tier===tier)&&(!q||c.word.toLowerCase().includes(q)||c.zh.includes(q)||(c.example&&c.example.toLowerCase().includes(q))));
 box.innerHTML=`<p class="hub-count">${matches.length.toLocaleString()} 張字卡${matches.length>limit?` · 先顯示 ${limit} 張`:''}</p><div class="hub-word-results">${matches.slice(0,limit).map(c=>`<a href="#wordaudio/${c.group}/${c.id}" class="hub-word"><span aria-hidden="true">${esc(c.icon)}</span><div><strong lang="en">${esc(c.word)}</strong><small>${esc(c.zh)}</small>${c.example?`<small class="hub-word-ex" lang="en">${esc(c.example)}</small>`:''}</div><b aria-hidden="true">▶</b></a>`).join('')}</div>${matches.length>limit?'<button class="hub-more" data-hub-more>再看 20 張</button>':''}${!matches.length?'<p>沒有符合的單字。試試較短的字詞或切換全部程度。</p>':''}`;
}
function load(){loadError=false;results();vocabularyCatalog().then(data=>{items=data;results();}).catch(()=>{loadError=true;results();});}
let hubController;
export function bindLearningHub(root){hubController?.abort();hubController=new AbortController();const signal=hubController.signal;bindHomeExperience(root);const picker=root.querySelector('#word-picker');if(!picker)return;
 root.querySelector('#hub-search').addEventListener('input',e=>{query=e.target.value;limit=20;results();},{signal});
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.dataset.hubBand){selectedBand=b.dataset.hubBand;const band=ALL_LEVEL_BANDS.find(x=>x.id===selectedBand);if(band){tier=band.defaultTier;limit=20;}const hw=root.querySelector('.hub-highway');if(hw)hw.outerHTML=renderMasteryPassportSection(selectedBand);picker.querySelectorAll('[data-hub-tier]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.hubTier===tier)));results();return;}
  if('hubBackupExport'in b.dataset){const blob=new Blob([exportFullSiteBackup()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`english-quest-full-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);const st=root.querySelector('#hub-backup-status');if(st)st.textContent='已下載全站備份檔案。';return;}
  if('hubTier'in b.dataset){tier=b.dataset.hubTier;limit=20;picker.querySelectorAll('[data-hub-tier]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.hubTier===tier)));results();}
  if('hubMore'in b.dataset){limit+=20;results();}
  if('hubRetry'in b.dataset)load();
 },{signal});
 root.addEventListener('change',async e=>{
  if('hubBackupImport'in e.target.dataset&&e.target.files?.[0]){
   const file=e.target.files[0];if(file.size>8e6){const st=root.querySelector('#hub-backup-status');if(st)st.textContent='備份檔過大，請確認檔案。';return;}
   const res=restoreFullSiteBackup(await file.text());
   const hw=root.querySelector('.hub-highway');if(hw)hw.outerHTML=renderMasteryPassportSection(selectedBand);
   const st=root.querySelector('#hub-backup-status');if(st)st.textContent=res.message;
  }
 },{signal});
 const deferred=picker.closest('details.home-picker-toggle');
 if(deferred&&!deferred.open){deferred.addEventListener('toggle',()=>{if(deferred.open){if(items)results();else load();}},{signal});}
 else if(items)results();else load();
}
