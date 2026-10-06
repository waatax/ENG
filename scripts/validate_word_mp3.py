import concurrent.futures,json,pathlib,subprocess,hashlib,shutil,time
ROOT=pathlib.Path(__file__).resolve().parent.parent
FFMPEG=shutil.which('ffmpeg');FFPROBE=shutil.which('ffprobe')
def verify(g):
 path=ROOT/'dist/audio/words'/g['file']
 probe=json.loads(subprocess.check_output([FFPROBE,'-v','error','-show_entries','stream=codec_name,sample_rate,channels:format=duration','-of','json',str(path)]))
 stream=probe['streams'][0]
 if stream['codec_name']!='mp3' or stream['sample_rate']!='24000' or stream['channels']!=1:raise ValueError('Unexpected format: '+g['id'])
 if abs(float(probe['format']['duration'])-g['duration'])>.02:raise ValueError('Duration mismatch: '+g['id'])
 result=subprocess.run([FFMPEG,'-v','error','-xerror','-i',str(path),'-f','null','-'],capture_output=True)
 if result.returncode or result.stderr:raise ValueError('Decode failure '+g['id']+': '+result.stderr.decode(errors='replace'))
 return {'id':g['id'],'duration':g['duration'],'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'decoded':True}
def main():
 manifest=json.loads((ROOT/'dist/audio/words/manifest.json').read_text(encoding='utf8'))
 if manifest['totalGroups']!=190 or manifest['totalWords']!=9500:raise ValueError('Export incomplete')
 start=time.monotonic()
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:records=list(pool.map(verify,manifest['groups']))
 report={'date':'2026-10-06','groups':len(records),'words':manifest['totalWords'],'wordPairs':manifest['totalWords']*3,'speechSegments':manifest['totalWords']*6,'seconds':round(sum(r['duration'] for r in records),3),'bytes':sum(r['bytes'] for r in records),'allDecoded':True,'files':records}
 (ROOT/'MP3-VALIDATION-2026-10-06.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print(json.dumps({k:v for k,v in report.items() if k!='files'}),flush=True)
 print('Verification seconds: '+str(round(time.monotonic()-start,1)),flush=True)
if __name__=='__main__':main()
