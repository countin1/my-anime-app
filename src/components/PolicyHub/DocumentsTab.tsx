import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink } from "lucide-react";
import { KEY_DOCUMENTS } from "./data";

export function DocumentsTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">关键政策文件</h3>
        <Badge variant="outline" className="text-xs">{KEY_DOCUMENTS.length} 份文件</Badge>
      </div>

      {KEY_DOCUMENTS.map((doc, i) => (
        <div key={i} className="rounded-xl bg-secondary/30 border border-white/5 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="size-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold mb-1">{doc.name}</h4>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-[10px]">{doc.date}</Badge>
                <Badge variant="outline" className="text-[10px]">{doc.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{doc.summary}</p>
              <div className="flex flex-wrap gap-1">
                {doc.keywords.map((keyword, ki) => (
                  <Badge key={ki} variant="outline" className="text-[10px]">{keyword}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
