import type { ReactNode } from "react";

// 时间线
export interface TimelineItem {
  year: string;
  event: string;
  keywords: string[];
  detail: string;
  policy: string;
  color: string;
}

// 投资方向
export interface InvestmentDirection {
  name: string;
  amount: string;
  percent: number;
  icon: ReactNode;
  color: string;
  items: string[];
  signal: string;
  detail: string;
  policy: string;
  opportunities: string[];
}

// 资金规模
export interface BudgetItem {
  name: string;
  amount: string;
  increase: string;
  target: string;
  detail: string;
}

// 关键文件
export interface PolicyDocument {
  year: string;
  name: string;
  tag: string;
  category: string;
  detail: string;
}

// 行业机会
export interface OpportunityItem {
  direction: string;
  opportunity: string;
  action: string;
  signal: string;
}

export interface OpportunityCategory {
  category: string;
  items: OpportunityItem[];
}

// 关键指标
export interface IndicatorItem {
  name: string;
  value: string;
  trend: "↑" | "↓" | "→";
  note: string;
}

export interface IndicatorCategory {
  category: string;
  items: IndicatorItem[];
}

// 产业政策
export interface IndustryPolicy {
  name: string;
  stage: string;
  policy: string;
  support: "强" | "中" | "弱";
  icon: ReactNode;
  color: string;
  keyPoints: string[];
  targets: string;
  opportunities: string[];
}

// 风险提示
export interface RiskItem {
  risk: string;
  probability: string;
  impact: string;
  example: string;
  signal: string;
  action: string;
}

export interface RiskCategory {
  category: string;
  level: string;
  color: string;
  items: RiskItem[];
}
