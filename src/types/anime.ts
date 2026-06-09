export interface JikanImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface JikanTrailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

export interface JikanEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanTitle {
  type: string;
  title: string;
}

export interface JikanAired {
  from: string | null;
  to: string | null;
  prop: {
    from: { day: number | null; month: number | null; year: number | null };
    to: { day: number | null; month: number | null; year: number | null };
    string: string;
  };
}

export interface JikanAnime {
  mal_id: number;
  url: string;
  images: { jpg: JikanImageSet; webp: JikanImageSet };
  trailer: JikanTrailer;
  approved: boolean;
  titles: JikanTitle[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string | null;
  source: string | null;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: JikanAired;
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  genres: JikanEntity[];
  studios: JikanEntity[];
  themes: JikanEntity[];
  demographics: JikanEntity[];
}

export interface JikanAnimeFull extends JikanAnime {
  relations: { relation: string; entry: JikanEntity[] }[];
  theme: { openings: string[]; endings: string[] };
  external: { name: string; url: string }[];
  streaming: { name: string; url: string }[];
}

export interface JikanEpisode {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string | null;
  title_romanji: string | null;
  aired: string | null;
  score: number | null;
  filler: boolean;
  recap: boolean;
  forum_url: string | null;
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: { count: number; total: number; per_page: number };
}

export interface JikanListResponse<T> {
  data: T[];
  pagination: JikanPagination;
}

export interface JikanSingleResponse<T> {
  data: T;
}
