import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import { POSTS_PER_PAGE } from "@/constants";
import { getBlogList } from "@/lib/microcms";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    num: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const num = parseInt(params.num);

  return {
    title: `blog | ${num}`,
    alternates: num === 1 ? {
      canonical: '/blog',
    } : null,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const num = parseInt(params.num);

  const data = await getBlogList({
    orders: "-publishedAt",
    limit: POSTS_PER_PAGE,
    offset: (num - 1) * POSTS_PER_PAGE,
  });

  return (
    <>
      <ArticleList data={data} />
      <Pagination totalCount={data.totalCount} currentPage={parseInt(params.num)} />
    </>
  )
}