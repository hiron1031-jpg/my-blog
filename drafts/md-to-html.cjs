const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('Usage: node md-to-html.cjs <input.md> <output.html>');
  process.exit(1);
}

const md = fs.readFileSync(inputPath, 'utf8');

function mdToHtml(text) {
  const lines = text.split('\n');
  const out = [];
  let inTable = false;
  let tableLines = [];
  let inList = false;

  function flushList() {
    if (inList) {
      out.push('</ul>');
      inList = false;
    }
  }

  function flushTable() {
    if (inTable) {
      out.push(convertTable(tableLines));
      tableLines = [];
      inTable = false;
    }
  }

  function convertTable(lines) {
    if (lines.length < 2) return lines.join('\n');
    let html = '<table>';
    const header = lines[0].split('|').slice(1, -1).map(s => s.trim());
    html += '<thead><tr>' + header.map(h => '<th>' + inlineFormat(h) + '</th>').join('') + '</tr></thead>';
    html += '<tbody>';
    for (let i = 2; i < lines.length; i++) {
      const cells = lines[i].split('|').slice(1, -1).map(s => s.trim());
      html += '<tr>' + cells.map(c => '<td>' + inlineFormat(c) + '</td>').join('') + '</tr>';
    }
    html += '</tbody></table>';
    return html;
  }

  function inlineFormat(s) {
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    return s;
  }

  for (const rawLine of lines) {
    const line = rawLine;

    if (/^\|.+\|$/.test(line)) {
      flushList();
      tableLines.push(line);
      inTable = true;
      continue;
    } else {
      flushTable();
    }

    if (/^####\s+(.+)$/.test(line)) {
      flushList();
      out.push('<h4>' + inlineFormat(RegExp.$1) + '</h4>');
    } else if (/^###\s+(.+)$/.test(line)) {
      flushList();
      out.push('<h3>' + inlineFormat(RegExp.$1) + '</h3>');
    } else if (/^##\s+(.+)$/.test(line)) {
      flushList();
      out.push('<h2>' + inlineFormat(RegExp.$1) + '</h2>');
    } else if (/^#\s+(.+)$/.test(line)) {
      flushList();
      out.push('<h1>' + inlineFormat(RegExp.$1) + '</h1>');
    } else if (/^---+$/.test(line)) {
      flushList();
      out.push('<hr>');
    } else if (/^>\s+(.+)$/.test(line)) {
      flushList();
      out.push('<blockquote>' + inlineFormat(RegExp.$1) + '</blockquote>');
    } else if (/^[-*]\s+(.+)$/.test(line)) {
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      out.push('<li>' + inlineFormat(RegExp.$1) + '</li>');
    } else if (line.trim() === '') {
      flushList();
      out.push('');
    } else {
      flushList();
      out.push('<p>' + inlineFormat(line) + '</p>');
    }
  }
  flushTable();
  flushList();

  return out.join('\n');
}

const body = mdToHtml(md);

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>商品A プレビュー</title>
<style>
  body {
    font-family: "Yu Gothic", "Meiryo", sans-serif;
    max-width: 780px;
    margin: 40px auto;
    padding: 0 24px;
    line-height: 1.8;
    color: #222;
    background: #fafafa;
  }
  h1 { font-size: 26px; border-bottom: 3px solid #333; padding-bottom: 12px; margin-top: 40px; }
  h2 {
    font-size: 20px;
    border-left: 5px solid #1976d2;
    padding: 10px 14px;
    margin-top: 36px;
    background: #eef5fc;
  }
  h3 { font-size: 17px; color: #1976d2; margin-top: 28px; padding-bottom: 4px; border-bottom: 1px dotted #aac; }
  h4 { font-size: 14px; color: #444; margin-top: 18px; background: #f5f5f5; padding: 6px 10px; }
  p { margin: 10px 0; }
  ul { margin: 10px 0; padding-left: 28px; }
  li { margin: 4px 0; }
  blockquote {
    border-left: 4px solid #f0a020;
    background: #fff8e8;
    padding: 12px 16px;
    margin: 16px 0;
    color: #555;
  }
  hr { border: 0; border-top: 2px dashed #ccc; margin: 32px 0; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; background: #fff; font-size: 13px; }
  th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; vertical-align: top; }
  th { background: #f0f0f0; font-weight: bold; }
  strong { color: #c8390a; }
  code { background: #f3f3f3; padding: 2px 6px; border-radius: 3px; font-size: 90%; }
  .info {
    background: #e0f2f1;
    border: 1px solid #4db6ac;
    padding: 12px 16px;
    margin: 20px 0;
    border-radius: 4px;
  }
</style>
</head>
<body>
<div class="info">
<strong>📄 これは商品A（note有料記事）の下書きプレビューです。</strong><br>
読みながら気になる箇所があればメモして、Claude にフィードバックしてください。
</div>
${body}
</body>
</html>
`;

fs.writeFileSync(outputPath, html);
console.log('Generated:', outputPath);
