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

  // Additional Replacements
  content = content.replace(/text-\[\#111\]/g, 'text-[var(--text-primary)]');
  content = content.replace(/text-\[\#333\]/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-\[\#6B6B6B\]/g, 'text-[var(--text-tertiary)]');
  content = content.replace(/bg-\[\#FDFBF3\]/g, 'bg-[var(--surface-hover)]');
  content = content.replace(/bg-\[\#FFFDF7\]/g, 'bg-[var(--surface-hover)]');
  
  // Specific Navs
  if (file.includes('CourseDetail.tsx') || file.includes('LessonPlayer.tsx')) {
      content = content.replace(/bg-\[\#111\]/g, 'bg-[var(--nav-bg)] transition-colors');
      content = content.replace(/text-white/g, 'text-[var(--text-primary)]');
      content = content.replace(/bg-\[rgba\(255,255,255,\.07\)\]/g, 'bg-[var(--surface)]');
      content = content.replace(/border-\[rgba\(255,255,255,\.2\)\]/g, 'border-[var(--border)]');
  }

  // Soft Backgrounds
  content = content.replace(/bg-\[\#D1FAE5\](?! dark:)/g, 'bg-[#D1FAE5] dark:bg-[rgba(16,185,129,.15)]');
  content = content.replace(/bg-\[\#FDF6DC\](?! dark:)/g, 'bg-[#FDF6DC] dark:bg-[rgba(212,160,23,.12)]');
  content = content.replace(/bg-\[\#FEF3C7\](?! dark:)/g, 'bg-[#FEF3C7] dark:bg-[rgba(212,160,23,.15)]');
  content = content.replace(/bg-\[\#EDE9FE\](?! dark:)/g, 'bg-[#EDE9FE] dark:bg-[rgba(99,102,241,.12)]');
  content = content.replace(/bg-\[\#FEE2E2\](?! dark:)/g, 'bg-[#FEE2E2] dark:bg-[rgba(239,68,68,.12)]');
  content = content.replace(/bg-\[\#E5E7EB\](?! dark:)/g, 'bg-[#E5E7EB] dark:bg-[rgba(255,255,255,.1)]');

  // Dashboard admin specific remaining
  if (file.includes('admin/Dashboard.tsx')) {
      content = content.replace(/bg-\[\#F9F9F9\]/g, 'bg-[var(--bg-tertiary)]');
      content = content.replace(/bg-white/g, 'bg-[var(--surface)]');
      content = content.replace(/border-\[\#E8E8E8\]/g, 'border-[var(--border)]');
      content = content.replace(/border-\[\#D0D0D0\]/g, 'border-[var(--border-2)]');
  }

  // QA and report specific
  content = content.replace(/border-\[rgba\(212,160,23,\.2\)\]/g, 'border-[var(--border)] dark:border-[rgba(212,160,23,.2)]');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated', file);
    changedCount++;
  }
}

console.log('Done! Updated', changedCount, 'files.');
