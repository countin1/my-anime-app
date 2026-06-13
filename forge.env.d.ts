/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />

interface ElectronAPI {
  openExternal: (url: string) => Promise<void>;
  getHomeDir: () => Promise<string>;
}

declare interface Window {
  electron: ElectronAPI;
}
