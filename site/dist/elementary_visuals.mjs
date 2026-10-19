// elementary_visuals.mjs — 國小三至五年級單元的圖解：字母表、短長母音、數字重音、顏色分類、家族樹、天氣季節、節慶月曆、身體能力、標示地圖、標點、故事山。
const e = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fig = (title, label, body, note = '') => `<figure class="ev-figure" role="group" aria-label="${e(label)}"><figcaption><span aria-hidden="true">📊</span> ${e(title)}</figcaption>${body}${note ? `<p class="ev-note">${note}</p>` : ''}</figure>`;

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SOUNDS = { A: 'apple', B: 'bag', C: 'cat', D: 'dog', E: 'egg', F: 'fish', G: 'girl', H: 'hat', I: 'igloo', J: 'jam', K: 'kite', L: 'lion', M: 'milk', N: 'nest', O: 'ox', P: 'pig', Q: 'queen', R: 'rabbit', S: 'sun', T: 'ten', U: 'up', V: 'van', W: 'wet', X: 'box', Y: 'yes', Z: 'zebra' };
function alphabet(from, to) {
  const cells = LETTERS.map((L, i) => { const on = i >= from && i <= to; return `<li class="ev-letter${on ? ' on' : ''}"><b>${L}</b><b class="lc">${L.toLowerCase()}</b><small>${SOUNDS[L]}</small></li>`; }).join('');
  return fig(`26 個字母大小寫與字首聲音（本課：${LETTERS[from]}–${LETTERS[to]}）`, `字母表，強調 ${LETTERS[from]} 到 ${LETTERS[to]}`, `<ol class="ev-alpha">${cells}</ol>`, '亮色格是本課字母。X 在 box 裡發 /ks/，很少出現在字首。');
}
function letterPairs() {
  const pairs = [['b', 'd', 'bed', '先棒後肚 / 先肚後棒'], ['p', 'q', 'pig · queen', 'q 後面常跟 u'], ['m', 'n', 'man · net', 'm 兩個山、n 一個山'], ['n', 'u', 'nut · up', 'n 開口朝下、u 開口朝上']];
  return fig('長得像的字母對照', '容易混淆的字母對照表', `<div class="ev-pairs">${pairs.map(([a, b, w, tip]) => `<div class="ev-pair"><span class="ev-big">${a}</span><span aria-hidden="true">↔</span><span class="ev-big">${b}</span><p><b>${e(w)}</b><br><small>${e(tip)}</small></p></div>`).join('')}</div>`);
}
function numbersAndCommands() {
  const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  const cmds = [['🧍', 'Stand up.'], ['🪑', 'Sit down.'], ['📖', 'Open your book.'], ['📕', 'Close your book.'], ['🤫', 'Be quiet.'], ['✋', 'Raise your hand.']];
  return fig('數字 1–10 與教室指令', '數字一到十的點數圖與教室指令圖卡', `<ol class="ev-numbers">${nums.map((n, i) => `<li><b>${i + 1}</b><span class="ev-dots" aria-hidden="true">${'●'.repeat(i + 1)}</span><small>${n}</small></li>`).join('')}</ol><ul class="ev-tiles">${cmds.map(([i, t]) => `<li><span aria-hidden="true">${i}</span>${t}</li>`).join('')}</ul>`);
}
function colorsAndSorting() {
  const colors = [['red', '#e11d48'], ['orange', '#f97316'], ['yellow', '#facc15'], ['green', '#16a34a'], ['blue', '#2563eb'], ['purple', '#7c3aed'], ['pink', '#ec4899'], ['brown', '#92400e'], ['black', '#111827'], ['white', '#ffffff']];
  const groups = [['🎨 Colors', 'red · blue · green'], ['✏️ School things', 'pen · ruler · eraser'], ['🐾 Animals', 'cat · dog · bird']];
  return fig('顏色色票與字詞分類', '十種顏色色票與三個分類籃', `<ul class="ev-swatches">${colors.map(([n, h]) => `<li><span class="ev-swatch" style="background:${h}" aria-hidden="true"></span>${n}</li>`).join('')}</ul><div class="ev-sort">${groups.map(([g, w]) => `<div><b>${g}</b><small>${w}</small></div>`).join('')}</div>`, '分類練習：把新學的字放進正確的籃子（課綱 9-Ⅱ-1 字詞歸類）。');
}
function familyTree() {
  const box = (x, y, en, zh, icon) => `<g><rect x="${x - 58}" y="${y - 22}" width="116" height="44" rx="10" class="ev-node"/><text x="${x}" y="${y - 3}" text-anchor="middle" class="ev-t1">${icon} ${en}</text><text x="${x}" y="${y + 14}" text-anchor="middle" class="ev-t2">${zh}</text></g>`;
  const line = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ev-line"/>`;
  const svg = `<svg viewBox="0 0 520 250" class="ev-svg" role="img" aria-label="家族樹：祖父母、父母、兄弟姊妹與我"><title>家族樹</title>${line(150, 52, 370, 52)}${line(260, 52, 260, 100)}${line(150, 122, 370, 122)}${line(260, 122, 260, 150)}${line(110, 172, 410, 172)}${line(110, 172, 110, 190)}${line(260, 172, 260, 190)}${line(410, 172, 410, 190)}${box(150, 40, 'grandpa', '爺爺', '👴')}${box(370, 40, 'grandma', '奶奶', '👵')}${box(150, 110, 'father', '爸爸', '👨')}${box(370, 110, 'mother', '媽媽', '👩')}${box(110, 212, 'brother', '哥哥／弟弟', '👦')}${box(260, 212, 'me', '我', '⭐')}${box(410, 212, 'sister', '姊姊／妹妹', '👧')}</svg>`;
  return fig('我的家族樹', '家族樹圖', svg, '男生用 he（father、brother、grandpa），女生用 she（mother、sister、grandma）。');
}
function animalSort() {
  const cols = [['🏠 Pets 寵物', ['🐱 cat', '🐶 dog', '🐹 hamster']], ['🚜 Farm 農場', ['🐮 cow', '🐷 pig', '🐔 chicken']], ['🦁 Zoo 動物園', ['🦁 lion', '🐘 elephant', '🐵 monkey']]];
  return fig('動物分類表與喜好問答', '寵物、農場、動物園三欄分類', `<div class="ev-cols">${cols.map(([h, items]) => `<div><b>${h}</b><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('')}</div><p class="ev-qa"><span>Do you like cats? <b class="ev-up">↗</b></span><span>Yes, I do. ✅ / No, I don’t. ❌</span></p>`);
}
function shortVowels() {
  const rows = [['a', '/æ/', 'cat · map · hat', '🐱'], ['e', '/e/', 'bed · pen · ten', '🛏️'], ['i', '/ɪ/', 'pig · sit · big', '🐷'], ['o', '/ɑ/', 'dog · hot · box', '🐶'], ['u', '/ʌ/', 'cup · bus · sun', '☕']];
  const blend = ['c', 'a', 't'];
  return fig('五個短母音與 CVC 拼讀', '短母音對照表與拼讀步驟', `<div class="ev-vowels">${rows.map(([v, ipa, w, i]) => `<div><span class="ev-big">${v}</span><b>${ipa}</b><small>${i} ${w}</small></div>`).join('')}</div><div class="ev-blend" aria-label="c a t 拼成 cat">${blend.map(x => `<span>${x}</span>`).join('<i aria-hidden="true">+</i>')}<i aria-hidden="true">→</i><strong>cat 🐱</strong></div>`, '子音＋短母音＋子音（CVC）：先找中間的母音，再把三個聲音連起來。');
}
function teenTy() {
  const pair = (a, b, an, bn) => `<div class="ev-stress"><div><b>${an}</b><span class="ev-syl"><i>${a[0]}</i><i class="hi">${a[1]}</i></span><small>重音在後 · 尾音 n 清楚</small></div><div><b>${bn}</b><span class="ev-syl"><i class="hi">${b[0]}</i><i>${b[1]}</i></span><small>重音在前</small></div></div>`;
  return fig('-teen 與 -ty 的重音長條', '十三與三十等數字的重音對照', pair(['thir', 'TEEN'], ['THIR', 'ty'], '13', '30') + pair(['fif', 'TEEN'], ['FIF', 'ty'], '15', '50') + pair(['eigh', 'TEEN'], ['EIGH', 'ty'], '18', '80'), '較高的長條代表重音：聽到後半較重較長就是 -teen。');
}
function foodDrinks() {
  return fig('a / an 與 some：食物飲料分類', '可數食物與飲料分類圖', `<div class="ev-cols"><div><b>🥪 a / an + 一個</b><ul><li>a sandwich</li><li>a hamburger</li><li>an egg</li><li>an apple</li></ul></div><div><b>🥛 some + 飲料</b><ul><li>some milk</li><li>some juice</li><li>some water</li><li>some tea</li></ul></div><div><b>💬 禮貌回答</b><ul><li>Yes, please. ✅</li><li>No, thank you. 🙏</li></ul></div></div>`);
}
function weatherSeasons() {
  const w = [['☀️', 'sunny'], ['☁️', 'cloudy'], ['🌧️', 'rainy'], ['💨', 'windy'], ['🥵', 'hot'], ['🥶', 'cold']];
  const s = [['🌸', 'spring', '3–5 月'], ['🌞', 'summer', '6–8 月'], ['🍁', 'fall', '9–11 月'], ['⛄', 'winter', '12–2 月']];
  return fig('天氣圖示與四季（臺灣）', '六種天氣圖示與四季月份', `<ul class="ev-tiles">${w.map(([i, t]) => `<li><span aria-hidden="true">${i}</span>It’s ${t}.</li>`).join('')}</ul><ol class="ev-seasons">${s.map(([i, t, m]) => `<li><span aria-hidden="true">${i}</span><b>${t}</b><small>${m}</small></li>`).join('')}</ol>`, '月份為北半球常見劃分，實際氣候依地區不同。');
}
function weekFestivals() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const fest = [['1–2 月', '🧧', 'Chinese New Year', 'Happy New Year!'], ['5–6 月', '🐉', 'Dragon Boat Festival', 'rice dumplings'], ['9–10 月', '🥮', 'Moon Festival', 'mooncakes'], ['10/31', '🎃', 'Halloween', 'Trick or treat!'], ['12/25', '🎄', 'Christmas', 'Merry Christmas!']];
  return fig('一週七天與國內外節慶時間軸', '星期列與節慶時間軸', `<ol class="ev-week">${days.map((d, i) => `<li class="${i > 4 ? 'weekend' : ''}">${d}</li>`).join('')}</ol><ol class="ev-timeline">${fest.map(([m, i, n, x]) => `<li><span class="ev-when">${m}</span><span aria-hidden="true">${i}</span><b>${n}</b><small>${x}</small></li>`).join('')}</ol>`, '農曆節日每年對應的國曆日期不同，圖中為大約月份。');
}
function bodyCan() {
  const parts = [['🙂', 'head'], ['👁️', 'eyes'], ['👂', 'ears'], ['👃', 'nose'], ['👄', 'mouth'], ['💪', 'arms'], ['✋', 'hands'], ['🦵', 'legs · knees'], ['🦶', 'feet']];
  return fig('身體部位與 can / can’t 能力表', '身體部位圖卡與能力對照', `<ul class="ev-tiles">${parts.map(([i, t]) => `<li><span aria-hidden="true">${i}</span>${t}</li>`).join('')}</ul><table class="ev-table"><thead><tr><th scope="col"></th><th scope="col">🏊 swim</th><th scope="col">🦘 jump</th><th scope="col">🕊️ fly</th></tr></thead><tbody><tr><th scope="row">🐟 fish</th><td>✅</td><td>❌</td><td>❌</td></tr><tr><th scope="row">🦘 kangaroo</th><td>❌</td><td>✅</td><td>❌</td></tr><tr><th scope="row">🐦 bird</th><td>❌</td><td>✅</td><td>✅</td></tr></tbody></table>`, '一般而言的能力；有些鳥會游泳，例如鴨子和企鵝。');
}
function magicE() {
  const pairs = [['cap', 'cape'], ['kit', 'kite'], ['hop', 'hope'], ['cub', 'cube']];
  const teams = [['ee / ea', '/iː/', 'tree · eat'], ['ai / ay', '/eɪ/', 'rain · play'], ['oa', '/oʊ/', 'boat · coat']];
  return fig('Magic e 變身表與母音組合', '短母音加 e 變成長母音的對照，與母音組合表', `<div class="ev-magic">${pairs.map(([a, b]) => `<div><span>${a}</span><i aria-hidden="true">+ e →</i><strong>${b}</strong></div>`).join('')}</div><table class="ev-table"><thead><tr><th scope="col">組合</th><th scope="col">聲音</th><th scope="col">例字</th></tr></thead><tbody>${teams.map(r => `<tr>${r.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table>`, '例外很常見（bread、head 的 ea 唸 /e/）；不確定時查字典音標（課綱 7-Ⅲ-2）。');
}
function introWeb() {
  const leaf = [['🏷️', 'Name', 'I’m Mia.'], ['🎂', 'Age', 'I’m eleven.'], ['❤️', 'Likes', 'I like drawing.'], ['⭐', 'Can', 'I can play the piano.'], ['🏠', 'Family', 'I have a brother.'], ['👫', 'Friend', 'This is Ken. He likes soccer.']];
  return fig('自我介紹心智圖', '以「我」為中心的自我介紹六個方向', `<div class="ev-web"><div class="ev-hub">🙋 Me</div>${leaf.map(([i, h, s]) => `<div class="ev-leaf"><span aria-hidden="true">${i}</span><b>${h}</b><small>${s}</small></div>`).join('')}</div>`, '介紹別人時換成 he / she，動詞記得加 s（likes、has）。');
}
function ingRules() {
  const r = [['一般動詞', 'read → reading', 'play → playing'], ['字尾不發音 e', 'make → making', 'write → writing'], ['短母音＋一個子音', 'run → running', 'swim → swimming']];
  return fig('-ing 拼字決策表', '動詞加 ing 的三種規則', `<ol class="ev-flow"><li>看字尾是 e 嗎？</li><li>是短母音＋一個子音嗎？</li><li>都不是 → 直接加 ing</li></ol><table class="ev-table"><thead><tr><th scope="col">規則</th><th scope="col">例一</th><th scope="col">例二</th></tr></thead><tbody>${r.map(x => `<tr>${x.map(y => `<td>${y}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="ev-formula">am / is / are ＋ V-ing ＝ 正在做</p>`);
}
function campusMap() {
  const signs = [['🚪', 'EXIT', '出口'], ['🚻', 'RESTROOM', '廁所'], ['📚', 'LIBRARY', '圖書館'], ['🚫🏃', 'NO RUNNING', '禁止奔跑'], ['🤫', 'KEEP QUIET', '保持安靜'], ['👉', 'PUSH / PULL', '推／拉']];
  return fig('校園標示與位置地圖', '校園標示圖卡與一列教室位置圖', `<ul class="ev-tiles ev-signs">${signs.map(([i, t, z]) => `<li><span aria-hidden="true">${i}</span><b>${t}</b><small>${z}</small></li>`).join('')}</ul><div class="ev-row" aria-label="Art Room、Computer Lab、Science Lab 由左到右排列"><span>🎨 Art Room</span><span class="hi">💻 Computer Lab</span><span>🔬 Science Lab</span></div><p class="ev-note">The computer lab is <b>between</b> the art room and the science lab. It is <b>next to</b> the science lab.</p>`);
}
function punctuation() {
  const marks = [['A', '大寫', '句首、I、人名地名、星期月份、節日'], ['.', '句號', '敘述句結尾'], ['?', '問號', '問句結尾'], ['!', '驚嘆號', '驚訝、興奮'], [',', '逗號', '列舉、稱呼後停頓']];
  return fig('大寫與標點符號工作表', '五種書寫符號的用途', `<table class="ev-table"><thead><tr><th scope="col">符號</th><th scope="col">名稱</th><th scope="col">什麼時候用</th></tr></thead><tbody>${marks.map(([m, n, u]) => `<tr><td class="ev-big">${m}</td><td>${n}</td><td>${u}</td></tr>`).join('')}</tbody></table><p class="ev-annot"><mark>O</mark>n <mark>M</mark>onday, <mark>A</mark>my and <mark>I</mark> ate apples<mark>,</mark> grapes<mark>,</mark> and cake<mark>.</mark></p>`);
}
export function storyMountain() {
  const pts = [[40, 200, 'First', '開始：人物、地點'], [170, 120, 'Next', '問題出現'], [300, 50, 'Then', '最緊張的時刻'], [440, 170, 'Finally', '問題解決、結局']];
  const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  const svg = `<svg viewBox="0 0 520 240" class="ev-svg" role="img" aria-label="故事山：First、Next、Then、Finally 四個階段"><title>故事山</title><path d="${path}" class="ev-path"/>${pts.map(([x, y, a, b]) => `<g><circle cx="${x}" cy="${y}" r="9" class="ev-dot"/><text x="${x}" y="${y - 18}" text-anchor="middle" class="ev-t1">${a}</text><text x="${x}" y="${y + 28}" text-anchor="middle" class="ev-t2">${b}</text></g>`).join('')}</svg>`;
  return fig('故事山與事件排序', '故事山圖', svg + `<ol class="ev-flow"><li>📕 看書名、封面先猜</li><li>👀 找人物、地點、問題</li><li>🔁 用 First → Next → Then → Finally 重述</li></ol>`);
}

const ROUTES = [
  [/字母 A–M/, () => alphabet(0, 12)], [/字母 N–Z/, () => alphabet(13, 25) + letterPairs()], [/教室用語與數字/, numbersAndCommands],
  [/顏色與文具/, colorsAndSorting], [/我的家人/, familyTree], [/動物與喜好/, animalSort], [/短母音拼讀/, shortVowels],
  [/數字 11–100/, teenTy], [/食物與飲料/, foodDrinks], [/天氣與季節/, weatherSeasons], [/星期與國內外節慶/, weekFestivals],
  [/身體與能力/, bodyCan], [/長母音與 Magic e/, magicE], [/介紹自己、家人與朋友/, introWeb], [/現在進行式：你在做什麼/, ingRules],
  [/校園標示與位置/, campusMap], [/大寫與標點/, punctuation], [/繪本故事與事件排序/, storyMountain]
];
export function renderElementaryVisual(title = '') {
  const hit = ROUTES.find(([re]) => re.test(String(title)));
  return hit ? `<div class="ev-wrap">${hit[1]()}</div>` : '';
}
