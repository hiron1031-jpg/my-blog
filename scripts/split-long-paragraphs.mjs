// 200字超の本文段落を文の区切りで2分割するスクリプト（一回限り実行用）
// 内容は変えず、スマホでの「文字の壁」を解消する
import fs from "node:fs";
import path from "node:path";

const POSTS_DIR = "content/posts";
const MAX_LEN = 150; // これを超える段落を分割
const MIN_HALF = 60; // 分割後の各半分の最低文字数

// 分割位置として安全か検証（カッコ・太字・リンクが閉じているか）
function isSafeCut(firstHalf) {
  const opens = (firstHalf.match(/「/g) || []).length;
  const closes = (firstHalf.match(/」/g) || []).length;
  if (opens !== closes) return false;
  const bold = (firstHalf.match(/\*\*/g) || []).length;
  if (bold % 2 !== 0) return false;
  const sq = (firstHalf.match(/\[/g) || []).length - (firstHalf.match(/\]/g) || []).length;
  if (sq !== 0) return false;
  const lt = (firstHalf.match(/</g) || []).length - (firstHalf.match(/>/g) || []).length;
  if (lt !== 0) return false;
  return true;
}

// 1つの段落を再帰的に分割
function splitParagraph(text) {
  if (text.length <= MAX_LEN) return [text];
  // 。の位置を列挙（」』）の直前は除外）
  const candidates = [];
  for (let i = 0; i < text.length - 1; i++) {
    if (text[i] === "。" && !"」』）".includes(text[i + 1])) {
      candidates.push(i);
    }
  }
  const mid = text.length / 2;
  // 中央に近い順に試す
  candidates.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  for (const c of candidates) {
    const first = text.slice(0, c + 1);
    const second = text.slice(c + 1);
    if (first.length < MIN_HALF || second.length < MIN_HALF) continue;
    if (!isSafeCut(first)) continue;
    return [...splitParagraph(first), ...splitParagraph(second)];
  }
  return [text]; // 安全に割れない場合はそのまま
}

let totalSplit = 0;
let filesChanged = 0;

for (const slug of fs.readdirSync(POSTS_DIR)) {
  const file = path.join(POSTS_DIR, slug, "index.mdx");
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const out = [];
  let inFrontmatter = false;
  let frontmatterDone = false;
  let inCodeFence = false;
  let jsxDepth = 0;
  let changed = false;

  for (const line of lines) {
    // frontmatter管理
    if (line.trim() === "---" && !frontmatterDone) {
      if (!inFrontmatter) inFrontmatter = true;
      else { inFrontmatter = false; frontmatterDone = true; }
      out.push(line);
      continue;
    }
    if (inFrontmatter) { out.push(line); continue; }
    // コードブロック管理
    if (line.trimStart().startsWith("```")) {
      inCodeFence = !inCodeFence;
      out.push(line);
      continue;
    }
    if (inCodeFence) { out.push(line); continue; }
    // JSXコンポーネントブロック管理（<大文字で始まり、閉じるまでスキップ）
    const trimmed = line.trimStart();
    if (jsxDepth > 0) {
      out.push(line);
      if (/\/>\s*$/.test(trimmed) || /<\/[A-Z][A-Za-z]*>\s*$/.test(trimmed)) jsxDepth--;
      continue;
    }
    if (/^<[A-Z]/.test(trimmed) && !/\/>\s*$/.test(trimmed) && !/<\/[A-Z][A-Za-z]*>\s*$/.test(trimmed)) {
      jsxDepth++;
      out.push(line);
      continue;
    }
    // 分割対象外の行（見出し・リスト・表・引用・HTML・画像・番号リスト・空行）
    if (
      trimmed === "" ||
      /^[#>\-*|<!]/.test(trimmed) ||
      /^[0-9]+\./.test(trimmed) ||
      line !== trimmed // インデント付き行は触らない
    ) {
      out.push(line);
      continue;
    }
    // 本文の平文段落 → 分割を試みる
    if (line.length > MAX_LEN) {
      const parts = splitParagraph(line);
      if (parts.length > 1) {
        totalSplit += parts.length - 1;
        changed = true;
        parts.forEach((p, i) => {
          out.push(p);
          if (i < parts.length - 1) out.push("");
        });
        continue;
      }
    }
    out.push(line);
  }

  if (changed) {
    fs.writeFileSync(file, out.join("\n"));
    filesChanged++;
  }
}

console.log("分割した箇所:", totalSplit);
console.log("変更ファイル数:", filesChanged);
