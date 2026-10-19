// practice_extra.mjs — 綜合教學章節與圖解文法的加深練習（每頁再加兩題，原創題目，附解析）。
const q = (id, prompt, options, answer, explanation) => ({ id, prompt, options, answer, explanation });

export const CHAPTER_EXTRA = {
 j1: [
  q('j1-x1', 'Look! The children ___ in the playground now.', ['play', 'plays', 'are playing', 'played'], 2, 'Look! 與 now 表示當下正在發生，主詞複數用 are playing。'),
  q('j1-x2', 'Which sentence describes a fact or habit?', ['The sun rises in the east.', 'The sun is rising now.', 'The sun rose at six yesterday.', 'The sun will rise at six tomorrow.'], 0, '不變的事實與習慣用現在簡單式：The sun rises in the east.')
 ],
 j2: [
  q('j2-x1', 'There isn’t ___ milk in the fridge. Let’s buy some.', ['many', 'much', 'a few', 'few'], 1, 'milk 不可數，否定句用 much；many、a few、few 修飾可數複數。'),
  q('j2-x2', 'Tom and I cleaned the room by ___.', ['us', 'ours', 'ourselves', 'ourself'], 2, '主詞 Tom and I＝we，自己動手用反身代名詞 ourselves。')
 ],
 j3: [
  q('j3-x1', '___ is the library? — It’s next to the gym.', ['When', 'Where', 'Who', 'Why'], 1, '回答是位置（next to the gym），所以問 Where。'),
  q('j3-x2', 'It’s raining hard. You ___ take an umbrella.', ['should', 'mustn’t', 'can’t', 'don’t have to'], 0, '下大雨時給建議用 should；mustn’t 是禁止，與語意相反。')
 ],
 j4: [
  q('j4-x1', 'Ken was tired, ___ he finished his homework.', ['so', 'but', 'because', 'or'], 1, '累了「卻」還是寫完功課，前後語意相反，用 but。'),
  q('j4-x2', 'Which sentence is correct?', ['Because it rained, so we stayed home.', 'Because it rained, we stayed home.', 'Although it rained, but we went out.', 'It rained, because we stayed home.'], 1, 'because 與 so、although 與 but 不能同句並用；第四句因果顛倒。')
 ],
 j5: [
  q('j5-x1', 'Notice: "Library hours: Mon–Fri 8:00–17:00. Closed on national holidays." Can you borrow books on a Saturday?', ['Yes, from 8:00 to 17:00.', 'No, it is open only Monday to Friday.', 'Yes, but only in the morning.', 'Only on national holidays.'], 1, '開放時間只列週一到週五，週六不在其中。'),
  q('j5-x2', 'Menu: "Burger $90 · Fries $40 · Combo (burger + fries + drink) $120." What is the cheapest way to get a burger and fries?', ['Buy them separately for $130.', 'Buy the combo for $120.', 'Buy two burgers.', 'Buy fries only.'], 1, '分開買 90＋40＝130，套餐 120 還多一杯飲料，所以套餐較便宜。')
 ],
 j6: [
  q('j6-x1', 'Announcement: "The train to Hualien will leave from Platform 2—sorry, Platform 3—at 10:15." Where should you go?', ['Platform 2', 'Platform 3', 'Platform 10', 'Platform 15'], 1, 'sorry 後面是更正，最後確認的資訊是 Platform 3。'),
  q('j6-x2', 'In "Do you WANT to come, or not?" with rising-then-falling tone, the speaker most likely feels…', ['happy and relaxed', 'impatient', 'sleepy', 'confused about the time'], 1, '重讀 WANT 加上 or not 的語氣，通常表示不耐煩、要對方快點決定。')
 ],
 j7: [
  q('j7-x1', 'You got a question wrong because you did not know the word "reduce." What type of error is it?', ['詞意', '推論', '時間不足', '粗心抄錯'], 0, '不認識關鍵字屬於詞意錯誤，下一步是補字詞與搭配。'),
  q('j7-x2', 'After a mock exam, which plan is most useful?', ['Read every answer key once.', 'Redo the wrong items without looking, then write why you missed them.', 'Only count the score.', 'Start a new test immediately.'], 1, '不看答案重做並寫下錯因，才能找到需要補強的地方。')
 ],
 s1: [
  q('s1-x1', 'The report written by the students ___ many useful charts.', ['contain', 'contains', 'containing', 'are containing'], 1, '主詞核心是 The report（單數），written by the students 是修飾語，動詞用 contains。'),
  q('s1-x2', 'Find the main verb: "The idea that robots will replace teachers worries many parents."', ['will replace', 'replace', 'worries', 'teachers'], 2, 'that 子句說明 idea 的內容，主句是 The idea … worries many parents。')
 ],
 s2: [
  q('s2-x1', 'Many cities built bike lanes. ___, traffic accidents involving cyclists fell sharply. Choose the best connector.', ['However', 'As a result', 'For instance', 'In contrast'], 1, '後句是前句措施帶來的結果，用 As a result。'),
  q('s2-x2', 'Sentence A: "Some students study with music." Which sentence best follows?', ['They say it helps them stay focused.', 'However, music was invented long ago.', 'This is why the library opens at eight.', 'For example, cats sleep a lot.'], 0, 'They 回指 Some students，並延續說明原因；其他選項與前句無邏輯關聯。')
 ],
 s3: [
  q('s3-x1', 'Text A says screen time harms sleep. Text B says the type of content matters more than time. On what do they DISAGREE?', ['Whether sleep matters', 'What mainly affects sleep', 'Whether teenagers use screens', 'Whether studies exist'], 1, 'A 認為關鍵是時間長短，B 認為是內容類型，分歧在「主要影響因素」。'),
  q('s3-x2', '"The survey shows 70% of students ate breakfast. Therefore, breakfast raises grades." What is the problem?', ['The number is wrong.', 'It treats a description as proof of cause.', 'It is too short.', 'It uses a percentage.'], 1, '調查只描述有多少人吃早餐，不能直接證明吃早餐「導致」成績提高。')
 ],
 s4: [
  q('s4-x1', 'The new policy had a significant ___ on prices.', ['affect', 'effect', 'effective', 'affection'], 1, 'have an effect on 是固定搭配；affect 是動詞。'),
  q('s4-x2', 'She is responsible ___ the project budget.', ['of', 'to', 'for', 'with'], 2, 'be responsible for（負責）是固定搭配。')
 ],
 s5: [
  q('s5-x1', '翻譯：「他每天花一小時練習英文。」', ['He spends an hour practicing English every day.', 'He spends an hour to practice English every day.', 'It spends him an hour practicing English.', 'He costs an hour practicing English every day.'], 0, '人 + spend + 時間 + V-ing；cost 的主詞是事物，不是人。'),
  q('s5-x2', '翻譯：「越早出發，越早到達。」', ['Earlier we leave, earlier we arrive.', 'The earlier we leave, the earlier we arrive.', 'The early we leave, the early we arrive.', 'More early we leave, more early we arrive.'], 1, '「越…越…」用 The + 比較級…, the + 比較級…。')
 ],
 s6: [
  q('s6-x1', 'Which is the best topic sentence for a paragraph supporting school uniforms?', ['Uniforms come in many colors.', 'School uniforms can reduce peer pressure about clothing.', 'I wore a uniform yesterday.', 'Some schools are old.'], 1, '主題句要清楚表達立場與方向，後面才能用理由和例子支持。'),
  q('s6-x2', 'Which sentence is an example rather than a reason?', ['Uniforms save families money.', 'For instance, my parents spend less on clothes each term.', 'Uniforms create a sense of belonging.', 'Uniforms reduce distractions.'], 1, 'For instance 帶出具體經驗，是支持理由的例子。')
 ],
 s7: [
  q('s7-x1', 'In a timed test you are stuck on one question for three minutes. What is the best move?', ['Keep trying until you solve it.', 'Mark it, move on, and return later.', 'Leave the test.', 'Change all previous answers.'], 1, '先標記跳過，把時間留給其他題，最後再回來處理。'),
  q('s7-x2', 'Your errors are mostly in long reading passages, not grammar. What should you practice next?', ['More grammar drills', 'Timed reading with main-idea and evidence questions', 'Only vocabulary lists', 'Nothing'], 1, '依錯因安排練習：閱讀長文的主旨與證據題才是弱點。')
 ],
 v1: [
  q('v1-x1', 'Sign: "Eye protection required." What must you do?', ['Remove your glasses.', 'Wear safety goggles.', 'Close your eyes.', 'Leave the area.'], 1, 'required 表必須；eye protection 指護目鏡等防護。'),
  q('v1-x2', 'Which instruction is a recommendation, not a rule?', ['Do not touch the blade.', 'Gloves must be worn.', 'It is a good idea to check the tool before use.', 'No entry.'], 2, 'It is a good idea to… 是建議；do not、must、No entry 都是規定。')
 ],
 v2: [
  q('v2-x1', 'A bolt is listed as "M8 × 30 mm." What does 30 mm most likely describe?', ['Thread diameter', 'Length', 'Weight', 'Price'], 1, 'M8 表示螺紋直徑 8 mm，× 30 mm 是長度。'),
  q('v2-x2', 'The tolerance is 50.0 ± 0.2 mm. Which part passes?', ['49.7 mm', '50.3 mm', '50.1 mm', '50.5 mm'], 2, '容許範圍 49.8–50.2 mm，只有 50.1 mm 在範圍內。')
 ],
 v3: [
  q('v3-x1', 'Log: "Symptom: motor makes noise. Check: belt loose. Action: belt tightened." What was the cause?', ['A broken motor', 'A loose belt', 'No power', 'Too much oil'], 1, '檢查結果 belt loose 指出原因，處置是把皮帶調緊。'),
  q('v3-x2', 'What should come FIRST when a machine stops suddenly?', ['Order new parts.', 'Turn off the power and make it safe.', 'Hit the machine.', 'Write the final report.'], 1, '故障排除先確保安全（斷電），再檢查原因。')
 ],
 v4: [
  q('v4-x1', 'Table: Model A 500 W / 2.0 kg; Model B 800 W / 3.5 kg; Model C 800 W / 2.4 kg. You need ≥ 800 W and ≤ 3 kg.', ['Model A', 'Model B', 'Model C', 'None'], 2, 'C 同時符合功率 ≥ 800 W 與重量 ≤ 3 kg；B 太重，A 功率不足。'),
  q('v4-x2', 'In a manual, the word "Caution" usually signals…', ['a possible risk of damage or injury', 'a discount', 'the end of the manual', 'a color option'], 0, 'Caution 提醒可能造成損壞或受傷的情況。')
 ],
 v5: [
  q('v5-x1', 'Which email subject line is clearest?', ['Hi', 'Question', 'Request: replacement filter by Oct 30', 'Something important'], 2, '主旨要說出事項與期限，收件人一眼知道要做什麼。'),
  q('v5-x2', 'Choose the most polite request.', ['Send me the file now.', 'Could you please send me the file by Friday?', 'File. Friday.', 'You must send the file.'], 1, 'Could you please… 加上明確期限，既禮貌又清楚。')
 ],
 v6: [
  q('v6-x1', 'Original: "Sales rose 5% in March but fell 2% in April." Which summary is accurate?', ['Sales rose in both months.', 'Sales rose in March, then dropped slightly in April.', 'Sales fell 5% in March.', 'Sales doubled.'], 1, '摘要要保留兩個月相反的變化，不能增減數字或結論。'),
  q('v6-x2', '翻譯：「請在使用前閱讀說明書。」', ['Please read the manual before use.', 'Please reading the manual before use.', 'Please read manual after use.', 'Read before the manual use.'], 0, 'Please + 原形動詞；before use 是說明書常見寫法。')
 ],
 v7: [
  q('v7-x1', 'Handover note: "Pump 2 repaired. Pump 3 still leaking—Lin will replace the seal tomorrow." Who is responsible for Pump 3?', ['Nobody', 'Lin', 'The writer', 'The customer'], 1, '交接紀錄寫明 Lin 明天更換密封圈。'),
  q('v7-x2', 'A foreign client bows slightly when greeting you. What is the best response?', ['Ignore it.', 'Return a polite greeting, such as a nod or handshake if offered.', 'Laugh.', 'Turn away.'], 1, '國際交流要尊重不同禮儀，以適當方式回禮（技高課綱 8-V-4）。')
 ],
 gept: [
  q('gept-x1', 'A: "Would you like to join us for dinner?" B: ___', ['Yes, I like.', 'I’d love to. What time?', 'No, I don’t join.', 'Dinner is a meal.'], 1, '接受邀請並追問時間，是自然且完成溝通任務的回應。'),
  q('gept-x2', 'Which sentence best describes a picture of a crowded train?', ['The train is empty.', 'Many passengers are standing in the train.', 'A dog is flying.', 'It is a train.'], 1, '看圖描述要具體說出人物與動作，而不是只說出名詞。')
 ],
 toeic: [
  q('toeic-x1', 'The meeting has been ___ to next Monday due to the holiday.', ['postponed', 'postpone', 'postponing', 'postpones'], 0, 'has been + 過去分詞構成現在完成被動。'),
  q('toeic-x2', 'Email: "Please submit your expense report to Ms. Ito by 5 p.m. Thursday." Who should receive the report?', ['The writer', 'Ms. Ito', 'The client', 'Accounting manager'], 1, '收件對象明寫 to Ms. Ito。')
 ],
 sat: [
  q('sat-x1', 'The results were surprising; ___, the team repeated the experiment.', ['however', 'therefore', 'for example', 'meanwhile'], 1, '結果出乎意料，所以重做實驗：因果關係用 therefore。'),
  q('sat-x2', 'Which choice completes the text with correct punctuation? "The museum has three wings___ ancient art, modern art, and photography."', [';', ':', ',', 'no punctuation'], 1, '冒號在完整子句後引出清單。')
 ],
 gre: [
  q('gre-x1', 'Far from being ___, the professor’s lectures were famously clear.', ['lucid', 'opaque', 'brief', 'popular'], 1, 'Far from being 後接與 clear 相反的字：opaque（晦澀）。'),
  q('gre-x2', 'Her praise was so ___ that no one believed she meant it.', ['sincere', 'effusive', 'scarce', 'accurate'], 1, '過度熱烈（effusive）的稱讚反而讓人懷疑真誠。')
 ],
 gmat: [
  q('gmat-x1', 'Claim: "Sales rose after the ad campaign, so the campaign caused the rise." Which is an assumption?', ['No other factor caused the rise.', 'Ads are expensive.', 'Sales were recorded.', 'The campaign was colorful.'], 0, '把時間先後當因果，必須假設沒有其他原因（如季節、降價）。'),
  q('gmat-x2', 'Which finding would STRENGTHEN the claim above?', ['Competitors cut prices at the same time.', 'Regions without the ads saw no rise in sales.', 'The ads ran at night.', 'Sales fell last year.'], 1, '沒有廣告的地區沒有成長，提供對照，支持廣告造成成長。')
 ],
 toefl: [
  q('toefl-x1', 'In an academic discussion, which response adds a new idea and supports it?', ['I agree.', 'I agree with Maya, and I’d add that online tools let shy students participate—our class forum doubled discussion posts.', 'This is a topic.', 'Maybe.'], 1, '好的回應要回應同儕、提出新觀點並附上支持證據。'),
  q('toefl-x2', 'Which email sentence states a clear purpose?', ['Hello there.', 'I’m writing to ask whether I can submit the lab report two days late because of a medical appointment.', 'Thanks.', 'See you.'], 1, '目的句要說明請求內容與原因。')
 ]
};

