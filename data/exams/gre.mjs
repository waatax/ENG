import {card,single,equivalence} from './authoring.mjs';
for(const [tier,form,rows]of [
 ['low','P',[
 'Although the instructions looked complicated, the trainer’s example made the procedure ___.|clear|costly|secret|unrelated|Although 形成反差，示例讓複雜流程變清楚。',
 'The reviewer praised the argument’s ___: every claim followed logically from stated evidence.|coherence|brevity|popularity|secrecy|後文強調推論連貫，對應 coherence。',
 'Because the records were incomplete, the historian described her conclusion as ___.|tentative|inevitable|unanimous|permanent|不完整證據只支持暫定結論。',
 'Rather than repeat familiar claims, the essay offered a genuinely ___ interpretation.|novel|routine|literal|irrelevant|rather than 與 familiar 對比，需要新穎。']],
 ['low','A',[
 'The committee sought a ___ account, including evidence both for and against the proposal.|balanced|selective|hasty|hostile|納入正反證據，表示 balanced。',
 'The scientist was ___ about announcing a discovery before the measurements had been checked.|cautious|indifferent|eager|careless|尚未核查資料，因此謹慎宣布。',
 'The author’s examples do more than decorate the essay; they ___ its central claim.|support|conceal|replace entirely|contradict|do more than decorate 表示例子有論證支持功能。',
 'The two reports are not identical, but their main findings are broadly ___.|consistent|unrelated|incompatible|unreadable|but 指字面不同而主結論一致。']],
 ['low','B',[
 'The survey’s small sample makes broad generalization ___.|risky|mandatory|precise|automatic|樣本小會提高推廣風險。',
 'The new evidence did not settle the debate; instead, it made the issue more ___.|complex|obvious|trivial|uniform|instead 與 settled 對比，問題更複雜。',
 'The speaker’s ___ tone invited questions rather than discouraging them.|receptive|dismissive|sarcastic|dogmatic|歡迎問題意味態度開放。',
 'Once treated as a minor detail, the anomaly proved ___ to understanding the result.|central|incidental|irrelevant|optional|由 minor 轉為 central，角色重要性改變。']],
 ['mid','P',[
 'The critic’s praise was hardly ___; several paragraphs detailed substantial weaknesses in the work.|unqualified|guarded|measured|conditional|有多處缺點，因此不是無保留讚賞；hardly 否定 unqualified。',
 'Despite the apparent simplicity of the device, its operation remained ___ even to experienced technicians.|opaque|transparent|intuitive|familiar|despite 簡單外觀，運作仍難理解 opaque。',
 'The diplomat’s public remarks were deliberately ___, allowing opposing parties to interpret them favorably.|equivocal|unequivocal|abrasive|irrelevant|可供雙方各自解讀，表示含混而非明確。',
 'The proposal’s appeal was ___: initial enthusiasm faded as its practical costs became evident.|ephemeral|durable|inexplicable|universal|熱情很快消退，吸引力短暫 ephemeral。']],
 ['mid','A',[
 'Far from being ___, the editor welcomed objections and revised her position when evidence warranted.|intransigent|flexible|receptive|conciliatory|Far from 否定頑固；後文明示願意修正。',
 'The novelist’s restrained prose is not emotionally ___; its quiet details often evoke profound grief.|anemic|resonant|poignant|nuanced|not 否定貧乏，後文有深刻情感。',
 'An apparently ___ detail became decisive once investigators understood the document’s provenance.|inconsequential|pivotal|conclusive|indispensable|表面無關緊要，後來成決定性，形成反差。',
 'The argument is rhetorically forceful but logically ___, relying on a premise the author never defends.|tenuous|airtight|compelling|rigorous|but 轉折：修辭有力而邏輯薄弱。']],
 ['mid','B',[
 'The curator resisted a ___ narrative, preferring an account that preserved the period’s contradictions.|monolithic|multifaceted|qualified|polyphonic|保留矛盾對比單一整體敘事 monolithic。',
 'The scientist’s apparent ___ concealed years of painstaking preparation; the discovery was no lucky accident.|serendipity|diligence|rigor|method|看似偶然的發現，實由多年準備支撐。',
 'Although the policy was designed as a temporary measure, it became remarkably ___.|entrenched|fleeting|provisional|sporadic|temporary 與根深蒂固 entrenched 對比。',
 'The reviewer’s objections were ___ rather than substantive, focusing on minor phrasing while leaving the thesis intact.|pedantic|fundamental|devastating|comprehensive|只挑細微措辭，屬拘泥小節而非實質反駁。']],
 ['high','P',[
 'The author’s ostensible ___ is belied by a method that consistently privileges evidence favorable to her thesis.|impartiality|partisanship|dogmatism|credulity|ostensible 與 belied 表外稱公正、實則偏選證據。',
 'The critic’s concession is not a retreat from the argument but a means of ___ it against an obvious objection.|fortifying|vitiating|abandoning|obfuscating|讓步用來防禦反對意見，是強化而非退卻。',
 'The theory’s explanatory ___ is matched by its empirical vulnerability: it accounts for so much that almost any outcome can be accommodated.|breadth|parsimony|precision|restraint|解釋包得太廣，反造成難證偽；breadth 符合後文。',
 'What appears to be the historian’s ___ is better understood as principled resistance to conclusions that outrun the archive.|vacillation|dogmatism|credulity|zeal|看似猶豫搖擺，其實拒絕超出證據下定論。']],
 ['high','A',[
 'The essay’s ___ does not consist in denying uncertainty, but in showing how a defensible claim can survive it.|cogency|equivocation|mendacity|diffidence|能在承認不確定下維持論點，指論證說服力 cogency。',
 'The reviewer found the argument superficially ___ yet ultimately circular, its conclusion smuggled into the premises.|plausible|fallacious|incoherent|irrelevant|superficially 與 ultimately 對比：表面合理、實為循環。',
 'By presenting a contingent arrangement as historically inevitable, the account ___ precisely what requires explanation.|naturalizes|interrogates|problematizes|destabilizes|把偶然安排描成必然，將需解釋的制度自然化。',
 'The reform’s ___ proved its weakness: exceptions multiplied until a rule intended to accommodate difference no longer constrained any decision.|elasticity|rigidity|finality|uniformity|過度彈性使例外擴增，規則失去限制力。']],
 ['high','B',[
 'The scholar’s ___ toward consensus reflects neither contrarianism nor ignorance, but awareness that agreement can outpace evidence.|diffidence|deference|enthusiasm|complacency|共識可能超越證據，故保持保留而非盲從。',
 'The policy’s apparent ___ derives less from internal coherence than from the suppression of cases that expose its contradictions.|consistency|incoherence|fragmentation|ambiguity|表面一致性來自排除反例，非真實內部連貫。',
 'A reading once dismissed as ___ acquired legitimacy when newly discovered letters corroborated its central claim.|speculative|definitive|orthodox|self-evident|原遭視為臆測，後有新信件支持。',
 'The author’s refusal to resolve every tension is not analytical ___; it is an acknowledgment that the evidence supports competing accounts.|laxity|rigor|scrupulousness|acuity|not 否定分析鬆散，說明保留張力是尊重證據。']]
])single('gre',tier,'completion',form,rows);
for(const [tier,form,rows]of [
 ['low','P',[
 ['The explanation was ___, allowing new readers to follow each step.','clear','lucid','hostile','obscure','costly','brief','clear 與 lucid 都指清楚易懂；brief 是短，不保證清楚。'],
 ['The committee remained ___, willing to consider evidence from either side.','open-minded','receptive','obstinate','silent','wealthy','hurried','open-minded 與 receptive 都表願意接受不同證據。'],
 ['Because the evidence was incomplete, the conclusion remained ___.','tentative','provisional','final','unanimous','popular','lengthy','tentative 與 provisional 都表暫定；其他不是不確定程度。'],
 ['The instructions were ___, repeating information already stated several times.','redundant','repetitive','concise','original','precise','ambiguous','明示多次重複，redundant 與 repetitive 形成等義。']]],
 ['low','A',[
 ['The editor’s comments were ___, helping the writer improve the draft.','constructive','helpful','dismissive','vague','lengthy','anonymous','constructive 與 helpful 都支持改進，而非僅描述長度或身份。'],
 ['The result was ___, contrary to what the researchers had predicted.','unexpected','surprising','inevitable','routine','uncertain','unpublished','與預測相反，unexpected 與 surprising 同向。'],
 ['The speaker gave a ___ account, omitting minor details.','concise','succinct','exhaustive','vivid','biased','cautious','省去枝節對應 concise、succinct；不是詳盡 exhaustive。'],
 ['The proposal was ___, likely to work under the available conditions.','feasible','practicable','fashionable','expensive','speculative','inflexible','feasible 與 practicable 均指實際可行。']]],
 ['low','B',[
 ['The archive was ___, containing material on nearly every aspect of the project.','comprehensive','extensive','selective','fragile','recent','secret','範圍廣泛完整，comprehensive 與 extensive 最接近。'],
 ['The witness’s account was ___, matching the independently recorded events.','accurate','correct','eloquent','dramatic','hesitant','long','獨立紀錄相符支持 accurate、correct，非修辭特性。'],
 ['The mechanism was ___, involving only a few easily understood parts.','simple','uncomplicated','durable','costly','hidden','unreliable','少量且易懂零件，simple 與 uncomplicated。'],
 ['The scholar was ___, checking even the smallest details before publication.','careful','meticulous','impatient','famous','skeptical','imaginative','逐一核對小細節，careful 與 meticulous。']]],
 ['mid','P',[
 ['The critic found the prose ___, its meaning concealed beneath elaborate qualifications.','opaque','inscrutable','lucid','terse','ornate','conventional','opaque、inscrutable 都表難理解；ornate 只說華麗。'],
 ['The diplomat was ___, speaking rarely but with unusual precision.','laconic','taciturn','garrulous','effusive','eloquent','indignant','laconic、taciturn 都對應少言；eloquent 不表示少說。'],
 ['The administrator’s decisions were ___, changing without any discernible principle.','capricious','arbitrary','flexible','deliberate','consistent','pragmatic','無可辨原則的改變，capricious、arbitrary。'],
 ['The historian’s judgment was ___, carefully distinguishing what was known from what was merely plausible.','circumspect','cautious','dogmatic','cynical','ecstatic','perfunctory','謹慎區分已知與可能，circumspect、cautious。']]],
 ['mid','A',[
 ['The committee’s support was ___, dependent on several conditions that remained unmet.','qualified','conditional','unanimous','enthusiastic','unreserved','ceremonial','支持附帶條件，qualified、conditional。'],
 ['The theory initially seemed ___, but attempts to test its predictions repeatedly failed.','plausible','credible','infallible','untenable','obscure','discredited','起初似乎可信，plausible、credible；infallible 過度絕對。'],
 ['The lecturer was ___, wandering from one topic to another with little connection.','discursive','rambling','succinct','methodical','erudite','dogmatic','話題漫遊欠連貫，discursive、rambling。'],
 ['The author’s rebuttal was ___, sharply exposing the weaknesses in her opponent’s reasoning.','trenchant','incisive','conciliatory','evasive','obsequious','diffuse','尖銳洞察推理弱點，trenchant、incisive。']]],
 ['mid','B',[
 ['The apparently enduring fashion proved ___, disappearing within a season.','ephemeral','transient','perennial','capricious','novel','universal','一季即消退，ephemeral、transient。'],
 ['The manager’s response was ___, showing little interest in a serious complaint.','perfunctory','cursory','assiduous','hostile','verbose','conciliatory','草率敷衍的處理為 perfunctory、cursory；hostile 不是漠視。'],
 ['The reviewer was ___, finding fault with details too minor to affect the central argument.','pedantic','quibbling','rigorous','enthusiastic','comprehensive','impartial','吹毛求疵於小節，pedantic、quibbling。'],
 ['The evidence was ___, resting on a small and poorly documented sample.','tenuous','flimsy','conclusive','abundant','technical','novel','薄弱資料支持 tenuous、flimsy。']]],
 ['high','P',[
 ['The scholar’s account is ___, interpreting every contrary observation as further confirmation of the theory.','unfalsifiable','untestable','well-supported','parsimonious','tentative','inconclusive','任何反例都被吸收為支持，使理論原則上不可證偽；不可等同實證穩固。'],
 ['The proposal’s apparent generosity was ___, concealing obligations far more burdensome than those it removed.','specious','deceptive','munificent','unequivocal','disinterested','provisional','外貌慷慨而實有負擔，specious、deceptive。'],
 ['The historian’s prose is ___, acknowledging uncertainty without surrendering analytical force.','nuanced','subtle','evasive','categorical','perfunctory','inchoate','有細緻限定但不迴避，nuanced、subtle。'],
 ['The institution’s reforms were ___, preserving the existing distribution of power beneath a vocabulary of change.','cosmetic','superficial','transformative','equitable','irreversible','unprecedented','權力分布不變，改革僅表面 cosmetic、superficial。']]],
 ['high','A',[
 ['The critic’s ___ reading treats a contingent detail as if it determined the work’s entire meaning.','reductive','oversimplifying','exhaustive','provisional','eclectic','disinterested','以單一細節決定全部意義，屬化約 reductive、oversimplifying。'],
 ['The consensus was ___, maintained by discouraging dissent rather than resolving disagreement.','manufactured','contrived','organic','heartfelt','immutable','prescient','靠壓制異議維持，人為製造 manufactured、contrived。'],
 ['The argument is ___, deriving its conclusion from a premise that merely restates that conclusion.','circular','question-begging','sound','empirical','tentative','analogical','前提重述結論，circular 與 question-begging。'],
 ['The author’s skepticism is ___, directed at unsupported certainty rather than at the possibility of knowledge itself.','discriminating','selective','indiscriminate','nihilistic','credulous','reflexive','有選擇地針對無根據確信，discriminating、selective。']]],
 ['high','B',[
 ['The official explanation was ___, obscuring the policy’s distributive effects beneath neutral-sounding language.','misleading','deceptive','transparent','forthright','exhaustive','inadvertent','中性措辭遮掩不利效果，使說明具有誤導性，misleading 與 deceptive 等義。'],
 ['The account is ___, projecting present-day categories onto actors who did not share them.','anachronistic','presentist','chronologically meticulous','contextually sensitive','agnostic','universal in scope','以現代分類套古人，anachronistic、presentist。'],
 ['The apparent contradiction is ___, arising from an ambiguity that disappears once the terms are distinguished.','illusory','apparent','irreconcilable','empirical','fundamental','intractable','區分詞義即消失，矛盾屬表面而非實質。'],
 ['The scholar’s claim is ___, extending beyond the evidence that she herself presents.','overreaching','unwarranted','circumspect','well substantiated','tautological','parsimonious','超出所提供證據，overreaching、unwarranted。']]]
])equivalence(tier,form,rows);
const c=(t,f,p,q)=>card('gre',t,'reading',f,p,q);
c('low','P','A city planted trees to reduce summer heat. Streets with mature trees were cooler than streets with young trees. However, the mature trees were concentrated in older neighborhoods with narrower roads. The study therefore suggests a benefit but does not isolate the effect of tree age.',[
 'What is the passage’s main point?|The comparison does not separate tree age from neighborhood differences.|Young trees never provide shade.|Road width has been proved irrelevant.|All neighborhoods had identical trees.|樹齡與社區特性同時不同，無法隔離樹齡效果。',
 'Which factor differed besides tree age?|Road width|The season of measurement|The city studied|The presence of any streets|成熟樹多在較窄道路的舊社區。',
 'Which design would best address the limitation?|Compare tree ages within similar road settings.|Exclude all mature trees.|Measure only the oldest neighborhood.|Ask residents which trees look better.|相似道路環境中比樹齡可減少混淆。',
 'The author’s stance is best described as what?|Supportive of further investigation but cautious about causation|Certain that trees cause no cooling|Certain that age is the only cause|Uninterested in temperature|承認可能效益但保留因果限制。']);
