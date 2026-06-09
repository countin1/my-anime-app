import { useState, useEffect } from "react";
import { useDebounce } from "./use-debounce";
import { NOVEL_SOURCES } from "@/lib/novel-sources";
import type { NovelSource } from "@/types/novel";

interface NovelSearchLink {
  source: NovelSource;
  url: string;
}

interface UseNovelSearchResult {
  links: NovelSearchLink[];
  query: string;
  debouncedQuery: string;
}

export function useNovelSearch(rawQuery: string): UseNovelSearchResult {
  const debouncedQuery = useDebounce(rawQuery, 300);
  const [links, setLinks] = useState<NovelSearchLink[]>([]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setLinks([]);
      return;
    }

    const searchLinks = NOVEL_SOURCES.map((source) => ({
      source,
      url: source.searchUrl(debouncedQuery),
    }));

    setLinks(searchLinks);
  }, [debouncedQuery]);

  return { links, query: rawQuery, debouncedQuery };
}
