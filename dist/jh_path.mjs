import {jhUnits} from './jh_assets.mjs';
import {SEMESTERS} from './quest/semesters.mjs';
import {JH_SKILLS} from './jh_path_content.mjs?v=jh20261126';
import {escapeHTML as esc, scheduleRecall} from './recall.mjs';
import {speak, stopAudio} from './audio.mjs';

export const JH_PATH_KEY = 'eq_jh_path_v1';
export const JH_TERMS = SEMESTERS.filter(term => term.group === 'junior');
export const JH_TERM_CODES = ['7上','7下','8上','8下','9上','9下'];
export const JH_TARGETS = jhUnits.map(unit => ({
  id: unit.unitId, title: unit.title, term: JH_TERMS[JH_TERM_CODES.indexOf(unit.termCode)].id,
  ...JH_SKILLS[unit.unitId]
}));

const targets = new Map(JH_TARGETS.map(unit => [unit.id, unit]));
const DAY = 86_400_000;
const goals = {school:'跟上學校進度',cap:'國中教育會考',gept:'全民英檢初級'};
const isPick = value => Number.isInteger(value) && value >= 0 && value <= 2;
const examGoals = ['cap','gept'];
const validTally = (right,total) => Number.isInteger(right) && Number.isInteger(total) && total > 0 && total <= 100 && right >= 0 && right <= total;
const validExam = row => examGoals.includes(row?.goal) && typeof row.label === 'string' && row.label.trim() &&
  row.label.length <= 60 && validTally(row.listen,row.listenTotal) && validTally(row.read,row.readTotal) && Number.isFinite(row.at);
const dateLabel = at => new Date(at).toLocaleString('zh-TW', {month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});
function browserStorage() { try { return globalThis.localStorage; } catch { return null; } }

export function readJhPath(storage) {
  let saved;
  try { saved = JSON.parse(storage?.getItem(JH_PATH_KEY) || '{}'); } catch {}
  const units = {};
  for (const [id, record] of Object.entries(saved?.units || {})) {
    if (!targets.has(id) || !isPick(record?.practice)) continue;
    const review = Number.isFinite(record.review?.due) && Number.isFinite(record.review?.reviewed) &&
      Number.isInteger(record.review?.step) ? record.review : null;
    units[id] = {
      practice:record.practice,
      readyAt:Number.isFinite(record.readyAt) ? record.readyAt : 0,
      first:['correct','incorrect','assisted'].includes(record.first) ? record.first : '',
      last:isPick(record.last) ? record.last : null,
      review
    };
  }
  return {
    term:JH_TERMS.some(term => term.id === saved?.term) ? saved.term : JH_TERMS[0].id,
    goal:Object.hasOwn(goals,saved?.goal) ? saved.goal : 'school',
    units,
    exams:Array.isArray(saved?.exams) ? saved.exams.filter(validExam).slice(-12) : []
  };
}

function saveJhPath(storage, state) {
  if (!storage?.setItem) return false;
  try { storage.setItem(JH_PATH_KEY, JSON.stringify(state)); return true; } catch { return false; }
}

export function jhPhase(record, now = Date.now()) {
  if (!record?.readyAt) return 'practice';
  return now >= (record.review?.due ?? record.readyAt) ? 'transfer' : 'wait';
}

export function recommendJhTarget(state, termId, now = Date.now()) {
  const units = JH_TARGETS.filter(unit => unit.term === termId);
  const pending = units.filter(unit => jhPhase(state.units[unit.id], now) === 'transfer');
  const missed = pending.find(unit => state.units[unit.id]?.last > 0);
  return missed || pending[0] || units.find(unit => (state.units[unit.id]?.practice ?? 0) > 0) ||
    units.find(unit => !state.units[unit.id]) || units[0];
}

export function submitJhAnswer(storage, id, form, pick, assisted = false, now = Date.now()) {
  if (!targets.has(id) || !isPick(pick) || !['practice','transfer'].includes(form)) return null;
  const state = readJhPath(storage);
  const previous = state.units[id] || {first:'',last:null,review:null,readyAt:0};
  const correct = pick === 0;
  if (form === 'transfer' && jhPhase(previous, now) !== 'transfer') return null;
  const record = form === 'practice' ?
    {...previous,practice:pick,readyAt:previous.readyAt || (correct ? now + DAY : 0)} :
    {...previous,last:pick,first:previous.first || (assisted ? 'assisted' : correct ? 'correct' : 'incorrect'),
      review:scheduleRecall(previous.review, correct && !assisted ? 'good' : 'again', now)};
  state.units[id] = record;
  return {record,saved:saveJhPath(storage,state),correct};
}

