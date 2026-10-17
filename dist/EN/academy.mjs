import {tracks} from './content.mjs';
import {examFrameworks, examWordAndPhraseSets, examSubtopicDrills} from './exam_curriculum.mjs';

const main=document.querySelector('main'),status=document.querySelector('#audio-status'),toggle=document.querySelector('#listen-toggle');
const KEY='english-quest-academy-v1';
const lessonTotal=tracks.reduce((n,t)=>n+t.lessons.length,0);
const wordTotal=tracks.reduce((n,t)=>n+t.lessons.reduce((m,l)=>m+l.words.length,0),0);
const studioWordTotal=examWordAndPhraseSets.reduce((n,s)=>n+s.items.length,0);
const questionTotal=tracks.reduce((n,t)=>n+t.lessons.reduce((m,l)=>m+l.questions.length,0),0);

let saved={
  completed:[],
  wrong:[],
  notes:{},
  position:{},
  known:[],
  bookmarks:[],
  spaced:{},
  drillAnswered:{},
  drillWrong:[],
  audioMode:'word_def_ex',
  recallMask:false,
  theme:'light',
  scale:1,
  rate:1
};

try{
  const s=JSON.parse(localStorage.getItem(KEY));
  if(s&&typeof s==='object')saved={...saved,...s};
  if(!Array.isArray(saved.completed))saved.completed=[];
  if(!Array.isArray(saved.wrong))saved.wrong=[];
  if(!saved.notes||typeof saved.notes!=='object'||Array.isArray(saved.notes))saved.notes={};
  if(!saved.position||typeof saved.position!=='object'||Array.isArray(saved.position))saved.position={};
  if(!Array.isArray(saved.known))saved.known=[];
  if(!Array.isArray(saved.bookmarks))saved.bookmarks=[];
  if(!saved.spaced||typeof saved.spaced!=='object'||Array.isArray(saved.spaced))saved.spaced={};
  if(!saved.drillAnswered||typeof saved.drillAnswered!=='object'||Array.isArray(saved.drillAnswered))saved.drillAnswered={};
  if(!Array.isArray(saved.drillWrong))saved.drillWrong=[];
  if(!['word_def_ex','word_def','word_def_3x','think_pause'].includes(saved.audioMode))saved.audioMode='word_def_ex';
  saved.completed=saved.completed.filter(x=>typeof x==='string');
  saved.wrong=saved.wrong.filter(x=>typeof x==='string');
  saved.known=saved.known.filter(x=>typeof x==='string');
  saved.bookmarks=saved.bookmarks.filter(x=>typeof x==='string');
  saved.drillWrong=saved.drillWrong.filter(x=>typeof x==='string');
}catch{}

let current=null,mode='learn',index=0,revealed=false,answer=null,question=0,playing=false,token=0,timer=null;
let activeVocabTrack='all',activeVocabKind='all',activeVocabSetId=examWordAndPhraseSets[0].id,activeVocabIndex=0;
let revealedMaskItems=new Set();
let activeDrillTrack='all',activeDrillSubtopic='all',activeDrillIndex=0,drillHintShown={},drillMultiSelection={};
let activeDialoguePlaying=-1;

const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const id=(t,i)=>`${t.id}/${i}`;
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved));}catch{status.textContent='Progress cannot be saved in this browser. You can keep learning.';}};

function applyDisplayPreferences(){
  const theme=['light','warm','dark'].includes(saved.theme)?saved.theme:'light';
  const scale=[0.95,1,1.12].includes(Number(saved.scale))?Number(saved.scale):1;
  document.documentElement.setAttribute('data-en-theme',theme);
  document.documentElement.style.fontSize=`calc(17px * ${scale})`;
  document.querySelectorAll('[data-theme-set]').forEach(b=>b.classList.toggle('active',b.dataset.themeSet===theme));
  document.querySelectorAll('[data-scale-set]').forEach(b=>b.classList.toggle('active',Number(b.dataset.scaleSet)===scale));
}

function stop(clear=true){
  token++;
  clearTimeout(timer);
  playing=false;
  activeDialoguePlaying=-1;
  window.speechSynthesis?.cancel();
  if(toggle)toggle.textContent='Listen';
  document.querySelectorAll('.word.active,.dialogue-line.active').forEach(el=>el.classList.remove('active'));
  if(clear)status.textContent='';
}

function speak(text,done,version){
  const engine=window.speechSynthesis;
  if(!engine){
    stop(false);
    status.textContent='Speech is unavailable. Read the definition and example on each card.';
    return;
  }
  const u=new SpeechSynthesisUtterance(text);
  u.lang='en-US';
  u.rate=[.75,1,1.25].includes(Number(saved.rate))?Number(saved.rate):1;
  const voices=engine.getVoices();
  const voice=voices.find(v=>v.lang==='en-US')||voices.find(v=>v.lang.startsWith('en'));
  if(!voice){
    stop(false);
    status.textContent='No English voice is available. Enable an English voice on your device, then try again.';
    return;
  }
  u.voice=voice;
  u.onend=()=>{if(version===token)done();};
  u.onerror=()=>{if(version===token){stop(false);status.textContent='Speech stopped. Tap Listen to try again.';}};
  engine.speak(u);
}

function buildAudioSpeechText(term,def,example){
  if(saved.audioMode==='word_def')return `${term}. Meaning: ${def}.`;
  if(saved.audioMode==='word_def_3x')return `${term}. ${def}. ${term}. ${def}. ${term}. ${def}. ${example}`;
  return `${term}. ${def}. ${example}`;
}

function listen(at=index,single=false){
  if(!current){
    const parts=location.hash.slice(1).split('/');
    if(parts[0]==='vocab'){
      listenStudioSet(activeVocabIndex,single);
      return;
    }
    status.textContent='Choose a lesson or audio set, then tap Listen.';
    return;
  }
  stop();
  index=at;
  playing=true;
  toggle.textContent='Stop audio';
  const version=token;
  function next(){
    if(version!==token)return;
    const w=current.lesson.words[index];
    if(!w){
      stop(false);
      status.textContent='Set complete. Try the flashcards or check your understanding.';
      return;
    }
    saved.position[current.key]=index;
    persist();
    status.textContent=`${index+1} / ${current.lesson.words.length} · ${w[0]}`;
    document.querySelectorAll('[data-word]').forEach(el=>el.classList.toggle('active',Number(el.dataset.word)===index));
    const speechText=buildAudioSpeechText(w[0],w[1],w[2]);
    if(saved.audioMode==='think_pause'&&!single){
      speak(`${w[0]}.`,()=>{
        if(version!==token)return;
        timer=setTimeout(()=>{
          if(version!==token)return;
          speak(`${w[1]}. ${w[2]}`,()=>{
            index++;
            timer=setTimeout(next,900);
          },version);
        },1400);
      },version);
    }else{
      speak(speechText,()=>{
        if(single){
          stop(false);
          status.textContent='Finished. Tap Listen to continue the set.';
        }else{
          index++;
          timer=setTimeout(next,900);
        }
      },version);
    }
  }
  next();
}

