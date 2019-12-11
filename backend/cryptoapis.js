const CryptoApis = require('cryptoapis.io');
const apiKey = '6db0a0872e44d399423d2b9dfcacb37feee399c7';
exports.caClient = new CryptoApis(apiKey);

// exports.createAccount = function() {
//   exports.caClient.TR.exchangeAccounts.create(
//     'BINANCE',
//     'NmlT5leNfswTzLTfxF6SIFvHAuQQB2HHb9E6WLsDLoJzXRfK95F0CQ2oXArE9hGT',
//     {
//       'exchangeSecret': '1asnLcTXej3snQusyWKU0tPzFuB0UYolQmhC9xk2KZffeGGh8VL0LWOSkQmHzJj5'
//     }
//   ).then(function(response) {
//     console.log(response);
//   }).catch(function(errors) {
//     console.log(errors);
//   });
// }

exports.listAllAccounts = function() {
  exports.caClient.TR.exchangeAccounts.listAll()
  .then(function(response) {
    console.log(response);
  }).catch(function(errors) {
    console.log(errors);
  })
}

exports.saveAssets = function(inputLimit) {
  exports.caClient.CMD.meta.listAllAssets({limit: inputLimit})
  .then(function(response) {
    for(var i = 0; i < inputLimit; i++) {
      if(response.payload[i].cryptoType)
        getAssetDetails(response.payload[i]._id);
    }
  }).catch(function(errors) {
    console.log(errors);
  });
}

exports.assetDetails = [];

getAssetDetails = function(baseAsset) {
  exports.caClient.CMD.base.getAssetDetails(baseAsset)
  .then(function(response) {
    exports.assetDetails.push(response);
  }).catch(function(errors) {
    console.log(errors);
  })
}
