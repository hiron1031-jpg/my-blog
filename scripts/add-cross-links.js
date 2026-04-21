const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "content", "posts");
const newLink =
  "- [「2級造園→1級造園→1級土木」3冠取得の全キャリアフロー](/posts/shikaku-roadmap)";
const targetSlug = "shikaku-roadmap";

const dirs = fs.readdirSync(postsDir).filter((d) => d !== targetSlug);

let modified = 0;
for (const slug of dirs) {
  const filePath = path.join(postsDir, slug, "index.mdx");
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf8");

  // Skip if already linked
  if (content.includes("/posts/shikaku-roadmap")) {
    console.log(`SKIP (already linked): ${slug}`);
    continue;
  }

  // Find "### 関連記事" heading and insert link as first item after it
  const headingRegex = /(### 関連記事[^\n]*\n)/;
  if (!headingRegex.test(content)) {
    console.log(`SKIP (no 関連記事 section): ${slug}`);
    continue;
  }

  content = content.replace(headingRegex, `$1${newLink}\n`);
  fs.writeFileSync(filePath, content);
  console.log(`UPDATED: ${slug}`);
  modified++;
}

console.log(`\nTotal modified: ${modified}`);
