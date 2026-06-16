import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Calendar,
  FileText,
  Target,
  Wallet,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Zap,
  Leaf,
  Building2,
  Wheat,
  Heart,
  Shield,
  Globe,
  Cpu,
  BarChart3,
  Factory,
  AlertTriangle,
} from "lucide-react";

// ===== 导入拆分的数据 =====
import { TIMELINE, BUDGET_DATA, KEY_DOCUMENTS, INVESTMENT_DIRECTIONS, RISK_ALERTS } from "./data";

// ===== 导入拆分的 Tab 组件 =====
import { TimelineTab } from "./TimelineTab";
import { InvestmentTab } from "./InvestmentTab";
import { BudgetTab } from "./BudgetTab";
import { DocumentsTab } from "./DocumentsTab";
import { RisksTab } from "./RisksTab";

// ===== COMPONENT =====

export default function PolicyHub() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">政策与投资分析</h2>
        <p className="text-sm text-muted-foreground mt-1">
          近10年政策脉络 · 十五五投资方向 · 行业机会洞察
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/60 mb-4">
          <TabsTrigger value="timeline" className="gap-1.5">
            <Calendar className="size-3.5" />
            时间线
          </TabsTrigger>
          <TabsTrigger value="investment" className="gap-1.5">
            <Wallet className="size-3.5" />
            投资方向
          </TabsTrigger>
          <TabsTrigger value="budget" className="gap-1.5">
            <TrendingUp className="size-3.5" />
            资金规模
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-1.5">
            <FileText className="size-3.5" />
            关键文件
          </TabsTrigger>
          <TabsTrigger value="risks" className="gap-1.5">
            <AlertTriangle className="size-3.5" />
            风险提示
          </TabsTrigger>
        </TabsList>

        {/* 时间线 */}
        <TabsContent value="timeline">
          <TimelineTab />
        </TabsContent>

        {/* 投资方向 */}
        <TabsContent value="investment">
          <InvestmentTab />
        </TabsContent>

        {/* 资金规模 */}
        <TabsContent value="budget">
          <BudgetTab />
        </TabsContent>

        {/* 关键文件 */}
        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        {/* 风险提示 */}
        <TabsContent value="risks">
          <RisksTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
