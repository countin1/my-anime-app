import axios from "axios";
import type { UnifiedAnime, AnimeStatus, AnimeType } from "@/types/unified";

const client = axios.create({
  baseURL: "https://kitsu.io/api/edge",
  timeout: 15000,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
  },
});

interface KitsuAttributes {
  canonicalTitle: string;
  titles: Record<string, string>;
  abbreviatedTitles: string[];
  posterImage?: { tiny?: string; small?: string; medium?: string; large?: string; original?: string };
  coverImage?: { tiny?: string; small?: string; medium?: string; large?: string; original?: string };
  episodeCount: number | null;
  episodeLength: number | null;
  averageRating: string | null;
  ratingRank: number | null;
  popularityRank: number | null;
  userCount: number | null;
  favoritesCount: number | null;
  status: string;
  showType: string;
  synopsis: string;
  startDate: string | null;
  endDate: string | null;
  nextRelease: string | null;
  ageRating: string | null;
  youtubeVideoId: string | null;
  nsfw: boolean;
}

interface KitsuItem {
  id: string;
  type: string;
  attributes: KitsuAttributes;
}

function mapStatus(status: string | undefined): AnimeStatus {
  switch (status) {
    case "current": return "airing";
    case "finished": return "complete";
    case "tba": return "upcoming";
    case "upcoming": return "upcoming";
    case "unreleased": return "upcoming";
    default: return "unknown";
  }
}

function mapType(showType: string | undefined): AnimeType {
  switch (showType?.toLowerCase()) {
    case "tv": return "TV";
    case "movie": return "Movie";
    case "ova": return "OVA";
    case "ona": return "ONA";
    case "special": return "Special";
    case "music": return "Music";
    default: return "Unknown";
  }
}

function mapAnime(item: KitsuItem): UnifiedAnime {
  const attrs = item.attributes;
  const titles = attrs.titles || {};
  const poster = attrs.posterImage;
  const cover = attrs.coverImage;

  return {
    id: `kitsu:${item.id}`,
    source: "kitsu",
    sourceId: item.id,
    malId: null,
    title: titles.zh_cn || titles.zh_tw || titles.ja_jp || titles.en_jp || titles.en || attrs.canonicalTitle,
    titleNative: titles.ja_jp || "",
    titleChinese: titles.zh_cn || titles.zh_tw || "",
    titleEnglish: titles.en || "",
    titleRomaji: titles.en_jp || "",
    posterUrl: poster?.large || poster?.medium || poster?.small || "",
    bannerUrl: cover?.large || cover?.original || null,
    score: attrs.averageRating ? parseFloat(attrs.averageRating) / 10 : null,
    episodes: attrs.episodeCount,
    status: mapStatus(attrs.status),
    type: mapType(attrs.showType),
    synopsis: attrs.synopsis || "",
    genres: [],
    year: attrs.startDate ? new Date(attrs.startDate).getFullYear() : null,
    season: null,
    trailer: attrs.youtubeVideoId ? { youtubeId: attrs.youtubeVideoId } : null,
    popularity: attrs.userCount || null,
    favorites: attrs.favoritesCount || null,
    duration: attrs.episodeLength ? `${attrs.episodeLength}分钟` : null,
    studios: [],
    airedFrom: attrs.startDate || null,
    airedTo: attrs.endDate || null,
  };
}

export async function searchKitsu(query: string, page = 1, signal?: AbortSignal): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const offset = (page - 1) * 20;
  const res = await client.get("/anime", {
    params: {
      "filter[text]": query,
      "page[limit]": 20,
      "page[offset]": offset,
    },
    signal,
  });

  const items: KitsuItem[] = res.data.data || [];
  const total = res.data.meta?.count || 0;

  return {
    items: items.map(mapAnime),
    hasNext: offset + 20 < total,
  };
}

export async function getTrendingKitsu(signal?: AbortSignal): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const res = await client.get("/trending/anime", {
    params: { "page[limit]": 20 },
    signal,
  });

  const items: KitsuItem[] = res.data.data || [];

  return {
    items: items.map(mapAnime),
    hasNext: false,
  };
}

export async function getTopKitsu(page = 1, signal?: AbortSignal): Promise<{ items: UnifiedAnime[]; hasNext: boolean }> {
  const offset = (page - 1) * 20;
  const res = await client.get("/anime", {
    params: {
      "sort": "-averageRating",
      "page[limit]": 20,
      "page[offset]": offset,
      "filter[status]": "finished",
    },
    signal,
  });

  const items: KitsuItem[] = res.data.data || [];
  const total = res.data.meta?.count || 0;

  return {
    items: items.map(mapAnime),
    hasNext: offset + 20 < total,
  };
}
