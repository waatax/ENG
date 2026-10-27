import fs from 'node:fs';
import crypto from 'node:crypto';
const sha=process.argv[2];
if(!/^[0-9a-f]{40}$/.test(sha||''))throw Error('Provide the release commit SHA');
const base='https://waatax.github.io/ENG/',version='simulation20261027r2';
const request=async url=>{const r=await fetch(url,{headers:{'User-Agent':'English-Quest-release-check','Cache-Control':'no-cache'},signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error(`HTTP ${r.status}: ${url}`);return r;};
const data=await (await request(`https://api.github.com/repos/waatax/ENG/actions/runs?head_sha=${sha}&per_page=10`)).json(),run=data.workflow_runs.find(r=>r.path==='.github/workflows/pages.yml');
const report={date:'2026-10-27',sha,version,url:base+'quest/simulation.html?v='+version,workflow:run?{status:run.status,conclusion:run.conclusion,url:run.html_url}:null,files:[],verified:false};
if(run?.conclusion==='success'){
 const hash=s=>crypto.createHash('sha256').update(s.replace(/\r\n/g,'\n')).digest('hex');
 for(const file of ['quest/index.html','quest/view.mjs','quest/exam_view.mjs','quest/simulation.html','quest/simulation.mjs','quest/simulation_view.mjs','quest/simulation.css','quest/course/simulation.json']){
  const response=await request(base+file+'?release='+sha),body=await response.text(),local=fs.readFileSync('dist/'+file,'utf8');report.files.push({file,status:response.status,matches:hash(body)===hash(local)});
 }
 report.verified=report.files.every(f=>f.matches);
}
fs.writeFileSync('docs/redesign/verification/simulation20261027/release.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(!report.verified)process.exitCode=2;
