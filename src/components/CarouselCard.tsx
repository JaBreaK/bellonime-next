// src/components/CarouselCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import type { Anime } from '@/types';

interface CarouselCardProps {
  anime: Anime;
}

const getFirstParagraph = (text?: string): string => {
  if (!text) return 'Sinopsis tidak tersedia.';
  return text.replace(/<br\s*\/?>/gi, '\n').split('\n\n')[0];
};


export default function CarouselCard({ anime }: CarouselCardProps) {
  const synopsisPreview = getFirstParagraph(anime.synopsis);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      
      <Image
        src={anime.poster}
        alt={`Poster for ${anime.title}`}
        fill
        className="object-cover"
        priority
      />

      {/* PERUBAHAN 2: Gradient kini menggunakan warna tema */}
      <div className="
        absolute inset-0 
        bg-gradient-to-t from-black/80 via-black/40 to-transparent             
        md:bg-gradient-to-r md:from-primary/95 md:via-primary/70 md:to-transparent
      "></div>

      <div className="
        relative w-full h-full
        flex flex-col justify-end
        md:flex-row md:items-center
      ">
        {/* PERUBAHAN 1: Area teks di desktop diperlebar */}
        <div className="w-full md:w-2/3 lg:w-3/5 p-6 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight">
              {anime.title}
            </h2>

            <p className="mt-3 text-sm text-neutral-200 line-clamp-2 md:line-clamp-3 max-w-prose">
              {synopsisPreview}
            </p>
            
            <Link 
              href={`/anime/${anime.animeId}`} 
              className="
                inline-flex items-center gap-2 mt-5 
                bg-glow hover:bg-primary
                text-white font-bold py-2.5 px-5 
                rounded-full transition-colors shadow-lg shadow-glow/30
              "
            >
              <PlayCircle size={20} />
              Lihat Detail
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}