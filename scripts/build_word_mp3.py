"""Export static MP3s: for each word (English + Chinese) repeated three times.
Requires edge-tts 7.2+, FFmpeg/ffprobe. Cache permits interrupted runs to resume.
"""
import argparse,asyncio,hashlib,json,os,pathlib,re,shutil,subprocess,time,html
import edge_tts
ROOT=pathlib.Path(__file__).resolve().parent.parent
CACHE=ROOT/'data/word_audio/cache'
OUT=ROOT/'dist/audio/words'
SAMPLE_RATE=24000
VOICES={'en':'en-US-AriaNeural','zh':'zh-TW-HsiaoChenNeural'}
RATE='-10%'
FFMPEG=shutil.which('ffmpeg');FFPROBE=shutil.which('ffprobe')
def speech_text(word,language):
 text=word[language]
 if language=='en':
  text={'Mr.':'Mister','Mrs.':'Missus','Ms.':'Miz','a.m.':'A M','p.m.':'P M'}.get(text,text)
 return re.sub(r'[.!?;；。！？]+','，' if language=='zh' else ' ',text).strip(' ，')
def run(args,data=None):
 return subprocess.run(args,input=data,stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True).stdout
def decode(path):
 return run([FFMPEG,'-v','error','-i',str(path),'-f','s16le','-ac','1','-ar',str(SAMPLE_RATE),'pipe:1'])
async def synth(text,language):
 key=hashlib.sha256((VOICES[language]+RATE+text).encode()).hexdigest()
 audio=CACHE/(key+'.mp3');meta=CACHE/(key+'.json')
 if audio.exists() and meta.exists():return audio,json.loads(meta.read_text(encoding='utf8'))
 for attempt in range(5):
  try:
   chunks=[];events=[]
   async for c in edge_tts.Communicate(text,VOICES[language],rate=RATE,boundary='SentenceBoundary',connect_timeout=20,receive_timeout=180).stream():
    if c['type']=='audio':chunks.append(c['data'])
    elif c['type']=='SentenceBoundary':events.append(c)
   if not chunks:raise ValueError('No audio returned')
   audio.write_bytes(b''.join(chunks));meta.write_text(json.dumps(events,ensure_ascii=False),encoding='utf8')
   return audio,events
  except Exception:
   if attempt==4:raise
   await asyncio.sleep(2**attempt)
async def segments(words,language):
 texts=[speech_text(w,language) for w in words]
 audio,events=await synth(('。\n' if language=='zh' else '.\n').join(texts)+('。' if language=='zh' else '.'),language)
 # Never silently pair a translation with a different word if the service splits a sentence.
 normalize=lambda text: re.sub(r'[\W_]+','',html.unescape(text)).casefold()
 if len(events)!=len(words) or any(normalize(event['text'])!=normalize(text) for event,text in zip(events,texts)):
  result=[]
  for text in texts:
   single,_=await synth(text,language);result.append(decode(single))
  return result,True
 pcm=decode(audio);result=[]
 for i,event in enumerate(events):
  begin=max(0,int((event['offset']/1e7-.075)*SAMPLE_RATE))*2
  end=max(begin,int((events[i+1]['offset']/1e7-.075)*SAMPLE_RATE)*2) if i+1<len(events) else len(pcm)
  clip=pcm[begin:end]
  if len(clip)<SAMPLE_RATE//5:raise ValueError('Suspiciously short voice segment')
  result.append(clip)
 return result,False
def silence(seconds):return b'\0\0'*round(SAMPLE_RATE*seconds)
def duration(path):
 return float(run([FFPROBE,'-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(path)]))
async def build(group,sem):
 async with sem:
  output=OUT/(group['id']+'.mp3');cuefile=OUT/(group['id']+'.json')
  signature=hashlib.sha256(json.dumps({'words':group['words'],'voices':VOICES,'rate':RATE,'format':2},ensure_ascii=False).encode()).hexdigest()
  if output.exists() and cuefile.exists():
   old=json.loads(cuefile.read_text(encoding='utf8'))
   if old.get('signature')==signature:return old
  start=time.monotonic()
  en,fallback_en=await segments(group['words'],'en')
  zh,fallback_zh=await segments(group['words'],'zh')
  pieces=[];cues=[];frames=0
  def append(data):
   nonlocal frames
   pieces.append(data);frames+=len(data)//2
  append(silence(.4))
  for word,en_pcm,zh_pcm in zip(group['words'],en,zh):
   cue={**word,'start':round(frames/SAMPLE_RATE,3),'repetitions':[]}
   for repetition in range(3):
    mark={'round':repetition+1,'en':round(frames/SAMPLE_RATE,3)}
    append(en_pcm);append(silence(.25));mark['zh']=round(frames/SAMPLE_RATE,3)
    append(zh_pcm);append(silence(.5));cue['repetitions'].append(mark)
   append(silence(.5));cue['end']=round(frames/SAMPLE_RATE,3);cues.append(cue)
  temporary=output.with_suffix('.tmp.mp3')
  run([FFMPEG,'-v','error','-y','-f','s16le','-ar',str(SAMPLE_RATE),'-ac','1','-i','pipe:0','-codec:a','libmp3lame','-b:a','40k','-id3v2_version','3','-metadata','title='+group['label']+'單字 '+str(group['start'])+'–'+str(group['end']),'-metadata','comment=English then Chinese, three repetitions per word',str(temporary)],b''.join(pieces))
  os.replace(temporary,output)
  actual=duration(output);expected=frames/SAMPLE_RATE
  if abs(actual-expected)>.3:raise ValueError('MP3 duration mismatch')
  record={k:v for k,v in group.items() if k!='words'}
  record.update({'file':group['id']+'.mp3','signature':signature,'duration':round(actual,3),'bytes':output.stat().st_size,'wordCount':len(cues),'words':cues,'individualFallback':fallback_en or fallback_zh})
  cuefile.write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
  print(json.dumps({'id':group['id'],'words':len(cues),'seconds':round(actual,1),'MB':round(output.stat().st_size/1e6,2),'elapsed':round(time.monotonic()-start,1)},ensure_ascii=False),flush=True)
  return record
async def main():
 parser=argparse.ArgumentParser();parser.add_argument('--limit',type=int);parser.add_argument('--concurrency',type=int,default=2);args=parser.parse_args()
 if not FFMPEG or not FFPROBE:raise SystemExit('FFmpeg and ffprobe required')
 CACHE.mkdir(parents=True,exist_ok=True);OUT.mkdir(parents=True,exist_ok=True)
 groups=json.loads((ROOT/'data/word_audio/groups.json').read_text(encoding='utf8'))
 selected=groups[:args.limit] if args.limit else groups
 sem=asyncio.Semaphore(args.concurrency);records=await asyncio.gather(*(build(g,sem) for g in selected))
 manifest={'version':1,'voices':VOICES,'rate':RATE,'repeat':3,'batchSize':50,'totalWords':sum(r['wordCount'] for r in records),'totalGroups':len(records),'groups':[{k:v for k,v in r.items() if k not in ['words','signature','individualFallback']} for r in records]}
 (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print(json.dumps({'complete':True,'groups':len(records),'words':manifest['totalWords'],'MB':round(sum(r['bytes'] for r in records)/1e6,1)}),flush=True)
if __name__=='__main__':
 asyncio.run(main())
