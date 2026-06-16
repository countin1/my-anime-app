import { CheckCircle2, Lock, Unlock } from "lucide-react";

interface Skill {
  name: string;
  desc: string;
  status: "mastered" | "available" | "locked";
  xp: number;
}

export function SkillCard({ skill }: { skill: Skill }) {
  const statusConfig = {
    mastered: { icon: CheckCircle2, color: "border-cyan-400 bg-cyan-400/10", iconColor: "text-cyan-400", label: "已掌握" },
    available: { icon: Unlock, color: "border-purple-400 bg-purple-400/10", iconColor: "text-purple-400", label: "可学习" },
    locked: { icon: Lock, color: "border-gray-600 bg-gray-600/10", iconColor: "text-gray-500", label: "未解锁" },
  };
  const config = statusConfig[skill.status];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border-2 p-4 transition-all hover:scale-[1.02] ${config.color}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`size-5 ${config.iconColor}`} />
          <span className="font-bold text-sm">{skill.name}</span>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground">+{skill.xp} XP</span>
      </div>
      <p className="text-xs text-muted-foreground">{skill.desc}</p>
      <span className={`text-[10px] mt-2 inline-block px-2 py-0.5 rounded-full ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}
