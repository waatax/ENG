import {answerText} from './coach.mjs?v=joy20261103';
import {readRecall, escapeHTML as esc} from '../recall.mjs?v=joy20261103';
export function unitMissions(questions, excluded, unitId) {
  const pool=questions.filter(q=>!excluded.has(q.id)), count=Math.ceil(questions.length*.1);
  return Array.from({length:Math.min(count,pool.length)},(_,i)=>{
    const q=pool[Math.floor(i*pool.length/Math.min(count,pool.length))];
    const kind=q.passage?'evidence':q.kind==='word'||q.type==='match'?'word':q.type==='listen'?'listen':'reason';
    const tasks={
      word:['詞義 → 用法','先說出詞義，再想一個你自己會用到它的場合。核對後，遮住示範再說一次。','核對詞義與詞性；搭配不同時，意思也可能改變。'],
      evidence:['結論 → 證據','先自己回答，再指出短文中支持答案的一句話。說明它為什麼支持這個答案。','核對解析與原句；文章沒有說的事，不當作已證實。'],
      listen:['聽懂 → 回應','先聽題目，不看答案說出意思；核對後，用自己的英文接一句回應。','先確認意思，再模仿重音；聽懂和能自己說是兩項練習。'],
      reason:['答案 → 理由','先回答，指出題目裡決定答案的字。核對後，解釋另一個選項為什麼不合適。','把解析中的規則連回這道題，不只背下正確選項。']
    };
    const [title,task,check]=tasks[kind];
    const specific=q.type==='build'?'先不看詞庫，自己組出完整句子。核對語序後，換一個主詞或時間再說一次。':q.type==='input'?'先自己說出並拼寫答案。核對後，遮住示範再寫一次，留意漏字與動詞形式。':task;
    return {id:`mission:${unitId}:${q.id}`,source:q.id,title,task:specific,check,prompt:q.prompt,text:q.passage||q.text||'',audio:q.audio||'',answer:answerText(q),why:q.why};
  });
}
export function renderUnitMissions(missions, baseline, storage) {
  const saved=readRecall(storage), reviewed=missions.filter(m=>Number.isFinite(saved[m.id]?.reviewed)).length;
  const due=missions.filter(m=>Number.isFinite(saved[m.id]?.due)&&saved[m.id].due<=Date.now()).length;
  return `<section class="unit-missions"><header><span class="recall-eyebrow">YOUR NEXT LITTLE WIN</span><h3>✦ 用得出來的小任務</h3><p>這輪再新增 ${missions.length} 張任務：本單元 ${baseline} 道不同練習的 10% 向上取整，與上方回想卡採不同來源。延伸既有知識，非新增計分題。</p></header><div class="mission-overview"><span>已自評 <b>${reviewed} / ${missions.length}</b></span><span>到期 <b>${due}</b></span><span>不限時 · 不扣心</span></div><p class="small muted">初學：先看示範再遮住重說。熟悉：直接回答，說明理由，再換自己的情境。</p>${missions.map((m,i)=>{
    const record=saved[m.id], next=Number.isFinite(record?.due)?new Date(record.due).toLocaleDateString('zh-TW'):'';
    return `<details class="mission-card"><summary><span class="mission-number">${String(i+1).padStart(2,'0')}</span><span><small>${esc(m.title)}</small><b>${esc(m.prompt)}</b></span><span aria-hidden="true">＋</span></summary><div class="mission-body"><p>${esc(m.task)}</p>${m.text?`<p class="mission-context" lang="en">${esc(m.text)}</p>`:''}<button class="btn small" data-act="prompt-say" data-text="${esc(m.audio||[m.prompt,m.text].filter(Boolean).join('。'))}">🔊 聽任務題目</button><details class="mission-model"><summary>先想一想，再打開示範與解說</summary><p class="mission-answer">${esc(m.answer)}</p><p><b>理解線索：</b>${esc(m.why)}</p><p class="small">${esc(m.check)}</p><div class="coach-controls"><button class="btn small" data-act="prompt-say" data-text="${esc(m.answer)}">🔊 聽答案</button><button class="btn small" data-act="prompt-say" data-slow="1" data-text="${esc(m.answer)}">🐢 慢速</button><button class="btn small" data-act="prompt-say" data-text="${esc(m.why)}">💬 聽解說</button></div><div class="mission-rating"><p class="small">完成運用後自評，安排下次回想：</p><div class="coach-controls"><button class="btn small" data-act="lab-rate" data-id="${esc(m.id)}" data-rating="again">🌱 還要練</button><button class="btn small primary" data-act="lab-rate" data-id="${esc(m.id)}" data-rating="good">✓ 能自己說</button><button class="btn small" data-act="lab-rate" data-id="${esc(m.id)}" data-rating="easy">✦ 能換情境</button></div><p class="mission-status small" role="status">${next?`已自評 · 下次 ${next}`:'還沒自評；開口與理由品質請自行核對。'}</p></div></details></div></details>`;
  }).join('')}</section>`;
}
