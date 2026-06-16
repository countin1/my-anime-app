import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap, Layers, Code, Target, BookOpen,
} from "lucide-react";

// ========== 导入子组件 ==========
import { LearningPathTab } from "./LearningPathTab";
import { TechStackTab } from "./TechStackTab";
import { ProjectsTab } from "./ProjectsTab";
import { CareerTab } from "./CareerTab";
import { ResourcesTab } from "./ResourcesTab";

// ========== 主组件 ==========

export default function AIAgentGuide() {
  const [activeTab, setActiveTab] = useState("path");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">AI Agent 工程师学习指南</h2>
        <p className="text-sm text-muted-foreground mt-1">
          从零到一 · 5个阶段 · 完整学习路线 · 实战项目
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary/60 mb-4 flex-wrap">
          <TabsTrigger value="path" className="gap-1.5">
            <GraduationCap className="size-3.5" />
            学习路线
          </TabsTrigger>
          <TabsTrigger value="tech" className="gap-1.5">
            <Layers className="size-3.5" />
            技术栈
          </TabsTrigger>
          <TabsTrigger value="projects" className="gap-1.5">
            <Code className="size-3.5" />
            实战项目
          </TabsTrigger>
          <TabsTrigger value="career" className="gap-1.5">
            <Target className="size-3.5" />
            职业发展
          </TabsTrigger>
          <TabsTrigger value="resources" className="gap-1.5">
            <BookOpen className="size-3.5" />
            学习资源
          </TabsTrigger>
        </TabsList>

        {/* 学习路线 */}
        <TabsContent value="path">
          <LearningPathTab />
        </TabsContent>

        {/* 技术栈 */}
        <TabsContent value="tech">
          <TechStackTab />
        </TabsContent>

        {/* 实战项目 */}
        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>

        {/* 职业发展 */}
        <TabsContent value="career">
          <CareerTab />
        </TabsContent>

        {/* 学习资源 */}
        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
