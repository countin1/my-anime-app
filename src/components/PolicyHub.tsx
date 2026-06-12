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
import { TIMELINE, BUDGET_DATA, KEY_DOCUMENTS } from "./PolicyHub/data";

const INVESTMENT_DIRECTIONS = [
  {
    name: "科技创新与自主可控",
    amount: "5万亿+",
    percent: 17,
    icon: <Cpu className="size-5" />,
    color: "from-blue-500 to-cyan-500",
    items: [
      "半导体（芯片设计/制造/材料/EDA工具）",
      "人工智能（大模型、AI芯片、智算中心）",
      "量子科技（量子计算、量子通信、量子测量）",
      "生物技术（基因编辑、合成生物、创新药）",
      "航空航天（商业航天、大飞机C919、卫星互联网）",
      "基础软件（操作系统、数据库、工业软件）",
      "新材料（碳纤维、第三代半导体、稀土功能材料）",
    ],
    signal: "2025年首次提出'AI+行动'，R&D经费年增>7%",
    detail: "科技自立自强是国家发展的战略支撑。半导体领域重点突破光刻机、EDA工具等卡脖子环节；人工智能从大模型训练转向行业应用落地；量子科技进入工程化阶段。",
    policy: "《关于全面深化科技体制改革 加快建设科技强国的决定》",
    opportunities: ["AI+行业应用解决方案", "国产替代供应链", "智算中心建设运营", "商业航天产业链"],
  },
  {
    name: "新型基础设施",
    amount: "4万亿+",
    percent: 13,
    icon: <Building2 className="size-5" />,
    color: "from-purple-500 to-pink-500",
    items: [
      "数字基建（5G/6G、数据中心、算力网络）",
      "交通（高铁、城轨、低空经济、通用航空）",
      "水利（南水北调、防洪工程、水网建设）",
      "能源（特高压、智能电网、分布式能源）",
      "城市更新（老旧小区改造、地下管网、海绵城市）",
      "物流（国家物流枢纽、多式联运）",
    ],
    signal: "低空经济首次写入2024年政府工作报告",
    detail: "新基建是扩大内需的重要抓手。低空经济（eVTOL、无人机物流）成为新增长点；算力网络建设支撑AI产业发展；城市更新投资规模超万亿。",
    policy: "《新型基础设施建设规划》、2024年政府工作报告",
    opportunities: ["低空经济（eVTOL制造、运营、基础设施）", "算力中心建设", "城市更新项目", "智慧物流系统"],
  },
  {
    name: "绿色低碳转型",
    amount: "3万亿+",
    percent: 10,
    icon: <Leaf className="size-5" />,
    color: "from-green-500 to-emerald-500",
    items: [
      "新能源（光伏、风电、氢能、核能）",
      "储能（抽水蓄能、电化学储能、压缩空气）",
      "碳市场（全国碳交易、CCUS碳捕集）",
      "电动化（新能源汽车、充换电基础设施）",
      "绿色建筑（零碳建筑、既有建筑节能改造）",
      "循环经济（废旧资源回收、再制造）",
    ],
    signal: "2030年碳达峰倒计时，十五五是关键冲刺期",
    detail: "双碳目标驱动能源结构根本性变革。新能源装机占比持续提升；全国碳市场扩容纳入更多行业；新能源汽车渗透率超50%后进入存量竞争阶段。",
    policy: "《关于加快经济社会发展全面绿色转型的意见》、碳达峰碳中和'1+N'政策体系",
    opportunities: ["新型储能技术", "氢能产业链", "碳资产管理", "绿色金融产品"],
  },
  {
    name: "民生保障与公共服务",
    amount: "3万亿+",
    percent: 10,
    icon: <Heart className="size-5" />,
    color: "from-pink-500 to-rose-500",
    items: [
      "养老（银发经济、适老化改造、长期护理险）",
      "医疗（公立医院改革、基层医疗、中医药）",
      "教育（职业教育、高等教育、产教融合）",
      "住房（保障性住房、城中村改造、租购并举）",
      "就业（技能培训、创业支持、灵活就业保障）",
      "社保（养老金提标、医保改革、生育支持）",
    ],
    signal: "2035年基本公共服务均等化目标倒逼",
    detail: "人口老龄化加速（60岁以上超3亿），银发经济市场规模超7万亿。养老金连续20年上调；医保改革推进门诊共济；生育政策从限制转向鼓励。",
    policy: "《关于发展银发经济增进老年人福祉的意见》",
    opportunities: ["养老服务产业", "康复医疗器械", "职业教育培训", "保障房建设运营"],
  },
  {
    name: "粮食安全与乡村振兴",
    amount: "2万亿+",
    percent: 7,
    icon: <Wheat className="size-5" />,
    color: "from-amber-500 to-yellow-500",
    items: [
      "高标准农田（建设10亿亩目标）",
      "种业振兴（生物育种、基因编辑、分子育种）",
      "冷链物流（农产品仓储物流、产地预冷）",
      "数字乡村（农村电商、智慧农业、遥感监测）",
      "粮食储备（粮库建设、应急保障体系）",
      "特色产业（预制菜、地理标志产品、乡村旅游）",
    ],
    signal: "粮食安全连续多年列为'国之大者'",
    detail: "中国粮食产量连续9年稳定在1.3万亿斤以上，但大豆、玉米等仍依赖进口。种业振兴行动推进生物育种产业化；冷链物流短板加速补齐。",
    policy: "《种业振兴行动方案》、中央一号文件",
    opportunities: ["生物育种技术", "冷链物流基础设施", "预制菜产业", "数字农业平台"],
  },
  {
    name: "国家安全与应急能力",
    amount: "2万亿+",
    percent: 7,
    icon: <Shield className="size-5" />,
    color: "from-slate-500 to-gray-500",
    items: [
      "能源安全（战略石油储备、油气管网、煤炭兜底）",
      "产业链安全（关键零部件国产替代、供应链多元化）",
      "数据安全（数据基础设施、隐私计算、数据跨境）",
      "应急体系（防灾减灾、应急物资储备、消防救援）",
      "国防（军事现代化、军民融合）",
      "金融安全（防范化解风险、地方债化解）",
    ],
    signal: "二十大首次将'安全'与'发展'并列",
    detail: "统筹发展和安全成为新时代主题。能源安全方面推进多元化进口和新能源替代；产业链安全重点突破芯片、工业软件等卡脖子环节；数据安全立法加速。",
    policy: "《国家安全战略纲要》、《数据安全法》",
    opportunities: ["网络安全服务", "应急物资生产", "国产替代产品", "数据安全解决方案"],
  },
  {
    name: "区域协调发展",
    amount: "2万亿+",
    percent: 7,
    icon: <Globe className="size-5" />,
    color: "from-teal-500 to-cyan-500",
    items: [
      "京津冀（雄安新区建设、非首都功能疏解）",
      "长三角（一体化、G60科创走廊、虹桥国际开放枢纽）",
      "粤港澳（大湾区、前海/横琴/南沙三大平台）",
      "成渝（双城经济圈、西部科学城）",
      "中部（长江中游城市群、中部崛起）",
      "西部（新疆、西藏、陆海新通道、西部大开发）",
    ],
    signal: "五大城市群承载60%以上投资",
    detail: "区域协调发展战略深入实施。雄安新区进入大规模建设阶段；长三角一体化向纵深推进；成渝双城经济圈成为第四增长极；西部陆海新通道打通南向出海口。",
    policy: "《京津冀协同发展规划纲要》、《成渝地区双城经济圈建设规划纲要》",
    opportunities: ["雄安新区建设项目", "大湾区科创合作", "成渝产业转移承接", "陆海新通道物流"],
  },
  {
    name: "数字经济与数据要素",
    amount: "1.5万亿+",
    percent: 5,
    icon: <Zap className="size-5" />,
    color: "from-violet-500 to-purple-500",
    items: [
      "数据交易（数据交易所、数据资产入表、数据确权）",
      "产业数字化（工业互联网、智能制造、数字孪生）",
      "数字政府（政务数字化、智慧城市、一网通办）",
      "平台经济（规范发展、国际化出海、AI应用）",
      "数字人民币（试点扩大、跨境支付）",
    ],
    signal: "数据二十条发布，数据成为第五大生产要素",
    detail: "数据要素市场化配置加速。全国已成立50+数据交易所；数据资产入表推动企业数据价值显性化；数字人民币试点扩至17省；平台经济从整顿转向规范发展。",
    policy: "《数据二十条》、《数字中国建设整体布局规划》、《数据要素×三年行动计划》",
    opportunities: ["数据交易服务", "工业互联网平台", "智慧城市解决方案", "数字人民币应用"],
  },
  {
    name: "现代服务业与消费",
    amount: "1.5万亿+",
    percent: 5,
    icon: <TrendingUp className="size-5" />,
    color: "from-rose-500 to-orange-500",
    items: [
      "文化旅游（文旅融合、数字文旅、入境旅游）",
      "健康服务（健康管理、康复医疗、心理健康）",
      "体育经济（体育产业、赛事经济、冰雪经济）",
      "家政服务（提质扩容、标准化、数字化）",
      "新型消费（直播电商、即时零售、国潮品牌）",
    ],
    signal: "扩大内需是2025年首要任务",
    detail: "消费对GDP贡献率超60%。以旧换新政策带动家电、汽车消费；文旅消费爆发式增长（淄博烧烤、哈尔滨冰雪）；直播电商规模超5万亿。",
    policy: "《关于恢复和扩大消费的措施》",
    opportunities: ["文旅IP开发", "健康养老服务", "国潮品牌打造", "即时零售供应链"],
  },
  {
    name: "高水平对外开放",
    amount: "1万亿+",
    percent: 3,
    icon: <Globe className="size-5" />,
    color: "from-cyan-500 to-blue-500",
    items: [
      "一带一路（基础设施互联互通、产能合作）",
      "自贸区（自贸试验区提升战略、海南自贸港）",
      "RCEP深化（区域产业链整合、贸易便利化）",
      "进博会（扩大进口、国际采购）",
      "跨境电商（海外仓、独立站、品牌出海）",
    ],
    signal: "高水平开放是二十大明确的战略方向",
    detail: "一带一路进入高质量发展阶段，从'大写意'转向'工笔画'。自贸试验区增至22个；海南自贸港2025年封关运作；跨境电商成为外贸新增长极。",
    policy: "《关于推进自由贸易试验区贸易投资便利化改革创新的若干措施》",
    opportunities: ["一带一路基建项目", "自贸区企业入驻", "跨境电商服务", "品牌出海代理"],
  },
];


