import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Package,
  ClipboardCheck,
  Target,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  Zap,
  BarChart3,
  ArrowLeftRight,
  Boxes,
  Star,
  MessageCircle,
  Shield,
  DollarSign,
  Banknote,
  Gift,
  FileText,
  Database,
  TrendingUp,
  Copy,
  Check,
} from "lucide-react";

interface Workflow {
  id: number;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  frequency: string;
  prompt: string;
  fields: WorkflowField[];
}

interface WorkflowField {
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  required?: boolean;
}

const WORKFLOWS: Workflow[] = [
  // 核心业务
  {
    id: 1, name: "供应商初筛", category: "核心业务",
    icon: <Search className="size-5" />,
    description: "搜集供应商后快速评估排序",
    frequency: "每次搜集新供应商时",
    prompt: "帮我做供应商初筛。\n\n品类：{品类}\n\n以下是我搜集到的供应商原始信息：\n{供应商信息}",
    fields: [
      { name: "品类", label: "品类", placeholder: "如：临期食品、饮料、零食", required: true },
      { name: "供应商信息", label: "供应商原始信息", placeholder: "粘贴从1688/闲鱼/抖音复制的店铺信息", type: "textarea", required: true },
    ],
  },
  {
    id: 2, name: "验货报告", category: "核心业务",
    icon: <ClipboardCheck className="size-5" />,
    description: "收到样品后生成专业验货报告",
    frequency: "每次收到样品时",
    prompt: "帮我生成验货报告。\n\n供应商：{供应商}\n样品名称：{样品名称}\n购买链接：{购买链接}\n下单时间：{下单时间}\n到货时间：{到货时间}\n\n实物描述：\n{实物描述}\n\n物流情况：\n{物流情况}",
    fields: [
      { name: "供应商", label: "供应商名称", placeholder: "XXX", required: true },
      { name: "样品名称", label: "样品名称", placeholder: "XX牌薯片80g装", required: true },
      { name: "购买链接", label: "购买链接", placeholder: "https://...", type: "text" },
      { name: "下单时间", label: "下单时间", placeholder: "2026-06-01" },
      { name: "到货时间", label: "到货时间", placeholder: "2026-06-03" },
      { name: "实物描述", label: "实物描述", placeholder: "包装情况、实物与描述一致性、生产日期、保质期、口感等", type: "textarea", required: true },
      { name: "物流情况", label: "物流情况", placeholder: "发货速度、物流包装、有无破损", type: "textarea" },
    ],
  },
  {
    id: 3, name: "需求匹配", category: "核心业务",
    icon: <Target className="size-5" />,
    description: "从供应商清单中匹配渠道需求",
    frequency: "渠道提需求时",
    prompt: "帮我做需求匹配。\n\n渠道需求：\n- 渠道名称：{渠道名称}\n- 品类：{品类}\n- 预算单价：{预算}\n- 起批量要求：{起批量}\n- 特别要求：{特别要求}\n\n我的供应商清单：\n{供应商清单}",
    fields: [
      { name: "渠道名称", label: "渠道名称", placeholder: "示例团长A", required: true },
      { name: "品类", label: "品类", placeholder: "膨化食品", required: true },
      { name: "预算", label: "预算单价", placeholder: "5元以内" },
      { name: "起批量", label: "起批量要求", placeholder: "100件起" },
      { name: "特别要求", label: "特别要求", placeholder: "保质期≥30天、冷链等" },
      { name: "供应商清单", label: "供应商清单", placeholder: "粘贴 suppliers.csv 内容或手动列出", type: "textarea", required: true },
    ],
  },
  {
    id: 4, name: "话术生成", category: "核心业务",
    icon: <MessageSquare className="size-5" />,
    description: "生成各类商务沟通话术",
    frequency: "随时需要沟通时",
    prompt: "帮我写{话术类型}话术。\n\n{参数}",
    fields: [
      { name: "话术类型", label: "话术类型", placeholder: "供应商开发/渠道推荐/朋友圈/跟进", required: true },
      { name: "参数", label: "具体参数", placeholder: "发给谁、目的、语气、字数要求等", type: "textarea", required: true },
    ],
  },
  {
    id: 5, name: "纠纷处理", category: "核心业务",
    icon: <AlertTriangle className="size-5" />,
    description: "分析纠纷、给出调解方案",
    frequency: "出现纠纷时",
    prompt: "帮我处理交易纠纷。\n\n纠纷类型：{纠纷类型}\n\n供应商说法：{供应商说法}\n渠道说法：{渠道说法}\n\n关键证据：\n{关键证据}\n\n我的角色：供应链撮合者",
    fields: [
      { name: "纠纷类型", label: "纠纷类型", placeholder: "保质期争议/质量问题/发货延迟/数量差异", required: true },
      { name: "供应商说法", label: "供应商说法", placeholder: "供应商的立场和解释", type: "textarea", required: true },
      { name: "渠道说法", label: "渠道说法", placeholder: "渠道的投诉内容", type: "textarea", required: true },
      { name: "关键证据", label: "关键证据", placeholder: "聊天记录、照片、合同条款等", type: "textarea" },
    ],
  },
  // 日常管理
  {
    id: 6, name: "供应商跟进", category: "日常管理",
    icon: <RefreshCw className="size-5" />,
    description: "汇总待跟进供应商，生成行动清单",
    frequency: "每天早上",
    prompt: "帮我做供应商跟进。\n\n我的供应商清单：\n{供应商清单}\n\n重点关注：\n- 哪些供应商需要跟进\n- 每个供应商下一步该做什么\n- 按优先级排序",
    fields: [
      { name: "供应商清单", label: "供应商清单", placeholder: "粘贴 suppliers.csv 内容", type: "textarea", required: true },
    ],
  },
  {
    id: 7, name: "渠道激活", category: "日常管理",
    icon: <Zap className="size-5" />,
    description: "分析沉默渠道，生成激活策略",
    frequency: "每周一次",
    prompt: "帮我做渠道激活分析。\n\n我的渠道清单：\n{渠道清单}\n\n我的供应商清单：\n{供应商清单}\n\n补充信息：\n{补充信息}",
    fields: [
      { name: "渠道清单", label: "渠道清单", placeholder: "粘贴 channels.csv 内容", type: "textarea", required: true },
      { name: "供应商清单", label: "供应商清单", placeholder: "粘贴 suppliers.csv 或输入：暂无新供应商", type: "textarea" },
      { name: "补充信息", label: "补充信息", placeholder: "如：最近有一批新的低价供应商", type: "textarea" },
    ],
  },
  {
    id: 8, name: "周报月报", category: "日常管理",
    icon: <BarChart3 className="size-5" />,
    description: "撮合数据复盘与趋势分析",
    frequency: "每周/每月",
    prompt: "帮我生成{报告类型}。\n\n统计周期：{周期}\n\n供应商数据：\n{供应商数据}\n\n渠道数据：\n{渠道数据}\n\n交易数据：\n{交易数据}\n\n补充说明：\n{补充说明}",
    fields: [
      { name: "报告类型", label: "报告类型", placeholder: "周报/月报", required: true },
      { name: "周期", label: "统计周期", placeholder: "2026年6月1日-6月8日", required: true },
      { name: "供应商数据", label: "供应商数据", placeholder: "粘贴 suppliers.csv", type: "textarea" },
      { name: "渠道数据", label: "渠道数据", placeholder: "粘贴 channels.csv", type: "textarea" },
      { name: "交易数据", label: "交易数据", placeholder: "粘贴 deals.csv", type: "textarea" },
      { name: "补充说明", label: "补充说明", placeholder: "本周主要工作、遇到的问题等", type: "textarea" },
    ],
  },
  // 进阶分析
  {
    id: 9, name: "比价分析", category: "进阶分析",
    icon: <ArrowLeftRight className="size-5" />,
    description: "同品类多供应商横向比价",
    frequency: "选品/谈价时",
    prompt: "帮我做比价分析。\n\n目标品类：{品类}\n\n渠道需求：\n- 预算上限：{预算}\n- 起批量要求：{起批量}\n- 保质期要求：{保质期}\n- 是否需要一件代发：{代发}\n\n供应商报价：\n{供应商报价}",
    fields: [
      { name: "品类", label: "目标品类", placeholder: "膨化食品", required: true },
      { name: "预算", label: "预算上限", placeholder: "5元/件" },
      { name: "起批量", label: "起批量要求", placeholder: "100件起" },
      { name: "保质期", label: "保质期要求", placeholder: "≥30天" },
      { name: "代发", label: "是否需要一件代发", placeholder: "是/否" },
      { name: "供应商报价", label: "供应商报价", placeholder: "供应商A：薯片，3.5元，100件起，代发是，保质期45天", type: "textarea", required: true },
    ],
  },
  {
    id: 10, name: "样品追踪", category: "进阶分析",
    icon: <Boxes className="size-5" />,
    description: "管理所有样品状态和成本",
    frequency: "有多个样品在途时",
    prompt: "帮我做样品追踪。\n\n当前样品情况：\n{样品数据}\n\n需要帮我：\n1. 汇总所有样品的当前状态\n2. 提醒哪些需要行动\n3. 计算样品成本",
    fields: [
      { name: "样品数据", label: "样品数据", placeholder: "粘贴 samples.csv 内容", type: "textarea", required: true },
    ],
  },
  {
    id: 11, name: "供应商评估", category: "进阶分析",
    icon: <Star className="size-5" />,
    description: "定期综合评估，决定去留",
    frequency: "每月一次",
    prompt: "帮我做供应商评估。\n\n评估周期：{周期}\n\n供应商数据：\n{供应商数据}\n\n交易数据：\n{交易数据}\n\n渠道反馈：\n{渠道反馈}",
    fields: [
      { name: "周期", label: "评估周期", placeholder: "2026年6月", required: true },
      { name: "供应商数据", label: "供应商数据", placeholder: "粘贴 suppliers.csv", type: "textarea", required: true },
      { name: "交易数据", label: "交易数据", placeholder: "粘贴相关 deals.csv 记录", type: "textarea" },
      { name: "渠道反馈", label: "渠道反馈", placeholder: "粘贴相关 feedback.csv 或输入：暂无", type: "textarea" },
    ],
  },
  {
    id: 12, name: "渠道反馈分析", category: "进阶分析",
    icon: <MessageCircle className="size-5" />,
    description: "分析渠道反馈，优化推荐策略",
    frequency: "积累5-10条反馈后",
    prompt: "帮我做渠道反馈分析。\n\n反馈数据：\n{反馈数据}\n\n补充背景：\n{补充背景}",
    fields: [
      { name: "反馈数据", label: "反馈数据", placeholder: "粘贴 feedback.csv 内容", type: "textarea", required: true },
      { name: "补充背景", label: "补充背景", placeholder: "最近推荐了哪些供应商、渠道有什么新需求等", type: "textarea" },
    ],
  },
  // 风控与财务
  {
    id: 13, name: "保质期管理", category: "风控与财务",
    icon: <Shield className="size-5" />,
    description: "追踪保质期、预警临期产品",
    frequency: "每周一次",
    prompt: "帮我做保质期管理。\n\n当前日期：{日期}\n\n在手产品数据：\n{产品数据}\n\n渠道最低保质期要求：\n{渠道要求}",
    fields: [
      { name: "日期", label: "当前日期", placeholder: "2026-06-15", required: true },
      { name: "产品数据", label: "在手产品数据", placeholder: "供应商A：薯片，验货时保质期剩余45天，验货日期2026-06-01", type: "textarea", required: true },
      { name: "渠道要求", label: "渠道最低保质期要求", placeholder: "团长A：≥30天\n主播B：≥30天", type: "textarea" },
    ],
  },
  {
    id: 14, name: "成交确认", category: "风控与财务",
    icon: <DollarSign className="size-5" />,
    description: "利润测算、风险检查、确认话术",
    frequency: "每次成交时",
    prompt: "帮我做成交确认。\n\n交易信息：\n- 渠道名称：{渠道}\n- 供应商名称：{供应商}\n- 产品名称：{产品}\n- 数量：{数量}\n- 供应商报价：{报价}\n- 渠道成交价：{成交价}\n- 一件代发：{代发}\n- 发货时间要求：{发货时间}\n- 付款方式：{付款方式}",
    fields: [
      { name: "渠道", label: "渠道名称", placeholder: "示例团长A", required: true },
      { name: "供应商", label: "供应商名称", placeholder: "示例供应商A", required: true },
      { name: "产品", label: "产品名称", placeholder: "XX牌薯片80g", required: true },
      { name: "数量", label: "数量", placeholder: "100件", required: true },
      { name: "报价", label: "供应商报价", placeholder: "3.5元/件", required: true },
      { name: "成交价", label: "渠道成交价", placeholder: "4元/件", required: true },
      { name: "代发", label: "一件代发", placeholder: "是/否" },
      { name: "发货时间", label: "发货时间要求", placeholder: "3天内" },
      { name: "付款方式", label: "付款方式", placeholder: "微信转账/月结" },
    ],
  },
  {
    id: 15, name: "回款追踪", category: "风控与财务",
    icon: <Banknote className="size-5" />,
    description: "追踪待收款、催款话术",
    frequency: "每天查看",
    prompt: "帮我做回款追踪。\n\n当前日期：{日期}\n\n回款数据：\n{回款数据}",
    fields: [
      { name: "日期", label: "当前日期", placeholder: "2026-06-15", required: true },
      { name: "回款数据", label: "回款数据", placeholder: "粘贴 payments.csv 内容", type: "textarea", required: true },
    ],
  },
  // 关系与数据
  {
    id: 16, name: "首单管理", category: "关系与数据",
    icon: <Gift className="size-5" />,
    description: "新渠道首单全流程管理",
    frequency: "渠道首次下单时",
    prompt: "帮我做首单管理。\n\n渠道信息：\n- 渠道名称：{渠道}\n- 渠道类型：{类型}\n- 主营品类：{品类}\n- 预算：{预算}\n- 起批量要求：{起批量}\n- 特殊要求：{特殊要求}\n\n我推荐的供应商/产品：\n{推荐}",
    fields: [
      { name: "渠道", label: "渠道名称", placeholder: "示例店主C", required: true },
      { name: "类型", label: "渠道类型", placeholder: "线下零售/社区团购/直播", required: true },
      { name: "品类", label: "主营品类", placeholder: "饮料", required: true },
      { name: "预算", label: "预算", placeholder: "3元以内/件" },
      { name: "起批量", label: "起批量要求", placeholder: "200件起" },
      { name: "特殊要求", label: "特殊要求", placeholder: "月结账期、冷链等" },
      { name: "推荐", label: "推荐的供应商/产品", placeholder: "供应商C的果汁，2-4元，200件起", type: "textarea" },
    ],
  },
  {
    id: 17, name: "沟通记录", category: "关系与数据",
    icon: <FileText className="size-5" />,
    description: "记录/查询沟通历史",
    frequency: "每次重要沟通后",
    prompt: "帮我管理沟通记录。\n\n操作类型：{操作}\n\n- 联系对象：{对象}\n- 对象类型：{对象类型}\n- 沟通方式：{方式}\n- 沟通内容：{内容}\n- 沟通日期：{日期}",
    fields: [
      { name: "操作", label: "操作类型", placeholder: "记录新沟通/查询历史", required: true },
      { name: "对象", label: "联系对象", placeholder: "示例供应商A", required: true },
      { name: "对象类型", label: "对象类型", placeholder: "供应商/渠道" },
      { name: "方式", label: "沟通方式", placeholder: "微信/电话/面谈" },
      { name: "内容", label: "沟通内容", placeholder: "确认了新一批库存，有200件现货...", type: "textarea", required: true },
      { name: "日期", label: "沟通日期", placeholder: "2026-06-15" },
    ],
  },
  {
    id: 18, name: "数据一致性检查", category: "关系与数据",
    icon: <Database className="size-5" />,
    description: "跨文件数据冲突检查与修复",
    frequency: "每周一次",
    prompt: "帮我做数据一致性检查。\n\n当前日期：{日期}\n\n我的数据文件：\n{数据文件}",
    fields: [
      { name: "日期", label: "当前日期", placeholder: "2026-06-15", required: true },
      { name: "数据文件", label: "数据文件内容", placeholder: "粘贴所有 CSV 文件内容", type: "textarea", required: true },
    ],
  },
  // 数据分析
  {
    id: 19, name: "销售数据分析", category: "数据分析",
    icon: <TrendingUp className="size-5" />,
    description: "自动分析销售数据：趋势、对比、异常检测",
    frequency: "每周/每月",
    prompt: "帮我分析销售数据。\n\n数据文件路径：{文件路径}\n\n分析维度：\n{分析维度}\n\n补充说明：{补充说明}",
    fields: [
      { name: "文件路径", label: "数据文件路径", placeholder: "D:/data/sales.csv 或粘贴 CSV 内容", required: true },
      { name: "分析维度", label: "分析维度", placeholder: "趋势分析、产品对比、地区对比、异常检测（可多选）", type: "textarea" },
      { name: "补充说明", label: "补充说明", placeholder: "重点关注什么、对比什么时间段等", type: "textarea" },
    ],
  },
  {
    id: 20, name: "数据可视化报告", category: "数据分析",
    icon: <BarChart3 className="size-5" />,
    description: "生成带图表的数据分析报告",
    frequency: "按需",
    prompt: "帮我生成数据可视化报告。\n\n数据内容：\n{数据内容}\n\n报告主题：{主题}\n\n需要的图表类型：{图表类型}",
    fields: [
      { name: "数据内容", label: "数据内容", placeholder: "粘贴 CSV 数据或描述数据结构", type: "textarea", required: true },
      { name: "主题", label: "报告主题", placeholder: "如：2026年Q1销售分析", required: true },
      { name: "图表类型", label: "需要的图表", placeholder: "折线图（趋势）、柱状图（对比）、饼图（占比）等" },
    ],
  },
];

