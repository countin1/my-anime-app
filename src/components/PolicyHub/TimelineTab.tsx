import { Badge } from "@/components/ui/badge";
import { TIMELINE } from "./data";

export function TimelineTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">近10年政策脉络</h3>
        <Badge variant="outline" className="text-xs">{TIMELINE.length} 个关键节点</Badge>
      </div>

      {TIMELINE.map((item, i) => (
        <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="size-3 rounded-full bg-primary" />
              {i < TIMELINE.length - 1 && <div className="w-px h-full bg-border" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold">{item.year}</span>
                <Badge variant="secondary" className="text-[10px]">{item.period}</Badge>
              </div>
              <h4 className="text-sm font-medium mb-1">{item.focus}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
              <div className="flex flex-wrap gap-1">
                {item.keywords.map((keyword, ki) => (
                  <Badge key={ki} variant="outline" className="text-[10px]">{keyword}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
