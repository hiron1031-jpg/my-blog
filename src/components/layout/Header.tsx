"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const navItems = [
  { label: "記事一覧", href: "/posts" },
  { label: "カテゴリ", href: "/categories" },
  { label: "過去問ダウンロード", href: "/pastproblems" },
  { label: "クイズ", href: "/quiz" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "このサイトについて", href: "/about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b-2 border-primary shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Beaver mascot icon */}
            <span className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
              <Image
                src="/images/beaver.png"
                alt="土木のトリセツ マスコット"
                width={180}
                height={120}
                className="absolute top-0 left-0"
                style={{ width: "180px", height: "auto" }}
                priority
              />
            </span>
            {/* Site name */}
            <span className="flex flex-col leading-none">
              <span className="text-[11px] font-medium text-secondary/60 tracking-widest">
                DOBOKU NO TORISETSU
              </span>
              <span className="text-lg font-bold text-secondary tracking-tight">
                土木のトリセツ
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-secondary hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-0.5"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 text-secondary hover:text-primary transition-colors"
              aria-label="検索"
            >
              <FiSearch size={20} />
            </Link>
            <button
              className="md:hidden p-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="メニュー"
            >
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 px-3 text-sm font-medium text-secondary hover:text-primary hover:bg-surface rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