const OPPORTUNITY_TABLE = [
  // === 供给侧机会 ===
  {
    category: "供给侧",
    items: [
      { direction: "AI+行业应用", opportunity: "AI大模型在医疗、教育、金融等垂直领域落地", action: "关注AI+行动政策支持的行业应用项目", signal: "2025年首次提出'AI+行动'" },
      { direction: "国产替代", opportunity: "芯片、工业软件、核心零部件国产替代", action: "布局半导体设备、EDA工具、工业软件赛道", signal: "科技自立自强连续5年强调" },
      { direction: "低空经济", opportunity: "eVTOL制造、低空物流、空中交通", action: "关注低空经济试点城市和适航认证进展", signal: "首次写入2024年政府工作报告" },
      { direction: "新型储能", opportunity: "电化学储能、压缩空气储能、液流电池", action: "关注储能技术路线和成本下降曲线", signal: "2030年碳达峰倒计时" },
    ],
  },
  // === 需求侧机会 ===
  {
    category: "需求侧",
    items: [
      { direction: "消费补贴", opportunity: "以旧换新带动家电、汽车消费", action: "关注地方消费券政策和补贴力度", signal: "超长期特别国债3000亿支持" },
      { direction: "银发经济", opportunity: "养老服务、康复医疗、适老化产品", action: "开发适老化产品和服务", signal: "60岁以上人口超3亿" },
      { direction: "文旅消费", opportunity: "文旅IP、数字文旅、入境旅游", action: "打造特色文旅IP和体验", signal: "消费对GDP贡献率超60%" },
      { direction: "新型消费", opportunity: "直播电商、即时零售、国潮品牌", action: "布局直播电商和品牌出海", signal: "直播电商规模超5万亿" },
    ],
  },
  // === 基础设施机会 ===
  {
    category: "基础设施",
    items: [
      { direction: "冷链物流", opportunity: "农产品供应链基础设施", action: "关注专项债支持的冷链项目", signal: "粮食安全列为'国之大者'" },
      { direction: "算力中心", opportunity: "智算中心、算力网络建设", action: "布局AI算力基础设施", signal: "AI+行动推动算力需求" },
      { direction: "城市更新", opportunity: "老旧小区改造、地下管网更新", action: "参与城市更新项目招标", signal: "城市更新投资规模超万亿" },
      { direction: "数字基建", opportunity: "5G/6G、数据中心、工业互联网", action: "关注新基建投资方向", signal: "数字中国建设加速" },
    ],
  },
  // === 农业与乡村机会 ===
  {
    category: "农业与乡村",
    items: [
      { direction: "数字乡村", opportunity: "农村电商供应链", action: "对接县域电商渠道", signal: "乡村振兴战略深入推进" },
      { direction: "种业振兴", opportunity: "生物育种、分子育种技术", action: "布局种业技术创新", signal: "种业振兴行动方案" },
      { direction: "预制菜", opportunity: "预制菜产业标准化、品牌化", action: "开发标准化预制菜产品", signal: "中央一号文件支持" },
      { direction: "农产品上行", opportunity: "农产品品牌化、电商化", action: "对接产地供应商和电商平台", signal: "乡村振兴产业支撑" },
    ],
  },
  // === 安全与合规机会 ===
  {
    category: "安全与合规",
    items: [
      { direction: "数据安全", opportunity: "数据安全、隐私计算、数据跨境", action: "布局数据安全解决方案", signal: "数据安全法实施" },
      { direction: "网络安全", opportunity: "网络安全服务、等级保护", action: "获取网络安全相关资质", signal: "国家安全战略" },
      { direction: "食品安全", opportunity: "临期食品规范化、食品安全追溯", action: "提前合规，获取资质", signal: "食品安全法修订" },
      { direction: "应急物资", opportunity: "应急物资生产、储备、调配", action: "参与应急物资保障体系", signal: "应急管理体系完善" },
    ],
  },
];

