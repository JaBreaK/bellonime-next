// src/components/VideoPlayer.tsx
'use client';

import { useState } from 'react';
// Kita tidak butuh react-player lagi
// import { default as ReactPlayer } from 'react-player'; 
import type { AnimeEpisode } from '@/types';

interface VideoPlayerProps {
  anime: AnimeEpisode;
}

// Komponen kecil untuk menampilkan spinner (TETAP SAMA)
function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
    </div>
  );
}

// Komponen kecil untuk render player (INI YANG KITA UBAH)
function Player({ src }: { src: string }) {
  if (!src || src.toLowerCase().includes('no iframe found')) {
    return <h5 className="text-lg font-extrabold">Server Tidak Tersedia</h5>;
  }

  // LANGSUNG GUNAKAN IFRAME, KARENA INI LINK EMBED
  return (
    <iframe
      className="w-full h-full"
      src={src}
      allowFullScreen
      scrolling="no"
      frameBorder="0"
    ></iframe>
  );
}

// SISA KOMPONEN LAINNYA TETAP SAMA
export default function VideoPlayer({ anime }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [videoSrc, setVideoSrc] = useState(anime.defaultStreamingUrl);

  const handleServerChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue === anime.defaultStreamingUrl) {
      setVideoSrc(selectedValue);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/server/${selectedValue}`, { method: 'POST' });
      const data = await response.json();
      setVideoSrc(data.url || anime.defaultStreamingUrl);
    } catch (error) {
      console.error("Gagal fetch server:", error);
      setVideoSrc(anime.defaultStreamingUrl);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label htmlFor="server-select" className="block text-sm font-medium ">Pilih Server</label>
      <select id="server-select" onChange={handleServerChange} defaultValue={videoSrc} className="bg-zinc-700 border-zinc-600  text-sm rounded-lg  block w-full p-2.5">
        <option value={anime.defaultStreamingUrl}>Pilih Kualitas disini</option>
        {anime.server.qualities.map((quality) => 
          quality.serverList && quality.serverList.length > 0 && (
            <optgroup label={quality.title} key={quality.title}>
              {quality.serverList.map((server) => (
                <option value={server.serverId} key={server.serverId}>
                  {server.title}
                </option>
              ))}
            </optgroup>
          )
        )}
      </select>
      <div className="relative flex justify-center items-center aspect-video bg-black rounded-lg overflow-hidden">
        {isLoading ? <Spinner /> : <Player src={videoSrc} />}
      </div>
    </div>
  );
}