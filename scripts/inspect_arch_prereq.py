import os
import sys
sys.stdout.reconfigure(encoding='utf-8')

arch_prereq_dir = r"C:\Users\User\OneDrive\文件\Antigravity\Arch\apps\web\src\app\prerequisites\english"
for sub in os.listdir(arch_prereq_dir):
    p = os.path.join(arch_prereq_dir, sub, "page.tsx")
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            lines = f.readlines()
            title = ""
            for l in lines[:30]:
                if "title" in l.lower() or "heading" in l.lower() or "<h1" in l:
                    title += l.strip() + " | "
            print(f"=== {sub} ({len(lines)} lines) ===")
            print("  Title clues:", title[:150])