// ===== 新增数据：关键指标 =====
const KEY_INDICATORS = [
  {
    category: "宏观经济",
    items: [
      { name: "GDP增速目标", value: "5%左右", trend: "→", note: "连续3年设定在5%左右" },
      { name: "CPI涨幅目标", value: "2%左右", trend: "↓", note: "从3%下调至2%，关注通缩风险" },
      { name: "城镇新增就业", value: "1200万+", trend: "→", note: "连续多年保持高位" },
      { name: "城镇调查失业率", value: "5.5%左右", trend: "→", note: "就业优先政策持续" },
    ],
  },
  {
    category: "财政指标",
    items: [
      { name: "赤字率", value: "4%", trend: "↑", note: "改革开放以来最高" },
      { name: "赤字规模", value: "5.66万亿", trend: "↑", note: "比上年增加1.6万亿" },
      { name: "专项债", value: "4.4万亿", trend: "↑", note: "比上年增加5000亿" },
      { name: "超长期特别国债", value: "1.3万亿", trend: "↑", note: "比上年增加3000亿" },
      { name: "一般公共预算支出", value: "29.7万亿", trend: "↑", note: "比上年增加2万亿+" },
    ],
  },
  {
    category: "科技创新",
    items: [
      { name: "R&D经费增速", value: ">7%", trend: "↑", note: "研发投入持续加大" },
      { name: "基础研究占比", value: ">8%", trend: "↑", note: "加强原始创新" },
      { name: "数字经济占GDP", value: ">42%", trend: "↑", note: "数字经济成为主引擎" },
      { name: "5G基站数", value: "400万+", trend: "↑", note: "全球最大的5G网络" },
    ],
  },
  {
    category: "绿色发展",
    items: [
      { name: "非化石能源占比", value: "20%+", trend: "↑", note: "2030年目标25%" },
      { name: "新能源汽车渗透率", value: ">50%", trend: "↑", note: "全球领先" },
      { name: "碳排放强度下降", value: ">3.5%", trend: "↓", note: "年均下降目标" },
      { name: "森林覆盖率", value: "24.5%+", trend: "↑", note: "持续提升" },
    ],
  },
  {
    category: "民生保障",
    items: [
      { name: "养老金上调", value: "3%+", trend: "↑", note: "连续20年上调" },
      { name: "医保补助标准", value: "+30元/人", trend: "↑", note: "每人每年增加30元" },
      { name: "保障性住房", value: "加大建设", trend: "↑", note: "收购存量商品房用作保障房" },
      { name: "居民收入增速", value: "与GDP同步", trend: "→", note: "收入增长与经济增长同步" },
    ],
  },
];

