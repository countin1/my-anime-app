import { useState } from "react";
import {
  Sparkles, BookOpen, Code, Search, Cpu, Rocket,
  CheckCircle2, Lock, Unlock, ChevronDown, ChevronRight,
  Copy, Check, Zap, Trophy, Target, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ========== 技能树数据 ==========
const SKILL_TREE = [
  {
    stage: "Prompt 工程",
    icon: Sparkles,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Zero-shot Prompt", desc: "直接提问，无示例", status: "mastered", xp: 100 },
      { name: "Few-shot Prompt", desc: "提供示例引导模型", status: "mastered", xp: 100 },
      { name: "Chain-of-Thought", desc: "逐步推理提示", status: "mastered", xp: 150 },
      { name: "角色设定", desc: "给模型设定专业身份", status: "mastered", xp: 100 },
      { name: "输出格式控制", desc: "指定 Markdown/JSON/表格", status: "mastered", xp: 100 },
      { name: "Self-Consistency", desc: "多次采样取多数票", status: "available", xp: 200 },
      { name: "Tree-of-Thought", desc: "分支探索式推理", status: "available", xp: 250 },
      { name: "Prompt 自动优化", desc: "网格搜索+贝叶斯优化", status: "mastered", xp: 300 },
    ],
  },
  {
    stage: "RAG 系统",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "文档加载与分块", desc: "PDF/TXT 解析+分块", status: "mastered", xp: 100 },
      { name: "Embedding 模型", desc: "Sentence-Transformers", status: "mastered", xp: 150 },
      { name: "向量数据库", desc: "ChromaDB 持久化存储", status: "mastered", xp: 150 },
      { name: "语义检索", desc: "top_k 相似度检索", status: "mastered", xp: 100 },
      { name: "RAGAS 评测", desc: "Precision/Recall/Faithfulness", status: "mastered", xp: 200 },
      { name: "消融实验", desc: "chunk_size/top_k 调优", status: "mastered", xp: 250 },
      { name: "混合检索", desc: "向量+BM25 关键词", status: "available", xp: 200 },
      { name: "重排序", desc: "Cross-Encoder 精排", status: "locked", xp: 250 },
    ],
  },
  {
    stage: "模型微调",
    icon: Cpu,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "训练数据构造", desc: "Alpaca/Chat 格式", status: "mastered", xp: 150 },
      { name: "数据增强", desc: "多表述变体生成", status: "mastered", xp: 150 },
      { name: "LoRA 原理", desc: "低秩分解+秩r+alpha", status: "available", xp: 200 },
      { name: "QLoRA 量化", desc: "4bit NF4 节省显存", status: "available", xp: 200 },
      { name: "超参调优", desc: "学习率/epoch/batch_size", status: "locked", xp: 250 },
      { name: "微调效果验证", desc: "配对 t 检验+Cohen's d", status: "mastered", xp: 200 },
      { name: "模型合并", desc: "LoRA 权重合并到基座", status: "locked", xp: 150 },
      { name: "分布式训练", desc: "DeepSpeed/FSDP", status: "locked", xp: 300 },
    ],
  },
  {
    stage: "生产部署",
    icon: Rocket,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "FastAPI 服务化", desc: "REST API 封装", status: "available", xp: 150 },
      { name: "Docker 容器化", desc: "Dockerfile + Compose", status: "locked", xp: 200 },
      { name: "vLLM 推理加速", desc: "PagedAttention 优化", status: "locked", xp: 250 },
      { name: "模型量化部署", desc: "GPTQ/AWQ/GGUF", status: "locked", xp: 200 },
      { name: "监控告警", desc: "Prometheus+Grafana", status: "locked", xp: 200 },
      { name: "CI/CD 流水线", desc: "GitHub Actions", status: "locked", xp: 200 },
      { name: "云部署", desc: "HuggingFace Spaces", status: "locked", xp: 150 },
      { name: "A/B 测试", desc: "线上效果对比", status: "locked", xp: 250 },
    ],
  },
];

