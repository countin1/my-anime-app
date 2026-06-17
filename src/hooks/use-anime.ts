import { useState, useEffect, useCallback, useRef } from "react";
import { useDebounce } from "./use-debounce";
import { getAnimeFull, getAnimeEpisodes, searchAnimeByTitle } from "@/lib/api";
import { multiSearch, getTrending, getTop, getSeasonal } from "@/lib/unified";
import { translateSearchQuery } from "@/lib/chinese-titles";
import type { UnifiedAnime } from "@/types/unified";
import type { JikanAnimeFull, JikanEpisode } from "@/types/anime";

// ========== Simple in-memory cache with TTL ==========
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const listCache = new Map<string, CacheEntry<UnifiedAnime[]>>();
const detailCache = new Map<string, CacheEntry<{ full: JikanAnimeFull; episodes: JikanEpisode[] }>>();

function getCached<T>(cache: Map<string, CacheEntry<T>>, key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache<T>(cache: Map<string, CacheEntry<T>>, key: string, data: T) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ========== Types ==========
interface UseAnimeListResult {
  anime: UnifiedAnime[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}

// Generic factory for paginated anime list hooks
function useAnimeList(
  cacheKey: string,
  fetcher: (page: number, signal?: AbortSignal) => Promise<UnifiedAnime[]>,
  enabled = true,
): UseAnimeListResult {
  const [anime, setAnime] = useState<UnifiedAnime[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  // Check cache on mount
  useEffect(() => {
    if (!enabled) {
      setAnime([]);
      setPage(1);
      setHasMore(true);
      setError(null);
      setLoading(false);
      abortRef.current?.abort();
      loadingRef.current = false;
      return;
    }

    const cached = getCached(listCache, `${cacheKey}_p1`);
    if (cached) {
      setAnime(cached);
      setHasMore(cached.length >= 15);
      setLoading(false);
      return;
    }

    // Fetch page 1
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetcher(1, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) {
          setAnime(items);
          setHasMore(items.length >= 15);
          setError(null);
          setCache(listCache, `${cacheKey}_p1`, items);
        }
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!controller.signal.aborted) setError("加载动漫数据失败");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
        loadingRef.current = false;
      });

    return () => {
      controller.abort();
      loadingRef.current = false;
    };
  }, [cacheKey, fetcher, enabled]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    const nextPage = page + 1;
    loadingRef.current = true;
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    fetcher(nextPage, controller.signal)
      .then((items) => {
        if (!controller.signal.aborted) {
          setAnime((prev) => [...prev, ...items]);
          setHasMore(items.length >= 15);
          setError(null);
          setPage(nextPage);
        }
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!controller.signal.aborted) setError("加载更多失败");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
        loadingRef.current = false;
      });
  }, [page, hasMore, fetcher]);

  return { anime, loading, error, loadMore, hasMore };
}

export function useTopAnime(enabled = true): UseAnimeListResult {
  return useAnimeList("top", getTop, enabled);
}

export function useSeasonalAnime(enabled = true): UseAnimeListResult {
  return useAnimeList("seasonal", getSeasonal, enabled);
}

export function useTrendingAnime(enabled = true): UseAnimeListResult {
  return useAnimeList("trending", getTrending, enabled);
}

interface UseSearchResult {
  results: UnifiedAnime[];
  loading: boolean;
  error: string | null;
}

export function useAnimeSearch(query: string): UseSearchResult {
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<UnifiedAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // Check cache
    const cacheKey = `search_${debouncedQuery.toLowerCase()}`;
    const cached = getCached(listCache, cacheKey);
    if (cached) {
      setResults(cached);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    setLoading(true);

    const translatedQuery = translateSearchQuery(debouncedQuery);
    const queries = translatedQuery !== debouncedQuery
      ? [translatedQuery, debouncedQuery]
      : [debouncedQuery];

    Promise.all(queries.map((q) => multiSearch(q, 1, controller.signal).catch(() => [] as UnifiedAnime[])))
      .then((results) => {
        if (!cancelled) {
          const seen = new Set<string>();
          const merged: UnifiedAnime[] = [];
          for (const items of results) {
            for (const item of items) {
              if (!seen.has(item.id)) {
                seen.add(item.id);
                merged.push(item);
              }
            }
          }
          setResults(merged);
          setError(null);
          setCache(listCache, cacheKey, merged);
        }
      })
      .catch(() => {
        if (!cancelled) setError("搜索失败");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [debouncedQuery]);

  return { results, loading, error };
}

interface UseDetailResult {
  anime: JikanAnimeFull | null;
  episodes: JikanEpisode[];
  loading: boolean;
  error: string | null;
}

export function useAnimeDetail(malId: number | null, title?: string): UseDetailResult {
  const [anime, setAnime] = useState<JikanAnimeFull | null>(null);
  const [episodes, setEpisodes] = useState<JikanEpisode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const titleKey = title?.trim() || "";

  useEffect(() => {
    if (!malId && !titleKey) {
      setAnime(null);
      setEpisodes([]);
      setLoading(false);
      return;
    }

    const cacheKey = `detail_${malId || titleKey}`;
    const cached = getCached(detailCache, cacheKey);
    if (cached) {
      setAnime(cached.full);
      setEpisodes(cached.episodes);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const fetchByMalId = async (id: number) => {
      const [fullRes, epRes] = await Promise.all([
        getAnimeFull(id, controller.signal),
        getAnimeEpisodes(id, 1, controller.signal),
      ]);
      return { full: fullRes.data, episodes: epRes.data };
    };

    const fetchByTitle = async (t: string) => {
      const found = await searchAnimeByTitle(t, controller.signal);
      if (!found) throw new Error("not found");
      const [fullRes, epRes] = await Promise.all([
        getAnimeFull(found.mal_id, controller.signal),
        getAnimeEpisodes(found.mal_id, 1, controller.signal),
      ]);
      return { full: fullRes.data, episodes: epRes.data };
    };

    const fetch = malId ? fetchByMalId(malId) : fetchByTitle(titleKey);

    fetch
      .then(({ full, episodes: eps }) => {
        if (!cancelled) {
          setAnime(full);
          setEpisodes(eps);
          setCache(detailCache, cacheKey, { full, episodes: eps });
        }
      })
      .catch((err) => {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!cancelled) setError("加载动漫详情失败");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [malId, titleKey]);

  return { anime, episodes, loading, error };
}
