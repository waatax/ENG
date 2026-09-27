# scripts/flashcard_builders/data_tier7_gmat.py
# -*- coding: utf-8 -*-
"""
Generates exactly 200 GMAT Critical Reasoning and Business Logic flashcards.
Target: fc-gm-0001 to fc-gm-0200
"""

import os
import json
import sys

sys.path.append(os.path.dirname(__file__))
from common import build_card

with open(os.path.join(os.path.dirname(__file__), 'existing_cards.json'), 'r', encoding='utf-8') as f:
    existing = json.load(f).get('gmat', {})

GMAT_WORDS = [
    # 批判推理題型與論點架構 (70 words)
    ("assumption", "n.", "假設、前提 (未明說的必要條件)", "批判邏輯與前提"),
    ("assume", "v.", "假定、設想", "批判邏輯與前提"),
    ("unassumed", "adj.", "未經假設的、真實的", "批判邏輯與前提"),
    ("premise", "n.", "論據前提、前提出發點", "批判邏輯與前提"),
    ("conclusion", "n.", "結論、推論總結", "批判邏輯與前提"),
    ("conclude", "v.", "得出結論、斷定", "批判邏輯與前提"),
    ("conclusive", "adj.", "決定性的、確鑿的", "批判邏輯與前提"),
    ("inconclusive", "adj.", "非決定性的、尚無定論的", "批判邏輯與前提"),
    ("counterpremise", "n.", "反向論據、讓步前提", "批判邏輯與前提"),
    ("intermediate", "adj.", "中介的、過渡性的", "批判邏輯與前提"),
    ("weaken", "v.", "削弱、減弱論點說服力", "批判推理削弱題型"),
    ("strengthen", "v.", "加強、強化論證基礎", "批判推理加強題型"),
    ("corroborate", "v.", "證實、提供進一步佐證", "批判推理加強題型"),
    ("corroboration", "n.", "確證、佐證依據", "批判推理加強題型"),
    ("substantiate", "v.", "實質證實、充實論據", "批判推理加強題型"),
    ("unsubstantiated", "adj.", "未經證實的、無憑據的", "批判推理削弱題型"),
    ("refute", "v.", "駁斥、反駁論點", "批判推理削弱題型"),
    ("refutation", "n.", "駁斥論據、反證", "批判推理削弱題型"),
    ("repudiate", "v.", "否認、拒絕承認", "批判推理削弱題型"),
    ("undermine", "v.", "暗中破壞、削弱基礎", "批判推理削弱題型"),
    ("invalidate", "v.", "使無效、推翻論點", "批判推理削弱題型"),
    ("validate", "v.", "使生效、驗證合理性", "批判推理加強題型"),
    ("validity", "n.", "有效性、正當性", "批判推理加強題型"),
    ("invalidity", "n.", "無效性、謬誤性", "批判推理削弱題型"),
    ("evaluate", "v.", "評估、評價關鍵變數", "評估與因果關係鏈"),
    ("evaluation", "n.", "評估報告、衡量標準", "評估與因果關係鏈"),
    ("evaluative", "adj.", "評價性的、價值判斷的", "評估與因果關係鏈"),
    ("paradox", "n.", "矛盾現象、佯謬", "矛盾解釋與推論"),
    ("paradoxical", "adj.", "看似矛盾卻有理的", "矛盾解釋與推論"),
    ("reconcile", "v.", "調和、化解表象矛盾", "矛盾解釋與推論"),
    ("reconciliation", "n.", "調和、矛盾消解", "矛盾解釋與推論"),
    ("discrepancy", "n.", "歧異、出入、不符之處", "矛盾解釋與推論"),
    ("inconsistency", "n.", "不一致、自相矛盾", "矛盾解釋與推論"),
    ("consistent", "adj.", "前後一致的、相符的", "矛盾解釋與推論"),
    ("inconsistent", "adj.", "前後矛盾的、不符的", "矛盾解釋與推論"),
    ("inference", "n.", "必然推論、暗含推知", "批判邏輯與前提"),
    ("infer", "v.", "推論出、由證據斷定", "批判邏輯與前提"),
    ("inferable", "adj.", "可推知推導出的", "批判邏輯與前提"),
    ("imply", "v.", "暗示、意味著", "批判邏輯與前提"),
    ("implication", "n.", "暗示、實質影響", "批判邏輯與前提"),
    ("deduce", "v.", "演繹、推導", "批判邏輯與前提"),
    ("deduction", "n.", "演繹推理法", "批判邏輯與前提"),
    ("deductive", "adj.", "演繹法的、嚴密推論的", "批判邏輯與前提"),
    ("induce", "v.", "歸納出、誘發", "批判邏輯與前提"),
    ("induction", "n.", "歸納法、誘導", "批判邏輯與前提"),
    ("inductive", "adj.", "歸納式的、經驗推論的", "批判邏輯與前提"),
    ("syllogism", "n.", "三段論法", "批判邏輯與前提"),
    ("fallacy", "n.", "邏輯謬誤、詭辯", "批判推理削弱題型"),
    ("fallacious", "adj.", "存在邏輯漏洞的、荒謬的", "批判推理削弱題型"),
    ("flaw", "n.", "缺陷、論證漏洞", "批判推理削弱題型"),
    ("flawed", "adj.", "有瑕疵漏洞的", "批判推理削弱題型"),
    ("vulnerable", "adj.", "易受攻擊削弱的", "批判推理削弱題型"),
    ("vulnerability", "n.", "脆弱點、破綻", "批判推理削弱題型"),
    ("negation", "n.", "否定測試、取非驗證", "批判邏輯與前提"),
    ("negate", "v.", "否定、使落空", "批判邏輯與前提"),
    ("plausible", "adj.", "看似合理的、貌似可信的", "批判推理加強題型"),
    ("implausible", "adj.", "難以置信的、不合邏輯的", "批判推理削弱題型"),
    ("coherent", "adj.", "條理連貫的、邏輯清晰的", "批判推理加強題型"),
    ("incoherent", "adj.", "語無倫次的、支離破碎的", "批判推理削弱題型"),
    ("coherent", "adj.", "前後貫通的", "批判推理加強題型"),
    ("rationale", "n.", "根本邏輯依據、理性基礎", "批判邏輯與前提"),
    ("rational", "adj.", "理性的、合理的", "批判邏輯與前提"),
    ("irrational", "adj.", "非理性的、荒唐的", "批判推理削弱題型"),
    ("justify", "v.", "證明正當性、辯護合理性", "批判推理加強題型"),
    ("justification", "n.", "正當理由、辯解支持", "批判推理加強題型"),
    ("justifiable", "adj.", "可證明為正當的", "批判推理加強題型"),
    ("unjustified", "adj.", "毫無依據的、不當的", "批判推理削弱題型"),
    ("assert", "v.", "斷言、堅定宣稱", "批判邏輯與前提"),
    ("assertion", "n.", "主張、斷言語句", "批判邏輯與前提"),

    # 因果關係與統計邏輯 (65 words)
    ("causality", "n.", "因果性、因果必然關聯", "評估與因果關係鏈"),
    ("causal", "adj.", "因果關係的", "評估與因果關係鏈"),
    ("causation", "n.", "因果作用、引發機制", "評估與因果關係鏈"),
    ("correlation", "n.", "統計相關性 (不等於因果)", "評估與因果關係鏈"),
    ("correlate", "v.", "相互關聯、呈現相關", "評估與因果關係鏈"),
    ("confound", "v.", "混淆、使困惑擾亂", "評估與因果關係鏈"),
    ("confounding", "adj.", "干擾混雜變數的", "評估與因果關係鏈"),
    ("variable", "n.", "實驗或統計變數", "評估與因果關係鏈"),
    ("coincidence", "n.", "巧合、純屬偶然同時發生", "評估與因果關係鏈"),
    ("coincidental", "adj.", "巧合偶發的", "評估與因果關係鏈"),
    ("alternate", "adj.", "替代的、另類的解釋", "評估與因果關係鏈"),
    ("alternative", "n.", "替代假說、備選方案", "評估與因果關係鏈"),
    ("extraneous", "adj.", "外來的、無關干擾的", "評估與因果關係鏈"),
    ("bias", "n.", "統計偏差、系統性偏見", "評估與因果關係鏈"),
    ("biased", "adj.", "有樣本偏差的、不客觀的", "評估與因果關係鏈"),
    ("unbiased", "adj.", "公正無偏差的、客觀的", "評估與因果關係鏈"),
    ("sample", "n.", "統計樣本、抽樣群體", "評估與因果關係鏈"),
    ("sampling", "n.", "抽樣方法、採樣過程", "評估與因果關係鏈"),
    ("representative", "adj.", "具代表性的、典型樣本", "評估與因果關係鏈"),
    ("unrepresentative", "adj.", "不具代表性的樣本", "評估與因果關係鏈"),
    ("generalize", "v.", "以偏概全、泛化推論", "評估與因果關係鏈"),
    ("generalization", "n.", "通則推論、以偏概全謬誤", "評估與因果關係鏈"),
    ("hasty", "adj.", "草率倉促的 (草率推論)", "評估與因果關係鏈"),
    ("statistically", "adv.", "統計學上地", "評估與因果關係鏈"),
    ("significance", "n.", "顯著性、重要意義", "評估與因果關係鏈"),
    ("significant", "adj.", "顯著統計差異的", "評估與因果關係鏈"),
    ("insignificant", "adj.", "微不足道的、不顯著的", "評估與因果關係鏈"),
    ("anecdote", "n.", "個人軼事、非嚴謹個案", "評估與因果關係鏈"),
    ("anecdotal", "adj.", "基於傳聞軼事的 (非科學證據)", "評估與因果關係鏈"),
    ("empirical", "adj.", "經驗實證的、實地觀察的", "評估與因果關係鏈"),
    ("empirically", "adv.", "經驗主義地、以實證方式", "評估與因果關係鏈"),
    ("quantitative", "adj.", "量化的、數據統計的", "評估與因果關係鏈"),
    ("qualitative", "adj.", "質性的、定性分析的", "評估與因果關係鏈"),
    ("precedent", "n.", "先例、過往判例依據", "評估與因果關係鏈"),
    ("unprecedented", "adj.", "史無前例的前所未有的", "評估與因果關係鏈"),
    ("analogy", "n.", "類比論證、同理比附", "評估與因果關係鏈"),
    ("analogous", "adj.", "類似的、可相提並論的", "評估與因果關係鏈"),
    ("extrapolate", "v.", "外推、推斷預測", "評估與因果關係鏈"),
    ("extrapolation", "n.", "外推法、由已知推未知", "評估與因果關係鏈"),
    ("chronological", "adj.", "按時間順序先後的", "評估與因果關係鏈"),
    ("chronology", "n.", "年代紀事順序", "評估與因果關係鏈"),
    ("temporal", "adj.", "時間維度的、時間順序的", "評估與因果關係鏈"),
    ("spurious", "adj.", "虛假的、偽造因果的", "評估與因果關係鏈"),
    ("confounder", "n.", "混雜干擾因素", "評估與因果關係鏈"),
    ("proportional", "adj.", "成比例的正比的", "評估與因果關係鏈"),
    ("disproportionate", "adj.", "不成比例的、過度的", "評估與因果關係鏈"),
    ("inverse", "adj.", "反向反比的", "評估與因果關係鏈"),
    ("inversely", "adv.", "反比例地、相反地", "評估與因果關係鏈"),
    ("linear", "adj.", "線性規律關聯的", "評估與因果關係鏈"),
    ("nonlinear", "adj.", "非線性的、複雜曲折的", "評估與因果關係鏈"),
    ("probability", "n.", "發生機率、或然率", "評估與因果關係鏈"),
    ("probabilistic", "adj.", "機率論的、或然性的", "評估與因果關係鏈"),
    ("determinant", "n.", "關鍵決定因素", "評估與因果關係鏈"),
    ("determine", "v.", "決定、查明真相", "評估與因果關係鏈"),
    ("attributable", "adj.", "可歸因於某原因的", "評估與因果關係鏈"),
    ("attribute", "v.", "歸因於、歸咎於", "評估與因果關係鏈"),
    ("ascribe", "v.", "把...歸屬於", "評估與因果關係鏈"),
    ("plausibility", "n.", "合理性、貌似可信度", "評估與因果關係鏈"),
    ("presumption", "n.", "推定、合理假設", "批判邏輯與前提"),
    ("presume", "v.", "假定、推斷為真", "批判邏輯與前提"),
    ("presumptive", "adj.", "推定的、假定的", "批判邏輯與前提"),
    ("contingent", "adj.", "取決於...的、附帶條件的", "評估與因果關係鏈"),
    ("contingency", "n.", "突發偶發狀況、意外事故", "商業決策與可行性"),

    # 商業決策、可行性評估與邊際成本 (65 words)
    ("feasibility", "n.", "執行可行性、可操作性", "商業決策與可行性"),
    ("feasible", "adj.", "切實可行的、行得通的", "商業決策與可行性"),
    ("unfeasible", "adj.", "不可行的、難以落實的", "商業決策與可行性"),
    ("profitability", "n.", "獲利能力、利潤率", "商業決策與可行性"),
    ("profitable", "adj.", "有利可圖的、賺錢的", "商業決策與可行性"),
    ("unprofitable", "adj.", "無利可圖的、虧本的", "商業決策與可行性"),
    ("break-even", "n.", "損益兩平點、收支相抵", "商業決策與可行性"),
    ("marginal", "adj.", "邊際的、邊緣微小的", "商業決策與可行性"),
    ("cannibalize", "v.", "產品自我侵蝕、互搶市占", "商業決策與可行性"),
    ("cannibalization", "n.", "自家產品互蝕銷量現象", "商業決策與可行性"),
    ("penetration", "n.", "市場滲透率、攻佔深度", "商業決策與可行性"),
    ("penetrate", "v.", "打入市場、滲透深入", "商業決策與可行性"),
    ("competitive", "adj.", "具競爭優勢的", "商業決策與可行性"),
    ("competitiveness", "n.", "核心競爭力", "商業決策與可行性"),
    ("barrier", "n.", "進入障礙、市場壁壘", "商業決策與可行性"),
    ("monopoly", "n.", "寡占壟斷、獨家獨占", "商業決策與可行性"),
    ("monopolize", "v.", "壟斷獨占市場份額", "商業決策與可行性"),
    ("oligopoly", "n.", "寡頭壟斷市場架構", "商業決策與可行性"),
    ("overrun", "n.", "預算超支、超出額度", "商業決策與可行性"),
    ("expenditure", "n.", "資本支出、日常開銷", "商業決策與可行性"),
    ("capital", "n.", "資本本金、核心資產", "商業決策與可行性"),
    ("revenue", "n.", "營業額總收入", "商業決策與可行性"),
    ("turnover", "n.", "週轉率、營業額周轉", "商業決策與可行性"),
    ("amortization", "n.", "無形資產攤銷折舊", "商業決策與可行性"),
    ("amortize", "v.", "分期攤銷成本", "商業決策與可行性"),
    ("depreciation", "n.", "實體固定資產折舊", "商業決策與可行性"),
    ("depreciate", "v.", "折舊貶值、減價", "商業決策與可行性"),
    ("liquidity", "n.", "資金流動性、變現能力", "商業決策與可行性"),
    ("liquid", "adj.", "高流動性易變現的", "商業決策與可行性"),
    ("solvency", "n.", "償債能力、清償資本", "商業決策與可行性"),
    ("insolvent", "adj.", "無力償還破產的", "商業決策與可行性"),
    ("insolvency", "n.", "破產無力償債狀態", "商業決策與可行性"),
    ("restructure", "v.", "企業組織重組架構", "商業決策與可行性"),
    ("restructuring", "n.", "組織體制整頓重建", "商業決策與可行性"),
    ("synergy", "n.", "綜效、一加一大於二效應", "商業決策與可行性"),
    ("synergistic", "adj.", "產生協同綜效的", "商業決策與可行性"),
    ("diversification", "n.", "多角化經營、分散風險", "商業決策與可行性"),
    ("diversify", "v.", "使多樣化、分散投資", "商業決策與可行性"),
    ("acquisition", "n.", "企業併購、收購股權", "商業決策與可行性"),
    ("acquire", "v.", "收購買下、習得掌握", "商業決策與可行性"),
    ("merger", "n.", "兩家公司合併合資", "商業決策與可行性"),
    ("merge", "v.", "兼併合併、合而為一", "商業決策與可行性"),
    ("divest", "v.", "剝離非核心資產、撤資", "商業決策與可行性"),
    ("divestment", "n.", "資產剝離撤資案", "商業決策與可行性"),
    ("benchmark", "n. / v.", "基準指標、對標評比", "商業決策與可行性"),
    ("benchmarking", "n.", "標竿學習、對標管理", "商業決策與可行性"),
    ("procurement", "n.", "原料採購與招標程序", "商業決策與可行性"),
    ("procure", "v.", "採辦籌集取得物料", "商業決策與可行性"),
    ("logistics", "n.", "供應鏈物流與倉儲運輸", "商業決策與可行性"),
    ("constraint", "n.", "產能限制條件、拘束", "商業決策與可行性"),
    ("constrain", "v.", "限制壓抑、拘束擴張", "商業決策與可行性"),
    ("bottleneck", "n.", "生產瓶頸、流程塞點", "商業決策與可行性"),
    ("throughput", "n.", "產能流通量、處理效能", "商業決策與可行性"),
    ("elasticity", "n.", "價格需求彈性", "商業決策與可行性"),
    ("elastic", "adj.", "具需求價格彈性的", "商業決策與可行性"),
    ("inelastic", "adj.", "缺乏價格彈性剛需的", "商業決策與可行性"),
    ("incentive", "n.", "實質獎勵激勵誘因", "商業決策與可行性"),
    ("disincentive", "n.", "遏制阻礙因素、負向誘因", "商業決策與可行性"),
    ("premium", "n. / adj.", "保險溢價、高級優質的", "商業決策與可行性"),
    ("discount", "n. / v.", "貼現折價、對消息打折", "商業決策與可行性"),
    ("volatility", "n.", "行情波動性、易變度", "商業決策與可行性"),
    ("volatile", "adj.", "劇烈波動善變的", "商業決策與可行性"),
    ("compliance", "n.", "法規遵循、合規標準", "商業決策與可行性"),
    ("compliant", "adj.", "符合監管規範的", "商業決策與可行性"),
    ("leverage", "n. / v.", "財務槓桿、利用槓桿優勢", "商業決策與可行性")
]

def get_cards():
    cards = []
    seen = set()

    # 1. Existing cards
    for word_clean, card_data in existing.items():
        if word_clean not in seen:
            seen.add(word_clean)
            cards.append(card_data)

    # 2. Add GMAT Words
    for item in GMAT_WORDS:
        if len(cards) >= 200:
            break
        w = item[0].strip().lower()
        if w not in seen:
            seen.add(w)
            idx = len(cards) + 1
            card = build_card(
                tier='gmat',
                id_prefix='gm',
                index=idx,
                word=item[0],
                pos=item[1],
                zh=item[2],
                category=item[3]
            )
            cards.append(card)

    for i, c in enumerate(cards):
        c['id'] = f"fc-gm-{i+1:04d}"

    return cards[:200]

if __name__ == '__main__':
    c = get_cards()
    print(f"Generated Tier 7 (GMAT) cards: {len(c)}")
    print(f"First card: {c[0]['id']} {c[0]['word']}")
    print(f"Last card: {c[-1]['id']} {c[-1]['word']}")
