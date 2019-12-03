//require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var db_conf = require("./database_conf");
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
var cryptoapis = require("./cryptoapis");
var inputFields = [];
var inputFieldsValues = [];


var corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

app.listen(8080, () => {
  console.log('Server started!');

  //cryptoapis.createAccount();
  //cryptoapis.getAssets(200);
  //cryptoapis.getSpecRate('5b1ea92e584bf50020130637', '5b1ea92e584bf50020130670');
  //cryptoapis.listAllAccounts();
  //cryptoapis.getAllRates('5b1ea92e584bf50020130616');

  getTransactionTypeFields(1);
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
