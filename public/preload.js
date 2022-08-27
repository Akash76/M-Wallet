const AuthProvider = require("./AuthProvider");

const authProvider = new AuthProvider();
window.getData = () => "testing"

window.login = async () => {
    const account = await authProvider.login();
    return account
}

window.logout = async () => {
    await authProvider.logout();
}