import { useState } from "react";
import {
  Sparkles, BookOpen, Code, Search, Cpu, Rocket,
  CheckCircle2, Lock, Unlock, ChevronDown, ChevronRight,
  Copy, Check, Zap, Trophy, Target, Star,
  Calendar, ExternalLink, GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ========== 导入数据 ==========
import { SKILL_TREE, PROMPT_TEMPLATES, INTERVIEW_SCRIPTS, LEARNING_PLAN } from "./data";

// ========== 导入子组件 ==========
import { SkillCard } from "./SkillCard";
import { PromptCard } from "./PromptCard";
import { InterviewCard } from "./InterviewCard";

// ========== LearningDayCard 组件 ==========

function LearningDayCard({ day, stageColor }: { day: typeof LEARNING_PLAN[0]["days"][0]; stageColor: string }) {
  const [expanded, setExpanded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});

  const toggleTask = (idx: number) => {
    setCheckedTasks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const totalTasks = day.tasks.length;
  const progress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  const statusConfig = {
    available: { icon: Unlock, color: "text-green-400", badge: "bg-green-500/20 text-green-400", label: "可学习" },
    locked: { icon: Lock, color: "text-gray-500", badge: "bg-gray-500/20 text-gray-400", label: "需解锁" },
    completed: { icon: CheckCircle2, color: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-400", label: "已完成" },
  };
  const config = statusConfig[day.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`size-10 rounded-xl bg-gradient-to-br ${stageColor} flex items-center justify-center`}>
            <Icon className={`size-5 ${config.color}`} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary">{day.day}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${config.badge}`}>{config.label}</span>
            </div>
            <h3 className="font-bold text-sm">{day.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {completedCount > 0 && (
            <span className="text-xs text-muted-foreground">{completedCount}/{totalTasks}</span>
          )}
          {expanded ? <ChevronDown className="size-5 text-muted-foreground" /> : <ChevronRight className="size-5 text-muted-foreground" />}
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* 进度条 */}
          {totalTasks > 0 && (
            <div className="rounded-full bg-white/10 h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${stageColor} transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* 任务清单 */}
          <div className="space-y-2">
            {day.tasks.map((task, idx) => (
              <label key={idx} className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={!!checkedTasks[idx]}
                  onChange={() => toggleTask(idx)}
                  className="mt-1 rounded border-white/20 bg-white/10"
                />
                <span className={`text-sm ${checkedTasks[idx] ? "line-through text-muted-foreground" : "text-foreground"} group-hover:text-primary transition-colors`}>
                  {task}
                </span>
              </label>
            ))}
          </div>

          {/* 运行命令 */}
          {day.command && (
            <div className="bg-black/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-muted-foreground uppercase">运行命令</span>
                <Button
                  variant="ghost" size="sm"
                  onClick={() => navigator.clipboard.writeText(day.command)}
                  className="h-5 px-1.5 text-[10px]"
                >
                  <Copy className="size-2.5 mr-1" /> 复制
                </Button>
              </div>
              <code className="text-xs text-green-300 font-mono break-all">{day.command}</code>
            </div>
          )}

          {/* 面试话术 */}
          {day.interview && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Trophy className="size-3 text-yellow-400" />
                <span className="text-[10px] font-bold text-yellow-400">面试话术</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{day.interview}</p>
              <Button
                variant="ghost" size="sm"
                onClick={() => navigator.clipboard.writeText(day.interview)}
                className="mt-1 h-5 px-1.5 text-[10px]"
              >
                <Copy className="size-2.5 mr-1" /> 复制
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ========== 主组件 ==========

export default function AILearning() {
  const [activeTab, setActiveTab] = useState<"skills" | "prompts" | "interview" | "plan">("skills");

  // 统计
  const totalSkills = SKILL_TREE.reduce((acc, s) => acc + s.skills.length, 0);
  const masteredSkills = SKILL_TREE.reduce((acc, s) => acc + s.skills.filter(sk => sk.status === "mastered").length, 0);
  const totalXP = SKILL_TREE.reduce((acc, s) => acc + s.skills.filter(sk => sk.status === "mastered").reduce((a, sk) => a + sk.xp, 0), 0);
  const maxXP = SKILL_TREE.reduce((acc, s) => acc + s.skills.reduce((a, sk) => a + sk.xp, 0), 0);
  const level = Math.floor(totalXP / 500) + 1;

  const tabs = [
    { id: "skills" as const, label: "技能树", icon: Zap },
    { id: "plan" as const, label: "学习计划", icon: Calendar },
    { id: "prompts" as const, label: "Prompt 模板", icon: Code },
    { id: "interview" as const, label: "面试话术", icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="size-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold gradient-text">AI 技能树</h1>
          <p className="text-sm text-muted-foreground">从经济统计学出发，征服 AI 工程师之路</p>
        </div>
      </div>

      {/* 状态卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <Trophy className="size-6 mx-auto mb-1 text-yellow-400" />
          <div className="text-2xl font-bold">Lv.{level}</div>
          <div className="text-xs text-muted-foreground">当前等级</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <Star className="size-6 mx-auto mb-1 text-purple-400" />
          <div className="text-2xl font-bold">{totalXP}</div>
          <div className="text-xs text-muted-foreground">经验值</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <CheckCircle2 className="size-6 mx-auto mb-1 text-cyan-400" />
          <div className="text-2xl font-bold">{masteredSkills}/{totalSkills}</div>
          <div className="text-xs text-muted-foreground">已掌握</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <Target className="size-6 mx-auto mb-1 text-orange-400" />
          <div className="text-2xl font-bold">{Math.round(masteredSkills / totalSkills * 100)}%</div>
          <div className="text-xs text-muted-foreground">完成度</div>
        </div>
      </div>

      {/* 经验条 */}
      <div className="rounded-full bg-white/10 h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${(totalXP / maxXP) * 100}%` }}
        />
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 学习计划 */}
      {activeTab === "plan" && (
        <div className="space-y-6">
          {/* 概览 */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Rocket className="size-6 text-primary" />
              <div>
                <h2 className="font-bold">4 周冲刺计划</h2>
                <p className="text-xs text-muted-foreground">Prompt 优化 + LoRA 微调，面试能讲的两个高含金量方向</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-400">Week 1-2</div>
                <div className="text-xs text-muted-foreground">Prompt 工程评测</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-orange-400">Week 3-4</div>
                <div className="text-xs text-muted-foreground">LoRA/QLoRA 微调</div>
              </div>
            </div>
          </div>

          {/* GitHub 链接 */}
          <a
            href="https://github.com/countin1/scaling-potato/tree/main/project-B-model-benchmark"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all group"
          >
            <GitBranch className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="flex-1">
              <span className="text-sm font-medium">scaling-potato/project-B-model-benchmark</span>
              <p className="text-xs text-muted-foreground">所有脚本都在这个仓库里</p>
            </div>
            <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </a>

          {/* 每周计划 */}
          {LEARNING_PLAN.map((week, idx) => {
            const Icon = week.icon === "Sparkles" ? Sparkles : week.icon === "Cpu" ? Cpu : week.icon === "Search" ? Search : Trophy;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`size-10 rounded-xl bg-gradient-to-br ${week.color} flex items-center justify-center`}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">{week.week}</span>
                    </div>
                    <h2 className="text-lg font-bold">{week.title}</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {week.days.map((day, dIdx) => (
                    <LearningDayCard key={dIdx} day={day} stageColor={week.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 技能树 */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {SKILL_TREE.map((stage, idx) => {
            const Icon = stage.icon === "Sparkles" ? Sparkles : stage.icon === "Search" ? Search : stage.icon === "Cpu" ? Cpu : Rocket;
            const mastered = stage.skills.filter(s => s.status === "mastered").length;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`size-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{stage.stage}</h2>
                    <p className="text-xs text-muted-foreground">{mastered}/{stage.skills.length} 已掌握</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {stage.skills.map((skill, sIdx) => (
                    <SkillCard key={sIdx} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prompt 模板库 */}
      {activeTab === "prompts" && (
        <div className="space-y-6">
          {PROMPT_TEMPLATES.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-bold mb-3">{category.icon} {category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.templates.map((template, tIdx) => (
                  <PromptCard key={tIdx} template={template} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 面试话术 */}
      {activeTab === "interview" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">点击展开查看话术，复制即可用于面试</p>
          {INTERVIEW_SCRIPTS.map((script, idx) => (
            <InterviewCard key={idx} script={script} />
          ))}
        </div>
      )}
    </div>
  );
}
