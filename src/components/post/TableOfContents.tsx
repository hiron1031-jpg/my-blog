"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiList } from "react-icons/fi";
import type { Heading } from "@/types/post";

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(true);
  const visibleIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.current.add(entry.target.id);
          } else {
            visibleIds.current.delete(entry.target.id);
          }
        });
        // 表示中の見出しのうち、ドキュメント順で最初のものをアクティブにする
        // → 速くスクロールしてもチラつかない
        if (visibleIds.current.size > 0) {
          const firstVisible = headings.find((h) =>
            visibleIds.current.has(h.id)
          );
          if (firstVisible) setActiveId(firstVisible.id);
        }
      },
      { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-surface rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-heading hover:bg-border/40 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <FiList size={14} className="text-primary" />
          目次（{headings.length}項目）
        </span>
        <FiChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      {open && (
        <ul className="px-4 pb-4 pt-1 space-y-1 max-h-[60vh] overflow-y-auto">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li
                key={h.id}
                className={h.level === 3 ? "ml-3" : h.level === 4 ? "ml-6" : ""}
              >
                <a
                  href={`#${h.id}`}
                  className={`text-xs leading-relaxed block py-1 pl-2 border-l-2 transition-all ${
                    isActive
                      ? "text-primary font-semibold border-primary bg-primary/5"
                      : "text-secondary/70 border-transparent hover:text-primary hover:border-primary/30"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
