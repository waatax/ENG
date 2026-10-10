"""Build 1,000 distinct sound-cue cards; never use the legacy pseudo-IPA."""
import json, pathlib, re
ROOT=pathlib.Path(__file__).resolve().parent.parent
pron={}
for line in (ROOT/'data/sources/cmudict.dict').read_text(encoding='utf8').splitlines():
    parts=line.split()
    if parts and '(' not in parts[0]: pron.setdefault(parts[0],parts[1:])
ipa=dict(zip('AA AE AH AO AW AY B CH D DH EH ER EY F G HH IH IY JH K L M N NG OW OY P R S SH T TH UH UW V W Y Z ZH'.split(), 'ɑ æ ʌ ɔ aʊ aɪ b tʃ d ð ɛ ɝ eɪ f ɡ h ɪ i dʒ k l m n ŋ oʊ ɔɪ p r s ʃ t θ ʊ u v w j z ʒ'.split()))
# Keywords are concrete Chinese objects/actions, approximating only part of a sound.
hooks={'AA':('阿姨','👩'),'AE':('愛心','❤️'),'AH':('阿姨','👩'),'AO':('凹洞','🕳️'),'AW':('熬湯','🍲'),'AY':('愛心','❤️'),'EH':('欸聲','📣'),'ER':('耳朵','👂'),'EY':('欸聲','📣'),'IH':('衣服','👕'),'IY':('衣服','👕'),'OW':('藕片','🥣'),'OY':('喔咿聲','📣'),'UH':('烏鴉','🐦‍⬛'),'UW':('烏鴉','🐦‍⬛')}
pair={'B IY':('壁虎','🦎'),'B IH':('筆','🖊️'),'B AE':('芭樂','🍐'),'B AH':('巴士','🚌'),'B OW':('菠蘿','🍍'),'P IY':('披風','🧣'),'P IH':('皮球','⚽'),'P AE':('派','🥧'),'P EY':('配菜','🥗'),'P OW':('坡道','⛰️'),'M IY':('米粒','🍚'),'M IH':('米粒','🍚'),'M AE':('麥子','🌾'),'M AH':('馬','🐎'),'M UW':('木頭','🪵'),'F AE':('發糕','🍰'),'F IY':('飛機','✈️'),'F IH':('飛機','✈️'),'F AO':('佛像','🗿'),'F UW':('斧頭','🪓'),'D IY':('地瓜','🍠'),'D IH':('地瓜','🍠'),'D AE':('大象','🐘'),'D EY':('袋子','🛍️'),'D OW':('豆子','🫘'),'T IY':('梯子','🪜'),'T IH':('梯子','🪜'),'T AE':('塔','🗼'),'T EY':('太陽','☀️'),'T UW':('兔子','🐇'),'N IY':('泥巴','🟤'),'N IH':('泥巴','🟤'),'N AE':('奶瓶','🍼'),'N OW':('鬧鐘','⏰'),'N UW':('弩','🏹'),'L IY':('梨子','🍐'),'L IH':('梨子','🍐'),'L AE':('蠟燭','🕯️'),'L EY':('雷聲','⚡'),'L OW':('樓梯','🪜'),'L UW':('鹿','🦌'),'K IY':('鑰匙 key','🔑'),'K IH':('奇異果','🥝'),'K AE':('咖啡','☕'),'K AH':('咖啡','☕'),'K OW':('口袋','👖'),'K UW':('褲子','👖'),'G IY':('吉他','🎸'),'G IH':('吉他','🎸'),'G AE':('蓋子','🥘'),'G OW':('狗','🐕'),'G UW':('鼓','🥁'),'HH AE':('哈欠','🥱'),'HH AH':('哈欠','🥱'),'HH IY':('吸管','🥤'),'HH IH':('吸管','🥤'),'HH OW':('厚被','🛏️'),'HH UW':('壺','🫖'),'S IY':('絲線','🧵'),'S IH':('絲線','🧵'),'S AE':('沙子','🏖️'),'S AH':('沙子','🏖️'),'S OW':('手','✋'),'S UW':('書','📚'),'SH IY':('西瓜','🍉'),'SH IH':('西瓜','🍉'),'SH AE':('沙子','🏖️'),'SH UW':('樹','🌳'),'CH IY':('氣球','🎈'),'CH IH':('氣球','🎈'),'CH AE':('茶','🍵'),'CH UW':('竹子','🎋'),'JH IY':('雞','🐔'),'JH IH':('雞','🐔'),'JH AE':('家','🏠'),'JH UW':('豬','🐖'),'R IY':('日曆','📅'),'R IH':('日曆','📅'),'R AE':('熱茶','🍵'),'R OW':('肉','🥩'),'R UW':('乳酪','🧀'),'W IY':('微風','🌬️'),'W IH':('微風','🌬️'),'W AA':('娃娃','🧸'),'W AH':('娃娃','🧸'),'W EY':('圍巾','🧣'),'V IY':('V 字手勢','✌️'),'V IH':('V 字手勢','✌️'),'Z IY':('紫菜','🥬'),'Z IH':('紫菜','🥬'),'TH IY':('絲線','🧵'),'TH IH':('絲線','🧵'),'DH AE':('大象','🐘'),'Y EH':('耶聲','🎉'),'Y IY':('衣服','👕')}
manual={
'ambulance':('俺不能死','傷者喊「俺不能死！」，救護車立刻趕來救援。','🚑'),
'family':('發米粒','全家人一起發米粒，把米粒分給每位家人。','👨‍👩‍👧'),
'father':('發的','爸爸把「發的」零用錢放到你手上。','👨'),
'mother':('媽的耳朵','媽媽的耳朵正聽你說話；mother 後半部只取耳朵作畫面。','👩'),
'brother':('不惹','兄弟吵架後約定：「不惹你了！」','👬'),
'sister':('絲絲特','姊妹用絲線做了一件特別的禮物。','👭'),
'apple':('愛剖','我愛剖開蘋果，看裡面的星星形果核。','🍎'),
'banana':('剝那拿','先剝那根香蕉，再拿起來吃。','🍌'),
'orange':('喔！人擠','大家喊「喔！」，人擠人去拿橘子。','🍊'),
'lemon':('累悶','又累又悶時，喝一口酸檸檬汁清醒。','🍋'),
'tomato':('偷妹頭','番茄玩偶偷戴妹妹頭上的帽子。','🍅'),
'potato':('剖忒多','馬鈴薯剖得忒多，桌上堆滿薯塊。','🥔'),
'coffee':('靠啡','早晨靠一杯咖啡，精神飛起來。','☕'),
'tea':('踢','輕輕踢到茶杯，趕快接住不讓茶灑出來。','🍵'),
'milk':('米爾克','米爾克先生把牛奶倒進早餐杯。','🥛'),
'water':('挖的','挖的井冒出清水，水桶裝滿水。','💧'),
'book':('不可','書上寫著「不可折角」，用書籤標記。','📚'),
'school':('思酷','學校裡大家思考酷點子。','🏫'),
'student':('思讀的','學生是思考、讀書的孩子。','🧑‍🎓'),
'teacher':('踢車','老師示範假裝踢車的動作，提醒大家保護車子。','🧑‍🏫'),
'desk':('戴斯克','戴斯克同學把名字牌放在書桌上。','🪑'),
'chair':('切耳','椅子靠背像切開的耳朵形狀。','🪑'),
'cat':('開特','打開特別的小盒子，一隻貓探出頭。','🐈'),
'dog':('道格','道格家的狗叼著球跑來。','🐕'),
'pig':('皮格','小豬皮格穿著粉紅色背心。','🐖'),
'fish':('飛噓','魚飛出水面，你小聲「噓」，怕嚇到牠。','🐟'),
'bird':('伯的','伯伯的鳥在樹枝上唱歌。','🐦'),
'horse':('好嘶','馬叫出一聲好響的嘶鳴。','🐎'),
'duck':('大可','鴨子大可放心在池塘游泳。','🦆'),
'rabbit':('揉鼻特','兔子揉揉鼻子，特別可愛。','🐇'),
'lion':('賴恩','獅子賴恩甩著鬃毛走過草原。','🦁'),
'tiger':('太哥','老虎像威風的大哥，大家叫牠太哥。','🐅'),
'elephant':('愛了飯桶','大象愛上飯桶，用鼻子捲著一大桶飯。','🐘'),
'monkey':('忙 key','猴子忙著找 key 鑰匙，準備打開香蕉箱。','🐒'),
'panda':('盼大','大家盼大熊貓快快長大。','🐼'),
'giraffe':('枝拉扶','長頸鹿把樹枝拉下來，扶住嫩葉慢慢吃。','🦒'),
'zebra':('自不拉','斑馬說：「自己不拉車，我在草原跑！」','🦓'),
'sun':('散','太陽把光線散向四面八方。','☀️'),
'moon':('木恩','月亮給木頭披上恩賜般的銀光。','🌙'),
'star':('是他','指著天上最亮的星星說：「是他！」','⭐'),
'rain':('淚恩','雨像天空掉下的眼淚，滋潤了花園。','🌧️'),
'snow':('思諾','思諾同學在雪地堆雪人。','❄️'),
'wind':('溫的','溫的風拂過臉頰。','🌬️'),
'cloud':('可勞的','可勞的雲搬運水滴，慢慢飄過天空。','☁️'),
'happy':('哈皮','開心地「哈」一聲，把皮球拋向天空。','😊'),
'sad':('塞的','難過的心像塞住的水管，眼淚流不出來。','😢'),
'angry':('俺格力','俺使出格外大的力氣，因為很生氣。','😠'),
'hungry':('餓嗯格力','肚子餓得嗯嗯叫，吃完才有力氣。','🍽️'),
'sorry':('掃瑞','打翻瑞瑞的水，掃乾淨後說對不起。','🙇'),
'thank':('三克','送三克糖表示感謝。','🙏'),
'hello':('哈囉','見面喊哈囉，揮手問好。','👋'),
'goodbye':('顧的拜','照顧好自己，揮手拜拜說再見。','👋'),
'hospital':('好四匹頭','四匹馬的頭都好了，因為送到醫院治療。','🏥'),
'doctor':('刀克特','醫生用特別的工具克服病痛；刀克特只是聲音線索。','🧑‍⚕️'),
'nurse':('呢耳絲','護理師問「哪裡不舒服呢？」並整理耳邊髮絲。','🧑‍⚕️'),
'bus':('巴士','巴士就是公車，想像站牌前的大巴士。','🚌'),
'taxi':('踏喜','踏進計程車，司機喜笑顏開地打招呼。','🚕'),
'train':('吹人','火車鳴笛提醒人們離開軌道。','🚆'),
'bike':('拜可','騎自行車向朋友說拜拜，可以出發了。','🚲'),
'car':('卡','汽車卡在停車位，慢慢倒車出去。','🚗'),
'boat':('波特','波特划著小船，在波浪間前進。','⛵'),
'ship':('西普','西普船長駕著大船出港。','🚢'),
'plane':('頗累嗯','飛機飛了很遠，機長說「頗累，嗯」。','✈️'),
'computer':('看屁優特','電腦螢幕跳出搞笑圖片，你看了笑到噴氣。','💻'),
'phone':('風','電話把聲音像風一樣送到遠方。','📱'),
'music':('謬日可','每天播放音樂，謬日可先生跟著跳舞。','🎵'),
'dance':('蛋絲','舞者像蛋上細絲般輕巧地跳舞。','💃'),
'sleep':('思立普','思立普躺上床，立刻睡著。','😴'),
'read':('里德','里德正在閱讀一本書。','📖'),
'write':('賴特','賴特拿起筆寫自己的名字。','✍️'),
'listen':('立森','站立在森林中，仔細聽鳥叫。','👂'),
'look':('路克','路克睜大眼睛看遠方。','👀'),
'smile':('思麥爾','思麥爾收到禮物，露出微笑。','🙂'),
'money':('媽呢','問「媽呢？」媽媽正把錢放進錢包。','💰'),
'camera':('開麥拉','喊開麥拉，拿起照相機拍照。','📷'),
'window':('溫豆','把溫熱的豆子放在窗戶邊吹涼。','🪟'),
'door':('多爾','多爾先生在門口敲門。','🚪'),
'key':('奇','這把鑰匙形狀奇特，正好開啟寶箱。','🔑'),
'table':('忒薄','桌面忒薄，放東西時要輕輕的。','🪑'),
'bed':('貝的','貝貝的床鋪柔軟舒服。','🛏️'),
'garden':('嘎登','花園裡的鴨子嘎嘎叫，登上小石頭。','🌷'),
'flower':('福拉我','福氣拉著我走向盛開的花朵。','🌸'),
'tree':('吹','風吹著樹葉，沙沙作響。','🌳'),
'grass':('格拉絲','草像綠色的絲線鋪滿地面。','🌱'),
'bread':('不瑞的','瑞瑞的麵包沒分給我，我說「不！瑞的！」','🍞'),
'rice':('賴絲','米飯黏在絲線上，賴著不掉下來。','🍚'),
'egg':('欸格','欸！格子盒裡裝著雞蛋。','🥚'),
'cake':('開可','打開盒子，可以吃蛋糕了。','🍰'),
'cookie':('哭 key','找不到 key 鑰匙的小孩哭了，用餅乾安慰他。','🍪'),
'soup':('速鋪','迅速鋪好餐墊，端上一碗湯。','🍲'),
'salad':('撒了的','撒了醬汁的生菜就是這盤沙拉。','🥗'),
'cheese':('起司','想像起司拉出長長的絲。','🧀'),
'chocolate':('巧克力','巧克力本身就是借音詞，想像拆開包裝的一瞬間。','🍫'),
}
cues={}
for p in sorted((ROOT/'dist/audio/words').glob('*.json')):
    group=json.loads(p.read_text(encoding='utf8'))
    for w in group.get('words',[]): cues.setdefault(w['id'],{'file':group['file'],'start':w['repetitions'][0]['en'],'end':w['repetitions'][0]['zh']})
