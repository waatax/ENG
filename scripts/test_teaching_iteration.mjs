import test from 'node:test';
import assert from 'node:assert/strict';
import {domainOf} from '../dist/learning_catalog.mjs';
test('Phonics, sound awareness and chart reading appear under their actual skill',()=>{
 for(const title of ['字母 A–M 與打招呼','短母音拼讀 CVC','長母音與 Magic e','重音與節奏'])assert.equal(domainOf(title),'sounds',title);
 assert.equal(domainOf('學測圖表與多文本綜合剖析'),'reading');
 assert.equal(domainOf('事物比較與世界之最'),'sentences');
 assert.equal(domainOf('未來計畫與夢想志向'),'sentences');
});
