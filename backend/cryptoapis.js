/*
  Component for communicating with cryptoapis.io
*/
const CryptoApis = require('cryptoapis.io');
const apiKey = '6db0a0872e44d399423d2b9dfcacb37feee399c7';
const util = require('util');
caClient = new CryptoApis(apiKey);

/*
  listAllAccounts - list all exchange accounts for current apiKey
*/
listAllAccounts = function() {
  caClient.TR.exchangeAccounts.listAll()
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  getSpecRate - get specific exchange rate
  params
    - baseAssetId - string -> base asset ID (etc. 'LTC')
    - quoteAssetId - string -> quote asset ID (etc. 'USD')
*/
getSpecRate = async function(baseAssetId, quoteAssetId) {
  try {
    return caClient.CMD.exchangeRates.getSpecificRate(baseAssetId, quoteAssetId);
  } catch (error) {
    console.log(error);
  }
}

/*
  getAssets - get assets for cryptocurrencies
  params
    - inputLimit - integer -> for number of displayed assets
*/
getAssets = function(inputLimit) {
  caClient.CMD.meta.listAllAssets({limit: inputLimit})
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  getAllRates - get all exchange rates
  params
    - baseAsset - string -> baseAssetID (etc. 'BTC')
*/
getAllRates = function(baseAsset) {
  caClient.CMD.exchangeRates.getAllCurrentRates(baseAsset)
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  generateAddress - create key pair with address and wif
*/
generateAddress = function() {
  caClient.BC.BTC.address.generateAddress()
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  createHDWallet - create HD wallet
  params
    - name - string -> for wallet name
    - addressCount - integer -> for number of addresses
    - password - string -> for wallet password
*/
createHDWallet = function(name, addressCount, password) {
  caClient.BC.BTC.wallet.createHDWallet(name, addressCount, password)
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  listHDWallets - list all HD wallets for account
*/
listHDWallets = function() {
  caClient.BC.BTC.wallet.listHDWallets()
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  deleteHDWallet - delete HD wallet by name
  params
    - name - string -> for wallet name
*/
deleteHDWallet = function(name) {
  caClient.BC.BTC.wallet.deleteHDWallet(name)
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  getHDWallet - get details about HD wallet
  params
    - name - string -> for wallet name
*/
getHDWallet = function(name) {
  caClient.BC.BTC.wallet.getHDWallet(name)
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  getAddressTransactions - get all transactions on given address
  params
    - address - string -> for address
*/
getAddressTransactions = async function(address) {
  try {
    return caClient.BC.BTC.address.getAddressTransactions(address);
  } catch (error) {
    console.log(error);
  }
}

/*
  getInfo - get infos about given address
  params
    - name - string -> for wallet name
*/
getInfo = function(address) {
  caClient.BC.BTC.address.getInfo(address)
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  newTransaction - create new transaction
  params
    - inputs - array of jsons -> every json contains 'address' of sender (string) and paid 'value' (float)
    - outputs - array of jsons -> every json contains 'address' of receiver (string) and incoming 'value' (float)
    - fee -> json -> contains 'address' which is paying fee (string) and 'value' of fee (float)
    - wifs -> array of strings -> each string is wif for one input address
*/
newTransaction = async function(client, inputs, outputs, fee, wifs) {
  try {
    return client.newTransaction(inputs, outputs, fee, wifs);
  } catch (error) {
    return error;
  }
}

/*
  switchNetwork - switch network to given one
  params
    - network - object from caClient
*/
switchNetwork = function(network) {
  network.switchNetwork(network.NETWORKS.TESTNET);
}

module.exports = {
  switchNetwork,
  newTransaction,
  getInfo,
  getAddressTransactions,
  getHDWallet,
  deleteHDWallet,
  listHDWallets,
  createHDWallet,
  generateAddress,
  getAllRates,
  getAssets,
  getSpecRate,
  listAllAccounts,
  caClient
}
