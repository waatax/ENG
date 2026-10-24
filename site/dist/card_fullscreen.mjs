// Viewport fullscreen also works on mobile browsers without the Fullscreen API.
export function cardFullscreen(panel,onChange=()=>{}){
 let active=false,previous=null,scroll='',background=[];
 function set(value){if(value===active)return;active=value;panel.classList.toggle('card-fullscreen',active);
 if(active){previous=document.activeElement;scroll=document.body.style.overflow;document.body.style.overflow='hidden';background=[...document.body.children].filter(el=>el!==panel).map(el=>[el,el.inert]);for(const [el]of background)el.inert=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');}
 else{document.body.style.overflow=scroll;for(const [el,inert]of background)el.inert=inert;background=[];panel.removeAttribute('role');panel.removeAttribute('aria-modal');}
 onChange(active);if(active)panel.querySelector('[data-fullscreen]')?.focus({preventScroll:true});else if(previous?.isConnected&&!panel.hidden)previous.focus({preventScroll:true});
 }
 document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){e.preventDefault();set(false);}if(e.key==='Tab'){const buttons=[...panel.querySelectorAll('button:not([disabled]),a[href],input,select')].filter(el=>el.getClientRects().length);if(!buttons.length)return;const first=buttons[0],last=buttons.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 panel.addEventListener('click',e=>{if(e.target.closest('[data-fullscreen]'))set(!active);});
 window.addEventListener('hashchange',()=>set(false));window.addEventListener('pagehide',()=>set(false));
 return {get active(){return active;},exit:()=>set(false)};
}
