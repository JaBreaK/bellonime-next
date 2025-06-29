// src/app/schedule/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import scheduleService from '@/services/scheduleService';
import type { Schedule, AnimeCard4 } from '@/types';
import { Calendar, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

type DaySchedule = Schedule['days'][0];

function getTodayInIndonesian() {
  const dayIndex = new Date().getDay();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return days[dayIndex];
}

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<DaySchedule[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await scheduleService();
        if (data?.days) {
          setSchedules(data.days);
          const today = getTodayInIndonesian();
          const todayIndex = data.days.findIndex((d) => d.day === today);
          setActiveTabIndex(todayIndex !== -1 ? todayIndex : 0);
        }
      } catch (err) {
        console.error('Gagal memuat jadwal:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const dayCount = schedules.length;
  const activeDaySchedule = schedules[activeTabIndex];
  const goPrevDay = () => setActiveTabIndex(i => (i - 1 + dayCount) % dayCount);
  const goNextDay = () => setActiveTabIndex(i => (i + 1) % dayCount);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Judul */}
      <h1 className="flex items-center text-3xl md:text-4xl font-bold mb-8">
        <Calendar className="mr-3" size={32} />
        <span>Jadwal Rilis Anime</span>
      </h1>

      {isLoading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin mb-2" size={48} />
          <span>Loading jadwal...</span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Navigasi Hari */}
          <div className="flex items-center justify-center gap-2 border-b border-current pb-2">
            <button
              onClick={goPrevDay}
              className="
                border-2 border-current bg-transparent p-2 rounded-full
                hover:ring-2 hover:ring-current transition-[ring]
              "
              title="Hari Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex overflow-x-auto scrollbar-none gap-2">
              {schedules.map((sch, idx) => (
                <button
                  key={sch.day}
                  onClick={() => setActiveTabIndex(idx)}
                  className={`
                    border-2 border-current bg-transparent px-4 py-2 text-sm font-semibold rounded-t-lg
                    transition-[ring]
                    ${idx === activeTabIndex
                      ? 'ring-2 ring-current' 
                      : 'hover:ring-2 hover:ring-current'}
                  `}
                >
                  {sch.day}
                </button>
              ))}
            </div>

            <button
              onClick={goNextDay}
              className="
                border-2 border-current bg-transparent p-2 rounded-full
                hover:ring-2 hover:ring-current transition-[ring]
              "
              title="Hari Berikutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Konten Jadwal */}
          <div className="p-4 border-2 border-current bg-transparent rounded-b-lg min-h-[300px]">
            {activeDaySchedule?.animeList.length ? (
              <ul className="space-y-3">
                {activeDaySchedule.animeList.map((anime: AnimeCard4) => (
                  <li key={anime.animeId}>
                    <Link
                      href={`/anime/${anime.animeId}`}
                      className="
                        flex items-center gap-2 px-2 py-1 rounded
                        border-2 border-current bg-transparent transition-[ring]
                        hover:ring-2 hover:ring-current
                      "
                    >
                      <span className="w-1 h-1 rounded-full bg-current" />
                      <span>{anime.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">Tidak ada jadwal untuk hari ini.</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
