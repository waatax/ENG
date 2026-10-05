import fs from 'node:fs';
import path from 'node:path';

function syncDirectory(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      syncDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      const srcBuf = fs.readFileSync(srcPath);
      fs.writeFileSync(destPath, srcBuf);
      const destBuf = fs.readFileSync(destPath);
      if (srcBuf.compare(destBuf) !== 0) {
        throw new Error(`Sync parity failed for ${srcPath} -> ${destPath}`);
      }
    }
  }
}

syncDirectory('dist', path.join('site', 'dist'));
console.log('All files synced from dist/ to site/dist/ successfully with 100% byte parity!');