function getAllStudioSets(){
  const lessonSets=tracks.flatMap(t=>t.lessons.map((l,i)=>({
    id:`lesson-${t.id}-${i}`,
    track:t.id,
    kind:'lesson',
    title:`${t.name} Lesson ${i+1}: ${l.title}`,
    subtitle:l.goal,
    items:l.words.map(w=>[w[0],'','core term',w[1],'Think in context: connect this expression to the lesson rule.',w[2]])
  })));
  return [...examWordAndPhraseSets,...lessonSets];
}

function getFilteredStudioSets(){
  return getAllStudioSets().filter(s=>{
    if(activeVocabTrack!=='all'&&s.track!==activeVocabTrack)return false;
    if(activeVocabKind!=='all'&&s.kind!==activeVocabKind)return false;
    return true;
  });
}

function getCurrentStudioSet(){
  const all=getAllStudioSets();
  const filtered=getFilteredStudioSets();
  return filtered.find(s=>s.id===activeVocabSetId)||all.find(s=>s.id===activeVocabSetId)||filtered[0]||all[0];
}

function listenStudioSet(at=0,single=false){
  const set=getCurrentStudioSet();
  if(!set||!set.items.length)return;
  stop();
  activeVocabIndex=Math.max(0,Math.min(set.items.length-1,at));
  playing=true;
  toggle.textContent='Stop audio';
  const version=token;
  function nextItem(){
    if(version!==token)return;
    const item=set.items[activeVocabIndex];
    if(!item){
      stop(false);
      status.textContent='Audio set complete. Choose another set or switch to Practice.';
      return;
    }
    const [term,,pos,def,,example]=item;
    status.textContent=`${activeVocabIndex+1} / ${set.items.length} · ${term} (${pos||'term'})`;
    document.querySelectorAll('[data-studio-word]').forEach(el=>el.classList.toggle('active',Number(el.dataset.studioWord)===activeVocabIndex));
    const speechText=buildAudioSpeechText(term,def,example);
    if(saved.audioMode==='think_pause'&&!single){
      speak(`${term}.`,()=>{
        if(version!==token)return;
        timer=setTimeout(()=>{
          if(version!==token)return;
          speak(`Definition: ${def}. Example: ${example}`,()=>{
            activeVocabIndex++;
            timer=setTimeout(nextItem,900);
          },version);
        },1400);
      },version);
    }else{
      speak(speechText,()=>{
        if(single){
          stop(false);
          status.textContent='Finished entry. Tap Play this set to continue.';
        }else{
          activeVocabIndex++;
          timer=setTimeout(nextItem,900);
        }
      },version);
    }
  }
  nextItem();
}

function listenDialogue(trackId,lineIdx=-1){
  const fw=examFrameworks[trackId];
  if(!fw||!fw.dialogue||!fw.dialogue.lines.length)return;
  stop();
  playing=true;
  toggle.textContent='Stop audio';
  const version=token;
  if(lineIdx>=0&&fw.dialogue.lines[lineIdx]){
    const line=fw.dialogue.lines[lineIdx];
    activeDialoguePlaying=lineIdx;
    document.querySelectorAll('[data-dialogue-line]').forEach(el=>el.classList.toggle('active',Number(el.dataset.dialogueLine)===lineIdx));
    status.textContent=`${line.speaker}: ${line.text}`;
    speak(`${line.speaker} says: ${line.text}`,()=>stop(false),version);
    return;
  }
  let idx=0;
  function nextLine(){
    if(version!==token)return;
    const line=fw.dialogue.lines[idx];
    if(!line){
      stop(false);
      status.textContent='Dialogue complete.';
      return;
    }
    activeDialoguePlaying=idx;
    document.querySelectorAll('[data-dialogue-line]').forEach(el=>el.classList.toggle('active',Number(el.dataset.dialogueLine)===idx));
    status.textContent=`Dialogue ${idx+1}/${fw.dialogue.lines.length} · ${line.speaker}`;
    speak(`${line.speaker} says: ${line.text}`,()=>{
      idx++;
      timer=setTimeout(nextLine,700);
    },version);
  }
  nextLine();
}

const links=(t,i)=>`<div class="steps" aria-label="Lesson modes">${['learn','words','cards','quiz'].map(m=>`<a href="#lesson/${id(t,i)}/${m}" ${m===mode?'aria-current="page"':''}>${{learn:'Learn',words:'Words & audio',cards:'Flashcards',quiz:'Practice'}[m]}</a>`).join('')}</div>`;

function renderAudioModeControls(playAction='play'){
  const modes=[
    ['word_def_ex','Word → Definition → Example'],
    ['word_def','Word → English Definition Only'],
    ['word_def_3x','3× Loop: Word + Definition'],
    ['think_pause','Thinking Pause (Word → 1.4s Pause → Definition)']
  ];
  return `<div class="settings" style="margin-bottom:10px">
    <button class="primary" data-action="${playAction}">Play this set</button>
    <button type="button" data-action="stop-audio">Stop</button>
    <label>Audio pattern
      <select id="audio-mode-select" aria-label="Audio playback pattern">
        ${modes.map(([val,label])=>`<option value="${val}" ${saved.audioMode===val?'selected':''}>${label}</option>`).join('')}
      </select>
    </label>
    <label>Speed
      <select id="speed">${[.75,1,1.25].map(r=>`<option value="${r}" ${Number(saved.rate)===r?'selected':''}>${r}×</option>`).join('')}</select>
    </label>
    <button type="button" data-action="toggle-recall-mask">${saved.recallMask?'Show all English definitions':'Thinking mode: Hide definitions first'}</button>
  </div>`;
}

