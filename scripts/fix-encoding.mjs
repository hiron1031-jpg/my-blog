/**
 * Fix files that were read as Shift-JIS by PowerShell and saved as garbled UTF-8.
 * Strategy: re-interpret the UTF-8 bytes as Latin-1, then encode back as the original Shift-JIS bytes,
 * then decode those bytes as UTF-8 to get the original content.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const base = "C:/Users/hiron/OneDrive/デスクトップ/Claude code/my-blog/content/posts";

// Files that were corrupted by PowerShell Set-Content -Encoding UTF8
const files = [
  "goukaku-career/index.mdx",
  "zouen-keiken-kijutsu/index.mdx",
  "keiken-kijutsu-kakikata/index.mdx",
  "sankosho-hikaku/index.mdx",
  "sekoukanri-goukakuritsu/index.mdx",
];

for (const f of files) {
  const p = join(base, f);
  const buf = readFileSync(p);

  // Remove BOM if present
  const data = (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? buf.slice(3) : buf;

  // The file was: original UTF-8 → read as cp932 → saved as UTF-8
  // We need to reverse: current UTF-8 → decode as cp932 bytes → those are the original UTF-8 bytes
  //
  // PowerShell Get-Content without -Encoding reads UTF-8 bytes as cp932 (Shift-JIS on Japanese Windows)
  // So each UTF-8 byte sequence was misinterpreted as cp932 characters, then re-encoded as UTF-8
  //
  // To reverse: decode current UTF-8 string char by char, treat each char's codepoint as a cp932 byte value

  const str = data.toString("utf8");

  // Each char in the garbled string corresponds to cp932 byte(s)
  // We need to use TextDecoder with cp932/sjis
  // Node.js built-in doesn't support cp932 TextDecoder, use a workaround:
  // Re-encode the string back to its "original" bytes by treating it as latin-1/binary

  const originalBytes = Buffer.from(str, "binary"); // latin-1 round-trip to get original bytes

  // Now decode those bytes as UTF-8
  try {
    const restored = originalBytes.toString("utf8");

    // Sanity check: should contain Japanese characters and "---" frontmatter
    if (restored.includes("---") && /[\u3000-\u9FFF]/.test(restored)) {
      writeFileSync(p, restored, "utf8");
      console.log(`✓ Restored: ${f}`);
      console.log(`  Preview: ${restored.substring(0, 80).replace(/\n/g, "\\n")}`);
    } else {
      console.log(`✗ Restore failed (no Japanese detected): ${f}`);
      console.log(`  Preview: ${restored.substring(0, 80)}`);
    }
  } catch (e) {
    console.log(`✗ UTF-8 decode error for: ${f} — ${e.message}`);
  }
}
