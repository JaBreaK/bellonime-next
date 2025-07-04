// src/app/page.tsx (Versi Rombakan Total)

import homeService from '@/services/homeService';
import AnimeCard from "@/components/AnimeCard";

import Carousel from '@/components/Carousel';
import SectionHeader from '@/components/SectionHeader'; // <-- Import komponen baru
import type { Anime } from '@/types'; // <-- Import tipe Anime
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Bellonime - Nonton Anime Sub Indo Gratis & Terlengkap',
  description: 'Website nonton anime subtitle indonesia gratis dengan koleksi terlengkap dan update setiap hari. Streaming anime dengan kualitas HD tanpa iklan.',
  keywords: ['nonton anime', 'anime sub indo', 'streaming anime', 'bellonime', 'anime gratis'],
  openGraph: {
    title: 'Bellonime - Nonton Anime Sub Indo Gratis & Terlengkap',
    description: 'Streaming anime dengan kualitas HD tanpa iklan.',
    // Sediakan gambar default untuk homepage
    images: ['/images/bellonime.png'], // Pastikan gambar ini ada di folder /public/images/
  },
};

export default async function HomePage() {
  const { data: homeData, ok } = await homeService();

  if (!ok || !homeData) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Gagal memuat data. Coba lagi nanti.</h1>
      </main>
    );
  }

  // Siapkan data, pastikan aman jika kosong
  const ongoingAnime = homeData?.ongoing?.animeList ?? [];
  const completedAnime = homeData?.completed?.animeList ?? [];

  return (
    // Kita hapus container di sini agar Carousel bisa full-width
    <main className="space-y-16">

      {/* Hero Section: Carousel (Full Width) */}
      {ongoingAnime.length > 0 && <Carousel animes={ongoingAnime} />}

      <div className="container mx-auto px-4">
        {/* Section: Rilisan Terbaru */}
        {ongoingAnime.length > 0 && (
          <section>
            <SectionHeader title="Rilisan Terbaru" href="/ongoing" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
              {/* Tampilkan hanya 12 judul pertama */}
              {ongoingAnime.slice(0, 12).map((anime) => (
                <AnimeCard key={anime.animeId} anime={anime as Anime} linkTo="latest-episode" />
              ))}
            </div>
          </section>
        )}

        {/* Section: Anime Tamat */}
        {completedAnime.length > 0 && (
          <section>
            <SectionHeader title="Anime Tamat" href="/completed" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
              {/* Tampilkan hanya 12 judul pertama */}
              {completedAnime.slice(0, 12).map((anime) => (
                <AnimeCard key={anime.animeId} anime={anime as Anime} />
              ))}
            </div>
          </section>
        )}
      </div>

    </main>
  );
}