/*
  Component for communicating with cryptoapis.io
*/
const CryptoApis = require('cryptoapis.io');
const apiKey = '6db0a0872e44d399423d2b9dfcacb37feee399c7';
const util = require('util');
caClient = new CryptoApis(apiKey);

/*
  List all exchange accounts for current apiKey
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
  Get specific exchange rate
  baseAssetId - string -> base asset ID (etc. 'LTC')
  quoteAssetId - string -> quote asset ID (etc. 'USD')
*/
getSpecRate = function(baseAssetId, quoteAssetId) {
  caClient.CMD.exchangeRates.getSpecificRate(baseAssetId, quoteAssetId)
    .then(function(response){
      console.log(util.inspect(response, false, null, true));
    }).catch(function(error) {
      console.log(error);
    });
}

/*
  Get assets for cryptocurrencies
  inputLimit - integer -> for number of displayed assets
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
  Get all exchange rates
  baseAsset - string -> baseAssetID (etc. 'BTC')
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
  Create key pair with address and wif
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
  Create HD wallet
  name - string -> for wallet name
  addressCount - integer -> for number of addresses
  password - string -> for wallet password
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
  List all HD wallets for account
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
  Delete HD wallet by name
  name - string -> for wallet name
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
  Get details about HD wallet
  name - string -> for wallet name
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
  Get all transactions on given address
  address - string -> for address
*/
getAddressTransactions = async function(address) {
  try {
    return caClient.BC.BTC.address.getAddressTransactions(address);
  } catch (error) {
    console.log(error);
  }
  // .then(function(response) {
  //   console.log(util.inspect(response, false, null, true));
  // }).catch(function(errors) {
  //   console.log(errors);
  // });
}

/*
  Get infos about given address
  name - string -> for wallet name
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
  Create new transaction
  inputs - array of jsons -> every json contains 'address' of sender (string) and paid 'value' (float)
  outputs - array of jsons -> every json contains 'address' of receiver (string) and incoming 'value' (float)
  fee -> json -> contains 'address' which is paying fee (string) and 'value' of fee (float)
  wifs -> array of strings -> each string is wif for one input address
*/
newTransaction = function(inputs, outputs, fee, wifs) {
  caClient.BC.BTC.transaction.newTransaction(inputs, outputs, fee, wifs)
  .then(function(response) {
    console.log(util.inspect(response, false, null, true));
  }).catch(function(errors) {
    console.log(errors);
  });
}

/*
  Switch network to given one
  network - object from caClient
*/
switchNetwork = function(network) {
  caClient.BC.BTC.switchNetwork(network);
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
