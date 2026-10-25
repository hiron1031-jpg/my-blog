import { redirect, notFound } from "next/navigation";
import { CATEGORIES, getCategory } from "@/lib/pastproblems-data";

// /pastproblems/{exam} は従来ページが無く404だった。
// 資格名だけで来た人（外部リンク・手入力・SNS）を最新年度のページへ送る。
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ exam: c.id }));
}

type PageProps = { params: Promise<{ exam: string }> };

export default async function ExamIndexRedirect({ params }: PageProps) {
  const { exam } = await params;
  const category = getCategory(exam);
  if (!category || category.years.length === 0) notFound();

  // years は新しい年度が先頭に並んでいる
  redirect(`/pastproblems/${exam}/${category.years[0].key}`);
}
