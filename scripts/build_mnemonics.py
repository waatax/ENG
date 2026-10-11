"""Build the fixed 1,000 cards from explicitly authored Mandarin associations."""
import json, pathlib, re
ROOT=pathlib.Path(__file__).resolve().parent.parent
pron={}
for line in (ROOT/'data/sources/cmudict.dict').read_text(encoding='utf8').splitlines():
    parts=line.split()
    if parts and '(' not in parts[0]: pron.setdefault(parts[0],parts[1:])
ipa=dict(zip('AA AE AH AO AW AY B CH D DH EH ER EY F G HH IH IY JH K L M N NG OW OY P R S SH T TH UH UW V W Y Z ZH'.split(), 'ɑ æ ʌ ɔ aʊ aɪ b tʃ d ð ɛ ɝ eɪ f ɡ h ɪ i dʒ k l m n ŋ oʊ ɔɪ p r s ʃ t θ ʊ u v w j z ʒ'.split()))
pron.update({'lead':['L','IY1','D'],'read':['R','IY1','D'],'wind':['W','IH1','N','D'],'subject':['S','AH1','B','JH','IH0','K','T']})
labels={'s':'國語近音','h':'同音連結','c':'構詞連結','b':'熟悉借音','d':'對比聯想','i':'情境聯想'}
editorial={}
for line in (ROOT/'data/mnemonic_revision.txt').read_text(encoding='utf8').splitlines():
    if not line.strip():continue
    word,method,cue,scene=line.split('|')
    assert word not in editorial and method in labels and cue.strip() and scene.strip(), word
    editorial[word]={'method':labels[method],'cue':cue,'scene':scene}
links=dict(line.split('|',1) for line in (ROOT/'data/mnemonic_links.txt').read_text(encoding='utf8').splitlines() if line)
assert set(links)<=set(editorial)
cues={}
for p in sorted((ROOT/'dist/audio/words').glob('*.json')):
    group=json.loads(p.read_text(encoding='utf8'))
    for w in group.get('words',[]):cues.setdefault(w['id'],{'file':group['file'],'start':w['repetitions'][0]['en'],'end':w['repetitions'][0]['zh']})
original=json.loads((ROOT/'data/mnemonic-baseline.json').read_text(encoding='utf8'))
icons={c['word']:c['icon'] for c in original}
icon_edits={}
for line in (ROOT/'data/mnemonic_icons.txt').read_text(encoding='utf8').splitlines():
    if not line.strip() or line.startswith('#'):continue
    icon,words=line.split('|')
    for word in words.split():
        assert word in icons and word not in icon_edits, f'Invalid or duplicate icon: {word}'
        icon_edits[word]=icon
icons.update(icon_edits)
definitions=json.loads((ROOT/'data/mnemonic_definitions.json').read_text(encoding='utf8'))
source=json.loads((ROOT/'data/mnemonic-source.json').read_text(encoding='utf8'))
source.sort(key=lambda w:(w['word']!='ambulance',w['tier']!='elem_1000'))
cards=[];seen=set()
for w in source:
    word=w['word'].lower()
    if word in seen or word not in pron or w['id'] not in cues or not re.fullmatch('[a-z]+',word):continue
    seen.add(word);phones=pron[word];sounds=[]
    for p in phones:
        key=re.sub('[012]','',p);v=ipa[key]
        if key=='AH' and p.endswith('0'):v='ə'
        if key=='ER' and p.endswith('0'):v='ɚ'
        sounds.append(v)
    assert word in editorial, f'Missing individually authored card: {word}'
    e=editorial[word]
    if e['method']=='構詞連結':assert word in links, f'Missing visible English word link: {word}'
    cards.append({**w,'category':w['category'].replace('与','與'),'word':word,'zh':definitions.get(word,w['zh']),'sounds':' / '.join(sounds),'arpabet':' '.join(phones),**e,'link':links.get(word,''),'icon':icons[word],'kind':e['method'],'origin':'逐詞校正版','editorialVersion':3,'audio':cues[w['id']]})
    if len(cards)==1000:break
assert len(cards)==1000 and set(editorial)=={c['word'] for c in cards}
assert [(c['id'],c['word']) for c in cards]==[(c['id'],c['word']) for c in original]
notes=json.loads((ROOT/'data/mnemonic_sound_notes.json').read_text(encoding='utf8'))
context_path=ROOT/'data/mnemonic-context-audio.json'
contexts={r['word']:r for r in json.loads(context_path.read_text(encoding='utf8'))} if context_path.exists() else {}
for card in cards:
    card['soundNote']=notes.get(card['word'],'')
    card['dictionaryUrl']='https://dictionary.cambridge.org/dictionary/english-chinese-traditional/'+card['word']
    card['audioSource']='語境擷取' if card['word'] in contexts else '既有英文單字音檔'
    if card['word'] in contexts:card['audioContext']=contexts[card['word']]['context']
OUT=ROOT/'dist/mnemonics';OUT.mkdir(exist_ok=True)
(OUT/'cards.json').write_text(json.dumps(cards,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'cards':len(cards),'editorialVersion':3,'methods':{m:sum(c['method']==m for c in cards) for m in labels.values()}},ensure_ascii=False))
