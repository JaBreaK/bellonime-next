// src/app/genres/page.tsx

import Link from "next/link";
import genreService from "@/services/genreService";
import type { GenreLinkCard } from "@/types";

export default async function GenresPage() {
  const { data, ok } = await genreService();

  if (!ok || !data) {
    return (
      <main className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">Gagal memuat daftar genre.</h1>
      </main>
    );
  }

  const genreList = data.genreList;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Daftar Genre</h1>

      {/* Grid untuk menampilkan semua genre */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {genreList.map((genre: GenreLinkCard) => (
          <Link
            href={`/genres/${genre.genreId}`}
            key={genre.genreId}
            className="flex items-center justify-center text-center bg-gray-800 hover:bg-cyan-600 text-white font-semibold p-4 rounded-lg transition-colors shadow-lg"
          >
            {genre.title}
          </Link>
        ))}
      </div>
    </main>
  );
}