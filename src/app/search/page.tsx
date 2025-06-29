// src/app/search/page.tsx
import searchService from '@/services/searchService';
import AnimeCard from '@/components/AnimeCard';
import PaginationControls from '@/components/PaginationControls';
import type { AnimeCard2 } from '@/types';
import AnimatedGrid from '@/components/AnimatedGrid';

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || '';
  const page = searchParams.page || '1';

  if (!query) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl text-white">
          Silakan masukkan kata kunci untuk mencari anime.
        </h1>
      </main>
    );
  }

  const { data, pagination, ok } = await searchService({ q: query, page });

  if (!ok || !data) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl text-red-500">Gagal melakukan pencarian.</h1>
      </main>
    );
  }

  const animeList = data.animeList;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Hasil Pencarian untuk: <span className="text-cyan-400">{query}</span>
      </h1>

      {animeList.length > 0 ? (
        <>
          <AnimatedGrid>
            {animeList.map((anime: AnimeCard2) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </AnimatedGrid>

          <PaginationControls
            pagination={pagination}
            basePath={`/search?q=${query}`}
          />
        </>
      ) : (
        <p className="text-gray-400 text-center">
          Tidak ada hasil yang ditemukan untuk &quot;{query}&quot;.
        </p>
      )}
    </main>
  );
}
