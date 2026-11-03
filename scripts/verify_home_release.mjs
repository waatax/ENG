import fs from 'node:fs';
const sha=process.argv[2];
if(!/^[a-f0-9]{40}$/.test(sha||''))throw Error('Provide exact pushed commit SHA.');
const api=await fetch(`https://api.github.com/repos/waatax/ENG/actions/runs?head_sha=${sha}&per_page=8`,{headers:{'User-Agent':'English-Quest-release-check'}});
if(!api.ok)throw Error(`GitHub status ${api.status}`);
const data=await api.json(),run=data.workflow_runs?.find(r=>r.name==='Deploy English Quest to GitHub Pages');
const report={sha,run:run?{id:run.id,url:run.html_url,status:run.status,conclusion:run.conclusion}:null};
if(run?.conclusion==='success'){
 const required=[['index.html','home_experience.css?v=launch20261103'],['start.mjs','learning_hub.mjs?v=launch20261103'],['home_experience.mjs','renderHomeHero'],['home_experience.css','.home-hero'],['masterclass.mjs','renderMasterclass'],['quest/index.html','start.mjs?v=launch20261103r2'],['quest/view.mjs','quickstart.mjs?v=launch20261103'],['quest/quickstart.mjs','startQuickLesson'],['sw.js','v20261103-launch2']];
 report.live=await Promise.all(required.map(async([path,marker])=>{const r=await fetch(`https://waatax.github.io/ENG/${path}?release=${sha}`),body=await r.text();return {path,status:r.status,marker:body.includes(marker)};}));
 report.verified=report.live.every(x=>x.status===200&&x.marker);
}
fs.mkdirSync('docs/redesign/verification/launch20261103',{recursive:true});fs.writeFileSync('docs/redesign/verification/launch20261103/deployment.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(run?.conclusion==='failure'||report.verified===false)process.exitCode=1;
