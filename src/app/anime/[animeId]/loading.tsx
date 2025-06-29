// src/app/anime/[animeId]/loading.tsx (Versi Perbaikan)

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        {/* Kolom Kiri: Poster Skeleton */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          {/* Mengganti bg-card menjadi bg-gray-800 */}
          <div className="w-full h-[450px] bg-gray-800 rounded-md"></div>
        </div>

        {/* Kolom Kanan: Detail Info Skeleton */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="h-10 bg-gray-800 rounded w-3/4"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-800 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-800 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-800 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-4 bg-gray-800 rounded w-1/3"></div>
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}