c('low','A','A historian used shop inventories to study reading habits. Inventories show which books merchants stocked, not necessarily which books customers read. Popular titles may have sold out before an inventory, while unsold titles remained on shelves. The records are useful, but their interpretation requires care.',[
 'What distinction is central?|Books stocked versus books actually read|Printed books versus handwritten receipts|Merchants’ ages versus customers’ ages|Libraries versus schools|庫存不是實際閱讀紀錄。',
 'Why might a popular book be absent?|It may have sold out before inventory.|It was certainly banned.|Customers could not read.|Inventories record only foreign books.|熱門書可能盤點前已售罄。',
 'Which evidence would best complement the inventories?|Dated sales records|The shop’s wall color|The merchant’s handwriting style alone|A modern bestseller list|銷售紀錄更能檢驗實際購買需求。',
 'What is the purpose of the final sentence?|To qualify the value of the source|To reject all historical records|To prove every stocked book was read|To describe a printing method|肯定用途並提醒詮釋限制。']);
c('low','B','Some desert animals avoid daytime heat by being active at night. Yet nocturnal activity also brings costs, including colder temperatures and different predators. Researchers argue that activity schedules reflect several pressures rather than temperature alone.',[
 'What claim does the passage make?|Activity schedules reflect multiple pressures.|All desert animals are nocturnal.|Temperature has no influence.|Predators hunt only in daylight.|夜行有利益也有代價，行為受多因素影響。',
 'Which cost of nocturnal activity is mentioned?|Colder temperatures|Lack of all food|Constant rainfall|No access to shelter|文中明列 colder temperatures 及不同掠食者。',
 'What would contradict a temperature-only explanation?|Animals with similar heat exposure differ according to predator activity.|Daytime is hot.|Some animals rest during daylight.|Deserts have temperature cycles.|相似熱壓力下行為依掠食者而異，顯示其他因素作用。',
 'How does the second sentence relate to the first?|It adds countervailing considerations.|It repeats the same benefit.|It gives the date of a discovery.|It denies the existence of deserts.|補充夜行的反向代價而非否認避熱。']);
