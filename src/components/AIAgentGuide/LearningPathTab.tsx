import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Bot, Brain, Rocket, Server,
  ChevronDown, ChevronRight, ExternalLink, Clock, CheckCircle2,
} from "lucide-react";
import { LEARNING_PATH } from "./data";

const ICONS: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen className="size-5" />,
  Bot: <Bot className="size-5" />,
  Brain: <Brain className="size-5" />,
  Rocket: <Rocket className="size-5" />,
  Server: <Server className="size-5" />,
};

export function LearningPathTab() {
  const [expandedStage, setExpandedStage] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">5阶段学习路线</h3>
        <Badge variant="outline" className="text-xs">总计 6-12个月</Badge>
      </div>

      {LEARNING_PATH.map((stage, i) => (
        <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden">
          <button
            onClick={() => setExpandedStage(expandedStage === i ? null : i)}
            className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
          >
            <div className={`size-12 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shrink-0`}>
              {ICONS[stage.icon]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{stage.stage}</span>
                <h4 className="text-sm font-bold">{stage.title}</h4>
                <Badge variant="outline" className="text-[10px]">
                  <Clock className="size-3 mr-1" />
                  {stage.duration}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">目标：{stage.goal}</p>
            </div>
            {expandedStage === i ? (
              <ChevronDown className="size-4 text-muted-foreground shrink-0" />
            ) : (
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            )}
          </button>

          {expandedStage === i && (
            <div className="px-4 pb-4 animate-fade-in-up space-y-4">
              {stage.skills.map((skill, j) => (
                <div key={j} className="rounded-lg bg-background/50 p-3">
                  <h5 className="text-xs font-bold text-foreground mb-2">{skill.name}</h5>
                  <div className="space-y-1 mb-2">
                    {skill.items.map((item, k) => (
                      <div key={k} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="size-3 text-green-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.resources.map((res, k) => (
                      <a
                        key={k}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="size-2.5" />
                        {res.name}
                        <Badge variant="outline" className="text-[8px] px-1 py-0 ml-1">{res.type}</Badge>
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                <div className="flex items-center gap-2 text-xs">
                  <Rocket className="size-3.5 text-primary" />
                  <span className="font-bold text-foreground">实战项目：</span>
                  <span className="text-muted-foreground">{stage.project}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
