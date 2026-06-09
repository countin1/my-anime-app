export interface NovelSource {
  name: string;
  icon: string;
  baseUrl: string;
  searchUrl: (query: string) => string;
  description: string;
}

export interface NovelInfo {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  source: string;
  sourceUrl: string;
  tags: string[];
  status: string; // "连载中" | "已完结"
  wordCount?: string;
  latestChapter?: string;
}
