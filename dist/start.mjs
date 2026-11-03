// Launch the homepage and advanced course without downloading the legacy lesson/flashcard bundle.
import {renderLearningHub,renderWordPicker,bindLearningHub} from './learning_hub.mjs?v=advanced20261103';
let legacy=false,advancedApi,routeVersion=0;
const root=document.querySelector('#app');
const wide=window.matchMedia('(min-width:769px)');
function shell(content){return `<div class="shell"><aside class="side"><a class="brand" href="#home" style="color:white;text-decoration:none">English<span> Quest.</span></a><details class="site-menu"${wide.matches?' open':''}><summary>學習導覽</summary><nav class="nav"><a href="#home">⌂ 首頁</a><a href="#words">Aa 學單字</a><a href="quest/">✦ 玩遊戲</a><a href="#advanced">◇ C1→C2 精進課程</a><a href="#wordaudio">♫ MP3 聽讀</a><a href="mnemonics/">💡 聯想記憶</a><a href="roots/">🌱 字根字族</a><a href="#knowledge">▤ 教材與工具</a></nav></details></aside><div class="main-wrapper"><main class="main" id="main-content">${content}</main></div></div>`;}
function renderAdvanced(){const main=root.querySelector('.main');main.innerHTML=advancedApi.renderAdvancedCourse();advancedApi.bindAdvancedCourse(root,renderAdvanced);}
async function route(){
 if(legacy)return;
 const version=++routeVersion,page=location.hash.slice(1).split('/')[0];advancedApi?.disposeAdvancedCourse(root);
 if(page==='advanced'){
  root.innerHTML=shell('<p role="status">正在開啟精進課程…</p>');
  try{advancedApi=await import('./advanced_academy.mjs?v=advanced20261103');if(version!==routeVersion)return;document.title='C1→C2 精進課程｜English Quest';renderAdvanced();}
  catch{if(version===routeVersion)root.innerHTML=shell('<h1>課程暫時無法開啟</h1><p>請確認網路後重新整理，或<a href="#home">回學習首頁</a>。</p>');}
  window.scrollTo(0,0);return;
 }
 if(page&&!['home','words'].includes(page)){
  legacy=true;root.innerHTML='<main class="learning-hub" style="padding:28px"><p role="status">正在開啟教材…</p></main>';
  try{await import('./app.js?v=advanced20261103');}catch{legacy=false;root.innerHTML='<main style="padding:28px"><h1>教材暫時無法開啟</h1><p>請重新整理，或回首頁再試一次。</p><a href="#home">回首頁</a></main>';}
  return;
 }
 document.title=(page==='words'?'學單字':'從第一句 Hello，到自信表達自己')+'｜English Quest';
 root.innerHTML=shell(page==='words'?`<article class="learning-hub"><h1>學單字</h1><p class="hub-lead">選程度或搜尋，直接從你要的單字開始聽讀。</p>${renderWordPicker()}</article>`:renderLearningHub());
 bindLearningHub(root);window.scrollTo(0,0);
}
wide.addEventListener('change',event=>{const menu=root.querySelector('.site-menu');if(menu)menu.open=event.matches;});
window.addEventListener('hashchange',route);void route();
