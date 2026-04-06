import Breadcrumb from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />
      <h1 className="text-2xl font-bold text-heading mb-8">プライバシーポリシー</h1>
      <div className="prose max-w-none text-secondary space-y-6">
        <section>
          <h2 className="text-lg font-bold text-heading mb-3">個人情報の取り扱い</h2>
          <p className="text-sm leading-relaxed">
            当サイト（ビジネス知識ラボ）では、お問い合わせフォームを通じてご提供いただいた氏名・メールアドレス等の個人情報を、ご返信目的のみに使用し、第三者への提供は行いません。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-heading mb-3">アクセス解析</h2>
          <p className="text-sm leading-relaxed">
            当サイトでは、Google Analytics等のアクセス解析ツールを使用する場合があります。
            これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
          </p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-heading mb-3">お問い合わせ</h2>
          <p className="text-sm leading-relaxed">
            プライバシーポリシーに関するご質問は、お問い合わせフォームよりご連絡ください。
          </p>
        </section>
      </div>
    </div>
  );
}
