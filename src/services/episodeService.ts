import skuy from '@/utils/skuy';
import type {
  AnimeCard5,
  NavEpisodeLinkCard,
  Quality,
  Format,
  GenreLinkCard,
  Synopsis,
} from '@/types';

export interface AnimeEpisode {
  title: string;
  animeId: string;
  poster: string;
  releasedOn: string;
  defaultStreamingUrl: string;
  server: { qualities: Quality[] };
  hasPrevEpisode: boolean;
  prevEpisode: NavEpisodeLinkCard | null;
  hasNextEpisode: boolean;
  nextEpisode: NavEpisodeLinkCard | null;
  downloadUrl: { formats: Format[] };
  synopsis: Synopsis;
  genreList: GenreLinkCard[];
  recommendedEpisodeList: AnimeCard5[];
  movie: {
    href?: string;
    samehadakuUrl?: string;
    animeList: AnimeCard5[];
  };
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function episodeService(routeParams: {
  episodeId: string;
}) {
  await sleep(500);
  const { episodeId } = routeParams;
  const result = await skuy<AnimeEpisode>(`/episode/${episodeId}`);

  return result;
}
