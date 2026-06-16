import { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import HeroBanner from "./HeroBanner";
import AnimeGrid from "./AnimeGrid";
import AnimeDetail from "./AnimeDetail";
import SearchBar from "./SearchBar";
import NovelCard from "./NovelCard";
import WorkflowHub from "./WorkflowHub";
import CETStudy from "./CETStudy";
import SkillManager from "./SkillManager";
import PolicyHub from "./PolicyHub/index";
import AIAgentGuide from "./AIAgentGuide/index";
import AILearning from "./AILearning/index";
import { useTopAnime, useSeasonalAnime, useTrendingAnime, useAnimeSearch, useAnimeDetail } from "@/hooks/use-anime";
import { useNovelSearch } from "@/hooks/use-novel";
import { NOVEL_SOURCES } from "@/lib/novel-sources";
import type { UnifiedAnime } from "@/types/unified";

type ViewType = "home" | "trending" | "seasonal" | "novels" | "workflows" | "study" | "skills" | "policy" | "aiagent" | "learning";

export default function App() {
  const [view, setView] = useState<ViewType>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnime, setSelectedAnime] = useState<UnifiedAnime | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const top = useTopAnime();
  const seasonal = useSeasonalAnime();
  const trending = useTrendingAnime(view === "trending");
  const search = useAnimeSearch(searchQuery);
  const detail = useAnimeDetail(selectedAnime?.malId ?? null, selectedAnime?.titleRomaji || selectedAnime?.titleEnglish || selectedAnime?.title);
  const novelSearch = useNovelSearch(searchQuery);

  const isSearching = searchQuery.trim().length > 0;
  const isAnimeView = view === "home" || view === "trending" || view === "seasonal";

  const handleSelect = useCallback((anime: UnifiedAnime) => {
    setSelectedAnime(anime);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedAnime(null);
  }, []);

  const handleNavigate = useCallback((v: ViewType) => {
    setView(v);
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        currentView={view}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main
        className={`transition-all duration-300 pt-14 md:pt-0 ${
          sidebarCollapsed ? "md:ml-16" : "md:ml-56"
        }`}
      >
        {/* Search bar (only for anime views + novels) */}
        {(isAnimeView || view === "novels") && (
          <div className="sticky top-14 md:top-0 z-30 glass-morphism px-4 md:px-6 py-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSelect={handleSelect} mode={view === "novels" ? "novel" : "anime"} />
          </div>
        )}

        <div className="px-4 md:px-6 pb-10 space-y-8 overflow-y-auto h-[calc(100vh-64px)]">
          {view === "workflows" ? (
            <WorkflowHub />
          ) : view === "study" ? (
            <CETStudy />
          ) : view === "skills" ? (
            <SkillManager />
          ) : view === "policy" ? (
            <PolicyHub />
          ) : view === "aiagent" ? (
            <AIAgentGuide />
          ) : view === "learning" ? (
            <AILearning />
          ) : view === "novels" ? (
            /* 轻小说视图 */
            isSearching ? (
              <section className="space-y-4">
                <h2 className="text-xl font-bold">搜索轻小说："{searchQuery}"</h2>
                <p className="text-sm text-muted-foreground">选择一个源搜索阅读</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {novelSearch.links.map((link, i) => (
                    <NovelCard
                      key={link.source.name}
                      source={link.source}
                      searchUrl={link.url}
                      query={searchQuery}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <section className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">轻小说</h2>
                  <p className="text-sm text-muted-foreground mt-1">搜索并阅读你喜欢的轻小说</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {NOVEL_SOURCES.map((source, i) => (
                    <NovelCard
                      key={source.name}
                      source={source}
                      searchUrl={source.baseUrl}
                      query="浏览首页"
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )
          ) : isSearching ? (
            <AnimeGrid
              title={`搜索: "${searchQuery}"`}
              anime={search.results}
              loading={search.loading}
              error={search.error}
              onSelect={handleSelect}
            />
          ) : view === "home" ? (
            <>
              <HeroBanner anime={top.anime.slice(0, 5)} onSelect={handleSelect} />
              <AnimeGrid
                title="正在热播"
                anime={seasonal.anime}
                loading={seasonal.loading}
                error={seasonal.error}
                onSelect={handleSelect}
                onLoadMore={seasonal.loadMore}
                hasMore={seasonal.hasMore}
                horizontal
              />
              <AnimeGrid
                title="高分动漫"
                anime={top.anime}
                loading={top.loading}
                error={top.error}
                onSelect={handleSelect}
                onLoadMore={top.loadMore}
                hasMore={top.hasMore}
              />
            </>
          ) : view === "trending" ? (
            <AnimeGrid
              title="当前热门"
              anime={trending.anime}
              loading={trending.loading}
              error={trending.error}
              onSelect={handleSelect}
              onLoadMore={trending.loadMore}
              hasMore={trending.hasMore}
            />
          ) : (
            <AnimeGrid
              title="本季新番"
              anime={seasonal.anime}
              loading={seasonal.loading}
              error={seasonal.error}
              onSelect={handleSelect}
              onLoadMore={seasonal.loadMore}
              hasMore={seasonal.hasMore}
            />
          )}
        </div>
      </main>

      <AnimeDetail
        anime={selectedAnime}
        detail={detail.anime}
        episodes={detail.episodes}
        loading={detail.loading}
        open={!!selectedAnime}
        onClose={handleClose}
      />
    </div>
  );
}