// ========== Prompt 模板库 ==========
const PROMPT_TEMPLATES = [
  {
    category: "统计学",
    icon: "📊",
    templates: [
      { name: "概念解释", template: "你是一位统计学教授。请解释{concept}：\n1. 一句话定义\n2. 生活例子\n3. 数学公式", useCase: "理解统计概念" },
      { name: "数据分析", template: "你是资深数据分析师。数据：{data_summary}\n请输出：\n### 数据质量评估\n### 业务洞察\n### 异常值检测\n### 后续建议", useCase: "CSV 数据分析" },
      { name: "计量经济学", template: "你是计量经济学专家。回归结果：{regression}\n请解读：\n1. 显著变量的经济含义\n2. 内生性问题\n3. 政策建议", useCase: "回归分析解读" },
    ],
  },
  {
    category: "代码生成",
    icon: "💻",
    templates: [
      { name: "Python 统计代码", template: "用 Python 实现{requirement}。\n要求：pandas+numpy+scipy，有注释，有错误处理。", useCase: "统计分析代码" },
      { name: "数据可视化", template: "用 matplotlib 绘制{chart_type}。\n数据：{data}\n要求：中文标签，配色美观，保存PNG。", useCase: "图表绘制" },
    ],
  },
  {
    category: "RAG 系统",
    icon: "🔍",
    templates: [
      { name: "知识问答", template: "根据参考资料回答问题。如果不足以回答，如实说'无法回答'。\n\n参考资料：{context}\n问题：{question}\n\n回答后列出引用来源。", useCase: "RAG 问答" },
      { name: "RAG 评测", template: "评估回答质量(1-5分)：\n忠实度(是否基于资料): X/5\n相关性(是否切题): X/5\n完整性(覆盖要点): X/5\n\n问题: {q}\n资料: {ctx}\n回答: {a}", useCase: "RAG 质量评测" },
    ],
  },
  {
    category: "评测分析",
    icon: "🎯",
    templates: [
      { name: "模型评分", template: "你是严格的评估专家。评分标准：准确性、完整性、清晰度。\n参考要点：{hint}\n问题：{q}\n回答：{a}\n\n只输出0-10整数分数。", useCase: "模型回答评分" },
      { name: "错误分类", template: "分析错误类型(多选，逗号分隔)：\n事实错误/逻辑错误/不完整/幻觉/答非所问/过于笼统/格式混乱/无明显错误\n\n问题: {q}\n回答: {a}\n得分: {score}/10\n\n只输出标签：", useCase: "错误模式分析" },
    ],
  },
  {
    category: "Agent",
    icon: "🤖",
    templates: [
      { name: "经济分析 Agent", template: "你是宏观经济分析师Agent。\n工作流程：\n1. 判断数据类型(时间序列/截面/面板)\n2. 选择方法(回归/ARIMA/因果推断)\n3. 执行分析\n4. 解读经济含义\n\n用户数据：{data}", useCase: "自动化经济分析" },
      { name: "多步推理", template: "请逐步推理：\n1. 分析关键信息\n2. 列出解题思路\n3. 选择最优思路执行\n4. 验证答案\n\n问题：{question}", useCase: "复杂问题推理" },
    ],
  },
];

// ========== 面试话术 ==========
const INTERVIEW_SCRIPTS = [
  {
    title: "项目介绍",
    content: "我做了一个大模型评测框架。实验设计上用分层抽样+随机化，统计分析用 OLS 回归（HC1 稳健标准误）、配对 t 检验（Bonferroni 校正）、ANOVA、Tukey HSD、Bootstrap 置信区间、Cohen's d 效应量、统计功效分析。评测维度参考 RAGAS 框架，包括忠实度、相关性、完整性、连贯性、安全性。还做了成本-延迟-性价比分析和 Prompt 自动优化。",
  },
  {
    title: "Prompt 优化",
    content: "我做了一个 Prompt 模板自动优化器。定义了 4 个维度（角色设定、输出格式、推理指令、few-shot），用网格搜索遍历 36 种组合，用配对 t 检验和 Cohen's d 检验各模板的显著性差异。还做了贝叶斯优化，用高斯过程建模 prompt 配置与得分的关系，用期望改进作为采集函数，20 轮迭代就找到了最优配置。",
  },
  {
    title: "RAG 系统",
    content: "我做了 RAG 系统的评测和优化。用 RAGAS 框架的 4 个指标评测检索和生成质量，然后做了 chunk_size 和 top_k 的消融实验，发现 chunk_size=800、top_k=3 在中文场景下最优。还对比了不同 Embedding 模型，发现 bge-large-zh 在中文检索任务上比 all-MiniLM-L6-v2 好 15%。",
  },
  {
    title: "模型微调",
    content: "我用 LoRA 微调了 Qwen2.5-7B，训练数据是从经济学评测题构造的，每题增强了 3 个变体。微调后在统计知识维度上 Cohen's d = 0.73，配对 t 检验 p<0.01，显著优于基座模型。用 QLoRA 4bit 量化后，7B 模型只需要 6GB 显存，RTX 3060 就能跑。",
  },
];

// ========== 组件 ==========