const g = (q, options, answer, explanation) => ({ q, options, answer, explanation });
export const GRAMMAR_EXTRA = {
 sentence: [g('She gave me a book. 的 me 是什麼？', ['直接受詞', '間接受詞', '主詞補語'], 1, 'me 是接受者（間接受詞），a book 是被給的東西（直接受詞）。'), g('Which sentence is S + V + O + C?', ['We call him Max.', 'He runs.', 'She is a nurse.'], 0, 'him 是受詞，Max 補充說明受詞，屬於 S + V + O + C。')],
 'be-do': [g('She ___ a student. She ___ in Taipei.', ['is; lives', 'does; is live', 'is; is live'], 0, '身分用 be（is）；動作用一般動詞並加 s（lives）。'), g('___ they play soccer after school?', ['Are', 'Do', 'Does'], 1, 'play 是一般動詞，主詞 they 用 Do 提問。')],
 nouns: [g('I bought two ___ of bread.', ['loaf', 'loaves', 'loafs'], 1, 'loaf 的複數是 loaves；bread 不可數，用量詞計數。'), g('There is ___ orange on the table.', ['a', 'an', 'some'], 1, 'orange 以母音開頭，單數用 an。')],
 pronouns: [g('Mia and ___ are classmates.', ['me', 'I', 'my'], 1, '當主詞用主格 I：Mia and I are…'), g('The dog wagged ___ tail.', ['it’s', 'its', 'it'], 1, '所有格是 its；it’s＝it is。')],
 prepositions: [g('My birthday is ___ May.', ['on', 'in', 'at'], 1, '月份用 in。'), g('The cat is sleeping ___ the sofa (沙發上).', ['in', 'on', 'at'], 1, '在表面上用 on。')],
 adjectives: [g('This test is ___ than the last one.', ['easy', 'easier', 'more easy'], 1, '兩音節 -y 結尾變 -ier：easier。'), g('He drives ___ in the rain.', ['careful', 'carefully', 'care'], 1, '修飾動詞 drives 用副詞 carefully。')],
 'present-past': [g('Water ___ at 100°C.', ['boils', 'boiled', 'is boil'], 0, '科學事實用現在簡單式。'), g('We ___ to Tainan last summer.', ['go', 'went', 'goes'], 1, 'last summer 是已結束的過去，用 went。')],
 progressive: [g('Listen! The baby ___.', ['cries', 'is crying', 'cried'], 1, 'Listen! 表示當下正在發生，用現在進行式。'), g('I ___ TV when the phone rang.', ['watched', 'was watching', 'am watching'], 1, '長動作（看電視）被短動作（電話響）打斷，用過去進行式。')],
 perfect: [g('I ___ this movie three times.', ['saw', 'have seen', 'see'], 1, '到目前為止的經驗次數用現在完成式。'), g('By the time we arrived, the show ___.', ['started', 'has started', 'had started'], 2, '過去某時間點（arrived）之前已發生，用過去完成式。')],
 future: [g('Look at those clouds! It ___ rain.', ['is going to', 'will to', 'goes to'], 0, '依眼前跡象預測，用 be going to。'), g('A: The phone is ringing. B: I ___ get it.', ['am going to', 'will', 'going'], 1, '當下臨時決定用 will。')],
 modals: [g('You ___ wear a uniform on Fridays; it’s optional.', ['must', 'don’t have to', 'mustn’t'], 1, 'optional（可選）表示不必，用 don’t have to。'), g('He looks very tired. He ___ be working late every night.', ['must', 'can’t', 'shouldn’t'], 0, '根據證據做出肯定推測用 must。')],
 passive: [g('English ___ in many countries.', ['speaks', 'is spoken', 'is speaking'], 1, '語言是「被說」，用 be + p.p.。'), g('The bridge ___ in 1990.', ['built', 'was built', 'has built'], 1, '過去被建造：was built。')],
 infinitives: [g('I decided ___ a new bike.', ['buying', 'to buy', 'buy'], 1, 'decide 後接 to V。'), g('Do you mind ___ the window?', ['to open', 'opening', 'open'], 1, 'mind 後接 V-ing。')],
 relative: [g('This is the house ___ I grew up.', ['which', 'where', 'who'], 1, '子句缺地點副詞（in which），用 where。'), g('The boy ___ bike was stolen called the police.', ['who', 'whose', 'whom'], 1, '表所有關係（男孩的腳踏車）用 whose。')],
 'noun-clauses': [g('I wonder ___ he will come.', ['that', 'whether', 'what'], 1, '表「是否」用 whether（或 if）。'), g('___ she said surprised everyone.', ['What', 'That', 'Which'], 0, 'What 子句當主詞，表示「她所說的話」。')],
 connectors: [g('___ it was late, he kept working.', ['Although', 'Because', 'So'], 0, '前後語意相反（晚了卻繼續工作），用 Although。'), g('Take an umbrella ___ it rains.', ['in case', 'unless', 'although'], 0, 'in case 表「以防」。')],
 conditionals: [g('If I had studied harder, I ___ the test.', ['would pass', 'would have passed', 'will pass'], 1, '與過去事實相反：would have + p.p.。'), g('Unless you hurry, you ___ the bus.', ['miss', 'will miss', 'would miss'], 1, 'Unless＝if not；真實條件的未來結果用 will。')],
 participles: [g('___ in 1920, the school is very old.', ['Building', 'Built', 'Build'], 1, '學校是「被建」，用過去分詞 Built。'), g('___ the news, she started to cry.', ['Hearing', 'Heard', 'Hear'], 0, '她主動聽到消息，用現在分詞 Hearing。')],
 agreement: [g('Neither the teacher nor the students ___ ready.', ['is', 'are', 'be'], 1, 'neither…nor 的動詞與較近的主詞 students 一致：are。'), g('Not only ___ well, but he also dances.', ['he sings', 'does he sing', 'he does sing'], 1, 'Not only 放句首要倒裝：does he sing。')],
 technical: [g('Which line is a clear safety instruction?', ['Maybe check the guard.', 'Check that the guard is closed before starting the machine.', 'The guard exists.'], 1, '安全指令要用祈使句，並寫出動作與時機。'), g('Which report sentence states a measurement result?', ['Measure the shaft.', 'The shaft measured 25.02 mm, within tolerance.', 'Shafts are important.'], 1, '報告要寫出量測值與判定結果。')]
};
