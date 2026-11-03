import fs from 'node:fs';
const sha=process.argv[2];
if(!/^[a-f0-9]{40}$/.test(sha||''))throw Error('Provide the exact pushed commit SHA.');
const response=await fetch(`https://api.github.com/repos/waatax/ENG/actions/runs?head_sha=${sha}&per_page=4`,{headers:{'User-Agent':'English-Quest-release-check'}});
if(!response.ok)throw Error(`GitHub status ${response.status}`);
const data=await response.json(),run=data.workflow_runs?.find(r=>r.name==='Deploy English Quest to GitHub Pages');
const report={sha,run:run?{id:run.id,url:run.html_url,status:run.status,conclusion:run.conclusion}:null};
if(run?.conclusion==='success'){
  const base='https://waatax.github.io/ENG/';
  const required=[['index.html','learning_joy.css?v=joy20261103'],['quest/index.html','view.mjs?v=joy20261103'],['flashcard_recall.mjs','renderRecallStudio'],['recall.mjs','sameDay'],['quest/missions.mjs','renderUnitMissions'],['mastery_passport.mjs','eq_recall_v1']];
  report.live=await Promise.all(required.map(async([path,marker])=>{
    const r=await fetch(`${base}${path}?release=${sha}`),body=await r.text();
    return {path,status:r.status,marker:body.includes(marker)};
  }));
  report.verified=report.live.every(r=>r.status===200&&r.marker);
}
fs.mkdirSync('docs/redesign/verification/joy20261103',{recursive:true});
fs.writeFileSync('docs/redesign/verification/joy20261103/deployment.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(run?.conclusion==='failure'||report.verified===false)process.exitCode=1;
