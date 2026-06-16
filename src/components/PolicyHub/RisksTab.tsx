import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { RISK_ALERTS } from "./data";

export function RisksTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">政策与市场风险提示</h3>
        <Badge variant="outline" className="text-xs">{RISK_ALERTS.length} 大类 · 12 项风险</Badge>
      </div>

      {RISK_ALERTS.map((category, ci) => (
        <div key={ci} className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`size-2 rounded-full ${category.color}`} />
            <h4 className="text-sm font-bold">{category.category}</h4>
            <Badge variant="outline" className="text-[10px]">风险等级：{category.level}</Badge>
          </div>
          <div className="space-y-2">
            {category.items.map((item, i) => (
              <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-xs font-bold text-foreground">{item.risk}</h5>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[9px] px-1 py-0">
                      概率：{item.probability}
                    </Badge>
                    <Badge variant="outline" className="text-[9px] px-1 py-0">
                      影响：{item.impact}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p><span className="text-foreground font-medium">历史案例：</span>{item.example}</p>
                  <p><span className="text-foreground font-medium">预警信号：</span>{item.signal}</p>
                  <p><span className="text-foreground font-medium">应对建议：</span>{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
        <h4 className="text-sm font-bold mb-2 text-red-400">⚠️ 风险监控要点</h4>
        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
          <li><strong>政策表述变化</strong> — 从"鼓励"到"规范"是重要信号</li>
          <li><strong>监管机构动向</strong> — 部委约谈、立案调查是预警信号</li>
          <li><strong>量化指标变化</strong> — 赤字率、利率等关键指标调整</li>
          <li><strong>国际环境变化</strong> — 制裁、关税等外部风险</li>
          <li><strong>市场情绪变化</strong> — 概念炒作、估值泡沫</li>
          <li><strong>行业竞争格局</strong> — 产能过剩、价格战</li>
        </ul>
      </div>
    </div>
  );
}
