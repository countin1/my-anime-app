import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  getHomeDir: () => ipcRenderer.invoke('get-home-dir'),
});
