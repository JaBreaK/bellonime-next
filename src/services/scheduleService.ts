import skuy from '@/utils/skuy';
import type { AnimeCard4 } from '@/types';

interface Schedule {
  days: {
    day: string;
    animeList: AnimeCard4[];
  }[];
}

export default async function scheduleService() {
  const result = await skuy<Schedule>("/schedule");

  return result;
}
