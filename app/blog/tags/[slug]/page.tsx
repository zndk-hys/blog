import ArticleList from "@/components/ArticleList";
import { getBlogList, getTagDetail } from "@/lib/microcms";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: Props) {
  const params = await props.params;
  
  const tagSlug = params.slug;
  const [tag, data] = await Promise.all([
    getTagDetail(tagSlug),
    getBlogList({
      orders: "-publishedAt",
      filters: `tags[contains]${tagSlug}`,
    }),
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">#{tag.name}</h1>
      <ArticleList data={data} />
    </>
  )
}