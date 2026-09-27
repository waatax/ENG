import {FLASHCARD_DATABASE as cards, FLASHCARD_TIERS as tiers} from './flashcards.mjs';
import {teachingCard} from './flashcard_quality.mjs';
import {createWordProgress} from './school_word_progress.mjs';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const FULL_WORD_STORE='english-quest-7700-practice-v1';
export const normalizeWord=s=>String(s).normalize('NFKC').trim().toLowerCase().replace(/[‘’]/g,"'").replace(/[‐‑–—]/g,'-').replace(/\s+/g,' ');
const meanings=s=>String(s).split(/[、；;，,\/（）()]/).map(x=>x.trim()).filter(Boolean);
export function drawWordSession(list,size,rng=Math.random,previous=[],isStudied=()=>false,order='random'){
 const shuffled=[...list];
 for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
 // Deduplicate headwords as well as IDs when mixing tiers.
 const unique=[...new Map(shuffled.map(c=>[normalizeWord(c.word),c])).values()];
 const recent=new Set(previous.map(c=>normalizeWord(c.word)));
 const available=unique.filter(c=>!recent.has(normalizeWord(c.word)));
 const candidates=available.length>=size?available:unique;
 const sorted=order==='newfirst'?[...candidates.filter(c=>!isStudied(c.id)),...candidates.filter(c=>isStudied(c.id))]:candidates;
 return sorted.slice(0,size);
}
export function wordChoices(card,pool,rng=Math.random){
 const target=new Set(meanings(card.zh));const seen=new Set([card.zh]);
 const choices=[{text:card.zh,right:true}];
 // Walk a random cyclic order without sorting or copying the entire database.
 const start=Math.floor(rng()*pool.length);
 for(let i=0;i<pool.length&&choices.length<4;i++){
  const c=pool[(start+i)%pool.length];
  if(normalizeWord(c.word)===normalizeWord(card.word)||seen.has(c.zh)||meanings(c.zh).some(m=>target.has(m)))continue;
  seen.add(c.zh);choices.push({text:c.zh,right:false});
 }
 for(let i=choices.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
 return choices;
}
export function createFullWordPractice(database=cards,storage=globalThis.localStorage,now=()=>Date.now(),rng=Math.random){
 const progress=createWordProgress(database,storage,now,FULL_WORD_STORE);
 let tier='all',mode='meaning',filter='all',order='random',size=20,session=null,previous=[],index=0,feedback=null,options=[],rightCount=0,reveal=false;
 const pool=()=>database.filter(c=>tier==='all'||c.tier===tier);
 const eligible=()=>pool().filter(c=>filter==='new'?!progress.get(c.id):filter==='due'?progress.isDue(c.id):true);
 const current=()=>session?.[index];
 function prepare(){feedback=null;reveal=false;options=current()?wordChoices(current(),pool(),rng):[];}
 function start(){
  session=drawWordSession(eligible(),size,rng,previous,id=>Boolean(progress.get(id)),order);
  previous=session;index=0;rightCount=0;prepare();
 }
 function answer(value){
  const card=current();if(!card||feedback||mode==='recall')return false;
  if(mode==='meaning'&&(!Number.isInteger(value)||!options[value]))return false;
  if(mode==='spell'&&!normalizeWord(value))return false;
  const right=mode==='spell'?normalizeWord(value)===normalizeWord(card.word):options[value].right;
  progress.record(card.id,right);if(right)rightCount++;
  feedback={right};return true;
 }
 function action(d){
  if(d.wpStart){start();return true;}
  if(d.wpHome){session=null;return true;}
  if(d.wpReveal&&current()){reveal=true;return true;}
  if(d.wpRate&&mode==='recall'&&reveal&&!feedback&&current()){
   const right=d.wpRate==='yes';progress.record(current().id,right);if(right)rightCount++;feedback={right};return true;
  }
  if(d.wpChoice!==undefined)return answer(Number(d.wpChoice));
  if(d.wpNext&&feedback){index++;prepare();return true;}
  return false;
 }
 function setting(key,value){
  if(key==='tier'&&(value==='all'||tiers.some(t=>t.id===value)))tier=value;
  else if(key==='mode'&&['meaning','spell','recall'].includes(value))mode=value;
  else if(key==='filter'&&['all','new','due'].includes(value))filter=value;
  else if(key==='size'&&['20','40'].includes(String(value)))size=Number(value);
  else if(key==='order'&&['random','newfirst'].includes(value))order=value;
  else return false;
  session=null;return true;
 }
 function render(){
  const studied=database.filter(c=>progress.get(c.id)).length;
  const due=database.filter(c=>progress.isDue(c.id)).length;
  const c=current(),word=c?teachingCard(c):null;
  const availableCount=new Set(eligible().map(c=>normalizeWord(c.word))).size;
  const header=`<header><p class="pill">完整 ${database.length.toLocaleString('en-US')} 張 · 七級字卡學習</p><h1>7,700 張字卡，每天練一小組</h1><p>全部詞卡皆可翻卡、測字義、練拼字與安排複習。可選 20 題快速測驗或 40 題完整測驗，隨機抽題；同份測驗不重複英文單字，選項順序也會隨機排列。</p><div class="wp-stats"><span>卡庫 <strong>${database.length}</strong></span><span>已練習 <strong>${studied}</strong></span><span>尚未練習 <strong>${database.length-studied}</strong></span><span>到期 <strong>${due}</strong></span></div><p class="small">數量為分級詞卡張數；同一單字可能出現在不同級別。進度儲存在此瀏覽器，翻看不計答對。</p></header>`;
  let body='';
  if(!session){
   body=`<section class="card"><div class="word-controls"><label>字卡級別<select data-wp-setting="tier"><option value="all">全部 7,700 張</option>${tiers.map(t=>`<option value="${t.id}" ${tier===t.id?'selected':''}>${esc(t.name)}（${database.filter(c=>c.tier===t.id).length} 張）</option>`).join('')}</select></label><label>練習方式<select data-wp-setting="mode">${[['meaning','英文 → 選中文'],['spell','中文 → 拼英文'],['recall','翻卡回想']].map(([v,n])=>`<option value="${v}" ${mode===v?'selected':''}>${n}</option>`).join('')}</select></label><label>學習清單<select data-wp-setting="filter">${[['all','全部字卡'],['new','尚未練習'],['due','到期複習']].map(([v,n])=>`<option value="${v}" ${filter===v?'selected':''}>${n}</option>`).join('')}</select></label><label>測驗長度<select data-wp-setting="size"><option value="20" ${size===20?'selected':''}>20 題快速測驗</option><option value="40" ${size===40?'selected':''}>40 題完整測驗</option></select></label><label>抽題方式<select data-wp-setting="order"><option value="random" ${order==='random'?'selected':''}>隨機抽題・單份不重複</option><option value="newfirst" ${order==='newfirst'?'selected':''}>優先未練習・隨機不重複</option></select></label></div><p>符合清單：${eligible().length} 張字卡，去除跨級同字後可出 ${availableCount} 題。</p><p>${availableCount>=size?`題庫充足：本次 ${size} 題。`:`目前只剩 ${availableCount} 個不同單字，本次出 ${availableCount} 題，不用重複題補足。`}</p><p class="small">同份不重複；候選題庫足夠時，也避開本頁上一次抽出的整份題目。重新整理後不保留上一份抽題清單。</p><button class="btn primary" data-wp-start="true" ${!eligible().length?'disabled':''}>開始 ${Math.min(size,availableCount)} 題${size===20?'快速':'完整'}測驗</button><p>答錯：10 分鐘後再練。到期答對：逐步安排 1、3、7、14、30 天後複習。提前答對不跳級。</p><a href="#flashcards">搜尋與瀏覽完整 7,700 張字卡 →</a></section>`;
  }else if(!c){
   body=`<section class="card" role="status"><h2>這一組完成了</h2><p>${mode==='recall'?'自評能回想':'答對'} ${rightCount} / ${session.length} 張${session.length?`（${Math.round(rightCount/session.length*100)}%）`:''}。每張卡的下次複習時間已安排。</p><button class="btn primary" data-wp-start="true">再抽 ${size} 題</button><button class="btn quiet" data-wp-home="true">選擇級別與模式</button></section>`;
  }else{
   body=`<section class="card wp-question"><p>第 ${index+1} / ${session.length} 張 · ${esc(tiers.find(t=>t.id===c.tier)?.name||c.tier)} · ${esc(c.category)}</p><h2 lang="${mode==='spell'?'zh-Hant':'en'}">${esc(mode==='spell'?c.zh:c.word)}</h2>${mode==='spell'?`<p>請拼出本卡的英文。詞性：${esc(c.pos)} · ${c.word.replace(/[^a-z]/gi,'').length} 個英文字母 · ${c.word.trim().split(/\s+/).length} 個詞</p><form class="wp-spelling"><label for="wp-answer">英文單字或片語</label><input id="wp-answer" name="answer" autocomplete="off" autocapitalize="none" spellcheck="false" required ${feedback?'disabled':''}><button class="btn primary" ${feedback?'disabled':''}>檢查拼字</button></form>`:`<button class="btn quiet" data-speak-word="${esc(c.word)}">🔊 聽單字</button>`}
    ${mode==='meaning'?`<fieldset class="lesson-check"><legend>選出本卡記錄的中文意思</legend>${options.map((o,i)=>`<button class="btn quiet lesson-option" data-wp-choice="${i}" ${feedback?'disabled':''}>${esc(o.text)}</button>`).join('')}</fieldset>`:''}
    ${mode==='recall'&&!reveal?'<p>先回想中文意思，再翻卡核對。</p><button class="btn primary" data-wp-reveal="true">翻卡查看答案</button>':''}
    ${feedback||reveal?`<div class="word-feedback" role="status"><h3>${feedback?(feedback.right?'✓ 已記錄答對':'再記一次'):'核對答案'}：<span lang="en">${esc(c.word)}</span></h3><p>${esc(c.pos)} · ${esc(c.zh)}</p><button class="btn quiet" data-speak-word="${esc(c.word)}">🔊 聽正確單字</button>${word.example?`<blockquote lang="en">${esc(word.example)}</blockquote><p>${esc(word.exampleZh)}</p>`:''}<p>記憶練習：看「${esc(c.zh)}」→ 遮住英文 → 說出並寫下 <span lang="en">${esc(c.word)}</span> → 隔天再測。</p>${feedback?`<p>下次複習：${new Date(progress.get(c.id).due).toLocaleString('zh-TW')}</p>`:''}</div>`:''}
    ${mode==='recall'&&reveal&&!feedback?'<div class="lesson-links"><button class="btn quiet" data-wp-rate="no">想不起來</button><button class="btn primary" data-wp-rate="yes">遮住後能回想</button></div>':''}
    ${feedback?'<button class="btn primary" data-wp-next="true">下一張 →</button>':''}<button class="btn quiet" data-wp-home="true">返回清單（保留已答進度）</button></section>`;
  }
  return `<article class="lesson-page full-word-practice">${header}${progress.warning?`<p role="alert">${esc(progress.warning)}</p>`:''}${body}</article>`;
 }
 return {render,action,setting,answer,progress,current,choices:()=>options.map(o=>({...o}))};
}
const practice=createFullWordPractice();
export const renderFullWordPractice=()=>practice.render();
export function handleFullWordClick(button,render){if(!practice.action(button.dataset))return false;render();return true;}
export function handleFullWordChange(target,render){if(!target.dataset.wpSetting||!practice.setting(target.dataset.wpSetting,target.value))return false;render();return true;}
export function handleFullWordSubmit(form,render){if(!form.matches('.wp-spelling'))return false;const input=form.querySelector('[name="answer"]');if(practice.answer(input.value))render();return true;}
