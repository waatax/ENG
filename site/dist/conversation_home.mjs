import { ALL_COMMUTE_DIALOGUES as dialogues, getCommuteDialogueState, playHomeConversation, stopCommuteDialogue } from './commute_dialogues.mjs';
import { englishVoiceDescription, renderAmericanVoiceSettings } from './audio.mjs';
const e = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let level='全部', query='', progress='全部', mode='blind_en', onlyNew=false;
const groups=['全部','入門','基礎','進階','職場專業','學術挑戰'];
export function conversationGroup(d) {
  if(d.isNew && /^A1 /.test(d.level)) return '入門';
  if(d.isNew && /^B2 /.test(d.level)) return '進階';
  if(d.stage==='高工') return '職場專業';
  if(d.stage==='國際考試') return '學術挑戰';
  if(d.stage==='國小') return '入門';
  if(d.stage==='國中') return '基礎';
  if(d.stage==='高中') return '進階';
  if(/C1|C2|B2/.test(d.level)) return '學術挑戰';
  return /B1/.test(d.level)?'進階':'基礎';
}
export function homeConversations() {
 const s=getCommuteDialogueState(), done=new Set(s.completedIds), selected=dialogues.find(d=>d.id===s.selectedId)||dialogues[0];
 return `<section class="conversation-home" aria-labelledby="conversation-title"><div class="conversation-heading"><div><p class="eyebrow">LISTEN · SPEAK · KEEP GOING</p><h2 id="conversation-title">今天，先聽懂一段會話</h2><p>選程度、找情境，直接開始。先聽大意，再對照字幕，最後跟讀。</p></div><a class="btn" href="#listening">完整會話教室 →</a></div>
 <div class="conversation-resume"><div><small>上次位置 · 第 ${Math.max(0,Math.min(selected.lines.length-1,Number(s.resumeLine)||0))+1} / ${selected.lines.length} 句</small><h3>${e(selected.title)}</h3><p>${done.size} / ${dialogues.length} 篇已聽完</p><progress max="${dialogues.length}" value="${done.size}" aria-label="已聽完會話進度"></progress></div><button class="btn primary" data-home-resume="${e(selected.id)}">接續這篇 ▶</button></div>
 <div class="conversation-levels" role="group" aria-label="會話難度">${groups.map(g=>`<button class="btn ${level===g?'primary':''}" data-home-level="${g}" aria-pressed="${level===g}">${g} <small>${dialogues.filter(d=>g==='全部'||conversationGroup(d)===g).length}</small></button>`).join('')}</div>
 <p class="small">難度是本站教材導覽建議；職場與學術為用途分類，不代表 CEFR 測驗等級。</p>
 <div class="conversation-filters"><label>找主題或英文句子<input id="home-conversation-query" type="search" value="${e(query)}" placeholder="例如：點餐、旅行、coffee、meeting"></label><label>學習進度<select id="home-conversation-progress">${['全部','未聽完','已聽完'].map(x=>`<option ${progress===x?'selected':''}>${x}</option>`).join('')}</select></label><label>播放方式<select id="home-conversation-mode">${[['blind_en','純英文聆聽'],['bilingual','英文＋中文'],['shadowing','留白跟讀']].map(([v,t])=>`<option value="${v}" ${mode===v?'selected':''}>${t}</option>`).join('')}</select></label></div>
 <button class="btn" data-home-new-filter aria-pressed="${onlyNew}">${onlyNew?'顯示所有會話':'只看新增 24 篇情境'}</button><div id="home-conversation-results">${homeConversationResults()}</div>
 <div class="conversation-player"><strong>播放控制</strong><button class="btn" data-home-stop>停止／保留位置</button><span data-commute-status role="status" aria-live="polite">${e(s.activePhaseLabel)}</span><details><summary>字幕與回想練習：${e(selected.title)}</summary><ol>${selected.lines.map((l,i)=>`<li data-commute-line-idx="${i}"><strong>${e(l.speaker)}</strong><p lang="en-US">${e(l.en)}</p><p>${e(l.zh)}</p></li>`).join('')}</ol><p>${e(selected.recallPrompt)}</p><details><summary>說完再看參考回答</summary><p>${e(selected.recallAnswer)}</p></details>${selected.sourceLink?`<a class="btn" href="${e(selected.sourceLink)}">進入對應教材 →</a>`:''}</details>${renderAmericanVoiceSettings()}<p class="small">英文聲音：<span data-home-voice>${e(englishVoiceDescription())}</span>。會話只使用可辨識的美式英文聲音；音色與自然度依裝置而異，找不到美式聲音時會提示安裝。已聽完表示播放完成，並非程度認證；進度只保存在此瀏覽器。</p></div></section>`;
}
export function homeConversationResults() {
 const done=new Set(getCommuteDialogueState().completedIds), q=query.trim().toLowerCase();
 const found=dialogues.filter(d=>(!onlyNew||d.isNew)&&(level==='全部'||conversationGroup(d)===level)&&(progress==='全部'||(progress==='已聽完')===done.has(d.id))&&(!q||[d.title,d.scenario,d.topicTag,...d.lines.flatMap(l=>[l.en,l.zh])].join(' ').toLowerCase().includes(q)));
 return `<p role="status">找到 ${found.length} 篇會話</p><div class="conversation-grid">${found.map(d=>`<article><small>${d.isNew?'新增 · ':''}${conversationGroup(d)} · ${d.lines.length} 句 · ${done.has(d.id)?'已聽完':'待練習'}</small><h3>${e(d.title)}</h3><p>${e(d.scenario)}</p><button class="btn" data-home-play="${e(d.id)}" aria-label="播放：${e(d.title)}">▶ 播放會話</button></article>`).join('')}</div>${found.length?'':'<p>沒有符合的會話，請試試其他關鍵字或程度。</p>'}`;
}
export function handleHomeConversationClick(button,render) {
 const d=button.dataset;
 if(d.homeJump){document.getElementById(d.homeJump)?.scrollIntoView({behavior:"smooth",block:"start"});return true;}
 if(d.homeNewFilter!==undefined){onlyNew=!onlyNew;render();return true;}
 if(d.homeLevel){ level=d.homeLevel; render(); return true; }
 if(d.homeStop!==undefined){stopCommuteDialogue(true);render();return true;}
 if(d.homePlay||d.homeResume){playHomeConversation(d.homePlay||d.homeResume,mode,!!d.homeResume,render);return true;}
 return false;
}
export function handleHomeConversationInput(target) {
 if(target.id==='home-conversation-mode'){mode=target.value;return;}
 if(target.id==='home-conversation-query')query=target.value;
 else if(target.id==='home-conversation-progress')progress=target.value;
 else return;
 const results=document.getElementById('home-conversation-results');if(results)results.innerHTML=homeConversationResults();
}
if(typeof window!=='undefined')window.speechSynthesis?.addEventListener?.('voiceschanged',()=>{const el=document.querySelector('[data-home-voice]');if(el)el.textContent=englishVoiceDescription();});
