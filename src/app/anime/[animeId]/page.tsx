// src/app/anime/[animeId]/page.tsx

import Image from "next/image";
import Link from "next/link";
import animeInfoService from "@/services/animeInfoService";
import type { EpisodeLinkCard, GenreLinkCard } from "@/types";
import { Download, Star } from "lucide-react";

interface PageProps {
  params: {
    animeId: string;
  };
}

export default async function AnimeDetailPage({ params }: PageProps) {
  const { data: anime, ok } = await animeInfoService(params);

  if (!ok || !anime) {
    return (
      <main className="container mx-auto flex justify-center items-center h-[calc(100vh-80px)] px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive">Gagal Memuat Anime</h1>
          <p className="text-text-dim">Anime tidak ditemukan atau terjadi kesalahan.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Kolom Kiri: Poster */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <Image
            src={anime.poster}
            alt={anime.title}
            width={300}
            height={450}
            className="w-full h-auto object-cover rounded-xl shadow-lg shadow-black/20 dark:shadow-primary/10"
            priority
            quality={90}
          />
        </div>

        {/* Kolom Kanan: Detail Info */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{anime.title}</h1>
          
          <div className="flex flex-wrap gap-2">
            {anime.genreList.map((genre: GenreLinkCard) => (
              <span 
                key={genre.genreId} 
                className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                {genre.title}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
            <DetailItem label="Skor" value={anime.score.value} icon={<Star size={14} className="text-yellow-500" />} />
            <DetailItem label="Status" value={anime.status} />
            <DetailItem label="Tipe" value={anime.type} />
            <DetailItem label="Episode" value={anime.episodes} />
            <DetailItem label="Durasi" value={anime.duration} />
            <DetailItem label="Musim" value={anime.season} />
          </div>

          {anime.batch && (
            <div>
              <Link
                href={`/batch/${anime.batch.batchId}`}
                // PERUBAHAN DI SINI: Menambahkan efek 'lift' pada hover
                className="inline-flex items-center gap-2.5 bg-glow hover:bg-primary  font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg shadow-glow/30 hover:shadow-primary/40 text-center hover:-translate-y-1"
              >
                <Download size={20} />
                Download Batch
              </Link>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold border-b-2 border-border pb-2 mb-4">Sinopsis</h2>
            <p className="text-text-dim leading-relaxed whitespace-pre-wrap">
              {anime.synopsis.paragraphs.join("\n\n")}
            </p>
          </div>
          
          <div>
             <h2 className="text-2xl font-semibold border-b-2 border-border pb-2 mb-4">Daftar Episode</h2>
             <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2.5 mt-4">
               {anime.episodeList.map((episode: EpisodeLinkCard) => (
                 <Link 
                   href={`/watch/${episode.episodeId}`} 
                   key={episode.episodeId}
                   // PERUBAHAN DI SINI: Menambahkan efek 'lift' dan memastikan transisi 'all'
                   className="
                     bg-card text-foreground font-medium
                     border border-border
                     hover:bg-primary hover:text-white hover:border-primary
                     transition-all duration-200 text-center p-2.5 rounded-lg text-sm
                     hover:-translate-y-1
                   "
                 >
                   {episode.title}
                 </Link>
               ))}
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Komponen helper kecil untuk merapikan tampilan detail
function DetailItem({ label, value, icon }: { label: string; value?: string | number | null, icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-text-dim">{label}</span>
      <span className="text-foreground flex items-center gap-1.5">{icon}{value || 'N/A'}</span>
    </div>
  )
}