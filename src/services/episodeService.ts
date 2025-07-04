import skuy from '@/utils/skuy';
import type { AnimeEpisode } from '@/types';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function episodeService(routeParams: {
  episodeId: string;
}) {
  await sleep(500);
  const { episodeId } = routeParams;
  const result = await skuy<AnimeEpisode>(`/episode/${episodeId}`);

  return result;
}
