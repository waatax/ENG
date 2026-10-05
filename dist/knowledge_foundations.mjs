// knowledge_foundations.mjs - 核心基礎知識點：be 動詞句型、日常三單問句與段落連貫邏輯
// 原創繁中教學與例句，針對初學者與升學考生進行深度語法剖析與大考題眼校正。

export const foundations = [
  {
    id: 'be-sentences',
    stage: '國小',
    title: '第一個完整句子：I am、you are、she is',
    goal: '用 be 動詞介紹人物身分、描述特質狀態和時空位置，並能正確改寫為否定句與疑問句。',
    prior: '認得主格代名詞 I、you、he、she、it、we、they。',
    rule: '英文完整敘述句通常必須具備「主詞 (Subject)」與「限定動詞 (Finite Verb)」。在描述身分、特質狀態或所在位置時，使用連綴動詞 be（現在式為 am / is / are）：I 搭配 am；he / she / it 及單數名詞搭配 is；you / we / they 及複數名詞搭配 are。否定句在 be 後加 not（is not = isn’t, are not = aren’t）；疑問句將 be 移至主詞前方。特別注意：肯定簡答句尾絕對不能縮寫（例如：Yes, he is. 不可寫成 *Yes, he’s.*），且一般動詞不能隨意濫加 be（如 *I am live here* 為典型雙動詞錯誤）。',
    pairs: [
      ['I am a student. She is ready.', 'am / is 是核心連綴動詞；a student 說明身分，ready 描述當前狀態。'],
      ['The books are on the desk.', 'books 是複數名詞，動詞用 are；on the desk 標明具體空間位置。'],
      ['He is not tired. Is he tired? Yes, he is.', '否定句在 is 後加 not；疑問句將 is 提到句首；肯定簡答句尾必須完整寫 he is，不得縮寫。']
    ],
    steps: [
      '步驟 1 鎖定主詞：先圈出主詞，精確判斷是第一人稱 I、單數第三人稱，還是 you / 複數名詞。',
      '步驟 2 匹配動詞：依人稱配對 am / is / are，接身分名詞時注意單數可數名詞需加 a / an 等限定詞。',
      '步驟 3 句型轉換：改否定直接在 be 後加 not；改疑問將 be 提到主詞前方。若動詞本身已是一般動詞（如 play、like），不可把 be 直接加在原形動詞前；進行式 be + V-ing 與被動式 be + 過去分詞則是另外的合法結構。'
    ],
    trap: '常見考場陷阱 ➔ 錯：She happy.（漏掉 be 動詞，形容詞不可單獨作謂語）➔ 正確：She is happy。錯：They is students.（主謂不一致）➔ 正確：They are students。錯：I am agree with you.（agree 本身已是動詞，不可加 am）➔ 正確：I agree with you。肯定簡答注意：Yes, I am.（不可寫 Yes, I’m.）。',
    questions: [
      ['My brother ___ in the classroom.', ['am', 'is', 'are'], 1, 'My brother 是單數第三人稱，用 is。am 只與 I 搭配；are 用於 you（單數或複數）及複數主詞。'],
      ['Which question is correct?', ['Are they ready?', 'Do they are ready?', 'They ready?'], 0, '原句 They are ready. 為含有 be 動詞的句子，提問時直接將 are 移到主詞 they 前即可，不加助動詞 do，也不能省略 be 動詞。']
    ],
    task: '介紹自己，再寫一句描述兩位朋友特質的句子，最後將其中一句改成疑問句並寫出簡答。',
    model: 'I am a student. My friends are kind. Are my friends kind? Yes, they are. 檢查：I 搭配 am；複數 friends 搭配 are；疑問句將 are 置於主詞前，簡答句尾 they are 不縮寫。'
  },
  {
    id: 'present-questions',
    stage: '國小',
    title: '日常動作：第三人稱與 do / does 問句',
    goal: '描述日常習慣、客觀事實與規律動作，熟練動詞三單變化，並正確運用 do / does 進行提問與否定。',
    prior: '先能分辨主詞，以及 be 動詞與一般動詞的本質差異。',
    rule: '現在簡單式（Simple Present）用於表達日常習慣、反覆發生的動作或不變的客觀真理。肯定句中，當主詞為第三人稱單數（he / she / it 或單數名詞）時，動詞須進行三單變化（多數加 -s；結尾為 -s, -sh, -ch, -x 常加 -es；go / do 加 -es，但不是所有 -o 結尾都如此（如 radio → radios）；子音 + y 改 -ies；不規則 have 變 has）。一般動詞的是非問句與否定句通常用 do / does；主詞問句如 Who lives here? 不加 do / does：第三人稱單數用 Does / does not，此時第三人稱變化已被 does 吸收，後方的主要動詞必須徹底「還原為原形動詞（V）」。',
    pairs: [
      ['Mina walks to school every day.', 'Mina 是單數第三人稱，肯定句一般動詞 walk 須加 s。'],
      ['Does Mina walk to school?', '助動詞 does 已負責第三人稱標記，主要動詞 walk 必須還原成原形。'],
      ['She does not watch TV on Mondays.', '否定句使用 does not（doesn’t），後方主要動詞 watch 保持原形，不寫 watches。']
    ],
    steps: [
      '步驟 1 判斷人稱與時態：核對是否為習慣或事實。若主詞為 he / she / it / 單數名詞，肯定句動詞必須加 -s / -es。',
      '步驟 2 注意字尾拼字規律：watch ➔ watches（-ch結尾）；study ➔ studies（子音+y）；play ➔ plays（母音+y）；have ➔ has。',
      '步驟 3 助動詞還原原則：疑問句或否定句一旦出現 Does / doesn’t，後方的主要動詞必須立刻退回原形動詞。'
    ],
    trap: '常見考場陷阱 ➔ 錯：Does Tom likes music?（does 後不可再加 s）➔ 正確：Does Tom like music? 錯：He don’t study.（單數三單須用 doesn’t）➔ 正確：He doesn’t study. 錯：She is like cats.（like 本身是一般動詞，不可加 is）➔ 正確：She likes cats。',
    questions: [
      ['Leo ___ English every evening.', ['study', 'studies', 'studying'], 1, 'Leo 是單數第三人稱，時間 every evening 表示日常規律習慣，動詞 study 為「子音+y」，去 y 改 ies 為 studies。study 未變化；studying 缺少 be 動詞不能單獨作謂語。'],
      ['___ your sister ___ coffee?', ['Do / drinks', 'Does / drink', 'Does / drinks'], 1, 'your sister 是單數第三人稱，疑問句使用助動詞 Does；助動詞後的主要動詞必須還原為原形 drink，不可重複加 s。']
    ],
    task: '寫一位家人或朋友的日常習慣（肯定句），接著分別改寫為否定句與疑問句，檢驗動詞還原。',
    model: 'My father cooks dinner. My father does not cook dinner. Does my father cook dinner? 三句分別檢查 cooks、does not cook、Does ... cook。'
  },
  {
    id: 'paragraph-cohesion',
    stage: '高中',
    title: '段落連貫：連接語與代名詞要接得上',
    goal: '精準辨析篇章語意邏輯（轉折、因果、順序），正確區分連接詞與連接副詞之標點結構，並追蹤代名詞之明確指涉。',
    prior: '能讀懂簡單句，分辨原因、結果與對比等基本句型關係。',
    rule: '篇章連貫（Cohesion 與 Coherence）是大考與學術寫作的靈魂。連接詞與轉折語表達句與句之間的邏輯關係。關鍵語法分界：從屬/對等連接詞（如 but, although, because, so）能直接連接兩個子句；而連接副詞（Conjunctive Adverbs，如 however, therefore, moreover, nevertheless, furthermore）本質上是副詞，不能只用一個逗號連接兩句（此為典型 Comma Splice 錯誤），必須使用「句號 + However,」或「分號 ; however,」。此外，指示詞（this, these）、such + 名詞及代名詞（it, they）必須在上下文中有明確、無歧義的指涉對象。',
    pairs: [
      ['The app is convenient. However, it requires an internet connection.', '便利是優點，需連網是限制；however 標示轉折，前後以句號與逗號隔開；it 指 app。'],
      ['The road was flooded. Therefore, the school bus took another route.', '淹水造成改道；therefore 標示因果結果。'],
      ['Students compared two reports. This comparison helped them identify conflicting claims.', 'This comparison 接回比較兩份報告這個動作；them 指代前述的 students。']
    ],
    steps: [
      '步驟 1 釐清兩句邏輯：在心中先用中文釐清前後句關係是轉折（雖然/但是）、因果（因為/所以）、遞進（此外）還是舉例。',
      '步驟 2 檢查句法標點結構：若為獨立兩句，使用句號加大寫連接副詞（如 It rained. However, we...）；絕不可寫成「Sentence A, however, Sentence B」（Comma Splice）。',
      '步驟 3 驗證代名詞指涉鏈：圈出 this / that / they / it，確認上下文中的指涉對象與數的一致；this 也可指前面的整件事，不限於前一句的名詞。單數 they 可用於性別未知或使用 they 的人。'
    ],
    trap: '常見考場陷阱 ➔ 錯：It rained, however we went out.（Comma Splice 標點錯誤）➔ 正確：It rained. However, we went out. 或 It rained, but we went out. 另外：不要用 although 與 but 重複連接同一組主從子句（受中文「雖然……但是……」影響之典型中式英文）。',
    questions: [
      ['The course was demanding. ___, Mei enjoyed the challenge.', ['However', 'Therefore', 'For example'], 0, '課程困難卻享受挑戰，形成對比。therefore 需要因果；for example 需要後句作前句例子，這裡都不合。'],
      ['In “Students revised their essays. This process took two hours,” what does “This process” refer to?', ['Taking a bus', 'Revising the essays', 'The students themselves'], 1, 'process 表過程，接前句修改文章的動作，不是學生本人。原文也沒有提到搭公車。']
    ],
    task: '以三句話介紹一項學習工具：包含一個核心優點、一個潛在限制，以及你採取的因應策略。使用合適的轉折連接副詞並注意標點符號。',
    model: 'Flashcards help me recall words. However, isolated words do not show how to use them. I therefore add an example sentence to each card. 檢查 however 前後有對比，them 指 words，最後一句回應限制。'
  }
];
