const CryptoApis = require('cryptoapis.io');
const apiKey = '6db0a0872e44d399423d2b9dfcacb37feee399c7';
exports.caClient = new CryptoApis(apiKey);


exports.createAccount = function() {
  exports.caClient.TR.exchangeAccounts.create(
    'BINANCE',
    'NmlT5leNfswTzLTfxF6SIFvHAuQQB2HHb9E6WLsDLoJzXRfK95F0CQ2oXArE9hGT',
    {
      'exchangeSecret': '1asnLcTXej3snQusyWKU0tPzFuB0UYolQmhC9xk2KZffeGGh8VL0LWOSkQmHzJj5'
    }
  ).then(function(response) {
    console.log(response);
  }).catch(function(errors) {
    console.log(errors);
  });
}

exports.listAllAccounts = function() {
  exports.caClient.TR.exchangeAccounts.listAll()
  .then(function(response) {
    console.log(response);
  }).catch(function(errors) {
    console.log(errors);
  })
}

exports.getSpecRate = function(baseAssetId, quoteAssetId) {
  exports.caClient.CMD.exchangeRates.getSpecificRate(baseAssetId, quoteAssetId)
    .then(function(response){
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });
}

exports.getAssets = function(inputLimit) {
  exports.caClient.CMD.meta.listAllAssets({limit: inputLimit})
  .then(function(response) {
    console.log(response);
  }).catch(function(errors) {
    console.log(errors);
  });
}

exports.getAllRates = function(baseAsset) {
  exports.caClient.CMD.exchangeRates.getAllCurrentRates(baseAsset)
  .then(function(response) {
    console.log(response);
  }).catch(function(errors) {
    console.log(errors);
  })
}
