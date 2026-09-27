# scripts/flashcard_builders/extract_existing.py
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

with open('dist/flashcards.mjs', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = "export const FLASHCARD_DATABASE = ["
start_pos = text.find(start_marker)
var_pos = text.find("let currentTier")
bracket_pos = text.rfind("];", start_pos, var_pos)

db_code = text[start_pos + len(start_marker):bracket_pos].strip()

# Extract object blocks using regex or ast
pattern = re.compile(r'\{[^{}]+id:\s*[\'"][^\'"]+[\'"][^{}]+\}', re.DOTALL)
matches = pattern.findall(db_code)

cards_by_tier = {}
for m in matches:
    def get_field(field):
        f_match = re.search(rf'{field}:\s*([\'"].*?[\'"])(?:,|\s*\n)', m)
        if f_match:
            try:
                return json.loads(f_match.group(1))
            except:
                val = f_match.group(1).strip()
                if val.startswith('"') and val.endswith('"'):
                    return val[1:-1]
                if val.startswith("'") and val.endswith("'"):
                    return val[1:-1]
                return val
        return ""
    
    tier = get_field('tier')
    word = get_field('word').strip().lower()
    if tier and word:
        if tier not in cards_by_tier:
            cards_by_tier[tier] = {}
        cards_by_tier[tier][word] = {
            "id": get_field('id'),
            "tier": tier,
            "category": get_field('category'),
            "word": get_field('word'),
            "chunk": get_field('chunk'),
            "ipa": get_field('ipa'),
            "pos": get_field('pos'),
            "icon": get_field('icon'),
            "zh": get_field('zh'),
            "collocation": get_field('collocation'),
            "example": get_field('example'),
            "exampleZh": get_field('exampleZh'),
            "memoryTip": get_field('memoryTip')
        }

print(f"Total tiers found: {len(cards_by_tier)}")
for t, d in cards_by_tier.items():
    print(f"  {t}: {len(d)} cards")

with open('scripts/flashcard_builders/existing_cards.json', 'w', encoding='utf-8') as f:
    json.dump(cards_by_tier, f, indent=2, ensure_ascii=False)

print("Saved existing cards to scripts/flashcard_builders/existing_cards.json")
