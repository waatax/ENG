import { renderListeningConnectedSpeechDiagram } from './lesson_visuals.mjs';
import { curriculum } from './curriculum.mjs';
import { workshops } from './lesson_workshops.mjs';
import { UNIFIED_GRADES } from './curriculum_unified.mjs';
import { points } from './knowledge_content.mjs';
import { foundations } from './knowledge_foundations.mjs';
import { registerAudioLesson, renderLessonAudio, escapeAudio as e, pauseLessonAudio } from './lesson_audio.mjs';
export const listeningLessons=[];
const add=(id,title,stage,href,sections)=>{registerAudioLesson(id,title,sections);listeningLessons.push({id,title,stage,href});};
const section=(title,...text)=>({title,text:text.filter(Boolean).join('。')});
for(const p of [...foundations.slice(0,2),...points,foundations[2]]) {
  add('knowledge:'+p.id,p.title,p.stage,'#knowledge/'+p.id,[section('學習目標',p.goal),section('重點解說',p.rule,...p.steps),...p.pairs.map(([en,zh])=>section('對照例句',en,zh)),section('常見錯誤',p.trap),{...section('回想練習','先不看畫面，說出本課的規則，再自己造一句。',p.task),recall:true},section('重點回顧',p.rule)]);
}
for(const t of curriculum)for(const c of t.chapters){
  const w=workshops[c.id];if(!w)continue;
  add('chapter:'+t.id+':'+c.id,c.title,({jhs:'國中',sh:'高中',voc:'高工',intl:'國際考試'})[t.id]||t.title,'#chapter/'+t.id+'/'+c.id,[section('學習目標',w.goal),section('核心規則',w.rule),...c.concepts.map(x=>section(x.heading,x.body,x.tip)),section('例句拆解',w.example,...w.steps),section('避免常見錯誤',w.trap),...(c.vocab||[]).map(v=>section('字詞與例句',v.word,v.def,v.example)),...(c.dialogue||[]).map(d=>section('情境對話',d.text)),{...section('回想練習','暫停想一想。',w.task),recall:true},section('參考與總結',w.model,w.rule)]);
}
for(const g of UNIFIED_GRADES)for(const sem of g.semesters)for(const u of sem.units){
  const stage=g.gradeId==='g6'?'國小':['g7','g8','g9'].includes(g.gradeId)?'國中':'高中';
  add('unit:'+u.id,u.title,stage,'#unit/'+u.id,[section('單元導入',u.title,u.motivation),...(u.concepts||[]).map(c=>section(c.title,c.explanation,c.example)),...(u.phonicsVocab||[]).map(v=>section('單字與情境',v.word,v.zh,v.sentence)),...(u.dialogue||[]).map(d=>section('雙語對話',d.en||d.text,d.zh)),...(u.traps||[]).map(t=>section('常見錯誤修正','正確說法',t.correct,t.reason)),{...section('回想與自查','接下來請自己回想。',...(u.checklist||[])),recall:true}]);
}
export function renderListeningDecodingTable() {
  return `
    <div class="lesson-table card" tabindex="0" role="region" aria-label="英語母語者六大連讀弱化現象聽力解碼對照表" style="margin:20px 0;padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">🎧 英語母語者六大連讀、弱化與語調起伏解碼速查表</strong>
        <span class="pill" style="font-size:11px;background:#e0e7ff;color:#3730a3">真實聽力題眼</span>
      </div>
      <table>
        <caption>英語母語者常見語音變化與真實聽力辨析規律</caption>
        <thead>
          <tr>
            <th scope="col">語音現象</th>
            <th scope="col">發音機制與規則</th>
            <th scope="col">書面原文 vs 實際聽力音標</th>
            <th scope="col">考場聽力題眼與辨析技巧</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1. 連音 (Linking)</th>
            <td>前字字尾為子音，後字字首為母音時，前後音自然滑動連讀</td>
            <td>pick it up ➔ /pɪ.kɪ.tʌp/<br>an apple ➔ /ə.næp.əl/</td>
            <td>不要等待單字間的停頓，把子音當作後一個字的起首音聽辨</td>
          </tr>
          <tr>
            <th scope="row">2. 弱讀 (Weak Forms)</th>
            <td>虛詞 (and, of, to, for, a) 的母音弱化為中央母音 Schwa /ə/</td>
            <td>bread and butter ➔ bread /ən/ butter<br>cup of tea ➔ cup /əv/ tea</td>
            <td>母語者只重讀實詞（名詞、動詞）；虛詞短促模糊，只需抓取關鍵實詞</td>
          </tr>
          <tr>
            <th scope="row">3. 吞音／省音 (Elision)</th>
            <td>在連續子音交界處，/t/ 或 /d/ 常完全不發出或僅作阻氣動作</td>
            <td>last night ➔ /lɑːs naɪt/<br>next door ➔ /neks dɔːr/</td>
            <td>聽見 /neks/ 時自動在大腦中還原為 next，不因缺少爆破音而誤判為生詞</td>
          </tr>
          <tr>
            <th scope="row">4. 閃音／彈舌 (Flap T)</th>
            <td>在兩個母音之間且非重音音節時，/t/ 與 /d/ 軟化為輕快的 /ɾ/ (近似輕 /d/)</td>
            <td>water ➔ /ˈwɔː.ɾər/<br>city ➔ /ˈsɪ.ɾi/</td>
            <td>美式英語高頻考點；聽到近似「哇樂」為 water，非全新單字</td>
          </tr>
          <tr>
            <th scope="row">5. 同化音 (Assimilation)</th>
            <td>/t/ 或 /d/ 遇見 /j/ 時合併為破擦音 /tʃ/ 或 /dʒ/</td>
            <td>nice to meet you ➔ /ˈmiː.tʃuː/<br>Did you go? ➔ /ˈdɪ.dʒuː ɡoʊ/</td>
            <td>問句中 did you 常聽成 /dɪdʒə/，即為一般疑問句助動詞 + 主詞</td>
          </tr>
          <tr>
            <th scope="row">6. 語調起伏 (Intonation)</th>
            <td>Yes/No 問句尾音上揚 (↗)；Wh- 特殊問句與陳述句尾音下沉 (↘)</td>
            <td>Are you ready? ↗ (確認疑問)<br>Where are you going? ↘ (確定陳述/特殊問)</td>
            <td>辨別說話者態度：升調常暗示懷疑、猶豫或請求；降調表確信與終結</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}
let stage='國小', selected=listeningLessons.find(l=>l.stage===stage)?.id;
export function listeningPage(){
  const list=listeningLessons.filter(l=>l.stage===stage),lesson=list.find(l=>l.id===selected)||list[0];
  if(lesson)selected=lesson.id;
  return `<header class="header-block"><div class="pill">🎧 通勤英語教室</div><h1>把通勤時間，變成聽懂一個單元的時間</h1><p>先選學段和主題；播放會依序帶過重點、例句和回想練習。建議到站後再完成頁面上的自我檢核。</p><a href="#grammar">🧩 前往圖解文法專區</a></header><section class="card"><h2>1. 選擇學段</h2><div class="audio-controls">${['國小','國中','高中','高工'].map(s=>`<button class="btn ${stage===s?'primary':'quiet'}" data-listen-stage="${s}" aria-pressed="${stage===s}">${s}</button>`).join('')}</div><h2>2. 選擇今天想聽的單元</h2><label for="listening-unit">教學單元（${list.length}）</label><select id="listening-unit">${list.map(l=>`<option value="${e(l.id)}" ${l.id===selected?'selected':''}>${e(l.title)}</option>`).join('')}</select></section>${renderListeningConnectedSpeechDiagram()}${renderListeningDecodingTable()}${lesson?`${renderLessonAudio(lesson.id)}<p><a class="btn" href="${lesson.href}">開啟本單元完整教學與練習 →</a></p>`:''}`;
}
export function handleListeningClick(button,render){if(!button.dataset.listenStage)return false;if(['國小','國中','高中','高工'].includes(button.dataset.listenStage)){pauseLessonAudio();stage=button.dataset.listenStage;selected=null;render();}return true;}
export function handleListeningChange(target,render){if(target.id!=='listening-unit')return false;if(listeningLessons.some(l=>l.id===target.value&&l.stage===stage)){pauseLessonAudio();selected=target.value;render();}return true;}
