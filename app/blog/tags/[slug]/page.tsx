import ArticleList from "@/components/ArticleList";
import { getBlogList, getTagDetail } from "@/lib/microcms";
import { Suspense } from "react";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: Props) {
  return (
    <div>
      <Suspense fallback={<p className="text-gray-500">loading...</p>}>
        <PageContent params={props.params}/>
      </Suspense>
    </div>
  )
};

async function PageContent(props: Props) {
  const params = await props.params;
  
  const tagSlug = params.slug;
  const tag = await getTagDetail(tagSlug);

  const data = await getBlogList({
    orders: "-publishedAt",
    filters: `tags[contains]${tagSlug}`,
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">#{tag.name}</h1>
      <ArticleList data={data} />
    </>
  )
}