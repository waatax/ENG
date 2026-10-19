// One browser-local learning record shared by all catalog teaching formats.
import { learningCatalog, domains } from './learning_catalog.mjs';
import { points as core } from './knowledge_content.mjs';
import { foundations } from './knowledge_foundations.mjs';
import { standardsPoints } from './knowledge_standards.mjs';
export const journeyCatalog = learningCatalog([...foundations.slice(0,2), ...core, foundations[2], ...standardsPoints]);
const KEY = 'english-quest-journey-v1';
const DAY = 86400000;
export function createJourney(storage, now = () => Date.now()) {
  let records = {}, warning = '';
  const valid = new Set(journeyCatalog.map(c => c.link));
  try {
    const saved = JSON.parse(storage.getItem(KEY) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      for (const [route,r] of Object.entries(saved)) if (valid.has(route) && r && typeof r === 'object') {
        records[route] = {saved:r.saved === true, visited:Number.isFinite(r.visited)?r.visited:0,
          reviewed:Number.isFinite(r.reviewed)?r.reviewed:0, due:Number.isFinite(r.due)?r.due:0,
          step:Number.isInteger(r.step)?Math.max(0,Math.min(3,r.step)):0};
      }
    }
  } catch { warning = '無法讀取學習紀錄；本次仍可使用。'; }
  function write(route, change) {
    if (!valid.has(route)) return false;
    records[route] = {...records[route], ...change};
    try { storage.setItem(KEY, JSON.stringify(records)); warning = ''; }
    catch { warning = '無法儲存；本次紀錄只保留到關閉頁面。'; }
    return true;
  }
  return {
    get warning(){return warning;}, get records(){return records;},
    visit(route){return write(route,{visited:now()});},
    toggle(route){return write(route,{saved:!records[route]?.saved});},
    recall(route, remembered){
      const previous=records[route];
      const step = remembered && previous?.reviewed ?
        (now()>=previous.due?Math.min((previous.step||0)+1,3):previous.step||0) : 0;
      return write(route,{step,reviewed:now(),due:now()+[1,3,7,14][step]*DAY});
    },
    list(mode){return journeyCatalog.filter(c => mode==='saved'?records[c.link]?.saved:
      mode==='due'?records[c.link]?.due>0 && records[c.link].due<=now():records[c.link]?.visited)
      .sort((a,b)=>mode==='due'?(records[a.link].due-records[b.link].due):
        ((records[b.link]?.visited||0)-(records[a.link]?.visited||0)));}
  };
}
const storage = {getItem:key=>globalThis.localStorage?.getItem(key),setItem:(key,value)=>{
  if(!globalThis.localStorage)throw new Error('Storage unavailable');
  globalThis.localStorage.setItem(key,value);
}};
export const journey = createJourney(storage);
export const escapeJourney = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function journeyHome() {
  const recent=journey.list('recent'), due=journey.list('due'), saved=journey.list('saved');
  const links = items => items.slice(0,6).map(c=>`<li><a href="${c.link}">${escapeJourney(c.title)}</a><small>${escapeJourney(c.stage)} · ${escapeJourney(c.kind)}</small></li>`).join('');
  return `<section class="journey-home" aria-labelledby="journey-title"><div class="journey-heading"><div><p class="eyebrow">你的學習工作台</p><h2 id="journey-title">每次回來，都有下一步</h2></div>${recent[0]?`<a class="btn primary" href="${recent[0].link}">接續：${escapeJourney(recent[0].title)} →</a>`:''}</div><div class="journey-columns"><section><h3>今天回想 · ${due.length}</h3>${due.length?`<ul>${links(due)}</ul>`:'<p>在教材頁完成回想檢核後，這裡會提醒你再次複習。</p>'}</section><section><h3>我的收藏 · ${saved.length}</h3>${saved.length?`<ul>${links(saved)}</ul>`:'<p>收藏想學的教材，下次從這裡接續。</p>'}</section><section><h3>最近學習</h3>${recent.length?`<ul>${links(recent)}</ul>`:'<p>從下方選一條學習路徑，先弄懂一個觀念。</p>'}</section></div><details><summary>查看全部收藏與複習安排</summary>${saved.length?`<ul>${saved.map(c=>`<li><a href="${c.link}">${escapeJourney(c.title)}</a></li>`).join('')}</ul>`:''}<ul>${journeyCatalog.filter(c=>journey.records[c.link]?.due).sort((a,b)=>journey.records[a.link].due-journey.records[b.link].due).map(c=>`<li><a href="${c.link}">${escapeJourney(c.title)}</a> · ${new Date(journey.records[c.link].due).toLocaleDateString('zh-TW')}</li>`).join('')}</ul><p>依自評安排 1、3、7、14 天後再回想；這是可調整的學習建議，不是程度評分。紀錄保存在此瀏覽器。</p></details><p class="small" role="status">${escapeJourney(journey.warning)}</p></section>`;
}
export function learningPaths() {
  const tools = [{link:'#phonics',title:'自然拼讀：先建立聲音與字母連結'},
    {link:'#wordaudio',title:'單字 MP3：聽讀、跟讀與回想'}];
  const paths = [
    ['第一句到完整表達','先建立句子骨架，再描述日常與時間。',['#knowledge/be-sentences','#grammar/be-do','#grammar/present-past','#grammar/sentence']],
    ['聲音到字詞','從聲音辨識開始，再把字詞放回句子。',['#phonics','#unit/g7-s1-u3','#chapter/jhs/j6','#wordaudio']],
    ['文法到閱讀','認清句子關係，再找文章的證據與推論。',['#grammar/sentence','#grammar/perfect',...journeyCatalog.filter(c=>c.domain==='reading').slice(0,2).map(c=>c.link)]],
    ['生活到考試應用','先在情境中運用，再整合能力練習。',['#unit/g6-s1-u3','#chapter/voc/v5','#chapter/jhs/j7','#chapter/intl/toeic']]
  ];
  return `<section class="learning-paths" aria-labelledby="paths-title"><p class="eyebrow">不知道從哪開始？</p><h2 id="paths-title">選一條路徑，按自己的步調前進</h2><div class="path-grid">${paths.map(([title,desc,routes],i)=>`<article class="path-card"><span class="path-number">0${i+1}</span><h3>${title}</h3><p>${desc}</p><ol>${routes.map(route=>[...journeyCatalog,...tools].find(c=>c.link===route)).filter(Boolean).map(c=>`<li><a href="${c.link}">${escapeJourney(c.title)}</a>${journey.records[c.link]?.reviewed?' <small>已回想</small>':''}</li>`).join('')}</ol></article>`).join('')}</div><p class="small">路徑為本站建議，可跳過熟悉的主題或回頭補強；學段標籤不限制學習順序。</p><details><summary>搭配字詞、聽讀與英文教材練習</summary><div class="learning-actions"><a class="btn" href="#wordaudio">單字 MP3 跟讀</a><a class="btn" href="mnemonics/">國語聯想字卡</a><a class="btn" href="#affixes">詞根與構詞</a><a class="btn" href="#schoolwords">學校字詞</a><a class="btn" href="EN/">English Academy</a><a class="btn" href="#phonics">自然拼讀</a></div></details></section>`;
}
export function relatedLessons(entry) {
  return journeyCatalog.filter(c=>c.link!==entry.link && c.domain===entry.domain)
    .sort((a,b)=>Number(b.stage===entry.stage)-Number(a.stage===entry.stage)).slice(0,3);
}
export function journeyDomain(entry) {return domains.find(d=>d[0]===entry.domain)?.[1] || '英語學習';}
