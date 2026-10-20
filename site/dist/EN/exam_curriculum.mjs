// Pure-English Comprehensive Curriculum, Teaching Frameworks, Word/Phrase Audio Sets & Exam Drills
// Covers TOEFL iBT, TOEIC, Digital SAT, GMAT Focus, and GRE General in 100% English.

export const examFrameworks = {
  toefl: {
    id: 'toefl',
    fullName: 'TOEFL iBT Academic English Mastery',
    cefr: 'CEFR B2 to C1+',
    constructEssence: 'TOEFL iBT measures how effectively you process, synthesize, and communicate university-level academic English. Under the 2026 updated format, success depends on rapid morphological recognition in reading, tracking rhetorical signposts in lectures, and synthesizing source claims with clear academic qualifications.',
    stepZeroProtocol: [
      'Step 0.1 — Classify the Academic Task: Before reading options, identify whether the question tests factual evidence, causal inference, rhetorical purpose, or lecture synthesis.',
      'Step 0.2 — Map Discourse Polarity & Modality: Circle hedging verbs (may, suggest, tend to, can) and contrast pivots (however, whereas, in contrast). Never upgrade a tentative academic claim into an absolute rule.',
      'Step 0.3 — Isolate the Structural Anchor: Locate the exact clause in the passage or lecture where the key concept is defined or contrasted.',
      'Step 0.4 — Eliminate Distortion Traps: Reject choices that confuse correlation with causation, reverse the sequence of events, or import extreme quantifiers (all, never, completely).'
    ],
    blueprintTable: [
      ['Reading: Complete the Words & Academic Passages', 'Morphological awareness, academic vocabulary in context, rhetorical function, and factual/inferential comprehension', 'Use prefix-root-suffix cues and surrounding clause grammar before scanning options', '35 mins · Adaptive modules'],
      ['Listening: Campus Conversations & Academic Lectures', 'Speaker purpose, pragmatic stance, causal mechanisms, and structural signposting', 'Track topic shifts ("Today, however, we will examine...") and contrast examples', '36 mins · Note key pivots'],
      ['Speaking: Independent & Integrated Academic Tasks', 'Clear position statement, lecture-reading synthesis, and coherent spoken delivery', 'State claim in sentence 1; link 2 specific details using cause-effect connectors', '16 mins · 4 tasks'],
      ['Writing: Integrated Synthesis & Academic Discussion', 'Contrasting lecture challenges against reading claims; contributing a reasoned post in a seminar discussion', 'Address how the lecturer casts doubt on each point; add a novel argument with a concrete example and limitation', '29 mins · 2 tasks']
    ],
    chapters: [
      {
        id: 'toefl-ch1',
        title: 'Chapter 1: Academic Cause-Effect Architecture & Hedging Precision',
        essence: 'University texts rarely make sweeping, unqualified claims. Instead, researchers distinguish between direct causes, contributing factors, and unverified hypotheses using precise hedging language.',
        formula: '[Phenomenon / Evidence] + [Hedging Verb: may / appears to / can] + [Causal Link: contribute to / result from / stem from] + [Qualified Outcome]',
        strategy: 'When answering inference or summary questions, match the degree of certainty in the original text. If the passage states that warmer water "can reduce" oxygen levels, eliminate any choice claiming it "eliminates" oxygen or "kills all aquatic life."',
        examples: [
          {
            sentence: 'While prolonged drought was the primary trigger, soil compaction significantly contributed to the decline in agricultural yield.',
            analysis: 'Distinguishes the primary trigger (drought) from a contributing factor (soil compaction) without claiming either acted alone.'
          },
          {
            sentence: 'The fossil record suggests that rapid cooling may have accelerated the extinction of shallow-marine species.',
            analysis: 'Notice the double hedge ("suggests", "may have accelerated") which frames the statement as an evidence-based hypothesis rather than an absolute certainty.'
          }
        ]
      },
      {
        id: 'toefl-ch2',
        title: 'Chapter 2: Lecture Signposts, Pragmatic Function & Speaker Stance',
        essence: 'In TOEFL Listening, professors organize complex theories using verbal signposts. Questions asking "Why does the professor mention X?" test the rhetorical role of an example, not the literal details of X.',
        formula: '[Background Assumption: "You may know..."] → [Pivot Signpost: "Today, however, we will examine..."] → [Core Mechanism] → [Illustrative Case: "Take X, for instance"]',
        strategy: 'Listen for the sentence immediately preceding an example. The example always serves to illustrate, support, or qualify the general claim stated right before it.',
        examples: [
          {
            sentence: 'Professor: "Many early geologists assumed the canyon formed gradually over millions of years. Yet sediment cores from the basin tell a very different story."',
            analysis: 'The opening sentence introduces a traditional assumption solely to contrast it with the new geological evidence.'
          },
          {
            sentence: 'Student: "Wait—so the sensor only records temperature at night?" Professor: "Well, think about what direct sunlight does to an unshielded thermometer."',
            analysis: 'Pragmatic function: The professor asks a rhetorical question to guide the student to deduce why daytime readings would be inaccurate.'
          }
        ]
      },
      {
        id: 'toefl-ch3',
        title: 'Chapter 3: Writing for an Academic Discussion & Integrated Synthesis',
        essence: 'In the Academic Discussion task, you must respond to a professor’s question and engage with two student posts within 10 minutes. High-scoring responses add a distinct perspective supported by a concrete mechanism and a realistic boundary condition.',
        formula: '[Direct Stance] + [Acknowledgement of Peer Post] + [New Mechanism: "Specifically, when X occurs..."] + [Concrete Illustration] + [Feasible Qualification]',
        strategy: 'Avoid merely repeating a classmate’s point in different words. Acknowledge one peer’s criterion, then introduce an overlooked dimension (such as long-term maintenance cost, equity of access, or ecological trade-offs).',
        examples: [
          {
            sentence: 'While I agree with Liam that municipal transit subsidies lower commuter expenses, the decisive benefit is reducing peak-hour congestion along industrial corridors.',
            analysis: 'Acknowledges a peer’s argument ("While I agree with Liam...") before pivoting to a distinct, high-impact economic rationale.'
          }
        ]
      }
    ],
    fatalTraps: [
      {
        trap: 'Trap 1: The Extreme Quantifier Upgrade',
        whyItFails: 'Replaces cautious academic verbs ("can affect", "often correlates with") with absolute words ("always", "completely", "proves", "impossible").',
        antidote: 'Verify whether the passage allows exceptions. In academic English, hedged statements are almost always safer and more accurate.'
      },
      {
        trap: 'Trap 2: The Literal Detail Distractor in Purpose Questions',
        whyItFails: 'Repeats exact nouns from an example instead of explaining why the author or lecturer introduced that example.',
        antidote: 'Ask: "What larger claim would weaken if this example were removed?" Choose the option that states that larger claim.'
      },
      {
        trap: 'Trap 3: Reversed Causal Direction',
        whyItFails: 'Uses the exact vocabulary from the paragraph but swaps the cause and the effect (e.g., claiming low oxygen causes water to warm).',
        antidote: 'Trace the directional connector: "A results from B" means B is the cause; "A results in B" means A is the cause.'
      },
      {
        trap: 'Trap 4: Minor Detail Masquerading as Summary Point',
        whyItFails: 'In Prose Summary questions, offers a factually true sentence that describes only a single footnote or minor illustration.',
        antidote: 'Select only statements that span an entire paragraph or represent a core thesis supported by multiple details.'
      }
    ],
    masterDemonstrations: [
      {
        title: 'Worked Demonstration 1: Academic Reading — Rhetorical Purpose',
        prompt: 'Passage excerpt: "Although early solar panels converted less than six percent of sunlight into electricity, specialized satellite programs funded their production because no alternative power source could operate reliably in orbit for years." Question: Why does the author mention satellite programs?',
        step0Thinking: 'Locate the clause before and after "satellite programs". The author contrasts low early efficiency (<6%) with a specific niche where reliability mattered more than cost or high conversion rates.',
        optionBreakdown: [
          'Option A: To explain how early solar technology survived commercially despite low efficiency. (Correct — connects the limitation to the specific demand that sustained production.)',
          'Option B: To prove that satellite engineers invented the first solar panels. (Incorrect — unsupported claim about invention.)',
          'Option C: To argue that modern solar panels are only useful in space exploration. (Incorrect — extreme restriction contradicted by "early".)'
        ],
        answer: 'To explain how early solar technology survived commercially despite low efficiency.',
        takeaway: 'Rhetorical purpose answers always bridge the local detail to the paragraph’s central logical tension.'
      },
      {
        title: 'Worked Demonstration 2: Lecture Synthesis — Qualification Tracking',
        prompt: 'Lecturer: "Planting urban trees certainly cools sidewalks through shade and evapotranspiration. However, in narrow street canyons with heavy diesel traffic, dense canopies can trap exhaust near ground level unless spacing is carefully planned." Question: What is the lecturer’s main point?',
        step0Thinking: 'The lecturer affirms a benefit ("certainly cools") and then introduces a conditional limitation ("However, in narrow street canyons... unless spacing is carefully planned").',
        optionBreakdown: [
          'Option A: Urban tree planting offers cooling benefits but requires layout planning to avoid trapping street-level pollutants. (Correct — preserves both the main benefit and the conditional qualification.)',
          'Option B: Cities should remove all trees from streets with motor vehicle traffic. (Incorrect — extreme overreaction.)',
          'Option C: Evapotranspiration is the only mechanism by which trees lower urban temperatures. (Incorrect — ignores shade and misses the main qualification.)'
        ],
        answer: 'Urban tree planting offers cooling benefits but requires layout planning to avoid trapping street-level pollutants.',
        takeaway: 'A complete academic summary retains both the thesis and its boundary condition.'
      }
    ],
    dialogue: {
      setting: 'University Environmental Science Office Hours: Designing a Field Study',
      lines: [
        { speaker: 'Student', text: 'Professor, my draft hypothesis states that urban wetlands eliminate all nitrogen runoff from nearby highways.', focusNote: 'Notice the overly absolute verb "eliminate all"—a classic target for academic refinement.' },
        { speaker: 'Professor', text: 'Your underlying mechanism is sound, Maya, but "eliminate all" is difficult to defend empirically. How might you qualify that claim?', focusNote: 'Uses "underlying mechanism" and "qualify that claim" to prompt precision.' },
        { speaker: 'Student', text: 'I could state that restored wetlands significantly mitigate nitrogen runoff, particularly during moderate rainfall events.', focusNote: 'Replaces absolute language with "significantly mitigate" and adds a boundary condition.' },
        { speaker: 'Professor', text: 'Much stronger. Now make sure your methodology controls for seasonal temperature shifts, since microbial activity drops in winter.', focusNote: 'Introduces "control for" to isolate a confounding variable.' }
      ]
    }
  },

  toeic: {
    id: 'toeic',
    fullName: 'TOEIC Global Workplace & Business Communication',
    cefr: 'CEFR B1 to C1',
    constructEssence: 'TOEIC evaluates real-world workplace proficiency across corporate correspondence, scheduling logistics, procurement, human resources, and client service. High efficiency requires instant grammatical slot analysis in Part 5/6 and rapid cross-referencing across multi-document chains in Part 7.',
    stepZeroProtocol: [
      'Step 0.1 — Identify the Action Trio (Part 1–4 & Part 7): In every workplace message, immediately lock onto (1) What action is requested, (2) Who is responsible, and (3) When the deadline falls.',
      'Step 0.2 — Apply the 3-Second Grammatical Slot Check (Part 5): Look at the words immediately before and after the blank before reading the options. If the options are four forms of the same root (efficient, efficiently, efficiency, efficiencies), solve purely by syntax.',
      'Step 0.3 — Track Schedule & Policy Revisions: Distinguish carefully between "postpone/reschedule" (delayed to a later time), "bring forward" (moved to an earlier time), and "cancel/waive" (dropped entirely).',
      'Step 0.4 — Cross-Reference Multi-Passage Anchors (Part 7): Find the shared invoice number, date, or policy clause that links an email to a schedule, notice, or billing statement.'
    ],
    blueprintTable: [
      ['Listening Parts 1–2: Photographs & Question-Response', 'Action verbs, spatial prepositions, and indirect workplace replies', 'Listen for the first wh-word; accept polite indirect answers ("I still need to check the inventory")', '45 mins total Listening'],
      ['Listening Parts 3–4: Workplace Conversations & Talks', 'Problem-solution chains, schedule updates, and speaker intent', 'Preview the 3 question stems before audio starts; track who volunteers for the next step', 'Includes visual graphic integration'],
      ['Reading Part 5: Incomplete Sentences (30 items)', 'Word family morphology (POS), business collocations, prepositions, and verb tense/voice', 'Spend max 20 seconds per item; use determiner-adjective-noun-adverb slot rules', '10 mins target pacing'],
      ['Reading Parts 6–7: Text Completion & Multi-Passages', 'Discourse transitions, sentence insertion, and double/triple passage synthesis', 'Link email requests to table rows or policy conditions to deduce unstated implications', '65 mins target pacing']
    ],
    chapters: [
      {
        id: 'toeic-ch1',
        title: 'Chapter 1: The 3-Second Word-Form (Morphology) Matrix for Part 5',
        essence: 'Nearly one-third of TOEIC Part 5 items test suffixes within a single word family. You do not need to translate the entire sentence if you identify the syntactic slot of the blank.',
        formula: '[Determiner: the / a / our] + [Adverb (-ly)] + [Adjective (-able / -ive / -ent)] + [Noun (-tion / -ment / -ance / -cy)] + [Transitive Verb + Object] + [Manner Adverb (-ly)]',
        strategy: 'Look right after the blank first. If a noun follows immediately, the blank likely needs an adjective. If a complete verb-object phrase precedes the blank, choose an adverb ending in -ly to modify how the action was performed.',
        examples: [
          {
            sentence: 'The logistics coordinator reviewed the revised shipment schedule thoroughly before approving the dispatch.',
            analysis: '"revised" (participle adjective) modifies "shipment schedule" (noun phrase); "thoroughly" (adverb) modifies the verb "reviewed".'
          },
          {
            sentence: 'All reimbursement requests require written approval from the department supervisor.',
            analysis: 'After the adjective "written" and before the prepositional phrase "from...", the slot requires the uncountable noun "approval".'
          }
        ]
      },
      {
        id: 'toeic-ch2',
        title: 'Chapter 2: Corporate Requests, Deadlines & Polite Conditional Framing',
        essence: 'Business emails balance politeness with unmistakable deadlines. Recognizing modal requests and time markers prevents costly misinterpretations.',
        formula: '[Context / Update] + [Polite Request: "Could you please..." / "We would appreciate it if..."] + [Action Verb: confirm / submit / arrange] + [Time Boundary: by / until / prior to]',
        strategy: 'Distinguish "by Thursday" (one-time completion deadline: no later than Thursday) from "until Thursday" (continuous state lasting up to Thursday, such as "The main lobby will remain closed until Thursday").',
        examples: [
          {
            sentence: 'Please submit your travel expense receipts by Friday at 5:00 p.m. so accounting can process reimbursements next week.',
            analysis: '"by Friday" sets the completion deadline; "so" introduces the operational purpose.'
          },
          {
            sentence: 'Should you encounter any discrepancies in the attached invoice, please notify our billing department within five business days.',
            analysis: 'Inverted conditional ("Should you encounter..." = "If you should encounter...") is a staple of formal TOEIC correspondence.'
          }
        ]
      },
      {
        id: 'toeic-ch3',
        title: 'Chapter 3: Multi-Passage Cross-Referencing & Service Resolution',
        essence: 'In Part 7 double and triple passages, the correct answer to at least two questions requires combining a detail from Passage 1 (e.g., an order date or membership tier) with a rule in Passage 2 (e.g., a return policy or fee table).',
        formula: '[Passage 1 Fact: Customer ordered Item #B40 on March 2] + [Passage 2 Rule: Orders placed before March 5 qualify for free express replacement] → [Synthesized Answer]',
        strategy: 'Never look for a single sentence that states the final answer directly in cross-reference items. Find the bridge entity (person, model code, date, or room capacity) and trace it across both texts.',
        examples: [
          {
            sentence: 'Email: "We expect 45 attendees for the regional sales workshop." Venue Chart: "Conference Room B (Max 40) · Grand Ballroom (Max 100) · Executive Suite (Max 60)."',
            analysis: 'Cross-referencing 45 attendees against room capacities eliminates Room B and points to the Executive Suite as the most appropriate mid-sized room.'
          }
        ]
      }
    ],
    fatalTraps: [
      {
        trap: 'Trap 1: The Same-Word Echo in Listening',
        whyItFails: 'In Part 2 and Part 3, wrong choices often repeat a prominent noun or verb from the audio ("shipment", "schedule") with the wrong action or subject.',
        antidote: 'Focus on semantic paraphrases (e.g., audio says "moved to 10 a.m." → correct option says "Its time changed" or "It was rescheduled").'
      },
      {
        trap: 'Trap 2: Confusing "By" vs. "Until" and "For" vs. "During"',
        whyItFails: 'Selects "until Friday" for a one-off submission deadline or "during three years" for a duration.',
        antidote: 'Use "by + point in time" for deadlines; "until + point in time" for ongoing states; "for + number/duration"; "during + named period (during the conference)".'
      },
      {
        trap: 'Trap 3: Role Reversal in Workplace Service Dialogues',
        whyItFails: 'Confuses what the customer will do (e.g., confirm the delivery address) with what the agent will do (e.g., arrange a replacement shipment).',
        antidote: 'Note the pronoun and speaker turn: "I can arrange..." spoken by the support agent means the agent performs that action.'
      },
      {
        trap: 'Trap 4: Overlooking Exceptions in Footnotes & Asterisks',
        whyItFails: 'In Part 7 schedules and invoices, an asterisk (*No refunds on custom-printed items) reverses the general policy stated in the main paragraph.',
        antidote: 'Always scan the bottom note of any table, coupon, or schedule before confirming a policy question.'
      }
    ],
    masterDemonstrations: [
      {
        title: 'Worked Demonstration 1: Part 5 — Syntactic Slot & Word Form',
        prompt: 'Sentence: "The software update will allow the customer support team to process inquiries much more _______." Options: (A) efficient (B) efficiently (C) efficiency (D) efficiencies',
        step0Thinking: 'The clause "to process inquiries" is already grammatically complete (infinitive verb + direct object). "much more _______" modifies how the team processes inquiries (modifying the verb "process").',
        optionBreakdown: [
          'Option A (efficient): Adjective — modifies nouns, not the verb phrase "process inquiries".',
          'Option B (efficiently): Adverb — correctly modifies the verb "process" after comparative "more".',
          'Option C/D (efficiency/efficiencies): Nouns — cannot follow "process inquiries much more".'
        ],
        answer: '(B) efficiently',
        takeaway: 'When a verb + object is already complete, use a manner adverb (-ly) to describe how the action is carried out.'
      },
      {
        title: 'Worked Demonstration 2: Part 7 — Email Action & Deadline Extraction',
        prompt: 'Email: "Dear Mr. Kim, Attached is the draft contract for the Apex Logistics partnership. Please send any revisions to Maya Lin by Thursday afternoon so she can finalize the document before Friday’s board meeting." Question: What is Mr. Kim asked to do?',
        step0Thinking: 'Separate background ("Attached is the draft contract") and future outcome ("so she can finalize... before Friday") from the direct request ("Please send any revisions to Maya Lin by Thursday afternoon").',
        optionBreakdown: [
          'Option A: Chair the board meeting on Friday. (Incorrect — Friday is when the finalized document is needed.)',
          'Option B: Submit contract changes no later than Thursday afternoon. (Correct — paraphrases "send any revisions... by Thursday afternoon".)',
          'Option C: Draft a new agreement for Apex Logistics. (Incorrect — the draft is already attached.)'
        ],
        answer: 'Submit contract changes no later than Thursday afternoon.',
        takeaway: 'Translate "by [time]" into "no later than [time]" and match the exact recipient of the request.'
      }
    ],
    dialogue: {
      setting: 'Supply Chain & Client Support Call: Resolving a Delayed Shipment',
      lines: [
        { speaker: 'Client', text: 'Hello, I am calling to check on Order #4082. Our assembly line needs those components by tomorrow morning.', focusNote: 'Uses "check on" (inquire about progress) and "by tomorrow morning" (deadline).' },
        { speaker: 'Account Manager', text: 'Let me look up your tracking record. Unfortunately, the freight carrier postponed the delivery due to severe weather.', focusNote: 'Identifies the problem: carrier postponed delivery.' },
        { speaker: 'Client', text: 'That is a serious issue for our production schedule. Is there any way to expedite a replacement from your local warehouse?', focusNote: 'Asks for a solution: expedite a replacement.' },
        { speaker: 'Account Manager', text: 'Yes, we have the items in stock locally. I will arrange a courier dispatch this afternoon at no extra charge. Please confirm your receiving dock hours.', focusNote: 'States the agent’s action ("arrange a courier dispatch") and requests confirmation from the client.' }
      ]
    }
  },

  sat: {
    id: 'sat',
    fullName: 'Digital SAT Reading & Writing Precision',
    cefr: 'CEFR B2+ to C2',
    constructEssence: 'The Digital SAT Reading and Writing section uses concise single-paragraph passages (25–150 words), each paired with a single targeted question. It rewards rigorous context-clue prediction, strict adherence to textual scope, mastery of logical transitions, and command of Standard English clause boundaries.',
    stepZeroProtocol: [
      'Step 0.1 — Predict Before Peeking (Words in Context): Cover the four choices. Locate the structural pivot (although, colon, semicolon, rather than) and write your own plain-English word for the blank.',
      'Step 0.2 — Enforce the Scope Boundary (Inferences & Claims): Verify that every word in your chosen inference is warranted by the passage. Reject choices that generalize from a specific experiment ("in this study") to a universal law ("all species always").',
      'Step 0.3 — Diagnose Clause Completeness (Boundaries): Identify whether the text before and after the blank are independent clauses (Subject + Finite Verb). Never join two independent clauses with a comma alone (comma splice).',
      'Step 0.4 — Classify Inter-Sentence Logic (Transitions): Read the sentence before and the sentence after the transition blank. Label the relationship as Contrast, Cause-Effect, Addition, or Exemplification before looking at the options.'
    ],
    blueprintTable: [
      ['Craft & Structure: Words in Context & Text Structure', 'High-utility academic words, tone polarity, and overall rhetorical architecture', 'Match the blank to its mirror phrase across a contrast or colon cue', 'Approx. 28% of questions'],
      ['Information & Ideas: Central Ideas, Inferences & Evidence', 'Logical completion of claims, textual/quantitative evidence evaluation', 'Keep the scope narrow; match the exact variable measured in the graph or study', 'Approx. 26% of questions'],
      ['Standard English Conventions: Boundaries & Form/Sense', 'Independent/dependent clauses, semicolons, colons, dashes, subject-verb agreement, and modifiers', 'Strip out prepositional phrases and appositives to expose the core subject and finite verb', 'Approx. 26% of questions'],
      ['Expression of Ideas: Transitions & Rhetorical Synthesis', 'Inter-sentence logical connectors and goal-directed synthesis of bulleted research notes', 'Satisfy every part of the prompt’s stated rhetorical goal without checking the bullet notes unless needed', 'Approx. 20% of questions']
    ],
    chapters: [
      {
        id: 'sat-ch1',
        title: 'Chapter 1: Words in Context — Structural Mirrors & Tone Polarity',
        essence: 'Digital SAT vocabulary items never test obscure definitions in isolation. Every passage embeds a structural mirror—a restatement or a contrast—that defines the blank internally.',
        formula: '[Concession Clause: "Although X was promising (+)"] , [Main Clause: "later trials produced _____ (-) results"]',
        strategy: 'Find the trigger word (although, despite, unlike, colon, or semicolon). If the trigger signals contrast, assign opposite polarity (+/-) to the two clauses and match the exact semantic dimension (e.g., size, certainty, originality).',
        examples: [
          {
            sentence: 'Although early prototypes yielded promising efficiency gains, subsequent field trials produced negligible improvements under real-world weather conditions.',
            analysis: '"Although" contrasts "promising efficiency gains" (+) with "negligible improvements" (-, too small to matter).'
          },
          {
            sentence: 'Far from being an arbitrary artistic choice, the architect’s asymmetrical window placement was calibrated to maximize winter sunlight.',
            analysis: '"Far from being..." negates "arbitrary" (random/unplanned) and mirrors "calibrated to maximize..." (deliberate/precise).'
          }
        ]
      },
      {
        id: 'sat-ch2',
        title: 'Chapter 2: Command of Evidence & Narrow-Scope Inferences',
        essence: 'In SAT Inference and Evidence questions, the passage provides a chain of premises and asks you to complete the final sentence or choose a finding that supports/undermines a hypothesis.',
        formula: '[Premise 1: Observation in Context A] + [Premise 2: Mechanism or Condition] → [Supported Conclusion strictly bounded by Context A]',
        strategy: 'Treat the passage like a legal contract. If a study examined seedlings grown beside a window versus a shaded corner, the warranted conclusion applies to light conditions in that study—not to all plant species across all climates.',
        examples: [
          {
            sentence: 'Researchers found that participants who took handwritten notes recalled conceptual relationships better than those who typed verbatim transcripts, suggesting that selective summarization during note-taking aids conceptual encoding.',
            analysis: 'The inference connects the difference between the two groups (selective handwriting vs. verbatim typing) to conceptual encoding without claiming keyboards should never be used.'
          }
        ]
      },
      {
        id: 'sat-ch3',
        title: 'Chapter 3: Standard English Clause Boundaries & Punctuation Calculus',
        essence: 'Boundary questions test how independent clauses (IC) and dependent clauses/phrases (DC) are joined. Once you label the clauses on either side of the punctuation mark, the rule is mechanical.',
        formula: 'IC + . + IC  |  IC + ; + IC  |  IC + , + FANBOYS (for, and, nor, but, or, yet, so) + IC  |  DC + , + IC',
        strategy: 'Note that conjunctive adverbs like "however", "therefore", "moreover", and "consequently" are NOT coordinating conjunctions (FANBOYS). Joining two independent clauses with ", however," is a comma splice; you must use "; however," or ". However,".',
        examples: [
          {
            sentence: 'The initial experiment ended on Tuesday; the researchers analyzed the telemetry data the following morning.',
            analysis: 'Two independent clauses ("The initial experiment ended..." and "the researchers analyzed...") are properly joined by a semicolon.'
          },
          {
            sentence: 'Having completed its orbital calibration, the satellite transmitted its first high-resolution atmospheric images.',
            analysis: 'Dangling modifier check: The introductory participial phrase ("Having completed...") must immediately precede the noun that performed the action ("the satellite").'
          }
        ]
      }
    ],
    fatalTraps: [
      {
        trap: 'Trap 1: The Comma Splice with "However" or "Therefore"',
        whyItFails: 'Places a comma before and after "however" between two complete independent clauses (e.g., "The route is short, however, it is steep").',
        antidote: 'If both sides can stand alone as complete sentences, require a period or semicolon on one side: "The route is short; however, it is steep."'
      },
      {
        trap: 'Trap 2: The Scope Overreach in Inference Questions',
        whyItFails: 'Transforms a specific experimental observation into an unrestricted generalization ("All plants...", "Never occurs...", "Proves beyond doubt").',
        antidote: 'Prefer hedged, sample-specific language ("suggests that in this study...", "can influence...", "is consistent with...").'
      },
      {
        trap: 'Trap 3: Secondary-Meaning Trap in Words in Context',
        whyItFails: 'Chooses an option based on a casual everyday association rather than the precise academic meaning required by the sentence’s logic.',
        antidote: 'Test your choice by substituting its definition directly into the sentence and checking whether both clauses cohere.'
      },
      {
        trap: 'Trap 4: Half-Right Rhetorical Synthesis Choices',
        whyItFails: 'Uses accurate facts from the bulleted notes but fails to fulfill the specific goal requested in the question stem (e.g., states a similarity when the prompt asks to emphasize a difference).',
        antidote: 'Filter the four options solely against the prompt’s goal first; usually only one option actually performs the requested rhetorical task.'
      }
    ],
    masterDemonstrations: [
      {
        title: 'Worked Demonstration 1: Words in Context — Contrast Mirror',
        prompt: 'Passage: "Although the first phase of the restoration project yielded promising results, the second phase produced ______ improvements in water clarity, prompting engineers to redesign the filtration membrane." Options: (A) substantial (B) negligible (C) consistent (D) innovative',
        step0Thinking: '1. "Although" contrasts Phase 1 ("promising results") with Phase 2. 2. Phase 2 prompted engineers to "redesign the filtration membrane", confirming that Phase 2 improvements were too small to matter.',
        optionBreakdown: [
          'Option A (substantial): Means large/important — contradicts both "Although" and the need to redesign.',
          'Option B (negligible): Means so small as to be of little importance — fits the contrast and explains the redesign.',
          'Option C (consistent): Does not explain why engineers had to redesign the membrane.',
          'Option D (innovative): Positive tone that clashes with the concession structure.'
        ],
        answer: '(B) negligible',
        takeaway: 'Combine the structural pivot ("Although") with the causal consequence ("prompting engineers to redesign") to lock in the meaning.'
      },
      {
        title: 'Worked Demonstration 2: Standard English Conventions — Clause Boundaries',
        prompt: 'Passage: "Marine biologists tracked the migration of leatherback turtles across the Pacific _____ the telemetry tags revealed that the turtles consistently followed cold-water nutrient upwellings." Options: (A) Ocean, (B) Ocean; (C) Ocean, while (D) Ocean and',
        step0Thinking: 'Clause 1: "Marine biologists tracked the migration of leatherback turtles across the Pacific Ocean" (Independent Clause). Clause 2: "the telemetry tags revealed that..." (Independent Clause). No contrast exists between tracking the turtles and what the tags revealed.',
        optionBreakdown: [
          'Option A (Ocean,): Creates a comma splice between two independent clauses.',
          'Option B (Ocean;): Properly joins two closely related independent clauses with a semicolon.',
          'Option C (Ocean, while): Introduces an unintended contrast/simultaneity where Clause 2 is actually the result of tracking.',
          'Option D (Ocean and): Missing the required comma before coordinating conjunction "and" joining two independent clauses.'
        ],
        answer: '(B) Ocean;',
        takeaway: 'Two independent clauses with a direct logical connection are cleanly joined by a semicolon.'
      }
    ],
    dialogue: {
      setting: 'Undergraduate Research Writing Seminar: Refining Claims & Boundaries',
      lines: [
        { speaker: 'Instructor', text: 'Look at your second sentence: "The sample size was small, however, the correlation was statistically significant." How should we punctuate that boundary?', focusNote: 'Highlights a classic comma splice around the conjunctive adverb "however".' },
        { speaker: 'Student', text: 'Since both halves are independent clauses, I should replace the first comma with a semicolon: "The sample size was small; however, the correlation was statistically significant."', focusNote: 'Applies the IC + ; + conjunctive adverb + , + IC boundary rule.' },
        { speaker: 'Instructor', text: 'Exactly. Now check your conclusion in the final sentence. Does your data warrant claiming that this method works across all urban ecosystems?', focusNote: 'Uses "warrant" and challenges an overly broad scope.' },
        { speaker: 'Student', text: 'Not yet. I will qualify the scope to state that the findings are consistent with our hypothesis within temperate coastal cities.', focusNote: 'Uses "qualify", "scope", and "consistent with" to keep the inference rigorous.' }
      ]
    }
  },

  gmat: {
    id: 'gmat',
    fullName: 'GMAT Focus Critical Reasoning & Analytical Logic',
    cefr: 'CEFR C1 to C2',
    constructEssence: 'GMAT Focus Verbal & Data Insights evaluate executive-level critical reasoning. Every argument consists of factual premises and a conclusion that leaps across an unstated gap. Mastery requires isolating the exact conclusion, exposing unstated necessary assumptions via the Negation Test, separating correlation from causation, and distinguishing rates from totals.',
    stepZeroProtocol: [
      'Step 0.1 — Deconstruct Premise vs. Conclusion: Find the author’s main conclusion (often introduced by therefore, thus, predicts that, should). Everything else is premise or background.',
      'Step 0.2 — Spot the Logical Gap (Term Shift): Compare the key terms in the premise (e.g., "longer store hours → more customers → higher revenue") with the terms in the conclusion (e.g., "higher profit"). The gap is the missing variable (Costs!).',
      'Step 0.3 — Apply the Negation Test (Assumption Questions): A necessary assumption is a condition the argument CANNOT survive without. Negate the candidate choice: if negating it destroys the conclusion, it is the correct assumption.',
      'Step 0.4 — Hunt for Confounding Factors (Causal Arguments): Whenever an argument claims "Event A occurred, followed by Outcome B; therefore A caused B," check whether a third variable (Option C, such as a price cut) occurred simultaneously.'
    ],
    blueprintTable: [
      ['Find the Assumption (Necessary Condition)', 'Identifying the unstated link required for the premises to support the conclusion', 'Bridge the term shift between premise and conclusion; verify with the Negation Test', 'Core CR question type'],
      ['Strengthen / Weaken / Evaluate the Argument', 'Assessing how new evidence alters the credibility of a business prediction or causal claim', 'Show that an alternative explanation is present (Weaken) or ruled out/controlled for (Strengthen)', 'Highest frequency in CR'],
      ['Analyze Argument Structure (Boldface Roles)', 'Determining the logical role of two boldfaced statements within an argument', 'Label each boldface as: Main Conclusion, Intermediate Conclusion, Supporting Premise, or Counter-Premise', 'Tests structural metacognition'],
      ['Numerical Reasoning: Rates, Proportions & Totals', 'Distinguishing percentages/rates from absolute totals and percentage points from relative change', 'Never infer a larger total from a higher percentage unless the denominator (base size) is known', 'Bridges CR and Data Insights']
    ],
    chapters: [
      {
        id: 'gmat-ch1',
        title: 'Chapter 1: Profit vs. Revenue & The Assumption Negation Test',
        essence: 'Business plans frequently assume that increasing one favorable input (customers, sales volume, or productivity rate) guarantees a net gain (profit or cost savings). Uncovering the unstated cost or baseline condition is the key to GMAT assumption questions.',
        formula: 'Profit = Revenue − Overhead/Operating Costs  |  Net Savings = Gross Reduction − Implementation Expense',
        strategy: 'To test whether Choice X is a necessary assumption, logically negate X (e.g., "Extra revenue exceeds extra costs" → "Extra revenue does NOT exceed extra costs"). If the negated statement makes the conclusion collapse, Choice X is 100% necessary.',
        examples: [
          {
            sentence: 'Premise: Extending store hours by three hours each night will attract more evening shoppers and increase sales revenue. Conclusion: Therefore, the store’s monthly profit will rise.',
            analysis: 'Missing Assumption: The additional overhead and staffing costs of staying open three extra hours will not exceed the added sales revenue.'
          },
          {
            sentence: 'Premise: Switching to automated warehouse sorting reduces labor hours per package by 30%. Conclusion: The company will break even on the upgrade within one year.',
            analysis: 'Missing Assumption: Maintenance and financing costs for the automated system do not offset the labor savings during the first year.'
          }
        ]
      },
      {
        id: 'gmat-ch2',
        title: 'Chapter 2: Correlation, Causation & Competing Explanations',
        essence: 'When two variables move together (correlation), GMAT arguments often jump to a single causal explanation. Evaluating such arguments requires testing for confounding factors, reverse causation, or selection bias.',
        formula: '[Observed Correlation: A and B rose together] → [Claimed Cause: A caused B]  vs.  [Confounding Factor C: C occurred at the same time and caused B]',
        strategy: 'To weaken a causal claim, introduce a plausible alternative explanation (e.g., a simultaneous price discount). To strengthen or evaluate it, compare groups that control for the confounding factor (e.g., similar stores that kept prices unchanged while varying advertising).',
        examples: [
          {
            sentence: 'Sales rose 18% in the month after the new television advertisement aired; however, the retailer also cut prices by 15% during the same month.',
            analysis: 'The simultaneous price reduction is a confounding factor that provides a competing explanation for the sales increase.'
          }
        ]
      },
      {
        id: 'gmat-ch3',
        title: 'Chapter 3: Rates, Proportions, Denominators & Percentage Points',
        essence: 'Many flawed arguments confuse a relative rate (%) with an absolute quantity (#), or confuse a change in percentage points with relative percentage growth.',
        formula: 'Total = Rate (%) × Denominator (Base)  |  Percentage-Point Change = New% − Old%  |  Relative Change = (New − Old) / Old',
        strategy: 'Whenever an argument compares two percentages (e.g., "Team A converts 20% of leads while Team B converts 15%"), ask immediately: "What is the denominator for each group?" A smaller percentage of a much larger base yields a larger absolute total.',
        examples: [
          {
            sentence: 'Team A converts 20% of 100 leads (20 sales), whereas Team B converts 15% of 200 leads (30 sales).',
            analysis: 'Team A has the higher conversion rate (by 5 percentage points), but Team B generates 50% more total sales (30 vs. 20).'
          }
        ]
      }
    ],
    fatalTraps: [
      {
        trap: 'Trap 1: Confusing Revenue with Profit',
        whyItFails: 'Assumes that selling more units or bringing in more revenue automatically increases profit, ignoring unit cost or overhead.',
        antidote: 'Always check whether the premise measures revenue/volume while the conclusion claims profit/net margin.'
      },
      {
        trap: 'Trap 2: Attacking a Premise Instead of the Logical Link',
        whyItFails: 'Tries to weaken an argument by denying a stated factual premise rather than showing why the conclusion does not follow from the premises.',
        antidote: 'Accept stated premises as given; target the unstated bridge between the premise and the conclusion.'
      },
      {
        trap: 'Trap 3: The Irrelevant Comparison (No Control Group)',
        whyItFails: 'In Evaluate/Strengthen questions, offers data from a single group or a completely unrelated industry without controlling for the competing variable.',
        antidote: 'Select the option that compares two otherwise comparable groups where only the variable of interest differs.'
      },
      {
        trap: 'Trap 4: Percentage vs. Absolute Number Confusion',
        whyItFails: 'Concludes that a rise from 15% to 20% is "5% relative growth" or that a higher market-share percentage guarantees higher total unit sales in a shrinking market.',
        antidote: 'Check the base (denominator) and distinguish percentage-point differences (20% − 15% = 5 percentage points) from relative growth ((20 − 15)/15 = 33.3%).'
      }
    ],
    masterDemonstrations: [
      {
        title: 'Worked Demonstration 1: Necessary Assumption & The Negation Test',
        prompt: 'Argument: "A retail store plans to extend its closing time from 8 p.m. to 11 p.m. Because evening commuters will have more time to shop after work, the store manager predicts that the store’s monthly profit will increase." Question: Which assumption is required by the argument?',
        step0Thinking: 'Premise: Longer hours → more evening shoppers (Revenue). Conclusion: Monthly profit will increase (Revenue − Costs). Gap: Do the added sales exceed the added operating/staffing overhead of staying open 3 extra hours?',
        optionBreakdown: [
          'Option A: Extra revenue from the extended hours will exceed the extra operating and staffing costs. (Correct — Negation Test: If extra revenue does NOT exceed extra costs, monthly profit cannot increase.)',
          'Option B: Every evening commuter in the neighborhood will shop at the store. (Incorrect — extreme quantifier "Every"; the store only needs enough extra revenue to beat extra costs.)',
          'Option C: Competing stores in the district close at 8 p.m. (Incorrect — helpful, but not strictly required for profit to rise.)'
        ],
        answer: 'Extra revenue from the extended hours will exceed the extra operating and staffing costs.',
        takeaway: 'Necessary assumptions do not require 100% of customers to act; they require the net balance (benefits minus costs) to remain positive.'
      },
      {
        title: 'Worked Demonstration 2: Evaluating Competing Causal Explanations',
        prompt: 'Argument: "Last month, a software firm launched a new social-media ad campaign, and monthly subscriptions rose by 25%. During the same month, however, the firm also reduced its subscription price by 20%. The marketing director claims the ad campaign was the primary driver of the increase." Question: Which comparison would be most useful in evaluating the director’s claim?',
        step0Thinking: 'We have two simultaneous changes: (1) New ad campaign and (2) 20% price reduction (confounding factor). To isolate the effect of the ad campaign, we must hold price constant.',
        optionBreakdown: [
          'Option A: Subscription growth in comparable markets where the firm ran the new ad campaign without reducing prices. (Correct — controls for the price discount to isolate the advertising effect.)',
          'Option B: Total advertising expenditure across the entire software industry last year. (Incorrect — irrelevant industry total.)',
          'Option C: Subscription numbers on a single Tuesday before the campaign started. (Incorrect — unrepresentative single-day snapshot.)'
        ],
        answer: 'Subscription growth in comparable markets where the firm ran the new ad campaign without reducing prices.',
        takeaway: 'To evaluate a causal claim in the presence of a confounding factor, hold the confounder constant across comparable groups.'
      }
    ],
    dialogue: {
      setting: 'Corporate Strategy Committee: Evaluating a Remote-Work Cost Proposal',
      lines: [
        { speaker: 'Operations VP', text: 'Our premise is straightforward: allowing 60% of staff to work remotely will reduce daily office occupancy by half. Therefore, our annual facility overhead will drop.', focusNote: 'Presents a premise (lower occupancy) and a conclusion (lower facility overhead).' },
        { speaker: 'Finance Director', text: 'That conclusion depends on a critical assumption about our commercial lease. Can we actually reduce our rented floor space next quarter?', focusNote: 'Identifies the missing link between occupancy and actual lease expense.' },
        { speaker: 'Operations VP', text: 'Good point. Our current lease is fixed for two more years, though we can sublease unused floors if we consolidate workstations.', focusNote: 'Addresses whether fixed rental costs weaken the savings prediction.' },
        { speaker: 'Finance Director', text: 'Let us evaluate net savings by comparing sublease revenue against the IT security overhead required for remote staff.', focusNote: 'Applies cost-benefit outweigh logic to test whether the plan breaks even.' }
      ]
    }
  },

  gre: {
    id: 'gre',
    fullName: 'GRE General Verbal Reasoning & Analytical Writing',
    cefr: 'CEFR C1+ to C2',
    constructEssence: 'GRE Verbal Reasoning tests how rigorously you decode complex sentence logic, nuanced academic vocabulary, and multi-layered author stances. Success requires tracking concession-contrast pivots in Text Completion, demanding both contextual fit and synonymous meaning in Sentence Equivalence, and distinguishing reported views from the author’s own qualified judgment in Reading Comprehension.',
    stepZeroProtocol: [
      'Step 0.1 — Map the Structural Pivot & Semantic Polarity (Text Completion): Before looking at any vocabulary choices, circle the logic triggers (although, despite, whereas, precisely because, far from). Determine what idea the blank must express.',
      'Step 0.2 — Separate Distinct Dimensions of a Target: A single sentence can praise one aspect of a theory ("its originality") while criticizing another aspect ("skeptical of its practical value"). Track which aspect each clause modifies.',
      'Step 0.3 — Enforce the Twin-Constraint Rule (Sentence Equivalence): In 6-choose-2 Sentence Equivalence items, the two correct words must BOTH (1) fit the context of the sentence and (2) produce sentences of equivalent meaning. A synonym pair that contradicts the sentence’s logic is a trap.',
      'Step 0.4 — Distinguish Reported Views from Author Stance (Reading Comprehension): When a passage begins with "Some historians regard X as an unqualified success. Yet...", attribute the first view to those historians and track how the author qualifies or challenges it.'
    ],
    blueprintTable: [
      ['Text Completion (1-, 2-, and 3-Blank Items)', 'Deductive sentence logic, concession/support pivots, and precise academic register', 'Solve the blank with the clearest textual anchor first; verify that multi-blank choices cohere as a unified claim', 'No partial credit on multi-blank items'],
      ['Sentence Equivalence (6-Choose-2 Items)', 'Contextual equivalence and nuanced synonym discrimination (e.g., concise vs. evasive)', 'Predict the meaning from context first, then select the two choices that preserve that exact meaning and tone', 'Both selections must be correct'],
      ['Reading Comprehension: Author Stance & Function', 'Distinguishing partial critique from total rejection; analyzing logical role of sentences', 'Pay close attention to qualifiers ("unqualified", "uneven", "some", "on balance")', 'Short and medium academic passages'],
      ['Analytical Writing: Analyze an Issue', 'Constructing a nuanced thesis, developing reasoned support, and addressing counterarguments', 'Avoid black-and-white extremes; establish clear criteria and explain how a trade-off or limitation refines your stance', '30 mins · 1 analytical essay']
    ],
    chapters: [
      {
        id: 'gre-ch1',
        title: 'Chapter 1: Concession Pivots & Multi-Aspect Polarity in Text Completion',
        essence: 'GRE sentences rarely say "X is good, so X is good." Instead, they use concession markers (although, despite, while, granted that) to balance two competing qualities of the same subject—such as theoretical elegance versus practical feasibility.',
        formula: '[Concession Marker: Although / Despite] + [Subject Aspect A: praised originality (+)] , [Subject Aspect B: remained skeptical of practical value (-)]',
        strategy: 'Never match a blank merely by associating it with a nearby noun. Identify whether the clause concedes a merit or asserts a reservation, then select the word that matches that exact evaluative stance.',
        examples: [
          {
            sentence: 'Although the critic praised the method’s conceptual originality, she remained skeptical of its practical value under field conditions.',
            analysis: '"praised... originality" (+) and "skeptical of... practical value" (-) coexist coherently because they evaluate two distinct criteria.'
          },
          {
            sentence: 'Despite the proposal’s innovative architecture, budget constraints rendered the full-scale deployment untenable.',
            analysis: '"Despite" pivots from a positive attribute ("innovative") to a negative feasibility judgment ("untenable" — incapable of being defended or maintained).'
          }
        ]
      },
      {
        id: 'gre-ch2',
        title: 'Chapter 2: Sentence Equivalence — Meaning vs. Connotation Traps',
        essence: 'In Sentence Equivalence, test writers include words that look vaguely similar (e.g., "laconic", "concise", "evasive") where two words share a neutral core meaning ("using few words") while a third smuggles in an unsupported motive ("avoiding the truth").',
        formula: 'Valid SE Pair = [Fits Sentence Context Cue] + [Produces Equivalent Sentence Meaning] + [No Unsupported Connotation Added]',
        strategy: 'Read the defining participial phrase or colon explanation in the sentence (e.g., ", answering complex questions in only a few words"). Match only what the text proves ("brief/concise/laconic") and reject choices that add unstated intent ("evasive/secretive").',
        examples: [
          {
            sentence: 'The speaker was remarkably [laconic / concise], answering even the most intricate policy questions in only a few clear words.',
            analysis: 'Both "laconic" and "concise" preserve the meaning supported by "in only a few clear words", whereas "evasive" adds an unsupported claim of avoidance.'
          }
        ]
      },
      {
        id: 'gre-ch3',
        title: 'Chapter 3: Author Stance, Nuanced Qualification & Analytical Counterarguments',
        essence: 'In GRE Reading Comprehension and Analytical Writing, sophisticated arguments rarely reject an opposing view 100%. Instead, authors challenge "unqualified" claims while acknowledging partial merits or uneven outcomes.',
        formula: '[Reported View: "Some scholars claim X is an unqualified success"] → [Author’s Pivot: "Yet its benefits were uneven..."] → [Nuanced Stance: Qualified critique, not total denial]',
        strategy: 'When asked for the author’s stance, eliminate choices that say the author considers the policy "a complete failure" or "entirely worthless." Choose the option that captures the specific reservation (e.g., "beneficial in some respects, but limited or uneven in distribution").',
        examples: [
          {
            sentence: 'Some historians regard the infrastructure program as an unqualified triumph; yet rural districts received minimal funding, leaving regional disparities intact.',
            analysis: 'The author challenges the label "unqualified triumph" by pointing out uneven distribution, without denying that urban districts benefited.'
          }
        ]
      }
    ],
    fatalTraps: [
      {
        trap: 'Trap 1: The Synonym Pair That Contradicts Context (Sentence Equivalence)',
        whyItFails: 'Test writers often plant two pairs of synonyms among the six choices—one pair meaning "brief/concise" and another pair meaning "wordy/verbose". Picking a synonym pair without checking the sentence’s logic loses the point.',
        antidote: 'Solve the sentence blank first using context clues, then find the synonym pair that matches your prediction.'
      },
      {
        trap: 'Trap 2: Smuggled Connotation ("Concise" vs. "Evasive")',
        whyItFails: 'Chooses a word that partially overlaps with the clue ("short answer") but adds an unstated moral or psychological motive ("trying to hide something").',
        antidote: 'Verify that every nuance of the word is supported by explicit words in the sentence.'
      },
      {
        trap: 'Trap 3: Confusing a Reported View with the Author’s Own Stance',
        whyItFails: 'Assumes the first sentence of a passage ("Many critics argue that...") represents the author’s conclusion.',
        antidote: 'Track attribution verbs ("regard", "claim", "contend") and wait for the author’s evaluative pivot ("Yet", "However", "This view overlooks...").'
      },
      {
        trap: 'Trap 4: Treating Partial Criticism as Total Rejection',
        whyItFails: 'When an author criticizes a theory as "incomplete" or "uneven", wrong choices claim the author finds the theory "wholly baseless" or "completely false".',
        antidote: 'Distinguish between rejecting an "unqualified" claim and denying every benefit.'
      }
    ],
    masterDemonstrations: [
      {
        title: 'Worked Demonstration 1: Sentence Equivalence (Select Two Choices)',
        prompt: 'Sentence: "Although the committee’s initial report was criticized for being overly verbose, the revised executive summary was praised for its _______, presenting all key findings on a single page." Select TWO choices that fit the sentence and produce equivalent meanings: (A) ambiguity (B) brevity (C) conciseness (D) evasiveness (E) redundancy (F) candor',
        step0Thinking: '1. "Although" contrasts the initial report ("overly verbose" = too wordy) with the revised summary ("presenting all key findings on a single page"). 2. The blank requires a noun meaning "shortness/clear economy of words".',
        optionBreakdown: [
          'Choices (B) brevity and (C) conciseness: Both mean economy of words and fit "presenting all key findings on a single page".',
          'Choice (E) redundancy: Matches "verbose" rather than contrasting with it.',
          'Choice (D) evasiveness: Implies dodging the issue, which contradicts "presenting all key findings".',
          'Choices (A) ambiguity and (F) candor: Unrelated to word count.'
        ],
        answer: '(B) brevity and (C) conciseness',
        takeaway: 'In Sentence Equivalence, both selected words must satisfy the contrast clue AND produce equivalent sentences.'
      },
      {
        title: 'Worked Demonstration 2: Reading Comprehension — Author Stance',
        prompt: 'Passage: "Some economists describe the micro-grant initiative as an unqualified success because average household income rose in participating towns. Yet a closer look reveals that nearly all gains accrued to households that already owned retail equipment, while landless laborers saw little change." Question: Which statement best describes the author’s stance toward the micro-grant initiative?',
        step0Thinking: '1. Reported view: "Some economists" call it an "unqualified success". 2. Author’s pivot: "Yet a closer look reveals..." showing uneven distribution of benefits. 3. The author acknowledges gains occurred but refutes the claim of "unqualified" success.',
        optionBreakdown: [
          'Option A: It produced real economic gains, but its benefits were distributed unevenly across groups. (Correct — captures both the acknowledged income rise and the author’s qualification.)',
          'Option B: It failed to increase income for any household in the participating towns. (Incorrect — contradicts "average household income rose".)',
          'Option C: It benefited landless laborers more than equipment owners. (Incorrect — directly reverses the passage.)'
        ],
        answer: 'It produced real economic gains, but its benefits were distributed unevenly across groups.',
        takeaway: 'Track how an author qualifies a broad claim rather than assuming a binary all-good or all-bad stance.'
      }
    ],
    dialogue: {
      setting: 'Graduate Humanities Colloquium: Evaluating Historiographical Claims',
      lines: [
        { speaker: 'Moderator', text: 'In her monograph, Dr. Vance concedes that the reform expanded literacy, yet she remains skeptical of claims that it equalized civic participation.', focusNote: 'Demonstrates "concede" (+ aspect) paired with "skeptical of" (- aspect).' },
        { speaker: 'Panelist', text: 'Right—she draws a sharp distinction between formal legal access and practical economic feasibility for rural citizens.', focusNote: 'Uses "draw a distinction" and "feasibility" to explain the nuanced critique.' },
        { speaker: 'Moderator', text: 'So would you say her stance renders the traditional "unqualified triumph" narrative untenable?', focusNote: 'Uses "stance", "unqualified", and "untenable" in an academic synthesis.' },
        { speaker: 'Panelist', text: 'Yes. On balance, her archival evidence warrants a more nuanced account that weighs urban gains against rural trade-offs.', focusNote: 'Uses "on balance", "warrant", "nuanced", and "trade-off".' }
      ]
    }
  }
};

