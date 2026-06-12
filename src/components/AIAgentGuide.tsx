import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  Cpu,
  Database,
  Globe,
  GraduationCap,
  Layers,
  Lightbulb,
  Rocket,
  Target,
  Zap,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Brain,
  Bot,
  Workflow,
  Server,
  Shield,
  Star,
  Clock,
  CheckCircle2,
} from "lucide-react";

// ===== 数据 =====

const LEARNING_PATH = [
  {
    stage: "第一阶段",
    title: "基础入门",
    duration: "1-2个月",
    color: "from-green-500 to-emerald-500",
    icon: <BookOpen className="size-5" />,
    goal: "理解 LLM 原理，掌握基础 API 调用",
    skills: [
      {
        name: "LLM 基础",
        items: ["Transformer 架构原理", "注意力机制", "Token 与上下文窗口", "温度、Top-P 等参数"],
        resources: [
          { name: "李宏毅 2024 生成式AI课程", url: "https://www.bilibili.com/video/BV1TD421Q7Fy", type: "视频" },
          { name: "Anthropic 文档", url: "https://docs.anthropic.com", type: "官方" },
        ],
      },
      {
        name: "Prompt Engineering",
        items: ["系统提示词设计", "Few-shot 提示", "Chain-of-Thought", "角色扮演技巧"],
        resources: [
          { name: "OpenAI Prompt 指南", url: "https://platform.openai.com/docs/guides/prompt-engineering", type: "官方" },
          { name: "Anthropic Prompt 教程", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering", type: "官方" },
        ],
      },
      {
        name: "Python 基础",
        items: ["基础语法与数据结构", "异步编程 asyncio", "HTTP 请求 requests/httpx", "JSON 处理"],
        resources: [
          { name: "Python 官方教程", url: "https://docs.python.org/3/tutorial/", type: "官方" },
          { name: "Real Python", url: "https://realpython.com/", type: "教程" },
        ],
      },
    ],
    project: "用 OpenAI/Claude API 做一个聊天机器人",
  },
  {
    stage: "第二阶段",
    title: "Agent 框架",
    duration: "2-3个月",
    color: "from-blue-500 to-cyan-500",
    icon: <Bot className="size-5" />,
    goal: "掌握主流 Agent 框架，能独立开发 Agent",
    skills: [
      {
        name: "LangChain",
        items: ["Chain 链式调用", "Agent 与 Tools", "Memory 记忆系统", "Callbacks 回调"],
        resources: [
          { name: "LangChain 官方文档", url: "https://python.langchain.com/", type: "官方" },
          { name: "LangChain 中文网", url: "https://www.langchain.com.cn/", type: "中文" },
        ],
      },
      {
        name: "LangGraph",
        items: ["状态图设计", "节点与边", "条件分支", "人机协作"],
        resources: [
          { name: "LangGraph 文档", url: "https://langchain-ai.github.io/langgraph/", type: "官方" },
        ],
      },
      {
        name: "其他框架",
        items: ["CrewAI 多Agent协作", "AutoGen 对话式Agent", "Dify 低代码平台", "Coze 字节跳动平台"],
        resources: [
          { name: "CrewAI 官网", url: "https://www.crewai.com/", type: "官方" },
          { name: "AutoGen GitHub", url: "https://github.com/microsoft/autogen", type: "开源" },
        ],
      },
    ],
    project: "用 LangChain 做一个带工具调用的 Agent",
  },
  {
    stage: "第三阶段",
    title: "核心技能",
    duration: "3-4个月",
    color: "from-purple-500 to-pink-500",
    icon: <Brain className="size-5" />,
    goal: "掌握 RAG、Function Calling、MCP 等核心技术",
    skills: [
      {
        name: "RAG 检索增强生成",
        items: ["向量数据库（Pinecone/Chroma/Weaviate）", "文档加载与分割", "Embedding 模型", "检索策略与重排序"],
        resources: [
          { name: "Pinecone 学习中心", url: "https://www.pinecone.io/learn/", type: "教程" },
          { name: "Chroma 文档", url: "https://docs.trychroma.com/", type: "官方" },
        ],
      },
      {
        name: "Function Calling / Tool Use",
        items: ["工具定义与描述", "参数 Schema 设计", "工具调用链", "错误处理"],
        resources: [
          { name: "OpenAI Function Calling", url: "https://platform.openai.com/docs/guides/function-calling", type: "官方" },
          { name: "Anthropic Tool Use", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", type: "官方" },
        ],
      },
      {
        name: "MCP 协议",
        items: ["MCP 架构原理", "Server 开发", "Client 集成", "工具与资源"],
        resources: [
          { name: "MCP 官方文档", url: "https://modelcontextprotocol.io/", type: "官方" },
          { name: "MCP Servers GitHub", url: "https://github.com/modelcontextprotocol/servers", type: "开源" },
        ],
      },
    ],
    project: "做一个 RAG 知识库问答系统",
  },
  {
    stage: "第四阶段",
    title: "进阶实战",
    duration: "4-6个月",
    color: "from-orange-500 to-red-500",
    icon: <Rocket className="size-5" />,
    goal: "能设计和实现复杂的多 Agent 系统",
    skills: [
      {
        name: "多 Agent 系统",
        items: ["Agent 角色设计", "任务分解与分配", "通信与协调", "冲突解决"],
        resources: [
          { name: "CrewAI 文档", url: "https://docs.crewai.com/", type: "官方" },
          { name: "AutoGen 教程", url: "https://microsoft.github.io/autogen/", type: "官方" },
        ],
      },
      {
        name: "记忆系统",
        items: ["短期记忆（上下文）", "长期记忆（向量库）", "工作记忆（状态）", "记忆检索与更新"],
        resources: [
          { name: "Mem0 文档", url: "https://docs.mem0.ai/", type: "官方" },
          { name: "Letta (MemGPT)", url: "https://www.letta.com/", type: "开源" },
        ],
      },
      {
        name: "评估与优化",
        items: ["准确率与完成率", "A/B 测试", "成本优化", "延迟优化"],
        resources: [
          { name: "LangSmith", url: "https://smith.langchain.com/", type: "平台" },
          { name: "LangFuse", url: "https://langfuse.com/", type: "开源" },
        ],
      },
    ],
    project: "做一个多 Agent 协作的研究系统",
  },
  {
    stage: "第五阶段",
    title: "生产部署",
    duration: "6个月+",
    color: "from-violet-500 to-purple-500",
    icon: <Server className="size-5" />,
    goal: "能将 Agent 系统部署到生产环境",
    skills: [
      {
        name: "工程化",
        items: ["API 设计（FastAPI）", "容器化（Docker）", "消息队列（Redis）", "CI/CD 流水线"],
        resources: [
          { name: "FastAPI 文档", url: "https://fastapi.tiangolo.com/", type: "官方" },
          { name: "Docker 入门", url: "https://docs.docker.com/get-started/", type: "官方" },
        ],
      },
      {
        name: "监控与可观测",
        items: ["日志收集", "性能监控", "错误追踪", "成本监控"],
        resources: [
          { name: "LangSmith 监控", url: "https://smith.langchain.com/", type: "平台" },
        ],
      },
      {
        name: "安全与合规",
        items: ["Prompt 注入防护", "内容过滤", "数据隐私", "成本控制"],
        resources: [
          { name: "OWASP LLM Top 10", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", type: "标准" },
        ],
      },
    ],
    project: "部署一个生产级 Agent 应用",
  },
];

const TECH_STACK = [
  {
    category: "Agent 框架",
    icon: <Workflow className="size-5" />,
    color: "from-blue-500 to-cyan-500",
    items: [
      { name: "LangChain", desc: "最流行的 LLM 应用框架", stars: "95K+", url: "https://github.com/langchain-ai/langchain" },
      { name: "LangGraph", desc: "状态图驱动的 Agent 框架", stars: "8K+", url: "https://github.com/langchain-ai/langgraph" },
      { name: "CrewAI", desc: "多 Agent 协作框架", stars: "25K+", url: "https://github.com/crewAIInc/crewAI" },
      { name: "AutoGen", desc: "微软出品，对话式 Agent", stars: "35K+", url: "https://github.com/microsoft/autogen" },
      { name: "Dify", desc: "低代码 LLM 应用平台", stars: "60K+", url: "https://github.com/langgenius/dify" },
    ],
  },
  {
    category: "向量数据库",
    icon: <Database className="size-5" />,
    color: "from-green-500 to-emerald-500",
    items: [
      { name: "Chroma", desc: "轻量级嵌入式向量库", stars: "16K+", url: "https://github.com/chroma-core/chroma" },
      { name: "Pinecone", desc: "云原生向量数据库", stars: "商业", url: "https://www.pinecone.io/" },
      { name: "Weaviate", desc: "开源向量搜索引擎", stars: "12K+", url: "https://github.com/weaviate/weaviate" },
      { name: "Milvus", desc: "高性能向量数据库", stars: "32K+", url: "https://github.com/milvus-io/milvus" },
      { name: "Qdrant", desc: "Rust 实现的向量库", stars: "22K+", url: "https://github.com/qdrant/qdrant" },
    ],
  },
  {
    category: "LLM 提供商",
    icon: <Cpu className="size-5" />,
    color: "from-purple-500 to-pink-500",
    items: [
      { name: "OpenAI", desc: "GPT-4o、GPT-4、o1", stars: "商业", url: "https://platform.openai.com/" },
      { name: "Anthropic", desc: "Claude 4 Opus/Sonnet", stars: "商业", url: "https://console.anthropic.com/" },
      { name: "Google", desc: "Gemini 2.0 Pro/Flash", stars: "商业", url: "https://ai.google.dev/" },
      { name: "DeepSeek", desc: "国产开源大模型", stars: "开源", url: "https://platform.deepseek.com/" },
      { name: "Ollama", desc: "本地运行开源模型", stars: "120K+", url: "https://github.com/ollama/ollama" },
    ],
  },
  {
    category: "监控与评估",
    icon: <Target className="size-5" />,
    color: "from-orange-500 to-red-500",
    items: [
      { name: "LangSmith", desc: "LangChain 官方监控平台", stars: "商业", url: "https://smith.langchain.com/" },
      { name: "LangFuse", desc: "开源 LLM 可观测平台", stars: "8K+", url: "https://github.com/langfuse/langfuse" },
      { name: "Phoenix", desc: "Arize 出品的可观测工具", stars: "5K+", url: "https://github.com/Arize-ai/phoenix" },
      { name: "Ragas", desc: "RAG 评估框架", stars: "7K+", url: "https://github.com/explodinggradients/ragas" },
    ],
  },
  {
    category: "MCP 工具",
    icon: <Zap className="size-5" />,
    color: "from-yellow-500 to-amber-500",
    items: [
      { name: "MCP SDK", desc: "官方 MCP 开发包", stars: "官方", url: "https://github.com/modelcontextprotocol/sdk" },
      { name: "MCP Servers", desc: "官方 MCP 服务器集合", stars: "15K+", url: "https://github.com/modelcontextprotocol/servers" },
      { name: "Context7", desc: "实时文档获取", stars: "10K+", url: "https://github.com/upstash/context7" },
      { name: "Puppeteer MCP", desc: "浏览器自动化", stars: "官方", url: "https://github.com/modelcontextprotocol/servers" },
    ],
  },
  {
    category: "开发工具",
    icon: <Code className="size-5" />,
    color: "from-teal-500 to-cyan-500",
    items: [
      { name: "Claude Code", desc: "Anthropic 官方 CLI 工具", stars: "官方", url: "https://github.com/anthropics/claude-code" },
      { name: "Cursor", desc: "AI 编辑器", stars: "商业", url: "https://cursor.sh/" },
      { name: "Windsurf", desc: "Codeium 出品的 AI IDE", stars: "商业", url: "https://codeium.com/windsurf" },
      { name: "Vercel AI SDK", desc: "前端 AI 开发工具包", stars: "15K+", url: "https://github.com/vercel/ai" },
    ],
  },
];

const CAREER_PATH = [
  {
    level: "初级 Agent 工程师",
    salary: "20-35K/月",
    experience: "0-2年",
    requirements: ["掌握至少一个 Agent 框架", "能独立开发简单 Agent", "了解 RAG 和向量数据库", "有 Python/TS 开发能力"],
    interviewQuestions: [
      "什么是 RAG？如何实现？",
      "Function Calling 的工作原理？",
      "如何设计一个好的 System Prompt？",
      "向量数据库的选型考虑？",
    ],
  },
  {
    level: "中级 Agent 工程师",
    salary: "35-60K/月",
    experience: "2-4年",
    requirements: ["能设计复杂的 Agent 架构", "掌握多 Agent 协作系统", "有生产环境部署经验", "能进行性能优化和成本控制"],
    interviewQuestions: [
      "如何设计一个多 Agent 系统？",
      "Agent 的记忆系统如何设计？",
      "如何评估 Agent 的效果？",
      "如何处理 Agent 的幻觉问题？",
    ],
  },
  {
    level: "高级 Agent 工程师",
    salary: "60-100K+/月",
    experience: "4年+",
    requirements: ["能设计企业级 Agent 平台", "深入理解 LLM 原理和前沿", "有团队管理和技术决策能力", "能推动 Agent 技术的业务落地"],
    interviewQuestions: [
      "如何设计一个 Agent 平台的架构？",
      "Agent 的安全问题如何解决？",
      "如何评估和选择 LLM？",
      "Agent 技术的未来趋势？",
    ],
  },
];

const PROJECTS = [
  {
    name: "智能客服 Agent",
    difficulty: "初级",
    duration: "2周",
    tech: ["LangChain", "RAG", "Chroma"],
    desc: "基于知识库的智能客服系统",
    steps: ["搭建知识库", "实现 RAG 检索", "设计对话流程", "添加人工转接"],
  },
  {
    name: "代码助手 Agent",
    difficulty: "初级",
    duration: "3周",
    tech: ["Claude API", "Function Calling", "Git"],
    desc: "能理解代码库并提供修改建议",
    steps: ["代码索引", "上下文管理", "代码生成", "测试验证"],
  },
  {
    name: "研究助手 Agent",
    difficulty: "中级",
    duration: "4周",
    tech: ["CrewAI", "Web Search", "RAG"],
    desc: "多 Agent 协作的研究系统",
    steps: ["任务分解", "信息收集", "分析综合", "报告生成"],
  },
  {
    name: "自动化工作流 Agent",
    difficulty: "中级",
    duration: "4周",
    tech: ["LangGraph", "MCP", "API集成"],
    desc: "自动执行复杂业务流程",
    steps: ["流程建模", "工具集成", "错误处理", "监控告警"],
  },
  {
    name: "多模态 Agent",
    difficulty: "高级",
    duration: "6周",
    tech: ["GPT-4V", "Whisper", "DALL-E"],
    desc: "支持文本、图片、语音的多模态Agent",
    steps: ["多模态理解", "工具协调", "结果合成", "用户交互"],
  },
  {
    name: "自主学习 Agent",
    difficulty: "高级",
    duration: "8周",
    tech: ["LangGraph", "Memory", "Self-Reflection"],
    desc: "能从经验中学习和改进的Agent",
    steps: ["经验记录", "反思机制", "策略更新", "效果评估"],
  },
];

// ===== 组件 =====

export default function AIAgentGuide() {
  const [activeTab, setActiveTab] = useState("path");
  const [expandedStage, setExpandedStage] = useState<number | null>(0);
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">AI Agent 工程师学习指南</h2>
        <p className="text-sm text-muted-foreground mt-1">
          从零到一 · 5个阶段 · 完整学习路线 · 实战项目
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/60 mb-4 flex-wrap">
          <TabsTrigger value="path" className="gap-1.5">
            <GraduationCap className="size-3.5" />
            学习路线
          </TabsTrigger>
          <TabsTrigger value="tech" className="gap-1.5">
            <Layers className="size-3.5" />
            技术栈
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-1.5">
            <Code className="size-3.5" />
            实战项目
          </TabsTrigger>
          <TabsTrigger value="career" className="gap-1.5">
            <Target className="size-3.5" />
            职业发展
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-1.5">
            <BookOpen className="size-3.5" />
            学习资源
          </TabsTrigger>
        </TabsList>

        {/* 学习路线 */}
        <TabsContent value="path">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">5阶段学习路线</h3>
              <Badge variant="outline" className="text-xs">总计 6-12个月</Badge>
            </div>

            {LEARNING_PATH.map((stage, i) => (
              <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden">
                <button
                  onClick={() => setExpandedStage(expandedStage === i ? null : i)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <div className={`size-12 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shrink-0`}>
                    {stage.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{stage.stage}</span>
                      <h4 className="text-sm font-bold">{stage.title}</h4>
                      <Badge variant="outline" className="text-[10px]">
                        <Clock className="size-3 mr-1" />
                        {stage.duration}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">目标：{stage.goal}</p>
                  </div>
                  {expandedStage === i ? (
                    <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {expandedStage === i && (
                  <div className="px-4 pb-4 animate-fade-in-up space-y-4">
                    {stage.skills.map((skill, j) => (
                      <div key={j} className="rounded-lg bg-background/50 p-3">
                        <h5 className="text-xs font-bold text-foreground mb-2">{skill.name}</h5>
                        <div className="space-y-1 mb-2">
                          {skill.items.map((item, k) => (
                            <div key={k} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="size-3 text-green-400 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {skill.resources.map((res, k) => (
                            <a
                              key={k}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              <ExternalLink className="size-2.5" />
                              {res.name}
                              <Badge variant="outline" className="text-[8px] px-1 py-0 ml-1">{res.type}</Badge>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                      <div className="flex items-center gap-2 text-xs">
                        <Rocket className="size-3.5 text-primary" />
                        <span className="font-bold text-foreground">实战项目：</span>
                        <span className="text-muted-foreground">{stage.project}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 技术栈 */}
        <TabsContent value="tech">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">核心技术栈</h3>
              <Badge variant="outline" className="text-xs">6大类 · 30+工具</Badge>
            </div>

            {TECH_STACK.map((category, ci) => (
              <div key={ci} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`size-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}>
                    {category.icon}
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
        </TabsContent>

        {/* 实战项目 */}
        <TabsContent value="projects">
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
        </TabsContent>

        {/* 职业发展 */}
        <TabsContent value="career">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">职业发展路径</h3>
              <Badge variant="outline" className="text-xs">3个级别</Badge>
            </div>

            {CAREER_PATH.map((career, i) => (
              <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden">
                <button
                  onClick={() => setExpandedCareer(expandedCareer === i ? null : i)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <div className={`size-10 rounded-lg bg-gradient-to-br ${
                    i === 0 ? "from-green-500 to-emerald-500" :
                    i === 1 ? "from-blue-500 to-cyan-500" :
                    "from-purple-500 to-pink-500"
                  } flex items-center justify-center text-white shrink-0`}>
                    <Star className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold">{career.level}</h4>
                      <Badge variant="outline" className="text-[10px]">{career.experience}</Badge>
                    </div>
                    <p className="text-xs text-green-400 font-medium mt-0.5">{career.salary}</p>
                  </div>
                  {expandedCareer === i ? (
                    <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                {expandedCareer === i && (
                  <div className="px-4 pb-4 animate-fade-in-up space-y-3">
                    <div>
                      <h5 className="text-xs font-bold text-foreground mb-2">技能要求</h5>
                      <div className="space-y-1">
                        {career.requirements.map((req, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="size-3 text-green-400 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground mb-2">面试高频问题</h5>
                      <div className="space-y-1">
                        {career.interviewQuestions.map((q, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-primary font-bold shrink-0">Q{j + 1}.</span>
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <h4 className="text-sm font-bold mb-2">💡 职业建议</h4>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li><strong>边学边做</strong> — 每学一个概念就写代码实践</li>
                <li><strong>做项目</strong> — 从小项目开始，逐步增加复杂度</li>
                <li><strong>读源码</strong> — LangChain、CrewAI 的源码是最好的教材</li>
                <li><strong>关注前沿</strong> — 关注 Anthropic、OpenAI 的最新发布</li>
                <li><strong>加入社区</strong> — 和其他开发者交流，参与开源项目</li>
                <li><strong>写博客</strong> — 输出是最好的学习方式</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* 学习资源 */}
        <TabsContent value="resources">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">学习资源汇总</h3>
              <Badge variant="outline" className="text-xs">精选资源</Badge>
            </div>

            {/* 官方文档 */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">📚 官方文档</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "OpenAI Platform", url: "https://platform.openai.com/docs", desc: "GPT API 文档" },
                  { name: "Anthropic Docs", url: "https://docs.anthropic.com", desc: "Claude API 文档" },
                  { name: "LangChain", url: "https://python.langchain.com", desc: "LangChain Python 文档" },
                  { name: "MCP Protocol", url: "https://modelcontextprotocol.io", desc: "MCP 协议文档" },
                ].map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex-1">
                      <span className="text-sm font-bold">{res.name}</span>
                      <p className="text-xs text-muted-foreground">{res.desc}</p>
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            {/* 视频教程 */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">🎥 视频教程</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "李宏毅 生成式AI", url: "https://www.bilibili.com/video/BV1TD421Q7Fy", desc: "中文 AI 入门最佳" },
                  { name: "LangChain 入门", url: "https://www.youtube.com/results?search_query=langchain+tutorial", desc: "LangChain 教程" },
                  { name: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/", desc: "Andrew Ng 短课程" },
                  { name: "CrewAI 教程", url: "https://www.youtube.com/results?search_query=crewai+tutorial", desc: "多Agent教程" },
                ].map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex-1">
                      <span className="text-sm font-bold">{res.name}</span>
                      <p className="text-xs text-muted-foreground">{res.desc}</p>
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            {/* 社区 */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">🌐 社区</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: "LangChain Discord", url: "https://discord.gg/langchain", desc: "LangChain 官方社区" },
                  { name: "r/LangChain", url: "https://reddit.com/r/LangChain", desc: "Reddit LangChain 社区" },
                  { name: "Hugging Face", url: "https://huggingface.co/", desc: "AI 模型和数据集" },
                  { name: "GitHub Trending", url: "https://github.com/trending", desc: "热门开源项目" },
                ].map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex-1">
                      <span className="text-sm font-bold">{res.name}</span>
                      <p className="text-xs text-muted-foreground">{res.desc}</p>
                    </div>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            {/* 书籍 */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">📖 推荐书籍</h4>
              <div className="space-y-2">
                {[
                  { name: "Building LLM Apps", author: "O'Reilly", desc: "LLM 应用开发实战" },
                  { name: "LangChain 实战", author: "中文社区", desc: "LangChain 框架详解" },
                  { name: "AI Agent 开发指南", author: "多位作者", desc: "Agent 开发最佳实践" },
                  { name: "Prompt Engineering Guide", author: "社区", desc: "提示词工程指南" },
                ].map((book, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5">
                    <BookOpen className="size-5 text-primary shrink-0" />
                    <div>
                      <span className="text-sm font-bold">{book.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">— {book.author}</span>
                      <p className="text-xs text-muted-foreground">{book.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
