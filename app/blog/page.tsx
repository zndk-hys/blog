import { getBlogList } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 60;

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

  if (!data.contents || data.contents.length === 0) {
    return <p>ブログ記事がありません。</p>;
  }

  return (
    <div className="space-y-8">
      {data.contents.map((post) => {
        const id = post.id;
        return (
          <article key={id}>
            <div className="flex items-baseline space-x-4">
              {post.publishedAt && (
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {formatDate(new Date(post.publishedAt), 'yyyy/MM/dd')}
                </p>
              )}
              <div>
                <h2 className="text-2xl font-bold hover:text-blue-500 transition-colors">
                  <Link href={`/blog/${id}`}>{post.title}</Link>
                </h2>
                {post.tags && (
                  <ul className="flex flex-wrap items-baseline space-x-2 gap-y-2 mt-1">
                    {post.tags.map(tag => (
                      <li key={tag.id} className="text-gray-500 dark:text-gray-400 text-sm">#{tag.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}