import { Badge } from "@/components/ui/badge";
import {
  Workflow, Database, Cpu, Target, Zap, Code, ExternalLink,
} from "lucide-react";
import { TECH_STACK } from "./data";

const ICONS: Record<string, React.ReactNode> = {
  Workflow: <Workflow className="size-5" />,
  Database: <Database className="size-5" />,
  Cpu: <Cpu className="size-5" />,
  Target: <Target className="size-5" />,
  Zap: <Zap className="size-5" />,
  Code: <Code className="size-5" />,
};

export function TechStackTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">核心技术栈</h3>
        <Badge variant="outline" className="text-xs">6大类 · 30+工具</Badge>
      </div>

      {TECH_STACK.map((category, ci) => (
        <div key={ci} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`size-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
              {ICONS[category.icon]}
            </div>
            <h4 className="text-sm font-bold">{category.category}</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {category.items.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{item.name}</span>
                    <Badge variant="outline" className="text-[10px]">{item.stars}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
