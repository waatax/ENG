import { renderWordFormationMorphologyDiagram } from './lesson_visuals.mjs';
import {renderAffixLibrary} from './affix_library.mjs';
const e=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Examples are explicit vocabulary, not generated combinations.
export const AFFIX_LESSONS = [
 ['字首','un-','不；相反；解除','想像把原本的狀態反轉。','un + happy|unhappy|不快樂;un + fair|unfair|不公平;un + known|unknown|未知的;un + lock|unlock|解鎖','un- 接形容詞常表示否定，接部分動詞可表示解除。uncle 的 un 不是此字首。'],
 ['字首','in- / im- / il- / ir-','不；非','同一否定家族，依單字有不同拼法。','in + correct|incorrect|不正確;im + possible|impossible|不可能;il + legal|illegal|不合法;ir + regular|irregular|不規則','im- 常見於 m、p、b 前，il- 在 l 前，ir- 在 r 前；不能任意替每個字套用。in- 有時另表示向內。'],
 ['字首','dis-','不；相反；分離','從同意變不同意，從連接變分開。','dis + agree|disagree|不同意;dis + honest|dishonest|不誠實;dis + appear|disappear|消失;dis + connect|disconnect|斷開','不是所有 dis 開頭的字都能直接去掉 dis 當基底詞。'],
 ['字首','non-','非；不是某類','用來分類：不是這一類。','non + fiction|nonfiction|非虛構作品;non + smoker|nonsmoker|不吸菸者;non + verbal|nonverbal|非言語的;non + stop|nonstop|不停的','有些拼法帶連字號；non- 往往是中性的分類否定。'],
 ['字首','re-','再一次；重新','按一次重播鍵。','re + read|reread|重讀;re + write|rewrite|重寫;re + build|rebuild|重建;re + use|reuse|再使用','real 不能拆成 re + al。看到相同字母不代表具有同一構詞。'],
 ['字首','mis-','錯誤地；不當地','做了，但做錯了。','mis + understand|misunderstand|誤解;mis + spell|misspell|拼錯;mis + lead|mislead|誤導;mis + use|misuse|誤用','misspell 是 mis + spell，交界保留兩個 s。'],
 ['字首','pre-','在…之前；預先','把事情放到時間線前方。','pre + view|preview|預覽;pre + heat|preheat|預熱;pre + school|preschool|學前教育;pre + pay|prepay|預付','預付與再次付款不同：prepay 是先付，repay 是償還。'],
 ['字首','post-','在…之後','把事情放到時間線後方。','post + war|postwar|戰後的;post + graduate|postgraduate|研究所學生／研究所的;post + election|post-election|選舉後的;post + operative|postoperative|手術後的','post 本身也可指郵件或職位，要依完整單字判斷。'],
 ['字首','over-','過度；超過','超過剛好的刻度。','over + work|overwork|工作過度;over + cook|overcook|煮過頭;over + estimate|overestimate|高估;over + confident|overconfident|過度自信','over- 也可涉及上方或跨越，不能永遠翻成過度。'],
 ['字首','under-','不足；低於；在下','低於需要的刻度。','under + estimate|underestimate|低估;under + paid|underpaid|薪資過低的;under + cook|undercook|烹煮不足;under + ground|underground|地下的','understand 要當完整單字學，不能用「在下面站立」直譯。'],
 ['字首','inter-','在…之間；互相','兩個或多個群體之間的連線。','inter + national|international|國際的;inter + personal|interpersonal|人際的;inter + continental|intercontinental|洲際的;inter + connect|interconnect|互相連接','inter- 是之間；intra- 是同一範圍內，如 intranet 內部網路。'],
 ['字首','trans-','跨越；轉移','越過邊界到另一邊。','trans + atlantic|transatlantic|跨大西洋的;trans + continental|transcontinental|橫越大陸的;trans + national|transnational|跨國的;trans + plant|transplant|移植','構詞先提供方向，實際意思仍由語境決定。'],
 ['字首','sub-','在下；次級','大分類下的一層。','sub + title|subtitle|字幕／副標題;sub + group|subgroup|子群;sub + section|subsection|小節;sub + zero|subzero|零度以下的','subtitle 的字幕意思不能只靠逐部分直譯。'],
 ['字首','super-','超出；在上','比一般程度更高。','super + human|superhuman|超人的;super + market|supermarket|超級市場;super + power|superpower|超級強權／超能力;super + sonic|supersonic|超音速的','supermarket 是固定詞，記住整體意思與拼法。'],
 ['字首','anti-','反對；對抗','站到相反陣營。','anti + war|antiwar|反戰的;anti + bacterial|antibacterial|抗菌的;anti + theft|anti-theft|防盜的;anti + virus|antivirus|防毒的','anti- 常指對抗，non- 常指不是某一類，兩者不完全相同。'],
 ['字首','co-','共同；一起','兩個人一起做。','co + author|coauthor|共同作者;co + worker|co-worker|同事;co + founder|cofounder|共同創辦人;co + exist|coexist|共存','連字號可能依字典或寫作風格不同；學習時保留完整詞形。'],
 ['字首','mono- / bi- / tri- / multi-','一／二／三／多','用數量為詞義建立圖像。','mono + lingual|monolingual|單語的;bi + lingual|bilingual|雙語的;tri + cycle|tricycle|三輪車;multi + cultural|multicultural|多元文化的','biweekly 可能指每兩週或每週兩次，實際排程要確認。'],
 ['字尾','-er / -or','做某事的人或工具','動作後面加上執行者。','teach + er|teacher|教師;sing + er|singer|歌手;act + or|actor|演員;invent + or|inventor|發明家','不是所有職業都能任意加 -er；cooker 是炊具，cook 才是廚師。'],
 ['字尾','-ist','從事某專業或持某立場的人','把領域連到從事它的人。','art + ist|artist|藝術家;violin + ist|violinist|小提琴家;tour + ist|tourist|觀光客;novel + ist|novelist|小說家','tourist 的範圍是參與旅遊的人，不限職業。'],
 ['字尾','-ness','性質或狀態（名詞）','把「怎樣的」變成「這種性質」。','kind + ness|kindness|善意;dark + ness|darkness|黑暗;weak + ness|weakness|弱點／虛弱;happy + ness → happi + ness|happiness|快樂','子音 + y 結尾常先改 y 為 i；如 happy → happiness。'],
 ['字尾','-ment','動作、結果或狀態（名詞）','把動作打包成一件事。','develop + ment|development|發展;improve + ment|improvement|改善;agree + ment|agreement|協議;achieve + ment|achievement|成就','不是每個動詞都能加 -ment；要連同常用詞一起記。'],
 ['字尾','-tion / -sion','動作、過程或結果（名詞）','常出現在動詞的名詞家族。','educate → education|education|教育;inform → information|information|資訊;decide → decision|decision|決定;discuss → discussion|discussion|討論','這裡用詞族箭頭表示轉換；不是把字尾直接接到完整動詞後面。'],
 ['字尾','-ity','性質或狀態（名詞）','把特性變成抽象名詞。','active → activity|activity|活動;possible → possibility|possibility|可能性;equal → equality|equality|平等;responsible → responsibility|responsibility|責任','拼字與重音可能改變，整組詞形與發音要一起學。'],
 ['字尾','-ship','身分；關係；能力（名詞）','想像人與人之間的連結。','friend + ship|friendship|友誼;member + ship|membership|會員資格;leader + ship|leadership|領導能力;partner + ship|partnership|夥伴關係','這個字尾與獨立單字 ship（船）在此的意思不同。'],
 ['字尾','-ful','充滿；具有（形容詞）','把杯子裝滿某種特質。','care + ful|careful|小心的;help + ful|helpful|有幫助的;hope + ful|hopeful|充滿希望的;beauty → beautiful|beautiful|美麗的','字尾只有一個 l：helpful；加 -ly 才形成 helpfully。'],
 ['字尾','-less','沒有；缺乏（形容詞）','把杯子裡的特質倒空。','care + less|careless|粗心的;hope + less|hopeless|無望的;home + less|homeless|無家可歸的;harm + less|harmless|無害的','careful / careless 可成對記；但不是每個 -ful 字都有常用 -less 對應詞。'],
 ['字尾','-able / -ible','可以…的；適合…的（形容詞）','想像「可以做到」的標籤。','read + able|readable|可讀的;accept + able|acceptable|可接受的;access + ible|accessible|可進入／可取得的;reverse → reversible|reversible|可逆的','-able 與 -ible 不能互換；須記完整拼字。comfortable 的常用意思是舒適的。'],
 ['字尾','-ous','具有某性質（形容詞）','從事物想到它的特質。','danger + ous|dangerous|危險的;poison + ous|poisonous|有毒的;fame → famous|famous|著名的;nerve → nervous|nervous|緊張的','可能有去 e 等拼字變化；有些詞的日常意思已較特殊。'],
 ['字尾','-al / -ic','與…相關（形容詞）','把主題變成描述詞。','nation + al|national|國家的;person + al|personal|個人的;hero + ic|heroic|英勇的;artist + ic|artistic|藝術的','economic（經濟的）與 economical（節省的）不同，別只看相同字根。'],
 ['字尾','-y','有…特徵（形容詞）','用天氣與感官畫面記。','rain + y|rainy|下雨的;cloud + y|cloudy|多雲的;wind + y|windy|多風的;sun → sunny|sunny|晴朗的','sunny 要雙寫 n；不是所有 y 結尾的字都是這個字尾。'],
 ['字尾','-ly','以…方式（常形成副詞）','用來回答「怎麼做」。','slow + ly|slowly|緩慢地;careful + ly|carefully|小心地;quiet + ly|quietly|安靜地;easy → easily|easily|容易地','friendly、lovely 是形容詞；family 的 ly 不是這個副詞字尾。'],
 ['字尾','-ize / -ise','使成為；使…化（動詞）','把性質變成改變的動作。','modern + ize|modernize|現代化;special + ize|specialize|專精;legal + ize|legalize|使合法;central + ize|centralize|集中','部分字有英美拼法差異，如 modernise / modernize；不能對所有字一律互換。'],
 ['字尾','-en / -ify','使成為；變得（動詞）','讓原本的狀態改變。','dark + en|darken|變暗／使變暗;short + en|shorten|縮短;simple → simplify|simplify|簡化;pure → purify|purify|淨化','-ify 常伴隨基底拼字改變，請用詞族箭頭記憶。'],
 ['字尾','-er / -est','比較級／最高級','從高，到更高，再到最高。','tall + er|taller|更高的;tall + est|tallest|最高的;big → bigger|bigger|更大的;happy → happiest|happiest|最快樂的','與 teacher 的 -er 不同；長形容詞常用 more / most。'],
 ['字尾','-s / -es / -ed / -ing','複數；三單；過去；分詞','這一組主要標示文法形式。','book + s|books|書（複數）;watch + es|watches|手錶（複數）／觀看（三單）;walk + ed|walked|走過／走了;read + ing|reading|閱讀中／閱讀這件事','-ed、-s 有不同發音；-ing 也可作名詞或形容詞用，依句子判斷。']
].map(([type,affix,meaning,memory,examples,trap])=>({type,affix,meaning,memory,examples:examples.split(';').map(x=>{const [split,word,zh]=x.split('|');return {split,word,zh};}),trap}));