function SkillCard({ skill }: { skill: typeof SKILL_TREE[0]["skills"][0] }) {
  const statusConfig = {
    mastered: { icon: CheckCircle2, color: "border-cyan-400 bg-cyan-400/10", iconColor: "text-cyan-400", label: "已掌握" },
    available: { icon: Unlock, color: "border-purple-400 bg-purple-400/10", iconColor: "text-purple-400", label: "可学习" },
    locked: { icon: Lock, color: "border-gray-600 bg-gray-600/10", iconColor: "text-gray-500", label: "未解锁" },
  };
  const config = statusConfig[skill.status as keyof typeof statusConfig];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border-2 p-4 transition-all hover:scale-[1.02] ${config.color}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`size-5 ${config.iconColor}`} />
          <span className="font-bold text-sm">{skill.name}</span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground">+{skill.xp} XP</span>
      </div>
      <p className="text-xs text-muted-foreground">{skill.desc}</p>
      <span className={`text-[10px] mt-2 inline-block px-2 py-0.5 rounded-full ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}

function PromptCard({ template }: { template: typeof PROMPT_TEMPLATES[0]["templates"][0] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(template.template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm">{template.name}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2 text-xs">
          {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
          {copied ? "已复制" : "复制"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{template.useCase}</p>
      <pre className="text-xs bg-black/30 rounded-lg p-3 overflow-x-auto text-green-300 font-mono">
        {template.template}
      </pre>
    </div>
  );
}

function InterviewCard({ script }: { script: typeof INTERVIEW_SCRIPTS[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Target className="size-4 text-white" />
          </div>
          <span className="font-bold">{script.title}</span>
        </div>
        {expanded ? <ChevronDown className="size-5 text-muted-foreground" /> : <ChevronRight className="size-5 text-muted-foreground" />}
      </button>
      {expanded && (
        <div className="px-4 pb-4">
          <div className="bg-black/30 rounded-lg p-4 text-sm leading-relaxed text-muted-foreground">
            {script.content}
          </div>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="mt-2 h-7 px-2 text-xs">
            {copied ? <Check className="size-3 mr-1" /> : <Copy className="size-3 mr-1" />}
            {copied ? "已复制" : "复制话术"}
          </Button>
        </div>
      )}
    </div>
  );
}

// ========== 主组件 ==========

export default function AILearning() {
  const [activeTab, setActiveTab] = useState<"skills" | "prompts" | "interview">("skills");

  // 统计
  const totalSkills = SKILL_TREE.reduce((acc, s) => acc + s.skills.length, 0);
  const masteredSkills = SKILL_TREE.reduce((acc, s) => acc + s.skills.filter(sk => sk.status === "mastered").length, 0);
  const totalXP = SKILL_TREE.reduce((acc, s) => acc + s.skills.filter(sk => sk.status === "mastered").reduce((a, sk) => a + sk.xp, 0), 0);
  const maxXP = SKILL_TREE.reduce((acc, s) => acc + s.skills.reduce((a, sk) => a + sk.xp, 0), 0);
  const level = Math.floor(totalXP / 500) + 1;

  const tabs = [
    { id: "skills" as const, label: "技能树", icon: Zap },
    { id: "prompts" as const, label: "Prompt 模板", icon: Code },
    { id: "interview" as const, label: "面试话术", icon: Trophy },
  ];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="size-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold gradient-text">AI 技能树</h1>
          <p className="text-sm text-muted-foreground">从经济统计学出发，征服 AI 工程师之路</p>
        </div>
      </div>

      {/* 状态卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <Trophy className="size-6 mx-auto mb-1 text-yellow-400" />
          <div className="text-2xl font-bold">Lv.{level}</div>
          <div className="text-xs text-muted-foreground">当前等级</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <Star className="size-6 mx-auto mb-1 text-purple-400" />
          <div className="text-2xl font-bold">{totalXP}</div>
          <div className="text-xs text-muted-foreground">经验值</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <CheckCircle2 className="size-6 mx-auto mb-1 text-cyan-400" />
          <div className="text-2xl font-bold">{masteredSkills}/{totalSkills}</div>
          <div className="text-xs text-muted-foreground">已掌握</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
          <Target className="size-6 mx-auto mb-1 text-orange-400" />
          <div className="text-2xl font-bold">{Math.round(masteredSkills / totalSkills * 100)}%</div>
          <div className="text-xs text-muted-foreground">完成度</div>
        </div>
      </div>

      {/* 经验条 */}
      <div className="rounded-full bg-white/10 h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${(totalXP / maxXP) * 100}%` }}
        />
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10"
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 技能树 */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {SKILL_TREE.map((stage, idx) => {
            const Icon = stage.icon;
            const mastered = stage.skills.filter(s => s.status === "mastered").length;
            return (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`size-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                    <Icon className="size-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{stage.stage}</h2>
                    <p className="text-xs text-muted-foreground">{mastered}/{stage.skills.length} 已掌握</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {stage.skills.map((skill, sIdx) => (
                    <SkillCard key={sIdx} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Prompt 模板库 */}
      {activeTab === "prompts" && (
        <div className="space-y-6">
          {PROMPT_TEMPLATES.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-bold mb-3">{category.icon} {category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.templates.map((template, tIdx) => (
                  <PromptCard key={tIdx} template={template} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 面试话术 */}
      {activeTab === "interview" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">点击展开查看话术，复制即可用于面试</p>
          {INTERVIEW_SCRIPTS.map((script, idx) => (
            <InterviewCard key={idx} script={script} />
          ))}
        </div>
      )}
    </div>
  );
}
