import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen } from "lucide-react";

export function ResourcesTab() {
  return (
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
  );
}
