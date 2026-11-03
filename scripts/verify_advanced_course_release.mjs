import fs from 'node:fs';
const sha=process.argv[2];if(!/^[a-f0-9]{40}$/.test(sha||''))throw Error('Provide exact pushed SHA.');
const response=await fetch(`https://api.github.com/repos/waatax/ENG/actions/runs?head_sha=${sha}&per_page=8`,{headers:{'User-Agent':'English-Quest-release-check'}});
if(!response.ok)throw Error(`GitHub ${response.status}`);
const data=await response.json(),run=data.workflow_runs?.find(r=>r.name==='Deploy English Quest to GitHub Pages');
const report={sha,run:run?{id:run.id,url:run.html_url,status:run.status,conclusion:run.conclusion}:null};
if(run?.conclusion==='success'){
 const required=[['index.html','advanced_academy.css?v=advanced20261103'],['start.mjs',"page==='advanced'"],['advanced_content.mjs','ADVANCED_UNITS'],['advanced_progress.mjs','eq_advanced_course_v1'],['advanced_academy.mjs','renderAdvancedCourse'],['advanced_academy.css','.advanced-stage-nav'],['mastery_passport.mjs','eq_advanced_course_v1'],['sw.js','v20261103-advanced1']];
 report.live=await Promise.all(required.map(async([path,marker])=>{const r=await fetch(`https://waatax.github.io/ENG/${path}?release=${sha}`),body=await r.text();return {path,status:r.status,marker:body.includes(marker)};}));
 report.verified=report.live.every(x=>x.status===200&&x.marker);
}
fs.mkdirSync('docs/redesign/verification/advanced-course20261103',{recursive:true});fs.writeFileSync('docs/redesign/verification/advanced-course20261103/deployment.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
if(run?.conclusion==='failure'||report.verified===false)process.exitCode=1;
