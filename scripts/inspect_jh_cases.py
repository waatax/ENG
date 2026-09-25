import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

base = r"C:\Users\User\OneDrive\文件\Antigravity"
jh_cases = os.path.join(base, "JH", "dist", "cases-language.js")
if os.path.exists(jh_cases):
    with open(jh_cases, "r", encoding="utf-8") as fp:
        txt = fp.read()
    print("cases-language.js length:", len(txt))
    # look for english cases
    lines = [l for l in txt.splitlines() if 'english' in l.lower() or '英語' in l]
    print("English lines count:", len(lines))
    for l in lines[:10]:
        print(" ", l[:100])

jh_exam = os.path.join(base, "JH", "dist", "exam-bank.js")
if os.path.exists(jh_exam):
    with open(jh_exam, "r", encoding="utf-8") as fp:
        txt = fp.read()
    print("\nexam-bank.js length:", len(txt))
    lines = [l for l in txt.splitlines() if 'english' in l.lower() or '英語' in l]
    print("English exam lines count:", len(lines))
    for l in lines[:10]:
        print(" ", l[:100])

