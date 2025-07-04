// src/app/watch/[episodeId]/page.tsx
import Link from 'next/link';
import episodeService from '@/services/episodeService';
import VideoPlayer from '@/components/VideoPlayer';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import DownloadSection from '@/components/DownloadSection';
import type { Metadata } from 'next';
import EpisodeListSidebar from '@/components/EpisodeListSidebar';
import animeInfoService from '@/services/animeInfoService';

interface PageProps {
  params: {
    episodeId: string;
  };
}

// --- TAMBAHKAN FUNGSI SEO INI ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { episodeId } = params;
  const { data: episode } = await episodeService({ episodeId });

  if (!episode) {
    return {
      title: 'Episode Tidak Ditemukan',
    };
  }

  // Ambil sinopsis paragraf pertama, atau sediakan deskripsi default
  const description = episode.synopsis?.paragraphs?.[0] || `Nonton ${episode.title} subtitle indonesia gratis di Bellonime.`;

  return {
    title: `${episode.title} | Bellonime`,
    description: description,
    openGraph: {
      title: `${episode.title} | Bellonime`,
      description: description,
      images: [
        {
          url: episode.poster, // Gunakan poster anime sebagai gambar preview
          width: 800,
          height: 1200,
          alt: `Poster ${episode.title}`,
        },
      ],
      locale: 'id_ID',
      type: 'video.episode', // Tipe spesifik untuk episode video
    },
    twitter: {
      card: 'summary_large_image',
      title: `${episode.title} | Bellonime`,
      description: description,
      images: [episode.poster],
    },
  };
}
// -----------------------------------

export default async function WatchPage({ params }: PageProps) {
  const { data: episode, ok } = await episodeService({ episodeId: params.episodeId });

  const baseButtonClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500";
  const ghostButtonClasses =
    "bg-transparent  hover:bg-gray-800 hover:text-white";
  const primaryButtonClasses =
    "bg-cyan-600 text-white hover:bg-cyan-700";

  if (!ok || !episode) {
    return (
      <main className="flex justify-center items-center h-screen ">
        <h1 className="text-xl text-red-500">Gagal memuat episode.</h1>
      </main>
    );
  }


    
  const { prevEpisode, nextEpisode, animeId, info,  title } = episode;
  const episodeList = info.episodeList;
  const animeTitle = title.split(' Episode')[0];
  const { data: animeInfo,  } = await animeInfoService({ animeId: episode.animeId });
  const { synopsis } = animeInfo || {}; // Ambil sinopsis dari animeInfo, beri fallback object kosong

return (
    <main className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* === KOLOM KIRI (Player, Judul, Info) === */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Player Video */}
          <VideoPlayer anime={episode} />

          {/* 2. Judul Episode */}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground pt-2">
            {title}
          </h1>
          
          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-grow gap-3">
            {prevEpisode ? (
              <Link
                href={`/watch/${prevEpisode.episodeId}`}
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full`}
              >
                <ArrowLeft size={20} />
                <span>Sebelumnya</span>
              </Link>
            ) : (
              <div
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full opacity-50 pointer-events-none`}
              >
                <ArrowLeft size={20} />
                <span>Sebelumnya</span>
              </div>
            )}

            {nextEpisode ? (
              <Link
                href={`/watch/${nextEpisode.episodeId}`}
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full`}
              >
                <span>Selanjutnya</span>
                <ArrowRight size={20} />
              </Link>
            ) : (
              <div
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full opacity-50 pointer-events-none`}
              >
                <span>Selanjutnya</span>
                <ArrowRight size={20} />
              </div>
            )}
          </div>
        </div>


                  <div className="bg-bg-off p-4 rounded-lg border border-border">
            <Link href={`/anime/${animeId}`}>
              <h2 className="font-display font-bold text-xl text-foreground hover:text-glow transition-colors">{animeTitle}</h2>
            </Link>
            <p className="text-sm text-dim mt-2 leading-relaxed">
                {synopsis?.paragraphs?.join('\n\n')}
            </p>
          </div>

        {/* === Toggle Download Section dengan <details> === */}
        <details className="mt-4">
          <summary
            className={`${baseButtonClasses} ${primaryButtonClasses} cursor-pointer select-none`}
          >
            <Download size={20} />
            <span>Download</span>
          </summary>
          <div className="mt-2">
            <DownloadSection downloadUrl={episode.downloadUrl} />
          </div>
        </details>
      </div>

        {/* === KOLOM KANAN (Daftar Episode) === */}
        <aside className="lg:col-span-4">
          <EpisodeListSidebar episodes={episodeList} currentEpisodeId={params.episodeId} />
        </aside>
        
      </div>
    </main>
  );
}