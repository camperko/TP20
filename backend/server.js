const express = require('express');
var morgan = require('morgan');
var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// MORGAN LOGGER SETUP
// set directory and name of .log file
var accessLogStream = fs.createWriteStream(path.join('./logs', 'access.log'), { flags: 'a' });
// function to generate unique request id
app.use(function requestId(req, res, next) {
  req.id = uuid.v4();
  next();
})
// setup morgan requestID token
morgan.token('requestID', function (req) {
  return req.id;
})
// setup morgan reqHeaders token
morgan.token('reqHeaders', function(req, res) {
   return JSON.stringify(req.headers);
});
// define log format
// :date[iso] = the current date and time in UTC
// :requestID = unique generated request ID
// :remote-addr = the remote address of the request
// :reqHeaders = request headers in JSON format
// :method = the HTTP method of the request
// :url = the URL of the request
// :status = the status code of the response
// :res[content-length] = the content lenght of response
// :response-time = the time between the request coming into morgan and when the response headers are written, in milliseconds
app.use(morgan(':date[iso] :requestID :remote-addr :reqHeaders :method :url :status :res[content-length] :response-time ms', { stream: accessLogStream }));

var db_conf = require("./database_conf");
var cryptoapis = require("./cryptoapis");
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
