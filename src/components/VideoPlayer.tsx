import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  youtubeId?: string | null;
  embedUrl?: string | null;
  title?: string;
}

export default function VideoPlayer({ youtubeId, embedUrl, title }: VideoPlayerProps) {
  const [started, setStarted] = useState(false);

  const src = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`
    : embedUrl;

  if (!src) {
    return (
      <div className="flex items-center justify-center aspect-video bg-secondary/40 rounded-xl border border-border">
        <p className="text-muted-foreground text-sm">暂无视频</p>
      </div>
    );
  }

  if (!started) {
    return (
      <div
        className="relative aspect-video rounded-xl overflow-hidden bg-black cursor-pointer group"
        onClick={() => setStarted(true)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="size-7 text-primary-foreground fill-primary-foreground ml-1" />
          </div>
        </div>
        <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/60">
          点击播放
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
      <iframe
        src={src}
        title={title || "视频播放器"}
        className="absolute inset-0 w-full h-full border-0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
