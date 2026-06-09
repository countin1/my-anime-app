import type { UnifiedAnime } from "@/types/unified";
import type { JikanAnime } from "@/types/anime";
import { searchAniList, getTrendingAniList, getTopAniList, getSeasonalAniList } from "./anilist";
import { searchKitsu, getTrendingKitsu, getTopKitsu } from "./kitsu";
import { searchAnime, getTopAnime, getSeasonNow } from "./api";
import { getChineseTitle } from "./chinese-titles";

// Convert Jikan anime to UnifiedAnime
function mapJikanToUnified(anime: JikanAnime): UnifiedAnime {
  const chineseTitle = getChineseTitle(anime.title, anime.title_english, anime.title_japanese);

  const statusMap: Record<string, string> = {
    "Currently Airing": "airing",
    "Finished Airing": "complete",
    "Not yet aired": "upcoming",
  };

  return {
    id: `jikan:${anime.mal_id}`,
    source: "jikan",
    sourceId: String(anime.mal_id),
    malId: anime.mal_id,
    title: chineseTitle,
    titleNative: anime.title_japanese || "",
    titleChinese: chineseTitle,
    titleEnglish: anime.title_english || "",
    titleRomaji: anime.title,
    posterUrl: anime.images?.jpg?.large_image_url || "",
    bannerUrl: null,
    score: anime.score || null,
    episodes: anime.episodes || null,
    status: (statusMap[anime.status || ""] || "unknown") as "airing" | "complete" | "upcoming" | "unknown",
    type: (anime.type || "Unknown") as "TV" | "Movie" | "OVA" | "ONA" | "Special" | "Music" | "Unknown",
    synopsis: anime.synopsis || "",
    genres: (anime.genres || []).map((g) => g.name),
    year: anime.year || null,
    season: anime.season || null,
    trailer: anime.trailer?.youtube_id ? { youtubeId: anime.trailer.youtube_id } : null,
    popularity: anime.popularity || null,
    favorites: anime.favorites || null,
    duration: anime.duration || null,
    studios: (anime.studios || []).map((s) => s.name),
    airedFrom: anime.aired?.from || null,
    airedTo: anime.aired?.to || null,
  };
}

// Deduplicate by title similarity + year
function deduplicate(items: UnifiedAnime[]): UnifiedAnime[] {
  const seen = new Map<string, UnifiedAnime>();

  for (const item of items) {
    const normTitle = normalizeForDedupe(item.title);
    const yearKey = item.year || "";
    const key = `${normTitle}:${yearKey}`;

    const existing = seen.get(key);
    if (!existing) {
      seen.set(key, item);
    } else if ((item.score || 0) > (existing.score || 0)) {
      seen.set(key, item);
    }
  }

  return Array.from(seen.values());
}

function normalizeForDedupe(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿぀-ゟ゠-ヿ]/g, "")
    .trim();
}

// Apply Chinese titles to items in-place
function applyChineseTitles(items: UnifiedAnime[]): UnifiedAnime[] {
  for (const item of items) {
    if (!item.titleChinese) {
      item.titleChinese = getChineseTitle(item.titleRomaji, item.titleEnglish, item.titleNative);
    }
    item.title = item.titleChinese;
  }
  return items;
}

// Search across all sources
export async function multiSearch(query: string, page = 1, signal?: AbortSignal): Promise<UnifiedAnime[]> {
  const promises = [
    searchAniList(query, page, signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),

    searchKitsu(query, page, signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),

    searchAnime(query, page, signal)
      .then((r) => r.data.map(mapJikanToUnified))
      .catch(() => [] as UnifiedAnime[]),
  ];

  const results = await Promise.all(promises);
  return deduplicate(results.flat());
}

// Get trending/top/seasonal from all sources
export async function getTrending(page = 1, signal?: AbortSignal): Promise<UnifiedAnime[]> {
  const promises = [
    getTrendingAniList(page, signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),
    getTrendingKitsu(signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),
  ];

  const results = await Promise.all(promises);
  return deduplicate(results.flat());
}

export async function getTop(page = 1, signal?: AbortSignal): Promise<UnifiedAnime[]> {
  const promises = [
    getTopAniList(page, signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),
    getTopKitsu(page, signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),
    getTopAnime(page, signal)
      .then((r) => r.data.map(mapJikanToUnified))
      .catch(() => [] as UnifiedAnime[]),
  ];

  const results = await Promise.all(promises);
  return deduplicate(results.flat());
}

export async function getSeasonal(page = 1, signal?: AbortSignal): Promise<UnifiedAnime[]> {
  const promises = [
    getSeasonalAniList(undefined, undefined, page, signal)
      .then((r) => applyChineseTitles(r.items))
      .catch(() => [] as UnifiedAnime[]),
    getSeasonNow(page, signal)
      .then((r) => r.data.map(mapJikanToUnified))
      .catch(() => [] as UnifiedAnime[]),
  ];

  const results = await Promise.all(promises);
  return deduplicate(results.flat());
}
