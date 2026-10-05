"""Run the current structural curriculum audit.

This check does not certify semantic correctness, exam validity, or expert review.
"""

from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parent.parent
result = subprocess.run(
    ["node", "scripts/audit_learning_content.mjs"],
    cwd=root,
    check=False,
)
sys.exit(result.returncode)
