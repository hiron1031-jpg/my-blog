import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

// Font cache (loaded once per serverless instance)
let fontJP: Buffer | null = null;
let fontLatin: Buffer | null = null;

function loadFonts() {
  if (!fontJP) {
    const base = join(
      process.cwd(),
      "node_modules/@fontsource/noto-sans-jp/files"
    );
    fontJP = readFileSync(join(base, "noto-sans-jp-japanese-700-normal.woff2"));
    fontLatin = readFileSync(join(base, "noto-sans-jp-latin-700-normal.woff2"));
  }
}

// Category → gradient color mapping
const CATEGORY_GRADIENTS: Record<string, [string, string]> = {
  土木施工管理技士: ["#1e3a5f", "#2d5a8e"],
  造園施工管理技士: ["#1a5c38", "#2d8a57"],
  試験対策: ["#c94f1c", "#e8622a"],
  勉強法: ["#1e3a5f", "#3a5f8e"],
  現場のリアル: ["#2c2c2c", "#4a4a4a"],
};

const DEFAULT_GRADIENT: [string, string] = ["#1e3a5f", "#e8622a"];

export async function GET(request: NextRequest) {
  try {
    loadFonts();
  } catch {
    // Font loading failed; continue without custom font
  }

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "土木のヒロブログ";
  const category = searchParams.get("category") ?? "";

  const [gradFrom, gradTo] =
    CATEGORY_GRADIENTS[category] ?? DEFAULT_GRADIENT;

  const fonts = [];
  if (fontJP)
    fonts.push({ name: "NotoJP", data: fontJP, weight: 700 as const });
  if (fontLatin)
    fonts.push({ name: "NotoJP", data: fontLatin, weight: 700 as const });

  const fontFamily = fonts.length > 0 ? "NotoJP" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)`,
          padding: "60px 72px",
          fontFamily,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circle top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />
        {/* Decorative circle bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "8%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
          }}
        />
        {/* Orange accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 12,
            height: "100%",
            background: "#e8622a",
            display: "flex",
          }}
        />

        {/* Category badge */}
        {category ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "2px solid rgba(255,255,255,0.3)",
                color: "white",
                padding: "8px 28px",
                borderRadius: 100,
                fontSize: 26,
                fontWeight: 700,
                display: "flex",
              }}
            >
              {category}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", marginBottom: 32 }} />
        )}

        {/* Title */}
        <div
          style={{
            color: "white",
            fontSize:
              title.length > 30 ? 48 : title.length > 20 ? 56 : 64,
            fontWeight: 700,
            lineHeight: 1.45,
            flex: 1,
            display: "flex",
            alignItems: "center",
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </div>

        {/* Footer divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.18)",
            marginBottom: 24,
            display: "flex",
          }}
        />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo area */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Helmet icon box */}
            <div
              style={{
                width: 48,
                height: 48,
                background: "#e8622a",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Simple helmet shape using emoji as fallback */}
              <div
                style={{
                  color: "white",
                  fontSize: 28,
                  fontWeight: 700,
                  display: "flex",
                }}
              >
                H
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 2,
                  display: "flex",
                }}
              >
                DOBOKU NO HIRO
              </div>
              <div
                style={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: 700,
                  display: "flex",
                }}
              >
                土木のヒロブログ
              </div>
            </div>
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 20,
              display: "flex",
            }}
          >
            1級土木・造園施工管理技士
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
