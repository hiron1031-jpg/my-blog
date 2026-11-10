// 各記事の frontmatter に updated: を入れる。
// 値は git の最終コミット日（その記事フォルダを最後に変更した日）。
// date（公開日）と同じなら入れない。
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const DIR = 'content/posts';
const slugs = fs.readdirSync(DIR).filter(s => fs.existsSync(path.join(DIR, s, 'index.mdx')));
let changed = [], same = 0;

for (const slug of slugs) {
  const file = path.join(DIR, slug, 'index.mdx');
  let git = '';
  try {
    git = execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf8' }).trim();
  } catch { }
  if (!git) { continue; }

  const rawFull = fs.readFileSync(file, 'utf8');
  const bom = rawFull.charCodeAt(0) === 0xFEFF ? '﻿' : '';
  const raw = bom ? rawFull.slice(1) : rawFull;
  const m = raw.match(/^(---\r?\n)([\s\S]*?)(\r?\n---\r?\n)/);
  if (!m) { console.log('frontmatterなし:', slug); continue; }
  const fm = m[2];
  const dm = fm.match(/^date:\s*"?([0-9-]+)"?\s*$/m);
  if (!dm) { console.log('dateなし:', slug); continue; }
  const pub = dm[1];

  if (git === pub) { same++; continue; }

  const line = `updated: "${git}"`;
  let newFm;
  if (/^updated:/m.test(fm)) {
    newFm = fm.replace(/^updated:.*$/m, line);
  } else {
    newFm = fm.replace(/^(date:.*)$/m, `$1\n${line}`);
  }
  if (newFm === fm) { continue; }
  fs.writeFileSync(file, bom + m[1] + newFm + m[3] + raw.slice(m[0].length), 'utf8');
  changed.push(`${slug}  ${pub} -> ${git}`);
}

console.log(`公開日のまま（変更なし）: ${same}本`);
console.log(`updated を入れた: ${changed.length}本`);
changed.sort().forEach(c => console.log('  ' + c));
