const electron = require("electron");
const { app, ipcMain, BrowserWindow } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const AuthProvider = require("./AuthProvider");
const { protectedResources } = require("./authConfig");

const authProvider = new AuthProvider();
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.loadURL(isDev ? "http://localhost:3000" :
        `file://${path.join(__dirname, "../build/index.html")}`);

    mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// ipcMain.on(IPC_MESSAGES.LOGIN, async () => {
//     const account = await authProvider.login();
//     await mainWindow.loadFile(path.join(__dirname, "./index.html"));
//     mainWindow.webContents.send(IPC_MESSAGES.SHOW_WELCOME_MESSAGE, account);
// });

// ipcMain.on(IPC_MESSAGES.LOGOUT, async () => {
//     await authProvider.logout();
//     await mainWindow.loadFile(path.join(__dirname, "./index.html"));
// });

// ipcMain.on(IPC_MESSAGES.GET_PROFILE, async () => {
//     const tokenRequest = {
//         scopes: protectedResources.graphMe.scopes
//     };

//     const token = await authProvider.getToken(tokenRequest);
//     const account = authProvider.account;

//     await mainWindow.loadFile(path.join(__dirname, "./index.html"));

//     const graphResponse = await callEndpointWithToken(
//         protectedResources.graphMe.endpoint,
//         token
//     );

//     mainWindow.webContents.send(IPC_MESSAGES.SHOW_WELCOME_MESSAGE, account);
//     mainWindow.webContents.send(IPC_MESSAGES.SET_PROFILE, graphResponse);
// });

// app.on("activate", () => {
//     if (mainWindow === null) {
//         createWindow();
//     }
// });
