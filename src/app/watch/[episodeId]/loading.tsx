// src/app/watch/[episodeId]/loading.tsx

export default function WatchLoading() {
  return (
    <main className="container mx-auto px-4 py-8 animate-pulse">
      {/* Skeleton untuk Judul */}
      <div className="h-9 w-3/4 bg-gray-800 rounded-md mb-4"></div>

      {/* Skeleton untuk Video Player */}
      <div className="space-y-4">
        {/* Skeleton untuk dropdown server */}
        <div className="h-6 w-48 bg-gray-800 rounded-md"></div>
        <div className="h-12 w-full bg-gray-800 rounded-lg"></div>
        {/* Skeleton untuk kotak video */}
        <div className="aspect-video w-full bg-gray-800 rounded-lg"></div>
      </div>

      {/* Skeleton untuk Tombol Navigasi */}
      <div className="flex justify-between items-center mt-4">
        <div className="h-10 w-32 bg-gray-800 rounded-lg"></div>
        <div className="h-10 w-32 bg-gray-800 rounded-lg"></div>
      </div>

      {/* Skeleton untuk Link Download */}
      <div className="mt-8">
        <div className="h-8 w-1/4 bg-gray-800 rounded-md mb-4"></div>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg h-24"></div>
          <div className="bg-gray-800 p-4 rounded-lg h-24"></div>
        </div>
      </div>
    </main>
  );
}