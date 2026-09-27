# scripts/flashcard_builders/patch_gre_gmat_final.py
# -*- coding: utf-8 -*-
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
script_dir = os.path.dirname(__file__)
sys.path.append(script_dir)

FINAL_GRE = [
    ("absolution", "n.", "赦免免除罪過、宣告無罪寬恕", "希臘拉丁哲學字根"),
    ("accede", "v.", "同意應允要求、登基就任王位", "希臘拉丁哲學字根"),
    ("accord", "n. / v.", "協定協議給予調和；相符一致", "GRE 核心同義詞群"),
    ("accrete", "v.", "逐漸增大吸積、共生共長擴大", "希臘拉丁哲學字根"),
    ("adumbrate", "v.", "預示暗指、粗略勾勒草圖輪廓", "希臘拉丁哲學字根"),
    ("affable", "adj.", "和藹可親的、平易近人溫柔親切的", "GRE 核心同義詞群"),
    ("anodyne", "adj. / n.", "止痛安撫無害的；止痛劑撫慰物", "GRE 核心同義詞群"),
    ("antedate", "v.", "早於先於、標明早於實際日期", "希臘拉丁哲學字根"),
    ("arable", "adj.", "適於耕種的、可開墾耕作肥沃的", "GRE 核心同義詞群"),
    ("apostasy", "n.", "背叛叛教、背棄宗教政治信仰", "希臘拉丁哲學字根"),
    ("appurtenance", "n.", "附屬物附屬設備、配件從屬物", "GRE 核心同義詞群"),
    ("bagatelle", "n.", "微不足道之瑣事、小曲輕音樂", "GRE 核心同義詞群"),
    ("baleful", "adj.", "凶兆有害的、兇狠惡意威脅的", "GRE 核心同義詞群"),
    ("bide", "v.", "等待逗留、耐心等待時機忍受", "GRE 核心同義詞群"),
    ("blazon", "v. / n.", "宣揚炫耀；紋章圖案誇耀展示", "GRE 核心同義詞群"),
    ("bona fide", "adj.", "真實真誠的、合法不欺信實的", "希臘拉丁哲學字根"),
    ("braggart", "n.", "吹牛大王、自誇狂妄自大者", "GRE 核心同義詞群"),
    ("bravura", "n.", "高超技巧、大膽華麗精彩表演", "GRE 核心同義詞群"),
    ("brittle", "adj.", "易碎脆弱的、冷淡尖刻生硬的", "GRE 核心同義詞群"),
    ("broach", "v.", "引入提出敏感話題、開桶汲酒", "GRE 核心同義詞群"),
    ("cadence", "n.", "節奏抑揚頓挫、樂句終止結尾式", "GRE 核心同義詞群"),
    ("canvass", "v.", "遊說拉票、徹底調查詳盡討論", "GRE 核心同義詞群"),
    ("capacious", "adj.", "容量巨大的、寬敞寬大的包容的", "GRE 核心同義詞群"),
    ("captivate", "v.", "深深吸引迷住、使心馳神往傾倒", "GRE 核心同義詞群"),
    ("cardinal", "adj. / n.", "至關重要根本主要的；樞機主教", "GRE 核心同義詞群")
]

