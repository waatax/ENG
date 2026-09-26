import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('scripts'))
from full_curriculum_data import get_unified_grades

grades = get_unified_grades()
total_units = 0
dialogue_counts = []
concepts_without_ex = 0
total_concepts = 0

for g in grades:
    for s in g['semesters']:
        for u in s['units']:
            total_units += 1
            dlg = u.get('dialogue', [])
            dialogue_counts.append(len(dlg))
            for c in u.get('concepts', []):
                total_concepts += 1
                if 'examExample' not in c:
                    concepts_without_ex += 1

print(f"Total units: {total_units}")
print(f"Total concepts: {total_concepts}, without examExample: {concepts_without_ex}")
print(f"Dialogue lines: min={min(dialogue_counts)}, max={max(dialogue_counts)}, avg={sum(dialogue_counts)/len(dialogue_counts):.1f}")
