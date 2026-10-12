"""Build the fixed 1,000 cards (editorial v6: Mandarin keyword hooks first, plus spelling hooks and examples).

Source: data/mnemonic_v6/cards-*.txt, one line per word:
    word|method|hook|cue|scene|spell|example|exampleZh
Card ids, order and progress keys stay identical to data/mnemonic-baseline.json.
"""
import glob, json, os, pathlib, re, time
from build_word_families import load_groups

ROOT = pathlib.Path(__file__).resolve().parent.parent
METHODS = {'k': '諧音聯想', 'l': '外來語借音', 'h': '英文同音', 'c': '構詞拆字', 'd': '對比聯想', 'i': '情境圖像'}
SOUND_METHODS = {'諧音聯想', '外來語借音', '英文同音'}

pron = {}
for line in (ROOT / 'data/sources/cmudict.dict').read_text(encoding='utf8').splitlines():
    parts = line.split()
    if parts and '(' not in parts[0]:
        pron.setdefault(parts[0], parts[1:])
ipa = dict(zip('AA AE AH AO AW AY B CH D DH EH ER EY F G HH IH IY JH K L M N NG OW OY P R S SH T TH UH UW V W Y Z ZH'.split(),
               'ɑ æ ʌ ɔ aʊ aɪ b tʃ d ð ɛ ɝ eɪ f ɡ h ɪ i dʒ k l m n ŋ oʊ ɔɪ p r s ʃ t θ ʊ u v w j z ʒ'.split()))
pron.update({'lead': ['L', 'IY1', 'D'], 'read': ['R', 'IY1', 'D'], 'wind': ['W', 'IH1', 'N', 'D'],
             'subject': ['S', 'AH1', 'B', 'JH', 'IH0', 'K', 'T']})

editorial = {}
for path in sorted(glob.glob(str(ROOT / 'data/mnemonic_v6/cards-*.txt'))):
    for number, line in enumerate(pathlib.Path(path).read_text(encoding='utf8').splitlines(), 1):
        if not line.strip() or line.startswith('#'):
            continue
        fields = line.split('|')
        assert len(fields) == 8, (path, number)
        word, code, hook, cue, scene, spell, example, example_zh = fields
        assert word not in editorial and code in METHODS, (path, number, word)
        assert cue and scene and spell and example and example_zh, word
        if code in 'kl':
            assert hook and cue.startswith(hook) or hook in cue, f'Hook must be spoken in cue: {word}'
        if code == 'h':
            assert '↔' in spell, f'Homophone card needs a visible pair: {word}'
        assert re.search(r'\b' + re.escape(word.split()[0][:3]), example.lower()) or word in ('hotdog',), word
        editorial[word] = {'method': METHODS[code], 'hook': hook, 'cue': cue, 'scene': scene, 'spell': spell,
                           'example': example, 'exampleZh': example_zh}

cues = {}
for p in sorted((ROOT / 'dist/audio/words').glob('*.json')):
    group = json.loads(p.read_text(encoding='utf8'))
    for w in group.get('words', []):
        cues.setdefault(w['id'], {'file': group['file'], 'start': w['repetitions'][0]['en'], 'end': w['repetitions'][0]['zh']})
original = json.loads((ROOT / 'data/mnemonic-baseline.json').read_text(encoding='utf8'))
icons = {c['word']: c['icon'] for c in original}
for line in (ROOT / 'data/mnemonic_icons.txt').read_text(encoding='utf8').splitlines():
    if not line.strip() or line.startswith('#'):
        continue
    icon, words = line.split('|')
    for word in words.split():
        assert word in icons, f'Invalid icon word: {word}'
        icons[word] = icon
definitions = json.loads((ROOT / 'data/mnemonic_definitions.json').read_text(encoding='utf8'))
notes = json.loads((ROOT / 'data/mnemonic_sound_notes.json').read_text(encoding='utf8'))
contexts = {r['word']: r for r in json.loads((ROOT / 'data/mnemonic-context-audio.json').read_text(encoding='utf8'))}

families = load_groups()
family_index = {}
for group in families:
    for member in group['members']:
        family_index.setdefault(member['word'].lower(), []).append(group)
    if group['type'] == 'c':
        family_index.setdefault(group['variants'][0], []).append(group)


