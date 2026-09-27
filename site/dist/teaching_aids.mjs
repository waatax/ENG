import { renderTopicVisualChart } from './lesson_visuals.mjs';

const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const profiles=[
 [/被動|passive/i,'動作如何換主角？','🔄',['執行者：The chef','動作：cooks','接受者：the meal'],[['主動','The chef cooks the meal.','主詞執行動作'],['被動','The meal is cooked by the chef.','主詞接受動作；be + 過去分詞'],['必要要求','The meal must be cooked.','情態動詞 + be + 過去分詞']]],
 [/完成式|完成時|perfect/i,'過去事件與現在的連結','⏳',['過去起點：2022','持續：has lived','現在：仍住這裡'],[['已結束的過去','She lived here in 2022.','已結束時間搭過去式'],['延續至今','She has lived here since 2022.','since + 起點'],['時間長度','She has lived here for four years.','for + 長度；是否持續仍看時態']]],
 [/關係|relative|形容詞子句/i,'關係子句的缺口','🔗',['先行詞：the book','子句：I bought ___','合併：the book that I bought'],[['缺主詞','The girl who won is Amy.','who 不可省略'],['缺受詞','The book (that) I bought is new.','限定子句中可省略受詞關係代名詞'],['補充說明','My bike, which is red, is outside.','有逗號；不能用 that']]],
 [/條件|假設|unless|conditional/i,'先看條件，再看結果','🔀',['條件：If it rains','條件成立？','結果：we will stay home'],[['可能的未來','If it rains, we will stay home.','條件子句用現在式'],['現在的假設','If I had time, I would help.','過去式表與現在事實有距離'],['過去的假設','If I had known, I would have helped.','had + p.p.／would have + p.p.']]],
 [/比較|最高級|comparison|comparative|superlative/i,'比較對象要對齊','⚖️',['A 的同一特質','比較：-er / more','B 的同一特質'],[['兩者比較','Amy is taller than Ben.','形容詞比較級 + than'],['群體中最高','Amy is the tallest in her class.','the + 最高級 + 範圍'],['同等比較','Amy is as tall as Ben.','as + 原級 + as']]],
 [/可數|數量|名詞單複|countab|quantifier/i,'先看名詞，再選量詞','🧺',['可數？ a book / books','不可數？ water','依語意選 many / much / some'],[['可數複數','many books / a few books','可一個個計數'],['不可數','much water / a little water','整體或材料'],['借助單位','two pieces of advice','advice 不直接加 s']]],
 [/間接問句|名詞子句|附加問句|indirect|noun clause|tag question/i,'大句裡的小句','💬',['主句：Do you know','疑問詞：where','直述語序：she lives'],[['直接問句','Where does she live?','疑問語序'],['間接問句','Do you know where she lives?','子句改為主詞 + 動詞'],['附加問句','She lives here, doesn’t she?','檢查時態、主詞與肯否']]],
 [/倒裝|inversion|inverted/i,'先還原，再倒裝','↔️',['原句：I have never seen it','前移：Never','倒裝：have I seen it'],[['原句','I have never seen it.','先看助動詞與主詞'],['否定副詞前移','Never have I seen it.','助動詞移到主詞前'],['無原有助動詞','Rarely does she complain.','加 does，主動詞還原']]],
 [/分詞|participle|participial|absolute/i,'化簡前先比對主詞','✂️',['原子句：Because she was tired','主詞同為 she','化簡：Being tired, she rested.'],[['主動關係','Walking home, Amy saw Ben.','Amy 是走路的人'],['被動關係','Written in English, the letter was clear.','letter 是被寫的物件'],['避免懸垂','Walking home, the rain started. → 改明主詞','不要讓雨成為走路的人']]],
 [/動名詞|不定詞|gerund|infinitive/i,'動詞後面接哪種形式？','🧩',['找前面的動詞','查搭配與語意','選 to V 或 V-ing'],[['習慣搭配','enjoy reading / decide to read','搭配需連詞組記憶'],['停止原動作','stop talking','停止說話'],['停下來做另一件事','stop to talk','停下手邊的事去說話']]],
 [/介系詞|問路|方位|directions|preposition/i,'空間與時間的定位','📍',['at：某個點','on：表面／某天','in：空間／較長時段'],[['時間點','at seven','鐘點'],['特定日期','on Monday / on June 1','星期或日期'],['範圍內','in the room / in July','空間或月份；不是所有用法都可直譯']]],
 [/現在進行|continuous|progressive/i,'正在發生的動作','▶️',['主詞：They','be：are','V-ing：reading now'],[['現在進行','They are reading now.','be 隨主詞變化'],['過去進行','They were reading at eight.','過去某時正在進行'],['不同於習慣','They read every day.','習慣通常用現在簡單式']]],
 [/過去|未來|時態|tense|future|narrative/i,'把事件放上時間軸','🕒',['過去：yesterday','現在：now / every day','未來：tomorrow'],[['已結束事件','I visited her yesterday.','過去式'],['現在習慣','I visit her every Sunday.','現在簡單式'],['未來計畫','I am going to visit her tomorrow.','be going to + 原形']]],
 [/be 動詞|第一個完整句子|sentence pattern|句子骨架|基本句型/i,'句子由哪些積木組成？','🧱',['誰／什麼：She','動詞：is / reads','補充：happy / a book'],[['身分、狀態','She is happy.','主詞 + be + 補語'],['動作與受詞','She reads a book.','主詞 + 動詞 + 受詞'],['主詞一致','They are happy.','主詞改複數，be 也改變']]],
 [/do \/ does|第三人稱|現在簡單|頻率|present simple/i,'把第三人稱變化交給 does','🔧',['肯定：She plays','疑問：Does she play?','否定：She doesn’t play.'],[['第三人稱肯定','He watches TV.','watch → watches'],['疑問句','Does he watch TV?','does 後用原形'],['頻率副詞','He often watches TV.','通常在一般動詞前、be 後']]],
 [/發音|音標|拼讀|phonics|phonetic|字典/i,'聲音與字形分開核對','🔊',['看字形與字母組合','查音標／聽發音','遮字聽寫，再核對'],[['短母音示例','cap /kæp/','注意 /æ/'],['長母音示例','cape /keɪp/','常見字尾 e 規則；仍有例外'],['不發音字母','listen /ˈlɪsən/','t 不發音；不能逐字母硬讀']]],
 [/安全|工場|指令|safety/i,'安全指令要保留強度和順序','🛡️',['辨識危險與物件','讀 must / must not','核對 before / after'],[['必要','Wear eye protection.','祈使句：動詞原形起首'],['禁止','Do not touch the switch.','Do not + 原形'],['先後','Disconnect power before cleaning.','先斷電再清潔；操作以設備手冊為準']]],
 [/尺寸|工具|規格|材料|technical|公差/i,'讀規格時把數字和單位綁在一起','📐',['物件／欄位名稱','數值 + 單位','條件／允差'],[['長度','The pipe is 50 mm long.','50 與 mm 必須一起讀'],['上下限','between 48 and 52 mm','確認下限與上限'],['比較','This model uses less energy.','less energy 不等於所有性能都更好']]],
 [/流程|故障|troubleshoot|process/i,'流程與故障排除','🛠️',['觀察症狀','核對條件與證據','選擇下一步／回報'],[['步驟','First, check the indicator.','first 表第一步'],['條件','If the light is off, check the connection.','不要忽略 if 的前提'],['報告','The device stopped after the update.','先後關係不等於已證明原因']]],
 [/圖表|圖面|跨文本|chart|multimodal|規範/i,'圖表不是只看最大的數字','📊',['讀標題與單位','比相同時間／群體','用數據支持有限結論'],[['數值比較','A: 20 → 30; B: 40 → 45','A 增 10，B 增 5'],['變化比例','A: +50%; B: +12.5%','除以各自原值，不能只比較差額'],['結論範圍','A grew faster in this period.','限定在這段期間，不擴成永遠']]],
 [/論證|假設|批判|GMAT|GRE|argument|critical/i,'證據到結論中間缺什麼？','🔎',['證據：公車很擠','假設：新增班次能承接需求','結論：增班會減少擁擠'],[['必要假設','新增班次能服務原本擁擠的乘客','否定此連結，理由就難支持結論'],['削弱','只在離峰時段增班','無法回應尖峰擁擠'],['無關資訊','公車是藍色的','與承接需求沒有直接關聯']]],
 [/作文|寫作|翻譯|writing|email|郵件|簡報/i,'寫作先規劃，再檢查','✍️',['目的與讀者','主張／重點 + 支持','核對意思、句法與語氣'],[['主張','The library should open later.','明確說出建議'],['支持','Students need a quiet place after class.','理由連結讀者需要'],['檢查','補證據、處理限制、避免絕對化','有理由不等於已有實證']]],
 [/篇章|段落|閱讀|推論|reading|cohesion|SAT|TOEIC|GEPT|TOEFL/i,'由線索到答案','📖',['找題目要問的事','定位原文證據','核對範圍與邏輯'],[['對比','However, the plan is costly.','前後通常有反向訊息'],['結果','Therefore, we changed the plan.','後句是前因產生的結果'],['指涉','Students revised essays. This process took time.','this process 指修改文章，不是學生本人']]]
];
export function aidProfile(title) { return profiles.find(p=>p[0].test(title)); }
function dataChart(title) {
 if(!/圖表|chart|multimodal/i.test(title))return '';
 return '<figure class="aid-chart"><figcaption>示範數據：兩組在同一期間的變化（非真實研究）</figcaption>'+[['A 原值',20],['A 新值',30],['B 原值',40],['B 新值',45]].map(([label,n])=>'<div class="aid-bar-row"><span>'+label+'</span><span class="aid-bar-track"><span class="aid-bar" style="width:'+(n*2)+'%"></span></span><strong>'+n+'</strong></div>').join('')+'<p>共用 0–50 刻度。A 增加 10（50%），B 增加 5（12.5%）；數量差和成長率是兩個不同問題。</p></figure>';
}
export function renderTeachingAid(title, concepts=[], examples=[]) {
 const p=aidProfile(title);
 const rows=concepts.map(c=>[c.heading||c.title||'核心觀念',c.formula||c.explanation||c.body||c.content||'',c.example||c.tip||'回到本頁例句，說明如何使用。']).filter(r=>r[1]);
 const flow=p?p[3]:['先看本頁主題','對照具體情境','用自己的例子檢查'];
 const table=p?p[4]:rows.slice(0,6);
 if(!table.length)table.push(['學習目標',title,'先用自己的話解釋，再做本頁練習。']);
 const visualChart = renderTopicVisualChart(title) || dataChart(title);
 return `<section class="card teaching-aid lesson-visual-diagram" aria-label="${e(title)}的圖解與對照"><h2><span aria-hidden="true">${p?p[2]:'🗺️'}</span> ${e(p?p[1]:'本頁觀念地圖')}</h2><ol class="aid-flow">${flow.map((s,i)=>`<li><span class="aid-number">${i+1}</span>${e(s)}</li>`).join('')}</ol>${visualChart}<div class="lesson-table" tabindex="0" role="region" aria-label="可橫向捲動的比較表"><table><caption>${e(title)} · ${p?'示範比較':'觀念整理'}</caption><thead><tr><th scope="col">判斷重點</th><th scope="col">示例／規則</th><th scope="col">如何理解</th></tr></thead><tbody>${table.map(r=>`<tr>${r.map(s=>`<td>${e(s)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${examples.length?`<details><summary>把圖解用在本頁例句</summary><ul>${examples.slice(0,3).map(s=>`<li>${e(s)}</li>`).join('')}</ul><p>依序找出圖中的線索，說明這個例句如何符合規則；若不符合，指出例外。</p></details>`:''}</section>`;
}
