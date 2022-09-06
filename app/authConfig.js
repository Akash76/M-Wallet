const AAD_ENDPOINT_HOST = "https://login.microsoftonline.com/";
const REDIRECT_URI = "msal81707ac9-72cf-4690-b321-1403b6659e99://auth";

const msalConfig = {
    auth: {
        clientId: "81707ac9-72cf-4690-b321-1403b6659e99",
        authority: `${AAD_ENDPOINT_HOST}efbc4aa4-4271-4434-a852-b3ae024dd09d`,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false
        },
    },
};

module.exports = {
    msalConfig: msalConfig,
    REDIRECT_URI: REDIRECT_URI,
};