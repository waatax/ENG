"""
build_unified_curriculum.py
Extracts, structures, and compiles all English educational content from:
1. Sixth (Grade 6 Units 1-8, engNotes, englishAudioData, engQuestions)
2. JH (Junior High Grades 7-9 Semesters 1-2, Cases, Exam Bank, Handouts, CAP Analysis)
3. Arch (High School/Vocational Semesters 1-4, 5 Prerequisite Modules, 12 Topics)

Generates cleanly modularized ESM files for the ENG platform:
- dist/unified_curriculum.mjs (108 Curriculum tree by Grade and Semester)
- dist/arch_prerequisites.mjs (Arch 5 Prerequisite Interactive modules)
- dist/sixth_assets.mjs (Sixth full grade 6 data)
- dist/jh_assets.mjs (JH 16 units, cases, exam bank, handouts)
- dist/junyi_engine.mjs (Junyi Academy mastery learning & scaffolding engine)
"""

import os
import re
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"C:\Users\User\OneDrive\文件\Antigravity"
SIXTH_DIR = os.path.join(BASE_DIR, "Sixth")
JH_DIR = os.path.join(BASE_DIR, "JH")
ARCH_DIR = os.path.join(BASE_DIR, "Arch")
ENG_DIR = os.path.join(BASE_DIR, "ENG")
DIST_DIR = os.path.join(ENG_DIR, "dist")

os.makedirs(DIST_DIR, exist_ok=True)

print(">>> 1. Processing Sixth Project Data...")

# 1.1 Parse Sixth Lessons (eng-u1.md to eng-u8.md)
sixth_lessons = {}
sixth_lessons_dir = os.path.join(SIXTH_DIR, "src", "data", "lessons")
for i in range(1, 9):
    fn = f"eng-u{i}.md"
    fp = os.path.join(sixth_lessons_dir, fn)
    if os.path.exists(fp):
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Parse title
        m_title = re.search(r'Unit \d:[^\n\)]+\)', content)
        title_str = m_title.group(0) if m_title else f"Unit {i}"
        
        # Parse 108 curriculum indicator
        m_ind = re.search(r'課綱指標[^\n]+', content)
        ind_str = m_ind.group(0) if m_ind else ""
        # Clean latex formatting from ind_str
        clean_ind = re.sub(r'\\[a-zA-Z]+|\{|\}|\$|\*|_', '', ind_str).strip()
        
        # Parse Learning Objectives
        m_objs = re.search(r'🎯\s*學習目標：([\s\S]*?)(?=---\n|##)', content)
        objs = []
        if m_objs:
            for line in m_objs.group(1).splitlines():
                line = line.strip()
                if line and re.match(r'^\d+\.', line):
                    clean_line = re.sub(r'\\[a-zA-Z]+|\{|\}|\$|\*|_', '', line).strip()
                    objs.append(clean_line)
                    
        # Parse why learn this / Context Story
        m_why = re.search(r'## 🎯 學習導引[^\n]*\n([\s\S]*?)(?=---\n|##)', content)
        why_text = ""
        if m_why:
            why_text = re.sub(r'\\[a-zA-Z]+|\{|\}|\$|\*|_', '', m_why.group(1)).strip()

        # Parse Sections / Core Concepts
        sections = []
        for sm in re.finditer(r'## 🔑 核心觀念 \d+：([^\n]+)\n([\s\S]*?)(?=(?:## 🔑 核心觀念|## ⚠️ 學生常犯|## 💡 必考名師|## 📝 實戰演練|---|$))', content):
            sec_title = sm.group(1).strip()
            sec_body = sm.group(2).strip()
            # clean latex markup
            clean_body = re.sub(r'\\textcolor\{[^}]+\}\{([^}]+)\}', r'\1', sec_body)
            clean_body = re.sub(r'\\textbf\{([^}]+)\}', r'\1', clean_body)
            clean_body = re.sub(r'\\text\{([^}]+)\}', r'\1', clean_body)
            clean_body = re.sub(r'\$', '', clean_body)
            sections.append({
                "title": sec_title,
                "content": clean_body
            })
            
        # Parse Traps
        m_traps = re.search(r'## ⚠️ 學生常犯三大迷思概念與避雷指南\n([\s\S]*?)(?=(?:##|---|$))', content)
        traps = []
        if m_traps:
            raw_traps = m_traps.group(1).strip()
            clean_traps = re.sub(r'\\textcolor\{[^}]+\}\{([^}]+)\}', r'\1', raw_traps)
            clean_traps = re.sub(r'\\textbf\{([^}]+)\}', r'\1', clean_traps)
            clean_traps = re.sub(r'\$', '', clean_traps)
            traps = [t.strip() for t in clean_traps.split('###') if t.strip()]

        sixth_lessons[f"eng-u{i}"] = {
            "id": f"eng-u{i}",
            "unit": i,
            "semester": "6A" if i <= 4 else "6B",
            "semesterZh": "六年級上學期" if i <= 4 else "六年級下學期",
            "title": title_str,
            "indicator": clean_ind,
            "objectives": objs,
            "contextStory": why_text,
            "concepts": sections,
            "traps": traps,
            "rawMarkdown": content
        }
