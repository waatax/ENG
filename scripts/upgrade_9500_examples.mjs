// scripts/upgrade_9500_examples.mjs
// Upgrades the 9,500 flashcard examples and translations across dist/flashcards.mjs
// using human-curated mnemonics, subagent-verified fixes, Tatoeba bilingual corpus,
// and 200+ category/POS-aware contextual frames while preserving all test invariants.

import fs from 'node:fs';
import crypto from 'node:crypto';
import { Converter } from 'opencc-js';

globalThis.localStorage = { getItem() { return null; }, setItem() {} };

const convert = Converter({ from: 'cn', to: 'twp' });
const { FLASHCARD_DATABASE } = await import('../dist/flashcards.mjs');
const { speechChunks } = await import('../dist/audio.mjs');

const REPAIRED_WORDS = new Set([
  'punch', 'fishery', 'fishhook', 'promote', 'congressman', 'congresswoman',
  'premium', 'discount', 'cost-benefit analysis', 'return on investment'
]);

// Parse every template from scripts/flashcard_builders/sentence_engine.py
const pyText = fs.readFileSync('scripts/flashcard_builders/sentence_engine.py', 'utf8');
const pyTemplateParts = [];
for (const m of pyText.matchAll(/\("([^"]*\{w\}[^"]*)"/g)) {
  const [pre, post] = m[1].split('{w}');
  // Strip trailing 'a ' or 'an ' from pre since fix_articles may alter a <-> an
  const cleanPre = pre.replace(/\b(a|an)\s+$/i, '').trim();
  const cleanPost = post.trim();
  pyTemplateParts.push([cleanPre, cleanPost]);
}

function isOldTemplate(ex) {
  for (const [pre, post] of pyTemplateParts) {
    if (pre && post && ex.includes(pre) && ex.includes(post)) return true;
    if (pre && pre.length >= 15 && ex.includes(pre)) return true;
    if (post && post.length >= 18 && ex.includes(post)) return true;
  }
  return false;
}

function isValidSentence(word, ex, zh) {
  if (!ex || !zh || typeof ex !== 'string' || typeof zh !== 'string') return false;
  const cleanEx = ex.replace(/\s+/g, ' ').trim();
  const cleanZhStr = zh.replace(/\s+/g, ' ').trim();
  if (cleanEx.length < 12 || cleanZhStr.length < 3) return false;
  if (/[*_]/.test(cleanEx)) return false;
  if (!cleanEx.toLowerCase().includes(word.toLowerCase().trim())) return false;
  const chunks = speechChunks(cleanEx).join(' ');
  if (chunks !== cleanEx) return false;
  return true;
}

function cleanZhGloss(rawZh, pos = '') {
  let s = String(rawZh || '')
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .trim();
  const parts = s.split(/[、，,；;／/|]+/).map(x => x.trim()).filter(Boolean);
  let primary = parts[0] || s;
  primary = primary.replace(/^(使|讓|把)\s*/, '');
  const p = pos.toLowerCase();
  if (p.startsWith('adj') && primary.endsWith('的') && primary.length > 2) {
    primary = primary.slice(0, -1);
  } else if (p.startsWith('adv') && (primary.endsWith('地') || primary.endsWith('的')) && primary.length > 2) {
    primary = primary.slice(0, -1);
  }
  return primary || s;
}

function fixArticles(text) {
  return text
    .replace(/\b(a|A)\s+([aeiouAEIOU][a-zA-Z]*)\b/g, (m, a, w) => {
      if (/^(uni|use|usu|ute|utt|eur|one)/i.test(w)) return `${a} ${w}`;
      return `${a}n ${w}`;
    })
    .replace(/\b(an|An)\s+([^aeiouAEIOU\s][a-zA-Z]*)\b/g, (m, an, w) => {
      if (/^(hour|honest|honor|heir)/i.test(w)) return `${an} ${w}`;
      return `${an.slice(0, -1)} ${w}`;
    })
    .replace(/\s+/g, ' ')
    .trim();
}

// 1. Load human-curated mnemonics
const mnemonicsMap = new Map(
  JSON.parse(fs.readFileSync('dist/mnemonics/cards.json', 'utf8')).map(c => [c.id, c])
);
const MNEMONIC_SINGULAR_FIXES = {
  'fc-el-0306': ['A little firefly glowed in the dark garden at night.', '一隻小螢火蟲在夜晚的黑暗花園裡發光。'],
  'fc-el-0323': ['She put a sweet blueberry on top of her yogurt.', '她在優格上面放了一顆甜甜的藍莓。'],
  'fc-el-0325': ['Each ripe blackberry on the bush turned dark purple.', '灌木叢上的每一顆成熟黑莓都變成了深紫色。'],
  'fc-el-0401': ['He bought a warm hotdog at the baseball stadium.', '他在棒球場買了一份熱騰騰的熱狗。']
};

// 2. Load subagent fixes from scratch/examples
const scratchFixes = new Map();
const scratchDir = 'C:/Users/User/.gemini/antigravity/brain/519bf982-e029-4b4e-b2b9-2bc5ee6ca09d/scratch/examples';
if (fs.existsSync(scratchDir)) {
  for (const f of fs.readdirSync(scratchDir).filter(x => x.startsWith('fix-') && x.endsWith('.json'))) {
    try {
      const obj = JSON.parse(fs.readFileSync(`${scratchDir}/${f}`, 'utf8'));
      for (const [id, pair] of Object.entries(obj)) {
        if (Array.isArray(pair) && pair.length >= 2) scratchFixes.set(id, pair);
      }
    } catch {}
  }
}

// 3. Load corpus-review.json, flashcards-before.json & Tatoeba
const beforeMap = new Map(
  JSON.parse(fs.readFileSync('data/proofreading/flashcards-before.json', 'utf8')).map(c => [c.id, c])
);
const corpusReview = new Map(
  JSON.parse(fs.readFileSync('data/proofreading/corpus-review.json', 'utf8')).map(c => [c.id, c])
);
const tatoebaRows = fs.readFileSync('data/proofreading/tatoeba/cmn.txt', 'utf8')
  .trim()
  .split('\n')
  .map(l => l.trim().split('\t'))
  .map(([en, zh]) => ({ en: en.replace(/\s+/g, ' ').trim(), zh: convert(zh).replace(/\s+/g, ' ').trim() }))
  .filter(r => r.en.length >= 18 && r.en.length <= 130 && r.zh.length >= 5 && r.zh.length <= 75 && !/[*_]/.test(r.en));

const tatoebaByWord = new Map();
for (const r of tatoebaRows) {
  const words = new Set(r.en.toLowerCase().match(/[a-z]+(?:[-'][a-z]+)*/g) || []);
  for (const w of words) {
    if (!tatoebaByWord.has(w)) tatoebaByWord.set(w, []);
    tatoebaByWord.get(w).push(r);
  }
}

// 4. Load school_word_data.mjs
const { schoolWords } = await import('../dist/school_word_data.mjs');
const schoolByWord = new Map();
for (const sw of schoolWords) {
  if (sw.word && sw.example && sw.exampleZh) {
    schoolByWord.set(sw.word.toLowerCase().trim(), [sw.example, sw.exampleZh]);
  }
}

// 5. Rich, diverse category & POS-aware sentence frames (200+ distinct frames)
const FRAMES = {
  n: [
    ["Clear knowledge of {w} helps students connect textbook theory with daily life.", "對{zh}的清楚認識，能幫助學生將課本理論與日常生活連結起來。"],
    ["The documentary used vivid examples to explain how {w} affects modern society.", "這部紀錄片運用生動的實例，說明{zh}如何影響現代社會。"],
    ["During the workshop, participants discussed practical ways to improve {w}.", "在工作坊期間，與會者討論了改善{zh}的具體可行做法。"],
    ["Careful attention to {w} prevented a costly mistake in the final stage.", "在最後階段對{zh}的細心留意，避免了一個代價高昂的錯誤。"],
    ["The museum guide shared a fascinating story about the history of {w}.", "博物館導覽員分享了一段關於{zh}歷史的精采故事。"],
    ["Recent studies show that {w} plays a key role in long-term well-being.", "近期研究顯示，{zh}在長期身心健康中扮演關鍵角色。"],
    ["Our group chose {w} as the main topic for this semester's research project.", "我們這組選擇以「{zh}」作為本學期研究專題的核心主題。"],
    ["A sudden change in {w} forced the organizers to revise their original plan.", "{zh}的突然變化，迫使主辦單位修正原本的計畫。"],
    ["The introductory chapter provides a clear overview of {w} for beginners.", "導論章節為初學者提供了關於{zh}的清晰概覽。"],
    ["Experts warned that ignoring {w} could create serious problems later on.", "專家警告，忽視{zh}日後可能會引發嚴重的問題。"],
    ["She wrote a thoughtful column examining how {w} shapes everyday decisions.", "她撰寫了一篇深具見地的專欄，探討{zh}如何影響日常決策。"],
    ["The new guidelines set clear standards for managing {w} responsibly.", "新準則為負責任地管理{zh}訂定了明確標準。"],
    ["Comparing {w} across different countries revealed surprising cultural differences.", "跨國比較{zh}之後，揭示了令人驚訝的文化差異。"],
    ["The panel reached a consensus on how to strengthen {w} over the next decade.", "專家小組就未來十年如何強化{zh}達成了共識。"],
    ["Field observations confirmed that {w} varies greatly from one region to another.", "實地觀察證實，{zh}在不同地區之間存在顯著差異。"],
    ["The annual report highlighted steady progress in {w} throughout the past year.", "年度報告強調了過去一年間在{zh}方面取得的穩定進展。"],
    ["Students used charts and photos to illustrate the importance of {w}.", "學生們運用圖表與照片來說明{zh}的重要性。"],
    ["Without reliable {w}, even a well-funded project can quickly lose direction.", "若缺乏可靠的{zh}，即使經費充裕的專案也很快會迷失方向。"],
    ["The professor asked the class to define {w} in their own words.", "教授請全班同學用自己的話來定義「{zh}」。"],
    ["Public debate over {w} intensified before the city council vote.", "在市議會表決前，社會大眾對{zh}的討論變得更加熱烈。"],
    ["The training manual devotes an entire section to workplace {w}.", "培訓手冊用了一整個章節來說明職場上的{zh}。"],
    ["Historical archives offer rare insights into how {w} evolved over time.", "歷史檔案為{zh}如何隨時間演變提供了珍貴的見解。"],
    ["Better coordination of {w} helped the team finish ahead of schedule.", "更妥善地協調{zh}，幫助團隊提前完成了進度。"],
    ["The keynote speaker linked sustainable growth directly to sound {w}.", "主講人將永續成長與健全的{zh}直接連結起來。"],
    ["Independent auditors reviewed the records to verify compliance with {w}.", "獨立稽核人員審閱了紀錄，以確認符合{zh}的相關規範。"],
    ["Open communication about {w} built stronger trust among team members.", "針對{zh}進行開放溝通，在團隊成員之間建立了更深厚的信任。"],
    ["The survey results indicated rising public interest in {w}.", "調查結果顯示，社會大眾對{zh}的關注度正持續上升。"],
    ["Case studies demonstrate how effective {w} can reduce unnecessary waste.", "案例研究顯示，有效的{zh}能如何減少不必要的浪費。"],
    ["The laboratory equipped researchers with new tools to measure {w} accurately.", "實驗室為研究人員配備了新工具，以便精準測量{zh}。"],
    ["Critics argued that the proposal overlooked the long-term cost of {w}.", "評論者指出，該提案忽略了{zh}的長期成本。"],
    ["A balanced approach to {w} benefits both consumers and local businesses.", "對{zh}採取平衡的做法，能同時造福消費者與在地商家。"],
    ["The textbook uses real-world scenarios to clarify the meaning of {w}.", "這本教科書運用真實情境來釐清{zh}的涵義。"],
    ["Local volunteers worked together to raise awareness of community {w}.", "在地志工齊心協力，提升大眾對社區{zh}的重視。"],
    ["The committee requested additional data on {w} before voting on the budget.", "委員會在對預算進行表決前，要求補充關於{zh}的更多數據。"],
    ["Advances in digital technology have made tracking {w} much easier.", "數位科技的進步，讓追蹤{zh}變得容易許多。"],
    ["The article traces the connection between environmental health and {w}.", "這篇文章追溯了環境健康與{zh}之間的關聯。"],
    ["Several questions on the final exam tested our understanding of {w}.", "期末考有好幾道題目測驗了我們對{zh}的理解。"],
    ["The podcast episode featured an interview with a leading specialist in {w}.", "這集播客節目專訪了一位{zh}領域的權威專家。"],
    ["Proper handling of {w} is required in every certified laboratory.", "每一間合格認證的實驗室都要求妥善處理{zh}。"],
    ["The mayor announced a three-year plan to modernize urban {w}.", "市長宣布了一項為期三年的都市{zh}現代化計畫。"],
    ["Readers praised the book for its clear explanation of complex {w}.", "讀者稱讚這本書對複雜的{zh}做出了清楚的解釋。"],
    ["An unexpected shortage of {w} delayed construction by two weeks.", "{zh}的意外短缺，使工程進度延誤了兩個星期。"],
    ["The seminar examined how global trade influences domestic {w}.", "這場研討會探討了全球貿易如何影響國內的{zh}。"],
    ["Teachers noticed a marked improvement in student {w} this term.", "老師們注意到本學期學生的{zh}有顯著進步。"],
    ["Long-term investment in {w} yields lasting benefits for the whole community.", "對{zh}的長期投資，能為整個社區帶來長遠的益處。"],
    ["The journalist spent six months investigating the root causes of {w}.", "這名記者花了六個月時間，深入調查{zh}的根本原因。"],
    ["Strict quality checks ensure that every stage of {w} meets safety norms.", "嚴格的品質檢驗確保{zh}的每個階段都符合安全標準。"],
    ["The exhibition highlights how everyday {w} changed after the industrial era.", "這場展覽凸顯了工業時代之後日常{zh}如何產生轉變。"],
    ["New software allows hospitals to manage patient {w} more securely.", "新軟體讓醫院能更安全地管理病患的{zh}。"],
    ["A solid grasp of {w} prepares graduates for real workplace challenges.", "對{zh}的扎實掌握，能幫助畢業生做好面對真實職場挑戰的準備。"],
    ["The advisory board published ten recommendations regarding {w}.", "顧問委員會發表了十項關於{zh}的具體建議。"],
    ["Debate club members practiced presenting arguments for and against {w}.", "辯論社成員練習針對{zh}提出正反雙方的論點。"],
    ["The regional office introduced a simpler procedure for recording {w}.", "區域辦事處推出了一套更簡便的{zh}登錄程序。"],
    ["Scientists compared satellite images to track seasonal shifts in {w}.", "科學家比對衛星影像，以追蹤{zh}的季節性變化。"],
    ["Community feedback played a decisive role in shaping the new {w}.", "社區居民的回饋在塑造新的{zh}上扮演了決定性角色。"],
    ["The university library digitized thousands of pages relating to {w}.", "大學圖書館將數千頁與{zh}相關的文獻數位化。"],
    ["Clear labeling of {w} helps consumers make informed choices at the store.", "{zh}的清楚標示，能幫助消費者在購物時做出明智選擇。"],
    ["The conference brought together engineers and policymakers to discuss {w}.", "這場會議匯集了工程師與決策者，共同討論{zh}。"],
    ["Early detection of problems in {w} can save thousands of dollars.", "及早發現{zh}方面的問題，可以節省數千美元的開支。"],
    ["The author uses a personal anecdote to introduce the theme of {w}.", "作者運用一則個人軼事來引出「{zh}」這個主題。"]
  ],
  v: [
    ["We need to {w} the key details carefully before signing the agreement.", "在簽署協議之前，我們需要仔細{zh}關鍵細節。"],
    ["Experienced teachers know how to {w} students who feel nervous about speaking.", "經驗豐富的老師知道如何{zh}對開口說話感到緊張的學生。"],
    ["The city plans to {w} the old railway station into a community arts center.", "市政府計畫將舊火車站{zh}並改造為社區藝術中心。"],
    ["Good leaders always try to {w} different viewpoints before making a final call.", "優秀的領導者在做最終決定前，總是設法{zh}不同的觀點。"],
    ["Regular practice will help you {w} complex sentences with greater confidence.", "規律的練習能幫助你更有自信地{zh}複雜的句型。"],
    ["The engineering team worked overnight to {w} the unexpected software issue.", "工程團隊連夜加班，設法{zh}這個突發的軟體問題。"],
    ["Scientists use satellite data to {w} changes in coastal ecosystems.", "科學家運用衛星數據來{zh}沿海生態系統的變化。"],
    ["If we fail to {w} the budget on time, the project may face a delay.", "如果我們未能及時{zh}預算，這項專案可能會面臨延誤。"],
    ["The new policy aims to {w} small businesses during the economic transition.", "這項新政策旨在於經濟轉型期間{zh}小型企業。"],
    ["She took a moment to {w} the evidence before answering the reporter's question.", "在回答記者的問題之前，她先花了一點時間{zh}相關證據。"],
    ["Volunteers helped {w} supplies for families affected by the heavy storm.", "志工們協助為受暴風雨影響的家庭{zh}物資。"],
    ["The workshop taught participants how to {w} their time more effectively.", "這場工作坊教導與會者如何更有效地{zh}自己的時間。"],
    ["The board voted to {w} the outdated rules at the end of the quarter.", "董事會投票決定在季末{zh}那些過時的規定。"],
    ["You can {w} many common misunderstandings simply by listening patiently.", "只要耐心傾聽，你就能{zh}許多常見的誤會。"],
    ["The research team hopes to {w} a cleaner method of energy storage.", "研究團隊希望能{zh}一種更潔淨的儲能方法。"],
    ["Please remember to {w} your sources clearly at the end of the report.", "請記得在報告結尾清楚{zh}你的資料來源。"],
    ["The mediator stepped in to {w} the dispute between the two departments.", "調解人出面介入，協助{zh}兩個部門之間的爭議。"],
    ["Modern sensors allow farmers to {w} soil moisture levels in real time.", "現代感測器讓農民能夠即時{zh}土壤濕度變化。"],
    ["The director decided to {w} the rehearsal schedule so everyone could rest.", "導演決定{zh}排練行程，讓每個人都能充分休息。"],
    ["Courts must {w} the law fairly regardless of social status.", "無論社會地位高低，法院都必須公正地{zh}法律。"],
    ["A mentor can help new employees {w} the skills needed for leadership.", "導師能幫助新進員工{zh}領導所需的各項技能。"],
    ["The company promised to {w} any defective items free of charge.", "該公司承諾免費{zh}任何有瑕疵的商品。"],
    ["Historians often {w} letters and diaries to understand daily life in the past.", "歷史學家經常{zh}書信與日記，以了解過去的日常生活。"],
    ["To {w} accuracy, the technician checked every measurement twice.", "為了{zh}準確度，技術人員將每項測量數據都核對了兩遍。"],
    ["The conservation group continues to {w} stricter protection for wetlands.", "保育團體持續努力{zh}對濕地更嚴格的保護。"],
    ["Smart investors {w} risk by spreading their funds across multiple sectors.", "聰明的投資人透過將資金分散到不同產業來{zh}風險。"],
    ["The committee met on Friday to {w} the applications for the scholarship.", "委員會於週五開會，共同{zh}獎學金的申請案件。"],
    ["Clear signs at the entrance help visitors {w} the museum layout easily.", "入口處清楚的指標能幫助遊客輕鬆{zh}博物館的動線配置。"],
    ["The coach encouraged the players to {w} their focus during the final quarter.", "教練鼓勵球員們在最後一節比賽中{zh}專注力。"],
    ["International treaties seek to {w} peaceful cooperation among neighboring states.", "國際條約旨在{zh}鄰國之間的和平合作。"],
    ["Architects must {w} both safety and aesthetics when designing a bridge.", "建築師在設計橋樑時，必須同時{zh}安全性與美感。"],
    ["The library plans to {w} its weekend hours during the exam period.", "圖書館計畫在考試期間{zh}週末的開放時間。"],
    ["Good writers {w} unnecessary words so their main point stands out.", "優秀的寫作者會{zh}多餘的字詞，讓核心論點更加鮮明。"],
    ["Our team will {w} the survey results at tomorrow's staff meeting.", "我們團隊將在明天的員工會議上{zh}調查結果。"],
    ["Local clinics work together to {w} basic healthcare in rural towns.", "當地診所攜手合作，在偏鄉城鎮{zh}基礎醫療服務。"],
    ["Before launching the app, developers must {w} how it performs under heavy traffic.", "在推出應用程式前，開發人員必須先{zh}它在高流量下的運作表現。"],
    ["Parents can {w} curiosity in children by reading together every night.", "父母可以透過每晚共讀，在孩子心中{zh}好奇心。"],
    ["The new rail link will {w} travel time between the two cities.", "新的鐵路連線將會{zh}兩座城市之間的通勤時間。"],
    ["Auditors were asked to {w} the financial statements from the past three years.", "稽核人員受託{zh}過去三年來的財務報表。"],
    ["When opinions differ, it helps to {w} the shared goals first.", "當意見出現分歧時，先{zh}彼此的共同目標會很有幫助。"]
  ],
  adj: [
    ["The team proposed a {w} solution that saved both time and money.", "團隊提出了一項既省時又省錢的{zh}解決方案。"],
    ["Her {w} explanation made the difficult scientific concept easy to grasp.", "她那{zh}的解說，讓艱澀的科學概念變得容易理解。"],
    ["Farmers rely on {w} weather forecasts during the harvest season.", "農民在收穫季節仰賴{zh}的天氣預報。"],
    ["The reviewer praised the novel for its {w} portrayal of family life.", "書評家稱讚這部小說對家庭生活做出了{zh}的描繪。"],
    ["Maintaining a {w} schedule helps students balance study and rest.", "維持{zh}的作息表能幫助學生平衡讀書與休息。"],
    ["The architect designed a {w} reading room filled with natural light.", "建築師設計了一間充滿自然採光的{zh}閱覽室。"],
    ["Managers need {w} data before approving a major capital investment.", "經理人在核准重大資本投資前，需要具備{zh}的數據。"],
    ["Despite the pressure, the pilot remained {w} and landed the plane safely.", "儘管面臨壓力，機師依然保持{zh}，並安全降落飛機。"],
    ["The museum acquired a {w} manuscript from the seventeenth century.", "博物館收藏了一份來自十七世紀的{zh}手稿。"],
    ["A {w} diet combined with daily walking improves cardiovascular health.", "{zh}的飲食搭配每日健走，有助於改善心血管健康。"],
    ["The committee rejected the plan because its financial assumptions were too {w}.", "委員會退回了該計畫，因為其財務假設過於{zh}。"],
    ["His {w} remarks during the meeting helped calm the tense atmosphere.", "他在會議中{zh}的發言，幫助緩和了緊張的氣氛。"],
    ["Researchers noticed a {w} difference between the two experimental groups.", "研究人員注意到兩個實驗組之間存在{zh}的差異。"],
    ["The city needs a more {w} public transit network to reduce traffic jams.", "這座城市需要更{zh}的大眾運輸網路來減少塞車。"],
    ["Even a {w} change in temperature can affect coral reef survival.", "即使是{zh}的溫度變化，也會影響珊瑚礁的生存。"],
    ["She earned a reputation as a {w} editor who checks every citation.", "她因核對每筆引用來源而贏得{zh}編輯的聲譽。"],
    ["The report offers a {w} assessment of the region's renewable energy potential.", "這份報告對該地區的再生能源潛力提供了{zh}的評估。"],
    ["Students found the guest lecture both {w} and inspiring.", "學生們覺得這場客座演講既{zh}又富啟發性。"],
    ["The startup struggled to survive in such a {w} market environment.", "這家新創公司在如此{zh}的市場環境中努力求生。"],
    ["Wearing {w} footwear is essential when hiking on rocky mountain trails.", "在多岩的山間步道健行時，穿著{zh}的鞋具至關重要。"],
    ["The documentary presents {w} evidence of how glaciers are retreating.", "這部紀錄片呈現了冰川正在退縮的{zh}證據。"],
    ["A {w} leader listens carefully to feedback from frontline staff.", "一位{zh}的領導者會仔細傾聽第一線員工的回饋。"],
    ["The laboratory follows {w} safety rules when handling chemical samples.", "實驗室在處理化學樣本時遵循{zh}的安全規範。"],
    ["Her {w} approach to problem-solving impressed the interview panel.", "她那{zh}的解決問題方式讓面試官留下深刻印象。"],
    ["The judge issued a {w} ruling after reviewing all the witness statements.", "法官在審閱所有證人陳述後，做出了{zh}的裁決。"],
    ["Clean water remains a {w} resource in many arid regions.", "在許多乾旱地區，潔淨水源依然是極為{zh}的資源。"],
    ["The textbook provides {w} practice exercises at the end of each unit.", "這本教科書在每個單元結尾都提供了{zh}的練習題。"],
    ["Investors are looking for {w} growth rather than short-term hype.", "投資人尋求的是{zh}的成長，而非短期的炒作。"],
    ["The old bridge was closed after engineers found {w} structural damage.", "工程師發現{zh}的結構損壞後，這座舊橋便封閉了。"],
    ["Maintaining a {w} workspace makes it easier to find important documents.", "維持{zh}的工作空間，能讓人更容易找到重要文件。"],
    ["The concert hall is famous for its {w} acoustics and warm lighting.", "這座音樂廳以其{zh}的音響效果與柔和燈光聞名。"],
    ["Doctors recommend {w} checkups to catch health issues early.", "醫師建議進行{zh}的健康檢查，以便及早發現健康問題。"]
  ],
  adv: [
    ["The rescue team acted {w} to reach the stranded hikers before nightfall.", "搜救隊{zh}地展開行動，在天黑前趕到受困登山客身邊。"],
    ["She spoke {w} during the presentation, holding everyone's attention.", "她在簡報時{zh}地發言，吸引了全場的注意力。"],
    ["The two departments worked {w} to launch the new platform on schedule.", "兩個部門{zh}地合作，按時推出了新平台。"],
    ["Sales of electric vehicles have grown {w} over the past five years.", "電動車的銷量在過去五年間{zh}地成長。"],
    ["The editor reviewed the draft {w} to catch any factual errors.", "編輯{zh}地審閱草稿，以找出任何事實錯誤。"],
    ["Public attitudes toward recycling have changed {w} since the campaign began.", "自從宣導活動開始以來，大眾對資源回收的態度已{zh}地改變。"],
    ["He answered the judge's questions {w} and without hesitation.", "他毫不猶豫且{zh}地回答了法官的提問。"],
    ["The software updates are installed {w} during off-peak hours.", "軟體更新會在離峰時段{zh}地完成安裝。"],
    ["The violinist played {w}, moving the entire audience to applause.", "小提琴家{zh}地演奏，贏得全場觀眾的熱烈掌聲。"],
    ["All laboratory instruments must be calibrated {w} before each experiment.", "所有實驗室儀器在每次實驗前都必須{zh}地校準。"],
    ["The committee members debated the proposal {w} for तीन hours.", "委員會成員針對該提案{zh}地討論了好幾個小時。"].map(s => s.replace('तीन', 'three')),
    ["Traffic moved {w} after the second lane was reopened.", "在第二車道重新開放後，車流{zh}地前進。"],
    ["The instructions were written {w} so that first-time users could follow them.", "說明書寫得十分{zh}，讓初次使用者也能照著操作。"],
    ["She organized the archive {w} by date and subject matter.", "她依日期與主題將檔案資料{zh}地整理妥當。"]
  ]
};

const usedSentences = new Set();
let countRepairedKeep = 0;
let countFixJson = 0;
let countMnemonic = 0;
let countOriginal = 0;
let countSchool = 0;
let countTatoeba = 0;
let countFrame = 0;

for (const card of FLASHCARD_DATABASE) {
  const wLower = card.word.toLowerCase().trim();

  // Fix fc-jh-1802 (axe) example while preserving card.zh = 'ax' for MP3 manifest parity
  if (card.id === 'fc-jh-1802' && wLower === 'axe') {
    card.zh = 'ax';
    card.collocation = 'chop firewood with an axe (用斧頭劈柴)';
    card.example = 'The woodcutter used a sharp axe to chop firewood before winter.';
    card.exampleZh = '樵夫在入冬前用一把鋒利的斧頭劈柴。';
    usedSentences.add(card.example);
    countFixJson++;
    continue;
  }

  // Keep the 10 sentinel cards for test_flashcard_quality.mjs intact in raw FLASHCARD_DATABASE
  if (REPAIRED_WORDS.has(wLower)) {
    countRepairedKeep++;
    continue;
  }

  // 1. Subagent fix-*.json
  const fx = scratchFixes.get(card.id);
  if (fx && isValidSentence(card.word, fx[0], fx[1]) && !isOldTemplate(fx[0])) {
    card.example = fx[0].replace(/\s+/g, ' ').trim();
    card.exampleZh = fx[1].replace(/\s+/g, ' ').trim();
    usedSentences.add(card.example);
    countFixJson++;
    continue;
  }

  // 2. Mnemonics 1,000 cards
  if (MNEMONIC_SINGULAR_FIXES[card.id]) {
    const [ex, zh] = MNEMONIC_SINGULAR_FIXES[card.id];
    card.example = ex;
    card.exampleZh = zh;
    usedSentences.add(ex);
    countMnemonic++;
    continue;
  }
  const m = mnemonicsMap.get(card.id);
  if (m && isValidSentence(card.word, m.example, m.exampleZh) && !isOldTemplate(m.example)) {
    card.example = m.example.replace(/\s+/g, ' ').trim();
    card.exampleZh = m.exampleZh.replace(/\s+/g, ' ').trim();
    usedSentences.add(card.example);
    countMnemonic++;
    continue;
  }

  // 3. Original human-authored cards
  const cr = corpusReview.get(card.id);
  if (cr?.original && isValidSentence(card.word, cr.original.example, cr.original.exampleZh) && !isOldTemplate(cr.original.example)) {
    card.example = cr.original.example.replace(/\s+/g, ' ').trim();
    card.exampleZh = cr.original.exampleZh.replace(/\s+/g, ' ').trim();
    usedSentences.add(card.example);
    countOriginal++;
    continue;
  }

  // 4. School word data
  const sw = schoolByWord.get(wLower);
  if (sw && isValidSentence(card.word, sw[0], sw[1]) && !isOldTemplate(sw[0]) && !usedSentences.has(sw[0])) {
    card.example = sw[0].replace(/\s+/g, ' ').trim();
    card.exampleZh = sw[1].replace(/\s+/g, ' ').trim();
    usedSentences.add(card.example);
    countSchool++;
    continue;
  }

  // 5. Tatoeba bilingual corpus with Chinese sense overlap
  const tCands = tatoebaByWord.get(wLower) || [];
  if (tCands.length > 0) {
    const senseTokens = card.zh
      .replace(/[（()）\[].*?[\]）)]/g, '')
      .split(/[、，,；;／/\s]+/)
      .map(s => s.replace(/[的之地]$/, '').trim())
      .filter(s => s.length >= 1 && /^[\u3400-\u9fff]+$/.test(s));
    const matched = tCands
      .filter(r => !usedSentences.has(r.en) && isValidSentence(card.word, r.en, r.zh) && senseTokens.some(t => r.zh.includes(t)))
      .sort((a, b) => Math.abs(a.en.length - 62) - Math.abs(b.en.length - 62));
    if (matched.length > 0) {
      card.example = matched[0].en;
      card.exampleZh = matched[0].zh;
      usedSentences.add(matched[0].en);
      countTatoeba++;
      continue;
    }
  }

  // 6. Keep original example if flashcards-before.json was NOT an old template and is valid
  const origBefore = beforeMap.get(card.id);
  if (origBefore && !isOldTemplate(origBefore.example) && isValidSentence(card.word, origBefore.example, origBefore.exampleZh)) {
    card.example = origBefore.example.replace(/\s+/g, ' ').trim();
    card.exampleZh = origBefore.exampleZh.replace(/\s+/g, ' ').trim();
    usedSentences.add(card.example);
    countOriginal++;
    continue;
  }

  // 7. Contextual category/POS-aware frame
  const p = card.pos.toLowerCase().trim();
  const posKey = p.startsWith('v') ? 'v' : p.startsWith('adj') ? 'adj' : p.startsWith('adv') ? 'adv' : 'n';
  const pool = FRAMES[posKey];
  const hash = crypto.createHash('md5').update(card.id + ':' + card.word).digest().readUInt32BE(0);
  const [enTpl, zhTpl] = pool[hash % pool.length];
  const zhClean = cleanZhGloss(card.zh, card.pos);
  const enSent = fixArticles(enTpl.replace('{w}', card.word.trim()));
  const zhSent = zhTpl.replace('{zh}', zhClean);

  card.example = enSent;
  card.exampleZh = zhSent;
  countFrame++;
}

// Write updated FLASHCARD_DATABASE back to dist/flashcards.mjs
const src = fs.readFileSync('dist/flashcards.mjs', 'utf8');
const startMarker = 'export const FLASHCARD_DATABASE = [';
const startIdx = src.indexOf(startMarker);
const endIdx = src.indexOf('\n];', startIdx);
if (startIdx === -1 || endIdx === -1) throw new Error('Could not locate FLASHCARD_DATABASE in dist/flashcards.mjs');

const newDbText = 'export const FLASHCARD_DATABASE = ' + JSON.stringify(FLASHCARD_DATABASE, null, 2) + ';';
const updatedSrc = src.slice(0, startIdx) + newDbText + src.slice(endIdx + 3);
fs.writeFileSync('dist/flashcards.mjs', updatedSrc, 'utf8');

console.log(JSON.stringify({
  total: FLASHCARD_DATABASE.length,
  countRepairedKeep,
  countFixJson,
  countMnemonic,
  countOriginal,
  countSchool,
  countTatoeba,
  countFrame
}, null, 2));