export function recordJhExam(storage, entry) {
  if (!validExam(entry)) return false;
  const state = readJhPath(storage);
  return saveJhPath(storage,{...state,exams:[...state.exams,entry].slice(-12)});
}

function examLog(goal, exams) {
  const rows = exams.filter(row => row.goal === goal).slice(-2).reverse();
  const latest = rows[0];
  const direction = !latest ? '' : latest.listen / latest.listenTotal === latest.read / latest.readTotal ?
    '聽讀這次的答對比例相同，先重做一道能說出錯因的題。' :
    latest.listen / latest.listenTotal < latest.read / latest.readTotal ?
      '這一份卷的聽力答對比例較低。回到學期聽力關，練抓時間、地點或動作。' :
      '這一份卷的閱讀答對比例較低。回到閱讀關，練指出每題的原文線索。';
  return `<details class="jhp-exam-log" ${latest ? 'open' : ''}><summary>記錄一份練習卷的聽讀結果</summary>
    <form data-jhp-exam><label>試卷或樣題<input name="label" maxlength="60" required placeholder="例如：115 年試題"></label>
    <div class="jhp-tallies">${[['listen','聽力'],['read','閱讀']].map(([id,label]) => `<fieldset><legend>${label}</legend>
      <label>答對<input required type="number" name="${id}" min="0" max="100" inputmode="numeric"></label>
      <label>總題數<input required type="number" name="${id}Total" min="1" max="100" inputmode="numeric"></label></fieldset>`).join('')}</div>
    <button type="submit" class="btn quiet">儲存練習結果</button><p role="status" data-jhp-exam-status></p></form>
    ${latest ? `<ul>${rows.map(row => `<li><strong>${esc(row.label)}</strong> · 聽力 ${row.listen}/${row.listenTotal} · 閱讀 ${row.read}/${row.readTotal}</li>`).join('')}</ul><p>${direction}</p>` : ''}
    </details>`;
}

function examPanel(goal, term, exams) {
  if (goal === 'cap') return `<section class="jhp-exam"><h3>會考英語｜分開檢查閱讀與聽力</h3>
    <ol><li>先做本學期混合挑戰，找出最常漏掉的線索。</li><li>安排一次官方歷屆閱讀與聽力練習，依當年試卷說明操作，分開記錄答對題數。</li>
    <li>錯題回到對應技能重練，下一次換一個年度的試題再確認。</li></ol>
    <div class="jhp-actions"><a class="btn quiet" href="quest/#learn/sem-${term.id}">學期混合挑戰</a>
    <button type="button" class="btn quiet" data-start-quiz="true" data-quiz-cat="jhs" data-quiz-count="10">練習 10 題</button>
    <a class="btn quiet" href="https://cap.rcpet.edu.tw/">開啟會考官網</a></div>${examLog(goal,exams)}</section>`;
  if (goal === 'gept') return `<section class="jhp-exam"><h3>GEPT 初級｜聽讀與說寫</h3>
    <ol><li>聽讀先做官方練習題，將漏聽的時間、地點和短文證據分開訂正。</li><li>依官方題型練習朗讀、問答與簡短寫作，請同伴或老師核對資訊和表達。</li></ol>
    <details><summary>練一段口說與一則便條</summary><p>口說：你今天無法參加社團。用英文說明原因，並提議下一次見面的日期。</p>
    <p>寫作：寫便條邀請同學協助布置教室，交代日期、時間、集合地點與要帶的物品。</p>
    <details><summary>參考表達與檢查點</summary><p lang="en">I have a dentist appointment today. Can we meet after school on Thursday?</p>
    <p lang="en">Hi Ivy, can you help us decorate the classroom next Tuesday? Please meet me in Room 201 at 4:00. Bring some tape, please.</p>
    <p>聽者能否說出新的約定時間？讀者能否找到便條裡的四項資訊？</p></details></details>
    <a class="btn quiet" href="https://www.gept.org.tw/Exam_intro/t01_introduction.asp">GEPT 初級官方題型與練習題</a>${examLog(goal,exams)}</section>`;
  return `<section class="jhp-exam"><h3>把本學期的英文用出來</h3><p>到學期闖關練聽讀，再完成一份可開口或寫下來的生活任務。</p>
    <a class="btn quiet" href="quest/#learn/sem-${term.id}">學期闖關與作品</a></section>`;
}