print(f"Loaded {len(sixth_lessons)} Sixth lessons.")

# 1.2 Copy/Inspect Sixth Audio Data & Questions & Notes
sixth_audio_file = os.path.join(SIXTH_DIR, "src", "data", "englishAudioData.js")
sixth_q_file = os.path.join(SIXTH_DIR, "src", "data", "questionBank", "engQuestions.js")
sixth_notes_file = os.path.join(SIXTH_DIR, "src", "data", "examNotes", "engNotes.js")

with open(sixth_audio_file, "r", encoding="utf-8") as f:
    sixth_audio_code = f.read()

with open(sixth_q_file, "r", encoding="utf-8") as f:
    sixth_q_code = f.read()

with open(sixth_notes_file, "r", encoding="utf-8") as f:
    sixth_notes_code = f.read()

# Build dist/sixth_assets.mjs
with open(os.path.join(DIST_DIR, "sixth_assets.mjs"), "w", encoding="utf-8") as f:
    f.write("// sixth_assets.mjs - 國小六年級 108 課綱完整教育資產庫 (移植自 Sixth 專案)\n\n")
    f.write(f"export const sixthLessons = {json.dumps(sixth_lessons, ensure_ascii=False, indent=2)};\n\n")
    # clean export statements from files and re-export
    audio_content = re.sub(r'^export\s+const\s+englishAudioData\s*=\s*', 'export const sixthAudioData = ', sixth_audio_code, flags=re.MULTILINE)
    f.write(audio_content + "\n\n")
    
    q_content = re.sub(r'^export\s+const\s+engQuestions\s*=\s*', 'export const sixthQuestions = ', sixth_q_code, flags=re.MULTILINE)
    f.write(q_content + "\n\n")
    
    notes_content = re.sub(r'^export\s+const\s+engNotes\s*=\s*', 'export const sixthNotes = ', sixth_notes_code, flags=re.MULTILINE)
    f.write(notes_content + "\n\n")

print("Created dist/sixth_assets.mjs successfully.")

print(">>> 2. Processing JH Project Data...")
# 2.1 Load JH curriculum, cases, exam bank, handouts
jh_curriculum_file = os.path.join(JH_DIR, "dist", "curriculum.js")
jh_cases_file = os.path.join(JH_DIR, "dist", "cases-language.js")
jh_exam_file = os.path.join(JH_DIR, "dist", "exam-bank.js")
jh_handouts_file = os.path.join(JH_DIR, "dist", "handouts-manifest.json")
jh_cap_manifest_file = os.path.join(JH_DIR, "dist", "cap-manifest.json")
jh_cap_analysis_file = os.path.join(JH_DIR, "dist", "cap-analysis-manifest.json")

# Extract English units from JH curriculum.js
# In JH curriculum.js, units are registered as: u('english', grade, semester, title, desc, examples, ...)
jh_units = []
with open(jh_curriculum_file, "r", encoding="utf-8") as f:
    jh_curr_text = f.read()

unit_matches = re.finditer(r"u\('english'\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']*)'", jh_curr_text)
idx = 1
for m in unit_matches:
    g = int(m.group(1))
    sem = int(m.group(2))
    title = m.group(3)
    desc = m.group(4)
    example = m.group(5)
    jh_units.append({
        "unitId": f"english-{idx}",
        "grade": g,
        "semester": sem,
        "termCode": f"{g}{'上' if sem == 1 else '下'}",
        "termEn": f"Grade {g} Semester {sem}",
        "title": title,
        "summary": desc,
        "exampleSentence": example
    })
    idx += 1

print(f"Extracted {len(jh_units)} units from JH curriculum.js")

# Extract JH cases
jh_cases = {}
with open(jh_cases_file, "r", encoding="utf-8") as f:
    jh_cases_text = f.read()

