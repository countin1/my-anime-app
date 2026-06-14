# 🎬 动漫流 (Anime Stream)

> 跨平台桌面动漫浏览与观看应用，聚合多源内容，一站式体验动漫、轻小说。

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Electron | 37 |
| UI 库 | React | 19 |
| 语言 | TypeScript | 5.7 |
| 构建工具 | Vite | 7 |
| CSS 框架 | TailwindCSS | v4 |
| 组件库 | Radix UI | Latest |

## ✨ 功能

- 🔍 **多源搜索** — 聚合多个动漫源，一键搜索
- 📺 **流媒体观看** — 内置播放器，流畅观看体验
- 📖 **轻小说阅读** — 支持轻小说在线阅读
- 🎨 **现代 UI** — 基于 Radix UI + TailwindCSS 的精美界面

## 🚀 安装与运行

```bash
# 克隆仓库
git clone https://github.com/countin1/my-anime-app.git
cd my-anime-app

# 安装依赖
npm install

# 启动开发模式
npm start

# 打包生产版本
npm run make
```

## 📁 项目结构

```
my-anime-app/
├── src/
│   ├── components/
│   │   ├── App.tsx            # 主应用组件
│   │   ├── AnimeCard.tsx      # 动漫卡片
│   │   ├── AnimeDetail.tsx    # 动漫详情
│   │   ├── AnimeGrid.tsx      # 动漫网格布局
│   │   ├── HeroBanner.tsx     # 首页轮播
│   │   ├── SearchBar.tsx      # 搜索栏
│   │   ├── Sidebar.tsx        # 侧边导航
│   │   ├── NovelCard.tsx      # 轻小说卡片
│   │   └── ui/                # 基础 UI 组件
│   ├── main.ts                # Electron 主进程
│   └── preload.ts             # 预加载脚本
├── public/                    # 静态资源
├── forge.config.ts            # Electron Forge 配置
├── vite.config.ts             # Vite 配置
└── package.json
```

## 📄 License

MIT
