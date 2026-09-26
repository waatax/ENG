"""
build_super_curriculum.py
Builds the comprehensive, 100%+ expanded 108 Curriculum Unified English Educational Platform.
Expert Council: 7-Member Interdisciplinary Advisory Team
"""

import sys
import os
import json

sys.stdout.reconfigure(encoding='utf-8')

DIST_DIR = r"C:\Users\User\OneDrive\文件\Antigravity\ENG\dist"

# Let's write the complete unified curriculum generator
def generate_curriculum():
    print("Generating dist/curriculum_unified.mjs with double the content...")
    
    # We will assemble all grades
    # Let's create a python structure and dump to ESM
    from full_curriculum_data import get_unified_grades, get_expert_council
    
    expert_council = get_expert_council()
    unified_grades = get_unified_grades()
    
    code = f"""// curriculum_unified.mjs - 108 課綱英語文全學年上下學期深度教學旗艦庫 (專家團隊雙倍內容大改造版)
// 專家委員會指導：課綱總體諮詢、第二語言習得 (SLA)、均一微課自學、大考會考測驗、語音聲學、技高ESP與全齡UX
// 涵蓋：國小 (Sixth 6上/6下)、國中 (JH 7-9年級 16單元)、高中/技高 (Arch 10-11年級先修與學期複習)、大考全考制

import {{ sixthLessons, sixthNotes, sixthQuestions, sixthAudioData }} from './sixth_assets.mjs';
import {{ jhUnits, jhCases, jhHandouts, jhCapAnalysis }} from './jh_assets.mjs';
import {{ 
  archTenseModules, archTenseTraps, archTenseQuiz,
  archSentencePillars, archSentenceTraps, archSentenceQuiz,
  archPartsOfSpeech, archSuffixRules, archPosQuiz,
  archPhoneticItems, archStressRules, archDictCodes, archPhoneticsQuiz,
  archVocabCategories, archVocabQuiz
}} from './arch_prerequisites.mjs';
import {{ archSemesters, englishS1Review, englishS2Review, englishS3Review, englishS4Review }} from './arch_semesters.mjs';

export const EXPERT_COUNCIL = {json.dumps(expert_council, ensure_ascii=False, indent=2)};

export const UNIFIED_GRADES = {json.dumps(unified_grades, ensure_ascii=False, indent=2)};
"""

    with open(os.path.join(DIST_DIR, "curriculum_unified.mjs"), "w", encoding="utf-8") as f:
        f.write(code)
    
    print(f"Generated dist/curriculum_unified.mjs successfully! Size: {os.path.getsize(os.path.join(DIST_DIR, 'curriculum_unified.mjs')):,} bytes")

if __name__ == '__main__':
    generate_curriculum()
