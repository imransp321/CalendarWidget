const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: 'hidden',
    backgroundColor: '#00000000'
  });

  mainWindow.loadFile('index.html');

  // Position window in top-right corner
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  mainWindow.setPosition(width - 420, 20);

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('get-access-token', async () => {
  return store.get('accessToken', null);
});

ipcMain.handle('set-access-token', async (event, token) => {
  store.set('accessToken', token);
  return true;
});

ipcMain.handle('get-refresh-token', async () => {
  return store.get('refreshToken', null);
});

ipcMain.handle('set-refresh-token', async (event, token) => {
  store.set('refreshToken', token);
  return true;
});

ipcMain.handle('clear-tokens', async () => {
  store.delete('accessToken');
  store.delete('refreshToken');
  return true;
});

ipcMain.on('open-external', (event, url) => {
  shell.openExternal(url);
});

ipcMain.on('close-app', () => {
  app.quit();
});

ipcMain.on('minimize-app', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

// Handle OAuth authentication window
ipcMain.on('open-auth-window', (event, { authUrl, redirectUri }) => {
  const { BrowserWindow } = require('electron');
  const authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    parent: mainWindow,
    modal: true
  });

  authWindow.loadURL(authUrl);

  authWindow.on('closed', () => {
    event.sender.send('auth-error', 'Auth window closed');
  });

  // Listen for redirect
  authWindow.webContents.on('will-redirect', (event, navigationUrl) => {
    if (navigationUrl.startsWith(redirectUri)) {
      event.preventDefault();
      const url = new URL(navigationUrl);
      const code = url.searchParams.get('code');
      
      if (code) {
        authWindow.close();
        event.sender.send('auth-code-received', code);
      } else {
        authWindow.close();
        event.sender.send('auth-error', 'No authorization code received');
      }
    }
  });

  // Also check for navigation
  authWindow.webContents.on('did-navigate', (event, navigationUrl) => {
    if (navigationUrl.startsWith(redirectUri)) {
      event.preventDefault();
      const url = new URL(navigationUrl);
      const code = url.searchParams.get('code');
      
      if (code) {
        authWindow.close();
        event.sender.send('auth-code-received', code);
      } else {
        authWindow.close();
        event.sender.send('auth-error', 'No authorization code received');
      }
    }
  });
});

