import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Puzzle,
  RefreshCw,
  FolderOpen,
  ExternalLink,
  Search,
  CheckCircle,
  Clock,
  Star,
  Github,
  Zap,
} from "lucide-react";

interface SkillInfo {
  name: string;
  description: string;
  version: string;
  path: string;
  stars?: string;
  github?: string;
  isNew?: boolean;
}

// Pre-defined skill metadata (from the video's 15 skills + local skills)
const SKILL_META: Record<string, { description: string; category: string; icon: string; stars?: string; github?: string; isNew?: boolean }> = {
  // === 🆕 GitHub 热门 AI 工具 (视频推荐) ===
  "andrej-karpathy-skills": { description: "Karpathy Skills — 一个 CLAUDE.md 文件定义 AI 工作说明书，无需复杂配置，让 AI 按你的方式写代码", category: "GitHub 热门", icon: "🧠", stars: "173k", github: "multica-ai/andrej-karpathy-skills", isNew: true },
  "codegraph": { description: "CodeGraph — 构建代码知识图谱，将项目整理成地图，帮助 AI 快速理解结构，节省 Token", category: "GitHub 热门", icon: "🗺️", stars: "47k", github: "colbymchenry/codegraph", isNew: true },
  "understand-anything": { description: "Understand Anything — 代码库导航仪，生成代码地图，展示调用关系和模块职责，支持 20+ 平台", category: "GitHub 热门", icon: "🧭", stars: "57k", github: "Egonex-AI/Understand-Anything", isNew: true },
  "presenton": { description: "Presenton — 开源版 Gamma，一句话生成专业 PPT，提供 API 可接入自动化工作流", category: "GitHub 热门", icon: "📊", stars: "8k", github: "presenton/presenton", isNew: true },
  "nvidia-longlive": { description: "NVIDIA LongLive — NVFP4 量化技术实现实时长视频生成，压缩/并行推理/质量平衡", category: "GitHub 热门", icon: "🎬", stars: "2.2k", github: "NVlabs/LongLive", isNew: true },
  "claude-plugins-official": { description: "Claude Plugins — 官方插件生态，连续霸榜 GitHub，直接嵌入工作流程", category: "GitHub 热门", icon: "🔌", stars: "29k", github: "anthropics/claude-plugins-official", isNew: true },

  // === 📂 Skills 合集仓库 ===
  "awesome-claude-code": { description: "Awesome Claude Code — 46k 星精选资源、skills、hooks、slash-commands、orchestrators", category: "Skills 合集", icon: "⭐", stars: "46k", github: "hesreallyhim/awesome-claude-code" },
  "antigravity-awesome-skills": { description: "Antigravity — 1,527+ 可安装 agentic skills，覆盖开发/测试/安全/DevOps/产品", category: "Skills 合集", icon: "🌌", stars: "40k", github: "sickn33/antigravity-awesome-skills" },
  "awesome-agent-skills": { description: "Awesome Agent Skills — 1000+ agent skills 合集，兼容多种 AI 编程工具", category: "Skills 合集", icon: "🤖", stars: "25k", github: "VoltAgent/awesome-agent-skills" },

  // === 🎯 我的项目 ===
  "my-anime-app": { description: "动漫流 — Electron + React 桌面应用，动漫浏览/观看/轻小说/AI 学习一体化", category: "我的项目", icon: "🎌" },
  "scaling-potato": { description: "Scaling Potato — AI 工具合集：数据分析Agent / 大模型评测 / RAG知识库", category: "我的项目", icon: "🥔", github: "countin1/scaling-potato" },
  "prompt-optimizer": { description: "Prompt 自动优化 — 网格搜索 + 贝叶斯优化找最优模板，统计题提升 15%", category: "我的项目", icon: "🎯", github: "countin1/scaling-potato" },
  "finetune-lora": { description: "LoRA 微调 — Qwen2.5/LLaMA3 微调 + QLoRA 4bit 量化 + 超参搜索", category: "我的项目", icon: "🔧", github: "countin1/scaling-potato" },

  // === 进化类 ===
  "self-improving-agent": { description: "AI 记住错误不再重犯，越用越聪明", category: "进化类", icon: "🧬" },
  "proactive-agent": { description: "AI 从被动变主动，支持定时任务", category: "进化类", icon: "🧬" },

  // === 开发必备 ===
  "github": { description: "Claude 直接操作 GitHub 全流程", category: "开发必备", icon: "💻" },
  "superpowers": { description: "强制 TDD 开发流程", category: "开发必备", icon: "💻" },
  "waza": { description: "轻量路线，适合个人开发者", category: "开发必备", icon: "💻" },

  // === 信息获取 ===
  "multi-search-engine": { description: "多引擎聚合搜索", category: "信息获取", icon: "🔍" },
  "peng-agent-browser": { description: "AI 操控浏览器", category: "信息获取", icon: "🔍" },
  "smart-summarize": { description: "网页/PDF/音频/视频多格式总结", category: "信息获取", icon: "🔍" },

  // === 效率办公 ===
  "gog": { description: "Google 全家桶自动化", category: "效率办公", icon: "📊" },
  "notion": { description: "打通 Notion 笔记", category: "效率办公", icon: "📊" },
  "obsidian": { description: "打通 Obsidian 笔记", category: "效率办公", icon: "📊" },

  // === 安全维护 ===
  "skill-vetter": { description: "安装新 Skill 前先做安全检查", category: "安全维护", icon: "🔒" },
  "auto-updater": { description: "自动更新已装 Skills", category: "安全维护", icon: "🔒" },

  // === 蒸馏类 ===
  "colleague-skill": { description: "把对话记录蒸馏成 AI", category: "蒸馏类", icon: "🧪" },
  "bazi-pan-skill": { description: "八字排盘命理工具", category: "蒸馏类", icon: "🧪" },

  // === 本地 ===
  "gstack": { description: "本地工具集", category: "本地", icon: "📦" },
  "pptx": { description: "PPT 生成工具", category: "本地", icon: "📦" },
};

