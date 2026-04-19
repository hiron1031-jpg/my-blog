import ContactForm from "./ContactForm";
import Breadcrumb from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "お問い合わせ" }]} />
      <h1 className="text-2xl font-bold text-heading mb-3">お問い合わせ</h1>
      <p className="text-secondary text-sm mb-8">
        ご質問・ご意見・取材依頼などはこちらからお気軽にどうぞ。通常2〜3営業日以内にご返信いたします。
      </p>
      <ContactForm />
      <p className="text-xs text-secondary mt-6 leading-relaxed">
        ※ ご送信いただいた内容は返信目的のみに使用し、第三者へ提供することはありません。詳しくは
        <a href="/privacy" className="text-primary underline mx-1">プライバシーポリシー</a>
        をご確認ください。
      </p>
    </div>
  );
}
