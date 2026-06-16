import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { INVESTMENT_DIRECTIONS } from "./data";

export function InvestmentTab() {
  const [expandedInvestment, setExpandedInvestment] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">十五五投资方向</h3>
        <Badge variant="outline" className="text-xs">{INVESTMENT_DIRECTIONS.length} 大方向</Badge>
      </div>

      {INVESTMENT_DIRECTIONS.map((direction, i) => (
        <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden">
          <button
            className="w-full p-4 flex items-center justify-between"
            onClick={() => setExpandedInvestment(expandedInvestment === i ? null : i)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${direction.color}`}>
                {direction.icon}
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold">{direction.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px]">{direction.amount}</Badge>
                  <span className="text-xs text-muted-foreground">占比 {direction.percent}%</span>
                </div>
              </div>
            </div>
            {expandedInvestment === i ? (
              <ChevronDown className="size-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-4 text-muted-foreground" />
            )}
          </button>

          {expandedInvestment === i && (
            <div className="px-4 pb-4 space-y-3">
              <div className="space-y-1.5">
                {direction.items.map((item, ii) => (
                  <div key={ii} className="flex items-start gap-2 text-xs">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-secondary/50 p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-muted-foreground">政策信号：</span>
                  <span className="text-xs">{direction.signal}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-muted-foreground">详细分析：</span>
                  <span className="text-xs">{direction.detail}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-muted-foreground">相关政策：</span>
                  <span className="text-xs">{direction.policy}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-medium mb-1.5">机会洞察</h5>
                <div className="flex flex-wrap gap-1.5">
                  {direction.opportunities.map((opp, oi) => (
                    <Badge key={oi} variant="outline" className="text-[10px]">
                      <ExternalLink className="size-2.5 mr-1" />
                      {opp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