FINAL_GMAT = [
    ("law of demand", "n.", "需求法則價格與需求量反向變動", "商業決策與可行性"),
    ("law of supply", "n.", "供給法則價格與供給量正向變動", "商業決策與可行性"),
    ("consumer price index", "n.", "消費者物價指數CPI衡量民生通膨", "商業決策與可行性"),
    ("producer price index", "n.", "生產者物價指數PPI上游出廠物價", "商業決策與可行性"),
    ("core inflation rate", "n.", "核心通膨率剔除能源與糧食波動", "商業決策與可行性"),
    ("purchasing managers index", "n.", "採購經理人指數PMI榮枯線判斷", "商業決策與可行性"),
    ("gross domestic product", "n.", "國內生產毛額GDP境內產出總量", "商業決策與可行性"),
    ("gross national product", "n.", "國民生產毛額GNP全體國民產出", "商業決策與可行性"),
    ("real gross domestic product", "n.", "實質GDP扣除物價波動實質成長", "商業決策與可行性"),
    ("nominal gross domestic product", "n.", "名目GDP當期市場價格計算之產值", "商業決策與可行性"),
    ("per capita income", "n.", "每人平均所得國民財富普及度指標", "商業決策與可行性"),
    ("disposable personal income", "n.", "個人可支配所得繳稅後可用消費額", "商業決策與可行性"),
    ("discretionary spending", "n.", "非必要隨意支出休閒娛樂非民生消費", "商業決策與可行性"),
    ("marginal propensity to consume", "n.", "邊際消費傾向每增加所得花掉比例", "商業決策與可行性"),
    ("marginal propensity to save", "n.", "邊際儲蓄傾向每增加所得存下比例", "商業決策與可行性"),
    ("expansionary monetary policy", "n.", "寬鬆貨幣政策降息購債刺激內需", "商業決策與可行性"),
    ("contractionary monetary policy", "n.", "緊縮貨幣政策升息抑制惡性通膨", "商業決策與可行性"),
    ("quantitative tightening", "n.", "量化緊縮QT縮減資產負債表回收資金", "商業決策與可行性"),
    ("forward guidance", "n.", "央行前瞻指引預告未來利率路徑方針", "商業決策與可行性"),
    ("inflation targeting", "n.", "通膨目標制央行錨定2%通膨基準", "商業決策與可行性"),
    ("currency devaluation", "n.", "貨幣人為貶值促進出口增加貿易出超", "商業決策與可行性"),
    ("currency revaluation", "n.", "貨幣升值重估增加進口購買力抑制通膨", "商業決策與可行性"),
    ("foreign direct investment", "n.", "外商直接投資FDI設立廠房實體投資", "商業決策與可行性"),
    ("hot money flow", "n.", "熱錢跨境短期投機套利炒作熱錢", "商業決策與可行性"),
    ("current account deficit", "n.", "經常帳赤字商品勞務進口支出大於出口", "商業決策與可行性"),
    ("current account surplus", "n.", "經常帳順差淨出口創匯累積外匯儲備", "商業決策與可行性"),
    ("terms of trade", "n.", "貿易條件出口物價除以進口物價比值", "商業決策與可行性"),
    ("absolute advantage", "n.", "絕對優勢生產某商品成本絕對最低", "商業決策與可行性"),
    ("non-tariff barrier", "n.", "非關稅壁壘進口配額檢驗標準限制", "商業決策與可行性"),
    ("voluntary export restraint", "n.", "自動出口限制雙邊妥協減少摩擦", "商業決策與可行性"),
    ("import licensing", "n.", "進口許可證審查制度限制非必要進口", "商業決策與可行性"),
    ("patent expiration", "n.", "專利到期面臨學名藥低價劇烈競爭", "商業決策與可行性"),
    ("generic drug competition", "n.", "學名藥競爭專利失效後毛利率暴跌", "商業決策與可行性"),
    ("brand erosion", "n.", "品牌價值侵蝕過度打折傷害高端形象", "商業決策與可行性"),
    ("market concentration", "n.", "市場集中度少數龍頭大廠控制份額", "商業決策與可行性"),
    ("Herfindahl-Hirschman Index", "n.", "HHI指數反壟斷審查市場集中度指標", "評估與因果關係鏈"),
    ("monopoly rent", "n.", "壟斷租金因缺乏競爭獲得之超額利潤", "商業決策與可行性"),
    ("contestable market", "n.", "可競爭市場進出無門檻迫使廠商合理定價", "商業決策與可行性"),
    ("natural monopoly", "n.", "自然獨占自來水電網重資產規模獨大", "商業決策與可行性"),
    ("price cap regulation", "n.", "價格上限管制政府限縮公用事業收費", "商業決策與可行性"),
    ("cost-plus pricing", "n.", "成本加成定價法生產成本外加固定利潤", "商業決策與可行性"),
    ("target costing", "n.", "目標成本法由市價倒推可允許生產成本", "商業決策與可行性"),
    ("activity-based costing", "n.", "作業基礎成本法ABC精確分攤間接費用", "商業決策與可行性"),
    ("variance analysis", "n.", "差異分析實務預算與實際開銷偏差檢討", "評估與因果關係鏈"),
    ("flexible budgeting", "n.", "彈性預算隨實際業務量動態調整之預算", "商業決策與可行性"),
    ("zero-based budgeting", "n.", "零基預算每年從零開始重新審核每項開銷", "商業決策與可行性"),
    ("capital rationing", "n.", "資本限額資金有限下挑選NPV最高專案", "商業決策與可行性"),
    ("real options valuation", "n.", "實質選擇權延後擴充或放棄之決策彈性", "商業決策與可行性"),
    ("financial distress", "n.", "財務困境現金流不足以支應借貸利息", "商業決策與可行性"),
    ("debt restructuring", "n.", "債務重組展延到期日或降低利息約定", "商業決策與可行性"),
    ("workout agreement", "n.", "債權協議非破產途徑庭外和解重組協議", "商業決策與可行性"),
    ("distressed asset", "n.", "不良資產嚴重受挫賤價拍賣之資產", "商業決策與可行性"),
    ("vulture fund", "n.", "禿鷹基金低價收購破產債權逼迫重組獲利", "商業決策與可行性"),
    ("debt covenant", "n.", "債券承諾條款限制借款人進一步借債", "批判邏輯與前提"),
    ("positive covenant", "n.", "肯定承諾條款約定維持特定流動比率", "批判邏輯與前提"),
    ("negative covenant", "n.", "否定限制條款禁止未經同意發放高股息", "批判邏輯與前提"),
    ("cross-default provision", "n.", "交叉違約條款任一債務違約即全面到期", "商業決策與可行性"),
    ("pari passu clause", "n.", "同等權益條款無擔保債券平起平坐受償", "商業決策與可行性"),
    ("subordination agreement", "n.", "次順位協議後順位清償次級債券合約", "商業決策與可行性"),
    ("senior secured debt", "n.", "優先有擔保債券擁有特定不動產抵押權", "商業決策與可行性"),
    ("unsecured junior bond", "n.", "無擔保次級債券風險高殖利率相應高", "商業決策與可行性"),
    ("convertible debenture", "n.", "可轉換信用債券兼具債息與股票上漲期權", "商業決策與可行性"),
    ("warrant attachment", "n.", "附認股權證附帶以約定價認購新股權利", "商業決策與可行性"),
    ("stock option grant", "n.", "認股權發放高階員工激勵激發敬業精神", "商業決策與可行性"),
    ("restricted stock unit", "n.", "受限股票單位RSU按服務年限分批發放", "商業決策與可行性"),
    ("vesting period", "n.", "既得歸屬期股票選擇權閉鎖不得變現期", "商業決策與可行性"),
    ("phantom stock", "n.", "虛擬股票享有股價分紅但不給予真實股權", "商業決策與可行性"),
    ("performance share", "n.", "績效股票達成特定業績目標才予兌現", "商業決策與可行性"),
    ("golden handshake", "n.", "黃金握手優退優離巨額補償金協議", "商業決策與可行性"),
    ("clawback policy", "n.", "追回機制財報重編時追繳高管績效獎金", "商業決策與可行性"),
    ("board independence", "n.", "董事會獨立性獨立董事過半監督利益", "商業決策與可行性"),
    ("audit committee", "n.", "審計委員會全由獨立董事組成把關財報", "商業決策與可行性"),
    ("compensation committee", "n.", "薪酬委員會核定經理人薪酬避免自肥", "商業決策與可行性"),
    ("nominating committee", "n.", "提名委員會遴選董事候選人專業背景", "商業決策與可行性"),
    ("lead independent director", "n.", "首席獨立董事代表外部股東主持會議", "商業決策與可行性"),
    ("shareholder derivative suit", "n.", "股東代表訴訟股東代公司向前高管求償", "商業決策與可行性"),
    ("piercing the corporate veil", "n.", "揭開公司面紗追究幕後股東無限清償責", "商業決策與可行性"),
    ("business judgment rule", "n.", "商業判斷法則善盡注意義務者免除賠償", "商業決策與可行性"),
    ("ultra vires act", "n.", "越權行為超出公司章程授權之違法合約", "商業決策與可行性"),
    ("hostile bidder", "n.", "敵意收購方未經董事會同意發動突襲者", "商業決策與可行性"),
    ("target company", "n.", "被收購目標公司遭各方角逐爭奪之標的", "商業決策與可行性"),
    ("white knight defense", "n.", "白武士防禦尋求友善第三方高價收購", "商業決策與可行性"),
    ("crown jewel defense", "n.", "皇冠明珠防禦出售最核心資產擊退惡意", "商業決策與可行性"),
    ("Pac-Man defense", "n.", "小精靈防禦反向收購敵意方股份制敵", "商業決策與可行性"),
    ("greenmail payment", "n.", "綠色勒索支付溢價購回狙擊手所持股份", "商業決策與可行性"),
    ("standby commitment", "n.", "備用承諾承銷商保證吃下未認購剩餘股", "商業決策與可行性"),
    ("firm commitment underwriting", "n.", "包銷承銷商自負滯銷風險全額買斷", "商業決策與可行性"),
    ("best efforts underwriting", "n.", "代銷承銷商盡力銷售不負未售完責任", "商業決策與可行性"),
    ("greenshoe option", "n.", "綠鞋選擇權超額配售權穩定上市首發價", "商業決策與可行性"),
    ("lock-up period", "n.", "IPO閉鎖期內部重大股東半年內禁止拋售", "商業決策與可行性"),
    ("roadshow", "n.", "法人說明巡迴路演向大戶機構簡報募資", "商業決策與可行性"),
    ("book building", "n.", "詢價圈購收集機構法人意向訂立承銷價", "商業決策與可行性"),
    ("flotation cost", "n.", "發行成本承銷費會計師律師公關雜支", "商業決策與可行性"),
    ("reverse merger", "n.", "借殼上市私人公司併購空殼上市企業", "商業決策與可行性"),
    ("special purpose acquisition", "n.", "SPAC特殊目的收購公司空殼造殼上市", "商業決策與可行性"),
    ("carve-out", "n.", "股權切分母公司分拆子公司部分股份IPO", "商業決策與可行性"),
    ("tracking stock", "n.", "追蹤股票特定業務單位業績掛鉤之股票", "商業決策與可行性"),
    ("earn-out provision", "n.", "盈利對賭條款達成利潤指標再付購併尾款", "商業決策與可行性"),
    ("synergy assessment", "n.", "綜效評估預估整併後節省行政營業成本", "商業決策與可行性"),
    ("cultural integration", "n.", "企業文化融合併購後跨團隊凝聚關鍵", "商業決策與可行性"),
    ("post-merger integration", "n.", "併購後整合PMI系統人員業務對接", "商業決策與可行性"),
    ("change management", "n.", "變革管理降低組織重組時員工抵觸阻力", "商業決策與可行性"),
    ("lean manufacturing", "n.", "精益生產消除八大浪費持續改善流程", "商業決策與可行性"),
    ("Kaizen philosophy", "n.", "改善哲學全員參與日日微小進步改善", "商業決策與可行性"),
    ("Six Sigma methodology", "n.", "六標準差DMAIC每百萬缺陷率低於3.4", "商業決策與可行性"),
    ("Total Quality Management", "n.", "全面品質管理TQM顧客導向全員品保", "商業決策與可行性"),
    ("statistical process control", "n.", "統計製程管制SPC管制圖監控品質波動", "評估與因果關係鏈"),
    ("root cause analysis", "n.", "根本原因分析五個為什麼探究故障核心", "評估與因果關係鏈"),
    ("Pareto principle", "n.", "八二法則80%產出源自20%關鍵要素", "評估與因果關係鏈"),
    ("critical path method", "n.", "關鍵路徑法CPM決定專案最短完工工期", "商業決策與可行性"),
    ("Gantt chart", "n.", "甘特圖橫條時程表展示各項任務進度關聯", "商業決策與可行性"),
    ("agile development", "n.", "敏捷開發小步快跑迭代衝刺快速交付", "商業決策與可行性"),
    ("Scrum framework", "n.", "Scrum敏捷框架站立會議每日回顧", "商業決策與可行性"),
    ("minimum viable product", "n.", "最小可行性產品MVP快速驗證市場反應", "商業決策與可行性"),
    ("pivot strategy", "n.", "創業樞紐轉型保留核心技術轉移目標受眾", "商業決策與可行性"),
    ("burn rate", "n.", "現金消耗率新創企業每月淨失血營運花費", "商業決策與可行性"),
    ("runway duration", "n.", "資金跑道剩餘現金能支撐營運之月數", "商業決策與可行性"),
    ("pre-money valuation", "n.", "投資前估值新資金注入前公司認定價值", "商業決策與可行性"),
    ("post-money valuation", "n.", "投資後估值投資前估值加上新挹注資金", "商業決策與可行性"),
    ("term sheet", "n.", "投資條款清單創投約定股權清算優先權", "商業決策與可行性"),
    ("drag-along rights", "n.", "領售權大股東出售時強制小股東同條件賣", "商業決策與可行性"),
    ("tag-along rights", "n.", "隨售權保障小股東可隨同大股東出脫股權", "商業決策與可行性"),
    ("anti-dilution provision", "n.", "反稀釋條款降價融資時調整認股比例保護", "商業決策與可行性"),
    ("full ratchet", "n.", "完全棘輪反稀釋直接依最新最低價換算新股", "商業決策與可行性"),
    ("weighted average anti-dilution", "n.", "加權平均反稀釋溫和衡量新股發行規模", "商業決策與可行性"),
    ("liquidation preference", "n.", "清算優先權破產清算時創投優先取回本金", "商業決策與可行性"),
    ("participating preferred", "n.", "參與分配特別股先拿優先本利再分普通股", "商業決策與可行性"),
    ("convertible note", "n.", "可轉換過渡借券未來融資時打折轉成股份", "商業決策與可行性"),
    ("SAFE agreement", "n.", "未來股權簡單協議Y Combinator無利息約定", "商業決策與可行性"),
    ("crowdfunding", "n.", "群眾募資集結大眾小額預購贊助商品化", "商業決策與可行性"),
    ("peer-to-peer lending", "n.", "P2P網路借貸去中介個人向個人借貸", "商業決策與可行性"),
    ("microfinance", "n.", "微型金融鄉村銀行小額貸款扶助赤貧創業", "商業決策與可行性"),
    ("financial inclusion", "n.", "普惠金融讓偏遠無銀行者享金融服務", "商業決策與可行性"),
    ("mobile payment", "n.", "行動支付數位錢包無現金掃碼結帳", "商業決策與可行性"),
    ("blockchain technology", "n.", "區塊鏈去中心化分散式不可竄改帳本", "商業決策與可行性"),
    ("smart contract", "n.", "智慧合約程式碼條件達成自動履約支付", "商業決策與可行性"),
    ("decentralized finance", "n.", "去中心化金融DeFi無仲介無託管借貸", "商業決策與可行性"),
    ("tokenization", "n.", "資產代幣化實體不動產碎化發行加密代幣", "商業決策與可行性"),
    ("cybersecurity insurance", "n.", "資安保險防範駭客入侵資料外洩理賠", "商業決策與可行性"),
    ("ransomware attack", "n.", "勒索軟體加密鎖死伺服器索要加密贖金", "商業決策與可行性"),
    ("data privacy regulation", "n.", "資料隱私個資保護法規GDPR違規重罰", "商業決策與可行性"),
    ("opt-in consent", "n.", "主動勾選同意用戶明確授權方可收集個資", "商業決策與可行性"),
    ("opt-out mechanism", "n.", "退出機制隨時可撤回行銷授權不被打擾", "商業決策與可行性"),
    ("right to be forgotten", "n.", "被遺忘權歐盟規定可要求搜尋引擎除名", "商業決策與可行性"),
    ("algorithmic bias", "n.", "演算法偏見歷史數據帶有性別族群歧視", "批判推理削弱題型"),
    ("explainable AI", "n.", "可解釋性人工智慧透明揭示決策推理邏輯", "批判邏輯與前提")
]

