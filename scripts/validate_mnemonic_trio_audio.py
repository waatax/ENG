"""Verify all 3,000 audio parts against card text and real decoded PCM."""
import array,concurrent.futures,hashlib,json,pathlib
from build_mnemonic_trio_audio import spoken_meaning
from build_word_mp3 import decode,SAMPLE_RATE
ROOT=pathlib.Path(__file__).resolve().parent.parent;BASE=ROOT/'dist/mnemonics'
manifest=json.loads((BASE/'audio-manifest.json').read_text(encoding='utf8'))
cards=json.loads((BASE/'cards.json').read_text(encoding='utf8'));records=manifest['records']
assert manifest['version'] in (3,4)
roles=['english','cue','meaning']+(['english-repeat'] if manifest['version']==4 else [])
assert manifest['order']==roles
assert len(cards)==len(records)==1000
assert len(list((BASE/'audio-trio').glob('*.mp3')))==1000
assert [(r['id'],r['word']) for r in records]==[(c['id'],c['word']) for c in cards]
def check(pair):
    card,record=pair;path=BASE/record['file']
    assert path.stat().st_size==record['bytes']
    assert hashlib.sha256(path.read_bytes()).hexdigest()==record['sha256']
    expected=[card.get('displayWord',card['word']),card['cue'],spoken_meaning(card['zh'])]
    if manifest['version']==4:expected.append(card.get('displayWord',card['word']))
    assert [p['role'] for p in record['parts']]==roles
    assert [p['text'] for p in record['parts']]==expected
    assert [p['language'] for p in record['parts']]==['en-US','zh-TW','zh-TW']+(['en-US'] if manifest['version']==4 else [])
    pcm=decode(path);last=0
    for part in record['parts']:
        assert last<=part['start']<part['end']<=record['duration']
        samples=array.array('h',pcm[round(part['start']*SAMPLE_RATE)*2:round(part['end']*SAMPLE_RATE)*2])
        assert len(samples)>SAMPLE_RATE*.1,(card['word'],part['role'])
        assert max(abs(x) for x in samples[::16])>200,(card['word'],'Silent '+part['role'])
        last=part['end']
    assert abs(len(pcm)/2/SAMPLE_RATE-record['duration'])<.15
    return record['duration']
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:durations=list(pool.map(check,zip(cards,records)))
report={'format':manifest['format'],'cards':1000,'parts':len(roles)*1000,'english':1000,'chineseCues':1000,'chineseMeanings':1000,'allPartsNonSilent':True,'textAndOrderMatchCards':True,'hashesMatch':True,'totalBytes':manifest['totalBytes'],'shortestSeconds':round(min(durations),2),'longestSeconds':round(max(durations),2),'example':records[0],'notes':'Decoded audio and synthesis boundary alignment verified; not a claim of human listening review of every word.'}
(ROOT/'QA-MNEMONIC-EFFECTIVENESS-AUDIO-2026-10-12.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({k:v for k,v in report.items() if k!='example'},ensure_ascii=False))
