import skuy from '@/utils/skuy';
import type { AnimeCard1, AnimeCard3 } from "@/types";

export interface Home {
  ongoing: {
    href?: string;
    otakudesuUrl?: string;
    animeList: AnimeCard1[];
  };
  completed: {
    href?: string;
    otakudesuUrl?: string;
    animeList: AnimeCard1[];
  };
  movie: {
    href?: string;
    otakudesuUrl?: string;
    animeList: AnimeCard3[];
  };
}

export default async function homeService() {
  const result = await skuy<Home>("/home");

  return result;
}
