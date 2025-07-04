// src/app/watch/[episodeId]/loading.tsx (Versi Final)

export default function WatchLoading() {
  return (
    <main className="container mx-auto px-4  animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* === SKELETON KOLOM KIRI === */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mengganti warna tes dengan warna skeleton permanen */}
          <div className="aspect-video w-full bg-slate-800 rounded-lg"></div>
          <div className="h-8 w-3/4 bg-slate-800 rounded-md mt-4"></div>
          <div className="flex gap-3">
            <div className="h-10 w-full bg-slate-800 rounded-lg"></div>
            <div className="h-10 w-full bg-slate-800 rounded-lg"></div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg h-36 w-full"></div>
        </div>

        {/* === SKELETON KOLOM KANAN === */}
        <aside className="lg:col-span-4">
          <div className="bg-bg-off p-4 rounded-lg border border-border">
            <div className="h-7 w-1/2 bg-slate-700 rounded-md mb-4"></div>
            <div className="max-h-[70vh] overflow-y-auto pr-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {Array.from({ length: 25 }).map((_, index) => (
                <div key={index} className="aspect-square bg-slate-700 rounded-md"></div>
              ))}
            </div>
          </div>
        </aside>
        
      </div>
    </main>
  );
}