const CATEGORIES = ["GitHub 热门", "Skills 合集", "我的项目", "进化类", "开发必备", "信息获取", "效率办公", "安全维护", "蒸馏类", "本地"];

export default function SkillManager() {
  const [skills, setSkills] = useState<SkillInfo[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = () => {
    // In Electron, we can't directly access the filesystem from renderer
    // Show the pre-defined skills list
    const skillList: SkillInfo[] = Object.entries(SKILL_META).map(([name, meta]) => ({
      name,
      description: meta.description,
      version: "installed",
      path: `~/.claude/skills/${name}`,
    }));
    setSkills(skillList);
  };

  const openSkillsFolder = async () => {
    const homeDir = await window.electron?.getHomeDir?.();
    if (homeDir) {
      window.electron?.openExternal?.(`file:///${homeDir}/skills`);
    }
  };

  const openClawHub = () => {
    window.electron?.openExternal?.("https://clawhub.ai/skills");
  };

  const openGitHub = (repo: string) => {
    window.electron?.openExternal?.(`https://github.com/${repo}`);
  };

  const filtered = skills.filter((s) => {
    if (filter && (SKILL_META[s.name]?.category || "其他") !== filter) return false;
    if (searchQuery && !s.name.includes(searchQuery.toLowerCase()) && !s.description.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="size-5 text-amber-400" />
            Claude Code Skills
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            已安装 {skills.length} 个 Skills · 6 个 GitHub 热门工具 · 3 个 Skills 合集 · 1 个项目
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={openClawHub} className="gap-1.5">
            <ExternalLink className="size-3.5" />
            ClawHub
          </Button>
          <Button variant="outline" size="sm" onClick={openSkillsFolder} className="gap-1.5">
            <FolderOpen className="size-3.5" />
            打开目录
          </Button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索 Skills..."
            className="w-full h-9 rounded-lg bg-secondary/60 border border-transparent focus:border-primary/40 pl-9 pr-3 text-sm outline-none"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
              !filter ? "bg-primary/20 text-primary" : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            全部
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(filter === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                filter === cat ? "bg-primary/20 text-primary" : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((skill) => {
          const meta = SKILL_META[skill.name];
          return (
            <div
              key={skill.name}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${
                meta?.isNew
                  ? "bg-primary/5 border-primary/20 hover:border-primary/40"
                  : "bg-secondary/30 border-white/5 hover:border-primary/30"
              }`}
            >
              <div className={`size-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                meta?.isNew ? "bg-primary/15" : "bg-primary/10"
              }`}>
                {meta?.icon || "📦"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium truncate">{skill.name}</h3>
                  {meta?.isNew ? (
                    <Badge className="text-[9px] px-1.5 py-0 bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white">
                      NEW
                    </Badge>
                  ) : (
                    <CheckCircle className="size-3 text-green-400 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {meta?.description || skill.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {meta?.category && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {meta.category}
                    </Badge>
                  )}
                  {meta?.stars && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-400">
                      <Star className="size-2.5 fill-amber-400" />
                      {meta.stars}
                    </span>
                  )}
                  {meta?.github && (
                    <button
                      onClick={() => openGitHub(meta.github!)}
                      className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="size-2.5" />
                      GitHub
                    </button>
                  )}
                  {!meta?.github && (
                    <span className="text-[10px] text-muted-foreground/50">{skill.version}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Puzzle className="size-8 mx-auto mb-2 opacity-30" />
          <p className="text-sm">没有找到匹配的 Skills</p>
        </div>
      )}
    </div>
  );
}
