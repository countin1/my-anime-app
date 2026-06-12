import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Calendar,
  Film,
  Clock,
  Tv,
  Play,
  Sparkles,
  MonitorPlay,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { STREAM_SOURCES } from "@/lib/sources";
import { formatScore } from "@/lib/utils";
import type { UnifiedAnime } from "@/types/unified";
import type { JikanAnimeFull, JikanEpisode } from "@/types/anime";

interface AnimeDetailProps {
  anime: UnifiedAnime | null;
  detail: JikanAnimeFull | null;
  episodes: JikanEpisode[];
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

export default function AnimeDetail({ anime, detail, episodes, loading, open, onClose }: AnimeDetailProps) {
  const [activeTab, setActiveTab] = useState("watch");
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  if (!anime) return null;

  const poster = anime.posterUrl || (detail?.images?.jpg?.large_image_url ?? "");
  const banner = anime.bannerUrl || null;
  const hasTrailer = !!(detail?.trailer?.youtube_id || anime.trailer?.youtubeId);
  const synopsis = anime.synopsis || detail?.synopsis || "";
  const title = anime.title || "未知标题";
  const titleNative = anime.titleNative || detail?.title_japanese || "";
  const score = anime.score ?? detail?.score ?? null;
  const episodesCount = anime.episodes ?? detail?.episodes ?? null;
  const type = anime.type || detail?.type || null;
  const duration = anime.duration || detail?.duration || null;
  const status = anime.status || detail?.status || null;
  const genres: string[] = anime.genres?.length ? anime.genres : (detail?.genres?.map((g) => g.name) || []);
  const studios: string[] = anime.studios?.length ? anime.studios : (detail?.studios?.map((s) => s.name) || []);
  const rank = detail?.rank ?? null;
  const scoredBy = detail?.scored_by ?? null;

  const getSearchTitle = (): string => {
    try {
      if (detail?.title_english) return detail.title_english;
      if (anime.titleEnglish) return anime.titleEnglish;
      if (anime.titleRomaji) return anime.titleRomaji;
      return title;
    } catch {
      return title;
    }
  };

  const scoreDisplay = formatScore(score);

  const openSource = (url: string) => {
    window.electron?.openExternal?.(url) ?? window.open(url, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-card border-border/50 flex flex-col">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Banner */}
        {banner && (
          <div className="relative h-44 md:h-56 shrink-0 overflow-hidden">
            <img src={banner} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className={`p-5 md:p-6 ${banner ? "-mt-24 relative z-10" : ""}`}>
            {/* Poster + Info row */}
            <div className="flex gap-5 mb-5">
              {/* Poster */}
              <div className="shrink-0 w-32 md:w-40">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl shadow-black/40">
                  {poster ? (
                    <img src={poster} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-secondary flex items-center justify-center">
                      <span className="text-4xl opacity-30">🎬</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 space-y-2.5 pt-1">
                <h2 className="text-xl md:text-2xl font-bold leading-tight text-white drop-shadow-md">
                  {title}
                </h2>
                {titleNative && titleNative !== title && (
                  <p className="text-sm text-muted-foreground">{titleNative}</p>
                )}

                {/* Score */}
                <div className="flex flex-wrap items-center gap-2">
                  {scoreDisplay && (
                    <div className="flex items-center gap-1.5 bg-primary/15 text-primary px-2.5 py-1 rounded-lg">
                      <Star className="size-3.5 fill-primary" />
                      <span className="font-bold">{scoreDisplay}</span>
                      {scoredBy && (
                        <span className="text-xs text-muted-foreground">({(scoredBy / 1000).toFixed(0)}K)</span>
                      )}
                    </div>
                  )}
                  {rank && (
                    <Badge variant="secondary" className="gap-1 text-xs">
                      <Sparkles className="size-3" />
                      #{rank}
                    </Badge>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1.5">
                  {genres.map((g) => (
                    <Badge key={g} variant="secondary" className="text-[11px] px-2 py-0">{g}</Badge>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  {type && type !== "Unknown" && (
                    <span className="flex items-center gap-1"><Film className="size-3" />{type}</span>
                  )}
                  {episodesCount && (
                    <span className="flex items-center gap-1"><Tv className="size-3" />{episodesCount}集</span>
                  )}
                  {duration && (
                    <span className="flex items-center gap-1"><Clock className="size-3" />{duration}</span>
                  )}
                  {status && (
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {status === "airing" ? "连载中" : status === "complete" ? "已完结" : status === "upcoming" ? "即将开播" : status}
                    </span>
                  )}
                </div>

                {studios.length > 0 && (
                  <p className="text-xs text-muted-foreground">{studios.join(", ")}</p>
                )}
              </div>
            </div>

            {/* Synopsis */}
            {synopsis && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold mb-1">简介</h3>
                <p className={`text-sm text-muted-foreground leading-relaxed ${synopsisExpanded ? "" : "line-clamp-3"}`}>
                  {synopsis}
                </p>
                {synopsis.length > 150 && (
                  <button
                    onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                    className="text-xs text-primary hover:text-primary/80 mt-1 flex items-center gap-0.5"
                  >
                    {synopsisExpanded ? "收起" : "展开全部"}
                    <ChevronDown className={`size-3 transition-transform ${synopsisExpanded ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
            )}

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-secondary/60 mb-4">
                <TabsTrigger value="watch" className="gap-1.5">
                  <MonitorPlay className="size-3.5" />
                  观看
                </TabsTrigger>
                {hasTrailer && (
                  <TabsTrigger value="trailer" className="gap-1.5">
                    <Play className="size-3.5" />
                    预告片
                  </TabsTrigger>
                )}
                <TabsTrigger value="episodes" className="gap-1.5">
                  <Tv className="size-3.5" />
                  剧集
                </TabsTrigger>
              </TabsList>

              {/* Watch Tab */}
              <TabsContent value="watch">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    选择一个源观看 <span className="text-foreground font-medium">{title}</span>:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STREAM_SOURCES.map((source) => (
                      <Button
                        key={source.name}
                        variant="outline"
                        className="justify-start gap-3 h-auto py-3 border-border/50 hover:border-primary/50 hover:bg-primary/5"
                        onClick={() => openSource(source.getEmbedUrl(source.preferChinese ? title : getSearchTitle()))}
                      >
                        <span className="text-lg">{source.icon}</span>
                        <div className="text-left">
                          <div className="font-medium text-sm">{source.name}</div>
                          <div className="text-xs text-muted-foreground">点击在浏览器中打开</div>
                        </div>
                        <ExternalLink className="size-3.5 ml-auto text-muted-foreground" />
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Trailer Tab */}
              {hasTrailer && (
                <TabsContent value="trailer">
                  {loading ? (
                    <Skeleton className="aspect-video rounded-xl" />
                  ) : (
                    <VideoPlayer
                      youtubeId={detail?.trailer?.youtube_id || anime.trailer?.youtubeId || undefined}
                      embedUrl={detail?.trailer?.embed_url || undefined}
                      title={title}
                    />
                  )}
                </TabsContent>
              )}

              {/* Episodes Tab */}
              <TabsContent value="episodes">
                {loading ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 rounded-lg" />
                    ))}
                  </div>
                ) : episodes.length > 0 ? (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {episodes.map((ep) => (
                      <div
                        key={ep.mal_id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="size-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">{ep.mal_id}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{ep.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {ep.aired && <span>{new Date(ep.aired).toLocaleDateString()}</span>}
                            {ep.score && (
                              <span className="flex items-center gap-0.5">
                                <Star className="size-2.5 fill-yellow-500 text-yellow-500" />
                                {ep.score}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {ep.filler && (
                            <Badge variant="outline" className="text-[10px] border-orange-500/40 text-orange-400">填充集</Badge>
                          )}
                          {ep.recap && (
                            <Badge variant="outline" className="text-[10px] border-blue-500/40 text-blue-400">回顾集</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">暂无剧集信息</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
