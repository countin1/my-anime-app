import React from "react";
import { ExternalLink } from "lucide-react";
import type { NovelSource } from "@/types/novel";

interface NovelCardProps {
  source: NovelSource;
  searchUrl: string;
  query: string;
  index?: number;
}

export default function NovelCard({ source, searchUrl, query, index = 0 }: NovelCardProps) {
  const handleClick = () => {
    window.electron.openExternal(searchUrl);
  };

  return (
    <div
      className="group relative cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
      onClick={handleClick}
    >
      <div className="relative rounded-xl overflow-hidden bg-secondary/40 border border-white/5 p-5 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-purple-500/20 group-hover:border-primary/30">
        {/* Source icon and name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl shrink-0">
            {source.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {source.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {source.description}
            </p>
          </div>
          <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>

        {/* Search query preview */}
        <div className="bg-background/50 rounded-lg px-3 py-2 text-sm text-muted-foreground">
          <span className="text-foreground/60">搜索：</span>
          <span className="text-foreground font-medium">{query}</span>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
      </div>
    </div>
  );
}
