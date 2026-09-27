// Planning heuristic v1. These thresholds are product rules, not fitted norms.
const bands = [
  {min:0,cefr:'Pre-A1–A1',cap:'C–B',gsat:'1–5',toeic:'5–220',sat:'200–460',gre:'130–140',gmat:'60–66',next:'先建立 be 動詞、一般動詞與基本詞彙。'},
  {min:20,cefr:'A1–A2',cap:'B–B+',gsat:'3–7',toeic:'100–280',sat:'300–510',gre:'130–145',gmat:'60–70',next:'練習日常句型、時態與短文定位。'},
  {min:36,cefr:'A2–B1',cap:'B–B++',gsat:'5–10',toeic:'180–350',sat:'380–580',gre:'135–150',gmat:'63–75',next:'補強完成式、被動語態、關係子句與閱讀推論。'},
  {min:52,cefr:'B1–B2',cap:'B++–A',gsat:'8–12',toeic:'260–420',sat:'460–650',gre:'140–156',gmat:'67–80',next:'練習段落連貫、長句拆解與商務閱讀。'},
  {min:68,cefr:'B2–C1',cap:'A–A+',gsat:'10–14',toeic:'330–470',sat:'550–730',gre:'148–163',gmat:'72–85',next:'加強跨文本比較、學術詞彙與論證假設。'},
  {min:80,cefr:'B2–C1（偏進階）',cap:'A–A++',gsat:'12–15',toeic:'390–495',sat:'620–790',gre:'155–169',gmat:'77–89',next:'以官方限時模考確認閱讀配速與弱項，再補測聽說寫。'},
  {min:92,cefr:'C1–C2',cap:'A+–A++',gsat:'13–15',toeic:'430–495',sat:'680–800',gre:'160–170',gmat:'81–90',next:'挑戰官方進階閱讀與論證題；另以完整測驗確認四技能程度。'}
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
  if(!r.sufficient)return `<section class="card"><h2>英文程度預測</h2><p>目前已作答 ${r.answered}/${r.total} 題，樣本不足，尚不估測程度。</p><p>請完成至少 24 題、全卷 80%，並涵蓋至少 6 個難度層級後再查看預測。</p></section>`;
  const b=r.band;
  return `<section class="card level-estimate"><p class="pill">英文程度預測 · 初步規則估測</p><h2>閱讀／文法程度約 ${b.cefr}</h2><p>本次已作答 ${r.answered}/${r.total} 題，答對 ${r.correct} 題；難度加權指標 ${r.score}/100。</p><p>${b.next}</p>
  <h3>考試參考落點</h3><p>以下為本站規則產生的寬幅估測，適合選擇教材與設定備考起點；不是正式成績換算，區間也不是統計信賴區間。</p>
  <div class="lesson-table"><table><thead><tr><th>考試／範圍</th><th>預估區間</th><th>尚需確認</th></tr></thead><tbody>
  <tr><td>會考英文</td><td>${b.cap}</td><td>未測聽力；各年級距不同</td></tr>
  <tr><td>學測英文</td><td>${b.gsat} 級分</td><td>未評作文、翻譯及完整混合題</td></tr>
  <tr><td>TOEIC Reading</td><td>${b.toeic} / 495</td><td>僅閱讀；不預測聽讀總分</td></tr>
  <tr><td>SAT Reading and Writing</td><td>${b.sat} / 800</td><td>未模擬官方適性測驗</td></tr>
  <tr><td>GRE Verbal</td><td>${b.gre} / 170</td><td>需完整限時語文模考</td></tr>
  <tr><td>GMAT Verbal</td><td>${b.gmat} / 90</td><td>僅語文；不推估含數學及 DI 的總分</td></tr>
  </tbody></table></div>
  <details><summary>估測怎麼算？</summary><p>模型 planning-v1：依題庫第 1–8 層給予 1、1.5、2、2.5、3、3.5、4、4.5 的權重，以答對權重除以全卷權重。未作答不計分；多選須全對且不可重複選項。指標分界為 20、36、52、68、80、92，再對應本站設定的程度及分數區間。</p><p>這些門檻與區間尚未用「本站作答＋同一學生正式成績」配對資料校準，因此估測把握度有限，可能高估或低估；聽力、口說與自由寫作不在此程度範圍。建議用官方模考檢驗，再依結果調整。</p><p>官方資料只用來核對分數尺度，不代表認可本站預測：<a href="https://www.ets.org/toeic/about/faq/product-specific-faq/toeic-listening-reading.html">TOEIC</a> · <a href="https://satsuite.collegeboard.org/scores/what-scores-mean">SAT</a> · <a href="https://www.ets.org/gre/test-takers/general-test/scores/understand-scores.html">GRE</a> · <a href="https://www.mba.com/exams/gmat-exam/scores">GMAT</a>。</p></details></section>`;
}
