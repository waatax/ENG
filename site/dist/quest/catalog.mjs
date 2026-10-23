// Original exercises adapted from the existing English Quest lessons, 2026-10-23.
export const VERSION = '2026-10-23.1';
const c = (prompt, answer, others, why) => ({type:'choice',prompt,answer,options:[answer,...others],why});
const b = (prompt, answer, why) => ({type:'build',prompt,answer,words:answer.replace(/[.?!]$/,'').split(' '),why});
const t = (prompt, answer, why, alternatives=[]) => ({type:'input',prompt,answer,alternatives,why});
const l = (audio, prompt, answer, others, why) => ({...c(prompt,answer,others,why),type:'listen',audio});
export const units = [
 {id:'u1',title:'認識新朋友',stage:'起步',icon:'☀',color:'mint',goal:'打招呼、問名字，接住第一段對話。',source:'#unit/g3-s1-u1',skill:'greetings',tip:'Hello / Hi 用來打招呼。What’s your name? 問名字；How are you? 問近況。',example:'Hello! I’m Amy. — Nice to meet you.',transfer:'不用看示範，用虛構姓名介紹自己，再問對方名字。',quests:[
 ['第一聲招呼','先分清楚見面與道別。',[
 c('早上見到老師，你會說？','Good morning.',['Good night.','Goodbye.'],'morning 是早上；早上見面用 Good morning。'),
 c('準備離開教室，向朋友道別。','Goodbye.',['Hello.','Good morning.'],'Goodbye 表示道別。'),
 b('組成一句「早安，Amy」。','Good morning Amy','Good morning 後面可以接對方的名字。'),
 c('朋友說 Hi!，你可以回應？','Hello!',['Good night!','My name?'],'Hi 和 Hello 都是打招呼。'),
 c('晚上準備睡覺，向家人道晚安。','Good night.',['Good morning.','Good afternoon.'],'睡前或晚上道別用 Good night。'),
 t('下午見面：Good ___.（填一個字）','afternoon','Good afternoon 是下午見面的問候。')]],
 ['聽見你的名字','先聽短句，再選符合意思的回應。',[
 l('What is your name?','對方在問什麼？','你的名字',['你的年齡','現在時間'],'What is your name? 是詢問名字。'),
 l('My name is Ben.','說話者叫什麼名字？','Ben',['Amy','Leo'],'My name is 後面是名字 Ben。'),
 l('Good morning, Amy.','這是什麼時候的問候？','早上',['下午','睡前'],'morning 表示早上。'),
 l('How are you?','選擇合適的回應。','I’m fine, thanks.',['My name is Leo.','Good night.'],'How are you? 問近況，可回答 I’m fine, thanks。'),
 l('Nice to meet you.','選擇自然的回應。','Nice to meet you, too.',['My name?','Good night.'],'初次見面可用 Nice to meet you, too 回應。'),
 l('Goodbye, Ben.','這句話是在做什麼？','向 Ben 道別',['問 Ben 名字','向 Ben 道早安'],'Goodbye 是道別，不是問名字。')]],
 ['換你介紹自己','把學過的話拼起來，也試著自己寫。',[
 b('說「我的名字是 Mia」。','My name is Mia','My name is + 名字。'),
 t('介紹自己：I ___ Leo.','am','I 的 be 動詞用 am。'),
 b('向新朋友問名字。','What is your name','What is your name? 是完整的問名句。'),
 c('別人問 What’s your name?，選合適的回答。','I’m Ava.',['I’m fine.','Good afternoon.'],'問名字時回答姓名；I’m fine 回答的是近況。'),
 t('把 I am 縮成一個字。',"I'm",'I am 可縮寫為 I’m。',[ 'I’m' ]),
 b('說「很高興認識你」。','Nice to meet you','初次見面常用 Nice to meet you。')]],
 ['新朋友挑戰','在新的情境獨立試試看；提示仍然隨時可用。',[
 c('第一次參加社團，對方問姓名。','My name is Nora.',['I’m fine, thank you.','See you tomorrow.'],'社團新朋友問姓名，用 My name is 回答。'),
 t('自我介紹：My ___ is Kai.','name','My name is Kai 表示我的名字是 Kai。'),
 b('你叫 Sam，向大家介紹自己。','I am Sam','I am + 名字可自我介紹。'),
 c('午餐後見到新同學，選時間合適的問候。','Good afternoon.',['Good night.','Good morning.'],'午餐後的下午用 Good afternoon。'),
 c('活動結束要離開，選自然的道別。','See you tomorrow.',['What’s your name?','Nice to meet you, too.'],'See you tomorrow 表示明天見。'),
 t('補完初次見面的話：Nice to ___ you.','meet','Nice to meet you 表示很高興認識你。')]]
 ]},
 {id:'u2',title:'介紹我和朋友',stage:'基礎',icon:'✦',color:'blue',goal:'用 am、is、are 說明身分，學會否定與提問。',source:'#knowledge/be-sentences',skill:'be',tip:'I → am；he / she / it 或單數 → is；you / we / they 或複數 → are。問句把 be 放到主詞前；否定在 be 後加 not。',example:'She is ready. → Is she ready? → She is not ready.',transfer:'介紹一位朋友和兩位同學，再把其中一句改成問句。',quests:[
 ['我和你的搭配','先看主詞是誰，再選 be 動詞。',[
 c('I ___ a student.','am',['is','are'],'主詞 I 搭配 am。'),
 c('You ___ my friend.','are',['is','am'],'you 不論單數或複數都搭配 are。'),
 b('組成「我是 Ben」。','I am Ben','I am 後可接姓名。'),
 t('I ___ happy today.','am','I 搭配 am；happy 說明狀態。'),
 c('選出完整正確的句子。','You are kind.',['You is kind.','You kind.'],'形容詞 kind 前需要 be，you 搭配 are。'),
 t('You ___ in my class.','are','you 的現在式 be 動詞是 are。')]],
 ['一個人，還是一群人','把人名與複數放進句子。',[
 c('Mia ___ a teacher.','is',['are','am'],'Mia 是一個人，搭配 is。'),
 c('Leo and Ben ___ friends.','are',['is','am'],'兩個人是複數，搭配 are。'),
 t('She ___ ready.','is','she 搭配 is。'),
 b('組成「他們是學生」。','They are students','they 是複數，搭配 are，students 也用複數。'),
 c('The books ___ on the desk.','are',['am','is'],'books 是複數，不要被單數的 desk 干擾。'),
 t('My brother ___ at home.','is','My brother 是單數第三人稱，搭配 is。')]],
 ['說不是，也能發問','be 的問句與否定句都有自己的位置。',[
 b('把 She is tired 改成問句。','Is she tired','把 is 移到 she 前面。'),
 c('They are not ready. 的意思是？','他們還沒準備好',['他們已準備好','他們是老師'],'not 表否定，接在 are 後面。'),
 t('否定句：He is ___ a teacher.','not','be 後加 not 形成否定。'),
 c('Are you happy? 的肯定簡答是？','Yes, I am.',['Yes, I’m.','Yes, I is.'],'肯定簡答句尾不能只用 I’m，須寫 I am。'),
 b('組成「我們不累」。','We are not tired','we 搭配 are，not 放在 are 後面。'),
 t('___ they your friends?','Are','be 問句把 are 放在 they 前面。')]],
 ['新的團隊挑戰','在活動中心介紹不同的人。',[
 c('The new coach ___ friendly.','is',['are','am'],'coach 是一位教練，用 is。'),
 t('My teammates ___ ready for the game.','are','teammates 是複數，用 are。'),
 b('問「她是隊長嗎？」','Is she the captain','Is she ...? 是 be 問句，captain 指隊長。'),
 c('否定「I am late.」應該說？','I am not late.',['I not am late.','I do not late.'],'am 後面加 not；不另加 do。'),
 t('Is the coach here? Yes, he ___.','is','肯定簡答的句尾保留完整 be 動詞。'),
 c('隊友說 We are excited.，we 指？','說話者和其他人',['只有對方一人','一個物品'],'we 表示包含說話者在內的「我們」，搭配 are。')]]
 ]},
 {id:'u3',title:'我的日常',stage:'基礎進階',icon:'⚑',color:'peach',goal:'說出習慣，用 do / does 詢問朋友的一天。',source:'#knowledge/present-questions',skill:'habits',tip:'I / you / we / they 用動詞原形；he / she / it 的肯定句通常加 s。do / does 後用原形；不要在一般動詞前隨意加 be。',example:'She plays tennis. → Does she play tennis? → She does not play tennis.',transfer:'說一個自己的習慣，問朋友一個問題，再描述朋友的習慣。',quests:[
 ['是誰，還是做什麼','分清身分與動作。',[
 c('哪一句在描述身分？','I am a student.',['I study English.','I play tennis.'],'a student 說明身分，用 am；study、play 是動作。'),
 c('選出正確的動作句。','I read every day.',['I am read every day.','I is read every day.'],'read 本身是一般動詞，不在原形 read 前加 am。'),
 b('說「我們喜歡音樂」。','We like music','like 是一般動詞；we 後面直接接 like。'),
 t('描述身分：She ___ a doctor.','is','a doctor 是身分，用 be。'),
 c('選出「你住在這裡」的正確說法。','You live here.',['You are live here.','You is here live.'],'live 本身是一般動詞。'),
 t('習慣：I ___ to school every day.（walk / am）','walk','walk 是走路，這句描述每天的動作。')]],
 ['每天的小習慣','肯定句中，注意第三人稱。',[
 c('She ___ tennis on Sundays.','plays',['play','playing'],'she 是第三人稱單數，肯定句 play 加 s。'),
 t('He ___ books every evening.（read 的正確形式）','reads','he 是第三人稱單數，read 加 s。'),
 c('They ___ English after school.','study',['studies','is study'],'they 是複數，用原形 study。'),
 b('說「Mia 每天走路」。','Mia walks every day','Mia 是單數第三人稱，walk 用 walks。'),
 c('My sister ___ music.','likes',['like','is like'],'sister 是單數，like 加 s。'),
 t('We ___ soccer on Saturdays.（play 的正確形式）','play','we 搭配原形 play，不加 s。')]],
 ['問問朋友的一天','do / does 出場後，主要動詞還原。',[
 c('___ she play tennis?','Does',['Do','Is'],'she 搭配 Does，後面用原形 play。'),
 t('Do you ___ music?（like 的正確形式）','like','Do 後面的主要動詞用原形。'),
 b('說「他不踢足球」。','He does not play soccer','does not 後面用原形 play。'),
 c('選出正確問句。','Does Ben read books?',['Does Ben reads books?','Is Ben read books?'],'Does 已承擔人稱變化，read 用原形。'),
 t('They ___ not work on Sundays.（do / does）','do','they 搭配 do not。'),
 c('Does Mia walk to school? 的否定簡答是？','No, she doesn’t.',['No, she don’t.','No, she isn’t.'],'用 does 問一般動詞，簡答也用 does／doesn’t。')]],
 ['交換作息挑戰','把學過的規則用在週末活動。',[
 c('On weekends, Noah ___ dinner for his family.','cooks',['cook','is cook'],'Noah 是單數第三人稱，cook 加 s。'),
 t('___ your friends visit the park on Saturdays?','Do','your friends 是複數，用 Do 提問。'),
 b('問「她喜歡茶嗎？」','Does she like tea','Does 後面用原形 like。'),
 c('選出「我們星期日不工作」。','We do not work on Sundays.',['We does not work on Sundays.','We are not work on Sundays.'],'we 搭配 do not，work 是一般動詞。'),
 t('My friend does not ___ coffee.（drink 的正確形式）','drink','does not 後面用原形 drink。'),
 c('哪句同時正確描述身分與習慣？','He is a student. He reads every day.',['He a student. He read every day.','He is a student. He is read every day.'],'身分用 is；習慣使用一般動詞的第三人稱 reads。')]]
 ]}
];
export const quests = units.flatMap(u=>u.quests.map(([title,goal,items],i)=>({id:`${u.id}-q${i+1}`,unitId:u.id,title,goal,challenge:i===3,source:u.source,skill:u.skill,items:items.map((q,j)=>({...q,id:`${u.id}-q${i+1}-${j+1}`,family:`${u.id}-q${i+1}-${j+1}`,skill:u.skill,source:u.source}))})));
const reviewRows = [
 [c('晚上離開朋友家，你可以說？','Good night.',['Good morning.','What’s your name?'],'晚上道別可說 Good night。'),t('問姓名：What is your ___?','name','your name 是你的名字。'),b('用 Emma 自我介紹。','My name is Emma','My name is 後面接姓名。'),c('新鄰居說 Nice to meet you.，如何回應？','Nice to meet you, too.',['I am fine.','It is morning.'],'初次見面的回應加 too，表示我也是。'),t('早上好：Good ___.','morning','早上見面用 Good morning。'),c('How are you today? 問的是？','今天的近況',['你的姓名','朋友的名字'],'How are you? 是問近況。')],
 [t('The children ___ in the library.','are','children 是複數，搭配 are。'),c('My new bicycle ___ blue.','is',['am','are'],'bicycle 是單數，搭配 is。'),b('問「我們遲到了嗎？」','Are we late','把 are 移到 we 前面。'),t('I ___ not hungry.','am','I 搭配 am；not 放在 am 後。'),c('Is Ava your neighbor? 的肯定簡答是？','Yes, she is.',['Yes, she’s.','Yes, she are.'],'肯定簡答句尾不能縮寫 she is。'),c('選出完整的句子。','The windows are open.',['The windows is open.','The windows open are.'],'windows 是複數，用 are；open 描述狀態。')],
 [t('Lily ___ the piano after dinner.（play 的正確形式）','plays','Lily 是單數第三人稱，play 加 s。'),c('___ your parents work nearby?','Do',['Does','Are'],'parents 是複數，一般動詞問句用 Do。'),b('說「她不看電視」。','She does not watch TV','does not 後用原形 watch。'),t('Does the bus ___ here?（stop 的正確形式）','stop','Does 後面用原形 stop。'),c('哪句說法正確？','I like tea, but he likes coffee.',['I likes tea, but he like coffee.','I am like tea, but he likes coffee.'],'I 用 like，he 的肯定句用 likes。'),t('We ___ not eat meat.（do / does）','do','we 搭配 do not。')]
];
export const reviews = Object.fromEntries(units.map((u,i)=>[u.id,reviewRows[i].map((q,j)=>({...q,id:`${u.id}-r${j+1}`,family:`${u.id}-r${j+1}`,skill:u.skill,source:u.source}))]));
export const placement = [
 c('Someone asks your name. Choose a reply.','I’m Alex.',['I’m fine.','Good night.'],'問姓名要回答名字。'),c('It is 3 p.m. Choose a greeting.','Good afternoon.',['Good morning.','Good night.'],'下午用 Good afternoon。'),t('Nice to ___ you, Alex.','meet','初次見面的招呼是 Nice to meet you。'),
 t('The two girls ___ sisters.','are','兩位女孩是複數。'),c('想問對方爸爸的職業，哪句正確？','Is your father a teacher?',['Does your father a teacher?','Your father is teacher?'],'身分用 be，問句把 is 放句首。'),t('Yes, I ___.（回答 Are you ready?）','am','肯定簡答須保留完整 am。'),
 t('Does he ___ here?（live 的正確形式）','live','Does 後用原形。'),c('Choose the correct sentence.','She likes apples.',['She like apples.','She is like apples.'],'she 的肯定句一般動詞加 s。'),t('They ___ not play basketball.（do / does）','do','they 搭配 do not。')
].map((q,i)=>({...q,id:`placement-${i+1}`,family:`placement-${i+1}`,skill:units[Math.floor(i/3)].skill,source:units[Math.floor(i/3)].source}));
export const allItems = [...quests.flatMap(q=>q.items),...Object.values(reviews).flat(),...placement];