def sound_bridge(card):
    word, hook, method = card.get('displayWord', card['word']), card['hook'], card['method']
    p = card['pronunciation']
    stress = '單音節字' if p['syllables'] == 1 else f"{p['syllables']} 個音節、重音在第 {p['primaryStress']} 音節"
    if method == '諧音聯想':
        return {'keyword': hook, 'scope': '國語諧音鉤子（關鍵字法）',
                'note': f'「{hook}」只用來勾起聲音和畫面；{word} 是{stress}。英文請跟著 MP3 念，不要照中文字逐字發音。'}
    if method == '外來語借音':
        return {'keyword': hook, 'scope': '中文已有的音譯或借用名稱',
                'note': f'「{hook}」是你可能已經熟悉的名稱；英文 {word} 是{stress}，發音以 MP3 為準。'}
    if method == '英文同音':
        return {'keyword': card['spell'].split('；')[0], 'scope': '英文同音字搭橋',
                'note': f'兩個英文字念法相同、拼字和意思不同；用畫面把兩個字放在一起，再分清拼字。{word} 是{stress}。'}
    if method == '構詞拆字':
        return {'keyword': card['spell'].split('；')[0], 'scope': '看拼字拆解記意思',
                'note': f'先認出熟悉的英文零件，再組合出意思；拆法是記憶工具，不一定是完整字源。{word} 是{stress}。'}
    if method == '情境圖像':
        return {'keyword': card['cue'].split('，')[0], 'scope': '詞義情境畫面',
                'note': f'用具體情境把英文與意思連結，再遮住中文回想；這不是諧音。{word} 是{stress}。'}
    return {'keyword': card['cue'].split('，')[0], 'scope': '對比畫面',
            'note': f'把容易混淆的兩個概念放在同一個畫面裡比較。{word} 是{stress}。'}


source = json.loads((ROOT / 'data/mnemonic-source.json').read_text(encoding='utf8'))
source.sort(key=lambda w: (w['word'] != 'ambulance', w['tier'] != 'elem_1000'))
cards = []
seen = set()
for w in source:
    word = w['word'].lower()
    if word in seen or word not in pron or w['id'] not in cues or not re.fullmatch('[a-z]+', word):
        continue
    seen.add(word)
    phones = pron[word]
    sounds = []
    for p in phones:
        key = re.sub('[012]', '', p)
        value = ipa[key]
        if key == 'AH' and p.endswith('0'):
            value = 'ə'
        if key == 'ER' and p.endswith('0'):
            value = 'ɚ'
        sounds.append(value)
    assert word in editorial, f'Missing individually authored v6 card: {word}'
    e = editorial[word]
    vowels = [p for p in phones if re.search('[012]$', p)]
    card = {**w, 'category': w['category'].replace('与', '與'), 'word': word, 'zh': definitions.get(word, w['zh']),
            'sounds': ' / '.join(sounds), 'arpabet': ' '.join(phones), **e, 'kind': e['method'],
            'icon': icons[word], 'origin': '諧音聯想強化版', 'editorialVersion': 6, 'audio': cues[w['id']],
            'pronunciation': {'syllables': len(vowels),
                              'primaryStress': next((i + 1 for i, p in enumerate(vowels) if p.endswith('1')), 1),
                              'basis': 'CMU 美式音素；發音仍以本卡英文語音及詞典為準'}}
    if word == 'hotdog':
        card['displayWord'] = 'hot dog'
    card['soundBridge'] = sound_bridge(card)
    linked = []
    for group in family_index.get(word, []):
        if group['id'] not in [g['id'] for g in linked]:
            linked.append(group)
    card['families'] = [{'id': g['id'], 'type': g['typeLabel'], 'key': g['display'], 'meaning': g['meaning']}
                        for g in linked[:3]]
    card['soundNote'] = notes.get(word, '')
    card['dictionaryUrl'] = ('https://dictionary.cambridge.org/dictionary/english-chinese-traditional/'
                             + card.get('displayWord', word).replace(' ', '-'))
    card['audioSource'] = '語境擷取' if word in contexts else '既有英文單字音檔'
    if word in contexts:
        card['audioContext'] = contexts[word]['context']
    cards.append(card)
    if len(cards) == 1000:
        break

assert len(cards) == 1000 and set(editorial) == {c['word'] for c in cards}
assert [(c['id'], c['word']) for c in cards] == [(c['id'], c['word']) for c in original]
assert len({c['cue'] for c in cards}) == 1000, 'Every spoken cue must be unique'

OUT = ROOT / 'dist/mnemonics'
OUT.mkdir(exist_ok=True)
target, temporary = OUT / 'cards.json', OUT / 'cards.next.json'
temporary.write_text(json.dumps(cards, ensure_ascii=False, indent=1), encoding='utf8')
for attempt in range(8):
    try:
        os.replace(temporary, target)
        break
    except OSError:
        if attempt == 7:
            raise
        time.sleep(.25 * (attempt + 1))
print(json.dumps({'cards': len(cards), 'editorialVersion': 6,
                  'methods': {m: sum(c['method'] == m for c in cards) for m in METHODS.values()},
                  'withFamilies': sum(bool(c['families']) for c in cards)}, ensure_ascii=False))
