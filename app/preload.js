const { contextBridge, ipcRenderer } = require("electron");
const { IPC_MESSAGES } = require("./constants");

contextBridge.exposeInMainWorld("renderer", {
    sendLoginMessage: () => {
        return ipcRenderer.invoke(IPC_MESSAGES.LOGIN);
    },
    sendSignoutMessage: () => {
        ipcRenderer.send(IPC_MESSAGES.LOGOUT);
    },
    sendSeeProfileMessage: () => {
        ipcRenderer.send(IPC_MESSAGES.GET_PROFILE);
    },
    sendAccount: () => {
        return ipcRenderer.invoke("SEND_ACCOUNT")
    },
    createWallet: (userInfo) => {
        return ipcRenderer.invoke("CREATE_WALLET", userInfo)
    },
    getUserInfo: (user, path) => {
        return ipcRenderer.invoke("GET_USER_INFO", user, path)
    },
    getBalance: (address, network) => {
        return ipcRenderer.invoke("GET_BALANCES", address, network)
    }
});