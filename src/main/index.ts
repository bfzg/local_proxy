import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createServer, restartServer } from './server'
import { readFile, writeFile } from './fileManger'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    console.log('electron run >', process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))
  createWindow()
  createServer()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('read-file', async (_, filePath: string) => {
  try {
    const path = join(__dirname, filePath)
    console.log('读取的文件路径', path)
    const data = await readFile(path)
    return { status: 'success', data }
  } catch (error: any) {
    return { status: 'error', error: error.message }
  }
})

ipcMain.handle(
  'write-file',
  async (_, { filePath, content }: { filePath: string; content: string }) => {
    try {
      const path = join(__dirname, filePath)
      console.log('写入的文件路径', path)
      await writeFile(path, content)
      restartServer()
      return { status: 'success' }
    } catch (error: any) {
      return { status: 'error', error: error.message }
    }
  }
)
