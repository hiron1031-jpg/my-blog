"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 本番ではGAイベントとして記録
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gtag = (window as any).gtag;
      if (typeof gtag === "function") {
        gtag("event", "exception", {
          description: error.message,
          fatal: false,
        });
      }
    }
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-6">⚠️</div>
      <h1 className="text-3xl font-bold text-heading mb-4">
        エラーが発生しました
      </h1>
      <p className="text-secondary mb-8 leading-relaxed">
        申し訳ありません。ページの表示中に問題が発生しました。
        <br />
        もう一度お試しいただくか、トップページから再度お進みください。
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
        >
          再読み込みする
        </button>
        <Link
          href="/"
          className="border-2 border-border text-heading font-semibold px-6 py-3 rounded-md hover:border-primary transition-colors"
        >
          トップページへ戻る
        </Link>
      </div>

      {error.digest && (
        <p className="text-xs text-secondary mt-8">エラーID: {error.digest}</p>
      )}
    </div>
  );
}
