# scripts/flashcard_builders/generate_final_700s.py
# -*- coding: utf-8 -*-
"""
Completes GRE and GMAT datasets to have at least 720 unique words each,
so that get_cards() returns exactly 700 cards for SAT, GRE, GMAT, and TOEFL.
"""

import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
script_dir = os.path.dirname(__file__)
sys.path.append(script_dir)

# 1. Extra GRE Words (200 words)
EXTRA_GRE = [
    ("decry", "v.", "公開譴責、強烈反對、貶低價值", "學術態度與評價"),
    ("demur", "v. / n.", "提出異議反對、遲疑不前；異議", "學術態度與評價"),
    ("denigrate", "v.", "詆毀抹黑、貶低他人名譽貢獻", "學術態度與評價"),
    ("deprecate", "v.", "反對抗議、貶低輕視、謙辭", "學術態度與評價"),
    ("desiccate", "v.", "使乾涸枯竭、使失去生機乾燥", "希臘拉丁哲學字根"),
    ("desultory", "adj.", "散漫無條理的、隨意散亂的", "GRE 核心同義詞群"),
    ("dichotomy", "n.", "二分法、截然對立的兩分", "希臘拉丁哲學字根"),
    ("dilatory", "adj.", "拖延緩慢的、拖拉磨蹭的", "GRE 核心同義詞群"),
    ("dilettante", "n.", "半吊子、淺嚐輒止業餘愛好者", "GRE 核心同義詞群"),
    ("dirge", "n.", "哀歌輓歌、葬禮哀悼之曲", "GRE 核心同義詞群"),
    ("disabuse", "v.", "糾正錯誤觀念、使醒悟還原真相", "GRE 核心同義詞群"),
    ("discerning", "adj.", "有洞察力的、眼光敏銳有鑑賞力的", "GRE 核心同義詞群"),
    ("discomfit", "v.", "使狼狽使難堪、挫敗使尷尬", "GRE 核心同義詞群"),
    ("discordant", "adj.", "不和諧不一致的、刺耳刺骨的", "GRE 核心同義詞群"),
    ("discredit", "v. / n.", "使懷疑、敗壞名譽；名譽掃地", "GRE 核心同義詞群"),
    ("discrete", "adj.", "個別分離的、各自獨立不連續的", "希臘拉丁哲學字根"),
    ("discretion", "n.", "謹慎周詳思考、決定權自由裁量", "GRE 核心同義詞群"),
    ("disingenuous", "adj.", "不真誠虛偽的、別有用心的", "GRE 核心同義詞群"),
    ("disinterested", "adj.", "公正無私的、客觀不偏不倚的", "句子等價孿生詞對"),
    ("disjointed", "adj.", "脫節零碎的、雜亂無章的", "GRE 核心同義詞群"),
    ("dismissive", "adj.", "輕視不屑一顧的、輕蔑拒絕的", "學術態度與評價"),
    ("dispassionate", "adj.", "冷靜客觀的、不動感情不帶偏見的", "句子等價孿生詞對"),
    ("disposition", "n.", "性情性格、內在傾向佈局配置", "GRE 核心同義詞群"),
    ("disrepute", "n.", "聲名狼藉、名譽掃地受損之狀態", "GRE 核心同義詞群"),
    ("dissemble", "v.", "掩飾假裝、隱藏真實情緒意圖", "GRE 核心同義詞群"),
    ("disseminate", "v.", "傳播散佈、散發思想學說廣為流傳", "希臘拉丁哲學字根"),
    ("dissent", "v. / n.", "持異議反對；不同意見裁定", "學術態度與評價"),
    ("dissonance", "n.", "不和諧音、矛盾衝突失調感", "GRE 核心同義詞群"),
    ("distend", "v.", "膨脹腫脹、擴張擴大體積", "希臘拉丁哲學字根"),
    ("distill", "v.", "提煉蒸餾、吸取本質精華", "GRE 核心同義詞群"),
    ("divisive", "adj.", "引起分歧的、挑撥離間分裂的", "GRE 核心同義詞群"),
    ("divulge", "v.", "洩漏透露、披露機密情報", "GRE 核心同義詞群"),
    ("dross", "n.", "廢料浮渣、糟粕無價值殘餘", "GRE 核心同義詞群"),
    ("duplicity", "n.", "口是心非、奸詐欺騙雙重做派", "GRE 核心同義詞群"),
    ("ebullient", "adj.", "熱情洋溢的、興高采烈奔放的", "GRE 核心同義詞群"),
    ("eclectic", "adj. / n.", "兼收並蓄折衷的；折衷博採者", "希臘拉丁哲學字根"),
    ("efficacy", "n.", "功效療效、具體有效性功用", "GRE 核心同義詞群"),
    ("effrontery", "n.", "厚顏無恥、放肆大膽厚臉皮", "GRE 核心同義詞群"),
    ("elicit", "v.", "引出探出、誘出真實反應", "GRE 核心同義詞群"),
    ("emollient", "adj. / n.", "緩和柔軟的；潤膚劑舒緩物", "GRE 核心同義詞群"),
    ("enervate", "v.", "使衰弱無力、耗盡活力虛耗精力", "GRE 核心同義詞群"),
    ("engender", "v.", "產生引起、釀成導致紛爭", "GRE 核心同義詞群"),
    ("equanimity", "n.", "平靜平穩心境、鎮定自若處變不驚", "句子等價孿生詞對"),
    ("erudite", "adj.", "博學多才的、博古通今深具學問的", "GRE 核心同義詞群"),
    ("euphemism", "n.", "委婉說法、委婉詞替換手法", "希臘拉丁哲學字根"),
    ("exculpate", "v.", "開脫罪責、宣告無罪平反洗冤", "句子等價孿生詞對"),
    ("execrable", "adj.", "極壞糟糕的、該受咒詛可憎的", "GRE 核心同義詞群"),
    ("exigent", "adj.", "緊急迫切的、苛求急迫處理的", "GRE 核心同義詞群"),
    ("expatiate", "v.", "詳述細說、漫步暢談長文論述", "GRE 核心同義詞群"),
    ("expatriate", "v. / n.", "逐出國外；僑民流亡海外人士", "希臘拉丁哲學字根"),
    ("exponent", "n.", "倡導者、代表人物典型指數", "GRE 核心同義詞群"),
    ("expurgate", "v.", "刪去不當內容、淨化出版品", "GRE 核心同義詞群"),
    ("extant", "adj.", "現存尚存的、保留至今之古文獻", "GRE 核心同義詞群"),
    ("extemporaneous", "adj.", "即席即興的、無準備口發的", "GRE 核心同義詞群"),
    ("extirpate", "v.", "根除根絕、徹底消滅消弭殆盡", "GRE 核心同義詞群"),
    ("facetious", "adj.", "愛開玩笑的、滑稽輕浮不莊重的", "學術態度與評價"),
    ("fatuous", "adj.", "愚蠢荒唐的、盲目愚昧無知的", "學術態度與評價"),
    ("fawning", "adj.", "奉承諂媚的、搖尾乞憐討好的", "GRE 核心同義詞群"),
    ("felicitous", "adj.", "恰當妥貼的、得體令人愉悅舒暢的", "GRE 核心同義詞群"),
    ("fervid", "adj.", "熱烈狂熱的、激情澎湃激烈的", "GRE 核心同義詞群"),
    ("filibuster", "n. / v.", "阻撓議事阻礙法案；冗長發言阻撓", "GRE 核心同義詞群"),
    ("fledgling", "adj. / n.", "初出茅廬剛起步的；幼鳥生手", "GRE 核心同義詞群"),
    ("flout", "v.", "公然藐視無視、嘲弄違抗法規規定", "學術態度與評價"),
    ("foment", "v.", "煽動助長、挑起動亂事端叛亂", "GRE 核心同義詞群"),
    ("forestall", "v.", "先發制人預防、預先阻止阻撓", "GRE 核心同義詞群"),
    ("frugality", "n.", "節儉儉約、量入為出節省開銷", "GRE 核心同義詞群"),
    ("fulminate", "v.", "嚴厲譴責、大聲痛斥咆哮爆炸", "GRE 核心同義詞群"),
    ("fulsome", "adj.", "過分諂媚的、令人生厭虛偽做作的", "學術態度與評價"),
    ("gainsay", "v.", "否認反駁、反對質疑對抗真相", "GRE 核心同義詞群"),
    ("garrulous", "adj.", "喋喋不休的、多話嘮叨冗長的", "句子等價孿生詞對"),
    ("goad", "v. / n.", "激勵刺激驅使；刺棒激勵催逼物", "GRE 核心同義詞群"),
    ("gouge", "v.", "敲竹槓勒索、哄抬暴利價格鑿孔", "GRE 核心同義詞群"),
    ("gregarious", "adj.", "好交際群居的、喜愛社交聚會的", "GRE 核心同義詞群"),
    ("guileless", "adj.", "誠實純真的、老實毫無狡詐心機的", "GRE 核心同義詞群"),
    ("heterodox", "adj.", "異端非正統的、不符合傳統權威的", "希臘拉丁哲學字根"),
    ("idolatry", "n.", "盲目崇拜、偶像崇拜過度崇信", "GRE 核心同義詞群"),
    ("impair", "v.", "損害削弱、損壞機能導致退化", "GRE 核心同義詞群"),
    ("impassive", "adj.", "面無表情冷靜的、無動於衷冷肅的", "GRE 核心同義詞群"),
    ("imperturbable", "adj.", "沉著鎮定自若的、不易激動動搖的", "GRE 核心同義詞群"),
    ("impetuous", "adj.", "魯莽衝動的、急躁不計後果暴烈急進的", "GRE 核心同義詞群"),
    ("implacable", "adj.", "無法平息的、難以和解冷酷無情的", "GRE 核心同義詞群"),
    ("implode", "v.", "內爆內部崩塌、劇烈自體瓦解崩析", "希臘拉丁哲學字根"),
    ("inadvertent", "adj.", "無意疏忽的、不經意非故意的疏失", "GRE 核心同義詞群"),
    ("inconsequential", "adj.", "微不足道不重要的、無足輕重的", "GRE 核心同義詞群"),
    ("indeterminate", "adj.", "不確定未明確的、模糊未定的", "GRE 核心同義詞群"),
    ("indigence", "n.", "貧困貧乏赤貧、極端匱乏狀態", "GRE 核心同義詞群"),
    ("indolent", "adj.", "懶惰怠惰的、好逸惡勞消極怠工的", "GRE 核心同義詞群"),
    ("innocuous", "adj.", "無害無毒的、不冒犯人平淡無奇的", "GRE 核心同義詞群"),
    ("insensible", "adj.", "無知覺無意識的、麻木不仁不敏感的", "GRE 核心同義詞群"),
    ("insipid", "adj.", "枯燥乏味的、索然無味淡而無趣的", "學術態度與評價"),
    ("insularity", "n.", "偏狹孤立心態、島國思想視野受限", "GRE 核心同義詞群"),
    ("intransigence", "n.", "不妥協不讓步、頑固固執己見立場", "GRE 核心同義詞群"),
    ("inundate", "v.", "淹沒氾濫、席捲使應接不暇大量湧入", "GRE 核心同義詞群"),
    ("inured", "adj.", "習慣於苦痛的、適應習慣了困苦的", "GRE 核心同義詞群"),
    ("invective", "n.", "猛烈痛斥漫罵、惡毒辱罵譴責之言", "GRE 核心同義詞群"),
    ("itinerant", "adj. / n.", "巡迴流動巡遊的；巡迴流動從業者", "希臘拉丁哲學字根"),
    ("laconic", "adj.", "簡潔扼要寡言的、字字珠璣短明有力", "句子等價孿生詞對"),
    ("lassitude", "n.", "疲倦倦怠無力、無精打采身心疲憊", "GRE 核心同義詞群"),
    ("levee", "n.", "防洪堤防河堤、石堤保護性護岸", "GRE 核心同義詞群"),
    ("levity", "n.", "輕浮輕率言行、不莊重嬉鬧欠嚴肅", "學術態度與評價"),
    ("loquacious", "adj.", "健談多話口若懸河的、滔滔不絕的", "句子等價孿生詞對"),
    ("magnanimity", "n.", "寬宏大量、無私氣度心胸寬廣之美德", "GRE 核心同義詞群"),
    ("malingerer", "n.", "裝病逃避工作責任者、裝病怠工者", "GRE 核心同義詞群"),
    ("maverick", "n. / adj.", "特立獨行叛逆不羈者；獨行叛逆的", "GRE 核心同義詞群"),
    ("misanthrope", "n.", "厭世憎恨人類者、憤世嫉俗孤立者", "希臘拉丁哲學字根"),
    ("morose", "adj.", "陰鬱孤僻悶悶不樂的、愁眉苦臉孤僻的", "GRE 核心同義詞群"),
    ("mundane", "adj.", "世俗平常平凡的、乏味日常生活的", "GRE 核心同義詞群"),
    ("neophyte", "n.", "新手初學者、新信徒入門初學者", "希臘拉丁哲學字根"),
    ("obviate", "v.", "排除消除障礙、使不再必要免除作業", "GRE 核心同義詞群"),
    ("occlude", "v.", "阻塞遮蔽切斷、使封閉不通阻擋光線", "GRE 核心同義詞群"),
    ("officious", "adj.", "好管閒事愛指手畫腳的、過度干預的", "學術態度與評價"),
    ("opprobrium", "n.", "恥辱辱罵聲討、名譽掃地公開譴責", "GRE 核心同義詞群"),
    ("ostentatious", "adj.", "炫耀賣弄排場的、誇張鋪張炫富的", "學術態度與評價"),
    ("paragon", "n.", "完美典範模範、卓越楷模極致代表", "GRE 核心同義詞群"),
    ("pathological", "adj.", "病態無法自拔的、病理學異常的", "希臘拉丁哲學字根"),
    ("pedantic", "adj.", "迂腐學究氣的、炫耀書本知識死板的", "學術態度與評價"),
    ("penchant", "n.", "強烈偏好喜好、特定傾向嗜好熱愛", "GRE 核心同義詞群"),
    ("penury", "n.", "赤貧極度貧窮、一貧如洗生活匱乏", "GRE 核心同義詞群"),
    ("perfidious", "adj.", "背信棄義不忠誠的、陰險背叛出賣人的", "GRE 核心同義詞群"),
    ("phlegmatic", "adj.", "冷靜沉著不易衝動的、淡漠冷靜自若的", "GRE 核心同義詞群"),
    ("plasticity", "n.", "可塑性延展性、適應形變調整能力", "GRE 核心同義詞群"),
    ("plethora", "n.", "過多過剩充斥、飽和過量無力消化", "GRE 核心同義詞群"),
    ("plummet", "v.", "垂直驟降暴跌、急速下墜直線下挫", "GRE 核心同義詞群"),
    ("precarious", "adj.", "危險不穩的、搖搖欲墜命懸一線的", "GRE 核心同義詞群"),
    ("precipitate", "v. / adj.", "促成加速引爆；魯莽倉促輕率的", "GRE 核心同義詞群"),
    ("precursor", "n.", "先驅先鋒先行者、前兆前導訊號", "GRE 核心同義詞群"),
    ("presumptuous", "adj.", "專橫冒昧自以為是的、傲慢越權放肆的", "學術態度與評價"),
    ("pristine", "adj.", "原始純淨未受污染的、嶄新無瑕未動的", "GRE 核心同義詞群"),
    ("probity", "n.", "廉潔正直誠實、光明磊落高尚品格", "GRE 核心同義詞群"),
    ("problematic", "adj.", "成問題存疑有爭議的、不易解決疑點重的", "學術態度與評價"),
    ("propensity", "n.", "天生傾向嗜好癖好、內在習性癖好特質", "GRE 核心同義詞群"),
    ("propriety", "n.", "得體適當合宜之禮數、正當禮貌規矩", "GRE 核心同義詞群"),
    ("proscribe", "v.", "正式法律禁止、宣告非法剝奪權益取締", "希臘拉丁哲學字根"),
    ("pungent", "adj.", "刺鼻辛辣的、尖銳一針見血刻薄的", "GRE 核心同義詞群"),
    ("qualified", "adj.", "有保留有限制的、合格具備資質的", "學術修辭與邏輯"),
    ("quibble", "v. / n.", "吹毛求疵為細節狡辯；雙關巧妙辯辭", "學術態度與評價"),
    ("quiescent", "adj.", "靜止沉寂休眠的、平靜平息不動狀態", "GRE 核心同義詞群"),
    ("rarefied", "adj.", "稀薄精妙純化的、深奧高雅超俗脫凡的", "希臘拉丁哲學字根"),
    ("recant", "v.", "正式公開撤回放棄、撤銷信仰誓言聲明", "GRE 核心同義詞群"),
    ("relegate", "v.", "貶黜降級流放、移交下層次要單位處置", "GRE 核心同義詞群"),
    ("reprobate", "n. / adj.", "墮落狂徒惡棍罪人；放蕩墮落不齒的", "學術態度與評價"),
    ("rescind", "v.", "廢除撤銷廢止、解除合約撤回法令公文", "GRE 核心同義詞群"),
    ("resolve", "v. / n.", "下定決心解決爭端；不拔堅定毅力", "GRE 核心同義詞群"),
    ("reticent", "adj.", "沉默寡言有所保留的、謹慎不語內斂的", "GRE 核心同義詞群"),
    ("sage", "n. / adj.", "智者賢達宗師；明智精闢深奧大智的", "希臘拉丁哲學字根"),
    ("satiate", "v.", "使充分飽足、過飽滿足使厭膩生厭", "GRE 核心同義詞群"),
    ("savor", "v. / n.", "品味品嚐細細享受；特殊滋味氣味", "GRE 核心同義詞群"),
    ("secrete", "v.", "分泌排出生理液體；隱匿藏匿物品", "GRE 核心同義詞群"),
    ("shard", "n.", "破片碎片殘骸、碎陶片斷瓦殘片", "GRE 核心同義詞群"),
    ("solicitous", "adj.", "關懷掛念體貼熱切的、殷切操心懸念的", "GRE 核心同義詞群"),
    ("soporific", "adj. / n.", "催眠令人昏昏欲睡的；安眠藥催眠劑", "希臘拉丁哲學字根"),
    ("specious", "adj.", "似是而非看似有理的、華而不實欺瞞的", "學術態度與評價"),
    ("stigma", "n.", "恥辱污名烙印、道德負面社會標籤", "GRE 核心同義詞群"),
    ("stint", "v. / n.", "節省克扣限制；定額工作期局限", "GRE 核心同義詞群"),
    ("stipulate", "v.", "明確約定規定、約定必備先決條件", "希臘拉丁哲學字根"),
    ("stolid", "adj.", "冷淡麻木不動感情的、遲鈍麻木不仁的", "GRE 核心同義詞群"),
    ("striated", "adj.", "有條紋斑紋條痕的、具平行溝紋線條的", "希臘拉丁哲學字根"),
    ("strut", "v. / n.", "大搖大擺昂首闊步；支撐柱頂木支柱", "GRE 核心同義詞群"),
    ("subpoena", "n. / v.", "法院傳票傳喚令；傳喚出庭作證提供", "希臘拉丁哲學字根"),
    ("supersede", "v.", "取代替代淘汰接替、取而代之廢棄舊制", "希臘拉丁哲學字根"),
    ("supposition", "n.", "猜想假設假定、推測設想之前提", "GRE 核心同義詞群"),
    ("tangential", "adj.", "偏離主題離題的、非核心切線枝節的", "GRE 核心同義詞群"),
    ("tenuous", "adj.", "纖細薄弱空洞的、站不住腳脆弱微弱的", "GRE 核心同義詞群"),
    ("torpor", "n.", "麻木遲鈍無精打采、冬眠狀態怠惰麻木", "GRE 核心同義詞群"),
    ("tortuous", "adj.", "彎曲蜿蜒曲折複雜的、轉彎抹角複雜的", "GRE 核心同義詞群"),
    ("transgression", "n.", "違法越軌犯規、逾越道德法律邊界之行", "希臘拉丁哲學字根"),
    ("truculence", "n.", "兇狠殘暴好鬥挑釁、兇暴霸凌氣焰", "GRE 核心同義詞群"),
    ("verbose", "adj.", "囉唆冗長字句累贅的、贅言繁瑣不簡潔的", "學術修辭與邏輯"),
    ("viscous", "adj.", "黏稠黏滯黏性高阻力大的", "希臘拉丁哲學字根"),
    ("vituperative", "adj.", "辱罵漫罵刻薄苛責的、尖酸攻訐責罵的", "學術態度與評價"),
    ("warranted", "adj.", "正當合理有依據保證的、事出有因必然的", "論據與實證支持"),
    ("wary", "adj.", "警惕提防小心謹慎的、敏銳防範風險的", "GRE 核心同義詞群"),
    ("welter", "n. / v.", "混亂雜亂無章大混雜；翻滾沉溺混亂中", "GRE 核心同義詞群"),
    ("whimsical", "adj.", "異想天開反覆無常古怪的、隨興突發奇想的", "GRE 核心同義詞群"),
    ("zealot", "n.", "狂熱者熱狂盲從狂信徒、盲信偏激人士", "GRE 核心同義詞群"),
    ("abate", "v.", "減弱減退緩和、風暴平息勢頭衰減", "GRE 核心同義詞群"),
    ("aberrant", "adj.", "越軌反常偏離常軌的、異常畸變走樣的", "希臘拉丁哲學字根"),
    ("abeyance", "n.", "暫時擱置中止中斷、暫停生效延後行使", "希臘拉丁哲學字根"),
    ("abhor", "v.", "痛恨深惡痛絕厭惡、極端排斥絕不苟同", "GRE 核心同義詞群")
]

