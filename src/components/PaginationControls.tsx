// src/components/PaginationControls.tsx (Versi Upgrade)
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import type { Pagination } from '@/types';

interface PaginationControlsProps {
  pagination: Pagination | null;
  basePath: string; // <-- TAMBAHKAN PROPS INI
}

export default function PaginationControls({ pagination, basePath }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!pagination) return null;

  const { currentPage, hasPrevPage, hasNextPage, totalPages } = pagination;

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
    currentParams.set('page', String(page));
    // Gunakan basePath dari props untuk membuat URL dinamis
    router.push(`${basePath}?${currentParams.toString()}`);
  };

  // ... sisa kode (tombol-tombol) tidak ada yang berubah ...
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
<button
  onClick={() => handlePageChange(currentPage! - 1)}
  disabled={!hasPrevPage}
  className="
    border-2 border-current
    
    bg-transparent
    hover:bg-black hover:text-white
    dark:hover:bg-white dark:hover:text-black
    disabled:border-gray-500 dark:disabled:border-gray-600
    disabled:text-gray-500 disabled:cursor-not-allowed
    font-bold py-2 px-4 rounded-lg transition-colors
  "
>
  &larr; Sebelumnya
</button>

<span className="font-semibold ">
  Halaman {currentPage} dari {totalPages}
</span>

<button
  onClick={() => handlePageChange(currentPage! + 1)}
  disabled={!hasNextPage}
  className="
    border-2 border-current
    
    bg-transparent
    hover:bg-black hover:text-white
    dark:hover:bg-white dark:hover:text-black
    disabled:border-gray-500 dark:disabled:border-gray-600
    disabled:text-gray-500 disabled:cursor-not-allowed
    font-bold py-2 px-4 rounded-lg transition-colors
  "
>
  Berikutnya &rarr;
</button>




    </div>
  );
}