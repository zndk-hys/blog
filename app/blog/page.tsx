import ArticleList from "@/components/ArticleList";
import { getBlogList } from "@/lib/microcms";

export default async function Page() {
  const data = await getBlogList({
    orders: "-publishedAt",
  });

  return (
    <ArticleList data={data} />
  )
}