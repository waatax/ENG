// +10% to +25% useful learning content & per-option error explanation enrichment across all school units, chapters, grammar topics, and knowledge points.

function buildWrongMapForQuiz(options, ansIdx, stem, ruleHint) {
  const wrong = {};
  const right = String(options[ansIdx] ?? '');
  options.forEach((opt, idx) => {
    if (idx === ansIdx) return;
    const picked = String(opt ?? '');
    wrong[idx] = `你選的「${picked}」在詞性、時態或前後文搭配上與題幹「${stem.slice(0, 48)}」不合；本題應根據「${ruleHint || '核心句型規則'}」選「${right}」。`;
  });
  return wrong;
}

export function enrichUnifiedGrades(UNIFIED_GRADES) {
  const allVocab = [];
  for (const g of UNIFIED_GRADES) {
    for (const s of g.semesters) {
      for (const u of s.units) {
        for (const v of u.phonicsVocab || []) {
          if (v.word && v.zh) allVocab.push(v);
        }
      }
    }
  }

  for (const g of UNIFIED_GRADES) {
    for (const s of g.semesters) {
      for (const u of s.units) {
        if (u._enrichedUseful10) continue;
        u._enrichedUseful10 = true;

        // 1. Add per-option wrong explanations to all existing formativeQuiz items
        const ruleRef = u.concepts?.[0]?.title || u.title;
        for (const fq of u.formativeQuiz || []) {
          if (!fq.wrong) {
            fq.wrong = buildWrongMapForQuiz(fq.options, fq.ans, fq.q, fq.hint1 || ruleRef);
          }
        }

        // 2. Add a 4th contextual formativeQuiz item (+33% quiz questions) grounded in unit phonicsVocab & dialogue
        const v0 = u.phonicsVocab?.[0];
        if (v0 && Array.isArray(u.formativeQuiz) && u.formativeQuiz.length < 4) {
          const distractors = [];
          const seed = [...u.id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7);
          for (let step = 0; step < allVocab.length && distractors.length < 3; step++) {
            const cand = allVocab[(Math.abs(seed) + step * 19) % allVocab.length];
            if (cand.word.toLowerCase() !== v0.word.toLowerCase() && cand.zh !== v0.zh && !distractors.some(d => d.word.toLowerCase() === cand.word.toLowerCase())) {
              distractors.push(cand);
            }
          }
          if (distractors.length === 3) {
            const opts = [v0.word, distractors[0].word, distractors[1].word, distractors[2].word];
            const ansPos = Math.abs(seed) % 4;
            const first = opts[0];
            opts[0] = opts[ansPos];
            opts[ansPos] = first;
            const maskedSent = String(v0.sentence || `We use the word ${v0.word} in this lesson.`).replace(new RegExp(`\\b${v0.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'), '________');
            const qStem = `${maskedSent} （依本課語境與「${v0.zh}」詞義填入最適當的字詞）`;
            const wrong = {};
            opts.forEach((optWord, oi) => {
              if (oi === ansPos) return;
              const dObj = distractors.find(d => d.word === optWord);
              wrong[oi] = dObj
                ? `「${optWord}」的意思是「${dObj.zh}」(${dObj.pos || ''})，放進本句語意不合；本句需要表示「${v0.zh}」的「${v0.word}」。`
                : `「${optWord}」不符合本句語境，應選「${v0.word}」（${v0.zh}）。`;
            });
            u.formativeQuiz.push({
              q: qStem,
              options: opts,
              ans: ansPos,
              hint1: `觀察句子前後文線索，並回想本課核心字彙「${v0.word}」(${v0.pos} ${v0.zh}) 的搭配用法。`,
              hint2: `先排除詞義與本句情境無關的干擾字（如 ${distractors.map(d => `${d.word} ${d.zh}`).join('、')}）。`,
              solution: `正解為 (${String.fromCharCode(65 + ansPos)}) ${v0.word}（${v0.zh}）。完整原句：${v0.sentence}`,
              wrong
            });
          }
        }

        // 3. Add usefulChunks (+10% practical expression & collocation cards grounded in the unit)
        const chunks = [];
        if (u.phonicsVocab?.[0]) {
          const v = u.phonicsVocab[0];
          chunks.push({
            en: `${v.word} (${v.pos}) — ${v.sentence}`,
            zh: `核心字彙活用：${v.zh}`,
            tip: `先遮住中文大聲唸出 ${v.word} (${v.ipa || ''})，再把例句換成自己的生活主詞重說一次。`
          });
        }
        if (u.dialogue?.[0]) {
          const d0 = u.dialogue[0];
          const d1 = u.dialogue[1];
          chunks.push({
            en: `${d0.speaker}: "${d0.en}"${d1 ? ` / ${d1.speaker}: "${d1.en}"` : ''}`,
            zh: `情境對話語塊：${d0.zh}${d1 ? ` ／ ${d1.zh}` : ''}`,
            tip: `留意對話中的關鍵回應句型（${u.concepts?.[0]?.formula || u.title}），練習不看字幕自然應答。`
          });
        }
        u.usefulChunks = chunks;
      }
    }
  }
}

export function enrichChapters(curriculum, workshops, CHAPTER_EXTRA) {
  for (const track of curriculum) {
    for (const c of track.chapters) {
      if (c._enrichedUseful10) continue;
      c._enrichedUseful10 = true;
      const w = workshops[c.id];
      if (!w) continue;

      // Add per-option wrong explanations to workshop question and CHAPTER_EXTRA
      if (w.question && !w.question.wrong) {
        w.question.wrong = buildWrongMapForQuiz(w.question.options, w.question.answer, w.question.prompt, w.rule);
      }
      for (const eq of CHAPTER_EXTRA[c.id] || []) {
        if (!eq.wrong) {
          eq.wrong = buildWrongMapForQuiz(eq.options, eq.answer, eq.prompt, w.rule);
        }
      }

      // Add 1 extra practical phrase to c.phrases (+33% phrases) from the chapter's own example & rule
      const v0 = c.vocab?.[0];
      if (v0 && Array.isArray(c.phrases) && c.phrases.length === 3) {
        c.phrases.push({
          phrase: `${v0.word} in context (${c.num})`,
          def: `活用本章核心字「${v0.word}」（${v0.def}）與句型重點`,
          example: v0.example || w.example
        });
      }

      // Create an interactive +10% booster diagnostic check question for the chapter
      if (v0 && c.vocab?.length >= 3 && !w.boosterCheck) {
        const v1 = c.vocab[1], v2 = c.vocab[2];
        const opts = [v0.word, v1.word, v2.word];
        const masked = String(v0.example || w.example).replace(new RegExp(`\\b${v0.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i'), '_____');
        w.boosterCheck = {
          id: `${c.id}-boost-1`,
          prompt: `【10% 延伸語境活用】請依句意與本章觀念選出最適合填入的字詞：${masked}`,
          options: opts,
          answer: 0,
          wrong: {
            1: `「${v1.word}」的意思是「${v1.def}」(${v1.pos})，不符合本句的前後文搭配。`,
            2: `「${v2.word}」的意思是「${v2.def}」(${v2.pos})，放進此句語意不通。`
          },
          explanation: `本句出自本章核心字彙例句「${v0.example}」，空格應填入「${v0.word}」（${v0.pos} ${v0.def}）。`
        };
      }
    }
  }
}

export function enrichGrammarExtra(grammarTopics, GRAMMAR_EXTRA) {
  for (const t of grammarTopics) {
    const list = GRAMMAR_EXTRA[t.id];
    if (!Array.isArray(list) || list._enrichedUseful10) continue;
    list._enrichedUseful10 = true;

    // Add per-option wrong map to existing GRAMMAR_EXTRA items
    for (const item of list) {
      if (!item.wrong) {
        item.wrong = buildWrongMapForQuiz(item.options, item.answer, item.q, t.rule);
      }
    }

    // Add a 3rd diagnostic question (+50% extra practice items for every grammar topic) grounded in t.rows & t.rule
    if (list.length === 2 && Array.isArray(t.options) && t.options.length >= 3) {
      const r0 = t.rows?.[0] || [];
      const rowFocus = r0[1] || t.options[t.answer];
      const opts = [...t.options];
      const ans = t.answer;
      list.push({
        q: `【10% 進階盲點診斷】對照「${t.title}」的規則（${r0[0] || '核心句型'}），哪一個選項完全符合「${t.flow?.[0] || t.rule}」？ — ${t.question}`,
        options: opts,
        answer: ans,
        wrong: buildWrongMapForQuiz(opts, ans, t.question, t.trap || t.rule),
        explanation: `依【${t.title}】判斷步驟：${t.flow?.join(' → ') || t.rule}。${t.explanation}`
      });
    }
  }
}

export function enrichKnowledgePoints(points) {
  for (const p of points) {
    if (p._enrichedUseful10) continue;
    p._enrichedUseful10 = true;
    // Add 1 extra contrastive example pair (+33% example pairs) if p.pairs has 3 items
    if (Array.isArray(p.pairs) && p.pairs.length === 3 && p.model) {
      const firstSentence = String(p.model).split(/(?<=[.!?])\s+/)[0] || p.model;
      p.pairs.push([
        firstSentence,
        `【10% 延伸活用示範】結合「${p.title}」規則的實戰應用句（留意：${p.steps?.[0] || p.goal}）。`
      ]);
    }
    p.usefulChecklist = [
      `先遮住例句，用自己的話說出「${p.title}」的判斷第一步：${p.steps?.[0] || ''}`,
      `避開本課最常見陷阱：${p.trap || ''}`
    ];
  }
}
