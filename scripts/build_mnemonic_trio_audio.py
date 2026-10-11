"""Export English -> original Chinese sound cue -> Chinese meaning for every card."""
import argparse,asyncio,hashlib,json,pathlib,re,os
from build_word_mp3 import segments,decode,run,silence,SAMPLE_RATE,FFMPEG,FFPROBE,duration,CACHE
ROOT=pathlib.Path(__file__).resolve().parent.parent
BASE=ROOT/'dist/mnemonics';OUT=BASE/'audio-trio'
RECORDS=CACHE/'mnemonic-trio-records'
def spoken_meaning(text):
    text=re.sub(r'\([^)]*\)|（[^）]*）','',text)
    return re.sub(r'[、；;]','，',text).strip(' ，')
def texts(card):
    return [card['word'],card['cue'],spoken_meaning(card['zh'])]
def signature(card):
    en=BASE/'audio'/(card['word']+'.mp3')
    return hashlib.sha256(json.dumps({'text':texts(card),'englishSHA256':hashlib.sha256(en.read_bytes()).hexdigest(),'voice':'zh-TW-HsiaoChenNeural','rate':'-10%','format':1},ensure_ascii=False,sort_keys=True).encode()).hexdigest()
def cached(card):
    p=RECORDS/(card['word']+'.json');audio=OUT/(card['word']+'.mp3')
    if p.exists() and audio.exists():
        old=json.loads(p.read_text(encoding='utf8'))
        if old['signature']==signature(card) and old['sha256']==hashlib.sha256(audio.read_bytes()).hexdigest():return old
def encode(card,zh_cue,zh_meaning):
    english=decode(BASE/'audio'/(card['word']+'.mp3'))
    payload=[];frames=0;parts=[]
    def append(pcm):
        nonlocal frames
        payload.append(pcm);frames+=len(pcm)//2
    append(silence(.15))
    for role,text,pcm,gap in zip(['english','cue','meaning'],texts(card),[english,zh_cue,zh_meaning],[.45,.45,.25]):
        if len(pcm)<SAMPLE_RATE//5:raise ValueError('Empty '+role+' for '+card['word'])
        start=frames/SAMPLE_RATE;append(pcm);end=frames/SAMPLE_RATE
        parts.append({'role':role,'text':text,'language':'en-US' if role=='english' else 'zh-TW','start':round(start,4),'end':round(end,4)})
        append(silence(gap))
    target=OUT/(card['word']+'.mp3');temp=OUT/(card['word']+'.tmp.mp3')
    run([FFMPEG,'-v','error','-y','-f','s16le','-ar',str(SAMPLE_RATE),'-ac','1','-i','pipe:0','-codec:a','libmp3lame','-b:a','48k','-id3v2_version','3','-metadata','title='+card['word']+' | '+card['cue']+' | '+spoken_meaning(card['zh']),'-metadata','comment=English -> Chinese mnemonic -> Chinese meaning',str(temp)],b''.join(payload))
    os.replace(temp,target);actual=duration(target)
    if abs(actual-frames/SAMPLE_RATE)>.3:raise ValueError('Duration mismatch: '+card['word'])
    result={'id':card['id'],'word':card['word'],'file':'audio-trio/'+card['word']+'.mp3','parts':parts,'duration':round(actual,4),'bytes':target.stat().st_size,'signature':signature(card),'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}
    (RECORDS/(card['word']+'.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
    return result
async def main():
    parser=argparse.ArgumentParser();parser.add_argument('--limit',type=int);parser.add_argument('--concurrency',type=int,default=3);args=parser.parse_args()
    if not FFMPEG or not FFPROBE:raise SystemExit('FFmpeg and ffprobe required')
    for p in [CACHE,OUT,RECORDS]:p.mkdir(parents=True,exist_ok=True)
    cards=json.loads((BASE/'cards.json').read_text(encoding='utf8'));cards=cards[:args.limit] if args.limit else cards
    sem=asyncio.Semaphore(args.concurrency);done=0
    async def group(batch):
        nonlocal done
        async with sem:
            ready=[cached(c) for c in batch];missing=[c for c,r in zip(batch,ready) if not r]
            fresh={}
            if missing:
                # Boundary text is checked by segments(); mismatch falls back to per-text synthesis.
                lines=[{'zh':t} for c in missing for t in texts(c)[1:]]
                chinese,fallback=await segments(lines,'zh')
                assert len(chinese)==2*len(missing)
                for i,c in enumerate(missing):
                    fresh[c['word']]=await asyncio.to_thread(encode,c,chinese[2*i],chinese[2*i+1])
            result=[old or fresh[c['word']] for c,old in zip(batch,ready)]
            done+=len(batch);print(json.dumps({'completed':done,'total':len(cards),'new':len(missing),'MB':round(sum(r['bytes'] for r in result)/1e6,2)}),flush=True)
            return result
    batches=[cards[i:i+25] for i in range(0,len(cards),25)]
    nested=await asyncio.gather(*(group(b) for b in batches));records=[r for batch in nested for r in batch]
    assert len(records)==len(cards) and len({r['word'] for r in records})==len(cards)
    manifest={'version':3,'format':'english-cue-meaning','order':['english','cue','meaning'],'voices':{'english':'en-US-AriaNeural','chinese':'zh-TW-HsiaoChenNeural'},'rate':'-10%','cards':len(records),'totalBytes':sum(r['bytes'] for r in records),'records':records}
    filename='audio-manifest.json' if len(cards)==1000 else 'audio-manifest-preview.json'
    (BASE/filename).write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8')
    preview=BASE/'audio-manifest-preview.json'
    if len(cards)==1000 and preview.exists():preview.unlink()
    print(json.dumps({'complete':True,'cards':len(records),'MB':round(manifest['totalBytes']/1e6,2)}),flush=True)
if __name__=='__main__':asyncio.run(main())
