import pathlib,json
# Individually selected corrections. No invented sound hook when a natural one is unavailable.
changes={
'father':('d','','爸爸是 father，媽媽是 mother','孩子指向爸爸說 father，再指向媽媽說 mother，對照兩個家庭稱呼。','father / mother；th 是有聲 /ð/，不是中文的則'),
'family':('i','','一家人圍桌吃飯，就是 family','一家人圍坐餐桌共享晚餐，照片旁寫著 family。','family 單數；families 複數；不拆成不存在的字根'),
'people':('d','','一個 person，一群 people','一張照片只有一個人，另一張是很多人聚在公園；對照 person 和 people。','person 一個人；people 人們，常接複數動詞'),
'school':('i','','背書包上學，走進 school','學生背書包走進校門，校門上寫著 school。','school /skuːl/；起首 /sk/ 不加額外母音'),
'student':('c','','study 是學習，student 是學生','教室裡一位學生正在學習，課本旁寫著 study 和 student。','study / student 是相關詞；student 不是 study 直接加 ent'),
'neighbor':('i','','住在隔壁，互相打招呼的鄰居','隔壁住戶從自家門口揮手，兩家的門並排，明確呈現鄰居。','neighbor 美式；neighbour 英式；gh 不發音'),
'daughter':('d','','女兒 daughter，兒子 son','家族照片中父母介紹女兒與兒子，分別標示 daughter 和 son。','daughter：gh 不發音；不要用多特別代替英文讀音'),
'chair':('i','','拉開椅子，坐在 chair 上','餐桌旁有一把椅子，一個人拉開椅子坐下。','chair 椅子；ch /tʃ/；air 是拼字片段，不是詞義來源'),
'pencil':('d','','鉛筆 pencil，原子筆 pen','桌上放可削尖的鉛筆與裝墨水的原子筆，並排比較。','pencil 鉛筆；pen 筆；pen + cil 只是拼字切片'),
'library':('c','','library 借書，librarian 管書','讀者在圖書館借書，館員 librarian 幫忙找到書架位置。','library 圖書館 / librarian 圖書館員，相關詞形一起記'),
'question':('d','','question 提問題，answer 給答案','老師提出一個問題，學生舉手給出答案，連結問與答。','question 問題；answer 答案；question 的 /tʃ/ 要跟音訊辨認'),
'answer':('i','','舉手回答，說出 answer','老師提問後，學生舉手說出正確答案。','answer 的 w 不發音；an answer 一個答案'),
'sleep':('d','','睡著 sleep，醒來 wake up','一張畫面是人在床上睡覺，另一張是鬧鐘響後睜眼醒來。','sleep / slept / slept；wake up 醒來'),
'smile':('d','','微笑 smile，大笑 laugh','同一個人先嘴角上揚微笑，再張嘴發出笑聲，對照兩種笑。','smile 微笑；laugh 大笑，不一定每次微笑都完全無聲'),
'laugh':('i','','聽到笑話，大家哈哈大笑','朋友講完笑話，全桌的人笑出聲，臉上露出笑容。','laugh 的 gh 念 /f/；laughter 是笑聲'),
'milk':('i','','杯中白色牛奶，就是 milk','早餐桌上有一杯牛奶，旁邊放著牛奶盒。','milk 常作不可數名詞：a glass of milk'),
'orange':('d','','剝橙色柳橙，orange 有兩個意思','一顆柳橙被剝開，旁邊放同樣橙色的色卡，連結水果與顏色。','orange 柳橙／橙色；an orange；美英讀音有差異'),
'elephant':('i','','長鼻大耳的大象，用鼻子捲草吃','大象用長鼻捲起草送進嘴裡，長鼻、大耳與龐大身體清楚可見。','elephant 的 ph 念 /f/；an elephant'),
'weather':('h','','weather 天氣，whether 是否，同音','出門前看天氣 weather，再問 whether 是否要帶傘。','weather ↔ whether 同音；天氣用 weather'),
'spring':('d','','春天 spring，花開；秋天 autumn，葉落','兩格畫面分別是春天新芽和秋天落葉，季節形成清楚對比。','spring 春天，也可指彈簧與泉水；不是永遠不冷'),
'summer':('d','','夏天 summer 炎熱，冬天 winter 寒冷','夏天穿短袖吃冰，冬天穿厚外套，對照兩個季節。','summer 雙 m；winter 冬天；季節氣候依地區而異'),
'evening':('d','','evening 傍晚，night 夜晚','日落後天空仍有亮光是傍晚，下一格夜空有月亮與星星。','evening 傍晚／晚上；night 夜晚，使用範圍可重疊'),
'computer':('c','','compute 計算，computer 是電腦','電腦螢幕正在計算數字，連結 compute 和 computer。','compute 計算 + r → computer；不把看不透當讀音'),
'certificate':('i','','完成課程，拿到結業證書','學員完成課程後拿到印有姓名與課程名稱的證書。','certificate 證書；certify 證明，相關詞'),
'principal':('i','','校長 principal，在校門歡迎學生','校長站在校門口迎接學生，胸前有校長名牌。','principal 校長／主要的；principle 原則，注意字尾'),
'counselor':('c','','counsel 提建議，counselor 是輔導員','學生坐在輔導室，輔導員傾聽並提供建議。','counsel 勸告／建議 + or；英式常拼 counsellor'),
'organize':('i','','分門別類，把東西整理好','書、文具與衣物原本散落，整理後各自放進有標籤的箱子。','organize 整理／組織；organization 組織'),
'expensive':('d','','價格 expensive 昂貴，cheap 便宜','兩個相似背包有高低不同價格，對照昂貴與便宜。','expensive 昂貴的；cheap 便宜的；比較 more expensive'),
'difficult':('d','','difficult 困難，easy 容易','一題需要多步解答，另一題一眼就能答出，對照困難與容易。','difficult 困難；difficulty 困難之處；不要把地府當字根'),
'ordinary':('d','','ordinary 普通，special 特別','一排普通白杯子中有一個金色杯子，對照普通與特別。','ordinary 普通的；special 特別的'),
'porpoise':('d','','porpoise 鼠海豚，短吻小型鯨豚','鼠海豚浮出水面，畫面強調短而圓鈍的吻部，不是一般長吻海豚。','porpoise 鼠海豚；dolphin 海豚，名稱和分類不相同'),
'asparagus':('i','','長長嫩莖，一把蘆筍','一把蘆筍放在砧板上，嫩莖與緊密尖端清楚可見。','asparagus 蘆筍；先跟英文音訊分辨音節，不用愛是爬拉高'),
'cantaloupe':('i','','切開網紋瓜，裡面橙色果肉','一顆網紋瓜被切開，橙色果肉與中間種籽清楚可見。','cantaloupe 常指橙肉甜瓜；不把看他老婆作英文讀音'),
'armadillo':('i','','穿甲的犰狳，身上有硬甲片','犰狳在地上走，背上甲片形成護甲，鼻子細長。','armadillo 犰狳；不是阿嬤住哪一樓'),
'mosquito':('i','','蚊子叮皮膚，留下癢包','蚊子正在手臂上吸血，旁邊畫出一個紅色癢包。','mosquito 蚊子；複數 mosquitoes / mosquitos'),
'cockroach':('i','','蟑螂爬過廚房，長觸角晃動','一隻蟑螂沿著廚房地板爬行，長觸角與扁平身體清楚可見。','cockroach 蟑螂；不要拆 cock 與 roach 猜詞義'),
'scissors':('i','','兩片刀刃交叉，剪刀剪紙','一把剪刀的兩片刀刃交叉，正在剪開紙張。','scissors 通常複數；a pair of scissors 一把剪刀'),
'gloves':('d','','五指手套 gloves，連指手套 mittens','一副手套五指分開，另一副手套只有拇指分開，並排比較。','gloves 指分指手套；mittens 指連指手套'),
'ointment':('i','','把藥膏塗在皮膚患處','擠出一小條藥膏，依指示塗在皮膚患處。','ointment 藥膏；用藥依指示，不把癢特悶當讀音'),
'pharmacy':('i','','到 pharmacy 藥局領藥','藥師在藥局櫃台交付藥袋，藥袋上標明使用方式。','pharmacy 藥局；pharmacist 藥師；ph 念 /f/'),
'patient':('d','','patient 病人，也可以是有耐心的','診間裡病人等待叫號，旁邊對照耐心等候的動作。','patient 名詞病人／形容詞有耐心的；patiently 是副詞'),
'umbrella':('i','','張開雨傘，擋住落下的雨','下雨時張開一把雨傘，雨滴留在傘外，人站在傘下。','umbrella 雨傘；an umbrella；重音在第二音節'),
'calendar':('i','','翻日曆，找到今天日期','桌上日曆圈出今天日期，旁邊列著要做的事。','calendar 日曆；末尾是 ar，不是 er'),
'schedule':('i','','行程表列出時間和事情','行程表上有每個時間與對應活動，一位學生照表安排一天。','schedule 行程表／安排；英美起音不同，跟本卡美式音訊'),
'noon':('i','','時鐘十二點，正午 noon','時鐘指向十二點，窗外陽光明亮，桌上準備午餐。','noon 正午；at noon；afternoon 是正午之後'),
'never':('d','','never 從不，always 總是','日曆上每一天都有打卡是總是，另一張沒有一次打卡是從不。','never 從不；ever 曾經／任何時候；不把能否當詞義'),
'information':('c','','inform 告知，information 是資訊','老師告知活動時間，學生把這些資訊記在公告欄上。','inform + ation；information 不可數，一則資訊 a piece of information'),
'head':('i','','帽子戴在 head 頭上','一個人把帽子戴到頭上，箭頭指向整個頭部。','head 頭；ea 念 /ɛ/；不要把黑的誤當詞義'),
'mouth':('i','','張開 mouth 嘴巴，說一句話','一個人張嘴說話，箭頭指向嘴巴。','mouth 嘴巴；th 是無聲 /θ/，不是中文嘶'),
'brain':('i','','腦袋思考，brain 大腦','人正在解題，頭部示意圖標出大腦，連結思考與大腦。','brain 大腦；ai 念 /eɪ/；不要把不累當讀音')}
root=pathlib.Path('data/mnemonic_v6');changed=[]
for p in sorted(root.glob('cards-*.txt')):
 rows=p.read_text(encoding='utf8').splitlines()
 for i,line in enumerate(rows):
  f=line.split('|')
  if f[0] in changes:
   code,hook,cue,scene,spell=changes[f[0]]
   f[1:6]=[code,hook,cue,scene,spell];rows[i]='|'.join(f);changed.append(f[0])
 p.write_text('\n'.join(rows)+'\n',encoding='utf8')
assert set(changed)==set(changes)
pathlib.Path('data/mnemonic-reselection/iteration-corrections.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2),encoding='utf8')
print('Corrected',len(changed),'individually selected cards')
