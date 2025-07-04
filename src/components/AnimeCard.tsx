// src/components/AnimeCard.tsx (Versi Final yang Sudah Diperbaiki)

import Image from "next/image";
import Link from "next/link";
import type { Anime } from "@/types";

type LinkType = 'detail' | 'latest-episode';

interface AnimeCardProps {
  anime: Anime;
  linkTo?: LinkType;
}

export default function AnimeCard({ anime, linkTo = 'detail' }: AnimeCardProps) {
  if (!anime || !anime.animeId) return null;

  // --- INI BAGIAN YANG DIPERBAIKI ---
  // Logika untuk menentukan tujuan link berdasarkan props `linkTo`
  let href = `/anime/${anime.animeId}`; // Link default adalah ke halaman detail
  if (linkTo === 'latest-episode') {
    href = `/anime/${anime.animeId}/latest`; // Jika diminta, link ke 'URL Pintar' kita
  }

  return (
    <Link href={href} className="group relative block">
      {/* PERUBAHAN 1: Efek hover ditingkatkan dengan shadow & glow */}
      <div className="
        aspect-[2/3] relative overflow-hidden rounded-lg 
        shadow-lg transition-all duration-300
        group-hover:shadow-2xl group-hover:shadow-primary/20
      ">
        <Image
          src={anime.poster}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          quality={85} // Sedikit menaikkan kualitas gambar
        />
        
        {/* PERUBAHAN 2: Badge episode dengan gaya "Frosted Glass" */}
        {'episodes' in anime && (
          <div className="
            absolute top-2.5 left-2.5 
            bg-black/50 backdrop-blur-sm 
            text-white text-xs font-bold px-2 py-1 rounded-md
          ">
            Ep {anime.episodes}
          </div>
        )}
      </div>
      
      {/* PERUBAHAN 3: Teks mendukung dark/light mode & lebih rapi */}
      <h3 className="
        font-semibold text-sm line-clamp-2 
        text-foreground transition-colors
        group-hover:text-primary
      ">
        {anime.title}
      </h3>
    </Link>
  );
}