// src/components/Carousel.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Anime } from '@/types';
import CarouselSlide from './CarouselSlide'; // Import komponen slide baru kita

interface CarouselProps {
  animes: Anime[];
}

export default function Carousel({ animes }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    // Opsi untuk membuat slide tengah jadi fokus
    { loop: true, align: 'center', containScroll: 'trimSnaps' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);

  return (
    <div className="relative w-full group py-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[40vh] sm:h-[50vh] md:h-[60vh]">
          {animes.map((anime, index) => {
            const isActive = index === selectedIndex;
            return (
              // Setiap slide sekarang punya lebar, misal 1/2 di mobile, 1/4 di desktop
              <div 
                key={anime.animeId}
                className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 transition-all duration-500 ease-out"
                style={{
                  transform: `scale(${isActive ? 1 : 0.85})`,
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                <CarouselSlide anime={anime} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Tombol Navigasi Kiri & Kanan */}
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={32} />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={32} />
      </button>
    </div>
  );
}