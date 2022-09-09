require('dotenv').config()
const { Wallet, providers, utils } = require('ethers');
const { CosmosClient } = require('@azure/cosmos')
const connectionString = process.env.COSMOS_CONNECTION_STRING
const databaseId = "micw-dev";

const client = new CosmosClient(connectionString);
const db = client.database(databaseId);

const createWallet = async (userInfo) => {
    try {
        const wallet = new Wallet.createRandom();

        // const vaultResponse = await saveSecretsToVault(mnemonic, privKey)

        let cosmosItem = {
            user: userInfo,
            phraseReference: wallet.mnemonic.phrase,
            address: wallet.address,
            pubKey: wallet.publicKey,
            mnemonicPath: wallet.mnemonic.path,
            privKeyReference: wallet.privateKey
        }

        const response = await saveToCosmos(cosmosItem);
        console.log("Wallet created for", userInfo)
        return {
            username: response.user
        }
    } catch (error) {
        console.log(error)
    }
}

const saveSecretsToVault = async () => {

}

const saveToCosmos = async (cosmosItem) => {
    const container = db.container("useraccounts");

    try {
        const response = await container.items.create(cosmosItem)
        return response
    } catch (error) {
        console.log(error)
    }
}

const getUserInfo = async (user, path = "m/44'/60'/0'/0/0") => {
    const container = db.container("useraccounts");
    const queryObject = {
        query: `SELECT * FROM c WHERE c.user="${user}" AND c.mnemonicPath="${path}"`,
    };

    try {
        const { resources: items } = await container.items.query(queryObject).fetchAll();
        if (items.length === 0) {
            return null
        } else {
            return items[0]
        }
    } catch (error) {
        console.log(error)
    }
}

const getBalances = async (address, network) => {
    try {
        const provider = new providers.AlchemyProvider(network); // homestead, goerli, matic, ropsten, rinkeby, maticmum
        const balanceInWei = await provider.getBalance(address)
        const balanceInEth = utils.formatEther(balanceInWei).slice(0, 6)
        return balanceInEth
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createWallet,
    getUserInfo,
    getBalances
}