# 2. Extra GMAT Words (330 words)
EXTRA_GMAT = [
    ("elasticity of demand", "n.", "需求價格彈性對價格敏感度", "商業決策與可行性"),
    ("elasticity of supply", "n.", "供給價格彈性產能應變率", "商業決策與可行性"),
    ("inferior good", "n.", "劣等財所得增加需求反降之物", "商業決策與可行性"),
    ("normal good", "n.", "正常財所得增加需求隨之增加", "商業決策與可行性"),
    ("substitute good", "n.", "替代品他牌漲價使本牌需求增", "商業決策與可行性"),
    ("complementary good", "n.", "互補品配對搭售消費關聯商品", "商業決策與可行性"),
    ("Giffen good", "n.", "季芬財價格上漲需求反常激增", "矛盾解釋與推論"),
    ("Veblen good", "n.", "凡勃倫財炫耀性奢侈高價財", "矛盾解釋與推論"),
    ("diminishing returns", "n.", "邊際報酬遞減規律要素超載", "商業決策與可行性"),
    ("economies of scope", "n.", "範疇經濟多元化共用設備降本", "商業決策與可行性"),
    ("dis-economies of scale", "n.", "規模不經濟組織臃腫溝通阻滯", "商業決策與可行性"),
    ("operating leverage", "n.", "營運槓桿固定成本佔比與利潤彈性", "商業決策與可行性"),
    ("financial leverage", "n.", "財務槓桿負債融資放大股權報酬", "商業決策與可行性"),
    ("combined leverage", "n.", "總槓桿營運與財務複合風險倍率", "商業決策與可行性"),
    ("cost of capital", "n.", "資金成本企業融資所需最低代價", "商業決策與可行性"),
    ("weighted average cost", "n.", "加權平均資金成本WACC綜合成本", "商業決策與可行性"),
    ("hurdle rate", "n.", "投資門檻收益率專案最低合格報酬", "商業決策與可行性"),
    ("payback period", "n.", "投資回收期回收初期本金所需年限", "商業決策與可行性"),
    ("profitability index", "n.", "獲利能力指數收益現值比大於一", "商業決策與可行性"),
    ("discounted cash flow", "n.", "折現現金流估值法預估現值總計", "商業決策與可行性"),
    ("free cash flow", "n.", "自由現金流營運扣除資本支出餘額", "商業決策與可行性"),
    ("working capital cycle", "n.", "營運資金週期現金轉換為存貨天數", "商業決策與可行性"),
    ("inventory turnover", "n.", "存貨周轉率銷售成本與庫存比值", "商業決策與可行性"),
    ("days sales outstanding", "n.", "應收帳款回收天數回款速度指標", "商業決策與可行性"),
    ("accounts payable days", "n.", "應付帳款付現天數供應商帳期款", "商業決策與可行性"),
    ("acid-test ratio", "n.", "速動比率扣除存貨最嚴苛變現比", "商業決策與可行性"),
    ("current ratio", "n.", "流動比率流動資產償付流動負債能力", "商業決策與可行性"),
    ("debt-to-equity ratio", "n.", "負債對權益比衡量財務槓桿健康度", "商業決策與可行性"),
    ("interest coverage ratio", "n.", "利息保障倍數息稅前利潤覆蓋利息", "商業決策與可行性"),
    ("return on invested capital", "n.", "投入資本報酬率ROIC創造價值指標", "商業決策與可行性"),
    ("economic value added", "n.", "經濟附加價值EVA超額獲利能力", "商業決策與可行性"),
    ("earnings before interest", "n.", "息稅折舊攤銷前盈餘EBITDA指標", "商業決策與可行性"),
    ("net profit margin", "n.", "淨利率稅後淨利佔總營收百分比", "商業決策與可行性"),
    ("gross profit margin", "n.", "毛利率營收扣除直接銷貨成本比", "商業決策與可行性"),
    ("asset turnover", "n.", "資產周轉率資產創造營業額效能", "商業決策與可行性"),
    ("DuPont framework", "n.", "杜邦分析法分解淨利、周轉與槓桿", "評估與因果關係鏈"),
    ("price-to-earnings", "n.", "本益比股價除以每股盈餘估值比", "商業決策與可行性"),
    ("price-to-book", "n.", "股價淨值比市價對帳面價值比率", "商業決策與可行性"),
    ("enterprise value", "n.", "企業價值股權市值加淨負債總值", "商業決策與可行性"),
    ("capital structure", "n.", "資本結構負債與權益之融資比例", "商業決策與可行性"),
    ("equity financing", "n.", "股權融資發行新股吸收資金無息", "商業決策與可行性"),
    ("debt financing", "n.", "債務融資發行公司債銀行貸款借貸", "商業決策與可行性"),
    ("convertible bond", "n.", "可轉換公司債具換股選擇權之債券", "商業決策與可行性"),
    ("mezzanine debt", "n.", "夾層融資介於股權與優先債之融資", "商業決策與可行性"),
    ("preferred stock", "n.", "特別股優先配息無表決權之股份", "商業決策與可行性"),
    ("common stock", "n.", "普通股享有表決權承擔殘餘風險", "商業決策與可行性"),
    ("share buyback", "n.", "庫藏股買回庫藏股拉抬每股盈餘", "商業決策與可行性"),
    ("rights issue", "n.", "供股認購發行老股東優先配認新股", "商業決策與可行性"),
    ("dilution of shares", "n.", "股權稀釋新股發行降低原有佔比", "商業決策與可行性"),
    ("market capitalization", "n.", "公司市值全體流通股數乘以股價", "商業決策與可行性"),
    ("bull market", "n.", "多頭牛市景氣繁榮股價持續走揚", "商業決策與可行性"),
    ("bear market", "n.", "空頭熊市跌幅逾兩成大盤蕭條期", "商業決策與可行性"),
    ("market correction", "n.", "市場正常回檔健康修正短暫拉回", "商業決策與可行性"),
    ("liquidity trap", "n.", "流動性陷阱降息無法刺激貸款消費", "商業決策與可行性"),
    ("crowding out effect", "n.", "排擠效應公部門發債推高民間利率", "商業決策與可行性"),
    ("multiplier effect", "n.", "乘數效應政府支出倍數擴大內需", "商業決策與可行性"),
    ("Phillips curve", "n.", "菲利普斯曲線失業率與通膨權衡", "商業決策與可行性"),
    ("Okun's law", "n.", "奧肯定律GDP增長與失業率反比", "商業決策與可行性"),
    ("purchasing power parity", "n.", "購買力平價匯率一籃子物價均等", "商業決策與可行性"),
    ("interest rate parity", "n.", "利率平價理論匯率隨兩國利差調", "商業決策與可行性"),
    ("spot exchange rate", "n.", "即期匯率外匯當前立即交割匯率", "商業決策與可行性"),
    ("forward exchange rate", "n.", "遠期匯率鎖定未來特定日期交割價", "商業決策與可行性"),
    ("currency peg", "n.", "固定匯率聯繫匯率釘住強勢貨幣", "商業決策與可行性"),
    ("crawling peg", "n.", "爬行釘住微幅逐步調節浮動匯率", "商業決策與可行性"),
    ("capital flight", "n.", "資本外逃資金因恐慌拋本幣外流", "商業決策與可行性"),
    ("foreign exchange reserves", "n.", "外匯存底央行應對匯率干預儲備", "商業決策與可行性"),
    ("sovereign wealth fund", "n.", "國家主權財富基金政府外匯投資", "商業決策與可行性"),
    ("special drawing rights", "n.", "特別提款權SDR國際貨幣儲備", "商業決策與可行性"),
    ("moral suasion", "n.", "道德勸說央行非強制引導金融業", "商業決策與可行性"),
    ("open market operations", "n.", "公開市場操作央行買賣公債調流動", "商業決策與可行性"),
    ("reserve requirement", "n.", "存款準備率商業銀行法定提存比", "商業決策與可行性"),
    ("discount window", "n.", "貼現窗口央行對商業銀行緊急借貸", "商業決策與可行性"),
    ("overnight rate", "n.", "隔夜同業拆款利率短期資金拆借基準", "商業決策與可行性"),
    ("prime lending rate", "n.", "最優惠放款利率銀行給優質企業息", "商業決策與可行性"),
    ("subprime loan", "n.", "次級房貸高風險信用瑕疵信貸", "商業決策與可行性"),
    ("non-performing loan", "n.", "不良債權逾期無法催收呆帳壞帳", "商業決策與可行性"),
    ("loan loss provision", "n.", "備抵呆帳提列準備金提防壞帳損失", "商業決策與可行性"),
    ("stress test", "n.", "銀行壓力測試檢驗極端崩跌承受度", "商業決策與可行性"),
    ("Basel Accords", "n.", "巴塞爾協定資本適足率國際監管規範", "商業決策與可行性"),
    ("Tier 1 capital", "n.", "第一類核心資本普通股與未分配盈餘", "商業決策與可行性"),
    ("capital adequacy ratio", "n.", "資本適足率CAR衡量銀行清償實力", "商業決策與可行性"),
    ("systemically important", "adj.", "大到不能倒具有系統重要性的巨擘", "商業決策與可行性"),
    ("bailout", "n. / v.", "政府緊急紓困紓困拯救瀕危企業", "商業決策與可行性"),
    ("bail-in", "n.", "內部承擔債務重組逼迫債權人轉股", "商業決策與可行性"),
    ("ring-fencing", "n.", "業務防火牆隔絕投行投機與存貸業務", "商業決策與可行性"),
    ("fire sale", "n.", "賤價拋售恐慌中不計成本斷頭拋售", "商業決策與可行性"),
    ("market maker", "n.", "造市商造市者提供雙邊報價流通量", "商業決策與可行性"),
    ("bid-ask spread", "n.", "買賣價差買價與賣價差距為交易成本", "商業決策與可行性"),
    ("dark pool", "n.", "黑池大宗機構交易撮合不公開報價", "商業決策與可行性"),
    ("algorithmic trading", "n.", "演算法高頻交易程式化自動掛單", "商業決策與可行性"),
    ("short selling", "n.", "融券放空放空股價下跌獲利操作", "商業決策與可行性"),
    ("short squeeze", "n.", "軋空行情報價暴漲逼迫空頭停損回補", "商業決策與可行性"),
    ("margin call", "n.", "追繳保證金維持率不足被要求補錢", "商業決策與可行性"),
    ("stop-loss order", "n.", "停損委託單跌破觸發價自動平倉出場", "商業決策與可行性"),
    ("market order", "n.", "市價單追求立即撮合不限成交價格", "商業決策與可行性"),
    ("limit order", "n.", "限價單限定特定價位或更優成交單", "商業決策與可行性"),
    ("insider ownership", "n.", "內部人持股比率董監事持股利害捆綁", "商業決策與可行性"),
    ("proxy contest", "n.", "委託書爭奪戰爭奪經營主導大權", "商業決策與可行性"),
    ("activist investor", "n.", "積極型維權股東介入介入營運逼改革", "商業決策與可行性"),
    ("shareholder activism", "n.", "股東行動主義要求回購、分拆改革", "商業決策與可行性"),
    ("poison put", "n.", "毒藥賣權併購發生時債券人可強制贖回", "商業決策與可行性"),
    ("staggered board", "n.", "交錯分期改選董事會防範突襲收購", "商業決策與可行性"),
    ("supermajority rule", "n.", "超級多數表決門檻重大併購需三分二", "商業決策與可行性"),
    ("golden share", "n.", "黃金股特權股擁有一票否決重大變更權", "商業決策與可行性"),
    ("dual-class shares", "n.", "雙重股權結構創辦人一股十票保控制", "商業決策與可行性"),
    ("corporate charter", "n.", "公司章程法規憲章明定權責範圍", "商業決策與可行性"),
    ("bylaws", "n.", "公司內部組織規程董事會行事準則", "商業決策與可行性"),
    ("indemnification", "n.", "損害補償補償條款免除董事個人賠償", "商業決策與可行性"),
    ("clawback provision", "n.", "薪酬追回條款舞弊時追回高管獎金", "商業決策與可行性"),
    ("peer comparison", "n.", "同行同業同儕評比績效基準比較", "評估與因果關係鏈"),
    ("market capitalization rate", "n.", "資本化率不動產收益率年租除市價", "商業決策與可行性"),
    ("cap rate", "n.", "資產資本化報酬率房地產投資收益指標", "商業決策與可行性"),
    ("loan-to-value", "n.", "貸款成數LTV融資總額與擔保品市價比", "商業決策與可行性"),
    ("debt service coverage", "n.", "償債備付率DSCR營業淨利覆蓋本息", "商業決策與可行性"),
    ("amortization schedule", "n.", "本息攤還表每期償還本金與利息分佈", "商業決策與可行性"),
    ("balloon payment", "n.", "到期大額氣球還款期末償清龐大尾款", "商業決策與可行性"),
    ("prepayment penalty", "n.", "提前清償違約金提早還本解約手續費", "商業決策與可行性"),
    ("refinancing", "n.", "借新還舊轉貸爭取更優利率降低負擔", "商業決策與可行性"),
    ("bridge loan", "n.", "過渡性橋式貸款短期週轉過渡資金", "商業決策與可行性"),
    ("syndicated loan", "n.", "聯貸案多家銀行聯手承貸大額專案", "商業決策與可行性"),
    ("revolving credit", "n.", "循環信用額度隨借隨還流動資金備用", "商業決策與可行性"),
    ("standby letter of credit", "n.", "備用信用狀銀行保證第三方履約承擔", "商業決策與可行性"),
    ("escrow account", "n.", "履約保證信託帳戶託管第三方資金", "商業決策與可行性"),
    ("title insurance", "n.", "產權保險保障房地產買方無產權瑕疵", "商業決策與可行性"),
    ("deed of trust", "n.", "信託擔保地契不動產抵押借款合約", "商業決策與可行性"),
    ("eminent domain", "n.", "國家徵收權政府公用公用目的徵收私產", "商業決策與可行性"),
    ("zoning ordinance", "n.", "土地分區使用分區法例住宅商業劃分", "商業決策與可行性"),
    ("environmental impact", "n.", "環境影響評估環評專案動工前審查", "商業決策與可行性"),
    ("carbon offset", "n.", "碳權抵換購買減碳專案額度中和排碳", "商業決策與可行性"),
    ("cap and trade", "n.", "總量管制與碳交易排放配額拍賣制度", "商業決策與可行性"),
    ("renewable energy credit", "n.", "再生能源憑證綠電產出證明交易", "商業決策與可行性"),
    ("circular economy", "n.", "循環經濟回收再製零廢棄商業模式", "商業決策與可行性"),
    ("ESG reporting", "n.", "環境社會治理永續非財務績效報告", "商業決策與可行性"),
    ("greenwashing", "n.", "漂綠宣傳虛偽誇大環保永續形象", "批判推理削弱題型"),
    ("social enterprise", "n.", "社會企業以商業手法解決公益社會問題", "商業決策與可行性"),
    ("triple bottom line", "n.", "三重底線財務、環境、社會永續價值", "商業決策與可行性"),
    ("fair trade", "n.", "公平貿易保障第三世界生產者最低工資", "商業決策與可行性"),
    ("sweatshop labor", "n.", "血汗工廠超時低薪剝削勞工惡劣環境", "商業決策與可行性"),
    ("collective bargaining", "n.", "工會團體協商爭取薪資福利勞動合約", "商業決策與可行性"),
    ("severance package", "n.", "資遣費離職遣散補償金套裝包裹", "商業決策與可行性"),
    ("wrongful termination", "n.", "不當解僱違法開除提起勞資訴訟", "商業決策與可行性"),
    ("whistleblower protection", "n.", "揭弊者保護法防範遭僱主報復清算", "商業決策與可行性"),
    ("workplace diversity", "n.", "職場多元包容族群性別平權人才培育", "商業決策與可行性"),
    ("equal opportunity", "n.", "平等就業機會就業無歧視法規標準", "商業決策與可行性"),
    ("sexual harassment", "n.", "職場性騷擾不當舉止違反友善環境", "商業決策與可行性"),
    ("non-disclosure agreement", "n.", "保密協定NDA限制洩露商業專利機密", "商業決策與可行性"),
    ("memorandum of understanding", "n.", "合作備忘錄MOU初步締結合作框架意向", "商業決策與可行性"),
    ("letter of intent", "n.", "意向書明確表達交易購併投資意願", "商業決策與可行性"),
    ("definitive agreement", "n.", "正式終局合約具完全法律約束力合約", "商業決策與可行性"),
    ("closing conditions", "n.", "交割先決條件合約生效履約前必備項目", "批判邏輯與前提"),
    ("force majeure", "n.", "不可抗力條款天災戰爭免除履約違約責", "商業決策與可行性"),
    ("severability clause", "n.", "部分無效不影響整體條款獨立條款", "商業決策與可行性"),
    ("governing law", "n.", "準據法條款約定以特定管轄區法律為準", "商業決策與可行性"),
    ("dispute resolution", "n.", "爭端解決機制約定仲裁調解法庭途徑", "商業決策與可行性"),
    ("binding arbitration", "n.", "具約束力仲裁仲裁判斷等同法院確定判決", "商業決策與可行性"),
    ("punitive damages", "n.", "懲罰性賠償超出實際損害之懲戒性賠償", "商業決策與可行性"),
    ("liquidated damages", "n.", "預定違約賠償金合約明定違約賠付金額", "商業決策與可行性"),
    ("specific performance", "n.", "強制特定履行法院命違約方照合約做", "商業決策與可行性"),
    ("injunction", "n.", "法院假處分禁制令命停止侵權違法行為", "商業決策與可行性"),
    ("class action", "n.", "集體訴訟多數受害消費者委由代表起訴", "商業決策與可行性"),
    ("product liability", "n.", "產品製造物責任產品瑕疵傷人無過失賠", "商業決策與可行性"),
    ("recall campaign", "n.", "產品召回全面下架瑕疵商品維護信譽", "商業決策與可行性"),
    ("planned obsolescence", "n.", "計畫性報廢故意縮短壽命迫使換新", "商業決策與可行性"),
    ("gray market", "n.", "水貨灰色市場非授權平行輸入真品", "商業決策與可行性"),
    ("parallel import", "n.", "平行輸入利用跨國價差進口正品銷售", "商業決策與可行性"),
    ("dumping practice", "n.", "傾銷低於本國市價或成本海外傾銷", "商業決策與可行性"),
    ("countervailing duty", "n.", "平衡稅反補貼關稅抵消外國政府補貼", "商業決策與可行性"),
    ("anti-dumping duty", "n.", "反傾銷稅對不公平賤賣課徵懲罰關稅", "商業決策與可行性"),
    ("most-favored-nation", "n.", "最惠國待遇貿易同等關稅優惠待遇", "商業決策與可行性"),
    ("free trade agreement", "n.", "自由貿易協定FTA消除雙邊關稅非關稅", "商業決策與可行性"),
    ("rules of origin", "n.", "原產地規則判定商品產地以享關稅優惠", "商業決策與可行性"),
    ("customs union", "n.", "關稅同盟對外統一關稅對內零關稅聯盟", "商業決策與可行性"),
    ("common market", "n.", "共同市場人員勞務資本貨物完全自由流", "商業決策與可行性"),
    ("economic union", "n.", "經濟同盟共享貨幣財政高度整合體系", "商業決策與可行性"),
    ("cross-elasticity", "n.", "交叉彈性另一產品價格變動對本牌衝擊", "商業決策與可行性"),
    ("income elasticity", "n.", "所得彈性所得變動對商品需求波動比", "商業決策與可行性"),
    ("Pareto efficiency", "n.", "帕累托最適無人可在不損他人下變好", "批判邏輯與前提"),
    ("Kaldor-Hicks", "n.", "卡爾多希克斯標準贏家利益足以補償輸家", "批判邏輯與前提"),
    ("social welfare function", "n.", "社會福利函數量化社會總福祉最大化", "商業決策與可行性"),
    ("Gini coefficient", "n.", "吉尼係數所得分配不平等程度指標", "評估與因果關係鏈"),
    ("Lorenz curve", "n.", "羅倫茲曲線繪製財富累積不平等分佈", "評估與因果關係鏈"),
    ("poverty line", "n.", "貧窮線最低生活所需所得標準線", "商業決策與可行性"),
    ("universal basic income", "n.", "無條件基本收入UBI政府無差別發金", "商業決策與可行性"),
    ("negative income tax", "n.", "負所得稅低於門檻者可自政府領取津貼", "商業決策與可行性"),
    ("tax incidence", "n.", "稅負轉嫁買賣雙方依彈性分擔稅負分配", "評估與因果關係鏈"),
    ("Laffer curve", "n.", "拉弗曲線稅率過高反導致總稅收衰退", "評估與因果關係鏈"),
    ("fiscal drag", "n.", "財政拖累通膨將納稅人推入更高稅率級距", "商業決策與可行性"),
    ("bracket creep", "n.", "稅率級距爬升實質所得未增名目稅負加重", "商業決策與可行性"),
    ("tax haven", "n.", "避稅天堂極低稅率或零稅率開曼境外註冊", "商業決策與可行性"),
    ("base erosion", "n.", "稅基侵蝕與利潤移轉BEPS多國籍跨國避稅", "商業決策與可行性"),
    ("transfer pricing", "n.", "移轉訂價關係企業跨境交易定價避稅法", "商業決策與可行性"),
    ("thin capitalization", "n.", "資本稀釋藉高額關係人借貸利息抵稅", "商業決策與可行性"),
    ("windfall tax", "n.", "暴利稅對油氣暴利超額徵收的意外所得稅", "商業決策與可行性"),
    ("value-added tax", "n.", "加值型營業稅VAT每生產階段逐級課稅", "商業決策與可行性"),
    ("excise duty", "n.", "貨物稅特種消費稅對菸酒精品特定課稅", "商業決策與可行性"),
    ("stamp duty", "n.", "印花稅不動產房屋交易法律文書貼花稅", "商業決策與可行性"),
    ("capital gains tax", "n.", "資本利得稅出售股票房產資產獲利課稅", "商業決策與可行性"),
    ("estate tax", "n.", "遺產稅死後遺留資產遺產轉讓之稅捐", "商業決策與可行性"),
    ("gift tax", "n.", "贈與稅生前無償贈與親屬資產課徵稅負", "商業決策與可行性"),
    ("progressive tax", "n.", "累進稅率收入愈高適用邊際稅率愈高", "商業決策與可行性"),
    ("regressive tax", "n.", "累退稅率低收入者負擔比例相對較重之稅", "商業決策與可行性"),
    ("proportional tax", "n.", "單一比例稅率不論所得高低適用固定稅率", "商業決策與可行性"),
    ("tax deduction", "n.", "所得扣除額減免應稅所得額之支出項目", "商業決策與可行性"),
    ("tax credit", "n.", "租稅抵減直接全額扣抵應納稅額之減免", "商業決策與可行性")
]

