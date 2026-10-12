"""Verify all 500 word-family MP3s against groups.json: spoken text and order, hashes, timing and non-silent parts."""
import array, concurrent.futures, hashlib, json, pathlib
from build_word_mp3 import decode, SAMPLE_RATE
from build_word_family_audio import plan

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT / 'dist/roots'
groups = json.loads((BASE / 'groups.json').read_text(encoding='utf8'))['groups']
manifest = json.loads((BASE / 'audio-manifest.json').read_text(encoding='utf8'))
records = manifest['records']
assert manifest['version'] == 1 and manifest['groups'] == len(groups) == len(records) == 500
assert [r['id'] for r in records] == [g['id'] for g in groups]
assert len(list((BASE / 'audio').glob('*.mp3'))) == 500


def check(pair):
    group, record = pair
    path = BASE / record['file']
    data = path.read_bytes()
    assert len(data) == record['bytes'] and hashlib.sha256(data).hexdigest() == record['sha256'], group['id']
    en, zh = plan(group)
    expected = [t for pair in zip(en, zh) for t in pair]
    assert [p['text'] for p in record['parts']] == expected, group['id']
    assert [p['role'] for p in record['parts']] == ['english', 'chinese'] * len(en), group['id']
    assert [p['member'] for p in record['parts']] == [i // 2 - 1 for i in range(2 * len(en))], group['id']
    pcm = decode(path)
    last = 0
    for part in record['parts']:
        assert last <= part['start'] < part['end'] <= record['duration'] + .01, (group['id'], part['text'])
        samples = array.array('h', pcm[round(part['start'] * SAMPLE_RATE) * 2:round(part['end'] * SAMPLE_RATE) * 2])
        assert len(samples) > SAMPLE_RATE * .12, (group['id'], part['text'])
        assert max(abs(x) for x in samples[::8]) > 300, (group['id'], 'silent', part['text'])
        last = part['end']
    assert abs(len(pcm) / 2 / SAMPLE_RATE - record['duration']) < .15, group['id']
    return record['duration'], len(record['parts'])


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, zip(groups, records)))
report = {'groups': 500, 'mp3Files': 500, 'spokenParts': sum(n for _, n in results),
          'members': sum(len(g['members']) for g in groups), 'textOrderTimingHashesMatch': True, 'allPartsNonSilent': True,
          'totalBytes': manifest['totalBytes'], 'totalMinutes': round(sum(d for d, _ in results) / 60, 1),
          'shortestSeconds': round(min(d for d, _ in results), 2), 'longestSeconds': round(max(d for d, _ in results), 2),
          'notes': 'Decoded PCM, text order and synthesis boundaries verified; not a human listening review of every word.'}
(ROOT / 'QA-WORD-FAMILY-AUDIO-2026-10-12.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf8')
print(json.dumps(report, ensure_ascii=False))
