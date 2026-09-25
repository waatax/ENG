import os
import re
import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

base = r"C:\Users\User\OneDrive\文件\Antigravity"

# 1. Sixth units
print("=== SIXTH LESSON TITLES ===")
sixth_dir = os.path.join(base, "Sixth", "src", "data", "lessons")
for f in sorted(os.listdir(sixth_dir)):
    if f.startswith("eng"):
        with open(os.path.join(sixth_dir, f), "r", encoding="utf-8") as fp:
            first_lines = [fp.readline().strip() for _ in range(5)]
            print(f, first_lines[0] if first_lines else "")

# 2. JH English curriculum
print("\n=== JH ENGLISH CURRICULUM ===")
jh_curriculum_path = os.path.join(base, "JH", "dist", "curriculum.js")
with open(jh_curriculum_path, "r", encoding="utf-8") as fp:
    c_text = fp.read()

# Find english in JH
# Let's search for 'english' or '英語' in curriculum.js
eng_match = re.search(r"(\['english'[\s\S]*?\]\s*,)", c_text)
if eng_match:
    print("Found subject definition:", eng_match.group(1)[:200])

# Look for topics under english
eng_topics_match = re.search(r"export const english = (\[[\s\S]*?\]);\s*export", c_text)
if not eng_topics_match:
    eng_topics_match = re.search(r"const english = (\[[\s\S]*?\]);\s*export", c_text)
if not eng_topics_match:
    # search where english is exported
    for m in re.finditer(r"english\s*=\s*(\[[\s\S]*?\]);", c_text):
        print("Found english variable length:", len(m.group(1)))
        preview = m.group(1)[:500]
        print(preview)

# 3. Sixth engNotes
print("\n=== SIXTH engNotes.js ===")
sixth_notes = os.path.join(base, "Sixth", "src", "data", "examNotes", "engNotes.js")
with open(sixth_notes, "r", encoding="utf-8") as fp:
    note_text = fp.read()
    print("Length:", len(note_text))
    # print section headers
    for m in re.finditer(r'(id:\s*[\'"][^\'"]+[\'"]|title:\s*[\'"][^\'"]+[\'"])', note_text):
        print(" ", m.group(1))

