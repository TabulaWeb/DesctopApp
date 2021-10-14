const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
    const win = new BrowserWindow({
      width: 1200,
      height: 680,
      minWidth: 940,
      minHeight: 560,
      frame: false,
      backgroundColor: '#0f0e17',
      webPreferences: {
        nodeIntegration: true,
        worldSafeExecuteJavaScript: true,
        contextIsolation: false,
        devTools: true,
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('static/index.html')

    // MAXIMIZE APP
    ipc.on('maximizeRestoreApp', () => {
      if(win.isMaximized()){
        win.restore()
      } else {
        win.maximize()
      }
    })
    // Check if is Maximized
    win.on('maximize', () => {
      win.webContents.send('isMaximized')
    })
    // Check if is Restored
    win.on('unmaximize', () => {
      win.webContents.send('isRestored')
    })

    // MINIMIZE APP
    ipc.on('minimazeApp', () => {
      win.minimize()
    })

    // CLOSE APP
    ipc.on('closeApp', () => {
      win.close()
    })
}

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})