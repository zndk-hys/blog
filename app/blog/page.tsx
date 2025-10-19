import ArticleList from "@/components/ArticleList";
import { getBlogList } from "@/lib/microcms";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div>
      <Suspense fallback={<p className="text-gray-500">loading...</p>}>
        <PageContent />
      </Suspense>
    </div>
  )
};

async function PageContent() {
  const data = await getBlogList({
    orders: "-publishedAt",
  });

  return (
    <ArticleList data={data} />
  )
}