// src/app/anime-list/page.tsx

import Link from "next/link";
import allAnimeService from "@/services/animeService";
import type { AnimeLinkCard } from "@/types";

export default async function AllAnimeListPage() {
  const { data, ok } = await allAnimeService();

  if (!ok || !data) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Gagal memuat daftar anime.</h1>
      </main>
    );
  }

  const animeGroups = data.list;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Daftar Semua Anime</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Kolom Kiri: Navigasi Abjad */}
        <nav className="w-full md:w-16 md:sticky top-20 self-start">
          <ul className="flex flex-row md:flex-col flex-wrap gap-2">
            {animeGroups.map((group) => (
              <li key={group.startWith}>
                <a
                  href={`#${group.startWith}`}
                  className="
                    block
                    border-2 border-current
                    bg-transparent
                    p-2 rounded-md
                    transition-[ring]
                    hover:ring-2 hover:ring-current
                  "
                >
                  {group.startWith}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kolom Kanan: Daftar Anime */}
        <div className="w-full space-y-8">
          {animeGroups.map((group) => (
            <section key={group.startWith} id={group.startWith} className="scroll-mt-20">
              <h2 className="text-3xl font-bold border-b-2 border-current pb-2 mb-4">
                {group.startWith}
              </h2>
              <ul className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-x-6">
                {group.animeList.map((anime: AnimeLinkCard) => (
                  <li key={anime.animeId} className="mb-2">
                    <Link
                      href={`/anime/${anime.animeId}`}
                      className="
                        inline-block
                        border-2 border-transparent
                        bg-transparent
                        px-1 py-0.5 rounded
                        transition-[ring]
                        hover:ring-2 hover:ring-current
                      "
                    >
                      {anime.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
