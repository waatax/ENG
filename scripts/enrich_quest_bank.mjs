import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ALL_COMMUTE_DIALOGUES} from '../dist/commute_dialogues.mjs';
import {canonical,questionKey,learningKeys,uniqueQuestions,wordTarget} from '../dist/quest/question_quality.mjs';
const ROOT='dist/quest/course',VERSION='2026-10-27.quality1';
const hash=s=>{let n=2166136261;for(const c of s)n=Math.imul(n^c.charCodeAt(0),16777619);return(n>>>0).toString(36);};
const primary=[['phonics',/字母|母音|拼讀|音標|phonetic|magic e/i],['be',/句子骨架|be 動詞|介紹|新朋友|自我|identity|名詞單複數|代名詞|限定詞/i],['time',/日常|作息|時間|數字|星期|時態|敘事|過去|未來|完成式/i],['continuous',/進行式|continuous/i],['condition',/條件|假設|conditional|subjunctive/i],['compare',/比較|最高級|comparative|superlative/i],['passive',/被動|授予|使役|passive|causative/i],['relative',/關係|relative/i],['complement',/不定詞|動名詞|感官|連綴|infinitive|gerund/i],['clause',/子句|疑問|問句|連接|clause|conjunction/i],['modal',/情態|助動詞|modal/i],['participle',/分詞|participle/i],['inversion',/倒裝|inversion/i],['emphasis',/強調|分裂句|cleft/i],['writing',/寫作|作文|中譯英|產出|標點|大寫|writing|essay/i],['reading',/閱讀|篇章|語篇|故事|繪本|推理|思辨|論證|文本|read|discourse/i],['data',/圖表|數據|跨域|chart|data/i],['business',/職場|商務|技術|工場|工具|流程|故障|說明書|統測|專業|TOEIC/i]];
const topicRules=[['magic',/magic|長母音/i],['cvc',/CVC|短母音/i],['school',/字母|教室|校園|文具|顏色|打招呼/i],['family',/家人|朋友|介紹自己|新朋友/],['food',/食物|飲料|健康飲食/],['nature',/動物|天氣|季節/],['time',/數字|星期|節慶|作息|日常|時間表/],['health',/身體|能力|健康|照護/],['travel',/城市|方位|問路|導航|標示|位置|歷險|冒險/],['environment',/永續|能源|環境/],['technology',/科技|AI|人工智慧/],['data',/圖表|數據/],['writing',/寫作|作文|中譯英|產出|篇章|文意選填/],['culture',/文化|節慶|世界|國際生活/],['vocational',/工場|工具|材料|故障|技術|說明書/],['business',/TOEIC|職場|商務|統測/],['gre',/GRE/],['argument',/GMAT|推理|思辨|論證/],['literature',/故事|繪本|敘事/],['research',/EMI|學術|論文|TOEFL/],['academic',/高中|大考|學測|英檢|GEPT|測驗|考點|自主|攻略|衝刺/]];
const overrides={subject:'主詞；主題',object:'受詞；物件',clause:'子句',phrase:'片語',complement:'補語',reference:'指涉；參考資料',article:'冠詞；文章',case:'情況；格',argument:'論證；論點',claim:'主張',premise:'前提',assumption:'假設',inference:'推論',concession:'讓步',qualification:'限定條件',evidence:'證據',support:'支持',relative:'關係的；相對的',period:'句點；時期',plot:'情節',character:'角色；特徵',figure:'數字；圖示',scale:'刻度；規模',rate:'比率',register:'語域；登記',tone:'語氣',counterargument:'反方論點',bias:'偏誤',control:'控制；對照',random:'隨機的',representative:'具代表性的',sample:'樣本',significant:'顯著的；重要的',valid:'有效的；有根據的',sound:'健全的；聲音',necessary:'必要的',sufficient:'充分的',specious:'似是而非的',disinterested:'公正無私的',ambivalent:'抱持矛盾感受的',capricious:'反覆無常的'};
const cleanGloss=s=>String(s).replace(/\s*[（(].*$/,'').trim();
const tier=t=>t.id==='s1'||t.id==='s2'||t.id==='s3'?0:t.id==='s4'||t.id==='s5'||t.id==='s6'||t.id==='b-cap'?1:2;
const tags=text=>primary.filter(([,r])=>r.test(text)).map(([id])=>id);
const isScored=q=>['choice','listen','input','build','match'].includes(q?.type);
const words=q=>canonical(q).split(' ');
export function enrichCourseFiles(){
 const ix=JSON.parse(fs.readFileSync(ROOT+'/index.json')),tracks=[...ix.sections,...ix.branches];
 const files=new Map(tracks.map(t=>[t.id,JSON.parse(fs.readFileSync(`${ROOT}/${t.id}.json`))]));
 for(const f of files.values()){
  for(const id of f.qualityBorrowed || [])delete f.items[id];f.qualityBorrowed=[];
  for(const id of Object.keys(f.items))if(id.startsWith('quality.'))delete f.items[id];
  for(const u of Object.values(f.units)){u.qualityBaseNodes ||= structuredClone(u.nodes);u.nodes=structuredClone(u.qualityBaseNodes);for(const id of Object.keys(u.nodes))u.nodes[id]=u.nodes[id].filter(x=>!x.startsWith('quality.'));u.guide.words=(u.guide.words||[]).filter(x=>!x.qualityAdded);u.guide.extra=(u.guide.extra||[]).filter(x=>!x.qualityAdded);}
 }
 const catalog=JSON.parse(fs.readFileSync('dist/vocabulary-catalog.json'));
 const topics=JSON.parse(fs.readFileSync('data/quest-lexical-topics.json'));
 const byWord=new Map();for(const card of catalog){const key=canonical(card.word);if(!byWord.has(key))byWord.set(key,[]);byWord.get(key).push(card);}
 const allItems=new Map();for(const f of files.values())for(const q of Object.values(f.items))allItems.set(q.id,q);
 const item=id=>allItems.get(id);
 const units=[];for(const t of tracks)for(const u of t.units){const guide=files.get(t.id).units[u.id].guide;let text=u.title+' '+(guide.tips||[]).map(x=>x.title).join(' ');const level=tier(t);units.push({t,u,guide,file:files.get(t.id),level,tags:tags(text),topic:topicRules.find(([,r])=>r.test(u.title))?.[0]||(level===0?'action':level===1?'grammar':'academic')});}
 const grammarSources=units.flatMap(meta=>Object.values(meta.file.units[meta.u.id].nodes).flatMap(ids=>ids).map(id=>item(id)).filter(q=>isScored(q)&&['grammar','drill'].includes(q.kind)).map(q=>({q,meta})));
 const dlg=ALL_COMMUTE_DIALOGUES.map(d=>({d,level:/Pre-A1|A1(?![+–-])/.test(d.level)?0:/A2/.test(d.level)?1:2,tags:tags(d.title)}));
 const addedLexemes=new Set(),integratedLines=new Set(),report=[];
 const supplements=JSON.parse(fs.readFileSync('data/quest-quality-supplements.json'));
 const add=(meta,q,node)=>{allItems.set(q.id,q);if(!meta.file.items[q.id]&&!q.id.startsWith('quality.'))meta.file.qualityBorrowed.push(q.id);meta.file.items[q.id]=q;const p=meta.file.units[meta.u.id].nodes[node.id];if(!p.includes(q.id))p.push(q.id);};
 for(const meta of units){
  const {u,t,file,guide,level,topic}=meta;
  const supplement=supplements[u.id];if(supplement){const node=u.nodes.find(n=>n.id===supplement.node);for(const [i,row]of supplement.questions.entries()){const q={id:`quality.original.${u.id}.${i+1}`,kind:node.kind,type:'choice',prompt:row[0],answer:row[1],options:[row[1],...row[2]],why:row[3],level:level+1,src:u.src,original:true};add(meta,q,node);}}
  const wordNode=u.nodes.find(n=>n.kind==='word');
  if(wordNode){
   const p=file.units[u.id].nodes[wordNode.id],known=new Set(p.map(item).filter(Boolean).flatMap(q=>learningKeys(q)).filter(k=>k.startsWith('word:')).map(k=>k.slice(5)));
   const pool=[...new Set(topics[topic].split(/\s+/).map(canonical))].map(w=>byWord.get(w)?.[0]).filter(Boolean);
   for(const card of pool){if(known.size>=32)break;const key=canonical(card.word);if(known.has(key))continue;
    const gloss=overrides[key]||cleanGloss(card.zh);if(!gloss)continue;
    const other=pool.filter(c=>canonical(c.word)!==key).map(c=>({en:c.word,zh:overrides[canonical(c.word)]||cleanGloss(c.zh)})).filter(c=>c.zh&&canonical(c.zh)!==canonical(gloss)&&!c.zh.includes(gloss)&&!gloss.includes(c.zh));
    const options=[...new Map(other.map(c=>[canonical(c.zh),c])).values()].slice(0,3);if(options.length<3)continue;
    const id=`quality.lex.${u.id}.${hash(key)}`,listen=hash(key).charCodeAt(0)%3===0;
    const example=card.example&&card.example.toLowerCase().includes(key)?card.example:'';
    const q={id,kind:'word',type:listen?'listen':'choice',targetWord:card.word,prompt:listen?'聽辨本單元延伸字詞。':'選出本單元延伸字詞的意思。',...(listen?{audio:card.word,answer:card.word,options:[card.word,...options.map(x=>x.en)]}:{text:card.word,audio:card.word,answer:gloss,options:[gloss,...options.map(x=>x.zh)]}),why:`${card.word}：${gloss}。${example?'例句：'+example:'先確認詞義，再配合本單元情境練習。'}`,level:level+1,src:u.src,contentSource:{catalogId:card.id,topic}};
    add(meta,q,wordNode);known.add(key);addedLexemes.add(key);guide.words.push({word:card.word,zh:gloss,ipa:'',qualityAdded:true});
   }
  }
  for(const n of u.nodes.filter(n=>n.kind!=='word'&&n.kind!=='boss')){
   const p=file.units[u.id].nodes[n.id],count=()=>uniqueQuestions(p.filter(id=>isScored(item(id))),item,{targets:true}).length;
   if(n.kind==='drill'&&/^b-/.test(n.id)&&count()>=10)continue;
   const listenPilot=/^u[123]:q2$/.test(n.id),buildPilot=/^u[123]:q3$/.test(n.id);
   const talking=n.kind==='talk'||listenPilot||buildPilot;
   if(talking){
    const candidates=dlg.filter(x=>x.level===level).sort((a,b)=>b.tags.filter(k=>meta.tags.includes(k)).length-a.tags.filter(k=>meta.tags.includes(k)).length||a.d.id.localeCompare(b.d.id));
    for(const {d}of candidates){if(count()>=20)break;for(const line of d.lines||[]){if(count()>=20)break;if(!line.en||!line.zh)continue;const lineKey='line:'+canonical(line.en);if(p.map(item).some(q=>q&&learningKeys(q).includes(lineKey)))continue;
     const distractors=(d.lines||[]).filter(x=>x.zh&&canonical(x.zh)!==canonical(line.zh)).map(x=>x.zh);const others=[...new Set(distractors)].slice(0,3);if(others.length<2)continue;
     const base=`quality.dialogue.${hash(d.id+'|'+line.en)}`,tk=String(line.en).replace(/[’‘]/g,"'").replace(/[.,!?;:"()]/g,'').split(/\s+/).filter(Boolean);
     let q={id:base,kind:'talk',type:'listen',prompt:'聽懂這句情境英語，再選擇意思。',audio:line.en,answer:line.zh,options:[line.zh,...others],why:line.en+'｜'+line.zh+(line.note&&!/合成語音|斜線音標|字典音標|一般文字朗讀|孤立音素/.test(line.note)?'。'+line.note:''),level:level+1,src:u.src,contentSource:{dialogue:d.id,title:d.title}};
     if(buildPilot&&tk.length>=3&&tk.length<=12&&tk.every(w=>/^[a-zA-Z']+$/.test(w)))q={...q,id:base+'.build',type:'build',prompt:'用英文表達：「'+line.zh+'」',audio:undefined,answer:tk.join(' '),words:tk.map(w=>w==='I'?'I':w.toLowerCase()),options:undefined,audioAfter:line.en};
     if(buildPilot&&q.type!=='build')continue;add(meta,q,n);integratedLines.add(canonical(line.en));
    }}
   } else {
    const sources=grammarSources.filter(x=>x.meta.level===level&&x.meta.tags.some(tag=>meta.tags.includes(tag))).sort((a,b)=>b.meta.tags.filter(k=>meta.tags.includes(k)).length-a.meta.tags.filter(k=>meta.tags.includes(k)).length||a.q.id.localeCompare(b.q.id));
    for(const {q}of sources){if(count()>=20)break;if(!p.map(item).some(x=>x&&questionKey(x)===questionKey(q)))add(meta,q,n);}
   }
  }
  const data=file.units[u.id];const boss=u.nodes.find(n=>n.kind==='boss');if(boss){const all=u.nodes.filter(n=>n.kind!=='boss').flatMap(n=>data.nodes[n.id]).filter(id=>isScored(item(id)));data.nodes[boss.id]=uniqueQuestions([...data.nodes[boss.id],...all],item);}
  for(const n of u.nodes){data.nodes[n.id]=[...new Set(data.nodes[n.id])];n.size=Math.min(n.kind==='boss'?12:10,uniqueQuestions(data.nodes[n.id].filter(id=>isScored(item(id))),item,{targets:true}).length);}
  const capacities=u.nodes.map(n=>({node:n.id,kind:n.kind,questions:uniqueQuestions(data.nodes[n.id].filter(id=>isScored(item(id))),item).length,targets:uniqueQuestions(data.nodes[n.id].filter(id=>isScored(item(id))),item,{targets:true}).length,wordTargets:new Set(data.nodes[n.id].map(item).filter(Boolean).flatMap(learningKeys).filter(k=>k.startsWith('word:'))).size}));
  for(const row of capacities){const node=u.nodes.find(n=>n.id===row.node);node.capacity={questions:row.questions,targets:row.targets,words:row.wordTargets};}
  report.push({unit:u.id,title:u.title,track:t.id,topic,capacities});
 }
 ix.version=VERSION;for(const [id,file]of files){file.version=VERSION;fs.writeFileSync(`${ROOT}/${id}.json`,JSON.stringify(file)+'\n');fs.copyFileSync(`${ROOT}/${id}.json`,`site/${ROOT}/${id}.json`);}
 fs.writeFileSync(ROOT+'/index.json',JSON.stringify(ix)+'\n');fs.copyFileSync(ROOT+'/index.json','site/'+ROOT+'/index.json');
 const summary={version:VERSION,units:report.length,distinctIntegratedLexemes:addedLexemes.size,distinctIntegratedDialogueLines:integratedLines.size,originalQuestions:Object.values(supplements).reduce((n,p)=>n+p.questions.length,0),thin:report.flatMap(u=>u.capacities.filter(n=>n.kind!=='boss'&&n.targets<10).map(n=>({unit:u.unit,...n}))),report};
 fs.mkdirSync('docs/redesign/verification/question-quality',{recursive:true});fs.writeFileSync('docs/redesign/verification/question-quality/content-capacity.json',JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify({units:report.length,lexemes:addedLexemes.size,dialogueLines:integratedLines.size,original:summary.originalQuestions,thin:summary.thin}));return summary;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)enrichCourseFiles();
