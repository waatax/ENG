import re

for fn in ['scripts/full_curriculum_data.py', 'scripts/append_g8_g9.py']:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(r'(\s+)reason(\s*:\s*)', r'\1"reason"\2', content)
    with open(fn, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Fixed {fn}")

# Verify
for fn in ['scripts/full_curriculum_data.py', 'scripts/append_g8_g9.py']:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    matches = re.findall(r'(\s+)reason\s*:', content)
    print(fn, "Remaining unquoted:", len(matches))
