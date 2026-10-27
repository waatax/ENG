import fs from 'node:fs';
import crypto from 'node:crypto';
const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha || '')) throw Error('Pass the release commit SHA');
const base = 'https://waatax.github.io/ENG/';
const response = await fetch(`https://api.github.com/repos/waatax/ENG/actions/runs?head_sha=${sha}&per_page=20`, { headers: { 'User-Agent': 'English-Quest-release-check' }, signal: AbortSignal.timeout(20000) });
if (!response.ok) throw Error(`GitHub status ${response.status}`);
const { workflow_runs: runs } = await response.json();
const run = runs.find(r => r.path === '.github/workflows/pages.yml');
const report = { date: '2026-10-27', sha, version: 'exams20261027', url: base + 'quest/#exams', workflow: run ? { url: run.html_url, status: run.status, conclusion: run.conclusion } : null, files: [], verified: false };
if (run?.conclusion === 'success') {
  const hash = s => crypto.createHash('sha256').update(s.replace(/\r\n/g, '\n')).digest('hex');
  for (const file of ['index.html', 'platform_nav.mjs', 'platform.css', 'quest/index.html', 'quest/view.mjs', 'quest/sound.mjs', 'quest/coach.mjs', 'quest/quest.css', 'quest/engine.mjs', 'quest/placement.mjs', 'quest/acceleration.mjs', 'quest/atlas.mjs', 'quest/advanced_placement.mjs', 'quest/adventure.mjs', 'quest/semesters.mjs', 'quest/school.mjs', 'quest/school_view.mjs', 'quest/question_quality.mjs', 'quest/exams.mjs', 'quest/exam_view.mjs', 'quest/course/exams.json', 'quest/course/index.json', ...JSON.parse(fs.readFileSync('dist/quest/course/index.json')).sections.concat(JSON.parse(fs.readFileSync('dist/quest/course/index.json')).branches).map(t=>'quest/course/'+t.id+'.json')]) {
    const r = await fetch(base + file + '?release=' + sha, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
    report.files.push({ file, status: r.status, matches: r.ok && hash(await r.text()) === hash(fs.readFileSync('dist/' + file, 'utf8')) });
  }
  report.verified = report.files.every(f => f.matches);
}
fs.writeFileSync('docs/redesign/verification/exams20261027/release-exams.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (!report.verified) process.exitCode = 2;
