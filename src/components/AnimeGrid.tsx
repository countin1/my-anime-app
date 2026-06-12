import { ChevronDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimeCard from "./AnimeCard";
import LoadingGrid from "./LoadingGrid";
import type { UnifiedAnime } from "@/types/unified";

interface AnimeGridProps {
  title: string;
  anime: UnifiedAnime[];
  loading: boolean;
  error?: string | null;
  onSelect: (anime: UnifiedAnime) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  horizontal?: boolean;
}

export default function AnimeGrid({ title, anime, loading, error, onSelect, onLoadMore, hasMore, horizontal }: AnimeGridProps) {
  if (loading && anime.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <LoadingGrid />
      </section>
    );
  }

  if (error && anime.length === 0) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex items-center gap-3 text-destructive bg-destructive/10 rounded-xl px-4 py-3">
          <AlertCircle className="size-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (anime.length === 0) return null;

  if (horizontal) {
    return (
      <section className="space-y-3">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
          {anime.map((a, i) => (
            <div key={`${a.id}-${i}`} className="flex-shrink-0 w-[160px]">
              <AnimeCard anime={a} onClick={onSelect} index={i} />
            </div>
          ))}
          {hasMore && onLoadMore && (
            <div className="flex-shrink-0 w-[160px] flex items-center justify-center">
              <Button
                variant="outline"
                onClick={onLoadMore}
                disabled={loading}
                className="rounded-full border-primary/30 hover:bg-primary/10 h-10"
              >
                {loading ? (
                  <div className="size-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <span className="text-sm">加载更多</span>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
        {anime.map((a, i) => (
          <AnimeCard key={`${a.id}-${i}`} anime={a} onClick={onSelect} index={i} />
        ))}
      </div>
      {hasMore && onLoadMore && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loading}
            className="gap-2 rounded-full border-primary/30 hover:bg-primary/10"
          >
            {loading ? (
              <div className="size-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            ) : (
              <ChevronDown className="size-4" />
            )}
            加载更多
          </Button>
        </div>
      )}
    </section>
  );
}