// Curated High-Frequency Vocabulary & Academic/Business Phrase Sets (100% English: Term, IPA, POS, English Definition, Thinking Clue, Example)
export const examWordAndPhraseSets = [
  {
    id: 'toefl-phrases',
    track: 'toefl',
    kind: 'phrase',
    title: 'TOEFL Academic Cause, Evidence & Lecture Signpost Phrases',
    subtitle: 'High-utility multi-word expressions for academic reading, lecture listening, and integrated writing.',
    items: [
      ['attribute to', '/əˈtrɪb.juːt tuː/', 'v. phr.', 'to explain an outcome as the result of a specific cause or source', 'Think: Effect is attributed TO Cause (passive: be attributed to).', 'Paleoclimatologists attribute the sudden glacial retreat to shifts in ocean circulation.'],
      ['contribute to', '/kənˈtrɪb.juːt tuː/', 'v. phr.', 'to act as one of several factors that help bring about a result', 'Think: Partial cause, not the sole cause; followed by a noun or gerund (-ing).', 'Deforestation and prolonged drought both contributed to regional soil erosion.'],
      ['in contrast to', '/ɪn ˈkɑːn.træst tuː/', 'prep. phr.', 'used to highlight a clear difference between two studies, species, or regions', 'Think: Signals an immediate polarity or feature reversal between two items.', 'In contrast to shallow coral reefs, deep-sea vents rely on chemosynthesis rather than sunlight.'],
      ['take into account', '/teɪk ˈɪn.tuː əˈkaʊnt/', 'v. phr.', 'to consider a relevant variable or limitation when forming a judgment', 'Think: Essential for academic writing when addressing a boundary condition.', 'Any valid model of urban cooling must take into account local wind corridors.'],
      ['in other words', '/ɪn ˈʌð.ɚ wɝːdz/', 'discourse phr.', 'used by lecturers to restate a technical concept in simpler or more direct terms', 'Think: Listen closely right after this phrase—the main point is being paraphrased.', 'The membrane is selectively permeable; in other words, it allows water molecules to pass while blocking salt ions.'],
      ['cast doubt on', '/kæst daʊt ɑːn/', 'v. phr.', 'to introduce evidence or reasoning that weakens the credibility of a claim', 'Think: Core verb phrase for TOEFL Integrated Writing lecture-vs-reading synthesis.', 'The lecturer casts doubt on the reading’s hypothesis by citing recent radiometric dating.'],
      ['stem from', '/stɛm frʌm/', 'v. phr.', 'to originate in or be caused by an underlying condition', 'Think: Outcome stems FROM underlying root cause.', 'Many early navigation errors stemmed from inaccurate timekeeping at sea.'],
      ['shed light on', '/ʃɛd laɪt ɑːn/', 'v. phr.', 'to clarify or provide new information that helps explain a complex phenomenon', 'Think: Used when a study or artifact reveals previously unknown mechanisms.', 'Ice-core samples from Antarctica have shed light on ancient atmospheric carbon levels.']
    ]
  },
  {
    id: 'toefl-vocab',
    track: 'toefl',
    kind: 'vocab',
    title: 'TOEFL High-Frequency Academic Research Vocabulary',
    subtitle: 'Essential single-word terms for scientific mechanisms, hypotheses, and scholarly arguments.',
    items: [
      ['consequence', '/ˈkɑːn.sə.kwens/', 'n.', 'a result or effect of an earlier action, process, or environmental change', 'Think: Comes AFTER the cause; often paired with "unintended" or "direct".', 'A major consequence of wetland drainage was the loss of natural flood buffering.'],
      ['underlying', '/ˌʌn.dɚˈlaɪ.ɪŋ/', 'adj.', 'existing beneath the surface appearance and forming the fundamental root cause', 'Think: Contrasts surface symptoms with deep structural causes.', 'Symptom relief is temporary unless clinicians address the underlying metabolic disorder.'],
      ['hypothesis', '/haɪˈpɑː.θə.sɪs/', 'n.', 'a proposed scientific explanation that can be tested through observation or experiment', 'Think: Not yet proven fact; requires empirical testing.', 'The field team designed a controlled experiment to test their pollination hypothesis.'],
      ['qualify', '/ˈkwɑː.lə.faɪ/', 'v.', 'to make a claim less absolute by adding conditions, exceptions, or limitations', 'Think: In academic English, "qualify a statement" means to narrow or nuance it.', 'The author qualifies her endorsement of solar thermal plants by noting their high water usage.'],
      ['adaptation', '/ˌæd.əpˈteɪ.ʃən/', 'n.', 'a structural or behavioral trait that helps an organism survive in its environment', 'Think: Evolved solution to an environmental pressure.', 'Succulent stems are a classic adaptation to arid desert climates.'],
      ['feasible', '/ˈfiː.zə.bəl/', 'adj.', 'capable of being carried out practically with available resources and technology', 'Think: Bridges theoretical possibility with practical execution.', 'Recycling lithium batteries at scale is now both technically and economically feasible.'],
      ['empirical', '/ɪmˈpɪr.ɪ.kəl/', 'adj.', 'based on direct observation, measurement, or experimental evidence rather than pure theory', 'Think: Empirical data = measured evidence in the real world.', 'The physicist demanded empirical verification before accepting the mathematical model.'],
      ['mitigate', '/ˈmɪt.ə.ɡeɪt/', 'v.', 'to make a negative impact, risk, or problem less severe or damaging', 'Think: Does not eliminate 100%, but reduces severity.', 'Permeable pavement helps mitigate flash flooding in densely paved districts.']
    ]
  },
  {
    id: 'toeic-phrases',
    track: 'toeic',
    kind: 'phrase',
    title: 'TOEIC Workplace Correspondence, Scheduling & Service Phrases',
    subtitle: 'Core business collocations and phrasal verbs tested in TOEIC emails, notices, and dialogues.',
    items: [
      ['follow up', '/ˈfɑː.loʊ ʌp/', 'v. phr.', 'to take further action or check progress after an initial meeting, email, or order', 'Think:Followed by "with [person]" or "on [matter]".', 'I will follow up with the regional distributor tomorrow morning regarding our bulk order.'],
      ['make arrangements', '/meɪk əˈreɪndʒ.mənts/', 'v. phr.', 'to organize the practical details required for travel, a meeting, or an event', 'Think: Always plural "arrangements" when prepping logistics.', 'Our administrative assistant will make arrangements for your hotel and airport transfer.'],
      ['check on', '/tʃɛk ɑːn/', 'v. phr.', 'to investigate or verify the current status, progress, or condition of something', 'Think: Frequent in customer service calls about delayed deliveries.', 'Let me check on the status of your replacement shipment right away.'],
      ['prior to', '/ˈpraɪ.ɚ tuː/', 'prep. phr.', 'before a specified date, event, or deadline in formal workplace rules', 'Think: Formal TOEIC equivalent of "before".', 'All visitors must register at the security desk prior to entering the research laboratory.'],
      ['in accordance with', '/ɪn əˈkɔːr.dəns wɪð/', 'prep. phr.', 'following or obeying a specific company policy, contract clause, or safety regulation', 'Think: Links an action to an official rule or guideline.', 'Reimbursements are issued in accordance with the updated corporate travel policy.'],
      ['subject to', '/ˈsʌb.dʒɪkt tuː/', 'adj. phr.', 'dependent on a condition or likely to experience changes or approval', 'Think: "Schedule is subject to change" / "subject to managerial approval".', 'All promotional discounts are subject to availability while current inventory lasts.'],
      ['comply with', '/kəmˈplaɪ wɪð/', 'v. phr.', 'to act in agreement with an official requirement, safety standard, or deadline', 'Think: Always takes preposition "with"; noun form is "compliance with".', 'Every manufacturing facility must comply with international environmental standards.'],
      ['free of charge', '/friː əv tʃɑːrdʒ/', 'adv./adj. phr.', 'at no financial cost to the customer; complimentary', 'Think: Paraphrases "at no extra cost" or "complimentary" in Part 7.', 'Warranty repairs are performed free of charge within the first twenty-four months.']
    ]
  },
  {
    id: 'toeic-vocab',
    track: 'toeic',
    kind: 'vocab',
    title: 'TOEIC Part 5–7 High-Frequency Business & Word-Form Vocabulary',
    subtitle: 'Essential corporate vocabulary for contracts, scheduling, operations, and word-family syntax.',
    items: [
      ['proposal', '/prəˈpoʊ.zəl/', 'n.', 'a formal written plan or suggestion submitted for review and approval', 'Think: Watch out for the noun suffix "-al" (propose v. → proposal n.).', 'The board approved the engineering team’s proposal to upgrade the server room.'],
      ['reschedule', '/ˌriːˈskedʒ.uːl/', 'v.', 'to change the planned time or date of a meeting, flight, or training session', 'Think: Distinct from "cancel"—the event still happens at a new time.', 'We had to reschedule the product demonstration because the keynote speaker’s flight was delayed.'],
      ['postpone', '/poʊstˈpoʊn/', 'v.', 'to delay an event or launch until a later time or date', 'Think: Paraphrases "put off" or "move back to a later date".', 'Management decided to postpone the software rollout until quality testing is complete.'],
      ['efficiently', '/ɪˈfɪʃ.ənt.li/', 'adv.', 'in a well-organized manner that achieves maximum productivity with minimum wasted effort', 'Think: Manner adverb (-ly) modifying action verbs like "operate" or "process".', 'The new automated ticketing system routes customer inquiries much more efficiently.'],
      ['reliable', '/rɪˈlaɪ.ə.bəl/', 'adj.', 'consistently dependable in quality, performance, or punctuality', 'Think: Adjective (-able) modifying nouns like "supplier" or "equipment".', 'Securing a reliable component supplier is essential for uninterrupted factory output.'],
      ['discrepancy', '/dɪˈskrep.ən.si/', 'n.', 'an unexpected difference or mismatch between two financial records or inventory counts', 'Think: Classic Part 7 billing/invoice problem word.', 'The auditor noticed a minor discrepancy between the purchase order and the final invoice.'],
      ['reimbursement', '/ˌriː.ɪmˈbɝːs.mənt/', 'n.', 'repayment of money that an employee or client has already spent for official business', 'Think: Requires receipts; paired with "travel expenses".', 'Employees must attach original receipts when submitting a request for travel reimbursement.'],
      ['tentative', '/ˈten.tə.tɪv/', 'adj.', 'not yet final or fully confirmed; subject to future adjustment', 'Think: "tentative schedule" = draft schedule that may still change.', 'We have set a tentative launch date for November 15, pending final safety inspection.']
    ]
  },
  {
    id: 'sat-phrases',
    track: 'sat',
    kind: 'phrase',
    title: 'Digital SAT Logical Transitions, Evidence & Context Phrases',
    subtitle: 'Precision transitions and relational phrases tested across SAT Craft, Structure, and Expression of Ideas.',
    items: [
      ['consistent with', '/kənˈsɪs.tənt wɪð/', 'adj. phr.', 'in agreement with or logically fitting existing data, predictions, or hypotheses', 'Think: Standard SAT phrase for findings that support a hypothesis.', 'The observed rise in pollinator diversity is consistent with the researchers’ habitat-corridor model.'],
      ['account for', '/əˈkaʊnt fɔːr/', 'v. phr.', 'to explain the cause of a phenomenon OR to make up a specified proportion of a whole', 'Think: Dual academic meaning: (1) explain why, (2) comprise a percentage.', 'Differences in soil salinity account for the variation in seedling height across the two plots.'],
      ['for instance', '/fɔːr ˈɪn.stəns/', 'transition phr.', 'used to introduce a specific concrete example that illustrates a preceding general claim', 'Think: Must follow a broader claim that the second sentence exemplifies.', 'Many alpine plants have evolved heat-retaining structures; cushion plants, for instance, grow in dense low mats.'],
      ['in contrast', '/ɪn ˈkɑːn.træst/', 'transition phr.', 'used to set up a direct opposition between the preceding claim and the current clause', 'Think: Equivalent to "however" or "conversely" when contrasting two subjects.', 'Early telegraph cables carried only a few words per minute; modern fiber-optic lines, in contrast, transmit terabits per second.'],
      ['far from', '/fɑːr frʌm/', 'prep. phr.', 'used to emphasize that the true situation is the exact opposite of what follows', 'Think: Polarity inverter ("Far from being random, X was carefully planned").', 'Far from being a passive barrier, the cell membrane actively regulates nutrient transport.'],
      ['call into question', '/kɔːl ˈɪn.tuː ˈkwes.tʃən/', 'v. phr.', 'to raise serious doubts about the validity of a traditional assumption or theory', 'Think: Paraphrases "undermine" or "challenge" in SAT Reading.', 'The discovery of Bronze Age glass beads in northern Europe called into question earlier models of isolated trade networks.']
    ]
  },
  {
    id: 'sat-vocab',
    track: 'sat',
    kind: 'vocab',
    title: 'Digital SAT Words in Context & Inference Core Vocabulary',
    subtitle: 'High-leverage academic words testing tone, degree, scope, and evidentiary support.',
    items: [
      ['negligible', '/ˈneɡ.lɪ.dʒə.bəl/', 'adj.', 'so small or unimportant as to be not worth considering; insignificant', 'Think: Contrasts directly with "substantial" or "significant".', 'Because the temperature fluctuation was negligible, it had no measurable effect on the reaction rate.'],
      ['substantial', '/səbˈstæn.ʃəl/', 'adj.', 'of considerable importance, size, or worth; large in degree', 'Think: Strong positive magnitude without being an extreme 100% quantifier.', 'The second conservation policy produced a substantial recovery in migratory bird populations.'],
      ['ambiguous', '/æmˈbɪɡ.ju.əs/', 'adj.', 'open to more than one interpretation; not having one clear, definite meaning', 'Think: Root "ambi-" (both ways); contrasts with "explicit" or "unambiguous".', 'Because the survey question was ambiguous, respondents interpreted it in two incompatible ways.'],
      ['undermine', '/ˌʌn.dɚˈmaɪn/', 'v.', 'to weaken the evidentiary support, authority, or credibility of a claim or system', 'Think: Core SAT/GMAT verb for counter-evidence.', 'Uncontrolled differences in watering schedules undermine the study’s conclusion about fertilizer efficacy.'],
      ['warrant', '/ˈwɔːr.ənt/', 'v.', 'to provide adequate logical justification or empirical grounds for a conclusion', 'Think: Ask "Do the data warrant this broad claim?"', 'A single preliminary trial does not warrant a universal change in clinical guidelines.'],
      ['scope', '/skoʊp/', 'n.', 'the extent, range, or boundary of subject matter that a study or claim validly covers', 'Think: Narrow scope = safe inference; overbroad scope = trap.', 'Predicting long-term evolutionary changes lies beyond the scope of this three-month observation.'],
      ['generalize', '/ˈdʒen.ər.əl.aɪz/', 'v.', 'to infer a broad rule from specific, limited cases', 'Think: Over-generalizing beyond the sample is the #1 SAT inference trap.', 'Researchers cautioned against generalizing the findings from laboratory mice to wild mammal populations.'],
      ['consequently', '/ˈkɑːn.sə.kwent.li/', 'adv.', 'as a logical result or effect of what was stated in the preceding clause', 'Think: Conjunctive adverb; requires a semicolon or period when joining two independent clauses.', 'The estuary’s salinity rose sharply; consequently, freshwater reed beds retreated upstream.']
    ]
  },
  {
    id: 'gmat-phrases',
    track: 'gmat',
    kind: 'phrase',
    title: 'GMAT Critical Reasoning & Quantitative Logic Phrases',
    subtitle: 'Analytical phrases for causal evaluation, confounding factors, cost-benefit balance, and rate comparisons.',
    items: [
      ['control for', '/kənˈtroʊl fɔːr/', 'v. phr.', 'to hold a secondary variable constant when comparing groups so its effect does not distort the result', 'Think: Gold-standard phrase for strengthening or evaluating causal studies.', 'To isolate the effect of the training program, the analysis must control for prior sales experience.'],
      ['alternative explanation', '/ɑːlˈtɝː.nə.tɪv ˌek.spləˈneɪ.ʃən/', 'n. phr.', 'a competing plausible cause that could account for the observed outcome instead of the author’s claimed cause', 'Think: Introducing an alternative explanation weakens a causal argument; ruling it out strengthens it.', 'A simultaneous drop in fuel prices provides an alternative explanation for the airline’s higher quarterly profit.'],
      ['confounding factor', '/kənˈfaʊn.dɪŋ ˈfæk.tɚ/', 'n. phr.', 'an outside variable that changes alongside the studied variables and makes causation hard to determine', 'Think: Whenever two things happen at once, the second change is a confounding factor.', 'Seasonal holiday demand acted as a confounding factor during the December marketing trial.'],
      ['break even', '/breɪk ˈiː.vən/', 'v. phr.', 'to reach a point in business where total revenue exactly equals total costs, resulting in neither profit nor loss', 'Think: Revenue = Total Cost (Fixed Overhead + Variable Cost).', 'At current subscription prices, the streaming platform needs forty thousand active users to break even.'],
      ['percentage point', '/pɚˈsen.tɪdʒ pɔɪnt/', 'n. phr.', 'the arithmetic unit for the simple difference between two percentages', 'Think: 15% to 20% = 5 percentage points (whereas relative change is 5/15 = 33.3%).', 'The firm’s operating margin rose by five percentage points, from fifteen percent to twenty percent.'],
      ['relative change', '/ˈrel.ə.tɪv tʃeɪndʒ/', 'n. phr.', 'the amount of increase or decrease divided by the original starting value', 'Think: Depends entirely on the baseline denominator.', 'Because the baseline was small, an increase of ten units represented a large relative change.']
    ]
  },
  {
    id: 'gmat-vocab',
    track: 'gmat',
    kind: 'vocab',
    title: 'GMAT Argument Structure, Financial & Causal Vocabulary',
    subtitle: 'Core terms for dissecting premises, assumptions, revenue-profit gaps, and quantitative proportions.',
    items: [
      ['assumption', '/əˈsʌmp.ʃən/', 'n.', 'an unstated premise that must be true in order for the argument’s evidence to support its conclusion', 'Think: Test with the Negation Test—if negating it breaks the argument, it is necessary.', 'The expansion plan relies on the unstated assumption that raw material costs will remain stable.'],
      ['outweigh', '/ˌaʊtˈweɪ/', 'v.', 'to be greater, heavier, or more significant than a competing cost, risk, or disadvantage', 'Think: Net benefit requires gains to outweigh costs.', 'For the longer store hours to increase profit, added sales revenue must outweigh extra staffing expenses.'],
      ['overhead', '/ˈoʊ.vɚ.hed/', 'n.', 'ongoing fixed expenses of operating a business, such as rent, utilities, and administrative salaries', 'Think: Even if unit sales rise, high overhead can reduce net profit.', 'Consolidating two regional warehouses reduced the company’s annual facility overhead by twelve percent.'],
      ['correlation', '/ˌkɔːr.əˈleɪ.ʃən/', 'n.', 'a statistical pattern in which two variables change together, without necessarily proving one causes the other', 'Think: Correlation ≠ Causation.', 'The study found a strong positive correlation between employee sleep duration and quality-control accuracy.'],
      ['premise', '/ˈprem.ɪs/', 'n.', 'a stated piece of evidence or factual claim offered as the basis for a conclusion', 'Think: In Boldface questions, distinguish supporting premises from the main conclusion.', 'The analyst’s premise concerns declining birth rates, whereas her conclusion predicts lower school enrollment.'],
      ['denominator', '/dɪˈnɑː.mə.neɪ.tɚ/', 'n.', 'the base total below the line in a fraction or rate calculation', 'Think: Never compare two rates without checking the size of their denominators.', 'In conversion rate calculations, the total number of customer leads serves as the denominator.'],
      ['proportion', '/prəˈpɔːr.ʃən/', 'n.', 'a part, share, or number considered in comparative relation to a whole', 'Think: A higher proportion (%) does not guarantee a larger absolute number if the whole shrinks.', 'Although electric models represented a higher proportion of sales in June, total vehicle sales were lower.'],
      ['comparable', '/ˈkɑːm.pər.ə.bəl/', 'adj.', 'similar enough in relevant characteristics to permit a fair, valid comparison', 'Think: Control groups must be comparable in baseline traits.', 'Researchers compared retention rates across two comparable branches that differed only in shift scheduling.']
    ]
  },
  {
    id: 'gre-phrases',
    track: 'gre',
    kind: 'phrase',
    title: 'GRE Analytical Stance, Concession & Equivalence Phrases',
    subtitle: 'High-precision expressions for multi-blank logic, author stance evaluation, and analytical writing.',
    items: [
      ['draw a distinction', '/drɔː ə dɪˈstɪŋk.ʃən/', 'v. phr.', 'to differentiate clearly between two related concepts that are often confused', 'Think: Essential in GRE passages separating partial critique from total rejection.', 'The historian draws a distinction between the policy’s rhetorical aims and its uneven regional effects.'],
      ['on balance', '/ɑːn ˈbæl.əns/', 'adv. phr.', 'after weighing all relevant advantages, limitations, and counterarguments together', 'Think: Signals a nuanced, well-judged final conclusion in Analytical Writing.', 'On balance, the archival evidence supports a cautious revision of the traditional timeline.'],
      ['in context', '/ɪn ˈkɑːn.tekst/', 'prep. phr.', 'considered together with the surrounding words, logic, and rhetorical purpose', 'Think: A word’s meaning in context overrides casual dictionary associations.', 'Interpreted in context, the reviewer’s remark expresses ironic skepticism rather than praise.'],
      ['far from being', '/fɑːr frʌm ˈbiː.ɪŋ/', 'prep. phr.', 'used to reject a plausible misconception and assert the opposite quality', 'Think: Strong GRE contrast structure ("Far from being derivative, the work is original").', 'Far from being an uncritical admirer, the biographer documents several of the diplomat’s miscalculations.'],
      ['at odds with', '/æt ɑːdz wɪð/', 'adj. phr.', 'in conflict or disagreement with established evidence, expectations, or principles', 'Think: Signals negative polarity / contradiction between two claims.', 'The newly excavated inscriptions are at odds with the assumption that the settlement was abandoned early.'],
      ['to the extent that', '/tuː ðə ɪkˈstent ðæt/', 'conj. phr.', 'insofar as; used to specify the exact degree or condition under which a claim holds true', 'Think: Classic GRE analytical qualifier.', 'Public subsidies are effective to the extent that they target underserved transit corridors.']
    ]
  },
  {
    id: 'gre-vocab',
    track: 'gre',
    kind: 'vocab',
    title: 'GRE Verbal Reasoning & Twin-Synonym Core Vocabulary',
    subtitle: 'Precision academic vocabulary for Text Completion, Sentence Equivalence, and Author Stance.',
    items: [
      ['skeptical', '/ˈskep.tɪ.kəl/', 'adj.', 'inclined to question or doubt the truth, validity, or feasibility of a claim', 'Think: Expresses reasoned doubt, not blind hostility.', 'While praising the model’s mathematical elegance, reviewers remained skeptical of its predictive power.'],
      ['pragmatic', '/præɡˈmæt.ɪk/', 'adj.', 'dealing with problems sensibly and realistically based on practical circumstances rather than abstract theory', 'Think: Contrasts with "idealistic" or "purely theoretical".', 'Faced with a strict municipal budget, the council adopted a pragmatic phased-renovation plan.'],
      ['tenable', '/ˈten.ə.bəl/', 'adj.', 'capable of being maintained or defended against logical objection or empirical counter-evidence', 'Think: Often negated as "no longer tenable" or "untenable" after new findings emerge.', 'Once telescope data revealed the planet’s retrograde orbit, the earlier formation hypothesis was no longer tenable.'],
      ['laconic', '/ləˈkɑː.nɪk/', 'adj.', 'using very few words; expressing much in a brief, terse manner', 'Think: Twin synonym in GRE Sentence Equivalence with "concise", "succinct", "pithy".', 'Known for her laconic style, the director answered the three-page inquiry with a single sentence.'],
      ['concise', '/kənˈsaɪs/', 'adj.', 'giving a lot of clear information in a few words; brief but comprehensive', 'Think: Preserves the neutral/positive sense of brevity without implying evasiveness.', 'A concise abstract states the research question, methodology, and principal finding in under two hundred words.'],
      ['evasive', '/ɪˈveɪ.sɪv/', 'adj.', 'deliberately avoiding a direct answer, commitment, or disclosure', 'Think: Trap distractor for "laconic/concise"—adds an unsupported motive of avoidance.', 'When pressed about the budget shortfall, the spokesperson gave an evasive reply that ignored the audit.'],
      ['unqualified', '/ʌnˈkwɑː.lə.faɪd/', 'adj.', 'without reservation, restriction, or limitation; complete and absolute', 'Think: Secondary academic meaning! "An unqualified success" = a 100% total success (NOT lacking credentials).', 'Because rural clinics lacked cold-chain storage, the vaccine rollout was not an unqualified success.'],
      ['nuanced', '/ˈnuː.ɑːnst/', 'adj.', 'characterized by subtle distinctions, qualifications, and sensitivity to complex context', 'Think: The hallmark of top-scoring GRE Analytical Writing arguments.', 'Rather than issuing a blanket condemnation, the essay offers a nuanced assessment of industrial automation.']
    ]
  }
];