// ===== 新增数据：产业政策 =====
const INDUSTRY_POLICIES = [
  {
    name: "人工智能",
    stage: "爆发期",
    policy: "AI+行动",
    support: "强",
    icon: <Cpu className="size-5" />,
    color: "from-blue-500 to-cyan-500",
    keyPoints: ["大模型训练与应用", "AI芯片自主研发", "智算中心建设", "AI+制造/医疗/教育/金融"],
    targets: "2025年AI核心产业规模超6000亿",
    opportunities: ["AI应用开发", "智算中心运营", "AI教育培训", "数据标注服务"],
  },
  {
    name: "新能源汽车",
    stage: "成熟期",
    policy: "新能源汽车产业发展规划",
    support: "强",
    icon: <Zap className="size-5" />,
    color: "from-green-500 to-emerald-500",
    keyPoints: ["电动化渗透率超50%", "智能驾驶加速落地", "充换电基础设施", "电池回收利用"],
    targets: "2025年新能源汽车销量超1500万辆",
    opportunities: ["充换电运营", "电池回收", "智能驾驶方案", "出海服务"],
  },
  {
    name: "半导体",
    stage: "攻坚期",
    policy: "集成电路产业政策",
    support: "强",
    icon: <Cpu className="size-5" />,
    color: "from-purple-500 to-pink-500",
    keyPoints: ["光刻机突破", "EDA工具国产化", "先进封装", "第三代半导体"],
    targets: "2030年芯片自给率超70%",
    opportunities: ["设备国产替代", "材料供应", "封装测试", "设计服务"],
  },
  {
    name: "生物医药",
    stage: "加速期",
    policy: "十四五生物经济发展规划",
    support: "中",
    icon: <Heart className="size-5" />,
    color: "from-pink-500 to-rose-500",
    keyPoints: ["创新药研发", "基因治疗", "医疗器械国产化", "中医药现代化"],
    targets: "2025年生物经济规模超20万亿",
    opportunities: ["CRO/CDMO服务", "基因检测", "中医药创新", "医疗AI"],
  },
  {
    name: "商业航天",
    stage: "起步期",
    policy: "商业航天发展指导意见",
    support: "中",
    icon: <Globe className="size-5" />,
    color: "from-violet-500 to-purple-500",
    keyPoints: ["低轨卫星互联网", "可重复使用火箭", "卫星应用", "太空旅游"],
    targets: "2030年商业航天市场规模超万亿",
    opportunities: ["卫星制造", "火箭发射", "遥感应用", "通信服务"],
  },
  {
    name: "低空经济",
    stage: "起步期",
    policy: "低空经济发展纲要",
    support: "强",
    icon: <Building2 className="size-5" />,
    color: "from-cyan-500 to-blue-500",
    keyPoints: ["eVTOL制造", "低空物流", "空中交通管理", "适航认证"],
    targets: "2030年低空经济规模超2万亿",
    opportunities: ["eVTOL运营", "低空基础设施", "空管系统", "培训服务"],
  },
  {
    name: "氢能",
    stage: "培育期",
    policy: "氢能产业发展中长期规划",
    support: "中",
    icon: <Leaf className="size-5" />,
    color: "from-teal-500 to-green-500",
    keyPoints: ["绿氢制备", "氢燃料电池", "储运技术", "加氢站建设"],
    targets: "2035年氢能产业链产值超万亿",
    opportunities: ["制氢设备", "燃料电池", "加氢站运营", "工业脱碳"],
  },
  {
    name: "量子科技",
    stage: "前沿期",
    policy: "量子信息科学发展规划",
    support: "中",
    icon: <Zap className="size-5" />,
    color: "from-indigo-500 to-blue-500",
    keyPoints: ["量子计算", "量子通信", "量子测量", "量子安全"],
    targets: "2030年量子计算实现商用突破",
    opportunities: ["量子软件", "量子加密", "量子传感", "量子云服务"],
  },
];

