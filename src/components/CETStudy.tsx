import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CETStudy() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/cet4-study.html")
      .then((r) => r.text())
      .then((text) => {
        // Replace position:fixed with position:absolute to contain within iframe
        const contained = text
          .replace(/position:\s*fixed/gi, "position:absolute")
          .replace(/<body([^>]*)>/, '<body$1 style="overflow:auto">');
        setHtml(contained);
      })
      .catch(() => setHtml("<p style='color:white;padding:2rem'>加载失败</p>"));
  }, []);

  const openInBrowser = () => {
    const url = `${window.location.origin}/cet4-study.html`;
    window.electron?.openExternal?.(url) ?? window.open(url, "_blank");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">CET4 英语学习</h2>
          <p className="text-sm text-muted-foreground mt-1">
            四级冲刺 · 12天提分计划
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={openInBrowser} className="gap-1.5">
          <ExternalLink className="size-3.5" />
          浏览器打开
        </Button>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/10">
        {html ? (
          <iframe
            srcDoc={html}
            className="w-full"
            style={{
              border: "none",
              height: "calc(100vh - 250px)",
              display: "block",
            }}
            title="CET4 Study"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            加载中...
          </div>
        )}
      </div>
    </div>
  );
}
