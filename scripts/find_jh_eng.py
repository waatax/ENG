import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

jh_curriculum_path = r"C:\Users\User\OneDrive\文件\Antigravity\JH\dist\curriculum.js"
with open(jh_curriculum_path, "r", encoding="utf-8") as fp:
    c_text = fp.read()

# Let's inspect where english array is defined or what it imports
lines = c_text.splitlines()
for i, line in enumerate(lines):
    if 'english' in line.lower() and ('export' in line or '=' in line or '[' in line):
        print(f"L{i+1}: {line[:120]}")

