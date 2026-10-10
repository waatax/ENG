"""Extract one English utterance from each already validated bilingual MP3."""
import concurrent.futures,json,pathlib,subprocess,shutil
ROOT=pathlib.Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/mnemonics/audio';OUT.mkdir(exist_ok=True)
cards=json.loads((OUT.parent/'cards.json').read_text(encoding='utf8'))
def extract(card):
    target=OUT/(card['word']+'.mp3');cue=card['audio']
    if not target.exists():
        subprocess.run([shutil.which('ffmpeg'),'-v','error','-y','-ss',str(max(0,cue['start']-.06)),'-i',str(ROOT/'dist/audio/words'/cue['file']),'-t',str(cue['end']-cue['start']+.06),'-map_metadata','-1','-ac','1','-ar','24000','-b:a','48k',str(target)],check=True)
    assert target.stat().st_size>1000
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    for i,_ in enumerate(pool.map(extract,cards),1):
        if i%100==0:print(f'{i}/1000 MP3',flush=True)
