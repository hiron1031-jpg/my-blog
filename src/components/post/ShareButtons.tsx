"use client";

import { useState } from "react";
import { FiTwitter, FiLink, FiCheck } from "react-icons/fi";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: ignore
    }
  };

  return (
    <div className="flex items-center gap-3 my-8 p-4 bg-surface rounded-xl border border-border">
      <span className="text-sm text-secondary font-medium">この記事をシェア：</span>
      <div className="flex gap-2 ml-auto">
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-black/80 transition-colors"
        >
          <FiTwitter size={14} />
          X でシェア
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-border text-secondary text-xs font-medium rounded-lg hover:bg-surface transition-colors"
        >
          {copied ? <FiCheck size={14} className="text-accent" /> : <FiLink size={14} />}
          {copied ? "コピーしました" : "URLをコピー"}
        </button>
      </div>
    </div>
  );
}