export function renderAffixMatrixTable() {
  return `
    <div class="lesson-table card" tabindex="0" role="region" aria-label="大考高頻核心字首字尾構詞黃金矩陣表" style="margin:20px 0;padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
        <strong style="color:#0f172a;font-size:15px">📊 大考高頻核心字首字尾構詞黃金矩陣表</strong>
        <span class="pill" style="font-size:11px;background:#ecfdf5;color:#047857">單字倍增利器</span>
      </div>
      <table>
        <caption>英語構詞核心前綴後綴分類、詞性轉換與高頻詞族速查</caption>
        <thead>
          <tr>
            <th scope="col">構詞分類</th>
            <th scope="col">代表性字綴</th>
            <th scope="col">核心語義</th>
            <th scope="col">詞性與功能轉換</th>
            <th scope="col">大考高頻詞族範例</th>
            <th scope="col">考場辨析與避雷</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1. 否定與反向前綴</th>
            <td>un-, in-/im-/il-/ir-, dis-, non-, mis-</td>
            <td>不、相反、非、錯誤</td>
            <td>不改變詞性 (通常保留原詞性)</td>
            <td>unhappy (不快樂), impossible (不可能), disagree (不同意), misunderstand (誤解)</td>
            <td>im- 接在 m/p 前；mis- 表做錯 (misspell)，un- 表反轉或否定</td>
          </tr>
          <tr>
            <th scope="row">2. 時間與空間前綴</th>
            <td>pre-, post-, inter-, trans-, sub-, super-</td>
            <td>在前、在後、在…之間、跨越、在下、在上</td>
            <td>語義空間/時間定向</td>
            <td>preview (預覽), postwar (戰後), international (國際的), subway (地鐵)</td>
            <td>prepay 是預先付款，repay 是償還；inter- 是兩者之間，intra- 是同組織內部</td>
          </tr>
          <tr>
            <th scope="row">3. 抽象名詞後綴</th>
            <td>-tion/-sion, -ment, -ness, -ity, -ship</td>
            <td>動作、過程、狀態、身分</td>
            <td>動詞/形容詞 ➔ 抽象名詞</td>
            <td>education (教育), development (發展), kindness (善良), responsibility (責任)</td>
            <td>子音 + y 接 -ness 時變 i (happiness)；-ment 通常不改變動詞拼字</td>
          </tr>
          <tr>
            <th scope="row">4. 動作執行者後綴</th>
            <td>-er/-or, -ist, -ian, -ee</td>
            <td>做某事的人、專家、受動者</td>
            <td>動詞/名詞 ➔ 人/職業名詞</td>
            <td>teacher (教師), inventor (發明家), scientist (科學家), employee (員工)</td>
            <td>-er/-or 為主動執行者；-ee 為動作接受者 (interviewer 面試官 vs. interviewee 應試者)</td>
          </tr>
          <tr>
            <th scope="row">5. 形容詞特質後綴</th>
            <td>-ful, -less, -able/-ible, -ous, -al/-ic</td>
            <td>充滿、缺乏、能夠、具有…性質</td>
            <td>名詞/動詞 ➔ 形容詞</td>
            <td>careful (小心), careless (粗心), readable (可讀), dangerous (危險), national (國家)</td>
            <td>-ful 字尾只有一個 l (helpful)；economic 經濟的 vs. economical 節儉的</td>
          </tr>
          <tr>
            <th scope="row">6. 動詞轉化後綴</th>
            <td>-ize/-ise, -en, -ify</td>
            <td>使成為、使…化、變得</td>
            <td>形容詞/名詞 ➔ 動詞</td>
            <td>modernize (現代化), sharpen (削尖), simplify (簡化), purify (淨化)</td>
            <td>-ize 常為美式拼法，-ise 為英式；-ify 常伴隨去 e 或詞根變化</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export function renderAffixGuide(){
 const count=AFFIX_LESSONS.reduce((n,l)=>n+l.examples.length,0);
 return `<article class="lesson-page affix-guide"><header class="affix-hero"><p class="pill">WORD BUILDING · 構詞學習</p><h1>拆開理解，串起一整組單字</h1><p>從常見字首、字尾的代表意思開始，用 ${AFFIX_LESSONS.length} 組規則、${count} 個範例練習推測詞義，再回到句子確認。</p><div class="lesson-links"><a class="btn primary" href="#affix-prefixes">先學字首 ↓</a><a class="btn" href="#affix-suffixes">再學字尾 ↓</a><a class="btn quiet" href="#wordpractice">回字卡練習 →</a></div></header>
 <section class="card"><h2>先分清楚：位置、意思與詞性</h2><div class="affix-basics"><div><h3>字首 Prefix</h3><p>加在基底前面，常調整意思。</p><strong>un + happy → unhappy</strong><p>不 + 快樂 → 不快樂的</p></div><div><h3>基底詞與字根</h3><p>基底是加字首或字尾的起點。字根承載核心意思，有時不能單獨使用，例如 spect（看）。</p><strong>inspect → 檢查</strong></div><div><h3>字尾 Suffix</h3><p>接在後面，常提示詞性，也可能標示文法變化。</p><strong>teach + er → teacher</strong><p>教導 + 做事的人 → 教師</p></div></div><p class="structure-note">「+」表示構詞關係；「→」表示詞形轉換，可能需要刪字、改字或雙寫。構詞不是發音音節切分。</p></section>
 ${renderWordFormationMorphologyDiagram()}${renderAffixMatrixTable()}<section class="card"><h2>一個詞族，分四步記</h2><ol><li><strong>讀基底：</strong>care 關心／小心。</li><li><strong>加字尾：</strong>careful 小心的；careless 粗心的。</li><li><strong>換詞性：</strong>carefully 小心地；carelessness 粗心（名詞）。</li><li><strong>放進句子：</strong><span lang="en">Please read the instructions carefully.</span> 請仔細閱讀說明。</li></ol><p>每天選 3 組，先遮住中文猜意思，再說一個自己的句子；隔天從英文回想一次。</p></section>
 ${['字首','字尾'].map((type,i)=>`<section id="affix-${i?'suffixes':'prefixes'}" class="affix-section"><h2>${i?'02 字尾：看詞性與狀態':'01 字首：看方向與意思'}</h2><p>${i?'先學名詞、形容詞、副詞與動詞字尾，再比較文法結尾。':'把否定、時間、程度、位置與數量連成有意義的家族。'}</p><div class="affix-grid">${AFFIX_LESSONS.filter(l=>l.type===type).map(l=>`<section class="card affix-card"><p class="pill">${e(l.type)}</p><h3 lang="en">${e(l.affix)}</h3><p class="affix-meaning">${e(l.meaning)}</p><p>${e(l.memory)}</p><ul class="affix-examples">${l.examples.map(x=>`<li><span class="affix-formula" lang="en">${e(x.split)}</span><div><strong lang="en">${e(x.word)}</strong><span>${e(x.zh)}</span><button class="btn quiet small" data-speak-word="${e(x.word)}" aria-label="朗讀 ${e(x.word)}">聽發音</button></div></li>`).join('')}</ul><details><summary>易混淆提醒</summary><p>${e(l.trap)}</p></details></section>`).join('')}</div></section>`).join('')}
 ${renderAffixLibrary()}
 <section class="card"><h2>快速回想：先猜，再展開核對</h2>${[['unfair 的 un- 是什麼意思？','不；相反。fair 公平 → unfair 不公平。'],['careless 與 carefully 的詞性有何不同？','careless 是形容詞「粗心的」；carefully 是副詞「小心地」。注意兩者意思也不同。'],['teacher 和 taller 都以 er 結尾，意思一樣嗎？','不同。teacher 的 -er 表做事的人；taller 的 -er 表比較級。'],['family 可以拆成 fam + 副詞字尾 ly 嗎？','不可以。字母相同不等於構詞相同，family 要當完整單字學。'],['為什麼 happy + ness 變成 happiness？','子音 + y 結尾接 -ness 時，常先把 y 改成 i。'],['預熱與重新加熱如何分辨？','preheat 是預熱；reheat 是重新加熱。']].map(([q,a])=>`<details class="affix-review"><summary>${e(q)}</summary><p>${e(a)}</p></details>`).join('')}<p>推測後還要查核：字首字尾不一定只有一種意思，也不能任意拼接造字。</p><a class="btn primary" href="#wordpractice">用字卡測試回想 →</a></section>
 <footer class="card"><h2>延伸查核</h2><p>上方是常見構詞的入門整理與教學範例，並非全部英文構詞規則。遇到陌生詞、特殊拼字或多義字，請查學習字典。</p><a href="https://dictionary.cambridge.org/grammar/british-grammar/prefixes" target="_blank" rel="noopener">Cambridge：Prefixes</a> · <a href="https://dictionary.cambridge.org/grammar/british-grammar/suffixes" target="_blank" rel="noopener">Cambridge：Suffixes</a></footer></article>`;
}