// Interactive Exam Subtopic Drill Suite (100% English, includes Single-Choice & GRE 6-Choose-2 Sentence Equivalence)
export const examSubtopicDrills = [
  // TOEFL Drills
  {
    id: 'drill-toefl-1',
    track: 'toefl',
    subtopic: 'Academic Reading: Cause & Hedging',
    type: 'single',
    stem: 'Passage excerpt: "Although volcanic aerosols can temporarily cool global surface temperatures by reflecting incoming solar radiation, these particles typically settle out of the stratosphere within two to three years." Which statement is best supported by the excerpt?',
    options: [
      'Volcanic aerosols can produce a short-term cooling effect rather than permanent climate cooling.',
      'Volcanic eruptions permanently eliminate solar radiation from reaching the Earth’s surface.',
      'Stratospheric aerosols are the sole cause of long-term ice ages.'
    ],
    answer: 'Volcanic aerosols can produce a short-term cooling effect rather than permanent climate cooling.',
    step0Hint: 'Check the hedging verb ("can temporarily cool") and the time boundary ("settle out... within two to three years").',
    explanation: 'The passage states that aerosols "can temporarily cool" temperatures and settle out within 2–3 years, supporting a short-term effect and ruling out permanent or sole-cause claims.'
  },
  {
    id: 'drill-toefl-2',
    track: 'toefl',
    subtopic: 'Lecture Listening: Speaker Purpose & Signposts',
    type: 'single',
    stem: 'Professor: "You have all read how honeybees use the waggle dance to indicate the distance and direction of flowers. Today, however, we will examine how wind speed alters the way bees calibrate that distance signal." What is the main purpose of the lecture?',
    options: [
      'To explain how environmental wind conditions affect honeybee distance signaling',
      'To prove that honeybees never use visual landmarks when foraging',
      'To review the basic anatomy of honeybee wings'
    ],
    answer: 'To explain how environmental wind conditions affect honeybee distance signaling',
    step0Hint: 'Locate the explicit lecture signpost: "Today, however, we will examine..."',
    explanation: '"You have all read..." introduces familiar background, while "Today, however, we will examine..." explicitly announces the lecture’s main purpose.'
  },
  {
    id: 'drill-toefl-3',
    track: 'toefl',
    subtopic: 'Academic Discussion: Argument & Qualification',
    type: 'single',
    stem: 'A student is writing a post for an Academic Discussion on whether universities should replace all printed textbooks with digital editions. Which sentence best develops a supported position while addressing a realistic limitation?',
    options: [
      'Digital textbooks reduce student expenses and allow instant keyword searches, though universities should provide loaner tablets so students without personal devices are not disadvantaged.',
      'Digital textbooks are modern and popular, so every student in every course will automatically earn higher grades.',
      'Printed books have been used for centuries, and libraries have many shelves.'
    ],
    answer: 'Digital textbooks reduce student expenses and allow instant keyword searches, though universities should provide loaner tablets so students without personal devices are not disadvantaged.',
    step0Hint: 'Look for the choice that combines concrete benefits with a practical limitation/qualification ("though universities should...").',
    explanation: 'Strong TOEFL academic writing states clear benefits ("reduce expenses", "instant keyword searches") and addresses a practical equity limitation ("loaner tablets").'
  },

  // TOEIC Drills
  {
    id: 'drill-toeic-1',
    track: 'toeic',
    subtopic: 'Part 5: Word Form & Syntactic Slot',
    type: 'single',
    stem: 'Before the new assembly line can begin operating, the safety inspector must grant official _______ of the ventilation system.',
    options: [
      'approval',
      'approve',
      'approvingly',
      'approved'
    ],
    answer: 'approval',
    step0Hint: 'Look at the slot between the adjective "official" and the preposition "of". What part of speech is required as the direct object of "grant"?',
    explanation: 'After the transitive verb "grant" and the adjective "official", and before "of", the sentence requires the noun "approval".'
  },
  {
    id: 'drill-toeic-2',
    track: 'toeic',
    subtopic: 'Part 5: Time Prepositions & Deadlines',
    type: 'single',
    stem: 'All department heads are required to submit their quarterly budget proposals _______ Thursday at 4:00 p.m. so finance can compile the master report on Friday.',
    options: [
      'by',
      'until',
      'during',
      'since'
    ],
    answer: 'by',
    step0Hint: 'Is submitting a budget proposal a one-time completion deadline ("no later than") or a continuous state lasting up to Thursday?',
    explanation: '"By" marks the latest acceptable deadline for a one-time action ("no later than Thursday at 4:00 p.m."), whereas "until" describes a state that continues up to a time.'
  },
  {
    id: 'drill-toeic-3',
    track: 'toeic',
    subtopic: 'Part 7: Email & Schedule Cross-Reference',
    type: 'single',
    stem: 'Email: "Our client delegation from Osaka will arrive at 10:15 a.m. on Tuesday. Please book a meeting room that seats at least 18 people and has video-conferencing equipment." Room Chart: "Room 201 (12 seats, Video) · Room 305 (20 seats, Audio only) · Room 410 (24 seats, Video)." Which room should be booked?',
    options: [
      'Room 410',
      'Room 201',
      'Room 305'
    ],
    answer: 'Room 410',
    step0Hint: 'Cross-reference BOTH requirements from the email (≥18 seats AND video-conferencing) against the chart.',
    explanation: 'Room 201 is too small (12 < 18), and Room 305 lacks video-conferencing. Only Room 410 satisfies both criteria (24 seats + Video).'
  },

  // SAT Drills
  {
    id: 'drill-sat-1',
    track: 'sat',
    subtopic: 'Craft & Structure: Words in Context',
    type: 'single',
    stem: 'Far from being _______, the weaver’s geometric patterns followed strict mathematical ratios passed down through generations of guild apprentices.',
    options: [
      'arbitrary',
      'substantial',
      'deliberate',
      'consistent'
    ],
    answer: 'arbitrary',
    step0Hint: '"Far from being _______" negates the blank so that it contrasts with "followed strict mathematical ratios". What word means random or unplanned?',
    explanation: '"Far from being arbitrary" (not random/unplanned) directly mirrors the main clause ("followed strict mathematical ratios").'
  },
  {
    id: 'drill-sat-2',
    track: 'sat',
    subtopic: 'Standard English: Clause Boundaries',
    type: 'single',
    stem: 'The acoustical tiles absorbed high-frequency echoes in the concert _____ low-frequency bass notes continued to resonate near the rear wall.',
    options: [
      'hall; however,',
      'hall, however,',
      'hall, consequently',
      'hall; for example,'
    ],
    answer: 'hall; however,',
    step0Hint: 'Both halves are independent clauses (Subject + Finite Verb), and the second clause contrasts with the first ("absorbed high-frequency" vs. "low-frequency continued to resonate").',
    explanation: 'Two independent clauses connected by the conjunctive adverb "however" require a semicolon before "however" and a comma after it ("hall; however,").'
  },
  {
    id: 'drill-sat-3',
    track: 'sat',
    subtopic: 'Information & Ideas: Narrow-Scope Inference',
    type: 'single',
    stem: 'In a two-week trial at a coastal marsh, plots fenced to exclude crabs had 40% more cordgrass shoots than unfenced plots had. However, in an adjacent marsh with higher soil salinity, fenced and unfenced plots showed no difference in cordgrass density. Which conclusion is best warranted by the findings?',
    options: [
      'The effect of crab exclusion on cordgrass density can vary depending on local environmental conditions such as salinity.',
      'Crabs never consume cordgrass in coastal marshes.',
      'Soil salinity is the only factor that determines plant growth in every wetland ecosystem worldwide.'
    ],
    answer: 'The effect of crab exclusion on cordgrass density can vary depending on local environmental conditions such as salinity.',
    step0Hint: 'Compare the two marshes in the study and keep the conclusion within the scope of the evidence.',
    explanation: 'The contrasting results between the two marshes support a conditional conclusion ("can vary depending on local environmental conditions") without overgeneralizing.'
  },

  // GMAT Drills
  {
    id: 'drill-gmat-1',
    track: 'gmat',
    subtopic: 'Critical Reasoning: Necessary Assumption',
    type: 'single',
    stem: 'A courier company plans to replace its gasoline vans with electric vans because electric vans cost 60% less per mile to fuel. The operations director concludes that the switch will reduce the company’s total annual fleet expenses within the first two years. Which assumption is required by the director’s conclusion?',
    options: [
      'The upfront purchase and financing costs of the electric vans will not exceed the fuel savings achieved over the first two years.',
      'Gasoline prices will double every month during the next two years.',
      'Electric vans have a higher top speed than gasoline vans on highways.'
    ],
    answer: 'The upfront purchase and financing costs of the electric vans will not exceed the fuel savings achieved over the first two years.',
    step0Hint: 'Premise: Lower fuel cost per mile. Conclusion: Lower TOTAL annual fleet expenses over 2 years. Apply the Negation Test to the missing cost variable.',
    explanation: 'Total fleet expenses include both fuel and vehicle purchase/financing costs. If upfront/financing costs exceeded the two-year fuel savings, total expenses would not fall.'
  },
  {
    id: 'drill-gmat-2',
    track: 'gmat',
    subtopic: 'Critical Reasoning: Strengthen / Control Confounder',
    type: 'single',
    stem: 'Employees who voluntarily attended an optional Saturday negotiation workshop closed 22% more client contracts in the following quarter than employees who did not attend. The training manager concludes that the workshop caused the higher closing rate. Which finding, if true, most strengthens the manager’s conclusion?',
    options: [
      'Before the workshop, attendees and non-attendees had virtually identical contract-closing rates and client portfolios.',
      'The company also introduced a new CRM software tool for all departments last year.',
      'Several workshop attendees had worked in the industry for at least three years.'
    ],
    answer: 'Before the workshop, attendees and non-attendees had virtually identical contract-closing rates and client portfolios.',
    step0Hint: 'What is the main alternative explanation (self-selection bias) when volunteers outperform non-volunteers? Rule out that baseline difference!',
    explanation: 'Showing that attendees and non-attendees had identical baseline closing rates and portfolios before the workshop rules out pre-existing skill differences as a confounding factor.'
  },
  {
    id: 'drill-gmat-3',
    track: 'gmat',
    subtopic: 'Quantitative Logic: Rates vs. Totals',
    type: 'single',
    stem: 'Division North rejected 4% of the components it inspected in May, whereas Division South rejected only 2% of the components it inspected in May. Which additional fact would allow Division South to have rejected a larger absolute number of components than Division North?',
    options: [
      'Division South inspected three times as many total components in May as Division North did.',
      'Division North inspected twice as many total components in May as Division South did.',
      'Both divisions inspected the exact same number of components in May.'
    ],
    answer: 'Division South inspected three times as many total components in May as Division North did.',
    step0Hint: 'Total Rejected = Rejection Rate (%) × Total Inspected (Denominator). Test with numbers: let North inspect 100 units (4% = 4 rejected).',
    explanation: 'If North inspected 100 units (4% of 100 = 4) and South inspected 300 units (2% of 300 = 6), South rejected more total components (6 > 4) despite a lower rate.'
  },

  // GRE Drills (Single-Choice + 6-Choose-2 Sentence Equivalence)
  {
    id: 'drill-gre-1',
    track: 'gre',
    subtopic: 'Text Completion: Concession & Polarity',
    type: 'single',
    stem: 'Although the physicist’s early papers were dismissed as overly speculative, subsequent telescope observations rendered her core model not merely plausible but altogether _______.',
    options: [
      'tenable',
      'ambiguous',
      'evasive',
      'negligible'
    ],
    answer: 'tenable',
    step0Hint: '"Although" contrasts early dismissal ("overly speculative") with subsequent validation ("not merely plausible but altogether _______").',
    explanation: '"Tenable" (capable of being defended with reason and evidence) intensifies "plausible" and completes the contrast with "dismissed as overly speculative".'
  },
  {
    id: 'drill-gre-2',
    track: 'gre',
    subtopic: 'Sentence Equivalence: 6-Choose-2 Twin Synonyms',
    type: 'multi2',
    stem: 'Select the TWO answer choices that, when used to complete the sentence, fit the meaning of the sentence as a whole and produce completed sentences that are alike in meaning: "Because the witness gave _______ answers that stated the facts in just a few words without elaboration, the cross-examination concluded in less than ten minutes."',
    options: [
      'laconic',
      'concise',
      'evasive',
      'verbose',
      'ambiguous',
      'unqualified'
    ],
    answer: ['concise', 'laconic'],
    step0Hint: 'The clause "that stated the facts in just a few words without elaboration" defines the blank. Select the TWO words meaning brief/economical with words.',
    explanation: 'Both "laconic" and "concise" mean using very few words clearly. "Evasive" adds an unsupported motive of dodging questions, which conflicts with "stated the facts".'
  },
  {
    id: 'drill-gre-3',
    track: 'gre',
    subtopic: 'Sentence Equivalence: 6-Choose-2 Twin Synonyms',
    type: 'multi2',
    stem: 'Select the TWO answer choices that fit the sentence and produce equivalent meanings: "While the first intervention produced a substantial reduction in commute times, the second adjustment yielded only _______ gains that barely registered in the traffic sensors."',
    options: [
      'negligible',
      'inconsequential',
      'substantial',
      'pragmatic',
      'tenable',
      'innovative'
    ],
    answer: ['inconsequential', 'negligible'],
    step0Hint: '"While" contrasts "a substantial reduction" with gains "that barely registered in the traffic sensors". Select TWO words meaning too small to matter.',
    explanation: 'Both "negligible" and "inconsequential" mean so small or unimportant as to barely matter, matching "barely registered in the traffic sensors".'
  },
  {
    id: 'drill-gre-4',
    track: 'gre',
    subtopic: 'Reading Comprehension: Author Stance & Qualification',
    type: 'single',
    stem: 'Passage: "Proponents of the municipal bike-share program hail it as an unqualified environmental triumph. Yet survey data indicate that seventy percent of bike-share trips replaced walking or public transit rides rather than private automobile trips." What is the primary function of the second sentence?',
    options: [
      'To qualify the proponents’ claim by showing that the program’s net reduction in car emissions was more limited than assumed',
      'To prove that no resident in the city ever rides a bicycle to work',
      'To argue that public transit is more polluting than private automobiles'
    ],
    answer: 'To qualify the proponents’ claim by showing that the program’s net reduction in car emissions was more limited than assumed',
    step0Hint: 'The first sentence reports an "unqualified environmental triumph" view; "Yet" introduces evidence that tempers (qualifies) how much car traffic was actually replaced.',
    explanation: 'By noting that 70% of trips replaced walking or transit rather than car trips, the author challenges the claim of "unqualified" triumph without claiming the program had zero value.'
  }
];

