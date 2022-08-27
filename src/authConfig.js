export const msalConfig = {
    auth: {
        clientId: "c80faa57-f031-4696-a46f-d046df7566a8",
        authority: "https://login.microsoftonline.com/common",
        // authority: "https://login.microsoftonline.com/efbc4aa4-4271-4434-a852-b3ae024dd09d",
        redirectUri: "http://localhost:3000/"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};
