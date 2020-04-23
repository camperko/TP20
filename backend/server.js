//require('rootpath')();
const express = require('express');
var morgan = require('morgan');
var uuid = require('node-uuid');
var fs = require('fs');
var path = require('path');
const util = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const coinTicker = require('coin-ticker');
var cryptoapis = require("./cryptoapis");
var tickerData = []; // coinTicker exchange rates data
var exchangePairs = ['BTC_USD', 'ETH_USD', 'BCH_USD', 'LTC_USD', 'XRP_USD'];
const request = require("request");

var winston = require('winston');
var expressWinston = require('express-winston');

const { format } = require('logform');


/**
 * Access logging setup
 * @author Vladimír Bernolák
 */
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: './logs/access.log',
      name: 'access-file',
    }),
  ],
  format: winston.format.combine(
    //winston.format.colorize(),
    winston.format.json(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp}${info.message}`) 
  ),
  metaField: null,
  //responseField: null,
  responseWhitelist: ['body'], 
  requestWhitelist: ['headers', 'query'],
  msg: function(req, res) { 
    responseSize = null;
    if(res){
      if (typeof res.body === 'object') {
        responseSize = JSON.stringify(res.body).length
      } else if (typeof res.body === 'string') {
        responseSize = res.body.length
      }
    }
    return `Request ID: ${req.id} Request IP address: ${req.ip} Request header: ${JSON.stringify(req.headers)} Request Method: ${req.method} Request URL: ${req.originalUrl} Status Code: ${res.statusCode} Response Size: ${responseSize} Response Time: ${res.responseTime/1000} s, ${(res.responseTime % 1000) * 1000000} ns`},
}));

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


var db_conf = require("./database_conf");
var db = db_conf.db;
var db_test = db_conf.db_test;
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
var cryptoapis = require("./cryptoapis");

module.exports = {
  cryptoapis
}

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
app.use('/transaction', require('./transactions/transaction.controller'));
app.use('/seller', require('./seller/seller.controller'));

/**
 * Error/exception logging setup
 * @author Vladimír Bernolák
 */
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: './logs/exceptions.log',
      name: 'exception-file',
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    format.timestamp(),
    format.align(),
    format.printf(info => `${info.timestamp}${info.message} ${JSON.stringify(info.meta)}`) 
  ),
  msg: function(req, res) { return  `Error id: ${req.id} IP address: ${req.ip}`},
  meta: true,
  dumpExceptions: true,
  showStack: true
}));

// global error handler
app.use(errorHandler);

const server = app.listen(8080, () => {
  console.log('Server started!');

  // try to throw errors to see if winston logger works
  /*fs.readFile('nonexistingfile.txt', function (err, data) {
    if (err) throw err;
    console.log(data);
  });*/
  //throw new Error('An error occurred'); 

  // cryptoapis.switchNetwork(cryptoapis.caClient.BC.BTC);
  // // cryptoapis.generateAddress();
  // // cryptoapis.generateAddress();

  // (async () => {
  //   try {
  //     var data = await cryptoapis.getAddressTransactions('mt39sKy96aeg8XyVc4K1LyxVcXquuutWDX');
  //     console.log(util.inspect(data, false, null, true));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }) ();

  //cryptoapis.createAccount();
  //cryptoapis.getSpecRate('5b1ea92e584bf50020130637', '5b1ea92e584bf50020130670');
  //cryptoapis.listAllAccounts();
  //cryptoapis.getAllRates('5b1ea92e584bf50020130616');
  //cryptoapis.saveAssets(200);

  //getTransactionTypeFields(1);
});

// Get content for the exchange rates table
app.route('/api/getAssetDetails').get((req,res) => {
  (async () => {
    await getAssetDetails();
    res.send(JSON.stringify({
      data: tickerData
    }));
  })();
});

// get list of seller's transactions
app.route('/api/sellersTransactions').post((req, res) => {
  var sellerID = req.body.sellerID;
  (async () => {
    let data = await getSellerTransactions(sellerID);
    res.send(JSON.stringify({
      data: data
    }));
  })();
});

async function getSellerTransactions(sellerID) {
  try {
    let data = await db_conf.db.any(`SELECT
    tl.trans_log_id AS id,
    tl.sender_price AS sender_price,
    ttS.currency AS sender_currency,
    tl.receiver_price AS receiver_price,
    ttR.currency AS receiver_currency,
    tl.is_successful AS is_successful,
    split_part(tl.timestamp::varchar, '.', 1) AS datetime
    FROM transaction_log tl
    JOIN transaction_type ttS ON ttS.trans_type_id = tl.sender_trans_type_fk
    JOIN transaction_type ttR ON ttR.trans_type_id = tl.receiver_trans_type_fk
    WHERE tl.user_account_id_fk = $1`, [sellerID]);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// get list of seller's transactions summary
app.route('/api/sellersTransactionsSummary').post((req, res) => {
  var sellerID = req.body.sellerID;
  var option = req.body.option;
  (async () => {
    let data = await getSellerTransactionsSummary(sellerID, option);
    res.send(JSON.stringify({
      data: data
    }));
  })();
});

async function getSellerTransactionsSummary(sellerID, option) {
  var column, condition;
  if (option === 'successful') {
    column = 'tl.is_successful';
    condition = 'true';
  }
  if (option === 'unsuccessful') {
    column = 'NOT tl.is_successful';
    condition = 'false';
  }
  // create different SQL query for succesful and unsuccessful transactions
  try {
    let data = await db_conf.db.any(`SELECT
    sum(tl.receiver_price) AS total_price,
    ttR.currency AS currency,
    count(CASE WHEN ` + column + ` THEN 1 END) AS transaction_count
    FROM transaction_log tl
    JOIN transaction_type ttS ON ttS.trans_type_id = tl.sender_trans_type_fk
    JOIN transaction_type ttR ON ttR.trans_type_id = tl.receiver_trans_type_fk
    WHERE tl.user_account_id_fk = $1 AND tl.is_successful = ` + condition + ` 
    GROUP BY ttR.trans_type_id, tl.is_successful`, [sellerID]);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getAssetDetails() {
  try {
    tickerData = [];
    //console.log(exchangePairs.length);
    for(var i = 0; i < exchangePairs.length; i++) {
          let exchangeRate = await coinTicker('bitstamp', exchangePairs[i]);
          //console.log(exchangeRate);
          tickerData.push(exchangeRate);
    }
  } catch (error) {
    console.log(error);
  }
}

app.post('/api/token_validate', (req, res) => {

  let token = req.body.recaptcha;
  const secretKey = "6Lfm0t4UAAAAAD3E2NdgfHFCIYvbFuxNcXfzm2em"; //the secret key from your google admin console;

  //token validation url is URL: https://www.google.com/recaptcha/api/siteverify
  // METHOD used is: POST

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${req.connection.remoteAddress}`

  //note that remoteip is the users ip address and it is optional
  // in node req.connection.remoteAddress gives the users ip address

  if (token === null || token === undefined) {
    res.status(201).send({
      success: false,
      message: "Token is empty or invalid"
    })
    return console.log("token empty");
  }

  request(url, function (err, response, body) {
    //the body is the data that contains success message
    body = JSON.parse(body);
    //check if the validation failed
    //console.log(body.success);
    if (body.success !== undefined && !body.success) {
      res.send({
        success: false,
        'message': "recaptcha failed"
      });
      return console.log("failed")
    }
    //if passed response success message to client
    console.log("captcha succesfull");
    res.send({
      "success": true,
      'message': "recaptcha passed"
    });
  })
});

module.exports = app;
module.exports =  server;

