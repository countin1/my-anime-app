import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Template {
  name: string;
  template: string;
  useCase: string;
}

export function PromptCard({ template }: { template: Template }) {
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
