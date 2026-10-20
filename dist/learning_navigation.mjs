// Shared DOM navigation: content stays owned by each existing lesson renderer.
import { journey, journeyCatalog, escapeJourney as e, relatedLessons, journeyDomain } from './learning_journey.mjs';
import { skillFramework } from './learning_framework.mjs';
import { mountStudyWorkspace } from './study_workspace.mjs';
import { mountLessonLab } from './lesson_lab.mjs';
let dispose = () => {};
let lastRoute = '';
export function enhanceLearningPage(root) {
  dispose();
  document.body.classList.remove('study-wide','study-focus');
  const main = root.querySelector('#main-content');
  if (!main) return;
  const title = main.querySelector('h1');
  if (title) document.title = title.textContent.trim() + '｜English Quest';
  if (title && lastRoute && lastRoute!==location.hash) {
    title.tabIndex=-1;title.focus({preventScroll:true});
  }
  lastRoute=location.hash;
  const entry = journeyCatalog.find(c=>c.link === location.hash);
  if (entry && title?.textContent.trim()===entry.title) {
    const framework=skillFramework[entry.domain];
    journey.visit(entry.link);
    const container = main.querySelector('article') || main;
    const header = container.querySelector('header');
    const bar = document.createElement('section');
    bar.className = 'journey-context';
    bar.setAttribute('aria-label','教材位置與學習工具');
    bar.innerHTML = `<nav aria-label="教材位置"><a href="#knowledge">所有教材</a><span aria-hidden="true"> / </span><span>${e(journeyDomain(entry))}</span><span aria-hidden="true"> / </span><span>${e(entry.kind)}</span></nav><p><strong>這次練習的能力：</strong>${e(framework.goal)}</p><details><summary>學習前，先確認基礎</summary><p>${e(framework.prior)}</p><a href="${framework.repair}">${e(framework.repairLabel)} →</a></details><div class="learning-actions"><button type="button" class="btn" data-journey-save aria-pressed="${!!journey.records[entry.link]?.saved}">${journey.records[entry.link]?.saved?'已收藏':'收藏本課'}</button><a class="btn quiet" href="#knowledge">選擇其他教材</a></div><p class="small" data-journey-status role="status">${e(journey.warning || '先理解例句 → 不看教材回想 → 換個情境應用')}</p>`;
    if (header) header.after(bar); else container.prepend(bar);
    const status = bar.querySelector('[data-journey-status]');
    bar.querySelector('button').addEventListener('click',event=>{
      journey.toggle(entry.link);
      const saved=!!journey.records[entry.link]?.saved;
      event.currentTarget.setAttribute('aria-pressed',String(saved));
      event.currentTarget.textContent=saved?'已收藏':'收藏本課';
      status.textContent=journey.warning || (saved?'已加入首頁收藏。':'已移除收藏。');
    });
    const recall = document.createElement('section');
    recall.className = 'journey-recall card';
    recall.innerHTML = `<p class="eyebrow">讀完後，留一分鐘給自己</p><h2>合上教材，你能說明嗎？</h2><ol><li>${e(framework.recall)}</li><li>${e(framework.transfer)}</li><li>說出一個容易犯的錯，解釋如何修正。</li></ol><div class="learning-actions"><button class="btn" type="button" data-recall="again">還不熟，明天再練</button><button class="btn primary" type="button" data-recall="remembered">能說明，安排下次複習</button></div><p class="small" role="status" data-recall-status>依你的回想自評安排複習；不會把閱讀次數當作精熟。</p><h3>接著可以學</h3><ul>${relatedLessons(entry).map(c=>`<li><a href="${c.link}">${e(c.title)}</a><small>${e(c.kind)} · ${e(c.stage)}</small></li>`).join('')}</ul>`;
    recall.querySelectorAll('[data-recall]').forEach(button=>button.addEventListener('click',()=>{
      journey.recall(entry.link,button.dataset.recall==='remembered');
      recall.querySelector('[data-recall-status]').textContent=journey.warning || `已安排 ${new Date(journey.records[entry.link].due).toLocaleDateString('zh-TW')} 再回想。回首頁可查看複習安排。`;
    }));
    container.append(recall);
    mountLessonLab(container,entry);
  }
  const headings = [...main.querySelectorAll('h2')].filter(h=>!h.closest('nav, .knowledge-card, .knowledge-home'));
  if (!headings.length || main.querySelector('.knowledge-home, .word-mp3')) return;
  const panel = document.createElement('details');
  panel.className = 'reading-map';
  const summary = document.createElement('summary');
  summary.textContent = '本頁學習目錄 · 選一段開始';
  panel.append(summary);
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label','本頁學習目錄');
  headings.forEach((h,i)=>{
    if (!h.id) h.id = 'reading-section-'+i;
    const button = document.createElement('button');
    button.type='button'; button.className='btn quiet';
    button.textContent=h.textContent.trim();
    button.addEventListener('click',()=>{
      let parent=h.parentElement;
      while(parent && parent!==main){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement;}
      h.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      h.tabIndex=-1; h.focus({preventScroll:true});
    });
    nav.append(button);
  });
  panel.append(nav);
  const label=document.createElement('p');
  label.className='small';label.textContent='閱讀位置不代表精熟。先理解，再不看答案做一次檢核。';
  panel.append(label);
  const meter=document.createElement('progress');
  meter.max=headings.length;meter.value=0;meter.setAttribute('aria-label','目前閱讀段落');panel.append(meter);
  const container=main.querySelector('article')||main;
  const header=container.querySelector('header');
  if(header)header.after(panel);else container.prepend(panel);
  const buttons=[...nav.children];
  let scheduled=0;
  const update=()=>{
    scheduled=0;
    let active=0;
    headings.forEach((h,i)=>{if(h.getBoundingClientRect().top<=180) active=i;});
    buttons.forEach((b,i)=>{if(i===active)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current');});
    meter.value=active+1;
  };
  const onScroll=()=>{if(!scheduled)scheduled=requestAnimationFrame(update);};
  window.addEventListener('scroll',onScroll,{passive:true});update();
  const workspaceDispose=entry ? mountStudyWorkspace(main,entry,container,panel) : ()=>{};
  dispose=()=>{workspaceDispose();window.removeEventListener('scroll',onScroll);cancelAnimationFrame(scheduled);};
}
