import { Blog } from "@/lib/microcms";
import { formatDate } from "@/lib/utils";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";

type Props = {
    data: MicroCMSListResponse<Blog>,
}

export default function ArticleList({data}: Props) {
  if (!data.contents || data.contents.length === 0) {
    return (
      <>
        <p>ブログ記事がありません。</p>
      </>
    );
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
                  <Link href={`/blog/${id}`} prefetch={false}>{post.title}</Link>
                </h2>
                {post.tags && (
                  <ul className="flex flex-wrap items-baseline space-x-2 gap-y-2 mt-1">
                    {post.tags.map(tag => (
                      <li key={tag.id} className="text-gray-500 dark:text-gray-400 text-sm hover:underline"><Link href={`/blog/tags/${tag.id}`}>#{tag.name}</Link></li>
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