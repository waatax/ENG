// Keep the launch screen independent of the large legacy lesson/flashcard bundle.
import {renderLearningHub,renderWordPicker,bindLearningHub} from './learning_hub.mjs?v=hub1';
let legacy=false;
async function route(){if(legacy)return;const page=location.hash.slice(1).split('/')[0];
 if(page&&!['home','words'].includes(page)){legacy=true;document.querySelector('#app').innerHTML='<main class="learning-hub" style="padding:28px"><p role="status">正在開啟教材…</p></main>';try{await import('./app.js?v=hub1');}catch{legacy=false;document.querySelector('#app').innerHTML='<main style="padding:28px"><h1>教材暫時無法開啟</h1><p>請重新整理，或回首頁再試一次。</p><a href="#home">回首頁</a></main>';}return;}
 document.title=(page==='words'?'學單字':'今天，想怎麼學？')+'｜English Quest';
 const root=document.querySelector('#app');root.innerHTML=`<div class="shell"><aside class="side"><a class="brand" href="#home" style="color:white;text-decoration:none">English<span> Quest.</span></a><details class="site-menu"><summary>學習導覽</summary><nav class="nav"><a href="#home">⌂ 首頁</a><a href="#words">Aa 學單字</a><a href="quest/">✦ 玩遊戲</a><a href="#wordaudio">♫ MP3 聽讀</a><a href="mnemonics/">💡 聯想記憶</a><a href="roots/">🌱 字根字族</a><a href="#knowledge">▤ 教材與工具</a></nav></details></aside><div class="main-wrapper"><main class="main" id="main-content">${page==='words'?`<article class="learning-hub"><h1>學單字</h1><p class="hub-lead">選程度或搜尋，直接從你要的單字開始聽讀。</p>${renderWordPicker()}</article>`:renderLearningHub()}</main></div></div>`;bindLearningHub(root);window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);void route();