export const examCommuteDialogues = [
  {
    id: 'en-commute-toefl-1',
    track: 'toefl',
    category: 'Campus & Office Hours',
    title: 'Negotiating a Research Paper Scope in Office Hours',
    setting: 'A student visits a professor during office hours to narrow an overly broad term paper topic before Friday.',
    keyPatterns: ['narrow the scope to', 'within the page limit', 'primary archival sources'],
    recallPrompt: 'How do you politely ask a professor whether narrowing your research question to a single decade is acceptable?',
    recallModel: 'Would it be feasible to narrow the scope to a single decade so I can analyze the primary sources in depth?',
    lines: [
      { speaker: 'Student', text: 'Professor Lin, I started outlining my paper on urban transit history, but I already have forty sources.', focusNote: 'State the concrete problem first instead of asking a vague question.' },
      { speaker: 'Professor', text: 'Forty sources is far too broad for a ten-page seminar paper. Which decade shows the sharpest policy shift?', focusNote: 'Notice how the professor redirects from breadth to a specific analytical pivot.' },
      { speaker: 'Student', text: 'The 1970s energy crisis triggered the biggest shift toward electric rail investment.', focusNote: '"Triggered the biggest shift toward..." is a high-scoring cause-and-effect collocation.' },
      { speaker: 'Professor', text: 'Focus exclusively on that decade and compare two municipal case studies within the page limit.', focusNote: '"Focus exclusively on..." signals the actionable recommendation tested in TOEFL listening.' }
    ]
  },
  {
    id: 'en-commute-toefl-2',
    track: 'toefl',
    category: 'Campus & Lab Access',
    title: 'Resolving a Laboratory Equipment Scheduling Conflict',
    setting: 'Two graduate researchers coordinate spectrometer time after a calibration delay.',
    keyPatterns: ['push back the slot', 'run a calibration check', 'back-to-back samples'],
    recallPrompt: 'How do you propose swapping lab time slots without delaying your partner’s deadline?',
    recallModel: 'If I take the evening slot after calibration finishes, could you run your baseline samples tomorrow morning?',
    lines: [
      { speaker: 'Researcher A', text: 'The technician just let me know the spectrometer needs a two-hour calibration check this afternoon.', focusNote: '"Let me know (that)..." is natural spoken academic English for reporting updates.' },
      { speaker: 'Researcher B', text: 'That overlaps with my two o’clock reservation, and my samples degrade if they sit overnight.', focusNote: 'Pay attention to the constraint ("degrade if they sit overnight")—it drives the final decision.' },
      { speaker: 'Researcher A', text: 'Mine are stable at room temperature, so you can take the four o’clock slot right after calibration.', focusNote: 'Offering a practical trade-off demonstrates collaborative problem solving.' },
      { speaker: 'Researcher B', text: 'Thank you—I will run my batch at four and leave the chamber clean for your evening run.', focusNote: 'Confirming the exact time and next step closes the agreement clearly.' }
    ]
  },
  {
    id: 'en-commute-toefl-3',
    track: 'toefl',
    category: 'Academic Seminar Discussion',
    title: 'Qualifying an Ecological Hypothesis in Seminar',
    setting: 'Two students discuss why a coral restoration trial succeeded in one bay but failed in another.',
    keyPatterns: ['account for the discrepancy', 'confounding variable', 'contingent on water flow'],
    recallPrompt: 'How do you point out that an experiment’s success depends on local water conditions?',
    recallModel: 'Those results appear to be contingent on strong tidal circulation rather than temperature alone.',
    lines: [
      { speaker: 'Student A', text: 'The reading claims heat-tolerant coral fragments survived at an eighty percent rate in the northern bay.', focusNote: 'Introduces the baseline empirical finding.' },
      { speaker: 'Student B', text: 'True, yet the southern bay used the exact same genetic strain and lost half its colonies.', focusNote: '"True, yet..." concedes the premise while introducing a counter-example.' },
      { speaker: 'Student A', text: 'What accounts for the discrepancy if water temperatures were identical in both bays?', focusNote: '"What accounts for the discrepancy" is a classic academic inquiry phrase.' },
      { speaker: 'Student B', text: 'Tidal flushing was much weaker in the south, so survival was contingent on water flow as well as heat tolerance.', focusNote: '"Contingent on" expresses a necessary condition accurately.' }
    ]
  },
  {
    id: 'en-commute-toeic-1',
    track: 'toeic',
    category: 'Supply Chain & Logistics',
    title: 'Expediting a Delayed Component Shipment',
    setting: 'A procurement manager calls a supplier after customs clearance delays a critical valve shipment.',
    keyPatterns: ['held up in customs', 'air-freight a partial batch', 'keep the assembly line running'],
    recallPrompt: 'How do you ask a vendor to air-freight a partial batch today so production does not stop?',
    recallModel: 'Could you air-freight a partial batch of five hundred units today so we can keep the assembly line running?',
    lines: [
      { speaker: 'Buyer', text: 'Hi Kenji, our tracking portal shows the sea-freight container is still held up in customs.', focusNote: '"Held up in..." is a high-frequency TOEIC phrasal verb for delays.' },
      { speaker: 'Supplier', text: 'Yes, the port inspector requested an updated certificate of origin, which we submitted an hour ago.', focusNote: 'Explains the root cause and the corrective action already taken.' },
      { speaker: 'Buyer', text: 'Our assembly line will run out of intake valves by Thursday morning unless we get a bridge shipment.', focusNote: '"Unless we get..." sets a clear operational deadline.' },
      { speaker: 'Supplier', text: 'We can air-freight five hundred valves from our regional hub this afternoon at no extra shipping charge.', focusNote: 'Listen for the concrete remedy ("air-freight five hundred valves... this afternoon").' }
    ]
  },
  {
    id: 'en-commute-toeic-2',
    track: 'toeic',
    category: 'Client Negotiation & Contracts',
    title: 'Negotiating Volume Pricing and Service-Level Terms',
    setting: 'An account director and a corporate client finalize software licensing tiers during a commuter call.',
    keyPatterns: ['waive the onboarding fee', 'commit to a two-year term', 'guaranteed response window'],
    recallPrompt: 'How do you offer to waive the setup fee if the client signs a two-year contract?',
    recallModel: 'We can waive the onboarding fee entirely if your team commits to a two-year agreement by Friday.',
    lines: [
      { speaker: 'Client', text: 'Your enterprise tier meets our security requirements, but the onboarding fee pushes us over our Q3 budget.', focusNote: 'Signals buying interest paired with a specific budget objection.' },
      { speaker: 'Account Director', text: 'If your company commits to a twenty-four-month term, we can waive the onboarding fee entirely.', focusNote: 'Conditional concession ("If X, we can waive Y") is core negotiation syntax.' },
      { speaker: 'Client', text: 'Does that agreement still include the four-hour guaranteed response window for critical outages?', focusNote: 'Verifies that service-level quality is preserved despite the discount.' },
      { speaker: 'Account Director', text: 'Absolutely—I will put that service-level guarantee in Clause 4 and send the revised contract within the hour.', focusNote: 'Provides immediate written confirmation and a specific delivery time.' }
    ]
  },
  {
    id: 'en-commute-toeic-3',
    track: 'toeic',
    category: 'Business Travel & Transit',
    title: 'Rebooking a Canceled Connecting Flight at the Gate',
    setting: 'A business traveler speaks with an airline agent to reach a keynote presentation on time.',
    keyPatterns: ['reroute through', 'make the morning keynote', 'confirm a seat assignment'],
    recallPrompt: 'How do you ask an airline agent to reroute you through another hub so you arrive before 9:00 a.m.?',
    recallModel: 'Is there any way to reroute me through Frankfurt tonight so I can make my nine o’clock keynote?',
    lines: [
      { speaker: 'Traveler', text: 'Excuse me, Flight 408 to Zurich was just canceled, and I am scheduled to deliver a keynote at nine tomorrow morning.', focusNote: 'States both the disruption and the time-critical business constraint.' },
      { speaker: 'Gate Agent', text: 'Let me check partner carriers—there is a flight to Munich boarding at Gate B12 in twenty-five minutes.', focusNote: 'Offers an alternative routing with an urgent boarding window.' },
      { speaker: 'Traveler', text: 'Does that connection get me into Zurich before eight-thirty, and will my carry-on fit in the overhead bin?', focusNote: 'Checks arrival time and baggage logistics in a single turn.' },
      { speaker: 'Gate Agent', text: 'You will land in Zurich at seven-forty-five a.m.; here is your new boarding pass with priority boarding.', focusNote: 'Confirms arrival margin and resolves the carry-on concern.' }
    ]
  },
  {
    id: 'en-commute-sat-1',
    track: 'sat',
    category: 'Evidence & Precision',
    title: 'Distinguishing Narrow Inference from Overgeneralization',
    setting: 'Two students review a Digital SAT reading question about urban tree-canopy cooling.',
    keyPatterns: ['warranted by the data', 'goes beyond the scope', 'hedged with conditional language'],
    recallPrompt: 'How do you explain why an answer choice with the word "always" is incorrect based on a single city study?',
    recallModel: 'That choice goes beyond the scope of the evidence because the study only measured one arid city during July.',
    lines: [
      { speaker: 'Tutor', text: 'Why did you eliminate Choice B even though it mentions tree-canopy cooling from the passage?', focusNote: 'Prompts the learner to articulate flaw-detection logic.' },
      { speaker: 'Student', text: 'Choice B claims trees lower street temperatures by five degrees in every climate zone worldwide.', focusNote: 'Identifies the extreme universal quantifier ("every... worldwide").' },
      { speaker: 'Tutor', text: 'Spot on—and how does Choice A stay within what is warranted by the data?', focusNote: '"Warranted by the data" means strictly supported by the stated evidence.' },
      { speaker: 'Student', text: 'Choice A is hedged with "can reduce peak afternoon heat in arid neighborhoods," which matches the Phoenix sample.', focusNote: 'Shows how modal hedging ("can reduce") aligns with bounded empirical scope.' }
    ]
  },
  {
    id: 'en-commute-sat-2',
    track: 'sat',
    category: 'Rhetorical Synthesis & Transitions',
    title: 'Selecting Logical Transitions Between Clause Boundaries',
    setting: 'A writing coach and student analyze why "nevertheless" beats "consequently" in a synthesis prompt.',
    keyPatterns: ['semantic polarity shift', 'independent clause boundary', 'conjunctive adverb'],
    recallPrompt: 'When two independent clauses are joined by "however", what punctuation is required?',
    recallModel: 'Place a semicolon before "however" and a comma after it when joining two independent clauses.',
    lines: [
      { speaker: 'Student', text: 'The first sentence says early solar cells converted less than two percent of sunlight into electricity.', focusNote: 'Establishes a negative/limited baseline premise.' },
      { speaker: 'Coach', text: 'And the second sentence says satellite engineers adopted them immediately for orbital missions. What is the logical link?', focusNote: 'Highlights the surprising positive outcome despite low efficiency.' },
      { speaker: 'Student', text: 'It is a concession contrast, so we need "nevertheless" rather than a cause-and-effect word like "consequently."', focusNote: 'Names the exact semantic relationship before looking at punctuation.' },
      { speaker: 'Coach', text: 'Exactly—and because both halves have a subject and finite verb, use a semicolon before "nevertheless" and a comma after.', focusNote: 'Combines transition logic with SAT Standard English boundary rules.' }
    ]
  },
  {
    id: 'en-commute-sat-3',
    track: 'sat',
    category: 'Words in Context',
    title: 'Decoding High-Utility Academic Vocabulary from Structural Clues',
    setting: 'Two classmates practice predicting word meanings from appositives and contrast markers.',
    keyPatterns: ['structural restatement', 'far from being arbitrary', 'corroborate the claim'],
    recallPrompt: 'How do you use a colon or dash in a sentence to predict a vocabulary blank?',
    recallModel: 'Treat the clause after a colon or dash as a direct structural restatement of the word in the blank.',
    lines: [
      { speaker: 'Partner A', text: 'Look at this stem: "The archivist’s catalog was _______: every manuscript was cross-indexed by date, scribe, and ink pigment."', focusNote: 'The colon signals that the second clause defines the blank.' },
      { speaker: 'Partner B', text: 'Cross-indexing every manuscript by three criteria means the catalog was thorough and systematic.', focusNote: 'Predicts a plain-English meaning ("thorough and systematic") before reading options.' },
      { speaker: 'Partner A', text: 'Among "meticulous," "tentative," "ephemeral," and "redundant," which one matches our prediction?', focusNote: 'Tests options against the pre-formed prediction.' },
      { speaker: 'Partner B', text: '"Meticulous" means showing extreme care about minute details, which directly mirrors the clause after the colon.', focusNote: 'Confirms exact semantic equivalence.' }
    ]
  },
  {
    id: 'en-commute-gmat-1',
    track: 'gmat',
    category: 'Critical Reasoning & Executive Strategy',
    title: 'Stress-Testing a Profit Forecast with the Negation Test',
    setting: 'Two strategy analysts evaluate whether cutting packaging weight will increase net operating margin.',
    keyPatterns: ['necessary assumption', 'apply the negation test', 'offset by breakage costs'],
    recallPrompt: 'How do you challenge a plan that assumes lower shipping weight automatically increases total profit?',
    recallModel: 'That conclusion assumes lighter packaging will not increase product breakage or return costs by more than the freight savings.',
    lines: [
      { speaker: 'Analyst A', text: 'Switching to thinner glass bottles cuts freight expenses by twelve percent, so our beverage unit’s net profit will rise.', focusNote: 'Notice the leap from one cost component (freight) to net profit.' },
      { speaker: 'Analyst B', text: 'That conclusion holds only if thinner bottles do not lead to higher breakage rates during transit.', focusNote: 'Identifies the unstated necessary assumption.' },
      { speaker: 'Analyst A', text: 'Let us apply the negation test: what if breakage claims increase by more than twelve percent?', focusNote: 'Negating the assumption tests whether the argument collapses.' },
      { speaker: 'Analyst B', text: 'Then net profit would actually fall—so we must pilot-test breakage rates before approving the fleet-wide switch.', focusNote: 'Translates GMAT Critical Reasoning into real executive decision-making.' }
    ]
  },
  {
    id: 'en-commute-gmat-2',
    track: 'gmat',
    category: 'Data Insights & Quantitative Logic',
    title: 'Separating Percentage Rates from Absolute Totals in a Board Briefing',
    setting: 'A CFO and a regional director examine why a lower defect rate still produced more total returns.',
    keyPatterns: ['percentage versus absolute volume', 'denominator expanded', 'base-rate fallacy'],
    recallPrompt: 'How can a factory have a lower defect percentage this quarter but a higher total number of defective units?',
    recallModel: 'If total production volume more than doubled, a smaller defect percentage can still yield a larger absolute number of defects.',
    lines: [
      { speaker: 'Director', text: 'Our plant reduced its defect rate from three percent in Q1 to two percent in Q2, yet total warranty returns increased.', focusNote: 'Presents a classic GMAT rate-versus-total paradox.' },
      { speaker: 'CFO', text: 'Did total production volume change between Q1 and Q2?', focusNote: 'Immediately checks the denominator (total units produced).' },
      { speaker: 'Director', text: 'Yes, we more than doubled output from ten thousand units to twenty-five thousand units for the summer launch.', focusNote: 'Reveals that the denominator expanded by 2.5x.' },
      { speaker: 'CFO', text: 'Two percent of twenty-five thousand is five hundred units, versus three hundred in Q1—so the rate improved while volume drove total returns.', focusNote: 'Resolves the paradox with exact arithmetic.' }
    ]
  },
  {
    id: 'en-commute-gmat-3',
    track: 'gmat',
    category: 'Causal Inference & Confounders',
    title: 'Eliminating Self-Selection Bias in a Remote-Work Productivity Study',
    setting: 'An HR analytics lead explains why a voluntary four-day workweek pilot needs a randomized baseline.',
    keyPatterns: ['self-selection bias', 'baseline performance parity', 'isolate the causal variable'],
    recallPrompt: 'How do you rule out self-selection bias when comparing volunteers against non-volunteers?',
    recallModel: 'We need to verify that both groups had comparable baseline productivity before the pilot began.',
    lines: [
      { speaker: 'VP of Operations', text: 'The twenty engineers who opted into the four-day schedule closed fifteen percent more tickets than the rest of the department.', focusNote: '"Opted into" signals voluntary self-selection.' },
      { speaker: 'Analytics Lead', text: 'Before we credit the schedule, we need to check whether those twenty engineers were already top performers.', focusNote: 'Identifies pre-existing skill/motivation as a confounding variable.' },
      { speaker: 'VP of Operations', text: 'Good point—what did their prior six-month ticket velocity look like?', focusNote: 'Asks for pre-intervention baseline data.' },
      { speaker: 'Analytics Lead', text: 'Their baseline velocity matched the department median, which strengthens the claim that the schedule itself boosted focus.', focusNote: 'Baseline parity rules out the confounder and strengthens causality.' }
    ]
  },
  {
    id: 'en-commute-gre-1',
    track: 'gre',
    category: 'Graduate Seminar & Polarity',
    title: 'Tracking Double Negation and Concession in Historiography',
    setting: 'Two graduate students dissect a dense historiographical critique before a seminar presentation.',
    keyPatterns: ['far from being monolithic', 'ostensibly neutral', 'belied by archival letters'],
    recallPrompt: 'What does it mean if a scholar’s ostensibly neutral summary is belied by private archival letters?',
    recallModel: 'It means the summary appears unbiased on the surface, but the private letters contradict that appearance.',
    lines: [
      { speaker: 'Grad Student A', text: 'The reviewer writes that the committee’s report was "ostensibly impartial, yet belied by the chair’s private correspondence."', focusNote: '"Ostensibly" marks surface appearance; "belied by" marks contradiction by evidence.' },
      { speaker: 'Grad Student B', text: 'So on the surface the report looked objective, but the private letters exposed a hidden bias.', focusNote: 'Paraphrases high-register GRE lexis into clear functional English.' },
      { speaker: 'Grad Student A', text: 'And what about the next clause: "far from being a perfunctory dissent, the minority memo reshaped the treaty"?', focusNote: '"Far from being X" negates "perfunctory" (routine/superficial).' },
      { speaker: 'Grad Student B', text: 'Instead of being a routine formality, the minority memo was substantive and decisive.', focusNote: 'Pairs the negated flaw with its positive semantic twin.' }
    ]
  },
  {
    id: 'en-commute-gre-2',
    track: 'gre',
    category: 'Sentence Equivalence & Precision',
    title: 'Distinguishing True Semantic Twins from Thematic Distractors',
    setting: 'A verbal coach walks a test-taker through a 6-Choose-2 Sentence Equivalence trap.',
    keyPatterns: ['converge on identical meaning', 'thematic distractor', 'unsupported motive'],
    recallPrompt: 'Why are "laconic" and "concise" semantic twins whereas "evasive" is a distractor?',
    recallModel: '"Laconic" and "concise" both mean brief and to the point, whereas "evasive" adds an unsupported motive of hiding the truth.',
    lines: [
      { speaker: 'Test-Taker', text: 'In this Sentence Equivalence item, the speaker gave brief, factual replies, so I picked "concise" and "evasive."', focusNote: 'Reveals a common mistake: pairing a correct word with a tone-mismatched distractor.' },
      { speaker: 'Coach', text: 'Check the tone: if the replies were factual and direct, was the speaker trying to dodge the question?', focusNote: 'Uses context to test hidden connotation.' },
      { speaker: 'Test-Taker', text: 'No—the sentence explicitly says she stated the facts without elaboration.', focusNote: 'Returns to the textual anchor ("stated the facts without elaboration").' },
      { speaker: 'Coach', text: 'Then drop "evasive" and pair "concise" with "laconic"—both mean using very few words without implying dishonesty.', focusNote: 'Demonstrates how GRE twin synonyms must produce equivalent sentences.' }
    ]
  },
  {
    id: 'en-commute-gre-3',
    track: 'gre',
    category: 'Critique & Qualification',
    title: 'Evaluating Nuanced Authorial Stance in Science Policy',
    setting: 'Two researchers discuss why an editorial neither wholly endorses nor completely dismisses carbon offsets.',
    keyPatterns: ['qualified endorsement', 'salutary interim measure', 'panacea for emissions'],
    recallPrompt: 'How do you describe a policy that is helpful in the short term but not a complete cure-all?',
    recallModel: 'The policy serves as a salutary interim measure rather than a panacea for long-term emissions.',
    lines: [
      { speaker: 'Researcher 1', text: 'Does the editorial dismiss forestry offsets entirely, or does it offer a qualified endorsement?', focusNote: '"Qualified endorsement" is a classic GRE Reading Comprehension answer pattern.' },
      { speaker: 'Researcher 2', text: 'It calls them a "salutary interim measure" while warning that they are no "panacea" for industrial decarbonization.', focusNote: 'Contrasts "salutary interim measure" (helpful temporary step) with "panacea" (cure-all).' },
      { speaker: 'Researcher 1', text: 'So the author recognizes their short-term benefit but rejects relying on them as a permanent solution.', focusNote: 'Captures both sides of the author’s balanced boundary.' },
      { speaker: 'Researcher 2', text: 'Exactly—any option claiming the author considers offsets "utterly futile" or "wholly sufficient" distorts that balance.', focusNote: 'Shows how to eliminate extreme polarity traps on test day.' }
    ]
  }
];

