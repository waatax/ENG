// Normalize only the new editorial source files, never unrelated documents.
import fs from 'node:fs';
import {Converter} from 'opencc-js';
const convert=Converter({from:'cn',to:'tw'});
const homophones=new Set('son sun muscle pear beet week hour hear know meet see sail'.split(' '));
const rows=fs.readFileSync('data/mnemonic_revision.txt','utf8').trim().split(/\r?\n/).map(line=>line.split('|'));
for(const row of rows){
 if(homophones.has(row[0]))row[1]='h';
 if(['bandage','ski','chili','baby'].includes(row[0]))row[1]='i';
 if(row[0]==='kiwi')row[1]='b';
 if(row[0]==='bandage'){row[2]='繃帶纏傷口';row[3]='長布帶繞傷處，固定並覆蓋傷口。';}
 if(row[0]==='ski')row[3]='腳下兩片滑雪長板，雪杖推動前進。';
 if(row[0]==='chili')row[3]='辣椒做成辣醬，吃一口額頭冒汗。';
 if(row[0]==='baby'){row[2]='抱著寶貝，小嬰兒';row[3]='把小寶貝抱在懷裡，連到還很小的嬰兒。';}
 if(row[0]==='kiwi')row[3]='熟悉名稱奇異果，褐皮剖開露出綠肉與黑籽。';
 if(row[0]==='squid'){row[2]='魷魚十附肢，章魚八腕';row[3]='用八腕加兩條長觸腕與長形身體，對比章魚。';}
 if(row[0]==='sloth')row[3]='用慢動作想像樹懶沿樹枝倒掛移動。';
 if(row[0]==='noodle')row[3]='筷子從湯碗挑起長麵條，記住通常吃的是多條麵。';
 for(let i=2;i<4;i++)row[i]=convert(row[i]).replaceAll('白天天陽','白天太陽');
}
const rank=new Map(JSON.parse(fs.readFileSync('data/mnemonic-baseline.json','utf8')).map((c,i)=>[c.word,i]));
rows.sort((a,b)=>rank.get(a[0])-rank.get(b[0]));
fs.writeFileSync('data/mnemonic_revision.txt',rows.map(r=>r.join('|')).join('\n')+'\n');
fs.writeFileSync('data/mnemonic_links.txt',convert(fs.readFileSync('data/mnemonic_links.txt','utf8')));
