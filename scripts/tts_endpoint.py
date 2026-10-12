"""Route edge-tts to Microsoft's current Edge read-aloud host.

Since 2026-10-10 the legacy host (speech.platform.bing.com) answers every handshake with 403
(edge-tts issue #490). api.msedgeservices.com serves the same neural voices and the same
24 kHz mono MP3, but rate-limits with 429, so callers must retry with a longer backoff.
"""
import edge_tts.communicate as communicate
from edge_tts.constants import TRUSTED_CLIENT_TOKEN

communicate.WSS_URL = ('wss://api.msedgeservices.com/tts/cognitiveservices/websocket/v1'
                       f'?Ocp-Apim-Subscription-Key={TRUSTED_CLIENT_TOKEN}')
