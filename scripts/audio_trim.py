"""Shared PCM helper: remove synthesizer pauses around a spoken clip (16-bit mono)."""
import array

SAMPLE_RATE = 24000


def trim(pcm, threshold=180, pad=.08):
    """Drop leading/trailing near-silence; keep a short pad so soft consonants survive."""
    samples = array.array('h', pcm)
    window = SAMPLE_RATE // 100
    loud = [i for i in range(0, len(samples), window) if max(map(abs, samples[i:i + window]), default=0) > threshold]
    if not loud:
        return pcm
    begin = max(0, loud[0] - int(pad * SAMPLE_RATE))
    end = min(len(samples), loud[-1] + window + int(pad * SAMPLE_RATE))
    return samples[begin:end].tobytes()
