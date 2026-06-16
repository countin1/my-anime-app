import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { BUDGET_DATA } from "./data";

export function BudgetTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">资金规模</h3>
        <Badge variant="outline" className="text-xs">
          <TrendingUp className="size-3 mr-1" />
          总计超20万亿
        </Badge>
      </div>

      {BUDGET_DATA.map((item, i) => (
        <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold">{item.name}</h4>
            <Badge variant="secondary" className="text-xs">{item.amount}</Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">年均投资</span>
              <span className="font-medium">{item.annual}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">增长趋势</span>
              <span className="font-medium text-green-500">{item.trend}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">重点领域</span>
              <span className="font-medium">{item.focus}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
