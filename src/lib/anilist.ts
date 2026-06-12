import axios from "axios";
import type { UnifiedAnime, AnimeStatus, AnimeType } from "@/types/unified";

interface AniListMedia {
  id: number;
  idMal: number | null;
  title: { romaji: string | null; english: string | null; native: string | null };
  coverImage: { large: string } | null;
  bannerImage: string | null;
  episodes: number | null;
  duration: number | null;
  averageScore: number | null;
  meanScore: number | null;
  popularity: number | null;
  favourites: number | null;
  status: string | null;
  format: string | null;
  description: string | null;
  genres: string[];
  season: string | null;
  seasonYear: number | null;
  studios: { nodes: { name: string }[] } | null;
  trailer: { site: string; id: string } | null;
  nextAiringEpisode: { airingAt: number; timeUntilAiring: number; episode: number } | null;
}

const client = axios.create({
  baseURL: "https://graphql.anilist.co",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

const SEARCH_QUERY = `
query ($search: String, $page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { total currentPage lastPage hasNextPage }
    media(search: $search, type: $type, sort: $sort) {
      id idMal
      title { romaji english native }
      coverImage { large color }
      bannerImage
      episodes duration
      averageScore meanScore
      popularity favourites
      status format
      description(asHtml: false)
      genres
      season seasonYear
      studios(isMain: true) { nodes { name } }
      trailer { site id }
      nextAiringEpisode { airingAt timeUntilAiring episode }
    }
  }
}`;

const TRENDING_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { total currentPage lastPage hasNextPage }
    media(type: ANIME, sort: TRENDING_DESC) {
      id idMal
      title { romaji english native }
      coverImage { large color }
      bannerImage
      episodes duration
      averageScore meanScore
      popularity favourites
      status format
      description(asHtml: false)
      genres
      season seasonYear
      studios(isMain: true) { nodes { name } }
      trailer { site id }
    }
  }
}`;

const TOP_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { total currentPage lastPage hasNextPage }
    media(type: ANIME, sort: SCORE_DESC) {
      id idMal
      title { romaji english native }
      coverImage { large color }
      bannerImage
      episodes duration
      averageScore meanScore
      popularity favourites
      status format
      description(asHtml: false)
      genres
      season seasonYear
      studios(isMain: true) { nodes { name } }
      trailer { site id }
    }
  }
}`;

const SEASONAL_QUERY = `
query ($page: Int, $perPage: Int, $seasonYear: Int, $season: MediaSeason) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { total currentPage lastPage hasNextPage }
    media(type: ANIME, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC) {
      id idMal
      title { romaji english native }
      coverImage { large color }
      bannerImage
      episodes duration
      averageScore meanScore
      popularity favourites
      status format
      description(asHtml: false)
      genres
      season seasonYear
      studios(isMain: true) { nodes { name } }
      trailer { site id }
    }
  }
}`;

function mapStatus(status: string | null): AnimeStatus {
  switch (status) {
    case "RELEASING": return "airing";
    case "FINISHED": return "complete";
    case "NOT_YET_RELEASED": return "upcoming";
    case "CANCELLED": return "unknown";
    case "HIATUS": return "unknown";
    default: return "unknown";
  }
}

function mapType(format: string | null): AnimeType {
  switch (format) {
    case "TV": return "TV";
    case "TV_SHORT": return "TV";
    case "MOVIE": return "Movie";
    case "OVA": return "OVA";
    case "ONA": return "ONA";
    case "SPECIAL": return "Special";
    case "MUSIC": return "Music";
    default: return "Unknown";
  }
}

function mapAnime(media: AniListMedia): UnifiedAnime {
  return {
    id: `anilist:${media.id}`,
    source: "anilist",
    sourceId: String(media.id),
    malId: media.idMal || null,
    title: media.title.native || media.title.romaji || media.title.english || "",
    titleNative: media.title.native || "",
    titleChinese: media.title.native || "",
    titleEnglish: media.title.english || "",
    titleRomaji: media.title.romaji || "",
    posterUrl: media.coverImage?.large || "",
    bannerUrl: media.bannerImage || null,
    score: media.averageScore ? media.averageScore / 10 : null,
    episodes: media.episodes || null,
    status: mapStatus(media.status),
    type: mapType(media.format),
    synopsis: media.description || "",
    genres: media.genres || [],
    year: media.seasonYear || null,
    season: media.season || null,
    trailer: media.trailer?.site === "youtube" ? { youtubeId: media.trailer.id } : null,
    popularity: media.popularity || null,
    favorites: media.favourites || null,
    duration: media.duration ? `${media.duration}分钟` : null,
    studios: media.studios?.nodes?.map((n) => n.name) || [],
    airedFrom: null,
    airedTo: null,
  };
}

async function graphqlQuery<T>(query: string, variables: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const res = await client.post("", { query, variables }, { signal });
  if (res.data.errors) {
    throw new Error(res.data.errors[0]?.message || "AniList API error");
  }
  return res.data.data;
}

export async function searchAniList(query: string, page = 1, signal?: AbortSignal): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const data = await graphqlQuery<{
    Page: { media: AniListMedia[]; pageInfo: { hasNextPage: boolean } };
  }>(SEARCH_QUERY, { search: query, page, perPage: 20, type: "ANIME", sort: ["SEARCH_MATCH"] }, signal);

  return {
    items: data.Page.media.map(mapAnime),
    hasNext: data.Page.pageInfo.hasNextPage,
  };
}

export async function getTrendingAniList(page = 1, signal?: AbortSignal): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const data = await graphqlQuery<{
    Page: { media: AniListMedia[]; pageInfo: { hasNextPage: boolean } };
  }>(TRENDING_QUERY, { page, perPage: 20 }, signal);

  return {
    items: data.Page.media.map(mapAnime),
    hasNext: data.Page.pageInfo.hasNextPage,
  };
}

export async function getTopAniList(page = 1, signal?: AbortSignal): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const data = await graphqlQuery<{
    Page: { media: AniListMedia[]; pageInfo: { hasNextPage: boolean } };
  }>(TOP_QUERY, { page, perPage: 20 }, signal);

  return {
    items: data.Page.media.map(mapAnime),
    hasNext: data.Page.pageInfo.hasNextPage,
  };
}

export async function getSeasonalAniList(
  year?: number,
  season?: string,
  page = 1,
  signal?: AbortSignal,
): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const now = new Date();
  const currentYear = year || now.getFullYear();
  const currentSeason = season || getSeason(now.getMonth());

  const data = await graphqlQuery<{
    Page: { media: AniListMedia[]; pageInfo: { hasNextPage: boolean } };
  }>(SEASONAL_QUERY, { page, perPage: 20, seasonYear: currentYear, season: currentSeason }, signal);

  return {
    items: data.Page.media.map(mapAnime),
    hasNext: data.Page.pageInfo.hasNextPage,
  };
}

function getSeason(month: number): string {
  if (month >= 0 && month <= 2) return "WINTER";
  if (month >= 3 && month <= 5) return "SPRING";
  if (month >= 6 && month <= 8) return "SUMMER";
  return "FALL";
}
