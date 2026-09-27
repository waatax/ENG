// Known builder templates are not evidence of correct usage or pronunciation.
// Preserve card IDs and vocabulary while withholding their generated teaching fields.
const template = /^(Professionals should .+ all relevant data before making a decision\.|The team presented a .+ strategy that addressed key challenges\.|The experimental results .+ confirmed the primary scientific hypothesis\.|Understanding the concept of .+ is essential for continuous progress\.)$/;
const examples = {
  fishery: ['The fishery supplies fresh fish to local markets.', '這座漁場供應新鮮的魚給當地市場。', 'a local fishery'],
  fishhook: ['Be careful. The fishhook is sharp.', '小心，魚鉤很尖銳。', 'a sharp fishhook'],
  promote: ['The store uses posters to promote its new products.', '這家商店用海報推廣新產品。', 'promote a product'],
  punch: ['Do not punch other people.', '不要揮拳打別人。', 'punch someone'],
  congressman: ['The congressman spoke about education.', '那位男性國會議員談論教育。', 'a member of Congress'],
  congresswoman: ['The congresswoman answered questions from voters.', '那位女性國會議員回答選民的問題。', 'a member of Congress'],
  premium: ['We pay an insurance premium every month.', '我們每個月繳納保險費。', 'an insurance premium'],
  discount: ['The shop offers a discount on winter coats.', '這家商店的冬季外套有折扣。', 'offer a discount'],
  'cost-benefit analysis': ['The company used a cost-benefit analysis to compare the two plans.', '公司使用成本效益分析比較這兩個方案。', 'conduct a cost-benefit analysis'],
  'return on investment': ['The project earned a positive return on investment.', '這個專案獲得正的投資報酬。', 'a positive return on investment']
};
export function teachingCard(card) {
  if (!template.test(card.example)) return card;
  const replacement = examples[card.word.toLowerCase()];
  return {...card, ipa:'', chunk:'', memoryTip:'', collocation:replacement?.[2]||'',
    example:replacement?.[0]||'', exampleZh:replacement?.[1]||'',
    qualityNote:replacement?'例句已修訂；音標與音節拆分待核對。':'此卡例句、搭配與發音標記待核對；目前提供單字與釋義回想。'};
}
export function qualityCounts(cards) {
  const affected=cards.filter(c=>template.test(c.example));
  return {total:cards.length, flagged:affected.length, repaired:affected.filter(c=>examples[c.word.toLowerCase()]).length};
}
