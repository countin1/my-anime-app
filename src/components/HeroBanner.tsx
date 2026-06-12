import { useState, useEffect } from "react";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatScore } from "@/lib/utils";
import type { UnifiedAnime } from "@/types/unified";

interface HeroBannerProps {
  anime: UnifiedAnime[];
  onSelect: (anime: UnifiedAnime) => void;
}

export default function HeroBanner({ anime, onSelect }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const featured = anime.slice(0, 5);

  useEffect(() => {
    if (featured.length <= 1) return;
    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % featured.length);
      }, 6000);
    };
    const stop = () => clearInterval(timer);
    const onVisibility = () => {
      if (document.hidden) stop(); else start();
    };
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [featured.length]);

  if (featured.length === 0) return null;

  const go = (dir: number) => {
    setCurrent((prev) => (prev + dir + featured.length) % featured.length);
  };

  const a = featured[current];

  const scoreDisplay = formatScore(a.score);

  return (
    <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden group">
      {/* Background image */}
      <div className="absolute inset-0">
        {featured.map((item, i) => (
          <img
            key={item.id}
            src={item.bannerUrl || item.posterUrl}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <div className="max-w-xl space-y-3 animate-slide-fade" key={a.id}>
          <div className="flex items-center gap-2 flex-wrap">
            {scoreDisplay && (
              <Badge className="bg-primary/90 text-primary-foreground gap-1">
                <Star className="size-3 fill-current" />
                {scoreDisplay}
              </Badge>
            )}
            {a.genres.slice(0, 3).map((g) => (
              <Badge key={g} variant="secondary" className="text-xs">
                {g}
              </Badge>
            ))}
            {a.type && a.type !== "Unknown" && (
              <Badge variant="outline" className="text-xs border-white/20">
                {a.type}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight line-clamp-2">
            {a.title}
          </h1>

          {a.synopsis && (
            <p className="text-sm text-foreground/70 line-clamp-2 max-w-lg leading-relaxed">
              {a.synopsis}
            </p>
          )}

          <Button
            className="rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground mt-2"
            onClick={() => onSelect(a)}
          >
            <Play className="size-4 fill-current" />
            立即观看
          </Button>
        </div>
      </div>

      {/* Nav arrows */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={() => go(-1)}
          aria-label="上一张"
        >
          <ChevronLeft className="size-5" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm"
          onClick={() => go(1)}
          aria-label="下一张"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-6 flex gap-1.5">
        {featured.map((_, i) => (
          <button
            key={i}
            className={`size-1.5 rounded-full transition-all ${
              i === current ? "bg-primary w-5" : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => setCurrent(i)}
            aria-label={`跳转到第 ${i + 1} 张`}
          />
        ))}
      </div>
    </div>
  );
}
