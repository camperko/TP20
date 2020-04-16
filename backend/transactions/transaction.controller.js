/*
  Controller for transactions - access point for client
  getTypes - get all transaction types from database
  getFields - get all fields for selected transaction type
  getSellerWallet - get seller wallet for selected transaction type
  sendTransaction - send transaction to the net
  getCountByHour - get transaction counts per hour of day
*/

const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');
const cryptoapis = require('../cryptoapis');

/*
  routes for transaction methods
*/
router.get('/types', getTypes);
router.get('/fields/:type_name', getFields);
router.get('/seller=:merchant_id/type=:type_name', getSellerWallet);
router.post('/send/:type_name', sendTransaction);
router.get('/countByHour/:sellerID', getCountByHour);


module.exports = router;

/*
  getTypes - return all transaction types
  url - /types
*/
function getTypes(req, res, next) {
  transactionService.getTypes()
      .then(types => res.json(types))
      .catch(err => next(err));
}

/*
  getFields - return all fields for selected transaction type
  url - /fields/:type_name
  params
    - type_name - identifier for selected transaction type
*/
function getFields(req, res, next) {
  transactionService.getFields(req.params.type_name)
      .then(fields => res.json(fields))
      .catch(err => next(err));
}

/*
  sendTransaction - send transaction on selected net based on transaction type
  url - /send/:type_name
  params
    - type_name - identifier for selected transaction type
  body
    - output_wallet
    - price
    - fees
    - fee_wallet
    - input_wallets
    - wallets_inputs
    - merchantId
    - orderId
*/
function sendTransaction(req, res, next) {
  const sellerWallet = req.body.output_wallet;
  const price = (req.body.price * 0.00000001).toFixed(8);
  const fees = (req.body.fees * 0.00000001).toFixed(8);
  const feeWallet = req.body.fee_wallet;
  const inputWallets = req.body.input_wallets;
  const walletsInputs = req.body.wallets_inputs;
  const network = req.params.type_name;
  const merchantId = req.body.merchantId;
  const orderId = req.body.orderId;

  /*
    construct data for cryptoapis newTransactions
      - inputs
      - output
      - fee
      - wifs
  */
  let inputs = [];
  inputWallets.forEach((wallet, index) => {
    const input = {
      address: wallet[0].value,
      value: (walletsInputs[index] * 0.00000001).toFixed(8)
    };
    inputs.push(input)
  });
  const output = [
    {
      address: sellerWallet,
      value: price
    }
  ];
  const fee = {
    value: fees,
    address: inputWallets[feeWallet - 1][0].value
  };
  let wifs = [];
  inputWallets.forEach(wallet => {
    wifs.push(wallet[1].value);
  });

  // Not supported!
  // if (req.params.type_name === 'ETH') {
  //   cryptoapis.caClient.BC.ETH.switchNetwork(caClient.BC.ETH.NETWORKS.ROPSTEN);
  // }
  let client;
  if (network === 'BTC') {
    client = caClient.BC.BTC;
  } else if (network === 'BCH') {
    client = caClient.BC.BCH;
  } else if (network === 'LTC') {
    client = caClient.BC.LTC;
  } else if (network === 'DOGE') {
    client = caClient.BC.DOGE;
  } else if (network === 'DASH') {
    client = caClient.BC.DASH;
  }

  /*
    send data to net based on transaction type and log transaction details into database
  */
  cryptoapis.switchNetwork(client);
  (async () => {
    try{
      var data = await cryptoapis.newTransaction(client.transaction, inputs, output, fee, wifs);
      if(data === undefined || data === null || data.payload === null || data.payload === undefined) {
        res.status(400).json({message: 'Sending payment to blockchain failed. ' + data.meta.error.message});
        transactionService.logTransaction(network, network, parseFloat(price) + parseFloat(fees), price, false, null, merchantId, orderId);
      } else {
        res.status(200).json({message: 'Sending payment to blockchain successful. TxID: ' + data.payload.txid});
        transactionService.logTransaction(network, network, parseFloat(price) + parseFloat(fees), price, true, data.payload.txid, merchantId, orderId);
      }
    } catch (error) {
      res.status(400).json({message: 'Sending payment to blockchain failed. ' + error.meta.error.message});
      transactionService.logTransaction(network, network, parseFloat(price) + parseFloat(fees), price, false, null, merchantId, orderId);
    }
  }) ();
}

/*
  getSellerWallet - return seller wallet address
  url - /seller/:type_name
  params
    - type_name - identifier for selected transaction type
*/
function getSellerWallet(req, res, next) {
  transactionService.getSellerWallet(req.params.type_name, req.params.merchant_id)
      .then(walletRet => {
        if(walletRet === 'failed' || walletRet.length === 0) {
          res.json({wallet: 'failed'});
        } else {
          res.json({wallet: walletRet[0].wallet_address});
        }
      })
      .catch(err => next(err));
}

/*
  getCountByHour - return transaction counts per hour of day
  url - /getCountByHour/:sellerID
  params
    - sellerID - seller identifier
*/
function getCountByHour(req, res, next) {
  transactionService.getCountByHour(req.params.sellerID)
      .then(fields => res.json(fields))
      .catch(err => next(err));
}