const CATEGORIES = [
  { name: "核心业务", color: "bg-red-500/20 text-red-400 border-red-500/30" },
  { name: "日常管理", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { name: "进阶分析", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { name: "风控与财务", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { name: "关系与数据", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { name: "数据分析", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
];

export default function WorkflowHub() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const handleOpen = (wf: Workflow) => {
    setSelectedWorkflow(wf);
    setFormValues({});
    setCopied(false);
  };

  const handleGenerate = () => {
    if (!selectedWorkflow) return;
    let prompt = selectedWorkflow.prompt;
    for (const [key, value] of Object.entries(formValues)) {
      prompt = prompt.replace(`{${key}}`, value || `[待填写]`);
    }

    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">交易枢纽工作流</h2>
        <p className="text-sm text-muted-foreground mt-1">
          18 个工作流覆盖供应商开发、验货、成交、回款全链路。点击填写参数后复制 prompt 到 Claude Code 执行。
        </p>
      </div>

      {CATEGORIES.map((cat) => {
        const workflows = WORKFLOWS.filter((w) => w.category === cat.name);
        return (
          <section key={cat.name} className="space-y-3">
            <Badge variant="outline" className={`${cat.color} text-xs`}>
              {cat.name}
            </Badge>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {workflows.map((wf) => (
                <button
                  key={wf.id}
                  onClick={() => handleOpen(wf)}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 hover:bg-secondary/50 transition-all text-left group"
                >
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                    {wf.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">#{wf.id}</span>
                      <h3 className="text-sm font-medium">{wf.name}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{wf.description}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-1">📅 {wf.frequency}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        );
      })}

      {/* Workflow Form Dialog */}
      <Dialog open={!!selectedWorkflow} onOpenChange={(v) => !v && setSelectedWorkflow(null)}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[85vh] p-0 overflow-hidden bg-card border-border/50 flex flex-col">
          <DialogTitle className="sr-only">{selectedWorkflow?.name}</DialogTitle>

          {selectedWorkflow && (
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {selectedWorkflow.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold">#{selectedWorkflow.id} {selectedWorkflow.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedWorkflow.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedWorkflow.fields.map((field) => (
                  <div key={field.name}>
                    <label className="text-sm font-medium flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-red-400">*</span>}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        value={formValues[field.name] || ""}
                        onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="mt-1 w-full h-24 rounded-lg bg-secondary/60 border border-transparent focus:border-primary/40 focus:bg-secondary px-3 py-2 text-sm outline-none resize-none transition-all"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formValues[field.name] || ""}
                        onChange={(e) => setFormValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="mt-1 w-full h-9 rounded-lg bg-secondary/60 border border-transparent focus:border-primary/40 focus:bg-secondary px-3 text-sm outline-none transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full gap-2"
                disabled={!selectedWorkflow.fields.filter((f) => f.required).every((f) => formValues[f.name]?.trim())}
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    已复制到剪贴板！粘贴到 Claude Code 执行
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    生成 Prompt 并复制
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
