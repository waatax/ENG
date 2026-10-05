// Local practice feedback only. Thresholds are product rules, not fitted norms.
const bands = [
  {min:0,next:'先建立 be 動詞、一般動詞與基本詞彙。'},
  {min:20,next:'練習日常句型、時態與短文定位。'},
  {min:36,next:'補強完成式、被動語態、關係子句與閱讀推論。'},
  {min:52,next:'練習段落連貫、長句拆解與商務閱讀。'},
  {min:68,next:'加強跨文本比較、學術詞彙與論證假設。'},
  {min:80,next:'用不同題材檢查閱讀配速與弱項，再補測聽說寫。'},
  {min:92,next:'挑戰進階閱讀與論證題，並回看本次錯題。'}
];
export function estimateLevel(answers, questions) {
  let answered=0, correct=0, earned=0, possible=0;
  const tiers=new Set();
  for(const q of questions) {
    const a=answers[q.id], weight=1+(Math.max(1,Math.min(8,Number(q.tier)||1))-1)*0.5;
    const valid=Array.isArray(q.answer)
      ? Array.isArray(a)&&a.length===q.answer.length&&new Set(a).size===a.length&&a.every(n=>Number.isInteger(n)&&n>=0&&n<q.options.length)
      : Number.isInteger(a)&&a>=0&&a<q.options.length;
    possible+=weight;
    if(!valid)continue;
    answered++;tiers.add(q.tier);
    const right=Array.isArray(q.answer)?a.every(n=>q.answer.includes(n)):a===q.answer;
    if(right){correct++;earned+=weight;}
  }
  const score=possible?Math.round(100*earned/possible):0;
  const sufficient=questions.length>=24&&answered>=24&&answered/questions.length>=0.8&&tiers.size>=6;
  const band=[...bands].reverse().find(b=>score>=b.min);
  return {version:'planning-v1',answered,total:questions.length,correct,score,sufficient,band:sufficient?band:null};
}
export function renderLevelEstimate(answers,questions) {
  const r=estimateLevel(answers,questions);
  if(!r.sufficient)return `<section class="card"><h2>本次跨主題作答回顧</h2><p>目前已作答 ${r.answered}/${r.total} 題，尚不足以整理跨主題表現。</p><p>作答至少 24 題、涵蓋至少 6 個題庫層級後，可查看本站練習指標；單次結果不代表正式英語程度。</p></section>`;
  const b=r.band;
  return `<section class="card level-estimate"><p class="pill">本站練習回饋</p><h2>本次答對 ${r.correct} / ${r.total} 題</h2><p>已作答 ${r.answered} 題；依本站題庫層級計算的加權練習指標為 ${r.score}/100。此指標只用於回顧這次題目，未經正式測驗校準，不能換算 CEFR 或任何考試分數。</p><p>建議下一步：${b.next}</p><details><summary>指標怎麼算？</summary><p>第 1–8 層題目依序採 1、1.5、2、2.5、3、3.5、4、4.5 的站內權重，答對權重除以全卷權重；未作答計入全卷權重，多選須全對。聽力、口說與自由寫作不在本次測量範圍。</p></details></section>`;
}
