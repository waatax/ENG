import os
import re
import json

base = r"C:\Users\User\OneDrive\文件\Antigravity"

print("=================== 1. ARCH ENGLISH DATA ===================")
arch_semesters_path = os.path.join(base, "Arch", "apps", "web", "src", "data", "semesterReviews", "english-semesters.ts")
if os.path.exists(arch_semesters_path):
    with open(arch_semesters_path, "r", encoding="utf-8") as f:
        content = f.read()
    print("Found Arch english-semesters.ts, length:", len(content))
    for m in re.finditer(r'export const (\w+)\s*:\s*SemesterReviewData', content):
        print("  - Semester review export:", m.group(1))

arch_prereq_dir = os.path.join(base, "Arch", "apps", "web", "src", "app", "prerequisites", "english")
if os.path.exists(arch_prereq_dir):
    print("Found Arch prerequisites english pages:")
    for sub in os.listdir(arch_prereq_dir):
        print("  -", sub)

arch_subject_path = os.path.join(base, "Arch", "apps", "web", "src", "data", "subjects", "english.ts")
if os.path.exists(arch_subject_path):
    with open(arch_subject_path, "r", encoding="utf-8") as f:
        c = f.read()
    print("Arch english.ts topics:")
    for m in re.finditer(r'"slug":\s*"([^"]+)",\s*"title":\s*"([^"]+)"', c):
        print(f"  - [{m.group(1)}] {m.group(2)}")

print("\n=================== 2. SIXTH ENGLISH DATA ===================")
sixth_lessons_dir = os.path.join(base, "Sixth", "src", "data", "lessons")
if os.path.exists(sixth_lessons_dir):
    print("Sixth lessons:")
    for f in sorted(os.listdir(sixth_lessons_dir)):
        if f.startswith("eng"):
            print("  -", f, os.path.getsize(os.path.join(sixth_lessons_dir, f)), "bytes")

sixth_notes_path = os.path.join(base, "Sixth", "src", "data", "examNotes", "engNotes.js")
if os.path.exists(sixth_notes_path):
    print("Sixth engNotes.js exists, size:", os.path.getsize(sixth_notes_path))

sixth_audio_path = os.path.join(base, "Sixth", "src", "data", "englishAudioData.js")
if os.path.exists(sixth_audio_path):
    print("Sixth englishAudioData.js exists, size:", os.path.getsize(sixth_audio_path))

sixth_q_path = os.path.join(base, "Sixth", "src", "data", "questionBank", "engQuestions.js")
if os.path.exists(sixth_q_path):
    print("Sixth engQuestions.js exists, size:", os.path.getsize(sixth_q_path))

print("\n=================== 3. JH ENGLISH DATA ===================")
jh_dist = os.path.join(base, "JH", "dist")
if os.path.exists(jh_dist):
    for fn in ["curriculum.js", "cases-language.js", "exam-bank.js", "cap-reviewed.js", "handouts-manifest.json", "cap-analysis-manifest.json"]:
        fp = os.path.join(jh_dist, fn)
        if os.path.exists(fp):
            print(f"JH {fn}: {os.path.getsize(fp)} bytes")

print("\nAnalysis complete.")
