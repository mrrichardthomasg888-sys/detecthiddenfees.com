const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://detecthiddenfees.com';
const redirects = new Map();
for (const line of fs.readFileSync(path.join(ROOT, '_redirects'), 'utf8').split(/\r?\n/)) {
  const match = line.match(/^\s*\/(\S+)\s+(\/\S+)\s+(?:301|302|307|308)\b/);
  if (!match) continue;
  const source = match[1].replace(/\.html$/i, '');
  const destination = match[2];
  if (destination.startsWith('/')) redirects.set(source, destination);
}

const includeDirty = process.argv.includes('--include-dirty');
const dirtyHtml = new Set(execFileSync('git', ['diff', '--name-only'], { cwd: ROOT, encoding: 'utf8' })
  .split(/\r?\n/).filter((file) => file.endsWith('.html')).map((file) => file.replace(/\\/g, '/')));
const files = fs.readdirSync(ROOT).filter((file) => file.endsWith('.html') && (includeDirty || !dirtyHtml.has(file)));
const changed = [];
let replacements = 0;

for (const file of files) {
  const original = fs.readFileSync(path.join(ROOT, file), 'utf8');
  let next = original;
  for (const [source, destination] of redirects) {
    const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(href\\s*=\\s*["'])(?:${SITE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})?/${escaped}(?:\\.html)?(?=([#?"']))`, 'gi');
    next = next.replace(pattern, (match, prefix) => {
      replacements += 1;
      return `${prefix}${destination}`;
    });
  }
  if (next !== original) {
    fs.writeFileSync(path.join(ROOT, file), next, 'utf8');
    changed.push(file);
  }
}

console.log(`Rewrote ${replacements} internal redirect links across ${changed.length} HTML files${includeDirty ? '' : `; skipped ${dirtyHtml.size} already-modified HTML files`}.`);
