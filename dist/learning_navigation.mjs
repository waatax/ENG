// Shared DOM navigation: content stays owned by each existing lesson renderer.
let dispose = () => {};
export function enhanceLearningPage(root) {
  dispose();
  const main = root.querySelector('#main-content');
  if (!main) return;
  const title = main.querySelector('h1');
  if (title) document.title = title.textContent.trim() + '｜English Quest';
  const headings = [...main.querySelectorAll('h2')].filter(h=>!h.closest('details, nav, .knowledge-card, .knowledge-home'));
  if (!headings.length || main.querySelector('.knowledge-home')) return;
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
      h.closest('details')?.setAttribute('open','');
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
  dispose=()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(scheduled);};
}
