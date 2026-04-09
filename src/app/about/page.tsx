import Breadcrumb from "@/components/layout/Breadcrumb";
import BeaverMascot from "@/components/layout/BeaverMascot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて",
};

export default function AboutPage() {
  const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "管理者";
  const authorBio =
    process.env.NEXT_PUBLIC_AUTHOR_BIO ??
    "ビジネス・経営に関する専門知識を発信しています。実務経験をもとに、わかりやすく実践的な情報をお届けします。";

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "このサイトについて" }]} />

      <h1 className="text-2xl font-bold text-heading mb-8">このサイトについて</h1>

      <div className="bg-white rounded-2xl border border-border p-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <BeaverMascot preset="survey" size={80} className="rounded-2xl flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-heading mb-2">{authorName}</h2>
            <p className="text-secondary text-sm leading-relaxed">{authorBio}</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none text-secondary">
        <h2 className="text-xl font-bold text-heading mb-4">サイトの目的</h2>
        <p className="mb-4">
          「ビジネス知識ラボ」は、ビジネスの現場で役立つ実践的な知識・情報を、わかりやすく発信するブログです。
        </p>
        <p className="mb-8">
          経営戦略、マーケティング、リーダーシップなど、幅広いテーマを取り上げ、
          ビジネスパーソンの日々の業務や意思決定に役立つ情報をお届けします。
        </p>

        <h2 className="text-xl font-bold text-heading mb-4 mt-8">免責事項</h2>
        <p className="text-sm text-secondary/80">
          当サイトの情報は一般的な情報提供を目的としており、特定の状況における専門的なアドバイスの代替となるものではありません。
          情報の正確性には万全を期しておりますが、掲載情報の利用によって生じた損害については責任を負いかねます。
        </p>
      </div>
    </div>
  );
}
