import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "doboku-torisetsu.vercel.app" }],
        destination: "https://doboku-torisetsu.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
