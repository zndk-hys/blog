import { getBlogList } from "@/lib/microcms";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <PageContent />
    </Suspense>
  )
};

export async function PageContent() {
  const data = await getBlogList();

  return (
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
  )
}