cards=[];seen=set()
source=json.loads((ROOT/'data/mnemonic-source.json').read_text(encoding='utf8'))
source.sort(key=lambda w: (w['word']!='ambulance', w['tier']!='elem_1000'))
for w in source:
    word=w['word'].lower()
    if word in seen or word not in pron or w['id'] not in cues or not re.fullmatch('[a-z]+',word): continue
    seen.add(word);phones=pron[word];plain=[re.sub('[012]','',p) for p in phones]
    sounds=[]
    for p in phones:
        key=re.sub('[012]','',p);v=ipa[key]
        if key=='AH' and p.endswith('0'):v='ə'
        if key=='ER' and p.endswith('0'):v='ɚ'
        sounds.append(v)
    # This is explicitly an IPA sound sequence, not a syllabified dictionary transcription.
    phonetic=' / '.join(sounds)
    if word in manual:
        cue,scene,icon=manual[word];kind='編寫聯想'
    else:
        chosen=[]
        for i,p in enumerate(plain):
            if p in hooks:
                key=(plain[i-1]+' '+p) if i else p
                chosen.append(pair.get(key,hooks[p]))
        chosen=chosen[:3]
        cue='・'.join(x[0] for x in chosen)
        icon=w['icon'] or '💡';objects='、'.join(x[0] for x in chosen)
        scene=f'想像「{objects}」組成一個會動的招牌，招牌上寫著「{w["zh"]}」。把招牌放進「{w["category"]}」的場景，再聽 {word} 回想這個意思。'
        kind='自動聲音聯想草稿'
    cards.append({**w,'word':word,'sounds':phonetic,'arpabet':' '.join(phones),'cue':cue,'scene':scene,'icon':icon,'kind':kind,'audio':cues[w['id']]})
    if len(cards)==1000:break
assert len(cards)==1000 and len(seen)==1000
OUT=ROOT/'dist/mnemonics';OUT.mkdir(exist_ok=True)
(OUT/'cards.json').write_text(json.dumps(cards,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'cards':len(cards),'written':sum(c['kind']=='編寫聯想' for c in cards),'drafts':sum(c['kind']!='編寫聯想' for c in cards),'mp3':len(cards)},ensure_ascii=False))
