// src/app/watch/[episodeId]/page.tsx
import Link from 'next/link';
import episodeService from '@/services/episodeService';
import VideoPlayer from '@/components/VideoPlayer';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import DownloadSection from '@/components/DownloadSection';

interface PageProps {
  params: {
    episodeId: string;
  };
}

export default async function WatchPage({ params }: PageProps) {
  const { data: episode, ok } = await episodeService({ episodeId: params.episodeId });

  const baseButtonClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500";
  const ghostButtonClasses =
    "bg-transparent  hover:bg-gray-800 hover:text-white";
  const primaryButtonClasses =
    "bg-cyan-600 text-white hover:bg-cyan-700";

  if (!ok || !episode) {
    return (
      <main className="flex justify-center items-center h-screen ">
        <h1 className="text-xl text-red-500">Gagal memuat episode.</h1>
      </main>
    );
  }

  const isVideoDataAvailable =
    episode.server &&
    Array.isArray(episode.server.qualities) &&
    episode.server.qualities.length > 0;
  const { prevEpisode, nextEpisode } = episode;

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 truncate ">
        {episode.title}
      </h1>

      <div className="space-y-4">
        {isVideoDataAvailable ? (
          <VideoPlayer anime={episode} />
        ) : (
          <div className="aspect-video  flex justify-center items-center rounded-lg">
            <p className="text-red-500">
              Data video tidak tersedia untuk episode ini.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-grow gap-3">
            {prevEpisode ? (
              <Link
                href={`/watch/${prevEpisode.episodeId}`}
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full`}
              >
                <ArrowLeft size={20} />
                <span>Sebelumnya</span>
              </Link>
            ) : (
              <div
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full opacity-50 pointer-events-none`}
              >
                <ArrowLeft size={20} />
                <span>Sebelumnya</span>
              </div>
            )}

            {nextEpisode ? (
              <Link
                href={`/watch/${nextEpisode.episodeId}`}
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full`}
              >
                <span>Selanjutnya</span>
                <ArrowRight size={20} />
              </Link>
            ) : (
              <div
                className={`${baseButtonClasses} ${ghostButtonClasses} w-full opacity-50 pointer-events-none`}
              >
                <span>Selanjutnya</span>
                <ArrowRight size={20} />
              </div>
            )}
          </div>
        </div>

        {/* === Toggle Download Section dengan <details> === */}
        <details className="mt-4">
          <summary
            className={`${baseButtonClasses} ${primaryButtonClasses} cursor-pointer select-none`}
          >
            <Download size={20} />
            <span>Download</span>
          </summary>
          <div className="mt-2">
            <DownloadSection downloadUrl={episode.downloadUrl} />
          </div>
        </details>
      </div>
    </main>
  );
}
