import fs from 'node:fs';
import {UNIFIED_GRADES} from '../dist/curriculum_unified.mjs';
// Reviewed replacements: prompt, three distinct options, correct index, reasoning.
const rows = [
['g6-s1-u4',1,'Doctor: What is the matter? Which reply describes a symptom?',['I have a cough.','It is Monday.','My name is Leo.'],0,'cough 是咳嗽，回應身體症狀；另外兩句分別說日期與姓名。'],
['g6-s1-u4',2,'Which sentence gives advice?',['You should rests.','You should rest.','You should to rest.'],1,'should 是情態助動詞，後接原形 rest，不加 s 或 to。'],
['g6-s2-u5',0,'Which food is commonly associated with the Moon Festival?',['rice dumplings','birthday cake','mooncakes'],2,'mooncakes 是月餅；rice dumplings 常與端午節連結。節慶習俗仍會因家庭與地區不同。'],
['g6-s2-u6',0,'She answered the question ___.',['careful','carefully','care'],1,'修飾 answered 這個動作用副詞 carefully；careful 是形容詞。並非所有 -ly 結尾都是副詞。'],
['g6-s2-u7',0,'I bought the tickets yesterday. I ___ visit Tainan next week.',['am going to','going to','will to'],0,'am going to + 原形可表事先計畫；going to 缺 am，will 後不加 to。此句若選項是 will visit，也可能成立。'],
['g7-s1-u1',0,'In “Birds fly,” what is the sentence pattern?',['S + V + O','S + V + SC','S + V'],2,'Birds 是主詞，fly 是不及物動詞，句中沒有受詞或主詞補語。'],
['g7-s1-u2',1,'Choose the negative instruction.',['Do not run here.','Not runs here.','Does not run here.'],0,'否定祈使句用 Do not + 原形動詞；通常省略主詞 you。'],
['g7-s1-u3',0,'Which word has /iː/ in the pronunciation shown?',['bit /bɪt/','beat /biːt/','bet /bet/'],1,'beat 的 /iː/ 與 bit 的 /ɪ/ 不同；辨音除了長短，也要注意母音音質。'],
['g7-s2-u5',0,'There ___ two books on the desk.',['is','be','are'],2,'two books 是複數，此處存在句使用 There are。'],
['g8-s1-u1',0,'First, wash the apples. ___, cut them into pieces.',['Then','Because','Although'],0,'Then 標示下一個步驟；Because 與 Although 不能單獨接成此句的順序副詞。'],
['g8-s2-u5',0,'The soup smells ___.',['wonderfully','wonderful','wonder'],1,'smells 在此為連綴動詞，後接形容詞 wonderful 描述 soup。'],
['g9-s2-u4',0,'Do you know ___?',['where is the bank','where does the bank','where the bank is'],2,'嵌入問句用 where + 主詞 + 動詞，不沿用直接問句倒裝。'],
['g9-s2-u6',0,'The timetable says 4 p.m. A newer notice says the bus now leaves at 4:30 p.m. When does it leave?',['4:30 p.m.','4 p.m.','3:30 p.m.'],0,'更新通知明示更改時間，應用新資訊修正原時刻表。'],
['g10-s1-u1',0,'In “They made Amy captain,” what is “captain”?',['Direct object','Object complement','Subject'],1,'Amy 是受詞，captain 補充說明 Amy 的身分，是受詞補語。'],
['g10-s1-u1',1,'The news made us ___.',['happily','happiness','happy'],2,'make + 受詞 + 形容詞補語；happy 描述 us 的狀態，不是以副詞修飾 made。'],
['g10-s1-u3',1,'Which sentence uses an inanimate subject naturally?',['The heavy rain delayed the train.','The train was delay by rain.','The rain delaying the train.'],0,'rain 是無生命主詞，delayed 是限定動詞；B 缺過去分詞，C 缺限定動詞。'],
['g10-s1-u4',0,'Please tell me ___.',['why did she leave','why she left','why she did left'],1,'間接問句採主詞 she + 過去式 left；不倒裝，也不在 did 後再用 left。'],
['g10-s1-u6',0,'I will call you when I ___ at the station.',['will arrive','arrived','arrive'],2,'表未來時間的 when 副詞子句通常用現在式 arrive；不是所有含 when 的句子都如此。'],
['g10-s2-u9',0,'Choose the correctly punctuated pair of independent clauses.',['It rained; however, we continued.','It rained, however we continued.','It rained however we continued.'],0,'however 是連接副詞；此處用分號分隔獨立子句，再以逗號接續。'],
['g10-s2-u10',0,'Sales rose from 100 to 120 units. Which description is accurate?',['Sales fell by 20 units.','Sales increased by 20%.','Sales doubled.'],1,'增加 20，除以原值 100 得 20%；doubled 代表變成 200。'],
['g10-s2-u10',1,'Text A supports remote work for flexibility. Text B supports it but asks for better training. What do both support?',['Removing all training','Closing every office','Remote work'],2,'共同立場是支持 remote work；B 加上訓練需求，不等於反對遠距工作。'],
['g10-s2-u11',0,'Her coat is gone and her desk is empty. Which expresses a deduction about the past?',['She must have left.','She must leave tomorrow.','She should leave now.'],0,'must have + 過去分詞表示對過去的強烈推測；不是直接確認的事實。'],
['g10-s2-u11',1,'I forgot my umbrella and got wet. “I should have brought it” expresses ___.',['a future plan','regret about a past action','a present obligation only'],1,'此語境中 should have brought 表示本來應帶卻沒帶的遺憾；其他語境也可表預期。'],
['g10-s2-u12',0,'A passage says “Only members can borrow laptops.” Who can borrow one according to this rule?',['Any visitor','Only teachers','Members'],2,'答案需保留 only 的限制，不可擴大為所有訪客，也未限定教師。'],
['g11-s1-u1',1,'The lecture was ___. I felt ___.',['boring / bored','bored / boring','bore / bored'],0,'boring 描述事物令人無聊；bored 描述人感到無聊。'],
['g11-s1-u3',0,'If I had more time now, I ___ another language.',['will learned','would learn','had learned'],1,'had 在此表現在假設，主句用 would + 原形 learn。'],
['g11-s2-u9',1,'What does “reusable” most directly mean?',['unable to be used','used only once','able to be used again'],2,'re- 表再一次，use + -able 表能被使用；仍須以實際詞義核對拆字推論。'],
['g11-s2-u10',0,'A small trial found lower energy use. Which claim stays within the evidence?',['Energy use fell in this trial.','The method always saves energy everywhere.','All environmental problems are solved.'],0,'只可描述本次試驗結果，不能外推到所有地方或所有環境問題。'],
['g11-s2-u10',1,'The city aims to ___ carbon emissions.',['decline','reduce','fall'],1,'reduce 可直接接 emissions 作受詞；decline 與 fall 表下降時通常不如此帶受詞。'],
['g12-s1-u2',0,'The team needs an ___ solution.',['effectively','effectiveness','effective'],2,'冠詞 an 後、名詞 solution 前，此句需要形容詞 effective。'],
['g12-s1-u2',1,'“The old battery lasted two hours. ___. This improvement helped travelers.” Which sentence fits?',['The new one lasts ten hours.','The battery was painted blue without other changes.','Travelers disliked every improvement.'],0,'十小時相較兩小時的續航增加，可讓後句 This improvement 有明確指涉。'],
['g12-s1-u3',1,'A question asks for TWO reasons from the passage. What is the best response strategy?',['Give one personal opinion.','State two supported reasons and follow the word limit.','Copy the entire passage.'],1,'須同時满足數量、文本證據與題目字數要求，不能以個人意見取代證據。'],
['g12-s1-u4',0,'A writing prompt explicitly requests TWO paragraphs. What should guide the structure?',['Always write four paragraphs.','Write one long sentence.','Follow the two-paragraph task and develop each purpose.'],2,'以該題提示為準；不要硬套固定三段或四段模板。'],
['g12-s1-u5',0,'How should you plan time for a new exam paper?',['Check its sections and time limit, then allocate time.','Use the same seconds for every question in every exam.','Skip all reading instructions.'],0,'先核對實際卷面與時間，再依自身速度調整，本站配速只是練習建議。'],
['g12-s1-u5',1,'Combine: “The technician fixed the machine. It now works well.”',['The technician fixed the machine it now works well.','The machine that the technician fixed now works well.','The machine that fixed the technician now works well.'],1,'that 指 machine，作 fixed 的受詞；B 保留技師修機器的原意，A 逗接結構不完整，C 反轉施受關係。'],
['g12-s1-u6',1,'A ferry runs at 5 p.m., but a notice cancels all trips after 4 p.m. today. Can you take it today?',['Yes, because the timetable lists it.','Yes, because all notices are optional.','No, the cancellation applies.'],2,'交叉比對日期與 after 4 p.m. 的限制，5 p.m. 班次在取消範圍內。'],
['g12-s2-u7',1,'Which reply answers “Why do you prefer studying alone?” with a reason?',['I can concentrate better without conversation.','Studying alone.','It is a preference.'],0,'A 回答原因；B、C 只是重述題目，沒有支持細節。實際答題時長依題目規定。'],
['g12-s2-u8',0,'Ms. Lin reviewed the spreadsheet ___.',['thorough','thoroughly','thoroughness'],1,'此處修飾 reviewed 動作用副詞 thoroughly；thorough 是形容詞，thoroughness 是名詞。'],
['g12-s2-u9',1,'Which sentence signals a move to the next presentation section?',['Thank you; that ends my talk.','Could you repeat the question?','Now let us turn to the results.'],2,'turn to the results 標示轉到結果；其他兩句分別是結束與要求重述問題。'],
['g12-s2-u10',1,'“The system is costly to install. However, it reduces maintenance costs.” What is the second sentence doing?',['Offering a counterpoint to the cost concern','Repeating the installation cost','Proving there are no costs'],0,'第二句補上不同面向的成本優勢，並未證明所有成本都消失。'],
['g12-s2-u11',0,'A long sentence is hard to parse during practice. What helps identify its main structure?',['Translate every word before finding any verb.','Find the main subject and finite verb, then reconnect modifiers.','Choose the longest answer automatically.'],1,'先找主詞與限定動詞，再接回修飾語；選項長短不是正確性證據。']
];
let source=fs.readFileSync('dist/curriculum_unified.mjs','utf8');
const units=UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units));
for(const [id,index,stem,options,answer,analysis] of rows) {
  const concept=units.find(u=>u.id===id).concepts[index];
  const needle='"title": '+JSON.stringify(concept.title);
  const start=source.indexOf(needle,source.indexOf('"id": '+JSON.stringify(id)));
  const a=source.indexOf('"examExample": {',start), b=source.indexOf('\n                }',a)+18;
  if(start<0||a<0||b<a)throw Error(id);
  const next='"examExample": '+JSON.stringify({stem,options,answer,analysis:analysis.replaceAll('满足','滿足')},null,2).replaceAll('\n','\n                ');
  source=source.slice(0,a)+next+source.slice(b);
}
fs.writeFileSync('dist/curriculum_unified.mjs',source);
console.log(`Rewrote ${rows.length} concept examples. Original module IDs preserved.`);
