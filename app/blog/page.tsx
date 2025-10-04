import { getBlogList } from "@/lib/microcms";
import Link from "next/link";

export default async function Page() {
  const data = await getBlogList();

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {data.contents.map((post) => {
          const id = post.id;
          return (
            <li key={id}>
              <Link href={`/blog/${id}`}>{post.title}</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
};