for m in re.finditer(r"english-(\d+)\|([^\n]+)", jh_cases_text):
    uid = f"english-{m.group(1)}"
    jh_cases[uid] = m.group(2)

print(f"Extracted {len(jh_cases)} JH language cases.")

# Extract JH Handouts
jh_handouts = []
if os.path.exists(jh_handouts_file):
    with open(jh_handouts_file, "r", encoding="utf-8") as f:
        all_handouts = json.load(f)
    files_list = all_handouts.get("files", []) if isinstance(all_handouts, dict) else all_handouts
    for h in files_list:
        if isinstance(h, dict) and h.get("subject") == "english":
            jh_handouts.append(h)
print(f"Extracted {len(jh_handouts)} JH English handouts.")

# Extract JH CAP analysis
jh_cap_analysis = []
if os.path.exists(jh_cap_analysis_file):
    with open(jh_cap_analysis_file, "r", encoding="utf-8") as f:
        all_cap = json.load(f)
    files_list = all_cap.get("files", []) if isinstance(all_cap, dict) else all_cap
    for c in files_list:
        if isinstance(c, dict) and c.get("subject") == "english":
            jh_cap_analysis.append(c)
print(f"Extracted {len(jh_cap_analysis)} JH CAP exam analyses.")

# Write dist/jh_assets.mjs
with open(os.path.join(DIST_DIR, "jh_assets.mjs"), "w", encoding="utf-8") as f:
    f.write("// jh_assets.mjs - 國中 7–9 年級 108 課綱完整會考教育資產庫 (移植自 JH 專案)\n\n")
    f.write(f"export const jhUnits = {json.dumps(jh_units, ensure_ascii=False, indent=2)};\n\n")
    f.write(f"export const jhCases = {json.dumps(jh_cases, ensure_ascii=False, indent=2)};\n\n")
    f.write(f"export const jhHandouts = {json.dumps(jh_handouts, ensure_ascii=False, indent=2)};\n\n")
    f.write(f"export const jhCapAnalysis = {json.dumps(jh_cap_analysis, ensure_ascii=False, indent=2)};\n\n")

print("Created dist/jh_assets.mjs successfully.")

print(">>> 3. Processing Arch Project Data...")
# 3.1 Load Arch Prerequisites
arch_prereq_dir = os.path.join(ARCH_DIR, "apps", "web", "src", "app", "prerequisites", "english")
arch_prereq_data = {}

for module_slug in ["basic-tenses-passive", "complex-sentences", "parts-of-speech", "phonetics-dictionary", "vocab-1200"]:
    p = os.path.join(arch_prereq_dir, module_slug, "page.tsx")
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            code = f.read()
            
        # extract arrays or objects defined in the page
        # Remove TypeScript type annotations like ': any', ': number', etc.
        cleaned_code = re.sub(r':\s*[A-Z][a-zA-Z0-9_<>[\]|,\s]*(\s*=)', r'\1', code)
        cleaned_code = re.sub(r'as\s+[A-Z][a-zA-Z0-9_<>[\]|,\s]*', '', cleaned_code)
        
        arch_prereq_data[module_slug] = {
            "slug": module_slug,
            "rawCode": code
        }

# Let's extract specific data arrays from the Arch prereq files via regex
def extract_js_const(code, name):
    m = re.search(r'const\s+' + name + r'\s*(?::\s*[^=]+)?=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});', code)
    if m:
        raw_val = m.group(1)
        # convert to valid json if possible or clean up trailing commas
        return raw_val
    return "null"

# Extract tenses
with open(os.path.join(arch_prereq_dir, "basic-tenses-passive", "page.tsx"), "r", encoding="utf-8") as f:
    t_code = f.read()
tense_modules_raw = extract_js_const(t_code, "tenseModules")
tense_traps_raw = extract_js_const(t_code, "traps")
tense_quiz_raw = extract_js_const(t_code, "quizQuestions")

# Extract complex sentences
with open(os.path.join(arch_prereq_dir, "complex-sentences", "page.tsx"), "r", encoding="utf-8") as f:
    cs_code = f.read()
cs_pillars_raw = extract_js_const(cs_code, "pillars")
cs_traps_raw = extract_js_const(cs_code, "traps")
cs_quiz_raw = extract_js_const(cs_code, "quizQuestions")

# Extract parts of speech
with open(os.path.join(arch_prereq_dir, "parts-of-speech", "page.tsx"), "r", encoding="utf-8") as f:
    pos_code = f.read()
