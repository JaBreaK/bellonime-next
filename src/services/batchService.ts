import skuy from '@/utils/skuy';
import type { AnimeCard2 } from '@/types';

interface Batch {
  batchList: AnimeCard2[];
}

export default async function batchService(queryParam: {
  page?: string | number | null;
}) {
  const { page } = queryParam;
  const result = await skuy<Batch>(`/batch?page=${page || 1}`);

  return result;
}