c('mid','P','Historians once interpreted a decline in formal petitions as evidence of political passivity. Recent work points to informal negotiations that left fewer written records. The decline may indicate a shift in the channels of political action rather than a reduction in action itself. This interpretation does not show that all groups retained equal influence.',[
 'What revision does the passage propose?|Fewer petitions may reflect a different mode of participation.|Formal petitions never existed.|Political activity definitely increased for every group.|Written records fully capture all action.|以參與管道改變取代單純消極的解釋。',
 'Why mention informal negotiations?|They identify activity missed by the earlier indicator.|They prove all petitions were forged.|They eliminate the need for evidence.|They describe a modern voting system.|正式請願數可能漏掉非正式協商。',
 'What does the final sentence limit?|Claims about equality of influence|Claims that records exist|Claims that negotiations can occur|Claims about the spelling of petitions|新解釋不保證各群體影響力均等。',
 'Which evidence would most strengthen the new interpretation?|Independent accounts of widespread negotiations during the decline|A further count of surviving petitions alone|A modern opinion poll|A list of paper prices without dates|同期其他來源記載協商，可佐證管道移轉。']);
c('mid','A','A model predicts that competition should favor specialists in stable environments. Yet several stable habitats contain generalists. One explanation is that conditions stable at a broad scale still fluctuate locally, making flexibility valuable. The apparent exception may therefore reflect the scale at which stability is measured.',[
 'What resolves the apparent inconsistency?|Broad stability can coexist with local fluctuation.|Generalists are always specialists.|The model predicts no specialists.|Every stable habitat is identical.|尺度不同使穩定與變動可並存。',
 'What assumption of the initial comparison is questioned?|Stability measured broadly captures conditions organisms experience.|Competition exists.|Generalists occupy habitats.|Some environments are stable.|宏觀穩定未必等於個體面對的微環境穩定。',
 'Which observation would support the explanation?|Generalists exploit locally changing resources in broadly stable habitats.|All local resources remain fixed forever.|No generalists use flexible strategies.|Broad-scale measurements become less expensive.|支持機制需觀察局部資源變動與靈活利用。',
 'The author chiefly does what?|Reinterprets an exception by reconsidering measurement scale|Rejects every ecological model|Proves broad measurements are fabricated|Lists unrelated habitats|主要透過尺度重新詮釋模型與觀察的落差。']);