// Editorial corrections shared by all English Academy dialogue routes.
const updateLine=(id,index,text,focusNote)=>{const d=examCommuteDialogues.find(d=>d.id===id);if(d)d.lines[index]={...d.lines[index],text,focusNote};};
updateLine('en-commute-toefl-1',1,"Forty sources may be too many to cover well in ten pages. Which decade would let you focus the question?",'Narrow the research question; the number of sources alone does not determine scope.');
updateLine('en-commute-toefl-1',2,"For this practice project, I'd focus on transit policy during the nineteen seventies and compare two cities.",'State a proposed research scope without presenting an unsupported historical causal claim as fact.');
updateLine('en-commute-toefl-3',3,"Water flow was weaker in the south. That could help explain the difference, but we would need more evidence to separate its effect from other factors.",'A possible confounder suggests an explanation; it does not establish causation.');
updateLine('en-commute-toeic-3',3,"The itinerary shows an arrival at seven forty-five in the morning. Let me also check the carry-on allowance for that aircraft before I confirm the booking.",'Confirm the itinerary and baggage details separately; priority boarding does not guarantee bin space.');
updateLine('en-commute-sat-3',0,"The catalog description has a blank, followed by a colon. It says every manuscript was indexed by date, author, and ink type. What word would fit?",'Read the missing word as blank; use the following description as a contextual clue.');
updateLine('en-commute-gmat-1',1,"Only if any added breakage and return costs stay below the freight savings, assuming other costs and revenue stay the same.",'A small increase in breakage may still allow net savings; compare amounts, not unrelated percentages.');
updateLine('en-commute-gmat-1',2,"What if the added breakage costs exceed the amount we save on freight?",'Negate the relevant cost condition by comparing money saved with money lost.');
updateLine('en-commute-gmat-1',3,"Then this change would reduce profit, with other factors held constant. We should test it before switching all our packaging.",'Compare net amounts and preserve the stated assumptions.');
updateLine('en-commute-gmat-2',0,"Our defect rate fell from three percent in the first quarter to two percent in the second, but the number of defective units rose.",'Keep defective units separate from warranty returns, which may have other causes and time lags.');
updateLine('en-commute-gmat-2',3,"Two percent of twenty-five thousand is five hundred, compared with three hundred before. The rate fell, but the total number of defective units rose.",'Compare the same measure across periods: defect rate multiplied by production volume.');
updateLine('en-commute-gmat-3',3,"Their earlier performance was similar, which addresses one concern. But volunteers may differ in other ways, so we still cannot attribute the increase to the schedule alone.",'Baseline similarity does not eliminate self-selection or prove a causal effect.');
const causalDialogue=examCommuteDialogues.find(d=>d.id==='en-commute-gmat-3');
causalDialogue.title='Checking Self-Selection Bias in a Work-Schedule Study';
causalDialogue.setting='An HR team examines a voluntary four-day workweek pilot and discusses the limits of its causal evidence.';
causalDialogue.recallPrompt='Why is similar baseline performance insufficient to rule out self-selection bias?';
causalDialogue.recallModel='Volunteers may still differ in motivation or other unmeasured ways. Baseline similarity addresses one concern but does not prove causation.';
const dataDialogue=examCommuteDialogues.find(d=>d.id==='en-commute-gmat-2');
dataDialogue.setting='A finance team compares defect rates and total defective units across two production periods.';
dataDialogue.keyPatterns=['defect rate','total defective units','production volume'];
const satContext=examCommuteDialogues.find(d=>d.id==='en-commute-sat-3');
satContext.recallModel='Look at the surrounding clauses to see whether they explain, illustrate, or contrast with the missing word. A colon or dash is a clue, not a guarantee of a definition.';
for(const d of examCommuteDialogues)for(const l of d.lines){l.focusNote=l.focusNote.replace('high-scoring cause-and-effect collocation','useful cause-and-effect phrase');}
examFrameworks.toefl.dialogue.lines[1].text="That claim is too strong without more evidence. What does the study actually show, and how could you limit the wording?";
examFrameworks.toefl.dialogue.lines[1].focusNote='Do not endorse a mechanism or statistical significance before checking the evidence.';
examFrameworks.toefl.dialogue.lines[2].text="I could say the restored wetlands reduced nitrogen runoff under the conditions measured in this study.";
examFrameworks.toefl.dialogue.lines[2].focusNote='Match the conclusion to the measured conditions; do not invent statistical significance.';
examFrameworks.gmat.dialogue.lines[0].text="If more staff work remotely, fewer people will use the office each day. Could that lower our annual facility costs?";
examFrameworks.gmat.dialogue.lines[0].focusNote='Distinguish an expected occupancy change from a demonstrated reduction in fixed costs.';
