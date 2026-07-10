import type { Metadata } from "next";
import Link from "next/link";
import { FiShield, FiDownload, FiAlertCircle, FiBookOpen, FiHelpCircle, FiArrowRight, FiFileText } from "react-icons/fi";
import PastProblemsClient from "@/components/pastproblems/PastProblemsClient";
import LearningCycle from "@/components/home/LearningCycle";
import BeaverMascot from "@/components/layout/BeaverMascot";
import JsonLd from "@/components/JsonLd";
import { CATEGORIES } from "@/lib/pastproblems-data";

export const metadata: Metadata = {
  title: "施工管理技士 過去問 無料ダウンロード【1級・2級 土木／造園 14年分PDF】",
  description:
    "2級土木施工管理技士・1級土木施工管理技士・造園施工管理技士の過去問を無料でPDFダウンロード。全国建設研修センター許諾済み。H24〜R7年度（14年分）の問題・解答を登録不要・印刷OKで提供。独学合格をサポートします。",
  keywords: "施工管理技士 過去問,過去問 pdf,過去問 ダウンロード,1級土木 過去問,2級土木 過去問,1級造園 過去問,2級造園 過去問,第一次検定 過去問,第二次検定 過去問",
  alternates: {
    canonical: "/pastproblems",
  },
  openGraph: {
    title: "施工管理技士 過去問 無料ダウンロード【14年分 PDF】| 土木のトリセツ",
    description:
      "1級・2級 土木施工管理技士・造園施工管理技士の過去問を無料でPDFダウンロード。H24〜R7年度（14年分）の問題・解答を一覧提供。",
    url: "/pastproblems",
  },
};

const faqs = [
  {
    q: "過去問は何年分を解けば合格できますか？",
    a: "最低でも過去5年分、理想は10年分です。施工管理技士の第一次検定は過去問からの類題が6〜7割を占めるため、10年分を2〜3周すると合格ラインを超えやすくなります。本サイトではH24〜R7年度の14年分を掲載しています。",
  },
  {
    q: "解答解説は付いていますか？",
    a: "本ページでダウンロードできるのは問題用紙と正解（解答）のみです。詳しい解説は当ブログの勉強法記事や分野別記事で順次公開しています。市販の過去問題集の解説と併用すると効率的です。",
  },
  {
    q: "ダウンロードしたPDFは印刷して使えますか？",
    a: "はい、印刷して使用できます。本番と同じA4サイズでの印刷を推奨します。通勤時間や休憩時間に少しずつ解き進める方も多いです。ただし無断での二次配布はご遠慮ください。",
  },
  {
    q: "『学科試験』『実地試験』と『第一次検定』『第二次検定』の違いは？",
    a: "令和3年度から試験制度が変わり、学科試験→第一次検定、実地試験→第二次検定に名称変更されました。試験内容も一部変更されているため、R3年度以降の過去問を必ず解くようにしてください。",
  },
  {
    q: "1級と2級ではどちらの過去問から解くべきですか？",
    a: "これから2級を受験する方は2級過去問から、将来的に1級を目指す方も最初は2級から始めるのがおすすめです。2級の内容を確実に押さえてから1級に進むほうが学習効率が高まります。",
  },
  {
    q: "令和7年度の過去問はいつ公開されますか？",
    a: "試験実施後、全国建設研修センターからの正式公開に合わせて掲載します。公開時期は試験翌月〜2ヶ月以内が目安です。最新情報はサイト上部のお知らせまたはTwitter等でお知らせします。",
  },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "施工管理技士 過去問 無料ダウンロード",
      "description": "1級・2級 土木施工管理技士・造園施工管理技士の過去問を無料でダウンロード。H24〜R7年度分を一覧提供。",
      "url": `${siteUrl}/pastproblems`,
      "inLanguage": "ja-JP",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "ホーム", "item": siteUrl },
          { "@type": "ListItem", "position": 2, "name": "過去問ダウンロード", "item": `${siteUrl}/pastproblems` },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ],
};

