export type Theme = "dark" | "light";

export interface AnimeCard1 {
  title: string;
  poster: string;
  episodes: string;
  releasedOn: string;
  batchId?: string;
  animeId?: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface AllAnimes {
  list: {
    startWith: string;
    animeList: AnimeLinkCard[];
  }[];
}


export interface AnimeCard2 {
  title: string;
  poster: string;
  status: string;
  type: string;
  description: string;
  score: string;
  releaseDate: string;
  animeId?: string;
  batchId?: string;
  batchList?: string;
  href?: string;
  samehadakuUrl?: string;
  genreList: GenreLinkCard[];
}

export interface AnimeCard3 {
  title: string;
  poster: string;
  status: string;
  type: string;
  releaseDate: string;
  description: string;
  animeId?: string;
  href?: string;
  samehadakuUrl?: string;
  genreList: GenreLinkCard[];
}

export interface AnimeCard4 {
  title: string;
  poster: string;
  releaseDate: string;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
  status: string;
  type: string;
  description: string;
  score: string;
  animeId?: string;
  batchId?: string;
  batchList?: string;
  genreList: GenreLinkCard[];
}

export type Schedule = {
  days: {
    day: string;
    animeList: AnimeCard4[];
  }[];
};


export interface AnimeCard5 {
  title: string;
  poster: string;
  releaseDate: string;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
  status: string;
  type: string;
  description: string;
  score: string;
  animeId?: string;
  batchId?: string;
  batchList?: string;
  genreList: GenreLinkCard[];
}

export interface AnimeCard6 {
  title: string;
  poster: string;
  releaseDate: string;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
  status: string;
  type: string;
  description: string;
  score: string;
  animeId?: string;
  batchId?: string;
  batchList?: string;
  genreList: GenreLinkCard[];
}

export interface LinkCard {
  title: string;
  slug: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface GenreLinkCard {
  title: string;
  genreId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface AnimeLinkCard {
  title: string;
  animeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface EpisodeLinkCard {
  title: number | null;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface NavEpisodeLinkCard {
  title: string;
  episodeId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface BatchLinkCard {
  title: string;
  batchId: string;
  href?: string;
  samehadakuUrl?: string;
}

export interface Synopsis {
  paragraphs: string[];
  connections?: AnimeLinkCard[];
}

export interface Pagination {
  currentPage?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number | null;
  hasNextPage?: boolean;
  nextPage?: number | null;
}

export interface Url {
  title: string;
  url: string;
}


export interface Server {
  title: string;
  serverId: string;
  href?: string;
}

export interface Quality {
  title: string;
  size?: string;
  urls?: Url[];
  serverList?: Server[];
}

export interface Format {
  title: string;
  qualities: Quality[];
}

export interface AnimeEpisode {
  title: string;
  animeId: string;
  poster: string;
  releaseTime: string;
  defaultStreamingUrl: string;
  hasPrevEpisode: boolean;
  prevEpisode: NavEpisodeLinkCard | null;
  hasNextEpisode: boolean;
  nextEpisode: NavEpisodeLinkCard | null;
  server: { qualities: Quality[] };
  downloadUrl: { qualities: Quality[] }; // <-- Di data episode isinya 'qualities'
  synopsis: Synopsis;
  
  // Ini bagian penting untuk daftar episode
  info: {
    genreList: GenreLinkCard[];
    episodeList: EpisodeLinkCard[];
  };

  recommendedEpisodeList: AnimeCard5[];
}

export type Anime = AnimeCard1 | AnimeCard2 | AnimeCard3 | AnimeCard6;