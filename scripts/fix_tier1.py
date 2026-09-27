import re

with open("scripts/diag_builders/tier1_primary.py", "r", encoding="utf-8") as f:
    lines = f.readlines()

fixed_lines = []
for line in lines:
    # inside dict literals like {"a": "1", "b", "2"}
    # replace '", "' that occurs where a colon is needed
    # Specifically match: ,"word", "meaning" -> ,"word": "meaning"
    # or {"word", "meaning" -> {"word": "meaning"
    newline = re.sub(r'([,{]\s*"[^"]+")\s*,\s*("[^"]+")', r'\1: \2', line)
    fixed_lines.append(newline)

with open("scripts/diag_builders/tier1_primary.py", "w", encoding="utf-8") as f:
    f.writelines(fixed_lines)

print("Saved fixed tier1_primary.py")