pos_parts_raw = extract_js_const(pos_code, "partsOfSpeech")
pos_suffixes_raw = extract_js_const(pos_code, "suffixRules")
pos_quiz_raw = extract_js_const(pos_code, "quizQuestions")

# Extract phonetics
with open(os.path.join(arch_prereq_dir, "phonetics-dictionary", "page.tsx"), "r", encoding="utf-8") as f:
    ph_code = f.read()
ph_items_raw = extract_js_const(ph_code, "phoneticItems")
ph_stress_raw = extract_js_const(ph_code, "stressRules")
ph_dict_raw = extract_js_const(ph_code, "dictCodes")
ph_quiz_raw = extract_js_const(ph_code, "quizQuestions")

# Extract vocab 1200
with open(os.path.join(arch_prereq_dir, "vocab-1200", "page.tsx"), "r", encoding="utf-8") as f:
    v_code = f.read()
vocab_categories_raw = extract_js_const(v_code, "categories")
vocab_quiz_raw = extract_js_const(v_code, "quizList")

# Write dist/arch_prerequisites.mjs
with open(os.path.join(DIST_DIR, "arch_prerequisites.mjs"), "w", encoding="utf-8") as f:
    f.write("// arch_prerequisites.mjs - Arch 專案 5 大英文先修核心主題互動數據館\n\n")
    f.write("// 1. 基本時態與被動語態 (Basic Tenses & Passive)\n")
    f.write(f"export const archTenseModules = {tense_modules_raw};\n")
    f.write(f"export const archTenseTraps = {tense_traps_raw};\n")
    f.write(f"export const archTenseQuiz = {tense_quiz_raw};\n\n")
    
    f.write("// 2. 複合句與連接詞 (Complex Sentences & Clauses)\n")
    f.write(f"export const archSentencePillars = {cs_pillars_raw};\n")
    f.write(f"export const archSentenceTraps = {cs_traps_raw};\n")
    f.write(f"export const archSentenceQuiz = {cs_quiz_raw};\n\n")
    
    f.write("// 3. 八大詞性與字尾衍生 (Parts of Speech)\n")
    f.write(f"export const archPartsOfSpeech = {pos_parts_raw};\n")
    f.write(f"export const archSuffixRules = {pos_suffixes_raw};\n")
    f.write(f"export const archPosQuiz = {pos_quiz_raw};\n\n")
    
    f.write("// 4. KK音標與查字典指南 (Phonetics & Dictionary Guide)\n")
    f.write(f"export const archPhoneticItems = {ph_items_raw};\n")
    f.write(f"export const archStressRules = {ph_stress_raw};\n")
    f.write(f"export const archDictCodes = {ph_dict_raw};\n")
    f.write(f"export const archPhoneticsQuiz = {ph_quiz_raw};\n\n")
    
    f.write("// 5. 108 課綱核心 1200 單字庫 (Vocab 1200 Core Explorer)\n")
    f.write(f"export const archVocabCategories = {vocab_categories_raw};\n")
    f.write(f"export const archVocabQuiz = {vocab_quiz_raw};\n\n")

print("Created dist/arch_prerequisites.mjs successfully.")

# 3.2 Load Arch Semester Reviews (english-semesters.ts)
arch_semesters_file = os.path.join(ARCH_DIR, "apps", "web", "src", "data", "semesterReviews", "english-semesters.ts")
with open(arch_semesters_file, "r", encoding="utf-8") as f:
    arch_sem_code = f.read()

# Strip TS imports and types
arch_sem_code_clean = re.sub(r'import\s+type\s+[^;]+;', '', arch_sem_code)
arch_sem_code_clean = re.sub(r'import\s+\{[^}]+\}\s+from\s+[\'"][^\'"]+[\'"];', '', arch_sem_code_clean)
arch_sem_code_clean = re.sub(r':\s*SemesterReviewData', '', arch_sem_code_clean)

with open(os.path.join(DIST_DIR, "arch_semesters.mjs"), "w", encoding="utf-8") as f:
    f.write("// arch_semesters.mjs - 高中/技術型高中 108 課綱 4 個學期深度複習講義 (移植自 Arch 專案)\n\n")
    f.write(arch_sem_code_clean)
    f.write("\n\nexport const archSemesters = [\n  englishS1Review,\n  englishS2Review,\n  englishS3Review,\n  englishS4Review\n];\n")

print("Created dist/arch_semesters.mjs successfully.")

print("All source ingestion finished successfully!")
