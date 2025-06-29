// src/app/completed/page.tsx
import completedService from '@/services/completedService'; // <-- Panggil service yang benar
import AnimeCard from '@/components/AnimeCard';
import PaginationControls from '@/components/PaginationControls';
import AnimatedGrid from '@/components/AnimatedGrid';
import type { AnimeCard2 } from '@/types';

interface PageProps {
  searchParams: { page?: string };
}

export default async function CompletedPage({ searchParams }: PageProps) {
  const page = searchParams.page || '1';
  
  const { data, pagination, ok } = await completedService({ page });

  if (!ok || !data) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Gagal memuat data anime tamat.</h1>
      </main>
    );
  }

  const animeList = data.animeList;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 ">Completed</h1>
      <AnimatedGrid>
        {animeList.map((anime: AnimeCard2) => (
          <AnimeCard key={anime.animeId} anime={anime} />
        ))}
      </AnimatedGrid>
      {/* Beri tahu komponen pagination kalau base path-nya adalah /completed */}
      <PaginationControls pagination={pagination} basePath="/completed" />
    </main>
  );
}