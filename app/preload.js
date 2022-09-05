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
    test: async () => "Ok",
    testing: () => {
        return ipcRenderer.invoke("TEST")
    }
});