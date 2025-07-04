// src/app/anime/[animeId]/latest/page.tsx

import { redirect } from 'next/navigation';
import animeInfoService from '@/services/animeInfoService';

interface PageProps {
  params: {
    animeId: string;
  };
}

export default async function LatestEpisodeRedirectPage({ params }: PageProps) {
  const { animeId } = params;

  // Ambil detail anime untuk mendapatkan daftar episode
  const { data: anime, ok } = await animeInfoService({ animeId });

  // Cari episode paling baru (biasanya yang pertama di dalam list)
  const latestEpisode = anime?.episodeList?.[0];

  if (ok && latestEpisode) {
    // Jika episode terbaru ditemukan, langsung alihkan ke halaman nonton
    redirect(`/watch/${latestEpisode.episodeId}`);
  } else {
    // Jika tidak ditemukan, alihkan saja ke halaman detail biasa sebagai fallback
    redirect(`/anime/${animeId}`);
  }

  // Komponen ini tidak akan pernah ditampilkan ke user karena sudah dialihkan.
  // Tapi kita tetap return null untuk memenuhi aturan React.
  return null;
}