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

// global error handler
app.use(errorHandler);

app.listen(8080, () => {
  console.log('Server started!');
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

// do a single select to the database with specific username
// return true if found, else return false
async function findUser(username) {
  try {
    let data = await db_conf.db.any('SELECT user_account_id FROM user_account WHERE username = $1', [username]);
    //console.log(data);
    if (Object.keys(data).length) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//create a new user in database
function addUser(username, password) {
  db_conf.db.any('INSERT INTO user_account(username, userpassword, is_active, create_date)'
    + 'VALUES($1, $2, $3, $4)', [username, password, true, new Date()])
    .then(() => {
      console.log("User successfully added!");
    })
    .catch(error => {
      console.log("Fail! Adding unsuccessfull!");
    });
}

//method to receive data from client
app.route('/api/registration').post((req, res) => {
  console.log('Request of registration accepted!');
  var username = req.body.username;
  var password = req.body.password;

  (async () => {
    // chceck whether is specific user already in database
    // if he is, return fail for new user registration
    // if he is not, add new user to database and return success
    if (await findUser(username)) {
      console.log("User already exists!");
      res.send(JSON.stringify({
        value: 'fail'
      }));
    } else {
      addUser(username, password);
      // console.log("User added!");
      res.send(JSON.stringify({
        value: 'success'
      }));
    }
  })();
});

app.route('/api/getAssetDetails').get((req,res) => {
  res.setHeader('Content-type', 'application/json');
  res.send(JSON.stringify({
    data: cryptoapis.assetDetails
  }));
  console.log("asset details");
});
