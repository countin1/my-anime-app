import { useState, useEffect, useCallback, useRef } from "react";
import { useDebounce } from "./use-debounce";
import { getAnimeFull, getAnimeEpisodes, searchAnimeByTitle } from "@/lib/api";
import { multiSearch, getTrending, getTop, getSeasonal } from "@/lib/unified";
import { translateSearchQuery } from "@/lib/chinese-titles";
import type { UnifiedAnime } from "@/types/unified";
import type { JikanAnimeFull, JikanEpisode } from "@/types/anime";

interface UseAnimeListResult {
  anime: UnifiedAnime[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}

// Generic factory for paginated anime list hooks
function useAnimeList(
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

  const fetchPage = useCallback(async (p: number) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    // Abort previous in-flight request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const items = await fetcher(p, controller.signal);
      setAnime((prev) => (p === 1 ? items : [...prev, ...items]));
      setHasMore(items.length >= 15);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError("加载动漫数据失败");
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
      loadingRef.current = false;
    }
  }, [fetcher]);

  useEffect(() => {
    if (!enabled) {
      // Reset stale state when disabled so re-enable starts fresh
      setAnime([]);
      setPage(1);
      setHasMore(true);
      setError(null);
      setLoading(false);
      abortRef.current?.abort();
      loadingRef.current = false;
      return;
    }
    fetchPage(1);
    return () => {
      abortRef.current?.abort();
      loadingRef.current = false;
    };
  }, [fetchPage, enabled]);

  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  }, [page, hasMore, fetchPage]);

  return { anime, loading, error, loadMore, hasMore };
}

export function useTopAnime(enabled = true): UseAnimeListResult {
  return useAnimeList(getTop, enabled);
}

export function useSeasonalAnime(enabled = true): UseAnimeListResult {
  return useAnimeList(getSeasonal, enabled);
}

export function useTrendingAnime(enabled = true): UseAnimeListResult {
  return useAnimeList(getTrending, enabled);
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
          if (merged.length > 0) {
            setResults(merged);
            setError(null);
          } else {
            setError("搜索失败");
          }
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
