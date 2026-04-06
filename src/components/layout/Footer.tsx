import Link from "next/link";

const footerLinks = [
  { label: "記事一覧", href: "/posts" },
  { label: "カテゴリ", href: "/categories" },
  { label: "このサイトについて", href: "/about" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-heading text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="text-xl font-bold text-white">
              ビジネス知識ラボ
            </Link>
            <p className="text-sm text-white/70 max-w-xs">
              ビジネスの最前線で役立つ専門知識を、わかりやすく解説します。
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 items-start">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-xs text-white/50">
          © {currentYear} ビジネス知識ラボ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
