import {aidProfile} from './teaching_aids.mjs';
import {escapeJourney as e} from './learning_journey.mjs';
import {createLabRecord} from './lab_record.mjs';
import {diagnosticFor} from './lesson_diagnostics.mjs';
export function labModel(entry){
 const profile=aidProfile(entry.title);
 if(!profile)return null;
 const rows=profile[4].filter(r=>r.length===3&&r.every(x=>typeof x==='string'&&x.trim()));
 const distinct=rows.filter((r,i)=>rows.findIndex(x=>x[0]===r[0])===i);
 return {route:entry.link,title:profile[1],icon:profile[2],steps:profile[3],items:distinct.map((r,i)=>({example:r[1],answer:i,label:r[0],reason:r[2]}))};
}
export function renderLab(model){
 return `<section class="lesson-lab card" aria-labelledby="lab-heading"><p class="eyebrow">觀察 → 判斷 → 解釋 → 換情境</p><h2 id="lab-heading"><span aria-hidden="true">${e(model.icon)}</span> 例句推理練習：${e(model.title)}</h2><figure class="lab-map"><figcaption>閱讀這張圖：依序找出線索，再說明你的判斷</figcaption><ol>${model.steps.map((s,i)=>`<li><span aria-hidden="true">${i+1}</span><strong>${e(s)}</strong></li>`).join('')}</ol></figure><p>這裡練習圖解中的判斷方式。先選答案，再查看理由；同一題可比較不同選項。</p><label for="lab-example">選一個示例練習</label><select id="lab-example">${model.items.map((r,i)=>`<option value="${i}">${i+1}. ${e(r.example)}</option>`).join('')}</select><div data-lab-question></div></section>`;
}
export function mountLessonLab(container,entry){
 const model=labModel(entry);if(!model)return;
 const host=document.createElement('div');host.innerHTML=renderLab(model);
 const lab=host.firstElementChild;
 const recall=container.querySelector('.journey-recall');if(recall)recall.before(lab);else container.append(lab);
 const question=lab.querySelector('[data-lab-question]');
 const state=createLabRecord({getItem:k=>localStorage.getItem(k),setItem:(k,v)=>localStorage.setItem(k,v)},entry.link);
 const correction=document.createElement('details');correction.className='lab-correction';
 correction.innerHTML=`<summary>訂正工作單：把錯因變成下一步</summary><p>記錄這次的判斷，而不是只抄正解。資料只保存在此瀏覽器。</p><label for="lab-cause">我卡在哪裡？</label><select id="lab-cause" data-lab-note="cause"><option value="">請選錯因</option>${['詞義或搭配','句型或形式','沒找出證據','情境或語氣','尚未找到原因'].map(c=>`<option ${state.data.cause===c?'selected':''}>${e(c)}</option>`).join('')}</select><label for="lab-rewrite">用自己的話重寫答案與理由</label><textarea id="lab-rewrite" data-lab-note="rewrite" maxlength="2000" rows="3">${e(state.data.rewrite)}</textarea><label for="lab-next">下一次要核對什麼？</label><textarea id="lab-next" data-lab-note="next" maxlength="2000" rows="2">${e(state.data.next)}</textarea><button class="btn" type="button" data-lab-export>下載本課訂正</button><p role="status" data-lab-save>${e(state.warning||'尚未修改訂正；可先完成示例判斷。')}</p>`;
 lab.append(correction);
 const diagnostic=diagnosticFor(entry),check=document.createElement('fieldset');check.className='lab-diagnostic';
 check.innerHTML=`<legend>換一題：檢查常見迷思</legend><p>${e(diagnostic.prompt)}</p><div class="lab-options">${diagnostic.options.map((option,i)=>`<button type="button" class="btn quiet" data-diagnostic="${i}">${e(option)}</button>`).join('')}</div><p role="status" aria-live="polite" data-diagnostic-result>先判斷，再用一句話說明理由。這是本站原創練習。</p>`;
 correction.before(check);
 check.querySelectorAll('button').forEach(button=>button.onclick=()=>{const choice=Number(button.dataset.diagnostic);state.answer(100,choice);check.querySelector('[data-diagnostic-result]').textContent=`${choice===diagnostic.answer?'判斷吻合':'再比較一次'}：${diagnostic.reason} ${state.warning}`;check.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));});
 correction.querySelectorAll('[data-lab-note]').forEach(input=>input.addEventListener(input.tagName==='SELECT'?'change':'input',()=>{state.write(input.dataset.labNote,input.value);correction.querySelector('[data-lab-save]').textContent=state.warning||'本課訂正已儲存。';}));
 correction.querySelector('[data-lab-export]').onclick=()=>{const text=[entry.title,location.href,'錯因：'+state.data.cause,'我的改寫：'+state.data.rewrite,'下次核對：'+state.data.next,'作答紀錄：'+JSON.stringify(state.data.answers)].join('\n\n');const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='English-Quest-correction.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 function show(index){const item=model.items[index];
  question.innerHTML=`<fieldset><legend>這個示例最符合哪個判斷重點？</legend><blockquote>${e(item.example)}</blockquote><div class="lab-options">${model.items.map((r,i)=>`<button type="button" class="btn quiet" data-lab-choice="${i}">${e(r.label)}</button>`).join('')}</div><p class="lab-feedback" role="status" aria-live="polite"></p><details><summary>選完後，核對理由</summary><p>${e(item.reason)}</p></details></fieldset>`;
  let hintUsed=false;
  const feedback=question.querySelector('.lab-feedback'),hint=question.querySelector('details');
  const saved=state.data.answers[index];if(saved)feedback.textContent=`本例已試 ${saved.attempts} 次；首次選擇「${model.items[saved.first]?.label||'其他'}」${saved.assisted?'，曾參考理由':''}。這是練習紀錄，不代表精熟。`;
  hint.addEventListener('toggle',()=>{if(hint.open){hintUsed=true;state.hint(index);}});
  question.querySelectorAll('[data-lab-choice]').forEach(button=>button.onclick=()=>{
   const choice=Number(button.dataset.labChoice),correct=choice===item.answer;
   question.querySelector('.lab-feedback').textContent=correct?`判斷吻合：${item.reason}`:`先比較：你選的「${model.items[choice].label}」對應「${model.items[choice].example}」。本例的重點是「${item.label}」：${item.reason}`;
   question.querySelectorAll('[data-lab-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   state.answer(index,choice,hintUsed||hint.open);
   if(state.warning)correction.querySelector('[data-lab-save]').textContent=state.warning;
  });
 }
 lab.querySelector('select').onchange=event=>show(Number(event.target.value));show(0);
}
