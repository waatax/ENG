// Short, independent situations for applying each advanced unit's main skill.
const scenarios = {
  synthesis: [
    'Source A: The trial shortened weekday queues. Source B: Weekend delays rose while one entrance was closed.',
    '用一句英文整合兩個發現，保留適用時段與現場限制。',
    'The trial shortened weekday queues, while weekend delays increased during an entrance closure.',
    '兩份資料談的是不同時段。用 during 保留時間關係，避免自行把入口關閉寫成已證實的肇因。'
  ],
  argument: [
    'The library should stay open later because some students work evenings. A colleague points to staffing costs.',
    '用兩句英文承認成本問題，提出可用資料檢驗的折衷方案。',
    'Extended hours would increase staffing costs. A four-week Friday pilot could test demand before the library commits to a permanent schedule.',
    '折衷方案把範圍與時間說清楚，也指出要驗證的需求。直接否定成本會漏掉同事提出的限制。'
  ],
  register: [
    'A delivery is delayed. You can send the tracking number this afternoon and confirm the arrival date tomorrow.',
    '以英文寫一句給熟悉同事的訊息，再寫一則給客戶的簡短通知，兩版都保留兩個時間。',
    'Colleague: I’ll send the tracking number this afternoon and confirm the arrival date tomorrow.\nCustomer: Your delivery has been delayed. I’ll send the tracking number this afternoon and confirm the expected arrival date tomorrow.',
    '客戶需要先知道發生什麼事。兩版維持同樣的承諾，且 tomorrow 修飾確認日期的動作。'
  ],
  nuance: [
    'Early survey responses suggest that the new schedule may help some commuters.',
    '將英文改寫得更簡潔，保留證據仍初步、效果仍不確定、對象只有部分通勤者。',
    'An initial survey suggests the new schedule could help some commuters.',
    'Initial、suggests、could、some 各保留一層限制。若把 could 改成 will，就會把可能性說成承諾。'
  ],
  listening: [
    'I support a trial this month, provided staff can opt out. We can review participation before extending it.',
    '請找出講者支持的安排、必要條件與下一步，各用自己的英文記一小句。',
    'Support: a trial this month. Condition: staff can opt out. Next step: review participation before deciding on an extension.',
    'Provided 在這裡引出條件。講者支持有退出選項的試行，是否延長還取決於參與情況。'
  ],
  mediation: [
    'This folder uses version history. Restoring a previous version retains later versions in the history.',
    '替第一次用這個工具的人寫兩句英文，說明可以做什麼，以及還能去哪裡找較新的版本。',
    'You can bring an older copy back. If you need a more recent copy later, look for it in the version history.',
    '用操作動作說清楚 restore，再說明後續版本仍在哪裡可找到，避免把恢復舊版誤解成刪除新版。'
  ],
  debate: [
    'Your proposal suggests a three-month trial. A reviewer says, “So you’re asking us to fund this indefinitely?”',
    '用一句英文修正對方的理解，再用一句說明試行後如何決定。',
    'The funding request covers a three-month trial. At the end of the trial, we’ll compare usage and costs before deciding whether to continue.',
    '第一句直接修正時間範圍，第二句說明續辦條件。只回答 “That’s wrong” 會讓對方仍不知道實際承諾。'
  ],
  capstone: [
    'An evening clinic drew 120 visits over six weeks, mostly on Tuesdays. Staffing costs were higher than expected.',
    '用兩句英文提出下一步，附一項成效指標和檢討時間。',
    'Keep the Tuesday clinic open for another six weeks and track the cost per visit. Review the results at the end of the trial before adding any evenings.',
    '把方案集中在使用最頻繁的時段，並同時考慮成本與使用量。Visits 是訪次，不能直接當成不同訪客人數。'
  ]
};

export function advancedExtraPractice(id) {
  const row = scenarios[id];
  if (!row) return [];
  const [context, prompt, answer, why] = row;
  return [{title: '新情境：試著自己說一次', context, prompt, answer, why, lang: 'en', answerLang: true}];
}