function nextLabel(record, now) {
  if (!record) return '可先試一題';
  if (!record.readyAt) return '優先訂正';
  if (jhPhase(record,now) === 'transfer') return record.first ? '到期複習' : '可以做變式';
  if (!record.first) return '等候隔日變式';
  if (record.first !== 'correct' && record.last === 0 && record.review?.rating === 'good') return '熟題複習答對';
  return {correct:'首次變式答對',incorrect:'首次變式待加強',assisted:'已做輔助變式'}[record.first];
}

function skillView(unit, record, ui, now) {
  const available = jhPhase(record,now);
  const feedback = ui.feedback?.id === unit.id ? ui.feedback : null;
  const form = feedback?.form || (ui.practice || available !== 'transfer' ? 'practice' : 'transfer');
  const activity = unit[form];
  const aided = activity.listening && ui.transcript;
  const guide = `<details class="jhp-model" ${ui.guided ? 'open' : ''}><summary>${form === 'practice' ? '需要幫忙？先看解題示範' : '複習這個技能的規則'}</summary>
    <p>${esc(unit.rule)}</p><p lang="en">${esc(unit.example)}</p></details>`;
  if (!feedback && available === 'wait' && !ui.practice) {
    const due = record.review?.due ?? record.readyAt;
    return `<div class="jhp-task"><h3 id="jhp-task-title" tabindex="-1">${esc(unit.focus)}</h3>
      <p>${esc(nextLabel(record,now))}。下次可作答時間為 <strong>${dateLabel(due)}</strong>。</p>
      <p>${record.first ? '下次會複習同一道題目。可先練本學期其他技能。' : '隔一段時間後，會用另一個情境檢查同一個技能。'}</p>
      ${record.last !== null ? `<details><summary>回看上次變式的解說</summary>
        ${record.last > 0 ? `<p>你選了「${esc(unit.transfer.options[record.last][0])}」。${esc(unit.transfer.options[record.last][1])}</p>` : ''}
        <p><strong>${esc(unit.transfer.options[0][0])}</strong>。${esc(unit.transfer.options[0][1])}</p></details>` : ''}
      <details><summary>現在可做的開口或寫作練習</summary><p>${esc(unit.output)}</p></details>
      <button type="button" class="btn quiet" data-jhp-study>重練基礎題</button></div>`;
  }
  const idx = JH_TARGETS.indexOf(unit) + Number(form === 'transfer');
  const choices = activity.options.map((_, i) => (i + idx) % activity.options.length);
  const table = activity.table ? `<table class="jhp-table" lang="en"><thead><tr>${activity.table[0].map(cell => `<th scope="col">${esc(cell)}</th>`).join('')}</tr></thead>
    <tbody>${activity.table.slice(1).map(([label,...cells]) => `<tr><th scope="row">${esc(label)}</th>${cells.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  const media = activity.listening ?
    `<div class="jhp-actions"><button type="button" class="btn quiet" data-jhp-audio>播放音訊</button>
    ${!feedback && !aided ? '<button type="button" class="btn quiet" data-jhp-transcript>改看文字</button>' : ''}</div>
    <p role="status" data-jhp-audio-status>${esc(ui.audioStatus)}</p>
    ${aided || feedback ? `<p class="jhp-stimulus" lang="en">${esc(activity.text)}</p>` : ''}` :
    `<p class="jhp-stimulus" lang="en">${esc(activity.text)}</p>`;
  return `<div class="jhp-task"><p class="jhp-label">${form === 'practice' ? '基礎練習' : record?.first && !feedback ? '間隔複習' : '隔日變式'}</p>
    <h3 id="jhp-task-title" tabindex="-1">${esc(unit.focus)}</h3>${form === 'practice' ? guide : ''}
    <p>${esc(activity.prompt)}</p>${media}${table}
    ${feedback || ui.options ? `<div class="jhp-options" role="group" aria-label="作答選項">${choices.map(i => `<button type="button" class="btn quiet" data-jhp-answer="${i}" data-jhp-form="${form}" ${feedback || activity.listening && !aided && !ui.heard ? 'disabled' : ''}
      ${feedback && i === feedback.pick ? 'aria-current="true"' : ''} ${!/[㐀-鿿]/.test(activity.options[i][0]) ? 'lang="en"' : ''}>${esc(activity.options[i][0])}</button>`).join('')}</div>` :
      `<button type="button" class="btn quiet" data-jhp-options ${activity.listening && !aided && !ui.heard ? 'disabled' : ''}>想好了，顯示選項</button>`}
    ${feedback ? `<div class="jhp-feedback" tabindex="-1"><h4>${feedback.correct ? '答對了' : '來看你漏掉的線索'}</h4>
      ${feedback.correct ? '' : `<p>你選了「${esc(activity.options[feedback.pick][0])}」。${esc(activity.options[feedback.pick][1])}</p>`}
      <p><strong>${esc(activity.options[0][0])}</strong>。${esc(activity.options[0][1])}</p>
      ${activity.listening && feedback.assisted ? '<p>本題使用文字輔助，紀錄會標示作答方式。</p>' : ''}
      ${!feedback.saved ? '<p role="alert">此瀏覽器無法儲存，這次結果只在目前頁面顯示。</p>' : ''}
      ${form === 'practice' && !feedback.correct ? `<p>${esc(unit.rule)}</p><button type="button" class="btn primary" data-jhp-retry>蓋住解說，再答一次</button>` :
        '<button type="button" class="btn primary" data-jhp-next>練下一個技能</button>'}
      <details><summary>換你開口或寫一句</summary><p>${esc(unit.output)}</p></details></div>` : ''}
    </div>`;
}

function pathBody(state, ui, now) {
  const term = JH_TERMS.find(t => t.id === ui.term) || JH_TERMS[0];
  const units = JH_TARGETS.filter(unit => unit.term === term.id);
  const unit = units.find(item => item.id === ui.unit) || recommendJhTarget(state,term.id,now);
  return `<div class="jhp-intro"><div><p class="jhp-label">國一到國三</p><h2>今天從哪裡開始？</h2>
    <p>選一個學期和目標。先試一題，卡住時看示範。答對後隔一天，換一個情境確認。</p></div>
    <label>我的目標<select data-jhp-goal>${Object.entries(goals).map(([id,label]) => `<option value="${id}" ${ui.goal === id ? 'selected' : ''}>${label}</option>`).join('')}</select></label></div>
    <nav class="jhp-terms" aria-label="選擇學期">${JH_TERMS.map(t => {
      const targets = JH_TARGETS.filter(item => item.term === t.id);
      const confirmed = targets.filter(item => state.units[item.id]?.first === 'correct').length;
      return `<button type="button" data-jhp-term="${t.id}" aria-pressed="${t.id === term.id}"><strong>${esc(t.label)}</strong><span><span class="jhp-term-count">${confirmed} / ${targets.length}</span> 首次變式答對</span></button>`;
    }).join('')}</nav>
    <div class="jhp-workspace"><aside><h3>${esc(term.title)}</h3><p>${esc(term.prerequisite)}</p>
      <div class="jhp-skills">${units.map(item => `<button type="button" data-jhp-skill="${item.id}" aria-pressed="${item.id === unit.id}">
        <strong>${esc(item.title)}</strong><small>${esc(nextLabel(state.units[item.id],now))}</small></button>`).join('')}</div></aside>
      ${skillView(unit,state.units[unit.id],ui,now)}</div>
    ${examPanel(ui.goal,term,state.exams)}
    <p class="jhp-note">每學期提供核心技能取樣。此處分開記錄首次變式與熟題複習，作答紀錄保存在此瀏覽器。報考與成績判定以主辦單位為準。</p>
    <div class="jhp-actions"><a href="quest/#learn/s1">從字母與生活英文開始</a><a href="quest/#placement">做全站程度定位</a></div>`;
}

export function renderJhPath(storage = browserStorage(), now = Date.now()) {
  const {term,goal} = readJhPath(storage);
  return `<section class="jh-path" aria-label="六學期學習路線">${pathBody(readJhPath(storage),{term,goal},now)}</section>`;
}

export function bindJhPath(root, storage = browserStorage()) {
  const el = root.querySelector('.jh-path');
  if (!el) return;
  const saved = readJhPath(storage);
  const ui = {term:saved.term,goal:saved.goal,unit:'',audioStatus:''};
  let generation = 0;
  const findUnit = () => targets.get(ui.unit) || recommendJhTarget(readJhPath(storage),ui.term);
  const repaint = (focus = '') => {
    el.innerHTML = pathBody(readJhPath(storage),ui,Date.now());
    if (!focus) return;
    const target = el.querySelector(focus);
    target?.focus({preventScroll:true});
    if (focus === '#jhp-task-title' || focus === '.jhp-feedback') target?.scrollIntoView({block:'nearest'});
  };
  function select(unit = '') {
    generation++;
    stopAudio();
    Object.assign(ui,{unit,feedback:null,practice:false,guided:false,transcript:false,heard:false,options:false,audioStatus:''});
  }
  el.addEventListener('change', event => {
    if (!event.target.matches('[data-jhp-goal]') || !Object.hasOwn(goals,event.target.value)) return;
    ui.goal = event.target.value;
    saveJhPath(storage,{...readJhPath(storage),term:ui.term,goal:ui.goal});
    repaint('[data-jhp-goal]');
  });
  el.addEventListener('submit', event => {
    if (!event.target.matches('[data-jhp-exam]')) return;
    event.preventDefault();
    const form = new FormData(event.target);
    const entry = {goal:ui.goal,label:String(form.get('label') || '').trim(),at:Date.now()};
    for (const field of ['listen','listenTotal','read','readTotal']) entry[field] = Number(form.get(field));
    let message = '已儲存這份聽讀練習結果。';
    if (!validExam(entry)) message = '請填寫卷別，並確認各項答對題數不超過總題數。';
    else if (recordJhExam(storage,entry)) repaint('[data-jhp-exam] button');
    else message = '此瀏覽器目前無法儲存練習結果。';
    el.querySelector('[data-jhp-exam-status]').textContent = message;
  });
  el.addEventListener('click', event => {
    const b = event.target.closest('button');
    if (!b || b.disabled) return;
    const {jhpTerm,jhpSkill,jhpAnswer,jhpForm} = b.dataset;
    if (jhpTerm || jhpSkill) {
      if (jhpTerm) ui.term = jhpTerm;
      select(jhpSkill);
      saveJhPath(storage,{...readJhPath(storage),term:ui.term,goal:ui.goal});
      repaint(jhpTerm ? `[data-jhp-term="${jhpTerm}"]` : '#jhp-task-title');
    } else if ('jhpStudy' in b.dataset || 'jhpRetry' in b.dataset) {
      select(findUnit().id);
      ui.practice = true;
      ui.guided = 'jhpRetry' in b.dataset;
      repaint('#jhp-task-title');
    } else if ('jhpNext' in b.dataset) {
      const current = findUnit();
      const list = JH_TARGETS.filter(unit => unit.term === ui.term);
      select(list[(list.indexOf(current) + 1) % list.length].id);
      repaint('#jhp-task-title');
    } else if ('jhpOptions' in b.dataset) {
      ui.options = true;
      ui.guided = false;
      repaint('[data-jhp-answer]');
    } else if (jhpAnswer !== undefined) {
      if (ui.feedback) return;
      const unit = findUnit();
      const activity = unit[jhpForm];
      if (activity.listening && !ui.heard && !ui.transcript) return;
      const result = submitJhAnswer(storage,unit.id,jhpForm,Number(jhpAnswer),ui.transcript);
      if (!result) { repaint('#jhp-task-title'); return; }
      ui.unit = unit.id;
      ui.feedback = {...result,id:unit.id,form:jhpForm,pick:Number(jhpAnswer),assisted:ui.transcript};
      repaint('.jhp-feedback');
    } else if ('jhpTranscript' in b.dataset) {
      generation++;
      stopAudio();
      ui.transcript = true;
      ui.audioStatus = '已開啟逐字稿，這次會記為文字輔助。';
      repaint('#jhp-task-title');
    } else if ('jhpAudio' in b.dataset) {
      const unit = findUnit();
      const form = ui.feedback?.form || (ui.practice ? 'practice' : jhPhase(readJhPath(storage).units[unit.id]) === 'transfer' ? 'transfer' : 'practice');
      const request = ++generation;
      const status = el.querySelector('[data-jhp-audio-status]');
      if (status) status.textContent = '正在播放…';
      const finish = ok => {
        if (request !== generation || !el.isConnected) return;
        if (ok) ui.heard = true;
        ui.audioStatus = ok ? '已播完。' : '無法播完音訊，可重試或改看文字。';
        repaint('[data-jhp-audio]');
      };
      if (typeof globalThis.speechSynthesis?.speak !== 'function') { finish(false); return; }
      speak(unit[form].text,{lang:'en-US',onEnd:() => finish(true),onError:() => finish(false)});
    }
  });
}
