require("dotenv").config();

const path = require("path");
const { app, ipcMain, BrowserWindow, session } = require("electron");
const { IPC_MESSAGES } = require("./app/constants");
const isDev = !app.isPackaged;
const AuthProvider = require("./app/AuthProvider");
const {
    createWallet,
    getBalances,
    getUserInfo
} = require('./app/wallet')

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
    return account;
})

ipcMain.handle("CREATE_WALLET", async (_, userInfo) => {
    try {
        const response = await createWallet(userInfo);
        return response;
    } catch (error) {
        console.log(error)
    }
});

ipcMain.handle("GET_USER_INFO", async (_, user, path) => {
    try {
        const info = await getUserInfo(user, path);
        return info;
    } catch (error) {
        console.log(error)
    }
});

ipcMain.handle("GET_BALANCES", async (_, address, network) => {
    try {
        const balance = await getBalances(address, network);
        return balance
    } catch (error) {
        console.log(error)
    }
});

if (isDev) {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}
