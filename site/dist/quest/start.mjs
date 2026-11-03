// Show loading before the module graph is fetched, and recover visibly if it cannot load.
const root=document.querySelector('#game');
try { await import('./view.mjs?v=launch20261103r2'); }
catch {
 root.innerHTML='<main class="boot"><h1>課程暫時無法開啟</h1><p>請確認網路後重新整理。你的已儲存進度仍保留在此瀏覽器。</p><p><button class="btn primary" type="button" id="quest-retry">重新開啟闖關</button> · <a href="../">回學習首頁</a></p></main>';
 root.querySelector('#quest-retry').addEventListener('click',()=>location.reload());
}
