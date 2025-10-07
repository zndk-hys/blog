import { getBlogDetail } from "@/lib/microcms";
import Image from "next/image";
import { Suspense } from "react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: Props) {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <PageContent params={props.params} />
    </Suspense>
  );
}

async function PageContent(props: Props) {
  const params = await props.params;
  const blog = await getBlogDetail(params.slug);
  if (!blog) return;

  return (
      <article>
        <h1>{blog.title}</h1>
          {blog.eyecatch && (
            <Image
              src={blog.eyecatch.url}
              alt=""
              width={blog.eyecatch.width}
              height={blog.eyecatch.height}
            />
        )}
        <div className="blog-detail" dangerouslySetInnerHTML={{ __html: blog.body }} />
      </article>
  )
}