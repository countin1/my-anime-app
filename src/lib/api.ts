import axios from "axios";
import type {
  JikanAnime,
  JikanAnimeFull,
  JikanEpisode,
  JikanListResponse,
  JikanSingleResponse,
} from "@/types/anime";

const client = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 15000,
});

// Rate limiting: Jikan allows ~3 req/s, enforce 400ms between requests
let lastRequestTime = 0;
const MIN_INTERVAL = 400;

async function rateLimitedRequest<T>(url: string, params?: Record<string, unknown>, signal?: AbortSignal): Promise<T> {
  const now = Date.now();
  const elapsed = now - lastRequestTime;
  if (elapsed < MIN_INTERVAL) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL - elapsed));
  }
  lastRequestTime = Date.now();
  const res = await client.get<T>(url, { params, signal });
  return res.data;
}

export async function getTopAnime(
  page = 1,
  filter: "airing" | "upcoming" | "bypopularity" | "favorite" = "bypopularity",
  signal?: AbortSignal,
): Promise<JikanListResponse<JikanAnime>> {
  return rateLimitedRequest("/top/anime", { page, filter, limit: 24 }, signal);
}

export async function getSeasonNow(page = 1, signal?: AbortSignal): Promise<JikanListResponse<JikanAnime>> {
  return rateLimitedRequest("/seasons/now", { page, limit: 24 }, signal);
}

export async function searchAnime(
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<JikanListResponse<JikanAnime>> {
  return rateLimitedRequest("/anime", { q: query, page, sfw: true, limit: 24 }, signal);
}

export async function getAnimeFull(id: number, signal?: AbortSignal): Promise<JikanSingleResponse<JikanAnimeFull>> {
  return rateLimitedRequest(`/anime/${id}/full`, undefined, signal);
}

export async function getAnimeEpisodes(
  id: number,
  page = 1,
  signal?: AbortSignal,
): Promise<JikanListResponse<JikanEpisode>> {
  return rateLimitedRequest(`/anime/${id}/episodes`, { page }, signal);
}

export async function searchAnimeByTitle(
  title: string,
  signal?: AbortSignal,
): Promise<JikanAnime | null> {
  try {
    const res = await rateLimitedRequest<JikanListResponse<JikanAnime>>("/anime", { q: title, limit: 1, sfw: true }, signal);
    return res.data[0] || null;
  } catch {
    return null;
  }
}
