// src/components/EpisodeListSidebar.tsx (Versi Dual-Theme)
'use client';

import Link from 'next/link';
import type { EpisodeLinkCard } from '@/types';

interface EpisodeListSidebarProps {
  episodes: EpisodeLinkCard[];
  currentEpisodeId: string;
}

export default function EpisodeListSidebar({ episodes, currentEpisodeId }: EpisodeListSidebarProps) {
  return (
    <div className="bg-bg-off p-4 rounded-lg border border-border ">
      <h3 className="font-display font-bold text-xl text-foreground mb-4">Daftar Episode</h3>
      
      <div className="max-h-[70vh] overflow-y-auto pr-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {episodes.map((episode) => {
          const isActive = episode.episodeId === currentEpisodeId;

          // Kita gunakan penggabungan className yang lebih rapi
          const baseClasses = "flex items-center justify-center aspect-square rounded-md text-sm font-semibold transition-colors duration-200";
          
          const activeClasses = "bg-glow bg-gray-200 text-slate-800 cursor-default shadow-lg shadow-glow/30";
          
          const inactiveClasses = `
             hover:bg-pink-500 hover:text-white
            dark:bg-card dark:text-text-dim dark:hover:bg-primary dark:hover:text-white
          `;

          return (
            <Link
              href={`/watch/${episode.episodeId}`}
              key={episode.episodeId}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              {episode.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}