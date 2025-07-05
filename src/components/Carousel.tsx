// src/components/Carousel.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Anime } from '@/types';
import CarouselCard from './CarouselCard';

interface CarouselProps {
  animes: Anime[];
}

export default function Carousel({ animes }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect) };
  }, [emblaApi]);

  if (!animes || animes.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="aspect-video w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl flex items-center justify-center">
          <p className="text-neutral-500">Carousel sedang tidak tersedia.</p>
        </div>
      </div>
    );
  }

  return (
    // PERUBAHAN 1: Memberi padding vertikal untuk ruang nafas atas-bawah
    <div className="relative w-full group"> 
      {/* PERUBAHAN 2: Sudut rounded dikembalikan */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {animes.map((anime) => (
            <div className="flex-[0_0_100%] aspect-video md:aspect-[21/9]" key={anime.animeId}>
              <CarouselCard anime={anime} />
            </div>
          ))}
        </div>
      </div>

      {/* PERUBAHAN 3: Efek gradient (vignette) ditambahkan di sini */}
      <div className="
        absolute inset-0 rounded-2xl
        pointer-events-none
        bg-gradient-radial from-transparent to-black/30
        opacity-0 group:hover:opacity-100 transition-opacity duration-300
      "></div>

      {/* Tombol Navigasi (tetap dengan sintaks Tailwind v4) */}
      <button 
        onClick={scrollPrev} 
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white opacity-0 group:hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={scrollNext} 
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white opacity-0 group:hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots Navigasi */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {animes.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
}