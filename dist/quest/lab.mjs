// Additional retrieval and transfer activities, grounded in each unit's own pool.
import { questionKey } from './question_quality.mjs';
import { answerText } from './coach.mjs?v=learn20261029';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function unitLab(course, unitId) {
  const unit=course.units.get(unitId), seen=new Set(), questions=[];
  for(const node of unit?.nodes||[]) for(const id of course.nodes.get(node.id)?.pool||[]) {
    const q=course.item(id);
    if(!q || !['choice','listen','input','build','match','multi'].includes(q.type))continue;
    const key=questionKey(q);if(seen.has(key))continue;seen.add(key);questions.push(q);
  }
  const count=Math.ceil(questions.length/10);
  // Spread activities across the whole pool, rather than filling the lab with its first vocabulary block.
  const cards=Array.from({length:count},(_,i)=>{
    const q=questions[Math.floor(i*questions.length/count)];
    const kind=q.kind==='word'||q.type==='match'?'word':q.passage?'evidence':q.type==='listen'?'listen':'reason';
    const tasks={
      word:['詞語偵探','先不看選項，說出這個字或這組詞的意思。','選一個詞，說出你會用到它的場合；能造句時，再說一句自己的英文。','核對詞義是否符合你的情境；拼字相近不代表意思相同。'],
      evidence:['證據偵探','先不看選項，說出結論，並指出原文支持它的字句。','說明原文能支持什麼、不能支持什麼；把理由解釋給另一位學習者聽。','檢查理由是否真的來自文章，避免把常識或猜測當作文中證據。'],
      listen:['聽力探險','播放原音後，先用自己的話說出意思，再核對。','關閉示範重說一次，再想像對方就在面前，用英文接一句合適的回應。','先確認意思，再注意關鍵詞；跟讀順暢不等於已能獨立理解。'],
      reason:['線索解碼','先不看選項回答，再用自己的話解釋為什麼。','指出決定答案的線索；試著說明換掉哪個條件時，答案可能不同。','核對解析中的條件與規則；只記答案，還不能證明能運用。']
    };
    const [title,recall,transfer,check]=tasks[kind];
    const tips={
      word:'💡 實用口語心法：把單字融入生活日常場景，大聲唸出 3 遍，記憶效果倍增！',
      evidence:'💡 實用閱讀心法：先抓住段落主旨與因果關係，依據原文證據回答，不憑空猜想。',
      listen:'💡 實用聽力心法：抓關鍵動詞與受詞，留意英語自然連音與弱讀，跟讀建立語感。',
      reason:'💡 實用文法心法：掌握規則底層邏輯（時態、主詞一致性），舉一反三能活用到真實對話。'
    };
    return {
      id:`${unitId}:${q.id}`,
      source:q.id,
      title,
      recall,
      transfer,
      check,
      tip:tips[kind],
      prompt:q.prompt,
      text:q.passage||q.text||'',
      audio:q.audio||'',
      answer:answerText(q),
      why:q.why||'',
      kind
    };
  });
  return {baseline:questions.length,cards};
}

export function labView(course,unitId) {
  const {baseline,cards}=unitLab(course,unitId);if(!cards.length)return '';
  return `<section class="learning-lab"><p class="eyebrow">實用加練 · 每次選一張</p><h3>🧭 把會選，練成會用（10% 實用內容擴充）</h3><p>新增 ${cards.length} 張回想與運用卡（以本單元 ${baseline} 道不同練習的 10% 向上取整）。沿用本單元知識，增加開口與解釋任務，非新增計分題。</p><div class="lab-route"><span>① 自己想</span><span>② 聽與核對</span><span>③ 換你運用</span><span>④ 實用延伸</span></div><p class="small muted">剛開始：先看示範再遮住重說。已熟悉：直接回想，再做運用。每次 2–3 分鐘；不扣愛心、不以速度評價。</p>${cards.map((c,i)=>{
    const promptSpeech = c.audio || [c.prompt,c.text].filter(Boolean).join('。');
    const walkthrough = [promptSpeech, `正確答案是：${c.answer}`, `為什麼？${c.why}`].filter(Boolean).join('。');
    return `<details class="lab-card"><summary>${i+1}. ${esc(c.title)} · ${esc(c.prompt)}</summary><p class="lab-recall-prompt">${esc(c.recall)}</p>${c.text?`<p class="lab-context">${esc(c.text)}</p>`:''}<div class="coach-controls"><button class="btn small" data-act="prompt-say" data-text="${esc(promptSpeech)}">🔊 聽題目${c.audio?'原音':''}</button><button class="btn small gold" data-act="prompt-say" data-text="${esc(walkthrough)}">🎧 語音導讀（題＋答＋解）</button></div><details class="lab-model"><summary>我想過了，展開參考答案與解說</summary><p class="lab-ans"><b>✔ 正解：${esc(c.answer)}</b></p><p class="lab-why">💡 <b>為什麼？</b>${esc(c.why)}</p><div class="coach-controls"><button class="btn small" data-act="prompt-say" data-text="${esc(c.answer)}">🔊 聽答案</button><button class="btn small" data-act="prompt-say" data-text="${esc(c.why)}">💬 聽解說</button></div></details><h4>換你運用</h4><p class="lab-transfer">${esc(c.transfer)}</p><p class="small muted">自我檢查：${esc(c.check)}</p>${c.tip?`<p class="lab-tip small">${esc(c.tip)}</p>`:''}<p class="lab-return">🌱 明天回來先遮住示範，再試一次。口說與開放回答為自評，不自動判分。</p></details>`;
  }).join('')}<button class="link" data-act="stop-say">停止朗讀</button></section>`;
}
