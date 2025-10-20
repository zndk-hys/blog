import { POSTS_PER_PAGE } from "@/constants";
import Link from "next/link";

type Props = {
  totalCount: number;
  currentPage?: number;
}

export default function Pagination({totalCount, currentPage = 1}: Props) {
  const maxPageNum = Math.ceil( totalCount / POSTS_PER_PAGE );

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <div className="text-center">
        {currentPage > 1 && (
          <Link href={currentPage === 2 ? `/blog` : `/blog/page/${currentPage - 1}`}>前へ</Link>
        )}
      </div>
      <div className="text-center">
        {currentPage}
      </div>
      <div className="text-center">
        {currentPage < maxPageNum && (
          <Link href={`/blog/page/${currentPage + 1}`}>次へ</Link>
        )}
      </div>
    </div>
  );
}