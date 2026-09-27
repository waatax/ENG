# -*- coding: utf-8 -*-
import urllib.request
import urllib.parse
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

cache_dir = os.path.join(os.path.dirname(__file__), 'cache_levels')
os.makedirs(cache_dir, exist_ok=True)

base_url = 'https://raw.githubusercontent.com/AppPeterPan/TaiwanSchoolEnglishVocabulary/main/'

for lvl in range(1, 7):
    filename = f"{lvl}級.json"
    local_path = os.path.join(cache_dir, f"level_{lvl}.json")
    if os.path.exists(local_path):
        print(f"Level {lvl} already cached at {local_path}")
        continue
    url = base_url + urllib.parse.quote(filename)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8')
            with open(local_path, 'w', encoding='utf-8') as f:
                f.write(content)
            data = json.loads(content)
            print(f"Downloaded and cached Level {lvl}: {len(data)} words.")
    except Exception as e:
        print(f"Failed to download Level {lvl}: {e}")
