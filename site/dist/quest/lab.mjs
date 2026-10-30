// Additional retrieval and transfer activities, grounded in each unit's own pool.
import { questionKey } from './question_quality.mjs';
import { answerText, evidenceFor } from './coach.mjs?v=learn20261030';
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
  return {baseline:questions.length,cards,phrases:unitPhrases(questions,count)};
}

// 實用表達: "situation or meaning → how to say it", taken only from this unit's own items (never invented).
const zhRe=/[㐀-鿿]/, clean=s=>String(s??'').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]/g,' ').replace(/\s+/g,' ').trim();
const INSTRUCTION=/^(選出|選擇|填入|聽|排出|組成|把|請|配對|輸入|聽寫|哪|下列|根據|依據|閱讀|這)/;
function phraseOf(q){
  const quoted=/「(.+?)」/.exec(q.prompt||'')?.[1];
  const zhOf=()=>q.textZh||(/^「.+」的英文是？$/.test(q.prompt||'')?quoted:quoted&&zhRe.test(quoted)?quoted:zhRe.test(q.prompt||'')&&!INSTRUCTION.test(q.prompt)?String(q.prompt).replace(/[，,]?(你會說|可以說|你可以回應|你可以說|要說)？?$/,'').replace(/[。？?]$/,''):'');
  if(q.type==='listen'&&q.audio&&!zhRe.test(q.audio)&&zhRe.test(q.answer))return {en:q.audio,zh:q.answer,tag:'聽懂重點'};
  if(q.type==='match')return null;
  const en=q.type==='multi'?'':answerText(q);
  if(en&&!zhRe.test(en)&&en.length<=160){const zh=zhOf();const words=en.trim().split(/\s+/).length;if(zh)return {en,zh,tag:words===1?'單字':zh===quoted&&!q.textZh&&words>5?'句中重點':'情境說法'};if(words>1)return {en,zh:'',tag:'完整句型'};}
  const ev=evidenceFor(q);
  if(ev)return {en:ev,zh:'',tag:'原文好句'};
  return null;
}
export function unitPhrases(questions,count){
  const seen=new Set(),all=[];
  for(const q of questions){const p=phraseOf(q);if(!p)continue;const k=clean(p.en);if(!k||seen.has(k))continue;seen.add(k);all.push({...p,source:q.id});}
  // Whole expressions with a meaning first, then single words, then sentences without a gloss; keep unit order inside each band.
  const rank=p=>p.tag==='情境說法'||p.tag==='聽懂重點'?0:p.tag==='單字'||p.tag==='句中重點'?1:2;
  const bands=[0,1,2].map(b=>all.filter(p=>rank(p)===b));
  const out=[];for(const band of bands){const step=band.length/Math.max(1,Math.min(band.length,count-out.length));for(let i=0;out.length<count&&i<band.length&&Math.floor(i*step)<band.length;i++)out.push(band[Math.floor(i*step)]);}
  return out;
}

export function labView(course,unitId) {
  const {baseline,cards,phrases}=unitLab(course,unitId);if(!cards.length)return '';
  const phraseBlock=phrases.length?`<section class="lab-phrases"><h4>🗣️ 本單元實用表達（${phrases.length} 句）</h4><p class="small muted">從本單元題目整理出來、生活中真的用得到的說法。先看中文想英文，再按 🔊 核對並跟讀。</p><div class="coach-controls"><button class="btn small gold" data-act="prompt-say" data-text="${esc(phrases.map(p=>[p.zh,p.en].filter(Boolean).join('。')).join('。'))}">▶ 全部播放（中＋英）</button><button class="link" data-act="stop-say">停止朗讀</button></div><ol>${phrases.map(p=>`<li><span class="ph-zh">${esc(p.tag)}${p.zh?` · ${esc(p.zh)}`:''}</span><span class="ph-en" lang="en">${esc(p.en)}</span><button class="say" data-act="prompt-say" data-text="${esc(p.en)}" aria-label="朗讀英文">🔊</button><button class="say slow" data-act="prompt-say" data-slow="1" data-text="${esc(p.en)}" aria-label="慢速朗讀">🐢</button></li>`).join('')}</ol></section>`:'';
  return `<section class="learning-lab"><p class="eyebrow">實用加練 · 每次選一張</p><h3>🧭 把會選，練成會用（10% 實用內容擴充）</h3><p>新增 ${cards.length} 張回想與運用卡（以本單元 ${baseline} 道不同練習的 10% 向上取整）。沿用本單元知識，增加開口與解釋任務，非新增計分題。</p><div class="lab-route"><span>① 自己想</span><span>② 聽與核對</span><span>③ 換你運用</span><span>④ 實用延伸</span></div><p class="small muted">剛開始：先看示範再遮住重說。已熟悉：直接回想，再做運用。每次 2–3 分鐘；不扣愛心、不以速度評價。</p>${phraseBlock}${cards.map((c,i)=>{
    const promptSpeech = c.audio || [c.prompt,c.text].filter(Boolean).join('。');
    const walkthrough = [promptSpeech, `正確答案是：${c.answer}`, `為什麼？${c.why}`].filter(Boolean).join('。');
    return `<details class="lab-card"><summary>${i+1}. ${esc(c.title)} · ${esc(c.prompt)}</summary><p class="lab-recall-prompt">${esc(c.recall)}</p>${c.text?`<p class="lab-context">${esc(c.text)}</p>`:''}<div class="coach-controls"><button class="btn small" data-act="prompt-say" data-text="${esc(promptSpeech)}">🔊 聽題目${c.audio?'原音':''}</button><button class="btn small gold" data-act="prompt-say" data-text="${esc(walkthrough)}">🎧 語音導讀（題＋答＋解）</button></div><details class="lab-model"><summary>我想過了，展開參考答案與解說</summary><p class="lab-ans"><b>✔ 正解：${esc(c.answer)}</b></p><p class="lab-why">💡 <b>為什麼？</b>${esc(c.why)}</p><div class="coach-controls"><button class="btn small" data-act="prompt-say" data-text="${esc(c.answer)}">🔊 聽答案</button><button class="btn small" data-act="prompt-say" data-text="${esc(c.why)}">💬 聽解說</button></div></details><h4>換你運用</h4><p class="lab-transfer">${esc(c.transfer)}</p><p class="small muted">自我檢查：${esc(c.check)}</p>${c.tip?`<p class="lab-tip small">${esc(c.tip)}</p>`:''}<p class="lab-return">🌱 明天回來先遮住示範，再試一次。口說與開放回答為自評，不自動判分。</p></details>`;
  }).join('')}<button class="link" data-act="stop-say">停止朗讀</button></section>`;
}
