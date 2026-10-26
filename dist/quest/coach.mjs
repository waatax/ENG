// Feedback text remains derived from the item; no answer is exposed before submission.
export function answerText(it) {
  if (it.type === 'match') return it.pairs.map(p => p.join('，')).join('。');
  if (it.audioAfter) return it.audioAfter;
  if (it.given) return `${it.given} ${it.answer}`;
  const answer = String(it.answer ?? '');
  const sentence = it.text || it.prompt;
  if (sentence && /_{2,}/.test(sentence) && /[a-z]/i.test(answer) && !/[\u3400-\u9fff]/.test(answer)) return sentence.replace(/_{2,}/g, answer);
  return answer;
}
export function correctionTip(it, value) {
  if (it.type === 'match') return '先把每個英文和中文意思各念一次，再逐組配對。錯配的字會再練習。';
  if (it.type === 'build') return '對照正確句子的字序，留意主詞、動詞與後面的補充資訊，再跟讀完整句子。';
  if (it.type === 'input') return `把你的「${String(value ?? '')}」和正確答案逐字比對，留意拼字、漏字與動詞形式，再遮住答案重說一次。`;
  if (it.type === 'listen') return '重新聽一次原音，對照正解找出沒聽清楚的字，再用慢速跟讀。';
  return '先讀上方解析，找出正確答案的線索，再回頭比較你選的選項，最後遮住答案說一次。';
}