// ===== 新增数据：风险提示 =====
const RISK_ALERTS = [
  {
    category: "政策风险",
    level: "高",
    color: "bg-red-500",
    items: [
      {
        risk: "行业监管政策突变",
        probability: "中",
        impact: "高",
        example: "教培行业双减政策、平台经济反垄断",
        signal: "表述从'鼓励'变为'规范'",
        action: "密切跟踪政策表述变化，建立预警机制",
      },
      {
        risk: "财政政策力度不及预期",
        probability: "低",
        impact: "中",
        example: "专项债发行进度慢于计划",
        signal: "财政收入增速放缓",
        action: "关注财政收支数据，调整投资节奏",
      },
      {
        risk: "地方债务风险暴露",
        probability: "中",
        impact: "中",
        example: "城投债违约、地方财政紧张",
        signal: "化债政策加码",
        action: "规避高负债地区项目，关注化债进展",
      },
    ],
  },
  {
    category: "市场风险",
    level: "中",
    color: "bg-orange-500",
    items: [
      {
        risk: "产能过剩竞争加剧",
        probability: "高",
        impact: "中",
        example: "新能源汽车、光伏产能过剩",
        signal: "行业价格战、企业亏损",
        action: "关注行业集中度，选择龙头企业",
      },
      {
        risk: "技术路线不确定性",
        probability: "中",
        impact: "中",
        example: "氢能技术路线之争、固态电池进展",
        signal: "技术标准未定、路线分歧",
        action: "分散投资，关注技术进展",
      },
      {
        risk: "估值泡沫风险",
        probability: "中",
        impact: "高",
        example: "AI概念炒作、低空经济概念股暴涨",
        signal: "PE/PB远超历史均值",
        action: "理性投资，关注基本面",
      },
    ],
  },
  {
    category: "外部风险",
    level: "高",
    color: "bg-red-500",
    items: [
      {
        risk: "中美科技脱钩",
        probability: "高",
        impact: "高",
        example: "芯片出口管制、实体清单",
        signal: "制裁范围扩大、技术封锁加码",
        action: "加速国产替代，降低对外依赖",
      },
      {
        risk: "全球贸易摩擦",
        probability: "中",
        impact: "中",
        example: "关税壁垒、反倾销调查",
        signal: "贸易保护主义抬头",
        action: "多元化出口市场，提升产品竞争力",
      },
      {
        risk: "地缘政治冲突",
        probability: "中",
        impact: "高",
        example: "台海局势、南海争端",
        signal: "军事紧张、外交摩擦",
        action: "关注地缘动态，做好风险预案",
      },
    ],
  },
  {
    category: "执行风险",
    level: "中",
    color: "bg-yellow-500",
    items: [
      {
        risk: "政策执行力度不足",
        probability: "中",
        impact: "中",
        example: "地方配套政策滞后、资金到位慢",
        signal: "政策落地进度不及预期",
        action: "跟踪政策执行情况，关注地方配套",
      },
      {
        risk: "人才供给不足",
        probability: "中",
        impact: "中",
        example: "AI人才短缺、芯片人才缺口",
        signal: "人才争夺激烈、薪资上涨",
        action: "关注人才培养政策，布局教育培训",
      },
      {
        risk: "数据安全合规风险",
        probability: "中",
        impact: "中",
        example: "数据泄露、跨境数据违规",
        signal: "监管处罚案例增加",
        action: "加强数据安全投入，确保合规",
      },
    ],
  },
];