def append_to_file(filename, words, var_name):
    filepath = os.path.join(script_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    import importlib
    mod_name = os.path.splitext(filename)[0]
    if mod_name in sys.modules:
        del sys.modules[mod_name]
    m = importlib.import_module(mod_name)
    seen = set(w[0].lower().strip() for w in getattr(m, var_name, []))

    to_add = []
    for item in words:
        w_low = item[0].lower().strip()
        if w_low not in seen:
            seen.add(w_low)
            to_add.append(item)

    lines = []
    for w, p, z, c in to_add:
        lines.append(f'    ({repr(w)}, {repr(p)}, {repr(z)}, {repr(c)}),')
    new_code = "\n".join(lines) + "\n"

    get_cards_idx = content.find("def get_cards(")
    bracket_idx = content.rfind("]", 0, get_cards_idx)
    assert bracket_idx != -1

    prev_content = content[:bracket_idx].rstrip()
    if not prev_content.endswith(','):
        prev_content += ','

    updated = prev_content + "\n" + new_code + content[bracket_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f"Appended {len(to_add)} words to {filename}. Total unique: {len(seen)}")

def main():
    print("=== Patching GRE ===")
    append_to_file('data_tier6_gre.py', FINAL_GRE, 'GRE_WORDS')

    print("\n=== Patching GMAT ===")
    append_to_file('data_tier7_gmat.py', FINAL_GMAT, 'GMAT_WORDS')

    print("\n=== Verifying All 4 Expansion Tiers (700 cards each) ===")
    import importlib
    for mod_name, tier_name, expected_prefix in [
        ('data_tier5_sat', 'sat', 'sa'),
        ('data_tier6_gre', 'gre', 'gr'),
        ('data_tier7_gmat', 'gmat', 'gm'),
        ('data_tier8_toefl', 'toefl', 'tf')
    ]:
        if mod_name in sys.modules:
            del sys.modules[mod_name]
        m = importlib.import_module(mod_name)
        cards = m.get_cards()
        print(f"Tier {tier_name.upper()} ({mod_name}): {len(cards)} cards! First: {cards[0]['id']} {cards[0]['word']}, Last: {cards[-1]['id']} {cards[-1]['word']}")
        assert len(cards) == 700, f"Expected 700 cards for {tier_name}, got {len(cards)}"
        assert cards[0]['id'] == f"fc-{expected_prefix}-0001"
        assert cards[-1]['id'] == f"fc-{expected_prefix}-0700"

    print("\nSUCCESS! All 4 tiers (SAT, GRE, GMAT, TOEFL) produce exactly 700 cards!")

if __name__ == '__main__':
    main()
