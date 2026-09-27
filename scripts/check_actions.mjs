import https from 'node:https';

const options = {
  hostname: 'api.github.com',
  path: '/repos/waatax/ENG/actions/runs?per_page=3',
  headers: { 'User-Agent': 'Node.js' }
};

https.get(options, (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const json = JSON.parse(d);
      if (json.workflow_runs) {
        for (const run of json.workflow_runs) {
          console.log(`Run: ${run.name} | Status: ${run.status} | Conclusion: ${run.conclusion} | Commit: ${run.head_commit?.message?.slice(0, 60)}`);
        }
      } else {
        console.log(d.slice(0, 300));
      }
    } catch (e) {
      console.log('Error parsing:', e.message);
    }
  });
});
