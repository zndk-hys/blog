import { POSTS_PER_PAGE } from "@/constants";
import Link from "next/link";
import PagenationSelect from "../PaginationSelect";

type Props = {
  totalCount: number;
  currentPage?: number;
}

export default function Pagination({totalCount, currentPage = 1}: Props) {
  const maxPageNum = Math.ceil( totalCount / POSTS_PER_PAGE );

  const options = [];
  for(let i = 1; i < maxPageNum + 1; i++) {
    options.push(
      <option key={i} value={i}>{i}</option>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <div className="text-center">
        {currentPage > 1 && (
          <Link href={currentPage === 2 ? `/blog` : `/blog/page/${currentPage - 1}`}>前へ</Link>
        )}
      </div>
      <div className="text-center">
        <PagenationSelect maxPageNum={maxPageNum} currentPage={currentPage} />
      </div>
      <div className="text-center">
        {currentPage < maxPageNum && (
          <Link href={`/blog/page/${currentPage + 1}`}>次へ</Link>
        )}
      </div>
    </div>
  );
}