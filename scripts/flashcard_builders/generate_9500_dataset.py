# scripts/flashcard_builders/generate_9500_dataset.py
# -*- coding: utf-8 -*-
"""
Generates the complete, expanded dataset for 9,500 flashcards:
1. TOEFL 700 cards (data_tier8_toefl.py)
2. SAT expanded to 700 cards (data_tier5_sat.py)
3. GRE expanded to 700 cards (data_tier6_gre.py)
4. GMAT expanded to 700 cards (data_tier7_gmat.py)
5. Updates assemble_7700.py -> assemble_9500 logic
"""

import os
import sys

script_dir = os.path.dirname(__file__)
sys.path.append(script_dir)

print("Starting generation of 9,500 flashcards expansions...")