c('mid','B','A composer’s surviving letters rarely discuss money, leading some biographers to portray her as indifferent to financial matters. But letters to publishers were selectively preserved by relatives who wished to emphasize artistic dedication. Silence in the archive may reflect preservation choices rather than the composer’s priorities.',[
 'What inference is challenged?|Archival silence reliably indicates personal indifference.|The composer wrote any letters.|Publishers paid composers.|Relatives preserved documents.|檔案未提錢不必然是本人不重視財務。',
 'What alternative explanation is offered?|Selective preservation changed the surviving record.|The composer never had relatives.|All financial correspondence was public.|Biographers read every lost letter.|家屬依藝術形象偏好保存，影響留下的資料。',
 'Which evidence would be most informative?|Financial letters preserved independently in publishers’ archives|The number of modern concert attendees|A relative’s favorite composition|The size of the composer’s portrait|獨立出版社檔案可避開家屬選擇。',
 'The passage’s reasoning depends on what distinction?|A person’s concerns versus the contents of a filtered archive|Artistic skill versus musical notation|Old letters versus new envelopes|Publishing costs versus concert prices|人的關切與被篩選的存世資料不可直接等同。']);
c('high','P','An institutional reform can increase measured compliance without changing underlying practice if actors learn to satisfy the metric. This does not imply that every increase is illusory. Rather, the metric becomes a less independent indicator once rewards depend on it. Evaluating reform therefore requires evidence not generated by the same incentive structure.',[
 'What is the central methodological concern?|An incentivized metric may cease to independently track the intended behavior.|Every reform necessarily fails.|Rewards always reduce compliance.|No behavior can be measured.|獎勵與指標綁定可能改變指標的代表性。',
 'Why reject the claim that every increase is illusory?|The concern is a possible distortion, not a universal denial of improvement.|The author considers all metrics perfect.|The author has no concern about incentives.|The reform never changed rewards.|保留真改善可能，避免把風險過度一般化。',
 'What evidence would best address the concern?|Independent audits of actual practice not used in awarding rewards|A larger bonus for the same reported metric|More frequent publication of the same self-reports|A new name for the compliance score|不受同一獎勵結構直接驅動的查核，可提供獨立證據。',
 'The final recommendation follows from which premise?|The measurement process can be altered by the policy being evaluated.|Actors never respond to incentives.|All independent audits are infallible.|Rewards are absent from institutional reform.|政策可能改變測量所反映的行為，因此需外部證據。']);
