import { curriculum } from './curriculum.mjs';
import { grammarTopics } from './grammar_content.mjs';
import { UNIFIED_GRADES } from './curriculum_unified.mjs';
export const domains = [
 ['全部','全部能力','依目標找教材'],['sounds','發音與聽說','辨識聲音，開口表達'],
 ['words','字詞與搭配','理解詞義與句中用法'],['sentences','句型與文法','組織完整、清楚的句子'],
 ['reading','閱讀與推理','找證據，連結段落意思'],['application','情境與表達','把英文用在生活與工作'],['integrated','綜合與考試','整合能力，練習訂正']
];
export function domainOf(title) {
 if (/句子|人稱|句型|句法|動詞|子句|時態|完成式|進行式|過去式|未來表達|問句|名詞|代名詞|介系詞|比較級|分詞|假設|倒裝|數量詞|連接詞|所有格|冠詞|形容詞|副詞|被動|文法|一致/.test(title)) return 'sentences';
 if (/閱讀|推論|推理|論證|證據|段落|篇章/.test(title)) return 'reading';
 if (/發音|音標|聽力|聽說|口頭|簡報|語音|自然拼讀/.test(title)) return 'sounds';
 if (/字彙|單字|字詞|詞根|字首|字尾|詞彙|搭配/.test(title)) return 'words';
 if (/考試|測驗|整卷|模擬|綜合|英檢|會考|學測|統測|自主學習|全級|\b(?:SAT|GRE|GMAT|TOEFL|TOEIC|GEPT)\b/i.test(title)) return 'integrated';
 return 'application';
}
export function learningCatalog(points=[]) {
 const stageFor={jhs:'國中',sh:'高中',voc:'高工',intl:'國際考試'};
 const entries=[...points.map(p=>({id:p.id,title:p.title,stage:p.stage,description:p.goal,search:p.rule,link:'#knowledge/'+p.id,kind:'核心知識點'})),
 ...curriculum.flatMap(t=>t.chapters.map(c=>({id:t.id+':'+c.id,title:c.title,stage:stageFor[t.id]||t.title,description:c.concepts.map(x=>x.heading).join(' · '),search:c.concepts.map(x=>x.body).join(' '),link:'#chapter/'+t.id+'/'+c.id,kind:'綜合教學章節'}))),
 ...grammarTopics.map(t=>({id:'grammar:'+t.id,title:t.title,stage:t.stage,description:t.rule,search:t.trap,link:'#grammar/'+t.id,kind:'圖解文法'})),
 ...UNIFIED_GRADES.flatMap(g=>g.semesters.flatMap(s=>s.units.map(u=>({id:u.id,title:u.title,stage:/g[1-6]$/.test(g.id)?'國小':/g[7-9]$/.test(g.id)?'國中':'高中',description:[g.title,s.title,u.goal].filter(Boolean).join(' · '),search:u.sourceRef,link:'#unit/'+u.id,kind:'學年微課'}))))];
 return entries.map(c=>({...c,domain:domainOf(c.title)}));
}
export function filterCatalog(entries, query='', stage='全部', domain='全部') {
 const terms=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 return entries.filter(c=>(stage==='全部'||c.stage===stage||(stage==='高中'||stage==='高工')&&c.stage==='高中／高工')&&(domain==='全部'||c.domain===domain)&&terms.every(term=>[c.title,c.stage,c.description,c.search,c.kind].join(' ').toLocaleLowerCase().includes(term)));
}
