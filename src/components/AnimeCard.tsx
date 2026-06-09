import React, { useState } from "react";
import { Star, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatScore } from "@/lib/utils";
import type { UnifiedAnime } from "@/types/unified";

interface AnimeCardProps {
  anime: UnifiedAnime;
  onClick: (anime: UnifiedAnime) => void;
  index?: number;
}

const sourceIcons: Record<string, string> = {
  jikan: "MAL",
  anilist: "AL",
  kitsu: "KU",
};

const sourceColors: Record<string, string> = {
  jikan: "bg-blue-500/80",
  anilist: "bg-cyan-500/80",
  kitsu: "bg-orange-500/80",
};

export default function AnimeCard({ anime, onClick, index = 0 }: AnimeCardProps) {
  const [imgError, setImgError] = useState(false);

  const scoreDisplay = formatScore(anime.score);

  return (
    <div
      className="group relative cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
      onClick={() => onClick(anime)}
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary/40 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg group-hover:shadow-purple-500/20">
        {!imgError && anime.posterUrl ? (
          <img
            src={anime.posterUrl}
            alt={anime.title}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/60 to-pink-900/40 flex items-center justify-center">
            <span className="text-4xl opacity-30">🎬</span>
          </div>
        )}

        {/* Source badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-md text-white font-bold ${sourceColors[anime.source] || "bg-gray-500/80"}`}>
            {sourceIcons[anime.source] || anime.source}
          </span>
        </div>

        {/* Score badge */}
        {scoreDisplay && (
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-black/70 text-yellow-400 border-yellow-400/30 gap-0.5 text-xs px-1.5 py-0.5 backdrop-blur-sm">
              <Star className="size-3 fill-yellow-400" />
              {scoreDisplay}
            </Badge>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-8 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="size-4 text-primary-foreground fill-primary-foreground ml-0.5" />
            </div>
          </div>
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
            {anime.title}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {anime.type && anime.type !== "Unknown" && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {anime.type}
              </Badge>
            )}
            {anime.episodes && (
              <span className="text-[11px] text-muted-foreground">
                {anime.episodes} 集
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Title below card */}
      <h3 className="mt-2 text-sm font-medium line-clamp-2 text-foreground/80 group-hover:text-foreground transition-colors leading-tight">
        {anime.title}
      </h3>
    </div>
  );
}
