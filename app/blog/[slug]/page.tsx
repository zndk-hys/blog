import { getBlogDetail } from "@/lib/microcms";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page(props: Props) {
  const blog = await getBlogDetail(props.params.slug);
  if (!blog) return;

  return (
    <main>
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
        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      </article>
    </main>
  );
}