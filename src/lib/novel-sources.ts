import type { NovelSource } from "@/types/novel";

// 轻小说文库
const wenku8Source: NovelSource = {
  name: "轻小说文库",
  icon: "📚",
  baseUrl: "https://www.wenku8.cc",
  searchUrl: (query) =>
    `https://www.wenku8.cc/modules/article/search.php?searchkey=${encodeURIComponent(query)}`,
  description: "经典轻小说站，日系轻小说资源丰富",
};

// SF轻小说
const sfacgSource: NovelSource = {
  name: "SF轻小说",
  icon: "📖",
  baseUrl: "https://book.sfacg.com",
  searchUrl: (query) =>
    `https://book.sfacg.com/?s=${encodeURIComponent(query)}`,
  description: "国内原创轻小说平台",
};

// 起点中文网
const qidianSource: NovelSource = {
  name: "起点中文网",
  icon: "✒️",
  baseUrl: "https://www.qidian.com",
  searchUrl: (query) =>
    `https://www.qidian.com/so/${encodeURIComponent(query)}`,
  description: "网文大平台，玄幻/都市/科幻海量作品",
};

// 刺猬猫
const ciweimaoSource: NovelSource = {
  name: "刺猬猫",
  icon: "🦔",
  baseUrl: "https://www.ciweimao.com",
  searchUrl: (query) =>
    `https://www.ciweimao.com/search/${encodeURIComponent(query)}`,
  description: "二次元向轻小说平台",
};

// All available novel sources
export const NOVEL_SOURCES: NovelSource[] = [
  wenku8Source,
  sfacgSource,
  qidianSource,
  ciweimaoSource,
];
