const { app, BrowserWindow } = require('electron');
const path = require('path');
const { title } = require('process');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#33333300',
            symbolColor: '#ffffff',
            height: 30
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');
}

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
