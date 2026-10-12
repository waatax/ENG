"""Build the 500 systematic word-family groups (compound families, prefixes, suffixes, Latin/Greek roots).

Source lines live in data/word_families/families-*.txt:
    type|key(variants)|meaning|tip|word=zh=breakdown;word=zh=breakdown;...
Output: dist/roots/groups.json (stable ids wf-001 … wf-500 in source order).
"""
import glob, json, os, pathlib, re, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
TYPES = {'c': '複合詞字族', 'p': '字首', 's': '字尾', 'r': '字根'}
# Real words that the CMU dictionary lacks; each was checked by hand.
NOT_IN_CMU = set('''antonym parasol solarium omnivore zookeeper postgraduate semicircle semicolon ultralight
millipede equilateral equidistant decagon october lioness armful'''.split())


def cmu_words():
    words = set()
    for line in (ROOT / 'data/sources/cmudict.dict').read_text(encoding='utf8').splitlines():
        parts = line.split()
        if parts:
            words.add(re.sub(r'\(\d+\)', '', parts[0]))
    return words


def english_parts(breakdown):
    """English tokens of a breakdown such as 'black 黑 + board 板' -> ['black', 'board']."""
    return [m.group(0).lower() for m in re.finditer(r'[A-Za-z]+', breakdown.split('，')[0])]


def load_groups():
    cmu = cmu_words()
    groups = []
    for path in sorted(glob.glob(str(ROOT / 'data/word_families/families-*.txt'))):
        for number, line in enumerate(pathlib.Path(path).read_text(encoding='utf8').splitlines(), 1):
            if not line.strip() or line.startswith('#'):
                continue
            fields = line.split('|')
            assert len(fields) == 5, (path, number)
            kind, key, meaning, tip, members = fields
            assert kind in TYPES and key and meaning and tip, (path, number)
            variants = [v.strip('-') for v in key.split('/')]
            rows = []
            for member in members.split(';'):
                word, zh, parts = member.split('=')
                assert word and zh and parts, (key, member)
                low = word.lower()
                if kind == 'p':
                    assert any(low.startswith(v) for v in variants), (key, word)
                elif kind == 's':
                    assert any(low.endswith(v) for v in variants), (key, word)
                else:
                    assert any(v in low for v in variants), (key, word)
                if low not in cmu and low not in NOT_IN_CMU:
                    # Accept genuine compounds whose visible English parts spell the word.
                    tokens = english_parts(parts)
                    assert ''.join(tokens) == low and all(t in cmu for t in tokens), (key, word, tokens)
                rows.append({'word': word, 'zh': zh, 'parts': parts})
            assert 3 <= len(rows) <= 7 and len({r['word'].lower() for r in rows}) == len(rows), key
            display = ' / '.join((v + '-') if kind == 'p' else ('-' + v) if kind == 's' else v for v in variants)
            if kind == 'r' and key.startswith(('spec/', 'spir/', 'prob/')):
                display = ' / '.join(variants[:-1])  # last variant only exists to validate spelling changes
            groups.append({'type': kind, 'typeLabel': TYPES[kind], 'key': key, 'display': display,
                           'variants': variants, 'meaning': meaning, 'tip': tip, 'members': rows})
    assert len(groups) == 500, len(groups)
    seen = set()
    for i, group in enumerate(groups, 1):
        group['id'] = f'wf-{i:03d}'
        signature = (group['type'], group['key'], group['meaning'])
        assert signature not in seen, signature
        seen.add(signature)
    return groups


def spoken_header(group):
    """English part spoken before the group: the base word, or the affix/root spelled out letter by letter."""
    first = group['variants'][0]
    return first if group['type'] == 'c' else ' '.join(first.upper())


def spoken_meaning(group):
    label = {'c': '字族', 'p': '字首', 's': '字尾', 'r': '字根'}[group['type']]
    meaning = re.sub(r'（[^）]*）|\([^)]*\)', '', group['meaning'])
    return label + '，' + re.sub(r'[、；;]', '，', meaning).replace('⋯', '某某').strip('，')


def spoken_member(text):
    text = re.sub(r'（[^）]*）|\([^)]*\)', '', text)
    return re.sub(r'[、；;／/]', '，', text).replace('⋯', '某某').strip(' ，')


def write_json(target, payload):
    temporary = target.with_suffix('.next.json')
    temporary.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding='utf8')
    for attempt in range(8):
        try:
            os.replace(temporary, target)
            return
        except OSError:
            if attempt == 7:
                raise
            time.sleep(.25 * (attempt + 1))


def main():
    groups = load_groups()
    out = ROOT / 'dist/roots'
    out.mkdir(parents=True, exist_ok=True)
    cards_path = ROOT / 'dist/mnemonics/cards.json'
    cards = json.loads(cards_path.read_text(encoding='utf8')) if cards_path.exists() else []
    card_by_word = {c['word']: c for c in cards}
    for group in groups:
        group['cards'] = [{'id': card_by_word[m['word'].lower()]['id'], 'word': m['word'].lower()}
                          for m in group['members'] if m['word'].lower() in card_by_word]
    payload = {'version': 1, 'groups': groups,
               'counts': {label: sum(g['type'] == kind for g in groups) for kind, label in TYPES.items()},
               'members': sum(len(g['members']) for g in groups),
               'uniqueWords': len({m['word'].lower() for g in groups for m in g['members']})}
    write_json(out / 'groups.json', payload)
    print(json.dumps({k: v for k, v in payload.items() if k != 'groups'}, ensure_ascii=False))


if __name__ == '__main__':
    main()
