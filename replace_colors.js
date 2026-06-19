const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) filelist = walkSync(dirFile, filelist);
    else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) filelist.push(dirFile);
  });
  return filelist;
};

const files = walkSync('./src/pages');

let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replacements
  content = content.replace(/bg-white/g, 'bg-[var(--surface)] transition-colors');
  content = content.replace(/bg-\[\#F5F5F5\]/g, 'bg-[var(--bg-secondary)] transition-colors');
  content = content.replace(/bg-\[\#F9F9F9\]/g, 'bg-[var(--bg-tertiary)] transition-colors');
  
  content = content.replace(/text-\[\#111\]/g, 'text-[var(--text-primary)]');
  content = content.replace(/text-\[\#333\]/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-\[\#555\]/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-\[\#6B6B6B\]/g, 'text-[var(--text-tertiary)]');
  
  content = content.replace(/border-\[\#E8E8E8\]/g, 'border-[var(--border)]');
  content = content.replace(/border-\[\#D0D0D0\]/g, 'border-[var(--border-2)]');

  // Some cases of bg-[#111] for headers or dark panels (we've handled Landing, Login, Courses manually)
  // Admin dashboard uses bg-[#111] for the header.
  if (file.includes('Dashboard.tsx') && file.includes('admin')) {
      content = content.replace(/bg-\[\#111\]/g, 'bg-[var(--nav-bg)]');
      content = content.replace(/text-white/g, 'text-[var(--text-primary)]');
  }

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
    changedCount++;
  }
}

console.log('Done! Updated', changedCount, 'files.');
