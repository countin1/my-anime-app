import React from "react";
import { Home, Flame, Tv, BookOpen, ClipboardList, BookOpenCheck, Puzzle, BarChart3, Menu, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewType = "home" | "trending" | "seasonal" | "novels" | "workflows" | "study" | "skills" | "policy" | "aiagent";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: ViewType) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: "home", label: "首页", icon: Home, group: "anime" },
  { id: "trending", label: "热门", icon: Flame, group: "anime" },
  { id: "seasonal", label: "季番", icon: Tv, group: "anime" },
  { id: "novels", label: "轻小说", icon: BookOpen, group: "anime" },
  { id: "workflows", label: "工作流", icon: ClipboardList, group: "tools" },
  { id: "study", label: "学习", icon: BookOpenCheck, group: "tools" },
  { id: "skills", label: "Skills", icon: Puzzle, group: "tools" },
  { id: "policy", label: "政策", icon: BarChart3, group: "tools" },
  { id: "aiagent", label: "AI Agent", icon: Bot, group: "tools" },
];

export default function Sidebar({ currentView, onNavigate, collapsed, onToggle }: SidebarProps) {
  const animeItems = navItems.filter((i) => i.group === "anime");
  const toolItems = navItems.filter((i) => i.group === "tools");

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 glass-morphism h-14 flex items-center px-4">
        <Button variant="ghost" size="icon" onClick={onToggle} className="text-foreground">
          {collapsed ? <Menu className="size-5" /> : <X className="size-5" />}
        </Button>
        <div className="flex items-center gap-2 ml-3">
          <div className="size-7 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Tv className="size-3.5 text-white" />
          </div>
          <span className="text-base font-bold gradient-text">动漫流</span>
        </div>
      </div>

      {/* Mobile overlay */}
      {!collapsed && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60" onClick={onToggle} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen glass-morphism border-r border-white/5 flex flex-col transition-all duration-300 ${
          collapsed ? "w-0 md:w-16" : "w-56"
        } ${collapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-white/5 ${collapsed ? "justify-center px-2" : "px-4 gap-3"}`}>
          <div className="size-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
            <Tv className="size-4 text-white" />
          </div>
          {!collapsed && <span className="text-lg font-bold gradient-text">动漫流</span>}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {/* Anime section */}
          {!collapsed && (
            <p className="px-4 text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider mb-2">动漫</p>
          )}
          {animeItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id as ViewType); if (window.innerWidth < 768) onToggle(); }}
                className={`w-full flex items-center gap-3 transition-all duration-200 ${
                  collapsed ? "justify-center px-2 py-3" : "px-4 py-2.5"
                } ${
                  isActive
                    ? "bg-primary/15 text-primary border-r-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="size-5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}

          {/* Divider */}
          <div className="my-3 mx-4 border-t border-white/5" />

          {/* Tools section */}
          {!collapsed && (
            <p className="px-4 text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider mb-2">工具</p>
          )}
          {toolItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id as ViewType); if (window.innerWidth < 768) onToggle(); }}
                className={`w-full flex items-center gap-3 transition-all duration-200 ${
                  collapsed ? "justify-center px-2 py-3" : "px-4 py-2.5"
                } ${
                  isActive
                    ? "bg-primary/15 text-primary border-r-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="size-5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden md:flex border-t border-white/5 p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </aside>
    </>
  );
}
