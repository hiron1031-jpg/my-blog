"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setState("error");
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          ...form,
          botcheck: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="p-6 bg-accent/10 border border-accent rounded-xl text-center">
        <p className="text-heading font-bold text-lg mb-2">送信が完了しました！</p>
        <p className="text-secondary text-sm">お問い合わせありがとうございます。2〜3営業日以内にご返信します。</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 border-2 border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors bg-white";
  const labelClass = "block text-sm font-medium text-heading mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="hidden" name="botcheck" value="" className="hidden" />

      <div>
        <label className={labelClass} htmlFor="name">お名前 *</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="email">メールアドレス *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="example@email.com"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">件名</label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          className={inputClass}
          placeholder="お問い合わせの件名"
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="message">メッセージ *</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className={inputClass}
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>

      {state === "error" && (
        <p className="text-red-500 text-sm">
          送信に失敗しました。NEXT_PUBLIC_WEB3FORMS_KEY を .env.local に設定してください。
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
      >
        {state === "submitting" ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}
