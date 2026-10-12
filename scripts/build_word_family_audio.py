"""Export one MP3 per word family: header (base word or spelled affix/root -> Chinese meaning),
then every member (English word -> Chinese meaning). Part timings let the page highlight and seek members.
Requires edge-tts and FFmpeg; synthesis is cached by text in data/word_audio/cache.
"""
import argparse, asyncio, hashlib, json, os, pathlib
from audio_trim import trim
from build_word_mp3 import segments, run, silence, duration, SAMPLE_RATE, FFMPEG, FFPROBE, CACHE, VOICES, RATE
from build_word_families import spoken_header, spoken_meaning, spoken_member

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT / 'dist/roots'
OUT = BASE / 'audio'
RECORDS = CACHE / 'word-family-records'
FORMAT = 2
BITRATE = '32k'


def plan(group):
    en = [spoken_header(group)] + [m['word'] for m in group['members']]
    zh = [spoken_meaning(group)] + [spoken_member(m['zh']) for m in group['members']]
    return en, zh


def signature(group):
    en, zh = plan(group)
    return hashlib.sha256(json.dumps({'en': en, 'zh': zh, 'voices': VOICES, 'rate': RATE, 'format': FORMAT,
                                      'bitrate': BITRATE}, ensure_ascii=False, sort_keys=True).encode()).hexdigest()


def cached(group):
    record_path, audio = RECORDS / (group['id'] + '.json'), OUT / (group['id'] + '.mp3')
    if record_path.exists() and audio.exists():
        old = json.loads(record_path.read_text(encoding='utf8'))
        if old['signature'] == signature(group) and old['sha256'] == hashlib.sha256(audio.read_bytes()).hexdigest():
            return old


def encode(group, en_pcm, zh_pcm):
    en, zh = plan(group)
    payload, parts, frames = [], [], 0

    def append(pcm):
        nonlocal frames
        payload.append(pcm)
        frames += len(pcm) // 2

    append(silence(.3))
    for index, (en_text, zh_text, en_audio, zh_audio) in enumerate(zip(en, zh, en_pcm, zh_pcm)):
        for role, text, language, pcm, gap in (('english', en_text, 'en-US', en_audio, .3),
                                               ('chinese', zh_text, 'zh-TW', zh_audio, .75 if index == 0 else .6)):
            if len(pcm) < SAMPLE_RATE // 6:
                raise ValueError(f'Empty {role} part in {group["id"]}: {text}')
            start = frames / SAMPLE_RATE
            append(pcm)
            parts.append({'member': index - 1, 'role': role, 'text': text, 'language': language,
                          'start': round(start, 4), 'end': round(frames / SAMPLE_RATE, 4)})
            append(silence(gap))
    target, temporary = OUT / (group['id'] + '.mp3'), OUT / (group['id'] + '.tmp.mp3')
    title = f"{group['display']} {group['meaning']}"
    run([FFMPEG, '-v', 'error', '-y', '-f', 's16le', '-ar', str(SAMPLE_RATE), '-ac', '1', '-i', 'pipe:0',
         '-codec:a', 'libmp3lame', '-b:a', BITRATE, '-id3v2_version', '3', '-metadata', 'title=' + title,
         '-metadata', 'comment=Word family: header then each English word followed by Chinese meaning', str(temporary)],
        b''.join(payload))
    os.replace(temporary, target)
    actual = duration(target)
    if abs(actual - frames / SAMPLE_RATE) > .3:
        raise ValueError('Duration mismatch: ' + group['id'])
    record = {'id': group['id'], 'file': 'audio/' + group['id'] + '.mp3', 'parts': parts, 'duration': round(actual, 4),
              'bytes': target.stat().st_size, 'signature': signature(group),
              'sha256': hashlib.sha256(target.read_bytes()).hexdigest()}
    (RECORDS / (group['id'] + '.json')).write_text(json.dumps(record, ensure_ascii=False, indent=1), encoding='utf8')
    return record


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--limit', type=int)
    parser.add_argument('--concurrency', type=int, default=3)
    args = parser.parse_args()
    if not FFMPEG or not FFPROBE:
        raise SystemExit('FFmpeg and ffprobe required')
    for folder in (CACHE, OUT, RECORDS):
        folder.mkdir(parents=True, exist_ok=True)
    groups = json.loads((BASE / 'groups.json').read_text(encoding='utf8'))['groups']
    groups = groups[:args.limit] if args.limit else groups
    sem = asyncio.Semaphore(args.concurrency)
    done = 0

    async def build(group):
        nonlocal done
        async with sem:
            record = cached(group)
            if not record:
                en, zh = plan(group)
                en_pcm, _ = await segments([{'en': t} for t in en], 'en')
                zh_pcm, _ = await segments([{'zh': t} for t in zh], 'zh')
                record = await asyncio.to_thread(encode, group, [trim(x) for x in en_pcm], [trim(x) for x in zh_pcm])
            done += 1
            if done % 25 == 0 or done == len(groups):
                print(json.dumps({'completed': done, 'total': len(groups)}), flush=True)
            return record

    records = await asyncio.gather(*(build(g) for g in groups))
    manifest = {'version': 1, 'format': 'family-header-then-members', 'voices': VOICES, 'rate': RATE,
                'bitrate': BITRATE, 'groups': len(records), 'totalBytes': sum(r['bytes'] for r in records),
                'totalSeconds': round(sum(r['duration'] for r in records), 1), 'records': records}
    name = 'audio-manifest.json' if len(records) == 500 else 'audio-manifest-preview.json'
    (BASE / name).write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf8')
    preview = BASE / 'audio-manifest-preview.json'
    if len(records) == 500 and preview.exists():
        preview.unlink()
    print(json.dumps({'complete': True, 'groups': len(records), 'MB': round(manifest['totalBytes'] / 1e6, 2),
                      'minutes': round(manifest['totalSeconds'] / 60, 1)}), flush=True)


if __name__ == '__main__':
    asyncio.run(main())
