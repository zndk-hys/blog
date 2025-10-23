"use client";

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useRouter } from "nextjs-toploader/app";
import { Select } from "radix-ui";

type Props = {
  maxPageNum: number;
  currentPage: number;
}

export default function PaginationSelect({maxPageNum, currentPage}: Props) {
  const router = useRouter();

  const onChangePage = (value: string) => {
    router.replace(value === "1" ? `/blog` : `/blog/page/${value}`);
  };

  const items = Array.from({length: maxPageNum}).map((v, i) => (
    <Select.Item key={String(i+1)} value={String(i+1)} className=" h-7 w-16 flex items-center justify-center relative rounded-sm text-center data-highlighted:bg-blue-100 data-highlighted:text-blue-600 dark:data-highlighted:bg-gray-600 dark:data-highlighted:text-white">
      <div><Select.ItemText>{String(i+1)}</Select.ItemText></div>
      <Select.ItemIndicator className="absolute left-1">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  ));

  return (
    <Select.Root defaultValue={String(currentPage)} onValueChange={onChangePage}>
      <Select.Trigger className="mx-auto h-8 flex items-center bg-gray-100 dark:bg-gray-800 rounded-md px-1">
        <div className="px-3">
          <Select.Value />
        </div>
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-white dark:bg-gray-900 rounded-sm border-1 border-gray-300 dark:border-gray-500 shadow-md">
          <Select.ScrollUpButton className="flex items-center justify-center h-5">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {items}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-5">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}