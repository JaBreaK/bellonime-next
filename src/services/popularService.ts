import skuy from '@/utils/skuy';
import type { AnimeCard2 } from '@/types';

interface Animes {
  animeList: AnimeCard2[];
}

export default async function popularService(queryParam: {
  page?: string | number | null;
}) {
  const { page } = queryParam;
  const result = await skuy<Animes>(`/popular?page=${page || 1}`);

  return result;
}
