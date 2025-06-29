// src/components/AnimeCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { AnimeCard1, AnimeCard3 } from "@/types";

interface AnimeCardProps {
  anime: AnimeCard1 | AnimeCard3;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  if (!anime.animeId) {
    return null;
  }

  return (
    <Link href={`/anime/${anime.animeId}`} className="group block space-y-2.5">
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