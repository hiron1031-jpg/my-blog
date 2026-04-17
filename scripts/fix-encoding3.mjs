import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const base = join(__dirname, "../content/posts");

const files = [
  "goukaku-career/index.mdx",
  "keiken-kijutsu-kakikata/index.mdx",
  "sankosho-hikaku/index.mdx",
  "sekoukanri-goukakuritsu/index.mdx",
];

// TextDecoder supports 'shift_jis' / 'shift-jis' natively in Node.js
const decoder = new TextDecoder("shift_jis");

for (const f of files) {
  const p = join(base, f);
  const buf = readFileSync(p);

  // Remove BOM if present
  const data = (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? buf.slice(3) : buf;

  // The file was: UTF-8 → read as Shift-JIS by PowerShell → saved as UTF-8
  // To reverse: decode current UTF-8 → get garbled string →
  //   re-encode as latin-1 to recover the "raw bytes" PowerShell saw →
  //   decode THOSE as Shift-JIS → that's the original UTF-8 text...
  //
  // Wait, that's wrong. Let me think again.
  //
  // What happened:
  //   Original file bytes: valid UTF-8 bytes (e.g. E6 96 BD for 施)
  //   PowerShell Get-Content reads as Shift-JIS:
  //     E6 96 = valid SJIS 2-byte = some char (e.g. 譁)
  //     BD is left over (or combined with next byte)
  //   This produces a garbled .NET string
  //   Set-Content -Encoding UTF8 saves that garbled string as UTF-8 (with BOM)
  //
  // To reverse, we need the original UTF-8 bytes that PowerShell misread as SJIS.
  // Current file is the UTF-8 encoding of (SJIS interpretation of original UTF-8).
  // So:
  //   1. Decode current file as UTF-8 → garbled string (SJIS chars)
  //   2. Encode those SJIS chars back to SJIS bytes → these are the ORIGINAL UTF-8 bytes
  //   3. Decode those bytes as UTF-8 → original text
  //
  // Step 2 requires encoding as SJIS. We can use TextEncoder... but there's no built-in SJIS encoder.
  // However, we can do it differently:
  //   The garbled UTF-8 file contains UTF-8 encodings of SJIS characters.
  //   If we treat those SJIS characters as Latin-1 (each SJIS byte as a char 0x00-0xFF),
  //   we can recover bytes in the range 0x00-0xFF.
  //   But SJIS chars have Unicode codepoints MUCH larger than 0xFF, so this won't work for 2-byte SJIS.
  //
  // The CORRECT reversal:
  //   We need an SJIS encoder. Let's try a different trick:
  //   Since we know the SJIS decoder maps known byte sequences to known Unicode chars,
  //   we can build a reverse lookup.
  //
  // Simpler: use TextDecoder to decode the SJIS bytes → but we need the SJIS bytes.
  // The SJIS bytes ARE the original UTF-8 bytes!
  // So: current_file_as_UTF8_string → encode_as_SJIS_bytes → decode_as_UTF8 = original
  //
  // To get encode_as_SJIS_bytes without a library:
  // We know that TextDecoder('shift_jis') decodes SJIS bytes to Unicode.
  // We need the reverse: given Unicode chars (from garbled UTF-8), find SJIS bytes.
  //
  // TRICK: Build a lookup table by brute-force decoding all SJIS byte sequences.

  const garbledStr = data.toString("utf8");

  // Build reverse map: unicode char → sjis bytes
  // (We do this lazily for the chars we actually see)
  const reverseMap = new Map();

  // Decode all 1-byte SJIS values (0x00-0x7F, 0xA1-0xDF)
  for (let b = 0; b <= 0xFF; b++) {
    if (b <= 0x7F || (b >= 0xA1 && b <= 0xDF)) {
      const ch = decoder.decode(new Uint8Array([b]));
      reverseMap.set(ch, [b]);
    }
  }
  // Decode all 2-byte SJIS values
  const leadBytes = [];
  for (let b = 0x81; b <= 0x9F; b++) leadBytes.push(b);
  for (let b = 0xE0; b <= 0xFC; b++) leadBytes.push(b);

  for (const lead of leadBytes) {
    for (let trail = 0x40; trail <= 0xFC; trail++) {
      if (trail === 0x7F) continue;
      const ch = decoder.decode(new Uint8Array([lead, trail]));
      if (ch && ch !== "\uFFFD" && !reverseMap.has(ch)) {
        reverseMap.set(ch, [lead, trail]);
      }
    }
  }

  // Now encode garbled string back to SJIS bytes (= original UTF-8 bytes)
  let originalBytes = [];
  let failed = false;
  for (const ch of garbledStr) {
    const bytes = reverseMap.get(ch);
    if (bytes) {
      originalBytes.push(...bytes);
    } else {
      // Character not in SJIS - might be already correct ASCII or unmappable
      const code = ch.charCodeAt(0);
      if (code < 0x80) {
        originalBytes.push(code);
      } else {
        // Can't map - leave as UTF-8 bytes
        const encoded = Buffer.from(ch, "utf8");
        originalBytes.push(...encoded);
      }
    }
  }

  const restored = Buffer.from(originalBytes).toString("utf8");

  if (/[\u3000-\u9FFF]/.test(restored) && restored.includes("---")) {
    writeFileSync(p, restored, "utf8");
    console.log(`✓ Restored: ${f}`);
    restored.split("\n").slice(0, 5).forEach(l => console.log("  " + l));
  } else {
    console.log(`✗ Failed: ${f}`);
    console.log("  Preview:", restored.substring(0, 120));
  }
}
