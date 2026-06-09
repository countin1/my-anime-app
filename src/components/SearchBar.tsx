import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAniList } from "@/lib/anilist";
import { formatScore } from "@/lib/utils";
import type { UnifiedAnime } from "@/types/unified";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (anime: UnifiedAnime) => void;
  mode?: "anime" | "novel";
}

export default function SearchBar({ value, onChange, onSelect, mode = "anime" }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<UnifiedAnime[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const debouncedValue = useDebounce(value, 200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === "novel") {
      setSuggestions([]);
      return;
    }

    if (!debouncedValue.trim() || debouncedValue.length < 2) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;
    setSuggestLoading(true);

    searchAniList(debouncedValue, 1)
      .then((r) => {
        if (!cancelled) {
          setSuggestions(r.items.slice(0, 5));
        }
      })
      .catch(() => { /* ignore */ })
      .finally(() => {
        if (!cancelled) setSuggestLoading(false);
      });

    return () => { cancelled = true; };
  }, [debouncedValue, mode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (anime: UnifiedAnime) => {
    if (onSelect) {
      onSelect(anime);
    } else {
      onChange(anime.title);
    }
    setFocused(false);
  };

  const showSuggestions = mode !== "novel" && focused && suggestions.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center group">
        <Search className="absolute left-3 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={mode === "novel" ? "搜索轻小说..." : "搜索动漫..."}
          className="pl-9 pr-9 w-full rounded-full bg-secondary/60 border-transparent focus:border-primary/40 focus:bg-secondary transition-all duration-300 h-9"
        />
        {value && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 size-7 hover:bg-transparent text-muted-foreground hover:text-foreground"
            onClick={() => { onChange(""); setSuggestions([]); }}
          >
            <X className="size-3.5" />
          </Button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-xl shadow-lg shadow-black/20 overflow-hidden z-50">
          {suggestions.map((anime) => (
            <button
              key={anime.id}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-primary/10 transition-colors text-left"
              onClick={() => handleSelect(anime)}
            >
              {anime.posterUrl ? (
                <img src={anime.posterUrl} alt="" className="w-8 h-11 object-cover rounded-md shrink-0" />
              ) : (
                <div className="w-8 h-11 bg-secondary rounded-md shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{anime.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {anime.titleEnglish || anime.titleRomaji}
                </p>
              </div>
              {anime.score && (
                <span className="text-xs text-yellow-500 shrink-0">
                  ★ {formatScore(anime.score)}
                </span>
              )}
            </button>
          ))}
          {suggestLoading && (
            <div className="px-3 py-2 text-xs text-muted-foreground">搜索中...</div>
          )}
        </div>
      )}
    </div>
  );
}
