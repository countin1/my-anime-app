import { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Check, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Script {
  title: string;
  content: string;
}

export function InterviewCard({ script }: { script: Script }) {
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