function renderTrackTeachingFramework(t){
  const fw=examFrameworks[t.id];
  if(!fw)return '';
  const isBookmarked=saved.bookmarks.includes(`track:${t.id}`);
  return `
    <section class="card">
      <div class="actions" style="justify-content:space-between;margin-bottom:8px">
        <p class="eyebrow" style="margin:0">${esc(fw.cefr)} · Full Teaching Blueprint</p>
        <button type="button" data-bookmark="track:${t.id}">${isBookmarked?'★ Bookmarked course':'☆ Bookmark course'}</button>
      </div>
      <h2>Construct Essence &amp; Exam Mindset</h2>
      <p>${esc(fw.constructEssence)}</p>
      <div class="actions">
        <a class="button primary" href="#vocab/${t.id}-phrases">▶ Play ${esc(t.name)} Phrases Audio</a>
        <a class="button" href="#vocab/${t.id}-vocab">▶ Play ${esc(t.name)} Vocabulary Audio</a>
        <a class="button" href="#drills/${t.id}">Practice ${esc(t.name)} Exam Drills</a>
      </div>
    </section>

    <section class="card">
      <h2>2026 ${esc(t.name)} Structure &amp; Strategy Blueprint</h2>
      <div class="blueprint-table-wrap" tabindex="0" role="region" aria-label="${esc(t.name)} exam structure table">
        <table class="blueprint-table">
          <thead>
            <tr>
              <th scope="col">Section &amp; Task</th>
              <th scope="col">Core Construct Tested</th>
              <th scope="col">Step-0 Thinking Strategy</th>
              <th scope="col">Pacing &amp; Format</th>
            </tr>
          </thead>
          <tbody>
            ${fw.blueprintTable.map(row=>`<tr><th scope="row">${esc(row[0])}</th><td>${esc(row[1])}</td><td>${esc(row[2])}</td><td>${esc(row[3])}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>Step-0 Thinking Protocol (Before Reading Options)</h2>
      <ol class="step0-list">
        ${fw.stepZeroProtocol.map(step=>`<li>${esc(step)}</li>`).join('')}
      </ol>
    </section>

    <section class="card">
      <h2>Deep Teaching Chapters (${esc(t.name)})</h2>
      ${fw.chapters.map(ch=>`
        <article class="card" style="background:var(--subtle);margin:14px 0">
          <p class="eyebrow">Core Chapter</p>
          <h3>${esc(ch.title)}</h3>
          <p>${esc(ch.essence)}</p>
          <div class="formula-box">Formula: ${esc(ch.formula)}</div>
          <p><strong>Execution Strategy:</strong> ${esc(ch.strategy)}</p>
          ${ch.examples.map(ex=>`
            <div class="card" style="margin:10px 0;padding:14px">
              <p><strong>Model Sentence:</strong> ${esc(ex.sentence)}</p>
              <p class="muted"><strong>Analysis:</strong> ${esc(ex.analysis)}</p>
              <button type="button" data-speak-text="${esc(ex.sentence)}">🔊 Listen to model sentence</button>
            </div>
          `).join('')}
        </article>
      `).join('')}
    </section>

    <section class="card">
      <h2>Fatal Traps Diagnosis Radar</h2>
      <div class="trap-grid">
        ${fw.fatalTraps.map(tr=>`
          <article class="trap-card">
            <h3>${esc(tr.trap)}</h3>
            <p><strong>Why it fails:</strong> ${esc(tr.whyItFails)}</p>
            <p><strong>Antidote:</strong> ${esc(tr.antidote)}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="card">
      <h2>Master Worked Demonstrations</h2>
      ${fw.masterDemonstrations.map(demo=>`
        <article class="card" style="background:var(--subtle);margin:14px 0">
          <h3>${esc(demo.title)}</h3>
          <p><strong>Prompt:</strong> ${esc(demo.prompt)}</p>
          <p><strong>Step-0 Thinking:</strong> ${esc(demo.step0Thinking)}</p>
          <ul>
            ${demo.optionBreakdown.map(opt=>`<li>${esc(opt)}</li>`).join('')}
          </ul>
          <p><strong>Verified Answer:</strong> ${esc(demo.answer)}</p>
          <p class="muted"><strong>Key Takeaway:</strong> ${esc(demo.takeaway)}</p>
        </article>
      `).join('')}
    </section>

    <section class="card">
      <div class="actions" style="justify-content:space-between">
        <div>
          <p class="eyebrow">Contextual Spoken English</p>
          <h2>${esc(fw.dialogue.setting)}</h2>
        </div>
        <button type="button" class="primary" data-play-dialogue="${t.id}">▶ Listen to full dialogue</button>
      </div>
      <div class="dialogue-box">
        ${fw.dialogue.lines.map((line,idx)=>`
          <div class="dialogue-line" data-dialogue-line="${idx}">
            <div class="actions" style="justify-content:space-between">
              <strong>${esc(line.speaker)}:</strong>
              <button type="button" data-play-dialogue-line="${t.id}:${idx}" aria-label="Listen to ${esc(line.speaker)} line ${idx+1}">▶ Hear line</button>
            </div>
            <p>${esc(line.text)}</p>
            <p class="muted">💡 ${esc(line.focusNote)}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderVocabStudio(){
  const filteredSets=getFilteredStudioSets();
  const activeSet=getCurrentStudioSet();
  activeVocabSetId=activeSet.id;

  return `
    <p class="eyebrow">Mobile Portrait Quick-Play · Pure-English Audio</p>
    <h1>Word &amp; Phrase Audio Studio</h1>
    <p class="lead">Tap any TOEFL, TOEIC, SAT, GMAT, or GRE set below to hear <strong>Word or Phrase → English Definition → Example Sentence</strong>. Designed for one-hand portrait operation and active English thinking.</p>

    <section class="card quick-audio-hub">
      <h2>1. Filter by Exam &amp; Set Type</h2>
      <div class="actions" style="margin-bottom:10px" role="group" aria-label="Filter audio sets by exam">
        ${[['all','All 5 Exams'],['toefl','TOEFL'],['toeic','TOEIC'],['sat','SAT'],['gmat','GMAT'],['gre','GRE']].map(([tid,label])=>`
          <button type="button" class="${activeVocabTrack===tid?'primary':''}" data-vocab-track="${tid}">${label}</button>
        `).join('')}
      </div>
      <div class="actions" role="group" aria-label="Filter by vocabulary or phrases">
        ${[['all','All Sets (Words + Phrases)'],['phrase','Phrases & Collocations'],['vocab','Core Exam Words'],['lesson','Lesson Word Sets']].map(([kind,label])=>`
          <button type="button" class="${activeVocabKind===kind?'primary':''}" data-vocab-kind="${kind}">${label}</button>
        `).join('')}
      </div>

      <h3 style="margin-top:16px">2. One-Tap Set Selector (Tap to Load &amp; Play)</h3>
      <div class="pill-grid" role="group" aria-label="Select vocabulary or phrase set">
        ${filteredSets.map(s=>`
          <button type="button" class="pill-btn ${s.id===activeSet.id?'active':''}" data-select-vocab-set="${esc(s.id)}">
            <span>${s.kind==='phrase'?'🔗 ':'📘 '}${esc(s.title)}</span>
            <small>${s.items.length} entries · Tap to play</small>
          </button>
        `).join('')}
      </div>
    </section>

    <section class="card">
      <p class="eyebrow">${esc(activeSet.track.toUpperCase())} · ${activeSet.kind==='phrase'?'Academic & Business Phrase Set':'Core Vocabulary Set'}</p>
      <h2>${esc(activeSet.title)}</h2>
      <p>${esc(activeSet.subtitle)}</p>
      ${renderAudioModeControls('play-studio-set')}
      <p class="muted">Tap any entry below to hear its pronunciation, English definition, and contextual example immediately.</p>
    </section>

    <div class="word-list">
      ${activeSet.items.map((item,i)=>{
        const [term,ipa,pos,def,clue,example]=item;
        const maskKey=`${activeSet.id}:${i}`;
        const isMasked=saved.recallMask&&!revealedMaskItems.has(maskKey);
        return `
          <article class="word ${isMasked?'is-masked':''}" data-studio-word="${i}">
            <div>
              <strong>${esc(term)}</strong>
              <span class="word-meta">${pos?`<span>[${esc(pos)}]</span>`:''}${ipa?`<span>${esc(ipa)}</span>`:''}</span>
              <p class="word-def-text" data-reveal-mask="${esc(maskKey)}">${isMasked?'🔒 Thinking Pause: Recall the English meaning in your own words, then tap here or ▶ to reveal.':'<strong>English Definition:</strong> '+esc(def)}</p>
              ${clue&&!isMasked?`<p class="word-clue">🧠 ${esc(clue)}</p>`:''}
              <p class="muted"><strong>Example:</strong> ${esc(example)}</p>
            </div>
            <button type="button" data-say-studio="${i}" aria-label="Listen to ${esc(term)} and its English definition">▶</button>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function getFilteredDrills(){
  return examSubtopicDrills.filter(d=>{
    if(activeDrillTrack!=='all'&&d.track!==activeDrillTrack)return false;
    if(activeDrillSubtopic!=='all'&&d.subtopic!==activeDrillSubtopic)return false;
    return true;
  });
}

function renderExamDrills(){
  const trackDrills=examSubtopicDrills.filter(d=>activeDrillTrack==='all'||d.track===activeDrillTrack);
  const subtopics=['all',...new Set(trackDrills.map(d=>d.subtopic))];
  if(!subtopics.includes(activeDrillSubtopic))activeDrillSubtopic='all';
  const drills=getFilteredDrills();
  if(activeDrillIndex>=drills.length)activeDrillIndex=0;
  const item=drills[activeDrillIndex];

  return `
    <p class="eyebrow">Interactive Question-Type Drill Suite</p>
    <h1>Exam Strategy Drills &amp; Verification</h1>
    <p class="lead">Practice authentic question structures for TOEFL, TOEIC, Digital SAT, GMAT Focus, and GRE General—including Step-0 Thinking Hints and GRE 6-Choose-2 Sentence Equivalence.</p>

    <section class="card">
      <h2>Filter by Course &amp; Question Type</h2>
      <div class="actions" style="margin-bottom:10px" role="group" aria-label="Filter drills by exam">
        ${[['all','All Exams'],['toefl','TOEFL'],['toeic','TOEIC'],['sat','SAT'],['gmat','GMAT'],['gre','GRE']].map(([tid,label])=>`
          <button type="button" class="${activeDrillTrack===tid?'primary':''}" data-drill-track="${tid}">${label}</button>
        `).join('')}
      </div>
      <div class="actions" role="group" aria-label="Filter drills by subtopic">
        ${subtopics.map(sub=>`
          <button type="button" class="${activeDrillSubtopic===sub?'primary':''}" data-drill-subtopic="${esc(sub)}">${sub==='all'?'All Subtopics':esc(sub)}</button>
        `).join('')}
      </div>
    </section>

    ${item?renderSingleDrillItem(item,drills.length):'<div class="card">No drills match this filter.</div>'}
  `;
}

function renderSingleDrillItem(item,totalCount){
  const userAns=saved.drillAnswered[item.id];
  const isAnswered=userAns!==undefined;
  const isMulti=item.type==='multi2';
  const pending=drillMultiSelection[item.id]||[];
  const hintVisible=Boolean(drillHintShown[item.id]);

  let isCorrect=false;
  if(isAnswered){
    if(isMulti&&Array.isArray(userAns)&&Array.isArray(item.answer)){
      isCorrect=userAns.length===2&&item.answer.every(a=>userAns.includes(a));
    }else{
      isCorrect=userAns===item.answer;
    }
  }

  return `
    <section class="card">
      <div class="actions" style="justify-content:space-between;margin-bottom:8px">
        <p class="eyebrow" style="margin:0">${esc(item.track.toUpperCase())} · ${esc(item.subtopic)} · Drill ${activeDrillIndex+1} of ${totalCount}</p>
        <button type="button" data-drill-hint="${esc(item.id)}">${hintVisible?'Hide Step-0 Hint':'💡 Show Step-0 Thinking Hint'}</button>
      </div>
      <h2>${esc(item.stem)}</h2>
      ${isMulti?'<p class="muted"><strong>GRE Sentence Equivalence Rule:</strong> Select exactly TWO choices that fit the context and produce equivalent sentence meanings, then tap Submit 2 choices.</p>':''}
      ${hintVisible?`<div class="formula-box"><strong>Step-0 Thinking Hint:</strong> ${esc(item.step0Hint)}</div>`:''}

      <div class="answers">
        ${item.options.map(opt=>{
          const selectedMulti=isMulti&&pending.includes(opt);
          return `<button type="button" class="${selectedMulti?'selected-multi':''}" data-drill-option="${esc(opt)}" ${isAnswered?'disabled':''}>${isMulti?(selectedMulti?'☑ ':'☐ '):''}${esc(opt)}</button>`;
        }).join('')}
      </div>

      ${isMulti&&!isAnswered?`
        <div class="actions" style="margin-top:12px">
          <button type="button" class="primary" data-drill-submit-multi="${esc(item.id)}" ${pending.length!==2?'disabled':''}>Submit 2 choices (${pending.length}/2 selected)</button>
        </div>
      `:''}

      ${isAnswered?`
        <div class="feedback ${isCorrect?'':'incorrect'}" role="status">
          <strong>${isCorrect?'Correct reasoning.':'Review the Step-0 reasoning.'}</strong>
          <p><strong>Your answer:</strong> ${esc(Array.isArray(userAns)?userAns.join(' + '):userAns)}</p>
          <p><strong>Verified answer:</strong> ${esc(Array.isArray(item.answer)?item.answer.join(' + '):item.answer)}</p>
          <p>${esc(item.explanation)}</p>
          <div class="actions">
            <button type="button" data-drill-retry="${esc(item.id)}">Retry this question</button>
            <button type="button" class="primary" data-drill-next="true">Next drill question →</button>
          </div>
        </div>
      `:''}

      <div class="actions" style="margin-top:16px;justify-content:space-between">
        <button type="button" data-drill-prev="true" ${activeDrillIndex===0?'disabled':''}>← Previous drill</button>
        <button type="button" data-drill-next="true" ${activeDrillIndex>=totalCount-1?'disabled':''}>Next drill →</button>
      </div>
    </section>
  `;
}

function render(){
  applyDisplayPreferences();
  const parts=location.hash.slice(1).split('/');
  current=null;
  answer=null;
  question=0;
  revealed=false;
  mode=parts[3]||'learn';
  document.querySelectorAll('.dock a').forEach(a=>{
    if(a.hash==='#'+parts[0]||(parts[0]===''&&a.hash==='#home'))a.setAttribute('aria-current','page');
    else a.removeAttribute('aria-current');
  });

  if(parts[0]==='vocab'){
    if(parts[1]){
      const found=getAllStudioSets().find(s=>s.id===parts[1]);
      if(found){
        activeVocabSetId=found.id;
        activeVocabTrack=found.track;
        activeVocabKind='all';
      }
    }
    main.innerHTML=renderVocabStudio();
    return;
  }

  if(parts[0]==='drills'){
    if(parts[1]&&['toefl','toeic','sat','gmat','gre'].includes(parts[1])){
      activeDrillTrack=parts[1];
      activeDrillSubtopic='all';
      activeDrillIndex=0;
    }
    main.innerHTML=renderExamDrills();
    return;
  }

  if(parts[0]==='lesson'){
    const t=tracks.find(t=>t.id===parts[1]),n=Number(parts[2]);
    if(t&&Number.isInteger(n)&&t.lessons[n]){
      current={track:t,n,lesson:t.lessons[n],key:id(t,n)};
      index=Math.min(Math.max(Number(saved.position[current.key])||0,0),current.lesson.words.length-1);
      const l=current.lesson;
      main.innerHTML=`<a href="#track/${t.id}">← ${t.name} lessons</a><p class="eyebrow">${t.name} · Lesson ${n+1}</p><h1>${esc(l.title)}</h1><p class="lead">${esc(l.goal)}</p>${links(t,n)}<div id="lesson-body"></div>`;
      renderMode();
      return;
    }
  }

  if(parts[0]==='track'){
    const t=tracks.find(t=>t.id===parts[1]);
    if(t){
      main.innerHTML=`<a href="#home">← All courses</a><p class="eyebrow">${t.tag}</p><h1>${t.name}</h1><p class="lead">${t.intro}</p><div class="grid">${t.lessons.map((l,i)=>`<article class="card"><p class="eyebrow">Lesson ${i+1}${saved.completed.includes(id(t,i))?' · Practiced':''}</p><h2>${l.title}</h2><p>${l.goal}</p><div class="actions"><a class="button primary" href="#lesson/${id(t,i)}/learn">Start lesson</a><a class="button" href="#lesson/${id(t,i)}/words">Listen to set</a></div></article>`).join('')}</div>${renderTrackTeachingFramework(t)}`;
      return;
    }
  }

  if(parts[0]==='review'){
    const lessonMistakes=saved.wrong.map(k=>{
      const [tid,n,q]=k.split('/');
      const t=tracks.find(t=>t.id===tid),l=t?.lessons[n],item=l?.questions[q];
      return item?`<article class="card"><p class="eyebrow">${esc(t.name)} · Lesson ${Number(n)+1}</p><h2>${esc(item[0])}</h2><p><strong>${esc(item[2])}</strong></p><p>${esc(item[3])}</p><a class="button" href="#lesson/${tid}/${n}/quiz">Retry ${t.name} practice</a></article>`:'';
    }).join('');
    const drillMistakes=saved.drillWrong.map(did=>{
      const item=examSubtopicDrills.find(d=>d.id===did);
      return item?`<article class="card"><p class="eyebrow">${esc(item.track.toUpperCase())} · ${esc(item.subtopic)}</p><h2>${esc(item.stem)}</h2><p><strong>${esc(Array.isArray(item.answer)?item.answer.join(' + '):item.answer)}</strong></p><p>${esc(item.explanation)}</p><a class="button" href="#drills/${item.track}">Retry ${esc(item.track.toUpperCase())} drill</a></article>`:'';
    }).join('');
    const combined=lessonMistakes+drillMistakes;
    main.innerHTML=`<p class="eyebrow">Retrieve · Explain · Retry</p><h1>Review your mistakes</h1><p>Read the explanation, then return to the lesson or drill and try again.</p>${combined||'<div class="card">No mistakes saved yet. Complete a practice check to build your review list.</div>'}`;
    return;
  }

  if(parts[0]==='progress'){
    const count=saved.completed.filter(k=>tracks.some(t=>t.lessons.some((_,i)=>id(t,i)===k))).length;
    const drillCount=Object.keys(saved.drillAnswered).length;
    const spacedEntries=Object.entries(saved.spaced);
    main.innerHTML=`<p class="eyebrow">Your learning record</p><h1>${count} of ${lessonTotal} lessons practiced</h1><div class="meter" role="progressbar" aria-label="Lessons practiced" aria-valuemin="0" aria-valuemax="${lessonTotal}" aria-valuenow="${count}"><span style="width:${count/lessonTotal*100}%"></span></div><p>${saved.known.length} vocabulary entries marked as recalled · ${drillCount} of ${examSubtopicDrills.length} exam strategy drills completed · ${saved.bookmarks.length} bookmarked items.</p><p>This records completed practice checks. It is not an official score or a proficiency estimate.</p><div class="actions"><a class="button primary" href="#review">Review mistakes (${saved.wrong.length+saved.drillWrong.length})</a><a class="button" href="#vocab">Open Word &amp; Phrase Audio Studio</a><a class="button" href="#drills">Open Exam Drills</a></div>${spacedEntries.length?`<section class="card"><h2>Spaced Repetition Schedule (1 / 3 / 7 / 14 Days)</h2><ul>${spacedEntries.map(([k,info])=>`<li><strong>${esc(k)}</strong> — Stage ${Number(info.stage)||1} (Next review: ${esc(info.nextDate||'Scheduled')})</li>`).join('')}</ul></section>`:''}<div class="card"><p>Progress, bookmarks, spaced schedule, and notes are saved in this browser.</p><div class="actions"><button type="button" data-action="export-notes">Export my reflection notes (.txt)</button><button data-action="reset">Reset my English academy progress</button></div><p id="reset-confirm"></p></div>`;
    return;
  }

  main.innerHTML=`
    <p class="eyebrow">English-only academy · TOEFL · TOEIC · SAT · GMAT · GRE</p>
    <h1>Understand it.<br>Say it. Use it.</h1>
    <p class="lead">Build English for TOEFL, TOEIC, SAT, GMAT and GRE. Choose a course, study a complete teaching blueprint, or tap any vocabulary and phrase set below to hear English words and their English definitions immediately.</p>
    <div class="actions">
      <a class="button primary" href="#track/toefl">Explore TOEFL</a>
      <a class="button" href="#vocab">Word &amp; Phrase Audio</a>
      <a class="button" href="#drills">Exam Drills</a>
      <a class="button" href="#review">Review mistakes</a>
    </div>

    <section class="card quick-audio-hub" aria-labelledby="quick-audio-heading">
      <p class="eyebrow">One-Tap Portrait Audio Selector · Word / Phrase → English Definition</p>
      <h2 id="quick-audio-heading">Tap a Word or Phrase Set to Listen Now</h2>
      <p>Designed for mobile portrait one-hand operation: select any high-frequency phrase or vocabulary set to open and play English definitions and examples.</p>
      <div class="pill-grid">
        ${examWordAndPhraseSets.map(s=>`
          <a class="button pill-btn" href="#vocab/${esc(s.id)}">
            <span>▶ ${esc(s.track.toUpperCase())} ${s.kind==='phrase'?'Phrases':'Words'}</span>
            <small>${esc(s.title)}</small>
          </a>
        `).join('')}
      </div>
    </section>

    <h2>Choose your course</h2>
    <div class="grid">
      ${tracks.map(t=>`
        <article class="card">
          <p class="eyebrow">${t.tag} · ${esc(examFrameworks[t.id]?.cefr||'')}</p>
          <h2>${t.name}</h2>
          <p>${t.intro}</p>
          <div class="actions">
            <a class="button primary" href="#track/${t.id}">View lessons</a>
            <a class="button" href="#lesson/${t.id}/0/words">Listen to a set</a>
            <a class="button" href="#vocab/${t.id}-phrases">Phrases audio</a>
            <a class="button" href="#drills/${t.id}">Exam drills</a>
          </div>
        </article>
      `).join('')}
    </div>

    <div class="card">
      <h2>A complete learning cycle</h2>
      <p>Learn the idea &amp; Step-0 mindset → analyze worked examples &amp; traps → listen and repeat (Word → English definition → Example) → recall with flashcards → verify with practice &amp; exam drills → review mistakes on a 1/3/7/14-day spaced schedule.</p>
      <p class="muted">Collection: ${lessonTotal} core lessons, 15 deep teaching chapters, ${wordTotal+studioWordTotal} word and phrase entries with English definitions, and ${questionTotal+examSubtopicDrills.length} original practice and drill questions. Listening uses your device’s English speech voice and requires an available English voice. These lessons are independent learning materials, not official exam questions or a complete exam syllabus.</p>
      <a href="../index.html">Open the full bilingual learning library ↗</a>
    </div>
  `;
}

function renderMode(){
  const l=current.lesson,body=document.querySelector('#lesson-body'),fw=examFrameworks[current.track.id];
  if(mode==='words'){
    body.innerHTML=`
      <section class="card">
        <h2>Listen and repeat</h2>
        <p>Hear each word or phrase, its English definition, and an example. Pause after each example and explain the meaning in your own words.</p>
        ${renderAudioModeControls('play')}
        <p class="muted">The Listen button resumes from the most recent word. Changing lessons stops speech.</p>
      </section>
      <div class="word-list">
        ${l.words.map((w,i)=>{
          const maskKey=`${current.key}:${i}`;
          const isMasked=saved.recallMask&&!revealedMaskItems.has(maskKey);
          return `<article class="word ${isMasked?'is-masked':''}" data-word="${i}"><div><strong>${esc(w[0])}</strong><p class="word-def-text" data-reveal-mask="${esc(maskKey)}">${isMasked?'🔒 Thinking Pause: Recall the meaning in English first, then tap to reveal.':esc(w[1])}</p><p class="muted">${esc(w[2])}</p></div><button data-say="${i}" aria-label="Listen to ${esc(w[0])}">▶</button></article>`;
        }).join('')}
      </div>
      <section class="card">
        <h3>Want more ${esc(current.track.name)} phrases and academic vocabulary?</h3>
        <div class="actions">
          <a class="button primary" href="#vocab/${current.track.id}-phrases">Open ${esc(current.track.name)} Phrase Audio Set</a>
          <a class="button" href="#vocab/${current.track.id}-vocab">Open ${esc(current.track.name)} Core Vocabulary Set</a>
        </div>
      </section>
    `;
    return;
  }

  if(mode==='cards'){
    const w=l.words[index];
    body.innerHTML=`<section class="card flash"><p class="eyebrow">Card ${index+1} of ${l.words.length}</p><h2>${esc(w[0])}</h2>${revealed?`<p>${esc(w[1])}</p><p class="muted">${esc(w[2])}</p>`:'<p>Recall the meaning and say an example before revealing.</p>'}<div class="actions"><button data-action="reveal">${revealed?'Hide meaning':'Reveal meaning'}</button><button data-say="${index}">Hear word & definition</button>${revealed?`<button data-action="known">${saved.known.includes(current.key+'/'+index)?'Marked as recalled ✓':'I recalled this'}</button><button data-action="again">Practice again</button>`:''}</div></section><div class="actions"><button data-action="previous" ${index===0?'disabled':''}>← Previous</button><button class="primary" data-action="next" ${index===l.words.length-1?'disabled':''}>Next →</button></div>`;
    return;
  }

  if(mode==='quiz'){
    renderQuestion();
    return;
  }

  const spacedInfo=saved.spaced[current.key];
  const isBookmarked=saved.bookmarks.includes(current.key);
  const relatedChapter=fw?.chapters?.[current.n%fw.chapters.length];
  const relatedTrap=fw?.fatalTraps?.[current.n%fw.fatalTraps.length];

  body.innerHTML=`
    <section class="card">
      <div class="actions" style="justify-content:space-between;margin-bottom:6px">
        <span class="eyebrow">Core Concept</span>
        <div class="actions">
          <button type="button" data-bookmark="${current.key}">${isBookmarked?'★ Bookmarked':'☆ Bookmark lesson'}</button>
          <button type="button" data-action="schedule-spaced">${spacedInfo?`Spaced Review Stage ${spacedInfo.stage} (Next: ${spacedInfo.nextDate})`:'📅 Schedule 1/3/7/14-Day Recall'}</button>
        </div>
      </div>
      <h2>The idea</h2>
      <p>${esc(l.rule)}</p>
    </section>
    <section class="card">
      <h2>Worked example</h2>
      <p>${esc(l.example)}</p>
      <button data-action="example">Listen to the example</button>
    </section>
    ${relatedChapter?`
      <section class="card">
        <p class="eyebrow">Step-0 Strategy &amp; Structural Formula</p>
        <h2>${esc(relatedChapter.title)}</h2>
        <div class="formula-box">${esc(relatedChapter.formula)}</div>
        <p>${esc(relatedChapter.strategy)}</p>
        ${relatedTrap?`<p class="muted"><strong>Trap Alert (${esc(relatedTrap.trap)}):</strong> ${esc(relatedTrap.antidote)}</p>`:''}
      </section>
    `:''}
    <section class="card">
      <h2>Your turn</h2>
      <p>${esc(l.task)}</p>
      <label for="reflection">Your explanation</label>
      <textarea id="reflection" placeholder="Explain the idea in your own words.">${esc(saved.notes[current.key]||'')}</textarea>
      <p class="muted">Saved on this device. Compare your reasoning with the worked example.</p>
    </section>
    <div class="actions">
      <a class="button primary" href="#lesson/${current.key}/words">Learn the word set</a>
      <a class="button" href="#lesson/${current.key}/quiz">Check understanding</a>
      <a class="button" href="#drills/${current.track.id}">${esc(current.track.name)} Exam Drills</a>
    </div>
  `;
}

function renderQuestion(){
  const body=document.querySelector('#lesson-body'),l=current.lesson;
  if(question>=l.questions.length){
    saved.completed=[...new Set([...saved.completed,current.key])];
    persist();
    body.innerHTML=`<section class="card"><h2>Practice complete</h2><p>Explain one idea from this lesson without looking. Revisit any mistakes to strengthen your reasoning.</p><div class="actions"><a class="button primary" href="#review">Review mistakes</a><a class="button" href="#track/${current.track.id}">Choose another lesson</a><a class="button" href="#drills/${current.track.id}">Try ${esc(current.track.name)} Exam Drills</a></div></section>`;
    return;
  }
  const q=l.questions[question];
  const order=q[1].map((a,i)=>({a,i}));
  const offset=(current.n+question+current.track.id.length)%order.length;
  order.push(...order.splice(0,offset));
  body.innerHTML=`<section class="card"><p class="eyebrow">Question ${question+1} of ${l.questions.length}</p><h2>${esc(q[0])}</h2><div class="answers">${order.map(({a,i})=>`<button data-answer="${i}" ${answer!==null?'disabled':''}>${esc(a)}</button>`).join('')}</div>${answer!==null?`<div class="feedback ${q[1][answer]===q[2]?'':'incorrect'}" role="status"><strong>${q[1][answer]===q[2]?'Correct.':'Review the reasoning.'}</strong><p>Answer: ${esc(q[2])}</p><p>${esc(q[3])}</p><button class="primary" data-action="question-next">${question+1===l.questions.length?'Finish practice':'Next question'}</button></div>`:''}</section>`;
}

document.querySelector('header.top')?.addEventListener('click',e=>{
  const b=e.target.closest('button');
  if(!b)return;
  if(b.dataset.themeSet){
    saved.theme=b.dataset.themeSet;
    persist();
    applyDisplayPreferences();
  }
  if(b.dataset.scaleSet){
    saved.scale=Number(b.dataset.scaleSet);
    persist();
    applyDisplayPreferences();
  }
});

main.addEventListener('click',e=>{
  const maskTarget=e.target.closest('[data-reveal-mask]');
  if(maskTarget&&saved.recallMask){
    revealedMaskItems.add(maskTarget.dataset.revealMask);
    render();
    return;
  }
  const b=e.target.closest('button');
  if(!b)return;
  const d=b.dataset;

  if(d.say!==undefined){
    listen(Number(d.say),true);
    return;
  }
  if(d.sayStudio!==undefined){
    listenStudioSet(Number(d.sayStudio),true);
    return;
  }
  if(d.speakText){
    stop();
    playing=true;
    toggle.textContent='Stop audio';
    status.textContent=d.speakText;
    speak(d.speakText,()=>stop(false),token);
    return;
  }
  if(d.playDialogue){
    listenDialogue(d.playDialogue,-1);
    return;
  }
  if(d.playDialogueLine){
    const [tid,idx]=d.playDialogueLine.split(':');
    listenDialogue(tid,Number(idx));
    return;
  }
  if(d.vocabTrack){
    stop();
    activeVocabTrack=d.vocabTrack;
    const matching=getFilteredStudioSets();
    if(matching.length)activeVocabSetId=matching[0].id;
    activeVocabIndex=0;
    render();
    return;
  }
  if(d.vocabKind){
    stop();
    activeVocabKind=d.vocabKind;
    const matching=getFilteredStudioSets();
    if(matching.length)activeVocabSetId=matching[0].id;
    activeVocabIndex=0;
    render();
    return;
  }
  if(d.selectVocabSet){
    stop();
    activeVocabSetId=d.selectVocabSet;
    activeVocabIndex=0;
    render();
    listenStudioSet(0,false);
    return;
  }
  if(d.bookmark){
    const k=d.bookmark;
    if(saved.bookmarks.includes(k))saved.bookmarks=saved.bookmarks.filter(x=>x!==k);
    else saved.bookmarks.push(k);
    persist();
    render();
    return;
  }
  if(d.drillTrack){
    activeDrillTrack=d.drillTrack;
    activeDrillSubtopic='all';
    activeDrillIndex=0;
    render();
    return;
  }
  if(d.drillSubtopic){
    activeDrillSubtopic=d.drillSubtopic;
    activeDrillIndex=0;
    render();
    return;
  }
  if(d.drillHint){
    drillHintShown[d.drillHint]=!drillHintShown[d.drillHint];
    render();
    return;
  }
  if(d.drillOption!==undefined){
    const drills=getFilteredDrills();
    const item=drills[activeDrillIndex];
    if(!item||saved.drillAnswered[item.id]!==undefined)return;
    const chosen=d.drillOption;
    if(item.type==='multi2'){
      const list=drillMultiSelection[item.id]?[...drillMultiSelection[item.id]]:[];
      const pos=list.indexOf(chosen);
      if(pos>=0)list.splice(pos,1);
      else if(list.length<2)list.push(chosen);
      else list[1]=chosen;
      drillMultiSelection[item.id]=list;
      render();
      return;
    }
    saved.drillAnswered[item.id]=chosen;
    saved.drillWrong=saved.drillWrong.filter(x=>x!==item.id);
    if(chosen!==item.answer)saved.drillWrong.push(item.id);
    persist();
    render();
    return;
  }
  if(d.drillSubmitMulti){
    const drills=getFilteredDrills();
    const item=drills[activeDrillIndex];
    if(!item)return;
    const list=drillMultiSelection[item.id]||[];
    if(list.length===2){
      saved.drillAnswered[item.id]=list;
      saved.drillWrong=saved.drillWrong.filter(x=>x!==item.id);
      const isCor=Array.isArray(item.answer)&&item.answer.every(a=>list.includes(a));
      if(!isCor)saved.drillWrong.push(item.id);
      persist();
      render();
    }
    return;
  }
  if(d.drillRetry){
    delete saved.drillAnswered[d.drillRetry];
    delete drillMultiSelection[d.drillRetry];
    persist();
    render();
    return;
  }
  if(d.drillPrev){
    if(activeDrillIndex>0){activeDrillIndex--;render();}
    return;
  }
  if(d.drillNext){
    const drills=getFilteredDrills();
    if(activeDrillIndex<drills.length-1){activeDrillIndex++;render();}
    return;
  }

  if(d.answer!==undefined&&current&&answer===null){
    answer=Number(d.answer);
    const q=current.lesson.questions[question],k=`${current.key}/${question}`;
    saved.wrong=saved.wrong.filter(x=>x!==k);
    if(q[1][answer]!==q[2])saved.wrong.push(k);
    persist();
    renderQuestion();
    return;
  }

  const a=d.action;
  if(a==='stop-audio'){stop();return;}
  if(a==='play-studio-set'){listenStudioSet(0,false);return;}
  if(a==='toggle-recall-mask'){
    saved.recallMask=!saved.recallMask;
    revealedMaskItems.clear();
    persist();
    render();
    return;
  }
  if(a==='export-notes'){
    const lines=Object.entries(saved.notes).map(([k,v])=>`=== ${k} ===\n${v}\n`);
    const text=lines.length?lines.join('\n'):'No reflection notes saved yet.';
    const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');
    link.href=url;
    link.download='english-academy-notes.txt';
    link.click();
    URL.revokeObjectURL(url);
    return;
  }
  if(a==='reset'){
    document.querySelector('#reset-confirm').innerHTML='Clear all saved progress and notes? <button data-action="confirm-reset">Yes, clear progress</button>';
    return;
  }
  if(a==='confirm-reset'){
    saved={completed:[],wrong:[],notes:{},position:{},known:[],bookmarks:[],spaced:{},drillAnswered:{},drillWrong:[],audioMode:'word_def_ex',recallMask:false,theme:saved.theme||'light',scale:saved.scale||1,rate:1};
    persist();
    render();
    return;
  }
  if(!current)return;
  if(a==='schedule-spaced'){
    const intervals=[1,3,7,14];
    const prevStage=Number(saved.spaced[current.key]?.stage)||0;
    const nextStage=Math.min(intervals.length,prevStage+1);
    const days=intervals[nextStage-1];
    const nextDate=new Date(Date.now()+days*86400000).toISOString().slice(0,10);
    saved.spaced[current.key]={stage:nextStage,intervalDays:days,nextDate};
    persist();
    renderMode();
    return;
  }
  if(a==='play')listen(0);
  if(a==='example'){
    stop();
    playing=true;
    toggle.textContent='Stop audio';
    speak(current.lesson.example,()=>stop(),token);
  }
  if(a==='known'||a==='again'){
    const k=current.key+'/'+index;
    saved.known=saved.known.filter(x=>x!==k);
    if(a==='known')saved.known.push(k);
    persist();
    renderMode();
  }
  if(a==='reveal'){
    revealed=!revealed;
    renderMode();
  }
  if(a==='previous'||a==='next'){
    stop();
    index=Math.max(0,Math.min(current.lesson.words.length-1,index+(a==='next'?1:-1)));
    revealed=false;
    saved.position[current.key]=index;
    persist();
    renderMode();
  }
  if(a==='question-next'){
    question++;
    answer=null;
    renderQuestion();
  }
});

main.addEventListener('input',e=>{
  if(e.target.id==='reflection'&&current){
    saved.notes[current.key]=e.target.value;
    persist();
  }
});

main.addEventListener('change',e=>{
  if(e.target.id==='speed'){
    saved.rate=Number(e.target.value);
    persist();
    if(playing){
      if(current)listen(index);
      else listenStudioSet(activeVocabIndex);
    }
  }
  if(e.target.id==='audio-mode-select'){
    saved.audioMode=e.target.value;
    persist();
    if(playing){
      if(current)listen(index);
      else listenStudioSet(activeVocabIndex);
    }
  }
});

toggle.addEventListener('click',()=>playing?stop():listen(index));
window.addEventListener('hashchange',()=>{stop();render();main.focus();window.scrollTo(0,0);});
window.addEventListener('pagehide',()=>stop());
render();
