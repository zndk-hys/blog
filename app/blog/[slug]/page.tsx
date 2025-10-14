import { getBlogDetail } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";

export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: Props) {
  return (
    <Suspense fallback={<p className="text-gray-500">loading...</p>}>
      <PageContent params={props.params} />
    </Suspense>
  );
}

async function PageContent(props: Props) {
  const params = await props.params;
  const blog = await getBlogDetail(params.slug);
  if (!blog) return <p>記事が見つかりませんでした。</p>;

  return (
      <article>
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        {blog.publishedAt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-mono">
            {formatDate(new Date(blog.publishedAt), 'yyyy/MM/dd')}
          </p>
        )}
        {blog.tags && (
          <ul>
            {blog.tags.map(tag => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        )}
        {blog.eyecatch && (
          <div className="relative w-full h-auto mb-8">
            <Image
              src={blog.eyecatch.url}
              alt={blog.title || 'Eyecatch image'}
              width={blog.eyecatch.width}
              height={blog.eyecatch.height}
              className="rounded-lg object-cover w-full h-full"
              priority
            />
          </div>
        )}
        <div className="blog-detail" dangerouslySetInnerHTML={{ __html: blog.body }} />
      </article>
  )
}