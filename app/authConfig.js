require('dotenv').config()

const { CLIENT_ID } = process.env
const AAD_ENDPOINT_HOST = "https://login.microsoftonline.com/";
const REDIRECT_URI = `msal${CLIENT_ID}://auth`;

const msalConfig = {
    auth: {
        clientId: CLIENT_ID,
        authority: `${AAD_ENDPOINT_HOST}common`,
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