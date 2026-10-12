import test from 'node:test';
import assert from 'node:assert/strict';
import {createMnemonicPlaylist} from '../dist/mnemonics/mnemonic_playlist.mjs';
class Audio{
 constructor(){this.events={};this.played=[];this.paused=true;this.ended=false;this.error=null;this.currentTime=0;}
 addEventListener(name,fn){(this.events[name]??=[]).push(fn);}
 set src(value){this.url=value;this.currentTime=0;this.ended=false;this.error=null;}
 get src(){return this.url;}
 async play(){this.paused=false;this.played.push(this.url);if(this.failure)throw Error('blocked');}
 pause(){this.paused=true;}
 event(name){for(const f of this.events[name]||[])f();}
 end(){this.ended=true;this.paused=true;this.event('ended');}
}
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
function setup(count=1000){const audio=new Audio();let available=Array.from({length:count},(_,i)=>({id:'w'+i,word:'word'+i,cue:'提示',zh:'意思'}));let otherStops=0;const p=createMnemonicPlaylist({audio,getCards:()=>available,baseUrl:'https://example.com/mnemonics/app.mjs',stopOther:()=>otherStops++});return {audio,p,setCards:c=>{available=c;},otherStops:()=>otherStops};}
test('All 1000 revised cards play once in order and stop after the last',async()=>{const {audio,p,setCards,otherStops}=setup();await p.start();setCards([]);for(let i=0;i<1000;i++){assert.equal(p.getState().index,i);assert.equal(p.getState().total,1000);assert.ok(new URL(audio.src).pathname.endsWith('/audio-trio/word'+i+'.mp3'));assert.equal(new URL(audio.src).searchParams.get('v'),'keyword6');audio.end();await tick();}assert.equal(p.getState().status,'complete');assert.equal(audio.played.length,1000);assert.equal(new Set(audio.played).size,1000);assert.equal(otherStops(),1000);audio.event('ended');await tick();assert.equal(audio.played.length,1000);});
test('Pause/resume preserves the current position; next moves exactly one card',async()=>{const {audio,p}=setup(3);await p.start();audio.currentTime=2.5;await p.toggle();assert.equal(p.getState().status,'paused');assert.ok(audio.paused);await p.toggle();assert.equal(audio.currentTime,2.5);assert.equal(p.getState().index,0);await p.next();assert.equal(p.getState().index,1);assert.equal(audio.currentTime,0);});
test('Stop cancels queued playback and a fresh start begins at the first card',async()=>{const {audio,p}=setup(3);await p.start();await p.next();p.stop();audio.end();await tick();assert.equal(p.getState().status,'idle');assert.equal(audio.played.length,2);await p.start();assert.equal(p.getState().index,0);});
test('Missing files stop progression until retry or explicit next',async()=>{const {audio,p}=setup(3);await p.start();audio.error={code:4};audio.event('error');assert.equal(p.getState().status,'error');audio.end();await tick();assert.equal(p.getState().index,0);await p.toggle();assert.equal(p.getState().index,0);assert.equal(p.getState().status,'playing');audio.error={code:4};audio.event('error');await p.next();assert.equal(p.getState().index,1);});
test('An obsolete rejected play promise cannot restart or corrupt a stopped queue',async()=>{const {audio,p}=setup(3);let reject;audio.play=()=>new Promise((r,j)=>{reject=j;});const pending=p.start();p.stop();reject(Error('aborted'));await pending;assert.equal(p.getState().status,'idle');assert.equal(p.getState().index,-1);});
test('Word-family playlists use their own file names with the shared version tag',async()=>{const audio=new Audio();const groups=[{id:'wf-001'},{id:'wf-002'}];const p=createMnemonicPlaylist({audio,getCards:()=>groups,baseUrl:'https://example.com/roots/app.mjs',fileFor:g=>'audio/'+g.id+'.mp3'});await p.start();assert.equal(new URL(audio.src).pathname,'/roots/audio/wf-001.mp3');assert.equal(new URL(audio.src).searchParams.get('v'),'keyword6');audio.end();await tick();assert.equal(new URL(audio.src).pathname,'/roots/audio/wf-002.mp3');audio.end();await tick();assert.equal(p.getState().status,'complete');});
