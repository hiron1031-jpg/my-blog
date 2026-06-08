import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ADSENSE_CLIENT, isAdsenseEnabled } from "@/lib/adsense";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "土木のトリセツ";
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "1級土木・造園施工管理技士が教える、資格取得のリアルな勉強法と合格戦略。";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://doboku-torisetsu.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: [
      // 新ドメイン doboku-torisetsu.com 用
      "FpiBkif6ZGH3Iw0BlNFdKt_Hz8fgusA0WAaRMJ6-tm8",
      // 旧ドメイン doboku-torisetsu.vercel.app 用（互換維持）
      "Q0p5Z0BTX5FkfFHEoEzmtwRmfaZ2WoGHF0Bv7FmF538",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // JSON-LD 構造化データ（Googleがサイト名を正しく認識するため）
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: "Doboku no Torisetsu",
    url: siteUrl,
    description: siteDescription,
    inLanguage: "ja-JP",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
  };

  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        {/* DNSプリコネクトでアフィリエイト・分析リクエストを高速化 */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.amazon.co.jp" />
        <link rel="dns-prefetch" href="https://hb.afl.rakuten.co.jp" />
        {gaId && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        {/* Google AdSense（パブリッシャーID設定時のみ読み込み・審査用スクリプト） */}
        {isAdsenseEnabled && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        {/* JSON-LDはinline scriptで配信（Next Scriptのオーバーヘッドを回避） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
