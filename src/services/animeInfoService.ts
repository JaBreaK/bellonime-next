import skuy from '@/utils/skuy';
import type {
  BatchLinkCard,
  EpisodeLinkCard,
  GenreLinkCard,
  Synopsis,
} from '@/types';

interface AnimeDetails {
  title: string;
  poster: string;
  score: { value: string; users: string };
  japanese: string;
  synonyms: string;
  english: string;
  status: string;
  type: string;
  source: string;
  duration: string;
  episodes: number | null;
  season: string;
  studios: string;
  producers: string;
  aired: string;
  trailer: string;
  batchList: BatchLinkCard[];
  synopsis: Synopsis;
  genreList: GenreLinkCard[];
  episodeList: EpisodeLinkCard[];
}


// Sesudah
export default async function animeInfoService(params: {
  animeId: string;
}) {

  // JANGAN DESTRUCTURE SAMA SEKALI.
  // Langsung pakai `params.animeId` di dalam pemanggilan skuy.
  const result = await skuy<AnimeDetails>(`/anime/${params.animeId}`);

  return result;
}