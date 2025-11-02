import ArticleList from "@/components/ArticleList";
import { POSTS_PER_PAGE } from "@/constants";
import { getBlogList, getTagDetail } from "@/lib/microcms";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const tagSlug = params.slug;
  const tag = await getTagDetail(tagSlug);

  return {
    title: `blog | #${tag.name}`,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  
  const tagSlug = params.slug;
  const [tag, data] = await Promise.all([
    getTagDetail(tagSlug),
    getBlogList({
      orders: "-publishedAt",
      filters: `tags[contains]${tagSlug}`,
      limit: POSTS_PER_PAGE,
    }),
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">#{tag.name}</h1>
      <ArticleList data={data} />
    </>
  )
}