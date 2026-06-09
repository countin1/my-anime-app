export type AnimeSource = 'jikan' | 'anilist' | 'kitsu';

export type AnimeStatus = 'airing' | 'complete' | 'upcoming' | 'unknown';
export type AnimeType = 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special' | 'Music' | 'Unknown';

export interface UnifiedAnime {
  id: string;
  source: AnimeSource;
  sourceId: string;
  malId: number | null;
  title: string;
  titleNative: string;
  titleChinese: string;
  titleEnglish: string;
  titleRomaji: string;
  posterUrl: string;
  bannerUrl: string | null;
  score: number | null;
  episodes: number | null;
  status: AnimeStatus;
  type: AnimeType;
  synopsis: string;
  genres: string[];
  year: number | null;
  season: string | null;
  trailer: {
    youtubeId?: string;
    bilibiliId?: string;
  } | null;
  popularity: number | null;
  favorites: number | null;
  duration: string | null;
  studios: string[];
  airedFrom: string | null;
  airedTo: string | null;
}

export interface UnifiedSearchResult {
  items: UnifiedAnime[];
  total: number;
  hasMore: boolean;
}
