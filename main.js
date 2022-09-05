require("dotenv").config();

const path = require("path");
const { app, ipcMain, BrowserWindow, session } = require("electron");
const { IPC_MESSAGES } = require("./app/constants");
const isDev = !app.isPackaged;
const AuthProvider = require("./app/AuthProvider");

const authProvider = new AuthProvider();

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'app', 'preload.js')
        },
    });

    mainWindow.loadFile('index.html')
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});

ipcMain.handle(IPC_MESSAGES.LOGIN, async () => {
    const account = await authProvider.login();
    console.log(account)
    return account
});

ipcMain.on(IPC_MESSAGES.LOGOUT, async () => {
    try {
        await authProvider.logout();
        await session.defaultSession.clearStorageData();
    } catch (error) {
        console.log(error.message)
    }
});

ipcMain.handle("SEND_ACCOUNT", async () => {
    const account = await authProvider.account;
    console.log(account)
    return account;
})

ipcMain.handle('TEST', async () => {
    return "Testing return"
})

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}
