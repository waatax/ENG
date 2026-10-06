import json,pathlib,hashlib,re,html,sys
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parent))
from build_word_mp3 import speech_text,VOICES,RATE,ROOT,CACHE
norm=lambda text:re.sub(r'[\W_]+','',html.unescape(text)).casefold()
groups=json.loads((ROOT/'data/word_audio/groups.json').read_text(encoding='utf8'))
checked=0;problems=[]
for g in groups:
 cue=ROOT/'dist/audio/words'/(g['id']+'.json')
 if not cue.exists():continue
 record=json.loads(cue.read_text(encoding='utf8'))
 for lang in ['en','zh']:
  texts=[speech_text(w,lang) for w in g['words']]
  text=('。\n' if lang=='zh' else '.\n').join(texts)+('。' if lang=='zh' else '.')
  key=hashlib.sha256((VOICES[lang]+RATE+text).encode()).hexdigest()
  meta=CACHE/(key+'.json')
  if not meta.exists():problems.append([g['id'],lang,'missing cache']);continue
  events=json.loads(meta.read_text(encoding='utf8'))
  if len(events)!=len(texts) or any(norm(event['text'])!=norm(value) for event,value in zip(events,texts)):
   if not record['individualFallback']:problems.append([g['id'],lang,'sentence alignment mismatch'])
 checked+=1
print(json.dumps({'checked':checked,'problems':problems},ensure_ascii=False))
if problems:sys.exit(1)
