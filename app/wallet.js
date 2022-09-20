require('dotenv').config()
const { Wallet, providers, utils } = require('ethers');
const { CosmosClient } = require('@azure/cosmos');
const { ClientSecretCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const vaultName = "micwkv";
const url = `https://${vaultName}.vault.azure.net`;
const credential = new ClientSecretCredential(process.env.TENENT_ID, process.env.CLIENT_ID, process.env.CLIENT_SECRET);
const akvClient = new SecretClient(url, credential);

const connectionString = process.env.COSMOS_CONNECTION_STRING
const client = new CosmosClient(connectionString);
const databaseId = "micw-dev";
const db = client.database(databaseId);

class WalletUtil {
    address;

    saveSecretsToVault = async (phrase, privKey, pathIndex, userInfo) => {
        try {
            let user = userInfo.replace("@", "-").replace(".", "-")
            let phraseKvName = `${user}-phrase-${pathIndex}`
            let privKeyKvName = `${user}-priv-${pathIndex}`
            await akvClient.setSecret(phraseKvName, phrase);
            await akvClient.setSecret(privKeyKvName, privKey);

            return {
                phraseReference: phraseKvName,
                privReference: privKeyKvName
            }
        } catch (error) {
            console.log(error)
        }
    }

    saveToCosmos = async (cosmosItem) => {
        const container = db.container("useraccounts");

        try {
            const response = await container.items.create(cosmosItem)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    createWallet = async (userInfo) => {
        try {
            const wallet = new Wallet.createRandom();

            const pathIndex = wallet.mnemonic.path.split('/')[5]
            const vaultResponse = await this.saveSecretsToVault(wallet.mnemonic.phrase, wallet.privateKey, pathIndex, userInfo)

            let cosmosItem = {
                user: userInfo,
                phraseReference: vaultResponse.phraseReference,
                address: wallet.address,
                pubKey: wallet.publicKey,
                mnemonicPath: wallet.mnemonic.path,
                privKeyReference: vaultResponse.privReference
            }

            const response = await this.saveToCosmos(cosmosItem);
            this.address = wallet.address
            console.log("Wallet created for", userInfo)
            return {
                username: response.user
            }
        } catch (error) {
            console.log(error)
        }
    }

    getUserInfo = async (user, path = "m/44'/60'/0'/0/0") => {
        const container = db.container("useraccounts");
        const queryObject = {
            query: `SELECT * FROM c WHERE c.user="${user}" AND c.mnemonicPath="${path}"`,
        };

        try {
            const { resources: items } = await container.items.query(queryObject).fetchAll();
            if (items.length === 0) {
                return null
            } else {
                this.address = items[0].address
                return items[0]
            }
        } catch (error) {
            console.log(error)
        }
    }

    getBalances = async (network) => {
        try {
            const provider = new providers.AlchemyProvider(network); // homestead, goerli, matic, ropsten, rinkeby, maticmum
            const balanceInWei = await provider.getBalance(this.address)
            const balanceInEth = utils.formatEther(balanceInWei).slice(0, 6)
            return balanceInEth
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = {
    // createWallet,
    // getUserInfo,
    // getBalances,
    WalletUtil
}