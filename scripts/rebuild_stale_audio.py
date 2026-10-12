"""Re-synthesize only the card and word-family MP3s whose spoken text no longer matches the data,
then update both manifests in place. Works without the local synthesis cache (e.g. on a CI runner)."""
import argparse, asyncio, json, pathlib
import build_mnemonic_trio_audio as trio
import build_word_family_audio as family
from build_word_mp3 import segments, CACHE
from audio_trim import trim

ROOT = pathlib.Path(__file__).resolve().parent.parent


def stale_cards():
    cards = json.loads((trio.BASE / 'cards.json').read_text(encoding='utf8'))
    manifest = json.loads((trio.BASE / 'audio-manifest.json').read_text(encoding='utf8'))
    assert [r['id'] for r in manifest['records']] == [c['id'] for c in cards]
    return cards, manifest, [i for i, (c, r) in enumerate(zip(cards, manifest['records']))
                             if [p['text'] for p in r['parts']] != trio.texts(c)]


def stale_groups():
    groups = json.loads((family.BASE / 'groups.json').read_text(encoding='utf8'))['groups']
    manifest = json.loads((family.BASE / 'audio-manifest.json').read_text(encoding='utf8'))
    assert [r['id'] for r in manifest['records']] == [g['id'] for g in groups]
    expected = lambda g: [t for pair in zip(*family.plan(g)) for t in pair]
    return groups, manifest, [i for i, (g, r) in enumerate(zip(groups, manifest['records']))
                              if [p['text'] for p in r['parts']] != expected(g)]


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    cards, card_manifest, card_index = stale_cards()
    groups, group_manifest, group_index = stale_groups()
    print(json.dumps({'staleCards': len(card_index), 'staleGroups': len(group_index)}), flush=True)
    if args.dry_run:
        return
    for folder in (CACHE, trio.RECORDS, family.RECORDS, trio.OUT, family.OUT):
        folder.mkdir(parents=True, exist_ok=True)
    for start in range(0, len(card_index), 20):
        batch = card_index[start:start + 20]
        lines = [{'zh': t} for i in batch for t in trio.texts(cards[i])[1:3]]
        chinese, _ = await segments(lines, 'zh')
        for k, i in enumerate(batch):
            card_manifest['records'][i] = trio.encode(cards[i], chinese[2 * k], chinese[2 * k + 1])
        print(json.dumps({'cardsDone': min(start + 20, len(card_index))}), flush=True)
    card_manifest['totalBytes'] = sum(r['bytes'] for r in card_manifest['records'])
    (trio.BASE / 'audio-manifest.json').write_text(json.dumps(card_manifest, ensure_ascii=False, indent=2), encoding='utf8')
    for n, i in enumerate(group_index, 1):
        en, zh = family.plan(groups[i])
        en_pcm, _ = await segments([{'en': t} for t in en], 'en')
        zh_pcm, _ = await segments([{'zh': t} for t in zh], 'zh')
        group_manifest['records'][i] = family.encode(groups[i], [trim(x) for x in en_pcm], [trim(x) for x in zh_pcm])
        if n % 10 == 0 or n == len(group_index):
            print(json.dumps({'groupsDone': n}), flush=True)
    group_manifest['totalBytes'] = sum(r['bytes'] for r in group_manifest['records'])
    group_manifest['totalSeconds'] = round(sum(r['duration'] for r in group_manifest['records']), 1)
    (family.BASE / 'audio-manifest.json').write_text(json.dumps(group_manifest, ensure_ascii=False, indent=1), encoding='utf8')
    _, _, left_cards = stale_cards()
    _, _, left_groups = stale_groups()
    assert not left_cards and not left_groups, (left_cards, left_groups)
    print(json.dumps({'complete': True, 'cards': len(card_index), 'groups': len(group_index)}), flush=True)


if __name__ == '__main__':
    asyncio.run(main())
