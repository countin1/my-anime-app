import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight, CheckCircle2, Star } from "lucide-react";
import { CAREER_PATH } from "./data";

export function CareerTab() {
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  return (
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
  );
}