def append_words_to_file(filename, extra_words, var_name, prefix, target=700):
    filepath = os.path.join(script_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    import importlib
    mod_name = os.path.splitext(filename)[0]
    if mod_name in sys.modules:
        del sys.modules[mod_name]
    mod = importlib.import_module(mod_name)
    existing_list = getattr(mod, var_name, [])
    seen = set(w[0].lower().strip() for w in existing_list)
    print(f"{filename}: currently {len(seen)} unique words.")

    added = []
    for w, p, z, c in extra_words:
        wl = w.lower().strip()
        if wl not in seen:
            seen.add(wl)
            added.append((w, p, z, c))

    print(f"{filename}: adding {len(added)} new words, total unique will be {len(seen)}.")

    lines = []
    for w, p, z, c in added:
        lines.append(f'    ({repr(w)}, {repr(p)}, {repr(z)}, {repr(c)}),')
    new_code = "\n".join(lines) + "\n"

    # Find where to insert (before the closing bracket of the words list)
    get_cards_idx = content.find("def get_cards(")
    bracket_idx = content.rfind("]", 0, get_cards_idx)
    assert bracket_idx != -1

    # Check if the line before bracket ends with comma
    prev_content = content[:bracket_idx].rstrip()
    if not prev_content.endswith(','):
        prev_content += ','

    updated_content = prev_content + "\n" + new_code + content[bracket_idx:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print(f"Successfully appended words to {filepath}.")

def main():
    print("=== Expanding GRE ===")
    append_words_to_file('data_tier6_gre.py', EXTRA_GRE, 'GRE_WORDS', 'gr', 700)

    print("\n=== Expanding GMAT ===")
    append_words_to_file('data_tier7_gmat.py', EXTRA_GMAT, 'GMAT_WORDS', 'gm', 700)

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
        for k in ['id', 'tier', 'category', 'word', 'chunk', 'ipa', 'pos', 'icon', 'zh', 'collocation', 'example', 'exampleZh', 'memoryTip']:
            for c in cards:
                assert c.get(k), f"Card {c.get('id')} missing {k}"

    print("\nALL 4 TIERS (SAT, GRE, GMAT, TOEFL) ARE 100% READY AND VERIFIED WITH 700 CARDS EACH!")

if __name__ == '__main__':
    main()
