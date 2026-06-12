import { app, BrowserWindow, shell, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

// Handle openExternal requests from renderer via preload
ipcMain.handle('open-external', (_event, url: string) => {
  if (url.startsWith('http:') || url.startsWith('https:')) {
    shell.openExternal(url);
  }
});

// Expose home directory to renderer
ipcMain.handle('get-home-dir', () => {
  return app.getPath('home');
});

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: '动漫流',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Open links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