export default function PastProblemsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <JsonLd schema={jsonLd} />
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
              施工管理技士 過去問<br className="md:hidden" /> 無料ダウンロード
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-xl">
              <strong>2級土木施工管理技士</strong>・1級土木施工管理技士・1級・2級 造園施工管理技士の
              過去問（問題・解答PDF）を、登録不要・全て無料でダウンロードできます。
              平成24年度〜令和7年度（14年分）を掲載。印刷して本番形式で演習できます。
            </p>
          </div>
          <BeaverMascot preset="schedule" size={100} className="drop-shadow-lg self-end md:self-auto flex-shrink-0" />
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

      {/* ── 学習サイクル図 ── */}
      <div className="mb-10">
        <LearningCycle />
      </div>

      {/* ── How to use ── */}
      <section className="mb-10 bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FiBookOpen size={20} className="text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">過去問の効果的な使い方</h2>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-5">
          施工管理技士の第一次検定は<strong>過去問からの類題が6〜7割</strong>を占めるため、過去問演習が合格への最短ルートです。
          以下の手順で進めると効率よく得点力が身に付きます。
        </p>
        <ol className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            <div>
              <strong>まず直近1年分を解いて現状把握</strong><br />
              <span className="text-gray-600">現時点の実力と出題傾向を把握。点数は気にしなくてOK。</span>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
            <div>
              <strong>過去10年分を1周（分野別に整理）</strong><br />
              <span className="text-gray-600">土工・コンクリート・安全管理など、分野ごとに連続して解くと頻出パターンが見える。</span>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
            <div>
              <strong>間違えた問題だけを2周目・3周目</strong><br />
              <span className="text-gray-600">解けた問題は飛ばす。苦手な分野を潰すことに集中。</span>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
            <div>
              <strong>試験1ヶ月前から本番形式で通し解き</strong><br />
              <span className="text-gray-600">制限時間を計って本番と同条件で演習。時間配分の感覚をつかむ。</span>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">5</span>
            <div>
              <strong>スキマ時間は<Link href="/quiz" className="text-primary underline hover:no-underline">過去問チャレンジ</Link>で反復</strong><br />
              <span className="text-gray-600">通勤中・休憩中でも4択クイズ形式で解ける。スマホでサクッと演習できる。</span>
            </div>
          </li>
        </ol>
      </section>

      {/* ── Download sections (client) ── */}
      <PastProblemsClient />

      {/* ── 過去問を解いたら次はこれ（note・参考書導線） ── */}
      <section className="mt-12 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <FiArrowRight size={20} className="text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">過去問をダウンロードしたら、次はこれ</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          印刷して解く用の解答用紙（無料）と、二次検定の対策コンテンツ、参考書選びのガイドを用意しています。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 無料解答用紙 */}
          <a
            href="https://note.com/dobokutorisetsu/n/nc8cc72e51116"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-border rounded-xl p-5 shadow-sm hover:border-primary hover:shadow-md transition-all group"
          >
            <span className="inline-block bg-emerald-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg mb-3">
              無料
            </span>
            <h3 className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors mb-2">
              印刷して使える 練習用解答用紙PDF
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              本番形式の演習に。二次検定（経験記述）の練習用解答用紙を無料配布中です。
            </p>
          </a>
          {/* 二次全問解説 */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <span className="inline-block bg-orange-500 text-white text-[11px] font-bold px-2 py-1 rounded-lg mb-3">
              500円
            </span>
            <h3 className="text-sm font-bold text-gray-800 mb-2">R7二次検定の全問解説</h3>
            <ul className="text-xs space-y-1.5">
              <li><a href="https://note.com/dobokutorisetsu/n/n051d4898f173" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1級土木 全問解説 →</a></li>
              <li><a href="https://note.com/dobokutorisetsu/n/n0e58e6ebd207" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">2級土木 全問解説 →</a></li>
              <li><a href="https://note.com/dobokutorisetsu/n/n77af23ad86bb" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">1級造園 全問解説 →</a></li>
              <li><a href="https://note.com/dobokutorisetsu/n/n5dbb382823d4" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">2級造園 全問解説 →</a></li>
            </ul>
          </div>
          {/* 参考書ランキング */}
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <span className="inline-block bg-secondary text-white text-[11px] font-bold px-2 py-1 rounded-lg mb-3">
              参考書選び
            </span>
            <h3 className="text-sm font-bold text-gray-800 mb-2">資格別 参考書ランキング</h3>
            <ul className="text-xs space-y-1.5">
              <li><Link href="/posts/doboku-1kyu-sankosho-ranking" className="text-primary hover:underline">1級土木の参考書ランキング →</Link></li>
              <li><Link href="/posts/doboku-2kyu-sankosho-ranking" className="text-primary hover:underline">2級土木の参考書ランキング →</Link></li>
              <li><Link href="/posts/zouen-1kyu-sankosho-ranking" className="text-primary hover:underline">1級造園の参考書ランキング →</Link></li>
              <li><Link href="/posts/zouen-2kyu-sankosho-ranking" className="text-primary hover:underline">2級造園の参考書ランキング →</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 資格別 過去問インデックス（静的・SEO/内部リンク用） ── */}
      <section className="mt-12 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <FiBookOpen size={20} className="text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">資格別 過去問インデックス（全年度）</h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          受験する資格をクリックすると、その年度の問題・解答PDFのダウンロードページへ移動します。
        </p>

        <div className="space-y-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="bg-white border border-border rounded-xl p-5 md:p-6 shadow-sm">
              <h3 className="text-base md:text-lg font-bold mb-1" style={{ color: cat.hex }}>
                {cat.name} 過去問【問題・解答PDF無料ダウンロード】
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                {cat.name}の過去問を平成24年度〜令和7年度まで掲載。各年度ページから無料でPDFをダウンロードできます。
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.years.map((y) => (
                  <Link
                    key={y.key}
                    href={`/pastproblems/${cat.id}/${y.key}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm hover:border-primary hover:bg-surface transition"
                  >
                    <FiFileText size={13} style={{ color: cat.hex }} />
                    {y.label} {cat.shortName} 過去問
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mt-12 mb-10 bg-white border border-border rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <FiHelpCircle size={20} className="text-primary" />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">よくある質問</h2>
        </div>
        <div className="space-y-5">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-border last:border-b-0 pb-5 last:pb-0">
              <h3 className="text-sm md:text-base font-bold text-gray-800 mb-2">Q. {f.q}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">A. {f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related articles ── */}
      <section className="mb-10 bg-surface border border-border rounded-xl p-6">
        <h2 className="text-base font-bold text-gray-800 mb-4">あわせて読みたい合格対策記事</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/posts/doboku-1kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              1級土木施工管理技士の勉強法【独学合格の全手順】
            </Link>
          </li>
          <li>
            <Link href="/posts/doboku-2kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              2級土木施工管理技士の勉強法【独学で合格した私の全手順】
            </Link>
          </li>
          <li>
            <Link href="/posts/zouen-1kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              1級造園施工管理技士の勉強法【独学合格の全手順】
            </Link>
          </li>
          <li>
            <Link href="/posts/zouen-2kyu-benkyoho" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              2級造園施工管理技士の勉強法【独学合格への最短ルート】
            </Link>
          </li>
          <li>
            <Link href="/posts/doboku-1kyu-hinshutu" className="inline-flex items-center gap-2 text-primary hover:underline">
              <FiArrowRight size={14} />
              1級土木施工管理技士 頻出問題・分野別攻略ガイド
            </Link>
          </li>
        </ul>
      </section>

      {/* ── Footer note ── */}
      <div className="mt-12 pt-8 border-t border-border text-xs text-gray-400 space-y-1">
        <p>出典：一般財団法人 全国建設研修センター</p>
        <p>掲載している過去問は同センターの許諾のもと、このサイトで公開しています。無断での二次配布はご遠慮ください。</p>
      </div>
    </div>
  );
}
