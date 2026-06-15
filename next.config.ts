import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // OG画像生成(/api/og)で使うフォントファイルをサーバー関数に確実に含める（500防止）
  outputFileTracingIncludes: {
    "/api/og": ["./node_modules/@fontsource/noto-sans-jp/files/*.woff2"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "doboku-torisetsu.vercel.app" }],
        destination: "https://doboku-torisetsu.com/:path*",
        permanent: true,
      },
      // 旧カテゴリ（2026-06 7分類に再編）からの転送
      {
        source: "/categories/土木施工管理技士",
        destination: "/categories",
        permanent: true,
      },
      {
        source: "/categories/造園施工管理技士",
        destination: "/categories",
        permanent: true,
      },
      {
        source: "/categories/試験対策",
        destination: "/categories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
