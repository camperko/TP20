const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var db_conf = require("./database_conf");
var cryptoapis = require("./cryptoapis");
const util = require('util');
var inputFields = [];
var inputFieldsValues = [];

var corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}



app.use(bodyParser.json());
app.use(cors(corsOptions));


app.listen(8080, () => {
  console.log('Server started!');
  cryptoapis.switchNetwork(cryptoapis.caClient.BC.BTC.NETWORKS.TESTNET);

  /*
    Create arguments for new transaction
  */

  // const inputs = [
  //   {
  //     address: address1,
  //     value: 0.02410000
  //   }
  // ];
  // const outputs = [
  //   {
  //     address: address2,
  //     value: 0.00010000
  //   },
  //   {
  //     address: address1,
  //     value: 0.02400000
  //   }
  // ];
  // const fee = {
  //   value: 0.00000385,
  //   address: address1
  // };
  // const wifs = [
  //   wif1,
  // ]

  // cryptoapis.newTransaction(inputs, outputs, fee, wifs);
  (async () => {
    var data = await cryptoapis.getAddressTransactions('mvR8K3k8NhprrsCzs3qouWW95pKu66CnSZ');
    console.log(util.inspect(data, false, null, true));
  }) ();
  //cryptoapis.getAddressTransactions('mgEymmJsYjkAU1BuErR7xoNDtavCW96wKE');
  //cryptoapis.getInfo('mgEymmJsYjkAU1BuErR7xoNDtavCW96wKE');
  //cryptoapis.generateAddress();
  //cryptoapis.createAccount();
  //cryptoapis.getAssets(5);
  //cryptoapis.getAllRates('LTC');
  //cryptoapis.getSpecRate('LTC', 'USD');
  //cryptoapis.listAllAccounts();
  //cryptoapis.getAllRates('5b1ea92e584bf50020130616');
  //cryptoapis.createHDWallet('jofoTestWallet', 3, 'Tim201920Tim');
  //cryptoapis.deleteHDWallet('jofoTestWallet');
  //cryptoapis.listHDWallets();
  //cryptoapis.generateAddressInWallet('jofoTestWallet');
  //cryptoapis.getHDWallet('jofoTestWallet');



  //getTransactionTypeFields(1);
  // select all from table
  // db_conf.db.any('SELECT * FROM transaction_type')
  //   .then(function(data) {
  //       console.log(data);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //   });

  // insert into db example
  //db.none('INSERT INTO users(first_name, last_name, age) VALUES(${name.first}, $<name.last>, $/age/)', {
  //  name: {first: 'John', last: 'Dow'},
  //  age: 30
  //});
});

// app.route('/api/test').get((req, res) => {
//   console.log('Request accepted!');
//   res.setHeader('Content-type', 'application/json');
//   res.send(JSON.stringify({
//     testMessages: 'fine'
//   }));
// });

// app.route('/api/test').post((req, res) => {
//   console.log(req.body);
// });

function getTransactionTypeFields(transactionTypeID) {
  db_conf.db.any("SELECT * FROM transaction_type_field WHERE trans_type_fk = ${transactionTypeID} ORDER BY field_order ASC;", {transactionTypeID})
    .then(function(data) {
        console.log(data);
        inputFields = data;
      })
      .catch(function(error) {
        console.log(error);
    });
}

app.route('/api/test').get((req, res) => {
  console.log('Request accepted!');
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify({
    testMessages: 'fine'
  }));
});

app.route('/api/test').post((req, res) => {
  console.log(req.body);
});

app.route('/api/getTransactionFields').get((req, res) => {
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify({
    inputFields
  }));
  console.log("SENT");
  console.log(inputFields);
});

app.route('/api/sendTransactionFields').post((req, res) => {
  inputFieldsValues = req.body.inputFields;
  console.log("RECEIVED");
  console.log(inputFieldsValues);
});
