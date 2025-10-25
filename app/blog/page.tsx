import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import { POSTS_PER_PAGE } from "@/constants";
import { getBlogList } from "@/lib/microcms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'blog',
};

export default async function Page() {
  const data = await getBlogList({
    orders: "-publishedAt",
    limit: POSTS_PER_PAGE,
  });

  return (
    <>
      <ArticleList data={data} />
      <Pagination totalCount={data.totalCount} />
    </>
  )
}