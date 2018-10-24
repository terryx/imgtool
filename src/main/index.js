'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import jimp from 'jimp'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path')
        .join(__dirname, '/static')
        .replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 520,
        useContentSize: true,
        width: 350
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

const resize = async (file, setting) => {
    const { name, path } = file
    const { format } = setting
    const width = parseInt(setting.width)
    const height = parseInt(setting.height)
    const quality = parseInt(setting.quality)
    const downloadPath = `${app.getPath('downloads')}/imgtool`

    const image = await jimp.read(path)

    if (width > 0 || height > 0) {
        const w = width > 0 ? width : jimp.AUTO
        const h = height > 0 ? height : jimp.AUTO
        image.resize(w, h)
    }

    if (quality < 100) {
        image.quality(quality)
    }

    if (format !== '') {
        const n = name.split('.')[0]
        return image.write(`${downloadPath}/${n}.${format}`)
    }

    return image.write(`${downloadPath}/${name}`)
}

ipcMain.on('upload-file', async (event, { files, setting }) => {
    const promises = files.map(file => {
        return resize(file, setting)
    })

    await Promise.all(promises)

    event.sender.send('uploaded', `${app.getPath('downloads')}/imgtool`)
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
