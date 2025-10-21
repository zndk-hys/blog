"use client";

import { useRouter } from "nextjs-toploader/app";
import { ChangeEventHandler } from "react";

type Props = {
  maxPageNum: number;
  currentPage: number;
}

export default function PagenationSelect({maxPageNum, currentPage}: Props) {
  const router = useRouter();

  const onChangePage: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const page = e.currentTarget.value;
    router.replace(page === "1" ? `/blog` : `/blog/page/${e.currentTarget.value}`);
  };

  return (
    <select defaultValue={currentPage} onChange={onChangePage}>
      {Array.from({length: maxPageNum}).map((_, i) => (
        <option key={i+1} value={i+1}>{i+1}</option>
      ))}
    </select>
  );
}