// ===== COMPONENT =====

export default function PolicyHub() {
  const [expandedInvestment, setExpandedInvestment] = useState<number | null>(null);
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
          <TabsTrigger value="opportunity" className="gap-1.5">
            <Lightbulb className="size-3.5" />
            行业机会
          </TabsTrigger>
          <TabsTrigger value="indicators" className="gap-1.5">
            <BarChart3 className="size-3.5" />
            关键指标
          </TabsTrigger>
          <TabsTrigger value="industry" className="gap-1.5">
            <Factory className="size-3.5" />
            产业政策
          </TabsTrigger>
          <TabsTrigger value="risks" className="gap-1.5">
            <AlertTriangle className="size-3.5" />
            风险提示
          </TabsTrigger>
        </TabsList>

        {/* 时间线 */}
        <TabsContent value="timeline">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">2016-2026 政策演变</h3>
              <Badge variant="outline" className="text-xs">10年 · 11个关键节点</Badge>
            </div>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="relative flex items-start gap-4 mb-4 pl-2">
                  <div className={`size-6 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-bold shrink-0 z-10`}>
                    {item.year.slice(2)}
                  </div>
                  <div className="flex-1 p-4 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm">{item.year}</span>
                      <span className="text-sm text-foreground">{item.event}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{item.detail}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {item.keywords.map((kw) => (
                        <Badge key={kw} variant="secondary" className="text-[10px] px-1.5 py-0">{kw}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-primary/80">
                      <FileText className="size-3" />
                      <span>{item.policy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-secondary/30 border border-white/5 p-4 mt-4">
              <h4 className="text-sm font-bold mb-2">📊 核心逻辑</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                从"量的增长"转向"质的提升" → 从"出口驱动"转向"内需驱动" → 从"跟随模仿"转向"自主创新"
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="outline" className="text-[10px]">供给侧改革</Badge>
                <span className="text-xs text-muted-foreground">→</span>
                <Badge variant="outline" className="text-[10px]">深化改革</Badge>
                <span className="text-xs text-muted-foreground">→</span>
                <Badge variant="outline" className="text-[10px]">双循环</Badge>
                <span className="text-xs text-muted-foreground">→</span>
                <Badge variant="outline" className="text-[10px]">高质量发展</Badge>
                <span className="text-xs text-muted-foreground">→</span>
                <Badge variant="outline" className="text-[10px]">新质生产力</Badge>
                <span className="text-xs text-muted-foreground">→</span>
                <Badge variant="outline" className="text-[10px]">AI+</Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 投资方向 */}
        <TabsContent value="investment">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">十五五规划 十大投资方向</h3>
              <Badge variant="outline" className="text-xs">预估总计 25万亿+</Badge>
            </div>

            {/* 总览条 */}
            <div className="flex h-4 rounded-full overflow-hidden bg-secondary/30">
              {INVESTMENT_DIRECTIONS.map((d, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-r ${d.color} transition-all`}
                  style={{ width: `${d.percent}%` }}
                  title={`${d.name}: ${d.percent}%`}
                />
              ))}
            </div>

            {INVESTMENT_DIRECTIONS.map((dir, i) => (
              <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden">
                <button
                  onClick={() => setExpandedInvestment(expandedInvestment === i ? null : i)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors text-left"
                >
                  <div className={`size-10 rounded-lg bg-gradient-to-br ${dir.color} flex items-center justify-center text-white shrink-0`}>
                    {dir.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold">{dir.name}</h4>
                      <Badge variant="outline" className="text-[10px]">{dir.amount}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{dir.signal}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-lg font-bold text-primary">{dir.percent}%</span>
                    {expandedInvestment === i ? <ChevronDown className="size-4 text-muted-foreground" /> : <ChevronRight className="size-4 text-muted-foreground" />}
                  </div>
                </button>
                {expandedInvestment === i && (
                  <div className="px-4 pb-4 animate-fade-in-up space-y-4 ml-13">
                    {/* 详细分析 */}
                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">{dir.detail}</p>
                    </div>

                    {/* 细分领域 */}
                    <div>
                      <h5 className="text-xs font-bold text-foreground mb-2">细分领域</h5>
                      <div className="space-y-1.5">
                        {dir.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 商业机会 */}
                    <div>
                      <h5 className="text-xs font-bold text-foreground mb-2">商业机会</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {dir.opportunities.map((opp, j) => (
                          <Badge key={j} variant="secondary" className="text-[10px] px-2 py-0.5">{opp}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* 政策依据 */}
                    <div className="flex items-center gap-1.5 text-[10px] text-primary/80 pt-1 border-t border-white/5">
                      <FileText className="size-3" />
                      <span>政策依据：{dir.policy}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* 资金规模 */}
        <TabsContent value="budget">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">2025年财政资金规模</h3>
              <Badge variant="outline" className="text-xs">政府债券合计 13.86万亿</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BUDGET_DATA.map((b, i) => (
                <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-4">
                  <p className="text-xs text-muted-foreground mb-1">{b.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{b.amount}</span>
                    <span className="text-sm text-green-400 font-medium">{b.increase}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">投向：{b.target}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1 leading-relaxed">{b.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <h4 className="text-sm font-bold mb-2">💡 关键信号</h4>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li><strong>赤字率4%</strong> — 改革开放以来最高，财政大幅扩张</li>
                <li><strong>"更加积极的财政政策"+"适度宽松的货币政策"</strong> — 最强政策组合</li>
                <li><strong>超长期特别国债1.3万亿</strong> — 比上年增3000亿，重点投"两重两新"</li>
                <li><strong>专项债4.4万亿</strong> — 比上年增5000亿，基建投资加码</li>
                <li><strong>特别国债5000亿</strong> — 新增，用于银行补充资本</li>
                <li><strong>一般公共预算29.7万亿</strong> — 比上年增2万亿+</li>
                <li><strong>适度宽松货币政策</strong> — 14年来首次转向，配合财政发力</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* 关键文件 */}
        <TabsContent value="documents">
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">关键政策文件</h3>
              <Badge variant="outline" className="text-xs">{KEY_DOCUMENTS.length}份文件 · 2020-2026</Badge>
            </div>

            {/* 按类别分组显示 */}
            {["顶层设计", "经济改革", "科技创新", "绿色发展", "民生保障", "对外开放", "综合"].map((category) => {
              const docs = KEY_DOCUMENTS.filter((d) => d.category === category);
              if (docs.length === 0) return null;
              return (
                <div key={category} className="space-y-2">
                  <h4 className="text-xs font-bold text-primary mt-3 first:mt-0">{category}</h4>
                  {docs.map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-white/5 hover:border-primary/30 transition-all">
                      <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <FileText className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{doc.year}</span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{doc.tag}</Badge>
                        </div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{doc.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="rounded-xl bg-secondary/30 border border-white/5 p-4 mt-4">
              <h4 className="text-sm font-bold mb-2">📖 怎么读这些文件</h4>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li><strong>抓主线</strong> — 先读五年规划目录，建立框架</li>
                <li><strong>找信号</strong> — 首次出现的新词 = 政策风口</li>
                <li><strong>看落地</strong> — 跟踪部委实施细则和地方配套</li>
                <li><strong>识别信号</strong> — 连续多年强调 = 长期方向</li>
                <li><strong>看配套</strong> — 一个大文件后面通常跟着多个实施细则</li>
                <li><strong>看地方</strong> — 各省的落实方案往往有地方特色和额外机会</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* 行业机会 */}
        <TabsContent value="opportunity">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">政策红利 × 行业机会</h3>
              <Badge variant="outline" className="text-xs">5大类 · 20个方向</Badge>
            </div>

            {OPPORTUNITY_TABLE.map((group, gi) => (
              <div key={gi} className="space-y-2">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                  <Target className="size-4" />
                  {group.category}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.items.map((opp, i) => (
                    <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold text-foreground">{opp.direction}</span>
                        <Badge variant="outline" className="text-[9px] px-1 py-0">{opp.signal}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        <span className="text-foreground font-medium">机会：</span>{opp.opportunity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-foreground font-medium">行动：</span>{opp.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mt-4">
              <h4 className="text-sm font-bold mb-2">🎯 信号识别方法</h4>
              <div className="space-y-2">
                {[
                  { signal: "首次出现的新词", meaning: "政策风口", example: "'新质生产力'2023年首次提出→2024年全面落地" },
                  { signal: "连续多年强调", meaning: "长期方向", example: "'科技自立自强'连续5年出现在政府工作报告" },
                  { signal: "从'鼓励'到'规范'", meaning: "行业从野蛮生长到有序发展", example: "平台经济从鼓励→反垄断→常态化监管" },
                  { signal: "量化指标提高", meaning: "力度加大", example: "赤字率从3%→4%=财政大幅扩张" },
                  { signal: "写入五年规划", meaning: "至少5年支持", example: "新能源汽车写入十四五→持续补贴" },
                  { signal: "设立新机构", meaning: "战略级重视", example: "国家数据局成立→数据要素市场加速" },
                  { signal: "从试点到推广", meaning: "模式已验证", example: "数字人民币从4地试点→17省推广" },
                ].map((s, i) => (
                  <div key={i} className="text-xs">
                    <span className="text-primary font-medium">{s.signal}</span>
                    <span className="text-muted-foreground"> = {s.meaning}</span>
                    <span className="text-muted-foreground/60">（{s.example}）</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 关键指标 */}
        <TabsContent value="indicators">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">2025年关键经济与社会指标</h3>
              <Badge variant="outline" className="text-xs">5大类 · 20+指标</Badge>
            </div>

            {KEY_INDICATORS.map((category, ci) => (
              <div key={ci} className="space-y-2">
                <h4 className="text-sm font-bold text-primary">{category.category}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {category.items.map((item, i) => (
                    <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">{item.name}</span>
                        <span className={`text-xs font-bold ${
                          item.trend === "↑" ? "text-green-400" :
                          item.trend === "↓" ? "text-red-400" :
                          "text-muted-foreground"
                        }`}>{item.trend}</span>
                      </div>
                      <div className="text-lg font-bold">{item.value}</div>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <h4 className="text-sm font-bold mb-2">📊 指标解读</h4>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li><strong>赤字率4%</strong> — 改革开放以来最高，财政大幅扩张信号</li>
                <li><strong>CPI目标2%</strong> — 从3%下调，关注通缩风险和需求不足</li>
                <li><strong>新能源渗透率超50%</strong> — 电动化进入主流，竞争加剧</li>
                <li><strong>数字经济占GDP超42%</strong> — 数字化成为经济增长主引擎</li>
                <li><strong>R&D经费增&gt;7%</strong> — 科技创新投入持续加大</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* 产业政策 */}
        <TabsContent value="industry">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">重点产业政策分析</h3>
              <Badge variant="outline" className="text-xs">8大产业</Badge>
            </div>

            {INDUSTRY_POLICIES.map((industry, i) => (
              <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`size-10 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center text-white shrink-0`}>
                      {industry.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold">{industry.name}</h4>
                        <Badge variant="outline" className="text-[10px]">{industry.stage}</Badge>
                        <Badge variant={industry.support === "强" ? "default" : "secondary"} className="text-[10px]">
                          支持{industry.support}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{industry.policy}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* 重点方向 */}
                    <div>
                      <h5 className="text-xs font-bold text-foreground mb-1.5">重点方向</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.keyPoints.map((point, j) => (
                          <Badge key={j} variant="secondary" className="text-[10px] px-2 py-0.5">{point}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* 发展目标 */}
                    <div className="text-xs text-muted-foreground">
                      <span className="text-foreground font-medium">发展目标：</span>{industry.targets}
                    </div>

                    {/* 商业机会 */}
                    <div>
                      <h5 className="text-xs font-bold text-foreground mb-1.5">商业机会</h5>
                      <div className="flex flex-wrap gap-1.5">
                        {industry.opportunities.map((opp, j) => (
                          <Badge key={j} variant="outline" className="text-[10px] px-2 py-0.5">{opp}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
              <h4 className="text-sm font-bold mb-2">🏭 产业发展阶段判断</h4>
              <div className="space-y-2">
                {[
                  { stage: "爆发期", desc: "技术成熟、市场快速扩张", example: "AI、新能源汽车", color: "text-green-400" },
                  { stage: "加速期", desc: "政策大力支持、产业加速发展", example: "生物医药、数字孪生", color: "text-blue-400" },
                  { stage: "攻坚期", desc: "技术突破中、国产替代加速", example: "半导体、工业软件", color: "text-orange-400" },
                  { stage: "起步期", desc: "政策明确、市场培育中", example: "低空经济、商业航天", color: "text-purple-400" },
                  { stage: "培育期", desc: "技术路线探索、早期布局", example: "氢能、量子科技", color: "text-muted-foreground" },
                ].map((s, i) => (
                  <div key={i} className="text-xs">
                    <span className={`font-medium ${s.color}`}>{s.stage}</span>
                    <span className="text-muted-foreground"> — {s.desc}</span>
                    <span className="text-muted-foreground/60">（{s.example}）</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* 风险提示 */}
        <TabsContent value="risks">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">政策与市场风险提示</h3>
              <Badge variant="outline" className="text-xs">4大类 · 12项风险</Badge>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
