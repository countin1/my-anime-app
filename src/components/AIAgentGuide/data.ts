// ===== 学习路径数据 =====
export const LEARNING_PATH = [
  {
    stage: "第一阶段",
    title: "基础入门",
    duration: "1-2个月",
    color: "from-green-500 to-emerald-500",
    icon: "BookOpen",
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
    icon: "Bot",
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
    icon: "Brain",
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
    icon: "Rocket",
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
    icon: "Server",
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

// ===== 技术栈数据 =====
export const TECH_STACK = [
  {
    category: "Agent 框架",
    icon: "Workflow",
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
    icon: "Database",
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
    icon: "Cpu",
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
    icon: "Target",
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
    icon: "Zap",
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
    icon: "Code",
    color: "from-teal-500 to-cyan-500",
    items: [
      { name: "Claude Code", desc: "Anthropic 官方 CLI 工具", stars: "官方", url: "https://github.com/anthropics/claude-code" },
      { name: "Cursor", desc: "AI 编辑器", stars: "商业", url: "https://cursor.sh/" },
      { name: "Windsurf", desc: "Codeium 出品的 AI IDE", stars: "商业", url: "https://codeium.com/windsurf" },
      { name: "Vercel AI SDK", desc: "前端 AI 开发工具包", stars: "15K+", url: "https://github.com/vercel/ai" },
    ],
  },
];

// ===== 职业路径数据 =====
export const CAREER_PATH = [
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
      "如何优化 Agent 的响应延迟？",
    ],
  },
  {
    level: "高级 Agent 工程师",
    salary: "60-100K/月",
    experience: "4年+",
    requirements: ["能设计企业级 Agent 平台", "掌握 Agent 安全和合规", "有团队管理经验", "能进行技术选型和架构决策"],
    interviewQuestions: [
      "如何设计一个 Agent 平台的架构？",
      "Agent 的安全风险有哪些？",
      "如何进行 Agent 的 A/B 测试？",
      "如何控制 Agent 的成本？",
    ],
  },
];

// ===== 实战项目数据 =====
export const PROJECTS = [
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
