/*
  Controller for transactions - access point for client
  getTypes - get all transaction types from database
  getFields - get all fields for selected transaction type
  getSellerWallet - get seller wallet for selected transaction type
  sendTransaction - send transaction to the net
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
router.get('/seller/:type_name', getSellerWallet);
router.post('/send/:type_name', sendTransaction);


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
*/
function sendTransaction(req, res, next) {
  const sellerWallet = req.body.output_wallet;
  const price = (req.body.price * 0.00000001).toFixed(8);
  const fees = (req.body.fees * 0.00000001).toFixed(8);
  const feeWallet = req.body.fee_wallet;
  const inputWallets = req.body.input_wallets;
  const walletsInputs = req.body.wallets_inputs;
  const network = req.params.type_name;

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
    send data to net based on transaction type
  */
  cryptoapis.switchNetwork(client);
  (async () => {
    try{
      var data = await cryptoapis.newTransaction(client.transaction, inputs, output, fee, wifs);
      if(data === undefined || data === null || data.payload === null || data.payload === undefined) {
        res.status(400).json({message: 'Sending payment to blockchain failed. Make sure, u have enough resources in wallets. Message: ' + data.meta.error.message});
      } else {
        res.status(200).json({message: 'Sending payment to blockchain successful. TxID: ' + data.payload.txid});
      }
    } catch (error) {
      res.status(400).json({message: 'Sending payment to blockchain failed. Make sure, u have enough resources in wallets. Message: ' + error});
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
  transactionService.getSellerWallet(req.params.type_name)
      .then(wallet => res.json(wallet))
      .catch(err => next(err));
}
