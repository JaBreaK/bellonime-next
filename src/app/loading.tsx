// src/app/loading.tsx

import SkeletonCard from "@/components/SkeletonCard";

export default function HomeLoading() {
  // Kita buat array 'palsu' untuk me-render beberapa skeleton card sekaligus
  const skeletonCount = 12;

  return (
    <main className="container mx-auto px-4 py-8 space-y-12 animate-pulse">
      {/* Skeleton untuk Sesi "Rilisan Terbaru" */}
      <section>
        <div className="h-8 w-1/3 bg-gray-800 rounded-md mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>

      {/* Skeleton untuk Sesi "Anime Tamat" */}
      <section>
        <div className="h-8 w-1/3 bg-gray-800 rounded-md mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}