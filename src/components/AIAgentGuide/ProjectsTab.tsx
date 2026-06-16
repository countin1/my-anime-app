import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { PROJECTS } from "./data";

export function ProjectsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">实战项目推荐</h3>
        <Badge variant="outline" className="text-xs">6个项目</Badge>
      </div>

      {PROJECTS.map((project, i) => (
        <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold">{project.name}</h4>
            <div className="flex items-center gap-1.5">
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  project.difficulty === "初级"
                    ? "text-green-400 border-green-400/30"
                    : project.difficulty === "中级"
                    ? "text-yellow-400 border-yellow-400/30"
                    : "text-red-400 border-red-400/30"
                }`}
              >
                {project.difficulty}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                <Clock className="size-2.5 mr-1" />
                {project.duration}
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{project.desc}</p>

          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-muted-foreground">技术栈：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.tech.map((t, j) => (
                  <Badge key={j} variant="secondary" className="text-[10px] px-1.5 py-0">{t}</Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-muted-foreground">实现步骤：</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.steps.map((s, j) => (
                  <span key={j} className="text-[10px] text-muted-foreground">
                    {j + 1}. {s}
                    {j < project.steps.length - 1 && " →"}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