c('high','A','The persistence of a category does not establish that its referents remain unchanged. Legal terms may survive while the practices they organize shift substantially. Conversely, terminological innovation can redescribe practices that are relatively stable. A history based only on vocabulary risks mistaking continuity of words for continuity of institutions, or novelty of words for institutional rupture.',[
 'What does the passage primarily argue?|Linguistic change and institutional change need not coincide.|Legal terms never change.|Institutional practices are determined entirely by dictionaries.|New vocabulary always marks revolution.|語詞與制度變遷不能簡單同步視之。',
 'What function does “Conversely” serve?|It introduces the reverse kind of mismatch.|It retracts the first claim.|It supplies an unrelated legal case.|It concludes that words are irrelevant.|先說詞舊制變，再說詞新制穩，為反向錯位。',
 'Which study would best follow the recommendation?|Track both legal language and the practices governed by it.|Date institutions solely by the first appearance of their names.|Ignore every document using old terminology.|Treat renamed offices as entirely new by definition.|需把文字證據與實際運作對照。',
 'Which assumption would the author reject?|Stable terminology guarantees stable institutional arrangements.|Words can persist.|Practices can change.|Historical categories can be studied.|保留詞彙不保證制度安排未變。']);
c('high','B','A critic argues that explaining a belief’s social origins discredits its truth. That inference requires an additional premise: the process producing the belief is unreliable with respect to the matter in question. A social explanation alone does not supply that premise; reliable inquiry is itself socially organized. Genealogy may motivate scrutiny without constituting refutation.',[
 'What gap does the passage identify?|Origins alone do not establish epistemic unreliability.|Social processes never influence beliefs.|All inherited beliefs are true.|Reliable inquiry occurs outside society.|指出社會起源到不真之間缺少可靠性前提。',
 'Why mention that reliable inquiry is socially organized?|To show that social causation is compatible with reliability|To prove every social belief is correct|To deny the existence of institutions|To replace evidence with consensus|社會形成不必然等於不可靠，有可靠探究作反例。',
 'What would make a genealogical challenge stronger?|Evidence that the belief-forming process systematically ignores truth-relevant information|Evidence that the belief has many supporters|Evidence that inquiry requires cooperation|Evidence that the belief has a name|要證明形成過程確實偏離真值相關資訊。',
 'What does the final sentence distinguish?|A reason to investigate from a conclusive disproof|Beliefs from all possible evidence|Private inquiry from public vocabulary|Old explanations from newly printed books|起源分析可促使檢視，不等同直接反駁。']);
