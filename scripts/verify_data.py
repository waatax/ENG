import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('scripts'))

from full_curriculum_data import get_unified_grades, get_expert_council

council = get_expert_council()
print(f"Expert Council members: {len(council)}")
for m in council:
    print(f" - [{m['role']}] {m['name']} | {m['title']}")

grades = get_unified_grades()
print(f"\nUnified Grades count: {len(grades)}")
total_units = 0
total_concepts = 0
total_vocab = 0
total_quizzes = 0
total_traps = 0

for g in grades:
    g_units = 0
    for s in g['semesters']:
        g_units += len(s['units'])
        for u in s['units']:
            total_concepts += len(u.get('concepts', []))
            total_vocab += len(u.get('phonicsVocab', []))
            total_quizzes += len(u.get('formativeQuiz', []))
            total_traps += len(u.get('traps', []))
    total_units += g_units
    print(f" - {g['gradeId']}: {g['title']} -> {len(g['semesters'])} semesters, {g_units} units")

print(f"\nTotal Units: {total_units}")
print(f"Total Concepts: {total_concepts}")
print(f"Total Phonics/Vocab Cards: {total_vocab}")
print(f"Total Formative Quizzes: {total_quizzes}")
print(f"Total Fatal Traps in units: {total_traps}")
