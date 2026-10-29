import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const docsOutDir = path.join(rootDir, 'docs', 'out');

if (!fs.existsSync(docsOutDir)) {
  console.error('docs/out does not exist. Run "npm run build:docs" first.');
  process.exit(1);
}

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Copy _next to dist/_next
const nextSrc = path.join(docsOutDir, '_next');
const nextDest = path.join(distDir, '_next');
if (fs.existsSync(nextSrc)) {
  fs.cpSync(nextSrc, nextDest, { recursive: true });
}

// 2. Copy api to dist/api
const apiSrc = path.join(docsOutDir, 'api');
const apiDest = path.join(distDir, 'api');
if (fs.existsSync(apiSrc)) {
  fs.cpSync(apiSrc, apiDest, { recursive: true });
}

// 3. Copy docs folder to dist/docs
const docsSrc = path.join(docsOutDir, 'docs');
const docsDest = path.join(distDir, 'docs');
if (fs.existsSync(docsSrc)) {
  fs.cpSync(docsSrc, docsDest, { recursive: true });
}

// 4. Copy docs.html to dist/docs.html and dist/docs/index.html
const docsHtml = path.join(docsOutDir, 'docs.html');
if (fs.existsSync(docsHtml)) {
  fs.copyFileSync(docsHtml, path.join(distDir, 'docs.html'));
  fs.mkdirSync(docsDest, { recursive: true });
  fs.copyFileSync(docsHtml, path.join(docsDest, 'index.html'));
}

// 5. Copy llms.txt & llms-full.txt
for (const file of ['llms.txt', 'llms-full.txt']) {
  const fSrc = path.join(docsOutDir, file);
  if (fs.existsSync(fSrc)) {
    fs.copyFileSync(fSrc, path.join(distDir, file));
  }
}

// 6. Copy .nojekyll to ensure GitHub Pages serves _next folders
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

console.log('✓ Successfully merged marketing site and documentation into dist/');
