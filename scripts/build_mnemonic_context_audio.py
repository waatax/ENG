"""Disambiguate the card set's homographs, then export only the target word."""
import asyncio,json,pathlib,subprocess,shutil
import edge_tts
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'data/word_audio/cache';CACHE.mkdir(parents=True,exist_ok=True)
CONTEXTS={'lead':'We lead the team.','read':'I read books every day.','subject':'My favorite subject is science.'}
async def main():
    records=[]
    for word,text in CONTEXTS.items():
        source=CACHE/f'editorial-v2-{word}.mp3';events=[];chunks=[]
        async for chunk in edge_tts.Communicate(text,'en-US-AriaNeural',rate='-10%',boundary='WordBoundary').stream():
            if chunk['type']=='audio':chunks.append(chunk['data'])
            elif chunk['type']=='WordBoundary':events.append(chunk)
        matches=[event for event in events if event['text'].strip('.,!?').lower()==word]
        assert len(matches)==1, (word,events)
        source.write_bytes(b''.join(chunks));event=matches[0]
        start=max(0,event['offset']/1e7-.065);duration=event['duration']/1e7+.13
        target=ROOT/f'dist/mnemonics/audio/{word}.mp3'
        subprocess.run([shutil.which('ffmpeg'),'-v','error','-y','-ss',str(start),'-i',str(source),'-t',str(duration),'-map_metadata','-1','-ac','1','-ar','24000','-b:a','48k',str(target)],check=True)
        records.append({'word':word,'context':text,'voice':'en-US-AriaNeural','start':start,'duration':duration,'bytes':target.stat().st_size})
        print(f'Built context-resolved {word}',flush=True)
    (ROOT/'data/mnemonic-context-audio.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf8')
asyncio.run(main())
