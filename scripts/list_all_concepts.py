import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('scripts'))
from full_curriculum_data import get_unified_grades

grades = get_unified_grades()
count = 0
for g in grades:
    print(f"\n=== {g['gradeId']}: {g['title']} ===")
    for s in g['semesters']:
        print(f"  [{s['semId']}] {s['title']}")
        for u in s['units']:
            print(f"    Unit: {u['id']} - {u['title']}")
            for c in u.get('concepts', []):
                count += 1
                print(f"      {count}. Concept: {c['title']} | Formula: {c.get('formula', '')[:60]}")
