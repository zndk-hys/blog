import { getBlogDetail } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = false;

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
        <div className="flex justify-between items-center mb-8">
          {blog.tags && (
            <ul className="flex flex-wrap items-baseline space-x-2 gap-y-2">
              {blog.tags.map(tag => (
                <li key={tag.id} className="text-gray-500 dark:text-gray-400 text-sm hover:underline"><Link href={`/blog/tags/${tag.id}`}>#{tag.name}</Link></li>
              ))}
            </ul>
          )}
          {blog.publishedAt && (
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {formatDate(new Date(blog.publishedAt), 'yyyy/MM/dd')}
            </p>
          )}
        </div>
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