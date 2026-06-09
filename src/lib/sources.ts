// Anime streaming source definitions (Chinese sources)
// Sources open in embedded player or new Electron window

export interface StreamSource {
  name: string;
  icon: string;
  getEmbedUrl: (query: string, episode?: number) => string;
  preferChinese?: boolean;
}

// Source 1: Anime1.me (繁体中文，稳定可靠)
export const anime1Source: StreamSource = {
  name: "Anime1",
  icon: "📺",
  getEmbedUrl: (query) =>
    `https://anime1.me/?s=${encodeURIComponent(query)}`,
  preferChinese: true,
};

// Source 2: AGE动漫
export const ageSource: StreamSource = {
  name: "AGE动漫",
  icon: "🎬",
  getEmbedUrl: (query) =>
    `https://www.agemys.org/search?query=${encodeURIComponent(query)}`,
  preferChinese: true,
};

// Source 3: 樱花动漫
export const yhdmSource: StreamSource = {
  name: "樱花动漫",
  icon: "🌸",
  getEmbedUrl: (query) =>
    `https://www.yhdm.one/search/${encodeURIComponent(query)}`,
  preferChinese: true,
};

// Source 4: 风车动漫
export const fcdmSource: StreamSource = {
  name: "风车动漫",
  icon: "🎡",
  getEmbedUrl: (query) =>
    `https://www.fcdm.cc/search?keyword=${encodeURIComponent(query)}`,
  preferChinese: true,
};

// All available sources
export const STREAM_SOURCES: StreamSource[] = [
  anime1Source,
  ageSource,
  yhdmSource,
  fcdmSource,
];

