import type { Metadata } from "next";
import { FiShield, FiDownload, FiAlertCircle } from "react-icons/fi";
import PastProblemsClient from "@/components/pastproblems/PastProblemsClient";
import BeaverMascot from "@/components/layout/BeaverMascot";

export const metadata: Metadata = {
  title: "過去問 無料ダウンロード | 土木のヒロブログ",
  description:
    "1級・2級 土木施工管理技士・造園施工管理技士の過去問を無料でダウンロード。全国建設研修センター許諾済み。H24〜R7年度分の問題・解答PDFを一覧で提供します。",
};

export default function PastProblemsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ── Hero ── */}
      <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] px-6 py-10 md:px-12 md:py-14 text-white shadow-lg">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-primary/10" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-primary text-white px-3 py-1 rounded-full mb-4">
              <FiDownload size={12} />
              無料ダウンロード
            </span>
            <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-snug">
              施工管理技士<br className="md:hidden" /> 過去問ダウンロード
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              1級・2級 土木施工管理技士、1級・2級 造園施工管理技士の
              過去問（問題・解答）を全て無料でダウンロードできます。
              平成24年度〜令和7年度分を掲載。
            </p>
          </div>
          <BeaverMascot preset="check" size={100} className="drop-shadow-lg self-end md:self-auto flex-shrink-0" />
        </div>
      </div>

      {/* ── Permission notice ── */}
      <div className="mb-10 bg-white border-2 border-secondary/30 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
            <FiShield size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-secondary mb-1">掲載許諾について</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              本サイトは、正式に
              <strong className="text-secondary">『全国建設研修センター』</strong>
              様より、過去問の公開に関して許諾をいただいております。
            </p>
          </div>
        </div>
      </div>

      {/* ── Usage notes ── */}
      <div className="mb-10 bg-surface border border-border rounded-xl p-5 flex gap-3">
        <FiAlertCircle className="text-primary flex-shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-gray-600 leading-relaxed space-y-1">
          <p>
            <strong>ダウンロード方法：</strong>
            各ボタンをクリックするとPDFが直接ダウンロードされます。
          </p>
          <p>
            掲載しているのは
            <strong>問題用紙・解答</strong>のみです。
            解答の詳細な解説は当ブログの記事をご参照ください。
          </p>
          <p>
            試験制度の変更（令和3年度〜）により、「学科試験」→「第一次検定」、「実地試験」→「第二次検定」に名称が変わっています。
          </p>
        </div>
      </div>

      {/* ── Download sections (client) ── */}
      <PastProblemsClient />

      {/* ── Footer note ── */}
      <div className="mt-12 pt-8 border-t border-border text-xs text-gray-400 space-y-1">
        <p>出典：公益財団法人 全国建設研修センター</p>
        <p>掲載している過去問は同センターの許諾のもと、このサイトで公開しています。無断での二次配布はご遠慮ください。</p>
      </div>
    </div>
  );
}
