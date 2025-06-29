import skuy from '@/utils/skuy';
import type { GenreLinkCard } from '@/types';

interface AllGenres {
  genreList: GenreLinkCard[];
}

export default async function genreService() {
  const result = await skuy<AllGenres>("/genres");

  return result;
}
