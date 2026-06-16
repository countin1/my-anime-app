// ========== 技能树数据 ==========
export const SKILL_TREE = [
  {
    stage: "Prompt 工程",
    icon: "Sparkles",
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
    icon: "Search",
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
    icon: "Cpu",
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
    icon: "Rocket",
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
export const PROMPT_TEMPLATES = [
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
export const INTERVIEW_SCRIPTS = [
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
    content: "我做 RAG 系统的评测和优化。用 RAGAS 框架的 4 个指标评测检索和生成质量，然后做了 chunk_size 和 top_k 的消融实验，发现 chunk_size=800、top_k=3 在中文场景下最优。还对比了不同 Embedding 模型，发现 bge-large-zh 在中文检索任务上比 all-MiniLM-L6-v2 好 15%。",
  },
  {
    title: "模型微调",
    content: "我用 LoRA 微调了 Qwen2.5-7B，训练数据是从经济学评测题构造的，每题增强了 3 个变体。微调后在统计知识维度上 Cohen's d = 0.73，配对 t 检验 p<0.01，显著优于基座模型。用 QLoRA 4bit 量化后，7B 模型只需要 6GB 显存，RTX 3060 就能跑。",
  },
];

// ========== 学习计划数据 ==========
export const LEARNING_PLAN = [
  {
    week: "Week 1-2",
    title: "Prompt 工程评测 + 自动优化",
    icon: "Sparkles",
    color: "from-purple-500 to-pink-500",
    days: [
      {
        day: "Day 1-2",
        title: "基础对比：zero-shot vs CoT",
        tasks: [
          "理解 zero-shot / few-shot / CoT 的区别",
          "运行 compare_prompts.py 对比两种策略",
          "学习配对 t 检验和 Cohen's d 效应量",
        ],
        command: "python compare_prompts.py --max-questions 10 --score-mode rule",
        status: "available",
        interview: "我用配对 t 检验比较了 zero-shot 和 CoT，发现 CoT 在统计题上显著更优 (p<0.05)。",
      },
      {
        day: "Day 3-4",
        title: "组件分析：role/format/reasoning",
        tasks: [
          "理解 Prompt 的 4 个组件维度",
          "运行 prompt_optimizer.py 做组件贡献分析",
          "找出 professor + structured + cot 最优组合",
        ],
        command: "python prompt_optimizer.py --max-questions 15",
        status: "available",
        interview: "我做了组件贡献分析，发现 professor + structured + cot 组合在统计题上效果最优。",
      },
      {
        day: "Day 5-6",
        title: "贝叶斯优化：智能搜索最优模板",
        tasks: [
          "理解高斯过程和期望改进 (EI) 原理",
          "运行 prompt_bayesian.py 做贝叶斯优化",
          "对比网格搜索 vs 贝叶斯优化效率",
        ],
        command: "python prompt_bayesian.py --iterations 20 --max-questions 10",
        status: "available",
        interview: "贝叶斯优化只用 20 次迭代就找到接近最优配置，比网格搜索节省 60% API 调用。",
      },
      {
        day: "Day 7-8",
        title: "生成面试级报告",
        tasks: [
          "完整运行优化流程，生成统计报告",
          "整理最优模板和提升幅度",
          "练习面试话术",
        ],
        command: "python prompt_efficiency_compare.py --max-questions 10 --budget 30",
        status: "available",
        interview: "在统计题上比 baseline 提升 15%，Cohen's d = 0.73，配对 t 检验 p < 0.01。",
      },
    ],
  },
  {
    week: "Week 3-4",
    title: "大模型微调 (LoRA/QLoRA)",
    icon: "Cpu",
    color: "from-orange-500 to-red-500",
    days: [
      {
        day: "Day 9-10",
        title: "学习 LoRA 原理",
        tasks: [
          "理解 LoRA 低秩分解的核心思想",
          "学习 r/alpha/target_modules 参数含义",
          "理解 QLoRA 4bit 量化如何省显存",
        ],
        command: "",
        status: "available",
        interview: "LoRA 把大矩阵分解成两个小矩阵，r=8 时只训练 0.4% 参数，减少 99.6%。",
      },
      {
        day: "Day 11-12",
        title: "准备训练数据",
        tasks: [
          "运行 finetune_data.py 生成 Chat 格式数据",
          "理解数据增强（多表述变体）",
          "学习分层划分 train/test",
        ],
        command: "python finetune_data.py --augment 3 --format chat",
        status: "available",
        interview: "我用数据增强把 80 道题扩展到 320 条训练样本，按维度分层划分保证分布一致。",
      },
      {
        day: "Day 13-15",
        title: "运行 LoRA 微调 (需 GPU)",
        tasks: [
          "配置 GPU 环境 (AutoDL/本地 3090)",
          "运行 finetune_lora.py 微调 Qwen2.5-7B",
          "尝试 QLoRA 4bit 量化",
        ],
        command: "python finetune_lora.py --model Qwen/Qwen2.5-7B --epochs 3 --qlora",
        status: "locked",
        interview: "用 QLoRA 4bit 量化后，7B 模型只需要 6GB 显存，RTX 3060 就能跑。",
      },
      {
        day: "Day 16-17",
        title: "统计验证微调效果",
        tasks: [
          "运行 evaluate.py 做前后对比",
          "学习配对 t 检验和 Cohen's d",
          "分析各维度提升幅度",
        ],
        command: "python evaluate.py --base-model Qwen/Qwen2.5-7B --adapter-path outputs/adapters/lora_adapter",
        status: "locked",
        interview: "微调后在统计知识维度上 Cohen's d = 0.73，配对 t 检验 p<0.01，显著优于基座模型。",
      },
    ],
  },
  {
    week: "Week 5-6",
    title: "RAG 系统评测与优化",
    icon: "Search",
    color: "from-blue-500 to-cyan-500",
    days: [
      {
        day: "Day 18-19",
        title: "搭建基础 RAG",
        tasks: [
          "理解 RAG 流程：加载→分块→嵌入→检索→生成",
          "运行 rag_qa.py 搭建基础系统",
          "测试几个问题看效果",
        ],
        command: "python rag_qa.py --build",
        status: "available",
        interview: "RAG 系统的核心流程是：文档解析→语义分块→Embedding→向量索引→检索→LLM 生成。",
      },
      {
        day: "Day 20-21",
        title: "RAGAS 评测",
        tasks: [
          "理解 RAGAS 的 4 个指标",
          "运行 rag_evaluate.py 生成评测数据",
          "分析各项得分",
        ],
        command: "python rag_evaluate.py --num-questions 20",
        status: "available",
        interview: "用 RAGAS 框架评测，包括忠实度、相关性、完整性、连贯性 4 个维度。",
      },
      {
        day: "Day 22-23",
        title: "消融实验",
        tasks: [
          "测试不同 chunk_size (200/400/800/1200)",
          "测试不同 top_k (1/3/5/7)",
          "找出最优参数组合",
        ],
        command: "python rag_ablation.py --chunk-sizes 200 400 800 1200 --top-ks 1 3 5 7",
        status: "available",
        interview: "做了 chunk_size 和 top_k 的消融实验，发现 chunk_size=800、top_k=3 在中文场景下最优。",
      },
    ],
  },
  {
    week: "Week 7-8",
    title: "整合与面试准备",
    icon: "Trophy",
    color: "from-yellow-500 to-orange-500",
    days: [
      {
        day: "Day 24-25",
        title: "整合所有技能",
        tasks: [
          "回顾所有项目的面试话术",
          "准备项目演示流程",
          "模拟面试练习",
        ],
        command: "",
        status: "available",
        interview: "我会展示完整的 AI 工程能力：Prompt 优化、RAG 系统、模型微调、统计评测。",
      },
      {
        day: "Day 26-28",
        title: "查漏补缺",
        tasks: [
          "复习薄弱环节",
          "准备常见面试问题",
          "整理代码仓库和文档",
        ],
        command: "",
        status: "available",
        interview: "每个项目我都能说清楚：做了什么、怎么做的、效果如何、有什么收获。",
      },
    ],
  },
];
