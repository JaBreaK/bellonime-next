// src/app/completed/page.tsx
import completedService from '@/services/completedService'; // <-- Panggil service yang benar
import AnimeCard from '@/components/AnimeCard';
import PaginationControls from '@/components/PaginationControls';
import AnimatedGrid from '@/components/AnimatedGrid';
import type { AnimeCard2 } from '@/types';


import type { Metadata } from 'next';


// FUNGSI SEO UNTUK HALAMAN ONGOING
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const page = searchParams.page || '1';
  const pageTitleSuffix = page && page !== '1' ? ` - Halaman ${page}` : '';

  const title = `Anime Completed${pageTitleSuffix} | Bellonime`;
  const description = `Daftar anime completed yang sedang tayang (ongoing) musim ini, diupdate setiap hari di Bellonime. Halaman ${page}.`;

  return {
    title,
    description,
    // Canonical URL penting untuk pagination SEO
    // Ini memberitahu Google bahwa halaman utama untuk konten ini adalah /ongoing
    alternates: {
      canonical: `/completed`,
    },
    openGraph: {
      title,
      description,
      url: `/completed?page=${page}`,
      siteName: 'Bellonime',
      images: [
        {
          url: '/images/bellonime.png', // Buat gambar default untuk halaman ongoing
          width: 1200,
          height: 630,
        },
      ],
      locale: 'id_ID',
      type: 'website',
    },
  };
}

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