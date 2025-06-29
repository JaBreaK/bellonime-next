// src/app/batch/[batchId]/page.tsx (Versi Anti Error)

import Image from "next/image";
import batchInfoService from "@/services/batchInfoService";
import type {  GenreLinkCard } from "@/types";
import DownloadSection from '@/components/DownloadSection'; // <-- Import komponen baru

interface PageProps {
  params: {
    batchId: string;
  };
}

export default async function BatchDetailPage({ params }: PageProps) {
  const { data: anime, ok } = await batchInfoService({ batchId: params.batchId });

  if (!ok || !anime) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Informasi Batch tidak ditemukan.</h1>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 ">
      {/* Bagian Info Anime */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/4 flex-shrink-0">
          <Image
            src={anime.poster}
            alt={anime.title}
            width={300}
            height={450}
            className="w-full h-auto object-cover rounded-md shadow-lg"
          />
        </div>
        <div className="w-full md:w-3/4 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{anime.title} Batch Subtitle Indonesia</h1>
          <div className="flex flex-wrap gap-2">
            {anime.genreList.map((genre: GenreLinkCard) => (
              <span key={genre.genreId} className="bg-gray-700  text-xs font-semibold px-3 py-1 rounded-full">
                {genre.title}
              </span>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold border-b-2 border-gray-700 pb-1 mb-2">Sinopsis</h2>
            {/* INI BAGIAN YANG DIPERBAIKI */}
            <p className=" leading-relaxed whitespace-pre-wrap">
              {anime.synopsis?.paragraphs?.join("\n\n") || 'Sinopsis tidak tersedia untuk halaman batch ini.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bagian Link Download */}
<DownloadSection downloadUrl={anime.downloadUrl} />
    </main>
  );
}
