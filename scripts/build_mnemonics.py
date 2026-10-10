"""Build 1,000 distinct sound-cue cards; never use the legacy pseudo-IPA."""
import json, pathlib, re
ROOT=pathlib.Path(__file__).resolve().parent.parent
pron={}
for line in (ROOT/'data/sources/cmudict.dict').read_text(encoding='utf8').splitlines():
    parts=line.split()
    if parts and '(' not in parts[0]: pron.setdefault(parts[0],parts[1:])
ipa=dict(zip('AA AE AH AO AW AY B CH D DH EH ER EY F G HH IH IY JH K L M N NG OW OY P R S SH T TH UH UW V W Y Z ZH'.split(), 'ɑ æ ʌ ɔ aʊ aɪ b tʃ d ð ɛ ɝ eɪ f ɡ h ɪ i dʒ k l m n ŋ oʊ ɔɪ p r s ʃ t θ ʊ u v w j z ʒ'.split()))
# Select the CMU variant matching this card's meaning, rather than its first homograph.
pron.update({'lead':['L','IY1','D'],'read':['R','IY1','D'],'wind':['W','IH1','N','D'],'subject':['S','AH1','B','JH','IH0','K','T']})
editorial={}
for line in (ROOT/'data/mnemonic_editorial.tsv').read_text(encoding='utf8').splitlines():
    if not line.strip():continue
    word,cue,scene=line.split('\t')
    assert word not in editorial, f'Duplicate editorial word: {word}'
    assert cue.strip() and scene.strip(), f'Empty editorial: {word}'
    editorial[word]=(cue,scene)
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
'hospital':('好絲披頭','醫院玩偶披著好看的絲巾，在病房等醫師檢查。','🏥'),
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
'computer':('康皮優特','康康用電腦設計優質特製皮衣，螢幕轉著衣服模型。','💻'),
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
        cue,scene,icon=manual[word];origin='原有聯想'
    else:
        assert word in editorial, f'Missing completed mnemonic: {word}'
        cue,scene=editorial[word];icon=w['icon'] or '💡';origin='本次補齊'
    zh={'true':'真實的、正確的','free':'自由的、空閒的；免費的','heavy':'沉重的','dry':'乾燥的','fresh':'新鮮的','deep':'深的、深奧的','stale':'不新鮮的、陳舊的','lead':'引導、帶領（lead-led-led）','shorts':'短褲','shoes':'鞋子'}.get(word,w['zh'])
    cards.append({**w,'zh':zh,'word':word,'sounds':phonetic,'arpabet':' '.join(phones),'cue':cue,'scene':scene,'icon':icon,'kind':'正式聯想','origin':origin,'editorialVersion':2,'audio':cues[w['id']]})
    if len(cards)==1000:break
assert len(cards)==1000 and len(seen)==1000
assert len(editorial)==933 and set(editorial)=={c['word'] for c in cards if c['origin']=='本次補齊'}
notes=json.loads((ROOT/'data/mnemonic_sound_notes.json').read_text(encoding='utf8'))
context_path=ROOT/'data/mnemonic-context-audio.json'
contexts={r['word']:r for r in json.loads(context_path.read_text(encoding='utf8'))} if context_path.exists() else {}
for card in cards:
    card['soundNote']=notes.get(card['word'],'')
    if card['word'] in contexts:
        card['audioSource']='語境擷取'
        card['audioContext']=contexts[card['word']]['context']
    else:card['audioSource']='既有英文單字音檔'
OUT=ROOT/'dist/mnemonics';OUT.mkdir(exist_ok=True)
(OUT/'cards.json').write_text(json.dumps(cards,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'cards':len(cards),'completed':len(cards),'drafts':0,'newlyCompleted':len(editorial),'mp3':len(cards)},ensure_ascii=False))
