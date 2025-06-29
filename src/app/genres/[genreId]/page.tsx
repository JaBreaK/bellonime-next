// src/app/genres/[genreId]/page.tsx

import animeByGenreService from '@/services/animeByGenreService';
import AnimeCard from '@/components/AnimeCard';
import AnimatedGrid from '@/components/AnimatedGrid';
import PaginationControls from '@/components/PaginationControls';
import type { AnimeCard2 } from '@/types';

// Halaman ini menerima 2 props: params (dari URL) dan searchParams (dari query ?page=)
interface PageProps {
  params: {
    genreId: string;
  };
  searchParams: {
    page?: string;
  };
}

// Fungsi untuk membuat huruf pertama jadi kapital (biar judulnya cantik)
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default async function AnimeByGenrePage({ params, searchParams }: PageProps) {
  const { genreId } = params;
  const page = searchParams.page || '1';

  // Panggil service dengan genreId dan nomor halaman
  const { data, pagination, ok } = await animeByGenreService(
    { genreId },
    { page }
  );

  if (!ok || !data) {
    return (
      <main className="flex flex-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Gagal memuat data untuk genre ini.</h1>
      </main>
    );
  }

  const animeList = data.animeList;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">
        Genre: {capitalizeFirstLetter(genreId.replace(/-/g, ' '))}
      </h1>

      {animeList.length > 0 ? (
        <>
          <AnimatedGrid>
            {animeList.map((anime: AnimeCard2) => (
              <AnimeCard key={anime.animeId} anime={anime} />
            ))}
          </AnimatedGrid>
          
          {/* Komponen pagination kita yang sakti dipakai lagi di sini */}
          <PaginationControls pagination={pagination} basePath={`/genres/${genreId}`} />
        </>
      ) : (
        <p className="text-gray-400 text-center">Tidak ada anime untuk genre ini.</p>
      )}
    </main>
  );
}