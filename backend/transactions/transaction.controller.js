/*
  Controller for transactions - access point for client
  getTypes - get all transaction types from database
  getFields - get all fields for selected transaction type
  sendTransaction - send transaction to the net
*/

const express = require('express');
const router = express.Router();
const transactionService = require('./transaction.service');
const cryptoapis = require('../cryptoapis');

router.get('/types', getTypes);
router.get('/fields/:type_name', getFields);
router.get('/seller/:type_name', getSellerWallet);
router.post('/send/:type_name', sendTransaction);


module.exports = router;

function getTypes(req, res, next) {
  transactionService.getTypes()
      .then(types => res.json(types))
      .catch(err => next(err));
}

function getFields(req, res, next) {
  transactionService.getFields(req.params.type_name)
      .then(fields => res.json(fields))
      .catch(err => next(err));
}

function sendTransaction(req, res, next) {
  const sellerWallet = req.body.output_wallet;
  const price = (req.body.price * 0.00000001).toFixed(8);
  const fees = (req.body.fees * 0.00000001).toFixed(8);
  const feeWallet = req.body.fee_wallet;
  const inputWallets = req.body.input_wallets;
  const walletsInputs = req.body.wallets_inputs;
  const network = req.params.type_name;

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

  // console.log(wifs);
  // console.log(fees);
  // console.log(inputs);
  // console.log(output);

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

  cryptoapis.switchNetwork(client);
  (async () => {
    try{
      var data = await cryptoapis.newTransaction(client.transaction, inputs, output, fee, wifs);
      console.log(data);
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

function getSellerWallet(req, res, next) {
  transactionService.getSellerWallet(req.params.type_name)
      .then(wallet => res.json(wallet))
      .catch(err => next(err));
}
