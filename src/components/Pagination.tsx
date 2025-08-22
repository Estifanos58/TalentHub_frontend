"use client";

import { useRouter } from 'next/navigation';
import React from 'react'

function Pagination({count, currentPage}: {count: number, currentPage: number}) {
    const router = useRouter();
    const ITEM_PER_PAGE = parseInt(process.env.ITEMS_PER_PAGE || "10");
    const hasPrev = ITEM_PER_PAGE * (currentPage - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (currentPage - 1) + ITEM_PER_PAGE < count;

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search);
        params.set("page", newPage.toString());
        router.push(`${window.location.pathname}?${params}`);
    };
  return (
     <div className="flex justify-center gap-2 mt-6">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-primary dark:hover:bg-primary-dark hover:text-white transition-colors ${
                  currentPage === pageIndex ? "bg-secondary" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>



  )
}

export default Pagination