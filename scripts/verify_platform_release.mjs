import fs from 'node:fs';
import crypto from 'node:crypto';
const sha=process.argv[2];if(!/^[0-9a-f]{40}$/.test(sha||''))throw Error('Pass the release commit SHA');
const repo='waatax/ENG',base='https://waatax.github.io/ENG/';
const response=await fetch(`https://api.github.com/repos/${repo}/actions/runs?head_sha=${sha}&per_page=20`,{headers:{'User-Agent':'English-Quest-release-verification'},signal:AbortSignal.timeout(20000)});
if(!response.ok)throw Error(`GitHub status ${response.status}`);
const data=await response.json(),run=data.workflow_runs.find(r=>r.path==='.github/workflows/pages.yml');
const report={date:'2026-10-24',sha,version:'platform-hub1',url:base,workflow:run?{url:run.html_url,status:run.status,conclusion:run.conclusion}:null,files:[],verified:false};
if(run?.conclusion==='success'){
 const hash=s=>crypto.createHash('sha256').update(s.replace(/\r\n/g,'\n')).digest('hex');
 for(const file of JSON.parse(fs.readFileSync('docs/redesign/verification/platform-hub/files.json'))){
  const r=await fetch(base+file+'?release='+sha,{cache:'no-store',signal:AbortSignal.timeout(20000)});
  const text=await r.text(),expected=hash(fs.readFileSync('dist/'+file,'utf8'));
  report.files.push({file,status:r.status,sha256:hash(text),matches:r.ok&&hash(text)===expected});
 }
 report.verified=report.files.every(f=>f.matches);
}
fs.writeFileSync('docs/redesign/verification/platform-hub/release.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(!report.verified)process.exitCode=2;
