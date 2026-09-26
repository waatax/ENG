export const foundations = [
  {
    id:'be-sentences',stage:'國小',title:'第一個完整句子：I am、you are、she is',
    goal:'用 be 動詞介紹人物、描述狀態和位置，並改成否定與問句。',prior:'認得 I、you、he、she、it、we、they。',
    rule:'英文完整敘述句通常需要主詞與動詞。描述身分、狀態、位置時，可以用「主詞 + be + 補充訊息」。I 搭 am；he / she / it 或單數人事物搭 is；you / we / they 或複數搭 are。be 不能在每個英文動詞前任意加上。',
    pairs:[['I am a student. She is happy.','am / is 是動詞；a student 說身分，happy 說狀態。'],['The books are on the desk.','books 是複數，用 are；on the desk 說位置。'],['He is not tired. Is he tired? Yes, he is.','否定在 be 後加 not；問句將 be 移到主詞前。肯定簡答句尾用 he is，不用 he’s。']],
    steps:['先圈主詞，判斷是 I、單數，還是 you / 複數。','選 am / is / are，再加身分、狀態或位置。身分若是單數可數名詞，通常需要 a / an 等限定詞。','檢查要敘述、否定還是提問。I play tennis 的 play 已是動詞，不寫 I am play tennis。'],
    trap:'錯：She happy. → She is happy. 錯：They is students. → They are students. 注意進行式 I am playing tennis 的 playing 形式另有規則。',
    questions:[['My brother ___ in the classroom.',['am','is','are'],1,'My brother 是單數第三人稱，用 is。am 只與 I 搭配；are 不配此單數主詞。'],['Which question is correct?',['Are they ready?','Do they are ready?','They ready?'],0,'原句 They are ready. 將 are 移到 they 前即可提問，不加 do，也不能省去 be。']],
    task:'介紹自己，再寫一句描述兩位朋友的句子。將其中一句改成疑問句。',model:'I am a student. My friends are kind. Are my friends kind? 檢查 I + am、複數 friends + are；疑問句將 are 放到主詞前。'
  },
  {
    id:'present-questions',stage:'國小',title:'日常動作：第三人稱與 do / does 問句',
    goal:'描述每天做的事，並能正確詢問或否定。',prior:'先能分辨主詞，以及 be 和一般動詞。',
    rule:'現在簡單式可以說習慣或一般事實。肯定句主詞是 he / she / it 或單數第三人稱時，一般動詞通常加 s / es。問句用 Do / Does + 主詞 + 原形動詞；否定用 do not / does not + 原形動詞。',
    pairs:[['Mina walks to school every day.','Mina 是單數第三人稱，walk 加 s。'],['Does Mina walk to school?','does 已帶第三人稱變化，後面還原成 walk。'],['She does not watch TV on Mondays.','否定用 does not + watch，不能寫 does not watches。']],
    steps:['找主詞：I / you / we / they 搭原形；he / she / it 的肯定句要變化。','注意拼字：watch → watches；study → studies（子音 + y）；play → plays（母音 + y）；have → has。','改問句或否定時，把變化交給 does，後面的動詞回到原形。be 問句 Is she happy? 則不用 does。'],
    trap:'錯：Does Tom likes music? → Does Tom like music? 錯：He don’t study. → He doesn’t study. 不要把一般動詞與 be 動詞問句規則混用。',
    questions:[['Leo ___ English every evening.',['study','studies','studying'],1,'Leo 是單數第三人稱；study 的子音 + y 改 ies。study 未變化；studying 單獨不能作此句的限定動詞。'],['___ your sister ___ coffee?',['Do / drinks','Does / drink','Does / drinks'],1,'your sister 是單數第三人稱，用 Does；助動詞後用原形 drink，不能再加 s。']],
    task:'寫一位家人的日常習慣，接著改成否定句與疑問句。',model:'My father cooks dinner. My father does not cook dinner. Does my father cook dinner? 三句分別檢查 cooks、does not cook、Does ... cook。'
  },
  {
    id:'paragraph-cohesion',stage:'高中',title:'段落連貫：連接語與代名詞要接得上',
    goal:'依句與句的邏輯選連接語，並找到 this / they 指向的內容。',prior:'能讀懂簡單句，分辨原因、結果與對比。',
    rule:'連接語表達句子之間的關係，不能只看單字中文意思。先判斷後句是在補充、對比、舉例還是說結果，再選詞。代名詞和 this + 名詞常連結前文，必須找到明確指涉。',
    pairs:[['The app is convenient. However, it requires an internet connection.','便利是優點，需連網是限制；however 標示轉折，it 指 app。'],['The road was flooded. Therefore, the school bus took another route.','淹水造成改道；therefore 標示結果。'],['Students compared two reports. This comparison helped them identify conflicting claims.','This comparison 接回比較兩份報告這個動作；them 指 students。']],
    steps:['先不用連接詞，以中文說出兩句關係：「雖然……但是……」或「因為……所以……」。','找後句的 it / they / this，回看前文是否有合理且一致的指涉。','檢查標點。However 是連接副詞，不能只用逗號把兩個獨立句連起來；可用句號或分號。'],
    trap:'錯：It rained, however we went out. → It rained. However, we went out. 或 It rained, but we went out. however 與 but 的連接方式不同。',
    questions:[['The course was demanding. ___, Mei enjoyed the challenge.',['However','Therefore','For example'],0,'課程困難卻享受挑戰，形成對比。therefore 需要因果；for example 需要後句作前句例子，這裡都不合。'],['In “Students revised their essays. This process took two hours,” what does “This process” refer to?',['Taking a bus','Revising the essays','The students themselves'],1,'process 表過程，接前句修改文章的動作，不是學生本人。原文也沒有提到搭公車。']],
    task:'寫三句介紹一項學習工具：一個優點、一個限制，再說如何因應。使用一個轉折連接語。',model:'Flashcards help me recall words. However, isolated words do not show how to use them. I therefore add an example sentence to each card. 檢查 however 前後有對比，them 指 words，最後一句回應限制。'
  }
];
