// src/components/CarouselSlide.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Anime } from '@/types';

interface CarouselSlideProps {
  anime: Anime;
}

export default function CarouselSlide({ anime }: CarouselSlideProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="h-full">
      <Link href={`/anime/${anime.animeId}`} className="block h-full">
        <div className="relative h-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={anime.poster}
            alt={anime.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </Link>
    </motion.div>
  );
}