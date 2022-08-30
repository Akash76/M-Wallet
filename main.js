/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require("dotenv").config();

const path = require("path");
const { app, ipcMain, BrowserWindow } = require("electron");
const { IPC_MESSAGES } = require("./constants");
const isDev = !app.isPackaged;

// const { callEndpointWithToken } = require("./fetch");
const AuthProvider = require("./AuthProvider");
// const { protectedResources } = require("./authConfig");

const authProvider = new AuthProvider();


function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    mainWindow.loadFile('index.html')
}

app.on("ready", () => {
    createWindow();
    // mainWindow.loadFile(path.join(__dirname, "./index.html"));
});

app.on("window-all-closed", () => {
    app.quit();
});

// Event handlers
ipcMain.handle(IPC_MESSAGES.LOGIN, async () => {
    const account = await authProvider.login();
    console.log(account)
    // await mainWindow.loadFile(path.join(__dirname, "./index.html"));
    // mainWindow.webContents.send(IPC_MESSAGES.SHOW_WELCOME_MESSAGE, account);
    return account
});

ipcMain.on(IPC_MESSAGES.LOGOUT, async () => {
    await authProvider.logout();
    await mainWindow.loadFile(path.join(__dirname, "./index.html"));
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

ipcMain.on(IPC_MESSAGES.GET_MAIL, async () => {
    //     const tokenRequest = {
    //         scopes: protectedResources.graphMessages.scopes,
    //     };

    //     const token = await authProvider.getToken(tokenRequest);
    //     const account = authProvider.account;

    //     await mainWindow.loadFile(path.join(__dirname, "./index.html"));

    //     const graphResponse = await callEndpointWithToken(
    //         protectedResources.graphMessages.endpoint,
    //         token
    //     );

    //     mainWindow.webContents.send(IPC_MESSAGES.SHOW_WELCOME_MESSAGE, account);
    //     mainWindow.webContents.send(IPC_MESSAGES.SET_MAIL, graphResponse);
    console.log(authProvider.account)
});