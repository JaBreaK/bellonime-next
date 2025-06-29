// src/app/ongoing/page.tsx

import ongoingService from '@/services/ongoingService';
import AnimeCard from '@/components/AnimeCard'; // Komponen kartu kita yang serbaguna
import PaginationControls from '@/components/PaginationControls';
import AnimatedGrid from '@/components/AnimatedGrid';
import type { AnimeCard2 } from '@/types';

// Halaman server menerima searchParams sebagai props
interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function OngoingPage({ searchParams }: PageProps) {
  const page = searchParams.page || '1';
  
  // Panggil service dengan nomor halaman saat ini
  const { data, pagination, ok } = await ongoingService({ page });

  if (!ok || !data) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Gagal memuat data anime ongoing.</h1>
      </main>
    );
  }

  const animeList = data.animeList;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 ">On-Going</h1>

      {/* GANTI DIV DENGAN INI */}
      <AnimatedGrid>
        {animeList.map((anime: AnimeCard2) => (
          <AnimeCard key={anime.animeId} anime={anime} />
        ))}
      </AnimatedGrid>

      {/* Tampilkan komponen pagination di bawah list */}
      <PaginationControls pagination={pagination} basePath="/ongoing" /> {/* <-- Cukup tambahkan ini */}
    </main>
  );
}